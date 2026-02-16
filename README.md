# Obsidian Vault LLM – 통합 기능/기술 명세(PRD)

## Obsidian 플러그인 실행

이 저장소는 Obsidian 데스크톱용 플러그인으로 빌드할 수 있습니다.

```bash
npm install
npm run build
```

생성되는 파일:
- `main.js`
- `manifest.json`
- `styles.css`

Obsidian의 플러그인 폴더에 위 파일을 복사하면 플러그인이 로드됩니다.

개발자가 바로 구현을 시작할 수 있도록 기능 명세와 기술 명세를 한 문서에 정리했습니다. Obsidian 볼트의 마크다운 노트를 LLM이 검색·요약·생성할 수 있도록 하는 로컬 우선(Local-first) 도구를 목표로 합니다.

## GitHub Copilot 에이전트 한글 출력 설정

GitHub Copilot 에이전트가 작업 중 모든 설명과 메시지를 한국어로 출력하도록 하려면:

1. **`.github/copilot-instructions.md` 파일 생성**: 리포지토리 루트에 `.github` 디렉토리를 만들고 `copilot-instructions.md` 파일을 추가합니다.

2. **한국어 출력 지시사항 추가**: 파일에 다음 내용을 작성합니다:
   ```markdown
   # Copilot Instructions
   
   - 모든 응답, 설명, 커밋 메시지를 한국어로 작성하세요.
   - Write all responses, descriptions, and commit messages in Korean.
   - 코드 작성 시 주석도 한국어로 작성하세요.
   ```

3. **Copilot 대화 시작 시 명시**: Copilot과 대화를 시작할 때 "한국어로 답변해 주세요" 또는 "Please respond in Korean"이라고 요청합니다.

4. **워크스페이스 설정 파일 활용**: `.vscode/settings.json`에 다음을 추가할 수 있습니다:
   ```json
   {
     "github.copilot.advanced": {
       "language": "ko"
     }
   }
   ```

참고: GitHub Copilot의 언어 설정은 프롬프트 기반이므로, 대화 시작 시 명시적으로 한국어 사용을 요청하는 것이 가장 효과적입니다.

## 1. 목표와 성공 지표
- 자연어로 볼트 내용을 질문하면 근거가 표시된 답변을 3초 이내에 제공한다 (Top-K 검색 + LLM 응답, warm 캐시=프로세스/벡터 스토어/LLM 커넥션이 이미 준비된 상태 / cold 스타트=초기 로드 포함, 목표 5초 이하).
- 새/수정된 노트는 10초 이내에 재색인되어 검색 가능해야 한다.
- 모든 데이터는 기본적으로 로컬에 저장되며, 외부 전송은 사용자가 명시적으로 설정한 LLM API로만 이뤄진다.

## 2. 범위
### 포함
- Obsidian 볼트 내 마크다운(.md) 파일 및 메타데이터(frontmatter, 태그, 링크) 색인
- 로컬 백그라운드 워커/CLI를 통한 임베딩 생성 및 벡터 검색
- 대화형 질의응답(챗), 노트 요약, 새 노트 초안 생성
- 답변 내 출처(파일 경로/헤더/문맥 스니펫) 표시
- 간단한 필터(폴더, 태그)와 개인/워크스페이스 설정 관리

### 제외(차후 고려)
- 동시 편집/협업 기능
- 멀티미디어 파일 처리(이미지/음성)
- 클라우드 싱크/호스팅

## 3. 주요 사용자 시나리오
1) 사용자는 `ovl init`으로 볼트 경로와 LLM API 키를 설정한다.  
2) 워커가 볼트를 스캔해 임베딩을 생성하고 로컬 DB/벡터 스토어에 저장한다.  
3) 사용자가 “지난주 회의록 요약해줘”라고 질의하면, 관련 노트의 스니펫과 함께 답변을 받는다.  
4) 사용자가 답변을 바탕으로 “새 노트로 저장”을 선택하면 지정 폴더에 초안(.md)이 생성된다.  
5) 노트를 수정하면 워커가 변경을 감지하고 해당 파일만 재색인한다.

