"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/logging.ts
var import_obsidian3 = require("obsidian");
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
    if (!this.model) {
      throw new Error("Gemini API\uAC00 \uCD08\uAE30\uD654\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4");
    }
    let embedding;
    if (this.cache.has(text)) {
      embedding = this.cache.get(text);
    } else {
      try {
        const result = await this.model.embedContent(text);
        embedding = result.embedding.values;
        this.cache.set(text, embedding);
      } catch (error) {
        console.error("\uC784\uBCA0\uB529 \uC0DD\uC131 \uC2E4\uD328:", error);
        throw new Error(`\uC784\uBCA0\uB529 \uC0DD\uC131 \uC2E4\uD328: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
    if (this.enableLogging && this.app) {
      try {
        let similarity;
        let previousText;
        if (this.lastEmbedding) {
          similarity = cosineSimilarity(this.lastEmbedding, embedding);
          previousText = this.lastText;
        }
        await appendEmbeddingLog(this.app, this.manifest, {
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
    this.saveButtonEl = null;
    this.sessionIdEl = null;
    this.useRagCheckbox = null;
    this.showSourcesCheckbox = null;
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
    const ragWrapEl = controlsEl.createEl("div", { cls: "ovl-rag-options" });
    const useRagLabel = ragWrapEl.createEl("label");
    const useRagCheckbox = useRagLabel.createEl("input", { type: "checkbox" });
    useRagCheckbox.checked = true;
    useRagLabel.appendText(" RAG \uC0AC\uC6A9");
    this.useRagCheckbox = useRagCheckbox;
    const showSourcesLabel = ragWrapEl.createEl("label");
    const showSourcesCheckbox = showSourcesLabel.createEl("input", { type: "checkbox" });
    showSourcesCheckbox.checked = false;
    showSourcesLabel.appendText(" \uC18C\uC2A4\uB9CC \uBCF4\uAE30");
    this.showSourcesCheckbox = showSourcesCheckbox;
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
    const sendButtonEl = inputWrapEl.createEl("button", { text: "\uC804\uC1A1", cls: "ovl-chat-button" });
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
    var _a, _b, _c, _d, _e, _f;
    const input = (_b = (_a = this.inputEl) == null ? void 0 : _a.value.trim()) != null ? _b : "";
    if (!input) {
      new import_obsidian7.Notice("\uBA54\uC2DC\uC9C0\uB97C \uC785\uB825\uD574 \uC8FC\uC138\uC694.");
      return;
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
    this.setBusyState({ isBusy: true, sendLoading: true });
    try {
      const useRag = (_d = (_c = this.useRagCheckbox) == null ? void 0 : _c.checked) != null ? _d : false;
      const showSourcesOnly = (_f = (_e = this.showSourcesCheckbox) == null ? void 0 : _e.checked) != null ? _f : false;
      let reply;
      if (useRag && this.plugin.settings.indexingEnabled) {
        try {
          const searchResults = await this.plugin.search(input);
          if (showSourcesOnly) {
            reply = this.formatSearchResults(searchResults);
          } else {
            const context = this.buildContext(searchResults);
            const enhancedMessages = this.buildEnhancedMessages(input, context);
            reply = await this.plugin.requestAssistantReply(enhancedMessages);
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
  buildContext(searchResults) {
    if (searchResults.length === 0) {
      return "\uAD00\uB828 \uBB38\uC11C\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.";
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
var Indexer = class {
  constructor(config) {
    this.config = config;
    this.indexSignature = this.generateIndexSignature();
    this.metadataStore = new MetadataStore(config.metaStorePath, this.indexSignature);
    this.vectorStore = new VectorStore(config.vectorStorePath, this.indexSignature);
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
  setIndexer(indexer2) {
    this.indexer = indexer2;
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
    const indexer2 = this.indexer;
    if (!indexer2) {
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzL2tpbmQtb2YvaW5kZXguanMiLCAibm9kZV9tb2R1bGVzL2lzLWV4dGVuZGFibGUvaW5kZXguanMiLCAibm9kZV9tb2R1bGVzL2V4dGVuZC1zaGFsbG93L2luZGV4LmpzIiwgIm5vZGVfbW9kdWxlcy9zZWN0aW9uLW1hdHRlci9pbmRleC5qcyIsICJub2RlX21vZHVsZXMvanMteWFtbC9saWIvanMteWFtbC9jb21tb24uanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvZXhjZXB0aW9uLmpzIiwgIm5vZGVfbW9kdWxlcy9qcy15YW1sL2xpYi9qcy15YW1sL21hcmsuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvdHlwZS5qcyIsICJub2RlX21vZHVsZXMvanMteWFtbC9saWIvanMteWFtbC9zY2hlbWEuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvdHlwZS9zdHIuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvdHlwZS9zZXEuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvdHlwZS9tYXAuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvc2NoZW1hL2ZhaWxzYWZlLmpzIiwgIm5vZGVfbW9kdWxlcy9qcy15YW1sL2xpYi9qcy15YW1sL3R5cGUvbnVsbC5qcyIsICJub2RlX21vZHVsZXMvanMteWFtbC9saWIvanMteWFtbC90eXBlL2Jvb2wuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvdHlwZS9pbnQuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvdHlwZS9mbG9hdC5qcyIsICJub2RlX21vZHVsZXMvanMteWFtbC9saWIvanMteWFtbC9zY2hlbWEvanNvbi5qcyIsICJub2RlX21vZHVsZXMvanMteWFtbC9saWIvanMteWFtbC9zY2hlbWEvY29yZS5qcyIsICJub2RlX21vZHVsZXMvanMteWFtbC9saWIvanMteWFtbC90eXBlL3RpbWVzdGFtcC5qcyIsICJub2RlX21vZHVsZXMvanMteWFtbC9saWIvanMteWFtbC90eXBlL21lcmdlLmpzIiwgIm5vZGVfbW9kdWxlcy9qcy15YW1sL2xpYi9qcy15YW1sL3R5cGUvYmluYXJ5LmpzIiwgIm5vZGVfbW9kdWxlcy9qcy15YW1sL2xpYi9qcy15YW1sL3R5cGUvb21hcC5qcyIsICJub2RlX21vZHVsZXMvanMteWFtbC9saWIvanMteWFtbC90eXBlL3BhaXJzLmpzIiwgIm5vZGVfbW9kdWxlcy9qcy15YW1sL2xpYi9qcy15YW1sL3R5cGUvc2V0LmpzIiwgIm5vZGVfbW9kdWxlcy9qcy15YW1sL2xpYi9qcy15YW1sL3NjaGVtYS9kZWZhdWx0X3NhZmUuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvdHlwZS9qcy91bmRlZmluZWQuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvdHlwZS9qcy9yZWdleHAuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvdHlwZS9qcy9mdW5jdGlvbi5qcyIsICJub2RlX21vZHVsZXMvanMteWFtbC9saWIvanMteWFtbC9zY2hlbWEvZGVmYXVsdF9mdWxsLmpzIiwgIm5vZGVfbW9kdWxlcy9qcy15YW1sL2xpYi9qcy15YW1sL2xvYWRlci5qcyIsICJub2RlX21vZHVsZXMvanMteWFtbC9saWIvanMteWFtbC9kdW1wZXIuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvaW5kZXguanMiLCAibm9kZV9tb2R1bGVzL2dyYXktbWF0dGVyL2xpYi9lbmdpbmVzLmpzIiwgIm5vZGVfbW9kdWxlcy9zdHJpcC1ib20tc3RyaW5nL2luZGV4LmpzIiwgIm5vZGVfbW9kdWxlcy9ncmF5LW1hdHRlci9saWIvdXRpbHMuanMiLCAibm9kZV9tb2R1bGVzL2dyYXktbWF0dGVyL2xpYi9kZWZhdWx0cy5qcyIsICJub2RlX21vZHVsZXMvZ3JheS1tYXR0ZXIvbGliL2VuZ2luZS5qcyIsICJub2RlX21vZHVsZXMvZ3JheS1tYXR0ZXIvbGliL3N0cmluZ2lmeS5qcyIsICJub2RlX21vZHVsZXMvZ3JheS1tYXR0ZXIvbGliL2V4Y2VycHQuanMiLCAibm9kZV9tb2R1bGVzL2dyYXktbWF0dGVyL2xpYi90by1maWxlLmpzIiwgIm5vZGVfbW9kdWxlcy9ncmF5LW1hdHRlci9saWIvcGFyc2UuanMiLCAibm9kZV9tb2R1bGVzL2dyYXktbWF0dGVyL2luZGV4LmpzIiwgInNyYy9tYWluLnRzIiwgInNyYy9jb252ZXJzYXRpb25TdG9yZS50cyIsICJzcmMvY29udmVyc2F0aW9uLnRzIiwgInNyYy9hcGkudHMiLCAic3JjL3R5cGVzLnRzIiwgInNyYy9sb2dnaW5nLnRzIiwgInNyYy9tb2RhbHMvc2F2ZUNvbnZlcnNhdGlvbk1vZGFsLnRzIiwgInNyYy9wYXJzZVR1cm5zLnRzIiwgInNyYy9zZXR0aW5ncy50cyIsICJzcmMvdmlld3MvY2hhdFZpZXcudHMiLCAic3JjL3RvcGljU2VwYXJhdGlvbi9rZXl3b3JkRXh0cmFjdG9yLnRzIiwgIm5vZGVfbW9kdWxlcy9AZ29vZ2xlL2dlbmVyYXRpdmUtYWkvZGlzdC9pbmRleC5tanMiLCAic3JjL3RvcGljU2VwYXJhdGlvbi9lbWJlZGRpbmdTZXJ2aWNlLnRzIiwgInNyYy90b3BpY1NlcGFyYXRpb24vdG9waWNTZXBhcmF0aW9uRW5naW5lLnRzIiwgInNyYy90b3BpY1NlcGFyYXRpb24vbXVsdGlOb3RlU2F2ZXIudHMiLCAic3JjL2luZGV4aW5nL21ldGFkYXRhU3RvcmUudHMiLCAic3JjL2luZGV4aW5nL3ZlY3RvclN0b3JlLnRzIiwgInNyYy9pbmRleGluZy9lbWJlZGRpbmdzLnRzIiwgInNyYy9pbmRleGluZy9wYXJzZXIudHMiLCAic3JjL2luZGV4aW5nL2NodW5rZXIudHMiLCAic3JjL2luZGV4aW5nL2luZGV4ZXIudHMiLCAic3JjL3ZhdWx0V2F0Y2hlci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsidmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBraW5kT2YodmFsKSB7XG4gIGlmICh2YWwgPT09IHZvaWQgMCkgcmV0dXJuICd1bmRlZmluZWQnO1xuICBpZiAodmFsID09PSBudWxsKSByZXR1cm4gJ251bGwnO1xuXG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbDtcbiAgaWYgKHR5cGUgPT09ICdib29sZWFuJykgcmV0dXJuICdib29sZWFuJztcbiAgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSByZXR1cm4gJ3N0cmluZyc7XG4gIGlmICh0eXBlID09PSAnbnVtYmVyJykgcmV0dXJuICdudW1iZXInO1xuICBpZiAodHlwZSA9PT0gJ3N5bWJvbCcpIHJldHVybiAnc3ltYm9sJztcbiAgaWYgKHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gaXNHZW5lcmF0b3JGbih2YWwpID8gJ2dlbmVyYXRvcmZ1bmN0aW9uJyA6ICdmdW5jdGlvbic7XG4gIH1cblxuICBpZiAoaXNBcnJheSh2YWwpKSByZXR1cm4gJ2FycmF5JztcbiAgaWYgKGlzQnVmZmVyKHZhbCkpIHJldHVybiAnYnVmZmVyJztcbiAgaWYgKGlzQXJndW1lbnRzKHZhbCkpIHJldHVybiAnYXJndW1lbnRzJztcbiAgaWYgKGlzRGF0ZSh2YWwpKSByZXR1cm4gJ2RhdGUnO1xuICBpZiAoaXNFcnJvcih2YWwpKSByZXR1cm4gJ2Vycm9yJztcbiAgaWYgKGlzUmVnZXhwKHZhbCkpIHJldHVybiAncmVnZXhwJztcblxuICBzd2l0Y2ggKGN0b3JOYW1lKHZhbCkpIHtcbiAgICBjYXNlICdTeW1ib2wnOiByZXR1cm4gJ3N5bWJvbCc7XG4gICAgY2FzZSAnUHJvbWlzZSc6IHJldHVybiAncHJvbWlzZSc7XG5cbiAgICAvLyBTZXQsIE1hcCwgV2Vha1NldCwgV2Vha01hcFxuICAgIGNhc2UgJ1dlYWtNYXAnOiByZXR1cm4gJ3dlYWttYXAnO1xuICAgIGNhc2UgJ1dlYWtTZXQnOiByZXR1cm4gJ3dlYWtzZXQnO1xuICAgIGNhc2UgJ01hcCc6IHJldHVybiAnbWFwJztcbiAgICBjYXNlICdTZXQnOiByZXR1cm4gJ3NldCc7XG5cbiAgICAvLyA4LWJpdCB0eXBlZCBhcnJheXNcbiAgICBjYXNlICdJbnQ4QXJyYXknOiByZXR1cm4gJ2ludDhhcnJheSc7XG4gICAgY2FzZSAnVWludDhBcnJheSc6IHJldHVybiAndWludDhhcnJheSc7XG4gICAgY2FzZSAnVWludDhDbGFtcGVkQXJyYXknOiByZXR1cm4gJ3VpbnQ4Y2xhbXBlZGFycmF5JztcblxuICAgIC8vIDE2LWJpdCB0eXBlZCBhcnJheXNcbiAgICBjYXNlICdJbnQxNkFycmF5JzogcmV0dXJuICdpbnQxNmFycmF5JztcbiAgICBjYXNlICdVaW50MTZBcnJheSc6IHJldHVybiAndWludDE2YXJyYXknO1xuXG4gICAgLy8gMzItYml0IHR5cGVkIGFycmF5c1xuICAgIGNhc2UgJ0ludDMyQXJyYXknOiByZXR1cm4gJ2ludDMyYXJyYXknO1xuICAgIGNhc2UgJ1VpbnQzMkFycmF5JzogcmV0dXJuICd1aW50MzJhcnJheSc7XG4gICAgY2FzZSAnRmxvYXQzMkFycmF5JzogcmV0dXJuICdmbG9hdDMyYXJyYXknO1xuICAgIGNhc2UgJ0Zsb2F0NjRBcnJheSc6IHJldHVybiAnZmxvYXQ2NGFycmF5JztcbiAgfVxuXG4gIGlmIChpc0dlbmVyYXRvck9iaih2YWwpKSB7XG4gICAgcmV0dXJuICdnZW5lcmF0b3InO1xuICB9XG5cbiAgLy8gTm9uLXBsYWluIG9iamVjdHNcbiAgdHlwZSA9IHRvU3RyaW5nLmNhbGwodmFsKTtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnW29iamVjdCBPYmplY3RdJzogcmV0dXJuICdvYmplY3QnO1xuICAgIC8vIGl0ZXJhdG9yc1xuICAgIGNhc2UgJ1tvYmplY3QgTWFwIEl0ZXJhdG9yXSc6IHJldHVybiAnbWFwaXRlcmF0b3InO1xuICAgIGNhc2UgJ1tvYmplY3QgU2V0IEl0ZXJhdG9yXSc6IHJldHVybiAnc2V0aXRlcmF0b3InO1xuICAgIGNhc2UgJ1tvYmplY3QgU3RyaW5nIEl0ZXJhdG9yXSc6IHJldHVybiAnc3RyaW5naXRlcmF0b3InO1xuICAgIGNhc2UgJ1tvYmplY3QgQXJyYXkgSXRlcmF0b3JdJzogcmV0dXJuICdhcnJheWl0ZXJhdG9yJztcbiAgfVxuXG4gIC8vIG90aGVyXG4gIHJldHVybiB0eXBlLnNsaWNlKDgsIC0xKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccy9nLCAnJyk7XG59O1xuXG5mdW5jdGlvbiBjdG9yTmFtZSh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwuY29uc3RydWN0b3IgPT09ICdmdW5jdGlvbicgPyB2YWwuY29uc3RydWN0b3IubmFtZSA6IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzQXJyYXkodmFsKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KSByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWwpO1xuICByZXR1cm4gdmFsIGluc3RhbmNlb2YgQXJyYXk7XG59XG5cbmZ1bmN0aW9uIGlzRXJyb3IodmFsKSB7XG4gIHJldHVybiB2YWwgaW5zdGFuY2VvZiBFcnJvciB8fCAodHlwZW9mIHZhbC5tZXNzYWdlID09PSAnc3RyaW5nJyAmJiB2YWwuY29uc3RydWN0b3IgJiYgdHlwZW9mIHZhbC5jb25zdHJ1Y3Rvci5zdGFja1RyYWNlTGltaXQgPT09ICdudW1iZXInKTtcbn1cblxuZnVuY3Rpb24gaXNEYXRlKHZhbCkge1xuICBpZiAodmFsIGluc3RhbmNlb2YgRGF0ZSkgcmV0dXJuIHRydWU7XG4gIHJldHVybiB0eXBlb2YgdmFsLnRvRGF0ZVN0cmluZyA9PT0gJ2Z1bmN0aW9uJ1xuICAgICYmIHR5cGVvZiB2YWwuZ2V0RGF0ZSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICYmIHR5cGVvZiB2YWwuc2V0RGF0ZSA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaXNSZWdleHAodmFsKSB7XG4gIGlmICh2YWwgaW5zdGFuY2VvZiBSZWdFeHApIHJldHVybiB0cnVlO1xuICByZXR1cm4gdHlwZW9mIHZhbC5mbGFncyA9PT0gJ3N0cmluZydcbiAgICAmJiB0eXBlb2YgdmFsLmlnbm9yZUNhc2UgPT09ICdib29sZWFuJ1xuICAgICYmIHR5cGVvZiB2YWwubXVsdGlsaW5lID09PSAnYm9vbGVhbidcbiAgICAmJiB0eXBlb2YgdmFsLmdsb2JhbCA9PT0gJ2Jvb2xlYW4nO1xufVxuXG5mdW5jdGlvbiBpc0dlbmVyYXRvckZuKG5hbWUsIHZhbCkge1xuICByZXR1cm4gY3Rvck5hbWUobmFtZSkgPT09ICdHZW5lcmF0b3JGdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzR2VuZXJhdG9yT2JqKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbC50aHJvdyA9PT0gJ2Z1bmN0aW9uJ1xuICAgICYmIHR5cGVvZiB2YWwucmV0dXJuID09PSAnZnVuY3Rpb24nXG4gICAgJiYgdHlwZW9mIHZhbC5uZXh0ID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWwpIHtcbiAgdHJ5IHtcbiAgICBpZiAodHlwZW9mIHZhbC5sZW5ndGggPT09ICdudW1iZXInICYmIHR5cGVvZiB2YWwuY2FsbGVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGlmIChlcnIubWVzc2FnZS5pbmRleE9mKCdjYWxsZWUnKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogSWYgeW91IG5lZWQgdG8gc3VwcG9ydCBTYWZhcmkgNS03ICg4LTEwIHlyLW9sZCBicm93c2VyKSxcbiAqIHRha2UgYSBsb29rIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvaXMtYnVmZmVyXG4gKi9cblxuZnVuY3Rpb24gaXNCdWZmZXIodmFsKSB7XG4gIGlmICh2YWwuY29uc3RydWN0b3IgJiYgdHlwZW9mIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiB2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIodmFsKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG4iLCAiLyohXG4gKiBpcy1leHRlbmRhYmxlIDxodHRwczovL2dpdGh1Yi5jb20vam9uc2NobGlua2VydC9pcy1leHRlbmRhYmxlPlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSwgSm9uIFNjaGxpbmtlcnQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzRXh0ZW5kYWJsZSh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnICYmIHZhbCAhPT0gbnVsbFxuICAgICYmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKTtcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCdpcy1leHRlbmRhYmxlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXh0ZW5kKG8vKiwgb2JqZWN0cyovKSB7XG4gIGlmICghaXNPYmplY3QobykpIHsgbyA9IHt9OyB9XG5cbiAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgbGVuOyBpKyspIHtcbiAgICB2YXIgb2JqID0gYXJndW1lbnRzW2ldO1xuXG4gICAgaWYgKGlzT2JqZWN0KG9iaikpIHtcbiAgICAgIGFzc2lnbihvLCBvYmopO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbztcbn07XG5cbmZ1bmN0aW9uIGFzc2lnbihhLCBiKSB7XG4gIGZvciAodmFyIGtleSBpbiBiKSB7XG4gICAgaWYgKGhhc093bihiLCBrZXkpKSB7XG4gICAgICBhW2tleV0gPSBiW2tleV07XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBga2V5YCBpcyBhbiBvd24gcHJvcGVydHkgb2YgYG9iamAuXG4gKi9cblxuZnVuY3Rpb24gaGFzT3duKG9iaiwga2V5KSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpO1xufVxuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIHR5cGVPZiA9IHJlcXVpcmUoJ2tpbmQtb2YnKTtcbnZhciBleHRlbmQgPSByZXF1aXJlKCdleHRlbmQtc2hhbGxvdycpO1xuXG4vKipcbiAqIFBhcnNlIHNlY3Rpb25zIGluIGBpbnB1dGAgd2l0aCB0aGUgZ2l2ZW4gYG9wdGlvbnNgLlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgc2VjdGlvbnMgPSByZXF1aXJlKCd7JT0gbmFtZSAlfScpO1xuICogdmFyIHJlc3VsdCA9IHNlY3Rpb25zKGlucHV0LCBvcHRpb25zKTtcbiAqIC8vIHsgY29udGVudDogJ0NvbnRlbnQgYmVmb3JlIHNlY3Rpb25zJywgc2VjdGlvbnM6IFtdIH1cbiAqIGBgYFxuICogQHBhcmFtIHtTdHJpbmd8QnVmZmVyfE9iamVjdH0gYGlucHV0YCBJZiBpbnB1dCBpcyBhbiBvYmplY3QsIGl0J3MgYGNvbnRlbnRgIHByb3BlcnR5IG11c3QgYmUgYSBzdHJpbmcgb3IgYnVmZmVyLlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm4ge09iamVjdH0gUmV0dXJucyBhbiBvYmplY3Qgd2l0aCBhIGBjb250ZW50YCBzdHJpbmcgYW5kIGFuIGFycmF5IG9mIGBzZWN0aW9uc2Agb2JqZWN0cy5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpbnB1dCwgb3B0aW9ucykge1xuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBvcHRpb25zID0geyBwYXJzZTogb3B0aW9ucyB9O1xuICB9XG5cbiAgdmFyIGZpbGUgPSB0b09iamVjdChpbnB1dCk7XG4gIHZhciBkZWZhdWx0cyA9IHtzZWN0aW9uX2RlbGltaXRlcjogJy0tLScsIHBhcnNlOiBpZGVudGl0eX07XG4gIHZhciBvcHRzID0gZXh0ZW5kKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XG4gIHZhciBkZWxpbSA9IG9wdHMuc2VjdGlvbl9kZWxpbWl0ZXI7XG4gIHZhciBsaW5lcyA9IGZpbGUuY29udGVudC5zcGxpdCgvXFxyP1xcbi8pO1xuICB2YXIgc2VjdGlvbnMgPSBudWxsO1xuICB2YXIgc2VjdGlvbiA9IGNyZWF0ZVNlY3Rpb24oKTtcbiAgdmFyIGNvbnRlbnQgPSBbXTtcbiAgdmFyIHN0YWNrID0gW107XG5cbiAgZnVuY3Rpb24gaW5pdFNlY3Rpb25zKHZhbCkge1xuICAgIGZpbGUuY29udGVudCA9IHZhbDtcbiAgICBzZWN0aW9ucyA9IFtdO1xuICAgIGNvbnRlbnQgPSBbXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsb3NlU2VjdGlvbih2YWwpIHtcbiAgICBpZiAoc3RhY2subGVuZ3RoKSB7XG4gICAgICBzZWN0aW9uLmtleSA9IGdldEtleShzdGFja1swXSwgZGVsaW0pO1xuICAgICAgc2VjdGlvbi5jb250ZW50ID0gdmFsO1xuICAgICAgb3B0cy5wYXJzZShzZWN0aW9uLCBzZWN0aW9ucyk7XG4gICAgICBzZWN0aW9ucy5wdXNoKHNlY3Rpb24pO1xuICAgICAgc2VjdGlvbiA9IGNyZWF0ZVNlY3Rpb24oKTtcbiAgICAgIGNvbnRlbnQgPSBbXTtcbiAgICAgIHN0YWNrID0gW107XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBsaW5lID0gbGluZXNbaV07XG4gICAgdmFyIGxlbiA9IHN0YWNrLmxlbmd0aDtcbiAgICB2YXIgbG4gPSBsaW5lLnRyaW0oKTtcblxuICAgIGlmIChpc0RlbGltaXRlcihsbiwgZGVsaW0pKSB7XG4gICAgICBpZiAobG4ubGVuZ3RoID09PSAzICYmIGkgIT09IDApIHtcbiAgICAgICAgaWYgKGxlbiA9PT0gMCB8fCBsZW4gPT09IDIpIHtcbiAgICAgICAgICBjb250ZW50LnB1c2gobGluZSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgc3RhY2sucHVzaChsbik7XG4gICAgICAgIHNlY3Rpb24uZGF0YSA9IGNvbnRlbnQuam9pbignXFxuJyk7XG4gICAgICAgIGNvbnRlbnQgPSBbXTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChzZWN0aW9ucyA9PT0gbnVsbCkge1xuICAgICAgICBpbml0U2VjdGlvbnMoY29udGVudC5qb2luKCdcXG4nKSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChsZW4gPT09IDIpIHtcbiAgICAgICAgY2xvc2VTZWN0aW9uKGNvbnRlbnQuam9pbignXFxuJykpO1xuICAgICAgfVxuXG4gICAgICBzdGFjay5wdXNoKGxuKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGNvbnRlbnQucHVzaChsaW5lKTtcbiAgfVxuXG4gIGlmIChzZWN0aW9ucyA9PT0gbnVsbCkge1xuICAgIGluaXRTZWN0aW9ucyhjb250ZW50LmpvaW4oJ1xcbicpKTtcbiAgfSBlbHNlIHtcbiAgICBjbG9zZVNlY3Rpb24oY29udGVudC5qb2luKCdcXG4nKSk7XG4gIH1cblxuICBmaWxlLnNlY3Rpb25zID0gc2VjdGlvbnM7XG4gIHJldHVybiBmaWxlO1xufTtcblxuZnVuY3Rpb24gaXNEZWxpbWl0ZXIobGluZSwgZGVsaW0pIHtcbiAgaWYgKGxpbmUuc2xpY2UoMCwgZGVsaW0ubGVuZ3RoKSAhPT0gZGVsaW0pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKGxpbmUuY2hhckF0KGRlbGltLmxlbmd0aCArIDEpID09PSBkZWxpbS5zbGljZSgtMSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHRvT2JqZWN0KGlucHV0KSB7XG4gIGlmICh0eXBlT2YoaW5wdXQpICE9PSAnb2JqZWN0Jykge1xuICAgIGlucHV0ID0geyBjb250ZW50OiBpbnB1dCB9O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBpbnB1dC5jb250ZW50ICE9PSAnc3RyaW5nJyAmJiAhaXNCdWZmZXIoaW5wdXQuY29udGVudCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleHBlY3RlZCBhIGJ1ZmZlciBvciBzdHJpbmcnKTtcbiAgfVxuXG4gIGlucHV0LmNvbnRlbnQgPSBpbnB1dC5jb250ZW50LnRvU3RyaW5nKCk7XG4gIGlucHV0LnNlY3Rpb25zID0gW107XG4gIHJldHVybiBpbnB1dDtcbn1cblxuZnVuY3Rpb24gZ2V0S2V5KHZhbCwgZGVsaW0pIHtcbiAgcmV0dXJuIHZhbCA/IHZhbC5zbGljZShkZWxpbS5sZW5ndGgpLnRyaW0oKSA6ICcnO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVTZWN0aW9uKCkge1xuICByZXR1cm4geyBrZXk6ICcnLCBkYXRhOiAnJywgY29udGVudDogJycgfTtcbn1cblxuZnVuY3Rpb24gaWRlbnRpdHkodmFsKSB7XG4gIHJldHVybiB2YWw7XG59XG5cbmZ1bmN0aW9uIGlzQnVmZmVyKHZhbCkge1xuICBpZiAodmFsICYmIHZhbC5jb25zdHJ1Y3RvciAmJiB0eXBlb2YgdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcih2YWwpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbiIsICIndXNlIHN0cmljdCc7XG5cblxuZnVuY3Rpb24gaXNOb3RoaW5nKHN1YmplY3QpIHtcbiAgcmV0dXJuICh0eXBlb2Ygc3ViamVjdCA9PT0gJ3VuZGVmaW5lZCcpIHx8IChzdWJqZWN0ID09PSBudWxsKTtcbn1cblxuXG5mdW5jdGlvbiBpc09iamVjdChzdWJqZWN0KSB7XG4gIHJldHVybiAodHlwZW9mIHN1YmplY3QgPT09ICdvYmplY3QnKSAmJiAoc3ViamVjdCAhPT0gbnVsbCk7XG59XG5cblxuZnVuY3Rpb24gdG9BcnJheShzZXF1ZW5jZSkge1xuICBpZiAoQXJyYXkuaXNBcnJheShzZXF1ZW5jZSkpIHJldHVybiBzZXF1ZW5jZTtcbiAgZWxzZSBpZiAoaXNOb3RoaW5nKHNlcXVlbmNlKSkgcmV0dXJuIFtdO1xuXG4gIHJldHVybiBbIHNlcXVlbmNlIF07XG59XG5cblxuZnVuY3Rpb24gZXh0ZW5kKHRhcmdldCwgc291cmNlKSB7XG4gIHZhciBpbmRleCwgbGVuZ3RoLCBrZXksIHNvdXJjZUtleXM7XG5cbiAgaWYgKHNvdXJjZSkge1xuICAgIHNvdXJjZUtleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuXG4gICAgZm9yIChpbmRleCA9IDAsIGxlbmd0aCA9IHNvdXJjZUtleXMubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgICAga2V5ID0gc291cmNlS2V5c1tpbmRleF07XG4gICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cblxuZnVuY3Rpb24gcmVwZWF0KHN0cmluZywgY291bnQpIHtcbiAgdmFyIHJlc3VsdCA9ICcnLCBjeWNsZTtcblxuICBmb3IgKGN5Y2xlID0gMDsgY3ljbGUgPCBjb3VudDsgY3ljbGUgKz0gMSkge1xuICAgIHJlc3VsdCArPSBzdHJpbmc7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5cbmZ1bmN0aW9uIGlzTmVnYXRpdmVaZXJvKG51bWJlcikge1xuICByZXR1cm4gKG51bWJlciA9PT0gMCkgJiYgKE51bWJlci5ORUdBVElWRV9JTkZJTklUWSA9PT0gMSAvIG51bWJlcik7XG59XG5cblxubW9kdWxlLmV4cG9ydHMuaXNOb3RoaW5nICAgICAgPSBpc05vdGhpbmc7XG5tb2R1bGUuZXhwb3J0cy5pc09iamVjdCAgICAgICA9IGlzT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMudG9BcnJheSAgICAgICAgPSB0b0FycmF5O1xubW9kdWxlLmV4cG9ydHMucmVwZWF0ICAgICAgICAgPSByZXBlYXQ7XG5tb2R1bGUuZXhwb3J0cy5pc05lZ2F0aXZlWmVybyA9IGlzTmVnYXRpdmVaZXJvO1xubW9kdWxlLmV4cG9ydHMuZXh0ZW5kICAgICAgICAgPSBleHRlbmQ7XG4iLCAiLy8gWUFNTCBlcnJvciBjbGFzcy4gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy84NDU4OTg0XG4vL1xuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBZQU1MRXhjZXB0aW9uKHJlYXNvbiwgbWFyaykge1xuICAvLyBTdXBlciBjb25zdHJ1Y3RvclxuICBFcnJvci5jYWxsKHRoaXMpO1xuXG4gIHRoaXMubmFtZSA9ICdZQU1MRXhjZXB0aW9uJztcbiAgdGhpcy5yZWFzb24gPSByZWFzb247XG4gIHRoaXMubWFyayA9IG1hcms7XG4gIHRoaXMubWVzc2FnZSA9ICh0aGlzLnJlYXNvbiB8fCAnKHVua25vd24gcmVhc29uKScpICsgKHRoaXMubWFyayA/ICcgJyArIHRoaXMubWFyay50b1N0cmluZygpIDogJycpO1xuXG4gIC8vIEluY2x1ZGUgc3RhY2sgdHJhY2UgaW4gZXJyb3Igb2JqZWN0XG4gIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuICAgIC8vIENocm9tZSBhbmQgTm9kZUpTXG4gICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvcik7XG4gIH0gZWxzZSB7XG4gICAgLy8gRkYsIElFIDEwKyBhbmQgU2FmYXJpIDYrLiBGYWxsYmFjayBmb3Igb3RoZXJzXG4gICAgdGhpcy5zdGFjayA9IChuZXcgRXJyb3IoKSkuc3RhY2sgfHwgJyc7XG4gIH1cbn1cblxuXG4vLyBJbmhlcml0IGZyb20gRXJyb3JcbllBTUxFeGNlcHRpb24ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUpO1xuWUFNTEV4Y2VwdGlvbi5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBZQU1MRXhjZXB0aW9uO1xuXG5cbllBTUxFeGNlcHRpb24ucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoY29tcGFjdCkge1xuICB2YXIgcmVzdWx0ID0gdGhpcy5uYW1lICsgJzogJztcblxuICByZXN1bHQgKz0gdGhpcy5yZWFzb24gfHwgJyh1bmtub3duIHJlYXNvbiknO1xuXG4gIGlmICghY29tcGFjdCAmJiB0aGlzLm1hcmspIHtcbiAgICByZXN1bHQgKz0gJyAnICsgdGhpcy5tYXJrLnRvU3RyaW5nKCk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFlBTUxFeGNlcHRpb247XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5cbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbicpO1xuXG5cbmZ1bmN0aW9uIE1hcmsobmFtZSwgYnVmZmVyLCBwb3NpdGlvbiwgbGluZSwgY29sdW1uKSB7XG4gIHRoaXMubmFtZSAgICAgPSBuYW1lO1xuICB0aGlzLmJ1ZmZlciAgID0gYnVmZmVyO1xuICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gIHRoaXMubGluZSAgICAgPSBsaW5lO1xuICB0aGlzLmNvbHVtbiAgID0gY29sdW1uO1xufVxuXG5cbk1hcmsucHJvdG90eXBlLmdldFNuaXBwZXQgPSBmdW5jdGlvbiBnZXRTbmlwcGV0KGluZGVudCwgbWF4TGVuZ3RoKSB7XG4gIHZhciBoZWFkLCBzdGFydCwgdGFpbCwgZW5kLCBzbmlwcGV0O1xuXG4gIGlmICghdGhpcy5idWZmZXIpIHJldHVybiBudWxsO1xuXG4gIGluZGVudCA9IGluZGVudCB8fCA0O1xuICBtYXhMZW5ndGggPSBtYXhMZW5ndGggfHwgNzU7XG5cbiAgaGVhZCA9ICcnO1xuICBzdGFydCA9IHRoaXMucG9zaXRpb247XG5cbiAgd2hpbGUgKHN0YXJ0ID4gMCAmJiAnXFx4MDBcXHJcXG5cXHg4NVxcdTIwMjhcXHUyMDI5Jy5pbmRleE9mKHRoaXMuYnVmZmVyLmNoYXJBdChzdGFydCAtIDEpKSA9PT0gLTEpIHtcbiAgICBzdGFydCAtPSAxO1xuICAgIGlmICh0aGlzLnBvc2l0aW9uIC0gc3RhcnQgPiAobWF4TGVuZ3RoIC8gMiAtIDEpKSB7XG4gICAgICBoZWFkID0gJyAuLi4gJztcbiAgICAgIHN0YXJ0ICs9IDU7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICB0YWlsID0gJyc7XG4gIGVuZCA9IHRoaXMucG9zaXRpb247XG5cbiAgd2hpbGUgKGVuZCA8IHRoaXMuYnVmZmVyLmxlbmd0aCAmJiAnXFx4MDBcXHJcXG5cXHg4NVxcdTIwMjhcXHUyMDI5Jy5pbmRleE9mKHRoaXMuYnVmZmVyLmNoYXJBdChlbmQpKSA9PT0gLTEpIHtcbiAgICBlbmQgKz0gMTtcbiAgICBpZiAoZW5kIC0gdGhpcy5wb3NpdGlvbiA+IChtYXhMZW5ndGggLyAyIC0gMSkpIHtcbiAgICAgIHRhaWwgPSAnIC4uLiAnO1xuICAgICAgZW5kIC09IDU7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBzbmlwcGV0ID0gdGhpcy5idWZmZXIuc2xpY2Uoc3RhcnQsIGVuZCk7XG5cbiAgcmV0dXJuIGNvbW1vbi5yZXBlYXQoJyAnLCBpbmRlbnQpICsgaGVhZCArIHNuaXBwZXQgKyB0YWlsICsgJ1xcbicgK1xuICAgICAgICAgY29tbW9uLnJlcGVhdCgnICcsIGluZGVudCArIHRoaXMucG9zaXRpb24gLSBzdGFydCArIGhlYWQubGVuZ3RoKSArICdeJztcbn07XG5cblxuTWFyay5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyhjb21wYWN0KSB7XG4gIHZhciBzbmlwcGV0LCB3aGVyZSA9ICcnO1xuXG4gIGlmICh0aGlzLm5hbWUpIHtcbiAgICB3aGVyZSArPSAnaW4gXCInICsgdGhpcy5uYW1lICsgJ1wiICc7XG4gIH1cblxuICB3aGVyZSArPSAnYXQgbGluZSAnICsgKHRoaXMubGluZSArIDEpICsgJywgY29sdW1uICcgKyAodGhpcy5jb2x1bW4gKyAxKTtcblxuICBpZiAoIWNvbXBhY3QpIHtcbiAgICBzbmlwcGV0ID0gdGhpcy5nZXRTbmlwcGV0KCk7XG5cbiAgICBpZiAoc25pcHBldCkge1xuICAgICAgd2hlcmUgKz0gJzpcXG4nICsgc25pcHBldDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gd2hlcmU7XG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0gTWFyaztcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBZQU1MRXhjZXB0aW9uID0gcmVxdWlyZSgnLi9leGNlcHRpb24nKTtcblxudmFyIFRZUEVfQ09OU1RSVUNUT1JfT1BUSU9OUyA9IFtcbiAgJ2tpbmQnLFxuICAncmVzb2x2ZScsXG4gICdjb25zdHJ1Y3QnLFxuICAnaW5zdGFuY2VPZicsXG4gICdwcmVkaWNhdGUnLFxuICAncmVwcmVzZW50JyxcbiAgJ2RlZmF1bHRTdHlsZScsXG4gICdzdHlsZUFsaWFzZXMnXG5dO1xuXG52YXIgWUFNTF9OT0RFX0tJTkRTID0gW1xuICAnc2NhbGFyJyxcbiAgJ3NlcXVlbmNlJyxcbiAgJ21hcHBpbmcnXG5dO1xuXG5mdW5jdGlvbiBjb21waWxlU3R5bGVBbGlhc2VzKG1hcCkge1xuICB2YXIgcmVzdWx0ID0ge307XG5cbiAgaWYgKG1hcCAhPT0gbnVsbCkge1xuICAgIE9iamVjdC5rZXlzKG1hcCkuZm9yRWFjaChmdW5jdGlvbiAoc3R5bGUpIHtcbiAgICAgIG1hcFtzdHlsZV0uZm9yRWFjaChmdW5jdGlvbiAoYWxpYXMpIHtcbiAgICAgICAgcmVzdWx0W1N0cmluZyhhbGlhcyldID0gc3R5bGU7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIFR5cGUodGFnLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBpZiAoVFlQRV9DT05TVFJVQ1RPUl9PUFRJT05TLmluZGV4T2YobmFtZSkgPT09IC0xKSB7XG4gICAgICB0aHJvdyBuZXcgWUFNTEV4Y2VwdGlvbignVW5rbm93biBvcHRpb24gXCInICsgbmFtZSArICdcIiBpcyBtZXQgaW4gZGVmaW5pdGlvbiBvZiBcIicgKyB0YWcgKyAnXCIgWUFNTCB0eXBlLicpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gVE9ETzogQWRkIHRhZyBmb3JtYXQgY2hlY2suXG4gIHRoaXMudGFnICAgICAgICAgID0gdGFnO1xuICB0aGlzLmtpbmQgICAgICAgICA9IG9wdGlvbnNbJ2tpbmQnXSAgICAgICAgIHx8IG51bGw7XG4gIHRoaXMucmVzb2x2ZSAgICAgID0gb3B0aW9uc1sncmVzb2x2ZSddICAgICAgfHwgZnVuY3Rpb24gKCkgeyByZXR1cm4gdHJ1ZTsgfTtcbiAgdGhpcy5jb25zdHJ1Y3QgICAgPSBvcHRpb25zWydjb25zdHJ1Y3QnXSAgICB8fCBmdW5jdGlvbiAoZGF0YSkgeyByZXR1cm4gZGF0YTsgfTtcbiAgdGhpcy5pbnN0YW5jZU9mICAgPSBvcHRpb25zWydpbnN0YW5jZU9mJ10gICB8fCBudWxsO1xuICB0aGlzLnByZWRpY2F0ZSAgICA9IG9wdGlvbnNbJ3ByZWRpY2F0ZSddICAgIHx8IG51bGw7XG4gIHRoaXMucmVwcmVzZW50ICAgID0gb3B0aW9uc1sncmVwcmVzZW50J10gICAgfHwgbnVsbDtcbiAgdGhpcy5kZWZhdWx0U3R5bGUgPSBvcHRpb25zWydkZWZhdWx0U3R5bGUnXSB8fCBudWxsO1xuICB0aGlzLnN0eWxlQWxpYXNlcyA9IGNvbXBpbGVTdHlsZUFsaWFzZXMob3B0aW9uc1snc3R5bGVBbGlhc2VzJ10gfHwgbnVsbCk7XG5cbiAgaWYgKFlBTUxfTk9ERV9LSU5EUy5pbmRleE9mKHRoaXMua2luZCkgPT09IC0xKSB7XG4gICAgdGhyb3cgbmV3IFlBTUxFeGNlcHRpb24oJ1Vua25vd24ga2luZCBcIicgKyB0aGlzLmtpbmQgKyAnXCIgaXMgc3BlY2lmaWVkIGZvciBcIicgKyB0YWcgKyAnXCIgWUFNTCB0eXBlLicpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVHlwZTtcbiIsICIndXNlIHN0cmljdCc7XG5cbi8qZXNsaW50LWRpc2FibGUgbWF4LWxlbiovXG5cbnZhciBjb21tb24gICAgICAgID0gcmVxdWlyZSgnLi9jb21tb24nKTtcbnZhciBZQU1MRXhjZXB0aW9uID0gcmVxdWlyZSgnLi9leGNlcHRpb24nKTtcbnZhciBUeXBlICAgICAgICAgID0gcmVxdWlyZSgnLi90eXBlJyk7XG5cblxuZnVuY3Rpb24gY29tcGlsZUxpc3Qoc2NoZW1hLCBuYW1lLCByZXN1bHQpIHtcbiAgdmFyIGV4Y2x1ZGUgPSBbXTtcblxuICBzY2hlbWEuaW5jbHVkZS5mb3JFYWNoKGZ1bmN0aW9uIChpbmNsdWRlZFNjaGVtYSkge1xuICAgIHJlc3VsdCA9IGNvbXBpbGVMaXN0KGluY2x1ZGVkU2NoZW1hLCBuYW1lLCByZXN1bHQpO1xuICB9KTtcblxuICBzY2hlbWFbbmFtZV0uZm9yRWFjaChmdW5jdGlvbiAoY3VycmVudFR5cGUpIHtcbiAgICByZXN1bHQuZm9yRWFjaChmdW5jdGlvbiAocHJldmlvdXNUeXBlLCBwcmV2aW91c0luZGV4KSB7XG4gICAgICBpZiAocHJldmlvdXNUeXBlLnRhZyA9PT0gY3VycmVudFR5cGUudGFnICYmIHByZXZpb3VzVHlwZS5raW5kID09PSBjdXJyZW50VHlwZS5raW5kKSB7XG4gICAgICAgIGV4Y2x1ZGUucHVzaChwcmV2aW91c0luZGV4KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJlc3VsdC5wdXNoKGN1cnJlbnRUeXBlKTtcbiAgfSk7XG5cbiAgcmV0dXJuIHJlc3VsdC5maWx0ZXIoZnVuY3Rpb24gKHR5cGUsIGluZGV4KSB7XG4gICAgcmV0dXJuIGV4Y2x1ZGUuaW5kZXhPZihpbmRleCkgPT09IC0xO1xuICB9KTtcbn1cblxuXG5mdW5jdGlvbiBjb21waWxlTWFwKC8qIGxpc3RzLi4uICovKSB7XG4gIHZhciByZXN1bHQgPSB7XG4gICAgICAgIHNjYWxhcjoge30sXG4gICAgICAgIHNlcXVlbmNlOiB7fSxcbiAgICAgICAgbWFwcGluZzoge30sXG4gICAgICAgIGZhbGxiYWNrOiB7fVxuICAgICAgfSwgaW5kZXgsIGxlbmd0aDtcblxuICBmdW5jdGlvbiBjb2xsZWN0VHlwZSh0eXBlKSB7XG4gICAgcmVzdWx0W3R5cGUua2luZF1bdHlwZS50YWddID0gcmVzdWx0WydmYWxsYmFjayddW3R5cGUudGFnXSA9IHR5cGU7XG4gIH1cblxuICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICBhcmd1bWVudHNbaW5kZXhdLmZvckVhY2goY29sbGVjdFR5cGUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cblxuZnVuY3Rpb24gU2NoZW1hKGRlZmluaXRpb24pIHtcbiAgdGhpcy5pbmNsdWRlICA9IGRlZmluaXRpb24uaW5jbHVkZSAgfHwgW107XG4gIHRoaXMuaW1wbGljaXQgPSBkZWZpbml0aW9uLmltcGxpY2l0IHx8IFtdO1xuICB0aGlzLmV4cGxpY2l0ID0gZGVmaW5pdGlvbi5leHBsaWNpdCB8fCBbXTtcblxuICB0aGlzLmltcGxpY2l0LmZvckVhY2goZnVuY3Rpb24gKHR5cGUpIHtcbiAgICBpZiAodHlwZS5sb2FkS2luZCAmJiB0eXBlLmxvYWRLaW5kICE9PSAnc2NhbGFyJykge1xuICAgICAgdGhyb3cgbmV3IFlBTUxFeGNlcHRpb24oJ1RoZXJlIGlzIGEgbm9uLXNjYWxhciB0eXBlIGluIHRoZSBpbXBsaWNpdCBsaXN0IG9mIGEgc2NoZW1hLiBJbXBsaWNpdCByZXNvbHZpbmcgb2Ygc3VjaCB0eXBlcyBpcyBub3Qgc3VwcG9ydGVkLicpO1xuICAgIH1cbiAgfSk7XG5cbiAgdGhpcy5jb21waWxlZEltcGxpY2l0ID0gY29tcGlsZUxpc3QodGhpcywgJ2ltcGxpY2l0JywgW10pO1xuICB0aGlzLmNvbXBpbGVkRXhwbGljaXQgPSBjb21waWxlTGlzdCh0aGlzLCAnZXhwbGljaXQnLCBbXSk7XG4gIHRoaXMuY29tcGlsZWRUeXBlTWFwICA9IGNvbXBpbGVNYXAodGhpcy5jb21waWxlZEltcGxpY2l0LCB0aGlzLmNvbXBpbGVkRXhwbGljaXQpO1xufVxuXG5cblNjaGVtYS5ERUZBVUxUID0gbnVsbDtcblxuXG5TY2hlbWEuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlU2NoZW1hKCkge1xuICB2YXIgc2NoZW1hcywgdHlwZXM7XG5cbiAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgY2FzZSAxOlxuICAgICAgc2NoZW1hcyA9IFNjaGVtYS5ERUZBVUxUO1xuICAgICAgdHlwZXMgPSBhcmd1bWVudHNbMF07XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgMjpcbiAgICAgIHNjaGVtYXMgPSBhcmd1bWVudHNbMF07XG4gICAgICB0eXBlcyA9IGFyZ3VtZW50c1sxXTtcbiAgICAgIGJyZWFrO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBZQU1MRXhjZXB0aW9uKCdXcm9uZyBudW1iZXIgb2YgYXJndW1lbnRzIGZvciBTY2hlbWEuY3JlYXRlIGZ1bmN0aW9uJyk7XG4gIH1cblxuICBzY2hlbWFzID0gY29tbW9uLnRvQXJyYXkoc2NoZW1hcyk7XG4gIHR5cGVzID0gY29tbW9uLnRvQXJyYXkodHlwZXMpO1xuXG4gIGlmICghc2NoZW1hcy5ldmVyeShmdW5jdGlvbiAoc2NoZW1hKSB7IHJldHVybiBzY2hlbWEgaW5zdGFuY2VvZiBTY2hlbWE7IH0pKSB7XG4gICAgdGhyb3cgbmV3IFlBTUxFeGNlcHRpb24oJ1NwZWNpZmllZCBsaXN0IG9mIHN1cGVyIHNjaGVtYXMgKG9yIGEgc2luZ2xlIFNjaGVtYSBvYmplY3QpIGNvbnRhaW5zIGEgbm9uLVNjaGVtYSBvYmplY3QuJyk7XG4gIH1cblxuICBpZiAoIXR5cGVzLmV2ZXJ5KGZ1bmN0aW9uICh0eXBlKSB7IHJldHVybiB0eXBlIGluc3RhbmNlb2YgVHlwZTsgfSkpIHtcbiAgICB0aHJvdyBuZXcgWUFNTEV4Y2VwdGlvbignU3BlY2lmaWVkIGxpc3Qgb2YgWUFNTCB0eXBlcyAob3IgYSBzaW5nbGUgVHlwZSBvYmplY3QpIGNvbnRhaW5zIGEgbm9uLVR5cGUgb2JqZWN0LicpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBTY2hlbWEoe1xuICAgIGluY2x1ZGU6IHNjaGVtYXMsXG4gICAgZXhwbGljaXQ6IHR5cGVzXG4gIH0pO1xufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFNjaGVtYTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBUeXBlID0gcmVxdWlyZSgnLi4vdHlwZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBUeXBlKCd0YWc6eWFtbC5vcmcsMjAwMjpzdHInLCB7XG4gIGtpbmQ6ICdzY2FsYXInLFxuICBjb25zdHJ1Y3Q6IGZ1bmN0aW9uIChkYXRhKSB7IHJldHVybiBkYXRhICE9PSBudWxsID8gZGF0YSA6ICcnOyB9XG59KTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBUeXBlID0gcmVxdWlyZSgnLi4vdHlwZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBUeXBlKCd0YWc6eWFtbC5vcmcsMjAwMjpzZXEnLCB7XG4gIGtpbmQ6ICdzZXF1ZW5jZScsXG4gIGNvbnN0cnVjdDogZnVuY3Rpb24gKGRhdGEpIHsgcmV0dXJuIGRhdGEgIT09IG51bGwgPyBkYXRhIDogW107IH1cbn0pO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIFR5cGUgPSByZXF1aXJlKCcuLi90eXBlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFR5cGUoJ3RhZzp5YW1sLm9yZywyMDAyOm1hcCcsIHtcbiAga2luZDogJ21hcHBpbmcnLFxuICBjb25zdHJ1Y3Q6IGZ1bmN0aW9uIChkYXRhKSB7IHJldHVybiBkYXRhICE9PSBudWxsID8gZGF0YSA6IHt9OyB9XG59KTtcbiIsICIvLyBTdGFuZGFyZCBZQU1MJ3MgRmFpbHNhZmUgc2NoZW1hLlxuLy8gaHR0cDovL3d3dy55YW1sLm9yZy9zcGVjLzEuMi9zcGVjLmh0bWwjaWQyODAyMzQ2XG5cblxuJ3VzZSBzdHJpY3QnO1xuXG5cbnZhciBTY2hlbWEgPSByZXF1aXJlKCcuLi9zY2hlbWEnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBTY2hlbWEoe1xuICBleHBsaWNpdDogW1xuICAgIHJlcXVpcmUoJy4uL3R5cGUvc3RyJyksXG4gICAgcmVxdWlyZSgnLi4vdHlwZS9zZXEnKSxcbiAgICByZXF1aXJlKCcuLi90eXBlL21hcCcpXG4gIF1cbn0pO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIFR5cGUgPSByZXF1aXJlKCcuLi90eXBlJyk7XG5cbmZ1bmN0aW9uIHJlc29sdmVZYW1sTnVsbChkYXRhKSB7XG4gIGlmIChkYXRhID09PSBudWxsKSByZXR1cm4gdHJ1ZTtcblxuICB2YXIgbWF4ID0gZGF0YS5sZW5ndGg7XG5cbiAgcmV0dXJuIChtYXggPT09IDEgJiYgZGF0YSA9PT0gJ34nKSB8fFxuICAgICAgICAgKG1heCA9PT0gNCAmJiAoZGF0YSA9PT0gJ251bGwnIHx8IGRhdGEgPT09ICdOdWxsJyB8fCBkYXRhID09PSAnTlVMTCcpKTtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0WWFtbE51bGwoKSB7XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBpc051bGwob2JqZWN0KSB7XG4gIHJldHVybiBvYmplY3QgPT09IG51bGw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFR5cGUoJ3RhZzp5YW1sLm9yZywyMDAyOm51bGwnLCB7XG4gIGtpbmQ6ICdzY2FsYXInLFxuICByZXNvbHZlOiByZXNvbHZlWWFtbE51bGwsXG4gIGNvbnN0cnVjdDogY29uc3RydWN0WWFtbE51bGwsXG4gIHByZWRpY2F0ZTogaXNOdWxsLFxuICByZXByZXNlbnQ6IHtcbiAgICBjYW5vbmljYWw6IGZ1bmN0aW9uICgpIHsgcmV0dXJuICd+JzsgICAgfSxcbiAgICBsb3dlcmNhc2U6IGZ1bmN0aW9uICgpIHsgcmV0dXJuICdudWxsJzsgfSxcbiAgICB1cHBlcmNhc2U6IGZ1bmN0aW9uICgpIHsgcmV0dXJuICdOVUxMJzsgfSxcbiAgICBjYW1lbGNhc2U6IGZ1bmN0aW9uICgpIHsgcmV0dXJuICdOdWxsJzsgfVxuICB9LFxuICBkZWZhdWx0U3R5bGU6ICdsb3dlcmNhc2UnXG59KTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBUeXBlID0gcmVxdWlyZSgnLi4vdHlwZScpO1xuXG5mdW5jdGlvbiByZXNvbHZlWWFtbEJvb2xlYW4oZGF0YSkge1xuICBpZiAoZGF0YSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gIHZhciBtYXggPSBkYXRhLmxlbmd0aDtcblxuICByZXR1cm4gKG1heCA9PT0gNCAmJiAoZGF0YSA9PT0gJ3RydWUnIHx8IGRhdGEgPT09ICdUcnVlJyB8fCBkYXRhID09PSAnVFJVRScpKSB8fFxuICAgICAgICAgKG1heCA9PT0gNSAmJiAoZGF0YSA9PT0gJ2ZhbHNlJyB8fCBkYXRhID09PSAnRmFsc2UnIHx8IGRhdGEgPT09ICdGQUxTRScpKTtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0WWFtbEJvb2xlYW4oZGF0YSkge1xuICByZXR1cm4gZGF0YSA9PT0gJ3RydWUnIHx8XG4gICAgICAgICBkYXRhID09PSAnVHJ1ZScgfHxcbiAgICAgICAgIGRhdGEgPT09ICdUUlVFJztcbn1cblxuZnVuY3Rpb24gaXNCb29sZWFuKG9iamVjdCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCkgPT09ICdbb2JqZWN0IEJvb2xlYW5dJztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgVHlwZSgndGFnOnlhbWwub3JnLDIwMDI6Ym9vbCcsIHtcbiAga2luZDogJ3NjYWxhcicsXG4gIHJlc29sdmU6IHJlc29sdmVZYW1sQm9vbGVhbixcbiAgY29uc3RydWN0OiBjb25zdHJ1Y3RZYW1sQm9vbGVhbixcbiAgcHJlZGljYXRlOiBpc0Jvb2xlYW4sXG4gIHJlcHJlc2VudDoge1xuICAgIGxvd2VyY2FzZTogZnVuY3Rpb24gKG9iamVjdCkgeyByZXR1cm4gb2JqZWN0ID8gJ3RydWUnIDogJ2ZhbHNlJzsgfSxcbiAgICB1cHBlcmNhc2U6IGZ1bmN0aW9uIChvYmplY3QpIHsgcmV0dXJuIG9iamVjdCA/ICdUUlVFJyA6ICdGQUxTRSc7IH0sXG4gICAgY2FtZWxjYXNlOiBmdW5jdGlvbiAob2JqZWN0KSB7IHJldHVybiBvYmplY3QgPyAnVHJ1ZScgOiAnRmFsc2UnOyB9XG4gIH0sXG4gIGRlZmF1bHRTdHlsZTogJ2xvd2VyY2FzZSdcbn0pO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4uL2NvbW1vbicpO1xudmFyIFR5cGUgICA9IHJlcXVpcmUoJy4uL3R5cGUnKTtcblxuZnVuY3Rpb24gaXNIZXhDb2RlKGMpIHtcbiAgcmV0dXJuICgoMHgzMC8qIDAgKi8gPD0gYykgJiYgKGMgPD0gMHgzOS8qIDkgKi8pKSB8fFxuICAgICAgICAgKCgweDQxLyogQSAqLyA8PSBjKSAmJiAoYyA8PSAweDQ2LyogRiAqLykpIHx8XG4gICAgICAgICAoKDB4NjEvKiBhICovIDw9IGMpICYmIChjIDw9IDB4NjYvKiBmICovKSk7XG59XG5cbmZ1bmN0aW9uIGlzT2N0Q29kZShjKSB7XG4gIHJldHVybiAoKDB4MzAvKiAwICovIDw9IGMpICYmIChjIDw9IDB4MzcvKiA3ICovKSk7XG59XG5cbmZ1bmN0aW9uIGlzRGVjQ29kZShjKSB7XG4gIHJldHVybiAoKDB4MzAvKiAwICovIDw9IGMpICYmIChjIDw9IDB4MzkvKiA5ICovKSk7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVZYW1sSW50ZWdlcihkYXRhKSB7XG4gIGlmIChkYXRhID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgdmFyIG1heCA9IGRhdGEubGVuZ3RoLFxuICAgICAgaW5kZXggPSAwLFxuICAgICAgaGFzRGlnaXRzID0gZmFsc2UsXG4gICAgICBjaDtcblxuICBpZiAoIW1heCkgcmV0dXJuIGZhbHNlO1xuXG4gIGNoID0gZGF0YVtpbmRleF07XG5cbiAgLy8gc2lnblxuICBpZiAoY2ggPT09ICctJyB8fCBjaCA9PT0gJysnKSB7XG4gICAgY2ggPSBkYXRhWysraW5kZXhdO1xuICB9XG5cbiAgaWYgKGNoID09PSAnMCcpIHtcbiAgICAvLyAwXG4gICAgaWYgKGluZGV4ICsgMSA9PT0gbWF4KSByZXR1cm4gdHJ1ZTtcbiAgICBjaCA9IGRhdGFbKytpbmRleF07XG5cbiAgICAvLyBiYXNlIDIsIGJhc2UgOCwgYmFzZSAxNlxuXG4gICAgaWYgKGNoID09PSAnYicpIHtcbiAgICAgIC8vIGJhc2UgMlxuICAgICAgaW5kZXgrKztcblxuICAgICAgZm9yICg7IGluZGV4IDwgbWF4OyBpbmRleCsrKSB7XG4gICAgICAgIGNoID0gZGF0YVtpbmRleF07XG4gICAgICAgIGlmIChjaCA9PT0gJ18nKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGNoICE9PSAnMCcgJiYgY2ggIT09ICcxJykgcmV0dXJuIGZhbHNlO1xuICAgICAgICBoYXNEaWdpdHMgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGhhc0RpZ2l0cyAmJiBjaCAhPT0gJ18nO1xuICAgIH1cblxuXG4gICAgaWYgKGNoID09PSAneCcpIHtcbiAgICAgIC8vIGJhc2UgMTZcbiAgICAgIGluZGV4Kys7XG5cbiAgICAgIGZvciAoOyBpbmRleCA8IG1heDsgaW5kZXgrKykge1xuICAgICAgICBjaCA9IGRhdGFbaW5kZXhdO1xuICAgICAgICBpZiAoY2ggPT09ICdfJykgY29udGludWU7XG4gICAgICAgIGlmICghaXNIZXhDb2RlKGRhdGEuY2hhckNvZGVBdChpbmRleCkpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGhhc0RpZ2l0cyA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gaGFzRGlnaXRzICYmIGNoICE9PSAnXyc7XG4gICAgfVxuXG4gICAgLy8gYmFzZSA4XG4gICAgZm9yICg7IGluZGV4IDwgbWF4OyBpbmRleCsrKSB7XG4gICAgICBjaCA9IGRhdGFbaW5kZXhdO1xuICAgICAgaWYgKGNoID09PSAnXycpIGNvbnRpbnVlO1xuICAgICAgaWYgKCFpc09jdENvZGUoZGF0YS5jaGFyQ29kZUF0KGluZGV4KSkpIHJldHVybiBmYWxzZTtcbiAgICAgIGhhc0RpZ2l0cyA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBoYXNEaWdpdHMgJiYgY2ggIT09ICdfJztcbiAgfVxuXG4gIC8vIGJhc2UgMTAgKGV4Y2VwdCAwKSBvciBiYXNlIDYwXG5cbiAgLy8gdmFsdWUgc2hvdWxkIG5vdCBzdGFydCB3aXRoIGBfYDtcbiAgaWYgKGNoID09PSAnXycpIHJldHVybiBmYWxzZTtcblxuICBmb3IgKDsgaW5kZXggPCBtYXg7IGluZGV4KyspIHtcbiAgICBjaCA9IGRhdGFbaW5kZXhdO1xuICAgIGlmIChjaCA9PT0gJ18nKSBjb250aW51ZTtcbiAgICBpZiAoY2ggPT09ICc6JykgYnJlYWs7XG4gICAgaWYgKCFpc0RlY0NvZGUoZGF0YS5jaGFyQ29kZUF0KGluZGV4KSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaGFzRGlnaXRzID0gdHJ1ZTtcbiAgfVxuXG4gIC8vIFNob3VsZCBoYXZlIGRpZ2l0cyBhbmQgc2hvdWxkIG5vdCBlbmQgd2l0aCBgX2BcbiAgaWYgKCFoYXNEaWdpdHMgfHwgY2ggPT09ICdfJykgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIGlmICFiYXNlNjAgLSBkb25lO1xuICBpZiAoY2ggIT09ICc6JykgcmV0dXJuIHRydWU7XG5cbiAgLy8gYmFzZTYwIGFsbW9zdCBub3QgdXNlZCwgbm8gbmVlZHMgdG8gb3B0aW1pemVcbiAgcmV0dXJuIC9eKDpbMC01XT9bMC05XSkrJC8udGVzdChkYXRhLnNsaWNlKGluZGV4KSk7XG59XG5cbmZ1bmN0aW9uIGNvbnN0cnVjdFlhbWxJbnRlZ2VyKGRhdGEpIHtcbiAgdmFyIHZhbHVlID0gZGF0YSwgc2lnbiA9IDEsIGNoLCBiYXNlLCBkaWdpdHMgPSBbXTtcblxuICBpZiAodmFsdWUuaW5kZXhPZignXycpICE9PSAtMSkge1xuICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvXy9nLCAnJyk7XG4gIH1cblxuICBjaCA9IHZhbHVlWzBdO1xuXG4gIGlmIChjaCA9PT0gJy0nIHx8IGNoID09PSAnKycpIHtcbiAgICBpZiAoY2ggPT09ICctJykgc2lnbiA9IC0xO1xuICAgIHZhbHVlID0gdmFsdWUuc2xpY2UoMSk7XG4gICAgY2ggPSB2YWx1ZVswXTtcbiAgfVxuXG4gIGlmICh2YWx1ZSA9PT0gJzAnKSByZXR1cm4gMDtcblxuICBpZiAoY2ggPT09ICcwJykge1xuICAgIGlmICh2YWx1ZVsxXSA9PT0gJ2InKSByZXR1cm4gc2lnbiAqIHBhcnNlSW50KHZhbHVlLnNsaWNlKDIpLCAyKTtcbiAgICBpZiAodmFsdWVbMV0gPT09ICd4JykgcmV0dXJuIHNpZ24gKiBwYXJzZUludCh2YWx1ZSwgMTYpO1xuICAgIHJldHVybiBzaWduICogcGFyc2VJbnQodmFsdWUsIDgpO1xuICB9XG5cbiAgaWYgKHZhbHVlLmluZGV4T2YoJzonKSAhPT0gLTEpIHtcbiAgICB2YWx1ZS5zcGxpdCgnOicpLmZvckVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgIGRpZ2l0cy51bnNoaWZ0KHBhcnNlSW50KHYsIDEwKSk7XG4gICAgfSk7XG5cbiAgICB2YWx1ZSA9IDA7XG4gICAgYmFzZSA9IDE7XG5cbiAgICBkaWdpdHMuZm9yRWFjaChmdW5jdGlvbiAoZCkge1xuICAgICAgdmFsdWUgKz0gKGQgKiBiYXNlKTtcbiAgICAgIGJhc2UgKj0gNjA7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc2lnbiAqIHZhbHVlO1xuXG4gIH1cblxuICByZXR1cm4gc2lnbiAqIHBhcnNlSW50KHZhbHVlLCAxMCk7XG59XG5cbmZ1bmN0aW9uIGlzSW50ZWdlcihvYmplY3QpIHtcbiAgcmV0dXJuIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqZWN0KSkgPT09ICdbb2JqZWN0IE51bWJlcl0nICYmXG4gICAgICAgICAob2JqZWN0ICUgMSA9PT0gMCAmJiAhY29tbW9uLmlzTmVnYXRpdmVaZXJvKG9iamVjdCkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBUeXBlKCd0YWc6eWFtbC5vcmcsMjAwMjppbnQnLCB7XG4gIGtpbmQ6ICdzY2FsYXInLFxuICByZXNvbHZlOiByZXNvbHZlWWFtbEludGVnZXIsXG4gIGNvbnN0cnVjdDogY29uc3RydWN0WWFtbEludGVnZXIsXG4gIHByZWRpY2F0ZTogaXNJbnRlZ2VyLFxuICByZXByZXNlbnQ6IHtcbiAgICBiaW5hcnk6ICAgICAgZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqID49IDAgPyAnMGInICsgb2JqLnRvU3RyaW5nKDIpIDogJy0wYicgKyBvYmoudG9TdHJpbmcoMikuc2xpY2UoMSk7IH0sXG4gICAgb2N0YWw6ICAgICAgIGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiA+PSAwID8gJzAnICArIG9iai50b1N0cmluZyg4KSA6ICctMCcgICsgb2JqLnRvU3RyaW5nKDgpLnNsaWNlKDEpOyB9LFxuICAgIGRlY2ltYWw6ICAgICBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmoudG9TdHJpbmcoMTApOyB9LFxuICAgIC8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbiAgICBoZXhhZGVjaW1hbDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqID49IDAgPyAnMHgnICsgb2JqLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpIDogICctMHgnICsgb2JqLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpLnNsaWNlKDEpOyB9XG4gIH0sXG4gIGRlZmF1bHRTdHlsZTogJ2RlY2ltYWwnLFxuICBzdHlsZUFsaWFzZXM6IHtcbiAgICBiaW5hcnk6ICAgICAgWyAyLCAgJ2JpbicgXSxcbiAgICBvY3RhbDogICAgICAgWyA4LCAgJ29jdCcgXSxcbiAgICBkZWNpbWFsOiAgICAgWyAxMCwgJ2RlYycgXSxcbiAgICBoZXhhZGVjaW1hbDogWyAxNiwgJ2hleCcgXVxuICB9XG59KTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBjb21tb24gPSByZXF1aXJlKCcuLi9jb21tb24nKTtcbnZhciBUeXBlICAgPSByZXF1aXJlKCcuLi90eXBlJyk7XG5cbnZhciBZQU1MX0ZMT0FUX1BBVFRFUk4gPSBuZXcgUmVnRXhwKFxuICAvLyAyLjVlNCwgMi41IGFuZCBpbnRlZ2Vyc1xuICAnXig/OlstK10/KD86MHxbMS05XVswLTlfXSopKD86XFxcXC5bMC05X10qKT8oPzpbZUVdWy0rXT9bMC05XSspPycgK1xuICAvLyAuMmU0LCAuMlxuICAvLyBzcGVjaWFsIGNhc2UsIHNlZW1zIG5vdCBmcm9tIHNwZWNcbiAgJ3xcXFxcLlswLTlfXSsoPzpbZUVdWy0rXT9bMC05XSspPycgK1xuICAvLyAyMDo1OVxuICAnfFstK10/WzAtOV1bMC05X10qKD86OlswLTVdP1swLTldKStcXFxcLlswLTlfXSonICtcbiAgLy8gLmluZlxuICAnfFstK10/XFxcXC4oPzppbmZ8SW5mfElORiknICtcbiAgLy8gLm5hblxuICAnfFxcXFwuKD86bmFufE5hTnxOQU4pKSQnKTtcblxuZnVuY3Rpb24gcmVzb2x2ZVlhbWxGbG9hdChkYXRhKSB7XG4gIGlmIChkYXRhID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKCFZQU1MX0ZMT0FUX1BBVFRFUk4udGVzdChkYXRhKSB8fFxuICAgICAgLy8gUXVpY2sgaGFjayB0byBub3QgYWxsb3cgaW50ZWdlcnMgZW5kIHdpdGggYF9gXG4gICAgICAvLyBQcm9iYWJseSBzaG91bGQgdXBkYXRlIHJlZ2V4cCAmIGNoZWNrIHNwZWVkXG4gICAgICBkYXRhW2RhdGEubGVuZ3RoIC0gMV0gPT09ICdfJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBjb25zdHJ1Y3RZYW1sRmxvYXQoZGF0YSkge1xuICB2YXIgdmFsdWUsIHNpZ24sIGJhc2UsIGRpZ2l0cztcblxuICB2YWx1ZSAgPSBkYXRhLnJlcGxhY2UoL18vZywgJycpLnRvTG93ZXJDYXNlKCk7XG4gIHNpZ24gICA9IHZhbHVlWzBdID09PSAnLScgPyAtMSA6IDE7XG4gIGRpZ2l0cyA9IFtdO1xuXG4gIGlmICgnKy0nLmluZGV4T2YodmFsdWVbMF0pID49IDApIHtcbiAgICB2YWx1ZSA9IHZhbHVlLnNsaWNlKDEpO1xuICB9XG5cbiAgaWYgKHZhbHVlID09PSAnLmluZicpIHtcbiAgICByZXR1cm4gKHNpZ24gPT09IDEpID8gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZIDogTnVtYmVyLk5FR0FUSVZFX0lORklOSVRZO1xuXG4gIH0gZWxzZSBpZiAodmFsdWUgPT09ICcubmFuJykge1xuICAgIHJldHVybiBOYU47XG5cbiAgfSBlbHNlIGlmICh2YWx1ZS5pbmRleE9mKCc6JykgPj0gMCkge1xuICAgIHZhbHVlLnNwbGl0KCc6JykuZm9yRWFjaChmdW5jdGlvbiAodikge1xuICAgICAgZGlnaXRzLnVuc2hpZnQocGFyc2VGbG9hdCh2LCAxMCkpO1xuICAgIH0pO1xuXG4gICAgdmFsdWUgPSAwLjA7XG4gICAgYmFzZSA9IDE7XG5cbiAgICBkaWdpdHMuZm9yRWFjaChmdW5jdGlvbiAoZCkge1xuICAgICAgdmFsdWUgKz0gZCAqIGJhc2U7XG4gICAgICBiYXNlICo9IDYwO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNpZ24gKiB2YWx1ZTtcblxuICB9XG4gIHJldHVybiBzaWduICogcGFyc2VGbG9hdCh2YWx1ZSwgMTApO1xufVxuXG5cbnZhciBTQ0lFTlRJRklDX1dJVEhPVVRfRE9UID0gL15bLStdP1swLTldK2UvO1xuXG5mdW5jdGlvbiByZXByZXNlbnRZYW1sRmxvYXQob2JqZWN0LCBzdHlsZSkge1xuICB2YXIgcmVzO1xuXG4gIGlmIChpc05hTihvYmplY3QpKSB7XG4gICAgc3dpdGNoIChzdHlsZSkge1xuICAgICAgY2FzZSAnbG93ZXJjYXNlJzogcmV0dXJuICcubmFuJztcbiAgICAgIGNhc2UgJ3VwcGVyY2FzZSc6IHJldHVybiAnLk5BTic7XG4gICAgICBjYXNlICdjYW1lbGNhc2UnOiByZXR1cm4gJy5OYU4nO1xuICAgIH1cbiAgfSBlbHNlIGlmIChOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFkgPT09IG9iamVjdCkge1xuICAgIHN3aXRjaCAoc3R5bGUpIHtcbiAgICAgIGNhc2UgJ2xvd2VyY2FzZSc6IHJldHVybiAnLmluZic7XG4gICAgICBjYXNlICd1cHBlcmNhc2UnOiByZXR1cm4gJy5JTkYnO1xuICAgICAgY2FzZSAnY2FtZWxjYXNlJzogcmV0dXJuICcuSW5mJztcbiAgICB9XG4gIH0gZWxzZSBpZiAoTnVtYmVyLk5FR0FUSVZFX0lORklOSVRZID09PSBvYmplY3QpIHtcbiAgICBzd2l0Y2ggKHN0eWxlKSB7XG4gICAgICBjYXNlICdsb3dlcmNhc2UnOiByZXR1cm4gJy0uaW5mJztcbiAgICAgIGNhc2UgJ3VwcGVyY2FzZSc6IHJldHVybiAnLS5JTkYnO1xuICAgICAgY2FzZSAnY2FtZWxjYXNlJzogcmV0dXJuICctLkluZic7XG4gICAgfVxuICB9IGVsc2UgaWYgKGNvbW1vbi5pc05lZ2F0aXZlWmVybyhvYmplY3QpKSB7XG4gICAgcmV0dXJuICctMC4wJztcbiAgfVxuXG4gIHJlcyA9IG9iamVjdC50b1N0cmluZygxMCk7XG5cbiAgLy8gSlMgc3RyaW5naWZpZXIgY2FuIGJ1aWxkIHNjaWVudGlmaWMgZm9ybWF0IHdpdGhvdXQgZG90czogNWUtMTAwLFxuICAvLyB3aGlsZSBZQU1MIHJlcXVyZXMgZG90OiA1LmUtMTAwLiBGaXggaXQgd2l0aCBzaW1wbGUgaGFja1xuXG4gIHJldHVybiBTQ0lFTlRJRklDX1dJVEhPVVRfRE9ULnRlc3QocmVzKSA/IHJlcy5yZXBsYWNlKCdlJywgJy5lJykgOiByZXM7XG59XG5cbmZ1bmN0aW9uIGlzRmxvYXQob2JqZWN0KSB7XG4gIHJldHVybiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCkgPT09ICdbb2JqZWN0IE51bWJlcl0nKSAmJlxuICAgICAgICAgKG9iamVjdCAlIDEgIT09IDAgfHwgY29tbW9uLmlzTmVnYXRpdmVaZXJvKG9iamVjdCkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBUeXBlKCd0YWc6eWFtbC5vcmcsMjAwMjpmbG9hdCcsIHtcbiAga2luZDogJ3NjYWxhcicsXG4gIHJlc29sdmU6IHJlc29sdmVZYW1sRmxvYXQsXG4gIGNvbnN0cnVjdDogY29uc3RydWN0WWFtbEZsb2F0LFxuICBwcmVkaWNhdGU6IGlzRmxvYXQsXG4gIHJlcHJlc2VudDogcmVwcmVzZW50WWFtbEZsb2F0LFxuICBkZWZhdWx0U3R5bGU6ICdsb3dlcmNhc2UnXG59KTtcbiIsICIvLyBTdGFuZGFyZCBZQU1MJ3MgSlNPTiBzY2hlbWEuXG4vLyBodHRwOi8vd3d3LnlhbWwub3JnL3NwZWMvMS4yL3NwZWMuaHRtbCNpZDI4MDMyMzFcbi8vXG4vLyBOT1RFOiBKUy1ZQU1MIGRvZXMgbm90IHN1cHBvcnQgc2NoZW1hLXNwZWNpZmljIHRhZyByZXNvbHV0aW9uIHJlc3RyaWN0aW9ucy5cbi8vIFNvLCB0aGlzIHNjaGVtYSBpcyBub3Qgc3VjaCBzdHJpY3QgYXMgZGVmaW5lZCBpbiB0aGUgWUFNTCBzcGVjaWZpY2F0aW9uLlxuLy8gSXQgYWxsb3dzIG51bWJlcnMgaW4gYmluYXJ5IG5vdGFpb24sIHVzZSBgTnVsbGAgYW5kIGBOVUxMYCBhcyBgbnVsbGAsIGV0Yy5cblxuXG4ndXNlIHN0cmljdCc7XG5cblxudmFyIFNjaGVtYSA9IHJlcXVpcmUoJy4uL3NjaGVtYScpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFNjaGVtYSh7XG4gIGluY2x1ZGU6IFtcbiAgICByZXF1aXJlKCcuL2ZhaWxzYWZlJylcbiAgXSxcbiAgaW1wbGljaXQ6IFtcbiAgICByZXF1aXJlKCcuLi90eXBlL251bGwnKSxcbiAgICByZXF1aXJlKCcuLi90eXBlL2Jvb2wnKSxcbiAgICByZXF1aXJlKCcuLi90eXBlL2ludCcpLFxuICAgIHJlcXVpcmUoJy4uL3R5cGUvZmxvYXQnKVxuICBdXG59KTtcbiIsICIvLyBTdGFuZGFyZCBZQU1MJ3MgQ29yZSBzY2hlbWEuXG4vLyBodHRwOi8vd3d3LnlhbWwub3JnL3NwZWMvMS4yL3NwZWMuaHRtbCNpZDI4MDQ5MjNcbi8vXG4vLyBOT1RFOiBKUy1ZQU1MIGRvZXMgbm90IHN1cHBvcnQgc2NoZW1hLXNwZWNpZmljIHRhZyByZXNvbHV0aW9uIHJlc3RyaWN0aW9ucy5cbi8vIFNvLCBDb3JlIHNjaGVtYSBoYXMgbm8gZGlzdGluY3Rpb25zIGZyb20gSlNPTiBzY2hlbWEgaXMgSlMtWUFNTC5cblxuXG4ndXNlIHN0cmljdCc7XG5cblxudmFyIFNjaGVtYSA9IHJlcXVpcmUoJy4uL3NjaGVtYScpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFNjaGVtYSh7XG4gIGluY2x1ZGU6IFtcbiAgICByZXF1aXJlKCcuL2pzb24nKVxuICBdXG59KTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBUeXBlID0gcmVxdWlyZSgnLi4vdHlwZScpO1xuXG52YXIgWUFNTF9EQVRFX1JFR0VYUCA9IG5ldyBSZWdFeHAoXG4gICdeKFswLTldWzAtOV1bMC05XVswLTldKScgICAgICAgICAgKyAvLyBbMV0geWVhclxuICAnLShbMC05XVswLTldKScgICAgICAgICAgICAgICAgICAgICsgLy8gWzJdIG1vbnRoXG4gICctKFswLTldWzAtOV0pJCcpOyAgICAgICAgICAgICAgICAgICAvLyBbM10gZGF5XG5cbnZhciBZQU1MX1RJTUVTVEFNUF9SRUdFWFAgPSBuZXcgUmVnRXhwKFxuICAnXihbMC05XVswLTldWzAtOV1bMC05XSknICAgICAgICAgICsgLy8gWzFdIHllYXJcbiAgJy0oWzAtOV1bMC05XT8pJyAgICAgICAgICAgICAgICAgICArIC8vIFsyXSBtb250aFxuICAnLShbMC05XVswLTldPyknICAgICAgICAgICAgICAgICAgICsgLy8gWzNdIGRheVxuICAnKD86W1R0XXxbIFxcXFx0XSspJyAgICAgICAgICAgICAgICAgKyAvLyAuLi5cbiAgJyhbMC05XVswLTldPyknICAgICAgICAgICAgICAgICAgICArIC8vIFs0XSBob3VyXG4gICc6KFswLTldWzAtOV0pJyAgICAgICAgICAgICAgICAgICAgKyAvLyBbNV0gbWludXRlXG4gICc6KFswLTldWzAtOV0pJyAgICAgICAgICAgICAgICAgICAgKyAvLyBbNl0gc2Vjb25kXG4gICcoPzpcXFxcLihbMC05XSopKT8nICAgICAgICAgICAgICAgICArIC8vIFs3XSBmcmFjdGlvblxuICAnKD86WyBcXFxcdF0qKFp8KFstK10pKFswLTldWzAtOV0/KScgKyAvLyBbOF0gdHogWzldIHR6X3NpZ24gWzEwXSB0el9ob3VyXG4gICcoPzo6KFswLTldWzAtOV0pKT8pKT8kJyk7ICAgICAgICAgICAvLyBbMTFdIHR6X21pbnV0ZVxuXG5mdW5jdGlvbiByZXNvbHZlWWFtbFRpbWVzdGFtcChkYXRhKSB7XG4gIGlmIChkYXRhID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG4gIGlmIChZQU1MX0RBVEVfUkVHRVhQLmV4ZWMoZGF0YSkgIT09IG51bGwpIHJldHVybiB0cnVlO1xuICBpZiAoWUFNTF9USU1FU1RBTVBfUkVHRVhQLmV4ZWMoZGF0YSkgIT09IG51bGwpIHJldHVybiB0cnVlO1xuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGNvbnN0cnVjdFlhbWxUaW1lc3RhbXAoZGF0YSkge1xuICB2YXIgbWF0Y2gsIHllYXIsIG1vbnRoLCBkYXksIGhvdXIsIG1pbnV0ZSwgc2Vjb25kLCBmcmFjdGlvbiA9IDAsXG4gICAgICBkZWx0YSA9IG51bGwsIHR6X2hvdXIsIHR6X21pbnV0ZSwgZGF0ZTtcblxuICBtYXRjaCA9IFlBTUxfREFURV9SRUdFWFAuZXhlYyhkYXRhKTtcbiAgaWYgKG1hdGNoID09PSBudWxsKSBtYXRjaCA9IFlBTUxfVElNRVNUQU1QX1JFR0VYUC5leGVjKGRhdGEpO1xuXG4gIGlmIChtYXRjaCA9PT0gbnVsbCkgdGhyb3cgbmV3IEVycm9yKCdEYXRlIHJlc29sdmUgZXJyb3InKTtcblxuICAvLyBtYXRjaDogWzFdIHllYXIgWzJdIG1vbnRoIFszXSBkYXlcblxuICB5ZWFyID0gKyhtYXRjaFsxXSk7XG4gIG1vbnRoID0gKyhtYXRjaFsyXSkgLSAxOyAvLyBKUyBtb250aCBzdGFydHMgd2l0aCAwXG4gIGRheSA9ICsobWF0Y2hbM10pO1xuXG4gIGlmICghbWF0Y2hbNF0pIHsgLy8gbm8gaG91clxuICAgIHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQyh5ZWFyLCBtb250aCwgZGF5KSk7XG4gIH1cblxuICAvLyBtYXRjaDogWzRdIGhvdXIgWzVdIG1pbnV0ZSBbNl0gc2Vjb25kIFs3XSBmcmFjdGlvblxuXG4gIGhvdXIgPSArKG1hdGNoWzRdKTtcbiAgbWludXRlID0gKyhtYXRjaFs1XSk7XG4gIHNlY29uZCA9ICsobWF0Y2hbNl0pO1xuXG4gIGlmIChtYXRjaFs3XSkge1xuICAgIGZyYWN0aW9uID0gbWF0Y2hbN10uc2xpY2UoMCwgMyk7XG4gICAgd2hpbGUgKGZyYWN0aW9uLmxlbmd0aCA8IDMpIHsgLy8gbWlsbGktc2Vjb25kc1xuICAgICAgZnJhY3Rpb24gKz0gJzAnO1xuICAgIH1cbiAgICBmcmFjdGlvbiA9ICtmcmFjdGlvbjtcbiAgfVxuXG4gIC8vIG1hdGNoOiBbOF0gdHogWzldIHR6X3NpZ24gWzEwXSB0el9ob3VyIFsxMV0gdHpfbWludXRlXG5cbiAgaWYgKG1hdGNoWzldKSB7XG4gICAgdHpfaG91ciA9ICsobWF0Y2hbMTBdKTtcbiAgICB0el9taW51dGUgPSArKG1hdGNoWzExXSB8fCAwKTtcbiAgICBkZWx0YSA9ICh0el9ob3VyICogNjAgKyB0el9taW51dGUpICogNjAwMDA7IC8vIGRlbHRhIGluIG1pbGktc2Vjb25kc1xuICAgIGlmIChtYXRjaFs5XSA9PT0gJy0nKSBkZWx0YSA9IC1kZWx0YTtcbiAgfVxuXG4gIGRhdGUgPSBuZXcgRGF0ZShEYXRlLlVUQyh5ZWFyLCBtb250aCwgZGF5LCBob3VyLCBtaW51dGUsIHNlY29uZCwgZnJhY3Rpb24pKTtcblxuICBpZiAoZGVsdGEpIGRhdGUuc2V0VGltZShkYXRlLmdldFRpbWUoKSAtIGRlbHRhKTtcblxuICByZXR1cm4gZGF0ZTtcbn1cblxuZnVuY3Rpb24gcmVwcmVzZW50WWFtbFRpbWVzdGFtcChvYmplY3QgLyosIHN0eWxlKi8pIHtcbiAgcmV0dXJuIG9iamVjdC50b0lTT1N0cmluZygpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBUeXBlKCd0YWc6eWFtbC5vcmcsMjAwMjp0aW1lc3RhbXAnLCB7XG4gIGtpbmQ6ICdzY2FsYXInLFxuICByZXNvbHZlOiByZXNvbHZlWWFtbFRpbWVzdGFtcCxcbiAgY29uc3RydWN0OiBjb25zdHJ1Y3RZYW1sVGltZXN0YW1wLFxuICBpbnN0YW5jZU9mOiBEYXRlLFxuICByZXByZXNlbnQ6IHJlcHJlc2VudFlhbWxUaW1lc3RhbXBcbn0pO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIFR5cGUgPSByZXF1aXJlKCcuLi90eXBlJyk7XG5cbmZ1bmN0aW9uIHJlc29sdmVZYW1sTWVyZ2UoZGF0YSkge1xuICByZXR1cm4gZGF0YSA9PT0gJzw8JyB8fCBkYXRhID09PSBudWxsO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBUeXBlKCd0YWc6eWFtbC5vcmcsMjAwMjptZXJnZScsIHtcbiAga2luZDogJ3NjYWxhcicsXG4gIHJlc29sdmU6IHJlc29sdmVZYW1sTWVyZ2Vcbn0pO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuLyplc2xpbnQtZGlzYWJsZSBuby1iaXR3aXNlKi9cblxudmFyIE5vZGVCdWZmZXI7XG5cbnRyeSB7XG4gIC8vIEEgdHJpY2sgZm9yIGJyb3dzZXJpZmllZCB2ZXJzaW9uLCB0byBub3QgaW5jbHVkZSBgQnVmZmVyYCBzaGltXG4gIHZhciBfcmVxdWlyZSA9IHJlcXVpcmU7XG4gIE5vZGVCdWZmZXIgPSBfcmVxdWlyZSgnYnVmZmVyJykuQnVmZmVyO1xufSBjYXRjaCAoX18pIHt9XG5cbnZhciBUeXBlICAgICAgID0gcmVxdWlyZSgnLi4vdHlwZScpO1xuXG5cbi8vIFsgNjQsIDY1LCA2NiBdIC0+IFsgcGFkZGluZywgQ1IsIExGIF1cbnZhciBCQVNFNjRfTUFQID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89XFxuXFxyJztcblxuXG5mdW5jdGlvbiByZXNvbHZlWWFtbEJpbmFyeShkYXRhKSB7XG4gIGlmIChkYXRhID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgdmFyIGNvZGUsIGlkeCwgYml0bGVuID0gMCwgbWF4ID0gZGF0YS5sZW5ndGgsIG1hcCA9IEJBU0U2NF9NQVA7XG5cbiAgLy8gQ29udmVydCBvbmUgYnkgb25lLlxuICBmb3IgKGlkeCA9IDA7IGlkeCA8IG1heDsgaWR4KyspIHtcbiAgICBjb2RlID0gbWFwLmluZGV4T2YoZGF0YS5jaGFyQXQoaWR4KSk7XG5cbiAgICAvLyBTa2lwIENSL0xGXG4gICAgaWYgKGNvZGUgPiA2NCkgY29udGludWU7XG5cbiAgICAvLyBGYWlsIG9uIGlsbGVnYWwgY2hhcmFjdGVyc1xuICAgIGlmIChjb2RlIDwgMCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgYml0bGVuICs9IDY7XG4gIH1cblxuICAvLyBJZiB0aGVyZSBhcmUgYW55IGJpdHMgbGVmdCwgc291cmNlIHdhcyBjb3JydXB0ZWRcbiAgcmV0dXJuIChiaXRsZW4gJSA4KSA9PT0gMDtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0WWFtbEJpbmFyeShkYXRhKSB7XG4gIHZhciBpZHgsIHRhaWxiaXRzLFxuICAgICAgaW5wdXQgPSBkYXRhLnJlcGxhY2UoL1tcXHJcXG49XS9nLCAnJyksIC8vIHJlbW92ZSBDUi9MRiAmIHBhZGRpbmcgdG8gc2ltcGxpZnkgc2NhblxuICAgICAgbWF4ID0gaW5wdXQubGVuZ3RoLFxuICAgICAgbWFwID0gQkFTRTY0X01BUCxcbiAgICAgIGJpdHMgPSAwLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgLy8gQ29sbGVjdCBieSA2KjQgYml0cyAoMyBieXRlcylcblxuICBmb3IgKGlkeCA9IDA7IGlkeCA8IG1heDsgaWR4KyspIHtcbiAgICBpZiAoKGlkeCAlIDQgPT09IDApICYmIGlkeCkge1xuICAgICAgcmVzdWx0LnB1c2goKGJpdHMgPj4gMTYpICYgMHhGRik7XG4gICAgICByZXN1bHQucHVzaCgoYml0cyA+PiA4KSAmIDB4RkYpO1xuICAgICAgcmVzdWx0LnB1c2goYml0cyAmIDB4RkYpO1xuICAgIH1cblxuICAgIGJpdHMgPSAoYml0cyA8PCA2KSB8IG1hcC5pbmRleE9mKGlucHV0LmNoYXJBdChpZHgpKTtcbiAgfVxuXG4gIC8vIER1bXAgdGFpbFxuXG4gIHRhaWxiaXRzID0gKG1heCAlIDQpICogNjtcblxuICBpZiAodGFpbGJpdHMgPT09IDApIHtcbiAgICByZXN1bHQucHVzaCgoYml0cyA+PiAxNikgJiAweEZGKTtcbiAgICByZXN1bHQucHVzaCgoYml0cyA+PiA4KSAmIDB4RkYpO1xuICAgIHJlc3VsdC5wdXNoKGJpdHMgJiAweEZGKTtcbiAgfSBlbHNlIGlmICh0YWlsYml0cyA9PT0gMTgpIHtcbiAgICByZXN1bHQucHVzaCgoYml0cyA+PiAxMCkgJiAweEZGKTtcbiAgICByZXN1bHQucHVzaCgoYml0cyA+PiAyKSAmIDB4RkYpO1xuICB9IGVsc2UgaWYgKHRhaWxiaXRzID09PSAxMikge1xuICAgIHJlc3VsdC5wdXNoKChiaXRzID4+IDQpICYgMHhGRik7XG4gIH1cblxuICAvLyBXcmFwIGludG8gQnVmZmVyIGZvciBOb2RlSlMgYW5kIGxlYXZlIEFycmF5IGZvciBicm93c2VyXG4gIGlmIChOb2RlQnVmZmVyKSB7XG4gICAgLy8gU3VwcG9ydCBub2RlIDYuKyBCdWZmZXIgQVBJIHdoZW4gYXZhaWxhYmxlXG4gICAgcmV0dXJuIE5vZGVCdWZmZXIuZnJvbSA/IE5vZGVCdWZmZXIuZnJvbShyZXN1bHQpIDogbmV3IE5vZGVCdWZmZXIocmVzdWx0KTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIHJlcHJlc2VudFlhbWxCaW5hcnkob2JqZWN0IC8qLCBzdHlsZSovKSB7XG4gIHZhciByZXN1bHQgPSAnJywgYml0cyA9IDAsIGlkeCwgdGFpbCxcbiAgICAgIG1heCA9IG9iamVjdC5sZW5ndGgsXG4gICAgICBtYXAgPSBCQVNFNjRfTUFQO1xuXG4gIC8vIENvbnZlcnQgZXZlcnkgdGhyZWUgYnl0ZXMgdG8gNCBBU0NJSSBjaGFyYWN0ZXJzLlxuXG4gIGZvciAoaWR4ID0gMDsgaWR4IDwgbWF4OyBpZHgrKykge1xuICAgIGlmICgoaWR4ICUgMyA9PT0gMCkgJiYgaWR4KSB7XG4gICAgICByZXN1bHQgKz0gbWFwWyhiaXRzID4+IDE4KSAmIDB4M0ZdO1xuICAgICAgcmVzdWx0ICs9IG1hcFsoYml0cyA+PiAxMikgJiAweDNGXTtcbiAgICAgIHJlc3VsdCArPSBtYXBbKGJpdHMgPj4gNikgJiAweDNGXTtcbiAgICAgIHJlc3VsdCArPSBtYXBbYml0cyAmIDB4M0ZdO1xuICAgIH1cblxuICAgIGJpdHMgPSAoYml0cyA8PCA4KSArIG9iamVjdFtpZHhdO1xuICB9XG5cbiAgLy8gRHVtcCB0YWlsXG5cbiAgdGFpbCA9IG1heCAlIDM7XG5cbiAgaWYgKHRhaWwgPT09IDApIHtcbiAgICByZXN1bHQgKz0gbWFwWyhiaXRzID4+IDE4KSAmIDB4M0ZdO1xuICAgIHJlc3VsdCArPSBtYXBbKGJpdHMgPj4gMTIpICYgMHgzRl07XG4gICAgcmVzdWx0ICs9IG1hcFsoYml0cyA+PiA2KSAmIDB4M0ZdO1xuICAgIHJlc3VsdCArPSBtYXBbYml0cyAmIDB4M0ZdO1xuICB9IGVsc2UgaWYgKHRhaWwgPT09IDIpIHtcbiAgICByZXN1bHQgKz0gbWFwWyhiaXRzID4+IDEwKSAmIDB4M0ZdO1xuICAgIHJlc3VsdCArPSBtYXBbKGJpdHMgPj4gNCkgJiAweDNGXTtcbiAgICByZXN1bHQgKz0gbWFwWyhiaXRzIDw8IDIpICYgMHgzRl07XG4gICAgcmVzdWx0ICs9IG1hcFs2NF07XG4gIH0gZWxzZSBpZiAodGFpbCA9PT0gMSkge1xuICAgIHJlc3VsdCArPSBtYXBbKGJpdHMgPj4gMikgJiAweDNGXTtcbiAgICByZXN1bHQgKz0gbWFwWyhiaXRzIDw8IDQpICYgMHgzRl07XG4gICAgcmVzdWx0ICs9IG1hcFs2NF07XG4gICAgcmVzdWx0ICs9IG1hcFs2NF07XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBpc0JpbmFyeShvYmplY3QpIHtcbiAgcmV0dXJuIE5vZGVCdWZmZXIgJiYgTm9kZUJ1ZmZlci5pc0J1ZmZlcihvYmplY3QpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBUeXBlKCd0YWc6eWFtbC5vcmcsMjAwMjpiaW5hcnknLCB7XG4gIGtpbmQ6ICdzY2FsYXInLFxuICByZXNvbHZlOiByZXNvbHZlWWFtbEJpbmFyeSxcbiAgY29uc3RydWN0OiBjb25zdHJ1Y3RZYW1sQmluYXJ5LFxuICBwcmVkaWNhdGU6IGlzQmluYXJ5LFxuICByZXByZXNlbnQ6IHJlcHJlc2VudFlhbWxCaW5hcnlcbn0pO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIFR5cGUgPSByZXF1aXJlKCcuLi90eXBlJyk7XG5cbnZhciBfaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIF90b1N0cmluZyAgICAgICA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbmZ1bmN0aW9uIHJlc29sdmVZYW1sT21hcChkYXRhKSB7XG4gIGlmIChkYXRhID09PSBudWxsKSByZXR1cm4gdHJ1ZTtcblxuICB2YXIgb2JqZWN0S2V5cyA9IFtdLCBpbmRleCwgbGVuZ3RoLCBwYWlyLCBwYWlyS2V5LCBwYWlySGFzS2V5LFxuICAgICAgb2JqZWN0ID0gZGF0YTtcblxuICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gb2JqZWN0Lmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICBwYWlyID0gb2JqZWN0W2luZGV4XTtcbiAgICBwYWlySGFzS2V5ID0gZmFsc2U7XG5cbiAgICBpZiAoX3RvU3RyaW5nLmNhbGwocGFpcikgIT09ICdbb2JqZWN0IE9iamVjdF0nKSByZXR1cm4gZmFsc2U7XG5cbiAgICBmb3IgKHBhaXJLZXkgaW4gcGFpcikge1xuICAgICAgaWYgKF9oYXNPd25Qcm9wZXJ0eS5jYWxsKHBhaXIsIHBhaXJLZXkpKSB7XG4gICAgICAgIGlmICghcGFpckhhc0tleSkgcGFpckhhc0tleSA9IHRydWU7XG4gICAgICAgIGVsc2UgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghcGFpckhhc0tleSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgaWYgKG9iamVjdEtleXMuaW5kZXhPZihwYWlyS2V5KSA9PT0gLTEpIG9iamVjdEtleXMucHVzaChwYWlyS2V5KTtcbiAgICBlbHNlIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBjb25zdHJ1Y3RZYW1sT21hcChkYXRhKSB7XG4gIHJldHVybiBkYXRhICE9PSBudWxsID8gZGF0YSA6IFtdO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBUeXBlKCd0YWc6eWFtbC5vcmcsMjAwMjpvbWFwJywge1xuICBraW5kOiAnc2VxdWVuY2UnLFxuICByZXNvbHZlOiByZXNvbHZlWWFtbE9tYXAsXG4gIGNvbnN0cnVjdDogY29uc3RydWN0WWFtbE9tYXBcbn0pO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIFR5cGUgPSByZXF1aXJlKCcuLi90eXBlJyk7XG5cbnZhciBfdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG5mdW5jdGlvbiByZXNvbHZlWWFtbFBhaXJzKGRhdGEpIHtcbiAgaWYgKGRhdGEgPT09IG51bGwpIHJldHVybiB0cnVlO1xuXG4gIHZhciBpbmRleCwgbGVuZ3RoLCBwYWlyLCBrZXlzLCByZXN1bHQsXG4gICAgICBvYmplY3QgPSBkYXRhO1xuXG4gIHJlc3VsdCA9IG5ldyBBcnJheShvYmplY3QubGVuZ3RoKTtcblxuICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gb2JqZWN0Lmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICBwYWlyID0gb2JqZWN0W2luZGV4XTtcblxuICAgIGlmIChfdG9TdHJpbmcuY2FsbChwYWlyKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHJldHVybiBmYWxzZTtcblxuICAgIGtleXMgPSBPYmplY3Qua2V5cyhwYWlyKTtcblxuICAgIGlmIChrZXlzLmxlbmd0aCAhPT0gMSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgcmVzdWx0W2luZGV4XSA9IFsga2V5c1swXSwgcGFpcltrZXlzWzBdXSBdO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGNvbnN0cnVjdFlhbWxQYWlycyhkYXRhKSB7XG4gIGlmIChkYXRhID09PSBudWxsKSByZXR1cm4gW107XG5cbiAgdmFyIGluZGV4LCBsZW5ndGgsIHBhaXIsIGtleXMsIHJlc3VsdCxcbiAgICAgIG9iamVjdCA9IGRhdGE7XG5cbiAgcmVzdWx0ID0gbmV3IEFycmF5KG9iamVjdC5sZW5ndGgpO1xuXG4gIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSBvYmplY3QubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgIHBhaXIgPSBvYmplY3RbaW5kZXhdO1xuXG4gICAga2V5cyA9IE9iamVjdC5rZXlzKHBhaXIpO1xuXG4gICAgcmVzdWx0W2luZGV4XSA9IFsga2V5c1swXSwgcGFpcltrZXlzWzBdXSBdO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgVHlwZSgndGFnOnlhbWwub3JnLDIwMDI6cGFpcnMnLCB7XG4gIGtpbmQ6ICdzZXF1ZW5jZScsXG4gIHJlc29sdmU6IHJlc29sdmVZYW1sUGFpcnMsXG4gIGNvbnN0cnVjdDogY29uc3RydWN0WWFtbFBhaXJzXG59KTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBUeXBlID0gcmVxdWlyZSgnLi4vdHlwZScpO1xuXG52YXIgX2hhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuZnVuY3Rpb24gcmVzb2x2ZVlhbWxTZXQoZGF0YSkge1xuICBpZiAoZGF0YSA9PT0gbnVsbCkgcmV0dXJuIHRydWU7XG5cbiAgdmFyIGtleSwgb2JqZWN0ID0gZGF0YTtcblxuICBmb3IgKGtleSBpbiBvYmplY3QpIHtcbiAgICBpZiAoX2hhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSB7XG4gICAgICBpZiAob2JqZWN0W2tleV0gIT09IG51bGwpIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0WWFtbFNldChkYXRhKSB7XG4gIHJldHVybiBkYXRhICE9PSBudWxsID8gZGF0YSA6IHt9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBUeXBlKCd0YWc6eWFtbC5vcmcsMjAwMjpzZXQnLCB7XG4gIGtpbmQ6ICdtYXBwaW5nJyxcbiAgcmVzb2x2ZTogcmVzb2x2ZVlhbWxTZXQsXG4gIGNvbnN0cnVjdDogY29uc3RydWN0WWFtbFNldFxufSk7XG4iLCAiLy8gSlMtWUFNTCdzIGRlZmF1bHQgc2NoZW1hIGZvciBgc2FmZUxvYWRgIGZ1bmN0aW9uLlxuLy8gSXQgaXMgbm90IGRlc2NyaWJlZCBpbiB0aGUgWUFNTCBzcGVjaWZpY2F0aW9uLlxuLy9cbi8vIFRoaXMgc2NoZW1hIGlzIGJhc2VkIG9uIHN0YW5kYXJkIFlBTUwncyBDb3JlIHNjaGVtYSBhbmQgaW5jbHVkZXMgbW9zdCBvZlxuLy8gZXh0cmEgdHlwZXMgZGVzY3JpYmVkIGF0IFlBTUwgdGFnIHJlcG9zaXRvcnkuIChodHRwOi8veWFtbC5vcmcvdHlwZS8pXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG5cbnZhciBTY2hlbWEgPSByZXF1aXJlKCcuLi9zY2hlbWEnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBTY2hlbWEoe1xuICBpbmNsdWRlOiBbXG4gICAgcmVxdWlyZSgnLi9jb3JlJylcbiAgXSxcbiAgaW1wbGljaXQ6IFtcbiAgICByZXF1aXJlKCcuLi90eXBlL3RpbWVzdGFtcCcpLFxuICAgIHJlcXVpcmUoJy4uL3R5cGUvbWVyZ2UnKVxuICBdLFxuICBleHBsaWNpdDogW1xuICAgIHJlcXVpcmUoJy4uL3R5cGUvYmluYXJ5JyksXG4gICAgcmVxdWlyZSgnLi4vdHlwZS9vbWFwJyksXG4gICAgcmVxdWlyZSgnLi4vdHlwZS9wYWlycycpLFxuICAgIHJlcXVpcmUoJy4uL3R5cGUvc2V0JylcbiAgXVxufSk7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgVHlwZSA9IHJlcXVpcmUoJy4uLy4uL3R5cGUnKTtcblxuZnVuY3Rpb24gcmVzb2x2ZUphdmFzY3JpcHRVbmRlZmluZWQoKSB7XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBjb25zdHJ1Y3RKYXZhc2NyaXB0VW5kZWZpbmVkKCkge1xuICAvKmVzbGludC1kaXNhYmxlIG5vLXVuZGVmaW5lZCovXG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIHJlcHJlc2VudEphdmFzY3JpcHRVbmRlZmluZWQoKSB7XG4gIHJldHVybiAnJztcbn1cblxuZnVuY3Rpb24gaXNVbmRlZmluZWQob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAndW5kZWZpbmVkJztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgVHlwZSgndGFnOnlhbWwub3JnLDIwMDI6anMvdW5kZWZpbmVkJywge1xuICBraW5kOiAnc2NhbGFyJyxcbiAgcmVzb2x2ZTogcmVzb2x2ZUphdmFzY3JpcHRVbmRlZmluZWQsXG4gIGNvbnN0cnVjdDogY29uc3RydWN0SmF2YXNjcmlwdFVuZGVmaW5lZCxcbiAgcHJlZGljYXRlOiBpc1VuZGVmaW5lZCxcbiAgcmVwcmVzZW50OiByZXByZXNlbnRKYXZhc2NyaXB0VW5kZWZpbmVkXG59KTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBUeXBlID0gcmVxdWlyZSgnLi4vLi4vdHlwZScpO1xuXG5mdW5jdGlvbiByZXNvbHZlSmF2YXNjcmlwdFJlZ0V4cChkYXRhKSB7XG4gIGlmIChkYXRhID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG4gIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGZhbHNlO1xuXG4gIHZhciByZWdleHAgPSBkYXRhLFxuICAgICAgdGFpbCAgID0gL1xcLyhbZ2ltXSopJC8uZXhlYyhkYXRhKSxcbiAgICAgIG1vZGlmaWVycyA9ICcnO1xuXG4gIC8vIGlmIHJlZ2V4cCBzdGFydHMgd2l0aCAnLycgaXQgY2FuIGhhdmUgbW9kaWZpZXJzIGFuZCBtdXN0IGJlIHByb3Blcmx5IGNsb3NlZFxuICAvLyBgL2Zvby9naW1gIC0gbW9kaWZpZXJzIHRhaWwgY2FuIGJlIG1heGltdW0gMyBjaGFyc1xuICBpZiAocmVnZXhwWzBdID09PSAnLycpIHtcbiAgICBpZiAodGFpbCkgbW9kaWZpZXJzID0gdGFpbFsxXTtcblxuICAgIGlmIChtb2RpZmllcnMubGVuZ3RoID4gMykgcmV0dXJuIGZhbHNlO1xuICAgIC8vIGlmIGV4cHJlc3Npb24gc3RhcnRzIHdpdGggLywgaXMgc2hvdWxkIGJlIHByb3Blcmx5IHRlcm1pbmF0ZWRcbiAgICBpZiAocmVnZXhwW3JlZ2V4cC5sZW5ndGggLSBtb2RpZmllcnMubGVuZ3RoIC0gMV0gIT09ICcvJykgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGNvbnN0cnVjdEphdmFzY3JpcHRSZWdFeHAoZGF0YSkge1xuICB2YXIgcmVnZXhwID0gZGF0YSxcbiAgICAgIHRhaWwgICA9IC9cXC8oW2dpbV0qKSQvLmV4ZWMoZGF0YSksXG4gICAgICBtb2RpZmllcnMgPSAnJztcblxuICAvLyBgL2Zvby9naW1gIC0gdGFpbCBjYW4gYmUgbWF4aW11bSA0IGNoYXJzXG4gIGlmIChyZWdleHBbMF0gPT09ICcvJykge1xuICAgIGlmICh0YWlsKSBtb2RpZmllcnMgPSB0YWlsWzFdO1xuICAgIHJlZ2V4cCA9IHJlZ2V4cC5zbGljZSgxLCByZWdleHAubGVuZ3RoIC0gbW9kaWZpZXJzLmxlbmd0aCAtIDEpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBSZWdFeHAocmVnZXhwLCBtb2RpZmllcnMpO1xufVxuXG5mdW5jdGlvbiByZXByZXNlbnRKYXZhc2NyaXB0UmVnRXhwKG9iamVjdCAvKiwgc3R5bGUqLykge1xuICB2YXIgcmVzdWx0ID0gJy8nICsgb2JqZWN0LnNvdXJjZSArICcvJztcblxuICBpZiAob2JqZWN0Lmdsb2JhbCkgcmVzdWx0ICs9ICdnJztcbiAgaWYgKG9iamVjdC5tdWx0aWxpbmUpIHJlc3VsdCArPSAnbSc7XG4gIGlmIChvYmplY3QuaWdub3JlQ2FzZSkgcmVzdWx0ICs9ICdpJztcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBpc1JlZ0V4cChvYmplY3QpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmplY3QpID09PSAnW29iamVjdCBSZWdFeHBdJztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgVHlwZSgndGFnOnlhbWwub3JnLDIwMDI6anMvcmVnZXhwJywge1xuICBraW5kOiAnc2NhbGFyJyxcbiAgcmVzb2x2ZTogcmVzb2x2ZUphdmFzY3JpcHRSZWdFeHAsXG4gIGNvbnN0cnVjdDogY29uc3RydWN0SmF2YXNjcmlwdFJlZ0V4cCxcbiAgcHJlZGljYXRlOiBpc1JlZ0V4cCxcbiAgcmVwcmVzZW50OiByZXByZXNlbnRKYXZhc2NyaXB0UmVnRXhwXG59KTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBlc3ByaW1hO1xuXG4vLyBCcm93c2VyaWZpZWQgdmVyc2lvbiBkb2VzIG5vdCBoYXZlIGVzcHJpbWFcbi8vXG4vLyAxLiBGb3Igbm9kZS5qcyBqdXN0IHJlcXVpcmUgbW9kdWxlIGFzIGRlcHNcbi8vIDIuIEZvciBicm93c2VyIHRyeSB0byByZXF1aXJlIG11ZHVsZSB2aWEgZXh0ZXJuYWwgQU1EIHN5c3RlbS5cbi8vICAgIElmIG5vdCBmb3VuZCAtIHRyeSB0byBmYWxsYmFjayB0byB3aW5kb3cuZXNwcmltYS4gSWYgbm90XG4vLyAgICBmb3VuZCB0b28gLSB0aGVuIGZhaWwgdG8gcGFyc2UuXG4vL1xudHJ5IHtcbiAgLy8gd29ya2Fyb3VuZCB0byBleGNsdWRlIHBhY2thZ2UgZnJvbSBicm93c2VyaWZ5IGxpc3QuXG4gIHZhciBfcmVxdWlyZSA9IHJlcXVpcmU7XG4gIGVzcHJpbWEgPSBfcmVxdWlyZSgnZXNwcmltYScpO1xufSBjYXRjaCAoXykge1xuICAvKiBlc2xpbnQtZGlzYWJsZSBuby1yZWRlY2xhcmUgKi9cbiAgLyogZ2xvYmFsIHdpbmRvdyAqL1xuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIGVzcHJpbWEgPSB3aW5kb3cuZXNwcmltYTtcbn1cblxudmFyIFR5cGUgPSByZXF1aXJlKCcuLi8uLi90eXBlJyk7XG5cbmZ1bmN0aW9uIHJlc29sdmVKYXZhc2NyaXB0RnVuY3Rpb24oZGF0YSkge1xuICBpZiAoZGF0YSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gIHRyeSB7XG4gICAgdmFyIHNvdXJjZSA9ICcoJyArIGRhdGEgKyAnKScsXG4gICAgICAgIGFzdCAgICA9IGVzcHJpbWEucGFyc2Uoc291cmNlLCB7IHJhbmdlOiB0cnVlIH0pO1xuXG4gICAgaWYgKGFzdC50eXBlICAgICAgICAgICAgICAgICAgICAhPT0gJ1Byb2dyYW0nICAgICAgICAgICAgIHx8XG4gICAgICAgIGFzdC5ib2R5Lmxlbmd0aCAgICAgICAgICAgICAhPT0gMSAgICAgICAgICAgICAgICAgICAgIHx8XG4gICAgICAgIGFzdC5ib2R5WzBdLnR5cGUgICAgICAgICAgICAhPT0gJ0V4cHJlc3Npb25TdGF0ZW1lbnQnIHx8XG4gICAgICAgIChhc3QuYm9keVswXS5leHByZXNzaW9uLnR5cGUgIT09ICdBcnJvd0Z1bmN0aW9uRXhwcmVzc2lvbicgJiZcbiAgICAgICAgICBhc3QuYm9keVswXS5leHByZXNzaW9uLnR5cGUgIT09ICdGdW5jdGlvbkV4cHJlc3Npb24nKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZnVuY3Rpb24gY29uc3RydWN0SmF2YXNjcmlwdEZ1bmN0aW9uKGRhdGEpIHtcbiAgLypqc2xpbnQgZXZpbDp0cnVlKi9cblxuICB2YXIgc291cmNlID0gJygnICsgZGF0YSArICcpJyxcbiAgICAgIGFzdCAgICA9IGVzcHJpbWEucGFyc2Uoc291cmNlLCB7IHJhbmdlOiB0cnVlIH0pLFxuICAgICAgcGFyYW1zID0gW10sXG4gICAgICBib2R5O1xuXG4gIGlmIChhc3QudHlwZSAgICAgICAgICAgICAgICAgICAgIT09ICdQcm9ncmFtJyAgICAgICAgICAgICB8fFxuICAgICAgYXN0LmJvZHkubGVuZ3RoICAgICAgICAgICAgICE9PSAxICAgICAgICAgICAgICAgICAgICAgfHxcbiAgICAgIGFzdC5ib2R5WzBdLnR5cGUgICAgICAgICAgICAhPT0gJ0V4cHJlc3Npb25TdGF0ZW1lbnQnIHx8XG4gICAgICAoYXN0LmJvZHlbMF0uZXhwcmVzc2lvbi50eXBlICE9PSAnQXJyb3dGdW5jdGlvbkV4cHJlc3Npb24nICYmXG4gICAgICAgIGFzdC5ib2R5WzBdLmV4cHJlc3Npb24udHlwZSAhPT0gJ0Z1bmN0aW9uRXhwcmVzc2lvbicpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gcmVzb2x2ZSBmdW5jdGlvbicpO1xuICB9XG5cbiAgYXN0LmJvZHlbMF0uZXhwcmVzc2lvbi5wYXJhbXMuZm9yRWFjaChmdW5jdGlvbiAocGFyYW0pIHtcbiAgICBwYXJhbXMucHVzaChwYXJhbS5uYW1lKTtcbiAgfSk7XG5cbiAgYm9keSA9IGFzdC5ib2R5WzBdLmV4cHJlc3Npb24uYm9keS5yYW5nZTtcblxuICAvLyBFc3ByaW1hJ3MgcmFuZ2VzIGluY2x1ZGUgdGhlIGZpcnN0ICd7JyBhbmQgdGhlIGxhc3QgJ30nIGNoYXJhY3RlcnMgb25cbiAgLy8gZnVuY3Rpb24gZXhwcmVzc2lvbnMuIFNvIGN1dCB0aGVtIG91dC5cbiAgaWYgKGFzdC5ib2R5WzBdLmV4cHJlc3Npb24uYm9keS50eXBlID09PSAnQmxvY2tTdGF0ZW1lbnQnKSB7XG4gICAgLyplc2xpbnQtZGlzYWJsZSBuby1uZXctZnVuYyovXG4gICAgcmV0dXJuIG5ldyBGdW5jdGlvbihwYXJhbXMsIHNvdXJjZS5zbGljZShib2R5WzBdICsgMSwgYm9keVsxXSAtIDEpKTtcbiAgfVxuICAvLyBFUzYgYXJyb3cgZnVuY3Rpb25zIGNhbiBvbWl0IHRoZSBCbG9ja1N0YXRlbWVudC4gSW4gdGhhdCBjYXNlLCBqdXN0IHJldHVyblxuICAvLyB0aGUgYm9keS5cbiAgLyplc2xpbnQtZGlzYWJsZSBuby1uZXctZnVuYyovXG4gIHJldHVybiBuZXcgRnVuY3Rpb24ocGFyYW1zLCAncmV0dXJuICcgKyBzb3VyY2Uuc2xpY2UoYm9keVswXSwgYm9keVsxXSkpO1xufVxuXG5mdW5jdGlvbiByZXByZXNlbnRKYXZhc2NyaXB0RnVuY3Rpb24ob2JqZWN0IC8qLCBzdHlsZSovKSB7XG4gIHJldHVybiBvYmplY3QudG9TdHJpbmcoKTtcbn1cblxuZnVuY3Rpb24gaXNGdW5jdGlvbihvYmplY3QpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmplY3QpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBUeXBlKCd0YWc6eWFtbC5vcmcsMjAwMjpqcy9mdW5jdGlvbicsIHtcbiAga2luZDogJ3NjYWxhcicsXG4gIHJlc29sdmU6IHJlc29sdmVKYXZhc2NyaXB0RnVuY3Rpb24sXG4gIGNvbnN0cnVjdDogY29uc3RydWN0SmF2YXNjcmlwdEZ1bmN0aW9uLFxuICBwcmVkaWNhdGU6IGlzRnVuY3Rpb24sXG4gIHJlcHJlc2VudDogcmVwcmVzZW50SmF2YXNjcmlwdEZ1bmN0aW9uXG59KTtcbiIsICIvLyBKUy1ZQU1MJ3MgZGVmYXVsdCBzY2hlbWEgZm9yIGBsb2FkYCBmdW5jdGlvbi5cbi8vIEl0IGlzIG5vdCBkZXNjcmliZWQgaW4gdGhlIFlBTUwgc3BlY2lmaWNhdGlvbi5cbi8vXG4vLyBUaGlzIHNjaGVtYSBpcyBiYXNlZCBvbiBKUy1ZQU1MJ3MgZGVmYXVsdCBzYWZlIHNjaGVtYSBhbmQgaW5jbHVkZXNcbi8vIEphdmFTY3JpcHQtc3BlY2lmaWMgdHlwZXM6ICEhanMvdW5kZWZpbmVkLCAhIWpzL3JlZ2V4cCBhbmQgISFqcy9mdW5jdGlvbi5cbi8vXG4vLyBBbHNvIHRoaXMgc2NoZW1hIGlzIHVzZWQgYXMgZGVmYXVsdCBiYXNlIHNjaGVtYSBhdCBgU2NoZW1hLmNyZWF0ZWAgZnVuY3Rpb24uXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG5cbnZhciBTY2hlbWEgPSByZXF1aXJlKCcuLi9zY2hlbWEnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFNjaGVtYS5ERUZBVUxUID0gbmV3IFNjaGVtYSh7XG4gIGluY2x1ZGU6IFtcbiAgICByZXF1aXJlKCcuL2RlZmF1bHRfc2FmZScpXG4gIF0sXG4gIGV4cGxpY2l0OiBbXG4gICAgcmVxdWlyZSgnLi4vdHlwZS9qcy91bmRlZmluZWQnKSxcbiAgICByZXF1aXJlKCcuLi90eXBlL2pzL3JlZ2V4cCcpLFxuICAgIHJlcXVpcmUoJy4uL3R5cGUvanMvZnVuY3Rpb24nKVxuICBdXG59KTtcbiIsICIndXNlIHN0cmljdCc7XG5cbi8qZXNsaW50LWRpc2FibGUgbWF4LWxlbixuby11c2UtYmVmb3JlLWRlZmluZSovXG5cbnZhciBjb21tb24gICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9jb21tb24nKTtcbnZhciBZQU1MRXhjZXB0aW9uICAgICAgID0gcmVxdWlyZSgnLi9leGNlcHRpb24nKTtcbnZhciBNYXJrICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9tYXJrJyk7XG52YXIgREVGQVVMVF9TQUZFX1NDSEVNQSA9IHJlcXVpcmUoJy4vc2NoZW1hL2RlZmF1bHRfc2FmZScpO1xudmFyIERFRkFVTFRfRlVMTF9TQ0hFTUEgPSByZXF1aXJlKCcuL3NjaGVtYS9kZWZhdWx0X2Z1bGwnKTtcblxuXG52YXIgX2hhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuXG52YXIgQ09OVEVYVF9GTE9XX0lOICAgPSAxO1xudmFyIENPTlRFWFRfRkxPV19PVVQgID0gMjtcbnZhciBDT05URVhUX0JMT0NLX0lOICA9IDM7XG52YXIgQ09OVEVYVF9CTE9DS19PVVQgPSA0O1xuXG5cbnZhciBDSE9NUElOR19DTElQICA9IDE7XG52YXIgQ0hPTVBJTkdfU1RSSVAgPSAyO1xudmFyIENIT01QSU5HX0tFRVAgID0gMztcblxuXG52YXIgUEFUVEVSTl9OT05fUFJJTlRBQkxFICAgICAgICAgPSAvW1xceDAwLVxceDA4XFx4MEJcXHgwQ1xceDBFLVxceDFGXFx4N0YtXFx4ODRcXHg4Ni1cXHg5RlxcdUZGRkVcXHVGRkZGXXxbXFx1RDgwMC1cXHVEQkZGXSg/IVtcXHVEQzAwLVxcdURGRkZdKXwoPzpbXlxcdUQ4MDAtXFx1REJGRl18XilbXFx1REMwMC1cXHVERkZGXS87XG52YXIgUEFUVEVSTl9OT05fQVNDSUlfTElORV9CUkVBS1MgPSAvW1xceDg1XFx1MjAyOFxcdTIwMjldLztcbnZhciBQQVRURVJOX0ZMT1dfSU5ESUNBVE9SUyAgICAgICA9IC9bLFxcW1xcXVxce1xcfV0vO1xudmFyIFBBVFRFUk5fVEFHX0hBTkRMRSAgICAgICAgICAgID0gL14oPzohfCEhfCFbYS16XFwtXSshKSQvaTtcbnZhciBQQVRURVJOX1RBR19VUkkgICAgICAgICAgICAgICA9IC9eKD86IXxbXixcXFtcXF1cXHtcXH1dKSg/OiVbMC05YS1mXXsyfXxbMC05YS16XFwtIztcXC9cXD86QCY9XFwrXFwkLF9cXC4hflxcKidcXChcXClcXFtcXF1dKSokL2k7XG5cblxuZnVuY3Rpb24gX2NsYXNzKG9iaikgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaik7IH1cblxuZnVuY3Rpb24gaXNfRU9MKGMpIHtcbiAgcmV0dXJuIChjID09PSAweDBBLyogTEYgKi8pIHx8IChjID09PSAweDBELyogQ1IgKi8pO1xufVxuXG5mdW5jdGlvbiBpc19XSElURV9TUEFDRShjKSB7XG4gIHJldHVybiAoYyA9PT0gMHgwOS8qIFRhYiAqLykgfHwgKGMgPT09IDB4MjAvKiBTcGFjZSAqLyk7XG59XG5cbmZ1bmN0aW9uIGlzX1dTX09SX0VPTChjKSB7XG4gIHJldHVybiAoYyA9PT0gMHgwOS8qIFRhYiAqLykgfHxcbiAgICAgICAgIChjID09PSAweDIwLyogU3BhY2UgKi8pIHx8XG4gICAgICAgICAoYyA9PT0gMHgwQS8qIExGICovKSB8fFxuICAgICAgICAgKGMgPT09IDB4MEQvKiBDUiAqLyk7XG59XG5cbmZ1bmN0aW9uIGlzX0ZMT1dfSU5ESUNBVE9SKGMpIHtcbiAgcmV0dXJuIGMgPT09IDB4MkMvKiAsICovIHx8XG4gICAgICAgICBjID09PSAweDVCLyogWyAqLyB8fFxuICAgICAgICAgYyA9PT0gMHg1RC8qIF0gKi8gfHxcbiAgICAgICAgIGMgPT09IDB4N0IvKiB7ICovIHx8XG4gICAgICAgICBjID09PSAweDdELyogfSAqLztcbn1cblxuZnVuY3Rpb24gZnJvbUhleENvZGUoYykge1xuICB2YXIgbGM7XG5cbiAgaWYgKCgweDMwLyogMCAqLyA8PSBjKSAmJiAoYyA8PSAweDM5LyogOSAqLykpIHtcbiAgICByZXR1cm4gYyAtIDB4MzA7XG4gIH1cblxuICAvKmVzbGludC1kaXNhYmxlIG5vLWJpdHdpc2UqL1xuICBsYyA9IGMgfCAweDIwO1xuXG4gIGlmICgoMHg2MS8qIGEgKi8gPD0gbGMpICYmIChsYyA8PSAweDY2LyogZiAqLykpIHtcbiAgICByZXR1cm4gbGMgLSAweDYxICsgMTA7XG4gIH1cblxuICByZXR1cm4gLTE7XG59XG5cbmZ1bmN0aW9uIGVzY2FwZWRIZXhMZW4oYykge1xuICBpZiAoYyA9PT0gMHg3OC8qIHggKi8pIHsgcmV0dXJuIDI7IH1cbiAgaWYgKGMgPT09IDB4NzUvKiB1ICovKSB7IHJldHVybiA0OyB9XG4gIGlmIChjID09PSAweDU1LyogVSAqLykgeyByZXR1cm4gODsgfVxuICByZXR1cm4gMDtcbn1cblxuZnVuY3Rpb24gZnJvbURlY2ltYWxDb2RlKGMpIHtcbiAgaWYgKCgweDMwLyogMCAqLyA8PSBjKSAmJiAoYyA8PSAweDM5LyogOSAqLykpIHtcbiAgICByZXR1cm4gYyAtIDB4MzA7XG4gIH1cblxuICByZXR1cm4gLTE7XG59XG5cbmZ1bmN0aW9uIHNpbXBsZUVzY2FwZVNlcXVlbmNlKGMpIHtcbiAgLyogZXNsaW50LWRpc2FibGUgaW5kZW50ICovXG4gIHJldHVybiAoYyA9PT0gMHgzMC8qIDAgKi8pID8gJ1xceDAwJyA6XG4gICAgICAgIChjID09PSAweDYxLyogYSAqLykgPyAnXFx4MDcnIDpcbiAgICAgICAgKGMgPT09IDB4NjIvKiBiICovKSA/ICdcXHgwOCcgOlxuICAgICAgICAoYyA9PT0gMHg3NC8qIHQgKi8pID8gJ1xceDA5JyA6XG4gICAgICAgIChjID09PSAweDA5LyogVGFiICovKSA/ICdcXHgwOScgOlxuICAgICAgICAoYyA9PT0gMHg2RS8qIG4gKi8pID8gJ1xceDBBJyA6XG4gICAgICAgIChjID09PSAweDc2LyogdiAqLykgPyAnXFx4MEInIDpcbiAgICAgICAgKGMgPT09IDB4NjYvKiBmICovKSA/ICdcXHgwQycgOlxuICAgICAgICAoYyA9PT0gMHg3Mi8qIHIgKi8pID8gJ1xceDBEJyA6XG4gICAgICAgIChjID09PSAweDY1LyogZSAqLykgPyAnXFx4MUInIDpcbiAgICAgICAgKGMgPT09IDB4MjAvKiBTcGFjZSAqLykgPyAnICcgOlxuICAgICAgICAoYyA9PT0gMHgyMi8qIFwiICovKSA/ICdcXHgyMicgOlxuICAgICAgICAoYyA9PT0gMHgyRi8qIC8gKi8pID8gJy8nIDpcbiAgICAgICAgKGMgPT09IDB4NUMvKiBcXCAqLykgPyAnXFx4NUMnIDpcbiAgICAgICAgKGMgPT09IDB4NEUvKiBOICovKSA/ICdcXHg4NScgOlxuICAgICAgICAoYyA9PT0gMHg1Ri8qIF8gKi8pID8gJ1xceEEwJyA6XG4gICAgICAgIChjID09PSAweDRDLyogTCAqLykgPyAnXFx1MjAyOCcgOlxuICAgICAgICAoYyA9PT0gMHg1MC8qIFAgKi8pID8gJ1xcdTIwMjknIDogJyc7XG59XG5cbmZ1bmN0aW9uIGNoYXJGcm9tQ29kZXBvaW50KGMpIHtcbiAgaWYgKGMgPD0gMHhGRkZGKSB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoYyk7XG4gIH1cbiAgLy8gRW5jb2RlIFVURi0xNiBzdXJyb2dhdGUgcGFpclxuICAvLyBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9VVEYtMTYjQ29kZV9wb2ludHNfVS4yQjAxMDAwMF90b19VLjJCMTBGRkZGXG4gIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKFxuICAgICgoYyAtIDB4MDEwMDAwKSA+PiAxMCkgKyAweEQ4MDAsXG4gICAgKChjIC0gMHgwMTAwMDApICYgMHgwM0ZGKSArIDB4REMwMFxuICApO1xufVxuXG4vLyBzZXQgYSBwcm9wZXJ0eSBvZiBhIGxpdGVyYWwgb2JqZWN0LCB3aGlsZSBwcm90ZWN0aW5nIGFnYWluc3QgcHJvdG90eXBlIHBvbGx1dGlvbixcbi8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vbm9kZWNhL2pzLXlhbWwvaXNzdWVzLzE2NCBmb3IgbW9yZSBkZXRhaWxzXG5mdW5jdGlvbiBzZXRQcm9wZXJ0eShvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgLy8gdXNlZCBmb3IgdGhpcyBzcGVjaWZpYyBrZXkgb25seSBiZWNhdXNlIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBpcyBzbG93XG4gIGlmIChrZXkgPT09ICdfX3Byb3RvX18nKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdCwga2V5LCB7XG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICB2YWx1ZTogdmFsdWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICB9XG59XG5cbnZhciBzaW1wbGVFc2NhcGVDaGVjayA9IG5ldyBBcnJheSgyNTYpOyAvLyBpbnRlZ2VyLCBmb3IgZmFzdCBhY2Nlc3NcbnZhciBzaW1wbGVFc2NhcGVNYXAgPSBuZXcgQXJyYXkoMjU2KTtcbmZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcbiAgc2ltcGxlRXNjYXBlQ2hlY2tbaV0gPSBzaW1wbGVFc2NhcGVTZXF1ZW5jZShpKSA/IDEgOiAwO1xuICBzaW1wbGVFc2NhcGVNYXBbaV0gPSBzaW1wbGVFc2NhcGVTZXF1ZW5jZShpKTtcbn1cblxuXG5mdW5jdGlvbiBTdGF0ZShpbnB1dCwgb3B0aW9ucykge1xuICB0aGlzLmlucHV0ID0gaW5wdXQ7XG5cbiAgdGhpcy5maWxlbmFtZSAgPSBvcHRpb25zWydmaWxlbmFtZSddICB8fCBudWxsO1xuICB0aGlzLnNjaGVtYSAgICA9IG9wdGlvbnNbJ3NjaGVtYSddICAgIHx8IERFRkFVTFRfRlVMTF9TQ0hFTUE7XG4gIHRoaXMub25XYXJuaW5nID0gb3B0aW9uc1snb25XYXJuaW5nJ10gfHwgbnVsbDtcbiAgdGhpcy5sZWdhY3kgICAgPSBvcHRpb25zWydsZWdhY3knXSAgICB8fCBmYWxzZTtcbiAgdGhpcy5qc29uICAgICAgPSBvcHRpb25zWydqc29uJ10gICAgICB8fCBmYWxzZTtcbiAgdGhpcy5saXN0ZW5lciAgPSBvcHRpb25zWydsaXN0ZW5lciddICB8fCBudWxsO1xuXG4gIHRoaXMuaW1wbGljaXRUeXBlcyA9IHRoaXMuc2NoZW1hLmNvbXBpbGVkSW1wbGljaXQ7XG4gIHRoaXMudHlwZU1hcCAgICAgICA9IHRoaXMuc2NoZW1hLmNvbXBpbGVkVHlwZU1hcDtcblxuICB0aGlzLmxlbmd0aCAgICAgPSBpbnB1dC5sZW5ndGg7XG4gIHRoaXMucG9zaXRpb24gICA9IDA7XG4gIHRoaXMubGluZSAgICAgICA9IDA7XG4gIHRoaXMubGluZVN0YXJ0ICA9IDA7XG4gIHRoaXMubGluZUluZGVudCA9IDA7XG5cbiAgdGhpcy5kb2N1bWVudHMgPSBbXTtcblxuICAvKlxuICB0aGlzLnZlcnNpb247XG4gIHRoaXMuY2hlY2tMaW5lQnJlYWtzO1xuICB0aGlzLnRhZ01hcDtcbiAgdGhpcy5hbmNob3JNYXA7XG4gIHRoaXMudGFnO1xuICB0aGlzLmFuY2hvcjtcbiAgdGhpcy5raW5kO1xuICB0aGlzLnJlc3VsdDsqL1xuXG59XG5cblxuZnVuY3Rpb24gZ2VuZXJhdGVFcnJvcihzdGF0ZSwgbWVzc2FnZSkge1xuICByZXR1cm4gbmV3IFlBTUxFeGNlcHRpb24oXG4gICAgbWVzc2FnZSxcbiAgICBuZXcgTWFyayhzdGF0ZS5maWxlbmFtZSwgc3RhdGUuaW5wdXQsIHN0YXRlLnBvc2l0aW9uLCBzdGF0ZS5saW5lLCAoc3RhdGUucG9zaXRpb24gLSBzdGF0ZS5saW5lU3RhcnQpKSk7XG59XG5cbmZ1bmN0aW9uIHRocm93RXJyb3Ioc3RhdGUsIG1lc3NhZ2UpIHtcbiAgdGhyb3cgZ2VuZXJhdGVFcnJvcihzdGF0ZSwgbWVzc2FnZSk7XG59XG5cbmZ1bmN0aW9uIHRocm93V2FybmluZyhzdGF0ZSwgbWVzc2FnZSkge1xuICBpZiAoc3RhdGUub25XYXJuaW5nKSB7XG4gICAgc3RhdGUub25XYXJuaW5nLmNhbGwobnVsbCwgZ2VuZXJhdGVFcnJvcihzdGF0ZSwgbWVzc2FnZSkpO1xuICB9XG59XG5cblxudmFyIGRpcmVjdGl2ZUhhbmRsZXJzID0ge1xuXG4gIFlBTUw6IGZ1bmN0aW9uIGhhbmRsZVlhbWxEaXJlY3RpdmUoc3RhdGUsIG5hbWUsIGFyZ3MpIHtcblxuICAgIHZhciBtYXRjaCwgbWFqb3IsIG1pbm9yO1xuXG4gICAgaWYgKHN0YXRlLnZlcnNpb24gIT09IG51bGwpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdkdXBsaWNhdGlvbiBvZiAlWUFNTCBkaXJlY3RpdmUnKTtcbiAgICB9XG5cbiAgICBpZiAoYXJncy5sZW5ndGggIT09IDEpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdZQU1MIGRpcmVjdGl2ZSBhY2NlcHRzIGV4YWN0bHkgb25lIGFyZ3VtZW50Jyk7XG4gICAgfVxuXG4gICAgbWF0Y2ggPSAvXihbMC05XSspXFwuKFswLTldKykkLy5leGVjKGFyZ3NbMF0pO1xuXG4gICAgaWYgKG1hdGNoID09PSBudWxsKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnaWxsLWZvcm1lZCBhcmd1bWVudCBvZiB0aGUgWUFNTCBkaXJlY3RpdmUnKTtcbiAgICB9XG5cbiAgICBtYWpvciA9IHBhcnNlSW50KG1hdGNoWzFdLCAxMCk7XG4gICAgbWlub3IgPSBwYXJzZUludChtYXRjaFsyXSwgMTApO1xuXG4gICAgaWYgKG1ham9yICE9PSAxKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAndW5hY2NlcHRhYmxlIFlBTUwgdmVyc2lvbiBvZiB0aGUgZG9jdW1lbnQnKTtcbiAgICB9XG5cbiAgICBzdGF0ZS52ZXJzaW9uID0gYXJnc1swXTtcbiAgICBzdGF0ZS5jaGVja0xpbmVCcmVha3MgPSAobWlub3IgPCAyKTtcblxuICAgIGlmIChtaW5vciAhPT0gMSAmJiBtaW5vciAhPT0gMikge1xuICAgICAgdGhyb3dXYXJuaW5nKHN0YXRlLCAndW5zdXBwb3J0ZWQgWUFNTCB2ZXJzaW9uIG9mIHRoZSBkb2N1bWVudCcpO1xuICAgIH1cbiAgfSxcblxuICBUQUc6IGZ1bmN0aW9uIGhhbmRsZVRhZ0RpcmVjdGl2ZShzdGF0ZSwgbmFtZSwgYXJncykge1xuXG4gICAgdmFyIGhhbmRsZSwgcHJlZml4O1xuXG4gICAgaWYgKGFyZ3MubGVuZ3RoICE9PSAyKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnVEFHIGRpcmVjdGl2ZSBhY2NlcHRzIGV4YWN0bHkgdHdvIGFyZ3VtZW50cycpO1xuICAgIH1cblxuICAgIGhhbmRsZSA9IGFyZ3NbMF07XG4gICAgcHJlZml4ID0gYXJnc1sxXTtcblxuICAgIGlmICghUEFUVEVSTl9UQUdfSEFORExFLnRlc3QoaGFuZGxlKSkge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2lsbC1mb3JtZWQgdGFnIGhhbmRsZSAoZmlyc3QgYXJndW1lbnQpIG9mIHRoZSBUQUcgZGlyZWN0aXZlJyk7XG4gICAgfVxuXG4gICAgaWYgKF9oYXNPd25Qcm9wZXJ0eS5jYWxsKHN0YXRlLnRhZ01hcCwgaGFuZGxlKSkge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3RoZXJlIGlzIGEgcHJldmlvdXNseSBkZWNsYXJlZCBzdWZmaXggZm9yIFwiJyArIGhhbmRsZSArICdcIiB0YWcgaGFuZGxlJyk7XG4gICAgfVxuXG4gICAgaWYgKCFQQVRURVJOX1RBR19VUkkudGVzdChwcmVmaXgpKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnaWxsLWZvcm1lZCB0YWcgcHJlZml4IChzZWNvbmQgYXJndW1lbnQpIG9mIHRoZSBUQUcgZGlyZWN0aXZlJyk7XG4gICAgfVxuXG4gICAgc3RhdGUudGFnTWFwW2hhbmRsZV0gPSBwcmVmaXg7XG4gIH1cbn07XG5cblxuZnVuY3Rpb24gY2FwdHVyZVNlZ21lbnQoc3RhdGUsIHN0YXJ0LCBlbmQsIGNoZWNrSnNvbikge1xuICB2YXIgX3Bvc2l0aW9uLCBfbGVuZ3RoLCBfY2hhcmFjdGVyLCBfcmVzdWx0O1xuXG4gIGlmIChzdGFydCA8IGVuZCkge1xuICAgIF9yZXN1bHQgPSBzdGF0ZS5pbnB1dC5zbGljZShzdGFydCwgZW5kKTtcblxuICAgIGlmIChjaGVja0pzb24pIHtcbiAgICAgIGZvciAoX3Bvc2l0aW9uID0gMCwgX2xlbmd0aCA9IF9yZXN1bHQubGVuZ3RoOyBfcG9zaXRpb24gPCBfbGVuZ3RoOyBfcG9zaXRpb24gKz0gMSkge1xuICAgICAgICBfY2hhcmFjdGVyID0gX3Jlc3VsdC5jaGFyQ29kZUF0KF9wb3NpdGlvbik7XG4gICAgICAgIGlmICghKF9jaGFyYWN0ZXIgPT09IDB4MDkgfHxcbiAgICAgICAgICAgICAgKDB4MjAgPD0gX2NoYXJhY3RlciAmJiBfY2hhcmFjdGVyIDw9IDB4MTBGRkZGKSkpIHtcbiAgICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnZXhwZWN0ZWQgdmFsaWQgSlNPTiBjaGFyYWN0ZXInKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoUEFUVEVSTl9OT05fUFJJTlRBQkxFLnRlc3QoX3Jlc3VsdCkpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICd0aGUgc3RyZWFtIGNvbnRhaW5zIG5vbi1wcmludGFibGUgY2hhcmFjdGVycycpO1xuICAgIH1cblxuICAgIHN0YXRlLnJlc3VsdCArPSBfcmVzdWx0O1xuICB9XG59XG5cbmZ1bmN0aW9uIG1lcmdlTWFwcGluZ3Moc3RhdGUsIGRlc3RpbmF0aW9uLCBzb3VyY2UsIG92ZXJyaWRhYmxlS2V5cykge1xuICB2YXIgc291cmNlS2V5cywga2V5LCBpbmRleCwgcXVhbnRpdHk7XG5cbiAgaWYgKCFjb21tb24uaXNPYmplY3Qoc291cmNlKSkge1xuICAgIHRocm93RXJyb3Ioc3RhdGUsICdjYW5ub3QgbWVyZ2UgbWFwcGluZ3M7IHRoZSBwcm92aWRlZCBzb3VyY2Ugb2JqZWN0IGlzIHVuYWNjZXB0YWJsZScpO1xuICB9XG5cbiAgc291cmNlS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG5cbiAgZm9yIChpbmRleCA9IDAsIHF1YW50aXR5ID0gc291cmNlS2V5cy5sZW5ndGg7IGluZGV4IDwgcXVhbnRpdHk7IGluZGV4ICs9IDEpIHtcbiAgICBrZXkgPSBzb3VyY2VLZXlzW2luZGV4XTtcblxuICAgIGlmICghX2hhc093blByb3BlcnR5LmNhbGwoZGVzdGluYXRpb24sIGtleSkpIHtcbiAgICAgIHNldFByb3BlcnR5KGRlc3RpbmF0aW9uLCBrZXksIHNvdXJjZVtrZXldKTtcbiAgICAgIG92ZXJyaWRhYmxlS2V5c1trZXldID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gc3RvcmVNYXBwaW5nUGFpcihzdGF0ZSwgX3Jlc3VsdCwgb3ZlcnJpZGFibGVLZXlzLCBrZXlUYWcsIGtleU5vZGUsIHZhbHVlTm9kZSwgc3RhcnRMaW5lLCBzdGFydFBvcykge1xuICB2YXIgaW5kZXgsIHF1YW50aXR5O1xuXG4gIC8vIFRoZSBvdXRwdXQgaXMgYSBwbGFpbiBvYmplY3QgaGVyZSwgc28ga2V5cyBjYW4gb25seSBiZSBzdHJpbmdzLlxuICAvLyBXZSBuZWVkIHRvIGNvbnZlcnQga2V5Tm9kZSB0byBhIHN0cmluZywgYnV0IGRvaW5nIHNvIGNhbiBoYW5nIHRoZSBwcm9jZXNzXG4gIC8vIChkZWVwbHkgbmVzdGVkIGFycmF5cyB0aGF0IGV4cGxvZGUgZXhwb25lbnRpYWxseSB1c2luZyBhbGlhc2VzKS5cbiAgaWYgKEFycmF5LmlzQXJyYXkoa2V5Tm9kZSkpIHtcbiAgICBrZXlOb2RlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoa2V5Tm9kZSk7XG5cbiAgICBmb3IgKGluZGV4ID0gMCwgcXVhbnRpdHkgPSBrZXlOb2RlLmxlbmd0aDsgaW5kZXggPCBxdWFudGl0eTsgaW5kZXggKz0gMSkge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoa2V5Tm9kZVtpbmRleF0pKSB7XG4gICAgICAgIHRocm93RXJyb3Ioc3RhdGUsICduZXN0ZWQgYXJyYXlzIGFyZSBub3Qgc3VwcG9ydGVkIGluc2lkZSBrZXlzJyk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2Yga2V5Tm9kZSA9PT0gJ29iamVjdCcgJiYgX2NsYXNzKGtleU5vZGVbaW5kZXhdKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgICAga2V5Tm9kZVtpbmRleF0gPSAnW29iamVjdCBPYmplY3RdJztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBBdm9pZCBjb2RlIGV4ZWN1dGlvbiBpbiBsb2FkKCkgdmlhIHRvU3RyaW5nIHByb3BlcnR5XG4gIC8vIChzdGlsbCB1c2UgaXRzIG93biB0b1N0cmluZyBmb3IgYXJyYXlzLCB0aW1lc3RhbXBzLFxuICAvLyBhbmQgd2hhdGV2ZXIgdXNlciBzY2hlbWEgZXh0ZW5zaW9ucyBoYXBwZW4gdG8gaGF2ZSBAQHRvU3RyaW5nVGFnKVxuICBpZiAodHlwZW9mIGtleU5vZGUgPT09ICdvYmplY3QnICYmIF9jbGFzcyhrZXlOb2RlKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICBrZXlOb2RlID0gJ1tvYmplY3QgT2JqZWN0XSc7XG4gIH1cblxuXG4gIGtleU5vZGUgPSBTdHJpbmcoa2V5Tm9kZSk7XG5cbiAgaWYgKF9yZXN1bHQgPT09IG51bGwpIHtcbiAgICBfcmVzdWx0ID0ge307XG4gIH1cblxuICBpZiAoa2V5VGFnID09PSAndGFnOnlhbWwub3JnLDIwMDI6bWVyZ2UnKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWVOb2RlKSkge1xuICAgICAgZm9yIChpbmRleCA9IDAsIHF1YW50aXR5ID0gdmFsdWVOb2RlLmxlbmd0aDsgaW5kZXggPCBxdWFudGl0eTsgaW5kZXggKz0gMSkge1xuICAgICAgICBtZXJnZU1hcHBpbmdzKHN0YXRlLCBfcmVzdWx0LCB2YWx1ZU5vZGVbaW5kZXhdLCBvdmVycmlkYWJsZUtleXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBtZXJnZU1hcHBpbmdzKHN0YXRlLCBfcmVzdWx0LCB2YWx1ZU5vZGUsIG92ZXJyaWRhYmxlS2V5cyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmICghc3RhdGUuanNvbiAmJlxuICAgICAgICAhX2hhc093blByb3BlcnR5LmNhbGwob3ZlcnJpZGFibGVLZXlzLCBrZXlOb2RlKSAmJlxuICAgICAgICBfaGFzT3duUHJvcGVydHkuY2FsbChfcmVzdWx0LCBrZXlOb2RlKSkge1xuICAgICAgc3RhdGUubGluZSA9IHN0YXJ0TGluZSB8fCBzdGF0ZS5saW5lO1xuICAgICAgc3RhdGUucG9zaXRpb24gPSBzdGFydFBvcyB8fCBzdGF0ZS5wb3NpdGlvbjtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdkdXBsaWNhdGVkIG1hcHBpbmcga2V5Jyk7XG4gICAgfVxuICAgIHNldFByb3BlcnR5KF9yZXN1bHQsIGtleU5vZGUsIHZhbHVlTm9kZSk7XG4gICAgZGVsZXRlIG92ZXJyaWRhYmxlS2V5c1trZXlOb2RlXTtcbiAgfVxuXG4gIHJldHVybiBfcmVzdWx0O1xufVxuXG5mdW5jdGlvbiByZWFkTGluZUJyZWFrKHN0YXRlKSB7XG4gIHZhciBjaDtcblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gIGlmIChjaCA9PT0gMHgwQS8qIExGICovKSB7XG4gICAgc3RhdGUucG9zaXRpb24rKztcbiAgfSBlbHNlIGlmIChjaCA9PT0gMHgwRC8qIENSICovKSB7XG4gICAgc3RhdGUucG9zaXRpb24rKztcbiAgICBpZiAoc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbikgPT09IDB4MEEvKiBMRiAqLykge1xuICAgICAgc3RhdGUucG9zaXRpb24rKztcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2EgbGluZSBicmVhayBpcyBleHBlY3RlZCcpO1xuICB9XG5cbiAgc3RhdGUubGluZSArPSAxO1xuICBzdGF0ZS5saW5lU3RhcnQgPSBzdGF0ZS5wb3NpdGlvbjtcbn1cblxuZnVuY3Rpb24gc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgYWxsb3dDb21tZW50cywgY2hlY2tJbmRlbnQpIHtcbiAgdmFyIGxpbmVCcmVha3MgPSAwLFxuICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICB3aGlsZSAoY2ggIT09IDApIHtcbiAgICB3aGlsZSAoaXNfV0hJVEVfU1BBQ0UoY2gpKSB7XG4gICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gICAgfVxuXG4gICAgaWYgKGFsbG93Q29tbWVudHMgJiYgY2ggPT09IDB4MjMvKiAjICovKSB7XG4gICAgICBkbyB7XG4gICAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgICAgIH0gd2hpbGUgKGNoICE9PSAweDBBLyogTEYgKi8gJiYgY2ggIT09IDB4MEQvKiBDUiAqLyAmJiBjaCAhPT0gMCk7XG4gICAgfVxuXG4gICAgaWYgKGlzX0VPTChjaCkpIHtcbiAgICAgIHJlYWRMaW5lQnJlYWsoc3RhdGUpO1xuXG4gICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuICAgICAgbGluZUJyZWFrcysrO1xuICAgICAgc3RhdGUubGluZUluZGVudCA9IDA7XG5cbiAgICAgIHdoaWxlIChjaCA9PT0gMHgyMC8qIFNwYWNlICovKSB7XG4gICAgICAgIHN0YXRlLmxpbmVJbmRlbnQrKztcbiAgICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBpZiAoY2hlY2tJbmRlbnQgIT09IC0xICYmIGxpbmVCcmVha3MgIT09IDAgJiYgc3RhdGUubGluZUluZGVudCA8IGNoZWNrSW5kZW50KSB7XG4gICAgdGhyb3dXYXJuaW5nKHN0YXRlLCAnZGVmaWNpZW50IGluZGVudGF0aW9uJyk7XG4gIH1cblxuICByZXR1cm4gbGluZUJyZWFrcztcbn1cblxuZnVuY3Rpb24gdGVzdERvY3VtZW50U2VwYXJhdG9yKHN0YXRlKSB7XG4gIHZhciBfcG9zaXRpb24gPSBzdGF0ZS5wb3NpdGlvbixcbiAgICAgIGNoO1xuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChfcG9zaXRpb24pO1xuXG4gIC8vIENvbmRpdGlvbiBzdGF0ZS5wb3NpdGlvbiA9PT0gc3RhdGUubGluZVN0YXJ0IGlzIHRlc3RlZFxuICAvLyBpbiBwYXJlbnQgb24gZWFjaCBjYWxsLCBmb3IgZWZmaWNpZW5jeS4gTm8gbmVlZHMgdG8gdGVzdCBoZXJlIGFnYWluLlxuICBpZiAoKGNoID09PSAweDJELyogLSAqLyB8fCBjaCA9PT0gMHgyRS8qIC4gKi8pICYmXG4gICAgICBjaCA9PT0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChfcG9zaXRpb24gKyAxKSAmJlxuICAgICAgY2ggPT09IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoX3Bvc2l0aW9uICsgMikpIHtcblxuICAgIF9wb3NpdGlvbiArPSAzO1xuXG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KF9wb3NpdGlvbik7XG5cbiAgICBpZiAoY2ggPT09IDAgfHwgaXNfV1NfT1JfRU9MKGNoKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiB3cml0ZUZvbGRlZExpbmVzKHN0YXRlLCBjb3VudCkge1xuICBpZiAoY291bnQgPT09IDEpIHtcbiAgICBzdGF0ZS5yZXN1bHQgKz0gJyAnO1xuICB9IGVsc2UgaWYgKGNvdW50ID4gMSkge1xuICAgIHN0YXRlLnJlc3VsdCArPSBjb21tb24ucmVwZWF0KCdcXG4nLCBjb3VudCAtIDEpO1xuICB9XG59XG5cblxuZnVuY3Rpb24gcmVhZFBsYWluU2NhbGFyKHN0YXRlLCBub2RlSW5kZW50LCB3aXRoaW5GbG93Q29sbGVjdGlvbikge1xuICB2YXIgcHJlY2VkaW5nLFxuICAgICAgZm9sbG93aW5nLFxuICAgICAgY2FwdHVyZVN0YXJ0LFxuICAgICAgY2FwdHVyZUVuZCxcbiAgICAgIGhhc1BlbmRpbmdDb250ZW50LFxuICAgICAgX2xpbmUsXG4gICAgICBfbGluZVN0YXJ0LFxuICAgICAgX2xpbmVJbmRlbnQsXG4gICAgICBfa2luZCA9IHN0YXRlLmtpbmQsXG4gICAgICBfcmVzdWx0ID0gc3RhdGUucmVzdWx0LFxuICAgICAgY2g7XG5cbiAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICBpZiAoaXNfV1NfT1JfRU9MKGNoKSAgICAgIHx8XG4gICAgICBpc19GTE9XX0lORElDQVRPUihjaCkgfHxcbiAgICAgIGNoID09PSAweDIzLyogIyAqLyAgICB8fFxuICAgICAgY2ggPT09IDB4MjYvKiAmICovICAgIHx8XG4gICAgICBjaCA9PT0gMHgyQS8qICogKi8gICAgfHxcbiAgICAgIGNoID09PSAweDIxLyogISAqLyAgICB8fFxuICAgICAgY2ggPT09IDB4N0MvKiB8ICovICAgIHx8XG4gICAgICBjaCA9PT0gMHgzRS8qID4gKi8gICAgfHxcbiAgICAgIGNoID09PSAweDI3LyogJyAqLyAgICB8fFxuICAgICAgY2ggPT09IDB4MjIvKiBcIiAqLyAgICB8fFxuICAgICAgY2ggPT09IDB4MjUvKiAlICovICAgIHx8XG4gICAgICBjaCA9PT0gMHg0MC8qIEAgKi8gICAgfHxcbiAgICAgIGNoID09PSAweDYwLyogYCAqLykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChjaCA9PT0gMHgzRi8qID8gKi8gfHwgY2ggPT09IDB4MkQvKiAtICovKSB7XG4gICAgZm9sbG93aW5nID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbiArIDEpO1xuXG4gICAgaWYgKGlzX1dTX09SX0VPTChmb2xsb3dpbmcpIHx8XG4gICAgICAgIHdpdGhpbkZsb3dDb2xsZWN0aW9uICYmIGlzX0ZMT1dfSU5ESUNBVE9SKGZvbGxvd2luZykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBzdGF0ZS5raW5kID0gJ3NjYWxhcic7XG4gIHN0YXRlLnJlc3VsdCA9ICcnO1xuICBjYXB0dXJlU3RhcnQgPSBjYXB0dXJlRW5kID0gc3RhdGUucG9zaXRpb247XG4gIGhhc1BlbmRpbmdDb250ZW50ID0gZmFsc2U7XG5cbiAgd2hpbGUgKGNoICE9PSAwKSB7XG4gICAgaWYgKGNoID09PSAweDNBLyogOiAqLykge1xuICAgICAgZm9sbG93aW5nID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbiArIDEpO1xuXG4gICAgICBpZiAoaXNfV1NfT1JfRU9MKGZvbGxvd2luZykgfHxcbiAgICAgICAgICB3aXRoaW5GbG93Q29sbGVjdGlvbiAmJiBpc19GTE9XX0lORElDQVRPUihmb2xsb3dpbmcpKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIGlmIChjaCA9PT0gMHgyMy8qICMgKi8pIHtcbiAgICAgIHByZWNlZGluZyA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24gLSAxKTtcblxuICAgICAgaWYgKGlzX1dTX09SX0VPTChwcmVjZWRpbmcpKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIGlmICgoc3RhdGUucG9zaXRpb24gPT09IHN0YXRlLmxpbmVTdGFydCAmJiB0ZXN0RG9jdW1lbnRTZXBhcmF0b3Ioc3RhdGUpKSB8fFxuICAgICAgICAgICAgICAgd2l0aGluRmxvd0NvbGxlY3Rpb24gJiYgaXNfRkxPV19JTkRJQ0FUT1IoY2gpKSB7XG4gICAgICBicmVhaztcblxuICAgIH0gZWxzZSBpZiAoaXNfRU9MKGNoKSkge1xuICAgICAgX2xpbmUgPSBzdGF0ZS5saW5lO1xuICAgICAgX2xpbmVTdGFydCA9IHN0YXRlLmxpbmVTdGFydDtcbiAgICAgIF9saW5lSW5kZW50ID0gc3RhdGUubGluZUluZGVudDtcbiAgICAgIHNraXBTZXBhcmF0aW9uU3BhY2Uoc3RhdGUsIGZhbHNlLCAtMSk7XG5cbiAgICAgIGlmIChzdGF0ZS5saW5lSW5kZW50ID49IG5vZGVJbmRlbnQpIHtcbiAgICAgICAgaGFzUGVuZGluZ0NvbnRlbnQgPSB0cnVlO1xuICAgICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXRlLnBvc2l0aW9uID0gY2FwdHVyZUVuZDtcbiAgICAgICAgc3RhdGUubGluZSA9IF9saW5lO1xuICAgICAgICBzdGF0ZS5saW5lU3RhcnQgPSBfbGluZVN0YXJ0O1xuICAgICAgICBzdGF0ZS5saW5lSW5kZW50ID0gX2xpbmVJbmRlbnQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChoYXNQZW5kaW5nQ29udGVudCkge1xuICAgICAgY2FwdHVyZVNlZ21lbnQoc3RhdGUsIGNhcHR1cmVTdGFydCwgY2FwdHVyZUVuZCwgZmFsc2UpO1xuICAgICAgd3JpdGVGb2xkZWRMaW5lcyhzdGF0ZSwgc3RhdGUubGluZSAtIF9saW5lKTtcbiAgICAgIGNhcHR1cmVTdGFydCA9IGNhcHR1cmVFbmQgPSBzdGF0ZS5wb3NpdGlvbjtcbiAgICAgIGhhc1BlbmRpbmdDb250ZW50ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKCFpc19XSElURV9TUEFDRShjaCkpIHtcbiAgICAgIGNhcHR1cmVFbmQgPSBzdGF0ZS5wb3NpdGlvbiArIDE7XG4gICAgfVxuXG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICB9XG5cbiAgY2FwdHVyZVNlZ21lbnQoc3RhdGUsIGNhcHR1cmVTdGFydCwgY2FwdHVyZUVuZCwgZmFsc2UpO1xuXG4gIGlmIChzdGF0ZS5yZXN1bHQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHN0YXRlLmtpbmQgPSBfa2luZDtcbiAgc3RhdGUucmVzdWx0ID0gX3Jlc3VsdDtcbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiByZWFkU2luZ2xlUXVvdGVkU2NhbGFyKHN0YXRlLCBub2RlSW5kZW50KSB7XG4gIHZhciBjaCxcbiAgICAgIGNhcHR1cmVTdGFydCwgY2FwdHVyZUVuZDtcblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gIGlmIChjaCAhPT0gMHgyNy8qICcgKi8pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdGF0ZS5raW5kID0gJ3NjYWxhcic7XG4gIHN0YXRlLnJlc3VsdCA9ICcnO1xuICBzdGF0ZS5wb3NpdGlvbisrO1xuICBjYXB0dXJlU3RhcnQgPSBjYXB0dXJlRW5kID0gc3RhdGUucG9zaXRpb247XG5cbiAgd2hpbGUgKChjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pKSAhPT0gMCkge1xuICAgIGlmIChjaCA9PT0gMHgyNy8qICcgKi8pIHtcbiAgICAgIGNhcHR1cmVTZWdtZW50KHN0YXRlLCBjYXB0dXJlU3RhcnQsIHN0YXRlLnBvc2l0aW9uLCB0cnVlKTtcbiAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcblxuICAgICAgaWYgKGNoID09PSAweDI3LyogJyAqLykge1xuICAgICAgICBjYXB0dXJlU3RhcnQgPSBzdGF0ZS5wb3NpdGlvbjtcbiAgICAgICAgc3RhdGUucG9zaXRpb24rKztcbiAgICAgICAgY2FwdHVyZUVuZCA9IHN0YXRlLnBvc2l0aW9uO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICB9IGVsc2UgaWYgKGlzX0VPTChjaCkpIHtcbiAgICAgIGNhcHR1cmVTZWdtZW50KHN0YXRlLCBjYXB0dXJlU3RhcnQsIGNhcHR1cmVFbmQsIHRydWUpO1xuICAgICAgd3JpdGVGb2xkZWRMaW5lcyhzdGF0ZSwgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgZmFsc2UsIG5vZGVJbmRlbnQpKTtcbiAgICAgIGNhcHR1cmVTdGFydCA9IGNhcHR1cmVFbmQgPSBzdGF0ZS5wb3NpdGlvbjtcblxuICAgIH0gZWxzZSBpZiAoc3RhdGUucG9zaXRpb24gPT09IHN0YXRlLmxpbmVTdGFydCAmJiB0ZXN0RG9jdW1lbnRTZXBhcmF0b3Ioc3RhdGUpKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAndW5leHBlY3RlZCBlbmQgb2YgdGhlIGRvY3VtZW50IHdpdGhpbiBhIHNpbmdsZSBxdW90ZWQgc2NhbGFyJyk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdGUucG9zaXRpb24rKztcbiAgICAgIGNhcHR1cmVFbmQgPSBzdGF0ZS5wb3NpdGlvbjtcbiAgICB9XG4gIH1cblxuICB0aHJvd0Vycm9yKHN0YXRlLCAndW5leHBlY3RlZCBlbmQgb2YgdGhlIHN0cmVhbSB3aXRoaW4gYSBzaW5nbGUgcXVvdGVkIHNjYWxhcicpO1xufVxuXG5mdW5jdGlvbiByZWFkRG91YmxlUXVvdGVkU2NhbGFyKHN0YXRlLCBub2RlSW5kZW50KSB7XG4gIHZhciBjYXB0dXJlU3RhcnQsXG4gICAgICBjYXB0dXJlRW5kLFxuICAgICAgaGV4TGVuZ3RoLFxuICAgICAgaGV4UmVzdWx0LFxuICAgICAgdG1wLFxuICAgICAgY2g7XG5cbiAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICBpZiAoY2ggIT09IDB4MjIvKiBcIiAqLykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0YXRlLmtpbmQgPSAnc2NhbGFyJztcbiAgc3RhdGUucmVzdWx0ID0gJyc7XG4gIHN0YXRlLnBvc2l0aW9uKys7XG4gIGNhcHR1cmVTdGFydCA9IGNhcHR1cmVFbmQgPSBzdGF0ZS5wb3NpdGlvbjtcblxuICB3aGlsZSAoKGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbikpICE9PSAwKSB7XG4gICAgaWYgKGNoID09PSAweDIyLyogXCIgKi8pIHtcbiAgICAgIGNhcHR1cmVTZWdtZW50KHN0YXRlLCBjYXB0dXJlU3RhcnQsIHN0YXRlLnBvc2l0aW9uLCB0cnVlKTtcbiAgICAgIHN0YXRlLnBvc2l0aW9uKys7XG4gICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIH0gZWxzZSBpZiAoY2ggPT09IDB4NUMvKiBcXCAqLykge1xuICAgICAgY2FwdHVyZVNlZ21lbnQoc3RhdGUsIGNhcHR1cmVTdGFydCwgc3RhdGUucG9zaXRpb24sIHRydWUpO1xuICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuXG4gICAgICBpZiAoaXNfRU9MKGNoKSkge1xuICAgICAgICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCBmYWxzZSwgbm9kZUluZGVudCk7XG5cbiAgICAgICAgLy8gVE9ETzogcmV3b3JrIHRvIGlubGluZSBmbiB3aXRoIG5vIHR5cGUgY2FzdD9cbiAgICAgIH0gZWxzZSBpZiAoY2ggPCAyNTYgJiYgc2ltcGxlRXNjYXBlQ2hlY2tbY2hdKSB7XG4gICAgICAgIHN0YXRlLnJlc3VsdCArPSBzaW1wbGVFc2NhcGVNYXBbY2hdO1xuICAgICAgICBzdGF0ZS5wb3NpdGlvbisrO1xuXG4gICAgICB9IGVsc2UgaWYgKCh0bXAgPSBlc2NhcGVkSGV4TGVuKGNoKSkgPiAwKSB7XG4gICAgICAgIGhleExlbmd0aCA9IHRtcDtcbiAgICAgICAgaGV4UmVzdWx0ID0gMDtcblxuICAgICAgICBmb3IgKDsgaGV4TGVuZ3RoID4gMDsgaGV4TGVuZ3RoLS0pIHtcbiAgICAgICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG5cbiAgICAgICAgICBpZiAoKHRtcCA9IGZyb21IZXhDb2RlKGNoKSkgPj0gMCkge1xuICAgICAgICAgICAgaGV4UmVzdWx0ID0gKGhleFJlc3VsdCA8PCA0KSArIHRtcDtcblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnZXhwZWN0ZWQgaGV4YWRlY2ltYWwgY2hhcmFjdGVyJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUucmVzdWx0ICs9IGNoYXJGcm9tQ29kZXBvaW50KGhleFJlc3VsdCk7XG5cbiAgICAgICAgc3RhdGUucG9zaXRpb24rKztcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3Vua25vd24gZXNjYXBlIHNlcXVlbmNlJyk7XG4gICAgICB9XG5cbiAgICAgIGNhcHR1cmVTdGFydCA9IGNhcHR1cmVFbmQgPSBzdGF0ZS5wb3NpdGlvbjtcblxuICAgIH0gZWxzZSBpZiAoaXNfRU9MKGNoKSkge1xuICAgICAgY2FwdHVyZVNlZ21lbnQoc3RhdGUsIGNhcHR1cmVTdGFydCwgY2FwdHVyZUVuZCwgdHJ1ZSk7XG4gICAgICB3cml0ZUZvbGRlZExpbmVzKHN0YXRlLCBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCBmYWxzZSwgbm9kZUluZGVudCkpO1xuICAgICAgY2FwdHVyZVN0YXJ0ID0gY2FwdHVyZUVuZCA9IHN0YXRlLnBvc2l0aW9uO1xuXG4gICAgfSBlbHNlIGlmIChzdGF0ZS5wb3NpdGlvbiA9PT0gc3RhdGUubGluZVN0YXJ0ICYmIHRlc3REb2N1bWVudFNlcGFyYXRvcihzdGF0ZSkpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICd1bmV4cGVjdGVkIGVuZCBvZiB0aGUgZG9jdW1lbnQgd2l0aGluIGEgZG91YmxlIHF1b3RlZCBzY2FsYXInKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ZS5wb3NpdGlvbisrO1xuICAgICAgY2FwdHVyZUVuZCA9IHN0YXRlLnBvc2l0aW9uO1xuICAgIH1cbiAgfVxuXG4gIHRocm93RXJyb3Ioc3RhdGUsICd1bmV4cGVjdGVkIGVuZCBvZiB0aGUgc3RyZWFtIHdpdGhpbiBhIGRvdWJsZSBxdW90ZWQgc2NhbGFyJyk7XG59XG5cbmZ1bmN0aW9uIHJlYWRGbG93Q29sbGVjdGlvbihzdGF0ZSwgbm9kZUluZGVudCkge1xuICB2YXIgcmVhZE5leHQgPSB0cnVlLFxuICAgICAgX2xpbmUsXG4gICAgICBfdGFnICAgICA9IHN0YXRlLnRhZyxcbiAgICAgIF9yZXN1bHQsXG4gICAgICBfYW5jaG9yICA9IHN0YXRlLmFuY2hvcixcbiAgICAgIGZvbGxvd2luZyxcbiAgICAgIHRlcm1pbmF0b3IsXG4gICAgICBpc1BhaXIsXG4gICAgICBpc0V4cGxpY2l0UGFpcixcbiAgICAgIGlzTWFwcGluZyxcbiAgICAgIG92ZXJyaWRhYmxlS2V5cyA9IHt9LFxuICAgICAga2V5Tm9kZSxcbiAgICAgIGtleVRhZyxcbiAgICAgIHZhbHVlTm9kZSxcbiAgICAgIGNoO1xuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG5cbiAgaWYgKGNoID09PSAweDVCLyogWyAqLykge1xuICAgIHRlcm1pbmF0b3IgPSAweDVEOy8qIF0gKi9cbiAgICBpc01hcHBpbmcgPSBmYWxzZTtcbiAgICBfcmVzdWx0ID0gW107XG4gIH0gZWxzZSBpZiAoY2ggPT09IDB4N0IvKiB7ICovKSB7XG4gICAgdGVybWluYXRvciA9IDB4N0Q7LyogfSAqL1xuICAgIGlzTWFwcGluZyA9IHRydWU7XG4gICAgX3Jlc3VsdCA9IHt9O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChzdGF0ZS5hbmNob3IgIT09IG51bGwpIHtcbiAgICBzdGF0ZS5hbmNob3JNYXBbc3RhdGUuYW5jaG9yXSA9IF9yZXN1bHQ7XG4gIH1cblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG5cbiAgd2hpbGUgKGNoICE9PSAwKSB7XG4gICAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgbm9kZUluZGVudCk7XG5cbiAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gICAgaWYgKGNoID09PSB0ZXJtaW5hdG9yKSB7XG4gICAgICBzdGF0ZS5wb3NpdGlvbisrO1xuICAgICAgc3RhdGUudGFnID0gX3RhZztcbiAgICAgIHN0YXRlLmFuY2hvciA9IF9hbmNob3I7XG4gICAgICBzdGF0ZS5raW5kID0gaXNNYXBwaW5nID8gJ21hcHBpbmcnIDogJ3NlcXVlbmNlJztcbiAgICAgIHN0YXRlLnJlc3VsdCA9IF9yZXN1bHQ7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKCFyZWFkTmV4dCkge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ21pc3NlZCBjb21tYSBiZXR3ZWVuIGZsb3cgY29sbGVjdGlvbiBlbnRyaWVzJyk7XG4gICAgfVxuXG4gICAga2V5VGFnID0ga2V5Tm9kZSA9IHZhbHVlTm9kZSA9IG51bGw7XG4gICAgaXNQYWlyID0gaXNFeHBsaWNpdFBhaXIgPSBmYWxzZTtcblxuICAgIGlmIChjaCA9PT0gMHgzRi8qID8gKi8pIHtcbiAgICAgIGZvbGxvd2luZyA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24gKyAxKTtcblxuICAgICAgaWYgKGlzX1dTX09SX0VPTChmb2xsb3dpbmcpKSB7XG4gICAgICAgIGlzUGFpciA9IGlzRXhwbGljaXRQYWlyID0gdHJ1ZTtcbiAgICAgICAgc3RhdGUucG9zaXRpb24rKztcbiAgICAgICAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgbm9kZUluZGVudCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgX2xpbmUgPSBzdGF0ZS5saW5lO1xuICAgIGNvbXBvc2VOb2RlKHN0YXRlLCBub2RlSW5kZW50LCBDT05URVhUX0ZMT1dfSU4sIGZhbHNlLCB0cnVlKTtcbiAgICBrZXlUYWcgPSBzdGF0ZS50YWc7XG4gICAga2V5Tm9kZSA9IHN0YXRlLnJlc3VsdDtcbiAgICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCBub2RlSW5kZW50KTtcblxuICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG5cbiAgICBpZiAoKGlzRXhwbGljaXRQYWlyIHx8IHN0YXRlLmxpbmUgPT09IF9saW5lKSAmJiBjaCA9PT0gMHgzQS8qIDogKi8pIHtcbiAgICAgIGlzUGFpciA9IHRydWU7XG4gICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gICAgICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCBub2RlSW5kZW50KTtcbiAgICAgIGNvbXBvc2VOb2RlKHN0YXRlLCBub2RlSW5kZW50LCBDT05URVhUX0ZMT1dfSU4sIGZhbHNlLCB0cnVlKTtcbiAgICAgIHZhbHVlTm9kZSA9IHN0YXRlLnJlc3VsdDtcbiAgICB9XG5cbiAgICBpZiAoaXNNYXBwaW5nKSB7XG4gICAgICBzdG9yZU1hcHBpbmdQYWlyKHN0YXRlLCBfcmVzdWx0LCBvdmVycmlkYWJsZUtleXMsIGtleVRhZywga2V5Tm9kZSwgdmFsdWVOb2RlKTtcbiAgICB9IGVsc2UgaWYgKGlzUGFpcikge1xuICAgICAgX3Jlc3VsdC5wdXNoKHN0b3JlTWFwcGluZ1BhaXIoc3RhdGUsIG51bGwsIG92ZXJyaWRhYmxlS2V5cywga2V5VGFnLCBrZXlOb2RlLCB2YWx1ZU5vZGUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgX3Jlc3VsdC5wdXNoKGtleU5vZGUpO1xuICAgIH1cblxuICAgIHNraXBTZXBhcmF0aW9uU3BhY2Uoc3RhdGUsIHRydWUsIG5vZGVJbmRlbnQpO1xuXG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICAgIGlmIChjaCA9PT0gMHgyQy8qICwgKi8pIHtcbiAgICAgIHJlYWROZXh0ID0gdHJ1ZTtcbiAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVhZE5leHQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICB0aHJvd0Vycm9yKHN0YXRlLCAndW5leHBlY3RlZCBlbmQgb2YgdGhlIHN0cmVhbSB3aXRoaW4gYSBmbG93IGNvbGxlY3Rpb24nKTtcbn1cblxuZnVuY3Rpb24gcmVhZEJsb2NrU2NhbGFyKHN0YXRlLCBub2RlSW5kZW50KSB7XG4gIHZhciBjYXB0dXJlU3RhcnQsXG4gICAgICBmb2xkaW5nLFxuICAgICAgY2hvbXBpbmcgICAgICAgPSBDSE9NUElOR19DTElQLFxuICAgICAgZGlkUmVhZENvbnRlbnQgPSBmYWxzZSxcbiAgICAgIGRldGVjdGVkSW5kZW50ID0gZmFsc2UsXG4gICAgICB0ZXh0SW5kZW50ICAgICA9IG5vZGVJbmRlbnQsXG4gICAgICBlbXB0eUxpbmVzICAgICA9IDAsXG4gICAgICBhdE1vcmVJbmRlbnRlZCA9IGZhbHNlLFxuICAgICAgdG1wLFxuICAgICAgY2g7XG5cbiAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICBpZiAoY2ggPT09IDB4N0MvKiB8ICovKSB7XG4gICAgZm9sZGluZyA9IGZhbHNlO1xuICB9IGVsc2UgaWYgKGNoID09PSAweDNFLyogPiAqLykge1xuICAgIGZvbGRpbmcgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0YXRlLmtpbmQgPSAnc2NhbGFyJztcbiAgc3RhdGUucmVzdWx0ID0gJyc7XG5cbiAgd2hpbGUgKGNoICE9PSAwKSB7XG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuXG4gICAgaWYgKGNoID09PSAweDJCLyogKyAqLyB8fCBjaCA9PT0gMHgyRC8qIC0gKi8pIHtcbiAgICAgIGlmIChDSE9NUElOR19DTElQID09PSBjaG9tcGluZykge1xuICAgICAgICBjaG9tcGluZyA9IChjaCA9PT0gMHgyQi8qICsgKi8pID8gQ0hPTVBJTkdfS0VFUCA6IENIT01QSU5HX1NUUklQO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3JlcGVhdCBvZiBhIGNob21waW5nIG1vZGUgaWRlbnRpZmllcicpO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIGlmICgodG1wID0gZnJvbURlY2ltYWxDb2RlKGNoKSkgPj0gMCkge1xuICAgICAgaWYgKHRtcCA9PT0gMCkge1xuICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnYmFkIGV4cGxpY2l0IGluZGVudGF0aW9uIHdpZHRoIG9mIGEgYmxvY2sgc2NhbGFyOyBpdCBjYW5ub3QgYmUgbGVzcyB0aGFuIG9uZScpO1xuICAgICAgfSBlbHNlIGlmICghZGV0ZWN0ZWRJbmRlbnQpIHtcbiAgICAgICAgdGV4dEluZGVudCA9IG5vZGVJbmRlbnQgKyB0bXAgLSAxO1xuICAgICAgICBkZXRlY3RlZEluZGVudCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAncmVwZWF0IG9mIGFuIGluZGVudGF0aW9uIHdpZHRoIGlkZW50aWZpZXInKTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBpZiAoaXNfV0hJVEVfU1BBQ0UoY2gpKSB7XG4gICAgZG8geyBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7IH1cbiAgICB3aGlsZSAoaXNfV0hJVEVfU1BBQ0UoY2gpKTtcblxuICAgIGlmIChjaCA9PT0gMHgyMy8qICMgKi8pIHtcbiAgICAgIGRvIHsgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pOyB9XG4gICAgICB3aGlsZSAoIWlzX0VPTChjaCkgJiYgKGNoICE9PSAwKSk7XG4gICAgfVxuICB9XG5cbiAgd2hpbGUgKGNoICE9PSAwKSB7XG4gICAgcmVhZExpbmVCcmVhayhzdGF0ZSk7XG4gICAgc3RhdGUubGluZUluZGVudCA9IDA7XG5cbiAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gICAgd2hpbGUgKCghZGV0ZWN0ZWRJbmRlbnQgfHwgc3RhdGUubGluZUluZGVudCA8IHRleHRJbmRlbnQpICYmXG4gICAgICAgICAgIChjaCA9PT0gMHgyMC8qIFNwYWNlICovKSkge1xuICAgICAgc3RhdGUubGluZUluZGVudCsrO1xuICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgIH1cblxuICAgIGlmICghZGV0ZWN0ZWRJbmRlbnQgJiYgc3RhdGUubGluZUluZGVudCA+IHRleHRJbmRlbnQpIHtcbiAgICAgIHRleHRJbmRlbnQgPSBzdGF0ZS5saW5lSW5kZW50O1xuICAgIH1cblxuICAgIGlmIChpc19FT0woY2gpKSB7XG4gICAgICBlbXB0eUxpbmVzKys7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBFbmQgb2YgdGhlIHNjYWxhci5cbiAgICBpZiAoc3RhdGUubGluZUluZGVudCA8IHRleHRJbmRlbnQpIHtcblxuICAgICAgLy8gUGVyZm9ybSB0aGUgY2hvbXBpbmcuXG4gICAgICBpZiAoY2hvbXBpbmcgPT09IENIT01QSU5HX0tFRVApIHtcbiAgICAgICAgc3RhdGUucmVzdWx0ICs9IGNvbW1vbi5yZXBlYXQoJ1xcbicsIGRpZFJlYWRDb250ZW50ID8gMSArIGVtcHR5TGluZXMgOiBlbXB0eUxpbmVzKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hvbXBpbmcgPT09IENIT01QSU5HX0NMSVApIHtcbiAgICAgICAgaWYgKGRpZFJlYWRDb250ZW50KSB7IC8vIGkuZS4gb25seSBpZiB0aGUgc2NhbGFyIGlzIG5vdCBlbXB0eS5cbiAgICAgICAgICBzdGF0ZS5yZXN1bHQgKz0gJ1xcbic7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQnJlYWsgdGhpcyBgd2hpbGVgIGN5Y2xlIGFuZCBnbyB0byB0aGUgZnVuY2l0b24ncyBlcGlsb2d1ZS5cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIC8vIEZvbGRlZCBzdHlsZTogdXNlIGZhbmN5IHJ1bGVzIHRvIGhhbmRsZSBsaW5lIGJyZWFrcy5cbiAgICBpZiAoZm9sZGluZykge1xuXG4gICAgICAvLyBMaW5lcyBzdGFydGluZyB3aXRoIHdoaXRlIHNwYWNlIGNoYXJhY3RlcnMgKG1vcmUtaW5kZW50ZWQgbGluZXMpIGFyZSBub3QgZm9sZGVkLlxuICAgICAgaWYgKGlzX1dISVRFX1NQQUNFKGNoKSkge1xuICAgICAgICBhdE1vcmVJbmRlbnRlZCA9IHRydWU7XG4gICAgICAgIC8vIGV4Y2VwdCBmb3IgdGhlIGZpcnN0IGNvbnRlbnQgbGluZSAoY2YuIEV4YW1wbGUgOC4xKVxuICAgICAgICBzdGF0ZS5yZXN1bHQgKz0gY29tbW9uLnJlcGVhdCgnXFxuJywgZGlkUmVhZENvbnRlbnQgPyAxICsgZW1wdHlMaW5lcyA6IGVtcHR5TGluZXMpO1xuXG4gICAgICAvLyBFbmQgb2YgbW9yZS1pbmRlbnRlZCBibG9jay5cbiAgICAgIH0gZWxzZSBpZiAoYXRNb3JlSW5kZW50ZWQpIHtcbiAgICAgICAgYXRNb3JlSW5kZW50ZWQgPSBmYWxzZTtcbiAgICAgICAgc3RhdGUucmVzdWx0ICs9IGNvbW1vbi5yZXBlYXQoJ1xcbicsIGVtcHR5TGluZXMgKyAxKTtcblxuICAgICAgLy8gSnVzdCBvbmUgbGluZSBicmVhayAtIHBlcmNlaXZlIGFzIHRoZSBzYW1lIGxpbmUuXG4gICAgICB9IGVsc2UgaWYgKGVtcHR5TGluZXMgPT09IDApIHtcbiAgICAgICAgaWYgKGRpZFJlYWRDb250ZW50KSB7IC8vIGkuZS4gb25seSBpZiB3ZSBoYXZlIGFscmVhZHkgcmVhZCBzb21lIHNjYWxhciBjb250ZW50LlxuICAgICAgICAgIHN0YXRlLnJlc3VsdCArPSAnICc7XG4gICAgICAgIH1cblxuICAgICAgLy8gU2V2ZXJhbCBsaW5lIGJyZWFrcyAtIHBlcmNlaXZlIGFzIGRpZmZlcmVudCBsaW5lcy5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXRlLnJlc3VsdCArPSBjb21tb24ucmVwZWF0KCdcXG4nLCBlbXB0eUxpbmVzKTtcbiAgICAgIH1cblxuICAgIC8vIExpdGVyYWwgc3R5bGU6IGp1c3QgYWRkIGV4YWN0IG51bWJlciBvZiBsaW5lIGJyZWFrcyBiZXR3ZWVuIGNvbnRlbnQgbGluZXMuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEtlZXAgYWxsIGxpbmUgYnJlYWtzIGV4Y2VwdCB0aGUgaGVhZGVyIGxpbmUgYnJlYWsuXG4gICAgICBzdGF0ZS5yZXN1bHQgKz0gY29tbW9uLnJlcGVhdCgnXFxuJywgZGlkUmVhZENvbnRlbnQgPyAxICsgZW1wdHlMaW5lcyA6IGVtcHR5TGluZXMpO1xuICAgIH1cblxuICAgIGRpZFJlYWRDb250ZW50ID0gdHJ1ZTtcbiAgICBkZXRlY3RlZEluZGVudCA9IHRydWU7XG4gICAgZW1wdHlMaW5lcyA9IDA7XG4gICAgY2FwdHVyZVN0YXJ0ID0gc3RhdGUucG9zaXRpb247XG5cbiAgICB3aGlsZSAoIWlzX0VPTChjaCkgJiYgKGNoICE9PSAwKSkge1xuICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgIH1cblxuICAgIGNhcHR1cmVTZWdtZW50KHN0YXRlLCBjYXB0dXJlU3RhcnQsIHN0YXRlLnBvc2l0aW9uLCBmYWxzZSk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gcmVhZEJsb2NrU2VxdWVuY2Uoc3RhdGUsIG5vZGVJbmRlbnQpIHtcbiAgdmFyIF9saW5lLFxuICAgICAgX3RhZyAgICAgID0gc3RhdGUudGFnLFxuICAgICAgX2FuY2hvciAgID0gc3RhdGUuYW5jaG9yLFxuICAgICAgX3Jlc3VsdCAgID0gW10sXG4gICAgICBmb2xsb3dpbmcsXG4gICAgICBkZXRlY3RlZCAgPSBmYWxzZSxcbiAgICAgIGNoO1xuXG4gIGlmIChzdGF0ZS5hbmNob3IgIT09IG51bGwpIHtcbiAgICBzdGF0ZS5hbmNob3JNYXBbc3RhdGUuYW5jaG9yXSA9IF9yZXN1bHQ7XG4gIH1cblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gIHdoaWxlIChjaCAhPT0gMCkge1xuXG4gICAgaWYgKGNoICE9PSAweDJELyogLSAqLykge1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgZm9sbG93aW5nID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbiArIDEpO1xuXG4gICAgaWYgKCFpc19XU19PUl9FT0woZm9sbG93aW5nKSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgZGV0ZWN0ZWQgPSB0cnVlO1xuICAgIHN0YXRlLnBvc2l0aW9uKys7XG5cbiAgICBpZiAoc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgLTEpKSB7XG4gICAgICBpZiAoc3RhdGUubGluZUluZGVudCA8PSBub2RlSW5kZW50KSB7XG4gICAgICAgIF9yZXN1bHQucHVzaChudWxsKTtcbiAgICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgX2xpbmUgPSBzdGF0ZS5saW5lO1xuICAgIGNvbXBvc2VOb2RlKHN0YXRlLCBub2RlSW5kZW50LCBDT05URVhUX0JMT0NLX0lOLCBmYWxzZSwgdHJ1ZSk7XG4gICAgX3Jlc3VsdC5wdXNoKHN0YXRlLnJlc3VsdCk7XG4gICAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgLTEpO1xuXG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICAgIGlmICgoc3RhdGUubGluZSA9PT0gX2xpbmUgfHwgc3RhdGUubGluZUluZGVudCA+IG5vZGVJbmRlbnQpICYmIChjaCAhPT0gMCkpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdiYWQgaW5kZW50YXRpb24gb2YgYSBzZXF1ZW5jZSBlbnRyeScpO1xuICAgIH0gZWxzZSBpZiAoc3RhdGUubGluZUluZGVudCA8IG5vZGVJbmRlbnQpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGlmIChkZXRlY3RlZCkge1xuICAgIHN0YXRlLnRhZyA9IF90YWc7XG4gICAgc3RhdGUuYW5jaG9yID0gX2FuY2hvcjtcbiAgICBzdGF0ZS5raW5kID0gJ3NlcXVlbmNlJztcbiAgICBzdGF0ZS5yZXN1bHQgPSBfcmVzdWx0O1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gcmVhZEJsb2NrTWFwcGluZyhzdGF0ZSwgbm9kZUluZGVudCwgZmxvd0luZGVudCkge1xuICB2YXIgZm9sbG93aW5nLFxuICAgICAgYWxsb3dDb21wYWN0LFxuICAgICAgX2xpbmUsXG4gICAgICBfcG9zLFxuICAgICAgX3RhZyAgICAgICAgICA9IHN0YXRlLnRhZyxcbiAgICAgIF9hbmNob3IgICAgICAgPSBzdGF0ZS5hbmNob3IsXG4gICAgICBfcmVzdWx0ICAgICAgID0ge30sXG4gICAgICBvdmVycmlkYWJsZUtleXMgPSB7fSxcbiAgICAgIGtleVRhZyAgICAgICAgPSBudWxsLFxuICAgICAga2V5Tm9kZSAgICAgICA9IG51bGwsXG4gICAgICB2YWx1ZU5vZGUgICAgID0gbnVsbCxcbiAgICAgIGF0RXhwbGljaXRLZXkgPSBmYWxzZSxcbiAgICAgIGRldGVjdGVkICAgICAgPSBmYWxzZSxcbiAgICAgIGNoO1xuXG4gIGlmIChzdGF0ZS5hbmNob3IgIT09IG51bGwpIHtcbiAgICBzdGF0ZS5hbmNob3JNYXBbc3RhdGUuYW5jaG9yXSA9IF9yZXN1bHQ7XG4gIH1cblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gIHdoaWxlIChjaCAhPT0gMCkge1xuICAgIGZvbGxvd2luZyA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24gKyAxKTtcbiAgICBfbGluZSA9IHN0YXRlLmxpbmU7IC8vIFNhdmUgdGhlIGN1cnJlbnQgbGluZS5cbiAgICBfcG9zID0gc3RhdGUucG9zaXRpb247XG5cbiAgICAvL1xuICAgIC8vIEV4cGxpY2l0IG5vdGF0aW9uIGNhc2UuIFRoZXJlIGFyZSB0d28gc2VwYXJhdGUgYmxvY2tzOlxuICAgIC8vIGZpcnN0IGZvciB0aGUga2V5IChkZW5vdGVkIGJ5IFwiP1wiKSBhbmQgc2Vjb25kIGZvciB0aGUgdmFsdWUgKGRlbm90ZWQgYnkgXCI6XCIpXG4gICAgLy9cbiAgICBpZiAoKGNoID09PSAweDNGLyogPyAqLyB8fCBjaCA9PT0gMHgzQS8qIDogKi8pICYmIGlzX1dTX09SX0VPTChmb2xsb3dpbmcpKSB7XG5cbiAgICAgIGlmIChjaCA9PT0gMHgzRi8qID8gKi8pIHtcbiAgICAgICAgaWYgKGF0RXhwbGljaXRLZXkpIHtcbiAgICAgICAgICBzdG9yZU1hcHBpbmdQYWlyKHN0YXRlLCBfcmVzdWx0LCBvdmVycmlkYWJsZUtleXMsIGtleVRhZywga2V5Tm9kZSwgbnVsbCk7XG4gICAgICAgICAga2V5VGFnID0ga2V5Tm9kZSA9IHZhbHVlTm9kZSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBkZXRlY3RlZCA9IHRydWU7XG4gICAgICAgIGF0RXhwbGljaXRLZXkgPSB0cnVlO1xuICAgICAgICBhbGxvd0NvbXBhY3QgPSB0cnVlO1xuXG4gICAgICB9IGVsc2UgaWYgKGF0RXhwbGljaXRLZXkpIHtcbiAgICAgICAgLy8gaS5lLiAweDNBLyogOiAqLyA9PT0gY2hhcmFjdGVyIGFmdGVyIHRoZSBleHBsaWNpdCBrZXkuXG4gICAgICAgIGF0RXhwbGljaXRLZXkgPSBmYWxzZTtcbiAgICAgICAgYWxsb3dDb21wYWN0ID0gdHJ1ZTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2luY29tcGxldGUgZXhwbGljaXQgbWFwcGluZyBwYWlyOyBhIGtleSBub2RlIGlzIG1pc3NlZDsgb3IgZm9sbG93ZWQgYnkgYSBub24tdGFidWxhdGVkIGVtcHR5IGxpbmUnKTtcbiAgICAgIH1cblxuICAgICAgc3RhdGUucG9zaXRpb24gKz0gMTtcbiAgICAgIGNoID0gZm9sbG93aW5nO1xuXG4gICAgLy9cbiAgICAvLyBJbXBsaWNpdCBub3RhdGlvbiBjYXNlLiBGbG93LXN0eWxlIG5vZGUgYXMgdGhlIGtleSBmaXJzdCwgdGhlbiBcIjpcIiwgYW5kIHRoZSB2YWx1ZS5cbiAgICAvL1xuICAgIH0gZWxzZSBpZiAoY29tcG9zZU5vZGUoc3RhdGUsIGZsb3dJbmRlbnQsIENPTlRFWFRfRkxPV19PVVQsIGZhbHNlLCB0cnVlKSkge1xuXG4gICAgICBpZiAoc3RhdGUubGluZSA9PT0gX2xpbmUpIHtcbiAgICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICAgICAgICB3aGlsZSAoaXNfV0hJVEVfU1BBQ0UoY2gpKSB7XG4gICAgICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoID09PSAweDNBLyogOiAqLykge1xuICAgICAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcblxuICAgICAgICAgIGlmICghaXNfV1NfT1JfRU9MKGNoKSkge1xuICAgICAgICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2Egd2hpdGVzcGFjZSBjaGFyYWN0ZXIgaXMgZXhwZWN0ZWQgYWZ0ZXIgdGhlIGtleS12YWx1ZSBzZXBhcmF0b3Igd2l0aGluIGEgYmxvY2sgbWFwcGluZycpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChhdEV4cGxpY2l0S2V5KSB7XG4gICAgICAgICAgICBzdG9yZU1hcHBpbmdQYWlyKHN0YXRlLCBfcmVzdWx0LCBvdmVycmlkYWJsZUtleXMsIGtleVRhZywga2V5Tm9kZSwgbnVsbCk7XG4gICAgICAgICAgICBrZXlUYWcgPSBrZXlOb2RlID0gdmFsdWVOb2RlID0gbnVsbDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkZXRlY3RlZCA9IHRydWU7XG4gICAgICAgICAgYXRFeHBsaWNpdEtleSA9IGZhbHNlO1xuICAgICAgICAgIGFsbG93Q29tcGFjdCA9IGZhbHNlO1xuICAgICAgICAgIGtleVRhZyA9IHN0YXRlLnRhZztcbiAgICAgICAgICBrZXlOb2RlID0gc3RhdGUucmVzdWx0O1xuXG4gICAgICAgIH0gZWxzZSBpZiAoZGV0ZWN0ZWQpIHtcbiAgICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnY2FuIG5vdCByZWFkIGFuIGltcGxpY2l0IG1hcHBpbmcgcGFpcjsgYSBjb2xvbiBpcyBtaXNzZWQnKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0YXRlLnRhZyA9IF90YWc7XG4gICAgICAgICAgc3RhdGUuYW5jaG9yID0gX2FuY2hvcjtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTsgLy8gS2VlcCB0aGUgcmVzdWx0IG9mIGBjb21wb3NlTm9kZWAuXG4gICAgICAgIH1cblxuICAgICAgfSBlbHNlIGlmIChkZXRlY3RlZCkge1xuICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnY2FuIG5vdCByZWFkIGEgYmxvY2sgbWFwcGluZyBlbnRyeTsgYSBtdWx0aWxpbmUga2V5IG1heSBub3QgYmUgYW4gaW1wbGljaXQga2V5Jyk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXRlLnRhZyA9IF90YWc7XG4gICAgICAgIHN0YXRlLmFuY2hvciA9IF9hbmNob3I7XG4gICAgICAgIHJldHVybiB0cnVlOyAvLyBLZWVwIHRoZSByZXN1bHQgb2YgYGNvbXBvc2VOb2RlYC5cbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICBicmVhazsgLy8gUmVhZGluZyBpcyBkb25lLiBHbyB0byB0aGUgZXBpbG9ndWUuXG4gICAgfVxuXG4gICAgLy9cbiAgICAvLyBDb21tb24gcmVhZGluZyBjb2RlIGZvciBib3RoIGV4cGxpY2l0IGFuZCBpbXBsaWNpdCBub3RhdGlvbnMuXG4gICAgLy9cbiAgICBpZiAoc3RhdGUubGluZSA9PT0gX2xpbmUgfHwgc3RhdGUubGluZUluZGVudCA+IG5vZGVJbmRlbnQpIHtcbiAgICAgIGlmIChjb21wb3NlTm9kZShzdGF0ZSwgbm9kZUluZGVudCwgQ09OVEVYVF9CTE9DS19PVVQsIHRydWUsIGFsbG93Q29tcGFjdCkpIHtcbiAgICAgICAgaWYgKGF0RXhwbGljaXRLZXkpIHtcbiAgICAgICAgICBrZXlOb2RlID0gc3RhdGUucmVzdWx0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhbHVlTm9kZSA9IHN0YXRlLnJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIWF0RXhwbGljaXRLZXkpIHtcbiAgICAgICAgc3RvcmVNYXBwaW5nUGFpcihzdGF0ZSwgX3Jlc3VsdCwgb3ZlcnJpZGFibGVLZXlzLCBrZXlUYWcsIGtleU5vZGUsIHZhbHVlTm9kZSwgX2xpbmUsIF9wb3MpO1xuICAgICAgICBrZXlUYWcgPSBrZXlOb2RlID0gdmFsdWVOb2RlID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgLTEpO1xuICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICBpZiAoc3RhdGUubGluZUluZGVudCA+IG5vZGVJbmRlbnQgJiYgKGNoICE9PSAwKSkge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2JhZCBpbmRlbnRhdGlvbiBvZiBhIG1hcHBpbmcgZW50cnknKTtcbiAgICB9IGVsc2UgaWYgKHN0YXRlLmxpbmVJbmRlbnQgPCBub2RlSW5kZW50KSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvL1xuICAvLyBFcGlsb2d1ZS5cbiAgLy9cblxuICAvLyBTcGVjaWFsIGNhc2U6IGxhc3QgbWFwcGluZydzIG5vZGUgY29udGFpbnMgb25seSB0aGUga2V5IGluIGV4cGxpY2l0IG5vdGF0aW9uLlxuICBpZiAoYXRFeHBsaWNpdEtleSkge1xuICAgIHN0b3JlTWFwcGluZ1BhaXIoc3RhdGUsIF9yZXN1bHQsIG92ZXJyaWRhYmxlS2V5cywga2V5VGFnLCBrZXlOb2RlLCBudWxsKTtcbiAgfVxuXG4gIC8vIEV4cG9zZSB0aGUgcmVzdWx0aW5nIG1hcHBpbmcuXG4gIGlmIChkZXRlY3RlZCkge1xuICAgIHN0YXRlLnRhZyA9IF90YWc7XG4gICAgc3RhdGUuYW5jaG9yID0gX2FuY2hvcjtcbiAgICBzdGF0ZS5raW5kID0gJ21hcHBpbmcnO1xuICAgIHN0YXRlLnJlc3VsdCA9IF9yZXN1bHQ7XG4gIH1cblxuICByZXR1cm4gZGV0ZWN0ZWQ7XG59XG5cbmZ1bmN0aW9uIHJlYWRUYWdQcm9wZXJ0eShzdGF0ZSkge1xuICB2YXIgX3Bvc2l0aW9uLFxuICAgICAgaXNWZXJiYXRpbSA9IGZhbHNlLFxuICAgICAgaXNOYW1lZCAgICA9IGZhbHNlLFxuICAgICAgdGFnSGFuZGxlLFxuICAgICAgdGFnTmFtZSxcbiAgICAgIGNoO1xuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG5cbiAgaWYgKGNoICE9PSAweDIxLyogISAqLykgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChzdGF0ZS50YWcgIT09IG51bGwpIHtcbiAgICB0aHJvd0Vycm9yKHN0YXRlLCAnZHVwbGljYXRpb24gb2YgYSB0YWcgcHJvcGVydHknKTtcbiAgfVxuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcblxuICBpZiAoY2ggPT09IDB4M0MvKiA8ICovKSB7XG4gICAgaXNWZXJiYXRpbSA9IHRydWU7XG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuXG4gIH0gZWxzZSBpZiAoY2ggPT09IDB4MjEvKiAhICovKSB7XG4gICAgaXNOYW1lZCA9IHRydWU7XG4gICAgdGFnSGFuZGxlID0gJyEhJztcbiAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG5cbiAgfSBlbHNlIHtcbiAgICB0YWdIYW5kbGUgPSAnISc7XG4gIH1cblxuICBfcG9zaXRpb24gPSBzdGF0ZS5wb3NpdGlvbjtcblxuICBpZiAoaXNWZXJiYXRpbSkge1xuICAgIGRvIHsgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pOyB9XG4gICAgd2hpbGUgKGNoICE9PSAwICYmIGNoICE9PSAweDNFLyogPiAqLyk7XG5cbiAgICBpZiAoc3RhdGUucG9zaXRpb24gPCBzdGF0ZS5sZW5ndGgpIHtcbiAgICAgIHRhZ05hbWUgPSBzdGF0ZS5pbnB1dC5zbGljZShfcG9zaXRpb24sIHN0YXRlLnBvc2l0aW9uKTtcbiAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3VuZXhwZWN0ZWQgZW5kIG9mIHRoZSBzdHJlYW0gd2l0aGluIGEgdmVyYmF0aW0gdGFnJyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHdoaWxlIChjaCAhPT0gMCAmJiAhaXNfV1NfT1JfRU9MKGNoKSkge1xuXG4gICAgICBpZiAoY2ggPT09IDB4MjEvKiAhICovKSB7XG4gICAgICAgIGlmICghaXNOYW1lZCkge1xuICAgICAgICAgIHRhZ0hhbmRsZSA9IHN0YXRlLmlucHV0LnNsaWNlKF9wb3NpdGlvbiAtIDEsIHN0YXRlLnBvc2l0aW9uICsgMSk7XG5cbiAgICAgICAgICBpZiAoIVBBVFRFUk5fVEFHX0hBTkRMRS50ZXN0KHRhZ0hhbmRsZSkpIHtcbiAgICAgICAgICAgIHRocm93RXJyb3Ioc3RhdGUsICduYW1lZCB0YWcgaGFuZGxlIGNhbm5vdCBjb250YWluIHN1Y2ggY2hhcmFjdGVycycpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlzTmFtZWQgPSB0cnVlO1xuICAgICAgICAgIF9wb3NpdGlvbiA9IHN0YXRlLnBvc2l0aW9uICsgMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAndGFnIHN1ZmZpeCBjYW5ub3QgY29udGFpbiBleGNsYW1hdGlvbiBtYXJrcycpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICB0YWdOYW1lID0gc3RhdGUuaW5wdXQuc2xpY2UoX3Bvc2l0aW9uLCBzdGF0ZS5wb3NpdGlvbik7XG5cbiAgICBpZiAoUEFUVEVSTl9GTE9XX0lORElDQVRPUlMudGVzdCh0YWdOYW1lKSkge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3RhZyBzdWZmaXggY2Fubm90IGNvbnRhaW4gZmxvdyBpbmRpY2F0b3IgY2hhcmFjdGVycycpO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0YWdOYW1lICYmICFQQVRURVJOX1RBR19VUkkudGVzdCh0YWdOYW1lKSkge1xuICAgIHRocm93RXJyb3Ioc3RhdGUsICd0YWcgbmFtZSBjYW5ub3QgY29udGFpbiBzdWNoIGNoYXJhY3RlcnM6ICcgKyB0YWdOYW1lKTtcbiAgfVxuXG4gIGlmIChpc1ZlcmJhdGltKSB7XG4gICAgc3RhdGUudGFnID0gdGFnTmFtZTtcblxuICB9IGVsc2UgaWYgKF9oYXNPd25Qcm9wZXJ0eS5jYWxsKHN0YXRlLnRhZ01hcCwgdGFnSGFuZGxlKSkge1xuICAgIHN0YXRlLnRhZyA9IHN0YXRlLnRhZ01hcFt0YWdIYW5kbGVdICsgdGFnTmFtZTtcblxuICB9IGVsc2UgaWYgKHRhZ0hhbmRsZSA9PT0gJyEnKSB7XG4gICAgc3RhdGUudGFnID0gJyEnICsgdGFnTmFtZTtcblxuICB9IGVsc2UgaWYgKHRhZ0hhbmRsZSA9PT0gJyEhJykge1xuICAgIHN0YXRlLnRhZyA9ICd0YWc6eWFtbC5vcmcsMjAwMjonICsgdGFnTmFtZTtcblxuICB9IGVsc2Uge1xuICAgIHRocm93RXJyb3Ioc3RhdGUsICd1bmRlY2xhcmVkIHRhZyBoYW5kbGUgXCInICsgdGFnSGFuZGxlICsgJ1wiJyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gcmVhZEFuY2hvclByb3BlcnR5KHN0YXRlKSB7XG4gIHZhciBfcG9zaXRpb24sXG4gICAgICBjaDtcblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gIGlmIChjaCAhPT0gMHgyNi8qICYgKi8pIHJldHVybiBmYWxzZTtcblxuICBpZiAoc3RhdGUuYW5jaG9yICE9PSBudWxsKSB7XG4gICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2R1cGxpY2F0aW9uIG9mIGFuIGFuY2hvciBwcm9wZXJ0eScpO1xuICB9XG5cbiAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICBfcG9zaXRpb24gPSBzdGF0ZS5wb3NpdGlvbjtcblxuICB3aGlsZSAoY2ggIT09IDAgJiYgIWlzX1dTX09SX0VPTChjaCkgJiYgIWlzX0ZMT1dfSU5ESUNBVE9SKGNoKSkge1xuICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgfVxuXG4gIGlmIChzdGF0ZS5wb3NpdGlvbiA9PT0gX3Bvc2l0aW9uKSB7XG4gICAgdGhyb3dFcnJvcihzdGF0ZSwgJ25hbWUgb2YgYW4gYW5jaG9yIG5vZGUgbXVzdCBjb250YWluIGF0IGxlYXN0IG9uZSBjaGFyYWN0ZXInKTtcbiAgfVxuXG4gIHN0YXRlLmFuY2hvciA9IHN0YXRlLmlucHV0LnNsaWNlKF9wb3NpdGlvbiwgc3RhdGUucG9zaXRpb24pO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gcmVhZEFsaWFzKHN0YXRlKSB7XG4gIHZhciBfcG9zaXRpb24sIGFsaWFzLFxuICAgICAgY2g7XG5cbiAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICBpZiAoY2ggIT09IDB4MkEvKiAqICovKSByZXR1cm4gZmFsc2U7XG5cbiAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICBfcG9zaXRpb24gPSBzdGF0ZS5wb3NpdGlvbjtcblxuICB3aGlsZSAoY2ggIT09IDAgJiYgIWlzX1dTX09SX0VPTChjaCkgJiYgIWlzX0ZMT1dfSU5ESUNBVE9SKGNoKSkge1xuICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgfVxuXG4gIGlmIChzdGF0ZS5wb3NpdGlvbiA9PT0gX3Bvc2l0aW9uKSB7XG4gICAgdGhyb3dFcnJvcihzdGF0ZSwgJ25hbWUgb2YgYW4gYWxpYXMgbm9kZSBtdXN0IGNvbnRhaW4gYXQgbGVhc3Qgb25lIGNoYXJhY3RlcicpO1xuICB9XG5cbiAgYWxpYXMgPSBzdGF0ZS5pbnB1dC5zbGljZShfcG9zaXRpb24sIHN0YXRlLnBvc2l0aW9uKTtcblxuICBpZiAoIV9oYXNPd25Qcm9wZXJ0eS5jYWxsKHN0YXRlLmFuY2hvck1hcCwgYWxpYXMpKSB7XG4gICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3VuaWRlbnRpZmllZCBhbGlhcyBcIicgKyBhbGlhcyArICdcIicpO1xuICB9XG5cbiAgc3RhdGUucmVzdWx0ID0gc3RhdGUuYW5jaG9yTWFwW2FsaWFzXTtcbiAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgLTEpO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gY29tcG9zZU5vZGUoc3RhdGUsIHBhcmVudEluZGVudCwgbm9kZUNvbnRleHQsIGFsbG93VG9TZWVrLCBhbGxvd0NvbXBhY3QpIHtcbiAgdmFyIGFsbG93QmxvY2tTdHlsZXMsXG4gICAgICBhbGxvd0Jsb2NrU2NhbGFycyxcbiAgICAgIGFsbG93QmxvY2tDb2xsZWN0aW9ucyxcbiAgICAgIGluZGVudFN0YXR1cyA9IDEsIC8vIDE6IHRoaXM+cGFyZW50LCAwOiB0aGlzPXBhcmVudCwgLTE6IHRoaXM8cGFyZW50XG4gICAgICBhdE5ld0xpbmUgID0gZmFsc2UsXG4gICAgICBoYXNDb250ZW50ID0gZmFsc2UsXG4gICAgICB0eXBlSW5kZXgsXG4gICAgICB0eXBlUXVhbnRpdHksXG4gICAgICB0eXBlLFxuICAgICAgZmxvd0luZGVudCxcbiAgICAgIGJsb2NrSW5kZW50O1xuXG4gIGlmIChzdGF0ZS5saXN0ZW5lciAhPT0gbnVsbCkge1xuICAgIHN0YXRlLmxpc3RlbmVyKCdvcGVuJywgc3RhdGUpO1xuICB9XG5cbiAgc3RhdGUudGFnICAgID0gbnVsbDtcbiAgc3RhdGUuYW5jaG9yID0gbnVsbDtcbiAgc3RhdGUua2luZCAgID0gbnVsbDtcbiAgc3RhdGUucmVzdWx0ID0gbnVsbDtcblxuICBhbGxvd0Jsb2NrU3R5bGVzID0gYWxsb3dCbG9ja1NjYWxhcnMgPSBhbGxvd0Jsb2NrQ29sbGVjdGlvbnMgPVxuICAgIENPTlRFWFRfQkxPQ0tfT1VUID09PSBub2RlQ29udGV4dCB8fFxuICAgIENPTlRFWFRfQkxPQ0tfSU4gID09PSBub2RlQ29udGV4dDtcblxuICBpZiAoYWxsb3dUb1NlZWspIHtcbiAgICBpZiAoc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgLTEpKSB7XG4gICAgICBhdE5ld0xpbmUgPSB0cnVlO1xuXG4gICAgICBpZiAoc3RhdGUubGluZUluZGVudCA+IHBhcmVudEluZGVudCkge1xuICAgICAgICBpbmRlbnRTdGF0dXMgPSAxO1xuICAgICAgfSBlbHNlIGlmIChzdGF0ZS5saW5lSW5kZW50ID09PSBwYXJlbnRJbmRlbnQpIHtcbiAgICAgICAgaW5kZW50U3RhdHVzID0gMDtcbiAgICAgIH0gZWxzZSBpZiAoc3RhdGUubGluZUluZGVudCA8IHBhcmVudEluZGVudCkge1xuICAgICAgICBpbmRlbnRTdGF0dXMgPSAtMTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoaW5kZW50U3RhdHVzID09PSAxKSB7XG4gICAgd2hpbGUgKHJlYWRUYWdQcm9wZXJ0eShzdGF0ZSkgfHwgcmVhZEFuY2hvclByb3BlcnR5KHN0YXRlKSkge1xuICAgICAgaWYgKHNraXBTZXBhcmF0aW9uU3BhY2Uoc3RhdGUsIHRydWUsIC0xKSkge1xuICAgICAgICBhdE5ld0xpbmUgPSB0cnVlO1xuICAgICAgICBhbGxvd0Jsb2NrQ29sbGVjdGlvbnMgPSBhbGxvd0Jsb2NrU3R5bGVzO1xuXG4gICAgICAgIGlmIChzdGF0ZS5saW5lSW5kZW50ID4gcGFyZW50SW5kZW50KSB7XG4gICAgICAgICAgaW5kZW50U3RhdHVzID0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0ZS5saW5lSW5kZW50ID09PSBwYXJlbnRJbmRlbnQpIHtcbiAgICAgICAgICBpbmRlbnRTdGF0dXMgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlLmxpbmVJbmRlbnQgPCBwYXJlbnRJbmRlbnQpIHtcbiAgICAgICAgICBpbmRlbnRTdGF0dXMgPSAtMTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWxsb3dCbG9ja0NvbGxlY3Rpb25zID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGFsbG93QmxvY2tDb2xsZWN0aW9ucykge1xuICAgIGFsbG93QmxvY2tDb2xsZWN0aW9ucyA9IGF0TmV3TGluZSB8fCBhbGxvd0NvbXBhY3Q7XG4gIH1cblxuICBpZiAoaW5kZW50U3RhdHVzID09PSAxIHx8IENPTlRFWFRfQkxPQ0tfT1VUID09PSBub2RlQ29udGV4dCkge1xuICAgIGlmIChDT05URVhUX0ZMT1dfSU4gPT09IG5vZGVDb250ZXh0IHx8IENPTlRFWFRfRkxPV19PVVQgPT09IG5vZGVDb250ZXh0KSB7XG4gICAgICBmbG93SW5kZW50ID0gcGFyZW50SW5kZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICBmbG93SW5kZW50ID0gcGFyZW50SW5kZW50ICsgMTtcbiAgICB9XG5cbiAgICBibG9ja0luZGVudCA9IHN0YXRlLnBvc2l0aW9uIC0gc3RhdGUubGluZVN0YXJ0O1xuXG4gICAgaWYgKGluZGVudFN0YXR1cyA9PT0gMSkge1xuICAgICAgaWYgKGFsbG93QmxvY2tDb2xsZWN0aW9ucyAmJlxuICAgICAgICAgIChyZWFkQmxvY2tTZXF1ZW5jZShzdGF0ZSwgYmxvY2tJbmRlbnQpIHx8XG4gICAgICAgICAgIHJlYWRCbG9ja01hcHBpbmcoc3RhdGUsIGJsb2NrSW5kZW50LCBmbG93SW5kZW50KSkgfHxcbiAgICAgICAgICByZWFkRmxvd0NvbGxlY3Rpb24oc3RhdGUsIGZsb3dJbmRlbnQpKSB7XG4gICAgICAgIGhhc0NvbnRlbnQgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKChhbGxvd0Jsb2NrU2NhbGFycyAmJiByZWFkQmxvY2tTY2FsYXIoc3RhdGUsIGZsb3dJbmRlbnQpKSB8fFxuICAgICAgICAgICAgcmVhZFNpbmdsZVF1b3RlZFNjYWxhcihzdGF0ZSwgZmxvd0luZGVudCkgfHxcbiAgICAgICAgICAgIHJlYWREb3VibGVRdW90ZWRTY2FsYXIoc3RhdGUsIGZsb3dJbmRlbnQpKSB7XG4gICAgICAgICAgaGFzQ29udGVudCA9IHRydWU7XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZWFkQWxpYXMoc3RhdGUpKSB7XG4gICAgICAgICAgaGFzQ29udGVudCA9IHRydWU7XG5cbiAgICAgICAgICBpZiAoc3RhdGUudGFnICE9PSBudWxsIHx8IHN0YXRlLmFuY2hvciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2FsaWFzIG5vZGUgc2hvdWxkIG5vdCBoYXZlIGFueSBwcm9wZXJ0aWVzJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAocmVhZFBsYWluU2NhbGFyKHN0YXRlLCBmbG93SW5kZW50LCBDT05URVhUX0ZMT1dfSU4gPT09IG5vZGVDb250ZXh0KSkge1xuICAgICAgICAgIGhhc0NvbnRlbnQgPSB0cnVlO1xuXG4gICAgICAgICAgaWYgKHN0YXRlLnRhZyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgc3RhdGUudGFnID0gJz8nO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGF0ZS5hbmNob3IgIT09IG51bGwpIHtcbiAgICAgICAgICBzdGF0ZS5hbmNob3JNYXBbc3RhdGUuYW5jaG9yXSA9IHN0YXRlLnJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaW5kZW50U3RhdHVzID09PSAwKSB7XG4gICAgICAvLyBTcGVjaWFsIGNhc2U6IGJsb2NrIHNlcXVlbmNlcyBhcmUgYWxsb3dlZCB0byBoYXZlIHNhbWUgaW5kZW50YXRpb24gbGV2ZWwgYXMgdGhlIHBhcmVudC5cbiAgICAgIC8vIGh0dHA6Ly93d3cueWFtbC5vcmcvc3BlYy8xLjIvc3BlYy5odG1sI2lkMjc5OTc4NFxuICAgICAgaGFzQ29udGVudCA9IGFsbG93QmxvY2tDb2xsZWN0aW9ucyAmJiByZWFkQmxvY2tTZXF1ZW5jZShzdGF0ZSwgYmxvY2tJbmRlbnQpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChzdGF0ZS50YWcgIT09IG51bGwgJiYgc3RhdGUudGFnICE9PSAnIScpIHtcbiAgICBpZiAoc3RhdGUudGFnID09PSAnPycpIHtcbiAgICAgIC8vIEltcGxpY2l0IHJlc29sdmluZyBpcyBub3QgYWxsb3dlZCBmb3Igbm9uLXNjYWxhciB0eXBlcywgYW5kICc/J1xuICAgICAgLy8gbm9uLXNwZWNpZmljIHRhZyBpcyBvbmx5IGF1dG9tYXRpY2FsbHkgYXNzaWduZWQgdG8gcGxhaW4gc2NhbGFycy5cbiAgICAgIC8vXG4gICAgICAvLyBXZSBvbmx5IG5lZWQgdG8gY2hlY2sga2luZCBjb25mb3JtaXR5IGluIGNhc2UgdXNlciBleHBsaWNpdGx5IGFzc2lnbnMgJz8nXG4gICAgICAvLyB0YWcsIGZvciBleGFtcGxlIGxpa2UgdGhpczogXCIhPD8+IFswXVwiXG4gICAgICAvL1xuICAgICAgaWYgKHN0YXRlLnJlc3VsdCAhPT0gbnVsbCAmJiBzdGF0ZS5raW5kICE9PSAnc2NhbGFyJykge1xuICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAndW5hY2NlcHRhYmxlIG5vZGUga2luZCBmb3IgITw/PiB0YWc7IGl0IHNob3VsZCBiZSBcInNjYWxhclwiLCBub3QgXCInICsgc3RhdGUua2luZCArICdcIicpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHR5cGVJbmRleCA9IDAsIHR5cGVRdWFudGl0eSA9IHN0YXRlLmltcGxpY2l0VHlwZXMubGVuZ3RoOyB0eXBlSW5kZXggPCB0eXBlUXVhbnRpdHk7IHR5cGVJbmRleCArPSAxKSB7XG4gICAgICAgIHR5cGUgPSBzdGF0ZS5pbXBsaWNpdFR5cGVzW3R5cGVJbmRleF07XG5cbiAgICAgICAgaWYgKHR5cGUucmVzb2x2ZShzdGF0ZS5yZXN1bHQpKSB7IC8vIGBzdGF0ZS5yZXN1bHRgIHVwZGF0ZWQgaW4gcmVzb2x2ZXIgaWYgbWF0Y2hlZFxuICAgICAgICAgIHN0YXRlLnJlc3VsdCA9IHR5cGUuY29uc3RydWN0KHN0YXRlLnJlc3VsdCk7XG4gICAgICAgICAgc3RhdGUudGFnID0gdHlwZS50YWc7XG4gICAgICAgICAgaWYgKHN0YXRlLmFuY2hvciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgc3RhdGUuYW5jaG9yTWFwW3N0YXRlLmFuY2hvcl0gPSBzdGF0ZS5yZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChfaGFzT3duUHJvcGVydHkuY2FsbChzdGF0ZS50eXBlTWFwW3N0YXRlLmtpbmQgfHwgJ2ZhbGxiYWNrJ10sIHN0YXRlLnRhZykpIHtcbiAgICAgIHR5cGUgPSBzdGF0ZS50eXBlTWFwW3N0YXRlLmtpbmQgfHwgJ2ZhbGxiYWNrJ11bc3RhdGUudGFnXTtcblxuICAgICAgaWYgKHN0YXRlLnJlc3VsdCAhPT0gbnVsbCAmJiB0eXBlLmtpbmQgIT09IHN0YXRlLmtpbmQpIHtcbiAgICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3VuYWNjZXB0YWJsZSBub2RlIGtpbmQgZm9yICE8JyArIHN0YXRlLnRhZyArICc+IHRhZzsgaXQgc2hvdWxkIGJlIFwiJyArIHR5cGUua2luZCArICdcIiwgbm90IFwiJyArIHN0YXRlLmtpbmQgKyAnXCInKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0eXBlLnJlc29sdmUoc3RhdGUucmVzdWx0KSkgeyAvLyBgc3RhdGUucmVzdWx0YCB1cGRhdGVkIGluIHJlc29sdmVyIGlmIG1hdGNoZWRcbiAgICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2Nhbm5vdCByZXNvbHZlIGEgbm9kZSB3aXRoICE8JyArIHN0YXRlLnRhZyArICc+IGV4cGxpY2l0IHRhZycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhdGUucmVzdWx0ID0gdHlwZS5jb25zdHJ1Y3Qoc3RhdGUucmVzdWx0KTtcbiAgICAgICAgaWYgKHN0YXRlLmFuY2hvciAhPT0gbnVsbCkge1xuICAgICAgICAgIHN0YXRlLmFuY2hvck1hcFtzdGF0ZS5hbmNob3JdID0gc3RhdGUucmVzdWx0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICd1bmtub3duIHRhZyAhPCcgKyBzdGF0ZS50YWcgKyAnPicpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChzdGF0ZS5saXN0ZW5lciAhPT0gbnVsbCkge1xuICAgIHN0YXRlLmxpc3RlbmVyKCdjbG9zZScsIHN0YXRlKTtcbiAgfVxuICByZXR1cm4gc3RhdGUudGFnICE9PSBudWxsIHx8ICBzdGF0ZS5hbmNob3IgIT09IG51bGwgfHwgaGFzQ29udGVudDtcbn1cblxuZnVuY3Rpb24gcmVhZERvY3VtZW50KHN0YXRlKSB7XG4gIHZhciBkb2N1bWVudFN0YXJ0ID0gc3RhdGUucG9zaXRpb24sXG4gICAgICBfcG9zaXRpb24sXG4gICAgICBkaXJlY3RpdmVOYW1lLFxuICAgICAgZGlyZWN0aXZlQXJncyxcbiAgICAgIGhhc0RpcmVjdGl2ZXMgPSBmYWxzZSxcbiAgICAgIGNoO1xuXG4gIHN0YXRlLnZlcnNpb24gPSBudWxsO1xuICBzdGF0ZS5jaGVja0xpbmVCcmVha3MgPSBzdGF0ZS5sZWdhY3k7XG4gIHN0YXRlLnRhZ01hcCA9IHt9O1xuICBzdGF0ZS5hbmNob3JNYXAgPSB7fTtcblxuICB3aGlsZSAoKGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbikpICE9PSAwKSB7XG4gICAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgLTEpO1xuXG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICAgIGlmIChzdGF0ZS5saW5lSW5kZW50ID4gMCB8fCBjaCAhPT0gMHgyNS8qICUgKi8pIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGhhc0RpcmVjdGl2ZXMgPSB0cnVlO1xuICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgICBfcG9zaXRpb24gPSBzdGF0ZS5wb3NpdGlvbjtcblxuICAgIHdoaWxlIChjaCAhPT0gMCAmJiAhaXNfV1NfT1JfRU9MKGNoKSkge1xuICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgIH1cblxuICAgIGRpcmVjdGl2ZU5hbWUgPSBzdGF0ZS5pbnB1dC5zbGljZShfcG9zaXRpb24sIHN0YXRlLnBvc2l0aW9uKTtcbiAgICBkaXJlY3RpdmVBcmdzID0gW107XG5cbiAgICBpZiAoZGlyZWN0aXZlTmFtZS5sZW5ndGggPCAxKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnZGlyZWN0aXZlIG5hbWUgbXVzdCBub3QgYmUgbGVzcyB0aGFuIG9uZSBjaGFyYWN0ZXIgaW4gbGVuZ3RoJyk7XG4gICAgfVxuXG4gICAgd2hpbGUgKGNoICE9PSAwKSB7XG4gICAgICB3aGlsZSAoaXNfV0hJVEVfU1BBQ0UoY2gpKSB7XG4gICAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNoID09PSAweDIzLyogIyAqLykge1xuICAgICAgICBkbyB7IGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTsgfVxuICAgICAgICB3aGlsZSAoY2ggIT09IDAgJiYgIWlzX0VPTChjaCkpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgaWYgKGlzX0VPTChjaCkpIGJyZWFrO1xuXG4gICAgICBfcG9zaXRpb24gPSBzdGF0ZS5wb3NpdGlvbjtcblxuICAgICAgd2hpbGUgKGNoICE9PSAwICYmICFpc19XU19PUl9FT0woY2gpKSB7XG4gICAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgICAgIH1cblxuICAgICAgZGlyZWN0aXZlQXJncy5wdXNoKHN0YXRlLmlucHV0LnNsaWNlKF9wb3NpdGlvbiwgc3RhdGUucG9zaXRpb24pKTtcbiAgICB9XG5cbiAgICBpZiAoY2ggIT09IDApIHJlYWRMaW5lQnJlYWsoc3RhdGUpO1xuXG4gICAgaWYgKF9oYXNPd25Qcm9wZXJ0eS5jYWxsKGRpcmVjdGl2ZUhhbmRsZXJzLCBkaXJlY3RpdmVOYW1lKSkge1xuICAgICAgZGlyZWN0aXZlSGFuZGxlcnNbZGlyZWN0aXZlTmFtZV0oc3RhdGUsIGRpcmVjdGl2ZU5hbWUsIGRpcmVjdGl2ZUFyZ3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvd1dhcm5pbmcoc3RhdGUsICd1bmtub3duIGRvY3VtZW50IGRpcmVjdGl2ZSBcIicgKyBkaXJlY3RpdmVOYW1lICsgJ1wiJyk7XG4gICAgfVxuICB9XG5cbiAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgLTEpO1xuXG4gIGlmIChzdGF0ZS5saW5lSW5kZW50ID09PSAwICYmXG4gICAgICBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKSAgICAgPT09IDB4MkQvKiAtICovICYmXG4gICAgICBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uICsgMSkgPT09IDB4MkQvKiAtICovICYmXG4gICAgICBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uICsgMikgPT09IDB4MkQvKiAtICovKSB7XG4gICAgc3RhdGUucG9zaXRpb24gKz0gMztcbiAgICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCAtMSk7XG5cbiAgfSBlbHNlIGlmIChoYXNEaXJlY3RpdmVzKSB7XG4gICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2RpcmVjdGl2ZXMgZW5kIG1hcmsgaXMgZXhwZWN0ZWQnKTtcbiAgfVxuXG4gIGNvbXBvc2VOb2RlKHN0YXRlLCBzdGF0ZS5saW5lSW5kZW50IC0gMSwgQ09OVEVYVF9CTE9DS19PVVQsIGZhbHNlLCB0cnVlKTtcbiAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgLTEpO1xuXG4gIGlmIChzdGF0ZS5jaGVja0xpbmVCcmVha3MgJiZcbiAgICAgIFBBVFRFUk5fTk9OX0FTQ0lJX0xJTkVfQlJFQUtTLnRlc3Qoc3RhdGUuaW5wdXQuc2xpY2UoZG9jdW1lbnRTdGFydCwgc3RhdGUucG9zaXRpb24pKSkge1xuICAgIHRocm93V2FybmluZyhzdGF0ZSwgJ25vbi1BU0NJSSBsaW5lIGJyZWFrcyBhcmUgaW50ZXJwcmV0ZWQgYXMgY29udGVudCcpO1xuICB9XG5cbiAgc3RhdGUuZG9jdW1lbnRzLnB1c2goc3RhdGUucmVzdWx0KTtcblxuICBpZiAoc3RhdGUucG9zaXRpb24gPT09IHN0YXRlLmxpbmVTdGFydCAmJiB0ZXN0RG9jdW1lbnRTZXBhcmF0b3Ioc3RhdGUpKSB7XG5cbiAgICBpZiAoc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbikgPT09IDB4MkUvKiAuICovKSB7XG4gICAgICBzdGF0ZS5wb3NpdGlvbiArPSAzO1xuICAgICAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgLTEpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoc3RhdGUucG9zaXRpb24gPCAoc3RhdGUubGVuZ3RoIC0gMSkpIHtcbiAgICB0aHJvd0Vycm9yKHN0YXRlLCAnZW5kIG9mIHRoZSBzdHJlYW0gb3IgYSBkb2N1bWVudCBzZXBhcmF0b3IgaXMgZXhwZWN0ZWQnKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm47XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBsb2FkRG9jdW1lbnRzKGlucHV0LCBvcHRpb25zKSB7XG4gIGlucHV0ID0gU3RyaW5nKGlucHV0KTtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgaWYgKGlucHV0Lmxlbmd0aCAhPT0gMCkge1xuXG4gICAgLy8gQWRkIHRhaWxpbmcgYFxcbmAgaWYgbm90IGV4aXN0c1xuICAgIGlmIChpbnB1dC5jaGFyQ29kZUF0KGlucHV0Lmxlbmd0aCAtIDEpICE9PSAweDBBLyogTEYgKi8gJiZcbiAgICAgICAgaW5wdXQuY2hhckNvZGVBdChpbnB1dC5sZW5ndGggLSAxKSAhPT0gMHgwRC8qIENSICovKSB7XG4gICAgICBpbnB1dCArPSAnXFxuJztcbiAgICB9XG5cbiAgICAvLyBTdHJpcCBCT01cbiAgICBpZiAoaW5wdXQuY2hhckNvZGVBdCgwKSA9PT0gMHhGRUZGKSB7XG4gICAgICBpbnB1dCA9IGlucHV0LnNsaWNlKDEpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBzdGF0ZSA9IG5ldyBTdGF0ZShpbnB1dCwgb3B0aW9ucyk7XG5cbiAgdmFyIG51bGxwb3MgPSBpbnB1dC5pbmRleE9mKCdcXDAnKTtcblxuICBpZiAobnVsbHBvcyAhPT0gLTEpIHtcbiAgICBzdGF0ZS5wb3NpdGlvbiA9IG51bGxwb3M7XG4gICAgdGhyb3dFcnJvcihzdGF0ZSwgJ251bGwgYnl0ZSBpcyBub3QgYWxsb3dlZCBpbiBpbnB1dCcpO1xuICB9XG5cbiAgLy8gVXNlIDAgYXMgc3RyaW5nIHRlcm1pbmF0b3IuIFRoYXQgc2lnbmlmaWNhbnRseSBzaW1wbGlmaWVzIGJvdW5kcyBjaGVjay5cbiAgc3RhdGUuaW5wdXQgKz0gJ1xcMCc7XG5cbiAgd2hpbGUgKHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pID09PSAweDIwLyogU3BhY2UgKi8pIHtcbiAgICBzdGF0ZS5saW5lSW5kZW50ICs9IDE7XG4gICAgc3RhdGUucG9zaXRpb24gKz0gMTtcbiAgfVxuXG4gIHdoaWxlIChzdGF0ZS5wb3NpdGlvbiA8IChzdGF0ZS5sZW5ndGggLSAxKSkge1xuICAgIHJlYWREb2N1bWVudChzdGF0ZSk7XG4gIH1cblxuICByZXR1cm4gc3RhdGUuZG9jdW1lbnRzO1xufVxuXG5cbmZ1bmN0aW9uIGxvYWRBbGwoaW5wdXQsIGl0ZXJhdG9yLCBvcHRpb25zKSB7XG4gIGlmIChpdGVyYXRvciAhPT0gbnVsbCAmJiB0eXBlb2YgaXRlcmF0b3IgPT09ICdvYmplY3QnICYmIHR5cGVvZiBvcHRpb25zID09PSAndW5kZWZpbmVkJykge1xuICAgIG9wdGlvbnMgPSBpdGVyYXRvcjtcbiAgICBpdGVyYXRvciA9IG51bGw7XG4gIH1cblxuICB2YXIgZG9jdW1lbnRzID0gbG9hZERvY3VtZW50cyhpbnB1dCwgb3B0aW9ucyk7XG5cbiAgaWYgKHR5cGVvZiBpdGVyYXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBkb2N1bWVudHM7XG4gIH1cblxuICBmb3IgKHZhciBpbmRleCA9IDAsIGxlbmd0aCA9IGRvY3VtZW50cy5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgaXRlcmF0b3IoZG9jdW1lbnRzW2luZGV4XSk7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBsb2FkKGlucHV0LCBvcHRpb25zKSB7XG4gIHZhciBkb2N1bWVudHMgPSBsb2FkRG9jdW1lbnRzKGlucHV0LCBvcHRpb25zKTtcblxuICBpZiAoZG9jdW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIC8qZXNsaW50LWRpc2FibGUgbm8tdW5kZWZpbmVkKi9cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9IGVsc2UgaWYgKGRvY3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gZG9jdW1lbnRzWzBdO1xuICB9XG4gIHRocm93IG5ldyBZQU1MRXhjZXB0aW9uKCdleHBlY3RlZCBhIHNpbmdsZSBkb2N1bWVudCBpbiB0aGUgc3RyZWFtLCBidXQgZm91bmQgbW9yZScpO1xufVxuXG5cbmZ1bmN0aW9uIHNhZmVMb2FkQWxsKGlucHV0LCBpdGVyYXRvciwgb3B0aW9ucykge1xuICBpZiAodHlwZW9mIGl0ZXJhdG9yID09PSAnb2JqZWN0JyAmJiBpdGVyYXRvciAhPT0gbnVsbCAmJiB0eXBlb2Ygb3B0aW9ucyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBvcHRpb25zID0gaXRlcmF0b3I7XG4gICAgaXRlcmF0b3IgPSBudWxsO1xuICB9XG5cbiAgcmV0dXJuIGxvYWRBbGwoaW5wdXQsIGl0ZXJhdG9yLCBjb21tb24uZXh0ZW5kKHsgc2NoZW1hOiBERUZBVUxUX1NBRkVfU0NIRU1BIH0sIG9wdGlvbnMpKTtcbn1cblxuXG5mdW5jdGlvbiBzYWZlTG9hZChpbnB1dCwgb3B0aW9ucykge1xuICByZXR1cm4gbG9hZChpbnB1dCwgY29tbW9uLmV4dGVuZCh7IHNjaGVtYTogREVGQVVMVF9TQUZFX1NDSEVNQSB9LCBvcHRpb25zKSk7XG59XG5cblxubW9kdWxlLmV4cG9ydHMubG9hZEFsbCAgICAgPSBsb2FkQWxsO1xubW9kdWxlLmV4cG9ydHMubG9hZCAgICAgICAgPSBsb2FkO1xubW9kdWxlLmV4cG9ydHMuc2FmZUxvYWRBbGwgPSBzYWZlTG9hZEFsbDtcbm1vZHVsZS5leHBvcnRzLnNhZmVMb2FkICAgID0gc2FmZUxvYWQ7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG4vKmVzbGludC1kaXNhYmxlIG5vLXVzZS1iZWZvcmUtZGVmaW5lKi9cblxudmFyIGNvbW1vbiAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL2NvbW1vbicpO1xudmFyIFlBTUxFeGNlcHRpb24gICAgICAgPSByZXF1aXJlKCcuL2V4Y2VwdGlvbicpO1xudmFyIERFRkFVTFRfRlVMTF9TQ0hFTUEgPSByZXF1aXJlKCcuL3NjaGVtYS9kZWZhdWx0X2Z1bGwnKTtcbnZhciBERUZBVUxUX1NBRkVfU0NIRU1BID0gcmVxdWlyZSgnLi9zY2hlbWEvZGVmYXVsdF9zYWZlJyk7XG5cbnZhciBfdG9TdHJpbmcgICAgICAgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIF9oYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbnZhciBDSEFSX1RBQiAgICAgICAgICAgICAgICAgID0gMHgwOTsgLyogVGFiICovXG52YXIgQ0hBUl9MSU5FX0ZFRUQgICAgICAgICAgICA9IDB4MEE7IC8qIExGICovXG52YXIgQ0hBUl9DQVJSSUFHRV9SRVRVUk4gICAgICA9IDB4MEQ7IC8qIENSICovXG52YXIgQ0hBUl9TUEFDRSAgICAgICAgICAgICAgICA9IDB4MjA7IC8qIFNwYWNlICovXG52YXIgQ0hBUl9FWENMQU1BVElPTiAgICAgICAgICA9IDB4MjE7IC8qICEgKi9cbnZhciBDSEFSX0RPVUJMRV9RVU9URSAgICAgICAgID0gMHgyMjsgLyogXCIgKi9cbnZhciBDSEFSX1NIQVJQICAgICAgICAgICAgICAgID0gMHgyMzsgLyogIyAqL1xudmFyIENIQVJfUEVSQ0VOVCAgICAgICAgICAgICAgPSAweDI1OyAvKiAlICovXG52YXIgQ0hBUl9BTVBFUlNBTkQgICAgICAgICAgICA9IDB4MjY7IC8qICYgKi9cbnZhciBDSEFSX1NJTkdMRV9RVU9URSAgICAgICAgID0gMHgyNzsgLyogJyAqL1xudmFyIENIQVJfQVNURVJJU0sgICAgICAgICAgICAgPSAweDJBOyAvKiAqICovXG52YXIgQ0hBUl9DT01NQSAgICAgICAgICAgICAgICA9IDB4MkM7IC8qICwgKi9cbnZhciBDSEFSX01JTlVTICAgICAgICAgICAgICAgID0gMHgyRDsgLyogLSAqL1xudmFyIENIQVJfQ09MT04gICAgICAgICAgICAgICAgPSAweDNBOyAvKiA6ICovXG52YXIgQ0hBUl9FUVVBTFMgICAgICAgICAgICAgICA9IDB4M0Q7IC8qID0gKi9cbnZhciBDSEFSX0dSRUFURVJfVEhBTiAgICAgICAgID0gMHgzRTsgLyogPiAqL1xudmFyIENIQVJfUVVFU1RJT04gICAgICAgICAgICAgPSAweDNGOyAvKiA/ICovXG52YXIgQ0hBUl9DT01NRVJDSUFMX0FUICAgICAgICA9IDB4NDA7IC8qIEAgKi9cbnZhciBDSEFSX0xFRlRfU1FVQVJFX0JSQUNLRVQgID0gMHg1QjsgLyogWyAqL1xudmFyIENIQVJfUklHSFRfU1FVQVJFX0JSQUNLRVQgPSAweDVEOyAvKiBdICovXG52YXIgQ0hBUl9HUkFWRV9BQ0NFTlQgICAgICAgICA9IDB4NjA7IC8qIGAgKi9cbnZhciBDSEFSX0xFRlRfQ1VSTFlfQlJBQ0tFVCAgID0gMHg3QjsgLyogeyAqL1xudmFyIENIQVJfVkVSVElDQUxfTElORSAgICAgICAgPSAweDdDOyAvKiB8ICovXG52YXIgQ0hBUl9SSUdIVF9DVVJMWV9CUkFDS0VUICA9IDB4N0Q7IC8qIH0gKi9cblxudmFyIEVTQ0FQRV9TRVFVRU5DRVMgPSB7fTtcblxuRVNDQVBFX1NFUVVFTkNFU1sweDAwXSAgID0gJ1xcXFwwJztcbkVTQ0FQRV9TRVFVRU5DRVNbMHgwN10gICA9ICdcXFxcYSc7XG5FU0NBUEVfU0VRVUVOQ0VTWzB4MDhdICAgPSAnXFxcXGInO1xuRVNDQVBFX1NFUVVFTkNFU1sweDA5XSAgID0gJ1xcXFx0JztcbkVTQ0FQRV9TRVFVRU5DRVNbMHgwQV0gICA9ICdcXFxcbic7XG5FU0NBUEVfU0VRVUVOQ0VTWzB4MEJdICAgPSAnXFxcXHYnO1xuRVNDQVBFX1NFUVVFTkNFU1sweDBDXSAgID0gJ1xcXFxmJztcbkVTQ0FQRV9TRVFVRU5DRVNbMHgwRF0gICA9ICdcXFxccic7XG5FU0NBUEVfU0VRVUVOQ0VTWzB4MUJdICAgPSAnXFxcXGUnO1xuRVNDQVBFX1NFUVVFTkNFU1sweDIyXSAgID0gJ1xcXFxcIic7XG5FU0NBUEVfU0VRVUVOQ0VTWzB4NUNdICAgPSAnXFxcXFxcXFwnO1xuRVNDQVBFX1NFUVVFTkNFU1sweDg1XSAgID0gJ1xcXFxOJztcbkVTQ0FQRV9TRVFVRU5DRVNbMHhBMF0gICA9ICdcXFxcXyc7XG5FU0NBUEVfU0VRVUVOQ0VTWzB4MjAyOF0gPSAnXFxcXEwnO1xuRVNDQVBFX1NFUVVFTkNFU1sweDIwMjldID0gJ1xcXFxQJztcblxudmFyIERFUFJFQ0FURURfQk9PTEVBTlNfU1lOVEFYID0gW1xuICAneScsICdZJywgJ3llcycsICdZZXMnLCAnWUVTJywgJ29uJywgJ09uJywgJ09OJyxcbiAgJ24nLCAnTicsICdubycsICdObycsICdOTycsICdvZmYnLCAnT2ZmJywgJ09GRidcbl07XG5cbmZ1bmN0aW9uIGNvbXBpbGVTdHlsZU1hcChzY2hlbWEsIG1hcCkge1xuICB2YXIgcmVzdWx0LCBrZXlzLCBpbmRleCwgbGVuZ3RoLCB0YWcsIHN0eWxlLCB0eXBlO1xuXG4gIGlmIChtYXAgPT09IG51bGwpIHJldHVybiB7fTtcblxuICByZXN1bHQgPSB7fTtcbiAga2V5cyA9IE9iamVjdC5rZXlzKG1hcCk7XG5cbiAgZm9yIChpbmRleCA9IDAsIGxlbmd0aCA9IGtleXMubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgIHRhZyA9IGtleXNbaW5kZXhdO1xuICAgIHN0eWxlID0gU3RyaW5nKG1hcFt0YWddKTtcblxuICAgIGlmICh0YWcuc2xpY2UoMCwgMikgPT09ICchIScpIHtcbiAgICAgIHRhZyA9ICd0YWc6eWFtbC5vcmcsMjAwMjonICsgdGFnLnNsaWNlKDIpO1xuICAgIH1cbiAgICB0eXBlID0gc2NoZW1hLmNvbXBpbGVkVHlwZU1hcFsnZmFsbGJhY2snXVt0YWddO1xuXG4gICAgaWYgKHR5cGUgJiYgX2hhc093blByb3BlcnR5LmNhbGwodHlwZS5zdHlsZUFsaWFzZXMsIHN0eWxlKSkge1xuICAgICAgc3R5bGUgPSB0eXBlLnN0eWxlQWxpYXNlc1tzdHlsZV07XG4gICAgfVxuXG4gICAgcmVzdWx0W3RhZ10gPSBzdHlsZTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGVuY29kZUhleChjaGFyYWN0ZXIpIHtcbiAgdmFyIHN0cmluZywgaGFuZGxlLCBsZW5ndGg7XG5cbiAgc3RyaW5nID0gY2hhcmFjdGVyLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO1xuXG4gIGlmIChjaGFyYWN0ZXIgPD0gMHhGRikge1xuICAgIGhhbmRsZSA9ICd4JztcbiAgICBsZW5ndGggPSAyO1xuICB9IGVsc2UgaWYgKGNoYXJhY3RlciA8PSAweEZGRkYpIHtcbiAgICBoYW5kbGUgPSAndSc7XG4gICAgbGVuZ3RoID0gNDtcbiAgfSBlbHNlIGlmIChjaGFyYWN0ZXIgPD0gMHhGRkZGRkZGRikge1xuICAgIGhhbmRsZSA9ICdVJztcbiAgICBsZW5ndGggPSA4O1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBZQU1MRXhjZXB0aW9uKCdjb2RlIHBvaW50IHdpdGhpbiBhIHN0cmluZyBtYXkgbm90IGJlIGdyZWF0ZXIgdGhhbiAweEZGRkZGRkZGJyk7XG4gIH1cblxuICByZXR1cm4gJ1xcXFwnICsgaGFuZGxlICsgY29tbW9uLnJlcGVhdCgnMCcsIGxlbmd0aCAtIHN0cmluZy5sZW5ndGgpICsgc3RyaW5nO1xufVxuXG5mdW5jdGlvbiBTdGF0ZShvcHRpb25zKSB7XG4gIHRoaXMuc2NoZW1hICAgICAgICA9IG9wdGlvbnNbJ3NjaGVtYSddIHx8IERFRkFVTFRfRlVMTF9TQ0hFTUE7XG4gIHRoaXMuaW5kZW50ICAgICAgICA9IE1hdGgubWF4KDEsIChvcHRpb25zWydpbmRlbnQnXSB8fCAyKSk7XG4gIHRoaXMubm9BcnJheUluZGVudCA9IG9wdGlvbnNbJ25vQXJyYXlJbmRlbnQnXSB8fCBmYWxzZTtcbiAgdGhpcy5za2lwSW52YWxpZCAgID0gb3B0aW9uc1snc2tpcEludmFsaWQnXSB8fCBmYWxzZTtcbiAgdGhpcy5mbG93TGV2ZWwgICAgID0gKGNvbW1vbi5pc05vdGhpbmcob3B0aW9uc1snZmxvd0xldmVsJ10pID8gLTEgOiBvcHRpb25zWydmbG93TGV2ZWwnXSk7XG4gIHRoaXMuc3R5bGVNYXAgICAgICA9IGNvbXBpbGVTdHlsZU1hcCh0aGlzLnNjaGVtYSwgb3B0aW9uc1snc3R5bGVzJ10gfHwgbnVsbCk7XG4gIHRoaXMuc29ydEtleXMgICAgICA9IG9wdGlvbnNbJ3NvcnRLZXlzJ10gfHwgZmFsc2U7XG4gIHRoaXMubGluZVdpZHRoICAgICA9IG9wdGlvbnNbJ2xpbmVXaWR0aCddIHx8IDgwO1xuICB0aGlzLm5vUmVmcyAgICAgICAgPSBvcHRpb25zWydub1JlZnMnXSB8fCBmYWxzZTtcbiAgdGhpcy5ub0NvbXBhdE1vZGUgID0gb3B0aW9uc1snbm9Db21wYXRNb2RlJ10gfHwgZmFsc2U7XG4gIHRoaXMuY29uZGVuc2VGbG93ICA9IG9wdGlvbnNbJ2NvbmRlbnNlRmxvdyddIHx8IGZhbHNlO1xuXG4gIHRoaXMuaW1wbGljaXRUeXBlcyA9IHRoaXMuc2NoZW1hLmNvbXBpbGVkSW1wbGljaXQ7XG4gIHRoaXMuZXhwbGljaXRUeXBlcyA9IHRoaXMuc2NoZW1hLmNvbXBpbGVkRXhwbGljaXQ7XG5cbiAgdGhpcy50YWcgPSBudWxsO1xuICB0aGlzLnJlc3VsdCA9ICcnO1xuXG4gIHRoaXMuZHVwbGljYXRlcyA9IFtdO1xuICB0aGlzLnVzZWREdXBsaWNhdGVzID0gbnVsbDtcbn1cblxuLy8gSW5kZW50cyBldmVyeSBsaW5lIGluIGEgc3RyaW5nLiBFbXB0eSBsaW5lcyAoXFxuIG9ubHkpIGFyZSBub3QgaW5kZW50ZWQuXG5mdW5jdGlvbiBpbmRlbnRTdHJpbmcoc3RyaW5nLCBzcGFjZXMpIHtcbiAgdmFyIGluZCA9IGNvbW1vbi5yZXBlYXQoJyAnLCBzcGFjZXMpLFxuICAgICAgcG9zaXRpb24gPSAwLFxuICAgICAgbmV4dCA9IC0xLFxuICAgICAgcmVzdWx0ID0gJycsXG4gICAgICBsaW5lLFxuICAgICAgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aDtcblxuICB3aGlsZSAocG9zaXRpb24gPCBsZW5ndGgpIHtcbiAgICBuZXh0ID0gc3RyaW5nLmluZGV4T2YoJ1xcbicsIHBvc2l0aW9uKTtcbiAgICBpZiAobmV4dCA9PT0gLTEpIHtcbiAgICAgIGxpbmUgPSBzdHJpbmcuc2xpY2UocG9zaXRpb24pO1xuICAgICAgcG9zaXRpb24gPSBsZW5ndGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpbmUgPSBzdHJpbmcuc2xpY2UocG9zaXRpb24sIG5leHQgKyAxKTtcbiAgICAgIHBvc2l0aW9uID0gbmV4dCArIDE7XG4gICAgfVxuXG4gICAgaWYgKGxpbmUubGVuZ3RoICYmIGxpbmUgIT09ICdcXG4nKSByZXN1bHQgKz0gaW5kO1xuXG4gICAgcmVzdWx0ICs9IGxpbmU7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZU5leHRMaW5lKHN0YXRlLCBsZXZlbCkge1xuICByZXR1cm4gJ1xcbicgKyBjb21tb24ucmVwZWF0KCcgJywgc3RhdGUuaW5kZW50ICogbGV2ZWwpO1xufVxuXG5mdW5jdGlvbiB0ZXN0SW1wbGljaXRSZXNvbHZpbmcoc3RhdGUsIHN0cikge1xuICB2YXIgaW5kZXgsIGxlbmd0aCwgdHlwZTtcblxuICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gc3RhdGUuaW1wbGljaXRUeXBlcy5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgdHlwZSA9IHN0YXRlLmltcGxpY2l0VHlwZXNbaW5kZXhdO1xuXG4gICAgaWYgKHR5cGUucmVzb2x2ZShzdHIpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8vIFszM10gcy13aGl0ZSA6Oj0gcy1zcGFjZSB8IHMtdGFiXG5mdW5jdGlvbiBpc1doaXRlc3BhY2UoYykge1xuICByZXR1cm4gYyA9PT0gQ0hBUl9TUEFDRSB8fCBjID09PSBDSEFSX1RBQjtcbn1cblxuLy8gUmV0dXJucyB0cnVlIGlmIHRoZSBjaGFyYWN0ZXIgY2FuIGJlIHByaW50ZWQgd2l0aG91dCBlc2NhcGluZy5cbi8vIEZyb20gWUFNTCAxLjI6IFwiYW55IGFsbG93ZWQgY2hhcmFjdGVycyBrbm93biB0byBiZSBub24tcHJpbnRhYmxlXG4vLyBzaG91bGQgYWxzbyBiZSBlc2NhcGVkLiBbSG93ZXZlcixdIFRoaXMgaXNuXHUyMDE5dCBtYW5kYXRvcnlcIlxuLy8gRGVyaXZlZCBmcm9tIG5iLWNoYXIgLSBcXHQgLSAjeDg1IC0gI3hBMCAtICN4MjAyOCAtICN4MjAyOS5cbmZ1bmN0aW9uIGlzUHJpbnRhYmxlKGMpIHtcbiAgcmV0dXJuICAoMHgwMDAyMCA8PSBjICYmIGMgPD0gMHgwMDAwN0UpXG4gICAgICB8fCAoKDB4MDAwQTEgPD0gYyAmJiBjIDw9IDB4MDBEN0ZGKSAmJiBjICE9PSAweDIwMjggJiYgYyAhPT0gMHgyMDI5KVxuICAgICAgfHwgKCgweDBFMDAwIDw9IGMgJiYgYyA8PSAweDAwRkZGRCkgJiYgYyAhPT0gMHhGRUZGIC8qIEJPTSAqLylcbiAgICAgIHx8ICAoMHgxMDAwMCA8PSBjICYmIGMgPD0gMHgxMEZGRkYpO1xufVxuXG4vLyBbMzRdIG5zLWNoYXIgOjo9IG5iLWNoYXIgLSBzLXdoaXRlXG4vLyBbMjddIG5iLWNoYXIgOjo9IGMtcHJpbnRhYmxlIC0gYi1jaGFyIC0gYy1ieXRlLW9yZGVyLW1hcmtcbi8vIFsyNl0gYi1jaGFyICA6Oj0gYi1saW5lLWZlZWQgfCBiLWNhcnJpYWdlLXJldHVyblxuLy8gWzI0XSBiLWxpbmUtZmVlZCAgICAgICA6Oj0gICAgICN4QSAgICAvKiBMRiAqL1xuLy8gWzI1XSBiLWNhcnJpYWdlLXJldHVybiA6Oj0gICAgICN4RCAgICAvKiBDUiAqL1xuLy8gWzNdICBjLWJ5dGUtb3JkZXItbWFyayA6Oj0gICAgICN4RkVGRlxuZnVuY3Rpb24gaXNOc0NoYXIoYykge1xuICByZXR1cm4gaXNQcmludGFibGUoYykgJiYgIWlzV2hpdGVzcGFjZShjKVxuICAgIC8vIGJ5dGUtb3JkZXItbWFya1xuICAgICYmIGMgIT09IDB4RkVGRlxuICAgIC8vIGItY2hhclxuICAgICYmIGMgIT09IENIQVJfQ0FSUklBR0VfUkVUVVJOXG4gICAgJiYgYyAhPT0gQ0hBUl9MSU5FX0ZFRUQ7XG59XG5cbi8vIFNpbXBsaWZpZWQgdGVzdCBmb3IgdmFsdWVzIGFsbG93ZWQgYWZ0ZXIgdGhlIGZpcnN0IGNoYXJhY3RlciBpbiBwbGFpbiBzdHlsZS5cbmZ1bmN0aW9uIGlzUGxhaW5TYWZlKGMsIHByZXYpIHtcbiAgLy8gVXNlcyBhIHN1YnNldCBvZiBuYi1jaGFyIC0gYy1mbG93LWluZGljYXRvciAtIFwiOlwiIC0gXCIjXCJcbiAgLy8gd2hlcmUgbmItY2hhciA6Oj0gYy1wcmludGFibGUgLSBiLWNoYXIgLSBjLWJ5dGUtb3JkZXItbWFyay5cbiAgcmV0dXJuIGlzUHJpbnRhYmxlKGMpICYmIGMgIT09IDB4RkVGRlxuICAgIC8vIC0gYy1mbG93LWluZGljYXRvclxuICAgICYmIGMgIT09IENIQVJfQ09NTUFcbiAgICAmJiBjICE9PSBDSEFSX0xFRlRfU1FVQVJFX0JSQUNLRVRcbiAgICAmJiBjICE9PSBDSEFSX1JJR0hUX1NRVUFSRV9CUkFDS0VUXG4gICAgJiYgYyAhPT0gQ0hBUl9MRUZUX0NVUkxZX0JSQUNLRVRcbiAgICAmJiBjICE9PSBDSEFSX1JJR0hUX0NVUkxZX0JSQUNLRVRcbiAgICAvLyAtIFwiOlwiIC0gXCIjXCJcbiAgICAvLyAvKiBBbiBucy1jaGFyIHByZWNlZGluZyAqLyBcIiNcIlxuICAgICYmIGMgIT09IENIQVJfQ09MT05cbiAgICAmJiAoKGMgIT09IENIQVJfU0hBUlApIHx8IChwcmV2ICYmIGlzTnNDaGFyKHByZXYpKSk7XG59XG5cbi8vIFNpbXBsaWZpZWQgdGVzdCBmb3IgdmFsdWVzIGFsbG93ZWQgYXMgdGhlIGZpcnN0IGNoYXJhY3RlciBpbiBwbGFpbiBzdHlsZS5cbmZ1bmN0aW9uIGlzUGxhaW5TYWZlRmlyc3QoYykge1xuICAvLyBVc2VzIGEgc3Vic2V0IG9mIG5zLWNoYXIgLSBjLWluZGljYXRvclxuICAvLyB3aGVyZSBucy1jaGFyID0gbmItY2hhciAtIHMtd2hpdGUuXG4gIHJldHVybiBpc1ByaW50YWJsZShjKSAmJiBjICE9PSAweEZFRkZcbiAgICAmJiAhaXNXaGl0ZXNwYWNlKGMpIC8vIC0gcy13aGl0ZVxuICAgIC8vIC0gKGMtaW5kaWNhdG9yIDo6PVxuICAgIC8vIFx1MjAxQy1cdTIwMUQgfCBcdTIwMUM/XHUyMDFEIHwgXHUyMDFDOlx1MjAxRCB8IFx1MjAxQyxcdTIwMUQgfCBcdTIwMUNbXHUyMDFEIHwgXHUyMDFDXVx1MjAxRCB8IFx1MjAxQ3tcdTIwMUQgfCBcdTIwMUN9XHUyMDFEXG4gICAgJiYgYyAhPT0gQ0hBUl9NSU5VU1xuICAgICYmIGMgIT09IENIQVJfUVVFU1RJT05cbiAgICAmJiBjICE9PSBDSEFSX0NPTE9OXG4gICAgJiYgYyAhPT0gQ0hBUl9DT01NQVxuICAgICYmIGMgIT09IENIQVJfTEVGVF9TUVVBUkVfQlJBQ0tFVFxuICAgICYmIGMgIT09IENIQVJfUklHSFRfU1FVQVJFX0JSQUNLRVRcbiAgICAmJiBjICE9PSBDSEFSX0xFRlRfQ1VSTFlfQlJBQ0tFVFxuICAgICYmIGMgIT09IENIQVJfUklHSFRfQ1VSTFlfQlJBQ0tFVFxuICAgIC8vIHwgXHUyMDFDI1x1MjAxRCB8IFx1MjAxQyZcdTIwMUQgfCBcdTIwMUMqXHUyMDFEIHwgXHUyMDFDIVx1MjAxRCB8IFx1MjAxQ3xcdTIwMUQgfCBcdTIwMUM9XHUyMDFEIHwgXHUyMDFDPlx1MjAxRCB8IFx1MjAxQydcdTIwMUQgfCBcdTIwMUNcIlx1MjAxRFxuICAgICYmIGMgIT09IENIQVJfU0hBUlBcbiAgICAmJiBjICE9PSBDSEFSX0FNUEVSU0FORFxuICAgICYmIGMgIT09IENIQVJfQVNURVJJU0tcbiAgICAmJiBjICE9PSBDSEFSX0VYQ0xBTUFUSU9OXG4gICAgJiYgYyAhPT0gQ0hBUl9WRVJUSUNBTF9MSU5FXG4gICAgJiYgYyAhPT0gQ0hBUl9FUVVBTFNcbiAgICAmJiBjICE9PSBDSEFSX0dSRUFURVJfVEhBTlxuICAgICYmIGMgIT09IENIQVJfU0lOR0xFX1FVT1RFXG4gICAgJiYgYyAhPT0gQ0hBUl9ET1VCTEVfUVVPVEVcbiAgICAvLyB8IFx1MjAxQyVcdTIwMUQgfCBcdTIwMUNAXHUyMDFEIHwgXHUyMDFDYFx1MjAxRClcbiAgICAmJiBjICE9PSBDSEFSX1BFUkNFTlRcbiAgICAmJiBjICE9PSBDSEFSX0NPTU1FUkNJQUxfQVRcbiAgICAmJiBjICE9PSBDSEFSX0dSQVZFX0FDQ0VOVDtcbn1cblxuLy8gRGV0ZXJtaW5lcyB3aGV0aGVyIGJsb2NrIGluZGVudGF0aW9uIGluZGljYXRvciBpcyByZXF1aXJlZC5cbmZ1bmN0aW9uIG5lZWRJbmRlbnRJbmRpY2F0b3Ioc3RyaW5nKSB7XG4gIHZhciBsZWFkaW5nU3BhY2VSZSA9IC9eXFxuKiAvO1xuICByZXR1cm4gbGVhZGluZ1NwYWNlUmUudGVzdChzdHJpbmcpO1xufVxuXG52YXIgU1RZTEVfUExBSU4gICA9IDEsXG4gICAgU1RZTEVfU0lOR0xFICA9IDIsXG4gICAgU1RZTEVfTElURVJBTCA9IDMsXG4gICAgU1RZTEVfRk9MREVEICA9IDQsXG4gICAgU1RZTEVfRE9VQkxFICA9IDU7XG5cbi8vIERldGVybWluZXMgd2hpY2ggc2NhbGFyIHN0eWxlcyBhcmUgcG9zc2libGUgYW5kIHJldHVybnMgdGhlIHByZWZlcnJlZCBzdHlsZS5cbi8vIGxpbmVXaWR0aCA9IC0xID0+IG5vIGxpbWl0LlxuLy8gUHJlLWNvbmRpdGlvbnM6IHN0ci5sZW5ndGggPiAwLlxuLy8gUG9zdC1jb25kaXRpb25zOlxuLy8gICAgU1RZTEVfUExBSU4gb3IgU1RZTEVfU0lOR0xFID0+IG5vIFxcbiBhcmUgaW4gdGhlIHN0cmluZy5cbi8vICAgIFNUWUxFX0xJVEVSQUwgPT4gbm8gbGluZXMgYXJlIHN1aXRhYmxlIGZvciBmb2xkaW5nIChvciBsaW5lV2lkdGggaXMgLTEpLlxuLy8gICAgU1RZTEVfRk9MREVEID0+IGEgbGluZSA+IGxpbmVXaWR0aCBhbmQgY2FuIGJlIGZvbGRlZCAoYW5kIGxpbmVXaWR0aCAhPSAtMSkuXG5mdW5jdGlvbiBjaG9vc2VTY2FsYXJTdHlsZShzdHJpbmcsIHNpbmdsZUxpbmVPbmx5LCBpbmRlbnRQZXJMZXZlbCwgbGluZVdpZHRoLCB0ZXN0QW1iaWd1b3VzVHlwZSkge1xuICB2YXIgaTtcbiAgdmFyIGNoYXIsIHByZXZfY2hhcjtcbiAgdmFyIGhhc0xpbmVCcmVhayA9IGZhbHNlO1xuICB2YXIgaGFzRm9sZGFibGVMaW5lID0gZmFsc2U7IC8vIG9ubHkgY2hlY2tlZCBpZiBzaG91bGRUcmFja1dpZHRoXG4gIHZhciBzaG91bGRUcmFja1dpZHRoID0gbGluZVdpZHRoICE9PSAtMTtcbiAgdmFyIHByZXZpb3VzTGluZUJyZWFrID0gLTE7IC8vIGNvdW50IHRoZSBmaXJzdCBsaW5lIGNvcnJlY3RseVxuICB2YXIgcGxhaW4gPSBpc1BsYWluU2FmZUZpcnN0KHN0cmluZy5jaGFyQ29kZUF0KDApKVxuICAgICAgICAgICYmICFpc1doaXRlc3BhY2Uoc3RyaW5nLmNoYXJDb2RlQXQoc3RyaW5nLmxlbmd0aCAtIDEpKTtcblxuICBpZiAoc2luZ2xlTGluZU9ubHkpIHtcbiAgICAvLyBDYXNlOiBubyBibG9jayBzdHlsZXMuXG4gICAgLy8gQ2hlY2sgZm9yIGRpc2FsbG93ZWQgY2hhcmFjdGVycyB0byBydWxlIG91dCBwbGFpbiBhbmQgc2luZ2xlLlxuICAgIGZvciAoaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoYXIgPSBzdHJpbmcuY2hhckNvZGVBdChpKTtcbiAgICAgIGlmICghaXNQcmludGFibGUoY2hhcikpIHtcbiAgICAgICAgcmV0dXJuIFNUWUxFX0RPVUJMRTtcbiAgICAgIH1cbiAgICAgIHByZXZfY2hhciA9IGkgPiAwID8gc3RyaW5nLmNoYXJDb2RlQXQoaSAtIDEpIDogbnVsbDtcbiAgICAgIHBsYWluID0gcGxhaW4gJiYgaXNQbGFpblNhZmUoY2hhciwgcHJldl9jaGFyKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gQ2FzZTogYmxvY2sgc3R5bGVzIHBlcm1pdHRlZC5cbiAgICBmb3IgKGkgPSAwOyBpIDwgc3RyaW5nLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGFyID0gc3RyaW5nLmNoYXJDb2RlQXQoaSk7XG4gICAgICBpZiAoY2hhciA9PT0gQ0hBUl9MSU5FX0ZFRUQpIHtcbiAgICAgICAgaGFzTGluZUJyZWFrID0gdHJ1ZTtcbiAgICAgICAgLy8gQ2hlY2sgaWYgYW55IGxpbmUgY2FuIGJlIGZvbGRlZC5cbiAgICAgICAgaWYgKHNob3VsZFRyYWNrV2lkdGgpIHtcbiAgICAgICAgICBoYXNGb2xkYWJsZUxpbmUgPSBoYXNGb2xkYWJsZUxpbmUgfHxcbiAgICAgICAgICAgIC8vIEZvbGRhYmxlIGxpbmUgPSB0b28gbG9uZywgYW5kIG5vdCBtb3JlLWluZGVudGVkLlxuICAgICAgICAgICAgKGkgLSBwcmV2aW91c0xpbmVCcmVhayAtIDEgPiBsaW5lV2lkdGggJiZcbiAgICAgICAgICAgICBzdHJpbmdbcHJldmlvdXNMaW5lQnJlYWsgKyAxXSAhPT0gJyAnKTtcbiAgICAgICAgICBwcmV2aW91c0xpbmVCcmVhayA9IGk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoIWlzUHJpbnRhYmxlKGNoYXIpKSB7XG4gICAgICAgIHJldHVybiBTVFlMRV9ET1VCTEU7XG4gICAgICB9XG4gICAgICBwcmV2X2NoYXIgPSBpID4gMCA/IHN0cmluZy5jaGFyQ29kZUF0KGkgLSAxKSA6IG51bGw7XG4gICAgICBwbGFpbiA9IHBsYWluICYmIGlzUGxhaW5TYWZlKGNoYXIsIHByZXZfY2hhcik7XG4gICAgfVxuICAgIC8vIGluIGNhc2UgdGhlIGVuZCBpcyBtaXNzaW5nIGEgXFxuXG4gICAgaGFzRm9sZGFibGVMaW5lID0gaGFzRm9sZGFibGVMaW5lIHx8IChzaG91bGRUcmFja1dpZHRoICYmXG4gICAgICAoaSAtIHByZXZpb3VzTGluZUJyZWFrIC0gMSA+IGxpbmVXaWR0aCAmJlxuICAgICAgIHN0cmluZ1twcmV2aW91c0xpbmVCcmVhayArIDFdICE9PSAnICcpKTtcbiAgfVxuICAvLyBBbHRob3VnaCBldmVyeSBzdHlsZSBjYW4gcmVwcmVzZW50IFxcbiB3aXRob3V0IGVzY2FwaW5nLCBwcmVmZXIgYmxvY2sgc3R5bGVzXG4gIC8vIGZvciBtdWx0aWxpbmUsIHNpbmNlIHRoZXkncmUgbW9yZSByZWFkYWJsZSBhbmQgdGhleSBkb24ndCBhZGQgZW1wdHkgbGluZXMuXG4gIC8vIEFsc28gcHJlZmVyIGZvbGRpbmcgYSBzdXBlci1sb25nIGxpbmUuXG4gIGlmICghaGFzTGluZUJyZWFrICYmICFoYXNGb2xkYWJsZUxpbmUpIHtcbiAgICAvLyBTdHJpbmdzIGludGVycHJldGFibGUgYXMgYW5vdGhlciB0eXBlIGhhdmUgdG8gYmUgcXVvdGVkO1xuICAgIC8vIGUuZy4gdGhlIHN0cmluZyAndHJ1ZScgdnMuIHRoZSBib29sZWFuIHRydWUuXG4gICAgcmV0dXJuIHBsYWluICYmICF0ZXN0QW1iaWd1b3VzVHlwZShzdHJpbmcpXG4gICAgICA/IFNUWUxFX1BMQUlOIDogU1RZTEVfU0lOR0xFO1xuICB9XG4gIC8vIEVkZ2UgY2FzZTogYmxvY2sgaW5kZW50YXRpb24gaW5kaWNhdG9yIGNhbiBvbmx5IGhhdmUgb25lIGRpZ2l0LlxuICBpZiAoaW5kZW50UGVyTGV2ZWwgPiA5ICYmIG5lZWRJbmRlbnRJbmRpY2F0b3Ioc3RyaW5nKSkge1xuICAgIHJldHVybiBTVFlMRV9ET1VCTEU7XG4gIH1cbiAgLy8gQXQgdGhpcyBwb2ludCB3ZSBrbm93IGJsb2NrIHN0eWxlcyBhcmUgdmFsaWQuXG4gIC8vIFByZWZlciBsaXRlcmFsIHN0eWxlIHVubGVzcyB3ZSB3YW50IHRvIGZvbGQuXG4gIHJldHVybiBoYXNGb2xkYWJsZUxpbmUgPyBTVFlMRV9GT0xERUQgOiBTVFlMRV9MSVRFUkFMO1xufVxuXG4vLyBOb3RlOiBsaW5lIGJyZWFraW5nL2ZvbGRpbmcgaXMgaW1wbGVtZW50ZWQgZm9yIG9ubHkgdGhlIGZvbGRlZCBzdHlsZS5cbi8vIE5CLiBXZSBkcm9wIHRoZSBsYXN0IHRyYWlsaW5nIG5ld2xpbmUgKGlmIGFueSkgb2YgYSByZXR1cm5lZCBibG9jayBzY2FsYXJcbi8vICBzaW5jZSB0aGUgZHVtcGVyIGFkZHMgaXRzIG93biBuZXdsaW5lLiBUaGlzIGFsd2F5cyB3b3Jrczpcbi8vICAgIFx1MjAyMiBObyBlbmRpbmcgbmV3bGluZSA9PiB1bmFmZmVjdGVkOyBhbHJlYWR5IHVzaW5nIHN0cmlwIFwiLVwiIGNob21waW5nLlxuLy8gICAgXHUyMDIyIEVuZGluZyBuZXdsaW5lICAgID0+IHJlbW92ZWQgdGhlbiByZXN0b3JlZC5cbi8vICBJbXBvcnRhbnRseSwgdGhpcyBrZWVwcyB0aGUgXCIrXCIgY2hvbXAgaW5kaWNhdG9yIGZyb20gZ2FpbmluZyBhbiBleHRyYSBsaW5lLlxuZnVuY3Rpb24gd3JpdGVTY2FsYXIoc3RhdGUsIHN0cmluZywgbGV2ZWwsIGlza2V5KSB7XG4gIHN0YXRlLmR1bXAgPSAoZnVuY3Rpb24gKCkge1xuICAgIGlmIChzdHJpbmcubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gXCInJ1wiO1xuICAgIH1cbiAgICBpZiAoIXN0YXRlLm5vQ29tcGF0TW9kZSAmJlxuICAgICAgICBERVBSRUNBVEVEX0JPT0xFQU5TX1NZTlRBWC5pbmRleE9mKHN0cmluZykgIT09IC0xKSB7XG4gICAgICByZXR1cm4gXCInXCIgKyBzdHJpbmcgKyBcIidcIjtcbiAgICB9XG5cbiAgICB2YXIgaW5kZW50ID0gc3RhdGUuaW5kZW50ICogTWF0aC5tYXgoMSwgbGV2ZWwpOyAvLyBubyAwLWluZGVudCBzY2FsYXJzXG4gICAgLy8gQXMgaW5kZW50YXRpb24gZ2V0cyBkZWVwZXIsIGxldCB0aGUgd2lkdGggZGVjcmVhc2UgbW9ub3RvbmljYWxseVxuICAgIC8vIHRvIHRoZSBsb3dlciBib3VuZCBtaW4oc3RhdGUubGluZVdpZHRoLCA0MCkuXG4gICAgLy8gTm90ZSB0aGF0IHRoaXMgaW1wbGllc1xuICAgIC8vICBzdGF0ZS5saW5lV2lkdGggXHUyMjY0IDQwICsgc3RhdGUuaW5kZW50OiB3aWR0aCBpcyBmaXhlZCBhdCB0aGUgbG93ZXIgYm91bmQuXG4gICAgLy8gIHN0YXRlLmxpbmVXaWR0aCA+IDQwICsgc3RhdGUuaW5kZW50OiB3aWR0aCBkZWNyZWFzZXMgdW50aWwgdGhlIGxvd2VyIGJvdW5kLlxuICAgIC8vIFRoaXMgYmVoYXZlcyBiZXR0ZXIgdGhhbiBhIGNvbnN0YW50IG1pbmltdW0gd2lkdGggd2hpY2ggZGlzYWxsb3dzIG5hcnJvd2VyIG9wdGlvbnMsXG4gICAgLy8gb3IgYW4gaW5kZW50IHRocmVzaG9sZCB3aGljaCBjYXVzZXMgdGhlIHdpZHRoIHRvIHN1ZGRlbmx5IGluY3JlYXNlLlxuICAgIHZhciBsaW5lV2lkdGggPSBzdGF0ZS5saW5lV2lkdGggPT09IC0xXG4gICAgICA/IC0xIDogTWF0aC5tYXgoTWF0aC5taW4oc3RhdGUubGluZVdpZHRoLCA0MCksIHN0YXRlLmxpbmVXaWR0aCAtIGluZGVudCk7XG5cbiAgICAvLyBXaXRob3V0IGtub3dpbmcgaWYga2V5cyBhcmUgaW1wbGljaXQvZXhwbGljaXQsIGFzc3VtZSBpbXBsaWNpdCBmb3Igc2FmZXR5LlxuICAgIHZhciBzaW5nbGVMaW5lT25seSA9IGlza2V5XG4gICAgICAvLyBObyBibG9jayBzdHlsZXMgaW4gZmxvdyBtb2RlLlxuICAgICAgfHwgKHN0YXRlLmZsb3dMZXZlbCA+IC0xICYmIGxldmVsID49IHN0YXRlLmZsb3dMZXZlbCk7XG4gICAgZnVuY3Rpb24gdGVzdEFtYmlndWl0eShzdHJpbmcpIHtcbiAgICAgIHJldHVybiB0ZXN0SW1wbGljaXRSZXNvbHZpbmcoc3RhdGUsIHN0cmluZyk7XG4gICAgfVxuXG4gICAgc3dpdGNoIChjaG9vc2VTY2FsYXJTdHlsZShzdHJpbmcsIHNpbmdsZUxpbmVPbmx5LCBzdGF0ZS5pbmRlbnQsIGxpbmVXaWR0aCwgdGVzdEFtYmlndWl0eSkpIHtcbiAgICAgIGNhc2UgU1RZTEVfUExBSU46XG4gICAgICAgIHJldHVybiBzdHJpbmc7XG4gICAgICBjYXNlIFNUWUxFX1NJTkdMRTpcbiAgICAgICAgcmV0dXJuIFwiJ1wiICsgc3RyaW5nLnJlcGxhY2UoLycvZywgXCInJ1wiKSArIFwiJ1wiO1xuICAgICAgY2FzZSBTVFlMRV9MSVRFUkFMOlxuICAgICAgICByZXR1cm4gJ3wnICsgYmxvY2tIZWFkZXIoc3RyaW5nLCBzdGF0ZS5pbmRlbnQpXG4gICAgICAgICAgKyBkcm9wRW5kaW5nTmV3bGluZShpbmRlbnRTdHJpbmcoc3RyaW5nLCBpbmRlbnQpKTtcbiAgICAgIGNhc2UgU1RZTEVfRk9MREVEOlxuICAgICAgICByZXR1cm4gJz4nICsgYmxvY2tIZWFkZXIoc3RyaW5nLCBzdGF0ZS5pbmRlbnQpXG4gICAgICAgICAgKyBkcm9wRW5kaW5nTmV3bGluZShpbmRlbnRTdHJpbmcoZm9sZFN0cmluZyhzdHJpbmcsIGxpbmVXaWR0aCksIGluZGVudCkpO1xuICAgICAgY2FzZSBTVFlMRV9ET1VCTEU6XG4gICAgICAgIHJldHVybiAnXCInICsgZXNjYXBlU3RyaW5nKHN0cmluZywgbGluZVdpZHRoKSArICdcIic7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgWUFNTEV4Y2VwdGlvbignaW1wb3NzaWJsZSBlcnJvcjogaW52YWxpZCBzY2FsYXIgc3R5bGUnKTtcbiAgICB9XG4gIH0oKSk7XG59XG5cbi8vIFByZS1jb25kaXRpb25zOiBzdHJpbmcgaXMgdmFsaWQgZm9yIGEgYmxvY2sgc2NhbGFyLCAxIDw9IGluZGVudFBlckxldmVsIDw9IDkuXG5mdW5jdGlvbiBibG9ja0hlYWRlcihzdHJpbmcsIGluZGVudFBlckxldmVsKSB7XG4gIHZhciBpbmRlbnRJbmRpY2F0b3IgPSBuZWVkSW5kZW50SW5kaWNhdG9yKHN0cmluZykgPyBTdHJpbmcoaW5kZW50UGVyTGV2ZWwpIDogJyc7XG5cbiAgLy8gbm90ZSB0aGUgc3BlY2lhbCBjYXNlOiB0aGUgc3RyaW5nICdcXG4nIGNvdW50cyBhcyBhIFwidHJhaWxpbmdcIiBlbXB0eSBsaW5lLlxuICB2YXIgY2xpcCA9ICAgICAgICAgIHN0cmluZ1tzdHJpbmcubGVuZ3RoIC0gMV0gPT09ICdcXG4nO1xuICB2YXIga2VlcCA9IGNsaXAgJiYgKHN0cmluZ1tzdHJpbmcubGVuZ3RoIC0gMl0gPT09ICdcXG4nIHx8IHN0cmluZyA9PT0gJ1xcbicpO1xuICB2YXIgY2hvbXAgPSBrZWVwID8gJysnIDogKGNsaXAgPyAnJyA6ICctJyk7XG5cbiAgcmV0dXJuIGluZGVudEluZGljYXRvciArIGNob21wICsgJ1xcbic7XG59XG5cbi8vIChTZWUgdGhlIG5vdGUgZm9yIHdyaXRlU2NhbGFyLilcbmZ1bmN0aW9uIGRyb3BFbmRpbmdOZXdsaW5lKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nW3N0cmluZy5sZW5ndGggLSAxXSA9PT0gJ1xcbicgPyBzdHJpbmcuc2xpY2UoMCwgLTEpIDogc3RyaW5nO1xufVxuXG4vLyBOb3RlOiBhIGxvbmcgbGluZSB3aXRob3V0IGEgc3VpdGFibGUgYnJlYWsgcG9pbnQgd2lsbCBleGNlZWQgdGhlIHdpZHRoIGxpbWl0LlxuLy8gUHJlLWNvbmRpdGlvbnM6IGV2ZXJ5IGNoYXIgaW4gc3RyIGlzUHJpbnRhYmxlLCBzdHIubGVuZ3RoID4gMCwgd2lkdGggPiAwLlxuZnVuY3Rpb24gZm9sZFN0cmluZyhzdHJpbmcsIHdpZHRoKSB7XG4gIC8vIEluIGZvbGRlZCBzdHlsZSwgJGskIGNvbnNlY3V0aXZlIG5ld2xpbmVzIG91dHB1dCBhcyAkaysxJCBuZXdsaW5lc1x1MjAxNFxuICAvLyB1bmxlc3MgdGhleSdyZSBiZWZvcmUgb3IgYWZ0ZXIgYSBtb3JlLWluZGVudGVkIGxpbmUsIG9yIGF0IHRoZSB2ZXJ5XG4gIC8vIGJlZ2lubmluZyBvciBlbmQsIGluIHdoaWNoIGNhc2UgJGskIG1hcHMgdG8gJGskLlxuICAvLyBUaGVyZWZvcmUsIHBhcnNlIGVhY2ggY2h1bmsgYXMgbmV3bGluZShzKSBmb2xsb3dlZCBieSBhIGNvbnRlbnQgbGluZS5cbiAgdmFyIGxpbmVSZSA9IC8oXFxuKykoW15cXG5dKikvZztcblxuICAvLyBmaXJzdCBsaW5lIChwb3NzaWJseSBhbiBlbXB0eSBsaW5lKVxuICB2YXIgcmVzdWx0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbmV4dExGID0gc3RyaW5nLmluZGV4T2YoJ1xcbicpO1xuICAgIG5leHRMRiA9IG5leHRMRiAhPT0gLTEgPyBuZXh0TEYgOiBzdHJpbmcubGVuZ3RoO1xuICAgIGxpbmVSZS5sYXN0SW5kZXggPSBuZXh0TEY7XG4gICAgcmV0dXJuIGZvbGRMaW5lKHN0cmluZy5zbGljZSgwLCBuZXh0TEYpLCB3aWR0aCk7XG4gIH0oKSk7XG4gIC8vIElmIHdlIGhhdmVuJ3QgcmVhY2hlZCB0aGUgZmlyc3QgY29udGVudCBsaW5lIHlldCwgZG9uJ3QgYWRkIGFuIGV4dHJhIFxcbi5cbiAgdmFyIHByZXZNb3JlSW5kZW50ZWQgPSBzdHJpbmdbMF0gPT09ICdcXG4nIHx8IHN0cmluZ1swXSA9PT0gJyAnO1xuICB2YXIgbW9yZUluZGVudGVkO1xuXG4gIC8vIHJlc3Qgb2YgdGhlIGxpbmVzXG4gIHZhciBtYXRjaDtcbiAgd2hpbGUgKChtYXRjaCA9IGxpbmVSZS5leGVjKHN0cmluZykpKSB7XG4gICAgdmFyIHByZWZpeCA9IG1hdGNoWzFdLCBsaW5lID0gbWF0Y2hbMl07XG4gICAgbW9yZUluZGVudGVkID0gKGxpbmVbMF0gPT09ICcgJyk7XG4gICAgcmVzdWx0ICs9IHByZWZpeFxuICAgICAgKyAoIXByZXZNb3JlSW5kZW50ZWQgJiYgIW1vcmVJbmRlbnRlZCAmJiBsaW5lICE9PSAnJ1xuICAgICAgICA/ICdcXG4nIDogJycpXG4gICAgICArIGZvbGRMaW5lKGxpbmUsIHdpZHRoKTtcbiAgICBwcmV2TW9yZUluZGVudGVkID0gbW9yZUluZGVudGVkO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLy8gR3JlZWR5IGxpbmUgYnJlYWtpbmcuXG4vLyBQaWNrcyB0aGUgbG9uZ2VzdCBsaW5lIHVuZGVyIHRoZSBsaW1pdCBlYWNoIHRpbWUsXG4vLyBvdGhlcndpc2Ugc2V0dGxlcyBmb3IgdGhlIHNob3J0ZXN0IGxpbmUgb3ZlciB0aGUgbGltaXQuXG4vLyBOQi4gTW9yZS1pbmRlbnRlZCBsaW5lcyAqY2Fubm90KiBiZSBmb2xkZWQsIGFzIHRoYXQgd291bGQgYWRkIGFuIGV4dHJhIFxcbi5cbmZ1bmN0aW9uIGZvbGRMaW5lKGxpbmUsIHdpZHRoKSB7XG4gIGlmIChsaW5lID09PSAnJyB8fCBsaW5lWzBdID09PSAnICcpIHJldHVybiBsaW5lO1xuXG4gIC8vIFNpbmNlIGEgbW9yZS1pbmRlbnRlZCBsaW5lIGFkZHMgYSBcXG4sIGJyZWFrcyBjYW4ndCBiZSBmb2xsb3dlZCBieSBhIHNwYWNlLlxuICB2YXIgYnJlYWtSZSA9IC8gW14gXS9nOyAvLyBub3RlOiB0aGUgbWF0Y2ggaW5kZXggd2lsbCBhbHdheXMgYmUgPD0gbGVuZ3RoLTIuXG4gIHZhciBtYXRjaDtcbiAgLy8gc3RhcnQgaXMgYW4gaW5jbHVzaXZlIGluZGV4LiBlbmQsIGN1cnIsIGFuZCBuZXh0IGFyZSBleGNsdXNpdmUuXG4gIHZhciBzdGFydCA9IDAsIGVuZCwgY3VyciA9IDAsIG5leHQgPSAwO1xuICB2YXIgcmVzdWx0ID0gJyc7XG5cbiAgLy8gSW52YXJpYW50czogMCA8PSBzdGFydCA8PSBsZW5ndGgtMS5cbiAgLy8gICAwIDw9IGN1cnIgPD0gbmV4dCA8PSBtYXgoMCwgbGVuZ3RoLTIpLiBjdXJyIC0gc3RhcnQgPD0gd2lkdGguXG4gIC8vIEluc2lkZSB0aGUgbG9vcDpcbiAgLy8gICBBIG1hdGNoIGltcGxpZXMgbGVuZ3RoID49IDIsIHNvIGN1cnIgYW5kIG5leHQgYXJlIDw9IGxlbmd0aC0yLlxuICB3aGlsZSAoKG1hdGNoID0gYnJlYWtSZS5leGVjKGxpbmUpKSkge1xuICAgIG5leHQgPSBtYXRjaC5pbmRleDtcbiAgICAvLyBtYWludGFpbiBpbnZhcmlhbnQ6IGN1cnIgLSBzdGFydCA8PSB3aWR0aFxuICAgIGlmIChuZXh0IC0gc3RhcnQgPiB3aWR0aCkge1xuICAgICAgZW5kID0gKGN1cnIgPiBzdGFydCkgPyBjdXJyIDogbmV4dDsgLy8gZGVyaXZlIGVuZCA8PSBsZW5ndGgtMlxuICAgICAgcmVzdWx0ICs9ICdcXG4nICsgbGluZS5zbGljZShzdGFydCwgZW5kKTtcbiAgICAgIC8vIHNraXAgdGhlIHNwYWNlIHRoYXQgd2FzIG91dHB1dCBhcyBcXG5cbiAgICAgIHN0YXJ0ID0gZW5kICsgMTsgICAgICAgICAgICAgICAgICAgIC8vIGRlcml2ZSBzdGFydCA8PSBsZW5ndGgtMVxuICAgIH1cbiAgICBjdXJyID0gbmV4dDtcbiAgfVxuXG4gIC8vIEJ5IHRoZSBpbnZhcmlhbnRzLCBzdGFydCA8PSBsZW5ndGgtMSwgc28gdGhlcmUgaXMgc29tZXRoaW5nIGxlZnQgb3Zlci5cbiAgLy8gSXQgaXMgZWl0aGVyIHRoZSB3aG9sZSBzdHJpbmcgb3IgYSBwYXJ0IHN0YXJ0aW5nIGZyb20gbm9uLXdoaXRlc3BhY2UuXG4gIHJlc3VsdCArPSAnXFxuJztcbiAgLy8gSW5zZXJ0IGEgYnJlYWsgaWYgdGhlIHJlbWFpbmRlciBpcyB0b28gbG9uZyBhbmQgdGhlcmUgaXMgYSBicmVhayBhdmFpbGFibGUuXG4gIGlmIChsaW5lLmxlbmd0aCAtIHN0YXJ0ID4gd2lkdGggJiYgY3VyciA+IHN0YXJ0KSB7XG4gICAgcmVzdWx0ICs9IGxpbmUuc2xpY2Uoc3RhcnQsIGN1cnIpICsgJ1xcbicgKyBsaW5lLnNsaWNlKGN1cnIgKyAxKTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgKz0gbGluZS5zbGljZShzdGFydCk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0LnNsaWNlKDEpOyAvLyBkcm9wIGV4dHJhIFxcbiBqb2luZXJcbn1cblxuLy8gRXNjYXBlcyBhIGRvdWJsZS1xdW90ZWQgc3RyaW5nLlxuZnVuY3Rpb24gZXNjYXBlU3RyaW5nKHN0cmluZykge1xuICB2YXIgcmVzdWx0ID0gJyc7XG4gIHZhciBjaGFyLCBuZXh0Q2hhcjtcbiAgdmFyIGVzY2FwZVNlcTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0cmluZy5sZW5ndGg7IGkrKykge1xuICAgIGNoYXIgPSBzdHJpbmcuY2hhckNvZGVBdChpKTtcbiAgICAvLyBDaGVjayBmb3Igc3Vycm9nYXRlIHBhaXJzIChyZWZlcmVuY2UgVW5pY29kZSAzLjAgc2VjdGlvbiBcIjMuNyBTdXJyb2dhdGVzXCIpLlxuICAgIGlmIChjaGFyID49IDB4RDgwMCAmJiBjaGFyIDw9IDB4REJGRi8qIGhpZ2ggc3Vycm9nYXRlICovKSB7XG4gICAgICBuZXh0Q2hhciA9IHN0cmluZy5jaGFyQ29kZUF0KGkgKyAxKTtcbiAgICAgIGlmIChuZXh0Q2hhciA+PSAweERDMDAgJiYgbmV4dENoYXIgPD0gMHhERkZGLyogbG93IHN1cnJvZ2F0ZSAqLykge1xuICAgICAgICAvLyBDb21iaW5lIHRoZSBzdXJyb2dhdGUgcGFpciBhbmQgc3RvcmUgaXQgZXNjYXBlZC5cbiAgICAgICAgcmVzdWx0ICs9IGVuY29kZUhleCgoY2hhciAtIDB4RDgwMCkgKiAweDQwMCArIG5leHRDaGFyIC0gMHhEQzAwICsgMHgxMDAwMCk7XG4gICAgICAgIC8vIEFkdmFuY2UgaW5kZXggb25lIGV4dHJhIHNpbmNlIHdlIGFscmVhZHkgdXNlZCB0aGF0IGNoYXIgaGVyZS5cbiAgICAgICAgaSsrOyBjb250aW51ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgZXNjYXBlU2VxID0gRVNDQVBFX1NFUVVFTkNFU1tjaGFyXTtcbiAgICByZXN1bHQgKz0gIWVzY2FwZVNlcSAmJiBpc1ByaW50YWJsZShjaGFyKVxuICAgICAgPyBzdHJpbmdbaV1cbiAgICAgIDogZXNjYXBlU2VxIHx8IGVuY29kZUhleChjaGFyKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIHdyaXRlRmxvd1NlcXVlbmNlKHN0YXRlLCBsZXZlbCwgb2JqZWN0KSB7XG4gIHZhciBfcmVzdWx0ID0gJycsXG4gICAgICBfdGFnICAgID0gc3RhdGUudGFnLFxuICAgICAgaW5kZXgsXG4gICAgICBsZW5ndGg7XG5cbiAgZm9yIChpbmRleCA9IDAsIGxlbmd0aCA9IG9iamVjdC5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgLy8gV3JpdGUgb25seSB2YWxpZCBlbGVtZW50cy5cbiAgICBpZiAod3JpdGVOb2RlKHN0YXRlLCBsZXZlbCwgb2JqZWN0W2luZGV4XSwgZmFsc2UsIGZhbHNlKSkge1xuICAgICAgaWYgKGluZGV4ICE9PSAwKSBfcmVzdWx0ICs9ICcsJyArICghc3RhdGUuY29uZGVuc2VGbG93ID8gJyAnIDogJycpO1xuICAgICAgX3Jlc3VsdCArPSBzdGF0ZS5kdW1wO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRlLnRhZyA9IF90YWc7XG4gIHN0YXRlLmR1bXAgPSAnWycgKyBfcmVzdWx0ICsgJ10nO1xufVxuXG5mdW5jdGlvbiB3cml0ZUJsb2NrU2VxdWVuY2Uoc3RhdGUsIGxldmVsLCBvYmplY3QsIGNvbXBhY3QpIHtcbiAgdmFyIF9yZXN1bHQgPSAnJyxcbiAgICAgIF90YWcgICAgPSBzdGF0ZS50YWcsXG4gICAgICBpbmRleCxcbiAgICAgIGxlbmd0aDtcblxuICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gb2JqZWN0Lmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICAvLyBXcml0ZSBvbmx5IHZhbGlkIGVsZW1lbnRzLlxuICAgIGlmICh3cml0ZU5vZGUoc3RhdGUsIGxldmVsICsgMSwgb2JqZWN0W2luZGV4XSwgdHJ1ZSwgdHJ1ZSkpIHtcbiAgICAgIGlmICghY29tcGFjdCB8fCBpbmRleCAhPT0gMCkge1xuICAgICAgICBfcmVzdWx0ICs9IGdlbmVyYXRlTmV4dExpbmUoc3RhdGUsIGxldmVsKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlLmR1bXAgJiYgQ0hBUl9MSU5FX0ZFRUQgPT09IHN0YXRlLmR1bXAuY2hhckNvZGVBdCgwKSkge1xuICAgICAgICBfcmVzdWx0ICs9ICctJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9yZXN1bHQgKz0gJy0gJztcbiAgICAgIH1cblxuICAgICAgX3Jlc3VsdCArPSBzdGF0ZS5kdW1wO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRlLnRhZyA9IF90YWc7XG4gIHN0YXRlLmR1bXAgPSBfcmVzdWx0IHx8ICdbXSc7IC8vIEVtcHR5IHNlcXVlbmNlIGlmIG5vIHZhbGlkIHZhbHVlcy5cbn1cblxuZnVuY3Rpb24gd3JpdGVGbG93TWFwcGluZyhzdGF0ZSwgbGV2ZWwsIG9iamVjdCkge1xuICB2YXIgX3Jlc3VsdCAgICAgICA9ICcnLFxuICAgICAgX3RhZyAgICAgICAgICA9IHN0YXRlLnRhZyxcbiAgICAgIG9iamVjdEtleUxpc3QgPSBPYmplY3Qua2V5cyhvYmplY3QpLFxuICAgICAgaW5kZXgsXG4gICAgICBsZW5ndGgsXG4gICAgICBvYmplY3RLZXksXG4gICAgICBvYmplY3RWYWx1ZSxcbiAgICAgIHBhaXJCdWZmZXI7XG5cbiAgZm9yIChpbmRleCA9IDAsIGxlbmd0aCA9IG9iamVjdEtleUxpc3QubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuXG4gICAgcGFpckJ1ZmZlciA9ICcnO1xuICAgIGlmIChpbmRleCAhPT0gMCkgcGFpckJ1ZmZlciArPSAnLCAnO1xuXG4gICAgaWYgKHN0YXRlLmNvbmRlbnNlRmxvdykgcGFpckJ1ZmZlciArPSAnXCInO1xuXG4gICAgb2JqZWN0S2V5ID0gb2JqZWN0S2V5TGlzdFtpbmRleF07XG4gICAgb2JqZWN0VmFsdWUgPSBvYmplY3Rbb2JqZWN0S2V5XTtcblxuICAgIGlmICghd3JpdGVOb2RlKHN0YXRlLCBsZXZlbCwgb2JqZWN0S2V5LCBmYWxzZSwgZmFsc2UpKSB7XG4gICAgICBjb250aW51ZTsgLy8gU2tpcCB0aGlzIHBhaXIgYmVjYXVzZSBvZiBpbnZhbGlkIGtleTtcbiAgICB9XG5cbiAgICBpZiAoc3RhdGUuZHVtcC5sZW5ndGggPiAxMDI0KSBwYWlyQnVmZmVyICs9ICc/ICc7XG5cbiAgICBwYWlyQnVmZmVyICs9IHN0YXRlLmR1bXAgKyAoc3RhdGUuY29uZGVuc2VGbG93ID8gJ1wiJyA6ICcnKSArICc6JyArIChzdGF0ZS5jb25kZW5zZUZsb3cgPyAnJyA6ICcgJyk7XG5cbiAgICBpZiAoIXdyaXRlTm9kZShzdGF0ZSwgbGV2ZWwsIG9iamVjdFZhbHVlLCBmYWxzZSwgZmFsc2UpKSB7XG4gICAgICBjb250aW51ZTsgLy8gU2tpcCB0aGlzIHBhaXIgYmVjYXVzZSBvZiBpbnZhbGlkIHZhbHVlLlxuICAgIH1cblxuICAgIHBhaXJCdWZmZXIgKz0gc3RhdGUuZHVtcDtcblxuICAgIC8vIEJvdGgga2V5IGFuZCB2YWx1ZSBhcmUgdmFsaWQuXG4gICAgX3Jlc3VsdCArPSBwYWlyQnVmZmVyO1xuICB9XG5cbiAgc3RhdGUudGFnID0gX3RhZztcbiAgc3RhdGUuZHVtcCA9ICd7JyArIF9yZXN1bHQgKyAnfSc7XG59XG5cbmZ1bmN0aW9uIHdyaXRlQmxvY2tNYXBwaW5nKHN0YXRlLCBsZXZlbCwgb2JqZWN0LCBjb21wYWN0KSB7XG4gIHZhciBfcmVzdWx0ICAgICAgID0gJycsXG4gICAgICBfdGFnICAgICAgICAgID0gc3RhdGUudGFnLFxuICAgICAgb2JqZWN0S2V5TGlzdCA9IE9iamVjdC5rZXlzKG9iamVjdCksXG4gICAgICBpbmRleCxcbiAgICAgIGxlbmd0aCxcbiAgICAgIG9iamVjdEtleSxcbiAgICAgIG9iamVjdFZhbHVlLFxuICAgICAgZXhwbGljaXRQYWlyLFxuICAgICAgcGFpckJ1ZmZlcjtcblxuICAvLyBBbGxvdyBzb3J0aW5nIGtleXMgc28gdGhhdCB0aGUgb3V0cHV0IGZpbGUgaXMgZGV0ZXJtaW5pc3RpY1xuICBpZiAoc3RhdGUuc29ydEtleXMgPT09IHRydWUpIHtcbiAgICAvLyBEZWZhdWx0IHNvcnRpbmdcbiAgICBvYmplY3RLZXlMaXN0LnNvcnQoKTtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygc3RhdGUuc29ydEtleXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBDdXN0b20gc29ydCBmdW5jdGlvblxuICAgIG9iamVjdEtleUxpc3Quc29ydChzdGF0ZS5zb3J0S2V5cyk7XG4gIH0gZWxzZSBpZiAoc3RhdGUuc29ydEtleXMpIHtcbiAgICAvLyBTb21ldGhpbmcgaXMgd3JvbmdcbiAgICB0aHJvdyBuZXcgWUFNTEV4Y2VwdGlvbignc29ydEtleXMgbXVzdCBiZSBhIGJvb2xlYW4gb3IgYSBmdW5jdGlvbicpO1xuICB9XG5cbiAgZm9yIChpbmRleCA9IDAsIGxlbmd0aCA9IG9iamVjdEtleUxpc3QubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgIHBhaXJCdWZmZXIgPSAnJztcblxuICAgIGlmICghY29tcGFjdCB8fCBpbmRleCAhPT0gMCkge1xuICAgICAgcGFpckJ1ZmZlciArPSBnZW5lcmF0ZU5leHRMaW5lKHN0YXRlLCBsZXZlbCk7XG4gICAgfVxuXG4gICAgb2JqZWN0S2V5ID0gb2JqZWN0S2V5TGlzdFtpbmRleF07XG4gICAgb2JqZWN0VmFsdWUgPSBvYmplY3Rbb2JqZWN0S2V5XTtcblxuICAgIGlmICghd3JpdGVOb2RlKHN0YXRlLCBsZXZlbCArIDEsIG9iamVjdEtleSwgdHJ1ZSwgdHJ1ZSwgdHJ1ZSkpIHtcbiAgICAgIGNvbnRpbnVlOyAvLyBTa2lwIHRoaXMgcGFpciBiZWNhdXNlIG9mIGludmFsaWQga2V5LlxuICAgIH1cblxuICAgIGV4cGxpY2l0UGFpciA9IChzdGF0ZS50YWcgIT09IG51bGwgJiYgc3RhdGUudGFnICE9PSAnPycpIHx8XG4gICAgICAgICAgICAgICAgICAgKHN0YXRlLmR1bXAgJiYgc3RhdGUuZHVtcC5sZW5ndGggPiAxMDI0KTtcblxuICAgIGlmIChleHBsaWNpdFBhaXIpIHtcbiAgICAgIGlmIChzdGF0ZS5kdW1wICYmIENIQVJfTElORV9GRUVEID09PSBzdGF0ZS5kdW1wLmNoYXJDb2RlQXQoMCkpIHtcbiAgICAgICAgcGFpckJ1ZmZlciArPSAnPyc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYWlyQnVmZmVyICs9ICc/ICc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcGFpckJ1ZmZlciArPSBzdGF0ZS5kdW1wO1xuXG4gICAgaWYgKGV4cGxpY2l0UGFpcikge1xuICAgICAgcGFpckJ1ZmZlciArPSBnZW5lcmF0ZU5leHRMaW5lKHN0YXRlLCBsZXZlbCk7XG4gICAgfVxuXG4gICAgaWYgKCF3cml0ZU5vZGUoc3RhdGUsIGxldmVsICsgMSwgb2JqZWN0VmFsdWUsIHRydWUsIGV4cGxpY2l0UGFpcikpIHtcbiAgICAgIGNvbnRpbnVlOyAvLyBTa2lwIHRoaXMgcGFpciBiZWNhdXNlIG9mIGludmFsaWQgdmFsdWUuXG4gICAgfVxuXG4gICAgaWYgKHN0YXRlLmR1bXAgJiYgQ0hBUl9MSU5FX0ZFRUQgPT09IHN0YXRlLmR1bXAuY2hhckNvZGVBdCgwKSkge1xuICAgICAgcGFpckJ1ZmZlciArPSAnOic7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhaXJCdWZmZXIgKz0gJzogJztcbiAgICB9XG5cbiAgICBwYWlyQnVmZmVyICs9IHN0YXRlLmR1bXA7XG5cbiAgICAvLyBCb3RoIGtleSBhbmQgdmFsdWUgYXJlIHZhbGlkLlxuICAgIF9yZXN1bHQgKz0gcGFpckJ1ZmZlcjtcbiAgfVxuXG4gIHN0YXRlLnRhZyA9IF90YWc7XG4gIHN0YXRlLmR1bXAgPSBfcmVzdWx0IHx8ICd7fSc7IC8vIEVtcHR5IG1hcHBpbmcgaWYgbm8gdmFsaWQgcGFpcnMuXG59XG5cbmZ1bmN0aW9uIGRldGVjdFR5cGUoc3RhdGUsIG9iamVjdCwgZXhwbGljaXQpIHtcbiAgdmFyIF9yZXN1bHQsIHR5cGVMaXN0LCBpbmRleCwgbGVuZ3RoLCB0eXBlLCBzdHlsZTtcblxuICB0eXBlTGlzdCA9IGV4cGxpY2l0ID8gc3RhdGUuZXhwbGljaXRUeXBlcyA6IHN0YXRlLmltcGxpY2l0VHlwZXM7XG5cbiAgZm9yIChpbmRleCA9IDAsIGxlbmd0aCA9IHR5cGVMaXN0Lmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICB0eXBlID0gdHlwZUxpc3RbaW5kZXhdO1xuXG4gICAgaWYgKCh0eXBlLmluc3RhbmNlT2YgIHx8IHR5cGUucHJlZGljYXRlKSAmJlxuICAgICAgICAoIXR5cGUuaW5zdGFuY2VPZiB8fCAoKHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnKSAmJiAob2JqZWN0IGluc3RhbmNlb2YgdHlwZS5pbnN0YW5jZU9mKSkpICYmXG4gICAgICAgICghdHlwZS5wcmVkaWNhdGUgIHx8IHR5cGUucHJlZGljYXRlKG9iamVjdCkpKSB7XG5cbiAgICAgIHN0YXRlLnRhZyA9IGV4cGxpY2l0ID8gdHlwZS50YWcgOiAnPyc7XG5cbiAgICAgIGlmICh0eXBlLnJlcHJlc2VudCkge1xuICAgICAgICBzdHlsZSA9IHN0YXRlLnN0eWxlTWFwW3R5cGUudGFnXSB8fCB0eXBlLmRlZmF1bHRTdHlsZTtcblxuICAgICAgICBpZiAoX3RvU3RyaW5nLmNhbGwodHlwZS5yZXByZXNlbnQpID09PSAnW29iamVjdCBGdW5jdGlvbl0nKSB7XG4gICAgICAgICAgX3Jlc3VsdCA9IHR5cGUucmVwcmVzZW50KG9iamVjdCwgc3R5bGUpO1xuICAgICAgICB9IGVsc2UgaWYgKF9oYXNPd25Qcm9wZXJ0eS5jYWxsKHR5cGUucmVwcmVzZW50LCBzdHlsZSkpIHtcbiAgICAgICAgICBfcmVzdWx0ID0gdHlwZS5yZXByZXNlbnRbc3R5bGVdKG9iamVjdCwgc3R5bGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBZQU1MRXhjZXB0aW9uKCchPCcgKyB0eXBlLnRhZyArICc+IHRhZyByZXNvbHZlciBhY2NlcHRzIG5vdCBcIicgKyBzdHlsZSArICdcIiBzdHlsZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUuZHVtcCA9IF9yZXN1bHQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuLy8gU2VyaWFsaXplcyBgb2JqZWN0YCBhbmQgd3JpdGVzIGl0IHRvIGdsb2JhbCBgcmVzdWx0YC5cbi8vIFJldHVybnMgdHJ1ZSBvbiBzdWNjZXNzLCBvciBmYWxzZSBvbiBpbnZhbGlkIG9iamVjdC5cbi8vXG5mdW5jdGlvbiB3cml0ZU5vZGUoc3RhdGUsIGxldmVsLCBvYmplY3QsIGJsb2NrLCBjb21wYWN0LCBpc2tleSkge1xuICBzdGF0ZS50YWcgPSBudWxsO1xuICBzdGF0ZS5kdW1wID0gb2JqZWN0O1xuXG4gIGlmICghZGV0ZWN0VHlwZShzdGF0ZSwgb2JqZWN0LCBmYWxzZSkpIHtcbiAgICBkZXRlY3RUeXBlKHN0YXRlLCBvYmplY3QsIHRydWUpO1xuICB9XG5cbiAgdmFyIHR5cGUgPSBfdG9TdHJpbmcuY2FsbChzdGF0ZS5kdW1wKTtcblxuICBpZiAoYmxvY2spIHtcbiAgICBibG9jayA9IChzdGF0ZS5mbG93TGV2ZWwgPCAwIHx8IHN0YXRlLmZsb3dMZXZlbCA+IGxldmVsKTtcbiAgfVxuXG4gIHZhciBvYmplY3RPckFycmF5ID0gdHlwZSA9PT0gJ1tvYmplY3QgT2JqZWN0XScgfHwgdHlwZSA9PT0gJ1tvYmplY3QgQXJyYXldJyxcbiAgICAgIGR1cGxpY2F0ZUluZGV4LFxuICAgICAgZHVwbGljYXRlO1xuXG4gIGlmIChvYmplY3RPckFycmF5KSB7XG4gICAgZHVwbGljYXRlSW5kZXggPSBzdGF0ZS5kdXBsaWNhdGVzLmluZGV4T2Yob2JqZWN0KTtcbiAgICBkdXBsaWNhdGUgPSBkdXBsaWNhdGVJbmRleCAhPT0gLTE7XG4gIH1cblxuICBpZiAoKHN0YXRlLnRhZyAhPT0gbnVsbCAmJiBzdGF0ZS50YWcgIT09ICc/JykgfHwgZHVwbGljYXRlIHx8IChzdGF0ZS5pbmRlbnQgIT09IDIgJiYgbGV2ZWwgPiAwKSkge1xuICAgIGNvbXBhY3QgPSBmYWxzZTtcbiAgfVxuXG4gIGlmIChkdXBsaWNhdGUgJiYgc3RhdGUudXNlZER1cGxpY2F0ZXNbZHVwbGljYXRlSW5kZXhdKSB7XG4gICAgc3RhdGUuZHVtcCA9ICcqcmVmXycgKyBkdXBsaWNhdGVJbmRleDtcbiAgfSBlbHNlIHtcbiAgICBpZiAob2JqZWN0T3JBcnJheSAmJiBkdXBsaWNhdGUgJiYgIXN0YXRlLnVzZWREdXBsaWNhdGVzW2R1cGxpY2F0ZUluZGV4XSkge1xuICAgICAgc3RhdGUudXNlZER1cGxpY2F0ZXNbZHVwbGljYXRlSW5kZXhdID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICBpZiAoYmxvY2sgJiYgKE9iamVjdC5rZXlzKHN0YXRlLmR1bXApLmxlbmd0aCAhPT0gMCkpIHtcbiAgICAgICAgd3JpdGVCbG9ja01hcHBpbmcoc3RhdGUsIGxldmVsLCBzdGF0ZS5kdW1wLCBjb21wYWN0KTtcbiAgICAgICAgaWYgKGR1cGxpY2F0ZSkge1xuICAgICAgICAgIHN0YXRlLmR1bXAgPSAnJnJlZl8nICsgZHVwbGljYXRlSW5kZXggKyBzdGF0ZS5kdW1wO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3cml0ZUZsb3dNYXBwaW5nKHN0YXRlLCBsZXZlbCwgc3RhdGUuZHVtcCk7XG4gICAgICAgIGlmIChkdXBsaWNhdGUpIHtcbiAgICAgICAgICBzdGF0ZS5kdW1wID0gJyZyZWZfJyArIGR1cGxpY2F0ZUluZGV4ICsgJyAnICsgc3RhdGUuZHVtcDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgdmFyIGFycmF5TGV2ZWwgPSAoc3RhdGUubm9BcnJheUluZGVudCAmJiAobGV2ZWwgPiAwKSkgPyBsZXZlbCAtIDEgOiBsZXZlbDtcbiAgICAgIGlmIChibG9jayAmJiAoc3RhdGUuZHVtcC5sZW5ndGggIT09IDApKSB7XG4gICAgICAgIHdyaXRlQmxvY2tTZXF1ZW5jZShzdGF0ZSwgYXJyYXlMZXZlbCwgc3RhdGUuZHVtcCwgY29tcGFjdCk7XG4gICAgICAgIGlmIChkdXBsaWNhdGUpIHtcbiAgICAgICAgICBzdGF0ZS5kdW1wID0gJyZyZWZfJyArIGR1cGxpY2F0ZUluZGV4ICsgc3RhdGUuZHVtcDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd3JpdGVGbG93U2VxdWVuY2Uoc3RhdGUsIGFycmF5TGV2ZWwsIHN0YXRlLmR1bXApO1xuICAgICAgICBpZiAoZHVwbGljYXRlKSB7XG4gICAgICAgICAgc3RhdGUuZHVtcCA9ICcmcmVmXycgKyBkdXBsaWNhdGVJbmRleCArICcgJyArIHN0YXRlLmR1bXA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdbb2JqZWN0IFN0cmluZ10nKSB7XG4gICAgICBpZiAoc3RhdGUudGFnICE9PSAnPycpIHtcbiAgICAgICAgd3JpdGVTY2FsYXIoc3RhdGUsIHN0YXRlLmR1bXAsIGxldmVsLCBpc2tleSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChzdGF0ZS5za2lwSW52YWxpZCkgcmV0dXJuIGZhbHNlO1xuICAgICAgdGhyb3cgbmV3IFlBTUxFeGNlcHRpb24oJ3VuYWNjZXB0YWJsZSBraW5kIG9mIGFuIG9iamVjdCB0byBkdW1wICcgKyB0eXBlKTtcbiAgICB9XG5cbiAgICBpZiAoc3RhdGUudGFnICE9PSBudWxsICYmIHN0YXRlLnRhZyAhPT0gJz8nKSB7XG4gICAgICBzdGF0ZS5kdW1wID0gJyE8JyArIHN0YXRlLnRhZyArICc+ICcgKyBzdGF0ZS5kdW1wO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBnZXREdXBsaWNhdGVSZWZlcmVuY2VzKG9iamVjdCwgc3RhdGUpIHtcbiAgdmFyIG9iamVjdHMgPSBbXSxcbiAgICAgIGR1cGxpY2F0ZXNJbmRleGVzID0gW10sXG4gICAgICBpbmRleCxcbiAgICAgIGxlbmd0aDtcblxuICBpbnNwZWN0Tm9kZShvYmplY3QsIG9iamVjdHMsIGR1cGxpY2F0ZXNJbmRleGVzKTtcblxuICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gZHVwbGljYXRlc0luZGV4ZXMubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgIHN0YXRlLmR1cGxpY2F0ZXMucHVzaChvYmplY3RzW2R1cGxpY2F0ZXNJbmRleGVzW2luZGV4XV0pO1xuICB9XG4gIHN0YXRlLnVzZWREdXBsaWNhdGVzID0gbmV3IEFycmF5KGxlbmd0aCk7XG59XG5cbmZ1bmN0aW9uIGluc3BlY3ROb2RlKG9iamVjdCwgb2JqZWN0cywgZHVwbGljYXRlc0luZGV4ZXMpIHtcbiAgdmFyIG9iamVjdEtleUxpc3QsXG4gICAgICBpbmRleCxcbiAgICAgIGxlbmd0aDtcblxuICBpZiAob2JqZWN0ICE9PSBudWxsICYmIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnKSB7XG4gICAgaW5kZXggPSBvYmplY3RzLmluZGV4T2Yob2JqZWN0KTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICBpZiAoZHVwbGljYXRlc0luZGV4ZXMuaW5kZXhPZihpbmRleCkgPT09IC0xKSB7XG4gICAgICAgIGR1cGxpY2F0ZXNJbmRleGVzLnB1c2goaW5kZXgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBvYmplY3RzLnB1c2gob2JqZWN0KTtcblxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqZWN0KSkge1xuICAgICAgICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gb2JqZWN0Lmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICAgICAgICBpbnNwZWN0Tm9kZShvYmplY3RbaW5kZXhdLCBvYmplY3RzLCBkdXBsaWNhdGVzSW5kZXhlcyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9iamVjdEtleUxpc3QgPSBPYmplY3Qua2V5cyhvYmplY3QpO1xuXG4gICAgICAgIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSBvYmplY3RLZXlMaXN0Lmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICAgICAgICBpbnNwZWN0Tm9kZShvYmplY3Rbb2JqZWN0S2V5TGlzdFtpbmRleF1dLCBvYmplY3RzLCBkdXBsaWNhdGVzSW5kZXhlcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZHVtcChpbnB1dCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB2YXIgc3RhdGUgPSBuZXcgU3RhdGUob3B0aW9ucyk7XG5cbiAgaWYgKCFzdGF0ZS5ub1JlZnMpIGdldER1cGxpY2F0ZVJlZmVyZW5jZXMoaW5wdXQsIHN0YXRlKTtcblxuICBpZiAod3JpdGVOb2RlKHN0YXRlLCAwLCBpbnB1dCwgdHJ1ZSwgdHJ1ZSkpIHJldHVybiBzdGF0ZS5kdW1wICsgJ1xcbic7XG5cbiAgcmV0dXJuICcnO1xufVxuXG5mdW5jdGlvbiBzYWZlRHVtcChpbnB1dCwgb3B0aW9ucykge1xuICByZXR1cm4gZHVtcChpbnB1dCwgY29tbW9uLmV4dGVuZCh7IHNjaGVtYTogREVGQVVMVF9TQUZFX1NDSEVNQSB9LCBvcHRpb25zKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzLmR1bXAgICAgID0gZHVtcDtcbm1vZHVsZS5leHBvcnRzLnNhZmVEdW1wID0gc2FmZUR1bXA7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5cbnZhciBsb2FkZXIgPSByZXF1aXJlKCcuL2pzLXlhbWwvbG9hZGVyJyk7XG52YXIgZHVtcGVyID0gcmVxdWlyZSgnLi9qcy15YW1sL2R1bXBlcicpO1xuXG5cbmZ1bmN0aW9uIGRlcHJlY2F0ZWQobmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignRnVuY3Rpb24gJyArIG5hbWUgKyAnIGlzIGRlcHJlY2F0ZWQgYW5kIGNhbm5vdCBiZSB1c2VkLicpO1xuICB9O1xufVxuXG5cbm1vZHVsZS5leHBvcnRzLlR5cGUgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL2pzLXlhbWwvdHlwZScpO1xubW9kdWxlLmV4cG9ydHMuU2NoZW1hICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vanMteWFtbC9zY2hlbWEnKTtcbm1vZHVsZS5leHBvcnRzLkZBSUxTQUZFX1NDSEVNQSAgICAgPSByZXF1aXJlKCcuL2pzLXlhbWwvc2NoZW1hL2ZhaWxzYWZlJyk7XG5tb2R1bGUuZXhwb3J0cy5KU09OX1NDSEVNQSAgICAgICAgID0gcmVxdWlyZSgnLi9qcy15YW1sL3NjaGVtYS9qc29uJyk7XG5tb2R1bGUuZXhwb3J0cy5DT1JFX1NDSEVNQSAgICAgICAgID0gcmVxdWlyZSgnLi9qcy15YW1sL3NjaGVtYS9jb3JlJyk7XG5tb2R1bGUuZXhwb3J0cy5ERUZBVUxUX1NBRkVfU0NIRU1BID0gcmVxdWlyZSgnLi9qcy15YW1sL3NjaGVtYS9kZWZhdWx0X3NhZmUnKTtcbm1vZHVsZS5leHBvcnRzLkRFRkFVTFRfRlVMTF9TQ0hFTUEgPSByZXF1aXJlKCcuL2pzLXlhbWwvc2NoZW1hL2RlZmF1bHRfZnVsbCcpO1xubW9kdWxlLmV4cG9ydHMubG9hZCAgICAgICAgICAgICAgICA9IGxvYWRlci5sb2FkO1xubW9kdWxlLmV4cG9ydHMubG9hZEFsbCAgICAgICAgICAgICA9IGxvYWRlci5sb2FkQWxsO1xubW9kdWxlLmV4cG9ydHMuc2FmZUxvYWQgICAgICAgICAgICA9IGxvYWRlci5zYWZlTG9hZDtcbm1vZHVsZS5leHBvcnRzLnNhZmVMb2FkQWxsICAgICAgICAgPSBsb2FkZXIuc2FmZUxvYWRBbGw7XG5tb2R1bGUuZXhwb3J0cy5kdW1wICAgICAgICAgICAgICAgID0gZHVtcGVyLmR1bXA7XG5tb2R1bGUuZXhwb3J0cy5zYWZlRHVtcCAgICAgICAgICAgID0gZHVtcGVyLnNhZmVEdW1wO1xubW9kdWxlLmV4cG9ydHMuWUFNTEV4Y2VwdGlvbiAgICAgICA9IHJlcXVpcmUoJy4vanMteWFtbC9leGNlcHRpb24nKTtcblxuLy8gRGVwcmVjYXRlZCBzY2hlbWEgbmFtZXMgZnJvbSBKUy1ZQU1MIDIuMC54XG5tb2R1bGUuZXhwb3J0cy5NSU5JTUFMX1NDSEVNQSA9IHJlcXVpcmUoJy4vanMteWFtbC9zY2hlbWEvZmFpbHNhZmUnKTtcbm1vZHVsZS5leHBvcnRzLlNBRkVfU0NIRU1BICAgID0gcmVxdWlyZSgnLi9qcy15YW1sL3NjaGVtYS9kZWZhdWx0X3NhZmUnKTtcbm1vZHVsZS5leHBvcnRzLkRFRkFVTFRfU0NIRU1BID0gcmVxdWlyZSgnLi9qcy15YW1sL3NjaGVtYS9kZWZhdWx0X2Z1bGwnKTtcblxuLy8gRGVwcmVjYXRlZCBmdW5jdGlvbnMgZnJvbSBKUy1ZQU1MIDEueC54XG5tb2R1bGUuZXhwb3J0cy5zY2FuICAgICAgICAgICA9IGRlcHJlY2F0ZWQoJ3NjYW4nKTtcbm1vZHVsZS5leHBvcnRzLnBhcnNlICAgICAgICAgID0gZGVwcmVjYXRlZCgncGFyc2UnKTtcbm1vZHVsZS5leHBvcnRzLmNvbXBvc2UgICAgICAgID0gZGVwcmVjYXRlZCgnY29tcG9zZScpO1xubW9kdWxlLmV4cG9ydHMuYWRkQ29uc3RydWN0b3IgPSBkZXByZWNhdGVkKCdhZGRDb25zdHJ1Y3RvcicpO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuXG52YXIgeWFtbCA9IHJlcXVpcmUoJy4vbGliL2pzLXlhbWwuanMnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHlhbWw7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB5YW1sID0gcmVxdWlyZSgnanMteWFtbCcpO1xuXG4vKipcbiAqIERlZmF1bHQgZW5naW5lc1xuICovXG5cbmNvbnN0IGVuZ2luZXMgPSBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHM7XG5cbi8qKlxuICogWUFNTFxuICovXG5cbmVuZ2luZXMueWFtbCA9IHtcbiAgcGFyc2U6IHlhbWwuc2FmZUxvYWQuYmluZCh5YW1sKSxcbiAgc3RyaW5naWZ5OiB5YW1sLnNhZmVEdW1wLmJpbmQoeWFtbClcbn07XG5cbi8qKlxuICogSlNPTlxuICovXG5cbmVuZ2luZXMuanNvbiA9IHtcbiAgcGFyc2U6IEpTT04ucGFyc2UuYmluZChKU09OKSxcbiAgc3RyaW5naWZ5OiBmdW5jdGlvbihvYmosIG9wdGlvbnMpIHtcbiAgICBjb25zdCBvcHRzID0gT2JqZWN0LmFzc2lnbih7cmVwbGFjZXI6IG51bGwsIHNwYWNlOiAyfSwgb3B0aW9ucyk7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iaiwgb3B0cy5yZXBsYWNlciwgb3B0cy5zcGFjZSk7XG4gIH1cbn07XG5cbi8qKlxuICogSmF2YVNjcmlwdFxuICovXG5cbmVuZ2luZXMuamF2YXNjcmlwdCA9IHtcbiAgcGFyc2U6IGZ1bmN0aW9uIHBhcnNlKHN0ciwgb3B0aW9ucywgd3JhcCkge1xuICAgIC8qIGVzbGludCBuby1ldmFsOiAwICovXG4gICAgdHJ5IHtcbiAgICAgIGlmICh3cmFwICE9PSBmYWxzZSkge1xuICAgICAgICBzdHIgPSAnKGZ1bmN0aW9uKCkge1xcbnJldHVybiAnICsgc3RyLnRyaW0oKSArICc7XFxufSgpKTsnO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGV2YWwoc3RyKSB8fCB7fTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGlmICh3cmFwICE9PSBmYWxzZSAmJiAvKHVuZXhwZWN0ZWR8aWRlbnRpZmllcikvaS50ZXN0KGVyci5tZXNzYWdlKSkge1xuICAgICAgICByZXR1cm4gcGFyc2Uoc3RyLCBvcHRpb25zLCBmYWxzZSk7XG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoZXJyKTtcbiAgICB9XG4gIH0sXG4gIHN0cmluZ2lmeTogZnVuY3Rpb24oKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzdHJpbmdpZnlpbmcgSmF2YVNjcmlwdCBpcyBub3Qgc3VwcG9ydGVkJyk7XG4gIH1cbn07XG4iLCAiLyohXG4gKiBzdHJpcC1ib20tc3RyaW5nIDxodHRwczovL2dpdGh1Yi5jb20vam9uc2NobGlua2VydC9zdHJpcC1ib20tc3RyaW5nPlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSwgMjAxNywgSm9uIFNjaGxpbmtlcnQuXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHN0cikge1xuICBpZiAodHlwZW9mIHN0ciA9PT0gJ3N0cmluZycgJiYgc3RyLmNoYXJBdCgwKSA9PT0gJ1xcdWZlZmYnKSB7XG4gICAgcmV0dXJuIHN0ci5zbGljZSgxKTtcbiAgfVxuICByZXR1cm4gc3RyO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHN0cmlwQm9tID0gcmVxdWlyZSgnc3RyaXAtYm9tLXN0cmluZycpO1xuY29uc3QgdHlwZU9mID0gcmVxdWlyZSgna2luZC1vZicpO1xuXG5leHBvcnRzLmRlZmluZSA9IGZ1bmN0aW9uKG9iaiwga2V5LCB2YWwpIHtcbiAgUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogdmFsXG4gIH0pO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYHZhbGAgaXMgYSBidWZmZXJcbiAqL1xuXG5leHBvcnRzLmlzQnVmZmVyID0gZnVuY3Rpb24odmFsKSB7XG4gIHJldHVybiB0eXBlT2YodmFsKSA9PT0gJ2J1ZmZlcic7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBgdmFsYCBpcyBhbiBvYmplY3RcbiAqL1xuXG5leHBvcnRzLmlzT2JqZWN0ID0gZnVuY3Rpb24odmFsKSB7XG4gIHJldHVybiB0eXBlT2YodmFsKSA9PT0gJ29iamVjdCc7XG59O1xuXG4vKipcbiAqIENhc3QgYGlucHV0YCB0byBhIGJ1ZmZlclxuICovXG5cbmV4cG9ydHMudG9CdWZmZXIgPSBmdW5jdGlvbihpbnB1dCkge1xuICByZXR1cm4gdHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJyA/IEJ1ZmZlci5mcm9tKGlucHV0KSA6IGlucHV0O1xufTtcblxuLyoqXG4gKiBDYXN0IGB2YWxgIHRvIGEgc3RyaW5nLlxuICovXG5cbmV4cG9ydHMudG9TdHJpbmcgPSBmdW5jdGlvbihpbnB1dCkge1xuICBpZiAoZXhwb3J0cy5pc0J1ZmZlcihpbnB1dCkpIHJldHVybiBzdHJpcEJvbShTdHJpbmcoaW5wdXQpKTtcbiAgaWYgKHR5cGVvZiBpbnB1dCAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleHBlY3RlZCBpbnB1dCB0byBiZSBhIHN0cmluZyBvciBidWZmZXInKTtcbiAgfVxuICByZXR1cm4gc3RyaXBCb20oaW5wdXQpO1xufTtcblxuLyoqXG4gKiBDYXN0IGB2YWxgIHRvIGFuIGFycmF5LlxuICovXG5cbmV4cG9ydHMuYXJyYXlpZnkgPSBmdW5jdGlvbih2YWwpIHtcbiAgcmV0dXJuIHZhbCA/IChBcnJheS5pc0FycmF5KHZhbCkgPyB2YWwgOiBbdmFsXSkgOiBbXTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGBzdHJgIHN0YXJ0cyB3aXRoIGBzdWJzdHJgLlxuICovXG5cbmV4cG9ydHMuc3RhcnRzV2l0aCA9IGZ1bmN0aW9uKHN0ciwgc3Vic3RyLCBsZW4pIHtcbiAgaWYgKHR5cGVvZiBsZW4gIT09ICdudW1iZXInKSBsZW4gPSBzdWJzdHIubGVuZ3RoO1xuICByZXR1cm4gc3RyLnNsaWNlKDAsIGxlbikgPT09IHN1YnN0cjtcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlbmdpbmVzID0gcmVxdWlyZSgnLi9lbmdpbmVzJyk7XG5jb25zdCB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIGNvbnN0IG9wdHMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKTtcblxuICAvLyBlbnN1cmUgdGhhdCBkZWxpbWl0ZXJzIGFyZSBhbiBhcnJheVxuICBvcHRzLmRlbGltaXRlcnMgPSB1dGlscy5hcnJheWlmeShvcHRzLmRlbGltcyB8fCBvcHRzLmRlbGltaXRlcnMgfHwgJy0tLScpO1xuICBpZiAob3B0cy5kZWxpbWl0ZXJzLmxlbmd0aCA9PT0gMSkge1xuICAgIG9wdHMuZGVsaW1pdGVycy5wdXNoKG9wdHMuZGVsaW1pdGVyc1swXSk7XG4gIH1cblxuICBvcHRzLmxhbmd1YWdlID0gKG9wdHMubGFuZ3VhZ2UgfHwgb3B0cy5sYW5nIHx8ICd5YW1sJykudG9Mb3dlckNhc2UoKTtcbiAgb3B0cy5lbmdpbmVzID0gT2JqZWN0LmFzc2lnbih7fSwgZW5naW5lcywgb3B0cy5wYXJzZXJzLCBvcHRzLmVuZ2luZXMpO1xuICByZXR1cm4gb3B0cztcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5hbWUsIG9wdGlvbnMpIHtcbiAgbGV0IGVuZ2luZSA9IG9wdGlvbnMuZW5naW5lc1tuYW1lXSB8fCBvcHRpb25zLmVuZ2luZXNbYWxpYXNlKG5hbWUpXTtcbiAgaWYgKHR5cGVvZiBlbmdpbmUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdncmF5LW1hdHRlciBlbmdpbmUgXCInICsgbmFtZSArICdcIiBpcyBub3QgcmVnaXN0ZXJlZCcpO1xuICB9XG4gIGlmICh0eXBlb2YgZW5naW5lID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZW5naW5lID0geyBwYXJzZTogZW5naW5lIH07XG4gIH1cbiAgcmV0dXJuIGVuZ2luZTtcbn07XG5cbmZ1bmN0aW9uIGFsaWFzZShuYW1lKSB7XG4gIHN3aXRjaCAobmFtZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSAnanMnOlxuICAgIGNhc2UgJ2phdmFzY3JpcHQnOlxuICAgICAgcmV0dXJuICdqYXZhc2NyaXB0JztcbiAgICBjYXNlICdjb2ZmZWUnOlxuICAgIGNhc2UgJ2NvZmZlZXNjcmlwdCc6XG4gICAgY2FzZSAnY3Nvbic6XG4gICAgICByZXR1cm4gJ2NvZmZlZSc7XG4gICAgY2FzZSAneWFtbCc6XG4gICAgY2FzZSAneW1sJzpcbiAgICAgIHJldHVybiAneWFtbCc7XG4gICAgZGVmYXVsdDoge1xuICAgICAgcmV0dXJuIG5hbWU7XG4gICAgfVxuICB9XG59XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB0eXBlT2YgPSByZXF1aXJlKCdraW5kLW9mJyk7XG5jb25zdCBnZXRFbmdpbmUgPSByZXF1aXJlKCcuL2VuZ2luZScpO1xuY29uc3QgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZmlsZSwgZGF0YSwgb3B0aW9ucykge1xuICBpZiAoZGF0YSA9PSBudWxsICYmIG9wdGlvbnMgPT0gbnVsbCkge1xuICAgIHN3aXRjaCAodHlwZU9mKGZpbGUpKSB7XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBkYXRhID0gZmlsZS5kYXRhO1xuICAgICAgICBvcHRpb25zID0ge307XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgcmV0dXJuIGZpbGU7XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4cGVjdGVkIGZpbGUgdG8gYmUgYSBzdHJpbmcgb3Igb2JqZWN0Jyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc3Qgc3RyID0gZmlsZS5jb250ZW50O1xuICBjb25zdCBvcHRzID0gZGVmYXVsdHMob3B0aW9ucyk7XG4gIGlmIChkYXRhID09IG51bGwpIHtcbiAgICBpZiAoIW9wdHMuZGF0YSkgcmV0dXJuIGZpbGU7XG4gICAgZGF0YSA9IG9wdHMuZGF0YTtcbiAgfVxuXG4gIGNvbnN0IGxhbmd1YWdlID0gZmlsZS5sYW5ndWFnZSB8fCBvcHRzLmxhbmd1YWdlO1xuICBjb25zdCBlbmdpbmUgPSBnZXRFbmdpbmUobGFuZ3VhZ2UsIG9wdHMpO1xuICBpZiAodHlwZW9mIGVuZ2luZS5zdHJpbmdpZnkgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleHBlY3RlZCBcIicgKyBsYW5ndWFnZSArICcuc3RyaW5naWZ5XCIgdG8gYmUgYSBmdW5jdGlvbicpO1xuICB9XG5cbiAgZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGZpbGUuZGF0YSwgZGF0YSk7XG4gIGNvbnN0IG9wZW4gPSBvcHRzLmRlbGltaXRlcnNbMF07XG4gIGNvbnN0IGNsb3NlID0gb3B0cy5kZWxpbWl0ZXJzWzFdO1xuICBjb25zdCBtYXR0ZXIgPSBlbmdpbmUuc3RyaW5naWZ5KGRhdGEsIG9wdGlvbnMpLnRyaW0oKTtcbiAgbGV0IGJ1ZiA9ICcnO1xuXG4gIGlmIChtYXR0ZXIgIT09ICd7fScpIHtcbiAgICBidWYgPSBuZXdsaW5lKG9wZW4pICsgbmV3bGluZShtYXR0ZXIpICsgbmV3bGluZShjbG9zZSk7XG4gIH1cblxuICBpZiAodHlwZW9mIGZpbGUuZXhjZXJwdCA9PT0gJ3N0cmluZycgJiYgZmlsZS5leGNlcnB0ICE9PSAnJykge1xuICAgIGlmIChzdHIuaW5kZXhPZihmaWxlLmV4Y2VycHQudHJpbSgpKSA9PT0gLTEpIHtcbiAgICAgIGJ1ZiArPSBuZXdsaW5lKGZpbGUuZXhjZXJwdCkgKyBuZXdsaW5lKGNsb3NlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmICsgbmV3bGluZShzdHIpO1xufTtcblxuZnVuY3Rpb24gbmV3bGluZShzdHIpIHtcbiAgcmV0dXJuIHN0ci5zbGljZSgtMSkgIT09ICdcXG4nID8gc3RyICsgJ1xcbicgOiBzdHI7XG59XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmaWxlLCBvcHRpb25zKSB7XG4gIGNvbnN0IG9wdHMgPSBkZWZhdWx0cyhvcHRpb25zKTtcblxuICBpZiAoZmlsZS5kYXRhID09IG51bGwpIHtcbiAgICBmaWxlLmRhdGEgPSB7fTtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygb3B0cy5leGNlcnB0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIG9wdHMuZXhjZXJwdChmaWxlLCBvcHRzKTtcbiAgfVxuXG4gIGNvbnN0IHNlcCA9IGZpbGUuZGF0YS5leGNlcnB0X3NlcGFyYXRvciB8fCBvcHRzLmV4Y2VycHRfc2VwYXJhdG9yO1xuICBpZiAoc2VwID09IG51bGwgJiYgKG9wdHMuZXhjZXJwdCA9PT0gZmFsc2UgfHwgb3B0cy5leGNlcnB0ID09IG51bGwpKSB7XG4gICAgcmV0dXJuIGZpbGU7XG4gIH1cblxuICBjb25zdCBkZWxpbWl0ZXIgPSB0eXBlb2Ygb3B0cy5leGNlcnB0ID09PSAnc3RyaW5nJ1xuICAgID8gb3B0cy5leGNlcnB0XG4gICAgOiAoc2VwIHx8IG9wdHMuZGVsaW1pdGVyc1swXSk7XG5cbiAgLy8gaWYgZW5hYmxlZCwgZ2V0IHRoZSBleGNlcnB0IGRlZmluZWQgYWZ0ZXIgZnJvbnQtbWF0dGVyXG4gIGNvbnN0IGlkeCA9IGZpbGUuY29udGVudC5pbmRleE9mKGRlbGltaXRlcik7XG4gIGlmIChpZHggIT09IC0xKSB7XG4gICAgZmlsZS5leGNlcnB0ID0gZmlsZS5jb250ZW50LnNsaWNlKDAsIGlkeCk7XG4gIH1cblxuICByZXR1cm4gZmlsZTtcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB0eXBlT2YgPSByZXF1aXJlKCdraW5kLW9mJyk7XG5jb25zdCBzdHJpbmdpZnkgPSByZXF1aXJlKCcuL3N0cmluZ2lmeScpO1xuY29uc3QgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbi8qKlxuICogTm9ybWFsaXplIHRoZSBnaXZlbiB2YWx1ZSB0byBlbnN1cmUgYW4gb2JqZWN0IGlzIHJldHVybmVkXG4gKiB3aXRoIHRoZSBleHBlY3RlZCBwcm9wZXJ0aWVzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZmlsZSkge1xuICBpZiAodHlwZU9mKGZpbGUpICE9PSAnb2JqZWN0Jykge1xuICAgIGZpbGUgPSB7IGNvbnRlbnQ6IGZpbGUgfTtcbiAgfVxuXG4gIGlmICh0eXBlT2YoZmlsZS5kYXRhKSAhPT0gJ29iamVjdCcpIHtcbiAgICBmaWxlLmRhdGEgPSB7fTtcbiAgfVxuXG4gIC8vIGlmIGZpbGUgd2FzIHBhc3NlZCBhcyBhbiBvYmplY3QsIGVuc3VyZSB0aGF0XG4gIC8vIFwiZmlsZS5jb250ZW50XCIgaXMgc2V0XG4gIGlmIChmaWxlLmNvbnRlbnRzICYmIGZpbGUuY29udGVudCA9PSBudWxsKSB7XG4gICAgZmlsZS5jb250ZW50ID0gZmlsZS5jb250ZW50cztcbiAgfVxuXG4gIC8vIHNldCBub24tZW51bWVyYWJsZSBwcm9wZXJ0aWVzIG9uIHRoZSBmaWxlIG9iamVjdFxuICB1dGlscy5kZWZpbmUoZmlsZSwgJ29yaWcnLCB1dGlscy50b0J1ZmZlcihmaWxlLmNvbnRlbnQpKTtcbiAgdXRpbHMuZGVmaW5lKGZpbGUsICdsYW5ndWFnZScsIGZpbGUubGFuZ3VhZ2UgfHwgJycpO1xuICB1dGlscy5kZWZpbmUoZmlsZSwgJ21hdHRlcicsIGZpbGUubWF0dGVyIHx8ICcnKTtcbiAgdXRpbHMuZGVmaW5lKGZpbGUsICdzdHJpbmdpZnknLCBmdW5jdGlvbihkYXRhLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5sYW5ndWFnZSkge1xuICAgICAgZmlsZS5sYW5ndWFnZSA9IG9wdGlvbnMubGFuZ3VhZ2U7XG4gICAgfVxuICAgIHJldHVybiBzdHJpbmdpZnkoZmlsZSwgZGF0YSwgb3B0aW9ucyk7XG4gIH0pO1xuXG4gIC8vIHN0cmlwIEJPTSBhbmQgZW5zdXJlIHRoYXQgXCJmaWxlLmNvbnRlbnRcIiBpcyBhIHN0cmluZ1xuICBmaWxlLmNvbnRlbnQgPSB1dGlscy50b1N0cmluZyhmaWxlLmNvbnRlbnQpO1xuICBmaWxlLmlzRW1wdHkgPSBmYWxzZTtcbiAgZmlsZS5leGNlcnB0ID0gJyc7XG4gIHJldHVybiBmaWxlO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGdldEVuZ2luZSA9IHJlcXVpcmUoJy4vZW5naW5lJyk7XG5jb25zdCBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsYW5ndWFnZSwgc3RyLCBvcHRpb25zKSB7XG4gIGNvbnN0IG9wdHMgPSBkZWZhdWx0cyhvcHRpb25zKTtcbiAgY29uc3QgZW5naW5lID0gZ2V0RW5naW5lKGxhbmd1YWdlLCBvcHRzKTtcbiAgaWYgKHR5cGVvZiBlbmdpbmUucGFyc2UgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleHBlY3RlZCBcIicgKyBsYW5ndWFnZSArICcucGFyc2VcIiB0byBiZSBhIGZ1bmN0aW9uJyk7XG4gIH1cbiAgcmV0dXJuIGVuZ2luZS5wYXJzZShzdHIsIG9wdHMpO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcbmNvbnN0IHNlY3Rpb25zID0gcmVxdWlyZSgnc2VjdGlvbi1tYXR0ZXInKTtcbmNvbnN0IGRlZmF1bHRzID0gcmVxdWlyZSgnLi9saWIvZGVmYXVsdHMnKTtcbmNvbnN0IHN0cmluZ2lmeSA9IHJlcXVpcmUoJy4vbGliL3N0cmluZ2lmeScpO1xuY29uc3QgZXhjZXJwdCA9IHJlcXVpcmUoJy4vbGliL2V4Y2VycHQnKTtcbmNvbnN0IGVuZ2luZXMgPSByZXF1aXJlKCcuL2xpYi9lbmdpbmVzJyk7XG5jb25zdCB0b0ZpbGUgPSByZXF1aXJlKCcuL2xpYi90by1maWxlJyk7XG5jb25zdCBwYXJzZSA9IHJlcXVpcmUoJy4vbGliL3BhcnNlJyk7XG5jb25zdCB1dGlscyA9IHJlcXVpcmUoJy4vbGliL3V0aWxzJyk7XG5cbi8qKlxuICogVGFrZXMgYSBzdHJpbmcgb3Igb2JqZWN0IHdpdGggYGNvbnRlbnRgIHByb3BlcnR5LCBleHRyYWN0c1xuICogYW5kIHBhcnNlcyBmcm9udC1tYXR0ZXIgZnJvbSB0aGUgc3RyaW5nLCB0aGVuIHJldHVybnMgYW4gb2JqZWN0XG4gKiB3aXRoIGBkYXRhYCwgYGNvbnRlbnRgIGFuZCBvdGhlciBbdXNlZnVsIHByb3BlcnRpZXNdKCNyZXR1cm5lZC1vYmplY3QpLlxuICpcbiAqIGBgYGpzXG4gKiBjb25zdCBtYXR0ZXIgPSByZXF1aXJlKCdncmF5LW1hdHRlcicpO1xuICogY29uc29sZS5sb2cobWF0dGVyKCctLS1cXG50aXRsZTogSG9tZVxcbi0tLVxcbk90aGVyIHN0dWZmJykpO1xuICogLy89PiB7IGRhdGE6IHsgdGl0bGU6ICdIb21lJ30sIGNvbnRlbnQ6ICdPdGhlciBzdHVmZicgfVxuICogYGBgXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IGBpbnB1dGAgU3RyaW5nLCBvciBvYmplY3Qgd2l0aCBgY29udGVudGAgc3RyaW5nXG4gKiBAcGFyYW0ge09iamVjdH0gYG9wdGlvbnNgXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIG1hdHRlcihpbnB1dCwgb3B0aW9ucykge1xuICBpZiAoaW5wdXQgPT09ICcnKSB7XG4gICAgcmV0dXJuIHsgZGF0YToge30sIGNvbnRlbnQ6IGlucHV0LCBleGNlcnB0OiAnJywgb3JpZzogaW5wdXQgfTtcbiAgfVxuXG4gIGxldCBmaWxlID0gdG9GaWxlKGlucHV0KTtcbiAgY29uc3QgY2FjaGVkID0gbWF0dGVyLmNhY2hlW2ZpbGUuY29udGVudF07XG5cbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgaWYgKGNhY2hlZCkge1xuICAgICAgZmlsZSA9IE9iamVjdC5hc3NpZ24oe30sIGNhY2hlZCk7XG4gICAgICBmaWxlLm9yaWcgPSBjYWNoZWQub3JpZztcbiAgICAgIHJldHVybiBmaWxlO1xuICAgIH1cblxuICAgIC8vIG9ubHkgY2FjaGUgaWYgdGhlcmUgYXJlIG5vIG9wdGlvbnMgcGFzc2VkLiBpZiB3ZSBjYWNoZSB3aGVuIG9wdGlvbnNcbiAgICAvLyBhcmUgcGFzc2VkLCB3ZSB3b3VsZCBuZWVkIHRvIGFsc28gY2FjaGUgb3B0aW9ucyB2YWx1ZXMsIHdoaWNoIHdvdWxkXG4gICAgLy8gbmVnYXRlIGFueSBwZXJmb3JtYW5jZSBiZW5lZml0cyBvZiBjYWNoaW5nXG4gICAgbWF0dGVyLmNhY2hlW2ZpbGUuY29udGVudF0gPSBmaWxlO1xuICB9XG5cbiAgcmV0dXJuIHBhcnNlTWF0dGVyKGZpbGUsIG9wdGlvbnMpO1xufVxuXG4vKipcbiAqIFBhcnNlIGZyb250IG1hdHRlclxuICovXG5cbmZ1bmN0aW9uIHBhcnNlTWF0dGVyKGZpbGUsIG9wdGlvbnMpIHtcbiAgY29uc3Qgb3B0cyA9IGRlZmF1bHRzKG9wdGlvbnMpO1xuICBjb25zdCBvcGVuID0gb3B0cy5kZWxpbWl0ZXJzWzBdO1xuICBjb25zdCBjbG9zZSA9ICdcXG4nICsgb3B0cy5kZWxpbWl0ZXJzWzFdO1xuICBsZXQgc3RyID0gZmlsZS5jb250ZW50O1xuXG4gIGlmIChvcHRzLmxhbmd1YWdlKSB7XG4gICAgZmlsZS5sYW5ndWFnZSA9IG9wdHMubGFuZ3VhZ2U7XG4gIH1cblxuICAvLyBnZXQgdGhlIGxlbmd0aCBvZiB0aGUgb3BlbmluZyBkZWxpbWl0ZXJcbiAgY29uc3Qgb3BlbkxlbiA9IG9wZW4ubGVuZ3RoO1xuICBpZiAoIXV0aWxzLnN0YXJ0c1dpdGgoc3RyLCBvcGVuLCBvcGVuTGVuKSkge1xuICAgIGV4Y2VycHQoZmlsZSwgb3B0cyk7XG4gICAgcmV0dXJuIGZpbGU7XG4gIH1cblxuICAvLyBpZiB0aGUgbmV4dCBjaGFyYWN0ZXIgYWZ0ZXIgdGhlIG9wZW5pbmcgZGVsaW1pdGVyIGlzXG4gIC8vIGEgY2hhcmFjdGVyIGZyb20gdGhlIGRlbGltaXRlciwgdGhlbiBpdCdzIG5vdCBhIGZyb250LVxuICAvLyBtYXR0ZXIgZGVsaW1pdGVyXG4gIGlmIChzdHIuY2hhckF0KG9wZW5MZW4pID09PSBvcGVuLnNsaWNlKC0xKSkge1xuICAgIHJldHVybiBmaWxlO1xuICB9XG5cbiAgLy8gc3RyaXAgdGhlIG9wZW5pbmcgZGVsaW1pdGVyXG4gIHN0ciA9IHN0ci5zbGljZShvcGVuTGVuKTtcbiAgY29uc3QgbGVuID0gc3RyLmxlbmd0aDtcblxuICAvLyB1c2UgdGhlIGxhbmd1YWdlIGRlZmluZWQgYWZ0ZXIgZmlyc3QgZGVsaW1pdGVyLCBpZiBpdCBleGlzdHNcbiAgY29uc3QgbGFuZ3VhZ2UgPSBtYXR0ZXIubGFuZ3VhZ2Uoc3RyLCBvcHRzKTtcbiAgaWYgKGxhbmd1YWdlLm5hbWUpIHtcbiAgICBmaWxlLmxhbmd1YWdlID0gbGFuZ3VhZ2UubmFtZTtcbiAgICBzdHIgPSBzdHIuc2xpY2UobGFuZ3VhZ2UucmF3Lmxlbmd0aCk7XG4gIH1cblxuICAvLyBnZXQgdGhlIGluZGV4IG9mIHRoZSBjbG9zaW5nIGRlbGltaXRlclxuICBsZXQgY2xvc2VJbmRleCA9IHN0ci5pbmRleE9mKGNsb3NlKTtcbiAgaWYgKGNsb3NlSW5kZXggPT09IC0xKSB7XG4gICAgY2xvc2VJbmRleCA9IGxlbjtcbiAgfVxuXG4gIC8vIGdldCB0aGUgcmF3IGZyb250LW1hdHRlciBibG9ja1xuICBmaWxlLm1hdHRlciA9IHN0ci5zbGljZSgwLCBjbG9zZUluZGV4KTtcblxuICBjb25zdCBibG9jayA9IGZpbGUubWF0dGVyLnJlcGxhY2UoL15cXHMqI1teXFxuXSsvZ20sICcnKS50cmltKCk7XG4gIGlmIChibG9jayA9PT0gJycpIHtcbiAgICBmaWxlLmlzRW1wdHkgPSB0cnVlO1xuICAgIGZpbGUuZW1wdHkgPSBmaWxlLmNvbnRlbnQ7XG4gICAgZmlsZS5kYXRhID0ge307XG4gIH0gZWxzZSB7XG5cbiAgICAvLyBjcmVhdGUgZmlsZS5kYXRhIGJ5IHBhcnNpbmcgdGhlIHJhdyBmaWxlLm1hdHRlciBibG9ja1xuICAgIGZpbGUuZGF0YSA9IHBhcnNlKGZpbGUubGFuZ3VhZ2UsIGZpbGUubWF0dGVyLCBvcHRzKTtcbiAgfVxuXG4gIC8vIHVwZGF0ZSBmaWxlLmNvbnRlbnRcbiAgaWYgKGNsb3NlSW5kZXggPT09IGxlbikge1xuICAgIGZpbGUuY29udGVudCA9ICcnO1xuICB9IGVsc2Uge1xuICAgIGZpbGUuY29udGVudCA9IHN0ci5zbGljZShjbG9zZUluZGV4ICsgY2xvc2UubGVuZ3RoKTtcbiAgICBpZiAoZmlsZS5jb250ZW50WzBdID09PSAnXFxyJykge1xuICAgICAgZmlsZS5jb250ZW50ID0gZmlsZS5jb250ZW50LnNsaWNlKDEpO1xuICAgIH1cbiAgICBpZiAoZmlsZS5jb250ZW50WzBdID09PSAnXFxuJykge1xuICAgICAgZmlsZS5jb250ZW50ID0gZmlsZS5jb250ZW50LnNsaWNlKDEpO1xuICAgIH1cbiAgfVxuXG4gIGV4Y2VycHQoZmlsZSwgb3B0cyk7XG5cbiAgaWYgKG9wdHMuc2VjdGlvbnMgPT09IHRydWUgfHwgdHlwZW9mIG9wdHMuc2VjdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHNlY3Rpb25zKGZpbGUsIG9wdHMuc2VjdGlvbik7XG4gIH1cbiAgcmV0dXJuIGZpbGU7XG59XG5cbi8qKlxuICogRXhwb3NlIGVuZ2luZXNcbiAqL1xuXG5tYXR0ZXIuZW5naW5lcyA9IGVuZ2luZXM7XG5cbi8qKlxuICogU3RyaW5naWZ5IGFuIG9iamVjdCB0byBZQU1MIG9yIHRoZSBzcGVjaWZpZWQgbGFuZ3VhZ2UsIGFuZFxuICogYXBwZW5kIGl0IHRvIHRoZSBnaXZlbiBzdHJpbmcuIEJ5IGRlZmF1bHQsIG9ubHkgWUFNTCBhbmQgSlNPTlxuICogY2FuIGJlIHN0cmluZ2lmaWVkLiBTZWUgdGhlIFtlbmdpbmVzXSgjZW5naW5lcykgc2VjdGlvbiB0byBsZWFyblxuICogaG93IHRvIHN0cmluZ2lmeSBvdGhlciBsYW5ndWFnZXMuXG4gKlxuICogYGBganNcbiAqIGNvbnNvbGUubG9nKG1hdHRlci5zdHJpbmdpZnkoJ2ZvbyBiYXIgYmF6Jywge3RpdGxlOiAnSG9tZSd9KSk7XG4gKiAvLyByZXN1bHRzIGluOlxuICogLy8gLS0tXG4gKiAvLyB0aXRsZTogSG9tZVxuICogLy8gLS0tXG4gKiAvLyBmb28gYmFyIGJhelxuICogYGBgXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGBmaWxlYCBUaGUgY29udGVudCBzdHJpbmcgdG8gYXBwZW5kIHRvIHN0cmluZ2lmaWVkIGZyb250LW1hdHRlciwgb3IgYSBmaWxlIG9iamVjdCB3aXRoIGBmaWxlLmNvbnRlbnRgIHN0cmluZy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBgZGF0YWAgRnJvbnQgbWF0dGVyIHRvIHN0cmluZ2lmeS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBgb3B0aW9uc2AgW09wdGlvbnNdKCNvcHRpb25zKSB0byBwYXNzIHRvIGdyYXktbWF0dGVyIGFuZCBbanMteWFtbF0uXG4gKiBAcmV0dXJuIHtTdHJpbmd9IFJldHVybnMgYSBzdHJpbmcgY3JlYXRlZCBieSB3cmFwcGluZyBzdHJpbmdpZmllZCB5YW1sIHdpdGggZGVsaW1pdGVycywgYW5kIGFwcGVuZGluZyB0aGF0IHRvIHRoZSBnaXZlbiBzdHJpbmcuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1hdHRlci5zdHJpbmdpZnkgPSBmdW5jdGlvbihmaWxlLCBkYXRhLCBvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZmlsZSA9PT0gJ3N0cmluZycpIGZpbGUgPSBtYXR0ZXIoZmlsZSwgb3B0aW9ucyk7XG4gIHJldHVybiBzdHJpbmdpZnkoZmlsZSwgZGF0YSwgb3B0aW9ucyk7XG59O1xuXG4vKipcbiAqIFN5bmNocm9ub3VzbHkgcmVhZCBhIGZpbGUgZnJvbSB0aGUgZmlsZSBzeXN0ZW0gYW5kIHBhcnNlXG4gKiBmcm9udCBtYXR0ZXIuIFJldHVybnMgdGhlIHNhbWUgb2JqZWN0IGFzIHRoZSBbbWFpbiBmdW5jdGlvbl0oI21hdHRlcikuXG4gKlxuICogYGBganNcbiAqIGNvbnN0IGZpbGUgPSBtYXR0ZXIucmVhZCgnLi9jb250ZW50L2Jsb2ctcG9zdC5tZCcpO1xuICogYGBgXG4gKiBAcGFyYW0ge1N0cmluZ30gYGZpbGVwYXRoYCBmaWxlIHBhdGggb2YgdGhlIGZpbGUgdG8gcmVhZC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBgb3B0aW9uc2AgW09wdGlvbnNdKCNvcHRpb25zKSB0byBwYXNzIHRvIGdyYXktbWF0dGVyLlxuICogQHJldHVybiB7T2JqZWN0fSBSZXR1cm5zIFthbiBvYmplY3RdKCNyZXR1cm5lZC1vYmplY3QpIHdpdGggYGRhdGFgIGFuZCBgY29udGVudGBcbiAqIEBhcGkgcHVibGljXG4gKi9cblxubWF0dGVyLnJlYWQgPSBmdW5jdGlvbihmaWxlcGF0aCwgb3B0aW9ucykge1xuICBjb25zdCBzdHIgPSBmcy5yZWFkRmlsZVN5bmMoZmlsZXBhdGgsICd1dGY4Jyk7XG4gIGNvbnN0IGZpbGUgPSBtYXR0ZXIoc3RyLCBvcHRpb25zKTtcbiAgZmlsZS5wYXRoID0gZmlsZXBhdGg7XG4gIHJldHVybiBmaWxlO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIGBzdHJpbmdgIGhhcyBmcm9udCBtYXR0ZXIuXG4gKiBAcGFyYW0gIHtTdHJpbmd9IGBzdHJpbmdgXG4gKiBAcGFyYW0gIHtPYmplY3R9IGBvcHRpb25zYFxuICogQHJldHVybiB7Qm9vbGVhbn0gVHJ1ZSBpZiBmcm9udCBtYXR0ZXIgZXhpc3RzLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tYXR0ZXIudGVzdCA9IGZ1bmN0aW9uKHN0ciwgb3B0aW9ucykge1xuICByZXR1cm4gdXRpbHMuc3RhcnRzV2l0aChzdHIsIGRlZmF1bHRzKG9wdGlvbnMpLmRlbGltaXRlcnNbMF0pO1xufTtcblxuLyoqXG4gKiBEZXRlY3QgdGhlIGxhbmd1YWdlIHRvIHVzZSwgaWYgb25lIGlzIGRlZmluZWQgYWZ0ZXIgdGhlXG4gKiBmaXJzdCBmcm9udC1tYXR0ZXIgZGVsaW1pdGVyLlxuICogQHBhcmFtICB7U3RyaW5nfSBgc3RyaW5nYFxuICogQHBhcmFtICB7T2JqZWN0fSBgb3B0aW9uc2BcbiAqIEByZXR1cm4ge09iamVjdH0gT2JqZWN0IHdpdGggYHJhd2AgKGFjdHVhbCBsYW5ndWFnZSBzdHJpbmcpLCBhbmQgYG5hbWVgLCB0aGUgbGFuZ3VhZ2Ugd2l0aCB3aGl0ZXNwYWNlIHRyaW1tZWRcbiAqL1xuXG5tYXR0ZXIubGFuZ3VhZ2UgPSBmdW5jdGlvbihzdHIsIG9wdGlvbnMpIHtcbiAgY29uc3Qgb3B0cyA9IGRlZmF1bHRzKG9wdGlvbnMpO1xuICBjb25zdCBvcGVuID0gb3B0cy5kZWxpbWl0ZXJzWzBdO1xuXG4gIGlmIChtYXR0ZXIudGVzdChzdHIpKSB7XG4gICAgc3RyID0gc3RyLnNsaWNlKG9wZW4ubGVuZ3RoKTtcbiAgfVxuXG4gIGNvbnN0IGxhbmd1YWdlID0gc3RyLnNsaWNlKDAsIHN0ci5zZWFyY2goL1xccj9cXG4vKSk7XG4gIHJldHVybiB7XG4gICAgcmF3OiBsYW5ndWFnZSxcbiAgICBuYW1lOiBsYW5ndWFnZSA/IGxhbmd1YWdlLnRyaW0oKSA6ICcnXG4gIH07XG59O1xuXG4vKipcbiAqIEV4cG9zZSBgbWF0dGVyYFxuICovXG5cbm1hdHRlci5jYWNoZSA9IHt9O1xubWF0dGVyLmNsZWFyQ2FjaGUgPSBmdW5jdGlvbigpIHtcbiAgbWF0dGVyLmNhY2hlID0ge307XG59O1xubW9kdWxlLmV4cG9ydHMgPSBtYXR0ZXI7XG4iLCAiaW1wb3J0IHsgTm90aWNlLCBQbHVnaW4sIG5vcm1hbGl6ZVBhdGgsIFRGaWxlIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvblR1cm4gfSBmcm9tIFwiLi9jb252ZXJzYXRpb25cIjtcbmltcG9ydCB7IHNhdmVDb252ZXJzYXRpb25Gcm9tVHVybnMgfSBmcm9tIFwiLi9jb252ZXJzYXRpb25TdG9yZVwiO1xuaW1wb3J0IHsgT3ZsQXBpQ2xpZW50IH0gZnJvbSBcIi4vYXBpXCI7XG5pbXBvcnQgeyBhcHBlbmRFcnJvckxvZyB9IGZyb20gXCIuL2xvZ2dpbmdcIjtcbmltcG9ydCB7IFNhdmVDb252ZXJzYXRpb25Nb2RhbCwgU2F2ZUNvbnZlcnNhdGlvbkZvcm0gfSBmcm9tIFwiLi9tb2RhbHMvc2F2ZUNvbnZlcnNhdGlvbk1vZGFsXCI7XG5pbXBvcnQgeyBwYXJzZVR1cm5zIH0gZnJvbSBcIi4vcGFyc2VUdXJuc1wiO1xuaW1wb3J0IHsgT3ZsU2V0dGluZ1RhYiB9IGZyb20gXCIuL3NldHRpbmdzXCI7XG5pbXBvcnQgeyBERUZBVUxUX1NFVFRJTkdTLCBPdmxTZXR0aW5ncywgRU1CRURESU5HX1BSRVNFVFMgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgQ2hhdFZpZXcsIFZJRVdfVFlQRV9PVkxfQ0hBVCB9IGZyb20gXCIuL3ZpZXdzL2NoYXRWaWV3XCI7XG5pbXBvcnQgeyBJbmRleGVyIH0gZnJvbSBcIi4vaW5kZXhpbmcvaW5kZXhlclwiO1xuaW1wb3J0IHsgVmF1bHRXYXRjaGVyIH0gZnJvbSBcIi4vdmF1bHRXYXRjaGVyXCI7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSBcInBhdGhcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3ZsUGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcbiAgcHVibGljIHNldHRpbmdzOiBPdmxTZXR0aW5ncyA9IHsgLi4uREVGQVVMVF9TRVRUSU5HUyB9O1xuICBwcml2YXRlIGxhc3RTYXZlZFNldHRpbmdzOiBPdmxTZXR0aW5ncyA9IHsgLi4uREVGQVVMVF9TRVRUSU5HUyB9O1xuICBwcml2YXRlIGFwaUNsaWVudDogT3ZsQXBpQ2xpZW50IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgaW5kZXhlcjogSW5kZXhlciB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIHZhdWx0V2F0Y2hlcjogVmF1bHRXYXRjaGVyIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgaW5kZXhpbmdFdmVudHNSZWdpc3RlcmVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgYXN5bmMgb25sb2FkKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMubG9hZFNldHRpbmdzKCk7XG5cbiAgICAvLyBBUEkgXHVENjM4XHVDRDlDIFx1Qjg1Q1x1QzlDMVx1Qzc0NCBcdUJEODRcdUI5QUNcdUQ1NzQgXHVDMEMxXHVEMERDXHVCOTdDIFx1QzcyMFx1QzlDMFx1RDU2OVx1QjJDOFx1QjJFNC5cbiAgICB0aGlzLmFwaUNsaWVudCA9IG5ldyBPdmxBcGlDbGllbnQoXG4gICAgICAoKSA9PiB0aGlzLnNldHRpbmdzLFxuICAgICAgKGNvbnRleHQ6IHN0cmluZywgZGV0YWlsOiB1bmtub3duKSA9PlxuICAgICAgICBhcHBlbmRFcnJvckxvZyh0aGlzLmFwcCwgdGhpcy5tYW5pZmVzdCwgY29udGV4dCwgZGV0YWlsKVxuICAgICk7XG5cbiAgICAvLyBcdUM3NzhcdUIzNzFcdUMyRjEgXHVDRDA4XHVBRTMwXHVENjU0XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuaW5kZXhpbmdFbmFibGVkKSB7XG4gICAgICBhd2FpdCB0aGlzLmluaXRpYWxpemVJbmRleGluZygpO1xuICAgIH1cblxuICAgIC8vIFx1QzBBQ1x1Qzc3NFx1QjREQ1x1QkMxNCBcdUNDNDRcdUQzMDUgXHVCREYwIFx1QjRGMVx1Qjg1RFxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KFZJRVdfVFlQRV9PVkxfQ0hBVCwgKGxlYWYpID0+IG5ldyBDaGF0VmlldyhsZWFmLCB0aGlzKSk7XG5cbiAgICB0aGlzLmFkZFJpYmJvbkljb24oXCJtZXNzYWdlLWNpcmNsZVwiLCBcIk9WTCBcdUIzMDBcdUQ2NTQgXHVDNUY0XHVBRTMwXCIsICgpID0+IHtcbiAgICAgIHZvaWQgdGhpcy5vcGVuQ2hhdFZpZXcoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICBpZDogXCJvdmwtb3Blbi1jaGF0XCIsXG4gICAgICBuYW1lOiBcIk9WTCBcdUIzMDBcdUQ2NTQgXHVDQzNEIFx1QzVGNFx1QUUzMFwiLFxuICAgICAgY2FsbGJhY2s6ICgpID0+IHtcbiAgICAgICAgdm9pZCB0aGlzLm9wZW5DaGF0VmlldygpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5hZGRDb21tYW5kKHtcbiAgICAgIGlkOiBcIm92bC1zYXZlLWNvbnZlcnNhdGlvblwiLFxuICAgICAgbmFtZTogXCJcdUIzMDBcdUQ2NTQgSlNPTlx1QzVEMFx1QzExQyBcdUI5QzhcdUQwNkNcdUIyRTRcdUM2QjQgXHVDODAwXHVDN0E1XCIsXG4gICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICBuZXcgU2F2ZUNvbnZlcnNhdGlvbk1vZGFsKHRoaXMsIChmb3JtKSA9PiB7XG4gICAgICAgICAgdm9pZCB0aGlzLmhhbmRsZVNhdmVDb252ZXJzYXRpb24oZm9ybSk7XG4gICAgICAgIH0pLm9wZW4oKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICBpZDogXCJvdmwtaW5kZXgtdmF1bHRcIixcbiAgICAgIG5hbWU6IFwiXHVCQ0ZDXHVEMkI4IFx1Qzc3OFx1QjM3MVx1QzJGMSBcdUMyRENcdUM3OTFcIixcbiAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgIHZvaWQgdGhpcy5zdGFydEluZGV4aW5nKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZFNldHRpbmdUYWIobmV3IE92bFNldHRpbmdUYWIodGhpcykpO1xuICB9XG5cbiAgb251bmxvYWQoKTogdm9pZCB7XG4gICAgdGhpcy5hcHAud29ya3NwYWNlLmdldExlYXZlc09mVHlwZShWSUVXX1RZUEVfT1ZMX0NIQVQpLmZvckVhY2goKGxlYWYpID0+IHtcbiAgICAgIGxlYWYuZGV0YWNoKCk7XG4gICAgfSk7XG5cbiAgICAvLyBcdUM3NzhcdUIzNzFcdUMxMUMgXHVDODE1XHVCOUFDXG4gICAgaWYgKHRoaXMuaW5kZXhlcikge1xuICAgICAgdGhpcy5pbmRleGVyLmNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFx1Qzc3OFx1QjM3MVx1QzJGMSBcdUMyRENcdUMyQTRcdUQxNUMgXHVDRDA4XHVBRTMwXHVENjU0XG4gICAqL1xuICBwcml2YXRlIGFzeW5jIGluaXRpYWxpemVJbmRleGluZygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0cnkge1xuICAgICAgaWYgKHRoaXMuaW5kZXhlcikge1xuICAgICAgICB0aGlzLmluZGV4ZXIuY2xvc2UoKTtcbiAgICAgICAgdGhpcy5pbmRleGVyID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgLy8gXHVCMzcwXHVDNzc0XHVEMTMwIFx1QjUxNFx1QjgwOVx1RDFBMFx1QjlBQyBcdUFDQkRcdUI4NUNcbiAgICAgIGNvbnN0IGRhdGFEaXIgPSBqb2luKFxuICAgICAgICAvLyBAdHMtaWdub3JlIC0gT2JzaWRpYW4gQVBJXHVDNzU4IFx1QjBCNFx1QkQ4MCBcdUMxOERcdUMxMzEgXHVDMEFDXHVDNkE5XG4gICAgICAgIHRoaXMuYXBwLnZhdWx0LmFkYXB0ZXIuYmFzZVBhdGgsXG4gICAgICAgIFwiLm9ic2lkaWFuXCIsXG4gICAgICAgIFwicGx1Z2luc1wiLFxuICAgICAgICB0aGlzLm1hbmlmZXN0LmlkXG4gICAgICApO1xuXG4gICAgICBjb25zdCBtZXRhU3RvcmVQYXRoID0gam9pbihkYXRhRGlyLCBcIm1ldGEuanNvblwiKTtcbiAgICAgIGNvbnN0IHZlY3RvclN0b3JlUGF0aCA9IGpvaW4oZGF0YURpciwgXCJ2ZWN0b3JzLmpzb25cIik7XG5cbiAgICAgIC8vIFx1Qzc3OFx1QjM3MVx1QzExQyBcdUMwRERcdUMxMzFcbiAgICAgIHRoaXMuaW5kZXhlciA9IG5ldyBJbmRleGVyKHtcbiAgICAgICAgY2h1bmtTaXplOiB0aGlzLnNldHRpbmdzLmNodW5rU2l6ZSxcbiAgICAgICAgY2h1bmtPdmVybGFwOiB0aGlzLnNldHRpbmdzLmNodW5rT3ZlcmxhcCxcbiAgICAgICAgdG9wSzogdGhpcy5zZXR0aW5ncy50b3BLLFxuICAgICAgICBlbWJlZGRpbmdQcm92aWRlcjogdGhpcy5zZXR0aW5ncy5lbWJlZGRpbmdQcm92aWRlcixcbiAgICAgICAgZW1iZWRkaW5nTW9kZWw6IHRoaXMuc2V0dGluZ3MuZW1iZWRkaW5nTW9kZWwsXG4gICAgICAgIGVtYmVkZGluZ0FwaUtleTogdGhpcy5zZXR0aW5ncy5lbWJlZGRpbmdBcGlLZXkgfHwgdGhpcy5zZXR0aW5ncy5hcGlLZXksXG4gICAgICAgIGVtYmVkZGluZ0FwaVVybDogdGhpcy5nZXRFbWJlZGRpbmdBcGlVcmwoKSxcbiAgICAgICAgbWV0YVN0b3JlUGF0aCxcbiAgICAgICAgdmVjdG9yU3RvcmVQYXRoLFxuICAgICAgfSk7XG5cbiAgICAgIGF3YWl0IHRoaXMuaW5kZXhlci5pbml0aWFsaXplKCk7XG5cbiAgICAgIC8vIFx1QkNGQ1x1RDJCOCBcdUM2Q0NcdUNDOTggXHVDMTI0XHVDODE1XG4gICAgICB0aGlzLnZhdWx0V2F0Y2hlciA9IG5ldyBWYXVsdFdhdGNoZXIodGhpcy5hcHAudmF1bHQpO1xuICAgICAgdGhpcy52YXVsdFdhdGNoZXIuc2V0SW5kZXhlcih0aGlzLmluZGV4ZXIpO1xuXG4gICAgICBpZiAoIXRoaXMuaW5kZXhpbmdFdmVudHNSZWdpc3RlcmVkKSB7XG4gICAgICAgIC8vIFx1RDMwQ1x1Qzc3QyBcdUM3NzRcdUJDQTRcdUQyQjggXHVCOUFDXHVDMkE0XHVCMTA4IFx1QjRGMVx1Qjg1RFxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXG4gICAgICAgICAgdGhpcy5hcHAudmF1bHQub24oXCJjcmVhdGVcIiwgKGZpbGUpID0+IHtcbiAgICAgICAgICAgIGlmIChmaWxlIGluc3RhbmNlb2YgVEZpbGUpIHtcbiAgICAgICAgICAgICAgdm9pZCB0aGlzLnZhdWx0V2F0Y2hlcj8ub25GaWxlQ3JlYXRlKGZpbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFxuICAgICAgICAgIHRoaXMuYXBwLnZhdWx0Lm9uKFwibW9kaWZ5XCIsIChmaWxlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZmlsZSBpbnN0YW5jZW9mIFRGaWxlKSB7XG4gICAgICAgICAgICAgIHZvaWQgdGhpcy52YXVsdFdhdGNoZXI/Lm9uRmlsZU1vZGlmeShmaWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChcbiAgICAgICAgICB0aGlzLmFwcC52YXVsdC5vbihcImRlbGV0ZVwiLCAoZmlsZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGZpbGUgaW5zdGFuY2VvZiBURmlsZSkge1xuICAgICAgICAgICAgICB0aGlzLnZhdWx0V2F0Y2hlcj8ub25GaWxlRGVsZXRlKGZpbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFxuICAgICAgICAgIHRoaXMuYXBwLnZhdWx0Lm9uKFwicmVuYW1lXCIsIChmaWxlLCBvbGRQYXRoKSA9PiB7XG4gICAgICAgICAgICBpZiAoZmlsZSBpbnN0YW5jZW9mIFRGaWxlKSB7XG4gICAgICAgICAgICAgIHZvaWQgdGhpcy52YXVsdFdhdGNoZXI/Lm9uRmlsZVJlbmFtZShmaWxlLCBvbGRQYXRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmluZGV4aW5nRXZlbnRzUmVnaXN0ZXJlZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnNvbGUubG9nKFwiXHVDNzc4XHVCMzcxXHVDMkYxIFx1QzJEQ1x1QzJBNFx1RDE1QyBcdUNEMDhcdUFFMzBcdUQ2NTQgXHVDNjQ0XHVCOENDXCIpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiXHVDNzc4XHVCMzcxXHVDMkYxIFx1QzJEQ1x1QzJBNFx1RDE1QyBcdUNEMDhcdUFFMzBcdUQ2NTQgXHVDMkU0XHVEMzI4OlwiLCBlcnJvcik7XG4gICAgICBuZXcgTm90aWNlKFwiXHVDNzc4XHVCMzcxXHVDMkYxIFx1QzJEQ1x1QzJBNFx1RDE1QyBcdUNEMDhcdUFFMzBcdUQ2NTRcdUM1RDAgXHVDMkU0XHVEMzI4XHVENTg4XHVDMkI1XHVCMkM4XHVCMkU0XCIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBcdUJDRkNcdUQyQjggXHVDNzc4XHVCMzcxXHVDMkYxIFx1QzJEQ1x1Qzc5MVxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBzdGFydEluZGV4aW5nKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICghdGhpcy5zZXR0aW5ncy5pbmRleGluZ0VuYWJsZWQpIHtcbiAgICAgIG5ldyBOb3RpY2UoXCJcdUJBM0NcdUM4MDAgXHVDMTI0XHVDODE1XHVDNUQwXHVDMTFDIFx1Qzc3OFx1QjM3MVx1QzJGMVx1Qzc0NCBcdUQ2NUNcdUMxMzFcdUQ2NTRcdUQ1NzQgXHVDOEZDXHVDMTM4XHVDNjk0XCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5pbmRleGVyKSB7XG4gICAgICBhd2FpdCB0aGlzLmluaXRpYWxpemVJbmRleGluZygpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy52YXVsdFdhdGNoZXIpIHtcbiAgICAgIG5ldyBOb3RpY2UoXCJcdUM3NzhcdUIzNzFcdUMyRjEgXHVDMkRDXHVDMkE0XHVEMTVDXHVDNzc0IFx1Q0QwOFx1QUUzMFx1RDY1NFx1QjQxOFx1QzlDMCBcdUM1NEFcdUM1NThcdUMyQjVcdUIyQzhcdUIyRTRcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHRoaXMudmF1bHRXYXRjaGVyLmluZGV4VmF1bHQoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIlx1QkNGQ1x1RDJCOCBcdUM3NzhcdUIzNzFcdUMyRjEgXHVDMkU0XHVEMzI4OlwiLCBlcnJvcik7XG4gICAgICBuZXcgTm90aWNlKFwiXHVCQ0ZDXHVEMkI4IFx1Qzc3OFx1QjM3MVx1QzJGMVx1QzVEMCBcdUMyRTRcdUQzMjhcdUQ1ODhcdUMyQjVcdUIyQzhcdUIyRTRcIik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFx1QkNBMVx1RDEzMCBcdUFDODBcdUMwQzkgXHVDMjE4XHVENTg5XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2VhcmNoKHF1ZXJ5OiBzdHJpbmcpOiBQcm9taXNlPEFycmF5PHsgY2h1bms6IGFueTsgbm90ZTogYW55OyBzY29yZTogbnVtYmVyIH0+PiB7XG4gICAgaWYgKCF0aGlzLmluZGV4ZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlx1Qzc3OFx1QjM3MVx1QzJGMVx1Qzc3NCBcdUQ2NUNcdUMxMzFcdUQ2NTRcdUI0MThcdUM5QzAgXHVDNTRBXHVDNTU4XHVDMkI1XHVCMkM4XHVCMkU0XCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHNlYXJjaFJlc3VsdHMgPSBhd2FpdCB0aGlzLmluZGV4ZXIuc2VhcmNoKHF1ZXJ5KTtcbiAgICByZXR1cm4gdGhpcy5pbmRleGVyLmdldFNlYXJjaFJlc3VsdHNXaXRoTWV0YWRhdGEoc2VhcmNoUmVzdWx0cyk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIG9wZW5DaGF0VmlldygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBleGlzdGluZ0xlYWYgPSB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0TGVhdmVzT2ZUeXBlKFZJRVdfVFlQRV9PVkxfQ0hBVClbMF07XG4gICAgY29uc3QgbGVhZiA9IGV4aXN0aW5nTGVhZiA/PyB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0UmlnaHRMZWFmKGZhbHNlKTtcbiAgICBpZiAoIWxlYWYpIHtcbiAgICAgIG5ldyBOb3RpY2UoXCJcdUIzMDBcdUQ2NTQgXHVDQzNEXHVDNzQ0IFx1QzVGNCBcdUMyMTggXHVDNUM2XHVDMkI1XHVCMkM4XHVCMkU0LlwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhd2FpdCBsZWFmLnNldFZpZXdTdGF0ZSh7IHR5cGU6IFZJRVdfVFlQRV9PVkxfQ0hBVCwgYWN0aXZlOiB0cnVlIH0pO1xuICAgIHRoaXMuYXBwLndvcmtzcGFjZS5yZXZlYWxMZWFmKGxlYWYpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlcXVlc3RBc3Npc3RhbnRSZXBseSh0dXJuczogQ29udmVyc2F0aW9uVHVybltdKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBpZiAoIXRoaXMuYXBpQ2xpZW50KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBUEkgXHVEMDc0XHVCNzdDXHVDNzc0XHVDNUI4XHVEMkI4XHVCOTdDIFx1Q0QwOFx1QUUzMFx1RDY1NFx1RDU2MCBcdUMyMTggXHVDNUM2XHVDMkI1XHVCMkM4XHVCMkU0LlwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuYXBpQ2xpZW50LnJlcXVlc3RBc3Npc3RhbnRSZXBseSh0dXJucyk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcmVxdWVzdFRpdGxlUmVwbHkocHJvbXB0OiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGlmICghdGhpcy5hcGlDbGllbnQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkFQSSBcdUQwNzRcdUI3N0NcdUM3NzRcdUM1QjhcdUQyQjhcdUI5N0MgXHVDRDA4XHVBRTMwXHVENjU0XHVENTYwIFx1QzIxOCBcdUM1QzZcdUMyQjVcdUIyQzhcdUIyRTQuXCIpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5hcGlDbGllbnQucmVxdWVzdFRpdGxlUmVwbHkocHJvbXB0KTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzYXZlQ29udmVyc2F0aW9uRnJvbVR1cm5zKFxuICAgIHNlc3Npb25JZDogc3RyaW5nLFxuICAgIHR1cm5zOiBDb252ZXJzYXRpb25UdXJuW10sXG4gICAgb3V0cHV0Rm9sZGVyOiBzdHJpbmdcbiAgKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gc2F2ZUNvbnZlcnNhdGlvbkZyb21UdXJucyh0aGlzLmFwcC52YXVsdCwgc2Vzc2lvbklkLCB0dXJucywgb3V0cHV0Rm9sZGVyKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgbG9hZFNldHRpbmdzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuc2V0dGluZ3MgPSB7IC4uLkRFRkFVTFRfU0VUVElOR1MsIC4uLihhd2FpdCB0aGlzLmxvYWREYXRhKCkpIH07XG5cbiAgICBsZXQgY2hhbmdlZCA9IGZhbHNlO1xuICAgIGlmICh0aGlzLnNldHRpbmdzLmVtYmVkZGluZ1Byb3ZpZGVyID09PSBcImxvY2FsXCIpIHtcbiAgICAgIHRoaXMuc2V0dGluZ3MuZW1iZWRkaW5nUHJvdmlkZXIgPSBcImdlbWluaVwiO1xuICAgICAgdGhpcy5zZXR0aW5ncy5lbWJlZGRpbmdNb2RlbCA9IEVNQkVERElOR19QUkVTRVRTLmdlbWluaS5tb2RlbDtcbiAgICAgIHRoaXMuc2V0dGluZ3MuZW1iZWRkaW5nQXBpVXJsID0gRU1CRURESU5HX1BSRVNFVFMuZ2VtaW5pLmFwaVVybCB8fCBcIlwiO1xuICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZWQpIHtcbiAgICAgIGF3YWl0IHRoaXMuc2F2ZVNldHRpbmdzKCk7XG4gICAgfVxuXG4gICAgdGhpcy5sYXN0U2F2ZWRTZXR0aW5ncyA9IHsgLi4udGhpcy5zZXR0aW5ncyB9O1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHNhdmVTZXR0aW5ncygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBwcmV2aW91c1NldHRpbmdzID0geyAuLi50aGlzLmxhc3RTYXZlZFNldHRpbmdzIH07XG4gICAgYXdhaXQgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcbiAgICB0aGlzLmxhc3RTYXZlZFNldHRpbmdzID0geyAuLi50aGlzLnNldHRpbmdzIH07XG5cbiAgICBpZiAocHJldmlvdXNTZXR0aW5ncy5pbmRleGluZ0VuYWJsZWQgIT09IHRoaXMuc2V0dGluZ3MuaW5kZXhpbmdFbmFibGVkKSB7XG4gICAgICBpZiAoIXRoaXMuc2V0dGluZ3MuaW5kZXhpbmdFbmFibGVkKSB7XG4gICAgICAgIHRoaXMuaW5kZXhlcj8uY2xvc2UoKTtcbiAgICAgICAgdGhpcy5pbmRleGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy52YXVsdFdhdGNoZXI/LnNldEluZGV4ZXIobnVsbCk7XG4gICAgICAgIHRoaXMudmF1bHRXYXRjaGVyID0gbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF3YWl0IHRoaXMuaW5pdGlhbGl6ZUluZGV4aW5nKCk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnNldHRpbmdzLmluZGV4aW5nRW5hYmxlZCB8fCAhdGhpcy5pbmRleGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2hvdWxkUmVpbml0aWFsaXplSW5kZXhpbmcocHJldmlvdXNTZXR0aW5ncywgdGhpcy5zZXR0aW5ncykpIHtcbiAgICAgIGF3YWl0IHRoaXMuaW5pdGlhbGl6ZUluZGV4aW5nKCk7XG4gICAgICBuZXcgTm90aWNlKFwiXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzEyNFx1QzgxNVx1Qzc3NCBcdUJDQzBcdUFDQkRcdUI0MThcdUM1QjQgXHVDN0FDXHVDNzc4XHVCMzcxXHVDMkYxXHVDNzc0IFx1RDU0NFx1QzY5NFx1RDU2OVx1QjJDOFx1QjJFNC4gXHVDMTI0XHVDODE1XHVDNUQwXHVDMTFDIFx1QzgwNFx1Q0NCNCBcdUM3ODRcdUJDQTBcdUI1MjlcdUM3NDQgXHVDMkU0XHVENTg5XHVENTc0IFx1QzhGQ1x1QzEzOFx1QzY5NC5cIik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVTYXZlQ29udmVyc2F0aW9uKGZvcm06IFNhdmVDb252ZXJzYXRpb25Gb3JtKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghZm9ybS5pbnB1dFBhdGgpIHtcbiAgICAgICAgbmV3IE5vdGljZShcIkpTT04gXHVEMzBDXHVDNzdDIFx1QUNCRFx1Qjg1Q1x1Qjk3QyBcdUM3ODVcdUI4MjVcdUQ1NzQgXHVDOEZDXHVDMTM4XHVDNjk0LlwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKCFmb3JtLnNlc3Npb25JZCkge1xuICAgICAgICBuZXcgTm90aWNlKFwiXHVDMTM4XHVDMTU4IElEXHVCOTdDIFx1Qzc4NVx1QjgyNVx1RDU3NCBcdUM4RkNcdUMxMzhcdUM2OTQuXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGpzb25QYXRoID0gbm9ybWFsaXplUGF0aChmb3JtLmlucHV0UGF0aCkucmVwbGFjZSgvXlxcLysvLCBcIlwiKTtcbiAgICAgIGNvbnN0IGpzb25FeGlzdHMgPSBhd2FpdCB0aGlzLmFwcC52YXVsdC5hZGFwdGVyLmV4aXN0cyhqc29uUGF0aCk7XG4gICAgICBpZiAoIWpzb25FeGlzdHMpIHtcbiAgICAgICAgbmV3IE5vdGljZShcIkpTT04gXHVEMzBDXHVDNzdDXHVDNzQ0IFx1Q0MzRVx1Qzc0NCBcdUMyMTggXHVDNUM2XHVDMkI1XHVCMkM4XHVCMkU0LlwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QganNvbkNvbnRlbnQgPSBhd2FpdCB0aGlzLmFwcC52YXVsdC5hZGFwdGVyLnJlYWQoanNvblBhdGgpO1xuICAgICAgY29uc3QgdHVybnMgPSBwYXJzZVR1cm5zKGpzb25Db250ZW50KTtcblxuICAgICAgY29uc3Qgb3V0cHV0Rm9sZGVyID0gZm9ybS5vdXRwdXRGb2xkZXJcbiAgICAgICAgPyBub3JtYWxpemVQYXRoKGZvcm0ub3V0cHV0Rm9sZGVyKS5yZXBsYWNlKC9eXFwvKy8sIFwiXCIpXG4gICAgICAgIDogXCJcIjtcbiAgICAgIGNvbnN0IHRhcmdldFBhdGggPSBhd2FpdCBzYXZlQ29udmVyc2F0aW9uRnJvbVR1cm5zKFxuICAgICAgICB0aGlzLmFwcC52YXVsdCxcbiAgICAgICAgZm9ybS5zZXNzaW9uSWQsXG4gICAgICAgIHR1cm5zLFxuICAgICAgICBvdXRwdXRGb2xkZXJcbiAgICAgICk7XG4gICAgICBuZXcgTm90aWNlKGBcdUIzMDBcdUQ2NTQgXHVDODAwXHVDN0E1IFx1QzY0NFx1QjhDQzogJHt0YXJnZXRQYXRofWApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpO1xuICAgICAgbmV3IE5vdGljZShgXHVDODAwXHVDN0E1IFx1QzJFNFx1RDMyODogJHttZXNzYWdlfWApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBcdUM4MDRcdUNDQjQgXHVCQ0ZDXHVEMkI4XHVCOTdDIFx1Qzc4NFx1QkNBMFx1QjUyOVx1RDU2OVx1QjJDOFx1QjJFNCAoXHVDMkE0XHVDRTk0IFx1RDZDNCBcdUM3QUNcdUM3NzhcdUIzNzFcdUMyRjEpXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgaW5kZXhWYXVsdEFsbCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIXRoaXMuc2V0dGluZ3MuaW5kZXhpbmdFbmFibGVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJcdUM3NzhcdUIzNzFcdUMyRjFcdUM3NzQgXHVENjVDXHVDMTMxXHVENjU0XHVCNDE4XHVDOUMwIFx1QzU0QVx1QzU1OFx1QzJCNVx1QjJDOFx1QjJFNFwiKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuaW5kZXhlcikge1xuICAgICAgYXdhaXQgdGhpcy5pbml0aWFsaXplSW5kZXhpbmcoKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMudmF1bHRXYXRjaGVyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJcdUM3NzhcdUIzNzFcdUMyRjEgXHVDMkRDXHVDMkE0XHVEMTVDXHVDNzc0IFx1Q0QwOFx1QUUzMFx1RDY1NFx1QjQxOFx1QzlDMCBcdUM1NEFcdUM1NThcdUMyQjVcdUIyQzhcdUIyRTRcIik7XG4gICAgfVxuXG4gICAgY29uc3QgaW5kZXhlciA9IHRoaXMuaW5kZXhlcjtcbiAgICBpZiAoIWluZGV4ZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlx1Qzc3OFx1QjM3MVx1QzJGMSBcdUMyRENcdUMyQTRcdUQxNUNcdUM3NzQgXHVDRDA4XHVBRTMwXHVENjU0XHVCNDE4XHVDOUMwIFx1QzU0QVx1QzU1OFx1QzJCNVx1QjJDOFx1QjJFNFwiKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc29sZS5sb2coXCJcdUM4MDRcdUNDQjQgXHVCQ0ZDXHVEMkI4IFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUMyRENcdUM3OTEuLi5cIik7XG4gICAgICBhd2FpdCB0aGlzLnZhdWx0V2F0Y2hlci5pbmRleFZhdWx0KCk7XG4gICAgICBjb25zb2xlLmxvZyhcIlx1QzgwNFx1Q0NCNCBcdUJDRkNcdUQyQjggXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzY0NFx1QjhDQ1wiKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIlx1QzgwNFx1Q0NCNCBcdUM3ODRcdUJDQTBcdUI1MjkgXHVDMkU0XHVEMzI4OlwiLCBlcnJvcik7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogXHVDMkUwXHVBRERDIFx1QjE3OFx1RDJCOFx1QjlDQyBcdUM3ODRcdUJDQTBcdUI1MjlcdUQ1NjlcdUIyQzhcdUIyRTQgKFx1Qzk5RFx1QkQ4NCBcdUM3NzhcdUIzNzFcdUMyRjEpXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgaW5kZXhOZXdGaWxlc09ubHkoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCF0aGlzLnNldHRpbmdzLmluZGV4aW5nRW5hYmxlZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXHVDNzc4XHVCMzcxXHVDMkYxXHVDNzc0IFx1RDY1Q1x1QzEzMVx1RDY1NFx1QjQxOFx1QzlDMCBcdUM1NEFcdUM1NThcdUMyQjVcdUIyQzhcdUIyRTRcIik7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmluZGV4ZXIpIHtcbiAgICAgIGF3YWl0IHRoaXMuaW5pdGlhbGl6ZUluZGV4aW5nKCk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnZhdWx0V2F0Y2hlcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXHVDNzc4XHVCMzcxXHVDMkYxIFx1QzJEQ1x1QzJBNFx1RDE1Q1x1Qzc3NCBcdUNEMDhcdUFFMzBcdUQ2NTRcdUI0MThcdUM5QzAgXHVDNTRBXHVDNTU4XHVDMkI1XHVCMkM4XHVCMkU0XCIpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zb2xlLmxvZyhcIlx1QzJFMFx1QUREQyBcdUQzMENcdUM3N0MgXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzJEQ1x1Qzc5MS4uLlwiKTtcbiAgICAgIFxuICAgICAgLy8gXHVCQ0ZDXHVEMkI4XHVDNzU4IFx1QkFBOFx1QjRFMCBcdUI5QzhcdUQwNkNcdUIyRTRcdUM2QjQgXHVEMzBDXHVDNzdDIFx1QUMwMFx1QzgzOFx1QzYyNFx1QUUzMFxuICAgICAgY29uc3QgYWxsRmlsZXMgPSB0aGlzLmFwcC52YXVsdC5nZXRNYXJrZG93bkZpbGVzKCk7XG4gICAgICBsZXQgaW5kZXhlZCA9IDA7XG5cbiAgICAgIGZvciAoY29uc3QgZmlsZSBvZiBhbGxGaWxlcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCB0aGlzLmFwcC52YXVsdC5jYWNoZWRSZWFkKGZpbGUpO1xuICAgICAgICAgIC8vIFx1QUMwMSBcdUQzMENcdUM3N0NcdUM3NDQgXHVDNzc4XHVCMzcxXHVDMkYxIChcdUM3NzRcdUJCRjggXHVDNzc4XHVCMzcxXHVDMkYxXHVCNDFDIFx1RDMwQ1x1Qzc3Q1x1Qzc0MCBpbmRleGVyXHVDNUQwXHVDMTFDIFx1RDY1NVx1Qzc3OClcbiAgICAgICAgICBhd2FpdCBpbmRleGVyLmluZGV4RmlsZShmaWxlLnBhdGgsIGNvbnRlbnQpO1xuICAgICAgICAgIGluZGV4ZWQrKztcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oYFx1RDMwQ1x1Qzc3QyBcdUM3ODRcdUJDQTBcdUI1MjkgXHVDMkU0XHVEMzI4OiAke2ZpbGUucGF0aH1gLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc29sZS5sb2coYFx1QzJFMFx1QUREQyBcdUQzMENcdUM3N0MgXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzY0NFx1QjhDQzogJHtpbmRleGVkfVx1QUMxQyBcdUQzMENcdUM3N0MgXHVDQzk4XHVCOUFDYCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJcdUMyRTBcdUFEREMgXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzJFNFx1RDMyODpcIiwgZXJyb3IpO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFx1Qzc4NFx1QkNBMFx1QjUyOSBBUEkgVVJMIFx1QUMwMFx1QzgzOFx1QzYyNFx1QUUzMFxuICAgKi9cbiAgcHJpdmF0ZSBnZXRFbWJlZGRpbmdBcGlVcmwoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAodGhpcy5zZXR0aW5ncy5lbWJlZGRpbmdBcGlVcmw/LnRyaW0oKSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MuZW1iZWRkaW5nQXBpVXJsLnRyaW0oKTtcbiAgICB9XG5cbiAgICBjb25zdCBwcmVzZXQgPSBFTUJFRERJTkdfUFJFU0VUU1t0aGlzLnNldHRpbmdzLmVtYmVkZGluZ1Byb3ZpZGVyXTtcbiAgICByZXR1cm4gcHJlc2V0Py5hcGlVcmw7XG4gIH1cblxuICAvKipcbiAgICogXHVDNzc4XHVCMzcxXHVDMTFDIFx1QzdBQ1x1Q0QwOFx1QUUzMFx1RDY1NFx1QUMwMCBcdUQ1NDRcdUM2OTRcdUQ1NUMgXHVDMTI0XHVDODE1IFx1QkNDMFx1QUNCRFx1Qzc3OFx1QzlDMCBcdUQ2NTVcdUM3NzhcbiAgICovXG4gIHByaXZhdGUgc2hvdWxkUmVpbml0aWFsaXplSW5kZXhpbmcocHJldmlvdXM6IE92bFNldHRpbmdzLCBjdXJyZW50OiBPdmxTZXR0aW5ncyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICBwcmV2aW91cy5lbWJlZGRpbmdQcm92aWRlciAhPT0gY3VycmVudC5lbWJlZGRpbmdQcm92aWRlciB8fFxuICAgICAgcHJldmlvdXMuZW1iZWRkaW5nTW9kZWwgIT09IGN1cnJlbnQuZW1iZWRkaW5nTW9kZWwgfHxcbiAgICAgIHByZXZpb3VzLmVtYmVkZGluZ0FwaVVybCAhPT0gY3VycmVudC5lbWJlZGRpbmdBcGlVcmxcbiAgICApO1xuICB9XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBWYXVsdCB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHsgbm9ybWFsaXplUGF0aCB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb24sIENvbnZlcnNhdGlvblR1cm4gfSBmcm9tIFwiLi9jb252ZXJzYXRpb25cIjtcbmltcG9ydCB7IGNvbnZlcnRUb01hcmtkb3duIH0gZnJvbSBcIi4vY29udmVyc2F0aW9uXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzYXZlQ29udmVyc2F0aW9uRnJvbVR1cm5zKFxuICB2YXVsdDogVmF1bHQsXG4gIHNlc3Npb25JZDogc3RyaW5nLFxuICB0dXJuczogQ29udmVyc2F0aW9uVHVybltdLFxuICBvdXRwdXRGb2xkZXI6IHN0cmluZ1xuKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgY29uc3QgY29udmVyc2F0aW9uOiBDb252ZXJzYXRpb24gPSB7XG4gICAgc2Vzc2lvbklkLFxuICAgIHR1cm5zLFxuICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKVxuICB9O1xuXG4gIGNvbnN0IG1hcmtkb3duID0gY29udmVydFRvTWFya2Rvd24oY29udmVyc2F0aW9uKTtcbiAgY29uc3QgZmlsZW5hbWUgPSBidWlsZEZpbGVOYW1lKGNvbnZlcnNhdGlvbik7XG4gIGNvbnN0IGNsZWFuZWRGb2xkZXIgPSBvdXRwdXRGb2xkZXIgPyBub3JtYWxpemVQYXRoKG91dHB1dEZvbGRlcikucmVwbGFjZSgvXlxcLysvLCBcIlwiKSA6IFwiXCI7XG4gIGNvbnN0IHRhcmdldFBhdGggPSBhd2FpdCBlbnN1cmVVbmlxdWVQYXRoKFxuICAgIHZhdWx0LFxuICAgIG5vcm1hbGl6ZVBhdGgoY2xlYW5lZEZvbGRlciA/IGAke2NsZWFuZWRGb2xkZXJ9LyR7ZmlsZW5hbWV9YCA6IGZpbGVuYW1lKVxuICApO1xuXG4gIGlmIChjbGVhbmVkRm9sZGVyKSB7XG4gICAgYXdhaXQgZW5zdXJlRm9sZGVyRXhpc3RzKHZhdWx0LCBjbGVhbmVkRm9sZGVyKTtcbiAgfVxuXG4gIGF3YWl0IHZhdWx0LmNyZWF0ZSh0YXJnZXRQYXRoLCBtYXJrZG93bik7XG4gIHJldHVybiB0YXJnZXRQYXRoO1xufVxuXG5mdW5jdGlvbiBidWlsZEZpbGVOYW1lKGNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uKTogc3RyaW5nIHtcbiAgY29uc3Qgc2FmZVRpdGxlID0gc2FuaXRpemVGaWxlU2VnbWVudChjb252ZXJzYXRpb24uc2Vzc2lvbklkKTtcbiAgcmV0dXJuIGAke3NhZmVUaXRsZX0ubWRgO1xufVxuXG5mdW5jdGlvbiBzYW5pdGl6ZUZpbGVTZWdtZW50KHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCB0cmltbWVkID0gdmFsdWUudHJpbSgpO1xuICBpZiAoIXRyaW1tZWQpIHtcbiAgICByZXR1cm4gXCJ1bnRpdGxlZFwiO1xuICB9XG5cbiAgY29uc3QgY2xlYW5lZCA9IHRyaW1tZWRcbiAgICAucmVwbGFjZSgvW1xcXFwvOio/XCI8PnxdL2csIFwiIFwiKVxuICAgIC5yZXBsYWNlKC9cXHMrL2csIFwiIFwiKVxuICAgIC50cmltKCk7XG5cbiAgcmV0dXJuIGNsZWFuZWQgfHwgXCJ1bnRpdGxlZFwiO1xufVxuXG5hc3luYyBmdW5jdGlvbiBlbnN1cmVGb2xkZXJFeGlzdHModmF1bHQ6IFZhdWx0LCBmb2xkZXI6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBleGlzdHMgPSBhd2FpdCB2YXVsdC5hZGFwdGVyLmV4aXN0cyhmb2xkZXIpO1xuICBpZiAoIWV4aXN0cykge1xuICAgIGF3YWl0IHZhdWx0LmNyZWF0ZUZvbGRlcihmb2xkZXIpO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGVuc3VyZVVuaXF1ZVBhdGgodmF1bHQ6IFZhdWx0LCBwYXRoOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplUGF0aChwYXRoKTtcbiAgY29uc3QgZXh0ZW5zaW9uSW5kZXggPSBub3JtYWxpemVkLmxhc3RJbmRleE9mKFwiLm1kXCIpO1xuICBjb25zdCBiYXNlID0gZXh0ZW5zaW9uSW5kZXggPT09IC0xID8gbm9ybWFsaXplZCA6IG5vcm1hbGl6ZWQuc2xpY2UoMCwgZXh0ZW5zaW9uSW5kZXgpO1xuICBjb25zdCBleHRlbnNpb24gPSBleHRlbnNpb25JbmRleCA9PT0gLTEgPyBcIlwiIDogXCIubWRcIjtcblxuICBsZXQgY2FuZGlkYXRlID0gbm9ybWFsaXplZDtcbiAgbGV0IGNvdW50ID0gMTtcblxuICB3aGlsZSAoYXdhaXQgdmF1bHQuYWRhcHRlci5leGlzdHMoY2FuZGlkYXRlKSkge1xuICAgIGNhbmRpZGF0ZSA9IGAke2Jhc2V9LSR7Y291bnR9JHtleHRlbnNpb259YDtcbiAgICBjb3VudCArPSAxO1xuICB9XG5cbiAgcmV0dXJuIGNhbmRpZGF0ZTtcbn1cbiIsICJpbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcblxuLy8gXHVCMzAwXHVENjU0XHVDNzU4IFx1QUMwMSBcdUQxMzRcdUM3NDQgXHVCMDk4XHVEMEMwXHVCMEI0XHVCMjk0IFx1RDBDMFx1Qzc4NVxuZXhwb3J0IHR5cGUgQ29udmVyc2F0aW9uVHVybiA9IHtcbiAgcm9sZTogXCJ1c2VyXCIgfCBcImFzc2lzdGFudFwiIHwgXCJzeXN0ZW1cIjtcbiAgY29udGVudDogc3RyaW5nO1xuICB0aW1lc3RhbXA/OiBEYXRlIHwgc3RyaW5nO1xufTtcblxuLy8gXHVCMzAwXHVENjU0IFx1QzgwNFx1Q0NCNFx1Qjk3QyBcdUIwOThcdUQwQzBcdUIwQjRcdUIyOTQgXHVEMEMwXHVDNzg1XG5leHBvcnQgdHlwZSBDb252ZXJzYXRpb24gPSB7XG4gIHNlc3Npb25JZDogc3RyaW5nO1xuICB0dXJuczogQ29udmVyc2F0aW9uVHVybltdO1xuICBjcmVhdGVkQXQ6IERhdGU7XG59O1xuXG4vLyBcdUIzMDBcdUQ2NTRcdUI5N0MgXHVCOUM4XHVEMDZDXHVCMkU0XHVDNkI0IFx1RDYxNVx1QzJERFx1QzczQ1x1Qjg1QyBcdUJDQzBcdUQ2NThcbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0VG9NYXJrZG93bihjb252ZXJzYXRpb246IENvbnZlcnNhdGlvbik6IHN0cmluZyB7XG4gIGNvbnN0IGxpbmVzOiBzdHJpbmdbXSA9IFtdO1xuICBcbiAgLy8gXHVENUU0XHVCMzU0OiBcdUM4MUNcdUJBQTlcdUFDRkMgXHVCQTU0XHVEMEMwXHVCMzcwXHVDNzc0XHVEMTMwXG4gIGxpbmVzLnB1c2goYCMgXHVCMzAwXHVENjU0IFx1QUUzMFx1Qjg1RCAtICR7Y29udmVyc2F0aW9uLnNlc3Npb25JZH1gKTtcbiAgbGluZXMucHVzaChcIlwiKTtcbiAgbGluZXMucHVzaChgXHVDMEREXHVDMTMxXHVDNzdDOiAke2NvbnZlcnNhdGlvbi5jcmVhdGVkQXQudG9JU09TdHJpbmcoKX1gKTtcbiAgbGluZXMucHVzaChcIlwiKTtcbiAgbGluZXMucHVzaChcIi0tLVwiKTtcbiAgbGluZXMucHVzaChcIlwiKTtcbiAgXG4gIC8vIFx1QUMwMSBcdUQxMzRcdUM3NDQgXHVCOUM4XHVEMDZDXHVCMkU0XHVDNkI0XHVDNzNDXHVCODVDIFx1QkNDMFx1RDY1OFxuICBmb3IgKGNvbnN0IHR1cm4gb2YgY29udmVyc2F0aW9uLnR1cm5zKSB7XG4gICAgY29uc3Qgcm9sZUxhYmVsID0gdHVybi5yb2xlID09PSBcInVzZXJcIiA/IFwiXHVEODNEXHVEQzY0IFx1QzBBQ1x1QzZBOVx1Qzc5MFwiIDogXG4gICAgICAgICAgICAgICAgICAgICB0dXJuLnJvbGUgPT09IFwiYXNzaXN0YW50XCIgPyBcIlx1RDgzRVx1REQxNiBcdUM1QjRcdUMyRENcdUMyQTRcdUQxMzRcdUQyQjhcIiA6IFxuICAgICAgICAgICAgICAgICAgICAgXCJcdTI2OTlcdUZFMEYgXHVDMkRDXHVDMkE0XHVEMTVDXCI7XG4gICAgXG4gICAgbGluZXMucHVzaChgIyMgJHtyb2xlTGFiZWx9YCk7XG4gICAgXG4gICAgaWYgKHR1cm4udGltZXN0YW1wKSB7XG4gICAgICBjb25zdCB0aW1lc3RhbXAgPSB0eXBlb2YgdHVybi50aW1lc3RhbXAgPT09IFwic3RyaW5nXCIgXG4gICAgICAgID8gdHVybi50aW1lc3RhbXAgXG4gICAgICAgIDogdHVybi50aW1lc3RhbXAudG9JU09TdHJpbmcoKTtcbiAgICAgIGxpbmVzLnB1c2goYCoke3RpbWVzdGFtcH0qYCk7XG4gICAgICBsaW5lcy5wdXNoKFwiXCIpO1xuICAgIH1cbiAgICBcbiAgICBsaW5lcy5wdXNoKHR1cm4uY29udGVudCk7XG4gICAgbGluZXMucHVzaChcIlwiKTtcbiAgfVxuICBcbiAgcmV0dXJuIGxpbmVzLmpvaW4oXCJcXG5cIik7XG59XG5cbi8vIFx1QjMwMFx1RDY1NFx1Qjk3QyBcdUQzMENcdUM3N0NcdUI4NUMgXHVDODAwXHVDN0E1XG5leHBvcnQgZnVuY3Rpb24gc2F2ZUNvbnZlcnNhdGlvbihcbiAgY29udmVyc2F0aW9uOiBDb252ZXJzYXRpb24sXG4gIHRhcmdldERpcjogc3RyaW5nXG4pOiBzdHJpbmcge1xuICBpZiAoIWZzLmV4aXN0c1N5bmModGFyZ2V0RGlyKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgXHVCMzAwXHVDMEMxIFx1QjUxNFx1QjgwOVx1RDFBMFx1QjlBQ1x1QUMwMCBcdUM4NzRcdUM3QUNcdUQ1NThcdUM5QzAgXHVDNTRBXHVDMkI1XHVCMkM4XHVCMkU0OiAke3RhcmdldERpcn1gKTtcbiAgfVxuICBcbiAgY29uc3QgbWFya2Rvd24gPSBjb252ZXJ0VG9NYXJrZG93bihjb252ZXJzYXRpb24pO1xuICBcbiAgLy8gXHVEMzBDXHVDNzdDXHVCQTg1IFx1QzBERFx1QzEzMTogWVlZWS1NTS1ERC1zZXNzaW9uSWQubWRcbiAgY29uc3QgZGF0ZSA9IGNvbnZlcnNhdGlvbi5jcmVhdGVkQXQudG9JU09TdHJpbmcoKS5zcGxpdChcIlRcIilbMF07XG4gIGNvbnN0IGZpbGVuYW1lID0gYCR7ZGF0ZX0tJHtjb252ZXJzYXRpb24uc2Vzc2lvbklkfS5tZGA7XG4gIGNvbnN0IGZpbGVwYXRoID0gcGF0aC5qb2luKHRhcmdldERpciwgZmlsZW5hbWUpO1xuICBcbiAgZnMud3JpdGVGaWxlU3luYyhmaWxlcGF0aCwgbWFya2Rvd24sIFwidXRmLThcIik7XG4gIFxuICByZXR1cm4gZmlsZXBhdGg7XG59XG4iLCAiaW1wb3J0IHsgcmVxdWVzdFVybCB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25UdXJuIH0gZnJvbSBcIi4vY29udmVyc2F0aW9uXCI7XG5pbXBvcnQgdHlwZSB7IE92bFNldHRpbmdzIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IFBST1ZJREVSX1BSRVNFVFMgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG50eXBlIExvZ1dyaXRlciA9IChjb250ZXh0OiBzdHJpbmcsIGRldGFpbDogdW5rbm93bikgPT4gUHJvbWlzZTx2b2lkPjtcblxudHlwZSBTZXR0aW5nc0dldHRlciA9ICgpID0+IE92bFNldHRpbmdzO1xuXG5leHBvcnQgY2xhc3MgT3ZsQXBpQ2xpZW50IHtcbiAgcHJpdmF0ZSByZWFkb25seSBnZXRTZXR0aW5nczogU2V0dGluZ3NHZXR0ZXI7XG4gIHByaXZhdGUgcmVhZG9ubHkgbG9nV3JpdGVyOiBMb2dXcml0ZXI7XG5cbiAgY29uc3RydWN0b3IoZ2V0U2V0dGluZ3M6IFNldHRpbmdzR2V0dGVyLCBsb2dXcml0ZXI/OiBMb2dXcml0ZXIpIHtcbiAgICB0aGlzLmdldFNldHRpbmdzID0gZ2V0U2V0dGluZ3M7XG4gICAgLy8gXHVCODVDXHVBREY4IFx1QUUzMFx1Qjg1RFx1QUUzMFx1Qjk3QyBcdUM4RkNcdUM3ODVcdUJDMUJcdUM5QzAgXHVCQUJCXHVENTVDIFx1QUNCRFx1QzZCMFx1QzVEMFx1QjNDNCBcdUM1NDhcdUM4MDRcdUQ1NThcdUFDOEMgXHVCM0Q5XHVDNzkxXHVENTU4XHVCM0M0XHVCODVEIFx1Q0M5OFx1QjlBQ1x1RDU2OVx1QjJDOFx1QjJFNC5cbiAgICB0aGlzLmxvZ1dyaXRlciA9IGxvZ1dyaXRlciA/PyAoYXN5bmMgKCkgPT4ge30pO1xuICB9XG5cbiAgYXN5bmMgcmVxdWVzdEFzc2lzdGFudFJlcGx5KHR1cm5zOiBDb252ZXJzYXRpb25UdXJuW10pOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IHNldHRpbmdzID0gdGhpcy5nZXRTZXR0aW5ncygpO1xuXG4gICAgaWYgKHNldHRpbmdzLnByb3ZpZGVyID09PSBcImdlbWluaVwiKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0R2VtaW5pUmVwbHkoc2V0dGluZ3MsIHR1cm5zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0T3BlbkFpQ29tcGF0aWJsZVJlcGx5KHNldHRpbmdzLCB0dXJucyk7XG4gIH1cblxuICBhc3luYyByZXF1ZXN0VGl0bGVSZXBseShwcm9tcHQ6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3Qgc2V0dGluZ3MgPSB0aGlzLmdldFNldHRpbmdzKCk7XG4gICAgY29uc3QgdGl0bGVNb2RlbCA9IHNldHRpbmdzLnRpdGxlTW9kZWwudHJpbSgpO1xuICAgIGNvbnN0IG1vZGVsTmFtZSA9IHRpdGxlTW9kZWwgfHwgc2V0dGluZ3MubW9kZWwudHJpbSgpO1xuICAgIGNvbnN0IHR1cm5zOiBDb252ZXJzYXRpb25UdXJuW10gPSBbXG4gICAgICB7XG4gICAgICAgIHJvbGU6IFwidXNlclwiLFxuICAgICAgICBjb250ZW50OiBwcm9tcHQsXG4gICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpXG4gICAgICB9XG4gICAgXTtcblxuICAgIGlmIChzZXR0aW5ncy5wcm92aWRlciA9PT0gXCJnZW1pbmlcIikge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEdlbWluaVJlcGx5KHNldHRpbmdzLCB0dXJucywge1xuICAgICAgICBtb2RlbE5hbWUsXG4gICAgICAgIHN5c3RlbVByb21wdDogXCJcIlxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdE9wZW5BaUNvbXBhdGlibGVSZXBseShzZXR0aW5ncywgdHVybnMsIHtcbiAgICAgIG1vZGVsTmFtZSxcbiAgICAgIHN5c3RlbVByb21wdDogXCJcIlxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyByZXF1ZXN0T3BlbkFpQ29tcGF0aWJsZVJlcGx5KFxuICAgIHNldHRpbmdzOiBPdmxTZXR0aW5ncyxcbiAgICB0dXJuczogQ29udmVyc2F0aW9uVHVybltdLFxuICAgIG9wdGlvbnM/OiB7IG1vZGVsTmFtZT86IHN0cmluZzsgc3lzdGVtUHJvbXB0Pzogc3RyaW5nIHwgbnVsbCB9XG4gICk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgYXBpVXJsID0gc2V0dGluZ3MuYXBpVXJsLnRyaW0oKTtcbiAgICBpZiAoIWFwaVVybCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQVBJIFVSTFx1Qzc0NCBcdUMxMjRcdUM4MTVcdUQ1NzQgXHVDOEZDXHVDMTM4XHVDNjk0LlwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBtb2RlbE5hbWUgPSBvcHRpb25zPy5tb2RlbE5hbWU/LnRyaW0oKSB8fCBzZXR0aW5ncy5tb2RlbC50cmltKCkgfHwgUFJPVklERVJfUFJFU0VUUy5vcGVuYWkubW9kZWw7XG4gICAgaWYgKCFtb2RlbE5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlx1QkFBOFx1QjM3OCBcdUM3NzRcdUI5ODRcdUM3NDQgXHVDNzg1XHVCODI1XHVENTc0IFx1QzhGQ1x1QzEzOFx1QzY5NC5cIik7XG4gICAgfVxuXG4gICAgY29uc3QgbWVzc2FnZXMgPSB0aGlzLmJ1aWxkT3BlbkFpTWVzc2FnZXMoc2V0dGluZ3MsIHR1cm5zLCBvcHRpb25zPy5zeXN0ZW1Qcm9tcHQgPz8gbnVsbCk7XG4gICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgIG1vZGVsOiBtb2RlbE5hbWUsXG4gICAgICBtZXNzYWdlc1xuICAgIH07XG4gICAgY29uc3QgYm9keSA9IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpO1xuXG4gICAgY29uc3QgaGVhZGVyczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgfTtcbiAgICBpZiAoc2V0dGluZ3MuYXBpS2V5LnRyaW0oKSkge1xuICAgICAgaGVhZGVycy5BdXRob3JpemF0aW9uID0gYEJlYXJlciAke3NldHRpbmdzLmFwaUtleS50cmltKCl9YDtcbiAgICB9XG5cbiAgICBsZXQgcmVzcG9uc2U6IHsgdGV4dDogc3RyaW5nOyBqc29uPzogdW5rbm93bjsgc3RhdHVzPzogbnVtYmVyIH07XG4gICAgdHJ5IHtcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgcmVxdWVzdFVybCh7XG4gICAgICAgIHVybDogYXBpVXJsLFxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBoZWFkZXJzLFxuICAgICAgICBib2R5XG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKTtcbiAgICAgIGF3YWl0IHRoaXMubG9nKFwib3BlbmFpLWNvbXBhdGlibGUgcmVxdWVzdCBmYWlsZWRcIiwge1xuICAgICAgICB1cmw6IGFwaVVybCxcbiAgICAgICAgYm9keTogcGF5bG9hZCxcbiAgICAgICAgZXJyb3I6IG1lc3NhZ2VcbiAgICAgIH0pO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBBUEkgXHVDNjk0XHVDQ0FEIFx1QzJFNFx1RDMyODogJHttZXNzYWdlfWApO1xuICAgIH1cblxuICAgIGNvbnN0IHN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICBpZiAoc3RhdHVzICYmIHN0YXR1cyA+PSA0MDApIHtcbiAgICAgIGF3YWl0IHRoaXMubG9nKFwib3BlbmFpLWNvbXBhdGlibGUgcmVzcG9uc2UgZXJyb3JcIiwge1xuICAgICAgICB1cmw6IGFwaVVybCxcbiAgICAgICAgYm9keTogcGF5bG9hZCxcbiAgICAgICAgc3RhdHVzLFxuICAgICAgICByZXNwb25zZTogcmVzcG9uc2UudGV4dFxuICAgICAgfSk7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEFQSSBcdUM2MjRcdUI5NTg6ICR7c3RhdHVzfWApO1xuICAgIH1cblxuICAgIGNvbnN0IGRhdGEgPSB0aGlzLnBhcnNlSnNvblJlc3BvbnNlKHJlc3BvbnNlLnRleHQsIHJlc3BvbnNlLmpzb24pO1xuICAgIGNvbnN0IGNvbnRlbnQgPVxuICAgICAgKGRhdGEgYXMgeyBjaG9pY2VzPzogQXJyYXk8eyBtZXNzYWdlPzogeyBjb250ZW50Pzogc3RyaW5nIH0gfT4gfSk/LmNob2ljZXM/LlswXT8ubWVzc2FnZVxuICAgICAgICA/LmNvbnRlbnQgPz9cbiAgICAgIChkYXRhIGFzIHsgcmVwbHk/OiBzdHJpbmcgfSk/LnJlcGx5ID8/XG4gICAgICAoZGF0YSBhcyB7IGNvbnRlbnQ/OiBzdHJpbmcgfSk/LmNvbnRlbnQgPz9cbiAgICAgIChkYXRhIGFzIHsgbWVzc2FnZT86IHN0cmluZyB9KT8ubWVzc2FnZTtcblxuICAgIGlmICghY29udGVudCB8fCB0eXBlb2YgY29udGVudCAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgYXdhaXQgdGhpcy5sb2coXCJvcGVuYWktY29tcGF0aWJsZSByZXNwb25zZSBpbnZhbGlkXCIsIHsgdXJsOiBhcGlVcmwsIHJlc3BvbnNlOiBkYXRhIH0pO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXHVDNzUxXHVCMkY1IFx1RDYxNVx1QzJERFx1Qzc3NCBcdUM2MkNcdUJDMTRcdUI5NzRcdUM5QzAgXHVDNTRBXHVDMkI1XHVCMkM4XHVCMkU0LlwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29udGVudC50cmltKCk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHJlcXVlc3RHZW1pbmlSZXBseShcbiAgICBzZXR0aW5nczogT3ZsU2V0dGluZ3MsXG4gICAgdHVybnM6IENvbnZlcnNhdGlvblR1cm5bXSxcbiAgICBvcHRpb25zPzogeyBtb2RlbE5hbWU/OiBzdHJpbmc7IHN5c3RlbVByb21wdD86IHN0cmluZyB8IG51bGwgfVxuICApOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IGFwaUtleSA9IHNldHRpbmdzLmFwaUtleS50cmltKCk7XG4gICAgaWYgKCFhcGlLZXkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbWluaSBBUEkgXHVEMEE0XHVCOTdDIFx1Qzc4NVx1QjgyNVx1RDU3NCBcdUM4RkNcdUMxMzhcdUM2OTQuXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IG1vZGVsTmFtZSA9IG9wdGlvbnM/Lm1vZGVsTmFtZT8udHJpbSgpIHx8IHNldHRpbmdzLm1vZGVsLnRyaW0oKSB8fCBQUk9WSURFUl9QUkVTRVRTLmdlbWluaS5tb2RlbDtcbiAgICBpZiAoIW1vZGVsTmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VtaW5pIFx1QkFBOFx1QjM3OCBcdUM3NzRcdUI5ODRcdUM3NDQgXHVDNzg1XHVCODI1XHVENTc0IFx1QzhGQ1x1QzEzOFx1QzY5NC5cIik7XG4gICAgfVxuXG4gICAgY29uc3Qgc3lzdGVtUHJvbXB0ID0gKG9wdGlvbnM/LnN5c3RlbVByb21wdCA/PyBzZXR0aW5ncy5zeXN0ZW1Qcm9tcHQpLnRyaW0oKTtcbiAgICBjb25zdCBjb250ZW50cyA9IHR1cm5zLm1hcCgodHVybikgPT4ge1xuICAgICAgY29uc3Qgcm9sZSA9IHR1cm4ucm9sZSA9PT0gXCJhc3Npc3RhbnRcIiA/IFwibW9kZWxcIiA6IFwidXNlclwiO1xuICAgICAgY29uc3QgdGV4dCA9IHR1cm4ucm9sZSA9PT0gXCJzeXN0ZW1cIiA/IGBbXHVDMkRDXHVDMkE0XHVEMTVDXSAke3R1cm4uY29udGVudH1gIDogdHVybi5jb250ZW50O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcm9sZSxcbiAgICAgICAgcGFydHM6IFt7IHRleHQgfV1cbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICBjb25zdCBwYXlsb2FkOiB7XG4gICAgICBzeXN0ZW1JbnN0cnVjdGlvbj86IHsgcGFydHM6IEFycmF5PHsgdGV4dDogc3RyaW5nIH0+IH07XG4gICAgICBjb250ZW50czogQXJyYXk8eyByb2xlOiBzdHJpbmc7IHBhcnRzOiBBcnJheTx7IHRleHQ6IHN0cmluZyB9PiB9PjtcbiAgICAgIGdlbmVyYXRpb25Db25maWc6IHsgcmVzcG9uc2VNaW1lVHlwZTogc3RyaW5nIH07XG4gICAgfSA9IHtcbiAgICAgIGNvbnRlbnRzLFxuICAgICAgZ2VuZXJhdGlvbkNvbmZpZzoge1xuICAgICAgICByZXNwb25zZU1pbWVUeXBlOiBcInRleHQvcGxhaW5cIlxuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoc3lzdGVtUHJvbXB0KSB7XG4gICAgICBwYXlsb2FkLnN5c3RlbUluc3RydWN0aW9uID0geyBwYXJ0czogW3sgdGV4dDogc3lzdGVtUHJvbXB0IH1dIH07XG4gICAgfVxuXG4gICAgLy8gR2VtaW5pIEFQSSBVUkwgXHVBRDZDXHVDMTMxIChBUEkgXHVEMEE0XHVCOTdDIFx1Q0ZGQ1x1QjlBQyBcdUQzMENcdUI3N0NcdUJCRjhcdUQxMzBcdUI4NUMgXHVDODA0XHVCMkVDKVxuICAgIGNvbnN0IGFwaVVybCA9IGBodHRwczovL2dlbmVyYXRpdmVsYW5ndWFnZS5nb29nbGVhcGlzLmNvbS92MWJldGEvbW9kZWxzLyR7bW9kZWxOYW1lfTpnZW5lcmF0ZUNvbnRlbnQ/a2V5PSR7YXBpS2V5fWA7XG5cbiAgICBjb25zdCBoZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICB9O1xuXG4gICAgbGV0IHJlc3BvbnNlOiB7IHRleHQ6IHN0cmluZzsganNvbj86IHVua25vd247IHN0YXR1cz86IG51bWJlciB9O1xuICAgIHRyeSB7XG4gICAgICByZXNwb25zZSA9IGF3YWl0IHJlcXVlc3RVcmwoe1xuICAgICAgICB1cmw6IGFwaVVybCxcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgaGVhZGVycyxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZClcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpO1xuICAgICAgYXdhaXQgdGhpcy5sb2coXCJnZW1pbmkgcmVxdWVzdCBmYWlsZWRcIiwge1xuICAgICAgICBtb2RlbDogbW9kZWxOYW1lLFxuICAgICAgICBib2R5OiBwYXlsb2FkLFxuICAgICAgICBlcnJvcjogbWVzc2FnZVxuICAgICAgfSk7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEdlbWluaSBcdUM2OTRcdUNDQUQgXHVDMkU0XHVEMzI4OiAke21lc3NhZ2V9YCk7XG4gICAgfVxuXG4gICAgY29uc3Qgc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgIGlmIChzdGF0dXMgJiYgc3RhdHVzID49IDQwMCkge1xuICAgICAgYXdhaXQgdGhpcy5sb2coXCJnZW1pbmkgcmVzcG9uc2UgZXJyb3JcIiwge1xuICAgICAgICBtb2RlbDogbW9kZWxOYW1lLFxuICAgICAgICBib2R5OiBwYXlsb2FkLFxuICAgICAgICBzdGF0dXMsXG4gICAgICAgIHJlc3BvbnNlOiByZXNwb25zZS50ZXh0XG4gICAgICB9KTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgR2VtaW5pIEFQSSBcdUM2MjRcdUI5NTg6ICR7c3RhdHVzfWApO1xuICAgIH1cblxuICAgIGNvbnN0IGRhdGEgPSB0aGlzLnBhcnNlSnNvblJlc3BvbnNlKHJlc3BvbnNlLnRleHQsIHJlc3BvbnNlLmpzb24pO1xuICAgIGNvbnN0IHRleHQgPVxuICAgICAgKGRhdGEgYXMgeyB0ZXh0Pzogc3RyaW5nIH0pPy50ZXh0ID8/XG4gICAgICAoZGF0YSBhcyB7IGNhbmRpZGF0ZXM/OiBBcnJheTx7IGNvbnRlbnQ/OiB7IHBhcnRzPzogQXJyYXk8eyB0ZXh0Pzogc3RyaW5nIH0+IH0gfT4gfSlcbiAgICAgICAgPy5jYW5kaWRhdGVzPy5bMF0/LmNvbnRlbnQ/LnBhcnRzXG4gICAgICAgID8ubWFwKChwYXJ0KSA9PiBwYXJ0LnRleHQgPz8gXCJcIilcbiAgICAgICAgLmpvaW4oXCJcIilcbiAgICAgICAgLnRyaW0oKSA/P1xuICAgICAgXCJcIjtcblxuICAgIGlmICghdGV4dCkge1xuICAgICAgYXdhaXQgdGhpcy5sb2coXCJnZW1pbmkgcmVzcG9uc2UgaW52YWxpZFwiLCB7IG1vZGVsOiBtb2RlbE5hbWUsIHJlc3BvbnNlOiBkYXRhIH0pO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXHVDNzUxXHVCMkY1IFx1RDYxNVx1QzJERFx1Qzc3NCBcdUM2MkNcdUJDMTRcdUI5NzRcdUM5QzAgXHVDNTRBXHVDMkI1XHVCMkM4XHVCMkU0LlwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGV4dDtcbiAgfVxuXG4gIHByaXZhdGUgYnVpbGRPcGVuQWlNZXNzYWdlcyhcbiAgICBzZXR0aW5nczogT3ZsU2V0dGluZ3MsXG4gICAgdHVybnM6IENvbnZlcnNhdGlvblR1cm5bXSxcbiAgICBzeXN0ZW1Qcm9tcHRPdmVycmlkZTogc3RyaW5nIHwgbnVsbFxuICApOiBBcnJheTx7IHJvbGU6IHN0cmluZzsgY29udGVudDogc3RyaW5nIH0+IHtcbiAgICBjb25zdCBtZXNzYWdlcyA9IFtdIGFzIEFycmF5PHsgcm9sZTogc3RyaW5nOyBjb250ZW50OiBzdHJpbmcgfT47XG4gICAgY29uc3Qgc3lzdGVtUHJvbXB0ID0gc3lzdGVtUHJvbXB0T3ZlcnJpZGUgIT09IG51bGxcbiAgICAgID8gc3lzdGVtUHJvbXB0T3ZlcnJpZGUudHJpbSgpXG4gICAgICA6IHNldHRpbmdzLnN5c3RlbVByb21wdC50cmltKCk7XG4gICAgaWYgKHN5c3RlbVByb21wdCkge1xuICAgICAgbWVzc2FnZXMucHVzaCh7IHJvbGU6IFwic3lzdGVtXCIsIGNvbnRlbnQ6IHN5c3RlbVByb21wdCB9KTtcbiAgICB9XG4gICAgZm9yIChjb25zdCB0dXJuIG9mIHR1cm5zKSB7XG4gICAgICBtZXNzYWdlcy5wdXNoKHsgcm9sZTogdHVybi5yb2xlLCBjb250ZW50OiB0dXJuLmNvbnRlbnQgfSk7XG4gICAgfVxuICAgIHJldHVybiBtZXNzYWdlcztcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VKc29uUmVzcG9uc2UodGV4dDogc3RyaW5nLCBqc29uPzogdW5rbm93bik6IHVua25vd24ge1xuICAgIGlmIChqc29uKSB7XG4gICAgICByZXR1cm4ganNvbjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKHRleHQpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQVBJIFx1Qzc1MVx1QjJGNVx1Qzc0NCBcdUQ1NzRcdUMxMURcdUQ1NjAgXHVDMjE4IFx1QzVDNlx1QzJCNVx1QjJDOFx1QjJFNC5cIik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBsb2coY29udGV4dDogc3RyaW5nLCBkZXRhaWw6IHVua25vd24pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLmxvZ1dyaXRlcihjb250ZXh0LCBkZXRhaWwpO1xuICB9XG59XG4iLCAiZXhwb3J0IHR5cGUgQXBpUHJvdmlkZXIgPSBcImdlbWluaVwiIHwgXCJvcGVuYWlcIiB8IFwib2xsYW1hXCIgfCBcImN1c3RvbVwiO1xuZXhwb3J0IHR5cGUgRW1iZWRkaW5nUHJvdmlkZXIgPSBcImdlbWluaVwiIHwgXCJvcGVuYWlcIiB8IFwibG9jYWxcIiB8IFwiY3VzdG9tXCI7XG5cbmV4cG9ydCB0eXBlIE92bFNldHRpbmdzID0ge1xuICBwcm92aWRlcjogQXBpUHJvdmlkZXI7XG4gIGFwaVVybDogc3RyaW5nO1xuICBhcGlLZXk6IHN0cmluZztcbiAgbW9kZWw6IHN0cmluZztcbiAgdGl0bGVNb2RlbDogc3RyaW5nO1xuICBzeXN0ZW1Qcm9tcHQ6IHN0cmluZztcbiAgZGVmYXVsdE91dHB1dEZvbGRlcjogc3RyaW5nO1xuICAvLyBcdUM3NzhcdUIzNzFcdUMyRjEgXHVDMTI0XHVDODE1XG4gIGluZGV4aW5nRW5hYmxlZDogYm9vbGVhbjtcbiAgY2h1bmtTaXplOiBudW1iZXI7XG4gIGNodW5rT3ZlcmxhcDogbnVtYmVyO1xuICB0b3BLOiBudW1iZXI7XG4gIC8vIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUMxMjRcdUM4MTVcbiAgZW1iZWRkaW5nUHJvdmlkZXI6IEVtYmVkZGluZ1Byb3ZpZGVyO1xuICBlbWJlZGRpbmdBcGlLZXk6IHN0cmluZztcbiAgZW1iZWRkaW5nTW9kZWw6IHN0cmluZztcbiAgZW1iZWRkaW5nQXBpVXJsOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY29uc3QgUFJPVklERVJfUFJFU0VUUzogUmVjb3JkPEFwaVByb3ZpZGVyLCB7IGFwaVVybDogc3RyaW5nOyBtb2RlbDogc3RyaW5nIH0+ID0ge1xuICBnZW1pbmk6IHtcbiAgICBhcGlVcmw6IFwiaHR0cHM6Ly9nZW5lcmF0aXZlbGFuZ3VhZ2UuZ29vZ2xlYXBpcy5jb20vdjFiZXRhL21vZGVscy9nZW1pbmktMy4wLXByZXZpZXc6Z2VuZXJhdGVDb250ZW50XCIsXG4gICAgbW9kZWw6IFwiZ2VtaW5pLTMuMC1wcmV2aWV3XCJcbiAgfSxcbiAgb3BlbmFpOiB7XG4gICAgYXBpVXJsOiBcImh0dHBzOi8vYXBpLm9wZW5haS5jb20vdjEvY2hhdC9jb21wbGV0aW9uc1wiLFxuICAgIG1vZGVsOiBcImdwdC00by1taW5pXCJcbiAgfSxcbiAgb2xsYW1hOiB7XG4gICAgYXBpVXJsOiBcImh0dHA6Ly9sb2NhbGhvc3Q6MTE0MzQvdjEvY2hhdC9jb21wbGV0aW9uc1wiLFxuICAgIG1vZGVsOiBcImxsYW1hMy4xXCJcbiAgfSxcbiAgY3VzdG9tOiB7XG4gICAgYXBpVXJsOiBcIlwiLFxuICAgIG1vZGVsOiBcIlwiXG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBFTUJFRERJTkdfUFJFU0VUUzogUmVjb3JkPEVtYmVkZGluZ1Byb3ZpZGVyLCB7IG1vZGVsOiBzdHJpbmc7IGFwaVVybD86IHN0cmluZyB9PiA9IHtcbiAgZ2VtaW5pOiB7XG4gICAgbW9kZWw6IFwidGV4dC1lbWJlZGRpbmctMDA0XCIsXG4gICAgYXBpVXJsOiBcImh0dHBzOi8vZ2VuZXJhdGl2ZWxhbmd1YWdlLmdvb2dsZWFwaXMuY29tL3YxYmV0YS9tb2RlbHNcIlxuICB9LFxuICBvcGVuYWk6IHtcbiAgICBtb2RlbDogXCJ0ZXh0LWVtYmVkZGluZy0zLXNtYWxsXCIsXG4gICAgYXBpVXJsOiBcImh0dHBzOi8vYXBpLm9wZW5haS5jb20vdjEvZW1iZWRkaW5nc1wiXG4gIH0sXG4gIGxvY2FsOiB7XG4gICAgbW9kZWw6IFwiWGVub3ZhL2FsbC1NaW5pTE0tTDYtdjJcIlxuICB9LFxuICBjdXN0b206IHtcbiAgICBtb2RlbDogXCJcIlxuICB9XG59O1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9TRVRUSU5HUzogT3ZsU2V0dGluZ3MgPSB7XG4gIHByb3ZpZGVyOiBcImdlbWluaVwiLFxuICBhcGlVcmw6IFBST1ZJREVSX1BSRVNFVFMuZ2VtaW5pLmFwaVVybCxcbiAgYXBpS2V5OiBcIlwiLFxuICBtb2RlbDogUFJPVklERVJfUFJFU0VUUy5nZW1pbmkubW9kZWwsXG4gIHRpdGxlTW9kZWw6IFwiXCIsXG4gIHN5c3RlbVByb21wdDogXCJcIixcbiAgZGVmYXVsdE91dHB1dEZvbGRlcjogXCJcIixcbiAgLy8gXHVDNzc4XHVCMzcxXHVDMkYxIFx1QUUzMFx1QkNGOCBcdUMxMjRcdUM4MTVcbiAgaW5kZXhpbmdFbmFibGVkOiBmYWxzZSxcbiAgY2h1bmtTaXplOiA0MDAsXG4gIGNodW5rT3ZlcmxhcDogNTAsXG4gIHRvcEs6IDgsXG4gIC8vIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUFFMzBcdUJDRjggXHVDMTI0XHVDODE1IChHZW1pbmkpXG4gIGVtYmVkZGluZ1Byb3ZpZGVyOiBcImdlbWluaVwiLFxuICBlbWJlZGRpbmdBcGlLZXk6IFwiXCIsXG4gIGVtYmVkZGluZ01vZGVsOiBFTUJFRERJTkdfUFJFU0VUUy5nZW1pbmkubW9kZWwsXG4gIGVtYmVkZGluZ0FwaVVybDogRU1CRURESU5HX1BSRVNFVFMuZ2VtaW5pLmFwaVVybCB8fCBcIlwiLFxufTtcbiIsICJpbXBvcnQgdHlwZSB7IEFwcCwgUGx1Z2luTWFuaWZlc3QgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB7IG5vcm1hbGl6ZVBhdGggfSBmcm9tIFwib2JzaWRpYW5cIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBsdWdpbkxvZ1BhdGgoYXBwOiBBcHAsIG1hbmlmZXN0PzogUGx1Z2luTWFuaWZlc3QpOiBzdHJpbmcge1xuICBjb25zdCBwbHVnaW5JZCA9IG1hbmlmZXN0Py5pZCA/PyBcIm9ic2lkaWFuLXZhdWx0LWxsbVwiO1xuICByZXR1cm4gbm9ybWFsaXplUGF0aChgJHthcHAudmF1bHQuY29uZmlnRGlyfS9wbHVnaW5zLyR7cGx1Z2luSWR9L2xvZy50eHRgKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFwcGVuZEVycm9yTG9nKFxuICBhcHA6IEFwcCxcbiAgbWFuaWZlc3Q6IFBsdWdpbk1hbmlmZXN0IHwgdW5kZWZpbmVkLFxuICBjb250ZXh0OiBzdHJpbmcsXG4gIGRldGFpbDogdW5rbm93blxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGxvZ1BhdGggPSBnZXRQbHVnaW5Mb2dQYXRoKGFwcCwgbWFuaWZlc3QpO1xuICBjb25zdCB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gIGNvbnN0IGRldGFpbFRleHQgPSB0b1NhZmVTdHJpbmcoZGV0YWlsKTtcbiAgY29uc3QgZW50cnkgPSBgXFxuWyR7dGltZXN0YW1wfV0gJHtjb250ZXh0fVxcbiR7ZGV0YWlsVGV4dH1cXG5gO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgZXhpc3RzID0gYXdhaXQgYXBwLnZhdWx0LmFkYXB0ZXIuZXhpc3RzKGxvZ1BhdGgpO1xuICAgIGlmIChleGlzdHMpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnQgPSBhd2FpdCBhcHAudmF1bHQuYWRhcHRlci5yZWFkKGxvZ1BhdGgpO1xuICAgICAgYXdhaXQgYXBwLnZhdWx0LmFkYXB0ZXIud3JpdGUobG9nUGF0aCwgYCR7ZW50cnl9JHtjdXJyZW50fWApO1xuICAgIH0gZWxzZSB7XG4gICAgICBhd2FpdCBhcHAudmF1bHQuYWRhcHRlci53cml0ZShsb2dQYXRoLCBlbnRyeS50cmltU3RhcnQoKSk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gd3JpdGUgcGx1Z2luIGxvZ1wiLCBlcnJvcik7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBFbWJlZGRpbmdMb2dEYXRhIHtcbiAgaW5wdXRUZXh0OiBzdHJpbmc7XG4gIGVtYmVkZGluZzogbnVtYmVyW107XG4gIHNpbWlsYXJpdHk/OiBudW1iZXI7IC8vIFx1Qzc3NFx1QzgwNCBcdUM3ODRcdUJDQTBcdUI1MjlcdUFDRkNcdUM3NTggXHVDNzIwXHVDMEFDXHVCM0M0XG4gIHByZXZpb3VzSW5wdXRUZXh0Pzogc3RyaW5nO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYXBwZW5kRW1iZWRkaW5nTG9nKFxuICBhcHA6IEFwcCxcbiAgbWFuaWZlc3Q6IFBsdWdpbk1hbmlmZXN0IHwgdW5kZWZpbmVkLFxuICBkYXRhOiBFbWJlZGRpbmdMb2dEYXRhXG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgbG9nUGF0aCA9IGdldFBsdWdpbkxvZ1BhdGgoYXBwLCBtYW5pZmVzdCk7XG4gIGNvbnN0IHRpbWVzdGFtcCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcbiAgXG4gIC8vIFx1Qzc4NVx1QjgyNSBcdUQxNERcdUMyQTRcdUQyQjggXHVDODA0XHVDQ0I0IChcdUFDMUNcdUQ1ODkgXHVDODFDXHVBQzcwKVxuICBjb25zdCBpbnB1dFRleHQgPSBkYXRhLmlucHV0VGV4dC5yZXBsYWNlKC9cXG4vZywgJyAnKTtcbiAgXG4gIC8vIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUJDQTFcdUQxMzBcdUI5N0MgXHVBQzA0XHVCMkU4XHVENzg4IFx1RDQ1Q1x1RDYwNFxuICBjb25zdCBlbWJlZGRpbmdJbmZvID0gYFtcdUJDQTFcdUQxMzAgXHVDQzI4XHVDNkQwOiAke2RhdGEuZW1iZWRkaW5nLmxlbmd0aH1dYDtcbiAgXG4gIC8vIFx1QzcyMFx1QzBBQ1x1QjNDNCBcdUM4MTVcdUJDRjRcbiAgbGV0IHNpbWlsYXJpdHlJbmZvID0gJyc7XG4gIGlmIChkYXRhLnNpbWlsYXJpdHkgIT09IHVuZGVmaW5lZCkge1xuICAgIHNpbWlsYXJpdHlJbmZvID0gYCB8IFx1Qzc3NFx1QzgwNCBcdUM3ODRcdUJDQTBcdUI1MjlcdUFDRkNcdUM3NTggXHVDNzIwXHVDMEFDXHVCM0M0OiAkeyhkYXRhLnNpbWlsYXJpdHkgKiAxMDApLnRvRml4ZWQoMil9JWA7XG4gIH1cbiAgXG4gIC8vIFx1Qjg1Q1x1QURGOCBcdUM1RDRcdUQyQjhcdUI5QUNcbiAgbGV0IGVudHJ5ID0gYFxcblske3RpbWVzdGFtcH1dIFtcdUM3ODRcdUJDQTBcdUI1MjldIFx1Qzc4NVx1QjgyNTogXCIke2lucHV0VGV4dH1cIiAke2VtYmVkZGluZ0luZm99JHtzaW1pbGFyaXR5SW5mb31cXG5gO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgZXhpc3RzID0gYXdhaXQgYXBwLnZhdWx0LmFkYXB0ZXIuZXhpc3RzKGxvZ1BhdGgpO1xuICAgIGlmIChleGlzdHMpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnQgPSBhd2FpdCBhcHAudmF1bHQuYWRhcHRlci5yZWFkKGxvZ1BhdGgpO1xuICAgICAgYXdhaXQgYXBwLnZhdWx0LmFkYXB0ZXIud3JpdGUobG9nUGF0aCwgYCR7ZW50cnl9JHtjdXJyZW50fWApO1xuICAgIH0gZWxzZSB7XG4gICAgICBhd2FpdCBhcHAudmF1bHQuYWRhcHRlci53cml0ZShsb2dQYXRoLCBlbnRyeS50cmltU3RhcnQoKSk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1tcdUM3ODRcdUJDQTBcdUI1MjkgXHVCODVDXHVBREY4XSBcdUQzMENcdUM3N0MgXHVDNEYwXHVBRTMwIFx1QzJFNFx1RDMyODonLCBlcnJvcik7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFwcGVuZFRvcGljU2VwYXJhdGlvbkZhaWx1cmVMb2coXG4gIGFwcDogQXBwLFxuICBtYW5pZmVzdDogUGx1Z2luTWFuaWZlc3QgfCB1bmRlZmluZWQsXG4gIHJlYXNvbjogc3RyaW5nLFxuICBkZXRhaWxzPzogdW5rbm93blxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGxvZ1BhdGggPSBnZXRQbHVnaW5Mb2dQYXRoKGFwcCwgbWFuaWZlc3QpO1xuICBjb25zdCB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gIFxuICBsZXQgZW50cnkgPSBgXFxuWyR7dGltZXN0YW1wfV0gW1x1QzhGQ1x1QzgxQyBcdUJEODRcdUI5QUMgXHVDMkU0XHVEMzI4XSBcdUM3NzRcdUM3MjA6ICR7cmVhc29ufVxcbmA7XG4gIFxuICBpZiAoZGV0YWlscykge1xuICAgIGVudHJ5ICs9IGBcdUMwQzFcdUMxMzg6ICR7dG9TYWZlU3RyaW5nKGRldGFpbHMpfVxcbmA7XG4gIH1cbiAgXG4gIGVudHJ5ICs9IFwiLS0tXFxuXCI7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBleGlzdHMgPSBhd2FpdCBhcHAudmF1bHQuYWRhcHRlci5leGlzdHMobG9nUGF0aCk7XG4gICAgaWYgKGV4aXN0cykge1xuICAgICAgY29uc3QgY3VycmVudCA9IGF3YWl0IGFwcC52YXVsdC5hZGFwdGVyLnJlYWQobG9nUGF0aCk7XG4gICAgICBhd2FpdCBhcHAudmF1bHQuYWRhcHRlci53cml0ZShsb2dQYXRoLCBgJHtlbnRyeX0ke2N1cnJlbnR9YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF3YWl0IGFwcC52YXVsdC5hZGFwdGVyLndyaXRlKGxvZ1BhdGgsIGVudHJ5LnRyaW1TdGFydCgpKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignW1x1QzhGQ1x1QzgxQyBcdUJEODRcdUI5QUMgXHVDMkU0XHVEMzI4IFx1Qjg1Q1x1QURGOF0gXHVEMzBDXHVDNzdDIFx1QzRGMFx1QUUzMCBcdUMyRTRcdUQzMjg6JywgZXJyb3IpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHRvU2FmZVN0cmluZyhkZXRhaWw6IHVua25vd24pOiBzdHJpbmcge1xuICBpZiAoZGV0YWlsID09PSBudWxsIHx8IGRldGFpbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIFN0cmluZyhkZXRhaWwpO1xuICB9XG4gIGlmICh0eXBlb2YgZGV0YWlsID09PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIGRldGFpbDtcbiAgfVxuICBpZiAoZGV0YWlsIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICByZXR1cm4gZGV0YWlsLnN0YWNrID8/IGRldGFpbC5tZXNzYWdlO1xuICB9XG4gIHRyeSB7XG4gICAgY29uc3Qgc2VlbiA9IG5ldyBXZWFrU2V0PG9iamVjdD4oKTtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoXG4gICAgICBkZXRhaWwsXG4gICAgICAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgaWYgKHNlZW4uaGFzKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIFwiW1x1QzIxQ1x1RDY1OCBcdUNDMzhcdUM4NzBdXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNlZW4uYWRkKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9LFxuICAgICAgMlxuICAgICk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc3QgbWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKTtcbiAgICByZXR1cm4gYFx1QzlDMVx1QjgyQ1x1RDY1NCBcdUMyRTRcdUQzMjg6ICR7bWVzc2FnZX1gO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgTW9kYWwgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB0eXBlIHsgUGx1Z2luIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5cbmV4cG9ydCB0eXBlIFNhdmVDb252ZXJzYXRpb25Gb3JtID0ge1xuICBpbnB1dFBhdGg6IHN0cmluZztcbiAgc2Vzc2lvbklkOiBzdHJpbmc7XG4gIG91dHB1dEZvbGRlcjogc3RyaW5nO1xufTtcblxuZXhwb3J0IGNsYXNzIFNhdmVDb252ZXJzYXRpb25Nb2RhbCBleHRlbmRzIE1vZGFsIHtcbiAgcHJpdmF0ZSByZWFkb25seSBvblN1Ym1pdDogKHZhbHVlOiBTYXZlQ29udmVyc2F0aW9uRm9ybSkgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3RvcihwbHVnaW46IFBsdWdpbiwgb25TdWJtaXQ6ICh2YWx1ZTogU2F2ZUNvbnZlcnNhdGlvbkZvcm0pID0+IHZvaWQpIHtcbiAgICBzdXBlcihwbHVnaW4uYXBwKTtcbiAgICB0aGlzLm9uU3VibWl0ID0gb25TdWJtaXQ7XG4gIH1cblxuICBvbk9wZW4oKTogdm9pZCB7XG4gICAgY29uc3QgeyBjb250ZW50RWwgfSA9IHRoaXM7XG4gICAgY29udGVudEVsLmVtcHR5KCk7XG5cbiAgICBjb250ZW50RWwuY3JlYXRlRWwoXCJoMlwiLCB7IHRleHQ6IFwiXHVCMzAwXHVENjU0IEpTT04gXHVDODAwXHVDN0E1XCIgfSk7XG5cbiAgICBjb25zdCBpbnB1dFBhdGhFbCA9IGNvbnRlbnRFbC5jcmVhdGVFbChcImlucHV0XCIsIHsgdHlwZTogXCJ0ZXh0XCIgfSk7XG4gICAgaW5wdXRQYXRoRWwucGxhY2Vob2xkZXIgPSBcIkpTT04gXHVEMzBDXHVDNzdDIFx1QUNCRFx1Qjg1QyAoXHVCQ0ZDXHVEMkI4IFx1QUUzMFx1QzkwMClcIjtcblxuICAgIGNvbnN0IHNlc3Npb25JZEVsID0gY29udGVudEVsLmNyZWF0ZUVsKFwiaW5wdXRcIiwgeyB0eXBlOiBcInRleHRcIiB9KTtcbiAgICBzZXNzaW9uSWRFbC5wbGFjZWhvbGRlciA9IFwiXHVDMTM4XHVDMTU4IElEXCI7XG5cbiAgICBjb25zdCBvdXRwdXRGb2xkZXJFbCA9IGNvbnRlbnRFbC5jcmVhdGVFbChcImlucHV0XCIsIHsgdHlwZTogXCJ0ZXh0XCIgfSk7XG4gICAgb3V0cHV0Rm9sZGVyRWwucGxhY2Vob2xkZXIgPSBcIlx1QzgwMFx1QzdBNSBcdUQzRjRcdUIzNTQgKFx1QzEyMFx1RDBERCwgXHVCQ0ZDXHVEMkI4IFx1QUUzMFx1QzkwMClcIjtcblxuICAgIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGNvbnRlbnRFbC5jcmVhdGVFbChcImJ1dHRvblwiLCB7IHRleHQ6IFwiXHVDODAwXHVDN0E1XCIgfSk7XG4gICAgc3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLm9uU3VibWl0KHtcbiAgICAgICAgaW5wdXRQYXRoOiBpbnB1dFBhdGhFbC52YWx1ZS50cmltKCksXG4gICAgICAgIHNlc3Npb25JZDogc2Vzc2lvbklkRWwudmFsdWUudHJpbSgpLFxuICAgICAgICBvdXRwdXRGb2xkZXI6IG91dHB1dEZvbGRlckVsLnZhbHVlLnRyaW0oKVxuICAgICAgfSk7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfSk7XG4gIH1cbn1cbiIsICJpbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvblR1cm4gfSBmcm9tIFwiLi9jb252ZXJzYXRpb25cIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVHVybnMoY29udGVudDogc3RyaW5nKTogQ29udmVyc2F0aW9uVHVybltdIHtcbiAgbGV0IGRhdGE6IHVua25vd247XG4gIHRyeSB7XG4gICAgZGF0YSA9IEpTT04ucGFyc2UoY29udGVudCk7XG4gIH0gY2F0Y2gge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkpTT04gXHVENjE1XHVDMkREXHVDNzc0IFx1QzYyQ1x1QkMxNFx1Qjk3NFx1QzlDMCBcdUM1NEFcdUMyQjVcdUIyQzhcdUIyRTQuXCIpO1xuICB9XG5cbiAgaWYgKCFBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSlNPTlx1Qzc0MCBcdUJDMzBcdUM1RjRcdUM3NzRcdUM1QjRcdUM1N0MgXHVENTY5XHVCMkM4XHVCMkU0LlwiKTtcbiAgfVxuXG4gIHJldHVybiBkYXRhLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICBpZiAoIWl0ZW0gfHwgdHlwZW9mIGl0ZW0gIT09IFwib2JqZWN0XCIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgXHVDNzk4XHVCQUJCXHVCNDFDIFx1RDU2RFx1QkFBOTogJHtpbmRleCArIDF9XHVCQzg4XHVDOUY4YCk7XG4gICAgfVxuXG4gICAgY29uc3Qgcm9sZSA9IChpdGVtIGFzIHsgcm9sZT86IHN0cmluZyB9KS5yb2xlO1xuICAgIGNvbnN0IGNvbnRlbnRWYWx1ZSA9IChpdGVtIGFzIHsgY29udGVudD86IHN0cmluZyB9KS5jb250ZW50O1xuICAgIGNvbnN0IHRpbWVzdGFtcFZhbHVlID0gKGl0ZW0gYXMgeyB0aW1lc3RhbXA/OiBzdHJpbmcgfSkudGltZXN0YW1wO1xuXG4gICAgaWYgKHJvbGUgIT09IFwidXNlclwiICYmIHJvbGUgIT09IFwiYXNzaXN0YW50XCIgJiYgcm9sZSAhPT0gXCJzeXN0ZW1cIikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGByb2xlXHVDNzc0IFx1QzYyQ1x1QkMxNFx1Qjk3NFx1QzlDMCBcdUM1NEFcdUMyQjVcdUIyQzhcdUIyRTQ6ICR7aW5kZXggKyAxfVx1QkM4OFx1QzlGOGApO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGNvbnRlbnRWYWx1ZSAhPT0gXCJzdHJpbmdcIiB8fCAhY29udGVudFZhbHVlLnRyaW0oKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBjb250ZW50XHVBQzAwIFx1QzYyQ1x1QkMxNFx1Qjk3NFx1QzlDMCBcdUM1NEFcdUMyQjVcdUIyQzhcdUIyRTQ6ICR7aW5kZXggKyAxfVx1QkM4OFx1QzlGOGApO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICByb2xlLFxuICAgICAgY29udGVudDogY29udGVudFZhbHVlLFxuICAgICAgdGltZXN0YW1wOiB0aW1lc3RhbXBWYWx1ZVxuICAgIH07XG4gIH0pO1xufVxuIiwgImltcG9ydCB7IE5vdGljZSwgUGx1Z2luLCBQbHVnaW5TZXR0aW5nVGFiLCBTZXR0aW5nLCByZXF1ZXN0VXJsIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgdHlwZSB7IEFwaVByb3ZpZGVyLCBPdmxTZXR0aW5ncywgRW1iZWRkaW5nUHJvdmlkZXIgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgUFJPVklERVJfUFJFU0VUUywgRU1CRURESU5HX1BSRVNFVFMgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQgdHlwZSBTZXR0aW5nc0hvc3QgPSBQbHVnaW4gJiB7XG4gIHNldHRpbmdzOiBPdmxTZXR0aW5ncztcbiAgc2F2ZVNldHRpbmdzOiAoKSA9PiBQcm9taXNlPHZvaWQ+O1xuICBpbmRleFZhdWx0QWxsOiAoKSA9PiBQcm9taXNlPHZvaWQ+O1xuICBpbmRleE5ld0ZpbGVzT25seTogKCkgPT4gUHJvbWlzZTx2b2lkPjtcbn07XG5cbmV4cG9ydCBjbGFzcyBPdmxTZXR0aW5nVGFiIGV4dGVuZHMgUGx1Z2luU2V0dGluZ1RhYiB7XG4gIHByaXZhdGUgcmVhZG9ubHkgcGx1Z2luOiBTZXR0aW5nc0hvc3Q7XG4gIHByaXZhdGUgZ2VtaW5pTW9kZWxzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHBsdWdpbjogU2V0dGluZ3NIb3N0KSB7XG4gICAgc3VwZXIocGx1Z2luLmFwcCwgcGx1Z2luKTtcbiAgICB0aGlzLnBsdWdpbiA9IHBsdWdpbjtcbiAgfVxuXG4gIGRpc3BsYXkoKTogdm9pZCB7XG4gICAgY29uc3QgeyBjb250YWluZXJFbCB9ID0gdGhpcztcbiAgICBjb250YWluZXJFbC5lbXB0eSgpO1xuXG4gICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJoMlwiLCB7IHRleHQ6IFwiT1ZMIFx1QzEyNFx1QzgxNVwiIH0pO1xuXG4gICAgbGV0IGFwaVVybElucHV0OiB7IHNldFZhbHVlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZCB9IHwgbnVsbCA9IG51bGw7XG4gICAgbGV0IG1vZGVsSW5wdXQ6IHsgc2V0VmFsdWU6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkIH0gfCBudWxsID0gbnVsbDtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJBUEkgXHVDODFDXHVBQ0Y1XHVDMEFDXCIpXG4gICAgICAuc2V0RGVzYyhcIlx1QzBBQ1x1QzZBOVx1RDU2MCBBUEkgXHVDODFDXHVBQ0Y1XHVDMEFDXHVCOTdDIFx1QzEyMFx1RDBERFx1RDU1OFx1QzEzOFx1QzY5NC4gKE9sbGFtYSBcdUQzRUNcdUQ1NjgpXCIpXG4gICAgICAuYWRkRHJvcGRvd24oKGRyb3Bkb3duKSA9PiB7XG4gICAgICAgIGRyb3Bkb3duXG4gICAgICAgICAgLmFkZE9wdGlvbnMoe1xuICAgICAgICAgICAgZ2VtaW5pOiBcIkdvb2dsZSBHZW1pbmlcIixcbiAgICAgICAgICAgIG9wZW5haTogXCJPcGVuQUkgXHVENjM4XHVENjU4XCIsXG4gICAgICAgICAgICBvbGxhbWE6IFwiT2xsYW1hIChcdUI4NUNcdUNFRUMpXCIsXG4gICAgICAgICAgICBjdXN0b206IFwiXHVDMEFDXHVDNkE5XHVDNzkwIFx1QzlDMFx1QzgxNVwiXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MucHJvdmlkZXIpXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSB2YWx1ZSBhcyBBcGlQcm92aWRlcjtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnByb3ZpZGVyID0gcHJvdmlkZXI7XG4gICAgICAgICAgICBjb25zdCBwcmVzZXQgPSBQUk9WSURFUl9QUkVTRVRTW3Byb3ZpZGVyXTtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmFwaVVybCA9IHByZXNldC5hcGlVcmw7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5tb2RlbCA9IHByZXNldC5tb2RlbDtcbiAgICAgICAgICAgIGFwaVVybElucHV0Py5zZXRWYWx1ZShwcmVzZXQuYXBpVXJsKTtcbiAgICAgICAgICAgIG1vZGVsSW5wdXQ/LnNldFZhbHVlKHByZXNldC5tb2RlbCk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiQVBJIFVSTFwiKVxuICAgICAgLnNldERlc2MoXCJcdUM4MUNcdUFDRjVcdUMwQUNcdUJDQzQgXHVDQzQ0XHVEMzA1IFx1QzVENFx1QjREQ1x1RDNFQ1x1Qzc3OFx1RDJCOCBVUkxcIilcbiAgICAgIC5hZGRUZXh0KCh0ZXh0KSA9PiB7XG4gICAgICAgIGFwaVVybElucHV0ID0gdGV4dDtcbiAgICAgICAgdGV4dFxuICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcImh0dHA6Ly9sb2NhbGhvc3Q6MTE0MzQvdjEvY2hhdC9jb21wbGV0aW9uc1wiKVxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5hcGlVcmwpXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuYXBpVXJsID0gdmFsdWUudHJpbSgpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJBUEkgXHVEMEE0XCIpXG4gICAgICAuc2V0RGVzYyhcIlx1RDU0NFx1QzY5NFx1RDU1QyBcdUFDQkRcdUM2QjAgQmVhcmVyIFx1RDFBMFx1RDA3MCBcdUI2MTBcdUIyOTQgXHVDODFDXHVBQ0Y1XHVDMEFDIFx1RDBBNFx1Qjk3QyBcdUM3ODVcdUI4MjVcdUQ1NThcdUMxMzhcdUM2OTQuXCIpXG4gICAgICAuYWRkVGV4dCgodGV4dCkgPT5cbiAgICAgICAgdGV4dFxuICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcIlx1QzEyMFx1RDBERFwiKVxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5hcGlLZXkpXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuYXBpS2V5ID0gdmFsdWU7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICB9KVxuICAgICAgKTtcblxuICAgIGlmICh0aGlzLnBsdWdpbi5zZXR0aW5ncy5wcm92aWRlciA9PT0gXCJnZW1pbmlcIikge1xuICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgIC5zZXROYW1lKFwiR2VtaW5pIFx1QkFBOFx1QjM3OCBcdUJBQTlcdUI4NURcIilcbiAgICAgICAgLnNldERlc2MoXCJHb29nbGVcdUM1RDBcdUMxMUMgXHVDODFDXHVBQ0Y1XHVENTU4XHVCMjk0IFx1QkFBOFx1QjM3OFx1Qzc0NCBcdUJEODhcdUI3RUNcdUM2NDAgXHVDMTIwXHVEMEREXHVENTYwIFx1QzIxOCBcdUM3ODhcdUMyQjVcdUIyQzhcdUIyRTQuXCIpXG4gICAgICAgIC5hZGRCdXR0b24oKGJ1dHRvbikgPT4ge1xuICAgICAgICAgIGJ1dHRvbi5zZXRCdXR0b25UZXh0KFwiXHVCQUE5XHVCODVEIFx1QkQ4OFx1QjdFQ1x1QzYyNFx1QUUzMFwiKS5vbkNsaWNrKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubG9hZEdlbWluaU1vZGVscygpO1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5KCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICBpZiAodGhpcy5nZW1pbmlNb2RlbHMubGVuZ3RoID4gMCkge1xuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAuc2V0TmFtZShcIkdlbWluaSBcdUJBQThcdUIzNzggXHVDMTIwXHVEMEREXCIpXG4gICAgICAgICAgLnNldERlc2MoXCJcdUJBQTlcdUI4NURcdUM1RDAgXHVDNUM2XHVCMjk0IFx1QkFBOFx1QjM3OFx1Qzc0MCBcdUM1NDRcdUI3OThcdUM1RDBcdUMxMUMgXHVDOUMxXHVDODExIFx1Qzc4NVx1QjgyNVx1RDU1OFx1QzEzOFx1QzY5NC5cIilcbiAgICAgICAgICAuYWRkRHJvcGRvd24oKGRyb3Bkb3duKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5nZW1pbmlNb2RlbHMucmVkdWNlPFJlY29yZDxzdHJpbmcsIHN0cmluZz4+KFxuICAgICAgICAgICAgICAoYWNjLCBuYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgYWNjW25hbWVdID0gbmFtZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7fVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGRyb3Bkb3duXG4gICAgICAgICAgICAgIC5hZGRPcHRpb25zKG9wdGlvbnMpXG4gICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5tb2RlbClcbiAgICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLm1vZGVsID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgbW9kZWxJbnB1dD8uc2V0VmFsdWUodmFsdWUpO1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiXHVCQUE4XHVCMzc4XCIpXG4gICAgICAuc2V0RGVzYyhcIlx1QzgxQ1x1QUNGNVx1QzBBQ1x1QkNDNCBcdUJBQThcdUIzNzggXHVDNzc0XHVCOTg0IChcdUM5QzFcdUM4MTEgXHVDNzg1XHVCODI1IFx1QUMwMFx1QjJBNSlcIilcbiAgICAgIC5hZGRUZXh0KCh0ZXh0KSA9PiB7XG4gICAgICAgIG1vZGVsSW5wdXQgPSB0ZXh0O1xuICAgICAgICB0ZXh0XG4gICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiZ3B0LTRvLW1pbmlcIilcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MubW9kZWwpXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MubW9kZWwgPSB2YWx1ZS50cmltKCk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIlx1QzgxQ1x1QkFBOSBcdUMwRERcdUMxMzEgXHVCQUE4XHVCMzc4XCIpXG4gICAgICAuc2V0RGVzYyhcIlx1QzEzOFx1QzE1OC9cdUM4MDBcdUM3QTUgXHVDODFDXHVCQUE5IFx1QzBERFx1QzEzMVx1QzVEMCBcdUMwQUNcdUM2QTlcdUQ1NjAgXHVCQUE4XHVCMzc4IChcdUJFNDRcdUM1QjRcdUM3ODhcdUM3M0NcdUJBNzQgXHVBRTMwXHVCQ0Y4IFx1QkFBOFx1QjM3OCBcdUMwQUNcdUM2QTkpXCIpXG4gICAgICAuYWRkVGV4dCgodGV4dCkgPT5cbiAgICAgICAgdGV4dFxuICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcImdwdC00by1taW5pXCIpXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnRpdGxlTW9kZWwpXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MudGl0bGVNb2RlbCA9IHZhbHVlLnRyaW0oKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIlx1QzJEQ1x1QzJBNFx1RDE1QyBcdUQ1MDRcdUI4NkNcdUQ1MDRcdUQyQjhcIilcbiAgICAgIC5zZXREZXNjKFwiXHVCQUE4XHVCNEUwIFx1QzY5NFx1Q0NBRFx1QzVEMCBcdUQzRUNcdUQ1NjhcdUI0MjAgXHVDMkRDXHVDMkE0XHVEMTVDIFx1QkE1NFx1QzJEQ1x1QzlDMFwiKVxuICAgICAgLmFkZFRleHRBcmVhKCh0ZXh0KSA9PlxuICAgICAgICB0ZXh0XG4gICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiXHVDNjA4OiBcdUIxMDhcdUIyOTQgT2JzaWRpYW4gXHVCOUFDXHVDMTFDXHVDRTU4IFx1QzVCNFx1QzJEQ1x1QzJBNFx1RDEzNFx1RDJCOFx1QjJFNC5cIilcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Muc3lzdGVtUHJvbXB0KVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnN5c3RlbVByb21wdCA9IHZhbHVlO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiXHVBRTMwXHVCQ0Y4IFx1QzgwMFx1QzdBNSBcdUQzRjRcdUIzNTRcIilcbiAgICAgIC5zZXREZXNjKFwiXHVCMzAwXHVENjU0XHVCOTdDIFx1QzgwMFx1QzdBNVx1RDU2MCBcdUFFMzBcdUJDRjggXHVEM0Y0XHVCMzU0IChcdUJDRkNcdUQyQjggXHVBRTMwXHVDOTAwKVwiKVxuICAgICAgLmFkZFRleHQoKHRleHQpID0+XG4gICAgICAgIHRleHRcbiAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCJcdUM2MDg6IENvbnZlcnNhdGlvbnNcIilcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZGVmYXVsdE91dHB1dEZvbGRlcilcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5kZWZhdWx0T3V0cHV0Rm9sZGVyID0gdmFsdWUudHJpbSgpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICBjb250YWluZXJFbC5jcmVhdGVFbChcImgzXCIsIHsgdGV4dDogXCJcdUM3NzhcdUIzNzFcdUMyRjEgXHVCQzBGIFx1QUM4MFx1QzBDOSBcdUMxMjRcdUM4MTVcIiB9KTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJcdUM3NzhcdUIzNzFcdUMyRjEgXHVENjVDXHVDMTMxXHVENjU0XCIpXG4gICAgICAuc2V0RGVzYyhcIlx1QkNGQ1x1RDJCOCBcdUQzMENcdUM3N0NcdUM3NDQgXHVDNzc4XHVCMzcxXHVDMkYxXHVENTU4XHVDNUVDIFx1QkNBMVx1RDEzMCBcdUFDODBcdUMwQzlcdUM3NDQgXHVENjVDXHVDMTMxXHVENjU0XHVENTY5XHVCMkM4XHVCMkU0LlwiKVxuICAgICAgLmFkZFRvZ2dsZSgodG9nZ2xlKSA9PlxuICAgICAgICB0b2dnbGVcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuaW5kZXhpbmdFbmFibGVkKVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmluZGV4aW5nRW5hYmxlZCA9IHZhbHVlO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiXHVDODA0XHVDQ0I0IFx1QkNGQ1x1RDJCOCBcdUM3ODRcdUJDQTBcdUI1MjlcIilcbiAgICAgIC5zZXREZXNjKFwiXHVCQ0ZDXHVEMkI4XHVDNzU4IFx1QkFBOFx1QjRFMCBcdUIxNzhcdUQyQjhcdUI5N0MgXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QkMwRiBcdUM3NzhcdUIzNzFcdUMyRjFcdUQ1NjlcdUIyQzhcdUIyRTQuIChcdUMyRENcdUFDMDRcdUM3NzQgXHVBQzc4XHVCOUI0IFx1QzIxOCBcdUM3ODhcdUM3NEMpXCIpXG4gICAgICAuYWRkQnV0dG9uKChidXR0b24pID0+IHtcbiAgICAgICAgYnV0dG9uXG4gICAgICAgICAgLnNldEJ1dHRvblRleHQoXCJcdUM4MDRcdUNDQjQgXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzJEQ1x1Qzc5MVwiKVxuICAgICAgICAgIC5zZXRDdGEoKVxuICAgICAgICAgIC5vbkNsaWNrKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGJ1dHRvbi5zZXREaXNhYmxlZCh0cnVlKTtcbiAgICAgICAgICAgIGJ1dHRvbi5zZXRCdXR0b25UZXh0KFwiXHVDOUM0XHVENTg5IFx1QzkxMS4uLlwiKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLmluZGV4VmF1bHRBbGwoKTtcbiAgICAgICAgICAgICAgbmV3IE5vdGljZShcIlx1QzgwNFx1Q0NCNCBcdUM3ODRcdUJDQTBcdUI1MjkgXHVDNjQ0XHVCOENDIVwiKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcik7XG4gICAgICAgICAgICAgIG5ldyBOb3RpY2UoYFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUMyRTRcdUQzMjg6ICR7bWVzc2FnZX1gKTtcbiAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgIGJ1dHRvbi5zZXREaXNhYmxlZChmYWxzZSk7XG4gICAgICAgICAgICAgIGJ1dHRvbi5zZXRCdXR0b25UZXh0KFwiXHVDODA0XHVDQ0I0IFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUMyRENcdUM3OTFcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJcdUMyRTBcdUFEREMgXHVCMTc4XHVEMkI4XHVCOUNDIFx1Qzc4NFx1QkNBMFx1QjUyOVwiKVxuICAgICAgLnNldERlc2MoXCJcdUI5QzhcdUM5QzBcdUI5QzkgXHVDNzc4XHVCMzcxXHVDMkYxIFx1Qzc3NFx1RDZDNCBcdUMwRERcdUMxMzFcdUI0MThcdUFDNzBcdUIwOTggXHVDMjE4XHVDODE1XHVCNDFDIFx1QjE3OFx1RDJCOFx1QjlDQyBcdUM3ODRcdUJDQTBcdUI1MjlcdUQ1NjlcdUIyQzhcdUIyRTQuXCIpXG4gICAgICAuYWRkQnV0dG9uKChidXR0b24pID0+IHtcbiAgICAgICAgYnV0dG9uXG4gICAgICAgICAgLnNldEJ1dHRvblRleHQoXCJcdUMyRTBcdUFEREMgXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzJEQ1x1Qzc5MVwiKVxuICAgICAgICAgIC5vbkNsaWNrKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGJ1dHRvbi5zZXREaXNhYmxlZCh0cnVlKTtcbiAgICAgICAgICAgIGJ1dHRvbi5zZXRCdXR0b25UZXh0KFwiXHVDOUM0XHVENTg5IFx1QzkxMS4uLlwiKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLmluZGV4TmV3RmlsZXNPbmx5KCk7XG4gICAgICAgICAgICAgIG5ldyBOb3RpY2UoXCJcdUMyRTBcdUFEREMgXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzY0NFx1QjhDQyFcIik7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpO1xuICAgICAgICAgICAgICBuZXcgTm90aWNlKGBcdUM3ODRcdUJDQTBcdUI1MjkgXHVDMkU0XHVEMzI4OiAke21lc3NhZ2V9YCk7XG4gICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICBidXR0b24uc2V0RGlzYWJsZWQoZmFsc2UpO1xuICAgICAgICAgICAgICBidXR0b24uc2V0QnV0dG9uVGV4dChcIlx1QzJFMFx1QUREQyBcdUM3ODRcdUJDQTBcdUI1MjkgXHVDMkRDXHVDNzkxXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiXHVDQ0FEXHVEMDZDIFx1RDA2Q1x1QUUzMFwiKVxuICAgICAgLnNldERlc2MoXCJcdUQxNERcdUMyQTRcdUQyQjhcdUI5N0MgXHVCRDg0XHVENTYwXHVENTYwIFx1QjU0QyBcdUFDMDEgXHVDQ0FEXHVEMDZDXHVDNzU4IFx1Q0Q1Q1x1QjMwMCBcdUQxQTBcdUQwNzAgXHVDMjE4IChcdUFFMzBcdUJDRjg6IDQwMClcIilcbiAgICAgIC5hZGRUZXh0KCh0ZXh0KSA9PlxuICAgICAgICB0ZXh0XG4gICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiNDAwXCIpXG4gICAgICAgICAgLnNldFZhbHVlKFN0cmluZyh0aGlzLnBsdWdpbi5zZXR0aW5ncy5jaHVua1NpemUpKVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG51bSA9IHBhcnNlSW50KHZhbHVlKTtcbiAgICAgICAgICAgIGlmICghaXNOYU4obnVtKSAmJiBudW0gPiAwKSB7XG4gICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmNodW5rU2l6ZSA9IG51bTtcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiXHVDQ0FEXHVEMDZDIFx1QzYyNFx1QkM4NFx1QjdBOVwiKVxuICAgICAgLnNldERlc2MoXCJcdUM3NzhcdUM4MTFcdUQ1NUMgXHVDQ0FEXHVEMDZDIFx1QUMwNCBcdUM5MTFcdUJDRjVcdUI0MThcdUIyOTQgXHVEMUEwXHVEMDcwIFx1QzIxOCAoXHVBRTMwXHVCQ0Y4OiA1MClcIilcbiAgICAgIC5hZGRUZXh0KCh0ZXh0KSA9PlxuICAgICAgICB0ZXh0XG4gICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiNTBcIilcbiAgICAgICAgICAuc2V0VmFsdWUoU3RyaW5nKHRoaXMucGx1Z2luLnNldHRpbmdzLmNodW5rT3ZlcmxhcCkpXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbnVtID0gcGFyc2VJbnQodmFsdWUpO1xuICAgICAgICAgICAgaWYgKCFpc05hTihudW0pICYmIG51bSA+PSAwKSB7XG4gICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmNodW5rT3ZlcmxhcCA9IG51bTtcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiXHVBQzgwXHVDMEM5IFx1QUNCMFx1QUNGQyBcdUMyMTggKFRvcC1LKVwiKVxuICAgICAgLnNldERlc2MoXCJcdUFDODBcdUMwQzkgXHVDMkRDIFx1QkMxOFx1RDY1OFx1RDU2MCBcdUNENUNcdUIzMDAgXHVBQ0IwXHVBQ0ZDIFx1QzIxOCAoXHVBRTMwXHVCQ0Y4OiA4KVwiKVxuICAgICAgLmFkZFRleHQoKHRleHQpID0+XG4gICAgICAgIHRleHRcbiAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCI4XCIpXG4gICAgICAgICAgLnNldFZhbHVlKFN0cmluZyh0aGlzLnBsdWdpbi5zZXR0aW5ncy50b3BLKSlcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBudW0gPSBwYXJzZUludCh2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoIWlzTmFOKG51bSkgJiYgbnVtID4gMCkge1xuICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy50b3BLID0gbnVtO1xuICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgKTtcblxuICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDNcIiwgeyB0ZXh0OiBcIlx1Qzc4NFx1QkNBMFx1QjUyOSBcdUMxMjRcdUM4MTVcIiB9KTtcblxuICAgIGxldCBlbWJlZGRpbmdNb2RlbElucHV0OiB7IHNldFZhbHVlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZCB9IHwgbnVsbCA9IG51bGw7XG4gICAgbGV0IGVtYmVkZGluZ0FwaVVybElucHV0OiB7IHNldFZhbHVlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZCB9IHwgbnVsbCA9IG51bGw7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzgxQ1x1QUNGNVx1Qzc5MFwiKVxuICAgICAgLnNldERlc2MoXCJcdUM3ODRcdUJDQTBcdUI1MjkgXHVDMEREXHVDMTMxXHVDNUQwIFx1QzBBQ1x1QzZBOVx1RDU2MCBcdUM4MUNcdUFDRjVcdUM3OTBcdUI5N0MgXHVDMTIwXHVEMEREXHVENTU4XHVDMTM4XHVDNjk0XCIpXG4gICAgICAuYWRkRHJvcGRvd24oKGRyb3Bkb3duKSA9PiB7XG4gICAgICAgIGRyb3Bkb3duXG4gICAgICAgICAgLmFkZE9wdGlvbnMoe1xuICAgICAgICAgICAgZ2VtaW5pOiBcIkdvb2dsZSBHZW1pbmkgKEFQSSlcIixcbiAgICAgICAgICAgIG9wZW5haTogXCJPcGVuQUkgKEFQSSlcIixcbiAgICAgICAgICAgIGxvY2FsOiBcIlx1Qjg1Q1x1Q0VFQyBcdUJBQThcdUIzNzggKEh1Z2dpbmdGYWNlKVwiLFxuICAgICAgICAgICAgY3VzdG9tOiBcIlx1Q0VFNFx1QzJBNFx1RDE0MCBBUElcIlxuICAgICAgICAgIH0pXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmVtYmVkZGluZ1Byb3ZpZGVyKVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gdmFsdWUgYXMgRW1iZWRkaW5nUHJvdmlkZXI7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbWJlZGRpbmdQcm92aWRlciA9IHByb3ZpZGVyO1xuICAgICAgICAgICAgY29uc3QgcHJlc2V0ID0gRU1CRURESU5HX1BSRVNFVFNbcHJvdmlkZXJdO1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZW1iZWRkaW5nTW9kZWwgPSBwcmVzZXQubW9kZWw7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbWJlZGRpbmdBcGlVcmwgPSBwcmVzZXQuYXBpVXJsIHx8IFwiXCI7XG4gICAgICAgICAgICBlbWJlZGRpbmdNb2RlbElucHV0Py5zZXRWYWx1ZShwcmVzZXQubW9kZWwpO1xuICAgICAgICAgICAgZW1iZWRkaW5nQXBpVXJsSW5wdXQ/LnNldFZhbHVlKHByZXNldC5hcGlVcmwgfHwgXCJcIik7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICBpZiAodGhpcy5wbHVnaW4uc2V0dGluZ3MuZW1iZWRkaW5nUHJvdmlkZXIgIT09IFwibG9jYWxcIikge1xuICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgIC5zZXROYW1lKFwiXHVDNzg0XHVCQ0EwXHVCNTI5IEFQSSBVUkxcIilcbiAgICAgICAgLnNldERlc2MoXCJcdUM3ODRcdUJDQTBcdUI1MjkgXHVDNjk0XHVDQ0FEIFx1QzVENFx1QjREQ1x1RDNFQ1x1Qzc3OFx1RDJCOCBVUkwgKFx1QkU0NFx1QzVCNFx1Qzc4OFx1QzczQ1x1QkE3NCBcdUM4MUNcdUFDRjVcdUM3OTAgXHVBRTMwXHVCQ0Y4XHVBQzEyIFx1QzBBQ1x1QzZBOSlcIilcbiAgICAgICAgLmFkZFRleHQoKHRleHQpID0+IHtcbiAgICAgICAgICBlbWJlZGRpbmdBcGlVcmxJbnB1dCA9IHRleHQ7XG4gICAgICAgICAgdGV4dFxuICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS92MS9lbWJlZGRpbmdzXCIpXG4gICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZW1iZWRkaW5nQXBpVXJsKVxuICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbWJlZGRpbmdBcGlVcmwgPSB2YWx1ZS50cmltKCk7XG4gICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbWJlZGRpbmdQcm92aWRlciAhPT0gXCJsb2NhbFwiKSB7XG4gICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgLnNldE5hbWUoXCJcdUM3ODRcdUJDQTBcdUI1MjkgQVBJIFx1RDBBNFwiKVxuICAgICAgICAuc2V0RGVzYyhcIlx1Qzc4NFx1QkNBMFx1QjUyOSBBUEkgXHVEMEE0IChcdUJFNDRcdUM1QjRcdUM3ODhcdUM3M0NcdUJBNzQgTExNIEFQSSBcdUQwQTQgXHVDMEFDXHVDNkE5KVwiKVxuICAgICAgICAuYWRkVGV4dCgodGV4dCkgPT5cbiAgICAgICAgICB0ZXh0XG4gICAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCJcdUMxMjBcdUQwRERcIilcbiAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbWJlZGRpbmdBcGlLZXkpXG4gICAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmVtYmVkZGluZ0FwaUtleSA9IHZhbHVlO1xuICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIlx1Qzc4NFx1QkNBMFx1QjUyOSBcdUJBQThcdUIzNzhcIilcbiAgICAgIC5zZXREZXNjKFwiXHVDMEFDXHVDNkE5XHVENTYwIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUJBQThcdUIzNzhcIilcbiAgICAgIC5hZGRUZXh0KCh0ZXh0KSA9PiB7XG4gICAgICAgIGVtYmVkZGluZ01vZGVsSW5wdXQgPSB0ZXh0O1xuICAgICAgICB0ZXh0XG4gICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiXHVCQUE4XHVCMzc4XHVCQTg1XCIpXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmVtYmVkZGluZ01vZGVsKVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmVtYmVkZGluZ01vZGVsID0gdmFsdWUudHJpbSgpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgbG9hZEdlbWluaU1vZGVscygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBhcGlLZXkgPSB0aGlzLnBsdWdpbi5zZXR0aW5ncy5hcGlLZXkudHJpbSgpO1xuICAgIGlmICghYXBpS2V5KSB7XG4gICAgICBuZXcgTm90aWNlKFwiR2VtaW5pIEFQSSBcdUQwQTRcdUI5N0MgXHVCQTNDXHVDODAwIFx1Qzc4NVx1QjgyNVx1RDU3NCBcdUM4RkNcdUMxMzhcdUM2OTQuXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHJlcXVlc3RVcmwoe1xuICAgICAgICB1cmw6IGBodHRwczovL2dlbmVyYXRpdmVsYW5ndWFnZS5nb29nbGVhcGlzLmNvbS92MWJldGEvbW9kZWxzP2tleT0ke2FwaUtleX1gXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGRhdGEgPSByZXNwb25zZS5qc29uIGFzXG4gICAgICAgIHwgeyBtb2RlbHM/OiBBcnJheTx7IG5hbWU/OiBzdHJpbmc7IHN1cHBvcnRlZEdlbmVyYXRpb25NZXRob2RzPzogc3RyaW5nW10gfT4gfVxuICAgICAgICB8IHVuZGVmaW5lZDtcbiAgICAgIGNvbnN0IG1vZGVscyA9IGRhdGE/Lm1vZGVscyA/PyBbXTtcbiAgICAgIHRoaXMuZ2VtaW5pTW9kZWxzID0gbW9kZWxzXG4gICAgICAgIC5maWx0ZXIoKG1vZGVsKSA9PiBtb2RlbC5zdXBwb3J0ZWRHZW5lcmF0aW9uTWV0aG9kcz8uaW5jbHVkZXMoXCJnZW5lcmF0ZUNvbnRlbnRcIikpXG4gICAgICAgIC5tYXAoKG1vZGVsKSA9PiBtb2RlbC5uYW1lKVxuICAgICAgICAuZmlsdGVyKChuYW1lKTogbmFtZSBpcyBzdHJpbmcgPT4gQm9vbGVhbihuYW1lKSk7XG5cbiAgICAgIGlmICh0aGlzLmdlbWluaU1vZGVscy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgbmV3IE5vdGljZShcIlx1QzBBQ1x1QzZBOSBcdUFDMDBcdUIyQTVcdUQ1NUMgR2VtaW5pIFx1QkFBOFx1QjM3OFx1Qzc0NCBcdUNDM0VcdUM5QzAgXHVCQUJCXHVENTg4XHVDMkI1XHVCMkM4XHVCMkU0LlwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ldyBOb3RpY2UoXCJHZW1pbmkgXHVCQUE4XHVCMzc4IFx1QkFBOVx1Qjg1RFx1Qzc0NCBcdUJEODhcdUI3RUNcdUM2NTRcdUMyQjVcdUIyQzhcdUIyRTQuXCIpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpO1xuICAgICAgbmV3IE5vdGljZShgR2VtaW5pIFx1QkFBOFx1QjM3OCBcdUJBQTlcdUI4NUQgXHVDMkU0XHVEMzI4OiAke21lc3NhZ2V9YCk7XG4gICAgfVxuICB9XG59XG4iLCAiaW1wb3J0IHsgSXRlbVZpZXcsIE1hcmtkb3duUmVuZGVyZXIsIE5vdGljZSwgV29ya3NwYWNlTGVhZiB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25UdXJuIH0gZnJvbSBcIi4uL2NvbnZlcnNhdGlvblwiO1xuaW1wb3J0IHR5cGUgeyBQbHVnaW5DaGF0QXBpIH0gZnJvbSBcIi4uL3BsdWdpbkFwaVwiO1xuaW1wb3J0IHsgVG9waWNTZXBhcmF0aW9uRW5naW5lIH0gZnJvbSBcIi4uL3RvcGljU2VwYXJhdGlvblwiO1xuaW1wb3J0IHsgc2F2ZVNlZ21lbnRzQXNOb3RlcyB9IGZyb20gXCIuLi90b3BpY1NlcGFyYXRpb25cIjtcblxuZXhwb3J0IGNvbnN0IFZJRVdfVFlQRV9PVkxfQ0hBVCA9IFwib3ZsLWNoYXQtdmlld1wiO1xuXG5leHBvcnQgY2xhc3MgQ2hhdFZpZXcgZXh0ZW5kcyBJdGVtVmlldyB7XG4gIHByaXZhdGUgcmVhZG9ubHkgcGx1Z2luOiBQbHVnaW5DaGF0QXBpO1xuICBwcml2YXRlIG1lc3NhZ2VzOiBDb252ZXJzYXRpb25UdXJuW10gPSBbXTtcbiAgcHJpdmF0ZSBtZXNzYWdlc0VsOiBIVE1MRGl2RWxlbWVudCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGlucHV0RWw6IEhUTUxUZXh0QXJlYUVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBzZW5kQnV0dG9uRWw6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgc2F2ZUJ1dHRvbkVsOiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIHNlc3Npb25JZEVsOiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgdXNlUmFnQ2hlY2tib3g6IEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBzaG93U291cmNlc0NoZWNrYm94OiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IobGVhZjogV29ya3NwYWNlTGVhZiwgcGx1Z2luOiBQbHVnaW5DaGF0QXBpKSB7XG4gICAgc3VwZXIobGVhZik7XG4gICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XG4gIH1cblxuICBnZXRWaWV3VHlwZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBWSUVXX1RZUEVfT1ZMX0NIQVQ7XG4gIH1cblxuICBnZXREaXNwbGF5VGV4dCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBcIk9WTCBcdUIzMDBcdUQ2NTRcIjtcbiAgfVxuXG4gIGdldEljb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gXCJtZXNzYWdlLWNpcmNsZVwiO1xuICB9XG5cbiAgYXN5bmMgb25PcGVuKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHsgY29udGVudEVsIH0gPSB0aGlzO1xuICAgIGNvbnRlbnRFbC5lbXB0eSgpO1xuICAgIGNvbnRlbnRFbC5hZGRDbGFzcyhcIm92bC1jaGF0LXZpZXdcIik7XG5cbiAgICBjb25zdCBoZWFkZXJFbCA9IGNvbnRlbnRFbC5jcmVhdGVFbChcImRpdlwiLCB7IGNsczogXCJvdmwtY2hhdC1oZWFkZXJcIiB9KTtcbiAgICBoZWFkZXJFbC5jcmVhdGVFbChcImRpdlwiLCB7IGNsczogXCJvdmwtY2hhdC10aXRsZVwiLCB0ZXh0OiBcIk9WTCBcdUIzMDBcdUQ2NTRcIiB9KTtcblxuICAgIGNvbnN0IHNlc3Npb25XcmFwRWwgPSBoZWFkZXJFbC5jcmVhdGVFbChcImRpdlwiLCB7IGNsczogXCJvdmwtY2hhdC1zZXNzaW9uXCIgfSk7XG4gICAgc2Vzc2lvbldyYXBFbC5jcmVhdGVFbChcInNwYW5cIiwgeyB0ZXh0OiBcIlx1QzgxQ1x1QkFBOVwiIH0pO1xuICAgIGNvbnN0IHNlc3Npb25JbnB1dEVsID0gc2Vzc2lvbldyYXBFbC5jcmVhdGVFbChcImlucHV0XCIsIHsgdHlwZTogXCJ0ZXh0XCIgfSk7XG4gICAgc2Vzc2lvbklucHV0RWwudmFsdWUgPSB0aGlzLmJ1aWxkU2Vzc2lvbklkKCk7XG4gICAgdGhpcy5zZXNzaW9uSWRFbCA9IHNlc3Npb25JbnB1dEVsO1xuXG4gICAgY29uc3QgY29udHJvbHNFbCA9IGhlYWRlckVsLmNyZWF0ZUVsKFwiZGl2XCIsIHsgY2xzOiBcIm92bC1jaGF0LWNvbnRyb2xzXCIgfSk7XG4gICAgXG4gICAgLy8gUkFHIFx1QzYzNVx1QzE1OFxuICAgIGNvbnN0IHJhZ1dyYXBFbCA9IGNvbnRyb2xzRWwuY3JlYXRlRWwoXCJkaXZcIiwgeyBjbHM6IFwib3ZsLXJhZy1vcHRpb25zXCIgfSk7XG4gICAgY29uc3QgdXNlUmFnTGFiZWwgPSByYWdXcmFwRWwuY3JlYXRlRWwoXCJsYWJlbFwiKTtcbiAgICBjb25zdCB1c2VSYWdDaGVja2JveCA9IHVzZVJhZ0xhYmVsLmNyZWF0ZUVsKFwiaW5wdXRcIiwgeyB0eXBlOiBcImNoZWNrYm94XCIgfSk7XG4gICAgdXNlUmFnQ2hlY2tib3guY2hlY2tlZCA9IHRydWU7XG4gICAgdXNlUmFnTGFiZWwuYXBwZW5kVGV4dChcIiBSQUcgXHVDMEFDXHVDNkE5XCIpO1xuICAgIHRoaXMudXNlUmFnQ2hlY2tib3ggPSB1c2VSYWdDaGVja2JveDtcblxuICAgIGNvbnN0IHNob3dTb3VyY2VzTGFiZWwgPSByYWdXcmFwRWwuY3JlYXRlRWwoXCJsYWJlbFwiKTtcbiAgICBjb25zdCBzaG93U291cmNlc0NoZWNrYm94ID0gc2hvd1NvdXJjZXNMYWJlbC5jcmVhdGVFbChcImlucHV0XCIsIHsgdHlwZTogXCJjaGVja2JveFwiIH0pO1xuICAgIHNob3dTb3VyY2VzQ2hlY2tib3guY2hlY2tlZCA9IGZhbHNlO1xuICAgIHNob3dTb3VyY2VzTGFiZWwuYXBwZW5kVGV4dChcIiBcdUMxOENcdUMyQTRcdUI5Q0MgXHVCQ0Y0XHVBRTMwXCIpO1xuICAgIHRoaXMuc2hvd1NvdXJjZXNDaGVja2JveCA9IHNob3dTb3VyY2VzQ2hlY2tib3g7XG5cbiAgICBjb25zdCBzYXZlQnV0dG9uRWwgPSBjb250cm9sc0VsLmNyZWF0ZUVsKFwiYnV0dG9uXCIsIHsgdGV4dDogXCJcdUM4MDBcdUM3QTVcIiwgY2xzOiBcIm92bC1jaGF0LWJ1dHRvblwiIH0pO1xuICAgIHNhdmVCdXR0b25FbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdm9pZCB0aGlzLmhhbmRsZVNhdmUoKTtcbiAgICB9KTtcbiAgICB0aGlzLnNhdmVCdXR0b25FbCA9IHNhdmVCdXR0b25FbDtcblxuICAgIGNvbnN0IG1lc3NhZ2VzRWwgPSBjb250ZW50RWwuY3JlYXRlRWwoXCJkaXZcIiwgeyBjbHM6IFwib3ZsLWNoYXQtbWVzc2FnZXNcIiB9KTtcbiAgICB0aGlzLm1lc3NhZ2VzRWwgPSBtZXNzYWdlc0VsO1xuXG4gICAgY29uc3QgaW5wdXRXcmFwRWwgPSBjb250ZW50RWwuY3JlYXRlRWwoXCJkaXZcIiwgeyBjbHM6IFwib3ZsLWNoYXQtaW5wdXRcIiB9KTtcbiAgICBjb25zdCB0ZXh0YXJlYUVsID0gaW5wdXRXcmFwRWwuY3JlYXRlRWwoXCJ0ZXh0YXJlYVwiKTtcbiAgICB0ZXh0YXJlYUVsLnBsYWNlaG9sZGVyID0gXCJcdUJBNTRcdUMyRENcdUM5QzBcdUI5N0MgXHVDNzg1XHVCODI1XHVENTU4XHVDMTM4XHVDNjk0LiAoQ3RybCtFbnRlciBcdUM4MDRcdUMxQTEpXCI7XG4gICAgdGhpcy5pbnB1dEVsID0gdGV4dGFyZWFFbDtcblxuICAgIGNvbnN0IHNlbmRCdXR0b25FbCA9IGlucHV0V3JhcEVsLmNyZWF0ZUVsKFwiYnV0dG9uXCIsIHsgdGV4dDogXCJcdUM4MDRcdUMxQTFcIiwgY2xzOiBcIm92bC1jaGF0LWJ1dHRvblwiIH0pO1xuICAgIHNlbmRCdXR0b25FbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdm9pZCB0aGlzLmhhbmRsZVNlbmQoKTtcbiAgICB9KTtcbiAgICB0aGlzLnNlbmRCdXR0b25FbCA9IHNlbmRCdXR0b25FbDtcblxuICAgIHRleHRhcmVhRWwuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVudGVyXCIgJiYgKGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQubWV0YUtleSkpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdm9pZCB0aGlzLmhhbmRsZVNlbmQoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYnVpbGRTZXNzaW9uSWQoKTogc3RyaW5nIHtcbiAgICBjb25zdCBzdGFtcCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5yZXBsYWNlKC9bOi5dL2csIFwiLVwiKTtcbiAgICByZXR1cm4gYHNlc3Npb24tJHtzdGFtcH1gO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRCdXN5U3RhdGUoc3RhdGU6IHtcbiAgICBpc0J1c3k6IGJvb2xlYW47XG4gICAgc2VuZExvYWRpbmc/OiBib29sZWFuO1xuICAgIHNhdmVMb2FkaW5nPzogYm9vbGVhbjtcbiAgfSk6IHZvaWQge1xuICAgIGNvbnN0IHNlbmRMb2FkaW5nID0gc3RhdGUuc2VuZExvYWRpbmcgPz8gZmFsc2U7XG4gICAgY29uc3Qgc2F2ZUxvYWRpbmcgPSBzdGF0ZS5zYXZlTG9hZGluZyA/PyBmYWxzZTtcblxuICAgIGlmICh0aGlzLnNlbmRCdXR0b25FbCkge1xuICAgICAgdGhpcy5zZW5kQnV0dG9uRWwuZGlzYWJsZWQgPSBzdGF0ZS5pc0J1c3k7XG4gICAgICB0aGlzLnNlbmRCdXR0b25FbC5jbGFzc0xpc3QudG9nZ2xlKFwiaXMtbG9hZGluZ1wiLCBzZW5kTG9hZGluZyk7XG4gICAgfVxuICAgIGlmICh0aGlzLnNhdmVCdXR0b25FbCkge1xuICAgICAgdGhpcy5zYXZlQnV0dG9uRWwuZGlzYWJsZWQgPSBzdGF0ZS5pc0J1c3k7XG4gICAgICB0aGlzLnNhdmVCdXR0b25FbC5jbGFzc0xpc3QudG9nZ2xlKFwiaXMtbG9hZGluZ1wiLCBzYXZlTG9hZGluZyk7XG4gICAgfVxuICAgIGlmICh0aGlzLmlucHV0RWwpIHtcbiAgICAgIHRoaXMuaW5wdXRFbC5kaXNhYmxlZCA9IHN0YXRlLmlzQnVzeTtcbiAgICB9XG4gICAgaWYgKHN0YXRlLmlzQnVzeSkge1xuICAgICAgdGhpcy5jb250ZW50RWwuYWRkQ2xhc3MoXCJvdmwtY2hhdC1idXN5XCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbnRlbnRFbC5yZW1vdmVDbGFzcyhcIm92bC1jaGF0LWJ1c3lcIik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBhcHBlbmRNZXNzYWdlKHR1cm46IENvbnZlcnNhdGlvblR1cm4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLm1lc3NhZ2VzLnB1c2godHVybik7XG4gICAgaWYgKCF0aGlzLm1lc3NhZ2VzRWwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNzYWdlRWwgPSB0aGlzLm1lc3NhZ2VzRWwuY3JlYXRlRWwoXCJkaXZcIiwge1xuICAgICAgY2xzOiBgb3ZsLWNoYXQtbWVzc2FnZSBvdmwtY2hhdC0ke3R1cm4ucm9sZX1gXG4gICAgfSk7XG4gICAgbWVzc2FnZUVsLmNyZWF0ZUVsKFwiZGl2XCIsIHtcbiAgICAgIGNsczogXCJvdmwtY2hhdC1yb2xlXCIsXG4gICAgICB0ZXh0OiB0aGlzLmdldFJvbGVMYWJlbCh0dXJuLnJvbGUpXG4gICAgfSk7XG4gICAgY29uc3QgY29udGVudEVsID0gbWVzc2FnZUVsLmNyZWF0ZUVsKFwiZGl2XCIsIHtcbiAgICAgIGNsczogXCJvdmwtY2hhdC1jb250ZW50IG1hcmtkb3duLXByZXZpZXctdmlldyBtYXJrZG93bi1yZW5kZXJlZFwiXG4gICAgfSk7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IE1hcmtkb3duUmVuZGVyZXIucmVuZGVyTWFya2Rvd24odHVybi5jb250ZW50LCBjb250ZW50RWwsIFwiXCIsIHRoaXMpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCBmYWxsYmFjayA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKTtcbiAgICAgIGNvbnRlbnRFbC5zZXRUZXh0KGBcdUI4MENcdUIzNTRcdUI5QzEgXHVDMkU0XHVEMzI4OiAke2ZhbGxiYWNrfWApO1xuICAgIH1cbiAgICBpZiAodHVybi50aW1lc3RhbXApIHtcbiAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IHR5cGVvZiB0dXJuLnRpbWVzdGFtcCA9PT0gXCJzdHJpbmdcIlxuICAgICAgICA/IHR1cm4udGltZXN0YW1wXG4gICAgICAgIDogdHVybi50aW1lc3RhbXAudG9JU09TdHJpbmcoKTtcbiAgICAgIG1lc3NhZ2VFbC5jcmVhdGVFbChcImRpdlwiLCB7XG4gICAgICAgIGNsczogXCJvdmwtY2hhdC10aW1lc3RhbXBcIixcbiAgICAgICAgdGV4dDogdGltZXN0YW1wXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLm1lc3NhZ2VzRWwuc2Nyb2xsVG9wID0gdGhpcy5tZXNzYWdlc0VsLnNjcm9sbEhlaWdodDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Um9sZUxhYmVsKHJvbGU6IENvbnZlcnNhdGlvblR1cm5bXCJyb2xlXCJdKTogc3RyaW5nIHtcbiAgICBpZiAocm9sZSA9PT0gXCJ1c2VyXCIpIHtcbiAgICAgIHJldHVybiBcIlx1QzBBQ1x1QzZBOVx1Qzc5MFwiO1xuICAgIH1cbiAgICBpZiAocm9sZSA9PT0gXCJhc3Npc3RhbnRcIikge1xuICAgICAgcmV0dXJuIFwiXHVDNUI0XHVDMkRDXHVDMkE0XHVEMTM0XHVEMkI4XCI7XG4gICAgfVxuICAgIHJldHVybiBcIlx1QzJEQ1x1QzJBNFx1RDE1Q1wiO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVTZW5kKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGlucHV0ID0gdGhpcy5pbnB1dEVsPy52YWx1ZS50cmltKCkgPz8gXCJcIjtcbiAgICBpZiAoIWlucHV0KSB7XG4gICAgICBuZXcgTm90aWNlKFwiXHVCQTU0XHVDMkRDXHVDOUMwXHVCOTdDIFx1Qzc4NVx1QjgyNVx1RDU3NCBcdUM4RkNcdUMxMzhcdUM2OTQuXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGlzRmlyc3RRdWVzdGlvbiA9IHRoaXMubWVzc2FnZXMubGVuZ3RoID09PSAwO1xuXG4gICAgYXdhaXQgdGhpcy5hcHBlbmRNZXNzYWdlKHtcbiAgICAgIHJvbGU6IFwidXNlclwiLFxuICAgICAgY29udGVudDogaW5wdXQsXG4gICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKVxuICAgIH0pO1xuICAgIGlmICh0aGlzLmlucHV0RWwpIHtcbiAgICAgIHRoaXMuaW5wdXRFbC52YWx1ZSA9IFwiXCI7XG4gICAgfVxuXG4gICAgaWYgKGlzRmlyc3RRdWVzdGlvbikge1xuICAgICAgdm9pZCB0aGlzLmdlbmVyYXRlU2Vzc2lvblRpdGxlRnJvbVF1ZXN0aW9uKGlucHV0KTtcbiAgICB9XG5cbiAgICB0aGlzLnNldEJ1c3lTdGF0ZSh7IGlzQnVzeTogdHJ1ZSwgc2VuZExvYWRpbmc6IHRydWUgfSk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHVzZVJhZyA9IHRoaXMudXNlUmFnQ2hlY2tib3g/LmNoZWNrZWQgPz8gZmFsc2U7XG4gICAgICBjb25zdCBzaG93U291cmNlc09ubHkgPSB0aGlzLnNob3dTb3VyY2VzQ2hlY2tib3g/LmNoZWNrZWQgPz8gZmFsc2U7XG5cbiAgICAgIGxldCByZXBseTogc3RyaW5nO1xuXG4gICAgICBpZiAodXNlUmFnICYmIHRoaXMucGx1Z2luLnNldHRpbmdzLmluZGV4aW5nRW5hYmxlZCkge1xuICAgICAgICAvLyBSQUcgXHVDMEFDXHVDNkE5OiBcdUFDODBcdUMwQzkgXHVENkM0IFx1Q0VFOFx1RDE0RFx1QzJBNFx1RDJCOCBcdUNEOTRcdUFDMDBcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBzZWFyY2hSZXN1bHRzID0gYXdhaXQgdGhpcy5wbHVnaW4uc2VhcmNoKGlucHV0KTtcbiAgICAgICAgICBcbiAgICAgICAgICBpZiAoc2hvd1NvdXJjZXNPbmx5KSB7XG4gICAgICAgICAgICAvLyBcdUMxOENcdUMyQTRcdUI5Q0MgXHVENDVDXHVDMkRDXG4gICAgICAgICAgICByZXBseSA9IHRoaXMuZm9ybWF0U2VhcmNoUmVzdWx0cyhzZWFyY2hSZXN1bHRzKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gXHVBQzgwXHVDMEM5IFx1QUNCMFx1QUNGQ1x1Qjk3QyBcdUNFRThcdUQxNERcdUMyQTRcdUQyQjhcdUI4NUMgTExNXHVDNUQwIFx1QzgwNFx1QjJFQ1xuICAgICAgICAgICAgY29uc3QgY29udGV4dCA9IHRoaXMuYnVpbGRDb250ZXh0KHNlYXJjaFJlc3VsdHMpO1xuICAgICAgICAgICAgY29uc3QgZW5oYW5jZWRNZXNzYWdlcyA9IHRoaXMuYnVpbGRFbmhhbmNlZE1lc3NhZ2VzKGlucHV0LCBjb250ZXh0KTtcbiAgICAgICAgICAgIHJlcGx5ID0gYXdhaXQgdGhpcy5wbHVnaW4ucmVxdWVzdEFzc2lzdGFudFJlcGx5KGVuaGFuY2VkTWVzc2FnZXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiUkFHIFx1QUM4MFx1QzBDOSBcdUMyRTRcdUQzMjg6XCIsIGVycm9yKTtcbiAgICAgICAgICBuZXcgTm90aWNlKFwiXHVBQzgwXHVDMEM5XHVDNUQwIFx1QzJFNFx1RDMyOFx1RDU1OFx1QzVFQyBcdUM3N0NcdUJDMTggXHVCQUE4XHVCNERDXHVCODVDIFx1QzgwNFx1RDY1OFx1RDU2OVx1QjJDOFx1QjJFNFwiKTtcbiAgICAgICAgICByZXBseSA9IGF3YWl0IHRoaXMucGx1Z2luLnJlcXVlc3RBc3Npc3RhbnRSZXBseSh0aGlzLm1lc3NhZ2VzKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gXHVDNzdDXHVCQzE4IFx1QkFBOFx1QjREQ1xuICAgICAgICByZXBseSA9IGF3YWl0IHRoaXMucGx1Z2luLnJlcXVlc3RBc3Npc3RhbnRSZXBseSh0aGlzLm1lc3NhZ2VzKTtcbiAgICAgIH1cblxuICAgICAgYXdhaXQgdGhpcy5hcHBlbmRNZXNzYWdlKHtcbiAgICAgICAgcm9sZTogXCJhc3Npc3RhbnRcIixcbiAgICAgICAgY29udGVudDogcmVwbHksXG4gICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKTtcbiAgICAgIG5ldyBOb3RpY2UoYFx1QjMwMFx1RDY1NCBcdUMyRTRcdUQzMjg6ICR7bWVzc2FnZX1gKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdGhpcy5zZXRCdXN5U3RhdGUoeyBpc0J1c3k6IGZhbHNlIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYnVpbGRDb250ZXh0KHNlYXJjaFJlc3VsdHM6IGFueVtdKTogc3RyaW5nIHtcbiAgICBpZiAoc2VhcmNoUmVzdWx0cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBcIlx1QUQwMFx1QjgyOCBcdUJCMzhcdUMxMUNcdUI5N0MgXHVDQzNFXHVDNzQ0IFx1QzIxOCBcdUM1QzZcdUMyQjVcdUIyQzhcdUIyRTQuXCI7XG4gICAgfVxuXG4gICAgbGV0IGNvbnRleHQgPSBcIlx1QjJFNFx1Qzc0Q1x1Qzc0MCBcdUFDODBcdUMwQzlcdUI0MUMgXHVBRDAwXHVCODI4IFx1QkIzOFx1QzExQ1x1QjRFNFx1Qzc4NVx1QjJDOFx1QjJFNDpcXG5cXG5cIjtcbiAgICBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlYXJjaFJlc3VsdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHNlYXJjaFJlc3VsdHNbaV07XG4gICAgICBjb25zdCB7IGNodW5rLCBub3RlLCBzY29yZSB9ID0gcmVzdWx0O1xuICAgICAgXG4gICAgICBjb250ZXh0ICs9IGAjIyBcdUJCMzhcdUMxMUMgJHtpICsgMX06ICR7bm90ZS50aXRsZX1cXG5gO1xuICAgICAgY29udGV4dCArPSBgLSBcdUQzMENcdUM3N0M6ICR7bm90ZS5wYXRofVxcbmA7XG4gICAgICBjb250ZXh0ICs9IGAtIFx1QzEzOVx1QzE1ODogJHtjaHVuay5zZWN0aW9uIHx8IFwiXHVCQ0Y4XHVCQjM4XCJ9XFxuYDtcbiAgICAgIGNvbnRleHQgKz0gYC0gXHVDNzIwXHVDMEFDXHVCM0M0OiAkeyhzY29yZSAqIDEwMCkudG9GaXhlZCgxKX0lXFxuXFxuYDtcbiAgICAgIGNvbnRleHQgKz0gYCR7Y2h1bmsudGV4dH1cXG5cXG5gO1xuICAgICAgY29udGV4dCArPSBcIi0tLVxcblxcblwiO1xuICAgIH1cblxuICAgIHJldHVybiBjb250ZXh0O1xuICB9XG5cbiAgcHJpdmF0ZSBmb3JtYXRTZWFyY2hSZXN1bHRzKHNlYXJjaFJlc3VsdHM6IGFueVtdKTogc3RyaW5nIHtcbiAgICBpZiAoc2VhcmNoUmVzdWx0cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBcIlx1QUM4MFx1QzBDOSBcdUFDQjBcdUFDRkNcdUFDMDAgXHVDNUM2XHVDMkI1XHVCMkM4XHVCMkU0LlwiO1xuICAgIH1cblxuICAgIGxldCBvdXRwdXQgPSBcIiMgXHVBQzgwXHVDMEM5IFx1QUNCMFx1QUNGQ1xcblxcblwiO1xuICAgIFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VhcmNoUmVzdWx0cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgcmVzdWx0ID0gc2VhcmNoUmVzdWx0c1tpXTtcbiAgICAgIGNvbnN0IHsgY2h1bmssIG5vdGUsIHNjb3JlIH0gPSByZXN1bHQ7XG4gICAgICBcbiAgICAgIG91dHB1dCArPSBgIyMgJHtpICsgMX0uICR7bm90ZS50aXRsZX1cXG5cXG5gO1xuICAgICAgb3V0cHV0ICs9IGAqKlx1RDMwQ1x1Qzc3QyoqOiBbWyR7bm90ZS5wYXRofV1dXFxuYDtcbiAgICAgIG91dHB1dCArPSBgKipcdUMxMzlcdUMxNTgqKjogJHtjaHVuay5zZWN0aW9uIHx8IFwiXHVCQ0Y4XHVCQjM4XCJ9XFxuYDtcbiAgICAgIG91dHB1dCArPSBgKipcdUM3MjBcdUMwQUNcdUIzQzQqKjogJHsoc2NvcmUgKiAxMDApLnRvRml4ZWQoMSl9JVxcblxcbmA7XG4gICAgICBvdXRwdXQgKz0gYD4gJHtjaHVuay50ZXh0LnN1YnN0cmluZygwLCAyMDApfSR7Y2h1bmsudGV4dC5sZW5ndGggPiAyMDAgPyBcIi4uLlwiIDogXCJcIn1cXG5cXG5gO1xuICAgIH1cblxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkRW5oYW5jZWRNZXNzYWdlcyhxdWVyeTogc3RyaW5nLCBjb250ZXh0OiBzdHJpbmcpOiBDb252ZXJzYXRpb25UdXJuW10ge1xuICAgIC8vIFx1QzJEQ1x1QzJBNFx1RDE1QyBcdUQ1MDRcdUI4NkNcdUQ1MDRcdUQyQjhcdUM1RDAgXHVDRUU4XHVEMTREXHVDMkE0XHVEMkI4IFx1Q0Q5NFx1QUMwMFxuICAgIGNvbnN0IHN5c3RlbVByb21wdCA9IGBcdUIxMDhcdUIyOTQgT2JzaWRpYW4gXHVCQ0ZDXHVEMkI4XHVDNzU4IFx1QzgwNFx1QkIzOCBcdUI5QUNcdUMxMUNcdUNFNTggXHVDNUI0XHVDMkRDXHVDMkE0XHVEMTM0XHVEMkI4XHVCMkU0LiBcblx1QzgxQ1x1QUNGNVx1QjQxQyBcdUJCMzhcdUMxMUNcdUI0RTRcdUM3NDQgXHVDQzM4XHVBQ0UwXHVENTU4XHVDNUVDIFx1QzBBQ1x1QzZBOVx1Qzc5MFx1Qzc1OCBcdUM5QzhcdUJCMzhcdUM1RDAgXHVCMkY1XHVCQ0MwXHVENTU4XHVCNDE4LCBcdUQ1NkRcdUMwQzEgXHVDRDlDXHVDQzk4XHVCOTdDIFx1QkE4NVx1QzJEQ1x1RDU1OFx1Qjc3Qy5cblx1QkFBOFx1Qjk3NFx1QjI5NCBcdUIwQjRcdUM2QTlcdUM3NDAgXHVDRDk0XHVDRTIxXHVENTU4XHVDOUMwIFx1QjlEMFx1QUNFMCBcdUMxOTRcdUM5QzFcdUQ1NThcdUFDOEMgXHVCQUE4XHVCOTc4XHVCMkU0XHVBQ0UwIFx1QjJGNVx1QkNDMFx1RDU1OFx1Qjc3Qy5cblxuJHtjb250ZXh0fWA7XG5cbiAgICAvLyBcdUFFMzBcdUM4NzQgXHVCQTU0XHVDMkRDXHVDOUMwXHVDNUQwIFx1QzJEQ1x1QzJBNFx1RDE1QyBcdUQ1MDRcdUI4NkNcdUQ1MDRcdUQyQjggXHVDRDk0XHVBQzAwXG4gICAgcmV0dXJuIFtcbiAgICAgIHsgcm9sZTogXCJzeXN0ZW1cIiwgY29udGVudDogc3lzdGVtUHJvbXB0LCB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSB9LFxuICAgICAgLi4udGhpcy5tZXNzYWdlc1xuICAgIF07XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGhhbmRsZVNhdmUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKHRoaXMubWVzc2FnZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICBuZXcgTm90aWNlKFwiXHVDODAwXHVDN0E1XHVENTYwIFx1QjMwMFx1RDY1NFx1QUMwMCBcdUM1QzZcdUMyQjVcdUIyQzhcdUIyRTQuXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc2V0QnVzeVN0YXRlKHsgaXNCdXN5OiB0cnVlLCBzYXZlTG9hZGluZzogdHJ1ZSB9KTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgY29udmVyc2F0aW9uVGl0bGUgPSBhd2FpdCB0aGlzLmdlbmVyYXRlVGl0bGVGb3JTYXZlKCk7XG4gICAgICBjb25zdCBzZXNzaW9uSWQgPSB0aGlzLnNlc3Npb25JZEVsPy52YWx1ZS50cmltKCkgPz8gXCJcIjtcbiAgICAgIGNvbnN0IGZpbmFsU2Vzc2lvbklkID0gY29udmVyc2F0aW9uVGl0bGUgfHwgc2Vzc2lvbklkO1xuICAgICAgaWYgKCFmaW5hbFNlc3Npb25JZCkge1xuICAgICAgICBuZXcgTm90aWNlKFwiXHVDODFDXHVCQUE5XHVDNzQ0IFx1Qzc4NVx1QjgyNVx1RDU3NCBcdUM4RkNcdUMxMzhcdUM2OTQuXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoY29udmVyc2F0aW9uVGl0bGUgJiYgdGhpcy5zZXNzaW9uSWRFbCkge1xuICAgICAgICB0aGlzLnNlc3Npb25JZEVsLnZhbHVlID0gY29udmVyc2F0aW9uVGl0bGU7XG4gICAgICB9XG5cbiAgICAgIC8vIFx1QzhGQ1x1QzgxQyBcdUJEODRcdUI5QUMgXHVENjVDXHVDMTMxXHVENjU0IFx1RDY1NVx1Qzc3OCAoXHVCMzAwXHVENjU0XHVBQzAwIDRcdUQxMzQgXHVDNzc0XHVDMEMxXHVDNzdDIFx1QjU0Q1x1QjlDQylcbiAgICAgIGNvbnN0IGVuYWJsZVRvcGljU2VwYXJhdGlvbiA9IHRoaXMubWVzc2FnZXMubGVuZ3RoID49IDQgJiYgdGhpcy5wbHVnaW4uc2V0dGluZ3MuYXBpS2V5O1xuXG4gICAgICBpZiAoZW5hYmxlVG9waWNTZXBhcmF0aW9uKSB7XG4gICAgICAgIC8vIFx1QzhGQ1x1QzgxQyBcdUJEODRcdUI5QUMgQUkgXHVDMEFDXHVDNkE5XG4gICAgICAgIG5ldyBOb3RpY2UoXCJcdUIzMDBcdUQ2NTRcdUI5N0MgXHVDOEZDXHVDODFDXHVCQ0M0XHVCODVDIFx1QkQ4NFx1QzExRFx1RDU1OFx1QjI5NCBcdUM5MTEuLi5cIik7XG4gICAgICAgIFxuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGVuZ2luZSA9IG5ldyBUb3BpY1NlcGFyYXRpb25FbmdpbmUoe1xuICAgICAgICAgICAgYXBpS2V5OiB0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbWJlZGRpbmdBcGlLZXkgfHwgdGhpcy5wbHVnaW4uc2V0dGluZ3MuYXBpS2V5LFxuICAgICAgICAgICAgZW1iZWRkaW5nTW9kZWw6IHRoaXMucGx1Z2luLnNldHRpbmdzLmVtYmVkZGluZ01vZGVsLFxuICAgICAgICAgICAgc2ltaWxhcml0eVRocmVzaG9sZDogMC43NSxcbiAgICAgICAgICAgIG1pblNlZ21lbnRMZW5ndGg6IDIsXG4gICAgICAgICAgICB3aW5kb3dTaXplOiAyLFxuICAgICAgICAgICAgZW5hYmxlS2V5d29yZE1ldGFkYXRhOiB0cnVlLFxuICAgICAgICAgICAgYXBwOiB0aGlzLmFwcCxcbiAgICAgICAgICAgIG1hbmlmZXN0OiB0aGlzLnBsdWdpbi5tYW5pZmVzdCxcbiAgICAgICAgICAgIGVuYWJsZUVtYmVkZGluZ0xvZ2dpbmc6IHRydWVcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGVuZ2luZS5zZXBhcmF0ZVRvcGljcyh0aGlzLm1lc3NhZ2VzKTtcbiAgICAgICAgICBcbiAgICAgICAgICBjb25zb2xlLmxvZyhgXHVDOEZDXHVDODFDIFx1QkQ4NFx1QjlBQyBcdUM2NDRcdUI4Q0M6ICR7cmVzdWx0LnNlZ21lbnRzLmxlbmd0aH1cdUFDMUMgXHVDMTM4XHVBREY4XHVCQTNDXHVEMkI4IFx1QUMxMFx1QzlDMGApO1xuXG4gICAgICAgICAgaWYgKHJlc3VsdC5zZWdtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAvLyBcdUM1RUNcdUI3RUMgXHVDOEZDXHVDODFDXHVCODVDIFx1QkQ4NFx1QjlBQ1x1QjQyOFxuICAgICAgICAgICAgbmV3IE5vdGljZShgJHtyZXN1bHQuc2VnbWVudHMubGVuZ3RofVx1QUMxQ1x1Qzc1OCBcdUM4RkNcdUM4MUNcdUI4NUMgXHVCRDg0XHVCOUFDXHVCNDE4XHVDNUM4XHVDMkI1XHVCMkM4XHVCMkU0LiBcdUM4MDBcdUM3QTUgXHVDOTExLi4uYCk7XG5cbiAgICAgICAgICAgIGNvbnN0IG11bHRpTm90ZVJlc3VsdCA9IGF3YWl0IHNhdmVTZWdtZW50c0FzTm90ZXMoXG4gICAgICAgICAgICAgIHRoaXMuYXBwLnZhdWx0LFxuICAgICAgICAgICAgICByZXN1bHQuc2VnbWVudHMsXG4gICAgICAgICAgICAgIHJlc3VsdC5saW5rcyxcbiAgICAgICAgICAgICAgZmluYWxTZXNzaW9uSWQsXG4gICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmRlZmF1bHRPdXRwdXRGb2xkZXIsXG4gICAgICAgICAgICAgIHRoaXMuYXBwLFxuICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5tYW5pZmVzdFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgbmV3IE5vdGljZShcbiAgICAgICAgICAgICAgYFx1QzhGQ1x1QzgxQ1x1QkNDNFx1Qjg1QyBcdUJEODRcdUI5QUNcdUQ1NThcdUM1RUMgXHVDODAwXHVDN0E1IFx1QzY0NFx1QjhDQyFcXG4tIFx1QzhGQ1x1QzgxQyBcdUIxNzhcdUQyQjg6ICR7bXVsdGlOb3RlUmVzdWx0Lm5vdGVQYXRocy5sZW5ndGh9XHVBQzFDXFxuLSBcdUM3NzhcdUIzNzFcdUMyQTQ6ICR7bXVsdGlOb3RlUmVzdWx0Lm1haW5Ob3RlUGF0aH1gXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBlbmdpbmUuY2xlYXJDYWNoZSgpO1xuICAgICAgICAgICAgdGhpcy5yZXNldFNlc3Npb24oKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gXHVCMkU4XHVDNzdDIFx1QzhGQ1x1QzgxQ1x1Qjg1QyBcdUQzMTBcdUIyRThcdUI0MjhcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiXHVCMkU4XHVDNzdDIFx1QzhGQ1x1QzgxQ1x1Qjg1QyBcdUQzMTBcdUIyRThcdUI0MThcdUM1QjQgXHVDNzdDXHVCQzE4IFx1QzgwMFx1QzdBNSBcdUMyMThcdUQ1ODlcIik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZW5naW5lLmNsZWFyQ2FjaGUoKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiXHVDOEZDXHVDODFDIFx1QkQ4NFx1QjlBQyBcdUMyRTRcdUQzMjgsIFx1Qzc3Q1x1QkMxOCBcdUM4MDBcdUM3QTVcdUM3M0NcdUI4NUMgXHVDODA0XHVENjU4OlwiLCBlcnJvcik7XG4gICAgICAgICAgbmV3IE5vdGljZShcIlx1QzhGQ1x1QzgxQyBcdUJEODRcdUI5QUMgXHVDMkU0XHVEMzI4LiBcdUM3N0NcdUJDMTggXHVCQzI5XHVDMkREXHVDNzNDXHVCODVDIFx1QzgwMFx1QzdBNVx1RDU2OVx1QjJDOFx1QjJFNC5cIik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gXHVDNzdDXHVCQzE4IFx1QzgwMFx1QzdBNSAoXHVBRTMwXHVDODc0IFx1Qjg1Q1x1QzlDMSlcbiAgICAgIGNvbnN0IHN1bW1hcnlQcm9tcHQgPSB0aGlzLmJ1aWxkV2lraVN1bW1hcnlQcm9tcHQodGhpcy5tZXNzYWdlcyk7XG4gICAgICBsZXQgc3VtbWFyeSA9IGF3YWl0IHRoaXMucGx1Z2luLnJlcXVlc3RBc3Npc3RhbnRSZXBseShbXG4gICAgICAgIHtcbiAgICAgICAgICByb2xlOiBcInVzZXJcIixcbiAgICAgICAgICBjb250ZW50OiBzdW1tYXJ5UHJvbXB0LFxuICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpXG4gICAgICAgIH1cbiAgICAgIF0pO1xuICAgICAgc3VtbWFyeSA9IHRoaXMuY2xlYW5TdW1tYXJ5KHN1bW1hcnkpO1xuXG4gICAgICBjb25zdCB0YXJnZXRQYXRoID0gYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZUNvbnZlcnNhdGlvbkZyb21UdXJucyhcbiAgICAgICAgZmluYWxTZXNzaW9uSWQsXG4gICAgICAgIFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICByb2xlOiBcImFzc2lzdGFudFwiLFxuICAgICAgICAgICAgY29udGVudDogc3VtbWFyeSxcbiAgICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5kZWZhdWx0T3V0cHV0Rm9sZGVyXG4gICAgICApO1xuICAgICAgbmV3IE5vdGljZShgXHVDNzA0XHVEMEE0IFx1QzY5NFx1QzU3RCBcdUM4MDBcdUM3QTUgXHVDNjQ0XHVCOENDOiAke3RhcmdldFBhdGh9YCk7XG4gICAgICB0aGlzLnJlc2V0U2Vzc2lvbigpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpO1xuICAgICAgbmV3IE5vdGljZShgXHVDODAwXHVDN0E1IFx1QzJFNFx1RDMyODogJHttZXNzYWdlfWApO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLnNldEJ1c3lTdGF0ZSh7IGlzQnVzeTogZmFsc2UgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZXNldFNlc3Npb24oKTogdm9pZCB7XG4gICAgdGhpcy5tZXNzYWdlcyA9IFtdO1xuICAgIGlmICh0aGlzLm1lc3NhZ2VzRWwpIHtcbiAgICAgIHRoaXMubWVzc2FnZXNFbC5lbXB0eSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5pbnB1dEVsKSB7XG4gICAgICB0aGlzLmlucHV0RWwudmFsdWUgPSBcIlwiO1xuICAgIH1cbiAgICBpZiAodGhpcy5zZXNzaW9uSWRFbCkge1xuICAgICAgdGhpcy5zZXNzaW9uSWRFbC52YWx1ZSA9IHRoaXMuYnVpbGRTZXNzaW9uSWQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkV2lraVN1bW1hcnlQcm9tcHQodHVybnM6IENvbnZlcnNhdGlvblR1cm5bXSk6IHN0cmluZyB7XG4gICAgY29uc3QgdHJhbnNjcmlwdCA9IHR1cm5zXG4gICAgICAubWFwKCh0dXJuKSA9PiB7XG4gICAgICAgIGNvbnN0IHJvbGVMYWJlbCA9XG4gICAgICAgICAgdHVybi5yb2xlID09PSBcInVzZXJcIiA/IFwiXHVDMEFDXHVDNkE5XHVDNzkwXCIgOlxuICAgICAgICAgIHR1cm4ucm9sZSA9PT0gXCJhc3Npc3RhbnRcIiA/IFwiXHVDNUI0XHVDMkRDXHVDMkE0XHVEMTM0XHVEMkI4XCIgOlxuICAgICAgICAgIFwiXHVDMkRDXHVDMkE0XHVEMTVDXCI7XG4gICAgICAgIHJldHVybiBgWyR7cm9sZUxhYmVsfV0gJHt0dXJuLmNvbnRlbnR9YDtcbiAgICAgIH0pXG4gICAgICAuam9pbihcIlxcblxcblwiKTtcblxuICAgIHJldHVybiBgXHVCMkU0XHVDNzRDIFx1QjMwMFx1RDY1NFx1Qjk3QyBcdUM3MDRcdUQwQTQgXHVENjE1XHVDMkREXHVDNzU4IFx1QjlDOFx1RDA2Q1x1QjJFNFx1QzZCNCBcdUJDRjhcdUJCMzhcdUM3M0NcdUI4NUMgXHVDODE1XHVCOUFDXHVENTc0IFx1QzhGQ1x1QzEzOFx1QzY5NC5cXG5cXG5gICtcbiAgICAgIGBcdUNEOUNcdUI4MjUgXHVENjE1XHVDMkREKFx1QkNGOFx1QkIzOFx1QjlDQyk6XFxuYCArXG4gICAgICBgIyBcdUM4MUNcdUJBQTlcXG5gICtcbiAgICAgIGAjIyBcdUM2OTRcdUM1N0RcXG5gICtcbiAgICAgIGAjIyBcdUQ1NzVcdUMyRUMgXHVDOEZDXHVDODFDXFxuYCArXG4gICAgICBgIyMgXHVBQ0IwXHVDODE1IFx1QzBBQ1x1RDU2RFxcbmAgK1xuICAgICAgYCMjIFx1QzU2MVx1QzE1OCBcdUM1NDRcdUM3NzRcdUQxNUNcXG5gICtcbiAgICAgIGAjIyBcdUM1RjRcdUI5QjAgXHVDOUM4XHVCQjM4XFxuXFxuYCArXG4gICAgICBgXHVDNjk0XHVBRDZDXHVDMEFDXHVENTZEOlxcbmAgK1xuICAgICAgYC0gXHVDNzA0IFx1RDYxNVx1QzJERFx1Qzc0NCBcdUM5QzBcdUNGMUNcdUMxMUMgXHVBRDZDXHVDODcwXHVDODAxXHVDNzNDXHVCODVDIFx1Qzc5MVx1QzEzMVxcbmAgK1xuICAgICAgYC0gXHVBQzAwXHVCMkE1XHVENTVDIFx1QUNCRFx1QzZCMCBcdUJBQTlcdUI4NURcdUFDRkMgXHVENDVDIFx1QzBBQ1x1QzZBOVxcbmAgK1xuICAgICAgYC0gXHVENTVDXHVBRDZEXHVDNUI0XHVCODVDIFx1Qzc5MVx1QzEzMVxcbmAgK1xuICAgICAgYC0gXCJcdUM1QjRcdUMyRENcdUMyQTRcdUQxMzRcdUQyQjhcIi9cdUQwQzBcdUM3ODRcdUMyQTRcdUQwRUNcdUQ1MDQvXHVDMTFDXHVCQjM4L1x1QzEyNFx1QkE4NS9cdUMwQUNcdUM4NzEgXHVDNUM2XHVDNzc0IFx1QkNGOFx1QkIzOFx1QjlDQyBcdUNEOUNcdUI4MjVcXG5cXG5gICtcbiAgICAgIGBcdUIzMDBcdUQ2NTQgXHVBRTMwXHVCODVEOlxcbiR7dHJhbnNjcmlwdH1gO1xuICB9XG5cbiAgcHJpdmF0ZSBjbGVhblN1bW1hcnkoc3VtbWFyeTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBsaW5lcyA9IHN1bW1hcnkuc3BsaXQoXCJcXG5cIik7XG4gICAgY29uc3QgY2xlYW5lZCA9IFtdIGFzIHN0cmluZ1tdO1xuICAgIGxldCBpbmRleCA9IDA7XG5cbiAgICB3aGlsZSAoaW5kZXggPCBsaW5lcy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGxpbmUgPSBsaW5lc1tpbmRleF0udHJpbSgpO1xuICAgICAgaWYgKGxpbmUuc3RhcnRzV2l0aChcIiMjIFx1RDgzRVx1REQxNlwiKSB8fCBsaW5lLnN0YXJ0c1dpdGgoXCIjIyBcdUM1QjRcdUMyRENcdUMyQTRcdUQxMzRcdUQyQjhcIikpIHtcbiAgICAgICAgaW5kZXggKz0gMTtcbiAgICAgICAgd2hpbGUgKGluZGV4IDwgbGluZXMubGVuZ3RoICYmIGxpbmVzW2luZGV4XS50cmltKCkuc3RhcnRzV2l0aChcIipcIikpIHtcbiAgICAgICAgICBpbmRleCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChpbmRleCA8IGxpbmVzLmxlbmd0aCAmJiBsaW5lc1tpbmRleF0udHJpbSgpID09PSBcIlwiKSB7XG4gICAgICAgICAgaW5kZXggKz0gMTtcbiAgICAgICAgfVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmIChsaW5lLnN0YXJ0c1dpdGgoXCJcdUIyRTRcdUM3NENcdUM3NDAgXCIpICYmIGxpbmUuaW5jbHVkZXMoXCJcdUM2OTRcdUM1N0RcIikpIHtcbiAgICAgICAgaW5kZXggKz0gMTtcbiAgICAgICAgd2hpbGUgKGluZGV4IDwgbGluZXMubGVuZ3RoICYmIGxpbmVzW2luZGV4XS50cmltKCkgPT09IFwiXCIpIHtcbiAgICAgICAgICBpbmRleCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgY2xlYW5lZC5wdXNoKGxpbmVzW2luZGV4XSk7XG4gICAgICBpbmRleCArPSAxO1xuICAgIH1cblxuICAgIHJldHVybiBjbGVhbmVkLmpvaW4oXCJcXG5cIikudHJpbSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBnZW5lcmF0ZVNlc3Npb25UaXRsZUZyb21RdWVzdGlvbihxdWVzdGlvbjogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCF0aGlzLnNlc3Npb25JZEVsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcHJvbXB0ID1cbiAgICAgIFwiXHVCMkU0XHVDNzRDIFx1QzlDOFx1QkIzOFx1Qzc0NCBcdUJDRjRcdUFDRTAgXHVDMTM4XHVDMTU4IFx1QzgxQ1x1QkFBOVx1Qzc0NCBcdUI5Q0NcdUI0RTRcdUM1QjQgXHVDOEZDXHVDMTM4XHVDNjk0LiBcIiArXG4gICAgICBcIlx1Qzg3MFx1QUM3NDogMTJ+MjBcdUM3OTAgXHVCMEI0XHVDNjc4XHVDNzU4IFx1QUMwNFx1QUNCMFx1RDU1QyBcdUM4MUNcdUJBQTksIFx1Qzc3NFx1QkFBOFx1QzlDMC9cdUI1MzBcdUM2MzRcdUQ0NUMgXHVBRTA4XHVDOUMwLCBcdUM4MUNcdUJBQTlcdUI5Q0MgXHVDRDlDXHVCODI1LlxcblxcblwiICtcbiAgICAgIGBcdUM5QzhcdUJCMzg6ICR7cXVlc3Rpb259YDtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCB0aXRsZSA9IGF3YWl0IHRoaXMucGx1Z2luLnJlcXVlc3RUaXRsZVJlcGx5KHByb21wdCk7XG4gICAgICBjb25zdCBjbGVhbmVkID0gdGhpcy5jbGVhblRpdGxlKHRpdGxlKTtcbiAgICAgIGlmIChjbGVhbmVkKSB7XG4gICAgICAgIHRoaXMuc2Vzc2lvbklkRWwudmFsdWUgPSBjbGVhbmVkO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiXHVDMTM4XHVDMTU4IFx1QzgxQ1x1QkFBOSBcdUMwRERcdUMxMzEgXHVDMkU0XHVEMzI4OlwiLCBlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBnZW5lcmF0ZVRpdGxlRm9yU2F2ZSgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IHRyYW5zY3JpcHQgPSB0aGlzLm1lc3NhZ2VzXG4gICAgICAubWFwKCh0dXJuKSA9PiB7XG4gICAgICAgIGNvbnN0IHJvbGVMYWJlbCA9XG4gICAgICAgICAgdHVybi5yb2xlID09PSBcInVzZXJcIiA/IFwiXHVDMEFDXHVDNkE5XHVDNzkwXCIgOlxuICAgICAgICAgIHR1cm4ucm9sZSA9PT0gXCJhc3Npc3RhbnRcIiA/IFwiXHVDNUI0XHVDMkRDXHVDMkE0XHVEMTM0XHVEMkI4XCIgOlxuICAgICAgICAgIFwiXHVDMkRDXHVDMkE0XHVEMTVDXCI7XG4gICAgICAgIHJldHVybiBgWyR7cm9sZUxhYmVsfV0gJHt0dXJuLmNvbnRlbnR9YDtcbiAgICAgIH0pXG4gICAgICAuam9pbihcIlxcblxcblwiKTtcblxuICAgIGNvbnN0IHByb21wdCA9XG4gICAgICBcIlx1QjJFNFx1Qzc0QyBcdUIzMDBcdUQ2NTQgXHVCMEI0XHVDNkE5XHVDNzQ0IFx1QkNGNFx1QUNFMCBcdUJCMzhcdUM3QTVcdUQ2MTUgXHVDODFDXHVCQUE5XHVDNzQ0IFx1QjlDQ1x1QjRFNFx1QzVCNCBcdUM4RkNcdUMxMzhcdUM2OTQuIFwiICtcbiAgICAgIFwiXHVDODcwXHVBQzc0OiAyMH40MFx1Qzc5MCBcdUIwQjRcdUM2NzgsIFx1Qzc3NFx1QkFBOFx1QzlDMC9cdUI1MzBcdUM2MzRcdUQ0NUMgXHVBRTA4XHVDOUMwLCBcdUM4MUNcdUJBQTlcdUI5Q0MgXHVDRDlDXHVCODI1LlxcblxcblwiICtcbiAgICAgIGBcdUIzMDBcdUQ2NTQ6XFxuJHt0cmFuc2NyaXB0fWA7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgdGl0bGUgPSBhd2FpdCB0aGlzLnBsdWdpbi5yZXF1ZXN0VGl0bGVSZXBseShwcm9tcHQpO1xuICAgICAgcmV0dXJuIHRoaXMuY2xlYW5UaXRsZSh0aXRsZSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJcdUM4MDBcdUM3QTVcdUM2QTkgXHVDODFDXHVCQUE5IFx1QzBERFx1QzEzMSBcdUMyRTRcdUQzMjg6XCIsIGVycm9yKTtcbiAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2xlYW5UaXRsZSh0aXRsZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGl0bGVcbiAgICAgIC5yZXBsYWNlKC9bXCInYF0vZywgXCJcIilcbiAgICAgIC5yZXBsYWNlKC9cXHMrL2csIFwiIFwiKVxuICAgICAgLnRyaW0oKTtcbiAgfVxufVxuIiwgIi8qKlxuICogXHVEMEE0XHVDNkNDXHVCNERDIFx1Q0Q5NFx1Q0Q5QyBcdUJBQThcdUI0QzhcbiAqIFxuICogXHVENTVDXHVBRDZEXHVDNUI0IFx1RDE0RFx1QzJBNFx1RDJCOFx1QzVEMFx1QzExQyBcdUQ1NzVcdUMyRUMgXHVEMEE0XHVDNkNDXHVCNERDXHVCOTdDIFx1Q0Q5NFx1Q0Q5Q1x1RDU2OVx1QjJDOFx1QjJFNC5cbiAqIGtpd2ktcmVzY3JpcHRcdUFDMDAgTm9kZS5qcyBcdUQ2NThcdUFDQkRcdUM1RDBcdUMxMUMgXHVCM0Q5XHVDNzkxXHVENTU4XHVDOUMwIFx1QzU0QVx1Qzc0NCBcdUMyMTggXHVDNzg4XHVDNzNDXHVCQkMwXHVCODVDLFxuICogXHVCMzAwXHVDNTQ4XHVDNzNDXHVCODVDIFx1QUMwNFx1QjJFOFx1RDU1QyBcdUFERENcdUNFNTkgXHVBRTMwXHVCQzE4IFx1RDBBNFx1QzZDQ1x1QjREQyBcdUNEOTRcdUNEOUNcdUM3NDQgXHVBRDZDXHVENjA0XHVENTY5XHVCMkM4XHVCMkU0LlxuICovXG5cbi8qKlxuICogXHVEMTREXHVDMkE0XHVEMkI4XHVDNUQwXHVDMTFDIFx1RDBBNFx1QzZDQ1x1QjREQ1x1Qjk3QyBcdUNEOTRcdUNEOUNcdUQ1NjlcdUIyQzhcdUIyRTRcbiAqIEBwYXJhbSB0ZXh0IFx1Qzc4NVx1QjgyNSBcdUQxNERcdUMyQTRcdUQyQjhcbiAqIEByZXR1cm5zIFx1Q0Q5NFx1Q0Q5Q1x1QjQxQyBcdUQwQTRcdUM2Q0NcdUI0REMgXHVCQzMwXHVDNUY0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0S2V5d29yZHModGV4dDogc3RyaW5nKTogc3RyaW5nW10ge1xuICBpZiAoIXRleHQgfHwgdGV4dC50cmltKCkubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgLy8gXHVBRTMwXHVCQ0Y4IFx1QzgwNFx1Q0M5OFx1QjlBQzogXHVEMkI5XHVDMjE4XHVCQjM4XHVDNzkwIFx1QzgxQ1x1QUM3MCBcdUJDMEYgXHVDMThDXHVCQjM4XHVDNzkwIFx1QkNDMFx1RDY1OFxuICBjb25zdCBjbGVhbmVkID0gdGV4dFxuICAgIC5yZXBsYWNlKC9bXlxcd1xcc1x1MzEzMS1cdTMxNEVcdTMxNEYtXHUzMTYzXHVBQzAwLVx1RDdBM10vZywgJyAnKVxuICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgLnRyaW0oKTtcblxuICAvLyBcdUIyRThcdUM1QjQgXHVCRDg0XHVCOUFDXG4gIGNvbnN0IHdvcmRzID0gY2xlYW5lZC5zcGxpdCgvXFxzKy8pLmZpbHRlcih3b3JkID0+IHdvcmQubGVuZ3RoID4gMSk7XG5cbiAgLy8gXHVCRDg4XHVDNkE5XHVDNUI0IFx1QzgxQ1x1QUM3MCAoXHVENTVDXHVBRDZEXHVDNUI0IFx1Qzc3Q1x1QkMxOFx1QzgwMVx1Qzc3OCBcdUJEODhcdUM2QTlcdUM1QjQpXG4gIGNvbnN0IHN0b3BXb3JkcyA9IG5ldyBTZXQoW1xuICAgICdcdUM3NzQnLCAnXHVBREY4JywgJ1x1QzgwMCcsICdcdUFDODMnLCAnXHVDMjE4JywgJ1x1QjRGMScsICdcdUI0RTQnLCAnXHVCQzBGJywgJ1x1Qzc0NCcsICdcdUI5N0MnLCAnXHVDNzc0XHVCOTdDJywgJ1x1QURGOFx1Qjk3QycsICdcdUM4MDBcdUI5N0MnLFxuICAgICdcdUM3NDAnLCAnXHVCMjk0JywgJ1x1Qzc3NFx1QjI5NCcsICdcdUFERjhcdUIyOTQnLCAnXHVDODAwXHVCMjk0JywgJ1x1QUMwMCcsICdcdUM1RDAnLCAnXHVDNzU4JywgJ1x1Qjg1QycsICdcdUM3M0NcdUI4NUMnLCAnXHVDNUQwXHVDMTFDJywgJ1x1QzY0MCcsICdcdUFDRkMnLFxuICAgICdcdUQ1NThcdUIyRTQnLCAnXHVDNzg4XHVCMkU0JywgJ1x1QjQxOFx1QjJFNCcsICdcdUM1NEFcdUIyRTQnLCAnXHVDNUM2XHVCMkU0JywgJ1x1QUMxOVx1QjJFNCcsICdcdUM3NzRcdUIyRTQnLCAnXHVDNTQ0XHVCMkM4XHVCMkU0JyxcbiAgICAnXHVENTU4XHVCMjk0JywgJ1x1Qzc4OFx1QjI5NCcsICdcdUI0MThcdUIyOTQnLCAnXHVENTU4XHVBQ0UwJywgJ1x1Qzc4OFx1QUNFMCcsICdcdUI0MThcdUFDRTAnLCAnXHVENTVDJywgJ1x1RDU1OFx1QkE3MCcsICdcdUM3ODhcdUM3M0NcdUJBNzAnLFxuICAgICdcdUQ1NjAnLCAnXHVDNzg4XHVDNzQ0JywgJ1x1QjQyMCcsICdcdUQ1NjlcdUIyQzhcdUIyRTQnLCAnXHVDNzg1XHVCMkM4XHVCMkU0JywgJ1x1QzJCNVx1QjJDOFx1QjJFNCcsXG4gICAgJ1x1QURGOFx1QjlBQ1x1QUNFMCcsICdcdUFERjhcdUI3RUNcdUIwOTgnLCAnXHVENTU4XHVDOUMwXHVCOUNDJywgJ1x1QjYxMFx1RDU1QycsICdcdUI2MTAnLCAnXHVCQzBGJywgJ1x1QjRGMScsXG4gICAgJ1x1QjU0Q1x1QkIzOCcsICdcdUFDQkRcdUM2QjAnLCAnXHVEMUI1XHVENTc0JywgJ1x1QjMwMFx1RDU1QycsICdcdUM3MDRcdUQ1NUMnLCAnXHVBRDAwXHVENTVDJywgJ1x1QjUzMFx1Qjk3OCcsXG4gICAgJ1x1QUM4MycsICdcdUM4MTAnLCAnXHVCNTRDJywgJ1x1QzkxMScsICdcdUIwQjQnLCAnXHVDNjc4J1xuICBdKTtcblxuICBjb25zdCBmaWx0ZXJlZCA9IHdvcmRzLmZpbHRlcih3b3JkID0+ICFzdG9wV29yZHMuaGFzKHdvcmQpICYmIHdvcmQubGVuZ3RoID49IDIpO1xuXG4gIC8vIFx1QkU0OFx1QjNDNFx1QzIxOCBcdUFDQzRcdUMwQjBcbiAgY29uc3QgZnJlcXVlbmN5ID0gbmV3IE1hcDxzdHJpbmcsIG51bWJlcj4oKTtcbiAgZm9yIChjb25zdCB3b3JkIG9mIGZpbHRlcmVkKSB7XG4gICAgZnJlcXVlbmN5LnNldCh3b3JkLCAoZnJlcXVlbmN5LmdldCh3b3JkKSB8fCAwKSArIDEpO1xuICB9XG5cbiAgLy8gXHVCRTQ4XHVCM0M0XHVDMjFDXHVDNzNDXHVCODVDIFx1QzgxNVx1QjgyQ1x1RDU1OFx1QzVFQyBcdUMwQzFcdUM3MDQgXHVEMEE0XHVDNkNDXHVCNERDIFx1QkMxOFx1RDY1OFxuICBjb25zdCBzb3J0ZWQgPSBBcnJheS5mcm9tKGZyZXF1ZW5jeS5lbnRyaWVzKCkpXG4gICAgLnNvcnQoKGEsIGIpID0+IGJbMV0gLSBhWzFdKVxuICAgIC5tYXAoKFt3b3JkXSkgPT4gd29yZCk7XG5cbiAgLy8gXHVDRDVDXHVCMzAwIDEwXHVBQzFDXHVBRTRDXHVDOUMwIFx1QkMxOFx1RDY1OFxuICByZXR1cm4gc29ydGVkLnNsaWNlKDAsIDEwKTtcbn1cblxuLyoqXG4gKiBcdUM1RUNcdUI3RUMgXHVEMTREXHVDMkE0XHVEMkI4XHVDNUQwXHVDMTFDIFx1QUNGNVx1RDFCNSBcdUQwQTRcdUM2Q0NcdUI0RENcdUI5N0MgXHVDRDk0XHVDRDlDXHVENTY5XHVCMkM4XHVCMkU0XG4gKiBAcGFyYW0gdGV4dHMgXHVEMTREXHVDMkE0XHVEMkI4IFx1QkMzMFx1QzVGNFxuICogQHJldHVybnMgXHVBQ0Y1XHVEMUI1IFx1RDBBNFx1QzZDQ1x1QjREQyBcdUJDMzBcdUM1RjRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RDb21tb25LZXl3b3Jkcyh0ZXh0czogc3RyaW5nW10pOiBzdHJpbmdbXSB7XG4gIGlmICh0ZXh0cy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICAvLyBcdUFDMDEgXHVEMTREXHVDMkE0XHVEMkI4XHVDNzU4IFx1RDBBNFx1QzZDQ1x1QjREQyBcdUNEOTRcdUNEOUNcbiAgY29uc3QgYWxsS2V5d29yZFNldHMgPSB0ZXh0cy5tYXAodGV4dCA9PiBuZXcgU2V0KGV4dHJhY3RLZXl3b3Jkcyh0ZXh0KSkpO1xuXG4gIGlmIChhbGxLZXl3b3JkU2V0cy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICAvLyBcdUJBQThcdUI0RTAgXHVEMTREXHVDMkE0XHVEMkI4XHVDNUQwIFx1QUNGNVx1RDFCNVx1QzczQ1x1Qjg1QyBcdUI0RjFcdUM3QTVcdUQ1NThcdUIyOTQgXHVEMEE0XHVDNkNDXHVCNERDIFx1Q0MzRVx1QUUzMFxuICBjb25zdCBjb21tb25LZXl3b3Jkczogc3RyaW5nW10gPSBbXTtcbiAgY29uc3QgZmlyc3RTZXQgPSBhbGxLZXl3b3JkU2V0c1swXTtcblxuICBmb3IgKGNvbnN0IGtleXdvcmQgb2YgZmlyc3RTZXQpIHtcbiAgICBpZiAoYWxsS2V5d29yZFNldHMuZXZlcnkoc2V0ID0+IHNldC5oYXMoa2V5d29yZCkpKSB7XG4gICAgICBjb21tb25LZXl3b3Jkcy5wdXNoKGtleXdvcmQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjb21tb25LZXl3b3Jkcztcbn1cblxuLyoqXG4gKiBcdUQwQTRcdUM2Q0NcdUI0RENcdUI5N0MgXHVCQTU0XHVEMEMwXHVCMzcwXHVDNzc0XHVEMTMwIFx1RDYxNVx1QzJERFx1QzczQ1x1Qjg1QyBcdUQzRUNcdUI5RjdcdUQzMDVcdUQ1NjlcdUIyQzhcdUIyRTRcbiAqIEBwYXJhbSBrZXl3b3JkcyBcdUQwQTRcdUM2Q0NcdUI0REMgXHVCQzMwXHVDNUY0XG4gKiBAcmV0dXJucyBcdUJBNTRcdUQwQzBcdUIzNzBcdUM3NzRcdUQxMzAgXHVCQjM4XHVDNzkwXHVDNUY0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRLZXl3b3Jkc01ldGFkYXRhKGtleXdvcmRzOiBzdHJpbmdbXSk6IHN0cmluZyB7XG4gIGlmIChrZXl3b3Jkcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbiAgcmV0dXJuIGBbS2V5d29yZHM6ICR7a2V5d29yZHMuam9pbignLCAnKX1dYDtcbn1cbiIsICIvKipcbiAqIENvbnRhaW5zIHRoZSBsaXN0IG9mIE9wZW5BUEkgZGF0YSB0eXBlc1xuICogYXMgZGVmaW5lZCBieSBodHRwczovL3N3YWdnZXIuaW8vZG9jcy9zcGVjaWZpY2F0aW9uL2RhdGEtbW9kZWxzL2RhdGEtdHlwZXMvXG4gKiBAcHVibGljXG4gKi9cbnZhciBTY2hlbWFUeXBlO1xuKGZ1bmN0aW9uIChTY2hlbWFUeXBlKSB7XG4gICAgLyoqIFN0cmluZyB0eXBlLiAqL1xuICAgIFNjaGVtYVR5cGVbXCJTVFJJTkdcIl0gPSBcInN0cmluZ1wiO1xuICAgIC8qKiBOdW1iZXIgdHlwZS4gKi9cbiAgICBTY2hlbWFUeXBlW1wiTlVNQkVSXCJdID0gXCJudW1iZXJcIjtcbiAgICAvKiogSW50ZWdlciB0eXBlLiAqL1xuICAgIFNjaGVtYVR5cGVbXCJJTlRFR0VSXCJdID0gXCJpbnRlZ2VyXCI7XG4gICAgLyoqIEJvb2xlYW4gdHlwZS4gKi9cbiAgICBTY2hlbWFUeXBlW1wiQk9PTEVBTlwiXSA9IFwiYm9vbGVhblwiO1xuICAgIC8qKiBBcnJheSB0eXBlLiAqL1xuICAgIFNjaGVtYVR5cGVbXCJBUlJBWVwiXSA9IFwiYXJyYXlcIjtcbiAgICAvKiogT2JqZWN0IHR5cGUuICovXG4gICAgU2NoZW1hVHlwZVtcIk9CSkVDVFwiXSA9IFwib2JqZWN0XCI7XG59KShTY2hlbWFUeXBlIHx8IChTY2hlbWFUeXBlID0ge30pKTtcblxuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMjQgR29vZ2xlIExMQ1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogQHB1YmxpY1xuICovXG52YXIgRXhlY3V0YWJsZUNvZGVMYW5ndWFnZTtcbihmdW5jdGlvbiAoRXhlY3V0YWJsZUNvZGVMYW5ndWFnZSkge1xuICAgIEV4ZWN1dGFibGVDb2RlTGFuZ3VhZ2VbXCJMQU5HVUFHRV9VTlNQRUNJRklFRFwiXSA9IFwibGFuZ3VhZ2VfdW5zcGVjaWZpZWRcIjtcbiAgICBFeGVjdXRhYmxlQ29kZUxhbmd1YWdlW1wiUFlUSE9OXCJdID0gXCJweXRob25cIjtcbn0pKEV4ZWN1dGFibGVDb2RlTGFuZ3VhZ2UgfHwgKEV4ZWN1dGFibGVDb2RlTGFuZ3VhZ2UgPSB7fSkpO1xuLyoqXG4gKiBQb3NzaWJsZSBvdXRjb21lcyBvZiBjb2RlIGV4ZWN1dGlvbi5cbiAqIEBwdWJsaWNcbiAqL1xudmFyIE91dGNvbWU7XG4oZnVuY3Rpb24gKE91dGNvbWUpIHtcbiAgICAvKipcbiAgICAgKiBVbnNwZWNpZmllZCBzdGF0dXMuIFRoaXMgdmFsdWUgc2hvdWxkIG5vdCBiZSB1c2VkLlxuICAgICAqL1xuICAgIE91dGNvbWVbXCJPVVRDT01FX1VOU1BFQ0lGSUVEXCJdID0gXCJvdXRjb21lX3Vuc3BlY2lmaWVkXCI7XG4gICAgLyoqXG4gICAgICogQ29kZSBleGVjdXRpb24gY29tcGxldGVkIHN1Y2Nlc3NmdWxseS5cbiAgICAgKi9cbiAgICBPdXRjb21lW1wiT1VUQ09NRV9PS1wiXSA9IFwib3V0Y29tZV9va1wiO1xuICAgIC8qKlxuICAgICAqIENvZGUgZXhlY3V0aW9uIGZpbmlzaGVkIGJ1dCB3aXRoIGEgZmFpbHVyZS4gYHN0ZGVycmAgc2hvdWxkIGNvbnRhaW4gdGhlXG4gICAgICogcmVhc29uLlxuICAgICAqL1xuICAgIE91dGNvbWVbXCJPVVRDT01FX0ZBSUxFRFwiXSA9IFwib3V0Y29tZV9mYWlsZWRcIjtcbiAgICAvKipcbiAgICAgKiBDb2RlIGV4ZWN1dGlvbiByYW4gZm9yIHRvbyBsb25nLCBhbmQgd2FzIGNhbmNlbGxlZC4gVGhlcmUgbWF5IG9yIG1heSBub3RcbiAgICAgKiBiZSBhIHBhcnRpYWwgb3V0cHV0IHByZXNlbnQuXG4gICAgICovXG4gICAgT3V0Y29tZVtcIk9VVENPTUVfREVBRExJTkVfRVhDRUVERURcIl0gPSBcIm91dGNvbWVfZGVhZGxpbmVfZXhjZWVkZWRcIjtcbn0pKE91dGNvbWUgfHwgKE91dGNvbWUgPSB7fSkpO1xuXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyNCBHb29nbGUgTExDXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBQb3NzaWJsZSByb2xlcy5cbiAqIEBwdWJsaWNcbiAqL1xuY29uc3QgUE9TU0lCTEVfUk9MRVMgPSBbXCJ1c2VyXCIsIFwibW9kZWxcIiwgXCJmdW5jdGlvblwiLCBcInN5c3RlbVwiXTtcbi8qKlxuICogSGFybSBjYXRlZ29yaWVzIHRoYXQgd291bGQgY2F1c2UgcHJvbXB0cyBvciBjYW5kaWRhdGVzIHRvIGJlIGJsb2NrZWQuXG4gKiBAcHVibGljXG4gKi9cbnZhciBIYXJtQ2F0ZWdvcnk7XG4oZnVuY3Rpb24gKEhhcm1DYXRlZ29yeSkge1xuICAgIEhhcm1DYXRlZ29yeVtcIkhBUk1fQ0FURUdPUllfVU5TUEVDSUZJRURcIl0gPSBcIkhBUk1fQ0FURUdPUllfVU5TUEVDSUZJRURcIjtcbiAgICBIYXJtQ2F0ZWdvcnlbXCJIQVJNX0NBVEVHT1JZX0hBVEVfU1BFRUNIXCJdID0gXCJIQVJNX0NBVEVHT1JZX0hBVEVfU1BFRUNIXCI7XG4gICAgSGFybUNhdGVnb3J5W1wiSEFSTV9DQVRFR09SWV9TRVhVQUxMWV9FWFBMSUNJVFwiXSA9IFwiSEFSTV9DQVRFR09SWV9TRVhVQUxMWV9FWFBMSUNJVFwiO1xuICAgIEhhcm1DYXRlZ29yeVtcIkhBUk1fQ0FURUdPUllfSEFSQVNTTUVOVFwiXSA9IFwiSEFSTV9DQVRFR09SWV9IQVJBU1NNRU5UXCI7XG4gICAgSGFybUNhdGVnb3J5W1wiSEFSTV9DQVRFR09SWV9EQU5HRVJPVVNfQ09OVEVOVFwiXSA9IFwiSEFSTV9DQVRFR09SWV9EQU5HRVJPVVNfQ09OVEVOVFwiO1xuICAgIEhhcm1DYXRlZ29yeVtcIkhBUk1fQ0FURUdPUllfQ0lWSUNfSU5URUdSSVRZXCJdID0gXCJIQVJNX0NBVEVHT1JZX0NJVklDX0lOVEVHUklUWVwiO1xufSkoSGFybUNhdGVnb3J5IHx8IChIYXJtQ2F0ZWdvcnkgPSB7fSkpO1xuLyoqXG4gKiBUaHJlc2hvbGQgYWJvdmUgd2hpY2ggYSBwcm9tcHQgb3IgY2FuZGlkYXRlIHdpbGwgYmUgYmxvY2tlZC5cbiAqIEBwdWJsaWNcbiAqL1xudmFyIEhhcm1CbG9ja1RocmVzaG9sZDtcbihmdW5jdGlvbiAoSGFybUJsb2NrVGhyZXNob2xkKSB7XG4gICAgLyoqIFRocmVzaG9sZCBpcyB1bnNwZWNpZmllZC4gKi9cbiAgICBIYXJtQmxvY2tUaHJlc2hvbGRbXCJIQVJNX0JMT0NLX1RIUkVTSE9MRF9VTlNQRUNJRklFRFwiXSA9IFwiSEFSTV9CTE9DS19USFJFU0hPTERfVU5TUEVDSUZJRURcIjtcbiAgICAvKiogQ29udGVudCB3aXRoIE5FR0xJR0lCTEUgd2lsbCBiZSBhbGxvd2VkLiAqL1xuICAgIEhhcm1CbG9ja1RocmVzaG9sZFtcIkJMT0NLX0xPV19BTkRfQUJPVkVcIl0gPSBcIkJMT0NLX0xPV19BTkRfQUJPVkVcIjtcbiAgICAvKiogQ29udGVudCB3aXRoIE5FR0xJR0lCTEUgYW5kIExPVyB3aWxsIGJlIGFsbG93ZWQuICovXG4gICAgSGFybUJsb2NrVGhyZXNob2xkW1wiQkxPQ0tfTUVESVVNX0FORF9BQk9WRVwiXSA9IFwiQkxPQ0tfTUVESVVNX0FORF9BQk9WRVwiO1xuICAgIC8qKiBDb250ZW50IHdpdGggTkVHTElHSUJMRSwgTE9XLCBhbmQgTUVESVVNIHdpbGwgYmUgYWxsb3dlZC4gKi9cbiAgICBIYXJtQmxvY2tUaHJlc2hvbGRbXCJCTE9DS19PTkxZX0hJR0hcIl0gPSBcIkJMT0NLX09OTFlfSElHSFwiO1xuICAgIC8qKiBBbGwgY29udGVudCB3aWxsIGJlIGFsbG93ZWQuICovXG4gICAgSGFybUJsb2NrVGhyZXNob2xkW1wiQkxPQ0tfTk9ORVwiXSA9IFwiQkxPQ0tfTk9ORVwiO1xufSkoSGFybUJsb2NrVGhyZXNob2xkIHx8IChIYXJtQmxvY2tUaHJlc2hvbGQgPSB7fSkpO1xuLyoqXG4gKiBQcm9iYWJpbGl0eSB0aGF0IGEgcHJvbXB0IG9yIGNhbmRpZGF0ZSBtYXRjaGVzIGEgaGFybSBjYXRlZ29yeS5cbiAqIEBwdWJsaWNcbiAqL1xudmFyIEhhcm1Qcm9iYWJpbGl0eTtcbihmdW5jdGlvbiAoSGFybVByb2JhYmlsaXR5KSB7XG4gICAgLyoqIFByb2JhYmlsaXR5IGlzIHVuc3BlY2lmaWVkLiAqL1xuICAgIEhhcm1Qcm9iYWJpbGl0eVtcIkhBUk1fUFJPQkFCSUxJVFlfVU5TUEVDSUZJRURcIl0gPSBcIkhBUk1fUFJPQkFCSUxJVFlfVU5TUEVDSUZJRURcIjtcbiAgICAvKiogQ29udGVudCBoYXMgYSBuZWdsaWdpYmxlIGNoYW5jZSBvZiBiZWluZyB1bnNhZmUuICovXG4gICAgSGFybVByb2JhYmlsaXR5W1wiTkVHTElHSUJMRVwiXSA9IFwiTkVHTElHSUJMRVwiO1xuICAgIC8qKiBDb250ZW50IGhhcyBhIGxvdyBjaGFuY2Ugb2YgYmVpbmcgdW5zYWZlLiAqL1xuICAgIEhhcm1Qcm9iYWJpbGl0eVtcIkxPV1wiXSA9IFwiTE9XXCI7XG4gICAgLyoqIENvbnRlbnQgaGFzIGEgbWVkaXVtIGNoYW5jZSBvZiBiZWluZyB1bnNhZmUuICovXG4gICAgSGFybVByb2JhYmlsaXR5W1wiTUVESVVNXCJdID0gXCJNRURJVU1cIjtcbiAgICAvKiogQ29udGVudCBoYXMgYSBoaWdoIGNoYW5jZSBvZiBiZWluZyB1bnNhZmUuICovXG4gICAgSGFybVByb2JhYmlsaXR5W1wiSElHSFwiXSA9IFwiSElHSFwiO1xufSkoSGFybVByb2JhYmlsaXR5IHx8IChIYXJtUHJvYmFiaWxpdHkgPSB7fSkpO1xuLyoqXG4gKiBSZWFzb24gdGhhdCBhIHByb21wdCB3YXMgYmxvY2tlZC5cbiAqIEBwdWJsaWNcbiAqL1xudmFyIEJsb2NrUmVhc29uO1xuKGZ1bmN0aW9uIChCbG9ja1JlYXNvbikge1xuICAgIC8vIEEgYmxvY2tlZCByZWFzb24gd2FzIG5vdCBzcGVjaWZpZWQuXG4gICAgQmxvY2tSZWFzb25bXCJCTE9DS0VEX1JFQVNPTl9VTlNQRUNJRklFRFwiXSA9IFwiQkxPQ0tFRF9SRUFTT05fVU5TUEVDSUZJRURcIjtcbiAgICAvLyBDb250ZW50IHdhcyBibG9ja2VkIGJ5IHNhZmV0eSBzZXR0aW5ncy5cbiAgICBCbG9ja1JlYXNvbltcIlNBRkVUWVwiXSA9IFwiU0FGRVRZXCI7XG4gICAgLy8gQ29udGVudCB3YXMgYmxvY2tlZCwgYnV0IHRoZSByZWFzb24gaXMgdW5jYXRlZ29yaXplZC5cbiAgICBCbG9ja1JlYXNvbltcIk9USEVSXCJdID0gXCJPVEhFUlwiO1xufSkoQmxvY2tSZWFzb24gfHwgKEJsb2NrUmVhc29uID0ge30pKTtcbi8qKlxuICogUmVhc29uIHRoYXQgYSBjYW5kaWRhdGUgZmluaXNoZWQuXG4gKiBAcHVibGljXG4gKi9cbnZhciBGaW5pc2hSZWFzb247XG4oZnVuY3Rpb24gKEZpbmlzaFJlYXNvbikge1xuICAgIC8vIERlZmF1bHQgdmFsdWUuIFRoaXMgdmFsdWUgaXMgdW51c2VkLlxuICAgIEZpbmlzaFJlYXNvbltcIkZJTklTSF9SRUFTT05fVU5TUEVDSUZJRURcIl0gPSBcIkZJTklTSF9SRUFTT05fVU5TUEVDSUZJRURcIjtcbiAgICAvLyBOYXR1cmFsIHN0b3AgcG9pbnQgb2YgdGhlIG1vZGVsIG9yIHByb3ZpZGVkIHN0b3Agc2VxdWVuY2UuXG4gICAgRmluaXNoUmVhc29uW1wiU1RPUFwiXSA9IFwiU1RPUFwiO1xuICAgIC8vIFRoZSBtYXhpbXVtIG51bWJlciBvZiB0b2tlbnMgYXMgc3BlY2lmaWVkIGluIHRoZSByZXF1ZXN0IHdhcyByZWFjaGVkLlxuICAgIEZpbmlzaFJlYXNvbltcIk1BWF9UT0tFTlNcIl0gPSBcIk1BWF9UT0tFTlNcIjtcbiAgICAvLyBUaGUgY2FuZGlkYXRlIGNvbnRlbnQgd2FzIGZsYWdnZWQgZm9yIHNhZmV0eSByZWFzb25zLlxuICAgIEZpbmlzaFJlYXNvbltcIlNBRkVUWVwiXSA9IFwiU0FGRVRZXCI7XG4gICAgLy8gVGhlIGNhbmRpZGF0ZSBjb250ZW50IHdhcyBmbGFnZ2VkIGZvciByZWNpdGF0aW9uIHJlYXNvbnMuXG4gICAgRmluaXNoUmVhc29uW1wiUkVDSVRBVElPTlwiXSA9IFwiUkVDSVRBVElPTlwiO1xuICAgIC8vIFRoZSBjYW5kaWRhdGUgY29udGVudCB3YXMgZmxhZ2dlZCBmb3IgdXNpbmcgYW4gdW5zdXBwb3J0ZWQgbGFuZ3VhZ2UuXG4gICAgRmluaXNoUmVhc29uW1wiTEFOR1VBR0VcIl0gPSBcIkxBTkdVQUdFXCI7XG4gICAgLy8gVG9rZW4gZ2VuZXJhdGlvbiBzdG9wcGVkIGJlY2F1c2UgdGhlIGNvbnRlbnQgY29udGFpbnMgZm9yYmlkZGVuIHRlcm1zLlxuICAgIEZpbmlzaFJlYXNvbltcIkJMT0NLTElTVFwiXSA9IFwiQkxPQ0tMSVNUXCI7XG4gICAgLy8gVG9rZW4gZ2VuZXJhdGlvbiBzdG9wcGVkIGZvciBwb3RlbnRpYWxseSBjb250YWluaW5nIHByb2hpYml0ZWQgY29udGVudC5cbiAgICBGaW5pc2hSZWFzb25bXCJQUk9ISUJJVEVEX0NPTlRFTlRcIl0gPSBcIlBST0hJQklURURfQ09OVEVOVFwiO1xuICAgIC8vIFRva2VuIGdlbmVyYXRpb24gc3RvcHBlZCBiZWNhdXNlIHRoZSBjb250ZW50IHBvdGVudGlhbGx5IGNvbnRhaW5zIFNlbnNpdGl2ZSBQZXJzb25hbGx5IElkZW50aWZpYWJsZSBJbmZvcm1hdGlvbiAoU1BJSSkuXG4gICAgRmluaXNoUmVhc29uW1wiU1BJSVwiXSA9IFwiU1BJSVwiO1xuICAgIC8vIFRoZSBmdW5jdGlvbiBjYWxsIGdlbmVyYXRlZCBieSB0aGUgbW9kZWwgaXMgaW52YWxpZC5cbiAgICBGaW5pc2hSZWFzb25bXCJNQUxGT1JNRURfRlVOQ1RJT05fQ0FMTFwiXSA9IFwiTUFMRk9STUVEX0ZVTkNUSU9OX0NBTExcIjtcbiAgICAvLyBVbmtub3duIHJlYXNvbi5cbiAgICBGaW5pc2hSZWFzb25bXCJPVEhFUlwiXSA9IFwiT1RIRVJcIjtcbn0pKEZpbmlzaFJlYXNvbiB8fCAoRmluaXNoUmVhc29uID0ge30pKTtcbi8qKlxuICogVGFzayB0eXBlIGZvciBlbWJlZGRpbmcgY29udGVudC5cbiAqIEBwdWJsaWNcbiAqL1xudmFyIFRhc2tUeXBlO1xuKGZ1bmN0aW9uIChUYXNrVHlwZSkge1xuICAgIFRhc2tUeXBlW1wiVEFTS19UWVBFX1VOU1BFQ0lGSUVEXCJdID0gXCJUQVNLX1RZUEVfVU5TUEVDSUZJRURcIjtcbiAgICBUYXNrVHlwZVtcIlJFVFJJRVZBTF9RVUVSWVwiXSA9IFwiUkVUUklFVkFMX1FVRVJZXCI7XG4gICAgVGFza1R5cGVbXCJSRVRSSUVWQUxfRE9DVU1FTlRcIl0gPSBcIlJFVFJJRVZBTF9ET0NVTUVOVFwiO1xuICAgIFRhc2tUeXBlW1wiU0VNQU5USUNfU0lNSUxBUklUWVwiXSA9IFwiU0VNQU5USUNfU0lNSUxBUklUWVwiO1xuICAgIFRhc2tUeXBlW1wiQ0xBU1NJRklDQVRJT05cIl0gPSBcIkNMQVNTSUZJQ0FUSU9OXCI7XG4gICAgVGFza1R5cGVbXCJDTFVTVEVSSU5HXCJdID0gXCJDTFVTVEVSSU5HXCI7XG59KShUYXNrVHlwZSB8fCAoVGFza1R5cGUgPSB7fSkpO1xuLyoqXG4gKiBAcHVibGljXG4gKi9cbnZhciBGdW5jdGlvbkNhbGxpbmdNb2RlO1xuKGZ1bmN0aW9uIChGdW5jdGlvbkNhbGxpbmdNb2RlKSB7XG4gICAgLy8gVW5zcGVjaWZpZWQgZnVuY3Rpb24gY2FsbGluZyBtb2RlLiBUaGlzIHZhbHVlIHNob3VsZCBub3QgYmUgdXNlZC5cbiAgICBGdW5jdGlvbkNhbGxpbmdNb2RlW1wiTU9ERV9VTlNQRUNJRklFRFwiXSA9IFwiTU9ERV9VTlNQRUNJRklFRFwiO1xuICAgIC8vIERlZmF1bHQgbW9kZWwgYmVoYXZpb3IsIG1vZGVsIGRlY2lkZXMgdG8gcHJlZGljdCBlaXRoZXIgYSBmdW5jdGlvbiBjYWxsXG4gICAgLy8gb3IgYSBuYXR1cmFsIGxhbmd1YWdlIHJlcHNwb3NlLlxuICAgIEZ1bmN0aW9uQ2FsbGluZ01vZGVbXCJBVVRPXCJdID0gXCJBVVRPXCI7XG4gICAgLy8gTW9kZWwgaXMgY29uc3RyYWluZWQgdG8gYWx3YXlzIHByZWRpY3RpbmcgYSBmdW5jdGlvbiBjYWxsIG9ubHkuXG4gICAgLy8gSWYgXCJhbGxvd2VkX2Z1bmN0aW9uX25hbWVzXCIgYXJlIHNldCwgdGhlIHByZWRpY3RlZCBmdW5jdGlvbiBjYWxsIHdpbGwgYmVcbiAgICAvLyBsaW1pdGVkIHRvIGFueSBvbmUgb2YgXCJhbGxvd2VkX2Z1bmN0aW9uX25hbWVzXCIsIGVsc2UgdGhlIHByZWRpY3RlZFxuICAgIC8vIGZ1bmN0aW9uIGNhbGwgd2lsbCBiZSBhbnkgb25lIG9mIHRoZSBwcm92aWRlZCBcImZ1bmN0aW9uX2RlY2xhcmF0aW9uc1wiLlxuICAgIEZ1bmN0aW9uQ2FsbGluZ01vZGVbXCJBTllcIl0gPSBcIkFOWVwiO1xuICAgIC8vIE1vZGVsIHdpbGwgbm90IHByZWRpY3QgYW55IGZ1bmN0aW9uIGNhbGwuIE1vZGVsIGJlaGF2aW9yIGlzIHNhbWUgYXMgd2hlblxuICAgIC8vIG5vdCBwYXNzaW5nIGFueSBmdW5jdGlvbiBkZWNsYXJhdGlvbnMuXG4gICAgRnVuY3Rpb25DYWxsaW5nTW9kZVtcIk5PTkVcIl0gPSBcIk5PTkVcIjtcbn0pKEZ1bmN0aW9uQ2FsbGluZ01vZGUgfHwgKEZ1bmN0aW9uQ2FsbGluZ01vZGUgPSB7fSkpO1xuLyoqXG4gKiBUaGUgbW9kZSBvZiB0aGUgcHJlZGljdG9yIHRvIGJlIHVzZWQgaW4gZHluYW1pYyByZXRyaWV2YWwuXG4gKiBAcHVibGljXG4gKi9cbnZhciBEeW5hbWljUmV0cmlldmFsTW9kZTtcbihmdW5jdGlvbiAoRHluYW1pY1JldHJpZXZhbE1vZGUpIHtcbiAgICAvLyBVbnNwZWNpZmllZCBmdW5jdGlvbiBjYWxsaW5nIG1vZGUuIFRoaXMgdmFsdWUgc2hvdWxkIG5vdCBiZSB1c2VkLlxuICAgIER5bmFtaWNSZXRyaWV2YWxNb2RlW1wiTU9ERV9VTlNQRUNJRklFRFwiXSA9IFwiTU9ERV9VTlNQRUNJRklFRFwiO1xuICAgIC8vIFJ1biByZXRyaWV2YWwgb25seSB3aGVuIHN5c3RlbSBkZWNpZGVzIGl0IGlzIG5lY2Vzc2FyeS5cbiAgICBEeW5hbWljUmV0cmlldmFsTW9kZVtcIk1PREVfRFlOQU1JQ1wiXSA9IFwiTU9ERV9EWU5BTUlDXCI7XG59KShEeW5hbWljUmV0cmlldmFsTW9kZSB8fCAoRHluYW1pY1JldHJpZXZhbE1vZGUgPSB7fSkpO1xuXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyNCBHb29nbGUgTExDXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBCYXNpYyBlcnJvciB0eXBlIGZvciB0aGlzIFNESy5cbiAqIEBwdWJsaWNcbiAqL1xuY2xhc3MgR29vZ2xlR2VuZXJhdGl2ZUFJRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSkge1xuICAgICAgICBzdXBlcihgW0dvb2dsZUdlbmVyYXRpdmVBSSBFcnJvcl06ICR7bWVzc2FnZX1gKTtcbiAgICB9XG59XG4vKipcbiAqIEVycm9ycyBpbiB0aGUgY29udGVudHMgb2YgYSByZXNwb25zZSBmcm9tIHRoZSBtb2RlbC4gVGhpcyBpbmNsdWRlcyBwYXJzaW5nXG4gKiBlcnJvcnMsIG9yIHJlc3BvbnNlcyBpbmNsdWRpbmcgYSBzYWZldHkgYmxvY2sgcmVhc29uLlxuICogQHB1YmxpY1xuICovXG5jbGFzcyBHb29nbGVHZW5lcmF0aXZlQUlSZXNwb25zZUVycm9yIGV4dGVuZHMgR29vZ2xlR2VuZXJhdGl2ZUFJRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIHJlc3BvbnNlKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gICAgfVxufVxuLyoqXG4gKiBFcnJvciBjbGFzcyBjb3ZlcmluZyBIVFRQIGVycm9ycyB3aGVuIGNhbGxpbmcgdGhlIHNlcnZlci4gSW5jbHVkZXMgSFRUUFxuICogc3RhdHVzLCBzdGF0dXNUZXh0LCBhbmQgb3B0aW9uYWwgZGV0YWlscywgaWYgcHJvdmlkZWQgaW4gdGhlIHNlcnZlciByZXNwb25zZS5cbiAqIEBwdWJsaWNcbiAqL1xuY2xhc3MgR29vZ2xlR2VuZXJhdGl2ZUFJRmV0Y2hFcnJvciBleHRlbmRzIEdvb2dsZUdlbmVyYXRpdmVBSUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBzdGF0dXMsIHN0YXR1c1RleHQsIGVycm9yRGV0YWlscykge1xuICAgICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gICAgICAgIHRoaXMuc3RhdHVzVGV4dCA9IHN0YXR1c1RleHQ7XG4gICAgICAgIHRoaXMuZXJyb3JEZXRhaWxzID0gZXJyb3JEZXRhaWxzO1xuICAgIH1cbn1cbi8qKlxuICogRXJyb3JzIGluIHRoZSBjb250ZW50cyBvZiBhIHJlcXVlc3Qgb3JpZ2luYXRpbmcgZnJvbSB1c2VyIGlucHV0LlxuICogQHB1YmxpY1xuICovXG5jbGFzcyBHb29nbGVHZW5lcmF0aXZlQUlSZXF1ZXN0SW5wdXRFcnJvciBleHRlbmRzIEdvb2dsZUdlbmVyYXRpdmVBSUVycm9yIHtcbn1cbi8qKlxuICogRXJyb3IgdGhyb3duIHdoZW4gYSByZXF1ZXN0IGlzIGFib3J0ZWQsIGVpdGhlciBkdWUgdG8gYSB0aW1lb3V0IG9yXG4gKiBpbnRlbnRpb25hbCBjYW5jZWxsYXRpb24gYnkgdGhlIHVzZXIuXG4gKiBAcHVibGljXG4gKi9cbmNsYXNzIEdvb2dsZUdlbmVyYXRpdmVBSUFib3J0RXJyb3IgZXh0ZW5kcyBHb29nbGVHZW5lcmF0aXZlQUlFcnJvciB7XG59XG5cbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDI0IEdvb2dsZSBMTENcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5jb25zdCBERUZBVUxUX0JBU0VfVVJMID0gXCJodHRwczovL2dlbmVyYXRpdmVsYW5ndWFnZS5nb29nbGVhcGlzLmNvbVwiO1xuY29uc3QgREVGQVVMVF9BUElfVkVSU0lPTiA9IFwidjFiZXRhXCI7XG4vKipcbiAqIFdlIGNhbid0IGByZXF1aXJlYCBwYWNrYWdlLmpzb24gaWYgdGhpcyBydW5zIG9uIHdlYi4gV2Ugd2lsbCB1c2Ugcm9sbHVwIHRvXG4gKiBzd2FwIGluIHRoZSB2ZXJzaW9uIG51bWJlciBoZXJlIGF0IGJ1aWxkIHRpbWUuXG4gKi9cbmNvbnN0IFBBQ0tBR0VfVkVSU0lPTiA9IFwiMC4yNC4xXCI7XG5jb25zdCBQQUNLQUdFX0xPR19IRUFERVIgPSBcImdlbmFpLWpzXCI7XG52YXIgVGFzaztcbihmdW5jdGlvbiAoVGFzaykge1xuICAgIFRhc2tbXCJHRU5FUkFURV9DT05URU5UXCJdID0gXCJnZW5lcmF0ZUNvbnRlbnRcIjtcbiAgICBUYXNrW1wiU1RSRUFNX0dFTkVSQVRFX0NPTlRFTlRcIl0gPSBcInN0cmVhbUdlbmVyYXRlQ29udGVudFwiO1xuICAgIFRhc2tbXCJDT1VOVF9UT0tFTlNcIl0gPSBcImNvdW50VG9rZW5zXCI7XG4gICAgVGFza1tcIkVNQkVEX0NPTlRFTlRcIl0gPSBcImVtYmVkQ29udGVudFwiO1xuICAgIFRhc2tbXCJCQVRDSF9FTUJFRF9DT05URU5UU1wiXSA9IFwiYmF0Y2hFbWJlZENvbnRlbnRzXCI7XG59KShUYXNrIHx8IChUYXNrID0ge30pKTtcbmNsYXNzIFJlcXVlc3RVcmwge1xuICAgIGNvbnN0cnVjdG9yKG1vZGVsLCB0YXNrLCBhcGlLZXksIHN0cmVhbSwgcmVxdWVzdE9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgICAgICB0aGlzLnRhc2sgPSB0YXNrO1xuICAgICAgICB0aGlzLmFwaUtleSA9IGFwaUtleTtcbiAgICAgICAgdGhpcy5zdHJlYW0gPSBzdHJlYW07XG4gICAgICAgIHRoaXMucmVxdWVzdE9wdGlvbnMgPSByZXF1ZXN0T3B0aW9ucztcbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGNvbnN0IGFwaVZlcnNpb24gPSAoKF9hID0gdGhpcy5yZXF1ZXN0T3B0aW9ucykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmFwaVZlcnNpb24pIHx8IERFRkFVTFRfQVBJX1ZFUlNJT047XG4gICAgICAgIGNvbnN0IGJhc2VVcmwgPSAoKF9iID0gdGhpcy5yZXF1ZXN0T3B0aW9ucykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmJhc2VVcmwpIHx8IERFRkFVTFRfQkFTRV9VUkw7XG4gICAgICAgIGxldCB1cmwgPSBgJHtiYXNlVXJsfS8ke2FwaVZlcnNpb259LyR7dGhpcy5tb2RlbH06JHt0aGlzLnRhc2t9YDtcbiAgICAgICAgaWYgKHRoaXMuc3RyZWFtKSB7XG4gICAgICAgICAgICB1cmwgKz0gXCI/YWx0PXNzZVwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgfVxufVxuLyoqXG4gKiBTaW1wbGUsIGJ1dCBtYXkgYmVjb21lIG1vcmUgY29tcGxleCBpZiB3ZSBhZGQgbW9yZSB2ZXJzaW9ucyB0byBsb2cuXG4gKi9cbmZ1bmN0aW9uIGdldENsaWVudEhlYWRlcnMocmVxdWVzdE9wdGlvbnMpIHtcbiAgICBjb25zdCBjbGllbnRIZWFkZXJzID0gW107XG4gICAgaWYgKHJlcXVlc3RPcHRpb25zID09PSBudWxsIHx8IHJlcXVlc3RPcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiByZXF1ZXN0T3B0aW9ucy5hcGlDbGllbnQpIHtcbiAgICAgICAgY2xpZW50SGVhZGVycy5wdXNoKHJlcXVlc3RPcHRpb25zLmFwaUNsaWVudCk7XG4gICAgfVxuICAgIGNsaWVudEhlYWRlcnMucHVzaChgJHtQQUNLQUdFX0xPR19IRUFERVJ9LyR7UEFDS0FHRV9WRVJTSU9OfWApO1xuICAgIHJldHVybiBjbGllbnRIZWFkZXJzLmpvaW4oXCIgXCIpO1xufVxuYXN5bmMgZnVuY3Rpb24gZ2V0SGVhZGVycyh1cmwpIHtcbiAgICB2YXIgX2E7XG4gICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gICAgaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICAgIGhlYWRlcnMuYXBwZW5kKFwieC1nb29nLWFwaS1jbGllbnRcIiwgZ2V0Q2xpZW50SGVhZGVycyh1cmwucmVxdWVzdE9wdGlvbnMpKTtcbiAgICBoZWFkZXJzLmFwcGVuZChcIngtZ29vZy1hcGkta2V5XCIsIHVybC5hcGlLZXkpO1xuICAgIGxldCBjdXN0b21IZWFkZXJzID0gKF9hID0gdXJsLnJlcXVlc3RPcHRpb25zKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY3VzdG9tSGVhZGVycztcbiAgICBpZiAoY3VzdG9tSGVhZGVycykge1xuICAgICAgICBpZiAoIShjdXN0b21IZWFkZXJzIGluc3RhbmNlb2YgSGVhZGVycykpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY3VzdG9tSGVhZGVycyA9IG5ldyBIZWFkZXJzKGN1c3RvbUhlYWRlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgR29vZ2xlR2VuZXJhdGl2ZUFJUmVxdWVzdElucHV0RXJyb3IoYHVuYWJsZSB0byBjb252ZXJ0IGN1c3RvbUhlYWRlcnMgdmFsdWUgJHtKU09OLnN0cmluZ2lmeShjdXN0b21IZWFkZXJzKX0gdG8gSGVhZGVyczogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBbaGVhZGVyTmFtZSwgaGVhZGVyVmFsdWVdIG9mIGN1c3RvbUhlYWRlcnMuZW50cmllcygpKSB7XG4gICAgICAgICAgICBpZiAoaGVhZGVyTmFtZSA9PT0gXCJ4LWdvb2ctYXBpLWtleVwiKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEdvb2dsZUdlbmVyYXRpdmVBSVJlcXVlc3RJbnB1dEVycm9yKGBDYW5ub3Qgc2V0IHJlc2VydmVkIGhlYWRlciBuYW1lICR7aGVhZGVyTmFtZX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGhlYWRlck5hbWUgPT09IFwieC1nb29nLWFwaS1jbGllbnRcIikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBHb29nbGVHZW5lcmF0aXZlQUlSZXF1ZXN0SW5wdXRFcnJvcihgSGVhZGVyIG5hbWUgJHtoZWFkZXJOYW1lfSBjYW4gb25seSBiZSBzZXQgdXNpbmcgdGhlIGFwaUNsaWVudCBmaWVsZGApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaGVhZGVycy5hcHBlbmQoaGVhZGVyTmFtZSwgaGVhZGVyVmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBoZWFkZXJzO1xufVxuYXN5bmMgZnVuY3Rpb24gY29uc3RydWN0TW9kZWxSZXF1ZXN0KG1vZGVsLCB0YXNrLCBhcGlLZXksIHN0cmVhbSwgYm9keSwgcmVxdWVzdE9wdGlvbnMpIHtcbiAgICBjb25zdCB1cmwgPSBuZXcgUmVxdWVzdFVybChtb2RlbCwgdGFzaywgYXBpS2V5LCBzdHJlYW0sIHJlcXVlc3RPcHRpb25zKTtcbiAgICByZXR1cm4ge1xuICAgICAgICB1cmw6IHVybC50b1N0cmluZygpLFxuICAgICAgICBmZXRjaE9wdGlvbnM6IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgYnVpbGRGZXRjaE9wdGlvbnMocmVxdWVzdE9wdGlvbnMpKSwgeyBtZXRob2Q6IFwiUE9TVFwiLCBoZWFkZXJzOiBhd2FpdCBnZXRIZWFkZXJzKHVybCksIGJvZHkgfSksXG4gICAgfTtcbn1cbmFzeW5jIGZ1bmN0aW9uIG1ha2VNb2RlbFJlcXVlc3QobW9kZWwsIHRhc2ssIGFwaUtleSwgc3RyZWFtLCBib2R5LCByZXF1ZXN0T3B0aW9ucyA9IHt9LCBcbi8vIEFsbG93cyB0aGlzIHRvIGJlIHN0dWJiZWQgZm9yIHRlc3RzXG5mZXRjaEZuID0gZmV0Y2gpIHtcbiAgICBjb25zdCB7IHVybCwgZmV0Y2hPcHRpb25zIH0gPSBhd2FpdCBjb25zdHJ1Y3RNb2RlbFJlcXVlc3QobW9kZWwsIHRhc2ssIGFwaUtleSwgc3RyZWFtLCBib2R5LCByZXF1ZXN0T3B0aW9ucyk7XG4gICAgcmV0dXJuIG1ha2VSZXF1ZXN0KHVybCwgZmV0Y2hPcHRpb25zLCBmZXRjaEZuKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIG1ha2VSZXF1ZXN0KHVybCwgZmV0Y2hPcHRpb25zLCBmZXRjaEZuID0gZmV0Y2gpIHtcbiAgICBsZXQgcmVzcG9uc2U7XG4gICAgdHJ5IHtcbiAgICAgICAgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEZuKHVybCwgZmV0Y2hPcHRpb25zKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgaGFuZGxlUmVzcG9uc2VFcnJvcihlLCB1cmwpO1xuICAgIH1cbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIGF3YWl0IGhhbmRsZVJlc3BvbnNlTm90T2socmVzcG9uc2UsIHVybCk7XG4gICAgfVxuICAgIHJldHVybiByZXNwb25zZTtcbn1cbmZ1bmN0aW9uIGhhbmRsZVJlc3BvbnNlRXJyb3IoZSwgdXJsKSB7XG4gICAgbGV0IGVyciA9IGU7XG4gICAgaWYgKGVyci5uYW1lID09PSBcIkFib3J0RXJyb3JcIikge1xuICAgICAgICBlcnIgPSBuZXcgR29vZ2xlR2VuZXJhdGl2ZUFJQWJvcnRFcnJvcihgUmVxdWVzdCBhYm9ydGVkIHdoZW4gZmV0Y2hpbmcgJHt1cmwudG9TdHJpbmcoKX06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICBlcnIuc3RhY2sgPSBlLnN0YWNrO1xuICAgIH1cbiAgICBlbHNlIGlmICghKGUgaW5zdGFuY2VvZiBHb29nbGVHZW5lcmF0aXZlQUlGZXRjaEVycm9yIHx8XG4gICAgICAgIGUgaW5zdGFuY2VvZiBHb29nbGVHZW5lcmF0aXZlQUlSZXF1ZXN0SW5wdXRFcnJvcikpIHtcbiAgICAgICAgZXJyID0gbmV3IEdvb2dsZUdlbmVyYXRpdmVBSUVycm9yKGBFcnJvciBmZXRjaGluZyBmcm9tICR7dXJsLnRvU3RyaW5nKCl9OiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgZXJyLnN0YWNrID0gZS5zdGFjaztcbiAgICB9XG4gICAgdGhyb3cgZXJyO1xufVxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlUmVzcG9uc2VOb3RPayhyZXNwb25zZSwgdXJsKSB7XG4gICAgbGV0IG1lc3NhZ2UgPSBcIlwiO1xuICAgIGxldCBlcnJvckRldGFpbHM7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QganNvbiA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgbWVzc2FnZSA9IGpzb24uZXJyb3IubWVzc2FnZTtcbiAgICAgICAgaWYgKGpzb24uZXJyb3IuZGV0YWlscykge1xuICAgICAgICAgICAgbWVzc2FnZSArPSBgICR7SlNPTi5zdHJpbmdpZnkoanNvbi5lcnJvci5kZXRhaWxzKX1gO1xuICAgICAgICAgICAgZXJyb3JEZXRhaWxzID0ganNvbi5lcnJvci5kZXRhaWxzO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlnbm9yZWRcbiAgICB9XG4gICAgdGhyb3cgbmV3IEdvb2dsZUdlbmVyYXRpdmVBSUZldGNoRXJyb3IoYEVycm9yIGZldGNoaW5nIGZyb20gJHt1cmwudG9TdHJpbmcoKX06IFske3Jlc3BvbnNlLnN0YXR1c30gJHtyZXNwb25zZS5zdGF0dXNUZXh0fV0gJHttZXNzYWdlfWAsIHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2Uuc3RhdHVzVGV4dCwgZXJyb3JEZXRhaWxzKTtcbn1cbi8qKlxuICogR2VuZXJhdGVzIHRoZSByZXF1ZXN0IG9wdGlvbnMgdG8gYmUgcGFzc2VkIHRvIHRoZSBmZXRjaCBBUEkuXG4gKiBAcGFyYW0gcmVxdWVzdE9wdGlvbnMgLSBUaGUgdXNlci1kZWZpbmVkIHJlcXVlc3Qgb3B0aW9ucy5cbiAqIEByZXR1cm5zIFRoZSBnZW5lcmF0ZWQgcmVxdWVzdCBvcHRpb25zLlxuICovXG5mdW5jdGlvbiBidWlsZEZldGNoT3B0aW9ucyhyZXF1ZXN0T3B0aW9ucykge1xuICAgIGNvbnN0IGZldGNoT3B0aW9ucyA9IHt9O1xuICAgIGlmICgocmVxdWVzdE9wdGlvbnMgPT09IG51bGwgfHwgcmVxdWVzdE9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJlcXVlc3RPcHRpb25zLnNpZ25hbCkgIT09IHVuZGVmaW5lZCB8fCAocmVxdWVzdE9wdGlvbnMgPT09IG51bGwgfHwgcmVxdWVzdE9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJlcXVlc3RPcHRpb25zLnRpbWVvdXQpID49IDApIHtcbiAgICAgICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICAgICAgaWYgKChyZXF1ZXN0T3B0aW9ucyA9PT0gbnVsbCB8fCByZXF1ZXN0T3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmVxdWVzdE9wdGlvbnMudGltZW91dCkgPj0gMCkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBjb250cm9sbGVyLmFib3J0KCksIHJlcXVlc3RPcHRpb25zLnRpbWVvdXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXF1ZXN0T3B0aW9ucyA9PT0gbnVsbCB8fCByZXF1ZXN0T3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmVxdWVzdE9wdGlvbnMuc2lnbmFsKSB7XG4gICAgICAgICAgICByZXF1ZXN0T3B0aW9ucy5zaWduYWwuYWRkRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyLmFib3J0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmZXRjaE9wdGlvbnMuc2lnbmFsID0gY29udHJvbGxlci5zaWduYWw7XG4gICAgfVxuICAgIHJldHVybiBmZXRjaE9wdGlvbnM7XG59XG5cbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDI0IEdvb2dsZSBMTENcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIEFkZHMgY29udmVuaWVuY2UgaGVscGVyIG1ldGhvZHMgdG8gYSByZXNwb25zZSBvYmplY3QsIGluY2x1ZGluZyBzdHJlYW1cbiAqIGNodW5rcyAoYXMgbG9uZyBhcyBlYWNoIGNodW5rIGlzIGEgY29tcGxldGUgR2VuZXJhdGVDb250ZW50UmVzcG9uc2UgSlNPTikuXG4gKi9cbmZ1bmN0aW9uIGFkZEhlbHBlcnMocmVzcG9uc2UpIHtcbiAgICByZXNwb25zZS50ZXh0ID0gKCkgPT4ge1xuICAgICAgICBpZiAocmVzcG9uc2UuY2FuZGlkYXRlcyAmJiByZXNwb25zZS5jYW5kaWRhdGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5jYW5kaWRhdGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFRoaXMgcmVzcG9uc2UgaGFkICR7cmVzcG9uc2UuY2FuZGlkYXRlcy5sZW5ndGh9IGAgK1xuICAgICAgICAgICAgICAgICAgICBgY2FuZGlkYXRlcy4gUmV0dXJuaW5nIHRleHQgZnJvbSB0aGUgZmlyc3QgY2FuZGlkYXRlIG9ubHkuIGAgK1xuICAgICAgICAgICAgICAgICAgICBgQWNjZXNzIHJlc3BvbnNlLmNhbmRpZGF0ZXMgZGlyZWN0bHkgdG8gdXNlIHRoZSBvdGhlciBjYW5kaWRhdGVzLmApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGhhZEJhZEZpbmlzaFJlYXNvbihyZXNwb25zZS5jYW5kaWRhdGVzWzBdKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBHb29nbGVHZW5lcmF0aXZlQUlSZXNwb25zZUVycm9yKGAke2Zvcm1hdEJsb2NrRXJyb3JNZXNzYWdlKHJlc3BvbnNlKX1gLCByZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZ2V0VGV4dChyZXNwb25zZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocmVzcG9uc2UucHJvbXB0RmVlZGJhY2spIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBHb29nbGVHZW5lcmF0aXZlQUlSZXNwb25zZUVycm9yKGBUZXh0IG5vdCBhdmFpbGFibGUuICR7Zm9ybWF0QmxvY2tFcnJvck1lc3NhZ2UocmVzcG9uc2UpfWAsIHJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRPRE86IHJlbW92ZSBhdCBuZXh0IG1ham9yIHZlcnNpb25cbiAgICAgKi9cbiAgICByZXNwb25zZS5mdW5jdGlvbkNhbGwgPSAoKSA9PiB7XG4gICAgICAgIGlmIChyZXNwb25zZS5jYW5kaWRhdGVzICYmIHJlc3BvbnNlLmNhbmRpZGF0ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmNhbmRpZGF0ZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgVGhpcyByZXNwb25zZSBoYWQgJHtyZXNwb25zZS5jYW5kaWRhdGVzLmxlbmd0aH0gYCArXG4gICAgICAgICAgICAgICAgICAgIGBjYW5kaWRhdGVzLiBSZXR1cm5pbmcgZnVuY3Rpb24gY2FsbHMgZnJvbSB0aGUgZmlyc3QgY2FuZGlkYXRlIG9ubHkuIGAgK1xuICAgICAgICAgICAgICAgICAgICBgQWNjZXNzIHJlc3BvbnNlLmNhbmRpZGF0ZXMgZGlyZWN0bHkgdG8gdXNlIHRoZSBvdGhlciBjYW5kaWRhdGVzLmApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGhhZEJhZEZpbmlzaFJlYXNvbihyZXNwb25zZS5jYW5kaWRhdGVzWzBdKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBHb29nbGVHZW5lcmF0aXZlQUlSZXNwb25zZUVycm9yKGAke2Zvcm1hdEJsb2NrRXJyb3JNZXNzYWdlKHJlc3BvbnNlKX1gLCByZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYHJlc3BvbnNlLmZ1bmN0aW9uQ2FsbCgpIGlzIGRlcHJlY2F0ZWQuIGAgK1xuICAgICAgICAgICAgICAgIGBVc2UgcmVzcG9uc2UuZnVuY3Rpb25DYWxscygpIGluc3RlYWQuYCk7XG4gICAgICAgICAgICByZXR1cm4gZ2V0RnVuY3Rpb25DYWxscyhyZXNwb25zZSlbMF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocmVzcG9uc2UucHJvbXB0RmVlZGJhY2spIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBHb29nbGVHZW5lcmF0aXZlQUlSZXNwb25zZUVycm9yKGBGdW5jdGlvbiBjYWxsIG5vdCBhdmFpbGFibGUuICR7Zm9ybWF0QmxvY2tFcnJvck1lc3NhZ2UocmVzcG9uc2UpfWAsIHJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgcmVzcG9uc2UuZnVuY3Rpb25DYWxscyA9ICgpID0+IHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLmNhbmRpZGF0ZXMgJiYgcmVzcG9uc2UuY2FuZGlkYXRlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuY2FuZGlkYXRlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBUaGlzIHJlc3BvbnNlIGhhZCAke3Jlc3BvbnNlLmNhbmRpZGF0ZXMubGVuZ3RofSBgICtcbiAgICAgICAgICAgICAgICAgICAgYGNhbmRpZGF0ZXMuIFJldHVybmluZyBmdW5jdGlvbiBjYWxscyBmcm9tIHRoZSBmaXJzdCBjYW5kaWRhdGUgb25seS4gYCArXG4gICAgICAgICAgICAgICAgICAgIGBBY2Nlc3MgcmVzcG9uc2UuY2FuZGlkYXRlcyBkaXJlY3RseSB0byB1c2UgdGhlIG90aGVyIGNhbmRpZGF0ZXMuYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaGFkQmFkRmluaXNoUmVhc29uKHJlc3BvbnNlLmNhbmRpZGF0ZXNbMF0pKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEdvb2dsZUdlbmVyYXRpdmVBSVJlc3BvbnNlRXJyb3IoYCR7Zm9ybWF0QmxvY2tFcnJvck1lc3NhZ2UocmVzcG9uc2UpfWAsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBnZXRGdW5jdGlvbkNhbGxzKHJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChyZXNwb25zZS5wcm9tcHRGZWVkYmFjaykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEdvb2dsZUdlbmVyYXRpdmVBSVJlc3BvbnNlRXJyb3IoYEZ1bmN0aW9uIGNhbGwgbm90IGF2YWlsYWJsZS4gJHtmb3JtYXRCbG9ja0Vycm9yTWVzc2FnZShyZXNwb25zZSl9YCwgcmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICByZXR1cm4gcmVzcG9uc2U7XG59XG4vKipcbiAqIFJldHVybnMgYWxsIHRleHQgZm91bmQgaW4gYWxsIHBhcnRzIG9mIGZpcnN0IGNhbmRpZGF0ZS5cbiAqL1xuZnVuY3Rpb24gZ2V0VGV4dChyZXNwb25zZSkge1xuICAgIHZhciBfYSwgX2IsIF9jLCBfZDtcbiAgICBjb25zdCB0ZXh0U3RyaW5ncyA9IFtdO1xuICAgIGlmICgoX2IgPSAoX2EgPSByZXNwb25zZS5jYW5kaWRhdGVzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbMF0uY29udGVudCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnBhcnRzKSB7XG4gICAgICAgIGZvciAoY29uc3QgcGFydCBvZiAoX2QgPSAoX2MgPSByZXNwb25zZS5jYW5kaWRhdGVzKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2NbMF0uY29udGVudCkgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLnBhcnRzKSB7XG4gICAgICAgICAgICBpZiAocGFydC50ZXh0KSB7XG4gICAgICAgICAgICAgICAgdGV4dFN0cmluZ3MucHVzaChwYXJ0LnRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBhcnQuZXhlY3V0YWJsZUNvZGUpIHtcbiAgICAgICAgICAgICAgICB0ZXh0U3RyaW5ncy5wdXNoKFwiXFxuYGBgXCIgK1xuICAgICAgICAgICAgICAgICAgICBwYXJ0LmV4ZWN1dGFibGVDb2RlLmxhbmd1YWdlICtcbiAgICAgICAgICAgICAgICAgICAgXCJcXG5cIiArXG4gICAgICAgICAgICAgICAgICAgIHBhcnQuZXhlY3V0YWJsZUNvZGUuY29kZSArXG4gICAgICAgICAgICAgICAgICAgIFwiXFxuYGBgXFxuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBhcnQuY29kZUV4ZWN1dGlvblJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHRleHRTdHJpbmdzLnB1c2goXCJcXG5gYGBcXG5cIiArIHBhcnQuY29kZUV4ZWN1dGlvblJlc3VsdC5vdXRwdXQgKyBcIlxcbmBgYFxcblwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAodGV4dFN0cmluZ3MubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gdGV4dFN0cmluZ3Muam9pbihcIlwiKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cbn1cbi8qKlxuICogUmV0dXJucyBmdW5jdGlvbkNhbGwgb2YgZmlyc3QgY2FuZGlkYXRlLlxuICovXG5mdW5jdGlvbiBnZXRGdW5jdGlvbkNhbGxzKHJlc3BvbnNlKSB7XG4gICAgdmFyIF9hLCBfYiwgX2MsIF9kO1xuICAgIGNvbnN0IGZ1bmN0aW9uQ2FsbHMgPSBbXTtcbiAgICBpZiAoKF9iID0gKF9hID0gcmVzcG9uc2UuY2FuZGlkYXRlcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hWzBdLmNvbnRlbnQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5wYXJ0cykge1xuICAgICAgICBmb3IgKGNvbnN0IHBhcnQgb2YgKF9kID0gKF9jID0gcmVzcG9uc2UuY2FuZGlkYXRlcykgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jWzBdLmNvbnRlbnQpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5wYXJ0cykge1xuICAgICAgICAgICAgaWYgKHBhcnQuZnVuY3Rpb25DYWxsKSB7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb25DYWxscy5wdXNoKHBhcnQuZnVuY3Rpb25DYWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoZnVuY3Rpb25DYWxscy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbkNhbGxzO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG59XG5jb25zdCBiYWRGaW5pc2hSZWFzb25zID0gW1xuICAgIEZpbmlzaFJlYXNvbi5SRUNJVEFUSU9OLFxuICAgIEZpbmlzaFJlYXNvbi5TQUZFVFksXG4gICAgRmluaXNoUmVhc29uLkxBTkdVQUdFLFxuXTtcbmZ1bmN0aW9uIGhhZEJhZEZpbmlzaFJlYXNvbihjYW5kaWRhdGUpIHtcbiAgICByZXR1cm4gKCEhY2FuZGlkYXRlLmZpbmlzaFJlYXNvbiAmJlxuICAgICAgICBiYWRGaW5pc2hSZWFzb25zLmluY2x1ZGVzKGNhbmRpZGF0ZS5maW5pc2hSZWFzb24pKTtcbn1cbmZ1bmN0aW9uIGZvcm1hdEJsb2NrRXJyb3JNZXNzYWdlKHJlc3BvbnNlKSB7XG4gICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgbGV0IG1lc3NhZ2UgPSBcIlwiO1xuICAgIGlmICgoIXJlc3BvbnNlLmNhbmRpZGF0ZXMgfHwgcmVzcG9uc2UuY2FuZGlkYXRlcy5sZW5ndGggPT09IDApICYmXG4gICAgICAgIHJlc3BvbnNlLnByb21wdEZlZWRiYWNrKSB7XG4gICAgICAgIG1lc3NhZ2UgKz0gXCJSZXNwb25zZSB3YXMgYmxvY2tlZFwiO1xuICAgICAgICBpZiAoKF9hID0gcmVzcG9uc2UucHJvbXB0RmVlZGJhY2spID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5ibG9ja1JlYXNvbikge1xuICAgICAgICAgICAgbWVzc2FnZSArPSBgIGR1ZSB0byAke3Jlc3BvbnNlLnByb21wdEZlZWRiYWNrLmJsb2NrUmVhc29ufWA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChfYiA9IHJlc3BvbnNlLnByb21wdEZlZWRiYWNrKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuYmxvY2tSZWFzb25NZXNzYWdlKSB7XG4gICAgICAgICAgICBtZXNzYWdlICs9IGA6ICR7cmVzcG9uc2UucHJvbXB0RmVlZGJhY2suYmxvY2tSZWFzb25NZXNzYWdlfWA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoKF9jID0gcmVzcG9uc2UuY2FuZGlkYXRlcykgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jWzBdKSB7XG4gICAgICAgIGNvbnN0IGZpcnN0Q2FuZGlkYXRlID0gcmVzcG9uc2UuY2FuZGlkYXRlc1swXTtcbiAgICAgICAgaWYgKGhhZEJhZEZpbmlzaFJlYXNvbihmaXJzdENhbmRpZGF0ZSkpIHtcbiAgICAgICAgICAgIG1lc3NhZ2UgKz0gYENhbmRpZGF0ZSB3YXMgYmxvY2tlZCBkdWUgdG8gJHtmaXJzdENhbmRpZGF0ZS5maW5pc2hSZWFzb259YDtcbiAgICAgICAgICAgIGlmIChmaXJzdENhbmRpZGF0ZS5maW5pc2hNZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSArPSBgOiAke2ZpcnN0Q2FuZGlkYXRlLmZpbmlzaE1lc3NhZ2V9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWVzc2FnZTtcbn1cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlLCBTdXBwcmVzc2VkRXJyb3IsIFN5bWJvbCAqL1xyXG5cclxuXHJcbmZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbnR5cGVvZiBTdXBwcmVzc2VkRXJyb3IgPT09IFwiZnVuY3Rpb25cIiA/IFN1cHByZXNzZWRFcnJvciA6IGZ1bmN0aW9uIChlcnJvciwgc3VwcHJlc3NlZCwgbWVzc2FnZSkge1xyXG4gICAgdmFyIGUgPSBuZXcgRXJyb3IobWVzc2FnZSk7XHJcbiAgICByZXR1cm4gZS5uYW1lID0gXCJTdXBwcmVzc2VkRXJyb3JcIiwgZS5lcnJvciA9IGVycm9yLCBlLnN1cHByZXNzZWQgPSBzdXBwcmVzc2VkLCBlO1xyXG59O1xuXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyNCBHb29nbGUgTExDXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuY29uc3QgcmVzcG9uc2VMaW5lUkUgPSAvXmRhdGFcXDogKC4qKSg/OlxcblxcbnxcXHJcXHJ8XFxyXFxuXFxyXFxuKS87XG4vKipcbiAqIFByb2Nlc3MgYSByZXNwb25zZS5ib2R5IHN0cmVhbSBmcm9tIHRoZSBiYWNrZW5kIGFuZCByZXR1cm4gYW5cbiAqIGl0ZXJhdG9yIHRoYXQgcHJvdmlkZXMgb25lIGNvbXBsZXRlIEdlbmVyYXRlQ29udGVudFJlc3BvbnNlIGF0IGEgdGltZVxuICogYW5kIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggYSBzaW5nbGUgYWdncmVnYXRlZFxuICogR2VuZXJhdGVDb250ZW50UmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHJlc3BvbnNlIC0gUmVzcG9uc2UgZnJvbSBhIGZldGNoIGNhbGxcbiAqL1xuZnVuY3Rpb24gcHJvY2Vzc1N0cmVhbShyZXNwb25zZSkge1xuICAgIGNvbnN0IGlucHV0U3RyZWFtID0gcmVzcG9uc2UuYm9keS5waXBlVGhyb3VnaChuZXcgVGV4dERlY29kZXJTdHJlYW0oXCJ1dGY4XCIsIHsgZmF0YWw6IHRydWUgfSkpO1xuICAgIGNvbnN0IHJlc3BvbnNlU3RyZWFtID0gZ2V0UmVzcG9uc2VTdHJlYW0oaW5wdXRTdHJlYW0pO1xuICAgIGNvbnN0IFtzdHJlYW0xLCBzdHJlYW0yXSA9IHJlc3BvbnNlU3RyZWFtLnRlZSgpO1xuICAgIHJldHVybiB7XG4gICAgICAgIHN0cmVhbTogZ2VuZXJhdGVSZXNwb25zZVNlcXVlbmNlKHN0cmVhbTEpLFxuICAgICAgICByZXNwb25zZTogZ2V0UmVzcG9uc2VQcm9taXNlKHN0cmVhbTIpLFxuICAgIH07XG59XG5hc3luYyBmdW5jdGlvbiBnZXRSZXNwb25zZVByb21pc2Uoc3RyZWFtKSB7XG4gICAgY29uc3QgYWxsUmVzcG9uc2VzID0gW107XG4gICAgY29uc3QgcmVhZGVyID0gc3RyZWFtLmdldFJlYWRlcigpO1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGNvbnN0IHsgZG9uZSwgdmFsdWUgfSA9IGF3YWl0IHJlYWRlci5yZWFkKCk7XG4gICAgICAgIGlmIChkb25lKSB7XG4gICAgICAgICAgICByZXR1cm4gYWRkSGVscGVycyhhZ2dyZWdhdGVSZXNwb25zZXMoYWxsUmVzcG9uc2VzKSk7XG4gICAgICAgIH1cbiAgICAgICAgYWxsUmVzcG9uc2VzLnB1c2godmFsdWUpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdlbmVyYXRlUmVzcG9uc2VTZXF1ZW5jZShzdHJlYW0pIHtcbiAgICByZXR1cm4gX19hc3luY0dlbmVyYXRvcih0aGlzLCBhcmd1bWVudHMsIGZ1bmN0aW9uKiBnZW5lcmF0ZVJlc3BvbnNlU2VxdWVuY2VfMSgpIHtcbiAgICAgICAgY29uc3QgcmVhZGVyID0gc3RyZWFtLmdldFJlYWRlcigpO1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgY29uc3QgeyB2YWx1ZSwgZG9uZSB9ID0geWllbGQgX19hd2FpdChyZWFkZXIucmVhZCgpKTtcbiAgICAgICAgICAgIGlmIChkb25lKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB5aWVsZCB5aWVsZCBfX2F3YWl0KGFkZEhlbHBlcnModmFsdWUpKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBSZWFkcyBhIHJhdyBzdHJlYW0gZnJvbSB0aGUgZmV0Y2ggcmVzcG9uc2UgYW5kIGpvaW4gaW5jb21wbGV0ZVxuICogY2h1bmtzLCByZXR1cm5pbmcgYSBuZXcgc3RyZWFtIHRoYXQgcHJvdmlkZXMgYSBzaW5nbGUgY29tcGxldGVcbiAqIEdlbmVyYXRlQ29udGVudFJlc3BvbnNlIGluIGVhY2ggaXRlcmF0aW9uLlxuICovXG5mdW5jdGlvbiBnZXRSZXNwb25zZVN0cmVhbShpbnB1dFN0cmVhbSkge1xuICAgIGNvbnN0IHJlYWRlciA9IGlucHV0U3RyZWFtLmdldFJlYWRlcigpO1xuICAgIGNvbnN0IHN0cmVhbSA9IG5ldyBSZWFkYWJsZVN0cmVhbSh7XG4gICAgICAgIHN0YXJ0KGNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50VGV4dCA9IFwiXCI7XG4gICAgICAgICAgICByZXR1cm4gcHVtcCgpO1xuICAgICAgICAgICAgZnVuY3Rpb24gcHVtcCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVhZGVyXG4gICAgICAgICAgICAgICAgICAgIC5yZWFkKClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHsgdmFsdWUsIGRvbmUgfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZG9uZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRUZXh0LnRyaW0oKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuZXJyb3IobmV3IEdvb2dsZUdlbmVyYXRpdmVBSUVycm9yKFwiRmFpbGVkIHRvIHBhcnNlIHN0cmVhbVwiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlci5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUZXh0ICs9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbWF0Y2ggPSBjdXJyZW50VGV4dC5tYXRjaChyZXNwb25zZUxpbmVSRSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwYXJzZWRSZXNwb25zZTtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlZFJlc3BvbnNlID0gSlNPTi5wYXJzZShtYXRjaFsxXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuZXJyb3IobmV3IEdvb2dsZUdlbmVyYXRpdmVBSUVycm9yKGBFcnJvciBwYXJzaW5nIEpTT04gcmVzcG9uc2U6IFwiJHttYXRjaFsxXX1cImApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyLmVucXVldWUocGFyc2VkUmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFRleHQgPSBjdXJyZW50VGV4dC5zdWJzdHJpbmcobWF0Y2hbMF0ubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoID0gY3VycmVudFRleHQubWF0Y2gocmVzcG9uc2VMaW5lUkUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwdW1wKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBlcnIgPSBlO1xuICAgICAgICAgICAgICAgICAgICBlcnIuc3RhY2sgPSBlLnN0YWNrO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyLm5hbWUgPT09IFwiQWJvcnRFcnJvclwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnIgPSBuZXcgR29vZ2xlR2VuZXJhdGl2ZUFJQWJvcnRFcnJvcihcIlJlcXVlc3QgYWJvcnRlZCB3aGVuIHJlYWRpbmcgZnJvbSB0aGUgc3RyZWFtXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyID0gbmV3IEdvb2dsZUdlbmVyYXRpdmVBSUVycm9yKFwiRXJyb3IgcmVhZGluZyBmcm9tIHRoZSBzdHJlYW1cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH0pO1xuICAgIHJldHVybiBzdHJlYW07XG59XG4vKipcbiAqIEFnZ3JlZ2F0ZXMgYW4gYXJyYXkgb2YgYEdlbmVyYXRlQ29udGVudFJlc3BvbnNlYHMgaW50byBhIHNpbmdsZVxuICogR2VuZXJhdGVDb250ZW50UmVzcG9uc2UuXG4gKi9cbmZ1bmN0aW9uIGFnZ3JlZ2F0ZVJlc3BvbnNlcyhyZXNwb25zZXMpIHtcbiAgICBjb25zdCBsYXN0UmVzcG9uc2UgPSByZXNwb25zZXNbcmVzcG9uc2VzLmxlbmd0aCAtIDFdO1xuICAgIGNvbnN0IGFnZ3JlZ2F0ZWRSZXNwb25zZSA9IHtcbiAgICAgICAgcHJvbXB0RmVlZGJhY2s6IGxhc3RSZXNwb25zZSA9PT0gbnVsbCB8fCBsYXN0UmVzcG9uc2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGxhc3RSZXNwb25zZS5wcm9tcHRGZWVkYmFjayxcbiAgICB9O1xuICAgIGZvciAoY29uc3QgcmVzcG9uc2Ugb2YgcmVzcG9uc2VzKSB7XG4gICAgICAgIGlmIChyZXNwb25zZS5jYW5kaWRhdGVzKSB7XG4gICAgICAgICAgICBsZXQgY2FuZGlkYXRlSW5kZXggPSAwO1xuICAgICAgICAgICAgZm9yIChjb25zdCBjYW5kaWRhdGUgb2YgcmVzcG9uc2UuY2FuZGlkYXRlcykge1xuICAgICAgICAgICAgICAgIGlmICghYWdncmVnYXRlZFJlc3BvbnNlLmNhbmRpZGF0ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgYWdncmVnYXRlZFJlc3BvbnNlLmNhbmRpZGF0ZXMgPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFhZ2dyZWdhdGVkUmVzcG9uc2UuY2FuZGlkYXRlc1tjYW5kaWRhdGVJbmRleF0pIHtcbiAgICAgICAgICAgICAgICAgICAgYWdncmVnYXRlZFJlc3BvbnNlLmNhbmRpZGF0ZXNbY2FuZGlkYXRlSW5kZXhdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGNhbmRpZGF0ZUluZGV4LFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBLZWVwIG92ZXJ3cml0aW5nLCB0aGUgbGFzdCBvbmUgd2lsbCBiZSBmaW5hbFxuICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZWRSZXNwb25zZS5jYW5kaWRhdGVzW2NhbmRpZGF0ZUluZGV4XS5jaXRhdGlvbk1ldGFkYXRhID1cbiAgICAgICAgICAgICAgICAgICAgY2FuZGlkYXRlLmNpdGF0aW9uTWV0YWRhdGE7XG4gICAgICAgICAgICAgICAgYWdncmVnYXRlZFJlc3BvbnNlLmNhbmRpZGF0ZXNbY2FuZGlkYXRlSW5kZXhdLmdyb3VuZGluZ01ldGFkYXRhID1cbiAgICAgICAgICAgICAgICAgICAgY2FuZGlkYXRlLmdyb3VuZGluZ01ldGFkYXRhO1xuICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZWRSZXNwb25zZS5jYW5kaWRhdGVzW2NhbmRpZGF0ZUluZGV4XS5maW5pc2hSZWFzb24gPVxuICAgICAgICAgICAgICAgICAgICBjYW5kaWRhdGUuZmluaXNoUmVhc29uO1xuICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZWRSZXNwb25zZS5jYW5kaWRhdGVzW2NhbmRpZGF0ZUluZGV4XS5maW5pc2hNZXNzYWdlID1cbiAgICAgICAgICAgICAgICAgICAgY2FuZGlkYXRlLmZpbmlzaE1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgYWdncmVnYXRlZFJlc3BvbnNlLmNhbmRpZGF0ZXNbY2FuZGlkYXRlSW5kZXhdLnNhZmV0eVJhdGluZ3MgPVxuICAgICAgICAgICAgICAgICAgICBjYW5kaWRhdGUuc2FmZXR5UmF0aW5ncztcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBDYW5kaWRhdGVzIHNob3VsZCBhbHdheXMgaGF2ZSBjb250ZW50IGFuZCBwYXJ0cywgYnV0IHRoaXMgaGFuZGxlc1xuICAgICAgICAgICAgICAgICAqIHBvc3NpYmxlIG1hbGZvcm1lZCByZXNwb25zZXMuXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYgKGNhbmRpZGF0ZS5jb250ZW50ICYmIGNhbmRpZGF0ZS5jb250ZW50LnBhcnRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghYWdncmVnYXRlZFJlc3BvbnNlLmNhbmRpZGF0ZXNbY2FuZGlkYXRlSW5kZXhdLmNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZWRSZXNwb25zZS5jYW5kaWRhdGVzW2NhbmRpZGF0ZUluZGV4XS5jb250ZW50ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU6IGNhbmRpZGF0ZS5jb250ZW50LnJvbGUgfHwgXCJ1c2VyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFydHM6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdQYXJ0ID0ge307XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcGFydCBvZiBjYW5kaWRhdGUuY29udGVudC5wYXJ0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnQudGV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1BhcnQudGV4dCA9IHBhcnQudGV4dDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJ0LmZ1bmN0aW9uQ2FsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1BhcnQuZnVuY3Rpb25DYWxsID0gcGFydC5mdW5jdGlvbkNhbGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFydC5leGVjdXRhYmxlQ29kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1BhcnQuZXhlY3V0YWJsZUNvZGUgPSBwYXJ0LmV4ZWN1dGFibGVDb2RlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnQuY29kZUV4ZWN1dGlvblJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1BhcnQuY29kZUV4ZWN1dGlvblJlc3VsdCA9IHBhcnQuY29kZUV4ZWN1dGlvblJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhuZXdQYXJ0KS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdQYXJ0LnRleHQgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYWdncmVnYXRlZFJlc3BvbnNlLmNhbmRpZGF0ZXNbY2FuZGlkYXRlSW5kZXhdLmNvbnRlbnQucGFydHMucHVzaChuZXdQYXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbmRpZGF0ZUluZGV4Kys7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3BvbnNlLnVzYWdlTWV0YWRhdGEpIHtcbiAgICAgICAgICAgIGFnZ3JlZ2F0ZWRSZXNwb25zZS51c2FnZU1ldGFkYXRhID0gcmVzcG9uc2UudXNhZ2VNZXRhZGF0YTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYWdncmVnYXRlZFJlc3BvbnNlO1xufVxuXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyNCBHb29nbGUgTExDXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gZ2VuZXJhdGVDb250ZW50U3RyZWFtKGFwaUtleSwgbW9kZWwsIHBhcmFtcywgcmVxdWVzdE9wdGlvbnMpIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IG1ha2VNb2RlbFJlcXVlc3QobW9kZWwsIFRhc2suU1RSRUFNX0dFTkVSQVRFX0NPTlRFTlQsIGFwaUtleSwgXG4gICAgLyogc3RyZWFtICovIHRydWUsIEpTT04uc3RyaW5naWZ5KHBhcmFtcyksIHJlcXVlc3RPcHRpb25zKTtcbiAgICByZXR1cm4gcHJvY2Vzc1N0cmVhbShyZXNwb25zZSk7XG59XG5hc3luYyBmdW5jdGlvbiBnZW5lcmF0ZUNvbnRlbnQoYXBpS2V5LCBtb2RlbCwgcGFyYW1zLCByZXF1ZXN0T3B0aW9ucykge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgbWFrZU1vZGVsUmVxdWVzdChtb2RlbCwgVGFzay5HRU5FUkFURV9DT05URU5ULCBhcGlLZXksIFxuICAgIC8qIHN0cmVhbSAqLyBmYWxzZSwgSlNPTi5zdHJpbmdpZnkocGFyYW1zKSwgcmVxdWVzdE9wdGlvbnMpO1xuICAgIGNvbnN0IHJlc3BvbnNlSnNvbiA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICBjb25zdCBlbmhhbmNlZFJlc3BvbnNlID0gYWRkSGVscGVycyhyZXNwb25zZUpzb24pO1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3BvbnNlOiBlbmhhbmNlZFJlc3BvbnNlLFxuICAgIH07XG59XG5cbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDI0IEdvb2dsZSBMTENcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5mdW5jdGlvbiBmb3JtYXRTeXN0ZW1JbnN0cnVjdGlvbihpbnB1dCkge1xuICAgIC8vIG51bGwgb3IgdW5kZWZpbmVkXG4gICAgaWYgKGlucHV0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGlucHV0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHJldHVybiB7IHJvbGU6IFwic3lzdGVtXCIsIHBhcnRzOiBbeyB0ZXh0OiBpbnB1dCB9XSB9O1xuICAgIH1cbiAgICBlbHNlIGlmIChpbnB1dC50ZXh0KSB7XG4gICAgICAgIHJldHVybiB7IHJvbGU6IFwic3lzdGVtXCIsIHBhcnRzOiBbaW5wdXRdIH07XG4gICAgfVxuICAgIGVsc2UgaWYgKGlucHV0LnBhcnRzKSB7XG4gICAgICAgIGlmICghaW5wdXQucm9sZSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgcm9sZTogXCJzeXN0ZW1cIiwgcGFydHM6IGlucHV0LnBhcnRzIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBmb3JtYXROZXdDb250ZW50KHJlcXVlc3QpIHtcbiAgICBsZXQgbmV3UGFydHMgPSBbXTtcbiAgICBpZiAodHlwZW9mIHJlcXVlc3QgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgbmV3UGFydHMgPSBbeyB0ZXh0OiByZXF1ZXN0IH1dO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZm9yIChjb25zdCBwYXJ0T3JTdHJpbmcgb2YgcmVxdWVzdCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXJ0T3JTdHJpbmcgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICBuZXdQYXJ0cy5wdXNoKHsgdGV4dDogcGFydE9yU3RyaW5nIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3UGFydHMucHVzaChwYXJ0T3JTdHJpbmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhc3NpZ25Sb2xlVG9QYXJ0c0FuZFZhbGlkYXRlU2VuZE1lc3NhZ2VSZXF1ZXN0KG5ld1BhcnRzKTtcbn1cbi8qKlxuICogV2hlbiBtdWx0aXBsZSBQYXJ0IHR5cGVzIChpLmUuIEZ1bmN0aW9uUmVzcG9uc2VQYXJ0IGFuZCBUZXh0UGFydCkgYXJlXG4gKiBwYXNzZWQgaW4gYSBzaW5nbGUgUGFydCBhcnJheSwgd2UgbWF5IG5lZWQgdG8gYXNzaWduIGRpZmZlcmVudCByb2xlcyB0byBlYWNoXG4gKiBwYXJ0LiBDdXJyZW50bHkgb25seSBGdW5jdGlvblJlc3BvbnNlUGFydCByZXF1aXJlcyBhIHJvbGUgb3RoZXIgdGhhbiAndXNlcicuXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHBhcnRzIEFycmF5IG9mIHBhcnRzIHRvIHBhc3MgdG8gdGhlIG1vZGVsXG4gKiBAcmV0dXJucyBBcnJheSBvZiBjb250ZW50IGl0ZW1zXG4gKi9cbmZ1bmN0aW9uIGFzc2lnblJvbGVUb1BhcnRzQW5kVmFsaWRhdGVTZW5kTWVzc2FnZVJlcXVlc3QocGFydHMpIHtcbiAgICBjb25zdCB1c2VyQ29udGVudCA9IHsgcm9sZTogXCJ1c2VyXCIsIHBhcnRzOiBbXSB9O1xuICAgIGNvbnN0IGZ1bmN0aW9uQ29udGVudCA9IHsgcm9sZTogXCJmdW5jdGlvblwiLCBwYXJ0czogW10gfTtcbiAgICBsZXQgaGFzVXNlckNvbnRlbnQgPSBmYWxzZTtcbiAgICBsZXQgaGFzRnVuY3Rpb25Db250ZW50ID0gZmFsc2U7XG4gICAgZm9yIChjb25zdCBwYXJ0IG9mIHBhcnRzKSB7XG4gICAgICAgIGlmIChcImZ1bmN0aW9uUmVzcG9uc2VcIiBpbiBwYXJ0KSB7XG4gICAgICAgICAgICBmdW5jdGlvbkNvbnRlbnQucGFydHMucHVzaChwYXJ0KTtcbiAgICAgICAgICAgIGhhc0Z1bmN0aW9uQ29udGVudCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB1c2VyQ29udGVudC5wYXJ0cy5wdXNoKHBhcnQpO1xuICAgICAgICAgICAgaGFzVXNlckNvbnRlbnQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChoYXNVc2VyQ29udGVudCAmJiBoYXNGdW5jdGlvbkNvbnRlbnQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEdvb2dsZUdlbmVyYXRpdmVBSUVycm9yKFwiV2l0aGluIGEgc2luZ2xlIG1lc3NhZ2UsIEZ1bmN0aW9uUmVzcG9uc2UgY2Fubm90IGJlIG1peGVkIHdpdGggb3RoZXIgdHlwZSBvZiBwYXJ0IGluIHRoZSByZXF1ZXN0IGZvciBzZW5kaW5nIGNoYXQgbWVzc2FnZS5cIik7XG4gICAgfVxuICAgIGlmICghaGFzVXNlckNvbnRlbnQgJiYgIWhhc0Z1bmN0aW9uQ29udGVudCkge1xuICAgICAgICB0aHJvdyBuZXcgR29vZ2xlR2VuZXJhdGl2ZUFJRXJyb3IoXCJObyBjb250ZW50IGlzIHByb3ZpZGVkIGZvciBzZW5kaW5nIGNoYXQgbWVzc2FnZS5cIik7XG4gICAgfVxuICAgIGlmIChoYXNVc2VyQ29udGVudCkge1xuICAgICAgICByZXR1cm4gdXNlckNvbnRlbnQ7XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbkNvbnRlbnQ7XG59XG5mdW5jdGlvbiBmb3JtYXRDb3VudFRva2Vuc0lucHV0KHBhcmFtcywgbW9kZWxQYXJhbXMpIHtcbiAgICB2YXIgX2E7XG4gICAgbGV0IGZvcm1hdHRlZEdlbmVyYXRlQ29udGVudFJlcXVlc3QgPSB7XG4gICAgICAgIG1vZGVsOiBtb2RlbFBhcmFtcyA9PT0gbnVsbCB8fCBtb2RlbFBhcmFtcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogbW9kZWxQYXJhbXMubW9kZWwsXG4gICAgICAgIGdlbmVyYXRpb25Db25maWc6IG1vZGVsUGFyYW1zID09PSBudWxsIHx8IG1vZGVsUGFyYW1zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtb2RlbFBhcmFtcy5nZW5lcmF0aW9uQ29uZmlnLFxuICAgICAgICBzYWZldHlTZXR0aW5nczogbW9kZWxQYXJhbXMgPT09IG51bGwgfHwgbW9kZWxQYXJhbXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1vZGVsUGFyYW1zLnNhZmV0eVNldHRpbmdzLFxuICAgICAgICB0b29sczogbW9kZWxQYXJhbXMgPT09IG51bGwgfHwgbW9kZWxQYXJhbXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1vZGVsUGFyYW1zLnRvb2xzLFxuICAgICAgICB0b29sQ29uZmlnOiBtb2RlbFBhcmFtcyA9PT0gbnVsbCB8fCBtb2RlbFBhcmFtcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogbW9kZWxQYXJhbXMudG9vbENvbmZpZyxcbiAgICAgICAgc3lzdGVtSW5zdHJ1Y3Rpb246IG1vZGVsUGFyYW1zID09PSBudWxsIHx8IG1vZGVsUGFyYW1zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtb2RlbFBhcmFtcy5zeXN0ZW1JbnN0cnVjdGlvbixcbiAgICAgICAgY2FjaGVkQ29udGVudDogKF9hID0gbW9kZWxQYXJhbXMgPT09IG51bGwgfHwgbW9kZWxQYXJhbXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1vZGVsUGFyYW1zLmNhY2hlZENvbnRlbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5uYW1lLFxuICAgICAgICBjb250ZW50czogW10sXG4gICAgfTtcbiAgICBjb25zdCBjb250YWluc0dlbmVyYXRlQ29udGVudFJlcXVlc3QgPSBwYXJhbXMuZ2VuZXJhdGVDb250ZW50UmVxdWVzdCAhPSBudWxsO1xuICAgIGlmIChwYXJhbXMuY29udGVudHMpIHtcbiAgICAgICAgaWYgKGNvbnRhaW5zR2VuZXJhdGVDb250ZW50UmVxdWVzdCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEdvb2dsZUdlbmVyYXRpdmVBSVJlcXVlc3RJbnB1dEVycm9yKFwiQ291bnRUb2tlbnNSZXF1ZXN0IG11c3QgaGF2ZSBvbmUgb2YgY29udGVudHMgb3IgZ2VuZXJhdGVDb250ZW50UmVxdWVzdCwgbm90IGJvdGguXCIpO1xuICAgICAgICB9XG4gICAgICAgIGZvcm1hdHRlZEdlbmVyYXRlQ29udGVudFJlcXVlc3QuY29udGVudHMgPSBwYXJhbXMuY29udGVudHM7XG4gICAgfVxuICAgIGVsc2UgaWYgKGNvbnRhaW5zR2VuZXJhdGVDb250ZW50UmVxdWVzdCkge1xuICAgICAgICBmb3JtYXR0ZWRHZW5lcmF0ZUNvbnRlbnRSZXF1ZXN0ID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBmb3JtYXR0ZWRHZW5lcmF0ZUNvbnRlbnRSZXF1ZXN0KSwgcGFyYW1zLmdlbmVyYXRlQ29udGVudFJlcXVlc3QpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gQXJyYXkgb3Igc3RyaW5nXG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBmb3JtYXROZXdDb250ZW50KHBhcmFtcyk7XG4gICAgICAgIGZvcm1hdHRlZEdlbmVyYXRlQ29udGVudFJlcXVlc3QuY29udGVudHMgPSBbY29udGVudF07XG4gICAgfVxuICAgIHJldHVybiB7IGdlbmVyYXRlQ29udGVudFJlcXVlc3Q6IGZvcm1hdHRlZEdlbmVyYXRlQ29udGVudFJlcXVlc3QgfTtcbn1cbmZ1bmN0aW9uIGZvcm1hdEdlbmVyYXRlQ29udGVudElucHV0KHBhcmFtcykge1xuICAgIGxldCBmb3JtYXR0ZWRSZXF1ZXN0O1xuICAgIGlmIChwYXJhbXMuY29udGVudHMpIHtcbiAgICAgICAgZm9ybWF0dGVkUmVxdWVzdCA9IHBhcmFtcztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIEFycmF5IG9yIHN0cmluZ1xuICAgICAgICBjb25zdCBjb250ZW50ID0gZm9ybWF0TmV3Q29udGVudChwYXJhbXMpO1xuICAgICAgICBmb3JtYXR0ZWRSZXF1ZXN0ID0geyBjb250ZW50czogW2NvbnRlbnRdIH07XG4gICAgfVxuICAgIGlmIChwYXJhbXMuc3lzdGVtSW5zdHJ1Y3Rpb24pIHtcbiAgICAgICAgZm9ybWF0dGVkUmVxdWVzdC5zeXN0ZW1JbnN0cnVjdGlvbiA9IGZvcm1hdFN5c3RlbUluc3RydWN0aW9uKHBhcmFtcy5zeXN0ZW1JbnN0cnVjdGlvbik7XG4gICAgfVxuICAgIHJldHVybiBmb3JtYXR0ZWRSZXF1ZXN0O1xufVxuZnVuY3Rpb24gZm9ybWF0RW1iZWRDb250ZW50SW5wdXQocGFyYW1zKSB7XG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIgfHwgQXJyYXkuaXNBcnJheShwYXJhbXMpKSB7XG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBmb3JtYXROZXdDb250ZW50KHBhcmFtcyk7XG4gICAgICAgIHJldHVybiB7IGNvbnRlbnQgfTtcbiAgICB9XG4gICAgcmV0dXJuIHBhcmFtcztcbn1cblxuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMjQgR29vZ2xlIExMQ1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8vIGh0dHBzOi8vYWkuZ29vZ2xlLmRldi9hcGkvcmVzdC92MWJldGEvQ29udGVudCNwYXJ0XG5jb25zdCBWQUxJRF9QQVJUX0ZJRUxEUyA9IFtcbiAgICBcInRleHRcIixcbiAgICBcImlubGluZURhdGFcIixcbiAgICBcImZ1bmN0aW9uQ2FsbFwiLFxuICAgIFwiZnVuY3Rpb25SZXNwb25zZVwiLFxuICAgIFwiZXhlY3V0YWJsZUNvZGVcIixcbiAgICBcImNvZGVFeGVjdXRpb25SZXN1bHRcIixcbl07XG5jb25zdCBWQUxJRF9QQVJUU19QRVJfUk9MRSA9IHtcbiAgICB1c2VyOiBbXCJ0ZXh0XCIsIFwiaW5saW5lRGF0YVwiXSxcbiAgICBmdW5jdGlvbjogW1wiZnVuY3Rpb25SZXNwb25zZVwiXSxcbiAgICBtb2RlbDogW1widGV4dFwiLCBcImZ1bmN0aW9uQ2FsbFwiLCBcImV4ZWN1dGFibGVDb2RlXCIsIFwiY29kZUV4ZWN1dGlvblJlc3VsdFwiXSxcbiAgICAvLyBTeXN0ZW0gaW5zdHJ1Y3Rpb25zIHNob3VsZG4ndCBiZSBpbiBoaXN0b3J5IGFueXdheS5cbiAgICBzeXN0ZW06IFtcInRleHRcIl0sXG59O1xuZnVuY3Rpb24gdmFsaWRhdGVDaGF0SGlzdG9yeShoaXN0b3J5KSB7XG4gICAgbGV0IHByZXZDb250ZW50ID0gZmFsc2U7XG4gICAgZm9yIChjb25zdCBjdXJyQ29udGVudCBvZiBoaXN0b3J5KSB7XG4gICAgICAgIGNvbnN0IHsgcm9sZSwgcGFydHMgfSA9IGN1cnJDb250ZW50O1xuICAgICAgICBpZiAoIXByZXZDb250ZW50ICYmIHJvbGUgIT09IFwidXNlclwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgR29vZ2xlR2VuZXJhdGl2ZUFJRXJyb3IoYEZpcnN0IGNvbnRlbnQgc2hvdWxkIGJlIHdpdGggcm9sZSAndXNlcicsIGdvdCAke3JvbGV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFQT1NTSUJMRV9ST0xFUy5pbmNsdWRlcyhyb2xlKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEdvb2dsZUdlbmVyYXRpdmVBSUVycm9yKGBFYWNoIGl0ZW0gc2hvdWxkIGluY2x1ZGUgcm9sZSBmaWVsZC4gR290ICR7cm9sZX0gYnV0IHZhbGlkIHJvbGVzIGFyZTogJHtKU09OLnN0cmluZ2lmeShQT1NTSUJMRV9ST0xFUyl9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHBhcnRzKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEdvb2dsZUdlbmVyYXRpdmVBSUVycm9yKFwiQ29udGVudCBzaG91bGQgaGF2ZSAncGFydHMnIHByb3BlcnR5IHdpdGggYW4gYXJyYXkgb2YgUGFydHNcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEdvb2dsZUdlbmVyYXRpdmVBSUVycm9yKFwiRWFjaCBDb250ZW50IHNob3VsZCBoYXZlIGF0IGxlYXN0IG9uZSBwYXJ0XCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvdW50RmllbGRzID0ge1xuICAgICAgICAgICAgdGV4dDogMCxcbiAgICAgICAgICAgIGlubGluZURhdGE6IDAsXG4gICAgICAgICAgICBmdW5jdGlvbkNhbGw6IDAsXG4gICAgICAgICAgICBmdW5jdGlvblJlc3BvbnNlOiAwLFxuICAgICAgICAgICAgZmlsZURhdGE6IDAsXG4gICAgICAgICAgICBleGVjdXRhYmxlQ29kZTogMCxcbiAgICAgICAgICAgIGNvZGVFeGVjdXRpb25SZXN1bHQ6IDAsXG4gICAgICAgIH07XG4gICAgICAgIGZvciAoY29uc3QgcGFydCBvZiBwYXJ0cykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgVkFMSURfUEFSVF9GSUVMRFMpIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5IGluIHBhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgY291bnRGaWVsZHNba2V5XSArPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCB2YWxpZFBhcnRzID0gVkFMSURfUEFSVFNfUEVSX1JPTEVbcm9sZV07XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIFZBTElEX1BBUlRfRklFTERTKSB7XG4gICAgICAgICAgICBpZiAoIXZhbGlkUGFydHMuaW5jbHVkZXMoa2V5KSAmJiBjb3VudEZpZWxkc1trZXldID4gMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBHb29nbGVHZW5lcmF0aXZlQUlFcnJvcihgQ29udGVudCB3aXRoIHJvbGUgJyR7cm9sZX0nIGNhbid0IGNvbnRhaW4gJyR7a2V5fScgcGFydGApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHByZXZDb250ZW50ID0gdHJ1ZTtcbiAgICB9XG59XG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgcmVzcG9uc2UgaXMgdmFsaWQgKGNvdWxkIGJlIGFwcGVuZGVkIHRvIHRoZSBoaXN0b3J5KSwgZmxhc2Ugb3RoZXJ3aXNlLlxuICovXG5mdW5jdGlvbiBpc1ZhbGlkUmVzcG9uc2UocmVzcG9uc2UpIHtcbiAgICB2YXIgX2E7XG4gICAgaWYgKHJlc3BvbnNlLmNhbmRpZGF0ZXMgPT09IHVuZGVmaW5lZCB8fCByZXNwb25zZS5jYW5kaWRhdGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGNvbnRlbnQgPSAoX2EgPSByZXNwb25zZS5jYW5kaWRhdGVzWzBdKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY29udGVudDtcbiAgICBpZiAoY29udGVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGNvbnRlbnQucGFydHMgPT09IHVuZGVmaW5lZCB8fCBjb250ZW50LnBhcnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZvciAoY29uc3QgcGFydCBvZiBjb250ZW50LnBhcnRzKSB7XG4gICAgICAgIGlmIChwYXJ0ID09PSB1bmRlZmluZWQgfHwgT2JqZWN0LmtleXMocGFydCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcnQudGV4dCAhPT0gdW5kZWZpbmVkICYmIHBhcnQudGV4dCA9PT0gXCJcIikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyNCBHb29nbGUgTExDXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBEbyBub3QgbG9nIGEgbWVzc2FnZSBmb3IgdGhpcyBlcnJvci5cbiAqL1xuY29uc3QgU0lMRU5UX0VSUk9SID0gXCJTSUxFTlRfRVJST1JcIjtcbi8qKlxuICogQ2hhdFNlc3Npb24gY2xhc3MgdGhhdCBlbmFibGVzIHNlbmRpbmcgY2hhdCBtZXNzYWdlcyBhbmQgc3RvcmVzXG4gKiBoaXN0b3J5IG9mIHNlbnQgYW5kIHJlY2VpdmVkIG1lc3NhZ2VzIHNvIGZhci5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmNsYXNzIENoYXRTZXNzaW9uIHtcbiAgICBjb25zdHJ1Y3RvcihhcGlLZXksIG1vZGVsLCBwYXJhbXMsIF9yZXF1ZXN0T3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICAgICAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7XG4gICAgICAgIHRoaXMuX3JlcXVlc3RPcHRpb25zID0gX3JlcXVlc3RPcHRpb25zO1xuICAgICAgICB0aGlzLl9oaXN0b3J5ID0gW107XG4gICAgICAgIHRoaXMuX3NlbmRQcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIHRoaXMuX2FwaUtleSA9IGFwaUtleTtcbiAgICAgICAgaWYgKHBhcmFtcyA9PT0gbnVsbCB8fCBwYXJhbXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBhcmFtcy5oaXN0b3J5KSB7XG4gICAgICAgICAgICB2YWxpZGF0ZUNoYXRIaXN0b3J5KHBhcmFtcy5oaXN0b3J5KTtcbiAgICAgICAgICAgIHRoaXMuX2hpc3RvcnkgPSBwYXJhbXMuaGlzdG9yeTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBjaGF0IGhpc3Rvcnkgc28gZmFyLiBCbG9ja2VkIHByb21wdHMgYXJlIG5vdCBhZGRlZCB0byBoaXN0b3J5LlxuICAgICAqIEJsb2NrZWQgY2FuZGlkYXRlcyBhcmUgbm90IGFkZGVkIHRvIGhpc3RvcnksIG5vciBhcmUgdGhlIHByb21wdHMgdGhhdFxuICAgICAqIGdlbmVyYXRlZCB0aGVtLlxuICAgICAqL1xuICAgIGFzeW5jIGdldEhpc3RvcnkoKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuX3NlbmRQcm9taXNlO1xuICAgICAgICByZXR1cm4gdGhpcy5faGlzdG9yeTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZHMgYSBjaGF0IG1lc3NhZ2UgYW5kIHJlY2VpdmVzIGEgbm9uLXN0cmVhbWluZ1xuICAgICAqIHtAbGluayBHZW5lcmF0ZUNvbnRlbnRSZXN1bHR9LlxuICAgICAqXG4gICAgICogRmllbGRzIHNldCBpbiB0aGUgb3B0aW9uYWwge0BsaW5rIFNpbmdsZVJlcXVlc3RPcHRpb25zfSBwYXJhbWV0ZXIgd2lsbFxuICAgICAqIHRha2UgcHJlY2VkZW5jZSBvdmVyIHRoZSB7QGxpbmsgUmVxdWVzdE9wdGlvbnN9IHZhbHVlcyBwcm92aWRlZCB0b1xuICAgICAqIHtAbGluayBHb29nbGVHZW5lcmF0aXZlQUkuZ2V0R2VuZXJhdGl2ZU1vZGVsIH0uXG4gICAgICovXG4gICAgYXN5bmMgc2VuZE1lc3NhZ2UocmVxdWVzdCwgcmVxdWVzdE9wdGlvbnMgPSB7fSkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZjtcbiAgICAgICAgYXdhaXQgdGhpcy5fc2VuZFByb21pc2U7XG4gICAgICAgIGNvbnN0IG5ld0NvbnRlbnQgPSBmb3JtYXROZXdDb250ZW50KHJlcXVlc3QpO1xuICAgICAgICBjb25zdCBnZW5lcmF0ZUNvbnRlbnRSZXF1ZXN0ID0ge1xuICAgICAgICAgICAgc2FmZXR5U2V0dGluZ3M6IChfYSA9IHRoaXMucGFyYW1zKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2FmZXR5U2V0dGluZ3MsXG4gICAgICAgICAgICBnZW5lcmF0aW9uQ29uZmlnOiAoX2IgPSB0aGlzLnBhcmFtcykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmdlbmVyYXRpb25Db25maWcsXG4gICAgICAgICAgICB0b29sczogKF9jID0gdGhpcy5wYXJhbXMpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy50b29scyxcbiAgICAgICAgICAgIHRvb2xDb25maWc6IChfZCA9IHRoaXMucGFyYW1zKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QudG9vbENvbmZpZyxcbiAgICAgICAgICAgIHN5c3RlbUluc3RydWN0aW9uOiAoX2UgPSB0aGlzLnBhcmFtcykgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lLnN5c3RlbUluc3RydWN0aW9uLFxuICAgICAgICAgICAgY2FjaGVkQ29udGVudDogKF9mID0gdGhpcy5wYXJhbXMpID09PSBudWxsIHx8IF9mID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZi5jYWNoZWRDb250ZW50LFxuICAgICAgICAgICAgY29udGVudHM6IFsuLi50aGlzLl9oaXN0b3J5LCBuZXdDb250ZW50XSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY2hhdFNlc3Npb25SZXF1ZXN0T3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fcmVxdWVzdE9wdGlvbnMpLCByZXF1ZXN0T3B0aW9ucyk7XG4gICAgICAgIGxldCBmaW5hbFJlc3VsdDtcbiAgICAgICAgLy8gQWRkIG9udG8gdGhlIGNoYWluLlxuICAgICAgICB0aGlzLl9zZW5kUHJvbWlzZSA9IHRoaXMuX3NlbmRQcm9taXNlXG4gICAgICAgICAgICAudGhlbigoKSA9PiBnZW5lcmF0ZUNvbnRlbnQodGhpcy5fYXBpS2V5LCB0aGlzLm1vZGVsLCBnZW5lcmF0ZUNvbnRlbnRSZXF1ZXN0LCBjaGF0U2Vzc2lvblJlcXVlc3RPcHRpb25zKSlcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGlmIChpc1ZhbGlkUmVzcG9uc2UocmVzdWx0LnJlc3BvbnNlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2hpc3RvcnkucHVzaChuZXdDb250ZW50KTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZUNvbnRlbnQgPSBPYmplY3QuYXNzaWduKHsgcGFydHM6IFtdLCBcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVzcG9uc2Ugc2VlbXMgdG8gY29tZSBiYWNrIHdpdGhvdXQgYSByb2xlIHNldC5cbiAgICAgICAgICAgICAgICAgICAgcm9sZTogXCJtb2RlbFwiIH0sIChfYSA9IHJlc3VsdC5yZXNwb25zZS5jYW5kaWRhdGVzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbMF0uY29udGVudCk7XG4gICAgICAgICAgICAgICAgdGhpcy5faGlzdG9yeS5wdXNoKHJlc3BvbnNlQ29udGVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBibG9ja0Vycm9yTWVzc2FnZSA9IGZvcm1hdEJsb2NrRXJyb3JNZXNzYWdlKHJlc3VsdC5yZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgaWYgKGJsb2NrRXJyb3JNZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2Fybihgc2VuZE1lc3NhZ2UoKSB3YXMgdW5zdWNjZXNzZnVsLiAke2Jsb2NrRXJyb3JNZXNzYWdlfS4gSW5zcGVjdCByZXNwb25zZSBvYmplY3QgZm9yIGRldGFpbHMuYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxSZXN1bHQgPSByZXN1bHQ7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAgIC8vIFJlc2V0cyBfc2VuZFByb21pc2UgdG8gYXZvaWQgc3Vic2VxdWVudCBjYWxscyBmYWlsaW5nIGFuZCB0aHJvdyBlcnJvci5cbiAgICAgICAgICAgIHRoaXMuX3NlbmRQcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgdGhpcy5fc2VuZFByb21pc2U7XG4gICAgICAgIHJldHVybiBmaW5hbFJlc3VsdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZHMgYSBjaGF0IG1lc3NhZ2UgYW5kIHJlY2VpdmVzIHRoZSByZXNwb25zZSBhcyBhXG4gICAgICoge0BsaW5rIEdlbmVyYXRlQ29udGVudFN0cmVhbVJlc3VsdH0gY29udGFpbmluZyBhbiBpdGVyYWJsZSBzdHJlYW1cbiAgICAgKiBhbmQgYSByZXNwb25zZSBwcm9taXNlLlxuICAgICAqXG4gICAgICogRmllbGRzIHNldCBpbiB0aGUgb3B0aW9uYWwge0BsaW5rIFNpbmdsZVJlcXVlc3RPcHRpb25zfSBwYXJhbWV0ZXIgd2lsbFxuICAgICAqIHRha2UgcHJlY2VkZW5jZSBvdmVyIHRoZSB7QGxpbmsgUmVxdWVzdE9wdGlvbnN9IHZhbHVlcyBwcm92aWRlZCB0b1xuICAgICAqIHtAbGluayBHb29nbGVHZW5lcmF0aXZlQUkuZ2V0R2VuZXJhdGl2ZU1vZGVsIH0uXG4gICAgICovXG4gICAgYXN5bmMgc2VuZE1lc3NhZ2VTdHJlYW0ocmVxdWVzdCwgcmVxdWVzdE9wdGlvbnMgPSB7fSkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZjtcbiAgICAgICAgYXdhaXQgdGhpcy5fc2VuZFByb21pc2U7XG4gICAgICAgIGNvbnN0IG5ld0NvbnRlbnQgPSBmb3JtYXROZXdDb250ZW50KHJlcXVlc3QpO1xuICAgICAgICBjb25zdCBnZW5lcmF0ZUNvbnRlbnRSZXF1ZXN0ID0ge1xuICAgICAgICAgICAgc2FmZXR5U2V0dGluZ3M6IChfYSA9IHRoaXMucGFyYW1zKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2FmZXR5U2V0dGluZ3MsXG4gICAgICAgICAgICBnZW5lcmF0aW9uQ29uZmlnOiAoX2IgPSB0aGlzLnBhcmFtcykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmdlbmVyYXRpb25Db25maWcsXG4gICAgICAgICAgICB0b29sczogKF9jID0gdGhpcy5wYXJhbXMpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy50b29scyxcbiAgICAgICAgICAgIHRvb2xDb25maWc6IChfZCA9IHRoaXMucGFyYW1zKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QudG9vbENvbmZpZyxcbiAgICAgICAgICAgIHN5c3RlbUluc3RydWN0aW9uOiAoX2UgPSB0aGlzLnBhcmFtcykgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lLnN5c3RlbUluc3RydWN0aW9uLFxuICAgICAgICAgICAgY2FjaGVkQ29udGVudDogKF9mID0gdGhpcy5wYXJhbXMpID09PSBudWxsIHx8IF9mID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZi5jYWNoZWRDb250ZW50LFxuICAgICAgICAgICAgY29udGVudHM6IFsuLi50aGlzLl9oaXN0b3J5LCBuZXdDb250ZW50XSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY2hhdFNlc3Npb25SZXF1ZXN0T3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fcmVxdWVzdE9wdGlvbnMpLCByZXF1ZXN0T3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IHN0cmVhbVByb21pc2UgPSBnZW5lcmF0ZUNvbnRlbnRTdHJlYW0odGhpcy5fYXBpS2V5LCB0aGlzLm1vZGVsLCBnZW5lcmF0ZUNvbnRlbnRSZXF1ZXN0LCBjaGF0U2Vzc2lvblJlcXVlc3RPcHRpb25zKTtcbiAgICAgICAgLy8gQWRkIG9udG8gdGhlIGNoYWluLlxuICAgICAgICB0aGlzLl9zZW5kUHJvbWlzZSA9IHRoaXMuX3NlbmRQcm9taXNlXG4gICAgICAgICAgICAudGhlbigoKSA9PiBzdHJlYW1Qcm9taXNlKVxuICAgICAgICAgICAgLy8gVGhpcyBtdXN0IGJlIGhhbmRsZWQgdG8gYXZvaWQgdW5oYW5kbGVkIHJlamVjdGlvbiwgYnV0IGp1bXBcbiAgICAgICAgICAgIC8vIHRvIHRoZSBmaW5hbCBjYXRjaCBibG9jayB3aXRoIGEgbGFiZWwgdG8gbm90IGxvZyB0aGlzIGVycm9yLlxuICAgICAgICAgICAgLmNhdGNoKChfaWdub3JlZCkgPT4ge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFNJTEVOVF9FUlJPUik7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoc3RyZWFtUmVzdWx0KSA9PiBzdHJlYW1SZXN1bHQucmVzcG9uc2UpXG4gICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGlmIChpc1ZhbGlkUmVzcG9uc2UocmVzcG9uc2UpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faGlzdG9yeS5wdXNoKG5ld0NvbnRlbnQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlQ29udGVudCA9IE9iamVjdC5hc3NpZ24oe30sIHJlc3BvbnNlLmNhbmRpZGF0ZXNbMF0uY29udGVudCk7XG4gICAgICAgICAgICAgICAgLy8gUmVzcG9uc2Ugc2VlbXMgdG8gY29tZSBiYWNrIHdpdGhvdXQgYSByb2xlIHNldC5cbiAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlQ29udGVudC5yb2xlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlQ29udGVudC5yb2xlID0gXCJtb2RlbFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9oaXN0b3J5LnB1c2gocmVzcG9uc2VDb250ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJsb2NrRXJyb3JNZXNzYWdlID0gZm9ybWF0QmxvY2tFcnJvck1lc3NhZ2UocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIGlmIChibG9ja0Vycm9yTWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYHNlbmRNZXNzYWdlU3RyZWFtKCkgd2FzIHVuc3VjY2Vzc2Z1bC4gJHtibG9ja0Vycm9yTWVzc2FnZX0uIEluc3BlY3QgcmVzcG9uc2Ugb2JqZWN0IGZvciBkZXRhaWxzLmApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgLy8gRXJyb3JzIGluIHN0cmVhbVByb21pc2UgYXJlIGFscmVhZHkgY2F0Y2hhYmxlIGJ5IHRoZSB1c2VyIGFzXG4gICAgICAgICAgICAvLyBzdHJlYW1Qcm9taXNlIGlzIHJldHVybmVkLlxuICAgICAgICAgICAgLy8gQXZvaWQgZHVwbGljYXRpbmcgdGhlIGVycm9yIG1lc3NhZ2UgaW4gbG9ncy5cbiAgICAgICAgICAgIGlmIChlLm1lc3NhZ2UgIT09IFNJTEVOVF9FUlJPUikge1xuICAgICAgICAgICAgICAgIC8vIFVzZXJzIGRvIG5vdCBoYXZlIGFjY2VzcyB0byBfc2VuZFByb21pc2UgdG8gY2F0Y2ggZXJyb3JzXG4gICAgICAgICAgICAgICAgLy8gZG93bnN0cmVhbSBmcm9tIHN0cmVhbVByb21pc2UsIHNvIHRoZXkgc2hvdWxkIG5vdCB0aHJvdy5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHN0cmVhbVByb21pc2U7XG4gICAgfVxufVxuXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyNCBHb29nbGUgTExDXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gY291bnRUb2tlbnMoYXBpS2V5LCBtb2RlbCwgcGFyYW1zLCBzaW5nbGVSZXF1ZXN0T3B0aW9ucykge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgbWFrZU1vZGVsUmVxdWVzdChtb2RlbCwgVGFzay5DT1VOVF9UT0tFTlMsIGFwaUtleSwgZmFsc2UsIEpTT04uc3RyaW5naWZ5KHBhcmFtcyksIHNpbmdsZVJlcXVlc3RPcHRpb25zKTtcbiAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xufVxuXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyNCBHb29nbGUgTExDXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gZW1iZWRDb250ZW50KGFwaUtleSwgbW9kZWwsIHBhcmFtcywgcmVxdWVzdE9wdGlvbnMpIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IG1ha2VNb2RlbFJlcXVlc3QobW9kZWwsIFRhc2suRU1CRURfQ09OVEVOVCwgYXBpS2V5LCBmYWxzZSwgSlNPTi5zdHJpbmdpZnkocGFyYW1zKSwgcmVxdWVzdE9wdGlvbnMpO1xuICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG59XG5hc3luYyBmdW5jdGlvbiBiYXRjaEVtYmVkQ29udGVudHMoYXBpS2V5LCBtb2RlbCwgcGFyYW1zLCByZXF1ZXN0T3B0aW9ucykge1xuICAgIGNvbnN0IHJlcXVlc3RzV2l0aE1vZGVsID0gcGFyYW1zLnJlcXVlc3RzLm1hcCgocmVxdWVzdCkgPT4ge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCByZXF1ZXN0KSwgeyBtb2RlbCB9KTtcbiAgICB9KTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IG1ha2VNb2RlbFJlcXVlc3QobW9kZWwsIFRhc2suQkFUQ0hfRU1CRURfQ09OVEVOVFMsIGFwaUtleSwgZmFsc2UsIEpTT04uc3RyaW5naWZ5KHsgcmVxdWVzdHM6IHJlcXVlc3RzV2l0aE1vZGVsIH0pLCByZXF1ZXN0T3B0aW9ucyk7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbn1cblxuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMjQgR29vZ2xlIExMQ1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogQ2xhc3MgZm9yIGdlbmVyYXRpdmUgbW9kZWwgQVBJcy5cbiAqIEBwdWJsaWNcbiAqL1xuY2xhc3MgR2VuZXJhdGl2ZU1vZGVsIHtcbiAgICBjb25zdHJ1Y3RvcihhcGlLZXksIG1vZGVsUGFyYW1zLCBfcmVxdWVzdE9wdGlvbnMgPSB7fSkge1xuICAgICAgICB0aGlzLmFwaUtleSA9IGFwaUtleTtcbiAgICAgICAgdGhpcy5fcmVxdWVzdE9wdGlvbnMgPSBfcmVxdWVzdE9wdGlvbnM7XG4gICAgICAgIGlmIChtb2RlbFBhcmFtcy5tb2RlbC5pbmNsdWRlcyhcIi9cIikpIHtcbiAgICAgICAgICAgIC8vIE1vZGVscyBtYXkgYmUgbmFtZWQgXCJtb2RlbHMvbW9kZWwtbmFtZVwiIG9yIFwidHVuZWRNb2RlbHMvbW9kZWwtbmFtZVwiXG4gICAgICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWxQYXJhbXMubW9kZWw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBJZiBwYXRoIGlzIG5vdCBpbmNsdWRlZCwgYXNzdW1lIGl0J3MgYSBub24tdHVuZWQgbW9kZWwuXG4gICAgICAgICAgICB0aGlzLm1vZGVsID0gYG1vZGVscy8ke21vZGVsUGFyYW1zLm1vZGVsfWA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nZW5lcmF0aW9uQ29uZmlnID0gbW9kZWxQYXJhbXMuZ2VuZXJhdGlvbkNvbmZpZyB8fCB7fTtcbiAgICAgICAgdGhpcy5zYWZldHlTZXR0aW5ncyA9IG1vZGVsUGFyYW1zLnNhZmV0eVNldHRpbmdzIHx8IFtdO1xuICAgICAgICB0aGlzLnRvb2xzID0gbW9kZWxQYXJhbXMudG9vbHM7XG4gICAgICAgIHRoaXMudG9vbENvbmZpZyA9IG1vZGVsUGFyYW1zLnRvb2xDb25maWc7XG4gICAgICAgIHRoaXMuc3lzdGVtSW5zdHJ1Y3Rpb24gPSBmb3JtYXRTeXN0ZW1JbnN0cnVjdGlvbihtb2RlbFBhcmFtcy5zeXN0ZW1JbnN0cnVjdGlvbik7XG4gICAgICAgIHRoaXMuY2FjaGVkQ29udGVudCA9IG1vZGVsUGFyYW1zLmNhY2hlZENvbnRlbnQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1ha2VzIGEgc2luZ2xlIG5vbi1zdHJlYW1pbmcgY2FsbCB0byB0aGUgbW9kZWxcbiAgICAgKiBhbmQgcmV0dXJucyBhbiBvYmplY3QgY29udGFpbmluZyBhIHNpbmdsZSB7QGxpbmsgR2VuZXJhdGVDb250ZW50UmVzcG9uc2V9LlxuICAgICAqXG4gICAgICogRmllbGRzIHNldCBpbiB0aGUgb3B0aW9uYWwge0BsaW5rIFNpbmdsZVJlcXVlc3RPcHRpb25zfSBwYXJhbWV0ZXIgd2lsbFxuICAgICAqIHRha2UgcHJlY2VkZW5jZSBvdmVyIHRoZSB7QGxpbmsgUmVxdWVzdE9wdGlvbnN9IHZhbHVlcyBwcm92aWRlZCB0b1xuICAgICAqIHtAbGluayBHb29nbGVHZW5lcmF0aXZlQUkuZ2V0R2VuZXJhdGl2ZU1vZGVsIH0uXG4gICAgICovXG4gICAgYXN5bmMgZ2VuZXJhdGVDb250ZW50KHJlcXVlc3QsIHJlcXVlc3RPcHRpb25zID0ge30pIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCBmb3JtYXR0ZWRQYXJhbXMgPSBmb3JtYXRHZW5lcmF0ZUNvbnRlbnRJbnB1dChyZXF1ZXN0KTtcbiAgICAgICAgY29uc3QgZ2VuZXJhdGl2ZU1vZGVsUmVxdWVzdE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX3JlcXVlc3RPcHRpb25zKSwgcmVxdWVzdE9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gZ2VuZXJhdGVDb250ZW50KHRoaXMuYXBpS2V5LCB0aGlzLm1vZGVsLCBPYmplY3QuYXNzaWduKHsgZ2VuZXJhdGlvbkNvbmZpZzogdGhpcy5nZW5lcmF0aW9uQ29uZmlnLCBzYWZldHlTZXR0aW5nczogdGhpcy5zYWZldHlTZXR0aW5ncywgdG9vbHM6IHRoaXMudG9vbHMsIHRvb2xDb25maWc6IHRoaXMudG9vbENvbmZpZywgc3lzdGVtSW5zdHJ1Y3Rpb246IHRoaXMuc3lzdGVtSW5zdHJ1Y3Rpb24sIGNhY2hlZENvbnRlbnQ6IChfYSA9IHRoaXMuY2FjaGVkQ29udGVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm5hbWUgfSwgZm9ybWF0dGVkUGFyYW1zKSwgZ2VuZXJhdGl2ZU1vZGVsUmVxdWVzdE9wdGlvbnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYWtlcyBhIHNpbmdsZSBzdHJlYW1pbmcgY2FsbCB0byB0aGUgbW9kZWwgYW5kIHJldHVybnMgYW4gb2JqZWN0XG4gICAgICogY29udGFpbmluZyBhbiBpdGVyYWJsZSBzdHJlYW0gdGhhdCBpdGVyYXRlcyBvdmVyIGFsbCBjaHVua3MgaW4gdGhlXG4gICAgICogc3RyZWFtaW5nIHJlc3BvbnNlIGFzIHdlbGwgYXMgYSBwcm9taXNlIHRoYXQgcmV0dXJucyB0aGUgZmluYWxcbiAgICAgKiBhZ2dyZWdhdGVkIHJlc3BvbnNlLlxuICAgICAqXG4gICAgICogRmllbGRzIHNldCBpbiB0aGUgb3B0aW9uYWwge0BsaW5rIFNpbmdsZVJlcXVlc3RPcHRpb25zfSBwYXJhbWV0ZXIgd2lsbFxuICAgICAqIHRha2UgcHJlY2VkZW5jZSBvdmVyIHRoZSB7QGxpbmsgUmVxdWVzdE9wdGlvbnN9IHZhbHVlcyBwcm92aWRlZCB0b1xuICAgICAqIHtAbGluayBHb29nbGVHZW5lcmF0aXZlQUkuZ2V0R2VuZXJhdGl2ZU1vZGVsIH0uXG4gICAgICovXG4gICAgYXN5bmMgZ2VuZXJhdGVDb250ZW50U3RyZWFtKHJlcXVlc3QsIHJlcXVlc3RPcHRpb25zID0ge30pIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCBmb3JtYXR0ZWRQYXJhbXMgPSBmb3JtYXRHZW5lcmF0ZUNvbnRlbnRJbnB1dChyZXF1ZXN0KTtcbiAgICAgICAgY29uc3QgZ2VuZXJhdGl2ZU1vZGVsUmVxdWVzdE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX3JlcXVlc3RPcHRpb25zKSwgcmVxdWVzdE9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gZ2VuZXJhdGVDb250ZW50U3RyZWFtKHRoaXMuYXBpS2V5LCB0aGlzLm1vZGVsLCBPYmplY3QuYXNzaWduKHsgZ2VuZXJhdGlvbkNvbmZpZzogdGhpcy5nZW5lcmF0aW9uQ29uZmlnLCBzYWZldHlTZXR0aW5nczogdGhpcy5zYWZldHlTZXR0aW5ncywgdG9vbHM6IHRoaXMudG9vbHMsIHRvb2xDb25maWc6IHRoaXMudG9vbENvbmZpZywgc3lzdGVtSW5zdHJ1Y3Rpb246IHRoaXMuc3lzdGVtSW5zdHJ1Y3Rpb24sIGNhY2hlZENvbnRlbnQ6IChfYSA9IHRoaXMuY2FjaGVkQ29udGVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm5hbWUgfSwgZm9ybWF0dGVkUGFyYW1zKSwgZ2VuZXJhdGl2ZU1vZGVsUmVxdWVzdE9wdGlvbnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgbmV3IHtAbGluayBDaGF0U2Vzc2lvbn0gaW5zdGFuY2Ugd2hpY2ggY2FuIGJlIHVzZWQgZm9yXG4gICAgICogbXVsdGktdHVybiBjaGF0cy5cbiAgICAgKi9cbiAgICBzdGFydENoYXQoc3RhcnRDaGF0UGFyYW1zKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuIG5ldyBDaGF0U2Vzc2lvbih0aGlzLmFwaUtleSwgdGhpcy5tb2RlbCwgT2JqZWN0LmFzc2lnbih7IGdlbmVyYXRpb25Db25maWc6IHRoaXMuZ2VuZXJhdGlvbkNvbmZpZywgc2FmZXR5U2V0dGluZ3M6IHRoaXMuc2FmZXR5U2V0dGluZ3MsIHRvb2xzOiB0aGlzLnRvb2xzLCB0b29sQ29uZmlnOiB0aGlzLnRvb2xDb25maWcsIHN5c3RlbUluc3RydWN0aW9uOiB0aGlzLnN5c3RlbUluc3RydWN0aW9uLCBjYWNoZWRDb250ZW50OiAoX2EgPSB0aGlzLmNhY2hlZENvbnRlbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5uYW1lIH0sIHN0YXJ0Q2hhdFBhcmFtcyksIHRoaXMuX3JlcXVlc3RPcHRpb25zKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ291bnRzIHRoZSB0b2tlbnMgaW4gdGhlIHByb3ZpZGVkIHJlcXVlc3QuXG4gICAgICpcbiAgICAgKiBGaWVsZHMgc2V0IGluIHRoZSBvcHRpb25hbCB7QGxpbmsgU2luZ2xlUmVxdWVzdE9wdGlvbnN9IHBhcmFtZXRlciB3aWxsXG4gICAgICogdGFrZSBwcmVjZWRlbmNlIG92ZXIgdGhlIHtAbGluayBSZXF1ZXN0T3B0aW9uc30gdmFsdWVzIHByb3ZpZGVkIHRvXG4gICAgICoge0BsaW5rIEdvb2dsZUdlbmVyYXRpdmVBSS5nZXRHZW5lcmF0aXZlTW9kZWwgfS5cbiAgICAgKi9cbiAgICBhc3luYyBjb3VudFRva2VucyhyZXF1ZXN0LCByZXF1ZXN0T3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZFBhcmFtcyA9IGZvcm1hdENvdW50VG9rZW5zSW5wdXQocmVxdWVzdCwge1xuICAgICAgICAgICAgbW9kZWw6IHRoaXMubW9kZWwsXG4gICAgICAgICAgICBnZW5lcmF0aW9uQ29uZmlnOiB0aGlzLmdlbmVyYXRpb25Db25maWcsXG4gICAgICAgICAgICBzYWZldHlTZXR0aW5nczogdGhpcy5zYWZldHlTZXR0aW5ncyxcbiAgICAgICAgICAgIHRvb2xzOiB0aGlzLnRvb2xzLFxuICAgICAgICAgICAgdG9vbENvbmZpZzogdGhpcy50b29sQ29uZmlnLFxuICAgICAgICAgICAgc3lzdGVtSW5zdHJ1Y3Rpb246IHRoaXMuc3lzdGVtSW5zdHJ1Y3Rpb24sXG4gICAgICAgICAgICBjYWNoZWRDb250ZW50OiB0aGlzLmNhY2hlZENvbnRlbnQsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBnZW5lcmF0aXZlTW9kZWxSZXF1ZXN0T3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fcmVxdWVzdE9wdGlvbnMpLCByZXF1ZXN0T3B0aW9ucyk7XG4gICAgICAgIHJldHVybiBjb3VudFRva2Vucyh0aGlzLmFwaUtleSwgdGhpcy5tb2RlbCwgZm9ybWF0dGVkUGFyYW1zLCBnZW5lcmF0aXZlTW9kZWxSZXF1ZXN0T3B0aW9ucyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVtYmVkcyB0aGUgcHJvdmlkZWQgY29udGVudC5cbiAgICAgKlxuICAgICAqIEZpZWxkcyBzZXQgaW4gdGhlIG9wdGlvbmFsIHtAbGluayBTaW5nbGVSZXF1ZXN0T3B0aW9uc30gcGFyYW1ldGVyIHdpbGxcbiAgICAgKiB0YWtlIHByZWNlZGVuY2Ugb3ZlciB0aGUge0BsaW5rIFJlcXVlc3RPcHRpb25zfSB2YWx1ZXMgcHJvdmlkZWQgdG9cbiAgICAgKiB7QGxpbmsgR29vZ2xlR2VuZXJhdGl2ZUFJLmdldEdlbmVyYXRpdmVNb2RlbCB9LlxuICAgICAqL1xuICAgIGFzeW5jIGVtYmVkQ29udGVudChyZXF1ZXN0LCByZXF1ZXN0T3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZFBhcmFtcyA9IGZvcm1hdEVtYmVkQ29udGVudElucHV0KHJlcXVlc3QpO1xuICAgICAgICBjb25zdCBnZW5lcmF0aXZlTW9kZWxSZXF1ZXN0T3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fcmVxdWVzdE9wdGlvbnMpLCByZXF1ZXN0T3B0aW9ucyk7XG4gICAgICAgIHJldHVybiBlbWJlZENvbnRlbnQodGhpcy5hcGlLZXksIHRoaXMubW9kZWwsIGZvcm1hdHRlZFBhcmFtcywgZ2VuZXJhdGl2ZU1vZGVsUmVxdWVzdE9wdGlvbnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFbWJlZHMgYW4gYXJyYXkgb2Yge0BsaW5rIEVtYmVkQ29udGVudFJlcXVlc3R9cy5cbiAgICAgKlxuICAgICAqIEZpZWxkcyBzZXQgaW4gdGhlIG9wdGlvbmFsIHtAbGluayBTaW5nbGVSZXF1ZXN0T3B0aW9uc30gcGFyYW1ldGVyIHdpbGxcbiAgICAgKiB0YWtlIHByZWNlZGVuY2Ugb3ZlciB0aGUge0BsaW5rIFJlcXVlc3RPcHRpb25zfSB2YWx1ZXMgcHJvdmlkZWQgdG9cbiAgICAgKiB7QGxpbmsgR29vZ2xlR2VuZXJhdGl2ZUFJLmdldEdlbmVyYXRpdmVNb2RlbCB9LlxuICAgICAqL1xuICAgIGFzeW5jIGJhdGNoRW1iZWRDb250ZW50cyhiYXRjaEVtYmVkQ29udGVudFJlcXVlc3QsIHJlcXVlc3RPcHRpb25zID0ge30pIHtcbiAgICAgICAgY29uc3QgZ2VuZXJhdGl2ZU1vZGVsUmVxdWVzdE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX3JlcXVlc3RPcHRpb25zKSwgcmVxdWVzdE9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gYmF0Y2hFbWJlZENvbnRlbnRzKHRoaXMuYXBpS2V5LCB0aGlzLm1vZGVsLCBiYXRjaEVtYmVkQ29udGVudFJlcXVlc3QsIGdlbmVyYXRpdmVNb2RlbFJlcXVlc3RPcHRpb25zKTtcbiAgICB9XG59XG5cbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDI0IEdvb2dsZSBMTENcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIFRvcC1sZXZlbCBjbGFzcyBmb3IgdGhpcyBTREtcbiAqIEBwdWJsaWNcbiAqL1xuY2xhc3MgR29vZ2xlR2VuZXJhdGl2ZUFJIHtcbiAgICBjb25zdHJ1Y3RvcihhcGlLZXkpIHtcbiAgICAgICAgdGhpcy5hcGlLZXkgPSBhcGlLZXk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgYSB7QGxpbmsgR2VuZXJhdGl2ZU1vZGVsfSBpbnN0YW5jZSBmb3IgdGhlIHByb3ZpZGVkIG1vZGVsIG5hbWUuXG4gICAgICovXG4gICAgZ2V0R2VuZXJhdGl2ZU1vZGVsKG1vZGVsUGFyYW1zLCByZXF1ZXN0T3B0aW9ucykge1xuICAgICAgICBpZiAoIW1vZGVsUGFyYW1zLm1vZGVsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgR29vZ2xlR2VuZXJhdGl2ZUFJRXJyb3IoYE11c3QgcHJvdmlkZSBhIG1vZGVsIG5hbWUuIGAgK1xuICAgICAgICAgICAgICAgIGBFeGFtcGxlOiBnZW5haS5nZXRHZW5lcmF0aXZlTW9kZWwoeyBtb2RlbDogJ215LW1vZGVsLW5hbWUnIH0pYCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBHZW5lcmF0aXZlTW9kZWwodGhpcy5hcGlLZXksIG1vZGVsUGFyYW1zLCByZXF1ZXN0T3B0aW9ucyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSB7QGxpbmsgR2VuZXJhdGl2ZU1vZGVsfSBpbnN0YW5jZSBmcm9tIHByb3ZpZGVkIGNvbnRlbnQgY2FjaGUuXG4gICAgICovXG4gICAgZ2V0R2VuZXJhdGl2ZU1vZGVsRnJvbUNhY2hlZENvbnRlbnQoY2FjaGVkQ29udGVudCwgbW9kZWxQYXJhbXMsIHJlcXVlc3RPcHRpb25zKSB7XG4gICAgICAgIGlmICghY2FjaGVkQ29udGVudC5uYW1lKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgR29vZ2xlR2VuZXJhdGl2ZUFJUmVxdWVzdElucHV0RXJyb3IoXCJDYWNoZWQgY29udGVudCBtdXN0IGNvbnRhaW4gYSBgbmFtZWAgZmllbGQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY2FjaGVkQ29udGVudC5tb2RlbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEdvb2dsZUdlbmVyYXRpdmVBSVJlcXVlc3RJbnB1dEVycm9yKFwiQ2FjaGVkIGNvbnRlbnQgbXVzdCBjb250YWluIGEgYG1vZGVsYCBmaWVsZC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE5vdCBjaGVja2luZyB0b29scyBhbmQgdG9vbENvbmZpZyBmb3Igbm93IGFzIGl0IHdvdWxkIHJlcXVpcmUgYSBkZWVwXG4gICAgICAgICAqIGVxdWFsaXR5IGNvbXBhcmlzb24gYW5kIGlzbid0IGxpa2VseSB0byBiZSBhIGNvbW1vbiBjYXNlLlxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgZGlzYWxsb3dlZER1cGxpY2F0ZXMgPSBbXCJtb2RlbFwiLCBcInN5c3RlbUluc3RydWN0aW9uXCJdO1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBkaXNhbGxvd2VkRHVwbGljYXRlcykge1xuICAgICAgICAgICAgaWYgKChtb2RlbFBhcmFtcyA9PT0gbnVsbCB8fCBtb2RlbFBhcmFtcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogbW9kZWxQYXJhbXNba2V5XSkgJiZcbiAgICAgICAgICAgICAgICBjYWNoZWRDb250ZW50W2tleV0gJiZcbiAgICAgICAgICAgICAgICAobW9kZWxQYXJhbXMgPT09IG51bGwgfHwgbW9kZWxQYXJhbXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1vZGVsUGFyYW1zW2tleV0pICE9PSBjYWNoZWRDb250ZW50W2tleV0pIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSBcIm1vZGVsXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbW9kZWxQYXJhbXNDb21wID0gbW9kZWxQYXJhbXMubW9kZWwuc3RhcnRzV2l0aChcIm1vZGVscy9cIilcbiAgICAgICAgICAgICAgICAgICAgICAgID8gbW9kZWxQYXJhbXMubW9kZWwucmVwbGFjZShcIm1vZGVscy9cIiwgXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIDogbW9kZWxQYXJhbXMubW9kZWw7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhY2hlZENvbnRlbnRDb21wID0gY2FjaGVkQ29udGVudC5tb2RlbC5zdGFydHNXaXRoKFwibW9kZWxzL1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBjYWNoZWRDb250ZW50Lm1vZGVsLnJlcGxhY2UoXCJtb2RlbHMvXCIsIFwiXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGNhY2hlZENvbnRlbnQubW9kZWw7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtb2RlbFBhcmFtc0NvbXAgPT09IGNhY2hlZENvbnRlbnRDb21wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgR29vZ2xlR2VuZXJhdGl2ZUFJUmVxdWVzdElucHV0RXJyb3IoYERpZmZlcmVudCB2YWx1ZSBmb3IgXCIke2tleX1cIiBzcGVjaWZpZWQgaW4gbW9kZWxQYXJhbXNgICtcbiAgICAgICAgICAgICAgICAgICAgYCAoJHttb2RlbFBhcmFtc1trZXldfSkgYW5kIGNhY2hlZENvbnRlbnQgKCR7Y2FjaGVkQ29udGVudFtrZXldfSlgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBtb2RlbFBhcmFtc0Zyb21DYWNoZSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbW9kZWxQYXJhbXMpLCB7IG1vZGVsOiBjYWNoZWRDb250ZW50Lm1vZGVsLCB0b29sczogY2FjaGVkQ29udGVudC50b29scywgdG9vbENvbmZpZzogY2FjaGVkQ29udGVudC50b29sQ29uZmlnLCBzeXN0ZW1JbnN0cnVjdGlvbjogY2FjaGVkQ29udGVudC5zeXN0ZW1JbnN0cnVjdGlvbiwgY2FjaGVkQ29udGVudCB9KTtcbiAgICAgICAgcmV0dXJuIG5ldyBHZW5lcmF0aXZlTW9kZWwodGhpcy5hcGlLZXksIG1vZGVsUGFyYW1zRnJvbUNhY2hlLCByZXF1ZXN0T3B0aW9ucyk7XG4gICAgfVxufVxuXG5leHBvcnQgeyBCbG9ja1JlYXNvbiwgQ2hhdFNlc3Npb24sIER5bmFtaWNSZXRyaWV2YWxNb2RlLCBFeGVjdXRhYmxlQ29kZUxhbmd1YWdlLCBGaW5pc2hSZWFzb24sIEZ1bmN0aW9uQ2FsbGluZ01vZGUsIEdlbmVyYXRpdmVNb2RlbCwgR29vZ2xlR2VuZXJhdGl2ZUFJLCBHb29nbGVHZW5lcmF0aXZlQUlBYm9ydEVycm9yLCBHb29nbGVHZW5lcmF0aXZlQUlFcnJvciwgR29vZ2xlR2VuZXJhdGl2ZUFJRmV0Y2hFcnJvciwgR29vZ2xlR2VuZXJhdGl2ZUFJUmVxdWVzdElucHV0RXJyb3IsIEdvb2dsZUdlbmVyYXRpdmVBSVJlc3BvbnNlRXJyb3IsIEhhcm1CbG9ja1RocmVzaG9sZCwgSGFybUNhdGVnb3J5LCBIYXJtUHJvYmFiaWxpdHksIE91dGNvbWUsIFBPU1NJQkxFX1JPTEVTLCBTY2hlbWFUeXBlLCBUYXNrVHlwZSB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwgIi8qKlxuICogXHVCQ0ExXHVEMTMwIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUJDMEYgXHVDNzIwXHVDMEFDXHVCM0M0IFx1QUNDNFx1QzBCMCBcdUJBQThcdUI0QzhcbiAqL1xuXG5pbXBvcnQgdHlwZSB7IEFwcCwgUGx1Z2luTWFuaWZlc3QgfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgeyBHb29nbGVHZW5lcmF0aXZlQUkgfSBmcm9tICdAZ29vZ2xlL2dlbmVyYXRpdmUtYWknO1xuaW1wb3J0IHsgYXBwZW5kRW1iZWRkaW5nTG9nIH0gZnJvbSAnLi4vbG9nZ2luZyc7XG5cbi8qKlxuICogXHVDRjU0XHVDMEFDXHVDNzc4IFx1QzcyMFx1QzBBQ1x1QjNDNFx1Qjk3QyBcdUFDQzRcdUMwQjBcdUQ1NjlcdUIyQzhcdUIyRTRcbiAqIEBwYXJhbSB2ZWNBIFx1QkNBMVx1RDEzMCBBXG4gKiBAcGFyYW0gdmVjQiBcdUJDQTFcdUQxMzAgQlxuICogQHJldHVybnMgXHVDRjU0XHVDMEFDXHVDNzc4IFx1QzcyMFx1QzBBQ1x1QjNDNCAoLTF+MSlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvc2luZVNpbWlsYXJpdHkodmVjQTogbnVtYmVyW10sIHZlY0I6IG51bWJlcltdKTogbnVtYmVyIHtcbiAgaWYgKHZlY0EubGVuZ3RoICE9PSB2ZWNCLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBFcnJvcignXHVCQ0ExXHVEMTMwXHVDNzU4IFx1Q0MyOFx1QzZEMFx1Qzc3NCBcdUM3N0NcdUNFNThcdUQ1NThcdUM5QzAgXHVDNTRBXHVDMkI1XHVCMkM4XHVCMkU0Jyk7XG4gIH1cblxuICBsZXQgZG90UHJvZHVjdCA9IDA7XG4gIGxldCBub3JtQSA9IDA7XG4gIGxldCBub3JtQiA9IDA7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB2ZWNBLmxlbmd0aDsgaSsrKSB7XG4gICAgZG90UHJvZHVjdCArPSB2ZWNBW2ldICogdmVjQltpXTtcbiAgICBub3JtQSArPSB2ZWNBW2ldICogdmVjQVtpXTtcbiAgICBub3JtQiArPSB2ZWNCW2ldICogdmVjQltpXTtcbiAgfVxuXG4gIGNvbnN0IGRlbm9taW5hdG9yID0gTWF0aC5zcXJ0KG5vcm1BKSAqIE1hdGguc3FydChub3JtQik7XG4gIGlmIChkZW5vbWluYXRvciA9PT0gMCkge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgcmV0dXJuIGRvdFByb2R1Y3QgLyBkZW5vbWluYXRvcjtcbn1cblxuLyoqXG4gKiBHZW1pbmkgQVBJXHVCOTdDIFx1QzBBQ1x1QzZBOVx1RDU1OFx1QzVFQyBcdUQxNERcdUMyQTRcdUQyQjggXHVDNzg0XHVCQ0EwXHVCNTI5XHVDNzQ0IFx1QzBERFx1QzEzMVx1RDU2OVx1QjJDOFx1QjJFNFxuICovXG5leHBvcnQgY2xhc3MgRW1iZWRkaW5nR2VuZXJhdG9yIHtcbiAgcHJpdmF0ZSBnZW5BSTogR29vZ2xlR2VuZXJhdGl2ZUFJIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgbW9kZWw6IGFueSA9IG51bGw7XG4gIHByaXZhdGUgY2FjaGU6IE1hcDxzdHJpbmcsIG51bWJlcltdPiA9IG5ldyBNYXAoKTtcbiAgcHJpdmF0ZSBsYXN0RW1iZWRkaW5nOiBudW1iZXJbXSB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGxhc3RUZXh0OiBzdHJpbmcgPSAnJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGFwaUtleTogc3RyaW5nLFxuICAgIHByaXZhdGUgbW9kZWxOYW1lOiBzdHJpbmcgPSAnZW1iZWRkaW5nLTAwMScsXG4gICAgcHJpdmF0ZSBhcHA/OiBBcHAsXG4gICAgcHJpdmF0ZSBtYW5pZmVzdD86IFBsdWdpbk1hbmlmZXN0LFxuICAgIHByaXZhdGUgZW5hYmxlTG9nZ2luZzogYm9vbGVhbiA9IGZhbHNlXG4gICkge1xuICAgIGlmIChhcGlLZXkpIHtcbiAgICAgIHRoaXMuZ2VuQUkgPSBuZXcgR29vZ2xlR2VuZXJhdGl2ZUFJKGFwaUtleSk7XG4gICAgICAvLyBtb2RlbHMvIFx1QzgxMVx1QjQ1MFx1QzBBQyBcdUM4MUNcdUFDNzBcbiAgICAgIGNvbnN0IGNsZWFuTW9kZWxOYW1lID0gdGhpcy5tb2RlbE5hbWUucmVwbGFjZSgvXm1vZGVsc1xcLy8sICcnKTtcbiAgICAgIHRoaXMubW9kZWwgPSB0aGlzLmdlbkFJLmdldEdlbmVyYXRpdmVNb2RlbCh7IG1vZGVsOiBjbGVhbk1vZGVsTmFtZSB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogXHVEMTREXHVDMkE0XHVEMkI4XHVCOTdDIFx1QkNBMVx1RDEzMFx1Qjg1QyBcdUJDQzBcdUQ2NThcdUQ1NjlcdUIyQzhcdUIyRTRcbiAgICogQHBhcmFtIHRleHQgXHVDNzg1XHVCODI1IFx1RDE0RFx1QzJBNFx1RDJCOFxuICAgKiBAcmV0dXJucyBcdUM3ODRcdUJDQTBcdUI1MjkgXHVCQ0ExXHVEMTMwXG4gICAqL1xuICBhc3luYyBlbWJlZCh0ZXh0OiBzdHJpbmcpOiBQcm9taXNlPG51bWJlcltdPiB7XG4gICAgaWYgKCF0aGlzLm1vZGVsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0dlbWluaSBBUElcdUFDMDAgXHVDRDA4XHVBRTMwXHVENjU0XHVCNDE4XHVDOUMwIFx1QzU0QVx1QzU1OFx1QzJCNVx1QjJDOFx1QjJFNCcpO1xuICAgIH1cblxuICAgIGxldCBlbWJlZGRpbmc6IG51bWJlcltdIHwgdW5kZWZpbmVkO1xuXG4gICAgLy8gXHVDRTkwXHVDMkRDIFx1RDY1NVx1Qzc3OFxuICAgIGlmICh0aGlzLmNhY2hlLmhhcyh0ZXh0KSkge1xuICAgICAgZW1iZWRkaW5nID0gdGhpcy5jYWNoZS5nZXQodGV4dCkhO1xuICAgIH0gZWxzZSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLm1vZGVsLmVtYmVkQ29udGVudCh0ZXh0KTtcbiAgICAgICAgZW1iZWRkaW5nID0gcmVzdWx0LmVtYmVkZGluZy52YWx1ZXM7XG5cbiAgICAgICAgLy8gXHVDRTkwXHVDMkRDXHVDNUQwIFx1QzgwMFx1QzdBNVxuICAgICAgICB0aGlzLmNhY2hlLnNldCh0ZXh0LCBlbWJlZGRpbmcpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzBERFx1QzEzMSBcdUMyRTRcdUQzMjg6JywgZXJyb3IpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUMwRERcdUMxMzEgXHVDMkU0XHVEMzI4OiAke2Vycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKX1gKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBcdUI4NUNcdUFFNDUgXHVDQzk4XHVCOUFDIC0gXHVCQUE4XHVCNEUwIFx1Qzc4NFx1QkNBMFx1QjUyOShcdUNFOTBcdUMyREMgXHVEM0VDXHVENTY4KVx1Qzc0NCBcdUI4NUNcdUFFNDVcbiAgICBpZiAodGhpcy5lbmFibGVMb2dnaW5nICYmIHRoaXMuYXBwKSB7XG4gICAgICB0cnkge1xuICAgICAgICBsZXQgc2ltaWxhcml0eTogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgICAgICBsZXQgcHJldmlvdXNUZXh0OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICAgICAgaWYgKHRoaXMubGFzdEVtYmVkZGluZykge1xuICAgICAgICAgIHNpbWlsYXJpdHkgPSBjb3NpbmVTaW1pbGFyaXR5KHRoaXMubGFzdEVtYmVkZGluZywgZW1iZWRkaW5nKTtcbiAgICAgICAgICBwcmV2aW91c1RleHQgPSB0aGlzLmxhc3RUZXh0O1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgYXBwZW5kRW1iZWRkaW5nTG9nKHRoaXMuYXBwLCB0aGlzLm1hbmlmZXN0LCB7XG4gICAgICAgICAgaW5wdXRUZXh0OiB0ZXh0LFxuICAgICAgICAgIGVtYmVkZGluZyxcbiAgICAgICAgICBzaW1pbGFyaXR5LFxuICAgICAgICAgIHByZXZpb3VzSW5wdXRUZXh0OiBwcmV2aW91c1RleHRcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChsb2dFcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdcdUM3ODRcdUJDQTBcdUI1MjkgXHVCODVDXHVBREY4IFx1Qzc5MVx1QzEzMSBcdUMyRTRcdUQzMjg6JywgbG9nRXJyb3IpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFx1QjlDOFx1QzlDMFx1QjlDOSBcdUM3ODRcdUJDQTBcdUI1MjkgXHVDNUM1XHVCMzcwXHVDNzc0XHVEMkI4XG4gICAgdGhpcy5sYXN0RW1iZWRkaW5nID0gZW1iZWRkaW5nO1xuICAgIHRoaXMubGFzdFRleHQgPSB0ZXh0O1xuXG4gICAgcmV0dXJuIGVtYmVkZGluZztcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUM1RUNcdUI3RUMgXHVEMTREXHVDMkE0XHVEMkI4XHVCOTdDIFx1RDU1QyBcdUJDODhcdUM1RDAgXHVCQ0ExXHVEMTMwXHVCODVDIFx1QkNDMFx1RDY1OFx1RDU2OVx1QjJDOFx1QjJFNFxuICAgKiBAcGFyYW0gdGV4dHMgXHVDNzg1XHVCODI1IFx1RDE0RFx1QzJBNFx1RDJCOCBcdUJDMzBcdUM1RjRcbiAgICogQHJldHVybnMgXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QkNBMVx1RDEzMCBcdUJDMzBcdUM1RjRcbiAgICovXG4gIGFzeW5jIGVtYmVkQmF0Y2godGV4dHM6IHN0cmluZ1tdKTogUHJvbWlzZTxudW1iZXJbXVtdPiB7XG4gICAgY29uc3QgZW1iZWRkaW5nczogbnVtYmVyW11bXSA9IFtdO1xuXG4gICAgZm9yIChjb25zdCB0ZXh0IG9mIHRleHRzKSB7XG4gICAgICBjb25zdCBlbWJlZGRpbmcgPSBhd2FpdCB0aGlzLmVtYmVkKHRleHQpO1xuICAgICAgZW1iZWRkaW5ncy5wdXNoKGVtYmVkZGluZyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVtYmVkZGluZ3M7XG4gIH1cblxuICAvKipcbiAgICogXHVDRTkwXHVDMkRDXHVCOTdDIFx1Q0QwOFx1QUUzMFx1RDY1NFx1RDU2OVx1QjJDOFx1QjJFNFxuICAgKi9cbiAgY2xlYXJDYWNoZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNhY2hlLmNsZWFyKCk7XG4gIH1cbn1cbiIsICIvKipcbiAqIFx1QzhGQ1x1QzgxQyBcdUJEODRcdUI5QUMgXHVDNUQ0XHVDOUM0XG4gKiBcbiAqIFx1QjMwMFx1RDY1NFx1Qzc1OCBcdUM3NThcdUJCRjhcdUI4NjBcdUM4MDEgXHVBQ0JEXHVBQ0M0XHVCOTdDIFx1RDBEMFx1QzlDMFx1RDU1OFx1QzVFQyBcdUM4RkNcdUM4MUNcdUJDQzRcdUI4NUMgXHVCRDg0XHVCOUFDXHVENTY5XHVCMkM4XHVCMkU0LlxuICovXG5cbmltcG9ydCB0eXBlIHsgQXBwLCBQbHVnaW5NYW5pZmVzdCB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHVybiB9IGZyb20gJy4uL2NvbnZlcnNhdGlvbic7XG5pbXBvcnQgeyBleHRyYWN0S2V5d29yZHMsIGZvcm1hdEtleXdvcmRzTWV0YWRhdGEsIGV4dHJhY3RDb21tb25LZXl3b3JkcyB9IGZyb20gJy4va2V5d29yZEV4dHJhY3Rvcic7XG5pbXBvcnQgeyBFbWJlZGRpbmdHZW5lcmF0b3IsIGNvc2luZVNpbWlsYXJpdHkgfSBmcm9tICcuL2VtYmVkZGluZ1NlcnZpY2UnO1xuaW1wb3J0IHsgYXBwZW5kVG9waWNTZXBhcmF0aW9uRmFpbHVyZUxvZyB9IGZyb20gJy4uL2xvZ2dpbmcnO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25TZWdtZW50LCBUb3BpY0JvdW5kYXJ5LCBTZWdtZW50TGluaywgVG9waWNTZXBhcmF0aW9uUmVzdWx0IH0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVG9waWNTZXBhcmF0aW9uQ29uZmlnIHtcbiAgYXBpS2V5OiBzdHJpbmc7XG4gIGVtYmVkZGluZ01vZGVsPzogc3RyaW5nOyAvLyBcdUM3ODRcdUJDQTBcdUI1MjkgXHVCQUE4XHVCMzc4IFx1Qzc3NFx1Qjk4NFxuICBzaW1pbGFyaXR5VGhyZXNob2xkPzogbnVtYmVyOyAvLyBcdUFFMzBcdUJDRjhcdUFDMTI6IDAuNzVcbiAgbWluU2VnbWVudExlbmd0aD86IG51bWJlcjsgLy8gXHVDRDVDXHVDMThDIFx1QzEzOFx1QURGOFx1QkEzQ1x1RDJCOCBcdUFFMzhcdUM3NzQgKFx1RDEzNCBcdUMyMTgpXG4gIHdpbmRvd1NpemU/OiBudW1iZXI7IC8vIFx1QzJBQ1x1Qjc3Q1x1Qzc3NFx1QjUyOSBcdUM3MDhcdUIzQzRcdUM2QjAgXHVEMDZDXHVBRTMwXG4gIGVuYWJsZUtleXdvcmRNZXRhZGF0YT86IGJvb2xlYW47IC8vIFx1RDBBNFx1QzZDQ1x1QjREQyBcdUJBNTRcdUQwQzBcdUIzNzBcdUM3NzRcdUQxMzAgXHVDMEFDXHVDNkE5IFx1QzVFQ1x1QkQ4MFxuICBhcHA/OiBBcHA7IC8vIFx1Qjg1Q1x1QUU0NVx1QzZBOSBPYnNpZGlhbiBcdUM1NzFcbiAgbWFuaWZlc3Q/OiBQbHVnaW5NYW5pZmVzdDsgLy8gXHVENTBDXHVCN0VDXHVBREY4XHVDNzc4IFx1QjlFNFx1QjJDOFx1RDM5OFx1QzJBNFx1RDJCOFxuICBlbmFibGVFbWJlZGRpbmdMb2dnaW5nPzogYm9vbGVhbjsgLy8gXHVDNzg0XHVCQ0EwXHVCNTI5IFx1Qjg1Q1x1QUU0NSBcdUQ2NUNcdUMxMzFcdUQ2NTRcbn1cblxuZXhwb3J0IGNsYXNzIFRvcGljU2VwYXJhdGlvbkVuZ2luZSB7XG4gIHByaXZhdGUgZW1iZWRkaW5nR2VuZXJhdG9yOiBFbWJlZGRpbmdHZW5lcmF0b3I7XG4gIHByaXZhdGUgY29uZmlnOiBUb3BpY1NlcGFyYXRpb25Db25maWc7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBUb3BpY1NlcGFyYXRpb25Db25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IHtcbiAgICAgIC4uLmNvbmZpZyxcbiAgICAgIHNpbWlsYXJpdHlUaHJlc2hvbGQ6IGNvbmZpZy5zaW1pbGFyaXR5VGhyZXNob2xkID8/IDAuNzUsXG4gICAgICBtaW5TZWdtZW50TGVuZ3RoOiBjb25maWcubWluU2VnbWVudExlbmd0aCA/PyAyLFxuICAgICAgd2luZG93U2l6ZTogY29uZmlnLndpbmRvd1NpemUgPz8gMixcbiAgICAgIGVuYWJsZUtleXdvcmRNZXRhZGF0YTogY29uZmlnLmVuYWJsZUtleXdvcmRNZXRhZGF0YSA/PyB0cnVlLFxuICAgICAgZW5hYmxlRW1iZWRkaW5nTG9nZ2luZzogY29uZmlnLmVuYWJsZUVtYmVkZGluZ0xvZ2dpbmcgPz8gZmFsc2VcbiAgICB9O1xuICAgIHRoaXMuZW1iZWRkaW5nR2VuZXJhdG9yID0gbmV3IEVtYmVkZGluZ0dlbmVyYXRvcihcbiAgICAgIGNvbmZpZy5hcGlLZXksXG4gICAgICBjb25maWcuZW1iZWRkaW5nTW9kZWwgPz8gJ2VtYmVkZGluZy0wMDEnLFxuICAgICAgY29uZmlnLmFwcCxcbiAgICAgIGNvbmZpZy5tYW5pZmVzdCxcbiAgICAgIGNvbmZpZy5lbmFibGVFbWJlZGRpbmdMb2dnaW5nID8/IGZhbHNlXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUIzMDBcdUQ2NTRcdUI5N0MgXHVDOEZDXHVDODFDXHVCQ0M0XHVCODVDIFx1QkQ4NFx1QjlBQ1x1RDU2OVx1QjJDOFx1QjJFNFxuICAgKiBAcGFyYW0gdHVybnMgXHVCMzAwXHVENjU0IFx1RDEzNCBcdUJDMzBcdUM1RjRcbiAgICogQHJldHVybnMgXHVDOEZDXHVDODFDIFx1QkQ4NFx1QjlBQyBcdUFDQjBcdUFDRkNcbiAgICovXG4gIGFzeW5jIHNlcGFyYXRlVG9waWNzKHR1cm5zOiBDb252ZXJzYXRpb25UdXJuW10pOiBQcm9taXNlPFRvcGljU2VwYXJhdGlvblJlc3VsdD4ge1xuICAgIHRyeSB7XG4gICAgICBpZiAodHVybnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc2VnbWVudHM6IFtdLFxuICAgICAgICAgIGJvdW5kYXJpZXM6IFtdLFxuICAgICAgICAgIGxpbmtzOiBbXVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICAvLyAxLiBcdUFDMDEgXHVEMTM0XHVDNzU4IFx1RDE0RFx1QzJBNFx1RDJCOCBcdUM5MDBcdUJFNDQgKFx1RDBBNFx1QzZDQ1x1QjREQyBcdUJBNTRcdUQwQzBcdUIzNzBcdUM3NzRcdUQxMzAgXHVDRDk0XHVBQzAwKVxuICAgICAgY29uc3QgdHVyblRleHRzID0gdGhpcy5wcmVwYXJlVHVyblRleHRzKHR1cm5zKTtcblxuICAgICAgLy8gMi4gXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzBERFx1QzEzMVxuICAgICAgY29uc29sZS5sb2coJ1x1Qzc4NFx1QkNBMFx1QjUyOSBcdUMwRERcdUMxMzEgXHVDOTExLi4uJyk7XG4gICAgICBsZXQgZW1iZWRkaW5nczogbnVtYmVyW11bXTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGVtYmVkZGluZ3MgPSBhd2FpdCB0aGlzLmVtYmVkZGluZ0dlbmVyYXRvci5lbWJlZEJhdGNoKHR1cm5UZXh0cyk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zdCBtc2cgPSBgXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzBERFx1QzEzMSBcdUMyRTRcdUQzMjg6ICR7ZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpfWA7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5hcHApIHtcbiAgICAgICAgICBhd2FpdCBhcHBlbmRUb3BpY1NlcGFyYXRpb25GYWlsdXJlTG9nKHRoaXMuY29uZmlnLmFwcCwgdGhpcy5jb25maWcubWFuaWZlc3QsIG1zZywgZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgICAgfVxuXG4gICAgICAvLyAzLiBcdUMyQUNcdUI3N0NcdUM3NzRcdUI1MjkgXHVDNzA4XHVCM0M0XHVDNkIwXHVCODVDIFx1QzcyMFx1QzBBQ1x1QjNDNCBcdUFDQzRcdUMwQjBcbiAgICAgIGNvbnNvbGUubG9nKCdcdUM3MjBcdUMwQUNcdUIzQzQgXHVBQ0M0XHVDMEIwIFx1QzkxMS4uLicpO1xuICAgICAgbGV0IHNpbWlsYXJpdGllczogbnVtYmVyW107XG4gICAgICB0cnkge1xuICAgICAgICBzaW1pbGFyaXRpZXMgPSB0aGlzLmNhbGN1bGF0ZVdpbmRvd1NpbWlsYXJpdGllcyhlbWJlZGRpbmdzKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnN0IG1zZyA9IGBcdUM3MjBcdUMwQUNcdUIzQzQgXHVBQ0M0XHVDMEIwIFx1QzJFNFx1RDMyODogJHtlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcil9YDtcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmFwcCkge1xuICAgICAgICAgIGF3YWl0IGFwcGVuZFRvcGljU2VwYXJhdGlvbkZhaWx1cmVMb2codGhpcy5jb25maWcuYXBwLCB0aGlzLmNvbmZpZy5tYW5pZmVzdCwgbXNnLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgICB9XG5cbiAgICAgIC8vIDQuIFx1QzhGQ1x1QzgxQyBcdUFDQkRcdUFDQzQgXHVEMEQwXHVDOUMwXG4gICAgICBjb25zb2xlLmxvZygnXHVDOEZDXHVDODFDIFx1QUNCRFx1QUNDNCBcdUQwRDBcdUM5QzAgXHVDOTExLi4uJyk7XG4gICAgICBsZXQgYm91bmRhcmllczogVG9waWNCb3VuZGFyeVtdO1xuICAgICAgdHJ5IHtcbiAgICAgICAgYm91bmRhcmllcyA9IHRoaXMuZGV0ZWN0VG9waWNCb3VuZGFyaWVzKHNpbWlsYXJpdGllcyk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zdCBtc2cgPSBgXHVDOEZDXHVDODFDIFx1QUNCRFx1QUNDNCBcdUQwRDBcdUM5QzAgXHVDMkU0XHVEMzI4OiAke2Vycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKX1gO1xuICAgICAgICBpZiAodGhpcy5jb25maWcuYXBwKSB7XG4gICAgICAgICAgYXdhaXQgYXBwZW5kVG9waWNTZXBhcmF0aW9uRmFpbHVyZUxvZyh0aGlzLmNvbmZpZy5hcHAsIHRoaXMuY29uZmlnLm1hbmlmZXN0LCBtc2csIGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgIH1cblxuICAgICAgLy8gNS4gXHVDMTM4XHVBREY4XHVCQTNDXHVEMkI4IFx1QzBERFx1QzEzMVxuICAgICAgY29uc29sZS5sb2coJ1x1QzEzOFx1QURGOFx1QkEzQ1x1RDJCOCBcdUMwRERcdUMxMzEgXHVDOTExLi4uJyk7XG4gICAgICBsZXQgc2VnbWVudHM6IENvbnZlcnNhdGlvblNlZ21lbnRbXTtcbiAgICAgIHRyeSB7XG4gICAgICAgIHNlZ21lbnRzID0gdGhpcy5jcmVhdGVTZWdtZW50cyh0dXJucywgYm91bmRhcmllcywgc2ltaWxhcml0aWVzKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnN0IG1zZyA9IGBcdUMxMzhcdUFERjhcdUJBM0NcdUQyQjggXHVDMEREXHVDMTMxIFx1QzJFNFx1RDMyODogJHtlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcil9YDtcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmFwcCkge1xuICAgICAgICAgIGF3YWl0IGFwcGVuZFRvcGljU2VwYXJhdGlvbkZhaWx1cmVMb2codGhpcy5jb25maWcuYXBwLCB0aGlzLmNvbmZpZy5tYW5pZmVzdCwgbXNnLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgICB9XG5cbiAgICAgIC8vIDYuIFx1QzEzOFx1QURGOFx1QkEzQ1x1RDJCOCBcdUFDMDQgXHVCOUMxXHVEMDZDIFx1QkQ4NFx1QzExRFxuICAgICAgY29uc29sZS5sb2coJ1x1QzEzOFx1QURGOFx1QkEzQ1x1RDJCOCBcdUI5QzFcdUQwNkMgXHVCRDg0XHVDMTFEIFx1QzkxMS4uLicpO1xuICAgICAgbGV0IGxpbmtzOiBTZWdtZW50TGlua1tdO1xuICAgICAgdHJ5IHtcbiAgICAgICAgbGlua3MgPSB0aGlzLmFuYWx5emVTZWdtZW50TGlua3Moc2VnbWVudHMpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc3QgbXNnID0gYFx1QzEzOFx1QURGOFx1QkEzQ1x1RDJCOCBcdUI5QzFcdUQwNkMgXHVCRDg0XHVDMTFEIFx1QzJFNFx1RDMyODogJHtlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcil9YDtcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmFwcCkge1xuICAgICAgICAgIGF3YWl0IGFwcGVuZFRvcGljU2VwYXJhdGlvbkZhaWx1cmVMb2codGhpcy5jb25maWcuYXBwLCB0aGlzLmNvbmZpZy5tYW5pZmVzdCwgbXNnLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNlZ21lbnRzLFxuICAgICAgICBib3VuZGFyaWVzLFxuICAgICAgICBsaW5rc1xuICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgLy8gXHVDNzc0XHVCQkY4IFx1Qjg1Q1x1QUU0NVx1QjQxQyBcdUM1RDBcdUI3RUNcdUIyOTQgXHVCMkU0XHVDMkRDIFx1Qjg1Q1x1QUU0NVx1RDU1OFx1QzlDMCBcdUM1NEFcdUM3NENcbiAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmIGVycm9yLm1lc3NhZ2UuaW5jbHVkZXMoJ1x1QzJFNFx1RDMyODonKSkge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH1cblxuICAgICAgLy8gXHVDNjA4XHVDMEMxXHVDRTU4IFx1QkFCQlx1RDU1QyBcdUM1RDBcdUI3RUNcbiAgICAgIGNvbnN0IG1zZyA9IGBcdUM4RkNcdUM4MUMgXHVCRDg0XHVCOUFDIFx1QzkxMSBcdUM2MDhcdUMwQzFcdUNFNTggXHVCQUJCXHVENTVDIFx1QzYyNFx1Qjk1ODogJHtlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcil9YDtcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5hcHApIHtcbiAgICAgICAgYXdhaXQgYXBwZW5kVG9waWNTZXBhcmF0aW9uRmFpbHVyZUxvZyh0aGlzLmNvbmZpZy5hcHAsIHRoaXMuY29uZmlnLm1hbmlmZXN0LCBtc2csIGVycm9yKTtcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBcdUQxNERcdUMyQTRcdUQyQjhcdUM3NTggXHVCOUM4XHVDOUMwXHVCOUM5IE5cdUFDMUMgXHVCQjM4XHVDN0E1XHVDNzQ0IFx1Q0Q5NFx1Q0Q5Q1x1RDU2OVx1QjJDOFx1QjJFNFxuICAgKi9cbiAgcHJpdmF0ZSBnZXRMYXN0TlNlbnRlbmNlcyh0ZXh0OiBzdHJpbmcsIG46IG51bWJlciA9IDMpOiBzdHJpbmcge1xuICAgIC8vIFx1QjlDOFx1Q0U2OFx1RDQ1QywgXHVCMjkwXHVCMDhDXHVENDVDLCBcdUJCM0NcdUM3NENcdUQ0NUNcdUI4NUMgXHVCQjM4XHVDN0E1XHVDNzQ0IFx1QkQ4NFx1QjlBQ1xuICAgIGNvbnN0IHNlbnRlbmNlcyA9IHRleHQuc3BsaXQoLyhbLiE/XSspLykuZmlsdGVyKHMgPT4gcy50cmltKCkubGVuZ3RoID4gMCk7XG4gICAgXG4gICAgLy8gXHVCQjM4XHVDN0E1IFx1QzMwRFx1QzczQ1x1Qjg1QyBcdUFENkNcdUMxMzEgKFx1QkIzOFx1QzdBNSArIFx1QUQ2Q1x1QjQ1MFx1QzgxMClcbiAgICBjb25zdCBzZW50ZW5jZUxpc3Q6IHN0cmluZ1tdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZW50ZW5jZXMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgIGlmIChpICsgMSA8IHNlbnRlbmNlcy5sZW5ndGgpIHtcbiAgICAgICAgc2VudGVuY2VMaXN0LnB1c2goc2VudGVuY2VzW2ldICsgc2VudGVuY2VzW2kgKyAxXSk7XG4gICAgICB9IGVsc2UgaWYgKGkgPCBzZW50ZW5jZXMubGVuZ3RoKSB7XG4gICAgICAgIHNlbnRlbmNlTGlzdC5wdXNoKHNlbnRlbmNlc1tpXSk7XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vIFx1QjlDOFx1QzlDMFx1QjlDOSBOXHVBQzFDIFx1QkIzOFx1QzdBNSBcdUNEOTRcdUNEOUNcbiAgICBjb25zdCBsYXN0U2VudGVuY2VzID0gc2VudGVuY2VMaXN0LnNsaWNlKC1uKTtcbiAgICByZXR1cm4gbGFzdFNlbnRlbmNlcy5qb2luKCcgJykudHJpbSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1RDEzNCBcdUQxNERcdUMyQTRcdUQyQjhcdUI5N0MgXHVDOTAwXHVCRTQ0XHVENTY5XHVCMkM4XHVCMkU0IChcdUMwQUNcdUM2QTlcdUM3OTAgXHVDOUMwXHVDODE1IFx1RDYxNVx1QzJERClcbiAgICogXHVDNzg0XHVCQ0EwXHVCNTI5IFx1Qzc4NVx1QjgyNSA9IFtcdUQ2MDRcdUM3QUMgXHVDOUM4XHVCQjM4XHVBQ0ZDIFx1QURGOCBcdUIyRjVcdUJDQzBcdUM3NTggXHVEMEE0XHVDNkNDXHVCNERDXSArIFx1Qzc3NFx1QzgwNCBhc3Npc3RhbnQgXHVCOUM4XHVDOUMwXHVCOUM5IDJ+M1x1QkIzOFx1QzdBNSArIFx1RDYwNFx1QzdBQyBcdUM5QzhcdUJCMzggKyBcdUQ2MDRcdUM3QUMgYXNzaXN0YW50IFx1QjlDOFx1QzlDMFx1QjlDOSAyfjNcdUJCMzhcdUM3QTVcbiAgICovXG4gIHByaXZhdGUgcHJlcGFyZVR1cm5UZXh0cyh0dXJuczogQ29udmVyc2F0aW9uVHVybltdKTogc3RyaW5nW10ge1xuICAgIGNvbnN0IHJlc3VsdDogc3RyaW5nW10gPSBbXTtcbiAgICBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHR1cm5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCB0dXJuID0gdHVybnNbaV07XG4gICAgICBsZXQgZW1iZWRkaW5nSW5wdXQgPSAnJztcbiAgICAgIFxuICAgICAgLy8gdXNlci1hc3Npc3RhbnQgXHVDMzBEXHVDNzQ0IFx1Qzc3NFx1QjhFOFx1QjNDNFx1Qjg1RCBcdUNDOThcdUI5QUNcbiAgICAgIGlmICh0dXJuLnJvbGUgPT09ICd1c2VyJykge1xuICAgICAgICAvLyAxLiBcdUQ2MDRcdUM3QUMgXHVDOUM4XHVCQjM4XHVBQ0ZDIFx1QjJFNFx1Qzc0QyBcdUIyRjVcdUJDQzAoXHVDNzg4XHVCMkU0XHVCQTc0KVx1Qzc1OCBcdUQwQTRcdUM2Q0NcdUI0REMgXHVDRDk0XHVDRDlDXG4gICAgICAgIGxldCBjb21iaW5lZFRleHQgPSB0dXJuLmNvbnRlbnQ7XG4gICAgICAgIGxldCBrZXl3b3Jkczogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgXG4gICAgICAgIC8vIFx1QjJFNFx1Qzc0QyBcdUQxMzRcdUM3NzQgYXNzaXN0YW50XHVDNzc4XHVDOUMwIFx1RDY1NVx1Qzc3OFxuICAgICAgICBpZiAoaSArIDEgPCB0dXJucy5sZW5ndGggJiYgdHVybnNbaSArIDFdLnJvbGUgPT09ICdhc3Npc3RhbnQnKSB7XG4gICAgICAgICAgY29uc3QgbmV4dFR1cm4gPSB0dXJuc1tpICsgMV07XG4gICAgICAgICAgY29tYmluZWRUZXh0ICs9ICcgJyArIG5leHRUdXJuLmNvbnRlbnQ7XG4gICAgICAgICAga2V5d29yZHMgPSBleHRyYWN0S2V5d29yZHMoY29tYmluZWRUZXh0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBrZXl3b3JkcyA9IGV4dHJhY3RLZXl3b3Jkcyh0dXJuLmNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyAyLiBcdUM3NzRcdUM4MDQgYXNzaXN0YW50IFx1QjlDOFx1QzlDMFx1QjlDOSAyfjNcdUJCMzhcdUM3QTUgXHVDRDk0XHVDRDlDIChcdUM3MDhcdUIzQzRcdUM2QjAgXHVDNjI0XHVCQzg0XHVCN0E5KVxuICAgICAgICBsZXQgcHJldmlvdXNBc3Npc3RhbnRPdmVybGFwID0gJyc7XG4gICAgICAgIGZvciAobGV0IGogPSBpIC0gMTsgaiA+PSAwOyBqLS0pIHtcbiAgICAgICAgICBpZiAodHVybnNbal0ucm9sZSA9PT0gJ2Fzc2lzdGFudCcpIHtcbiAgICAgICAgICAgIHByZXZpb3VzQXNzaXN0YW50T3ZlcmxhcCA9IHRoaXMuZ2V0TGFzdE5TZW50ZW5jZXModHVybnNbal0uY29udGVudCwgMyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIDMuIFx1RDYwNFx1QzdBQyBcdUM5QzhcdUJCMzhcbiAgICAgICAgY29uc3QgY3VycmVudFF1ZXN0aW9uID0gdHVybi5jb250ZW50O1xuICAgICAgICBcbiAgICAgICAgLy8gNC4gXHVENjA0XHVDN0FDIFx1QzlDOFx1QkIzOFx1QzVEMCBcdUIzMDBcdUQ1NUMgYXNzaXN0YW50IFx1QjJGNVx1QkNDMFx1Qzc1OCBcdUI5QzhcdUM5QzBcdUI5QzkgMn4zXHVCQjM4XHVDN0E1XG4gICAgICAgIGxldCBjdXJyZW50QXNzaXN0YW50T3ZlcmxhcCA9ICcnO1xuICAgICAgICBpZiAoaSArIDEgPCB0dXJucy5sZW5ndGggJiYgdHVybnNbaSArIDFdLnJvbGUgPT09ICdhc3Npc3RhbnQnKSB7XG4gICAgICAgICAgY3VycmVudEFzc2lzdGFudE92ZXJsYXAgPSB0aGlzLmdldExhc3ROU2VudGVuY2VzKHR1cm5zW2kgKyAxXS5jb250ZW50LCAzKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gXHVCQUE4XHVCNDUwIFx1RDU2OVx1Q0U1OFx1QUUzMFxuICAgICAgICBjb25zdCBrZXl3b3JkU3RyID0ga2V5d29yZHMubGVuZ3RoID4gMCA/IGBbXHVEMEE0XHVDNkNDXHVCNERDOiAke2tleXdvcmRzLmpvaW4oJywgJyl9XWAgOiAnJztcbiAgICAgICAgZW1iZWRkaW5nSW5wdXQgPSBbXG4gICAgICAgICAga2V5d29yZFN0cixcbiAgICAgICAgICBwcmV2aW91c0Fzc2lzdGFudE92ZXJsYXAsXG4gICAgICAgICAgY3VycmVudFF1ZXN0aW9uLFxuICAgICAgICAgIGN1cnJlbnRBc3Npc3RhbnRPdmVybGFwXG4gICAgICAgIF1cbiAgICAgICAgICAuZmlsdGVyKHMgPT4gcy5sZW5ndGggPiAwKVxuICAgICAgICAgIC5qb2luKCcgJyk7XG4gICAgICAgIFxuICAgICAgICByZXN1bHQucHVzaChlbWJlZGRpbmdJbnB1dCk7XG4gICAgICAgIFxuICAgICAgICAvLyBhc3Npc3RhbnQgXHVEMTM0XHVDNzQwIFx1QUM3NFx1QjEwOFx1QjZGMFx1QUUzMCAodXNlciBcdUQxMzRcdUM1RDBcdUMxMUMgXHVDNzc0XHVCQkY4IFx1Q0M5OFx1QjlBQ1x1QjQyOClcbiAgICAgICAgaWYgKGkgKyAxIDwgdHVybnMubGVuZ3RoICYmIHR1cm5zW2kgKyAxXS5yb2xlID09PSAnYXNzaXN0YW50Jykge1xuICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0dXJuLnJvbGUgPT09ICdhc3Npc3RhbnQnICYmIChpID09PSAwIHx8IHR1cm5zW2kgLSAxXS5yb2xlICE9PSAndXNlcicpKSB7XG4gICAgICAgIC8vIHVzZXIgXHVDMzBEXHVDNzc0IFx1QzVDNlx1QjI5NCBcdUIzQzVcdUI5QkRcdUM4MDFcdUM3NzggYXNzaXN0YW50IFx1RDEzNFx1Qzc3OCBcdUFDQkRcdUM2QjBcbiAgICAgICAgY29uc3Qga2V5d29yZHMgPSBleHRyYWN0S2V5d29yZHModHVybi5jb250ZW50KTtcbiAgICAgICAgY29uc3QgbGFzdFNlbnRlbmNlcyA9IHRoaXMuZ2V0TGFzdE5TZW50ZW5jZXModHVybi5jb250ZW50LCAzKTtcbiAgICAgICAgY29uc3Qga2V5d29yZFN0ciA9IGtleXdvcmRzLmxlbmd0aCA+IDAgPyBgW1x1RDBBNFx1QzZDQ1x1QjREQzogJHtrZXl3b3Jkcy5qb2luKCcsICcpfV1gIDogJyc7XG4gICAgICAgIFxuICAgICAgICBlbWJlZGRpbmdJbnB1dCA9IFtrZXl3b3JkU3RyLCBsYXN0U2VudGVuY2VzXS5maWx0ZXIocyA9PiBzLmxlbmd0aCA+IDApLmpvaW4oJyAnKTtcbiAgICAgICAgcmVzdWx0LnB1c2goZW1iZWRkaW5nSW5wdXQpO1xuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICByZXR1cm4gcmVzdWx0Lmxlbmd0aCA+IDAgPyByZXN1bHQgOiB0dXJucy5tYXAodCA9PiB0LmNvbnRlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1QzJBQ1x1Qjc3Q1x1Qzc3NFx1QjUyOSBcdUM3MDhcdUIzQzRcdUM2QjAgXHVCQzI5XHVDMkREXHVDNzNDXHVCODVDIFx1QzcyMFx1QzBBQ1x1QjNDNFx1Qjk3QyBcdUFDQzRcdUMwQjBcdUQ1NjlcdUIyQzhcdUIyRTRcbiAgICovXG4gIHByaXZhdGUgY2FsY3VsYXRlV2luZG93U2ltaWxhcml0aWVzKGVtYmVkZGluZ3M6IG51bWJlcltdW10pOiBudW1iZXJbXSB7XG4gICAgY29uc3Qgc2ltaWxhcml0aWVzOiBudW1iZXJbXSA9IFtdO1xuICAgIGNvbnN0IHdpbmRvd1NpemUgPSB0aGlzLmNvbmZpZy53aW5kb3dTaXplITtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZW1iZWRkaW5ncy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgIC8vIFx1RDYwNFx1QzdBQyBcdUM3MDhcdUIzQzRcdUM2QjA6IFx1RDYwNFx1QzdBQyBcdUQxMzRcdUJEODBcdUQxMzAgd2luZG93U2l6ZVx1QjlDQ1x1RDA3Q1xuICAgICAgY29uc3QgY3VycmVudFdpbmRvdyA9IHRoaXMuY29tYmluZUVtYmVkZGluZ3MoXG4gICAgICAgIGVtYmVkZGluZ3Muc2xpY2UoTWF0aC5tYXgoMCwgaSAtIHdpbmRvd1NpemUgKyAxKSwgaSArIDEpXG4gICAgICApO1xuXG4gICAgICAvLyBcdUIyRTRcdUM3NEMgXHVDNzA4XHVCM0M0XHVDNkIwOiBcdUIyRTRcdUM3NEMgXHVEMTM0XG4gICAgICBjb25zdCBuZXh0V2luZG93ID0gZW1iZWRkaW5nc1tpICsgMV07XG5cbiAgICAgIC8vIFx1QzcyMFx1QzBBQ1x1QjNDNCBcdUFDQzRcdUMwQjBcbiAgICAgIGNvbnN0IHNpbWlsYXJpdHkgPSBjb3NpbmVTaW1pbGFyaXR5KGN1cnJlbnRXaW5kb3csIG5leHRXaW5kb3cpO1xuICAgICAgc2ltaWxhcml0aWVzLnB1c2goc2ltaWxhcml0eSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNpbWlsYXJpdGllcztcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUM1RUNcdUI3RUMgXHVDNzg0XHVCQ0EwXHVCNTI5XHVDNzQ0IFx1RDNDOVx1QURFMFx1RDU1OFx1QzVFQyBcdUQ1NThcdUIwOThcdUI4NUMgXHVBQ0IwXHVENTY5XHVENTY5XHVCMkM4XHVCMkU0XG4gICAqL1xuICBwcml2YXRlIGNvbWJpbmVFbWJlZGRpbmdzKGVtYmVkZGluZ3M6IG51bWJlcltdW10pOiBudW1iZXJbXSB7XG4gICAgLy8gXHVCQzI5XHVDNUI0XHVDODAxIFx1RDUwNFx1Qjg1Q1x1QURGOFx1Qjc5OFx1QkMwRDogXHVDNzc0XHVCODYwXHVDODAxXHVDNzNDXHVCODVDIHVucmVhY2hhYmxlXHVENTU4XHVDOUMwXHVCOUNDIFx1RDBDMFx1Qzc4NSBcdUM1NDhcdUM4MTVcdUMxMzFcdUM3NDQgXHVDNzA0XHVENTc0IFx1QzcyMFx1QzlDMFxuICAgIGlmIChlbWJlZGRpbmdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdcdUM3ODRcdUJDQTBcdUI1MjkgXHVCQzMwXHVDNUY0XHVDNzc0IFx1QkU0NFx1QzVCNFx1Qzc4OFx1QzJCNVx1QjJDOFx1QjJFNCcpO1xuICAgIH1cblxuICAgIGlmIChlbWJlZGRpbmdzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcmV0dXJuIGVtYmVkZGluZ3NbMF07XG4gICAgfVxuXG4gICAgY29uc3QgZGltID0gZW1iZWRkaW5nc1swXS5sZW5ndGg7XG4gICAgY29uc3QgY29tYmluZWQgPSBuZXcgQXJyYXkoZGltKS5maWxsKDApO1xuXG4gICAgZm9yIChjb25zdCBlbWJlZGRpbmcgb2YgZW1iZWRkaW5ncykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaW07IGkrKykge1xuICAgICAgICBjb21iaW5lZFtpXSArPSBlbWJlZGRpbmdbaV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gXHVEM0M5XHVBREUwIFx1QUNDNFx1QzBCMFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGltOyBpKyspIHtcbiAgICAgIGNvbWJpbmVkW2ldIC89IGVtYmVkZGluZ3MubGVuZ3RoO1xuICAgIH1cblxuICAgIHJldHVybiBjb21iaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUM4RkNcdUM4MUMgXHVBQ0JEXHVBQ0M0XHVCOTdDIFx1RDBEMFx1QzlDMFx1RDU2OVx1QjJDOFx1QjJFNFxuICAgKi9cbiAgcHJpdmF0ZSBkZXRlY3RUb3BpY0JvdW5kYXJpZXMoc2ltaWxhcml0aWVzOiBudW1iZXJbXSk6IFRvcGljQm91bmRhcnlbXSB7XG4gICAgY29uc3QgYm91bmRhcmllczogVG9waWNCb3VuZGFyeVtdID0gW107XG4gICAgY29uc3QgdGhyZXNob2xkID0gdGhpcy5jb25maWcuc2ltaWxhcml0eVRocmVzaG9sZCE7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpbWlsYXJpdGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgc2ltaWxhcml0eSA9IHNpbWlsYXJpdGllc1tpXTtcblxuICAgICAgLy8gXHVDNzIwXHVDMEFDXHVCM0M0XHVBQzAwIFx1Qzc4NFx1QUNDNFx1QUMxMiBcdUJCRjhcdUI5Q0NcdUM3NzRcdUFDNzBcdUIwOTggXHVBRTA5XHVBQ0E5XHVENzg4IFx1RDU1OFx1Qjc3RFx1RDU1QyBcdUFDQkRcdUM2QjBcbiAgICAgIGNvbnN0IGlzUHJpbWFyeUJvdW5kYXJ5ID0gc2ltaWxhcml0eSA8IHRocmVzaG9sZDtcblxuICAgICAgLy8gXHVDNzc0XHVDODA0IFx1QjMwMFx1QkU0NCBcdUFFMDlcdUFDQTlcdUQ1NUMgXHVENTU4XHVCNzdEIFx1QUMxMFx1QzlDMFxuICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgIGNvbnN0IHByZXZTaW1pbGFyaXR5ID0gc2ltaWxhcml0aWVzW2kgLSAxXTtcbiAgICAgICAgY29uc3QgZHJvcCA9IHByZXZTaW1pbGFyaXR5IC0gc2ltaWxhcml0eTtcbiAgICAgICAgXG4gICAgICAgIC8vIDAuMTUgXHVDNzc0XHVDMEMxIFx1QUUwOVx1QUNBOVx1RDc4OCBcdUQ1NThcdUI3N0RcdUQ1NUMgXHVBQ0JEXHVDNkIwXHVCM0M0IFx1QUNCRFx1QUNDNFx1Qjg1QyBcdUFDMDRcdUM4RkNcbiAgICAgICAgaWYgKGRyb3AgPiAwLjE1KSB7XG4gICAgICAgICAgYm91bmRhcmllcy5wdXNoKHtcbiAgICAgICAgICAgIGluZGV4OiBpICsgMSwgLy8gXHVCMkU0XHVDNzRDIFx1RDEzNFx1QkQ4MFx1RDEzMCBcdUMwQzhcdUI4NUNcdUM2QjQgXHVDOEZDXHVDODFDXG4gICAgICAgICAgICBzaW1pbGFyaXR5LFxuICAgICAgICAgICAgaXNQcmltYXJ5Qm91bmRhcnk6IHRydWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoaXNQcmltYXJ5Qm91bmRhcnkpIHtcbiAgICAgICAgYm91bmRhcmllcy5wdXNoKHtcbiAgICAgICAgICBpbmRleDogaSArIDEsXG4gICAgICAgICAgc2ltaWxhcml0eSxcbiAgICAgICAgICBpc1ByaW1hcnlCb3VuZGFyeTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYm91bmRhcmllcztcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUMxMzhcdUFERjhcdUJBM0NcdUQyQjhcdUI5N0MgXHVDMEREXHVDMTMxXHVENTY5XHVCMkM4XHVCMkU0XG4gICAqL1xuICBwcml2YXRlIGNyZWF0ZVNlZ21lbnRzKFxuICAgIHR1cm5zOiBDb252ZXJzYXRpb25UdXJuW10sXG4gICAgYm91bmRhcmllczogVG9waWNCb3VuZGFyeVtdLFxuICAgIHNpbWlsYXJpdGllczogbnVtYmVyW11cbiAgKTogQ29udmVyc2F0aW9uU2VnbWVudFtdIHtcbiAgICBjb25zdCBzZWdtZW50czogQ29udmVyc2F0aW9uU2VnbWVudFtdID0gW107XG4gICAgY29uc3QgYm91bmRhcnlJbmRpY2VzID0gYm91bmRhcmllcy5tYXAoYiA9PiBiLmluZGV4KS5zb3J0KChhLCBiKSA9PiBhIC0gYik7XG4gICAgY29uc3QgbWluU2VnbWVudExlbmd0aCA9IHRoaXMuY29uZmlnLm1pblNlZ21lbnRMZW5ndGghO1xuXG4gICAgbGV0IHN0YXJ0SW5kZXggPSAwO1xuICAgIGZvciAoY29uc3QgZW5kSW5kZXggb2YgYm91bmRhcnlJbmRpY2VzKSB7XG4gICAgICBpZiAoZW5kSW5kZXggLSBzdGFydEluZGV4ID49IG1pblNlZ21lbnRMZW5ndGgpIHtcbiAgICAgICAgY29uc3Qgc2VnbWVudFR1cm5zID0gdHVybnMuc2xpY2Uoc3RhcnRJbmRleCwgZW5kSW5kZXgpO1xuICAgICAgICBjb25zdCBrZXl3b3JkcyA9IHRoaXMuZXh0cmFjdFNlZ21lbnRLZXl3b3JkcyhzZWdtZW50VHVybnMpO1xuICAgICAgICBjb25zdCBhdmdTaW1pbGFyaXR5ID0gdGhpcy5jYWxjdWxhdGVBdmVyYWdlU2ltaWxhcml0eShzaW1pbGFyaXRpZXMsIHN0YXJ0SW5kZXgsIGVuZEluZGV4KTtcblxuICAgICAgICBzZWdtZW50cy5wdXNoKHtcbiAgICAgICAgICBzdGFydEluZGV4LFxuICAgICAgICAgIGVuZEluZGV4LFxuICAgICAgICAgIHR1cm5zOiBzZWdtZW50VHVybnMsXG4gICAgICAgICAga2V5d29yZHMsXG4gICAgICAgICAgYXZnU2ltaWxhcml0eVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgc3RhcnRJbmRleCA9IGVuZEluZGV4O1xuICAgIH1cblxuICAgIC8vIFx1QjlDOFx1QzlDMFx1QjlDOSBcdUMxMzhcdUFERjhcdUJBM0NcdUQyQjhcbiAgICBpZiAoc3RhcnRJbmRleCA8IHR1cm5zLmxlbmd0aCkge1xuICAgICAgY29uc3Qgc2VnbWVudFR1cm5zID0gdHVybnMuc2xpY2Uoc3RhcnRJbmRleCk7XG4gICAgICBjb25zdCBrZXl3b3JkcyA9IHRoaXMuZXh0cmFjdFNlZ21lbnRLZXl3b3JkcyhzZWdtZW50VHVybnMpO1xuICAgICAgY29uc3QgYXZnU2ltaWxhcml0eSA9IHRoaXMuY2FsY3VsYXRlQXZlcmFnZVNpbWlsYXJpdHkoc2ltaWxhcml0aWVzLCBzdGFydEluZGV4LCB0dXJucy5sZW5ndGgpO1xuXG4gICAgICBzZWdtZW50cy5wdXNoKHtcbiAgICAgICAgc3RhcnRJbmRleCxcbiAgICAgICAgZW5kSW5kZXg6IHR1cm5zLmxlbmd0aCxcbiAgICAgICAgdHVybnM6IHNlZ21lbnRUdXJucyxcbiAgICAgICAga2V5d29yZHMsXG4gICAgICAgIGF2Z1NpbWlsYXJpdHlcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBzZWdtZW50cztcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUMxMzhcdUFERjhcdUJBM0NcdUQyQjhcdUM3NTggXHVEMEE0XHVDNkNDXHVCNERDXHVCOTdDIFx1Q0Q5NFx1Q0Q5Q1x1RDU2OVx1QjJDOFx1QjJFNFxuICAgKi9cbiAgcHJpdmF0ZSBleHRyYWN0U2VnbWVudEtleXdvcmRzKHR1cm5zOiBDb252ZXJzYXRpb25UdXJuW10pOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgYWxsVGV4dCA9IHR1cm5zLm1hcCh0ID0+IHQuY29udGVudCkuam9pbignICcpO1xuICAgIHJldHVybiBleHRyYWN0S2V5d29yZHMoYWxsVGV4dCk7XG4gIH1cblxuICAvKipcbiAgICogXHVBRDZDXHVBQzA0XHVDNzU4IFx1RDNDOVx1QURFMCBcdUM3MjBcdUMwQUNcdUIzQzRcdUI5N0MgXHVBQ0M0XHVDMEIwXHVENTY5XHVCMkM4XHVCMkU0XG4gICAqL1xuICBwcml2YXRlIGNhbGN1bGF0ZUF2ZXJhZ2VTaW1pbGFyaXR5KHNpbWlsYXJpdGllczogbnVtYmVyW10sIHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAoc3RhcnQgPj0gZW5kIC0gMSkge1xuICAgICAgcmV0dXJuIDEuMDtcbiAgICB9XG5cbiAgICBjb25zdCByZWxldmFudFNpbWlsYXJpdGllcyA9IHNpbWlsYXJpdGllcy5zbGljZShzdGFydCwgTWF0aC5taW4oZW5kIC0gMSwgc2ltaWxhcml0aWVzLmxlbmd0aCkpO1xuICAgIGlmIChyZWxldmFudFNpbWlsYXJpdGllcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiAxLjA7XG4gICAgfVxuXG4gICAgY29uc3Qgc3VtID0gcmVsZXZhbnRTaW1pbGFyaXRpZXMucmVkdWNlKChhY2MsIHZhbCkgPT4gYWNjICsgdmFsLCAwKTtcbiAgICByZXR1cm4gc3VtIC8gcmVsZXZhbnRTaW1pbGFyaXRpZXMubGVuZ3RoO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1QzEzOFx1QURGOFx1QkEzQ1x1RDJCOCBcdUFDMDQgXHVCOUMxXHVEMDZDXHVCOTdDIFx1QkQ4NFx1QzExRFx1RDU2OVx1QjJDOFx1QjJFNFxuICAgKi9cbiAgcHJpdmF0ZSBhbmFseXplU2VnbWVudExpbmtzKHNlZ21lbnRzOiBDb252ZXJzYXRpb25TZWdtZW50W10pOiBTZWdtZW50TGlua1tdIHtcbiAgICBjb25zdCBsaW5rczogU2VnbWVudExpbmtbXSA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWdtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgc2VnbWVudHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgY29uc3Qgc2VnbWVudEEgPSBzZWdtZW50c1tpXTtcbiAgICAgICAgY29uc3Qgc2VnbWVudEIgPSBzZWdtZW50c1tqXTtcblxuICAgICAgICAvLyBcdUFDRjVcdUQxQjUgXHVEMEE0XHVDNkNDXHVCNERDIFx1Q0MzRVx1QUUzMFxuICAgICAgICBjb25zdCBjb21tb25LZXl3b3JkcyA9IHNlZ21lbnRBLmtleXdvcmRzLmZpbHRlcihrID0+IHNlZ21lbnRCLmtleXdvcmRzLmluY2x1ZGVzKGspKTtcblxuICAgICAgICBpZiAoY29tbW9uS2V5d29yZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIC8vIFx1QzVGMFx1QUQwMFx1QzEzMSBcdUM4MTBcdUMyMTggXHVBQ0M0XHVDMEIwIChKYWNjYXJkIFx1QzcyMFx1QzBBQ1x1QjNDNClcbiAgICAgICAgICBjb25zdCB1bmlvblNpemUgPSBuZXcgU2V0KFsuLi5zZWdtZW50QS5rZXl3b3JkcywgLi4uc2VnbWVudEIua2V5d29yZHNdKS5zaXplO1xuICAgICAgICAgIGNvbnN0IHJlbGV2YW5jZVNjb3JlID0gY29tbW9uS2V5d29yZHMubGVuZ3RoIC8gdW5pb25TaXplO1xuXG4gICAgICAgICAgLy8gXHVDRDVDXHVDMThDIFx1QzVGMFx1QUQwMFx1QzEzMSBcdUM3ODRcdUFDQzRcdUFDMTIgKDAuMSlcbiAgICAgICAgICBpZiAocmVsZXZhbmNlU2NvcmUgPiAwLjEpIHtcbiAgICAgICAgICAgIGxpbmtzLnB1c2goe1xuICAgICAgICAgICAgICBmcm9tU2VnbWVudDogaSxcbiAgICAgICAgICAgICAgdG9TZWdtZW50OiBqLFxuICAgICAgICAgICAgICBjb21tb25LZXl3b3JkcyxcbiAgICAgICAgICAgICAgcmVsZXZhbmNlU2NvcmVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBsaW5rcztcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUNFOTBcdUMyRENcdUI5N0MgXHVDRDA4XHVBRTMwXHVENjU0XHVENTY5XHVCMkM4XHVCMkU0XG4gICAqL1xuICBjbGVhckNhY2hlKCk6IHZvaWQge1xuICAgIHRoaXMuZW1iZWRkaW5nR2VuZXJhdG9yLmNsZWFyQ2FjaGUoKTtcbiAgfVxufVxuIiwgIi8qKlxuICogXHVCMkU0XHVDOTExIFx1QjE3OFx1RDJCOCBcdUM4MDBcdUM3QTUgXHVCQUE4XHVCNEM4XG4gKiBcbiAqIFx1QzhGQ1x1QzgxQ1x1QkNDNFx1Qjg1QyBcdUJEODRcdUI5QUNcdUI0MUMgXHVCMzAwXHVENjU0XHVCOTdDIFx1QzVFQ1x1QjdFQyBcdUIxNzhcdUQyQjhcdUI4NUMgXHVDODAwXHVDN0E1XHVENTU4XHVBQ0UwIFx1QjlDMVx1RDA2Q1x1Qjg1QyBcdUM1RjBcdUFDQjBcdUQ1NjlcdUIyQzhcdUIyRTQuXG4gKi9cblxuaW1wb3J0IHR5cGUgeyBWYXVsdCwgQXBwLCBQbHVnaW5NYW5pZmVzdCB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCB7IG5vcm1hbGl6ZVBhdGggfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvblNlZ21lbnQsIFNlZ21lbnRMaW5rIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBjb252ZXJ0VG9NYXJrZG93biB9IGZyb20gJy4uL2NvbnZlcnNhdGlvbic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTXVsdGlOb3RlU2F2ZVJlc3VsdCB7XG4gIG5vdGVQYXRoczogc3RyaW5nW107XG4gIG1haW5Ob3RlUGF0aDogc3RyaW5nO1xufVxuXG4vKipcbiAqIFx1QzEzOFx1QURGOFx1QkEzQ1x1RDJCOFx1Qjk3QyBcdUFDMUNcdUJDQzQgXHVCMTc4XHVEMkI4XHVCODVDIFx1QzgwMFx1QzdBNVx1RDU2OVx1QjJDOFx1QjJFNFxuICogQHBhcmFtIHZhdWx0IE9ic2lkaWFuIFZhdWx0XG4gKiBAcGFyYW0gc2VnbWVudHMgXHVCMzAwXHVENjU0IFx1QzEzOFx1QURGOFx1QkEzQ1x1RDJCOCBcdUJDMzBcdUM1RjRcbiAqIEBwYXJhbSBsaW5rcyBcdUMxMzhcdUFERjhcdUJBM0NcdUQyQjggXHVBQzA0IFx1QjlDMVx1RDA2Q1xuICogQHBhcmFtIGJhc2VUaXRsZSBcdUFFMzBcdUJDRjggXHVDODFDXHVCQUE5XG4gKiBAcGFyYW0gb3V0cHV0Rm9sZGVyIFx1QzgwMFx1QzdBNSBcdUQzRjRcdUIzNTRcbiAqIEBwYXJhbSBhcHAgT2JzaWRpYW4gXHVDNTcxIFx1Qzc3OFx1QzJBNFx1RDEzNFx1QzJBNCAoXHVCODVDXHVBRTQ1XHVDNkE5KVxuICogQHBhcmFtIG1hbmlmZXN0IFx1RDUwQ1x1QjdFQ1x1QURGOFx1Qzc3OCBcdUI5RTRcdUIyQzhcdUQzOThcdUMyQTRcdUQyQjggKFx1Qjg1Q1x1QUU0NVx1QzZBOSlcbiAqIEByZXR1cm5zIFx1QzgwMFx1QzdBNVx1QjQxQyBcdUIxNzhcdUQyQjggXHVBQ0JEXHVCODVDXHVCNEU0XG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzYXZlU2VnbWVudHNBc05vdGVzKFxuICB2YXVsdDogVmF1bHQsXG4gIHNlZ21lbnRzOiBDb252ZXJzYXRpb25TZWdtZW50W10sXG4gIGxpbmtzOiBTZWdtZW50TGlua1tdLFxuICBiYXNlVGl0bGU6IHN0cmluZyxcbiAgb3V0cHV0Rm9sZGVyOiBzdHJpbmcsXG4gIGFwcD86IEFwcCxcbiAgbWFuaWZlc3Q/OiBQbHVnaW5NYW5pZmVzdFxuKTogUHJvbWlzZTxNdWx0aU5vdGVTYXZlUmVzdWx0PiB7XG4gIGNvbnN0IG5vdGVQYXRoczogc3RyaW5nW10gPSBbXTtcbiAgY29uc3QgY2xlYW5lZEZvbGRlciA9IG91dHB1dEZvbGRlciA/IG5vcm1hbGl6ZVBhdGgob3V0cHV0Rm9sZGVyKS5yZXBsYWNlKC9eXFwvKy8sICcnKSA6ICcnO1xuXG4gIC8vIFx1RDNGNFx1QjM1NCBcdUMwRERcdUMxMzFcbiAgaWYgKGNsZWFuZWRGb2xkZXIpIHtcbiAgICBhd2FpdCBlbnN1cmVGb2xkZXJFeGlzdHModmF1bHQsIGNsZWFuZWRGb2xkZXIpO1xuICB9XG5cbiAgLy8gXHVBQzAxIFx1QzEzOFx1QURGOFx1QkEzQ1x1RDJCOFx1Qjk3QyBcdUFDMUNcdUJDQzQgXHVCMTc4XHVEMkI4XHVCODVDIFx1QzgwMFx1QzdBNVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHNlZ21lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qgc2VnbWVudCA9IHNlZ21lbnRzW2ldO1xuICAgIGNvbnN0IHNlZ21lbnRUaXRsZSA9IGF3YWl0IGdlbmVyYXRlU2VnbWVudFRpdGxlKHNlZ21lbnQsIGJhc2VUaXRsZSwgaSArIDEpO1xuICAgIGNvbnN0IG1hcmtkb3duID0gZ2VuZXJhdGVTZWdtZW50TWFya2Rvd24oc2VnbWVudCwgaSwgc2VnbWVudHMubGVuZ3RoLCBsaW5rcywgbm90ZVBhdGhzKTtcblxuICAgIGNvbnN0IGZpbGVuYW1lID0gc2FuaXRpemVGaWxlbmFtZShzZWdtZW50VGl0bGUpICsgJy5tZCc7XG4gICAgY29uc3QgdGFyZ2V0UGF0aCA9IGF3YWl0IGVuc3VyZVVuaXF1ZVBhdGgoXG4gICAgICB2YXVsdCxcbiAgICAgIG5vcm1hbGl6ZVBhdGgoY2xlYW5lZEZvbGRlciA/IGAke2NsZWFuZWRGb2xkZXJ9LyR7ZmlsZW5hbWV9YCA6IGZpbGVuYW1lKVxuICAgICk7XG5cbiAgICBhd2FpdCB2YXVsdC5jcmVhdGUodGFyZ2V0UGF0aCwgbWFya2Rvd24pO1xuICAgIG5vdGVQYXRocy5wdXNoKHRhcmdldFBhdGgpO1xuICB9XG5cbiAgLy8gXHVCQTU0XHVDNzc4IFx1Qzc3OFx1QjM3MVx1QzJBNCBcdUIxNzhcdUQyQjggXHVDMEREXHVDMTMxXG4gIGNvbnN0IG1haW5Ob3RlUGF0aCA9IGF3YWl0IGNyZWF0ZU1haW5JbmRleE5vdGUodmF1bHQsIHNlZ21lbnRzLCBub3RlUGF0aHMsIGJhc2VUaXRsZSwgY2xlYW5lZEZvbGRlcik7XG5cbiAgcmV0dXJuIHtcbiAgICBub3RlUGF0aHMsXG4gICAgbWFpbk5vdGVQYXRoXG4gIH07XG59XG5cbi8qKlxuICogXHVDMTM4XHVBREY4XHVCQTNDXHVEMkI4XHVDNzU4IFx1QzgxQ1x1QkFBOVx1Qzc0NCBcdUMwRERcdUMxMzFcdUQ1NjlcdUIyQzhcdUIyRTRcbiAqL1xuYXN5bmMgZnVuY3Rpb24gZ2VuZXJhdGVTZWdtZW50VGl0bGUoXG4gIHNlZ21lbnQ6IENvbnZlcnNhdGlvblNlZ21lbnQsXG4gIGJhc2VUaXRsZTogc3RyaW5nLFxuICBzZWdtZW50TnVtYmVyOiBudW1iZXJcbik6IFByb21pc2U8c3RyaW5nPiB7XG4gIC8vIFx1RDBBNFx1QzZDQ1x1QjREQyBcdUFFMzBcdUJDMTggXHVDODFDXHVCQUE5IFx1QzBERFx1QzEzMVxuICBjb25zdCB0b3BLZXl3b3JkcyA9IHNlZ21lbnQua2V5d29yZHMuc2xpY2UoMCwgMykuam9pbignLCAnKTtcbiAgXG4gIGlmICh0b3BLZXl3b3Jkcykge1xuICAgIHJldHVybiBgJHtiYXNlVGl0bGV9IC0gJHtzZWdtZW50TnVtYmVyfS4gJHt0b3BLZXl3b3Jkc31gO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBgJHtiYXNlVGl0bGV9IC0gXHVDOEZDXHVDODFDICR7c2VnbWVudE51bWJlcn1gO1xuICB9XG59XG5cbi8qKlxuICogXHVDMTM4XHVBREY4XHVCQTNDXHVEMkI4XHVCOTdDIFx1QjlDOFx1RDA2Q1x1QjJFNFx1QzZCNFx1QzczQ1x1Qjg1QyBcdUJDQzBcdUQ2NThcdUQ1NjlcdUIyQzhcdUIyRTRcbiAqL1xuZnVuY3Rpb24gZ2VuZXJhdGVTZWdtZW50TWFya2Rvd24oXG4gIHNlZ21lbnQ6IENvbnZlcnNhdGlvblNlZ21lbnQsXG4gIHNlZ21lbnRJbmRleDogbnVtYmVyLFxuICB0b3RhbFNlZ21lbnRzOiBudW1iZXIsXG4gIGxpbmtzOiBTZWdtZW50TGlua1tdLFxuICBub3RlUGF0aHM6IHN0cmluZ1tdXG4pOiBzdHJpbmcge1xuICBjb25zdCBsaW5lczogc3RyaW5nW10gPSBbXTtcblxuICAvLyBcdUJBNTRcdUQwQzBcdUIzNzBcdUM3NzRcdUQxMzBcbiAgbGluZXMucHVzaCgnLS0tJyk7XG4gIGxpbmVzLnB1c2goYHNlZ21lbnQ6ICR7c2VnbWVudEluZGV4ICsgMX0vJHt0b3RhbFNlZ21lbnRzfWApO1xuICBsaW5lcy5wdXNoKGBrZXl3b3JkczogWyR7c2VnbWVudC5rZXl3b3Jkcy5qb2luKCcsICcpfV1gKTtcbiAgbGluZXMucHVzaChgYXZnU2ltaWxhcml0eTogJHtzZWdtZW50LmF2Z1NpbWlsYXJpdHkudG9GaXhlZCgzKX1gKTtcbiAgbGluZXMucHVzaCgnLS0tJyk7XG4gIGxpbmVzLnB1c2goJycpO1xuXG4gIC8vIFx1QzgxQ1x1QkFBOVxuICBsaW5lcy5wdXNoKGAjIFx1QzhGQ1x1QzgxQyAke3NlZ21lbnRJbmRleCArIDF9YCk7XG4gIGxpbmVzLnB1c2goJycpO1xuXG4gIC8vIFx1RDBBNFx1QzZDQ1x1QjREQ1xuICBpZiAoc2VnbWVudC5rZXl3b3Jkcy5sZW5ndGggPiAwKSB7XG4gICAgbGluZXMucHVzaCgnIyMgXHVDOEZDXHVDNjk0IFx1RDBBNFx1QzZDQ1x1QjREQycpO1xuICAgIGxpbmVzLnB1c2goJycpO1xuICAgIGxpbmVzLnB1c2goc2VnbWVudC5rZXl3b3Jkcy5tYXAoayA9PiBgLSAke2t9YCkuam9pbignXFxuJykpO1xuICAgIGxpbmVzLnB1c2goJycpO1xuICB9XG5cbiAgLy8gXHVDNUYwXHVBRDAwIFx1QzhGQ1x1QzgxQyBcdUI5QzFcdUQwNkNcbiAgY29uc3QgcmVsYXRlZExpbmtzID0gbGlua3MuZmlsdGVyKFxuICAgIGxpbmsgPT4gbGluay5mcm9tU2VnbWVudCA9PT0gc2VnbWVudEluZGV4IHx8IGxpbmsudG9TZWdtZW50ID09PSBzZWdtZW50SW5kZXhcbiAgKTtcblxuICBpZiAocmVsYXRlZExpbmtzLmxlbmd0aCA+IDApIHtcbiAgICBsaW5lcy5wdXNoKCcjIyBcdUM1RjBcdUFEMDAgXHVDOEZDXHVDODFDJyk7XG4gICAgbGluZXMucHVzaCgnJyk7XG5cbiAgICBmb3IgKGNvbnN0IGxpbmsgb2YgcmVsYXRlZExpbmtzKSB7XG4gICAgICBjb25zdCB0YXJnZXRJbmRleCA9IGxpbmsuZnJvbVNlZ21lbnQgPT09IHNlZ21lbnRJbmRleCA/IGxpbmsudG9TZWdtZW50IDogbGluay5mcm9tU2VnbWVudDtcbiAgICAgIFxuICAgICAgaWYgKG5vdGVQYXRoc1t0YXJnZXRJbmRleF0pIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0UGF0aCA9IG5vdGVQYXRoc1t0YXJnZXRJbmRleF07XG4gICAgICAgIGNvbnN0IHRhcmdldE5hbWUgPSB0YXJnZXRQYXRoLnNwbGl0KCcvJykucG9wKCk/LnJlcGxhY2UoJy5tZCcsICcnKSB8fCBgXHVDOEZDXHVDODFDICR7dGFyZ2V0SW5kZXggKyAxfWA7XG4gICAgICAgIGNvbnN0IGNvbW1vbktleXdvcmRzVGV4dCA9IGxpbmsuY29tbW9uS2V5d29yZHMuc2xpY2UoMCwgMykuam9pbignLCAnKTtcbiAgICAgICAgXG4gICAgICAgIGxpbmVzLnB1c2goYC0gW1ske3RhcmdldFBhdGgucmVwbGFjZSgnLm1kJywgJycpfXwke3RhcmdldE5hbWV9XV0gKCR7Y29tbW9uS2V5d29yZHNUZXh0fSlgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGluZXMucHVzaCgnJyk7XG4gIH1cblxuICAvLyBcdUIzMDBcdUQ2NTQgXHVCMEI0XHVDNkE5XG4gIGxpbmVzLnB1c2goJyMjIFx1QjMwMFx1RDY1NCBcdUIwQjRcdUM2QTknKTtcbiAgbGluZXMucHVzaCgnJyk7XG5cbiAgZm9yIChjb25zdCB0dXJuIG9mIHNlZ21lbnQudHVybnMpIHtcbiAgICBjb25zdCByb2xlRW1vamkgPSB0dXJuLnJvbGUgPT09ICd1c2VyJyA/ICdcdUQ4M0RcdURDNjQnIDogJ1x1RDgzRVx1REQxNic7XG4gICAgY29uc3Qgcm9sZUxhYmVsID0gdHVybi5yb2xlID09PSAndXNlcicgPyAnXHVDMEFDXHVDNkE5XHVDNzkwJyA6ICdcdUM1QjRcdUMyRENcdUMyQTRcdUQxMzRcdUQyQjgnO1xuICAgIFxuICAgIGxpbmVzLnB1c2goYCMjIyAke3JvbGVFbW9qaX0gJHtyb2xlTGFiZWx9YCk7XG4gICAgXG4gICAgaWYgKHR1cm4udGltZXN0YW1wKSB7XG4gICAgICBjb25zdCB0aW1lc3RhbXAgPSB0eXBlb2YgdHVybi50aW1lc3RhbXAgPT09ICdzdHJpbmcnXG4gICAgICAgID8gdHVybi50aW1lc3RhbXBcbiAgICAgICAgOiB0dXJuLnRpbWVzdGFtcC50b0lTT1N0cmluZygpO1xuICAgICAgbGluZXMucHVzaChgKiR7dGltZXN0YW1wfSpgKTtcbiAgICAgIGxpbmVzLnB1c2goJycpO1xuICAgIH1cbiAgICBcbiAgICBsaW5lcy5wdXNoKHR1cm4uY29udGVudCk7XG4gICAgbGluZXMucHVzaCgnJyk7XG4gIH1cblxuICByZXR1cm4gbGluZXMuam9pbignXFxuJyk7XG59XG5cbi8qKlxuICogXHVCQTU0XHVDNzc4IFx1Qzc3OFx1QjM3MVx1QzJBNCBcdUIxNzhcdUQyQjhcdUI5N0MgXHVDMEREXHVDMTMxXHVENTY5XHVCMkM4XHVCMkU0XG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZU1haW5JbmRleE5vdGUoXG4gIHZhdWx0OiBWYXVsdCxcbiAgc2VnbWVudHM6IENvbnZlcnNhdGlvblNlZ21lbnRbXSxcbiAgbm90ZVBhdGhzOiBzdHJpbmdbXSxcbiAgYmFzZVRpdGxlOiBzdHJpbmcsXG4gIGZvbGRlcjogc3RyaW5nXG4pOiBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCBsaW5lczogc3RyaW5nW10gPSBbXTtcblxuICAvLyBcdUM4MUNcdUJBQTlcbiAgbGluZXMucHVzaChgIyAke2Jhc2VUaXRsZX0gLSBcdUM4MDRcdUNDQjQgXHVDNzc4XHVCMzcxXHVDMkE0YCk7XG4gIGxpbmVzLnB1c2goJycpO1xuXG4gIC8vIFx1QkE1NFx1RDBDMFx1QjM3MFx1Qzc3NFx1RDEzMFxuICBsaW5lcy5wdXNoKCctLS0nKTtcbiAgbGluZXMucHVzaChgdG90YWxTZWdtZW50czogJHtzZWdtZW50cy5sZW5ndGh9YCk7XG4gIGxpbmVzLnB1c2goYGNyZWF0ZWRBdDogJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCl9YCk7XG4gIGxpbmVzLnB1c2goJy0tLScpO1xuICBsaW5lcy5wdXNoKCcnKTtcblxuICAvLyBcdUM2OTRcdUM1N0RcbiAgbGluZXMucHVzaCgnIyMgXHVBQzFDXHVDNjk0Jyk7XG4gIGxpbmVzLnB1c2goJycpO1xuICBsaW5lcy5wdXNoKGBcdUM3NzQgXHVCMzAwXHVENjU0XHVCMjk0ICR7c2VnbWVudHMubGVuZ3RofVx1QUMxQ1x1Qzc1OCBcdUM4RkNcdUM4MUNcdUI4NUMgXHVCRDg0XHVCOUFDXHVCNDE4XHVDNUM4XHVDMkI1XHVCMkM4XHVCMkU0LmApO1xuICBsaW5lcy5wdXNoKCcnKTtcblxuICAvLyBcdUM4RkNcdUM4MUMgXHVCQUE5XHVCODVEXG4gIGxpbmVzLnB1c2goJyMjIFx1QzhGQ1x1QzgxQyBcdUJBQTlcdUI4NUQnKTtcbiAgbGluZXMucHVzaCgnJyk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWdtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHNlZ21lbnQgPSBzZWdtZW50c1tpXTtcbiAgICBjb25zdCBub3RlUGF0aCA9IG5vdGVQYXRoc1tpXTtcbiAgICBjb25zdCBub3RlTmFtZSA9IG5vdGVQYXRoLnNwbGl0KCcvJykucG9wKCk/LnJlcGxhY2UoJy5tZCcsICcnKSB8fCBgXHVDOEZDXHVDODFDICR7aSArIDF9YDtcbiAgICBjb25zdCBrZXl3b3JkcyA9IHNlZ21lbnQua2V5d29yZHMuc2xpY2UoMCwgMykuam9pbignLCAnKTtcblxuICAgIGxpbmVzLnB1c2goYCMjIyAke2kgKyAxfS4gW1ske25vdGVQYXRoLnJlcGxhY2UoJy5tZCcsICcnKX18JHtub3RlTmFtZX1dXWApO1xuICAgIGxpbmVzLnB1c2goJycpO1xuICAgIGxpbmVzLnB1c2goYCoqXHVEMEE0XHVDNkNDXHVCNERDKio6ICR7a2V5d29yZHN9YCk7XG4gICAgbGluZXMucHVzaChgKipcdUQxMzQgXHVDMjE4Kio6ICR7c2VnbWVudC50dXJucy5sZW5ndGh9YCk7XG4gICAgbGluZXMucHVzaChgKipcdUM3MjBcdUMwQUNcdUIzQzQqKjogJHsoc2VnbWVudC5hdmdTaW1pbGFyaXR5ICogMTAwKS50b0ZpeGVkKDEpfSVgKTtcbiAgICBsaW5lcy5wdXNoKCcnKTtcbiAgfVxuXG4gIGNvbnN0IG1hcmtkb3duID0gbGluZXMuam9pbignXFxuJyk7XG4gIGNvbnN0IGZpbGVuYW1lID0gc2FuaXRpemVGaWxlbmFtZShiYXNlVGl0bGUpICsgJy1cdUM3NzhcdUIzNzFcdUMyQTQubWQnO1xuICBjb25zdCB0YXJnZXRQYXRoID0gYXdhaXQgZW5zdXJlVW5pcXVlUGF0aChcbiAgICB2YXVsdCxcbiAgICBub3JtYWxpemVQYXRoKGZvbGRlciA/IGAke2ZvbGRlcn0vJHtmaWxlbmFtZX1gIDogZmlsZW5hbWUpXG4gICk7XG5cbiAgYXdhaXQgdmF1bHQuY3JlYXRlKHRhcmdldFBhdGgsIG1hcmtkb3duKTtcbiAgcmV0dXJuIHRhcmdldFBhdGg7XG59XG5cbi8qKlxuICogXHVEMzBDXHVDNzdDXHVCQTg1XHVDNzQ0IFx1QzU0OFx1QzgwNFx1RDU1OFx1QUM4QyBcdUJDQzBcdUQ2NThcdUQ1NjlcdUIyQzhcdUIyRTRcbiAqL1xuZnVuY3Rpb24gc2FuaXRpemVGaWxlbmFtZSh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgdHJpbW1lZCA9IHZhbHVlLnRyaW0oKTtcbiAgaWYgKCF0cmltbWVkKSB7XG4gICAgcmV0dXJuICd1bnRpdGxlZCc7XG4gIH1cblxuICBjb25zdCBjbGVhbmVkID0gdHJpbW1lZFxuICAgIC5yZXBsYWNlKC9bXFxcXC86Kj9cIjw+fF0vZywgJyAnKVxuICAgIC5yZXBsYWNlKC9cXHMrL2csICcgJylcbiAgICAudHJpbSgpO1xuXG4gIHJldHVybiBjbGVhbmVkIHx8ICd1bnRpdGxlZCc7XG59XG5cbi8qKlxuICogXHVEM0Y0XHVCMzU0XHVBQzAwIFx1Qzg3NFx1QzdBQ1x1RDU1OFx1QjI5NFx1QzlDMCBcdUQ2NTVcdUM3NzhcdUQ1NThcdUFDRTAgXHVDNUM2XHVDNzNDXHVCQTc0IFx1QzBERFx1QzEzMVx1RDU2OVx1QjJDOFx1QjJFNFxuICovXG5hc3luYyBmdW5jdGlvbiBlbnN1cmVGb2xkZXJFeGlzdHModmF1bHQ6IFZhdWx0LCBmb2xkZXI6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBleGlzdHMgPSBhd2FpdCB2YXVsdC5hZGFwdGVyLmV4aXN0cyhmb2xkZXIpO1xuICBpZiAoIWV4aXN0cykge1xuICAgIGF3YWl0IHZhdWx0LmNyZWF0ZUZvbGRlcihmb2xkZXIpO1xuICB9XG59XG5cbi8qKlxuICogXHVBQ0UwXHVDNzIwXHVENTVDIFx1RDMwQ1x1Qzc3QyBcdUFDQkRcdUI4NUNcdUI5N0MgXHVCQ0Y0XHVDN0E1XHVENTY5XHVCMkM4XHVCMkU0XG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGVuc3VyZVVuaXF1ZVBhdGgodmF1bHQ6IFZhdWx0LCBwYXRoOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplUGF0aChwYXRoKTtcbiAgY29uc3QgZXh0ZW5zaW9uSW5kZXggPSBub3JtYWxpemVkLmxhc3RJbmRleE9mKCcubWQnKTtcbiAgY29uc3QgYmFzZSA9IGV4dGVuc2lvbkluZGV4ID09PSAtMSA/IG5vcm1hbGl6ZWQgOiBub3JtYWxpemVkLnNsaWNlKDAsIGV4dGVuc2lvbkluZGV4KTtcbiAgY29uc3QgZXh0ZW5zaW9uID0gZXh0ZW5zaW9uSW5kZXggPT09IC0xID8gJycgOiAnLm1kJztcblxuICBsZXQgY2FuZGlkYXRlID0gbm9ybWFsaXplZDtcbiAgbGV0IGNvdW50ID0gMTtcblxuICB3aGlsZSAoYXdhaXQgdmF1bHQuYWRhcHRlci5leGlzdHMoY2FuZGlkYXRlKSkge1xuICAgIGNhbmRpZGF0ZSA9IGAke2Jhc2V9LSR7Y291bnR9JHtleHRlbnNpb259YDtcbiAgICBjb3VudCArPSAxO1xuICB9XG5cbiAgcmV0dXJuIGNhbmRpZGF0ZTtcbn1cbiIsICIvLyBKU09OIFx1QkE1NFx1RDBDMFx1QjM3MFx1Qzc3NFx1RDEzMCBcdUM4MDBcdUM3QTVcdUMxOENcblxuaW1wb3J0IHsgZXhpc3RzU3luYywgbWtkaXJTeW5jLCByZWFkRmlsZVN5bmMsIHdyaXRlRmlsZVN5bmMsIHJlbmFtZVN5bmMgfSBmcm9tIFwiZnNcIjtcbmltcG9ydCB7IGRpcm5hbWUgfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgTm90ZU1ldGFkYXRhLCBDaHVuaywgTWV0YWRhdGFTdG9yZURhdGEgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQgY2xhc3MgTWV0YWRhdGFTdG9yZSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgc3RvcmVQYXRoOiBzdHJpbmc7XG4gIHByaXZhdGUgZGF0YTogTWV0YWRhdGFTdG9yZURhdGE7XG5cbiAgY29uc3RydWN0b3Ioc3RvcmVQYXRoOiBzdHJpbmcsIGluZGV4U2lnbmF0dXJlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnN0b3JlUGF0aCA9IHN0b3JlUGF0aDtcbiAgICB0aGlzLmRhdGEgPSB0aGlzLmxvYWREYXRhKGluZGV4U2lnbmF0dXJlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUM4MDBcdUM3QTVcdUMxOEMgXHVCMzcwXHVDNzc0XHVEMTMwIFx1Qjg1Q1x1QjREQ1xuICAgKi9cbiAgcHJpdmF0ZSBsb2FkRGF0YShpbmRleFNpZ25hdHVyZTogc3RyaW5nKTogTWV0YWRhdGFTdG9yZURhdGEge1xuICAgIGlmICghZXhpc3RzU3luYyh0aGlzLnN0b3JlUGF0aCkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGluZGV4U2lnbmF0dXJlLFxuICAgICAgICB1cGRhdGVkQXQ6IERhdGUubm93KCksXG4gICAgICAgIG5vdGVzOiB7fSxcbiAgICAgICAgY2h1bmtzOiB7fSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJhdyA9IHJlYWRGaWxlU3luYyh0aGlzLnN0b3JlUGF0aCwgXCJ1dGYtOFwiKTtcbiAgICAgIGNvbnN0IHBhcnNlZCA9IEpTT04ucGFyc2UocmF3KSBhcyBQYXJ0aWFsPE1ldGFkYXRhU3RvcmVEYXRhPjtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGluZGV4U2lnbmF0dXJlOiBwYXJzZWQuaW5kZXhTaWduYXR1cmUgfHwgaW5kZXhTaWduYXR1cmUsXG4gICAgICAgIHVwZGF0ZWRBdDogdHlwZW9mIHBhcnNlZC51cGRhdGVkQXQgPT09IFwibnVtYmVyXCIgPyBwYXJzZWQudXBkYXRlZEF0IDogRGF0ZS5ub3coKSxcbiAgICAgICAgbm90ZXM6IHBhcnNlZC5ub3RlcyB8fCB7fSxcbiAgICAgICAgY2h1bmtzOiBwYXJzZWQuY2h1bmtzIHx8IHt9LFxuICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS53YXJuKFwiXHVCQTU0XHVEMEMwXHVCMzcwXHVDNzc0XHVEMTMwIFx1QzgwMFx1QzdBNVx1QzE4QyBcdUI4NUNcdUI0REMgXHVDMkU0XHVEMzI4LCBcdUMwQzhcdUI4NUMgXHVDRDA4XHVBRTMwXHVENjU0XHVENTY5XHVCMkM4XHVCMkU0OlwiLCBlcnJvcik7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpbmRleFNpZ25hdHVyZSxcbiAgICAgICAgdXBkYXRlZEF0OiBEYXRlLm5vdygpLFxuICAgICAgICBub3Rlczoge30sXG4gICAgICAgIGNodW5rczoge30sXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBcdUM4MDBcdUM3QTVcdUMxOEMgXHVCMzcwXHVDNzc0XHVEMTMwIFx1QzgwMFx1QzdBNSAoXHVDNkQwXHVDNzkwXHVDODAxIFx1QzRGMFx1QUUzMClcbiAgICovXG4gIHByaXZhdGUgcGVyc2lzdCgpOiB2b2lkIHtcbiAgICBta2RpclN5bmMoZGlybmFtZSh0aGlzLnN0b3JlUGF0aCksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgIHRoaXMuZGF0YS51cGRhdGVkQXQgPSBEYXRlLm5vdygpO1xuXG4gICAgY29uc3QgdGVtcFBhdGggPSBgJHt0aGlzLnN0b3JlUGF0aH0udG1wYDtcbiAgICB3cml0ZUZpbGVTeW5jKHRlbXBQYXRoLCBKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGEpLCBcInV0Zi04XCIpO1xuICAgIHJlbmFtZVN5bmModGVtcFBhdGgsIHRoaXMuc3RvcmVQYXRoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUM3NzhcdUIzNzFcdUMyQTQgXHVDMkRDXHVBREY4XHVCMkM4XHVDQzk4IFx1Qzg3MFx1RDY4Q1xuICAgKi9cbiAgZ2V0SW5kZXhTaWduYXR1cmUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhLmluZGV4U2lnbmF0dXJlO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1QzgwMFx1QzdBNVx1QzE4QyBcdUNEMDhcdUFFMzBcdUQ2NTRcbiAgICovXG4gIHJlc2V0KGluZGV4U2lnbmF0dXJlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmRhdGEgPSB7XG4gICAgICBpbmRleFNpZ25hdHVyZSxcbiAgICAgIHVwZGF0ZWRBdDogRGF0ZS5ub3coKSxcbiAgICAgIG5vdGVzOiB7fSxcbiAgICAgIGNodW5rczoge30sXG4gICAgfTtcbiAgICB0aGlzLnBlcnNpc3QoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUIxNzhcdUQyQjggXHVDODAwXHVDN0E1IFx1QjYxMFx1QjI5NCBcdUM1QzVcdUIzNzBcdUM3NzRcdUQyQjhcbiAgICovXG4gIHVwc2VydE5vdGUobm90ZTogTm90ZU1ldGFkYXRhKTogdm9pZCB7XG4gICAgdGhpcy5kYXRhLm5vdGVzW25vdGUuaWRdID0geyAuLi5ub3RlIH07XG4gICAgdGhpcy5wZXJzaXN0KCk7XG4gIH1cblxuICAvKipcbiAgICogXHVBQ0JEXHVCODVDXHVCODVDIFx1QjE3OFx1RDJCOCBcdUM4NzBcdUQ2OENcbiAgICovXG4gIGdldE5vdGVCeVBhdGgocGF0aDogc3RyaW5nKTogTm90ZU1ldGFkYXRhIHwgbnVsbCB7XG4gICAgY29uc3Qgbm90ZSA9IE9iamVjdC52YWx1ZXModGhpcy5kYXRhLm5vdGVzKS5maW5kKChpdGVtKSA9PiBpdGVtLnBhdGggPT09IHBhdGgpO1xuICAgIHJldHVybiBub3RlID8geyAuLi5ub3RlIH0gOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIElEXHVCODVDIFx1QjE3OFx1RDJCOCBcdUM4NzBcdUQ2OENcbiAgICovXG4gIGdldE5vdGVCeUlkKGlkOiBzdHJpbmcpOiBOb3RlTWV0YWRhdGEgfCBudWxsIHtcbiAgICBjb25zdCBub3RlID0gdGhpcy5kYXRhLm5vdGVzW2lkXTtcbiAgICByZXR1cm4gbm90ZSA/IHsgLi4ubm90ZSB9IDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUJBQThcdUI0RTAgXHVCMTc4XHVEMkI4IFx1Qzg3MFx1RDY4Q1xuICAgKi9cbiAgZ2V0QWxsTm90ZXMoKTogTm90ZU1ldGFkYXRhW10ge1xuICAgIHJldHVybiBPYmplY3QudmFsdWVzKHRoaXMuZGF0YS5ub3RlcylcbiAgICAgIC5zb3J0KChhLCBiKSA9PiBiLnVwZGF0ZWRBdCAtIGEudXBkYXRlZEF0KVxuICAgICAgLm1hcCgobm90ZSkgPT4gKHsgLi4ubm90ZSB9KSk7XG4gIH1cblxuICAvKipcbiAgICogXHVCMTc4XHVEMkI4IFx1QzBBRFx1QzgxQ1xuICAgKi9cbiAgZGVsZXRlTm90ZShpZDogc3RyaW5nKTogdm9pZCB7XG4gICAgZGVsZXRlIHRoaXMuZGF0YS5ub3Rlc1tpZF07XG4gICAgdGhpcy5wZXJzaXN0KCk7XG4gIH1cblxuICAvKipcbiAgICogXHVDQ0FEXHVEMDZDIFx1QzgwMFx1QzdBNVxuICAgKi9cbiAgaW5zZXJ0Q2h1bmtzKGNodW5rczogQ2h1bmtbXSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgY2h1bmsgb2YgY2h1bmtzKSB7XG4gICAgICB0aGlzLmRhdGEuY2h1bmtzW2NodW5rLmlkXSA9IHsgLi4uY2h1bmsgfTtcbiAgICB9XG4gICAgdGhpcy5wZXJzaXN0KCk7XG4gIH1cblxuICAvKipcbiAgICogXHVCMTc4XHVEMkI4XHVDNzU4IFx1Q0NBRFx1RDA2QyBcdUMwQURcdUM4MUNcbiAgICovXG4gIGRlbGV0ZUNodW5rc0J5Tm90ZUlkKG5vdGVJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBbY2h1bmtJZCwgY2h1bmtdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMuZGF0YS5jaHVua3MpKSB7XG4gICAgICBpZiAoY2h1bmsubm90ZUlkID09PSBub3RlSWQpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuZGF0YS5jaHVua3NbY2h1bmtJZF07XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucGVyc2lzdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1QjE3OFx1RDJCOFx1Qzc1OCBcdUNDQURcdUQwNkMgXHVDODcwXHVENjhDXG4gICAqL1xuICBnZXRDaHVua3NCeU5vdGVJZChub3RlSWQ6IHN0cmluZyk6IENodW5rW10ge1xuICAgIHJldHVybiBPYmplY3QudmFsdWVzKHRoaXMuZGF0YS5jaHVua3MpXG4gICAgICAuZmlsdGVyKChjaHVuaykgPT4gY2h1bmsubm90ZUlkID09PSBub3RlSWQpXG4gICAgICAuc29ydCgoYSwgYikgPT4gYS5wb3NpdGlvbiAtIGIucG9zaXRpb24pXG4gICAgICAubWFwKChjaHVuaykgPT4gKHsgLi4uY2h1bmsgfSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIElEXHVCODVDIFx1Q0NBRFx1RDA2QyBcdUM4NzBcdUQ2OENcbiAgICovXG4gIGdldENodW5rQnlJZChpZDogc3RyaW5nKTogQ2h1bmsgfCBudWxsIHtcbiAgICBjb25zdCBjaHVuayA9IHRoaXMuZGF0YS5jaHVua3NbaWRdO1xuICAgIHJldHVybiBjaHVuayA/IHsgLi4uY2h1bmsgfSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogXHVCQUE4XHVCNEUwIFx1Q0NBRFx1RDA2QyBcdUM4NzBcdUQ2OENcbiAgICovXG4gIGdldEFsbENodW5rcygpOiBDaHVua1tdIHtcbiAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyh0aGlzLmRhdGEuY2h1bmtzKS5tYXAoKGNodW5rKSA9PiAoeyAuLi5jaHVuayB9KSk7XG4gIH1cblxuICAvKipcbiAgICogXHVCMzcwXHVDNzc0XHVEMTMwXHVCQ0EwXHVDNzc0XHVDMkE0IFx1QjJFQlx1QUUzMFxuICAgKi9cbiAgY2xvc2UoKTogdm9pZCB7XG4gICAgLy8gXHVEMzBDXHVDNzdDIFx1QUUzMFx1QkMxOCBcdUM4MDBcdUM3QTVcdUMxOENcdUIyOTQgY2xvc2UgXHVCM0Q5XHVDNzkxXHVDNzc0IFx1RDU0NFx1QzY5NFx1RDU1OFx1QzlDMCBcdUM1NEFcdUMyQjVcdUIyQzhcdUIyRTQuXG4gIH1cbn1cbiIsICIvLyBcdUJDQTFcdUQxMzAgXHVDMkE0XHVEMUEwXHVDNUI0IC0gXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzgwMFx1QzdBNSBcdUJDMEYgXHVDNzIwXHVDMEFDXHVCM0M0IFx1QUM4MFx1QzBDOVxuXG5pbXBvcnQgeyBleGlzdHNTeW5jLCBta2RpclN5bmMsIHJlYWRGaWxlU3luYywgd3JpdGVGaWxlU3luYywgcmVuYW1lU3luYyB9IGZyb20gXCJmc1wiO1xuaW1wb3J0IHsgZGlybmFtZSB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBWZWN0b3JTdG9yZURhdGEgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQgY2xhc3MgVmVjdG9yU3RvcmUge1xuICBwcml2YXRlIHJlYWRvbmx5IHN0b3JlUGF0aDogc3RyaW5nO1xuICBwcml2YXRlIGRhdGE6IFZlY3RvclN0b3JlRGF0YTtcblxuICBjb25zdHJ1Y3RvcihzdG9yZVBhdGg6IHN0cmluZywgaW5kZXhTaWduYXR1cmU6IHN0cmluZykge1xuICAgIHRoaXMuc3RvcmVQYXRoID0gc3RvcmVQYXRoO1xuICAgIHRoaXMuZGF0YSA9IHRoaXMubG9hZERhdGEoaW5kZXhTaWduYXR1cmUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1QzgwMFx1QzdBNVx1QzE4QyBcdUIzNzBcdUM3NzRcdUQxMzAgXHVCODVDXHVCNERDXG4gICAqL1xuICBwcml2YXRlIGxvYWREYXRhKGluZGV4U2lnbmF0dXJlOiBzdHJpbmcpOiBWZWN0b3JTdG9yZURhdGEge1xuICAgIGlmICghZXhpc3RzU3luYyh0aGlzLnN0b3JlUGF0aCkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGluZGV4U2lnbmF0dXJlLFxuICAgICAgICBkaW1lbnNpb246IG51bGwsXG4gICAgICAgIHVwZGF0ZWRBdDogRGF0ZS5ub3coKSxcbiAgICAgICAgZW1iZWRkaW5nczoge30sXG4gICAgICB9O1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByYXcgPSByZWFkRmlsZVN5bmModGhpcy5zdG9yZVBhdGgsIFwidXRmLThcIik7XG4gICAgICBjb25zdCBwYXJzZWQgPSBKU09OLnBhcnNlKHJhdykgYXMgUGFydGlhbDxWZWN0b3JTdG9yZURhdGE+O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaW5kZXhTaWduYXR1cmU6IHBhcnNlZC5pbmRleFNpZ25hdHVyZSB8fCBpbmRleFNpZ25hdHVyZSxcbiAgICAgICAgZGltZW5zaW9uOiB0eXBlb2YgcGFyc2VkLmRpbWVuc2lvbiA9PT0gXCJudW1iZXJcIiA/IHBhcnNlZC5kaW1lbnNpb24gOiBudWxsLFxuICAgICAgICB1cGRhdGVkQXQ6IHR5cGVvZiBwYXJzZWQudXBkYXRlZEF0ID09PSBcIm51bWJlclwiID8gcGFyc2VkLnVwZGF0ZWRBdCA6IERhdGUubm93KCksXG4gICAgICAgIGVtYmVkZGluZ3M6IHBhcnNlZC5lbWJlZGRpbmdzIHx8IHt9LFxuICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS53YXJuKFwiXHVCQ0ExXHVEMTMwIFx1QzgwMFx1QzdBNVx1QzE4QyBcdUI4NUNcdUI0REMgXHVDMkU0XHVEMzI4LCBcdUMwQzhcdUI4NUMgXHVDRDA4XHVBRTMwXHVENjU0XHVENTY5XHVCMkM4XHVCMkU0OlwiLCBlcnJvcik7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpbmRleFNpZ25hdHVyZSxcbiAgICAgICAgZGltZW5zaW9uOiBudWxsLFxuICAgICAgICB1cGRhdGVkQXQ6IERhdGUubm93KCksXG4gICAgICAgIGVtYmVkZGluZ3M6IHt9LFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogXHVDODAwXHVDN0E1XHVDMThDIFx1QjM3MFx1Qzc3NFx1RDEzMCBcdUM4MDBcdUM3QTUgKFx1QzZEMFx1Qzc5MFx1QzgwMSBcdUM0RjBcdUFFMzApXG4gICAqL1xuICBwcml2YXRlIHBlcnNpc3QoKTogdm9pZCB7XG4gICAgbWtkaXJTeW5jKGRpcm5hbWUodGhpcy5zdG9yZVBhdGgpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICB0aGlzLmRhdGEudXBkYXRlZEF0ID0gRGF0ZS5ub3coKTtcblxuICAgIGNvbnN0IHRlbXBQYXRoID0gYCR7dGhpcy5zdG9yZVBhdGh9LnRtcGA7XG4gICAgd3JpdGVGaWxlU3luYyh0ZW1wUGF0aCwgSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhKSwgXCJ1dGYtOFwiKTtcbiAgICByZW5hbWVTeW5jKHRlbXBQYXRoLCB0aGlzLnN0b3JlUGF0aCk7XG4gIH1cblxuICAvKipcbiAgICogXHVDNzc4XHVCMzcxXHVDMkE0IFx1QzJEQ1x1QURGOFx1QjJDOFx1Q0M5OCBcdUM4NzBcdUQ2OENcbiAgICovXG4gIGdldEluZGV4U2lnbmF0dXJlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YS5pbmRleFNpZ25hdHVyZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUJDQTFcdUQxMzAgXHVDQzI4XHVDNkQwIFx1Qzg3MFx1RDY4Q1xuICAgKi9cbiAgZ2V0RGltZW5zaW9uKCk6IG51bWJlciB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLmRhdGEuZGltZW5zaW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1QzgwMFx1QzdBNVx1QzE4QyBcdUNEMDhcdUFFMzBcdUQ2NTRcbiAgICovXG4gIHJlc2V0KGluZGV4U2lnbmF0dXJlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmRhdGEgPSB7XG4gICAgICBpbmRleFNpZ25hdHVyZSxcbiAgICAgIGRpbWVuc2lvbjogbnVsbCxcbiAgICAgIHVwZGF0ZWRBdDogRGF0ZS5ub3coKSxcbiAgICAgIGVtYmVkZGluZ3M6IHt9LFxuICAgIH07XG4gICAgdGhpcy5wZXJzaXN0KCk7XG4gIH1cblxuICAvKipcbiAgICogXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzgwMFx1QzdBNVxuICAgKi9cbiAgc3RvcmVFbWJlZGRpbmcoY2h1bmtJZDogc3RyaW5nLCBlbWJlZGRpbmc6IG51bWJlcltdKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGF0YS5kaW1lbnNpb24gPT09IG51bGwpIHtcbiAgICAgIHRoaXMuZGF0YS5kaW1lbnNpb24gPSBlbWJlZGRpbmcubGVuZ3RoO1xuICAgIH1cblxuICAgIGlmIChlbWJlZGRpbmcubGVuZ3RoICE9PSB0aGlzLmRhdGEuZGltZW5zaW9uKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBcdUM3ODRcdUJDQTBcdUI1MjkgXHVDQzI4XHVDNkQwIFx1QkQ4OFx1Qzc3Q1x1Q0U1ODogZXhwZWN0ZWQ9JHt0aGlzLmRhdGEuZGltZW5zaW9ufSwgYWN0dWFsPSR7ZW1iZWRkaW5nLmxlbmd0aH1gXG4gICAgICApO1xuICAgIH1cblxuICAgIHRoaXMuZGF0YS5lbWJlZGRpbmdzW2NodW5rSWRdID0gZW1iZWRkaW5nO1xuICAgIHRoaXMucGVyc2lzdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1QzVFQ1x1QjdFQyBcdUM3ODRcdUJDQTBcdUI1MjkgXHVDNzdDXHVBRDA0IFx1QzgwMFx1QzdBNVxuICAgKi9cbiAgc3RvcmVFbWJlZGRpbmdzKGVtYmVkZGluZ3M6IE1hcDxzdHJpbmcsIG51bWJlcltdPik6IHZvaWQge1xuICAgIGZvciAoY29uc3QgW2NodW5rSWQsIGVtYmVkZGluZ10gb2YgZW1iZWRkaW5ncy5lbnRyaWVzKCkpIHtcbiAgICAgIGlmICh0aGlzLmRhdGEuZGltZW5zaW9uID09PSBudWxsKSB7XG4gICAgICAgIHRoaXMuZGF0YS5kaW1lbnNpb24gPSBlbWJlZGRpbmcubGVuZ3RoO1xuICAgICAgfVxuXG4gICAgICBpZiAoZW1iZWRkaW5nLmxlbmd0aCAhPT0gdGhpcy5kYXRhLmRpbWVuc2lvbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUNDMjhcdUM2RDAgXHVCRDg4XHVDNzdDXHVDRTU4OiBleHBlY3RlZD0ke3RoaXMuZGF0YS5kaW1lbnNpb259LCBhY3R1YWw9JHtlbWJlZGRpbmcubGVuZ3RofWBcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5kYXRhLmVtYmVkZGluZ3NbY2h1bmtJZF0gPSBlbWJlZGRpbmc7XG4gICAgfVxuXG4gICAgdGhpcy5wZXJzaXN0KCk7XG4gIH1cblxuICAvKipcbiAgICogXHVDNzg0XHVCQ0EwXHVCNTI5IFx1Qzg3MFx1RDY4Q1xuICAgKi9cbiAgZ2V0RW1iZWRkaW5nKGNodW5rSWQ6IHN0cmluZyk6IG51bWJlcltdIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YS5lbWJlZGRpbmdzW2NodW5rSWRdIHx8IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogXHVCQUE4XHVCNEUwIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUM4NzBcdUQ2OENcbiAgICovXG4gIGdldEFsbEVtYmVkZGluZ3MoKTogTWFwPHN0cmluZywgbnVtYmVyW10+IHtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgTWFwPHN0cmluZywgbnVtYmVyW10+KCk7XG5cbiAgICBmb3IgKGNvbnN0IFtjaHVua0lkLCBlbWJlZGRpbmddIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMuZGF0YS5lbWJlZGRpbmdzKSkge1xuICAgICAgcmVzdWx0LnNldChjaHVua0lkLCBlbWJlZGRpbmcpO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogXHVDQ0FEXHVEMDZDXHVDNzU4IFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUMwQURcdUM4MUNcbiAgICovXG4gIGRlbGV0ZUVtYmVkZGluZyhjaHVua0lkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBkZWxldGUgdGhpcy5kYXRhLmVtYmVkZGluZ3NbY2h1bmtJZF07XG5cbiAgICBpZiAoT2JqZWN0LmtleXModGhpcy5kYXRhLmVtYmVkZGluZ3MpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5kYXRhLmRpbWVuc2lvbiA9IG51bGw7XG4gICAgfVxuXG4gICAgdGhpcy5wZXJzaXN0KCk7XG4gIH1cblxuICAvKipcbiAgICogXHVDNUVDXHVCN0VDIFx1Q0NBRFx1RDA2Q1x1Qzc1OCBcdUM3ODRcdUJDQTBcdUI1MjkgXHVDMEFEXHVDODFDXG4gICAqL1xuICBkZWxldGVFbWJlZGRpbmdzKGNodW5rSWRzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGlmIChjaHVua0lkcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGNodW5rSWQgb2YgY2h1bmtJZHMpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLmRhdGEuZW1iZWRkaW5nc1tjaHVua0lkXTtcbiAgICB9XG5cbiAgICBpZiAoT2JqZWN0LmtleXModGhpcy5kYXRhLmVtYmVkZGluZ3MpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5kYXRhLmRpbWVuc2lvbiA9IG51bGw7XG4gICAgfVxuXG4gICAgdGhpcy5wZXJzaXN0KCk7XG4gIH1cblxuICAvKipcbiAgICogXHVDRjU0XHVDMEFDXHVDNzc4IFx1QzcyMFx1QzBBQ1x1QjNDNCBcdUFDQzRcdUMwQjBcbiAgICovXG4gIHByaXZhdGUgY29zaW5lU2ltaWxhcml0eShhOiBudW1iZXJbXSwgYjogbnVtYmVyW10pOiBudW1iZXIge1xuICAgIGlmIChhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlx1QkNBMVx1RDEzMCBcdUFFMzhcdUM3NzRcdUFDMDAgXHVDNzdDXHVDRTU4XHVENTU4XHVDOUMwIFx1QzU0QVx1QzJCNVx1QjJDOFx1QjJFNFwiKTtcbiAgICB9XG5cbiAgICBsZXQgZG90UHJvZHVjdCA9IDA7XG4gICAgbGV0IG5vcm1BID0gMDtcbiAgICBsZXQgbm9ybUIgPSAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBkb3RQcm9kdWN0ICs9IGFbaV0gKiBiW2ldO1xuICAgICAgbm9ybUEgKz0gYVtpXSAqIGFbaV07XG4gICAgICBub3JtQiArPSBiW2ldICogYltpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gZG90UHJvZHVjdCAvIChNYXRoLnNxcnQobm9ybUEpICogTWF0aC5zcXJ0KG5vcm1CKSk7XG4gIH1cblxuICAvKipcbiAgICogXHVCQ0ExXHVEMTMwIFx1QUM4MFx1QzBDOSAtIFRvcC1LIFx1QzcyMFx1QzBBQyBcdUNDQURcdUQwNkMgXHVDQzNFXHVBRTMwXG4gICAqIFxuICAgKiBcdUNDMzhcdUFDRTA6IFx1RDYwNFx1QzdBQyBcdUFENkNcdUQ2MDRcdUM3NDAgXHVCQUE4XHVCNEUwIFx1Qzc4NFx1QkNBMFx1QjUyOVx1Qzc0NCBcdUJBNTRcdUJBQThcdUI5QUNcdUM1RDAgXHVCODVDXHVCNERDXHVENTU4XHVDNUVDIFx1QzEyMFx1RDYxNSBcdUFDODBcdUMwQzlcdUM3NDQgXHVDMjE4XHVENTg5XHVENTY5XHVCMkM4XHVCMkU0LlxuICAgKiBcdUIzMDBcdUFERENcdUJBQTggXHVCQ0ZDXHVEMkI4XHVDNzU4IFx1QUNCRFx1QzZCMCBcdUMxMzFcdUIyQTVcdUM3NzQgXHVDODAwXHVENTU4XHVCNDIwIFx1QzIxOCBcdUM3ODhcdUM3M0NcdUJBNzAsIFx1QjJFNFx1Qzc0Q1x1QUNGQyBcdUFDMTlcdUM3NDAgXHVBQzFDXHVDMTIwXHVDNzc0IFx1QUQ4Q1x1QzdBNVx1QjQyOVx1QjJDOFx1QjJFNDpcbiAgICogLSBBTk4oQXBwcm94aW1hdGUgTmVhcmVzdCBOZWlnaGJvcikgXHVDNTRDXHVBQ0UwXHVCOUFDXHVDOTk4IFx1QzBBQ1x1QzZBOSAoRkFJU1MsIEhOU1cgXHVCNEYxKVxuICAgKiAtIFx1QzgwNFx1QzZBOSBcdUJDQTFcdUQxMzAgXHVCMzcwXHVDNzc0XHVEMTMwXHVCQ0EwXHVDNzc0XHVDMkE0IFx1QzBBQ1x1QzZBOSAoQ2hyb21hLCBRZHJhbnQgXHVCNEYxKVxuICAgKiAtIFx1Qzk5RFx1QkQ4NCBcdUFDODBcdUMwQzkgXHVCNjEwXHVCMjk0IFx1Qzc3OFx1QjM3MVx1QzJBNCBcdUNFOTBcdUMyRjFcbiAgICovXG4gIHNlYXJjaChxdWVyeUVtYmVkZGluZzogbnVtYmVyW10sIGs6IG51bWJlciA9IDgpOiBBcnJheTx7IGNodW5rSWQ6IHN0cmluZzsgc2NvcmU6IG51bWJlciB9PiB7XG4gICAgY29uc3QgYWxsRW1iZWRkaW5ncyA9IHRoaXMuZ2V0QWxsRW1iZWRkaW5ncygpO1xuICAgIGNvbnN0IHNjb3JlczogQXJyYXk8eyBjaHVua0lkOiBzdHJpbmc7IHNjb3JlOiBudW1iZXIgfT4gPSBbXTtcblxuICAgIGZvciAoY29uc3QgW2NodW5rSWQsIGVtYmVkZGluZ10gb2YgYWxsRW1iZWRkaW5ncy5lbnRyaWVzKCkpIHtcbiAgICAgIGNvbnN0IHNjb3JlID0gdGhpcy5jb3NpbmVTaW1pbGFyaXR5KHF1ZXJ5RW1iZWRkaW5nLCBlbWJlZGRpbmcpO1xuICAgICAgc2NvcmVzLnB1c2goeyBjaHVua0lkLCBzY29yZSB9KTtcbiAgICB9XG5cbiAgICAvLyBcdUM4MTBcdUMyMTggXHVBRTMwXHVDOTAwIFx1QjBCNFx1QjlCQ1x1Q0MyOFx1QzIxQyBcdUM4MTVcdUI4MkMgXHVENkM0IFx1QzBDMVx1QzcwNCBLXHVBQzFDIFx1QkMxOFx1RDY1OFxuICAgIHNjb3Jlcy5zb3J0KChhLCBiKSA9PiBiLnNjb3JlIC0gYS5zY29yZSk7XG4gICAgcmV0dXJuIHNjb3Jlcy5zbGljZSgwLCBrKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUIzNzBcdUM3NzRcdUQxMzBcdUJDQTBcdUM3NzRcdUMyQTQgXHVCMkVCXHVBRTMwXG4gICAqL1xuICBjbG9zZSgpOiB2b2lkIHtcbiAgICAvLyBcdUQzMENcdUM3N0MgXHVBRTMwXHVCQzE4IFx1QzgwMFx1QzdBNVx1QzE4Q1x1QjI5NCBjbG9zZSBcdUIzRDlcdUM3OTFcdUM3NzQgXHVENTQ0XHVDNjk0XHVENTU4XHVDOUMwIFx1QzU0QVx1QzJCNVx1QjJDOFx1QjJFNC5cbiAgfVxufVxuIiwgIi8vIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUMwRERcdUMxMzFcdUFFMzAgLSBBUEkgXHVBRTMwXHVCQzE4IFx1QkMwRiBcdUI4NUNcdUNFRUMgXHVCQUE4XHVCMzc4IFx1QzlDMFx1QzZEMFxuXG5pbXBvcnQgeyByZXF1ZXN0VXJsIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5cbmV4cG9ydCB0eXBlIEVtYmVkZGluZ0NvbmZpZyA9IHtcbiAgcHJvdmlkZXI6IFwiZ2VtaW5pXCIgfCBcIm9wZW5haVwiIHwgXCJsb2NhbFwiIHwgXCJjdXN0b21cIjtcbiAgYXBpS2V5Pzogc3RyaW5nO1xuICBtb2RlbDogc3RyaW5nO1xuICBhcGlVcmw/OiBzdHJpbmc7XG59O1xuXG5pbnRlcmZhY2UgR2VtaW5pRW1iZWRkaW5nUmVzcG9uc2Uge1xuICBlbWJlZGRpbmc/OiB7XG4gICAgdmFsdWVzPzogbnVtYmVyW107XG4gIH07XG59XG5cbmludGVyZmFjZSBPcGVuQUlFbWJlZGRpbmdSZXNwb25zZSB7XG4gIGRhdGE/OiBBcnJheTx7XG4gICAgZW1iZWRkaW5nPzogbnVtYmVyW107XG4gIH0+O1xufVxuXG5pbnRlcmZhY2UgQ3VzdG9tRW1iZWRkaW5nUmVzcG9uc2Uge1xuICBkYXRhPzogQXJyYXk8e1xuICAgIGVtYmVkZGluZz86IG51bWJlcltdO1xuICB9Pjtcbn1cblxuZXhwb3J0IGNsYXNzIEVtYmVkZGluZ0dlbmVyYXRvciB7XG4gIHByaXZhdGUgcGlwZWxpbmU6IGFueSA9IG51bGw7XG4gIHByaXZhdGUgcGlwZWxpbmVGYWN0b3J5OiAoKHRhc2s6IHN0cmluZywgbW9kZWw6IHN0cmluZykgPT4gUHJvbWlzZTxhbnk+KSB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGNvbmZpZzogRW1iZWRkaW5nQ29uZmlnO1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogRW1iZWRkaW5nQ29uZmlnKSB7XG4gICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gIH1cblxuICAvKipcbiAgICogXHVDNzg0XHVCQ0EwXHVCNTI5IFx1Q0QwOFx1QUUzMFx1RDY1NFxuICAgKi9cbiAgYXN5bmMgaW5pdGlhbGl6ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAodGhpcy5jb25maWcucHJvdmlkZXIgPT09IFwibG9jYWxcIikge1xuICAgICAgaWYgKHRoaXMucGlwZWxpbmUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zb2xlLmxvZyhgXHVCODVDXHVDRUVDIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUJBQThcdUIzNzggXHVCODVDXHVCNTI5IFx1QzkxMTogJHt0aGlzLmNvbmZpZy5tb2RlbH1gKTtcbiAgICAgIGNvbnNvbGUubG9nKGBcdUJBQThcdUIzNzhcdUM3NDAgSHVnZ2luZ0ZhY2VcdUM1RDBcdUMxMUMgXHVCMkU0XHVDNkI0XHVCODVDXHVCNERDXHVCNDE4XHVDNUI0IFx1Qjg1Q1x1Q0VFQ1x1QzVEMCBcdUNFOTBcdUMyRENcdUI0MjlcdUIyQzhcdUIyRTQuYCk7XG4gICAgICBjb25zdCBwaXBlbGluZUZhY3RvcnkgPSBhd2FpdCB0aGlzLmxvYWRQaXBlbGluZUZhY3RvcnkoKTtcbiAgICAgIHRoaXMucGlwZWxpbmUgPSBhd2FpdCBwaXBlbGluZUZhY3RvcnkoXCJmZWF0dXJlLWV4dHJhY3Rpb25cIiwgdGhpcy5jb25maWcubW9kZWwpO1xuICAgICAgY29uc29sZS5sb2coXCJcdUM3ODRcdUJDQTBcdUI1MjkgXHVCQUE4XHVCMzc4IFx1Qjg1Q1x1QjUyOSBcdUM2NDRcdUI4Q0NcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEFQSSBcdUFFMzBcdUJDMThcdUM3NDAgXHVDRDA4XHVBRTMwXHVENjU0IFx1QkQ4OFx1RDU0NFx1QzY5NFxuICAgICAgY29uc29sZS5sb2coYEFQSSBcdUFFMzBcdUJDMTggXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzBBQ1x1QzZBOTogJHt0aGlzLmNvbmZpZy5wcm92aWRlcn1gKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogXHVEMTREXHVDMkE0XHVEMkI4XHVCOTdDIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUJDQTFcdUQxMzBcdUI4NUMgXHVCQ0MwXHVENjU4XG4gICAqL1xuICBhc3luYyBlbWJlZCh0ZXh0OiBzdHJpbmcpOiBQcm9taXNlPG51bWJlcltdPiB7XG4gICAgaWYgKHRoaXMuY29uZmlnLnByb3ZpZGVyID09PSBcImxvY2FsXCIpIHtcbiAgICAgIHJldHVybiB0aGlzLmVtYmVkTG9jYWwodGV4dCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbmZpZy5wcm92aWRlciA9PT0gXCJnZW1pbmlcIikge1xuICAgICAgcmV0dXJuIHRoaXMuZW1iZWRHZW1pbmkodGV4dCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbmZpZy5wcm92aWRlciA9PT0gXCJvcGVuYWlcIikge1xuICAgICAgcmV0dXJuIHRoaXMuZW1iZWRPcGVuQUkodGV4dCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbmZpZy5wcm92aWRlciA9PT0gXCJjdXN0b21cIikge1xuICAgICAgcmV0dXJuIHRoaXMuZW1iZWRDdXN0b20odGV4dCk7XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IEVycm9yKGBcdUM5QzBcdUM2RDBcdUQ1NThcdUM5QzAgXHVDNTRBXHVCMjk0IFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUM4MUNcdUFDRjVcdUM3OTA6ICR7dGhpcy5jb25maWcucHJvdmlkZXJ9YCk7XG4gIH1cblxuICAvKipcbiAgICogXHVCODVDXHVDRUVDIFx1QkFBOFx1QjM3OFx1Qjg1QyBcdUM3ODRcdUJDQTBcdUI1MjkgXHVDMEREXHVDMTMxXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIGVtYmVkTG9jYWwodGV4dDogc3RyaW5nKTogUHJvbWlzZTxudW1iZXJbXT4ge1xuICAgIGlmICghdGhpcy5waXBlbGluZSkge1xuICAgICAgYXdhaXQgdGhpcy5pbml0aWFsaXplKCk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnBpcGVsaW5lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJcdUM3ODRcdUJDQTBcdUI1MjkgXHVEMzBDXHVDNzc0XHVENTA0XHVCNzdDXHVDNzc4IFx1Q0QwOFx1QUUzMFx1RDY1NCBcdUMyRTRcdUQzMjhcIik7XG4gICAgfVxuXG4gICAgY29uc3Qgb3V0cHV0ID0gYXdhaXQgdGhpcy5waXBlbGluZSh0ZXh0LCB7XG4gICAgICBwb29saW5nOiBcIm1lYW5cIixcbiAgICAgIG5vcm1hbGl6ZTogdHJ1ZSxcbiAgICB9KTtcblxuICAgIHJldHVybiBBcnJheS5mcm9tKG91dHB1dC5kYXRhIGFzIEZsb2F0MzJBcnJheSk7XG4gIH1cblxuICAvKipcbiAgICogXHVCODVDXHVDRUVDIFx1Qzc4NFx1QkNBMFx1QjUyOVx1QzZBOSBcdUQzMENcdUM3NzRcdUQ1MDRcdUI3N0NcdUM3NzggXHVCODVDXHVCMzU0IChcdUQ1NDRcdUM2OTRcdUQ1NjAgXHVCNTRDXHVCOUNDIFx1Qjg1Q1x1QjREQylcbiAgICovXG4gIHByaXZhdGUgYXN5bmMgbG9hZFBpcGVsaW5lRmFjdG9yeSgpOiBQcm9taXNlPCh0YXNrOiBzdHJpbmcsIG1vZGVsOiBzdHJpbmcpID0+IFByb21pc2U8YW55Pj4ge1xuICAgIGlmICh0aGlzLnBpcGVsaW5lRmFjdG9yeSkge1xuICAgICAgcmV0dXJuIHRoaXMucGlwZWxpbmVGYWN0b3J5O1xuICAgIH1cblxuICAgIGNvbnN0IG1vZHVsZSA9IGF3YWl0IGltcG9ydChcIkB4ZW5vdmEvdHJhbnNmb3JtZXJzXCIpO1xuICAgIHRoaXMucGlwZWxpbmVGYWN0b3J5ID0gbW9kdWxlLnBpcGVsaW5lIGFzICh0YXNrOiBzdHJpbmcsIG1vZGVsOiBzdHJpbmcpID0+IFByb21pc2U8YW55PjtcbiAgICByZXR1cm4gdGhpcy5waXBlbGluZUZhY3Rvcnk7XG4gIH1cblxuICAvKipcbiAgICogR2VtaW5pIEFQSVx1Qjg1QyBcdUM3ODRcdUJDQTBcdUI1MjkgXHVDMEREXHVDMTMxXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIGVtYmVkR2VtaW5pKHRleHQ6IHN0cmluZyk6IFByb21pc2U8bnVtYmVyW10+IHtcbiAgICBpZiAoIXRoaXMuY29uZmlnLmFwaUtleSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VtaW5pIEFQSSBcdUQwQTRcdUFDMDAgXHVDMTI0XHVDODE1XHVCNDE4XHVDOUMwIFx1QzU0QVx1QzU1OFx1QzJCNVx1QjJDOFx1QjJFNFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmNvbmZpZy5hcGlVcmx9LyR7dGhpcy5jb25maWcubW9kZWx9OmVtYmVkQ29udGVudD9rZXk9JHt0aGlzLmNvbmZpZy5hcGlLZXl9YDtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHJlcXVlc3RVcmwoe1xuICAgICAgICB1cmwsXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgICAgIHBhcnRzOiBbeyB0ZXh0IH1dLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGRhdGEgPSByZXNwb25zZS5qc29uIGFzIEdlbWluaUVtYmVkZGluZ1Jlc3BvbnNlO1xuICAgICAgaWYgKGRhdGEuZW1iZWRkaW5nPy52YWx1ZXMpIHtcbiAgICAgICAgcmV0dXJuIGRhdGEuZW1iZWRkaW5nLnZhbHVlcztcbiAgICAgIH1cblxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VtaW5pIEFQSSBcdUM3NTFcdUIyRjUgXHVENjE1XHVDMkREXHVDNzc0IFx1QzYyQ1x1QkMxNFx1Qjk3NFx1QzlDMCBcdUM1NEFcdUMyQjVcdUIyQzhcdUIyRTRcIik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJHZW1pbmkgXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzBERFx1QzEzMSBcdUMyRTRcdUQzMjg6XCIsIGVycm9yKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVuQUkgQVBJXHVCODVDIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUMwRERcdUMxMzFcbiAgICovXG4gIHByaXZhdGUgYXN5bmMgZW1iZWRPcGVuQUkodGV4dDogc3RyaW5nKTogUHJvbWlzZTxudW1iZXJbXT4ge1xuICAgIGlmICghdGhpcy5jb25maWcuYXBpS2V5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJPcGVuQUkgQVBJIFx1RDBBNFx1QUMwMCBcdUMxMjRcdUM4MTVcdUI0MThcdUM5QzAgXHVDNTRBXHVDNTU4XHVDMkI1XHVCMkM4XHVCMkU0XCIpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHJlcXVlc3RVcmwoe1xuICAgICAgICB1cmw6IHRoaXMuY29uZmlnLmFwaVVybCB8fCBcImh0dHBzOi8vYXBpLm9wZW5haS5jb20vdjEvZW1iZWRkaW5nc1wiLFxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IGBCZWFyZXIgJHt0aGlzLmNvbmZpZy5hcGlLZXl9YCxcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIG1vZGVsOiB0aGlzLmNvbmZpZy5tb2RlbCxcbiAgICAgICAgICBpbnB1dDogdGV4dCxcbiAgICAgICAgfSksXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgZGF0YSA9IHJlc3BvbnNlLmpzb24gYXMgT3BlbkFJRW1iZWRkaW5nUmVzcG9uc2U7XG4gICAgICBpZiAoZGF0YS5kYXRhPy5bMF0/LmVtYmVkZGluZykge1xuICAgICAgICByZXR1cm4gZGF0YS5kYXRhWzBdLmVtYmVkZGluZztcbiAgICAgIH1cblxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiT3BlbkFJIEFQSSBcdUM3NTFcdUIyRjUgXHVENjE1XHVDMkREXHVDNzc0IFx1QzYyQ1x1QkMxNFx1Qjk3NFx1QzlDMCBcdUM1NEFcdUMyQjVcdUIyQzhcdUIyRTRcIik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJPcGVuQUkgXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzBERFx1QzEzMSBcdUMyRTRcdUQzMjg6XCIsIGVycm9yKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBcdUNFRTRcdUMyQTRcdUQxNDAgQVBJXHVCODVDIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUMwRERcdUMxMzFcbiAgICovXG4gIHByaXZhdGUgYXN5bmMgZW1iZWRDdXN0b20odGV4dDogc3RyaW5nKTogUHJvbWlzZTxudW1iZXJbXT4ge1xuICAgIGlmICghdGhpcy5jb25maWcuYXBpVXJsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJcdUNFRTRcdUMyQTRcdUQxNDAgQVBJIFVSTFx1Qzc3NCBcdUMxMjRcdUM4MTVcdUI0MThcdUM5QzAgXHVDNTRBXHVDNTU4XHVDMkI1XHVCMkM4XHVCMkU0XCIpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBoZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLmNvbmZpZy5hcGlLZXkpIHtcbiAgICAgICAgaGVhZGVyc1tcIkF1dGhvcml6YXRpb25cIl0gPSBgQmVhcmVyICR7dGhpcy5jb25maWcuYXBpS2V5fWA7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcmVxdWVzdFVybCh7XG4gICAgICAgIHVybDogdGhpcy5jb25maWcuYXBpVXJsLFxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBoZWFkZXJzLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgbW9kZWw6IHRoaXMuY29uZmlnLm1vZGVsLFxuICAgICAgICAgIGlucHV0OiB0ZXh0LFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBkYXRhID0gcmVzcG9uc2UuanNvbiBhcyBDdXN0b21FbWJlZGRpbmdSZXNwb25zZSB8IG51bWJlcltdO1xuICAgICAgXG4gICAgICAvLyBPcGVuQUkgXHVENjM4XHVENjU4IFx1RDYxNVx1QzJERFxuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGRhdGEpICYmIGRhdGEuZGF0YT8uWzBdPy5lbWJlZGRpbmcpIHtcbiAgICAgICAgcmV0dXJuIGRhdGEuZGF0YVswXS5lbWJlZGRpbmc7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC8vIFx1QzlDMVx1QzgxMSBcdUJDMzBcdUM1RjQgXHVCQzE4XHVENjU4XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH1cblxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXHVDRUU0XHVDMkE0XHVEMTQwIEFQSSBcdUM3NTFcdUIyRjUgXHVENjE1XHVDMkREXHVDNzQ0IFx1RDMwQ1x1QzJGMVx1RDU2MCBcdUMyMTggXHVDNUM2XHVDMkI1XHVCMkM4XHVCMkU0XCIpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiXHVDRUU0XHVDMkE0XHVEMTQwIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUMwRERcdUMxMzEgXHVDMkU0XHVEMzI4OlwiLCBlcnJvcik7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogXHVDNUVDXHVCN0VDIFx1RDE0RFx1QzJBNFx1RDJCOFx1Qjk3QyBcdUJDMzBcdUNFNThcdUI4NUMgXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzBERFx1QzEzMVxuICAgKi9cbiAgYXN5bmMgZW1iZWRCYXRjaCh0ZXh0czogc3RyaW5nW10pOiBQcm9taXNlPG51bWJlcltdW10+IHtcbiAgICBjb25zdCBlbWJlZGRpbmdzOiBudW1iZXJbXVtdID0gW107XG5cbiAgICBmb3IgKGNvbnN0IHRleHQgb2YgdGV4dHMpIHtcbiAgICAgIGNvbnN0IGVtYmVkZGluZyA9IGF3YWl0IHRoaXMuZW1iZWQodGV4dCk7XG4gICAgICBlbWJlZGRpbmdzLnB1c2goZW1iZWRkaW5nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZW1iZWRkaW5ncztcbiAgfVxufVxuIiwgIi8vIFx1QjlDOFx1RDA2Q1x1QjJFNFx1QzZCNCBcdUQzMENcdUMxMUMgLSBmcm9udG1hdHRlciwgXHVEMERDXHVBREY4LCBcdUI5QzFcdUQwNkMgXHVDRDk0XHVDRDlDXG5cbmltcG9ydCBtYXR0ZXIgZnJvbSBcImdyYXktbWF0dGVyXCI7XG5pbXBvcnQgeyBjcmVhdGVIYXNoIH0gZnJvbSBcImNyeXB0b1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBhcnNlZE5vdGUge1xuICBjb250ZW50OiBzdHJpbmc7XG4gIGZyb250bWF0dGVyOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbiAgdGFnczogc3RyaW5nW107XG4gIGxpbmtzOiBzdHJpbmdbXTtcbiAgdGl0bGU6IHN0cmluZztcbiAgc2VjdGlvbnM6IFNlY3Rpb25bXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTZWN0aW9uIHtcbiAgaGVhZGluZzogc3RyaW5nO1xuICBjb250ZW50OiBzdHJpbmc7XG4gIGxldmVsOiBudW1iZXI7XG4gIHBvc2l0aW9uOiBudW1iZXI7XG59XG5cbi8qKlxuICogXHVCOUM4XHVEMDZDXHVCMkU0XHVDNkI0IFx1RDMwQ1x1Qzc3Q1x1Qzc0NCBcdUQzMENcdUMyRjFcdUQ1NThcdUM1RUMgXHVCQTU0XHVEMEMwXHVCMzcwXHVDNzc0XHVEMTMwXHVCOTdDIFx1Q0Q5NFx1Q0Q5Q1x1RDU2OVx1QjJDOFx1QjJFNC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTWFya2Rvd24oZmlsZVBhdGg6IHN0cmluZywgY29udGVudDogc3RyaW5nKTogUGFyc2VkTm90ZSB7XG4gIC8vIEZyb250bWF0dGVyIFx1RDMwQ1x1QzJGMVxuICBjb25zdCBwYXJzZWQgPSBtYXR0ZXIoY29udGVudCk7XG4gIGNvbnN0IGZyb250bWF0dGVyID0gcGFyc2VkLmRhdGEgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG4gIGNvbnN0IGJvZHlDb250ZW50ID0gcGFyc2VkLmNvbnRlbnQ7XG5cbiAgLy8gXHVDODFDXHVCQUE5IFx1Q0Q5NFx1Q0Q5QyAoZnJvbnRtYXR0ZXJcdUM3NTggdGl0bGUgXHVCNjEwXHVCMjk0IFx1RDMwQ1x1Qzc3Q1x1QkE4NSlcbiAgY29uc3QgdGl0bGUgPSAoZnJvbnRtYXR0ZXIudGl0bGUgYXMgc3RyaW5nKSB8fCBleHRyYWN0VGl0bGVGcm9tUGF0aChmaWxlUGF0aCk7XG5cbiAgLy8gXHVEMERDXHVBREY4IFx1Q0Q5NFx1Q0Q5QyAoI1x1RDBEQ1x1QURGOCBcdUQ2MTVcdUMyREQpXG4gIGNvbnN0IHRhZ3MgPSBleHRyYWN0VGFncyhib2R5Q29udGVudCwgZnJvbnRtYXR0ZXIpO1xuXG4gIC8vIFx1QjlDMVx1RDA2QyBcdUNEOTRcdUNEOUMgKFtbXHVCOUMxXHVEMDZDXV0gXHVENjE1XHVDMkREKVxuICBjb25zdCBsaW5rcyA9IGV4dHJhY3RMaW5rcyhib2R5Q29udGVudCk7XG5cbiAgLy8gXHVDMTM5XHVDMTU4IFx1QkQ4NFx1QjlBQ1xuICBjb25zdCBzZWN0aW9ucyA9IGV4dHJhY3RTZWN0aW9ucyhib2R5Q29udGVudCk7XG5cbiAgcmV0dXJuIHtcbiAgICBjb250ZW50OiBib2R5Q29udGVudCxcbiAgICBmcm9udG1hdHRlcixcbiAgICB0YWdzLFxuICAgIGxpbmtzLFxuICAgIHRpdGxlLFxuICAgIHNlY3Rpb25zLFxuICB9O1xufVxuXG4vKipcbiAqIFx1RDMwQ1x1Qzc3QyBcdUFDQkRcdUI4NUNcdUM1RDBcdUMxMUMgXHVDODFDXHVCQUE5IFx1Q0Q5NFx1Q0Q5Q1xuICovXG5mdW5jdGlvbiBleHRyYWN0VGl0bGVGcm9tUGF0aChmaWxlUGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgZmlsZU5hbWUgPSBmaWxlUGF0aC5zcGxpdChcIi9cIikucG9wKCkgfHwgXCJcIjtcbiAgcmV0dXJuIGZpbGVOYW1lLnJlcGxhY2UoL1xcLm1kJC8sIFwiXCIpO1xufVxuXG4vKipcbiAqIFx1QkNGOFx1QkIzOFx1QUNGQyBmcm9udG1hdHRlclx1QzVEMFx1QzExQyBcdUQwRENcdUFERjggXHVDRDk0XHVDRDlDXG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3RUYWdzKGNvbnRlbnQ6IHN0cmluZywgZnJvbnRtYXR0ZXI6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogc3RyaW5nW10ge1xuICBjb25zdCB0YWdzID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cbiAgLy8gRnJvbnRtYXR0ZXJcdUM3NTggdGFncyBcdUQ1NDRcdUI0RENcbiAgaWYgKEFycmF5LmlzQXJyYXkoZnJvbnRtYXR0ZXIudGFncykpIHtcbiAgICBmcm9udG1hdHRlci50YWdzLmZvckVhY2goKHRhZykgPT4ge1xuICAgICAgaWYgKHR5cGVvZiB0YWcgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdGFncy5hZGQodGFnLnJlcGxhY2UoL14jLywgXCJcIikpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gXHVCQ0Y4XHVCQjM4XHVDNUQwXHVDMTFDICNcdUQwRENcdUFERjggXHVDRDk0XHVDRDlDXG4gIGNvbnN0IGhhc2h0YWdSZWdleCA9IC8jKFthLXpBLVowLTlcdUFDMDAtXHVEN0EzXy1dKykvZztcbiAgbGV0IG1hdGNoO1xuICB3aGlsZSAoKG1hdGNoID0gaGFzaHRhZ1JlZ2V4LmV4ZWMoY29udGVudCkpICE9PSBudWxsKSB7XG4gICAgdGFncy5hZGQobWF0Y2hbMV0pO1xuICB9XG5cbiAgcmV0dXJuIEFycmF5LmZyb20odGFncyk7XG59XG5cbi8qKlxuICogT2JzaWRpYW4gXHVCOUMxXHVEMDZDIFx1Q0Q5NFx1Q0Q5QyAoW1tcdUI5QzFcdUQwNkNdXSBcdUQ2MTVcdUMyREQpXG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3RMaW5rcyhjb250ZW50OiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gIGNvbnN0IGxpbmtzID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gIGNvbnN0IGxpbmtSZWdleCA9IC9cXFtcXFsoW15cXF1dKylcXF1cXF0vZztcbiAgbGV0IG1hdGNoO1xuICB3aGlsZSAoKG1hdGNoID0gbGlua1JlZ2V4LmV4ZWMoY29udGVudCkpICE9PSBudWxsKSB7XG4gICAgLy8gXHVCQ0M0XHVDRTZEIFx1Q0M5OFx1QjlBQyBbW1x1QjlDMVx1RDA2Q3xcdUJDQzRcdUNFNkRdXVxuICAgIGNvbnN0IGxpbmsgPSBtYXRjaFsxXS5zcGxpdChcInxcIilbMF0udHJpbSgpO1xuICAgIGxpbmtzLmFkZChsaW5rKTtcbiAgfVxuICByZXR1cm4gQXJyYXkuZnJvbShsaW5rcyk7XG59XG5cbi8qKlxuICogXHVENUU0XHVCMzU0IFx1QUUzMFx1QzkwMFx1QzczQ1x1Qjg1QyBcdUMxMzlcdUMxNTggXHVCRDg0XHVCOUFDXG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3RTZWN0aW9ucyhjb250ZW50OiBzdHJpbmcpOiBTZWN0aW9uW10ge1xuICBjb25zdCBzZWN0aW9uczogU2VjdGlvbltdID0gW107XG4gIGNvbnN0IGxpbmVzID0gY29udGVudC5zcGxpdChcIlxcblwiKTtcblxuICBsZXQgY3VycmVudFNlY3Rpb246IFNlY3Rpb24gfCBudWxsID0gbnVsbDtcbiAgbGV0IGN1cnJlbnRDb250ZW50OiBzdHJpbmdbXSA9IFtdO1xuICBsZXQgcG9zaXRpb24gPSAwO1xuXG4gIGZvciAoY29uc3QgbGluZSBvZiBsaW5lcykge1xuICAgIGNvbnN0IGhlYWRlck1hdGNoID0gbGluZS5tYXRjaCgvXigjezEsNn0pXFxzKyguKykkLyk7XG5cbiAgICBpZiAoaGVhZGVyTWF0Y2gpIHtcbiAgICAgIC8vIFx1Qzc3NFx1QzgwNCBcdUMxMzlcdUMxNTggXHVDODAwXHVDN0E1XG4gICAgICBpZiAoY3VycmVudFNlY3Rpb24pIHtcbiAgICAgICAgY3VycmVudFNlY3Rpb24uY29udGVudCA9IGN1cnJlbnRDb250ZW50LmpvaW4oXCJcXG5cIikudHJpbSgpO1xuICAgICAgICBzZWN0aW9ucy5wdXNoKGN1cnJlbnRTZWN0aW9uKTtcbiAgICAgIH1cblxuICAgICAgLy8gXHVDMEM4IFx1QzEzOVx1QzE1OCBcdUMyRENcdUM3OTFcbiAgICAgIGN1cnJlbnRTZWN0aW9uID0ge1xuICAgICAgICBoZWFkaW5nOiBoZWFkZXJNYXRjaFsyXS50cmltKCksXG4gICAgICAgIGNvbnRlbnQ6IFwiXCIsXG4gICAgICAgIGxldmVsOiBoZWFkZXJNYXRjaFsxXS5sZW5ndGgsXG4gICAgICAgIHBvc2l0aW9uLFxuICAgICAgfTtcbiAgICAgIGN1cnJlbnRDb250ZW50ID0gW107XG4gICAgfSBlbHNlIGlmIChjdXJyZW50U2VjdGlvbikge1xuICAgICAgY3VycmVudENvbnRlbnQucHVzaChsaW5lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gXHVENUU0XHVCMzU0IFx1QzVDNlx1QjI5NCBcdUNDQUIgXHVCRDgwXHVCRDg0XG4gICAgICBpZiAoc2VjdGlvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGN1cnJlbnRTZWN0aW9uID0ge1xuICAgICAgICAgIGhlYWRpbmc6IFwiXCIsXG4gICAgICAgICAgY29udGVudDogXCJcIixcbiAgICAgICAgICBsZXZlbDogMCxcbiAgICAgICAgICBwb3NpdGlvbixcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGN1cnJlbnRDb250ZW50LnB1c2gobGluZSk7XG4gICAgfVxuXG4gICAgcG9zaXRpb24gKz0gbGluZS5sZW5ndGggKyAxOyAvLyArMSBmb3IgbmV3bGluZVxuICB9XG5cbiAgLy8gXHVCOUM4XHVDOUMwXHVCOUM5IFx1QzEzOVx1QzE1OCBcdUM4MDBcdUM3QTVcbiAgaWYgKGN1cnJlbnRTZWN0aW9uKSB7XG4gICAgY3VycmVudFNlY3Rpb24uY29udGVudCA9IGN1cnJlbnRDb250ZW50LmpvaW4oXCJcXG5cIikudHJpbSgpO1xuICAgIHNlY3Rpb25zLnB1c2goY3VycmVudFNlY3Rpb24pO1xuICB9XG5cbiAgcmV0dXJuIHNlY3Rpb25zO1xufVxuXG4vKipcbiAqIFx1RDMwQ1x1Qzc3QyBcdUIwQjRcdUM2QTlcdUM3NTggXHVENTc0XHVDMkRDIFx1QzBERFx1QzEzMVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tcHV0ZUhhc2goY29udGVudDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGNyZWF0ZUhhc2goXCJzaGEyNTZcIikudXBkYXRlKGNvbnRlbnQpLmRpZ2VzdChcImhleFwiKTtcbn1cbiIsICIvLyBcdUJCMzhcdUMxMUMgXHVDQ0FEXHVEMEI5IFx1Qjg1Q1x1QzlDMSAtIFx1RDE0RFx1QzJBNFx1RDJCOFx1Qjk3QyBcdUM4MDFcdUM4MDhcdUQ1NUMgXHVEMDZDXHVBRTMwXHVCODVDIFx1QkQ4NFx1RDU2MFxuXG5pbXBvcnQgeyBDaHVuayB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyBTZWN0aW9uIH0gZnJvbSBcIi4vcGFyc2VyXCI7XG5cbi8qKlxuICogXHVBQzA0XHVCMkU4XHVENTVDIFx1RDFBMFx1RDA3MCBcdUNFNzRcdUM2QjRcdUQxMzAgKFx1QUNGNVx1QkMzMSBcdUFFMzBcdUM5MDAgXHVBREZDXHVDMEFDXHVDRTU4KVxuICogXHVDQzM4XHVBQ0UwOiBcdUQ1NUNcdUFFMDBcdUFDRkMgXHVDNjAxXHVDNUI0XHVCOTdDIFx1QkQ4NFx1QjlBQ1x1RDU1OFx1QzVFQyBcdUNFNzRcdUM2QjRcdUQyQjhcdUQ1NThcdUM1RUMgXHVDNzc0XHVDOTExIFx1Q0U3NFx1QzZCNFx1RDJCOCBcdUJDMjlcdUM5QzBcbiAqL1xuZnVuY3Rpb24gZXN0aW1hdGVUb2tlbkNvdW50KHRleHQ6IHN0cmluZyk6IG51bWJlciB7XG4gIC8vIFx1RDU1Q1x1QUUwMCBcdUJCMzhcdUM3OTAgXHVDODFDXHVBQzcwIFx1RDZDNCBcdUM2MDFcdUM1QjQvXHVDMjJCXHVDNzkwIFx1QjJFOFx1QzVCNCBcdUNFNzRcdUM2QjRcdUQyQjhcbiAgY29uc3Qgbm9uS29yZWFuVGV4dCA9IHRleHQucmVwbGFjZSgvW1x1QUMwMC1cdUQ3QTNdL2csIFwiIFwiKTtcbiAgY29uc3Qgd29yZHMgPSBub25Lb3JlYW5UZXh0LnNwbGl0KC9cXHMrLykuZmlsdGVyKCh3KSA9PiB3Lmxlbmd0aCA+IDApLmxlbmd0aDtcbiAgXG4gIC8vIFx1RDU1Q1x1QUUwMCBcdUJCMzhcdUM3OTBcdUI5Q0MgXHVDRTc0XHVDNkI0XHVEMkI4XG4gIGNvbnN0IGtvcmVhbkNoYXJzID0gKHRleHQubWF0Y2goL1tcdUFDMDAtXHVEN0EzXS9nKSB8fCBbXSkubGVuZ3RoO1xuICBcbiAgLy8gXHVDNjAxXHVDNUI0XHVCMjk0IDFcdUIyRThcdUM1QjQgXHUyMjQ4IDEuMyBcdUQxQTBcdUQwNzAsIFx1RDU1Q1x1QUUwMFx1Qzc0MCAxXHVDNzRDXHVDODA4IFx1MjI0OCAxIFx1RDFBMFx1RDA3MCBcdUFERkNcdUMwQUNcbiAgcmV0dXJuIE1hdGguY2VpbCh3b3JkcyAqIDEuMyArIGtvcmVhbkNoYXJzKTtcbn1cblxuLyoqXG4gKiBcdUQxNERcdUMyQTRcdUQyQjhcdUI5N0MgXHVDQ0FEXHVEMDZDXHVCODVDIFx1QkQ4NFx1RDU2MFxuICovXG5leHBvcnQgZnVuY3Rpb24gY2h1bmtUZXh0KFxuICBub3RlSWQ6IHN0cmluZyxcbiAgc2VjdGlvbnM6IFNlY3Rpb25bXSxcbiAgb3B0aW9uczoge1xuICAgIGNodW5rU2l6ZT86IG51bWJlcjtcbiAgICBjaHVua092ZXJsYXA/OiBudW1iZXI7XG4gIH0gPSB7fVxuKTogQ2h1bmtbXSB7XG4gIGNvbnN0IGNodW5rU2l6ZSA9IG9wdGlvbnMuY2h1bmtTaXplIHx8IDQwMDtcbiAgY29uc3QgY2h1bmtPdmVybGFwID0gb3B0aW9ucy5jaHVua092ZXJsYXAgfHwgNTA7XG4gIGNvbnN0IGNodW5rczogQ2h1bmtbXSA9IFtdO1xuXG4gIGZvciAoY29uc3Qgc2VjdGlvbiBvZiBzZWN0aW9ucykge1xuICAgIGNvbnN0IHNlY3Rpb25UZXh0ID0gc2VjdGlvbi5oZWFkaW5nXG4gICAgICA/IGAjICR7c2VjdGlvbi5oZWFkaW5nfVxcblxcbiR7c2VjdGlvbi5jb250ZW50fWBcbiAgICAgIDogc2VjdGlvbi5jb250ZW50O1xuXG4gICAgaWYgKCFzZWN0aW9uVGV4dC50cmltKCkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGNvbnN0IHRva2VuQ291bnQgPSBlc3RpbWF0ZVRva2VuQ291bnQoc2VjdGlvblRleHQpO1xuXG4gICAgLy8gXHVDMTM5XHVDMTU4XHVDNzc0IFx1Q0NBRFx1RDA2QyBcdUQwNkNcdUFFMzBcdUJDRjRcdUIyRTQgXHVDNzkxXHVDNzNDXHVCQTc0IFx1QURGOFx1QjMwMFx1Qjg1QyBcdUMwQUNcdUM2QTlcbiAgICBpZiAodG9rZW5Db3VudCA8PSBjaHVua1NpemUpIHtcbiAgICAgIGNodW5rcy5wdXNoKHtcbiAgICAgICAgaWQ6IGAke25vdGVJZH0tY2h1bmstJHtjaHVua3MubGVuZ3RofWAsXG4gICAgICAgIG5vdGVJZCxcbiAgICAgICAgdGV4dDogc2VjdGlvblRleHQsXG4gICAgICAgIHBvc2l0aW9uOiBzZWN0aW9uLnBvc2l0aW9uLFxuICAgICAgICB0b2tlbkNvdW50LFxuICAgICAgICBzZWN0aW9uOiBzZWN0aW9uLmhlYWRpbmcsXG4gICAgICB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIFx1QzEzOVx1QzE1OFx1Qzc3NCBcdUQwNkNcdUJBNzQgXHVCQjM4XHVDN0E1IFx1QjJFOFx1QzcwNFx1Qjg1QyBcdUJEODRcdUQ1NjBcbiAgICBjb25zdCBzZW50ZW5jZXMgPSBzcGxpdEludG9TZW50ZW5jZXMoc2VjdGlvblRleHQpO1xuICAgIGxldCBjdXJyZW50Q2h1bms6IHN0cmluZ1tdID0gW107XG4gICAgbGV0IGN1cnJlbnRUb2tlbnMgPSAwO1xuXG4gICAgZm9yIChjb25zdCBzZW50ZW5jZSBvZiBzZW50ZW5jZXMpIHtcbiAgICAgIGNvbnN0IHNlbnRlbmNlVG9rZW5zID0gZXN0aW1hdGVUb2tlbkNvdW50KHNlbnRlbmNlKTtcblxuICAgICAgLy8gXHVENjA0XHVDN0FDIFx1Q0NBRFx1RDA2Q1x1QzVEMCBcdUNEOTRcdUFDMDAgXHVBQzAwXHVCMkE1XHVENTVDXHVDOUMwIFx1RDY1NVx1Qzc3OFxuICAgICAgaWYgKGN1cnJlbnRUb2tlbnMgKyBzZW50ZW5jZVRva2VucyA8PSBjaHVua1NpemUpIHtcbiAgICAgICAgY3VycmVudENodW5rLnB1c2goc2VudGVuY2UpO1xuICAgICAgICBjdXJyZW50VG9rZW5zICs9IHNlbnRlbmNlVG9rZW5zO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gXHVENjA0XHVDN0FDIFx1Q0NBRFx1RDA2QyBcdUM4MDBcdUM3QTVcbiAgICAgICAgaWYgKGN1cnJlbnRDaHVuay5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgY29uc3QgY2h1bmtUZXh0ID0gY3VycmVudENodW5rLmpvaW4oXCIgXCIpO1xuICAgICAgICAgIGNodW5rcy5wdXNoKHtcbiAgICAgICAgICAgIGlkOiBgJHtub3RlSWR9LWNodW5rLSR7Y2h1bmtzLmxlbmd0aH1gLFxuICAgICAgICAgICAgbm90ZUlkLFxuICAgICAgICAgICAgdGV4dDogY2h1bmtUZXh0LFxuICAgICAgICAgICAgcG9zaXRpb246IHNlY3Rpb24ucG9zaXRpb24sXG4gICAgICAgICAgICB0b2tlbkNvdW50OiBjdXJyZW50VG9rZW5zLFxuICAgICAgICAgICAgc2VjdGlvbjogc2VjdGlvbi5oZWFkaW5nLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gXHVDNjI0XHVCQzg0XHVCN0E5XHVDNzQ0IFx1QzcwNFx1RDU3NCBcdUI5QzhcdUM5QzBcdUI5QzkgXHVCQTg3IFx1QkIzOFx1QzdBNSBcdUM3MjBcdUM5QzBcbiAgICAgICAgICBjb25zdCBvdmVybGFwU2VudGVuY2VzID0gZ2V0T3ZlcmxhcFNlbnRlbmNlcyhjdXJyZW50Q2h1bmssIGNodW5rT3ZlcmxhcCk7XG4gICAgICAgICAgY3VycmVudENodW5rID0gb3ZlcmxhcFNlbnRlbmNlcztcbiAgICAgICAgICBjdXJyZW50VG9rZW5zID0gZXN0aW1hdGVUb2tlbkNvdW50KGN1cnJlbnRDaHVuay5qb2luKFwiIFwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBcdUMwQzggXHVDQ0FEXHVEMDZDIFx1QzJEQ1x1Qzc5MVxuICAgICAgICBjdXJyZW50Q2h1bmsucHVzaChzZW50ZW5jZSk7XG4gICAgICAgIGN1cnJlbnRUb2tlbnMgKz0gc2VudGVuY2VUb2tlbnM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gXHVCOUM4XHVDOUMwXHVCOUM5IFx1Q0NBRFx1RDA2QyBcdUM4MDBcdUM3QTVcbiAgICBpZiAoY3VycmVudENodW5rLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGNodW5rVGV4dCA9IGN1cnJlbnRDaHVuay5qb2luKFwiIFwiKTtcbiAgICAgIGNodW5rcy5wdXNoKHtcbiAgICAgICAgaWQ6IGAke25vdGVJZH0tY2h1bmstJHtjaHVua3MubGVuZ3RofWAsXG4gICAgICAgIG5vdGVJZCxcbiAgICAgICAgdGV4dDogY2h1bmtUZXh0LFxuICAgICAgICBwb3NpdGlvbjogc2VjdGlvbi5wb3NpdGlvbixcbiAgICAgICAgdG9rZW5Db3VudDogY3VycmVudFRva2VucyxcbiAgICAgICAgc2VjdGlvbjogc2VjdGlvbi5oZWFkaW5nLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNodW5rcztcbn1cblxuLyoqXG4gKiBcdUQxNERcdUMyQTRcdUQyQjhcdUI5N0MgXHVCQjM4XHVDN0E1XHVDNzNDXHVCODVDIFx1QkQ4NFx1RDU2MCAoXHVBQzA0XHVCMkU4XHVENTVDIFx1QkM4NFx1QzgwNClcbiAqIFx1Q0MzOFx1QUNFMDogXHVDNTdEXHVDNUI0KERyLiwgTXIuIFx1QjRGMSlcdUIwOTggXHVDMThDXHVDMjE4XHVDODEwXHVDNUQwXHVDMTFDIFx1QkQ4NFx1RDU2MFx1QjQyMCBcdUMyMTggXHVDNzg4XHVDNzRDXG4gKi9cbmZ1bmN0aW9uIHNwbGl0SW50b1NlbnRlbmNlcyh0ZXh0OiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gIC8vIFx1QjlDOFx1Q0U2OFx1RDQ1QywgXHVCMjkwXHVCMDhDXHVENDVDLCBcdUJCM0NcdUM3NENcdUQ0NUMgXHVCNEE0IFx1QUNGNVx1QkMzMVx1QzczQ1x1Qjg1QyBcdUJEODRcdUQ1NjBcbiAgLy8gXHVDODFDXHVENTVDXHVDMEFDXHVENTZEOiBcdUM1N0RcdUM1QjRcdUIwOTggXHVDMThDXHVDMjE4XHVDODEwXHVDNUQwXHVDMTFDIFx1Qzc5OFx1QkFCQiBcdUJEODRcdUQ1NjBcdUI0MjAgXHVDMjE4IFx1Qzc4OFx1Qzc0Q1xuICBjb25zdCBzZW50ZW5jZXMgPSB0ZXh0LnNwbGl0KC8oWy4hP11cXHMrKS8pLmZpbHRlcigocykgPT4gcy50cmltKCkpO1xuICBjb25zdCByZXN1bHQ6IHN0cmluZ1tdID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZW50ZW5jZXMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICBjb25zdCBzZW50ZW5jZSA9IHNlbnRlbmNlc1tpXTtcbiAgICBjb25zdCBwdW5jdHVhdGlvbiA9IHNlbnRlbmNlc1tpICsgMV0gfHwgXCJcIjtcbiAgICByZXN1bHQucHVzaChzZW50ZW5jZSArIHB1bmN0dWF0aW9uKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQuZmlsdGVyKChzKSA9PiBzLnRyaW0oKSk7XG59XG5cbi8qKlxuICogXHVDNjI0XHVCQzg0XHVCN0E5XHVDNzQ0IFx1QzcwNFx1RDU1QyBcdUI5QzhcdUM5QzBcdUI5QzkgXHVCQjM4XHVDN0E1XHVCNEU0IFx1QUMwMFx1QzgzOFx1QzYyNFx1QUUzMFxuICovXG5mdW5jdGlvbiBnZXRPdmVybGFwU2VudGVuY2VzKHNlbnRlbmNlczogc3RyaW5nW10sIHRhcmdldFRva2VuczogbnVtYmVyKTogc3RyaW5nW10ge1xuICBjb25zdCBvdmVybGFwOiBzdHJpbmdbXSA9IFtdO1xuICBsZXQgdG9rZW5zID0gMDtcblxuICBmb3IgKGxldCBpID0gc2VudGVuY2VzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgY29uc3Qgc2VudGVuY2UgPSBzZW50ZW5jZXNbaV07XG4gICAgY29uc3Qgc2VudGVuY2VUb2tlbnMgPSBlc3RpbWF0ZVRva2VuQ291bnQoc2VudGVuY2UpO1xuXG4gICAgaWYgKHRva2VucyArIHNlbnRlbmNlVG9rZW5zID4gdGFyZ2V0VG9rZW5zKSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBvdmVybGFwLnVuc2hpZnQoc2VudGVuY2UpO1xuICAgIHRva2VucyArPSBzZW50ZW5jZVRva2VucztcbiAgfVxuXG4gIHJldHVybiBvdmVybGFwO1xufVxuIiwgIi8vIFx1Qzc3OFx1QjM3MVx1QzExQyAtIFx1RDMwQ1x1Qzc3QyBcdUMyQTRcdUNFOTQsIFx1RDMwQ1x1QzJGMSwgXHVDQ0FEXHVEMEI5LCBcdUM3ODRcdUJDQTBcdUI1MjksIFx1QzgwMFx1QzdBNVx1Qzc0NCBcdUQxQjVcdUQ1NjlcblxuaW1wb3J0IHsgTWV0YWRhdGFTdG9yZSB9IGZyb20gXCIuL21ldGFkYXRhU3RvcmVcIjtcbmltcG9ydCB7IFZlY3RvclN0b3JlIH0gZnJvbSBcIi4vdmVjdG9yU3RvcmVcIjtcbmltcG9ydCB7IEVtYmVkZGluZ0dlbmVyYXRvciwgRW1iZWRkaW5nQ29uZmlnIH0gZnJvbSBcIi4vZW1iZWRkaW5nc1wiO1xuaW1wb3J0IHsgcGFyc2VNYXJrZG93biwgY29tcHV0ZUhhc2ggfSBmcm9tIFwiLi9wYXJzZXJcIjtcbmltcG9ydCB7IGNodW5rVGV4dCB9IGZyb20gXCIuL2NodW5rZXJcIjtcbmltcG9ydCB7IEluZGV4aW5nQ29uZmlnLCBOb3RlTWV0YWRhdGEsIENodW5rIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IGNyZWF0ZUhhc2ggfSBmcm9tIFwiY3J5cHRvXCI7XG5cbmV4cG9ydCBjbGFzcyBJbmRleGVyIHtcbiAgcHJpdmF0ZSBtZXRhZGF0YVN0b3JlOiBNZXRhZGF0YVN0b3JlO1xuICBwcml2YXRlIHZlY3RvclN0b3JlOiBWZWN0b3JTdG9yZTtcbiAgcHJpdmF0ZSBlbWJlZGRpbmdHZW5lcmF0b3I6IEVtYmVkZGluZ0dlbmVyYXRvcjtcbiAgcHJpdmF0ZSBjb25maWc6IEluZGV4aW5nQ29uZmlnO1xuICBwcml2YXRlIGluZGV4U2lnbmF0dXJlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBJbmRleGluZ0NvbmZpZykge1xuICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgIHRoaXMuaW5kZXhTaWduYXR1cmUgPSB0aGlzLmdlbmVyYXRlSW5kZXhTaWduYXR1cmUoKTtcbiAgICB0aGlzLm1ldGFkYXRhU3RvcmUgPSBuZXcgTWV0YWRhdGFTdG9yZShjb25maWcubWV0YVN0b3JlUGF0aCwgdGhpcy5pbmRleFNpZ25hdHVyZSk7XG4gICAgdGhpcy52ZWN0b3JTdG9yZSA9IG5ldyBWZWN0b3JTdG9yZShjb25maWcudmVjdG9yU3RvcmVQYXRoLCB0aGlzLmluZGV4U2lnbmF0dXJlKTtcbiAgICBcbiAgICBjb25zdCBlbWJlZGRpbmdDb25maWc6IEVtYmVkZGluZ0NvbmZpZyA9IHtcbiAgICAgIHByb3ZpZGVyOiBjb25maWcuZW1iZWRkaW5nUHJvdmlkZXIsXG4gICAgICBtb2RlbDogY29uZmlnLmVtYmVkZGluZ01vZGVsLFxuICAgICAgYXBpS2V5OiBjb25maWcuZW1iZWRkaW5nQXBpS2V5LFxuICAgICAgYXBpVXJsOiBjb25maWcuZW1iZWRkaW5nQXBpVXJsLFxuICAgIH07XG4gICAgXG4gICAgdGhpcy5lbWJlZGRpbmdHZW5lcmF0b3IgPSBuZXcgRW1iZWRkaW5nR2VuZXJhdG9yKGVtYmVkZGluZ0NvbmZpZyk7XG4gIH1cblxuICAvKipcbiAgICogXHVDRDA4XHVBRTMwXHVENjU0IC0gXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QkFBOFx1QjM3OCBcdUI4NUNcdUI0RENcbiAgICovXG4gIGFzeW5jIGluaXRpYWxpemUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5lbWJlZGRpbmdHZW5lcmF0b3IuaW5pdGlhbGl6ZSgpO1xuXG4gICAgY29uc3QgbWV0YWRhdGFTaWduYXR1cmUgPSB0aGlzLm1ldGFkYXRhU3RvcmUuZ2V0SW5kZXhTaWduYXR1cmUoKTtcbiAgICBjb25zdCB2ZWN0b3JTaWduYXR1cmUgPSB0aGlzLnZlY3RvclN0b3JlLmdldEluZGV4U2lnbmF0dXJlKCk7XG5cbiAgICBpZiAoXG4gICAgICBtZXRhZGF0YVNpZ25hdHVyZSAhPT0gdGhpcy5pbmRleFNpZ25hdHVyZSB8fFxuICAgICAgdmVjdG9yU2lnbmF0dXJlICE9PSB0aGlzLmluZGV4U2lnbmF0dXJlXG4gICAgKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIlx1Qzc4NFx1QkNBMFx1QjUyOSBcdUJBQThcdUIzNzggXHVCQ0MwXHVBQ0JEIFx1QUMxMFx1QzlDMDogXHVBRTMwXHVDODc0IFx1Qzc3OFx1QjM3MVx1QzJBNFx1Qjk3QyBcdUNEMDhcdUFFMzBcdUQ2NTRcdUQ1NjlcdUIyQzhcdUIyRTQuXCIpO1xuICAgICAgdGhpcy5tZXRhZGF0YVN0b3JlLnJlc2V0KHRoaXMuaW5kZXhTaWduYXR1cmUpO1xuICAgICAgdGhpcy52ZWN0b3JTdG9yZS5yZXNldCh0aGlzLmluZGV4U2lnbmF0dXJlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogXHVCMkU4XHVDNzdDIFx1RDMwQ1x1Qzc3QyBcdUM3NzhcdUIzNzFcdUMyRjFcbiAgICovXG4gIGFzeW5jIGluZGV4RmlsZShmaWxlUGF0aDogc3RyaW5nLCBjb250ZW50OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0cnkge1xuICAgICAgLy8gXHVEMzBDXHVDNzdDIFx1RDU3NFx1QzJEQyBcdUFDQzRcdUMwQjBcbiAgICAgIGNvbnN0IGhhc2ggPSBjb21wdXRlSGFzaChjb250ZW50KTtcblxuICAgICAgLy8gXHVBRTMwXHVDODc0IFx1QjE3OFx1RDJCOCBcdUQ2NTVcdUM3NzhcbiAgICAgIGNvbnN0IGV4aXN0aW5nTm90ZSA9IHRoaXMubWV0YWRhdGFTdG9yZS5nZXROb3RlQnlQYXRoKGZpbGVQYXRoKTtcbiAgICAgIGlmIChleGlzdGluZ05vdGUgJiYgZXhpc3RpbmdOb3RlLmhhc2ggPT09IGhhc2gpIHtcbiAgICAgICAgY29uc29sZS5sb2coYFx1RDMwQ1x1Qzc3QyBcdUJDQzBcdUFDQkQgXHVDNUM2XHVDNzRDLCBcdUMyQTRcdUQwQjU6ICR7ZmlsZVBhdGh9YCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gXHVCOUM4XHVEMDZDXHVCMkU0XHVDNkI0IFx1RDMwQ1x1QzJGMVxuICAgICAgY29uc3QgcGFyc2VkID0gcGFyc2VNYXJrZG93bihmaWxlUGF0aCwgY29udGVudCk7XG5cbiAgICAgIC8vIFx1QjE3OFx1RDJCOCBJRCBcdUMwRERcdUMxMzFcbiAgICAgIGNvbnN0IG5vdGVJZCA9IHRoaXMuZ2VuZXJhdGVOb3RlSWQoZmlsZVBhdGgpO1xuXG4gICAgICAvLyBcdUJBNTRcdUQwQzBcdUIzNzBcdUM3NzRcdUQxMzAgXHVDODAwXHVDN0E1XG4gICAgICBjb25zdCBub3RlTWV0YWRhdGE6IE5vdGVNZXRhZGF0YSA9IHtcbiAgICAgICAgaWQ6IG5vdGVJZCxcbiAgICAgICAgcGF0aDogZmlsZVBhdGgsXG4gICAgICAgIHRpdGxlOiBwYXJzZWQudGl0bGUsXG4gICAgICAgIHRhZ3M6IHBhcnNlZC50YWdzLFxuICAgICAgICBsaW5rczogcGFyc2VkLmxpbmtzLFxuICAgICAgICBmcm9udG1hdHRlcjogcGFyc2VkLmZyb250bWF0dGVyLFxuICAgICAgICB1cGRhdGVkQXQ6IERhdGUubm93KCksXG4gICAgICAgIGhhc2gsXG4gICAgICB9O1xuXG4gICAgICB0aGlzLm1ldGFkYXRhU3RvcmUudXBzZXJ0Tm90ZShub3RlTWV0YWRhdGEpO1xuXG4gICAgICAvLyBcdUFFMzBcdUM4NzQgXHVDQ0FEXHVEMDZDIFx1QzBBRFx1QzgxQ1xuICAgICAgaWYgKGV4aXN0aW5nTm90ZSkge1xuICAgICAgICBjb25zdCBvbGRDaHVua3MgPSB0aGlzLm1ldGFkYXRhU3RvcmUuZ2V0Q2h1bmtzQnlOb3RlSWQobm90ZUlkKTtcbiAgICAgICAgdGhpcy52ZWN0b3JTdG9yZS5kZWxldGVFbWJlZGRpbmdzKG9sZENodW5rcy5tYXAoKGMpID0+IGMuaWQpKTtcbiAgICAgICAgdGhpcy5tZXRhZGF0YVN0b3JlLmRlbGV0ZUNodW5rc0J5Tm90ZUlkKG5vdGVJZCk7XG4gICAgICB9XG5cbiAgICAgIC8vIFx1Q0NBRFx1RDBCOVxuICAgICAgY29uc3QgY2h1bmtzID0gY2h1bmtUZXh0KG5vdGVJZCwgcGFyc2VkLnNlY3Rpb25zLCB7XG4gICAgICAgIGNodW5rU2l6ZTogdGhpcy5jb25maWcuY2h1bmtTaXplLFxuICAgICAgICBjaHVua092ZXJsYXA6IHRoaXMuY29uZmlnLmNodW5rT3ZlcmxhcCxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoY2h1bmtzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjb25zb2xlLmxvZyhgXHVDQ0FEXHVEMDZDIFx1QzVDNlx1Qzc0QzogJHtmaWxlUGF0aH1gKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBcdUNDQURcdUQwNkMgXHVDODAwXHVDN0E1XG4gICAgICB0aGlzLm1ldGFkYXRhU3RvcmUuaW5zZXJ0Q2h1bmtzKGNodW5rcyk7XG5cbiAgICAgIC8vIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUMwRERcdUMxMzEgXHVCQzBGIFx1QzgwMFx1QzdBNVxuICAgICAgY29uc29sZS5sb2coYFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUMwRERcdUMxMzEgXHVDOTExOiAke2ZpbGVQYXRofSAoJHtjaHVua3MubGVuZ3RofVx1QUMxQyBcdUNDQURcdUQwNkMpYCk7XG4gICAgICBmb3IgKGNvbnN0IGNodW5rIG9mIGNodW5rcykge1xuICAgICAgICBjb25zdCBlbWJlZGRpbmcgPSBhd2FpdCB0aGlzLmVtYmVkZGluZ0dlbmVyYXRvci5lbWJlZChjaHVuay50ZXh0KTtcbiAgICAgICAgdGhpcy52ZWN0b3JTdG9yZS5zdG9yZUVtYmVkZGluZyhjaHVuay5pZCwgZW1iZWRkaW5nKTtcbiAgICAgIH1cblxuICAgICAgY29uc29sZS5sb2coYFx1Qzc3OFx1QjM3MVx1QzJGMSBcdUM2NDRcdUI4Q0M6ICR7ZmlsZVBhdGh9YCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYFx1Qzc3OFx1QjM3MVx1QzJGMSBcdUMyRTRcdUQzMjg6ICR7ZmlsZVBhdGh9YCwgZXJyb3IpO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFx1RDMwQ1x1Qzc3QyBcdUMwQURcdUM4MUMgXHVDQzk4XHVCOUFDXG4gICAqL1xuICBkZWxldGVGaWxlKGZpbGVQYXRoOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBub3RlID0gdGhpcy5tZXRhZGF0YVN0b3JlLmdldE5vdGVCeVBhdGgoZmlsZVBhdGgpO1xuICAgIGlmICghbm90ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGNodW5rcyA9IHRoaXMubWV0YWRhdGFTdG9yZS5nZXRDaHVua3NCeU5vdGVJZChub3RlLmlkKTtcbiAgICB0aGlzLnZlY3RvclN0b3JlLmRlbGV0ZUVtYmVkZGluZ3MoY2h1bmtzLm1hcCgoYykgPT4gYy5pZCkpO1xuICAgIHRoaXMubWV0YWRhdGFTdG9yZS5kZWxldGVDaHVua3NCeU5vdGVJZChub3RlLmlkKTtcbiAgICB0aGlzLm1ldGFkYXRhU3RvcmUuZGVsZXRlTm90ZShub3RlLmlkKTtcblxuICAgIGNvbnNvbGUubG9nKGBcdUQzMENcdUM3N0MgXHVDMEFEXHVDODFDIFx1QzY0NFx1QjhDQzogJHtmaWxlUGF0aH1gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUFDODBcdUMwQzlcbiAgICovXG4gIGFzeW5jIHNlYXJjaChxdWVyeTogc3RyaW5nLCBrPzogbnVtYmVyKTogUHJvbWlzZTxBcnJheTx7IGNodW5rOiBDaHVuazsgc2NvcmU6IG51bWJlciB9Pj4ge1xuICAgIGNvbnN0IHRvcEsgPSBrIHx8IHRoaXMuY29uZmlnLnRvcEs7XG5cbiAgICAvLyBcdUNGRkNcdUI5QUMgXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzBERFx1QzEzMVxuICAgIGNvbnN0IHF1ZXJ5RW1iZWRkaW5nID0gYXdhaXQgdGhpcy5lbWJlZGRpbmdHZW5lcmF0b3IuZW1iZWQocXVlcnkpO1xuXG4gICAgY29uc3QgY3VycmVudERpbWVuc2lvbiA9IHRoaXMudmVjdG9yU3RvcmUuZ2V0RGltZW5zaW9uKCk7XG4gICAgaWYgKGN1cnJlbnREaW1lbnNpb24gIT09IG51bGwgJiYgcXVlcnlFbWJlZGRpbmcubGVuZ3RoICE9PSBjdXJyZW50RGltZW5zaW9uKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGBcdUNGRkNcdUI5QUMgXHVDQzI4XHVDNkQwKCR7cXVlcnlFbWJlZGRpbmcubGVuZ3RofSlcdUFDRkMgXHVDNzc4XHVCMzcxXHVDMkE0IFx1Q0MyOFx1QzZEMCgke2N1cnJlbnREaW1lbnNpb259KVx1Qzc3NCBcdUIyRUNcdUI3N0MgXHVBQzgwXHVDMEM5XHVDNzQ0IFx1QUM3NFx1QjEwOFx1QjcwMVx1QjJDOFx1QjJFNC5gXG4gICAgICApO1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIC8vIFx1QkNBMVx1RDEzMCBcdUFDODBcdUMwQzlcbiAgICBjb25zdCByZXN1bHRzID0gdGhpcy52ZWN0b3JTdG9yZS5zZWFyY2gocXVlcnlFbWJlZGRpbmcsIHRvcEspO1xuXG4gICAgLy8gXHVDQ0FEXHVEMDZDIFx1QzgxNVx1QkNGNCBcdUNEOTRcdUFDMDBcbiAgICBjb25zdCBzZWFyY2hSZXN1bHRzID0gcmVzdWx0c1xuICAgICAgLm1hcCgocmVzdWx0KSA9PiB7XG4gICAgICAgIGNvbnN0IGNodW5rID0gdGhpcy5tZXRhZGF0YVN0b3JlLmdldENodW5rQnlJZChyZXN1bHQuY2h1bmtJZCk7XG4gICAgICAgIGlmICghY2h1bmspIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGNodW5rLFxuICAgICAgICAgIHNjb3JlOiByZXN1bHQuc2NvcmUsXG4gICAgICAgIH07XG4gICAgICB9KVxuICAgICAgLmZpbHRlcigocikgPT4gciAhPT0gbnVsbCkgYXMgQXJyYXk8eyBjaHVuazogQ2h1bms7IHNjb3JlOiBudW1iZXIgfT47XG5cbiAgICByZXR1cm4gc2VhcmNoUmVzdWx0cztcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUFDODBcdUMwQzkgXHVBQ0IwXHVBQ0ZDXHVDNUQwIFx1QjE3OFx1RDJCOCBcdUJBNTRcdUQwQzBcdUIzNzBcdUM3NzRcdUQxMzAgXHVDRDk0XHVBQzAwXG4gICAqL1xuICBnZXRTZWFyY2hSZXN1bHRzV2l0aE1ldGFkYXRhKFxuICAgIHNlYXJjaFJlc3VsdHM6IEFycmF5PHsgY2h1bms6IENodW5rOyBzY29yZTogbnVtYmVyIH0+XG4gICk6IEFycmF5PHtcbiAgICBjaHVuazogQ2h1bms7XG4gICAgbm90ZTogTm90ZU1ldGFkYXRhO1xuICAgIHNjb3JlOiBudW1iZXI7XG4gIH0+IHtcbiAgICByZXR1cm4gc2VhcmNoUmVzdWx0c1xuICAgICAgLm1hcCgocmVzdWx0KSA9PiB7XG4gICAgICAgIGNvbnN0IG5vdGUgPSB0aGlzLm1ldGFkYXRhU3RvcmUuZ2V0Tm90ZUJ5SWQocmVzdWx0LmNodW5rLm5vdGVJZCk7XG4gICAgICAgIGlmICghbm90ZSkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgY2h1bms6IHJlc3VsdC5jaHVuayxcbiAgICAgICAgICBub3RlLFxuICAgICAgICAgIHNjb3JlOiByZXN1bHQuc2NvcmUsXG4gICAgICAgIH07XG4gICAgICB9KVxuICAgICAgLmZpbHRlcigocikgPT4gciAhPT0gbnVsbCkgYXMgQXJyYXk8e1xuICAgICAgY2h1bms6IENodW5rO1xuICAgICAgbm90ZTogTm90ZU1ldGFkYXRhO1xuICAgICAgc2NvcmU6IG51bWJlcjtcbiAgICB9PjtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUIxNzhcdUQyQjggSUQgXHVDMEREXHVDMTMxXG4gICAqL1xuICBwcml2YXRlIGdlbmVyYXRlTm90ZUlkKGZpbGVQYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBjcmVhdGVIYXNoKFwic2hhMjU2XCIpLnVwZGF0ZShmaWxlUGF0aCkuZGlnZXN0KFwiaGV4XCIpLnN1YnN0cmluZygwLCAxNik7XG4gIH1cblxuICAvKipcbiAgICogXHVDNzc4XHVCMzcxXHVDMkE0IFx1QzJEQ1x1QURGOFx1QjJDOFx1Q0M5OCBcdUMwRERcdUMxMzFcbiAgICovXG4gIHByaXZhdGUgZ2VuZXJhdGVJbmRleFNpZ25hdHVyZSgpOiBzdHJpbmcge1xuICAgIGNvbnN0IHNvdXJjZSA9IFtcbiAgICAgIHRoaXMuY29uZmlnLmVtYmVkZGluZ1Byb3ZpZGVyLFxuICAgICAgdGhpcy5jb25maWcuZW1iZWRkaW5nTW9kZWwsXG4gICAgICB0aGlzLmNvbmZpZy5lbWJlZGRpbmdBcGlVcmwgfHwgXCJcIixcbiAgICBdLmpvaW4oXCI6OlwiKTtcblxuICAgIHJldHVybiBjcmVhdGVIYXNoKFwic2hhMjU2XCIpLnVwZGF0ZShzb3VyY2UpLmRpZ2VzdChcImhleFwiKS5zdWJzdHJpbmcoMCwgMTYpO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1QjlBQ1x1QzE4Q1x1QzJBNCBcdUQ1NzRcdUM4MUNcbiAgICovXG4gIGNsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMubWV0YWRhdGFTdG9yZS5jbG9zZSgpO1xuICAgIHRoaXMudmVjdG9yU3RvcmUuY2xvc2UoKTtcbiAgfVxufVxuIiwgIi8vIE9ic2lkaWFuIFx1QkNGQ1x1RDJCOCBcdUQzMENcdUM3N0MgXHVCQ0MwXHVBQ0JEIFx1QUMxMFx1QzlDMCBcdUJDMEYgXHVDNzkwXHVCM0Q5IFx1Qzc3OFx1QjM3MVx1QzJGMVxuXG5pbXBvcnQgeyBURmlsZSwgVmF1bHQsIE5vdGljZSB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHsgSW5kZXhlciB9IGZyb20gXCIuL2luZGV4aW5nL2luZGV4ZXJcIjtcblxuZXhwb3J0IGNsYXNzIFZhdWx0V2F0Y2hlciB7XG4gIHByaXZhdGUgdmF1bHQ6IFZhdWx0O1xuICBwcml2YXRlIGluZGV4ZXI6IEluZGV4ZXIgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBpc0luZGV4aW5nOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgaW5kZXhRdWV1ZTogU2V0PHN0cmluZz4gPSBuZXcgU2V0KCk7XG4gIHByaXZhdGUgaW5kZXhpbmdJblByb2dyZXNzOiBTZXQ8c3RyaW5nPiA9IG5ldyBTZXQoKTsgLy8gXHVDOUM0XHVENTg5IFx1QzkxMVx1Qzc3OCBcdUM3NzhcdUIzNzFcdUMyRjEgXHVDRDk0XHVDODAxXG5cbiAgY29uc3RydWN0b3IodmF1bHQ6IFZhdWx0KSB7XG4gICAgdGhpcy52YXVsdCA9IHZhdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFx1Qzc3OFx1QjM3MVx1QzExQyBcdUMxMjRcdUM4MTVcbiAgICovXG4gIHNldEluZGV4ZXIoaW5kZXhlcjogSW5kZXhlciB8IG51bGwpOiB2b2lkIHtcbiAgICB0aGlzLmluZGV4ZXIgPSBpbmRleGVyO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1Q0QwOFx1QUUzMCBcdUM3NzhcdUIzNzFcdUMyRjEgXHVDMkU0XHVENTg5XG4gICAqL1xuICBhc3luYyBpbmRleFZhdWx0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICghdGhpcy5pbmRleGVyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJcdUM3NzhcdUIzNzFcdUMxMUNcdUFDMDAgXHVDRDA4XHVBRTMwXHVENjU0XHVCNDE4XHVDOUMwIFx1QzU0QVx1QzU1OFx1QzJCNVx1QjJDOFx1QjJFNFwiKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0luZGV4aW5nKSB7XG4gICAgICBuZXcgTm90aWNlKFwiXHVDNzc0XHVCQkY4IFx1Qzc3OFx1QjM3MVx1QzJGMVx1Qzc3NCBcdUM5QzRcdUQ1ODkgXHVDOTExXHVDNzg1XHVCMkM4XHVCMkU0XCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuaXNJbmRleGluZyA9IHRydWU7XG4gICAgbmV3IE5vdGljZShcIlx1QkNGQ1x1RDJCOCBcdUM3NzhcdUIzNzFcdUMyRjFcdUM3NDQgXHVDMkRDXHVDNzkxXHVENTY5XHVCMkM4XHVCMkU0Li4uXCIpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG1kRmlsZXMgPSB0aGlzLnZhdWx0LmdldE1hcmtkb3duRmlsZXMoKTtcbiAgICAgIGNvbnNvbGUubG9nKGBcdUM3NzhcdUIzNzFcdUMyRjFcdUQ1NjAgXHVEMzBDXHVDNzdDIFx1QzIxODogJHttZEZpbGVzLmxlbmd0aH1gKTtcblxuICAgICAgbGV0IGluZGV4ZWQgPSAwO1xuICAgICAgbGV0IGZhaWxlZCA9IDA7XG5cbiAgICAgIGZvciAoY29uc3QgZmlsZSBvZiBtZEZpbGVzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IHRoaXMudmF1bHQucmVhZChmaWxlKTtcbiAgICAgICAgICBhd2FpdCB0aGlzLmluZGV4ZXIuaW5kZXhGaWxlKGZpbGUucGF0aCwgY29udGVudCk7XG4gICAgICAgICAgaW5kZXhlZCsrO1xuXG4gICAgICAgICAgLy8gXHVDOUM0XHVENTg5IFx1QzBDMVx1RDY2OSBcdUQ0NUNcdUMyREMgKDEwXHVBQzFDXHVCOUM4XHVCMkU0KVxuICAgICAgICAgIGlmIChpbmRleGVkICUgMTAgPT09IDApIHtcbiAgICAgICAgICAgIG5ldyBOb3RpY2UoYFx1Qzc3OFx1QjM3MVx1QzJGMSBcdUM5QzRcdUQ1ODkgXHVDOTExOiAke2luZGV4ZWR9LyR7bWRGaWxlcy5sZW5ndGh9YCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFx1RDMwQ1x1Qzc3QyBcdUM3NzhcdUIzNzFcdUMyRjEgXHVDMkU0XHVEMzI4OiAke2ZpbGUucGF0aH1gLCBlcnJvcik7XG4gICAgICAgICAgZmFpbGVkKys7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbmV3IE5vdGljZShgXHVDNzc4XHVCMzcxXHVDMkYxIFx1QzY0NFx1QjhDQzogJHtpbmRleGVkfVx1QUMxQyBcdUMxMzFcdUFDRjUsICR7ZmFpbGVkfVx1QUMxQyBcdUMyRTRcdUQzMjhgKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIlx1QkNGQ1x1RDJCOCBcdUM3NzhcdUIzNzFcdUMyRjEgXHVDOTExIFx1QzYyNFx1Qjk1ODpcIiwgZXJyb3IpO1xuICAgICAgbmV3IE5vdGljZShcIlx1Qzc3OFx1QjM3MVx1QzJGMSBcdUM5MTEgXHVDNjI0XHVCOTU4XHVBQzAwIFx1QkMxQ1x1QzBERFx1RDU4OFx1QzJCNVx1QjJDOFx1QjJFNFwiKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdGhpcy5pc0luZGV4aW5nID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFx1RDMwQ1x1Qzc3QyBcdUMwRERcdUMxMzEgXHVDNzc0XHVCQ0E0XHVEMkI4IFx1Q0M5OFx1QjlBQ1xuICAgKi9cbiAgYXN5bmMgb25GaWxlQ3JlYXRlKGZpbGU6IFRGaWxlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCF0aGlzLmluZGV4ZXIgfHwgZmlsZS5leHRlbnNpb24gIT09IFwibWRcIikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgdGhpcy52YXVsdC5yZWFkKGZpbGUpO1xuICAgICAgYXdhaXQgdGhpcy5pbmRleGVyLmluZGV4RmlsZShmaWxlLnBhdGgsIGNvbnRlbnQpO1xuICAgICAgY29uc29sZS5sb2coYFx1RDMwQ1x1Qzc3QyBcdUMwRERcdUMxMzEgXHVDNzc4XHVCMzcxXHVDMkYxOiAke2ZpbGUucGF0aH1gKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihgXHVEMzBDXHVDNzdDIFx1QzBERFx1QzEzMSBcdUM3NzhcdUIzNzFcdUMyRjEgXHVDMkU0XHVEMzI4OiAke2ZpbGUucGF0aH1gLCBlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFx1RDMwQ1x1Qzc3QyBcdUMyMThcdUM4MTUgXHVDNzc0XHVCQ0E0XHVEMkI4IFx1Q0M5OFx1QjlBQ1xuICAgKi9cbiAgYXN5bmMgb25GaWxlTW9kaWZ5KGZpbGU6IFRGaWxlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCF0aGlzLmluZGV4ZXIgfHwgZmlsZS5leHRlbnNpb24gIT09IFwibWRcIikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFx1QzkxMVx1QkNGNSBcdUM3NzhcdUIzNzFcdUMyRjEgXHVCQzI5XHVDOUMwXHVCOTdDIFx1QzcwNFx1RDU3NCBcdUQwNTBcdUM1RDAgXHVDRDk0XHVBQzAwXG4gICAgdGhpcy5pbmRleFF1ZXVlLmFkZChmaWxlLnBhdGgpO1xuXG4gICAgLy8gMTAwbXMgXHVENkM0XHVDNUQwIFx1Qzc3OFx1QjM3MVx1QzJGMSAoXHVDNUYwXHVDMThEIFx1QzIxOFx1QzgxNSBcdUJDMjlcdUM5QzApXG4gICAgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5pbmRleFF1ZXVlLmhhcyhmaWxlLnBhdGgpICYmICF0aGlzLmluZGV4aW5nSW5Qcm9ncmVzcy5oYXMoZmlsZS5wYXRoKSkge1xuICAgICAgICB0aGlzLmluZGV4UXVldWUuZGVsZXRlKGZpbGUucGF0aCk7XG4gICAgICAgIHRoaXMuaW5kZXhpbmdJblByb2dyZXNzLmFkZChmaWxlLnBhdGgpO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IHRoaXMudmF1bHQucmVhZChmaWxlKTtcbiAgICAgICAgICBpZiAodGhpcy5pbmRleGVyKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmluZGV4ZXIuaW5kZXhGaWxlKGZpbGUucGF0aCwgY29udGVudCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnNvbGUubG9nKGBcdUQzMENcdUM3N0MgXHVDMjE4XHVDODE1IFx1Qzc3OFx1QjM3MVx1QzJGMTogJHtmaWxlLnBhdGh9YCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihgXHVEMzBDXHVDNzdDIFx1QzIxOFx1QzgxNSBcdUM3NzhcdUIzNzFcdUMyRjEgXHVDMkU0XHVEMzI4OiAke2ZpbGUucGF0aH1gLCBlcnJvcik7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgdGhpcy5pbmRleGluZ0luUHJvZ3Jlc3MuZGVsZXRlKGZpbGUucGF0aCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCAxMDApO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1RDMwQ1x1Qzc3QyBcdUMwQURcdUM4MUMgXHVDNzc0XHVCQ0E0XHVEMkI4IFx1Q0M5OFx1QjlBQ1xuICAgKi9cbiAgb25GaWxlRGVsZXRlKGZpbGU6IFRGaWxlKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmluZGV4ZXIgfHwgZmlsZS5leHRlbnNpb24gIT09IFwibWRcIikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICB0aGlzLmluZGV4ZXIuZGVsZXRlRmlsZShmaWxlLnBhdGgpO1xuICAgICAgY29uc29sZS5sb2coYFx1RDMwQ1x1Qzc3QyBcdUMwQURcdUM4MUMgXHVDQzk4XHVCOUFDOiAke2ZpbGUucGF0aH1gKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihgXHVEMzBDXHVDNzdDIFx1QzBBRFx1QzgxQyBcdUNDOThcdUI5QUMgXHVDMkU0XHVEMzI4OiAke2ZpbGUucGF0aH1gLCBlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFx1RDMwQ1x1Qzc3QyBcdUM3NzRcdUI5ODQgXHVCQ0MwXHVBQ0JEIFx1Qzc3NFx1QkNBNFx1RDJCOCBcdUNDOThcdUI5QUNcbiAgICovXG4gIGFzeW5jIG9uRmlsZVJlbmFtZShmaWxlOiBURmlsZSwgb2xkUGF0aDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCF0aGlzLmluZGV4ZXIgfHwgZmlsZS5leHRlbnNpb24gIT09IFwibWRcIikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAvLyBcdUM3NzRcdUM4MDQgXHVEMzBDXHVDNzdDIFx1QzBBRFx1QzgxQ1xuICAgICAgdGhpcy5pbmRleGVyLmRlbGV0ZUZpbGUob2xkUGF0aCk7XG5cbiAgICAgIC8vIFx1QzBDOCBcdUQzMENcdUM3N0MgXHVDNzc4XHVCMzcxXHVDMkYxXG4gICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgdGhpcy52YXVsdC5yZWFkKGZpbGUpO1xuICAgICAgaWYgKHRoaXMuaW5kZXhlcikge1xuICAgICAgICBhd2FpdCB0aGlzLmluZGV4ZXIuaW5kZXhGaWxlKGZpbGUucGF0aCwgY29udGVudCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnNvbGUubG9nKGBcdUQzMENcdUM3N0MgXHVDNzc0XHVCOTg0IFx1QkNDMFx1QUNCRCBcdUNDOThcdUI5QUM6ICR7b2xkUGF0aH0gLT4gJHtmaWxlLnBhdGh9YCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYFx1RDMwQ1x1Qzc3QyBcdUM3NzRcdUI5ODQgXHVCQ0MwXHVBQ0JEIFx1Q0M5OFx1QjlBQyBcdUMyRTRcdUQzMjg6ICR7b2xkUGF0aH0gLT4gJHtmaWxlLnBhdGh9YCwgZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQSxrQ0FBQUEsVUFBQUMsU0FBQTtBQUFBLFFBQUksV0FBVyxPQUFP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QUEsSUFBSztBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQU07QUFBQSxJQUFNO0FBQUEsSUFDOUQ7QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQU07QUFBQSxJQUFNO0FBQUEsSUFBTTtBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQUs7QUFBQSxJQUFNO0FBQUEsSUFBTTtBQUFBLElBQUs7QUFBQSxJQUNqRTtBQUFBLElBQU07QUFBQSxJQUFNO0FBQUEsSUFBTTtBQUFBLElBQU07QUFBQSxJQUFNO0FBQUEsSUFBTTtBQUFBLElBQU07QUFBQSxJQUMxQztBQUFBLElBQU07QUFBQSxJQUFNO0FBQUEsSUFBTTtBQUFBLElBQU07QUFBQSxJQUFNO0FBQUEsSUFBTTtBQUFBLElBQUs7QUFBQSxJQUFNO0FBQUEsSUFDL0M7QUFBQSxJQUFLO0FBQUEsSUFBTTtBQUFBLElBQUs7QUFBQSxJQUFPO0FBQUEsSUFBTztBQUFBLElBQzlCO0FBQUEsSUFBTztBQUFBLElBQU87QUFBQSxJQUFPO0FBQUEsSUFBTTtBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFDckM7QUFBQSxJQUFNO0FBQUEsSUFBTTtBQUFBLElBQU07QUFBQSxJQUFNO0FBQUEsSUFBTTtBQUFBLElBQU07QUFBQSxJQUNwQztBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsRUFDM0IsQ0FBQztBQUVELFFBQU0sV0FBVyxNQUFNLE9BQU8sVUFBUSxDQUFDLFVBQVUsSUFBSSxJQUFJLEtBQUssS0FBSyxVQUFVLENBQUM7QUFHOUUsUUFBTSxZQUFZLG9CQUFJLElBQW9CO0FBQzFDLGFBQVcsUUFBUSxVQUFVO0FBQzNCLGNBQVUsSUFBSSxPQUFPLFVBQVUsSUFBSSxJQUFJLEtBQUssS0FBSyxDQUFDO0FBQUEsRUFDcEQ7QUFHQSxRQUFNLFNBQVMsTUFBTSxLQUFLLFVBQVUsUUFBUSxDQUFDLEVBQzFDLEtB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LCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgIm9wdGlvbnMiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAib3B0aW9ucyIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJvcHRpb25zIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgIm9wdGlvbnMiLCAic3RyIiwgInN0cmluZyIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJyZXF1aXJlX2pzX3lhbWwiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAieWFtbCIsICJvcHRpb25zIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgInN0ciIsICJleHBvcnRzIiwgInN0ciIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJlbmdpbmVzIiwgIm9wdGlvbnMiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAib3B0aW9ucyIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJvcHRpb25zIiwgInN0ciIsICJtYXR0ZXIiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAib3B0aW9ucyIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJvcHRpb25zIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgInN0ciIsICJvcHRpb25zIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImVuZ2luZXMiLCAicGFyc2UiLCAibWF0dGVyIiwgIm9wdGlvbnMiLCAic3RyIiwgImltcG9ydF9vYnNpZGlhbiIsICJpbXBvcnRfb2JzaWRpYW4iLCAib3B0aW9ucyIsICJ0ZXh0IiwgIl9hIiwgImltcG9ydF9vYnNpZGlhbiIsICJpbXBvcnRfb2JzaWRpYW4iLCAiaW1wb3J0X29ic2lkaWFuIiwgIm9wdGlvbnMiLCAiX2EiLCAiaW1wb3J0X29ic2lkaWFuIiwgIlNjaGVtYVR5cGUiLCAiRXhlY3V0YWJsZUNvZGVMYW5ndWFnZSIsICJPdXRjb21lIiwgIkhhcm1DYXRlZ29yeSIsICJIYXJtQmxvY2tUaHJlc2hvbGQiLCAiSGFybVByb2JhYmlsaXR5IiwgIkJsb2NrUmVhc29uIiwgIkZpbmlzaFJlYXNvbiIsICJUYXNrVHlwZSIsICJGdW5jdGlvbkNhbGxpbmdNb2RlIiwgIkR5bmFtaWNSZXRyaWV2YWxNb2RlIiwgIlRhc2siLCAiX2EiLCAiaW1wb3J0X29ic2lkaWFuIiwgImVuc3VyZUZvbGRlckV4aXN0cyIsICJlbnN1cmVVbmlxdWVQYXRoIiwgImltcG9ydF9mcyIsICJpbXBvcnRfcGF0aCIsICJpbXBvcnRfb2JzaWRpYW4iLCAiRW1iZWRkaW5nR2VuZXJhdG9yIiwgIm1vZHVsZSIsICJtYXR0ZXIiLCAib3B0aW9ucyIsICJjaHVua1RleHQiLCAiaW1wb3J0X2NyeXB0byIsICJFbWJlZGRpbmdHZW5lcmF0b3IiLCAiaW1wb3J0X29ic2lkaWFuIiwgImluZGV4ZXIiLCAiaW1wb3J0X3BhdGgiLCAiaW5kZXhlciJdCn0K
