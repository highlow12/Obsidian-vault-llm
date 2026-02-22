"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/logging.ts
var logging_exports = {};
__export(logging_exports, {
  appendEmbeddingLog: () => appendEmbeddingLog,
  appendErrorLog: () => appendErrorLog,
  appendTopicSeparationFailureLog: () => appendTopicSeparationFailureLog,
  getPluginLogPath: () => getPluginLogPath
});
function getPluginLogPath(app, manifest) {
  var _a;
  const pluginId = (_a = manifest == null ? void 0 : manifest.id) != null ? _a : "obsidian-vault-llm";
  return (0, import_obsidian3.normalizePath)(`${app.vault.configDir}/plugins/${pluginId}/log.txt`);
}
async function appendErrorLog(app, manifest, context, detail) {
  const logPath = getPluginLogPath(app, manifest);
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  const detailText = toSafeString(detail);
  const entry = `
[${timestamp}] ${context}
${detailText}
`;
  try {
    const exists = await app.vault.adapter.exists(logPath);
    if (exists) {
      const current = await app.vault.adapter.read(logPath);
      await app.vault.adapter.write(logPath, `${entry}${current}`);
    } else {
      await app.vault.adapter.write(logPath, entry.trimStart());
    }
  } catch (error) {
    console.error("Failed to write plugin log", error);
  }
}
async function appendEmbeddingLog(app, manifest, data) {
  const logPath = getPluginLogPath(app, manifest);
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  const inputText = data.inputText.replace(/\n/g, " ");
  const embeddingInfo = `[\uBCA1\uD130 \uCC28\uC6D0: ${data.embedding.length}]`;
  let similarityInfo = "";
  if (data.similarity !== void 0) {
    similarityInfo = ` | \uC774\uC804 \uC784\uBCA0\uB529\uACFC\uC758 \uC720\uC0AC\uB3C4: ${(data.similarity * 100).toFixed(2)}%`;
  }
  let entry = `
[${timestamp}] [\uC784\uBCA0\uB529] \uC785\uB825: "${inputText}" ${embeddingInfo}${similarityInfo}
`;
  try {
    const exists = await app.vault.adapter.exists(logPath);
    if (exists) {
      const current = await app.vault.adapter.read(logPath);
      await app.vault.adapter.write(logPath, `${entry}${current}`);
    } else {
      await app.vault.adapter.write(logPath, entry.trimStart());
    }
  } catch (error) {
    console.error("[\uC784\uBCA0\uB529 \uB85C\uADF8] \uD30C\uC77C \uC4F0\uAE30 \uC2E4\uD328:", error);
  }
}
async function appendTopicSeparationFailureLog(app, manifest, reason, details) {
  const logPath = getPluginLogPath(app, manifest);
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  let entry = `
[${timestamp}] [\uC8FC\uC81C \uBD84\uB9AC \uC2E4\uD328] \uC774\uC720: ${reason}
`;
  if (details) {
    entry += `\uC0C1\uC138: ${toSafeString(details)}
`;
  }
  entry += "---\n";
  try {
    const exists = await app.vault.adapter.exists(logPath);
    if (exists) {
      const current = await app.vault.adapter.read(logPath);
      await app.vault.adapter.write(logPath, `${entry}${current}`);
    } else {
      await app.vault.adapter.write(logPath, entry.trimStart());
    }
  } catch (error) {
    console.error("[\uC8FC\uC81C \uBD84\uB9AC \uC2E4\uD328 \uB85C\uADF8] \uD30C\uC77C \uC4F0\uAE30 \uC2E4\uD328:", error);
  }
}
function toSafeString(detail) {
  var _a;
  if (detail === null || detail === void 0) {
    return String(detail);
  }
  if (typeof detail === "string") {
    return detail;
  }
  if (detail instanceof Error) {
    return (_a = detail.stack) != null ? _a : detail.message;
  }
  try {
    const seen = /* @__PURE__ */ new WeakSet();
    return JSON.stringify(
      detail,
      (key, value) => {
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
            return "[\uC21C\uD658 \uCC38\uC870]";
          }
          seen.add(value);
        }
        return value;
      },
      2
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return `\uC9C1\uB82C\uD654 \uC2E4\uD328: ${message}`;
  }
}
var import_obsidian3;
var init_logging = __esm({
  "src/logging.ts"() {
    "use strict";
    import_obsidian3 = require("obsidian");
  }
});

// node_modules/kind-of/index.js
var require_kind_of = __commonJS({
  "node_modules/kind-of/index.js"(exports2, module2) {
    var toString = Object.prototype.toString;
    module2.exports = function kindOf(val) {
      if (val === void 0) return "undefined";
      if (val === null) return "null";
      var type = typeof val;
      if (type === "boolean") return "boolean";
      if (type === "string") return "string";
      if (type === "number") return "number";
      if (type === "symbol") return "symbol";
      if (type === "function") {
        return isGeneratorFn(val) ? "generatorfunction" : "function";
      }
      if (isArray(val)) return "array";
      if (isBuffer(val)) return "buffer";
      if (isArguments(val)) return "arguments";
      if (isDate(val)) return "date";
      if (isError(val)) return "error";
      if (isRegexp(val)) return "regexp";
      switch (ctorName(val)) {
        case "Symbol":
          return "symbol";
        case "Promise":
          return "promise";
        // Set, Map, WeakSet, WeakMap
        case "WeakMap":
          return "weakmap";
        case "WeakSet":
          return "weakset";
        case "Map":
          return "map";
        case "Set":
          return "set";
        // 8-bit typed arrays
        case "Int8Array":
          return "int8array";
        case "Uint8Array":
          return "uint8array";
        case "Uint8ClampedArray":
          return "uint8clampedarray";
        // 16-bit typed arrays
        case "Int16Array":
          return "int16array";
        case "Uint16Array":
          return "uint16array";
        // 32-bit typed arrays
        case "Int32Array":
          return "int32array";
        case "Uint32Array":
          return "uint32array";
        case "Float32Array":
          return "float32array";
        case "Float64Array":
          return "float64array";
      }
      if (isGeneratorObj(val)) {
        return "generator";
      }
      type = toString.call(val);
      switch (type) {
        case "[object Object]":
          return "object";
        // iterators
        case "[object Map Iterator]":
          return "mapiterator";
        case "[object Set Iterator]":
          return "setiterator";
        case "[object String Iterator]":
          return "stringiterator";
        case "[object Array Iterator]":
          return "arrayiterator";
      }
      return type.slice(8, -1).toLowerCase().replace(/\s/g, "");
    };
    function ctorName(val) {
      return typeof val.constructor === "function" ? val.constructor.name : null;
    }
    function isArray(val) {
      if (Array.isArray) return Array.isArray(val);
      return val instanceof Array;
    }
    function isError(val) {
      return val instanceof Error || typeof val.message === "string" && val.constructor && typeof val.constructor.stackTraceLimit === "number";
    }
    function isDate(val) {
      if (val instanceof Date) return true;
      return typeof val.toDateString === "function" && typeof val.getDate === "function" && typeof val.setDate === "function";
    }
    function isRegexp(val) {
      if (val instanceof RegExp) return true;
      return typeof val.flags === "string" && typeof val.ignoreCase === "boolean" && typeof val.multiline === "boolean" && typeof val.global === "boolean";
    }
    function isGeneratorFn(name, val) {
      return ctorName(name) === "GeneratorFunction";
    }
    function isGeneratorObj(val) {
      return typeof val.throw === "function" && typeof val.return === "function" && typeof val.next === "function";
    }
    function isArguments(val) {
      try {
        if (typeof val.length === "number" && typeof val.callee === "function") {
          return true;
        }
      } catch (err) {
        if (err.message.indexOf("callee") !== -1) {
          return true;
        }
      }
      return false;
    }
    function isBuffer(val) {
      if (val.constructor && typeof val.constructor.isBuffer === "function") {
        return val.constructor.isBuffer(val);
      }
      return false;
    }
  }
});

// node_modules/is-extendable/index.js
var require_is_extendable = __commonJS({
  "node_modules/is-extendable/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function isExtendable(val) {
      return typeof val !== "undefined" && val !== null && (typeof val === "object" || typeof val === "function");
    };
  }
});

// node_modules/extend-shallow/index.js
var require_extend_shallow = __commonJS({
  "node_modules/extend-shallow/index.js"(exports2, module2) {
    "use strict";
    var isObject = require_is_extendable();
    module2.exports = function extend(o) {
      if (!isObject(o)) {
        o = {};
      }
      var len = arguments.length;
      for (var i = 1; i < len; i++) {
        var obj = arguments[i];
        if (isObject(obj)) {
          assign(o, obj);
        }
      }
      return o;
    };
    function assign(a, b) {
      for (var key in b) {
        if (hasOwn(b, key)) {
          a[key] = b[key];
        }
      }
    }
    function hasOwn(obj, key) {
      return Object.prototype.hasOwnProperty.call(obj, key);
    }
  }
});

// node_modules/section-matter/index.js
var require_section_matter = __commonJS({
  "node_modules/section-matter/index.js"(exports2, module2) {
    "use strict";
    var typeOf = require_kind_of();
    var extend = require_extend_shallow();
    module2.exports = function(input, options2) {
      if (typeof options2 === "function") {
        options2 = { parse: options2 };
      }
      var file = toObject(input);
      var defaults = { section_delimiter: "---", parse: identity };
      var opts = extend({}, defaults, options2);
      var delim = opts.section_delimiter;
      var lines = file.content.split(/\r?\n/);
      var sections = null;
      var section = createSection();
      var content = [];
      var stack = [];
      function initSections(val) {
        file.content = val;
        sections = [];
        content = [];
      }
      function closeSection(val) {
        if (stack.length) {
          section.key = getKey(stack[0], delim);
          section.content = val;
          opts.parse(section, sections);
          sections.push(section);
          section = createSection();
          content = [];
          stack = [];
        }
      }
      for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var len = stack.length;
        var ln = line.trim();
        if (isDelimiter(ln, delim)) {
          if (ln.length === 3 && i !== 0) {
            if (len === 0 || len === 2) {
              content.push(line);
              continue;
            }
            stack.push(ln);
            section.data = content.join("\n");
            content = [];
            continue;
          }
          if (sections === null) {
            initSections(content.join("\n"));
          }
          if (len === 2) {
            closeSection(content.join("\n"));
          }
          stack.push(ln);
          continue;
        }
        content.push(line);
      }
      if (sections === null) {
        initSections(content.join("\n"));
      } else {
        closeSection(content.join("\n"));
      }
      file.sections = sections;
      return file;
    };
    function isDelimiter(line, delim) {
      if (line.slice(0, delim.length) !== delim) {
        return false;
      }
      if (line.charAt(delim.length + 1) === delim.slice(-1)) {
        return false;
      }
      return true;
    }
    function toObject(input) {
      if (typeOf(input) !== "object") {
        input = { content: input };
      }
      if (typeof input.content !== "string" && !isBuffer(input.content)) {
        throw new TypeError("expected a buffer or string");
      }
      input.content = input.content.toString();
      input.sections = [];
      return input;
    }
    function getKey(val, delim) {
      return val ? val.slice(delim.length).trim() : "";
    }
    function createSection() {
      return { key: "", data: "", content: "" };
    }
    function identity(val) {
      return val;
    }
    function isBuffer(val) {
      if (val && val.constructor && typeof val.constructor.isBuffer === "function") {
        return val.constructor.isBuffer(val);
      }
      return false;
    }
  }
});

// node_modules/js-yaml/lib/js-yaml/common.js
var require_common = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/common.js"(exports2, module2) {
    "use strict";
    function isNothing(subject) {
      return typeof subject === "undefined" || subject === null;
    }
    function isObject(subject) {
      return typeof subject === "object" && subject !== null;
    }
    function toArray(sequence) {
      if (Array.isArray(sequence)) return sequence;
      else if (isNothing(sequence)) return [];
      return [sequence];
    }
    function extend(target, source) {
      var index, length, key, sourceKeys;
      if (source) {
        sourceKeys = Object.keys(source);
        for (index = 0, length = sourceKeys.length; index < length; index += 1) {
          key = sourceKeys[index];
          target[key] = source[key];
        }
      }
      return target;
    }
    function repeat(string, count) {
      var result = "", cycle;
      for (cycle = 0; cycle < count; cycle += 1) {
        result += string;
      }
      return result;
    }
    function isNegativeZero(number) {
      return number === 0 && Number.NEGATIVE_INFINITY === 1 / number;
    }
    module2.exports.isNothing = isNothing;
    module2.exports.isObject = isObject;
    module2.exports.toArray = toArray;
    module2.exports.repeat = repeat;
    module2.exports.isNegativeZero = isNegativeZero;
    module2.exports.extend = extend;
  }
});

// node_modules/js-yaml/lib/js-yaml/exception.js
var require_exception = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/exception.js"(exports2, module2) {
    "use strict";
    function YAMLException(reason, mark) {
      Error.call(this);
      this.name = "YAMLException";
      this.reason = reason;
      this.mark = mark;
      this.message = (this.reason || "(unknown reason)") + (this.mark ? " " + this.mark.toString() : "");
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      } else {
        this.stack = new Error().stack || "";
      }
    }
    YAMLException.prototype = Object.create(Error.prototype);
    YAMLException.prototype.constructor = YAMLException;
    YAMLException.prototype.toString = function toString(compact) {
      var result = this.name + ": ";
      result += this.reason || "(unknown reason)";
      if (!compact && this.mark) {
        result += " " + this.mark.toString();
      }
      return result;
    };
    module2.exports = YAMLException;
  }
});

// node_modules/js-yaml/lib/js-yaml/mark.js
var require_mark = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/mark.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    function Mark(name, buffer, position, line, column) {
      this.name = name;
      this.buffer = buffer;
      this.position = position;
      this.line = line;
      this.column = column;
    }
    Mark.prototype.getSnippet = function getSnippet(indent, maxLength) {
      var head, start, tail, end, snippet;
      if (!this.buffer) return null;
      indent = indent || 4;
      maxLength = maxLength || 75;
      head = "";
      start = this.position;
      while (start > 0 && "\0\r\n\x85\u2028\u2029".indexOf(this.buffer.charAt(start - 1)) === -1) {
        start -= 1;
        if (this.position - start > maxLength / 2 - 1) {
          head = " ... ";
          start += 5;
          break;
        }
      }
      tail = "";
      end = this.position;
      while (end < this.buffer.length && "\0\r\n\x85\u2028\u2029".indexOf(this.buffer.charAt(end)) === -1) {
        end += 1;
        if (end - this.position > maxLength / 2 - 1) {
          tail = " ... ";
          end -= 5;
          break;
        }
      }
      snippet = this.buffer.slice(start, end);
      return common.repeat(" ", indent) + head + snippet + tail + "\n" + common.repeat(" ", indent + this.position - start + head.length) + "^";
    };
    Mark.prototype.toString = function toString(compact) {
      var snippet, where = "";
      if (this.name) {
        where += 'in "' + this.name + '" ';
      }
      where += "at line " + (this.line + 1) + ", column " + (this.column + 1);
      if (!compact) {
        snippet = this.getSnippet();
        if (snippet) {
          where += ":\n" + snippet;
        }
      }
      return where;
    };
    module2.exports = Mark;
  }
});

// node_modules/js-yaml/lib/js-yaml/type.js
var require_type = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type.js"(exports2, module2) {
    "use strict";
    var YAMLException = require_exception();
    var TYPE_CONSTRUCTOR_OPTIONS = [
      "kind",
      "resolve",
      "construct",
      "instanceOf",
      "predicate",
      "represent",
      "defaultStyle",
      "styleAliases"
    ];
    var YAML_NODE_KINDS = [
      "scalar",
      "sequence",
      "mapping"
    ];
    function compileStyleAliases(map) {
      var result = {};
      if (map !== null) {
        Object.keys(map).forEach(function(style) {
          map[style].forEach(function(alias) {
            result[String(alias)] = style;
          });
        });
      }
      return result;
    }
    function Type(tag, options2) {
      options2 = options2 || {};
      Object.keys(options2).forEach(function(name) {
        if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
          throw new YAMLException('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
        }
      });
      this.tag = tag;
      this.kind = options2["kind"] || null;
      this.resolve = options2["resolve"] || function() {
        return true;
      };
      this.construct = options2["construct"] || function(data) {
        return data;
      };
      this.instanceOf = options2["instanceOf"] || null;
      this.predicate = options2["predicate"] || null;
      this.represent = options2["represent"] || null;
      this.defaultStyle = options2["defaultStyle"] || null;
      this.styleAliases = compileStyleAliases(options2["styleAliases"] || null);
      if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
        throw new YAMLException('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
      }
    }
    module2.exports = Type;
  }
});

// node_modules/js-yaml/lib/js-yaml/schema.js
var require_schema = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/schema.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    var YAMLException = require_exception();
    var Type = require_type();
    function compileList(schema, name, result) {
      var exclude = [];
      schema.include.forEach(function(includedSchema) {
        result = compileList(includedSchema, name, result);
      });
      schema[name].forEach(function(currentType) {
        result.forEach(function(previousType, previousIndex) {
          if (previousType.tag === currentType.tag && previousType.kind === currentType.kind) {
            exclude.push(previousIndex);
          }
        });
        result.push(currentType);
      });
      return result.filter(function(type, index) {
        return exclude.indexOf(index) === -1;
      });
    }
    function compileMap() {
      var result = {
        scalar: {},
        sequence: {},
        mapping: {},
        fallback: {}
      }, index, length;
      function collectType(type) {
        result[type.kind][type.tag] = result["fallback"][type.tag] = type;
      }
      for (index = 0, length = arguments.length; index < length; index += 1) {
        arguments[index].forEach(collectType);
      }
      return result;
    }
    function Schema(definition) {
      this.include = definition.include || [];
      this.implicit = definition.implicit || [];
      this.explicit = definition.explicit || [];
      this.implicit.forEach(function(type) {
        if (type.loadKind && type.loadKind !== "scalar") {
          throw new YAMLException("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
        }
      });
      this.compiledImplicit = compileList(this, "implicit", []);
      this.compiledExplicit = compileList(this, "explicit", []);
      this.compiledTypeMap = compileMap(this.compiledImplicit, this.compiledExplicit);
    }
    Schema.DEFAULT = null;
    Schema.create = function createSchema() {
      var schemas, types;
      switch (arguments.length) {
        case 1:
          schemas = Schema.DEFAULT;
          types = arguments[0];
          break;
        case 2:
          schemas = arguments[0];
          types = arguments[1];
          break;
        default:
          throw new YAMLException("Wrong number of arguments for Schema.create function");
      }
      schemas = common.toArray(schemas);
      types = common.toArray(types);
      if (!schemas.every(function(schema) {
        return schema instanceof Schema;
      })) {
        throw new YAMLException("Specified list of super schemas (or a single Schema object) contains a non-Schema object.");
      }
      if (!types.every(function(type) {
        return type instanceof Type;
      })) {
        throw new YAMLException("Specified list of YAML types (or a single Type object) contains a non-Type object.");
      }
      return new Schema({
        include: schemas,
        explicit: types
      });
    };
    module2.exports = Schema;
  }
});

// node_modules/js-yaml/lib/js-yaml/type/str.js
var require_str = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/str.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    module2.exports = new Type("tag:yaml.org,2002:str", {
      kind: "scalar",
      construct: function(data) {
        return data !== null ? data : "";
      }
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/seq.js
var require_seq = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/seq.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    module2.exports = new Type("tag:yaml.org,2002:seq", {
      kind: "sequence",
      construct: function(data) {
        return data !== null ? data : [];
      }
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/map.js
var require_map = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/map.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    module2.exports = new Type("tag:yaml.org,2002:map", {
      kind: "mapping",
      construct: function(data) {
        return data !== null ? data : {};
      }
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/schema/failsafe.js
var require_failsafe = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/schema/failsafe.js"(exports2, module2) {
    "use strict";
    var Schema = require_schema();
    module2.exports = new Schema({
      explicit: [
        require_str(),
        require_seq(),
        require_map()
      ]
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/null.js
var require_null = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/null.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    function resolveYamlNull(data) {
      if (data === null) return true;
      var max = data.length;
      return max === 1 && data === "~" || max === 4 && (data === "null" || data === "Null" || data === "NULL");
    }
    function constructYamlNull() {
      return null;
    }
    function isNull(object) {
      return object === null;
    }
    module2.exports = new Type("tag:yaml.org,2002:null", {
      kind: "scalar",
      resolve: resolveYamlNull,
      construct: constructYamlNull,
      predicate: isNull,
      represent: {
        canonical: function() {
          return "~";
        },
        lowercase: function() {
          return "null";
        },
        uppercase: function() {
          return "NULL";
        },
        camelcase: function() {
          return "Null";
        }
      },
      defaultStyle: "lowercase"
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/bool.js
var require_bool = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/bool.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    function resolveYamlBoolean(data) {
      if (data === null) return false;
      var max = data.length;
      return max === 4 && (data === "true" || data === "True" || data === "TRUE") || max === 5 && (data === "false" || data === "False" || data === "FALSE");
    }
    function constructYamlBoolean(data) {
      return data === "true" || data === "True" || data === "TRUE";
    }
    function isBoolean(object) {
      return Object.prototype.toString.call(object) === "[object Boolean]";
    }
    module2.exports = new Type("tag:yaml.org,2002:bool", {
      kind: "scalar",
      resolve: resolveYamlBoolean,
      construct: constructYamlBoolean,
      predicate: isBoolean,
      represent: {
        lowercase: function(object) {
          return object ? "true" : "false";
        },
        uppercase: function(object) {
          return object ? "TRUE" : "FALSE";
        },
        camelcase: function(object) {
          return object ? "True" : "False";
        }
      },
      defaultStyle: "lowercase"
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/int.js
var require_int = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/int.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    var Type = require_type();
    function isHexCode(c) {
      return 48 <= c && c <= 57 || 65 <= c && c <= 70 || 97 <= c && c <= 102;
    }
    function isOctCode(c) {
      return 48 <= c && c <= 55;
    }
    function isDecCode(c) {
      return 48 <= c && c <= 57;
    }
    function resolveYamlInteger(data) {
      if (data === null) return false;
      var max = data.length, index = 0, hasDigits = false, ch;
      if (!max) return false;
      ch = data[index];
      if (ch === "-" || ch === "+") {
        ch = data[++index];
      }
      if (ch === "0") {
        if (index + 1 === max) return true;
        ch = data[++index];
        if (ch === "b") {
          index++;
          for (; index < max; index++) {
            ch = data[index];
            if (ch === "_") continue;
            if (ch !== "0" && ch !== "1") return false;
            hasDigits = true;
          }
          return hasDigits && ch !== "_";
        }
        if (ch === "x") {
          index++;
          for (; index < max; index++) {
            ch = data[index];
            if (ch === "_") continue;
            if (!isHexCode(data.charCodeAt(index))) return false;
            hasDigits = true;
          }
          return hasDigits && ch !== "_";
        }
        for (; index < max; index++) {
          ch = data[index];
          if (ch === "_") continue;
          if (!isOctCode(data.charCodeAt(index))) return false;
          hasDigits = true;
        }
        return hasDigits && ch !== "_";
      }
      if (ch === "_") return false;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_") continue;
        if (ch === ":") break;
        if (!isDecCode(data.charCodeAt(index))) {
          return false;
        }
        hasDigits = true;
      }
      if (!hasDigits || ch === "_") return false;
      if (ch !== ":") return true;
      return /^(:[0-5]?[0-9])+$/.test(data.slice(index));
    }
    function constructYamlInteger(data) {
      var value = data, sign = 1, ch, base, digits = [];
      if (value.indexOf("_") !== -1) {
        value = value.replace(/_/g, "");
      }
      ch = value[0];
      if (ch === "-" || ch === "+") {
        if (ch === "-") sign = -1;
        value = value.slice(1);
        ch = value[0];
      }
      if (value === "0") return 0;
      if (ch === "0") {
        if (value[1] === "b") return sign * parseInt(value.slice(2), 2);
        if (value[1] === "x") return sign * parseInt(value, 16);
        return sign * parseInt(value, 8);
      }
      if (value.indexOf(":") !== -1) {
        value.split(":").forEach(function(v) {
          digits.unshift(parseInt(v, 10));
        });
        value = 0;
        base = 1;
        digits.forEach(function(d) {
          value += d * base;
          base *= 60;
        });
        return sign * value;
      }
      return sign * parseInt(value, 10);
    }
    function isInteger(object) {
      return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 === 0 && !common.isNegativeZero(object));
    }
    module2.exports = new Type("tag:yaml.org,2002:int", {
      kind: "scalar",
      resolve: resolveYamlInteger,
      construct: constructYamlInteger,
      predicate: isInteger,
      represent: {
        binary: function(obj) {
          return obj >= 0 ? "0b" + obj.toString(2) : "-0b" + obj.toString(2).slice(1);
        },
        octal: function(obj) {
          return obj >= 0 ? "0" + obj.toString(8) : "-0" + obj.toString(8).slice(1);
        },
        decimal: function(obj) {
          return obj.toString(10);
        },
        /* eslint-disable max-len */
        hexadecimal: function(obj) {
          return obj >= 0 ? "0x" + obj.toString(16).toUpperCase() : "-0x" + obj.toString(16).toUpperCase().slice(1);
        }
      },
      defaultStyle: "decimal",
      styleAliases: {
        binary: [2, "bin"],
        octal: [8, "oct"],
        decimal: [10, "dec"],
        hexadecimal: [16, "hex"]
      }
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/float.js
var require_float = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/float.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    var Type = require_type();
    var YAML_FLOAT_PATTERN = new RegExp(
      // 2.5e4, 2.5 and integers
      "^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
    );
    function resolveYamlFloat(data) {
      if (data === null) return false;
      if (!YAML_FLOAT_PATTERN.test(data) || // Quick hack to not allow integers end with `_`
      // Probably should update regexp & check speed
      data[data.length - 1] === "_") {
        return false;
      }
      return true;
    }
    function constructYamlFloat(data) {
      var value, sign, base, digits;
      value = data.replace(/_/g, "").toLowerCase();
      sign = value[0] === "-" ? -1 : 1;
      digits = [];
      if ("+-".indexOf(value[0]) >= 0) {
        value = value.slice(1);
      }
      if (value === ".inf") {
        return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
      } else if (value === ".nan") {
        return NaN;
      } else if (value.indexOf(":") >= 0) {
        value.split(":").forEach(function(v) {
          digits.unshift(parseFloat(v, 10));
        });
        value = 0;
        base = 1;
        digits.forEach(function(d) {
          value += d * base;
          base *= 60;
        });
        return sign * value;
      }
      return sign * parseFloat(value, 10);
    }
    var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
    function representYamlFloat(object, style) {
      var res;
      if (isNaN(object)) {
        switch (style) {
          case "lowercase":
            return ".nan";
          case "uppercase":
            return ".NAN";
          case "camelcase":
            return ".NaN";
        }
      } else if (Number.POSITIVE_INFINITY === object) {
        switch (style) {
          case "lowercase":
            return ".inf";
          case "uppercase":
            return ".INF";
          case "camelcase":
            return ".Inf";
        }
      } else if (Number.NEGATIVE_INFINITY === object) {
        switch (style) {
          case "lowercase":
            return "-.inf";
          case "uppercase":
            return "-.INF";
          case "camelcase":
            return "-.Inf";
        }
      } else if (common.isNegativeZero(object)) {
        return "-0.0";
      }
      res = object.toString(10);
      return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace("e", ".e") : res;
    }
    function isFloat(object) {
      return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 !== 0 || common.isNegativeZero(object));
    }
    module2.exports = new Type("tag:yaml.org,2002:float", {
      kind: "scalar",
      resolve: resolveYamlFloat,
      construct: constructYamlFloat,
      predicate: isFloat,
      represent: representYamlFloat,
      defaultStyle: "lowercase"
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/schema/json.js
var require_json = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/schema/json.js"(exports2, module2) {
    "use strict";
    var Schema = require_schema();
    module2.exports = new Schema({
      include: [
        require_failsafe()
      ],
      implicit: [
        require_null(),
        require_bool(),
        require_int(),
        require_float()
      ]
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/schema/core.js
var require_core = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/schema/core.js"(exports2, module2) {
    "use strict";
    var Schema = require_schema();
    module2.exports = new Schema({
      include: [
        require_json()
      ]
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/timestamp.js
var require_timestamp = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/timestamp.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    var YAML_DATE_REGEXP = new RegExp(
      "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
    );
    var YAML_TIMESTAMP_REGEXP = new RegExp(
      "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
    );
    function resolveYamlTimestamp(data) {
      if (data === null) return false;
      if (YAML_DATE_REGEXP.exec(data) !== null) return true;
      if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
      return false;
    }
    function constructYamlTimestamp(data) {
      var match, year, month, day, hour, minute, second, fraction = 0, delta = null, tz_hour, tz_minute, date;
      match = YAML_DATE_REGEXP.exec(data);
      if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);
      if (match === null) throw new Error("Date resolve error");
      year = +match[1];
      month = +match[2] - 1;
      day = +match[3];
      if (!match[4]) {
        return new Date(Date.UTC(year, month, day));
      }
      hour = +match[4];
      minute = +match[5];
      second = +match[6];
      if (match[7]) {
        fraction = match[7].slice(0, 3);
        while (fraction.length < 3) {
          fraction += "0";
        }
        fraction = +fraction;
      }
      if (match[9]) {
        tz_hour = +match[10];
        tz_minute = +(match[11] || 0);
        delta = (tz_hour * 60 + tz_minute) * 6e4;
        if (match[9] === "-") delta = -delta;
      }
      date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
      if (delta) date.setTime(date.getTime() - delta);
      return date;
    }
    function representYamlTimestamp(object) {
      return object.toISOString();
    }
    module2.exports = new Type("tag:yaml.org,2002:timestamp", {
      kind: "scalar",
      resolve: resolveYamlTimestamp,
      construct: constructYamlTimestamp,
      instanceOf: Date,
      represent: representYamlTimestamp
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/merge.js
var require_merge = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/merge.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    function resolveYamlMerge(data) {
      return data === "<<" || data === null;
    }
    module2.exports = new Type("tag:yaml.org,2002:merge", {
      kind: "scalar",
      resolve: resolveYamlMerge
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/binary.js
var require_binary = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/binary.js"(exports2, module2) {
    "use strict";
    var NodeBuffer;
    try {
      _require = require;
      NodeBuffer = _require("buffer").Buffer;
    } catch (__) {
    }
    var _require;
    var Type = require_type();
    var BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
    function resolveYamlBinary(data) {
      if (data === null) return false;
      var code, idx, bitlen = 0, max = data.length, map = BASE64_MAP;
      for (idx = 0; idx < max; idx++) {
        code = map.indexOf(data.charAt(idx));
        if (code > 64) continue;
        if (code < 0) return false;
        bitlen += 6;
      }
      return bitlen % 8 === 0;
    }
    function constructYamlBinary(data) {
      var idx, tailbits, input = data.replace(/[\r\n=]/g, ""), max = input.length, map = BASE64_MAP, bits = 0, result = [];
      for (idx = 0; idx < max; idx++) {
        if (idx % 4 === 0 && idx) {
          result.push(bits >> 16 & 255);
          result.push(bits >> 8 & 255);
          result.push(bits & 255);
        }
        bits = bits << 6 | map.indexOf(input.charAt(idx));
      }
      tailbits = max % 4 * 6;
      if (tailbits === 0) {
        result.push(bits >> 16 & 255);
        result.push(bits >> 8 & 255);
        result.push(bits & 255);
      } else if (tailbits === 18) {
        result.push(bits >> 10 & 255);
        result.push(bits >> 2 & 255);
      } else if (tailbits === 12) {
        result.push(bits >> 4 & 255);
      }
      if (NodeBuffer) {
        return NodeBuffer.from ? NodeBuffer.from(result) : new NodeBuffer(result);
      }
      return result;
    }
    function representYamlBinary(object) {
      var result = "", bits = 0, idx, tail, max = object.length, map = BASE64_MAP;
      for (idx = 0; idx < max; idx++) {
        if (idx % 3 === 0 && idx) {
          result += map[bits >> 18 & 63];
          result += map[bits >> 12 & 63];
          result += map[bits >> 6 & 63];
          result += map[bits & 63];
        }
        bits = (bits << 8) + object[idx];
      }
      tail = max % 3;
      if (tail === 0) {
        result += map[bits >> 18 & 63];
        result += map[bits >> 12 & 63];
        result += map[bits >> 6 & 63];
        result += map[bits & 63];
      } else if (tail === 2) {
        result += map[bits >> 10 & 63];
        result += map[bits >> 4 & 63];
        result += map[bits << 2 & 63];
        result += map[64];
      } else if (tail === 1) {
        result += map[bits >> 2 & 63];
        result += map[bits << 4 & 63];
        result += map[64];
        result += map[64];
      }
      return result;
    }
    function isBinary(object) {
      return NodeBuffer && NodeBuffer.isBuffer(object);
    }
    module2.exports = new Type("tag:yaml.org,2002:binary", {
      kind: "scalar",
      resolve: resolveYamlBinary,
      construct: constructYamlBinary,
      predicate: isBinary,
      represent: representYamlBinary
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/omap.js
var require_omap = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/omap.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var _toString = Object.prototype.toString;
    function resolveYamlOmap(data) {
      if (data === null) return true;
      var objectKeys = [], index, length, pair, pairKey, pairHasKey, object = data;
      for (index = 0, length = object.length; index < length; index += 1) {
        pair = object[index];
        pairHasKey = false;
        if (_toString.call(pair) !== "[object Object]") return false;
        for (pairKey in pair) {
          if (_hasOwnProperty.call(pair, pairKey)) {
            if (!pairHasKey) pairHasKey = true;
            else return false;
          }
        }
        if (!pairHasKey) return false;
        if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
        else return false;
      }
      return true;
    }
    function constructYamlOmap(data) {
      return data !== null ? data : [];
    }
    module2.exports = new Type("tag:yaml.org,2002:omap", {
      kind: "sequence",
      resolve: resolveYamlOmap,
      construct: constructYamlOmap
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/pairs.js
var require_pairs = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/pairs.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    var _toString = Object.prototype.toString;
    function resolveYamlPairs(data) {
      if (data === null) return true;
      var index, length, pair, keys, result, object = data;
      result = new Array(object.length);
      for (index = 0, length = object.length; index < length; index += 1) {
        pair = object[index];
        if (_toString.call(pair) !== "[object Object]") return false;
        keys = Object.keys(pair);
        if (keys.length !== 1) return false;
        result[index] = [keys[0], pair[keys[0]]];
      }
      return true;
    }
    function constructYamlPairs(data) {
      if (data === null) return [];
      var index, length, pair, keys, result, object = data;
      result = new Array(object.length);
      for (index = 0, length = object.length; index < length; index += 1) {
        pair = object[index];
        keys = Object.keys(pair);
        result[index] = [keys[0], pair[keys[0]]];
      }
      return result;
    }
    module2.exports = new Type("tag:yaml.org,2002:pairs", {
      kind: "sequence",
      resolve: resolveYamlPairs,
      construct: constructYamlPairs
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/set.js
var require_set = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/set.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    function resolveYamlSet(data) {
      if (data === null) return true;
      var key, object = data;
      for (key in object) {
        if (_hasOwnProperty.call(object, key)) {
          if (object[key] !== null) return false;
        }
      }
      return true;
    }
    function constructYamlSet(data) {
      return data !== null ? data : {};
    }
    module2.exports = new Type("tag:yaml.org,2002:set", {
      kind: "mapping",
      resolve: resolveYamlSet,
      construct: constructYamlSet
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/schema/default_safe.js
var require_default_safe = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/schema/default_safe.js"(exports2, module2) {
    "use strict";
    var Schema = require_schema();
    module2.exports = new Schema({
      include: [
        require_core()
      ],
      implicit: [
        require_timestamp(),
        require_merge()
      ],
      explicit: [
        require_binary(),
        require_omap(),
        require_pairs(),
        require_set()
      ]
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/js/undefined.js
var require_undefined = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/js/undefined.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    function resolveJavascriptUndefined() {
      return true;
    }
    function constructJavascriptUndefined() {
      return void 0;
    }
    function representJavascriptUndefined() {
      return "";
    }
    function isUndefined(object) {
      return typeof object === "undefined";
    }
    module2.exports = new Type("tag:yaml.org,2002:js/undefined", {
      kind: "scalar",
      resolve: resolveJavascriptUndefined,
      construct: constructJavascriptUndefined,
      predicate: isUndefined,
      represent: representJavascriptUndefined
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/js/regexp.js
var require_regexp = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/js/regexp.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    function resolveJavascriptRegExp(data) {
      if (data === null) return false;
      if (data.length === 0) return false;
      var regexp = data, tail = /\/([gim]*)$/.exec(data), modifiers = "";
      if (regexp[0] === "/") {
        if (tail) modifiers = tail[1];
        if (modifiers.length > 3) return false;
        if (regexp[regexp.length - modifiers.length - 1] !== "/") return false;
      }
      return true;
    }
    function constructJavascriptRegExp(data) {
      var regexp = data, tail = /\/([gim]*)$/.exec(data), modifiers = "";
      if (regexp[0] === "/") {
        if (tail) modifiers = tail[1];
        regexp = regexp.slice(1, regexp.length - modifiers.length - 1);
      }
      return new RegExp(regexp, modifiers);
    }
    function representJavascriptRegExp(object) {
      var result = "/" + object.source + "/";
      if (object.global) result += "g";
      if (object.multiline) result += "m";
      if (object.ignoreCase) result += "i";
      return result;
    }
    function isRegExp(object) {
      return Object.prototype.toString.call(object) === "[object RegExp]";
    }
    module2.exports = new Type("tag:yaml.org,2002:js/regexp", {
      kind: "scalar",
      resolve: resolveJavascriptRegExp,
      construct: constructJavascriptRegExp,
      predicate: isRegExp,
      represent: representJavascriptRegExp
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/js/function.js
var require_function = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/js/function.js"(exports2, module2) {
    "use strict";
    var esprima;
    try {
      _require = require;
      esprima = _require("esprima");
    } catch (_) {
      if (typeof window !== "undefined") esprima = window.esprima;
    }
    var _require;
    var Type = require_type();
    function resolveJavascriptFunction(data) {
      if (data === null) return false;
      try {
        var source = "(" + data + ")", ast = esprima.parse(source, { range: true });
        if (ast.type !== "Program" || ast.body.length !== 1 || ast.body[0].type !== "ExpressionStatement" || ast.body[0].expression.type !== "ArrowFunctionExpression" && ast.body[0].expression.type !== "FunctionExpression") {
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    }
    function constructJavascriptFunction(data) {
      var source = "(" + data + ")", ast = esprima.parse(source, { range: true }), params = [], body;
      if (ast.type !== "Program" || ast.body.length !== 1 || ast.body[0].type !== "ExpressionStatement" || ast.body[0].expression.type !== "ArrowFunctionExpression" && ast.body[0].expression.type !== "FunctionExpression") {
        throw new Error("Failed to resolve function");
      }
      ast.body[0].expression.params.forEach(function(param) {
        params.push(param.name);
      });
      body = ast.body[0].expression.body.range;
      if (ast.body[0].expression.body.type === "BlockStatement") {
        return new Function(params, source.slice(body[0] + 1, body[1] - 1));
      }
      return new Function(params, "return " + source.slice(body[0], body[1]));
    }
    function representJavascriptFunction(object) {
      return object.toString();
    }
    function isFunction(object) {
      return Object.prototype.toString.call(object) === "[object Function]";
    }
    module2.exports = new Type("tag:yaml.org,2002:js/function", {
      kind: "scalar",
      resolve: resolveJavascriptFunction,
      construct: constructJavascriptFunction,
      predicate: isFunction,
      represent: representJavascriptFunction
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/schema/default_full.js
var require_default_full = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/schema/default_full.js"(exports2, module2) {
    "use strict";
    var Schema = require_schema();
    module2.exports = Schema.DEFAULT = new Schema({
      include: [
        require_default_safe()
      ],
      explicit: [
        require_undefined(),
        require_regexp(),
        require_function()
      ]
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/loader.js
var require_loader = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/loader.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    var YAMLException = require_exception();
    var Mark = require_mark();
    var DEFAULT_SAFE_SCHEMA = require_default_safe();
    var DEFAULT_FULL_SCHEMA = require_default_full();
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var CONTEXT_FLOW_IN = 1;
    var CONTEXT_FLOW_OUT = 2;
    var CONTEXT_BLOCK_IN = 3;
    var CONTEXT_BLOCK_OUT = 4;
    var CHOMPING_CLIP = 1;
    var CHOMPING_STRIP = 2;
    var CHOMPING_KEEP = 3;
    var PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
    var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
    var PATTERN_FLOW_INDICATORS = /[,\[\]\{\}]/;
    var PATTERN_TAG_HANDLE = /^(?:!|!!|![a-z\-]+!)$/i;
    var PATTERN_TAG_URI = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
    function _class(obj) {
      return Object.prototype.toString.call(obj);
    }
    function is_EOL(c) {
      return c === 10 || c === 13;
    }
    function is_WHITE_SPACE(c) {
      return c === 9 || c === 32;
    }
    function is_WS_OR_EOL(c) {
      return c === 9 || c === 32 || c === 10 || c === 13;
    }
    function is_FLOW_INDICATOR(c) {
      return c === 44 || c === 91 || c === 93 || c === 123 || c === 125;
    }
    function fromHexCode(c) {
      var lc;
      if (48 <= c && c <= 57) {
        return c - 48;
      }
      lc = c | 32;
      if (97 <= lc && lc <= 102) {
        return lc - 97 + 10;
      }
      return -1;
    }
    function escapedHexLen(c) {
      if (c === 120) {
        return 2;
      }
      if (c === 117) {
        return 4;
      }
      if (c === 85) {
        return 8;
      }
      return 0;
    }
    function fromDecimalCode(c) {
      if (48 <= c && c <= 57) {
        return c - 48;
      }
      return -1;
    }
    function simpleEscapeSequence(c) {
      return c === 48 ? "\0" : c === 97 ? "\x07" : c === 98 ? "\b" : c === 116 ? "	" : c === 9 ? "	" : c === 110 ? "\n" : c === 118 ? "\v" : c === 102 ? "\f" : c === 114 ? "\r" : c === 101 ? "\x1B" : c === 32 ? " " : c === 34 ? '"' : c === 47 ? "/" : c === 92 ? "\\" : c === 78 ? "\x85" : c === 95 ? "\xA0" : c === 76 ? "\u2028" : c === 80 ? "\u2029" : "";
    }
    function charFromCodepoint(c) {
      if (c <= 65535) {
        return String.fromCharCode(c);
      }
      return String.fromCharCode(
        (c - 65536 >> 10) + 55296,
        (c - 65536 & 1023) + 56320
      );
    }
    function setProperty(object, key, value) {
      if (key === "__proto__") {
        Object.defineProperty(object, key, {
          configurable: true,
          enumerable: true,
          writable: true,
          value
        });
      } else {
        object[key] = value;
      }
    }
    var simpleEscapeCheck = new Array(256);
    var simpleEscapeMap = new Array(256);
    for (i = 0; i < 256; i++) {
      simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
      simpleEscapeMap[i] = simpleEscapeSequence(i);
    }
    var i;
    function State(input, options2) {
      this.input = input;
      this.filename = options2["filename"] || null;
      this.schema = options2["schema"] || DEFAULT_FULL_SCHEMA;
      this.onWarning = options2["onWarning"] || null;
      this.legacy = options2["legacy"] || false;
      this.json = options2["json"] || false;
      this.listener = options2["listener"] || null;
      this.implicitTypes = this.schema.compiledImplicit;
      this.typeMap = this.schema.compiledTypeMap;
      this.length = input.length;
      this.position = 0;
      this.line = 0;
      this.lineStart = 0;
      this.lineIndent = 0;
      this.documents = [];
    }
    function generateError(state, message) {
      return new YAMLException(
        message,
        new Mark(state.filename, state.input, state.position, state.line, state.position - state.lineStart)
      );
    }
    function throwError(state, message) {
      throw generateError(state, message);
    }
    function throwWarning(state, message) {
      if (state.onWarning) {
        state.onWarning.call(null, generateError(state, message));
      }
    }
    var directiveHandlers = {
      YAML: function handleYamlDirective(state, name, args) {
        var match, major, minor;
        if (state.version !== null) {
          throwError(state, "duplication of %YAML directive");
        }
        if (args.length !== 1) {
          throwError(state, "YAML directive accepts exactly one argument");
        }
        match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
        if (match === null) {
          throwError(state, "ill-formed argument of the YAML directive");
        }
        major = parseInt(match[1], 10);
        minor = parseInt(match[2], 10);
        if (major !== 1) {
          throwError(state, "unacceptable YAML version of the document");
        }
        state.version = args[0];
        state.checkLineBreaks = minor < 2;
        if (minor !== 1 && minor !== 2) {
          throwWarning(state, "unsupported YAML version of the document");
        }
      },
      TAG: function handleTagDirective(state, name, args) {
        var handle, prefix;
        if (args.length !== 2) {
          throwError(state, "TAG directive accepts exactly two arguments");
        }
        handle = args[0];
        prefix = args[1];
        if (!PATTERN_TAG_HANDLE.test(handle)) {
          throwError(state, "ill-formed tag handle (first argument) of the TAG directive");
        }
        if (_hasOwnProperty.call(state.tagMap, handle)) {
          throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
        }
        if (!PATTERN_TAG_URI.test(prefix)) {
          throwError(state, "ill-formed tag prefix (second argument) of the TAG directive");
        }
        state.tagMap[handle] = prefix;
      }
    };
    function captureSegment(state, start, end, checkJson) {
      var _position, _length, _character, _result;
      if (start < end) {
        _result = state.input.slice(start, end);
        if (checkJson) {
          for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
            _character = _result.charCodeAt(_position);
            if (!(_character === 9 || 32 <= _character && _character <= 1114111)) {
              throwError(state, "expected valid JSON character");
            }
          }
        } else if (PATTERN_NON_PRINTABLE.test(_result)) {
          throwError(state, "the stream contains non-printable characters");
        }
        state.result += _result;
      }
    }
    function mergeMappings(state, destination, source, overridableKeys) {
      var sourceKeys, key, index, quantity;
      if (!common.isObject(source)) {
        throwError(state, "cannot merge mappings; the provided source object is unacceptable");
      }
      sourceKeys = Object.keys(source);
      for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
        key = sourceKeys[index];
        if (!_hasOwnProperty.call(destination, key)) {
          setProperty(destination, key, source[key]);
          overridableKeys[key] = true;
        }
      }
    }
    function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startPos) {
      var index, quantity;
      if (Array.isArray(keyNode)) {
        keyNode = Array.prototype.slice.call(keyNode);
        for (index = 0, quantity = keyNode.length; index < quantity; index += 1) {
          if (Array.isArray(keyNode[index])) {
            throwError(state, "nested arrays are not supported inside keys");
          }
          if (typeof keyNode === "object" && _class(keyNode[index]) === "[object Object]") {
            keyNode[index] = "[object Object]";
          }
        }
      }
      if (typeof keyNode === "object" && _class(keyNode) === "[object Object]") {
        keyNode = "[object Object]";
      }
      keyNode = String(keyNode);
      if (_result === null) {
        _result = {};
      }
      if (keyTag === "tag:yaml.org,2002:merge") {
        if (Array.isArray(valueNode)) {
          for (index = 0, quantity = valueNode.length; index < quantity; index += 1) {
            mergeMappings(state, _result, valueNode[index], overridableKeys);
          }
        } else {
          mergeMappings(state, _result, valueNode, overridableKeys);
        }
      } else {
        if (!state.json && !_hasOwnProperty.call(overridableKeys, keyNode) && _hasOwnProperty.call(_result, keyNode)) {
          state.line = startLine || state.line;
          state.position = startPos || state.position;
          throwError(state, "duplicated mapping key");
        }
        setProperty(_result, keyNode, valueNode);
        delete overridableKeys[keyNode];
      }
      return _result;
    }
    function readLineBreak(state) {
      var ch;
      ch = state.input.charCodeAt(state.position);
      if (ch === 10) {
        state.position++;
      } else if (ch === 13) {
        state.position++;
        if (state.input.charCodeAt(state.position) === 10) {
          state.position++;
        }
      } else {
        throwError(state, "a line break is expected");
      }
      state.line += 1;
      state.lineStart = state.position;
    }
    function skipSeparationSpace(state, allowComments, checkIndent) {
      var lineBreaks = 0, ch = state.input.charCodeAt(state.position);
      while (ch !== 0) {
        while (is_WHITE_SPACE(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        if (allowComments && ch === 35) {
          do {
            ch = state.input.charCodeAt(++state.position);
          } while (ch !== 10 && ch !== 13 && ch !== 0);
        }
        if (is_EOL(ch)) {
          readLineBreak(state);
          ch = state.input.charCodeAt(state.position);
          lineBreaks++;
          state.lineIndent = 0;
          while (ch === 32) {
            state.lineIndent++;
            ch = state.input.charCodeAt(++state.position);
          }
        } else {
          break;
        }
      }
      if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
        throwWarning(state, "deficient indentation");
      }
      return lineBreaks;
    }
    function testDocumentSeparator(state) {
      var _position = state.position, ch;
      ch = state.input.charCodeAt(_position);
      if ((ch === 45 || ch === 46) && ch === state.input.charCodeAt(_position + 1) && ch === state.input.charCodeAt(_position + 2)) {
        _position += 3;
        ch = state.input.charCodeAt(_position);
        if (ch === 0 || is_WS_OR_EOL(ch)) {
          return true;
        }
      }
      return false;
    }
    function writeFoldedLines(state, count) {
      if (count === 1) {
        state.result += " ";
      } else if (count > 1) {
        state.result += common.repeat("\n", count - 1);
      }
    }
    function readPlainScalar(state, nodeIndent, withinFlowCollection) {
      var preceding, following, captureStart, captureEnd, hasPendingContent, _line, _lineStart, _lineIndent, _kind = state.kind, _result = state.result, ch;
      ch = state.input.charCodeAt(state.position);
      if (is_WS_OR_EOL(ch) || is_FLOW_INDICATOR(ch) || ch === 35 || ch === 38 || ch === 42 || ch === 33 || ch === 124 || ch === 62 || ch === 39 || ch === 34 || ch === 37 || ch === 64 || ch === 96) {
        return false;
      }
      if (ch === 63 || ch === 45) {
        following = state.input.charCodeAt(state.position + 1);
        if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
          return false;
        }
      }
      state.kind = "scalar";
      state.result = "";
      captureStart = captureEnd = state.position;
      hasPendingContent = false;
      while (ch !== 0) {
        if (ch === 58) {
          following = state.input.charCodeAt(state.position + 1);
          if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
            break;
          }
        } else if (ch === 35) {
          preceding = state.input.charCodeAt(state.position - 1);
          if (is_WS_OR_EOL(preceding)) {
            break;
          }
        } else if (state.position === state.lineStart && testDocumentSeparator(state) || withinFlowCollection && is_FLOW_INDICATOR(ch)) {
          break;
        } else if (is_EOL(ch)) {
          _line = state.line;
          _lineStart = state.lineStart;
          _lineIndent = state.lineIndent;
          skipSeparationSpace(state, false, -1);
          if (state.lineIndent >= nodeIndent) {
            hasPendingContent = true;
            ch = state.input.charCodeAt(state.position);
            continue;
          } else {
            state.position = captureEnd;
            state.line = _line;
            state.lineStart = _lineStart;
            state.lineIndent = _lineIndent;
            break;
          }
        }
        if (hasPendingContent) {
          captureSegment(state, captureStart, captureEnd, false);
          writeFoldedLines(state, state.line - _line);
          captureStart = captureEnd = state.position;
          hasPendingContent = false;
        }
        if (!is_WHITE_SPACE(ch)) {
          captureEnd = state.position + 1;
        }
        ch = state.input.charCodeAt(++state.position);
      }
      captureSegment(state, captureStart, captureEnd, false);
      if (state.result) {
        return true;
      }
      state.kind = _kind;
      state.result = _result;
      return false;
    }
    function readSingleQuotedScalar(state, nodeIndent) {
      var ch, captureStart, captureEnd;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 39) {
        return false;
      }
      state.kind = "scalar";
      state.result = "";
      state.position++;
      captureStart = captureEnd = state.position;
      while ((ch = state.input.charCodeAt(state.position)) !== 0) {
        if (ch === 39) {
          captureSegment(state, captureStart, state.position, true);
          ch = state.input.charCodeAt(++state.position);
          if (ch === 39) {
            captureStart = state.position;
            state.position++;
            captureEnd = state.position;
          } else {
            return true;
          }
        } else if (is_EOL(ch)) {
          captureSegment(state, captureStart, captureEnd, true);
          writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
          captureStart = captureEnd = state.position;
        } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
          throwError(state, "unexpected end of the document within a single quoted scalar");
        } else {
          state.position++;
          captureEnd = state.position;
        }
      }
      throwError(state, "unexpected end of the stream within a single quoted scalar");
    }
    function readDoubleQuotedScalar(state, nodeIndent) {
      var captureStart, captureEnd, hexLength, hexResult, tmp, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 34) {
        return false;
      }
      state.kind = "scalar";
      state.result = "";
      state.position++;
      captureStart = captureEnd = state.position;
      while ((ch = state.input.charCodeAt(state.position)) !== 0) {
        if (ch === 34) {
          captureSegment(state, captureStart, state.position, true);
          state.position++;
          return true;
        } else if (ch === 92) {
          captureSegment(state, captureStart, state.position, true);
          ch = state.input.charCodeAt(++state.position);
          if (is_EOL(ch)) {
            skipSeparationSpace(state, false, nodeIndent);
          } else if (ch < 256 && simpleEscapeCheck[ch]) {
            state.result += simpleEscapeMap[ch];
            state.position++;
          } else if ((tmp = escapedHexLen(ch)) > 0) {
            hexLength = tmp;
            hexResult = 0;
            for (; hexLength > 0; hexLength--) {
              ch = state.input.charCodeAt(++state.position);
              if ((tmp = fromHexCode(ch)) >= 0) {
                hexResult = (hexResult << 4) + tmp;
              } else {
                throwError(state, "expected hexadecimal character");
              }
            }
            state.result += charFromCodepoint(hexResult);
            state.position++;
          } else {
            throwError(state, "unknown escape sequence");
          }
          captureStart = captureEnd = state.position;
        } else if (is_EOL(ch)) {
          captureSegment(state, captureStart, captureEnd, true);
          writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
          captureStart = captureEnd = state.position;
        } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
          throwError(state, "unexpected end of the document within a double quoted scalar");
        } else {
          state.position++;
          captureEnd = state.position;
        }
      }
      throwError(state, "unexpected end of the stream within a double quoted scalar");
    }
    function readFlowCollection(state, nodeIndent) {
      var readNext = true, _line, _tag = state.tag, _result, _anchor = state.anchor, following, terminator, isPair, isExplicitPair, isMapping, overridableKeys = {}, keyNode, keyTag, valueNode, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch === 91) {
        terminator = 93;
        isMapping = false;
        _result = [];
      } else if (ch === 123) {
        terminator = 125;
        isMapping = true;
        _result = {};
      } else {
        return false;
      }
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
      }
      ch = state.input.charCodeAt(++state.position);
      while (ch !== 0) {
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if (ch === terminator) {
          state.position++;
          state.tag = _tag;
          state.anchor = _anchor;
          state.kind = isMapping ? "mapping" : "sequence";
          state.result = _result;
          return true;
        } else if (!readNext) {
          throwError(state, "missed comma between flow collection entries");
        }
        keyTag = keyNode = valueNode = null;
        isPair = isExplicitPair = false;
        if (ch === 63) {
          following = state.input.charCodeAt(state.position + 1);
          if (is_WS_OR_EOL(following)) {
            isPair = isExplicitPair = true;
            state.position++;
            skipSeparationSpace(state, true, nodeIndent);
          }
        }
        _line = state.line;
        composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
        keyTag = state.tag;
        keyNode = state.result;
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if ((isExplicitPair || state.line === _line) && ch === 58) {
          isPair = true;
          ch = state.input.charCodeAt(++state.position);
          skipSeparationSpace(state, true, nodeIndent);
          composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
          valueNode = state.result;
        }
        if (isMapping) {
          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode);
        } else if (isPair) {
          _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode));
        } else {
          _result.push(keyNode);
        }
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if (ch === 44) {
          readNext = true;
          ch = state.input.charCodeAt(++state.position);
        } else {
          readNext = false;
        }
      }
      throwError(state, "unexpected end of the stream within a flow collection");
    }
    function readBlockScalar(state, nodeIndent) {
      var captureStart, folding, chomping = CHOMPING_CLIP, didReadContent = false, detectedIndent = false, textIndent = nodeIndent, emptyLines = 0, atMoreIndented = false, tmp, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch === 124) {
        folding = false;
      } else if (ch === 62) {
        folding = true;
      } else {
        return false;
      }
      state.kind = "scalar";
      state.result = "";
      while (ch !== 0) {
        ch = state.input.charCodeAt(++state.position);
        if (ch === 43 || ch === 45) {
          if (CHOMPING_CLIP === chomping) {
            chomping = ch === 43 ? CHOMPING_KEEP : CHOMPING_STRIP;
          } else {
            throwError(state, "repeat of a chomping mode identifier");
          }
        } else if ((tmp = fromDecimalCode(ch)) >= 0) {
          if (tmp === 0) {
            throwError(state, "bad explicit indentation width of a block scalar; it cannot be less than one");
          } else if (!detectedIndent) {
            textIndent = nodeIndent + tmp - 1;
            detectedIndent = true;
          } else {
            throwError(state, "repeat of an indentation width identifier");
          }
        } else {
          break;
        }
      }
      if (is_WHITE_SPACE(ch)) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (is_WHITE_SPACE(ch));
        if (ch === 35) {
          do {
            ch = state.input.charCodeAt(++state.position);
          } while (!is_EOL(ch) && ch !== 0);
        }
      }
      while (ch !== 0) {
        readLineBreak(state);
        state.lineIndent = 0;
        ch = state.input.charCodeAt(state.position);
        while ((!detectedIndent || state.lineIndent < textIndent) && ch === 32) {
          state.lineIndent++;
          ch = state.input.charCodeAt(++state.position);
        }
        if (!detectedIndent && state.lineIndent > textIndent) {
          textIndent = state.lineIndent;
        }
        if (is_EOL(ch)) {
          emptyLines++;
          continue;
        }
        if (state.lineIndent < textIndent) {
          if (chomping === CHOMPING_KEEP) {
            state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
          } else if (chomping === CHOMPING_CLIP) {
            if (didReadContent) {
              state.result += "\n";
            }
          }
          break;
        }
        if (folding) {
          if (is_WHITE_SPACE(ch)) {
            atMoreIndented = true;
            state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
          } else if (atMoreIndented) {
            atMoreIndented = false;
            state.result += common.repeat("\n", emptyLines + 1);
          } else if (emptyLines === 0) {
            if (didReadContent) {
              state.result += " ";
            }
          } else {
            state.result += common.repeat("\n", emptyLines);
          }
        } else {
          state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
        }
        didReadContent = true;
        detectedIndent = true;
        emptyLines = 0;
        captureStart = state.position;
        while (!is_EOL(ch) && ch !== 0) {
          ch = state.input.charCodeAt(++state.position);
        }
        captureSegment(state, captureStart, state.position, false);
      }
      return true;
    }
    function readBlockSequence(state, nodeIndent) {
      var _line, _tag = state.tag, _anchor = state.anchor, _result = [], following, detected = false, ch;
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
      }
      ch = state.input.charCodeAt(state.position);
      while (ch !== 0) {
        if (ch !== 45) {
          break;
        }
        following = state.input.charCodeAt(state.position + 1);
        if (!is_WS_OR_EOL(following)) {
          break;
        }
        detected = true;
        state.position++;
        if (skipSeparationSpace(state, true, -1)) {
          if (state.lineIndent <= nodeIndent) {
            _result.push(null);
            ch = state.input.charCodeAt(state.position);
            continue;
          }
        }
        _line = state.line;
        composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
        _result.push(state.result);
        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
        if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
          throwError(state, "bad indentation of a sequence entry");
        } else if (state.lineIndent < nodeIndent) {
          break;
        }
      }
      if (detected) {
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = "sequence";
        state.result = _result;
        return true;
      }
      return false;
    }
    function readBlockMapping(state, nodeIndent, flowIndent) {
      var following, allowCompact, _line, _pos, _tag = state.tag, _anchor = state.anchor, _result = {}, overridableKeys = {}, keyTag = null, keyNode = null, valueNode = null, atExplicitKey = false, detected = false, ch;
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
      }
      ch = state.input.charCodeAt(state.position);
      while (ch !== 0) {
        following = state.input.charCodeAt(state.position + 1);
        _line = state.line;
        _pos = state.position;
        if ((ch === 63 || ch === 58) && is_WS_OR_EOL(following)) {
          if (ch === 63) {
            if (atExplicitKey) {
              storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
              keyTag = keyNode = valueNode = null;
            }
            detected = true;
            atExplicitKey = true;
            allowCompact = true;
          } else if (atExplicitKey) {
            atExplicitKey = false;
            allowCompact = true;
          } else {
            throwError(state, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line");
          }
          state.position += 1;
          ch = following;
        } else if (composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
          if (state.line === _line) {
            ch = state.input.charCodeAt(state.position);
            while (is_WHITE_SPACE(ch)) {
              ch = state.input.charCodeAt(++state.position);
            }
            if (ch === 58) {
              ch = state.input.charCodeAt(++state.position);
              if (!is_WS_OR_EOL(ch)) {
                throwError(state, "a whitespace character is expected after the key-value separator within a block mapping");
              }
              if (atExplicitKey) {
                storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
                keyTag = keyNode = valueNode = null;
              }
              detected = true;
              atExplicitKey = false;
              allowCompact = false;
              keyTag = state.tag;
              keyNode = state.result;
            } else if (detected) {
              throwError(state, "can not read an implicit mapping pair; a colon is missed");
            } else {
              state.tag = _tag;
              state.anchor = _anchor;
              return true;
            }
          } else if (detected) {
            throwError(state, "can not read a block mapping entry; a multiline key may not be an implicit key");
          } else {
            state.tag = _tag;
            state.anchor = _anchor;
            return true;
          }
        } else {
          break;
        }
        if (state.line === _line || state.lineIndent > nodeIndent) {
          if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
            if (atExplicitKey) {
              keyNode = state.result;
            } else {
              valueNode = state.result;
            }
          }
          if (!atExplicitKey) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _pos);
            keyTag = keyNode = valueNode = null;
          }
          skipSeparationSpace(state, true, -1);
          ch = state.input.charCodeAt(state.position);
        }
        if (state.lineIndent > nodeIndent && ch !== 0) {
          throwError(state, "bad indentation of a mapping entry");
        } else if (state.lineIndent < nodeIndent) {
          break;
        }
      }
      if (atExplicitKey) {
        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
      }
      if (detected) {
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = "mapping";
        state.result = _result;
      }
      return detected;
    }
    function readTagProperty(state) {
      var _position, isVerbatim = false, isNamed = false, tagHandle, tagName, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 33) return false;
      if (state.tag !== null) {
        throwError(state, "duplication of a tag property");
      }
      ch = state.input.charCodeAt(++state.position);
      if (ch === 60) {
        isVerbatim = true;
        ch = state.input.charCodeAt(++state.position);
      } else if (ch === 33) {
        isNamed = true;
        tagHandle = "!!";
        ch = state.input.charCodeAt(++state.position);
      } else {
        tagHandle = "!";
      }
      _position = state.position;
      if (isVerbatim) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (ch !== 0 && ch !== 62);
        if (state.position < state.length) {
          tagName = state.input.slice(_position, state.position);
          ch = state.input.charCodeAt(++state.position);
        } else {
          throwError(state, "unexpected end of the stream within a verbatim tag");
        }
      } else {
        while (ch !== 0 && !is_WS_OR_EOL(ch)) {
          if (ch === 33) {
            if (!isNamed) {
              tagHandle = state.input.slice(_position - 1, state.position + 1);
              if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
                throwError(state, "named tag handle cannot contain such characters");
              }
              isNamed = true;
              _position = state.position + 1;
            } else {
              throwError(state, "tag suffix cannot contain exclamation marks");
            }
          }
          ch = state.input.charCodeAt(++state.position);
        }
        tagName = state.input.slice(_position, state.position);
        if (PATTERN_FLOW_INDICATORS.test(tagName)) {
          throwError(state, "tag suffix cannot contain flow indicator characters");
        }
      }
      if (tagName && !PATTERN_TAG_URI.test(tagName)) {
        throwError(state, "tag name cannot contain such characters: " + tagName);
      }
      if (isVerbatim) {
        state.tag = tagName;
      } else if (_hasOwnProperty.call(state.tagMap, tagHandle)) {
        state.tag = state.tagMap[tagHandle] + tagName;
      } else if (tagHandle === "!") {
        state.tag = "!" + tagName;
      } else if (tagHandle === "!!") {
        state.tag = "tag:yaml.org,2002:" + tagName;
      } else {
        throwError(state, 'undeclared tag handle "' + tagHandle + '"');
      }
      return true;
    }
    function readAnchorProperty(state) {
      var _position, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 38) return false;
      if (state.anchor !== null) {
        throwError(state, "duplication of an anchor property");
      }
      ch = state.input.charCodeAt(++state.position);
      _position = state.position;
      while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      if (state.position === _position) {
        throwError(state, "name of an anchor node must contain at least one character");
      }
      state.anchor = state.input.slice(_position, state.position);
      return true;
    }
    function readAlias(state) {
      var _position, alias, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 42) return false;
      ch = state.input.charCodeAt(++state.position);
      _position = state.position;
      while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      if (state.position === _position) {
        throwError(state, "name of an alias node must contain at least one character");
      }
      alias = state.input.slice(_position, state.position);
      if (!_hasOwnProperty.call(state.anchorMap, alias)) {
        throwError(state, 'unidentified alias "' + alias + '"');
      }
      state.result = state.anchorMap[alias];
      skipSeparationSpace(state, true, -1);
      return true;
    }
    function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
      var allowBlockStyles, allowBlockScalars, allowBlockCollections, indentStatus = 1, atNewLine = false, hasContent = false, typeIndex, typeQuantity, type, flowIndent, blockIndent;
      if (state.listener !== null) {
        state.listener("open", state);
      }
      state.tag = null;
      state.anchor = null;
      state.kind = null;
      state.result = null;
      allowBlockStyles = allowBlockScalars = allowBlockCollections = CONTEXT_BLOCK_OUT === nodeContext || CONTEXT_BLOCK_IN === nodeContext;
      if (allowToSeek) {
        if (skipSeparationSpace(state, true, -1)) {
          atNewLine = true;
          if (state.lineIndent > parentIndent) {
            indentStatus = 1;
          } else if (state.lineIndent === parentIndent) {
            indentStatus = 0;
          } else if (state.lineIndent < parentIndent) {
            indentStatus = -1;
          }
        }
      }
      if (indentStatus === 1) {
        while (readTagProperty(state) || readAnchorProperty(state)) {
          if (skipSeparationSpace(state, true, -1)) {
            atNewLine = true;
            allowBlockCollections = allowBlockStyles;
            if (state.lineIndent > parentIndent) {
              indentStatus = 1;
            } else if (state.lineIndent === parentIndent) {
              indentStatus = 0;
            } else if (state.lineIndent < parentIndent) {
              indentStatus = -1;
            }
          } else {
            allowBlockCollections = false;
          }
        }
      }
      if (allowBlockCollections) {
        allowBlockCollections = atNewLine || allowCompact;
      }
      if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
        if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
          flowIndent = parentIndent;
        } else {
          flowIndent = parentIndent + 1;
        }
        blockIndent = state.position - state.lineStart;
        if (indentStatus === 1) {
          if (allowBlockCollections && (readBlockSequence(state, blockIndent) || readBlockMapping(state, blockIndent, flowIndent)) || readFlowCollection(state, flowIndent)) {
            hasContent = true;
          } else {
            if (allowBlockScalars && readBlockScalar(state, flowIndent) || readSingleQuotedScalar(state, flowIndent) || readDoubleQuotedScalar(state, flowIndent)) {
              hasContent = true;
            } else if (readAlias(state)) {
              hasContent = true;
              if (state.tag !== null || state.anchor !== null) {
                throwError(state, "alias node should not have any properties");
              }
            } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
              hasContent = true;
              if (state.tag === null) {
                state.tag = "?";
              }
            }
            if (state.anchor !== null) {
              state.anchorMap[state.anchor] = state.result;
            }
          }
        } else if (indentStatus === 0) {
          hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
        }
      }
      if (state.tag !== null && state.tag !== "!") {
        if (state.tag === "?") {
          if (state.result !== null && state.kind !== "scalar") {
            throwError(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
          }
          for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
            type = state.implicitTypes[typeIndex];
            if (type.resolve(state.result)) {
              state.result = type.construct(state.result);
              state.tag = type.tag;
              if (state.anchor !== null) {
                state.anchorMap[state.anchor] = state.result;
              }
              break;
            }
          }
        } else if (_hasOwnProperty.call(state.typeMap[state.kind || "fallback"], state.tag)) {
          type = state.typeMap[state.kind || "fallback"][state.tag];
          if (state.result !== null && type.kind !== state.kind) {
            throwError(state, "unacceptable node kind for !<" + state.tag + '> tag; it should be "' + type.kind + '", not "' + state.kind + '"');
          }
          if (!type.resolve(state.result)) {
            throwError(state, "cannot resolve a node with !<" + state.tag + "> explicit tag");
          } else {
            state.result = type.construct(state.result);
            if (state.anchor !== null) {
              state.anchorMap[state.anchor] = state.result;
            }
          }
        } else {
          throwError(state, "unknown tag !<" + state.tag + ">");
        }
      }
      if (state.listener !== null) {
        state.listener("close", state);
      }
      return state.tag !== null || state.anchor !== null || hasContent;
    }
    function readDocument(state) {
      var documentStart = state.position, _position, directiveName, directiveArgs, hasDirectives = false, ch;
      state.version = null;
      state.checkLineBreaks = state.legacy;
      state.tagMap = {};
      state.anchorMap = {};
      while ((ch = state.input.charCodeAt(state.position)) !== 0) {
        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
        if (state.lineIndent > 0 || ch !== 37) {
          break;
        }
        hasDirectives = true;
        ch = state.input.charCodeAt(++state.position);
        _position = state.position;
        while (ch !== 0 && !is_WS_OR_EOL(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        directiveName = state.input.slice(_position, state.position);
        directiveArgs = [];
        if (directiveName.length < 1) {
          throwError(state, "directive name must not be less than one character in length");
        }
        while (ch !== 0) {
          while (is_WHITE_SPACE(ch)) {
            ch = state.input.charCodeAt(++state.position);
          }
          if (ch === 35) {
            do {
              ch = state.input.charCodeAt(++state.position);
            } while (ch !== 0 && !is_EOL(ch));
            break;
          }
          if (is_EOL(ch)) break;
          _position = state.position;
          while (ch !== 0 && !is_WS_OR_EOL(ch)) {
            ch = state.input.charCodeAt(++state.position);
          }
          directiveArgs.push(state.input.slice(_position, state.position));
        }
        if (ch !== 0) readLineBreak(state);
        if (_hasOwnProperty.call(directiveHandlers, directiveName)) {
          directiveHandlers[directiveName](state, directiveName, directiveArgs);
        } else {
          throwWarning(state, 'unknown document directive "' + directiveName + '"');
        }
      }
      skipSeparationSpace(state, true, -1);
      if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 45 && state.input.charCodeAt(state.position + 1) === 45 && state.input.charCodeAt(state.position + 2) === 45) {
        state.position += 3;
        skipSeparationSpace(state, true, -1);
      } else if (hasDirectives) {
        throwError(state, "directives end mark is expected");
      }
      composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
      skipSeparationSpace(state, true, -1);
      if (state.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
        throwWarning(state, "non-ASCII line breaks are interpreted as content");
      }
      state.documents.push(state.result);
      if (state.position === state.lineStart && testDocumentSeparator(state)) {
        if (state.input.charCodeAt(state.position) === 46) {
          state.position += 3;
          skipSeparationSpace(state, true, -1);
        }
        return;
      }
      if (state.position < state.length - 1) {
        throwError(state, "end of the stream or a document separator is expected");
      } else {
        return;
      }
    }
    function loadDocuments(input, options2) {
      input = String(input);
      options2 = options2 || {};
      if (input.length !== 0) {
        if (input.charCodeAt(input.length - 1) !== 10 && input.charCodeAt(input.length - 1) !== 13) {
          input += "\n";
        }
        if (input.charCodeAt(0) === 65279) {
          input = input.slice(1);
        }
      }
      var state = new State(input, options2);
      var nullpos = input.indexOf("\0");
      if (nullpos !== -1) {
        state.position = nullpos;
        throwError(state, "null byte is not allowed in input");
      }
      state.input += "\0";
      while (state.input.charCodeAt(state.position) === 32) {
        state.lineIndent += 1;
        state.position += 1;
      }
      while (state.position < state.length - 1) {
        readDocument(state);
      }
      return state.documents;
    }
    function loadAll(input, iterator, options2) {
      if (iterator !== null && typeof iterator === "object" && typeof options2 === "undefined") {
        options2 = iterator;
        iterator = null;
      }
      var documents = loadDocuments(input, options2);
      if (typeof iterator !== "function") {
        return documents;
      }
      for (var index = 0, length = documents.length; index < length; index += 1) {
        iterator(documents[index]);
      }
    }
    function load(input, options2) {
      var documents = loadDocuments(input, options2);
      if (documents.length === 0) {
        return void 0;
      } else if (documents.length === 1) {
        return documents[0];
      }
      throw new YAMLException("expected a single document in the stream, but found more");
    }
    function safeLoadAll(input, iterator, options2) {
      if (typeof iterator === "object" && iterator !== null && typeof options2 === "undefined") {
        options2 = iterator;
        iterator = null;
      }
      return loadAll(input, iterator, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options2));
    }
    function safeLoad(input, options2) {
      return load(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options2));
    }
    module2.exports.loadAll = loadAll;
    module2.exports.load = load;
    module2.exports.safeLoadAll = safeLoadAll;
    module2.exports.safeLoad = safeLoad;
  }
});

// node_modules/js-yaml/lib/js-yaml/dumper.js
var require_dumper = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/dumper.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    var YAMLException = require_exception();
    var DEFAULT_FULL_SCHEMA = require_default_full();
    var DEFAULT_SAFE_SCHEMA = require_default_safe();
    var _toString = Object.prototype.toString;
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var CHAR_TAB = 9;
    var CHAR_LINE_FEED = 10;
    var CHAR_CARRIAGE_RETURN = 13;
    var CHAR_SPACE = 32;
    var CHAR_EXCLAMATION = 33;
    var CHAR_DOUBLE_QUOTE = 34;
    var CHAR_SHARP = 35;
    var CHAR_PERCENT = 37;
    var CHAR_AMPERSAND = 38;
    var CHAR_SINGLE_QUOTE = 39;
    var CHAR_ASTERISK = 42;
    var CHAR_COMMA = 44;
    var CHAR_MINUS = 45;
    var CHAR_COLON = 58;
    var CHAR_EQUALS = 61;
    var CHAR_GREATER_THAN = 62;
    var CHAR_QUESTION = 63;
    var CHAR_COMMERCIAL_AT = 64;
    var CHAR_LEFT_SQUARE_BRACKET = 91;
    var CHAR_RIGHT_SQUARE_BRACKET = 93;
    var CHAR_GRAVE_ACCENT = 96;
    var CHAR_LEFT_CURLY_BRACKET = 123;
    var CHAR_VERTICAL_LINE = 124;
    var CHAR_RIGHT_CURLY_BRACKET = 125;
    var ESCAPE_SEQUENCES = {};
    ESCAPE_SEQUENCES[0] = "\\0";
    ESCAPE_SEQUENCES[7] = "\\a";
    ESCAPE_SEQUENCES[8] = "\\b";
    ESCAPE_SEQUENCES[9] = "\\t";
    ESCAPE_SEQUENCES[10] = "\\n";
    ESCAPE_SEQUENCES[11] = "\\v";
    ESCAPE_SEQUENCES[12] = "\\f";
    ESCAPE_SEQUENCES[13] = "\\r";
    ESCAPE_SEQUENCES[27] = "\\e";
    ESCAPE_SEQUENCES[34] = '\\"';
    ESCAPE_SEQUENCES[92] = "\\\\";
    ESCAPE_SEQUENCES[133] = "\\N";
    ESCAPE_SEQUENCES[160] = "\\_";
    ESCAPE_SEQUENCES[8232] = "\\L";
    ESCAPE_SEQUENCES[8233] = "\\P";
    var DEPRECATED_BOOLEANS_SYNTAX = [
      "y",
      "Y",
      "yes",
      "Yes",
      "YES",
      "on",
      "On",
      "ON",
      "n",
      "N",
      "no",
      "No",
      "NO",
      "off",
      "Off",
      "OFF"
    ];
    function compileStyleMap(schema, map) {
      var result, keys, index, length, tag, style, type;
      if (map === null) return {};
      result = {};
      keys = Object.keys(map);
      for (index = 0, length = keys.length; index < length; index += 1) {
        tag = keys[index];
        style = String(map[tag]);
        if (tag.slice(0, 2) === "!!") {
          tag = "tag:yaml.org,2002:" + tag.slice(2);
        }
        type = schema.compiledTypeMap["fallback"][tag];
        if (type && _hasOwnProperty.call(type.styleAliases, style)) {
          style = type.styleAliases[style];
        }
        result[tag] = style;
      }
      return result;
    }
    function encodeHex(character) {
      var string, handle, length;
      string = character.toString(16).toUpperCase();
      if (character <= 255) {
        handle = "x";
        length = 2;
      } else if (character <= 65535) {
        handle = "u";
        length = 4;
      } else if (character <= 4294967295) {
        handle = "U";
        length = 8;
      } else {
        throw new YAMLException("code point within a string may not be greater than 0xFFFFFFFF");
      }
      return "\\" + handle + common.repeat("0", length - string.length) + string;
    }
    function State(options2) {
      this.schema = options2["schema"] || DEFAULT_FULL_SCHEMA;
      this.indent = Math.max(1, options2["indent"] || 2);
      this.noArrayIndent = options2["noArrayIndent"] || false;
      this.skipInvalid = options2["skipInvalid"] || false;
      this.flowLevel = common.isNothing(options2["flowLevel"]) ? -1 : options2["flowLevel"];
      this.styleMap = compileStyleMap(this.schema, options2["styles"] || null);
      this.sortKeys = options2["sortKeys"] || false;
      this.lineWidth = options2["lineWidth"] || 80;
      this.noRefs = options2["noRefs"] || false;
      this.noCompatMode = options2["noCompatMode"] || false;
      this.condenseFlow = options2["condenseFlow"] || false;
      this.implicitTypes = this.schema.compiledImplicit;
      this.explicitTypes = this.schema.compiledExplicit;
      this.tag = null;
      this.result = "";
      this.duplicates = [];
      this.usedDuplicates = null;
    }
    function indentString(string, spaces) {
      var ind = common.repeat(" ", spaces), position = 0, next = -1, result = "", line, length = string.length;
      while (position < length) {
        next = string.indexOf("\n", position);
        if (next === -1) {
          line = string.slice(position);
          position = length;
        } else {
          line = string.slice(position, next + 1);
          position = next + 1;
        }
        if (line.length && line !== "\n") result += ind;
        result += line;
      }
      return result;
    }
    function generateNextLine(state, level) {
      return "\n" + common.repeat(" ", state.indent * level);
    }
    function testImplicitResolving(state, str2) {
      var index, length, type;
      for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
        type = state.implicitTypes[index];
        if (type.resolve(str2)) {
          return true;
        }
      }
      return false;
    }
    function isWhitespace(c) {
      return c === CHAR_SPACE || c === CHAR_TAB;
    }
    function isPrintable(c) {
      return 32 <= c && c <= 126 || 161 <= c && c <= 55295 && c !== 8232 && c !== 8233 || 57344 <= c && c <= 65533 && c !== 65279 || 65536 <= c && c <= 1114111;
    }
    function isNsChar(c) {
      return isPrintable(c) && !isWhitespace(c) && c !== 65279 && c !== CHAR_CARRIAGE_RETURN && c !== CHAR_LINE_FEED;
    }
    function isPlainSafe(c, prev) {
      return isPrintable(c) && c !== 65279 && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_COLON && (c !== CHAR_SHARP || prev && isNsChar(prev));
    }
    function isPlainSafeFirst(c) {
      return isPrintable(c) && c !== 65279 && !isWhitespace(c) && c !== CHAR_MINUS && c !== CHAR_QUESTION && c !== CHAR_COLON && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_SHARP && c !== CHAR_AMPERSAND && c !== CHAR_ASTERISK && c !== CHAR_EXCLAMATION && c !== CHAR_VERTICAL_LINE && c !== CHAR_EQUALS && c !== CHAR_GREATER_THAN && c !== CHAR_SINGLE_QUOTE && c !== CHAR_DOUBLE_QUOTE && c !== CHAR_PERCENT && c !== CHAR_COMMERCIAL_AT && c !== CHAR_GRAVE_ACCENT;
    }
    function needIndentIndicator(string) {
      var leadingSpaceRe = /^\n* /;
      return leadingSpaceRe.test(string);
    }
    var STYLE_PLAIN = 1;
    var STYLE_SINGLE = 2;
    var STYLE_LITERAL = 3;
    var STYLE_FOLDED = 4;
    var STYLE_DOUBLE = 5;
    function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType) {
      var i;
      var char, prev_char;
      var hasLineBreak = false;
      var hasFoldableLine = false;
      var shouldTrackWidth = lineWidth !== -1;
      var previousLineBreak = -1;
      var plain = isPlainSafeFirst(string.charCodeAt(0)) && !isWhitespace(string.charCodeAt(string.length - 1));
      if (singleLineOnly) {
        for (i = 0; i < string.length; i++) {
          char = string.charCodeAt(i);
          if (!isPrintable(char)) {
            return STYLE_DOUBLE;
          }
          prev_char = i > 0 ? string.charCodeAt(i - 1) : null;
          plain = plain && isPlainSafe(char, prev_char);
        }
      } else {
        for (i = 0; i < string.length; i++) {
          char = string.charCodeAt(i);
          if (char === CHAR_LINE_FEED) {
            hasLineBreak = true;
            if (shouldTrackWidth) {
              hasFoldableLine = hasFoldableLine || // Foldable line = too long, and not more-indented.
              i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ";
              previousLineBreak = i;
            }
          } else if (!isPrintable(char)) {
            return STYLE_DOUBLE;
          }
          prev_char = i > 0 ? string.charCodeAt(i - 1) : null;
          plain = plain && isPlainSafe(char, prev_char);
        }
        hasFoldableLine = hasFoldableLine || shouldTrackWidth && (i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ");
      }
      if (!hasLineBreak && !hasFoldableLine) {
        return plain && !testAmbiguousType(string) ? STYLE_PLAIN : STYLE_SINGLE;
      }
      if (indentPerLevel > 9 && needIndentIndicator(string)) {
        return STYLE_DOUBLE;
      }
      return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
    }
    function writeScalar(state, string, level, iskey) {
      state.dump = (function() {
        if (string.length === 0) {
          return "''";
        }
        if (!state.noCompatMode && DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1) {
          return "'" + string + "'";
        }
        var indent = state.indent * Math.max(1, level);
        var lineWidth = state.lineWidth === -1 ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
        var singleLineOnly = iskey || state.flowLevel > -1 && level >= state.flowLevel;
        function testAmbiguity(string2) {
          return testImplicitResolving(state, string2);
        }
        switch (chooseScalarStyle(string, singleLineOnly, state.indent, lineWidth, testAmbiguity)) {
          case STYLE_PLAIN:
            return string;
          case STYLE_SINGLE:
            return "'" + string.replace(/'/g, "''") + "'";
          case STYLE_LITERAL:
            return "|" + blockHeader(string, state.indent) + dropEndingNewline(indentString(string, indent));
          case STYLE_FOLDED:
            return ">" + blockHeader(string, state.indent) + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
          case STYLE_DOUBLE:
            return '"' + escapeString(string, lineWidth) + '"';
          default:
            throw new YAMLException("impossible error: invalid scalar style");
        }
      })();
    }
    function blockHeader(string, indentPerLevel) {
      var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : "";
      var clip = string[string.length - 1] === "\n";
      var keep = clip && (string[string.length - 2] === "\n" || string === "\n");
      var chomp = keep ? "+" : clip ? "" : "-";
      return indentIndicator + chomp + "\n";
    }
    function dropEndingNewline(string) {
      return string[string.length - 1] === "\n" ? string.slice(0, -1) : string;
    }
    function foldString(string, width) {
      var lineRe = /(\n+)([^\n]*)/g;
      var result = (function() {
        var nextLF = string.indexOf("\n");
        nextLF = nextLF !== -1 ? nextLF : string.length;
        lineRe.lastIndex = nextLF;
        return foldLine(string.slice(0, nextLF), width);
      })();
      var prevMoreIndented = string[0] === "\n" || string[0] === " ";
      var moreIndented;
      var match;
      while (match = lineRe.exec(string)) {
        var prefix = match[1], line = match[2];
        moreIndented = line[0] === " ";
        result += prefix + (!prevMoreIndented && !moreIndented && line !== "" ? "\n" : "") + foldLine(line, width);
        prevMoreIndented = moreIndented;
      }
      return result;
    }
    function foldLine(line, width) {
      if (line === "" || line[0] === " ") return line;
      var breakRe = / [^ ]/g;
      var match;
      var start = 0, end, curr = 0, next = 0;
      var result = "";
      while (match = breakRe.exec(line)) {
        next = match.index;
        if (next - start > width) {
          end = curr > start ? curr : next;
          result += "\n" + line.slice(start, end);
          start = end + 1;
        }
        curr = next;
      }
      result += "\n";
      if (line.length - start > width && curr > start) {
        result += line.slice(start, curr) + "\n" + line.slice(curr + 1);
      } else {
        result += line.slice(start);
      }
      return result.slice(1);
    }
    function escapeString(string) {
      var result = "";
      var char, nextChar;
      var escapeSeq;
      for (var i = 0; i < string.length; i++) {
        char = string.charCodeAt(i);
        if (char >= 55296 && char <= 56319) {
          nextChar = string.charCodeAt(i + 1);
          if (nextChar >= 56320 && nextChar <= 57343) {
            result += encodeHex((char - 55296) * 1024 + nextChar - 56320 + 65536);
            i++;
            continue;
          }
        }
        escapeSeq = ESCAPE_SEQUENCES[char];
        result += !escapeSeq && isPrintable(char) ? string[i] : escapeSeq || encodeHex(char);
      }
      return result;
    }
    function writeFlowSequence(state, level, object) {
      var _result = "", _tag = state.tag, index, length;
      for (index = 0, length = object.length; index < length; index += 1) {
        if (writeNode(state, level, object[index], false, false)) {
          if (index !== 0) _result += "," + (!state.condenseFlow ? " " : "");
          _result += state.dump;
        }
      }
      state.tag = _tag;
      state.dump = "[" + _result + "]";
    }
    function writeBlockSequence(state, level, object, compact) {
      var _result = "", _tag = state.tag, index, length;
      for (index = 0, length = object.length; index < length; index += 1) {
        if (writeNode(state, level + 1, object[index], true, true)) {
          if (!compact || index !== 0) {
            _result += generateNextLine(state, level);
          }
          if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
            _result += "-";
          } else {
            _result += "- ";
          }
          _result += state.dump;
        }
      }
      state.tag = _tag;
      state.dump = _result || "[]";
    }
    function writeFlowMapping(state, level, object) {
      var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, pairBuffer;
      for (index = 0, length = objectKeyList.length; index < length; index += 1) {
        pairBuffer = "";
        if (index !== 0) pairBuffer += ", ";
        if (state.condenseFlow) pairBuffer += '"';
        objectKey = objectKeyList[index];
        objectValue = object[objectKey];
        if (!writeNode(state, level, objectKey, false, false)) {
          continue;
        }
        if (state.dump.length > 1024) pairBuffer += "? ";
        pairBuffer += state.dump + (state.condenseFlow ? '"' : "") + ":" + (state.condenseFlow ? "" : " ");
        if (!writeNode(state, level, objectValue, false, false)) {
          continue;
        }
        pairBuffer += state.dump;
        _result += pairBuffer;
      }
      state.tag = _tag;
      state.dump = "{" + _result + "}";
    }
    function writeBlockMapping(state, level, object, compact) {
      var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, explicitPair, pairBuffer;
      if (state.sortKeys === true) {
        objectKeyList.sort();
      } else if (typeof state.sortKeys === "function") {
        objectKeyList.sort(state.sortKeys);
      } else if (state.sortKeys) {
        throw new YAMLException("sortKeys must be a boolean or a function");
      }
      for (index = 0, length = objectKeyList.length; index < length; index += 1) {
        pairBuffer = "";
        if (!compact || index !== 0) {
          pairBuffer += generateNextLine(state, level);
        }
        objectKey = objectKeyList[index];
        objectValue = object[objectKey];
        if (!writeNode(state, level + 1, objectKey, true, true, true)) {
          continue;
        }
        explicitPair = state.tag !== null && state.tag !== "?" || state.dump && state.dump.length > 1024;
        if (explicitPair) {
          if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
            pairBuffer += "?";
          } else {
            pairBuffer += "? ";
          }
        }
        pairBuffer += state.dump;
        if (explicitPair) {
          pairBuffer += generateNextLine(state, level);
        }
        if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
          continue;
        }
        if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
          pairBuffer += ":";
        } else {
          pairBuffer += ": ";
        }
        pairBuffer += state.dump;
        _result += pairBuffer;
      }
      state.tag = _tag;
      state.dump = _result || "{}";
    }
    function detectType(state, object, explicit) {
      var _result, typeList, index, length, type, style;
      typeList = explicit ? state.explicitTypes : state.implicitTypes;
      for (index = 0, length = typeList.length; index < length; index += 1) {
        type = typeList[index];
        if ((type.instanceOf || type.predicate) && (!type.instanceOf || typeof object === "object" && object instanceof type.instanceOf) && (!type.predicate || type.predicate(object))) {
          state.tag = explicit ? type.tag : "?";
          if (type.represent) {
            style = state.styleMap[type.tag] || type.defaultStyle;
            if (_toString.call(type.represent) === "[object Function]") {
              _result = type.represent(object, style);
            } else if (_hasOwnProperty.call(type.represent, style)) {
              _result = type.represent[style](object, style);
            } else {
              throw new YAMLException("!<" + type.tag + '> tag resolver accepts not "' + style + '" style');
            }
            state.dump = _result;
          }
          return true;
        }
      }
      return false;
    }
    function writeNode(state, level, object, block, compact, iskey) {
      state.tag = null;
      state.dump = object;
      if (!detectType(state, object, false)) {
        detectType(state, object, true);
      }
      var type = _toString.call(state.dump);
      if (block) {
        block = state.flowLevel < 0 || state.flowLevel > level;
      }
      var objectOrArray = type === "[object Object]" || type === "[object Array]", duplicateIndex, duplicate;
      if (objectOrArray) {
        duplicateIndex = state.duplicates.indexOf(object);
        duplicate = duplicateIndex !== -1;
      }
      if (state.tag !== null && state.tag !== "?" || duplicate || state.indent !== 2 && level > 0) {
        compact = false;
      }
      if (duplicate && state.usedDuplicates[duplicateIndex]) {
        state.dump = "*ref_" + duplicateIndex;
      } else {
        if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
          state.usedDuplicates[duplicateIndex] = true;
        }
        if (type === "[object Object]") {
          if (block && Object.keys(state.dump).length !== 0) {
            writeBlockMapping(state, level, state.dump, compact);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + state.dump;
            }
          } else {
            writeFlowMapping(state, level, state.dump);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + " " + state.dump;
            }
          }
        } else if (type === "[object Array]") {
          var arrayLevel = state.noArrayIndent && level > 0 ? level - 1 : level;
          if (block && state.dump.length !== 0) {
            writeBlockSequence(state, arrayLevel, state.dump, compact);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + state.dump;
            }
          } else {
            writeFlowSequence(state, arrayLevel, state.dump);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + " " + state.dump;
            }
          }
        } else if (type === "[object String]") {
          if (state.tag !== "?") {
            writeScalar(state, state.dump, level, iskey);
          }
        } else {
          if (state.skipInvalid) return false;
          throw new YAMLException("unacceptable kind of an object to dump " + type);
        }
        if (state.tag !== null && state.tag !== "?") {
          state.dump = "!<" + state.tag + "> " + state.dump;
        }
      }
      return true;
    }
    function getDuplicateReferences(object, state) {
      var objects = [], duplicatesIndexes = [], index, length;
      inspectNode(object, objects, duplicatesIndexes);
      for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
        state.duplicates.push(objects[duplicatesIndexes[index]]);
      }
      state.usedDuplicates = new Array(length);
    }
    function inspectNode(object, objects, duplicatesIndexes) {
      var objectKeyList, index, length;
      if (object !== null && typeof object === "object") {
        index = objects.indexOf(object);
        if (index !== -1) {
          if (duplicatesIndexes.indexOf(index) === -1) {
            duplicatesIndexes.push(index);
          }
        } else {
          objects.push(object);
          if (Array.isArray(object)) {
            for (index = 0, length = object.length; index < length; index += 1) {
              inspectNode(object[index], objects, duplicatesIndexes);
            }
          } else {
            objectKeyList = Object.keys(object);
            for (index = 0, length = objectKeyList.length; index < length; index += 1) {
              inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
            }
          }
        }
      }
    }
    function dump(input, options2) {
      options2 = options2 || {};
      var state = new State(options2);
      if (!state.noRefs) getDuplicateReferences(input, state);
      if (writeNode(state, 0, input, true, true)) return state.dump + "\n";
      return "";
    }
    function safeDump(input, options2) {
      return dump(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options2));
    }
    module2.exports.dump = dump;
    module2.exports.safeDump = safeDump;
  }
});

// node_modules/js-yaml/lib/js-yaml.js
var require_js_yaml = __commonJS({
  "node_modules/js-yaml/lib/js-yaml.js"(exports2, module2) {
    "use strict";
    var loader = require_loader();
    var dumper = require_dumper();
    function deprecated(name) {
      return function() {
        throw new Error("Function " + name + " is deprecated and cannot be used.");
      };
    }
    module2.exports.Type = require_type();
    module2.exports.Schema = require_schema();
    module2.exports.FAILSAFE_SCHEMA = require_failsafe();
    module2.exports.JSON_SCHEMA = require_json();
    module2.exports.CORE_SCHEMA = require_core();
    module2.exports.DEFAULT_SAFE_SCHEMA = require_default_safe();
    module2.exports.DEFAULT_FULL_SCHEMA = require_default_full();
    module2.exports.load = loader.load;
    module2.exports.loadAll = loader.loadAll;
    module2.exports.safeLoad = loader.safeLoad;
    module2.exports.safeLoadAll = loader.safeLoadAll;
    module2.exports.dump = dumper.dump;
    module2.exports.safeDump = dumper.safeDump;
    module2.exports.YAMLException = require_exception();
    module2.exports.MINIMAL_SCHEMA = require_failsafe();
    module2.exports.SAFE_SCHEMA = require_default_safe();
    module2.exports.DEFAULT_SCHEMA = require_default_full();
    module2.exports.scan = deprecated("scan");
    module2.exports.parse = deprecated("parse");
    module2.exports.compose = deprecated("compose");
    module2.exports.addConstructor = deprecated("addConstructor");
  }
});

// node_modules/js-yaml/index.js
var require_js_yaml2 = __commonJS({
  "node_modules/js-yaml/index.js"(exports2, module2) {
    "use strict";
    var yaml2 = require_js_yaml();
    module2.exports = yaml2;
  }
});

// node_modules/gray-matter/lib/engines.js
var require_engines = __commonJS({
  "node_modules/gray-matter/lib/engines.js"(exports, module) {
    "use strict";
    var yaml = require_js_yaml2();
    var engines = exports = module.exports;
    engines.yaml = {
      parse: yaml.safeLoad.bind(yaml),
      stringify: yaml.safeDump.bind(yaml)
    };
    engines.json = {
      parse: JSON.parse.bind(JSON),
      stringify: function(obj, options2) {
        const opts = Object.assign({ replacer: null, space: 2 }, options2);
        return JSON.stringify(obj, opts.replacer, opts.space);
      }
    };
    engines.javascript = {
      parse: function parse(str, options, wrap) {
        try {
          if (wrap !== false) {
            str = "(function() {\nreturn " + str.trim() + ";\n}());";
          }
          return eval(str) || {};
        } catch (err) {
          if (wrap !== false && /(unexpected|identifier)/i.test(err.message)) {
            return parse(str, options, false);
          }
          throw new SyntaxError(err);
        }
      },
      stringify: function() {
        throw new Error("stringifying JavaScript is not supported");
      }
    };
  }
});

// node_modules/strip-bom-string/index.js
var require_strip_bom_string = __commonJS({
  "node_modules/strip-bom-string/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function(str2) {
      if (typeof str2 === "string" && str2.charAt(0) === "\uFEFF") {
        return str2.slice(1);
      }
      return str2;
    };
  }
});

// node_modules/gray-matter/lib/utils.js
var require_utils = __commonJS({
  "node_modules/gray-matter/lib/utils.js"(exports2) {
    "use strict";
    var stripBom = require_strip_bom_string();
    var typeOf = require_kind_of();
    exports2.define = function(obj, key, val) {
      Reflect.defineProperty(obj, key, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: val
      });
    };
    exports2.isBuffer = function(val) {
      return typeOf(val) === "buffer";
    };
    exports2.isObject = function(val) {
      return typeOf(val) === "object";
    };
    exports2.toBuffer = function(input) {
      return typeof input === "string" ? Buffer.from(input) : input;
    };
    exports2.toString = function(input) {
      if (exports2.isBuffer(input)) return stripBom(String(input));
      if (typeof input !== "string") {
        throw new TypeError("expected input to be a string or buffer");
      }
      return stripBom(input);
    };
    exports2.arrayify = function(val) {
      return val ? Array.isArray(val) ? val : [val] : [];
    };
    exports2.startsWith = function(str2, substr, len) {
      if (typeof len !== "number") len = substr.length;
      return str2.slice(0, len) === substr;
    };
  }
});

// node_modules/gray-matter/lib/defaults.js
var require_defaults = __commonJS({
  "node_modules/gray-matter/lib/defaults.js"(exports2, module2) {
    "use strict";
    var engines2 = require_engines();
    var utils = require_utils();
    module2.exports = function(options2) {
      const opts = Object.assign({}, options2);
      opts.delimiters = utils.arrayify(opts.delims || opts.delimiters || "---");
      if (opts.delimiters.length === 1) {
        opts.delimiters.push(opts.delimiters[0]);
      }
      opts.language = (opts.language || opts.lang || "yaml").toLowerCase();
      opts.engines = Object.assign({}, engines2, opts.parsers, opts.engines);
      return opts;
    };
  }
});

// node_modules/gray-matter/lib/engine.js
var require_engine = __commonJS({
  "node_modules/gray-matter/lib/engine.js"(exports2, module2) {
    "use strict";
    module2.exports = function(name, options2) {
      let engine = options2.engines[name] || options2.engines[aliase(name)];
      if (typeof engine === "undefined") {
        throw new Error('gray-matter engine "' + name + '" is not registered');
      }
      if (typeof engine === "function") {
        engine = { parse: engine };
      }
      return engine;
    };
    function aliase(name) {
      switch (name.toLowerCase()) {
        case "js":
        case "javascript":
          return "javascript";
        case "coffee":
        case "coffeescript":
        case "cson":
          return "coffee";
        case "yaml":
        case "yml":
          return "yaml";
        default: {
          return name;
        }
      }
    }
  }
});

// node_modules/gray-matter/lib/stringify.js
var require_stringify = __commonJS({
  "node_modules/gray-matter/lib/stringify.js"(exports2, module2) {
    "use strict";
    var typeOf = require_kind_of();
    var getEngine = require_engine();
    var defaults = require_defaults();
    module2.exports = function(file, data, options2) {
      if (data == null && options2 == null) {
        switch (typeOf(file)) {
          case "object":
            data = file.data;
            options2 = {};
            break;
          case "string":
            return file;
          default: {
            throw new TypeError("expected file to be a string or object");
          }
        }
      }
      const str2 = file.content;
      const opts = defaults(options2);
      if (data == null) {
        if (!opts.data) return file;
        data = opts.data;
      }
      const language = file.language || opts.language;
      const engine = getEngine(language, opts);
      if (typeof engine.stringify !== "function") {
        throw new TypeError('expected "' + language + '.stringify" to be a function');
      }
      data = Object.assign({}, file.data, data);
      const open = opts.delimiters[0];
      const close = opts.delimiters[1];
      const matter2 = engine.stringify(data, options2).trim();
      let buf = "";
      if (matter2 !== "{}") {
        buf = newline(open) + newline(matter2) + newline(close);
      }
      if (typeof file.excerpt === "string" && file.excerpt !== "") {
        if (str2.indexOf(file.excerpt.trim()) === -1) {
          buf += newline(file.excerpt) + newline(close);
        }
      }
      return buf + newline(str2);
    };
    function newline(str2) {
      return str2.slice(-1) !== "\n" ? str2 + "\n" : str2;
    }
  }
});

// node_modules/gray-matter/lib/excerpt.js
var require_excerpt = __commonJS({
  "node_modules/gray-matter/lib/excerpt.js"(exports2, module2) {
    "use strict";
    var defaults = require_defaults();
    module2.exports = function(file, options2) {
      const opts = defaults(options2);
      if (file.data == null) {
        file.data = {};
      }
      if (typeof opts.excerpt === "function") {
        return opts.excerpt(file, opts);
      }
      const sep = file.data.excerpt_separator || opts.excerpt_separator;
      if (sep == null && (opts.excerpt === false || opts.excerpt == null)) {
        return file;
      }
      const delimiter = typeof opts.excerpt === "string" ? opts.excerpt : sep || opts.delimiters[0];
      const idx = file.content.indexOf(delimiter);
      if (idx !== -1) {
        file.excerpt = file.content.slice(0, idx);
      }
      return file;
    };
  }
});

// node_modules/gray-matter/lib/to-file.js
var require_to_file = __commonJS({
  "node_modules/gray-matter/lib/to-file.js"(exports2, module2) {
    "use strict";
    var typeOf = require_kind_of();
    var stringify = require_stringify();
    var utils = require_utils();
    module2.exports = function(file) {
      if (typeOf(file) !== "object") {
        file = { content: file };
      }
      if (typeOf(file.data) !== "object") {
        file.data = {};
      }
      if (file.contents && file.content == null) {
        file.content = file.contents;
      }
      utils.define(file, "orig", utils.toBuffer(file.content));
      utils.define(file, "language", file.language || "");
      utils.define(file, "matter", file.matter || "");
      utils.define(file, "stringify", function(data, options2) {
        if (options2 && options2.language) {
          file.language = options2.language;
        }
        return stringify(file, data, options2);
      });
      file.content = utils.toString(file.content);
      file.isEmpty = false;
      file.excerpt = "";
      return file;
    };
  }
});

// node_modules/gray-matter/lib/parse.js
var require_parse = __commonJS({
  "node_modules/gray-matter/lib/parse.js"(exports2, module2) {
    "use strict";
    var getEngine = require_engine();
    var defaults = require_defaults();
    module2.exports = function(language, str2, options2) {
      const opts = defaults(options2);
      const engine = getEngine(language, opts);
      if (typeof engine.parse !== "function") {
        throw new TypeError('expected "' + language + '.parse" to be a function');
      }
      return engine.parse(str2, opts);
    };
  }
});

// node_modules/gray-matter/index.js
var require_gray_matter = __commonJS({
  "node_modules/gray-matter/index.js"(exports2, module2) {
    "use strict";
    var fs = require("fs");
    var sections = require_section_matter();
    var defaults = require_defaults();
    var stringify = require_stringify();
    var excerpt = require_excerpt();
    var engines2 = require_engines();
    var toFile = require_to_file();
    var parse2 = require_parse();
    var utils = require_utils();
    function matter2(input, options2) {
      if (input === "") {
        return { data: {}, content: input, excerpt: "", orig: input };
      }
      let file = toFile(input);
      const cached = matter2.cache[file.content];
      if (!options2) {
        if (cached) {
          file = Object.assign({}, cached);
          file.orig = cached.orig;
          return file;
        }
        matter2.cache[file.content] = file;
      }
      return parseMatter(file, options2);
    }
    function parseMatter(file, options2) {
      const opts = defaults(options2);
      const open = opts.delimiters[0];
      const close = "\n" + opts.delimiters[1];
      let str2 = file.content;
      if (opts.language) {
        file.language = opts.language;
      }
      const openLen = open.length;
      if (!utils.startsWith(str2, open, openLen)) {
        excerpt(file, opts);
        return file;
      }
      if (str2.charAt(openLen) === open.slice(-1)) {
        return file;
      }
      str2 = str2.slice(openLen);
      const len = str2.length;
      const language = matter2.language(str2, opts);
      if (language.name) {
        file.language = language.name;
        str2 = str2.slice(language.raw.length);
      }
      let closeIndex = str2.indexOf(close);
      if (closeIndex === -1) {
        closeIndex = len;
      }
      file.matter = str2.slice(0, closeIndex);
      const block = file.matter.replace(/^\s*#[^\n]+/gm, "").trim();
      if (block === "") {
        file.isEmpty = true;
        file.empty = file.content;
        file.data = {};
      } else {
        file.data = parse2(file.language, file.matter, opts);
      }
      if (closeIndex === len) {
        file.content = "";
      } else {
        file.content = str2.slice(closeIndex + close.length);
        if (file.content[0] === "\r") {
          file.content = file.content.slice(1);
        }
        if (file.content[0] === "\n") {
          file.content = file.content.slice(1);
        }
      }
      excerpt(file, opts);
      if (opts.sections === true || typeof opts.section === "function") {
        sections(file, opts.section);
      }
      return file;
    }
    matter2.engines = engines2;
    matter2.stringify = function(file, data, options2) {
      if (typeof file === "string") file = matter2(file, options2);
      return stringify(file, data, options2);
    };
    matter2.read = function(filepath, options2) {
      const str2 = fs.readFileSync(filepath, "utf8");
      const file = matter2(str2, options2);
      file.path = filepath;
      return file;
    };
    matter2.test = function(str2, options2) {
      return utils.startsWith(str2, defaults(options2).delimiters[0]);
    };
    matter2.language = function(str2, options2) {
      const opts = defaults(options2);
      const open = opts.delimiters[0];
      if (matter2.test(str2)) {
        str2 = str2.slice(open.length);
      }
      const language = str2.slice(0, str2.search(/\r?\n/));
      return {
        raw: language,
        name: language ? language.trim() : ""
      };
    };
    matter2.cache = {};
    matter2.clearCache = function() {
      matter2.cache = {};
    };
    module2.exports = matter2;
  }
});

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => OvlPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian10 = require("obsidian");

// src/conversationStore.ts
var import_obsidian = require("obsidian");

// src/conversation.ts
function convertToMarkdown(conversation) {
  const lines = [];
  lines.push(`# \uB300\uD654 \uAE30\uB85D - ${conversation.sessionId}`);
  lines.push("");
  lines.push(`\uC0DD\uC131\uC77C: ${conversation.createdAt.toISOString()}`);
  lines.push("");
  lines.push("---");
  lines.push("");
  for (const turn of conversation.turns) {
    const roleLabel = turn.role === "user" ? "\u{1F464} \uC0AC\uC6A9\uC790" : turn.role === "assistant" ? "\u{1F916} \uC5B4\uC2DC\uC2A4\uD134\uD2B8" : "\u2699\uFE0F \uC2DC\uC2A4\uD15C";
    lines.push(`## ${roleLabel}`);
    if (turn.timestamp) {
      const timestamp = typeof turn.timestamp === "string" ? turn.timestamp : turn.timestamp.toISOString();
      lines.push(`*${timestamp}*`);
      lines.push("");
    }
    lines.push(turn.content);
    lines.push("");
  }
  return lines.join("\n");
}

// src/conversationStore.ts
async function saveConversationFromTurns(vault, sessionId, turns, outputFolder) {
  const conversation = {
    sessionId,
    turns,
    createdAt: /* @__PURE__ */ new Date()
  };
  const markdown = convertToMarkdown(conversation);
  const filename = buildFileName(conversation);
  const cleanedFolder = outputFolder ? (0, import_obsidian.normalizePath)(outputFolder).replace(/^\/+/, "") : "";
  const targetPath = await ensureUniquePath(
    vault,
    (0, import_obsidian.normalizePath)(cleanedFolder ? `${cleanedFolder}/${filename}` : filename)
  );
  if (cleanedFolder) {
    await ensureFolderExists(vault, cleanedFolder);
  }
  await vault.create(targetPath, markdown);
  return targetPath;
}
function buildFileName(conversation) {
  const safeTitle = sanitizeFileSegment(conversation.sessionId);
  return `${safeTitle}.md`;
}
function sanitizeFileSegment(value) {
  const trimmed = value.trim();
  if (!trimmed) {
    return "untitled";
  }
  const cleaned = trimmed.replace(/[\\/:*?"<>|]/g, " ").replace(/\s+/g, " ").trim();
  return cleaned || "untitled";
}
async function ensureFolderExists(vault, folder) {
  const exists = await vault.adapter.exists(folder);
  if (!exists) {
    await vault.createFolder(folder);
  }
}
async function ensureUniquePath(vault, path) {
  const normalized = (0, import_obsidian.normalizePath)(path);
  const extensionIndex = normalized.lastIndexOf(".md");
  const base = extensionIndex === -1 ? normalized : normalized.slice(0, extensionIndex);
  const extension = extensionIndex === -1 ? "" : ".md";
  let candidate = normalized;
  let count = 1;
  while (await vault.adapter.exists(candidate)) {
    candidate = `${base}-${count}${extension}`;
    count += 1;
  }
  return candidate;
}

// src/api.ts
var import_obsidian2 = require("obsidian");

// src/types.ts
var PROVIDER_PRESETS = {
  gemini: {
    apiUrl: "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.0-preview:generateContent",
    model: "gemini-3.0-preview"
  },
  openai: {
    apiUrl: "https://api.openai.com/v1/chat/completions",
    model: "gpt-4o-mini"
  },
  ollama: {
    apiUrl: "http://localhost:11434/v1/chat/completions",
    model: "llama3.1"
  },
  custom: {
    apiUrl: "",
    model: ""
  }
};
var EMBEDDING_PRESETS = {
  gemini: {
    model: "text-embedding-004",
    apiUrl: "https://generativelanguage.googleapis.com/v1beta/models"
  },
  openai: {
    model: "text-embedding-3-small",
    apiUrl: "https://api.openai.com/v1/embeddings"
  },
  local: {
    model: "Xenova/all-MiniLM-L6-v2"
  },
  custom: {
    model: ""
  }
};
var DEFAULT_SETTINGS = {
  provider: "gemini",
  apiUrl: PROVIDER_PRESETS.gemini.apiUrl,
  apiKey: "",
  model: PROVIDER_PRESETS.gemini.model,
  titleModel: "",
  systemPrompt: "",
  defaultOutputFolder: "",
  // 인덱싱 기본 설정
  indexingEnabled: false,
  chunkSize: 400,
  chunkOverlap: 50,
  topK: 8,
  // 임베딩 기본 설정 (Gemini)
  embeddingProvider: "gemini",
  embeddingApiKey: "",
  embeddingModel: EMBEDDING_PRESETS.gemini.model,
  embeddingApiUrl: EMBEDDING_PRESETS.gemini.apiUrl || ""
};

// src/api.ts
var OvlApiClient = class {
  constructor(getSettings, logWriter) {
    this.getSettings = getSettings;
    this.logWriter = logWriter != null ? logWriter : (async () => {
    });
  }
  async requestAssistantReply(turns) {
    const settings = this.getSettings();
    if (settings.provider === "gemini") {
      return this.requestGeminiReply(settings, turns);
    }
    return this.requestOpenAiCompatibleReply(settings, turns);
  }
  async requestTitleReply(prompt) {
    const settings = this.getSettings();
    const titleModel = settings.titleModel.trim();
    const modelName = titleModel || settings.model.trim();
    const turns = [
      {
        role: "user",
        content: prompt,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }
    ];
    if (settings.provider === "gemini") {
      return this.requestGeminiReply(settings, turns, {
        modelName,
        systemPrompt: ""
      });
    }
    return this.requestOpenAiCompatibleReply(settings, turns, {
      modelName,
      systemPrompt: ""
    });
  }
  async requestOpenAiCompatibleReply(settings, turns, options2) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const apiUrl = settings.apiUrl.trim();
    if (!apiUrl) {
      throw new Error("API URL\uC744 \uC124\uC815\uD574 \uC8FC\uC138\uC694.");
    }
    const modelName = ((_a = options2 == null ? void 0 : options2.modelName) == null ? void 0 : _a.trim()) || settings.model.trim() || PROVIDER_PRESETS.openai.model;
    if (!modelName) {
      throw new Error("\uBAA8\uB378 \uC774\uB984\uC744 \uC785\uB825\uD574 \uC8FC\uC138\uC694.");
    }
    const messages = this.buildOpenAiMessages(settings, turns, (_b = options2 == null ? void 0 : options2.systemPrompt) != null ? _b : null);
    const payload = {
      model: modelName,
      messages
    };
    const body = JSON.stringify(payload);
    const headers = {
      "Content-Type": "application/json"
    };
    if (settings.apiKey.trim()) {
      headers.Authorization = `Bearer ${settings.apiKey.trim()}`;
    }
    let response;
    try {
      response = await (0, import_obsidian2.requestUrl)({
        url: apiUrl,
        method: "POST",
        headers,
        body
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      await this.log("openai-compatible request failed", {
        url: apiUrl,
        body: payload,
        error: message
      });
      throw new Error(`API \uC694\uCCAD \uC2E4\uD328: ${message}`);
    }
    const status = response.status;
    if (status && status >= 400) {
      await this.log("openai-compatible response error", {
        url: apiUrl,
        body: payload,
        status,
        response: response.text
      });
      throw new Error(`API \uC624\uB958: ${status}`);
    }
    const data = this.parseJsonResponse(response.text, response.json);
    const content = (_h = (_g = (_f = (_e = (_d = (_c = data == null ? void 0 : data.choices) == null ? void 0 : _c[0]) == null ? void 0 : _d.message) == null ? void 0 : _e.content) != null ? _f : data == null ? void 0 : data.reply) != null ? _g : data == null ? void 0 : data.content) != null ? _h : data == null ? void 0 : data.message;
    if (!content || typeof content !== "string") {
      await this.log("openai-compatible response invalid", { url: apiUrl, response: data });
      throw new Error("\uC751\uB2F5 \uD615\uC2DD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.");
    }
    return content.trim();
  }
  async requestGeminiReply(settings, turns, options2) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const apiKey = settings.apiKey.trim();
    if (!apiKey) {
      throw new Error("Gemini API \uD0A4\uB97C \uC785\uB825\uD574 \uC8FC\uC138\uC694.");
    }
    const modelName = ((_a = options2 == null ? void 0 : options2.modelName) == null ? void 0 : _a.trim()) || settings.model.trim() || PROVIDER_PRESETS.gemini.model;
    if (!modelName) {
      throw new Error("Gemini \uBAA8\uB378 \uC774\uB984\uC744 \uC785\uB825\uD574 \uC8FC\uC138\uC694.");
    }
    const systemPrompt = ((_b = options2 == null ? void 0 : options2.systemPrompt) != null ? _b : settings.systemPrompt).trim();
    const contents = turns.map((turn) => {
      const role = turn.role === "assistant" ? "model" : "user";
      const text2 = turn.role === "system" ? `[\uC2DC\uC2A4\uD15C] ${turn.content}` : turn.content;
      return {
        role,
        parts: [{ text: text2 }]
      };
    });
    const payload = {
      contents,
      generationConfig: {
        responseMimeType: "text/plain"
      }
    };
    if (systemPrompt) {
      payload.systemInstruction = { parts: [{ text: systemPrompt }] };
    }
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
    const headers = {
      "Content-Type": "application/json"
    };
    let response;
    try {
      response = await (0, import_obsidian2.requestUrl)({
        url: apiUrl,
        method: "POST",
        headers,
        body: JSON.stringify(payload)
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      await this.log("gemini request failed", {
        model: modelName,
        body: payload,
        error: message
      });
      throw new Error(`Gemini \uC694\uCCAD \uC2E4\uD328: ${message}`);
    }
    const status = response.status;
    if (status && status >= 400) {
      await this.log("gemini response error", {
        model: modelName,
        body: payload,
        status,
        response: response.text
      });
      throw new Error(`Gemini API \uC624\uB958: ${status}`);
    }
    const data = this.parseJsonResponse(response.text, response.json);
    const text = (_h = (_g = data == null ? void 0 : data.text) != null ? _g : (_f = (_e = (_d = (_c = data == null ? void 0 : data.candidates) == null ? void 0 : _c[0]) == null ? void 0 : _d.content) == null ? void 0 : _e.parts) == null ? void 0 : _f.map((part) => {
      var _a2;
      return (_a2 = part.text) != null ? _a2 : "";
    }).join("").trim()) != null ? _h : "";
    if (!text) {
      await this.log("gemini response invalid", { model: modelName, response: data });
      throw new Error("\uC751\uB2F5 \uD615\uC2DD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.");
    }
    return text;
  }
  buildOpenAiMessages(settings, turns, systemPromptOverride) {
    const messages = [];
    const systemPrompt = systemPromptOverride !== null ? systemPromptOverride.trim() : settings.systemPrompt.trim();
    if (systemPrompt) {
      messages.push({ role: "system", content: systemPrompt });
    }
    for (const turn of turns) {
      messages.push({ role: turn.role, content: turn.content });
    }
    return messages;
  }
  parseJsonResponse(text, json) {
    if (json) {
      return json;
    }
    try {
      return JSON.parse(text);
    } catch (e) {
      throw new Error("API \uC751\uB2F5\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    }
  }
  async log(context, detail) {
    await this.logWriter(context, detail);
  }
};

// src/main.ts
init_logging();

// src/modals/saveConversationModal.ts
var import_obsidian4 = require("obsidian");
var SaveConversationModal = class extends import_obsidian4.Modal {
  constructor(plugin, onSubmit) {
    super(plugin.app);
    this.onSubmit = onSubmit;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h2", { text: "\uB300\uD654 JSON \uC800\uC7A5" });
    const inputPathEl = contentEl.createEl("input", { type: "text" });
    inputPathEl.placeholder = "JSON \uD30C\uC77C \uACBD\uB85C (\uBCFC\uD2B8 \uAE30\uC900)";
    const sessionIdEl = contentEl.createEl("input", { type: "text" });
    sessionIdEl.placeholder = "\uC138\uC158 ID";
    const outputFolderEl = contentEl.createEl("input", { type: "text" });
    outputFolderEl.placeholder = "\uC800\uC7A5 \uD3F4\uB354 (\uC120\uD0DD, \uBCFC\uD2B8 \uAE30\uC900)";
    const submitButton = contentEl.createEl("button", { text: "\uC800\uC7A5" });
    submitButton.addEventListener("click", () => {
      this.onSubmit({
        inputPath: inputPathEl.value.trim(),
        sessionId: sessionIdEl.value.trim(),
        outputFolder: outputFolderEl.value.trim()
      });
      this.close();
    });
  }
};

// src/parseTurns.ts
function parseTurns(content) {
  let data;
  try {
    data = JSON.parse(content);
  } catch (e) {
    throw new Error("JSON \uD615\uC2DD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.");
  }
  if (!Array.isArray(data)) {
    throw new Error("JSON\uC740 \uBC30\uC5F4\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4.");
  }
  return data.map((item, index) => {
    if (!item || typeof item !== "object") {
      throw new Error(`\uC798\uBABB\uB41C \uD56D\uBAA9: ${index + 1}\uBC88\uC9F8`);
    }
    const role = item.role;
    const contentValue = item.content;
    const timestampValue = item.timestamp;
    if (role !== "user" && role !== "assistant" && role !== "system") {
      throw new Error(`role\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4: ${index + 1}\uBC88\uC9F8`);
    }
    if (typeof contentValue !== "string" || !contentValue.trim()) {
      throw new Error(`content\uAC00 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4: ${index + 1}\uBC88\uC9F8`);
    }
    return {
      role,
      content: contentValue,
      timestamp: timestampValue
    };
  });
}

// src/settings.ts
var import_obsidian5 = require("obsidian");
var OvlSettingTab = class extends import_obsidian5.PluginSettingTab {
  constructor(plugin) {
    super(plugin.app, plugin);
    this.geminiModels = [];
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "OVL \uC124\uC815" });
    let apiUrlInput = null;
    let modelInput = null;
    new import_obsidian5.Setting(containerEl).setName("API \uC81C\uACF5\uC0AC").setDesc("\uC0AC\uC6A9\uD560 API \uC81C\uACF5\uC0AC\uB97C \uC120\uD0DD\uD558\uC138\uC694. (Ollama \uD3EC\uD568)").addDropdown((dropdown) => {
      dropdown.addOptions({
        gemini: "Google Gemini",
        openai: "OpenAI \uD638\uD658",
        ollama: "Ollama (\uB85C\uCEEC)",
        custom: "\uC0AC\uC6A9\uC790 \uC9C0\uC815"
      }).setValue(this.plugin.settings.provider).onChange(async (value) => {
        const provider = value;
        this.plugin.settings.provider = provider;
        const preset = PROVIDER_PRESETS[provider];
        this.plugin.settings.apiUrl = preset.apiUrl;
        this.plugin.settings.model = preset.model;
        apiUrlInput == null ? void 0 : apiUrlInput.setValue(preset.apiUrl);
        modelInput == null ? void 0 : modelInput.setValue(preset.model);
        await this.plugin.saveSettings();
        this.display();
      });
    });
    new import_obsidian5.Setting(containerEl).setName("API URL").setDesc("\uC81C\uACF5\uC0AC\uBCC4 \uCC44\uD305 \uC5D4\uB4DC\uD3EC\uC778\uD2B8 URL").addText((text) => {
      apiUrlInput = text;
      text.setPlaceholder("http://localhost:11434/v1/chat/completions").setValue(this.plugin.settings.apiUrl).onChange(async (value) => {
        this.plugin.settings.apiUrl = value.trim();
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian5.Setting(containerEl).setName("API \uD0A4").setDesc("\uD544\uC694\uD55C \uACBD\uC6B0 Bearer \uD1A0\uD070 \uB610\uB294 \uC81C\uACF5\uC0AC \uD0A4\uB97C \uC785\uB825\uD558\uC138\uC694.").addText(
      (text) => text.setPlaceholder("\uC120\uD0DD").setValue(this.plugin.settings.apiKey).onChange(async (value) => {
        this.plugin.settings.apiKey = value;
        await this.plugin.saveSettings();
      })
    );
    if (this.plugin.settings.provider === "gemini") {
      new import_obsidian5.Setting(containerEl).setName("Gemini \uBAA8\uB378 \uBAA9\uB85D").setDesc("Google\uC5D0\uC11C \uC81C\uACF5\uD558\uB294 \uBAA8\uB378\uC744 \uBD88\uB7EC\uC640 \uC120\uD0DD\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.").addButton((button) => {
        button.setButtonText("\uBAA9\uB85D \uBD88\uB7EC\uC624\uAE30").onClick(async () => {
          await this.loadGeminiModels();
          this.display();
        });
      });
      if (this.geminiModels.length > 0) {
        new import_obsidian5.Setting(containerEl).setName("Gemini \uBAA8\uB378 \uC120\uD0DD").setDesc("\uBAA9\uB85D\uC5D0 \uC5C6\uB294 \uBAA8\uB378\uC740 \uC544\uB798\uC5D0\uC11C \uC9C1\uC811 \uC785\uB825\uD558\uC138\uC694.").addDropdown((dropdown) => {
          const options2 = this.geminiModels.reduce(
            (acc, name) => {
              acc[name] = name;
              return acc;
            },
            {}
          );
          dropdown.addOptions(options2).setValue(this.plugin.settings.model).onChange(async (value) => {
            this.plugin.settings.model = value;
            modelInput == null ? void 0 : modelInput.setValue(value);
            await this.plugin.saveSettings();
          });
        });
      }
    }
    new import_obsidian5.Setting(containerEl).setName("\uBAA8\uB378").setDesc("\uC81C\uACF5\uC0AC\uBCC4 \uBAA8\uB378 \uC774\uB984 (\uC9C1\uC811 \uC785\uB825 \uAC00\uB2A5)").addText((text) => {
      modelInput = text;
      text.setPlaceholder("gpt-4o-mini").setValue(this.plugin.settings.model).onChange(async (value) => {
        this.plugin.settings.model = value.trim();
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian5.Setting(containerEl).setName("\uC81C\uBAA9 \uC0DD\uC131 \uBAA8\uB378").setDesc("\uC138\uC158/\uC800\uC7A5 \uC81C\uBAA9 \uC0DD\uC131\uC5D0 \uC0AC\uC6A9\uD560 \uBAA8\uB378 (\uBE44\uC5B4\uC788\uC73C\uBA74 \uAE30\uBCF8 \uBAA8\uB378 \uC0AC\uC6A9)").addText(
      (text) => text.setPlaceholder("gpt-4o-mini").setValue(this.plugin.settings.titleModel).onChange(async (value) => {
        this.plugin.settings.titleModel = value.trim();
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian5.Setting(containerEl).setName("\uC2DC\uC2A4\uD15C \uD504\uB86C\uD504\uD2B8").setDesc("\uBAA8\uB4E0 \uC694\uCCAD\uC5D0 \uD3EC\uD568\uB420 \uC2DC\uC2A4\uD15C \uBA54\uC2DC\uC9C0").addTextArea(
      (text) => text.setPlaceholder("\uC608: \uB108\uB294 Obsidian \uB9AC\uC11C\uCE58 \uC5B4\uC2DC\uC2A4\uD134\uD2B8\uB2E4.").setValue(this.plugin.settings.systemPrompt).onChange(async (value) => {
        this.plugin.settings.systemPrompt = value;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian5.Setting(containerEl).setName("\uAE30\uBCF8 \uC800\uC7A5 \uD3F4\uB354").setDesc("\uB300\uD654\uB97C \uC800\uC7A5\uD560 \uAE30\uBCF8 \uD3F4\uB354 (\uBCFC\uD2B8 \uAE30\uC900)").addText(
      (text) => text.setPlaceholder("\uC608: Conversations").setValue(this.plugin.settings.defaultOutputFolder).onChange(async (value) => {
        this.plugin.settings.defaultOutputFolder = value.trim();
        await this.plugin.saveSettings();
      })
    );
    containerEl.createEl("h3", { text: "\uC778\uB371\uC2F1 \uBC0F \uAC80\uC0C9 \uC124\uC815" });
    new import_obsidian5.Setting(containerEl).setName("\uC778\uB371\uC2F1 \uD65C\uC131\uD654").setDesc("\uBCFC\uD2B8 \uD30C\uC77C\uC744 \uC778\uB371\uC2F1\uD558\uC5EC \uBCA1\uD130 \uAC80\uC0C9\uC744 \uD65C\uC131\uD654\uD569\uB2C8\uB2E4.").addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.indexingEnabled).onChange(async (value) => {
        this.plugin.settings.indexingEnabled = value;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian5.Setting(containerEl).setName("\uC804\uCCB4 \uBCFC\uD2B8 \uC784\uBCA0\uB529").setDesc("\uBCFC\uD2B8\uC758 \uBAA8\uB4E0 \uB178\uD2B8\uB97C \uC784\uBCA0\uB529 \uBC0F \uC778\uB371\uC2F1\uD569\uB2C8\uB2E4. (\uC2DC\uAC04\uC774 \uAC78\uB9B4 \uC218 \uC788\uC74C)").addButton((button) => {
      button.setButtonText("\uC804\uCCB4 \uC784\uBCA0\uB529 \uC2DC\uC791").setCta().onClick(async () => {
        button.setDisabled(true);
        button.setButtonText("\uC9C4\uD589 \uC911...");
        try {
          await this.plugin.indexVaultAll();
          new import_obsidian5.Notice("\uC804\uCCB4 \uC784\uBCA0\uB529 \uC644\uB8CC!");
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          new import_obsidian5.Notice(`\uC784\uBCA0\uB529 \uC2E4\uD328: ${message}`);
        } finally {
          button.setDisabled(false);
          button.setButtonText("\uC804\uCCB4 \uC784\uBCA0\uB529 \uC2DC\uC791");
        }
      });
    });
    new import_obsidian5.Setting(containerEl).setName("\uC2E0\uADDC \uB178\uD2B8\uB9CC \uC784\uBCA0\uB529").setDesc("\uB9C8\uC9C0\uB9C9 \uC778\uB371\uC2F1 \uC774\uD6C4 \uC0DD\uC131\uB418\uAC70\uB098 \uC218\uC815\uB41C \uB178\uD2B8\uB9CC \uC784\uBCA0\uB529\uD569\uB2C8\uB2E4.").addButton((button) => {
      button.setButtonText("\uC2E0\uADDC \uC784\uBCA0\uB529 \uC2DC\uC791").onClick(async () => {
        button.setDisabled(true);
        button.setButtonText("\uC9C4\uD589 \uC911...");
        try {
          await this.plugin.indexNewFilesOnly();
          new import_obsidian5.Notice("\uC2E0\uADDC \uC784\uBCA0\uB529 \uC644\uB8CC!");
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          new import_obsidian5.Notice(`\uC784\uBCA0\uB529 \uC2E4\uD328: ${message}`);
        } finally {
          button.setDisabled(false);
          button.setButtonText("\uC2E0\uADDC \uC784\uBCA0\uB529 \uC2DC\uC791");
        }
      });
    });
    new import_obsidian5.Setting(containerEl).setName("\uCCAD\uD06C \uD06C\uAE30").setDesc("\uD14D\uC2A4\uD2B8\uB97C \uBD84\uD560\uD560 \uB54C \uAC01 \uCCAD\uD06C\uC758 \uCD5C\uB300 \uD1A0\uD070 \uC218 (\uAE30\uBCF8: 400)").addText(
      (text) => text.setPlaceholder("400").setValue(String(this.plugin.settings.chunkSize)).onChange(async (value) => {
        const num = parseInt(value);
        if (!isNaN(num) && num > 0) {
          this.plugin.settings.chunkSize = num;
          await this.plugin.saveSettings();
        }
      })
    );
    new import_obsidian5.Setting(containerEl).setName("\uCCAD\uD06C \uC624\uBC84\uB7A9").setDesc("\uC778\uC811\uD55C \uCCAD\uD06C \uAC04 \uC911\uBCF5\uB418\uB294 \uD1A0\uD070 \uC218 (\uAE30\uBCF8: 50)").addText(
      (text) => text.setPlaceholder("50").setValue(String(this.plugin.settings.chunkOverlap)).onChange(async (value) => {
        const num = parseInt(value);
        if (!isNaN(num) && num >= 0) {
          this.plugin.settings.chunkOverlap = num;
          await this.plugin.saveSettings();
        }
      })
    );
    new import_obsidian5.Setting(containerEl).setName("\uAC80\uC0C9 \uACB0\uACFC \uC218 (Top-K)").setDesc("\uAC80\uC0C9 \uC2DC \uBC18\uD658\uD560 \uCD5C\uB300 \uACB0\uACFC \uC218 (\uAE30\uBCF8: 8)").addText(
      (text) => text.setPlaceholder("8").setValue(String(this.plugin.settings.topK)).onChange(async (value) => {
        const num = parseInt(value);
        if (!isNaN(num) && num > 0) {
          this.plugin.settings.topK = num;
          await this.plugin.saveSettings();
        }
      })
    );
    containerEl.createEl("h3", { text: "\uC784\uBCA0\uB529 \uC124\uC815" });
    let embeddingModelInput = null;
    let embeddingApiUrlInput = null;
    new import_obsidian5.Setting(containerEl).setName("\uC784\uBCA0\uB529 \uC81C\uACF5\uC790").setDesc("\uC784\uBCA0\uB529 \uC0DD\uC131\uC5D0 \uC0AC\uC6A9\uD560 \uC81C\uACF5\uC790\uB97C \uC120\uD0DD\uD558\uC138\uC694").addDropdown((dropdown) => {
      dropdown.addOptions({
        gemini: "Google Gemini (API)",
        openai: "OpenAI (API)",
        local: "\uB85C\uCEEC \uBAA8\uB378 (HuggingFace)",
        custom: "\uCEE4\uC2A4\uD140 API"
      }).setValue(this.plugin.settings.embeddingProvider).onChange(async (value) => {
        const provider = value;
        this.plugin.settings.embeddingProvider = provider;
        const preset = EMBEDDING_PRESETS[provider];
        this.plugin.settings.embeddingModel = preset.model;
        this.plugin.settings.embeddingApiUrl = preset.apiUrl || "";
        embeddingModelInput == null ? void 0 : embeddingModelInput.setValue(preset.model);
        embeddingApiUrlInput == null ? void 0 : embeddingApiUrlInput.setValue(preset.apiUrl || "");
        await this.plugin.saveSettings();
        this.display();
      });
    });
    if (this.plugin.settings.embeddingProvider !== "local") {
      new import_obsidian5.Setting(containerEl).setName("\uC784\uBCA0\uB529 API URL").setDesc("\uC784\uBCA0\uB529 \uC694\uCCAD \uC5D4\uB4DC\uD3EC\uC778\uD2B8 URL (\uBE44\uC5B4\uC788\uC73C\uBA74 \uC81C\uACF5\uC790 \uAE30\uBCF8\uAC12 \uC0AC\uC6A9)").addText((text) => {
        embeddingApiUrlInput = text;
        text.setPlaceholder("https://api.openai.com/v1/embeddings").setValue(this.plugin.settings.embeddingApiUrl).onChange(async (value) => {
          this.plugin.settings.embeddingApiUrl = value.trim();
          await this.plugin.saveSettings();
        });
      });
    }
    if (this.plugin.settings.embeddingProvider !== "local") {
      new import_obsidian5.Setting(containerEl).setName("\uC784\uBCA0\uB529 API \uD0A4").setDesc("\uC784\uBCA0\uB529 API \uD0A4 (\uBE44\uC5B4\uC788\uC73C\uBA74 LLM API \uD0A4 \uC0AC\uC6A9)").addText(
        (text) => text.setPlaceholder("\uC120\uD0DD").setValue(this.plugin.settings.embeddingApiKey).onChange(async (value) => {
          this.plugin.settings.embeddingApiKey = value;
          await this.plugin.saveSettings();
        })
      );
    }
    new import_obsidian5.Setting(containerEl).setName("\uC784\uBCA0\uB529 \uBAA8\uB378").setDesc("\uC0AC\uC6A9\uD560 \uC784\uBCA0\uB529 \uBAA8\uB378").addText((text) => {
      embeddingModelInput = text;
      text.setPlaceholder("\uBAA8\uB378\uBA85").setValue(this.plugin.settings.embeddingModel).onChange(async (value) => {
        this.plugin.settings.embeddingModel = value.trim();
        await this.plugin.saveSettings();
      });
    });
  }
  async loadGeminiModels() {
    var _a;
    const apiKey = this.plugin.settings.apiKey.trim();
    if (!apiKey) {
      new import_obsidian5.Notice("Gemini API \uD0A4\uB97C \uBA3C\uC800 \uC785\uB825\uD574 \uC8FC\uC138\uC694.");
      return;
    }
    try {
      const response = await (0, import_obsidian5.requestUrl)({
        url: `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
      });
      const data = response.json;
      const models = (_a = data == null ? void 0 : data.models) != null ? _a : [];
      this.geminiModels = models.filter((model) => {
        var _a2;
        return (_a2 = model.supportedGenerationMethods) == null ? void 0 : _a2.includes("generateContent");
      }).map((model) => model.name).filter((name) => Boolean(name));
      if (this.geminiModels.length === 0) {
        new import_obsidian5.Notice("\uC0AC\uC6A9 \uAC00\uB2A5\uD55C Gemini \uBAA8\uB378\uC744 \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
      } else {
        new import_obsidian5.Notice("Gemini \uBAA8\uB378 \uBAA9\uB85D\uC744 \uBD88\uB7EC\uC654\uC2B5\uB2C8\uB2E4.");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      new import_obsidian5.Notice(`Gemini \uBAA8\uB378 \uBAA9\uB85D \uC2E4\uD328: ${message}`);
    }
  }
};

// src/views/chatView.ts
var import_obsidian7 = require("obsidian");

// src/topicSeparation/keywordExtractor.ts
function extractKeywords(text) {
  if (!text || text.trim().length === 0) {
    return [];
  }
  const cleaned = text.replace(/[^\w\sㄱ-ㅎㅏ-ㅣ가-힣]/g, " ").toLowerCase().trim();
  const words = cleaned.split(/\s+/).filter((word) => word.length > 1);
  const stopWords = /* @__PURE__ */ new Set([
    "\uC774",
    "\uADF8",
    "\uC800",
    "\uAC83",
    "\uC218",
    "\uB4F1",
    "\uB4E4",
    "\uBC0F",
    "\uC744",
    "\uB97C",
    "\uC774\uB97C",
    "\uADF8\uB97C",
    "\uC800\uB97C",
    "\uC740",
    "\uB294",
    "\uC774\uB294",
    "\uADF8\uB294",
    "\uC800\uB294",
    "\uAC00",
    "\uC5D0",
    "\uC758",
    "\uB85C",
    "\uC73C\uB85C",
    "\uC5D0\uC11C",
    "\uC640",
    "\uACFC",
    "\uD558\uB2E4",
    "\uC788\uB2E4",
    "\uB418\uB2E4",
    "\uC54A\uB2E4",
    "\uC5C6\uB2E4",
    "\uAC19\uB2E4",
    "\uC774\uB2E4",
    "\uC544\uB2C8\uB2E4",
    "\uD558\uB294",
    "\uC788\uB294",
    "\uB418\uB294",
    "\uD558\uACE0",
    "\uC788\uACE0",
    "\uB418\uACE0",
    "\uD55C",
    "\uD558\uBA70",
    "\uC788\uC73C\uBA70",
    "\uD560",
    "\uC788\uC744",
    "\uB420",
    "\uD569\uB2C8\uB2E4",
    "\uC785\uB2C8\uB2E4",
    "\uC2B5\uB2C8\uB2E4",
    "\uADF8\uB9AC\uACE0",
    "\uADF8\uB7EC\uB098",
    "\uD558\uC9C0\uB9CC",
    "\uB610\uD55C",
    "\uB610",
    "\uBC0F",
    "\uB4F1",
    "\uB54C\uBB38",
    "\uACBD\uC6B0",
    "\uD1B5\uD574",
    "\uB300\uD55C",
    "\uC704\uD55C",
    "\uAD00\uD55C",
    "\uB530\uB978",
    "\uAC83",
    "\uC810",
    "\uB54C",
    "\uC911",
    "\uB0B4",
    "\uC678"
  ]);
  const filtered = words.filter((word) => !stopWords.has(word) && word.length >= 2);
  const frequency = /* @__PURE__ */ new Map();
  for (const word of filtered) {
    frequency.set(word, (frequency.get(word) || 0) + 1);
  }
  const sorted = Array.from(frequency.entries()).sort((a, b) => b[1] - a[1]).map(([word]) => word);
  return sorted.slice(0, 10);
}

// node_modules/@google/generative-ai/dist/index.mjs
var SchemaType;
(function(SchemaType2) {
  SchemaType2["STRING"] = "string";
  SchemaType2["NUMBER"] = "number";
  SchemaType2["INTEGER"] = "integer";
  SchemaType2["BOOLEAN"] = "boolean";
  SchemaType2["ARRAY"] = "array";
  SchemaType2["OBJECT"] = "object";
})(SchemaType || (SchemaType = {}));
var ExecutableCodeLanguage;
(function(ExecutableCodeLanguage2) {
  ExecutableCodeLanguage2["LANGUAGE_UNSPECIFIED"] = "language_unspecified";
  ExecutableCodeLanguage2["PYTHON"] = "python";
})(ExecutableCodeLanguage || (ExecutableCodeLanguage = {}));
var Outcome;
(function(Outcome2) {
  Outcome2["OUTCOME_UNSPECIFIED"] = "outcome_unspecified";
  Outcome2["OUTCOME_OK"] = "outcome_ok";
  Outcome2["OUTCOME_FAILED"] = "outcome_failed";
  Outcome2["OUTCOME_DEADLINE_EXCEEDED"] = "outcome_deadline_exceeded";
})(Outcome || (Outcome = {}));
var POSSIBLE_ROLES = ["user", "model", "function", "system"];
var HarmCategory;
(function(HarmCategory2) {
  HarmCategory2["HARM_CATEGORY_UNSPECIFIED"] = "HARM_CATEGORY_UNSPECIFIED";
  HarmCategory2["HARM_CATEGORY_HATE_SPEECH"] = "HARM_CATEGORY_HATE_SPEECH";
  HarmCategory2["HARM_CATEGORY_SEXUALLY_EXPLICIT"] = "HARM_CATEGORY_SEXUALLY_EXPLICIT";
  HarmCategory2["HARM_CATEGORY_HARASSMENT"] = "HARM_CATEGORY_HARASSMENT";
  HarmCategory2["HARM_CATEGORY_DANGEROUS_CONTENT"] = "HARM_CATEGORY_DANGEROUS_CONTENT";
  HarmCategory2["HARM_CATEGORY_CIVIC_INTEGRITY"] = "HARM_CATEGORY_CIVIC_INTEGRITY";
})(HarmCategory || (HarmCategory = {}));
var HarmBlockThreshold;
(function(HarmBlockThreshold2) {
  HarmBlockThreshold2["HARM_BLOCK_THRESHOLD_UNSPECIFIED"] = "HARM_BLOCK_THRESHOLD_UNSPECIFIED";
  HarmBlockThreshold2["BLOCK_LOW_AND_ABOVE"] = "BLOCK_LOW_AND_ABOVE";
  HarmBlockThreshold2["BLOCK_MEDIUM_AND_ABOVE"] = "BLOCK_MEDIUM_AND_ABOVE";
  HarmBlockThreshold2["BLOCK_ONLY_HIGH"] = "BLOCK_ONLY_HIGH";
  HarmBlockThreshold2["BLOCK_NONE"] = "BLOCK_NONE";
})(HarmBlockThreshold || (HarmBlockThreshold = {}));
var HarmProbability;
(function(HarmProbability2) {
  HarmProbability2["HARM_PROBABILITY_UNSPECIFIED"] = "HARM_PROBABILITY_UNSPECIFIED";
  HarmProbability2["NEGLIGIBLE"] = "NEGLIGIBLE";
  HarmProbability2["LOW"] = "LOW";
  HarmProbability2["MEDIUM"] = "MEDIUM";
  HarmProbability2["HIGH"] = "HIGH";
})(HarmProbability || (HarmProbability = {}));
var BlockReason;
(function(BlockReason2) {
  BlockReason2["BLOCKED_REASON_UNSPECIFIED"] = "BLOCKED_REASON_UNSPECIFIED";
  BlockReason2["SAFETY"] = "SAFETY";
  BlockReason2["OTHER"] = "OTHER";
})(BlockReason || (BlockReason = {}));
var FinishReason;
(function(FinishReason2) {
  FinishReason2["FINISH_REASON_UNSPECIFIED"] = "FINISH_REASON_UNSPECIFIED";
  FinishReason2["STOP"] = "STOP";
  FinishReason2["MAX_TOKENS"] = "MAX_TOKENS";
  FinishReason2["SAFETY"] = "SAFETY";
  FinishReason2["RECITATION"] = "RECITATION";
  FinishReason2["LANGUAGE"] = "LANGUAGE";
  FinishReason2["BLOCKLIST"] = "BLOCKLIST";
  FinishReason2["PROHIBITED_CONTENT"] = "PROHIBITED_CONTENT";
  FinishReason2["SPII"] = "SPII";
  FinishReason2["MALFORMED_FUNCTION_CALL"] = "MALFORMED_FUNCTION_CALL";
  FinishReason2["OTHER"] = "OTHER";
})(FinishReason || (FinishReason = {}));
var TaskType;
(function(TaskType2) {
  TaskType2["TASK_TYPE_UNSPECIFIED"] = "TASK_TYPE_UNSPECIFIED";
  TaskType2["RETRIEVAL_QUERY"] = "RETRIEVAL_QUERY";
  TaskType2["RETRIEVAL_DOCUMENT"] = "RETRIEVAL_DOCUMENT";
  TaskType2["SEMANTIC_SIMILARITY"] = "SEMANTIC_SIMILARITY";
  TaskType2["CLASSIFICATION"] = "CLASSIFICATION";
  TaskType2["CLUSTERING"] = "CLUSTERING";
})(TaskType || (TaskType = {}));
var FunctionCallingMode;
(function(FunctionCallingMode2) {
  FunctionCallingMode2["MODE_UNSPECIFIED"] = "MODE_UNSPECIFIED";
  FunctionCallingMode2["AUTO"] = "AUTO";
  FunctionCallingMode2["ANY"] = "ANY";
  FunctionCallingMode2["NONE"] = "NONE";
})(FunctionCallingMode || (FunctionCallingMode = {}));
var DynamicRetrievalMode;
(function(DynamicRetrievalMode2) {
  DynamicRetrievalMode2["MODE_UNSPECIFIED"] = "MODE_UNSPECIFIED";
  DynamicRetrievalMode2["MODE_DYNAMIC"] = "MODE_DYNAMIC";
})(DynamicRetrievalMode || (DynamicRetrievalMode = {}));
var GoogleGenerativeAIError = class extends Error {
  constructor(message) {
    super(`[GoogleGenerativeAI Error]: ${message}`);
  }
};
var GoogleGenerativeAIResponseError = class extends GoogleGenerativeAIError {
  constructor(message, response) {
    super(message);
    this.response = response;
  }
};
var GoogleGenerativeAIFetchError = class extends GoogleGenerativeAIError {
  constructor(message, status, statusText, errorDetails) {
    super(message);
    this.status = status;
    this.statusText = statusText;
    this.errorDetails = errorDetails;
  }
};
var GoogleGenerativeAIRequestInputError = class extends GoogleGenerativeAIError {
};
var GoogleGenerativeAIAbortError = class extends GoogleGenerativeAIError {
};
var DEFAULT_BASE_URL = "https://generativelanguage.googleapis.com";
var DEFAULT_API_VERSION = "v1beta";
var PACKAGE_VERSION = "0.24.1";
var PACKAGE_LOG_HEADER = "genai-js";
var Task;
(function(Task2) {
  Task2["GENERATE_CONTENT"] = "generateContent";
  Task2["STREAM_GENERATE_CONTENT"] = "streamGenerateContent";
  Task2["COUNT_TOKENS"] = "countTokens";
  Task2["EMBED_CONTENT"] = "embedContent";
  Task2["BATCH_EMBED_CONTENTS"] = "batchEmbedContents";
})(Task || (Task = {}));
var RequestUrl = class {
  constructor(model, task, apiKey, stream, requestOptions) {
    this.model = model;
    this.task = task;
    this.apiKey = apiKey;
    this.stream = stream;
    this.requestOptions = requestOptions;
  }
  toString() {
    var _a, _b;
    const apiVersion = ((_a = this.requestOptions) === null || _a === void 0 ? void 0 : _a.apiVersion) || DEFAULT_API_VERSION;
    const baseUrl = ((_b = this.requestOptions) === null || _b === void 0 ? void 0 : _b.baseUrl) || DEFAULT_BASE_URL;
    let url = `${baseUrl}/${apiVersion}/${this.model}:${this.task}`;
    if (this.stream) {
      url += "?alt=sse";
    }
    return url;
  }
};
function getClientHeaders(requestOptions) {
  const clientHeaders = [];
  if (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.apiClient) {
    clientHeaders.push(requestOptions.apiClient);
  }
  clientHeaders.push(`${PACKAGE_LOG_HEADER}/${PACKAGE_VERSION}`);
  return clientHeaders.join(" ");
}
async function getHeaders(url) {
  var _a;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("x-goog-api-client", getClientHeaders(url.requestOptions));
  headers.append("x-goog-api-key", url.apiKey);
  let customHeaders = (_a = url.requestOptions) === null || _a === void 0 ? void 0 : _a.customHeaders;
  if (customHeaders) {
    if (!(customHeaders instanceof Headers)) {
      try {
        customHeaders = new Headers(customHeaders);
      } catch (e) {
        throw new GoogleGenerativeAIRequestInputError(`unable to convert customHeaders value ${JSON.stringify(customHeaders)} to Headers: ${e.message}`);
      }
    }
    for (const [headerName, headerValue] of customHeaders.entries()) {
      if (headerName === "x-goog-api-key") {
        throw new GoogleGenerativeAIRequestInputError(`Cannot set reserved header name ${headerName}`);
      } else if (headerName === "x-goog-api-client") {
        throw new GoogleGenerativeAIRequestInputError(`Header name ${headerName} can only be set using the apiClient field`);
      }
      headers.append(headerName, headerValue);
    }
  }
  return headers;
}
async function constructModelRequest(model, task, apiKey, stream, body, requestOptions) {
  const url = new RequestUrl(model, task, apiKey, stream, requestOptions);
  return {
    url: url.toString(),
    fetchOptions: Object.assign(Object.assign({}, buildFetchOptions(requestOptions)), { method: "POST", headers: await getHeaders(url), body })
  };
}
async function makeModelRequest(model, task, apiKey, stream, body, requestOptions = {}, fetchFn = fetch) {
  const { url, fetchOptions } = await constructModelRequest(model, task, apiKey, stream, body, requestOptions);
  return makeRequest(url, fetchOptions, fetchFn);
}
async function makeRequest(url, fetchOptions, fetchFn = fetch) {
  let response;
  try {
    response = await fetchFn(url, fetchOptions);
  } catch (e) {
    handleResponseError(e, url);
  }
  if (!response.ok) {
    await handleResponseNotOk(response, url);
  }
  return response;
}
function handleResponseError(e, url) {
  let err = e;
  if (err.name === "AbortError") {
    err = new GoogleGenerativeAIAbortError(`Request aborted when fetching ${url.toString()}: ${e.message}`);
    err.stack = e.stack;
  } else if (!(e instanceof GoogleGenerativeAIFetchError || e instanceof GoogleGenerativeAIRequestInputError)) {
    err = new GoogleGenerativeAIError(`Error fetching from ${url.toString()}: ${e.message}`);
    err.stack = e.stack;
  }
  throw err;
}
async function handleResponseNotOk(response, url) {
  let message = "";
  let errorDetails;
  try {
    const json = await response.json();
    message = json.error.message;
    if (json.error.details) {
      message += ` ${JSON.stringify(json.error.details)}`;
      errorDetails = json.error.details;
    }
  } catch (e) {
  }
  throw new GoogleGenerativeAIFetchError(`Error fetching from ${url.toString()}: [${response.status} ${response.statusText}] ${message}`, response.status, response.statusText, errorDetails);
}
function buildFetchOptions(requestOptions) {
  const fetchOptions = {};
  if ((requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.signal) !== void 0 || (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeout) >= 0) {
    const controller = new AbortController();
    if ((requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeout) >= 0) {
      setTimeout(() => controller.abort(), requestOptions.timeout);
    }
    if (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.signal) {
      requestOptions.signal.addEventListener("abort", () => {
        controller.abort();
      });
    }
    fetchOptions.signal = controller.signal;
  }
  return fetchOptions;
}
function addHelpers(response) {
  response.text = () => {
    if (response.candidates && response.candidates.length > 0) {
      if (response.candidates.length > 1) {
        console.warn(`This response had ${response.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`);
      }
      if (hadBadFinishReason(response.candidates[0])) {
        throw new GoogleGenerativeAIResponseError(`${formatBlockErrorMessage(response)}`, response);
      }
      return getText(response);
    } else if (response.promptFeedback) {
      throw new GoogleGenerativeAIResponseError(`Text not available. ${formatBlockErrorMessage(response)}`, response);
    }
    return "";
  };
  response.functionCall = () => {
    if (response.candidates && response.candidates.length > 0) {
      if (response.candidates.length > 1) {
        console.warn(`This response had ${response.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`);
      }
      if (hadBadFinishReason(response.candidates[0])) {
        throw new GoogleGenerativeAIResponseError(`${formatBlockErrorMessage(response)}`, response);
      }
      console.warn(`response.functionCall() is deprecated. Use response.functionCalls() instead.`);
      return getFunctionCalls(response)[0];
    } else if (response.promptFeedback) {
      throw new GoogleGenerativeAIResponseError(`Function call not available. ${formatBlockErrorMessage(response)}`, response);
    }
    return void 0;
  };
  response.functionCalls = () => {
    if (response.candidates && response.candidates.length > 0) {
      if (response.candidates.length > 1) {
        console.warn(`This response had ${response.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`);
      }
      if (hadBadFinishReason(response.candidates[0])) {
        throw new GoogleGenerativeAIResponseError(`${formatBlockErrorMessage(response)}`, response);
      }
      return getFunctionCalls(response);
    } else if (response.promptFeedback) {
      throw new GoogleGenerativeAIResponseError(`Function call not available. ${formatBlockErrorMessage(response)}`, response);
    }
    return void 0;
  };
  return response;
}
function getText(response) {
  var _a, _b, _c, _d;
  const textStrings = [];
  if ((_b = (_a = response.candidates) === null || _a === void 0 ? void 0 : _a[0].content) === null || _b === void 0 ? void 0 : _b.parts) {
    for (const part of (_d = (_c = response.candidates) === null || _c === void 0 ? void 0 : _c[0].content) === null || _d === void 0 ? void 0 : _d.parts) {
      if (part.text) {
        textStrings.push(part.text);
      }
      if (part.executableCode) {
        textStrings.push("\n```" + part.executableCode.language + "\n" + part.executableCode.code + "\n```\n");
      }
      if (part.codeExecutionResult) {
        textStrings.push("\n```\n" + part.codeExecutionResult.output + "\n```\n");
      }
    }
  }
  if (textStrings.length > 0) {
    return textStrings.join("");
  } else {
    return "";
  }
}
function getFunctionCalls(response) {
  var _a, _b, _c, _d;
  const functionCalls = [];
  if ((_b = (_a = response.candidates) === null || _a === void 0 ? void 0 : _a[0].content) === null || _b === void 0 ? void 0 : _b.parts) {
    for (const part of (_d = (_c = response.candidates) === null || _c === void 0 ? void 0 : _c[0].content) === null || _d === void 0 ? void 0 : _d.parts) {
      if (part.functionCall) {
        functionCalls.push(part.functionCall);
      }
    }
  }
  if (functionCalls.length > 0) {
    return functionCalls;
  } else {
    return void 0;
  }
}
var badFinishReasons = [
  FinishReason.RECITATION,
  FinishReason.SAFETY,
  FinishReason.LANGUAGE
];
function hadBadFinishReason(candidate) {
  return !!candidate.finishReason && badFinishReasons.includes(candidate.finishReason);
}
function formatBlockErrorMessage(response) {
  var _a, _b, _c;
  let message = "";
  if ((!response.candidates || response.candidates.length === 0) && response.promptFeedback) {
    message += "Response was blocked";
    if ((_a = response.promptFeedback) === null || _a === void 0 ? void 0 : _a.blockReason) {
      message += ` due to ${response.promptFeedback.blockReason}`;
    }
    if ((_b = response.promptFeedback) === null || _b === void 0 ? void 0 : _b.blockReasonMessage) {
      message += `: ${response.promptFeedback.blockReasonMessage}`;
    }
  } else if ((_c = response.candidates) === null || _c === void 0 ? void 0 : _c[0]) {
    const firstCandidate = response.candidates[0];
    if (hadBadFinishReason(firstCandidate)) {
      message += `Candidate was blocked due to ${firstCandidate.finishReason}`;
      if (firstCandidate.finishMessage) {
        message += `: ${firstCandidate.finishMessage}`;
      }
    }
  }
  return message;
}
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function verb(n) {
    if (g[n]) i[n] = function(v) {
      return new Promise(function(a, b) {
        q.push([n, v, a, b]) > 1 || resume(n, v);
      });
    };
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
}
var responseLineRE = /^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;
function processStream(response) {
  const inputStream = response.body.pipeThrough(new TextDecoderStream("utf8", { fatal: true }));
  const responseStream = getResponseStream(inputStream);
  const [stream1, stream2] = responseStream.tee();
  return {
    stream: generateResponseSequence(stream1),
    response: getResponsePromise(stream2)
  };
}
async function getResponsePromise(stream) {
  const allResponses = [];
  const reader = stream.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      return addHelpers(aggregateResponses(allResponses));
    }
    allResponses.push(value);
  }
}
function generateResponseSequence(stream) {
  return __asyncGenerator(this, arguments, function* generateResponseSequence_1() {
    const reader = stream.getReader();
    while (true) {
      const { value, done } = yield __await(reader.read());
      if (done) {
        break;
      }
      yield yield __await(addHelpers(value));
    }
  });
}
function getResponseStream(inputStream) {
  const reader = inputStream.getReader();
  const stream = new ReadableStream({
    start(controller) {
      let currentText = "";
      return pump();
      function pump() {
        return reader.read().then(({ value, done }) => {
          if (done) {
            if (currentText.trim()) {
              controller.error(new GoogleGenerativeAIError("Failed to parse stream"));
              return;
            }
            controller.close();
            return;
          }
          currentText += value;
          let match = currentText.match(responseLineRE);
          let parsedResponse;
          while (match) {
            try {
              parsedResponse = JSON.parse(match[1]);
            } catch (e) {
              controller.error(new GoogleGenerativeAIError(`Error parsing JSON response: "${match[1]}"`));
              return;
            }
            controller.enqueue(parsedResponse);
            currentText = currentText.substring(match[0].length);
            match = currentText.match(responseLineRE);
          }
          return pump();
        }).catch((e) => {
          let err = e;
          err.stack = e.stack;
          if (err.name === "AbortError") {
            err = new GoogleGenerativeAIAbortError("Request aborted when reading from the stream");
          } else {
            err = new GoogleGenerativeAIError("Error reading from the stream");
          }
          throw err;
        });
      }
    }
  });
  return stream;
}
function aggregateResponses(responses) {
  const lastResponse = responses[responses.length - 1];
  const aggregatedResponse = {
    promptFeedback: lastResponse === null || lastResponse === void 0 ? void 0 : lastResponse.promptFeedback
  };
  for (const response of responses) {
    if (response.candidates) {
      let candidateIndex = 0;
      for (const candidate of response.candidates) {
        if (!aggregatedResponse.candidates) {
          aggregatedResponse.candidates = [];
        }
        if (!aggregatedResponse.candidates[candidateIndex]) {
          aggregatedResponse.candidates[candidateIndex] = {
            index: candidateIndex
          };
        }
        aggregatedResponse.candidates[candidateIndex].citationMetadata = candidate.citationMetadata;
        aggregatedResponse.candidates[candidateIndex].groundingMetadata = candidate.groundingMetadata;
        aggregatedResponse.candidates[candidateIndex].finishReason = candidate.finishReason;
        aggregatedResponse.candidates[candidateIndex].finishMessage = candidate.finishMessage;
        aggregatedResponse.candidates[candidateIndex].safetyRatings = candidate.safetyRatings;
        if (candidate.content && candidate.content.parts) {
          if (!aggregatedResponse.candidates[candidateIndex].content) {
            aggregatedResponse.candidates[candidateIndex].content = {
              role: candidate.content.role || "user",
              parts: []
            };
          }
          const newPart = {};
          for (const part of candidate.content.parts) {
            if (part.text) {
              newPart.text = part.text;
            }
            if (part.functionCall) {
              newPart.functionCall = part.functionCall;
            }
            if (part.executableCode) {
              newPart.executableCode = part.executableCode;
            }
            if (part.codeExecutionResult) {
              newPart.codeExecutionResult = part.codeExecutionResult;
            }
            if (Object.keys(newPart).length === 0) {
              newPart.text = "";
            }
            aggregatedResponse.candidates[candidateIndex].content.parts.push(newPart);
          }
        }
      }
      candidateIndex++;
    }
    if (response.usageMetadata) {
      aggregatedResponse.usageMetadata = response.usageMetadata;
    }
  }
  return aggregatedResponse;
}
async function generateContentStream(apiKey, model, params, requestOptions) {
  const response = await makeModelRequest(
    model,
    Task.STREAM_GENERATE_CONTENT,
    apiKey,
    /* stream */
    true,
    JSON.stringify(params),
    requestOptions
  );
  return processStream(response);
}
async function generateContent(apiKey, model, params, requestOptions) {
  const response = await makeModelRequest(
    model,
    Task.GENERATE_CONTENT,
    apiKey,
    /* stream */
    false,
    JSON.stringify(params),
    requestOptions
  );
  const responseJson = await response.json();
  const enhancedResponse = addHelpers(responseJson);
  return {
    response: enhancedResponse
  };
}
function formatSystemInstruction(input) {
  if (input == null) {
    return void 0;
  } else if (typeof input === "string") {
    return { role: "system", parts: [{ text: input }] };
  } else if (input.text) {
    return { role: "system", parts: [input] };
  } else if (input.parts) {
    if (!input.role) {
      return { role: "system", parts: input.parts };
    } else {
      return input;
    }
  }
}
function formatNewContent(request) {
  let newParts = [];
  if (typeof request === "string") {
    newParts = [{ text: request }];
  } else {
    for (const partOrString of request) {
      if (typeof partOrString === "string") {
        newParts.push({ text: partOrString });
      } else {
        newParts.push(partOrString);
      }
    }
  }
  return assignRoleToPartsAndValidateSendMessageRequest(newParts);
}
function assignRoleToPartsAndValidateSendMessageRequest(parts) {
  const userContent = { role: "user", parts: [] };
  const functionContent = { role: "function", parts: [] };
  let hasUserContent = false;
  let hasFunctionContent = false;
  for (const part of parts) {
    if ("functionResponse" in part) {
      functionContent.parts.push(part);
      hasFunctionContent = true;
    } else {
      userContent.parts.push(part);
      hasUserContent = true;
    }
  }
  if (hasUserContent && hasFunctionContent) {
    throw new GoogleGenerativeAIError("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");
  }
  if (!hasUserContent && !hasFunctionContent) {
    throw new GoogleGenerativeAIError("No content is provided for sending chat message.");
  }
  if (hasUserContent) {
    return userContent;
  }
  return functionContent;
}
function formatCountTokensInput(params, modelParams) {
  var _a;
  let formattedGenerateContentRequest = {
    model: modelParams === null || modelParams === void 0 ? void 0 : modelParams.model,
    generationConfig: modelParams === null || modelParams === void 0 ? void 0 : modelParams.generationConfig,
    safetySettings: modelParams === null || modelParams === void 0 ? void 0 : modelParams.safetySettings,
    tools: modelParams === null || modelParams === void 0 ? void 0 : modelParams.tools,
    toolConfig: modelParams === null || modelParams === void 0 ? void 0 : modelParams.toolConfig,
    systemInstruction: modelParams === null || modelParams === void 0 ? void 0 : modelParams.systemInstruction,
    cachedContent: (_a = modelParams === null || modelParams === void 0 ? void 0 : modelParams.cachedContent) === null || _a === void 0 ? void 0 : _a.name,
    contents: []
  };
  const containsGenerateContentRequest = params.generateContentRequest != null;
  if (params.contents) {
    if (containsGenerateContentRequest) {
      throw new GoogleGenerativeAIRequestInputError("CountTokensRequest must have one of contents or generateContentRequest, not both.");
    }
    formattedGenerateContentRequest.contents = params.contents;
  } else if (containsGenerateContentRequest) {
    formattedGenerateContentRequest = Object.assign(Object.assign({}, formattedGenerateContentRequest), params.generateContentRequest);
  } else {
    const content = formatNewContent(params);
    formattedGenerateContentRequest.contents = [content];
  }
  return { generateContentRequest: formattedGenerateContentRequest };
}
function formatGenerateContentInput(params) {
  let formattedRequest;
  if (params.contents) {
    formattedRequest = params;
  } else {
    const content = formatNewContent(params);
    formattedRequest = { contents: [content] };
  }
  if (params.systemInstruction) {
    formattedRequest.systemInstruction = formatSystemInstruction(params.systemInstruction);
  }
  return formattedRequest;
}
function formatEmbedContentInput(params) {
  if (typeof params === "string" || Array.isArray(params)) {
    const content = formatNewContent(params);
    return { content };
  }
  return params;
}
var VALID_PART_FIELDS = [
  "text",
  "inlineData",
  "functionCall",
  "functionResponse",
  "executableCode",
  "codeExecutionResult"
];
var VALID_PARTS_PER_ROLE = {
  user: ["text", "inlineData"],
  function: ["functionResponse"],
  model: ["text", "functionCall", "executableCode", "codeExecutionResult"],
  // System instructions shouldn't be in history anyway.
  system: ["text"]
};
function validateChatHistory(history) {
  let prevContent = false;
  for (const currContent of history) {
    const { role, parts } = currContent;
    if (!prevContent && role !== "user") {
      throw new GoogleGenerativeAIError(`First content should be with role 'user', got ${role}`);
    }
    if (!POSSIBLE_ROLES.includes(role)) {
      throw new GoogleGenerativeAIError(`Each item should include role field. Got ${role} but valid roles are: ${JSON.stringify(POSSIBLE_ROLES)}`);
    }
    if (!Array.isArray(parts)) {
      throw new GoogleGenerativeAIError("Content should have 'parts' property with an array of Parts");
    }
    if (parts.length === 0) {
      throw new GoogleGenerativeAIError("Each Content should have at least one part");
    }
    const countFields = {
      text: 0,
      inlineData: 0,
      functionCall: 0,
      functionResponse: 0,
      fileData: 0,
      executableCode: 0,
      codeExecutionResult: 0
    };
    for (const part of parts) {
      for (const key of VALID_PART_FIELDS) {
        if (key in part) {
          countFields[key] += 1;
        }
      }
    }
    const validParts = VALID_PARTS_PER_ROLE[role];
    for (const key of VALID_PART_FIELDS) {
      if (!validParts.includes(key) && countFields[key] > 0) {
        throw new GoogleGenerativeAIError(`Content with role '${role}' can't contain '${key}' part`);
      }
    }
    prevContent = true;
  }
}
function isValidResponse(response) {
  var _a;
  if (response.candidates === void 0 || response.candidates.length === 0) {
    return false;
  }
  const content = (_a = response.candidates[0]) === null || _a === void 0 ? void 0 : _a.content;
  if (content === void 0) {
    return false;
  }
  if (content.parts === void 0 || content.parts.length === 0) {
    return false;
  }
  for (const part of content.parts) {
    if (part === void 0 || Object.keys(part).length === 0) {
      return false;
    }
    if (part.text !== void 0 && part.text === "") {
      return false;
    }
  }
  return true;
}
var SILENT_ERROR = "SILENT_ERROR";
var ChatSession = class {
  constructor(apiKey, model, params, _requestOptions = {}) {
    this.model = model;
    this.params = params;
    this._requestOptions = _requestOptions;
    this._history = [];
    this._sendPromise = Promise.resolve();
    this._apiKey = apiKey;
    if (params === null || params === void 0 ? void 0 : params.history) {
      validateChatHistory(params.history);
      this._history = params.history;
    }
  }
  /**
   * Gets the chat history so far. Blocked prompts are not added to history.
   * Blocked candidates are not added to history, nor are the prompts that
   * generated them.
   */
  async getHistory() {
    await this._sendPromise;
    return this._history;
  }
  /**
   * Sends a chat message and receives a non-streaming
   * {@link GenerateContentResult}.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async sendMessage(request, requestOptions = {}) {
    var _a, _b, _c, _d, _e, _f;
    await this._sendPromise;
    const newContent = formatNewContent(request);
    const generateContentRequest = {
      safetySettings: (_a = this.params) === null || _a === void 0 ? void 0 : _a.safetySettings,
      generationConfig: (_b = this.params) === null || _b === void 0 ? void 0 : _b.generationConfig,
      tools: (_c = this.params) === null || _c === void 0 ? void 0 : _c.tools,
      toolConfig: (_d = this.params) === null || _d === void 0 ? void 0 : _d.toolConfig,
      systemInstruction: (_e = this.params) === null || _e === void 0 ? void 0 : _e.systemInstruction,
      cachedContent: (_f = this.params) === null || _f === void 0 ? void 0 : _f.cachedContent,
      contents: [...this._history, newContent]
    };
    const chatSessionRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
    let finalResult;
    this._sendPromise = this._sendPromise.then(() => generateContent(this._apiKey, this.model, generateContentRequest, chatSessionRequestOptions)).then((result) => {
      var _a2;
      if (isValidResponse(result.response)) {
        this._history.push(newContent);
        const responseContent = Object.assign({
          parts: [],
          // Response seems to come back without a role set.
          role: "model"
        }, (_a2 = result.response.candidates) === null || _a2 === void 0 ? void 0 : _a2[0].content);
        this._history.push(responseContent);
      } else {
        const blockErrorMessage = formatBlockErrorMessage(result.response);
        if (blockErrorMessage) {
          console.warn(`sendMessage() was unsuccessful. ${blockErrorMessage}. Inspect response object for details.`);
        }
      }
      finalResult = result;
    }).catch((e) => {
      this._sendPromise = Promise.resolve();
      throw e;
    });
    await this._sendPromise;
    return finalResult;
  }
  /**
   * Sends a chat message and receives the response as a
   * {@link GenerateContentStreamResult} containing an iterable stream
   * and a response promise.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async sendMessageStream(request, requestOptions = {}) {
    var _a, _b, _c, _d, _e, _f;
    await this._sendPromise;
    const newContent = formatNewContent(request);
    const generateContentRequest = {
      safetySettings: (_a = this.params) === null || _a === void 0 ? void 0 : _a.safetySettings,
      generationConfig: (_b = this.params) === null || _b === void 0 ? void 0 : _b.generationConfig,
      tools: (_c = this.params) === null || _c === void 0 ? void 0 : _c.tools,
      toolConfig: (_d = this.params) === null || _d === void 0 ? void 0 : _d.toolConfig,
      systemInstruction: (_e = this.params) === null || _e === void 0 ? void 0 : _e.systemInstruction,
      cachedContent: (_f = this.params) === null || _f === void 0 ? void 0 : _f.cachedContent,
      contents: [...this._history, newContent]
    };
    const chatSessionRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
    const streamPromise = generateContentStream(this._apiKey, this.model, generateContentRequest, chatSessionRequestOptions);
    this._sendPromise = this._sendPromise.then(() => streamPromise).catch((_ignored) => {
      throw new Error(SILENT_ERROR);
    }).then((streamResult) => streamResult.response).then((response) => {
      if (isValidResponse(response)) {
        this._history.push(newContent);
        const responseContent = Object.assign({}, response.candidates[0].content);
        if (!responseContent.role) {
          responseContent.role = "model";
        }
        this._history.push(responseContent);
      } else {
        const blockErrorMessage = formatBlockErrorMessage(response);
        if (blockErrorMessage) {
          console.warn(`sendMessageStream() was unsuccessful. ${blockErrorMessage}. Inspect response object for details.`);
        }
      }
    }).catch((e) => {
      if (e.message !== SILENT_ERROR) {
        console.error(e);
      }
    });
    return streamPromise;
  }
};
async function countTokens(apiKey, model, params, singleRequestOptions) {
  const response = await makeModelRequest(model, Task.COUNT_TOKENS, apiKey, false, JSON.stringify(params), singleRequestOptions);
  return response.json();
}
async function embedContent(apiKey, model, params, requestOptions) {
  const response = await makeModelRequest(model, Task.EMBED_CONTENT, apiKey, false, JSON.stringify(params), requestOptions);
  return response.json();
}
async function batchEmbedContents(apiKey, model, params, requestOptions) {
  const requestsWithModel = params.requests.map((request) => {
    return Object.assign(Object.assign({}, request), { model });
  });
  const response = await makeModelRequest(model, Task.BATCH_EMBED_CONTENTS, apiKey, false, JSON.stringify({ requests: requestsWithModel }), requestOptions);
  return response.json();
}
var GenerativeModel = class {
  constructor(apiKey, modelParams, _requestOptions = {}) {
    this.apiKey = apiKey;
    this._requestOptions = _requestOptions;
    if (modelParams.model.includes("/")) {
      this.model = modelParams.model;
    } else {
      this.model = `models/${modelParams.model}`;
    }
    this.generationConfig = modelParams.generationConfig || {};
    this.safetySettings = modelParams.safetySettings || [];
    this.tools = modelParams.tools;
    this.toolConfig = modelParams.toolConfig;
    this.systemInstruction = formatSystemInstruction(modelParams.systemInstruction);
    this.cachedContent = modelParams.cachedContent;
  }
  /**
   * Makes a single non-streaming call to the model
   * and returns an object containing a single {@link GenerateContentResponse}.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async generateContent(request, requestOptions = {}) {
    var _a;
    const formattedParams = formatGenerateContentInput(request);
    const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
    return generateContent(this.apiKey, this.model, Object.assign({ generationConfig: this.generationConfig, safetySettings: this.safetySettings, tools: this.tools, toolConfig: this.toolConfig, systemInstruction: this.systemInstruction, cachedContent: (_a = this.cachedContent) === null || _a === void 0 ? void 0 : _a.name }, formattedParams), generativeModelRequestOptions);
  }
  /**
   * Makes a single streaming call to the model and returns an object
   * containing an iterable stream that iterates over all chunks in the
   * streaming response as well as a promise that returns the final
   * aggregated response.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async generateContentStream(request, requestOptions = {}) {
    var _a;
    const formattedParams = formatGenerateContentInput(request);
    const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
    return generateContentStream(this.apiKey, this.model, Object.assign({ generationConfig: this.generationConfig, safetySettings: this.safetySettings, tools: this.tools, toolConfig: this.toolConfig, systemInstruction: this.systemInstruction, cachedContent: (_a = this.cachedContent) === null || _a === void 0 ? void 0 : _a.name }, formattedParams), generativeModelRequestOptions);
  }
  /**
   * Gets a new {@link ChatSession} instance which can be used for
   * multi-turn chats.
   */
  startChat(startChatParams) {
    var _a;
    return new ChatSession(this.apiKey, this.model, Object.assign({ generationConfig: this.generationConfig, safetySettings: this.safetySettings, tools: this.tools, toolConfig: this.toolConfig, systemInstruction: this.systemInstruction, cachedContent: (_a = this.cachedContent) === null || _a === void 0 ? void 0 : _a.name }, startChatParams), this._requestOptions);
  }
  /**
   * Counts the tokens in the provided request.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async countTokens(request, requestOptions = {}) {
    const formattedParams = formatCountTokensInput(request, {
      model: this.model,
      generationConfig: this.generationConfig,
      safetySettings: this.safetySettings,
      tools: this.tools,
      toolConfig: this.toolConfig,
      systemInstruction: this.systemInstruction,
      cachedContent: this.cachedContent
    });
    const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
    return countTokens(this.apiKey, this.model, formattedParams, generativeModelRequestOptions);
  }
  /**
   * Embeds the provided content.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async embedContent(request, requestOptions = {}) {
    const formattedParams = formatEmbedContentInput(request);
    const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
    return embedContent(this.apiKey, this.model, formattedParams, generativeModelRequestOptions);
  }
  /**
   * Embeds an array of {@link EmbedContentRequest}s.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async batchEmbedContents(batchEmbedContentRequest, requestOptions = {}) {
    const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
    return batchEmbedContents(this.apiKey, this.model, batchEmbedContentRequest, generativeModelRequestOptions);
  }
};
var GoogleGenerativeAI = class {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }
  /**
   * Gets a {@link GenerativeModel} instance for the provided model name.
   */
  getGenerativeModel(modelParams, requestOptions) {
    if (!modelParams.model) {
      throw new GoogleGenerativeAIError(`Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })`);
    }
    return new GenerativeModel(this.apiKey, modelParams, requestOptions);
  }
  /**
   * Creates a {@link GenerativeModel} instance from provided content cache.
   */
  getGenerativeModelFromCachedContent(cachedContent, modelParams, requestOptions) {
    if (!cachedContent.name) {
      throw new GoogleGenerativeAIRequestInputError("Cached content must contain a `name` field.");
    }
    if (!cachedContent.model) {
      throw new GoogleGenerativeAIRequestInputError("Cached content must contain a `model` field.");
    }
    const disallowedDuplicates = ["model", "systemInstruction"];
    for (const key of disallowedDuplicates) {
      if ((modelParams === null || modelParams === void 0 ? void 0 : modelParams[key]) && cachedContent[key] && (modelParams === null || modelParams === void 0 ? void 0 : modelParams[key]) !== cachedContent[key]) {
        if (key === "model") {
          const modelParamsComp = modelParams.model.startsWith("models/") ? modelParams.model.replace("models/", "") : modelParams.model;
          const cachedContentComp = cachedContent.model.startsWith("models/") ? cachedContent.model.replace("models/", "") : cachedContent.model;
          if (modelParamsComp === cachedContentComp) {
            continue;
          }
        }
        throw new GoogleGenerativeAIRequestInputError(`Different value for "${key}" specified in modelParams (${modelParams[key]}) and cachedContent (${cachedContent[key]})`);
      }
    }
    const modelParamsFromCache = Object.assign(Object.assign({}, modelParams), { model: cachedContent.model, tools: cachedContent.tools, toolConfig: cachedContent.toolConfig, systemInstruction: cachedContent.systemInstruction, cachedContent });
    return new GenerativeModel(this.apiKey, modelParamsFromCache, requestOptions);
  }
};

// src/topicSeparation/embeddingService.ts
function cosineSimilarity(vecA, vecB) {
  if (vecA.length !== vecB.length) {
    throw new Error("\uBCA1\uD130\uC758 \uCC28\uC6D0\uC774 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4");
  }
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  if (denominator === 0) {
    return 0;
  }
  return dotProduct / denominator;
}
var EmbeddingGenerator = class {
  constructor(apiKey, modelName = "embedding-001", app, manifest, enableLogging = false) {
    this.apiKey = apiKey;
    this.modelName = modelName;
    this.app = app;
    this.manifest = manifest;
    this.enableLogging = enableLogging;
    this.genAI = null;
    this.model = null;
    this.cache = /* @__PURE__ */ new Map();
    this.lastEmbedding = null;
    this.lastText = "";
    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
      const cleanModelName = this.modelName.replace(/^models\//, "");
      this.model = this.genAI.getGenerativeModel({ model: cleanModelName });
    }
  }
  /**
   * 텍스트를 벡터로 변환합니다
   * @param text 입력 텍스트
   * @returns 임베딩 벡터
   */
  async embed(text) {
    var _a;
    if (!this.model) {
      throw new Error("Gemini API\uAC00 \uCD08\uAE30\uD654\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4");
    }
    let embedding;
    if (this.cache.has(text)) {
      embedding = this.cache.get(text);
    } else {
      try {
        const result = await this.model.embedContent(text);
        const values = (_a = result == null ? void 0 : result.embedding) == null ? void 0 : _a.values;
        if (!Array.isArray(values) || values.length === 0) {
          throw new Error("\uC784\uBCA0\uB529 \uC751\uB2F5\uC774 \uBE44\uC5B4 \uC788\uC2B5\uB2C8\uB2E4");
        }
        embedding = values;
        this.cache.set(text, embedding);
      } catch (error) {
        console.error("\uC784\uBCA0\uB529 \uC0DD\uC131 \uC2E4\uD328:", error);
        throw new Error(`\uC784\uBCA0\uB529 \uC0DD\uC131 \uC2E4\uD328: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
    if (!embedding) {
      throw new Error("\uC784\uBCA0\uB529 \uC0DD\uC131 \uACB0\uACFC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4");
    }
    if (this.enableLogging && this.app) {
      try {
        const { appendEmbeddingLog: appendEmbeddingLog2 } = await Promise.resolve().then(() => (init_logging(), logging_exports));
        let similarity;
        let previousText;
        if (this.lastEmbedding) {
          similarity = cosineSimilarity(this.lastEmbedding, embedding);
          previousText = this.lastText;
        }
        await appendEmbeddingLog2(this.app, this.manifest, {
          inputText: text,
          embedding,
          similarity,
          previousInputText: previousText
        });
      } catch (logError) {
        console.error("\uC784\uBCA0\uB529 \uB85C\uADF8 \uC791\uC131 \uC2E4\uD328:", logError);
      }
    }
    this.lastEmbedding = embedding;
    this.lastText = text;
    return embedding;
  }
  /**
   * 여러 텍스트를 한 번에 벡터로 변환합니다
   * @param texts 입력 텍스트 배열
   * @returns 임베딩 벡터 배열
   */
  async embedBatch(texts) {
    const embeddings = [];
    for (const text of texts) {
      const embedding = await this.embed(text);
      embeddings.push(embedding);
    }
    return embeddings;
  }
  /**
   * 캐시를 초기화합니다
   */
  clearCache() {
    this.cache.clear();
  }
};

// src/topicSeparation/topicSeparationEngine.ts
init_logging();
var TopicSeparationEngine = class {
  constructor(config) {
    var _a, _b, _c, _d, _e, _f, _g;
    this.config = {
      ...config,
      similarityThreshold: (_a = config.similarityThreshold) != null ? _a : 0.75,
      minSegmentLength: (_b = config.minSegmentLength) != null ? _b : 2,
      windowSize: (_c = config.windowSize) != null ? _c : 2,
      enableKeywordMetadata: (_d = config.enableKeywordMetadata) != null ? _d : true,
      enableEmbeddingLogging: (_e = config.enableEmbeddingLogging) != null ? _e : false
    };
    this.embeddingGenerator = new EmbeddingGenerator(
      config.apiKey,
      (_f = config.embeddingModel) != null ? _f : "embedding-001",
      config.app,
      config.manifest,
      (_g = config.enableEmbeddingLogging) != null ? _g : false
    );
  }
  /**
   * 대화를 주제별로 분리합니다
   * @param turns 대화 턴 배열
   * @returns 주제 분리 결과
   */
  async separateTopics(turns) {
    try {
      if (turns.length === 0) {
        return {
          segments: [],
          boundaries: [],
          links: []
        };
      }
      const turnTexts = this.prepareTurnTexts(turns);
      console.log("\uC784\uBCA0\uB529 \uC0DD\uC131 \uC911...");
      let embeddings;
      try {
        embeddings = await this.embeddingGenerator.embedBatch(turnTexts);
      } catch (error) {
        const msg = `\uC784\uBCA0\uB529 \uC0DD\uC131 \uC2E4\uD328: ${error instanceof Error ? error.message : String(error)}`;
        if (this.config.app) {
          await appendTopicSeparationFailureLog(this.config.app, this.config.manifest, msg, error);
        }
        throw new Error(msg);
      }
      console.log("\uC720\uC0AC\uB3C4 \uACC4\uC0B0 \uC911...");
      let similarities;
      try {
        similarities = this.calculateWindowSimilarities(embeddings);
      } catch (error) {
        const msg = `\uC720\uC0AC\uB3C4 \uACC4\uC0B0 \uC2E4\uD328: ${error instanceof Error ? error.message : String(error)}`;
        if (this.config.app) {
          await appendTopicSeparationFailureLog(this.config.app, this.config.manifest, msg, error);
        }
        throw new Error(msg);
      }
      console.log("\uC8FC\uC81C \uACBD\uACC4 \uD0D0\uC9C0 \uC911...");
      let boundaries;
      try {
        boundaries = this.detectTopicBoundaries(similarities);
      } catch (error) {
        const msg = `\uC8FC\uC81C \uACBD\uACC4 \uD0D0\uC9C0 \uC2E4\uD328: ${error instanceof Error ? error.message : String(error)}`;
        if (this.config.app) {
          await appendTopicSeparationFailureLog(this.config.app, this.config.manifest, msg, error);
        }
        throw new Error(msg);
      }
      console.log("\uC138\uADF8\uBA3C\uD2B8 \uC0DD\uC131 \uC911...");
      let segments;
      try {
        segments = this.createSegments(turns, boundaries, similarities);
      } catch (error) {
        const msg = `\uC138\uADF8\uBA3C\uD2B8 \uC0DD\uC131 \uC2E4\uD328: ${error instanceof Error ? error.message : String(error)}`;
        if (this.config.app) {
          await appendTopicSeparationFailureLog(this.config.app, this.config.manifest, msg, error);
        }
        throw new Error(msg);
      }
      console.log("\uC138\uADF8\uBA3C\uD2B8 \uB9C1\uD06C \uBD84\uC11D \uC911...");
      let links;
      try {
        links = this.analyzeSegmentLinks(segments);
      } catch (error) {
        const msg = `\uC138\uADF8\uBA3C\uD2B8 \uB9C1\uD06C \uBD84\uC11D \uC2E4\uD328: ${error instanceof Error ? error.message : String(error)}`;
        if (this.config.app) {
          await appendTopicSeparationFailureLog(this.config.app, this.config.manifest, msg, error);
        }
        throw new Error(msg);
      }
      return {
        segments,
        boundaries,
        links
      };
    } catch (error) {
      if (error instanceof Error && error.message.includes("\uC2E4\uD328:")) {
        throw error;
      }
      const msg = `\uC8FC\uC81C \uBD84\uB9AC \uC911 \uC608\uC0C1\uCE58 \uBABB\uD55C \uC624\uB958: ${error instanceof Error ? error.message : String(error)}`;
      if (this.config.app) {
        await appendTopicSeparationFailureLog(this.config.app, this.config.manifest, msg, error);
      }
      throw new Error(msg);
    }
  }
  /**
   * 텍스트의 마지막 N개 문장을 추출합니다
   */
  getLastNSentences(text, n = 3) {
    const sentences = text.split(/([.!?]+)/).filter((s) => s.trim().length > 0);
    const sentenceList = [];
    for (let i = 0; i < sentences.length; i += 2) {
      if (i + 1 < sentences.length) {
        sentenceList.push(sentences[i] + sentences[i + 1]);
      } else if (i < sentences.length) {
        sentenceList.push(sentences[i]);
      }
    }
    const lastSentences = sentenceList.slice(-n);
    return lastSentences.join(" ").trim();
  }
  /**
   * 턴 텍스트를 준비합니다 (사용자 지정 형식)
   * 임베딩 입력 = [현재 질문과 그 답변의 키워드] + 이전 assistant 마지막 2~3문장 + 현재 질문 + 현재 assistant 마지막 2~3문장
   */
  prepareTurnTexts(turns) {
    const result = [];
    for (let i = 0; i < turns.length; i++) {
      const turn = turns[i];
      let embeddingInput = "";
      if (turn.role === "user") {
        let combinedText = turn.content;
        let keywords = [];
        if (i + 1 < turns.length && turns[i + 1].role === "assistant") {
          const nextTurn = turns[i + 1];
          combinedText += " " + nextTurn.content;
          keywords = extractKeywords(combinedText);
        } else {
          keywords = extractKeywords(turn.content);
        }
        let previousAssistantOverlap = "";
        for (let j = i - 1; j >= 0; j--) {
          if (turns[j].role === "assistant") {
            previousAssistantOverlap = this.getLastNSentences(turns[j].content, 3);
            break;
          }
        }
        const currentQuestion = turn.content;
        let currentAssistantOverlap = "";
        if (i + 1 < turns.length && turns[i + 1].role === "assistant") {
          currentAssistantOverlap = this.getLastNSentences(turns[i + 1].content, 3);
        }
        const keywordStr = keywords.length > 0 ? `[\uD0A4\uC6CC\uB4DC: ${keywords.join(", ")}]` : "";
        embeddingInput = [
          keywordStr,
          previousAssistantOverlap,
          currentQuestion,
          currentAssistantOverlap
        ].filter((s) => s.length > 0).join(" ");
        result.push(embeddingInput);
        if (i + 1 < turns.length && turns[i + 1].role === "assistant") {
          i++;
        }
      } else if (turn.role === "assistant" && (i === 0 || turns[i - 1].role !== "user")) {
        const keywords = extractKeywords(turn.content);
        const lastSentences = this.getLastNSentences(turn.content, 3);
        const keywordStr = keywords.length > 0 ? `[\uD0A4\uC6CC\uB4DC: ${keywords.join(", ")}]` : "";
        embeddingInput = [keywordStr, lastSentences].filter((s) => s.length > 0).join(" ");
        result.push(embeddingInput);
      }
    }
    return result.length > 0 ? result : turns.map((t) => t.content);
  }
  /**
   * 슬라이딩 윈도우 방식으로 유사도를 계산합니다
   */
  calculateWindowSimilarities(embeddings) {
    const similarities = [];
    const windowSize = this.config.windowSize;
    for (let i = 0; i < embeddings.length - 1; i++) {
      const currentWindow = this.combineEmbeddings(
        embeddings.slice(Math.max(0, i - windowSize + 1), i + 1)
      );
      const nextWindow = embeddings[i + 1];
      const similarity = cosineSimilarity(currentWindow, nextWindow);
      similarities.push(similarity);
    }
    return similarities;
  }
  /**
   * 여러 임베딩을 평균하여 하나로 결합합니다
   */
  combineEmbeddings(embeddings) {
    if (embeddings.length === 0) {
      throw new Error("\uC784\uBCA0\uB529 \uBC30\uC5F4\uC774 \uBE44\uC5B4\uC788\uC2B5\uB2C8\uB2E4");
    }
    if (embeddings.length === 1) {
      return embeddings[0];
    }
    const dim = embeddings[0].length;
    const combined = new Array(dim).fill(0);
    for (const embedding of embeddings) {
      for (let i = 0; i < dim; i++) {
        combined[i] += embedding[i];
      }
    }
    for (let i = 0; i < dim; i++) {
      combined[i] /= embeddings.length;
    }
    return combined;
  }
  /**
   * 주제 경계를 탐지합니다
   */
  detectTopicBoundaries(similarities) {
    const boundaries = [];
    const threshold = this.config.similarityThreshold;
    for (let i = 0; i < similarities.length; i++) {
      const similarity = similarities[i];
      const isPrimaryBoundary = similarity < threshold;
      if (i > 0) {
        const prevSimilarity = similarities[i - 1];
        const drop = prevSimilarity - similarity;
        if (drop > 0.15) {
          boundaries.push({
            index: i + 1,
            // 다음 턴부터 새로운 주제
            similarity,
            isPrimaryBoundary: true
          });
          continue;
        }
      }
      if (isPrimaryBoundary) {
        boundaries.push({
          index: i + 1,
          similarity,
          isPrimaryBoundary: true
        });
      }
    }
    return boundaries;
  }
  /**
   * 세그먼트를 생성합니다
   */
  createSegments(turns, boundaries, similarities) {
    const segments = [];
    const boundaryIndices = boundaries.map((b) => b.index).sort((a, b) => a - b);
    const minSegmentLength = this.config.minSegmentLength;
    let startIndex = 0;
    for (const endIndex of boundaryIndices) {
      if (endIndex - startIndex >= minSegmentLength) {
        const segmentTurns = turns.slice(startIndex, endIndex);
        const keywords = this.extractSegmentKeywords(segmentTurns);
        const avgSimilarity = this.calculateAverageSimilarity(similarities, startIndex, endIndex);
        segments.push({
          startIndex,
          endIndex,
          turns: segmentTurns,
          keywords,
          avgSimilarity
        });
      }
      startIndex = endIndex;
    }
    if (startIndex < turns.length) {
      const segmentTurns = turns.slice(startIndex);
      const keywords = this.extractSegmentKeywords(segmentTurns);
      const avgSimilarity = this.calculateAverageSimilarity(similarities, startIndex, turns.length);
      segments.push({
        startIndex,
        endIndex: turns.length,
        turns: segmentTurns,
        keywords,
        avgSimilarity
      });
    }
    return segments;
  }
  /**
   * 세그먼트의 키워드를 추출합니다
   */
  extractSegmentKeywords(turns) {
    const allText = turns.map((t) => t.content).join(" ");
    return extractKeywords(allText);
  }
  /**
   * 구간의 평균 유사도를 계산합니다
   */
  calculateAverageSimilarity(similarities, start, end) {
    if (start >= end - 1) {
      return 1;
    }
    const relevantSimilarities = similarities.slice(start, Math.min(end - 1, similarities.length));
    if (relevantSimilarities.length === 0) {
      return 1;
    }
    const sum = relevantSimilarities.reduce((acc, val) => acc + val, 0);
    return sum / relevantSimilarities.length;
  }
  /**
   * 세그먼트 간 링크를 분석합니다
   */
  analyzeSegmentLinks(segments) {
    const links = [];
    for (let i = 0; i < segments.length; i++) {
      for (let j = i + 1; j < segments.length; j++) {
        const segmentA = segments[i];
        const segmentB = segments[j];
        const commonKeywords = segmentA.keywords.filter((k) => segmentB.keywords.includes(k));
        if (commonKeywords.length > 0) {
          const unionSize = (/* @__PURE__ */ new Set([...segmentA.keywords, ...segmentB.keywords])).size;
          const relevanceScore = commonKeywords.length / unionSize;
          if (relevanceScore > 0.1) {
            links.push({
              fromSegment: i,
              toSegment: j,
              commonKeywords,
              relevanceScore
            });
          }
        }
      }
    }
    return links;
  }
  /**
   * 캐시를 초기화합니다
   */
  clearCache() {
    this.embeddingGenerator.clearCache();
  }
};

// src/topicSeparation/multiNoteSaver.ts
var import_obsidian6 = require("obsidian");
async function saveSegmentsAsNotes(vault, segments, links, baseTitle, outputFolder, app, manifest) {
  const notePaths = [];
  const cleanedFolder = outputFolder ? (0, import_obsidian6.normalizePath)(outputFolder).replace(/^\/+/, "") : "";
  if (cleanedFolder) {
    await ensureFolderExists2(vault, cleanedFolder);
  }
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    const segmentTitle = await generateSegmentTitle(segment, baseTitle, i + 1);
    const markdown = generateSegmentMarkdown(segment, i, segments.length, links, notePaths);
    const filename = sanitizeFilename(segmentTitle) + ".md";
    const targetPath = await ensureUniquePath2(
      vault,
      (0, import_obsidian6.normalizePath)(cleanedFolder ? `${cleanedFolder}/${filename}` : filename)
    );
    await vault.create(targetPath, markdown);
    notePaths.push(targetPath);
  }
  const mainNotePath = await createMainIndexNote(vault, segments, notePaths, baseTitle, cleanedFolder);
  return {
    notePaths,
    mainNotePath
  };
}
async function generateSegmentTitle(segment, baseTitle, segmentNumber) {
  const topKeywords = segment.keywords.slice(0, 3).join(", ");
  if (topKeywords) {
    return `${baseTitle} - ${segmentNumber}. ${topKeywords}`;
  } else {
    return `${baseTitle} - \uC8FC\uC81C ${segmentNumber}`;
  }
}
function generateSegmentMarkdown(segment, segmentIndex, totalSegments, links, notePaths) {
  var _a;
  const lines = [];
  lines.push("---");
  lines.push(`segment: ${segmentIndex + 1}/${totalSegments}`);
  lines.push(`keywords: [${segment.keywords.join(", ")}]`);
  lines.push(`avgSimilarity: ${segment.avgSimilarity.toFixed(3)}`);
  lines.push("---");
  lines.push("");
  lines.push(`# \uC8FC\uC81C ${segmentIndex + 1}`);
  lines.push("");
  if (segment.keywords.length > 0) {
    lines.push("## \uC8FC\uC694 \uD0A4\uC6CC\uB4DC");
    lines.push("");
    lines.push(segment.keywords.map((k) => `- ${k}`).join("\n"));
    lines.push("");
  }
  const relatedLinks = links.filter(
    (link) => link.fromSegment === segmentIndex || link.toSegment === segmentIndex
  );
  if (relatedLinks.length > 0) {
    lines.push("## \uC5F0\uAD00 \uC8FC\uC81C");
    lines.push("");
    for (const link of relatedLinks) {
      const targetIndex = link.fromSegment === segmentIndex ? link.toSegment : link.fromSegment;
      if (notePaths[targetIndex]) {
        const targetPath = notePaths[targetIndex];
        const targetName = ((_a = targetPath.split("/").pop()) == null ? void 0 : _a.replace(".md", "")) || `\uC8FC\uC81C ${targetIndex + 1}`;
        const commonKeywordsText = link.commonKeywords.slice(0, 3).join(", ");
        lines.push(`- [[${targetPath.replace(".md", "")}|${targetName}]] (${commonKeywordsText})`);
      }
    }
    lines.push("");
  }
  lines.push("## \uB300\uD654 \uB0B4\uC6A9");
  lines.push("");
  for (const turn of segment.turns) {
    const roleEmoji = turn.role === "user" ? "\u{1F464}" : "\u{1F916}";
    const roleLabel = turn.role === "user" ? "\uC0AC\uC6A9\uC790" : "\uC5B4\uC2DC\uC2A4\uD134\uD2B8";
    lines.push(`### ${roleEmoji} ${roleLabel}`);
    if (turn.timestamp) {
      const timestamp = typeof turn.timestamp === "string" ? turn.timestamp : turn.timestamp.toISOString();
      lines.push(`*${timestamp}*`);
      lines.push("");
    }
    lines.push(turn.content);
    lines.push("");
  }
  return lines.join("\n");
}
async function createMainIndexNote(vault, segments, notePaths, baseTitle, folder) {
  var _a;
  const lines = [];
  lines.push(`# ${baseTitle} - \uC804\uCCB4 \uC778\uB371\uC2A4`);
  lines.push("");
  lines.push("---");
  lines.push(`totalSegments: ${segments.length}`);
  lines.push(`createdAt: ${(/* @__PURE__ */ new Date()).toISOString()}`);
  lines.push("---");
  lines.push("");
  lines.push("## \uAC1C\uC694");
  lines.push("");
  lines.push(`\uC774 \uB300\uD654\uB294 ${segments.length}\uAC1C\uC758 \uC8FC\uC81C\uB85C \uBD84\uB9AC\uB418\uC5C8\uC2B5\uB2C8\uB2E4.`);
  lines.push("");
  lines.push("## \uC8FC\uC81C \uBAA9\uB85D");
  lines.push("");
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    const notePath = notePaths[i];
    const noteName = ((_a = notePath.split("/").pop()) == null ? void 0 : _a.replace(".md", "")) || `\uC8FC\uC81C ${i + 1}`;
    const keywords = segment.keywords.slice(0, 3).join(", ");
    lines.push(`### ${i + 1}. [[${notePath.replace(".md", "")}|${noteName}]]`);
    lines.push("");
    lines.push(`**\uD0A4\uC6CC\uB4DC**: ${keywords}`);
    lines.push(`**\uD134 \uC218**: ${segment.turns.length}`);
    lines.push(`**\uC720\uC0AC\uB3C4**: ${(segment.avgSimilarity * 100).toFixed(1)}%`);
    lines.push("");
  }
  const markdown = lines.join("\n");
  const filename = sanitizeFilename(baseTitle) + "-\uC778\uB371\uC2A4.md";
  const targetPath = await ensureUniquePath2(
    vault,
    (0, import_obsidian6.normalizePath)(folder ? `${folder}/${filename}` : filename)
  );
  await vault.create(targetPath, markdown);
  return targetPath;
}
function sanitizeFilename(value) {
  const trimmed = value.trim();
  if (!trimmed) {
    return "untitled";
  }
  const cleaned = trimmed.replace(/[\\/:*?"<>|]/g, " ").replace(/\s+/g, " ").trim();
  return cleaned || "untitled";
}
async function ensureFolderExists2(vault, folder) {
  const exists = await vault.adapter.exists(folder);
  if (!exists) {
    await vault.createFolder(folder);
  }
}
async function ensureUniquePath2(vault, path) {
  const normalized = (0, import_obsidian6.normalizePath)(path);
  const extensionIndex = normalized.lastIndexOf(".md");
  const base = extensionIndex === -1 ? normalized : normalized.slice(0, extensionIndex);
  const extension = extensionIndex === -1 ? "" : ".md";
  let candidate = normalized;
  let count = 1;
  while (await vault.adapter.exists(candidate)) {
    candidate = `${base}-${count}${extension}`;
    count += 1;
  }
  return candidate;
}

// src/views/chatView.ts
var VIEW_TYPE_OVL_CHAT = "ovl-chat-view";
var ChatView = class extends import_obsidian7.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.messages = [];
    this.messagesEl = null;
    this.inputEl = null;
    this.sendButtonEl = null;
    this.vaultSearchButtonEl = null;
    this.saveButtonEl = null;
    this.sessionIdEl = null;
    this.plugin = plugin;
  }
  getViewType() {
    return VIEW_TYPE_OVL_CHAT;
  }
  getDisplayText() {
    return "OVL \uB300\uD654";
  }
  getIcon() {
    return "message-circle";
  }
  async onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("ovl-chat-view");
    const headerEl = contentEl.createEl("div", { cls: "ovl-chat-header" });
    headerEl.createEl("div", { cls: "ovl-chat-title", text: "OVL \uB300\uD654" });
    const sessionWrapEl = headerEl.createEl("div", { cls: "ovl-chat-session" });
    sessionWrapEl.createEl("span", { text: "\uC81C\uBAA9" });
    const sessionInputEl = sessionWrapEl.createEl("input", { type: "text" });
    sessionInputEl.value = this.buildSessionId();
    this.sessionIdEl = sessionInputEl;
    const controlsEl = headerEl.createEl("div", { cls: "ovl-chat-controls" });
    const saveButtonEl = controlsEl.createEl("button", { text: "\uC800\uC7A5", cls: "ovl-chat-button" });
    saveButtonEl.addEventListener("click", () => {
      void this.handleSave();
    });
    this.saveButtonEl = saveButtonEl;
    const messagesEl = contentEl.createEl("div", { cls: "ovl-chat-messages" });
    this.messagesEl = messagesEl;
    const inputWrapEl = contentEl.createEl("div", { cls: "ovl-chat-input" });
    const textareaEl = inputWrapEl.createEl("textarea");
    textareaEl.placeholder = "\uBA54\uC2DC\uC9C0\uB97C \uC785\uB825\uD558\uC138\uC694. (Ctrl+Enter \uC804\uC1A1)";
    this.inputEl = textareaEl;
    const buttonsEl = inputWrapEl.createEl("div", { cls: "ovl-chat-input-buttons" });
    const vaultSearchButtonEl = buttonsEl.createEl("button", { text: "\uBCFC\uD2B8 \uAC80\uC0C9 \uB2F5\uBCC0", cls: "ovl-chat-button" });
    vaultSearchButtonEl.addEventListener("click", () => {
      void this.handleVaultSearch();
    });
    this.vaultSearchButtonEl = vaultSearchButtonEl;
    const sendButtonEl = buttonsEl.createEl("button", { text: "\uC804\uC1A1", cls: "ovl-chat-button" });
    sendButtonEl.addEventListener("click", () => {
      void this.handleSend();
    });
    this.sendButtonEl = sendButtonEl;
    textareaEl.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        void this.handleSend();
      }
    });
  }
  buildSessionId() {
    const stamp = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
    return `session-${stamp}`;
  }
  setBusyState(state) {
    var _a, _b;
    const sendLoading = (_a = state.sendLoading) != null ? _a : false;
    const saveLoading = (_b = state.saveLoading) != null ? _b : false;
    if (this.sendButtonEl) {
      this.sendButtonEl.disabled = state.isBusy;
      this.sendButtonEl.classList.toggle("is-loading", sendLoading);
    }
    if (this.vaultSearchButtonEl) {
      this.vaultSearchButtonEl.disabled = state.isBusy;
    }
    if (this.saveButtonEl) {
      this.saveButtonEl.disabled = state.isBusy;
      this.saveButtonEl.classList.toggle("is-loading", saveLoading);
    }
    if (this.inputEl) {
      this.inputEl.disabled = state.isBusy;
    }
    if (state.isBusy) {
      this.contentEl.addClass("ovl-chat-busy");
    } else {
      this.contentEl.removeClass("ovl-chat-busy");
    }
  }
  async appendMessage(turn) {
    this.messages.push(turn);
    if (!this.messagesEl) {
      return;
    }
    const messageEl = this.messagesEl.createEl("div", {
      cls: `ovl-chat-message ovl-chat-${turn.role}`
    });
    messageEl.createEl("div", {
      cls: "ovl-chat-role",
      text: this.getRoleLabel(turn.role)
    });
    const contentEl = messageEl.createEl("div", {
      cls: "ovl-chat-content markdown-preview-view markdown-rendered"
    });
    try {
      await import_obsidian7.MarkdownRenderer.renderMarkdown(turn.content, contentEl, "", this);
    } catch (error) {
      const fallback = error instanceof Error ? error.message : String(error);
      contentEl.setText(`\uB80C\uB354\uB9C1 \uC2E4\uD328: ${fallback}`);
    }
    if (turn.timestamp) {
      const timestamp = typeof turn.timestamp === "string" ? turn.timestamp : turn.timestamp.toISOString();
      messageEl.createEl("div", {
        cls: "ovl-chat-timestamp",
        text: timestamp
      });
    }
    this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
  }
  getRoleLabel(role) {
    if (role === "user") {
      return "\uC0AC\uC6A9\uC790";
    }
    if (role === "assistant") {
      return "\uC5B4\uC2DC\uC2A4\uD134\uD2B8";
    }
    return "\uC2DC\uC2A4\uD15C";
  }
  async handleSend() {
    const input = await this.prepareUserInput();
    if (input === null) {
      return;
    }
    this.setBusyState({ isBusy: true, sendLoading: true });
    try {
      const reply = await this.plugin.requestAssistantReply(this.messages);
      await this.appendMessage({
        role: "assistant",
        content: reply,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      new import_obsidian7.Notice(`\uB300\uD654 \uC2E4\uD328: ${message}`);
    } finally {
      this.setBusyState({ isBusy: false });
    }
  }
  buildContext(searchResults) {
    if (searchResults.length === 0) {
      return "";
    }
    let context = "\uB2E4\uC74C\uC740 \uAC80\uC0C9\uB41C \uAD00\uB828 \uBB38\uC11C\uB4E4\uC785\uB2C8\uB2E4:\n\n";
    for (let i = 0; i < searchResults.length; i++) {
      const result = searchResults[i];
      const { chunk, note, score } = result;
      context += `## \uBB38\uC11C ${i + 1}: ${note.title}
`;
      context += `- \uD30C\uC77C: ${note.path}
`;
      context += `- \uC139\uC158: ${chunk.section || "\uBCF8\uBB38"}
`;
      context += `- \uC720\uC0AC\uB3C4: ${(score * 100).toFixed(1)}%

`;
      context += `${chunk.text}

`;
      context += "---\n\n";
    }
    return context;
  }
  async handleVaultSearch() {
    const input = await this.prepareUserInput();
    if (input === null) {
      return;
    }
    this.setBusyState({ isBusy: true, sendLoading: true });
    try {
      let reply;
      if (this.plugin.settings.indexingEnabled) {
        try {
          const searchResults = await this.plugin.search(input);
          if (searchResults.length > 0) {
            const context = this.buildContext(searchResults);
            const enhancedMessages = this.buildEnhancedMessages(input, context);
            reply = await this.plugin.requestAssistantReply(enhancedMessages);
          } else {
            new import_obsidian7.Notice("\uC720\uC0AC\uD55C \uB178\uD2B8\uB97C \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4. \uC77C\uBC18 \uBAA8\uB4DC\uB85C \uB2F5\uBCC0\uD569\uB2C8\uB2E4.");
            reply = await this.plugin.requestAssistantReply(this.messages);
          }
        } catch (error) {
          console.error("RAG \uAC80\uC0C9 \uC2E4\uD328:", error);
          new import_obsidian7.Notice("\uAC80\uC0C9\uC5D0 \uC2E4\uD328\uD558\uC5EC \uC77C\uBC18 \uBAA8\uB4DC\uB85C \uC804\uD658\uD569\uB2C8\uB2E4");
          reply = await this.plugin.requestAssistantReply(this.messages);
        }
      } else {
        reply = await this.plugin.requestAssistantReply(this.messages);
      }
      await this.appendMessage({
        role: "assistant",
        content: reply,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      new import_obsidian7.Notice(`\uB300\uD654 \uC2E4\uD328: ${message}`);
    } finally {
      this.setBusyState({ isBusy: false });
    }
  }
  async prepareUserInput() {
    var _a, _b;
    const input = (_b = (_a = this.inputEl) == null ? void 0 : _a.value.trim()) != null ? _b : "";
    if (!input) {
      new import_obsidian7.Notice("\uBA54\uC2DC\uC9C0\uB97C \uC785\uB825\uD574 \uC8FC\uC138\uC694.");
      return null;
    }
    const isFirstQuestion = this.messages.length === 0;
    await this.appendMessage({
      role: "user",
      content: input,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    if (this.inputEl) {
      this.inputEl.value = "";
    }
    if (isFirstQuestion) {
      void this.generateSessionTitleFromQuestion(input);
    }
    return input;
  }
  formatSearchResults(searchResults) {
    if (searchResults.length === 0) {
      return "\uAC80\uC0C9 \uACB0\uACFC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.";
    }
    let output = "# \uAC80\uC0C9 \uACB0\uACFC\n\n";
    for (let i = 0; i < searchResults.length; i++) {
      const result = searchResults[i];
      const { chunk, note, score } = result;
      output += `## ${i + 1}. ${note.title}

`;
      output += `**\uD30C\uC77C**: [[${note.path}]]
`;
      output += `**\uC139\uC158**: ${chunk.section || "\uBCF8\uBB38"}
`;
      output += `**\uC720\uC0AC\uB3C4**: ${(score * 100).toFixed(1)}%

`;
      output += `> ${chunk.text.substring(0, 200)}${chunk.text.length > 200 ? "..." : ""}

`;
    }
    return output;
  }
  buildEnhancedMessages(query, context) {
    const systemPrompt = `\uB108\uB294 Obsidian \uBCFC\uD2B8\uC758 \uC804\uBB38 \uB9AC\uC11C\uCE58 \uC5B4\uC2DC\uC2A4\uD134\uD2B8\uB2E4. 
\uC81C\uACF5\uB41C \uBB38\uC11C\uB4E4\uC744 \uCC38\uACE0\uD558\uC5EC \uC0AC\uC6A9\uC790\uC758 \uC9C8\uBB38\uC5D0 \uB2F5\uBCC0\uD558\uB418, \uD56D\uC0C1 \uCD9C\uCC98\uB97C \uBA85\uC2DC\uD558\uB77C.
\uBAA8\uB974\uB294 \uB0B4\uC6A9\uC740 \uCD94\uCE21\uD558\uC9C0 \uB9D0\uACE0 \uC194\uC9C1\uD558\uAC8C \uBAA8\uB978\uB2E4\uACE0 \uB2F5\uBCC0\uD558\uB77C.

${context}`;
    return [
      { role: "system", content: systemPrompt, timestamp: (/* @__PURE__ */ new Date()).toISOString() },
      ...this.messages
    ];
  }
  async handleSave() {
    var _a, _b;
    if (this.messages.length === 0) {
      new import_obsidian7.Notice("\uC800\uC7A5\uD560 \uB300\uD654\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.");
      return;
    }
    this.setBusyState({ isBusy: true, saveLoading: true });
    try {
      const conversationTitle = await this.generateTitleForSave();
      const sessionId = (_b = (_a = this.sessionIdEl) == null ? void 0 : _a.value.trim()) != null ? _b : "";
      const finalSessionId = conversationTitle || sessionId;
      if (!finalSessionId) {
        new import_obsidian7.Notice("\uC81C\uBAA9\uC744 \uC785\uB825\uD574 \uC8FC\uC138\uC694.");
        return;
      }
      if (conversationTitle && this.sessionIdEl) {
        this.sessionIdEl.value = conversationTitle;
      }
      const enableTopicSeparation = this.messages.length >= 4 && this.plugin.settings.apiKey;
      if (enableTopicSeparation) {
        new import_obsidian7.Notice("\uB300\uD654\uB97C \uC8FC\uC81C\uBCC4\uB85C \uBD84\uC11D\uD558\uB294 \uC911...");
        try {
          const engine = new TopicSeparationEngine({
            apiKey: this.plugin.settings.embeddingApiKey || this.plugin.settings.apiKey,
            embeddingModel: this.plugin.settings.embeddingModel,
            similarityThreshold: 0.75,
            minSegmentLength: 2,
            windowSize: 2,
            enableKeywordMetadata: true,
            app: this.app,
            manifest: this.plugin.manifest,
            enableEmbeddingLogging: true
          });
          const result = await engine.separateTopics(this.messages);
          console.log(`\uC8FC\uC81C \uBD84\uB9AC \uC644\uB8CC: ${result.segments.length}\uAC1C \uC138\uADF8\uBA3C\uD2B8 \uAC10\uC9C0`);
          if (result.segments.length > 1) {
            new import_obsidian7.Notice(`${result.segments.length}\uAC1C\uC758 \uC8FC\uC81C\uB85C \uBD84\uB9AC\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uC800\uC7A5 \uC911...`);
            const multiNoteResult = await saveSegmentsAsNotes(
              this.app.vault,
              result.segments,
              result.links,
              finalSessionId,
              this.plugin.settings.defaultOutputFolder,
              this.app,
              this.plugin.manifest
            );
            new import_obsidian7.Notice(
              `\uC8FC\uC81C\uBCC4\uB85C \uBD84\uB9AC\uD558\uC5EC \uC800\uC7A5 \uC644\uB8CC!
- \uC8FC\uC81C \uB178\uD2B8: ${multiNoteResult.notePaths.length}\uAC1C
- \uC778\uB371\uC2A4: ${multiNoteResult.mainNotePath}`
            );
            engine.clearCache();
            this.resetSession();
            return;
          } else {
            console.log("\uB2E8\uC77C \uC8FC\uC81C\uB85C \uD310\uB2E8\uB418\uC5B4 \uC77C\uBC18 \uC800\uC7A5 \uC218\uD589");
          }
          engine.clearCache();
        } catch (error) {
          console.error("\uC8FC\uC81C \uBD84\uB9AC \uC2E4\uD328, \uC77C\uBC18 \uC800\uC7A5\uC73C\uB85C \uC804\uD658:", error);
          new import_obsidian7.Notice("\uC8FC\uC81C \uBD84\uB9AC \uC2E4\uD328. \uC77C\uBC18 \uBC29\uC2DD\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4.");
        }
      }
      const summaryPrompt = this.buildWikiSummaryPrompt(this.messages);
      let summary = await this.plugin.requestAssistantReply([
        {
          role: "user",
          content: summaryPrompt,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        }
      ]);
      summary = this.cleanSummary(summary);
      const targetPath = await this.plugin.saveConversationFromTurns(
        finalSessionId,
        [
          {
            role: "assistant",
            content: summary,
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        this.plugin.settings.defaultOutputFolder
      );
      new import_obsidian7.Notice(`\uC704\uD0A4 \uC694\uC57D \uC800\uC7A5 \uC644\uB8CC: ${targetPath}`);
      this.resetSession();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      new import_obsidian7.Notice(`\uC800\uC7A5 \uC2E4\uD328: ${message}`);
    } finally {
      this.setBusyState({ isBusy: false });
    }
  }
  resetSession() {
    this.messages = [];
    if (this.messagesEl) {
      this.messagesEl.empty();
    }
    if (this.inputEl) {
      this.inputEl.value = "";
    }
    if (this.sessionIdEl) {
      this.sessionIdEl.value = this.buildSessionId();
    }
  }
  buildWikiSummaryPrompt(turns) {
    const transcript = turns.map((turn) => {
      const roleLabel = turn.role === "user" ? "\uC0AC\uC6A9\uC790" : turn.role === "assistant" ? "\uC5B4\uC2DC\uC2A4\uD134\uD2B8" : "\uC2DC\uC2A4\uD15C";
      return `[${roleLabel}] ${turn.content}`;
    }).join("\n\n");
    return `\uB2E4\uC74C \uB300\uD654\uB97C \uC704\uD0A4 \uD615\uC2DD\uC758 \uB9C8\uD06C\uB2E4\uC6B4 \uBCF8\uBB38\uC73C\uB85C \uC815\uB9AC\uD574 \uC8FC\uC138\uC694.

\uCD9C\uB825 \uD615\uC2DD(\uBCF8\uBB38\uB9CC):
# \uC81C\uBAA9
## \uC694\uC57D
## \uD575\uC2EC \uC8FC\uC81C
## \uACB0\uC815 \uC0AC\uD56D
## \uC561\uC158 \uC544\uC774\uD15C
## \uC5F4\uB9B0 \uC9C8\uBB38

\uC694\uAD6C\uC0AC\uD56D:
- \uC704 \uD615\uC2DD\uC744 \uC9C0\uCF1C\uC11C \uAD6C\uC870\uC801\uC73C\uB85C \uC791\uC131
- \uAC00\uB2A5\uD55C \uACBD\uC6B0 \uBAA9\uB85D\uACFC \uD45C \uC0AC\uC6A9
- \uD55C\uAD6D\uC5B4\uB85C \uC791\uC131
- "\uC5B4\uC2DC\uC2A4\uD134\uD2B8"/\uD0C0\uC784\uC2A4\uD0EC\uD504/\uC11C\uBB38/\uC124\uBA85/\uC0AC\uC871 \uC5C6\uC774 \uBCF8\uBB38\uB9CC \uCD9C\uB825

\uB300\uD654 \uAE30\uB85D:
${transcript}`;
  }
  cleanSummary(summary) {
    const lines = summary.split("\n");
    const cleaned = [];
    let index = 0;
    while (index < lines.length) {
      const line = lines[index].trim();
      if (line.startsWith("## \u{1F916}") || line.startsWith("## \uC5B4\uC2DC\uC2A4\uD134\uD2B8")) {
        index += 1;
        while (index < lines.length && lines[index].trim().startsWith("*")) {
          index += 1;
        }
        while (index < lines.length && lines[index].trim() === "") {
          index += 1;
        }
        continue;
      }
      if (line.startsWith("\uB2E4\uC74C\uC740 ") && line.includes("\uC694\uC57D")) {
        index += 1;
        while (index < lines.length && lines[index].trim() === "") {
          index += 1;
        }
        continue;
      }
      cleaned.push(lines[index]);
      index += 1;
    }
    return cleaned.join("\n").trim();
  }
  async generateSessionTitleFromQuestion(question) {
    if (!this.sessionIdEl) {
      return;
    }
    const prompt = `\uB2E4\uC74C \uC9C8\uBB38\uC744 \uBCF4\uACE0 \uC138\uC158 \uC81C\uBAA9\uC744 \uB9CC\uB4E4\uC5B4 \uC8FC\uC138\uC694. \uC870\uAC74: 12~20\uC790 \uB0B4\uC678\uC758 \uAC04\uACB0\uD55C \uC81C\uBAA9, \uC774\uBAA8\uC9C0/\uB530\uC634\uD45C \uAE08\uC9C0, \uC81C\uBAA9\uB9CC \uCD9C\uB825.

\uC9C8\uBB38: ${question}`;
    try {
      const title = await this.plugin.requestTitleReply(prompt);
      const cleaned = this.cleanTitle(title);
      if (cleaned) {
        this.sessionIdEl.value = cleaned;
      }
    } catch (error) {
      console.error("\uC138\uC158 \uC81C\uBAA9 \uC0DD\uC131 \uC2E4\uD328:", error);
    }
  }
  async generateTitleForSave() {
    const transcript = this.messages.map((turn) => {
      const roleLabel = turn.role === "user" ? "\uC0AC\uC6A9\uC790" : turn.role === "assistant" ? "\uC5B4\uC2DC\uC2A4\uD134\uD2B8" : "\uC2DC\uC2A4\uD15C";
      return `[${roleLabel}] ${turn.content}`;
    }).join("\n\n");
    const prompt = `\uB2E4\uC74C \uB300\uD654 \uB0B4\uC6A9\uC744 \uBCF4\uACE0 \uBB38\uC7A5\uD615 \uC81C\uBAA9\uC744 \uB9CC\uB4E4\uC5B4 \uC8FC\uC138\uC694. \uC870\uAC74: 20~40\uC790 \uB0B4\uC678, \uC774\uBAA8\uC9C0/\uB530\uC634\uD45C \uAE08\uC9C0, \uC81C\uBAA9\uB9CC \uCD9C\uB825.

\uB300\uD654:
${transcript}`;
    try {
      const title = await this.plugin.requestTitleReply(prompt);
      return this.cleanTitle(title);
    } catch (error) {
      console.error("\uC800\uC7A5\uC6A9 \uC81C\uBAA9 \uC0DD\uC131 \uC2E4\uD328:", error);
      return "";
    }
  }
  cleanTitle(title) {
    return title.replace(/["'`]/g, "").replace(/\s+/g, " ").trim();
  }
};

// src/indexing/metadataStore.ts
var import_fs = require("fs");
var import_path = require("path");
var MetadataStore = class {
  constructor(storePath, indexSignature) {
    this.storePath = storePath;
    this.data = this.loadData(indexSignature);
  }
  /**
   * 저장소 데이터 로드
   */
  loadData(indexSignature) {
    if (!(0, import_fs.existsSync)(this.storePath)) {
      return {
        indexSignature,
        updatedAt: Date.now(),
        notes: {},
        chunks: {}
      };
    }
    try {
      const raw = (0, import_fs.readFileSync)(this.storePath, "utf-8");
      const parsed = JSON.parse(raw);
      return {
        indexSignature: parsed.indexSignature || indexSignature,
        updatedAt: typeof parsed.updatedAt === "number" ? parsed.updatedAt : Date.now(),
        notes: parsed.notes || {},
        chunks: parsed.chunks || {}
      };
    } catch (error) {
      console.warn("\uBA54\uD0C0\uB370\uC774\uD130 \uC800\uC7A5\uC18C \uB85C\uB4DC \uC2E4\uD328, \uC0C8\uB85C \uCD08\uAE30\uD654\uD569\uB2C8\uB2E4:", error);
      return {
        indexSignature,
        updatedAt: Date.now(),
        notes: {},
        chunks: {}
      };
    }
  }
  /**
   * 저장소 데이터 저장 (원자적 쓰기)
   */
  persist() {
    (0, import_fs.mkdirSync)((0, import_path.dirname)(this.storePath), { recursive: true });
    this.data.updatedAt = Date.now();
    const tempPath = `${this.storePath}.tmp`;
    (0, import_fs.writeFileSync)(tempPath, JSON.stringify(this.data), "utf-8");
    (0, import_fs.renameSync)(tempPath, this.storePath);
  }
  /**
   * 인덱스 시그니처 조회
   */
  getIndexSignature() {
    return this.data.indexSignature;
  }
  /**
   * 저장소 초기화
   */
  reset(indexSignature) {
    this.data = {
      indexSignature,
      updatedAt: Date.now(),
      notes: {},
      chunks: {}
    };
    this.persist();
  }
  /**
   * 노트 저장 또는 업데이트
   */
  upsertNote(note) {
    this.data.notes[note.id] = { ...note };
    this.persist();
  }
  /**
   * 경로로 노트 조회
   */
  getNoteByPath(path) {
    const note = Object.values(this.data.notes).find((item) => item.path === path);
    return note ? { ...note } : null;
  }
  /**
   * ID로 노트 조회
   */
  getNoteById(id) {
    const note = this.data.notes[id];
    return note ? { ...note } : null;
  }
  /**
   * 모든 노트 조회
   */
  getAllNotes() {
    return Object.values(this.data.notes).sort((a, b) => b.updatedAt - a.updatedAt).map((note) => ({ ...note }));
  }
  /**
   * 노트 삭제
   */
  deleteNote(id) {
    delete this.data.notes[id];
    this.persist();
  }
  /**
   * 청크 저장
   */
  insertChunks(chunks) {
    for (const chunk of chunks) {
      this.data.chunks[chunk.id] = { ...chunk };
    }
    this.persist();
  }
  /**
   * 노트의 청크 삭제
   */
  deleteChunksByNoteId(noteId) {
    for (const [chunkId, chunk] of Object.entries(this.data.chunks)) {
      if (chunk.noteId === noteId) {
        delete this.data.chunks[chunkId];
      }
    }
    this.persist();
  }
  /**
   * 노트의 청크 조회
   */
  getChunksByNoteId(noteId) {
    return Object.values(this.data.chunks).filter((chunk) => chunk.noteId === noteId).sort((a, b) => a.position - b.position).map((chunk) => ({ ...chunk }));
  }
  /**
   * ID로 청크 조회
   */
  getChunkById(id) {
    const chunk = this.data.chunks[id];
    return chunk ? { ...chunk } : null;
  }
  /**
   * 모든 청크 조회
   */
  getAllChunks() {
    return Object.values(this.data.chunks).map((chunk) => ({ ...chunk }));
  }
  /**
   * 데이터베이스 닫기
   */
  close() {
  }
};

// src/indexing/embeddings.ts
var import_obsidian8 = require("obsidian");
var EmbeddingGenerator2 = class {
  constructor(config) {
    this.pipeline = null;
    this.pipelineFactory = null;
    this.config = config;
  }
  /**
   * 임베딩 초기화
   */
  async initialize() {
    if (this.config.provider === "local") {
      if (this.pipeline) {
        return;
      }
      console.log(`\uB85C\uCEEC \uC784\uBCA0\uB529 \uBAA8\uB378 \uB85C\uB529 \uC911: ${this.config.model}`);
      console.log(`\uBAA8\uB378\uC740 HuggingFace\uC5D0\uC11C \uB2E4\uC6B4\uB85C\uB4DC\uB418\uC5B4 \uB85C\uCEEC\uC5D0 \uCE90\uC2DC\uB429\uB2C8\uB2E4.`);
      const pipelineFactory = await this.loadPipelineFactory();
      this.pipeline = await pipelineFactory("feature-extraction", this.config.model);
      console.log("\uC784\uBCA0\uB529 \uBAA8\uB378 \uB85C\uB529 \uC644\uB8CC");
    } else {
      console.log(`API \uAE30\uBC18 \uC784\uBCA0\uB529 \uC0AC\uC6A9: ${this.config.provider}`);
    }
  }
  /**
   * 텍스트를 임베딩 벡터로 변환
   */
  async embed(text) {
    if (this.config.provider === "local") {
      return this.embedLocal(text);
    } else if (this.config.provider === "gemini") {
      return this.embedGemini(text);
    } else if (this.config.provider === "openai") {
      return this.embedOpenAI(text);
    } else if (this.config.provider === "custom") {
      return this.embedCustom(text);
    }
    throw new Error(`\uC9C0\uC6D0\uD558\uC9C0 \uC54A\uB294 \uC784\uBCA0\uB529 \uC81C\uACF5\uC790: ${this.config.provider}`);
  }
  /**
   * 로컬 모델로 임베딩 생성
   */
  async embedLocal(text) {
    if (!this.pipeline) {
      await this.initialize();
    }
    if (!this.pipeline) {
      throw new Error("\uC784\uBCA0\uB529 \uD30C\uC774\uD504\uB77C\uC778 \uCD08\uAE30\uD654 \uC2E4\uD328");
    }
    const output = await this.pipeline(text, {
      pooling: "mean",
      normalize: true
    });
    return Array.from(output.data);
  }
  /**
   * 로컬 임베딩용 파이프라인 로더 (필요할 때만 로드)
   */
  async loadPipelineFactory() {
    if (this.pipelineFactory) {
      return this.pipelineFactory;
    }
    const module2 = await import("@xenova/transformers");
    this.pipelineFactory = module2.pipeline;
    return this.pipelineFactory;
  }
  /**
   * Gemini API로 임베딩 생성
   */
  async embedGemini(text) {
    var _a;
    if (!this.config.apiKey) {
      throw new Error("Gemini API \uD0A4\uAC00 \uC124\uC815\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4");
    }
    const url = `${this.config.apiUrl}/${this.config.model}:embedContent?key=${this.config.apiKey}`;
    try {
      const response = await (0, import_obsidian8.requestUrl)({
        url,
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          content: {
            parts: [{ text }]
          }
        })
      });
      const data = response.json;
      if ((_a = data.embedding) == null ? void 0 : _a.values) {
        return data.embedding.values;
      }
      throw new Error("Gemini API \uC751\uB2F5 \uD615\uC2DD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4");
    } catch (error) {
      console.error("Gemini \uC784\uBCA0\uB529 \uC0DD\uC131 \uC2E4\uD328:", error);
      throw error;
    }
  }
  /**
   * OpenAI API로 임베딩 생성
   */
  async embedOpenAI(text) {
    var _a, _b;
    if (!this.config.apiKey) {
      throw new Error("OpenAI API \uD0A4\uAC00 \uC124\uC815\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4");
    }
    try {
      const response = await (0, import_obsidian8.requestUrl)({
        url: this.config.apiUrl || "https://api.openai.com/v1/embeddings",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify({
          model: this.config.model,
          input: text
        })
      });
      const data = response.json;
      if ((_b = (_a = data.data) == null ? void 0 : _a[0]) == null ? void 0 : _b.embedding) {
        return data.data[0].embedding;
      }
      throw new Error("OpenAI API \uC751\uB2F5 \uD615\uC2DD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4");
    } catch (error) {
      console.error("OpenAI \uC784\uBCA0\uB529 \uC0DD\uC131 \uC2E4\uD328:", error);
      throw error;
    }
  }
  /**
   * 커스텀 API로 임베딩 생성
   */
  async embedCustom(text) {
    var _a, _b;
    if (!this.config.apiUrl) {
      throw new Error("\uCEE4\uC2A4\uD140 API URL\uC774 \uC124\uC815\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4");
    }
    try {
      const headers = {
        "Content-Type": "application/json"
      };
      if (this.config.apiKey) {
        headers["Authorization"] = `Bearer ${this.config.apiKey}`;
      }
      const response = await (0, import_obsidian8.requestUrl)({
        url: this.config.apiUrl,
        method: "POST",
        headers,
        body: JSON.stringify({
          model: this.config.model,
          input: text
        })
      });
      const data = response.json;
      if (!Array.isArray(data) && ((_b = (_a = data.data) == null ? void 0 : _a[0]) == null ? void 0 : _b.embedding)) {
        return data.data[0].embedding;
      }
      if (Array.isArray(data)) {
        return data;
      }
      throw new Error("\uCEE4\uC2A4\uD140 API \uC751\uB2F5 \uD615\uC2DD\uC744 \uD30C\uC2F1\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4");
    } catch (error) {
      console.error("\uCEE4\uC2A4\uD140 \uC784\uBCA0\uB529 \uC0DD\uC131 \uC2E4\uD328:", error);
      throw error;
    }
  }
  /**
   * 여러 텍스트를 배치로 임베딩 생성
   */
  async embedBatch(texts) {
    const embeddings = [];
    for (const text of texts) {
      const embedding = await this.embed(text);
      embeddings.push(embedding);
    }
    return embeddings;
  }
};

// src/indexing/parser.ts
var import_gray_matter = __toESM(require_gray_matter());
var import_crypto = require("crypto");
function parseMarkdown(filePath, content) {
  const parsed = (0, import_gray_matter.default)(content);
  const frontmatter = parsed.data;
  const bodyContent = parsed.content;
  const title = frontmatter.title || extractTitleFromPath(filePath);
  const tags = extractTags(bodyContent, frontmatter);
  const links = extractLinks(bodyContent);
  const sections = extractSections(bodyContent);
  return {
    content: bodyContent,
    frontmatter,
    tags,
    links,
    title,
    sections
  };
}
function extractTitleFromPath(filePath) {
  const fileName = filePath.split("/").pop() || "";
  return fileName.replace(/\.md$/, "");
}
function extractTags(content, frontmatter) {
  const tags = /* @__PURE__ */ new Set();
  if (Array.isArray(frontmatter.tags)) {
    frontmatter.tags.forEach((tag) => {
      if (typeof tag === "string") {
        tags.add(tag.replace(/^#/, ""));
      }
    });
  }
  const hashtagRegex = /#([a-zA-Z0-9가-힣_-]+)/g;
  let match;
  while ((match = hashtagRegex.exec(content)) !== null) {
    tags.add(match[1]);
  }
  return Array.from(tags);
}
function extractLinks(content) {
  const links = /* @__PURE__ */ new Set();
  const linkRegex = /\[\[([^\]]+)\]\]/g;
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const link = match[1].split("|")[0].trim();
    links.add(link);
  }
  return Array.from(links);
}
function extractSections(content) {
  const sections = [];
  const lines = content.split("\n");
  let currentSection = null;
  let currentContent = [];
  let position = 0;
  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headerMatch) {
      if (currentSection) {
        currentSection.content = currentContent.join("\n").trim();
        sections.push(currentSection);
      }
      currentSection = {
        heading: headerMatch[2].trim(),
        content: "",
        level: headerMatch[1].length,
        position
      };
      currentContent = [];
    } else if (currentSection) {
      currentContent.push(line);
    } else {
      if (sections.length === 0) {
        currentSection = {
          heading: "",
          content: "",
          level: 0,
          position
        };
      }
      currentContent.push(line);
    }
    position += line.length + 1;
  }
  if (currentSection) {
    currentSection.content = currentContent.join("\n").trim();
    sections.push(currentSection);
  }
  return sections;
}
function computeHash(content) {
  return (0, import_crypto.createHash)("sha256").update(content).digest("hex");
}

// src/indexing/chunker.ts
function estimateTokenCount(text) {
  const nonKoreanText = text.replace(/[가-힣]/g, " ");
  const words = nonKoreanText.split(/\s+/).filter((w) => w.length > 0).length;
  const koreanChars = (text.match(/[가-힣]/g) || []).length;
  return Math.ceil(words * 1.3 + koreanChars);
}
function chunkText(noteId, sections, options2 = {}) {
  const chunkSize = options2.chunkSize || 400;
  const chunkOverlap = options2.chunkOverlap || 50;
  const chunks = [];
  for (const section of sections) {
    const sectionText = section.heading ? `# ${section.heading}

${section.content}` : section.content;
    if (!sectionText.trim()) {
      continue;
    }
    const tokenCount = estimateTokenCount(sectionText);
    if (tokenCount <= chunkSize) {
      chunks.push({
        id: `${noteId}-chunk-${chunks.length}`,
        noteId,
        text: sectionText,
        position: section.position,
        tokenCount,
        section: section.heading
      });
      continue;
    }
    const sentences = splitIntoSentences(sectionText);
    let currentChunk = [];
    let currentTokens = 0;
    for (const sentence of sentences) {
      const sentenceTokens = estimateTokenCount(sentence);
      if (currentTokens + sentenceTokens <= chunkSize) {
        currentChunk.push(sentence);
        currentTokens += sentenceTokens;
      } else {
        if (currentChunk.length > 0) {
          const chunkText2 = currentChunk.join(" ");
          chunks.push({
            id: `${noteId}-chunk-${chunks.length}`,
            noteId,
            text: chunkText2,
            position: section.position,
            tokenCount: currentTokens,
            section: section.heading
          });
          const overlapSentences = getOverlapSentences(currentChunk, chunkOverlap);
          currentChunk = overlapSentences;
          currentTokens = estimateTokenCount(currentChunk.join(" "));
        }
        currentChunk.push(sentence);
        currentTokens += sentenceTokens;
      }
    }
    if (currentChunk.length > 0) {
      const chunkText2 = currentChunk.join(" ");
      chunks.push({
        id: `${noteId}-chunk-${chunks.length}`,
        noteId,
        text: chunkText2,
        position: section.position,
        tokenCount: currentTokens,
        section: section.heading
      });
    }
  }
  return chunks;
}
function splitIntoSentences(text) {
  const sentences = text.split(/([.!?]\s+)/).filter((s) => s.trim());
  const result = [];
  for (let i = 0; i < sentences.length; i += 2) {
    const sentence = sentences[i];
    const punctuation = sentences[i + 1] || "";
    result.push(sentence + punctuation);
  }
  return result.filter((s) => s.trim());
}
function getOverlapSentences(sentences, targetTokens) {
  const overlap = [];
  let tokens = 0;
  for (let i = sentences.length - 1; i >= 0; i--) {
    const sentence = sentences[i];
    const sentenceTokens = estimateTokenCount(sentence);
    if (tokens + sentenceTokens > targetTokens) {
      break;
    }
    overlap.unshift(sentence);
    tokens += sentenceTokens;
  }
  return overlap;
}

// src/indexing/indexer.ts
var import_crypto2 = require("crypto");

// src/indexing/vectorStore.ts
var import_fs2 = require("fs");
var import_path2 = require("path");
var VectorStore = class {
  constructor(storePath, indexSignature) {
    this.storePath = storePath;
    this.data = this.loadData(indexSignature);
  }
  /**
   * 저장소 데이터 로드
   */
  loadData(indexSignature) {
    if (!(0, import_fs2.existsSync)(this.storePath)) {
      return {
        indexSignature,
        dimension: null,
        updatedAt: Date.now(),
        embeddings: {}
      };
    }
    try {
      const raw = (0, import_fs2.readFileSync)(this.storePath, "utf-8");
      const parsed = JSON.parse(raw);
      return {
        indexSignature: parsed.indexSignature || indexSignature,
        dimension: typeof parsed.dimension === "number" ? parsed.dimension : null,
        updatedAt: typeof parsed.updatedAt === "number" ? parsed.updatedAt : Date.now(),
        embeddings: parsed.embeddings || {}
      };
    } catch (error) {
      console.warn("\uBCA1\uD130 \uC800\uC7A5\uC18C \uB85C\uB4DC \uC2E4\uD328, \uC0C8\uB85C \uCD08\uAE30\uD654\uD569\uB2C8\uB2E4:", error);
      return {
        indexSignature,
        dimension: null,
        updatedAt: Date.now(),
        embeddings: {}
      };
    }
  }
  /**
   * 저장소 데이터 저장 (원자적 쓰기)
   */
  persist() {
    (0, import_fs2.mkdirSync)((0, import_path2.dirname)(this.storePath), { recursive: true });
    this.data.updatedAt = Date.now();
    const tempPath = `${this.storePath}.tmp`;
    (0, import_fs2.writeFileSync)(tempPath, JSON.stringify(this.data), "utf-8");
    (0, import_fs2.renameSync)(tempPath, this.storePath);
  }
  /**
   * 인덱스 시그니처 조회
   */
  getIndexSignature() {
    return this.data.indexSignature;
  }
  /**
   * 벡터 차원 조회
   */
  getDimension() {
    return this.data.dimension;
  }
  /**
   * 저장소 초기화
   */
  reset(indexSignature) {
    this.data = {
      indexSignature,
      dimension: null,
      updatedAt: Date.now(),
      embeddings: {}
    };
    this.persist();
  }
  /**
   * 임베딩 저장
   */
  storeEmbedding(chunkId, embedding) {
    if (this.data.dimension === null) {
      this.data.dimension = embedding.length;
    }
    if (embedding.length !== this.data.dimension) {
      throw new Error(
        `\uC784\uBCA0\uB529 \uCC28\uC6D0 \uBD88\uC77C\uCE58: expected=${this.data.dimension}, actual=${embedding.length}`
      );
    }
    this.data.embeddings[chunkId] = embedding;
    this.persist();
  }
  /**
   * 여러 임베딩 일괄 저장
   */
  storeEmbeddings(embeddings) {
    for (const [chunkId, embedding] of embeddings.entries()) {
      if (this.data.dimension === null) {
        this.data.dimension = embedding.length;
      }
      if (embedding.length !== this.data.dimension) {
        throw new Error(
          `\uC784\uBCA0\uB529 \uCC28\uC6D0 \uBD88\uC77C\uCE58: expected=${this.data.dimension}, actual=${embedding.length}`
        );
      }
      this.data.embeddings[chunkId] = embedding;
    }
    this.persist();
  }
  /**
   * 임베딩 조회
   */
  getEmbedding(chunkId) {
    return this.data.embeddings[chunkId] || null;
  }
  /**
   * 모든 임베딩 조회
   */
  getAllEmbeddings() {
    const result = /* @__PURE__ */ new Map();
    for (const [chunkId, embedding] of Object.entries(this.data.embeddings)) {
      result.set(chunkId, embedding);
    }
    return result;
  }
  /**
   * 청크의 임베딩 삭제
   */
  deleteEmbedding(chunkId) {
    delete this.data.embeddings[chunkId];
    if (Object.keys(this.data.embeddings).length === 0) {
      this.data.dimension = null;
    }
    this.persist();
  }
  /**
   * 여러 청크의 임베딩 삭제
   */
  deleteEmbeddings(chunkIds) {
    if (chunkIds.length === 0) {
      return;
    }
    for (const chunkId of chunkIds) {
      delete this.data.embeddings[chunkId];
    }
    if (Object.keys(this.data.embeddings).length === 0) {
      this.data.dimension = null;
    }
    this.persist();
  }
  /**
   * 코사인 유사도 계산
   */
  cosineSimilarity(a, b) {
    if (a.length !== b.length) {
      throw new Error("\uBCA1\uD130 \uAE38\uC774\uAC00 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4");
    }
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }
  /**
   * 벡터 검색 - Top-K 유사 청크 찾기
   * 
   * 참고: 현재 구현은 모든 임베딩을 메모리에 로드하여 선형 검색을 수행합니다.
   * 대규모 볼트의 경우 성능이 저하될 수 있으며, 다음과 같은 개선이 권장됩니다:
   * - ANN(Approximate Nearest Neighbor) 알고리즘 사용 (FAISS, HNSW 등)
   * - 전용 벡터 데이터베이스 사용 (Chroma, Qdrant 등)
   * - 증분 검색 또는 인덱스 캐싱
   */
  search(queryEmbedding, k = 8) {
    const allEmbeddings = this.getAllEmbeddings();
    const scores = [];
    for (const [chunkId, embedding] of allEmbeddings.entries()) {
      const score = this.cosineSimilarity(queryEmbedding, embedding);
      scores.push({ chunkId, score });
    }
    scores.sort((a, b) => b.score - a.score);
    return scores.slice(0, k);
  }
  /**
   * 데이터베이스 닫기
   */
  close() {
  }
};

// src/indexing/vectorIndexFactory.ts
function createVectorIndex(config, indexSignature) {
  const engine = config.vectorIndexEngine || "json";
  if (engine === "json") {
    return new VectorStore(config.vectorStorePath, indexSignature);
  }
  throw new Error(`\uC544\uC9C1 \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uB294 \uBCA1\uD130 \uC778\uB371\uC2A4 \uC5D4\uC9C4\uC785\uB2C8\uB2E4: ${engine}`);
}

// src/indexing/indexer.ts
var Indexer = class {
  constructor(config) {
    this.config = config;
    this.indexSignature = this.generateIndexSignature();
    this.metadataStore = new MetadataStore(config.metaStorePath, this.indexSignature);
    this.vectorStore = createVectorIndex(config, this.indexSignature);
    const embeddingConfig = {
      provider: config.embeddingProvider,
      model: config.embeddingModel,
      apiKey: config.embeddingApiKey,
      apiUrl: config.embeddingApiUrl
    };
    this.embeddingGenerator = new EmbeddingGenerator2(embeddingConfig);
  }
  /**
   * 초기화 - 임베딩 모델 로드
   */
  async initialize() {
    await this.embeddingGenerator.initialize();
    const metadataSignature = this.metadataStore.getIndexSignature();
    const vectorSignature = this.vectorStore.getIndexSignature();
    if (metadataSignature !== this.indexSignature || vectorSignature !== this.indexSignature) {
      console.log("\uC784\uBCA0\uB529 \uBAA8\uB378 \uBCC0\uACBD \uAC10\uC9C0: \uAE30\uC874 \uC778\uB371\uC2A4\uB97C \uCD08\uAE30\uD654\uD569\uB2C8\uB2E4.");
      this.metadataStore.reset(this.indexSignature);
      this.vectorStore.reset(this.indexSignature);
    }
  }
  /**
   * 단일 파일 인덱싱
   */
  async indexFile(filePath, content) {
    try {
      const hash = computeHash(content);
      const existingNote = this.metadataStore.getNoteByPath(filePath);
      if (existingNote && existingNote.hash === hash) {
        console.log(`\uD30C\uC77C \uBCC0\uACBD \uC5C6\uC74C, \uC2A4\uD0B5: ${filePath}`);
        return;
      }
      const parsed = parseMarkdown(filePath, content);
      const noteId = this.generateNoteId(filePath);
      const noteMetadata = {
        id: noteId,
        path: filePath,
        title: parsed.title,
        tags: parsed.tags,
        links: parsed.links,
        frontmatter: parsed.frontmatter,
        updatedAt: Date.now(),
        hash
      };
      this.metadataStore.upsertNote(noteMetadata);
      if (existingNote) {
        const oldChunks = this.metadataStore.getChunksByNoteId(noteId);
        this.vectorStore.deleteEmbeddings(oldChunks.map((c) => c.id));
        this.metadataStore.deleteChunksByNoteId(noteId);
      }
      const chunks = chunkText(noteId, parsed.sections, {
        chunkSize: this.config.chunkSize,
        chunkOverlap: this.config.chunkOverlap
      });
      if (chunks.length === 0) {
        console.log(`\uCCAD\uD06C \uC5C6\uC74C: ${filePath}`);
        return;
      }
      this.metadataStore.insertChunks(chunks);
      console.log(`\uC784\uBCA0\uB529 \uC0DD\uC131 \uC911: ${filePath} (${chunks.length}\uAC1C \uCCAD\uD06C)`);
      for (const chunk of chunks) {
        const embedding = await this.embeddingGenerator.embed(chunk.text);
        this.vectorStore.storeEmbedding(chunk.id, embedding);
      }
      console.log(`\uC778\uB371\uC2F1 \uC644\uB8CC: ${filePath}`);
    } catch (error) {
      console.error(`\uC778\uB371\uC2F1 \uC2E4\uD328: ${filePath}`, error);
      throw error;
    }
  }
  /**
   * 파일 삭제 처리
   */
  deleteFile(filePath) {
    const note = this.metadataStore.getNoteByPath(filePath);
    if (!note) {
      return;
    }
    const chunks = this.metadataStore.getChunksByNoteId(note.id);
    this.vectorStore.deleteEmbeddings(chunks.map((c) => c.id));
    this.metadataStore.deleteChunksByNoteId(note.id);
    this.metadataStore.deleteNote(note.id);
    console.log(`\uD30C\uC77C \uC0AD\uC81C \uC644\uB8CC: ${filePath}`);
  }
  /**
   * 검색
   */
  async search(query, k) {
    const topK = k || this.config.topK;
    const queryEmbedding = await this.embeddingGenerator.embed(query);
    const currentDimension = this.vectorStore.getDimension();
    if (currentDimension !== null && queryEmbedding.length !== currentDimension) {
      console.warn(
        `\uCFFC\uB9AC \uCC28\uC6D0(${queryEmbedding.length})\uACFC \uC778\uB371\uC2A4 \uCC28\uC6D0(${currentDimension})\uC774 \uB2EC\uB77C \uAC80\uC0C9\uC744 \uAC74\uB108\uB701\uB2C8\uB2E4.`
      );
      return [];
    }
    const results = this.vectorStore.search(queryEmbedding, topK);
    const searchResults = results.map((result) => {
      const chunk = this.metadataStore.getChunkById(result.chunkId);
      if (!chunk) {
        return null;
      }
      return {
        chunk,
        score: result.score
      };
    }).filter((r) => r !== null);
    return searchResults;
  }
  /**
   * 검색 결과에 노트 메타데이터 추가
   */
  getSearchResultsWithMetadata(searchResults) {
    return searchResults.map((result) => {
      const note = this.metadataStore.getNoteById(result.chunk.noteId);
      if (!note) {
        return null;
      }
      return {
        chunk: result.chunk,
        note,
        score: result.score
      };
    }).filter((r) => r !== null);
  }
  /**
   * 노트 ID 생성
   */
  generateNoteId(filePath) {
    return (0, import_crypto2.createHash)("sha256").update(filePath).digest("hex").substring(0, 16);
  }
  /**
   * 인덱스 시그니처 생성
   */
  generateIndexSignature() {
    const source = [
      this.config.embeddingProvider,
      this.config.embeddingModel,
      this.config.embeddingApiUrl || ""
    ].join("::");
    return (0, import_crypto2.createHash)("sha256").update(source).digest("hex").substring(0, 16);
  }
  /**
   * 리소스 해제
   */
  close() {
    this.metadataStore.close();
    this.vectorStore.close();
  }
};

// src/vaultWatcher.ts
var import_obsidian9 = require("obsidian");
var VaultWatcher = class {
  // 진행 중인 인덱싱 추적
  constructor(vault) {
    this.indexer = null;
    this.isIndexing = false;
    this.indexQueue = /* @__PURE__ */ new Set();
    this.indexingInProgress = /* @__PURE__ */ new Set();
    this.vault = vault;
  }
  /**
   * 인덱서 설정
   */
  setIndexer(indexer) {
    this.indexer = indexer;
  }
  /**
   * 초기 인덱싱 실행
   */
  async indexVault() {
    if (!this.indexer) {
      throw new Error("\uC778\uB371\uC11C\uAC00 \uCD08\uAE30\uD654\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4");
    }
    if (this.isIndexing) {
      new import_obsidian9.Notice("\uC774\uBBF8 \uC778\uB371\uC2F1\uC774 \uC9C4\uD589 \uC911\uC785\uB2C8\uB2E4");
      return;
    }
    this.isIndexing = true;
    new import_obsidian9.Notice("\uBCFC\uD2B8 \uC778\uB371\uC2F1\uC744 \uC2DC\uC791\uD569\uB2C8\uB2E4...");
    try {
      const mdFiles = this.vault.getMarkdownFiles();
      console.log(`\uC778\uB371\uC2F1\uD560 \uD30C\uC77C \uC218: ${mdFiles.length}`);
      let indexed = 0;
      let failed = 0;
      for (const file of mdFiles) {
        try {
          const content = await this.vault.read(file);
          await this.indexer.indexFile(file.path, content);
          indexed++;
          if (indexed % 10 === 0) {
            new import_obsidian9.Notice(`\uC778\uB371\uC2F1 \uC9C4\uD589 \uC911: ${indexed}/${mdFiles.length}`);
          }
        } catch (error) {
          console.error(`\uD30C\uC77C \uC778\uB371\uC2F1 \uC2E4\uD328: ${file.path}`, error);
          failed++;
        }
      }
      new import_obsidian9.Notice(`\uC778\uB371\uC2F1 \uC644\uB8CC: ${indexed}\uAC1C \uC131\uACF5, ${failed}\uAC1C \uC2E4\uD328`);
    } catch (error) {
      console.error("\uBCFC\uD2B8 \uC778\uB371\uC2F1 \uC911 \uC624\uB958:", error);
      new import_obsidian9.Notice("\uC778\uB371\uC2F1 \uC911 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4");
    } finally {
      this.isIndexing = false;
    }
  }
  /**
   * 파일 생성 이벤트 처리
   */
  async onFileCreate(file) {
    if (!this.indexer || file.extension !== "md") {
      return;
    }
    try {
      const content = await this.vault.read(file);
      await this.indexer.indexFile(file.path, content);
      console.log(`\uD30C\uC77C \uC0DD\uC131 \uC778\uB371\uC2F1: ${file.path}`);
    } catch (error) {
      console.error(`\uD30C\uC77C \uC0DD\uC131 \uC778\uB371\uC2F1 \uC2E4\uD328: ${file.path}`, error);
    }
  }
  /**
   * 파일 수정 이벤트 처리
   */
  async onFileModify(file) {
    if (!this.indexer || file.extension !== "md") {
      return;
    }
    this.indexQueue.add(file.path);
    setTimeout(async () => {
      if (this.indexQueue.has(file.path) && !this.indexingInProgress.has(file.path)) {
        this.indexQueue.delete(file.path);
        this.indexingInProgress.add(file.path);
        try {
          const content = await this.vault.read(file);
          if (this.indexer) {
            await this.indexer.indexFile(file.path, content);
          }
          console.log(`\uD30C\uC77C \uC218\uC815 \uC778\uB371\uC2F1: ${file.path}`);
        } catch (error) {
          console.error(`\uD30C\uC77C \uC218\uC815 \uC778\uB371\uC2F1 \uC2E4\uD328: ${file.path}`, error);
        } finally {
          this.indexingInProgress.delete(file.path);
        }
      }
    }, 100);
  }
  /**
   * 파일 삭제 이벤트 처리
   */
  onFileDelete(file) {
    if (!this.indexer || file.extension !== "md") {
      return;
    }
    try {
      this.indexer.deleteFile(file.path);
      console.log(`\uD30C\uC77C \uC0AD\uC81C \uCC98\uB9AC: ${file.path}`);
    } catch (error) {
      console.error(`\uD30C\uC77C \uC0AD\uC81C \uCC98\uB9AC \uC2E4\uD328: ${file.path}`, error);
    }
  }
  /**
   * 파일 이름 변경 이벤트 처리
   */
  async onFileRename(file, oldPath) {
    if (!this.indexer || file.extension !== "md") {
      return;
    }
    try {
      this.indexer.deleteFile(oldPath);
      const content = await this.vault.read(file);
      if (this.indexer) {
        await this.indexer.indexFile(file.path, content);
      }
      console.log(`\uD30C\uC77C \uC774\uB984 \uBCC0\uACBD \uCC98\uB9AC: ${oldPath} -> ${file.path}`);
    } catch (error) {
      console.error(`\uD30C\uC77C \uC774\uB984 \uBCC0\uACBD \uCC98\uB9AC \uC2E4\uD328: ${oldPath} -> ${file.path}`, error);
    }
  }
};

// src/main.ts
var import_path3 = require("path");
var OvlPlugin = class extends import_obsidian10.Plugin {
  constructor() {
    super(...arguments);
    this.settings = { ...DEFAULT_SETTINGS };
    this.lastSavedSettings = { ...DEFAULT_SETTINGS };
    this.apiClient = null;
    this.indexer = null;
    this.vaultWatcher = null;
    this.indexingEventsRegistered = false;
  }
  async onload() {
    await this.loadSettings();
    this.apiClient = new OvlApiClient(
      () => this.settings,
      (context, detail) => appendErrorLog(this.app, this.manifest, context, detail)
    );
    if (this.settings.indexingEnabled) {
      await this.initializeIndexing();
    }
    this.registerView(VIEW_TYPE_OVL_CHAT, (leaf) => new ChatView(leaf, this));
    this.addRibbonIcon("message-circle", "OVL \uB300\uD654 \uC5F4\uAE30", () => {
      void this.openChatView();
    });
    this.addCommand({
      id: "ovl-open-chat",
      name: "OVL \uB300\uD654 \uCC3D \uC5F4\uAE30",
      callback: () => {
        void this.openChatView();
      }
    });
    this.addCommand({
      id: "ovl-save-conversation",
      name: "\uB300\uD654 JSON\uC5D0\uC11C \uB9C8\uD06C\uB2E4\uC6B4 \uC800\uC7A5",
      callback: () => {
        new SaveConversationModal(this, (form) => {
          void this.handleSaveConversation(form);
        }).open();
      }
    });
    this.addCommand({
      id: "ovl-index-vault",
      name: "\uBCFC\uD2B8 \uC778\uB371\uC2F1 \uC2DC\uC791",
      callback: () => {
        void this.startIndexing();
      }
    });
    this.addSettingTab(new OvlSettingTab(this));
  }
  onunload() {
    this.app.workspace.getLeavesOfType(VIEW_TYPE_OVL_CHAT).forEach((leaf) => {
      leaf.detach();
    });
    if (this.indexer) {
      this.indexer.close();
    }
  }
  /**
   * 인덱싱 시스템 초기화
   */
  async initializeIndexing() {
    try {
      if (this.indexer) {
        this.indexer.close();
        this.indexer = null;
      }
      const dataDir = (0, import_path3.join)(
        // @ts-ignore - Obsidian API의 내부 속성 사용
        this.app.vault.adapter.basePath,
        ".obsidian",
        "plugins",
        this.manifest.id
      );
      const metaStorePath = (0, import_path3.join)(dataDir, "meta.json");
      const vectorStorePath = (0, import_path3.join)(dataDir, "vectors.json");
      this.indexer = new Indexer({
        chunkSize: this.settings.chunkSize,
        chunkOverlap: this.settings.chunkOverlap,
        topK: this.settings.topK,
        vectorIndexEngine: "json",
        embeddingProvider: this.settings.embeddingProvider,
        embeddingModel: this.settings.embeddingModel,
        embeddingApiKey: this.settings.embeddingApiKey || this.settings.apiKey,
        embeddingApiUrl: this.getEmbeddingApiUrl(),
        metaStorePath,
        vectorStorePath
      });
      await this.indexer.initialize();
      this.vaultWatcher = new VaultWatcher(this.app.vault);
      this.vaultWatcher.setIndexer(this.indexer);
      if (!this.indexingEventsRegistered) {
        this.registerEvent(
          this.app.vault.on("create", (file) => {
            var _a;
            if (file instanceof import_obsidian10.TFile) {
              void ((_a = this.vaultWatcher) == null ? void 0 : _a.onFileCreate(file));
            }
          })
        );
        this.registerEvent(
          this.app.vault.on("modify", (file) => {
            var _a;
            if (file instanceof import_obsidian10.TFile) {
              void ((_a = this.vaultWatcher) == null ? void 0 : _a.onFileModify(file));
            }
          })
        );
        this.registerEvent(
          this.app.vault.on("delete", (file) => {
            var _a;
            if (file instanceof import_obsidian10.TFile) {
              (_a = this.vaultWatcher) == null ? void 0 : _a.onFileDelete(file);
            }
          })
        );
        this.registerEvent(
          this.app.vault.on("rename", (file, oldPath) => {
            var _a;
            if (file instanceof import_obsidian10.TFile) {
              void ((_a = this.vaultWatcher) == null ? void 0 : _a.onFileRename(file, oldPath));
            }
          })
        );
        this.indexingEventsRegistered = true;
      }
      console.log("\uC778\uB371\uC2F1 \uC2DC\uC2A4\uD15C \uCD08\uAE30\uD654 \uC644\uB8CC");
    } catch (error) {
      console.error("\uC778\uB371\uC2F1 \uC2DC\uC2A4\uD15C \uCD08\uAE30\uD654 \uC2E4\uD328:", error);
      new import_obsidian10.Notice("\uC778\uB371\uC2F1 \uC2DC\uC2A4\uD15C \uCD08\uAE30\uD654\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4");
    }
  }
  /**
   * 볼트 인덱싱 시작
   */
  async startIndexing() {
    if (!this.settings.indexingEnabled) {
      new import_obsidian10.Notice("\uBA3C\uC800 \uC124\uC815\uC5D0\uC11C \uC778\uB371\uC2F1\uC744 \uD65C\uC131\uD654\uD574 \uC8FC\uC138\uC694");
      return;
    }
    if (!this.indexer) {
      await this.initializeIndexing();
    }
    if (!this.vaultWatcher) {
      new import_obsidian10.Notice("\uC778\uB371\uC2F1 \uC2DC\uC2A4\uD15C\uC774 \uCD08\uAE30\uD654\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4");
      return;
    }
    try {
      await this.vaultWatcher.indexVault();
    } catch (error) {
      console.error("\uBCFC\uD2B8 \uC778\uB371\uC2F1 \uC2E4\uD328:", error);
      new import_obsidian10.Notice("\uBCFC\uD2B8 \uC778\uB371\uC2F1\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4");
    }
  }
  /**
   * 벡터 검색 수행
   */
  async search(query) {
    if (!this.indexer) {
      throw new Error("\uC778\uB371\uC2F1\uC774 \uD65C\uC131\uD654\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4");
    }
    const searchResults = await this.indexer.search(query);
    return this.indexer.getSearchResultsWithMetadata(searchResults);
  }
  async openChatView() {
    const existingLeaf = this.app.workspace.getLeavesOfType(VIEW_TYPE_OVL_CHAT)[0];
    const leaf = existingLeaf != null ? existingLeaf : this.app.workspace.getRightLeaf(false);
    if (!leaf) {
      new import_obsidian10.Notice("\uB300\uD654 \uCC3D\uC744 \uC5F4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
      return;
    }
    await leaf.setViewState({ type: VIEW_TYPE_OVL_CHAT, active: true });
    this.app.workspace.revealLeaf(leaf);
  }
  async requestAssistantReply(turns) {
    if (!this.apiClient) {
      throw new Error("API \uD074\uB77C\uC774\uC5B8\uD2B8\uB97C \uCD08\uAE30\uD654\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    }
    return this.apiClient.requestAssistantReply(turns);
  }
  async requestTitleReply(prompt) {
    if (!this.apiClient) {
      throw new Error("API \uD074\uB77C\uC774\uC5B8\uD2B8\uB97C \uCD08\uAE30\uD654\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    }
    return this.apiClient.requestTitleReply(prompt);
  }
  async saveConversationFromTurns(sessionId, turns, outputFolder) {
    return saveConversationFromTurns(this.app.vault, sessionId, turns, outputFolder);
  }
  async loadSettings() {
    this.settings = { ...DEFAULT_SETTINGS, ...await this.loadData() };
    let changed = false;
    if (this.settings.embeddingProvider === "local") {
      this.settings.embeddingProvider = "gemini";
      this.settings.embeddingModel = EMBEDDING_PRESETS.gemini.model;
      this.settings.embeddingApiUrl = EMBEDDING_PRESETS.gemini.apiUrl || "";
      changed = true;
    }
    if (changed) {
      await this.saveSettings();
    }
    this.lastSavedSettings = { ...this.settings };
  }
  async saveSettings() {
    var _a, _b;
    const previousSettings = { ...this.lastSavedSettings };
    await this.saveData(this.settings);
    this.lastSavedSettings = { ...this.settings };
    if (previousSettings.indexingEnabled !== this.settings.indexingEnabled) {
      if (!this.settings.indexingEnabled) {
        (_a = this.indexer) == null ? void 0 : _a.close();
        this.indexer = null;
        (_b = this.vaultWatcher) == null ? void 0 : _b.setIndexer(null);
        this.vaultWatcher = null;
      } else {
        await this.initializeIndexing();
      }
      return;
    }
    if (!this.settings.indexingEnabled || !this.indexer) {
      return;
    }
    if (this.shouldReinitializeIndexing(previousSettings, this.settings)) {
      await this.initializeIndexing();
      new import_obsidian10.Notice("\uC784\uBCA0\uB529 \uC124\uC815\uC774 \uBCC0\uACBD\uB418\uC5B4 \uC7AC\uC778\uB371\uC2F1\uC774 \uD544\uC694\uD569\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC804\uCCB4 \uC784\uBCA0\uB529\uC744 \uC2E4\uD589\uD574 \uC8FC\uC138\uC694.");
    }
  }
  async handleSaveConversation(form) {
    try {
      if (!form.inputPath) {
        new import_obsidian10.Notice("JSON \uD30C\uC77C \uACBD\uB85C\uB97C \uC785\uB825\uD574 \uC8FC\uC138\uC694.");
        return;
      }
      if (!form.sessionId) {
        new import_obsidian10.Notice("\uC138\uC158 ID\uB97C \uC785\uB825\uD574 \uC8FC\uC138\uC694.");
        return;
      }
      const jsonPath = (0, import_obsidian10.normalizePath)(form.inputPath).replace(/^\/+/, "");
      const jsonExists = await this.app.vault.adapter.exists(jsonPath);
      if (!jsonExists) {
        new import_obsidian10.Notice("JSON \uD30C\uC77C\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
        return;
      }
      const jsonContent = await this.app.vault.adapter.read(jsonPath);
      const turns = parseTurns(jsonContent);
      const outputFolder = form.outputFolder ? (0, import_obsidian10.normalizePath)(form.outputFolder).replace(/^\/+/, "") : "";
      const targetPath = await saveConversationFromTurns(
        this.app.vault,
        form.sessionId,
        turns,
        outputFolder
      );
      new import_obsidian10.Notice(`\uB300\uD654 \uC800\uC7A5 \uC644\uB8CC: ${targetPath}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      new import_obsidian10.Notice(`\uC800\uC7A5 \uC2E4\uD328: ${message}`);
    }
  }
  /**
   * 전체 볼트를 임베딩합니다 (스캔 후 재인덱싱)
   */
  async indexVaultAll() {
    if (!this.settings.indexingEnabled) {
      throw new Error("\uC778\uB371\uC2F1\uC774 \uD65C\uC131\uD654\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4");
    }
    if (!this.indexer) {
      await this.initializeIndexing();
    }
    if (!this.vaultWatcher) {
      throw new Error("\uC778\uB371\uC2F1 \uC2DC\uC2A4\uD15C\uC774 \uCD08\uAE30\uD654\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4");
    }
    try {
      console.log("\uC804\uCCB4 \uBCFC\uD2B8 \uC784\uBCA0\uB529 \uC2DC\uC791...");
      await this.vaultWatcher.indexVault();
      console.log("\uC804\uCCB4 \uBCFC\uD2B8 \uC784\uBCA0\uB529 \uC644\uB8CC");
    } catch (error) {
      console.error("\uC804\uCCB4 \uC784\uBCA0\uB529 \uC2E4\uD328:", error);
      throw error;
    }
  }
  /**
   * 신규 노트만 임베딩합니다 (증분 인덱싱)
   */
  async indexNewFilesOnly() {
    if (!this.settings.indexingEnabled) {
      throw new Error("\uC778\uB371\uC2F1\uC774 \uD65C\uC131\uD654\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4");
    }
    if (!this.indexer) {
      await this.initializeIndexing();
    }
    if (!this.vaultWatcher) {
      throw new Error("\uC778\uB371\uC2F1 \uC2DC\uC2A4\uD15C\uC774 \uCD08\uAE30\uD654\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4");
    }
    const indexer = this.indexer;
    if (!indexer) {
      throw new Error("\uC778\uB371\uC2F1 \uC2DC\uC2A4\uD15C\uC774 \uCD08\uAE30\uD654\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4");
    }
    try {
      console.log("\uC2E0\uADDC \uD30C\uC77C \uC784\uBCA0\uB529 \uC2DC\uC791...");
      const allFiles = this.app.vault.getMarkdownFiles();
      let indexed = 0;
      for (const file of allFiles) {
        try {
          const content = await this.app.vault.cachedRead(file);
          await indexer.indexFile(file.path, content);
          indexed++;
        } catch (error) {
          console.warn(`\uD30C\uC77C \uC784\uBCA0\uB529 \uC2E4\uD328: ${file.path}`, error);
        }
      }
      console.log(`\uC2E0\uADDC \uD30C\uC77C \uC784\uBCA0\uB529 \uC644\uB8CC: ${indexed}\uAC1C \uD30C\uC77C \uCC98\uB9AC`);
    } catch (error) {
      console.error("\uC2E0\uADDC \uC784\uBCA0\uB529 \uC2E4\uD328:", error);
      throw error;
    }
  }
  /**
   * 임베딩 API URL 가져오기
   */
  getEmbeddingApiUrl() {
    var _a;
    if ((_a = this.settings.embeddingApiUrl) == null ? void 0 : _a.trim()) {
      return this.settings.embeddingApiUrl.trim();
    }
    const preset = EMBEDDING_PRESETS[this.settings.embeddingProvider];
    return preset == null ? void 0 : preset.apiUrl;
  }
  /**
   * 인덱서 재초기화가 필요한 설정 변경인지 확인
   */
  shouldReinitializeIndexing(previous, current) {
    return previous.embeddingProvider !== current.embeddingProvider || previous.embeddingModel !== current.embeddingModel || previous.embeddingApiUrl !== current.embeddingApiUrl;
  }
};
/*! Bundled license information:

is-extendable/index.js:
  (*!
   * is-extendable <https://github.com/jonschlinkert/is-extendable>
   *
   * Copyright (c) 2015, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

strip-bom-string/index.js:
  (*!
   * strip-bom-string <https://github.com/jonschlinkert/strip-bom-string>
   *
   * Copyright (c) 2015, 2017, Jon Schlinkert.
   * Released under the MIT License.
   *)

@google/generative-ai/dist/index.mjs:
@google/generative-ai/dist/index.mjs:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2xvZ2dpbmcudHMiLCAibm9kZV9tb2R1bGVzL2tpbmQtb2YvaW5kZXguanMiLCAibm9kZV9tb2R1bGVzL2lzLWV4dGVuZGFibGUvaW5kZXguanMiLCAibm9kZV9tb2R1bGVzL2V4dGVuZC1zaGFsbG93L2luZGV4LmpzIiwgIm5vZGVfbW9kdWxlcy9zZWN0aW9uLW1hdHRlci9pbmRleC5qcyIsICJub2RlX21vZHVsZXMvanMteWFtbC9saWIvanMteWFtbC9jb21tb24uanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvZXhjZXB0aW9uLmpzIiwgIm5vZGVfbW9kdWxlcy9qcy15YW1sL2xpYi9qcy15YW1sL21hcmsuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvdHlwZS5qcyIsICJub2RlX21vZHVsZXMvanMteWFtbC9saWIvanMteWFtbC9zY2hlbWEuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvdHlwZS9zdHIuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvdHlwZS9zZXEuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvdHlwZS9tYXAuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvc2NoZW1hL2ZhaWxzYWZlLmpzIiwgIm5vZGVfbW9kdWxlcy9qcy15YW1sL2xpYi9qcy15YW1sL3R5cGUvbnVsbC5qcyIsICJub2RlX21vZHVsZXMvanMteWFtbC9saWIvanMteWFtbC90eXBlL2Jvb2wuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvdHlwZS9pbnQuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvdHlwZS9mbG9hdC5qcyIsICJub2RlX21vZHVsZXMvanMteWFtbC9saWIvanMteWFtbC9zY2hlbWEvanNvbi5qcyIsICJub2RlX21vZHVsZXMvanMteWFtbC9saWIvanMteWFtbC9zY2hlbWEvY29yZS5qcyIsICJub2RlX21vZHVsZXMvanMteWFtbC9saWIvanMteWFtbC90eXBlL3RpbWVzdGFtcC5qcyIsICJub2RlX21vZHVsZXMvanMteWFtbC9saWIvanMteWFtbC90eXBlL21lcmdlLmpzIiwgIm5vZGVfbW9kdWxlcy9qcy15YW1sL2xpYi9qcy15YW1sL3R5cGUvYmluYXJ5LmpzIiwgIm5vZGVfbW9kdWxlcy9qcy15YW1sL2xpYi9qcy15YW1sL3R5cGUvb21hcC5qcyIsICJub2RlX21vZHVsZXMvanMteWFtbC9saWIvanMteWFtbC90eXBlL3BhaXJzLmpzIiwgIm5vZGVfbW9kdWxlcy9qcy15YW1sL2xpYi9qcy15YW1sL3R5cGUvc2V0LmpzIiwgIm5vZGVfbW9kdWxlcy9qcy15YW1sL2xpYi9qcy15YW1sL3NjaGVtYS9kZWZhdWx0X3NhZmUuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvdHlwZS9qcy91bmRlZmluZWQuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvdHlwZS9qcy9yZWdleHAuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvdHlwZS9qcy9mdW5jdGlvbi5qcyIsICJub2RlX21vZHVsZXMvanMteWFtbC9saWIvanMteWFtbC9zY2hlbWEvZGVmYXVsdF9mdWxsLmpzIiwgIm5vZGVfbW9kdWxlcy9qcy15YW1sL2xpYi9qcy15YW1sL2xvYWRlci5qcyIsICJub2RlX21vZHVsZXMvanMteWFtbC9saWIvanMteWFtbC9kdW1wZXIuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvaW5kZXguanMiLCAibm9kZV9tb2R1bGVzL2dyYXktbWF0dGVyL2xpYi9lbmdpbmVzLmpzIiwgIm5vZGVfbW9kdWxlcy9zdHJpcC1ib20tc3RyaW5nL2luZGV4LmpzIiwgIm5vZGVfbW9kdWxlcy9ncmF5LW1hdHRlci9saWIvdXRpbHMuanMiLCAibm9kZV9tb2R1bGVzL2dyYXktbWF0dGVyL2xpYi9kZWZhdWx0cy5qcyIsICJub2RlX21vZHVsZXMvZ3JheS1tYXR0ZXIvbGliL2VuZ2luZS5qcyIsICJub2RlX21vZHVsZXMvZ3JheS1tYXR0ZXIvbGliL3N0cmluZ2lmeS5qcyIsICJub2RlX21vZHVsZXMvZ3JheS1tYXR0ZXIvbGliL2V4Y2VycHQuanMiLCAibm9kZV9tb2R1bGVzL2dyYXktbWF0dGVyL2xpYi90by1maWxlLmpzIiwgIm5vZGVfbW9kdWxlcy9ncmF5LW1hdHRlci9saWIvcGFyc2UuanMiLCAibm9kZV9tb2R1bGVzL2dyYXktbWF0dGVyL2luZGV4LmpzIiwgInNyYy9tYWluLnRzIiwgInNyYy9jb252ZXJzYXRpb25TdG9yZS50cyIsICJzcmMvY29udmVyc2F0aW9uLnRzIiwgInNyYy9hcGkudHMiLCAic3JjL3R5cGVzLnRzIiwgInNyYy9tb2RhbHMvc2F2ZUNvbnZlcnNhdGlvbk1vZGFsLnRzIiwgInNyYy9wYXJzZVR1cm5zLnRzIiwgInNyYy9zZXR0aW5ncy50cyIsICJzcmMvdmlld3MvY2hhdFZpZXcudHMiLCAic3JjL3RvcGljU2VwYXJhdGlvbi9rZXl3b3JkRXh0cmFjdG9yLnRzIiwgIm5vZGVfbW9kdWxlcy9AZ29vZ2xlL2dlbmVyYXRpdmUtYWkvZGlzdC9pbmRleC5tanMiLCAic3JjL3RvcGljU2VwYXJhdGlvbi9lbWJlZGRpbmdTZXJ2aWNlLnRzIiwgInNyYy90b3BpY1NlcGFyYXRpb24vdG9waWNTZXBhcmF0aW9uRW5naW5lLnRzIiwgInNyYy90b3BpY1NlcGFyYXRpb24vbXVsdGlOb3RlU2F2ZXIudHMiLCAic3JjL2luZGV4aW5nL21ldGFkYXRhU3RvcmUudHMiLCAic3JjL2luZGV4aW5nL2VtYmVkZGluZ3MudHMiLCAic3JjL2luZGV4aW5nL3BhcnNlci50cyIsICJzcmMvaW5kZXhpbmcvY2h1bmtlci50cyIsICJzcmMvaW5kZXhpbmcvaW5kZXhlci50cyIsICJzcmMvaW5kZXhpbmcvdmVjdG9yU3RvcmUudHMiLCAic3JjL2luZGV4aW5nL3ZlY3RvckluZGV4RmFjdG9yeS50cyIsICJzcmMvdmF1bHRXYXRjaGVyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgdHlwZSB7IEFwcCwgUGx1Z2luTWFuaWZlc3QgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB7IG5vcm1hbGl6ZVBhdGggfSBmcm9tIFwib2JzaWRpYW5cIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBsdWdpbkxvZ1BhdGgoYXBwOiBBcHAsIG1hbmlmZXN0PzogUGx1Z2luTWFuaWZlc3QpOiBzdHJpbmcge1xuICBjb25zdCBwbHVnaW5JZCA9IG1hbmlmZXN0Py5pZCA/PyBcIm9ic2lkaWFuLXZhdWx0LWxsbVwiO1xuICByZXR1cm4gbm9ybWFsaXplUGF0aChgJHthcHAudmF1bHQuY29uZmlnRGlyfS9wbHVnaW5zLyR7cGx1Z2luSWR9L2xvZy50eHRgKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFwcGVuZEVycm9yTG9nKFxuICBhcHA6IEFwcCxcbiAgbWFuaWZlc3Q6IFBsdWdpbk1hbmlmZXN0IHwgdW5kZWZpbmVkLFxuICBjb250ZXh0OiBzdHJpbmcsXG4gIGRldGFpbDogdW5rbm93blxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGxvZ1BhdGggPSBnZXRQbHVnaW5Mb2dQYXRoKGFwcCwgbWFuaWZlc3QpO1xuICBjb25zdCB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gIGNvbnN0IGRldGFpbFRleHQgPSB0b1NhZmVTdHJpbmcoZGV0YWlsKTtcbiAgY29uc3QgZW50cnkgPSBgXFxuWyR7dGltZXN0YW1wfV0gJHtjb250ZXh0fVxcbiR7ZGV0YWlsVGV4dH1cXG5gO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgZXhpc3RzID0gYXdhaXQgYXBwLnZhdWx0LmFkYXB0ZXIuZXhpc3RzKGxvZ1BhdGgpO1xuICAgIGlmIChleGlzdHMpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnQgPSBhd2FpdCBhcHAudmF1bHQuYWRhcHRlci5yZWFkKGxvZ1BhdGgpO1xuICAgICAgYXdhaXQgYXBwLnZhdWx0LmFkYXB0ZXIud3JpdGUobG9nUGF0aCwgYCR7ZW50cnl9JHtjdXJyZW50fWApO1xuICAgIH0gZWxzZSB7XG4gICAgICBhd2FpdCBhcHAudmF1bHQuYWRhcHRlci53cml0ZShsb2dQYXRoLCBlbnRyeS50cmltU3RhcnQoKSk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gd3JpdGUgcGx1Z2luIGxvZ1wiLCBlcnJvcik7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBFbWJlZGRpbmdMb2dEYXRhIHtcbiAgaW5wdXRUZXh0OiBzdHJpbmc7XG4gIGVtYmVkZGluZzogbnVtYmVyW107XG4gIHNpbWlsYXJpdHk/OiBudW1iZXI7IC8vIFx1Qzc3NFx1QzgwNCBcdUM3ODRcdUJDQTBcdUI1MjlcdUFDRkNcdUM3NTggXHVDNzIwXHVDMEFDXHVCM0M0XG4gIHByZXZpb3VzSW5wdXRUZXh0Pzogc3RyaW5nO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYXBwZW5kRW1iZWRkaW5nTG9nKFxuICBhcHA6IEFwcCxcbiAgbWFuaWZlc3Q6IFBsdWdpbk1hbmlmZXN0IHwgdW5kZWZpbmVkLFxuICBkYXRhOiBFbWJlZGRpbmdMb2dEYXRhXG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgbG9nUGF0aCA9IGdldFBsdWdpbkxvZ1BhdGgoYXBwLCBtYW5pZmVzdCk7XG4gIGNvbnN0IHRpbWVzdGFtcCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcbiAgXG4gIC8vIFx1Qzc4NVx1QjgyNSBcdUQxNERcdUMyQTRcdUQyQjggXHVDODA0XHVDQ0I0IChcdUFDMUNcdUQ1ODkgXHVDODFDXHVBQzcwKVxuICBjb25zdCBpbnB1dFRleHQgPSBkYXRhLmlucHV0VGV4dC5yZXBsYWNlKC9cXG4vZywgJyAnKTtcbiAgXG4gIC8vIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUJDQTFcdUQxMzBcdUI5N0MgXHVBQzA0XHVCMkU4XHVENzg4IFx1RDQ1Q1x1RDYwNFxuICBjb25zdCBlbWJlZGRpbmdJbmZvID0gYFtcdUJDQTFcdUQxMzAgXHVDQzI4XHVDNkQwOiAke2RhdGEuZW1iZWRkaW5nLmxlbmd0aH1dYDtcbiAgXG4gIC8vIFx1QzcyMFx1QzBBQ1x1QjNDNCBcdUM4MTVcdUJDRjRcbiAgbGV0IHNpbWlsYXJpdHlJbmZvID0gJyc7XG4gIGlmIChkYXRhLnNpbWlsYXJpdHkgIT09IHVuZGVmaW5lZCkge1xuICAgIHNpbWlsYXJpdHlJbmZvID0gYCB8IFx1Qzc3NFx1QzgwNCBcdUM3ODRcdUJDQTBcdUI1MjlcdUFDRkNcdUM3NTggXHVDNzIwXHVDMEFDXHVCM0M0OiAkeyhkYXRhLnNpbWlsYXJpdHkgKiAxMDApLnRvRml4ZWQoMil9JWA7XG4gIH1cbiAgXG4gIC8vIFx1Qjg1Q1x1QURGOCBcdUM1RDRcdUQyQjhcdUI5QUNcbiAgbGV0IGVudHJ5ID0gYFxcblske3RpbWVzdGFtcH1dIFtcdUM3ODRcdUJDQTBcdUI1MjldIFx1Qzc4NVx1QjgyNTogXCIke2lucHV0VGV4dH1cIiAke2VtYmVkZGluZ0luZm99JHtzaW1pbGFyaXR5SW5mb31cXG5gO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgZXhpc3RzID0gYXdhaXQgYXBwLnZhdWx0LmFkYXB0ZXIuZXhpc3RzKGxvZ1BhdGgpO1xuICAgIGlmIChleGlzdHMpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnQgPSBhd2FpdCBhcHAudmF1bHQuYWRhcHRlci5yZWFkKGxvZ1BhdGgpO1xuICAgICAgYXdhaXQgYXBwLnZhdWx0LmFkYXB0ZXIud3JpdGUobG9nUGF0aCwgYCR7ZW50cnl9JHtjdXJyZW50fWApO1xuICAgIH0gZWxzZSB7XG4gICAgICBhd2FpdCBhcHAudmF1bHQuYWRhcHRlci53cml0ZShsb2dQYXRoLCBlbnRyeS50cmltU3RhcnQoKSk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1tcdUM3ODRcdUJDQTBcdUI1MjkgXHVCODVDXHVBREY4XSBcdUQzMENcdUM3N0MgXHVDNEYwXHVBRTMwIFx1QzJFNFx1RDMyODonLCBlcnJvcik7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFwcGVuZFRvcGljU2VwYXJhdGlvbkZhaWx1cmVMb2coXG4gIGFwcDogQXBwLFxuICBtYW5pZmVzdDogUGx1Z2luTWFuaWZlc3QgfCB1bmRlZmluZWQsXG4gIHJlYXNvbjogc3RyaW5nLFxuICBkZXRhaWxzPzogdW5rbm93blxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGxvZ1BhdGggPSBnZXRQbHVnaW5Mb2dQYXRoKGFwcCwgbWFuaWZlc3QpO1xuICBjb25zdCB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gIFxuICBsZXQgZW50cnkgPSBgXFxuWyR7dGltZXN0YW1wfV0gW1x1QzhGQ1x1QzgxQyBcdUJEODRcdUI5QUMgXHVDMkU0XHVEMzI4XSBcdUM3NzRcdUM3MjA6ICR7cmVhc29ufVxcbmA7XG4gIFxuICBpZiAoZGV0YWlscykge1xuICAgIGVudHJ5ICs9IGBcdUMwQzFcdUMxMzg6ICR7dG9TYWZlU3RyaW5nKGRldGFpbHMpfVxcbmA7XG4gIH1cbiAgXG4gIGVudHJ5ICs9IFwiLS0tXFxuXCI7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBleGlzdHMgPSBhd2FpdCBhcHAudmF1bHQuYWRhcHRlci5leGlzdHMobG9nUGF0aCk7XG4gICAgaWYgKGV4aXN0cykge1xuICAgICAgY29uc3QgY3VycmVudCA9IGF3YWl0IGFwcC52YXVsdC5hZGFwdGVyLnJlYWQobG9nUGF0aCk7XG4gICAgICBhd2FpdCBhcHAudmF1bHQuYWRhcHRlci53cml0ZShsb2dQYXRoLCBgJHtlbnRyeX0ke2N1cnJlbnR9YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF3YWl0IGFwcC52YXVsdC5hZGFwdGVyLndyaXRlKGxvZ1BhdGgsIGVudHJ5LnRyaW1TdGFydCgpKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignW1x1QzhGQ1x1QzgxQyBcdUJEODRcdUI5QUMgXHVDMkU0XHVEMzI4IFx1Qjg1Q1x1QURGOF0gXHVEMzBDXHVDNzdDIFx1QzRGMFx1QUUzMCBcdUMyRTRcdUQzMjg6JywgZXJyb3IpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHRvU2FmZVN0cmluZyhkZXRhaWw6IHVua25vd24pOiBzdHJpbmcge1xuICBpZiAoZGV0YWlsID09PSBudWxsIHx8IGRldGFpbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIFN0cmluZyhkZXRhaWwpO1xuICB9XG4gIGlmICh0eXBlb2YgZGV0YWlsID09PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIGRldGFpbDtcbiAgfVxuICBpZiAoZGV0YWlsIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICByZXR1cm4gZGV0YWlsLnN0YWNrID8/IGRldGFpbC5tZXNzYWdlO1xuICB9XG4gIHRyeSB7XG4gICAgY29uc3Qgc2VlbiA9IG5ldyBXZWFrU2V0PG9iamVjdD4oKTtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoXG4gICAgICBkZXRhaWwsXG4gICAgICAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgaWYgKHNlZW4uaGFzKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIFwiW1x1QzIxQ1x1RDY1OCBcdUNDMzhcdUM4NzBdXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNlZW4uYWRkKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9LFxuICAgICAgMlxuICAgICk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc3QgbWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKTtcbiAgICByZXR1cm4gYFx1QzlDMVx1QjgyQ1x1RDY1NCBcdUMyRTRcdUQzMjg6ICR7bWVzc2FnZX1gO1xuICB9XG59XG4iLCAidmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBraW5kT2YodmFsKSB7XG4gIGlmICh2YWwgPT09IHZvaWQgMCkgcmV0dXJuICd1bmRlZmluZWQnO1xuICBpZiAodmFsID09PSBudWxsKSByZXR1cm4gJ251bGwnO1xuXG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbDtcbiAgaWYgKHR5cGUgPT09ICdib29sZWFuJykgcmV0dXJuICdib29sZWFuJztcbiAgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSByZXR1cm4gJ3N0cmluZyc7XG4gIGlmICh0eXBlID09PSAnbnVtYmVyJykgcmV0dXJuICdudW1iZXInO1xuICBpZiAodHlwZSA9PT0gJ3N5bWJvbCcpIHJldHVybiAnc3ltYm9sJztcbiAgaWYgKHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gaXNHZW5lcmF0b3JGbih2YWwpID8gJ2dlbmVyYXRvcmZ1bmN0aW9uJyA6ICdmdW5jdGlvbic7XG4gIH1cblxuICBpZiAoaXNBcnJheSh2YWwpKSByZXR1cm4gJ2FycmF5JztcbiAgaWYgKGlzQnVmZmVyKHZhbCkpIHJldHVybiAnYnVmZmVyJztcbiAgaWYgKGlzQXJndW1lbnRzKHZhbCkpIHJldHVybiAnYXJndW1lbnRzJztcbiAgaWYgKGlzRGF0ZSh2YWwpKSByZXR1cm4gJ2RhdGUnO1xuICBpZiAoaXNFcnJvcih2YWwpKSByZXR1cm4gJ2Vycm9yJztcbiAgaWYgKGlzUmVnZXhwKHZhbCkpIHJldHVybiAncmVnZXhwJztcblxuICBzd2l0Y2ggKGN0b3JOYW1lKHZhbCkpIHtcbiAgICBjYXNlICdTeW1ib2wnOiByZXR1cm4gJ3N5bWJvbCc7XG4gICAgY2FzZSAnUHJvbWlzZSc6IHJldHVybiAncHJvbWlzZSc7XG5cbiAgICAvLyBTZXQsIE1hcCwgV2Vha1NldCwgV2Vha01hcFxuICAgIGNhc2UgJ1dlYWtNYXAnOiByZXR1cm4gJ3dlYWttYXAnO1xuICAgIGNhc2UgJ1dlYWtTZXQnOiByZXR1cm4gJ3dlYWtzZXQnO1xuICAgIGNhc2UgJ01hcCc6IHJldHVybiAnbWFwJztcbiAgICBjYXNlICdTZXQnOiByZXR1cm4gJ3NldCc7XG5cbiAgICAvLyA4LWJpdCB0eXBlZCBhcnJheXNcbiAgICBjYXNlICdJbnQ4QXJyYXknOiByZXR1cm4gJ2ludDhhcnJheSc7XG4gICAgY2FzZSAnVWludDhBcnJheSc6IHJldHVybiAndWludDhhcnJheSc7XG4gICAgY2FzZSAnVWludDhDbGFtcGVkQXJyYXknOiByZXR1cm4gJ3VpbnQ4Y2xhbXBlZGFycmF5JztcblxuICAgIC8vIDE2LWJpdCB0eXBlZCBhcnJheXNcbiAgICBjYXNlICdJbnQxNkFycmF5JzogcmV0dXJuICdpbnQxNmFycmF5JztcbiAgICBjYXNlICdVaW50MTZBcnJheSc6IHJldHVybiAndWludDE2YXJyYXknO1xuXG4gICAgLy8gMzItYml0IHR5cGVkIGFycmF5c1xuICAgIGNhc2UgJ0ludDMyQXJyYXknOiByZXR1cm4gJ2ludDMyYXJyYXknO1xuICAgIGNhc2UgJ1VpbnQzMkFycmF5JzogcmV0dXJuICd1aW50MzJhcnJheSc7XG4gICAgY2FzZSAnRmxvYXQzMkFycmF5JzogcmV0dXJuICdmbG9hdDMyYXJyYXknO1xuICAgIGNhc2UgJ0Zsb2F0NjRBcnJheSc6IHJldHVybiAnZmxvYXQ2NGFycmF5JztcbiAgfVxuXG4gIGlmIChpc0dlbmVyYXRvck9iaih2YWwpKSB7XG4gICAgcmV0dXJuICdnZW5lcmF0b3InO1xuICB9XG5cbiAgLy8gTm9uLXBsYWluIG9iamVjdHNcbiAgdHlwZSA9IHRvU3RyaW5nLmNhbGwodmFsKTtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnW29iamVjdCBPYmplY3RdJzogcmV0dXJuICdvYmplY3QnO1xuICAgIC8vIGl0ZXJhdG9yc1xuICAgIGNhc2UgJ1tvYmplY3QgTWFwIEl0ZXJhdG9yXSc6IHJldHVybiAnbWFwaXRlcmF0b3InO1xuICAgIGNhc2UgJ1tvYmplY3QgU2V0IEl0ZXJhdG9yXSc6IHJldHVybiAnc2V0aXRlcmF0b3InO1xuICAgIGNhc2UgJ1tvYmplY3QgU3RyaW5nIEl0ZXJhdG9yXSc6IHJldHVybiAnc3RyaW5naXRlcmF0b3InO1xuICAgIGNhc2UgJ1tvYmplY3QgQXJyYXkgSXRlcmF0b3JdJzogcmV0dXJuICdhcnJheWl0ZXJhdG9yJztcbiAgfVxuXG4gIC8vIG90aGVyXG4gIHJldHVybiB0eXBlLnNsaWNlKDgsIC0xKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccy9nLCAnJyk7XG59O1xuXG5mdW5jdGlvbiBjdG9yTmFtZSh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwuY29uc3RydWN0b3IgPT09ICdmdW5jdGlvbicgPyB2YWwuY29uc3RydWN0b3IubmFtZSA6IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzQXJyYXkodmFsKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KSByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWwpO1xuICByZXR1cm4gdmFsIGluc3RhbmNlb2YgQXJyYXk7XG59XG5cbmZ1bmN0aW9uIGlzRXJyb3IodmFsKSB7XG4gIHJldHVybiB2YWwgaW5zdGFuY2VvZiBFcnJvciB8fCAodHlwZW9mIHZhbC5tZXNzYWdlID09PSAnc3RyaW5nJyAmJiB2YWwuY29uc3RydWN0b3IgJiYgdHlwZW9mIHZhbC5jb25zdHJ1Y3Rvci5zdGFja1RyYWNlTGltaXQgPT09ICdudW1iZXInKTtcbn1cblxuZnVuY3Rpb24gaXNEYXRlKHZhbCkge1xuICBpZiAodmFsIGluc3RhbmNlb2YgRGF0ZSkgcmV0dXJuIHRydWU7XG4gIHJldHVybiB0eXBlb2YgdmFsLnRvRGF0ZVN0cmluZyA9PT0gJ2Z1bmN0aW9uJ1xuICAgICYmIHR5cGVvZiB2YWwuZ2V0RGF0ZSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICYmIHR5cGVvZiB2YWwuc2V0RGF0ZSA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaXNSZWdleHAodmFsKSB7XG4gIGlmICh2YWwgaW5zdGFuY2VvZiBSZWdFeHApIHJldHVybiB0cnVlO1xuICByZXR1cm4gdHlwZW9mIHZhbC5mbGFncyA9PT0gJ3N0cmluZydcbiAgICAmJiB0eXBlb2YgdmFsLmlnbm9yZUNhc2UgPT09ICdib29sZWFuJ1xuICAgICYmIHR5cGVvZiB2YWwubXVsdGlsaW5lID09PSAnYm9vbGVhbidcbiAgICAmJiB0eXBlb2YgdmFsLmdsb2JhbCA9PT0gJ2Jvb2xlYW4nO1xufVxuXG5mdW5jdGlvbiBpc0dlbmVyYXRvckZuKG5hbWUsIHZhbCkge1xuICByZXR1cm4gY3Rvck5hbWUobmFtZSkgPT09ICdHZW5lcmF0b3JGdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzR2VuZXJhdG9yT2JqKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbC50aHJvdyA9PT0gJ2Z1bmN0aW9uJ1xuICAgICYmIHR5cGVvZiB2YWwucmV0dXJuID09PSAnZnVuY3Rpb24nXG4gICAgJiYgdHlwZW9mIHZhbC5uZXh0ID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWwpIHtcbiAgdHJ5IHtcbiAgICBpZiAodHlwZW9mIHZhbC5sZW5ndGggPT09ICdudW1iZXInICYmIHR5cGVvZiB2YWwuY2FsbGVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGlmIChlcnIubWVzc2FnZS5pbmRleE9mKCdjYWxsZWUnKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogSWYgeW91IG5lZWQgdG8gc3VwcG9ydCBTYWZhcmkgNS03ICg4LTEwIHlyLW9sZCBicm93c2VyKSxcbiAqIHRha2UgYSBsb29rIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvaXMtYnVmZmVyXG4gKi9cblxuZnVuY3Rpb24gaXNCdWZmZXIodmFsKSB7XG4gIGlmICh2YWwuY29uc3RydWN0b3IgJiYgdHlwZW9mIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiB2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIodmFsKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG4iLCAiLyohXG4gKiBpcy1leHRlbmRhYmxlIDxodHRwczovL2dpdGh1Yi5jb20vam9uc2NobGlua2VydC9pcy1leHRlbmRhYmxlPlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSwgSm9uIFNjaGxpbmtlcnQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzRXh0ZW5kYWJsZSh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnICYmIHZhbCAhPT0gbnVsbFxuICAgICYmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKTtcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCdpcy1leHRlbmRhYmxlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXh0ZW5kKG8vKiwgb2JqZWN0cyovKSB7XG4gIGlmICghaXNPYmplY3QobykpIHsgbyA9IHt9OyB9XG5cbiAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgbGVuOyBpKyspIHtcbiAgICB2YXIgb2JqID0gYXJndW1lbnRzW2ldO1xuXG4gICAgaWYgKGlzT2JqZWN0KG9iaikpIHtcbiAgICAgIGFzc2lnbihvLCBvYmopO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbztcbn07XG5cbmZ1bmN0aW9uIGFzc2lnbihhLCBiKSB7XG4gIGZvciAodmFyIGtleSBpbiBiKSB7XG4gICAgaWYgKGhhc093bihiLCBrZXkpKSB7XG4gICAgICBhW2tleV0gPSBiW2tleV07XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBga2V5YCBpcyBhbiBvd24gcHJvcGVydHkgb2YgYG9iamAuXG4gKi9cblxuZnVuY3Rpb24gaGFzT3duKG9iaiwga2V5KSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpO1xufVxuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIHR5cGVPZiA9IHJlcXVpcmUoJ2tpbmQtb2YnKTtcbnZhciBleHRlbmQgPSByZXF1aXJlKCdleHRlbmQtc2hhbGxvdycpO1xuXG4vKipcbiAqIFBhcnNlIHNlY3Rpb25zIGluIGBpbnB1dGAgd2l0aCB0aGUgZ2l2ZW4gYG9wdGlvbnNgLlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgc2VjdGlvbnMgPSByZXF1aXJlKCd7JT0gbmFtZSAlfScpO1xuICogdmFyIHJlc3VsdCA9IHNlY3Rpb25zKGlucHV0LCBvcHRpb25zKTtcbiAqIC8vIHsgY29udGVudDogJ0NvbnRlbnQgYmVmb3JlIHNlY3Rpb25zJywgc2VjdGlvbnM6IFtdIH1cbiAqIGBgYFxuICogQHBhcmFtIHtTdHJpbmd8QnVmZmVyfE9iamVjdH0gYGlucHV0YCBJZiBpbnB1dCBpcyBhbiBvYmplY3QsIGl0J3MgYGNvbnRlbnRgIHByb3BlcnR5IG11c3QgYmUgYSBzdHJpbmcgb3IgYnVmZmVyLlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm4ge09iamVjdH0gUmV0dXJucyBhbiBvYmplY3Qgd2l0aCBhIGBjb250ZW50YCBzdHJpbmcgYW5kIGFuIGFycmF5IG9mIGBzZWN0aW9uc2Agb2JqZWN0cy5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpbnB1dCwgb3B0aW9ucykge1xuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBvcHRpb25zID0geyBwYXJzZTogb3B0aW9ucyB9O1xuICB9XG5cbiAgdmFyIGZpbGUgPSB0b09iamVjdChpbnB1dCk7XG4gIHZhciBkZWZhdWx0cyA9IHtzZWN0aW9uX2RlbGltaXRlcjogJy0tLScsIHBhcnNlOiBpZGVudGl0eX07XG4gIHZhciBvcHRzID0gZXh0ZW5kKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XG4gIHZhciBkZWxpbSA9IG9wdHMuc2VjdGlvbl9kZWxpbWl0ZXI7XG4gIHZhciBsaW5lcyA9IGZpbGUuY29udGVudC5zcGxpdCgvXFxyP1xcbi8pO1xuICB2YXIgc2VjdGlvbnMgPSBudWxsO1xuICB2YXIgc2VjdGlvbiA9IGNyZWF0ZVNlY3Rpb24oKTtcbiAgdmFyIGNvbnRlbnQgPSBbXTtcbiAgdmFyIHN0YWNrID0gW107XG5cbiAgZnVuY3Rpb24gaW5pdFNlY3Rpb25zKHZhbCkge1xuICAgIGZpbGUuY29udGVudCA9IHZhbDtcbiAgICBzZWN0aW9ucyA9IFtdO1xuICAgIGNvbnRlbnQgPSBbXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsb3NlU2VjdGlvbih2YWwpIHtcbiAgICBpZiAoc3RhY2subGVuZ3RoKSB7XG4gICAgICBzZWN0aW9uLmtleSA9IGdldEtleShzdGFja1swXSwgZGVsaW0pO1xuICAgICAgc2VjdGlvbi5jb250ZW50ID0gdmFsO1xuICAgICAgb3B0cy5wYXJzZShzZWN0aW9uLCBzZWN0aW9ucyk7XG4gICAgICBzZWN0aW9ucy5wdXNoKHNlY3Rpb24pO1xuICAgICAgc2VjdGlvbiA9IGNyZWF0ZVNlY3Rpb24oKTtcbiAgICAgIGNvbnRlbnQgPSBbXTtcbiAgICAgIHN0YWNrID0gW107XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBsaW5lID0gbGluZXNbaV07XG4gICAgdmFyIGxlbiA9IHN0YWNrLmxlbmd0aDtcbiAgICB2YXIgbG4gPSBsaW5lLnRyaW0oKTtcblxuICAgIGlmIChpc0RlbGltaXRlcihsbiwgZGVsaW0pKSB7XG4gICAgICBpZiAobG4ubGVuZ3RoID09PSAzICYmIGkgIT09IDApIHtcbiAgICAgICAgaWYgKGxlbiA9PT0gMCB8fCBsZW4gPT09IDIpIHtcbiAgICAgICAgICBjb250ZW50LnB1c2gobGluZSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgc3RhY2sucHVzaChsbik7XG4gICAgICAgIHNlY3Rpb24uZGF0YSA9IGNvbnRlbnQuam9pbignXFxuJyk7XG4gICAgICAgIGNvbnRlbnQgPSBbXTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChzZWN0aW9ucyA9PT0gbnVsbCkge1xuICAgICAgICBpbml0U2VjdGlvbnMoY29udGVudC5qb2luKCdcXG4nKSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChsZW4gPT09IDIpIHtcbiAgICAgICAgY2xvc2VTZWN0aW9uKGNvbnRlbnQuam9pbignXFxuJykpO1xuICAgICAgfVxuXG4gICAgICBzdGFjay5wdXNoKGxuKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGNvbnRlbnQucHVzaChsaW5lKTtcbiAgfVxuXG4gIGlmIChzZWN0aW9ucyA9PT0gbnVsbCkge1xuICAgIGluaXRTZWN0aW9ucyhjb250ZW50LmpvaW4oJ1xcbicpKTtcbiAgfSBlbHNlIHtcbiAgICBjbG9zZVNlY3Rpb24oY29udGVudC5qb2luKCdcXG4nKSk7XG4gIH1cblxuICBmaWxlLnNlY3Rpb25zID0gc2VjdGlvbnM7XG4gIHJldHVybiBmaWxlO1xufTtcblxuZnVuY3Rpb24gaXNEZWxpbWl0ZXIobGluZSwgZGVsaW0pIHtcbiAgaWYgKGxpbmUuc2xpY2UoMCwgZGVsaW0ubGVuZ3RoKSAhPT0gZGVsaW0pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKGxpbmUuY2hhckF0KGRlbGltLmxlbmd0aCArIDEpID09PSBkZWxpbS5zbGljZSgtMSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHRvT2JqZWN0KGlucHV0KSB7XG4gIGlmICh0eXBlT2YoaW5wdXQpICE9PSAnb2JqZWN0Jykge1xuICAgIGlucHV0ID0geyBjb250ZW50OiBpbnB1dCB9O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBpbnB1dC5jb250ZW50ICE9PSAnc3RyaW5nJyAmJiAhaXNCdWZmZXIoaW5wdXQuY29udGVudCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleHBlY3RlZCBhIGJ1ZmZlciBvciBzdHJpbmcnKTtcbiAgfVxuXG4gIGlucHV0LmNvbnRlbnQgPSBpbnB1dC5jb250ZW50LnRvU3RyaW5nKCk7XG4gIGlucHV0LnNlY3Rpb25zID0gW107XG4gIHJldHVybiBpbnB1dDtcbn1cblxuZnVuY3Rpb24gZ2V0S2V5KHZhbCwgZGVsaW0pIHtcbiAgcmV0dXJuIHZhbCA/IHZhbC5zbGljZShkZWxpbS5sZW5ndGgpLnRyaW0oKSA6ICcnO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVTZWN0aW9uKCkge1xuICByZXR1cm4geyBrZXk6ICcnLCBkYXRhOiAnJywgY29udGVudDogJycgfTtcbn1cblxuZnVuY3Rpb24gaWRlbnRpdHkodmFsKSB7XG4gIHJldHVybiB2YWw7XG59XG5cbmZ1bmN0aW9uIGlzQnVmZmVyKHZhbCkge1xuICBpZiAodmFsICYmIHZhbC5jb25zdHJ1Y3RvciAmJiB0eXBlb2YgdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcih2YWwpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbiIsICIndXNlIHN0cmljdCc7XG5cblxuZnVuY3Rpb24gaXNOb3RoaW5nKHN1YmplY3QpIHtcbiAgcmV0dXJuICh0eXBlb2Ygc3ViamVjdCA9PT0gJ3VuZGVmaW5lZCcpIHx8IChzdWJqZWN0ID09PSBudWxsKTtcbn1cblxuXG5mdW5jdGlvbiBpc09iamVjdChzdWJqZWN0KSB7XG4gIHJldHVybiAodHlwZW9mIHN1YmplY3QgPT09ICdvYmplY3QnKSAmJiAoc3ViamVjdCAhPT0gbnVsbCk7XG59XG5cblxuZnVuY3Rpb24gdG9BcnJheShzZXF1ZW5jZSkge1xuICBpZiAoQXJyYXkuaXNBcnJheShzZXF1ZW5jZSkpIHJldHVybiBzZXF1ZW5jZTtcbiAgZWxzZSBpZiAoaXNOb3RoaW5nKHNlcXVlbmNlKSkgcmV0dXJuIFtdO1xuXG4gIHJldHVybiBbIHNlcXVlbmNlIF07XG59XG5cblxuZnVuY3Rpb24gZXh0ZW5kKHRhcmdldCwgc291cmNlKSB7XG4gIHZhciBpbmRleCwgbGVuZ3RoLCBrZXksIHNvdXJjZUtleXM7XG5cbiAgaWYgKHNvdXJjZSkge1xuICAgIHNvdXJjZUtleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuXG4gICAgZm9yIChpbmRleCA9IDAsIGxlbmd0aCA9IHNvdXJjZUtleXMubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgICAga2V5ID0gc291cmNlS2V5c1tpbmRleF07XG4gICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cblxuZnVuY3Rpb24gcmVwZWF0KHN0cmluZywgY291bnQpIHtcbiAgdmFyIHJlc3VsdCA9ICcnLCBjeWNsZTtcblxuICBmb3IgKGN5Y2xlID0gMDsgY3ljbGUgPCBjb3VudDsgY3ljbGUgKz0gMSkge1xuICAgIHJlc3VsdCArPSBzdHJpbmc7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5cbmZ1bmN0aW9uIGlzTmVnYXRpdmVaZXJvKG51bWJlcikge1xuICByZXR1cm4gKG51bWJlciA9PT0gMCkgJiYgKE51bWJlci5ORUdBVElWRV9JTkZJTklUWSA9PT0gMSAvIG51bWJlcik7XG59XG5cblxubW9kdWxlLmV4cG9ydHMuaXNOb3RoaW5nICAgICAgPSBpc05vdGhpbmc7XG5tb2R1bGUuZXhwb3J0cy5pc09iamVjdCAgICAgICA9IGlzT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMudG9BcnJheSAgICAgICAgPSB0b0FycmF5O1xubW9kdWxlLmV4cG9ydHMucmVwZWF0ICAgICAgICAgPSByZXBlYXQ7XG5tb2R1bGUuZXhwb3J0cy5pc05lZ2F0aXZlWmVybyA9IGlzTmVnYXRpdmVaZXJvO1xubW9kdWxlLmV4cG9ydHMuZXh0ZW5kICAgICAgICAgPSBleHRlbmQ7XG4iLCAiLy8gWUFNTCBlcnJvciBjbGFzcy4gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy84NDU4OTg0XG4vL1xuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBZQU1MRXhjZXB0aW9uKHJlYXNvbiwgbWFyaykge1xuICAvLyBTdXBlciBjb25zdHJ1Y3RvclxuICBFcnJvci5jYWxsKHRoaXMpO1xuXG4gIHRoaXMubmFtZSA9ICdZQU1MRXhjZXB0aW9uJztcbiAgdGhpcy5yZWFzb24gPSByZWFzb247XG4gIHRoaXMubWFyayA9IG1hcms7XG4gIHRoaXMubWVzc2FnZSA9ICh0aGlzLnJlYXNvbiB8fCAnKHVua25vd24gcmVhc29uKScpICsgKHRoaXMubWFyayA/ICcgJyArIHRoaXMubWFyay50b1N0cmluZygpIDogJycpO1xuXG4gIC8vIEluY2x1ZGUgc3RhY2sgdHJhY2UgaW4gZXJyb3Igb2JqZWN0XG4gIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuICAgIC8vIENocm9tZSBhbmQgTm9kZUpTXG4gICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvcik7XG4gIH0gZWxzZSB7XG4gICAgLy8gRkYsIElFIDEwKyBhbmQgU2FmYXJpIDYrLiBGYWxsYmFjayBmb3Igb3RoZXJzXG4gICAgdGhpcy5zdGFjayA9IChuZXcgRXJyb3IoKSkuc3RhY2sgfHwgJyc7XG4gIH1cbn1cblxuXG4vLyBJbmhlcml0IGZyb20gRXJyb3JcbllBTUxFeGNlcHRpb24ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUpO1xuWUFNTEV4Y2VwdGlvbi5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBZQU1MRXhjZXB0aW9uO1xuXG5cbllBTUxFeGNlcHRpb24ucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoY29tcGFjdCkge1xuICB2YXIgcmVzdWx0ID0gdGhpcy5uYW1lICsgJzogJztcblxuICByZXN1bHQgKz0gdGhpcy5yZWFzb24gfHwgJyh1bmtub3duIHJlYXNvbiknO1xuXG4gIGlmICghY29tcGFjdCAmJiB0aGlzLm1hcmspIHtcbiAgICByZXN1bHQgKz0gJyAnICsgdGhpcy5tYXJrLnRvU3RyaW5nKCk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFlBTUxFeGNlcHRpb247XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5cbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbicpO1xuXG5cbmZ1bmN0aW9uIE1hcmsobmFtZSwgYnVmZmVyLCBwb3NpdGlvbiwgbGluZSwgY29sdW1uKSB7XG4gIHRoaXMubmFtZSAgICAgPSBuYW1lO1xuICB0aGlzLmJ1ZmZlciAgID0gYnVmZmVyO1xuICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gIHRoaXMubGluZSAgICAgPSBsaW5lO1xuICB0aGlzLmNvbHVtbiAgID0gY29sdW1uO1xufVxuXG5cbk1hcmsucHJvdG90eXBlLmdldFNuaXBwZXQgPSBmdW5jdGlvbiBnZXRTbmlwcGV0KGluZGVudCwgbWF4TGVuZ3RoKSB7XG4gIHZhciBoZWFkLCBzdGFydCwgdGFpbCwgZW5kLCBzbmlwcGV0O1xuXG4gIGlmICghdGhpcy5idWZmZXIpIHJldHVybiBudWxsO1xuXG4gIGluZGVudCA9IGluZGVudCB8fCA0O1xuICBtYXhMZW5ndGggPSBtYXhMZW5ndGggfHwgNzU7XG5cbiAgaGVhZCA9ICcnO1xuICBzdGFydCA9IHRoaXMucG9zaXRpb247XG5cbiAgd2hpbGUgKHN0YXJ0ID4gMCAmJiAnXFx4MDBcXHJcXG5cXHg4NVxcdTIwMjhcXHUyMDI5Jy5pbmRleE9mKHRoaXMuYnVmZmVyLmNoYXJBdChzdGFydCAtIDEpKSA9PT0gLTEpIHtcbiAgICBzdGFydCAtPSAxO1xuICAgIGlmICh0aGlzLnBvc2l0aW9uIC0gc3RhcnQgPiAobWF4TGVuZ3RoIC8gMiAtIDEpKSB7XG4gICAgICBoZWFkID0gJyAuLi4gJztcbiAgICAgIHN0YXJ0ICs9IDU7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICB0YWlsID0gJyc7XG4gIGVuZCA9IHRoaXMucG9zaXRpb247XG5cbiAgd2hpbGUgKGVuZCA8IHRoaXMuYnVmZmVyLmxlbmd0aCAmJiAnXFx4MDBcXHJcXG5cXHg4NVxcdTIwMjhcXHUyMDI5Jy5pbmRleE9mKHRoaXMuYnVmZmVyLmNoYXJBdChlbmQpKSA9PT0gLTEpIHtcbiAgICBlbmQgKz0gMTtcbiAgICBpZiAoZW5kIC0gdGhpcy5wb3NpdGlvbiA+IChtYXhMZW5ndGggLyAyIC0gMSkpIHtcbiAgICAgIHRhaWwgPSAnIC4uLiAnO1xuICAgICAgZW5kIC09IDU7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBzbmlwcGV0ID0gdGhpcy5idWZmZXIuc2xpY2Uoc3RhcnQsIGVuZCk7XG5cbiAgcmV0dXJuIGNvbW1vbi5yZXBlYXQoJyAnLCBpbmRlbnQpICsgaGVhZCArIHNuaXBwZXQgKyB0YWlsICsgJ1xcbicgK1xuICAgICAgICAgY29tbW9uLnJlcGVhdCgnICcsIGluZGVudCArIHRoaXMucG9zaXRpb24gLSBzdGFydCArIGhlYWQubGVuZ3RoKSArICdeJztcbn07XG5cblxuTWFyay5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyhjb21wYWN0KSB7XG4gIHZhciBzbmlwcGV0LCB3aGVyZSA9ICcnO1xuXG4gIGlmICh0aGlzLm5hbWUpIHtcbiAgICB3aGVyZSArPSAnaW4gXCInICsgdGhpcy5uYW1lICsgJ1wiICc7XG4gIH1cblxuICB3aGVyZSArPSAnYXQgbGluZSAnICsgKHRoaXMubGluZSArIDEpICsgJywgY29sdW1uICcgKyAodGhpcy5jb2x1bW4gKyAxKTtcblxuICBpZiAoIWNvbXBhY3QpIHtcbiAgICBzbmlwcGV0ID0gdGhpcy5nZXRTbmlwcGV0KCk7XG5cbiAgICBpZiAoc25pcHBldCkge1xuICAgICAgd2hlcmUgKz0gJzpcXG4nICsgc25pcHBldDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gd2hlcmU7XG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0gTWFyaztcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBZQU1MRXhjZXB0aW9uID0gcmVxdWlyZSgnLi9leGNlcHRpb24nKTtcblxudmFyIFRZUEVfQ09OU1RSVUNUT1JfT1BUSU9OUyA9IFtcbiAgJ2tpbmQnLFxuICAncmVzb2x2ZScsXG4gICdjb25zdHJ1Y3QnLFxuICAnaW5zdGFuY2VPZicsXG4gICdwcmVkaWNhdGUnLFxuICAncmVwcmVzZW50JyxcbiAgJ2RlZmF1bHRTdHlsZScsXG4gICdzdHlsZUFsaWFzZXMnXG5dO1xuXG52YXIgWUFNTF9OT0RFX0tJTkRTID0gW1xuICAnc2NhbGFyJyxcbiAgJ3NlcXVlbmNlJyxcbiAgJ21hcHBpbmcnXG5dO1xuXG5mdW5jdGlvbiBjb21waWxlU3R5bGVBbGlhc2VzKG1hcCkge1xuICB2YXIgcmVzdWx0ID0ge307XG5cbiAgaWYgKG1hcCAhPT0gbnVsbCkge1xuICAgIE9iamVjdC5rZXlzKG1hcCkuZm9yRWFjaChmdW5jdGlvbiAoc3R5bGUpIHtcbiAgICAgIG1hcFtzdHlsZV0uZm9yRWFjaChmdW5jdGlvbiAoYWxpYXMpIHtcbiAgICAgICAgcmVzdWx0W1N0cmluZyhhbGlhcyldID0gc3R5bGU7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIFR5cGUodGFnLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBpZiAoVFlQRV9DT05TVFJVQ1RPUl9PUFRJT05TLmluZGV4T2YobmFtZSkgPT09IC0xKSB7XG4gICAgICB0aHJvdyBuZXcgWUFNTEV4Y2VwdGlvbignVW5rbm93biBvcHRpb24gXCInICsgbmFtZSArICdcIiBpcyBtZXQgaW4gZGVmaW5pdGlvbiBvZiBcIicgKyB0YWcgKyAnXCIgWUFNTCB0eXBlLicpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gVE9ETzogQWRkIHRhZyBmb3JtYXQgY2hlY2suXG4gIHRoaXMudGFnICAgICAgICAgID0gdGFnO1xuICB0aGlzLmtpbmQgICAgICAgICA9IG9wdGlvbnNbJ2tpbmQnXSAgICAgICAgIHx8IG51bGw7XG4gIHRoaXMucmVzb2x2ZSAgICAgID0gb3B0aW9uc1sncmVzb2x2ZSddICAgICAgfHwgZnVuY3Rpb24gKCkgeyByZXR1cm4gdHJ1ZTsgfTtcbiAgdGhpcy5jb25zdHJ1Y3QgICAgPSBvcHRpb25zWydjb25zdHJ1Y3QnXSAgICB8fCBmdW5jdGlvbiAoZGF0YSkgeyByZXR1cm4gZGF0YTsgfTtcbiAgdGhpcy5pbnN0YW5jZU9mICAgPSBvcHRpb25zWydpbnN0YW5jZU9mJ10gICB8fCBudWxsO1xuICB0aGlzLnByZWRpY2F0ZSAgICA9IG9wdGlvbnNbJ3ByZWRpY2F0ZSddICAgIHx8IG51bGw7XG4gIHRoaXMucmVwcmVzZW50ICAgID0gb3B0aW9uc1sncmVwcmVzZW50J10gICAgfHwgbnVsbDtcbiAgdGhpcy5kZWZhdWx0U3R5bGUgPSBvcHRpb25zWydkZWZhdWx0U3R5bGUnXSB8fCBudWxsO1xuICB0aGlzLnN0eWxlQWxpYXNlcyA9IGNvbXBpbGVTdHlsZUFsaWFzZXMob3B0aW9uc1snc3R5bGVBbGlhc2VzJ10gfHwgbnVsbCk7XG5cbiAgaWYgKFlBTUxfTk9ERV9LSU5EUy5pbmRleE9mKHRoaXMua2luZCkgPT09IC0xKSB7XG4gICAgdGhyb3cgbmV3IFlBTUxFeGNlcHRpb24oJ1Vua25vd24ga2luZCBcIicgKyB0aGlzLmtpbmQgKyAnXCIgaXMgc3BlY2lmaWVkIGZvciBcIicgKyB0YWcgKyAnXCIgWUFNTCB0eXBlLicpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVHlwZTtcbiIsICIndXNlIHN0cmljdCc7XG5cbi8qZXNsaW50LWRpc2FibGUgbWF4LWxlbiovXG5cbnZhciBjb21tb24gICAgICAgID0gcmVxdWlyZSgnLi9jb21tb24nKTtcbnZhciBZQU1MRXhjZXB0aW9uID0gcmVxdWlyZSgnLi9leGNlcHRpb24nKTtcbnZhciBUeXBlICAgICAgICAgID0gcmVxdWlyZSgnLi90eXBlJyk7XG5cblxuZnVuY3Rpb24gY29tcGlsZUxpc3Qoc2NoZW1hLCBuYW1lLCByZXN1bHQpIHtcbiAgdmFyIGV4Y2x1ZGUgPSBbXTtcblxuICBzY2hlbWEuaW5jbHVkZS5mb3JFYWNoKGZ1bmN0aW9uIChpbmNsdWRlZFNjaGVtYSkge1xuICAgIHJlc3VsdCA9IGNvbXBpbGVMaXN0KGluY2x1ZGVkU2NoZW1hLCBuYW1lLCByZXN1bHQpO1xuICB9KTtcblxuICBzY2hlbWFbbmFtZV0uZm9yRWFjaChmdW5jdGlvbiAoY3VycmVudFR5cGUpIHtcbiAgICByZXN1bHQuZm9yRWFjaChmdW5jdGlvbiAocHJldmlvdXNUeXBlLCBwcmV2aW91c0luZGV4KSB7XG4gICAgICBpZiAocHJldmlvdXNUeXBlLnRhZyA9PT0gY3VycmVudFR5cGUudGFnICYmIHByZXZpb3VzVHlwZS5raW5kID09PSBjdXJyZW50VHlwZS5raW5kKSB7XG4gICAgICAgIGV4Y2x1ZGUucHVzaChwcmV2aW91c0luZGV4KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJlc3VsdC5wdXNoKGN1cnJlbnRUeXBlKTtcbiAgfSk7XG5cbiAgcmV0dXJuIHJlc3VsdC5maWx0ZXIoZnVuY3Rpb24gKHR5cGUsIGluZGV4KSB7XG4gICAgcmV0dXJuIGV4Y2x1ZGUuaW5kZXhPZihpbmRleCkgPT09IC0xO1xuICB9KTtcbn1cblxuXG5mdW5jdGlvbiBjb21waWxlTWFwKC8qIGxpc3RzLi4uICovKSB7XG4gIHZhciByZXN1bHQgPSB7XG4gICAgICAgIHNjYWxhcjoge30sXG4gICAgICAgIHNlcXVlbmNlOiB7fSxcbiAgICAgICAgbWFwcGluZzoge30sXG4gICAgICAgIGZhbGxiYWNrOiB7fVxuICAgICAgfSwgaW5kZXgsIGxlbmd0aDtcblxuICBmdW5jdGlvbiBjb2xsZWN0VHlwZSh0eXBlKSB7XG4gICAgcmVzdWx0W3R5cGUua2luZF1bdHlwZS50YWddID0gcmVzdWx0WydmYWxsYmFjayddW3R5cGUudGFnXSA9IHR5cGU7XG4gIH1cblxuICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICBhcmd1bWVudHNbaW5kZXhdLmZvckVhY2goY29sbGVjdFR5cGUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cblxuZnVuY3Rpb24gU2NoZW1hKGRlZmluaXRpb24pIHtcbiAgdGhpcy5pbmNsdWRlICA9IGRlZmluaXRpb24uaW5jbHVkZSAgfHwgW107XG4gIHRoaXMuaW1wbGljaXQgPSBkZWZpbml0aW9uLmltcGxpY2l0IHx8IFtdO1xuICB0aGlzLmV4cGxpY2l0ID0gZGVmaW5pdGlvbi5leHBsaWNpdCB8fCBbXTtcblxuICB0aGlzLmltcGxpY2l0LmZvckVhY2goZnVuY3Rpb24gKHR5cGUpIHtcbiAgICBpZiAodHlwZS5sb2FkS2luZCAmJiB0eXBlLmxvYWRLaW5kICE9PSAnc2NhbGFyJykge1xuICAgICAgdGhyb3cgbmV3IFlBTUxFeGNlcHRpb24oJ1RoZXJlIGlzIGEgbm9uLXNjYWxhciB0eXBlIGluIHRoZSBpbXBsaWNpdCBsaXN0IG9mIGEgc2NoZW1hLiBJbXBsaWNpdCByZXNvbHZpbmcgb2Ygc3VjaCB0eXBlcyBpcyBub3Qgc3VwcG9ydGVkLicpO1xuICAgIH1cbiAgfSk7XG5cbiAgdGhpcy5jb21waWxlZEltcGxpY2l0ID0gY29tcGlsZUxpc3QodGhpcywgJ2ltcGxpY2l0JywgW10pO1xuICB0aGlzLmNvbXBpbGVkRXhwbGljaXQgPSBjb21waWxlTGlzdCh0aGlzLCAnZXhwbGljaXQnLCBbXSk7XG4gIHRoaXMuY29tcGlsZWRUeXBlTWFwICA9IGNvbXBpbGVNYXAodGhpcy5jb21waWxlZEltcGxpY2l0LCB0aGlzLmNvbXBpbGVkRXhwbGljaXQpO1xufVxuXG5cblNjaGVtYS5ERUZBVUxUID0gbnVsbDtcblxuXG5TY2hlbWEuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlU2NoZW1hKCkge1xuICB2YXIgc2NoZW1hcywgdHlwZXM7XG5cbiAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgY2FzZSAxOlxuICAgICAgc2NoZW1hcyA9IFNjaGVtYS5ERUZBVUxUO1xuICAgICAgdHlwZXMgPSBhcmd1bWVudHNbMF07XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgMjpcbiAgICAgIHNjaGVtYXMgPSBhcmd1bWVudHNbMF07XG4gICAgICB0eXBlcyA9IGFyZ3VtZW50c1sxXTtcbiAgICAgIGJyZWFrO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBZQU1MRXhjZXB0aW9uKCdXcm9uZyBudW1iZXIgb2YgYXJndW1lbnRzIGZvciBTY2hlbWEuY3JlYXRlIGZ1bmN0aW9uJyk7XG4gIH1cblxuICBzY2hlbWFzID0gY29tbW9uLnRvQXJyYXkoc2NoZW1hcyk7XG4gIHR5cGVzID0gY29tbW9uLnRvQXJyYXkodHlwZXMpO1xuXG4gIGlmICghc2NoZW1hcy5ldmVyeShmdW5jdGlvbiAoc2NoZW1hKSB7IHJldHVybiBzY2hlbWEgaW5zdGFuY2VvZiBTY2hlbWE7IH0pKSB7XG4gICAgdGhyb3cgbmV3IFlBTUxFeGNlcHRpb24oJ1NwZWNpZmllZCBsaXN0IG9mIHN1cGVyIHNjaGVtYXMgKG9yIGEgc2luZ2xlIFNjaGVtYSBvYmplY3QpIGNvbnRhaW5zIGEgbm9uLVNjaGVtYSBvYmplY3QuJyk7XG4gIH1cblxuICBpZiAoIXR5cGVzLmV2ZXJ5KGZ1bmN0aW9uICh0eXBlKSB7IHJldHVybiB0eXBlIGluc3RhbmNlb2YgVHlwZTsgfSkpIHtcbiAgICB0aHJvdyBuZXcgWUFNTEV4Y2VwdGlvbignU3BlY2lmaWVkIGxpc3Qgb2YgWUFNTCB0eXBlcyAob3IgYSBzaW5nbGUgVHlwZSBvYmplY3QpIGNvbnRhaW5zIGEgbm9uLVR5cGUgb2JqZWN0LicpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBTY2hlbWEoe1xuICAgIGluY2x1ZGU6IHNjaGVtYXMsXG4gICAgZXhwbGljaXQ6IHR5cGVzXG4gIH0pO1xufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFNjaGVtYTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBUeXBlID0gcmVxdWlyZSgnLi4vdHlwZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBUeXBlKCd0YWc6eWFtbC5vcmcsMjAwMjpzdHInLCB7XG4gIGtpbmQ6ICdzY2FsYXInLFxuICBjb25zdHJ1Y3Q6IGZ1bmN0aW9uIChkYXRhKSB7IHJldHVybiBkYXRhICE9PSBudWxsID8gZGF0YSA6ICcnOyB9XG59KTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBUeXBlID0gcmVxdWlyZSgnLi4vdHlwZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBUeXBlKCd0YWc6eWFtbC5vcmcsMjAwMjpzZXEnLCB7XG4gIGtpbmQ6ICdzZXF1ZW5jZScsXG4gIGNvbnN0cnVjdDogZnVuY3Rpb24gKGRhdGEpIHsgcmV0dXJuIGRhdGEgIT09IG51bGwgPyBkYXRhIDogW107IH1cbn0pO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIFR5cGUgPSByZXF1aXJlKCcuLi90eXBlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFR5cGUoJ3RhZzp5YW1sLm9yZywyMDAyOm1hcCcsIHtcbiAga2luZDogJ21hcHBpbmcnLFxuICBjb25zdHJ1Y3Q6IGZ1bmN0aW9uIChkYXRhKSB7IHJldHVybiBkYXRhICE9PSBudWxsID8gZGF0YSA6IHt9OyB9XG59KTtcbiIsICIvLyBTdGFuZGFyZCBZQU1MJ3MgRmFpbHNhZmUgc2NoZW1hLlxuLy8gaHR0cDovL3d3dy55YW1sLm9yZy9zcGVjLzEuMi9zcGVjLmh0bWwjaWQyODAyMzQ2XG5cblxuJ3VzZSBzdHJpY3QnO1xuXG5cbnZhciBTY2hlbWEgPSByZXF1aXJlKCcuLi9zY2hlbWEnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBTY2hlbWEoe1xuICBleHBsaWNpdDogW1xuICAgIHJlcXVpcmUoJy4uL3R5cGUvc3RyJyksXG4gICAgcmVxdWlyZSgnLi4vdHlwZS9zZXEnKSxcbiAgICByZXF1aXJlKCcuLi90eXBlL21hcCcpXG4gIF1cbn0pO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIFR5cGUgPSByZXF1aXJlKCcuLi90eXBlJyk7XG5cbmZ1bmN0aW9uIHJlc29sdmVZYW1sTnVsbChkYXRhKSB7XG4gIGlmIChkYXRhID09PSBudWxsKSByZXR1cm4gdHJ1ZTtcblxuICB2YXIgbWF4ID0gZGF0YS5sZW5ndGg7XG5cbiAgcmV0dXJuIChtYXggPT09IDEgJiYgZGF0YSA9PT0gJ34nKSB8fFxuICAgICAgICAgKG1heCA9PT0gNCAmJiAoZGF0YSA9PT0gJ251bGwnIHx8IGRhdGEgPT09ICdOdWxsJyB8fCBkYXRhID09PSAnTlVMTCcpKTtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0WWFtbE51bGwoKSB7XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBpc051bGwob2JqZWN0KSB7XG4gIHJldHVybiBvYmplY3QgPT09IG51bGw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFR5cGUoJ3RhZzp5YW1sLm9yZywyMDAyOm51bGwnLCB7XG4gIGtpbmQ6ICdzY2FsYXInLFxuICByZXNvbHZlOiByZXNvbHZlWWFtbE51bGwsXG4gIGNvbnN0cnVjdDogY29uc3RydWN0WWFtbE51bGwsXG4gIHByZWRpY2F0ZTogaXNOdWxsLFxuICByZXByZXNlbnQ6IHtcbiAgICBjYW5vbmljYWw6IGZ1bmN0aW9uICgpIHsgcmV0dXJuICd+JzsgICAgfSxcbiAgICBsb3dlcmNhc2U6IGZ1bmN0aW9uICgpIHsgcmV0dXJuICdudWxsJzsgfSxcbiAgICB1cHBlcmNhc2U6IGZ1bmN0aW9uICgpIHsgcmV0dXJuICdOVUxMJzsgfSxcbiAgICBjYW1lbGNhc2U6IGZ1bmN0aW9uICgpIHsgcmV0dXJuICdOdWxsJzsgfVxuICB9LFxuICBkZWZhdWx0U3R5bGU6ICdsb3dlcmNhc2UnXG59KTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBUeXBlID0gcmVxdWlyZSgnLi4vdHlwZScpO1xuXG5mdW5jdGlvbiByZXNvbHZlWWFtbEJvb2xlYW4oZGF0YSkge1xuICBpZiAoZGF0YSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gIHZhciBtYXggPSBkYXRhLmxlbmd0aDtcblxuICByZXR1cm4gKG1heCA9PT0gNCAmJiAoZGF0YSA9PT0gJ3RydWUnIHx8IGRhdGEgPT09ICdUcnVlJyB8fCBkYXRhID09PSAnVFJVRScpKSB8fFxuICAgICAgICAgKG1heCA9PT0gNSAmJiAoZGF0YSA9PT0gJ2ZhbHNlJyB8fCBkYXRhID09PSAnRmFsc2UnIHx8IGRhdGEgPT09ICdGQUxTRScpKTtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0WWFtbEJvb2xlYW4oZGF0YSkge1xuICByZXR1cm4gZGF0YSA9PT0gJ3RydWUnIHx8XG4gICAgICAgICBkYXRhID09PSAnVHJ1ZScgfHxcbiAgICAgICAgIGRhdGEgPT09ICdUUlVFJztcbn1cblxuZnVuY3Rpb24gaXNCb29sZWFuKG9iamVjdCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCkgPT09ICdbb2JqZWN0IEJvb2xlYW5dJztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgVHlwZSgndGFnOnlhbWwub3JnLDIwMDI6Ym9vbCcsIHtcbiAga2luZDogJ3NjYWxhcicsXG4gIHJlc29sdmU6IHJlc29sdmVZYW1sQm9vbGVhbixcbiAgY29uc3RydWN0OiBjb25zdHJ1Y3RZYW1sQm9vbGVhbixcbiAgcHJlZGljYXRlOiBpc0Jvb2xlYW4sXG4gIHJlcHJlc2VudDoge1xuICAgIGxvd2VyY2FzZTogZnVuY3Rpb24gKG9iamVjdCkgeyByZXR1cm4gb2JqZWN0ID8gJ3RydWUnIDogJ2ZhbHNlJzsgfSxcbiAgICB1cHBlcmNhc2U6IGZ1bmN0aW9uIChvYmplY3QpIHsgcmV0dXJuIG9iamVjdCA/ICdUUlVFJyA6ICdGQUxTRSc7IH0sXG4gICAgY2FtZWxjYXNlOiBmdW5jdGlvbiAob2JqZWN0KSB7IHJldHVybiBvYmplY3QgPyAnVHJ1ZScgOiAnRmFsc2UnOyB9XG4gIH0sXG4gIGRlZmF1bHRTdHlsZTogJ2xvd2VyY2FzZSdcbn0pO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4uL2NvbW1vbicpO1xudmFyIFR5cGUgICA9IHJlcXVpcmUoJy4uL3R5cGUnKTtcblxuZnVuY3Rpb24gaXNIZXhDb2RlKGMpIHtcbiAgcmV0dXJuICgoMHgzMC8qIDAgKi8gPD0gYykgJiYgKGMgPD0gMHgzOS8qIDkgKi8pKSB8fFxuICAgICAgICAgKCgweDQxLyogQSAqLyA8PSBjKSAmJiAoYyA8PSAweDQ2LyogRiAqLykpIHx8XG4gICAgICAgICAoKDB4NjEvKiBhICovIDw9IGMpICYmIChjIDw9IDB4NjYvKiBmICovKSk7XG59XG5cbmZ1bmN0aW9uIGlzT2N0Q29kZShjKSB7XG4gIHJldHVybiAoKDB4MzAvKiAwICovIDw9IGMpICYmIChjIDw9IDB4MzcvKiA3ICovKSk7XG59XG5cbmZ1bmN0aW9uIGlzRGVjQ29kZShjKSB7XG4gIHJldHVybiAoKDB4MzAvKiAwICovIDw9IGMpICYmIChjIDw9IDB4MzkvKiA5ICovKSk7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVZYW1sSW50ZWdlcihkYXRhKSB7XG4gIGlmIChkYXRhID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgdmFyIG1heCA9IGRhdGEubGVuZ3RoLFxuICAgICAgaW5kZXggPSAwLFxuICAgICAgaGFzRGlnaXRzID0gZmFsc2UsXG4gICAgICBjaDtcblxuICBpZiAoIW1heCkgcmV0dXJuIGZhbHNlO1xuXG4gIGNoID0gZGF0YVtpbmRleF07XG5cbiAgLy8gc2lnblxuICBpZiAoY2ggPT09ICctJyB8fCBjaCA9PT0gJysnKSB7XG4gICAgY2ggPSBkYXRhWysraW5kZXhdO1xuICB9XG5cbiAgaWYgKGNoID09PSAnMCcpIHtcbiAgICAvLyAwXG4gICAgaWYgKGluZGV4ICsgMSA9PT0gbWF4KSByZXR1cm4gdHJ1ZTtcbiAgICBjaCA9IGRhdGFbKytpbmRleF07XG5cbiAgICAvLyBiYXNlIDIsIGJhc2UgOCwgYmFzZSAxNlxuXG4gICAgaWYgKGNoID09PSAnYicpIHtcbiAgICAgIC8vIGJhc2UgMlxuICAgICAgaW5kZXgrKztcblxuICAgICAgZm9yICg7IGluZGV4IDwgbWF4OyBpbmRleCsrKSB7XG4gICAgICAgIGNoID0gZGF0YVtpbmRleF07XG4gICAgICAgIGlmIChjaCA9PT0gJ18nKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGNoICE9PSAnMCcgJiYgY2ggIT09ICcxJykgcmV0dXJuIGZhbHNlO1xuICAgICAgICBoYXNEaWdpdHMgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGhhc0RpZ2l0cyAmJiBjaCAhPT0gJ18nO1xuICAgIH1cblxuXG4gICAgaWYgKGNoID09PSAneCcpIHtcbiAgICAgIC8vIGJhc2UgMTZcbiAgICAgIGluZGV4Kys7XG5cbiAgICAgIGZvciAoOyBpbmRleCA8IG1heDsgaW5kZXgrKykge1xuICAgICAgICBjaCA9IGRhdGFbaW5kZXhdO1xuICAgICAgICBpZiAoY2ggPT09ICdfJykgY29udGludWU7XG4gICAgICAgIGlmICghaXNIZXhDb2RlKGRhdGEuY2hhckNvZGVBdChpbmRleCkpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGhhc0RpZ2l0cyA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gaGFzRGlnaXRzICYmIGNoICE9PSAnXyc7XG4gICAgfVxuXG4gICAgLy8gYmFzZSA4XG4gICAgZm9yICg7IGluZGV4IDwgbWF4OyBpbmRleCsrKSB7XG4gICAgICBjaCA9IGRhdGFbaW5kZXhdO1xuICAgICAgaWYgKGNoID09PSAnXycpIGNvbnRpbnVlO1xuICAgICAgaWYgKCFpc09jdENvZGUoZGF0YS5jaGFyQ29kZUF0KGluZGV4KSkpIHJldHVybiBmYWxzZTtcbiAgICAgIGhhc0RpZ2l0cyA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBoYXNEaWdpdHMgJiYgY2ggIT09ICdfJztcbiAgfVxuXG4gIC8vIGJhc2UgMTAgKGV4Y2VwdCAwKSBvciBiYXNlIDYwXG5cbiAgLy8gdmFsdWUgc2hvdWxkIG5vdCBzdGFydCB3aXRoIGBfYDtcbiAgaWYgKGNoID09PSAnXycpIHJldHVybiBmYWxzZTtcblxuICBmb3IgKDsgaW5kZXggPCBtYXg7IGluZGV4KyspIHtcbiAgICBjaCA9IGRhdGFbaW5kZXhdO1xuICAgIGlmIChjaCA9PT0gJ18nKSBjb250aW51ZTtcbiAgICBpZiAoY2ggPT09ICc6JykgYnJlYWs7XG4gICAgaWYgKCFpc0RlY0NvZGUoZGF0YS5jaGFyQ29kZUF0KGluZGV4KSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaGFzRGlnaXRzID0gdHJ1ZTtcbiAgfVxuXG4gIC8vIFNob3VsZCBoYXZlIGRpZ2l0cyBhbmQgc2hvdWxkIG5vdCBlbmQgd2l0aCBgX2BcbiAgaWYgKCFoYXNEaWdpdHMgfHwgY2ggPT09ICdfJykgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIGlmICFiYXNlNjAgLSBkb25lO1xuICBpZiAoY2ggIT09ICc6JykgcmV0dXJuIHRydWU7XG5cbiAgLy8gYmFzZTYwIGFsbW9zdCBub3QgdXNlZCwgbm8gbmVlZHMgdG8gb3B0aW1pemVcbiAgcmV0dXJuIC9eKDpbMC01XT9bMC05XSkrJC8udGVzdChkYXRhLnNsaWNlKGluZGV4KSk7XG59XG5cbmZ1bmN0aW9uIGNvbnN0cnVjdFlhbWxJbnRlZ2VyKGRhdGEpIHtcbiAgdmFyIHZhbHVlID0gZGF0YSwgc2lnbiA9IDEsIGNoLCBiYXNlLCBkaWdpdHMgPSBbXTtcblxuICBpZiAodmFsdWUuaW5kZXhPZignXycpICE9PSAtMSkge1xuICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvXy9nLCAnJyk7XG4gIH1cblxuICBjaCA9IHZhbHVlWzBdO1xuXG4gIGlmIChjaCA9PT0gJy0nIHx8IGNoID09PSAnKycpIHtcbiAgICBpZiAoY2ggPT09ICctJykgc2lnbiA9IC0xO1xuICAgIHZhbHVlID0gdmFsdWUuc2xpY2UoMSk7XG4gICAgY2ggPSB2YWx1ZVswXTtcbiAgfVxuXG4gIGlmICh2YWx1ZSA9PT0gJzAnKSByZXR1cm4gMDtcblxuICBpZiAoY2ggPT09ICcwJykge1xuICAgIGlmICh2YWx1ZVsxXSA9PT0gJ2InKSByZXR1cm4gc2lnbiAqIHBhcnNlSW50KHZhbHVlLnNsaWNlKDIpLCAyKTtcbiAgICBpZiAodmFsdWVbMV0gPT09ICd4JykgcmV0dXJuIHNpZ24gKiBwYXJzZUludCh2YWx1ZSwgMTYpO1xuICAgIHJldHVybiBzaWduICogcGFyc2VJbnQodmFsdWUsIDgpO1xuICB9XG5cbiAgaWYgKHZhbHVlLmluZGV4T2YoJzonKSAhPT0gLTEpIHtcbiAgICB2YWx1ZS5zcGxpdCgnOicpLmZvckVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgIGRpZ2l0cy51bnNoaWZ0KHBhcnNlSW50KHYsIDEwKSk7XG4gICAgfSk7XG5cbiAgICB2YWx1ZSA9IDA7XG4gICAgYmFzZSA9IDE7XG5cbiAgICBkaWdpdHMuZm9yRWFjaChmdW5jdGlvbiAoZCkge1xuICAgICAgdmFsdWUgKz0gKGQgKiBiYXNlKTtcbiAgICAgIGJhc2UgKj0gNjA7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc2lnbiAqIHZhbHVlO1xuXG4gIH1cblxuICByZXR1cm4gc2lnbiAqIHBhcnNlSW50KHZhbHVlLCAxMCk7XG59XG5cbmZ1bmN0aW9uIGlzSW50ZWdlcihvYmplY3QpIHtcbiAgcmV0dXJuIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqZWN0KSkgPT09ICdbb2JqZWN0IE51bWJlcl0nICYmXG4gICAgICAgICAob2JqZWN0ICUgMSA9PT0gMCAmJiAhY29tbW9uLmlzTmVnYXRpdmVaZXJvKG9iamVjdCkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBUeXBlKCd0YWc6eWFtbC5vcmcsMjAwMjppbnQnLCB7XG4gIGtpbmQ6ICdzY2FsYXInLFxuICByZXNvbHZlOiByZXNvbHZlWWFtbEludGVnZXIsXG4gIGNvbnN0cnVjdDogY29uc3RydWN0WWFtbEludGVnZXIsXG4gIHByZWRpY2F0ZTogaXNJbnRlZ2VyLFxuICByZXByZXNlbnQ6IHtcbiAgICBiaW5hcnk6ICAgICAgZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqID49IDAgPyAnMGInICsgb2JqLnRvU3RyaW5nKDIpIDogJy0wYicgKyBvYmoudG9TdHJpbmcoMikuc2xpY2UoMSk7IH0sXG4gICAgb2N0YWw6ICAgICAgIGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiA+PSAwID8gJzAnICArIG9iai50b1N0cmluZyg4KSA6ICctMCcgICsgb2JqLnRvU3RyaW5nKDgpLnNsaWNlKDEpOyB9LFxuICAgIGRlY2ltYWw6ICAgICBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmoudG9TdHJpbmcoMTApOyB9LFxuICAgIC8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbiAgICBoZXhhZGVjaW1hbDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqID49IDAgPyAnMHgnICsgb2JqLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpIDogICctMHgnICsgb2JqLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpLnNsaWNlKDEpOyB9XG4gIH0sXG4gIGRlZmF1bHRTdHlsZTogJ2RlY2ltYWwnLFxuICBzdHlsZUFsaWFzZXM6IHtcbiAgICBiaW5hcnk6ICAgICAgWyAyLCAgJ2JpbicgXSxcbiAgICBvY3RhbDogICAgICAgWyA4LCAgJ29jdCcgXSxcbiAgICBkZWNpbWFsOiAgICAgWyAxMCwgJ2RlYycgXSxcbiAgICBoZXhhZGVjaW1hbDogWyAxNiwgJ2hleCcgXVxuICB9XG59KTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBjb21tb24gPSByZXF1aXJlKCcuLi9jb21tb24nKTtcbnZhciBUeXBlICAgPSByZXF1aXJlKCcuLi90eXBlJyk7XG5cbnZhciBZQU1MX0ZMT0FUX1BBVFRFUk4gPSBuZXcgUmVnRXhwKFxuICAvLyAyLjVlNCwgMi41IGFuZCBpbnRlZ2Vyc1xuICAnXig/OlstK10/KD86MHxbMS05XVswLTlfXSopKD86XFxcXC5bMC05X10qKT8oPzpbZUVdWy0rXT9bMC05XSspPycgK1xuICAvLyAuMmU0LCAuMlxuICAvLyBzcGVjaWFsIGNhc2UsIHNlZW1zIG5vdCBmcm9tIHNwZWNcbiAgJ3xcXFxcLlswLTlfXSsoPzpbZUVdWy0rXT9bMC05XSspPycgK1xuICAvLyAyMDo1OVxuICAnfFstK10/WzAtOV1bMC05X10qKD86OlswLTVdP1swLTldKStcXFxcLlswLTlfXSonICtcbiAgLy8gLmluZlxuICAnfFstK10/XFxcXC4oPzppbmZ8SW5mfElORiknICtcbiAgLy8gLm5hblxuICAnfFxcXFwuKD86bmFufE5hTnxOQU4pKSQnKTtcblxuZnVuY3Rpb24gcmVzb2x2ZVlhbWxGbG9hdChkYXRhKSB7XG4gIGlmIChkYXRhID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKCFZQU1MX0ZMT0FUX1BBVFRFUk4udGVzdChkYXRhKSB8fFxuICAgICAgLy8gUXVpY2sgaGFjayB0byBub3QgYWxsb3cgaW50ZWdlcnMgZW5kIHdpdGggYF9gXG4gICAgICAvLyBQcm9iYWJseSBzaG91bGQgdXBkYXRlIHJlZ2V4cCAmIGNoZWNrIHNwZWVkXG4gICAgICBkYXRhW2RhdGEubGVuZ3RoIC0gMV0gPT09ICdfJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBjb25zdHJ1Y3RZYW1sRmxvYXQoZGF0YSkge1xuICB2YXIgdmFsdWUsIHNpZ24sIGJhc2UsIGRpZ2l0cztcblxuICB2YWx1ZSAgPSBkYXRhLnJlcGxhY2UoL18vZywgJycpLnRvTG93ZXJDYXNlKCk7XG4gIHNpZ24gICA9IHZhbHVlWzBdID09PSAnLScgPyAtMSA6IDE7XG4gIGRpZ2l0cyA9IFtdO1xuXG4gIGlmICgnKy0nLmluZGV4T2YodmFsdWVbMF0pID49IDApIHtcbiAgICB2YWx1ZSA9IHZhbHVlLnNsaWNlKDEpO1xuICB9XG5cbiAgaWYgKHZhbHVlID09PSAnLmluZicpIHtcbiAgICByZXR1cm4gKHNpZ24gPT09IDEpID8gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZIDogTnVtYmVyLk5FR0FUSVZFX0lORklOSVRZO1xuXG4gIH0gZWxzZSBpZiAodmFsdWUgPT09ICcubmFuJykge1xuICAgIHJldHVybiBOYU47XG5cbiAgfSBlbHNlIGlmICh2YWx1ZS5pbmRleE9mKCc6JykgPj0gMCkge1xuICAgIHZhbHVlLnNwbGl0KCc6JykuZm9yRWFjaChmdW5jdGlvbiAodikge1xuICAgICAgZGlnaXRzLnVuc2hpZnQocGFyc2VGbG9hdCh2LCAxMCkpO1xuICAgIH0pO1xuXG4gICAgdmFsdWUgPSAwLjA7XG4gICAgYmFzZSA9IDE7XG5cbiAgICBkaWdpdHMuZm9yRWFjaChmdW5jdGlvbiAoZCkge1xuICAgICAgdmFsdWUgKz0gZCAqIGJhc2U7XG4gICAgICBiYXNlICo9IDYwO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNpZ24gKiB2YWx1ZTtcblxuICB9XG4gIHJldHVybiBzaWduICogcGFyc2VGbG9hdCh2YWx1ZSwgMTApO1xufVxuXG5cbnZhciBTQ0lFTlRJRklDX1dJVEhPVVRfRE9UID0gL15bLStdP1swLTldK2UvO1xuXG5mdW5jdGlvbiByZXByZXNlbnRZYW1sRmxvYXQob2JqZWN0LCBzdHlsZSkge1xuICB2YXIgcmVzO1xuXG4gIGlmIChpc05hTihvYmplY3QpKSB7XG4gICAgc3dpdGNoIChzdHlsZSkge1xuICAgICAgY2FzZSAnbG93ZXJjYXNlJzogcmV0dXJuICcubmFuJztcbiAgICAgIGNhc2UgJ3VwcGVyY2FzZSc6IHJldHVybiAnLk5BTic7XG4gICAgICBjYXNlICdjYW1lbGNhc2UnOiByZXR1cm4gJy5OYU4nO1xuICAgIH1cbiAgfSBlbHNlIGlmIChOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFkgPT09IG9iamVjdCkge1xuICAgIHN3aXRjaCAoc3R5bGUpIHtcbiAgICAgIGNhc2UgJ2xvd2VyY2FzZSc6IHJldHVybiAnLmluZic7XG4gICAgICBjYXNlICd1cHBlcmNhc2UnOiByZXR1cm4gJy5JTkYnO1xuICAgICAgY2FzZSAnY2FtZWxjYXNlJzogcmV0dXJuICcuSW5mJztcbiAgICB9XG4gIH0gZWxzZSBpZiAoTnVtYmVyLk5FR0FUSVZFX0lORklOSVRZID09PSBvYmplY3QpIHtcbiAgICBzd2l0Y2ggKHN0eWxlKSB7XG4gICAgICBjYXNlICdsb3dlcmNhc2UnOiByZXR1cm4gJy0uaW5mJztcbiAgICAgIGNhc2UgJ3VwcGVyY2FzZSc6IHJldHVybiAnLS5JTkYnO1xuICAgICAgY2FzZSAnY2FtZWxjYXNlJzogcmV0dXJuICctLkluZic7XG4gICAgfVxuICB9IGVsc2UgaWYgKGNvbW1vbi5pc05lZ2F0aXZlWmVybyhvYmplY3QpKSB7XG4gICAgcmV0dXJuICctMC4wJztcbiAgfVxuXG4gIHJlcyA9IG9iamVjdC50b1N0cmluZygxMCk7XG5cbiAgLy8gSlMgc3RyaW5naWZpZXIgY2FuIGJ1aWxkIHNjaWVudGlmaWMgZm9ybWF0IHdpdGhvdXQgZG90czogNWUtMTAwLFxuICAvLyB3aGlsZSBZQU1MIHJlcXVyZXMgZG90OiA1LmUtMTAwLiBGaXggaXQgd2l0aCBzaW1wbGUgaGFja1xuXG4gIHJldHVybiBTQ0lFTlRJRklDX1dJVEhPVVRfRE9ULnRlc3QocmVzKSA/IHJlcy5yZXBsYWNlKCdlJywgJy5lJykgOiByZXM7XG59XG5cbmZ1bmN0aW9uIGlzRmxvYXQob2JqZWN0KSB7XG4gIHJldHVybiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCkgPT09ICdbb2JqZWN0IE51bWJlcl0nKSAmJlxuICAgICAgICAgKG9iamVjdCAlIDEgIT09IDAgfHwgY29tbW9uLmlzTmVnYXRpdmVaZXJvKG9iamVjdCkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBUeXBlKCd0YWc6eWFtbC5vcmcsMjAwMjpmbG9hdCcsIHtcbiAga2luZDogJ3NjYWxhcicsXG4gIHJlc29sdmU6IHJlc29sdmVZYW1sRmxvYXQsXG4gIGNvbnN0cnVjdDogY29uc3RydWN0WWFtbEZsb2F0LFxuICBwcmVkaWNhdGU6IGlzRmxvYXQsXG4gIHJlcHJlc2VudDogcmVwcmVzZW50WWFtbEZsb2F0LFxuICBkZWZhdWx0U3R5bGU6ICdsb3dlcmNhc2UnXG59KTtcbiIsICIvLyBTdGFuZGFyZCBZQU1MJ3MgSlNPTiBzY2hlbWEuXG4vLyBodHRwOi8vd3d3LnlhbWwub3JnL3NwZWMvMS4yL3NwZWMuaHRtbCNpZDI4MDMyMzFcbi8vXG4vLyBOT1RFOiBKUy1ZQU1MIGRvZXMgbm90IHN1cHBvcnQgc2NoZW1hLXNwZWNpZmljIHRhZyByZXNvbHV0aW9uIHJlc3RyaWN0aW9ucy5cbi8vIFNvLCB0aGlzIHNjaGVtYSBpcyBub3Qgc3VjaCBzdHJpY3QgYXMgZGVmaW5lZCBpbiB0aGUgWUFNTCBzcGVjaWZpY2F0aW9uLlxuLy8gSXQgYWxsb3dzIG51bWJlcnMgaW4gYmluYXJ5IG5vdGFpb24sIHVzZSBgTnVsbGAgYW5kIGBOVUxMYCBhcyBgbnVsbGAsIGV0Yy5cblxuXG4ndXNlIHN0cmljdCc7XG5cblxudmFyIFNjaGVtYSA9IHJlcXVpcmUoJy4uL3NjaGVtYScpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFNjaGVtYSh7XG4gIGluY2x1ZGU6IFtcbiAgICByZXF1aXJlKCcuL2ZhaWxzYWZlJylcbiAgXSxcbiAgaW1wbGljaXQ6IFtcbiAgICByZXF1aXJlKCcuLi90eXBlL251bGwnKSxcbiAgICByZXF1aXJlKCcuLi90eXBlL2Jvb2wnKSxcbiAgICByZXF1aXJlKCcuLi90eXBlL2ludCcpLFxuICAgIHJlcXVpcmUoJy4uL3R5cGUvZmxvYXQnKVxuICBdXG59KTtcbiIsICIvLyBTdGFuZGFyZCBZQU1MJ3MgQ29yZSBzY2hlbWEuXG4vLyBodHRwOi8vd3d3LnlhbWwub3JnL3NwZWMvMS4yL3NwZWMuaHRtbCNpZDI4MDQ5MjNcbi8vXG4vLyBOT1RFOiBKUy1ZQU1MIGRvZXMgbm90IHN1cHBvcnQgc2NoZW1hLXNwZWNpZmljIHRhZyByZXNvbHV0aW9uIHJlc3RyaWN0aW9ucy5cbi8vIFNvLCBDb3JlIHNjaGVtYSBoYXMgbm8gZGlzdGluY3Rpb25zIGZyb20gSlNPTiBzY2hlbWEgaXMgSlMtWUFNTC5cblxuXG4ndXNlIHN0cmljdCc7XG5cblxudmFyIFNjaGVtYSA9IHJlcXVpcmUoJy4uL3NjaGVtYScpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFNjaGVtYSh7XG4gIGluY2x1ZGU6IFtcbiAgICByZXF1aXJlKCcuL2pzb24nKVxuICBdXG59KTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBUeXBlID0gcmVxdWlyZSgnLi4vdHlwZScpO1xuXG52YXIgWUFNTF9EQVRFX1JFR0VYUCA9IG5ldyBSZWdFeHAoXG4gICdeKFswLTldWzAtOV1bMC05XVswLTldKScgICAgICAgICAgKyAvLyBbMV0geWVhclxuICAnLShbMC05XVswLTldKScgICAgICAgICAgICAgICAgICAgICsgLy8gWzJdIG1vbnRoXG4gICctKFswLTldWzAtOV0pJCcpOyAgICAgICAgICAgICAgICAgICAvLyBbM10gZGF5XG5cbnZhciBZQU1MX1RJTUVTVEFNUF9SRUdFWFAgPSBuZXcgUmVnRXhwKFxuICAnXihbMC05XVswLTldWzAtOV1bMC05XSknICAgICAgICAgICsgLy8gWzFdIHllYXJcbiAgJy0oWzAtOV1bMC05XT8pJyAgICAgICAgICAgICAgICAgICArIC8vIFsyXSBtb250aFxuICAnLShbMC05XVswLTldPyknICAgICAgICAgICAgICAgICAgICsgLy8gWzNdIGRheVxuICAnKD86W1R0XXxbIFxcXFx0XSspJyAgICAgICAgICAgICAgICAgKyAvLyAuLi5cbiAgJyhbMC05XVswLTldPyknICAgICAgICAgICAgICAgICAgICArIC8vIFs0XSBob3VyXG4gICc6KFswLTldWzAtOV0pJyAgICAgICAgICAgICAgICAgICAgKyAvLyBbNV0gbWludXRlXG4gICc6KFswLTldWzAtOV0pJyAgICAgICAgICAgICAgICAgICAgKyAvLyBbNl0gc2Vjb25kXG4gICcoPzpcXFxcLihbMC05XSopKT8nICAgICAgICAgICAgICAgICArIC8vIFs3XSBmcmFjdGlvblxuICAnKD86WyBcXFxcdF0qKFp8KFstK10pKFswLTldWzAtOV0/KScgKyAvLyBbOF0gdHogWzldIHR6X3NpZ24gWzEwXSB0el9ob3VyXG4gICcoPzo6KFswLTldWzAtOV0pKT8pKT8kJyk7ICAgICAgICAgICAvLyBbMTFdIHR6X21pbnV0ZVxuXG5mdW5jdGlvbiByZXNvbHZlWWFtbFRpbWVzdGFtcChkYXRhKSB7XG4gIGlmIChkYXRhID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG4gIGlmIChZQU1MX0RBVEVfUkVHRVhQLmV4ZWMoZGF0YSkgIT09IG51bGwpIHJldHVybiB0cnVlO1xuICBpZiAoWUFNTF9USU1FU1RBTVBfUkVHRVhQLmV4ZWMoZGF0YSkgIT09IG51bGwpIHJldHVybiB0cnVlO1xuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGNvbnN0cnVjdFlhbWxUaW1lc3RhbXAoZGF0YSkge1xuICB2YXIgbWF0Y2gsIHllYXIsIG1vbnRoLCBkYXksIGhvdXIsIG1pbnV0ZSwgc2Vjb25kLCBmcmFjdGlvbiA9IDAsXG4gICAgICBkZWx0YSA9IG51bGwsIHR6X2hvdXIsIHR6X21pbnV0ZSwgZGF0ZTtcblxuICBtYXRjaCA9IFlBTUxfREFURV9SRUdFWFAuZXhlYyhkYXRhKTtcbiAgaWYgKG1hdGNoID09PSBudWxsKSBtYXRjaCA9IFlBTUxfVElNRVNUQU1QX1JFR0VYUC5leGVjKGRhdGEpO1xuXG4gIGlmIChtYXRjaCA9PT0gbnVsbCkgdGhyb3cgbmV3IEVycm9yKCdEYXRlIHJlc29sdmUgZXJyb3InKTtcblxuICAvLyBtYXRjaDogWzFdIHllYXIgWzJdIG1vbnRoIFszXSBkYXlcblxuICB5ZWFyID0gKyhtYXRjaFsxXSk7XG4gIG1vbnRoID0gKyhtYXRjaFsyXSkgLSAxOyAvLyBKUyBtb250aCBzdGFydHMgd2l0aCAwXG4gIGRheSA9ICsobWF0Y2hbM10pO1xuXG4gIGlmICghbWF0Y2hbNF0pIHsgLy8gbm8gaG91clxuICAgIHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQyh5ZWFyLCBtb250aCwgZGF5KSk7XG4gIH1cblxuICAvLyBtYXRjaDogWzRdIGhvdXIgWzVdIG1pbnV0ZSBbNl0gc2Vjb25kIFs3XSBmcmFjdGlvblxuXG4gIGhvdXIgPSArKG1hdGNoWzRdKTtcbiAgbWludXRlID0gKyhtYXRjaFs1XSk7XG4gIHNlY29uZCA9ICsobWF0Y2hbNl0pO1xuXG4gIGlmIChtYXRjaFs3XSkge1xuICAgIGZyYWN0aW9uID0gbWF0Y2hbN10uc2xpY2UoMCwgMyk7XG4gICAgd2hpbGUgKGZyYWN0aW9uLmxlbmd0aCA8IDMpIHsgLy8gbWlsbGktc2Vjb25kc1xuICAgICAgZnJhY3Rpb24gKz0gJzAnO1xuICAgIH1cbiAgICBmcmFjdGlvbiA9ICtmcmFjdGlvbjtcbiAgfVxuXG4gIC8vIG1hdGNoOiBbOF0gdHogWzldIHR6X3NpZ24gWzEwXSB0el9ob3VyIFsxMV0gdHpfbWludXRlXG5cbiAgaWYgKG1hdGNoWzldKSB7XG4gICAgdHpfaG91ciA9ICsobWF0Y2hbMTBdKTtcbiAgICB0el9taW51dGUgPSArKG1hdGNoWzExXSB8fCAwKTtcbiAgICBkZWx0YSA9ICh0el9ob3VyICogNjAgKyB0el9taW51dGUpICogNjAwMDA7IC8vIGRlbHRhIGluIG1pbGktc2Vjb25kc1xuICAgIGlmIChtYXRjaFs5XSA9PT0gJy0nKSBkZWx0YSA9IC1kZWx0YTtcbiAgfVxuXG4gIGRhdGUgPSBuZXcgRGF0ZShEYXRlLlVUQyh5ZWFyLCBtb250aCwgZGF5LCBob3VyLCBtaW51dGUsIHNlY29uZCwgZnJhY3Rpb24pKTtcblxuICBpZiAoZGVsdGEpIGRhdGUuc2V0VGltZShkYXRlLmdldFRpbWUoKSAtIGRlbHRhKTtcblxuICByZXR1cm4gZGF0ZTtcbn1cblxuZnVuY3Rpb24gcmVwcmVzZW50WWFtbFRpbWVzdGFtcChvYmplY3QgLyosIHN0eWxlKi8pIHtcbiAgcmV0dXJuIG9iamVjdC50b0lTT1N0cmluZygpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBUeXBlKCd0YWc6eWFtbC5vcmcsMjAwMjp0aW1lc3RhbXAnLCB7XG4gIGtpbmQ6ICdzY2FsYXInLFxuICByZXNvbHZlOiByZXNvbHZlWWFtbFRpbWVzdGFtcCxcbiAgY29uc3RydWN0OiBjb25zdHJ1Y3RZYW1sVGltZXN0YW1wLFxuICBpbnN0YW5jZU9mOiBEYXRlLFxuICByZXByZXNlbnQ6IHJlcHJlc2VudFlhbWxUaW1lc3RhbXBcbn0pO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIFR5cGUgPSByZXF1aXJlKCcuLi90eXBlJyk7XG5cbmZ1bmN0aW9uIHJlc29sdmVZYW1sTWVyZ2UoZGF0YSkge1xuICByZXR1cm4gZGF0YSA9PT0gJzw8JyB8fCBkYXRhID09PSBudWxsO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBUeXBlKCd0YWc6eWFtbC5vcmcsMjAwMjptZXJnZScsIHtcbiAga2luZDogJ3NjYWxhcicsXG4gIHJlc29sdmU6IHJlc29sdmVZYW1sTWVyZ2Vcbn0pO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuLyplc2xpbnQtZGlzYWJsZSBuby1iaXR3aXNlKi9cblxudmFyIE5vZGVCdWZmZXI7XG5cbnRyeSB7XG4gIC8vIEEgdHJpY2sgZm9yIGJyb3dzZXJpZmllZCB2ZXJzaW9uLCB0byBub3QgaW5jbHVkZSBgQnVmZmVyYCBzaGltXG4gIHZhciBfcmVxdWlyZSA9IHJlcXVpcmU7XG4gIE5vZGVCdWZmZXIgPSBfcmVxdWlyZSgnYnVmZmVyJykuQnVmZmVyO1xufSBjYXRjaCAoX18pIHt9XG5cbnZhciBUeXBlICAgICAgID0gcmVxdWlyZSgnLi4vdHlwZScpO1xuXG5cbi8vIFsgNjQsIDY1LCA2NiBdIC0+IFsgcGFkZGluZywgQ1IsIExGIF1cbnZhciBCQVNFNjRfTUFQID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89XFxuXFxyJztcblxuXG5mdW5jdGlvbiByZXNvbHZlWWFtbEJpbmFyeShkYXRhKSB7XG4gIGlmIChkYXRhID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgdmFyIGNvZGUsIGlkeCwgYml0bGVuID0gMCwgbWF4ID0gZGF0YS5sZW5ndGgsIG1hcCA9IEJBU0U2NF9NQVA7XG5cbiAgLy8gQ29udmVydCBvbmUgYnkgb25lLlxuICBmb3IgKGlkeCA9IDA7IGlkeCA8IG1heDsgaWR4KyspIHtcbiAgICBjb2RlID0gbWFwLmluZGV4T2YoZGF0YS5jaGFyQXQoaWR4KSk7XG5cbiAgICAvLyBTa2lwIENSL0xGXG4gICAgaWYgKGNvZGUgPiA2NCkgY29udGludWU7XG5cbiAgICAvLyBGYWlsIG9uIGlsbGVnYWwgY2hhcmFjdGVyc1xuICAgIGlmIChjb2RlIDwgMCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgYml0bGVuICs9IDY7XG4gIH1cblxuICAvLyBJZiB0aGVyZSBhcmUgYW55IGJpdHMgbGVmdCwgc291cmNlIHdhcyBjb3JydXB0ZWRcbiAgcmV0dXJuIChiaXRsZW4gJSA4KSA9PT0gMDtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0WWFtbEJpbmFyeShkYXRhKSB7XG4gIHZhciBpZHgsIHRhaWxiaXRzLFxuICAgICAgaW5wdXQgPSBkYXRhLnJlcGxhY2UoL1tcXHJcXG49XS9nLCAnJyksIC8vIHJlbW92ZSBDUi9MRiAmIHBhZGRpbmcgdG8gc2ltcGxpZnkgc2NhblxuICAgICAgbWF4ID0gaW5wdXQubGVuZ3RoLFxuICAgICAgbWFwID0gQkFTRTY0X01BUCxcbiAgICAgIGJpdHMgPSAwLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgLy8gQ29sbGVjdCBieSA2KjQgYml0cyAoMyBieXRlcylcblxuICBmb3IgKGlkeCA9IDA7IGlkeCA8IG1heDsgaWR4KyspIHtcbiAgICBpZiAoKGlkeCAlIDQgPT09IDApICYmIGlkeCkge1xuICAgICAgcmVzdWx0LnB1c2goKGJpdHMgPj4gMTYpICYgMHhGRik7XG4gICAgICByZXN1bHQucHVzaCgoYml0cyA+PiA4KSAmIDB4RkYpO1xuICAgICAgcmVzdWx0LnB1c2goYml0cyAmIDB4RkYpO1xuICAgIH1cblxuICAgIGJpdHMgPSAoYml0cyA8PCA2KSB8IG1hcC5pbmRleE9mKGlucHV0LmNoYXJBdChpZHgpKTtcbiAgfVxuXG4gIC8vIER1bXAgdGFpbFxuXG4gIHRhaWxiaXRzID0gKG1heCAlIDQpICogNjtcblxuICBpZiAodGFpbGJpdHMgPT09IDApIHtcbiAgICByZXN1bHQucHVzaCgoYml0cyA+PiAxNikgJiAweEZGKTtcbiAgICByZXN1bHQucHVzaCgoYml0cyA+PiA4KSAmIDB4RkYpO1xuICAgIHJlc3VsdC5wdXNoKGJpdHMgJiAweEZGKTtcbiAgfSBlbHNlIGlmICh0YWlsYml0cyA9PT0gMTgpIHtcbiAgICByZXN1bHQucHVzaCgoYml0cyA+PiAxMCkgJiAweEZGKTtcbiAgICByZXN1bHQucHVzaCgoYml0cyA+PiAyKSAmIDB4RkYpO1xuICB9IGVsc2UgaWYgKHRhaWxiaXRzID09PSAxMikge1xuICAgIHJlc3VsdC5wdXNoKChiaXRzID4+IDQpICYgMHhGRik7XG4gIH1cblxuICAvLyBXcmFwIGludG8gQnVmZmVyIGZvciBOb2RlSlMgYW5kIGxlYXZlIEFycmF5IGZvciBicm93c2VyXG4gIGlmIChOb2RlQnVmZmVyKSB7XG4gICAgLy8gU3VwcG9ydCBub2RlIDYuKyBCdWZmZXIgQVBJIHdoZW4gYXZhaWxhYmxlXG4gICAgcmV0dXJuIE5vZGVCdWZmZXIuZnJvbSA/IE5vZGVCdWZmZXIuZnJvbShyZXN1bHQpIDogbmV3IE5vZGVCdWZmZXIocmVzdWx0KTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIHJlcHJlc2VudFlhbWxCaW5hcnkob2JqZWN0IC8qLCBzdHlsZSovKSB7XG4gIHZhciByZXN1bHQgPSAnJywgYml0cyA9IDAsIGlkeCwgdGFpbCxcbiAgICAgIG1heCA9IG9iamVjdC5sZW5ndGgsXG4gICAgICBtYXAgPSBCQVNFNjRfTUFQO1xuXG4gIC8vIENvbnZlcnQgZXZlcnkgdGhyZWUgYnl0ZXMgdG8gNCBBU0NJSSBjaGFyYWN0ZXJzLlxuXG4gIGZvciAoaWR4ID0gMDsgaWR4IDwgbWF4OyBpZHgrKykge1xuICAgIGlmICgoaWR4ICUgMyA9PT0gMCkgJiYgaWR4KSB7XG4gICAgICByZXN1bHQgKz0gbWFwWyhiaXRzID4+IDE4KSAmIDB4M0ZdO1xuICAgICAgcmVzdWx0ICs9IG1hcFsoYml0cyA+PiAxMikgJiAweDNGXTtcbiAgICAgIHJlc3VsdCArPSBtYXBbKGJpdHMgPj4gNikgJiAweDNGXTtcbiAgICAgIHJlc3VsdCArPSBtYXBbYml0cyAmIDB4M0ZdO1xuICAgIH1cblxuICAgIGJpdHMgPSAoYml0cyA8PCA4KSArIG9iamVjdFtpZHhdO1xuICB9XG5cbiAgLy8gRHVtcCB0YWlsXG5cbiAgdGFpbCA9IG1heCAlIDM7XG5cbiAgaWYgKHRhaWwgPT09IDApIHtcbiAgICByZXN1bHQgKz0gbWFwWyhiaXRzID4+IDE4KSAmIDB4M0ZdO1xuICAgIHJlc3VsdCArPSBtYXBbKGJpdHMgPj4gMTIpICYgMHgzRl07XG4gICAgcmVzdWx0ICs9IG1hcFsoYml0cyA+PiA2KSAmIDB4M0ZdO1xuICAgIHJlc3VsdCArPSBtYXBbYml0cyAmIDB4M0ZdO1xuICB9IGVsc2UgaWYgKHRhaWwgPT09IDIpIHtcbiAgICByZXN1bHQgKz0gbWFwWyhiaXRzID4+IDEwKSAmIDB4M0ZdO1xuICAgIHJlc3VsdCArPSBtYXBbKGJpdHMgPj4gNCkgJiAweDNGXTtcbiAgICByZXN1bHQgKz0gbWFwWyhiaXRzIDw8IDIpICYgMHgzRl07XG4gICAgcmVzdWx0ICs9IG1hcFs2NF07XG4gIH0gZWxzZSBpZiAodGFpbCA9PT0gMSkge1xuICAgIHJlc3VsdCArPSBtYXBbKGJpdHMgPj4gMikgJiAweDNGXTtcbiAgICByZXN1bHQgKz0gbWFwWyhiaXRzIDw8IDQpICYgMHgzRl07XG4gICAgcmVzdWx0ICs9IG1hcFs2NF07XG4gICAgcmVzdWx0ICs9IG1hcFs2NF07XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBpc0JpbmFyeShvYmplY3QpIHtcbiAgcmV0dXJuIE5vZGVCdWZmZXIgJiYgTm9kZUJ1ZmZlci5pc0J1ZmZlcihvYmplY3QpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBUeXBlKCd0YWc6eWFtbC5vcmcsMjAwMjpiaW5hcnknLCB7XG4gIGtpbmQ6ICdzY2FsYXInLFxuICByZXNvbHZlOiByZXNvbHZlWWFtbEJpbmFyeSxcbiAgY29uc3RydWN0OiBjb25zdHJ1Y3RZYW1sQmluYXJ5LFxuICBwcmVkaWNhdGU6IGlzQmluYXJ5LFxuICByZXByZXNlbnQ6IHJlcHJlc2VudFlhbWxCaW5hcnlcbn0pO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIFR5cGUgPSByZXF1aXJlKCcuLi90eXBlJyk7XG5cbnZhciBfaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIF90b1N0cmluZyAgICAgICA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbmZ1bmN0aW9uIHJlc29sdmVZYW1sT21hcChkYXRhKSB7XG4gIGlmIChkYXRhID09PSBudWxsKSByZXR1cm4gdHJ1ZTtcblxuICB2YXIgb2JqZWN0S2V5cyA9IFtdLCBpbmRleCwgbGVuZ3RoLCBwYWlyLCBwYWlyS2V5LCBwYWlySGFzS2V5LFxuICAgICAgb2JqZWN0ID0gZGF0YTtcblxuICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gb2JqZWN0Lmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICBwYWlyID0gb2JqZWN0W2luZGV4XTtcbiAgICBwYWlySGFzS2V5ID0gZmFsc2U7XG5cbiAgICBpZiAoX3RvU3RyaW5nLmNhbGwocGFpcikgIT09ICdbb2JqZWN0IE9iamVjdF0nKSByZXR1cm4gZmFsc2U7XG5cbiAgICBmb3IgKHBhaXJLZXkgaW4gcGFpcikge1xuICAgICAgaWYgKF9oYXNPd25Qcm9wZXJ0eS5jYWxsKHBhaXIsIHBhaXJLZXkpKSB7XG4gICAgICAgIGlmICghcGFpckhhc0tleSkgcGFpckhhc0tleSA9IHRydWU7XG4gICAgICAgIGVsc2UgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghcGFpckhhc0tleSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgaWYgKG9iamVjdEtleXMuaW5kZXhPZihwYWlyS2V5KSA9PT0gLTEpIG9iamVjdEtleXMucHVzaChwYWlyS2V5KTtcbiAgICBlbHNlIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBjb25zdHJ1Y3RZYW1sT21hcChkYXRhKSB7XG4gIHJldHVybiBkYXRhICE9PSBudWxsID8gZGF0YSA6IFtdO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBUeXBlKCd0YWc6eWFtbC5vcmcsMjAwMjpvbWFwJywge1xuICBraW5kOiAnc2VxdWVuY2UnLFxuICByZXNvbHZlOiByZXNvbHZlWWFtbE9tYXAsXG4gIGNvbnN0cnVjdDogY29uc3RydWN0WWFtbE9tYXBcbn0pO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIFR5cGUgPSByZXF1aXJlKCcuLi90eXBlJyk7XG5cbnZhciBfdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG5mdW5jdGlvbiByZXNvbHZlWWFtbFBhaXJzKGRhdGEpIHtcbiAgaWYgKGRhdGEgPT09IG51bGwpIHJldHVybiB0cnVlO1xuXG4gIHZhciBpbmRleCwgbGVuZ3RoLCBwYWlyLCBrZXlzLCByZXN1bHQsXG4gICAgICBvYmplY3QgPSBkYXRhO1xuXG4gIHJlc3VsdCA9IG5ldyBBcnJheShvYmplY3QubGVuZ3RoKTtcblxuICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gb2JqZWN0Lmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICBwYWlyID0gb2JqZWN0W2luZGV4XTtcblxuICAgIGlmIChfdG9TdHJpbmcuY2FsbChwYWlyKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHJldHVybiBmYWxzZTtcblxuICAgIGtleXMgPSBPYmplY3Qua2V5cyhwYWlyKTtcblxuICAgIGlmIChrZXlzLmxlbmd0aCAhPT0gMSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgcmVzdWx0W2luZGV4XSA9IFsga2V5c1swXSwgcGFpcltrZXlzWzBdXSBdO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGNvbnN0cnVjdFlhbWxQYWlycyhkYXRhKSB7XG4gIGlmIChkYXRhID09PSBudWxsKSByZXR1cm4gW107XG5cbiAgdmFyIGluZGV4LCBsZW5ndGgsIHBhaXIsIGtleXMsIHJlc3VsdCxcbiAgICAgIG9iamVjdCA9IGRhdGE7XG5cbiAgcmVzdWx0ID0gbmV3IEFycmF5KG9iamVjdC5sZW5ndGgpO1xuXG4gIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSBvYmplY3QubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgIHBhaXIgPSBvYmplY3RbaW5kZXhdO1xuXG4gICAga2V5cyA9IE9iamVjdC5rZXlzKHBhaXIpO1xuXG4gICAgcmVzdWx0W2luZGV4XSA9IFsga2V5c1swXSwgcGFpcltrZXlzWzBdXSBdO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgVHlwZSgndGFnOnlhbWwub3JnLDIwMDI6cGFpcnMnLCB7XG4gIGtpbmQ6ICdzZXF1ZW5jZScsXG4gIHJlc29sdmU6IHJlc29sdmVZYW1sUGFpcnMsXG4gIGNvbnN0cnVjdDogY29uc3RydWN0WWFtbFBhaXJzXG59KTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBUeXBlID0gcmVxdWlyZSgnLi4vdHlwZScpO1xuXG52YXIgX2hhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuZnVuY3Rpb24gcmVzb2x2ZVlhbWxTZXQoZGF0YSkge1xuICBpZiAoZGF0YSA9PT0gbnVsbCkgcmV0dXJuIHRydWU7XG5cbiAgdmFyIGtleSwgb2JqZWN0ID0gZGF0YTtcblxuICBmb3IgKGtleSBpbiBvYmplY3QpIHtcbiAgICBpZiAoX2hhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSB7XG4gICAgICBpZiAob2JqZWN0W2tleV0gIT09IG51bGwpIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0WWFtbFNldChkYXRhKSB7XG4gIHJldHVybiBkYXRhICE9PSBudWxsID8gZGF0YSA6IHt9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBUeXBlKCd0YWc6eWFtbC5vcmcsMjAwMjpzZXQnLCB7XG4gIGtpbmQ6ICdtYXBwaW5nJyxcbiAgcmVzb2x2ZTogcmVzb2x2ZVlhbWxTZXQsXG4gIGNvbnN0cnVjdDogY29uc3RydWN0WWFtbFNldFxufSk7XG4iLCAiLy8gSlMtWUFNTCdzIGRlZmF1bHQgc2NoZW1hIGZvciBgc2FmZUxvYWRgIGZ1bmN0aW9uLlxuLy8gSXQgaXMgbm90IGRlc2NyaWJlZCBpbiB0aGUgWUFNTCBzcGVjaWZpY2F0aW9uLlxuLy9cbi8vIFRoaXMgc2NoZW1hIGlzIGJhc2VkIG9uIHN0YW5kYXJkIFlBTUwncyBDb3JlIHNjaGVtYSBhbmQgaW5jbHVkZXMgbW9zdCBvZlxuLy8gZXh0cmEgdHlwZXMgZGVzY3JpYmVkIGF0IFlBTUwgdGFnIHJlcG9zaXRvcnkuIChodHRwOi8veWFtbC5vcmcvdHlwZS8pXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG5cbnZhciBTY2hlbWEgPSByZXF1aXJlKCcuLi9zY2hlbWEnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBTY2hlbWEoe1xuICBpbmNsdWRlOiBbXG4gICAgcmVxdWlyZSgnLi9jb3JlJylcbiAgXSxcbiAgaW1wbGljaXQ6IFtcbiAgICByZXF1aXJlKCcuLi90eXBlL3RpbWVzdGFtcCcpLFxuICAgIHJlcXVpcmUoJy4uL3R5cGUvbWVyZ2UnKVxuICBdLFxuICBleHBsaWNpdDogW1xuICAgIHJlcXVpcmUoJy4uL3R5cGUvYmluYXJ5JyksXG4gICAgcmVxdWlyZSgnLi4vdHlwZS9vbWFwJyksXG4gICAgcmVxdWlyZSgnLi4vdHlwZS9wYWlycycpLFxuICAgIHJlcXVpcmUoJy4uL3R5cGUvc2V0JylcbiAgXVxufSk7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgVHlwZSA9IHJlcXVpcmUoJy4uLy4uL3R5cGUnKTtcblxuZnVuY3Rpb24gcmVzb2x2ZUphdmFzY3JpcHRVbmRlZmluZWQoKSB7XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBjb25zdHJ1Y3RKYXZhc2NyaXB0VW5kZWZpbmVkKCkge1xuICAvKmVzbGludC1kaXNhYmxlIG5vLXVuZGVmaW5lZCovXG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIHJlcHJlc2VudEphdmFzY3JpcHRVbmRlZmluZWQoKSB7XG4gIHJldHVybiAnJztcbn1cblxuZnVuY3Rpb24gaXNVbmRlZmluZWQob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAndW5kZWZpbmVkJztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgVHlwZSgndGFnOnlhbWwub3JnLDIwMDI6anMvdW5kZWZpbmVkJywge1xuICBraW5kOiAnc2NhbGFyJyxcbiAgcmVzb2x2ZTogcmVzb2x2ZUphdmFzY3JpcHRVbmRlZmluZWQsXG4gIGNvbnN0cnVjdDogY29uc3RydWN0SmF2YXNjcmlwdFVuZGVmaW5lZCxcbiAgcHJlZGljYXRlOiBpc1VuZGVmaW5lZCxcbiAgcmVwcmVzZW50OiByZXByZXNlbnRKYXZhc2NyaXB0VW5kZWZpbmVkXG59KTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBUeXBlID0gcmVxdWlyZSgnLi4vLi4vdHlwZScpO1xuXG5mdW5jdGlvbiByZXNvbHZlSmF2YXNjcmlwdFJlZ0V4cChkYXRhKSB7XG4gIGlmIChkYXRhID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG4gIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGZhbHNlO1xuXG4gIHZhciByZWdleHAgPSBkYXRhLFxuICAgICAgdGFpbCAgID0gL1xcLyhbZ2ltXSopJC8uZXhlYyhkYXRhKSxcbiAgICAgIG1vZGlmaWVycyA9ICcnO1xuXG4gIC8vIGlmIHJlZ2V4cCBzdGFydHMgd2l0aCAnLycgaXQgY2FuIGhhdmUgbW9kaWZpZXJzIGFuZCBtdXN0IGJlIHByb3Blcmx5IGNsb3NlZFxuICAvLyBgL2Zvby9naW1gIC0gbW9kaWZpZXJzIHRhaWwgY2FuIGJlIG1heGltdW0gMyBjaGFyc1xuICBpZiAocmVnZXhwWzBdID09PSAnLycpIHtcbiAgICBpZiAodGFpbCkgbW9kaWZpZXJzID0gdGFpbFsxXTtcblxuICAgIGlmIChtb2RpZmllcnMubGVuZ3RoID4gMykgcmV0dXJuIGZhbHNlO1xuICAgIC8vIGlmIGV4cHJlc3Npb24gc3RhcnRzIHdpdGggLywgaXMgc2hvdWxkIGJlIHByb3Blcmx5IHRlcm1pbmF0ZWRcbiAgICBpZiAocmVnZXhwW3JlZ2V4cC5sZW5ndGggLSBtb2RpZmllcnMubGVuZ3RoIC0gMV0gIT09ICcvJykgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGNvbnN0cnVjdEphdmFzY3JpcHRSZWdFeHAoZGF0YSkge1xuICB2YXIgcmVnZXhwID0gZGF0YSxcbiAgICAgIHRhaWwgICA9IC9cXC8oW2dpbV0qKSQvLmV4ZWMoZGF0YSksXG4gICAgICBtb2RpZmllcnMgPSAnJztcblxuICAvLyBgL2Zvby9naW1gIC0gdGFpbCBjYW4gYmUgbWF4aW11bSA0IGNoYXJzXG4gIGlmIChyZWdleHBbMF0gPT09ICcvJykge1xuICAgIGlmICh0YWlsKSBtb2RpZmllcnMgPSB0YWlsWzFdO1xuICAgIHJlZ2V4cCA9IHJlZ2V4cC5zbGljZSgxLCByZWdleHAubGVuZ3RoIC0gbW9kaWZpZXJzLmxlbmd0aCAtIDEpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBSZWdFeHAocmVnZXhwLCBtb2RpZmllcnMpO1xufVxuXG5mdW5jdGlvbiByZXByZXNlbnRKYXZhc2NyaXB0UmVnRXhwKG9iamVjdCAvKiwgc3R5bGUqLykge1xuICB2YXIgcmVzdWx0ID0gJy8nICsgb2JqZWN0LnNvdXJjZSArICcvJztcblxuICBpZiAob2JqZWN0Lmdsb2JhbCkgcmVzdWx0ICs9ICdnJztcbiAgaWYgKG9iamVjdC5tdWx0aWxpbmUpIHJlc3VsdCArPSAnbSc7XG4gIGlmIChvYmplY3QuaWdub3JlQ2FzZSkgcmVzdWx0ICs9ICdpJztcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBpc1JlZ0V4cChvYmplY3QpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmplY3QpID09PSAnW29iamVjdCBSZWdFeHBdJztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgVHlwZSgndGFnOnlhbWwub3JnLDIwMDI6anMvcmVnZXhwJywge1xuICBraW5kOiAnc2NhbGFyJyxcbiAgcmVzb2x2ZTogcmVzb2x2ZUphdmFzY3JpcHRSZWdFeHAsXG4gIGNvbnN0cnVjdDogY29uc3RydWN0SmF2YXNjcmlwdFJlZ0V4cCxcbiAgcHJlZGljYXRlOiBpc1JlZ0V4cCxcbiAgcmVwcmVzZW50OiByZXByZXNlbnRKYXZhc2NyaXB0UmVnRXhwXG59KTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBlc3ByaW1hO1xuXG4vLyBCcm93c2VyaWZpZWQgdmVyc2lvbiBkb2VzIG5vdCBoYXZlIGVzcHJpbWFcbi8vXG4vLyAxLiBGb3Igbm9kZS5qcyBqdXN0IHJlcXVpcmUgbW9kdWxlIGFzIGRlcHNcbi8vIDIuIEZvciBicm93c2VyIHRyeSB0byByZXF1aXJlIG11ZHVsZSB2aWEgZXh0ZXJuYWwgQU1EIHN5c3RlbS5cbi8vICAgIElmIG5vdCBmb3VuZCAtIHRyeSB0byBmYWxsYmFjayB0byB3aW5kb3cuZXNwcmltYS4gSWYgbm90XG4vLyAgICBmb3VuZCB0b28gLSB0aGVuIGZhaWwgdG8gcGFyc2UuXG4vL1xudHJ5IHtcbiAgLy8gd29ya2Fyb3VuZCB0byBleGNsdWRlIHBhY2thZ2UgZnJvbSBicm93c2VyaWZ5IGxpc3QuXG4gIHZhciBfcmVxdWlyZSA9IHJlcXVpcmU7XG4gIGVzcHJpbWEgPSBfcmVxdWlyZSgnZXNwcmltYScpO1xufSBjYXRjaCAoXykge1xuICAvKiBlc2xpbnQtZGlzYWJsZSBuby1yZWRlY2xhcmUgKi9cbiAgLyogZ2xvYmFsIHdpbmRvdyAqL1xuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIGVzcHJpbWEgPSB3aW5kb3cuZXNwcmltYTtcbn1cblxudmFyIFR5cGUgPSByZXF1aXJlKCcuLi8uLi90eXBlJyk7XG5cbmZ1bmN0aW9uIHJlc29sdmVKYXZhc2NyaXB0RnVuY3Rpb24oZGF0YSkge1xuICBpZiAoZGF0YSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gIHRyeSB7XG4gICAgdmFyIHNvdXJjZSA9ICcoJyArIGRhdGEgKyAnKScsXG4gICAgICAgIGFzdCAgICA9IGVzcHJpbWEucGFyc2Uoc291cmNlLCB7IHJhbmdlOiB0cnVlIH0pO1xuXG4gICAgaWYgKGFzdC50eXBlICAgICAgICAgICAgICAgICAgICAhPT0gJ1Byb2dyYW0nICAgICAgICAgICAgIHx8XG4gICAgICAgIGFzdC5ib2R5Lmxlbmd0aCAgICAgICAgICAgICAhPT0gMSAgICAgICAgICAgICAgICAgICAgIHx8XG4gICAgICAgIGFzdC5ib2R5WzBdLnR5cGUgICAgICAgICAgICAhPT0gJ0V4cHJlc3Npb25TdGF0ZW1lbnQnIHx8XG4gICAgICAgIChhc3QuYm9keVswXS5leHByZXNzaW9uLnR5cGUgIT09ICdBcnJvd0Z1bmN0aW9uRXhwcmVzc2lvbicgJiZcbiAgICAgICAgICBhc3QuYm9keVswXS5leHByZXNzaW9uLnR5cGUgIT09ICdGdW5jdGlvbkV4cHJlc3Npb24nKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZnVuY3Rpb24gY29uc3RydWN0SmF2YXNjcmlwdEZ1bmN0aW9uKGRhdGEpIHtcbiAgLypqc2xpbnQgZXZpbDp0cnVlKi9cblxuICB2YXIgc291cmNlID0gJygnICsgZGF0YSArICcpJyxcbiAgICAgIGFzdCAgICA9IGVzcHJpbWEucGFyc2Uoc291cmNlLCB7IHJhbmdlOiB0cnVlIH0pLFxuICAgICAgcGFyYW1zID0gW10sXG4gICAgICBib2R5O1xuXG4gIGlmIChhc3QudHlwZSAgICAgICAgICAgICAgICAgICAgIT09ICdQcm9ncmFtJyAgICAgICAgICAgICB8fFxuICAgICAgYXN0LmJvZHkubGVuZ3RoICAgICAgICAgICAgICE9PSAxICAgICAgICAgICAgICAgICAgICAgfHxcbiAgICAgIGFzdC5ib2R5WzBdLnR5cGUgICAgICAgICAgICAhPT0gJ0V4cHJlc3Npb25TdGF0ZW1lbnQnIHx8XG4gICAgICAoYXN0LmJvZHlbMF0uZXhwcmVzc2lvbi50eXBlICE9PSAnQXJyb3dGdW5jdGlvbkV4cHJlc3Npb24nICYmXG4gICAgICAgIGFzdC5ib2R5WzBdLmV4cHJlc3Npb24udHlwZSAhPT0gJ0Z1bmN0aW9uRXhwcmVzc2lvbicpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gcmVzb2x2ZSBmdW5jdGlvbicpO1xuICB9XG5cbiAgYXN0LmJvZHlbMF0uZXhwcmVzc2lvbi5wYXJhbXMuZm9yRWFjaChmdW5jdGlvbiAocGFyYW0pIHtcbiAgICBwYXJhbXMucHVzaChwYXJhbS5uYW1lKTtcbiAgfSk7XG5cbiAgYm9keSA9IGFzdC5ib2R5WzBdLmV4cHJlc3Npb24uYm9keS5yYW5nZTtcblxuICAvLyBFc3ByaW1hJ3MgcmFuZ2VzIGluY2x1ZGUgdGhlIGZpcnN0ICd7JyBhbmQgdGhlIGxhc3QgJ30nIGNoYXJhY3RlcnMgb25cbiAgLy8gZnVuY3Rpb24gZXhwcmVzc2lvbnMuIFNvIGN1dCB0aGVtIG91dC5cbiAgaWYgKGFzdC5ib2R5WzBdLmV4cHJlc3Npb24uYm9keS50eXBlID09PSAnQmxvY2tTdGF0ZW1lbnQnKSB7XG4gICAgLyplc2xpbnQtZGlzYWJsZSBuby1uZXctZnVuYyovXG4gICAgcmV0dXJuIG5ldyBGdW5jdGlvbihwYXJhbXMsIHNvdXJjZS5zbGljZShib2R5WzBdICsgMSwgYm9keVsxXSAtIDEpKTtcbiAgfVxuICAvLyBFUzYgYXJyb3cgZnVuY3Rpb25zIGNhbiBvbWl0IHRoZSBCbG9ja1N0YXRlbWVudC4gSW4gdGhhdCBjYXNlLCBqdXN0IHJldHVyblxuICAvLyB0aGUgYm9keS5cbiAgLyplc2xpbnQtZGlzYWJsZSBuby1uZXctZnVuYyovXG4gIHJldHVybiBuZXcgRnVuY3Rpb24ocGFyYW1zLCAncmV0dXJuICcgKyBzb3VyY2Uuc2xpY2UoYm9keVswXSwgYm9keVsxXSkpO1xufVxuXG5mdW5jdGlvbiByZXByZXNlbnRKYXZhc2NyaXB0RnVuY3Rpb24ob2JqZWN0IC8qLCBzdHlsZSovKSB7XG4gIHJldHVybiBvYmplY3QudG9TdHJpbmcoKTtcbn1cblxuZnVuY3Rpb24gaXNGdW5jdGlvbihvYmplY3QpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmplY3QpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBUeXBlKCd0YWc6eWFtbC5vcmcsMjAwMjpqcy9mdW5jdGlvbicsIHtcbiAga2luZDogJ3NjYWxhcicsXG4gIHJlc29sdmU6IHJlc29sdmVKYXZhc2NyaXB0RnVuY3Rpb24sXG4gIGNvbnN0cnVjdDogY29uc3RydWN0SmF2YXNjcmlwdEZ1bmN0aW9uLFxuICBwcmVkaWNhdGU6IGlzRnVuY3Rpb24sXG4gIHJlcHJlc2VudDogcmVwcmVzZW50SmF2YXNjcmlwdEZ1bmN0aW9uXG59KTtcbiIsICIvLyBKUy1ZQU1MJ3MgZGVmYXVsdCBzY2hlbWEgZm9yIGBsb2FkYCBmdW5jdGlvbi5cbi8vIEl0IGlzIG5vdCBkZXNjcmliZWQgaW4gdGhlIFlBTUwgc3BlY2lmaWNhdGlvbi5cbi8vXG4vLyBUaGlzIHNjaGVtYSBpcyBiYXNlZCBvbiBKUy1ZQU1MJ3MgZGVmYXVsdCBzYWZlIHNjaGVtYSBhbmQgaW5jbHVkZXNcbi8vIEphdmFTY3JpcHQtc3BlY2lmaWMgdHlwZXM6ICEhanMvdW5kZWZpbmVkLCAhIWpzL3JlZ2V4cCBhbmQgISFqcy9mdW5jdGlvbi5cbi8vXG4vLyBBbHNvIHRoaXMgc2NoZW1hIGlzIHVzZWQgYXMgZGVmYXVsdCBiYXNlIHNjaGVtYSBhdCBgU2NoZW1hLmNyZWF0ZWAgZnVuY3Rpb24uXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG5cbnZhciBTY2hlbWEgPSByZXF1aXJlKCcuLi9zY2hlbWEnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFNjaGVtYS5ERUZBVUxUID0gbmV3IFNjaGVtYSh7XG4gIGluY2x1ZGU6IFtcbiAgICByZXF1aXJlKCcuL2RlZmF1bHRfc2FmZScpXG4gIF0sXG4gIGV4cGxpY2l0OiBbXG4gICAgcmVxdWlyZSgnLi4vdHlwZS9qcy91bmRlZmluZWQnKSxcbiAgICByZXF1aXJlKCcuLi90eXBlL2pzL3JlZ2V4cCcpLFxuICAgIHJlcXVpcmUoJy4uL3R5cGUvanMvZnVuY3Rpb24nKVxuICBdXG59KTtcbiIsICIndXNlIHN0cmljdCc7XG5cbi8qZXNsaW50LWRpc2FibGUgbWF4LWxlbixuby11c2UtYmVmb3JlLWRlZmluZSovXG5cbnZhciBjb21tb24gICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9jb21tb24nKTtcbnZhciBZQU1MRXhjZXB0aW9uICAgICAgID0gcmVxdWlyZSgnLi9leGNlcHRpb24nKTtcbnZhciBNYXJrICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9tYXJrJyk7XG52YXIgREVGQVVMVF9TQUZFX1NDSEVNQSA9IHJlcXVpcmUoJy4vc2NoZW1hL2RlZmF1bHRfc2FmZScpO1xudmFyIERFRkFVTFRfRlVMTF9TQ0hFTUEgPSByZXF1aXJlKCcuL3NjaGVtYS9kZWZhdWx0X2Z1bGwnKTtcblxuXG52YXIgX2hhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuXG52YXIgQ09OVEVYVF9GTE9XX0lOICAgPSAxO1xudmFyIENPTlRFWFRfRkxPV19PVVQgID0gMjtcbnZhciBDT05URVhUX0JMT0NLX0lOICA9IDM7XG52YXIgQ09OVEVYVF9CTE9DS19PVVQgPSA0O1xuXG5cbnZhciBDSE9NUElOR19DTElQICA9IDE7XG52YXIgQ0hPTVBJTkdfU1RSSVAgPSAyO1xudmFyIENIT01QSU5HX0tFRVAgID0gMztcblxuXG52YXIgUEFUVEVSTl9OT05fUFJJTlRBQkxFICAgICAgICAgPSAvW1xceDAwLVxceDA4XFx4MEJcXHgwQ1xceDBFLVxceDFGXFx4N0YtXFx4ODRcXHg4Ni1cXHg5RlxcdUZGRkVcXHVGRkZGXXxbXFx1RDgwMC1cXHVEQkZGXSg/IVtcXHVEQzAwLVxcdURGRkZdKXwoPzpbXlxcdUQ4MDAtXFx1REJGRl18XilbXFx1REMwMC1cXHVERkZGXS87XG52YXIgUEFUVEVSTl9OT05fQVNDSUlfTElORV9CUkVBS1MgPSAvW1xceDg1XFx1MjAyOFxcdTIwMjldLztcbnZhciBQQVRURVJOX0ZMT1dfSU5ESUNBVE9SUyAgICAgICA9IC9bLFxcW1xcXVxce1xcfV0vO1xudmFyIFBBVFRFUk5fVEFHX0hBTkRMRSAgICAgICAgICAgID0gL14oPzohfCEhfCFbYS16XFwtXSshKSQvaTtcbnZhciBQQVRURVJOX1RBR19VUkkgICAgICAgICAgICAgICA9IC9eKD86IXxbXixcXFtcXF1cXHtcXH1dKSg/OiVbMC05YS1mXXsyfXxbMC05YS16XFwtIztcXC9cXD86QCY9XFwrXFwkLF9cXC4hflxcKidcXChcXClcXFtcXF1dKSokL2k7XG5cblxuZnVuY3Rpb24gX2NsYXNzKG9iaikgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaik7IH1cblxuZnVuY3Rpb24gaXNfRU9MKGMpIHtcbiAgcmV0dXJuIChjID09PSAweDBBLyogTEYgKi8pIHx8IChjID09PSAweDBELyogQ1IgKi8pO1xufVxuXG5mdW5jdGlvbiBpc19XSElURV9TUEFDRShjKSB7XG4gIHJldHVybiAoYyA9PT0gMHgwOS8qIFRhYiAqLykgfHwgKGMgPT09IDB4MjAvKiBTcGFjZSAqLyk7XG59XG5cbmZ1bmN0aW9uIGlzX1dTX09SX0VPTChjKSB7XG4gIHJldHVybiAoYyA9PT0gMHgwOS8qIFRhYiAqLykgfHxcbiAgICAgICAgIChjID09PSAweDIwLyogU3BhY2UgKi8pIHx8XG4gICAgICAgICAoYyA9PT0gMHgwQS8qIExGICovKSB8fFxuICAgICAgICAgKGMgPT09IDB4MEQvKiBDUiAqLyk7XG59XG5cbmZ1bmN0aW9uIGlzX0ZMT1dfSU5ESUNBVE9SKGMpIHtcbiAgcmV0dXJuIGMgPT09IDB4MkMvKiAsICovIHx8XG4gICAgICAgICBjID09PSAweDVCLyogWyAqLyB8fFxuICAgICAgICAgYyA9PT0gMHg1RC8qIF0gKi8gfHxcbiAgICAgICAgIGMgPT09IDB4N0IvKiB7ICovIHx8XG4gICAgICAgICBjID09PSAweDdELyogfSAqLztcbn1cblxuZnVuY3Rpb24gZnJvbUhleENvZGUoYykge1xuICB2YXIgbGM7XG5cbiAgaWYgKCgweDMwLyogMCAqLyA8PSBjKSAmJiAoYyA8PSAweDM5LyogOSAqLykpIHtcbiAgICByZXR1cm4gYyAtIDB4MzA7XG4gIH1cblxuICAvKmVzbGludC1kaXNhYmxlIG5vLWJpdHdpc2UqL1xuICBsYyA9IGMgfCAweDIwO1xuXG4gIGlmICgoMHg2MS8qIGEgKi8gPD0gbGMpICYmIChsYyA8PSAweDY2LyogZiAqLykpIHtcbiAgICByZXR1cm4gbGMgLSAweDYxICsgMTA7XG4gIH1cblxuICByZXR1cm4gLTE7XG59XG5cbmZ1bmN0aW9uIGVzY2FwZWRIZXhMZW4oYykge1xuICBpZiAoYyA9PT0gMHg3OC8qIHggKi8pIHsgcmV0dXJuIDI7IH1cbiAgaWYgKGMgPT09IDB4NzUvKiB1ICovKSB7IHJldHVybiA0OyB9XG4gIGlmIChjID09PSAweDU1LyogVSAqLykgeyByZXR1cm4gODsgfVxuICByZXR1cm4gMDtcbn1cblxuZnVuY3Rpb24gZnJvbURlY2ltYWxDb2RlKGMpIHtcbiAgaWYgKCgweDMwLyogMCAqLyA8PSBjKSAmJiAoYyA8PSAweDM5LyogOSAqLykpIHtcbiAgICByZXR1cm4gYyAtIDB4MzA7XG4gIH1cblxuICByZXR1cm4gLTE7XG59XG5cbmZ1bmN0aW9uIHNpbXBsZUVzY2FwZVNlcXVlbmNlKGMpIHtcbiAgLyogZXNsaW50LWRpc2FibGUgaW5kZW50ICovXG4gIHJldHVybiAoYyA9PT0gMHgzMC8qIDAgKi8pID8gJ1xceDAwJyA6XG4gICAgICAgIChjID09PSAweDYxLyogYSAqLykgPyAnXFx4MDcnIDpcbiAgICAgICAgKGMgPT09IDB4NjIvKiBiICovKSA/ICdcXHgwOCcgOlxuICAgICAgICAoYyA9PT0gMHg3NC8qIHQgKi8pID8gJ1xceDA5JyA6XG4gICAgICAgIChjID09PSAweDA5LyogVGFiICovKSA/ICdcXHgwOScgOlxuICAgICAgICAoYyA9PT0gMHg2RS8qIG4gKi8pID8gJ1xceDBBJyA6XG4gICAgICAgIChjID09PSAweDc2LyogdiAqLykgPyAnXFx4MEInIDpcbiAgICAgICAgKGMgPT09IDB4NjYvKiBmICovKSA/ICdcXHgwQycgOlxuICAgICAgICAoYyA9PT0gMHg3Mi8qIHIgKi8pID8gJ1xceDBEJyA6XG4gICAgICAgIChjID09PSAweDY1LyogZSAqLykgPyAnXFx4MUInIDpcbiAgICAgICAgKGMgPT09IDB4MjAvKiBTcGFjZSAqLykgPyAnICcgOlxuICAgICAgICAoYyA9PT0gMHgyMi8qIFwiICovKSA/ICdcXHgyMicgOlxuICAgICAgICAoYyA9PT0gMHgyRi8qIC8gKi8pID8gJy8nIDpcbiAgICAgICAgKGMgPT09IDB4NUMvKiBcXCAqLykgPyAnXFx4NUMnIDpcbiAgICAgICAgKGMgPT09IDB4NEUvKiBOICovKSA/ICdcXHg4NScgOlxuICAgICAgICAoYyA9PT0gMHg1Ri8qIF8gKi8pID8gJ1xceEEwJyA6XG4gICAgICAgIChjID09PSAweDRDLyogTCAqLykgPyAnXFx1MjAyOCcgOlxuICAgICAgICAoYyA9PT0gMHg1MC8qIFAgKi8pID8gJ1xcdTIwMjknIDogJyc7XG59XG5cbmZ1bmN0aW9uIGNoYXJGcm9tQ29kZXBvaW50KGMpIHtcbiAgaWYgKGMgPD0gMHhGRkZGKSB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoYyk7XG4gIH1cbiAgLy8gRW5jb2RlIFVURi0xNiBzdXJyb2dhdGUgcGFpclxuICAvLyBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9VVEYtMTYjQ29kZV9wb2ludHNfVS4yQjAxMDAwMF90b19VLjJCMTBGRkZGXG4gIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKFxuICAgICgoYyAtIDB4MDEwMDAwKSA+PiAxMCkgKyAweEQ4MDAsXG4gICAgKChjIC0gMHgwMTAwMDApICYgMHgwM0ZGKSArIDB4REMwMFxuICApO1xufVxuXG4vLyBzZXQgYSBwcm9wZXJ0eSBvZiBhIGxpdGVyYWwgb2JqZWN0LCB3aGlsZSBwcm90ZWN0aW5nIGFnYWluc3QgcHJvdG90eXBlIHBvbGx1dGlvbixcbi8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vbm9kZWNhL2pzLXlhbWwvaXNzdWVzLzE2NCBmb3IgbW9yZSBkZXRhaWxzXG5mdW5jdGlvbiBzZXRQcm9wZXJ0eShvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgLy8gdXNlZCBmb3IgdGhpcyBzcGVjaWZpYyBrZXkgb25seSBiZWNhdXNlIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBpcyBzbG93XG4gIGlmIChrZXkgPT09ICdfX3Byb3RvX18nKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdCwga2V5LCB7XG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICB2YWx1ZTogdmFsdWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICB9XG59XG5cbnZhciBzaW1wbGVFc2NhcGVDaGVjayA9IG5ldyBBcnJheSgyNTYpOyAvLyBpbnRlZ2VyLCBmb3IgZmFzdCBhY2Nlc3NcbnZhciBzaW1wbGVFc2NhcGVNYXAgPSBuZXcgQXJyYXkoMjU2KTtcbmZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcbiAgc2ltcGxlRXNjYXBlQ2hlY2tbaV0gPSBzaW1wbGVFc2NhcGVTZXF1ZW5jZShpKSA/IDEgOiAwO1xuICBzaW1wbGVFc2NhcGVNYXBbaV0gPSBzaW1wbGVFc2NhcGVTZXF1ZW5jZShpKTtcbn1cblxuXG5mdW5jdGlvbiBTdGF0ZShpbnB1dCwgb3B0aW9ucykge1xuICB0aGlzLmlucHV0ID0gaW5wdXQ7XG5cbiAgdGhpcy5maWxlbmFtZSAgPSBvcHRpb25zWydmaWxlbmFtZSddICB8fCBudWxsO1xuICB0aGlzLnNjaGVtYSAgICA9IG9wdGlvbnNbJ3NjaGVtYSddICAgIHx8IERFRkFVTFRfRlVMTF9TQ0hFTUE7XG4gIHRoaXMub25XYXJuaW5nID0gb3B0aW9uc1snb25XYXJuaW5nJ10gfHwgbnVsbDtcbiAgdGhpcy5sZWdhY3kgICAgPSBvcHRpb25zWydsZWdhY3knXSAgICB8fCBmYWxzZTtcbiAgdGhpcy5qc29uICAgICAgPSBvcHRpb25zWydqc29uJ10gICAgICB8fCBmYWxzZTtcbiAgdGhpcy5saXN0ZW5lciAgPSBvcHRpb25zWydsaXN0ZW5lciddICB8fCBudWxsO1xuXG4gIHRoaXMuaW1wbGljaXRUeXBlcyA9IHRoaXMuc2NoZW1hLmNvbXBpbGVkSW1wbGljaXQ7XG4gIHRoaXMudHlwZU1hcCAgICAgICA9IHRoaXMuc2NoZW1hLmNvbXBpbGVkVHlwZU1hcDtcblxuICB0aGlzLmxlbmd0aCAgICAgPSBpbnB1dC5sZW5ndGg7XG4gIHRoaXMucG9zaXRpb24gICA9IDA7XG4gIHRoaXMubGluZSAgICAgICA9IDA7XG4gIHRoaXMubGluZVN0YXJ0ICA9IDA7XG4gIHRoaXMubGluZUluZGVudCA9IDA7XG5cbiAgdGhpcy5kb2N1bWVudHMgPSBbXTtcblxuICAvKlxuICB0aGlzLnZlcnNpb247XG4gIHRoaXMuY2hlY2tMaW5lQnJlYWtzO1xuICB0aGlzLnRhZ01hcDtcbiAgdGhpcy5hbmNob3JNYXA7XG4gIHRoaXMudGFnO1xuICB0aGlzLmFuY2hvcjtcbiAgdGhpcy5raW5kO1xuICB0aGlzLnJlc3VsdDsqL1xuXG59XG5cblxuZnVuY3Rpb24gZ2VuZXJhdGVFcnJvcihzdGF0ZSwgbWVzc2FnZSkge1xuICByZXR1cm4gbmV3IFlBTUxFeGNlcHRpb24oXG4gICAgbWVzc2FnZSxcbiAgICBuZXcgTWFyayhzdGF0ZS5maWxlbmFtZSwgc3RhdGUuaW5wdXQsIHN0YXRlLnBvc2l0aW9uLCBzdGF0ZS5saW5lLCAoc3RhdGUucG9zaXRpb24gLSBzdGF0ZS5saW5lU3RhcnQpKSk7XG59XG5cbmZ1bmN0aW9uIHRocm93RXJyb3Ioc3RhdGUsIG1lc3NhZ2UpIHtcbiAgdGhyb3cgZ2VuZXJhdGVFcnJvcihzdGF0ZSwgbWVzc2FnZSk7XG59XG5cbmZ1bmN0aW9uIHRocm93V2FybmluZyhzdGF0ZSwgbWVzc2FnZSkge1xuICBpZiAoc3RhdGUub25XYXJuaW5nKSB7XG4gICAgc3RhdGUub25XYXJuaW5nLmNhbGwobnVsbCwgZ2VuZXJhdGVFcnJvcihzdGF0ZSwgbWVzc2FnZSkpO1xuICB9XG59XG5cblxudmFyIGRpcmVjdGl2ZUhhbmRsZXJzID0ge1xuXG4gIFlBTUw6IGZ1bmN0aW9uIGhhbmRsZVlhbWxEaXJlY3RpdmUoc3RhdGUsIG5hbWUsIGFyZ3MpIHtcblxuICAgIHZhciBtYXRjaCwgbWFqb3IsIG1pbm9yO1xuXG4gICAgaWYgKHN0YXRlLnZlcnNpb24gIT09IG51bGwpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdkdXBsaWNhdGlvbiBvZiAlWUFNTCBkaXJlY3RpdmUnKTtcbiAgICB9XG5cbiAgICBpZiAoYXJncy5sZW5ndGggIT09IDEpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdZQU1MIGRpcmVjdGl2ZSBhY2NlcHRzIGV4YWN0bHkgb25lIGFyZ3VtZW50Jyk7XG4gICAgfVxuXG4gICAgbWF0Y2ggPSAvXihbMC05XSspXFwuKFswLTldKykkLy5leGVjKGFyZ3NbMF0pO1xuXG4gICAgaWYgKG1hdGNoID09PSBudWxsKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnaWxsLWZvcm1lZCBhcmd1bWVudCBvZiB0aGUgWUFNTCBkaXJlY3RpdmUnKTtcbiAgICB9XG5cbiAgICBtYWpvciA9IHBhcnNlSW50KG1hdGNoWzFdLCAxMCk7XG4gICAgbWlub3IgPSBwYXJzZUludChtYXRjaFsyXSwgMTApO1xuXG4gICAgaWYgKG1ham9yICE9PSAxKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAndW5hY2NlcHRhYmxlIFlBTUwgdmVyc2lvbiBvZiB0aGUgZG9jdW1lbnQnKTtcbiAgICB9XG5cbiAgICBzdGF0ZS52ZXJzaW9uID0gYXJnc1swXTtcbiAgICBzdGF0ZS5jaGVja0xpbmVCcmVha3MgPSAobWlub3IgPCAyKTtcblxuICAgIGlmIChtaW5vciAhPT0gMSAmJiBtaW5vciAhPT0gMikge1xuICAgICAgdGhyb3dXYXJuaW5nKHN0YXRlLCAndW5zdXBwb3J0ZWQgWUFNTCB2ZXJzaW9uIG9mIHRoZSBkb2N1bWVudCcpO1xuICAgIH1cbiAgfSxcblxuICBUQUc6IGZ1bmN0aW9uIGhhbmRsZVRhZ0RpcmVjdGl2ZShzdGF0ZSwgbmFtZSwgYXJncykge1xuXG4gICAgdmFyIGhhbmRsZSwgcHJlZml4O1xuXG4gICAgaWYgKGFyZ3MubGVuZ3RoICE9PSAyKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnVEFHIGRpcmVjdGl2ZSBhY2NlcHRzIGV4YWN0bHkgdHdvIGFyZ3VtZW50cycpO1xuICAgIH1cblxuICAgIGhhbmRsZSA9IGFyZ3NbMF07XG4gICAgcHJlZml4ID0gYXJnc1sxXTtcblxuICAgIGlmICghUEFUVEVSTl9UQUdfSEFORExFLnRlc3QoaGFuZGxlKSkge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2lsbC1mb3JtZWQgdGFnIGhhbmRsZSAoZmlyc3QgYXJndW1lbnQpIG9mIHRoZSBUQUcgZGlyZWN0aXZlJyk7XG4gICAgfVxuXG4gICAgaWYgKF9oYXNPd25Qcm9wZXJ0eS5jYWxsKHN0YXRlLnRhZ01hcCwgaGFuZGxlKSkge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3RoZXJlIGlzIGEgcHJldmlvdXNseSBkZWNsYXJlZCBzdWZmaXggZm9yIFwiJyArIGhhbmRsZSArICdcIiB0YWcgaGFuZGxlJyk7XG4gICAgfVxuXG4gICAgaWYgKCFQQVRURVJOX1RBR19VUkkudGVzdChwcmVmaXgpKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnaWxsLWZvcm1lZCB0YWcgcHJlZml4IChzZWNvbmQgYXJndW1lbnQpIG9mIHRoZSBUQUcgZGlyZWN0aXZlJyk7XG4gICAgfVxuXG4gICAgc3RhdGUudGFnTWFwW2hhbmRsZV0gPSBwcmVmaXg7XG4gIH1cbn07XG5cblxuZnVuY3Rpb24gY2FwdHVyZVNlZ21lbnQoc3RhdGUsIHN0YXJ0LCBlbmQsIGNoZWNrSnNvbikge1xuICB2YXIgX3Bvc2l0aW9uLCBfbGVuZ3RoLCBfY2hhcmFjdGVyLCBfcmVzdWx0O1xuXG4gIGlmIChzdGFydCA8IGVuZCkge1xuICAgIF9yZXN1bHQgPSBzdGF0ZS5pbnB1dC5zbGljZShzdGFydCwgZW5kKTtcblxuICAgIGlmIChjaGVja0pzb24pIHtcbiAgICAgIGZvciAoX3Bvc2l0aW9uID0gMCwgX2xlbmd0aCA9IF9yZXN1bHQubGVuZ3RoOyBfcG9zaXRpb24gPCBfbGVuZ3RoOyBfcG9zaXRpb24gKz0gMSkge1xuICAgICAgICBfY2hhcmFjdGVyID0gX3Jlc3VsdC5jaGFyQ29kZUF0KF9wb3NpdGlvbik7XG4gICAgICAgIGlmICghKF9jaGFyYWN0ZXIgPT09IDB4MDkgfHxcbiAgICAgICAgICAgICAgKDB4MjAgPD0gX2NoYXJhY3RlciAmJiBfY2hhcmFjdGVyIDw9IDB4MTBGRkZGKSkpIHtcbiAgICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnZXhwZWN0ZWQgdmFsaWQgSlNPTiBjaGFyYWN0ZXInKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoUEFUVEVSTl9OT05fUFJJTlRBQkxFLnRlc3QoX3Jlc3VsdCkpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICd0aGUgc3RyZWFtIGNvbnRhaW5zIG5vbi1wcmludGFibGUgY2hhcmFjdGVycycpO1xuICAgIH1cblxuICAgIHN0YXRlLnJlc3VsdCArPSBfcmVzdWx0O1xuICB9XG59XG5cbmZ1bmN0aW9uIG1lcmdlTWFwcGluZ3Moc3RhdGUsIGRlc3RpbmF0aW9uLCBzb3VyY2UsIG92ZXJyaWRhYmxlS2V5cykge1xuICB2YXIgc291cmNlS2V5cywga2V5LCBpbmRleCwgcXVhbnRpdHk7XG5cbiAgaWYgKCFjb21tb24uaXNPYmplY3Qoc291cmNlKSkge1xuICAgIHRocm93RXJyb3Ioc3RhdGUsICdjYW5ub3QgbWVyZ2UgbWFwcGluZ3M7IHRoZSBwcm92aWRlZCBzb3VyY2Ugb2JqZWN0IGlzIHVuYWNjZXB0YWJsZScpO1xuICB9XG5cbiAgc291cmNlS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG5cbiAgZm9yIChpbmRleCA9IDAsIHF1YW50aXR5ID0gc291cmNlS2V5cy5sZW5ndGg7IGluZGV4IDwgcXVhbnRpdHk7IGluZGV4ICs9IDEpIHtcbiAgICBrZXkgPSBzb3VyY2VLZXlzW2luZGV4XTtcblxuICAgIGlmICghX2hhc093blByb3BlcnR5LmNhbGwoZGVzdGluYXRpb24sIGtleSkpIHtcbiAgICAgIHNldFByb3BlcnR5KGRlc3RpbmF0aW9uLCBrZXksIHNvdXJjZVtrZXldKTtcbiAgICAgIG92ZXJyaWRhYmxlS2V5c1trZXldID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gc3RvcmVNYXBwaW5nUGFpcihzdGF0ZSwgX3Jlc3VsdCwgb3ZlcnJpZGFibGVLZXlzLCBrZXlUYWcsIGtleU5vZGUsIHZhbHVlTm9kZSwgc3RhcnRMaW5lLCBzdGFydFBvcykge1xuICB2YXIgaW5kZXgsIHF1YW50aXR5O1xuXG4gIC8vIFRoZSBvdXRwdXQgaXMgYSBwbGFpbiBvYmplY3QgaGVyZSwgc28ga2V5cyBjYW4gb25seSBiZSBzdHJpbmdzLlxuICAvLyBXZSBuZWVkIHRvIGNvbnZlcnQga2V5Tm9kZSB0byBhIHN0cmluZywgYnV0IGRvaW5nIHNvIGNhbiBoYW5nIHRoZSBwcm9jZXNzXG4gIC8vIChkZWVwbHkgbmVzdGVkIGFycmF5cyB0aGF0IGV4cGxvZGUgZXhwb25lbnRpYWxseSB1c2luZyBhbGlhc2VzKS5cbiAgaWYgKEFycmF5LmlzQXJyYXkoa2V5Tm9kZSkpIHtcbiAgICBrZXlOb2RlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoa2V5Tm9kZSk7XG5cbiAgICBmb3IgKGluZGV4ID0gMCwgcXVhbnRpdHkgPSBrZXlOb2RlLmxlbmd0aDsgaW5kZXggPCBxdWFudGl0eTsgaW5kZXggKz0gMSkge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoa2V5Tm9kZVtpbmRleF0pKSB7XG4gICAgICAgIHRocm93RXJyb3Ioc3RhdGUsICduZXN0ZWQgYXJyYXlzIGFyZSBub3Qgc3VwcG9ydGVkIGluc2lkZSBrZXlzJyk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2Yga2V5Tm9kZSA9PT0gJ29iamVjdCcgJiYgX2NsYXNzKGtleU5vZGVbaW5kZXhdKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgICAga2V5Tm9kZVtpbmRleF0gPSAnW29iamVjdCBPYmplY3RdJztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBBdm9pZCBjb2RlIGV4ZWN1dGlvbiBpbiBsb2FkKCkgdmlhIHRvU3RyaW5nIHByb3BlcnR5XG4gIC8vIChzdGlsbCB1c2UgaXRzIG93biB0b1N0cmluZyBmb3IgYXJyYXlzLCB0aW1lc3RhbXBzLFxuICAvLyBhbmQgd2hhdGV2ZXIgdXNlciBzY2hlbWEgZXh0ZW5zaW9ucyBoYXBwZW4gdG8gaGF2ZSBAQHRvU3RyaW5nVGFnKVxuICBpZiAodHlwZW9mIGtleU5vZGUgPT09ICdvYmplY3QnICYmIF9jbGFzcyhrZXlOb2RlKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICBrZXlOb2RlID0gJ1tvYmplY3QgT2JqZWN0XSc7XG4gIH1cblxuXG4gIGtleU5vZGUgPSBTdHJpbmcoa2V5Tm9kZSk7XG5cbiAgaWYgKF9yZXN1bHQgPT09IG51bGwpIHtcbiAgICBfcmVzdWx0ID0ge307XG4gIH1cblxuICBpZiAoa2V5VGFnID09PSAndGFnOnlhbWwub3JnLDIwMDI6bWVyZ2UnKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWVOb2RlKSkge1xuICAgICAgZm9yIChpbmRleCA9IDAsIHF1YW50aXR5ID0gdmFsdWVOb2RlLmxlbmd0aDsgaW5kZXggPCBxdWFudGl0eTsgaW5kZXggKz0gMSkge1xuICAgICAgICBtZXJnZU1hcHBpbmdzKHN0YXRlLCBfcmVzdWx0LCB2YWx1ZU5vZGVbaW5kZXhdLCBvdmVycmlkYWJsZUtleXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBtZXJnZU1hcHBpbmdzKHN0YXRlLCBfcmVzdWx0LCB2YWx1ZU5vZGUsIG92ZXJyaWRhYmxlS2V5cyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmICghc3RhdGUuanNvbiAmJlxuICAgICAgICAhX2hhc093blByb3BlcnR5LmNhbGwob3ZlcnJpZGFibGVLZXlzLCBrZXlOb2RlKSAmJlxuICAgICAgICBfaGFzT3duUHJvcGVydHkuY2FsbChfcmVzdWx0LCBrZXlOb2RlKSkge1xuICAgICAgc3RhdGUubGluZSA9IHN0YXJ0TGluZSB8fCBzdGF0ZS5saW5lO1xuICAgICAgc3RhdGUucG9zaXRpb24gPSBzdGFydFBvcyB8fCBzdGF0ZS5wb3NpdGlvbjtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdkdXBsaWNhdGVkIG1hcHBpbmcga2V5Jyk7XG4gICAgfVxuICAgIHNldFByb3BlcnR5KF9yZXN1bHQsIGtleU5vZGUsIHZhbHVlTm9kZSk7XG4gICAgZGVsZXRlIG92ZXJyaWRhYmxlS2V5c1trZXlOb2RlXTtcbiAgfVxuXG4gIHJldHVybiBfcmVzdWx0O1xufVxuXG5mdW5jdGlvbiByZWFkTGluZUJyZWFrKHN0YXRlKSB7XG4gIHZhciBjaDtcblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gIGlmIChjaCA9PT0gMHgwQS8qIExGICovKSB7XG4gICAgc3RhdGUucG9zaXRpb24rKztcbiAgfSBlbHNlIGlmIChjaCA9PT0gMHgwRC8qIENSICovKSB7XG4gICAgc3RhdGUucG9zaXRpb24rKztcbiAgICBpZiAoc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbikgPT09IDB4MEEvKiBMRiAqLykge1xuICAgICAgc3RhdGUucG9zaXRpb24rKztcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2EgbGluZSBicmVhayBpcyBleHBlY3RlZCcpO1xuICB9XG5cbiAgc3RhdGUubGluZSArPSAxO1xuICBzdGF0ZS5saW5lU3RhcnQgPSBzdGF0ZS5wb3NpdGlvbjtcbn1cblxuZnVuY3Rpb24gc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgYWxsb3dDb21tZW50cywgY2hlY2tJbmRlbnQpIHtcbiAgdmFyIGxpbmVCcmVha3MgPSAwLFxuICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICB3aGlsZSAoY2ggIT09IDApIHtcbiAgICB3aGlsZSAoaXNfV0hJVEVfU1BBQ0UoY2gpKSB7XG4gICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gICAgfVxuXG4gICAgaWYgKGFsbG93Q29tbWVudHMgJiYgY2ggPT09IDB4MjMvKiAjICovKSB7XG4gICAgICBkbyB7XG4gICAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgICAgIH0gd2hpbGUgKGNoICE9PSAweDBBLyogTEYgKi8gJiYgY2ggIT09IDB4MEQvKiBDUiAqLyAmJiBjaCAhPT0gMCk7XG4gICAgfVxuXG4gICAgaWYgKGlzX0VPTChjaCkpIHtcbiAgICAgIHJlYWRMaW5lQnJlYWsoc3RhdGUpO1xuXG4gICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuICAgICAgbGluZUJyZWFrcysrO1xuICAgICAgc3RhdGUubGluZUluZGVudCA9IDA7XG5cbiAgICAgIHdoaWxlIChjaCA9PT0gMHgyMC8qIFNwYWNlICovKSB7XG4gICAgICAgIHN0YXRlLmxpbmVJbmRlbnQrKztcbiAgICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBpZiAoY2hlY2tJbmRlbnQgIT09IC0xICYmIGxpbmVCcmVha3MgIT09IDAgJiYgc3RhdGUubGluZUluZGVudCA8IGNoZWNrSW5kZW50KSB7XG4gICAgdGhyb3dXYXJuaW5nKHN0YXRlLCAnZGVmaWNpZW50IGluZGVudGF0aW9uJyk7XG4gIH1cblxuICByZXR1cm4gbGluZUJyZWFrcztcbn1cblxuZnVuY3Rpb24gdGVzdERvY3VtZW50U2VwYXJhdG9yKHN0YXRlKSB7XG4gIHZhciBfcG9zaXRpb24gPSBzdGF0ZS5wb3NpdGlvbixcbiAgICAgIGNoO1xuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChfcG9zaXRpb24pO1xuXG4gIC8vIENvbmRpdGlvbiBzdGF0ZS5wb3NpdGlvbiA9PT0gc3RhdGUubGluZVN0YXJ0IGlzIHRlc3RlZFxuICAvLyBpbiBwYXJlbnQgb24gZWFjaCBjYWxsLCBmb3IgZWZmaWNpZW5jeS4gTm8gbmVlZHMgdG8gdGVzdCBoZXJlIGFnYWluLlxuICBpZiAoKGNoID09PSAweDJELyogLSAqLyB8fCBjaCA9PT0gMHgyRS8qIC4gKi8pICYmXG4gICAgICBjaCA9PT0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChfcG9zaXRpb24gKyAxKSAmJlxuICAgICAgY2ggPT09IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoX3Bvc2l0aW9uICsgMikpIHtcblxuICAgIF9wb3NpdGlvbiArPSAzO1xuXG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KF9wb3NpdGlvbik7XG5cbiAgICBpZiAoY2ggPT09IDAgfHwgaXNfV1NfT1JfRU9MKGNoKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiB3cml0ZUZvbGRlZExpbmVzKHN0YXRlLCBjb3VudCkge1xuICBpZiAoY291bnQgPT09IDEpIHtcbiAgICBzdGF0ZS5yZXN1bHQgKz0gJyAnO1xuICB9IGVsc2UgaWYgKGNvdW50ID4gMSkge1xuICAgIHN0YXRlLnJlc3VsdCArPSBjb21tb24ucmVwZWF0KCdcXG4nLCBjb3VudCAtIDEpO1xuICB9XG59XG5cblxuZnVuY3Rpb24gcmVhZFBsYWluU2NhbGFyKHN0YXRlLCBub2RlSW5kZW50LCB3aXRoaW5GbG93Q29sbGVjdGlvbikge1xuICB2YXIgcHJlY2VkaW5nLFxuICAgICAgZm9sbG93aW5nLFxuICAgICAgY2FwdHVyZVN0YXJ0LFxuICAgICAgY2FwdHVyZUVuZCxcbiAgICAgIGhhc1BlbmRpbmdDb250ZW50LFxuICAgICAgX2xpbmUsXG4gICAgICBfbGluZVN0YXJ0LFxuICAgICAgX2xpbmVJbmRlbnQsXG4gICAgICBfa2luZCA9IHN0YXRlLmtpbmQsXG4gICAgICBfcmVzdWx0ID0gc3RhdGUucmVzdWx0LFxuICAgICAgY2g7XG5cbiAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICBpZiAoaXNfV1NfT1JfRU9MKGNoKSAgICAgIHx8XG4gICAgICBpc19GTE9XX0lORElDQVRPUihjaCkgfHxcbiAgICAgIGNoID09PSAweDIzLyogIyAqLyAgICB8fFxuICAgICAgY2ggPT09IDB4MjYvKiAmICovICAgIHx8XG4gICAgICBjaCA9PT0gMHgyQS8qICogKi8gICAgfHxcbiAgICAgIGNoID09PSAweDIxLyogISAqLyAgICB8fFxuICAgICAgY2ggPT09IDB4N0MvKiB8ICovICAgIHx8XG4gICAgICBjaCA9PT0gMHgzRS8qID4gKi8gICAgfHxcbiAgICAgIGNoID09PSAweDI3LyogJyAqLyAgICB8fFxuICAgICAgY2ggPT09IDB4MjIvKiBcIiAqLyAgICB8fFxuICAgICAgY2ggPT09IDB4MjUvKiAlICovICAgIHx8XG4gICAgICBjaCA9PT0gMHg0MC8qIEAgKi8gICAgfHxcbiAgICAgIGNoID09PSAweDYwLyogYCAqLykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChjaCA9PT0gMHgzRi8qID8gKi8gfHwgY2ggPT09IDB4MkQvKiAtICovKSB7XG4gICAgZm9sbG93aW5nID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbiArIDEpO1xuXG4gICAgaWYgKGlzX1dTX09SX0VPTChmb2xsb3dpbmcpIHx8XG4gICAgICAgIHdpdGhpbkZsb3dDb2xsZWN0aW9uICYmIGlzX0ZMT1dfSU5ESUNBVE9SKGZvbGxvd2luZykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBzdGF0ZS5raW5kID0gJ3NjYWxhcic7XG4gIHN0YXRlLnJlc3VsdCA9ICcnO1xuICBjYXB0dXJlU3RhcnQgPSBjYXB0dXJlRW5kID0gc3RhdGUucG9zaXRpb247XG4gIGhhc1BlbmRpbmdDb250ZW50ID0gZmFsc2U7XG5cbiAgd2hpbGUgKGNoICE9PSAwKSB7XG4gICAgaWYgKGNoID09PSAweDNBLyogOiAqLykge1xuICAgICAgZm9sbG93aW5nID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbiArIDEpO1xuXG4gICAgICBpZiAoaXNfV1NfT1JfRU9MKGZvbGxvd2luZykgfHxcbiAgICAgICAgICB3aXRoaW5GbG93Q29sbGVjdGlvbiAmJiBpc19GTE9XX0lORElDQVRPUihmb2xsb3dpbmcpKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIGlmIChjaCA9PT0gMHgyMy8qICMgKi8pIHtcbiAgICAgIHByZWNlZGluZyA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24gLSAxKTtcblxuICAgICAgaWYgKGlzX1dTX09SX0VPTChwcmVjZWRpbmcpKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIGlmICgoc3RhdGUucG9zaXRpb24gPT09IHN0YXRlLmxpbmVTdGFydCAmJiB0ZXN0RG9jdW1lbnRTZXBhcmF0b3Ioc3RhdGUpKSB8fFxuICAgICAgICAgICAgICAgd2l0aGluRmxvd0NvbGxlY3Rpb24gJiYgaXNfRkxPV19JTkRJQ0FUT1IoY2gpKSB7XG4gICAgICBicmVhaztcblxuICAgIH0gZWxzZSBpZiAoaXNfRU9MKGNoKSkge1xuICAgICAgX2xpbmUgPSBzdGF0ZS5saW5lO1xuICAgICAgX2xpbmVTdGFydCA9IHN0YXRlLmxpbmVTdGFydDtcbiAgICAgIF9saW5lSW5kZW50ID0gc3RhdGUubGluZUluZGVudDtcbiAgICAgIHNraXBTZXBhcmF0aW9uU3BhY2Uoc3RhdGUsIGZhbHNlLCAtMSk7XG5cbiAgICAgIGlmIChzdGF0ZS5saW5lSW5kZW50ID49IG5vZGVJbmRlbnQpIHtcbiAgICAgICAgaGFzUGVuZGluZ0NvbnRlbnQgPSB0cnVlO1xuICAgICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXRlLnBvc2l0aW9uID0gY2FwdHVyZUVuZDtcbiAgICAgICAgc3RhdGUubGluZSA9IF9saW5lO1xuICAgICAgICBzdGF0ZS5saW5lU3RhcnQgPSBfbGluZVN0YXJ0O1xuICAgICAgICBzdGF0ZS5saW5lSW5kZW50ID0gX2xpbmVJbmRlbnQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChoYXNQZW5kaW5nQ29udGVudCkge1xuICAgICAgY2FwdHVyZVNlZ21lbnQoc3RhdGUsIGNhcHR1cmVTdGFydCwgY2FwdHVyZUVuZCwgZmFsc2UpO1xuICAgICAgd3JpdGVGb2xkZWRMaW5lcyhzdGF0ZSwgc3RhdGUubGluZSAtIF9saW5lKTtcbiAgICAgIGNhcHR1cmVTdGFydCA9IGNhcHR1cmVFbmQgPSBzdGF0ZS5wb3NpdGlvbjtcbiAgICAgIGhhc1BlbmRpbmdDb250ZW50ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKCFpc19XSElURV9TUEFDRShjaCkpIHtcbiAgICAgIGNhcHR1cmVFbmQgPSBzdGF0ZS5wb3NpdGlvbiArIDE7XG4gICAgfVxuXG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICB9XG5cbiAgY2FwdHVyZVNlZ21lbnQoc3RhdGUsIGNhcHR1cmVTdGFydCwgY2FwdHVyZUVuZCwgZmFsc2UpO1xuXG4gIGlmIChzdGF0ZS5yZXN1bHQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHN0YXRlLmtpbmQgPSBfa2luZDtcbiAgc3RhdGUucmVzdWx0ID0gX3Jlc3VsdDtcbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiByZWFkU2luZ2xlUXVvdGVkU2NhbGFyKHN0YXRlLCBub2RlSW5kZW50KSB7XG4gIHZhciBjaCxcbiAgICAgIGNhcHR1cmVTdGFydCwgY2FwdHVyZUVuZDtcblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gIGlmIChjaCAhPT0gMHgyNy8qICcgKi8pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdGF0ZS5raW5kID0gJ3NjYWxhcic7XG4gIHN0YXRlLnJlc3VsdCA9ICcnO1xuICBzdGF0ZS5wb3NpdGlvbisrO1xuICBjYXB0dXJlU3RhcnQgPSBjYXB0dXJlRW5kID0gc3RhdGUucG9zaXRpb247XG5cbiAgd2hpbGUgKChjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pKSAhPT0gMCkge1xuICAgIGlmIChjaCA9PT0gMHgyNy8qICcgKi8pIHtcbiAgICAgIGNhcHR1cmVTZWdtZW50KHN0YXRlLCBjYXB0dXJlU3RhcnQsIHN0YXRlLnBvc2l0aW9uLCB0cnVlKTtcbiAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcblxuICAgICAgaWYgKGNoID09PSAweDI3LyogJyAqLykge1xuICAgICAgICBjYXB0dXJlU3RhcnQgPSBzdGF0ZS5wb3NpdGlvbjtcbiAgICAgICAgc3RhdGUucG9zaXRpb24rKztcbiAgICAgICAgY2FwdHVyZUVuZCA9IHN0YXRlLnBvc2l0aW9uO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICB9IGVsc2UgaWYgKGlzX0VPTChjaCkpIHtcbiAgICAgIGNhcHR1cmVTZWdtZW50KHN0YXRlLCBjYXB0dXJlU3RhcnQsIGNhcHR1cmVFbmQsIHRydWUpO1xuICAgICAgd3JpdGVGb2xkZWRMaW5lcyhzdGF0ZSwgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgZmFsc2UsIG5vZGVJbmRlbnQpKTtcbiAgICAgIGNhcHR1cmVTdGFydCA9IGNhcHR1cmVFbmQgPSBzdGF0ZS5wb3NpdGlvbjtcblxuICAgIH0gZWxzZSBpZiAoc3RhdGUucG9zaXRpb24gPT09IHN0YXRlLmxpbmVTdGFydCAmJiB0ZXN0RG9jdW1lbnRTZXBhcmF0b3Ioc3RhdGUpKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAndW5leHBlY3RlZCBlbmQgb2YgdGhlIGRvY3VtZW50IHdpdGhpbiBhIHNpbmdsZSBxdW90ZWQgc2NhbGFyJyk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdGUucG9zaXRpb24rKztcbiAgICAgIGNhcHR1cmVFbmQgPSBzdGF0ZS5wb3NpdGlvbjtcbiAgICB9XG4gIH1cblxuICB0aHJvd0Vycm9yKHN0YXRlLCAndW5leHBlY3RlZCBlbmQgb2YgdGhlIHN0cmVhbSB3aXRoaW4gYSBzaW5nbGUgcXVvdGVkIHNjYWxhcicpO1xufVxuXG5mdW5jdGlvbiByZWFkRG91YmxlUXVvdGVkU2NhbGFyKHN0YXRlLCBub2RlSW5kZW50KSB7XG4gIHZhciBjYXB0dXJlU3RhcnQsXG4gICAgICBjYXB0dXJlRW5kLFxuICAgICAgaGV4TGVuZ3RoLFxuICAgICAgaGV4UmVzdWx0LFxuICAgICAgdG1wLFxuICAgICAgY2g7XG5cbiAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICBpZiAoY2ggIT09IDB4MjIvKiBcIiAqLykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0YXRlLmtpbmQgPSAnc2NhbGFyJztcbiAgc3RhdGUucmVzdWx0ID0gJyc7XG4gIHN0YXRlLnBvc2l0aW9uKys7XG4gIGNhcHR1cmVTdGFydCA9IGNhcHR1cmVFbmQgPSBzdGF0ZS5wb3NpdGlvbjtcblxuICB3aGlsZSAoKGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbikpICE9PSAwKSB7XG4gICAgaWYgKGNoID09PSAweDIyLyogXCIgKi8pIHtcbiAgICAgIGNhcHR1cmVTZWdtZW50KHN0YXRlLCBjYXB0dXJlU3RhcnQsIHN0YXRlLnBvc2l0aW9uLCB0cnVlKTtcbiAgICAgIHN0YXRlLnBvc2l0aW9uKys7XG4gICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIH0gZWxzZSBpZiAoY2ggPT09IDB4NUMvKiBcXCAqLykge1xuICAgICAgY2FwdHVyZVNlZ21lbnQoc3RhdGUsIGNhcHR1cmVTdGFydCwgc3RhdGUucG9zaXRpb24sIHRydWUpO1xuICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuXG4gICAgICBpZiAoaXNfRU9MKGNoKSkge1xuICAgICAgICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCBmYWxzZSwgbm9kZUluZGVudCk7XG5cbiAgICAgICAgLy8gVE9ETzogcmV3b3JrIHRvIGlubGluZSBmbiB3aXRoIG5vIHR5cGUgY2FzdD9cbiAgICAgIH0gZWxzZSBpZiAoY2ggPCAyNTYgJiYgc2ltcGxlRXNjYXBlQ2hlY2tbY2hdKSB7XG4gICAgICAgIHN0YXRlLnJlc3VsdCArPSBzaW1wbGVFc2NhcGVNYXBbY2hdO1xuICAgICAgICBzdGF0ZS5wb3NpdGlvbisrO1xuXG4gICAgICB9IGVsc2UgaWYgKCh0bXAgPSBlc2NhcGVkSGV4TGVuKGNoKSkgPiAwKSB7XG4gICAgICAgIGhleExlbmd0aCA9IHRtcDtcbiAgICAgICAgaGV4UmVzdWx0ID0gMDtcblxuICAgICAgICBmb3IgKDsgaGV4TGVuZ3RoID4gMDsgaGV4TGVuZ3RoLS0pIHtcbiAgICAgICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG5cbiAgICAgICAgICBpZiAoKHRtcCA9IGZyb21IZXhDb2RlKGNoKSkgPj0gMCkge1xuICAgICAgICAgICAgaGV4UmVzdWx0ID0gKGhleFJlc3VsdCA8PCA0KSArIHRtcDtcblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnZXhwZWN0ZWQgaGV4YWRlY2ltYWwgY2hhcmFjdGVyJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUucmVzdWx0ICs9IGNoYXJGcm9tQ29kZXBvaW50KGhleFJlc3VsdCk7XG5cbiAgICAgICAgc3RhdGUucG9zaXRpb24rKztcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3Vua25vd24gZXNjYXBlIHNlcXVlbmNlJyk7XG4gICAgICB9XG5cbiAgICAgIGNhcHR1cmVTdGFydCA9IGNhcHR1cmVFbmQgPSBzdGF0ZS5wb3NpdGlvbjtcblxuICAgIH0gZWxzZSBpZiAoaXNfRU9MKGNoKSkge1xuICAgICAgY2FwdHVyZVNlZ21lbnQoc3RhdGUsIGNhcHR1cmVTdGFydCwgY2FwdHVyZUVuZCwgdHJ1ZSk7XG4gICAgICB3cml0ZUZvbGRlZExpbmVzKHN0YXRlLCBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCBmYWxzZSwgbm9kZUluZGVudCkpO1xuICAgICAgY2FwdHVyZVN0YXJ0ID0gY2FwdHVyZUVuZCA9IHN0YXRlLnBvc2l0aW9uO1xuXG4gICAgfSBlbHNlIGlmIChzdGF0ZS5wb3NpdGlvbiA9PT0gc3RhdGUubGluZVN0YXJ0ICYmIHRlc3REb2N1bWVudFNlcGFyYXRvcihzdGF0ZSkpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICd1bmV4cGVjdGVkIGVuZCBvZiB0aGUgZG9jdW1lbnQgd2l0aGluIGEgZG91YmxlIHF1b3RlZCBzY2FsYXInKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ZS5wb3NpdGlvbisrO1xuICAgICAgY2FwdHVyZUVuZCA9IHN0YXRlLnBvc2l0aW9uO1xuICAgIH1cbiAgfVxuXG4gIHRocm93RXJyb3Ioc3RhdGUsICd1bmV4cGVjdGVkIGVuZCBvZiB0aGUgc3RyZWFtIHdpdGhpbiBhIGRvdWJsZSBxdW90ZWQgc2NhbGFyJyk7XG59XG5cbmZ1bmN0aW9uIHJlYWRGbG93Q29sbGVjdGlvbihzdGF0ZSwgbm9kZUluZGVudCkge1xuICB2YXIgcmVhZE5leHQgPSB0cnVlLFxuICAgICAgX2xpbmUsXG4gICAgICBfdGFnICAgICA9IHN0YXRlLnRhZyxcbiAgICAgIF9yZXN1bHQsXG4gICAgICBfYW5jaG9yICA9IHN0YXRlLmFuY2hvcixcbiAgICAgIGZvbGxvd2luZyxcbiAgICAgIHRlcm1pbmF0b3IsXG4gICAgICBpc1BhaXIsXG4gICAgICBpc0V4cGxpY2l0UGFpcixcbiAgICAgIGlzTWFwcGluZyxcbiAgICAgIG92ZXJyaWRhYmxlS2V5cyA9IHt9LFxuICAgICAga2V5Tm9kZSxcbiAgICAgIGtleVRhZyxcbiAgICAgIHZhbHVlTm9kZSxcbiAgICAgIGNoO1xuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG5cbiAgaWYgKGNoID09PSAweDVCLyogWyAqLykge1xuICAgIHRlcm1pbmF0b3IgPSAweDVEOy8qIF0gKi9cbiAgICBpc01hcHBpbmcgPSBmYWxzZTtcbiAgICBfcmVzdWx0ID0gW107XG4gIH0gZWxzZSBpZiAoY2ggPT09IDB4N0IvKiB7ICovKSB7XG4gICAgdGVybWluYXRvciA9IDB4N0Q7LyogfSAqL1xuICAgIGlzTWFwcGluZyA9IHRydWU7XG4gICAgX3Jlc3VsdCA9IHt9O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChzdGF0ZS5hbmNob3IgIT09IG51bGwpIHtcbiAgICBzdGF0ZS5hbmNob3JNYXBbc3RhdGUuYW5jaG9yXSA9IF9yZXN1bHQ7XG4gIH1cblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG5cbiAgd2hpbGUgKGNoICE9PSAwKSB7XG4gICAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgbm9kZUluZGVudCk7XG5cbiAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gICAgaWYgKGNoID09PSB0ZXJtaW5hdG9yKSB7XG4gICAgICBzdGF0ZS5wb3NpdGlvbisrO1xuICAgICAgc3RhdGUudGFnID0gX3RhZztcbiAgICAgIHN0YXRlLmFuY2hvciA9IF9hbmNob3I7XG4gICAgICBzdGF0ZS5raW5kID0gaXNNYXBwaW5nID8gJ21hcHBpbmcnIDogJ3NlcXVlbmNlJztcbiAgICAgIHN0YXRlLnJlc3VsdCA9IF9yZXN1bHQ7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKCFyZWFkTmV4dCkge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ21pc3NlZCBjb21tYSBiZXR3ZWVuIGZsb3cgY29sbGVjdGlvbiBlbnRyaWVzJyk7XG4gICAgfVxuXG4gICAga2V5VGFnID0ga2V5Tm9kZSA9IHZhbHVlTm9kZSA9IG51bGw7XG4gICAgaXNQYWlyID0gaXNFeHBsaWNpdFBhaXIgPSBmYWxzZTtcblxuICAgIGlmIChjaCA9PT0gMHgzRi8qID8gKi8pIHtcbiAgICAgIGZvbGxvd2luZyA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24gKyAxKTtcblxuICAgICAgaWYgKGlzX1dTX09SX0VPTChmb2xsb3dpbmcpKSB7XG4gICAgICAgIGlzUGFpciA9IGlzRXhwbGljaXRQYWlyID0gdHJ1ZTtcbiAgICAgICAgc3RhdGUucG9zaXRpb24rKztcbiAgICAgICAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgbm9kZUluZGVudCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgX2xpbmUgPSBzdGF0ZS5saW5lO1xuICAgIGNvbXBvc2VOb2RlKHN0YXRlLCBub2RlSW5kZW50LCBDT05URVhUX0ZMT1dfSU4sIGZhbHNlLCB0cnVlKTtcbiAgICBrZXlUYWcgPSBzdGF0ZS50YWc7XG4gICAga2V5Tm9kZSA9IHN0YXRlLnJlc3VsdDtcbiAgICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCBub2RlSW5kZW50KTtcblxuICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG5cbiAgICBpZiAoKGlzRXhwbGljaXRQYWlyIHx8IHN0YXRlLmxpbmUgPT09IF9saW5lKSAmJiBjaCA9PT0gMHgzQS8qIDogKi8pIHtcbiAgICAgIGlzUGFpciA9IHRydWU7XG4gICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gICAgICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCBub2RlSW5kZW50KTtcbiAgICAgIGNvbXBvc2VOb2RlKHN0YXRlLCBub2RlSW5kZW50LCBDT05URVhUX0ZMT1dfSU4sIGZhbHNlLCB0cnVlKTtcbiAgICAgIHZhbHVlTm9kZSA9IHN0YXRlLnJlc3VsdDtcbiAgICB9XG5cbiAgICBpZiAoaXNNYXBwaW5nKSB7XG4gICAgICBzdG9yZU1hcHBpbmdQYWlyKHN0YXRlLCBfcmVzdWx0LCBvdmVycmlkYWJsZUtleXMsIGtleVRhZywga2V5Tm9kZSwgdmFsdWVOb2RlKTtcbiAgICB9IGVsc2UgaWYgKGlzUGFpcikge1xuICAgICAgX3Jlc3VsdC5wdXNoKHN0b3JlTWFwcGluZ1BhaXIoc3RhdGUsIG51bGwsIG92ZXJyaWRhYmxlS2V5cywga2V5VGFnLCBrZXlOb2RlLCB2YWx1ZU5vZGUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgX3Jlc3VsdC5wdXNoKGtleU5vZGUpO1xuICAgIH1cblxuICAgIHNraXBTZXBhcmF0aW9uU3BhY2Uoc3RhdGUsIHRydWUsIG5vZGVJbmRlbnQpO1xuXG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICAgIGlmIChjaCA9PT0gMHgyQy8qICwgKi8pIHtcbiAgICAgIHJlYWROZXh0ID0gdHJ1ZTtcbiAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVhZE5leHQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICB0aHJvd0Vycm9yKHN0YXRlLCAndW5leHBlY3RlZCBlbmQgb2YgdGhlIHN0cmVhbSB3aXRoaW4gYSBmbG93IGNvbGxlY3Rpb24nKTtcbn1cblxuZnVuY3Rpb24gcmVhZEJsb2NrU2NhbGFyKHN0YXRlLCBub2RlSW5kZW50KSB7XG4gIHZhciBjYXB0dXJlU3RhcnQsXG4gICAgICBmb2xkaW5nLFxuICAgICAgY2hvbXBpbmcgICAgICAgPSBDSE9NUElOR19DTElQLFxuICAgICAgZGlkUmVhZENvbnRlbnQgPSBmYWxzZSxcbiAgICAgIGRldGVjdGVkSW5kZW50ID0gZmFsc2UsXG4gICAgICB0ZXh0SW5kZW50ICAgICA9IG5vZGVJbmRlbnQsXG4gICAgICBlbXB0eUxpbmVzICAgICA9IDAsXG4gICAgICBhdE1vcmVJbmRlbnRlZCA9IGZhbHNlLFxuICAgICAgdG1wLFxuICAgICAgY2g7XG5cbiAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICBpZiAoY2ggPT09IDB4N0MvKiB8ICovKSB7XG4gICAgZm9sZGluZyA9IGZhbHNlO1xuICB9IGVsc2UgaWYgKGNoID09PSAweDNFLyogPiAqLykge1xuICAgIGZvbGRpbmcgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0YXRlLmtpbmQgPSAnc2NhbGFyJztcbiAgc3RhdGUucmVzdWx0ID0gJyc7XG5cbiAgd2hpbGUgKGNoICE9PSAwKSB7XG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuXG4gICAgaWYgKGNoID09PSAweDJCLyogKyAqLyB8fCBjaCA9PT0gMHgyRC8qIC0gKi8pIHtcbiAgICAgIGlmIChDSE9NUElOR19DTElQID09PSBjaG9tcGluZykge1xuICAgICAgICBjaG9tcGluZyA9IChjaCA9PT0gMHgyQi8qICsgKi8pID8gQ0hPTVBJTkdfS0VFUCA6IENIT01QSU5HX1NUUklQO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3JlcGVhdCBvZiBhIGNob21waW5nIG1vZGUgaWRlbnRpZmllcicpO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIGlmICgodG1wID0gZnJvbURlY2ltYWxDb2RlKGNoKSkgPj0gMCkge1xuICAgICAgaWYgKHRtcCA9PT0gMCkge1xuICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnYmFkIGV4cGxpY2l0IGluZGVudGF0aW9uIHdpZHRoIG9mIGEgYmxvY2sgc2NhbGFyOyBpdCBjYW5ub3QgYmUgbGVzcyB0aGFuIG9uZScpO1xuICAgICAgfSBlbHNlIGlmICghZGV0ZWN0ZWRJbmRlbnQpIHtcbiAgICAgICAgdGV4dEluZGVudCA9IG5vZGVJbmRlbnQgKyB0bXAgLSAxO1xuICAgICAgICBkZXRlY3RlZEluZGVudCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAncmVwZWF0IG9mIGFuIGluZGVudGF0aW9uIHdpZHRoIGlkZW50aWZpZXInKTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBpZiAoaXNfV0hJVEVfU1BBQ0UoY2gpKSB7XG4gICAgZG8geyBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7IH1cbiAgICB3aGlsZSAoaXNfV0hJVEVfU1BBQ0UoY2gpKTtcblxuICAgIGlmIChjaCA9PT0gMHgyMy8qICMgKi8pIHtcbiAgICAgIGRvIHsgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pOyB9XG4gICAgICB3aGlsZSAoIWlzX0VPTChjaCkgJiYgKGNoICE9PSAwKSk7XG4gICAgfVxuICB9XG5cbiAgd2hpbGUgKGNoICE9PSAwKSB7XG4gICAgcmVhZExpbmVCcmVhayhzdGF0ZSk7XG4gICAgc3RhdGUubGluZUluZGVudCA9IDA7XG5cbiAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gICAgd2hpbGUgKCghZGV0ZWN0ZWRJbmRlbnQgfHwgc3RhdGUubGluZUluZGVudCA8IHRleHRJbmRlbnQpICYmXG4gICAgICAgICAgIChjaCA9PT0gMHgyMC8qIFNwYWNlICovKSkge1xuICAgICAgc3RhdGUubGluZUluZGVudCsrO1xuICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgIH1cblxuICAgIGlmICghZGV0ZWN0ZWRJbmRlbnQgJiYgc3RhdGUubGluZUluZGVudCA+IHRleHRJbmRlbnQpIHtcbiAgICAgIHRleHRJbmRlbnQgPSBzdGF0ZS5saW5lSW5kZW50O1xuICAgIH1cblxuICAgIGlmIChpc19FT0woY2gpKSB7XG4gICAgICBlbXB0eUxpbmVzKys7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBFbmQgb2YgdGhlIHNjYWxhci5cbiAgICBpZiAoc3RhdGUubGluZUluZGVudCA8IHRleHRJbmRlbnQpIHtcblxuICAgICAgLy8gUGVyZm9ybSB0aGUgY2hvbXBpbmcuXG4gICAgICBpZiAoY2hvbXBpbmcgPT09IENIT01QSU5HX0tFRVApIHtcbiAgICAgICAgc3RhdGUucmVzdWx0ICs9IGNvbW1vbi5yZXBlYXQoJ1xcbicsIGRpZFJlYWRDb250ZW50ID8gMSArIGVtcHR5TGluZXMgOiBlbXB0eUxpbmVzKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hvbXBpbmcgPT09IENIT01QSU5HX0NMSVApIHtcbiAgICAgICAgaWYgKGRpZFJlYWRDb250ZW50KSB7IC8vIGkuZS4gb25seSBpZiB0aGUgc2NhbGFyIGlzIG5vdCBlbXB0eS5cbiAgICAgICAgICBzdGF0ZS5yZXN1bHQgKz0gJ1xcbic7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQnJlYWsgdGhpcyBgd2hpbGVgIGN5Y2xlIGFuZCBnbyB0byB0aGUgZnVuY2l0b24ncyBlcGlsb2d1ZS5cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIC8vIEZvbGRlZCBzdHlsZTogdXNlIGZhbmN5IHJ1bGVzIHRvIGhhbmRsZSBsaW5lIGJyZWFrcy5cbiAgICBpZiAoZm9sZGluZykge1xuXG4gICAgICAvLyBMaW5lcyBzdGFydGluZyB3aXRoIHdoaXRlIHNwYWNlIGNoYXJhY3RlcnMgKG1vcmUtaW5kZW50ZWQgbGluZXMpIGFyZSBub3QgZm9sZGVkLlxuICAgICAgaWYgKGlzX1dISVRFX1NQQUNFKGNoKSkge1xuICAgICAgICBhdE1vcmVJbmRlbnRlZCA9IHRydWU7XG4gICAgICAgIC8vIGV4Y2VwdCBmb3IgdGhlIGZpcnN0IGNvbnRlbnQgbGluZSAoY2YuIEV4YW1wbGUgOC4xKVxuICAgICAgICBzdGF0ZS5yZXN1bHQgKz0gY29tbW9uLnJlcGVhdCgnXFxuJywgZGlkUmVhZENvbnRlbnQgPyAxICsgZW1wdHlMaW5lcyA6IGVtcHR5TGluZXMpO1xuXG4gICAgICAvLyBFbmQgb2YgbW9yZS1pbmRlbnRlZCBibG9jay5cbiAgICAgIH0gZWxzZSBpZiAoYXRNb3JlSW5kZW50ZWQpIHtcbiAgICAgICAgYXRNb3JlSW5kZW50ZWQgPSBmYWxzZTtcbiAgICAgICAgc3RhdGUucmVzdWx0ICs9IGNvbW1vbi5yZXBlYXQoJ1xcbicsIGVtcHR5TGluZXMgKyAxKTtcblxuICAgICAgLy8gSnVzdCBvbmUgbGluZSBicmVhayAtIHBlcmNlaXZlIGFzIHRoZSBzYW1lIGxpbmUuXG4gICAgICB9IGVsc2UgaWYgKGVtcHR5TGluZXMgPT09IDApIHtcbiAgICAgICAgaWYgKGRpZFJlYWRDb250ZW50KSB7IC8vIGkuZS4gb25seSBpZiB3ZSBoYXZlIGFscmVhZHkgcmVhZCBzb21lIHNjYWxhciBjb250ZW50LlxuICAgICAgICAgIHN0YXRlLnJlc3VsdCArPSAnICc7XG4gICAgICAgIH1cblxuICAgICAgLy8gU2V2ZXJhbCBsaW5lIGJyZWFrcyAtIHBlcmNlaXZlIGFzIGRpZmZlcmVudCBsaW5lcy5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXRlLnJlc3VsdCArPSBjb21tb24ucmVwZWF0KCdcXG4nLCBlbXB0eUxpbmVzKTtcbiAgICAgIH1cblxuICAgIC8vIExpdGVyYWwgc3R5bGU6IGp1c3QgYWRkIGV4YWN0IG51bWJlciBvZiBsaW5lIGJyZWFrcyBiZXR3ZWVuIGNvbnRlbnQgbGluZXMuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEtlZXAgYWxsIGxpbmUgYnJlYWtzIGV4Y2VwdCB0aGUgaGVhZGVyIGxpbmUgYnJlYWsuXG4gICAgICBzdGF0ZS5yZXN1bHQgKz0gY29tbW9uLnJlcGVhdCgnXFxuJywgZGlkUmVhZENvbnRlbnQgPyAxICsgZW1wdHlMaW5lcyA6IGVtcHR5TGluZXMpO1xuICAgIH1cblxuICAgIGRpZFJlYWRDb250ZW50ID0gdHJ1ZTtcbiAgICBkZXRlY3RlZEluZGVudCA9IHRydWU7XG4gICAgZW1wdHlMaW5lcyA9IDA7XG4gICAgY2FwdHVyZVN0YXJ0ID0gc3RhdGUucG9zaXRpb247XG5cbiAgICB3aGlsZSAoIWlzX0VPTChjaCkgJiYgKGNoICE9PSAwKSkge1xuICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgIH1cblxuICAgIGNhcHR1cmVTZWdtZW50KHN0YXRlLCBjYXB0dXJlU3RhcnQsIHN0YXRlLnBvc2l0aW9uLCBmYWxzZSk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gcmVhZEJsb2NrU2VxdWVuY2Uoc3RhdGUsIG5vZGVJbmRlbnQpIHtcbiAgdmFyIF9saW5lLFxuICAgICAgX3RhZyAgICAgID0gc3RhdGUudGFnLFxuICAgICAgX2FuY2hvciAgID0gc3RhdGUuYW5jaG9yLFxuICAgICAgX3Jlc3VsdCAgID0gW10sXG4gICAgICBmb2xsb3dpbmcsXG4gICAgICBkZXRlY3RlZCAgPSBmYWxzZSxcbiAgICAgIGNoO1xuXG4gIGlmIChzdGF0ZS5hbmNob3IgIT09IG51bGwpIHtcbiAgICBzdGF0ZS5hbmNob3JNYXBbc3RhdGUuYW5jaG9yXSA9IF9yZXN1bHQ7XG4gIH1cblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gIHdoaWxlIChjaCAhPT0gMCkge1xuXG4gICAgaWYgKGNoICE9PSAweDJELyogLSAqLykge1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgZm9sbG93aW5nID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbiArIDEpO1xuXG4gICAgaWYgKCFpc19XU19PUl9FT0woZm9sbG93aW5nKSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgZGV0ZWN0ZWQgPSB0cnVlO1xuICAgIHN0YXRlLnBvc2l0aW9uKys7XG5cbiAgICBpZiAoc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgLTEpKSB7XG4gICAgICBpZiAoc3RhdGUubGluZUluZGVudCA8PSBub2RlSW5kZW50KSB7XG4gICAgICAgIF9yZXN1bHQucHVzaChudWxsKTtcbiAgICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgX2xpbmUgPSBzdGF0ZS5saW5lO1xuICAgIGNvbXBvc2VOb2RlKHN0YXRlLCBub2RlSW5kZW50LCBDT05URVhUX0JMT0NLX0lOLCBmYWxzZSwgdHJ1ZSk7XG4gICAgX3Jlc3VsdC5wdXNoKHN0YXRlLnJlc3VsdCk7XG4gICAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgLTEpO1xuXG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICAgIGlmICgoc3RhdGUubGluZSA9PT0gX2xpbmUgfHwgc3RhdGUubGluZUluZGVudCA+IG5vZGVJbmRlbnQpICYmIChjaCAhPT0gMCkpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdiYWQgaW5kZW50YXRpb24gb2YgYSBzZXF1ZW5jZSBlbnRyeScpO1xuICAgIH0gZWxzZSBpZiAoc3RhdGUubGluZUluZGVudCA8IG5vZGVJbmRlbnQpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGlmIChkZXRlY3RlZCkge1xuICAgIHN0YXRlLnRhZyA9IF90YWc7XG4gICAgc3RhdGUuYW5jaG9yID0gX2FuY2hvcjtcbiAgICBzdGF0ZS5raW5kID0gJ3NlcXVlbmNlJztcbiAgICBzdGF0ZS5yZXN1bHQgPSBfcmVzdWx0O1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gcmVhZEJsb2NrTWFwcGluZyhzdGF0ZSwgbm9kZUluZGVudCwgZmxvd0luZGVudCkge1xuICB2YXIgZm9sbG93aW5nLFxuICAgICAgYWxsb3dDb21wYWN0LFxuICAgICAgX2xpbmUsXG4gICAgICBfcG9zLFxuICAgICAgX3RhZyAgICAgICAgICA9IHN0YXRlLnRhZyxcbiAgICAgIF9hbmNob3IgICAgICAgPSBzdGF0ZS5hbmNob3IsXG4gICAgICBfcmVzdWx0ICAgICAgID0ge30sXG4gICAgICBvdmVycmlkYWJsZUtleXMgPSB7fSxcbiAgICAgIGtleVRhZyAgICAgICAgPSBudWxsLFxuICAgICAga2V5Tm9kZSAgICAgICA9IG51bGwsXG4gICAgICB2YWx1ZU5vZGUgICAgID0gbnVsbCxcbiAgICAgIGF0RXhwbGljaXRLZXkgPSBmYWxzZSxcbiAgICAgIGRldGVjdGVkICAgICAgPSBmYWxzZSxcbiAgICAgIGNoO1xuXG4gIGlmIChzdGF0ZS5hbmNob3IgIT09IG51bGwpIHtcbiAgICBzdGF0ZS5hbmNob3JNYXBbc3RhdGUuYW5jaG9yXSA9IF9yZXN1bHQ7XG4gIH1cblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gIHdoaWxlIChjaCAhPT0gMCkge1xuICAgIGZvbGxvd2luZyA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24gKyAxKTtcbiAgICBfbGluZSA9IHN0YXRlLmxpbmU7IC8vIFNhdmUgdGhlIGN1cnJlbnQgbGluZS5cbiAgICBfcG9zID0gc3RhdGUucG9zaXRpb247XG5cbiAgICAvL1xuICAgIC8vIEV4cGxpY2l0IG5vdGF0aW9uIGNhc2UuIFRoZXJlIGFyZSB0d28gc2VwYXJhdGUgYmxvY2tzOlxuICAgIC8vIGZpcnN0IGZvciB0aGUga2V5IChkZW5vdGVkIGJ5IFwiP1wiKSBhbmQgc2Vjb25kIGZvciB0aGUgdmFsdWUgKGRlbm90ZWQgYnkgXCI6XCIpXG4gICAgLy9cbiAgICBpZiAoKGNoID09PSAweDNGLyogPyAqLyB8fCBjaCA9PT0gMHgzQS8qIDogKi8pICYmIGlzX1dTX09SX0VPTChmb2xsb3dpbmcpKSB7XG5cbiAgICAgIGlmIChjaCA9PT0gMHgzRi8qID8gKi8pIHtcbiAgICAgICAgaWYgKGF0RXhwbGljaXRLZXkpIHtcbiAgICAgICAgICBzdG9yZU1hcHBpbmdQYWlyKHN0YXRlLCBfcmVzdWx0LCBvdmVycmlkYWJsZUtleXMsIGtleVRhZywga2V5Tm9kZSwgbnVsbCk7XG4gICAgICAgICAga2V5VGFnID0ga2V5Tm9kZSA9IHZhbHVlTm9kZSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBkZXRlY3RlZCA9IHRydWU7XG4gICAgICAgIGF0RXhwbGljaXRLZXkgPSB0cnVlO1xuICAgICAgICBhbGxvd0NvbXBhY3QgPSB0cnVlO1xuXG4gICAgICB9IGVsc2UgaWYgKGF0RXhwbGljaXRLZXkpIHtcbiAgICAgICAgLy8gaS5lLiAweDNBLyogOiAqLyA9PT0gY2hhcmFjdGVyIGFmdGVyIHRoZSBleHBsaWNpdCBrZXkuXG4gICAgICAgIGF0RXhwbGljaXRLZXkgPSBmYWxzZTtcbiAgICAgICAgYWxsb3dDb21wYWN0ID0gdHJ1ZTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2luY29tcGxldGUgZXhwbGljaXQgbWFwcGluZyBwYWlyOyBhIGtleSBub2RlIGlzIG1pc3NlZDsgb3IgZm9sbG93ZWQgYnkgYSBub24tdGFidWxhdGVkIGVtcHR5IGxpbmUnKTtcbiAgICAgIH1cblxuICAgICAgc3RhdGUucG9zaXRpb24gKz0gMTtcbiAgICAgIGNoID0gZm9sbG93aW5nO1xuXG4gICAgLy9cbiAgICAvLyBJbXBsaWNpdCBub3RhdGlvbiBjYXNlLiBGbG93LXN0eWxlIG5vZGUgYXMgdGhlIGtleSBmaXJzdCwgdGhlbiBcIjpcIiwgYW5kIHRoZSB2YWx1ZS5cbiAgICAvL1xuICAgIH0gZWxzZSBpZiAoY29tcG9zZU5vZGUoc3RhdGUsIGZsb3dJbmRlbnQsIENPTlRFWFRfRkxPV19PVVQsIGZhbHNlLCB0cnVlKSkge1xuXG4gICAgICBpZiAoc3RhdGUubGluZSA9PT0gX2xpbmUpIHtcbiAgICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICAgICAgICB3aGlsZSAoaXNfV0hJVEVfU1BBQ0UoY2gpKSB7XG4gICAgICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoID09PSAweDNBLyogOiAqLykge1xuICAgICAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcblxuICAgICAgICAgIGlmICghaXNfV1NfT1JfRU9MKGNoKSkge1xuICAgICAgICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2Egd2hpdGVzcGFjZSBjaGFyYWN0ZXIgaXMgZXhwZWN0ZWQgYWZ0ZXIgdGhlIGtleS12YWx1ZSBzZXBhcmF0b3Igd2l0aGluIGEgYmxvY2sgbWFwcGluZycpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChhdEV4cGxpY2l0S2V5KSB7XG4gICAgICAgICAgICBzdG9yZU1hcHBpbmdQYWlyKHN0YXRlLCBfcmVzdWx0LCBvdmVycmlkYWJsZUtleXMsIGtleVRhZywga2V5Tm9kZSwgbnVsbCk7XG4gICAgICAgICAgICBrZXlUYWcgPSBrZXlOb2RlID0gdmFsdWVOb2RlID0gbnVsbDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkZXRlY3RlZCA9IHRydWU7XG4gICAgICAgICAgYXRFeHBsaWNpdEtleSA9IGZhbHNlO1xuICAgICAgICAgIGFsbG93Q29tcGFjdCA9IGZhbHNlO1xuICAgICAgICAgIGtleVRhZyA9IHN0YXRlLnRhZztcbiAgICAgICAgICBrZXlOb2RlID0gc3RhdGUucmVzdWx0O1xuXG4gICAgICAgIH0gZWxzZSBpZiAoZGV0ZWN0ZWQpIHtcbiAgICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnY2FuIG5vdCByZWFkIGFuIGltcGxpY2l0IG1hcHBpbmcgcGFpcjsgYSBjb2xvbiBpcyBtaXNzZWQnKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0YXRlLnRhZyA9IF90YWc7XG4gICAgICAgICAgc3RhdGUuYW5jaG9yID0gX2FuY2hvcjtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTsgLy8gS2VlcCB0aGUgcmVzdWx0IG9mIGBjb21wb3NlTm9kZWAuXG4gICAgICAgIH1cblxuICAgICAgfSBlbHNlIGlmIChkZXRlY3RlZCkge1xuICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnY2FuIG5vdCByZWFkIGEgYmxvY2sgbWFwcGluZyBlbnRyeTsgYSBtdWx0aWxpbmUga2V5IG1heSBub3QgYmUgYW4gaW1wbGljaXQga2V5Jyk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXRlLnRhZyA9IF90YWc7XG4gICAgICAgIHN0YXRlLmFuY2hvciA9IF9hbmNob3I7XG4gICAgICAgIHJldHVybiB0cnVlOyAvLyBLZWVwIHRoZSByZXN1bHQgb2YgYGNvbXBvc2VOb2RlYC5cbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICBicmVhazsgLy8gUmVhZGluZyBpcyBkb25lLiBHbyB0byB0aGUgZXBpbG9ndWUuXG4gICAgfVxuXG4gICAgLy9cbiAgICAvLyBDb21tb24gcmVhZGluZyBjb2RlIGZvciBib3RoIGV4cGxpY2l0IGFuZCBpbXBsaWNpdCBub3RhdGlvbnMuXG4gICAgLy9cbiAgICBpZiAoc3RhdGUubGluZSA9PT0gX2xpbmUgfHwgc3RhdGUubGluZUluZGVudCA+IG5vZGVJbmRlbnQpIHtcbiAgICAgIGlmIChjb21wb3NlTm9kZShzdGF0ZSwgbm9kZUluZGVudCwgQ09OVEVYVF9CTE9DS19PVVQsIHRydWUsIGFsbG93Q29tcGFjdCkpIHtcbiAgICAgICAgaWYgKGF0RXhwbGljaXRLZXkpIHtcbiAgICAgICAgICBrZXlOb2RlID0gc3RhdGUucmVzdWx0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhbHVlTm9kZSA9IHN0YXRlLnJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIWF0RXhwbGljaXRLZXkpIHtcbiAgICAgICAgc3RvcmVNYXBwaW5nUGFpcihzdGF0ZSwgX3Jlc3VsdCwgb3ZlcnJpZGFibGVLZXlzLCBrZXlUYWcsIGtleU5vZGUsIHZhbHVlTm9kZSwgX2xpbmUsIF9wb3MpO1xuICAgICAgICBrZXlUYWcgPSBrZXlOb2RlID0gdmFsdWVOb2RlID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgLTEpO1xuICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICBpZiAoc3RhdGUubGluZUluZGVudCA+IG5vZGVJbmRlbnQgJiYgKGNoICE9PSAwKSkge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2JhZCBpbmRlbnRhdGlvbiBvZiBhIG1hcHBpbmcgZW50cnknKTtcbiAgICB9IGVsc2UgaWYgKHN0YXRlLmxpbmVJbmRlbnQgPCBub2RlSW5kZW50KSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvL1xuICAvLyBFcGlsb2d1ZS5cbiAgLy9cblxuICAvLyBTcGVjaWFsIGNhc2U6IGxhc3QgbWFwcGluZydzIG5vZGUgY29udGFpbnMgb25seSB0aGUga2V5IGluIGV4cGxpY2l0IG5vdGF0aW9uLlxuICBpZiAoYXRFeHBsaWNpdEtleSkge1xuICAgIHN0b3JlTWFwcGluZ1BhaXIoc3RhdGUsIF9yZXN1bHQsIG92ZXJyaWRhYmxlS2V5cywga2V5VGFnLCBrZXlOb2RlLCBudWxsKTtcbiAgfVxuXG4gIC8vIEV4cG9zZSB0aGUgcmVzdWx0aW5nIG1hcHBpbmcuXG4gIGlmIChkZXRlY3RlZCkge1xuICAgIHN0YXRlLnRhZyA9IF90YWc7XG4gICAgc3RhdGUuYW5jaG9yID0gX2FuY2hvcjtcbiAgICBzdGF0ZS5raW5kID0gJ21hcHBpbmcnO1xuICAgIHN0YXRlLnJlc3VsdCA9IF9yZXN1bHQ7XG4gIH1cblxuICByZXR1cm4gZGV0ZWN0ZWQ7XG59XG5cbmZ1bmN0aW9uIHJlYWRUYWdQcm9wZXJ0eShzdGF0ZSkge1xuICB2YXIgX3Bvc2l0aW9uLFxuICAgICAgaXNWZXJiYXRpbSA9IGZhbHNlLFxuICAgICAgaXNOYW1lZCAgICA9IGZhbHNlLFxuICAgICAgdGFnSGFuZGxlLFxuICAgICAgdGFnTmFtZSxcbiAgICAgIGNoO1xuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG5cbiAgaWYgKGNoICE9PSAweDIxLyogISAqLykgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChzdGF0ZS50YWcgIT09IG51bGwpIHtcbiAgICB0aHJvd0Vycm9yKHN0YXRlLCAnZHVwbGljYXRpb24gb2YgYSB0YWcgcHJvcGVydHknKTtcbiAgfVxuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcblxuICBpZiAoY2ggPT09IDB4M0MvKiA8ICovKSB7XG4gICAgaXNWZXJiYXRpbSA9IHRydWU7XG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuXG4gIH0gZWxzZSBpZiAoY2ggPT09IDB4MjEvKiAhICovKSB7XG4gICAgaXNOYW1lZCA9IHRydWU7XG4gICAgdGFnSGFuZGxlID0gJyEhJztcbiAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG5cbiAgfSBlbHNlIHtcbiAgICB0YWdIYW5kbGUgPSAnISc7XG4gIH1cblxuICBfcG9zaXRpb24gPSBzdGF0ZS5wb3NpdGlvbjtcblxuICBpZiAoaXNWZXJiYXRpbSkge1xuICAgIGRvIHsgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pOyB9XG4gICAgd2hpbGUgKGNoICE9PSAwICYmIGNoICE9PSAweDNFLyogPiAqLyk7XG5cbiAgICBpZiAoc3RhdGUucG9zaXRpb24gPCBzdGF0ZS5sZW5ndGgpIHtcbiAgICAgIHRhZ05hbWUgPSBzdGF0ZS5pbnB1dC5zbGljZShfcG9zaXRpb24sIHN0YXRlLnBvc2l0aW9uKTtcbiAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3VuZXhwZWN0ZWQgZW5kIG9mIHRoZSBzdHJlYW0gd2l0aGluIGEgdmVyYmF0aW0gdGFnJyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHdoaWxlIChjaCAhPT0gMCAmJiAhaXNfV1NfT1JfRU9MKGNoKSkge1xuXG4gICAgICBpZiAoY2ggPT09IDB4MjEvKiAhICovKSB7XG4gICAgICAgIGlmICghaXNOYW1lZCkge1xuICAgICAgICAgIHRhZ0hhbmRsZSA9IHN0YXRlLmlucHV0LnNsaWNlKF9wb3NpdGlvbiAtIDEsIHN0YXRlLnBvc2l0aW9uICsgMSk7XG5cbiAgICAgICAgICBpZiAoIVBBVFRFUk5fVEFHX0hBTkRMRS50ZXN0KHRhZ0hhbmRsZSkpIHtcbiAgICAgICAgICAgIHRocm93RXJyb3Ioc3RhdGUsICduYW1lZCB0YWcgaGFuZGxlIGNhbm5vdCBjb250YWluIHN1Y2ggY2hhcmFjdGVycycpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlzTmFtZWQgPSB0cnVlO1xuICAgICAgICAgIF9wb3NpdGlvbiA9IHN0YXRlLnBvc2l0aW9uICsgMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAndGFnIHN1ZmZpeCBjYW5ub3QgY29udGFpbiBleGNsYW1hdGlvbiBtYXJrcycpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICB0YWdOYW1lID0gc3RhdGUuaW5wdXQuc2xpY2UoX3Bvc2l0aW9uLCBzdGF0ZS5wb3NpdGlvbik7XG5cbiAgICBpZiAoUEFUVEVSTl9GTE9XX0lORElDQVRPUlMudGVzdCh0YWdOYW1lKSkge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3RhZyBzdWZmaXggY2Fubm90IGNvbnRhaW4gZmxvdyBpbmRpY2F0b3IgY2hhcmFjdGVycycpO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0YWdOYW1lICYmICFQQVRURVJOX1RBR19VUkkudGVzdCh0YWdOYW1lKSkge1xuICAgIHRocm93RXJyb3Ioc3RhdGUsICd0YWcgbmFtZSBjYW5ub3QgY29udGFpbiBzdWNoIGNoYXJhY3RlcnM6ICcgKyB0YWdOYW1lKTtcbiAgfVxuXG4gIGlmIChpc1ZlcmJhdGltKSB7XG4gICAgc3RhdGUudGFnID0gdGFnTmFtZTtcblxuICB9IGVsc2UgaWYgKF9oYXNPd25Qcm9wZXJ0eS5jYWxsKHN0YXRlLnRhZ01hcCwgdGFnSGFuZGxlKSkge1xuICAgIHN0YXRlLnRhZyA9IHN0YXRlLnRhZ01hcFt0YWdIYW5kbGVdICsgdGFnTmFtZTtcblxuICB9IGVsc2UgaWYgKHRhZ0hhbmRsZSA9PT0gJyEnKSB7XG4gICAgc3RhdGUudGFnID0gJyEnICsgdGFnTmFtZTtcblxuICB9IGVsc2UgaWYgKHRhZ0hhbmRsZSA9PT0gJyEhJykge1xuICAgIHN0YXRlLnRhZyA9ICd0YWc6eWFtbC5vcmcsMjAwMjonICsgdGFnTmFtZTtcblxuICB9IGVsc2Uge1xuICAgIHRocm93RXJyb3Ioc3RhdGUsICd1bmRlY2xhcmVkIHRhZyBoYW5kbGUgXCInICsgdGFnSGFuZGxlICsgJ1wiJyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gcmVhZEFuY2hvclByb3BlcnR5KHN0YXRlKSB7XG4gIHZhciBfcG9zaXRpb24sXG4gICAgICBjaDtcblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gIGlmIChjaCAhPT0gMHgyNi8qICYgKi8pIHJldHVybiBmYWxzZTtcblxuICBpZiAoc3RhdGUuYW5jaG9yICE9PSBudWxsKSB7XG4gICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2R1cGxpY2F0aW9uIG9mIGFuIGFuY2hvciBwcm9wZXJ0eScpO1xuICB9XG5cbiAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICBfcG9zaXRpb24gPSBzdGF0ZS5wb3NpdGlvbjtcblxuICB3aGlsZSAoY2ggIT09IDAgJiYgIWlzX1dTX09SX0VPTChjaCkgJiYgIWlzX0ZMT1dfSU5ESUNBVE9SKGNoKSkge1xuICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgfVxuXG4gIGlmIChzdGF0ZS5wb3NpdGlvbiA9PT0gX3Bvc2l0aW9uKSB7XG4gICAgdGhyb3dFcnJvcihzdGF0ZSwgJ25hbWUgb2YgYW4gYW5jaG9yIG5vZGUgbXVzdCBjb250YWluIGF0IGxlYXN0IG9uZSBjaGFyYWN0ZXInKTtcbiAgfVxuXG4gIHN0YXRlLmFuY2hvciA9IHN0YXRlLmlucHV0LnNsaWNlKF9wb3NpdGlvbiwgc3RhdGUucG9zaXRpb24pO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gcmVhZEFsaWFzKHN0YXRlKSB7XG4gIHZhciBfcG9zaXRpb24sIGFsaWFzLFxuICAgICAgY2g7XG5cbiAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICBpZiAoY2ggIT09IDB4MkEvKiAqICovKSByZXR1cm4gZmFsc2U7XG5cbiAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICBfcG9zaXRpb24gPSBzdGF0ZS5wb3NpdGlvbjtcblxuICB3aGlsZSAoY2ggIT09IDAgJiYgIWlzX1dTX09SX0VPTChjaCkgJiYgIWlzX0ZMT1dfSU5ESUNBVE9SKGNoKSkge1xuICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgfVxuXG4gIGlmIChzdGF0ZS5wb3NpdGlvbiA9PT0gX3Bvc2l0aW9uKSB7XG4gICAgdGhyb3dFcnJvcihzdGF0ZSwgJ25hbWUgb2YgYW4gYWxpYXMgbm9kZSBtdXN0IGNvbnRhaW4gYXQgbGVhc3Qgb25lIGNoYXJhY3RlcicpO1xuICB9XG5cbiAgYWxpYXMgPSBzdGF0ZS5pbnB1dC5zbGljZShfcG9zaXRpb24sIHN0YXRlLnBvc2l0aW9uKTtcblxuICBpZiAoIV9oYXNPd25Qcm9wZXJ0eS5jYWxsKHN0YXRlLmFuY2hvck1hcCwgYWxpYXMpKSB7XG4gICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3VuaWRlbnRpZmllZCBhbGlhcyBcIicgKyBhbGlhcyArICdcIicpO1xuICB9XG5cbiAgc3RhdGUucmVzdWx0ID0gc3RhdGUuYW5jaG9yTWFwW2FsaWFzXTtcbiAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgLTEpO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gY29tcG9zZU5vZGUoc3RhdGUsIHBhcmVudEluZGVudCwgbm9kZUNvbnRleHQsIGFsbG93VG9TZWVrLCBhbGxvd0NvbXBhY3QpIHtcbiAgdmFyIGFsbG93QmxvY2tTdHlsZXMsXG4gICAgICBhbGxvd0Jsb2NrU2NhbGFycyxcbiAgICAgIGFsbG93QmxvY2tDb2xsZWN0aW9ucyxcbiAgICAgIGluZGVudFN0YXR1cyA9IDEsIC8vIDE6IHRoaXM+cGFyZW50LCAwOiB0aGlzPXBhcmVudCwgLTE6IHRoaXM8cGFyZW50XG4gICAgICBhdE5ld0xpbmUgID0gZmFsc2UsXG4gICAgICBoYXNDb250ZW50ID0gZmFsc2UsXG4gICAgICB0eXBlSW5kZXgsXG4gICAgICB0eXBlUXVhbnRpdHksXG4gICAgICB0eXBlLFxuICAgICAgZmxvd0luZGVudCxcbiAgICAgIGJsb2NrSW5kZW50O1xuXG4gIGlmIChzdGF0ZS5saXN0ZW5lciAhPT0gbnVsbCkge1xuICAgIHN0YXRlLmxpc3RlbmVyKCdvcGVuJywgc3RhdGUpO1xuICB9XG5cbiAgc3RhdGUudGFnICAgID0gbnVsbDtcbiAgc3RhdGUuYW5jaG9yID0gbnVsbDtcbiAgc3RhdGUua2luZCAgID0gbnVsbDtcbiAgc3RhdGUucmVzdWx0ID0gbnVsbDtcblxuICBhbGxvd0Jsb2NrU3R5bGVzID0gYWxsb3dCbG9ja1NjYWxhcnMgPSBhbGxvd0Jsb2NrQ29sbGVjdGlvbnMgPVxuICAgIENPTlRFWFRfQkxPQ0tfT1VUID09PSBub2RlQ29udGV4dCB8fFxuICAgIENPTlRFWFRfQkxPQ0tfSU4gID09PSBub2RlQ29udGV4dDtcblxuICBpZiAoYWxsb3dUb1NlZWspIHtcbiAgICBpZiAoc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgLTEpKSB7XG4gICAgICBhdE5ld0xpbmUgPSB0cnVlO1xuXG4gICAgICBpZiAoc3RhdGUubGluZUluZGVudCA+IHBhcmVudEluZGVudCkge1xuICAgICAgICBpbmRlbnRTdGF0dXMgPSAxO1xuICAgICAgfSBlbHNlIGlmIChzdGF0ZS5saW5lSW5kZW50ID09PSBwYXJlbnRJbmRlbnQpIHtcbiAgICAgICAgaW5kZW50U3RhdHVzID0gMDtcbiAgICAgIH0gZWxzZSBpZiAoc3RhdGUubGluZUluZGVudCA8IHBhcmVudEluZGVudCkge1xuICAgICAgICBpbmRlbnRTdGF0dXMgPSAtMTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoaW5kZW50U3RhdHVzID09PSAxKSB7XG4gICAgd2hpbGUgKHJlYWRUYWdQcm9wZXJ0eShzdGF0ZSkgfHwgcmVhZEFuY2hvclByb3BlcnR5KHN0YXRlKSkge1xuICAgICAgaWYgKHNraXBTZXBhcmF0aW9uU3BhY2Uoc3RhdGUsIHRydWUsIC0xKSkge1xuICAgICAgICBhdE5ld0xpbmUgPSB0cnVlO1xuICAgICAgICBhbGxvd0Jsb2NrQ29sbGVjdGlvbnMgPSBhbGxvd0Jsb2NrU3R5bGVzO1xuXG4gICAgICAgIGlmIChzdGF0ZS5saW5lSW5kZW50ID4gcGFyZW50SW5kZW50KSB7XG4gICAgICAgICAgaW5kZW50U3RhdHVzID0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0ZS5saW5lSW5kZW50ID09PSBwYXJlbnRJbmRlbnQpIHtcbiAgICAgICAgICBpbmRlbnRTdGF0dXMgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlLmxpbmVJbmRlbnQgPCBwYXJlbnRJbmRlbnQpIHtcbiAgICAgICAgICBpbmRlbnRTdGF0dXMgPSAtMTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWxsb3dCbG9ja0NvbGxlY3Rpb25zID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGFsbG93QmxvY2tDb2xsZWN0aW9ucykge1xuICAgIGFsbG93QmxvY2tDb2xsZWN0aW9ucyA9IGF0TmV3TGluZSB8fCBhbGxvd0NvbXBhY3Q7XG4gIH1cblxuICBpZiAoaW5kZW50U3RhdHVzID09PSAxIHx8IENPTlRFWFRfQkxPQ0tfT1VUID09PSBub2RlQ29udGV4dCkge1xuICAgIGlmIChDT05URVhUX0ZMT1dfSU4gPT09IG5vZGVDb250ZXh0IHx8IENPTlRFWFRfRkxPV19PVVQgPT09IG5vZGVDb250ZXh0KSB7XG4gICAgICBmbG93SW5kZW50ID0gcGFyZW50SW5kZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICBmbG93SW5kZW50ID0gcGFyZW50SW5kZW50ICsgMTtcbiAgICB9XG5cbiAgICBibG9ja0luZGVudCA9IHN0YXRlLnBvc2l0aW9uIC0gc3RhdGUubGluZVN0YXJ0O1xuXG4gICAgaWYgKGluZGVudFN0YXR1cyA9PT0gMSkge1xuICAgICAgaWYgKGFsbG93QmxvY2tDb2xsZWN0aW9ucyAmJlxuICAgICAgICAgIChyZWFkQmxvY2tTZXF1ZW5jZShzdGF0ZSwgYmxvY2tJbmRlbnQpIHx8XG4gICAgICAgICAgIHJlYWRCbG9ja01hcHBpbmcoc3RhdGUsIGJsb2NrSW5kZW50LCBmbG93SW5kZW50KSkgfHxcbiAgICAgICAgICByZWFkRmxvd0NvbGxlY3Rpb24oc3RhdGUsIGZsb3dJbmRlbnQpKSB7XG4gICAgICAgIGhhc0NvbnRlbnQgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKChhbGxvd0Jsb2NrU2NhbGFycyAmJiByZWFkQmxvY2tTY2FsYXIoc3RhdGUsIGZsb3dJbmRlbnQpKSB8fFxuICAgICAgICAgICAgcmVhZFNpbmdsZVF1b3RlZFNjYWxhcihzdGF0ZSwgZmxvd0luZGVudCkgfHxcbiAgICAgICAgICAgIHJlYWREb3VibGVRdW90ZWRTY2FsYXIoc3RhdGUsIGZsb3dJbmRlbnQpKSB7XG4gICAgICAgICAgaGFzQ29udGVudCA9IHRydWU7XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZWFkQWxpYXMoc3RhdGUpKSB7XG4gICAgICAgICAgaGFzQ29udGVudCA9IHRydWU7XG5cbiAgICAgICAgICBpZiAoc3RhdGUudGFnICE9PSBudWxsIHx8IHN0YXRlLmFuY2hvciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2FsaWFzIG5vZGUgc2hvdWxkIG5vdCBoYXZlIGFueSBwcm9wZXJ0aWVzJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAocmVhZFBsYWluU2NhbGFyKHN0YXRlLCBmbG93SW5kZW50LCBDT05URVhUX0ZMT1dfSU4gPT09IG5vZGVDb250ZXh0KSkge1xuICAgICAgICAgIGhhc0NvbnRlbnQgPSB0cnVlO1xuXG4gICAgICAgICAgaWYgKHN0YXRlLnRhZyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgc3RhdGUudGFnID0gJz8nO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGF0ZS5hbmNob3IgIT09IG51bGwpIHtcbiAgICAgICAgICBzdGF0ZS5hbmNob3JNYXBbc3RhdGUuYW5jaG9yXSA9IHN0YXRlLnJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaW5kZW50U3RhdHVzID09PSAwKSB7XG4gICAgICAvLyBTcGVjaWFsIGNhc2U6IGJsb2NrIHNlcXVlbmNlcyBhcmUgYWxsb3dlZCB0byBoYXZlIHNhbWUgaW5kZW50YXRpb24gbGV2ZWwgYXMgdGhlIHBhcmVudC5cbiAgICAgIC8vIGh0dHA6Ly93d3cueWFtbC5vcmcvc3BlYy8xLjIvc3BlYy5odG1sI2lkMjc5OTc4NFxuICAgICAgaGFzQ29udGVudCA9IGFsbG93QmxvY2tDb2xsZWN0aW9ucyAmJiByZWFkQmxvY2tTZXF1ZW5jZShzdGF0ZSwgYmxvY2tJbmRlbnQpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChzdGF0ZS50YWcgIT09IG51bGwgJiYgc3RhdGUudGFnICE9PSAnIScpIHtcbiAgICBpZiAoc3RhdGUudGFnID09PSAnPycpIHtcbiAgICAgIC8vIEltcGxpY2l0IHJlc29sdmluZyBpcyBub3QgYWxsb3dlZCBmb3Igbm9uLXNjYWxhciB0eXBlcywgYW5kICc/J1xuICAgICAgLy8gbm9uLXNwZWNpZmljIHRhZyBpcyBvbmx5IGF1dG9tYXRpY2FsbHkgYXNzaWduZWQgdG8gcGxhaW4gc2NhbGFycy5cbiAgICAgIC8vXG4gICAgICAvLyBXZSBvbmx5IG5lZWQgdG8gY2hlY2sga2luZCBjb25mb3JtaXR5IGluIGNhc2UgdXNlciBleHBsaWNpdGx5IGFzc2lnbnMgJz8nXG4gICAgICAvLyB0YWcsIGZvciBleGFtcGxlIGxpa2UgdGhpczogXCIhPD8+IFswXVwiXG4gICAgICAvL1xuICAgICAgaWYgKHN0YXRlLnJlc3VsdCAhPT0gbnVsbCAmJiBzdGF0ZS5raW5kICE9PSAnc2NhbGFyJykge1xuICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAndW5hY2NlcHRhYmxlIG5vZGUga2luZCBmb3IgITw/PiB0YWc7IGl0IHNob3VsZCBiZSBcInNjYWxhclwiLCBub3QgXCInICsgc3RhdGUua2luZCArICdcIicpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHR5cGVJbmRleCA9IDAsIHR5cGVRdWFudGl0eSA9IHN0YXRlLmltcGxpY2l0VHlwZXMubGVuZ3RoOyB0eXBlSW5kZXggPCB0eXBlUXVhbnRpdHk7IHR5cGVJbmRleCArPSAxKSB7XG4gICAgICAgIHR5cGUgPSBzdGF0ZS5pbXBsaWNpdFR5cGVzW3R5cGVJbmRleF07XG5cbiAgICAgICAgaWYgKHR5cGUucmVzb2x2ZShzdGF0ZS5yZXN1bHQpKSB7IC8vIGBzdGF0ZS5yZXN1bHRgIHVwZGF0ZWQgaW4gcmVzb2x2ZXIgaWYgbWF0Y2hlZFxuICAgICAgICAgIHN0YXRlLnJlc3VsdCA9IHR5cGUuY29uc3RydWN0KHN0YXRlLnJlc3VsdCk7XG4gICAgICAgICAgc3RhdGUudGFnID0gdHlwZS50YWc7XG4gICAgICAgICAgaWYgKHN0YXRlLmFuY2hvciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgc3RhdGUuYW5jaG9yTWFwW3N0YXRlLmFuY2hvcl0gPSBzdGF0ZS5yZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChfaGFzT3duUHJvcGVydHkuY2FsbChzdGF0ZS50eXBlTWFwW3N0YXRlLmtpbmQgfHwgJ2ZhbGxiYWNrJ10sIHN0YXRlLnRhZykpIHtcbiAgICAgIHR5cGUgPSBzdGF0ZS50eXBlTWFwW3N0YXRlLmtpbmQgfHwgJ2ZhbGxiYWNrJ11bc3RhdGUudGFnXTtcblxuICAgICAgaWYgKHN0YXRlLnJlc3VsdCAhPT0gbnVsbCAmJiB0eXBlLmtpbmQgIT09IHN0YXRlLmtpbmQpIHtcbiAgICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3VuYWNjZXB0YWJsZSBub2RlIGtpbmQgZm9yICE8JyArIHN0YXRlLnRhZyArICc+IHRhZzsgaXQgc2hvdWxkIGJlIFwiJyArIHR5cGUua2luZCArICdcIiwgbm90IFwiJyArIHN0YXRlLmtpbmQgKyAnXCInKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0eXBlLnJlc29sdmUoc3RhdGUucmVzdWx0KSkgeyAvLyBgc3RhdGUucmVzdWx0YCB1cGRhdGVkIGluIHJlc29sdmVyIGlmIG1hdGNoZWRcbiAgICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2Nhbm5vdCByZXNvbHZlIGEgbm9kZSB3aXRoICE8JyArIHN0YXRlLnRhZyArICc+IGV4cGxpY2l0IHRhZycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhdGUucmVzdWx0ID0gdHlwZS5jb25zdHJ1Y3Qoc3RhdGUucmVzdWx0KTtcbiAgICAgICAgaWYgKHN0YXRlLmFuY2hvciAhPT0gbnVsbCkge1xuICAgICAgICAgIHN0YXRlLmFuY2hvck1hcFtzdGF0ZS5hbmNob3JdID0gc3RhdGUucmVzdWx0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICd1bmtub3duIHRhZyAhPCcgKyBzdGF0ZS50YWcgKyAnPicpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChzdGF0ZS5saXN0ZW5lciAhPT0gbnVsbCkge1xuICAgIHN0YXRlLmxpc3RlbmVyKCdjbG9zZScsIHN0YXRlKTtcbiAgfVxuICByZXR1cm4gc3RhdGUudGFnICE9PSBudWxsIHx8ICBzdGF0ZS5hbmNob3IgIT09IG51bGwgfHwgaGFzQ29udGVudDtcbn1cblxuZnVuY3Rpb24gcmVhZERvY3VtZW50KHN0YXRlKSB7XG4gIHZhciBkb2N1bWVudFN0YXJ0ID0gc3RhdGUucG9zaXRpb24sXG4gICAgICBfcG9zaXRpb24sXG4gICAgICBkaXJlY3RpdmVOYW1lLFxuICAgICAgZGlyZWN0aXZlQXJncyxcbiAgICAgIGhhc0RpcmVjdGl2ZXMgPSBmYWxzZSxcbiAgICAgIGNoO1xuXG4gIHN0YXRlLnZlcnNpb24gPSBudWxsO1xuICBzdGF0ZS5jaGVja0xpbmVCcmVha3MgPSBzdGF0ZS5sZWdhY3k7XG4gIHN0YXRlLnRhZ01hcCA9IHt9O1xuICBzdGF0ZS5hbmNob3JNYXAgPSB7fTtcblxuICB3aGlsZSAoKGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbikpICE9PSAwKSB7XG4gICAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgLTEpO1xuXG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICAgIGlmIChzdGF0ZS5saW5lSW5kZW50ID4gMCB8fCBjaCAhPT0gMHgyNS8qICUgKi8pIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGhhc0RpcmVjdGl2ZXMgPSB0cnVlO1xuICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgICBfcG9zaXRpb24gPSBzdGF0ZS5wb3NpdGlvbjtcblxuICAgIHdoaWxlIChjaCAhPT0gMCAmJiAhaXNfV1NfT1JfRU9MKGNoKSkge1xuICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgIH1cblxuICAgIGRpcmVjdGl2ZU5hbWUgPSBzdGF0ZS5pbnB1dC5zbGljZShfcG9zaXRpb24sIHN0YXRlLnBvc2l0aW9uKTtcbiAgICBkaXJlY3RpdmVBcmdzID0gW107XG5cbiAgICBpZiAoZGlyZWN0aXZlTmFtZS5sZW5ndGggPCAxKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnZGlyZWN0aXZlIG5hbWUgbXVzdCBub3QgYmUgbGVzcyB0aGFuIG9uZSBjaGFyYWN0ZXIgaW4gbGVuZ3RoJyk7XG4gICAgfVxuXG4gICAgd2hpbGUgKGNoICE9PSAwKSB7XG4gICAgICB3aGlsZSAoaXNfV0hJVEVfU1BBQ0UoY2gpKSB7XG4gICAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNoID09PSAweDIzLyogIyAqLykge1xuICAgICAgICBkbyB7IGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTsgfVxuICAgICAgICB3aGlsZSAoY2ggIT09IDAgJiYgIWlzX0VPTChjaCkpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgaWYgKGlzX0VPTChjaCkpIGJyZWFrO1xuXG4gICAgICBfcG9zaXRpb24gPSBzdGF0ZS5wb3NpdGlvbjtcblxuICAgICAgd2hpbGUgKGNoICE9PSAwICYmICFpc19XU19PUl9FT0woY2gpKSB7XG4gICAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgICAgIH1cblxuICAgICAgZGlyZWN0aXZlQXJncy5wdXNoKHN0YXRlLmlucHV0LnNsaWNlKF9wb3NpdGlvbiwgc3RhdGUucG9zaXRpb24pKTtcbiAgICB9XG5cbiAgICBpZiAoY2ggIT09IDApIHJlYWRMaW5lQnJlYWsoc3RhdGUpO1xuXG4gICAgaWYgKF9oYXNPd25Qcm9wZXJ0eS5jYWxsKGRpcmVjdGl2ZUhhbmRsZXJzLCBkaXJlY3RpdmVOYW1lKSkge1xuICAgICAgZGlyZWN0aXZlSGFuZGxlcnNbZGlyZWN0aXZlTmFtZV0oc3RhdGUsIGRpcmVjdGl2ZU5hbWUsIGRpcmVjdGl2ZUFyZ3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvd1dhcm5pbmcoc3RhdGUsICd1bmtub3duIGRvY3VtZW50IGRpcmVjdGl2ZSBcIicgKyBkaXJlY3RpdmVOYW1lICsgJ1wiJyk7XG4gICAgfVxuICB9XG5cbiAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgLTEpO1xuXG4gIGlmIChzdGF0ZS5saW5lSW5kZW50ID09PSAwICYmXG4gICAgICBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKSAgICAgPT09IDB4MkQvKiAtICovICYmXG4gICAgICBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uICsgMSkgPT09IDB4MkQvKiAtICovICYmXG4gICAgICBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uICsgMikgPT09IDB4MkQvKiAtICovKSB7XG4gICAgc3RhdGUucG9zaXRpb24gKz0gMztcbiAgICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCAtMSk7XG5cbiAgfSBlbHNlIGlmIChoYXNEaXJlY3RpdmVzKSB7XG4gICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2RpcmVjdGl2ZXMgZW5kIG1hcmsgaXMgZXhwZWN0ZWQnKTtcbiAgfVxuXG4gIGNvbXBvc2VOb2RlKHN0YXRlLCBzdGF0ZS5saW5lSW5kZW50IC0gMSwgQ09OVEVYVF9CTE9DS19PVVQsIGZhbHNlLCB0cnVlKTtcbiAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgLTEpO1xuXG4gIGlmIChzdGF0ZS5jaGVja0xpbmVCcmVha3MgJiZcbiAgICAgIFBBVFRFUk5fTk9OX0FTQ0lJX0xJTkVfQlJFQUtTLnRlc3Qoc3RhdGUuaW5wdXQuc2xpY2UoZG9jdW1lbnRTdGFydCwgc3RhdGUucG9zaXRpb24pKSkge1xuICAgIHRocm93V2FybmluZyhzdGF0ZSwgJ25vbi1BU0NJSSBsaW5lIGJyZWFrcyBhcmUgaW50ZXJwcmV0ZWQgYXMgY29udGVudCcpO1xuICB9XG5cbiAgc3RhdGUuZG9jdW1lbnRzLnB1c2goc3RhdGUucmVzdWx0KTtcblxuICBpZiAoc3RhdGUucG9zaXRpb24gPT09IHN0YXRlLmxpbmVTdGFydCAmJiB0ZXN0RG9jdW1lbnRTZXBhcmF0b3Ioc3RhdGUpKSB7XG5cbiAgICBpZiAoc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbikgPT09IDB4MkUvKiAuICovKSB7XG4gICAgICBzdGF0ZS5wb3NpdGlvbiArPSAzO1xuICAgICAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgLTEpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoc3RhdGUucG9zaXRpb24gPCAoc3RhdGUubGVuZ3RoIC0gMSkpIHtcbiAgICB0aHJvd0Vycm9yKHN0YXRlLCAnZW5kIG9mIHRoZSBzdHJlYW0gb3IgYSBkb2N1bWVudCBzZXBhcmF0b3IgaXMgZXhwZWN0ZWQnKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm47XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBsb2FkRG9jdW1lbnRzKGlucHV0LCBvcHRpb25zKSB7XG4gIGlucHV0ID0gU3RyaW5nKGlucHV0KTtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgaWYgKGlucHV0Lmxlbmd0aCAhPT0gMCkge1xuXG4gICAgLy8gQWRkIHRhaWxpbmcgYFxcbmAgaWYgbm90IGV4aXN0c1xuICAgIGlmIChpbnB1dC5jaGFyQ29kZUF0KGlucHV0Lmxlbmd0aCAtIDEpICE9PSAweDBBLyogTEYgKi8gJiZcbiAgICAgICAgaW5wdXQuY2hhckNvZGVBdChpbnB1dC5sZW5ndGggLSAxKSAhPT0gMHgwRC8qIENSICovKSB7XG4gICAgICBpbnB1dCArPSAnXFxuJztcbiAgICB9XG5cbiAgICAvLyBTdHJpcCBCT01cbiAgICBpZiAoaW5wdXQuY2hhckNvZGVBdCgwKSA9PT0gMHhGRUZGKSB7XG4gICAgICBpbnB1dCA9IGlucHV0LnNsaWNlKDEpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBzdGF0ZSA9IG5ldyBTdGF0ZShpbnB1dCwgb3B0aW9ucyk7XG5cbiAgdmFyIG51bGxwb3MgPSBpbnB1dC5pbmRleE9mKCdcXDAnKTtcblxuICBpZiAobnVsbHBvcyAhPT0gLTEpIHtcbiAgICBzdGF0ZS5wb3NpdGlvbiA9IG51bGxwb3M7XG4gICAgdGhyb3dFcnJvcihzdGF0ZSwgJ251bGwgYnl0ZSBpcyBub3QgYWxsb3dlZCBpbiBpbnB1dCcpO1xuICB9XG5cbiAgLy8gVXNlIDAgYXMgc3RyaW5nIHRlcm1pbmF0b3IuIFRoYXQgc2lnbmlmaWNhbnRseSBzaW1wbGlmaWVzIGJvdW5kcyBjaGVjay5cbiAgc3RhdGUuaW5wdXQgKz0gJ1xcMCc7XG5cbiAgd2hpbGUgKHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pID09PSAweDIwLyogU3BhY2UgKi8pIHtcbiAgICBzdGF0ZS5saW5lSW5kZW50ICs9IDE7XG4gICAgc3RhdGUucG9zaXRpb24gKz0gMTtcbiAgfVxuXG4gIHdoaWxlIChzdGF0ZS5wb3NpdGlvbiA8IChzdGF0ZS5sZW5ndGggLSAxKSkge1xuICAgIHJlYWREb2N1bWVudChzdGF0ZSk7XG4gIH1cblxuICByZXR1cm4gc3RhdGUuZG9jdW1lbnRzO1xufVxuXG5cbmZ1bmN0aW9uIGxvYWRBbGwoaW5wdXQsIGl0ZXJhdG9yLCBvcHRpb25zKSB7XG4gIGlmIChpdGVyYXRvciAhPT0gbnVsbCAmJiB0eXBlb2YgaXRlcmF0b3IgPT09ICdvYmplY3QnICYmIHR5cGVvZiBvcHRpb25zID09PSAndW5kZWZpbmVkJykge1xuICAgIG9wdGlvbnMgPSBpdGVyYXRvcjtcbiAgICBpdGVyYXRvciA9IG51bGw7XG4gIH1cblxuICB2YXIgZG9jdW1lbnRzID0gbG9hZERvY3VtZW50cyhpbnB1dCwgb3B0aW9ucyk7XG5cbiAgaWYgKHR5cGVvZiBpdGVyYXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBkb2N1bWVudHM7XG4gIH1cblxuICBmb3IgKHZhciBpbmRleCA9IDAsIGxlbmd0aCA9IGRvY3VtZW50cy5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgaXRlcmF0b3IoZG9jdW1lbnRzW2luZGV4XSk7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBsb2FkKGlucHV0LCBvcHRpb25zKSB7XG4gIHZhciBkb2N1bWVudHMgPSBsb2FkRG9jdW1lbnRzKGlucHV0LCBvcHRpb25zKTtcblxuICBpZiAoZG9jdW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIC8qZXNsaW50LWRpc2FibGUgbm8tdW5kZWZpbmVkKi9cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9IGVsc2UgaWYgKGRvY3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gZG9jdW1lbnRzWzBdO1xuICB9XG4gIHRocm93IG5ldyBZQU1MRXhjZXB0aW9uKCdleHBlY3RlZCBhIHNpbmdsZSBkb2N1bWVudCBpbiB0aGUgc3RyZWFtLCBidXQgZm91bmQgbW9yZScpO1xufVxuXG5cbmZ1bmN0aW9uIHNhZmVMb2FkQWxsKGlucHV0LCBpdGVyYXRvciwgb3B0aW9ucykge1xuICBpZiAodHlwZW9mIGl0ZXJhdG9yID09PSAnb2JqZWN0JyAmJiBpdGVyYXRvciAhPT0gbnVsbCAmJiB0eXBlb2Ygb3B0aW9ucyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBvcHRpb25zID0gaXRlcmF0b3I7XG4gICAgaXRlcmF0b3IgPSBudWxsO1xuICB9XG5cbiAgcmV0dXJuIGxvYWRBbGwoaW5wdXQsIGl0ZXJhdG9yLCBjb21tb24uZXh0ZW5kKHsgc2NoZW1hOiBERUZBVUxUX1NBRkVfU0NIRU1BIH0sIG9wdGlvbnMpKTtcbn1cblxuXG5mdW5jdGlvbiBzYWZlTG9hZChpbnB1dCwgb3B0aW9ucykge1xuICByZXR1cm4gbG9hZChpbnB1dCwgY29tbW9uLmV4dGVuZCh7IHNjaGVtYTogREVGQVVMVF9TQUZFX1NDSEVNQSB9LCBvcHRpb25zKSk7XG59XG5cblxubW9kdWxlLmV4cG9ydHMubG9hZEFsbCAgICAgPSBsb2FkQWxsO1xubW9kdWxlLmV4cG9ydHMubG9hZCAgICAgICAgPSBsb2FkO1xubW9kdWxlLmV4cG9ydHMuc2FmZUxvYWRBbGwgPSBzYWZlTG9hZEFsbDtcbm1vZHVsZS5leHBvcnRzLnNhZmVMb2FkICAgID0gc2FmZUxvYWQ7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG4vKmVzbGludC1kaXNhYmxlIG5vLXVzZS1iZWZvcmUtZGVmaW5lKi9cblxudmFyIGNvbW1vbiAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL2NvbW1vbicpO1xudmFyIFlBTUxFeGNlcHRpb24gICAgICAgPSByZXF1aXJlKCcuL2V4Y2VwdGlvbicpO1xudmFyIERFRkFVTFRfRlVMTF9TQ0hFTUEgPSByZXF1aXJlKCcuL3NjaGVtYS9kZWZhdWx0X2Z1bGwnKTtcbnZhciBERUZBVUxUX1NBRkVfU0NIRU1BID0gcmVxdWlyZSgnLi9zY2hlbWEvZGVmYXVsdF9zYWZlJyk7XG5cbnZhciBfdG9TdHJpbmcgICAgICAgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIF9oYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbnZhciBDSEFSX1RBQiAgICAgICAgICAgICAgICAgID0gMHgwOTsgLyogVGFiICovXG52YXIgQ0hBUl9MSU5FX0ZFRUQgICAgICAgICAgICA9IDB4MEE7IC8qIExGICovXG52YXIgQ0hBUl9DQVJSSUFHRV9SRVRVUk4gICAgICA9IDB4MEQ7IC8qIENSICovXG52YXIgQ0hBUl9TUEFDRSAgICAgICAgICAgICAgICA9IDB4MjA7IC8qIFNwYWNlICovXG52YXIgQ0hBUl9FWENMQU1BVElPTiAgICAgICAgICA9IDB4MjE7IC8qICEgKi9cbnZhciBDSEFSX0RPVUJMRV9RVU9URSAgICAgICAgID0gMHgyMjsgLyogXCIgKi9cbnZhciBDSEFSX1NIQVJQICAgICAgICAgICAgICAgID0gMHgyMzsgLyogIyAqL1xudmFyIENIQVJfUEVSQ0VOVCAgICAgICAgICAgICAgPSAweDI1OyAvKiAlICovXG52YXIgQ0hBUl9BTVBFUlNBTkQgICAgICAgICAgICA9IDB4MjY7IC8qICYgKi9cbnZhciBDSEFSX1NJTkdMRV9RVU9URSAgICAgICAgID0gMHgyNzsgLyogJyAqL1xudmFyIENIQVJfQVNURVJJU0sgICAgICAgICAgICAgPSAweDJBOyAvKiAqICovXG52YXIgQ0hBUl9DT01NQSAgICAgICAgICAgICAgICA9IDB4MkM7IC8qICwgKi9cbnZhciBDSEFSX01JTlVTICAgICAgICAgICAgICAgID0gMHgyRDsgLyogLSAqL1xudmFyIENIQVJfQ09MT04gICAgICAgICAgICAgICAgPSAweDNBOyAvKiA6ICovXG52YXIgQ0hBUl9FUVVBTFMgICAgICAgICAgICAgICA9IDB4M0Q7IC8qID0gKi9cbnZhciBDSEFSX0dSRUFURVJfVEhBTiAgICAgICAgID0gMHgzRTsgLyogPiAqL1xudmFyIENIQVJfUVVFU1RJT04gICAgICAgICAgICAgPSAweDNGOyAvKiA/ICovXG52YXIgQ0hBUl9DT01NRVJDSUFMX0FUICAgICAgICA9IDB4NDA7IC8qIEAgKi9cbnZhciBDSEFSX0xFRlRfU1FVQVJFX0JSQUNLRVQgID0gMHg1QjsgLyogWyAqL1xudmFyIENIQVJfUklHSFRfU1FVQVJFX0JSQUNLRVQgPSAweDVEOyAvKiBdICovXG52YXIgQ0hBUl9HUkFWRV9BQ0NFTlQgICAgICAgICA9IDB4NjA7IC8qIGAgKi9cbnZhciBDSEFSX0xFRlRfQ1VSTFlfQlJBQ0tFVCAgID0gMHg3QjsgLyogeyAqL1xudmFyIENIQVJfVkVSVElDQUxfTElORSAgICAgICAgPSAweDdDOyAvKiB8ICovXG52YXIgQ0hBUl9SSUdIVF9DVVJMWV9CUkFDS0VUICA9IDB4N0Q7IC8qIH0gKi9cblxudmFyIEVTQ0FQRV9TRVFVRU5DRVMgPSB7fTtcblxuRVNDQVBFX1NFUVVFTkNFU1sweDAwXSAgID0gJ1xcXFwwJztcbkVTQ0FQRV9TRVFVRU5DRVNbMHgwN10gICA9ICdcXFxcYSc7XG5FU0NBUEVfU0VRVUVOQ0VTWzB4MDhdICAgPSAnXFxcXGInO1xuRVNDQVBFX1NFUVVFTkNFU1sweDA5XSAgID0gJ1xcXFx0JztcbkVTQ0FQRV9TRVFVRU5DRVNbMHgwQV0gICA9ICdcXFxcbic7XG5FU0NBUEVfU0VRVUVOQ0VTWzB4MEJdICAgPSAnXFxcXHYnO1xuRVNDQVBFX1NFUVVFTkNFU1sweDBDXSAgID0gJ1xcXFxmJztcbkVTQ0FQRV9TRVFVRU5DRVNbMHgwRF0gICA9ICdcXFxccic7XG5FU0NBUEVfU0VRVUVOQ0VTWzB4MUJdICAgPSAnXFxcXGUnO1xuRVNDQVBFX1NFUVVFTkNFU1sweDIyXSAgID0gJ1xcXFxcIic7XG5FU0NBUEVfU0VRVUVOQ0VTWzB4NUNdICAgPSAnXFxcXFxcXFwnO1xuRVNDQVBFX1NFUVVFTkNFU1sweDg1XSAgID0gJ1xcXFxOJztcbkVTQ0FQRV9TRVFVRU5DRVNbMHhBMF0gICA9ICdcXFxcXyc7XG5FU0NBUEVfU0VRVUVOQ0VTWzB4MjAyOF0gPSAnXFxcXEwnO1xuRVNDQVBFX1NFUVVFTkNFU1sweDIwMjldID0gJ1xcXFxQJztcblxudmFyIERFUFJFQ0FURURfQk9PTEVBTlNfU1lOVEFYID0gW1xuICAneScsICdZJywgJ3llcycsICdZZXMnLCAnWUVTJywgJ29uJywgJ09uJywgJ09OJyxcbiAgJ24nLCAnTicsICdubycsICdObycsICdOTycsICdvZmYnLCAnT2ZmJywgJ09GRidcbl07XG5cbmZ1bmN0aW9uIGNvbXBpbGVTdHlsZU1hcChzY2hlbWEsIG1hcCkge1xuICB2YXIgcmVzdWx0LCBrZXlzLCBpbmRleCwgbGVuZ3RoLCB0YWcsIHN0eWxlLCB0eXBlO1xuXG4gIGlmIChtYXAgPT09IG51bGwpIHJldHVybiB7fTtcblxuICByZXN1bHQgPSB7fTtcbiAga2V5cyA9IE9iamVjdC5rZXlzKG1hcCk7XG5cbiAgZm9yIChpbmRleCA9IDAsIGxlbmd0aCA9IGtleXMubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgIHRhZyA9IGtleXNbaW5kZXhdO1xuICAgIHN0eWxlID0gU3RyaW5nKG1hcFt0YWddKTtcblxuICAgIGlmICh0YWcuc2xpY2UoMCwgMikgPT09ICchIScpIHtcbiAgICAgIHRhZyA9ICd0YWc6eWFtbC5vcmcsMjAwMjonICsgdGFnLnNsaWNlKDIpO1xuICAgIH1cbiAgICB0eXBlID0gc2NoZW1hLmNvbXBpbGVkVHlwZU1hcFsnZmFsbGJhY2snXVt0YWddO1xuXG4gICAgaWYgKHR5cGUgJiYgX2hhc093blByb3BlcnR5LmNhbGwodHlwZS5zdHlsZUFsaWFzZXMsIHN0eWxlKSkge1xuICAgICAgc3R5bGUgPSB0eXBlLnN0eWxlQWxpYXNlc1tzdHlsZV07XG4gICAgfVxuXG4gICAgcmVzdWx0W3RhZ10gPSBzdHlsZTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGVuY29kZUhleChjaGFyYWN0ZXIpIHtcbiAgdmFyIHN0cmluZywgaGFuZGxlLCBsZW5ndGg7XG5cbiAgc3RyaW5nID0gY2hhcmFjdGVyLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO1xuXG4gIGlmIChjaGFyYWN0ZXIgPD0gMHhGRikge1xuICAgIGhhbmRsZSA9ICd4JztcbiAgICBsZW5ndGggPSAyO1xuICB9IGVsc2UgaWYgKGNoYXJhY3RlciA8PSAweEZGRkYpIHtcbiAgICBoYW5kbGUgPSAndSc7XG4gICAgbGVuZ3RoID0gNDtcbiAgfSBlbHNlIGlmIChjaGFyYWN0ZXIgPD0gMHhGRkZGRkZGRikge1xuICAgIGhhbmRsZSA9ICdVJztcbiAgICBsZW5ndGggPSA4O1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBZQU1MRXhjZXB0aW9uKCdjb2RlIHBvaW50IHdpdGhpbiBhIHN0cmluZyBtYXkgbm90IGJlIGdyZWF0ZXIgdGhhbiAweEZGRkZGRkZGJyk7XG4gIH1cblxuICByZXR1cm4gJ1xcXFwnICsgaGFuZGxlICsgY29tbW9uLnJlcGVhdCgnMCcsIGxlbmd0aCAtIHN0cmluZy5sZW5ndGgpICsgc3RyaW5nO1xufVxuXG5mdW5jdGlvbiBTdGF0ZShvcHRpb25zKSB7XG4gIHRoaXMuc2NoZW1hICAgICAgICA9IG9wdGlvbnNbJ3NjaGVtYSddIHx8IERFRkFVTFRfRlVMTF9TQ0hFTUE7XG4gIHRoaXMuaW5kZW50ICAgICAgICA9IE1hdGgubWF4KDEsIChvcHRpb25zWydpbmRlbnQnXSB8fCAyKSk7XG4gIHRoaXMubm9BcnJheUluZGVudCA9IG9wdGlvbnNbJ25vQXJyYXlJbmRlbnQnXSB8fCBmYWxzZTtcbiAgdGhpcy5za2lwSW52YWxpZCAgID0gb3B0aW9uc1snc2tpcEludmFsaWQnXSB8fCBmYWxzZTtcbiAgdGhpcy5mbG93TGV2ZWwgICAgID0gKGNvbW1vbi5pc05vdGhpbmcob3B0aW9uc1snZmxvd0xldmVsJ10pID8gLTEgOiBvcHRpb25zWydmbG93TGV2ZWwnXSk7XG4gIHRoaXMuc3R5bGVNYXAgICAgICA9IGNvbXBpbGVTdHlsZU1hcCh0aGlzLnNjaGVtYSwgb3B0aW9uc1snc3R5bGVzJ10gfHwgbnVsbCk7XG4gIHRoaXMuc29ydEtleXMgICAgICA9IG9wdGlvbnNbJ3NvcnRLZXlzJ10gfHwgZmFsc2U7XG4gIHRoaXMubGluZVdpZHRoICAgICA9IG9wdGlvbnNbJ2xpbmVXaWR0aCddIHx8IDgwO1xuICB0aGlzLm5vUmVmcyAgICAgICAgPSBvcHRpb25zWydub1JlZnMnXSB8fCBmYWxzZTtcbiAgdGhpcy5ub0NvbXBhdE1vZGUgID0gb3B0aW9uc1snbm9Db21wYXRNb2RlJ10gfHwgZmFsc2U7XG4gIHRoaXMuY29uZGVuc2VGbG93ICA9IG9wdGlvbnNbJ2NvbmRlbnNlRmxvdyddIHx8IGZhbHNlO1xuXG4gIHRoaXMuaW1wbGljaXRUeXBlcyA9IHRoaXMuc2NoZW1hLmNvbXBpbGVkSW1wbGljaXQ7XG4gIHRoaXMuZXhwbGljaXRUeXBlcyA9IHRoaXMuc2NoZW1hLmNvbXBpbGVkRXhwbGljaXQ7XG5cbiAgdGhpcy50YWcgPSBudWxsO1xuICB0aGlzLnJlc3VsdCA9ICcnO1xuXG4gIHRoaXMuZHVwbGljYXRlcyA9IFtdO1xuICB0aGlzLnVzZWREdXBsaWNhdGVzID0gbnVsbDtcbn1cblxuLy8gSW5kZW50cyBldmVyeSBsaW5lIGluIGEgc3RyaW5nLiBFbXB0eSBsaW5lcyAoXFxuIG9ubHkpIGFyZSBub3QgaW5kZW50ZWQuXG5mdW5jdGlvbiBpbmRlbnRTdHJpbmcoc3RyaW5nLCBzcGFjZXMpIHtcbiAgdmFyIGluZCA9IGNvbW1vbi5yZXBlYXQoJyAnLCBzcGFjZXMpLFxuICAgICAgcG9zaXRpb24gPSAwLFxuICAgICAgbmV4dCA9IC0xLFxuICAgICAgcmVzdWx0ID0gJycsXG4gICAgICBsaW5lLFxuICAgICAgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aDtcblxuICB3aGlsZSAocG9zaXRpb24gPCBsZW5ndGgpIHtcbiAgICBuZXh0ID0gc3RyaW5nLmluZGV4T2YoJ1xcbicsIHBvc2l0aW9uKTtcbiAgICBpZiAobmV4dCA9PT0gLTEpIHtcbiAgICAgIGxpbmUgPSBzdHJpbmcuc2xpY2UocG9zaXRpb24pO1xuICAgICAgcG9zaXRpb24gPSBsZW5ndGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpbmUgPSBzdHJpbmcuc2xpY2UocG9zaXRpb24sIG5leHQgKyAxKTtcbiAgICAgIHBvc2l0aW9uID0gbmV4dCArIDE7XG4gICAgfVxuXG4gICAgaWYgKGxpbmUubGVuZ3RoICYmIGxpbmUgIT09ICdcXG4nKSByZXN1bHQgKz0gaW5kO1xuXG4gICAgcmVzdWx0ICs9IGxpbmU7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZU5leHRMaW5lKHN0YXRlLCBsZXZlbCkge1xuICByZXR1cm4gJ1xcbicgKyBjb21tb24ucmVwZWF0KCcgJywgc3RhdGUuaW5kZW50ICogbGV2ZWwpO1xufVxuXG5mdW5jdGlvbiB0ZXN0SW1wbGljaXRSZXNvbHZpbmcoc3RhdGUsIHN0cikge1xuICB2YXIgaW5kZXgsIGxlbmd0aCwgdHlwZTtcblxuICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gc3RhdGUuaW1wbGljaXRUeXBlcy5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgdHlwZSA9IHN0YXRlLmltcGxpY2l0VHlwZXNbaW5kZXhdO1xuXG4gICAgaWYgKHR5cGUucmVzb2x2ZShzdHIpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8vIFszM10gcy13aGl0ZSA6Oj0gcy1zcGFjZSB8IHMtdGFiXG5mdW5jdGlvbiBpc1doaXRlc3BhY2UoYykge1xuICByZXR1cm4gYyA9PT0gQ0hBUl9TUEFDRSB8fCBjID09PSBDSEFSX1RBQjtcbn1cblxuLy8gUmV0dXJucyB0cnVlIGlmIHRoZSBjaGFyYWN0ZXIgY2FuIGJlIHByaW50ZWQgd2l0aG91dCBlc2NhcGluZy5cbi8vIEZyb20gWUFNTCAxLjI6IFwiYW55IGFsbG93ZWQgY2hhcmFjdGVycyBrbm93biB0byBiZSBub24tcHJpbnRhYmxlXG4vLyBzaG91bGQgYWxzbyBiZSBlc2NhcGVkLiBbSG93ZXZlcixdIFRoaXMgaXNuXHUyMDE5dCBtYW5kYXRvcnlcIlxuLy8gRGVyaXZlZCBmcm9tIG5iLWNoYXIgLSBcXHQgLSAjeDg1IC0gI3hBMCAtICN4MjAyOCAtICN4MjAyOS5cbmZ1bmN0aW9uIGlzUHJpbnRhYmxlKGMpIHtcbiAgcmV0dXJuICAoMHgwMDAyMCA8PSBjICYmIGMgPD0gMHgwMDAwN0UpXG4gICAgICB8fCAoKDB4MDAwQTEgPD0gYyAmJiBjIDw9IDB4MDBEN0ZGKSAmJiBjICE9PSAweDIwMjggJiYgYyAhPT0gMHgyMDI5KVxuICAgICAgfHwgKCgweDBFMDAwIDw9IGMgJiYgYyA8PSAweDAwRkZGRCkgJiYgYyAhPT0gMHhGRUZGIC8qIEJPTSAqLylcbiAgICAgIHx8ICAoMHgxMDAwMCA8PSBjICYmIGMgPD0gMHgxMEZGRkYpO1xufVxuXG4vLyBbMzRdIG5zLWNoYXIgOjo9IG5iLWNoYXIgLSBzLXdoaXRlXG4vLyBbMjddIG5iLWNoYXIgOjo9IGMtcHJpbnRhYmxlIC0gYi1jaGFyIC0gYy1ieXRlLW9yZGVyLW1hcmtcbi8vIFsyNl0gYi1jaGFyICA6Oj0gYi1saW5lLWZlZWQgfCBiLWNhcnJpYWdlLXJldHVyblxuLy8gWzI0XSBiLWxpbmUtZmVlZCAgICAgICA6Oj0gICAgICN4QSAgICAvKiBMRiAqL1xuLy8gWzI1XSBiLWNhcnJpYWdlLXJldHVybiA6Oj0gICAgICN4RCAgICAvKiBDUiAqL1xuLy8gWzNdICBjLWJ5dGUtb3JkZXItbWFyayA6Oj0gICAgICN4RkVGRlxuZnVuY3Rpb24gaXNOc0NoYXIoYykge1xuICByZXR1cm4gaXNQcmludGFibGUoYykgJiYgIWlzV2hpdGVzcGFjZShjKVxuICAgIC8vIGJ5dGUtb3JkZXItbWFya1xuICAgICYmIGMgIT09IDB4RkVGRlxuICAgIC8vIGItY2hhclxuICAgICYmIGMgIT09IENIQVJfQ0FSUklBR0VfUkVUVVJOXG4gICAgJiYgYyAhPT0gQ0hBUl9MSU5FX0ZFRUQ7XG59XG5cbi8vIFNpbXBsaWZpZWQgdGVzdCBmb3IgdmFsdWVzIGFsbG93ZWQgYWZ0ZXIgdGhlIGZpcnN0IGNoYXJhY3RlciBpbiBwbGFpbiBzdHlsZS5cbmZ1bmN0aW9uIGlzUGxhaW5TYWZlKGMsIHByZXYpIHtcbiAgLy8gVXNlcyBhIHN1YnNldCBvZiBuYi1jaGFyIC0gYy1mbG93LWluZGljYXRvciAtIFwiOlwiIC0gXCIjXCJcbiAgLy8gd2hlcmUgbmItY2hhciA6Oj0gYy1wcmludGFibGUgLSBiLWNoYXIgLSBjLWJ5dGUtb3JkZXItbWFyay5cbiAgcmV0dXJuIGlzUHJpbnRhYmxlKGMpICYmIGMgIT09IDB4RkVGRlxuICAgIC8vIC0gYy1mbG93LWluZGljYXRvclxuICAgICYmIGMgIT09IENIQVJfQ09NTUFcbiAgICAmJiBjICE9PSBDSEFSX0xFRlRfU1FVQVJFX0JSQUNLRVRcbiAgICAmJiBjICE9PSBDSEFSX1JJR0hUX1NRVUFSRV9CUkFDS0VUXG4gICAgJiYgYyAhPT0gQ0hBUl9MRUZUX0NVUkxZX0JSQUNLRVRcbiAgICAmJiBjICE9PSBDSEFSX1JJR0hUX0NVUkxZX0JSQUNLRVRcbiAgICAvLyAtIFwiOlwiIC0gXCIjXCJcbiAgICAvLyAvKiBBbiBucy1jaGFyIHByZWNlZGluZyAqLyBcIiNcIlxuICAgICYmIGMgIT09IENIQVJfQ09MT05cbiAgICAmJiAoKGMgIT09IENIQVJfU0hBUlApIHx8IChwcmV2ICYmIGlzTnNDaGFyKHByZXYpKSk7XG59XG5cbi8vIFNpbXBsaWZpZWQgdGVzdCBmb3IgdmFsdWVzIGFsbG93ZWQgYXMgdGhlIGZpcnN0IGNoYXJhY3RlciBpbiBwbGFpbiBzdHlsZS5cbmZ1bmN0aW9uIGlzUGxhaW5TYWZlRmlyc3QoYykge1xuICAvLyBVc2VzIGEgc3Vic2V0IG9mIG5zLWNoYXIgLSBjLWluZGljYXRvclxuICAvLyB3aGVyZSBucy1jaGFyID0gbmItY2hhciAtIHMtd2hpdGUuXG4gIHJldHVybiBpc1ByaW50YWJsZShjKSAmJiBjICE9PSAweEZFRkZcbiAgICAmJiAhaXNXaGl0ZXNwYWNlKGMpIC8vIC0gcy13aGl0ZVxuICAgIC8vIC0gKGMtaW5kaWNhdG9yIDo6PVxuICAgIC8vIFx1MjAxQy1cdTIwMUQgfCBcdTIwMUM/XHUyMDFEIHwgXHUyMDFDOlx1MjAxRCB8IFx1MjAxQyxcdTIwMUQgfCBcdTIwMUNbXHUyMDFEIHwgXHUyMDFDXVx1MjAxRCB8IFx1MjAxQ3tcdTIwMUQgfCBcdTIwMUN9XHUyMDFEXG4gICAgJiYgYyAhPT0gQ0hBUl9NSU5VU1xuICAgICYmIGMgIT09IENIQVJfUVVFU1RJT05cbiAgICAmJiBjICE9PSBDSEFSX0NPTE9OXG4gICAgJiYgYyAhPT0gQ0hBUl9DT01NQVxuICAgICYmIGMgIT09IENIQVJfTEVGVF9TUVVBUkVfQlJBQ0tFVFxuICAgICYmIGMgIT09IENIQVJfUklHSFRfU1FVQVJFX0JSQUNLRVRcbiAgICAmJiBjICE9PSBDSEFSX0xFRlRfQ1VSTFlfQlJBQ0tFVFxuICAgICYmIGMgIT09IENIQVJfUklHSFRfQ1VSTFlfQlJBQ0tFVFxuICAgIC8vIHwgXHUyMDFDI1x1MjAxRCB8IFx1MjAxQyZcdTIwMUQgfCBcdTIwMUMqXHUyMDFEIHwgXHUyMDFDIVx1MjAxRCB8IFx1MjAxQ3xcdTIwMUQgfCBcdTIwMUM9XHUyMDFEIHwgXHUyMDFDPlx1MjAxRCB8IFx1MjAxQydcdTIwMUQgfCBcdTIwMUNcIlx1MjAxRFxuICAgICYmIGMgIT09IENIQVJfU0hBUlBcbiAgICAmJiBjICE9PSBDSEFSX0FNUEVSU0FORFxuICAgICYmIGMgIT09IENIQVJfQVNURVJJU0tcbiAgICAmJiBjICE9PSBDSEFSX0VYQ0xBTUFUSU9OXG4gICAgJiYgYyAhPT0gQ0hBUl9WRVJUSUNBTF9MSU5FXG4gICAgJiYgYyAhPT0gQ0hBUl9FUVVBTFNcbiAgICAmJiBjICE9PSBDSEFSX0dSRUFURVJfVEhBTlxuICAgICYmIGMgIT09IENIQVJfU0lOR0xFX1FVT1RFXG4gICAgJiYgYyAhPT0gQ0hBUl9ET1VCTEVfUVVPVEVcbiAgICAvLyB8IFx1MjAxQyVcdTIwMUQgfCBcdTIwMUNAXHUyMDFEIHwgXHUyMDFDYFx1MjAxRClcbiAgICAmJiBjICE9PSBDSEFSX1BFUkNFTlRcbiAgICAmJiBjICE9PSBDSEFSX0NPTU1FUkNJQUxfQVRcbiAgICAmJiBjICE9PSBDSEFSX0dSQVZFX0FDQ0VOVDtcbn1cblxuLy8gRGV0ZXJtaW5lcyB3aGV0aGVyIGJsb2NrIGluZGVudGF0aW9uIGluZGljYXRvciBpcyByZXF1aXJlZC5cbmZ1bmN0aW9uIG5lZWRJbmRlbnRJbmRpY2F0b3Ioc3RyaW5nKSB7XG4gIHZhciBsZWFkaW5nU3BhY2VSZSA9IC9eXFxuKiAvO1xuICByZXR1cm4gbGVhZGluZ1NwYWNlUmUudGVzdChzdHJpbmcpO1xufVxuXG52YXIgU1RZTEVfUExBSU4gICA9IDEsXG4gICAgU1RZTEVfU0lOR0xFICA9IDIsXG4gICAgU1RZTEVfTElURVJBTCA9IDMsXG4gICAgU1RZTEVfRk9MREVEICA9IDQsXG4gICAgU1RZTEVfRE9VQkxFICA9IDU7XG5cbi8vIERldGVybWluZXMgd2hpY2ggc2NhbGFyIHN0eWxlcyBhcmUgcG9zc2libGUgYW5kIHJldHVybnMgdGhlIHByZWZlcnJlZCBzdHlsZS5cbi8vIGxpbmVXaWR0aCA9IC0xID0+IG5vIGxpbWl0LlxuLy8gUHJlLWNvbmRpdGlvbnM6IHN0ci5sZW5ndGggPiAwLlxuLy8gUG9zdC1jb25kaXRpb25zOlxuLy8gICAgU1RZTEVfUExBSU4gb3IgU1RZTEVfU0lOR0xFID0+IG5vIFxcbiBhcmUgaW4gdGhlIHN0cmluZy5cbi8vICAgIFNUWUxFX0xJVEVSQUwgPT4gbm8gbGluZXMgYXJlIHN1aXRhYmxlIGZvciBmb2xkaW5nIChvciBsaW5lV2lkdGggaXMgLTEpLlxuLy8gICAgU1RZTEVfRk9MREVEID0+IGEgbGluZSA+IGxpbmVXaWR0aCBhbmQgY2FuIGJlIGZvbGRlZCAoYW5kIGxpbmVXaWR0aCAhPSAtMSkuXG5mdW5jdGlvbiBjaG9vc2VTY2FsYXJTdHlsZShzdHJpbmcsIHNpbmdsZUxpbmVPbmx5LCBpbmRlbnRQZXJMZXZlbCwgbGluZVdpZHRoLCB0ZXN0QW1iaWd1b3VzVHlwZSkge1xuICB2YXIgaTtcbiAgdmFyIGNoYXIsIHByZXZfY2hhcjtcbiAgdmFyIGhhc0xpbmVCcmVhayA9IGZhbHNlO1xuICB2YXIgaGFzRm9sZGFibGVMaW5lID0gZmFsc2U7IC8vIG9ubHkgY2hlY2tlZCBpZiBzaG91bGRUcmFja1dpZHRoXG4gIHZhciBzaG91bGRUcmFja1dpZHRoID0gbGluZVdpZHRoICE9PSAtMTtcbiAgdmFyIHByZXZpb3VzTGluZUJyZWFrID0gLTE7IC8vIGNvdW50IHRoZSBmaXJzdCBsaW5lIGNvcnJlY3RseVxuICB2YXIgcGxhaW4gPSBpc1BsYWluU2FmZUZpcnN0KHN0cmluZy5jaGFyQ29kZUF0KDApKVxuICAgICAgICAgICYmICFpc1doaXRlc3BhY2Uoc3RyaW5nLmNoYXJDb2RlQXQoc3RyaW5nLmxlbmd0aCAtIDEpKTtcblxuICBpZiAoc2luZ2xlTGluZU9ubHkpIHtcbiAgICAvLyBDYXNlOiBubyBibG9jayBzdHlsZXMuXG4gICAgLy8gQ2hlY2sgZm9yIGRpc2FsbG93ZWQgY2hhcmFjdGVycyB0byBydWxlIG91dCBwbGFpbiBhbmQgc2luZ2xlLlxuICAgIGZvciAoaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoYXIgPSBzdHJpbmcuY2hhckNvZGVBdChpKTtcbiAgICAgIGlmICghaXNQcmludGFibGUoY2hhcikpIHtcbiAgICAgICAgcmV0dXJuIFNUWUxFX0RPVUJMRTtcbiAgICAgIH1cbiAgICAgIHByZXZfY2hhciA9IGkgPiAwID8gc3RyaW5nLmNoYXJDb2RlQXQoaSAtIDEpIDogbnVsbDtcbiAgICAgIHBsYWluID0gcGxhaW4gJiYgaXNQbGFpblNhZmUoY2hhciwgcHJldl9jaGFyKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gQ2FzZTogYmxvY2sgc3R5bGVzIHBlcm1pdHRlZC5cbiAgICBmb3IgKGkgPSAwOyBpIDwgc3RyaW5nLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGFyID0gc3RyaW5nLmNoYXJDb2RlQXQoaSk7XG4gICAgICBpZiAoY2hhciA9PT0gQ0hBUl9MSU5FX0ZFRUQpIHtcbiAgICAgICAgaGFzTGluZUJyZWFrID0gdHJ1ZTtcbiAgICAgICAgLy8gQ2hlY2sgaWYgYW55IGxpbmUgY2FuIGJlIGZvbGRlZC5cbiAgICAgICAgaWYgKHNob3VsZFRyYWNrV2lkdGgpIHtcbiAgICAgICAgICBoYXNGb2xkYWJsZUxpbmUgPSBoYXNGb2xkYWJsZUxpbmUgfHxcbiAgICAgICAgICAgIC8vIEZvbGRhYmxlIGxpbmUgPSB0b28gbG9uZywgYW5kIG5vdCBtb3JlLWluZGVudGVkLlxuICAgICAgICAgICAgKGkgLSBwcmV2aW91c0xpbmVCcmVhayAtIDEgPiBsaW5lV2lkdGggJiZcbiAgICAgICAgICAgICBzdHJpbmdbcHJldmlvdXNMaW5lQnJlYWsgKyAxXSAhPT0gJyAnKTtcbiAgICAgICAgICBwcmV2aW91c0xpbmVCcmVhayA9IGk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoIWlzUHJpbnRhYmxlKGNoYXIpKSB7XG4gICAgICAgIHJldHVybiBTVFlMRV9ET1VCTEU7XG4gICAgICB9XG4gICAgICBwcmV2X2NoYXIgPSBpID4gMCA/IHN0cmluZy5jaGFyQ29kZUF0KGkgLSAxKSA6IG51bGw7XG4gICAgICBwbGFpbiA9IHBsYWluICYmIGlzUGxhaW5TYWZlKGNoYXIsIHByZXZfY2hhcik7XG4gICAgfVxuICAgIC8vIGluIGNhc2UgdGhlIGVuZCBpcyBtaXNzaW5nIGEgXFxuXG4gICAgaGFzRm9sZGFibGVMaW5lID0gaGFzRm9sZGFibGVMaW5lIHx8IChzaG91bGRUcmFja1dpZHRoICYmXG4gICAgICAoaSAtIHByZXZpb3VzTGluZUJyZWFrIC0gMSA+IGxpbmVXaWR0aCAmJlxuICAgICAgIHN0cmluZ1twcmV2aW91c0xpbmVCcmVhayArIDFdICE9PSAnICcpKTtcbiAgfVxuICAvLyBBbHRob3VnaCBldmVyeSBzdHlsZSBjYW4gcmVwcmVzZW50IFxcbiB3aXRob3V0IGVzY2FwaW5nLCBwcmVmZXIgYmxvY2sgc3R5bGVzXG4gIC8vIGZvciBtdWx0aWxpbmUsIHNpbmNlIHRoZXkncmUgbW9yZSByZWFkYWJsZSBhbmQgdGhleSBkb24ndCBhZGQgZW1wdHkgbGluZXMuXG4gIC8vIEFsc28gcHJlZmVyIGZvbGRpbmcgYSBzdXBlci1sb25nIGxpbmUuXG4gIGlmICghaGFzTGluZUJyZWFrICYmICFoYXNGb2xkYWJsZUxpbmUpIHtcbiAgICAvLyBTdHJpbmdzIGludGVycHJldGFibGUgYXMgYW5vdGhlciB0eXBlIGhhdmUgdG8gYmUgcXVvdGVkO1xuICAgIC8vIGUuZy4gdGhlIHN0cmluZyAndHJ1ZScgdnMuIHRoZSBib29sZWFuIHRydWUuXG4gICAgcmV0dXJuIHBsYWluICYmICF0ZXN0QW1iaWd1b3VzVHlwZShzdHJpbmcpXG4gICAgICA/IFNUWUxFX1BMQUlOIDogU1RZTEVfU0lOR0xFO1xuICB9XG4gIC8vIEVkZ2UgY2FzZTogYmxvY2sgaW5kZW50YXRpb24gaW5kaWNhdG9yIGNhbiBvbmx5IGhhdmUgb25lIGRpZ2l0LlxuICBpZiAoaW5kZW50UGVyTGV2ZWwgPiA5ICYmIG5lZWRJbmRlbnRJbmRpY2F0b3Ioc3RyaW5nKSkge1xuICAgIHJldHVybiBTVFlMRV9ET1VCTEU7XG4gIH1cbiAgLy8gQXQgdGhpcyBwb2ludCB3ZSBrbm93IGJsb2NrIHN0eWxlcyBhcmUgdmFsaWQuXG4gIC8vIFByZWZlciBsaXRlcmFsIHN0eWxlIHVubGVzcyB3ZSB3YW50IHRvIGZvbGQuXG4gIHJldHVybiBoYXNGb2xkYWJsZUxpbmUgPyBTVFlMRV9GT0xERUQgOiBTVFlMRV9MSVRFUkFMO1xufVxuXG4vLyBOb3RlOiBsaW5lIGJyZWFraW5nL2ZvbGRpbmcgaXMgaW1wbGVtZW50ZWQgZm9yIG9ubHkgdGhlIGZvbGRlZCBzdHlsZS5cbi8vIE5CLiBXZSBkcm9wIHRoZSBsYXN0IHRyYWlsaW5nIG5ld2xpbmUgKGlmIGFueSkgb2YgYSByZXR1cm5lZCBibG9jayBzY2FsYXJcbi8vICBzaW5jZSB0aGUgZHVtcGVyIGFkZHMgaXRzIG93biBuZXdsaW5lLiBUaGlzIGFsd2F5cyB3b3Jrczpcbi8vICAgIFx1MjAyMiBObyBlbmRpbmcgbmV3bGluZSA9PiB1bmFmZmVjdGVkOyBhbHJlYWR5IHVzaW5nIHN0cmlwIFwiLVwiIGNob21waW5nLlxuLy8gICAgXHUyMDIyIEVuZGluZyBuZXdsaW5lICAgID0+IHJlbW92ZWQgdGhlbiByZXN0b3JlZC5cbi8vICBJbXBvcnRhbnRseSwgdGhpcyBrZWVwcyB0aGUgXCIrXCIgY2hvbXAgaW5kaWNhdG9yIGZyb20gZ2FpbmluZyBhbiBleHRyYSBsaW5lLlxuZnVuY3Rpb24gd3JpdGVTY2FsYXIoc3RhdGUsIHN0cmluZywgbGV2ZWwsIGlza2V5KSB7XG4gIHN0YXRlLmR1bXAgPSAoZnVuY3Rpb24gKCkge1xuICAgIGlmIChzdHJpbmcubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gXCInJ1wiO1xuICAgIH1cbiAgICBpZiAoIXN0YXRlLm5vQ29tcGF0TW9kZSAmJlxuICAgICAgICBERVBSRUNBVEVEX0JPT0xFQU5TX1NZTlRBWC5pbmRleE9mKHN0cmluZykgIT09IC0xKSB7XG4gICAgICByZXR1cm4gXCInXCIgKyBzdHJpbmcgKyBcIidcIjtcbiAgICB9XG5cbiAgICB2YXIgaW5kZW50ID0gc3RhdGUuaW5kZW50ICogTWF0aC5tYXgoMSwgbGV2ZWwpOyAvLyBubyAwLWluZGVudCBzY2FsYXJzXG4gICAgLy8gQXMgaW5kZW50YXRpb24gZ2V0cyBkZWVwZXIsIGxldCB0aGUgd2lkdGggZGVjcmVhc2UgbW9ub3RvbmljYWxseVxuICAgIC8vIHRvIHRoZSBsb3dlciBib3VuZCBtaW4oc3RhdGUubGluZVdpZHRoLCA0MCkuXG4gICAgLy8gTm90ZSB0aGF0IHRoaXMgaW1wbGllc1xuICAgIC8vICBzdGF0ZS5saW5lV2lkdGggXHUyMjY0IDQwICsgc3RhdGUuaW5kZW50OiB3aWR0aCBpcyBmaXhlZCBhdCB0aGUgbG93ZXIgYm91bmQuXG4gICAgLy8gIHN0YXRlLmxpbmVXaWR0aCA+IDQwICsgc3RhdGUuaW5kZW50OiB3aWR0aCBkZWNyZWFzZXMgdW50aWwgdGhlIGxvd2VyIGJvdW5kLlxuICAgIC8vIFRoaXMgYmVoYXZlcyBiZXR0ZXIgdGhhbiBhIGNvbnN0YW50IG1pbmltdW0gd2lkdGggd2hpY2ggZGlzYWxsb3dzIG5hcnJvd2VyIG9wdGlvbnMsXG4gICAgLy8gb3IgYW4gaW5kZW50IHRocmVzaG9sZCB3aGljaCBjYXVzZXMgdGhlIHdpZHRoIHRvIHN1ZGRlbmx5IGluY3JlYXNlLlxuICAgIHZhciBsaW5lV2lkdGggPSBzdGF0ZS5saW5lV2lkdGggPT09IC0xXG4gICAgICA/IC0xIDogTWF0aC5tYXgoTWF0aC5taW4oc3RhdGUubGluZVdpZHRoLCA0MCksIHN0YXRlLmxpbmVXaWR0aCAtIGluZGVudCk7XG5cbiAgICAvLyBXaXRob3V0IGtub3dpbmcgaWYga2V5cyBhcmUgaW1wbGljaXQvZXhwbGljaXQsIGFzc3VtZSBpbXBsaWNpdCBmb3Igc2FmZXR5LlxuICAgIHZhciBzaW5nbGVMaW5lT25seSA9IGlza2V5XG4gICAgICAvLyBObyBibG9jayBzdHlsZXMgaW4gZmxvdyBtb2RlLlxuICAgICAgfHwgKHN0YXRlLmZsb3dMZXZlbCA+IC0xICYmIGxldmVsID49IHN0YXRlLmZsb3dMZXZlbCk7XG4gICAgZnVuY3Rpb24gdGVzdEFtYmlndWl0eShzdHJpbmcpIHtcbiAgICAgIHJldHVybiB0ZXN0SW1wbGljaXRSZXNvbHZpbmcoc3RhdGUsIHN0cmluZyk7XG4gICAgfVxuXG4gICAgc3dpdGNoIChjaG9vc2VTY2FsYXJTdHlsZShzdHJpbmcsIHNpbmdsZUxpbmVPbmx5LCBzdGF0ZS5pbmRlbnQsIGxpbmVXaWR0aCwgdGVzdEFtYmlndWl0eSkpIHtcbiAgICAgIGNhc2UgU1RZTEVfUExBSU46XG4gICAgICAgIHJldHVybiBzdHJpbmc7XG4gICAgICBjYXNlIFNUWUxFX1NJTkdMRTpcbiAgICAgICAgcmV0dXJuIFwiJ1wiICsgc3RyaW5nLnJlcGxhY2UoLycvZywgXCInJ1wiKSArIFwiJ1wiO1xuICAgICAgY2FzZSBTVFlMRV9MSVRFUkFMOlxuICAgICAgICByZXR1cm4gJ3wnICsgYmxvY2tIZWFkZXIoc3RyaW5nLCBzdGF0ZS5pbmRlbnQpXG4gICAgICAgICAgKyBkcm9wRW5kaW5nTmV3bGluZShpbmRlbnRTdHJpbmcoc3RyaW5nLCBpbmRlbnQpKTtcbiAgICAgIGNhc2UgU1RZTEVfRk9MREVEOlxuICAgICAgICByZXR1cm4gJz4nICsgYmxvY2tIZWFkZXIoc3RyaW5nLCBzdGF0ZS5pbmRlbnQpXG4gICAgICAgICAgKyBkcm9wRW5kaW5nTmV3bGluZShpbmRlbnRTdHJpbmcoZm9sZFN0cmluZyhzdHJpbmcsIGxpbmVXaWR0aCksIGluZGVudCkpO1xuICAgICAgY2FzZSBTVFlMRV9ET1VCTEU6XG4gICAgICAgIHJldHVybiAnXCInICsgZXNjYXBlU3RyaW5nKHN0cmluZywgbGluZVdpZHRoKSArICdcIic7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgWUFNTEV4Y2VwdGlvbignaW1wb3NzaWJsZSBlcnJvcjogaW52YWxpZCBzY2FsYXIgc3R5bGUnKTtcbiAgICB9XG4gIH0oKSk7XG59XG5cbi8vIFByZS1jb25kaXRpb25zOiBzdHJpbmcgaXMgdmFsaWQgZm9yIGEgYmxvY2sgc2NhbGFyLCAxIDw9IGluZGVudFBlckxldmVsIDw9IDkuXG5mdW5jdGlvbiBibG9ja0hlYWRlcihzdHJpbmcsIGluZGVudFBlckxldmVsKSB7XG4gIHZhciBpbmRlbnRJbmRpY2F0b3IgPSBuZWVkSW5kZW50SW5kaWNhdG9yKHN0cmluZykgPyBTdHJpbmcoaW5kZW50UGVyTGV2ZWwpIDogJyc7XG5cbiAgLy8gbm90ZSB0aGUgc3BlY2lhbCBjYXNlOiB0aGUgc3RyaW5nICdcXG4nIGNvdW50cyBhcyBhIFwidHJhaWxpbmdcIiBlbXB0eSBsaW5lLlxuICB2YXIgY2xpcCA9ICAgICAgICAgIHN0cmluZ1tzdHJpbmcubGVuZ3RoIC0gMV0gPT09ICdcXG4nO1xuICB2YXIga2VlcCA9IGNsaXAgJiYgKHN0cmluZ1tzdHJpbmcubGVuZ3RoIC0gMl0gPT09ICdcXG4nIHx8IHN0cmluZyA9PT0gJ1xcbicpO1xuICB2YXIgY2hvbXAgPSBrZWVwID8gJysnIDogKGNsaXAgPyAnJyA6ICctJyk7XG5cbiAgcmV0dXJuIGluZGVudEluZGljYXRvciArIGNob21wICsgJ1xcbic7XG59XG5cbi8vIChTZWUgdGhlIG5vdGUgZm9yIHdyaXRlU2NhbGFyLilcbmZ1bmN0aW9uIGRyb3BFbmRpbmdOZXdsaW5lKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nW3N0cmluZy5sZW5ndGggLSAxXSA9PT0gJ1xcbicgPyBzdHJpbmcuc2xpY2UoMCwgLTEpIDogc3RyaW5nO1xufVxuXG4vLyBOb3RlOiBhIGxvbmcgbGluZSB3aXRob3V0IGEgc3VpdGFibGUgYnJlYWsgcG9pbnQgd2lsbCBleGNlZWQgdGhlIHdpZHRoIGxpbWl0LlxuLy8gUHJlLWNvbmRpdGlvbnM6IGV2ZXJ5IGNoYXIgaW4gc3RyIGlzUHJpbnRhYmxlLCBzdHIubGVuZ3RoID4gMCwgd2lkdGggPiAwLlxuZnVuY3Rpb24gZm9sZFN0cmluZyhzdHJpbmcsIHdpZHRoKSB7XG4gIC8vIEluIGZvbGRlZCBzdHlsZSwgJGskIGNvbnNlY3V0aXZlIG5ld2xpbmVzIG91dHB1dCBhcyAkaysxJCBuZXdsaW5lc1x1MjAxNFxuICAvLyB1bmxlc3MgdGhleSdyZSBiZWZvcmUgb3IgYWZ0ZXIgYSBtb3JlLWluZGVudGVkIGxpbmUsIG9yIGF0IHRoZSB2ZXJ5XG4gIC8vIGJlZ2lubmluZyBvciBlbmQsIGluIHdoaWNoIGNhc2UgJGskIG1hcHMgdG8gJGskLlxuICAvLyBUaGVyZWZvcmUsIHBhcnNlIGVhY2ggY2h1bmsgYXMgbmV3bGluZShzKSBmb2xsb3dlZCBieSBhIGNvbnRlbnQgbGluZS5cbiAgdmFyIGxpbmVSZSA9IC8oXFxuKykoW15cXG5dKikvZztcblxuICAvLyBmaXJzdCBsaW5lIChwb3NzaWJseSBhbiBlbXB0eSBsaW5lKVxuICB2YXIgcmVzdWx0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbmV4dExGID0gc3RyaW5nLmluZGV4T2YoJ1xcbicpO1xuICAgIG5leHRMRiA9IG5leHRMRiAhPT0gLTEgPyBuZXh0TEYgOiBzdHJpbmcubGVuZ3RoO1xuICAgIGxpbmVSZS5sYXN0SW5kZXggPSBuZXh0TEY7XG4gICAgcmV0dXJuIGZvbGRMaW5lKHN0cmluZy5zbGljZSgwLCBuZXh0TEYpLCB3aWR0aCk7XG4gIH0oKSk7XG4gIC8vIElmIHdlIGhhdmVuJ3QgcmVhY2hlZCB0aGUgZmlyc3QgY29udGVudCBsaW5lIHlldCwgZG9uJ3QgYWRkIGFuIGV4dHJhIFxcbi5cbiAgdmFyIHByZXZNb3JlSW5kZW50ZWQgPSBzdHJpbmdbMF0gPT09ICdcXG4nIHx8IHN0cmluZ1swXSA9PT0gJyAnO1xuICB2YXIgbW9yZUluZGVudGVkO1xuXG4gIC8vIHJlc3Qgb2YgdGhlIGxpbmVzXG4gIHZhciBtYXRjaDtcbiAgd2hpbGUgKChtYXRjaCA9IGxpbmVSZS5leGVjKHN0cmluZykpKSB7XG4gICAgdmFyIHByZWZpeCA9IG1hdGNoWzFdLCBsaW5lID0gbWF0Y2hbMl07XG4gICAgbW9yZUluZGVudGVkID0gKGxpbmVbMF0gPT09ICcgJyk7XG4gICAgcmVzdWx0ICs9IHByZWZpeFxuICAgICAgKyAoIXByZXZNb3JlSW5kZW50ZWQgJiYgIW1vcmVJbmRlbnRlZCAmJiBsaW5lICE9PSAnJ1xuICAgICAgICA/ICdcXG4nIDogJycpXG4gICAgICArIGZvbGRMaW5lKGxpbmUsIHdpZHRoKTtcbiAgICBwcmV2TW9yZUluZGVudGVkID0gbW9yZUluZGVudGVkO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLy8gR3JlZWR5IGxpbmUgYnJlYWtpbmcuXG4vLyBQaWNrcyB0aGUgbG9uZ2VzdCBsaW5lIHVuZGVyIHRoZSBsaW1pdCBlYWNoIHRpbWUsXG4vLyBvdGhlcndpc2Ugc2V0dGxlcyBmb3IgdGhlIHNob3J0ZXN0IGxpbmUgb3ZlciB0aGUgbGltaXQuXG4vLyBOQi4gTW9yZS1pbmRlbnRlZCBsaW5lcyAqY2Fubm90KiBiZSBmb2xkZWQsIGFzIHRoYXQgd291bGQgYWRkIGFuIGV4dHJhIFxcbi5cbmZ1bmN0aW9uIGZvbGRMaW5lKGxpbmUsIHdpZHRoKSB7XG4gIGlmIChsaW5lID09PSAnJyB8fCBsaW5lWzBdID09PSAnICcpIHJldHVybiBsaW5lO1xuXG4gIC8vIFNpbmNlIGEgbW9yZS1pbmRlbnRlZCBsaW5lIGFkZHMgYSBcXG4sIGJyZWFrcyBjYW4ndCBiZSBmb2xsb3dlZCBieSBhIHNwYWNlLlxuICB2YXIgYnJlYWtSZSA9IC8gW14gXS9nOyAvLyBub3RlOiB0aGUgbWF0Y2ggaW5kZXggd2lsbCBhbHdheXMgYmUgPD0gbGVuZ3RoLTIuXG4gIHZhciBtYXRjaDtcbiAgLy8gc3RhcnQgaXMgYW4gaW5jbHVzaXZlIGluZGV4LiBlbmQsIGN1cnIsIGFuZCBuZXh0IGFyZSBleGNsdXNpdmUuXG4gIHZhciBzdGFydCA9IDAsIGVuZCwgY3VyciA9IDAsIG5leHQgPSAwO1xuICB2YXIgcmVzdWx0ID0gJyc7XG5cbiAgLy8gSW52YXJpYW50czogMCA8PSBzdGFydCA8PSBsZW5ndGgtMS5cbiAgLy8gICAwIDw9IGN1cnIgPD0gbmV4dCA8PSBtYXgoMCwgbGVuZ3RoLTIpLiBjdXJyIC0gc3RhcnQgPD0gd2lkdGguXG4gIC8vIEluc2lkZSB0aGUgbG9vcDpcbiAgLy8gICBBIG1hdGNoIGltcGxpZXMgbGVuZ3RoID49IDIsIHNvIGN1cnIgYW5kIG5leHQgYXJlIDw9IGxlbmd0aC0yLlxuICB3aGlsZSAoKG1hdGNoID0gYnJlYWtSZS5leGVjKGxpbmUpKSkge1xuICAgIG5leHQgPSBtYXRjaC5pbmRleDtcbiAgICAvLyBtYWludGFpbiBpbnZhcmlhbnQ6IGN1cnIgLSBzdGFydCA8PSB3aWR0aFxuICAgIGlmIChuZXh0IC0gc3RhcnQgPiB3aWR0aCkge1xuICAgICAgZW5kID0gKGN1cnIgPiBzdGFydCkgPyBjdXJyIDogbmV4dDsgLy8gZGVyaXZlIGVuZCA8PSBsZW5ndGgtMlxuICAgICAgcmVzdWx0ICs9ICdcXG4nICsgbGluZS5zbGljZShzdGFydCwgZW5kKTtcbiAgICAgIC8vIHNraXAgdGhlIHNwYWNlIHRoYXQgd2FzIG91dHB1dCBhcyBcXG5cbiAgICAgIHN0YXJ0ID0gZW5kICsgMTsgICAgICAgICAgICAgICAgICAgIC8vIGRlcml2ZSBzdGFydCA8PSBsZW5ndGgtMVxuICAgIH1cbiAgICBjdXJyID0gbmV4dDtcbiAgfVxuXG4gIC8vIEJ5IHRoZSBpbnZhcmlhbnRzLCBzdGFydCA8PSBsZW5ndGgtMSwgc28gdGhlcmUgaXMgc29tZXRoaW5nIGxlZnQgb3Zlci5cbiAgLy8gSXQgaXMgZWl0aGVyIHRoZSB3aG9sZSBzdHJpbmcgb3IgYSBwYXJ0IHN0YXJ0aW5nIGZyb20gbm9uLXdoaXRlc3BhY2UuXG4gIHJlc3VsdCArPSAnXFxuJztcbiAgLy8gSW5zZXJ0IGEgYnJlYWsgaWYgdGhlIHJlbWFpbmRlciBpcyB0b28gbG9uZyBhbmQgdGhlcmUgaXMgYSBicmVhayBhdmFpbGFibGUuXG4gIGlmIChsaW5lLmxlbmd0aCAtIHN0YXJ0ID4gd2lkdGggJiYgY3VyciA+IHN0YXJ0KSB7XG4gICAgcmVzdWx0ICs9IGxpbmUuc2xpY2Uoc3RhcnQsIGN1cnIpICsgJ1xcbicgKyBsaW5lLnNsaWNlKGN1cnIgKyAxKTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgKz0gbGluZS5zbGljZShzdGFydCk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0LnNsaWNlKDEpOyAvLyBkcm9wIGV4dHJhIFxcbiBqb2luZXJcbn1cblxuLy8gRXNjYXBlcyBhIGRvdWJsZS1xdW90ZWQgc3RyaW5nLlxuZnVuY3Rpb24gZXNjYXBlU3RyaW5nKHN0cmluZykge1xuICB2YXIgcmVzdWx0ID0gJyc7XG4gIHZhciBjaGFyLCBuZXh0Q2hhcjtcbiAgdmFyIGVzY2FwZVNlcTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0cmluZy5sZW5ndGg7IGkrKykge1xuICAgIGNoYXIgPSBzdHJpbmcuY2hhckNvZGVBdChpKTtcbiAgICAvLyBDaGVjayBmb3Igc3Vycm9nYXRlIHBhaXJzIChyZWZlcmVuY2UgVW5pY29kZSAzLjAgc2VjdGlvbiBcIjMuNyBTdXJyb2dhdGVzXCIpLlxuICAgIGlmIChjaGFyID49IDB4RDgwMCAmJiBjaGFyIDw9IDB4REJGRi8qIGhpZ2ggc3Vycm9nYXRlICovKSB7XG4gICAgICBuZXh0Q2hhciA9IHN0cmluZy5jaGFyQ29kZUF0KGkgKyAxKTtcbiAgICAgIGlmIChuZXh0Q2hhciA+PSAweERDMDAgJiYgbmV4dENoYXIgPD0gMHhERkZGLyogbG93IHN1cnJvZ2F0ZSAqLykge1xuICAgICAgICAvLyBDb21iaW5lIHRoZSBzdXJyb2dhdGUgcGFpciBhbmQgc3RvcmUgaXQgZXNjYXBlZC5cbiAgICAgICAgcmVzdWx0ICs9IGVuY29kZUhleCgoY2hhciAtIDB4RDgwMCkgKiAweDQwMCArIG5leHRDaGFyIC0gMHhEQzAwICsgMHgxMDAwMCk7XG4gICAgICAgIC8vIEFkdmFuY2UgaW5kZXggb25lIGV4dHJhIHNpbmNlIHdlIGFscmVhZHkgdXNlZCB0aGF0IGNoYXIgaGVyZS5cbiAgICAgICAgaSsrOyBjb250aW51ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgZXNjYXBlU2VxID0gRVNDQVBFX1NFUVVFTkNFU1tjaGFyXTtcbiAgICByZXN1bHQgKz0gIWVzY2FwZVNlcSAmJiBpc1ByaW50YWJsZShjaGFyKVxuICAgICAgPyBzdHJpbmdbaV1cbiAgICAgIDogZXNjYXBlU2VxIHx8IGVuY29kZUhleChjaGFyKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIHdyaXRlRmxvd1NlcXVlbmNlKHN0YXRlLCBsZXZlbCwgb2JqZWN0KSB7XG4gIHZhciBfcmVzdWx0ID0gJycsXG4gICAgICBfdGFnICAgID0gc3RhdGUudGFnLFxuICAgICAgaW5kZXgsXG4gICAgICBsZW5ndGg7XG5cbiAgZm9yIChpbmRleCA9IDAsIGxlbmd0aCA9IG9iamVjdC5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgLy8gV3JpdGUgb25seSB2YWxpZCBlbGVtZW50cy5cbiAgICBpZiAod3JpdGVOb2RlKHN0YXRlLCBsZXZlbCwgb2JqZWN0W2luZGV4XSwgZmFsc2UsIGZhbHNlKSkge1xuICAgICAgaWYgKGluZGV4ICE9PSAwKSBfcmVzdWx0ICs9ICcsJyArICghc3RhdGUuY29uZGVuc2VGbG93ID8gJyAnIDogJycpO1xuICAgICAgX3Jlc3VsdCArPSBzdGF0ZS5kdW1wO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRlLnRhZyA9IF90YWc7XG4gIHN0YXRlLmR1bXAgPSAnWycgKyBfcmVzdWx0ICsgJ10nO1xufVxuXG5mdW5jdGlvbiB3cml0ZUJsb2NrU2VxdWVuY2Uoc3RhdGUsIGxldmVsLCBvYmplY3QsIGNvbXBhY3QpIHtcbiAgdmFyIF9yZXN1bHQgPSAnJyxcbiAgICAgIF90YWcgICAgPSBzdGF0ZS50YWcsXG4gICAgICBpbmRleCxcbiAgICAgIGxlbmd0aDtcblxuICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gb2JqZWN0Lmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICAvLyBXcml0ZSBvbmx5IHZhbGlkIGVsZW1lbnRzLlxuICAgIGlmICh3cml0ZU5vZGUoc3RhdGUsIGxldmVsICsgMSwgb2JqZWN0W2luZGV4XSwgdHJ1ZSwgdHJ1ZSkpIHtcbiAgICAgIGlmICghY29tcGFjdCB8fCBpbmRleCAhPT0gMCkge1xuICAgICAgICBfcmVzdWx0ICs9IGdlbmVyYXRlTmV4dExpbmUoc3RhdGUsIGxldmVsKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlLmR1bXAgJiYgQ0hBUl9MSU5FX0ZFRUQgPT09IHN0YXRlLmR1bXAuY2hhckNvZGVBdCgwKSkge1xuICAgICAgICBfcmVzdWx0ICs9ICctJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9yZXN1bHQgKz0gJy0gJztcbiAgICAgIH1cblxuICAgICAgX3Jlc3VsdCArPSBzdGF0ZS5kdW1wO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRlLnRhZyA9IF90YWc7XG4gIHN0YXRlLmR1bXAgPSBfcmVzdWx0IHx8ICdbXSc7IC8vIEVtcHR5IHNlcXVlbmNlIGlmIG5vIHZhbGlkIHZhbHVlcy5cbn1cblxuZnVuY3Rpb24gd3JpdGVGbG93TWFwcGluZyhzdGF0ZSwgbGV2ZWwsIG9iamVjdCkge1xuICB2YXIgX3Jlc3VsdCAgICAgICA9ICcnLFxuICAgICAgX3RhZyAgICAgICAgICA9IHN0YXRlLnRhZyxcbiAgICAgIG9iamVjdEtleUxpc3QgPSBPYmplY3Qua2V5cyhvYmplY3QpLFxuICAgICAgaW5kZXgsXG4gICAgICBsZW5ndGgsXG4gICAgICBvYmplY3RLZXksXG4gICAgICBvYmplY3RWYWx1ZSxcbiAgICAgIHBhaXJCdWZmZXI7XG5cbiAgZm9yIChpbmRleCA9IDAsIGxlbmd0aCA9IG9iamVjdEtleUxpc3QubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuXG4gICAgcGFpckJ1ZmZlciA9ICcnO1xuICAgIGlmIChpbmRleCAhPT0gMCkgcGFpckJ1ZmZlciArPSAnLCAnO1xuXG4gICAgaWYgKHN0YXRlLmNvbmRlbnNlRmxvdykgcGFpckJ1ZmZlciArPSAnXCInO1xuXG4gICAgb2JqZWN0S2V5ID0gb2JqZWN0S2V5TGlzdFtpbmRleF07XG4gICAgb2JqZWN0VmFsdWUgPSBvYmplY3Rbb2JqZWN0S2V5XTtcblxuICAgIGlmICghd3JpdGVOb2RlKHN0YXRlLCBsZXZlbCwgb2JqZWN0S2V5LCBmYWxzZSwgZmFsc2UpKSB7XG4gICAgICBjb250aW51ZTsgLy8gU2tpcCB0aGlzIHBhaXIgYmVjYXVzZSBvZiBpbnZhbGlkIGtleTtcbiAgICB9XG5cbiAgICBpZiAoc3RhdGUuZHVtcC5sZW5ndGggPiAxMDI0KSBwYWlyQnVmZmVyICs9ICc/ICc7XG5cbiAgICBwYWlyQnVmZmVyICs9IHN0YXRlLmR1bXAgKyAoc3RhdGUuY29uZGVuc2VGbG93ID8gJ1wiJyA6ICcnKSArICc6JyArIChzdGF0ZS5jb25kZW5zZUZsb3cgPyAnJyA6ICcgJyk7XG5cbiAgICBpZiAoIXdyaXRlTm9kZShzdGF0ZSwgbGV2ZWwsIG9iamVjdFZhbHVlLCBmYWxzZSwgZmFsc2UpKSB7XG4gICAgICBjb250aW51ZTsgLy8gU2tpcCB0aGlzIHBhaXIgYmVjYXVzZSBvZiBpbnZhbGlkIHZhbHVlLlxuICAgIH1cblxuICAgIHBhaXJCdWZmZXIgKz0gc3RhdGUuZHVtcDtcblxuICAgIC8vIEJvdGgga2V5IGFuZCB2YWx1ZSBhcmUgdmFsaWQuXG4gICAgX3Jlc3VsdCArPSBwYWlyQnVmZmVyO1xuICB9XG5cbiAgc3RhdGUudGFnID0gX3RhZztcbiAgc3RhdGUuZHVtcCA9ICd7JyArIF9yZXN1bHQgKyAnfSc7XG59XG5cbmZ1bmN0aW9uIHdyaXRlQmxvY2tNYXBwaW5nKHN0YXRlLCBsZXZlbCwgb2JqZWN0LCBjb21wYWN0KSB7XG4gIHZhciBfcmVzdWx0ICAgICAgID0gJycsXG4gICAgICBfdGFnICAgICAgICAgID0gc3RhdGUudGFnLFxuICAgICAgb2JqZWN0S2V5TGlzdCA9IE9iamVjdC5rZXlzKG9iamVjdCksXG4gICAgICBpbmRleCxcbiAgICAgIGxlbmd0aCxcbiAgICAgIG9iamVjdEtleSxcbiAgICAgIG9iamVjdFZhbHVlLFxuICAgICAgZXhwbGljaXRQYWlyLFxuICAgICAgcGFpckJ1ZmZlcjtcblxuICAvLyBBbGxvdyBzb3J0aW5nIGtleXMgc28gdGhhdCB0aGUgb3V0cHV0IGZpbGUgaXMgZGV0ZXJtaW5pc3RpY1xuICBpZiAoc3RhdGUuc29ydEtleXMgPT09IHRydWUpIHtcbiAgICAvLyBEZWZhdWx0IHNvcnRpbmdcbiAgICBvYmplY3RLZXlMaXN0LnNvcnQoKTtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygc3RhdGUuc29ydEtleXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBDdXN0b20gc29ydCBmdW5jdGlvblxuICAgIG9iamVjdEtleUxpc3Quc29ydChzdGF0ZS5zb3J0S2V5cyk7XG4gIH0gZWxzZSBpZiAoc3RhdGUuc29ydEtleXMpIHtcbiAgICAvLyBTb21ldGhpbmcgaXMgd3JvbmdcbiAgICB0aHJvdyBuZXcgWUFNTEV4Y2VwdGlvbignc29ydEtleXMgbXVzdCBiZSBhIGJvb2xlYW4gb3IgYSBmdW5jdGlvbicpO1xuICB9XG5cbiAgZm9yIChpbmRleCA9IDAsIGxlbmd0aCA9IG9iamVjdEtleUxpc3QubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgIHBhaXJCdWZmZXIgPSAnJztcblxuICAgIGlmICghY29tcGFjdCB8fCBpbmRleCAhPT0gMCkge1xuICAgICAgcGFpckJ1ZmZlciArPSBnZW5lcmF0ZU5leHRMaW5lKHN0YXRlLCBsZXZlbCk7XG4gICAgfVxuXG4gICAgb2JqZWN0S2V5ID0gb2JqZWN0S2V5TGlzdFtpbmRleF07XG4gICAgb2JqZWN0VmFsdWUgPSBvYmplY3Rbb2JqZWN0S2V5XTtcblxuICAgIGlmICghd3JpdGVOb2RlKHN0YXRlLCBsZXZlbCArIDEsIG9iamVjdEtleSwgdHJ1ZSwgdHJ1ZSwgdHJ1ZSkpIHtcbiAgICAgIGNvbnRpbnVlOyAvLyBTa2lwIHRoaXMgcGFpciBiZWNhdXNlIG9mIGludmFsaWQga2V5LlxuICAgIH1cblxuICAgIGV4cGxpY2l0UGFpciA9IChzdGF0ZS50YWcgIT09IG51bGwgJiYgc3RhdGUudGFnICE9PSAnPycpIHx8XG4gICAgICAgICAgICAgICAgICAgKHN0YXRlLmR1bXAgJiYgc3RhdGUuZHVtcC5sZW5ndGggPiAxMDI0KTtcblxuICAgIGlmIChleHBsaWNpdFBhaXIpIHtcbiAgICAgIGlmIChzdGF0ZS5kdW1wICYmIENIQVJfTElORV9GRUVEID09PSBzdGF0ZS5kdW1wLmNoYXJDb2RlQXQoMCkpIHtcbiAgICAgICAgcGFpckJ1ZmZlciArPSAnPyc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYWlyQnVmZmVyICs9ICc/ICc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcGFpckJ1ZmZlciArPSBzdGF0ZS5kdW1wO1xuXG4gICAgaWYgKGV4cGxpY2l0UGFpcikge1xuICAgICAgcGFpckJ1ZmZlciArPSBnZW5lcmF0ZU5leHRMaW5lKHN0YXRlLCBsZXZlbCk7XG4gICAgfVxuXG4gICAgaWYgKCF3cml0ZU5vZGUoc3RhdGUsIGxldmVsICsgMSwgb2JqZWN0VmFsdWUsIHRydWUsIGV4cGxpY2l0UGFpcikpIHtcbiAgICAgIGNvbnRpbnVlOyAvLyBTa2lwIHRoaXMgcGFpciBiZWNhdXNlIG9mIGludmFsaWQgdmFsdWUuXG4gICAgfVxuXG4gICAgaWYgKHN0YXRlLmR1bXAgJiYgQ0hBUl9MSU5FX0ZFRUQgPT09IHN0YXRlLmR1bXAuY2hhckNvZGVBdCgwKSkge1xuICAgICAgcGFpckJ1ZmZlciArPSAnOic7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhaXJCdWZmZXIgKz0gJzogJztcbiAgICB9XG5cbiAgICBwYWlyQnVmZmVyICs9IHN0YXRlLmR1bXA7XG5cbiAgICAvLyBCb3RoIGtleSBhbmQgdmFsdWUgYXJlIHZhbGlkLlxuICAgIF9yZXN1bHQgKz0gcGFpckJ1ZmZlcjtcbiAgfVxuXG4gIHN0YXRlLnRhZyA9IF90YWc7XG4gIHN0YXRlLmR1bXAgPSBfcmVzdWx0IHx8ICd7fSc7IC8vIEVtcHR5IG1hcHBpbmcgaWYgbm8gdmFsaWQgcGFpcnMuXG59XG5cbmZ1bmN0aW9uIGRldGVjdFR5cGUoc3RhdGUsIG9iamVjdCwgZXhwbGljaXQpIHtcbiAgdmFyIF9yZXN1bHQsIHR5cGVMaXN0LCBpbmRleCwgbGVuZ3RoLCB0eXBlLCBzdHlsZTtcblxuICB0eXBlTGlzdCA9IGV4cGxpY2l0ID8gc3RhdGUuZXhwbGljaXRUeXBlcyA6IHN0YXRlLmltcGxpY2l0VHlwZXM7XG5cbiAgZm9yIChpbmRleCA9IDAsIGxlbmd0aCA9IHR5cGVMaXN0Lmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICB0eXBlID0gdHlwZUxpc3RbaW5kZXhdO1xuXG4gICAgaWYgKCh0eXBlLmluc3RhbmNlT2YgIHx8IHR5cGUucHJlZGljYXRlKSAmJlxuICAgICAgICAoIXR5cGUuaW5zdGFuY2VPZiB8fCAoKHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnKSAmJiAob2JqZWN0IGluc3RhbmNlb2YgdHlwZS5pbnN0YW5jZU9mKSkpICYmXG4gICAgICAgICghdHlwZS5wcmVkaWNhdGUgIHx8IHR5cGUucHJlZGljYXRlKG9iamVjdCkpKSB7XG5cbiAgICAgIHN0YXRlLnRhZyA9IGV4cGxpY2l0ID8gdHlwZS50YWcgOiAnPyc7XG5cbiAgICAgIGlmICh0eXBlLnJlcHJlc2VudCkge1xuICAgICAgICBzdHlsZSA9IHN0YXRlLnN0eWxlTWFwW3R5cGUudGFnXSB8fCB0eXBlLmRlZmF1bHRTdHlsZTtcblxuICAgICAgICBpZiAoX3RvU3RyaW5nLmNhbGwodHlwZS5yZXByZXNlbnQpID09PSAnW29iamVjdCBGdW5jdGlvbl0nKSB7XG4gICAgICAgICAgX3Jlc3VsdCA9IHR5cGUucmVwcmVzZW50KG9iamVjdCwgc3R5bGUpO1xuICAgICAgICB9IGVsc2UgaWYgKF9oYXNPd25Qcm9wZXJ0eS5jYWxsKHR5cGUucmVwcmVzZW50LCBzdHlsZSkpIHtcbiAgICAgICAgICBfcmVzdWx0ID0gdHlwZS5yZXByZXNlbnRbc3R5bGVdKG9iamVjdCwgc3R5bGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBZQU1MRXhjZXB0aW9uKCchPCcgKyB0eXBlLnRhZyArICc+IHRhZyByZXNvbHZlciBhY2NlcHRzIG5vdCBcIicgKyBzdHlsZSArICdcIiBzdHlsZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUuZHVtcCA9IF9yZXN1bHQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuLy8gU2VyaWFsaXplcyBgb2JqZWN0YCBhbmQgd3JpdGVzIGl0IHRvIGdsb2JhbCBgcmVzdWx0YC5cbi8vIFJldHVybnMgdHJ1ZSBvbiBzdWNjZXNzLCBvciBmYWxzZSBvbiBpbnZhbGlkIG9iamVjdC5cbi8vXG5mdW5jdGlvbiB3cml0ZU5vZGUoc3RhdGUsIGxldmVsLCBvYmplY3QsIGJsb2NrLCBjb21wYWN0LCBpc2tleSkge1xuICBzdGF0ZS50YWcgPSBudWxsO1xuICBzdGF0ZS5kdW1wID0gb2JqZWN0O1xuXG4gIGlmICghZGV0ZWN0VHlwZShzdGF0ZSwgb2JqZWN0LCBmYWxzZSkpIHtcbiAgICBkZXRlY3RUeXBlKHN0YXRlLCBvYmplY3QsIHRydWUpO1xuICB9XG5cbiAgdmFyIHR5cGUgPSBfdG9TdHJpbmcuY2FsbChzdGF0ZS5kdW1wKTtcblxuICBpZiAoYmxvY2spIHtcbiAgICBibG9jayA9IChzdGF0ZS5mbG93TGV2ZWwgPCAwIHx8IHN0YXRlLmZsb3dMZXZlbCA+IGxldmVsKTtcbiAgfVxuXG4gIHZhciBvYmplY3RPckFycmF5ID0gdHlwZSA9PT0gJ1tvYmplY3QgT2JqZWN0XScgfHwgdHlwZSA9PT0gJ1tvYmplY3QgQXJyYXldJyxcbiAgICAgIGR1cGxpY2F0ZUluZGV4LFxuICAgICAgZHVwbGljYXRlO1xuXG4gIGlmIChvYmplY3RPckFycmF5KSB7XG4gICAgZHVwbGljYXRlSW5kZXggPSBzdGF0ZS5kdXBsaWNhdGVzLmluZGV4T2Yob2JqZWN0KTtcbiAgICBkdXBsaWNhdGUgPSBkdXBsaWNhdGVJbmRleCAhPT0gLTE7XG4gIH1cblxuICBpZiAoKHN0YXRlLnRhZyAhPT0gbnVsbCAmJiBzdGF0ZS50YWcgIT09ICc/JykgfHwgZHVwbGljYXRlIHx8IChzdGF0ZS5pbmRlbnQgIT09IDIgJiYgbGV2ZWwgPiAwKSkge1xuICAgIGNvbXBhY3QgPSBmYWxzZTtcbiAgfVxuXG4gIGlmIChkdXBsaWNhdGUgJiYgc3RhdGUudXNlZER1cGxpY2F0ZXNbZHVwbGljYXRlSW5kZXhdKSB7XG4gICAgc3RhdGUuZHVtcCA9ICcqcmVmXycgKyBkdXBsaWNhdGVJbmRleDtcbiAgfSBlbHNlIHtcbiAgICBpZiAob2JqZWN0T3JBcnJheSAmJiBkdXBsaWNhdGUgJiYgIXN0YXRlLnVzZWREdXBsaWNhdGVzW2R1cGxpY2F0ZUluZGV4XSkge1xuICAgICAgc3RhdGUudXNlZER1cGxpY2F0ZXNbZHVwbGljYXRlSW5kZXhdID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICBpZiAoYmxvY2sgJiYgKE9iamVjdC5rZXlzKHN0YXRlLmR1bXApLmxlbmd0aCAhPT0gMCkpIHtcbiAgICAgICAgd3JpdGVCbG9ja01hcHBpbmcoc3RhdGUsIGxldmVsLCBzdGF0ZS5kdW1wLCBjb21wYWN0KTtcbiAgICAgICAgaWYgKGR1cGxpY2F0ZSkge1xuICAgICAgICAgIHN0YXRlLmR1bXAgPSAnJnJlZl8nICsgZHVwbGljYXRlSW5kZXggKyBzdGF0ZS5kdW1wO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3cml0ZUZsb3dNYXBwaW5nKHN0YXRlLCBsZXZlbCwgc3RhdGUuZHVtcCk7XG4gICAgICAgIGlmIChkdXBsaWNhdGUpIHtcbiAgICAgICAgICBzdGF0ZS5kdW1wID0gJyZyZWZfJyArIGR1cGxpY2F0ZUluZGV4ICsgJyAnICsgc3RhdGUuZHVtcDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgdmFyIGFycmF5TGV2ZWwgPSAoc3RhdGUubm9BcnJheUluZGVudCAmJiAobGV2ZWwgPiAwKSkgPyBsZXZlbCAtIDEgOiBsZXZlbDtcbiAgICAgIGlmIChibG9jayAmJiAoc3RhdGUuZHVtcC5sZW5ndGggIT09IDApKSB7XG4gICAgICAgIHdyaXRlQmxvY2tTZXF1ZW5jZShzdGF0ZSwgYXJyYXlMZXZlbCwgc3RhdGUuZHVtcCwgY29tcGFjdCk7XG4gICAgICAgIGlmIChkdXBsaWNhdGUpIHtcbiAgICAgICAgICBzdGF0ZS5kdW1wID0gJyZyZWZfJyArIGR1cGxpY2F0ZUluZGV4ICsgc3RhdGUuZHVtcDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd3JpdGVGbG93U2VxdWVuY2Uoc3RhdGUsIGFycmF5TGV2ZWwsIHN0YXRlLmR1bXApO1xuICAgICAgICBpZiAoZHVwbGljYXRlKSB7XG4gICAgICAgICAgc3RhdGUuZHVtcCA9ICcmcmVmXycgKyBkdXBsaWNhdGVJbmRleCArICcgJyArIHN0YXRlLmR1bXA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdbb2JqZWN0IFN0cmluZ10nKSB7XG4gICAgICBpZiAoc3RhdGUudGFnICE9PSAnPycpIHtcbiAgICAgICAgd3JpdGVTY2FsYXIoc3RhdGUsIHN0YXRlLmR1bXAsIGxldmVsLCBpc2tleSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChzdGF0ZS5za2lwSW52YWxpZCkgcmV0dXJuIGZhbHNlO1xuICAgICAgdGhyb3cgbmV3IFlBTUxFeGNlcHRpb24oJ3VuYWNjZXB0YWJsZSBraW5kIG9mIGFuIG9iamVjdCB0byBkdW1wICcgKyB0eXBlKTtcbiAgICB9XG5cbiAgICBpZiAoc3RhdGUudGFnICE9PSBudWxsICYmIHN0YXRlLnRhZyAhPT0gJz8nKSB7XG4gICAgICBzdGF0ZS5kdW1wID0gJyE8JyArIHN0YXRlLnRhZyArICc+ICcgKyBzdGF0ZS5kdW1wO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBnZXREdXBsaWNhdGVSZWZlcmVuY2VzKG9iamVjdCwgc3RhdGUpIHtcbiAgdmFyIG9iamVjdHMgPSBbXSxcbiAgICAgIGR1cGxpY2F0ZXNJbmRleGVzID0gW10sXG4gICAgICBpbmRleCxcbiAgICAgIGxlbmd0aDtcblxuICBpbnNwZWN0Tm9kZShvYmplY3QsIG9iamVjdHMsIGR1cGxpY2F0ZXNJbmRleGVzKTtcblxuICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gZHVwbGljYXRlc0luZGV4ZXMubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgIHN0YXRlLmR1cGxpY2F0ZXMucHVzaChvYmplY3RzW2R1cGxpY2F0ZXNJbmRleGVzW2luZGV4XV0pO1xuICB9XG4gIHN0YXRlLnVzZWREdXBsaWNhdGVzID0gbmV3IEFycmF5KGxlbmd0aCk7XG59XG5cbmZ1bmN0aW9uIGluc3BlY3ROb2RlKG9iamVjdCwgb2JqZWN0cywgZHVwbGljYXRlc0luZGV4ZXMpIHtcbiAgdmFyIG9iamVjdEtleUxpc3QsXG4gICAgICBpbmRleCxcbiAgICAgIGxlbmd0aDtcblxuICBpZiAob2JqZWN0ICE9PSBudWxsICYmIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnKSB7XG4gICAgaW5kZXggPSBvYmplY3RzLmluZGV4T2Yob2JqZWN0KTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICBpZiAoZHVwbGljYXRlc0luZGV4ZXMuaW5kZXhPZihpbmRleCkgPT09IC0xKSB7XG4gICAgICAgIGR1cGxpY2F0ZXNJbmRleGVzLnB1c2goaW5kZXgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBvYmplY3RzLnB1c2gob2JqZWN0KTtcblxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqZWN0KSkge1xuICAgICAgICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gb2JqZWN0Lmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICAgICAgICBpbnNwZWN0Tm9kZShvYmplY3RbaW5kZXhdLCBvYmplY3RzLCBkdXBsaWNhdGVzSW5kZXhlcyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9iamVjdEtleUxpc3QgPSBPYmplY3Qua2V5cyhvYmplY3QpO1xuXG4gICAgICAgIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSBvYmplY3RLZXlMaXN0Lmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICAgICAgICBpbnNwZWN0Tm9kZShvYmplY3Rbb2JqZWN0S2V5TGlzdFtpbmRleF1dLCBvYmplY3RzLCBkdXBsaWNhdGVzSW5kZXhlcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZHVtcChpbnB1dCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB2YXIgc3RhdGUgPSBuZXcgU3RhdGUob3B0aW9ucyk7XG5cbiAgaWYgKCFzdGF0ZS5ub1JlZnMpIGdldER1cGxpY2F0ZVJlZmVyZW5jZXMoaW5wdXQsIHN0YXRlKTtcblxuICBpZiAod3JpdGVOb2RlKHN0YXRlLCAwLCBpbnB1dCwgdHJ1ZSwgdHJ1ZSkpIHJldHVybiBzdGF0ZS5kdW1wICsgJ1xcbic7XG5cbiAgcmV0dXJuICcnO1xufVxuXG5mdW5jdGlvbiBzYWZlRHVtcChpbnB1dCwgb3B0aW9ucykge1xuICByZXR1cm4gZHVtcChpbnB1dCwgY29tbW9uLmV4dGVuZCh7IHNjaGVtYTogREVGQVVMVF9TQUZFX1NDSEVNQSB9LCBvcHRpb25zKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzLmR1bXAgICAgID0gZHVtcDtcbm1vZHVsZS5leHBvcnRzLnNhZmVEdW1wID0gc2FmZUR1bXA7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5cbnZhciBsb2FkZXIgPSByZXF1aXJlKCcuL2pzLXlhbWwvbG9hZGVyJyk7XG52YXIgZHVtcGVyID0gcmVxdWlyZSgnLi9qcy15YW1sL2R1bXBlcicpO1xuXG5cbmZ1bmN0aW9uIGRlcHJlY2F0ZWQobmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignRnVuY3Rpb24gJyArIG5hbWUgKyAnIGlzIGRlcHJlY2F0ZWQgYW5kIGNhbm5vdCBiZSB1c2VkLicpO1xuICB9O1xufVxuXG5cbm1vZHVsZS5leHBvcnRzLlR5cGUgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL2pzLXlhbWwvdHlwZScpO1xubW9kdWxlLmV4cG9ydHMuU2NoZW1hICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vanMteWFtbC9zY2hlbWEnKTtcbm1vZHVsZS5leHBvcnRzLkZBSUxTQUZFX1NDSEVNQSAgICAgPSByZXF1aXJlKCcuL2pzLXlhbWwvc2NoZW1hL2ZhaWxzYWZlJyk7XG5tb2R1bGUuZXhwb3J0cy5KU09OX1NDSEVNQSAgICAgICAgID0gcmVxdWlyZSgnLi9qcy15YW1sL3NjaGVtYS9qc29uJyk7XG5tb2R1bGUuZXhwb3J0cy5DT1JFX1NDSEVNQSAgICAgICAgID0gcmVxdWlyZSgnLi9qcy15YW1sL3NjaGVtYS9jb3JlJyk7XG5tb2R1bGUuZXhwb3J0cy5ERUZBVUxUX1NBRkVfU0NIRU1BID0gcmVxdWlyZSgnLi9qcy15YW1sL3NjaGVtYS9kZWZhdWx0X3NhZmUnKTtcbm1vZHVsZS5leHBvcnRzLkRFRkFVTFRfRlVMTF9TQ0hFTUEgPSByZXF1aXJlKCcuL2pzLXlhbWwvc2NoZW1hL2RlZmF1bHRfZnVsbCcpO1xubW9kdWxlLmV4cG9ydHMubG9hZCAgICAgICAgICAgICAgICA9IGxvYWRlci5sb2FkO1xubW9kdWxlLmV4cG9ydHMubG9hZEFsbCAgICAgICAgICAgICA9IGxvYWRlci5sb2FkQWxsO1xubW9kdWxlLmV4cG9ydHMuc2FmZUxvYWQgICAgICAgICAgICA9IGxvYWRlci5zYWZlTG9hZDtcbm1vZHVsZS5leHBvcnRzLnNhZmVMb2FkQWxsICAgICAgICAgPSBsb2FkZXIuc2FmZUxvYWRBbGw7XG5tb2R1bGUuZXhwb3J0cy5kdW1wICAgICAgICAgICAgICAgID0gZHVtcGVyLmR1bXA7XG5tb2R1bGUuZXhwb3J0cy5zYWZlRHVtcCAgICAgICAgICAgID0gZHVtcGVyLnNhZmVEdW1wO1xubW9kdWxlLmV4cG9ydHMuWUFNTEV4Y2VwdGlvbiAgICAgICA9IHJlcXVpcmUoJy4vanMteWFtbC9leGNlcHRpb24nKTtcblxuLy8gRGVwcmVjYXRlZCBzY2hlbWEgbmFtZXMgZnJvbSBKUy1ZQU1MIDIuMC54XG5tb2R1bGUuZXhwb3J0cy5NSU5JTUFMX1NDSEVNQSA9IHJlcXVpcmUoJy4vanMteWFtbC9zY2hlbWEvZmFpbHNhZmUnKTtcbm1vZHVsZS5leHBvcnRzLlNBRkVfU0NIRU1BICAgID0gcmVxdWlyZSgnLi9qcy15YW1sL3NjaGVtYS9kZWZhdWx0X3NhZmUnKTtcbm1vZHVsZS5leHBvcnRzLkRFRkFVTFRfU0NIRU1BID0gcmVxdWlyZSgnLi9qcy15YW1sL3NjaGVtYS9kZWZhdWx0X2Z1bGwnKTtcblxuLy8gRGVwcmVjYXRlZCBmdW5jdGlvbnMgZnJvbSBKUy1ZQU1MIDEueC54XG5tb2R1bGUuZXhwb3J0cy5zY2FuICAgICAgICAgICA9IGRlcHJlY2F0ZWQoJ3NjYW4nKTtcbm1vZHVsZS5leHBvcnRzLnBhcnNlICAgICAgICAgID0gZGVwcmVjYXRlZCgncGFyc2UnKTtcbm1vZHVsZS5leHBvcnRzLmNvbXBvc2UgICAgICAgID0gZGVwcmVjYXRlZCgnY29tcG9zZScpO1xubW9kdWxlLmV4cG9ydHMuYWRkQ29uc3RydWN0b3IgPSBkZXByZWNhdGVkKCdhZGRDb25zdHJ1Y3RvcicpO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuXG52YXIgeWFtbCA9IHJlcXVpcmUoJy4vbGliL2pzLXlhbWwuanMnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHlhbWw7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB5YW1sID0gcmVxdWlyZSgnanMteWFtbCcpO1xuXG4vKipcbiAqIERlZmF1bHQgZW5naW5lc1xuICovXG5cbmNvbnN0IGVuZ2luZXMgPSBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHM7XG5cbi8qKlxuICogWUFNTFxuICovXG5cbmVuZ2luZXMueWFtbCA9IHtcbiAgcGFyc2U6IHlhbWwuc2FmZUxvYWQuYmluZCh5YW1sKSxcbiAgc3RyaW5naWZ5OiB5YW1sLnNhZmVEdW1wLmJpbmQoeWFtbClcbn07XG5cbi8qKlxuICogSlNPTlxuICovXG5cbmVuZ2luZXMuanNvbiA9IHtcbiAgcGFyc2U6IEpTT04ucGFyc2UuYmluZChKU09OKSxcbiAgc3RyaW5naWZ5OiBmdW5jdGlvbihvYmosIG9wdGlvbnMpIHtcbiAgICBjb25zdCBvcHRzID0gT2JqZWN0LmFzc2lnbih7cmVwbGFjZXI6IG51bGwsIHNwYWNlOiAyfSwgb3B0aW9ucyk7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iaiwgb3B0cy5yZXBsYWNlciwgb3B0cy5zcGFjZSk7XG4gIH1cbn07XG5cbi8qKlxuICogSmF2YVNjcmlwdFxuICovXG5cbmVuZ2luZXMuamF2YXNjcmlwdCA9IHtcbiAgcGFyc2U6IGZ1bmN0aW9uIHBhcnNlKHN0ciwgb3B0aW9ucywgd3JhcCkge1xuICAgIC8qIGVzbGludCBuby1ldmFsOiAwICovXG4gICAgdHJ5IHtcbiAgICAgIGlmICh3cmFwICE9PSBmYWxzZSkge1xuICAgICAgICBzdHIgPSAnKGZ1bmN0aW9uKCkge1xcbnJldHVybiAnICsgc3RyLnRyaW0oKSArICc7XFxufSgpKTsnO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGV2YWwoc3RyKSB8fCB7fTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGlmICh3cmFwICE9PSBmYWxzZSAmJiAvKHVuZXhwZWN0ZWR8aWRlbnRpZmllcikvaS50ZXN0KGVyci5tZXNzYWdlKSkge1xuICAgICAgICByZXR1cm4gcGFyc2Uoc3RyLCBvcHRpb25zLCBmYWxzZSk7XG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoZXJyKTtcbiAgICB9XG4gIH0sXG4gIHN0cmluZ2lmeTogZnVuY3Rpb24oKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzdHJpbmdpZnlpbmcgSmF2YVNjcmlwdCBpcyBub3Qgc3VwcG9ydGVkJyk7XG4gIH1cbn07XG4iLCAiLyohXG4gKiBzdHJpcC1ib20tc3RyaW5nIDxodHRwczovL2dpdGh1Yi5jb20vam9uc2NobGlua2VydC9zdHJpcC1ib20tc3RyaW5nPlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSwgMjAxNywgSm9uIFNjaGxpbmtlcnQuXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHN0cikge1xuICBpZiAodHlwZW9mIHN0ciA9PT0gJ3N0cmluZycgJiYgc3RyLmNoYXJBdCgwKSA9PT0gJ1xcdWZlZmYnKSB7XG4gICAgcmV0dXJuIHN0ci5zbGljZSgxKTtcbiAgfVxuICByZXR1cm4gc3RyO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHN0cmlwQm9tID0gcmVxdWlyZSgnc3RyaXAtYm9tLXN0cmluZycpO1xuY29uc3QgdHlwZU9mID0gcmVxdWlyZSgna2luZC1vZicpO1xuXG5leHBvcnRzLmRlZmluZSA9IGZ1bmN0aW9uKG9iaiwga2V5LCB2YWwpIHtcbiAgUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogdmFsXG4gIH0pO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYHZhbGAgaXMgYSBidWZmZXJcbiAqL1xuXG5leHBvcnRzLmlzQnVmZmVyID0gZnVuY3Rpb24odmFsKSB7XG4gIHJldHVybiB0eXBlT2YodmFsKSA9PT0gJ2J1ZmZlcic7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBgdmFsYCBpcyBhbiBvYmplY3RcbiAqL1xuXG5leHBvcnRzLmlzT2JqZWN0ID0gZnVuY3Rpb24odmFsKSB7XG4gIHJldHVybiB0eXBlT2YodmFsKSA9PT0gJ29iamVjdCc7XG59O1xuXG4vKipcbiAqIENhc3QgYGlucHV0YCB0byBhIGJ1ZmZlclxuICovXG5cbmV4cG9ydHMudG9CdWZmZXIgPSBmdW5jdGlvbihpbnB1dCkge1xuICByZXR1cm4gdHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJyA/IEJ1ZmZlci5mcm9tKGlucHV0KSA6IGlucHV0O1xufTtcblxuLyoqXG4gKiBDYXN0IGB2YWxgIHRvIGEgc3RyaW5nLlxuICovXG5cbmV4cG9ydHMudG9TdHJpbmcgPSBmdW5jdGlvbihpbnB1dCkge1xuICBpZiAoZXhwb3J0cy5pc0J1ZmZlcihpbnB1dCkpIHJldHVybiBzdHJpcEJvbShTdHJpbmcoaW5wdXQpKTtcbiAgaWYgKHR5cGVvZiBpbnB1dCAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleHBlY3RlZCBpbnB1dCB0byBiZSBhIHN0cmluZyBvciBidWZmZXInKTtcbiAgfVxuICByZXR1cm4gc3RyaXBCb20oaW5wdXQpO1xufTtcblxuLyoqXG4gKiBDYXN0IGB2YWxgIHRvIGFuIGFycmF5LlxuICovXG5cbmV4cG9ydHMuYXJyYXlpZnkgPSBmdW5jdGlvbih2YWwpIHtcbiAgcmV0dXJuIHZhbCA/IChBcnJheS5pc0FycmF5KHZhbCkgPyB2YWwgOiBbdmFsXSkgOiBbXTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGBzdHJgIHN0YXJ0cyB3aXRoIGBzdWJzdHJgLlxuICovXG5cbmV4cG9ydHMuc3RhcnRzV2l0aCA9IGZ1bmN0aW9uKHN0ciwgc3Vic3RyLCBsZW4pIHtcbiAgaWYgKHR5cGVvZiBsZW4gIT09ICdudW1iZXInKSBsZW4gPSBzdWJzdHIubGVuZ3RoO1xuICByZXR1cm4gc3RyLnNsaWNlKDAsIGxlbikgPT09IHN1YnN0cjtcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlbmdpbmVzID0gcmVxdWlyZSgnLi9lbmdpbmVzJyk7XG5jb25zdCB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIGNvbnN0IG9wdHMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKTtcblxuICAvLyBlbnN1cmUgdGhhdCBkZWxpbWl0ZXJzIGFyZSBhbiBhcnJheVxuICBvcHRzLmRlbGltaXRlcnMgPSB1dGlscy5hcnJheWlmeShvcHRzLmRlbGltcyB8fCBvcHRzLmRlbGltaXRlcnMgfHwgJy0tLScpO1xuICBpZiAob3B0cy5kZWxpbWl0ZXJzLmxlbmd0aCA9PT0gMSkge1xuICAgIG9wdHMuZGVsaW1pdGVycy5wdXNoKG9wdHMuZGVsaW1pdGVyc1swXSk7XG4gIH1cblxuICBvcHRzLmxhbmd1YWdlID0gKG9wdHMubGFuZ3VhZ2UgfHwgb3B0cy5sYW5nIHx8ICd5YW1sJykudG9Mb3dlckNhc2UoKTtcbiAgb3B0cy5lbmdpbmVzID0gT2JqZWN0LmFzc2lnbih7fSwgZW5naW5lcywgb3B0cy5wYXJzZXJzLCBvcHRzLmVuZ2luZXMpO1xuICByZXR1cm4gb3B0cztcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5hbWUsIG9wdGlvbnMpIHtcbiAgbGV0IGVuZ2luZSA9IG9wdGlvbnMuZW5naW5lc1tuYW1lXSB8fCBvcHRpb25zLmVuZ2luZXNbYWxpYXNlKG5hbWUpXTtcbiAgaWYgKHR5cGVvZiBlbmdpbmUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdncmF5LW1hdHRlciBlbmdpbmUgXCInICsgbmFtZSArICdcIiBpcyBub3QgcmVnaXN0ZXJlZCcpO1xuICB9XG4gIGlmICh0eXBlb2YgZW5naW5lID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZW5naW5lID0geyBwYXJzZTogZW5naW5lIH07XG4gIH1cbiAgcmV0dXJuIGVuZ2luZTtcbn07XG5cbmZ1bmN0aW9uIGFsaWFzZShuYW1lKSB7XG4gIHN3aXRjaCAobmFtZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSAnanMnOlxuICAgIGNhc2UgJ2phdmFzY3JpcHQnOlxuICAgICAgcmV0dXJuICdqYXZhc2NyaXB0JztcbiAgICBjYXNlICdjb2ZmZWUnOlxuICAgIGNhc2UgJ2NvZmZlZXNjcmlwdCc6XG4gICAgY2FzZSAnY3Nvbic6XG4gICAgICByZXR1cm4gJ2NvZmZlZSc7XG4gICAgY2FzZSAneWFtbCc6XG4gICAgY2FzZSAneW1sJzpcbiAgICAgIHJldHVybiAneWFtbCc7XG4gICAgZGVmYXVsdDoge1xuICAgICAgcmV0dXJuIG5hbWU7XG4gICAgfVxuICB9XG59XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB0eXBlT2YgPSByZXF1aXJlKCdraW5kLW9mJyk7XG5jb25zdCBnZXRFbmdpbmUgPSByZXF1aXJlKCcuL2VuZ2luZScpO1xuY29uc3QgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZmlsZSwgZGF0YSwgb3B0aW9ucykge1xuICBpZiAoZGF0YSA9PSBudWxsICYmIG9wdGlvbnMgPT0gbnVsbCkge1xuICAgIHN3aXRjaCAodHlwZU9mKGZpbGUpKSB7XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBkYXRhID0gZmlsZS5kYXRhO1xuICAgICAgICBvcHRpb25zID0ge307XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgcmV0dXJuIGZpbGU7XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4cGVjdGVkIGZpbGUgdG8gYmUgYSBzdHJpbmcgb3Igb2JqZWN0Jyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc3Qgc3RyID0gZmlsZS5jb250ZW50O1xuICBjb25zdCBvcHRzID0gZGVmYXVsdHMob3B0aW9ucyk7XG4gIGlmIChkYXRhID09IG51bGwpIHtcbiAgICBpZiAoIW9wdHMuZGF0YSkgcmV0dXJuIGZpbGU7XG4gICAgZGF0YSA9IG9wdHMuZGF0YTtcbiAgfVxuXG4gIGNvbnN0IGxhbmd1YWdlID0gZmlsZS5sYW5ndWFnZSB8fCBvcHRzLmxhbmd1YWdlO1xuICBjb25zdCBlbmdpbmUgPSBnZXRFbmdpbmUobGFuZ3VhZ2UsIG9wdHMpO1xuICBpZiAodHlwZW9mIGVuZ2luZS5zdHJpbmdpZnkgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleHBlY3RlZCBcIicgKyBsYW5ndWFnZSArICcuc3RyaW5naWZ5XCIgdG8gYmUgYSBmdW5jdGlvbicpO1xuICB9XG5cbiAgZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGZpbGUuZGF0YSwgZGF0YSk7XG4gIGNvbnN0IG9wZW4gPSBvcHRzLmRlbGltaXRlcnNbMF07XG4gIGNvbnN0IGNsb3NlID0gb3B0cy5kZWxpbWl0ZXJzWzFdO1xuICBjb25zdCBtYXR0ZXIgPSBlbmdpbmUuc3RyaW5naWZ5KGRhdGEsIG9wdGlvbnMpLnRyaW0oKTtcbiAgbGV0IGJ1ZiA9ICcnO1xuXG4gIGlmIChtYXR0ZXIgIT09ICd7fScpIHtcbiAgICBidWYgPSBuZXdsaW5lKG9wZW4pICsgbmV3bGluZShtYXR0ZXIpICsgbmV3bGluZShjbG9zZSk7XG4gIH1cblxuICBpZiAodHlwZW9mIGZpbGUuZXhjZXJwdCA9PT0gJ3N0cmluZycgJiYgZmlsZS5leGNlcnB0ICE9PSAnJykge1xuICAgIGlmIChzdHIuaW5kZXhPZihmaWxlLmV4Y2VycHQudHJpbSgpKSA9PT0gLTEpIHtcbiAgICAgIGJ1ZiArPSBuZXdsaW5lKGZpbGUuZXhjZXJwdCkgKyBuZXdsaW5lKGNsb3NlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmICsgbmV3bGluZShzdHIpO1xufTtcblxuZnVuY3Rpb24gbmV3bGluZShzdHIpIHtcbiAgcmV0dXJuIHN0ci5zbGljZSgtMSkgIT09ICdcXG4nID8gc3RyICsgJ1xcbicgOiBzdHI7XG59XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmaWxlLCBvcHRpb25zKSB7XG4gIGNvbnN0IG9wdHMgPSBkZWZhdWx0cyhvcHRpb25zKTtcblxuICBpZiAoZmlsZS5kYXRhID09IG51bGwpIHtcbiAgICBmaWxlLmRhdGEgPSB7fTtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygb3B0cy5leGNlcnB0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIG9wdHMuZXhjZXJwdChmaWxlLCBvcHRzKTtcbiAgfVxuXG4gIGNvbnN0IHNlcCA9IGZpbGUuZGF0YS5leGNlcnB0X3NlcGFyYXRvciB8fCBvcHRzLmV4Y2VycHRfc2VwYXJhdG9yO1xuICBpZiAoc2VwID09IG51bGwgJiYgKG9wdHMuZXhjZXJwdCA9PT0gZmFsc2UgfHwgb3B0cy5leGNlcnB0ID09IG51bGwpKSB7XG4gICAgcmV0dXJuIGZpbGU7XG4gIH1cblxuICBjb25zdCBkZWxpbWl0ZXIgPSB0eXBlb2Ygb3B0cy5leGNlcnB0ID09PSAnc3RyaW5nJ1xuICAgID8gb3B0cy5leGNlcnB0XG4gICAgOiAoc2VwIHx8IG9wdHMuZGVsaW1pdGVyc1swXSk7XG5cbiAgLy8gaWYgZW5hYmxlZCwgZ2V0IHRoZSBleGNlcnB0IGRlZmluZWQgYWZ0ZXIgZnJvbnQtbWF0dGVyXG4gIGNvbnN0IGlkeCA9IGZpbGUuY29udGVudC5pbmRleE9mKGRlbGltaXRlcik7XG4gIGlmIChpZHggIT09IC0xKSB7XG4gICAgZmlsZS5leGNlcnB0ID0gZmlsZS5jb250ZW50LnNsaWNlKDAsIGlkeCk7XG4gIH1cblxuICByZXR1cm4gZmlsZTtcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB0eXBlT2YgPSByZXF1aXJlKCdraW5kLW9mJyk7XG5jb25zdCBzdHJpbmdpZnkgPSByZXF1aXJlKCcuL3N0cmluZ2lmeScpO1xuY29uc3QgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbi8qKlxuICogTm9ybWFsaXplIHRoZSBnaXZlbiB2YWx1ZSB0byBlbnN1cmUgYW4gb2JqZWN0IGlzIHJldHVybmVkXG4gKiB3aXRoIHRoZSBleHBlY3RlZCBwcm9wZXJ0aWVzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZmlsZSkge1xuICBpZiAodHlwZU9mKGZpbGUpICE9PSAnb2JqZWN0Jykge1xuICAgIGZpbGUgPSB7IGNvbnRlbnQ6IGZpbGUgfTtcbiAgfVxuXG4gIGlmICh0eXBlT2YoZmlsZS5kYXRhKSAhPT0gJ29iamVjdCcpIHtcbiAgICBmaWxlLmRhdGEgPSB7fTtcbiAgfVxuXG4gIC8vIGlmIGZpbGUgd2FzIHBhc3NlZCBhcyBhbiBvYmplY3QsIGVuc3VyZSB0aGF0XG4gIC8vIFwiZmlsZS5jb250ZW50XCIgaXMgc2V0XG4gIGlmIChmaWxlLmNvbnRlbnRzICYmIGZpbGUuY29udGVudCA9PSBudWxsKSB7XG4gICAgZmlsZS5jb250ZW50ID0gZmlsZS5jb250ZW50cztcbiAgfVxuXG4gIC8vIHNldCBub24tZW51bWVyYWJsZSBwcm9wZXJ0aWVzIG9uIHRoZSBmaWxlIG9iamVjdFxuICB1dGlscy5kZWZpbmUoZmlsZSwgJ29yaWcnLCB1dGlscy50b0J1ZmZlcihmaWxlLmNvbnRlbnQpKTtcbiAgdXRpbHMuZGVmaW5lKGZpbGUsICdsYW5ndWFnZScsIGZpbGUubGFuZ3VhZ2UgfHwgJycpO1xuICB1dGlscy5kZWZpbmUoZmlsZSwgJ21hdHRlcicsIGZpbGUubWF0dGVyIHx8ICcnKTtcbiAgdXRpbHMuZGVmaW5lKGZpbGUsICdzdHJpbmdpZnknLCBmdW5jdGlvbihkYXRhLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5sYW5ndWFnZSkge1xuICAgICAgZmlsZS5sYW5ndWFnZSA9IG9wdGlvbnMubGFuZ3VhZ2U7XG4gICAgfVxuICAgIHJldHVybiBzdHJpbmdpZnkoZmlsZSwgZGF0YSwgb3B0aW9ucyk7XG4gIH0pO1xuXG4gIC8vIHN0cmlwIEJPTSBhbmQgZW5zdXJlIHRoYXQgXCJmaWxlLmNvbnRlbnRcIiBpcyBhIHN0cmluZ1xuICBmaWxlLmNvbnRlbnQgPSB1dGlscy50b1N0cmluZyhmaWxlLmNvbnRlbnQpO1xuICBmaWxlLmlzRW1wdHkgPSBmYWxzZTtcbiAgZmlsZS5leGNlcnB0ID0gJyc7XG4gIHJldHVybiBmaWxlO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGdldEVuZ2luZSA9IHJlcXVpcmUoJy4vZW5naW5lJyk7XG5jb25zdCBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsYW5ndWFnZSwgc3RyLCBvcHRpb25zKSB7XG4gIGNvbnN0IG9wdHMgPSBkZWZhdWx0cyhvcHRpb25zKTtcbiAgY29uc3QgZW5naW5lID0gZ2V0RW5naW5lKGxhbmd1YWdlLCBvcHRzKTtcbiAgaWYgKHR5cGVvZiBlbmdpbmUucGFyc2UgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleHBlY3RlZCBcIicgKyBsYW5ndWFnZSArICcucGFyc2VcIiB0byBiZSBhIGZ1bmN0aW9uJyk7XG4gIH1cbiAgcmV0dXJuIGVuZ2luZS5wYXJzZShzdHIsIG9wdHMpO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcbmNvbnN0IHNlY3Rpb25zID0gcmVxdWlyZSgnc2VjdGlvbi1tYXR0ZXInKTtcbmNvbnN0IGRlZmF1bHRzID0gcmVxdWlyZSgnLi9saWIvZGVmYXVsdHMnKTtcbmNvbnN0IHN0cmluZ2lmeSA9IHJlcXVpcmUoJy4vbGliL3N0cmluZ2lmeScpO1xuY29uc3QgZXhjZXJwdCA9IHJlcXVpcmUoJy4vbGliL2V4Y2VycHQnKTtcbmNvbnN0IGVuZ2luZXMgPSByZXF1aXJlKCcuL2xpYi9lbmdpbmVzJyk7XG5jb25zdCB0b0ZpbGUgPSByZXF1aXJlKCcuL2xpYi90by1maWxlJyk7XG5jb25zdCBwYXJzZSA9IHJlcXVpcmUoJy4vbGliL3BhcnNlJyk7XG5jb25zdCB1dGlscyA9IHJlcXVpcmUoJy4vbGliL3V0aWxzJyk7XG5cbi8qKlxuICogVGFrZXMgYSBzdHJpbmcgb3Igb2JqZWN0IHdpdGggYGNvbnRlbnRgIHByb3BlcnR5LCBleHRyYWN0c1xuICogYW5kIHBhcnNlcyBmcm9udC1tYXR0ZXIgZnJvbSB0aGUgc3RyaW5nLCB0aGVuIHJldHVybnMgYW4gb2JqZWN0XG4gKiB3aXRoIGBkYXRhYCwgYGNvbnRlbnRgIGFuZCBvdGhlciBbdXNlZnVsIHByb3BlcnRpZXNdKCNyZXR1cm5lZC1vYmplY3QpLlxuICpcbiAqIGBgYGpzXG4gKiBjb25zdCBtYXR0ZXIgPSByZXF1aXJlKCdncmF5LW1hdHRlcicpO1xuICogY29uc29sZS5sb2cobWF0dGVyKCctLS1cXG50aXRsZTogSG9tZVxcbi0tLVxcbk90aGVyIHN0dWZmJykpO1xuICogLy89PiB7IGRhdGE6IHsgdGl0bGU6ICdIb21lJ30sIGNvbnRlbnQ6ICdPdGhlciBzdHVmZicgfVxuICogYGBgXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IGBpbnB1dGAgU3RyaW5nLCBvciBvYmplY3Qgd2l0aCBgY29udGVudGAgc3RyaW5nXG4gKiBAcGFyYW0ge09iamVjdH0gYG9wdGlvbnNgXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIG1hdHRlcihpbnB1dCwgb3B0aW9ucykge1xuICBpZiAoaW5wdXQgPT09ICcnKSB7XG4gICAgcmV0dXJuIHsgZGF0YToge30sIGNvbnRlbnQ6IGlucHV0LCBleGNlcnB0OiAnJywgb3JpZzogaW5wdXQgfTtcbiAgfVxuXG4gIGxldCBmaWxlID0gdG9GaWxlKGlucHV0KTtcbiAgY29uc3QgY2FjaGVkID0gbWF0dGVyLmNhY2hlW2ZpbGUuY29udGVudF07XG5cbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgaWYgKGNhY2hlZCkge1xuICAgICAgZmlsZSA9IE9iamVjdC5hc3NpZ24oe30sIGNhY2hlZCk7XG4gICAgICBmaWxlLm9yaWcgPSBjYWNoZWQub3JpZztcbiAgICAgIHJldHVybiBmaWxlO1xuICAgIH1cblxuICAgIC8vIG9ubHkgY2FjaGUgaWYgdGhlcmUgYXJlIG5vIG9wdGlvbnMgcGFzc2VkLiBpZiB3ZSBjYWNoZSB3aGVuIG9wdGlvbnNcbiAgICAvLyBhcmUgcGFzc2VkLCB3ZSB3b3VsZCBuZWVkIHRvIGFsc28gY2FjaGUgb3B0aW9ucyB2YWx1ZXMsIHdoaWNoIHdvdWxkXG4gICAgLy8gbmVnYXRlIGFueSBwZXJmb3JtYW5jZSBiZW5lZml0cyBvZiBjYWNoaW5nXG4gICAgbWF0dGVyLmNhY2hlW2ZpbGUuY29udGVudF0gPSBmaWxlO1xuICB9XG5cbiAgcmV0dXJuIHBhcnNlTWF0dGVyKGZpbGUsIG9wdGlvbnMpO1xufVxuXG4vKipcbiAqIFBhcnNlIGZyb250IG1hdHRlclxuICovXG5cbmZ1bmN0aW9uIHBhcnNlTWF0dGVyKGZpbGUsIG9wdGlvbnMpIHtcbiAgY29uc3Qgb3B0cyA9IGRlZmF1bHRzKG9wdGlvbnMpO1xuICBjb25zdCBvcGVuID0gb3B0cy5kZWxpbWl0ZXJzWzBdO1xuICBjb25zdCBjbG9zZSA9ICdcXG4nICsgb3B0cy5kZWxpbWl0ZXJzWzFdO1xuICBsZXQgc3RyID0gZmlsZS5jb250ZW50O1xuXG4gIGlmIChvcHRzLmxhbmd1YWdlKSB7XG4gICAgZmlsZS5sYW5ndWFnZSA9IG9wdHMubGFuZ3VhZ2U7XG4gIH1cblxuICAvLyBnZXQgdGhlIGxlbmd0aCBvZiB0aGUgb3BlbmluZyBkZWxpbWl0ZXJcbiAgY29uc3Qgb3BlbkxlbiA9IG9wZW4ubGVuZ3RoO1xuICBpZiAoIXV0aWxzLnN0YXJ0c1dpdGgoc3RyLCBvcGVuLCBvcGVuTGVuKSkge1xuICAgIGV4Y2VycHQoZmlsZSwgb3B0cyk7XG4gICAgcmV0dXJuIGZpbGU7XG4gIH1cblxuICAvLyBpZiB0aGUgbmV4dCBjaGFyYWN0ZXIgYWZ0ZXIgdGhlIG9wZW5pbmcgZGVsaW1pdGVyIGlzXG4gIC8vIGEgY2hhcmFjdGVyIGZyb20gdGhlIGRlbGltaXRlciwgdGhlbiBpdCdzIG5vdCBhIGZyb250LVxuICAvLyBtYXR0ZXIgZGVsaW1pdGVyXG4gIGlmIChzdHIuY2hhckF0KG9wZW5MZW4pID09PSBvcGVuLnNsaWNlKC0xKSkge1xuICAgIHJldHVybiBmaWxlO1xuICB9XG5cbiAgLy8gc3RyaXAgdGhlIG9wZW5pbmcgZGVsaW1pdGVyXG4gIHN0ciA9IHN0ci5zbGljZShvcGVuTGVuKTtcbiAgY29uc3QgbGVuID0gc3RyLmxlbmd0aDtcblxuICAvLyB1c2UgdGhlIGxhbmd1YWdlIGRlZmluZWQgYWZ0ZXIgZmlyc3QgZGVsaW1pdGVyLCBpZiBpdCBleGlzdHNcbiAgY29uc3QgbGFuZ3VhZ2UgPSBtYXR0ZXIubGFuZ3VhZ2Uoc3RyLCBvcHRzKTtcbiAgaWYgKGxhbmd1YWdlLm5hbWUpIHtcbiAgICBmaWxlLmxhbmd1YWdlID0gbGFuZ3VhZ2UubmFtZTtcbiAgICBzdHIgPSBzdHIuc2xpY2UobGFuZ3VhZ2UucmF3Lmxlbmd0aCk7XG4gIH1cblxuICAvLyBnZXQgdGhlIGluZGV4IG9mIHRoZSBjbG9zaW5nIGRlbGltaXRlclxuICBsZXQgY2xvc2VJbmRleCA9IHN0ci5pbmRleE9mKGNsb3NlKTtcbiAgaWYgKGNsb3NlSW5kZXggPT09IC0xKSB7XG4gICAgY2xvc2VJbmRleCA9IGxlbjtcbiAgfVxuXG4gIC8vIGdldCB0aGUgcmF3IGZyb250LW1hdHRlciBibG9ja1xuICBmaWxlLm1hdHRlciA9IHN0ci5zbGljZSgwLCBjbG9zZUluZGV4KTtcblxuICBjb25zdCBibG9jayA9IGZpbGUubWF0dGVyLnJlcGxhY2UoL15cXHMqI1teXFxuXSsvZ20sICcnKS50cmltKCk7XG4gIGlmIChibG9jayA9PT0gJycpIHtcbiAgICBmaWxlLmlzRW1wdHkgPSB0cnVlO1xuICAgIGZpbGUuZW1wdHkgPSBmaWxlLmNvbnRlbnQ7XG4gICAgZmlsZS5kYXRhID0ge307XG4gIH0gZWxzZSB7XG5cbiAgICAvLyBjcmVhdGUgZmlsZS5kYXRhIGJ5IHBhcnNpbmcgdGhlIHJhdyBmaWxlLm1hdHRlciBibG9ja1xuICAgIGZpbGUuZGF0YSA9IHBhcnNlKGZpbGUubGFuZ3VhZ2UsIGZpbGUubWF0dGVyLCBvcHRzKTtcbiAgfVxuXG4gIC8vIHVwZGF0ZSBmaWxlLmNvbnRlbnRcbiAgaWYgKGNsb3NlSW5kZXggPT09IGxlbikge1xuICAgIGZpbGUuY29udGVudCA9ICcnO1xuICB9IGVsc2Uge1xuICAgIGZpbGUuY29udGVudCA9IHN0ci5zbGljZShjbG9zZUluZGV4ICsgY2xvc2UubGVuZ3RoKTtcbiAgICBpZiAoZmlsZS5jb250ZW50WzBdID09PSAnXFxyJykge1xuICAgICAgZmlsZS5jb250ZW50ID0gZmlsZS5jb250ZW50LnNsaWNlKDEpO1xuICAgIH1cbiAgICBpZiAoZmlsZS5jb250ZW50WzBdID09PSAnXFxuJykge1xuICAgICAgZmlsZS5jb250ZW50ID0gZmlsZS5jb250ZW50LnNsaWNlKDEpO1xuICAgIH1cbiAgfVxuXG4gIGV4Y2VycHQoZmlsZSwgb3B0cyk7XG5cbiAgaWYgKG9wdHMuc2VjdGlvbnMgPT09IHRydWUgfHwgdHlwZW9mIG9wdHMuc2VjdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHNlY3Rpb25zKGZpbGUsIG9wdHMuc2VjdGlvbik7XG4gIH1cbiAgcmV0dXJuIGZpbGU7XG59XG5cbi8qKlxuICogRXhwb3NlIGVuZ2luZXNcbiAqL1xuXG5tYXR0ZXIuZW5naW5lcyA9IGVuZ2luZXM7XG5cbi8qKlxuICogU3RyaW5naWZ5IGFuIG9iamVjdCB0byBZQU1MIG9yIHRoZSBzcGVjaWZpZWQgbGFuZ3VhZ2UsIGFuZFxuICogYXBwZW5kIGl0IHRvIHRoZSBnaXZlbiBzdHJpbmcuIEJ5IGRlZmF1bHQsIG9ubHkgWUFNTCBhbmQgSlNPTlxuICogY2FuIGJlIHN0cmluZ2lmaWVkLiBTZWUgdGhlIFtlbmdpbmVzXSgjZW5naW5lcykgc2VjdGlvbiB0byBsZWFyblxuICogaG93IHRvIHN0cmluZ2lmeSBvdGhlciBsYW5ndWFnZXMuXG4gKlxuICogYGBganNcbiAqIGNvbnNvbGUubG9nKG1hdHRlci5zdHJpbmdpZnkoJ2ZvbyBiYXIgYmF6Jywge3RpdGxlOiAnSG9tZSd9KSk7XG4gKiAvLyByZXN1bHRzIGluOlxuICogLy8gLS0tXG4gKiAvLyB0aXRsZTogSG9tZVxuICogLy8gLS0tXG4gKiAvLyBmb28gYmFyIGJhelxuICogYGBgXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGBmaWxlYCBUaGUgY29udGVudCBzdHJpbmcgdG8gYXBwZW5kIHRvIHN0cmluZ2lmaWVkIGZyb250LW1hdHRlciwgb3IgYSBmaWxlIG9iamVjdCB3aXRoIGBmaWxlLmNvbnRlbnRgIHN0cmluZy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBgZGF0YWAgRnJvbnQgbWF0dGVyIHRvIHN0cmluZ2lmeS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBgb3B0aW9uc2AgW09wdGlvbnNdKCNvcHRpb25zKSB0byBwYXNzIHRvIGdyYXktbWF0dGVyIGFuZCBbanMteWFtbF0uXG4gKiBAcmV0dXJuIHtTdHJpbmd9IFJldHVybnMgYSBzdHJpbmcgY3JlYXRlZCBieSB3cmFwcGluZyBzdHJpbmdpZmllZCB5YW1sIHdpdGggZGVsaW1pdGVycywgYW5kIGFwcGVuZGluZyB0aGF0IHRvIHRoZSBnaXZlbiBzdHJpbmcuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1hdHRlci5zdHJpbmdpZnkgPSBmdW5jdGlvbihmaWxlLCBkYXRhLCBvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZmlsZSA9PT0gJ3N0cmluZycpIGZpbGUgPSBtYXR0ZXIoZmlsZSwgb3B0aW9ucyk7XG4gIHJldHVybiBzdHJpbmdpZnkoZmlsZSwgZGF0YSwgb3B0aW9ucyk7XG59O1xuXG4vKipcbiAqIFN5bmNocm9ub3VzbHkgcmVhZCBhIGZpbGUgZnJvbSB0aGUgZmlsZSBzeXN0ZW0gYW5kIHBhcnNlXG4gKiBmcm9udCBtYXR0ZXIuIFJldHVybnMgdGhlIHNhbWUgb2JqZWN0IGFzIHRoZSBbbWFpbiBmdW5jdGlvbl0oI21hdHRlcikuXG4gKlxuICogYGBganNcbiAqIGNvbnN0IGZpbGUgPSBtYXR0ZXIucmVhZCgnLi9jb250ZW50L2Jsb2ctcG9zdC5tZCcpO1xuICogYGBgXG4gKiBAcGFyYW0ge1N0cmluZ30gYGZpbGVwYXRoYCBmaWxlIHBhdGggb2YgdGhlIGZpbGUgdG8gcmVhZC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBgb3B0aW9uc2AgW09wdGlvbnNdKCNvcHRpb25zKSB0byBwYXNzIHRvIGdyYXktbWF0dGVyLlxuICogQHJldHVybiB7T2JqZWN0fSBSZXR1cm5zIFthbiBvYmplY3RdKCNyZXR1cm5lZC1vYmplY3QpIHdpdGggYGRhdGFgIGFuZCBgY29udGVudGBcbiAqIEBhcGkgcHVibGljXG4gKi9cblxubWF0dGVyLnJlYWQgPSBmdW5jdGlvbihmaWxlcGF0aCwgb3B0aW9ucykge1xuICBjb25zdCBzdHIgPSBmcy5yZWFkRmlsZVN5bmMoZmlsZXBhdGgsICd1dGY4Jyk7XG4gIGNvbnN0IGZpbGUgPSBtYXR0ZXIoc3RyLCBvcHRpb25zKTtcbiAgZmlsZS5wYXRoID0gZmlsZXBhdGg7XG4gIHJldHVybiBmaWxlO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIGBzdHJpbmdgIGhhcyBmcm9udCBtYXR0ZXIuXG4gKiBAcGFyYW0gIHtTdHJpbmd9IGBzdHJpbmdgXG4gKiBAcGFyYW0gIHtPYmplY3R9IGBvcHRpb25zYFxuICogQHJldHVybiB7Qm9vbGVhbn0gVHJ1ZSBpZiBmcm9udCBtYXR0ZXIgZXhpc3RzLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tYXR0ZXIudGVzdCA9IGZ1bmN0aW9uKHN0ciwgb3B0aW9ucykge1xuICByZXR1cm4gdXRpbHMuc3RhcnRzV2l0aChzdHIsIGRlZmF1bHRzKG9wdGlvbnMpLmRlbGltaXRlcnNbMF0pO1xufTtcblxuLyoqXG4gKiBEZXRlY3QgdGhlIGxhbmd1YWdlIHRvIHVzZSwgaWYgb25lIGlzIGRlZmluZWQgYWZ0ZXIgdGhlXG4gKiBmaXJzdCBmcm9udC1tYXR0ZXIgZGVsaW1pdGVyLlxuICogQHBhcmFtICB7U3RyaW5nfSBgc3RyaW5nYFxuICogQHBhcmFtICB7T2JqZWN0fSBgb3B0aW9uc2BcbiAqIEByZXR1cm4ge09iamVjdH0gT2JqZWN0IHdpdGggYHJhd2AgKGFjdHVhbCBsYW5ndWFnZSBzdHJpbmcpLCBhbmQgYG5hbWVgLCB0aGUgbGFuZ3VhZ2Ugd2l0aCB3aGl0ZXNwYWNlIHRyaW1tZWRcbiAqL1xuXG5tYXR0ZXIubGFuZ3VhZ2UgPSBmdW5jdGlvbihzdHIsIG9wdGlvbnMpIHtcbiAgY29uc3Qgb3B0cyA9IGRlZmF1bHRzKG9wdGlvbnMpO1xuICBjb25zdCBvcGVuID0gb3B0cy5kZWxpbWl0ZXJzWzBdO1xuXG4gIGlmIChtYXR0ZXIudGVzdChzdHIpKSB7XG4gICAgc3RyID0gc3RyLnNsaWNlKG9wZW4ubGVuZ3RoKTtcbiAgfVxuXG4gIGNvbnN0IGxhbmd1YWdlID0gc3RyLnNsaWNlKDAsIHN0ci5zZWFyY2goL1xccj9cXG4vKSk7XG4gIHJldHVybiB7XG4gICAgcmF3OiBsYW5ndWFnZSxcbiAgICBuYW1lOiBsYW5ndWFnZSA/IGxhbmd1YWdlLnRyaW0oKSA6ICcnXG4gIH07XG59O1xuXG4vKipcbiAqIEV4cG9zZSBgbWF0dGVyYFxuICovXG5cbm1hdHRlci5jYWNoZSA9IHt9O1xubWF0dGVyLmNsZWFyQ2FjaGUgPSBmdW5jdGlvbigpIHtcbiAgbWF0dGVyLmNhY2hlID0ge307XG59O1xubW9kdWxlLmV4cG9ydHMgPSBtYXR0ZXI7XG4iLCAiaW1wb3J0IHsgTm90aWNlLCBQbHVnaW4sIG5vcm1hbGl6ZVBhdGgsIFRGaWxlIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvblR1cm4gfSBmcm9tIFwiLi9jb252ZXJzYXRpb25cIjtcbmltcG9ydCB7IHNhdmVDb252ZXJzYXRpb25Gcm9tVHVybnMgfSBmcm9tIFwiLi9jb252ZXJzYXRpb25TdG9yZVwiO1xuaW1wb3J0IHsgT3ZsQXBpQ2xpZW50IH0gZnJvbSBcIi4vYXBpXCI7XG5pbXBvcnQgeyBhcHBlbmRFcnJvckxvZyB9IGZyb20gXCIuL2xvZ2dpbmdcIjtcbmltcG9ydCB7IFNhdmVDb252ZXJzYXRpb25Nb2RhbCwgU2F2ZUNvbnZlcnNhdGlvbkZvcm0gfSBmcm9tIFwiLi9tb2RhbHMvc2F2ZUNvbnZlcnNhdGlvbk1vZGFsXCI7XG5pbXBvcnQgeyBwYXJzZVR1cm5zIH0gZnJvbSBcIi4vcGFyc2VUdXJuc1wiO1xuaW1wb3J0IHsgT3ZsU2V0dGluZ1RhYiB9IGZyb20gXCIuL3NldHRpbmdzXCI7XG5pbXBvcnQgeyBERUZBVUxUX1NFVFRJTkdTLCBPdmxTZXR0aW5ncywgRU1CRURESU5HX1BSRVNFVFMgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgQ2hhdFZpZXcsIFZJRVdfVFlQRV9PVkxfQ0hBVCB9IGZyb20gXCIuL3ZpZXdzL2NoYXRWaWV3XCI7XG5pbXBvcnQgeyBJbmRleGVyIH0gZnJvbSBcIi4vaW5kZXhpbmcvaW5kZXhlclwiO1xuaW1wb3J0IHsgVmF1bHRXYXRjaGVyIH0gZnJvbSBcIi4vdmF1bHRXYXRjaGVyXCI7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSBcInBhdGhcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3ZsUGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcbiAgcHVibGljIHNldHRpbmdzOiBPdmxTZXR0aW5ncyA9IHsgLi4uREVGQVVMVF9TRVRUSU5HUyB9O1xuICBwcml2YXRlIGxhc3RTYXZlZFNldHRpbmdzOiBPdmxTZXR0aW5ncyA9IHsgLi4uREVGQVVMVF9TRVRUSU5HUyB9O1xuICBwcml2YXRlIGFwaUNsaWVudDogT3ZsQXBpQ2xpZW50IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgaW5kZXhlcjogSW5kZXhlciB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIHZhdWx0V2F0Y2hlcjogVmF1bHRXYXRjaGVyIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgaW5kZXhpbmdFdmVudHNSZWdpc3RlcmVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgYXN5bmMgb25sb2FkKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMubG9hZFNldHRpbmdzKCk7XG5cbiAgICAvLyBBUEkgXHVENjM4XHVDRDlDIFx1Qjg1Q1x1QzlDMVx1Qzc0NCBcdUJEODRcdUI5QUNcdUQ1NzQgXHVDMEMxXHVEMERDXHVCOTdDIFx1QzcyMFx1QzlDMFx1RDU2OVx1QjJDOFx1QjJFNC5cbiAgICB0aGlzLmFwaUNsaWVudCA9IG5ldyBPdmxBcGlDbGllbnQoXG4gICAgICAoKSA9PiB0aGlzLnNldHRpbmdzLFxuICAgICAgKGNvbnRleHQ6IHN0cmluZywgZGV0YWlsOiB1bmtub3duKSA9PlxuICAgICAgICBhcHBlbmRFcnJvckxvZyh0aGlzLmFwcCwgdGhpcy5tYW5pZmVzdCwgY29udGV4dCwgZGV0YWlsKVxuICAgICk7XG5cbiAgICAvLyBcdUM3NzhcdUIzNzFcdUMyRjEgXHVDRDA4XHVBRTMwXHVENjU0XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuaW5kZXhpbmdFbmFibGVkKSB7XG4gICAgICBhd2FpdCB0aGlzLmluaXRpYWxpemVJbmRleGluZygpO1xuICAgIH1cblxuICAgIC8vIFx1QzBBQ1x1Qzc3NFx1QjREQ1x1QkMxNCBcdUNDNDRcdUQzMDUgXHVCREYwIFx1QjRGMVx1Qjg1RFxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KFZJRVdfVFlQRV9PVkxfQ0hBVCwgKGxlYWYpID0+IG5ldyBDaGF0VmlldyhsZWFmLCB0aGlzKSk7XG5cbiAgICB0aGlzLmFkZFJpYmJvbkljb24oXCJtZXNzYWdlLWNpcmNsZVwiLCBcIk9WTCBcdUIzMDBcdUQ2NTQgXHVDNUY0XHVBRTMwXCIsICgpID0+IHtcbiAgICAgIHZvaWQgdGhpcy5vcGVuQ2hhdFZpZXcoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICBpZDogXCJvdmwtb3Blbi1jaGF0XCIsXG4gICAgICBuYW1lOiBcIk9WTCBcdUIzMDBcdUQ2NTQgXHVDQzNEIFx1QzVGNFx1QUUzMFwiLFxuICAgICAgY2FsbGJhY2s6ICgpID0+IHtcbiAgICAgICAgdm9pZCB0aGlzLm9wZW5DaGF0VmlldygpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5hZGRDb21tYW5kKHtcbiAgICAgIGlkOiBcIm92bC1zYXZlLWNvbnZlcnNhdGlvblwiLFxuICAgICAgbmFtZTogXCJcdUIzMDBcdUQ2NTQgSlNPTlx1QzVEMFx1QzExQyBcdUI5QzhcdUQwNkNcdUIyRTRcdUM2QjQgXHVDODAwXHVDN0E1XCIsXG4gICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICBuZXcgU2F2ZUNvbnZlcnNhdGlvbk1vZGFsKHRoaXMsIChmb3JtKSA9PiB7XG4gICAgICAgICAgdm9pZCB0aGlzLmhhbmRsZVNhdmVDb252ZXJzYXRpb24oZm9ybSk7XG4gICAgICAgIH0pLm9wZW4oKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICBpZDogXCJvdmwtaW5kZXgtdmF1bHRcIixcbiAgICAgIG5hbWU6IFwiXHVCQ0ZDXHVEMkI4IFx1Qzc3OFx1QjM3MVx1QzJGMSBcdUMyRENcdUM3OTFcIixcbiAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgIHZvaWQgdGhpcy5zdGFydEluZGV4aW5nKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZFNldHRpbmdUYWIobmV3IE92bFNldHRpbmdUYWIodGhpcykpO1xuICB9XG5cbiAgb251bmxvYWQoKTogdm9pZCB7XG4gICAgdGhpcy5hcHAud29ya3NwYWNlLmdldExlYXZlc09mVHlwZShWSUVXX1RZUEVfT1ZMX0NIQVQpLmZvckVhY2goKGxlYWYpID0+IHtcbiAgICAgIGxlYWYuZGV0YWNoKCk7XG4gICAgfSk7XG5cbiAgICAvLyBcdUM3NzhcdUIzNzFcdUMxMUMgXHVDODE1XHVCOUFDXG4gICAgaWYgKHRoaXMuaW5kZXhlcikge1xuICAgICAgdGhpcy5pbmRleGVyLmNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFx1Qzc3OFx1QjM3MVx1QzJGMSBcdUMyRENcdUMyQTRcdUQxNUMgXHVDRDA4XHVBRTMwXHVENjU0XG4gICAqL1xuICBwcml2YXRlIGFzeW5jIGluaXRpYWxpemVJbmRleGluZygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0cnkge1xuICAgICAgaWYgKHRoaXMuaW5kZXhlcikge1xuICAgICAgICB0aGlzLmluZGV4ZXIuY2xvc2UoKTtcbiAgICAgICAgdGhpcy5pbmRleGVyID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgLy8gXHVCMzcwXHVDNzc0XHVEMTMwIFx1QjUxNFx1QjgwOVx1RDFBMFx1QjlBQyBcdUFDQkRcdUI4NUNcbiAgICAgIGNvbnN0IGRhdGFEaXIgPSBqb2luKFxuICAgICAgICAvLyBAdHMtaWdub3JlIC0gT2JzaWRpYW4gQVBJXHVDNzU4IFx1QjBCNFx1QkQ4MCBcdUMxOERcdUMxMzEgXHVDMEFDXHVDNkE5XG4gICAgICAgIHRoaXMuYXBwLnZhdWx0LmFkYXB0ZXIuYmFzZVBhdGgsXG4gICAgICAgIFwiLm9ic2lkaWFuXCIsXG4gICAgICAgIFwicGx1Z2luc1wiLFxuICAgICAgICB0aGlzLm1hbmlmZXN0LmlkXG4gICAgICApO1xuXG4gICAgICBjb25zdCBtZXRhU3RvcmVQYXRoID0gam9pbihkYXRhRGlyLCBcIm1ldGEuanNvblwiKTtcbiAgICAgIGNvbnN0IHZlY3RvclN0b3JlUGF0aCA9IGpvaW4oZGF0YURpciwgXCJ2ZWN0b3JzLmpzb25cIik7XG5cbiAgICAgIC8vIFx1Qzc3OFx1QjM3MVx1QzExQyBcdUMwRERcdUMxMzFcbiAgICAgIHRoaXMuaW5kZXhlciA9IG5ldyBJbmRleGVyKHtcbiAgICAgICAgY2h1bmtTaXplOiB0aGlzLnNldHRpbmdzLmNodW5rU2l6ZSxcbiAgICAgICAgY2h1bmtPdmVybGFwOiB0aGlzLnNldHRpbmdzLmNodW5rT3ZlcmxhcCxcbiAgICAgICAgdG9wSzogdGhpcy5zZXR0aW5ncy50b3BLLFxuICAgICAgICB2ZWN0b3JJbmRleEVuZ2luZTogXCJqc29uXCIsXG4gICAgICAgIGVtYmVkZGluZ1Byb3ZpZGVyOiB0aGlzLnNldHRpbmdzLmVtYmVkZGluZ1Byb3ZpZGVyLFxuICAgICAgICBlbWJlZGRpbmdNb2RlbDogdGhpcy5zZXR0aW5ncy5lbWJlZGRpbmdNb2RlbCxcbiAgICAgICAgZW1iZWRkaW5nQXBpS2V5OiB0aGlzLnNldHRpbmdzLmVtYmVkZGluZ0FwaUtleSB8fCB0aGlzLnNldHRpbmdzLmFwaUtleSxcbiAgICAgICAgZW1iZWRkaW5nQXBpVXJsOiB0aGlzLmdldEVtYmVkZGluZ0FwaVVybCgpLFxuICAgICAgICBtZXRhU3RvcmVQYXRoLFxuICAgICAgICB2ZWN0b3JTdG9yZVBhdGgsXG4gICAgICB9KTtcblxuICAgICAgYXdhaXQgdGhpcy5pbmRleGVyLmluaXRpYWxpemUoKTtcblxuICAgICAgLy8gXHVCQ0ZDXHVEMkI4IFx1QzZDQ1x1Q0M5OCBcdUMxMjRcdUM4MTVcbiAgICAgIHRoaXMudmF1bHRXYXRjaGVyID0gbmV3IFZhdWx0V2F0Y2hlcih0aGlzLmFwcC52YXVsdCk7XG4gICAgICB0aGlzLnZhdWx0V2F0Y2hlci5zZXRJbmRleGVyKHRoaXMuaW5kZXhlcik7XG5cbiAgICAgIGlmICghdGhpcy5pbmRleGluZ0V2ZW50c1JlZ2lzdGVyZWQpIHtcbiAgICAgICAgLy8gXHVEMzBDXHVDNzdDIFx1Qzc3NFx1QkNBNFx1RDJCOCBcdUI5QUNcdUMyQTRcdUIxMDggXHVCNEYxXHVCODVEXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChcbiAgICAgICAgICB0aGlzLmFwcC52YXVsdC5vbihcImNyZWF0ZVwiLCAoZmlsZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGZpbGUgaW5zdGFuY2VvZiBURmlsZSkge1xuICAgICAgICAgICAgICB2b2lkIHRoaXMudmF1bHRXYXRjaGVyPy5vbkZpbGVDcmVhdGUoZmlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXG4gICAgICAgICAgdGhpcy5hcHAudmF1bHQub24oXCJtb2RpZnlcIiwgKGZpbGUpID0+IHtcbiAgICAgICAgICAgIGlmIChmaWxlIGluc3RhbmNlb2YgVEZpbGUpIHtcbiAgICAgICAgICAgICAgdm9pZCB0aGlzLnZhdWx0V2F0Y2hlcj8ub25GaWxlTW9kaWZ5KGZpbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFxuICAgICAgICAgIHRoaXMuYXBwLnZhdWx0Lm9uKFwiZGVsZXRlXCIsIChmaWxlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZmlsZSBpbnN0YW5jZW9mIFRGaWxlKSB7XG4gICAgICAgICAgICAgIHRoaXMudmF1bHRXYXRjaGVyPy5vbkZpbGVEZWxldGUoZmlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXG4gICAgICAgICAgdGhpcy5hcHAudmF1bHQub24oXCJyZW5hbWVcIiwgKGZpbGUsIG9sZFBhdGgpID0+IHtcbiAgICAgICAgICAgIGlmIChmaWxlIGluc3RhbmNlb2YgVEZpbGUpIHtcbiAgICAgICAgICAgICAgdm9pZCB0aGlzLnZhdWx0V2F0Y2hlcj8ub25GaWxlUmVuYW1lKGZpbGUsIG9sZFBhdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuaW5kZXhpbmdFdmVudHNSZWdpc3RlcmVkID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgY29uc29sZS5sb2coXCJcdUM3NzhcdUIzNzFcdUMyRjEgXHVDMkRDXHVDMkE0XHVEMTVDIFx1Q0QwOFx1QUUzMFx1RDY1NCBcdUM2NDRcdUI4Q0NcIik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJcdUM3NzhcdUIzNzFcdUMyRjEgXHVDMkRDXHVDMkE0XHVEMTVDIFx1Q0QwOFx1QUUzMFx1RDY1NCBcdUMyRTRcdUQzMjg6XCIsIGVycm9yKTtcbiAgICAgIG5ldyBOb3RpY2UoXCJcdUM3NzhcdUIzNzFcdUMyRjEgXHVDMkRDXHVDMkE0XHVEMTVDIFx1Q0QwOFx1QUUzMFx1RDY1NFx1QzVEMCBcdUMyRTRcdUQzMjhcdUQ1ODhcdUMyQjVcdUIyQzhcdUIyRTRcIik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFx1QkNGQ1x1RDJCOCBcdUM3NzhcdUIzNzFcdUMyRjEgXHVDMkRDXHVDNzkxXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIHN0YXJ0SW5kZXhpbmcoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCF0aGlzLnNldHRpbmdzLmluZGV4aW5nRW5hYmxlZCkge1xuICAgICAgbmV3IE5vdGljZShcIlx1QkEzQ1x1QzgwMCBcdUMxMjRcdUM4MTVcdUM1RDBcdUMxMUMgXHVDNzc4XHVCMzcxXHVDMkYxXHVDNzQ0IFx1RDY1Q1x1QzEzMVx1RDY1NFx1RDU3NCBcdUM4RkNcdUMxMzhcdUM2OTRcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmluZGV4ZXIpIHtcbiAgICAgIGF3YWl0IHRoaXMuaW5pdGlhbGl6ZUluZGV4aW5nKCk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnZhdWx0V2F0Y2hlcikge1xuICAgICAgbmV3IE5vdGljZShcIlx1Qzc3OFx1QjM3MVx1QzJGMSBcdUMyRENcdUMyQTRcdUQxNUNcdUM3NzQgXHVDRDA4XHVBRTMwXHVENjU0XHVCNDE4XHVDOUMwIFx1QzU0QVx1QzU1OFx1QzJCNVx1QjJDOFx1QjJFNFwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgYXdhaXQgdGhpcy52YXVsdFdhdGNoZXIuaW5kZXhWYXVsdCgpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiXHVCQ0ZDXHVEMkI4IFx1Qzc3OFx1QjM3MVx1QzJGMSBcdUMyRTRcdUQzMjg6XCIsIGVycm9yKTtcbiAgICAgIG5ldyBOb3RpY2UoXCJcdUJDRkNcdUQyQjggXHVDNzc4XHVCMzcxXHVDMkYxXHVDNUQwIFx1QzJFNFx1RDMyOFx1RDU4OFx1QzJCNVx1QjJDOFx1QjJFNFwiKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogXHVCQ0ExXHVEMTMwIFx1QUM4MFx1QzBDOSBcdUMyMThcdUQ1ODlcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzZWFyY2gocXVlcnk6IHN0cmluZyk6IFByb21pc2U8QXJyYXk8eyBjaHVuazogYW55OyBub3RlOiBhbnk7IHNjb3JlOiBudW1iZXIgfT4+IHtcbiAgICBpZiAoIXRoaXMuaW5kZXhlcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXHVDNzc4XHVCMzcxXHVDMkYxXHVDNzc0IFx1RDY1Q1x1QzEzMVx1RDY1NFx1QjQxOFx1QzlDMCBcdUM1NEFcdUM1NThcdUMyQjVcdUIyQzhcdUIyRTRcIik7XG4gICAgfVxuXG4gICAgY29uc3Qgc2VhcmNoUmVzdWx0cyA9IGF3YWl0IHRoaXMuaW5kZXhlci5zZWFyY2gocXVlcnkpO1xuICAgIHJldHVybiB0aGlzLmluZGV4ZXIuZ2V0U2VhcmNoUmVzdWx0c1dpdGhNZXRhZGF0YShzZWFyY2hSZXN1bHRzKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgb3BlbkNoYXRWaWV3KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGV4aXN0aW5nTGVhZiA9IHRoaXMuYXBwLndvcmtzcGFjZS5nZXRMZWF2ZXNPZlR5cGUoVklFV19UWVBFX09WTF9DSEFUKVswXTtcbiAgICBjb25zdCBsZWFmID0gZXhpc3RpbmdMZWFmID8/IHRoaXMuYXBwLndvcmtzcGFjZS5nZXRSaWdodExlYWYoZmFsc2UpO1xuICAgIGlmICghbGVhZikge1xuICAgICAgbmV3IE5vdGljZShcIlx1QjMwMFx1RDY1NCBcdUNDM0RcdUM3NDQgXHVDNUY0IFx1QzIxOCBcdUM1QzZcdUMyQjVcdUIyQzhcdUIyRTQuXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGF3YWl0IGxlYWYuc2V0Vmlld1N0YXRlKHsgdHlwZTogVklFV19UWVBFX09WTF9DSEFULCBhY3RpdmU6IHRydWUgfSk7XG4gICAgdGhpcy5hcHAud29ya3NwYWNlLnJldmVhbExlYWYobGVhZik7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcmVxdWVzdEFzc2lzdGFudFJlcGx5KHR1cm5zOiBDb252ZXJzYXRpb25UdXJuW10pOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGlmICghdGhpcy5hcGlDbGllbnQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkFQSSBcdUQwNzRcdUI3N0NcdUM3NzRcdUM1QjhcdUQyQjhcdUI5N0MgXHVDRDA4XHVBRTMwXHVENjU0XHVENTYwIFx1QzIxOCBcdUM1QzZcdUMyQjVcdUIyQzhcdUIyRTQuXCIpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5hcGlDbGllbnQucmVxdWVzdEFzc2lzdGFudFJlcGx5KHR1cm5zKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyByZXF1ZXN0VGl0bGVSZXBseShwcm9tcHQ6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgaWYgKCF0aGlzLmFwaUNsaWVudCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQVBJIFx1RDA3NFx1Qjc3Q1x1Qzc3NFx1QzVCOFx1RDJCOFx1Qjk3QyBcdUNEMDhcdUFFMzBcdUQ2NTRcdUQ1NjAgXHVDMjE4IFx1QzVDNlx1QzJCNVx1QjJDOFx1QjJFNC5cIik7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmFwaUNsaWVudC5yZXF1ZXN0VGl0bGVSZXBseShwcm9tcHQpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHNhdmVDb252ZXJzYXRpb25Gcm9tVHVybnMoXG4gICAgc2Vzc2lvbklkOiBzdHJpbmcsXG4gICAgdHVybnM6IENvbnZlcnNhdGlvblR1cm5bXSxcbiAgICBvdXRwdXRGb2xkZXI6IHN0cmluZ1xuICApOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiBzYXZlQ29udmVyc2F0aW9uRnJvbVR1cm5zKHRoaXMuYXBwLnZhdWx0LCBzZXNzaW9uSWQsIHR1cm5zLCBvdXRwdXRGb2xkZXIpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBsb2FkU2V0dGluZ3MoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5zZXR0aW5ncyA9IHsgLi4uREVGQVVMVF9TRVRUSU5HUywgLi4uKGF3YWl0IHRoaXMubG9hZERhdGEoKSkgfTtcblxuICAgIGxldCBjaGFuZ2VkID0gZmFsc2U7XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuZW1iZWRkaW5nUHJvdmlkZXIgPT09IFwibG9jYWxcIikge1xuICAgICAgdGhpcy5zZXR0aW5ncy5lbWJlZGRpbmdQcm92aWRlciA9IFwiZ2VtaW5pXCI7XG4gICAgICB0aGlzLnNldHRpbmdzLmVtYmVkZGluZ01vZGVsID0gRU1CRURESU5HX1BSRVNFVFMuZ2VtaW5pLm1vZGVsO1xuICAgICAgdGhpcy5zZXR0aW5ncy5lbWJlZGRpbmdBcGlVcmwgPSBFTUJFRERJTkdfUFJFU0VUUy5nZW1pbmkuYXBpVXJsIHx8IFwiXCI7XG4gICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgYXdhaXQgdGhpcy5zYXZlU2V0dGluZ3MoKTtcbiAgICB9XG5cbiAgICB0aGlzLmxhc3RTYXZlZFNldHRpbmdzID0geyAuLi50aGlzLnNldHRpbmdzIH07XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2F2ZVNldHRpbmdzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHByZXZpb3VzU2V0dGluZ3MgPSB7IC4uLnRoaXMubGFzdFNhdmVkU2V0dGluZ3MgfTtcbiAgICBhd2FpdCB0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xuICAgIHRoaXMubGFzdFNhdmVkU2V0dGluZ3MgPSB7IC4uLnRoaXMuc2V0dGluZ3MgfTtcblxuICAgIGlmIChwcmV2aW91c1NldHRpbmdzLmluZGV4aW5nRW5hYmxlZCAhPT0gdGhpcy5zZXR0aW5ncy5pbmRleGluZ0VuYWJsZWQpIHtcbiAgICAgIGlmICghdGhpcy5zZXR0aW5ncy5pbmRleGluZ0VuYWJsZWQpIHtcbiAgICAgICAgdGhpcy5pbmRleGVyPy5jbG9zZSgpO1xuICAgICAgICB0aGlzLmluZGV4ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLnZhdWx0V2F0Y2hlcj8uc2V0SW5kZXhlcihudWxsKTtcbiAgICAgICAgdGhpcy52YXVsdFdhdGNoZXIgPSBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXdhaXQgdGhpcy5pbml0aWFsaXplSW5kZXhpbmcoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuc2V0dGluZ3MuaW5kZXhpbmdFbmFibGVkIHx8ICF0aGlzLmluZGV4ZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zaG91bGRSZWluaXRpYWxpemVJbmRleGluZyhwcmV2aW91c1NldHRpbmdzLCB0aGlzLnNldHRpbmdzKSkge1xuICAgICAgYXdhaXQgdGhpcy5pbml0aWFsaXplSW5kZXhpbmcoKTtcbiAgICAgIG5ldyBOb3RpY2UoXCJcdUM3ODRcdUJDQTBcdUI1MjkgXHVDMTI0XHVDODE1XHVDNzc0IFx1QkNDMFx1QUNCRFx1QjQxOFx1QzVCNCBcdUM3QUNcdUM3NzhcdUIzNzFcdUMyRjFcdUM3NzQgXHVENTQ0XHVDNjk0XHVENTY5XHVCMkM4XHVCMkU0LiBcdUMxMjRcdUM4MTVcdUM1RDBcdUMxMUMgXHVDODA0XHVDQ0I0IFx1Qzc4NFx1QkNBMFx1QjUyOVx1Qzc0NCBcdUMyRTRcdUQ1ODlcdUQ1NzQgXHVDOEZDXHVDMTM4XHVDNjk0LlwiKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGhhbmRsZVNhdmVDb252ZXJzYXRpb24oZm9ybTogU2F2ZUNvbnZlcnNhdGlvbkZvcm0pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFmb3JtLmlucHV0UGF0aCkge1xuICAgICAgICBuZXcgTm90aWNlKFwiSlNPTiBcdUQzMENcdUM3N0MgXHVBQ0JEXHVCODVDXHVCOTdDIFx1Qzc4NVx1QjgyNVx1RDU3NCBcdUM4RkNcdUMxMzhcdUM2OTQuXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoIWZvcm0uc2Vzc2lvbklkKSB7XG4gICAgICAgIG5ldyBOb3RpY2UoXCJcdUMxMzhcdUMxNTggSURcdUI5N0MgXHVDNzg1XHVCODI1XHVENTc0IFx1QzhGQ1x1QzEzOFx1QzY5NC5cIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QganNvblBhdGggPSBub3JtYWxpemVQYXRoKGZvcm0uaW5wdXRQYXRoKS5yZXBsYWNlKC9eXFwvKy8sIFwiXCIpO1xuICAgICAgY29uc3QganNvbkV4aXN0cyA9IGF3YWl0IHRoaXMuYXBwLnZhdWx0LmFkYXB0ZXIuZXhpc3RzKGpzb25QYXRoKTtcbiAgICAgIGlmICghanNvbkV4aXN0cykge1xuICAgICAgICBuZXcgTm90aWNlKFwiSlNPTiBcdUQzMENcdUM3N0NcdUM3NDQgXHVDQzNFXHVDNzQ0IFx1QzIxOCBcdUM1QzZcdUMyQjVcdUIyQzhcdUIyRTQuXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBqc29uQ29udGVudCA9IGF3YWl0IHRoaXMuYXBwLnZhdWx0LmFkYXB0ZXIucmVhZChqc29uUGF0aCk7XG4gICAgICBjb25zdCB0dXJucyA9IHBhcnNlVHVybnMoanNvbkNvbnRlbnQpO1xuXG4gICAgICBjb25zdCBvdXRwdXRGb2xkZXIgPSBmb3JtLm91dHB1dEZvbGRlclxuICAgICAgICA/IG5vcm1hbGl6ZVBhdGgoZm9ybS5vdXRwdXRGb2xkZXIpLnJlcGxhY2UoL15cXC8rLywgXCJcIilcbiAgICAgICAgOiBcIlwiO1xuICAgICAgY29uc3QgdGFyZ2V0UGF0aCA9IGF3YWl0IHNhdmVDb252ZXJzYXRpb25Gcm9tVHVybnMoXG4gICAgICAgIHRoaXMuYXBwLnZhdWx0LFxuICAgICAgICBmb3JtLnNlc3Npb25JZCxcbiAgICAgICAgdHVybnMsXG4gICAgICAgIG91dHB1dEZvbGRlclxuICAgICAgKTtcbiAgICAgIG5ldyBOb3RpY2UoYFx1QjMwMFx1RDY1NCBcdUM4MDBcdUM3QTUgXHVDNjQ0XHVCOENDOiAke3RhcmdldFBhdGh9YCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcik7XG4gICAgICBuZXcgTm90aWNlKGBcdUM4MDBcdUM3QTUgXHVDMkU0XHVEMzI4OiAke21lc3NhZ2V9YCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFx1QzgwNFx1Q0NCNCBcdUJDRkNcdUQyQjhcdUI5N0MgXHVDNzg0XHVCQ0EwXHVCNTI5XHVENTY5XHVCMkM4XHVCMkU0IChcdUMyQTRcdUNFOTQgXHVENkM0IFx1QzdBQ1x1Qzc3OFx1QjM3MVx1QzJGMSlcbiAgICovXG4gIHB1YmxpYyBhc3luYyBpbmRleFZhdWx0QWxsKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICghdGhpcy5zZXR0aW5ncy5pbmRleGluZ0VuYWJsZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlx1Qzc3OFx1QjM3MVx1QzJGMVx1Qzc3NCBcdUQ2NUNcdUMxMzFcdUQ2NTRcdUI0MThcdUM5QzAgXHVDNTRBXHVDNTU4XHVDMkI1XHVCMkM4XHVCMkU0XCIpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5pbmRleGVyKSB7XG4gICAgICBhd2FpdCB0aGlzLmluaXRpYWxpemVJbmRleGluZygpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy52YXVsdFdhdGNoZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlx1Qzc3OFx1QjM3MVx1QzJGMSBcdUMyRENcdUMyQTRcdUQxNUNcdUM3NzQgXHVDRDA4XHVBRTMwXHVENjU0XHVCNDE4XHVDOUMwIFx1QzU0QVx1QzU1OFx1QzJCNVx1QjJDOFx1QjJFNFwiKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc29sZS5sb2coXCJcdUM4MDRcdUNDQjQgXHVCQ0ZDXHVEMkI4IFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUMyRENcdUM3OTEuLi5cIik7XG4gICAgICBhd2FpdCB0aGlzLnZhdWx0V2F0Y2hlci5pbmRleFZhdWx0KCk7XG4gICAgICBjb25zb2xlLmxvZyhcIlx1QzgwNFx1Q0NCNCBcdUJDRkNcdUQyQjggXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzY0NFx1QjhDQ1wiKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIlx1QzgwNFx1Q0NCNCBcdUM3ODRcdUJDQTBcdUI1MjkgXHVDMkU0XHVEMzI4OlwiLCBlcnJvcik7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogXHVDMkUwXHVBRERDIFx1QjE3OFx1RDJCOFx1QjlDQyBcdUM3ODRcdUJDQTBcdUI1MjlcdUQ1NjlcdUIyQzhcdUIyRTQgKFx1Qzk5RFx1QkQ4NCBcdUM3NzhcdUIzNzFcdUMyRjEpXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgaW5kZXhOZXdGaWxlc09ubHkoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCF0aGlzLnNldHRpbmdzLmluZGV4aW5nRW5hYmxlZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXHVDNzc4XHVCMzcxXHVDMkYxXHVDNzc0IFx1RDY1Q1x1QzEzMVx1RDY1NFx1QjQxOFx1QzlDMCBcdUM1NEFcdUM1NThcdUMyQjVcdUIyQzhcdUIyRTRcIik7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmluZGV4ZXIpIHtcbiAgICAgIGF3YWl0IHRoaXMuaW5pdGlhbGl6ZUluZGV4aW5nKCk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnZhdWx0V2F0Y2hlcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXHVDNzc4XHVCMzcxXHVDMkYxIFx1QzJEQ1x1QzJBNFx1RDE1Q1x1Qzc3NCBcdUNEMDhcdUFFMzBcdUQ2NTRcdUI0MThcdUM5QzAgXHVDNTRBXHVDNTU4XHVDMkI1XHVCMkM4XHVCMkU0XCIpO1xuICAgIH1cblxuICAgIGNvbnN0IGluZGV4ZXIgPSB0aGlzLmluZGV4ZXI7XG4gICAgaWYgKCFpbmRleGVyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJcdUM3NzhcdUIzNzFcdUMyRjEgXHVDMkRDXHVDMkE0XHVEMTVDXHVDNzc0IFx1Q0QwOFx1QUUzMFx1RDY1NFx1QjQxOFx1QzlDMCBcdUM1NEFcdUM1NThcdUMyQjVcdUIyQzhcdUIyRTRcIik7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiXHVDMkUwXHVBRERDIFx1RDMwQ1x1Qzc3QyBcdUM3ODRcdUJDQTBcdUI1MjkgXHVDMkRDXHVDNzkxLi4uXCIpO1xuICAgICAgXG4gICAgICAvLyBcdUJDRkNcdUQyQjhcdUM3NTggXHVCQUE4XHVCNEUwIFx1QjlDOFx1RDA2Q1x1QjJFNFx1QzZCNCBcdUQzMENcdUM3N0MgXHVBQzAwXHVDODM4XHVDNjI0XHVBRTMwXG4gICAgICBjb25zdCBhbGxGaWxlcyA9IHRoaXMuYXBwLnZhdWx0LmdldE1hcmtkb3duRmlsZXMoKTtcbiAgICAgIGxldCBpbmRleGVkID0gMDtcblxuICAgICAgZm9yIChjb25zdCBmaWxlIG9mIGFsbEZpbGVzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IHRoaXMuYXBwLnZhdWx0LmNhY2hlZFJlYWQoZmlsZSk7XG4gICAgICAgICAgLy8gXHVBQzAxIFx1RDMwQ1x1Qzc3Q1x1Qzc0NCBcdUM3NzhcdUIzNzFcdUMyRjEgKFx1Qzc3NFx1QkJGOCBcdUM3NzhcdUIzNzFcdUMyRjFcdUI0MUMgXHVEMzBDXHVDNzdDXHVDNzQwIGluZGV4ZXJcdUM1RDBcdUMxMUMgXHVENjU1XHVDNzc4KVxuICAgICAgICAgIGF3YWl0IGluZGV4ZXIuaW5kZXhGaWxlKGZpbGUucGF0aCwgY29udGVudCk7XG4gICAgICAgICAgaW5kZXhlZCsrO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUud2FybihgXHVEMzBDXHVDNzdDIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUMyRTRcdUQzMjg6ICR7ZmlsZS5wYXRofWAsIGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zb2xlLmxvZyhgXHVDMkUwXHVBRERDIFx1RDMwQ1x1Qzc3QyBcdUM3ODRcdUJDQTBcdUI1MjkgXHVDNjQ0XHVCOENDOiAke2luZGV4ZWR9XHVBQzFDIFx1RDMwQ1x1Qzc3QyBcdUNDOThcdUI5QUNgKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIlx1QzJFMFx1QUREQyBcdUM3ODRcdUJDQTBcdUI1MjkgXHVDMkU0XHVEMzI4OlwiLCBlcnJvcik7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogXHVDNzg0XHVCQ0EwXHVCNTI5IEFQSSBVUkwgXHVBQzAwXHVDODM4XHVDNjI0XHVBRTMwXG4gICAqL1xuICBwcml2YXRlIGdldEVtYmVkZGluZ0FwaVVybCgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIGlmICh0aGlzLnNldHRpbmdzLmVtYmVkZGluZ0FwaVVybD8udHJpbSgpKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5lbWJlZGRpbmdBcGlVcmwudHJpbSgpO1xuICAgIH1cblxuICAgIGNvbnN0IHByZXNldCA9IEVNQkVERElOR19QUkVTRVRTW3RoaXMuc2V0dGluZ3MuZW1iZWRkaW5nUHJvdmlkZXJdO1xuICAgIHJldHVybiBwcmVzZXQ/LmFwaVVybDtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUM3NzhcdUIzNzFcdUMxMUMgXHVDN0FDXHVDRDA4XHVBRTMwXHVENjU0XHVBQzAwIFx1RDU0NFx1QzY5NFx1RDU1QyBcdUMxMjRcdUM4MTUgXHVCQ0MwXHVBQ0JEXHVDNzc4XHVDOUMwIFx1RDY1NVx1Qzc3OFxuICAgKi9cbiAgcHJpdmF0ZSBzaG91bGRSZWluaXRpYWxpemVJbmRleGluZyhwcmV2aW91czogT3ZsU2V0dGluZ3MsIGN1cnJlbnQ6IE92bFNldHRpbmdzKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHByZXZpb3VzLmVtYmVkZGluZ1Byb3ZpZGVyICE9PSBjdXJyZW50LmVtYmVkZGluZ1Byb3ZpZGVyIHx8XG4gICAgICBwcmV2aW91cy5lbWJlZGRpbmdNb2RlbCAhPT0gY3VycmVudC5lbWJlZGRpbmdNb2RlbCB8fFxuICAgICAgcHJldmlvdXMuZW1iZWRkaW5nQXBpVXJsICE9PSBjdXJyZW50LmVtYmVkZGluZ0FwaVVybFxuICAgICk7XG4gIH1cbn1cbiIsICJpbXBvcnQgdHlwZSB7IFZhdWx0IH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyBub3JtYWxpemVQYXRoIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvbiwgQ29udmVyc2F0aW9uVHVybiB9IGZyb20gXCIuL2NvbnZlcnNhdGlvblwiO1xuaW1wb3J0IHsgY29udmVydFRvTWFya2Rvd24gfSBmcm9tIFwiLi9jb252ZXJzYXRpb25cIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNhdmVDb252ZXJzYXRpb25Gcm9tVHVybnMoXG4gIHZhdWx0OiBWYXVsdCxcbiAgc2Vzc2lvbklkOiBzdHJpbmcsXG4gIHR1cm5zOiBDb252ZXJzYXRpb25UdXJuW10sXG4gIG91dHB1dEZvbGRlcjogc3RyaW5nXG4pOiBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCBjb252ZXJzYXRpb246IENvbnZlcnNhdGlvbiA9IHtcbiAgICBzZXNzaW9uSWQsXG4gICAgdHVybnMsXG4gICAgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpXG4gIH07XG5cbiAgY29uc3QgbWFya2Rvd24gPSBjb252ZXJ0VG9NYXJrZG93bihjb252ZXJzYXRpb24pO1xuICBjb25zdCBmaWxlbmFtZSA9IGJ1aWxkRmlsZU5hbWUoY29udmVyc2F0aW9uKTtcbiAgY29uc3QgY2xlYW5lZEZvbGRlciA9IG91dHB1dEZvbGRlciA/IG5vcm1hbGl6ZVBhdGgob3V0cHV0Rm9sZGVyKS5yZXBsYWNlKC9eXFwvKy8sIFwiXCIpIDogXCJcIjtcbiAgY29uc3QgdGFyZ2V0UGF0aCA9IGF3YWl0IGVuc3VyZVVuaXF1ZVBhdGgoXG4gICAgdmF1bHQsXG4gICAgbm9ybWFsaXplUGF0aChjbGVhbmVkRm9sZGVyID8gYCR7Y2xlYW5lZEZvbGRlcn0vJHtmaWxlbmFtZX1gIDogZmlsZW5hbWUpXG4gICk7XG5cbiAgaWYgKGNsZWFuZWRGb2xkZXIpIHtcbiAgICBhd2FpdCBlbnN1cmVGb2xkZXJFeGlzdHModmF1bHQsIGNsZWFuZWRGb2xkZXIpO1xuICB9XG5cbiAgYXdhaXQgdmF1bHQuY3JlYXRlKHRhcmdldFBhdGgsIG1hcmtkb3duKTtcbiAgcmV0dXJuIHRhcmdldFBhdGg7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkRmlsZU5hbWUoY29udmVyc2F0aW9uOiBDb252ZXJzYXRpb24pOiBzdHJpbmcge1xuICBjb25zdCBzYWZlVGl0bGUgPSBzYW5pdGl6ZUZpbGVTZWdtZW50KGNvbnZlcnNhdGlvbi5zZXNzaW9uSWQpO1xuICByZXR1cm4gYCR7c2FmZVRpdGxlfS5tZGA7XG59XG5cbmZ1bmN0aW9uIHNhbml0aXplRmlsZVNlZ21lbnQodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IHRyaW1tZWQgPSB2YWx1ZS50cmltKCk7XG4gIGlmICghdHJpbW1lZCkge1xuICAgIHJldHVybiBcInVudGl0bGVkXCI7XG4gIH1cblxuICBjb25zdCBjbGVhbmVkID0gdHJpbW1lZFxuICAgIC5yZXBsYWNlKC9bXFxcXC86Kj9cIjw+fF0vZywgXCIgXCIpXG4gICAgLnJlcGxhY2UoL1xccysvZywgXCIgXCIpXG4gICAgLnRyaW0oKTtcblxuICByZXR1cm4gY2xlYW5lZCB8fCBcInVudGl0bGVkXCI7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGVuc3VyZUZvbGRlckV4aXN0cyh2YXVsdDogVmF1bHQsIGZvbGRlcjogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGV4aXN0cyA9IGF3YWl0IHZhdWx0LmFkYXB0ZXIuZXhpc3RzKGZvbGRlcik7XG4gIGlmICghZXhpc3RzKSB7XG4gICAgYXdhaXQgdmF1bHQuY3JlYXRlRm9sZGVyKGZvbGRlcik7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZW5zdXJlVW5pcXVlUGF0aCh2YXVsdDogVmF1bHQsIHBhdGg6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVQYXRoKHBhdGgpO1xuICBjb25zdCBleHRlbnNpb25JbmRleCA9IG5vcm1hbGl6ZWQubGFzdEluZGV4T2YoXCIubWRcIik7XG4gIGNvbnN0IGJhc2UgPSBleHRlbnNpb25JbmRleCA9PT0gLTEgPyBub3JtYWxpemVkIDogbm9ybWFsaXplZC5zbGljZSgwLCBleHRlbnNpb25JbmRleCk7XG4gIGNvbnN0IGV4dGVuc2lvbiA9IGV4dGVuc2lvbkluZGV4ID09PSAtMSA/IFwiXCIgOiBcIi5tZFwiO1xuXG4gIGxldCBjYW5kaWRhdGUgPSBub3JtYWxpemVkO1xuICBsZXQgY291bnQgPSAxO1xuXG4gIHdoaWxlIChhd2FpdCB2YXVsdC5hZGFwdGVyLmV4aXN0cyhjYW5kaWRhdGUpKSB7XG4gICAgY2FuZGlkYXRlID0gYCR7YmFzZX0tJHtjb3VudH0ke2V4dGVuc2lvbn1gO1xuICAgIGNvdW50ICs9IDE7XG4gIH1cblxuICByZXR1cm4gY2FuZGlkYXRlO1xufVxuIiwgImltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG4vLyBcdUIzMDBcdUQ2NTRcdUM3NTggXHVBQzAxIFx1RDEzNFx1Qzc0NCBcdUIwOThcdUQwQzBcdUIwQjRcdUIyOTQgXHVEMEMwXHVDNzg1XG5leHBvcnQgdHlwZSBDb252ZXJzYXRpb25UdXJuID0ge1xuICByb2xlOiBcInVzZXJcIiB8IFwiYXNzaXN0YW50XCIgfCBcInN5c3RlbVwiO1xuICBjb250ZW50OiBzdHJpbmc7XG4gIHRpbWVzdGFtcD86IERhdGUgfCBzdHJpbmc7XG59O1xuXG4vLyBcdUIzMDBcdUQ2NTQgXHVDODA0XHVDQ0I0XHVCOTdDIFx1QjA5OFx1RDBDMFx1QjBCNFx1QjI5NCBcdUQwQzBcdUM3ODVcbmV4cG9ydCB0eXBlIENvbnZlcnNhdGlvbiA9IHtcbiAgc2Vzc2lvbklkOiBzdHJpbmc7XG4gIHR1cm5zOiBDb252ZXJzYXRpb25UdXJuW107XG4gIGNyZWF0ZWRBdDogRGF0ZTtcbn07XG5cbi8vIFx1QjMwMFx1RDY1NFx1Qjk3QyBcdUI5QzhcdUQwNkNcdUIyRTRcdUM2QjQgXHVENjE1XHVDMkREXHVDNzNDXHVCODVDIFx1QkNDMFx1RDY1OFxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRUb01hcmtkb3duKGNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uKTogc3RyaW5nIHtcbiAgY29uc3QgbGluZXM6IHN0cmluZ1tdID0gW107XG4gIFxuICAvLyBcdUQ1RTRcdUIzNTQ6IFx1QzgxQ1x1QkFBOVx1QUNGQyBcdUJBNTRcdUQwQzBcdUIzNzBcdUM3NzRcdUQxMzBcbiAgbGluZXMucHVzaChgIyBcdUIzMDBcdUQ2NTQgXHVBRTMwXHVCODVEIC0gJHtjb252ZXJzYXRpb24uc2Vzc2lvbklkfWApO1xuICBsaW5lcy5wdXNoKFwiXCIpO1xuICBsaW5lcy5wdXNoKGBcdUMwRERcdUMxMzFcdUM3N0M6ICR7Y29udmVyc2F0aW9uLmNyZWF0ZWRBdC50b0lTT1N0cmluZygpfWApO1xuICBsaW5lcy5wdXNoKFwiXCIpO1xuICBsaW5lcy5wdXNoKFwiLS0tXCIpO1xuICBsaW5lcy5wdXNoKFwiXCIpO1xuICBcbiAgLy8gXHVBQzAxIFx1RDEzNFx1Qzc0NCBcdUI5QzhcdUQwNkNcdUIyRTRcdUM2QjRcdUM3M0NcdUI4NUMgXHVCQ0MwXHVENjU4XG4gIGZvciAoY29uc3QgdHVybiBvZiBjb252ZXJzYXRpb24udHVybnMpIHtcbiAgICBjb25zdCByb2xlTGFiZWwgPSB0dXJuLnJvbGUgPT09IFwidXNlclwiID8gXCJcdUQ4M0RcdURDNjQgXHVDMEFDXHVDNkE5XHVDNzkwXCIgOiBcbiAgICAgICAgICAgICAgICAgICAgIHR1cm4ucm9sZSA9PT0gXCJhc3Npc3RhbnRcIiA/IFwiXHVEODNFXHVERDE2IFx1QzVCNFx1QzJEQ1x1QzJBNFx1RDEzNFx1RDJCOFwiIDogXG4gICAgICAgICAgICAgICAgICAgICBcIlx1MjY5OVx1RkUwRiBcdUMyRENcdUMyQTRcdUQxNUNcIjtcbiAgICBcbiAgICBsaW5lcy5wdXNoKGAjIyAke3JvbGVMYWJlbH1gKTtcbiAgICBcbiAgICBpZiAodHVybi50aW1lc3RhbXApIHtcbiAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IHR5cGVvZiB0dXJuLnRpbWVzdGFtcCA9PT0gXCJzdHJpbmdcIiBcbiAgICAgICAgPyB0dXJuLnRpbWVzdGFtcCBcbiAgICAgICAgOiB0dXJuLnRpbWVzdGFtcC50b0lTT1N0cmluZygpO1xuICAgICAgbGluZXMucHVzaChgKiR7dGltZXN0YW1wfSpgKTtcbiAgICAgIGxpbmVzLnB1c2goXCJcIik7XG4gICAgfVxuICAgIFxuICAgIGxpbmVzLnB1c2godHVybi5jb250ZW50KTtcbiAgICBsaW5lcy5wdXNoKFwiXCIpO1xuICB9XG4gIFxuICByZXR1cm4gbGluZXMuam9pbihcIlxcblwiKTtcbn1cblxuLy8gXHVCMzAwXHVENjU0XHVCOTdDIFx1RDMwQ1x1Qzc3Q1x1Qjg1QyBcdUM4MDBcdUM3QTVcbmV4cG9ydCBmdW5jdGlvbiBzYXZlQ29udmVyc2F0aW9uKFxuICBjb252ZXJzYXRpb246IENvbnZlcnNhdGlvbixcbiAgdGFyZ2V0RGlyOiBzdHJpbmdcbik6IHN0cmluZyB7XG4gIGlmICghZnMuZXhpc3RzU3luYyh0YXJnZXREaXIpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBcdUIzMDBcdUMwQzEgXHVCNTE0XHVCODA5XHVEMUEwXHVCOUFDXHVBQzAwIFx1Qzg3NFx1QzdBQ1x1RDU1OFx1QzlDMCBcdUM1NEFcdUMyQjVcdUIyQzhcdUIyRTQ6ICR7dGFyZ2V0RGlyfWApO1xuICB9XG4gIFxuICBjb25zdCBtYXJrZG93biA9IGNvbnZlcnRUb01hcmtkb3duKGNvbnZlcnNhdGlvbik7XG4gIFxuICAvLyBcdUQzMENcdUM3N0NcdUJBODUgXHVDMEREXHVDMTMxOiBZWVlZLU1NLURELXNlc3Npb25JZC5tZFxuICBjb25zdCBkYXRlID0gY29udmVyc2F0aW9uLmNyZWF0ZWRBdC50b0lTT1N0cmluZygpLnNwbGl0KFwiVFwiKVswXTtcbiAgY29uc3QgZmlsZW5hbWUgPSBgJHtkYXRlfS0ke2NvbnZlcnNhdGlvbi5zZXNzaW9uSWR9Lm1kYDtcbiAgY29uc3QgZmlsZXBhdGggPSBwYXRoLmpvaW4odGFyZ2V0RGlyLCBmaWxlbmFtZSk7XG4gIFxuICBmcy53cml0ZUZpbGVTeW5jKGZpbGVwYXRoLCBtYXJrZG93biwgXCJ1dGYtOFwiKTtcbiAgXG4gIHJldHVybiBmaWxlcGF0aDtcbn1cbiIsICJpbXBvcnQgeyByZXF1ZXN0VXJsIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvblR1cm4gfSBmcm9tIFwiLi9jb252ZXJzYXRpb25cIjtcbmltcG9ydCB0eXBlIHsgT3ZsU2V0dGluZ3MgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgUFJPVklERVJfUFJFU0VUUyB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbnR5cGUgTG9nV3JpdGVyID0gKGNvbnRleHQ6IHN0cmluZywgZGV0YWlsOiB1bmtub3duKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG50eXBlIFNldHRpbmdzR2V0dGVyID0gKCkgPT4gT3ZsU2V0dGluZ3M7XG5cbmV4cG9ydCBjbGFzcyBPdmxBcGlDbGllbnQge1xuICBwcml2YXRlIHJlYWRvbmx5IGdldFNldHRpbmdzOiBTZXR0aW5nc0dldHRlcjtcbiAgcHJpdmF0ZSByZWFkb25seSBsb2dXcml0ZXI6IExvZ1dyaXRlcjtcblxuICBjb25zdHJ1Y3RvcihnZXRTZXR0aW5nczogU2V0dGluZ3NHZXR0ZXIsIGxvZ1dyaXRlcj86IExvZ1dyaXRlcikge1xuICAgIHRoaXMuZ2V0U2V0dGluZ3MgPSBnZXRTZXR0aW5ncztcbiAgICAvLyBcdUI4NUNcdUFERjggXHVBRTMwXHVCODVEXHVBRTMwXHVCOTdDIFx1QzhGQ1x1Qzc4NVx1QkMxQlx1QzlDMCBcdUJBQkJcdUQ1NUMgXHVBQ0JEXHVDNkIwXHVDNUQwXHVCM0M0IFx1QzU0OFx1QzgwNFx1RDU1OFx1QUM4QyBcdUIzRDlcdUM3OTFcdUQ1NThcdUIzQzRcdUI4NUQgXHVDQzk4XHVCOUFDXHVENTY5XHVCMkM4XHVCMkU0LlxuICAgIHRoaXMubG9nV3JpdGVyID0gbG9nV3JpdGVyID8/IChhc3luYyAoKSA9PiB7fSk7XG4gIH1cblxuICBhc3luYyByZXF1ZXN0QXNzaXN0YW50UmVwbHkodHVybnM6IENvbnZlcnNhdGlvblR1cm5bXSk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3Qgc2V0dGluZ3MgPSB0aGlzLmdldFNldHRpbmdzKCk7XG5cbiAgICBpZiAoc2V0dGluZ3MucHJvdmlkZXIgPT09IFwiZ2VtaW5pXCIpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RHZW1pbmlSZXBseShzZXR0aW5ncywgdHVybnMpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnJlcXVlc3RPcGVuQWlDb21wYXRpYmxlUmVwbHkoc2V0dGluZ3MsIHR1cm5zKTtcbiAgfVxuXG4gIGFzeW5jIHJlcXVlc3RUaXRsZVJlcGx5KHByb21wdDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBzZXR0aW5ncyA9IHRoaXMuZ2V0U2V0dGluZ3MoKTtcbiAgICBjb25zdCB0aXRsZU1vZGVsID0gc2V0dGluZ3MudGl0bGVNb2RlbC50cmltKCk7XG4gICAgY29uc3QgbW9kZWxOYW1lID0gdGl0bGVNb2RlbCB8fCBzZXR0aW5ncy5tb2RlbC50cmltKCk7XG4gICAgY29uc3QgdHVybnM6IENvbnZlcnNhdGlvblR1cm5bXSA9IFtcbiAgICAgIHtcbiAgICAgICAgcm9sZTogXCJ1c2VyXCIsXG4gICAgICAgIGNvbnRlbnQ6IHByb21wdCxcbiAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKClcbiAgICAgIH1cbiAgICBdO1xuXG4gICAgaWYgKHNldHRpbmdzLnByb3ZpZGVyID09PSBcImdlbWluaVwiKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0R2VtaW5pUmVwbHkoc2V0dGluZ3MsIHR1cm5zLCB7XG4gICAgICAgIG1vZGVsTmFtZSxcbiAgICAgICAgc3lzdGVtUHJvbXB0OiBcIlwiXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0T3BlbkFpQ29tcGF0aWJsZVJlcGx5KHNldHRpbmdzLCB0dXJucywge1xuICAgICAgbW9kZWxOYW1lLFxuICAgICAgc3lzdGVtUHJvbXB0OiBcIlwiXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHJlcXVlc3RPcGVuQWlDb21wYXRpYmxlUmVwbHkoXG4gICAgc2V0dGluZ3M6IE92bFNldHRpbmdzLFxuICAgIHR1cm5zOiBDb252ZXJzYXRpb25UdXJuW10sXG4gICAgb3B0aW9ucz86IHsgbW9kZWxOYW1lPzogc3RyaW5nOyBzeXN0ZW1Qcm9tcHQ/OiBzdHJpbmcgfCBudWxsIH1cbiAgKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBhcGlVcmwgPSBzZXR0aW5ncy5hcGlVcmwudHJpbSgpO1xuICAgIGlmICghYXBpVXJsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBUEkgVVJMXHVDNzQ0IFx1QzEyNFx1QzgxNVx1RDU3NCBcdUM4RkNcdUMxMzhcdUM2OTQuXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IG1vZGVsTmFtZSA9IG9wdGlvbnM/Lm1vZGVsTmFtZT8udHJpbSgpIHx8IHNldHRpbmdzLm1vZGVsLnRyaW0oKSB8fCBQUk9WSURFUl9QUkVTRVRTLm9wZW5haS5tb2RlbDtcbiAgICBpZiAoIW1vZGVsTmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXHVCQUE4XHVCMzc4IFx1Qzc3NFx1Qjk4NFx1Qzc0NCBcdUM3ODVcdUI4MjVcdUQ1NzQgXHVDOEZDXHVDMTM4XHVDNjk0LlwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNzYWdlcyA9IHRoaXMuYnVpbGRPcGVuQWlNZXNzYWdlcyhzZXR0aW5ncywgdHVybnMsIG9wdGlvbnM/LnN5c3RlbVByb21wdCA/PyBudWxsKTtcbiAgICBjb25zdCBwYXlsb2FkID0ge1xuICAgICAgbW9kZWw6IG1vZGVsTmFtZSxcbiAgICAgIG1lc3NhZ2VzXG4gICAgfTtcbiAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkocGF5bG9hZCk7XG5cbiAgICBjb25zdCBoZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICB9O1xuICAgIGlmIChzZXR0aW5ncy5hcGlLZXkudHJpbSgpKSB7XG4gICAgICBoZWFkZXJzLkF1dGhvcml6YXRpb24gPSBgQmVhcmVyICR7c2V0dGluZ3MuYXBpS2V5LnRyaW0oKX1gO1xuICAgIH1cblxuICAgIGxldCByZXNwb25zZTogeyB0ZXh0OiBzdHJpbmc7IGpzb24/OiB1bmtub3duOyBzdGF0dXM/OiBudW1iZXIgfTtcbiAgICB0cnkge1xuICAgICAgcmVzcG9uc2UgPSBhd2FpdCByZXF1ZXN0VXJsKHtcbiAgICAgICAgdXJsOiBhcGlVcmwsXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGhlYWRlcnMsXG4gICAgICAgIGJvZHlcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpO1xuICAgICAgYXdhaXQgdGhpcy5sb2coXCJvcGVuYWktY29tcGF0aWJsZSByZXF1ZXN0IGZhaWxlZFwiLCB7XG4gICAgICAgIHVybDogYXBpVXJsLFxuICAgICAgICBib2R5OiBwYXlsb2FkLFxuICAgICAgICBlcnJvcjogbWVzc2FnZVxuICAgICAgfSk7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEFQSSBcdUM2OTRcdUNDQUQgXHVDMkU0XHVEMzI4OiAke21lc3NhZ2V9YCk7XG4gICAgfVxuXG4gICAgY29uc3Qgc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgIGlmIChzdGF0dXMgJiYgc3RhdHVzID49IDQwMCkge1xuICAgICAgYXdhaXQgdGhpcy5sb2coXCJvcGVuYWktY29tcGF0aWJsZSByZXNwb25zZSBlcnJvclwiLCB7XG4gICAgICAgIHVybDogYXBpVXJsLFxuICAgICAgICBib2R5OiBwYXlsb2FkLFxuICAgICAgICBzdGF0dXMsXG4gICAgICAgIHJlc3BvbnNlOiByZXNwb25zZS50ZXh0XG4gICAgICB9KTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQVBJIFx1QzYyNFx1Qjk1ODogJHtzdGF0dXN9YCk7XG4gICAgfVxuXG4gICAgY29uc3QgZGF0YSA9IHRoaXMucGFyc2VKc29uUmVzcG9uc2UocmVzcG9uc2UudGV4dCwgcmVzcG9uc2UuanNvbik7XG4gICAgY29uc3QgY29udGVudCA9XG4gICAgICAoZGF0YSBhcyB7IGNob2ljZXM/OiBBcnJheTx7IG1lc3NhZ2U/OiB7IGNvbnRlbnQ/OiBzdHJpbmcgfSB9PiB9KT8uY2hvaWNlcz8uWzBdPy5tZXNzYWdlXG4gICAgICAgID8uY29udGVudCA/P1xuICAgICAgKGRhdGEgYXMgeyByZXBseT86IHN0cmluZyB9KT8ucmVwbHkgPz9cbiAgICAgIChkYXRhIGFzIHsgY29udGVudD86IHN0cmluZyB9KT8uY29udGVudCA/P1xuICAgICAgKGRhdGEgYXMgeyBtZXNzYWdlPzogc3RyaW5nIH0pPy5tZXNzYWdlO1xuXG4gICAgaWYgKCFjb250ZW50IHx8IHR5cGVvZiBjb250ZW50ICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICBhd2FpdCB0aGlzLmxvZyhcIm9wZW5haS1jb21wYXRpYmxlIHJlc3BvbnNlIGludmFsaWRcIiwgeyB1cmw6IGFwaVVybCwgcmVzcG9uc2U6IGRhdGEgfSk7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJcdUM3NTFcdUIyRjUgXHVENjE1XHVDMkREXHVDNzc0IFx1QzYyQ1x1QkMxNFx1Qjk3NFx1QzlDMCBcdUM1NEFcdUMyQjVcdUIyQzhcdUIyRTQuXCIpO1xuICAgIH1cblxuICAgIHJldHVybiBjb250ZW50LnRyaW0oKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgcmVxdWVzdEdlbWluaVJlcGx5KFxuICAgIHNldHRpbmdzOiBPdmxTZXR0aW5ncyxcbiAgICB0dXJuczogQ29udmVyc2F0aW9uVHVybltdLFxuICAgIG9wdGlvbnM/OiB7IG1vZGVsTmFtZT86IHN0cmluZzsgc3lzdGVtUHJvbXB0Pzogc3RyaW5nIHwgbnVsbCB9XG4gICk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgYXBpS2V5ID0gc2V0dGluZ3MuYXBpS2V5LnRyaW0oKTtcbiAgICBpZiAoIWFwaUtleSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VtaW5pIEFQSSBcdUQwQTRcdUI5N0MgXHVDNzg1XHVCODI1XHVENTc0IFx1QzhGQ1x1QzEzOFx1QzY5NC5cIik7XG4gICAgfVxuXG4gICAgY29uc3QgbW9kZWxOYW1lID0gb3B0aW9ucz8ubW9kZWxOYW1lPy50cmltKCkgfHwgc2V0dGluZ3MubW9kZWwudHJpbSgpIHx8IFBST1ZJREVSX1BSRVNFVFMuZ2VtaW5pLm1vZGVsO1xuICAgIGlmICghbW9kZWxOYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW1pbmkgXHVCQUE4XHVCMzc4IFx1Qzc3NFx1Qjk4NFx1Qzc0NCBcdUM3ODVcdUI4MjVcdUQ1NzQgXHVDOEZDXHVDMTM4XHVDNjk0LlwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBzeXN0ZW1Qcm9tcHQgPSAob3B0aW9ucz8uc3lzdGVtUHJvbXB0ID8/IHNldHRpbmdzLnN5c3RlbVByb21wdCkudHJpbSgpO1xuICAgIGNvbnN0IGNvbnRlbnRzID0gdHVybnMubWFwKCh0dXJuKSA9PiB7XG4gICAgICBjb25zdCByb2xlID0gdHVybi5yb2xlID09PSBcImFzc2lzdGFudFwiID8gXCJtb2RlbFwiIDogXCJ1c2VyXCI7XG4gICAgICBjb25zdCB0ZXh0ID0gdHVybi5yb2xlID09PSBcInN5c3RlbVwiID8gYFtcdUMyRENcdUMyQTRcdUQxNUNdICR7dHVybi5jb250ZW50fWAgOiB0dXJuLmNvbnRlbnQ7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByb2xlLFxuICAgICAgICBwYXJ0czogW3sgdGV4dCB9XVxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHBheWxvYWQ6IHtcbiAgICAgIHN5c3RlbUluc3RydWN0aW9uPzogeyBwYXJ0czogQXJyYXk8eyB0ZXh0OiBzdHJpbmcgfT4gfTtcbiAgICAgIGNvbnRlbnRzOiBBcnJheTx7IHJvbGU6IHN0cmluZzsgcGFydHM6IEFycmF5PHsgdGV4dDogc3RyaW5nIH0+IH0+O1xuICAgICAgZ2VuZXJhdGlvbkNvbmZpZzogeyByZXNwb25zZU1pbWVUeXBlOiBzdHJpbmcgfTtcbiAgICB9ID0ge1xuICAgICAgY29udGVudHMsXG4gICAgICBnZW5lcmF0aW9uQ29uZmlnOiB7XG4gICAgICAgIHJlc3BvbnNlTWltZVR5cGU6IFwidGV4dC9wbGFpblwiXG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChzeXN0ZW1Qcm9tcHQpIHtcbiAgICAgIHBheWxvYWQuc3lzdGVtSW5zdHJ1Y3Rpb24gPSB7IHBhcnRzOiBbeyB0ZXh0OiBzeXN0ZW1Qcm9tcHQgfV0gfTtcbiAgICB9XG5cbiAgICAvLyBHZW1pbmkgQVBJIFVSTCBcdUFENkNcdUMxMzEgKEFQSSBcdUQwQTRcdUI5N0MgXHVDRkZDXHVCOUFDIFx1RDMwQ1x1Qjc3Q1x1QkJGOFx1RDEzMFx1Qjg1QyBcdUM4MDRcdUIyRUMpXG4gICAgY29uc3QgYXBpVXJsID0gYGh0dHBzOi8vZ2VuZXJhdGl2ZWxhbmd1YWdlLmdvb2dsZWFwaXMuY29tL3YxYmV0YS9tb2RlbHMvJHttb2RlbE5hbWV9OmdlbmVyYXRlQ29udGVudD9rZXk9JHthcGlLZXl9YDtcblxuICAgIGNvbnN0IGhlYWRlcnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgIH07XG5cbiAgICBsZXQgcmVzcG9uc2U6IHsgdGV4dDogc3RyaW5nOyBqc29uPzogdW5rbm93bjsgc3RhdHVzPzogbnVtYmVyIH07XG4gICAgdHJ5IHtcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgcmVxdWVzdFVybCh7XG4gICAgICAgIHVybDogYXBpVXJsLFxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBoZWFkZXJzLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKVxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcik7XG4gICAgICBhd2FpdCB0aGlzLmxvZyhcImdlbWluaSByZXF1ZXN0IGZhaWxlZFwiLCB7XG4gICAgICAgIG1vZGVsOiBtb2RlbE5hbWUsXG4gICAgICAgIGJvZHk6IHBheWxvYWQsXG4gICAgICAgIGVycm9yOiBtZXNzYWdlXG4gICAgICB9KTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgR2VtaW5pIFx1QzY5NFx1Q0NBRCBcdUMyRTRcdUQzMjg6ICR7bWVzc2FnZX1gKTtcbiAgICB9XG5cbiAgICBjb25zdCBzdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgaWYgKHN0YXR1cyAmJiBzdGF0dXMgPj0gNDAwKSB7XG4gICAgICBhd2FpdCB0aGlzLmxvZyhcImdlbWluaSByZXNwb25zZSBlcnJvclwiLCB7XG4gICAgICAgIG1vZGVsOiBtb2RlbE5hbWUsXG4gICAgICAgIGJvZHk6IHBheWxvYWQsXG4gICAgICAgIHN0YXR1cyxcbiAgICAgICAgcmVzcG9uc2U6IHJlc3BvbnNlLnRleHRcbiAgICAgIH0pO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBHZW1pbmkgQVBJIFx1QzYyNFx1Qjk1ODogJHtzdGF0dXN9YCk7XG4gICAgfVxuXG4gICAgY29uc3QgZGF0YSA9IHRoaXMucGFyc2VKc29uUmVzcG9uc2UocmVzcG9uc2UudGV4dCwgcmVzcG9uc2UuanNvbik7XG4gICAgY29uc3QgdGV4dCA9XG4gICAgICAoZGF0YSBhcyB7IHRleHQ/OiBzdHJpbmcgfSk/LnRleHQgPz9cbiAgICAgIChkYXRhIGFzIHsgY2FuZGlkYXRlcz86IEFycmF5PHsgY29udGVudD86IHsgcGFydHM/OiBBcnJheTx7IHRleHQ/OiBzdHJpbmcgfT4gfSB9PiB9KVxuICAgICAgICA/LmNhbmRpZGF0ZXM/LlswXT8uY29udGVudD8ucGFydHNcbiAgICAgICAgPy5tYXAoKHBhcnQpID0+IHBhcnQudGV4dCA/PyBcIlwiKVxuICAgICAgICAuam9pbihcIlwiKVxuICAgICAgICAudHJpbSgpID8/XG4gICAgICBcIlwiO1xuXG4gICAgaWYgKCF0ZXh0KSB7XG4gICAgICBhd2FpdCB0aGlzLmxvZyhcImdlbWluaSByZXNwb25zZSBpbnZhbGlkXCIsIHsgbW9kZWw6IG1vZGVsTmFtZSwgcmVzcG9uc2U6IGRhdGEgfSk7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJcdUM3NTFcdUIyRjUgXHVENjE1XHVDMkREXHVDNzc0IFx1QzYyQ1x1QkMxNFx1Qjk3NFx1QzlDMCBcdUM1NEFcdUMyQjVcdUIyQzhcdUIyRTQuXCIpO1xuICAgIH1cblxuICAgIHJldHVybiB0ZXh0O1xuICB9XG5cbiAgcHJpdmF0ZSBidWlsZE9wZW5BaU1lc3NhZ2VzKFxuICAgIHNldHRpbmdzOiBPdmxTZXR0aW5ncyxcbiAgICB0dXJuczogQ29udmVyc2F0aW9uVHVybltdLFxuICAgIHN5c3RlbVByb21wdE92ZXJyaWRlOiBzdHJpbmcgfCBudWxsXG4gICk6IEFycmF5PHsgcm9sZTogc3RyaW5nOyBjb250ZW50OiBzdHJpbmcgfT4ge1xuICAgIGNvbnN0IG1lc3NhZ2VzID0gW10gYXMgQXJyYXk8eyByb2xlOiBzdHJpbmc7IGNvbnRlbnQ6IHN0cmluZyB9PjtcbiAgICBjb25zdCBzeXN0ZW1Qcm9tcHQgPSBzeXN0ZW1Qcm9tcHRPdmVycmlkZSAhPT0gbnVsbFxuICAgICAgPyBzeXN0ZW1Qcm9tcHRPdmVycmlkZS50cmltKClcbiAgICAgIDogc2V0dGluZ3Muc3lzdGVtUHJvbXB0LnRyaW0oKTtcbiAgICBpZiAoc3lzdGVtUHJvbXB0KSB7XG4gICAgICBtZXNzYWdlcy5wdXNoKHsgcm9sZTogXCJzeXN0ZW1cIiwgY29udGVudDogc3lzdGVtUHJvbXB0IH0pO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IHR1cm4gb2YgdHVybnMpIHtcbiAgICAgIG1lc3NhZ2VzLnB1c2goeyByb2xlOiB0dXJuLnJvbGUsIGNvbnRlbnQ6IHR1cm4uY29udGVudCB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG1lc3NhZ2VzO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZUpzb25SZXNwb25zZSh0ZXh0OiBzdHJpbmcsIGpzb24/OiB1bmtub3duKTogdW5rbm93biB7XG4gICAgaWYgKGpzb24pIHtcbiAgICAgIHJldHVybiBqc29uO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIEpTT04ucGFyc2UodGV4dCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBUEkgXHVDNzUxXHVCMkY1XHVDNzQ0IFx1RDU3NFx1QzExRFx1RDU2MCBcdUMyMTggXHVDNUM2XHVDMkI1XHVCMkM4XHVCMkU0LlwiKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGxvZyhjb250ZXh0OiBzdHJpbmcsIGRldGFpbDogdW5rbm93bik6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMubG9nV3JpdGVyKGNvbnRleHQsIGRldGFpbCk7XG4gIH1cbn1cbiIsICJleHBvcnQgdHlwZSBBcGlQcm92aWRlciA9IFwiZ2VtaW5pXCIgfCBcIm9wZW5haVwiIHwgXCJvbGxhbWFcIiB8IFwiY3VzdG9tXCI7XG5leHBvcnQgdHlwZSBFbWJlZGRpbmdQcm92aWRlciA9IFwiZ2VtaW5pXCIgfCBcIm9wZW5haVwiIHwgXCJsb2NhbFwiIHwgXCJjdXN0b21cIjtcblxuZXhwb3J0IHR5cGUgT3ZsU2V0dGluZ3MgPSB7XG4gIHByb3ZpZGVyOiBBcGlQcm92aWRlcjtcbiAgYXBpVXJsOiBzdHJpbmc7XG4gIGFwaUtleTogc3RyaW5nO1xuICBtb2RlbDogc3RyaW5nO1xuICB0aXRsZU1vZGVsOiBzdHJpbmc7XG4gIHN5c3RlbVByb21wdDogc3RyaW5nO1xuICBkZWZhdWx0T3V0cHV0Rm9sZGVyOiBzdHJpbmc7XG4gIC8vIFx1Qzc3OFx1QjM3MVx1QzJGMSBcdUMxMjRcdUM4MTVcbiAgaW5kZXhpbmdFbmFibGVkOiBib29sZWFuO1xuICBjaHVua1NpemU6IG51bWJlcjtcbiAgY2h1bmtPdmVybGFwOiBudW1iZXI7XG4gIHRvcEs6IG51bWJlcjtcbiAgLy8gXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzEyNFx1QzgxNVxuICBlbWJlZGRpbmdQcm92aWRlcjogRW1iZWRkaW5nUHJvdmlkZXI7XG4gIGVtYmVkZGluZ0FwaUtleTogc3RyaW5nO1xuICBlbWJlZGRpbmdNb2RlbDogc3RyaW5nO1xuICBlbWJlZGRpbmdBcGlVcmw6IHN0cmluZztcbn07XG5cbmV4cG9ydCBjb25zdCBQUk9WSURFUl9QUkVTRVRTOiBSZWNvcmQ8QXBpUHJvdmlkZXIsIHsgYXBpVXJsOiBzdHJpbmc7IG1vZGVsOiBzdHJpbmcgfT4gPSB7XG4gIGdlbWluaToge1xuICAgIGFwaVVybDogXCJodHRwczovL2dlbmVyYXRpdmVsYW5ndWFnZS5nb29nbGVhcGlzLmNvbS92MWJldGEvbW9kZWxzL2dlbWluaS0zLjAtcHJldmlldzpnZW5lcmF0ZUNvbnRlbnRcIixcbiAgICBtb2RlbDogXCJnZW1pbmktMy4wLXByZXZpZXdcIlxuICB9LFxuICBvcGVuYWk6IHtcbiAgICBhcGlVcmw6IFwiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS92MS9jaGF0L2NvbXBsZXRpb25zXCIsXG4gICAgbW9kZWw6IFwiZ3B0LTRvLW1pbmlcIlxuICB9LFxuICBvbGxhbWE6IHtcbiAgICBhcGlVcmw6IFwiaHR0cDovL2xvY2FsaG9zdDoxMTQzNC92MS9jaGF0L2NvbXBsZXRpb25zXCIsXG4gICAgbW9kZWw6IFwibGxhbWEzLjFcIlxuICB9LFxuICBjdXN0b206IHtcbiAgICBhcGlVcmw6IFwiXCIsXG4gICAgbW9kZWw6IFwiXCJcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IEVNQkVERElOR19QUkVTRVRTOiBSZWNvcmQ8RW1iZWRkaW5nUHJvdmlkZXIsIHsgbW9kZWw6IHN0cmluZzsgYXBpVXJsPzogc3RyaW5nIH0+ID0ge1xuICBnZW1pbmk6IHtcbiAgICBtb2RlbDogXCJ0ZXh0LWVtYmVkZGluZy0wMDRcIixcbiAgICBhcGlVcmw6IFwiaHR0cHM6Ly9nZW5lcmF0aXZlbGFuZ3VhZ2UuZ29vZ2xlYXBpcy5jb20vdjFiZXRhL21vZGVsc1wiXG4gIH0sXG4gIG9wZW5haToge1xuICAgIG1vZGVsOiBcInRleHQtZW1iZWRkaW5nLTMtc21hbGxcIixcbiAgICBhcGlVcmw6IFwiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS92MS9lbWJlZGRpbmdzXCJcbiAgfSxcbiAgbG9jYWw6IHtcbiAgICBtb2RlbDogXCJYZW5vdmEvYWxsLU1pbmlMTS1MNi12MlwiXG4gIH0sXG4gIGN1c3RvbToge1xuICAgIG1vZGVsOiBcIlwiXG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX1NFVFRJTkdTOiBPdmxTZXR0aW5ncyA9IHtcbiAgcHJvdmlkZXI6IFwiZ2VtaW5pXCIsXG4gIGFwaVVybDogUFJPVklERVJfUFJFU0VUUy5nZW1pbmkuYXBpVXJsLFxuICBhcGlLZXk6IFwiXCIsXG4gIG1vZGVsOiBQUk9WSURFUl9QUkVTRVRTLmdlbWluaS5tb2RlbCxcbiAgdGl0bGVNb2RlbDogXCJcIixcbiAgc3lzdGVtUHJvbXB0OiBcIlwiLFxuICBkZWZhdWx0T3V0cHV0Rm9sZGVyOiBcIlwiLFxuICAvLyBcdUM3NzhcdUIzNzFcdUMyRjEgXHVBRTMwXHVCQ0Y4IFx1QzEyNFx1QzgxNVxuICBpbmRleGluZ0VuYWJsZWQ6IGZhbHNlLFxuICBjaHVua1NpemU6IDQwMCxcbiAgY2h1bmtPdmVybGFwOiA1MCxcbiAgdG9wSzogOCxcbiAgLy8gXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QUUzMFx1QkNGOCBcdUMxMjRcdUM4MTUgKEdlbWluaSlcbiAgZW1iZWRkaW5nUHJvdmlkZXI6IFwiZ2VtaW5pXCIsXG4gIGVtYmVkZGluZ0FwaUtleTogXCJcIixcbiAgZW1iZWRkaW5nTW9kZWw6IEVNQkVERElOR19QUkVTRVRTLmdlbWluaS5tb2RlbCxcbiAgZW1iZWRkaW5nQXBpVXJsOiBFTUJFRERJTkdfUFJFU0VUUy5nZW1pbmkuYXBpVXJsIHx8IFwiXCIsXG59O1xuIiwgImltcG9ydCB7IE1vZGFsIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgdHlwZSB7IFBsdWdpbiB9IGZyb20gXCJvYnNpZGlhblwiO1xuXG5leHBvcnQgdHlwZSBTYXZlQ29udmVyc2F0aW9uRm9ybSA9IHtcbiAgaW5wdXRQYXRoOiBzdHJpbmc7XG4gIHNlc3Npb25JZDogc3RyaW5nO1xuICBvdXRwdXRGb2xkZXI6IHN0cmluZztcbn07XG5cbmV4cG9ydCBjbGFzcyBTYXZlQ29udmVyc2F0aW9uTW9kYWwgZXh0ZW5kcyBNb2RhbCB7XG4gIHByaXZhdGUgcmVhZG9ubHkgb25TdWJtaXQ6ICh2YWx1ZTogU2F2ZUNvbnZlcnNhdGlvbkZvcm0pID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IocGx1Z2luOiBQbHVnaW4sIG9uU3VibWl0OiAodmFsdWU6IFNhdmVDb252ZXJzYXRpb25Gb3JtKSA9PiB2b2lkKSB7XG4gICAgc3VwZXIocGx1Z2luLmFwcCk7XG4gICAgdGhpcy5vblN1Ym1pdCA9IG9uU3VibWl0O1xuICB9XG5cbiAgb25PcGVuKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgY29udGVudEVsIH0gPSB0aGlzO1xuICAgIGNvbnRlbnRFbC5lbXB0eSgpO1xuXG4gICAgY29udGVudEVsLmNyZWF0ZUVsKFwiaDJcIiwgeyB0ZXh0OiBcIlx1QjMwMFx1RDY1NCBKU09OIFx1QzgwMFx1QzdBNVwiIH0pO1xuXG4gICAgY29uc3QgaW5wdXRQYXRoRWwgPSBjb250ZW50RWwuY3JlYXRlRWwoXCJpbnB1dFwiLCB7IHR5cGU6IFwidGV4dFwiIH0pO1xuICAgIGlucHV0UGF0aEVsLnBsYWNlaG9sZGVyID0gXCJKU09OIFx1RDMwQ1x1Qzc3QyBcdUFDQkRcdUI4NUMgKFx1QkNGQ1x1RDJCOCBcdUFFMzBcdUM5MDApXCI7XG5cbiAgICBjb25zdCBzZXNzaW9uSWRFbCA9IGNvbnRlbnRFbC5jcmVhdGVFbChcImlucHV0XCIsIHsgdHlwZTogXCJ0ZXh0XCIgfSk7XG4gICAgc2Vzc2lvbklkRWwucGxhY2Vob2xkZXIgPSBcIlx1QzEzOFx1QzE1OCBJRFwiO1xuXG4gICAgY29uc3Qgb3V0cHV0Rm9sZGVyRWwgPSBjb250ZW50RWwuY3JlYXRlRWwoXCJpbnB1dFwiLCB7IHR5cGU6IFwidGV4dFwiIH0pO1xuICAgIG91dHB1dEZvbGRlckVsLnBsYWNlaG9sZGVyID0gXCJcdUM4MDBcdUM3QTUgXHVEM0Y0XHVCMzU0IChcdUMxMjBcdUQwREQsIFx1QkNGQ1x1RDJCOCBcdUFFMzBcdUM5MDApXCI7XG5cbiAgICBjb25zdCBzdWJtaXRCdXR0b24gPSBjb250ZW50RWwuY3JlYXRlRWwoXCJidXR0b25cIiwgeyB0ZXh0OiBcIlx1QzgwMFx1QzdBNVwiIH0pO1xuICAgIHN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5vblN1Ym1pdCh7XG4gICAgICAgIGlucHV0UGF0aDogaW5wdXRQYXRoRWwudmFsdWUudHJpbSgpLFxuICAgICAgICBzZXNzaW9uSWQ6IHNlc3Npb25JZEVsLnZhbHVlLnRyaW0oKSxcbiAgICAgICAgb3V0cHV0Rm9sZGVyOiBvdXRwdXRGb2xkZXJFbC52YWx1ZS50cmltKClcbiAgICAgIH0pO1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH0pO1xuICB9XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25UdXJuIH0gZnJvbSBcIi4vY29udmVyc2F0aW9uXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVR1cm5zKGNvbnRlbnQ6IHN0cmluZyk6IENvbnZlcnNhdGlvblR1cm5bXSB7XG4gIGxldCBkYXRhOiB1bmtub3duO1xuICB0cnkge1xuICAgIGRhdGEgPSBKU09OLnBhcnNlKGNvbnRlbnQpO1xuICB9IGNhdGNoIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJKU09OIFx1RDYxNVx1QzJERFx1Qzc3NCBcdUM2MkNcdUJDMTRcdUI5NzRcdUM5QzAgXHVDNTRBXHVDMkI1XHVCMkM4XHVCMkU0LlwiKTtcbiAgfVxuXG4gIGlmICghQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkpTT05cdUM3NDAgXHVCQzMwXHVDNUY0XHVDNzc0XHVDNUI0XHVDNTdDIFx1RDU2OVx1QjJDOFx1QjJFNC5cIik7XG4gIH1cblxuICByZXR1cm4gZGF0YS5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgaWYgKCFpdGVtIHx8IHR5cGVvZiBpdGVtICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFx1Qzc5OFx1QkFCQlx1QjQxQyBcdUQ1NkRcdUJBQTk6ICR7aW5kZXggKyAxfVx1QkM4OFx1QzlGOGApO1xuICAgIH1cblxuICAgIGNvbnN0IHJvbGUgPSAoaXRlbSBhcyB7IHJvbGU/OiBzdHJpbmcgfSkucm9sZTtcbiAgICBjb25zdCBjb250ZW50VmFsdWUgPSAoaXRlbSBhcyB7IGNvbnRlbnQ/OiBzdHJpbmcgfSkuY29udGVudDtcbiAgICBjb25zdCB0aW1lc3RhbXBWYWx1ZSA9IChpdGVtIGFzIHsgdGltZXN0YW1wPzogc3RyaW5nIH0pLnRpbWVzdGFtcDtcblxuICAgIGlmIChyb2xlICE9PSBcInVzZXJcIiAmJiByb2xlICE9PSBcImFzc2lzdGFudFwiICYmIHJvbGUgIT09IFwic3lzdGVtXCIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgcm9sZVx1Qzc3NCBcdUM2MkNcdUJDMTRcdUI5NzRcdUM5QzAgXHVDNTRBXHVDMkI1XHVCMkM4XHVCMkU0OiAke2luZGV4ICsgMX1cdUJDODhcdUM5RjhgKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBjb250ZW50VmFsdWUgIT09IFwic3RyaW5nXCIgfHwgIWNvbnRlbnRWYWx1ZS50cmltKCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgY29udGVudFx1QUMwMCBcdUM2MkNcdUJDMTRcdUI5NzRcdUM5QzAgXHVDNTRBXHVDMkI1XHVCMkM4XHVCMkU0OiAke2luZGV4ICsgMX1cdUJDODhcdUM5RjhgKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgcm9sZSxcbiAgICAgIGNvbnRlbnQ6IGNvbnRlbnRWYWx1ZSxcbiAgICAgIHRpbWVzdGFtcDogdGltZXN0YW1wVmFsdWVcbiAgICB9O1xuICB9KTtcbn1cbiIsICJpbXBvcnQgeyBOb3RpY2UsIFBsdWdpbiwgUGx1Z2luU2V0dGluZ1RhYiwgU2V0dGluZywgcmVxdWVzdFVybCB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHR5cGUgeyBBcGlQcm92aWRlciwgT3ZsU2V0dGluZ3MsIEVtYmVkZGluZ1Byb3ZpZGVyIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IFBST1ZJREVSX1BSRVNFVFMsIEVNQkVERElOR19QUkVTRVRTIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuZXhwb3J0IHR5cGUgU2V0dGluZ3NIb3N0ID0gUGx1Z2luICYge1xuICBzZXR0aW5nczogT3ZsU2V0dGluZ3M7XG4gIHNhdmVTZXR0aW5nczogKCkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgaW5kZXhWYXVsdEFsbDogKCkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgaW5kZXhOZXdGaWxlc09ubHk6ICgpID0+IFByb21pc2U8dm9pZD47XG59O1xuXG5leHBvcnQgY2xhc3MgT3ZsU2V0dGluZ1RhYiBleHRlbmRzIFBsdWdpblNldHRpbmdUYWIge1xuICBwcml2YXRlIHJlYWRvbmx5IHBsdWdpbjogU2V0dGluZ3NIb3N0O1xuICBwcml2YXRlIGdlbWluaU1vZGVsczogc3RyaW5nW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihwbHVnaW46IFNldHRpbmdzSG9zdCkge1xuICAgIHN1cGVyKHBsdWdpbi5hcHAsIHBsdWdpbik7XG4gICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XG4gIH1cblxuICBkaXNwbGF5KCk6IHZvaWQge1xuICAgIGNvbnN0IHsgY29udGFpbmVyRWwgfSA9IHRoaXM7XG4gICAgY29udGFpbmVyRWwuZW1wdHkoKTtcblxuICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDJcIiwgeyB0ZXh0OiBcIk9WTCBcdUMxMjRcdUM4MTVcIiB9KTtcblxuICAgIGxldCBhcGlVcmxJbnB1dDogeyBzZXRWYWx1ZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQgfSB8IG51bGwgPSBudWxsO1xuICAgIGxldCBtb2RlbElucHV0OiB7IHNldFZhbHVlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZCB9IHwgbnVsbCA9IG51bGw7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiQVBJIFx1QzgxQ1x1QUNGNVx1QzBBQ1wiKVxuICAgICAgLnNldERlc2MoXCJcdUMwQUNcdUM2QTlcdUQ1NjAgQVBJIFx1QzgxQ1x1QUNGNVx1QzBBQ1x1Qjk3QyBcdUMxMjBcdUQwRERcdUQ1NThcdUMxMzhcdUM2OTQuIChPbGxhbWEgXHVEM0VDXHVENTY4KVwiKVxuICAgICAgLmFkZERyb3Bkb3duKChkcm9wZG93bikgPT4ge1xuICAgICAgICBkcm9wZG93blxuICAgICAgICAgIC5hZGRPcHRpb25zKHtcbiAgICAgICAgICAgIGdlbWluaTogXCJHb29nbGUgR2VtaW5pXCIsXG4gICAgICAgICAgICBvcGVuYWk6IFwiT3BlbkFJIFx1RDYzOFx1RDY1OFwiLFxuICAgICAgICAgICAgb2xsYW1hOiBcIk9sbGFtYSAoXHVCODVDXHVDRUVDKVwiLFxuICAgICAgICAgICAgY3VzdG9tOiBcIlx1QzBBQ1x1QzZBOVx1Qzc5MCBcdUM5QzBcdUM4MTVcIlxuICAgICAgICAgIH0pXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnByb3ZpZGVyKVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gdmFsdWUgYXMgQXBpUHJvdmlkZXI7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5wcm92aWRlciA9IHByb3ZpZGVyO1xuICAgICAgICAgICAgY29uc3QgcHJlc2V0ID0gUFJPVklERVJfUFJFU0VUU1twcm92aWRlcl07XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5hcGlVcmwgPSBwcmVzZXQuYXBpVXJsO1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MubW9kZWwgPSBwcmVzZXQubW9kZWw7XG4gICAgICAgICAgICBhcGlVcmxJbnB1dD8uc2V0VmFsdWUocHJlc2V0LmFwaVVybCk7XG4gICAgICAgICAgICBtb2RlbElucHV0Py5zZXRWYWx1ZShwcmVzZXQubW9kZWwpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkoKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIkFQSSBVUkxcIilcbiAgICAgIC5zZXREZXNjKFwiXHVDODFDXHVBQ0Y1XHVDMEFDXHVCQ0M0IFx1Q0M0NFx1RDMwNSBcdUM1RDRcdUI0RENcdUQzRUNcdUM3NzhcdUQyQjggVVJMXCIpXG4gICAgICAuYWRkVGV4dCgodGV4dCkgPT4ge1xuICAgICAgICBhcGlVcmxJbnB1dCA9IHRleHQ7XG4gICAgICAgIHRleHRcbiAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCJodHRwOi8vbG9jYWxob3N0OjExNDM0L3YxL2NoYXQvY29tcGxldGlvbnNcIilcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuYXBpVXJsKVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmFwaVVybCA9IHZhbHVlLnRyaW0oKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiQVBJIFx1RDBBNFwiKVxuICAgICAgLnNldERlc2MoXCJcdUQ1NDRcdUM2OTRcdUQ1NUMgXHVBQ0JEXHVDNkIwIEJlYXJlciBcdUQxQTBcdUQwNzAgXHVCNjEwXHVCMjk0IFx1QzgxQ1x1QUNGNVx1QzBBQyBcdUQwQTRcdUI5N0MgXHVDNzg1XHVCODI1XHVENTU4XHVDMTM4XHVDNjk0LlwiKVxuICAgICAgLmFkZFRleHQoKHRleHQpID0+XG4gICAgICAgIHRleHRcbiAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCJcdUMxMjBcdUQwRERcIilcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuYXBpS2V5KVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmFwaUtleSA9IHZhbHVlO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICBpZiAodGhpcy5wbHVnaW4uc2V0dGluZ3MucHJvdmlkZXIgPT09IFwiZ2VtaW5pXCIpIHtcbiAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAuc2V0TmFtZShcIkdlbWluaSBcdUJBQThcdUIzNzggXHVCQUE5XHVCODVEXCIpXG4gICAgICAgIC5zZXREZXNjKFwiR29vZ2xlXHVDNUQwXHVDMTFDIFx1QzgxQ1x1QUNGNVx1RDU1OFx1QjI5NCBcdUJBQThcdUIzNzhcdUM3NDQgXHVCRDg4XHVCN0VDXHVDNjQwIFx1QzEyMFx1RDBERFx1RDU2MCBcdUMyMTggXHVDNzg4XHVDMkI1XHVCMkM4XHVCMkU0LlwiKVxuICAgICAgICAuYWRkQnV0dG9uKChidXR0b24pID0+IHtcbiAgICAgICAgICBidXR0b24uc2V0QnV0dG9uVGV4dChcIlx1QkFBOVx1Qjg1RCBcdUJEODhcdUI3RUNcdUM2MjRcdUFFMzBcIikub25DbGljayhhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmxvYWRHZW1pbmlNb2RlbHMoKTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgaWYgKHRoaXMuZ2VtaW5pTW9kZWxzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgLnNldE5hbWUoXCJHZW1pbmkgXHVCQUE4XHVCMzc4IFx1QzEyMFx1RDBERFwiKVxuICAgICAgICAgIC5zZXREZXNjKFwiXHVCQUE5XHVCODVEXHVDNUQwIFx1QzVDNlx1QjI5NCBcdUJBQThcdUIzNzhcdUM3NDAgXHVDNTQ0XHVCNzk4XHVDNUQwXHVDMTFDIFx1QzlDMVx1QzgxMSBcdUM3ODVcdUI4MjVcdUQ1NThcdUMxMzhcdUM2OTQuXCIpXG4gICAgICAgICAgLmFkZERyb3Bkb3duKChkcm9wZG93bikgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuZ2VtaW5pTW9kZWxzLnJlZHVjZTxSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+PihcbiAgICAgICAgICAgICAgKGFjYywgbmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgIGFjY1tuYW1lXSA9IG5hbWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge31cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBkcm9wZG93blxuICAgICAgICAgICAgICAuYWRkT3B0aW9ucyhvcHRpb25zKVxuICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MubW9kZWwpXG4gICAgICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5tb2RlbCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIG1vZGVsSW5wdXQ/LnNldFZhbHVlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIlx1QkFBOFx1QjM3OFwiKVxuICAgICAgLnNldERlc2MoXCJcdUM4MUNcdUFDRjVcdUMwQUNcdUJDQzQgXHVCQUE4XHVCMzc4IFx1Qzc3NFx1Qjk4NCAoXHVDOUMxXHVDODExIFx1Qzc4NVx1QjgyNSBcdUFDMDBcdUIyQTUpXCIpXG4gICAgICAuYWRkVGV4dCgodGV4dCkgPT4ge1xuICAgICAgICBtb2RlbElucHV0ID0gdGV4dDtcbiAgICAgICAgdGV4dFxuICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcImdwdC00by1taW5pXCIpXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLm1vZGVsKVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLm1vZGVsID0gdmFsdWUudHJpbSgpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJcdUM4MUNcdUJBQTkgXHVDMEREXHVDMTMxIFx1QkFBOFx1QjM3OFwiKVxuICAgICAgLnNldERlc2MoXCJcdUMxMzhcdUMxNTgvXHVDODAwXHVDN0E1IFx1QzgxQ1x1QkFBOSBcdUMwRERcdUMxMzFcdUM1RDAgXHVDMEFDXHVDNkE5XHVENTYwIFx1QkFBOFx1QjM3OCAoXHVCRTQ0XHVDNUI0XHVDNzg4XHVDNzNDXHVCQTc0IFx1QUUzMFx1QkNGOCBcdUJBQThcdUIzNzggXHVDMEFDXHVDNkE5KVwiKVxuICAgICAgLmFkZFRleHQoKHRleHQpID0+XG4gICAgICAgIHRleHRcbiAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCJncHQtNG8tbWluaVwiKVxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy50aXRsZU1vZGVsKVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnRpdGxlTW9kZWwgPSB2YWx1ZS50cmltKCk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICB9KVxuICAgICAgKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJcdUMyRENcdUMyQTRcdUQxNUMgXHVENTA0XHVCODZDXHVENTA0XHVEMkI4XCIpXG4gICAgICAuc2V0RGVzYyhcIlx1QkFBOFx1QjRFMCBcdUM2OTRcdUNDQURcdUM1RDAgXHVEM0VDXHVENTY4XHVCNDIwIFx1QzJEQ1x1QzJBNFx1RDE1QyBcdUJBNTRcdUMyRENcdUM5QzBcIilcbiAgICAgIC5hZGRUZXh0QXJlYSgodGV4dCkgPT5cbiAgICAgICAgdGV4dFxuICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcIlx1QzYwODogXHVCMTA4XHVCMjk0IE9ic2lkaWFuIFx1QjlBQ1x1QzExQ1x1Q0U1OCBcdUM1QjRcdUMyRENcdUMyQTRcdUQxMzRcdUQyQjhcdUIyRTQuXCIpXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnN5c3RlbVByb21wdClcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5zeXN0ZW1Qcm9tcHQgPSB2YWx1ZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIlx1QUUzMFx1QkNGOCBcdUM4MDBcdUM3QTUgXHVEM0Y0XHVCMzU0XCIpXG4gICAgICAuc2V0RGVzYyhcIlx1QjMwMFx1RDY1NFx1Qjk3QyBcdUM4MDBcdUM3QTVcdUQ1NjAgXHVBRTMwXHVCQ0Y4IFx1RDNGNFx1QjM1NCAoXHVCQ0ZDXHVEMkI4IFx1QUUzMFx1QzkwMClcIilcbiAgICAgIC5hZGRUZXh0KCh0ZXh0KSA9PlxuICAgICAgICB0ZXh0XG4gICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiXHVDNjA4OiBDb252ZXJzYXRpb25zXCIpXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmRlZmF1bHRPdXRwdXRGb2xkZXIpXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZGVmYXVsdE91dHB1dEZvbGRlciA9IHZhbHVlLnRyaW0oKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJoM1wiLCB7IHRleHQ6IFwiXHVDNzc4XHVCMzcxXHVDMkYxIFx1QkMwRiBcdUFDODBcdUMwQzkgXHVDMTI0XHVDODE1XCIgfSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiXHVDNzc4XHVCMzcxXHVDMkYxIFx1RDY1Q1x1QzEzMVx1RDY1NFwiKVxuICAgICAgLnNldERlc2MoXCJcdUJDRkNcdUQyQjggXHVEMzBDXHVDNzdDXHVDNzQ0IFx1Qzc3OFx1QjM3MVx1QzJGMVx1RDU1OFx1QzVFQyBcdUJDQTFcdUQxMzAgXHVBQzgwXHVDMEM5XHVDNzQ0IFx1RDY1Q1x1QzEzMVx1RDY1NFx1RDU2OVx1QjJDOFx1QjJFNC5cIilcbiAgICAgIC5hZGRUb2dnbGUoKHRvZ2dsZSkgPT5cbiAgICAgICAgdG9nZ2xlXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmluZGV4aW5nRW5hYmxlZClcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5pbmRleGluZ0VuYWJsZWQgPSB2YWx1ZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIlx1QzgwNFx1Q0NCNCBcdUJDRkNcdUQyQjggXHVDNzg0XHVCQ0EwXHVCNTI5XCIpXG4gICAgICAuc2V0RGVzYyhcIlx1QkNGQ1x1RDJCOFx1Qzc1OCBcdUJBQThcdUI0RTAgXHVCMTc4XHVEMkI4XHVCOTdDIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUJDMEYgXHVDNzc4XHVCMzcxXHVDMkYxXHVENTY5XHVCMkM4XHVCMkU0LiAoXHVDMkRDXHVBQzA0XHVDNzc0IFx1QUM3OFx1QjlCNCBcdUMyMTggXHVDNzg4XHVDNzRDKVwiKVxuICAgICAgLmFkZEJ1dHRvbigoYnV0dG9uKSA9PiB7XG4gICAgICAgIGJ1dHRvblxuICAgICAgICAgIC5zZXRCdXR0b25UZXh0KFwiXHVDODA0XHVDQ0I0IFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUMyRENcdUM3OTFcIilcbiAgICAgICAgICAuc2V0Q3RhKClcbiAgICAgICAgICAub25DbGljayhhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBidXR0b24uc2V0RGlzYWJsZWQodHJ1ZSk7XG4gICAgICAgICAgICBidXR0b24uc2V0QnV0dG9uVGV4dChcIlx1QzlDNFx1RDU4OSBcdUM5MTEuLi5cIik7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5pbmRleFZhdWx0QWxsKCk7XG4gICAgICAgICAgICAgIG5ldyBOb3RpY2UoXCJcdUM4MDRcdUNDQjQgXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzY0NFx1QjhDQyFcIik7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpO1xuICAgICAgICAgICAgICBuZXcgTm90aWNlKGBcdUM3ODRcdUJDQTBcdUI1MjkgXHVDMkU0XHVEMzI4OiAke21lc3NhZ2V9YCk7XG4gICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICBidXR0b24uc2V0RGlzYWJsZWQoZmFsc2UpO1xuICAgICAgICAgICAgICBidXR0b24uc2V0QnV0dG9uVGV4dChcIlx1QzgwNFx1Q0NCNCBcdUM3ODRcdUJDQTBcdUI1MjkgXHVDMkRDXHVDNzkxXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiXHVDMkUwXHVBRERDIFx1QjE3OFx1RDJCOFx1QjlDQyBcdUM3ODRcdUJDQTBcdUI1MjlcIilcbiAgICAgIC5zZXREZXNjKFwiXHVCOUM4XHVDOUMwXHVCOUM5IFx1Qzc3OFx1QjM3MVx1QzJGMSBcdUM3NzRcdUQ2QzQgXHVDMEREXHVDMTMxXHVCNDE4XHVBQzcwXHVCMDk4IFx1QzIxOFx1QzgxNVx1QjQxQyBcdUIxNzhcdUQyQjhcdUI5Q0MgXHVDNzg0XHVCQ0EwXHVCNTI5XHVENTY5XHVCMkM4XHVCMkU0LlwiKVxuICAgICAgLmFkZEJ1dHRvbigoYnV0dG9uKSA9PiB7XG4gICAgICAgIGJ1dHRvblxuICAgICAgICAgIC5zZXRCdXR0b25UZXh0KFwiXHVDMkUwXHVBRERDIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUMyRENcdUM3OTFcIilcbiAgICAgICAgICAub25DbGljayhhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBidXR0b24uc2V0RGlzYWJsZWQodHJ1ZSk7XG4gICAgICAgICAgICBidXR0b24uc2V0QnV0dG9uVGV4dChcIlx1QzlDNFx1RDU4OSBcdUM5MTEuLi5cIik7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5pbmRleE5ld0ZpbGVzT25seSgpO1xuICAgICAgICAgICAgICBuZXcgTm90aWNlKFwiXHVDMkUwXHVBRERDIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUM2NDRcdUI4Q0MhXCIpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKTtcbiAgICAgICAgICAgICAgbmV3IE5vdGljZShgXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzJFNFx1RDMyODogJHttZXNzYWdlfWApO1xuICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgYnV0dG9uLnNldERpc2FibGVkKGZhbHNlKTtcbiAgICAgICAgICAgICAgYnV0dG9uLnNldEJ1dHRvblRleHQoXCJcdUMyRTBcdUFEREMgXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzJEQ1x1Qzc5MVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIlx1Q0NBRFx1RDA2QyBcdUQwNkNcdUFFMzBcIilcbiAgICAgIC5zZXREZXNjKFwiXHVEMTREXHVDMkE0XHVEMkI4XHVCOTdDIFx1QkQ4NFx1RDU2MFx1RDU2MCBcdUI1NEMgXHVBQzAxIFx1Q0NBRFx1RDA2Q1x1Qzc1OCBcdUNENUNcdUIzMDAgXHVEMUEwXHVEMDcwIFx1QzIxOCAoXHVBRTMwXHVCQ0Y4OiA0MDApXCIpXG4gICAgICAuYWRkVGV4dCgodGV4dCkgPT5cbiAgICAgICAgdGV4dFxuICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcIjQwMFwiKVxuICAgICAgICAgIC5zZXRWYWx1ZShTdHJpbmcodGhpcy5wbHVnaW4uc2V0dGluZ3MuY2h1bmtTaXplKSlcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBudW0gPSBwYXJzZUludCh2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoIWlzTmFOKG51bSkgJiYgbnVtID4gMCkge1xuICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5jaHVua1NpemUgPSBudW07XG4gICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIlx1Q0NBRFx1RDA2QyBcdUM2MjRcdUJDODRcdUI3QTlcIilcbiAgICAgIC5zZXREZXNjKFwiXHVDNzc4XHVDODExXHVENTVDIFx1Q0NBRFx1RDA2QyBcdUFDMDQgXHVDOTExXHVCQ0Y1XHVCNDE4XHVCMjk0IFx1RDFBMFx1RDA3MCBcdUMyMTggKFx1QUUzMFx1QkNGODogNTApXCIpXG4gICAgICAuYWRkVGV4dCgodGV4dCkgPT5cbiAgICAgICAgdGV4dFxuICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcIjUwXCIpXG4gICAgICAgICAgLnNldFZhbHVlKFN0cmluZyh0aGlzLnBsdWdpbi5zZXR0aW5ncy5jaHVua092ZXJsYXApKVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG51bSA9IHBhcnNlSW50KHZhbHVlKTtcbiAgICAgICAgICAgIGlmICghaXNOYU4obnVtKSAmJiBudW0gPj0gMCkge1xuICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5jaHVua092ZXJsYXAgPSBudW07XG4gICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIlx1QUM4MFx1QzBDOSBcdUFDQjBcdUFDRkMgXHVDMjE4IChUb3AtSylcIilcbiAgICAgIC5zZXREZXNjKFwiXHVBQzgwXHVDMEM5IFx1QzJEQyBcdUJDMThcdUQ2NThcdUQ1NjAgXHVDRDVDXHVCMzAwIFx1QUNCMFx1QUNGQyBcdUMyMTggKFx1QUUzMFx1QkNGODogOClcIilcbiAgICAgIC5hZGRUZXh0KCh0ZXh0KSA9PlxuICAgICAgICB0ZXh0XG4gICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiOFwiKVxuICAgICAgICAgIC5zZXRWYWx1ZShTdHJpbmcodGhpcy5wbHVnaW4uc2V0dGluZ3MudG9wSykpXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbnVtID0gcGFyc2VJbnQodmFsdWUpO1xuICAgICAgICAgICAgaWYgKCFpc05hTihudW0pICYmIG51bSA+IDApIHtcbiAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MudG9wSyA9IG51bTtcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICBjb250YWluZXJFbC5jcmVhdGVFbChcImgzXCIsIHsgdGV4dDogXCJcdUM3ODRcdUJDQTBcdUI1MjkgXHVDMTI0XHVDODE1XCIgfSk7XG5cbiAgICBsZXQgZW1iZWRkaW5nTW9kZWxJbnB1dDogeyBzZXRWYWx1ZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQgfSB8IG51bGwgPSBudWxsO1xuICAgIGxldCBlbWJlZGRpbmdBcGlVcmxJbnB1dDogeyBzZXRWYWx1ZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQgfSB8IG51bGwgPSBudWxsO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIlx1Qzc4NFx1QkNBMFx1QjUyOSBcdUM4MUNcdUFDRjVcdUM3OTBcIilcbiAgICAgIC5zZXREZXNjKFwiXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzBERFx1QzEzMVx1QzVEMCBcdUMwQUNcdUM2QTlcdUQ1NjAgXHVDODFDXHVBQ0Y1XHVDNzkwXHVCOTdDIFx1QzEyMFx1RDBERFx1RDU1OFx1QzEzOFx1QzY5NFwiKVxuICAgICAgLmFkZERyb3Bkb3duKChkcm9wZG93bikgPT4ge1xuICAgICAgICBkcm9wZG93blxuICAgICAgICAgIC5hZGRPcHRpb25zKHtcbiAgICAgICAgICAgIGdlbWluaTogXCJHb29nbGUgR2VtaW5pIChBUEkpXCIsXG4gICAgICAgICAgICBvcGVuYWk6IFwiT3BlbkFJIChBUEkpXCIsXG4gICAgICAgICAgICBsb2NhbDogXCJcdUI4NUNcdUNFRUMgXHVCQUE4XHVCMzc4IChIdWdnaW5nRmFjZSlcIixcbiAgICAgICAgICAgIGN1c3RvbTogXCJcdUNFRTRcdUMyQTRcdUQxNDAgQVBJXCJcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbWJlZGRpbmdQcm92aWRlcilcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHZhbHVlIGFzIEVtYmVkZGluZ1Byb3ZpZGVyO1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZW1iZWRkaW5nUHJvdmlkZXIgPSBwcm92aWRlcjtcbiAgICAgICAgICAgIGNvbnN0IHByZXNldCA9IEVNQkVERElOR19QUkVTRVRTW3Byb3ZpZGVyXTtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmVtYmVkZGluZ01vZGVsID0gcHJlc2V0Lm1vZGVsO1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZW1iZWRkaW5nQXBpVXJsID0gcHJlc2V0LmFwaVVybCB8fCBcIlwiO1xuICAgICAgICAgICAgZW1iZWRkaW5nTW9kZWxJbnB1dD8uc2V0VmFsdWUocHJlc2V0Lm1vZGVsKTtcbiAgICAgICAgICAgIGVtYmVkZGluZ0FwaVVybElucHV0Py5zZXRWYWx1ZShwcmVzZXQuYXBpVXJsIHx8IFwiXCIpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkoKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgaWYgKHRoaXMucGx1Z2luLnNldHRpbmdzLmVtYmVkZGluZ1Byb3ZpZGVyICE9PSBcImxvY2FsXCIpIHtcbiAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAuc2V0TmFtZShcIlx1Qzc4NFx1QkNBMFx1QjUyOSBBUEkgVVJMXCIpXG4gICAgICAgIC5zZXREZXNjKFwiXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzY5NFx1Q0NBRCBcdUM1RDRcdUI0RENcdUQzRUNcdUM3NzhcdUQyQjggVVJMIChcdUJFNDRcdUM1QjRcdUM3ODhcdUM3M0NcdUJBNzQgXHVDODFDXHVBQ0Y1XHVDNzkwIFx1QUUzMFx1QkNGOFx1QUMxMiBcdUMwQUNcdUM2QTkpXCIpXG4gICAgICAgIC5hZGRUZXh0KCh0ZXh0KSA9PiB7XG4gICAgICAgICAgZW1iZWRkaW5nQXBpVXJsSW5wdXQgPSB0ZXh0O1xuICAgICAgICAgIHRleHRcbiAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcImh0dHBzOi8vYXBpLm9wZW5haS5jb20vdjEvZW1iZWRkaW5nc1wiKVxuICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmVtYmVkZGluZ0FwaVVybClcbiAgICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZW1iZWRkaW5nQXBpVXJsID0gdmFsdWUudHJpbSgpO1xuICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wbHVnaW4uc2V0dGluZ3MuZW1iZWRkaW5nUHJvdmlkZXIgIT09IFwibG9jYWxcIikge1xuICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgIC5zZXROYW1lKFwiXHVDNzg0XHVCQ0EwXHVCNTI5IEFQSSBcdUQwQTRcIilcbiAgICAgICAgLnNldERlc2MoXCJcdUM3ODRcdUJDQTBcdUI1MjkgQVBJIFx1RDBBNCAoXHVCRTQ0XHVDNUI0XHVDNzg4XHVDNzNDXHVCQTc0IExMTSBBUEkgXHVEMEE0IFx1QzBBQ1x1QzZBOSlcIilcbiAgICAgICAgLmFkZFRleHQoKHRleHQpID0+XG4gICAgICAgICAgdGV4dFxuICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiXHVDMTIwXHVEMEREXCIpXG4gICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZW1iZWRkaW5nQXBpS2V5KVxuICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbWJlZGRpbmdBcGlLZXkgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJcdUM3ODRcdUJDQTBcdUI1MjkgXHVCQUE4XHVCMzc4XCIpXG4gICAgICAuc2V0RGVzYyhcIlx1QzBBQ1x1QzZBOVx1RDU2MCBcdUM3ODRcdUJDQTBcdUI1MjkgXHVCQUE4XHVCMzc4XCIpXG4gICAgICAuYWRkVGV4dCgodGV4dCkgPT4ge1xuICAgICAgICBlbWJlZGRpbmdNb2RlbElucHV0ID0gdGV4dDtcbiAgICAgICAgdGV4dFxuICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcIlx1QkFBOFx1QjM3OFx1QkE4NVwiKVxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbWJlZGRpbmdNb2RlbClcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbWJlZGRpbmdNb2RlbCA9IHZhbHVlLnRyaW0oKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGxvYWRHZW1pbmlNb2RlbHMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgYXBpS2V5ID0gdGhpcy5wbHVnaW4uc2V0dGluZ3MuYXBpS2V5LnRyaW0oKTtcbiAgICBpZiAoIWFwaUtleSkge1xuICAgICAgbmV3IE5vdGljZShcIkdlbWluaSBBUEkgXHVEMEE0XHVCOTdDIFx1QkEzQ1x1QzgwMCBcdUM3ODVcdUI4MjVcdUQ1NzQgXHVDOEZDXHVDMTM4XHVDNjk0LlwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCByZXF1ZXN0VXJsKHtcbiAgICAgICAgdXJsOiBgaHR0cHM6Ly9nZW5lcmF0aXZlbGFuZ3VhZ2UuZ29vZ2xlYXBpcy5jb20vdjFiZXRhL21vZGVscz9rZXk9JHthcGlLZXl9YFxuICAgICAgfSk7XG4gICAgICBjb25zdCBkYXRhID0gcmVzcG9uc2UuanNvbiBhc1xuICAgICAgICB8IHsgbW9kZWxzPzogQXJyYXk8eyBuYW1lPzogc3RyaW5nOyBzdXBwb3J0ZWRHZW5lcmF0aW9uTWV0aG9kcz86IHN0cmluZ1tdIH0+IH1cbiAgICAgICAgfCB1bmRlZmluZWQ7XG4gICAgICBjb25zdCBtb2RlbHMgPSBkYXRhPy5tb2RlbHMgPz8gW107XG4gICAgICB0aGlzLmdlbWluaU1vZGVscyA9IG1vZGVsc1xuICAgICAgICAuZmlsdGVyKChtb2RlbCkgPT4gbW9kZWwuc3VwcG9ydGVkR2VuZXJhdGlvbk1ldGhvZHM/LmluY2x1ZGVzKFwiZ2VuZXJhdGVDb250ZW50XCIpKVxuICAgICAgICAubWFwKChtb2RlbCkgPT4gbW9kZWwubmFtZSlcbiAgICAgICAgLmZpbHRlcigobmFtZSk6IG5hbWUgaXMgc3RyaW5nID0+IEJvb2xlYW4obmFtZSkpO1xuXG4gICAgICBpZiAodGhpcy5nZW1pbmlNb2RlbHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIG5ldyBOb3RpY2UoXCJcdUMwQUNcdUM2QTkgXHVBQzAwXHVCMkE1XHVENTVDIEdlbWluaSBcdUJBQThcdUIzNzhcdUM3NDQgXHVDQzNFXHVDOUMwIFx1QkFCQlx1RDU4OFx1QzJCNVx1QjJDOFx1QjJFNC5cIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXcgTm90aWNlKFwiR2VtaW5pIFx1QkFBOFx1QjM3OCBcdUJBQTlcdUI4NURcdUM3NDQgXHVCRDg4XHVCN0VDXHVDNjU0XHVDMkI1XHVCMkM4XHVCMkU0LlwiKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKTtcbiAgICAgIG5ldyBOb3RpY2UoYEdlbWluaSBcdUJBQThcdUIzNzggXHVCQUE5XHVCODVEIFx1QzJFNFx1RDMyODogJHttZXNzYWdlfWApO1xuICAgIH1cbiAgfVxufVxuIiwgImltcG9ydCB7IEl0ZW1WaWV3LCBNYXJrZG93blJlbmRlcmVyLCBOb3RpY2UsIFdvcmtzcGFjZUxlYWYgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHVybiB9IGZyb20gXCIuLi9jb252ZXJzYXRpb25cIjtcbmltcG9ydCB0eXBlIHsgUGx1Z2luQ2hhdEFwaSB9IGZyb20gXCIuLi9wbHVnaW5BcGlcIjtcbmltcG9ydCB7IFRvcGljU2VwYXJhdGlvbkVuZ2luZSB9IGZyb20gXCIuLi90b3BpY1NlcGFyYXRpb25cIjtcbmltcG9ydCB7IHNhdmVTZWdtZW50c0FzTm90ZXMgfSBmcm9tIFwiLi4vdG9waWNTZXBhcmF0aW9uXCI7XG5cbmV4cG9ydCBjb25zdCBWSUVXX1RZUEVfT1ZMX0NIQVQgPSBcIm92bC1jaGF0LXZpZXdcIjtcblxuZXhwb3J0IGNsYXNzIENoYXRWaWV3IGV4dGVuZHMgSXRlbVZpZXcge1xuICBwcml2YXRlIHJlYWRvbmx5IHBsdWdpbjogUGx1Z2luQ2hhdEFwaTtcbiAgcHJpdmF0ZSBtZXNzYWdlczogQ29udmVyc2F0aW9uVHVybltdID0gW107XG4gIHByaXZhdGUgbWVzc2FnZXNFbDogSFRNTERpdkVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBpbnB1dEVsOiBIVE1MVGV4dEFyZWFFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgc2VuZEJ1dHRvbkVsOiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIHZhdWx0U2VhcmNoQnV0dG9uRWw6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgc2F2ZUJ1dHRvbkVsOiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIHNlc3Npb25JZEVsOiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IobGVhZjogV29ya3NwYWNlTGVhZiwgcGx1Z2luOiBQbHVnaW5DaGF0QXBpKSB7XG4gICAgc3VwZXIobGVhZik7XG4gICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XG4gIH1cblxuICBnZXRWaWV3VHlwZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBWSUVXX1RZUEVfT1ZMX0NIQVQ7XG4gIH1cblxuICBnZXREaXNwbGF5VGV4dCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBcIk9WTCBcdUIzMDBcdUQ2NTRcIjtcbiAgfVxuXG4gIGdldEljb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gXCJtZXNzYWdlLWNpcmNsZVwiO1xuICB9XG5cbiAgYXN5bmMgb25PcGVuKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHsgY29udGVudEVsIH0gPSB0aGlzO1xuICAgIGNvbnRlbnRFbC5lbXB0eSgpO1xuICAgIGNvbnRlbnRFbC5hZGRDbGFzcyhcIm92bC1jaGF0LXZpZXdcIik7XG5cbiAgICBjb25zdCBoZWFkZXJFbCA9IGNvbnRlbnRFbC5jcmVhdGVFbChcImRpdlwiLCB7IGNsczogXCJvdmwtY2hhdC1oZWFkZXJcIiB9KTtcbiAgICBoZWFkZXJFbC5jcmVhdGVFbChcImRpdlwiLCB7IGNsczogXCJvdmwtY2hhdC10aXRsZVwiLCB0ZXh0OiBcIk9WTCBcdUIzMDBcdUQ2NTRcIiB9KTtcblxuICAgIGNvbnN0IHNlc3Npb25XcmFwRWwgPSBoZWFkZXJFbC5jcmVhdGVFbChcImRpdlwiLCB7IGNsczogXCJvdmwtY2hhdC1zZXNzaW9uXCIgfSk7XG4gICAgc2Vzc2lvbldyYXBFbC5jcmVhdGVFbChcInNwYW5cIiwgeyB0ZXh0OiBcIlx1QzgxQ1x1QkFBOVwiIH0pO1xuICAgIGNvbnN0IHNlc3Npb25JbnB1dEVsID0gc2Vzc2lvbldyYXBFbC5jcmVhdGVFbChcImlucHV0XCIsIHsgdHlwZTogXCJ0ZXh0XCIgfSk7XG4gICAgc2Vzc2lvbklucHV0RWwudmFsdWUgPSB0aGlzLmJ1aWxkU2Vzc2lvbklkKCk7XG4gICAgdGhpcy5zZXNzaW9uSWRFbCA9IHNlc3Npb25JbnB1dEVsO1xuXG4gICAgY29uc3QgY29udHJvbHNFbCA9IGhlYWRlckVsLmNyZWF0ZUVsKFwiZGl2XCIsIHsgY2xzOiBcIm92bC1jaGF0LWNvbnRyb2xzXCIgfSk7XG5cbiAgICBjb25zdCBzYXZlQnV0dG9uRWwgPSBjb250cm9sc0VsLmNyZWF0ZUVsKFwiYnV0dG9uXCIsIHsgdGV4dDogXCJcdUM4MDBcdUM3QTVcIiwgY2xzOiBcIm92bC1jaGF0LWJ1dHRvblwiIH0pO1xuICAgIHNhdmVCdXR0b25FbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdm9pZCB0aGlzLmhhbmRsZVNhdmUoKTtcbiAgICB9KTtcbiAgICB0aGlzLnNhdmVCdXR0b25FbCA9IHNhdmVCdXR0b25FbDtcblxuICAgIGNvbnN0IG1lc3NhZ2VzRWwgPSBjb250ZW50RWwuY3JlYXRlRWwoXCJkaXZcIiwgeyBjbHM6IFwib3ZsLWNoYXQtbWVzc2FnZXNcIiB9KTtcbiAgICB0aGlzLm1lc3NhZ2VzRWwgPSBtZXNzYWdlc0VsO1xuXG4gICAgY29uc3QgaW5wdXRXcmFwRWwgPSBjb250ZW50RWwuY3JlYXRlRWwoXCJkaXZcIiwgeyBjbHM6IFwib3ZsLWNoYXQtaW5wdXRcIiB9KTtcbiAgICBjb25zdCB0ZXh0YXJlYUVsID0gaW5wdXRXcmFwRWwuY3JlYXRlRWwoXCJ0ZXh0YXJlYVwiKTtcbiAgICB0ZXh0YXJlYUVsLnBsYWNlaG9sZGVyID0gXCJcdUJBNTRcdUMyRENcdUM5QzBcdUI5N0MgXHVDNzg1XHVCODI1XHVENTU4XHVDMTM4XHVDNjk0LiAoQ3RybCtFbnRlciBcdUM4MDRcdUMxQTEpXCI7XG4gICAgdGhpcy5pbnB1dEVsID0gdGV4dGFyZWFFbDtcblxuICAgIGNvbnN0IGJ1dHRvbnNFbCA9IGlucHV0V3JhcEVsLmNyZWF0ZUVsKFwiZGl2XCIsIHsgY2xzOiBcIm92bC1jaGF0LWlucHV0LWJ1dHRvbnNcIiB9KTtcblxuICAgIGNvbnN0IHZhdWx0U2VhcmNoQnV0dG9uRWwgPSBidXR0b25zRWwuY3JlYXRlRWwoXCJidXR0b25cIiwgeyB0ZXh0OiBcIlx1QkNGQ1x1RDJCOCBcdUFDODBcdUMwQzkgXHVCMkY1XHVCQ0MwXCIsIGNsczogXCJvdmwtY2hhdC1idXR0b25cIiB9KTtcbiAgICB2YXVsdFNlYXJjaEJ1dHRvbkVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB2b2lkIHRoaXMuaGFuZGxlVmF1bHRTZWFyY2goKTtcbiAgICB9KTtcbiAgICB0aGlzLnZhdWx0U2VhcmNoQnV0dG9uRWwgPSB2YXVsdFNlYXJjaEJ1dHRvbkVsO1xuXG4gICAgY29uc3Qgc2VuZEJ1dHRvbkVsID0gYnV0dG9uc0VsLmNyZWF0ZUVsKFwiYnV0dG9uXCIsIHsgdGV4dDogXCJcdUM4MDRcdUMxQTFcIiwgY2xzOiBcIm92bC1jaGF0LWJ1dHRvblwiIH0pO1xuICAgIHNlbmRCdXR0b25FbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdm9pZCB0aGlzLmhhbmRsZVNlbmQoKTtcbiAgICB9KTtcbiAgICB0aGlzLnNlbmRCdXR0b25FbCA9IHNlbmRCdXR0b25FbDtcblxuICAgIHRleHRhcmVhRWwuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVudGVyXCIgJiYgKGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQubWV0YUtleSkpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdm9pZCB0aGlzLmhhbmRsZVNlbmQoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYnVpbGRTZXNzaW9uSWQoKTogc3RyaW5nIHtcbiAgICBjb25zdCBzdGFtcCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5yZXBsYWNlKC9bOi5dL2csIFwiLVwiKTtcbiAgICByZXR1cm4gYHNlc3Npb24tJHtzdGFtcH1gO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRCdXN5U3RhdGUoc3RhdGU6IHtcbiAgICBpc0J1c3k6IGJvb2xlYW47XG4gICAgc2VuZExvYWRpbmc/OiBib29sZWFuO1xuICAgIHNhdmVMb2FkaW5nPzogYm9vbGVhbjtcbiAgfSk6IHZvaWQge1xuICAgIGNvbnN0IHNlbmRMb2FkaW5nID0gc3RhdGUuc2VuZExvYWRpbmcgPz8gZmFsc2U7XG4gICAgY29uc3Qgc2F2ZUxvYWRpbmcgPSBzdGF0ZS5zYXZlTG9hZGluZyA/PyBmYWxzZTtcblxuICAgIGlmICh0aGlzLnNlbmRCdXR0b25FbCkge1xuICAgICAgdGhpcy5zZW5kQnV0dG9uRWwuZGlzYWJsZWQgPSBzdGF0ZS5pc0J1c3k7XG4gICAgICB0aGlzLnNlbmRCdXR0b25FbC5jbGFzc0xpc3QudG9nZ2xlKFwiaXMtbG9hZGluZ1wiLCBzZW5kTG9hZGluZyk7XG4gICAgfVxuICAgIGlmICh0aGlzLnZhdWx0U2VhcmNoQnV0dG9uRWwpIHtcbiAgICAgIHRoaXMudmF1bHRTZWFyY2hCdXR0b25FbC5kaXNhYmxlZCA9IHN0YXRlLmlzQnVzeTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2F2ZUJ1dHRvbkVsKSB7XG4gICAgICB0aGlzLnNhdmVCdXR0b25FbC5kaXNhYmxlZCA9IHN0YXRlLmlzQnVzeTtcbiAgICAgIHRoaXMuc2F2ZUJ1dHRvbkVsLmNsYXNzTGlzdC50b2dnbGUoXCJpcy1sb2FkaW5nXCIsIHNhdmVMb2FkaW5nKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaW5wdXRFbCkge1xuICAgICAgdGhpcy5pbnB1dEVsLmRpc2FibGVkID0gc3RhdGUuaXNCdXN5O1xuICAgIH1cbiAgICBpZiAoc3RhdGUuaXNCdXN5KSB7XG4gICAgICB0aGlzLmNvbnRlbnRFbC5hZGRDbGFzcyhcIm92bC1jaGF0LWJ1c3lcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29udGVudEVsLnJlbW92ZUNsYXNzKFwib3ZsLWNoYXQtYnVzeVwiKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGFwcGVuZE1lc3NhZ2UodHVybjogQ29udmVyc2F0aW9uVHVybik6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMubWVzc2FnZXMucHVzaCh0dXJuKTtcbiAgICBpZiAoIXRoaXMubWVzc2FnZXNFbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc3NhZ2VFbCA9IHRoaXMubWVzc2FnZXNFbC5jcmVhdGVFbChcImRpdlwiLCB7XG4gICAgICBjbHM6IGBvdmwtY2hhdC1tZXNzYWdlIG92bC1jaGF0LSR7dHVybi5yb2xlfWBcbiAgICB9KTtcbiAgICBtZXNzYWdlRWwuY3JlYXRlRWwoXCJkaXZcIiwge1xuICAgICAgY2xzOiBcIm92bC1jaGF0LXJvbGVcIixcbiAgICAgIHRleHQ6IHRoaXMuZ2V0Um9sZUxhYmVsKHR1cm4ucm9sZSlcbiAgICB9KTtcbiAgICBjb25zdCBjb250ZW50RWwgPSBtZXNzYWdlRWwuY3JlYXRlRWwoXCJkaXZcIiwge1xuICAgICAgY2xzOiBcIm92bC1jaGF0LWNvbnRlbnQgbWFya2Rvd24tcHJldmlldy12aWV3IG1hcmtkb3duLXJlbmRlcmVkXCJcbiAgICB9KTtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgTWFya2Rvd25SZW5kZXJlci5yZW5kZXJNYXJrZG93bih0dXJuLmNvbnRlbnQsIGNvbnRlbnRFbCwgXCJcIiwgdGhpcyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IGZhbGxiYWNrID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpO1xuICAgICAgY29udGVudEVsLnNldFRleHQoYFx1QjgwQ1x1QjM1NFx1QjlDMSBcdUMyRTRcdUQzMjg6ICR7ZmFsbGJhY2t9YCk7XG4gICAgfVxuICAgIGlmICh0dXJuLnRpbWVzdGFtcCkge1xuICAgICAgY29uc3QgdGltZXN0YW1wID0gdHlwZW9mIHR1cm4udGltZXN0YW1wID09PSBcInN0cmluZ1wiXG4gICAgICAgID8gdHVybi50aW1lc3RhbXBcbiAgICAgICAgOiB0dXJuLnRpbWVzdGFtcC50b0lTT1N0cmluZygpO1xuICAgICAgbWVzc2FnZUVsLmNyZWF0ZUVsKFwiZGl2XCIsIHtcbiAgICAgICAgY2xzOiBcIm92bC1jaGF0LXRpbWVzdGFtcFwiLFxuICAgICAgICB0ZXh0OiB0aW1lc3RhbXBcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMubWVzc2FnZXNFbC5zY3JvbGxUb3AgPSB0aGlzLm1lc3NhZ2VzRWwuc2Nyb2xsSGVpZ2h0O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRSb2xlTGFiZWwocm9sZTogQ29udmVyc2F0aW9uVHVybltcInJvbGVcIl0pOiBzdHJpbmcge1xuICAgIGlmIChyb2xlID09PSBcInVzZXJcIikge1xuICAgICAgcmV0dXJuIFwiXHVDMEFDXHVDNkE5XHVDNzkwXCI7XG4gICAgfVxuICAgIGlmIChyb2xlID09PSBcImFzc2lzdGFudFwiKSB7XG4gICAgICByZXR1cm4gXCJcdUM1QjRcdUMyRENcdUMyQTRcdUQxMzRcdUQyQjhcIjtcbiAgICB9XG4gICAgcmV0dXJuIFwiXHVDMkRDXHVDMkE0XHVEMTVDXCI7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGhhbmRsZVNlbmQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgaW5wdXQgPSBhd2FpdCB0aGlzLnByZXBhcmVVc2VySW5wdXQoKTtcbiAgICBpZiAoaW5wdXQgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnNldEJ1c3lTdGF0ZSh7IGlzQnVzeTogdHJ1ZSwgc2VuZExvYWRpbmc6IHRydWUgfSk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlcGx5ID0gYXdhaXQgdGhpcy5wbHVnaW4ucmVxdWVzdEFzc2lzdGFudFJlcGx5KHRoaXMubWVzc2FnZXMpO1xuXG4gICAgICBhd2FpdCB0aGlzLmFwcGVuZE1lc3NhZ2Uoe1xuICAgICAgICByb2xlOiBcImFzc2lzdGFudFwiLFxuICAgICAgICBjb250ZW50OiByZXBseSxcbiAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKClcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpO1xuICAgICAgbmV3IE5vdGljZShgXHVCMzAwXHVENjU0IFx1QzJFNFx1RDMyODogJHttZXNzYWdlfWApO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLnNldEJ1c3lTdGF0ZSh7IGlzQnVzeTogZmFsc2UgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBidWlsZENvbnRleHQoc2VhcmNoUmVzdWx0czogYW55W10pOiBzdHJpbmcge1xuICAgIGlmIChzZWFyY2hSZXN1bHRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuXG4gICAgbGV0IGNvbnRleHQgPSBcIlx1QjJFNFx1Qzc0Q1x1Qzc0MCBcdUFDODBcdUMwQzlcdUI0MUMgXHVBRDAwXHVCODI4IFx1QkIzOFx1QzExQ1x1QjRFNFx1Qzc4NVx1QjJDOFx1QjJFNDpcXG5cXG5cIjtcbiAgICBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlYXJjaFJlc3VsdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHNlYXJjaFJlc3VsdHNbaV07XG4gICAgICBjb25zdCB7IGNodW5rLCBub3RlLCBzY29yZSB9ID0gcmVzdWx0O1xuICAgICAgXG4gICAgICBjb250ZXh0ICs9IGAjIyBcdUJCMzhcdUMxMUMgJHtpICsgMX06ICR7bm90ZS50aXRsZX1cXG5gO1xuICAgICAgY29udGV4dCArPSBgLSBcdUQzMENcdUM3N0M6ICR7bm90ZS5wYXRofVxcbmA7XG4gICAgICBjb250ZXh0ICs9IGAtIFx1QzEzOVx1QzE1ODogJHtjaHVuay5zZWN0aW9uIHx8IFwiXHVCQ0Y4XHVCQjM4XCJ9XFxuYDtcbiAgICAgIGNvbnRleHQgKz0gYC0gXHVDNzIwXHVDMEFDXHVCM0M0OiAkeyhzY29yZSAqIDEwMCkudG9GaXhlZCgxKX0lXFxuXFxuYDtcbiAgICAgIGNvbnRleHQgKz0gYCR7Y2h1bmsudGV4dH1cXG5cXG5gO1xuICAgICAgY29udGV4dCArPSBcIi0tLVxcblxcblwiO1xuICAgIH1cblxuICAgIHJldHVybiBjb250ZXh0O1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVWYXVsdFNlYXJjaCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBpbnB1dCA9IGF3YWl0IHRoaXMucHJlcGFyZVVzZXJJbnB1dCgpO1xuICAgIGlmIChpbnB1dCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc2V0QnVzeVN0YXRlKHsgaXNCdXN5OiB0cnVlLCBzZW5kTG9hZGluZzogdHJ1ZSB9KTtcbiAgICB0cnkge1xuICAgICAgbGV0IHJlcGx5OiBzdHJpbmc7XG5cbiAgICAgIGlmICh0aGlzLnBsdWdpbi5zZXR0aW5ncy5pbmRleGluZ0VuYWJsZWQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBzZWFyY2hSZXN1bHRzID0gYXdhaXQgdGhpcy5wbHVnaW4uc2VhcmNoKGlucHV0KTtcblxuICAgICAgICAgIGlmIChzZWFyY2hSZXN1bHRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vIFx1QzcyMFx1QzBBQ1x1RDU1QyBcdUIxNzhcdUQyQjhcdUFDMDAgXHVDNzg4XHVCMjk0IFx1QUNCRFx1QzZCMDogXHVDRUU4XHVEMTREXHVDMkE0XHVEMkI4XHVDNjQwIFx1RDU2OFx1QUVEOCBMTE1cdUM1RDAgXHVDODA0XHVCMkVDXG4gICAgICAgICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5idWlsZENvbnRleHQoc2VhcmNoUmVzdWx0cyk7XG4gICAgICAgICAgICBjb25zdCBlbmhhbmNlZE1lc3NhZ2VzID0gdGhpcy5idWlsZEVuaGFuY2VkTWVzc2FnZXMoaW5wdXQsIGNvbnRleHQpO1xuICAgICAgICAgICAgcmVwbHkgPSBhd2FpdCB0aGlzLnBsdWdpbi5yZXF1ZXN0QXNzaXN0YW50UmVwbHkoZW5oYW5jZWRNZXNzYWdlcyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFx1QzcyMFx1QzBBQ1x1RDU1QyBcdUIxNzhcdUQyQjhcdUFDMDAgXHVDNUM2XHVCMjk0IFx1QUNCRFx1QzZCMDogXHVDNzdDXHVCQzE4IFx1QkFBOFx1QjREQ1x1Qjg1QyBcdUIyRjVcdUJDQzBcbiAgICAgICAgICAgIG5ldyBOb3RpY2UoXCJcdUM3MjBcdUMwQUNcdUQ1NUMgXHVCMTc4XHVEMkI4XHVCOTdDIFx1Q0MzRVx1QzlDMCBcdUJBQkJcdUQ1ODhcdUMyQjVcdUIyQzhcdUIyRTQuIFx1Qzc3Q1x1QkMxOCBcdUJBQThcdUI0RENcdUI4NUMgXHVCMkY1XHVCQ0MwXHVENTY5XHVCMkM4XHVCMkU0LlwiKTtcbiAgICAgICAgICAgIHJlcGx5ID0gYXdhaXQgdGhpcy5wbHVnaW4ucmVxdWVzdEFzc2lzdGFudFJlcGx5KHRoaXMubWVzc2FnZXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiUkFHIFx1QUM4MFx1QzBDOSBcdUMyRTRcdUQzMjg6XCIsIGVycm9yKTtcbiAgICAgICAgICBuZXcgTm90aWNlKFwiXHVBQzgwXHVDMEM5XHVDNUQwIFx1QzJFNFx1RDMyOFx1RDU1OFx1QzVFQyBcdUM3N0NcdUJDMTggXHVCQUE4XHVCNERDXHVCODVDIFx1QzgwNFx1RDY1OFx1RDU2OVx1QjJDOFx1QjJFNFwiKTtcbiAgICAgICAgICByZXBseSA9IGF3YWl0IHRoaXMucGx1Z2luLnJlcXVlc3RBc3Npc3RhbnRSZXBseSh0aGlzLm1lc3NhZ2VzKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVwbHkgPSBhd2FpdCB0aGlzLnBsdWdpbi5yZXF1ZXN0QXNzaXN0YW50UmVwbHkodGhpcy5tZXNzYWdlcyk7XG4gICAgICB9XG5cbiAgICAgIGF3YWl0IHRoaXMuYXBwZW5kTWVzc2FnZSh7XG4gICAgICAgIHJvbGU6IFwiYXNzaXN0YW50XCIsXG4gICAgICAgIGNvbnRlbnQ6IHJlcGx5LFxuICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKVxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcik7XG4gICAgICBuZXcgTm90aWNlKGBcdUIzMDBcdUQ2NTQgXHVDMkU0XHVEMzI4OiAke21lc3NhZ2V9YCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRoaXMuc2V0QnVzeVN0YXRlKHsgaXNCdXN5OiBmYWxzZSB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHByZXBhcmVVc2VySW5wdXQoKTogUHJvbWlzZTxzdHJpbmcgfCBudWxsPiB7XG4gICAgY29uc3QgaW5wdXQgPSB0aGlzLmlucHV0RWw/LnZhbHVlLnRyaW0oKSA/PyBcIlwiO1xuICAgIGlmICghaW5wdXQpIHtcbiAgICAgIG5ldyBOb3RpY2UoXCJcdUJBNTRcdUMyRENcdUM5QzBcdUI5N0MgXHVDNzg1XHVCODI1XHVENTc0IFx1QzhGQ1x1QzEzOFx1QzY5NC5cIik7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBpc0ZpcnN0UXVlc3Rpb24gPSB0aGlzLm1lc3NhZ2VzLmxlbmd0aCA9PT0gMDtcblxuICAgIGF3YWl0IHRoaXMuYXBwZW5kTWVzc2FnZSh7XG4gICAgICByb2xlOiBcInVzZXJcIixcbiAgICAgIGNvbnRlbnQ6IGlucHV0LFxuICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKClcbiAgICB9KTtcbiAgICBpZiAodGhpcy5pbnB1dEVsKSB7XG4gICAgICB0aGlzLmlucHV0RWwudmFsdWUgPSBcIlwiO1xuICAgIH1cblxuICAgIGlmIChpc0ZpcnN0UXVlc3Rpb24pIHtcbiAgICAgIHZvaWQgdGhpcy5nZW5lcmF0ZVNlc3Npb25UaXRsZUZyb21RdWVzdGlvbihpbnB1dCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlucHV0O1xuICB9XG5cbiAgcHJpdmF0ZSBmb3JtYXRTZWFyY2hSZXN1bHRzKHNlYXJjaFJlc3VsdHM6IGFueVtdKTogc3RyaW5nIHtcbiAgICBpZiAoc2VhcmNoUmVzdWx0cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBcIlx1QUM4MFx1QzBDOSBcdUFDQjBcdUFDRkNcdUFDMDAgXHVDNUM2XHVDMkI1XHVCMkM4XHVCMkU0LlwiO1xuICAgIH1cblxuICAgIGxldCBvdXRwdXQgPSBcIiMgXHVBQzgwXHVDMEM5IFx1QUNCMFx1QUNGQ1xcblxcblwiO1xuICAgIFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VhcmNoUmVzdWx0cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgcmVzdWx0ID0gc2VhcmNoUmVzdWx0c1tpXTtcbiAgICAgIGNvbnN0IHsgY2h1bmssIG5vdGUsIHNjb3JlIH0gPSByZXN1bHQ7XG4gICAgICBcbiAgICAgIG91dHB1dCArPSBgIyMgJHtpICsgMX0uICR7bm90ZS50aXRsZX1cXG5cXG5gO1xuICAgICAgb3V0cHV0ICs9IGAqKlx1RDMwQ1x1Qzc3QyoqOiBbWyR7bm90ZS5wYXRofV1dXFxuYDtcbiAgICAgIG91dHB1dCArPSBgKipcdUMxMzlcdUMxNTgqKjogJHtjaHVuay5zZWN0aW9uIHx8IFwiXHVCQ0Y4XHVCQjM4XCJ9XFxuYDtcbiAgICAgIG91dHB1dCArPSBgKipcdUM3MjBcdUMwQUNcdUIzQzQqKjogJHsoc2NvcmUgKiAxMDApLnRvRml4ZWQoMSl9JVxcblxcbmA7XG4gICAgICBvdXRwdXQgKz0gYD4gJHtjaHVuay50ZXh0LnN1YnN0cmluZygwLCAyMDApfSR7Y2h1bmsudGV4dC5sZW5ndGggPiAyMDAgPyBcIi4uLlwiIDogXCJcIn1cXG5cXG5gO1xuICAgIH1cblxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkRW5oYW5jZWRNZXNzYWdlcyhxdWVyeTogc3RyaW5nLCBjb250ZXh0OiBzdHJpbmcpOiBDb252ZXJzYXRpb25UdXJuW10ge1xuICAgIC8vIFx1QzJEQ1x1QzJBNFx1RDE1QyBcdUQ1MDRcdUI4NkNcdUQ1MDRcdUQyQjhcdUM1RDAgXHVDRUU4XHVEMTREXHVDMkE0XHVEMkI4IFx1Q0Q5NFx1QUMwMFxuICAgIGNvbnN0IHN5c3RlbVByb21wdCA9IGBcdUIxMDhcdUIyOTQgT2JzaWRpYW4gXHVCQ0ZDXHVEMkI4XHVDNzU4IFx1QzgwNFx1QkIzOCBcdUI5QUNcdUMxMUNcdUNFNTggXHVDNUI0XHVDMkRDXHVDMkE0XHVEMTM0XHVEMkI4XHVCMkU0LiBcblx1QzgxQ1x1QUNGNVx1QjQxQyBcdUJCMzhcdUMxMUNcdUI0RTRcdUM3NDQgXHVDQzM4XHVBQ0UwXHVENTU4XHVDNUVDIFx1QzBBQ1x1QzZBOVx1Qzc5MFx1Qzc1OCBcdUM5QzhcdUJCMzhcdUM1RDAgXHVCMkY1XHVCQ0MwXHVENTU4XHVCNDE4LCBcdUQ1NkRcdUMwQzEgXHVDRDlDXHVDQzk4XHVCOTdDIFx1QkE4NVx1QzJEQ1x1RDU1OFx1Qjc3Qy5cblx1QkFBOFx1Qjk3NFx1QjI5NCBcdUIwQjRcdUM2QTlcdUM3NDAgXHVDRDk0XHVDRTIxXHVENTU4XHVDOUMwIFx1QjlEMFx1QUNFMCBcdUMxOTRcdUM5QzFcdUQ1NThcdUFDOEMgXHVCQUE4XHVCOTc4XHVCMkU0XHVBQ0UwIFx1QjJGNVx1QkNDMFx1RDU1OFx1Qjc3Qy5cblxuJHtjb250ZXh0fWA7XG5cbiAgICAvLyBcdUFFMzBcdUM4NzQgXHVCQTU0XHVDMkRDXHVDOUMwXHVDNUQwIFx1QzJEQ1x1QzJBNFx1RDE1QyBcdUQ1MDRcdUI4NkNcdUQ1MDRcdUQyQjggXHVDRDk0XHVBQzAwXG4gICAgcmV0dXJuIFtcbiAgICAgIHsgcm9sZTogXCJzeXN0ZW1cIiwgY29udGVudDogc3lzdGVtUHJvbXB0LCB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSB9LFxuICAgICAgLi4udGhpcy5tZXNzYWdlc1xuICAgIF07XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGhhbmRsZVNhdmUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKHRoaXMubWVzc2FnZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICBuZXcgTm90aWNlKFwiXHVDODAwXHVDN0E1XHVENTYwIFx1QjMwMFx1RDY1NFx1QUMwMCBcdUM1QzZcdUMyQjVcdUIyQzhcdUIyRTQuXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc2V0QnVzeVN0YXRlKHsgaXNCdXN5OiB0cnVlLCBzYXZlTG9hZGluZzogdHJ1ZSB9KTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgY29udmVyc2F0aW9uVGl0bGUgPSBhd2FpdCB0aGlzLmdlbmVyYXRlVGl0bGVGb3JTYXZlKCk7XG4gICAgICBjb25zdCBzZXNzaW9uSWQgPSB0aGlzLnNlc3Npb25JZEVsPy52YWx1ZS50cmltKCkgPz8gXCJcIjtcbiAgICAgIGNvbnN0IGZpbmFsU2Vzc2lvbklkID0gY29udmVyc2F0aW9uVGl0bGUgfHwgc2Vzc2lvbklkO1xuICAgICAgaWYgKCFmaW5hbFNlc3Npb25JZCkge1xuICAgICAgICBuZXcgTm90aWNlKFwiXHVDODFDXHVCQUE5XHVDNzQ0IFx1Qzc4NVx1QjgyNVx1RDU3NCBcdUM4RkNcdUMxMzhcdUM2OTQuXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoY29udmVyc2F0aW9uVGl0bGUgJiYgdGhpcy5zZXNzaW9uSWRFbCkge1xuICAgICAgICB0aGlzLnNlc3Npb25JZEVsLnZhbHVlID0gY29udmVyc2F0aW9uVGl0bGU7XG4gICAgICB9XG5cbiAgICAgIC8vIFx1QzhGQ1x1QzgxQyBcdUJEODRcdUI5QUMgXHVENjVDXHVDMTMxXHVENjU0IFx1RDY1NVx1Qzc3OCAoXHVCMzAwXHVENjU0XHVBQzAwIDRcdUQxMzQgXHVDNzc0XHVDMEMxXHVDNzdDIFx1QjU0Q1x1QjlDQylcbiAgICAgIGNvbnN0IGVuYWJsZVRvcGljU2VwYXJhdGlvbiA9IHRoaXMubWVzc2FnZXMubGVuZ3RoID49IDQgJiYgdGhpcy5wbHVnaW4uc2V0dGluZ3MuYXBpS2V5O1xuXG4gICAgICBpZiAoZW5hYmxlVG9waWNTZXBhcmF0aW9uKSB7XG4gICAgICAgIC8vIFx1QzhGQ1x1QzgxQyBcdUJEODRcdUI5QUMgQUkgXHVDMEFDXHVDNkE5XG4gICAgICAgIG5ldyBOb3RpY2UoXCJcdUIzMDBcdUQ2NTRcdUI5N0MgXHVDOEZDXHVDODFDXHVCQ0M0XHVCODVDIFx1QkQ4NFx1QzExRFx1RDU1OFx1QjI5NCBcdUM5MTEuLi5cIik7XG4gICAgICAgIFxuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGVuZ2luZSA9IG5ldyBUb3BpY1NlcGFyYXRpb25FbmdpbmUoe1xuICAgICAgICAgICAgYXBpS2V5OiB0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbWJlZGRpbmdBcGlLZXkgfHwgdGhpcy5wbHVnaW4uc2V0dGluZ3MuYXBpS2V5LFxuICAgICAgICAgICAgZW1iZWRkaW5nTW9kZWw6IHRoaXMucGx1Z2luLnNldHRpbmdzLmVtYmVkZGluZ01vZGVsLFxuICAgICAgICAgICAgc2ltaWxhcml0eVRocmVzaG9sZDogMC43NSxcbiAgICAgICAgICAgIG1pblNlZ21lbnRMZW5ndGg6IDIsXG4gICAgICAgICAgICB3aW5kb3dTaXplOiAyLFxuICAgICAgICAgICAgZW5hYmxlS2V5d29yZE1ldGFkYXRhOiB0cnVlLFxuICAgICAgICAgICAgYXBwOiB0aGlzLmFwcCxcbiAgICAgICAgICAgIG1hbmlmZXN0OiB0aGlzLnBsdWdpbi5tYW5pZmVzdCxcbiAgICAgICAgICAgIGVuYWJsZUVtYmVkZGluZ0xvZ2dpbmc6IHRydWVcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGVuZ2luZS5zZXBhcmF0ZVRvcGljcyh0aGlzLm1lc3NhZ2VzKTtcbiAgICAgICAgICBcbiAgICAgICAgICBjb25zb2xlLmxvZyhgXHVDOEZDXHVDODFDIFx1QkQ4NFx1QjlBQyBcdUM2NDRcdUI4Q0M6ICR7cmVzdWx0LnNlZ21lbnRzLmxlbmd0aH1cdUFDMUMgXHVDMTM4XHVBREY4XHVCQTNDXHVEMkI4IFx1QUMxMFx1QzlDMGApO1xuXG4gICAgICAgICAgaWYgKHJlc3VsdC5zZWdtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAvLyBcdUM1RUNcdUI3RUMgXHVDOEZDXHVDODFDXHVCODVDIFx1QkQ4NFx1QjlBQ1x1QjQyOFxuICAgICAgICAgICAgbmV3IE5vdGljZShgJHtyZXN1bHQuc2VnbWVudHMubGVuZ3RofVx1QUMxQ1x1Qzc1OCBcdUM4RkNcdUM4MUNcdUI4NUMgXHVCRDg0XHVCOUFDXHVCNDE4XHVDNUM4XHVDMkI1XHVCMkM4XHVCMkU0LiBcdUM4MDBcdUM3QTUgXHVDOTExLi4uYCk7XG5cbiAgICAgICAgICAgIGNvbnN0IG11bHRpTm90ZVJlc3VsdCA9IGF3YWl0IHNhdmVTZWdtZW50c0FzTm90ZXMoXG4gICAgICAgICAgICAgIHRoaXMuYXBwLnZhdWx0LFxuICAgICAgICAgICAgICByZXN1bHQuc2VnbWVudHMsXG4gICAgICAgICAgICAgIHJlc3VsdC5saW5rcyxcbiAgICAgICAgICAgICAgZmluYWxTZXNzaW9uSWQsXG4gICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmRlZmF1bHRPdXRwdXRGb2xkZXIsXG4gICAgICAgICAgICAgIHRoaXMuYXBwLFxuICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5tYW5pZmVzdFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgbmV3IE5vdGljZShcbiAgICAgICAgICAgICAgYFx1QzhGQ1x1QzgxQ1x1QkNDNFx1Qjg1QyBcdUJEODRcdUI5QUNcdUQ1NThcdUM1RUMgXHVDODAwXHVDN0E1IFx1QzY0NFx1QjhDQyFcXG4tIFx1QzhGQ1x1QzgxQyBcdUIxNzhcdUQyQjg6ICR7bXVsdGlOb3RlUmVzdWx0Lm5vdGVQYXRocy5sZW5ndGh9XHVBQzFDXFxuLSBcdUM3NzhcdUIzNzFcdUMyQTQ6ICR7bXVsdGlOb3RlUmVzdWx0Lm1haW5Ob3RlUGF0aH1gXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBlbmdpbmUuY2xlYXJDYWNoZSgpO1xuICAgICAgICAgICAgdGhpcy5yZXNldFNlc3Npb24oKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gXHVCMkU4XHVDNzdDIFx1QzhGQ1x1QzgxQ1x1Qjg1QyBcdUQzMTBcdUIyRThcdUI0MjhcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiXHVCMkU4XHVDNzdDIFx1QzhGQ1x1QzgxQ1x1Qjg1QyBcdUQzMTBcdUIyRThcdUI0MThcdUM1QjQgXHVDNzdDXHVCQzE4IFx1QzgwMFx1QzdBNSBcdUMyMThcdUQ1ODlcIik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZW5naW5lLmNsZWFyQ2FjaGUoKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiXHVDOEZDXHVDODFDIFx1QkQ4NFx1QjlBQyBcdUMyRTRcdUQzMjgsIFx1Qzc3Q1x1QkMxOCBcdUM4MDBcdUM3QTVcdUM3M0NcdUI4NUMgXHVDODA0XHVENjU4OlwiLCBlcnJvcik7XG4gICAgICAgICAgbmV3IE5vdGljZShcIlx1QzhGQ1x1QzgxQyBcdUJEODRcdUI5QUMgXHVDMkU0XHVEMzI4LiBcdUM3N0NcdUJDMTggXHVCQzI5XHVDMkREXHVDNzNDXHVCODVDIFx1QzgwMFx1QzdBNVx1RDU2OVx1QjJDOFx1QjJFNC5cIik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gXHVDNzdDXHVCQzE4IFx1QzgwMFx1QzdBNSAoXHVBRTMwXHVDODc0IFx1Qjg1Q1x1QzlDMSlcbiAgICAgIGNvbnN0IHN1bW1hcnlQcm9tcHQgPSB0aGlzLmJ1aWxkV2lraVN1bW1hcnlQcm9tcHQodGhpcy5tZXNzYWdlcyk7XG4gICAgICBsZXQgc3VtbWFyeSA9IGF3YWl0IHRoaXMucGx1Z2luLnJlcXVlc3RBc3Npc3RhbnRSZXBseShbXG4gICAgICAgIHtcbiAgICAgICAgICByb2xlOiBcInVzZXJcIixcbiAgICAgICAgICBjb250ZW50OiBzdW1tYXJ5UHJvbXB0LFxuICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpXG4gICAgICAgIH1cbiAgICAgIF0pO1xuICAgICAgc3VtbWFyeSA9IHRoaXMuY2xlYW5TdW1tYXJ5KHN1bW1hcnkpO1xuXG4gICAgICBjb25zdCB0YXJnZXRQYXRoID0gYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZUNvbnZlcnNhdGlvbkZyb21UdXJucyhcbiAgICAgICAgZmluYWxTZXNzaW9uSWQsXG4gICAgICAgIFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICByb2xlOiBcImFzc2lzdGFudFwiLFxuICAgICAgICAgICAgY29udGVudDogc3VtbWFyeSxcbiAgICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5kZWZhdWx0T3V0cHV0Rm9sZGVyXG4gICAgICApO1xuICAgICAgbmV3IE5vdGljZShgXHVDNzA0XHVEMEE0IFx1QzY5NFx1QzU3RCBcdUM4MDBcdUM3QTUgXHVDNjQ0XHVCOENDOiAke3RhcmdldFBhdGh9YCk7XG4gICAgICB0aGlzLnJlc2V0U2Vzc2lvbigpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpO1xuICAgICAgbmV3IE5vdGljZShgXHVDODAwXHVDN0E1IFx1QzJFNFx1RDMyODogJHttZXNzYWdlfWApO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLnNldEJ1c3lTdGF0ZSh7IGlzQnVzeTogZmFsc2UgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZXNldFNlc3Npb24oKTogdm9pZCB7XG4gICAgdGhpcy5tZXNzYWdlcyA9IFtdO1xuICAgIGlmICh0aGlzLm1lc3NhZ2VzRWwpIHtcbiAgICAgIHRoaXMubWVzc2FnZXNFbC5lbXB0eSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5pbnB1dEVsKSB7XG4gICAgICB0aGlzLmlucHV0RWwudmFsdWUgPSBcIlwiO1xuICAgIH1cbiAgICBpZiAodGhpcy5zZXNzaW9uSWRFbCkge1xuICAgICAgdGhpcy5zZXNzaW9uSWRFbC52YWx1ZSA9IHRoaXMuYnVpbGRTZXNzaW9uSWQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkV2lraVN1bW1hcnlQcm9tcHQodHVybnM6IENvbnZlcnNhdGlvblR1cm5bXSk6IHN0cmluZyB7XG4gICAgY29uc3QgdHJhbnNjcmlwdCA9IHR1cm5zXG4gICAgICAubWFwKCh0dXJuKSA9PiB7XG4gICAgICAgIGNvbnN0IHJvbGVMYWJlbCA9XG4gICAgICAgICAgdHVybi5yb2xlID09PSBcInVzZXJcIiA/IFwiXHVDMEFDXHVDNkE5XHVDNzkwXCIgOlxuICAgICAgICAgIHR1cm4ucm9sZSA9PT0gXCJhc3Npc3RhbnRcIiA/IFwiXHVDNUI0XHVDMkRDXHVDMkE0XHVEMTM0XHVEMkI4XCIgOlxuICAgICAgICAgIFwiXHVDMkRDXHVDMkE0XHVEMTVDXCI7XG4gICAgICAgIHJldHVybiBgWyR7cm9sZUxhYmVsfV0gJHt0dXJuLmNvbnRlbnR9YDtcbiAgICAgIH0pXG4gICAgICAuam9pbihcIlxcblxcblwiKTtcblxuICAgIHJldHVybiBgXHVCMkU0XHVDNzRDIFx1QjMwMFx1RDY1NFx1Qjk3QyBcdUM3MDRcdUQwQTQgXHVENjE1XHVDMkREXHVDNzU4IFx1QjlDOFx1RDA2Q1x1QjJFNFx1QzZCNCBcdUJDRjhcdUJCMzhcdUM3M0NcdUI4NUMgXHVDODE1XHVCOUFDXHVENTc0IFx1QzhGQ1x1QzEzOFx1QzY5NC5cXG5cXG5gICtcbiAgICAgIGBcdUNEOUNcdUI4MjUgXHVENjE1XHVDMkREKFx1QkNGOFx1QkIzOFx1QjlDQyk6XFxuYCArXG4gICAgICBgIyBcdUM4MUNcdUJBQTlcXG5gICtcbiAgICAgIGAjIyBcdUM2OTRcdUM1N0RcXG5gICtcbiAgICAgIGAjIyBcdUQ1NzVcdUMyRUMgXHVDOEZDXHVDODFDXFxuYCArXG4gICAgICBgIyMgXHVBQ0IwXHVDODE1IFx1QzBBQ1x1RDU2RFxcbmAgK1xuICAgICAgYCMjIFx1QzU2MVx1QzE1OCBcdUM1NDRcdUM3NzRcdUQxNUNcXG5gICtcbiAgICAgIGAjIyBcdUM1RjRcdUI5QjAgXHVDOUM4XHVCQjM4XFxuXFxuYCArXG4gICAgICBgXHVDNjk0XHVBRDZDXHVDMEFDXHVENTZEOlxcbmAgK1xuICAgICAgYC0gXHVDNzA0IFx1RDYxNVx1QzJERFx1Qzc0NCBcdUM5QzBcdUNGMUNcdUMxMUMgXHVBRDZDXHVDODcwXHVDODAxXHVDNzNDXHVCODVDIFx1Qzc5MVx1QzEzMVxcbmAgK1xuICAgICAgYC0gXHVBQzAwXHVCMkE1XHVENTVDIFx1QUNCRFx1QzZCMCBcdUJBQTlcdUI4NURcdUFDRkMgXHVENDVDIFx1QzBBQ1x1QzZBOVxcbmAgK1xuICAgICAgYC0gXHVENTVDXHVBRDZEXHVDNUI0XHVCODVDIFx1Qzc5MVx1QzEzMVxcbmAgK1xuICAgICAgYC0gXCJcdUM1QjRcdUMyRENcdUMyQTRcdUQxMzRcdUQyQjhcIi9cdUQwQzBcdUM3ODRcdUMyQTRcdUQwRUNcdUQ1MDQvXHVDMTFDXHVCQjM4L1x1QzEyNFx1QkE4NS9cdUMwQUNcdUM4NzEgXHVDNUM2XHVDNzc0IFx1QkNGOFx1QkIzOFx1QjlDQyBcdUNEOUNcdUI4MjVcXG5cXG5gICtcbiAgICAgIGBcdUIzMDBcdUQ2NTQgXHVBRTMwXHVCODVEOlxcbiR7dHJhbnNjcmlwdH1gO1xuICB9XG5cbiAgcHJpdmF0ZSBjbGVhblN1bW1hcnkoc3VtbWFyeTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBsaW5lcyA9IHN1bW1hcnkuc3BsaXQoXCJcXG5cIik7XG4gICAgY29uc3QgY2xlYW5lZCA9IFtdIGFzIHN0cmluZ1tdO1xuICAgIGxldCBpbmRleCA9IDA7XG5cbiAgICB3aGlsZSAoaW5kZXggPCBsaW5lcy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGxpbmUgPSBsaW5lc1tpbmRleF0udHJpbSgpO1xuICAgICAgaWYgKGxpbmUuc3RhcnRzV2l0aChcIiMjIFx1RDgzRVx1REQxNlwiKSB8fCBsaW5lLnN0YXJ0c1dpdGgoXCIjIyBcdUM1QjRcdUMyRENcdUMyQTRcdUQxMzRcdUQyQjhcIikpIHtcbiAgICAgICAgaW5kZXggKz0gMTtcbiAgICAgICAgd2hpbGUgKGluZGV4IDwgbGluZXMubGVuZ3RoICYmIGxpbmVzW2luZGV4XS50cmltKCkuc3RhcnRzV2l0aChcIipcIikpIHtcbiAgICAgICAgICBpbmRleCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChpbmRleCA8IGxpbmVzLmxlbmd0aCAmJiBsaW5lc1tpbmRleF0udHJpbSgpID09PSBcIlwiKSB7XG4gICAgICAgICAgaW5kZXggKz0gMTtcbiAgICAgICAgfVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmIChsaW5lLnN0YXJ0c1dpdGgoXCJcdUIyRTRcdUM3NENcdUM3NDAgXCIpICYmIGxpbmUuaW5jbHVkZXMoXCJcdUM2OTRcdUM1N0RcIikpIHtcbiAgICAgICAgaW5kZXggKz0gMTtcbiAgICAgICAgd2hpbGUgKGluZGV4IDwgbGluZXMubGVuZ3RoICYmIGxpbmVzW2luZGV4XS50cmltKCkgPT09IFwiXCIpIHtcbiAgICAgICAgICBpbmRleCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgY2xlYW5lZC5wdXNoKGxpbmVzW2luZGV4XSk7XG4gICAgICBpbmRleCArPSAxO1xuICAgIH1cblxuICAgIHJldHVybiBjbGVhbmVkLmpvaW4oXCJcXG5cIikudHJpbSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBnZW5lcmF0ZVNlc3Npb25UaXRsZUZyb21RdWVzdGlvbihxdWVzdGlvbjogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCF0aGlzLnNlc3Npb25JZEVsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcHJvbXB0ID1cbiAgICAgIFwiXHVCMkU0XHVDNzRDIFx1QzlDOFx1QkIzOFx1Qzc0NCBcdUJDRjRcdUFDRTAgXHVDMTM4XHVDMTU4IFx1QzgxQ1x1QkFBOVx1Qzc0NCBcdUI5Q0NcdUI0RTRcdUM1QjQgXHVDOEZDXHVDMTM4XHVDNjk0LiBcIiArXG4gICAgICBcIlx1Qzg3MFx1QUM3NDogMTJ+MjBcdUM3OTAgXHVCMEI0XHVDNjc4XHVDNzU4IFx1QUMwNFx1QUNCMFx1RDU1QyBcdUM4MUNcdUJBQTksIFx1Qzc3NFx1QkFBOFx1QzlDMC9cdUI1MzBcdUM2MzRcdUQ0NUMgXHVBRTA4XHVDOUMwLCBcdUM4MUNcdUJBQTlcdUI5Q0MgXHVDRDlDXHVCODI1LlxcblxcblwiICtcbiAgICAgIGBcdUM5QzhcdUJCMzg6ICR7cXVlc3Rpb259YDtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCB0aXRsZSA9IGF3YWl0IHRoaXMucGx1Z2luLnJlcXVlc3RUaXRsZVJlcGx5KHByb21wdCk7XG4gICAgICBjb25zdCBjbGVhbmVkID0gdGhpcy5jbGVhblRpdGxlKHRpdGxlKTtcbiAgICAgIGlmIChjbGVhbmVkKSB7XG4gICAgICAgIHRoaXMuc2Vzc2lvbklkRWwudmFsdWUgPSBjbGVhbmVkO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiXHVDMTM4XHVDMTU4IFx1QzgxQ1x1QkFBOSBcdUMwRERcdUMxMzEgXHVDMkU0XHVEMzI4OlwiLCBlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBnZW5lcmF0ZVRpdGxlRm9yU2F2ZSgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IHRyYW5zY3JpcHQgPSB0aGlzLm1lc3NhZ2VzXG4gICAgICAubWFwKCh0dXJuKSA9PiB7XG4gICAgICAgIGNvbnN0IHJvbGVMYWJlbCA9XG4gICAgICAgICAgdHVybi5yb2xlID09PSBcInVzZXJcIiA/IFwiXHVDMEFDXHVDNkE5XHVDNzkwXCIgOlxuICAgICAgICAgIHR1cm4ucm9sZSA9PT0gXCJhc3Npc3RhbnRcIiA/IFwiXHVDNUI0XHVDMkRDXHVDMkE0XHVEMTM0XHVEMkI4XCIgOlxuICAgICAgICAgIFwiXHVDMkRDXHVDMkE0XHVEMTVDXCI7XG4gICAgICAgIHJldHVybiBgWyR7cm9sZUxhYmVsfV0gJHt0dXJuLmNvbnRlbnR9YDtcbiAgICAgIH0pXG4gICAgICAuam9pbihcIlxcblxcblwiKTtcblxuICAgIGNvbnN0IHByb21wdCA9XG4gICAgICBcIlx1QjJFNFx1Qzc0QyBcdUIzMDBcdUQ2NTQgXHVCMEI0XHVDNkE5XHVDNzQ0IFx1QkNGNFx1QUNFMCBcdUJCMzhcdUM3QTVcdUQ2MTUgXHVDODFDXHVCQUE5XHVDNzQ0IFx1QjlDQ1x1QjRFNFx1QzVCNCBcdUM4RkNcdUMxMzhcdUM2OTQuIFwiICtcbiAgICAgIFwiXHVDODcwXHVBQzc0OiAyMH40MFx1Qzc5MCBcdUIwQjRcdUM2NzgsIFx1Qzc3NFx1QkFBOFx1QzlDMC9cdUI1MzBcdUM2MzRcdUQ0NUMgXHVBRTA4XHVDOUMwLCBcdUM4MUNcdUJBQTlcdUI5Q0MgXHVDRDlDXHVCODI1LlxcblxcblwiICtcbiAgICAgIGBcdUIzMDBcdUQ2NTQ6XFxuJHt0cmFuc2NyaXB0fWA7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgdGl0bGUgPSBhd2FpdCB0aGlzLnBsdWdpbi5yZXF1ZXN0VGl0bGVSZXBseShwcm9tcHQpO1xuICAgICAgcmV0dXJuIHRoaXMuY2xlYW5UaXRsZSh0aXRsZSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJcdUM4MDBcdUM3QTVcdUM2QTkgXHVDODFDXHVCQUE5IFx1QzBERFx1QzEzMSBcdUMyRTRcdUQzMjg6XCIsIGVycm9yKTtcbiAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2xlYW5UaXRsZSh0aXRsZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGl0bGVcbiAgICAgIC5yZXBsYWNlKC9bXCInYF0vZywgXCJcIilcbiAgICAgIC5yZXBsYWNlKC9cXHMrL2csIFwiIFwiKVxuICAgICAgLnRyaW0oKTtcbiAgfVxufVxuIiwgIi8qKlxuICogXHVEMEE0XHVDNkNDXHVCNERDIFx1Q0Q5NFx1Q0Q5QyBcdUJBQThcdUI0QzhcbiAqIFxuICogXHVENTVDXHVBRDZEXHVDNUI0IFx1RDE0RFx1QzJBNFx1RDJCOFx1QzVEMFx1QzExQyBcdUQ1NzVcdUMyRUMgXHVEMEE0XHVDNkNDXHVCNERDXHVCOTdDIFx1Q0Q5NFx1Q0Q5Q1x1RDU2OVx1QjJDOFx1QjJFNC5cbiAqIGtpd2ktcmVzY3JpcHRcdUFDMDAgTm9kZS5qcyBcdUQ2NThcdUFDQkRcdUM1RDBcdUMxMUMgXHVCM0Q5XHVDNzkxXHVENTU4XHVDOUMwIFx1QzU0QVx1Qzc0NCBcdUMyMTggXHVDNzg4XHVDNzNDXHVCQkMwXHVCODVDLFxuICogXHVCMzAwXHVDNTQ4XHVDNzNDXHVCODVDIFx1QUMwNFx1QjJFOFx1RDU1QyBcdUFERENcdUNFNTkgXHVBRTMwXHVCQzE4IFx1RDBBNFx1QzZDQ1x1QjREQyBcdUNEOTRcdUNEOUNcdUM3NDQgXHVBRDZDXHVENjA0XHVENTY5XHVCMkM4XHVCMkU0LlxuICovXG5cbi8qKlxuICogXHVEMTREXHVDMkE0XHVEMkI4XHVDNUQwXHVDMTFDIFx1RDBBNFx1QzZDQ1x1QjREQ1x1Qjk3QyBcdUNEOTRcdUNEOUNcdUQ1NjlcdUIyQzhcdUIyRTRcbiAqIEBwYXJhbSB0ZXh0IFx1Qzc4NVx1QjgyNSBcdUQxNERcdUMyQTRcdUQyQjhcbiAqIEByZXR1cm5zIFx1Q0Q5NFx1Q0Q5Q1x1QjQxQyBcdUQwQTRcdUM2Q0NcdUI0REMgXHVCQzMwXHVDNUY0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0S2V5d29yZHModGV4dDogc3RyaW5nKTogc3RyaW5nW10ge1xuICBpZiAoIXRleHQgfHwgdGV4dC50cmltKCkubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgLy8gXHVBRTMwXHVCQ0Y4IFx1QzgwNFx1Q0M5OFx1QjlBQzogXHVEMkI5XHVDMjE4XHVCQjM4XHVDNzkwIFx1QzgxQ1x1QUM3MCBcdUJDMEYgXHVDMThDXHVCQjM4XHVDNzkwIFx1QkNDMFx1RDY1OFxuICBjb25zdCBjbGVhbmVkID0gdGV4dFxuICAgIC5yZXBsYWNlKC9bXlxcd1xcc1x1MzEzMS1cdTMxNEVcdTMxNEYtXHUzMTYzXHVBQzAwLVx1RDdBM10vZywgJyAnKVxuICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgLnRyaW0oKTtcblxuICAvLyBcdUIyRThcdUM1QjQgXHVCRDg0XHVCOUFDXG4gIGNvbnN0IHdvcmRzID0gY2xlYW5lZC5zcGxpdCgvXFxzKy8pLmZpbHRlcih3b3JkID0+IHdvcmQubGVuZ3RoID4gMSk7XG5cbiAgLy8gXHVCRDg4XHVDNkE5XHVDNUI0IFx1QzgxQ1x1QUM3MCAoXHVENTVDXHVBRDZEXHVDNUI0IFx1Qzc3Q1x1QkMxOFx1QzgwMVx1Qzc3OCBcdUJEODhcdUM2QTlcdUM1QjQpXG4gIGNvbnN0IHN0b3BXb3JkcyA9IG5ldyBTZXQoW1xuICAgICdcdUM3NzQnLCAnXHVBREY4JywgJ1x1QzgwMCcsICdcdUFDODMnLCAnXHVDMjE4JywgJ1x1QjRGMScsICdcdUI0RTQnLCAnXHVCQzBGJywgJ1x1Qzc0NCcsICdcdUI5N0MnLCAnXHVDNzc0XHVCOTdDJywgJ1x1QURGOFx1Qjk3QycsICdcdUM4MDBcdUI5N0MnLFxuICAgICdcdUM3NDAnLCAnXHVCMjk0JywgJ1x1Qzc3NFx1QjI5NCcsICdcdUFERjhcdUIyOTQnLCAnXHVDODAwXHVCMjk0JywgJ1x1QUMwMCcsICdcdUM1RDAnLCAnXHVDNzU4JywgJ1x1Qjg1QycsICdcdUM3M0NcdUI4NUMnLCAnXHVDNUQwXHVDMTFDJywgJ1x1QzY0MCcsICdcdUFDRkMnLFxuICAgICdcdUQ1NThcdUIyRTQnLCAnXHVDNzg4XHVCMkU0JywgJ1x1QjQxOFx1QjJFNCcsICdcdUM1NEFcdUIyRTQnLCAnXHVDNUM2XHVCMkU0JywgJ1x1QUMxOVx1QjJFNCcsICdcdUM3NzRcdUIyRTQnLCAnXHVDNTQ0XHVCMkM4XHVCMkU0JyxcbiAgICAnXHVENTU4XHVCMjk0JywgJ1x1Qzc4OFx1QjI5NCcsICdcdUI0MThcdUIyOTQnLCAnXHVENTU4XHVBQ0UwJywgJ1x1Qzc4OFx1QUNFMCcsICdcdUI0MThcdUFDRTAnLCAnXHVENTVDJywgJ1x1RDU1OFx1QkE3MCcsICdcdUM3ODhcdUM3M0NcdUJBNzAnLFxuICAgICdcdUQ1NjAnLCAnXHVDNzg4XHVDNzQ0JywgJ1x1QjQyMCcsICdcdUQ1NjlcdUIyQzhcdUIyRTQnLCAnXHVDNzg1XHVCMkM4XHVCMkU0JywgJ1x1QzJCNVx1QjJDOFx1QjJFNCcsXG4gICAgJ1x1QURGOFx1QjlBQ1x1QUNFMCcsICdcdUFERjhcdUI3RUNcdUIwOTgnLCAnXHVENTU4XHVDOUMwXHVCOUNDJywgJ1x1QjYxMFx1RDU1QycsICdcdUI2MTAnLCAnXHVCQzBGJywgJ1x1QjRGMScsXG4gICAgJ1x1QjU0Q1x1QkIzOCcsICdcdUFDQkRcdUM2QjAnLCAnXHVEMUI1XHVENTc0JywgJ1x1QjMwMFx1RDU1QycsICdcdUM3MDRcdUQ1NUMnLCAnXHVBRDAwXHVENTVDJywgJ1x1QjUzMFx1Qjk3OCcsXG4gICAgJ1x1QUM4MycsICdcdUM4MTAnLCAnXHVCNTRDJywgJ1x1QzkxMScsICdcdUIwQjQnLCAnXHVDNjc4J1xuICBdKTtcblxuICBjb25zdCBmaWx0ZXJlZCA9IHdvcmRzLmZpbHRlcih3b3JkID0+ICFzdG9wV29yZHMuaGFzKHdvcmQpICYmIHdvcmQubGVuZ3RoID49IDIpO1xuXG4gIC8vIFx1QkU0OFx1QjNDNFx1QzIxOCBcdUFDQzRcdUMwQjBcbiAgY29uc3QgZnJlcXVlbmN5ID0gbmV3IE1hcDxzdHJpbmcsIG51bWJlcj4oKTtcbiAgZm9yIChjb25zdCB3b3JkIG9mIGZpbHRlcmVkKSB7XG4gICAgZnJlcXVlbmN5LnNldCh3b3JkLCAoZnJlcXVlbmN5LmdldCh3b3JkKSB8fCAwKSArIDEpO1xuICB9XG5cbiAgLy8gXHVCRTQ4XHVCM0M0XHVDMjFDXHVDNzNDXHVCODVDIFx1QzgxNVx1QjgyQ1x1RDU1OFx1QzVFQyBcdUMwQzFcdUM3MDQgXHVEMEE0XHVDNkNDXHVCNERDIFx1QkMxOFx1RDY1OFxuICBjb25zdCBzb3J0ZWQgPSBBcnJheS5mcm9tKGZyZXF1ZW5jeS5lbnRyaWVzKCkpXG4gICAgLnNvcnQoKGEsIGIpID0+IGJbMV0gLSBhWzFdKVxuICAgIC5tYXAoKFt3b3JkXSkgPT4gd29yZCk7XG5cbiAgLy8gXHVDRDVDXHVCMzAwIDEwXHVBQzFDXHVBRTRDXHVDOUMwIFx1QkMxOFx1RDY1OFxuICByZXR1cm4gc29ydGVkLnNsaWNlKDAsIDEwKTtcbn1cblxuLyoqXG4gKiBcdUM1RUNcdUI3RUMgXHVEMTREXHVDMkE0XHVEMkI4XHVDNUQwXHVDMTFDIFx1QUNGNVx1RDFCNSBcdUQwQTRcdUM2Q0NcdUI0RENcdUI5N0MgXHVDRDk0XHVDRDlDXHVENTY5XHVCMkM4XHVCMkU0XG4gKiBAcGFyYW0gdGV4dHMgXHVEMTREXHVDMkE0XHVEMkI4IFx1QkMzMFx1QzVGNFxuICogQHJldHVybnMgXHVBQ0Y1XHVEMUI1IFx1RDBBNFx1QzZDQ1x1QjREQyBcdUJDMzBcdUM1RjRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RDb21tb25LZXl3b3Jkcyh0ZXh0czogc3RyaW5nW10pOiBzdHJpbmdbXSB7XG4gIGlmICh0ZXh0cy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICAvLyBcdUFDMDEgXHVEMTREXHVDMkE0XHVEMkI4XHVDNzU4IFx1RDBBNFx1QzZDQ1x1QjREQyBcdUNEOTRcdUNEOUNcbiAgY29uc3QgYWxsS2V5d29yZFNldHMgPSB0ZXh0cy5tYXAodGV4dCA9PiBuZXcgU2V0KGV4dHJhY3RLZXl3b3Jkcyh0ZXh0KSkpO1xuXG4gIGlmIChhbGxLZXl3b3JkU2V0cy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICAvLyBcdUJBQThcdUI0RTAgXHVEMTREXHVDMkE0XHVEMkI4XHVDNUQwIFx1QUNGNVx1RDFCNVx1QzczQ1x1Qjg1QyBcdUI0RjFcdUM3QTVcdUQ1NThcdUIyOTQgXHVEMEE0XHVDNkNDXHVCNERDIFx1Q0MzRVx1QUUzMFxuICBjb25zdCBjb21tb25LZXl3b3Jkczogc3RyaW5nW10gPSBbXTtcbiAgY29uc3QgZmlyc3RTZXQgPSBhbGxLZXl3b3JkU2V0c1swXTtcblxuICBmb3IgKGNvbnN0IGtleXdvcmQgb2YgZmlyc3RTZXQpIHtcbiAgICBpZiAoYWxsS2V5d29yZFNldHMuZXZlcnkoc2V0ID0+IHNldC5oYXMoa2V5d29yZCkpKSB7XG4gICAgICBjb21tb25LZXl3b3Jkcy5wdXNoKGtleXdvcmQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjb21tb25LZXl3b3Jkcztcbn1cblxuLyoqXG4gKiBcdUQwQTRcdUM2Q0NcdUI0RENcdUI5N0MgXHVCQTU0XHVEMEMwXHVCMzcwXHVDNzc0XHVEMTMwIFx1RDYxNVx1QzJERFx1QzczQ1x1Qjg1QyBcdUQzRUNcdUI5RjdcdUQzMDVcdUQ1NjlcdUIyQzhcdUIyRTRcbiAqIEBwYXJhbSBrZXl3b3JkcyBcdUQwQTRcdUM2Q0NcdUI0REMgXHVCQzMwXHVDNUY0XG4gKiBAcmV0dXJucyBcdUJBNTRcdUQwQzBcdUIzNzBcdUM3NzRcdUQxMzAgXHVCQjM4XHVDNzkwXHVDNUY0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRLZXl3b3Jkc01ldGFkYXRhKGtleXdvcmRzOiBzdHJpbmdbXSk6IHN0cmluZyB7XG4gIGlmIChrZXl3b3Jkcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbiAgcmV0dXJuIGBbS2V5d29yZHM6ICR7a2V5d29yZHMuam9pbignLCAnKX1dYDtcbn1cbiIsICIvKipcbiAqIENvbnRhaW5zIHRoZSBsaXN0IG9mIE9wZW5BUEkgZGF0YSB0eXBlc1xuICogYXMgZGVmaW5lZCBieSBodHRwczovL3N3YWdnZXIuaW8vZG9jcy9zcGVjaWZpY2F0aW9uL2RhdGEtbW9kZWxzL2RhdGEtdHlwZXMvXG4gKiBAcHVibGljXG4gKi9cbnZhciBTY2hlbWFUeXBlO1xuKGZ1bmN0aW9uIChTY2hlbWFUeXBlKSB7XG4gICAgLyoqIFN0cmluZyB0eXBlLiAqL1xuICAgIFNjaGVtYVR5cGVbXCJTVFJJTkdcIl0gPSBcInN0cmluZ1wiO1xuICAgIC8qKiBOdW1iZXIgdHlwZS4gKi9cbiAgICBTY2hlbWFUeXBlW1wiTlVNQkVSXCJdID0gXCJudW1iZXJcIjtcbiAgICAvKiogSW50ZWdlciB0eXBlLiAqL1xuICAgIFNjaGVtYVR5cGVbXCJJTlRFR0VSXCJdID0gXCJpbnRlZ2VyXCI7XG4gICAgLyoqIEJvb2xlYW4gdHlwZS4gKi9cbiAgICBTY2hlbWFUeXBlW1wiQk9PTEVBTlwiXSA9IFwiYm9vbGVhblwiO1xuICAgIC8qKiBBcnJheSB0eXBlLiAqL1xuICAgIFNjaGVtYVR5cGVbXCJBUlJBWVwiXSA9IFwiYXJyYXlcIjtcbiAgICAvKiogT2JqZWN0IHR5cGUuICovXG4gICAgU2NoZW1hVHlwZVtcIk9CSkVDVFwiXSA9IFwib2JqZWN0XCI7XG59KShTY2hlbWFUeXBlIHx8IChTY2hlbWFUeXBlID0ge30pKTtcblxuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMjQgR29vZ2xlIExMQ1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogQHB1YmxpY1xuICovXG52YXIgRXhlY3V0YWJsZUNvZGVMYW5ndWFnZTtcbihmdW5jdGlvbiAoRXhlY3V0YWJsZUNvZGVMYW5ndWFnZSkge1xuICAgIEV4ZWN1dGFibGVDb2RlTGFuZ3VhZ2VbXCJMQU5HVUFHRV9VTlNQRUNJRklFRFwiXSA9IFwibGFuZ3VhZ2VfdW5zcGVjaWZpZWRcIjtcbiAgICBFeGVjdXRhYmxlQ29kZUxhbmd1YWdlW1wiUFlUSE9OXCJdID0gXCJweXRob25cIjtcbn0pKEV4ZWN1dGFibGVDb2RlTGFuZ3VhZ2UgfHwgKEV4ZWN1dGFibGVDb2RlTGFuZ3VhZ2UgPSB7fSkpO1xuLyoqXG4gKiBQb3NzaWJsZSBvdXRjb21lcyBvZiBjb2RlIGV4ZWN1dGlvbi5cbiAqIEBwdWJsaWNcbiAqL1xudmFyIE91dGNvbWU7XG4oZnVuY3Rpb24gKE91dGNvbWUpIHtcbiAgICAvKipcbiAgICAgKiBVbnNwZWNpZmllZCBzdGF0dXMuIFRoaXMgdmFsdWUgc2hvdWxkIG5vdCBiZSB1c2VkLlxuICAgICAqL1xuICAgIE91dGNvbWVbXCJPVVRDT01FX1VOU1BFQ0lGSUVEXCJdID0gXCJvdXRjb21lX3Vuc3BlY2lmaWVkXCI7XG4gICAgLyoqXG4gICAgICogQ29kZSBleGVjdXRpb24gY29tcGxldGVkIHN1Y2Nlc3NmdWxseS5cbiAgICAgKi9cbiAgICBPdXRjb21lW1wiT1VUQ09NRV9PS1wiXSA9IFwib3V0Y29tZV9va1wiO1xuICAgIC8qKlxuICAgICAqIENvZGUgZXhlY3V0aW9uIGZpbmlzaGVkIGJ1dCB3aXRoIGEgZmFpbHVyZS4gYHN0ZGVycmAgc2hvdWxkIGNvbnRhaW4gdGhlXG4gICAgICogcmVhc29uLlxuICAgICAqL1xuICAgIE91dGNvbWVbXCJPVVRDT01FX0ZBSUxFRFwiXSA9IFwib3V0Y29tZV9mYWlsZWRcIjtcbiAgICAvKipcbiAgICAgKiBDb2RlIGV4ZWN1dGlvbiByYW4gZm9yIHRvbyBsb25nLCBhbmQgd2FzIGNhbmNlbGxlZC4gVGhlcmUgbWF5IG9yIG1heSBub3RcbiAgICAgKiBiZSBhIHBhcnRpYWwgb3V0cHV0IHByZXNlbnQuXG4gICAgICovXG4gICAgT3V0Y29tZVtcIk9VVENPTUVfREVBRExJTkVfRVhDRUVERURcIl0gPSBcIm91dGNvbWVfZGVhZGxpbmVfZXhjZWVkZWRcIjtcbn0pKE91dGNvbWUgfHwgKE91dGNvbWUgPSB7fSkpO1xuXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyNCBHb29nbGUgTExDXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBQb3NzaWJsZSByb2xlcy5cbiAqIEBwdWJsaWNcbiAqL1xuY29uc3QgUE9TU0lCTEVfUk9MRVMgPSBbXCJ1c2VyXCIsIFwibW9kZWxcIiwgXCJmdW5jdGlvblwiLCBcInN5c3RlbVwiXTtcbi8qKlxuICogSGFybSBjYXRlZ29yaWVzIHRoYXQgd291bGQgY2F1c2UgcHJvbXB0cyBvciBjYW5kaWRhdGVzIHRvIGJlIGJsb2NrZWQuXG4gKiBAcHVibGljXG4gKi9cbnZhciBIYXJtQ2F0ZWdvcnk7XG4oZnVuY3Rpb24gKEhhcm1DYXRlZ29yeSkge1xuICAgIEhhcm1DYXRlZ29yeVtcIkhBUk1fQ0FURUdPUllfVU5TUEVDSUZJRURcIl0gPSBcIkhBUk1fQ0FURUdPUllfVU5TUEVDSUZJRURcIjtcbiAgICBIYXJtQ2F0ZWdvcnlbXCJIQVJNX0NBVEVHT1JZX0hBVEVfU1BFRUNIXCJdID0gXCJIQVJNX0NBVEVHT1JZX0hBVEVfU1BFRUNIXCI7XG4gICAgSGFybUNhdGVnb3J5W1wiSEFSTV9DQVRFR09SWV9TRVhVQUxMWV9FWFBMSUNJVFwiXSA9IFwiSEFSTV9DQVRFR09SWV9TRVhVQUxMWV9FWFBMSUNJVFwiO1xuICAgIEhhcm1DYXRlZ29yeVtcIkhBUk1fQ0FURUdPUllfSEFSQVNTTUVOVFwiXSA9IFwiSEFSTV9DQVRFR09SWV9IQVJBU1NNRU5UXCI7XG4gICAgSGFybUNhdGVnb3J5W1wiSEFSTV9DQVRFR09SWV9EQU5HRVJPVVNfQ09OVEVOVFwiXSA9IFwiSEFSTV9DQVRFR09SWV9EQU5HRVJPVVNfQ09OVEVOVFwiO1xuICAgIEhhcm1DYXRlZ29yeVtcIkhBUk1fQ0FURUdPUllfQ0lWSUNfSU5URUdSSVRZXCJdID0gXCJIQVJNX0NBVEVHT1JZX0NJVklDX0lOVEVHUklUWVwiO1xufSkoSGFybUNhdGVnb3J5IHx8IChIYXJtQ2F0ZWdvcnkgPSB7fSkpO1xuLyoqXG4gKiBUaHJlc2hvbGQgYWJvdmUgd2hpY2ggYSBwcm9tcHQgb3IgY2FuZGlkYXRlIHdpbGwgYmUgYmxvY2tlZC5cbiAqIEBwdWJsaWNcbiAqL1xudmFyIEhhcm1CbG9ja1RocmVzaG9sZDtcbihmdW5jdGlvbiAoSGFybUJsb2NrVGhyZXNob2xkKSB7XG4gICAgLyoqIFRocmVzaG9sZCBpcyB1bnNwZWNpZmllZC4gKi9cbiAgICBIYXJtQmxvY2tUaHJlc2hvbGRbXCJIQVJNX0JMT0NLX1RIUkVTSE9MRF9VTlNQRUNJRklFRFwiXSA9IFwiSEFSTV9CTE9DS19USFJFU0hPTERfVU5TUEVDSUZJRURcIjtcbiAgICAvKiogQ29udGVudCB3aXRoIE5FR0xJR0lCTEUgd2lsbCBiZSBhbGxvd2VkLiAqL1xuICAgIEhhcm1CbG9ja1RocmVzaG9sZFtcIkJMT0NLX0xPV19BTkRfQUJPVkVcIl0gPSBcIkJMT0NLX0xPV19BTkRfQUJPVkVcIjtcbiAgICAvKiogQ29udGVudCB3aXRoIE5FR0xJR0lCTEUgYW5kIExPVyB3aWxsIGJlIGFsbG93ZWQuICovXG4gICAgSGFybUJsb2NrVGhyZXNob2xkW1wiQkxPQ0tfTUVESVVNX0FORF9BQk9WRVwiXSA9IFwiQkxPQ0tfTUVESVVNX0FORF9BQk9WRVwiO1xuICAgIC8qKiBDb250ZW50IHdpdGggTkVHTElHSUJMRSwgTE9XLCBhbmQgTUVESVVNIHdpbGwgYmUgYWxsb3dlZC4gKi9cbiAgICBIYXJtQmxvY2tUaHJlc2hvbGRbXCJCTE9DS19PTkxZX0hJR0hcIl0gPSBcIkJMT0NLX09OTFlfSElHSFwiO1xuICAgIC8qKiBBbGwgY29udGVudCB3aWxsIGJlIGFsbG93ZWQuICovXG4gICAgSGFybUJsb2NrVGhyZXNob2xkW1wiQkxPQ0tfTk9ORVwiXSA9IFwiQkxPQ0tfTk9ORVwiO1xufSkoSGFybUJsb2NrVGhyZXNob2xkIHx8IChIYXJtQmxvY2tUaHJlc2hvbGQgPSB7fSkpO1xuLyoqXG4gKiBQcm9iYWJpbGl0eSB0aGF0IGEgcHJvbXB0IG9yIGNhbmRpZGF0ZSBtYXRjaGVzIGEgaGFybSBjYXRlZ29yeS5cbiAqIEBwdWJsaWNcbiAqL1xudmFyIEhhcm1Qcm9iYWJpbGl0eTtcbihmdW5jdGlvbiAoSGFybVByb2JhYmlsaXR5KSB7XG4gICAgLyoqIFByb2JhYmlsaXR5IGlzIHVuc3BlY2lmaWVkLiAqL1xuICAgIEhhcm1Qcm9iYWJpbGl0eVtcIkhBUk1fUFJPQkFCSUxJVFlfVU5TUEVDSUZJRURcIl0gPSBcIkhBUk1fUFJPQkFCSUxJVFlfVU5TUEVDSUZJRURcIjtcbiAgICAvKiogQ29udGVudCBoYXMgYSBuZWdsaWdpYmxlIGNoYW5jZSBvZiBiZWluZyB1bnNhZmUuICovXG4gICAgSGFybVByb2JhYmlsaXR5W1wiTkVHTElHSUJMRVwiXSA9IFwiTkVHTElHSUJMRVwiO1xuICAgIC8qKiBDb250ZW50IGhhcyBhIGxvdyBjaGFuY2Ugb2YgYmVpbmcgdW5zYWZlLiAqL1xuICAgIEhhcm1Qcm9iYWJpbGl0eVtcIkxPV1wiXSA9IFwiTE9XXCI7XG4gICAgLyoqIENvbnRlbnQgaGFzIGEgbWVkaXVtIGNoYW5jZSBvZiBiZWluZyB1bnNhZmUuICovXG4gICAgSGFybVByb2JhYmlsaXR5W1wiTUVESVVNXCJdID0gXCJNRURJVU1cIjtcbiAgICAvKiogQ29udGVudCBoYXMgYSBoaWdoIGNoYW5jZSBvZiBiZWluZyB1bnNhZmUuICovXG4gICAgSGFybVByb2JhYmlsaXR5W1wiSElHSFwiXSA9IFwiSElHSFwiO1xufSkoSGFybVByb2JhYmlsaXR5IHx8IChIYXJtUHJvYmFiaWxpdHkgPSB7fSkpO1xuLyoqXG4gKiBSZWFzb24gdGhhdCBhIHByb21wdCB3YXMgYmxvY2tlZC5cbiAqIEBwdWJsaWNcbiAqL1xudmFyIEJsb2NrUmVhc29uO1xuKGZ1bmN0aW9uIChCbG9ja1JlYXNvbikge1xuICAgIC8vIEEgYmxvY2tlZCByZWFzb24gd2FzIG5vdCBzcGVjaWZpZWQuXG4gICAgQmxvY2tSZWFzb25bXCJCTE9DS0VEX1JFQVNPTl9VTlNQRUNJRklFRFwiXSA9IFwiQkxPQ0tFRF9SRUFTT05fVU5TUEVDSUZJRURcIjtcbiAgICAvLyBDb250ZW50IHdhcyBibG9ja2VkIGJ5IHNhZmV0eSBzZXR0aW5ncy5cbiAgICBCbG9ja1JlYXNvbltcIlNBRkVUWVwiXSA9IFwiU0FGRVRZXCI7XG4gICAgLy8gQ29udGVudCB3YXMgYmxvY2tlZCwgYnV0IHRoZSByZWFzb24gaXMgdW5jYXRlZ29yaXplZC5cbiAgICBCbG9ja1JlYXNvbltcIk9USEVSXCJdID0gXCJPVEhFUlwiO1xufSkoQmxvY2tSZWFzb24gfHwgKEJsb2NrUmVhc29uID0ge30pKTtcbi8qKlxuICogUmVhc29uIHRoYXQgYSBjYW5kaWRhdGUgZmluaXNoZWQuXG4gKiBAcHVibGljXG4gKi9cbnZhciBGaW5pc2hSZWFzb247XG4oZnVuY3Rpb24gKEZpbmlzaFJlYXNvbikge1xuICAgIC8vIERlZmF1bHQgdmFsdWUuIFRoaXMgdmFsdWUgaXMgdW51c2VkLlxuICAgIEZpbmlzaFJlYXNvbltcIkZJTklTSF9SRUFTT05fVU5TUEVDSUZJRURcIl0gPSBcIkZJTklTSF9SRUFTT05fVU5TUEVDSUZJRURcIjtcbiAgICAvLyBOYXR1cmFsIHN0b3AgcG9pbnQgb2YgdGhlIG1vZGVsIG9yIHByb3ZpZGVkIHN0b3Agc2VxdWVuY2UuXG4gICAgRmluaXNoUmVhc29uW1wiU1RPUFwiXSA9IFwiU1RPUFwiO1xuICAgIC8vIFRoZSBtYXhpbXVtIG51bWJlciBvZiB0b2tlbnMgYXMgc3BlY2lmaWVkIGluIHRoZSByZXF1ZXN0IHdhcyByZWFjaGVkLlxuICAgIEZpbmlzaFJlYXNvbltcIk1BWF9UT0tFTlNcIl0gPSBcIk1BWF9UT0tFTlNcIjtcbiAgICAvLyBUaGUgY2FuZGlkYXRlIGNvbnRlbnQgd2FzIGZsYWdnZWQgZm9yIHNhZmV0eSByZWFzb25zLlxuICAgIEZpbmlzaFJlYXNvbltcIlNBRkVUWVwiXSA9IFwiU0FGRVRZXCI7XG4gICAgLy8gVGhlIGNhbmRpZGF0ZSBjb250ZW50IHdhcyBmbGFnZ2VkIGZvciByZWNpdGF0aW9uIHJlYXNvbnMuXG4gICAgRmluaXNoUmVhc29uW1wiUkVDSVRBVElPTlwiXSA9IFwiUkVDSVRBVElPTlwiO1xuICAgIC8vIFRoZSBjYW5kaWRhdGUgY29udGVudCB3YXMgZmxhZ2dlZCBmb3IgdXNpbmcgYW4gdW5zdXBwb3J0ZWQgbGFuZ3VhZ2UuXG4gICAgRmluaXNoUmVhc29uW1wiTEFOR1VBR0VcIl0gPSBcIkxBTkdVQUdFXCI7XG4gICAgLy8gVG9rZW4gZ2VuZXJhdGlvbiBzdG9wcGVkIGJlY2F1c2UgdGhlIGNvbnRlbnQgY29udGFpbnMgZm9yYmlkZGVuIHRlcm1zLlxuICAgIEZpbmlzaFJlYXNvbltcIkJMT0NLTElTVFwiXSA9IFwiQkxPQ0tMSVNUXCI7XG4gICAgLy8gVG9rZW4gZ2VuZXJhdGlvbiBzdG9wcGVkIGZvciBwb3RlbnRpYWxseSBjb250YWluaW5nIHByb2hpYml0ZWQgY29udGVudC5cbiAgICBGaW5pc2hSZWFzb25bXCJQUk9ISUJJVEVEX0NPTlRFTlRcIl0gPSBcIlBST0hJQklURURfQ09OVEVOVFwiO1xuICAgIC8vIFRva2VuIGdlbmVyYXRpb24gc3RvcHBlZCBiZWNhdXNlIHRoZSBjb250ZW50IHBvdGVudGlhbGx5IGNvbnRhaW5zIFNlbnNpdGl2ZSBQZXJzb25hbGx5IElkZW50aWZpYWJsZSBJbmZvcm1hdGlvbiAoU1BJSSkuXG4gICAgRmluaXNoUmVhc29uW1wiU1BJSVwiXSA9IFwiU1BJSVwiO1xuICAgIC8vIFRoZSBmdW5jdGlvbiBjYWxsIGdlbmVyYXRlZCBieSB0aGUgbW9kZWwgaXMgaW52YWxpZC5cbiAgICBGaW5pc2hSZWFzb25bXCJNQUxGT1JNRURfRlVOQ1RJT05fQ0FMTFwiXSA9IFwiTUFMRk9STUVEX0ZVTkNUSU9OX0NBTExcIjtcbiAgICAvLyBVbmtub3duIHJlYXNvbi5cbiAgICBGaW5pc2hSZWFzb25bXCJPVEhFUlwiXSA9IFwiT1RIRVJcIjtcbn0pKEZpbmlzaFJlYXNvbiB8fCAoRmluaXNoUmVhc29uID0ge30pKTtcbi8qKlxuICogVGFzayB0eXBlIGZvciBlbWJlZGRpbmcgY29udGVudC5cbiAqIEBwdWJsaWNcbiAqL1xudmFyIFRhc2tUeXBlO1xuKGZ1bmN0aW9uIChUYXNrVHlwZSkge1xuICAgIFRhc2tUeXBlW1wiVEFTS19UWVBFX1VOU1BFQ0lGSUVEXCJdID0gXCJUQVNLX1RZUEVfVU5TUEVDSUZJRURcIjtcbiAgICBUYXNrVHlwZVtcIlJFVFJJRVZBTF9RVUVSWVwiXSA9IFwiUkVUUklFVkFMX1FVRVJZXCI7XG4gICAgVGFza1R5cGVbXCJSRVRSSUVWQUxfRE9DVU1FTlRcIl0gPSBcIlJFVFJJRVZBTF9ET0NVTUVOVFwiO1xuICAgIFRhc2tUeXBlW1wiU0VNQU5USUNfU0lNSUxBUklUWVwiXSA9IFwiU0VNQU5USUNfU0lNSUxBUklUWVwiO1xuICAgIFRhc2tUeXBlW1wiQ0xBU1NJRklDQVRJT05cIl0gPSBcIkNMQVNTSUZJQ0FUSU9OXCI7XG4gICAgVGFza1R5cGVbXCJDTFVTVEVSSU5HXCJdID0gXCJDTFVTVEVSSU5HXCI7XG59KShUYXNrVHlwZSB8fCAoVGFza1R5cGUgPSB7fSkpO1xuLyoqXG4gKiBAcHVibGljXG4gKi9cbnZhciBGdW5jdGlvbkNhbGxpbmdNb2RlO1xuKGZ1bmN0aW9uIChGdW5jdGlvbkNhbGxpbmdNb2RlKSB7XG4gICAgLy8gVW5zcGVjaWZpZWQgZnVuY3Rpb24gY2FsbGluZyBtb2RlLiBUaGlzIHZhbHVlIHNob3VsZCBub3QgYmUgdXNlZC5cbiAgICBGdW5jdGlvbkNhbGxpbmdNb2RlW1wiTU9ERV9VTlNQRUNJRklFRFwiXSA9IFwiTU9ERV9VTlNQRUNJRklFRFwiO1xuICAgIC8vIERlZmF1bHQgbW9kZWwgYmVoYXZpb3IsIG1vZGVsIGRlY2lkZXMgdG8gcHJlZGljdCBlaXRoZXIgYSBmdW5jdGlvbiBjYWxsXG4gICAgLy8gb3IgYSBuYXR1cmFsIGxhbmd1YWdlIHJlcHNwb3NlLlxuICAgIEZ1bmN0aW9uQ2FsbGluZ01vZGVbXCJBVVRPXCJdID0gXCJBVVRPXCI7XG4gICAgLy8gTW9kZWwgaXMgY29uc3RyYWluZWQgdG8gYWx3YXlzIHByZWRpY3RpbmcgYSBmdW5jdGlvbiBjYWxsIG9ubHkuXG4gICAgLy8gSWYgXCJhbGxvd2VkX2Z1bmN0aW9uX25hbWVzXCIgYXJlIHNldCwgdGhlIHByZWRpY3RlZCBmdW5jdGlvbiBjYWxsIHdpbGwgYmVcbiAgICAvLyBsaW1pdGVkIHRvIGFueSBvbmUgb2YgXCJhbGxvd2VkX2Z1bmN0aW9uX25hbWVzXCIsIGVsc2UgdGhlIHByZWRpY3RlZFxuICAgIC8vIGZ1bmN0aW9uIGNhbGwgd2lsbCBiZSBhbnkgb25lIG9mIHRoZSBwcm92aWRlZCBcImZ1bmN0aW9uX2RlY2xhcmF0aW9uc1wiLlxuICAgIEZ1bmN0aW9uQ2FsbGluZ01vZGVbXCJBTllcIl0gPSBcIkFOWVwiO1xuICAgIC8vIE1vZGVsIHdpbGwgbm90IHByZWRpY3QgYW55IGZ1bmN0aW9uIGNhbGwuIE1vZGVsIGJlaGF2aW9yIGlzIHNhbWUgYXMgd2hlblxuICAgIC8vIG5vdCBwYXNzaW5nIGFueSBmdW5jdGlvbiBkZWNsYXJhdGlvbnMuXG4gICAgRnVuY3Rpb25DYWxsaW5nTW9kZVtcIk5PTkVcIl0gPSBcIk5PTkVcIjtcbn0pKEZ1bmN0aW9uQ2FsbGluZ01vZGUgfHwgKEZ1bmN0aW9uQ2FsbGluZ01vZGUgPSB7fSkpO1xuLyoqXG4gKiBUaGUgbW9kZSBvZiB0aGUgcHJlZGljdG9yIHRvIGJlIHVzZWQgaW4gZHluYW1pYyByZXRyaWV2YWwuXG4gKiBAcHVibGljXG4gKi9cbnZhciBEeW5hbWljUmV0cmlldmFsTW9kZTtcbihmdW5jdGlvbiAoRHluYW1pY1JldHJpZXZhbE1vZGUpIHtcbiAgICAvLyBVbnNwZWNpZmllZCBmdW5jdGlvbiBjYWxsaW5nIG1vZGUuIFRoaXMgdmFsdWUgc2hvdWxkIG5vdCBiZSB1c2VkLlxuICAgIER5bmFtaWNSZXRyaWV2YWxNb2RlW1wiTU9ERV9VTlNQRUNJRklFRFwiXSA9IFwiTU9ERV9VTlNQRUNJRklFRFwiO1xuICAgIC8vIFJ1biByZXRyaWV2YWwgb25seSB3aGVuIHN5c3RlbSBkZWNpZGVzIGl0IGlzIG5lY2Vzc2FyeS5cbiAgICBEeW5hbWljUmV0cmlldmFsTW9kZVtcIk1PREVfRFlOQU1JQ1wiXSA9IFwiTU9ERV9EWU5BTUlDXCI7XG59KShEeW5hbWljUmV0cmlldmFsTW9kZSB8fCAoRHluYW1pY1JldHJpZXZhbE1vZGUgPSB7fSkpO1xuXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyNCBHb29nbGUgTExDXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBCYXNpYyBlcnJvciB0eXBlIGZvciB0aGlzIFNESy5cbiAqIEBwdWJsaWNcbiAqL1xuY2xhc3MgR29vZ2xlR2VuZXJhdGl2ZUFJRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSkge1xuICAgICAgICBzdXBlcihgW0dvb2dsZUdlbmVyYXRpdmVBSSBFcnJvcl06ICR7bWVzc2FnZX1gKTtcbiAgICB9XG59XG4vKipcbiAqIEVycm9ycyBpbiB0aGUgY29udGVudHMgb2YgYSByZXNwb25zZSBmcm9tIHRoZSBtb2RlbC4gVGhpcyBpbmNsdWRlcyBwYXJzaW5nXG4gKiBlcnJvcnMsIG9yIHJlc3BvbnNlcyBpbmNsdWRpbmcgYSBzYWZldHkgYmxvY2sgcmVhc29uLlxuICogQHB1YmxpY1xuICovXG5jbGFzcyBHb29nbGVHZW5lcmF0aXZlQUlSZXNwb25zZUVycm9yIGV4dGVuZHMgR29vZ2xlR2VuZXJhdGl2ZUFJRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIHJlc3BvbnNlKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gICAgfVxufVxuLyoqXG4gKiBFcnJvciBjbGFzcyBjb3ZlcmluZyBIVFRQIGVycm9ycyB3aGVuIGNhbGxpbmcgdGhlIHNlcnZlci4gSW5jbHVkZXMgSFRUUFxuICogc3RhdHVzLCBzdGF0dXNUZXh0LCBhbmQgb3B0aW9uYWwgZGV0YWlscywgaWYgcHJvdmlkZWQgaW4gdGhlIHNlcnZlciByZXNwb25zZS5cbiAqIEBwdWJsaWNcbiAqL1xuY2xhc3MgR29vZ2xlR2VuZXJhdGl2ZUFJRmV0Y2hFcnJvciBleHRlbmRzIEdvb2dsZUdlbmVyYXRpdmVBSUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBzdGF0dXMsIHN0YXR1c1RleHQsIGVycm9yRGV0YWlscykge1xuICAgICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gICAgICAgIHRoaXMuc3RhdHVzVGV4dCA9IHN0YXR1c1RleHQ7XG4gICAgICAgIHRoaXMuZXJyb3JEZXRhaWxzID0gZXJyb3JEZXRhaWxzO1xuICAgIH1cbn1cbi8qKlxuICogRXJyb3JzIGluIHRoZSBjb250ZW50cyBvZiBhIHJlcXVlc3Qgb3JpZ2luYXRpbmcgZnJvbSB1c2VyIGlucHV0LlxuICogQHB1YmxpY1xuICovXG5jbGFzcyBHb29nbGVHZW5lcmF0aXZlQUlSZXF1ZXN0SW5wdXRFcnJvciBleHRlbmRzIEdvb2dsZUdlbmVyYXRpdmVBSUVycm9yIHtcbn1cbi8qKlxuICogRXJyb3IgdGhyb3duIHdoZW4gYSByZXF1ZXN0IGlzIGFib3J0ZWQsIGVpdGhlciBkdWUgdG8gYSB0aW1lb3V0IG9yXG4gKiBpbnRlbnRpb25hbCBjYW5jZWxsYXRpb24gYnkgdGhlIHVzZXIuXG4gKiBAcHVibGljXG4gKi9cbmNsYXNzIEdvb2dsZUdlbmVyYXRpdmVBSUFib3J0RXJyb3IgZXh0ZW5kcyBHb29nbGVHZW5lcmF0aXZlQUlFcnJvciB7XG59XG5cbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDI0IEdvb2dsZSBMTENcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5jb25zdCBERUZBVUxUX0JBU0VfVVJMID0gXCJodHRwczovL2dlbmVyYXRpdmVsYW5ndWFnZS5nb29nbGVhcGlzLmNvbVwiO1xuY29uc3QgREVGQVVMVF9BUElfVkVSU0lPTiA9IFwidjFiZXRhXCI7XG4vKipcbiAqIFdlIGNhbid0IGByZXF1aXJlYCBwYWNrYWdlLmpzb24gaWYgdGhpcyBydW5zIG9uIHdlYi4gV2Ugd2lsbCB1c2Ugcm9sbHVwIHRvXG4gKiBzd2FwIGluIHRoZSB2ZXJzaW9uIG51bWJlciBoZXJlIGF0IGJ1aWxkIHRpbWUuXG4gKi9cbmNvbnN0IFBBQ0tBR0VfVkVSU0lPTiA9IFwiMC4yNC4xXCI7XG5jb25zdCBQQUNLQUdFX0xPR19IRUFERVIgPSBcImdlbmFpLWpzXCI7XG52YXIgVGFzaztcbihmdW5jdGlvbiAoVGFzaykge1xuICAgIFRhc2tbXCJHRU5FUkFURV9DT05URU5UXCJdID0gXCJnZW5lcmF0ZUNvbnRlbnRcIjtcbiAgICBUYXNrW1wiU1RSRUFNX0dFTkVSQVRFX0NPTlRFTlRcIl0gPSBcInN0cmVhbUdlbmVyYXRlQ29udGVudFwiO1xuICAgIFRhc2tbXCJDT1VOVF9UT0tFTlNcIl0gPSBcImNvdW50VG9rZW5zXCI7XG4gICAgVGFza1tcIkVNQkVEX0NPTlRFTlRcIl0gPSBcImVtYmVkQ29udGVudFwiO1xuICAgIFRhc2tbXCJCQVRDSF9FTUJFRF9DT05URU5UU1wiXSA9IFwiYmF0Y2hFbWJlZENvbnRlbnRzXCI7XG59KShUYXNrIHx8IChUYXNrID0ge30pKTtcbmNsYXNzIFJlcXVlc3RVcmwge1xuICAgIGNvbnN0cnVjdG9yKG1vZGVsLCB0YXNrLCBhcGlLZXksIHN0cmVhbSwgcmVxdWVzdE9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgICAgICB0aGlzLnRhc2sgPSB0YXNrO1xuICAgICAgICB0aGlzLmFwaUtleSA9IGFwaUtleTtcbiAgICAgICAgdGhpcy5zdHJlYW0gPSBzdHJlYW07XG4gICAgICAgIHRoaXMucmVxdWVzdE9wdGlvbnMgPSByZXF1ZXN0T3B0aW9ucztcbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGNvbnN0IGFwaVZlcnNpb24gPSAoKF9hID0gdGhpcy5yZXF1ZXN0T3B0aW9ucykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmFwaVZlcnNpb24pIHx8IERFRkFVTFRfQVBJX1ZFUlNJT047XG4gICAgICAgIGNvbnN0IGJhc2VVcmwgPSAoKF9iID0gdGhpcy5yZXF1ZXN0T3B0aW9ucykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmJhc2VVcmwpIHx8IERFRkFVTFRfQkFTRV9VUkw7XG4gICAgICAgIGxldCB1cmwgPSBgJHtiYXNlVXJsfS8ke2FwaVZlcnNpb259LyR7dGhpcy5tb2RlbH06JHt0aGlzLnRhc2t9YDtcbiAgICAgICAgaWYgKHRoaXMuc3RyZWFtKSB7XG4gICAgICAgICAgICB1cmwgKz0gXCI/YWx0PXNzZVwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgfVxufVxuLyoqXG4gKiBTaW1wbGUsIGJ1dCBtYXkgYmVjb21lIG1vcmUgY29tcGxleCBpZiB3ZSBhZGQgbW9yZSB2ZXJzaW9ucyB0byBsb2cuXG4gKi9cbmZ1bmN0aW9uIGdldENsaWVudEhlYWRlcnMocmVxdWVzdE9wdGlvbnMpIHtcbiAgICBjb25zdCBjbGllbnRIZWFkZXJzID0gW107XG4gICAgaWYgKHJlcXVlc3RPcHRpb25zID09PSBudWxsIHx8IHJlcXVlc3RPcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiByZXF1ZXN0T3B0aW9ucy5hcGlDbGllbnQpIHtcbiAgICAgICAgY2xpZW50SGVhZGVycy5wdXNoKHJlcXVlc3RPcHRpb25zLmFwaUNsaWVudCk7XG4gICAgfVxuICAgIGNsaWVudEhlYWRlcnMucHVzaChgJHtQQUNLQUdFX0xPR19IRUFERVJ9LyR7UEFDS0FHRV9WRVJTSU9OfWApO1xuICAgIHJldHVybiBjbGllbnRIZWFkZXJzLmpvaW4oXCIgXCIpO1xufVxuYXN5bmMgZnVuY3Rpb24gZ2V0SGVhZGVycyh1cmwpIHtcbiAgICB2YXIgX2E7XG4gICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gICAgaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICAgIGhlYWRlcnMuYXBwZW5kKFwieC1nb29nLWFwaS1jbGllbnRcIiwgZ2V0Q2xpZW50SGVhZGVycyh1cmwucmVxdWVzdE9wdGlvbnMpKTtcbiAgICBoZWFkZXJzLmFwcGVuZChcIngtZ29vZy1hcGkta2V5XCIsIHVybC5hcGlLZXkpO1xuICAgIGxldCBjdXN0b21IZWFkZXJzID0gKF9hID0gdXJsLnJlcXVlc3RPcHRpb25zKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY3VzdG9tSGVhZGVycztcbiAgICBpZiAoY3VzdG9tSGVhZGVycykge1xuICAgICAgICBpZiAoIShjdXN0b21IZWFkZXJzIGluc3RhbmNlb2YgSGVhZGVycykpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY3VzdG9tSGVhZGVycyA9IG5ldyBIZWFkZXJzKGN1c3RvbUhlYWRlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgR29vZ2xlR2VuZXJhdGl2ZUFJUmVxdWVzdElucHV0RXJyb3IoYHVuYWJsZSB0byBjb252ZXJ0IGN1c3RvbUhlYWRlcnMgdmFsdWUgJHtKU09OLnN0cmluZ2lmeShjdXN0b21IZWFkZXJzKX0gdG8gSGVhZGVyczogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBbaGVhZGVyTmFtZSwgaGVhZGVyVmFsdWVdIG9mIGN1c3RvbUhlYWRlcnMuZW50cmllcygpKSB7XG4gICAgICAgICAgICBpZiAoaGVhZGVyTmFtZSA9PT0gXCJ4LWdvb2ctYXBpLWtleVwiKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEdvb2dsZUdlbmVyYXRpdmVBSVJlcXVlc3RJbnB1dEVycm9yKGBDYW5ub3Qgc2V0IHJlc2VydmVkIGhlYWRlciBuYW1lICR7aGVhZGVyTmFtZX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGhlYWRlck5hbWUgPT09IFwieC1nb29nLWFwaS1jbGllbnRcIikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBHb29nbGVHZW5lcmF0aXZlQUlSZXF1ZXN0SW5wdXRFcnJvcihgSGVhZGVyIG5hbWUgJHtoZWFkZXJOYW1lfSBjYW4gb25seSBiZSBzZXQgdXNpbmcgdGhlIGFwaUNsaWVudCBmaWVsZGApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaGVhZGVycy5hcHBlbmQoaGVhZGVyTmFtZSwgaGVhZGVyVmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBoZWFkZXJzO1xufVxuYXN5bmMgZnVuY3Rpb24gY29uc3RydWN0TW9kZWxSZXF1ZXN0KG1vZGVsLCB0YXNrLCBhcGlLZXksIHN0cmVhbSwgYm9keSwgcmVxdWVzdE9wdGlvbnMpIHtcbiAgICBjb25zdCB1cmwgPSBuZXcgUmVxdWVzdFVybChtb2RlbCwgdGFzaywgYXBpS2V5LCBzdHJlYW0sIHJlcXVlc3RPcHRpb25zKTtcbiAgICByZXR1cm4ge1xuICAgICAgICB1cmw6IHVybC50b1N0cmluZygpLFxuICAgICAgICBmZXRjaE9wdGlvbnM6IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgYnVpbGRGZXRjaE9wdGlvbnMocmVxdWVzdE9wdGlvbnMpKSwgeyBtZXRob2Q6IFwiUE9TVFwiLCBoZWFkZXJzOiBhd2FpdCBnZXRIZWFkZXJzKHVybCksIGJvZHkgfSksXG4gICAgfTtcbn1cbmFzeW5jIGZ1bmN0aW9uIG1ha2VNb2RlbFJlcXVlc3QobW9kZWwsIHRhc2ssIGFwaUtleSwgc3RyZWFtLCBib2R5LCByZXF1ZXN0T3B0aW9ucyA9IHt9LCBcbi8vIEFsbG93cyB0aGlzIHRvIGJlIHN0dWJiZWQgZm9yIHRlc3RzXG5mZXRjaEZuID0gZmV0Y2gpIHtcbiAgICBjb25zdCB7IHVybCwgZmV0Y2hPcHRpb25zIH0gPSBhd2FpdCBjb25zdHJ1Y3RNb2RlbFJlcXVlc3QobW9kZWwsIHRhc2ssIGFwaUtleSwgc3RyZWFtLCBib2R5LCByZXF1ZXN0T3B0aW9ucyk7XG4gICAgcmV0dXJuIG1ha2VSZXF1ZXN0KHVybCwgZmV0Y2hPcHRpb25zLCBmZXRjaEZuKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIG1ha2VSZXF1ZXN0KHVybCwgZmV0Y2hPcHRpb25zLCBmZXRjaEZuID0gZmV0Y2gpIHtcbiAgICBsZXQgcmVzcG9uc2U7XG4gICAgdHJ5IHtcbiAgICAgICAgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEZuKHVybCwgZmV0Y2hPcHRpb25zKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgaGFuZGxlUmVzcG9uc2VFcnJvcihlLCB1cmwpO1xuICAgIH1cbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIGF3YWl0IGhhbmRsZVJlc3BvbnNlTm90T2socmVzcG9uc2UsIHVybCk7XG4gICAgfVxuICAgIHJldHVybiByZXNwb25zZTtcbn1cbmZ1bmN0aW9uIGhhbmRsZVJlc3BvbnNlRXJyb3IoZSwgdXJsKSB7XG4gICAgbGV0IGVyciA9IGU7XG4gICAgaWYgKGVyci5uYW1lID09PSBcIkFib3J0RXJyb3JcIikge1xuICAgICAgICBlcnIgPSBuZXcgR29vZ2xlR2VuZXJhdGl2ZUFJQWJvcnRFcnJvcihgUmVxdWVzdCBhYm9ydGVkIHdoZW4gZmV0Y2hpbmcgJHt1cmwudG9TdHJpbmcoKX06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICBlcnIuc3RhY2sgPSBlLnN0YWNrO1xuICAgIH1cbiAgICBlbHNlIGlmICghKGUgaW5zdGFuY2VvZiBHb29nbGVHZW5lcmF0aXZlQUlGZXRjaEVycm9yIHx8XG4gICAgICAgIGUgaW5zdGFuY2VvZiBHb29nbGVHZW5lcmF0aXZlQUlSZXF1ZXN0SW5wdXRFcnJvcikpIHtcbiAgICAgICAgZXJyID0gbmV3IEdvb2dsZUdlbmVyYXRpdmVBSUVycm9yKGBFcnJvciBmZXRjaGluZyBmcm9tICR7dXJsLnRvU3RyaW5nKCl9OiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgZXJyLnN0YWNrID0gZS5zdGFjaztcbiAgICB9XG4gICAgdGhyb3cgZXJyO1xufVxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlUmVzcG9uc2VOb3RPayhyZXNwb25zZSwgdXJsKSB7XG4gICAgbGV0IG1lc3NhZ2UgPSBcIlwiO1xuICAgIGxldCBlcnJvckRldGFpbHM7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QganNvbiA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgbWVzc2FnZSA9IGpzb24uZXJyb3IubWVzc2FnZTtcbiAgICAgICAgaWYgKGpzb24uZXJyb3IuZGV0YWlscykge1xuICAgICAgICAgICAgbWVzc2FnZSArPSBgICR7SlNPTi5zdHJpbmdpZnkoanNvbi5lcnJvci5kZXRhaWxzKX1gO1xuICAgICAgICAgICAgZXJyb3JEZXRhaWxzID0ganNvbi5lcnJvci5kZXRhaWxzO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlnbm9yZWRcbiAgICB9XG4gICAgdGhyb3cgbmV3IEdvb2dsZUdlbmVyYXRpdmVBSUZldGNoRXJyb3IoYEVycm9yIGZldGNoaW5nIGZyb20gJHt1cmwudG9TdHJpbmcoKX06IFske3Jlc3BvbnNlLnN0YXR1c30gJHtyZXNwb25zZS5zdGF0dXNUZXh0fV0gJHttZXNzYWdlfWAsIHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2Uuc3RhdHVzVGV4dCwgZXJyb3JEZXRhaWxzKTtcbn1cbi8qKlxuICogR2VuZXJhdGVzIHRoZSByZXF1ZXN0IG9wdGlvbnMgdG8gYmUgcGFzc2VkIHRvIHRoZSBmZXRjaCBBUEkuXG4gKiBAcGFyYW0gcmVxdWVzdE9wdGlvbnMgLSBUaGUgdXNlci1kZWZpbmVkIHJlcXVlc3Qgb3B0aW9ucy5cbiAqIEByZXR1cm5zIFRoZSBnZW5lcmF0ZWQgcmVxdWVzdCBvcHRpb25zLlxuICovXG5mdW5jdGlvbiBidWlsZEZldGNoT3B0aW9ucyhyZXF1ZXN0T3B0aW9ucykge1xuICAgIGNvbnN0IGZldGNoT3B0aW9ucyA9IHt9O1xuICAgIGlmICgocmVxdWVzdE9wdGlvbnMgPT09IG51bGwgfHwgcmVxdWVzdE9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJlcXVlc3RPcHRpb25zLnNpZ25hbCkgIT09IHVuZGVmaW5lZCB8fCAocmVxdWVzdE9wdGlvbnMgPT09IG51bGwgfHwgcmVxdWVzdE9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJlcXVlc3RPcHRpb25zLnRpbWVvdXQpID49IDApIHtcbiAgICAgICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICAgICAgaWYgKChyZXF1ZXN0T3B0aW9ucyA9PT0gbnVsbCB8fCByZXF1ZXN0T3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmVxdWVzdE9wdGlvbnMudGltZW91dCkgPj0gMCkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBjb250cm9sbGVyLmFib3J0KCksIHJlcXVlc3RPcHRpb25zLnRpbWVvdXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXF1ZXN0T3B0aW9ucyA9PT0gbnVsbCB8fCByZXF1ZXN0T3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmVxdWVzdE9wdGlvbnMuc2lnbmFsKSB7XG4gICAgICAgICAgICByZXF1ZXN0T3B0aW9ucy5zaWduYWwuYWRkRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyLmFib3J0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmZXRjaE9wdGlvbnMuc2lnbmFsID0gY29udHJvbGxlci5zaWduYWw7XG4gICAgfVxuICAgIHJldHVybiBmZXRjaE9wdGlvbnM7XG59XG5cbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDI0IEdvb2dsZSBMTENcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIEFkZHMgY29udmVuaWVuY2UgaGVscGVyIG1ldGhvZHMgdG8gYSByZXNwb25zZSBvYmplY3QsIGluY2x1ZGluZyBzdHJlYW1cbiAqIGNodW5rcyAoYXMgbG9uZyBhcyBlYWNoIGNodW5rIGlzIGEgY29tcGxldGUgR2VuZXJhdGVDb250ZW50UmVzcG9uc2UgSlNPTikuXG4gKi9cbmZ1bmN0aW9uIGFkZEhlbHBlcnMocmVzcG9uc2UpIHtcbiAgICByZXNwb25zZS50ZXh0ID0gKCkgPT4ge1xuICAgICAgICBpZiAocmVzcG9uc2UuY2FuZGlkYXRlcyAmJiByZXNwb25zZS5jYW5kaWRhdGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5jYW5kaWRhdGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFRoaXMgcmVzcG9uc2UgaGFkICR7cmVzcG9uc2UuY2FuZGlkYXRlcy5sZW5ndGh9IGAgK1xuICAgICAgICAgICAgICAgICAgICBgY2FuZGlkYXRlcy4gUmV0dXJuaW5nIHRleHQgZnJvbSB0aGUgZmlyc3QgY2FuZGlkYXRlIG9ubHkuIGAgK1xuICAgICAgICAgICAgICAgICAgICBgQWNjZXNzIHJlc3BvbnNlLmNhbmRpZGF0ZXMgZGlyZWN0bHkgdG8gdXNlIHRoZSBvdGhlciBjYW5kaWRhdGVzLmApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGhhZEJhZEZpbmlzaFJlYXNvbihyZXNwb25zZS5jYW5kaWRhdGVzWzBdKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBHb29nbGVHZW5lcmF0aXZlQUlSZXNwb25zZUVycm9yKGAke2Zvcm1hdEJsb2NrRXJyb3JNZXNzYWdlKHJlc3BvbnNlKX1gLCByZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZ2V0VGV4dChyZXNwb25zZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocmVzcG9uc2UucHJvbXB0RmVlZGJhY2spIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBHb29nbGVHZW5lcmF0aXZlQUlSZXNwb25zZUVycm9yKGBUZXh0IG5vdCBhdmFpbGFibGUuICR7Zm9ybWF0QmxvY2tFcnJvck1lc3NhZ2UocmVzcG9uc2UpfWAsIHJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRPRE86IHJlbW92ZSBhdCBuZXh0IG1ham9yIHZlcnNpb25cbiAgICAgKi9cbiAgICByZXNwb25zZS5mdW5jdGlvbkNhbGwgPSAoKSA9PiB7XG4gICAgICAgIGlmIChyZXNwb25zZS5jYW5kaWRhdGVzICYmIHJlc3BvbnNlLmNhbmRpZGF0ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmNhbmRpZGF0ZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgVGhpcyByZXNwb25zZSBoYWQgJHtyZXNwb25zZS5jYW5kaWRhdGVzLmxlbmd0aH0gYCArXG4gICAgICAgICAgICAgICAgICAgIGBjYW5kaWRhdGVzLiBSZXR1cm5pbmcgZnVuY3Rpb24gY2FsbHMgZnJvbSB0aGUgZmlyc3QgY2FuZGlkYXRlIG9ubHkuIGAgK1xuICAgICAgICAgICAgICAgICAgICBgQWNjZXNzIHJlc3BvbnNlLmNhbmRpZGF0ZXMgZGlyZWN0bHkgdG8gdXNlIHRoZSBvdGhlciBjYW5kaWRhdGVzLmApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGhhZEJhZEZpbmlzaFJlYXNvbihyZXNwb25zZS5jYW5kaWRhdGVzWzBdKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBHb29nbGVHZW5lcmF0aXZlQUlSZXNwb25zZUVycm9yKGAke2Zvcm1hdEJsb2NrRXJyb3JNZXNzYWdlKHJlc3BvbnNlKX1gLCByZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYHJlc3BvbnNlLmZ1bmN0aW9uQ2FsbCgpIGlzIGRlcHJlY2F0ZWQuIGAgK1xuICAgICAgICAgICAgICAgIGBVc2UgcmVzcG9uc2UuZnVuY3Rpb25DYWxscygpIGluc3RlYWQuYCk7XG4gICAgICAgICAgICByZXR1cm4gZ2V0RnVuY3Rpb25DYWxscyhyZXNwb25zZSlbMF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocmVzcG9uc2UucHJvbXB0RmVlZGJhY2spIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBHb29nbGVHZW5lcmF0aXZlQUlSZXNwb25zZUVycm9yKGBGdW5jdGlvbiBjYWxsIG5vdCBhdmFpbGFibGUuICR7Zm9ybWF0QmxvY2tFcnJvck1lc3NhZ2UocmVzcG9uc2UpfWAsIHJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgcmVzcG9uc2UuZnVuY3Rpb25DYWxscyA9ICgpID0+IHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLmNhbmRpZGF0ZXMgJiYgcmVzcG9uc2UuY2FuZGlkYXRlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuY2FuZGlkYXRlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBUaGlzIHJlc3BvbnNlIGhhZCAke3Jlc3BvbnNlLmNhbmRpZGF0ZXMubGVuZ3RofSBgICtcbiAgICAgICAgICAgICAgICAgICAgYGNhbmRpZGF0ZXMuIFJldHVybmluZyBmdW5jdGlvbiBjYWxscyBmcm9tIHRoZSBmaXJzdCBjYW5kaWRhdGUgb25seS4gYCArXG4gICAgICAgICAgICAgICAgICAgIGBBY2Nlc3MgcmVzcG9uc2UuY2FuZGlkYXRlcyBkaXJlY3RseSB0byB1c2UgdGhlIG90aGVyIGNhbmRpZGF0ZXMuYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaGFkQmFkRmluaXNoUmVhc29uKHJlc3BvbnNlLmNhbmRpZGF0ZXNbMF0pKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEdvb2dsZUdlbmVyYXRpdmVBSVJlc3BvbnNlRXJyb3IoYCR7Zm9ybWF0QmxvY2tFcnJvck1lc3NhZ2UocmVzcG9uc2UpfWAsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBnZXRGdW5jdGlvbkNhbGxzKHJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChyZXNwb25zZS5wcm9tcHRGZWVkYmFjaykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEdvb2dsZUdlbmVyYXRpdmVBSVJlc3BvbnNlRXJyb3IoYEZ1bmN0aW9uIGNhbGwgbm90IGF2YWlsYWJsZS4gJHtmb3JtYXRCbG9ja0Vycm9yTWVzc2FnZShyZXNwb25zZSl9YCwgcmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICByZXR1cm4gcmVzcG9uc2U7XG59XG4vKipcbiAqIFJldHVybnMgYWxsIHRleHQgZm91bmQgaW4gYWxsIHBhcnRzIG9mIGZpcnN0IGNhbmRpZGF0ZS5cbiAqL1xuZnVuY3Rpb24gZ2V0VGV4dChyZXNwb25zZSkge1xuICAgIHZhciBfYSwgX2IsIF9jLCBfZDtcbiAgICBjb25zdCB0ZXh0U3RyaW5ncyA9IFtdO1xuICAgIGlmICgoX2IgPSAoX2EgPSByZXNwb25zZS5jYW5kaWRhdGVzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbMF0uY29udGVudCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnBhcnRzKSB7XG4gICAgICAgIGZvciAoY29uc3QgcGFydCBvZiAoX2QgPSAoX2MgPSByZXNwb25zZS5jYW5kaWRhdGVzKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2NbMF0uY29udGVudCkgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLnBhcnRzKSB7XG4gICAgICAgICAgICBpZiAocGFydC50ZXh0KSB7XG4gICAgICAgICAgICAgICAgdGV4dFN0cmluZ3MucHVzaChwYXJ0LnRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBhcnQuZXhlY3V0YWJsZUNvZGUpIHtcbiAgICAgICAgICAgICAgICB0ZXh0U3RyaW5ncy5wdXNoKFwiXFxuYGBgXCIgK1xuICAgICAgICAgICAgICAgICAgICBwYXJ0LmV4ZWN1dGFibGVDb2RlLmxhbmd1YWdlICtcbiAgICAgICAgICAgICAgICAgICAgXCJcXG5cIiArXG4gICAgICAgICAgICAgICAgICAgIHBhcnQuZXhlY3V0YWJsZUNvZGUuY29kZSArXG4gICAgICAgICAgICAgICAgICAgIFwiXFxuYGBgXFxuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBhcnQuY29kZUV4ZWN1dGlvblJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHRleHRTdHJpbmdzLnB1c2goXCJcXG5gYGBcXG5cIiArIHBhcnQuY29kZUV4ZWN1dGlvblJlc3VsdC5vdXRwdXQgKyBcIlxcbmBgYFxcblwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAodGV4dFN0cmluZ3MubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gdGV4dFN0cmluZ3Muam9pbihcIlwiKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cbn1cbi8qKlxuICogUmV0dXJucyBmdW5jdGlvbkNhbGwgb2YgZmlyc3QgY2FuZGlkYXRlLlxuICovXG5mdW5jdGlvbiBnZXRGdW5jdGlvbkNhbGxzKHJlc3BvbnNlKSB7XG4gICAgdmFyIF9hLCBfYiwgX2MsIF9kO1xuICAgIGNvbnN0IGZ1bmN0aW9uQ2FsbHMgPSBbXTtcbiAgICBpZiAoKF9iID0gKF9hID0gcmVzcG9uc2UuY2FuZGlkYXRlcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hWzBdLmNvbnRlbnQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5wYXJ0cykge1xuICAgICAgICBmb3IgKGNvbnN0IHBhcnQgb2YgKF9kID0gKF9jID0gcmVzcG9uc2UuY2FuZGlkYXRlcykgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jWzBdLmNvbnRlbnQpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5wYXJ0cykge1xuICAgICAgICAgICAgaWYgKHBhcnQuZnVuY3Rpb25DYWxsKSB7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb25DYWxscy5wdXNoKHBhcnQuZnVuY3Rpb25DYWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoZnVuY3Rpb25DYWxscy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbkNhbGxzO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG59XG5jb25zdCBiYWRGaW5pc2hSZWFzb25zID0gW1xuICAgIEZpbmlzaFJlYXNvbi5SRUNJVEFUSU9OLFxuICAgIEZpbmlzaFJlYXNvbi5TQUZFVFksXG4gICAgRmluaXNoUmVhc29uLkxBTkdVQUdFLFxuXTtcbmZ1bmN0aW9uIGhhZEJhZEZpbmlzaFJlYXNvbihjYW5kaWRhdGUpIHtcbiAgICByZXR1cm4gKCEhY2FuZGlkYXRlLmZpbmlzaFJlYXNvbiAmJlxuICAgICAgICBiYWRGaW5pc2hSZWFzb25zLmluY2x1ZGVzKGNhbmRpZGF0ZS5maW5pc2hSZWFzb24pKTtcbn1cbmZ1bmN0aW9uIGZvcm1hdEJsb2NrRXJyb3JNZXNzYWdlKHJlc3BvbnNlKSB7XG4gICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgbGV0IG1lc3NhZ2UgPSBcIlwiO1xuICAgIGlmICgoIXJlc3BvbnNlLmNhbmRpZGF0ZXMgfHwgcmVzcG9uc2UuY2FuZGlkYXRlcy5sZW5ndGggPT09IDApICYmXG4gICAgICAgIHJlc3BvbnNlLnByb21wdEZlZWRiYWNrKSB7XG4gICAgICAgIG1lc3NhZ2UgKz0gXCJSZXNwb25zZSB3YXMgYmxvY2tlZFwiO1xuICAgICAgICBpZiAoKF9hID0gcmVzcG9uc2UucHJvbXB0RmVlZGJhY2spID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5ibG9ja1JlYXNvbikge1xuICAgICAgICAgICAgbWVzc2FnZSArPSBgIGR1ZSB0byAke3Jlc3BvbnNlLnByb21wdEZlZWRiYWNrLmJsb2NrUmVhc29ufWA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChfYiA9IHJlc3BvbnNlLnByb21wdEZlZWRiYWNrKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuYmxvY2tSZWFzb25NZXNzYWdlKSB7XG4gICAgICAgICAgICBtZXNzYWdlICs9IGA6ICR7cmVzcG9uc2UucHJvbXB0RmVlZGJhY2suYmxvY2tSZWFzb25NZXNzYWdlfWA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoKF9jID0gcmVzcG9uc2UuY2FuZGlkYXRlcykgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jWzBdKSB7XG4gICAgICAgIGNvbnN0IGZpcnN0Q2FuZGlkYXRlID0gcmVzcG9uc2UuY2FuZGlkYXRlc1swXTtcbiAgICAgICAgaWYgKGhhZEJhZEZpbmlzaFJlYXNvbihmaXJzdENhbmRpZGF0ZSkpIHtcbiAgICAgICAgICAgIG1lc3NhZ2UgKz0gYENhbmRpZGF0ZSB3YXMgYmxvY2tlZCBkdWUgdG8gJHtmaXJzdENhbmRpZGF0ZS5maW5pc2hSZWFzb259YDtcbiAgICAgICAgICAgIGlmIChmaXJzdENhbmRpZGF0ZS5maW5pc2hNZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSArPSBgOiAke2ZpcnN0Q2FuZGlkYXRlLmZpbmlzaE1lc3NhZ2V9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWVzc2FnZTtcbn1cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlLCBTdXBwcmVzc2VkRXJyb3IsIFN5bWJvbCAqL1xyXG5cclxuXHJcbmZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbnR5cGVvZiBTdXBwcmVzc2VkRXJyb3IgPT09IFwiZnVuY3Rpb25cIiA/IFN1cHByZXNzZWRFcnJvciA6IGZ1bmN0aW9uIChlcnJvciwgc3VwcHJlc3NlZCwgbWVzc2FnZSkge1xyXG4gICAgdmFyIGUgPSBuZXcgRXJyb3IobWVzc2FnZSk7XHJcbiAgICByZXR1cm4gZS5uYW1lID0gXCJTdXBwcmVzc2VkRXJyb3JcIiwgZS5lcnJvciA9IGVycm9yLCBlLnN1cHByZXNzZWQgPSBzdXBwcmVzc2VkLCBlO1xyXG59O1xuXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyNCBHb29nbGUgTExDXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuY29uc3QgcmVzcG9uc2VMaW5lUkUgPSAvXmRhdGFcXDogKC4qKSg/OlxcblxcbnxcXHJcXHJ8XFxyXFxuXFxyXFxuKS87XG4vKipcbiAqIFByb2Nlc3MgYSByZXNwb25zZS5ib2R5IHN0cmVhbSBmcm9tIHRoZSBiYWNrZW5kIGFuZCByZXR1cm4gYW5cbiAqIGl0ZXJhdG9yIHRoYXQgcHJvdmlkZXMgb25lIGNvbXBsZXRlIEdlbmVyYXRlQ29udGVudFJlc3BvbnNlIGF0IGEgdGltZVxuICogYW5kIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggYSBzaW5nbGUgYWdncmVnYXRlZFxuICogR2VuZXJhdGVDb250ZW50UmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHJlc3BvbnNlIC0gUmVzcG9uc2UgZnJvbSBhIGZldGNoIGNhbGxcbiAqL1xuZnVuY3Rpb24gcHJvY2Vzc1N0cmVhbShyZXNwb25zZSkge1xuICAgIGNvbnN0IGlucHV0U3RyZWFtID0gcmVzcG9uc2UuYm9keS5waXBlVGhyb3VnaChuZXcgVGV4dERlY29kZXJTdHJlYW0oXCJ1dGY4XCIsIHsgZmF0YWw6IHRydWUgfSkpO1xuICAgIGNvbnN0IHJlc3BvbnNlU3RyZWFtID0gZ2V0UmVzcG9uc2VTdHJlYW0oaW5wdXRTdHJlYW0pO1xuICAgIGNvbnN0IFtzdHJlYW0xLCBzdHJlYW0yXSA9IHJlc3BvbnNlU3RyZWFtLnRlZSgpO1xuICAgIHJldHVybiB7XG4gICAgICAgIHN0cmVhbTogZ2VuZXJhdGVSZXNwb25zZVNlcXVlbmNlKHN0cmVhbTEpLFxuICAgICAgICByZXNwb25zZTogZ2V0UmVzcG9uc2VQcm9taXNlKHN0cmVhbTIpLFxuICAgIH07XG59XG5hc3luYyBmdW5jdGlvbiBnZXRSZXNwb25zZVByb21pc2Uoc3RyZWFtKSB7XG4gICAgY29uc3QgYWxsUmVzcG9uc2VzID0gW107XG4gICAgY29uc3QgcmVhZGVyID0gc3RyZWFtLmdldFJlYWRlcigpO1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGNvbnN0IHsgZG9uZSwgdmFsdWUgfSA9IGF3YWl0IHJlYWRlci5yZWFkKCk7XG4gICAgICAgIGlmIChkb25lKSB7XG4gICAgICAgICAgICByZXR1cm4gYWRkSGVscGVycyhhZ2dyZWdhdGVSZXNwb25zZXMoYWxsUmVzcG9uc2VzKSk7XG4gICAgICAgIH1cbiAgICAgICAgYWxsUmVzcG9uc2VzLnB1c2godmFsdWUpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdlbmVyYXRlUmVzcG9uc2VTZXF1ZW5jZShzdHJlYW0pIHtcbiAgICByZXR1cm4gX19hc3luY0dlbmVyYXRvcih0aGlzLCBhcmd1bWVudHMsIGZ1bmN0aW9uKiBnZW5lcmF0ZVJlc3BvbnNlU2VxdWVuY2VfMSgpIHtcbiAgICAgICAgY29uc3QgcmVhZGVyID0gc3RyZWFtLmdldFJlYWRlcigpO1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgY29uc3QgeyB2YWx1ZSwgZG9uZSB9ID0geWllbGQgX19hd2FpdChyZWFkZXIucmVhZCgpKTtcbiAgICAgICAgICAgIGlmIChkb25lKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB5aWVsZCB5aWVsZCBfX2F3YWl0KGFkZEhlbHBlcnModmFsdWUpKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBSZWFkcyBhIHJhdyBzdHJlYW0gZnJvbSB0aGUgZmV0Y2ggcmVzcG9uc2UgYW5kIGpvaW4gaW5jb21wbGV0ZVxuICogY2h1bmtzLCByZXR1cm5pbmcgYSBuZXcgc3RyZWFtIHRoYXQgcHJvdmlkZXMgYSBzaW5nbGUgY29tcGxldGVcbiAqIEdlbmVyYXRlQ29udGVudFJlc3BvbnNlIGluIGVhY2ggaXRlcmF0aW9uLlxuICovXG5mdW5jdGlvbiBnZXRSZXNwb25zZVN0cmVhbShpbnB1dFN0cmVhbSkge1xuICAgIGNvbnN0IHJlYWRlciA9IGlucHV0U3RyZWFtLmdldFJlYWRlcigpO1xuICAgIGNvbnN0IHN0cmVhbSA9IG5ldyBSZWFkYWJsZVN0cmVhbSh7XG4gICAgICAgIHN0YXJ0KGNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50VGV4dCA9IFwiXCI7XG4gICAgICAgICAgICByZXR1cm4gcHVtcCgpO1xuICAgICAgICAgICAgZnVuY3Rpb24gcHVtcCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVhZGVyXG4gICAgICAgICAgICAgICAgICAgIC5yZWFkKClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHsgdmFsdWUsIGRvbmUgfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZG9uZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRUZXh0LnRyaW0oKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuZXJyb3IobmV3IEdvb2dsZUdlbmVyYXRpdmVBSUVycm9yKFwiRmFpbGVkIHRvIHBhcnNlIHN0cmVhbVwiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlci5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUZXh0ICs9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbWF0Y2ggPSBjdXJyZW50VGV4dC5tYXRjaChyZXNwb25zZUxpbmVSRSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwYXJzZWRSZXNwb25zZTtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlZFJlc3BvbnNlID0gSlNPTi5wYXJzZShtYXRjaFsxXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuZXJyb3IobmV3IEdvb2dsZUdlbmVyYXRpdmVBSUVycm9yKGBFcnJvciBwYXJzaW5nIEpTT04gcmVzcG9uc2U6IFwiJHttYXRjaFsxXX1cImApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyLmVucXVldWUocGFyc2VkUmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFRleHQgPSBjdXJyZW50VGV4dC5zdWJzdHJpbmcobWF0Y2hbMF0ubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoID0gY3VycmVudFRleHQubWF0Y2gocmVzcG9uc2VMaW5lUkUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwdW1wKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBlcnIgPSBlO1xuICAgICAgICAgICAgICAgICAgICBlcnIuc3RhY2sgPSBlLnN0YWNrO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyLm5hbWUgPT09IFwiQWJvcnRFcnJvclwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnIgPSBuZXcgR29vZ2xlR2VuZXJhdGl2ZUFJQWJvcnRFcnJvcihcIlJlcXVlc3QgYWJvcnRlZCB3aGVuIHJlYWRpbmcgZnJvbSB0aGUgc3RyZWFtXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyID0gbmV3IEdvb2dsZUdlbmVyYXRpdmVBSUVycm9yKFwiRXJyb3IgcmVhZGluZyBmcm9tIHRoZSBzdHJlYW1cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH0pO1xuICAgIHJldHVybiBzdHJlYW07XG59XG4vKipcbiAqIEFnZ3JlZ2F0ZXMgYW4gYXJyYXkgb2YgYEdlbmVyYXRlQ29udGVudFJlc3BvbnNlYHMgaW50byBhIHNpbmdsZVxuICogR2VuZXJhdGVDb250ZW50UmVzcG9uc2UuXG4gKi9cbmZ1bmN0aW9uIGFnZ3JlZ2F0ZVJlc3BvbnNlcyhyZXNwb25zZXMpIHtcbiAgICBjb25zdCBsYXN0UmVzcG9uc2UgPSByZXNwb25zZXNbcmVzcG9uc2VzLmxlbmd0aCAtIDFdO1xuICAgIGNvbnN0IGFnZ3JlZ2F0ZWRSZXNwb25zZSA9IHtcbiAgICAgICAgcHJvbXB0RmVlZGJhY2s6IGxhc3RSZXNwb25zZSA9PT0gbnVsbCB8fCBsYXN0UmVzcG9uc2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGxhc3RSZXNwb25zZS5wcm9tcHRGZWVkYmFjayxcbiAgICB9O1xuICAgIGZvciAoY29uc3QgcmVzcG9uc2Ugb2YgcmVzcG9uc2VzKSB7XG4gICAgICAgIGlmIChyZXNwb25zZS5jYW5kaWRhdGVzKSB7XG4gICAgICAgICAgICBsZXQgY2FuZGlkYXRlSW5kZXggPSAwO1xuICAgICAgICAgICAgZm9yIChjb25zdCBjYW5kaWRhdGUgb2YgcmVzcG9uc2UuY2FuZGlkYXRlcykge1xuICAgICAgICAgICAgICAgIGlmICghYWdncmVnYXRlZFJlc3BvbnNlLmNhbmRpZGF0ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgYWdncmVnYXRlZFJlc3BvbnNlLmNhbmRpZGF0ZXMgPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFhZ2dyZWdhdGVkUmVzcG9uc2UuY2FuZGlkYXRlc1tjYW5kaWRhdGVJbmRleF0pIHtcbiAgICAgICAgICAgICAgICAgICAgYWdncmVnYXRlZFJlc3BvbnNlLmNhbmRpZGF0ZXNbY2FuZGlkYXRlSW5kZXhdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGNhbmRpZGF0ZUluZGV4LFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBLZWVwIG92ZXJ3cml0aW5nLCB0aGUgbGFzdCBvbmUgd2lsbCBiZSBmaW5hbFxuICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZWRSZXNwb25zZS5jYW5kaWRhdGVzW2NhbmRpZGF0ZUluZGV4XS5jaXRhdGlvbk1ldGFkYXRhID1cbiAgICAgICAgICAgICAgICAgICAgY2FuZGlkYXRlLmNpdGF0aW9uTWV0YWRhdGE7XG4gICAgICAgICAgICAgICAgYWdncmVnYXRlZFJlc3BvbnNlLmNhbmRpZGF0ZXNbY2FuZGlkYXRlSW5kZXhdLmdyb3VuZGluZ01ldGFkYXRhID1cbiAgICAgICAgICAgICAgICAgICAgY2FuZGlkYXRlLmdyb3VuZGluZ01ldGFkYXRhO1xuICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZWRSZXNwb25zZS5jYW5kaWRhdGVzW2NhbmRpZGF0ZUluZGV4XS5maW5pc2hSZWFzb24gPVxuICAgICAgICAgICAgICAgICAgICBjYW5kaWRhdGUuZmluaXNoUmVhc29uO1xuICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZWRSZXNwb25zZS5jYW5kaWRhdGVzW2NhbmRpZGF0ZUluZGV4XS5maW5pc2hNZXNzYWdlID1cbiAgICAgICAgICAgICAgICAgICAgY2FuZGlkYXRlLmZpbmlzaE1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgYWdncmVnYXRlZFJlc3BvbnNlLmNhbmRpZGF0ZXNbY2FuZGlkYXRlSW5kZXhdLnNhZmV0eVJhdGluZ3MgPVxuICAgICAgICAgICAgICAgICAgICBjYW5kaWRhdGUuc2FmZXR5UmF0aW5ncztcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBDYW5kaWRhdGVzIHNob3VsZCBhbHdheXMgaGF2ZSBjb250ZW50IGFuZCBwYXJ0cywgYnV0IHRoaXMgaGFuZGxlc1xuICAgICAgICAgICAgICAgICAqIHBvc3NpYmxlIG1hbGZvcm1lZCByZXNwb25zZXMuXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYgKGNhbmRpZGF0ZS5jb250ZW50ICYmIGNhbmRpZGF0ZS5jb250ZW50LnBhcnRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghYWdncmVnYXRlZFJlc3BvbnNlLmNhbmRpZGF0ZXNbY2FuZGlkYXRlSW5kZXhdLmNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZWRSZXNwb25zZS5jYW5kaWRhdGVzW2NhbmRpZGF0ZUluZGV4XS5jb250ZW50ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU6IGNhbmRpZGF0ZS5jb250ZW50LnJvbGUgfHwgXCJ1c2VyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFydHM6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdQYXJ0ID0ge307XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcGFydCBvZiBjYW5kaWRhdGUuY29udGVudC5wYXJ0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnQudGV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1BhcnQudGV4dCA9IHBhcnQudGV4dDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJ0LmZ1bmN0aW9uQ2FsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1BhcnQuZnVuY3Rpb25DYWxsID0gcGFydC5mdW5jdGlvbkNhbGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFydC5leGVjdXRhYmxlQ29kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1BhcnQuZXhlY3V0YWJsZUNvZGUgPSBwYXJ0LmV4ZWN1dGFibGVDb2RlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnQuY29kZUV4ZWN1dGlvblJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1BhcnQuY29kZUV4ZWN1dGlvblJlc3VsdCA9IHBhcnQuY29kZUV4ZWN1dGlvblJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhuZXdQYXJ0KS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdQYXJ0LnRleHQgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYWdncmVnYXRlZFJlc3BvbnNlLmNhbmRpZGF0ZXNbY2FuZGlkYXRlSW5kZXhdLmNvbnRlbnQucGFydHMucHVzaChuZXdQYXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbmRpZGF0ZUluZGV4Kys7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3BvbnNlLnVzYWdlTWV0YWRhdGEpIHtcbiAgICAgICAgICAgIGFnZ3JlZ2F0ZWRSZXNwb25zZS51c2FnZU1ldGFkYXRhID0gcmVzcG9uc2UudXNhZ2VNZXRhZGF0YTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYWdncmVnYXRlZFJlc3BvbnNlO1xufVxuXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyNCBHb29nbGUgTExDXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gZ2VuZXJhdGVDb250ZW50U3RyZWFtKGFwaUtleSwgbW9kZWwsIHBhcmFtcywgcmVxdWVzdE9wdGlvbnMpIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IG1ha2VNb2RlbFJlcXVlc3QobW9kZWwsIFRhc2suU1RSRUFNX0dFTkVSQVRFX0NPTlRFTlQsIGFwaUtleSwgXG4gICAgLyogc3RyZWFtICovIHRydWUsIEpTT04uc3RyaW5naWZ5KHBhcmFtcyksIHJlcXVlc3RPcHRpb25zKTtcbiAgICByZXR1cm4gcHJvY2Vzc1N0cmVhbShyZXNwb25zZSk7XG59XG5hc3luYyBmdW5jdGlvbiBnZW5lcmF0ZUNvbnRlbnQoYXBpS2V5LCBtb2RlbCwgcGFyYW1zLCByZXF1ZXN0T3B0aW9ucykge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgbWFrZU1vZGVsUmVxdWVzdChtb2RlbCwgVGFzay5HRU5FUkFURV9DT05URU5ULCBhcGlLZXksIFxuICAgIC8qIHN0cmVhbSAqLyBmYWxzZSwgSlNPTi5zdHJpbmdpZnkocGFyYW1zKSwgcmVxdWVzdE9wdGlvbnMpO1xuICAgIGNvbnN0IHJlc3BvbnNlSnNvbiA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICBjb25zdCBlbmhhbmNlZFJlc3BvbnNlID0gYWRkSGVscGVycyhyZXNwb25zZUpzb24pO1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3BvbnNlOiBlbmhhbmNlZFJlc3BvbnNlLFxuICAgIH07XG59XG5cbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDI0IEdvb2dsZSBMTENcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5mdW5jdGlvbiBmb3JtYXRTeXN0ZW1JbnN0cnVjdGlvbihpbnB1dCkge1xuICAgIC8vIG51bGwgb3IgdW5kZWZpbmVkXG4gICAgaWYgKGlucHV0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGlucHV0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHJldHVybiB7IHJvbGU6IFwic3lzdGVtXCIsIHBhcnRzOiBbeyB0ZXh0OiBpbnB1dCB9XSB9O1xuICAgIH1cbiAgICBlbHNlIGlmIChpbnB1dC50ZXh0KSB7XG4gICAgICAgIHJldHVybiB7IHJvbGU6IFwic3lzdGVtXCIsIHBhcnRzOiBbaW5wdXRdIH07XG4gICAgfVxuICAgIGVsc2UgaWYgKGlucHV0LnBhcnRzKSB7XG4gICAgICAgIGlmICghaW5wdXQucm9sZSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgcm9sZTogXCJzeXN0ZW1cIiwgcGFydHM6IGlucHV0LnBhcnRzIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBmb3JtYXROZXdDb250ZW50KHJlcXVlc3QpIHtcbiAgICBsZXQgbmV3UGFydHMgPSBbXTtcbiAgICBpZiAodHlwZW9mIHJlcXVlc3QgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgbmV3UGFydHMgPSBbeyB0ZXh0OiByZXF1ZXN0IH1dO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZm9yIChjb25zdCBwYXJ0T3JTdHJpbmcgb2YgcmVxdWVzdCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXJ0T3JTdHJpbmcgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICBuZXdQYXJ0cy5wdXNoKHsgdGV4dDogcGFydE9yU3RyaW5nIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3UGFydHMucHVzaChwYXJ0T3JTdHJpbmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhc3NpZ25Sb2xlVG9QYXJ0c0FuZFZhbGlkYXRlU2VuZE1lc3NhZ2VSZXF1ZXN0KG5ld1BhcnRzKTtcbn1cbi8qKlxuICogV2hlbiBtdWx0aXBsZSBQYXJ0IHR5cGVzIChpLmUuIEZ1bmN0aW9uUmVzcG9uc2VQYXJ0IGFuZCBUZXh0UGFydCkgYXJlXG4gKiBwYXNzZWQgaW4gYSBzaW5nbGUgUGFydCBhcnJheSwgd2UgbWF5IG5lZWQgdG8gYXNzaWduIGRpZmZlcmVudCByb2xlcyB0byBlYWNoXG4gKiBwYXJ0LiBDdXJyZW50bHkgb25seSBGdW5jdGlvblJlc3BvbnNlUGFydCByZXF1aXJlcyBhIHJvbGUgb3RoZXIgdGhhbiAndXNlcicuXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHBhcnRzIEFycmF5IG9mIHBhcnRzIHRvIHBhc3MgdG8gdGhlIG1vZGVsXG4gKiBAcmV0dXJucyBBcnJheSBvZiBjb250ZW50IGl0ZW1zXG4gKi9cbmZ1bmN0aW9uIGFzc2lnblJvbGVUb1BhcnRzQW5kVmFsaWRhdGVTZW5kTWVzc2FnZVJlcXVlc3QocGFydHMpIHtcbiAgICBjb25zdCB1c2VyQ29udGVudCA9IHsgcm9sZTogXCJ1c2VyXCIsIHBhcnRzOiBbXSB9O1xuICAgIGNvbnN0IGZ1bmN0aW9uQ29udGVudCA9IHsgcm9sZTogXCJmdW5jdGlvblwiLCBwYXJ0czogW10gfTtcbiAgICBsZXQgaGFzVXNlckNvbnRlbnQgPSBmYWxzZTtcbiAgICBsZXQgaGFzRnVuY3Rpb25Db250ZW50ID0gZmFsc2U7XG4gICAgZm9yIChjb25zdCBwYXJ0IG9mIHBhcnRzKSB7XG4gICAgICAgIGlmIChcImZ1bmN0aW9uUmVzcG9uc2VcIiBpbiBwYXJ0KSB7XG4gICAgICAgICAgICBmdW5jdGlvbkNvbnRlbnQucGFydHMucHVzaChwYXJ0KTtcbiAgICAgICAgICAgIGhhc0Z1bmN0aW9uQ29udGVudCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB1c2VyQ29udGVudC5wYXJ0cy5wdXNoKHBhcnQpO1xuICAgICAgICAgICAgaGFzVXNlckNvbnRlbnQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChoYXNVc2VyQ29udGVudCAmJiBoYXNGdW5jdGlvbkNvbnRlbnQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEdvb2dsZUdlbmVyYXRpdmVBSUVycm9yKFwiV2l0aGluIGEgc2luZ2xlIG1lc3NhZ2UsIEZ1bmN0aW9uUmVzcG9uc2UgY2Fubm90IGJlIG1peGVkIHdpdGggb3RoZXIgdHlwZSBvZiBwYXJ0IGluIHRoZSByZXF1ZXN0IGZvciBzZW5kaW5nIGNoYXQgbWVzc2FnZS5cIik7XG4gICAgfVxuICAgIGlmICghaGFzVXNlckNvbnRlbnQgJiYgIWhhc0Z1bmN0aW9uQ29udGVudCkge1xuICAgICAgICB0aHJvdyBuZXcgR29vZ2xlR2VuZXJhdGl2ZUFJRXJyb3IoXCJObyBjb250ZW50IGlzIHByb3ZpZGVkIGZvciBzZW5kaW5nIGNoYXQgbWVzc2FnZS5cIik7XG4gICAgfVxuICAgIGlmIChoYXNVc2VyQ29udGVudCkge1xuICAgICAgICByZXR1cm4gdXNlckNvbnRlbnQ7XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbkNvbnRlbnQ7XG59XG5mdW5jdGlvbiBmb3JtYXRDb3VudFRva2Vuc0lucHV0KHBhcmFtcywgbW9kZWxQYXJhbXMpIHtcbiAgICB2YXIgX2E7XG4gICAgbGV0IGZvcm1hdHRlZEdlbmVyYXRlQ29udGVudFJlcXVlc3QgPSB7XG4gICAgICAgIG1vZGVsOiBtb2RlbFBhcmFtcyA9PT0gbnVsbCB8fCBtb2RlbFBhcmFtcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogbW9kZWxQYXJhbXMubW9kZWwsXG4gICAgICAgIGdlbmVyYXRpb25Db25maWc6IG1vZGVsUGFyYW1zID09PSBudWxsIHx8IG1vZGVsUGFyYW1zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtb2RlbFBhcmFtcy5nZW5lcmF0aW9uQ29uZmlnLFxuICAgICAgICBzYWZldHlTZXR0aW5nczogbW9kZWxQYXJhbXMgPT09IG51bGwgfHwgbW9kZWxQYXJhbXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1vZGVsUGFyYW1zLnNhZmV0eVNldHRpbmdzLFxuICAgICAgICB0b29sczogbW9kZWxQYXJhbXMgPT09IG51bGwgfHwgbW9kZWxQYXJhbXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1vZGVsUGFyYW1zLnRvb2xzLFxuICAgICAgICB0b29sQ29uZmlnOiBtb2RlbFBhcmFtcyA9PT0gbnVsbCB8fCBtb2RlbFBhcmFtcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogbW9kZWxQYXJhbXMudG9vbENvbmZpZyxcbiAgICAgICAgc3lzdGVtSW5zdHJ1Y3Rpb246IG1vZGVsUGFyYW1zID09PSBudWxsIHx8IG1vZGVsUGFyYW1zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtb2RlbFBhcmFtcy5zeXN0ZW1JbnN0cnVjdGlvbixcbiAgICAgICAgY2FjaGVkQ29udGVudDogKF9hID0gbW9kZWxQYXJhbXMgPT09IG51bGwgfHwgbW9kZWxQYXJhbXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1vZGVsUGFyYW1zLmNhY2hlZENvbnRlbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5uYW1lLFxuICAgICAgICBjb250ZW50czogW10sXG4gICAgfTtcbiAgICBjb25zdCBjb250YWluc0dlbmVyYXRlQ29udGVudFJlcXVlc3QgPSBwYXJhbXMuZ2VuZXJhdGVDb250ZW50UmVxdWVzdCAhPSBudWxsO1xuICAgIGlmIChwYXJhbXMuY29udGVudHMpIHtcbiAgICAgICAgaWYgKGNvbnRhaW5zR2VuZXJhdGVDb250ZW50UmVxdWVzdCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEdvb2dsZUdlbmVyYXRpdmVBSVJlcXVlc3RJbnB1dEVycm9yKFwiQ291bnRUb2tlbnNSZXF1ZXN0IG11c3QgaGF2ZSBvbmUgb2YgY29udGVudHMgb3IgZ2VuZXJhdGVDb250ZW50UmVxdWVzdCwgbm90IGJvdGguXCIpO1xuICAgICAgICB9XG4gICAgICAgIGZvcm1hdHRlZEdlbmVyYXRlQ29udGVudFJlcXVlc3QuY29udGVudHMgPSBwYXJhbXMuY29udGVudHM7XG4gICAgfVxuICAgIGVsc2UgaWYgKGNvbnRhaW5zR2VuZXJhdGVDb250ZW50UmVxdWVzdCkge1xuICAgICAgICBmb3JtYXR0ZWRHZW5lcmF0ZUNvbnRlbnRSZXF1ZXN0ID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBmb3JtYXR0ZWRHZW5lcmF0ZUNvbnRlbnRSZXF1ZXN0KSwgcGFyYW1zLmdlbmVyYXRlQ29udGVudFJlcXVlc3QpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gQXJyYXkgb3Igc3RyaW5nXG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBmb3JtYXROZXdDb250ZW50KHBhcmFtcyk7XG4gICAgICAgIGZvcm1hdHRlZEdlbmVyYXRlQ29udGVudFJlcXVlc3QuY29udGVudHMgPSBbY29udGVudF07XG4gICAgfVxuICAgIHJldHVybiB7IGdlbmVyYXRlQ29udGVudFJlcXVlc3Q6IGZvcm1hdHRlZEdlbmVyYXRlQ29udGVudFJlcXVlc3QgfTtcbn1cbmZ1bmN0aW9uIGZvcm1hdEdlbmVyYXRlQ29udGVudElucHV0KHBhcmFtcykge1xuICAgIGxldCBmb3JtYXR0ZWRSZXF1ZXN0O1xuICAgIGlmIChwYXJhbXMuY29udGVudHMpIHtcbiAgICAgICAgZm9ybWF0dGVkUmVxdWVzdCA9IHBhcmFtcztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIEFycmF5IG9yIHN0cmluZ1xuICAgICAgICBjb25zdCBjb250ZW50ID0gZm9ybWF0TmV3Q29udGVudChwYXJhbXMpO1xuICAgICAgICBmb3JtYXR0ZWRSZXF1ZXN0ID0geyBjb250ZW50czogW2NvbnRlbnRdIH07XG4gICAgfVxuICAgIGlmIChwYXJhbXMuc3lzdGVtSW5zdHJ1Y3Rpb24pIHtcbiAgICAgICAgZm9ybWF0dGVkUmVxdWVzdC5zeXN0ZW1JbnN0cnVjdGlvbiA9IGZvcm1hdFN5c3RlbUluc3RydWN0aW9uKHBhcmFtcy5zeXN0ZW1JbnN0cnVjdGlvbik7XG4gICAgfVxuICAgIHJldHVybiBmb3JtYXR0ZWRSZXF1ZXN0O1xufVxuZnVuY3Rpb24gZm9ybWF0RW1iZWRDb250ZW50SW5wdXQocGFyYW1zKSB7XG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIgfHwgQXJyYXkuaXNBcnJheShwYXJhbXMpKSB7XG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBmb3JtYXROZXdDb250ZW50KHBhcmFtcyk7XG4gICAgICAgIHJldHVybiB7IGNvbnRlbnQgfTtcbiAgICB9XG4gICAgcmV0dXJuIHBhcmFtcztcbn1cblxuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMjQgR29vZ2xlIExMQ1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8vIGh0dHBzOi8vYWkuZ29vZ2xlLmRldi9hcGkvcmVzdC92MWJldGEvQ29udGVudCNwYXJ0XG5jb25zdCBWQUxJRF9QQVJUX0ZJRUxEUyA9IFtcbiAgICBcInRleHRcIixcbiAgICBcImlubGluZURhdGFcIixcbiAgICBcImZ1bmN0aW9uQ2FsbFwiLFxuICAgIFwiZnVuY3Rpb25SZXNwb25zZVwiLFxuICAgIFwiZXhlY3V0YWJsZUNvZGVcIixcbiAgICBcImNvZGVFeGVjdXRpb25SZXN1bHRcIixcbl07XG5jb25zdCBWQUxJRF9QQVJUU19QRVJfUk9MRSA9IHtcbiAgICB1c2VyOiBbXCJ0ZXh0XCIsIFwiaW5saW5lRGF0YVwiXSxcbiAgICBmdW5jdGlvbjogW1wiZnVuY3Rpb25SZXNwb25zZVwiXSxcbiAgICBtb2RlbDogW1widGV4dFwiLCBcImZ1bmN0aW9uQ2FsbFwiLCBcImV4ZWN1dGFibGVDb2RlXCIsIFwiY29kZUV4ZWN1dGlvblJlc3VsdFwiXSxcbiAgICAvLyBTeXN0ZW0gaW5zdHJ1Y3Rpb25zIHNob3VsZG4ndCBiZSBpbiBoaXN0b3J5IGFueXdheS5cbiAgICBzeXN0ZW06IFtcInRleHRcIl0sXG59O1xuZnVuY3Rpb24gdmFsaWRhdGVDaGF0SGlzdG9yeShoaXN0b3J5KSB7XG4gICAgbGV0IHByZXZDb250ZW50ID0gZmFsc2U7XG4gICAgZm9yIChjb25zdCBjdXJyQ29udGVudCBvZiBoaXN0b3J5KSB7XG4gICAgICAgIGNvbnN0IHsgcm9sZSwgcGFydHMgfSA9IGN1cnJDb250ZW50O1xuICAgICAgICBpZiAoIXByZXZDb250ZW50ICYmIHJvbGUgIT09IFwidXNlclwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgR29vZ2xlR2VuZXJhdGl2ZUFJRXJyb3IoYEZpcnN0IGNvbnRlbnQgc2hvdWxkIGJlIHdpdGggcm9sZSAndXNlcicsIGdvdCAke3JvbGV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFQT1NTSUJMRV9ST0xFUy5pbmNsdWRlcyhyb2xlKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEdvb2dsZUdlbmVyYXRpdmVBSUVycm9yKGBFYWNoIGl0ZW0gc2hvdWxkIGluY2x1ZGUgcm9sZSBmaWVsZC4gR290ICR7cm9sZX0gYnV0IHZhbGlkIHJvbGVzIGFyZTogJHtKU09OLnN0cmluZ2lmeShQT1NTSUJMRV9ST0xFUyl9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHBhcnRzKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEdvb2dsZUdlbmVyYXRpdmVBSUVycm9yKFwiQ29udGVudCBzaG91bGQgaGF2ZSAncGFydHMnIHByb3BlcnR5IHdpdGggYW4gYXJyYXkgb2YgUGFydHNcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEdvb2dsZUdlbmVyYXRpdmVBSUVycm9yKFwiRWFjaCBDb250ZW50IHNob3VsZCBoYXZlIGF0IGxlYXN0IG9uZSBwYXJ0XCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvdW50RmllbGRzID0ge1xuICAgICAgICAgICAgdGV4dDogMCxcbiAgICAgICAgICAgIGlubGluZURhdGE6IDAsXG4gICAgICAgICAgICBmdW5jdGlvbkNhbGw6IDAsXG4gICAgICAgICAgICBmdW5jdGlvblJlc3BvbnNlOiAwLFxuICAgICAgICAgICAgZmlsZURhdGE6IDAsXG4gICAgICAgICAgICBleGVjdXRhYmxlQ29kZTogMCxcbiAgICAgICAgICAgIGNvZGVFeGVjdXRpb25SZXN1bHQ6IDAsXG4gICAgICAgIH07XG4gICAgICAgIGZvciAoY29uc3QgcGFydCBvZiBwYXJ0cykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgVkFMSURfUEFSVF9GSUVMRFMpIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5IGluIHBhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgY291bnRGaWVsZHNba2V5XSArPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCB2YWxpZFBhcnRzID0gVkFMSURfUEFSVFNfUEVSX1JPTEVbcm9sZV07XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIFZBTElEX1BBUlRfRklFTERTKSB7XG4gICAgICAgICAgICBpZiAoIXZhbGlkUGFydHMuaW5jbHVkZXMoa2V5KSAmJiBjb3VudEZpZWxkc1trZXldID4gMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBHb29nbGVHZW5lcmF0aXZlQUlFcnJvcihgQ29udGVudCB3aXRoIHJvbGUgJyR7cm9sZX0nIGNhbid0IGNvbnRhaW4gJyR7a2V5fScgcGFydGApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHByZXZDb250ZW50ID0gdHJ1ZTtcbiAgICB9XG59XG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgcmVzcG9uc2UgaXMgdmFsaWQgKGNvdWxkIGJlIGFwcGVuZGVkIHRvIHRoZSBoaXN0b3J5KSwgZmxhc2Ugb3RoZXJ3aXNlLlxuICovXG5mdW5jdGlvbiBpc1ZhbGlkUmVzcG9uc2UocmVzcG9uc2UpIHtcbiAgICB2YXIgX2E7XG4gICAgaWYgKHJlc3BvbnNlLmNhbmRpZGF0ZXMgPT09IHVuZGVmaW5lZCB8fCByZXNwb25zZS5jYW5kaWRhdGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGNvbnRlbnQgPSAoX2EgPSByZXNwb25zZS5jYW5kaWRhdGVzWzBdKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY29udGVudDtcbiAgICBpZiAoY29udGVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGNvbnRlbnQucGFydHMgPT09IHVuZGVmaW5lZCB8fCBjb250ZW50LnBhcnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZvciAoY29uc3QgcGFydCBvZiBjb250ZW50LnBhcnRzKSB7XG4gICAgICAgIGlmIChwYXJ0ID09PSB1bmRlZmluZWQgfHwgT2JqZWN0LmtleXMocGFydCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcnQudGV4dCAhPT0gdW5kZWZpbmVkICYmIHBhcnQudGV4dCA9PT0gXCJcIikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyNCBHb29nbGUgTExDXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBEbyBub3QgbG9nIGEgbWVzc2FnZSBmb3IgdGhpcyBlcnJvci5cbiAqL1xuY29uc3QgU0lMRU5UX0VSUk9SID0gXCJTSUxFTlRfRVJST1JcIjtcbi8qKlxuICogQ2hhdFNlc3Npb24gY2xhc3MgdGhhdCBlbmFibGVzIHNlbmRpbmcgY2hhdCBtZXNzYWdlcyBhbmQgc3RvcmVzXG4gKiBoaXN0b3J5IG9mIHNlbnQgYW5kIHJlY2VpdmVkIG1lc3NhZ2VzIHNvIGZhci5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmNsYXNzIENoYXRTZXNzaW9uIHtcbiAgICBjb25zdHJ1Y3RvcihhcGlLZXksIG1vZGVsLCBwYXJhbXMsIF9yZXF1ZXN0T3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICAgICAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7XG4gICAgICAgIHRoaXMuX3JlcXVlc3RPcHRpb25zID0gX3JlcXVlc3RPcHRpb25zO1xuICAgICAgICB0aGlzLl9oaXN0b3J5ID0gW107XG4gICAgICAgIHRoaXMuX3NlbmRQcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIHRoaXMuX2FwaUtleSA9IGFwaUtleTtcbiAgICAgICAgaWYgKHBhcmFtcyA9PT0gbnVsbCB8fCBwYXJhbXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBhcmFtcy5oaXN0b3J5KSB7XG4gICAgICAgICAgICB2YWxpZGF0ZUNoYXRIaXN0b3J5KHBhcmFtcy5oaXN0b3J5KTtcbiAgICAgICAgICAgIHRoaXMuX2hpc3RvcnkgPSBwYXJhbXMuaGlzdG9yeTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBjaGF0IGhpc3Rvcnkgc28gZmFyLiBCbG9ja2VkIHByb21wdHMgYXJlIG5vdCBhZGRlZCB0byBoaXN0b3J5LlxuICAgICAqIEJsb2NrZWQgY2FuZGlkYXRlcyBhcmUgbm90IGFkZGVkIHRvIGhpc3RvcnksIG5vciBhcmUgdGhlIHByb21wdHMgdGhhdFxuICAgICAqIGdlbmVyYXRlZCB0aGVtLlxuICAgICAqL1xuICAgIGFzeW5jIGdldEhpc3RvcnkoKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuX3NlbmRQcm9taXNlO1xuICAgICAgICByZXR1cm4gdGhpcy5faGlzdG9yeTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZHMgYSBjaGF0IG1lc3NhZ2UgYW5kIHJlY2VpdmVzIGEgbm9uLXN0cmVhbWluZ1xuICAgICAqIHtAbGluayBHZW5lcmF0ZUNvbnRlbnRSZXN1bHR9LlxuICAgICAqXG4gICAgICogRmllbGRzIHNldCBpbiB0aGUgb3B0aW9uYWwge0BsaW5rIFNpbmdsZVJlcXVlc3RPcHRpb25zfSBwYXJhbWV0ZXIgd2lsbFxuICAgICAqIHRha2UgcHJlY2VkZW5jZSBvdmVyIHRoZSB7QGxpbmsgUmVxdWVzdE9wdGlvbnN9IHZhbHVlcyBwcm92aWRlZCB0b1xuICAgICAqIHtAbGluayBHb29nbGVHZW5lcmF0aXZlQUkuZ2V0R2VuZXJhdGl2ZU1vZGVsIH0uXG4gICAgICovXG4gICAgYXN5bmMgc2VuZE1lc3NhZ2UocmVxdWVzdCwgcmVxdWVzdE9wdGlvbnMgPSB7fSkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZjtcbiAgICAgICAgYXdhaXQgdGhpcy5fc2VuZFByb21pc2U7XG4gICAgICAgIGNvbnN0IG5ld0NvbnRlbnQgPSBmb3JtYXROZXdDb250ZW50KHJlcXVlc3QpO1xuICAgICAgICBjb25zdCBnZW5lcmF0ZUNvbnRlbnRSZXF1ZXN0ID0ge1xuICAgICAgICAgICAgc2FmZXR5U2V0dGluZ3M6IChfYSA9IHRoaXMucGFyYW1zKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2FmZXR5U2V0dGluZ3MsXG4gICAgICAgICAgICBnZW5lcmF0aW9uQ29uZmlnOiAoX2IgPSB0aGlzLnBhcmFtcykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmdlbmVyYXRpb25Db25maWcsXG4gICAgICAgICAgICB0b29sczogKF9jID0gdGhpcy5wYXJhbXMpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy50b29scyxcbiAgICAgICAgICAgIHRvb2xDb25maWc6IChfZCA9IHRoaXMucGFyYW1zKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QudG9vbENvbmZpZyxcbiAgICAgICAgICAgIHN5c3RlbUluc3RydWN0aW9uOiAoX2UgPSB0aGlzLnBhcmFtcykgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lLnN5c3RlbUluc3RydWN0aW9uLFxuICAgICAgICAgICAgY2FjaGVkQ29udGVudDogKF9mID0gdGhpcy5wYXJhbXMpID09PSBudWxsIHx8IF9mID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZi5jYWNoZWRDb250ZW50LFxuICAgICAgICAgICAgY29udGVudHM6IFsuLi50aGlzLl9oaXN0b3J5LCBuZXdDb250ZW50XSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY2hhdFNlc3Npb25SZXF1ZXN0T3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fcmVxdWVzdE9wdGlvbnMpLCByZXF1ZXN0T3B0aW9ucyk7XG4gICAgICAgIGxldCBmaW5hbFJlc3VsdDtcbiAgICAgICAgLy8gQWRkIG9udG8gdGhlIGNoYWluLlxuICAgICAgICB0aGlzLl9zZW5kUHJvbWlzZSA9IHRoaXMuX3NlbmRQcm9taXNlXG4gICAgICAgICAgICAudGhlbigoKSA9PiBnZW5lcmF0ZUNvbnRlbnQodGhpcy5fYXBpS2V5LCB0aGlzLm1vZGVsLCBnZW5lcmF0ZUNvbnRlbnRSZXF1ZXN0LCBjaGF0U2Vzc2lvblJlcXVlc3RPcHRpb25zKSlcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGlmIChpc1ZhbGlkUmVzcG9uc2UocmVzdWx0LnJlc3BvbnNlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2hpc3RvcnkucHVzaChuZXdDb250ZW50KTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZUNvbnRlbnQgPSBPYmplY3QuYXNzaWduKHsgcGFydHM6IFtdLCBcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVzcG9uc2Ugc2VlbXMgdG8gY29tZSBiYWNrIHdpdGhvdXQgYSByb2xlIHNldC5cbiAgICAgICAgICAgICAgICAgICAgcm9sZTogXCJtb2RlbFwiIH0sIChfYSA9IHJlc3VsdC5yZXNwb25zZS5jYW5kaWRhdGVzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbMF0uY29udGVudCk7XG4gICAgICAgICAgICAgICAgdGhpcy5faGlzdG9yeS5wdXNoKHJlc3BvbnNlQ29udGVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBibG9ja0Vycm9yTWVzc2FnZSA9IGZvcm1hdEJsb2NrRXJyb3JNZXNzYWdlKHJlc3VsdC5yZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgaWYgKGJsb2NrRXJyb3JNZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2Fybihgc2VuZE1lc3NhZ2UoKSB3YXMgdW5zdWNjZXNzZnVsLiAke2Jsb2NrRXJyb3JNZXNzYWdlfS4gSW5zcGVjdCByZXNwb25zZSBvYmplY3QgZm9yIGRldGFpbHMuYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxSZXN1bHQgPSByZXN1bHQ7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAgIC8vIFJlc2V0cyBfc2VuZFByb21pc2UgdG8gYXZvaWQgc3Vic2VxdWVudCBjYWxscyBmYWlsaW5nIGFuZCB0aHJvdyBlcnJvci5cbiAgICAgICAgICAgIHRoaXMuX3NlbmRQcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgdGhpcy5fc2VuZFByb21pc2U7XG4gICAgICAgIHJldHVybiBmaW5hbFJlc3VsdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZHMgYSBjaGF0IG1lc3NhZ2UgYW5kIHJlY2VpdmVzIHRoZSByZXNwb25zZSBhcyBhXG4gICAgICoge0BsaW5rIEdlbmVyYXRlQ29udGVudFN0cmVhbVJlc3VsdH0gY29udGFpbmluZyBhbiBpdGVyYWJsZSBzdHJlYW1cbiAgICAgKiBhbmQgYSByZXNwb25zZSBwcm9taXNlLlxuICAgICAqXG4gICAgICogRmllbGRzIHNldCBpbiB0aGUgb3B0aW9uYWwge0BsaW5rIFNpbmdsZVJlcXVlc3RPcHRpb25zfSBwYXJhbWV0ZXIgd2lsbFxuICAgICAqIHRha2UgcHJlY2VkZW5jZSBvdmVyIHRoZSB7QGxpbmsgUmVxdWVzdE9wdGlvbnN9IHZhbHVlcyBwcm92aWRlZCB0b1xuICAgICAqIHtAbGluayBHb29nbGVHZW5lcmF0aXZlQUkuZ2V0R2VuZXJhdGl2ZU1vZGVsIH0uXG4gICAgICovXG4gICAgYXN5bmMgc2VuZE1lc3NhZ2VTdHJlYW0ocmVxdWVzdCwgcmVxdWVzdE9wdGlvbnMgPSB7fSkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZjtcbiAgICAgICAgYXdhaXQgdGhpcy5fc2VuZFByb21pc2U7XG4gICAgICAgIGNvbnN0IG5ld0NvbnRlbnQgPSBmb3JtYXROZXdDb250ZW50KHJlcXVlc3QpO1xuICAgICAgICBjb25zdCBnZW5lcmF0ZUNvbnRlbnRSZXF1ZXN0ID0ge1xuICAgICAgICAgICAgc2FmZXR5U2V0dGluZ3M6IChfYSA9IHRoaXMucGFyYW1zKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2FmZXR5U2V0dGluZ3MsXG4gICAgICAgICAgICBnZW5lcmF0aW9uQ29uZmlnOiAoX2IgPSB0aGlzLnBhcmFtcykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmdlbmVyYXRpb25Db25maWcsXG4gICAgICAgICAgICB0b29sczogKF9jID0gdGhpcy5wYXJhbXMpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy50b29scyxcbiAgICAgICAgICAgIHRvb2xDb25maWc6IChfZCA9IHRoaXMucGFyYW1zKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QudG9vbENvbmZpZyxcbiAgICAgICAgICAgIHN5c3RlbUluc3RydWN0aW9uOiAoX2UgPSB0aGlzLnBhcmFtcykgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lLnN5c3RlbUluc3RydWN0aW9uLFxuICAgICAgICAgICAgY2FjaGVkQ29udGVudDogKF9mID0gdGhpcy5wYXJhbXMpID09PSBudWxsIHx8IF9mID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZi5jYWNoZWRDb250ZW50LFxuICAgICAgICAgICAgY29udGVudHM6IFsuLi50aGlzLl9oaXN0b3J5LCBuZXdDb250ZW50XSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY2hhdFNlc3Npb25SZXF1ZXN0T3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fcmVxdWVzdE9wdGlvbnMpLCByZXF1ZXN0T3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IHN0cmVhbVByb21pc2UgPSBnZW5lcmF0ZUNvbnRlbnRTdHJlYW0odGhpcy5fYXBpS2V5LCB0aGlzLm1vZGVsLCBnZW5lcmF0ZUNvbnRlbnRSZXF1ZXN0LCBjaGF0U2Vzc2lvblJlcXVlc3RPcHRpb25zKTtcbiAgICAgICAgLy8gQWRkIG9udG8gdGhlIGNoYWluLlxuICAgICAgICB0aGlzLl9zZW5kUHJvbWlzZSA9IHRoaXMuX3NlbmRQcm9taXNlXG4gICAgICAgICAgICAudGhlbigoKSA9PiBzdHJlYW1Qcm9taXNlKVxuICAgICAgICAgICAgLy8gVGhpcyBtdXN0IGJlIGhhbmRsZWQgdG8gYXZvaWQgdW5oYW5kbGVkIHJlamVjdGlvbiwgYnV0IGp1bXBcbiAgICAgICAgICAgIC8vIHRvIHRoZSBmaW5hbCBjYXRjaCBibG9jayB3aXRoIGEgbGFiZWwgdG8gbm90IGxvZyB0aGlzIGVycm9yLlxuICAgICAgICAgICAgLmNhdGNoKChfaWdub3JlZCkgPT4ge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFNJTEVOVF9FUlJPUik7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoc3RyZWFtUmVzdWx0KSA9PiBzdHJlYW1SZXN1bHQucmVzcG9uc2UpXG4gICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGlmIChpc1ZhbGlkUmVzcG9uc2UocmVzcG9uc2UpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faGlzdG9yeS5wdXNoKG5ld0NvbnRlbnQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlQ29udGVudCA9IE9iamVjdC5hc3NpZ24oe30sIHJlc3BvbnNlLmNhbmRpZGF0ZXNbMF0uY29udGVudCk7XG4gICAgICAgICAgICAgICAgLy8gUmVzcG9uc2Ugc2VlbXMgdG8gY29tZSBiYWNrIHdpdGhvdXQgYSByb2xlIHNldC5cbiAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlQ29udGVudC5yb2xlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlQ29udGVudC5yb2xlID0gXCJtb2RlbFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9oaXN0b3J5LnB1c2gocmVzcG9uc2VDb250ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJsb2NrRXJyb3JNZXNzYWdlID0gZm9ybWF0QmxvY2tFcnJvck1lc3NhZ2UocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIGlmIChibG9ja0Vycm9yTWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYHNlbmRNZXNzYWdlU3RyZWFtKCkgd2FzIHVuc3VjY2Vzc2Z1bC4gJHtibG9ja0Vycm9yTWVzc2FnZX0uIEluc3BlY3QgcmVzcG9uc2Ugb2JqZWN0IGZvciBkZXRhaWxzLmApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgLy8gRXJyb3JzIGluIHN0cmVhbVByb21pc2UgYXJlIGFscmVhZHkgY2F0Y2hhYmxlIGJ5IHRoZSB1c2VyIGFzXG4gICAgICAgICAgICAvLyBzdHJlYW1Qcm9taXNlIGlzIHJldHVybmVkLlxuICAgICAgICAgICAgLy8gQXZvaWQgZHVwbGljYXRpbmcgdGhlIGVycm9yIG1lc3NhZ2UgaW4gbG9ncy5cbiAgICAgICAgICAgIGlmIChlLm1lc3NhZ2UgIT09IFNJTEVOVF9FUlJPUikge1xuICAgICAgICAgICAgICAgIC8vIFVzZXJzIGRvIG5vdCBoYXZlIGFjY2VzcyB0byBfc2VuZFByb21pc2UgdG8gY2F0Y2ggZXJyb3JzXG4gICAgICAgICAgICAgICAgLy8gZG93bnN0cmVhbSBmcm9tIHN0cmVhbVByb21pc2UsIHNvIHRoZXkgc2hvdWxkIG5vdCB0aHJvdy5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHN0cmVhbVByb21pc2U7XG4gICAgfVxufVxuXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyNCBHb29nbGUgTExDXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gY291bnRUb2tlbnMoYXBpS2V5LCBtb2RlbCwgcGFyYW1zLCBzaW5nbGVSZXF1ZXN0T3B0aW9ucykge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgbWFrZU1vZGVsUmVxdWVzdChtb2RlbCwgVGFzay5DT1VOVF9UT0tFTlMsIGFwaUtleSwgZmFsc2UsIEpTT04uc3RyaW5naWZ5KHBhcmFtcyksIHNpbmdsZVJlcXVlc3RPcHRpb25zKTtcbiAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xufVxuXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyNCBHb29nbGUgTExDXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gZW1iZWRDb250ZW50KGFwaUtleSwgbW9kZWwsIHBhcmFtcywgcmVxdWVzdE9wdGlvbnMpIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IG1ha2VNb2RlbFJlcXVlc3QobW9kZWwsIFRhc2suRU1CRURfQ09OVEVOVCwgYXBpS2V5LCBmYWxzZSwgSlNPTi5zdHJpbmdpZnkocGFyYW1zKSwgcmVxdWVzdE9wdGlvbnMpO1xuICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG59XG5hc3luYyBmdW5jdGlvbiBiYXRjaEVtYmVkQ29udGVudHMoYXBpS2V5LCBtb2RlbCwgcGFyYW1zLCByZXF1ZXN0T3B0aW9ucykge1xuICAgIGNvbnN0IHJlcXVlc3RzV2l0aE1vZGVsID0gcGFyYW1zLnJlcXVlc3RzLm1hcCgocmVxdWVzdCkgPT4ge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCByZXF1ZXN0KSwgeyBtb2RlbCB9KTtcbiAgICB9KTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IG1ha2VNb2RlbFJlcXVlc3QobW9kZWwsIFRhc2suQkFUQ0hfRU1CRURfQ09OVEVOVFMsIGFwaUtleSwgZmFsc2UsIEpTT04uc3RyaW5naWZ5KHsgcmVxdWVzdHM6IHJlcXVlc3RzV2l0aE1vZGVsIH0pLCByZXF1ZXN0T3B0aW9ucyk7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbn1cblxuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMjQgR29vZ2xlIExMQ1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogQ2xhc3MgZm9yIGdlbmVyYXRpdmUgbW9kZWwgQVBJcy5cbiAqIEBwdWJsaWNcbiAqL1xuY2xhc3MgR2VuZXJhdGl2ZU1vZGVsIHtcbiAgICBjb25zdHJ1Y3RvcihhcGlLZXksIG1vZGVsUGFyYW1zLCBfcmVxdWVzdE9wdGlvbnMgPSB7fSkge1xuICAgICAgICB0aGlzLmFwaUtleSA9IGFwaUtleTtcbiAgICAgICAgdGhpcy5fcmVxdWVzdE9wdGlvbnMgPSBfcmVxdWVzdE9wdGlvbnM7XG4gICAgICAgIGlmIChtb2RlbFBhcmFtcy5tb2RlbC5pbmNsdWRlcyhcIi9cIikpIHtcbiAgICAgICAgICAgIC8vIE1vZGVscyBtYXkgYmUgbmFtZWQgXCJtb2RlbHMvbW9kZWwtbmFtZVwiIG9yIFwidHVuZWRNb2RlbHMvbW9kZWwtbmFtZVwiXG4gICAgICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWxQYXJhbXMubW9kZWw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBJZiBwYXRoIGlzIG5vdCBpbmNsdWRlZCwgYXNzdW1lIGl0J3MgYSBub24tdHVuZWQgbW9kZWwuXG4gICAgICAgICAgICB0aGlzLm1vZGVsID0gYG1vZGVscy8ke21vZGVsUGFyYW1zLm1vZGVsfWA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nZW5lcmF0aW9uQ29uZmlnID0gbW9kZWxQYXJhbXMuZ2VuZXJhdGlvbkNvbmZpZyB8fCB7fTtcbiAgICAgICAgdGhpcy5zYWZldHlTZXR0aW5ncyA9IG1vZGVsUGFyYW1zLnNhZmV0eVNldHRpbmdzIHx8IFtdO1xuICAgICAgICB0aGlzLnRvb2xzID0gbW9kZWxQYXJhbXMudG9vbHM7XG4gICAgICAgIHRoaXMudG9vbENvbmZpZyA9IG1vZGVsUGFyYW1zLnRvb2xDb25maWc7XG4gICAgICAgIHRoaXMuc3lzdGVtSW5zdHJ1Y3Rpb24gPSBmb3JtYXRTeXN0ZW1JbnN0cnVjdGlvbihtb2RlbFBhcmFtcy5zeXN0ZW1JbnN0cnVjdGlvbik7XG4gICAgICAgIHRoaXMuY2FjaGVkQ29udGVudCA9IG1vZGVsUGFyYW1zLmNhY2hlZENvbnRlbnQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1ha2VzIGEgc2luZ2xlIG5vbi1zdHJlYW1pbmcgY2FsbCB0byB0aGUgbW9kZWxcbiAgICAgKiBhbmQgcmV0dXJucyBhbiBvYmplY3QgY29udGFpbmluZyBhIHNpbmdsZSB7QGxpbmsgR2VuZXJhdGVDb250ZW50UmVzcG9uc2V9LlxuICAgICAqXG4gICAgICogRmllbGRzIHNldCBpbiB0aGUgb3B0aW9uYWwge0BsaW5rIFNpbmdsZVJlcXVlc3RPcHRpb25zfSBwYXJhbWV0ZXIgd2lsbFxuICAgICAqIHRha2UgcHJlY2VkZW5jZSBvdmVyIHRoZSB7QGxpbmsgUmVxdWVzdE9wdGlvbnN9IHZhbHVlcyBwcm92aWRlZCB0b1xuICAgICAqIHtAbGluayBHb29nbGVHZW5lcmF0aXZlQUkuZ2V0R2VuZXJhdGl2ZU1vZGVsIH0uXG4gICAgICovXG4gICAgYXN5bmMgZ2VuZXJhdGVDb250ZW50KHJlcXVlc3QsIHJlcXVlc3RPcHRpb25zID0ge30pIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCBmb3JtYXR0ZWRQYXJhbXMgPSBmb3JtYXRHZW5lcmF0ZUNvbnRlbnRJbnB1dChyZXF1ZXN0KTtcbiAgICAgICAgY29uc3QgZ2VuZXJhdGl2ZU1vZGVsUmVxdWVzdE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX3JlcXVlc3RPcHRpb25zKSwgcmVxdWVzdE9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gZ2VuZXJhdGVDb250ZW50KHRoaXMuYXBpS2V5LCB0aGlzLm1vZGVsLCBPYmplY3QuYXNzaWduKHsgZ2VuZXJhdGlvbkNvbmZpZzogdGhpcy5nZW5lcmF0aW9uQ29uZmlnLCBzYWZldHlTZXR0aW5nczogdGhpcy5zYWZldHlTZXR0aW5ncywgdG9vbHM6IHRoaXMudG9vbHMsIHRvb2xDb25maWc6IHRoaXMudG9vbENvbmZpZywgc3lzdGVtSW5zdHJ1Y3Rpb246IHRoaXMuc3lzdGVtSW5zdHJ1Y3Rpb24sIGNhY2hlZENvbnRlbnQ6IChfYSA9IHRoaXMuY2FjaGVkQ29udGVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm5hbWUgfSwgZm9ybWF0dGVkUGFyYW1zKSwgZ2VuZXJhdGl2ZU1vZGVsUmVxdWVzdE9wdGlvbnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYWtlcyBhIHNpbmdsZSBzdHJlYW1pbmcgY2FsbCB0byB0aGUgbW9kZWwgYW5kIHJldHVybnMgYW4gb2JqZWN0XG4gICAgICogY29udGFpbmluZyBhbiBpdGVyYWJsZSBzdHJlYW0gdGhhdCBpdGVyYXRlcyBvdmVyIGFsbCBjaHVua3MgaW4gdGhlXG4gICAgICogc3RyZWFtaW5nIHJlc3BvbnNlIGFzIHdlbGwgYXMgYSBwcm9taXNlIHRoYXQgcmV0dXJucyB0aGUgZmluYWxcbiAgICAgKiBhZ2dyZWdhdGVkIHJlc3BvbnNlLlxuICAgICAqXG4gICAgICogRmllbGRzIHNldCBpbiB0aGUgb3B0aW9uYWwge0BsaW5rIFNpbmdsZVJlcXVlc3RPcHRpb25zfSBwYXJhbWV0ZXIgd2lsbFxuICAgICAqIHRha2UgcHJlY2VkZW5jZSBvdmVyIHRoZSB7QGxpbmsgUmVxdWVzdE9wdGlvbnN9IHZhbHVlcyBwcm92aWRlZCB0b1xuICAgICAqIHtAbGluayBHb29nbGVHZW5lcmF0aXZlQUkuZ2V0R2VuZXJhdGl2ZU1vZGVsIH0uXG4gICAgICovXG4gICAgYXN5bmMgZ2VuZXJhdGVDb250ZW50U3RyZWFtKHJlcXVlc3QsIHJlcXVlc3RPcHRpb25zID0ge30pIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCBmb3JtYXR0ZWRQYXJhbXMgPSBmb3JtYXRHZW5lcmF0ZUNvbnRlbnRJbnB1dChyZXF1ZXN0KTtcbiAgICAgICAgY29uc3QgZ2VuZXJhdGl2ZU1vZGVsUmVxdWVzdE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX3JlcXVlc3RPcHRpb25zKSwgcmVxdWVzdE9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gZ2VuZXJhdGVDb250ZW50U3RyZWFtKHRoaXMuYXBpS2V5LCB0aGlzLm1vZGVsLCBPYmplY3QuYXNzaWduKHsgZ2VuZXJhdGlvbkNvbmZpZzogdGhpcy5nZW5lcmF0aW9uQ29uZmlnLCBzYWZldHlTZXR0aW5nczogdGhpcy5zYWZldHlTZXR0aW5ncywgdG9vbHM6IHRoaXMudG9vbHMsIHRvb2xDb25maWc6IHRoaXMudG9vbENvbmZpZywgc3lzdGVtSW5zdHJ1Y3Rpb246IHRoaXMuc3lzdGVtSW5zdHJ1Y3Rpb24sIGNhY2hlZENvbnRlbnQ6IChfYSA9IHRoaXMuY2FjaGVkQ29udGVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm5hbWUgfSwgZm9ybWF0dGVkUGFyYW1zKSwgZ2VuZXJhdGl2ZU1vZGVsUmVxdWVzdE9wdGlvbnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgbmV3IHtAbGluayBDaGF0U2Vzc2lvbn0gaW5zdGFuY2Ugd2hpY2ggY2FuIGJlIHVzZWQgZm9yXG4gICAgICogbXVsdGktdHVybiBjaGF0cy5cbiAgICAgKi9cbiAgICBzdGFydENoYXQoc3RhcnRDaGF0UGFyYW1zKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuIG5ldyBDaGF0U2Vzc2lvbih0aGlzLmFwaUtleSwgdGhpcy5tb2RlbCwgT2JqZWN0LmFzc2lnbih7IGdlbmVyYXRpb25Db25maWc6IHRoaXMuZ2VuZXJhdGlvbkNvbmZpZywgc2FmZXR5U2V0dGluZ3M6IHRoaXMuc2FmZXR5U2V0dGluZ3MsIHRvb2xzOiB0aGlzLnRvb2xzLCB0b29sQ29uZmlnOiB0aGlzLnRvb2xDb25maWcsIHN5c3RlbUluc3RydWN0aW9uOiB0aGlzLnN5c3RlbUluc3RydWN0aW9uLCBjYWNoZWRDb250ZW50OiAoX2EgPSB0aGlzLmNhY2hlZENvbnRlbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5uYW1lIH0sIHN0YXJ0Q2hhdFBhcmFtcyksIHRoaXMuX3JlcXVlc3RPcHRpb25zKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ291bnRzIHRoZSB0b2tlbnMgaW4gdGhlIHByb3ZpZGVkIHJlcXVlc3QuXG4gICAgICpcbiAgICAgKiBGaWVsZHMgc2V0IGluIHRoZSBvcHRpb25hbCB7QGxpbmsgU2luZ2xlUmVxdWVzdE9wdGlvbnN9IHBhcmFtZXRlciB3aWxsXG4gICAgICogdGFrZSBwcmVjZWRlbmNlIG92ZXIgdGhlIHtAbGluayBSZXF1ZXN0T3B0aW9uc30gdmFsdWVzIHByb3ZpZGVkIHRvXG4gICAgICoge0BsaW5rIEdvb2dsZUdlbmVyYXRpdmVBSS5nZXRHZW5lcmF0aXZlTW9kZWwgfS5cbiAgICAgKi9cbiAgICBhc3luYyBjb3VudFRva2VucyhyZXF1ZXN0LCByZXF1ZXN0T3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZFBhcmFtcyA9IGZvcm1hdENvdW50VG9rZW5zSW5wdXQocmVxdWVzdCwge1xuICAgICAgICAgICAgbW9kZWw6IHRoaXMubW9kZWwsXG4gICAgICAgICAgICBnZW5lcmF0aW9uQ29uZmlnOiB0aGlzLmdlbmVyYXRpb25Db25maWcsXG4gICAgICAgICAgICBzYWZldHlTZXR0aW5nczogdGhpcy5zYWZldHlTZXR0aW5ncyxcbiAgICAgICAgICAgIHRvb2xzOiB0aGlzLnRvb2xzLFxuICAgICAgICAgICAgdG9vbENvbmZpZzogdGhpcy50b29sQ29uZmlnLFxuICAgICAgICAgICAgc3lzdGVtSW5zdHJ1Y3Rpb246IHRoaXMuc3lzdGVtSW5zdHJ1Y3Rpb24sXG4gICAgICAgICAgICBjYWNoZWRDb250ZW50OiB0aGlzLmNhY2hlZENvbnRlbnQsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBnZW5lcmF0aXZlTW9kZWxSZXF1ZXN0T3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fcmVxdWVzdE9wdGlvbnMpLCByZXF1ZXN0T3B0aW9ucyk7XG4gICAgICAgIHJldHVybiBjb3VudFRva2Vucyh0aGlzLmFwaUtleSwgdGhpcy5tb2RlbCwgZm9ybWF0dGVkUGFyYW1zLCBnZW5lcmF0aXZlTW9kZWxSZXF1ZXN0T3B0aW9ucyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVtYmVkcyB0aGUgcHJvdmlkZWQgY29udGVudC5cbiAgICAgKlxuICAgICAqIEZpZWxkcyBzZXQgaW4gdGhlIG9wdGlvbmFsIHtAbGluayBTaW5nbGVSZXF1ZXN0T3B0aW9uc30gcGFyYW1ldGVyIHdpbGxcbiAgICAgKiB0YWtlIHByZWNlZGVuY2Ugb3ZlciB0aGUge0BsaW5rIFJlcXVlc3RPcHRpb25zfSB2YWx1ZXMgcHJvdmlkZWQgdG9cbiAgICAgKiB7QGxpbmsgR29vZ2xlR2VuZXJhdGl2ZUFJLmdldEdlbmVyYXRpdmVNb2RlbCB9LlxuICAgICAqL1xuICAgIGFzeW5jIGVtYmVkQ29udGVudChyZXF1ZXN0LCByZXF1ZXN0T3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZFBhcmFtcyA9IGZvcm1hdEVtYmVkQ29udGVudElucHV0KHJlcXVlc3QpO1xuICAgICAgICBjb25zdCBnZW5lcmF0aXZlTW9kZWxSZXF1ZXN0T3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fcmVxdWVzdE9wdGlvbnMpLCByZXF1ZXN0T3B0aW9ucyk7XG4gICAgICAgIHJldHVybiBlbWJlZENvbnRlbnQodGhpcy5hcGlLZXksIHRoaXMubW9kZWwsIGZvcm1hdHRlZFBhcmFtcywgZ2VuZXJhdGl2ZU1vZGVsUmVxdWVzdE9wdGlvbnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFbWJlZHMgYW4gYXJyYXkgb2Yge0BsaW5rIEVtYmVkQ29udGVudFJlcXVlc3R9cy5cbiAgICAgKlxuICAgICAqIEZpZWxkcyBzZXQgaW4gdGhlIG9wdGlvbmFsIHtAbGluayBTaW5nbGVSZXF1ZXN0T3B0aW9uc30gcGFyYW1ldGVyIHdpbGxcbiAgICAgKiB0YWtlIHByZWNlZGVuY2Ugb3ZlciB0aGUge0BsaW5rIFJlcXVlc3RPcHRpb25zfSB2YWx1ZXMgcHJvdmlkZWQgdG9cbiAgICAgKiB7QGxpbmsgR29vZ2xlR2VuZXJhdGl2ZUFJLmdldEdlbmVyYXRpdmVNb2RlbCB9LlxuICAgICAqL1xuICAgIGFzeW5jIGJhdGNoRW1iZWRDb250ZW50cyhiYXRjaEVtYmVkQ29udGVudFJlcXVlc3QsIHJlcXVlc3RPcHRpb25zID0ge30pIHtcbiAgICAgICAgY29uc3QgZ2VuZXJhdGl2ZU1vZGVsUmVxdWVzdE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX3JlcXVlc3RPcHRpb25zKSwgcmVxdWVzdE9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gYmF0Y2hFbWJlZENvbnRlbnRzKHRoaXMuYXBpS2V5LCB0aGlzLm1vZGVsLCBiYXRjaEVtYmVkQ29udGVudFJlcXVlc3QsIGdlbmVyYXRpdmVNb2RlbFJlcXVlc3RPcHRpb25zKTtcbiAgICB9XG59XG5cbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDI0IEdvb2dsZSBMTENcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIFRvcC1sZXZlbCBjbGFzcyBmb3IgdGhpcyBTREtcbiAqIEBwdWJsaWNcbiAqL1xuY2xhc3MgR29vZ2xlR2VuZXJhdGl2ZUFJIHtcbiAgICBjb25zdHJ1Y3RvcihhcGlLZXkpIHtcbiAgICAgICAgdGhpcy5hcGlLZXkgPSBhcGlLZXk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgYSB7QGxpbmsgR2VuZXJhdGl2ZU1vZGVsfSBpbnN0YW5jZSBmb3IgdGhlIHByb3ZpZGVkIG1vZGVsIG5hbWUuXG4gICAgICovXG4gICAgZ2V0R2VuZXJhdGl2ZU1vZGVsKG1vZGVsUGFyYW1zLCByZXF1ZXN0T3B0aW9ucykge1xuICAgICAgICBpZiAoIW1vZGVsUGFyYW1zLm1vZGVsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgR29vZ2xlR2VuZXJhdGl2ZUFJRXJyb3IoYE11c3QgcHJvdmlkZSBhIG1vZGVsIG5hbWUuIGAgK1xuICAgICAgICAgICAgICAgIGBFeGFtcGxlOiBnZW5haS5nZXRHZW5lcmF0aXZlTW9kZWwoeyBtb2RlbDogJ215LW1vZGVsLW5hbWUnIH0pYCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBHZW5lcmF0aXZlTW9kZWwodGhpcy5hcGlLZXksIG1vZGVsUGFyYW1zLCByZXF1ZXN0T3B0aW9ucyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSB7QGxpbmsgR2VuZXJhdGl2ZU1vZGVsfSBpbnN0YW5jZSBmcm9tIHByb3ZpZGVkIGNvbnRlbnQgY2FjaGUuXG4gICAgICovXG4gICAgZ2V0R2VuZXJhdGl2ZU1vZGVsRnJvbUNhY2hlZENvbnRlbnQoY2FjaGVkQ29udGVudCwgbW9kZWxQYXJhbXMsIHJlcXVlc3RPcHRpb25zKSB7XG4gICAgICAgIGlmICghY2FjaGVkQ29udGVudC5uYW1lKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgR29vZ2xlR2VuZXJhdGl2ZUFJUmVxdWVzdElucHV0RXJyb3IoXCJDYWNoZWQgY29udGVudCBtdXN0IGNvbnRhaW4gYSBgbmFtZWAgZmllbGQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY2FjaGVkQ29udGVudC5tb2RlbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEdvb2dsZUdlbmVyYXRpdmVBSVJlcXVlc3RJbnB1dEVycm9yKFwiQ2FjaGVkIGNvbnRlbnQgbXVzdCBjb250YWluIGEgYG1vZGVsYCBmaWVsZC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE5vdCBjaGVja2luZyB0b29scyBhbmQgdG9vbENvbmZpZyBmb3Igbm93IGFzIGl0IHdvdWxkIHJlcXVpcmUgYSBkZWVwXG4gICAgICAgICAqIGVxdWFsaXR5IGNvbXBhcmlzb24gYW5kIGlzbid0IGxpa2VseSB0byBiZSBhIGNvbW1vbiBjYXNlLlxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgZGlzYWxsb3dlZER1cGxpY2F0ZXMgPSBbXCJtb2RlbFwiLCBcInN5c3RlbUluc3RydWN0aW9uXCJdO1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBkaXNhbGxvd2VkRHVwbGljYXRlcykge1xuICAgICAgICAgICAgaWYgKChtb2RlbFBhcmFtcyA9PT0gbnVsbCB8fCBtb2RlbFBhcmFtcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogbW9kZWxQYXJhbXNba2V5XSkgJiZcbiAgICAgICAgICAgICAgICBjYWNoZWRDb250ZW50W2tleV0gJiZcbiAgICAgICAgICAgICAgICAobW9kZWxQYXJhbXMgPT09IG51bGwgfHwgbW9kZWxQYXJhbXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1vZGVsUGFyYW1zW2tleV0pICE9PSBjYWNoZWRDb250ZW50W2tleV0pIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSBcIm1vZGVsXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbW9kZWxQYXJhbXNDb21wID0gbW9kZWxQYXJhbXMubW9kZWwuc3RhcnRzV2l0aChcIm1vZGVscy9cIilcbiAgICAgICAgICAgICAgICAgICAgICAgID8gbW9kZWxQYXJhbXMubW9kZWwucmVwbGFjZShcIm1vZGVscy9cIiwgXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIDogbW9kZWxQYXJhbXMubW9kZWw7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhY2hlZENvbnRlbnRDb21wID0gY2FjaGVkQ29udGVudC5tb2RlbC5zdGFydHNXaXRoKFwibW9kZWxzL1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBjYWNoZWRDb250ZW50Lm1vZGVsLnJlcGxhY2UoXCJtb2RlbHMvXCIsIFwiXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGNhY2hlZENvbnRlbnQubW9kZWw7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtb2RlbFBhcmFtc0NvbXAgPT09IGNhY2hlZENvbnRlbnRDb21wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgR29vZ2xlR2VuZXJhdGl2ZUFJUmVxdWVzdElucHV0RXJyb3IoYERpZmZlcmVudCB2YWx1ZSBmb3IgXCIke2tleX1cIiBzcGVjaWZpZWQgaW4gbW9kZWxQYXJhbXNgICtcbiAgICAgICAgICAgICAgICAgICAgYCAoJHttb2RlbFBhcmFtc1trZXldfSkgYW5kIGNhY2hlZENvbnRlbnQgKCR7Y2FjaGVkQ29udGVudFtrZXldfSlgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBtb2RlbFBhcmFtc0Zyb21DYWNoZSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbW9kZWxQYXJhbXMpLCB7IG1vZGVsOiBjYWNoZWRDb250ZW50Lm1vZGVsLCB0b29sczogY2FjaGVkQ29udGVudC50b29scywgdG9vbENvbmZpZzogY2FjaGVkQ29udGVudC50b29sQ29uZmlnLCBzeXN0ZW1JbnN0cnVjdGlvbjogY2FjaGVkQ29udGVudC5zeXN0ZW1JbnN0cnVjdGlvbiwgY2FjaGVkQ29udGVudCB9KTtcbiAgICAgICAgcmV0dXJuIG5ldyBHZW5lcmF0aXZlTW9kZWwodGhpcy5hcGlLZXksIG1vZGVsUGFyYW1zRnJvbUNhY2hlLCByZXF1ZXN0T3B0aW9ucyk7XG4gICAgfVxufVxuXG5leHBvcnQgeyBCbG9ja1JlYXNvbiwgQ2hhdFNlc3Npb24sIER5bmFtaWNSZXRyaWV2YWxNb2RlLCBFeGVjdXRhYmxlQ29kZUxhbmd1YWdlLCBGaW5pc2hSZWFzb24sIEZ1bmN0aW9uQ2FsbGluZ01vZGUsIEdlbmVyYXRpdmVNb2RlbCwgR29vZ2xlR2VuZXJhdGl2ZUFJLCBHb29nbGVHZW5lcmF0aXZlQUlBYm9ydEVycm9yLCBHb29nbGVHZW5lcmF0aXZlQUlFcnJvciwgR29vZ2xlR2VuZXJhdGl2ZUFJRmV0Y2hFcnJvciwgR29vZ2xlR2VuZXJhdGl2ZUFJUmVxdWVzdElucHV0RXJyb3IsIEdvb2dsZUdlbmVyYXRpdmVBSVJlc3BvbnNlRXJyb3IsIEhhcm1CbG9ja1RocmVzaG9sZCwgSGFybUNhdGVnb3J5LCBIYXJtUHJvYmFiaWxpdHksIE91dGNvbWUsIFBPU1NJQkxFX1JPTEVTLCBTY2hlbWFUeXBlLCBUYXNrVHlwZSB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwgIi8qKlxuICogXHVCQ0ExXHVEMTMwIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUJDMEYgXHVDNzIwXHVDMEFDXHVCM0M0IFx1QUNDNFx1QzBCMCBcdUJBQThcdUI0QzhcbiAqL1xuXG5pbXBvcnQgdHlwZSB7IEFwcCwgUGx1Z2luTWFuaWZlc3QgfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgeyBHb29nbGVHZW5lcmF0aXZlQUkgfSBmcm9tICdAZ29vZ2xlL2dlbmVyYXRpdmUtYWknO1xuXG4vKipcbiAqIFx1Q0Y1NFx1QzBBQ1x1Qzc3OCBcdUM3MjBcdUMwQUNcdUIzQzRcdUI5N0MgXHVBQ0M0XHVDMEIwXHVENTY5XHVCMkM4XHVCMkU0XG4gKiBAcGFyYW0gdmVjQSBcdUJDQTFcdUQxMzAgQVxuICogQHBhcmFtIHZlY0IgXHVCQ0ExXHVEMTMwIEJcbiAqIEByZXR1cm5zIFx1Q0Y1NFx1QzBBQ1x1Qzc3OCBcdUM3MjBcdUMwQUNcdUIzQzQgKC0xfjEpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb3NpbmVTaW1pbGFyaXR5KHZlY0E6IG51bWJlcltdLCB2ZWNCOiBudW1iZXJbXSk6IG51bWJlciB7XG4gIGlmICh2ZWNBLmxlbmd0aCAhPT0gdmVjQi5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1x1QkNBMVx1RDEzMFx1Qzc1OCBcdUNDMjhcdUM2RDBcdUM3NzQgXHVDNzdDXHVDRTU4XHVENTU4XHVDOUMwIFx1QzU0QVx1QzJCNVx1QjJDOFx1QjJFNCcpO1xuICB9XG5cbiAgbGV0IGRvdFByb2R1Y3QgPSAwO1xuICBsZXQgbm9ybUEgPSAwO1xuICBsZXQgbm9ybUIgPSAwO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdmVjQS5sZW5ndGg7IGkrKykge1xuICAgIGRvdFByb2R1Y3QgKz0gdmVjQVtpXSAqIHZlY0JbaV07XG4gICAgbm9ybUEgKz0gdmVjQVtpXSAqIHZlY0FbaV07XG4gICAgbm9ybUIgKz0gdmVjQltpXSAqIHZlY0JbaV07XG4gIH1cblxuICBjb25zdCBkZW5vbWluYXRvciA9IE1hdGguc3FydChub3JtQSkgKiBNYXRoLnNxcnQobm9ybUIpO1xuICBpZiAoZGVub21pbmF0b3IgPT09IDApIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHJldHVybiBkb3RQcm9kdWN0IC8gZGVub21pbmF0b3I7XG59XG5cbi8qKlxuICogR2VtaW5pIEFQSVx1Qjk3QyBcdUMwQUNcdUM2QTlcdUQ1NThcdUM1RUMgXHVEMTREXHVDMkE0XHVEMkI4IFx1Qzc4NFx1QkNBMFx1QjUyOVx1Qzc0NCBcdUMwRERcdUMxMzFcdUQ1NjlcdUIyQzhcdUIyRTRcbiAqL1xuZXhwb3J0IGNsYXNzIEVtYmVkZGluZ0dlbmVyYXRvciB7XG4gIHByaXZhdGUgZ2VuQUk6IEdvb2dsZUdlbmVyYXRpdmVBSSB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIG1vZGVsOiBhbnkgPSBudWxsO1xuICBwcml2YXRlIGNhY2hlOiBNYXA8c3RyaW5nLCBudW1iZXJbXT4gPSBuZXcgTWFwKCk7XG4gIHByaXZhdGUgbGFzdEVtYmVkZGluZzogbnVtYmVyW10gfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBsYXN0VGV4dDogc3RyaW5nID0gJyc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhcGlLZXk6IHN0cmluZyxcbiAgICBwcml2YXRlIG1vZGVsTmFtZTogc3RyaW5nID0gJ2VtYmVkZGluZy0wMDEnLFxuICAgIHByaXZhdGUgYXBwPzogQXBwLFxuICAgIHByaXZhdGUgbWFuaWZlc3Q/OiBQbHVnaW5NYW5pZmVzdCxcbiAgICBwcml2YXRlIGVuYWJsZUxvZ2dpbmc6IGJvb2xlYW4gPSBmYWxzZVxuICApIHtcbiAgICBpZiAoYXBpS2V5KSB7XG4gICAgICB0aGlzLmdlbkFJID0gbmV3IEdvb2dsZUdlbmVyYXRpdmVBSShhcGlLZXkpO1xuICAgICAgLy8gbW9kZWxzLyBcdUM4MTFcdUI0NTBcdUMwQUMgXHVDODFDXHVBQzcwXG4gICAgICBjb25zdCBjbGVhbk1vZGVsTmFtZSA9IHRoaXMubW9kZWxOYW1lLnJlcGxhY2UoL15tb2RlbHNcXC8vLCAnJyk7XG4gICAgICB0aGlzLm1vZGVsID0gdGhpcy5nZW5BSS5nZXRHZW5lcmF0aXZlTW9kZWwoeyBtb2RlbDogY2xlYW5Nb2RlbE5hbWUgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFx1RDE0RFx1QzJBNFx1RDJCOFx1Qjk3QyBcdUJDQTFcdUQxMzBcdUI4NUMgXHVCQ0MwXHVENjU4XHVENTY5XHVCMkM4XHVCMkU0XG4gICAqIEBwYXJhbSB0ZXh0IFx1Qzc4NVx1QjgyNSBcdUQxNERcdUMyQTRcdUQyQjhcbiAgICogQHJldHVybnMgXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QkNBMVx1RDEzMFxuICAgKi9cbiAgYXN5bmMgZW1iZWQodGV4dDogc3RyaW5nKTogUHJvbWlzZTxudW1iZXJbXT4ge1xuICAgIGlmICghdGhpcy5tb2RlbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdHZW1pbmkgQVBJXHVBQzAwIFx1Q0QwOFx1QUUzMFx1RDY1NFx1QjQxOFx1QzlDMCBcdUM1NEFcdUM1NThcdUMyQjVcdUIyQzhcdUIyRTQnKTtcbiAgICB9XG5cbiAgICBsZXQgZW1iZWRkaW5nOiBudW1iZXJbXSB8IHVuZGVmaW5lZDtcblxuICAgIC8vIFx1Q0U5MFx1QzJEQyBcdUQ2NTVcdUM3NzhcbiAgICBpZiAodGhpcy5jYWNoZS5oYXModGV4dCkpIHtcbiAgICAgIGVtYmVkZGluZyA9IHRoaXMuY2FjaGUuZ2V0KHRleHQpITtcbiAgICB9IGVsc2Uge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5tb2RlbC5lbWJlZENvbnRlbnQodGV4dCk7XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IHJlc3VsdD8uZW1iZWRkaW5nPy52YWx1ZXM7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZXMpIHx8IHZhbHVlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1x1Qzc4NFx1QkNBMFx1QjUyOSBcdUM3NTFcdUIyRjVcdUM3NzQgXHVCRTQ0XHVDNUI0IFx1Qzc4OFx1QzJCNVx1QjJDOFx1QjJFNCcpO1xuICAgICAgICB9XG4gICAgICAgIGVtYmVkZGluZyA9IHZhbHVlcztcblxuICAgICAgICAvLyBcdUNFOTBcdUMyRENcdUM1RDAgXHVDODAwXHVDN0E1XG4gICAgICAgIHRoaXMuY2FjaGUuc2V0KHRleHQsIGVtYmVkZGluZyk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdcdUM3ODRcdUJDQTBcdUI1MjkgXHVDMEREXHVDMTMxIFx1QzJFNFx1RDMyODonLCBlcnJvcik7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzBERFx1QzEzMSBcdUMyRTRcdUQzMjg6ICR7ZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpfWApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghZW1iZWRkaW5nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1x1Qzc4NFx1QkNBMFx1QjUyOSBcdUMwRERcdUMxMzEgXHVBQ0IwXHVBQ0ZDXHVBQzAwIFx1QzVDNlx1QzJCNVx1QjJDOFx1QjJFNCcpO1xuICAgIH1cblxuICAgIC8vIFx1Qjg1Q1x1QUU0NSBcdUNDOThcdUI5QUMgLSBcdUJBQThcdUI0RTAgXHVDNzg0XHVCQ0EwXHVCNTI5KFx1Q0U5MFx1QzJEQyBcdUQzRUNcdUQ1NjgpXHVDNzQ0IFx1Qjg1Q1x1QUU0NVxuICAgIGlmICh0aGlzLmVuYWJsZUxvZ2dpbmcgJiYgdGhpcy5hcHApIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHsgYXBwZW5kRW1iZWRkaW5nTG9nIH0gPSBhd2FpdCBpbXBvcnQoJy4uL2xvZ2dpbmcnKTtcbiAgICAgICAgbGV0IHNpbWlsYXJpdHk6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICAgICAgbGV0IHByZXZpb3VzVGV4dDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgICAgIGlmICh0aGlzLmxhc3RFbWJlZGRpbmcpIHtcbiAgICAgICAgICBzaW1pbGFyaXR5ID0gY29zaW5lU2ltaWxhcml0eSh0aGlzLmxhc3RFbWJlZGRpbmcsIGVtYmVkZGluZyk7XG4gICAgICAgICAgcHJldmlvdXNUZXh0ID0gdGhpcy5sYXN0VGV4dDtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IGFwcGVuZEVtYmVkZGluZ0xvZyh0aGlzLmFwcCwgdGhpcy5tYW5pZmVzdCwge1xuICAgICAgICAgIGlucHV0VGV4dDogdGV4dCxcbiAgICAgICAgICBlbWJlZGRpbmcsXG4gICAgICAgICAgc2ltaWxhcml0eSxcbiAgICAgICAgICBwcmV2aW91c0lucHV0VGV4dDogcHJldmlvdXNUZXh0XG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAobG9nRXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignXHVDNzg0XHVCQ0EwXHVCNTI5IFx1Qjg1Q1x1QURGOCBcdUM3OTFcdUMxMzEgXHVDMkU0XHVEMzI4OicsIGxvZ0Vycm9yKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBcdUI5QzhcdUM5QzBcdUI5QzkgXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzVDNVx1QjM3MFx1Qzc3NFx1RDJCOFxuICAgIHRoaXMubGFzdEVtYmVkZGluZyA9IGVtYmVkZGluZztcbiAgICB0aGlzLmxhc3RUZXh0ID0gdGV4dDtcblxuICAgIHJldHVybiBlbWJlZGRpbmc7XG4gIH1cblxuICAvKipcbiAgICogXHVDNUVDXHVCN0VDIFx1RDE0RFx1QzJBNFx1RDJCOFx1Qjk3QyBcdUQ1NUMgXHVCQzg4XHVDNUQwIFx1QkNBMVx1RDEzMFx1Qjg1QyBcdUJDQzBcdUQ2NThcdUQ1NjlcdUIyQzhcdUIyRTRcbiAgICogQHBhcmFtIHRleHRzIFx1Qzc4NVx1QjgyNSBcdUQxNERcdUMyQTRcdUQyQjggXHVCQzMwXHVDNUY0XG4gICAqIEByZXR1cm5zIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUJDQTFcdUQxMzAgXHVCQzMwXHVDNUY0XG4gICAqL1xuICBhc3luYyBlbWJlZEJhdGNoKHRleHRzOiBzdHJpbmdbXSk6IFByb21pc2U8bnVtYmVyW11bXT4ge1xuICAgIGNvbnN0IGVtYmVkZGluZ3M6IG51bWJlcltdW10gPSBbXTtcblxuICAgIGZvciAoY29uc3QgdGV4dCBvZiB0ZXh0cykge1xuICAgICAgY29uc3QgZW1iZWRkaW5nID0gYXdhaXQgdGhpcy5lbWJlZCh0ZXh0KTtcbiAgICAgIGVtYmVkZGluZ3MucHVzaChlbWJlZGRpbmcpO1xuICAgIH1cblxuICAgIHJldHVybiBlbWJlZGRpbmdzO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1Q0U5MFx1QzJEQ1x1Qjk3QyBcdUNEMDhcdUFFMzBcdUQ2NTRcdUQ1NjlcdUIyQzhcdUIyRTRcbiAgICovXG4gIGNsZWFyQ2FjaGUoKTogdm9pZCB7XG4gICAgdGhpcy5jYWNoZS5jbGVhcigpO1xuICB9XG59XG4iLCAiLyoqXG4gKiBcdUM4RkNcdUM4MUMgXHVCRDg0XHVCOUFDIFx1QzVENFx1QzlDNFxuICogXG4gKiBcdUIzMDBcdUQ2NTRcdUM3NTggXHVDNzU4XHVCQkY4XHVCODYwXHVDODAxIFx1QUNCRFx1QUNDNFx1Qjk3QyBcdUQwRDBcdUM5QzBcdUQ1NThcdUM1RUMgXHVDOEZDXHVDODFDXHVCQ0M0XHVCODVDIFx1QkQ4NFx1QjlBQ1x1RDU2OVx1QjJDOFx1QjJFNC5cbiAqL1xuXG5pbXBvcnQgdHlwZSB7IEFwcCwgUGx1Z2luTWFuaWZlc3QgfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvblR1cm4gfSBmcm9tICcuLi9jb252ZXJzYXRpb24nO1xuaW1wb3J0IHsgZXh0cmFjdEtleXdvcmRzLCBmb3JtYXRLZXl3b3Jkc01ldGFkYXRhLCBleHRyYWN0Q29tbW9uS2V5d29yZHMgfSBmcm9tICcuL2tleXdvcmRFeHRyYWN0b3InO1xuaW1wb3J0IHsgRW1iZWRkaW5nR2VuZXJhdG9yLCBjb3NpbmVTaW1pbGFyaXR5IH0gZnJvbSAnLi9lbWJlZGRpbmdTZXJ2aWNlJztcbmltcG9ydCB7IGFwcGVuZFRvcGljU2VwYXJhdGlvbkZhaWx1cmVMb2cgfSBmcm9tICcuLi9sb2dnaW5nJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uU2VnbWVudCwgVG9waWNCb3VuZGFyeSwgU2VnbWVudExpbmssIFRvcGljU2VwYXJhdGlvblJlc3VsdCB9IGZyb20gJy4vdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFRvcGljU2VwYXJhdGlvbkNvbmZpZyB7XG4gIGFwaUtleTogc3RyaW5nO1xuICBlbWJlZGRpbmdNb2RlbD86IHN0cmluZzsgLy8gXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QkFBOFx1QjM3OCBcdUM3NzRcdUI5ODRcbiAgc2ltaWxhcml0eVRocmVzaG9sZD86IG51bWJlcjsgLy8gXHVBRTMwXHVCQ0Y4XHVBQzEyOiAwLjc1XG4gIG1pblNlZ21lbnRMZW5ndGg/OiBudW1iZXI7IC8vIFx1Q0Q1Q1x1QzE4QyBcdUMxMzhcdUFERjhcdUJBM0NcdUQyQjggXHVBRTM4XHVDNzc0IChcdUQxMzQgXHVDMjE4KVxuICB3aW5kb3dTaXplPzogbnVtYmVyOyAvLyBcdUMyQUNcdUI3N0NcdUM3NzRcdUI1MjkgXHVDNzA4XHVCM0M0XHVDNkIwIFx1RDA2Q1x1QUUzMFxuICBlbmFibGVLZXl3b3JkTWV0YWRhdGE/OiBib29sZWFuOyAvLyBcdUQwQTRcdUM2Q0NcdUI0REMgXHVCQTU0XHVEMEMwXHVCMzcwXHVDNzc0XHVEMTMwIFx1QzBBQ1x1QzZBOSBcdUM1RUNcdUJEODBcbiAgYXBwPzogQXBwOyAvLyBcdUI4NUNcdUFFNDVcdUM2QTkgT2JzaWRpYW4gXHVDNTcxXG4gIG1hbmlmZXN0PzogUGx1Z2luTWFuaWZlc3Q7IC8vIFx1RDUwQ1x1QjdFQ1x1QURGOFx1Qzc3OCBcdUI5RTRcdUIyQzhcdUQzOThcdUMyQTRcdUQyQjhcbiAgZW5hYmxlRW1iZWRkaW5nTG9nZ2luZz86IGJvb2xlYW47IC8vIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUI4NUNcdUFFNDUgXHVENjVDXHVDMTMxXHVENjU0XG59XG5cbmV4cG9ydCBjbGFzcyBUb3BpY1NlcGFyYXRpb25FbmdpbmUge1xuICBwcml2YXRlIGVtYmVkZGluZ0dlbmVyYXRvcjogRW1iZWRkaW5nR2VuZXJhdG9yO1xuICBwcml2YXRlIGNvbmZpZzogVG9waWNTZXBhcmF0aW9uQ29uZmlnO1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogVG9waWNTZXBhcmF0aW9uQ29uZmlnKSB7XG4gICAgdGhpcy5jb25maWcgPSB7XG4gICAgICAuLi5jb25maWcsXG4gICAgICBzaW1pbGFyaXR5VGhyZXNob2xkOiBjb25maWcuc2ltaWxhcml0eVRocmVzaG9sZCA/PyAwLjc1LFxuICAgICAgbWluU2VnbWVudExlbmd0aDogY29uZmlnLm1pblNlZ21lbnRMZW5ndGggPz8gMixcbiAgICAgIHdpbmRvd1NpemU6IGNvbmZpZy53aW5kb3dTaXplID8/IDIsXG4gICAgICBlbmFibGVLZXl3b3JkTWV0YWRhdGE6IGNvbmZpZy5lbmFibGVLZXl3b3JkTWV0YWRhdGEgPz8gdHJ1ZSxcbiAgICAgIGVuYWJsZUVtYmVkZGluZ0xvZ2dpbmc6IGNvbmZpZy5lbmFibGVFbWJlZGRpbmdMb2dnaW5nID8/IGZhbHNlXG4gICAgfTtcbiAgICB0aGlzLmVtYmVkZGluZ0dlbmVyYXRvciA9IG5ldyBFbWJlZGRpbmdHZW5lcmF0b3IoXG4gICAgICBjb25maWcuYXBpS2V5LFxuICAgICAgY29uZmlnLmVtYmVkZGluZ01vZGVsID8/ICdlbWJlZGRpbmctMDAxJyxcbiAgICAgIGNvbmZpZy5hcHAsXG4gICAgICBjb25maWcubWFuaWZlc3QsXG4gICAgICBjb25maWcuZW5hYmxlRW1iZWRkaW5nTG9nZ2luZyA/PyBmYWxzZVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogXHVCMzAwXHVENjU0XHVCOTdDIFx1QzhGQ1x1QzgxQ1x1QkNDNFx1Qjg1QyBcdUJEODRcdUI5QUNcdUQ1NjlcdUIyQzhcdUIyRTRcbiAgICogQHBhcmFtIHR1cm5zIFx1QjMwMFx1RDY1NCBcdUQxMzQgXHVCQzMwXHVDNUY0XG4gICAqIEByZXR1cm5zIFx1QzhGQ1x1QzgxQyBcdUJEODRcdUI5QUMgXHVBQ0IwXHVBQ0ZDXG4gICAqL1xuICBhc3luYyBzZXBhcmF0ZVRvcGljcyh0dXJuczogQ29udmVyc2F0aW9uVHVybltdKTogUHJvbWlzZTxUb3BpY1NlcGFyYXRpb25SZXN1bHQ+IHtcbiAgICB0cnkge1xuICAgICAgaWYgKHR1cm5zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNlZ21lbnRzOiBbXSxcbiAgICAgICAgICBib3VuZGFyaWVzOiBbXSxcbiAgICAgICAgICBsaW5rczogW11cbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgLy8gMS4gXHVBQzAxIFx1RDEzNFx1Qzc1OCBcdUQxNERcdUMyQTRcdUQyQjggXHVDOTAwXHVCRTQ0IChcdUQwQTRcdUM2Q0NcdUI0REMgXHVCQTU0XHVEMEMwXHVCMzcwXHVDNzc0XHVEMTMwIFx1Q0Q5NFx1QUMwMClcbiAgICAgIGNvbnN0IHR1cm5UZXh0cyA9IHRoaXMucHJlcGFyZVR1cm5UZXh0cyh0dXJucyk7XG5cbiAgICAgIC8vIDIuIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUMwRERcdUMxMzFcbiAgICAgIGNvbnNvbGUubG9nKCdcdUM3ODRcdUJDQTBcdUI1MjkgXHVDMEREXHVDMTMxIFx1QzkxMS4uLicpO1xuICAgICAgbGV0IGVtYmVkZGluZ3M6IG51bWJlcltdW107XG4gICAgICB0cnkge1xuICAgICAgICBlbWJlZGRpbmdzID0gYXdhaXQgdGhpcy5lbWJlZGRpbmdHZW5lcmF0b3IuZW1iZWRCYXRjaCh0dXJuVGV4dHMpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc3QgbXNnID0gYFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUMwRERcdUMxMzEgXHVDMkU0XHVEMzI4OiAke2Vycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKX1gO1xuICAgICAgICBpZiAodGhpcy5jb25maWcuYXBwKSB7XG4gICAgICAgICAgYXdhaXQgYXBwZW5kVG9waWNTZXBhcmF0aW9uRmFpbHVyZUxvZyh0aGlzLmNvbmZpZy5hcHAsIHRoaXMuY29uZmlnLm1hbmlmZXN0LCBtc2csIGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgIH1cblxuICAgICAgLy8gMy4gXHVDMkFDXHVCNzdDXHVDNzc0XHVCNTI5IFx1QzcwOFx1QjNDNFx1QzZCMFx1Qjg1QyBcdUM3MjBcdUMwQUNcdUIzQzQgXHVBQ0M0XHVDMEIwXG4gICAgICBjb25zb2xlLmxvZygnXHVDNzIwXHVDMEFDXHVCM0M0IFx1QUNDNFx1QzBCMCBcdUM5MTEuLi4nKTtcbiAgICAgIGxldCBzaW1pbGFyaXRpZXM6IG51bWJlcltdO1xuICAgICAgdHJ5IHtcbiAgICAgICAgc2ltaWxhcml0aWVzID0gdGhpcy5jYWxjdWxhdGVXaW5kb3dTaW1pbGFyaXRpZXMoZW1iZWRkaW5ncyk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zdCBtc2cgPSBgXHVDNzIwXHVDMEFDXHVCM0M0IFx1QUNDNFx1QzBCMCBcdUMyRTRcdUQzMjg6ICR7ZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpfWA7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5hcHApIHtcbiAgICAgICAgICBhd2FpdCBhcHBlbmRUb3BpY1NlcGFyYXRpb25GYWlsdXJlTG9nKHRoaXMuY29uZmlnLmFwcCwgdGhpcy5jb25maWcubWFuaWZlc3QsIG1zZywgZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgICAgfVxuXG4gICAgICAvLyA0LiBcdUM4RkNcdUM4MUMgXHVBQ0JEXHVBQ0M0IFx1RDBEMFx1QzlDMFxuICAgICAgY29uc29sZS5sb2coJ1x1QzhGQ1x1QzgxQyBcdUFDQkRcdUFDQzQgXHVEMEQwXHVDOUMwIFx1QzkxMS4uLicpO1xuICAgICAgbGV0IGJvdW5kYXJpZXM6IFRvcGljQm91bmRhcnlbXTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGJvdW5kYXJpZXMgPSB0aGlzLmRldGVjdFRvcGljQm91bmRhcmllcyhzaW1pbGFyaXRpZXMpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc3QgbXNnID0gYFx1QzhGQ1x1QzgxQyBcdUFDQkRcdUFDQzQgXHVEMEQwXHVDOUMwIFx1QzJFNFx1RDMyODogJHtlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcil9YDtcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmFwcCkge1xuICAgICAgICAgIGF3YWl0IGFwcGVuZFRvcGljU2VwYXJhdGlvbkZhaWx1cmVMb2codGhpcy5jb25maWcuYXBwLCB0aGlzLmNvbmZpZy5tYW5pZmVzdCwgbXNnLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgICB9XG5cbiAgICAgIC8vIDUuIFx1QzEzOFx1QURGOFx1QkEzQ1x1RDJCOCBcdUMwRERcdUMxMzFcbiAgICAgIGNvbnNvbGUubG9nKCdcdUMxMzhcdUFERjhcdUJBM0NcdUQyQjggXHVDMEREXHVDMTMxIFx1QzkxMS4uLicpO1xuICAgICAgbGV0IHNlZ21lbnRzOiBDb252ZXJzYXRpb25TZWdtZW50W107XG4gICAgICB0cnkge1xuICAgICAgICBzZWdtZW50cyA9IHRoaXMuY3JlYXRlU2VnbWVudHModHVybnMsIGJvdW5kYXJpZXMsIHNpbWlsYXJpdGllcyk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zdCBtc2cgPSBgXHVDMTM4XHVBREY4XHVCQTNDXHVEMkI4IFx1QzBERFx1QzEzMSBcdUMyRTRcdUQzMjg6ICR7ZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpfWA7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5hcHApIHtcbiAgICAgICAgICBhd2FpdCBhcHBlbmRUb3BpY1NlcGFyYXRpb25GYWlsdXJlTG9nKHRoaXMuY29uZmlnLmFwcCwgdGhpcy5jb25maWcubWFuaWZlc3QsIG1zZywgZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgICAgfVxuXG4gICAgICAvLyA2LiBcdUMxMzhcdUFERjhcdUJBM0NcdUQyQjggXHVBQzA0IFx1QjlDMVx1RDA2QyBcdUJEODRcdUMxMURcbiAgICAgIGNvbnNvbGUubG9nKCdcdUMxMzhcdUFERjhcdUJBM0NcdUQyQjggXHVCOUMxXHVEMDZDIFx1QkQ4NFx1QzExRCBcdUM5MTEuLi4nKTtcbiAgICAgIGxldCBsaW5rczogU2VnbWVudExpbmtbXTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGxpbmtzID0gdGhpcy5hbmFseXplU2VnbWVudExpbmtzKHNlZ21lbnRzKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnN0IG1zZyA9IGBcdUMxMzhcdUFERjhcdUJBM0NcdUQyQjggXHVCOUMxXHVEMDZDIFx1QkQ4NFx1QzExRCBcdUMyRTRcdUQzMjg6ICR7ZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpfWA7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5hcHApIHtcbiAgICAgICAgICBhd2FpdCBhcHBlbmRUb3BpY1NlcGFyYXRpb25GYWlsdXJlTG9nKHRoaXMuY29uZmlnLmFwcCwgdGhpcy5jb25maWcubWFuaWZlc3QsIG1zZywgZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBzZWdtZW50cyxcbiAgICAgICAgYm91bmRhcmllcyxcbiAgICAgICAgbGlua3NcbiAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIC8vIFx1Qzc3NFx1QkJGOCBcdUI4NUNcdUFFNDVcdUI0MUMgXHVDNUQwXHVCN0VDXHVCMjk0IFx1QjJFNFx1QzJEQyBcdUI4NUNcdUFFNDVcdUQ1NThcdUM5QzAgXHVDNTRBXHVDNzRDXG4gICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiBlcnJvci5tZXNzYWdlLmluY2x1ZGVzKCdcdUMyRTRcdUQzMjg6JykpIHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG5cbiAgICAgIC8vIFx1QzYwOFx1QzBDMVx1Q0U1OCBcdUJBQkJcdUQ1NUMgXHVDNUQwXHVCN0VDXG4gICAgICBjb25zdCBtc2cgPSBgXHVDOEZDXHVDODFDIFx1QkQ4NFx1QjlBQyBcdUM5MTEgXHVDNjA4XHVDMEMxXHVDRTU4IFx1QkFCQlx1RDU1QyBcdUM2MjRcdUI5NTg6ICR7ZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpfWA7XG4gICAgICBpZiAodGhpcy5jb25maWcuYXBwKSB7XG4gICAgICAgIGF3YWl0IGFwcGVuZFRvcGljU2VwYXJhdGlvbkZhaWx1cmVMb2codGhpcy5jb25maWcuYXBwLCB0aGlzLmNvbmZpZy5tYW5pZmVzdCwgbXNnLCBlcnJvcik7XG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogXHVEMTREXHVDMkE0XHVEMkI4XHVDNzU4IFx1QjlDOFx1QzlDMFx1QjlDOSBOXHVBQzFDIFx1QkIzOFx1QzdBNVx1Qzc0NCBcdUNEOTRcdUNEOUNcdUQ1NjlcdUIyQzhcdUIyRTRcbiAgICovXG4gIHByaXZhdGUgZ2V0TGFzdE5TZW50ZW5jZXModGV4dDogc3RyaW5nLCBuOiBudW1iZXIgPSAzKTogc3RyaW5nIHtcbiAgICAvLyBcdUI5QzhcdUNFNjhcdUQ0NUMsIFx1QjI5MFx1QjA4Q1x1RDQ1QywgXHVCQjNDXHVDNzRDXHVENDVDXHVCODVDIFx1QkIzOFx1QzdBNVx1Qzc0NCBcdUJEODRcdUI5QUNcbiAgICBjb25zdCBzZW50ZW5jZXMgPSB0ZXh0LnNwbGl0KC8oWy4hP10rKS8pLmZpbHRlcihzID0+IHMudHJpbSgpLmxlbmd0aCA+IDApO1xuICAgIFxuICAgIC8vIFx1QkIzOFx1QzdBNSBcdUMzMERcdUM3M0NcdUI4NUMgXHVBRDZDXHVDMTMxIChcdUJCMzhcdUM3QTUgKyBcdUFENkNcdUI0NTBcdUM4MTApXG4gICAgY29uc3Qgc2VudGVuY2VMaXN0OiBzdHJpbmdbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VudGVuY2VzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICBpZiAoaSArIDEgPCBzZW50ZW5jZXMubGVuZ3RoKSB7XG4gICAgICAgIHNlbnRlbmNlTGlzdC5wdXNoKHNlbnRlbmNlc1tpXSArIHNlbnRlbmNlc1tpICsgMV0pO1xuICAgICAgfSBlbHNlIGlmIChpIDwgc2VudGVuY2VzLmxlbmd0aCkge1xuICAgICAgICBzZW50ZW5jZUxpc3QucHVzaChzZW50ZW5jZXNbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvLyBcdUI5QzhcdUM5QzBcdUI5QzkgTlx1QUMxQyBcdUJCMzhcdUM3QTUgXHVDRDk0XHVDRDlDXG4gICAgY29uc3QgbGFzdFNlbnRlbmNlcyA9IHNlbnRlbmNlTGlzdC5zbGljZSgtbik7XG4gICAgcmV0dXJuIGxhc3RTZW50ZW5jZXMuam9pbignICcpLnRyaW0oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUQxMzQgXHVEMTREXHVDMkE0XHVEMkI4XHVCOTdDIFx1QzkwMFx1QkU0NFx1RDU2OVx1QjJDOFx1QjJFNCAoXHVDMEFDXHVDNkE5XHVDNzkwIFx1QzlDMFx1QzgxNSBcdUQ2MTVcdUMyREQpXG4gICAqIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUM3ODVcdUI4MjUgPSBbXHVENjA0XHVDN0FDIFx1QzlDOFx1QkIzOFx1QUNGQyBcdUFERjggXHVCMkY1XHVCQ0MwXHVDNzU4IFx1RDBBNFx1QzZDQ1x1QjREQ10gKyBcdUM3NzRcdUM4MDQgYXNzaXN0YW50IFx1QjlDOFx1QzlDMFx1QjlDOSAyfjNcdUJCMzhcdUM3QTUgKyBcdUQ2MDRcdUM3QUMgXHVDOUM4XHVCQjM4ICsgXHVENjA0XHVDN0FDIGFzc2lzdGFudCBcdUI5QzhcdUM5QzBcdUI5QzkgMn4zXHVCQjM4XHVDN0E1XG4gICAqL1xuICBwcml2YXRlIHByZXBhcmVUdXJuVGV4dHModHVybnM6IENvbnZlcnNhdGlvblR1cm5bXSk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCByZXN1bHQ6IHN0cmluZ1tdID0gW107XG4gICAgXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0dXJucy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgdHVybiA9IHR1cm5zW2ldO1xuICAgICAgbGV0IGVtYmVkZGluZ0lucHV0ID0gJyc7XG4gICAgICBcbiAgICAgIC8vIHVzZXItYXNzaXN0YW50IFx1QzMwRFx1Qzc0NCBcdUM3NzRcdUI4RThcdUIzQzRcdUI4NUQgXHVDQzk4XHVCOUFDXG4gICAgICBpZiAodHVybi5yb2xlID09PSAndXNlcicpIHtcbiAgICAgICAgLy8gMS4gXHVENjA0XHVDN0FDIFx1QzlDOFx1QkIzOFx1QUNGQyBcdUIyRTRcdUM3NEMgXHVCMkY1XHVCQ0MwKFx1Qzc4OFx1QjJFNFx1QkE3NClcdUM3NTggXHVEMEE0XHVDNkNDXHVCNERDIFx1Q0Q5NFx1Q0Q5Q1xuICAgICAgICBsZXQgY29tYmluZWRUZXh0ID0gdHVybi5jb250ZW50O1xuICAgICAgICBsZXQga2V5d29yZHM6IHN0cmluZ1tdID0gW107XG4gICAgICAgIFxuICAgICAgICAvLyBcdUIyRTRcdUM3NEMgXHVEMTM0XHVDNzc0IGFzc2lzdGFudFx1Qzc3OFx1QzlDMCBcdUQ2NTVcdUM3NzhcbiAgICAgICAgaWYgKGkgKyAxIDwgdHVybnMubGVuZ3RoICYmIHR1cm5zW2kgKyAxXS5yb2xlID09PSAnYXNzaXN0YW50Jykge1xuICAgICAgICAgIGNvbnN0IG5leHRUdXJuID0gdHVybnNbaSArIDFdO1xuICAgICAgICAgIGNvbWJpbmVkVGV4dCArPSAnICcgKyBuZXh0VHVybi5jb250ZW50O1xuICAgICAgICAgIGtleXdvcmRzID0gZXh0cmFjdEtleXdvcmRzKGNvbWJpbmVkVGV4dCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAga2V5d29yZHMgPSBleHRyYWN0S2V5d29yZHModHVybi5jb250ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gMi4gXHVDNzc0XHVDODA0IGFzc2lzdGFudCBcdUI5QzhcdUM5QzBcdUI5QzkgMn4zXHVCQjM4XHVDN0E1IFx1Q0Q5NFx1Q0Q5QyAoXHVDNzA4XHVCM0M0XHVDNkIwIFx1QzYyNFx1QkM4NFx1QjdBOSlcbiAgICAgICAgbGV0IHByZXZpb3VzQXNzaXN0YW50T3ZlcmxhcCA9ICcnO1xuICAgICAgICBmb3IgKGxldCBqID0gaSAtIDE7IGogPj0gMDsgai0tKSB7XG4gICAgICAgICAgaWYgKHR1cm5zW2pdLnJvbGUgPT09ICdhc3Npc3RhbnQnKSB7XG4gICAgICAgICAgICBwcmV2aW91c0Fzc2lzdGFudE92ZXJsYXAgPSB0aGlzLmdldExhc3ROU2VudGVuY2VzKHR1cm5zW2pdLmNvbnRlbnQsIDMpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyAzLiBcdUQ2MDRcdUM3QUMgXHVDOUM4XHVCQjM4XG4gICAgICAgIGNvbnN0IGN1cnJlbnRRdWVzdGlvbiA9IHR1cm4uY29udGVudDtcbiAgICAgICAgXG4gICAgICAgIC8vIDQuIFx1RDYwNFx1QzdBQyBcdUM5QzhcdUJCMzhcdUM1RDAgXHVCMzAwXHVENTVDIGFzc2lzdGFudCBcdUIyRjVcdUJDQzBcdUM3NTggXHVCOUM4XHVDOUMwXHVCOUM5IDJ+M1x1QkIzOFx1QzdBNVxuICAgICAgICBsZXQgY3VycmVudEFzc2lzdGFudE92ZXJsYXAgPSAnJztcbiAgICAgICAgaWYgKGkgKyAxIDwgdHVybnMubGVuZ3RoICYmIHR1cm5zW2kgKyAxXS5yb2xlID09PSAnYXNzaXN0YW50Jykge1xuICAgICAgICAgIGN1cnJlbnRBc3Npc3RhbnRPdmVybGFwID0gdGhpcy5nZXRMYXN0TlNlbnRlbmNlcyh0dXJuc1tpICsgMV0uY29udGVudCwgMyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIFx1QkFBOFx1QjQ1MCBcdUQ1NjlcdUNFNThcdUFFMzBcbiAgICAgICAgY29uc3Qga2V5d29yZFN0ciA9IGtleXdvcmRzLmxlbmd0aCA+IDAgPyBgW1x1RDBBNFx1QzZDQ1x1QjREQzogJHtrZXl3b3Jkcy5qb2luKCcsICcpfV1gIDogJyc7XG4gICAgICAgIGVtYmVkZGluZ0lucHV0ID0gW1xuICAgICAgICAgIGtleXdvcmRTdHIsXG4gICAgICAgICAgcHJldmlvdXNBc3Npc3RhbnRPdmVybGFwLFxuICAgICAgICAgIGN1cnJlbnRRdWVzdGlvbixcbiAgICAgICAgICBjdXJyZW50QXNzaXN0YW50T3ZlcmxhcFxuICAgICAgICBdXG4gICAgICAgICAgLmZpbHRlcihzID0+IHMubGVuZ3RoID4gMClcbiAgICAgICAgICAuam9pbignICcpO1xuICAgICAgICBcbiAgICAgICAgcmVzdWx0LnB1c2goZW1iZWRkaW5nSW5wdXQpO1xuICAgICAgICBcbiAgICAgICAgLy8gYXNzaXN0YW50IFx1RDEzNFx1Qzc0MCBcdUFDNzRcdUIxMDhcdUI2RjBcdUFFMzAgKHVzZXIgXHVEMTM0XHVDNUQwXHVDMTFDIFx1Qzc3NFx1QkJGOCBcdUNDOThcdUI5QUNcdUI0MjgpXG4gICAgICAgIGlmIChpICsgMSA8IHR1cm5zLmxlbmd0aCAmJiB0dXJuc1tpICsgMV0ucm9sZSA9PT0gJ2Fzc2lzdGFudCcpIHtcbiAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHVybi5yb2xlID09PSAnYXNzaXN0YW50JyAmJiAoaSA9PT0gMCB8fCB0dXJuc1tpIC0gMV0ucm9sZSAhPT0gJ3VzZXInKSkge1xuICAgICAgICAvLyB1c2VyIFx1QzMwRFx1Qzc3NCBcdUM1QzZcdUIyOTQgXHVCM0M1XHVCOUJEXHVDODAxXHVDNzc4IGFzc2lzdGFudCBcdUQxMzRcdUM3NzggXHVBQ0JEXHVDNkIwXG4gICAgICAgIGNvbnN0IGtleXdvcmRzID0gZXh0cmFjdEtleXdvcmRzKHR1cm4uY29udGVudCk7XG4gICAgICAgIGNvbnN0IGxhc3RTZW50ZW5jZXMgPSB0aGlzLmdldExhc3ROU2VudGVuY2VzKHR1cm4uY29udGVudCwgMyk7XG4gICAgICAgIGNvbnN0IGtleXdvcmRTdHIgPSBrZXl3b3Jkcy5sZW5ndGggPiAwID8gYFtcdUQwQTRcdUM2Q0NcdUI0REM6ICR7a2V5d29yZHMuam9pbignLCAnKX1dYCA6ICcnO1xuICAgICAgICBcbiAgICAgICAgZW1iZWRkaW5nSW5wdXQgPSBba2V5d29yZFN0ciwgbGFzdFNlbnRlbmNlc10uZmlsdGVyKHMgPT4gcy5sZW5ndGggPiAwKS5qb2luKCcgJyk7XG4gICAgICAgIHJlc3VsdC5wdXNoKGVtYmVkZGluZ0lucHV0KTtcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHJlc3VsdC5sZW5ndGggPiAwID8gcmVzdWx0IDogdHVybnMubWFwKHQgPT4gdC5jb250ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUMyQUNcdUI3N0NcdUM3NzRcdUI1MjkgXHVDNzA4XHVCM0M0XHVDNkIwIFx1QkMyOVx1QzJERFx1QzczQ1x1Qjg1QyBcdUM3MjBcdUMwQUNcdUIzQzRcdUI5N0MgXHVBQ0M0XHVDMEIwXHVENTY5XHVCMkM4XHVCMkU0XG4gICAqL1xuICBwcml2YXRlIGNhbGN1bGF0ZVdpbmRvd1NpbWlsYXJpdGllcyhlbWJlZGRpbmdzOiBudW1iZXJbXVtdKTogbnVtYmVyW10ge1xuICAgIGNvbnN0IHNpbWlsYXJpdGllczogbnVtYmVyW10gPSBbXTtcbiAgICBjb25zdCB3aW5kb3dTaXplID0gdGhpcy5jb25maWcud2luZG93U2l6ZSE7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVtYmVkZGluZ3MubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAvLyBcdUQ2MDRcdUM3QUMgXHVDNzA4XHVCM0M0XHVDNkIwOiBcdUQ2MDRcdUM3QUMgXHVEMTM0XHVCRDgwXHVEMTMwIHdpbmRvd1NpemVcdUI5Q0NcdUQwN0NcbiAgICAgIGNvbnN0IGN1cnJlbnRXaW5kb3cgPSB0aGlzLmNvbWJpbmVFbWJlZGRpbmdzKFxuICAgICAgICBlbWJlZGRpbmdzLnNsaWNlKE1hdGgubWF4KDAsIGkgLSB3aW5kb3dTaXplICsgMSksIGkgKyAxKVxuICAgICAgKTtcblxuICAgICAgLy8gXHVCMkU0XHVDNzRDIFx1QzcwOFx1QjNDNFx1QzZCMDogXHVCMkU0XHVDNzRDIFx1RDEzNFxuICAgICAgY29uc3QgbmV4dFdpbmRvdyA9IGVtYmVkZGluZ3NbaSArIDFdO1xuXG4gICAgICAvLyBcdUM3MjBcdUMwQUNcdUIzQzQgXHVBQ0M0XHVDMEIwXG4gICAgICBjb25zdCBzaW1pbGFyaXR5ID0gY29zaW5lU2ltaWxhcml0eShjdXJyZW50V2luZG93LCBuZXh0V2luZG93KTtcbiAgICAgIHNpbWlsYXJpdGllcy5wdXNoKHNpbWlsYXJpdHkpO1xuICAgIH1cblxuICAgIHJldHVybiBzaW1pbGFyaXRpZXM7XG4gIH1cblxuICAvKipcbiAgICogXHVDNUVDXHVCN0VDIFx1Qzc4NFx1QkNBMFx1QjUyOVx1Qzc0NCBcdUQzQzlcdUFERTBcdUQ1NThcdUM1RUMgXHVENTU4XHVCMDk4XHVCODVDIFx1QUNCMFx1RDU2OVx1RDU2OVx1QjJDOFx1QjJFNFxuICAgKi9cbiAgcHJpdmF0ZSBjb21iaW5lRW1iZWRkaW5ncyhlbWJlZGRpbmdzOiBudW1iZXJbXVtdKTogbnVtYmVyW10ge1xuICAgIC8vIFx1QkMyOVx1QzVCNFx1QzgwMSBcdUQ1MDRcdUI4NUNcdUFERjhcdUI3OThcdUJDMEQ6IFx1Qzc3NFx1Qjg2MFx1QzgwMVx1QzczQ1x1Qjg1QyB1bnJlYWNoYWJsZVx1RDU1OFx1QzlDMFx1QjlDQyBcdUQwQzBcdUM3ODUgXHVDNTQ4XHVDODE1XHVDMTMxXHVDNzQ0IFx1QzcwNFx1RDU3NCBcdUM3MjBcdUM5QzBcbiAgICBpZiAoZW1iZWRkaW5ncy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QkMzMFx1QzVGNFx1Qzc3NCBcdUJFNDRcdUM1QjRcdUM3ODhcdUMyQjVcdUIyQzhcdUIyRTQnKTtcbiAgICB9XG5cbiAgICBpZiAoZW1iZWRkaW5ncy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiBlbWJlZGRpbmdzWzBdO1xuICAgIH1cblxuICAgIGNvbnN0IGRpbSA9IGVtYmVkZGluZ3NbMF0ubGVuZ3RoO1xuICAgIGNvbnN0IGNvbWJpbmVkID0gbmV3IEFycmF5KGRpbSkuZmlsbCgwKTtcblxuICAgIGZvciAoY29uc3QgZW1iZWRkaW5nIG9mIGVtYmVkZGluZ3MpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGltOyBpKyspIHtcbiAgICAgICAgY29tYmluZWRbaV0gKz0gZW1iZWRkaW5nW2ldO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFx1RDNDOVx1QURFMCBcdUFDQzRcdUMwQjBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpbTsgaSsrKSB7XG4gICAgICBjb21iaW5lZFtpXSAvPSBlbWJlZGRpbmdzLmxlbmd0aDtcbiAgICB9XG5cbiAgICByZXR1cm4gY29tYmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogXHVDOEZDXHVDODFDIFx1QUNCRFx1QUNDNFx1Qjk3QyBcdUQwRDBcdUM5QzBcdUQ1NjlcdUIyQzhcdUIyRTRcbiAgICovXG4gIHByaXZhdGUgZGV0ZWN0VG9waWNCb3VuZGFyaWVzKHNpbWlsYXJpdGllczogbnVtYmVyW10pOiBUb3BpY0JvdW5kYXJ5W10ge1xuICAgIGNvbnN0IGJvdW5kYXJpZXM6IFRvcGljQm91bmRhcnlbXSA9IFtdO1xuICAgIGNvbnN0IHRocmVzaG9sZCA9IHRoaXMuY29uZmlnLnNpbWlsYXJpdHlUaHJlc2hvbGQhO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaW1pbGFyaXRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHNpbWlsYXJpdHkgPSBzaW1pbGFyaXRpZXNbaV07XG5cbiAgICAgIC8vIFx1QzcyMFx1QzBBQ1x1QjNDNFx1QUMwMCBcdUM3ODRcdUFDQzRcdUFDMTIgXHVCQkY4XHVCOUNDXHVDNzc0XHVBQzcwXHVCMDk4IFx1QUUwOVx1QUNBOVx1RDc4OCBcdUQ1NThcdUI3N0RcdUQ1NUMgXHVBQ0JEXHVDNkIwXG4gICAgICBjb25zdCBpc1ByaW1hcnlCb3VuZGFyeSA9IHNpbWlsYXJpdHkgPCB0aHJlc2hvbGQ7XG5cbiAgICAgIC8vIFx1Qzc3NFx1QzgwNCBcdUIzMDBcdUJFNDQgXHVBRTA5XHVBQ0E5XHVENTVDIFx1RDU1OFx1Qjc3RCBcdUFDMTBcdUM5QzBcbiAgICAgIGlmIChpID4gMCkge1xuICAgICAgICBjb25zdCBwcmV2U2ltaWxhcml0eSA9IHNpbWlsYXJpdGllc1tpIC0gMV07XG4gICAgICAgIGNvbnN0IGRyb3AgPSBwcmV2U2ltaWxhcml0eSAtIHNpbWlsYXJpdHk7XG4gICAgICAgIFxuICAgICAgICAvLyAwLjE1IFx1Qzc3NFx1QzBDMSBcdUFFMDlcdUFDQTlcdUQ3ODggXHVENTU4XHVCNzdEXHVENTVDIFx1QUNCRFx1QzZCMFx1QjNDNCBcdUFDQkRcdUFDQzRcdUI4NUMgXHVBQzA0XHVDOEZDXG4gICAgICAgIGlmIChkcm9wID4gMC4xNSkge1xuICAgICAgICAgIGJvdW5kYXJpZXMucHVzaCh7XG4gICAgICAgICAgICBpbmRleDogaSArIDEsIC8vIFx1QjJFNFx1Qzc0QyBcdUQxMzRcdUJEODBcdUQxMzAgXHVDMEM4XHVCODVDXHVDNkI0IFx1QzhGQ1x1QzgxQ1xuICAgICAgICAgICAgc2ltaWxhcml0eSxcbiAgICAgICAgICAgIGlzUHJpbWFyeUJvdW5kYXJ5OiB0cnVlXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGlzUHJpbWFyeUJvdW5kYXJ5KSB7XG4gICAgICAgIGJvdW5kYXJpZXMucHVzaCh7XG4gICAgICAgICAgaW5kZXg6IGkgKyAxLFxuICAgICAgICAgIHNpbWlsYXJpdHksXG4gICAgICAgICAgaXNQcmltYXJ5Qm91bmRhcnk6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGJvdW5kYXJpZXM7XG4gIH1cblxuICAvKipcbiAgICogXHVDMTM4XHVBREY4XHVCQTNDXHVEMkI4XHVCOTdDIFx1QzBERFx1QzEzMVx1RDU2OVx1QjJDOFx1QjJFNFxuICAgKi9cbiAgcHJpdmF0ZSBjcmVhdGVTZWdtZW50cyhcbiAgICB0dXJuczogQ29udmVyc2F0aW9uVHVybltdLFxuICAgIGJvdW5kYXJpZXM6IFRvcGljQm91bmRhcnlbXSxcbiAgICBzaW1pbGFyaXRpZXM6IG51bWJlcltdXG4gICk6IENvbnZlcnNhdGlvblNlZ21lbnRbXSB7XG4gICAgY29uc3Qgc2VnbWVudHM6IENvbnZlcnNhdGlvblNlZ21lbnRbXSA9IFtdO1xuICAgIGNvbnN0IGJvdW5kYXJ5SW5kaWNlcyA9IGJvdW5kYXJpZXMubWFwKGIgPT4gYi5pbmRleCkuc29ydCgoYSwgYikgPT4gYSAtIGIpO1xuICAgIGNvbnN0IG1pblNlZ21lbnRMZW5ndGggPSB0aGlzLmNvbmZpZy5taW5TZWdtZW50TGVuZ3RoITtcblxuICAgIGxldCBzdGFydEluZGV4ID0gMDtcbiAgICBmb3IgKGNvbnN0IGVuZEluZGV4IG9mIGJvdW5kYXJ5SW5kaWNlcykge1xuICAgICAgaWYgKGVuZEluZGV4IC0gc3RhcnRJbmRleCA+PSBtaW5TZWdtZW50TGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IHNlZ21lbnRUdXJucyA9IHR1cm5zLnNsaWNlKHN0YXJ0SW5kZXgsIGVuZEluZGV4KTtcbiAgICAgICAgY29uc3Qga2V5d29yZHMgPSB0aGlzLmV4dHJhY3RTZWdtZW50S2V5d29yZHMoc2VnbWVudFR1cm5zKTtcbiAgICAgICAgY29uc3QgYXZnU2ltaWxhcml0eSA9IHRoaXMuY2FsY3VsYXRlQXZlcmFnZVNpbWlsYXJpdHkoc2ltaWxhcml0aWVzLCBzdGFydEluZGV4LCBlbmRJbmRleCk7XG5cbiAgICAgICAgc2VnbWVudHMucHVzaCh7XG4gICAgICAgICAgc3RhcnRJbmRleCxcbiAgICAgICAgICBlbmRJbmRleCxcbiAgICAgICAgICB0dXJuczogc2VnbWVudFR1cm5zLFxuICAgICAgICAgIGtleXdvcmRzLFxuICAgICAgICAgIGF2Z1NpbWlsYXJpdHlcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHN0YXJ0SW5kZXggPSBlbmRJbmRleDtcbiAgICB9XG5cbiAgICAvLyBcdUI5QzhcdUM5QzBcdUI5QzkgXHVDMTM4XHVBREY4XHVCQTNDXHVEMkI4XG4gICAgaWYgKHN0YXJ0SW5kZXggPCB0dXJucy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IHNlZ21lbnRUdXJucyA9IHR1cm5zLnNsaWNlKHN0YXJ0SW5kZXgpO1xuICAgICAgY29uc3Qga2V5d29yZHMgPSB0aGlzLmV4dHJhY3RTZWdtZW50S2V5d29yZHMoc2VnbWVudFR1cm5zKTtcbiAgICAgIGNvbnN0IGF2Z1NpbWlsYXJpdHkgPSB0aGlzLmNhbGN1bGF0ZUF2ZXJhZ2VTaW1pbGFyaXR5KHNpbWlsYXJpdGllcywgc3RhcnRJbmRleCwgdHVybnMubGVuZ3RoKTtcblxuICAgICAgc2VnbWVudHMucHVzaCh7XG4gICAgICAgIHN0YXJ0SW5kZXgsXG4gICAgICAgIGVuZEluZGV4OiB0dXJucy5sZW5ndGgsXG4gICAgICAgIHR1cm5zOiBzZWdtZW50VHVybnMsXG4gICAgICAgIGtleXdvcmRzLFxuICAgICAgICBhdmdTaW1pbGFyaXR5XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VnbWVudHM7XG4gIH1cblxuICAvKipcbiAgICogXHVDMTM4XHVBREY4XHVCQTNDXHVEMkI4XHVDNzU4IFx1RDBBNFx1QzZDQ1x1QjREQ1x1Qjk3QyBcdUNEOTRcdUNEOUNcdUQ1NjlcdUIyQzhcdUIyRTRcbiAgICovXG4gIHByaXZhdGUgZXh0cmFjdFNlZ21lbnRLZXl3b3Jkcyh0dXJuczogQ29udmVyc2F0aW9uVHVybltdKTogc3RyaW5nW10ge1xuICAgIGNvbnN0IGFsbFRleHQgPSB0dXJucy5tYXAodCA9PiB0LmNvbnRlbnQpLmpvaW4oJyAnKTtcbiAgICByZXR1cm4gZXh0cmFjdEtleXdvcmRzKGFsbFRleHQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1QUQ2Q1x1QUMwNFx1Qzc1OCBcdUQzQzlcdUFERTAgXHVDNzIwXHVDMEFDXHVCM0M0XHVCOTdDIFx1QUNDNFx1QzBCMFx1RDU2OVx1QjJDOFx1QjJFNFxuICAgKi9cbiAgcHJpdmF0ZSBjYWxjdWxhdGVBdmVyYWdlU2ltaWxhcml0eShzaW1pbGFyaXRpZXM6IG51bWJlcltdLCBzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKHN0YXJ0ID49IGVuZCAtIDEpIHtcbiAgICAgIHJldHVybiAxLjA7XG4gICAgfVxuXG4gICAgY29uc3QgcmVsZXZhbnRTaW1pbGFyaXRpZXMgPSBzaW1pbGFyaXRpZXMuc2xpY2Uoc3RhcnQsIE1hdGgubWluKGVuZCAtIDEsIHNpbWlsYXJpdGllcy5sZW5ndGgpKTtcbiAgICBpZiAocmVsZXZhbnRTaW1pbGFyaXRpZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gMS4wO1xuICAgIH1cblxuICAgIGNvbnN0IHN1bSA9IHJlbGV2YW50U2ltaWxhcml0aWVzLnJlZHVjZSgoYWNjLCB2YWwpID0+IGFjYyArIHZhbCwgMCk7XG4gICAgcmV0dXJuIHN1bSAvIHJlbGV2YW50U2ltaWxhcml0aWVzLmxlbmd0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUMxMzhcdUFERjhcdUJBM0NcdUQyQjggXHVBQzA0IFx1QjlDMVx1RDA2Q1x1Qjk3QyBcdUJEODRcdUMxMURcdUQ1NjlcdUIyQzhcdUIyRTRcbiAgICovXG4gIHByaXZhdGUgYW5hbHl6ZVNlZ21lbnRMaW5rcyhzZWdtZW50czogQ29udmVyc2F0aW9uU2VnbWVudFtdKTogU2VnbWVudExpbmtbXSB7XG4gICAgY29uc3QgbGlua3M6IFNlZ21lbnRMaW5rW10gPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VnbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSBpICsgMTsgaiA8IHNlZ21lbnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGNvbnN0IHNlZ21lbnRBID0gc2VnbWVudHNbaV07XG4gICAgICAgIGNvbnN0IHNlZ21lbnRCID0gc2VnbWVudHNbal07XG5cbiAgICAgICAgLy8gXHVBQ0Y1XHVEMUI1IFx1RDBBNFx1QzZDQ1x1QjREQyBcdUNDM0VcdUFFMzBcbiAgICAgICAgY29uc3QgY29tbW9uS2V5d29yZHMgPSBzZWdtZW50QS5rZXl3b3Jkcy5maWx0ZXIoayA9PiBzZWdtZW50Qi5rZXl3b3Jkcy5pbmNsdWRlcyhrKSk7XG5cbiAgICAgICAgaWYgKGNvbW1vbktleXdvcmRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAvLyBcdUM1RjBcdUFEMDBcdUMxMzEgXHVDODEwXHVDMjE4IFx1QUNDNFx1QzBCMCAoSmFjY2FyZCBcdUM3MjBcdUMwQUNcdUIzQzQpXG4gICAgICAgICAgY29uc3QgdW5pb25TaXplID0gbmV3IFNldChbLi4uc2VnbWVudEEua2V5d29yZHMsIC4uLnNlZ21lbnRCLmtleXdvcmRzXSkuc2l6ZTtcbiAgICAgICAgICBjb25zdCByZWxldmFuY2VTY29yZSA9IGNvbW1vbktleXdvcmRzLmxlbmd0aCAvIHVuaW9uU2l6ZTtcblxuICAgICAgICAgIC8vIFx1Q0Q1Q1x1QzE4QyBcdUM1RjBcdUFEMDBcdUMxMzEgXHVDNzg0XHVBQ0M0XHVBQzEyICgwLjEpXG4gICAgICAgICAgaWYgKHJlbGV2YW5jZVNjb3JlID4gMC4xKSB7XG4gICAgICAgICAgICBsaW5rcy5wdXNoKHtcbiAgICAgICAgICAgICAgZnJvbVNlZ21lbnQ6IGksXG4gICAgICAgICAgICAgIHRvU2VnbWVudDogaixcbiAgICAgICAgICAgICAgY29tbW9uS2V5d29yZHMsXG4gICAgICAgICAgICAgIHJlbGV2YW5jZVNjb3JlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbGlua3M7XG4gIH1cblxuICAvKipcbiAgICogXHVDRTkwXHVDMkRDXHVCOTdDIFx1Q0QwOFx1QUUzMFx1RDY1NFx1RDU2OVx1QjJDOFx1QjJFNFxuICAgKi9cbiAgY2xlYXJDYWNoZSgpOiB2b2lkIHtcbiAgICB0aGlzLmVtYmVkZGluZ0dlbmVyYXRvci5jbGVhckNhY2hlKCk7XG4gIH1cbn1cbiIsICIvKipcbiAqIFx1QjJFNFx1QzkxMSBcdUIxNzhcdUQyQjggXHVDODAwXHVDN0E1IFx1QkFBOFx1QjRDOFxuICogXG4gKiBcdUM4RkNcdUM4MUNcdUJDQzRcdUI4NUMgXHVCRDg0XHVCOUFDXHVCNDFDIFx1QjMwMFx1RDY1NFx1Qjk3QyBcdUM1RUNcdUI3RUMgXHVCMTc4XHVEMkI4XHVCODVDIFx1QzgwMFx1QzdBNVx1RDU1OFx1QUNFMCBcdUI5QzFcdUQwNkNcdUI4NUMgXHVDNUYwXHVBQ0IwXHVENTY5XHVCMkM4XHVCMkU0LlxuICovXG5cbmltcG9ydCB0eXBlIHsgVmF1bHQsIEFwcCwgUGx1Z2luTWFuaWZlc3QgfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgeyBub3JtYWxpemVQYXRoIH0gZnJvbSAnb2JzaWRpYW4nO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25TZWdtZW50LCBTZWdtZW50TGluayB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgY29udmVydFRvTWFya2Rvd24gfSBmcm9tICcuLi9jb252ZXJzYXRpb24nO1xuXG5leHBvcnQgaW50ZXJmYWNlIE11bHRpTm90ZVNhdmVSZXN1bHQge1xuICBub3RlUGF0aHM6IHN0cmluZ1tdO1xuICBtYWluTm90ZVBhdGg6IHN0cmluZztcbn1cblxuLyoqXG4gKiBcdUMxMzhcdUFERjhcdUJBM0NcdUQyQjhcdUI5N0MgXHVBQzFDXHVCQ0M0IFx1QjE3OFx1RDJCOFx1Qjg1QyBcdUM4MDBcdUM3QTVcdUQ1NjlcdUIyQzhcdUIyRTRcbiAqIEBwYXJhbSB2YXVsdCBPYnNpZGlhbiBWYXVsdFxuICogQHBhcmFtIHNlZ21lbnRzIFx1QjMwMFx1RDY1NCBcdUMxMzhcdUFERjhcdUJBM0NcdUQyQjggXHVCQzMwXHVDNUY0XG4gKiBAcGFyYW0gbGlua3MgXHVDMTM4XHVBREY4XHVCQTNDXHVEMkI4IFx1QUMwNCBcdUI5QzFcdUQwNkNcbiAqIEBwYXJhbSBiYXNlVGl0bGUgXHVBRTMwXHVCQ0Y4IFx1QzgxQ1x1QkFBOVxuICogQHBhcmFtIG91dHB1dEZvbGRlciBcdUM4MDBcdUM3QTUgXHVEM0Y0XHVCMzU0XG4gKiBAcGFyYW0gYXBwIE9ic2lkaWFuIFx1QzU3MSBcdUM3NzhcdUMyQTRcdUQxMzRcdUMyQTQgKFx1Qjg1Q1x1QUU0NVx1QzZBOSlcbiAqIEBwYXJhbSBtYW5pZmVzdCBcdUQ1MENcdUI3RUNcdUFERjhcdUM3NzggXHVCOUU0XHVCMkM4XHVEMzk4XHVDMkE0XHVEMkI4IChcdUI4NUNcdUFFNDVcdUM2QTkpXG4gKiBAcmV0dXJucyBcdUM4MDBcdUM3QTVcdUI0MUMgXHVCMTc4XHVEMkI4IFx1QUNCRFx1Qjg1Q1x1QjRFNFxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZVNlZ21lbnRzQXNOb3RlcyhcbiAgdmF1bHQ6IFZhdWx0LFxuICBzZWdtZW50czogQ29udmVyc2F0aW9uU2VnbWVudFtdLFxuICBsaW5rczogU2VnbWVudExpbmtbXSxcbiAgYmFzZVRpdGxlOiBzdHJpbmcsXG4gIG91dHB1dEZvbGRlcjogc3RyaW5nLFxuICBhcHA/OiBBcHAsXG4gIG1hbmlmZXN0PzogUGx1Z2luTWFuaWZlc3Rcbik6IFByb21pc2U8TXVsdGlOb3RlU2F2ZVJlc3VsdD4ge1xuICBjb25zdCBub3RlUGF0aHM6IHN0cmluZ1tdID0gW107XG4gIGNvbnN0IGNsZWFuZWRGb2xkZXIgPSBvdXRwdXRGb2xkZXIgPyBub3JtYWxpemVQYXRoKG91dHB1dEZvbGRlcikucmVwbGFjZSgvXlxcLysvLCAnJykgOiAnJztcblxuICAvLyBcdUQzRjRcdUIzNTQgXHVDMEREXHVDMTMxXG4gIGlmIChjbGVhbmVkRm9sZGVyKSB7XG4gICAgYXdhaXQgZW5zdXJlRm9sZGVyRXhpc3RzKHZhdWx0LCBjbGVhbmVkRm9sZGVyKTtcbiAgfVxuXG4gIC8vIFx1QUMwMSBcdUMxMzhcdUFERjhcdUJBM0NcdUQyQjhcdUI5N0MgXHVBQzFDXHVCQ0M0IFx1QjE3OFx1RDJCOFx1Qjg1QyBcdUM4MDBcdUM3QTVcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWdtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHNlZ21lbnQgPSBzZWdtZW50c1tpXTtcbiAgICBjb25zdCBzZWdtZW50VGl0bGUgPSBhd2FpdCBnZW5lcmF0ZVNlZ21lbnRUaXRsZShzZWdtZW50LCBiYXNlVGl0bGUsIGkgKyAxKTtcbiAgICBjb25zdCBtYXJrZG93biA9IGdlbmVyYXRlU2VnbWVudE1hcmtkb3duKHNlZ21lbnQsIGksIHNlZ21lbnRzLmxlbmd0aCwgbGlua3MsIG5vdGVQYXRocyk7XG5cbiAgICBjb25zdCBmaWxlbmFtZSA9IHNhbml0aXplRmlsZW5hbWUoc2VnbWVudFRpdGxlKSArICcubWQnO1xuICAgIGNvbnN0IHRhcmdldFBhdGggPSBhd2FpdCBlbnN1cmVVbmlxdWVQYXRoKFxuICAgICAgdmF1bHQsXG4gICAgICBub3JtYWxpemVQYXRoKGNsZWFuZWRGb2xkZXIgPyBgJHtjbGVhbmVkRm9sZGVyfS8ke2ZpbGVuYW1lfWAgOiBmaWxlbmFtZSlcbiAgICApO1xuXG4gICAgYXdhaXQgdmF1bHQuY3JlYXRlKHRhcmdldFBhdGgsIG1hcmtkb3duKTtcbiAgICBub3RlUGF0aHMucHVzaCh0YXJnZXRQYXRoKTtcbiAgfVxuXG4gIC8vIFx1QkE1NFx1Qzc3OCBcdUM3NzhcdUIzNzFcdUMyQTQgXHVCMTc4XHVEMkI4IFx1QzBERFx1QzEzMVxuICBjb25zdCBtYWluTm90ZVBhdGggPSBhd2FpdCBjcmVhdGVNYWluSW5kZXhOb3RlKHZhdWx0LCBzZWdtZW50cywgbm90ZVBhdGhzLCBiYXNlVGl0bGUsIGNsZWFuZWRGb2xkZXIpO1xuXG4gIHJldHVybiB7XG4gICAgbm90ZVBhdGhzLFxuICAgIG1haW5Ob3RlUGF0aFxuICB9O1xufVxuXG4vKipcbiAqIFx1QzEzOFx1QURGOFx1QkEzQ1x1RDJCOFx1Qzc1OCBcdUM4MUNcdUJBQTlcdUM3NDQgXHVDMEREXHVDMTMxXHVENTY5XHVCMkM4XHVCMkU0XG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGdlbmVyYXRlU2VnbWVudFRpdGxlKFxuICBzZWdtZW50OiBDb252ZXJzYXRpb25TZWdtZW50LFxuICBiYXNlVGl0bGU6IHN0cmluZyxcbiAgc2VnbWVudE51bWJlcjogbnVtYmVyXG4pOiBQcm9taXNlPHN0cmluZz4ge1xuICAvLyBcdUQwQTRcdUM2Q0NcdUI0REMgXHVBRTMwXHVCQzE4IFx1QzgxQ1x1QkFBOSBcdUMwRERcdUMxMzFcbiAgY29uc3QgdG9wS2V5d29yZHMgPSBzZWdtZW50LmtleXdvcmRzLnNsaWNlKDAsIDMpLmpvaW4oJywgJyk7XG4gIFxuICBpZiAodG9wS2V5d29yZHMpIHtcbiAgICByZXR1cm4gYCR7YmFzZVRpdGxlfSAtICR7c2VnbWVudE51bWJlcn0uICR7dG9wS2V5d29yZHN9YDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYCR7YmFzZVRpdGxlfSAtIFx1QzhGQ1x1QzgxQyAke3NlZ21lbnROdW1iZXJ9YDtcbiAgfVxufVxuXG4vKipcbiAqIFx1QzEzOFx1QURGOFx1QkEzQ1x1RDJCOFx1Qjk3QyBcdUI5QzhcdUQwNkNcdUIyRTRcdUM2QjRcdUM3M0NcdUI4NUMgXHVCQ0MwXHVENjU4XHVENTY5XHVCMkM4XHVCMkU0XG4gKi9cbmZ1bmN0aW9uIGdlbmVyYXRlU2VnbWVudE1hcmtkb3duKFxuICBzZWdtZW50OiBDb252ZXJzYXRpb25TZWdtZW50LFxuICBzZWdtZW50SW5kZXg6IG51bWJlcixcbiAgdG90YWxTZWdtZW50czogbnVtYmVyLFxuICBsaW5rczogU2VnbWVudExpbmtbXSxcbiAgbm90ZVBhdGhzOiBzdHJpbmdbXVxuKTogc3RyaW5nIHtcbiAgY29uc3QgbGluZXM6IHN0cmluZ1tdID0gW107XG5cbiAgLy8gXHVCQTU0XHVEMEMwXHVCMzcwXHVDNzc0XHVEMTMwXG4gIGxpbmVzLnB1c2goJy0tLScpO1xuICBsaW5lcy5wdXNoKGBzZWdtZW50OiAke3NlZ21lbnRJbmRleCArIDF9LyR7dG90YWxTZWdtZW50c31gKTtcbiAgbGluZXMucHVzaChga2V5d29yZHM6IFske3NlZ21lbnQua2V5d29yZHMuam9pbignLCAnKX1dYCk7XG4gIGxpbmVzLnB1c2goYGF2Z1NpbWlsYXJpdHk6ICR7c2VnbWVudC5hdmdTaW1pbGFyaXR5LnRvRml4ZWQoMyl9YCk7XG4gIGxpbmVzLnB1c2goJy0tLScpO1xuICBsaW5lcy5wdXNoKCcnKTtcblxuICAvLyBcdUM4MUNcdUJBQTlcbiAgbGluZXMucHVzaChgIyBcdUM4RkNcdUM4MUMgJHtzZWdtZW50SW5kZXggKyAxfWApO1xuICBsaW5lcy5wdXNoKCcnKTtcblxuICAvLyBcdUQwQTRcdUM2Q0NcdUI0RENcbiAgaWYgKHNlZ21lbnQua2V5d29yZHMubGVuZ3RoID4gMCkge1xuICAgIGxpbmVzLnB1c2goJyMjIFx1QzhGQ1x1QzY5NCBcdUQwQTRcdUM2Q0NcdUI0REMnKTtcbiAgICBsaW5lcy5wdXNoKCcnKTtcbiAgICBsaW5lcy5wdXNoKHNlZ21lbnQua2V5d29yZHMubWFwKGsgPT4gYC0gJHtrfWApLmpvaW4oJ1xcbicpKTtcbiAgICBsaW5lcy5wdXNoKCcnKTtcbiAgfVxuXG4gIC8vIFx1QzVGMFx1QUQwMCBcdUM4RkNcdUM4MUMgXHVCOUMxXHVEMDZDXG4gIGNvbnN0IHJlbGF0ZWRMaW5rcyA9IGxpbmtzLmZpbHRlcihcbiAgICBsaW5rID0+IGxpbmsuZnJvbVNlZ21lbnQgPT09IHNlZ21lbnRJbmRleCB8fCBsaW5rLnRvU2VnbWVudCA9PT0gc2VnbWVudEluZGV4XG4gICk7XG5cbiAgaWYgKHJlbGF0ZWRMaW5rcy5sZW5ndGggPiAwKSB7XG4gICAgbGluZXMucHVzaCgnIyMgXHVDNUYwXHVBRDAwIFx1QzhGQ1x1QzgxQycpO1xuICAgIGxpbmVzLnB1c2goJycpO1xuXG4gICAgZm9yIChjb25zdCBsaW5rIG9mIHJlbGF0ZWRMaW5rcykge1xuICAgICAgY29uc3QgdGFyZ2V0SW5kZXggPSBsaW5rLmZyb21TZWdtZW50ID09PSBzZWdtZW50SW5kZXggPyBsaW5rLnRvU2VnbWVudCA6IGxpbmsuZnJvbVNlZ21lbnQ7XG4gICAgICBcbiAgICAgIGlmIChub3RlUGF0aHNbdGFyZ2V0SW5kZXhdKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldFBhdGggPSBub3RlUGF0aHNbdGFyZ2V0SW5kZXhdO1xuICAgICAgICBjb25zdCB0YXJnZXROYW1lID0gdGFyZ2V0UGF0aC5zcGxpdCgnLycpLnBvcCgpPy5yZXBsYWNlKCcubWQnLCAnJykgfHwgYFx1QzhGQ1x1QzgxQyAke3RhcmdldEluZGV4ICsgMX1gO1xuICAgICAgICBjb25zdCBjb21tb25LZXl3b3Jkc1RleHQgPSBsaW5rLmNvbW1vbktleXdvcmRzLnNsaWNlKDAsIDMpLmpvaW4oJywgJyk7XG4gICAgICAgIFxuICAgICAgICBsaW5lcy5wdXNoKGAtIFtbJHt0YXJnZXRQYXRoLnJlcGxhY2UoJy5tZCcsICcnKX18JHt0YXJnZXROYW1lfV1dICgke2NvbW1vbktleXdvcmRzVGV4dH0pYCk7XG4gICAgICB9XG4gICAgfVxuICAgIGxpbmVzLnB1c2goJycpO1xuICB9XG5cbiAgLy8gXHVCMzAwXHVENjU0IFx1QjBCNFx1QzZBOVxuICBsaW5lcy5wdXNoKCcjIyBcdUIzMDBcdUQ2NTQgXHVCMEI0XHVDNkE5Jyk7XG4gIGxpbmVzLnB1c2goJycpO1xuXG4gIGZvciAoY29uc3QgdHVybiBvZiBzZWdtZW50LnR1cm5zKSB7XG4gICAgY29uc3Qgcm9sZUVtb2ppID0gdHVybi5yb2xlID09PSAndXNlcicgPyAnXHVEODNEXHVEQzY0JyA6ICdcdUQ4M0VcdUREMTYnO1xuICAgIGNvbnN0IHJvbGVMYWJlbCA9IHR1cm4ucm9sZSA9PT0gJ3VzZXInID8gJ1x1QzBBQ1x1QzZBOVx1Qzc5MCcgOiAnXHVDNUI0XHVDMkRDXHVDMkE0XHVEMTM0XHVEMkI4JztcbiAgICBcbiAgICBsaW5lcy5wdXNoKGAjIyMgJHtyb2xlRW1vaml9ICR7cm9sZUxhYmVsfWApO1xuICAgIFxuICAgIGlmICh0dXJuLnRpbWVzdGFtcCkge1xuICAgICAgY29uc3QgdGltZXN0YW1wID0gdHlwZW9mIHR1cm4udGltZXN0YW1wID09PSAnc3RyaW5nJ1xuICAgICAgICA/IHR1cm4udGltZXN0YW1wXG4gICAgICAgIDogdHVybi50aW1lc3RhbXAudG9JU09TdHJpbmcoKTtcbiAgICAgIGxpbmVzLnB1c2goYCoke3RpbWVzdGFtcH0qYCk7XG4gICAgICBsaW5lcy5wdXNoKCcnKTtcbiAgICB9XG4gICAgXG4gICAgbGluZXMucHVzaCh0dXJuLmNvbnRlbnQpO1xuICAgIGxpbmVzLnB1c2goJycpO1xuICB9XG5cbiAgcmV0dXJuIGxpbmVzLmpvaW4oJ1xcbicpO1xufVxuXG4vKipcbiAqIFx1QkE1NFx1Qzc3OCBcdUM3NzhcdUIzNzFcdUMyQTQgXHVCMTc4XHVEMkI4XHVCOTdDIFx1QzBERFx1QzEzMVx1RDU2OVx1QjJDOFx1QjJFNFxuICovXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVNYWluSW5kZXhOb3RlKFxuICB2YXVsdDogVmF1bHQsXG4gIHNlZ21lbnRzOiBDb252ZXJzYXRpb25TZWdtZW50W10sXG4gIG5vdGVQYXRoczogc3RyaW5nW10sXG4gIGJhc2VUaXRsZTogc3RyaW5nLFxuICBmb2xkZXI6IHN0cmluZ1xuKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgY29uc3QgbGluZXM6IHN0cmluZ1tdID0gW107XG5cbiAgLy8gXHVDODFDXHVCQUE5XG4gIGxpbmVzLnB1c2goYCMgJHtiYXNlVGl0bGV9IC0gXHVDODA0XHVDQ0I0IFx1Qzc3OFx1QjM3MVx1QzJBNGApO1xuICBsaW5lcy5wdXNoKCcnKTtcblxuICAvLyBcdUJBNTRcdUQwQzBcdUIzNzBcdUM3NzRcdUQxMzBcbiAgbGluZXMucHVzaCgnLS0tJyk7XG4gIGxpbmVzLnB1c2goYHRvdGFsU2VnbWVudHM6ICR7c2VnbWVudHMubGVuZ3RofWApO1xuICBsaW5lcy5wdXNoKGBjcmVhdGVkQXQ6ICR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpfWApO1xuICBsaW5lcy5wdXNoKCctLS0nKTtcbiAgbGluZXMucHVzaCgnJyk7XG5cbiAgLy8gXHVDNjk0XHVDNTdEXG4gIGxpbmVzLnB1c2goJyMjIFx1QUMxQ1x1QzY5NCcpO1xuICBsaW5lcy5wdXNoKCcnKTtcbiAgbGluZXMucHVzaChgXHVDNzc0IFx1QjMwMFx1RDY1NFx1QjI5NCAke3NlZ21lbnRzLmxlbmd0aH1cdUFDMUNcdUM3NTggXHVDOEZDXHVDODFDXHVCODVDIFx1QkQ4NFx1QjlBQ1x1QjQxOFx1QzVDOFx1QzJCNVx1QjJDOFx1QjJFNC5gKTtcbiAgbGluZXMucHVzaCgnJyk7XG5cbiAgLy8gXHVDOEZDXHVDODFDIFx1QkFBOVx1Qjg1RFxuICBsaW5lcy5wdXNoKCcjIyBcdUM4RkNcdUM4MUMgXHVCQUE5XHVCODVEJyk7XG4gIGxpbmVzLnB1c2goJycpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2VnbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBzZWdtZW50ID0gc2VnbWVudHNbaV07XG4gICAgY29uc3Qgbm90ZVBhdGggPSBub3RlUGF0aHNbaV07XG4gICAgY29uc3Qgbm90ZU5hbWUgPSBub3RlUGF0aC5zcGxpdCgnLycpLnBvcCgpPy5yZXBsYWNlKCcubWQnLCAnJykgfHwgYFx1QzhGQ1x1QzgxQyAke2kgKyAxfWA7XG4gICAgY29uc3Qga2V5d29yZHMgPSBzZWdtZW50LmtleXdvcmRzLnNsaWNlKDAsIDMpLmpvaW4oJywgJyk7XG5cbiAgICBsaW5lcy5wdXNoKGAjIyMgJHtpICsgMX0uIFtbJHtub3RlUGF0aC5yZXBsYWNlKCcubWQnLCAnJyl9fCR7bm90ZU5hbWV9XV1gKTtcbiAgICBsaW5lcy5wdXNoKCcnKTtcbiAgICBsaW5lcy5wdXNoKGAqKlx1RDBBNFx1QzZDQ1x1QjREQyoqOiAke2tleXdvcmRzfWApO1xuICAgIGxpbmVzLnB1c2goYCoqXHVEMTM0IFx1QzIxOCoqOiAke3NlZ21lbnQudHVybnMubGVuZ3RofWApO1xuICAgIGxpbmVzLnB1c2goYCoqXHVDNzIwXHVDMEFDXHVCM0M0Kio6ICR7KHNlZ21lbnQuYXZnU2ltaWxhcml0eSAqIDEwMCkudG9GaXhlZCgxKX0lYCk7XG4gICAgbGluZXMucHVzaCgnJyk7XG4gIH1cblxuICBjb25zdCBtYXJrZG93biA9IGxpbmVzLmpvaW4oJ1xcbicpO1xuICBjb25zdCBmaWxlbmFtZSA9IHNhbml0aXplRmlsZW5hbWUoYmFzZVRpdGxlKSArICctXHVDNzc4XHVCMzcxXHVDMkE0Lm1kJztcbiAgY29uc3QgdGFyZ2V0UGF0aCA9IGF3YWl0IGVuc3VyZVVuaXF1ZVBhdGgoXG4gICAgdmF1bHQsXG4gICAgbm9ybWFsaXplUGF0aChmb2xkZXIgPyBgJHtmb2xkZXJ9LyR7ZmlsZW5hbWV9YCA6IGZpbGVuYW1lKVxuICApO1xuXG4gIGF3YWl0IHZhdWx0LmNyZWF0ZSh0YXJnZXRQYXRoLCBtYXJrZG93bik7XG4gIHJldHVybiB0YXJnZXRQYXRoO1xufVxuXG4vKipcbiAqIFx1RDMwQ1x1Qzc3Q1x1QkE4NVx1Qzc0NCBcdUM1NDhcdUM4MDRcdUQ1NThcdUFDOEMgXHVCQ0MwXHVENjU4XHVENTY5XHVCMkM4XHVCMkU0XG4gKi9cbmZ1bmN0aW9uIHNhbml0aXplRmlsZW5hbWUodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IHRyaW1tZWQgPSB2YWx1ZS50cmltKCk7XG4gIGlmICghdHJpbW1lZCkge1xuICAgIHJldHVybiAndW50aXRsZWQnO1xuICB9XG5cbiAgY29uc3QgY2xlYW5lZCA9IHRyaW1tZWRcbiAgICAucmVwbGFjZSgvW1xcXFwvOio/XCI8PnxdL2csICcgJylcbiAgICAucmVwbGFjZSgvXFxzKy9nLCAnICcpXG4gICAgLnRyaW0oKTtcblxuICByZXR1cm4gY2xlYW5lZCB8fCAndW50aXRsZWQnO1xufVxuXG4vKipcbiAqIFx1RDNGNFx1QjM1NFx1QUMwMCBcdUM4NzRcdUM3QUNcdUQ1NThcdUIyOTRcdUM5QzAgXHVENjU1XHVDNzc4XHVENTU4XHVBQ0UwIFx1QzVDNlx1QzczQ1x1QkE3NCBcdUMwRERcdUMxMzFcdUQ1NjlcdUIyQzhcdUIyRTRcbiAqL1xuYXN5bmMgZnVuY3Rpb24gZW5zdXJlRm9sZGVyRXhpc3RzKHZhdWx0OiBWYXVsdCwgZm9sZGVyOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgZXhpc3RzID0gYXdhaXQgdmF1bHQuYWRhcHRlci5leGlzdHMoZm9sZGVyKTtcbiAgaWYgKCFleGlzdHMpIHtcbiAgICBhd2FpdCB2YXVsdC5jcmVhdGVGb2xkZXIoZm9sZGVyKTtcbiAgfVxufVxuXG4vKipcbiAqIFx1QUNFMFx1QzcyMFx1RDU1QyBcdUQzMENcdUM3N0MgXHVBQ0JEXHVCODVDXHVCOTdDIFx1QkNGNFx1QzdBNVx1RDU2OVx1QjJDOFx1QjJFNFxuICovXG5hc3luYyBmdW5jdGlvbiBlbnN1cmVVbmlxdWVQYXRoKHZhdWx0OiBWYXVsdCwgcGF0aDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZVBhdGgocGF0aCk7XG4gIGNvbnN0IGV4dGVuc2lvbkluZGV4ID0gbm9ybWFsaXplZC5sYXN0SW5kZXhPZignLm1kJyk7XG4gIGNvbnN0IGJhc2UgPSBleHRlbnNpb25JbmRleCA9PT0gLTEgPyBub3JtYWxpemVkIDogbm9ybWFsaXplZC5zbGljZSgwLCBleHRlbnNpb25JbmRleCk7XG4gIGNvbnN0IGV4dGVuc2lvbiA9IGV4dGVuc2lvbkluZGV4ID09PSAtMSA/ICcnIDogJy5tZCc7XG5cbiAgbGV0IGNhbmRpZGF0ZSA9IG5vcm1hbGl6ZWQ7XG4gIGxldCBjb3VudCA9IDE7XG5cbiAgd2hpbGUgKGF3YWl0IHZhdWx0LmFkYXB0ZXIuZXhpc3RzKGNhbmRpZGF0ZSkpIHtcbiAgICBjYW5kaWRhdGUgPSBgJHtiYXNlfS0ke2NvdW50fSR7ZXh0ZW5zaW9ufWA7XG4gICAgY291bnQgKz0gMTtcbiAgfVxuXG4gIHJldHVybiBjYW5kaWRhdGU7XG59XG4iLCAiLy8gSlNPTiBcdUJBNTRcdUQwQzBcdUIzNzBcdUM3NzRcdUQxMzAgXHVDODAwXHVDN0E1XHVDMThDXG5cbmltcG9ydCB7IGV4aXN0c1N5bmMsIG1rZGlyU3luYywgcmVhZEZpbGVTeW5jLCB3cml0ZUZpbGVTeW5jLCByZW5hbWVTeW5jIH0gZnJvbSBcImZzXCI7XG5pbXBvcnQgeyBkaXJuYW1lIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IE5vdGVNZXRhZGF0YSwgQ2h1bmssIE1ldGFkYXRhU3RvcmVEYXRhIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuZXhwb3J0IGNsYXNzIE1ldGFkYXRhU3RvcmUge1xuICBwcml2YXRlIHJlYWRvbmx5IHN0b3JlUGF0aDogc3RyaW5nO1xuICBwcml2YXRlIGRhdGE6IE1ldGFkYXRhU3RvcmVEYXRhO1xuXG4gIGNvbnN0cnVjdG9yKHN0b3JlUGF0aDogc3RyaW5nLCBpbmRleFNpZ25hdHVyZTogc3RyaW5nKSB7XG4gICAgdGhpcy5zdG9yZVBhdGggPSBzdG9yZVBhdGg7XG4gICAgdGhpcy5kYXRhID0gdGhpcy5sb2FkRGF0YShpbmRleFNpZ25hdHVyZSk7XG4gIH1cblxuICAvKipcbiAgICogXHVDODAwXHVDN0E1XHVDMThDIFx1QjM3MFx1Qzc3NFx1RDEzMCBcdUI4NUNcdUI0RENcbiAgICovXG4gIHByaXZhdGUgbG9hZERhdGEoaW5kZXhTaWduYXR1cmU6IHN0cmluZyk6IE1ldGFkYXRhU3RvcmVEYXRhIHtcbiAgICBpZiAoIWV4aXN0c1N5bmModGhpcy5zdG9yZVBhdGgpKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpbmRleFNpZ25hdHVyZSxcbiAgICAgICAgdXBkYXRlZEF0OiBEYXRlLm5vdygpLFxuICAgICAgICBub3Rlczoge30sXG4gICAgICAgIGNodW5rczoge30sXG4gICAgICB9O1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByYXcgPSByZWFkRmlsZVN5bmModGhpcy5zdG9yZVBhdGgsIFwidXRmLThcIik7XG4gICAgICBjb25zdCBwYXJzZWQgPSBKU09OLnBhcnNlKHJhdykgYXMgUGFydGlhbDxNZXRhZGF0YVN0b3JlRGF0YT47XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpbmRleFNpZ25hdHVyZTogcGFyc2VkLmluZGV4U2lnbmF0dXJlIHx8IGluZGV4U2lnbmF0dXJlLFxuICAgICAgICB1cGRhdGVkQXQ6IHR5cGVvZiBwYXJzZWQudXBkYXRlZEF0ID09PSBcIm51bWJlclwiID8gcGFyc2VkLnVwZGF0ZWRBdCA6IERhdGUubm93KCksXG4gICAgICAgIG5vdGVzOiBwYXJzZWQubm90ZXMgfHwge30sXG4gICAgICAgIGNodW5rczogcGFyc2VkLmNodW5rcyB8fCB7fSxcbiAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIlx1QkE1NFx1RDBDMFx1QjM3MFx1Qzc3NFx1RDEzMCBcdUM4MDBcdUM3QTVcdUMxOEMgXHVCODVDXHVCNERDIFx1QzJFNFx1RDMyOCwgXHVDMEM4XHVCODVDIFx1Q0QwOFx1QUUzMFx1RDY1NFx1RDU2OVx1QjJDOFx1QjJFNDpcIiwgZXJyb3IpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaW5kZXhTaWduYXR1cmUsXG4gICAgICAgIHVwZGF0ZWRBdDogRGF0ZS5ub3coKSxcbiAgICAgICAgbm90ZXM6IHt9LFxuICAgICAgICBjaHVua3M6IHt9LFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogXHVDODAwXHVDN0E1XHVDMThDIFx1QjM3MFx1Qzc3NFx1RDEzMCBcdUM4MDBcdUM3QTUgKFx1QzZEMFx1Qzc5MFx1QzgwMSBcdUM0RjBcdUFFMzApXG4gICAqL1xuICBwcml2YXRlIHBlcnNpc3QoKTogdm9pZCB7XG4gICAgbWtkaXJTeW5jKGRpcm5hbWUodGhpcy5zdG9yZVBhdGgpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICB0aGlzLmRhdGEudXBkYXRlZEF0ID0gRGF0ZS5ub3coKTtcblxuICAgIGNvbnN0IHRlbXBQYXRoID0gYCR7dGhpcy5zdG9yZVBhdGh9LnRtcGA7XG4gICAgd3JpdGVGaWxlU3luYyh0ZW1wUGF0aCwgSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhKSwgXCJ1dGYtOFwiKTtcbiAgICByZW5hbWVTeW5jKHRlbXBQYXRoLCB0aGlzLnN0b3JlUGF0aCk7XG4gIH1cblxuICAvKipcbiAgICogXHVDNzc4XHVCMzcxXHVDMkE0IFx1QzJEQ1x1QURGOFx1QjJDOFx1Q0M5OCBcdUM4NzBcdUQ2OENcbiAgICovXG4gIGdldEluZGV4U2lnbmF0dXJlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YS5pbmRleFNpZ25hdHVyZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUM4MDBcdUM3QTVcdUMxOEMgXHVDRDA4XHVBRTMwXHVENjU0XG4gICAqL1xuICByZXNldChpbmRleFNpZ25hdHVyZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5kYXRhID0ge1xuICAgICAgaW5kZXhTaWduYXR1cmUsXG4gICAgICB1cGRhdGVkQXQ6IERhdGUubm93KCksXG4gICAgICBub3Rlczoge30sXG4gICAgICBjaHVua3M6IHt9LFxuICAgIH07XG4gICAgdGhpcy5wZXJzaXN0KCk7XG4gIH1cblxuICAvKipcbiAgICogXHVCMTc4XHVEMkI4IFx1QzgwMFx1QzdBNSBcdUI2MTBcdUIyOTQgXHVDNUM1XHVCMzcwXHVDNzc0XHVEMkI4XG4gICAqL1xuICB1cHNlcnROb3RlKG5vdGU6IE5vdGVNZXRhZGF0YSk6IHZvaWQge1xuICAgIHRoaXMuZGF0YS5ub3Rlc1tub3RlLmlkXSA9IHsgLi4ubm90ZSB9O1xuICAgIHRoaXMucGVyc2lzdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1QUNCRFx1Qjg1Q1x1Qjg1QyBcdUIxNzhcdUQyQjggXHVDODcwXHVENjhDXG4gICAqL1xuICBnZXROb3RlQnlQYXRoKHBhdGg6IHN0cmluZyk6IE5vdGVNZXRhZGF0YSB8IG51bGwge1xuICAgIGNvbnN0IG5vdGUgPSBPYmplY3QudmFsdWVzKHRoaXMuZGF0YS5ub3RlcykuZmluZCgoaXRlbSkgPT4gaXRlbS5wYXRoID09PSBwYXRoKTtcbiAgICByZXR1cm4gbm90ZSA/IHsgLi4ubm90ZSB9IDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJRFx1Qjg1QyBcdUIxNzhcdUQyQjggXHVDODcwXHVENjhDXG4gICAqL1xuICBnZXROb3RlQnlJZChpZDogc3RyaW5nKTogTm90ZU1ldGFkYXRhIHwgbnVsbCB7XG4gICAgY29uc3Qgbm90ZSA9IHRoaXMuZGF0YS5ub3Rlc1tpZF07XG4gICAgcmV0dXJuIG5vdGUgPyB7IC4uLm5vdGUgfSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogXHVCQUE4XHVCNEUwIFx1QjE3OFx1RDJCOCBcdUM4NzBcdUQ2OENcbiAgICovXG4gIGdldEFsbE5vdGVzKCk6IE5vdGVNZXRhZGF0YVtdIHtcbiAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyh0aGlzLmRhdGEubm90ZXMpXG4gICAgICAuc29ydCgoYSwgYikgPT4gYi51cGRhdGVkQXQgLSBhLnVwZGF0ZWRBdClcbiAgICAgIC5tYXAoKG5vdGUpID0+ICh7IC4uLm5vdGUgfSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1QjE3OFx1RDJCOCBcdUMwQURcdUM4MUNcbiAgICovXG4gIGRlbGV0ZU5vdGUoaWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGRlbGV0ZSB0aGlzLmRhdGEubm90ZXNbaWRdO1xuICAgIHRoaXMucGVyc2lzdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1Q0NBRFx1RDA2QyBcdUM4MDBcdUM3QTVcbiAgICovXG4gIGluc2VydENodW5rcyhjaHVua3M6IENodW5rW10pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGNodW5rIG9mIGNodW5rcykge1xuICAgICAgdGhpcy5kYXRhLmNodW5rc1tjaHVuay5pZF0gPSB7IC4uLmNodW5rIH07XG4gICAgfVxuICAgIHRoaXMucGVyc2lzdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1QjE3OFx1RDJCOFx1Qzc1OCBcdUNDQURcdUQwNkMgXHVDMEFEXHVDODFDXG4gICAqL1xuICBkZWxldGVDaHVua3NCeU5vdGVJZChub3RlSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgW2NodW5rSWQsIGNodW5rXSBvZiBPYmplY3QuZW50cmllcyh0aGlzLmRhdGEuY2h1bmtzKSkge1xuICAgICAgaWYgKGNodW5rLm5vdGVJZCA9PT0gbm90ZUlkKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmRhdGEuY2h1bmtzW2NodW5rSWRdO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnBlcnNpc3QoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUIxNzhcdUQyQjhcdUM3NTggXHVDQ0FEXHVEMDZDIFx1Qzg3MFx1RDY4Q1xuICAgKi9cbiAgZ2V0Q2h1bmtzQnlOb3RlSWQobm90ZUlkOiBzdHJpbmcpOiBDaHVua1tdIHtcbiAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyh0aGlzLmRhdGEuY2h1bmtzKVxuICAgICAgLmZpbHRlcigoY2h1bmspID0+IGNodW5rLm5vdGVJZCA9PT0gbm90ZUlkKVxuICAgICAgLnNvcnQoKGEsIGIpID0+IGEucG9zaXRpb24gLSBiLnBvc2l0aW9uKVxuICAgICAgLm1hcCgoY2h1bmspID0+ICh7IC4uLmNodW5rIH0pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJRFx1Qjg1QyBcdUNDQURcdUQwNkMgXHVDODcwXHVENjhDXG4gICAqL1xuICBnZXRDaHVua0J5SWQoaWQ6IHN0cmluZyk6IENodW5rIHwgbnVsbCB7XG4gICAgY29uc3QgY2h1bmsgPSB0aGlzLmRhdGEuY2h1bmtzW2lkXTtcbiAgICByZXR1cm4gY2h1bmsgPyB7IC4uLmNodW5rIH0gOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1QkFBOFx1QjRFMCBcdUNDQURcdUQwNkMgXHVDODcwXHVENjhDXG4gICAqL1xuICBnZXRBbGxDaHVua3MoKTogQ2h1bmtbXSB7XG4gICAgcmV0dXJuIE9iamVjdC52YWx1ZXModGhpcy5kYXRhLmNodW5rcykubWFwKChjaHVuaykgPT4gKHsgLi4uY2h1bmsgfSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1QjM3MFx1Qzc3NFx1RDEzMFx1QkNBMFx1Qzc3NFx1QzJBNCBcdUIyRUJcdUFFMzBcbiAgICovXG4gIGNsb3NlKCk6IHZvaWQge1xuICAgIC8vIFx1RDMwQ1x1Qzc3QyBcdUFFMzBcdUJDMTggXHVDODAwXHVDN0E1XHVDMThDXHVCMjk0IGNsb3NlIFx1QjNEOVx1Qzc5MVx1Qzc3NCBcdUQ1NDRcdUM2OTRcdUQ1NThcdUM5QzAgXHVDNTRBXHVDMkI1XHVCMkM4XHVCMkU0LlxuICB9XG59XG4iLCAiLy8gXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzBERFx1QzEzMVx1QUUzMCAtIEFQSSBcdUFFMzBcdUJDMTggXHVCQzBGIFx1Qjg1Q1x1Q0VFQyBcdUJBQThcdUIzNzggXHVDOUMwXHVDNkQwXG5cbmltcG9ydCB7IHJlcXVlc3RVcmwgfSBmcm9tIFwib2JzaWRpYW5cIjtcblxuZXhwb3J0IHR5cGUgRW1iZWRkaW5nQ29uZmlnID0ge1xuICBwcm92aWRlcjogXCJnZW1pbmlcIiB8IFwib3BlbmFpXCIgfCBcImxvY2FsXCIgfCBcImN1c3RvbVwiO1xuICBhcGlLZXk/OiBzdHJpbmc7XG4gIG1vZGVsOiBzdHJpbmc7XG4gIGFwaVVybD86IHN0cmluZztcbn07XG5cbmludGVyZmFjZSBHZW1pbmlFbWJlZGRpbmdSZXNwb25zZSB7XG4gIGVtYmVkZGluZz86IHtcbiAgICB2YWx1ZXM/OiBudW1iZXJbXTtcbiAgfTtcbn1cblxuaW50ZXJmYWNlIE9wZW5BSUVtYmVkZGluZ1Jlc3BvbnNlIHtcbiAgZGF0YT86IEFycmF5PHtcbiAgICBlbWJlZGRpbmc/OiBudW1iZXJbXTtcbiAgfT47XG59XG5cbmludGVyZmFjZSBDdXN0b21FbWJlZGRpbmdSZXNwb25zZSB7XG4gIGRhdGE/OiBBcnJheTx7XG4gICAgZW1iZWRkaW5nPzogbnVtYmVyW107XG4gIH0+O1xufVxuXG5leHBvcnQgY2xhc3MgRW1iZWRkaW5nR2VuZXJhdG9yIHtcbiAgcHJpdmF0ZSBwaXBlbGluZTogYW55ID0gbnVsbDtcbiAgcHJpdmF0ZSBwaXBlbGluZUZhY3Rvcnk6ICgodGFzazogc3RyaW5nLCBtb2RlbDogc3RyaW5nKSA9PiBQcm9taXNlPGFueT4pIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgY29uZmlnOiBFbWJlZGRpbmdDb25maWc7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBFbWJlZGRpbmdDb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUM3ODRcdUJDQTBcdUI1MjkgXHVDRDA4XHVBRTMwXHVENjU0XG4gICAqL1xuICBhc3luYyBpbml0aWFsaXplKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICh0aGlzLmNvbmZpZy5wcm92aWRlciA9PT0gXCJsb2NhbFwiKSB7XG4gICAgICBpZiAodGhpcy5waXBlbGluZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnNvbGUubG9nKGBcdUI4NUNcdUNFRUMgXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QkFBOFx1QjM3OCBcdUI4NUNcdUI1MjkgXHVDOTExOiAke3RoaXMuY29uZmlnLm1vZGVsfWApO1xuICAgICAgY29uc29sZS5sb2coYFx1QkFBOFx1QjM3OFx1Qzc0MCBIdWdnaW5nRmFjZVx1QzVEMFx1QzExQyBcdUIyRTRcdUM2QjRcdUI4NUNcdUI0RENcdUI0MThcdUM1QjQgXHVCODVDXHVDRUVDXHVDNUQwIFx1Q0U5MFx1QzJEQ1x1QjQyOVx1QjJDOFx1QjJFNC5gKTtcbiAgICAgIGNvbnN0IHBpcGVsaW5lRmFjdG9yeSA9IGF3YWl0IHRoaXMubG9hZFBpcGVsaW5lRmFjdG9yeSgpO1xuICAgICAgdGhpcy5waXBlbGluZSA9IGF3YWl0IHBpcGVsaW5lRmFjdG9yeShcImZlYXR1cmUtZXh0cmFjdGlvblwiLCB0aGlzLmNvbmZpZy5tb2RlbCk7XG4gICAgICBjb25zb2xlLmxvZyhcIlx1Qzc4NFx1QkNBMFx1QjUyOSBcdUJBQThcdUIzNzggXHVCODVDXHVCNTI5IFx1QzY0NFx1QjhDQ1wiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQVBJIFx1QUUzMFx1QkMxOFx1Qzc0MCBcdUNEMDhcdUFFMzBcdUQ2NTQgXHVCRDg4XHVENTQ0XHVDNjk0XG4gICAgICBjb25zb2xlLmxvZyhgQVBJIFx1QUUzMFx1QkMxOCBcdUM3ODRcdUJDQTBcdUI1MjkgXHVDMEFDXHVDNkE5OiAke3RoaXMuY29uZmlnLnByb3ZpZGVyfWApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBcdUQxNERcdUMyQTRcdUQyQjhcdUI5N0MgXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QkNBMVx1RDEzMFx1Qjg1QyBcdUJDQzBcdUQ2NThcbiAgICovXG4gIGFzeW5jIGVtYmVkKHRleHQ6IHN0cmluZyk6IFByb21pc2U8bnVtYmVyW10+IHtcbiAgICBpZiAodGhpcy5jb25maWcucHJvdmlkZXIgPT09IFwibG9jYWxcIikge1xuICAgICAgcmV0dXJuIHRoaXMuZW1iZWRMb2NhbCh0ZXh0KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY29uZmlnLnByb3ZpZGVyID09PSBcImdlbWluaVwiKSB7XG4gICAgICByZXR1cm4gdGhpcy5lbWJlZEdlbWluaSh0ZXh0KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY29uZmlnLnByb3ZpZGVyID09PSBcIm9wZW5haVwiKSB7XG4gICAgICByZXR1cm4gdGhpcy5lbWJlZE9wZW5BSSh0ZXh0KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY29uZmlnLnByb3ZpZGVyID09PSBcImN1c3RvbVwiKSB7XG4gICAgICByZXR1cm4gdGhpcy5lbWJlZEN1c3RvbSh0ZXh0KTtcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoYFx1QzlDMFx1QzZEMFx1RDU1OFx1QzlDMCBcdUM1NEFcdUIyOTQgXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzgxQ1x1QUNGNVx1Qzc5MDogJHt0aGlzLmNvbmZpZy5wcm92aWRlcn1gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUI4NUNcdUNFRUMgXHVCQUE4XHVCMzc4XHVCODVDIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUMwRERcdUMxMzFcbiAgICovXG4gIHByaXZhdGUgYXN5bmMgZW1iZWRMb2NhbCh0ZXh0OiBzdHJpbmcpOiBQcm9taXNlPG51bWJlcltdPiB7XG4gICAgaWYgKCF0aGlzLnBpcGVsaW5lKSB7XG4gICAgICBhd2FpdCB0aGlzLmluaXRpYWxpemUoKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMucGlwZWxpbmUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlx1Qzc4NFx1QkNBMFx1QjUyOSBcdUQzMENcdUM3NzRcdUQ1MDRcdUI3N0NcdUM3NzggXHVDRDA4XHVBRTMwXHVENjU0IFx1QzJFNFx1RDMyOFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBvdXRwdXQgPSBhd2FpdCB0aGlzLnBpcGVsaW5lKHRleHQsIHtcbiAgICAgIHBvb2xpbmc6IFwibWVhblwiLFxuICAgICAgbm9ybWFsaXplOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIEFycmF5LmZyb20ob3V0cHV0LmRhdGEgYXMgRmxvYXQzMkFycmF5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUI4NUNcdUNFRUMgXHVDNzg0XHVCQ0EwXHVCNTI5XHVDNkE5IFx1RDMwQ1x1Qzc3NFx1RDUwNFx1Qjc3Q1x1Qzc3OCBcdUI4NUNcdUIzNTQgKFx1RDU0NFx1QzY5NFx1RDU2MCBcdUI1NENcdUI5Q0MgXHVCODVDXHVCNERDKVxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBsb2FkUGlwZWxpbmVGYWN0b3J5KCk6IFByb21pc2U8KHRhc2s6IHN0cmluZywgbW9kZWw6IHN0cmluZykgPT4gUHJvbWlzZTxhbnk+PiB7XG4gICAgaWYgKHRoaXMucGlwZWxpbmVGYWN0b3J5KSB7XG4gICAgICByZXR1cm4gdGhpcy5waXBlbGluZUZhY3Rvcnk7XG4gICAgfVxuXG4gICAgY29uc3QgbW9kdWxlID0gYXdhaXQgaW1wb3J0KFwiQHhlbm92YS90cmFuc2Zvcm1lcnNcIik7XG4gICAgdGhpcy5waXBlbGluZUZhY3RvcnkgPSBtb2R1bGUucGlwZWxpbmUgYXMgKHRhc2s6IHN0cmluZywgbW9kZWw6IHN0cmluZykgPT4gUHJvbWlzZTxhbnk+O1xuICAgIHJldHVybiB0aGlzLnBpcGVsaW5lRmFjdG9yeTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW1pbmkgQVBJXHVCODVDIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUMwRERcdUMxMzFcbiAgICovXG4gIHByaXZhdGUgYXN5bmMgZW1iZWRHZW1pbmkodGV4dDogc3RyaW5nKTogUHJvbWlzZTxudW1iZXJbXT4ge1xuICAgIGlmICghdGhpcy5jb25maWcuYXBpS2V5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW1pbmkgQVBJIFx1RDBBNFx1QUMwMCBcdUMxMjRcdUM4MTVcdUI0MThcdUM5QzAgXHVDNTRBXHVDNTU4XHVDMkI1XHVCMkM4XHVCMkU0XCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHVybCA9IGAke3RoaXMuY29uZmlnLmFwaVVybH0vJHt0aGlzLmNvbmZpZy5tb2RlbH06ZW1iZWRDb250ZW50P2tleT0ke3RoaXMuY29uZmlnLmFwaUtleX1gO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcmVxdWVzdFVybCh7XG4gICAgICAgIHVybCxcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgY29udGVudDoge1xuICAgICAgICAgICAgcGFydHM6IFt7IHRleHQgfV0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgZGF0YSA9IHJlc3BvbnNlLmpzb24gYXMgR2VtaW5pRW1iZWRkaW5nUmVzcG9uc2U7XG4gICAgICBpZiAoZGF0YS5lbWJlZGRpbmc/LnZhbHVlcykge1xuICAgICAgICByZXR1cm4gZGF0YS5lbWJlZGRpbmcudmFsdWVzO1xuICAgICAgfVxuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW1pbmkgQVBJIFx1Qzc1MVx1QjJGNSBcdUQ2MTVcdUMyRERcdUM3NzQgXHVDNjJDXHVCQzE0XHVCOTc0XHVDOUMwIFx1QzU0QVx1QzJCNVx1QjJDOFx1QjJFNFwiKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkdlbWluaSBcdUM3ODRcdUJDQTBcdUI1MjkgXHVDMEREXHVDMTMxIFx1QzJFNFx1RDMyODpcIiwgZXJyb3IpO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE9wZW5BSSBBUElcdUI4NUMgXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzBERFx1QzEzMVxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBlbWJlZE9wZW5BSSh0ZXh0OiBzdHJpbmcpOiBQcm9taXNlPG51bWJlcltdPiB7XG4gICAgaWYgKCF0aGlzLmNvbmZpZy5hcGlLZXkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk9wZW5BSSBBUEkgXHVEMEE0XHVBQzAwIFx1QzEyNFx1QzgxNVx1QjQxOFx1QzlDMCBcdUM1NEFcdUM1NThcdUMyQjVcdUIyQzhcdUIyRTRcIik7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcmVxdWVzdFVybCh7XG4gICAgICAgIHVybDogdGhpcy5jb25maWcuYXBpVXJsIHx8IFwiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS92MS9lbWJlZGRpbmdzXCIsXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICBcIkF1dGhvcml6YXRpb25cIjogYEJlYXJlciAke3RoaXMuY29uZmlnLmFwaUtleX1gLFxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgbW9kZWw6IHRoaXMuY29uZmlnLm1vZGVsLFxuICAgICAgICAgIGlucHV0OiB0ZXh0LFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBkYXRhID0gcmVzcG9uc2UuanNvbiBhcyBPcGVuQUlFbWJlZGRpbmdSZXNwb25zZTtcbiAgICAgIGlmIChkYXRhLmRhdGE/LlswXT8uZW1iZWRkaW5nKSB7XG4gICAgICAgIHJldHVybiBkYXRhLmRhdGFbMF0uZW1iZWRkaW5nO1xuICAgICAgfVxuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJPcGVuQUkgQVBJIFx1Qzc1MVx1QjJGNSBcdUQ2MTVcdUMyRERcdUM3NzQgXHVDNjJDXHVCQzE0XHVCOTc0XHVDOUMwIFx1QzU0QVx1QzJCNVx1QjJDOFx1QjJFNFwiKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIk9wZW5BSSBcdUM3ODRcdUJDQTBcdUI1MjkgXHVDMEREXHVDMTMxIFx1QzJFNFx1RDMyODpcIiwgZXJyb3IpO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFx1Q0VFNFx1QzJBNFx1RDE0MCBBUElcdUI4NUMgXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzBERFx1QzEzMVxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBlbWJlZEN1c3RvbSh0ZXh0OiBzdHJpbmcpOiBQcm9taXNlPG51bWJlcltdPiB7XG4gICAgaWYgKCF0aGlzLmNvbmZpZy5hcGlVcmwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlx1Q0VFNFx1QzJBNFx1RDE0MCBBUEkgVVJMXHVDNzc0IFx1QzEyNFx1QzgxNVx1QjQxOFx1QzlDMCBcdUM1NEFcdUM1NThcdUMyQjVcdUIyQzhcdUIyRTRcIik7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGhlYWRlcnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMuY29uZmlnLmFwaUtleSkge1xuICAgICAgICBoZWFkZXJzW1wiQXV0aG9yaXphdGlvblwiXSA9IGBCZWFyZXIgJHt0aGlzLmNvbmZpZy5hcGlLZXl9YDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCByZXF1ZXN0VXJsKHtcbiAgICAgICAgdXJsOiB0aGlzLmNvbmZpZy5hcGlVcmwsXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGhlYWRlcnMsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBtb2RlbDogdGhpcy5jb25maWcubW9kZWwsXG4gICAgICAgICAgaW5wdXQ6IHRleHQsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGRhdGEgPSByZXNwb25zZS5qc29uIGFzIEN1c3RvbUVtYmVkZGluZ1Jlc3BvbnNlIHwgbnVtYmVyW107XG4gICAgICBcbiAgICAgIC8vIE9wZW5BSSBcdUQ2MzhcdUQ2NTggXHVENjE1XHVDMkREXG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZGF0YSkgJiYgZGF0YS5kYXRhPy5bMF0/LmVtYmVkZGluZykge1xuICAgICAgICByZXR1cm4gZGF0YS5kYXRhWzBdLmVtYmVkZGluZztcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8gXHVDOUMxXHVDODExIFx1QkMzMFx1QzVGNCBcdUJDMThcdUQ2NThcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfVxuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJcdUNFRTRcdUMyQTRcdUQxNDAgQVBJIFx1Qzc1MVx1QjJGNSBcdUQ2MTVcdUMyRERcdUM3NDQgXHVEMzBDXHVDMkYxXHVENTYwIFx1QzIxOCBcdUM1QzZcdUMyQjVcdUIyQzhcdUIyRTRcIik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJcdUNFRTRcdUMyQTRcdUQxNDAgXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzBERFx1QzEzMSBcdUMyRTRcdUQzMjg6XCIsIGVycm9yKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBcdUM1RUNcdUI3RUMgXHVEMTREXHVDMkE0XHVEMkI4XHVCOTdDIFx1QkMzMFx1Q0U1OFx1Qjg1QyBcdUM3ODRcdUJDQTBcdUI1MjkgXHVDMEREXHVDMTMxXG4gICAqL1xuICBhc3luYyBlbWJlZEJhdGNoKHRleHRzOiBzdHJpbmdbXSk6IFByb21pc2U8bnVtYmVyW11bXT4ge1xuICAgIGNvbnN0IGVtYmVkZGluZ3M6IG51bWJlcltdW10gPSBbXTtcblxuICAgIGZvciAoY29uc3QgdGV4dCBvZiB0ZXh0cykge1xuICAgICAgY29uc3QgZW1iZWRkaW5nID0gYXdhaXQgdGhpcy5lbWJlZCh0ZXh0KTtcbiAgICAgIGVtYmVkZGluZ3MucHVzaChlbWJlZGRpbmcpO1xuICAgIH1cblxuICAgIHJldHVybiBlbWJlZGRpbmdzO1xuICB9XG59XG4iLCAiLy8gXHVCOUM4XHVEMDZDXHVCMkU0XHVDNkI0IFx1RDMwQ1x1QzExQyAtIGZyb250bWF0dGVyLCBcdUQwRENcdUFERjgsIFx1QjlDMVx1RDA2QyBcdUNEOTRcdUNEOUNcblxuaW1wb3J0IG1hdHRlciBmcm9tIFwiZ3JheS1tYXR0ZXJcIjtcbmltcG9ydCB7IGNyZWF0ZUhhc2ggfSBmcm9tIFwiY3J5cHRvXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGFyc2VkTm90ZSB7XG4gIGNvbnRlbnQ6IHN0cmluZztcbiAgZnJvbnRtYXR0ZXI6IFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuICB0YWdzOiBzdHJpbmdbXTtcbiAgbGlua3M6IHN0cmluZ1tdO1xuICB0aXRsZTogc3RyaW5nO1xuICBzZWN0aW9uczogU2VjdGlvbltdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNlY3Rpb24ge1xuICBoZWFkaW5nOiBzdHJpbmc7XG4gIGNvbnRlbnQ6IHN0cmluZztcbiAgbGV2ZWw6IG51bWJlcjtcbiAgcG9zaXRpb246IG51bWJlcjtcbn1cblxuLyoqXG4gKiBcdUI5QzhcdUQwNkNcdUIyRTRcdUM2QjQgXHVEMzBDXHVDNzdDXHVDNzQ0IFx1RDMwQ1x1QzJGMVx1RDU1OFx1QzVFQyBcdUJBNTRcdUQwQzBcdUIzNzBcdUM3NzRcdUQxMzBcdUI5N0MgXHVDRDk0XHVDRDlDXHVENTY5XHVCMkM4XHVCMkU0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VNYXJrZG93bihmaWxlUGF0aDogc3RyaW5nLCBjb250ZW50OiBzdHJpbmcpOiBQYXJzZWROb3RlIHtcbiAgLy8gRnJvbnRtYXR0ZXIgXHVEMzBDXHVDMkYxXG4gIGNvbnN0IHBhcnNlZCA9IG1hdHRlcihjb250ZW50KTtcbiAgY29uc3QgZnJvbnRtYXR0ZXIgPSBwYXJzZWQuZGF0YSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbiAgY29uc3QgYm9keUNvbnRlbnQgPSBwYXJzZWQuY29udGVudDtcblxuICAvLyBcdUM4MUNcdUJBQTkgXHVDRDk0XHVDRDlDIChmcm9udG1hdHRlclx1Qzc1OCB0aXRsZSBcdUI2MTBcdUIyOTQgXHVEMzBDXHVDNzdDXHVCQTg1KVxuICBjb25zdCB0aXRsZSA9IChmcm9udG1hdHRlci50aXRsZSBhcyBzdHJpbmcpIHx8IGV4dHJhY3RUaXRsZUZyb21QYXRoKGZpbGVQYXRoKTtcblxuICAvLyBcdUQwRENcdUFERjggXHVDRDk0XHVDRDlDICgjXHVEMERDXHVBREY4IFx1RDYxNVx1QzJERClcbiAgY29uc3QgdGFncyA9IGV4dHJhY3RUYWdzKGJvZHlDb250ZW50LCBmcm9udG1hdHRlcik7XG5cbiAgLy8gXHVCOUMxXHVEMDZDIFx1Q0Q5NFx1Q0Q5QyAoW1tcdUI5QzFcdUQwNkNdXSBcdUQ2MTVcdUMyREQpXG4gIGNvbnN0IGxpbmtzID0gZXh0cmFjdExpbmtzKGJvZHlDb250ZW50KTtcblxuICAvLyBcdUMxMzlcdUMxNTggXHVCRDg0XHVCOUFDXG4gIGNvbnN0IHNlY3Rpb25zID0gZXh0cmFjdFNlY3Rpb25zKGJvZHlDb250ZW50KTtcblxuICByZXR1cm4ge1xuICAgIGNvbnRlbnQ6IGJvZHlDb250ZW50LFxuICAgIGZyb250bWF0dGVyLFxuICAgIHRhZ3MsXG4gICAgbGlua3MsXG4gICAgdGl0bGUsXG4gICAgc2VjdGlvbnMsXG4gIH07XG59XG5cbi8qKlxuICogXHVEMzBDXHVDNzdDIFx1QUNCRFx1Qjg1Q1x1QzVEMFx1QzExQyBcdUM4MUNcdUJBQTkgXHVDRDk0XHVDRDlDXG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3RUaXRsZUZyb21QYXRoKGZpbGVQYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBmaWxlTmFtZSA9IGZpbGVQYXRoLnNwbGl0KFwiL1wiKS5wb3AoKSB8fCBcIlwiO1xuICByZXR1cm4gZmlsZU5hbWUucmVwbGFjZSgvXFwubWQkLywgXCJcIik7XG59XG5cbi8qKlxuICogXHVCQ0Y4XHVCQjM4XHVBQ0ZDIGZyb250bWF0dGVyXHVDNUQwXHVDMTFDIFx1RDBEQ1x1QURGOCBcdUNEOTRcdUNEOUNcbiAqL1xuZnVuY3Rpb24gZXh0cmFjdFRhZ3MoY29udGVudDogc3RyaW5nLCBmcm9udG1hdHRlcjogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBzdHJpbmdbXSB7XG4gIGNvbnN0IHRhZ3MgPSBuZXcgU2V0PHN0cmluZz4oKTtcblxuICAvLyBGcm9udG1hdHRlclx1Qzc1OCB0YWdzIFx1RDU0NFx1QjREQ1xuICBpZiAoQXJyYXkuaXNBcnJheShmcm9udG1hdHRlci50YWdzKSkge1xuICAgIGZyb250bWF0dGVyLnRhZ3MuZm9yRWFjaCgodGFnKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHRhZyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICB0YWdzLmFkZCh0YWcucmVwbGFjZSgvXiMvLCBcIlwiKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBcdUJDRjhcdUJCMzhcdUM1RDBcdUMxMUMgI1x1RDBEQ1x1QURGOCBcdUNEOTRcdUNEOUNcbiAgY29uc3QgaGFzaHRhZ1JlZ2V4ID0gLyMoW2EtekEtWjAtOVx1QUMwMC1cdUQ3QTNfLV0rKS9nO1xuICBsZXQgbWF0Y2g7XG4gIHdoaWxlICgobWF0Y2ggPSBoYXNodGFnUmVnZXguZXhlYyhjb250ZW50KSkgIT09IG51bGwpIHtcbiAgICB0YWdzLmFkZChtYXRjaFsxXSk7XG4gIH1cblxuICByZXR1cm4gQXJyYXkuZnJvbSh0YWdzKTtcbn1cblxuLyoqXG4gKiBPYnNpZGlhbiBcdUI5QzFcdUQwNkMgXHVDRDk0XHVDRDlDIChbW1x1QjlDMVx1RDA2Q11dIFx1RDYxNVx1QzJERClcbiAqL1xuZnVuY3Rpb24gZXh0cmFjdExpbmtzKGNvbnRlbnQ6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgY29uc3QgbGlua3MgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgY29uc3QgbGlua1JlZ2V4ID0gL1xcW1xcWyhbXlxcXV0rKVxcXVxcXS9nO1xuICBsZXQgbWF0Y2g7XG4gIHdoaWxlICgobWF0Y2ggPSBsaW5rUmVnZXguZXhlYyhjb250ZW50KSkgIT09IG51bGwpIHtcbiAgICAvLyBcdUJDQzRcdUNFNkQgXHVDQzk4XHVCOUFDIFtbXHVCOUMxXHVEMDZDfFx1QkNDNFx1Q0U2RF1dXG4gICAgY29uc3QgbGluayA9IG1hdGNoWzFdLnNwbGl0KFwifFwiKVswXS50cmltKCk7XG4gICAgbGlua3MuYWRkKGxpbmspO1xuICB9XG4gIHJldHVybiBBcnJheS5mcm9tKGxpbmtzKTtcbn1cblxuLyoqXG4gKiBcdUQ1RTRcdUIzNTQgXHVBRTMwXHVDOTAwXHVDNzNDXHVCODVDIFx1QzEzOVx1QzE1OCBcdUJEODRcdUI5QUNcbiAqL1xuZnVuY3Rpb24gZXh0cmFjdFNlY3Rpb25zKGNvbnRlbnQ6IHN0cmluZyk6IFNlY3Rpb25bXSB7XG4gIGNvbnN0IHNlY3Rpb25zOiBTZWN0aW9uW10gPSBbXTtcbiAgY29uc3QgbGluZXMgPSBjb250ZW50LnNwbGl0KFwiXFxuXCIpO1xuXG4gIGxldCBjdXJyZW50U2VjdGlvbjogU2VjdGlvbiB8IG51bGwgPSBudWxsO1xuICBsZXQgY3VycmVudENvbnRlbnQ6IHN0cmluZ1tdID0gW107XG4gIGxldCBwb3NpdGlvbiA9IDA7XG5cbiAgZm9yIChjb25zdCBsaW5lIG9mIGxpbmVzKSB7XG4gICAgY29uc3QgaGVhZGVyTWF0Y2ggPSBsaW5lLm1hdGNoKC9eKCN7MSw2fSlcXHMrKC4rKSQvKTtcblxuICAgIGlmIChoZWFkZXJNYXRjaCkge1xuICAgICAgLy8gXHVDNzc0XHVDODA0IFx1QzEzOVx1QzE1OCBcdUM4MDBcdUM3QTVcbiAgICAgIGlmIChjdXJyZW50U2VjdGlvbikge1xuICAgICAgICBjdXJyZW50U2VjdGlvbi5jb250ZW50ID0gY3VycmVudENvbnRlbnQuam9pbihcIlxcblwiKS50cmltKCk7XG4gICAgICAgIHNlY3Rpb25zLnB1c2goY3VycmVudFNlY3Rpb24pO1xuICAgICAgfVxuXG4gICAgICAvLyBcdUMwQzggXHVDMTM5XHVDMTU4IFx1QzJEQ1x1Qzc5MVxuICAgICAgY3VycmVudFNlY3Rpb24gPSB7XG4gICAgICAgIGhlYWRpbmc6IGhlYWRlck1hdGNoWzJdLnRyaW0oKSxcbiAgICAgICAgY29udGVudDogXCJcIixcbiAgICAgICAgbGV2ZWw6IGhlYWRlck1hdGNoWzFdLmxlbmd0aCxcbiAgICAgICAgcG9zaXRpb24sXG4gICAgICB9O1xuICAgICAgY3VycmVudENvbnRlbnQgPSBbXTtcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRTZWN0aW9uKSB7XG4gICAgICBjdXJyZW50Q29udGVudC5wdXNoKGxpbmUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBcdUQ1RTRcdUIzNTQgXHVDNUM2XHVCMjk0IFx1Q0NBQiBcdUJEODBcdUJEODRcbiAgICAgIGlmIChzZWN0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY3VycmVudFNlY3Rpb24gPSB7XG4gICAgICAgICAgaGVhZGluZzogXCJcIixcbiAgICAgICAgICBjb250ZW50OiBcIlwiLFxuICAgICAgICAgIGxldmVsOiAwLFxuICAgICAgICAgIHBvc2l0aW9uLFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgY3VycmVudENvbnRlbnQucHVzaChsaW5lKTtcbiAgICB9XG5cbiAgICBwb3NpdGlvbiArPSBsaW5lLmxlbmd0aCArIDE7IC8vICsxIGZvciBuZXdsaW5lXG4gIH1cblxuICAvLyBcdUI5QzhcdUM5QzBcdUI5QzkgXHVDMTM5XHVDMTU4IFx1QzgwMFx1QzdBNVxuICBpZiAoY3VycmVudFNlY3Rpb24pIHtcbiAgICBjdXJyZW50U2VjdGlvbi5jb250ZW50ID0gY3VycmVudENvbnRlbnQuam9pbihcIlxcblwiKS50cmltKCk7XG4gICAgc2VjdGlvbnMucHVzaChjdXJyZW50U2VjdGlvbik7XG4gIH1cblxuICByZXR1cm4gc2VjdGlvbnM7XG59XG5cbi8qKlxuICogXHVEMzBDXHVDNzdDIFx1QjBCNFx1QzZBOVx1Qzc1OCBcdUQ1NzRcdUMyREMgXHVDMEREXHVDMTMxXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21wdXRlSGFzaChjb250ZW50OiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gY3JlYXRlSGFzaChcInNoYTI1NlwiKS51cGRhdGUoY29udGVudCkuZGlnZXN0KFwiaGV4XCIpO1xufVxuIiwgIi8vIFx1QkIzOFx1QzExQyBcdUNDQURcdUQwQjkgXHVCODVDXHVDOUMxIC0gXHVEMTREXHVDMkE0XHVEMkI4XHVCOTdDIFx1QzgwMVx1QzgwOFx1RDU1QyBcdUQwNkNcdUFFMzBcdUI4NUMgXHVCRDg0XHVENTYwXG5cbmltcG9ydCB7IENodW5rIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IFNlY3Rpb24gfSBmcm9tIFwiLi9wYXJzZXJcIjtcblxuLyoqXG4gKiBcdUFDMDRcdUIyRThcdUQ1NUMgXHVEMUEwXHVEMDcwIFx1Q0U3NFx1QzZCNFx1RDEzMCAoXHVBQ0Y1XHVCQzMxIFx1QUUzMFx1QzkwMCBcdUFERkNcdUMwQUNcdUNFNTgpXG4gKiBcdUNDMzhcdUFDRTA6IFx1RDU1Q1x1QUUwMFx1QUNGQyBcdUM2MDFcdUM1QjRcdUI5N0MgXHVCRDg0XHVCOUFDXHVENTU4XHVDNUVDIFx1Q0U3NFx1QzZCNFx1RDJCOFx1RDU1OFx1QzVFQyBcdUM3NzRcdUM5MTEgXHVDRTc0XHVDNkI0XHVEMkI4IFx1QkMyOVx1QzlDMFxuICovXG5mdW5jdGlvbiBlc3RpbWF0ZVRva2VuQ291bnQodGV4dDogc3RyaW5nKTogbnVtYmVyIHtcbiAgLy8gXHVENTVDXHVBRTAwIFx1QkIzOFx1Qzc5MCBcdUM4MUNcdUFDNzAgXHVENkM0IFx1QzYwMVx1QzVCNC9cdUMyMkJcdUM3OTAgXHVCMkU4XHVDNUI0IFx1Q0U3NFx1QzZCNFx1RDJCOFxuICBjb25zdCBub25Lb3JlYW5UZXh0ID0gdGV4dC5yZXBsYWNlKC9bXHVBQzAwLVx1RDdBM10vZywgXCIgXCIpO1xuICBjb25zdCB3b3JkcyA9IG5vbktvcmVhblRleHQuc3BsaXQoL1xccysvKS5maWx0ZXIoKHcpID0+IHcubGVuZ3RoID4gMCkubGVuZ3RoO1xuICBcbiAgLy8gXHVENTVDXHVBRTAwIFx1QkIzOFx1Qzc5MFx1QjlDQyBcdUNFNzRcdUM2QjRcdUQyQjhcbiAgY29uc3Qga29yZWFuQ2hhcnMgPSAodGV4dC5tYXRjaCgvW1x1QUMwMC1cdUQ3QTNdL2cpIHx8IFtdKS5sZW5ndGg7XG4gIFxuICAvLyBcdUM2MDFcdUM1QjRcdUIyOTQgMVx1QjJFOFx1QzVCNCBcdTIyNDggMS4zIFx1RDFBMFx1RDA3MCwgXHVENTVDXHVBRTAwXHVDNzQwIDFcdUM3NENcdUM4MDggXHUyMjQ4IDEgXHVEMUEwXHVEMDcwIFx1QURGQ1x1QzBBQ1xuICByZXR1cm4gTWF0aC5jZWlsKHdvcmRzICogMS4zICsga29yZWFuQ2hhcnMpO1xufVxuXG4vKipcbiAqIFx1RDE0RFx1QzJBNFx1RDJCOFx1Qjk3QyBcdUNDQURcdUQwNkNcdUI4NUMgXHVCRDg0XHVENTYwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjaHVua1RleHQoXG4gIG5vdGVJZDogc3RyaW5nLFxuICBzZWN0aW9uczogU2VjdGlvbltdLFxuICBvcHRpb25zOiB7XG4gICAgY2h1bmtTaXplPzogbnVtYmVyO1xuICAgIGNodW5rT3ZlcmxhcD86IG51bWJlcjtcbiAgfSA9IHt9XG4pOiBDaHVua1tdIHtcbiAgY29uc3QgY2h1bmtTaXplID0gb3B0aW9ucy5jaHVua1NpemUgfHwgNDAwO1xuICBjb25zdCBjaHVua092ZXJsYXAgPSBvcHRpb25zLmNodW5rT3ZlcmxhcCB8fCA1MDtcbiAgY29uc3QgY2h1bmtzOiBDaHVua1tdID0gW107XG5cbiAgZm9yIChjb25zdCBzZWN0aW9uIG9mIHNlY3Rpb25zKSB7XG4gICAgY29uc3Qgc2VjdGlvblRleHQgPSBzZWN0aW9uLmhlYWRpbmdcbiAgICAgID8gYCMgJHtzZWN0aW9uLmhlYWRpbmd9XFxuXFxuJHtzZWN0aW9uLmNvbnRlbnR9YFxuICAgICAgOiBzZWN0aW9uLmNvbnRlbnQ7XG5cbiAgICBpZiAoIXNlY3Rpb25UZXh0LnRyaW0oKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgY29uc3QgdG9rZW5Db3VudCA9IGVzdGltYXRlVG9rZW5Db3VudChzZWN0aW9uVGV4dCk7XG5cbiAgICAvLyBcdUMxMzlcdUMxNThcdUM3NzQgXHVDQ0FEXHVEMDZDIFx1RDA2Q1x1QUUzMFx1QkNGNFx1QjJFNCBcdUM3OTFcdUM3M0NcdUJBNzQgXHVBREY4XHVCMzAwXHVCODVDIFx1QzBBQ1x1QzZBOVxuICAgIGlmICh0b2tlbkNvdW50IDw9IGNodW5rU2l6ZSkge1xuICAgICAgY2h1bmtzLnB1c2goe1xuICAgICAgICBpZDogYCR7bm90ZUlkfS1jaHVuay0ke2NodW5rcy5sZW5ndGh9YCxcbiAgICAgICAgbm90ZUlkLFxuICAgICAgICB0ZXh0OiBzZWN0aW9uVGV4dCxcbiAgICAgICAgcG9zaXRpb246IHNlY3Rpb24ucG9zaXRpb24sXG4gICAgICAgIHRva2VuQ291bnQsXG4gICAgICAgIHNlY3Rpb246IHNlY3Rpb24uaGVhZGluZyxcbiAgICAgIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gXHVDMTM5XHVDMTU4XHVDNzc0IFx1RDA2Q1x1QkE3NCBcdUJCMzhcdUM3QTUgXHVCMkU4XHVDNzA0XHVCODVDIFx1QkQ4NFx1RDU2MFxuICAgIGNvbnN0IHNlbnRlbmNlcyA9IHNwbGl0SW50b1NlbnRlbmNlcyhzZWN0aW9uVGV4dCk7XG4gICAgbGV0IGN1cnJlbnRDaHVuazogc3RyaW5nW10gPSBbXTtcbiAgICBsZXQgY3VycmVudFRva2VucyA9IDA7XG5cbiAgICBmb3IgKGNvbnN0IHNlbnRlbmNlIG9mIHNlbnRlbmNlcykge1xuICAgICAgY29uc3Qgc2VudGVuY2VUb2tlbnMgPSBlc3RpbWF0ZVRva2VuQ291bnQoc2VudGVuY2UpO1xuXG4gICAgICAvLyBcdUQ2MDRcdUM3QUMgXHVDQ0FEXHVEMDZDXHVDNUQwIFx1Q0Q5NFx1QUMwMCBcdUFDMDBcdUIyQTVcdUQ1NUNcdUM5QzAgXHVENjU1XHVDNzc4XG4gICAgICBpZiAoY3VycmVudFRva2VucyArIHNlbnRlbmNlVG9rZW5zIDw9IGNodW5rU2l6ZSkge1xuICAgICAgICBjdXJyZW50Q2h1bmsucHVzaChzZW50ZW5jZSk7XG4gICAgICAgIGN1cnJlbnRUb2tlbnMgKz0gc2VudGVuY2VUb2tlbnM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBcdUQ2MDRcdUM3QUMgXHVDQ0FEXHVEMDZDIFx1QzgwMFx1QzdBNVxuICAgICAgICBpZiAoY3VycmVudENodW5rLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBjb25zdCBjaHVua1RleHQgPSBjdXJyZW50Q2h1bmsuam9pbihcIiBcIik7XG4gICAgICAgICAgY2h1bmtzLnB1c2goe1xuICAgICAgICAgICAgaWQ6IGAke25vdGVJZH0tY2h1bmstJHtjaHVua3MubGVuZ3RofWAsXG4gICAgICAgICAgICBub3RlSWQsXG4gICAgICAgICAgICB0ZXh0OiBjaHVua1RleHQsXG4gICAgICAgICAgICBwb3NpdGlvbjogc2VjdGlvbi5wb3NpdGlvbixcbiAgICAgICAgICAgIHRva2VuQ291bnQ6IGN1cnJlbnRUb2tlbnMsXG4gICAgICAgICAgICBzZWN0aW9uOiBzZWN0aW9uLmhlYWRpbmcsXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBcdUM2MjRcdUJDODRcdUI3QTlcdUM3NDQgXHVDNzA0XHVENTc0IFx1QjlDOFx1QzlDMFx1QjlDOSBcdUJBODcgXHVCQjM4XHVDN0E1IFx1QzcyMFx1QzlDMFxuICAgICAgICAgIGNvbnN0IG92ZXJsYXBTZW50ZW5jZXMgPSBnZXRPdmVybGFwU2VudGVuY2VzKGN1cnJlbnRDaHVuaywgY2h1bmtPdmVybGFwKTtcbiAgICAgICAgICBjdXJyZW50Q2h1bmsgPSBvdmVybGFwU2VudGVuY2VzO1xuICAgICAgICAgIGN1cnJlbnRUb2tlbnMgPSBlc3RpbWF0ZVRva2VuQ291bnQoY3VycmVudENodW5rLmpvaW4oXCIgXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFx1QzBDOCBcdUNDQURcdUQwNkMgXHVDMkRDXHVDNzkxXG4gICAgICAgIGN1cnJlbnRDaHVuay5wdXNoKHNlbnRlbmNlKTtcbiAgICAgICAgY3VycmVudFRva2VucyArPSBzZW50ZW5jZVRva2VucztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBcdUI5QzhcdUM5QzBcdUI5QzkgXHVDQ0FEXHVEMDZDIFx1QzgwMFx1QzdBNVxuICAgIGlmIChjdXJyZW50Q2h1bmsubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgY2h1bmtUZXh0ID0gY3VycmVudENodW5rLmpvaW4oXCIgXCIpO1xuICAgICAgY2h1bmtzLnB1c2goe1xuICAgICAgICBpZDogYCR7bm90ZUlkfS1jaHVuay0ke2NodW5rcy5sZW5ndGh9YCxcbiAgICAgICAgbm90ZUlkLFxuICAgICAgICB0ZXh0OiBjaHVua1RleHQsXG4gICAgICAgIHBvc2l0aW9uOiBzZWN0aW9uLnBvc2l0aW9uLFxuICAgICAgICB0b2tlbkNvdW50OiBjdXJyZW50VG9rZW5zLFxuICAgICAgICBzZWN0aW9uOiBzZWN0aW9uLmhlYWRpbmcsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gY2h1bmtzO1xufVxuXG4vKipcbiAqIFx1RDE0RFx1QzJBNFx1RDJCOFx1Qjk3QyBcdUJCMzhcdUM3QTVcdUM3M0NcdUI4NUMgXHVCRDg0XHVENTYwIChcdUFDMDRcdUIyRThcdUQ1NUMgXHVCQzg0XHVDODA0KVxuICogXHVDQzM4XHVBQ0UwOiBcdUM1N0RcdUM1QjQoRHIuLCBNci4gXHVCNEYxKVx1QjA5OCBcdUMxOENcdUMyMThcdUM4MTBcdUM1RDBcdUMxMUMgXHVCRDg0XHVENTYwXHVCNDIwIFx1QzIxOCBcdUM3ODhcdUM3NENcbiAqL1xuZnVuY3Rpb24gc3BsaXRJbnRvU2VudGVuY2VzKHRleHQ6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgLy8gXHVCOUM4XHVDRTY4XHVENDVDLCBcdUIyOTBcdUIwOENcdUQ0NUMsIFx1QkIzQ1x1Qzc0Q1x1RDQ1QyBcdUI0QTQgXHVBQ0Y1XHVCQzMxXHVDNzNDXHVCODVDIFx1QkQ4NFx1RDU2MFxuICAvLyBcdUM4MUNcdUQ1NUNcdUMwQUNcdUQ1NkQ6IFx1QzU3RFx1QzVCNFx1QjA5OCBcdUMxOENcdUMyMThcdUM4MTBcdUM1RDBcdUMxMUMgXHVDNzk4XHVCQUJCIFx1QkQ4NFx1RDU2MFx1QjQyMCBcdUMyMTggXHVDNzg4XHVDNzRDXG4gIGNvbnN0IHNlbnRlbmNlcyA9IHRleHQuc3BsaXQoLyhbLiE/XVxccyspLykuZmlsdGVyKChzKSA9PiBzLnRyaW0oKSk7XG4gIGNvbnN0IHJlc3VsdDogc3RyaW5nW10gPSBbXTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbnRlbmNlcy5sZW5ndGg7IGkgKz0gMikge1xuICAgIGNvbnN0IHNlbnRlbmNlID0gc2VudGVuY2VzW2ldO1xuICAgIGNvbnN0IHB1bmN0dWF0aW9uID0gc2VudGVuY2VzW2kgKyAxXSB8fCBcIlwiO1xuICAgIHJlc3VsdC5wdXNoKHNlbnRlbmNlICsgcHVuY3R1YXRpb24pO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdC5maWx0ZXIoKHMpID0+IHMudHJpbSgpKTtcbn1cblxuLyoqXG4gKiBcdUM2MjRcdUJDODRcdUI3QTlcdUM3NDQgXHVDNzA0XHVENTVDIFx1QjlDOFx1QzlDMFx1QjlDOSBcdUJCMzhcdUM3QTVcdUI0RTQgXHVBQzAwXHVDODM4XHVDNjI0XHVBRTMwXG4gKi9cbmZ1bmN0aW9uIGdldE92ZXJsYXBTZW50ZW5jZXMoc2VudGVuY2VzOiBzdHJpbmdbXSwgdGFyZ2V0VG9rZW5zOiBudW1iZXIpOiBzdHJpbmdbXSB7XG4gIGNvbnN0IG92ZXJsYXA6IHN0cmluZ1tdID0gW107XG4gIGxldCB0b2tlbnMgPSAwO1xuXG4gIGZvciAobGV0IGkgPSBzZW50ZW5jZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBjb25zdCBzZW50ZW5jZSA9IHNlbnRlbmNlc1tpXTtcbiAgICBjb25zdCBzZW50ZW5jZVRva2VucyA9IGVzdGltYXRlVG9rZW5Db3VudChzZW50ZW5jZSk7XG5cbiAgICBpZiAodG9rZW5zICsgc2VudGVuY2VUb2tlbnMgPiB0YXJnZXRUb2tlbnMpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIG92ZXJsYXAudW5zaGlmdChzZW50ZW5jZSk7XG4gICAgdG9rZW5zICs9IHNlbnRlbmNlVG9rZW5zO1xuICB9XG5cbiAgcmV0dXJuIG92ZXJsYXA7XG59XG4iLCAiLy8gXHVDNzc4XHVCMzcxXHVDMTFDIC0gXHVEMzBDXHVDNzdDIFx1QzJBNFx1Q0U5NCwgXHVEMzBDXHVDMkYxLCBcdUNDQURcdUQwQjksIFx1Qzc4NFx1QkNBMFx1QjUyOSwgXHVDODAwXHVDN0E1XHVDNzQ0IFx1RDFCNVx1RDU2OVxuXG5pbXBvcnQgeyBNZXRhZGF0YVN0b3JlIH0gZnJvbSBcIi4vbWV0YWRhdGFTdG9yZVwiO1xuaW1wb3J0IHsgRW1iZWRkaW5nR2VuZXJhdG9yLCBFbWJlZGRpbmdDb25maWcgfSBmcm9tIFwiLi9lbWJlZGRpbmdzXCI7XG5pbXBvcnQgeyBwYXJzZU1hcmtkb3duLCBjb21wdXRlSGFzaCB9IGZyb20gXCIuL3BhcnNlclwiO1xuaW1wb3J0IHsgY2h1bmtUZXh0IH0gZnJvbSBcIi4vY2h1bmtlclwiO1xuaW1wb3J0IHsgSW5kZXhpbmdDb25maWcsIE5vdGVNZXRhZGF0YSwgQ2h1bmsgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgY3JlYXRlSGFzaCB9IGZyb20gXCJjcnlwdG9cIjtcbmltcG9ydCB7IFZlY3RvckluZGV4IH0gZnJvbSBcIi4vdmVjdG9ySW5kZXhcIjtcbmltcG9ydCB7IGNyZWF0ZVZlY3RvckluZGV4IH0gZnJvbSBcIi4vdmVjdG9ySW5kZXhGYWN0b3J5XCI7XG5cbmV4cG9ydCBjbGFzcyBJbmRleGVyIHtcbiAgcHJpdmF0ZSBtZXRhZGF0YVN0b3JlOiBNZXRhZGF0YVN0b3JlO1xuICBwcml2YXRlIHZlY3RvclN0b3JlOiBWZWN0b3JJbmRleDtcbiAgcHJpdmF0ZSBlbWJlZGRpbmdHZW5lcmF0b3I6IEVtYmVkZGluZ0dlbmVyYXRvcjtcbiAgcHJpdmF0ZSBjb25maWc6IEluZGV4aW5nQ29uZmlnO1xuICBwcml2YXRlIGluZGV4U2lnbmF0dXJlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBJbmRleGluZ0NvbmZpZykge1xuICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgIHRoaXMuaW5kZXhTaWduYXR1cmUgPSB0aGlzLmdlbmVyYXRlSW5kZXhTaWduYXR1cmUoKTtcbiAgICB0aGlzLm1ldGFkYXRhU3RvcmUgPSBuZXcgTWV0YWRhdGFTdG9yZShjb25maWcubWV0YVN0b3JlUGF0aCwgdGhpcy5pbmRleFNpZ25hdHVyZSk7XG4gICAgdGhpcy52ZWN0b3JTdG9yZSA9IGNyZWF0ZVZlY3RvckluZGV4KGNvbmZpZywgdGhpcy5pbmRleFNpZ25hdHVyZSk7XG4gICAgXG4gICAgY29uc3QgZW1iZWRkaW5nQ29uZmlnOiBFbWJlZGRpbmdDb25maWcgPSB7XG4gICAgICBwcm92aWRlcjogY29uZmlnLmVtYmVkZGluZ1Byb3ZpZGVyLFxuICAgICAgbW9kZWw6IGNvbmZpZy5lbWJlZGRpbmdNb2RlbCxcbiAgICAgIGFwaUtleTogY29uZmlnLmVtYmVkZGluZ0FwaUtleSxcbiAgICAgIGFwaVVybDogY29uZmlnLmVtYmVkZGluZ0FwaVVybCxcbiAgICB9O1xuICAgIFxuICAgIHRoaXMuZW1iZWRkaW5nR2VuZXJhdG9yID0gbmV3IEVtYmVkZGluZ0dlbmVyYXRvcihlbWJlZGRpbmdDb25maWcpO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1Q0QwOFx1QUUzMFx1RDY1NCAtIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUJBQThcdUIzNzggXHVCODVDXHVCNERDXG4gICAqL1xuICBhc3luYyBpbml0aWFsaXplKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMuZW1iZWRkaW5nR2VuZXJhdG9yLmluaXRpYWxpemUoKTtcblxuICAgIGNvbnN0IG1ldGFkYXRhU2lnbmF0dXJlID0gdGhpcy5tZXRhZGF0YVN0b3JlLmdldEluZGV4U2lnbmF0dXJlKCk7XG4gICAgY29uc3QgdmVjdG9yU2lnbmF0dXJlID0gdGhpcy52ZWN0b3JTdG9yZS5nZXRJbmRleFNpZ25hdHVyZSgpO1xuXG4gICAgaWYgKFxuICAgICAgbWV0YWRhdGFTaWduYXR1cmUgIT09IHRoaXMuaW5kZXhTaWduYXR1cmUgfHxcbiAgICAgIHZlY3RvclNpZ25hdHVyZSAhPT0gdGhpcy5pbmRleFNpZ25hdHVyZVxuICAgICkge1xuICAgICAgY29uc29sZS5sb2coXCJcdUM3ODRcdUJDQTBcdUI1MjkgXHVCQUE4XHVCMzc4IFx1QkNDMFx1QUNCRCBcdUFDMTBcdUM5QzA6IFx1QUUzMFx1Qzg3NCBcdUM3NzhcdUIzNzFcdUMyQTRcdUI5N0MgXHVDRDA4XHVBRTMwXHVENjU0XHVENTY5XHVCMkM4XHVCMkU0LlwiKTtcbiAgICAgIHRoaXMubWV0YWRhdGFTdG9yZS5yZXNldCh0aGlzLmluZGV4U2lnbmF0dXJlKTtcbiAgICAgIHRoaXMudmVjdG9yU3RvcmUucmVzZXQodGhpcy5pbmRleFNpZ25hdHVyZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFx1QjJFOFx1Qzc3QyBcdUQzMENcdUM3N0MgXHVDNzc4XHVCMzcxXHVDMkYxXG4gICAqL1xuICBhc3luYyBpbmRleEZpbGUoZmlsZVBhdGg6IHN0cmluZywgY29udGVudDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIFx1RDMwQ1x1Qzc3QyBcdUQ1NzRcdUMyREMgXHVBQ0M0XHVDMEIwXG4gICAgICBjb25zdCBoYXNoID0gY29tcHV0ZUhhc2goY29udGVudCk7XG5cbiAgICAgIC8vIFx1QUUzMFx1Qzg3NCBcdUIxNzhcdUQyQjggXHVENjU1XHVDNzc4XG4gICAgICBjb25zdCBleGlzdGluZ05vdGUgPSB0aGlzLm1ldGFkYXRhU3RvcmUuZ2V0Tm90ZUJ5UGF0aChmaWxlUGF0aCk7XG4gICAgICBpZiAoZXhpc3RpbmdOb3RlICYmIGV4aXN0aW5nTm90ZS5oYXNoID09PSBoYXNoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBcdUQzMENcdUM3N0MgXHVCQ0MwXHVBQ0JEIFx1QzVDNlx1Qzc0QywgXHVDMkE0XHVEMEI1OiAke2ZpbGVQYXRofWApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFx1QjlDOFx1RDA2Q1x1QjJFNFx1QzZCNCBcdUQzMENcdUMyRjFcbiAgICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlTWFya2Rvd24oZmlsZVBhdGgsIGNvbnRlbnQpO1xuXG4gICAgICAvLyBcdUIxNzhcdUQyQjggSUQgXHVDMEREXHVDMTMxXG4gICAgICBjb25zdCBub3RlSWQgPSB0aGlzLmdlbmVyYXRlTm90ZUlkKGZpbGVQYXRoKTtcblxuICAgICAgLy8gXHVCQTU0XHVEMEMwXHVCMzcwXHVDNzc0XHVEMTMwIFx1QzgwMFx1QzdBNVxuICAgICAgY29uc3Qgbm90ZU1ldGFkYXRhOiBOb3RlTWV0YWRhdGEgPSB7XG4gICAgICAgIGlkOiBub3RlSWQsXG4gICAgICAgIHBhdGg6IGZpbGVQYXRoLFxuICAgICAgICB0aXRsZTogcGFyc2VkLnRpdGxlLFxuICAgICAgICB0YWdzOiBwYXJzZWQudGFncyxcbiAgICAgICAgbGlua3M6IHBhcnNlZC5saW5rcyxcbiAgICAgICAgZnJvbnRtYXR0ZXI6IHBhcnNlZC5mcm9udG1hdHRlcixcbiAgICAgICAgdXBkYXRlZEF0OiBEYXRlLm5vdygpLFxuICAgICAgICBoYXNoLFxuICAgICAgfTtcblxuICAgICAgdGhpcy5tZXRhZGF0YVN0b3JlLnVwc2VydE5vdGUobm90ZU1ldGFkYXRhKTtcblxuICAgICAgLy8gXHVBRTMwXHVDODc0IFx1Q0NBRFx1RDA2QyBcdUMwQURcdUM4MUNcbiAgICAgIGlmIChleGlzdGluZ05vdGUpIHtcbiAgICAgICAgY29uc3Qgb2xkQ2h1bmtzID0gdGhpcy5tZXRhZGF0YVN0b3JlLmdldENodW5rc0J5Tm90ZUlkKG5vdGVJZCk7XG4gICAgICAgIHRoaXMudmVjdG9yU3RvcmUuZGVsZXRlRW1iZWRkaW5ncyhvbGRDaHVua3MubWFwKChjKSA9PiBjLmlkKSk7XG4gICAgICAgIHRoaXMubWV0YWRhdGFTdG9yZS5kZWxldGVDaHVua3NCeU5vdGVJZChub3RlSWQpO1xuICAgICAgfVxuXG4gICAgICAvLyBcdUNDQURcdUQwQjlcbiAgICAgIGNvbnN0IGNodW5rcyA9IGNodW5rVGV4dChub3RlSWQsIHBhcnNlZC5zZWN0aW9ucywge1xuICAgICAgICBjaHVua1NpemU6IHRoaXMuY29uZmlnLmNodW5rU2l6ZSxcbiAgICAgICAgY2h1bmtPdmVybGFwOiB0aGlzLmNvbmZpZy5jaHVua092ZXJsYXAsXG4gICAgICB9KTtcblxuICAgICAgaWYgKGNodW5rcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY29uc29sZS5sb2coYFx1Q0NBRFx1RDA2QyBcdUM1QzZcdUM3NEM6ICR7ZmlsZVBhdGh9YCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gXHVDQ0FEXHVEMDZDIFx1QzgwMFx1QzdBNVxuICAgICAgdGhpcy5tZXRhZGF0YVN0b3JlLmluc2VydENodW5rcyhjaHVua3MpO1xuXG4gICAgICAvLyBcdUM3ODRcdUJDQTBcdUI1MjkgXHVDMEREXHVDMTMxIFx1QkMwRiBcdUM4MDBcdUM3QTVcbiAgICAgIGNvbnNvbGUubG9nKGBcdUM3ODRcdUJDQTBcdUI1MjkgXHVDMEREXHVDMTMxIFx1QzkxMTogJHtmaWxlUGF0aH0gKCR7Y2h1bmtzLmxlbmd0aH1cdUFDMUMgXHVDQ0FEXHVEMDZDKWApO1xuICAgICAgZm9yIChjb25zdCBjaHVuayBvZiBjaHVua3MpIHtcbiAgICAgICAgY29uc3QgZW1iZWRkaW5nID0gYXdhaXQgdGhpcy5lbWJlZGRpbmdHZW5lcmF0b3IuZW1iZWQoY2h1bmsudGV4dCk7XG4gICAgICAgIHRoaXMudmVjdG9yU3RvcmUuc3RvcmVFbWJlZGRpbmcoY2h1bmsuaWQsIGVtYmVkZGluZyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnNvbGUubG9nKGBcdUM3NzhcdUIzNzFcdUMyRjEgXHVDNjQ0XHVCOENDOiAke2ZpbGVQYXRofWApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBcdUM3NzhcdUIzNzFcdUMyRjEgXHVDMkU0XHVEMzI4OiAke2ZpbGVQYXRofWAsIGVycm9yKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBcdUQzMENcdUM3N0MgXHVDMEFEXHVDODFDIFx1Q0M5OFx1QjlBQ1xuICAgKi9cbiAgZGVsZXRlRmlsZShmaWxlUGF0aDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3Qgbm90ZSA9IHRoaXMubWV0YWRhdGFTdG9yZS5nZXROb3RlQnlQYXRoKGZpbGVQYXRoKTtcbiAgICBpZiAoIW5vdGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjaHVua3MgPSB0aGlzLm1ldGFkYXRhU3RvcmUuZ2V0Q2h1bmtzQnlOb3RlSWQobm90ZS5pZCk7XG4gICAgdGhpcy52ZWN0b3JTdG9yZS5kZWxldGVFbWJlZGRpbmdzKGNodW5rcy5tYXAoKGMpID0+IGMuaWQpKTtcbiAgICB0aGlzLm1ldGFkYXRhU3RvcmUuZGVsZXRlQ2h1bmtzQnlOb3RlSWQobm90ZS5pZCk7XG4gICAgdGhpcy5tZXRhZGF0YVN0b3JlLmRlbGV0ZU5vdGUobm90ZS5pZCk7XG5cbiAgICBjb25zb2xlLmxvZyhgXHVEMzBDXHVDNzdDIFx1QzBBRFx1QzgxQyBcdUM2NDRcdUI4Q0M6ICR7ZmlsZVBhdGh9YCk7XG4gIH1cblxuICAvKipcbiAgICogXHVBQzgwXHVDMEM5XG4gICAqL1xuICBhc3luYyBzZWFyY2gocXVlcnk6IHN0cmluZywgaz86IG51bWJlcik6IFByb21pc2U8QXJyYXk8eyBjaHVuazogQ2h1bms7IHNjb3JlOiBudW1iZXIgfT4+IHtcbiAgICBjb25zdCB0b3BLID0gayB8fCB0aGlzLmNvbmZpZy50b3BLO1xuXG4gICAgLy8gXHVDRkZDXHVCOUFDIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUMwRERcdUMxMzFcbiAgICBjb25zdCBxdWVyeUVtYmVkZGluZyA9IGF3YWl0IHRoaXMuZW1iZWRkaW5nR2VuZXJhdG9yLmVtYmVkKHF1ZXJ5KTtcblxuICAgIGNvbnN0IGN1cnJlbnREaW1lbnNpb24gPSB0aGlzLnZlY3RvclN0b3JlLmdldERpbWVuc2lvbigpO1xuICAgIGlmIChjdXJyZW50RGltZW5zaW9uICE9PSBudWxsICYmIHF1ZXJ5RW1iZWRkaW5nLmxlbmd0aCAhPT0gY3VycmVudERpbWVuc2lvbikge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBgXHVDRkZDXHVCOUFDIFx1Q0MyOFx1QzZEMCgke3F1ZXJ5RW1iZWRkaW5nLmxlbmd0aH0pXHVBQ0ZDIFx1Qzc3OFx1QjM3MVx1QzJBNCBcdUNDMjhcdUM2RDAoJHtjdXJyZW50RGltZW5zaW9ufSlcdUM3NzQgXHVCMkVDXHVCNzdDIFx1QUM4MFx1QzBDOVx1Qzc0NCBcdUFDNzRcdUIxMDhcdUI3MDFcdUIyQzhcdUIyRTQuYFxuICAgICAgKTtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICAvLyBcdUJDQTFcdUQxMzAgXHVBQzgwXHVDMEM5XG4gICAgY29uc3QgcmVzdWx0cyA9IHRoaXMudmVjdG9yU3RvcmUuc2VhcmNoKHF1ZXJ5RW1iZWRkaW5nLCB0b3BLKTtcblxuICAgIC8vIFx1Q0NBRFx1RDA2QyBcdUM4MTVcdUJDRjQgXHVDRDk0XHVBQzAwXG4gICAgY29uc3Qgc2VhcmNoUmVzdWx0cyA9IHJlc3VsdHNcbiAgICAgIC5tYXAoKHJlc3VsdCkgPT4ge1xuICAgICAgICBjb25zdCBjaHVuayA9IHRoaXMubWV0YWRhdGFTdG9yZS5nZXRDaHVua0J5SWQocmVzdWx0LmNodW5rSWQpO1xuICAgICAgICBpZiAoIWNodW5rKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBjaHVuayxcbiAgICAgICAgICBzY29yZTogcmVzdWx0LnNjb3JlLFxuICAgICAgICB9O1xuICAgICAgfSlcbiAgICAgIC5maWx0ZXIoKHIpID0+IHIgIT09IG51bGwpIGFzIEFycmF5PHsgY2h1bms6IENodW5rOyBzY29yZTogbnVtYmVyIH0+O1xuXG4gICAgcmV0dXJuIHNlYXJjaFJlc3VsdHM7XG4gIH1cblxuICAvKipcbiAgICogXHVBQzgwXHVDMEM5IFx1QUNCMFx1QUNGQ1x1QzVEMCBcdUIxNzhcdUQyQjggXHVCQTU0XHVEMEMwXHVCMzcwXHVDNzc0XHVEMTMwIFx1Q0Q5NFx1QUMwMFxuICAgKi9cbiAgZ2V0U2VhcmNoUmVzdWx0c1dpdGhNZXRhZGF0YShcbiAgICBzZWFyY2hSZXN1bHRzOiBBcnJheTx7IGNodW5rOiBDaHVuazsgc2NvcmU6IG51bWJlciB9PlxuICApOiBBcnJheTx7XG4gICAgY2h1bms6IENodW5rO1xuICAgIG5vdGU6IE5vdGVNZXRhZGF0YTtcbiAgICBzY29yZTogbnVtYmVyO1xuICB9PiB7XG4gICAgcmV0dXJuIHNlYXJjaFJlc3VsdHNcbiAgICAgIC5tYXAoKHJlc3VsdCkgPT4ge1xuICAgICAgICBjb25zdCBub3RlID0gdGhpcy5tZXRhZGF0YVN0b3JlLmdldE5vdGVCeUlkKHJlc3VsdC5jaHVuay5ub3RlSWQpO1xuICAgICAgICBpZiAoIW5vdGUpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGNodW5rOiByZXN1bHQuY2h1bmssXG4gICAgICAgICAgbm90ZSxcbiAgICAgICAgICBzY29yZTogcmVzdWx0LnNjb3JlLFxuICAgICAgICB9O1xuICAgICAgfSlcbiAgICAgIC5maWx0ZXIoKHIpID0+IHIgIT09IG51bGwpIGFzIEFycmF5PHtcbiAgICAgIGNodW5rOiBDaHVuaztcbiAgICAgIG5vdGU6IE5vdGVNZXRhZGF0YTtcbiAgICAgIHNjb3JlOiBudW1iZXI7XG4gICAgfT47XG4gIH1cblxuICAvKipcbiAgICogXHVCMTc4XHVEMkI4IElEIFx1QzBERFx1QzEzMVxuICAgKi9cbiAgcHJpdmF0ZSBnZW5lcmF0ZU5vdGVJZChmaWxlUGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gY3JlYXRlSGFzaChcInNoYTI1NlwiKS51cGRhdGUoZmlsZVBhdGgpLmRpZ2VzdChcImhleFwiKS5zdWJzdHJpbmcoMCwgMTYpO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1Qzc3OFx1QjM3MVx1QzJBNCBcdUMyRENcdUFERjhcdUIyQzhcdUNDOTggXHVDMEREXHVDMTMxXG4gICAqL1xuICBwcml2YXRlIGdlbmVyYXRlSW5kZXhTaWduYXR1cmUoKTogc3RyaW5nIHtcbiAgICBjb25zdCBzb3VyY2UgPSBbXG4gICAgICB0aGlzLmNvbmZpZy5lbWJlZGRpbmdQcm92aWRlcixcbiAgICAgIHRoaXMuY29uZmlnLmVtYmVkZGluZ01vZGVsLFxuICAgICAgdGhpcy5jb25maWcuZW1iZWRkaW5nQXBpVXJsIHx8IFwiXCIsXG4gICAgXS5qb2luKFwiOjpcIik7XG5cbiAgICByZXR1cm4gY3JlYXRlSGFzaChcInNoYTI1NlwiKS51cGRhdGUoc291cmNlKS5kaWdlc3QoXCJoZXhcIikuc3Vic3RyaW5nKDAsIDE2KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUI5QUNcdUMxOENcdUMyQTQgXHVENTc0XHVDODFDXG4gICAqL1xuICBjbG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLm1ldGFkYXRhU3RvcmUuY2xvc2UoKTtcbiAgICB0aGlzLnZlY3RvclN0b3JlLmNsb3NlKCk7XG4gIH1cbn1cbiIsICIvLyBcdUJDQTFcdUQxMzAgXHVDMkE0XHVEMUEwXHVDNUI0IC0gXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzgwMFx1QzdBNSBcdUJDMEYgXHVDNzIwXHVDMEFDXHVCM0M0IFx1QUM4MFx1QzBDOVxuXG5pbXBvcnQgeyBleGlzdHNTeW5jLCBta2RpclN5bmMsIHJlYWRGaWxlU3luYywgd3JpdGVGaWxlU3luYywgcmVuYW1lU3luYyB9IGZyb20gXCJmc1wiO1xuaW1wb3J0IHsgZGlybmFtZSB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBWZWN0b3JTdG9yZURhdGEgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgVmVjdG9ySW5kZXggfSBmcm9tIFwiLi92ZWN0b3JJbmRleFwiO1xuXG5leHBvcnQgY2xhc3MgVmVjdG9yU3RvcmUgaW1wbGVtZW50cyBWZWN0b3JJbmRleCB7XG4gIHByaXZhdGUgcmVhZG9ubHkgc3RvcmVQYXRoOiBzdHJpbmc7XG4gIHByaXZhdGUgZGF0YTogVmVjdG9yU3RvcmVEYXRhO1xuXG4gIGNvbnN0cnVjdG9yKHN0b3JlUGF0aDogc3RyaW5nLCBpbmRleFNpZ25hdHVyZTogc3RyaW5nKSB7XG4gICAgdGhpcy5zdG9yZVBhdGggPSBzdG9yZVBhdGg7XG4gICAgdGhpcy5kYXRhID0gdGhpcy5sb2FkRGF0YShpbmRleFNpZ25hdHVyZSk7XG4gIH1cblxuICAvKipcbiAgICogXHVDODAwXHVDN0E1XHVDMThDIFx1QjM3MFx1Qzc3NFx1RDEzMCBcdUI4NUNcdUI0RENcbiAgICovXG4gIHByaXZhdGUgbG9hZERhdGEoaW5kZXhTaWduYXR1cmU6IHN0cmluZyk6IFZlY3RvclN0b3JlRGF0YSB7XG4gICAgaWYgKCFleGlzdHNTeW5jKHRoaXMuc3RvcmVQYXRoKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaW5kZXhTaWduYXR1cmUsXG4gICAgICAgIGRpbWVuc2lvbjogbnVsbCxcbiAgICAgICAgdXBkYXRlZEF0OiBEYXRlLm5vdygpLFxuICAgICAgICBlbWJlZGRpbmdzOiB7fSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJhdyA9IHJlYWRGaWxlU3luYyh0aGlzLnN0b3JlUGF0aCwgXCJ1dGYtOFwiKTtcbiAgICAgIGNvbnN0IHBhcnNlZCA9IEpTT04ucGFyc2UocmF3KSBhcyBQYXJ0aWFsPFZlY3RvclN0b3JlRGF0YT47XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpbmRleFNpZ25hdHVyZTogcGFyc2VkLmluZGV4U2lnbmF0dXJlIHx8IGluZGV4U2lnbmF0dXJlLFxuICAgICAgICBkaW1lbnNpb246IHR5cGVvZiBwYXJzZWQuZGltZW5zaW9uID09PSBcIm51bWJlclwiID8gcGFyc2VkLmRpbWVuc2lvbiA6IG51bGwsXG4gICAgICAgIHVwZGF0ZWRBdDogdHlwZW9mIHBhcnNlZC51cGRhdGVkQXQgPT09IFwibnVtYmVyXCIgPyBwYXJzZWQudXBkYXRlZEF0IDogRGF0ZS5ub3coKSxcbiAgICAgICAgZW1iZWRkaW5nczogcGFyc2VkLmVtYmVkZGluZ3MgfHwge30sXG4gICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJcdUJDQTFcdUQxMzAgXHVDODAwXHVDN0E1XHVDMThDIFx1Qjg1Q1x1QjREQyBcdUMyRTRcdUQzMjgsIFx1QzBDOFx1Qjg1QyBcdUNEMDhcdUFFMzBcdUQ2NTRcdUQ1NjlcdUIyQzhcdUIyRTQ6XCIsIGVycm9yKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGluZGV4U2lnbmF0dXJlLFxuICAgICAgICBkaW1lbnNpb246IG51bGwsXG4gICAgICAgIHVwZGF0ZWRBdDogRGF0ZS5ub3coKSxcbiAgICAgICAgZW1iZWRkaW5nczoge30sXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBcdUM4MDBcdUM3QTVcdUMxOEMgXHVCMzcwXHVDNzc0XHVEMTMwIFx1QzgwMFx1QzdBNSAoXHVDNkQwXHVDNzkwXHVDODAxIFx1QzRGMFx1QUUzMClcbiAgICovXG4gIHByaXZhdGUgcGVyc2lzdCgpOiB2b2lkIHtcbiAgICBta2RpclN5bmMoZGlybmFtZSh0aGlzLnN0b3JlUGF0aCksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgIHRoaXMuZGF0YS51cGRhdGVkQXQgPSBEYXRlLm5vdygpO1xuXG4gICAgY29uc3QgdGVtcFBhdGggPSBgJHt0aGlzLnN0b3JlUGF0aH0udG1wYDtcbiAgICB3cml0ZUZpbGVTeW5jKHRlbXBQYXRoLCBKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGEpLCBcInV0Zi04XCIpO1xuICAgIHJlbmFtZVN5bmModGVtcFBhdGgsIHRoaXMuc3RvcmVQYXRoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUM3NzhcdUIzNzFcdUMyQTQgXHVDMkRDXHVBREY4XHVCMkM4XHVDQzk4IFx1Qzg3MFx1RDY4Q1xuICAgKi9cbiAgZ2V0SW5kZXhTaWduYXR1cmUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhLmluZGV4U2lnbmF0dXJlO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1QkNBMVx1RDEzMCBcdUNDMjhcdUM2RDAgXHVDODcwXHVENjhDXG4gICAqL1xuICBnZXREaW1lbnNpb24oKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YS5kaW1lbnNpb247XG4gIH1cblxuICAvKipcbiAgICogXHVDODAwXHVDN0E1XHVDMThDIFx1Q0QwOFx1QUUzMFx1RDY1NFxuICAgKi9cbiAgcmVzZXQoaW5kZXhTaWduYXR1cmU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuZGF0YSA9IHtcbiAgICAgIGluZGV4U2lnbmF0dXJlLFxuICAgICAgZGltZW5zaW9uOiBudWxsLFxuICAgICAgdXBkYXRlZEF0OiBEYXRlLm5vdygpLFxuICAgICAgZW1iZWRkaW5nczoge30sXG4gICAgfTtcbiAgICB0aGlzLnBlcnNpc3QoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUM3ODRcdUJDQTBcdUI1MjkgXHVDODAwXHVDN0E1XG4gICAqL1xuICBzdG9yZUVtYmVkZGluZyhjaHVua0lkOiBzdHJpbmcsIGVtYmVkZGluZzogbnVtYmVyW10pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kYXRhLmRpbWVuc2lvbiA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5kYXRhLmRpbWVuc2lvbiA9IGVtYmVkZGluZy5sZW5ndGg7XG4gICAgfVxuXG4gICAgaWYgKGVtYmVkZGluZy5sZW5ndGggIT09IHRoaXMuZGF0YS5kaW1lbnNpb24pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUNDMjhcdUM2RDAgXHVCRDg4XHVDNzdDXHVDRTU4OiBleHBlY3RlZD0ke3RoaXMuZGF0YS5kaW1lbnNpb259LCBhY3R1YWw9JHtlbWJlZGRpbmcubGVuZ3RofWBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy5kYXRhLmVtYmVkZGluZ3NbY2h1bmtJZF0gPSBlbWJlZGRpbmc7XG4gICAgdGhpcy5wZXJzaXN0KCk7XG4gIH1cblxuICAvKipcbiAgICogXHVDNUVDXHVCN0VDIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUM3N0NcdUFEMDQgXHVDODAwXHVDN0E1XG4gICAqL1xuICBzdG9yZUVtYmVkZGluZ3MoZW1iZWRkaW5nczogTWFwPHN0cmluZywgbnVtYmVyW10+KTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBbY2h1bmtJZCwgZW1iZWRkaW5nXSBvZiBlbWJlZGRpbmdzLmVudHJpZXMoKSkge1xuICAgICAgaWYgKHRoaXMuZGF0YS5kaW1lbnNpb24gPT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5kYXRhLmRpbWVuc2lvbiA9IGVtYmVkZGluZy5sZW5ndGg7XG4gICAgICB9XG5cbiAgICAgIGlmIChlbWJlZGRpbmcubGVuZ3RoICE9PSB0aGlzLmRhdGEuZGltZW5zaW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgXHVDNzg0XHVCQ0EwXHVCNTI5IFx1Q0MyOFx1QzZEMCBcdUJEODhcdUM3N0NcdUNFNTg6IGV4cGVjdGVkPSR7dGhpcy5kYXRhLmRpbWVuc2lvbn0sIGFjdHVhbD0ke2VtYmVkZGluZy5sZW5ndGh9YFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmRhdGEuZW1iZWRkaW5nc1tjaHVua0lkXSA9IGVtYmVkZGluZztcbiAgICB9XG5cbiAgICB0aGlzLnBlcnNpc3QoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUM3ODRcdUJDQTBcdUI1MjkgXHVDODcwXHVENjhDXG4gICAqL1xuICBnZXRFbWJlZGRpbmcoY2h1bmtJZDogc3RyaW5nKTogbnVtYmVyW10gfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhLmVtYmVkZGluZ3NbY2h1bmtJZF0gfHwgbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUJBQThcdUI0RTAgXHVDNzg0XHVCQ0EwXHVCNTI5IFx1Qzg3MFx1RDY4Q1xuICAgKi9cbiAgZ2V0QWxsRW1iZWRkaW5ncygpOiBNYXA8c3RyaW5nLCBudW1iZXJbXT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBNYXA8c3RyaW5nLCBudW1iZXJbXT4oKTtcblxuICAgIGZvciAoY29uc3QgW2NodW5rSWQsIGVtYmVkZGluZ10gb2YgT2JqZWN0LmVudHJpZXModGhpcy5kYXRhLmVtYmVkZGluZ3MpKSB7XG4gICAgICByZXN1bHQuc2V0KGNodW5rSWQsIGVtYmVkZGluZyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUNDQURcdUQwNkNcdUM3NTggXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzBBRFx1QzgxQ1xuICAgKi9cbiAgZGVsZXRlRW1iZWRkaW5nKGNodW5rSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGRlbGV0ZSB0aGlzLmRhdGEuZW1iZWRkaW5nc1tjaHVua0lkXTtcblxuICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLmRhdGEuZW1iZWRkaW5ncykubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLmRhdGEuZGltZW5zaW9uID0gbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLnBlcnNpc3QoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUM1RUNcdUI3RUMgXHVDQ0FEXHVEMDZDXHVDNzU4IFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUMwQURcdUM4MUNcbiAgICovXG4gIGRlbGV0ZUVtYmVkZGluZ3MoY2h1bmtJZHM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgaWYgKGNodW5rSWRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgY2h1bmtJZCBvZiBjaHVua0lkcykge1xuICAgICAgZGVsZXRlIHRoaXMuZGF0YS5lbWJlZGRpbmdzW2NodW5rSWRdO1xuICAgIH1cblxuICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLmRhdGEuZW1iZWRkaW5ncykubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLmRhdGEuZGltZW5zaW9uID0gbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLnBlcnNpc3QoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUNGNTRcdUMwQUNcdUM3NzggXHVDNzIwXHVDMEFDXHVCM0M0IFx1QUNDNFx1QzBCMFxuICAgKi9cbiAgcHJpdmF0ZSBjb3NpbmVTaW1pbGFyaXR5KGE6IG51bWJlcltdLCBiOiBudW1iZXJbXSk6IG51bWJlciB7XG4gICAgaWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXHVCQ0ExXHVEMTMwIFx1QUUzOFx1Qzc3NFx1QUMwMCBcdUM3N0NcdUNFNThcdUQ1NThcdUM5QzAgXHVDNTRBXHVDMkI1XHVCMkM4XHVCMkU0XCIpO1xuICAgIH1cblxuICAgIGxldCBkb3RQcm9kdWN0ID0gMDtcbiAgICBsZXQgbm9ybUEgPSAwO1xuICAgIGxldCBub3JtQiA9IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGRvdFByb2R1Y3QgKz0gYVtpXSAqIGJbaV07XG4gICAgICBub3JtQSArPSBhW2ldICogYVtpXTtcbiAgICAgIG5vcm1CICs9IGJbaV0gKiBiW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBkb3RQcm9kdWN0IC8gKE1hdGguc3FydChub3JtQSkgKiBNYXRoLnNxcnQobm9ybUIpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUJDQTFcdUQxMzAgXHVBQzgwXHVDMEM5IC0gVG9wLUsgXHVDNzIwXHVDMEFDIFx1Q0NBRFx1RDA2QyBcdUNDM0VcdUFFMzBcbiAgICogXG4gICAqIFx1Q0MzOFx1QUNFMDogXHVENjA0XHVDN0FDIFx1QUQ2Q1x1RDYwNFx1Qzc0MCBcdUJBQThcdUI0RTAgXHVDNzg0XHVCQ0EwXHVCNTI5XHVDNzQ0IFx1QkE1NFx1QkFBOFx1QjlBQ1x1QzVEMCBcdUI4NUNcdUI0RENcdUQ1NThcdUM1RUMgXHVDMTIwXHVENjE1IFx1QUM4MFx1QzBDOVx1Qzc0NCBcdUMyMThcdUQ1ODlcdUQ1NjlcdUIyQzhcdUIyRTQuXG4gICAqIFx1QjMwMFx1QUREQ1x1QkFBOCBcdUJDRkNcdUQyQjhcdUM3NTggXHVBQ0JEXHVDNkIwIFx1QzEzMVx1QjJBNVx1Qzc3NCBcdUM4MDBcdUQ1NThcdUI0MjAgXHVDMjE4IFx1Qzc4OFx1QzczQ1x1QkE3MCwgXHVCMkU0XHVDNzRDXHVBQ0ZDIFx1QUMxOVx1Qzc0MCBcdUFDMUNcdUMxMjBcdUM3NzQgXHVBRDhDXHVDN0E1XHVCNDI5XHVCMkM4XHVCMkU0OlxuICAgKiAtIEFOTihBcHByb3hpbWF0ZSBOZWFyZXN0IE5laWdoYm9yKSBcdUM1NENcdUFDRTBcdUI5QUNcdUM5OTggXHVDMEFDXHVDNkE5IChGQUlTUywgSE5TVyBcdUI0RjEpXG4gICAqIC0gXHVDODA0XHVDNkE5IFx1QkNBMVx1RDEzMCBcdUIzNzBcdUM3NzRcdUQxMzBcdUJDQTBcdUM3NzRcdUMyQTQgXHVDMEFDXHVDNkE5IChDaHJvbWEsIFFkcmFudCBcdUI0RjEpXG4gICAqIC0gXHVDOTlEXHVCRDg0IFx1QUM4MFx1QzBDOSBcdUI2MTBcdUIyOTQgXHVDNzc4XHVCMzcxXHVDMkE0IFx1Q0U5MFx1QzJGMVxuICAgKi9cbiAgc2VhcmNoKHF1ZXJ5RW1iZWRkaW5nOiBudW1iZXJbXSwgazogbnVtYmVyID0gOCk6IEFycmF5PHsgY2h1bmtJZDogc3RyaW5nOyBzY29yZTogbnVtYmVyIH0+IHtcbiAgICBjb25zdCBhbGxFbWJlZGRpbmdzID0gdGhpcy5nZXRBbGxFbWJlZGRpbmdzKCk7XG4gICAgY29uc3Qgc2NvcmVzOiBBcnJheTx7IGNodW5rSWQ6IHN0cmluZzsgc2NvcmU6IG51bWJlciB9PiA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBbY2h1bmtJZCwgZW1iZWRkaW5nXSBvZiBhbGxFbWJlZGRpbmdzLmVudHJpZXMoKSkge1xuICAgICAgY29uc3Qgc2NvcmUgPSB0aGlzLmNvc2luZVNpbWlsYXJpdHkocXVlcnlFbWJlZGRpbmcsIGVtYmVkZGluZyk7XG4gICAgICBzY29yZXMucHVzaCh7IGNodW5rSWQsIHNjb3JlIH0pO1xuICAgIH1cblxuICAgIC8vIFx1QzgxMFx1QzIxOCBcdUFFMzBcdUM5MDAgXHVCMEI0XHVCOUJDXHVDQzI4XHVDMjFDIFx1QzgxNVx1QjgyQyBcdUQ2QzQgXHVDMEMxXHVDNzA0IEtcdUFDMUMgXHVCQzE4XHVENjU4XG4gICAgc2NvcmVzLnNvcnQoKGEsIGIpID0+IGIuc2NvcmUgLSBhLnNjb3JlKTtcbiAgICByZXR1cm4gc2NvcmVzLnNsaWNlKDAsIGspO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1QjM3MFx1Qzc3NFx1RDEzMFx1QkNBMFx1Qzc3NFx1QzJBNCBcdUIyRUJcdUFFMzBcbiAgICovXG4gIGNsb3NlKCk6IHZvaWQge1xuICAgIC8vIFx1RDMwQ1x1Qzc3QyBcdUFFMzBcdUJDMTggXHVDODAwXHVDN0E1XHVDMThDXHVCMjk0IGNsb3NlIFx1QjNEOVx1Qzc5MVx1Qzc3NCBcdUQ1NDRcdUM2OTRcdUQ1NThcdUM5QzAgXHVDNTRBXHVDMkI1XHVCMkM4XHVCMkU0LlxuICB9XG59XG4iLCAiLy8gXHVCQ0ExXHVEMTMwIFx1Qzc3OFx1QjM3MVx1QzJBNCBcdUMwRERcdUMxMzEgXHVEMzI5XHVEMUEwXHVCOUFDXG5cbmltcG9ydCB7IEluZGV4aW5nQ29uZmlnIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IFZlY3RvclN0b3JlIH0gZnJvbSBcIi4vdmVjdG9yU3RvcmVcIjtcbmltcG9ydCB7IFZlY3RvckluZGV4IH0gZnJvbSBcIi4vdmVjdG9ySW5kZXhcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVZlY3RvckluZGV4KGNvbmZpZzogSW5kZXhpbmdDb25maWcsIGluZGV4U2lnbmF0dXJlOiBzdHJpbmcpOiBWZWN0b3JJbmRleCB7XG4gIGNvbnN0IGVuZ2luZSA9IGNvbmZpZy52ZWN0b3JJbmRleEVuZ2luZSB8fCBcImpzb25cIjtcblxuICBpZiAoZW5naW5lID09PSBcImpzb25cIikge1xuICAgIHJldHVybiBuZXcgVmVjdG9yU3RvcmUoY29uZmlnLnZlY3RvclN0b3JlUGF0aCwgaW5kZXhTaWduYXR1cmUpO1xuICB9XG5cbiAgdGhyb3cgbmV3IEVycm9yKGBcdUM1NDRcdUM5QzEgXHVDOUMwXHVDNkQwXHVENTU4XHVDOUMwIFx1QzU0QVx1QjI5NCBcdUJDQTFcdUQxMzAgXHVDNzc4XHVCMzcxXHVDMkE0IFx1QzVENFx1QzlDNFx1Qzc4NVx1QjJDOFx1QjJFNDogJHtlbmdpbmV9YCk7XG59XG4iLCAiLy8gT2JzaWRpYW4gXHVCQ0ZDXHVEMkI4IFx1RDMwQ1x1Qzc3QyBcdUJDQzBcdUFDQkQgXHVBQzEwXHVDOUMwIFx1QkMwRiBcdUM3OTBcdUIzRDkgXHVDNzc4XHVCMzcxXHVDMkYxXG5cbmltcG9ydCB7IFRGaWxlLCBWYXVsdCwgTm90aWNlIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyBJbmRleGVyIH0gZnJvbSBcIi4vaW5kZXhpbmcvaW5kZXhlclwiO1xuXG5leHBvcnQgY2xhc3MgVmF1bHRXYXRjaGVyIHtcbiAgcHJpdmF0ZSB2YXVsdDogVmF1bHQ7XG4gIHByaXZhdGUgaW5kZXhlcjogSW5kZXhlciB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGlzSW5kZXhpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBpbmRleFF1ZXVlOiBTZXQ8c3RyaW5nPiA9IG5ldyBTZXQoKTtcbiAgcHJpdmF0ZSBpbmRleGluZ0luUHJvZ3Jlc3M6IFNldDxzdHJpbmc+ID0gbmV3IFNldCgpOyAvLyBcdUM5QzRcdUQ1ODkgXHVDOTExXHVDNzc4IFx1Qzc3OFx1QjM3MVx1QzJGMSBcdUNEOTRcdUM4MDFcblxuICBjb25zdHJ1Y3Rvcih2YXVsdDogVmF1bHQpIHtcbiAgICB0aGlzLnZhdWx0ID0gdmF1bHQ7XG4gIH1cblxuICAvKipcbiAgICogXHVDNzc4XHVCMzcxXHVDMTFDIFx1QzEyNFx1QzgxNVxuICAgKi9cbiAgc2V0SW5kZXhlcihpbmRleGVyOiBJbmRleGVyIHwgbnVsbCk6IHZvaWQge1xuICAgIHRoaXMuaW5kZXhlciA9IGluZGV4ZXI7XG4gIH1cblxuICAvKipcbiAgICogXHVDRDA4XHVBRTMwIFx1Qzc3OFx1QjM3MVx1QzJGMSBcdUMyRTRcdUQ1ODlcbiAgICovXG4gIGFzeW5jIGluZGV4VmF1bHQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCF0aGlzLmluZGV4ZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlx1Qzc3OFx1QjM3MVx1QzExQ1x1QUMwMCBcdUNEMDhcdUFFMzBcdUQ2NTRcdUI0MThcdUM5QzAgXHVDNTRBXHVDNTU4XHVDMkI1XHVCMkM4XHVCMkU0XCIpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzSW5kZXhpbmcpIHtcbiAgICAgIG5ldyBOb3RpY2UoXCJcdUM3NzRcdUJCRjggXHVDNzc4XHVCMzcxXHVDMkYxXHVDNzc0IFx1QzlDNFx1RDU4OSBcdUM5MTFcdUM3ODVcdUIyQzhcdUIyRTRcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5pc0luZGV4aW5nID0gdHJ1ZTtcbiAgICBuZXcgTm90aWNlKFwiXHVCQ0ZDXHVEMkI4IFx1Qzc3OFx1QjM3MVx1QzJGMVx1Qzc0NCBcdUMyRENcdUM3OTFcdUQ1NjlcdUIyQzhcdUIyRTQuLi5cIik7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgbWRGaWxlcyA9IHRoaXMudmF1bHQuZ2V0TWFya2Rvd25GaWxlcygpO1xuICAgICAgY29uc29sZS5sb2coYFx1Qzc3OFx1QjM3MVx1QzJGMVx1RDU2MCBcdUQzMENcdUM3N0MgXHVDMjE4OiAke21kRmlsZXMubGVuZ3RofWApO1xuXG4gICAgICBsZXQgaW5kZXhlZCA9IDA7XG4gICAgICBsZXQgZmFpbGVkID0gMDtcblxuICAgICAgZm9yIChjb25zdCBmaWxlIG9mIG1kRmlsZXMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgdGhpcy52YXVsdC5yZWFkKGZpbGUpO1xuICAgICAgICAgIGF3YWl0IHRoaXMuaW5kZXhlci5pbmRleEZpbGUoZmlsZS5wYXRoLCBjb250ZW50KTtcbiAgICAgICAgICBpbmRleGVkKys7XG5cbiAgICAgICAgICAvLyBcdUM5QzRcdUQ1ODkgXHVDMEMxXHVENjY5IFx1RDQ1Q1x1QzJEQyAoMTBcdUFDMUNcdUI5QzhcdUIyRTQpXG4gICAgICAgICAgaWYgKGluZGV4ZWQgJSAxMCA9PT0gMCkge1xuICAgICAgICAgICAgbmV3IE5vdGljZShgXHVDNzc4XHVCMzcxXHVDMkYxIFx1QzlDNFx1RDU4OSBcdUM5MTE6ICR7aW5kZXhlZH0vJHttZEZpbGVzLmxlbmd0aH1gKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihgXHVEMzBDXHVDNzdDIFx1Qzc3OFx1QjM3MVx1QzJGMSBcdUMyRTRcdUQzMjg6ICR7ZmlsZS5wYXRofWAsIGVycm9yKTtcbiAgICAgICAgICBmYWlsZWQrKztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBuZXcgTm90aWNlKGBcdUM3NzhcdUIzNzFcdUMyRjEgXHVDNjQ0XHVCOENDOiAke2luZGV4ZWR9XHVBQzFDIFx1QzEzMVx1QUNGNSwgJHtmYWlsZWR9XHVBQzFDIFx1QzJFNFx1RDMyOGApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiXHVCQ0ZDXHVEMkI4IFx1Qzc3OFx1QjM3MVx1QzJGMSBcdUM5MTEgXHVDNjI0XHVCOTU4OlwiLCBlcnJvcik7XG4gICAgICBuZXcgTm90aWNlKFwiXHVDNzc4XHVCMzcxXHVDMkYxIFx1QzkxMSBcdUM2MjRcdUI5NThcdUFDMDAgXHVCQzFDXHVDMEREXHVENTg4XHVDMkI1XHVCMkM4XHVCMkU0XCIpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLmlzSW5kZXhpbmcgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogXHVEMzBDXHVDNzdDIFx1QzBERFx1QzEzMSBcdUM3NzRcdUJDQTRcdUQyQjggXHVDQzk4XHVCOUFDXG4gICAqL1xuICBhc3luYyBvbkZpbGVDcmVhdGUoZmlsZTogVEZpbGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIXRoaXMuaW5kZXhlciB8fCBmaWxlLmV4dGVuc2lvbiAhPT0gXCJtZFwiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCB0aGlzLnZhdWx0LnJlYWQoZmlsZSk7XG4gICAgICBhd2FpdCB0aGlzLmluZGV4ZXIuaW5kZXhGaWxlKGZpbGUucGF0aCwgY29udGVudCk7XG4gICAgICBjb25zb2xlLmxvZyhgXHVEMzBDXHVDNzdDIFx1QzBERFx1QzEzMSBcdUM3NzhcdUIzNzFcdUMyRjE6ICR7ZmlsZS5wYXRofWApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBcdUQzMENcdUM3N0MgXHVDMEREXHVDMTMxIFx1Qzc3OFx1QjM3MVx1QzJGMSBcdUMyRTRcdUQzMjg6ICR7ZmlsZS5wYXRofWAsIGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogXHVEMzBDXHVDNzdDIFx1QzIxOFx1QzgxNSBcdUM3NzRcdUJDQTRcdUQyQjggXHVDQzk4XHVCOUFDXG4gICAqL1xuICBhc3luYyBvbkZpbGVNb2RpZnkoZmlsZTogVEZpbGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIXRoaXMuaW5kZXhlciB8fCBmaWxlLmV4dGVuc2lvbiAhPT0gXCJtZFwiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gXHVDOTExXHVCQ0Y1IFx1Qzc3OFx1QjM3MVx1QzJGMSBcdUJDMjlcdUM5QzBcdUI5N0MgXHVDNzA0XHVENTc0IFx1RDA1MFx1QzVEMCBcdUNEOTRcdUFDMDBcbiAgICB0aGlzLmluZGV4UXVldWUuYWRkKGZpbGUucGF0aCk7XG5cbiAgICAvLyAxMDBtcyBcdUQ2QzRcdUM1RDAgXHVDNzc4XHVCMzcxXHVDMkYxIChcdUM1RjBcdUMxOEQgXHVDMjE4XHVDODE1IFx1QkMyOVx1QzlDMClcbiAgICBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgIGlmICh0aGlzLmluZGV4UXVldWUuaGFzKGZpbGUucGF0aCkgJiYgIXRoaXMuaW5kZXhpbmdJblByb2dyZXNzLmhhcyhmaWxlLnBhdGgpKSB7XG4gICAgICAgIHRoaXMuaW5kZXhRdWV1ZS5kZWxldGUoZmlsZS5wYXRoKTtcbiAgICAgICAgdGhpcy5pbmRleGluZ0luUHJvZ3Jlc3MuYWRkKGZpbGUucGF0aCk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgdGhpcy52YXVsdC5yZWFkKGZpbGUpO1xuICAgICAgICAgIGlmICh0aGlzLmluZGV4ZXIpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuaW5kZXhlci5pbmRleEZpbGUoZmlsZS5wYXRoLCBjb250ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc29sZS5sb2coYFx1RDMwQ1x1Qzc3QyBcdUMyMThcdUM4MTUgXHVDNzc4XHVCMzcxXHVDMkYxOiAke2ZpbGUucGF0aH1gKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGBcdUQzMENcdUM3N0MgXHVDMjE4XHVDODE1IFx1Qzc3OFx1QjM3MVx1QzJGMSBcdUMyRTRcdUQzMjg6ICR7ZmlsZS5wYXRofWAsIGVycm9yKTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICB0aGlzLmluZGV4aW5nSW5Qcm9ncmVzcy5kZWxldGUoZmlsZS5wYXRoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIDEwMCk7XG4gIH1cblxuICAvKipcbiAgICogXHVEMzBDXHVDNzdDIFx1QzBBRFx1QzgxQyBcdUM3NzRcdUJDQTRcdUQyQjggXHVDQzk4XHVCOUFDXG4gICAqL1xuICBvbkZpbGVEZWxldGUoZmlsZTogVEZpbGUpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaW5kZXhlciB8fCBmaWxlLmV4dGVuc2lvbiAhPT0gXCJtZFwiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuaW5kZXhlci5kZWxldGVGaWxlKGZpbGUucGF0aCk7XG4gICAgICBjb25zb2xlLmxvZyhgXHVEMzBDXHVDNzdDIFx1QzBBRFx1QzgxQyBcdUNDOThcdUI5QUM6ICR7ZmlsZS5wYXRofWApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBcdUQzMENcdUM3N0MgXHVDMEFEXHVDODFDIFx1Q0M5OFx1QjlBQyBcdUMyRTRcdUQzMjg6ICR7ZmlsZS5wYXRofWAsIGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogXHVEMzBDXHVDNzdDIFx1Qzc3NFx1Qjk4NCBcdUJDQzBcdUFDQkQgXHVDNzc0XHVCQ0E0XHVEMkI4IFx1Q0M5OFx1QjlBQ1xuICAgKi9cbiAgYXN5bmMgb25GaWxlUmVuYW1lKGZpbGU6IFRGaWxlLCBvbGRQYXRoOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIXRoaXMuaW5kZXhlciB8fCBmaWxlLmV4dGVuc2lvbiAhPT0gXCJtZFwiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIC8vIFx1Qzc3NFx1QzgwNCBcdUQzMENcdUM3N0MgXHVDMEFEXHVDODFDXG4gICAgICB0aGlzLmluZGV4ZXIuZGVsZXRlRmlsZShvbGRQYXRoKTtcblxuICAgICAgLy8gXHVDMEM4IFx1RDMwQ1x1Qzc3QyBcdUM3NzhcdUIzNzFcdUMyRjFcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCB0aGlzLnZhdWx0LnJlYWQoZmlsZSk7XG4gICAgICBpZiAodGhpcy5pbmRleGVyKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuaW5kZXhlci5pbmRleEZpbGUoZmlsZS5wYXRoLCBjb250ZW50KTtcbiAgICAgIH1cblxuICAgICAgY29uc29sZS5sb2coYFx1RDMwQ1x1Qzc3QyBcdUM3NzRcdUI5ODQgXHVCQ0MwXHVBQ0JEIFx1Q0M5OFx1QjlBQzogJHtvbGRQYXRofSAtPiAke2ZpbGUucGF0aH1gKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihgXHVEMzBDXHVDNzdDIFx1Qzc3NFx1Qjk4NCBcdUJDQzBcdUFDQkQgXHVDQzk4XHVCOUFDIFx1QzJFNFx1RDMyODogJHtvbGRQYXRofSAtPiAke2ZpbGUucGF0aH1gLCBlcnJvcik7XG4gICAgfVxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdPLFNBQVMsaUJBQWlCLEtBQVUsVUFBbUM7QUFIOUU7QUFJRSxR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IiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgIm9wdGlvbnMiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAib3B0aW9ucyIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJvcHRpb25zIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgIm9wdGlvbnMiLCAic3RyIiwgInN0cmluZyIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJyZXF1aXJlX2pzX3lhbWwiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAieWFtbCIsICJvcHRpb25zIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgInN0ciIsICJleHBvcnRzIiwgInN0ciIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJlbmdpbmVzIiwgIm9wdGlvbnMiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAib3B0aW9ucyIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJvcHRpb25zIiwgInN0ciIsICJtYXR0ZXIiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAib3B0aW9ucyIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJvcHRpb25zIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgInN0ciIsICJvcHRpb25zIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImVuZ2luZXMiLCAicGFyc2UiLCAibWF0dGVyIiwgIm9wdGlvbnMiLCAic3RyIiwgImltcG9ydF9vYnNpZGlhbiIsICJpbXBvcnRfb2JzaWRpYW4iLCAib3B0aW9ucyIsICJ0ZXh0IiwgIl9hIiwgImltcG9ydF9vYnNpZGlhbiIsICJpbXBvcnRfb2JzaWRpYW4iLCAib3B0aW9ucyIsICJfYSIsICJpbXBvcnRfb2JzaWRpYW4iLCAiU2NoZW1hVHlwZSIsICJFeGVjdXRhYmxlQ29kZUxhbmd1YWdlIiwgIk91dGNvbWUiLCAiSGFybUNhdGVnb3J5IiwgIkhhcm1CbG9ja1RocmVzaG9sZCIsICJIYXJtUHJvYmFiaWxpdHkiLCAiQmxvY2tSZWFzb24iLCAiRmluaXNoUmVhc29uIiwgIlRhc2tUeXBlIiwgIkZ1bmN0aW9uQ2FsbGluZ01vZGUiLCAiRHluYW1pY1JldHJpZXZhbE1vZGUiLCAiVGFzayIsICJfYSIsICJhcHBlbmRFbWJlZGRpbmdMb2ciLCAiaW1wb3J0X29ic2lkaWFuIiwgImVuc3VyZUZvbGRlckV4aXN0cyIsICJlbnN1cmVVbmlxdWVQYXRoIiwgImltcG9ydF9vYnNpZGlhbiIsICJFbWJlZGRpbmdHZW5lcmF0b3IiLCAibW9kdWxlIiwgIm1hdHRlciIsICJvcHRpb25zIiwgImNodW5rVGV4dCIsICJpbXBvcnRfY3J5cHRvIiwgImltcG9ydF9mcyIsICJpbXBvcnRfcGF0aCIsICJFbWJlZGRpbmdHZW5lcmF0b3IiLCAiaW1wb3J0X29ic2lkaWFuIiwgImltcG9ydF9wYXRoIl0KfQo=