## 4. 기능 명세(Functional Spec)
1. **초기 설정**
   - CLI 명령: `ovl init --vault <path> --provider openai --api-key <key>`  
   - 설정 파일: `~/.ovl/config.yaml` (볼트 경로, LLM 설정, 필터 규칙, 기본 K 값)
2. **인덱싱/동기화**
   - 첫 실행 시 전체 스캔 → 문서 단위 → 헤더/문단 기준 chunking (기본 300~500 토큰)
   - 변경 감지: 파일 생성/수정/삭제 이벤트(watch) → 해당 파일만 재임베딩/삭제
   - 재시도 큐: 임베딩 실패 시 지수 백오프(초기 1초, 배수 2x) 후 재시도, 최대 3회(기본값) 후 스킵 로그
3. **검색/QA**
   - 벡터 검색 Top-K(기본 8) + 필터(폴더, 태그, frontmatter 키/값)
   - 답변에는 근거 리스트(파일명, 헤더, 스니펫, 토큰 오프셋) 포함
   - 옵션: “소스만 보기”(검색 결과만 반환) vs “LLM 답변”
4. **대화 모드**
   - 세션 ID로 컨텍스트 유지, 최근 10턴(기본값)을 요약해 메모리에 압축
   - 인용 마크다운(각주 또는 각 소스 블록) 형태로 출처 삽입
5. **노트 생성/요약**
   - “새 노트로 저장” 시 템플릿 적용(폴더, 파일명 규칙 `YYYY-MM-DD-title.md`)
   - 기존 노트 요약: 헤더별 요약 + 액션 아이템 추출, frontmatter에 `last_summary_at` 기록
6. **설정/보안**
   - API 키는 OS 보안 스토리지 또는 로컬 암호화 파일에 저장
   - 로그/메트릭 최소화(기본 비활성), 사용자가 opt-in 시 익명 통계 전송

## 5. 데이터 흐름
1) **색인 파이프라인**  
   파일 변경 → 파서(frontmatter, 링크, 본문 추출) → 청크 분할 → 임베딩 생성 →  
   메타데이터/임베딩을 SQLite + 벡터 스토어에 저장 → 상태 플래그 업데이트.
2) **질의응답 흐름**  
   사용자 프롬프트 → 파라메터(K, 필터) 확인 → 벡터 검색 → 컨텍스트 패킹 →  
   LLM 호출(system + retrieval prompt) → 답변과 출처 마크다운 반환 → (옵션) 노트로 저장.

## 6. 데이터 모델(요약)
- **Note**: `id`, `path`, `title`, `tags`, `links`, `frontmatter(json)`, `updated_at`, `hash`
- **Chunk**: `id`, `note_id`, `text`, `embedding`, `position`, `token_count`, `section`
- **Conversation**: `session_id`, `turn`, `role`, `content`, `summary_cache`
- **Settings**: `vault_path`, `provider`, `api_key_ref`, `default_k`, `chunk_size`, `filters`

## 7. 저장소/컴포넌트
- **구현 언어**: TypeScript(Node.js) 기준으로 개발
- **파일 시스템**: Obsidian 볼트 원본(.md)
- **메타데이터 DB**: SQLite (로컬 `~/.ovl/meta.db`)
- **벡터 스토어**: 로컬 우선, 향후 원격 플러그 가능  
  - Chroma: 지속성, 멀티프로세스 접근, 디스크/원격 등 백엔드를 교체할 수 있는 플러그블 스토리지가 필요할 때 기본값  
  - FAISS: 메모리 사용을 줄인 단일 프로세스, 최대 성능이 필요할 때
- **서비스 구성**:  
  - `ovl daemon`: 파일 감시 + 색인 워커  
  - `ovl query`: CLI 질의/챗, 또는 로컬 HTTP API(`localhost:11434` 등)  
  - (옵션) Obsidian 플러그인: 로컬 API 연동 UI

## 8. 프롬프트 설계(초안)
- **System Prompt**: “너는 Obsidian 볼트의 전문 리서치 어시스턴트다. 항상 출처를 마크다운으로 인용하고, 모르는 내용은 추측하지 않는다.”
- **Retrieval Prompt 템플릿**:  
  - 입력: 사용자 질문, 검색된 컨텍스트 리스트(파일명/섹션/본문), 지시사항(길이, 톤)  
  - 출력: 마크다운 답변 + 근거 각주 또는 인라인 블록
- **요약 Prompt**: 헤더별 요약, 액션 아이템, 다음 질문 제안.
- **노트 생성 Prompt**: 템플릿 채우기(제목, 요약, 인용).

## 9. 품질/성능/보안 요구
- **성능**: 색인 TPS 목표 20~30 chunk/초(예: M1 Pro 10코어 CPU, CPU-only, 로컬 임베딩 HF all-MiniLM-L6-v2, chunk_size 400 기준의 참조 값이며, 하위 사양에서는 비례 감소 허용·설정으로 조정), 질의 응답 총 소요 ≤ 3초(캐시/HF 모델 사용 시)  
- **신뢰성**: 작업 큐 재시도, 부분 실패 시 로그와 상태 플래그 유지  
- **보안/프라이버시**: 로컬 우선, 외부 전송 시 명시적 동의 및 최소 데이터 전송; API 키 암호화 저장
- **접근성**: CLI는 기본 텍스트 출력, API는 JSON 스키마 제공

## 10. 테스트 전략
- **단위 테스트**: 파서(프론트매터/링크), 청크 로직, 필터 적용, 프롬프트 빌더
- **통합 테스트**: 소형 볼트로 색인→검색→응답 경로 검증, 삭제/수정 이벤트 처리
- **수동 테스트**: Obsidian 플러그인 UI와의 왕복, 응답 출처 정확도 샘플링

## 11. 초기 개발 우선순위(MVP)
1) CLI 초기화/설정 저장 ✅
2) 전체 색인 + 파일 변경 감시  
3) 벡터 검색 + 근거 포함 QA  
4) 챗 세션 유지 및 요약 ✅ (대화 저장 기능)
5) 노트 요약/새 노트 저장

## 구현된 기능

### 초기화 (`ovl init`)
Obsidian 볼트를 설정하고 LLM 제공자를 구성합니다.

```bash
ovl init --vault /path/to/vault --provider openai --api-key YOUR_KEY
```

### 대화 저장 (`ovl save-conversation`)
LLM과의 대화를 마크다운 형식으로 변환하여 볼트에 저장합니다.

```bash
# JSON 파일에서 대화를 읽어 마크다운으로 저장
ovl save-conversation --session-id my-session --input conversation.json --output /path/to/vault
```

#### 입력 형식 (JSON)
```json
[
  {
    "role": "user",
    "content": "질문 내용",
    "timestamp": "2024-02-15T10:00:00Z"
  },
  {
    "role": "assistant",
    "content": "답변 내용",
    "timestamp": "2024-02-15T10:00:05Z"
  }
]
```

#### 출력 형식 (Markdown)
```markdown
# 대화 기록 - my-session

생성일: 2024-02-15T10:00:00.000Z

---

## 👤 사용자
*2024-02-15T10:00:00Z*

질문 내용

## 🤖 어시스턴트
*2024-02-15T10:00:05Z*

답변 내용
```

파일명은 `YYYY-MM-DD-session-id.md` 형식으로 자동 생성됩니다.

## 12. 향후 로드맵(요약)
- 오프라인 임베딩(로컬 모델) 옵션 추가  
- 다중 볼트 지원 및 프로파일 전환  
- 멀티모달(이미지/표) 인식, 캘린더/태스크 플러그인 연동

---
이 문서는 개발 착수 시점의 기준서입니다. 구현 중 발견되는 제약이나 변경 사항은 README에 즉시 반영해 주세요.
