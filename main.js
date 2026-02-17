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

// node_modules/better-sqlite3/lib/util.js
var require_util = __commonJS({
  "node_modules/better-sqlite3/lib/util.js"(exports2) {
    "use strict";
    exports2.getBooleanOption = (options2, key) => {
      let value = false;
      if (key in options2 && typeof (value = options2[key]) !== "boolean") {
        throw new TypeError(`Expected the "${key}" option to be a boolean`);
      }
      return value;
    };
    exports2.cppdb = Symbol();
    exports2.inspect = Symbol.for("nodejs.util.inspect.custom");
  }
});

// node_modules/better-sqlite3/lib/sqlite-error.js
var require_sqlite_error = __commonJS({
  "node_modules/better-sqlite3/lib/sqlite-error.js"(exports2, module2) {
    "use strict";
    var descriptor = { value: "SqliteError", writable: true, enumerable: false, configurable: true };
    function SqliteError(message, code) {
      if (new.target !== SqliteError) {
        return new SqliteError(message, code);
      }
      if (typeof code !== "string") {
        throw new TypeError("Expected second argument to be a string");
      }
      Error.call(this, message);
      descriptor.value = "" + message;
      Object.defineProperty(this, "message", descriptor);
      Error.captureStackTrace(this, SqliteError);
      this.code = code;
    }
    Object.setPrototypeOf(SqliteError, Error);
    Object.setPrototypeOf(SqliteError.prototype, Error.prototype);
    Object.defineProperty(SqliteError.prototype, "name", descriptor);
    module2.exports = SqliteError;
  }
});

// node_modules/file-uri-to-path/index.js
var require_file_uri_to_path = __commonJS({
  "node_modules/file-uri-to-path/index.js"(exports2, module2) {
    var sep = require("path").sep || "/";
    module2.exports = fileUriToPath;
    function fileUriToPath(uri) {
      if ("string" != typeof uri || uri.length <= 7 || "file://" != uri.substring(0, 7)) {
        throw new TypeError("must pass in a file:// URI to convert to a file path");
      }
      var rest = decodeURI(uri.substring(7));
      var firstSlash = rest.indexOf("/");
      var host = rest.substring(0, firstSlash);
      var path = rest.substring(firstSlash + 1);
      if ("localhost" == host) host = "";
      if (host) {
        host = sep + sep + host;
      }
      path = path.replace(/^(.+)\|/, "$1:");
      if (sep == "\\") {
        path = path.replace(/\//g, "\\");
      }
      if (/^.+\:/.test(path)) {
      } else {
        path = sep + path;
      }
      return host + path;
    }
  }
});

// node_modules/bindings/bindings.js
var require_bindings = __commonJS({
  "node_modules/bindings/bindings.js"(exports2, module2) {
    var fs = require("fs");
    var path = require("path");
    var fileURLToPath = require_file_uri_to_path();
    var join2 = path.join;
    var dirname = path.dirname;
    var exists = fs.accessSync && function(path2) {
      try {
        fs.accessSync(path2);
      } catch (e) {
        return false;
      }
      return true;
    } || fs.existsSync || path.existsSync;
    var defaults = {
      arrow: process.env.NODE_BINDINGS_ARROW || " \u2192 ",
      compiled: process.env.NODE_BINDINGS_COMPILED_DIR || "compiled",
      platform: process.platform,
      arch: process.arch,
      nodePreGyp: "node-v" + process.versions.modules + "-" + process.platform + "-" + process.arch,
      version: process.versions.node,
      bindings: "bindings.node",
      try: [
        // node-gyp's linked version in the "build" dir
        ["module_root", "build", "bindings"],
        // node-waf and gyp_addon (a.k.a node-gyp)
        ["module_root", "build", "Debug", "bindings"],
        ["module_root", "build", "Release", "bindings"],
        // Debug files, for development (legacy behavior, remove for node v0.9)
        ["module_root", "out", "Debug", "bindings"],
        ["module_root", "Debug", "bindings"],
        // Release files, but manually compiled (legacy behavior, remove for node v0.9)
        ["module_root", "out", "Release", "bindings"],
        ["module_root", "Release", "bindings"],
        // Legacy from node-waf, node <= 0.4.x
        ["module_root", "build", "default", "bindings"],
        // Production "Release" buildtype binary (meh...)
        ["module_root", "compiled", "version", "platform", "arch", "bindings"],
        // node-qbs builds
        ["module_root", "addon-build", "release", "install-root", "bindings"],
        ["module_root", "addon-build", "debug", "install-root", "bindings"],
        ["module_root", "addon-build", "default", "install-root", "bindings"],
        // node-pre-gyp path ./lib/binding/{node_abi}-{platform}-{arch}
        ["module_root", "lib", "binding", "nodePreGyp", "bindings"]
      ]
    };
    function bindings(opts) {
      if (typeof opts == "string") {
        opts = { bindings: opts };
      } else if (!opts) {
        opts = {};
      }
      Object.keys(defaults).map(function(i2) {
        if (!(i2 in opts)) opts[i2] = defaults[i2];
      });
      if (!opts.module_root) {
        opts.module_root = exports2.getRoot(exports2.getFileName());
      }
      if (path.extname(opts.bindings) != ".node") {
        opts.bindings += ".node";
      }
      var requireFunc = typeof __webpack_require__ === "function" ? __non_webpack_require__ : require;
      var tries = [], i = 0, l = opts.try.length, n, b, err;
      for (; i < l; i++) {
        n = join2.apply(
          null,
          opts.try[i].map(function(p) {
            return opts[p] || p;
          })
        );
        tries.push(n);
        try {
          b = opts.path ? requireFunc.resolve(n) : requireFunc(n);
          if (!opts.path) {
            b.path = n;
          }
          return b;
        } catch (e) {
          if (e.code !== "MODULE_NOT_FOUND" && e.code !== "QUALIFIED_PATH_RESOLUTION_FAILED" && !/not find/i.test(e.message)) {
            throw e;
          }
        }
      }
      err = new Error(
        "Could not locate the bindings file. Tried:\n" + tries.map(function(a) {
          return opts.arrow + a;
        }).join("\n")
      );
      err.tries = tries;
      throw err;
    }
    module2.exports = exports2 = bindings;
    exports2.getFileName = function getFileName(calling_file) {
      var origPST = Error.prepareStackTrace, origSTL = Error.stackTraceLimit, dummy = {}, fileName;
      Error.stackTraceLimit = 10;
      Error.prepareStackTrace = function(e, st) {
        for (var i = 0, l = st.length; i < l; i++) {
          fileName = st[i].getFileName();
          if (fileName !== __filename) {
            if (calling_file) {
              if (fileName !== calling_file) {
                return;
              }
            } else {
              return;
            }
          }
        }
      };
      Error.captureStackTrace(dummy);
      dummy.stack;
      Error.prepareStackTrace = origPST;
      Error.stackTraceLimit = origSTL;
      var fileSchema = "file://";
      if (fileName.indexOf(fileSchema) === 0) {
        fileName = fileURLToPath(fileName);
      }
      return fileName;
    };
    exports2.getRoot = function getRoot(file) {
      var dir = dirname(file), prev;
      while (true) {
        if (dir === ".") {
          dir = process.cwd();
        }
        if (exists(join2(dir, "package.json")) || exists(join2(dir, "node_modules"))) {
          return dir;
        }
        if (prev === dir) {
          throw new Error(
            'Could not find module root given file: "' + file + '". Do you have a `package.json` file? '
          );
        }
        prev = dir;
        dir = join2(dir, "..");
      }
    };
  }
});

// node_modules/better-sqlite3/lib/methods/wrappers.js
var require_wrappers = __commonJS({
  "node_modules/better-sqlite3/lib/methods/wrappers.js"(exports2) {
    "use strict";
    var { cppdb } = require_util();
    exports2.prepare = function prepare(sql) {
      return this[cppdb].prepare(sql, this, false);
    };
    exports2.exec = function exec(sql) {
      this[cppdb].exec(sql);
      return this;
    };
    exports2.close = function close() {
      this[cppdb].close();
      return this;
    };
    exports2.loadExtension = function loadExtension(...args) {
      this[cppdb].loadExtension(...args);
      return this;
    };
    exports2.defaultSafeIntegers = function defaultSafeIntegers(...args) {
      this[cppdb].defaultSafeIntegers(...args);
      return this;
    };
    exports2.unsafeMode = function unsafeMode(...args) {
      this[cppdb].unsafeMode(...args);
      return this;
    };
    exports2.getters = {
      name: {
        get: function name() {
          return this[cppdb].name;
        },
        enumerable: true
      },
      open: {
        get: function open() {
          return this[cppdb].open;
        },
        enumerable: true
      },
      inTransaction: {
        get: function inTransaction() {
          return this[cppdb].inTransaction;
        },
        enumerable: true
      },
      readonly: {
        get: function readonly() {
          return this[cppdb].readonly;
        },
        enumerable: true
      },
      memory: {
        get: function memory() {
          return this[cppdb].memory;
        },
        enumerable: true
      }
    };
  }
});

// node_modules/better-sqlite3/lib/methods/transaction.js
var require_transaction = __commonJS({
  "node_modules/better-sqlite3/lib/methods/transaction.js"(exports2, module2) {
    "use strict";
    var { cppdb } = require_util();
    var controllers = /* @__PURE__ */ new WeakMap();
    module2.exports = function transaction(fn) {
      if (typeof fn !== "function") throw new TypeError("Expected first argument to be a function");
      const db = this[cppdb];
      const controller = getController(db, this);
      const { apply } = Function.prototype;
      const properties = {
        default: { value: wrapTransaction(apply, fn, db, controller.default) },
        deferred: { value: wrapTransaction(apply, fn, db, controller.deferred) },
        immediate: { value: wrapTransaction(apply, fn, db, controller.immediate) },
        exclusive: { value: wrapTransaction(apply, fn, db, controller.exclusive) },
        database: { value: this, enumerable: true }
      };
      Object.defineProperties(properties.default.value, properties);
      Object.defineProperties(properties.deferred.value, properties);
      Object.defineProperties(properties.immediate.value, properties);
      Object.defineProperties(properties.exclusive.value, properties);
      return properties.default.value;
    };
    var getController = (db, self) => {
      let controller = controllers.get(db);
      if (!controller) {
        const shared = {
          commit: db.prepare("COMMIT", self, false),
          rollback: db.prepare("ROLLBACK", self, false),
          savepoint: db.prepare("SAVEPOINT `	_bs3.	`", self, false),
          release: db.prepare("RELEASE `	_bs3.	`", self, false),
          rollbackTo: db.prepare("ROLLBACK TO `	_bs3.	`", self, false)
        };
        controllers.set(db, controller = {
          default: Object.assign({ begin: db.prepare("BEGIN", self, false) }, shared),
          deferred: Object.assign({ begin: db.prepare("BEGIN DEFERRED", self, false) }, shared),
          immediate: Object.assign({ begin: db.prepare("BEGIN IMMEDIATE", self, false) }, shared),
          exclusive: Object.assign({ begin: db.prepare("BEGIN EXCLUSIVE", self, false) }, shared)
        });
      }
      return controller;
    };
    var wrapTransaction = (apply, fn, db, { begin, commit, rollback, savepoint, release, rollbackTo }) => function sqliteTransaction() {
      let before, after, undo;
      if (db.inTransaction) {
        before = savepoint;
        after = release;
        undo = rollbackTo;
      } else {
        before = begin;
        after = commit;
        undo = rollback;
      }
      before.run();
      try {
        const result = apply.call(fn, this, arguments);
        if (result && typeof result.then === "function") {
          throw new TypeError("Transaction function cannot return a promise");
        }
        after.run();
        return result;
      } catch (ex) {
        if (db.inTransaction) {
          undo.run();
          if (undo !== rollback) after.run();
        }
        throw ex;
      }
    };
  }
});

// node_modules/better-sqlite3/lib/methods/pragma.js
var require_pragma = __commonJS({
  "node_modules/better-sqlite3/lib/methods/pragma.js"(exports2, module2) {
    "use strict";
    var { getBooleanOption, cppdb } = require_util();
    module2.exports = function pragma(source, options2) {
      if (options2 == null) options2 = {};
      if (typeof source !== "string") throw new TypeError("Expected first argument to be a string");
      if (typeof options2 !== "object") throw new TypeError("Expected second argument to be an options object");
      const simple = getBooleanOption(options2, "simple");
      const stmt = this[cppdb].prepare(`PRAGMA ${source}`, this, true);
      return simple ? stmt.pluck().get() : stmt.all();
    };
  }
});

// node_modules/better-sqlite3/lib/methods/backup.js
var require_backup = __commonJS({
  "node_modules/better-sqlite3/lib/methods/backup.js"(exports2, module2) {
    "use strict";
    var fs = require("fs");
    var path = require("path");
    var { promisify } = require("util");
    var { cppdb } = require_util();
    var fsAccess = promisify(fs.access);
    module2.exports = async function backup(filename, options2) {
      if (options2 == null) options2 = {};
      if (typeof filename !== "string") throw new TypeError("Expected first argument to be a string");
      if (typeof options2 !== "object") throw new TypeError("Expected second argument to be an options object");
      filename = filename.trim();
      const attachedName = "attached" in options2 ? options2.attached : "main";
      const handler = "progress" in options2 ? options2.progress : null;
      if (!filename) throw new TypeError("Backup filename cannot be an empty string");
      if (filename === ":memory:") throw new TypeError('Invalid backup filename ":memory:"');
      if (typeof attachedName !== "string") throw new TypeError('Expected the "attached" option to be a string');
      if (!attachedName) throw new TypeError('The "attached" option cannot be an empty string');
      if (handler != null && typeof handler !== "function") throw new TypeError('Expected the "progress" option to be a function');
      await fsAccess(path.dirname(filename)).catch(() => {
        throw new TypeError("Cannot save backup because the directory does not exist");
      });
      const isNewFile = await fsAccess(filename).then(() => false, () => true);
      return runBackup(this[cppdb].backup(this, attachedName, filename, isNewFile), handler || null);
    };
    var runBackup = (backup, handler) => {
      let rate = 0;
      let useDefault = true;
      return new Promise((resolve, reject) => {
        setImmediate(function step() {
          try {
            const progress = backup.transfer(rate);
            if (!progress.remainingPages) {
              backup.close();
              resolve(progress);
              return;
            }
            if (useDefault) {
              useDefault = false;
              rate = 100;
            }
            if (handler) {
              const ret = handler(progress);
              if (ret !== void 0) {
                if (typeof ret === "number" && ret === ret) rate = Math.max(0, Math.min(2147483647, Math.round(ret)));
                else throw new TypeError("Expected progress callback to return a number or undefined");
              }
            }
            setImmediate(step);
          } catch (err) {
            backup.close();
            reject(err);
          }
        });
      });
    };
  }
});

// node_modules/better-sqlite3/lib/methods/serialize.js
var require_serialize = __commonJS({
  "node_modules/better-sqlite3/lib/methods/serialize.js"(exports2, module2) {
    "use strict";
    var { cppdb } = require_util();
    module2.exports = function serialize(options2) {
      if (options2 == null) options2 = {};
      if (typeof options2 !== "object") throw new TypeError("Expected first argument to be an options object");
      const attachedName = "attached" in options2 ? options2.attached : "main";
      if (typeof attachedName !== "string") throw new TypeError('Expected the "attached" option to be a string');
      if (!attachedName) throw new TypeError('The "attached" option cannot be an empty string');
      return this[cppdb].serialize(attachedName);
    };
  }
});

// node_modules/better-sqlite3/lib/methods/function.js
var require_function = __commonJS({
  "node_modules/better-sqlite3/lib/methods/function.js"(exports2, module2) {
    "use strict";
    var { getBooleanOption, cppdb } = require_util();
    module2.exports = function defineFunction(name, options2, fn) {
      if (options2 == null) options2 = {};
      if (typeof options2 === "function") {
        fn = options2;
        options2 = {};
      }
      if (typeof name !== "string") throw new TypeError("Expected first argument to be a string");
      if (typeof fn !== "function") throw new TypeError("Expected last argument to be a function");
      if (typeof options2 !== "object") throw new TypeError("Expected second argument to be an options object");
      if (!name) throw new TypeError("User-defined function name cannot be an empty string");
      const safeIntegers = "safeIntegers" in options2 ? +getBooleanOption(options2, "safeIntegers") : 2;
      const deterministic = getBooleanOption(options2, "deterministic");
      const directOnly = getBooleanOption(options2, "directOnly");
      const varargs = getBooleanOption(options2, "varargs");
      let argCount = -1;
      if (!varargs) {
        argCount = fn.length;
        if (!Number.isInteger(argCount) || argCount < 0) throw new TypeError("Expected function.length to be a positive integer");
        if (argCount > 100) throw new RangeError("User-defined functions cannot have more than 100 arguments");
      }
      this[cppdb].function(fn, name, argCount, safeIntegers, deterministic, directOnly);
      return this;
    };
  }
});

// node_modules/better-sqlite3/lib/methods/aggregate.js
var require_aggregate = __commonJS({
  "node_modules/better-sqlite3/lib/methods/aggregate.js"(exports2, module2) {
    "use strict";
    var { getBooleanOption, cppdb } = require_util();
    module2.exports = function defineAggregate(name, options2) {
      if (typeof name !== "string") throw new TypeError("Expected first argument to be a string");
      if (typeof options2 !== "object" || options2 === null) throw new TypeError("Expected second argument to be an options object");
      if (!name) throw new TypeError("User-defined function name cannot be an empty string");
      const start = "start" in options2 ? options2.start : null;
      const step = getFunctionOption(options2, "step", true);
      const inverse = getFunctionOption(options2, "inverse", false);
      const result = getFunctionOption(options2, "result", false);
      const safeIntegers = "safeIntegers" in options2 ? +getBooleanOption(options2, "safeIntegers") : 2;
      const deterministic = getBooleanOption(options2, "deterministic");
      const directOnly = getBooleanOption(options2, "directOnly");
      const varargs = getBooleanOption(options2, "varargs");
      let argCount = -1;
      if (!varargs) {
        argCount = Math.max(getLength(step), inverse ? getLength(inverse) : 0);
        if (argCount > 0) argCount -= 1;
        if (argCount > 100) throw new RangeError("User-defined functions cannot have more than 100 arguments");
      }
      this[cppdb].aggregate(start, step, inverse, result, name, argCount, safeIntegers, deterministic, directOnly);
      return this;
    };
    var getFunctionOption = (options2, key, required) => {
      const value = key in options2 ? options2[key] : null;
      if (typeof value === "function") return value;
      if (value != null) throw new TypeError(`Expected the "${key}" option to be a function`);
      if (required) throw new TypeError(`Missing required option "${key}"`);
      return null;
    };
    var getLength = ({ length }) => {
      if (Number.isInteger(length) && length >= 0) return length;
      throw new TypeError("Expected function.length to be a positive integer");
    };
  }
});

// node_modules/better-sqlite3/lib/methods/table.js
var require_table = __commonJS({
  "node_modules/better-sqlite3/lib/methods/table.js"(exports2, module2) {
    "use strict";
    var { cppdb } = require_util();
    module2.exports = function defineTable(name, factory) {
      if (typeof name !== "string") throw new TypeError("Expected first argument to be a string");
      if (!name) throw new TypeError("Virtual table module name cannot be an empty string");
      let eponymous = false;
      if (typeof factory === "object" && factory !== null) {
        eponymous = true;
        factory = defer(parseTableDefinition(factory, "used", name));
      } else {
        if (typeof factory !== "function") throw new TypeError("Expected second argument to be a function or a table definition object");
        factory = wrapFactory(factory);
      }
      this[cppdb].table(factory, name, eponymous);
      return this;
    };
    function wrapFactory(factory) {
      return function virtualTableFactory(moduleName, databaseName, tableName, ...args) {
        const thisObject = {
          module: moduleName,
          database: databaseName,
          table: tableName
        };
        const def = apply.call(factory, thisObject, args);
        if (typeof def !== "object" || def === null) {
          throw new TypeError(`Virtual table module "${moduleName}" did not return a table definition object`);
        }
        return parseTableDefinition(def, "returned", moduleName);
      };
    }
    function parseTableDefinition(def, verb, moduleName) {
      if (!hasOwnProperty.call(def, "rows")) {
        throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition without a "rows" property`);
      }
      if (!hasOwnProperty.call(def, "columns")) {
        throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition without a "columns" property`);
      }
      const rows = def.rows;
      if (typeof rows !== "function" || Object.getPrototypeOf(rows) !== GeneratorFunctionPrototype) {
        throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition with an invalid "rows" property (should be a generator function)`);
      }
      let columns = def.columns;
      if (!Array.isArray(columns) || !(columns = [...columns]).every((x) => typeof x === "string")) {
        throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition with an invalid "columns" property (should be an array of strings)`);
      }
      if (columns.length !== new Set(columns).size) {
        throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition with duplicate column names`);
      }
      if (!columns.length) {
        throw new RangeError(`Virtual table module "${moduleName}" ${verb} a table definition with zero columns`);
      }
      let parameters;
      if (hasOwnProperty.call(def, "parameters")) {
        parameters = def.parameters;
        if (!Array.isArray(parameters) || !(parameters = [...parameters]).every((x) => typeof x === "string")) {
          throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition with an invalid "parameters" property (should be an array of strings)`);
        }
      } else {
        parameters = inferParameters(rows);
      }
      if (parameters.length !== new Set(parameters).size) {
        throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition with duplicate parameter names`);
      }
      if (parameters.length > 32) {
        throw new RangeError(`Virtual table module "${moduleName}" ${verb} a table definition with more than the maximum number of 32 parameters`);
      }
      for (const parameter of parameters) {
        if (columns.includes(parameter)) {
          throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition with column "${parameter}" which was ambiguously defined as both a column and parameter`);
        }
      }
      let safeIntegers = 2;
      if (hasOwnProperty.call(def, "safeIntegers")) {
        const bool = def.safeIntegers;
        if (typeof bool !== "boolean") {
          throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition with an invalid "safeIntegers" property (should be a boolean)`);
        }
        safeIntegers = +bool;
      }
      let directOnly = false;
      if (hasOwnProperty.call(def, "directOnly")) {
        directOnly = def.directOnly;
        if (typeof directOnly !== "boolean") {
          throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition with an invalid "directOnly" property (should be a boolean)`);
        }
      }
      const columnDefinitions = [
        ...parameters.map(identifier).map((str2) => `${str2} HIDDEN`),
        ...columns.map(identifier)
      ];
      return [
        `CREATE TABLE x(${columnDefinitions.join(", ")});`,
        wrapGenerator(rows, new Map(columns.map((x, i) => [x, parameters.length + i])), moduleName),
        parameters,
        safeIntegers,
        directOnly
      ];
    }
    function wrapGenerator(generator, columnMap, moduleName) {
      return function* virtualTable(...args) {
        const output = args.map((x) => Buffer.isBuffer(x) ? Buffer.from(x) : x);
        for (let i = 0; i < columnMap.size; ++i) {
          output.push(null);
        }
        for (const row of generator(...args)) {
          if (Array.isArray(row)) {
            extractRowArray(row, output, columnMap.size, moduleName);
            yield output;
          } else if (typeof row === "object" && row !== null) {
            extractRowObject(row, output, columnMap, moduleName);
            yield output;
          } else {
            throw new TypeError(`Virtual table module "${moduleName}" yielded something that isn't a valid row object`);
          }
        }
      };
    }
    function extractRowArray(row, output, columnCount, moduleName) {
      if (row.length !== columnCount) {
        throw new TypeError(`Virtual table module "${moduleName}" yielded a row with an incorrect number of columns`);
      }
      const offset = output.length - columnCount;
      for (let i = 0; i < columnCount; ++i) {
        output[i + offset] = row[i];
      }
    }
    function extractRowObject(row, output, columnMap, moduleName) {
      let count = 0;
      for (const key of Object.keys(row)) {
        const index = columnMap.get(key);
        if (index === void 0) {
          throw new TypeError(`Virtual table module "${moduleName}" yielded a row with an undeclared column "${key}"`);
        }
        output[index] = row[key];
        count += 1;
      }
      if (count !== columnMap.size) {
        throw new TypeError(`Virtual table module "${moduleName}" yielded a row with missing columns`);
      }
    }
    function inferParameters({ length }) {
      if (!Number.isInteger(length) || length < 0) {
        throw new TypeError("Expected function.length to be a positive integer");
      }
      const params = [];
      for (let i = 0; i < length; ++i) {
        params.push(`$${i + 1}`);
      }
      return params;
    }
    var { hasOwnProperty } = Object.prototype;
    var { apply } = Function.prototype;
    var GeneratorFunctionPrototype = Object.getPrototypeOf(function* () {
    });
    var identifier = (str2) => `"${str2.replace(/"/g, '""')}"`;
    var defer = (x) => () => x;
  }
});

// node_modules/better-sqlite3/lib/methods/inspect.js
var require_inspect = __commonJS({
  "node_modules/better-sqlite3/lib/methods/inspect.js"(exports2, module2) {
    "use strict";
    var DatabaseInspection = function Database3() {
    };
    module2.exports = function inspect(depth, opts) {
      return Object.assign(new DatabaseInspection(), this);
    };
  }
});

// node_modules/better-sqlite3/lib/database.js
var require_database = __commonJS({
  "node_modules/better-sqlite3/lib/database.js"(exports2, module2) {
    "use strict";
    var fs = require("fs");
    var path = require("path");
    var util = require_util();
    var SqliteError = require_sqlite_error();
    var DEFAULT_ADDON;
    function Database3(filenameGiven, options2) {
      if (new.target == null) {
        return new Database3(filenameGiven, options2);
      }
      let buffer;
      if (Buffer.isBuffer(filenameGiven)) {
        buffer = filenameGiven;
        filenameGiven = ":memory:";
      }
      if (filenameGiven == null) filenameGiven = "";
      if (options2 == null) options2 = {};
      if (typeof filenameGiven !== "string") throw new TypeError("Expected first argument to be a string");
      if (typeof options2 !== "object") throw new TypeError("Expected second argument to be an options object");
      if ("readOnly" in options2) throw new TypeError('Misspelled option "readOnly" should be "readonly"');
      if ("memory" in options2) throw new TypeError('Option "memory" was removed in v7.0.0 (use ":memory:" filename instead)');
      const filename = filenameGiven.trim();
      const anonymous = filename === "" || filename === ":memory:";
      const readonly = util.getBooleanOption(options2, "readonly");
      const fileMustExist = util.getBooleanOption(options2, "fileMustExist");
      const timeout = "timeout" in options2 ? options2.timeout : 5e3;
      const verbose = "verbose" in options2 ? options2.verbose : null;
      const nativeBinding = "nativeBinding" in options2 ? options2.nativeBinding : null;
      if (readonly && anonymous && !buffer) throw new TypeError("In-memory/temporary databases cannot be readonly");
      if (!Number.isInteger(timeout) || timeout < 0) throw new TypeError('Expected the "timeout" option to be a positive integer');
      if (timeout > 2147483647) throw new RangeError('Option "timeout" cannot be greater than 2147483647');
      if (verbose != null && typeof verbose !== "function") throw new TypeError('Expected the "verbose" option to be a function');
      if (nativeBinding != null && typeof nativeBinding !== "string" && typeof nativeBinding !== "object") throw new TypeError('Expected the "nativeBinding" option to be a string or addon object');
      let addon;
      if (nativeBinding == null) {
        addon = DEFAULT_ADDON || (DEFAULT_ADDON = require_bindings()("better_sqlite3.node"));
      } else if (typeof nativeBinding === "string") {
        const requireFunc = typeof __non_webpack_require__ === "function" ? __non_webpack_require__ : require;
        addon = requireFunc(path.resolve(nativeBinding).replace(/(\.node)?$/, ".node"));
      } else {
        addon = nativeBinding;
      }
      if (!addon.isInitialized) {
        addon.setErrorConstructor(SqliteError);
        addon.isInitialized = true;
      }
      if (!anonymous && !filename.startsWith("file:") && !fs.existsSync(path.dirname(filename))) {
        throw new TypeError("Cannot open database because the directory does not exist");
      }
      Object.defineProperties(this, {
        [util.cppdb]: { value: new addon.Database(filename, filenameGiven, anonymous, readonly, fileMustExist, timeout, verbose || null, buffer || null) },
        ...wrappers.getters
      });
    }
    var wrappers = require_wrappers();
    Database3.prototype.prepare = wrappers.prepare;
    Database3.prototype.transaction = require_transaction();
    Database3.prototype.pragma = require_pragma();
    Database3.prototype.backup = require_backup();
    Database3.prototype.serialize = require_serialize();
    Database3.prototype.function = require_function();
    Database3.prototype.aggregate = require_aggregate();
    Database3.prototype.table = require_table();
    Database3.prototype.loadExtension = wrappers.loadExtension;
    Database3.prototype.exec = wrappers.exec;
    Database3.prototype.close = wrappers.close;
    Database3.prototype.defaultSafeIntegers = wrappers.defaultSafeIntegers;
    Database3.prototype.unsafeMode = wrappers.unsafeMode;
    Database3.prototype[util.inspect] = require_inspect();
    module2.exports = Database3;
  }
});

// node_modules/better-sqlite3/lib/index.js
var require_lib = __commonJS({
  "node_modules/better-sqlite3/lib/index.js"(exports2, module2) {
    "use strict";
    module2.exports = require_database();
    module2.exports.SqliteError = require_sqlite_error();
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
var require_function2 = __commonJS({
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
        require_function2()
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
var import_obsidian9 = require("obsidian");

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
  const date = conversation.createdAt.toISOString().split("T")[0];
  return `${date}-${conversation.sessionId}.md`;
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
    apiUrl: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent",
    model: "gemini-2.0-flash-exp"
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
  embeddingModel: EMBEDDING_PRESETS.gemini.model
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
  async requestOpenAiCompatibleReply(settings, turns) {
    var _a, _b, _c, _d, _e, _f;
    const apiUrl = settings.apiUrl.trim();
    if (!apiUrl) {
      throw new Error("API URL\uC744 \uC124\uC815\uD574 \uC8FC\uC138\uC694.");
    }
    const modelName = settings.model.trim() || PROVIDER_PRESETS.openai.model;
    if (!modelName) {
      throw new Error("\uBAA8\uB378 \uC774\uB984\uC744 \uC785\uB825\uD574 \uC8FC\uC138\uC694.");
    }
    const messages = this.buildOpenAiMessages(settings, turns);
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
    const content = (_f = (_e = (_d = (_c = (_b = (_a = data == null ? void 0 : data.choices) == null ? void 0 : _a[0]) == null ? void 0 : _b.message) == null ? void 0 : _c.content) != null ? _d : data == null ? void 0 : data.reply) != null ? _e : data == null ? void 0 : data.content) != null ? _f : data == null ? void 0 : data.message;
    if (!content || typeof content !== "string") {
      await this.log("openai-compatible response invalid", { url: apiUrl, response: data });
      throw new Error("\uC751\uB2F5 \uD615\uC2DD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.");
    }
    return content.trim();
  }
  async requestGeminiReply(settings, turns) {
    var _a, _b, _c, _d, _e, _f;
    const apiKey = settings.apiKey.trim();
    if (!apiKey) {
      throw new Error("Gemini API \uD0A4\uB97C \uC785\uB825\uD574 \uC8FC\uC138\uC694.");
    }
    const modelName = settings.model.trim() || PROVIDER_PRESETS.gemini.model;
    if (!modelName) {
      throw new Error("Gemini \uBAA8\uB378 \uC774\uB984\uC744 \uC785\uB825\uD574 \uC8FC\uC138\uC694.");
    }
    const systemPrompt = settings.systemPrompt.trim();
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
    const text = (_f = (_e = data == null ? void 0 : data.text) != null ? _e : (_d = (_c = (_b = (_a = data == null ? void 0 : data.candidates) == null ? void 0 : _a[0]) == null ? void 0 : _b.content) == null ? void 0 : _c.parts) == null ? void 0 : _d.map((part) => {
      var _a2;
      return (_a2 = part.text) != null ? _a2 : "";
    }).join("").trim()) != null ? _f : "";
    if (!text) {
      await this.log("gemini response invalid", { model: modelName, response: data });
      throw new Error("\uC751\uB2F5 \uD615\uC2DD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.");
    }
    return text;
  }
  buildOpenAiMessages(settings, turns) {
    const messages = [];
    const systemPrompt = settings.systemPrompt.trim();
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
      await app.vault.adapter.write(logPath, `${current}${entry}`);
    } else {
      await app.vault.adapter.write(logPath, entry.trimStart());
    }
  } catch (error) {
    console.error("Failed to write plugin log", error);
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
        embeddingModelInput == null ? void 0 : embeddingModelInput.setValue(preset.model);
        await this.plugin.saveSettings();
        this.display();
      });
    });
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
var import_obsidian6 = require("obsidian");
var VIEW_TYPE_OVL_CHAT = "ovl-chat-view";
var ChatView = class extends import_obsidian6.ItemView {
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
    sessionWrapEl.createEl("span", { text: "\uC138\uC158" });
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
    const saveButtonEl = controlsEl.createEl("button", { text: "\uC800\uC7A5" });
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
    const sendButtonEl = inputWrapEl.createEl("button", { text: "\uC804\uC1A1" });
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
  setBusy(isBusy) {
    if (this.sendButtonEl) {
      this.sendButtonEl.disabled = isBusy;
    }
    if (this.saveButtonEl) {
      this.saveButtonEl.disabled = isBusy;
    }
    if (this.inputEl) {
      this.inputEl.disabled = isBusy;
    }
    if (isBusy) {
      this.contentEl.addClass("ovl-chat-busy");
    } else {
      this.contentEl.removeClass("ovl-chat-busy");
    }
  }
  appendMessage(turn) {
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
    messageEl.createEl("div", {
      cls: "ovl-chat-content",
      text: turn.content
    });
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
      new import_obsidian6.Notice("\uBA54\uC2DC\uC9C0\uB97C \uC785\uB825\uD574 \uC8FC\uC138\uC694.");
      return;
    }
    this.appendMessage({
      role: "user",
      content: input,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    if (this.inputEl) {
      this.inputEl.value = "";
    }
    this.setBusy(true);
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
          new import_obsidian6.Notice("\uAC80\uC0C9\uC5D0 \uC2E4\uD328\uD558\uC5EC \uC77C\uBC18 \uBAA8\uB4DC\uB85C \uC804\uD658\uD569\uB2C8\uB2E4");
          reply = await this.plugin.requestAssistantReply(this.messages);
        }
      } else {
        reply = await this.plugin.requestAssistantReply(this.messages);
      }
      this.appendMessage({
        role: "assistant",
        content: reply,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      new import_obsidian6.Notice(`\uB300\uD654 \uC2E4\uD328: ${message}`);
    } finally {
      this.setBusy(false);
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
      new import_obsidian6.Notice("\uC800\uC7A5\uD560 \uB300\uD654\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.");
      return;
    }
    const sessionId = (_b = (_a = this.sessionIdEl) == null ? void 0 : _a.value.trim()) != null ? _b : "";
    if (!sessionId) {
      new import_obsidian6.Notice("\uC138\uC158 ID\uB97C \uC785\uB825\uD574 \uC8FC\uC138\uC694.");
      return;
    }
    try {
      const targetPath = await this.plugin.saveConversationFromTurns(
        sessionId,
        this.messages,
        this.plugin.settings.defaultOutputFolder
      );
      new import_obsidian6.Notice(`\uB300\uD654 \uC800\uC7A5 \uC644\uB8CC: ${targetPath}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      new import_obsidian6.Notice(`\uC800\uC7A5 \uC2E4\uD328: ${message}`);
    }
  }
};

// src/indexing/metadataStore.ts
var import_better_sqlite3 = __toESM(require_lib());
var MetadataStore = class {
  constructor(dbPath) {
    this.db = new import_better_sqlite3.default(dbPath);
    this.initializeSchema();
  }
  /**
   * 데이터베이스 스키마 초기화
   */
  initializeSchema() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS notes (
        id TEXT PRIMARY KEY,
        path TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        tags TEXT, -- JSON array
        links TEXT, -- JSON array
        frontmatter TEXT, -- JSON object
        updated_at INTEGER NOT NULL,
        hash TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS chunks (
        id TEXT PRIMARY KEY,
        note_id TEXT NOT NULL,
        text TEXT NOT NULL,
        position INTEGER NOT NULL,
        token_count INTEGER NOT NULL,
        section TEXT,
        FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE
      );

      CREATE INDEX IF NOT EXISTS idx_notes_path ON notes(path);
      CREATE INDEX IF NOT EXISTS idx_notes_updated_at ON notes(updated_at);
      CREATE INDEX IF NOT EXISTS idx_chunks_note_id ON chunks(note_id);
    `);
  }
  /**
   * 노트 저장 또는 업데이트
   */
  upsertNote(note) {
    const stmt = this.db.prepare(`
      INSERT INTO notes (id, path, title, tags, links, frontmatter, updated_at, hash)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        path = excluded.path,
        title = excluded.title,
        tags = excluded.tags,
        links = excluded.links,
        frontmatter = excluded.frontmatter,
        updated_at = excluded.updated_at,
        hash = excluded.hash
    `);
    stmt.run(
      note.id,
      note.path,
      note.title,
      JSON.stringify(note.tags),
      JSON.stringify(note.links),
      JSON.stringify(note.frontmatter),
      note.updatedAt,
      note.hash
    );
  }
  /**
   * 경로로 노트 조회
   */
  getNoteByPath(path) {
    const stmt = this.db.prepare("SELECT * FROM notes WHERE path = ?");
    const row = stmt.get(path);
    return row ? this.rowToNote(row) : null;
  }
  /**
   * ID로 노트 조회
   */
  getNoteById(id) {
    const stmt = this.db.prepare("SELECT * FROM notes WHERE id = ?");
    const row = stmt.get(id);
    return row ? this.rowToNote(row) : null;
  }
  /**
   * 모든 노트 조회
   */
  getAllNotes() {
    const stmt = this.db.prepare("SELECT * FROM notes ORDER BY updated_at DESC");
    const rows = stmt.all();
    return rows.map((row) => this.rowToNote(row));
  }
  /**
   * 노트 삭제
   */
  deleteNote(id) {
    const stmt = this.db.prepare("DELETE FROM notes WHERE id = ?");
    stmt.run(id);
  }
  /**
   * 청크 저장
   */
  insertChunks(chunks) {
    const stmt = this.db.prepare(`
      INSERT INTO chunks (id, note_id, text, position, token_count, section)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const transaction = this.db.transaction((chunks2) => {
      for (const chunk of chunks2) {
        stmt.run(
          chunk.id,
          chunk.noteId,
          chunk.text,
          chunk.position,
          chunk.tokenCount,
          chunk.section
        );
      }
    });
    transaction(chunks);
  }
  /**
   * 노트의 청크 삭제
   */
  deleteChunksByNoteId(noteId) {
    const stmt = this.db.prepare("DELETE FROM chunks WHERE note_id = ?");
    stmt.run(noteId);
  }
  /**
   * 노트의 청크 조회
   */
  getChunksByNoteId(noteId) {
    const stmt = this.db.prepare("SELECT * FROM chunks WHERE note_id = ? ORDER BY position");
    const rows = stmt.all(noteId);
    return rows.map((row) => this.rowToChunk(row));
  }
  /**
   * ID로 청크 조회
   */
  getChunkById(id) {
    const stmt = this.db.prepare("SELECT * FROM chunks WHERE id = ?");
    const row = stmt.get(id);
    return row ? this.rowToChunk(row) : null;
  }
  /**
   * 모든 청크 조회
   */
  getAllChunks() {
    const stmt = this.db.prepare("SELECT * FROM chunks");
    const rows = stmt.all();
    return rows.map((row) => this.rowToChunk(row));
  }
  /**
   * 데이터베이스 닫기
   */
  close() {
    this.db.close();
  }
  /**
   * DB 행을 NoteMetadata로 변환
   */
  rowToNote(row) {
    return {
      id: row.id,
      path: row.path,
      title: row.title,
      tags: JSON.parse(row.tags || "[]"),
      links: JSON.parse(row.links || "[]"),
      frontmatter: JSON.parse(row.frontmatter || "{}"),
      updatedAt: row.updated_at,
      hash: row.hash
    };
  }
  /**
   * DB 행을 Chunk로 변환
   */
  rowToChunk(row) {
    return {
      id: row.id,
      noteId: row.note_id,
      text: row.text,
      position: row.position,
      tokenCount: row.token_count,
      section: row.section
    };
  }
};

// src/indexing/vectorStore.ts
var import_better_sqlite32 = __toESM(require_lib());
var VectorStore = class {
  constructor(dbPath) {
    this.db = new import_better_sqlite32.default(dbPath);
    this.initializeSchema();
  }
  /**
   * 데이터베이스 스키마 초기화
   */
  initializeSchema() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS embeddings (
        chunk_id TEXT PRIMARY KEY,
        embedding TEXT NOT NULL -- JSON array of numbers
      );

      CREATE INDEX IF NOT EXISTS idx_embeddings_chunk_id ON embeddings(chunk_id);
    `);
  }
  /**
   * 임베딩 저장
   */
  storeEmbedding(chunkId, embedding) {
    const stmt = this.db.prepare(`
      INSERT OR REPLACE INTO embeddings (chunk_id, embedding)
      VALUES (?, ?)
    `);
    stmt.run(chunkId, JSON.stringify(embedding));
  }
  /**
   * 여러 임베딩 일괄 저장
   */
  storeEmbeddings(embeddings) {
    const stmt = this.db.prepare(`
      INSERT OR REPLACE INTO embeddings (chunk_id, embedding)
      VALUES (?, ?)
    `);
    const transaction = this.db.transaction((embeddings2) => {
      for (const [chunkId, embedding] of embeddings2.entries()) {
        stmt.run(chunkId, JSON.stringify(embedding));
      }
    });
    transaction(embeddings);
  }
  /**
   * 임베딩 조회
   */
  getEmbedding(chunkId) {
    const stmt = this.db.prepare("SELECT embedding FROM embeddings WHERE chunk_id = ?");
    const row = stmt.get(chunkId);
    return row ? JSON.parse(row.embedding) : null;
  }
  /**
   * 모든 임베딩 조회
   */
  getAllEmbeddings() {
    const stmt = this.db.prepare("SELECT chunk_id, embedding FROM embeddings");
    const rows = stmt.all();
    const result = /* @__PURE__ */ new Map();
    for (const row of rows) {
      result.set(row.chunk_id, JSON.parse(row.embedding));
    }
    return result;
  }
  /**
   * 청크의 임베딩 삭제
   */
  deleteEmbedding(chunkId) {
    const stmt = this.db.prepare("DELETE FROM embeddings WHERE chunk_id = ?");
    stmt.run(chunkId);
  }
  /**
   * 여러 청크의 임베딩 삭제
   */
  deleteEmbeddings(chunkIds) {
    const placeholders = chunkIds.map(() => "?").join(",");
    const stmt = this.db.prepare(`DELETE FROM embeddings WHERE chunk_id IN (${placeholders})`);
    stmt.run(...chunkIds);
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
    this.db.close();
  }
};

// src/indexing/embeddings.ts
var import_transformers = require("@xenova/transformers");
var import_obsidian7 = require("obsidian");
var EmbeddingGenerator = class {
  constructor(config) {
    this.pipeline = null;
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
      this.pipeline = await (0, import_transformers.pipeline)("feature-extraction", this.config.model);
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
   * Gemini API로 임베딩 생성
   */
  async embedGemini(text) {
    if (!this.config.apiKey) {
      throw new Error("Gemini API \uD0A4\uAC00 \uC124\uC815\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4");
    }
    const url = `${this.config.apiUrl}/${this.config.model}:embedContent?key=${this.config.apiKey}`;
    try {
      const response = await (0, import_obsidian7.requestUrl)({
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
      if (data.embedding && data.embedding.values) {
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
    if (!this.config.apiKey) {
      throw new Error("OpenAI API \uD0A4\uAC00 \uC124\uC815\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4");
    }
    try {
      const response = await (0, import_obsidian7.requestUrl)({
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
      if (data.data && data.data[0] && data.data[0].embedding) {
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
      const response = await (0, import_obsidian7.requestUrl)({
        url: this.config.apiUrl,
        method: "POST",
        headers,
        body: JSON.stringify({
          model: this.config.model,
          input: text
        })
      });
      const data = response.json;
      if (data.data && data.data[0] && data.data[0].embedding) {
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
    this.metadataStore = new MetadataStore(config.metaDbPath);
    this.vectorStore = new VectorStore(config.vectorDbPath);
    const embeddingConfig = {
      provider: config.embeddingProvider,
      model: config.embeddingModel,
      apiKey: config.embeddingApiKey,
      apiUrl: config.embeddingApiUrl
    };
    this.embeddingGenerator = new EmbeddingGenerator(embeddingConfig);
  }
  /**
   * 초기화 - 임베딩 모델 로드
   */
  async initialize() {
    await this.embeddingGenerator.initialize();
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
   * 리소스 해제
   */
  close() {
    this.metadataStore.close();
    this.vectorStore.close();
  }
};

// src/vaultWatcher.ts
var import_obsidian8 = require("obsidian");
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
      new import_obsidian8.Notice("\uC774\uBBF8 \uC778\uB371\uC2F1\uC774 \uC9C4\uD589 \uC911\uC785\uB2C8\uB2E4");
      return;
    }
    this.isIndexing = true;
    new import_obsidian8.Notice("\uBCFC\uD2B8 \uC778\uB371\uC2F1\uC744 \uC2DC\uC791\uD569\uB2C8\uB2E4...");
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
            new import_obsidian8.Notice(`\uC778\uB371\uC2F1 \uC9C4\uD589 \uC911: ${indexed}/${mdFiles.length}`);
          }
        } catch (error) {
          console.error(`\uD30C\uC77C \uC778\uB371\uC2F1 \uC2E4\uD328: ${file.path}`, error);
          failed++;
        }
      }
      new import_obsidian8.Notice(`\uC778\uB371\uC2F1 \uC644\uB8CC: ${indexed}\uAC1C \uC131\uACF5, ${failed}\uAC1C \uC2E4\uD328`);
    } catch (error) {
      console.error("\uBCFC\uD2B8 \uC778\uB371\uC2F1 \uC911 \uC624\uB958:", error);
      new import_obsidian8.Notice("\uC778\uB371\uC2F1 \uC911 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4");
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
var import_path = require("path");
var OvlPlugin = class extends import_obsidian9.Plugin {
  constructor() {
    super(...arguments);
    this.settings = { ...DEFAULT_SETTINGS };
    this.apiClient = null;
    this.indexer = null;
    this.vaultWatcher = null;
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
      const dataDir = (0, import_path.join)(
        // @ts-ignore - Obsidian API의 내부 속성 사용
        this.app.vault.adapter.basePath,
        ".obsidian",
        "plugins",
        this.manifest.id
      );
      const metaDbPath = (0, import_path.join)(dataDir, "meta.db");
      const vectorDbPath = (0, import_path.join)(dataDir, "vectors.db");
      this.indexer = new Indexer({
        chunkSize: this.settings.chunkSize,
        chunkOverlap: this.settings.chunkOverlap,
        topK: this.settings.topK,
        embeddingProvider: this.settings.embeddingProvider,
        embeddingModel: this.settings.embeddingModel,
        embeddingApiKey: this.settings.embeddingApiKey || this.settings.apiKey,
        embeddingApiUrl: this.getEmbeddingApiUrl(),
        metaDbPath,
        vectorDbPath
      });
      await this.indexer.initialize();
      this.vaultWatcher = new VaultWatcher(this.app.vault);
      this.vaultWatcher.setIndexer(this.indexer);
      this.registerEvent(
        this.app.vault.on("create", (file) => {
          var _a;
          if (file instanceof import_obsidian9.TFile) {
            void ((_a = this.vaultWatcher) == null ? void 0 : _a.onFileCreate(file));
          }
        })
      );
      this.registerEvent(
        this.app.vault.on("modify", (file) => {
          var _a;
          if (file instanceof import_obsidian9.TFile) {
            void ((_a = this.vaultWatcher) == null ? void 0 : _a.onFileModify(file));
          }
        })
      );
      this.registerEvent(
        this.app.vault.on("delete", (file) => {
          var _a;
          if (file instanceof import_obsidian9.TFile) {
            (_a = this.vaultWatcher) == null ? void 0 : _a.onFileDelete(file);
          }
        })
      );
      this.registerEvent(
        this.app.vault.on("rename", (file, oldPath) => {
          var _a;
          if (file instanceof import_obsidian9.TFile) {
            void ((_a = this.vaultWatcher) == null ? void 0 : _a.onFileRename(file, oldPath));
          }
        })
      );
      console.log("\uC778\uB371\uC2F1 \uC2DC\uC2A4\uD15C \uCD08\uAE30\uD654 \uC644\uB8CC");
    } catch (error) {
      console.error("\uC778\uB371\uC2F1 \uC2DC\uC2A4\uD15C \uCD08\uAE30\uD654 \uC2E4\uD328:", error);
      new import_obsidian9.Notice("\uC778\uB371\uC2F1 \uC2DC\uC2A4\uD15C \uCD08\uAE30\uD654\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4");
    }
  }
  /**
   * 볼트 인덱싱 시작
   */
  async startIndexing() {
    if (!this.settings.indexingEnabled) {
      new import_obsidian9.Notice("\uBA3C\uC800 \uC124\uC815\uC5D0\uC11C \uC778\uB371\uC2F1\uC744 \uD65C\uC131\uD654\uD574 \uC8FC\uC138\uC694");
      return;
    }
    if (!this.indexer) {
      await this.initializeIndexing();
    }
    if (!this.vaultWatcher) {
      new import_obsidian9.Notice("\uC778\uB371\uC2F1 \uC2DC\uC2A4\uD15C\uC774 \uCD08\uAE30\uD654\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4");
      return;
    }
    try {
      await this.vaultWatcher.indexVault();
    } catch (error) {
      console.error("\uBCFC\uD2B8 \uC778\uB371\uC2F1 \uC2E4\uD328:", error);
      new import_obsidian9.Notice("\uBCFC\uD2B8 \uC778\uB371\uC2F1\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4");
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
      new import_obsidian9.Notice("\uB300\uD654 \uCC3D\uC744 \uC5F4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
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
  async saveConversationFromTurns(sessionId, turns, outputFolder) {
    return saveConversationFromTurns(this.app.vault, sessionId, turns, outputFolder);
  }
  async loadSettings() {
    this.settings = { ...DEFAULT_SETTINGS, ...await this.loadData() };
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  async handleSaveConversation(form) {
    try {
      if (!form.inputPath) {
        new import_obsidian9.Notice("JSON \uD30C\uC77C \uACBD\uB85C\uB97C \uC785\uB825\uD574 \uC8FC\uC138\uC694.");
        return;
      }
      if (!form.sessionId) {
        new import_obsidian9.Notice("\uC138\uC158 ID\uB97C \uC785\uB825\uD574 \uC8FC\uC138\uC694.");
        return;
      }
      const jsonPath = (0, import_obsidian9.normalizePath)(form.inputPath).replace(/^\/+/, "");
      const jsonExists = await this.app.vault.adapter.exists(jsonPath);
      if (!jsonExists) {
        new import_obsidian9.Notice("JSON \uD30C\uC77C\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
        return;
      }
      const jsonContent = await this.app.vault.adapter.read(jsonPath);
      const turns = parseTurns(jsonContent);
      const outputFolder = form.outputFolder ? (0, import_obsidian9.normalizePath)(form.outputFolder).replace(/^\/+/, "") : "";
      const targetPath = await saveConversationFromTurns(
        this.app.vault,
        form.sessionId,
        turns,
        outputFolder
      );
      new import_obsidian9.Notice(`\uB300\uD654 \uC800\uC7A5 \uC644\uB8CC: ${targetPath}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      new import_obsidian9.Notice(`\uC800\uC7A5 \uC2E4\uD328: ${message}`);
    }
  }
  /**
   * 임베딩 API URL 가져오기
   */
  getEmbeddingApiUrl() {
    const preset = EMBEDDING_PRESETS[this.settings.embeddingProvider];
    return preset == null ? void 0 : preset.apiUrl;
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
*/
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzL2JldHRlci1zcWxpdGUzL2xpYi91dGlsLmpzIiwgIm5vZGVfbW9kdWxlcy9iZXR0ZXItc3FsaXRlMy9saWIvc3FsaXRlLWVycm9yLmpzIiwgIm5vZGVfbW9kdWxlcy9maWxlLXVyaS10by1wYXRoL2luZGV4LmpzIiwgIm5vZGVfbW9kdWxlcy9iaW5kaW5ncy9iaW5kaW5ncy5qcyIsICJub2RlX21vZHVsZXMvYmV0dGVyLXNxbGl0ZTMvbGliL21ldGhvZHMvd3JhcHBlcnMuanMiLCAibm9kZV9tb2R1bGVzL2JldHRlci1zcWxpdGUzL2xpYi9tZXRob2RzL3RyYW5zYWN0aW9uLmpzIiwgIm5vZGVfbW9kdWxlcy9iZXR0ZXItc3FsaXRlMy9saWIvbWV0aG9kcy9wcmFnbWEuanMiLCAibm9kZV9tb2R1bGVzL2JldHRlci1zcWxpdGUzL2xpYi9tZXRob2RzL2JhY2t1cC5qcyIsICJub2RlX21vZHVsZXMvYmV0dGVyLXNxbGl0ZTMvbGliL21ldGhvZHMvc2VyaWFsaXplLmpzIiwgIm5vZGVfbW9kdWxlcy9iZXR0ZXItc3FsaXRlMy9saWIvbWV0aG9kcy9mdW5jdGlvbi5qcyIsICJub2RlX21vZHVsZXMvYmV0dGVyLXNxbGl0ZTMvbGliL21ldGhvZHMvYWdncmVnYXRlLmpzIiwgIm5vZGVfbW9kdWxlcy9iZXR0ZXItc3FsaXRlMy9saWIvbWV0aG9kcy90YWJsZS5qcyIsICJub2RlX21vZHVsZXMvYmV0dGVyLXNxbGl0ZTMvbGliL21ldGhvZHMvaW5zcGVjdC5qcyIsICJub2RlX21vZHVsZXMvYmV0dGVyLXNxbGl0ZTMvbGliL2RhdGFiYXNlLmpzIiwgIm5vZGVfbW9kdWxlcy9iZXR0ZXItc3FsaXRlMy9saWIvaW5kZXguanMiLCAibm9kZV9tb2R1bGVzL2tpbmQtb2YvaW5kZXguanMiLCAibm9kZV9tb2R1bGVzL2lzLWV4dGVuZGFibGUvaW5kZXguanMiLCAibm9kZV9tb2R1bGVzL2V4dGVuZC1zaGFsbG93L2luZGV4LmpzIiwgIm5vZGVfbW9kdWxlcy9zZWN0aW9uLW1hdHRlci9pbmRleC5qcyIsICJub2RlX21vZHVsZXMvanMteWFtbC9saWIvanMteWFtbC9jb21tb24uanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvZXhjZXB0aW9uLmpzIiwgIm5vZGVfbW9kdWxlcy9qcy15YW1sL2xpYi9qcy15YW1sL21hcmsuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvdHlwZS5qcyIsICJub2RlX21vZHVsZXMvanMteWFtbC9saWIvanMteWFtbC9zY2hlbWEuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvdHlwZS9zdHIuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvdHlwZS9zZXEuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvdHlwZS9tYXAuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvc2NoZW1hL2ZhaWxzYWZlLmpzIiwgIm5vZGVfbW9kdWxlcy9qcy15YW1sL2xpYi9qcy15YW1sL3R5cGUvbnVsbC5qcyIsICJub2RlX21vZHVsZXMvanMteWFtbC9saWIvanMteWFtbC90eXBlL2Jvb2wuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvdHlwZS9pbnQuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvdHlwZS9mbG9hdC5qcyIsICJub2RlX21vZHVsZXMvanMteWFtbC9saWIvanMteWFtbC9zY2hlbWEvanNvbi5qcyIsICJub2RlX21vZHVsZXMvanMteWFtbC9saWIvanMteWFtbC9zY2hlbWEvY29yZS5qcyIsICJub2RlX21vZHVsZXMvanMteWFtbC9saWIvanMteWFtbC90eXBlL3RpbWVzdGFtcC5qcyIsICJub2RlX21vZHVsZXMvanMteWFtbC9saWIvanMteWFtbC90eXBlL21lcmdlLmpzIiwgIm5vZGVfbW9kdWxlcy9qcy15YW1sL2xpYi9qcy15YW1sL3R5cGUvYmluYXJ5LmpzIiwgIm5vZGVfbW9kdWxlcy9qcy15YW1sL2xpYi9qcy15YW1sL3R5cGUvb21hcC5qcyIsICJub2RlX21vZHVsZXMvanMteWFtbC9saWIvanMteWFtbC90eXBlL3BhaXJzLmpzIiwgIm5vZGVfbW9kdWxlcy9qcy15YW1sL2xpYi9qcy15YW1sL3R5cGUvc2V0LmpzIiwgIm5vZGVfbW9kdWxlcy9qcy15YW1sL2xpYi9qcy15YW1sL3NjaGVtYS9kZWZhdWx0X3NhZmUuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvdHlwZS9qcy91bmRlZmluZWQuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvdHlwZS9qcy9yZWdleHAuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvdHlwZS9qcy9mdW5jdGlvbi5qcyIsICJub2RlX21vZHVsZXMvanMteWFtbC9saWIvanMteWFtbC9zY2hlbWEvZGVmYXVsdF9mdWxsLmpzIiwgIm5vZGVfbW9kdWxlcy9qcy15YW1sL2xpYi9qcy15YW1sL2xvYWRlci5qcyIsICJub2RlX21vZHVsZXMvanMteWFtbC9saWIvanMteWFtbC9kdW1wZXIuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvaW5kZXguanMiLCAibm9kZV9tb2R1bGVzL2dyYXktbWF0dGVyL2xpYi9lbmdpbmVzLmpzIiwgIm5vZGVfbW9kdWxlcy9zdHJpcC1ib20tc3RyaW5nL2luZGV4LmpzIiwgIm5vZGVfbW9kdWxlcy9ncmF5LW1hdHRlci9saWIvdXRpbHMuanMiLCAibm9kZV9tb2R1bGVzL2dyYXktbWF0dGVyL2xpYi9kZWZhdWx0cy5qcyIsICJub2RlX21vZHVsZXMvZ3JheS1tYXR0ZXIvbGliL2VuZ2luZS5qcyIsICJub2RlX21vZHVsZXMvZ3JheS1tYXR0ZXIvbGliL3N0cmluZ2lmeS5qcyIsICJub2RlX21vZHVsZXMvZ3JheS1tYXR0ZXIvbGliL2V4Y2VycHQuanMiLCAibm9kZV9tb2R1bGVzL2dyYXktbWF0dGVyL2xpYi90by1maWxlLmpzIiwgIm5vZGVfbW9kdWxlcy9ncmF5LW1hdHRlci9saWIvcGFyc2UuanMiLCAibm9kZV9tb2R1bGVzL2dyYXktbWF0dGVyL2luZGV4LmpzIiwgInNyYy9tYWluLnRzIiwgInNyYy9jb252ZXJzYXRpb25TdG9yZS50cyIsICJzcmMvY29udmVyc2F0aW9uLnRzIiwgInNyYy9hcGkudHMiLCAic3JjL3R5cGVzLnRzIiwgInNyYy9sb2dnaW5nLnRzIiwgInNyYy9tb2RhbHMvc2F2ZUNvbnZlcnNhdGlvbk1vZGFsLnRzIiwgInNyYy9wYXJzZVR1cm5zLnRzIiwgInNyYy9zZXR0aW5ncy50cyIsICJzcmMvdmlld3MvY2hhdFZpZXcudHMiLCAic3JjL2luZGV4aW5nL21ldGFkYXRhU3RvcmUudHMiLCAic3JjL2luZGV4aW5nL3ZlY3RvclN0b3JlLnRzIiwgInNyYy9pbmRleGluZy9lbWJlZGRpbmdzLnRzIiwgInNyYy9pbmRleGluZy9wYXJzZXIudHMiLCAic3JjL2luZGV4aW5nL2NodW5rZXIudHMiLCAic3JjL2luZGV4aW5nL2luZGV4ZXIudHMiLCAic3JjL3ZhdWx0V2F0Y2hlci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLmdldEJvb2xlYW5PcHRpb24gPSAob3B0aW9ucywga2V5KSA9PiB7XG5cdGxldCB2YWx1ZSA9IGZhbHNlO1xuXHRpZiAoa2V5IGluIG9wdGlvbnMgJiYgdHlwZW9mICh2YWx1ZSA9IG9wdGlvbnNba2V5XSkgIT09ICdib29sZWFuJykge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYEV4cGVjdGVkIHRoZSBcIiR7a2V5fVwiIG9wdGlvbiB0byBiZSBhIGJvb2xlYW5gKTtcblx0fVxuXHRyZXR1cm4gdmFsdWU7XG59O1xuXG5leHBvcnRzLmNwcGRiID0gU3ltYm9sKCk7XG5leHBvcnRzLmluc3BlY3QgPSBTeW1ib2wuZm9yKCdub2RlanMudXRpbC5pbnNwZWN0LmN1c3RvbScpO1xuIiwgIid1c2Ugc3RyaWN0JztcbmNvbnN0IGRlc2NyaXB0b3IgPSB7IHZhbHVlOiAnU3FsaXRlRXJyb3InLCB3cml0YWJsZTogdHJ1ZSwgZW51bWVyYWJsZTogZmFsc2UsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9O1xuXG5mdW5jdGlvbiBTcWxpdGVFcnJvcihtZXNzYWdlLCBjb2RlKSB7XG5cdGlmIChuZXcudGFyZ2V0ICE9PSBTcWxpdGVFcnJvcikge1xuXHRcdHJldHVybiBuZXcgU3FsaXRlRXJyb3IobWVzc2FnZSwgY29kZSk7XG5cdH1cblx0aWYgKHR5cGVvZiBjb2RlICE9PSAnc3RyaW5nJykge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIHNlY29uZCBhcmd1bWVudCB0byBiZSBhIHN0cmluZycpO1xuXHR9XG5cdEVycm9yLmNhbGwodGhpcywgbWVzc2FnZSk7XG5cdGRlc2NyaXB0b3IudmFsdWUgPSAnJyArIG1lc3NhZ2U7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnbWVzc2FnZScsIGRlc2NyaXB0b3IpO1xuXHRFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCBTcWxpdGVFcnJvcik7XG5cdHRoaXMuY29kZSA9IGNvZGU7XG59XG5PYmplY3Quc2V0UHJvdG90eXBlT2YoU3FsaXRlRXJyb3IsIEVycm9yKTtcbk9iamVjdC5zZXRQcm90b3R5cGVPZihTcWxpdGVFcnJvci5wcm90b3R5cGUsIEVycm9yLnByb3RvdHlwZSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoU3FsaXRlRXJyb3IucHJvdG90eXBlLCAnbmFtZScsIGRlc2NyaXB0b3IpO1xubW9kdWxlLmV4cG9ydHMgPSBTcWxpdGVFcnJvcjtcbiIsICJcbi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgc2VwID0gcmVxdWlyZSgncGF0aCcpLnNlcCB8fCAnLyc7XG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmaWxlVXJpVG9QYXRoO1xuXG4vKipcbiAqIEZpbGUgVVJJIHRvIFBhdGggZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVyaVxuICogQHJldHVybiB7U3RyaW5nfSBwYXRoXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGZpbGVVcmlUb1BhdGggKHVyaSkge1xuICBpZiAoJ3N0cmluZycgIT0gdHlwZW9mIHVyaSB8fFxuICAgICAgdXJpLmxlbmd0aCA8PSA3IHx8XG4gICAgICAnZmlsZTovLycgIT0gdXJpLnN1YnN0cmluZygwLCA3KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ211c3QgcGFzcyBpbiBhIGZpbGU6Ly8gVVJJIHRvIGNvbnZlcnQgdG8gYSBmaWxlIHBhdGgnKTtcbiAgfVxuXG4gIHZhciByZXN0ID0gZGVjb2RlVVJJKHVyaS5zdWJzdHJpbmcoNykpO1xuICB2YXIgZmlyc3RTbGFzaCA9IHJlc3QuaW5kZXhPZignLycpO1xuICB2YXIgaG9zdCA9IHJlc3Quc3Vic3RyaW5nKDAsIGZpcnN0U2xhc2gpO1xuICB2YXIgcGF0aCA9IHJlc3Quc3Vic3RyaW5nKGZpcnN0U2xhc2ggKyAxKTtcblxuICAvLyAyLiAgU2NoZW1lIERlZmluaXRpb25cbiAgLy8gQXMgYSBzcGVjaWFsIGNhc2UsIDxob3N0PiBjYW4gYmUgdGhlIHN0cmluZyBcImxvY2FsaG9zdFwiIG9yIHRoZSBlbXB0eVxuICAvLyBzdHJpbmc7IHRoaXMgaXMgaW50ZXJwcmV0ZWQgYXMgXCJ0aGUgbWFjaGluZSBmcm9tIHdoaWNoIHRoZSBVUkwgaXNcbiAgLy8gYmVpbmcgaW50ZXJwcmV0ZWRcIi5cbiAgaWYgKCdsb2NhbGhvc3QnID09IGhvc3QpIGhvc3QgPSAnJztcblxuICBpZiAoaG9zdCkge1xuICAgIGhvc3QgPSBzZXAgKyBzZXAgKyBob3N0O1xuICB9XG5cbiAgLy8gMy4yICBEcml2ZXMsIGRyaXZlIGxldHRlcnMsIG1vdW50IHBvaW50cywgZmlsZSBzeXN0ZW0gcm9vdFxuICAvLyBEcml2ZSBsZXR0ZXJzIGFyZSBtYXBwZWQgaW50byB0aGUgdG9wIG9mIGEgZmlsZSBVUkkgaW4gdmFyaW91cyB3YXlzLFxuICAvLyBkZXBlbmRpbmcgb24gdGhlIGltcGxlbWVudGF0aW9uOyBzb21lIGFwcGxpY2F0aW9ucyBzdWJzdGl0dXRlXG4gIC8vIHZlcnRpY2FsIGJhciAoXCJ8XCIpIGZvciB0aGUgY29sb24gYWZ0ZXIgdGhlIGRyaXZlIGxldHRlciwgeWllbGRpbmdcbiAgLy8gXCJmaWxlOi8vL2N8L3RtcC90ZXN0LnR4dFwiLiAgSW4gc29tZSBjYXNlcywgdGhlIGNvbG9uIGlzIGxlZnRcbiAgLy8gdW5jaGFuZ2VkLCBhcyBpbiBcImZpbGU6Ly8vYzovdG1wL3Rlc3QudHh0XCIuICBJbiBvdGhlciBjYXNlcywgdGhlXG4gIC8vIGNvbG9uIGlzIHNpbXBseSBvbWl0dGVkLCBhcyBpbiBcImZpbGU6Ly8vYy90bXAvdGVzdC50eHRcIi5cbiAgcGF0aCA9IHBhdGgucmVwbGFjZSgvXiguKylcXHwvLCAnJDE6Jyk7XG5cbiAgLy8gZm9yIFdpbmRvd3MsIHdlIG5lZWQgdG8gaW52ZXJ0IHRoZSBwYXRoIHNlcGFyYXRvcnMgZnJvbSB3aGF0IGEgVVJJIHVzZXNcbiAgaWYgKHNlcCA9PSAnXFxcXCcpIHtcbiAgICBwYXRoID0gcGF0aC5yZXBsYWNlKC9cXC8vZywgJ1xcXFwnKTtcbiAgfVxuXG4gIGlmICgvXi4rXFw6Ly50ZXN0KHBhdGgpKSB7XG4gICAgLy8gaGFzIFdpbmRvd3MgZHJpdmUgYXQgYmVnaW5uaW5nIG9mIHBhdGhcbiAgfSBlbHNlIHtcbiAgICAvLyB1bml4IHBhdGhcdTIwMjZcbiAgICBwYXRoID0gc2VwICsgcGF0aDtcbiAgfVxuXG4gIHJldHVybiBob3N0ICsgcGF0aDtcbn1cbiIsICIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIGZzID0gcmVxdWlyZSgnZnMnKSxcbiAgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKSxcbiAgZmlsZVVSTFRvUGF0aCA9IHJlcXVpcmUoJ2ZpbGUtdXJpLXRvLXBhdGgnKSxcbiAgam9pbiA9IHBhdGguam9pbixcbiAgZGlybmFtZSA9IHBhdGguZGlybmFtZSxcbiAgZXhpc3RzID1cbiAgICAoZnMuYWNjZXNzU3luYyAmJlxuICAgICAgZnVuY3Rpb24ocGF0aCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGZzLmFjY2Vzc1N5bmMocGF0aCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9KSB8fFxuICAgIGZzLmV4aXN0c1N5bmMgfHxcbiAgICBwYXRoLmV4aXN0c1N5bmMsXG4gIGRlZmF1bHRzID0ge1xuICAgIGFycm93OiBwcm9jZXNzLmVudi5OT0RFX0JJTkRJTkdTX0FSUk9XIHx8ICcgXHUyMTkyICcsXG4gICAgY29tcGlsZWQ6IHByb2Nlc3MuZW52Lk5PREVfQklORElOR1NfQ09NUElMRURfRElSIHx8ICdjb21waWxlZCcsXG4gICAgcGxhdGZvcm06IHByb2Nlc3MucGxhdGZvcm0sXG4gICAgYXJjaDogcHJvY2Vzcy5hcmNoLFxuICAgIG5vZGVQcmVHeXA6XG4gICAgICAnbm9kZS12JyArXG4gICAgICBwcm9jZXNzLnZlcnNpb25zLm1vZHVsZXMgK1xuICAgICAgJy0nICtcbiAgICAgIHByb2Nlc3MucGxhdGZvcm0gK1xuICAgICAgJy0nICtcbiAgICAgIHByb2Nlc3MuYXJjaCxcbiAgICB2ZXJzaW9uOiBwcm9jZXNzLnZlcnNpb25zLm5vZGUsXG4gICAgYmluZGluZ3M6ICdiaW5kaW5ncy5ub2RlJyxcbiAgICB0cnk6IFtcbiAgICAgIC8vIG5vZGUtZ3lwJ3MgbGlua2VkIHZlcnNpb24gaW4gdGhlIFwiYnVpbGRcIiBkaXJcbiAgICAgIFsnbW9kdWxlX3Jvb3QnLCAnYnVpbGQnLCAnYmluZGluZ3MnXSxcbiAgICAgIC8vIG5vZGUtd2FmIGFuZCBneXBfYWRkb24gKGEuay5hIG5vZGUtZ3lwKVxuICAgICAgWydtb2R1bGVfcm9vdCcsICdidWlsZCcsICdEZWJ1ZycsICdiaW5kaW5ncyddLFxuICAgICAgWydtb2R1bGVfcm9vdCcsICdidWlsZCcsICdSZWxlYXNlJywgJ2JpbmRpbmdzJ10sXG4gICAgICAvLyBEZWJ1ZyBmaWxlcywgZm9yIGRldmVsb3BtZW50IChsZWdhY3kgYmVoYXZpb3IsIHJlbW92ZSBmb3Igbm9kZSB2MC45KVxuICAgICAgWydtb2R1bGVfcm9vdCcsICdvdXQnLCAnRGVidWcnLCAnYmluZGluZ3MnXSxcbiAgICAgIFsnbW9kdWxlX3Jvb3QnLCAnRGVidWcnLCAnYmluZGluZ3MnXSxcbiAgICAgIC8vIFJlbGVhc2UgZmlsZXMsIGJ1dCBtYW51YWxseSBjb21waWxlZCAobGVnYWN5IGJlaGF2aW9yLCByZW1vdmUgZm9yIG5vZGUgdjAuOSlcbiAgICAgIFsnbW9kdWxlX3Jvb3QnLCAnb3V0JywgJ1JlbGVhc2UnLCAnYmluZGluZ3MnXSxcbiAgICAgIFsnbW9kdWxlX3Jvb3QnLCAnUmVsZWFzZScsICdiaW5kaW5ncyddLFxuICAgICAgLy8gTGVnYWN5IGZyb20gbm9kZS13YWYsIG5vZGUgPD0gMC40LnhcbiAgICAgIFsnbW9kdWxlX3Jvb3QnLCAnYnVpbGQnLCAnZGVmYXVsdCcsICdiaW5kaW5ncyddLFxuICAgICAgLy8gUHJvZHVjdGlvbiBcIlJlbGVhc2VcIiBidWlsZHR5cGUgYmluYXJ5IChtZWguLi4pXG4gICAgICBbJ21vZHVsZV9yb290JywgJ2NvbXBpbGVkJywgJ3ZlcnNpb24nLCAncGxhdGZvcm0nLCAnYXJjaCcsICdiaW5kaW5ncyddLFxuICAgICAgLy8gbm9kZS1xYnMgYnVpbGRzXG4gICAgICBbJ21vZHVsZV9yb290JywgJ2FkZG9uLWJ1aWxkJywgJ3JlbGVhc2UnLCAnaW5zdGFsbC1yb290JywgJ2JpbmRpbmdzJ10sXG4gICAgICBbJ21vZHVsZV9yb290JywgJ2FkZG9uLWJ1aWxkJywgJ2RlYnVnJywgJ2luc3RhbGwtcm9vdCcsICdiaW5kaW5ncyddLFxuICAgICAgWydtb2R1bGVfcm9vdCcsICdhZGRvbi1idWlsZCcsICdkZWZhdWx0JywgJ2luc3RhbGwtcm9vdCcsICdiaW5kaW5ncyddLFxuICAgICAgLy8gbm9kZS1wcmUtZ3lwIHBhdGggLi9saWIvYmluZGluZy97bm9kZV9hYml9LXtwbGF0Zm9ybX0te2FyY2h9XG4gICAgICBbJ21vZHVsZV9yb290JywgJ2xpYicsICdiaW5kaW5nJywgJ25vZGVQcmVHeXAnLCAnYmluZGluZ3MnXVxuICAgIF1cbiAgfTtcblxuLyoqXG4gKiBUaGUgbWFpbiBgYmluZGluZ3MoKWAgZnVuY3Rpb24gbG9hZHMgdGhlIGNvbXBpbGVkIGJpbmRpbmdzIGZvciBhIGdpdmVuIG1vZHVsZS5cbiAqIEl0IHVzZXMgVjgncyBFcnJvciBBUEkgdG8gZGV0ZXJtaW5lIHRoZSBwYXJlbnQgZmlsZW5hbWUgdGhhdCB0aGlzIGZ1bmN0aW9uIGlzXG4gKiBiZWluZyBpbnZva2VkIGZyb20sIHdoaWNoIGlzIHRoZW4gdXNlZCB0byBmaW5kIHRoZSByb290IGRpcmVjdG9yeS5cbiAqL1xuXG5mdW5jdGlvbiBiaW5kaW5ncyhvcHRzKSB7XG4gIC8vIEFyZ3VtZW50IHN1cmdlcnlcbiAgaWYgKHR5cGVvZiBvcHRzID09ICdzdHJpbmcnKSB7XG4gICAgb3B0cyA9IHsgYmluZGluZ3M6IG9wdHMgfTtcbiAgfSBlbHNlIGlmICghb3B0cykge1xuICAgIG9wdHMgPSB7fTtcbiAgfVxuXG4gIC8vIG1hcHMgYGRlZmF1bHRzYCBvbnRvIGBvcHRzYCBvYmplY3RcbiAgT2JqZWN0LmtleXMoZGVmYXVsdHMpLm1hcChmdW5jdGlvbihpKSB7XG4gICAgaWYgKCEoaSBpbiBvcHRzKSkgb3B0c1tpXSA9IGRlZmF1bHRzW2ldO1xuICB9KTtcblxuICAvLyBHZXQgdGhlIG1vZHVsZSByb290XG4gIGlmICghb3B0cy5tb2R1bGVfcm9vdCkge1xuICAgIG9wdHMubW9kdWxlX3Jvb3QgPSBleHBvcnRzLmdldFJvb3QoZXhwb3J0cy5nZXRGaWxlTmFtZSgpKTtcbiAgfVxuXG4gIC8vIEVuc3VyZSB0aGUgZ2l2ZW4gYmluZGluZ3MgbmFtZSBlbmRzIHdpdGggLm5vZGVcbiAgaWYgKHBhdGguZXh0bmFtZShvcHRzLmJpbmRpbmdzKSAhPSAnLm5vZGUnKSB7XG4gICAgb3B0cy5iaW5kaW5ncyArPSAnLm5vZGUnO1xuICB9XG5cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2svd2VicGFjay9pc3N1ZXMvNDE3NSNpc3N1ZWNvbW1lbnQtMzQyOTMxMDM1XG4gIHZhciByZXF1aXJlRnVuYyA9XG4gICAgdHlwZW9mIF9fd2VicGFja19yZXF1aXJlX18gPT09ICdmdW5jdGlvbidcbiAgICAgID8gX19ub25fd2VicGFja19yZXF1aXJlX19cbiAgICAgIDogcmVxdWlyZTtcblxuICB2YXIgdHJpZXMgPSBbXSxcbiAgICBpID0gMCxcbiAgICBsID0gb3B0cy50cnkubGVuZ3RoLFxuICAgIG4sXG4gICAgYixcbiAgICBlcnI7XG5cbiAgZm9yICg7IGkgPCBsOyBpKyspIHtcbiAgICBuID0gam9pbi5hcHBseShcbiAgICAgIG51bGwsXG4gICAgICBvcHRzLnRyeVtpXS5tYXAoZnVuY3Rpb24ocCkge1xuICAgICAgICByZXR1cm4gb3B0c1twXSB8fCBwO1xuICAgICAgfSlcbiAgICApO1xuICAgIHRyaWVzLnB1c2gobik7XG4gICAgdHJ5IHtcbiAgICAgIGIgPSBvcHRzLnBhdGggPyByZXF1aXJlRnVuYy5yZXNvbHZlKG4pIDogcmVxdWlyZUZ1bmMobik7XG4gICAgICBpZiAoIW9wdHMucGF0aCkge1xuICAgICAgICBiLnBhdGggPSBuO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGI7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUuY29kZSAhPT0gJ01PRFVMRV9OT1RfRk9VTkQnICYmXG4gICAgICAgICAgZS5jb2RlICE9PSAnUVVBTElGSUVEX1BBVEhfUkVTT0xVVElPTl9GQUlMRUQnICYmXG4gICAgICAgICAgIS9ub3QgZmluZC9pLnRlc3QoZS5tZXNzYWdlKSkge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGVyciA9IG5ldyBFcnJvcihcbiAgICAnQ291bGQgbm90IGxvY2F0ZSB0aGUgYmluZGluZ3MgZmlsZS4gVHJpZWQ6XFxuJyArXG4gICAgICB0cmllc1xuICAgICAgICAubWFwKGZ1bmN0aW9uKGEpIHtcbiAgICAgICAgICByZXR1cm4gb3B0cy5hcnJvdyArIGE7XG4gICAgICAgIH0pXG4gICAgICAgIC5qb2luKCdcXG4nKVxuICApO1xuICBlcnIudHJpZXMgPSB0cmllcztcbiAgdGhyb3cgZXJyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gYmluZGluZ3M7XG5cbi8qKlxuICogR2V0cyB0aGUgZmlsZW5hbWUgb2YgdGhlIEphdmFTY3JpcHQgZmlsZSB0aGF0IGludm9rZXMgdGhpcyBmdW5jdGlvbi5cbiAqIFVzZWQgdG8gaGVscCBmaW5kIHRoZSByb290IGRpcmVjdG9yeSBvZiBhIG1vZHVsZS5cbiAqIE9wdGlvbmFsbHkgYWNjZXB0cyBhbiBmaWxlbmFtZSBhcmd1bWVudCB0byBza2lwIHdoZW4gc2VhcmNoaW5nIGZvciB0aGUgaW52b2tpbmcgZmlsZW5hbWVcbiAqL1xuXG5leHBvcnRzLmdldEZpbGVOYW1lID0gZnVuY3Rpb24gZ2V0RmlsZU5hbWUoY2FsbGluZ19maWxlKSB7XG4gIHZhciBvcmlnUFNUID0gRXJyb3IucHJlcGFyZVN0YWNrVHJhY2UsXG4gICAgb3JpZ1NUTCA9IEVycm9yLnN0YWNrVHJhY2VMaW1pdCxcbiAgICBkdW1teSA9IHt9LFxuICAgIGZpbGVOYW1lO1xuXG4gIEVycm9yLnN0YWNrVHJhY2VMaW1pdCA9IDEwO1xuXG4gIEVycm9yLnByZXBhcmVTdGFja1RyYWNlID0gZnVuY3Rpb24oZSwgc3QpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IHN0Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZmlsZU5hbWUgPSBzdFtpXS5nZXRGaWxlTmFtZSgpO1xuICAgICAgaWYgKGZpbGVOYW1lICE9PSBfX2ZpbGVuYW1lKSB7XG4gICAgICAgIGlmIChjYWxsaW5nX2ZpbGUpIHtcbiAgICAgICAgICBpZiAoZmlsZU5hbWUgIT09IGNhbGxpbmdfZmlsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLy8gcnVuIHRoZSAncHJlcGFyZVN0YWNrVHJhY2UnIGZ1bmN0aW9uIGFib3ZlXG4gIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKGR1bW15KTtcbiAgZHVtbXkuc3RhY2s7XG5cbiAgLy8gY2xlYW51cFxuICBFcnJvci5wcmVwYXJlU3RhY2tUcmFjZSA9IG9yaWdQU1Q7XG4gIEVycm9yLnN0YWNrVHJhY2VMaW1pdCA9IG9yaWdTVEw7XG5cbiAgLy8gaGFuZGxlIGZpbGVuYW1lIHRoYXQgc3RhcnRzIHdpdGggXCJmaWxlOi8vXCJcbiAgdmFyIGZpbGVTY2hlbWEgPSAnZmlsZTovLyc7XG4gIGlmIChmaWxlTmFtZS5pbmRleE9mKGZpbGVTY2hlbWEpID09PSAwKSB7XG4gICAgZmlsZU5hbWUgPSBmaWxlVVJMVG9QYXRoKGZpbGVOYW1lKTtcbiAgfVxuXG4gIHJldHVybiBmaWxlTmFtZTtcbn07XG5cbi8qKlxuICogR2V0cyB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgYSBtb2R1bGUsIGdpdmVuIGFuIGFyYml0cmFyeSBmaWxlbmFtZVxuICogc29tZXdoZXJlIGluIHRoZSBtb2R1bGUgdHJlZS4gVGhlIFwicm9vdCBkaXJlY3RvcnlcIiBpcyB0aGUgZGlyZWN0b3J5XG4gKiBjb250YWluaW5nIHRoZSBgcGFja2FnZS5qc29uYCBmaWxlLlxuICpcbiAqICAgSW46ICAvaG9tZS9uYXRlL25vZGUtbmF0aXZlLW1vZHVsZS9saWIvaW5kZXguanNcbiAqICAgT3V0OiAvaG9tZS9uYXRlL25vZGUtbmF0aXZlLW1vZHVsZVxuICovXG5cbmV4cG9ydHMuZ2V0Um9vdCA9IGZ1bmN0aW9uIGdldFJvb3QoZmlsZSkge1xuICB2YXIgZGlyID0gZGlybmFtZShmaWxlKSxcbiAgICBwcmV2O1xuICB3aGlsZSAodHJ1ZSkge1xuICAgIGlmIChkaXIgPT09ICcuJykge1xuICAgICAgLy8gQXZvaWRzIGFuIGluZmluaXRlIGxvb3AgaW4gcmFyZSBjYXNlcywgbGlrZSB0aGUgUkVQTFxuICAgICAgZGlyID0gcHJvY2Vzcy5jd2QoKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgZXhpc3RzKGpvaW4oZGlyLCAncGFja2FnZS5qc29uJykpIHx8XG4gICAgICBleGlzdHMoam9pbihkaXIsICdub2RlX21vZHVsZXMnKSlcbiAgICApIHtcbiAgICAgIC8vIEZvdW5kIHRoZSAncGFja2FnZS5qc29uJyBmaWxlIG9yICdub2RlX21vZHVsZXMnIGRpcjsgd2UncmUgZG9uZVxuICAgICAgcmV0dXJuIGRpcjtcbiAgICB9XG4gICAgaWYgKHByZXYgPT09IGRpcikge1xuICAgICAgLy8gR290IHRvIHRoZSB0b3BcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0NvdWxkIG5vdCBmaW5kIG1vZHVsZSByb290IGdpdmVuIGZpbGU6IFwiJyArXG4gICAgICAgICAgZmlsZSArXG4gICAgICAgICAgJ1wiLiBEbyB5b3UgaGF2ZSBhIGBwYWNrYWdlLmpzb25gIGZpbGU/ICdcbiAgICAgICk7XG4gICAgfVxuICAgIC8vIFRyeSB0aGUgcGFyZW50IGRpciBuZXh0XG4gICAgcHJldiA9IGRpcjtcbiAgICBkaXIgPSBqb2luKGRpciwgJy4uJyk7XG4gIH1cbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuY29uc3QgeyBjcHBkYiB9ID0gcmVxdWlyZSgnLi4vdXRpbCcpO1xuXG5leHBvcnRzLnByZXBhcmUgPSBmdW5jdGlvbiBwcmVwYXJlKHNxbCkge1xuXHRyZXR1cm4gdGhpc1tjcHBkYl0ucHJlcGFyZShzcWwsIHRoaXMsIGZhbHNlKTtcbn07XG5cbmV4cG9ydHMuZXhlYyA9IGZ1bmN0aW9uIGV4ZWMoc3FsKSB7XG5cdHRoaXNbY3BwZGJdLmV4ZWMoc3FsKTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG5leHBvcnRzLmNsb3NlID0gZnVuY3Rpb24gY2xvc2UoKSB7XG5cdHRoaXNbY3BwZGJdLmNsb3NlKCk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuZXhwb3J0cy5sb2FkRXh0ZW5zaW9uID0gZnVuY3Rpb24gbG9hZEV4dGVuc2lvbiguLi5hcmdzKSB7XG5cdHRoaXNbY3BwZGJdLmxvYWRFeHRlbnNpb24oLi4uYXJncyk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuZXhwb3J0cy5kZWZhdWx0U2FmZUludGVnZXJzID0gZnVuY3Rpb24gZGVmYXVsdFNhZmVJbnRlZ2VycyguLi5hcmdzKSB7XG5cdHRoaXNbY3BwZGJdLmRlZmF1bHRTYWZlSW50ZWdlcnMoLi4uYXJncyk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuZXhwb3J0cy51bnNhZmVNb2RlID0gZnVuY3Rpb24gdW5zYWZlTW9kZSguLi5hcmdzKSB7XG5cdHRoaXNbY3BwZGJdLnVuc2FmZU1vZGUoLi4uYXJncyk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuZXhwb3J0cy5nZXR0ZXJzID0ge1xuXHRuYW1lOiB7XG5cdFx0Z2V0OiBmdW5jdGlvbiBuYW1lKCkgeyByZXR1cm4gdGhpc1tjcHBkYl0ubmFtZTsgfSxcblx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHR9LFxuXHRvcGVuOiB7XG5cdFx0Z2V0OiBmdW5jdGlvbiBvcGVuKCkgeyByZXR1cm4gdGhpc1tjcHBkYl0ub3BlbjsgfSxcblx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHR9LFxuXHRpblRyYW5zYWN0aW9uOiB7XG5cdFx0Z2V0OiBmdW5jdGlvbiBpblRyYW5zYWN0aW9uKCkgeyByZXR1cm4gdGhpc1tjcHBkYl0uaW5UcmFuc2FjdGlvbjsgfSxcblx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHR9LFxuXHRyZWFkb25seToge1xuXHRcdGdldDogZnVuY3Rpb24gcmVhZG9ubHkoKSB7IHJldHVybiB0aGlzW2NwcGRiXS5yZWFkb25seTsgfSxcblx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHR9LFxuXHRtZW1vcnk6IHtcblx0XHRnZXQ6IGZ1bmN0aW9uIG1lbW9yeSgpIHsgcmV0dXJuIHRoaXNbY3BwZGJdLm1lbW9yeTsgfSxcblx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHR9LFxufTtcbiIsICIndXNlIHN0cmljdCc7XG5jb25zdCB7IGNwcGRiIH0gPSByZXF1aXJlKCcuLi91dGlsJyk7XG5jb25zdCBjb250cm9sbGVycyA9IG5ldyBXZWFrTWFwKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdHJhbnNhY3Rpb24oZm4pIHtcblx0aWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgZmlyc3QgYXJndW1lbnQgdG8gYmUgYSBmdW5jdGlvbicpO1xuXG5cdGNvbnN0IGRiID0gdGhpc1tjcHBkYl07XG5cdGNvbnN0IGNvbnRyb2xsZXIgPSBnZXRDb250cm9sbGVyKGRiLCB0aGlzKTtcblx0Y29uc3QgeyBhcHBseSB9ID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuXG5cdC8vIEVhY2ggdmVyc2lvbiBvZiB0aGUgdHJhbnNhY3Rpb24gZnVuY3Rpb24gaGFzIHRoZXNlIHNhbWUgcHJvcGVydGllc1xuXHRjb25zdCBwcm9wZXJ0aWVzID0ge1xuXHRcdGRlZmF1bHQ6IHsgdmFsdWU6IHdyYXBUcmFuc2FjdGlvbihhcHBseSwgZm4sIGRiLCBjb250cm9sbGVyLmRlZmF1bHQpIH0sXG5cdFx0ZGVmZXJyZWQ6IHsgdmFsdWU6IHdyYXBUcmFuc2FjdGlvbihhcHBseSwgZm4sIGRiLCBjb250cm9sbGVyLmRlZmVycmVkKSB9LFxuXHRcdGltbWVkaWF0ZTogeyB2YWx1ZTogd3JhcFRyYW5zYWN0aW9uKGFwcGx5LCBmbiwgZGIsIGNvbnRyb2xsZXIuaW1tZWRpYXRlKSB9LFxuXHRcdGV4Y2x1c2l2ZTogeyB2YWx1ZTogd3JhcFRyYW5zYWN0aW9uKGFwcGx5LCBmbiwgZGIsIGNvbnRyb2xsZXIuZXhjbHVzaXZlKSB9LFxuXHRcdGRhdGFiYXNlOiB7IHZhbHVlOiB0aGlzLCBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdH07XG5cblx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXMocHJvcGVydGllcy5kZWZhdWx0LnZhbHVlLCBwcm9wZXJ0aWVzKTtcblx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXMocHJvcGVydGllcy5kZWZlcnJlZC52YWx1ZSwgcHJvcGVydGllcyk7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHByb3BlcnRpZXMuaW1tZWRpYXRlLnZhbHVlLCBwcm9wZXJ0aWVzKTtcblx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXMocHJvcGVydGllcy5leGNsdXNpdmUudmFsdWUsIHByb3BlcnRpZXMpO1xuXG5cdC8vIFJldHVybiB0aGUgZGVmYXVsdCB2ZXJzaW9uIG9mIHRoZSB0cmFuc2FjdGlvbiBmdW5jdGlvblxuXHRyZXR1cm4gcHJvcGVydGllcy5kZWZhdWx0LnZhbHVlO1xufTtcblxuLy8gUmV0dXJuIHRoZSBkYXRhYmFzZSdzIGNhY2hlZCB0cmFuc2FjdGlvbiBjb250cm9sbGVyLCBvciBjcmVhdGUgYSBuZXcgb25lXG5jb25zdCBnZXRDb250cm9sbGVyID0gKGRiLCBzZWxmKSA9PiB7XG5cdGxldCBjb250cm9sbGVyID0gY29udHJvbGxlcnMuZ2V0KGRiKTtcblx0aWYgKCFjb250cm9sbGVyKSB7XG5cdFx0Y29uc3Qgc2hhcmVkID0ge1xuXHRcdFx0Y29tbWl0OiBkYi5wcmVwYXJlKCdDT01NSVQnLCBzZWxmLCBmYWxzZSksXG5cdFx0XHRyb2xsYmFjazogZGIucHJlcGFyZSgnUk9MTEJBQ0snLCBzZWxmLCBmYWxzZSksXG5cdFx0XHRzYXZlcG9pbnQ6IGRiLnByZXBhcmUoJ1NBVkVQT0lOVCBgXFx0X2JzMy5cXHRgJywgc2VsZiwgZmFsc2UpLFxuXHRcdFx0cmVsZWFzZTogZGIucHJlcGFyZSgnUkVMRUFTRSBgXFx0X2JzMy5cXHRgJywgc2VsZiwgZmFsc2UpLFxuXHRcdFx0cm9sbGJhY2tUbzogZGIucHJlcGFyZSgnUk9MTEJBQ0sgVE8gYFxcdF9iczMuXFx0YCcsIHNlbGYsIGZhbHNlKSxcblx0XHR9O1xuXHRcdGNvbnRyb2xsZXJzLnNldChkYiwgY29udHJvbGxlciA9IHtcblx0XHRcdGRlZmF1bHQ6IE9iamVjdC5hc3NpZ24oeyBiZWdpbjogZGIucHJlcGFyZSgnQkVHSU4nLCBzZWxmLCBmYWxzZSkgfSwgc2hhcmVkKSxcblx0XHRcdGRlZmVycmVkOiBPYmplY3QuYXNzaWduKHsgYmVnaW46IGRiLnByZXBhcmUoJ0JFR0lOIERFRkVSUkVEJywgc2VsZiwgZmFsc2UpIH0sIHNoYXJlZCksXG5cdFx0XHRpbW1lZGlhdGU6IE9iamVjdC5hc3NpZ24oeyBiZWdpbjogZGIucHJlcGFyZSgnQkVHSU4gSU1NRURJQVRFJywgc2VsZiwgZmFsc2UpIH0sIHNoYXJlZCksXG5cdFx0XHRleGNsdXNpdmU6IE9iamVjdC5hc3NpZ24oeyBiZWdpbjogZGIucHJlcGFyZSgnQkVHSU4gRVhDTFVTSVZFJywgc2VsZiwgZmFsc2UpIH0sIHNoYXJlZCksXG5cdFx0fSk7XG5cdH1cblx0cmV0dXJuIGNvbnRyb2xsZXI7XG59O1xuXG4vLyBSZXR1cm4gYSBuZXcgdHJhbnNhY3Rpb24gZnVuY3Rpb24gYnkgd3JhcHBpbmcgdGhlIGdpdmVuIGZ1bmN0aW9uXG5jb25zdCB3cmFwVHJhbnNhY3Rpb24gPSAoYXBwbHksIGZuLCBkYiwgeyBiZWdpbiwgY29tbWl0LCByb2xsYmFjaywgc2F2ZXBvaW50LCByZWxlYXNlLCByb2xsYmFja1RvIH0pID0+IGZ1bmN0aW9uIHNxbGl0ZVRyYW5zYWN0aW9uKCkge1xuXHRsZXQgYmVmb3JlLCBhZnRlciwgdW5kbztcblx0aWYgKGRiLmluVHJhbnNhY3Rpb24pIHtcblx0XHRiZWZvcmUgPSBzYXZlcG9pbnQ7XG5cdFx0YWZ0ZXIgPSByZWxlYXNlO1xuXHRcdHVuZG8gPSByb2xsYmFja1RvO1xuXHR9IGVsc2Uge1xuXHRcdGJlZm9yZSA9IGJlZ2luO1xuXHRcdGFmdGVyID0gY29tbWl0O1xuXHRcdHVuZG8gPSByb2xsYmFjaztcblx0fVxuXHRiZWZvcmUucnVuKCk7XG5cdHRyeSB7XG5cdFx0Y29uc3QgcmVzdWx0ID0gYXBwbHkuY2FsbChmbiwgdGhpcywgYXJndW1lbnRzKTtcblx0XHRpZiAocmVzdWx0ICYmIHR5cGVvZiByZXN1bHQudGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignVHJhbnNhY3Rpb24gZnVuY3Rpb24gY2Fubm90IHJldHVybiBhIHByb21pc2UnKTtcblx0XHR9XG5cdFx0YWZ0ZXIucnVuKCk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSBjYXRjaCAoZXgpIHtcblx0XHRpZiAoZGIuaW5UcmFuc2FjdGlvbikge1xuXHRcdFx0dW5kby5ydW4oKTtcblx0XHRcdGlmICh1bmRvICE9PSByb2xsYmFjaykgYWZ0ZXIucnVuKCk7XG5cdFx0fVxuXHRcdHRocm93IGV4O1xuXHR9XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcbmNvbnN0IHsgZ2V0Qm9vbGVhbk9wdGlvbiwgY3BwZGIgfSA9IHJlcXVpcmUoJy4uL3V0aWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwcmFnbWEoc291cmNlLCBvcHRpb25zKSB7XG5cdGlmIChvcHRpb25zID09IG51bGwpIG9wdGlvbnMgPSB7fTtcblx0aWYgKHR5cGVvZiBzb3VyY2UgIT09ICdzdHJpbmcnKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBmaXJzdCBhcmd1bWVudCB0byBiZSBhIHN0cmluZycpO1xuXHRpZiAodHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBzZWNvbmQgYXJndW1lbnQgdG8gYmUgYW4gb3B0aW9ucyBvYmplY3QnKTtcblx0Y29uc3Qgc2ltcGxlID0gZ2V0Qm9vbGVhbk9wdGlvbihvcHRpb25zLCAnc2ltcGxlJyk7XG5cblx0Y29uc3Qgc3RtdCA9IHRoaXNbY3BwZGJdLnByZXBhcmUoYFBSQUdNQSAke3NvdXJjZX1gLCB0aGlzLCB0cnVlKTtcblx0cmV0dXJuIHNpbXBsZSA/IHN0bXQucGx1Y2soKS5nZXQoKSA6IHN0bXQuYWxsKCk7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCB7IHByb21pc2lmeSB9ID0gcmVxdWlyZSgndXRpbCcpO1xuY29uc3QgeyBjcHBkYiB9ID0gcmVxdWlyZSgnLi4vdXRpbCcpO1xuY29uc3QgZnNBY2Nlc3MgPSBwcm9taXNpZnkoZnMuYWNjZXNzKTtcblxubW9kdWxlLmV4cG9ydHMgPSBhc3luYyBmdW5jdGlvbiBiYWNrdXAoZmlsZW5hbWUsIG9wdGlvbnMpIHtcblx0aWYgKG9wdGlvbnMgPT0gbnVsbCkgb3B0aW9ucyA9IHt9O1xuXG5cdC8vIFZhbGlkYXRlIGFyZ3VtZW50c1xuXHRpZiAodHlwZW9mIGZpbGVuYW1lICE9PSAnc3RyaW5nJykgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgZmlyc3QgYXJndW1lbnQgdG8gYmUgYSBzdHJpbmcnKTtcblx0aWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0JykgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgc2Vjb25kIGFyZ3VtZW50IHRvIGJlIGFuIG9wdGlvbnMgb2JqZWN0Jyk7XG5cblx0Ly8gSW50ZXJwcmV0IG9wdGlvbnNcblx0ZmlsZW5hbWUgPSBmaWxlbmFtZS50cmltKCk7XG5cdGNvbnN0IGF0dGFjaGVkTmFtZSA9ICdhdHRhY2hlZCcgaW4gb3B0aW9ucyA/IG9wdGlvbnMuYXR0YWNoZWQgOiAnbWFpbic7XG5cdGNvbnN0IGhhbmRsZXIgPSAncHJvZ3Jlc3MnIGluIG9wdGlvbnMgPyBvcHRpb25zLnByb2dyZXNzIDogbnVsbDtcblxuXHQvLyBWYWxpZGF0ZSBpbnRlcnByZXRlZCBvcHRpb25zXG5cdGlmICghZmlsZW5hbWUpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0JhY2t1cCBmaWxlbmFtZSBjYW5ub3QgYmUgYW4gZW1wdHkgc3RyaW5nJyk7XG5cdGlmIChmaWxlbmFtZSA9PT0gJzptZW1vcnk6JykgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBiYWNrdXAgZmlsZW5hbWUgXCI6bWVtb3J5OlwiJyk7XG5cdGlmICh0eXBlb2YgYXR0YWNoZWROYW1lICE9PSAnc3RyaW5nJykgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgdGhlIFwiYXR0YWNoZWRcIiBvcHRpb24gdG8gYmUgYSBzdHJpbmcnKTtcblx0aWYgKCFhdHRhY2hlZE5hbWUpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImF0dGFjaGVkXCIgb3B0aW9uIGNhbm5vdCBiZSBhbiBlbXB0eSBzdHJpbmcnKTtcblx0aWYgKGhhbmRsZXIgIT0gbnVsbCAmJiB0eXBlb2YgaGFuZGxlciAhPT0gJ2Z1bmN0aW9uJykgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgdGhlIFwicHJvZ3Jlc3NcIiBvcHRpb24gdG8gYmUgYSBmdW5jdGlvbicpO1xuXG5cdC8vIE1ha2Ugc3VyZSB0aGUgc3BlY2lmaWVkIGRpcmVjdG9yeSBleGlzdHNcblx0YXdhaXQgZnNBY2Nlc3MocGF0aC5kaXJuYW1lKGZpbGVuYW1lKSkuY2F0Y2goKCkgPT4ge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBzYXZlIGJhY2t1cCBiZWNhdXNlIHRoZSBkaXJlY3RvcnkgZG9lcyBub3QgZXhpc3QnKTtcblx0fSk7XG5cblx0Y29uc3QgaXNOZXdGaWxlID0gYXdhaXQgZnNBY2Nlc3MoZmlsZW5hbWUpLnRoZW4oKCkgPT4gZmFsc2UsICgpID0+IHRydWUpO1xuXHRyZXR1cm4gcnVuQmFja3VwKHRoaXNbY3BwZGJdLmJhY2t1cCh0aGlzLCBhdHRhY2hlZE5hbWUsIGZpbGVuYW1lLCBpc05ld0ZpbGUpLCBoYW5kbGVyIHx8IG51bGwpO1xufTtcblxuY29uc3QgcnVuQmFja3VwID0gKGJhY2t1cCwgaGFuZGxlcikgPT4ge1xuXHRsZXQgcmF0ZSA9IDA7XG5cdGxldCB1c2VEZWZhdWx0ID0gdHJ1ZTtcblxuXHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdHNldEltbWVkaWF0ZShmdW5jdGlvbiBzdGVwKCkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Y29uc3QgcHJvZ3Jlc3MgPSBiYWNrdXAudHJhbnNmZXIocmF0ZSk7XG5cdFx0XHRcdGlmICghcHJvZ3Jlc3MucmVtYWluaW5nUGFnZXMpIHtcblx0XHRcdFx0XHRiYWNrdXAuY2xvc2UoKTtcblx0XHRcdFx0XHRyZXNvbHZlKHByb2dyZXNzKTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHVzZURlZmF1bHQpIHtcblx0XHRcdFx0XHR1c2VEZWZhdWx0ID0gZmFsc2U7XG5cdFx0XHRcdFx0cmF0ZSA9IDEwMDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoaGFuZGxlcikge1xuXHRcdFx0XHRcdGNvbnN0IHJldCA9IGhhbmRsZXIocHJvZ3Jlc3MpO1xuXHRcdFx0XHRcdGlmIChyZXQgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0aWYgKHR5cGVvZiByZXQgPT09ICdudW1iZXInICYmIHJldCA9PT0gcmV0KSByYXRlID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMHg3ZmZmZmZmZiwgTWF0aC5yb3VuZChyZXQpKSk7XG5cdFx0XHRcdFx0XHRlbHNlIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIHByb2dyZXNzIGNhbGxiYWNrIHRvIHJldHVybiBhIG51bWJlciBvciB1bmRlZmluZWQnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0c2V0SW1tZWRpYXRlKHN0ZXApO1xuXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdGJhY2t1cC5jbG9zZSgpO1xuXHRcdFx0XHRyZWplY3QoZXJyKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcbmNvbnN0IHsgY3BwZGIgfSA9IHJlcXVpcmUoJy4uL3V0aWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZXJpYWxpemUob3B0aW9ucykge1xuXHRpZiAob3B0aW9ucyA9PSBudWxsKSBvcHRpb25zID0ge307XG5cblx0Ly8gVmFsaWRhdGUgYXJndW1lbnRzXG5cdGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGZpcnN0IGFyZ3VtZW50IHRvIGJlIGFuIG9wdGlvbnMgb2JqZWN0Jyk7XG5cblx0Ly8gSW50ZXJwcmV0IGFuZCB2YWxpZGF0ZSBvcHRpb25zXG5cdGNvbnN0IGF0dGFjaGVkTmFtZSA9ICdhdHRhY2hlZCcgaW4gb3B0aW9ucyA/IG9wdGlvbnMuYXR0YWNoZWQgOiAnbWFpbic7XG5cdGlmICh0eXBlb2YgYXR0YWNoZWROYW1lICE9PSAnc3RyaW5nJykgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgdGhlIFwiYXR0YWNoZWRcIiBvcHRpb24gdG8gYmUgYSBzdHJpbmcnKTtcblx0aWYgKCFhdHRhY2hlZE5hbWUpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImF0dGFjaGVkXCIgb3B0aW9uIGNhbm5vdCBiZSBhbiBlbXB0eSBzdHJpbmcnKTtcblxuXHRyZXR1cm4gdGhpc1tjcHBkYl0uc2VyaWFsaXplKGF0dGFjaGVkTmFtZSk7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcbmNvbnN0IHsgZ2V0Qm9vbGVhbk9wdGlvbiwgY3BwZGIgfSA9IHJlcXVpcmUoJy4uL3V0aWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVGdW5jdGlvbihuYW1lLCBvcHRpb25zLCBmbikge1xuXHQvLyBBcHBseSBkZWZhdWx0c1xuXHRpZiAob3B0aW9ucyA9PSBudWxsKSBvcHRpb25zID0ge307XG5cdGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykgeyBmbiA9IG9wdGlvbnM7IG9wdGlvbnMgPSB7fTsgfVxuXG5cdC8vIFZhbGlkYXRlIGFyZ3VtZW50c1xuXHRpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBmaXJzdCBhcmd1bWVudCB0byBiZSBhIHN0cmluZycpO1xuXHRpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBsYXN0IGFyZ3VtZW50IHRvIGJlIGEgZnVuY3Rpb24nKTtcblx0aWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0JykgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgc2Vjb25kIGFyZ3VtZW50IHRvIGJlIGFuIG9wdGlvbnMgb2JqZWN0Jyk7XG5cdGlmICghbmFtZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVXNlci1kZWZpbmVkIGZ1bmN0aW9uIG5hbWUgY2Fubm90IGJlIGFuIGVtcHR5IHN0cmluZycpO1xuXG5cdC8vIEludGVycHJldCBvcHRpb25zXG5cdGNvbnN0IHNhZmVJbnRlZ2VycyA9ICdzYWZlSW50ZWdlcnMnIGluIG9wdGlvbnMgPyArZ2V0Qm9vbGVhbk9wdGlvbihvcHRpb25zLCAnc2FmZUludGVnZXJzJykgOiAyO1xuXHRjb25zdCBkZXRlcm1pbmlzdGljID0gZ2V0Qm9vbGVhbk9wdGlvbihvcHRpb25zLCAnZGV0ZXJtaW5pc3RpYycpO1xuXHRjb25zdCBkaXJlY3RPbmx5ID0gZ2V0Qm9vbGVhbk9wdGlvbihvcHRpb25zLCAnZGlyZWN0T25seScpO1xuXHRjb25zdCB2YXJhcmdzID0gZ2V0Qm9vbGVhbk9wdGlvbihvcHRpb25zLCAndmFyYXJncycpO1xuXHRsZXQgYXJnQ291bnQgPSAtMTtcblxuXHQvLyBEZXRlcm1pbmUgYXJndW1lbnQgY291bnRcblx0aWYgKCF2YXJhcmdzKSB7XG5cdFx0YXJnQ291bnQgPSBmbi5sZW5ndGg7XG5cdFx0aWYgKCFOdW1iZXIuaXNJbnRlZ2VyKGFyZ0NvdW50KSB8fCBhcmdDb3VudCA8IDApIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGZ1bmN0aW9uLmxlbmd0aCB0byBiZSBhIHBvc2l0aXZlIGludGVnZXInKTtcblx0XHRpZiAoYXJnQ291bnQgPiAxMDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdVc2VyLWRlZmluZWQgZnVuY3Rpb25zIGNhbm5vdCBoYXZlIG1vcmUgdGhhbiAxMDAgYXJndW1lbnRzJyk7XG5cdH1cblxuXHR0aGlzW2NwcGRiXS5mdW5jdGlvbihmbiwgbmFtZSwgYXJnQ291bnQsIHNhZmVJbnRlZ2VycywgZGV0ZXJtaW5pc3RpYywgZGlyZWN0T25seSk7XG5cdHJldHVybiB0aGlzO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5jb25zdCB7IGdldEJvb2xlYW5PcHRpb24sIGNwcGRiIH0gPSByZXF1aXJlKCcuLi91dGlsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lQWdncmVnYXRlKG5hbWUsIG9wdGlvbnMpIHtcblx0Ly8gVmFsaWRhdGUgYXJndW1lbnRzXG5cdGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGZpcnN0IGFyZ3VtZW50IHRvIGJlIGEgc3RyaW5nJyk7XG5cdGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcgfHwgb3B0aW9ucyA9PT0gbnVsbCkgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgc2Vjb25kIGFyZ3VtZW50IHRvIGJlIGFuIG9wdGlvbnMgb2JqZWN0Jyk7XG5cdGlmICghbmFtZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVXNlci1kZWZpbmVkIGZ1bmN0aW9uIG5hbWUgY2Fubm90IGJlIGFuIGVtcHR5IHN0cmluZycpO1xuXG5cdC8vIEludGVycHJldCBvcHRpb25zXG5cdGNvbnN0IHN0YXJ0ID0gJ3N0YXJ0JyBpbiBvcHRpb25zID8gb3B0aW9ucy5zdGFydCA6IG51bGw7XG5cdGNvbnN0IHN0ZXAgPSBnZXRGdW5jdGlvbk9wdGlvbihvcHRpb25zLCAnc3RlcCcsIHRydWUpO1xuXHRjb25zdCBpbnZlcnNlID0gZ2V0RnVuY3Rpb25PcHRpb24ob3B0aW9ucywgJ2ludmVyc2UnLCBmYWxzZSk7XG5cdGNvbnN0IHJlc3VsdCA9IGdldEZ1bmN0aW9uT3B0aW9uKG9wdGlvbnMsICdyZXN1bHQnLCBmYWxzZSk7XG5cdGNvbnN0IHNhZmVJbnRlZ2VycyA9ICdzYWZlSW50ZWdlcnMnIGluIG9wdGlvbnMgPyArZ2V0Qm9vbGVhbk9wdGlvbihvcHRpb25zLCAnc2FmZUludGVnZXJzJykgOiAyO1xuXHRjb25zdCBkZXRlcm1pbmlzdGljID0gZ2V0Qm9vbGVhbk9wdGlvbihvcHRpb25zLCAnZGV0ZXJtaW5pc3RpYycpO1xuXHRjb25zdCBkaXJlY3RPbmx5ID0gZ2V0Qm9vbGVhbk9wdGlvbihvcHRpb25zLCAnZGlyZWN0T25seScpO1xuXHRjb25zdCB2YXJhcmdzID0gZ2V0Qm9vbGVhbk9wdGlvbihvcHRpb25zLCAndmFyYXJncycpO1xuXHRsZXQgYXJnQ291bnQgPSAtMTtcblxuXHQvLyBEZXRlcm1pbmUgYXJndW1lbnQgY291bnRcblx0aWYgKCF2YXJhcmdzKSB7XG5cdFx0YXJnQ291bnQgPSBNYXRoLm1heChnZXRMZW5ndGgoc3RlcCksIGludmVyc2UgPyBnZXRMZW5ndGgoaW52ZXJzZSkgOiAwKTtcblx0XHRpZiAoYXJnQ291bnQgPiAwKSBhcmdDb3VudCAtPSAxO1xuXHRcdGlmIChhcmdDb3VudCA+IDEwMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1VzZXItZGVmaW5lZCBmdW5jdGlvbnMgY2Fubm90IGhhdmUgbW9yZSB0aGFuIDEwMCBhcmd1bWVudHMnKTtcblx0fVxuXG5cdHRoaXNbY3BwZGJdLmFnZ3JlZ2F0ZShzdGFydCwgc3RlcCwgaW52ZXJzZSwgcmVzdWx0LCBuYW1lLCBhcmdDb3VudCwgc2FmZUludGVnZXJzLCBkZXRlcm1pbmlzdGljLCBkaXJlY3RPbmx5KTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG5jb25zdCBnZXRGdW5jdGlvbk9wdGlvbiA9IChvcHRpb25zLCBrZXksIHJlcXVpcmVkKSA9PiB7XG5cdGNvbnN0IHZhbHVlID0ga2V5IGluIG9wdGlvbnMgPyBvcHRpb25zW2tleV0gOiBudWxsO1xuXHRpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSByZXR1cm4gdmFsdWU7XG5cdGlmICh2YWx1ZSAhPSBudWxsKSB0aHJvdyBuZXcgVHlwZUVycm9yKGBFeHBlY3RlZCB0aGUgXCIke2tleX1cIiBvcHRpb24gdG8gYmUgYSBmdW5jdGlvbmApO1xuXHRpZiAocmVxdWlyZWQpIHRocm93IG5ldyBUeXBlRXJyb3IoYE1pc3NpbmcgcmVxdWlyZWQgb3B0aW9uIFwiJHtrZXl9XCJgKTtcblx0cmV0dXJuIG51bGw7XG59O1xuXG5jb25zdCBnZXRMZW5ndGggPSAoeyBsZW5ndGggfSkgPT4ge1xuXHRpZiAoTnVtYmVyLmlzSW50ZWdlcihsZW5ndGgpICYmIGxlbmd0aCA+PSAwKSByZXR1cm4gbGVuZ3RoO1xuXHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBmdW5jdGlvbi5sZW5ndGggdG8gYmUgYSBwb3NpdGl2ZSBpbnRlZ2VyJyk7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcbmNvbnN0IHsgY3BwZGIgfSA9IHJlcXVpcmUoJy4uL3V0aWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVUYWJsZShuYW1lLCBmYWN0b3J5KSB7XG5cdC8vIFZhbGlkYXRlIGFyZ3VtZW50c1xuXHRpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBmaXJzdCBhcmd1bWVudCB0byBiZSBhIHN0cmluZycpO1xuXHRpZiAoIW5hbWUpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1ZpcnR1YWwgdGFibGUgbW9kdWxlIG5hbWUgY2Fubm90IGJlIGFuIGVtcHR5IHN0cmluZycpO1xuXG5cdC8vIERldGVybWluZSB3aGV0aGVyIHRoZSBtb2R1bGUgaXMgZXBvbnltb3VzLW9ubHkgb3Igbm90XG5cdGxldCBlcG9ueW1vdXMgPSBmYWxzZTtcblx0aWYgKHR5cGVvZiBmYWN0b3J5ID09PSAnb2JqZWN0JyAmJiBmYWN0b3J5ICE9PSBudWxsKSB7XG5cdFx0ZXBvbnltb3VzID0gdHJ1ZTtcblx0XHRmYWN0b3J5ID0gZGVmZXIocGFyc2VUYWJsZURlZmluaXRpb24oZmFjdG9yeSwgJ3VzZWQnLCBuYW1lKSk7XG5cdH0gZWxzZSB7XG5cdFx0aWYgKHR5cGVvZiBmYWN0b3J5ICE9PSAnZnVuY3Rpb24nKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBzZWNvbmQgYXJndW1lbnQgdG8gYmUgYSBmdW5jdGlvbiBvciBhIHRhYmxlIGRlZmluaXRpb24gb2JqZWN0Jyk7XG5cdFx0ZmFjdG9yeSA9IHdyYXBGYWN0b3J5KGZhY3RvcnkpO1xuXHR9XG5cblx0dGhpc1tjcHBkYl0udGFibGUoZmFjdG9yeSwgbmFtZSwgZXBvbnltb3VzKTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiB3cmFwRmFjdG9yeShmYWN0b3J5KSB7XG5cdHJldHVybiBmdW5jdGlvbiB2aXJ0dWFsVGFibGVGYWN0b3J5KG1vZHVsZU5hbWUsIGRhdGFiYXNlTmFtZSwgdGFibGVOYW1lLCAuLi5hcmdzKSB7XG5cdFx0Y29uc3QgdGhpc09iamVjdCA9IHtcblx0XHRcdG1vZHVsZTogbW9kdWxlTmFtZSxcblx0XHRcdGRhdGFiYXNlOiBkYXRhYmFzZU5hbWUsXG5cdFx0XHR0YWJsZTogdGFibGVOYW1lLFxuXHRcdH07XG5cblx0XHQvLyBHZW5lcmF0ZSBhIG5ldyB0YWJsZSBkZWZpbml0aW9uIGJ5IGludm9raW5nIHRoZSBmYWN0b3J5XG5cdFx0Y29uc3QgZGVmID0gYXBwbHkuY2FsbChmYWN0b3J5LCB0aGlzT2JqZWN0LCBhcmdzKTtcblx0XHRpZiAodHlwZW9mIGRlZiAhPT0gJ29iamVjdCcgfHwgZGVmID09PSBudWxsKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBWaXJ0dWFsIHRhYmxlIG1vZHVsZSBcIiR7bW9kdWxlTmFtZX1cIiBkaWQgbm90IHJldHVybiBhIHRhYmxlIGRlZmluaXRpb24gb2JqZWN0YCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHBhcnNlVGFibGVEZWZpbml0aW9uKGRlZiwgJ3JldHVybmVkJywgbW9kdWxlTmFtZSk7XG5cdH07XG59XG5cbmZ1bmN0aW9uIHBhcnNlVGFibGVEZWZpbml0aW9uKGRlZiwgdmVyYiwgbW9kdWxlTmFtZSkge1xuXHQvLyBWYWxpZGF0ZSByZXF1aXJlZCBwcm9wZXJ0aWVzXG5cdGlmICghaGFzT3duUHJvcGVydHkuY2FsbChkZWYsICdyb3dzJykpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBWaXJ0dWFsIHRhYmxlIG1vZHVsZSBcIiR7bW9kdWxlTmFtZX1cIiAke3ZlcmJ9IGEgdGFibGUgZGVmaW5pdGlvbiB3aXRob3V0IGEgXCJyb3dzXCIgcHJvcGVydHlgKTtcblx0fVxuXHRpZiAoIWhhc093blByb3BlcnR5LmNhbGwoZGVmLCAnY29sdW1ucycpKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgVmlydHVhbCB0YWJsZSBtb2R1bGUgXCIke21vZHVsZU5hbWV9XCIgJHt2ZXJifSBhIHRhYmxlIGRlZmluaXRpb24gd2l0aG91dCBhIFwiY29sdW1uc1wiIHByb3BlcnR5YCk7XG5cdH1cblxuXHQvLyBWYWxpZGF0ZSBcInJvd3NcIiBwcm9wZXJ0eVxuXHRjb25zdCByb3dzID0gZGVmLnJvd3M7XG5cdGlmICh0eXBlb2Ygcm93cyAhPT0gJ2Z1bmN0aW9uJyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yocm93cykgIT09IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgVmlydHVhbCB0YWJsZSBtb2R1bGUgXCIke21vZHVsZU5hbWV9XCIgJHt2ZXJifSBhIHRhYmxlIGRlZmluaXRpb24gd2l0aCBhbiBpbnZhbGlkIFwicm93c1wiIHByb3BlcnR5IChzaG91bGQgYmUgYSBnZW5lcmF0b3IgZnVuY3Rpb24pYCk7XG5cdH1cblxuXHQvLyBWYWxpZGF0ZSBcImNvbHVtbnNcIiBwcm9wZXJ0eVxuXHRsZXQgY29sdW1ucyA9IGRlZi5jb2x1bW5zO1xuXHRpZiAoIUFycmF5LmlzQXJyYXkoY29sdW1ucykgfHwgIShjb2x1bW5zID0gWy4uLmNvbHVtbnNdKS5ldmVyeSh4ID0+IHR5cGVvZiB4ID09PSAnc3RyaW5nJykpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBWaXJ0dWFsIHRhYmxlIG1vZHVsZSBcIiR7bW9kdWxlTmFtZX1cIiAke3ZlcmJ9IGEgdGFibGUgZGVmaW5pdGlvbiB3aXRoIGFuIGludmFsaWQgXCJjb2x1bW5zXCIgcHJvcGVydHkgKHNob3VsZCBiZSBhbiBhcnJheSBvZiBzdHJpbmdzKWApO1xuXHR9XG5cdGlmIChjb2x1bW5zLmxlbmd0aCAhPT0gbmV3IFNldChjb2x1bW5zKS5zaXplKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgVmlydHVhbCB0YWJsZSBtb2R1bGUgXCIke21vZHVsZU5hbWV9XCIgJHt2ZXJifSBhIHRhYmxlIGRlZmluaXRpb24gd2l0aCBkdXBsaWNhdGUgY29sdW1uIG5hbWVzYCk7XG5cdH1cblx0aWYgKCFjb2x1bW5zLmxlbmd0aCkge1xuXHRcdHRocm93IG5ldyBSYW5nZUVycm9yKGBWaXJ0dWFsIHRhYmxlIG1vZHVsZSBcIiR7bW9kdWxlTmFtZX1cIiAke3ZlcmJ9IGEgdGFibGUgZGVmaW5pdGlvbiB3aXRoIHplcm8gY29sdW1uc2ApO1xuXHR9XG5cblx0Ly8gVmFsaWRhdGUgXCJwYXJhbWV0ZXJzXCIgcHJvcGVydHlcblx0bGV0IHBhcmFtZXRlcnM7XG5cdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGRlZiwgJ3BhcmFtZXRlcnMnKSkge1xuXHRcdHBhcmFtZXRlcnMgPSBkZWYucGFyYW1ldGVycztcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkocGFyYW1ldGVycykgfHwgIShwYXJhbWV0ZXJzID0gWy4uLnBhcmFtZXRlcnNdKS5ldmVyeSh4ID0+IHR5cGVvZiB4ID09PSAnc3RyaW5nJykpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYFZpcnR1YWwgdGFibGUgbW9kdWxlIFwiJHttb2R1bGVOYW1lfVwiICR7dmVyYn0gYSB0YWJsZSBkZWZpbml0aW9uIHdpdGggYW4gaW52YWxpZCBcInBhcmFtZXRlcnNcIiBwcm9wZXJ0eSAoc2hvdWxkIGJlIGFuIGFycmF5IG9mIHN0cmluZ3MpYCk7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHBhcmFtZXRlcnMgPSBpbmZlclBhcmFtZXRlcnMocm93cyk7XG5cdH1cblx0aWYgKHBhcmFtZXRlcnMubGVuZ3RoICE9PSBuZXcgU2V0KHBhcmFtZXRlcnMpLnNpemUpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBWaXJ0dWFsIHRhYmxlIG1vZHVsZSBcIiR7bW9kdWxlTmFtZX1cIiAke3ZlcmJ9IGEgdGFibGUgZGVmaW5pdGlvbiB3aXRoIGR1cGxpY2F0ZSBwYXJhbWV0ZXIgbmFtZXNgKTtcblx0fVxuXHRpZiAocGFyYW1ldGVycy5sZW5ndGggPiAzMikge1xuXHRcdHRocm93IG5ldyBSYW5nZUVycm9yKGBWaXJ0dWFsIHRhYmxlIG1vZHVsZSBcIiR7bW9kdWxlTmFtZX1cIiAke3ZlcmJ9IGEgdGFibGUgZGVmaW5pdGlvbiB3aXRoIG1vcmUgdGhhbiB0aGUgbWF4aW11bSBudW1iZXIgb2YgMzIgcGFyYW1ldGVyc2ApO1xuXHR9XG5cdGZvciAoY29uc3QgcGFyYW1ldGVyIG9mIHBhcmFtZXRlcnMpIHtcblx0XHRpZiAoY29sdW1ucy5pbmNsdWRlcyhwYXJhbWV0ZXIpKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBWaXJ0dWFsIHRhYmxlIG1vZHVsZSBcIiR7bW9kdWxlTmFtZX1cIiAke3ZlcmJ9IGEgdGFibGUgZGVmaW5pdGlvbiB3aXRoIGNvbHVtbiBcIiR7cGFyYW1ldGVyfVwiIHdoaWNoIHdhcyBhbWJpZ3VvdXNseSBkZWZpbmVkIGFzIGJvdGggYSBjb2x1bW4gYW5kIHBhcmFtZXRlcmApO1xuXHRcdH1cblx0fVxuXG5cdC8vIFZhbGlkYXRlIFwic2FmZUludGVnZXJzXCIgb3B0aW9uXG5cdGxldCBzYWZlSW50ZWdlcnMgPSAyO1xuXHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChkZWYsICdzYWZlSW50ZWdlcnMnKSkge1xuXHRcdGNvbnN0IGJvb2wgPSBkZWYuc2FmZUludGVnZXJzO1xuXHRcdGlmICh0eXBlb2YgYm9vbCAhPT0gJ2Jvb2xlYW4nKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBWaXJ0dWFsIHRhYmxlIG1vZHVsZSBcIiR7bW9kdWxlTmFtZX1cIiAke3ZlcmJ9IGEgdGFibGUgZGVmaW5pdGlvbiB3aXRoIGFuIGludmFsaWQgXCJzYWZlSW50ZWdlcnNcIiBwcm9wZXJ0eSAoc2hvdWxkIGJlIGEgYm9vbGVhbilgKTtcblx0XHR9XG5cdFx0c2FmZUludGVnZXJzID0gK2Jvb2w7XG5cdH1cblxuXHQvLyBWYWxpZGF0ZSBcImRpcmVjdE9ubHlcIiBvcHRpb25cblx0bGV0IGRpcmVjdE9ubHkgPSBmYWxzZTtcblx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZGVmLCAnZGlyZWN0T25seScpKSB7XG5cdFx0ZGlyZWN0T25seSA9IGRlZi5kaXJlY3RPbmx5O1xuXHRcdGlmICh0eXBlb2YgZGlyZWN0T25seSAhPT0gJ2Jvb2xlYW4nKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBWaXJ0dWFsIHRhYmxlIG1vZHVsZSBcIiR7bW9kdWxlTmFtZX1cIiAke3ZlcmJ9IGEgdGFibGUgZGVmaW5pdGlvbiB3aXRoIGFuIGludmFsaWQgXCJkaXJlY3RPbmx5XCIgcHJvcGVydHkgKHNob3VsZCBiZSBhIGJvb2xlYW4pYCk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gR2VuZXJhdGUgU1FMIGZvciB0aGUgdmlydHVhbCB0YWJsZSBkZWZpbml0aW9uXG5cdGNvbnN0IGNvbHVtbkRlZmluaXRpb25zID0gW1xuXHRcdC4uLnBhcmFtZXRlcnMubWFwKGlkZW50aWZpZXIpLm1hcChzdHIgPT4gYCR7c3RyfSBISURERU5gKSxcblx0XHQuLi5jb2x1bW5zLm1hcChpZGVudGlmaWVyKSxcblx0XTtcblx0cmV0dXJuIFtcblx0XHRgQ1JFQVRFIFRBQkxFIHgoJHtjb2x1bW5EZWZpbml0aW9ucy5qb2luKCcsICcpfSk7YCxcblx0XHR3cmFwR2VuZXJhdG9yKHJvd3MsIG5ldyBNYXAoY29sdW1ucy5tYXAoKHgsIGkpID0+IFt4LCBwYXJhbWV0ZXJzLmxlbmd0aCArIGldKSksIG1vZHVsZU5hbWUpLFxuXHRcdHBhcmFtZXRlcnMsXG5cdFx0c2FmZUludGVnZXJzLFxuXHRcdGRpcmVjdE9ubHksXG5cdF07XG59XG5cbmZ1bmN0aW9uIHdyYXBHZW5lcmF0b3IoZ2VuZXJhdG9yLCBjb2x1bW5NYXAsIG1vZHVsZU5hbWUpIHtcblx0cmV0dXJuIGZ1bmN0aW9uKiB2aXJ0dWFsVGFibGUoLi4uYXJncykge1xuXHRcdC8qXG5cdFx0XHRXZSBtdXN0IGRlZmVuc2l2ZWx5IGNsb25lIGFueSBidWZmZXJzIGluIHRoZSBhcmd1bWVudHMsIGJlY2F1c2Vcblx0XHRcdG90aGVyd2lzZSB0aGUgZ2VuZXJhdG9yIGNvdWxkIG11dGF0ZSBvbmUgb2YgdGhlbSwgd2hpY2ggd291bGQgY2F1c2Vcblx0XHRcdHVzIHRvIHJldHVybiBpbmNvcnJlY3QgdmFsdWVzIGZvciBoaWRkZW4gY29sdW1ucywgcG90ZW50aWFsbHlcblx0XHRcdGNvcnJ1cHRpbmcgdGhlIGRhdGFiYXNlLlxuXHRcdCAqL1xuXHRcdGNvbnN0IG91dHB1dCA9IGFyZ3MubWFwKHggPT4gQnVmZmVyLmlzQnVmZmVyKHgpID8gQnVmZmVyLmZyb20oeCkgOiB4KTtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGNvbHVtbk1hcC5zaXplOyArK2kpIHtcblx0XHRcdG91dHB1dC5wdXNoKG51bGwpOyAvLyBGaWxsIHdpdGggbnVsbHMgdG8gcHJldmVudCBnYXBzIGluIGFycmF5ICh2OCBvcHRpbWl6YXRpb24pXG5cdFx0fVxuXHRcdGZvciAoY29uc3Qgcm93IG9mIGdlbmVyYXRvciguLi5hcmdzKSkge1xuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkocm93KSkge1xuXHRcdFx0XHRleHRyYWN0Um93QXJyYXkocm93LCBvdXRwdXQsIGNvbHVtbk1hcC5zaXplLCBtb2R1bGVOYW1lKTtcblx0XHRcdFx0eWllbGQgb3V0cHV0O1xuXHRcdFx0fSBlbHNlIGlmICh0eXBlb2Ygcm93ID09PSAnb2JqZWN0JyAmJiByb3cgIT09IG51bGwpIHtcblx0XHRcdFx0ZXh0cmFjdFJvd09iamVjdChyb3csIG91dHB1dCwgY29sdW1uTWFwLCBtb2R1bGVOYW1lKTtcblx0XHRcdFx0eWllbGQgb3V0cHV0O1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgVmlydHVhbCB0YWJsZSBtb2R1bGUgXCIke21vZHVsZU5hbWV9XCIgeWllbGRlZCBzb21ldGhpbmcgdGhhdCBpc24ndCBhIHZhbGlkIHJvdyBvYmplY3RgKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59XG5cbmZ1bmN0aW9uIGV4dHJhY3RSb3dBcnJheShyb3csIG91dHB1dCwgY29sdW1uQ291bnQsIG1vZHVsZU5hbWUpIHtcblx0aWYgKHJvdy5sZW5ndGggIT09IGNvbHVtbkNvdW50KSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgVmlydHVhbCB0YWJsZSBtb2R1bGUgXCIke21vZHVsZU5hbWV9XCIgeWllbGRlZCBhIHJvdyB3aXRoIGFuIGluY29ycmVjdCBudW1iZXIgb2YgY29sdW1uc2ApO1xuXHR9XG5cdGNvbnN0IG9mZnNldCA9IG91dHB1dC5sZW5ndGggLSBjb2x1bW5Db3VudDtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjb2x1bW5Db3VudDsgKytpKSB7XG5cdFx0b3V0cHV0W2kgKyBvZmZzZXRdID0gcm93W2ldO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGV4dHJhY3RSb3dPYmplY3Qocm93LCBvdXRwdXQsIGNvbHVtbk1hcCwgbW9kdWxlTmFtZSkge1xuXHRsZXQgY291bnQgPSAwO1xuXHRmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhyb3cpKSB7XG5cdFx0Y29uc3QgaW5kZXggPSBjb2x1bW5NYXAuZ2V0KGtleSk7XG5cdFx0aWYgKGluZGV4ID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYFZpcnR1YWwgdGFibGUgbW9kdWxlIFwiJHttb2R1bGVOYW1lfVwiIHlpZWxkZWQgYSByb3cgd2l0aCBhbiB1bmRlY2xhcmVkIGNvbHVtbiBcIiR7a2V5fVwiYCk7XG5cdFx0fVxuXHRcdG91dHB1dFtpbmRleF0gPSByb3dba2V5XTtcblx0XHRjb3VudCArPSAxO1xuXHR9XG5cdGlmIChjb3VudCAhPT0gY29sdW1uTWFwLnNpemUpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBWaXJ0dWFsIHRhYmxlIG1vZHVsZSBcIiR7bW9kdWxlTmFtZX1cIiB5aWVsZGVkIGEgcm93IHdpdGggbWlzc2luZyBjb2x1bW5zYCk7XG5cdH1cbn1cblxuZnVuY3Rpb24gaW5mZXJQYXJhbWV0ZXJzKHsgbGVuZ3RoIH0pIHtcblx0aWYgKCFOdW1iZXIuaXNJbnRlZ2VyKGxlbmd0aCkgfHwgbGVuZ3RoIDwgMCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGZ1bmN0aW9uLmxlbmd0aCB0byBiZSBhIHBvc2l0aXZlIGludGVnZXInKTtcblx0fVxuXHRjb25zdCBwYXJhbXMgPSBbXTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuXHRcdHBhcmFtcy5wdXNoKGAkJHtpICsgMX1gKTtcblx0fVxuXHRyZXR1cm4gcGFyYW1zO1xufVxuXG5jb25zdCB7IGhhc093blByb3BlcnR5IH0gPSBPYmplY3QucHJvdG90eXBlO1xuY29uc3QgeyBhcHBseSB9ID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuY29uc3QgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoZnVuY3Rpb24qKCl7fSk7XG5jb25zdCBpZGVudGlmaWVyID0gc3RyID0+IGBcIiR7c3RyLnJlcGxhY2UoL1wiL2csICdcIlwiJyl9XCJgO1xuY29uc3QgZGVmZXIgPSB4ID0+ICgpID0+IHg7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuY29uc3QgRGF0YWJhc2VJbnNwZWN0aW9uID0gZnVuY3Rpb24gRGF0YWJhc2UoKSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbnNwZWN0KGRlcHRoLCBvcHRzKSB7XG5cdHJldHVybiBPYmplY3QuYXNzaWduKG5ldyBEYXRhYmFzZUluc3BlY3Rpb24oKSwgdGhpcyk7XG59O1xuXG4iLCAiJ3VzZSBzdHJpY3QnO1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcbmNvbnN0IFNxbGl0ZUVycm9yID0gcmVxdWlyZSgnLi9zcWxpdGUtZXJyb3InKTtcblxubGV0IERFRkFVTFRfQURET047XG5cbmZ1bmN0aW9uIERhdGFiYXNlKGZpbGVuYW1lR2l2ZW4sIG9wdGlvbnMpIHtcblx0aWYgKG5ldy50YXJnZXQgPT0gbnVsbCkge1xuXHRcdHJldHVybiBuZXcgRGF0YWJhc2UoZmlsZW5hbWVHaXZlbiwgb3B0aW9ucyk7XG5cdH1cblxuXHQvLyBBcHBseSBkZWZhdWx0c1xuXHRsZXQgYnVmZmVyO1xuXHRpZiAoQnVmZmVyLmlzQnVmZmVyKGZpbGVuYW1lR2l2ZW4pKSB7XG5cdFx0YnVmZmVyID0gZmlsZW5hbWVHaXZlbjtcblx0XHRmaWxlbmFtZUdpdmVuID0gJzptZW1vcnk6Jztcblx0fVxuXHRpZiAoZmlsZW5hbWVHaXZlbiA9PSBudWxsKSBmaWxlbmFtZUdpdmVuID0gJyc7XG5cdGlmIChvcHRpb25zID09IG51bGwpIG9wdGlvbnMgPSB7fTtcblxuXHQvLyBWYWxpZGF0ZSBhcmd1bWVudHNcblx0aWYgKHR5cGVvZiBmaWxlbmFtZUdpdmVuICE9PSAnc3RyaW5nJykgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgZmlyc3QgYXJndW1lbnQgdG8gYmUgYSBzdHJpbmcnKTtcblx0aWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0JykgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgc2Vjb25kIGFyZ3VtZW50IHRvIGJlIGFuIG9wdGlvbnMgb2JqZWN0Jyk7XG5cdGlmICgncmVhZE9ubHknIGluIG9wdGlvbnMpIHRocm93IG5ldyBUeXBlRXJyb3IoJ01pc3NwZWxsZWQgb3B0aW9uIFwicmVhZE9ubHlcIiBzaG91bGQgYmUgXCJyZWFkb25seVwiJyk7XG5cdGlmICgnbWVtb3J5JyBpbiBvcHRpb25zKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdPcHRpb24gXCJtZW1vcnlcIiB3YXMgcmVtb3ZlZCBpbiB2Ny4wLjAgKHVzZSBcIjptZW1vcnk6XCIgZmlsZW5hbWUgaW5zdGVhZCknKTtcblxuXHQvLyBJbnRlcnByZXQgb3B0aW9uc1xuXHRjb25zdCBmaWxlbmFtZSA9IGZpbGVuYW1lR2l2ZW4udHJpbSgpO1xuXHRjb25zdCBhbm9ueW1vdXMgPSBmaWxlbmFtZSA9PT0gJycgfHwgZmlsZW5hbWUgPT09ICc6bWVtb3J5Oic7XG5cdGNvbnN0IHJlYWRvbmx5ID0gdXRpbC5nZXRCb29sZWFuT3B0aW9uKG9wdGlvbnMsICdyZWFkb25seScpO1xuXHRjb25zdCBmaWxlTXVzdEV4aXN0ID0gdXRpbC5nZXRCb29sZWFuT3B0aW9uKG9wdGlvbnMsICdmaWxlTXVzdEV4aXN0Jyk7XG5cdGNvbnN0IHRpbWVvdXQgPSAndGltZW91dCcgaW4gb3B0aW9ucyA/IG9wdGlvbnMudGltZW91dCA6IDUwMDA7XG5cdGNvbnN0IHZlcmJvc2UgPSAndmVyYm9zZScgaW4gb3B0aW9ucyA/IG9wdGlvbnMudmVyYm9zZSA6IG51bGw7XG5cdGNvbnN0IG5hdGl2ZUJpbmRpbmcgPSAnbmF0aXZlQmluZGluZycgaW4gb3B0aW9ucyA/IG9wdGlvbnMubmF0aXZlQmluZGluZyA6IG51bGw7XG5cblx0Ly8gVmFsaWRhdGUgaW50ZXJwcmV0ZWQgb3B0aW9uc1xuXHRpZiAocmVhZG9ubHkgJiYgYW5vbnltb3VzICYmICFidWZmZXIpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0luLW1lbW9yeS90ZW1wb3JhcnkgZGF0YWJhc2VzIGNhbm5vdCBiZSByZWFkb25seScpO1xuXHRpZiAoIU51bWJlci5pc0ludGVnZXIodGltZW91dCkgfHwgdGltZW91dCA8IDApIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIHRoZSBcInRpbWVvdXRcIiBvcHRpb24gdG8gYmUgYSBwb3NpdGl2ZSBpbnRlZ2VyJyk7XG5cdGlmICh0aW1lb3V0ID4gMHg3ZmZmZmZmZikgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ09wdGlvbiBcInRpbWVvdXRcIiBjYW5ub3QgYmUgZ3JlYXRlciB0aGFuIDIxNDc0ODM2NDcnKTtcblx0aWYgKHZlcmJvc2UgIT0gbnVsbCAmJiB0eXBlb2YgdmVyYm9zZSAhPT0gJ2Z1bmN0aW9uJykgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgdGhlIFwidmVyYm9zZVwiIG9wdGlvbiB0byBiZSBhIGZ1bmN0aW9uJyk7XG5cdGlmIChuYXRpdmVCaW5kaW5nICE9IG51bGwgJiYgdHlwZW9mIG5hdGl2ZUJpbmRpbmcgIT09ICdzdHJpbmcnICYmIHR5cGVvZiBuYXRpdmVCaW5kaW5nICE9PSAnb2JqZWN0JykgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgdGhlIFwibmF0aXZlQmluZGluZ1wiIG9wdGlvbiB0byBiZSBhIHN0cmluZyBvciBhZGRvbiBvYmplY3QnKTtcblxuXHQvLyBMb2FkIHRoZSBuYXRpdmUgYWRkb25cblx0bGV0IGFkZG9uO1xuXHRpZiAobmF0aXZlQmluZGluZyA9PSBudWxsKSB7XG5cdFx0YWRkb24gPSBERUZBVUxUX0FERE9OIHx8IChERUZBVUxUX0FERE9OID0gcmVxdWlyZSgnYmluZGluZ3MnKSgnYmV0dGVyX3NxbGl0ZTMubm9kZScpKTtcblx0fSBlbHNlIGlmICh0eXBlb2YgbmF0aXZlQmluZGluZyA9PT0gJ3N0cmluZycpIHtcblx0XHQvLyBTZWUgPGh0dHBzOi8vd2VicGFjay5qcy5vcmcvYXBpL21vZHVsZS12YXJpYWJsZXMvI19fbm9uX3dlYnBhY2tfcmVxdWlyZV9fLXdlYnBhY2stc3BlY2lmaWM+XG5cdFx0Y29uc3QgcmVxdWlyZUZ1bmMgPSB0eXBlb2YgX19ub25fd2VicGFja19yZXF1aXJlX18gPT09ICdmdW5jdGlvbicgPyBfX25vbl93ZWJwYWNrX3JlcXVpcmVfXyA6IHJlcXVpcmU7XG5cdFx0YWRkb24gPSByZXF1aXJlRnVuYyhwYXRoLnJlc29sdmUobmF0aXZlQmluZGluZykucmVwbGFjZSgvKFxcLm5vZGUpPyQvLCAnLm5vZGUnKSk7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gU2VlIDxodHRwczovL2dpdGh1Yi5jb20vV2lzZUxpYnMvYmV0dGVyLXNxbGl0ZTMvaXNzdWVzLzk3Mj5cblx0XHRhZGRvbiA9IG5hdGl2ZUJpbmRpbmc7XG5cdH1cblxuXHRpZiAoIWFkZG9uLmlzSW5pdGlhbGl6ZWQpIHtcblx0XHRhZGRvbi5zZXRFcnJvckNvbnN0cnVjdG9yKFNxbGl0ZUVycm9yKTtcblx0XHRhZGRvbi5pc0luaXRpYWxpemVkID0gdHJ1ZTtcblx0fVxuXG5cdC8vIE1ha2Ugc3VyZSB0aGUgc3BlY2lmaWVkIGRpcmVjdG9yeSBleGlzdHNcblx0aWYgKCFhbm9ueW1vdXMgJiYgIWZpbGVuYW1lLnN0YXJ0c1dpdGgoJ2ZpbGU6JykgJiYgIWZzLmV4aXN0c1N5bmMocGF0aC5kaXJuYW1lKGZpbGVuYW1lKSkpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3Qgb3BlbiBkYXRhYmFzZSBiZWNhdXNlIHRoZSBkaXJlY3RvcnkgZG9lcyBub3QgZXhpc3QnKTtcblx0fVxuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcblx0XHRbdXRpbC5jcHBkYl06IHsgdmFsdWU6IG5ldyBhZGRvbi5EYXRhYmFzZShmaWxlbmFtZSwgZmlsZW5hbWVHaXZlbiwgYW5vbnltb3VzLCByZWFkb25seSwgZmlsZU11c3RFeGlzdCwgdGltZW91dCwgdmVyYm9zZSB8fCBudWxsLCBidWZmZXIgfHwgbnVsbCkgfSxcblx0XHQuLi53cmFwcGVycy5nZXR0ZXJzLFxuXHR9KTtcbn1cblxuY29uc3Qgd3JhcHBlcnMgPSByZXF1aXJlKCcuL21ldGhvZHMvd3JhcHBlcnMnKTtcbkRhdGFiYXNlLnByb3RvdHlwZS5wcmVwYXJlID0gd3JhcHBlcnMucHJlcGFyZTtcbkRhdGFiYXNlLnByb3RvdHlwZS50cmFuc2FjdGlvbiA9IHJlcXVpcmUoJy4vbWV0aG9kcy90cmFuc2FjdGlvbicpO1xuRGF0YWJhc2UucHJvdG90eXBlLnByYWdtYSA9IHJlcXVpcmUoJy4vbWV0aG9kcy9wcmFnbWEnKTtcbkRhdGFiYXNlLnByb3RvdHlwZS5iYWNrdXAgPSByZXF1aXJlKCcuL21ldGhvZHMvYmFja3VwJyk7XG5EYXRhYmFzZS5wcm90b3R5cGUuc2VyaWFsaXplID0gcmVxdWlyZSgnLi9tZXRob2RzL3NlcmlhbGl6ZScpO1xuRGF0YWJhc2UucHJvdG90eXBlLmZ1bmN0aW9uID0gcmVxdWlyZSgnLi9tZXRob2RzL2Z1bmN0aW9uJyk7XG5EYXRhYmFzZS5wcm90b3R5cGUuYWdncmVnYXRlID0gcmVxdWlyZSgnLi9tZXRob2RzL2FnZ3JlZ2F0ZScpO1xuRGF0YWJhc2UucHJvdG90eXBlLnRhYmxlID0gcmVxdWlyZSgnLi9tZXRob2RzL3RhYmxlJyk7XG5EYXRhYmFzZS5wcm90b3R5cGUubG9hZEV4dGVuc2lvbiA9IHdyYXBwZXJzLmxvYWRFeHRlbnNpb247XG5EYXRhYmFzZS5wcm90b3R5cGUuZXhlYyA9IHdyYXBwZXJzLmV4ZWM7XG5EYXRhYmFzZS5wcm90b3R5cGUuY2xvc2UgPSB3cmFwcGVycy5jbG9zZTtcbkRhdGFiYXNlLnByb3RvdHlwZS5kZWZhdWx0U2FmZUludGVnZXJzID0gd3JhcHBlcnMuZGVmYXVsdFNhZmVJbnRlZ2VycztcbkRhdGFiYXNlLnByb3RvdHlwZS51bnNhZmVNb2RlID0gd3JhcHBlcnMudW5zYWZlTW9kZTtcbkRhdGFiYXNlLnByb3RvdHlwZVt1dGlsLmluc3BlY3RdID0gcmVxdWlyZSgnLi9tZXRob2RzL2luc3BlY3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBEYXRhYmFzZTtcbiIsICIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGF0YWJhc2UnKTtcbm1vZHVsZS5leHBvcnRzLlNxbGl0ZUVycm9yID0gcmVxdWlyZSgnLi9zcWxpdGUtZXJyb3InKTtcbiIsICJ2YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGtpbmRPZih2YWwpIHtcbiAgaWYgKHZhbCA9PT0gdm9pZCAwKSByZXR1cm4gJ3VuZGVmaW5lZCc7XG4gIGlmICh2YWwgPT09IG51bGwpIHJldHVybiAnbnVsbCc7XG5cbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsO1xuICBpZiAodHlwZSA9PT0gJ2Jvb2xlYW4nKSByZXR1cm4gJ2Jvb2xlYW4nO1xuICBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHJldHVybiAnc3RyaW5nJztcbiAgaWYgKHR5cGUgPT09ICdudW1iZXInKSByZXR1cm4gJ251bWJlcic7XG4gIGlmICh0eXBlID09PSAnc3ltYm9sJykgcmV0dXJuICdzeW1ib2wnO1xuICBpZiAodHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBpc0dlbmVyYXRvckZuKHZhbCkgPyAnZ2VuZXJhdG9yZnVuY3Rpb24nIDogJ2Z1bmN0aW9uJztcbiAgfVxuXG4gIGlmIChpc0FycmF5KHZhbCkpIHJldHVybiAnYXJyYXknO1xuICBpZiAoaXNCdWZmZXIodmFsKSkgcmV0dXJuICdidWZmZXInO1xuICBpZiAoaXNBcmd1bWVudHModmFsKSkgcmV0dXJuICdhcmd1bWVudHMnO1xuICBpZiAoaXNEYXRlKHZhbCkpIHJldHVybiAnZGF0ZSc7XG4gIGlmIChpc0Vycm9yKHZhbCkpIHJldHVybiAnZXJyb3InO1xuICBpZiAoaXNSZWdleHAodmFsKSkgcmV0dXJuICdyZWdleHAnO1xuXG4gIHN3aXRjaCAoY3Rvck5hbWUodmFsKSkge1xuICAgIGNhc2UgJ1N5bWJvbCc6IHJldHVybiAnc3ltYm9sJztcbiAgICBjYXNlICdQcm9taXNlJzogcmV0dXJuICdwcm9taXNlJztcblxuICAgIC8vIFNldCwgTWFwLCBXZWFrU2V0LCBXZWFrTWFwXG4gICAgY2FzZSAnV2Vha01hcCc6IHJldHVybiAnd2Vha21hcCc7XG4gICAgY2FzZSAnV2Vha1NldCc6IHJldHVybiAnd2Vha3NldCc7XG4gICAgY2FzZSAnTWFwJzogcmV0dXJuICdtYXAnO1xuICAgIGNhc2UgJ1NldCc6IHJldHVybiAnc2V0JztcblxuICAgIC8vIDgtYml0IHR5cGVkIGFycmF5c1xuICAgIGNhc2UgJ0ludDhBcnJheSc6IHJldHVybiAnaW50OGFycmF5JztcbiAgICBjYXNlICdVaW50OEFycmF5JzogcmV0dXJuICd1aW50OGFycmF5JztcbiAgICBjYXNlICdVaW50OENsYW1wZWRBcnJheSc6IHJldHVybiAndWludDhjbGFtcGVkYXJyYXknO1xuXG4gICAgLy8gMTYtYml0IHR5cGVkIGFycmF5c1xuICAgIGNhc2UgJ0ludDE2QXJyYXknOiByZXR1cm4gJ2ludDE2YXJyYXknO1xuICAgIGNhc2UgJ1VpbnQxNkFycmF5JzogcmV0dXJuICd1aW50MTZhcnJheSc7XG5cbiAgICAvLyAzMi1iaXQgdHlwZWQgYXJyYXlzXG4gICAgY2FzZSAnSW50MzJBcnJheSc6IHJldHVybiAnaW50MzJhcnJheSc7XG4gICAgY2FzZSAnVWludDMyQXJyYXknOiByZXR1cm4gJ3VpbnQzMmFycmF5JztcbiAgICBjYXNlICdGbG9hdDMyQXJyYXknOiByZXR1cm4gJ2Zsb2F0MzJhcnJheSc7XG4gICAgY2FzZSAnRmxvYXQ2NEFycmF5JzogcmV0dXJuICdmbG9hdDY0YXJyYXknO1xuICB9XG5cbiAgaWYgKGlzR2VuZXJhdG9yT2JqKHZhbCkpIHtcbiAgICByZXR1cm4gJ2dlbmVyYXRvcic7XG4gIH1cblxuICAvLyBOb24tcGxhaW4gb2JqZWN0c1xuICB0eXBlID0gdG9TdHJpbmcuY2FsbCh2YWwpO1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICdbb2JqZWN0IE9iamVjdF0nOiByZXR1cm4gJ29iamVjdCc7XG4gICAgLy8gaXRlcmF0b3JzXG4gICAgY2FzZSAnW29iamVjdCBNYXAgSXRlcmF0b3JdJzogcmV0dXJuICdtYXBpdGVyYXRvcic7XG4gICAgY2FzZSAnW29iamVjdCBTZXQgSXRlcmF0b3JdJzogcmV0dXJuICdzZXRpdGVyYXRvcic7XG4gICAgY2FzZSAnW29iamVjdCBTdHJpbmcgSXRlcmF0b3JdJzogcmV0dXJuICdzdHJpbmdpdGVyYXRvcic7XG4gICAgY2FzZSAnW29iamVjdCBBcnJheSBJdGVyYXRvcl0nOiByZXR1cm4gJ2FycmF5aXRlcmF0b3InO1xuICB9XG5cbiAgLy8gb3RoZXJcbiAgcmV0dXJuIHR5cGUuc2xpY2UoOCwgLTEpLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzL2csICcnKTtcbn07XG5cbmZ1bmN0aW9uIGN0b3JOYW1lKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbC5jb25zdHJ1Y3RvciA9PT0gJ2Z1bmN0aW9uJyA/IHZhbC5jb25zdHJ1Y3Rvci5uYW1lIDogbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNBcnJheSh2YWwpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkpIHJldHVybiBBcnJheS5pc0FycmF5KHZhbCk7XG4gIHJldHVybiB2YWwgaW5zdGFuY2VvZiBBcnJheTtcbn1cblxuZnVuY3Rpb24gaXNFcnJvcih2YWwpIHtcbiAgcmV0dXJuIHZhbCBpbnN0YW5jZW9mIEVycm9yIHx8ICh0eXBlb2YgdmFsLm1lc3NhZ2UgPT09ICdzdHJpbmcnICYmIHZhbC5jb25zdHJ1Y3RvciAmJiB0eXBlb2YgdmFsLmNvbnN0cnVjdG9yLnN0YWNrVHJhY2VMaW1pdCA9PT0gJ251bWJlcicpO1xufVxuXG5mdW5jdGlvbiBpc0RhdGUodmFsKSB7XG4gIGlmICh2YWwgaW5zdGFuY2VvZiBEYXRlKSByZXR1cm4gdHJ1ZTtcbiAgcmV0dXJuIHR5cGVvZiB2YWwudG9EYXRlU3RyaW5nID09PSAnZnVuY3Rpb24nXG4gICAgJiYgdHlwZW9mIHZhbC5nZXREYXRlID09PSAnZnVuY3Rpb24nXG4gICAgJiYgdHlwZW9mIHZhbC5zZXREYXRlID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBpc1JlZ2V4cCh2YWwpIHtcbiAgaWYgKHZhbCBpbnN0YW5jZW9mIFJlZ0V4cCkgcmV0dXJuIHRydWU7XG4gIHJldHVybiB0eXBlb2YgdmFsLmZsYWdzID09PSAnc3RyaW5nJ1xuICAgICYmIHR5cGVvZiB2YWwuaWdub3JlQ2FzZSA9PT0gJ2Jvb2xlYW4nXG4gICAgJiYgdHlwZW9mIHZhbC5tdWx0aWxpbmUgPT09ICdib29sZWFuJ1xuICAgICYmIHR5cGVvZiB2YWwuZ2xvYmFsID09PSAnYm9vbGVhbic7XG59XG5cbmZ1bmN0aW9uIGlzR2VuZXJhdG9yRm4obmFtZSwgdmFsKSB7XG4gIHJldHVybiBjdG9yTmFtZShuYW1lKSA9PT0gJ0dlbmVyYXRvckZ1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaXNHZW5lcmF0b3JPYmoodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsLnRocm93ID09PSAnZnVuY3Rpb24nXG4gICAgJiYgdHlwZW9mIHZhbC5yZXR1cm4gPT09ICdmdW5jdGlvbidcbiAgICAmJiB0eXBlb2YgdmFsLm5leHQgPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzQXJndW1lbnRzKHZhbCkge1xuICB0cnkge1xuICAgIGlmICh0eXBlb2YgdmFsLmxlbmd0aCA9PT0gJ251bWJlcicgJiYgdHlwZW9mIHZhbC5jYWxsZWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgaWYgKGVyci5tZXNzYWdlLmluZGV4T2YoJ2NhbGxlZScpICE9PSAtMSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBJZiB5b3UgbmVlZCB0byBzdXBwb3J0IFNhZmFyaSA1LTcgKDgtMTAgeXItb2xkIGJyb3dzZXIpLFxuICogdGFrZSBhIGxvb2sgYXQgaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9pcy1idWZmZXJcbiAqL1xuXG5mdW5jdGlvbiBpc0J1ZmZlcih2YWwpIHtcbiAgaWYgKHZhbC5jb25zdHJ1Y3RvciAmJiB0eXBlb2YgdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcih2YWwpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbiIsICIvKiFcbiAqIGlzLWV4dGVuZGFibGUgPGh0dHBzOi8vZ2l0aHViLmNvbS9qb25zY2hsaW5rZXJ0L2lzLWV4dGVuZGFibGU+XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE1LCBKb24gU2NobGlua2VydC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNFeHRlbmRhYmxlKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsICE9PSBudWxsXG4gICAgJiYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnIHx8IHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJ2lzLWV4dGVuZGFibGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBleHRlbmQoby8qLCBvYmplY3RzKi8pIHtcbiAgaWYgKCFpc09iamVjdChvKSkgeyBvID0ge307IH1cblxuICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBsZW47IGkrKykge1xuICAgIHZhciBvYmogPSBhcmd1bWVudHNbaV07XG5cbiAgICBpZiAoaXNPYmplY3Qob2JqKSkge1xuICAgICAgYXNzaWduKG8sIG9iaik7XG4gICAgfVxuICB9XG4gIHJldHVybiBvO1xufTtcblxuZnVuY3Rpb24gYXNzaWduKGEsIGIpIHtcbiAgZm9yICh2YXIga2V5IGluIGIpIHtcbiAgICBpZiAoaGFzT3duKGIsIGtleSkpIHtcbiAgICAgIGFba2V5XSA9IGJba2V5XTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIGBrZXlgIGlzIGFuIG93biBwcm9wZXJ0eSBvZiBgb2JqYC5cbiAqL1xuXG5mdW5jdGlvbiBoYXNPd24ob2JqLCBrZXkpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSk7XG59XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdHlwZU9mID0gcmVxdWlyZSgna2luZC1vZicpO1xudmFyIGV4dGVuZCA9IHJlcXVpcmUoJ2V4dGVuZC1zaGFsbG93Jyk7XG5cbi8qKlxuICogUGFyc2Ugc2VjdGlvbnMgaW4gYGlucHV0YCB3aXRoIHRoZSBnaXZlbiBgb3B0aW9uc2AuXG4gKlxuICogYGBganNcbiAqIHZhciBzZWN0aW9ucyA9IHJlcXVpcmUoJ3slPSBuYW1lICV9Jyk7XG4gKiB2YXIgcmVzdWx0ID0gc2VjdGlvbnMoaW5wdXQsIG9wdGlvbnMpO1xuICogLy8geyBjb250ZW50OiAnQ29udGVudCBiZWZvcmUgc2VjdGlvbnMnLCBzZWN0aW9uczogW10gfVxuICogYGBgXG4gKiBAcGFyYW0ge1N0cmluZ3xCdWZmZXJ8T2JqZWN0fSBgaW5wdXRgIElmIGlucHV0IGlzIGFuIG9iamVjdCwgaXQncyBgY29udGVudGAgcHJvcGVydHkgbXVzdCBiZSBhIHN0cmluZyBvciBidWZmZXIuXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHJldHVybiB7T2JqZWN0fSBSZXR1cm5zIGFuIG9iamVjdCB3aXRoIGEgYGNvbnRlbnRgIHN0cmluZyBhbmQgYW4gYXJyYXkgb2YgYHNlY3Rpb25zYCBvYmplY3RzLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGlucHV0LCBvcHRpb25zKSB7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIG9wdGlvbnMgPSB7IHBhcnNlOiBvcHRpb25zIH07XG4gIH1cblxuICB2YXIgZmlsZSA9IHRvT2JqZWN0KGlucHV0KTtcbiAgdmFyIGRlZmF1bHRzID0ge3NlY3Rpb25fZGVsaW1pdGVyOiAnLS0tJywgcGFyc2U6IGlkZW50aXR5fTtcbiAgdmFyIG9wdHMgPSBleHRlbmQoe30sIGRlZmF1bHRzLCBvcHRpb25zKTtcbiAgdmFyIGRlbGltID0gb3B0cy5zZWN0aW9uX2RlbGltaXRlcjtcbiAgdmFyIGxpbmVzID0gZmlsZS5jb250ZW50LnNwbGl0KC9cXHI/XFxuLyk7XG4gIHZhciBzZWN0aW9ucyA9IG51bGw7XG4gIHZhciBzZWN0aW9uID0gY3JlYXRlU2VjdGlvbigpO1xuICB2YXIgY29udGVudCA9IFtdO1xuICB2YXIgc3RhY2sgPSBbXTtcblxuICBmdW5jdGlvbiBpbml0U2VjdGlvbnModmFsKSB7XG4gICAgZmlsZS5jb250ZW50ID0gdmFsO1xuICAgIHNlY3Rpb25zID0gW107XG4gICAgY29udGVudCA9IFtdO1xuICB9XG5cbiAgZnVuY3Rpb24gY2xvc2VTZWN0aW9uKHZhbCkge1xuICAgIGlmIChzdGFjay5sZW5ndGgpIHtcbiAgICAgIHNlY3Rpb24ua2V5ID0gZ2V0S2V5KHN0YWNrWzBdLCBkZWxpbSk7XG4gICAgICBzZWN0aW9uLmNvbnRlbnQgPSB2YWw7XG4gICAgICBvcHRzLnBhcnNlKHNlY3Rpb24sIHNlY3Rpb25zKTtcbiAgICAgIHNlY3Rpb25zLnB1c2goc2VjdGlvbik7XG4gICAgICBzZWN0aW9uID0gY3JlYXRlU2VjdGlvbigpO1xuICAgICAgY29udGVudCA9IFtdO1xuICAgICAgc3RhY2sgPSBbXTtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGxpbmUgPSBsaW5lc1tpXTtcbiAgICB2YXIgbGVuID0gc3RhY2subGVuZ3RoO1xuICAgIHZhciBsbiA9IGxpbmUudHJpbSgpO1xuXG4gICAgaWYgKGlzRGVsaW1pdGVyKGxuLCBkZWxpbSkpIHtcbiAgICAgIGlmIChsbi5sZW5ndGggPT09IDMgJiYgaSAhPT0gMCkge1xuICAgICAgICBpZiAobGVuID09PSAwIHx8IGxlbiA9PT0gMikge1xuICAgICAgICAgIGNvbnRlbnQucHVzaChsaW5lKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBzdGFjay5wdXNoKGxuKTtcbiAgICAgICAgc2VjdGlvbi5kYXRhID0gY29udGVudC5qb2luKCdcXG4nKTtcbiAgICAgICAgY29udGVudCA9IFtdO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNlY3Rpb25zID09PSBudWxsKSB7XG4gICAgICAgIGluaXRTZWN0aW9ucyhjb250ZW50LmpvaW4oJ1xcbicpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGxlbiA9PT0gMikge1xuICAgICAgICBjbG9zZVNlY3Rpb24oY29udGVudC5qb2luKCdcXG4nKSk7XG4gICAgICB9XG5cbiAgICAgIHN0YWNrLnB1c2gobG4pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgY29udGVudC5wdXNoKGxpbmUpO1xuICB9XG5cbiAgaWYgKHNlY3Rpb25zID09PSBudWxsKSB7XG4gICAgaW5pdFNlY3Rpb25zKGNvbnRlbnQuam9pbignXFxuJykpO1xuICB9IGVsc2Uge1xuICAgIGNsb3NlU2VjdGlvbihjb250ZW50LmpvaW4oJ1xcbicpKTtcbiAgfVxuXG4gIGZpbGUuc2VjdGlvbnMgPSBzZWN0aW9ucztcbiAgcmV0dXJuIGZpbGU7XG59O1xuXG5mdW5jdGlvbiBpc0RlbGltaXRlcihsaW5lLCBkZWxpbSkge1xuICBpZiAobGluZS5zbGljZSgwLCBkZWxpbS5sZW5ndGgpICE9PSBkZWxpbSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAobGluZS5jaGFyQXQoZGVsaW0ubGVuZ3RoICsgMSkgPT09IGRlbGltLnNsaWNlKC0xKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gdG9PYmplY3QoaW5wdXQpIHtcbiAgaWYgKHR5cGVPZihpbnB1dCkgIT09ICdvYmplY3QnKSB7XG4gICAgaW5wdXQgPSB7IGNvbnRlbnQ6IGlucHV0IH07XG4gIH1cblxuICBpZiAodHlwZW9mIGlucHV0LmNvbnRlbnQgIT09ICdzdHJpbmcnICYmICFpc0J1ZmZlcihpbnB1dC5jb250ZW50KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4cGVjdGVkIGEgYnVmZmVyIG9yIHN0cmluZycpO1xuICB9XG5cbiAgaW5wdXQuY29udGVudCA9IGlucHV0LmNvbnRlbnQudG9TdHJpbmcoKTtcbiAgaW5wdXQuc2VjdGlvbnMgPSBbXTtcbiAgcmV0dXJuIGlucHV0O1xufVxuXG5mdW5jdGlvbiBnZXRLZXkodmFsLCBkZWxpbSkge1xuICByZXR1cm4gdmFsID8gdmFsLnNsaWNlKGRlbGltLmxlbmd0aCkudHJpbSgpIDogJyc7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNlY3Rpb24oKSB7XG4gIHJldHVybiB7IGtleTogJycsIGRhdGE6ICcnLCBjb250ZW50OiAnJyB9O1xufVxuXG5mdW5jdGlvbiBpZGVudGl0eSh2YWwpIHtcbiAgcmV0dXJuIHZhbDtcbn1cblxuZnVuY3Rpb24gaXNCdWZmZXIodmFsKSB7XG4gIGlmICh2YWwgJiYgdmFsLmNvbnN0cnVjdG9yICYmIHR5cGVvZiB2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyKHZhbCk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuIiwgIid1c2Ugc3RyaWN0JztcblxuXG5mdW5jdGlvbiBpc05vdGhpbmcoc3ViamVjdCkge1xuICByZXR1cm4gKHR5cGVvZiBzdWJqZWN0ID09PSAndW5kZWZpbmVkJykgfHwgKHN1YmplY3QgPT09IG51bGwpO1xufVxuXG5cbmZ1bmN0aW9uIGlzT2JqZWN0KHN1YmplY3QpIHtcbiAgcmV0dXJuICh0eXBlb2Ygc3ViamVjdCA9PT0gJ29iamVjdCcpICYmIChzdWJqZWN0ICE9PSBudWxsKTtcbn1cblxuXG5mdW5jdGlvbiB0b0FycmF5KHNlcXVlbmNlKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHNlcXVlbmNlKSkgcmV0dXJuIHNlcXVlbmNlO1xuICBlbHNlIGlmIChpc05vdGhpbmcoc2VxdWVuY2UpKSByZXR1cm4gW107XG5cbiAgcmV0dXJuIFsgc2VxdWVuY2UgXTtcbn1cblxuXG5mdW5jdGlvbiBleHRlbmQodGFyZ2V0LCBzb3VyY2UpIHtcbiAgdmFyIGluZGV4LCBsZW5ndGgsIGtleSwgc291cmNlS2V5cztcblxuICBpZiAoc291cmNlKSB7XG4gICAgc291cmNlS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG5cbiAgICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gc291cmNlS2V5cy5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgICBrZXkgPSBzb3VyY2VLZXlzW2luZGV4XTtcbiAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuXG5mdW5jdGlvbiByZXBlYXQoc3RyaW5nLCBjb3VudCkge1xuICB2YXIgcmVzdWx0ID0gJycsIGN5Y2xlO1xuXG4gIGZvciAoY3ljbGUgPSAwOyBjeWNsZSA8IGNvdW50OyBjeWNsZSArPSAxKSB7XG4gICAgcmVzdWx0ICs9IHN0cmluZztcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cblxuZnVuY3Rpb24gaXNOZWdhdGl2ZVplcm8obnVtYmVyKSB7XG4gIHJldHVybiAobnVtYmVyID09PSAwKSAmJiAoTnVtYmVyLk5FR0FUSVZFX0lORklOSVRZID09PSAxIC8gbnVtYmVyKTtcbn1cblxuXG5tb2R1bGUuZXhwb3J0cy5pc05vdGhpbmcgICAgICA9IGlzTm90aGluZztcbm1vZHVsZS5leHBvcnRzLmlzT2JqZWN0ICAgICAgID0gaXNPYmplY3Q7XG5tb2R1bGUuZXhwb3J0cy50b0FycmF5ICAgICAgICA9IHRvQXJyYXk7XG5tb2R1bGUuZXhwb3J0cy5yZXBlYXQgICAgICAgICA9IHJlcGVhdDtcbm1vZHVsZS5leHBvcnRzLmlzTmVnYXRpdmVaZXJvID0gaXNOZWdhdGl2ZVplcm87XG5tb2R1bGUuZXhwb3J0cy5leHRlbmQgICAgICAgICA9IGV4dGVuZDtcbiIsICIvLyBZQU1MIGVycm9yIGNsYXNzLiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzg0NTg5ODRcbi8vXG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIFlBTUxFeGNlcHRpb24ocmVhc29uLCBtYXJrKSB7XG4gIC8vIFN1cGVyIGNvbnN0cnVjdG9yXG4gIEVycm9yLmNhbGwodGhpcyk7XG5cbiAgdGhpcy5uYW1lID0gJ1lBTUxFeGNlcHRpb24nO1xuICB0aGlzLnJlYXNvbiA9IHJlYXNvbjtcbiAgdGhpcy5tYXJrID0gbWFyaztcbiAgdGhpcy5tZXNzYWdlID0gKHRoaXMucmVhc29uIHx8ICcodW5rbm93biByZWFzb24pJykgKyAodGhpcy5tYXJrID8gJyAnICsgdGhpcy5tYXJrLnRvU3RyaW5nKCkgOiAnJyk7XG5cbiAgLy8gSW5jbHVkZSBzdGFjayB0cmFjZSBpbiBlcnJvciBvYmplY3RcbiAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgLy8gQ2hyb21lIGFuZCBOb2RlSlNcbiAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBGRiwgSUUgMTArIGFuZCBTYWZhcmkgNisuIEZhbGxiYWNrIGZvciBvdGhlcnNcbiAgICB0aGlzLnN0YWNrID0gKG5ldyBFcnJvcigpKS5zdGFjayB8fCAnJztcbiAgfVxufVxuXG5cbi8vIEluaGVyaXQgZnJvbSBFcnJvclxuWUFNTEV4Y2VwdGlvbi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSk7XG5ZQU1MRXhjZXB0aW9uLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFlBTUxFeGNlcHRpb247XG5cblxuWUFNTEV4Y2VwdGlvbi5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyhjb21wYWN0KSB7XG4gIHZhciByZXN1bHQgPSB0aGlzLm5hbWUgKyAnOiAnO1xuXG4gIHJlc3VsdCArPSB0aGlzLnJlYXNvbiB8fCAnKHVua25vd24gcmVhc29uKSc7XG5cbiAgaWYgKCFjb21wYWN0ICYmIHRoaXMubWFyaykge1xuICAgIHJlc3VsdCArPSAnICcgKyB0aGlzLm1hcmsudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0gWUFNTEV4Y2VwdGlvbjtcbiIsICIndXNlIHN0cmljdCc7XG5cblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG5cblxuZnVuY3Rpb24gTWFyayhuYW1lLCBidWZmZXIsIHBvc2l0aW9uLCBsaW5lLCBjb2x1bW4pIHtcbiAgdGhpcy5uYW1lICAgICA9IG5hbWU7XG4gIHRoaXMuYnVmZmVyICAgPSBidWZmZXI7XG4gIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgdGhpcy5saW5lICAgICA9IGxpbmU7XG4gIHRoaXMuY29sdW1uICAgPSBjb2x1bW47XG59XG5cblxuTWFyay5wcm90b3R5cGUuZ2V0U25pcHBldCA9IGZ1bmN0aW9uIGdldFNuaXBwZXQoaW5kZW50LCBtYXhMZW5ndGgpIHtcbiAgdmFyIGhlYWQsIHN0YXJ0LCB0YWlsLCBlbmQsIHNuaXBwZXQ7XG5cbiAgaWYgKCF0aGlzLmJ1ZmZlcikgcmV0dXJuIG51bGw7XG5cbiAgaW5kZW50ID0gaW5kZW50IHx8IDQ7XG4gIG1heExlbmd0aCA9IG1heExlbmd0aCB8fCA3NTtcblxuICBoZWFkID0gJyc7XG4gIHN0YXJ0ID0gdGhpcy5wb3NpdGlvbjtcblxuICB3aGlsZSAoc3RhcnQgPiAwICYmICdcXHgwMFxcclxcblxceDg1XFx1MjAyOFxcdTIwMjknLmluZGV4T2YodGhpcy5idWZmZXIuY2hhckF0KHN0YXJ0IC0gMSkpID09PSAtMSkge1xuICAgIHN0YXJ0IC09IDE7XG4gICAgaWYgKHRoaXMucG9zaXRpb24gLSBzdGFydCA+IChtYXhMZW5ndGggLyAyIC0gMSkpIHtcbiAgICAgIGhlYWQgPSAnIC4uLiAnO1xuICAgICAgc3RhcnQgKz0gNTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHRhaWwgPSAnJztcbiAgZW5kID0gdGhpcy5wb3NpdGlvbjtcblxuICB3aGlsZSAoZW5kIDwgdGhpcy5idWZmZXIubGVuZ3RoICYmICdcXHgwMFxcclxcblxceDg1XFx1MjAyOFxcdTIwMjknLmluZGV4T2YodGhpcy5idWZmZXIuY2hhckF0KGVuZCkpID09PSAtMSkge1xuICAgIGVuZCArPSAxO1xuICAgIGlmIChlbmQgLSB0aGlzLnBvc2l0aW9uID4gKG1heExlbmd0aCAvIDIgLSAxKSkge1xuICAgICAgdGFpbCA9ICcgLi4uICc7XG4gICAgICBlbmQgLT0gNTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHNuaXBwZXQgPSB0aGlzLmJ1ZmZlci5zbGljZShzdGFydCwgZW5kKTtcblxuICByZXR1cm4gY29tbW9uLnJlcGVhdCgnICcsIGluZGVudCkgKyBoZWFkICsgc25pcHBldCArIHRhaWwgKyAnXFxuJyArXG4gICAgICAgICBjb21tb24ucmVwZWF0KCcgJywgaW5kZW50ICsgdGhpcy5wb3NpdGlvbiAtIHN0YXJ0ICsgaGVhZC5sZW5ndGgpICsgJ14nO1xufTtcblxuXG5NYXJrLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKGNvbXBhY3QpIHtcbiAgdmFyIHNuaXBwZXQsIHdoZXJlID0gJyc7XG5cbiAgaWYgKHRoaXMubmFtZSkge1xuICAgIHdoZXJlICs9ICdpbiBcIicgKyB0aGlzLm5hbWUgKyAnXCIgJztcbiAgfVxuXG4gIHdoZXJlICs9ICdhdCBsaW5lICcgKyAodGhpcy5saW5lICsgMSkgKyAnLCBjb2x1bW4gJyArICh0aGlzLmNvbHVtbiArIDEpO1xuXG4gIGlmICghY29tcGFjdCkge1xuICAgIHNuaXBwZXQgPSB0aGlzLmdldFNuaXBwZXQoKTtcblxuICAgIGlmIChzbmlwcGV0KSB7XG4gICAgICB3aGVyZSArPSAnOlxcbicgKyBzbmlwcGV0O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB3aGVyZTtcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBNYXJrO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIFlBTUxFeGNlcHRpb24gPSByZXF1aXJlKCcuL2V4Y2VwdGlvbicpO1xuXG52YXIgVFlQRV9DT05TVFJVQ1RPUl9PUFRJT05TID0gW1xuICAna2luZCcsXG4gICdyZXNvbHZlJyxcbiAgJ2NvbnN0cnVjdCcsXG4gICdpbnN0YW5jZU9mJyxcbiAgJ3ByZWRpY2F0ZScsXG4gICdyZXByZXNlbnQnLFxuICAnZGVmYXVsdFN0eWxlJyxcbiAgJ3N0eWxlQWxpYXNlcydcbl07XG5cbnZhciBZQU1MX05PREVfS0lORFMgPSBbXG4gICdzY2FsYXInLFxuICAnc2VxdWVuY2UnLFxuICAnbWFwcGluZydcbl07XG5cbmZ1bmN0aW9uIGNvbXBpbGVTdHlsZUFsaWFzZXMobWFwKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcblxuICBpZiAobWFwICE9PSBudWxsKSB7XG4gICAgT2JqZWN0LmtleXMobWFwKS5mb3JFYWNoKGZ1bmN0aW9uIChzdHlsZSkge1xuICAgICAgbWFwW3N0eWxlXS5mb3JFYWNoKGZ1bmN0aW9uIChhbGlhcykge1xuICAgICAgICByZXN1bHRbU3RyaW5nKGFsaWFzKV0gPSBzdHlsZTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gVHlwZSh0YWcsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgT2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgIGlmIChUWVBFX0NPTlNUUlVDVE9SX09QVElPTlMuaW5kZXhPZihuYW1lKSA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBZQU1MRXhjZXB0aW9uKCdVbmtub3duIG9wdGlvbiBcIicgKyBuYW1lICsgJ1wiIGlzIG1ldCBpbiBkZWZpbml0aW9uIG9mIFwiJyArIHRhZyArICdcIiBZQU1MIHR5cGUuJyk7XG4gICAgfVxuICB9KTtcblxuICAvLyBUT0RPOiBBZGQgdGFnIGZvcm1hdCBjaGVjay5cbiAgdGhpcy50YWcgICAgICAgICAgPSB0YWc7XG4gIHRoaXMua2luZCAgICAgICAgID0gb3B0aW9uc1sna2luZCddICAgICAgICAgfHwgbnVsbDtcbiAgdGhpcy5yZXNvbHZlICAgICAgPSBvcHRpb25zWydyZXNvbHZlJ10gICAgICB8fCBmdW5jdGlvbiAoKSB7IHJldHVybiB0cnVlOyB9O1xuICB0aGlzLmNvbnN0cnVjdCAgICA9IG9wdGlvbnNbJ2NvbnN0cnVjdCddICAgIHx8IGZ1bmN0aW9uIChkYXRhKSB7IHJldHVybiBkYXRhOyB9O1xuICB0aGlzLmluc3RhbmNlT2YgICA9IG9wdGlvbnNbJ2luc3RhbmNlT2YnXSAgIHx8IG51bGw7XG4gIHRoaXMucHJlZGljYXRlICAgID0gb3B0aW9uc1sncHJlZGljYXRlJ10gICAgfHwgbnVsbDtcbiAgdGhpcy5yZXByZXNlbnQgICAgPSBvcHRpb25zWydyZXByZXNlbnQnXSAgICB8fCBudWxsO1xuICB0aGlzLmRlZmF1bHRTdHlsZSA9IG9wdGlvbnNbJ2RlZmF1bHRTdHlsZSddIHx8IG51bGw7XG4gIHRoaXMuc3R5bGVBbGlhc2VzID0gY29tcGlsZVN0eWxlQWxpYXNlcyhvcHRpb25zWydzdHlsZUFsaWFzZXMnXSB8fCBudWxsKTtcblxuICBpZiAoWUFNTF9OT0RFX0tJTkRTLmluZGV4T2YodGhpcy5raW5kKSA9PT0gLTEpIHtcbiAgICB0aHJvdyBuZXcgWUFNTEV4Y2VwdGlvbignVW5rbm93biBraW5kIFwiJyArIHRoaXMua2luZCArICdcIiBpcyBzcGVjaWZpZWQgZm9yIFwiJyArIHRhZyArICdcIiBZQU1MIHR5cGUuJyk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUeXBlO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuLyplc2xpbnQtZGlzYWJsZSBtYXgtbGVuKi9cblxudmFyIGNvbW1vbiAgICAgICAgPSByZXF1aXJlKCcuL2NvbW1vbicpO1xudmFyIFlBTUxFeGNlcHRpb24gPSByZXF1aXJlKCcuL2V4Y2VwdGlvbicpO1xudmFyIFR5cGUgICAgICAgICAgPSByZXF1aXJlKCcuL3R5cGUnKTtcblxuXG5mdW5jdGlvbiBjb21waWxlTGlzdChzY2hlbWEsIG5hbWUsIHJlc3VsdCkge1xuICB2YXIgZXhjbHVkZSA9IFtdO1xuXG4gIHNjaGVtYS5pbmNsdWRlLmZvckVhY2goZnVuY3Rpb24gKGluY2x1ZGVkU2NoZW1hKSB7XG4gICAgcmVzdWx0ID0gY29tcGlsZUxpc3QoaW5jbHVkZWRTY2hlbWEsIG5hbWUsIHJlc3VsdCk7XG4gIH0pO1xuXG4gIHNjaGVtYVtuYW1lXS5mb3JFYWNoKGZ1bmN0aW9uIChjdXJyZW50VHlwZSkge1xuICAgIHJlc3VsdC5mb3JFYWNoKGZ1bmN0aW9uIChwcmV2aW91c1R5cGUsIHByZXZpb3VzSW5kZXgpIHtcbiAgICAgIGlmIChwcmV2aW91c1R5cGUudGFnID09PSBjdXJyZW50VHlwZS50YWcgJiYgcHJldmlvdXNUeXBlLmtpbmQgPT09IGN1cnJlbnRUeXBlLmtpbmQpIHtcbiAgICAgICAgZXhjbHVkZS5wdXNoKHByZXZpb3VzSW5kZXgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmVzdWx0LnB1c2goY3VycmVudFR5cGUpO1xuICB9KTtcblxuICByZXR1cm4gcmVzdWx0LmZpbHRlcihmdW5jdGlvbiAodHlwZSwgaW5kZXgpIHtcbiAgICByZXR1cm4gZXhjbHVkZS5pbmRleE9mKGluZGV4KSA9PT0gLTE7XG4gIH0pO1xufVxuXG5cbmZ1bmN0aW9uIGNvbXBpbGVNYXAoLyogbGlzdHMuLi4gKi8pIHtcbiAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgc2NhbGFyOiB7fSxcbiAgICAgICAgc2VxdWVuY2U6IHt9LFxuICAgICAgICBtYXBwaW5nOiB7fSxcbiAgICAgICAgZmFsbGJhY2s6IHt9XG4gICAgICB9LCBpbmRleCwgbGVuZ3RoO1xuXG4gIGZ1bmN0aW9uIGNvbGxlY3RUeXBlKHR5cGUpIHtcbiAgICByZXN1bHRbdHlwZS5raW5kXVt0eXBlLnRhZ10gPSByZXN1bHRbJ2ZhbGxiYWNrJ11bdHlwZS50YWddID0gdHlwZTtcbiAgfVxuXG4gIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgIGFyZ3VtZW50c1tpbmRleF0uZm9yRWFjaChjb2xsZWN0VHlwZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5mdW5jdGlvbiBTY2hlbWEoZGVmaW5pdGlvbikge1xuICB0aGlzLmluY2x1ZGUgID0gZGVmaW5pdGlvbi5pbmNsdWRlICB8fCBbXTtcbiAgdGhpcy5pbXBsaWNpdCA9IGRlZmluaXRpb24uaW1wbGljaXQgfHwgW107XG4gIHRoaXMuZXhwbGljaXQgPSBkZWZpbml0aW9uLmV4cGxpY2l0IHx8IFtdO1xuXG4gIHRoaXMuaW1wbGljaXQuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xuICAgIGlmICh0eXBlLmxvYWRLaW5kICYmIHR5cGUubG9hZEtpbmQgIT09ICdzY2FsYXInKSB7XG4gICAgICB0aHJvdyBuZXcgWUFNTEV4Y2VwdGlvbignVGhlcmUgaXMgYSBub24tc2NhbGFyIHR5cGUgaW4gdGhlIGltcGxpY2l0IGxpc3Qgb2YgYSBzY2hlbWEuIEltcGxpY2l0IHJlc29sdmluZyBvZiBzdWNoIHR5cGVzIGlzIG5vdCBzdXBwb3J0ZWQuJyk7XG4gICAgfVxuICB9KTtcblxuICB0aGlzLmNvbXBpbGVkSW1wbGljaXQgPSBjb21waWxlTGlzdCh0aGlzLCAnaW1wbGljaXQnLCBbXSk7XG4gIHRoaXMuY29tcGlsZWRFeHBsaWNpdCA9IGNvbXBpbGVMaXN0KHRoaXMsICdleHBsaWNpdCcsIFtdKTtcbiAgdGhpcy5jb21waWxlZFR5cGVNYXAgID0gY29tcGlsZU1hcCh0aGlzLmNvbXBpbGVkSW1wbGljaXQsIHRoaXMuY29tcGlsZWRFeHBsaWNpdCk7XG59XG5cblxuU2NoZW1hLkRFRkFVTFQgPSBudWxsO1xuXG5cblNjaGVtYS5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGVTY2hlbWEoKSB7XG4gIHZhciBzY2hlbWFzLCB0eXBlcztcblxuICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICBjYXNlIDE6XG4gICAgICBzY2hlbWFzID0gU2NoZW1hLkRFRkFVTFQ7XG4gICAgICB0eXBlcyA9IGFyZ3VtZW50c1swXTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAyOlxuICAgICAgc2NoZW1hcyA9IGFyZ3VtZW50c1swXTtcbiAgICAgIHR5cGVzID0gYXJndW1lbnRzWzFdO1xuICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IFlBTUxFeGNlcHRpb24oJ1dyb25nIG51bWJlciBvZiBhcmd1bWVudHMgZm9yIFNjaGVtYS5jcmVhdGUgZnVuY3Rpb24nKTtcbiAgfVxuXG4gIHNjaGVtYXMgPSBjb21tb24udG9BcnJheShzY2hlbWFzKTtcbiAgdHlwZXMgPSBjb21tb24udG9BcnJheSh0eXBlcyk7XG5cbiAgaWYgKCFzY2hlbWFzLmV2ZXJ5KGZ1bmN0aW9uIChzY2hlbWEpIHsgcmV0dXJuIHNjaGVtYSBpbnN0YW5jZW9mIFNjaGVtYTsgfSkpIHtcbiAgICB0aHJvdyBuZXcgWUFNTEV4Y2VwdGlvbignU3BlY2lmaWVkIGxpc3Qgb2Ygc3VwZXIgc2NoZW1hcyAob3IgYSBzaW5nbGUgU2NoZW1hIG9iamVjdCkgY29udGFpbnMgYSBub24tU2NoZW1hIG9iamVjdC4nKTtcbiAgfVxuXG4gIGlmICghdHlwZXMuZXZlcnkoZnVuY3Rpb24gKHR5cGUpIHsgcmV0dXJuIHR5cGUgaW5zdGFuY2VvZiBUeXBlOyB9KSkge1xuICAgIHRocm93IG5ldyBZQU1MRXhjZXB0aW9uKCdTcGVjaWZpZWQgbGlzdCBvZiBZQU1MIHR5cGVzIChvciBhIHNpbmdsZSBUeXBlIG9iamVjdCkgY29udGFpbnMgYSBub24tVHlwZSBvYmplY3QuJyk7XG4gIH1cblxuICByZXR1cm4gbmV3IFNjaGVtYSh7XG4gICAgaW5jbHVkZTogc2NoZW1hcyxcbiAgICBleHBsaWNpdDogdHlwZXNcbiAgfSk7XG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0gU2NoZW1hO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIFR5cGUgPSByZXF1aXJlKCcuLi90eXBlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFR5cGUoJ3RhZzp5YW1sLm9yZywyMDAyOnN0cicsIHtcbiAga2luZDogJ3NjYWxhcicsXG4gIGNvbnN0cnVjdDogZnVuY3Rpb24gKGRhdGEpIHsgcmV0dXJuIGRhdGEgIT09IG51bGwgPyBkYXRhIDogJyc7IH1cbn0pO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIFR5cGUgPSByZXF1aXJlKCcuLi90eXBlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFR5cGUoJ3RhZzp5YW1sLm9yZywyMDAyOnNlcScsIHtcbiAga2luZDogJ3NlcXVlbmNlJyxcbiAgY29uc3RydWN0OiBmdW5jdGlvbiAoZGF0YSkgeyByZXR1cm4gZGF0YSAhPT0gbnVsbCA/IGRhdGEgOiBbXTsgfVxufSk7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgVHlwZSA9IHJlcXVpcmUoJy4uL3R5cGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgVHlwZSgndGFnOnlhbWwub3JnLDIwMDI6bWFwJywge1xuICBraW5kOiAnbWFwcGluZycsXG4gIGNvbnN0cnVjdDogZnVuY3Rpb24gKGRhdGEpIHsgcmV0dXJuIGRhdGEgIT09IG51bGwgPyBkYXRhIDoge307IH1cbn0pO1xuIiwgIi8vIFN0YW5kYXJkIFlBTUwncyBGYWlsc2FmZSBzY2hlbWEuXG4vLyBodHRwOi8vd3d3LnlhbWwub3JnL3NwZWMvMS4yL3NwZWMuaHRtbCNpZDI4MDIzNDZcblxuXG4ndXNlIHN0cmljdCc7XG5cblxudmFyIFNjaGVtYSA9IHJlcXVpcmUoJy4uL3NjaGVtYScpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFNjaGVtYSh7XG4gIGV4cGxpY2l0OiBbXG4gICAgcmVxdWlyZSgnLi4vdHlwZS9zdHInKSxcbiAgICByZXF1aXJlKCcuLi90eXBlL3NlcScpLFxuICAgIHJlcXVpcmUoJy4uL3R5cGUvbWFwJylcbiAgXVxufSk7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgVHlwZSA9IHJlcXVpcmUoJy4uL3R5cGUnKTtcblxuZnVuY3Rpb24gcmVzb2x2ZVlhbWxOdWxsKGRhdGEpIHtcbiAgaWYgKGRhdGEgPT09IG51bGwpIHJldHVybiB0cnVlO1xuXG4gIHZhciBtYXggPSBkYXRhLmxlbmd0aDtcblxuICByZXR1cm4gKG1heCA9PT0gMSAmJiBkYXRhID09PSAnficpIHx8XG4gICAgICAgICAobWF4ID09PSA0ICYmIChkYXRhID09PSAnbnVsbCcgfHwgZGF0YSA9PT0gJ051bGwnIHx8IGRhdGEgPT09ICdOVUxMJykpO1xufVxuXG5mdW5jdGlvbiBjb25zdHJ1Y3RZYW1sTnVsbCgpIHtcbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzTnVsbChvYmplY3QpIHtcbiAgcmV0dXJuIG9iamVjdCA9PT0gbnVsbDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgVHlwZSgndGFnOnlhbWwub3JnLDIwMDI6bnVsbCcsIHtcbiAga2luZDogJ3NjYWxhcicsXG4gIHJlc29sdmU6IHJlc29sdmVZYW1sTnVsbCxcbiAgY29uc3RydWN0OiBjb25zdHJ1Y3RZYW1sTnVsbCxcbiAgcHJlZGljYXRlOiBpc051bGwsXG4gIHJlcHJlc2VudDoge1xuICAgIGNhbm9uaWNhbDogZnVuY3Rpb24gKCkgeyByZXR1cm4gJ34nOyAgICB9LFxuICAgIGxvd2VyY2FzZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gJ251bGwnOyB9LFxuICAgIHVwcGVyY2FzZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gJ05VTEwnOyB9LFxuICAgIGNhbWVsY2FzZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gJ051bGwnOyB9XG4gIH0sXG4gIGRlZmF1bHRTdHlsZTogJ2xvd2VyY2FzZSdcbn0pO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIFR5cGUgPSByZXF1aXJlKCcuLi90eXBlJyk7XG5cbmZ1bmN0aW9uIHJlc29sdmVZYW1sQm9vbGVhbihkYXRhKSB7XG4gIGlmIChkYXRhID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgdmFyIG1heCA9IGRhdGEubGVuZ3RoO1xuXG4gIHJldHVybiAobWF4ID09PSA0ICYmIChkYXRhID09PSAndHJ1ZScgfHwgZGF0YSA9PT0gJ1RydWUnIHx8IGRhdGEgPT09ICdUUlVFJykpIHx8XG4gICAgICAgICAobWF4ID09PSA1ICYmIChkYXRhID09PSAnZmFsc2UnIHx8IGRhdGEgPT09ICdGYWxzZScgfHwgZGF0YSA9PT0gJ0ZBTFNFJykpO1xufVxuXG5mdW5jdGlvbiBjb25zdHJ1Y3RZYW1sQm9vbGVhbihkYXRhKSB7XG4gIHJldHVybiBkYXRhID09PSAndHJ1ZScgfHxcbiAgICAgICAgIGRhdGEgPT09ICdUcnVlJyB8fFxuICAgICAgICAgZGF0YSA9PT0gJ1RSVUUnO1xufVxuXG5mdW5jdGlvbiBpc0Jvb2xlYW4ob2JqZWN0KSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqZWN0KSA9PT0gJ1tvYmplY3QgQm9vbGVhbl0nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBUeXBlKCd0YWc6eWFtbC5vcmcsMjAwMjpib29sJywge1xuICBraW5kOiAnc2NhbGFyJyxcbiAgcmVzb2x2ZTogcmVzb2x2ZVlhbWxCb29sZWFuLFxuICBjb25zdHJ1Y3Q6IGNvbnN0cnVjdFlhbWxCb29sZWFuLFxuICBwcmVkaWNhdGU6IGlzQm9vbGVhbixcbiAgcmVwcmVzZW50OiB7XG4gICAgbG93ZXJjYXNlOiBmdW5jdGlvbiAob2JqZWN0KSB7IHJldHVybiBvYmplY3QgPyAndHJ1ZScgOiAnZmFsc2UnOyB9LFxuICAgIHVwcGVyY2FzZTogZnVuY3Rpb24gKG9iamVjdCkgeyByZXR1cm4gb2JqZWN0ID8gJ1RSVUUnIDogJ0ZBTFNFJzsgfSxcbiAgICBjYW1lbGNhc2U6IGZ1bmN0aW9uIChvYmplY3QpIHsgcmV0dXJuIG9iamVjdCA/ICdUcnVlJyA6ICdGYWxzZSc7IH1cbiAgfSxcbiAgZGVmYXVsdFN0eWxlOiAnbG93ZXJjYXNlJ1xufSk7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi4vY29tbW9uJyk7XG52YXIgVHlwZSAgID0gcmVxdWlyZSgnLi4vdHlwZScpO1xuXG5mdW5jdGlvbiBpc0hleENvZGUoYykge1xuICByZXR1cm4gKCgweDMwLyogMCAqLyA8PSBjKSAmJiAoYyA8PSAweDM5LyogOSAqLykpIHx8XG4gICAgICAgICAoKDB4NDEvKiBBICovIDw9IGMpICYmIChjIDw9IDB4NDYvKiBGICovKSkgfHxcbiAgICAgICAgICgoMHg2MS8qIGEgKi8gPD0gYykgJiYgKGMgPD0gMHg2Ni8qIGYgKi8pKTtcbn1cblxuZnVuY3Rpb24gaXNPY3RDb2RlKGMpIHtcbiAgcmV0dXJuICgoMHgzMC8qIDAgKi8gPD0gYykgJiYgKGMgPD0gMHgzNy8qIDcgKi8pKTtcbn1cblxuZnVuY3Rpb24gaXNEZWNDb2RlKGMpIHtcbiAgcmV0dXJuICgoMHgzMC8qIDAgKi8gPD0gYykgJiYgKGMgPD0gMHgzOS8qIDkgKi8pKTtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZVlhbWxJbnRlZ2VyKGRhdGEpIHtcbiAgaWYgKGRhdGEgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICB2YXIgbWF4ID0gZGF0YS5sZW5ndGgsXG4gICAgICBpbmRleCA9IDAsXG4gICAgICBoYXNEaWdpdHMgPSBmYWxzZSxcbiAgICAgIGNoO1xuXG4gIGlmICghbWF4KSByZXR1cm4gZmFsc2U7XG5cbiAgY2ggPSBkYXRhW2luZGV4XTtcblxuICAvLyBzaWduXG4gIGlmIChjaCA9PT0gJy0nIHx8IGNoID09PSAnKycpIHtcbiAgICBjaCA9IGRhdGFbKytpbmRleF07XG4gIH1cblxuICBpZiAoY2ggPT09ICcwJykge1xuICAgIC8vIDBcbiAgICBpZiAoaW5kZXggKyAxID09PSBtYXgpIHJldHVybiB0cnVlO1xuICAgIGNoID0gZGF0YVsrK2luZGV4XTtcblxuICAgIC8vIGJhc2UgMiwgYmFzZSA4LCBiYXNlIDE2XG5cbiAgICBpZiAoY2ggPT09ICdiJykge1xuICAgICAgLy8gYmFzZSAyXG4gICAgICBpbmRleCsrO1xuXG4gICAgICBmb3IgKDsgaW5kZXggPCBtYXg7IGluZGV4KyspIHtcbiAgICAgICAgY2ggPSBkYXRhW2luZGV4XTtcbiAgICAgICAgaWYgKGNoID09PSAnXycpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoY2ggIT09ICcwJyAmJiBjaCAhPT0gJzEnKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGhhc0RpZ2l0cyA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gaGFzRGlnaXRzICYmIGNoICE9PSAnXyc7XG4gICAgfVxuXG5cbiAgICBpZiAoY2ggPT09ICd4Jykge1xuICAgICAgLy8gYmFzZSAxNlxuICAgICAgaW5kZXgrKztcblxuICAgICAgZm9yICg7IGluZGV4IDwgbWF4OyBpbmRleCsrKSB7XG4gICAgICAgIGNoID0gZGF0YVtpbmRleF07XG4gICAgICAgIGlmIChjaCA9PT0gJ18nKSBjb250aW51ZTtcbiAgICAgICAgaWYgKCFpc0hleENvZGUoZGF0YS5jaGFyQ29kZUF0KGluZGV4KSkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgaGFzRGlnaXRzID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBoYXNEaWdpdHMgJiYgY2ggIT09ICdfJztcbiAgICB9XG5cbiAgICAvLyBiYXNlIDhcbiAgICBmb3IgKDsgaW5kZXggPCBtYXg7IGluZGV4KyspIHtcbiAgICAgIGNoID0gZGF0YVtpbmRleF07XG4gICAgICBpZiAoY2ggPT09ICdfJykgY29udGludWU7XG4gICAgICBpZiAoIWlzT2N0Q29kZShkYXRhLmNoYXJDb2RlQXQoaW5kZXgpKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgaGFzRGlnaXRzID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGhhc0RpZ2l0cyAmJiBjaCAhPT0gJ18nO1xuICB9XG5cbiAgLy8gYmFzZSAxMCAoZXhjZXB0IDApIG9yIGJhc2UgNjBcblxuICAvLyB2YWx1ZSBzaG91bGQgbm90IHN0YXJ0IHdpdGggYF9gO1xuICBpZiAoY2ggPT09ICdfJykgcmV0dXJuIGZhbHNlO1xuXG4gIGZvciAoOyBpbmRleCA8IG1heDsgaW5kZXgrKykge1xuICAgIGNoID0gZGF0YVtpbmRleF07XG4gICAgaWYgKGNoID09PSAnXycpIGNvbnRpbnVlO1xuICAgIGlmIChjaCA9PT0gJzonKSBicmVhaztcbiAgICBpZiAoIWlzRGVjQ29kZShkYXRhLmNoYXJDb2RlQXQoaW5kZXgpKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBoYXNEaWdpdHMgPSB0cnVlO1xuICB9XG5cbiAgLy8gU2hvdWxkIGhhdmUgZGlnaXRzIGFuZCBzaG91bGQgbm90IGVuZCB3aXRoIGBfYFxuICBpZiAoIWhhc0RpZ2l0cyB8fCBjaCA9PT0gJ18nKSByZXR1cm4gZmFsc2U7XG5cbiAgLy8gaWYgIWJhc2U2MCAtIGRvbmU7XG4gIGlmIChjaCAhPT0gJzonKSByZXR1cm4gdHJ1ZTtcblxuICAvLyBiYXNlNjAgYWxtb3N0IG5vdCB1c2VkLCBubyBuZWVkcyB0byBvcHRpbWl6ZVxuICByZXR1cm4gL14oOlswLTVdP1swLTldKSskLy50ZXN0KGRhdGEuc2xpY2UoaW5kZXgpKTtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0WWFtbEludGVnZXIoZGF0YSkge1xuICB2YXIgdmFsdWUgPSBkYXRhLCBzaWduID0gMSwgY2gsIGJhc2UsIGRpZ2l0cyA9IFtdO1xuXG4gIGlmICh2YWx1ZS5pbmRleE9mKCdfJykgIT09IC0xKSB7XG4gICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9fL2csICcnKTtcbiAgfVxuXG4gIGNoID0gdmFsdWVbMF07XG5cbiAgaWYgKGNoID09PSAnLScgfHwgY2ggPT09ICcrJykge1xuICAgIGlmIChjaCA9PT0gJy0nKSBzaWduID0gLTE7XG4gICAgdmFsdWUgPSB2YWx1ZS5zbGljZSgxKTtcbiAgICBjaCA9IHZhbHVlWzBdO1xuICB9XG5cbiAgaWYgKHZhbHVlID09PSAnMCcpIHJldHVybiAwO1xuXG4gIGlmIChjaCA9PT0gJzAnKSB7XG4gICAgaWYgKHZhbHVlWzFdID09PSAnYicpIHJldHVybiBzaWduICogcGFyc2VJbnQodmFsdWUuc2xpY2UoMiksIDIpO1xuICAgIGlmICh2YWx1ZVsxXSA9PT0gJ3gnKSByZXR1cm4gc2lnbiAqIHBhcnNlSW50KHZhbHVlLCAxNik7XG4gICAgcmV0dXJuIHNpZ24gKiBwYXJzZUludCh2YWx1ZSwgOCk7XG4gIH1cblxuICBpZiAodmFsdWUuaW5kZXhPZignOicpICE9PSAtMSkge1xuICAgIHZhbHVlLnNwbGl0KCc6JykuZm9yRWFjaChmdW5jdGlvbiAodikge1xuICAgICAgZGlnaXRzLnVuc2hpZnQocGFyc2VJbnQodiwgMTApKTtcbiAgICB9KTtcblxuICAgIHZhbHVlID0gMDtcbiAgICBiYXNlID0gMTtcblxuICAgIGRpZ2l0cy5mb3JFYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgICB2YWx1ZSArPSAoZCAqIGJhc2UpO1xuICAgICAgYmFzZSAqPSA2MDtcbiAgICB9KTtcblxuICAgIHJldHVybiBzaWduICogdmFsdWU7XG5cbiAgfVxuXG4gIHJldHVybiBzaWduICogcGFyc2VJbnQodmFsdWUsIDEwKTtcbn1cblxuZnVuY3Rpb24gaXNJbnRlZ2VyKG9iamVjdCkge1xuICByZXR1cm4gKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmplY3QpKSA9PT0gJ1tvYmplY3QgTnVtYmVyXScgJiZcbiAgICAgICAgIChvYmplY3QgJSAxID09PSAwICYmICFjb21tb24uaXNOZWdhdGl2ZVplcm8ob2JqZWN0KSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFR5cGUoJ3RhZzp5YW1sLm9yZywyMDAyOmludCcsIHtcbiAga2luZDogJ3NjYWxhcicsXG4gIHJlc29sdmU6IHJlc29sdmVZYW1sSW50ZWdlcixcbiAgY29uc3RydWN0OiBjb25zdHJ1Y3RZYW1sSW50ZWdlcixcbiAgcHJlZGljYXRlOiBpc0ludGVnZXIsXG4gIHJlcHJlc2VudDoge1xuICAgIGJpbmFyeTogICAgICBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogPj0gMCA/ICcwYicgKyBvYmoudG9TdHJpbmcoMikgOiAnLTBiJyArIG9iai50b1N0cmluZygyKS5zbGljZSgxKTsgfSxcbiAgICBvY3RhbDogICAgICAgZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqID49IDAgPyAnMCcgICsgb2JqLnRvU3RyaW5nKDgpIDogJy0wJyAgKyBvYmoudG9TdHJpbmcoOCkuc2xpY2UoMSk7IH0sXG4gICAgZGVjaW1hbDogICAgIGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iai50b1N0cmluZygxMCk7IH0sXG4gICAgLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuICAgIGhleGFkZWNpbWFsOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogPj0gMCA/ICcweCcgKyBvYmoudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCkgOiAgJy0weCcgKyBvYmoudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCkuc2xpY2UoMSk7IH1cbiAgfSxcbiAgZGVmYXVsdFN0eWxlOiAnZGVjaW1hbCcsXG4gIHN0eWxlQWxpYXNlczoge1xuICAgIGJpbmFyeTogICAgICBbIDIsICAnYmluJyBdLFxuICAgIG9jdGFsOiAgICAgICBbIDgsICAnb2N0JyBdLFxuICAgIGRlY2ltYWw6ICAgICBbIDEwLCAnZGVjJyBdLFxuICAgIGhleGFkZWNpbWFsOiBbIDE2LCAnaGV4JyBdXG4gIH1cbn0pO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4uL2NvbW1vbicpO1xudmFyIFR5cGUgICA9IHJlcXVpcmUoJy4uL3R5cGUnKTtcblxudmFyIFlBTUxfRkxPQVRfUEFUVEVSTiA9IG5ldyBSZWdFeHAoXG4gIC8vIDIuNWU0LCAyLjUgYW5kIGludGVnZXJzXG4gICdeKD86Wy0rXT8oPzowfFsxLTldWzAtOV9dKikoPzpcXFxcLlswLTlfXSopPyg/OltlRV1bLStdP1swLTldKyk/JyArXG4gIC8vIC4yZTQsIC4yXG4gIC8vIHNwZWNpYWwgY2FzZSwgc2VlbXMgbm90IGZyb20gc3BlY1xuICAnfFxcXFwuWzAtOV9dKyg/OltlRV1bLStdP1swLTldKyk/JyArXG4gIC8vIDIwOjU5XG4gICd8Wy0rXT9bMC05XVswLTlfXSooPzo6WzAtNV0/WzAtOV0pK1xcXFwuWzAtOV9dKicgK1xuICAvLyAuaW5mXG4gICd8Wy0rXT9cXFxcLig/OmluZnxJbmZ8SU5GKScgK1xuICAvLyAubmFuXG4gICd8XFxcXC4oPzpuYW58TmFOfE5BTikpJCcpO1xuXG5mdW5jdGlvbiByZXNvbHZlWWFtbEZsb2F0KGRhdGEpIHtcbiAgaWYgKGRhdGEgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICBpZiAoIVlBTUxfRkxPQVRfUEFUVEVSTi50ZXN0KGRhdGEpIHx8XG4gICAgICAvLyBRdWljayBoYWNrIHRvIG5vdCBhbGxvdyBpbnRlZ2VycyBlbmQgd2l0aCBgX2BcbiAgICAgIC8vIFByb2JhYmx5IHNob3VsZCB1cGRhdGUgcmVnZXhwICYgY2hlY2sgc3BlZWRcbiAgICAgIGRhdGFbZGF0YS5sZW5ndGggLSAxXSA9PT0gJ18nKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGNvbnN0cnVjdFlhbWxGbG9hdChkYXRhKSB7XG4gIHZhciB2YWx1ZSwgc2lnbiwgYmFzZSwgZGlnaXRzO1xuXG4gIHZhbHVlICA9IGRhdGEucmVwbGFjZSgvXy9nLCAnJykudG9Mb3dlckNhc2UoKTtcbiAgc2lnbiAgID0gdmFsdWVbMF0gPT09ICctJyA/IC0xIDogMTtcbiAgZGlnaXRzID0gW107XG5cbiAgaWYgKCcrLScuaW5kZXhPZih2YWx1ZVswXSkgPj0gMCkge1xuICAgIHZhbHVlID0gdmFsdWUuc2xpY2UoMSk7XG4gIH1cblxuICBpZiAodmFsdWUgPT09ICcuaW5mJykge1xuICAgIHJldHVybiAoc2lnbiA9PT0gMSkgPyBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFkgOiBOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFk7XG5cbiAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gJy5uYW4nKSB7XG4gICAgcmV0dXJuIE5hTjtcblxuICB9IGVsc2UgaWYgKHZhbHVlLmluZGV4T2YoJzonKSA+PSAwKSB7XG4gICAgdmFsdWUuc3BsaXQoJzonKS5mb3JFYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICBkaWdpdHMudW5zaGlmdChwYXJzZUZsb2F0KHYsIDEwKSk7XG4gICAgfSk7XG5cbiAgICB2YWx1ZSA9IDAuMDtcbiAgICBiYXNlID0gMTtcblxuICAgIGRpZ2l0cy5mb3JFYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgICB2YWx1ZSArPSBkICogYmFzZTtcbiAgICAgIGJhc2UgKj0gNjA7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc2lnbiAqIHZhbHVlO1xuXG4gIH1cbiAgcmV0dXJuIHNpZ24gKiBwYXJzZUZsb2F0KHZhbHVlLCAxMCk7XG59XG5cblxudmFyIFNDSUVOVElGSUNfV0lUSE9VVF9ET1QgPSAvXlstK10/WzAtOV0rZS87XG5cbmZ1bmN0aW9uIHJlcHJlc2VudFlhbWxGbG9hdChvYmplY3QsIHN0eWxlKSB7XG4gIHZhciByZXM7XG5cbiAgaWYgKGlzTmFOKG9iamVjdCkpIHtcbiAgICBzd2l0Y2ggKHN0eWxlKSB7XG4gICAgICBjYXNlICdsb3dlcmNhc2UnOiByZXR1cm4gJy5uYW4nO1xuICAgICAgY2FzZSAndXBwZXJjYXNlJzogcmV0dXJuICcuTkFOJztcbiAgICAgIGNhc2UgJ2NhbWVsY2FzZSc6IHJldHVybiAnLk5hTic7XG4gICAgfVxuICB9IGVsc2UgaWYgKE51bWJlci5QT1NJVElWRV9JTkZJTklUWSA9PT0gb2JqZWN0KSB7XG4gICAgc3dpdGNoIChzdHlsZSkge1xuICAgICAgY2FzZSAnbG93ZXJjYXNlJzogcmV0dXJuICcuaW5mJztcbiAgICAgIGNhc2UgJ3VwcGVyY2FzZSc6IHJldHVybiAnLklORic7XG4gICAgICBjYXNlICdjYW1lbGNhc2UnOiByZXR1cm4gJy5JbmYnO1xuICAgIH1cbiAgfSBlbHNlIGlmIChOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFkgPT09IG9iamVjdCkge1xuICAgIHN3aXRjaCAoc3R5bGUpIHtcbiAgICAgIGNhc2UgJ2xvd2VyY2FzZSc6IHJldHVybiAnLS5pbmYnO1xuICAgICAgY2FzZSAndXBwZXJjYXNlJzogcmV0dXJuICctLklORic7XG4gICAgICBjYXNlICdjYW1lbGNhc2UnOiByZXR1cm4gJy0uSW5mJztcbiAgICB9XG4gIH0gZWxzZSBpZiAoY29tbW9uLmlzTmVnYXRpdmVaZXJvKG9iamVjdCkpIHtcbiAgICByZXR1cm4gJy0wLjAnO1xuICB9XG5cbiAgcmVzID0gb2JqZWN0LnRvU3RyaW5nKDEwKTtcblxuICAvLyBKUyBzdHJpbmdpZmllciBjYW4gYnVpbGQgc2NpZW50aWZpYyBmb3JtYXQgd2l0aG91dCBkb3RzOiA1ZS0xMDAsXG4gIC8vIHdoaWxlIFlBTUwgcmVxdXJlcyBkb3Q6IDUuZS0xMDAuIEZpeCBpdCB3aXRoIHNpbXBsZSBoYWNrXG5cbiAgcmV0dXJuIFNDSUVOVElGSUNfV0lUSE9VVF9ET1QudGVzdChyZXMpID8gcmVzLnJlcGxhY2UoJ2UnLCAnLmUnKSA6IHJlcztcbn1cblxuZnVuY3Rpb24gaXNGbG9hdChvYmplY3QpIHtcbiAgcmV0dXJuIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqZWN0KSA9PT0gJ1tvYmplY3QgTnVtYmVyXScpICYmXG4gICAgICAgICAob2JqZWN0ICUgMSAhPT0gMCB8fCBjb21tb24uaXNOZWdhdGl2ZVplcm8ob2JqZWN0KSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFR5cGUoJ3RhZzp5YW1sLm9yZywyMDAyOmZsb2F0Jywge1xuICBraW5kOiAnc2NhbGFyJyxcbiAgcmVzb2x2ZTogcmVzb2x2ZVlhbWxGbG9hdCxcbiAgY29uc3RydWN0OiBjb25zdHJ1Y3RZYW1sRmxvYXQsXG4gIHByZWRpY2F0ZTogaXNGbG9hdCxcbiAgcmVwcmVzZW50OiByZXByZXNlbnRZYW1sRmxvYXQsXG4gIGRlZmF1bHRTdHlsZTogJ2xvd2VyY2FzZSdcbn0pO1xuIiwgIi8vIFN0YW5kYXJkIFlBTUwncyBKU09OIHNjaGVtYS5cbi8vIGh0dHA6Ly93d3cueWFtbC5vcmcvc3BlYy8xLjIvc3BlYy5odG1sI2lkMjgwMzIzMVxuLy9cbi8vIE5PVEU6IEpTLVlBTUwgZG9lcyBub3Qgc3VwcG9ydCBzY2hlbWEtc3BlY2lmaWMgdGFnIHJlc29sdXRpb24gcmVzdHJpY3Rpb25zLlxuLy8gU28sIHRoaXMgc2NoZW1hIGlzIG5vdCBzdWNoIHN0cmljdCBhcyBkZWZpbmVkIGluIHRoZSBZQU1MIHNwZWNpZmljYXRpb24uXG4vLyBJdCBhbGxvd3MgbnVtYmVycyBpbiBiaW5hcnkgbm90YWlvbiwgdXNlIGBOdWxsYCBhbmQgYE5VTExgIGFzIGBudWxsYCwgZXRjLlxuXG5cbid1c2Ugc3RyaWN0JztcblxuXG52YXIgU2NoZW1hID0gcmVxdWlyZSgnLi4vc2NoZW1hJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgU2NoZW1hKHtcbiAgaW5jbHVkZTogW1xuICAgIHJlcXVpcmUoJy4vZmFpbHNhZmUnKVxuICBdLFxuICBpbXBsaWNpdDogW1xuICAgIHJlcXVpcmUoJy4uL3R5cGUvbnVsbCcpLFxuICAgIHJlcXVpcmUoJy4uL3R5cGUvYm9vbCcpLFxuICAgIHJlcXVpcmUoJy4uL3R5cGUvaW50JyksXG4gICAgcmVxdWlyZSgnLi4vdHlwZS9mbG9hdCcpXG4gIF1cbn0pO1xuIiwgIi8vIFN0YW5kYXJkIFlBTUwncyBDb3JlIHNjaGVtYS5cbi8vIGh0dHA6Ly93d3cueWFtbC5vcmcvc3BlYy8xLjIvc3BlYy5odG1sI2lkMjgwNDkyM1xuLy9cbi8vIE5PVEU6IEpTLVlBTUwgZG9lcyBub3Qgc3VwcG9ydCBzY2hlbWEtc3BlY2lmaWMgdGFnIHJlc29sdXRpb24gcmVzdHJpY3Rpb25zLlxuLy8gU28sIENvcmUgc2NoZW1hIGhhcyBubyBkaXN0aW5jdGlvbnMgZnJvbSBKU09OIHNjaGVtYSBpcyBKUy1ZQU1MLlxuXG5cbid1c2Ugc3RyaWN0JztcblxuXG52YXIgU2NoZW1hID0gcmVxdWlyZSgnLi4vc2NoZW1hJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgU2NoZW1hKHtcbiAgaW5jbHVkZTogW1xuICAgIHJlcXVpcmUoJy4vanNvbicpXG4gIF1cbn0pO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIFR5cGUgPSByZXF1aXJlKCcuLi90eXBlJyk7XG5cbnZhciBZQU1MX0RBVEVfUkVHRVhQID0gbmV3IFJlZ0V4cChcbiAgJ14oWzAtOV1bMC05XVswLTldWzAtOV0pJyAgICAgICAgICArIC8vIFsxXSB5ZWFyXG4gICctKFswLTldWzAtOV0pJyAgICAgICAgICAgICAgICAgICAgKyAvLyBbMl0gbW9udGhcbiAgJy0oWzAtOV1bMC05XSkkJyk7ICAgICAgICAgICAgICAgICAgIC8vIFszXSBkYXlcblxudmFyIFlBTUxfVElNRVNUQU1QX1JFR0VYUCA9IG5ldyBSZWdFeHAoXG4gICdeKFswLTldWzAtOV1bMC05XVswLTldKScgICAgICAgICAgKyAvLyBbMV0geWVhclxuICAnLShbMC05XVswLTldPyknICAgICAgICAgICAgICAgICAgICsgLy8gWzJdIG1vbnRoXG4gICctKFswLTldWzAtOV0/KScgICAgICAgICAgICAgICAgICAgKyAvLyBbM10gZGF5XG4gICcoPzpbVHRdfFsgXFxcXHRdKyknICAgICAgICAgICAgICAgICArIC8vIC4uLlxuICAnKFswLTldWzAtOV0/KScgICAgICAgICAgICAgICAgICAgICsgLy8gWzRdIGhvdXJcbiAgJzooWzAtOV1bMC05XSknICAgICAgICAgICAgICAgICAgICArIC8vIFs1XSBtaW51dGVcbiAgJzooWzAtOV1bMC05XSknICAgICAgICAgICAgICAgICAgICArIC8vIFs2XSBzZWNvbmRcbiAgJyg/OlxcXFwuKFswLTldKikpPycgICAgICAgICAgICAgICAgICsgLy8gWzddIGZyYWN0aW9uXG4gICcoPzpbIFxcXFx0XSooWnwoWy0rXSkoWzAtOV1bMC05XT8pJyArIC8vIFs4XSB0eiBbOV0gdHpfc2lnbiBbMTBdIHR6X2hvdXJcbiAgJyg/OjooWzAtOV1bMC05XSkpPykpPyQnKTsgICAgICAgICAgIC8vIFsxMV0gdHpfbWludXRlXG5cbmZ1bmN0aW9uIHJlc29sdmVZYW1sVGltZXN0YW1wKGRhdGEpIHtcbiAgaWYgKGRhdGEgPT09IG51bGwpIHJldHVybiBmYWxzZTtcbiAgaWYgKFlBTUxfREFURV9SRUdFWFAuZXhlYyhkYXRhKSAhPT0gbnVsbCkgcmV0dXJuIHRydWU7XG4gIGlmIChZQU1MX1RJTUVTVEFNUF9SRUdFWFAuZXhlYyhkYXRhKSAhPT0gbnVsbCkgcmV0dXJuIHRydWU7XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0WWFtbFRpbWVzdGFtcChkYXRhKSB7XG4gIHZhciBtYXRjaCwgeWVhciwgbW9udGgsIGRheSwgaG91ciwgbWludXRlLCBzZWNvbmQsIGZyYWN0aW9uID0gMCxcbiAgICAgIGRlbHRhID0gbnVsbCwgdHpfaG91ciwgdHpfbWludXRlLCBkYXRlO1xuXG4gIG1hdGNoID0gWUFNTF9EQVRFX1JFR0VYUC5leGVjKGRhdGEpO1xuICBpZiAobWF0Y2ggPT09IG51bGwpIG1hdGNoID0gWUFNTF9USU1FU1RBTVBfUkVHRVhQLmV4ZWMoZGF0YSk7XG5cbiAgaWYgKG1hdGNoID09PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoJ0RhdGUgcmVzb2x2ZSBlcnJvcicpO1xuXG4gIC8vIG1hdGNoOiBbMV0geWVhciBbMl0gbW9udGggWzNdIGRheVxuXG4gIHllYXIgPSArKG1hdGNoWzFdKTtcbiAgbW9udGggPSArKG1hdGNoWzJdKSAtIDE7IC8vIEpTIG1vbnRoIHN0YXJ0cyB3aXRoIDBcbiAgZGF5ID0gKyhtYXRjaFszXSk7XG5cbiAgaWYgKCFtYXRjaFs0XSkgeyAvLyBubyBob3VyXG4gICAgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKHllYXIsIG1vbnRoLCBkYXkpKTtcbiAgfVxuXG4gIC8vIG1hdGNoOiBbNF0gaG91ciBbNV0gbWludXRlIFs2XSBzZWNvbmQgWzddIGZyYWN0aW9uXG5cbiAgaG91ciA9ICsobWF0Y2hbNF0pO1xuICBtaW51dGUgPSArKG1hdGNoWzVdKTtcbiAgc2Vjb25kID0gKyhtYXRjaFs2XSk7XG5cbiAgaWYgKG1hdGNoWzddKSB7XG4gICAgZnJhY3Rpb24gPSBtYXRjaFs3XS5zbGljZSgwLCAzKTtcbiAgICB3aGlsZSAoZnJhY3Rpb24ubGVuZ3RoIDwgMykgeyAvLyBtaWxsaS1zZWNvbmRzXG4gICAgICBmcmFjdGlvbiArPSAnMCc7XG4gICAgfVxuICAgIGZyYWN0aW9uID0gK2ZyYWN0aW9uO1xuICB9XG5cbiAgLy8gbWF0Y2g6IFs4XSB0eiBbOV0gdHpfc2lnbiBbMTBdIHR6X2hvdXIgWzExXSB0el9taW51dGVcblxuICBpZiAobWF0Y2hbOV0pIHtcbiAgICB0el9ob3VyID0gKyhtYXRjaFsxMF0pO1xuICAgIHR6X21pbnV0ZSA9ICsobWF0Y2hbMTFdIHx8IDApO1xuICAgIGRlbHRhID0gKHR6X2hvdXIgKiA2MCArIHR6X21pbnV0ZSkgKiA2MDAwMDsgLy8gZGVsdGEgaW4gbWlsaS1zZWNvbmRzXG4gICAgaWYgKG1hdGNoWzldID09PSAnLScpIGRlbHRhID0gLWRlbHRhO1xuICB9XG5cbiAgZGF0ZSA9IG5ldyBEYXRlKERhdGUuVVRDKHllYXIsIG1vbnRoLCBkYXksIGhvdXIsIG1pbnV0ZSwgc2Vjb25kLCBmcmFjdGlvbikpO1xuXG4gIGlmIChkZWx0YSkgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpIC0gZGVsdGEpO1xuXG4gIHJldHVybiBkYXRlO1xufVxuXG5mdW5jdGlvbiByZXByZXNlbnRZYW1sVGltZXN0YW1wKG9iamVjdCAvKiwgc3R5bGUqLykge1xuICByZXR1cm4gb2JqZWN0LnRvSVNPU3RyaW5nKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFR5cGUoJ3RhZzp5YW1sLm9yZywyMDAyOnRpbWVzdGFtcCcsIHtcbiAga2luZDogJ3NjYWxhcicsXG4gIHJlc29sdmU6IHJlc29sdmVZYW1sVGltZXN0YW1wLFxuICBjb25zdHJ1Y3Q6IGNvbnN0cnVjdFlhbWxUaW1lc3RhbXAsXG4gIGluc3RhbmNlT2Y6IERhdGUsXG4gIHJlcHJlc2VudDogcmVwcmVzZW50WWFtbFRpbWVzdGFtcFxufSk7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgVHlwZSA9IHJlcXVpcmUoJy4uL3R5cGUnKTtcblxuZnVuY3Rpb24gcmVzb2x2ZVlhbWxNZXJnZShkYXRhKSB7XG4gIHJldHVybiBkYXRhID09PSAnPDwnIHx8IGRhdGEgPT09IG51bGw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFR5cGUoJ3RhZzp5YW1sLm9yZywyMDAyOm1lcmdlJywge1xuICBraW5kOiAnc2NhbGFyJyxcbiAgcmVzb2x2ZTogcmVzb2x2ZVlhbWxNZXJnZVxufSk7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG4vKmVzbGludC1kaXNhYmxlIG5vLWJpdHdpc2UqL1xuXG52YXIgTm9kZUJ1ZmZlcjtcblxudHJ5IHtcbiAgLy8gQSB0cmljayBmb3IgYnJvd3NlcmlmaWVkIHZlcnNpb24sIHRvIG5vdCBpbmNsdWRlIGBCdWZmZXJgIHNoaW1cbiAgdmFyIF9yZXF1aXJlID0gcmVxdWlyZTtcbiAgTm9kZUJ1ZmZlciA9IF9yZXF1aXJlKCdidWZmZXInKS5CdWZmZXI7XG59IGNhdGNoIChfXykge31cblxudmFyIFR5cGUgICAgICAgPSByZXF1aXJlKCcuLi90eXBlJyk7XG5cblxuLy8gWyA2NCwgNjUsIDY2IF0gLT4gWyBwYWRkaW5nLCBDUiwgTEYgXVxudmFyIEJBU0U2NF9NQVAgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz1cXG5cXHInO1xuXG5cbmZ1bmN0aW9uIHJlc29sdmVZYW1sQmluYXJ5KGRhdGEpIHtcbiAgaWYgKGRhdGEgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICB2YXIgY29kZSwgaWR4LCBiaXRsZW4gPSAwLCBtYXggPSBkYXRhLmxlbmd0aCwgbWFwID0gQkFTRTY0X01BUDtcblxuICAvLyBDb252ZXJ0IG9uZSBieSBvbmUuXG4gIGZvciAoaWR4ID0gMDsgaWR4IDwgbWF4OyBpZHgrKykge1xuICAgIGNvZGUgPSBtYXAuaW5kZXhPZihkYXRhLmNoYXJBdChpZHgpKTtcblxuICAgIC8vIFNraXAgQ1IvTEZcbiAgICBpZiAoY29kZSA+IDY0KSBjb250aW51ZTtcblxuICAgIC8vIEZhaWwgb24gaWxsZWdhbCBjaGFyYWN0ZXJzXG4gICAgaWYgKGNvZGUgPCAwKSByZXR1cm4gZmFsc2U7XG5cbiAgICBiaXRsZW4gKz0gNjtcbiAgfVxuXG4gIC8vIElmIHRoZXJlIGFyZSBhbnkgYml0cyBsZWZ0LCBzb3VyY2Ugd2FzIGNvcnJ1cHRlZFxuICByZXR1cm4gKGJpdGxlbiAlIDgpID09PSAwO1xufVxuXG5mdW5jdGlvbiBjb25zdHJ1Y3RZYW1sQmluYXJ5KGRhdGEpIHtcbiAgdmFyIGlkeCwgdGFpbGJpdHMsXG4gICAgICBpbnB1dCA9IGRhdGEucmVwbGFjZSgvW1xcclxcbj1dL2csICcnKSwgLy8gcmVtb3ZlIENSL0xGICYgcGFkZGluZyB0byBzaW1wbGlmeSBzY2FuXG4gICAgICBtYXggPSBpbnB1dC5sZW5ndGgsXG4gICAgICBtYXAgPSBCQVNFNjRfTUFQLFxuICAgICAgYml0cyA9IDAsXG4gICAgICByZXN1bHQgPSBbXTtcblxuICAvLyBDb2xsZWN0IGJ5IDYqNCBiaXRzICgzIGJ5dGVzKVxuXG4gIGZvciAoaWR4ID0gMDsgaWR4IDwgbWF4OyBpZHgrKykge1xuICAgIGlmICgoaWR4ICUgNCA9PT0gMCkgJiYgaWR4KSB7XG4gICAgICByZXN1bHQucHVzaCgoYml0cyA+PiAxNikgJiAweEZGKTtcbiAgICAgIHJlc3VsdC5wdXNoKChiaXRzID4+IDgpICYgMHhGRik7XG4gICAgICByZXN1bHQucHVzaChiaXRzICYgMHhGRik7XG4gICAgfVxuXG4gICAgYml0cyA9IChiaXRzIDw8IDYpIHwgbWFwLmluZGV4T2YoaW5wdXQuY2hhckF0KGlkeCkpO1xuICB9XG5cbiAgLy8gRHVtcCB0YWlsXG5cbiAgdGFpbGJpdHMgPSAobWF4ICUgNCkgKiA2O1xuXG4gIGlmICh0YWlsYml0cyA9PT0gMCkge1xuICAgIHJlc3VsdC5wdXNoKChiaXRzID4+IDE2KSAmIDB4RkYpO1xuICAgIHJlc3VsdC5wdXNoKChiaXRzID4+IDgpICYgMHhGRik7XG4gICAgcmVzdWx0LnB1c2goYml0cyAmIDB4RkYpO1xuICB9IGVsc2UgaWYgKHRhaWxiaXRzID09PSAxOCkge1xuICAgIHJlc3VsdC5wdXNoKChiaXRzID4+IDEwKSAmIDB4RkYpO1xuICAgIHJlc3VsdC5wdXNoKChiaXRzID4+IDIpICYgMHhGRik7XG4gIH0gZWxzZSBpZiAodGFpbGJpdHMgPT09IDEyKSB7XG4gICAgcmVzdWx0LnB1c2goKGJpdHMgPj4gNCkgJiAweEZGKTtcbiAgfVxuXG4gIC8vIFdyYXAgaW50byBCdWZmZXIgZm9yIE5vZGVKUyBhbmQgbGVhdmUgQXJyYXkgZm9yIGJyb3dzZXJcbiAgaWYgKE5vZGVCdWZmZXIpIHtcbiAgICAvLyBTdXBwb3J0IG5vZGUgNi4rIEJ1ZmZlciBBUEkgd2hlbiBhdmFpbGFibGVcbiAgICByZXR1cm4gTm9kZUJ1ZmZlci5mcm9tID8gTm9kZUJ1ZmZlci5mcm9tKHJlc3VsdCkgOiBuZXcgTm9kZUJ1ZmZlcihyZXN1bHQpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gcmVwcmVzZW50WWFtbEJpbmFyeShvYmplY3QgLyosIHN0eWxlKi8pIHtcbiAgdmFyIHJlc3VsdCA9ICcnLCBiaXRzID0gMCwgaWR4LCB0YWlsLFxuICAgICAgbWF4ID0gb2JqZWN0Lmxlbmd0aCxcbiAgICAgIG1hcCA9IEJBU0U2NF9NQVA7XG5cbiAgLy8gQ29udmVydCBldmVyeSB0aHJlZSBieXRlcyB0byA0IEFTQ0lJIGNoYXJhY3RlcnMuXG5cbiAgZm9yIChpZHggPSAwOyBpZHggPCBtYXg7IGlkeCsrKSB7XG4gICAgaWYgKChpZHggJSAzID09PSAwKSAmJiBpZHgpIHtcbiAgICAgIHJlc3VsdCArPSBtYXBbKGJpdHMgPj4gMTgpICYgMHgzRl07XG4gICAgICByZXN1bHQgKz0gbWFwWyhiaXRzID4+IDEyKSAmIDB4M0ZdO1xuICAgICAgcmVzdWx0ICs9IG1hcFsoYml0cyA+PiA2KSAmIDB4M0ZdO1xuICAgICAgcmVzdWx0ICs9IG1hcFtiaXRzICYgMHgzRl07XG4gICAgfVxuXG4gICAgYml0cyA9IChiaXRzIDw8IDgpICsgb2JqZWN0W2lkeF07XG4gIH1cblxuICAvLyBEdW1wIHRhaWxcblxuICB0YWlsID0gbWF4ICUgMztcblxuICBpZiAodGFpbCA9PT0gMCkge1xuICAgIHJlc3VsdCArPSBtYXBbKGJpdHMgPj4gMTgpICYgMHgzRl07XG4gICAgcmVzdWx0ICs9IG1hcFsoYml0cyA+PiAxMikgJiAweDNGXTtcbiAgICByZXN1bHQgKz0gbWFwWyhiaXRzID4+IDYpICYgMHgzRl07XG4gICAgcmVzdWx0ICs9IG1hcFtiaXRzICYgMHgzRl07XG4gIH0gZWxzZSBpZiAodGFpbCA9PT0gMikge1xuICAgIHJlc3VsdCArPSBtYXBbKGJpdHMgPj4gMTApICYgMHgzRl07XG4gICAgcmVzdWx0ICs9IG1hcFsoYml0cyA+PiA0KSAmIDB4M0ZdO1xuICAgIHJlc3VsdCArPSBtYXBbKGJpdHMgPDwgMikgJiAweDNGXTtcbiAgICByZXN1bHQgKz0gbWFwWzY0XTtcbiAgfSBlbHNlIGlmICh0YWlsID09PSAxKSB7XG4gICAgcmVzdWx0ICs9IG1hcFsoYml0cyA+PiAyKSAmIDB4M0ZdO1xuICAgIHJlc3VsdCArPSBtYXBbKGJpdHMgPDwgNCkgJiAweDNGXTtcbiAgICByZXN1bHQgKz0gbWFwWzY0XTtcbiAgICByZXN1bHQgKz0gbWFwWzY0XTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGlzQmluYXJ5KG9iamVjdCkge1xuICByZXR1cm4gTm9kZUJ1ZmZlciAmJiBOb2RlQnVmZmVyLmlzQnVmZmVyKG9iamVjdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFR5cGUoJ3RhZzp5YW1sLm9yZywyMDAyOmJpbmFyeScsIHtcbiAga2luZDogJ3NjYWxhcicsXG4gIHJlc29sdmU6IHJlc29sdmVZYW1sQmluYXJ5LFxuICBjb25zdHJ1Y3Q6IGNvbnN0cnVjdFlhbWxCaW5hcnksXG4gIHByZWRpY2F0ZTogaXNCaW5hcnksXG4gIHJlcHJlc2VudDogcmVwcmVzZW50WWFtbEJpbmFyeVxufSk7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgVHlwZSA9IHJlcXVpcmUoJy4uL3R5cGUnKTtcblxudmFyIF9oYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgX3RvU3RyaW5nICAgICAgID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuZnVuY3Rpb24gcmVzb2x2ZVlhbWxPbWFwKGRhdGEpIHtcbiAgaWYgKGRhdGEgPT09IG51bGwpIHJldHVybiB0cnVlO1xuXG4gIHZhciBvYmplY3RLZXlzID0gW10sIGluZGV4LCBsZW5ndGgsIHBhaXIsIHBhaXJLZXksIHBhaXJIYXNLZXksXG4gICAgICBvYmplY3QgPSBkYXRhO1xuXG4gIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSBvYmplY3QubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgIHBhaXIgPSBvYmplY3RbaW5kZXhdO1xuICAgIHBhaXJIYXNLZXkgPSBmYWxzZTtcblxuICAgIGlmIChfdG9TdHJpbmcuY2FsbChwYWlyKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHJldHVybiBmYWxzZTtcblxuICAgIGZvciAocGFpcktleSBpbiBwYWlyKSB7XG4gICAgICBpZiAoX2hhc093blByb3BlcnR5LmNhbGwocGFpciwgcGFpcktleSkpIHtcbiAgICAgICAgaWYgKCFwYWlySGFzS2V5KSBwYWlySGFzS2V5ID0gdHJ1ZTtcbiAgICAgICAgZWxzZSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFwYWlySGFzS2V5KSByZXR1cm4gZmFsc2U7XG5cbiAgICBpZiAob2JqZWN0S2V5cy5pbmRleE9mKHBhaXJLZXkpID09PSAtMSkgb2JqZWN0S2V5cy5wdXNoKHBhaXJLZXkpO1xuICAgIGVsc2UgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGNvbnN0cnVjdFlhbWxPbWFwKGRhdGEpIHtcbiAgcmV0dXJuIGRhdGEgIT09IG51bGwgPyBkYXRhIDogW107XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFR5cGUoJ3RhZzp5YW1sLm9yZywyMDAyOm9tYXAnLCB7XG4gIGtpbmQ6ICdzZXF1ZW5jZScsXG4gIHJlc29sdmU6IHJlc29sdmVZYW1sT21hcCxcbiAgY29uc3RydWN0OiBjb25zdHJ1Y3RZYW1sT21hcFxufSk7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgVHlwZSA9IHJlcXVpcmUoJy4uL3R5cGUnKTtcblxudmFyIF90b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbmZ1bmN0aW9uIHJlc29sdmVZYW1sUGFpcnMoZGF0YSkge1xuICBpZiAoZGF0YSA9PT0gbnVsbCkgcmV0dXJuIHRydWU7XG5cbiAgdmFyIGluZGV4LCBsZW5ndGgsIHBhaXIsIGtleXMsIHJlc3VsdCxcbiAgICAgIG9iamVjdCA9IGRhdGE7XG5cbiAgcmVzdWx0ID0gbmV3IEFycmF5KG9iamVjdC5sZW5ndGgpO1xuXG4gIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSBvYmplY3QubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgIHBhaXIgPSBvYmplY3RbaW5kZXhdO1xuXG4gICAgaWYgKF90b1N0cmluZy5jYWxsKHBhaXIpICE9PSAnW29iamVjdCBPYmplY3RdJykgcmV0dXJuIGZhbHNlO1xuXG4gICAga2V5cyA9IE9iamVjdC5rZXlzKHBhaXIpO1xuXG4gICAgaWYgKGtleXMubGVuZ3RoICE9PSAxKSByZXR1cm4gZmFsc2U7XG5cbiAgICByZXN1bHRbaW5kZXhdID0gWyBrZXlzWzBdLCBwYWlyW2tleXNbMF1dIF07XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0WWFtbFBhaXJzKGRhdGEpIHtcbiAgaWYgKGRhdGEgPT09IG51bGwpIHJldHVybiBbXTtcblxuICB2YXIgaW5kZXgsIGxlbmd0aCwgcGFpciwga2V5cywgcmVzdWx0LFxuICAgICAgb2JqZWN0ID0gZGF0YTtcblxuICByZXN1bHQgPSBuZXcgQXJyYXkob2JqZWN0Lmxlbmd0aCk7XG5cbiAgZm9yIChpbmRleCA9IDAsIGxlbmd0aCA9IG9iamVjdC5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgcGFpciA9IG9iamVjdFtpbmRleF07XG5cbiAgICBrZXlzID0gT2JqZWN0LmtleXMocGFpcik7XG5cbiAgICByZXN1bHRbaW5kZXhdID0gWyBrZXlzWzBdLCBwYWlyW2tleXNbMF1dIF07XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBUeXBlKCd0YWc6eWFtbC5vcmcsMjAwMjpwYWlycycsIHtcbiAga2luZDogJ3NlcXVlbmNlJyxcbiAgcmVzb2x2ZTogcmVzb2x2ZVlhbWxQYWlycyxcbiAgY29uc3RydWN0OiBjb25zdHJ1Y3RZYW1sUGFpcnNcbn0pO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIFR5cGUgPSByZXF1aXJlKCcuLi90eXBlJyk7XG5cbnZhciBfaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG5mdW5jdGlvbiByZXNvbHZlWWFtbFNldChkYXRhKSB7XG4gIGlmIChkYXRhID09PSBudWxsKSByZXR1cm4gdHJ1ZTtcblxuICB2YXIga2V5LCBvYmplY3QgPSBkYXRhO1xuXG4gIGZvciAoa2V5IGluIG9iamVjdCkge1xuICAgIGlmIChfaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkpIHtcbiAgICAgIGlmIChvYmplY3Rba2V5XSAhPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBjb25zdHJ1Y3RZYW1sU2V0KGRhdGEpIHtcbiAgcmV0dXJuIGRhdGEgIT09IG51bGwgPyBkYXRhIDoge307XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFR5cGUoJ3RhZzp5YW1sLm9yZywyMDAyOnNldCcsIHtcbiAga2luZDogJ21hcHBpbmcnLFxuICByZXNvbHZlOiByZXNvbHZlWWFtbFNldCxcbiAgY29uc3RydWN0OiBjb25zdHJ1Y3RZYW1sU2V0XG59KTtcbiIsICIvLyBKUy1ZQU1MJ3MgZGVmYXVsdCBzY2hlbWEgZm9yIGBzYWZlTG9hZGAgZnVuY3Rpb24uXG4vLyBJdCBpcyBub3QgZGVzY3JpYmVkIGluIHRoZSBZQU1MIHNwZWNpZmljYXRpb24uXG4vL1xuLy8gVGhpcyBzY2hlbWEgaXMgYmFzZWQgb24gc3RhbmRhcmQgWUFNTCdzIENvcmUgc2NoZW1hIGFuZCBpbmNsdWRlcyBtb3N0IG9mXG4vLyBleHRyYSB0eXBlcyBkZXNjcmliZWQgYXQgWUFNTCB0YWcgcmVwb3NpdG9yeS4gKGh0dHA6Ly95YW1sLm9yZy90eXBlLylcblxuXG4ndXNlIHN0cmljdCc7XG5cblxudmFyIFNjaGVtYSA9IHJlcXVpcmUoJy4uL3NjaGVtYScpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFNjaGVtYSh7XG4gIGluY2x1ZGU6IFtcbiAgICByZXF1aXJlKCcuL2NvcmUnKVxuICBdLFxuICBpbXBsaWNpdDogW1xuICAgIHJlcXVpcmUoJy4uL3R5cGUvdGltZXN0YW1wJyksXG4gICAgcmVxdWlyZSgnLi4vdHlwZS9tZXJnZScpXG4gIF0sXG4gIGV4cGxpY2l0OiBbXG4gICAgcmVxdWlyZSgnLi4vdHlwZS9iaW5hcnknKSxcbiAgICByZXF1aXJlKCcuLi90eXBlL29tYXAnKSxcbiAgICByZXF1aXJlKCcuLi90eXBlL3BhaXJzJyksXG4gICAgcmVxdWlyZSgnLi4vdHlwZS9zZXQnKVxuICBdXG59KTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBUeXBlID0gcmVxdWlyZSgnLi4vLi4vdHlwZScpO1xuXG5mdW5jdGlvbiByZXNvbHZlSmF2YXNjcmlwdFVuZGVmaW5lZCgpIHtcbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGNvbnN0cnVjdEphdmFzY3JpcHRVbmRlZmluZWQoKSB7XG4gIC8qZXNsaW50LWRpc2FibGUgbm8tdW5kZWZpbmVkKi9cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gcmVwcmVzZW50SmF2YXNjcmlwdFVuZGVmaW5lZCgpIHtcbiAgcmV0dXJuICcnO1xufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmplY3QgPT09ICd1bmRlZmluZWQnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBUeXBlKCd0YWc6eWFtbC5vcmcsMjAwMjpqcy91bmRlZmluZWQnLCB7XG4gIGtpbmQ6ICdzY2FsYXInLFxuICByZXNvbHZlOiByZXNvbHZlSmF2YXNjcmlwdFVuZGVmaW5lZCxcbiAgY29uc3RydWN0OiBjb25zdHJ1Y3RKYXZhc2NyaXB0VW5kZWZpbmVkLFxuICBwcmVkaWNhdGU6IGlzVW5kZWZpbmVkLFxuICByZXByZXNlbnQ6IHJlcHJlc2VudEphdmFzY3JpcHRVbmRlZmluZWRcbn0pO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIFR5cGUgPSByZXF1aXJlKCcuLi8uLi90eXBlJyk7XG5cbmZ1bmN0aW9uIHJlc29sdmVKYXZhc2NyaXB0UmVnRXhwKGRhdGEpIHtcbiAgaWYgKGRhdGEgPT09IG51bGwpIHJldHVybiBmYWxzZTtcbiAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2U7XG5cbiAgdmFyIHJlZ2V4cCA9IGRhdGEsXG4gICAgICB0YWlsICAgPSAvXFwvKFtnaW1dKikkLy5leGVjKGRhdGEpLFxuICAgICAgbW9kaWZpZXJzID0gJyc7XG5cbiAgLy8gaWYgcmVnZXhwIHN0YXJ0cyB3aXRoICcvJyBpdCBjYW4gaGF2ZSBtb2RpZmllcnMgYW5kIG11c3QgYmUgcHJvcGVybHkgY2xvc2VkXG4gIC8vIGAvZm9vL2dpbWAgLSBtb2RpZmllcnMgdGFpbCBjYW4gYmUgbWF4aW11bSAzIGNoYXJzXG4gIGlmIChyZWdleHBbMF0gPT09ICcvJykge1xuICAgIGlmICh0YWlsKSBtb2RpZmllcnMgPSB0YWlsWzFdO1xuXG4gICAgaWYgKG1vZGlmaWVycy5sZW5ndGggPiAzKSByZXR1cm4gZmFsc2U7XG4gICAgLy8gaWYgZXhwcmVzc2lvbiBzdGFydHMgd2l0aCAvLCBpcyBzaG91bGQgYmUgcHJvcGVybHkgdGVybWluYXRlZFxuICAgIGlmIChyZWdleHBbcmVnZXhwLmxlbmd0aCAtIG1vZGlmaWVycy5sZW5ndGggLSAxXSAhPT0gJy8nKSByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0SmF2YXNjcmlwdFJlZ0V4cChkYXRhKSB7XG4gIHZhciByZWdleHAgPSBkYXRhLFxuICAgICAgdGFpbCAgID0gL1xcLyhbZ2ltXSopJC8uZXhlYyhkYXRhKSxcbiAgICAgIG1vZGlmaWVycyA9ICcnO1xuXG4gIC8vIGAvZm9vL2dpbWAgLSB0YWlsIGNhbiBiZSBtYXhpbXVtIDQgY2hhcnNcbiAgaWYgKHJlZ2V4cFswXSA9PT0gJy8nKSB7XG4gICAgaWYgKHRhaWwpIG1vZGlmaWVycyA9IHRhaWxbMV07XG4gICAgcmVnZXhwID0gcmVnZXhwLnNsaWNlKDEsIHJlZ2V4cC5sZW5ndGggLSBtb2RpZmllcnMubGVuZ3RoIC0gMSk7XG4gIH1cblxuICByZXR1cm4gbmV3IFJlZ0V4cChyZWdleHAsIG1vZGlmaWVycyk7XG59XG5cbmZ1bmN0aW9uIHJlcHJlc2VudEphdmFzY3JpcHRSZWdFeHAob2JqZWN0IC8qLCBzdHlsZSovKSB7XG4gIHZhciByZXN1bHQgPSAnLycgKyBvYmplY3Quc291cmNlICsgJy8nO1xuXG4gIGlmIChvYmplY3QuZ2xvYmFsKSByZXN1bHQgKz0gJ2cnO1xuICBpZiAob2JqZWN0Lm11bHRpbGluZSkgcmVzdWx0ICs9ICdtJztcbiAgaWYgKG9iamVjdC5pZ25vcmVDYXNlKSByZXN1bHQgKz0gJ2knO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGlzUmVnRXhwKG9iamVjdCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCkgPT09ICdbb2JqZWN0IFJlZ0V4cF0nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBUeXBlKCd0YWc6eWFtbC5vcmcsMjAwMjpqcy9yZWdleHAnLCB7XG4gIGtpbmQ6ICdzY2FsYXInLFxuICByZXNvbHZlOiByZXNvbHZlSmF2YXNjcmlwdFJlZ0V4cCxcbiAgY29uc3RydWN0OiBjb25zdHJ1Y3RKYXZhc2NyaXB0UmVnRXhwLFxuICBwcmVkaWNhdGU6IGlzUmVnRXhwLFxuICByZXByZXNlbnQ6IHJlcHJlc2VudEphdmFzY3JpcHRSZWdFeHBcbn0pO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIGVzcHJpbWE7XG5cbi8vIEJyb3dzZXJpZmllZCB2ZXJzaW9uIGRvZXMgbm90IGhhdmUgZXNwcmltYVxuLy9cbi8vIDEuIEZvciBub2RlLmpzIGp1c3QgcmVxdWlyZSBtb2R1bGUgYXMgZGVwc1xuLy8gMi4gRm9yIGJyb3dzZXIgdHJ5IHRvIHJlcXVpcmUgbXVkdWxlIHZpYSBleHRlcm5hbCBBTUQgc3lzdGVtLlxuLy8gICAgSWYgbm90IGZvdW5kIC0gdHJ5IHRvIGZhbGxiYWNrIHRvIHdpbmRvdy5lc3ByaW1hLiBJZiBub3Rcbi8vICAgIGZvdW5kIHRvbyAtIHRoZW4gZmFpbCB0byBwYXJzZS5cbi8vXG50cnkge1xuICAvLyB3b3JrYXJvdW5kIHRvIGV4Y2x1ZGUgcGFja2FnZSBmcm9tIGJyb3dzZXJpZnkgbGlzdC5cbiAgdmFyIF9yZXF1aXJlID0gcmVxdWlyZTtcbiAgZXNwcmltYSA9IF9yZXF1aXJlKCdlc3ByaW1hJyk7XG59IGNhdGNoIChfKSB7XG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXJlZGVjbGFyZSAqL1xuICAvKiBnbG9iYWwgd2luZG93ICovXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgZXNwcmltYSA9IHdpbmRvdy5lc3ByaW1hO1xufVxuXG52YXIgVHlwZSA9IHJlcXVpcmUoJy4uLy4uL3R5cGUnKTtcblxuZnVuY3Rpb24gcmVzb2x2ZUphdmFzY3JpcHRGdW5jdGlvbihkYXRhKSB7XG4gIGlmIChkYXRhID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgdHJ5IHtcbiAgICB2YXIgc291cmNlID0gJygnICsgZGF0YSArICcpJyxcbiAgICAgICAgYXN0ICAgID0gZXNwcmltYS5wYXJzZShzb3VyY2UsIHsgcmFuZ2U6IHRydWUgfSk7XG5cbiAgICBpZiAoYXN0LnR5cGUgICAgICAgICAgICAgICAgICAgICE9PSAnUHJvZ3JhbScgICAgICAgICAgICAgfHxcbiAgICAgICAgYXN0LmJvZHkubGVuZ3RoICAgICAgICAgICAgICE9PSAxICAgICAgICAgICAgICAgICAgICAgfHxcbiAgICAgICAgYXN0LmJvZHlbMF0udHlwZSAgICAgICAgICAgICE9PSAnRXhwcmVzc2lvblN0YXRlbWVudCcgfHxcbiAgICAgICAgKGFzdC5ib2R5WzBdLmV4cHJlc3Npb24udHlwZSAhPT0gJ0Fycm93RnVuY3Rpb25FeHByZXNzaW9uJyAmJlxuICAgICAgICAgIGFzdC5ib2R5WzBdLmV4cHJlc3Npb24udHlwZSAhPT0gJ0Z1bmN0aW9uRXhwcmVzc2lvbicpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjb25zdHJ1Y3RKYXZhc2NyaXB0RnVuY3Rpb24oZGF0YSkge1xuICAvKmpzbGludCBldmlsOnRydWUqL1xuXG4gIHZhciBzb3VyY2UgPSAnKCcgKyBkYXRhICsgJyknLFxuICAgICAgYXN0ICAgID0gZXNwcmltYS5wYXJzZShzb3VyY2UsIHsgcmFuZ2U6IHRydWUgfSksXG4gICAgICBwYXJhbXMgPSBbXSxcbiAgICAgIGJvZHk7XG5cbiAgaWYgKGFzdC50eXBlICAgICAgICAgICAgICAgICAgICAhPT0gJ1Byb2dyYW0nICAgICAgICAgICAgIHx8XG4gICAgICBhc3QuYm9keS5sZW5ndGggICAgICAgICAgICAgIT09IDEgICAgICAgICAgICAgICAgICAgICB8fFxuICAgICAgYXN0LmJvZHlbMF0udHlwZSAgICAgICAgICAgICE9PSAnRXhwcmVzc2lvblN0YXRlbWVudCcgfHxcbiAgICAgIChhc3QuYm9keVswXS5leHByZXNzaW9uLnR5cGUgIT09ICdBcnJvd0Z1bmN0aW9uRXhwcmVzc2lvbicgJiZcbiAgICAgICAgYXN0LmJvZHlbMF0uZXhwcmVzc2lvbi50eXBlICE9PSAnRnVuY3Rpb25FeHByZXNzaW9uJykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byByZXNvbHZlIGZ1bmN0aW9uJyk7XG4gIH1cblxuICBhc3QuYm9keVswXS5leHByZXNzaW9uLnBhcmFtcy5mb3JFYWNoKGZ1bmN0aW9uIChwYXJhbSkge1xuICAgIHBhcmFtcy5wdXNoKHBhcmFtLm5hbWUpO1xuICB9KTtcblxuICBib2R5ID0gYXN0LmJvZHlbMF0uZXhwcmVzc2lvbi5ib2R5LnJhbmdlO1xuXG4gIC8vIEVzcHJpbWEncyByYW5nZXMgaW5jbHVkZSB0aGUgZmlyc3QgJ3snIGFuZCB0aGUgbGFzdCAnfScgY2hhcmFjdGVycyBvblxuICAvLyBmdW5jdGlvbiBleHByZXNzaW9ucy4gU28gY3V0IHRoZW0gb3V0LlxuICBpZiAoYXN0LmJvZHlbMF0uZXhwcmVzc2lvbi5ib2R5LnR5cGUgPT09ICdCbG9ja1N0YXRlbWVudCcpIHtcbiAgICAvKmVzbGludC1kaXNhYmxlIG5vLW5ldy1mdW5jKi9cbiAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKHBhcmFtcywgc291cmNlLnNsaWNlKGJvZHlbMF0gKyAxLCBib2R5WzFdIC0gMSkpO1xuICB9XG4gIC8vIEVTNiBhcnJvdyBmdW5jdGlvbnMgY2FuIG9taXQgdGhlIEJsb2NrU3RhdGVtZW50LiBJbiB0aGF0IGNhc2UsIGp1c3QgcmV0dXJuXG4gIC8vIHRoZSBib2R5LlxuICAvKmVzbGludC1kaXNhYmxlIG5vLW5ldy1mdW5jKi9cbiAgcmV0dXJuIG5ldyBGdW5jdGlvbihwYXJhbXMsICdyZXR1cm4gJyArIHNvdXJjZS5zbGljZShib2R5WzBdLCBib2R5WzFdKSk7XG59XG5cbmZ1bmN0aW9uIHJlcHJlc2VudEphdmFzY3JpcHRGdW5jdGlvbihvYmplY3QgLyosIHN0eWxlKi8pIHtcbiAgcmV0dXJuIG9iamVjdC50b1N0cmluZygpO1xufVxuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKG9iamVjdCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFR5cGUoJ3RhZzp5YW1sLm9yZywyMDAyOmpzL2Z1bmN0aW9uJywge1xuICBraW5kOiAnc2NhbGFyJyxcbiAgcmVzb2x2ZTogcmVzb2x2ZUphdmFzY3JpcHRGdW5jdGlvbixcbiAgY29uc3RydWN0OiBjb25zdHJ1Y3RKYXZhc2NyaXB0RnVuY3Rpb24sXG4gIHByZWRpY2F0ZTogaXNGdW5jdGlvbixcbiAgcmVwcmVzZW50OiByZXByZXNlbnRKYXZhc2NyaXB0RnVuY3Rpb25cbn0pO1xuIiwgIi8vIEpTLVlBTUwncyBkZWZhdWx0IHNjaGVtYSBmb3IgYGxvYWRgIGZ1bmN0aW9uLlxuLy8gSXQgaXMgbm90IGRlc2NyaWJlZCBpbiB0aGUgWUFNTCBzcGVjaWZpY2F0aW9uLlxuLy9cbi8vIFRoaXMgc2NoZW1hIGlzIGJhc2VkIG9uIEpTLVlBTUwncyBkZWZhdWx0IHNhZmUgc2NoZW1hIGFuZCBpbmNsdWRlc1xuLy8gSmF2YVNjcmlwdC1zcGVjaWZpYyB0eXBlczogISFqcy91bmRlZmluZWQsICEhanMvcmVnZXhwIGFuZCAhIWpzL2Z1bmN0aW9uLlxuLy9cbi8vIEFsc28gdGhpcyBzY2hlbWEgaXMgdXNlZCBhcyBkZWZhdWx0IGJhc2Ugc2NoZW1hIGF0IGBTY2hlbWEuY3JlYXRlYCBmdW5jdGlvbi5cblxuXG4ndXNlIHN0cmljdCc7XG5cblxudmFyIFNjaGVtYSA9IHJlcXVpcmUoJy4uL3NjaGVtYScpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gU2NoZW1hLkRFRkFVTFQgPSBuZXcgU2NoZW1hKHtcbiAgaW5jbHVkZTogW1xuICAgIHJlcXVpcmUoJy4vZGVmYXVsdF9zYWZlJylcbiAgXSxcbiAgZXhwbGljaXQ6IFtcbiAgICByZXF1aXJlKCcuLi90eXBlL2pzL3VuZGVmaW5lZCcpLFxuICAgIHJlcXVpcmUoJy4uL3R5cGUvanMvcmVnZXhwJyksXG4gICAgcmVxdWlyZSgnLi4vdHlwZS9qcy9mdW5jdGlvbicpXG4gIF1cbn0pO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuLyplc2xpbnQtZGlzYWJsZSBtYXgtbGVuLG5vLXVzZS1iZWZvcmUtZGVmaW5lKi9cblxudmFyIGNvbW1vbiAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL2NvbW1vbicpO1xudmFyIFlBTUxFeGNlcHRpb24gICAgICAgPSByZXF1aXJlKCcuL2V4Y2VwdGlvbicpO1xudmFyIE1hcmsgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL21hcmsnKTtcbnZhciBERUZBVUxUX1NBRkVfU0NIRU1BID0gcmVxdWlyZSgnLi9zY2hlbWEvZGVmYXVsdF9zYWZlJyk7XG52YXIgREVGQVVMVF9GVUxMX1NDSEVNQSA9IHJlcXVpcmUoJy4vc2NoZW1hL2RlZmF1bHRfZnVsbCcpO1xuXG5cbnZhciBfaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG5cbnZhciBDT05URVhUX0ZMT1dfSU4gICA9IDE7XG52YXIgQ09OVEVYVF9GTE9XX09VVCAgPSAyO1xudmFyIENPTlRFWFRfQkxPQ0tfSU4gID0gMztcbnZhciBDT05URVhUX0JMT0NLX09VVCA9IDQ7XG5cblxudmFyIENIT01QSU5HX0NMSVAgID0gMTtcbnZhciBDSE9NUElOR19TVFJJUCA9IDI7XG52YXIgQ0hPTVBJTkdfS0VFUCAgPSAzO1xuXG5cbnZhciBQQVRURVJOX05PTl9QUklOVEFCTEUgICAgICAgICA9IC9bXFx4MDAtXFx4MDhcXHgwQlxceDBDXFx4MEUtXFx4MUZcXHg3Ri1cXHg4NFxceDg2LVxceDlGXFx1RkZGRVxcdUZGRkZdfFtcXHVEODAwLVxcdURCRkZdKD8hW1xcdURDMDAtXFx1REZGRl0pfCg/OlteXFx1RDgwMC1cXHVEQkZGXXxeKVtcXHVEQzAwLVxcdURGRkZdLztcbnZhciBQQVRURVJOX05PTl9BU0NJSV9MSU5FX0JSRUFLUyA9IC9bXFx4ODVcXHUyMDI4XFx1MjAyOV0vO1xudmFyIFBBVFRFUk5fRkxPV19JTkRJQ0FUT1JTICAgICAgID0gL1ssXFxbXFxdXFx7XFx9XS87XG52YXIgUEFUVEVSTl9UQUdfSEFORExFICAgICAgICAgICAgPSAvXig/OiF8ISF8IVthLXpcXC1dKyEpJC9pO1xudmFyIFBBVFRFUk5fVEFHX1VSSSAgICAgICAgICAgICAgID0gL14oPzohfFteLFxcW1xcXVxce1xcfV0pKD86JVswLTlhLWZdezJ9fFswLTlhLXpcXC0jO1xcL1xcPzpAJj1cXCtcXCQsX1xcLiF+XFwqJ1xcKFxcKVxcW1xcXV0pKiQvaTtcblxuXG5mdW5jdGlvbiBfY2xhc3Mob2JqKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKTsgfVxuXG5mdW5jdGlvbiBpc19FT0woYykge1xuICByZXR1cm4gKGMgPT09IDB4MEEvKiBMRiAqLykgfHwgKGMgPT09IDB4MEQvKiBDUiAqLyk7XG59XG5cbmZ1bmN0aW9uIGlzX1dISVRFX1NQQUNFKGMpIHtcbiAgcmV0dXJuIChjID09PSAweDA5LyogVGFiICovKSB8fCAoYyA9PT0gMHgyMC8qIFNwYWNlICovKTtcbn1cblxuZnVuY3Rpb24gaXNfV1NfT1JfRU9MKGMpIHtcbiAgcmV0dXJuIChjID09PSAweDA5LyogVGFiICovKSB8fFxuICAgICAgICAgKGMgPT09IDB4MjAvKiBTcGFjZSAqLykgfHxcbiAgICAgICAgIChjID09PSAweDBBLyogTEYgKi8pIHx8XG4gICAgICAgICAoYyA9PT0gMHgwRC8qIENSICovKTtcbn1cblxuZnVuY3Rpb24gaXNfRkxPV19JTkRJQ0FUT1IoYykge1xuICByZXR1cm4gYyA9PT0gMHgyQy8qICwgKi8gfHxcbiAgICAgICAgIGMgPT09IDB4NUIvKiBbICovIHx8XG4gICAgICAgICBjID09PSAweDVELyogXSAqLyB8fFxuICAgICAgICAgYyA9PT0gMHg3Qi8qIHsgKi8gfHxcbiAgICAgICAgIGMgPT09IDB4N0QvKiB9ICovO1xufVxuXG5mdW5jdGlvbiBmcm9tSGV4Q29kZShjKSB7XG4gIHZhciBsYztcblxuICBpZiAoKDB4MzAvKiAwICovIDw9IGMpICYmIChjIDw9IDB4MzkvKiA5ICovKSkge1xuICAgIHJldHVybiBjIC0gMHgzMDtcbiAgfVxuXG4gIC8qZXNsaW50LWRpc2FibGUgbm8tYml0d2lzZSovXG4gIGxjID0gYyB8IDB4MjA7XG5cbiAgaWYgKCgweDYxLyogYSAqLyA8PSBsYykgJiYgKGxjIDw9IDB4NjYvKiBmICovKSkge1xuICAgIHJldHVybiBsYyAtIDB4NjEgKyAxMDtcbiAgfVxuXG4gIHJldHVybiAtMTtcbn1cblxuZnVuY3Rpb24gZXNjYXBlZEhleExlbihjKSB7XG4gIGlmIChjID09PSAweDc4LyogeCAqLykgeyByZXR1cm4gMjsgfVxuICBpZiAoYyA9PT0gMHg3NS8qIHUgKi8pIHsgcmV0dXJuIDQ7IH1cbiAgaWYgKGMgPT09IDB4NTUvKiBVICovKSB7IHJldHVybiA4OyB9XG4gIHJldHVybiAwO1xufVxuXG5mdW5jdGlvbiBmcm9tRGVjaW1hbENvZGUoYykge1xuICBpZiAoKDB4MzAvKiAwICovIDw9IGMpICYmIChjIDw9IDB4MzkvKiA5ICovKSkge1xuICAgIHJldHVybiBjIC0gMHgzMDtcbiAgfVxuXG4gIHJldHVybiAtMTtcbn1cblxuZnVuY3Rpb24gc2ltcGxlRXNjYXBlU2VxdWVuY2UoYykge1xuICAvKiBlc2xpbnQtZGlzYWJsZSBpbmRlbnQgKi9cbiAgcmV0dXJuIChjID09PSAweDMwLyogMCAqLykgPyAnXFx4MDAnIDpcbiAgICAgICAgKGMgPT09IDB4NjEvKiBhICovKSA/ICdcXHgwNycgOlxuICAgICAgICAoYyA9PT0gMHg2Mi8qIGIgKi8pID8gJ1xceDA4JyA6XG4gICAgICAgIChjID09PSAweDc0LyogdCAqLykgPyAnXFx4MDknIDpcbiAgICAgICAgKGMgPT09IDB4MDkvKiBUYWIgKi8pID8gJ1xceDA5JyA6XG4gICAgICAgIChjID09PSAweDZFLyogbiAqLykgPyAnXFx4MEEnIDpcbiAgICAgICAgKGMgPT09IDB4NzYvKiB2ICovKSA/ICdcXHgwQicgOlxuICAgICAgICAoYyA9PT0gMHg2Ni8qIGYgKi8pID8gJ1xceDBDJyA6XG4gICAgICAgIChjID09PSAweDcyLyogciAqLykgPyAnXFx4MEQnIDpcbiAgICAgICAgKGMgPT09IDB4NjUvKiBlICovKSA/ICdcXHgxQicgOlxuICAgICAgICAoYyA9PT0gMHgyMC8qIFNwYWNlICovKSA/ICcgJyA6XG4gICAgICAgIChjID09PSAweDIyLyogXCIgKi8pID8gJ1xceDIyJyA6XG4gICAgICAgIChjID09PSAweDJGLyogLyAqLykgPyAnLycgOlxuICAgICAgICAoYyA9PT0gMHg1Qy8qIFxcICovKSA/ICdcXHg1QycgOlxuICAgICAgICAoYyA9PT0gMHg0RS8qIE4gKi8pID8gJ1xceDg1JyA6XG4gICAgICAgIChjID09PSAweDVGLyogXyAqLykgPyAnXFx4QTAnIDpcbiAgICAgICAgKGMgPT09IDB4NEMvKiBMICovKSA/ICdcXHUyMDI4JyA6XG4gICAgICAgIChjID09PSAweDUwLyogUCAqLykgPyAnXFx1MjAyOScgOiAnJztcbn1cblxuZnVuY3Rpb24gY2hhckZyb21Db2RlcG9pbnQoYykge1xuICBpZiAoYyA8PSAweEZGRkYpIHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShjKTtcbiAgfVxuICAvLyBFbmNvZGUgVVRGLTE2IHN1cnJvZ2F0ZSBwYWlyXG4gIC8vIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1VURi0xNiNDb2RlX3BvaW50c19VLjJCMDEwMDAwX3RvX1UuMkIxMEZGRkZcbiAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoXG4gICAgKChjIC0gMHgwMTAwMDApID4+IDEwKSArIDB4RDgwMCxcbiAgICAoKGMgLSAweDAxMDAwMCkgJiAweDAzRkYpICsgMHhEQzAwXG4gICk7XG59XG5cbi8vIHNldCBhIHByb3BlcnR5IG9mIGEgbGl0ZXJhbCBvYmplY3QsIHdoaWxlIHByb3RlY3RpbmcgYWdhaW5zdCBwcm90b3R5cGUgcG9sbHV0aW9uLFxuLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlY2EvanMteWFtbC9pc3N1ZXMvMTY0IGZvciBtb3JlIGRldGFpbHNcbmZ1bmN0aW9uIHNldFByb3BlcnR5KG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICAvLyB1c2VkIGZvciB0aGlzIHNwZWNpZmljIGtleSBvbmx5IGJlY2F1c2UgT2JqZWN0LmRlZmluZVByb3BlcnR5IGlzIHNsb3dcbiAgaWYgKGtleSA9PT0gJ19fcHJvdG9fXycpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBrZXksIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIHZhbHVlOiB2YWx1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIH1cbn1cblxudmFyIHNpbXBsZUVzY2FwZUNoZWNrID0gbmV3IEFycmF5KDI1Nik7IC8vIGludGVnZXIsIGZvciBmYXN0IGFjY2Vzc1xudmFyIHNpbXBsZUVzY2FwZU1hcCA9IG5ldyBBcnJheSgyNTYpO1xuZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7IGkrKykge1xuICBzaW1wbGVFc2NhcGVDaGVja1tpXSA9IHNpbXBsZUVzY2FwZVNlcXVlbmNlKGkpID8gMSA6IDA7XG4gIHNpbXBsZUVzY2FwZU1hcFtpXSA9IHNpbXBsZUVzY2FwZVNlcXVlbmNlKGkpO1xufVxuXG5cbmZ1bmN0aW9uIFN0YXRlKGlucHV0LCBvcHRpb25zKSB7XG4gIHRoaXMuaW5wdXQgPSBpbnB1dDtcblxuICB0aGlzLmZpbGVuYW1lICA9IG9wdGlvbnNbJ2ZpbGVuYW1lJ10gIHx8IG51bGw7XG4gIHRoaXMuc2NoZW1hICAgID0gb3B0aW9uc1snc2NoZW1hJ10gICAgfHwgREVGQVVMVF9GVUxMX1NDSEVNQTtcbiAgdGhpcy5vbldhcm5pbmcgPSBvcHRpb25zWydvbldhcm5pbmcnXSB8fCBudWxsO1xuICB0aGlzLmxlZ2FjeSAgICA9IG9wdGlvbnNbJ2xlZ2FjeSddICAgIHx8IGZhbHNlO1xuICB0aGlzLmpzb24gICAgICA9IG9wdGlvbnNbJ2pzb24nXSAgICAgIHx8IGZhbHNlO1xuICB0aGlzLmxpc3RlbmVyICA9IG9wdGlvbnNbJ2xpc3RlbmVyJ10gIHx8IG51bGw7XG5cbiAgdGhpcy5pbXBsaWNpdFR5cGVzID0gdGhpcy5zY2hlbWEuY29tcGlsZWRJbXBsaWNpdDtcbiAgdGhpcy50eXBlTWFwICAgICAgID0gdGhpcy5zY2hlbWEuY29tcGlsZWRUeXBlTWFwO1xuXG4gIHRoaXMubGVuZ3RoICAgICA9IGlucHV0Lmxlbmd0aDtcbiAgdGhpcy5wb3NpdGlvbiAgID0gMDtcbiAgdGhpcy5saW5lICAgICAgID0gMDtcbiAgdGhpcy5saW5lU3RhcnQgID0gMDtcbiAgdGhpcy5saW5lSW5kZW50ID0gMDtcblxuICB0aGlzLmRvY3VtZW50cyA9IFtdO1xuXG4gIC8qXG4gIHRoaXMudmVyc2lvbjtcbiAgdGhpcy5jaGVja0xpbmVCcmVha3M7XG4gIHRoaXMudGFnTWFwO1xuICB0aGlzLmFuY2hvck1hcDtcbiAgdGhpcy50YWc7XG4gIHRoaXMuYW5jaG9yO1xuICB0aGlzLmtpbmQ7XG4gIHRoaXMucmVzdWx0OyovXG5cbn1cblxuXG5mdW5jdGlvbiBnZW5lcmF0ZUVycm9yKHN0YXRlLCBtZXNzYWdlKSB7XG4gIHJldHVybiBuZXcgWUFNTEV4Y2VwdGlvbihcbiAgICBtZXNzYWdlLFxuICAgIG5ldyBNYXJrKHN0YXRlLmZpbGVuYW1lLCBzdGF0ZS5pbnB1dCwgc3RhdGUucG9zaXRpb24sIHN0YXRlLmxpbmUsIChzdGF0ZS5wb3NpdGlvbiAtIHN0YXRlLmxpbmVTdGFydCkpKTtcbn1cblxuZnVuY3Rpb24gdGhyb3dFcnJvcihzdGF0ZSwgbWVzc2FnZSkge1xuICB0aHJvdyBnZW5lcmF0ZUVycm9yKHN0YXRlLCBtZXNzYWdlKTtcbn1cblxuZnVuY3Rpb24gdGhyb3dXYXJuaW5nKHN0YXRlLCBtZXNzYWdlKSB7XG4gIGlmIChzdGF0ZS5vbldhcm5pbmcpIHtcbiAgICBzdGF0ZS5vbldhcm5pbmcuY2FsbChudWxsLCBnZW5lcmF0ZUVycm9yKHN0YXRlLCBtZXNzYWdlKSk7XG4gIH1cbn1cblxuXG52YXIgZGlyZWN0aXZlSGFuZGxlcnMgPSB7XG5cbiAgWUFNTDogZnVuY3Rpb24gaGFuZGxlWWFtbERpcmVjdGl2ZShzdGF0ZSwgbmFtZSwgYXJncykge1xuXG4gICAgdmFyIG1hdGNoLCBtYWpvciwgbWlub3I7XG5cbiAgICBpZiAoc3RhdGUudmVyc2lvbiAhPT0gbnVsbCkge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2R1cGxpY2F0aW9uIG9mICVZQU1MIGRpcmVjdGl2ZScpO1xuICAgIH1cblxuICAgIGlmIChhcmdzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ1lBTUwgZGlyZWN0aXZlIGFjY2VwdHMgZXhhY3RseSBvbmUgYXJndW1lbnQnKTtcbiAgICB9XG5cbiAgICBtYXRjaCA9IC9eKFswLTldKylcXC4oWzAtOV0rKSQvLmV4ZWMoYXJnc1swXSk7XG5cbiAgICBpZiAobWF0Y2ggPT09IG51bGwpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdpbGwtZm9ybWVkIGFyZ3VtZW50IG9mIHRoZSBZQU1MIGRpcmVjdGl2ZScpO1xuICAgIH1cblxuICAgIG1ham9yID0gcGFyc2VJbnQobWF0Y2hbMV0sIDEwKTtcbiAgICBtaW5vciA9IHBhcnNlSW50KG1hdGNoWzJdLCAxMCk7XG5cbiAgICBpZiAobWFqb3IgIT09IDEpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICd1bmFjY2VwdGFibGUgWUFNTCB2ZXJzaW9uIG9mIHRoZSBkb2N1bWVudCcpO1xuICAgIH1cblxuICAgIHN0YXRlLnZlcnNpb24gPSBhcmdzWzBdO1xuICAgIHN0YXRlLmNoZWNrTGluZUJyZWFrcyA9IChtaW5vciA8IDIpO1xuXG4gICAgaWYgKG1pbm9yICE9PSAxICYmIG1pbm9yICE9PSAyKSB7XG4gICAgICB0aHJvd1dhcm5pbmcoc3RhdGUsICd1bnN1cHBvcnRlZCBZQU1MIHZlcnNpb24gb2YgdGhlIGRvY3VtZW50Jyk7XG4gICAgfVxuICB9LFxuXG4gIFRBRzogZnVuY3Rpb24gaGFuZGxlVGFnRGlyZWN0aXZlKHN0YXRlLCBuYW1lLCBhcmdzKSB7XG5cbiAgICB2YXIgaGFuZGxlLCBwcmVmaXg7XG5cbiAgICBpZiAoYXJncy5sZW5ndGggIT09IDIpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdUQUcgZGlyZWN0aXZlIGFjY2VwdHMgZXhhY3RseSB0d28gYXJndW1lbnRzJyk7XG4gICAgfVxuXG4gICAgaGFuZGxlID0gYXJnc1swXTtcbiAgICBwcmVmaXggPSBhcmdzWzFdO1xuXG4gICAgaWYgKCFQQVRURVJOX1RBR19IQU5ETEUudGVzdChoYW5kbGUpKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnaWxsLWZvcm1lZCB0YWcgaGFuZGxlIChmaXJzdCBhcmd1bWVudCkgb2YgdGhlIFRBRyBkaXJlY3RpdmUnKTtcbiAgICB9XG5cbiAgICBpZiAoX2hhc093blByb3BlcnR5LmNhbGwoc3RhdGUudGFnTWFwLCBoYW5kbGUpKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAndGhlcmUgaXMgYSBwcmV2aW91c2x5IGRlY2xhcmVkIHN1ZmZpeCBmb3IgXCInICsgaGFuZGxlICsgJ1wiIHRhZyBoYW5kbGUnKTtcbiAgICB9XG5cbiAgICBpZiAoIVBBVFRFUk5fVEFHX1VSSS50ZXN0KHByZWZpeCkpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdpbGwtZm9ybWVkIHRhZyBwcmVmaXggKHNlY29uZCBhcmd1bWVudCkgb2YgdGhlIFRBRyBkaXJlY3RpdmUnKTtcbiAgICB9XG5cbiAgICBzdGF0ZS50YWdNYXBbaGFuZGxlXSA9IHByZWZpeDtcbiAgfVxufTtcblxuXG5mdW5jdGlvbiBjYXB0dXJlU2VnbWVudChzdGF0ZSwgc3RhcnQsIGVuZCwgY2hlY2tKc29uKSB7XG4gIHZhciBfcG9zaXRpb24sIF9sZW5ndGgsIF9jaGFyYWN0ZXIsIF9yZXN1bHQ7XG5cbiAgaWYgKHN0YXJ0IDwgZW5kKSB7XG4gICAgX3Jlc3VsdCA9IHN0YXRlLmlucHV0LnNsaWNlKHN0YXJ0LCBlbmQpO1xuXG4gICAgaWYgKGNoZWNrSnNvbikge1xuICAgICAgZm9yIChfcG9zaXRpb24gPSAwLCBfbGVuZ3RoID0gX3Jlc3VsdC5sZW5ndGg7IF9wb3NpdGlvbiA8IF9sZW5ndGg7IF9wb3NpdGlvbiArPSAxKSB7XG4gICAgICAgIF9jaGFyYWN0ZXIgPSBfcmVzdWx0LmNoYXJDb2RlQXQoX3Bvc2l0aW9uKTtcbiAgICAgICAgaWYgKCEoX2NoYXJhY3RlciA9PT0gMHgwOSB8fFxuICAgICAgICAgICAgICAoMHgyMCA8PSBfY2hhcmFjdGVyICYmIF9jaGFyYWN0ZXIgPD0gMHgxMEZGRkYpKSkge1xuICAgICAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdleHBlY3RlZCB2YWxpZCBKU09OIGNoYXJhY3RlcicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChQQVRURVJOX05PTl9QUklOVEFCTEUudGVzdChfcmVzdWx0KSkge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3RoZSBzdHJlYW0gY29udGFpbnMgbm9uLXByaW50YWJsZSBjaGFyYWN0ZXJzJyk7XG4gICAgfVxuXG4gICAgc3RhdGUucmVzdWx0ICs9IF9yZXN1bHQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWVyZ2VNYXBwaW5ncyhzdGF0ZSwgZGVzdGluYXRpb24sIHNvdXJjZSwgb3ZlcnJpZGFibGVLZXlzKSB7XG4gIHZhciBzb3VyY2VLZXlzLCBrZXksIGluZGV4LCBxdWFudGl0eTtcblxuICBpZiAoIWNvbW1vbi5pc09iamVjdChzb3VyY2UpKSB7XG4gICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2Nhbm5vdCBtZXJnZSBtYXBwaW5nczsgdGhlIHByb3ZpZGVkIHNvdXJjZSBvYmplY3QgaXMgdW5hY2NlcHRhYmxlJyk7XG4gIH1cblxuICBzb3VyY2VLZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcblxuICBmb3IgKGluZGV4ID0gMCwgcXVhbnRpdHkgPSBzb3VyY2VLZXlzLmxlbmd0aDsgaW5kZXggPCBxdWFudGl0eTsgaW5kZXggKz0gMSkge1xuICAgIGtleSA9IHNvdXJjZUtleXNbaW5kZXhdO1xuXG4gICAgaWYgKCFfaGFzT3duUHJvcGVydHkuY2FsbChkZXN0aW5hdGlvbiwga2V5KSkge1xuICAgICAgc2V0UHJvcGVydHkoZGVzdGluYXRpb24sIGtleSwgc291cmNlW2tleV0pO1xuICAgICAgb3ZlcnJpZGFibGVLZXlzW2tleV0gPSB0cnVlO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBzdG9yZU1hcHBpbmdQYWlyKHN0YXRlLCBfcmVzdWx0LCBvdmVycmlkYWJsZUtleXMsIGtleVRhZywga2V5Tm9kZSwgdmFsdWVOb2RlLCBzdGFydExpbmUsIHN0YXJ0UG9zKSB7XG4gIHZhciBpbmRleCwgcXVhbnRpdHk7XG5cbiAgLy8gVGhlIG91dHB1dCBpcyBhIHBsYWluIG9iamVjdCBoZXJlLCBzbyBrZXlzIGNhbiBvbmx5IGJlIHN0cmluZ3MuXG4gIC8vIFdlIG5lZWQgdG8gY29udmVydCBrZXlOb2RlIHRvIGEgc3RyaW5nLCBidXQgZG9pbmcgc28gY2FuIGhhbmcgdGhlIHByb2Nlc3NcbiAgLy8gKGRlZXBseSBuZXN0ZWQgYXJyYXlzIHRoYXQgZXhwbG9kZSBleHBvbmVudGlhbGx5IHVzaW5nIGFsaWFzZXMpLlxuICBpZiAoQXJyYXkuaXNBcnJheShrZXlOb2RlKSkge1xuICAgIGtleU5vZGUgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChrZXlOb2RlKTtcblxuICAgIGZvciAoaW5kZXggPSAwLCBxdWFudGl0eSA9IGtleU5vZGUubGVuZ3RoOyBpbmRleCA8IHF1YW50aXR5OyBpbmRleCArPSAxKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShrZXlOb2RlW2luZGV4XSkpIHtcbiAgICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ25lc3RlZCBhcnJheXMgYXJlIG5vdCBzdXBwb3J0ZWQgaW5zaWRlIGtleXMnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBrZXlOb2RlID09PSAnb2JqZWN0JyAmJiBfY2xhc3Moa2V5Tm9kZVtpbmRleF0pID09PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgICAgICBrZXlOb2RlW2luZGV4XSA9ICdbb2JqZWN0IE9iamVjdF0nO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIEF2b2lkIGNvZGUgZXhlY3V0aW9uIGluIGxvYWQoKSB2aWEgdG9TdHJpbmcgcHJvcGVydHlcbiAgLy8gKHN0aWxsIHVzZSBpdHMgb3duIHRvU3RyaW5nIGZvciBhcnJheXMsIHRpbWVzdGFtcHMsXG4gIC8vIGFuZCB3aGF0ZXZlciB1c2VyIHNjaGVtYSBleHRlbnNpb25zIGhhcHBlbiB0byBoYXZlIEBAdG9TdHJpbmdUYWcpXG4gIGlmICh0eXBlb2Yga2V5Tm9kZSA9PT0gJ29iamVjdCcgJiYgX2NsYXNzKGtleU5vZGUpID09PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgIGtleU5vZGUgPSAnW29iamVjdCBPYmplY3RdJztcbiAgfVxuXG5cbiAga2V5Tm9kZSA9IFN0cmluZyhrZXlOb2RlKTtcblxuICBpZiAoX3Jlc3VsdCA9PT0gbnVsbCkge1xuICAgIF9yZXN1bHQgPSB7fTtcbiAgfVxuXG4gIGlmIChrZXlUYWcgPT09ICd0YWc6eWFtbC5vcmcsMjAwMjptZXJnZScpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZU5vZGUpKSB7XG4gICAgICBmb3IgKGluZGV4ID0gMCwgcXVhbnRpdHkgPSB2YWx1ZU5vZGUubGVuZ3RoOyBpbmRleCA8IHF1YW50aXR5OyBpbmRleCArPSAxKSB7XG4gICAgICAgIG1lcmdlTWFwcGluZ3Moc3RhdGUsIF9yZXN1bHQsIHZhbHVlTm9kZVtpbmRleF0sIG92ZXJyaWRhYmxlS2V5cyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG1lcmdlTWFwcGluZ3Moc3RhdGUsIF9yZXN1bHQsIHZhbHVlTm9kZSwgb3ZlcnJpZGFibGVLZXlzKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKCFzdGF0ZS5qc29uICYmXG4gICAgICAgICFfaGFzT3duUHJvcGVydHkuY2FsbChvdmVycmlkYWJsZUtleXMsIGtleU5vZGUpICYmXG4gICAgICAgIF9oYXNPd25Qcm9wZXJ0eS5jYWxsKF9yZXN1bHQsIGtleU5vZGUpKSB7XG4gICAgICBzdGF0ZS5saW5lID0gc3RhcnRMaW5lIHx8IHN0YXRlLmxpbmU7XG4gICAgICBzdGF0ZS5wb3NpdGlvbiA9IHN0YXJ0UG9zIHx8IHN0YXRlLnBvc2l0aW9uO1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2R1cGxpY2F0ZWQgbWFwcGluZyBrZXknKTtcbiAgICB9XG4gICAgc2V0UHJvcGVydHkoX3Jlc3VsdCwga2V5Tm9kZSwgdmFsdWVOb2RlKTtcbiAgICBkZWxldGUgb3ZlcnJpZGFibGVLZXlzW2tleU5vZGVdO1xuICB9XG5cbiAgcmV0dXJuIF9yZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIHJlYWRMaW5lQnJlYWsoc3RhdGUpIHtcbiAgdmFyIGNoO1xuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG5cbiAgaWYgKGNoID09PSAweDBBLyogTEYgKi8pIHtcbiAgICBzdGF0ZS5wb3NpdGlvbisrO1xuICB9IGVsc2UgaWYgKGNoID09PSAweDBELyogQ1IgKi8pIHtcbiAgICBzdGF0ZS5wb3NpdGlvbisrO1xuICAgIGlmIChzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKSA9PT0gMHgwQS8qIExGICovKSB7XG4gICAgICBzdGF0ZS5wb3NpdGlvbisrO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvd0Vycm9yKHN0YXRlLCAnYSBsaW5lIGJyZWFrIGlzIGV4cGVjdGVkJyk7XG4gIH1cblxuICBzdGF0ZS5saW5lICs9IDE7XG4gIHN0YXRlLmxpbmVTdGFydCA9IHN0YXRlLnBvc2l0aW9uO1xufVxuXG5mdW5jdGlvbiBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCBhbGxvd0NvbW1lbnRzLCBjaGVja0luZGVudCkge1xuICB2YXIgbGluZUJyZWFrcyA9IDAsXG4gICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gIHdoaWxlIChjaCAhPT0gMCkge1xuICAgIHdoaWxlIChpc19XSElURV9TUEFDRShjaCkpIHtcbiAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICBpZiAoYWxsb3dDb21tZW50cyAmJiBjaCA9PT0gMHgyMy8qICMgKi8pIHtcbiAgICAgIGRvIHtcbiAgICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgICAgfSB3aGlsZSAoY2ggIT09IDB4MEEvKiBMRiAqLyAmJiBjaCAhPT0gMHgwRC8qIENSICovICYmIGNoICE9PSAwKTtcbiAgICB9XG5cbiAgICBpZiAoaXNfRU9MKGNoKSkge1xuICAgICAgcmVhZExpbmVCcmVhayhzdGF0ZSk7XG5cbiAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG4gICAgICBsaW5lQnJlYWtzKys7XG4gICAgICBzdGF0ZS5saW5lSW5kZW50ID0gMDtcblxuICAgICAgd2hpbGUgKGNoID09PSAweDIwLyogU3BhY2UgKi8pIHtcbiAgICAgICAgc3RhdGUubGluZUluZGVudCsrO1xuICAgICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGlmIChjaGVja0luZGVudCAhPT0gLTEgJiYgbGluZUJyZWFrcyAhPT0gMCAmJiBzdGF0ZS5saW5lSW5kZW50IDwgY2hlY2tJbmRlbnQpIHtcbiAgICB0aHJvd1dhcm5pbmcoc3RhdGUsICdkZWZpY2llbnQgaW5kZW50YXRpb24nKTtcbiAgfVxuXG4gIHJldHVybiBsaW5lQnJlYWtzO1xufVxuXG5mdW5jdGlvbiB0ZXN0RG9jdW1lbnRTZXBhcmF0b3Ioc3RhdGUpIHtcbiAgdmFyIF9wb3NpdGlvbiA9IHN0YXRlLnBvc2l0aW9uLFxuICAgICAgY2g7XG5cbiAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KF9wb3NpdGlvbik7XG5cbiAgLy8gQ29uZGl0aW9uIHN0YXRlLnBvc2l0aW9uID09PSBzdGF0ZS5saW5lU3RhcnQgaXMgdGVzdGVkXG4gIC8vIGluIHBhcmVudCBvbiBlYWNoIGNhbGwsIGZvciBlZmZpY2llbmN5LiBObyBuZWVkcyB0byB0ZXN0IGhlcmUgYWdhaW4uXG4gIGlmICgoY2ggPT09IDB4MkQvKiAtICovIHx8IGNoID09PSAweDJFLyogLiAqLykgJiZcbiAgICAgIGNoID09PSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KF9wb3NpdGlvbiArIDEpICYmXG4gICAgICBjaCA9PT0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChfcG9zaXRpb24gKyAyKSkge1xuXG4gICAgX3Bvc2l0aW9uICs9IDM7XG5cbiAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoX3Bvc2l0aW9uKTtcblxuICAgIGlmIChjaCA9PT0gMCB8fCBpc19XU19PUl9FT0woY2gpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHdyaXRlRm9sZGVkTGluZXMoc3RhdGUsIGNvdW50KSB7XG4gIGlmIChjb3VudCA9PT0gMSkge1xuICAgIHN0YXRlLnJlc3VsdCArPSAnICc7XG4gIH0gZWxzZSBpZiAoY291bnQgPiAxKSB7XG4gICAgc3RhdGUucmVzdWx0ICs9IGNvbW1vbi5yZXBlYXQoJ1xcbicsIGNvdW50IC0gMSk7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiByZWFkUGxhaW5TY2FsYXIoc3RhdGUsIG5vZGVJbmRlbnQsIHdpdGhpbkZsb3dDb2xsZWN0aW9uKSB7XG4gIHZhciBwcmVjZWRpbmcsXG4gICAgICBmb2xsb3dpbmcsXG4gICAgICBjYXB0dXJlU3RhcnQsXG4gICAgICBjYXB0dXJlRW5kLFxuICAgICAgaGFzUGVuZGluZ0NvbnRlbnQsXG4gICAgICBfbGluZSxcbiAgICAgIF9saW5lU3RhcnQsXG4gICAgICBfbGluZUluZGVudCxcbiAgICAgIF9raW5kID0gc3RhdGUua2luZCxcbiAgICAgIF9yZXN1bHQgPSBzdGF0ZS5yZXN1bHQsXG4gICAgICBjaDtcblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gIGlmIChpc19XU19PUl9FT0woY2gpICAgICAgfHxcbiAgICAgIGlzX0ZMT1dfSU5ESUNBVE9SKGNoKSB8fFxuICAgICAgY2ggPT09IDB4MjMvKiAjICovICAgIHx8XG4gICAgICBjaCA9PT0gMHgyNi8qICYgKi8gICAgfHxcbiAgICAgIGNoID09PSAweDJBLyogKiAqLyAgICB8fFxuICAgICAgY2ggPT09IDB4MjEvKiAhICovICAgIHx8XG4gICAgICBjaCA9PT0gMHg3Qy8qIHwgKi8gICAgfHxcbiAgICAgIGNoID09PSAweDNFLyogPiAqLyAgICB8fFxuICAgICAgY2ggPT09IDB4MjcvKiAnICovICAgIHx8XG4gICAgICBjaCA9PT0gMHgyMi8qIFwiICovICAgIHx8XG4gICAgICBjaCA9PT0gMHgyNS8qICUgKi8gICAgfHxcbiAgICAgIGNoID09PSAweDQwLyogQCAqLyAgICB8fFxuICAgICAgY2ggPT09IDB4NjAvKiBgICovKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKGNoID09PSAweDNGLyogPyAqLyB8fCBjaCA9PT0gMHgyRC8qIC0gKi8pIHtcbiAgICBmb2xsb3dpbmcgPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uICsgMSk7XG5cbiAgICBpZiAoaXNfV1NfT1JfRU9MKGZvbGxvd2luZykgfHxcbiAgICAgICAgd2l0aGluRmxvd0NvbGxlY3Rpb24gJiYgaXNfRkxPV19JTkRJQ0FUT1IoZm9sbG93aW5nKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRlLmtpbmQgPSAnc2NhbGFyJztcbiAgc3RhdGUucmVzdWx0ID0gJyc7XG4gIGNhcHR1cmVTdGFydCA9IGNhcHR1cmVFbmQgPSBzdGF0ZS5wb3NpdGlvbjtcbiAgaGFzUGVuZGluZ0NvbnRlbnQgPSBmYWxzZTtcblxuICB3aGlsZSAoY2ggIT09IDApIHtcbiAgICBpZiAoY2ggPT09IDB4M0EvKiA6ICovKSB7XG4gICAgICBmb2xsb3dpbmcgPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uICsgMSk7XG5cbiAgICAgIGlmIChpc19XU19PUl9FT0woZm9sbG93aW5nKSB8fFxuICAgICAgICAgIHdpdGhpbkZsb3dDb2xsZWN0aW9uICYmIGlzX0ZMT1dfSU5ESUNBVE9SKGZvbGxvd2luZykpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICB9IGVsc2UgaWYgKGNoID09PSAweDIzLyogIyAqLykge1xuICAgICAgcHJlY2VkaW5nID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbiAtIDEpO1xuXG4gICAgICBpZiAoaXNfV1NfT1JfRU9MKHByZWNlZGluZykpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICB9IGVsc2UgaWYgKChzdGF0ZS5wb3NpdGlvbiA9PT0gc3RhdGUubGluZVN0YXJ0ICYmIHRlc3REb2N1bWVudFNlcGFyYXRvcihzdGF0ZSkpIHx8XG4gICAgICAgICAgICAgICB3aXRoaW5GbG93Q29sbGVjdGlvbiAmJiBpc19GTE9XX0lORElDQVRPUihjaCkpIHtcbiAgICAgIGJyZWFrO1xuXG4gICAgfSBlbHNlIGlmIChpc19FT0woY2gpKSB7XG4gICAgICBfbGluZSA9IHN0YXRlLmxpbmU7XG4gICAgICBfbGluZVN0YXJ0ID0gc3RhdGUubGluZVN0YXJ0O1xuICAgICAgX2xpbmVJbmRlbnQgPSBzdGF0ZS5saW5lSW5kZW50O1xuICAgICAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgZmFsc2UsIC0xKTtcblxuICAgICAgaWYgKHN0YXRlLmxpbmVJbmRlbnQgPj0gbm9kZUluZGVudCkge1xuICAgICAgICBoYXNQZW5kaW5nQ29udGVudCA9IHRydWU7XG4gICAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhdGUucG9zaXRpb24gPSBjYXB0dXJlRW5kO1xuICAgICAgICBzdGF0ZS5saW5lID0gX2xpbmU7XG4gICAgICAgIHN0YXRlLmxpbmVTdGFydCA9IF9saW5lU3RhcnQ7XG4gICAgICAgIHN0YXRlLmxpbmVJbmRlbnQgPSBfbGluZUluZGVudDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGhhc1BlbmRpbmdDb250ZW50KSB7XG4gICAgICBjYXB0dXJlU2VnbWVudChzdGF0ZSwgY2FwdHVyZVN0YXJ0LCBjYXB0dXJlRW5kLCBmYWxzZSk7XG4gICAgICB3cml0ZUZvbGRlZExpbmVzKHN0YXRlLCBzdGF0ZS5saW5lIC0gX2xpbmUpO1xuICAgICAgY2FwdHVyZVN0YXJ0ID0gY2FwdHVyZUVuZCA9IHN0YXRlLnBvc2l0aW9uO1xuICAgICAgaGFzUGVuZGluZ0NvbnRlbnQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoIWlzX1dISVRFX1NQQUNFKGNoKSkge1xuICAgICAgY2FwdHVyZUVuZCA9IHN0YXRlLnBvc2l0aW9uICsgMTtcbiAgICB9XG5cbiAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gIH1cblxuICBjYXB0dXJlU2VnbWVudChzdGF0ZSwgY2FwdHVyZVN0YXJ0LCBjYXB0dXJlRW5kLCBmYWxzZSk7XG5cbiAgaWYgKHN0YXRlLnJlc3VsdCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgc3RhdGUua2luZCA9IF9raW5kO1xuICBzdGF0ZS5yZXN1bHQgPSBfcmVzdWx0O1xuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHJlYWRTaW5nbGVRdW90ZWRTY2FsYXIoc3RhdGUsIG5vZGVJbmRlbnQpIHtcbiAgdmFyIGNoLFxuICAgICAgY2FwdHVyZVN0YXJ0LCBjYXB0dXJlRW5kO1xuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG5cbiAgaWYgKGNoICE9PSAweDI3LyogJyAqLykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0YXRlLmtpbmQgPSAnc2NhbGFyJztcbiAgc3RhdGUucmVzdWx0ID0gJyc7XG4gIHN0YXRlLnBvc2l0aW9uKys7XG4gIGNhcHR1cmVTdGFydCA9IGNhcHR1cmVFbmQgPSBzdGF0ZS5wb3NpdGlvbjtcblxuICB3aGlsZSAoKGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbikpICE9PSAwKSB7XG4gICAgaWYgKGNoID09PSAweDI3LyogJyAqLykge1xuICAgICAgY2FwdHVyZVNlZ21lbnQoc3RhdGUsIGNhcHR1cmVTdGFydCwgc3RhdGUucG9zaXRpb24sIHRydWUpO1xuICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuXG4gICAgICBpZiAoY2ggPT09IDB4MjcvKiAnICovKSB7XG4gICAgICAgIGNhcHR1cmVTdGFydCA9IHN0YXRlLnBvc2l0aW9uO1xuICAgICAgICBzdGF0ZS5wb3NpdGlvbisrO1xuICAgICAgICBjYXB0dXJlRW5kID0gc3RhdGUucG9zaXRpb247XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSBpZiAoaXNfRU9MKGNoKSkge1xuICAgICAgY2FwdHVyZVNlZ21lbnQoc3RhdGUsIGNhcHR1cmVTdGFydCwgY2FwdHVyZUVuZCwgdHJ1ZSk7XG4gICAgICB3cml0ZUZvbGRlZExpbmVzKHN0YXRlLCBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCBmYWxzZSwgbm9kZUluZGVudCkpO1xuICAgICAgY2FwdHVyZVN0YXJ0ID0gY2FwdHVyZUVuZCA9IHN0YXRlLnBvc2l0aW9uO1xuXG4gICAgfSBlbHNlIGlmIChzdGF0ZS5wb3NpdGlvbiA9PT0gc3RhdGUubGluZVN0YXJ0ICYmIHRlc3REb2N1bWVudFNlcGFyYXRvcihzdGF0ZSkpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICd1bmV4cGVjdGVkIGVuZCBvZiB0aGUgZG9jdW1lbnQgd2l0aGluIGEgc2luZ2xlIHF1b3RlZCBzY2FsYXInKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ZS5wb3NpdGlvbisrO1xuICAgICAgY2FwdHVyZUVuZCA9IHN0YXRlLnBvc2l0aW9uO1xuICAgIH1cbiAgfVxuXG4gIHRocm93RXJyb3Ioc3RhdGUsICd1bmV4cGVjdGVkIGVuZCBvZiB0aGUgc3RyZWFtIHdpdGhpbiBhIHNpbmdsZSBxdW90ZWQgc2NhbGFyJyk7XG59XG5cbmZ1bmN0aW9uIHJlYWREb3VibGVRdW90ZWRTY2FsYXIoc3RhdGUsIG5vZGVJbmRlbnQpIHtcbiAgdmFyIGNhcHR1cmVTdGFydCxcbiAgICAgIGNhcHR1cmVFbmQsXG4gICAgICBoZXhMZW5ndGgsXG4gICAgICBoZXhSZXN1bHQsXG4gICAgICB0bXAsXG4gICAgICBjaDtcblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gIGlmIChjaCAhPT0gMHgyMi8qIFwiICovKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3RhdGUua2luZCA9ICdzY2FsYXInO1xuICBzdGF0ZS5yZXN1bHQgPSAnJztcbiAgc3RhdGUucG9zaXRpb24rKztcbiAgY2FwdHVyZVN0YXJ0ID0gY2FwdHVyZUVuZCA9IHN0YXRlLnBvc2l0aW9uO1xuXG4gIHdoaWxlICgoY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKSkgIT09IDApIHtcbiAgICBpZiAoY2ggPT09IDB4MjIvKiBcIiAqLykge1xuICAgICAgY2FwdHVyZVNlZ21lbnQoc3RhdGUsIGNhcHR1cmVTdGFydCwgc3RhdGUucG9zaXRpb24sIHRydWUpO1xuICAgICAgc3RhdGUucG9zaXRpb24rKztcbiAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgfSBlbHNlIGlmIChjaCA9PT0gMHg1Qy8qIFxcICovKSB7XG4gICAgICBjYXB0dXJlU2VnbWVudChzdGF0ZSwgY2FwdHVyZVN0YXJ0LCBzdGF0ZS5wb3NpdGlvbiwgdHJ1ZSk7XG4gICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG5cbiAgICAgIGlmIChpc19FT0woY2gpKSB7XG4gICAgICAgIHNraXBTZXBhcmF0aW9uU3BhY2Uoc3RhdGUsIGZhbHNlLCBub2RlSW5kZW50KTtcblxuICAgICAgICAvLyBUT0RPOiByZXdvcmsgdG8gaW5saW5lIGZuIHdpdGggbm8gdHlwZSBjYXN0P1xuICAgICAgfSBlbHNlIGlmIChjaCA8IDI1NiAmJiBzaW1wbGVFc2NhcGVDaGVja1tjaF0pIHtcbiAgICAgICAgc3RhdGUucmVzdWx0ICs9IHNpbXBsZUVzY2FwZU1hcFtjaF07XG4gICAgICAgIHN0YXRlLnBvc2l0aW9uKys7XG5cbiAgICAgIH0gZWxzZSBpZiAoKHRtcCA9IGVzY2FwZWRIZXhMZW4oY2gpKSA+IDApIHtcbiAgICAgICAgaGV4TGVuZ3RoID0gdG1wO1xuICAgICAgICBoZXhSZXN1bHQgPSAwO1xuXG4gICAgICAgIGZvciAoOyBoZXhMZW5ndGggPiAwOyBoZXhMZW5ndGgtLSkge1xuICAgICAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcblxuICAgICAgICAgIGlmICgodG1wID0gZnJvbUhleENvZGUoY2gpKSA+PSAwKSB7XG4gICAgICAgICAgICBoZXhSZXN1bHQgPSAoaGV4UmVzdWx0IDw8IDQpICsgdG1wO1xuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdleHBlY3RlZCBoZXhhZGVjaW1hbCBjaGFyYWN0ZXInKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZS5yZXN1bHQgKz0gY2hhckZyb21Db2RlcG9pbnQoaGV4UmVzdWx0KTtcblxuICAgICAgICBzdGF0ZS5wb3NpdGlvbisrO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAndW5rbm93biBlc2NhcGUgc2VxdWVuY2UnKTtcbiAgICAgIH1cblxuICAgICAgY2FwdHVyZVN0YXJ0ID0gY2FwdHVyZUVuZCA9IHN0YXRlLnBvc2l0aW9uO1xuXG4gICAgfSBlbHNlIGlmIChpc19FT0woY2gpKSB7XG4gICAgICBjYXB0dXJlU2VnbWVudChzdGF0ZSwgY2FwdHVyZVN0YXJ0LCBjYXB0dXJlRW5kLCB0cnVlKTtcbiAgICAgIHdyaXRlRm9sZGVkTGluZXMoc3RhdGUsIHNraXBTZXBhcmF0aW9uU3BhY2Uoc3RhdGUsIGZhbHNlLCBub2RlSW5kZW50KSk7XG4gICAgICBjYXB0dXJlU3RhcnQgPSBjYXB0dXJlRW5kID0gc3RhdGUucG9zaXRpb247XG5cbiAgICB9IGVsc2UgaWYgKHN0YXRlLnBvc2l0aW9uID09PSBzdGF0ZS5saW5lU3RhcnQgJiYgdGVzdERvY3VtZW50U2VwYXJhdG9yKHN0YXRlKSkge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3VuZXhwZWN0ZWQgZW5kIG9mIHRoZSBkb2N1bWVudCB3aXRoaW4gYSBkb3VibGUgcXVvdGVkIHNjYWxhcicpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXRlLnBvc2l0aW9uKys7XG4gICAgICBjYXB0dXJlRW5kID0gc3RhdGUucG9zaXRpb247XG4gICAgfVxuICB9XG5cbiAgdGhyb3dFcnJvcihzdGF0ZSwgJ3VuZXhwZWN0ZWQgZW5kIG9mIHRoZSBzdHJlYW0gd2l0aGluIGEgZG91YmxlIHF1b3RlZCBzY2FsYXInKTtcbn1cblxuZnVuY3Rpb24gcmVhZEZsb3dDb2xsZWN0aW9uKHN0YXRlLCBub2RlSW5kZW50KSB7XG4gIHZhciByZWFkTmV4dCA9IHRydWUsXG4gICAgICBfbGluZSxcbiAgICAgIF90YWcgICAgID0gc3RhdGUudGFnLFxuICAgICAgX3Jlc3VsdCxcbiAgICAgIF9hbmNob3IgID0gc3RhdGUuYW5jaG9yLFxuICAgICAgZm9sbG93aW5nLFxuICAgICAgdGVybWluYXRvcixcbiAgICAgIGlzUGFpcixcbiAgICAgIGlzRXhwbGljaXRQYWlyLFxuICAgICAgaXNNYXBwaW5nLFxuICAgICAgb3ZlcnJpZGFibGVLZXlzID0ge30sXG4gICAgICBrZXlOb2RlLFxuICAgICAga2V5VGFnLFxuICAgICAgdmFsdWVOb2RlLFxuICAgICAgY2g7XG5cbiAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICBpZiAoY2ggPT09IDB4NUIvKiBbICovKSB7XG4gICAgdGVybWluYXRvciA9IDB4NUQ7LyogXSAqL1xuICAgIGlzTWFwcGluZyA9IGZhbHNlO1xuICAgIF9yZXN1bHQgPSBbXTtcbiAgfSBlbHNlIGlmIChjaCA9PT0gMHg3Qi8qIHsgKi8pIHtcbiAgICB0ZXJtaW5hdG9yID0gMHg3RDsvKiB9ICovXG4gICAgaXNNYXBwaW5nID0gdHJ1ZTtcbiAgICBfcmVzdWx0ID0ge307XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKHN0YXRlLmFuY2hvciAhPT0gbnVsbCkge1xuICAgIHN0YXRlLmFuY2hvck1hcFtzdGF0ZS5hbmNob3JdID0gX3Jlc3VsdDtcbiAgfVxuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcblxuICB3aGlsZSAoY2ggIT09IDApIHtcbiAgICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCBub2RlSW5kZW50KTtcblxuICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG5cbiAgICBpZiAoY2ggPT09IHRlcm1pbmF0b3IpIHtcbiAgICAgIHN0YXRlLnBvc2l0aW9uKys7XG4gICAgICBzdGF0ZS50YWcgPSBfdGFnO1xuICAgICAgc3RhdGUuYW5jaG9yID0gX2FuY2hvcjtcbiAgICAgIHN0YXRlLmtpbmQgPSBpc01hcHBpbmcgPyAnbWFwcGluZycgOiAnc2VxdWVuY2UnO1xuICAgICAgc3RhdGUucmVzdWx0ID0gX3Jlc3VsdDtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSBpZiAoIXJlYWROZXh0KSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnbWlzc2VkIGNvbW1hIGJldHdlZW4gZmxvdyBjb2xsZWN0aW9uIGVudHJpZXMnKTtcbiAgICB9XG5cbiAgICBrZXlUYWcgPSBrZXlOb2RlID0gdmFsdWVOb2RlID0gbnVsbDtcbiAgICBpc1BhaXIgPSBpc0V4cGxpY2l0UGFpciA9IGZhbHNlO1xuXG4gICAgaWYgKGNoID09PSAweDNGLyogPyAqLykge1xuICAgICAgZm9sbG93aW5nID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbiArIDEpO1xuXG4gICAgICBpZiAoaXNfV1NfT1JfRU9MKGZvbGxvd2luZykpIHtcbiAgICAgICAgaXNQYWlyID0gaXNFeHBsaWNpdFBhaXIgPSB0cnVlO1xuICAgICAgICBzdGF0ZS5wb3NpdGlvbisrO1xuICAgICAgICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCBub2RlSW5kZW50KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBfbGluZSA9IHN0YXRlLmxpbmU7XG4gICAgY29tcG9zZU5vZGUoc3RhdGUsIG5vZGVJbmRlbnQsIENPTlRFWFRfRkxPV19JTiwgZmFsc2UsIHRydWUpO1xuICAgIGtleVRhZyA9IHN0YXRlLnRhZztcbiAgICBrZXlOb2RlID0gc3RhdGUucmVzdWx0O1xuICAgIHNraXBTZXBhcmF0aW9uU3BhY2Uoc3RhdGUsIHRydWUsIG5vZGVJbmRlbnQpO1xuXG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICAgIGlmICgoaXNFeHBsaWNpdFBhaXIgfHwgc3RhdGUubGluZSA9PT0gX2xpbmUpICYmIGNoID09PSAweDNBLyogOiAqLykge1xuICAgICAgaXNQYWlyID0gdHJ1ZTtcbiAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgICAgIHNraXBTZXBhcmF0aW9uU3BhY2Uoc3RhdGUsIHRydWUsIG5vZGVJbmRlbnQpO1xuICAgICAgY29tcG9zZU5vZGUoc3RhdGUsIG5vZGVJbmRlbnQsIENPTlRFWFRfRkxPV19JTiwgZmFsc2UsIHRydWUpO1xuICAgICAgdmFsdWVOb2RlID0gc3RhdGUucmVzdWx0O1xuICAgIH1cblxuICAgIGlmIChpc01hcHBpbmcpIHtcbiAgICAgIHN0b3JlTWFwcGluZ1BhaXIoc3RhdGUsIF9yZXN1bHQsIG92ZXJyaWRhYmxlS2V5cywga2V5VGFnLCBrZXlOb2RlLCB2YWx1ZU5vZGUpO1xuICAgIH0gZWxzZSBpZiAoaXNQYWlyKSB7XG4gICAgICBfcmVzdWx0LnB1c2goc3RvcmVNYXBwaW5nUGFpcihzdGF0ZSwgbnVsbCwgb3ZlcnJpZGFibGVLZXlzLCBrZXlUYWcsIGtleU5vZGUsIHZhbHVlTm9kZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBfcmVzdWx0LnB1c2goa2V5Tm9kZSk7XG4gICAgfVxuXG4gICAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgbm9kZUluZGVudCk7XG5cbiAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gICAgaWYgKGNoID09PSAweDJDLyogLCAqLykge1xuICAgICAgcmVhZE5leHQgPSB0cnVlO1xuICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZWFkTmV4dCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHRocm93RXJyb3Ioc3RhdGUsICd1bmV4cGVjdGVkIGVuZCBvZiB0aGUgc3RyZWFtIHdpdGhpbiBhIGZsb3cgY29sbGVjdGlvbicpO1xufVxuXG5mdW5jdGlvbiByZWFkQmxvY2tTY2FsYXIoc3RhdGUsIG5vZGVJbmRlbnQpIHtcbiAgdmFyIGNhcHR1cmVTdGFydCxcbiAgICAgIGZvbGRpbmcsXG4gICAgICBjaG9tcGluZyAgICAgICA9IENIT01QSU5HX0NMSVAsXG4gICAgICBkaWRSZWFkQ29udGVudCA9IGZhbHNlLFxuICAgICAgZGV0ZWN0ZWRJbmRlbnQgPSBmYWxzZSxcbiAgICAgIHRleHRJbmRlbnQgICAgID0gbm9kZUluZGVudCxcbiAgICAgIGVtcHR5TGluZXMgICAgID0gMCxcbiAgICAgIGF0TW9yZUluZGVudGVkID0gZmFsc2UsXG4gICAgICB0bXAsXG4gICAgICBjaDtcblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gIGlmIChjaCA9PT0gMHg3Qy8qIHwgKi8pIHtcbiAgICBmb2xkaW5nID0gZmFsc2U7XG4gIH0gZWxzZSBpZiAoY2ggPT09IDB4M0UvKiA+ICovKSB7XG4gICAgZm9sZGluZyA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3RhdGUua2luZCA9ICdzY2FsYXInO1xuICBzdGF0ZS5yZXN1bHQgPSAnJztcblxuICB3aGlsZSAoY2ggIT09IDApIHtcbiAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG5cbiAgICBpZiAoY2ggPT09IDB4MkIvKiArICovIHx8IGNoID09PSAweDJELyogLSAqLykge1xuICAgICAgaWYgKENIT01QSU5HX0NMSVAgPT09IGNob21waW5nKSB7XG4gICAgICAgIGNob21waW5nID0gKGNoID09PSAweDJCLyogKyAqLykgPyBDSE9NUElOR19LRUVQIDogQ0hPTVBJTkdfU1RSSVA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAncmVwZWF0IG9mIGEgY2hvbXBpbmcgbW9kZSBpZGVudGlmaWVyJyk7XG4gICAgICB9XG5cbiAgICB9IGVsc2UgaWYgKCh0bXAgPSBmcm9tRGVjaW1hbENvZGUoY2gpKSA+PSAwKSB7XG4gICAgICBpZiAodG1wID09PSAwKSB7XG4gICAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdiYWQgZXhwbGljaXQgaW5kZW50YXRpb24gd2lkdGggb2YgYSBibG9jayBzY2FsYXI7IGl0IGNhbm5vdCBiZSBsZXNzIHRoYW4gb25lJyk7XG4gICAgICB9IGVsc2UgaWYgKCFkZXRlY3RlZEluZGVudCkge1xuICAgICAgICB0ZXh0SW5kZW50ID0gbm9kZUluZGVudCArIHRtcCAtIDE7XG4gICAgICAgIGRldGVjdGVkSW5kZW50ID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdyZXBlYXQgb2YgYW4gaW5kZW50YXRpb24gd2lkdGggaWRlbnRpZmllcicpO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGlmIChpc19XSElURV9TUEFDRShjaCkpIHtcbiAgICBkbyB7IGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTsgfVxuICAgIHdoaWxlIChpc19XSElURV9TUEFDRShjaCkpO1xuXG4gICAgaWYgKGNoID09PSAweDIzLyogIyAqLykge1xuICAgICAgZG8geyBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7IH1cbiAgICAgIHdoaWxlICghaXNfRU9MKGNoKSAmJiAoY2ggIT09IDApKTtcbiAgICB9XG4gIH1cblxuICB3aGlsZSAoY2ggIT09IDApIHtcbiAgICByZWFkTGluZUJyZWFrKHN0YXRlKTtcbiAgICBzdGF0ZS5saW5lSW5kZW50ID0gMDtcblxuICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG5cbiAgICB3aGlsZSAoKCFkZXRlY3RlZEluZGVudCB8fCBzdGF0ZS5saW5lSW5kZW50IDwgdGV4dEluZGVudCkgJiZcbiAgICAgICAgICAgKGNoID09PSAweDIwLyogU3BhY2UgKi8pKSB7XG4gICAgICBzdGF0ZS5saW5lSW5kZW50Kys7XG4gICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gICAgfVxuXG4gICAgaWYgKCFkZXRlY3RlZEluZGVudCAmJiBzdGF0ZS5saW5lSW5kZW50ID4gdGV4dEluZGVudCkge1xuICAgICAgdGV4dEluZGVudCA9IHN0YXRlLmxpbmVJbmRlbnQ7XG4gICAgfVxuXG4gICAgaWYgKGlzX0VPTChjaCkpIHtcbiAgICAgIGVtcHR5TGluZXMrKztcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIEVuZCBvZiB0aGUgc2NhbGFyLlxuICAgIGlmIChzdGF0ZS5saW5lSW5kZW50IDwgdGV4dEluZGVudCkge1xuXG4gICAgICAvLyBQZXJmb3JtIHRoZSBjaG9tcGluZy5cbiAgICAgIGlmIChjaG9tcGluZyA9PT0gQ0hPTVBJTkdfS0VFUCkge1xuICAgICAgICBzdGF0ZS5yZXN1bHQgKz0gY29tbW9uLnJlcGVhdCgnXFxuJywgZGlkUmVhZENvbnRlbnQgPyAxICsgZW1wdHlMaW5lcyA6IGVtcHR5TGluZXMpO1xuICAgICAgfSBlbHNlIGlmIChjaG9tcGluZyA9PT0gQ0hPTVBJTkdfQ0xJUCkge1xuICAgICAgICBpZiAoZGlkUmVhZENvbnRlbnQpIHsgLy8gaS5lLiBvbmx5IGlmIHRoZSBzY2FsYXIgaXMgbm90IGVtcHR5LlxuICAgICAgICAgIHN0YXRlLnJlc3VsdCArPSAnXFxuJztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBCcmVhayB0aGlzIGB3aGlsZWAgY3ljbGUgYW5kIGdvIHRvIHRoZSBmdW5jaXRvbidzIGVwaWxvZ3VlLlxuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgLy8gRm9sZGVkIHN0eWxlOiB1c2UgZmFuY3kgcnVsZXMgdG8gaGFuZGxlIGxpbmUgYnJlYWtzLlxuICAgIGlmIChmb2xkaW5nKSB7XG5cbiAgICAgIC8vIExpbmVzIHN0YXJ0aW5nIHdpdGggd2hpdGUgc3BhY2UgY2hhcmFjdGVycyAobW9yZS1pbmRlbnRlZCBsaW5lcykgYXJlIG5vdCBmb2xkZWQuXG4gICAgICBpZiAoaXNfV0hJVEVfU1BBQ0UoY2gpKSB7XG4gICAgICAgIGF0TW9yZUluZGVudGVkID0gdHJ1ZTtcbiAgICAgICAgLy8gZXhjZXB0IGZvciB0aGUgZmlyc3QgY29udGVudCBsaW5lIChjZi4gRXhhbXBsZSA4LjEpXG4gICAgICAgIHN0YXRlLnJlc3VsdCArPSBjb21tb24ucmVwZWF0KCdcXG4nLCBkaWRSZWFkQ29udGVudCA/IDEgKyBlbXB0eUxpbmVzIDogZW1wdHlMaW5lcyk7XG5cbiAgICAgIC8vIEVuZCBvZiBtb3JlLWluZGVudGVkIGJsb2NrLlxuICAgICAgfSBlbHNlIGlmIChhdE1vcmVJbmRlbnRlZCkge1xuICAgICAgICBhdE1vcmVJbmRlbnRlZCA9IGZhbHNlO1xuICAgICAgICBzdGF0ZS5yZXN1bHQgKz0gY29tbW9uLnJlcGVhdCgnXFxuJywgZW1wdHlMaW5lcyArIDEpO1xuXG4gICAgICAvLyBKdXN0IG9uZSBsaW5lIGJyZWFrIC0gcGVyY2VpdmUgYXMgdGhlIHNhbWUgbGluZS5cbiAgICAgIH0gZWxzZSBpZiAoZW1wdHlMaW5lcyA9PT0gMCkge1xuICAgICAgICBpZiAoZGlkUmVhZENvbnRlbnQpIHsgLy8gaS5lLiBvbmx5IGlmIHdlIGhhdmUgYWxyZWFkeSByZWFkIHNvbWUgc2NhbGFyIGNvbnRlbnQuXG4gICAgICAgICAgc3RhdGUucmVzdWx0ICs9ICcgJztcbiAgICAgICAgfVxuXG4gICAgICAvLyBTZXZlcmFsIGxpbmUgYnJlYWtzIC0gcGVyY2VpdmUgYXMgZGlmZmVyZW50IGxpbmVzLlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhdGUucmVzdWx0ICs9IGNvbW1vbi5yZXBlYXQoJ1xcbicsIGVtcHR5TGluZXMpO1xuICAgICAgfVxuXG4gICAgLy8gTGl0ZXJhbCBzdHlsZToganVzdCBhZGQgZXhhY3QgbnVtYmVyIG9mIGxpbmUgYnJlYWtzIGJldHdlZW4gY29udGVudCBsaW5lcy5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gS2VlcCBhbGwgbGluZSBicmVha3MgZXhjZXB0IHRoZSBoZWFkZXIgbGluZSBicmVhay5cbiAgICAgIHN0YXRlLnJlc3VsdCArPSBjb21tb24ucmVwZWF0KCdcXG4nLCBkaWRSZWFkQ29udGVudCA/IDEgKyBlbXB0eUxpbmVzIDogZW1wdHlMaW5lcyk7XG4gICAgfVxuXG4gICAgZGlkUmVhZENvbnRlbnQgPSB0cnVlO1xuICAgIGRldGVjdGVkSW5kZW50ID0gdHJ1ZTtcbiAgICBlbXB0eUxpbmVzID0gMDtcbiAgICBjYXB0dXJlU3RhcnQgPSBzdGF0ZS5wb3NpdGlvbjtcblxuICAgIHdoaWxlICghaXNfRU9MKGNoKSAmJiAoY2ggIT09IDApKSB7XG4gICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gICAgfVxuXG4gICAgY2FwdHVyZVNlZ21lbnQoc3RhdGUsIGNhcHR1cmVTdGFydCwgc3RhdGUucG9zaXRpb24sIGZhbHNlKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiByZWFkQmxvY2tTZXF1ZW5jZShzdGF0ZSwgbm9kZUluZGVudCkge1xuICB2YXIgX2xpbmUsXG4gICAgICBfdGFnICAgICAgPSBzdGF0ZS50YWcsXG4gICAgICBfYW5jaG9yICAgPSBzdGF0ZS5hbmNob3IsXG4gICAgICBfcmVzdWx0ICAgPSBbXSxcbiAgICAgIGZvbGxvd2luZyxcbiAgICAgIGRldGVjdGVkICA9IGZhbHNlLFxuICAgICAgY2g7XG5cbiAgaWYgKHN0YXRlLmFuY2hvciAhPT0gbnVsbCkge1xuICAgIHN0YXRlLmFuY2hvck1hcFtzdGF0ZS5hbmNob3JdID0gX3Jlc3VsdDtcbiAgfVxuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG5cbiAgd2hpbGUgKGNoICE9PSAwKSB7XG5cbiAgICBpZiAoY2ggIT09IDB4MkQvKiAtICovKSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBmb2xsb3dpbmcgPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uICsgMSk7XG5cbiAgICBpZiAoIWlzX1dTX09SX0VPTChmb2xsb3dpbmcpKSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBkZXRlY3RlZCA9IHRydWU7XG4gICAgc3RhdGUucG9zaXRpb24rKztcblxuICAgIGlmIChza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCAtMSkpIHtcbiAgICAgIGlmIChzdGF0ZS5saW5lSW5kZW50IDw9IG5vZGVJbmRlbnQpIHtcbiAgICAgICAgX3Jlc3VsdC5wdXNoKG51bGwpO1xuICAgICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBfbGluZSA9IHN0YXRlLmxpbmU7XG4gICAgY29tcG9zZU5vZGUoc3RhdGUsIG5vZGVJbmRlbnQsIENPTlRFWFRfQkxPQ0tfSU4sIGZhbHNlLCB0cnVlKTtcbiAgICBfcmVzdWx0LnB1c2goc3RhdGUucmVzdWx0KTtcbiAgICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCAtMSk7XG5cbiAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gICAgaWYgKChzdGF0ZS5saW5lID09PSBfbGluZSB8fCBzdGF0ZS5saW5lSW5kZW50ID4gbm9kZUluZGVudCkgJiYgKGNoICE9PSAwKSkge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2JhZCBpbmRlbnRhdGlvbiBvZiBhIHNlcXVlbmNlIGVudHJ5Jyk7XG4gICAgfSBlbHNlIGlmIChzdGF0ZS5saW5lSW5kZW50IDwgbm9kZUluZGVudCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKGRldGVjdGVkKSB7XG4gICAgc3RhdGUudGFnID0gX3RhZztcbiAgICBzdGF0ZS5hbmNob3IgPSBfYW5jaG9yO1xuICAgIHN0YXRlLmtpbmQgPSAnc2VxdWVuY2UnO1xuICAgIHN0YXRlLnJlc3VsdCA9IF9yZXN1bHQ7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiByZWFkQmxvY2tNYXBwaW5nKHN0YXRlLCBub2RlSW5kZW50LCBmbG93SW5kZW50KSB7XG4gIHZhciBmb2xsb3dpbmcsXG4gICAgICBhbGxvd0NvbXBhY3QsXG4gICAgICBfbGluZSxcbiAgICAgIF9wb3MsXG4gICAgICBfdGFnICAgICAgICAgID0gc3RhdGUudGFnLFxuICAgICAgX2FuY2hvciAgICAgICA9IHN0YXRlLmFuY2hvcixcbiAgICAgIF9yZXN1bHQgICAgICAgPSB7fSxcbiAgICAgIG92ZXJyaWRhYmxlS2V5cyA9IHt9LFxuICAgICAga2V5VGFnICAgICAgICA9IG51bGwsXG4gICAgICBrZXlOb2RlICAgICAgID0gbnVsbCxcbiAgICAgIHZhbHVlTm9kZSAgICAgPSBudWxsLFxuICAgICAgYXRFeHBsaWNpdEtleSA9IGZhbHNlLFxuICAgICAgZGV0ZWN0ZWQgICAgICA9IGZhbHNlLFxuICAgICAgY2g7XG5cbiAgaWYgKHN0YXRlLmFuY2hvciAhPT0gbnVsbCkge1xuICAgIHN0YXRlLmFuY2hvck1hcFtzdGF0ZS5hbmNob3JdID0gX3Jlc3VsdDtcbiAgfVxuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG5cbiAgd2hpbGUgKGNoICE9PSAwKSB7XG4gICAgZm9sbG93aW5nID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbiArIDEpO1xuICAgIF9saW5lID0gc3RhdGUubGluZTsgLy8gU2F2ZSB0aGUgY3VycmVudCBsaW5lLlxuICAgIF9wb3MgPSBzdGF0ZS5wb3NpdGlvbjtcblxuICAgIC8vXG4gICAgLy8gRXhwbGljaXQgbm90YXRpb24gY2FzZS4gVGhlcmUgYXJlIHR3byBzZXBhcmF0ZSBibG9ja3M6XG4gICAgLy8gZmlyc3QgZm9yIHRoZSBrZXkgKGRlbm90ZWQgYnkgXCI/XCIpIGFuZCBzZWNvbmQgZm9yIHRoZSB2YWx1ZSAoZGVub3RlZCBieSBcIjpcIilcbiAgICAvL1xuICAgIGlmICgoY2ggPT09IDB4M0YvKiA/ICovIHx8IGNoID09PSAweDNBLyogOiAqLykgJiYgaXNfV1NfT1JfRU9MKGZvbGxvd2luZykpIHtcblxuICAgICAgaWYgKGNoID09PSAweDNGLyogPyAqLykge1xuICAgICAgICBpZiAoYXRFeHBsaWNpdEtleSkge1xuICAgICAgICAgIHN0b3JlTWFwcGluZ1BhaXIoc3RhdGUsIF9yZXN1bHQsIG92ZXJyaWRhYmxlS2V5cywga2V5VGFnLCBrZXlOb2RlLCBudWxsKTtcbiAgICAgICAgICBrZXlUYWcgPSBrZXlOb2RlID0gdmFsdWVOb2RlID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGRldGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgYXRFeHBsaWNpdEtleSA9IHRydWU7XG4gICAgICAgIGFsbG93Q29tcGFjdCA9IHRydWU7XG5cbiAgICAgIH0gZWxzZSBpZiAoYXRFeHBsaWNpdEtleSkge1xuICAgICAgICAvLyBpLmUuIDB4M0EvKiA6ICovID09PSBjaGFyYWN0ZXIgYWZ0ZXIgdGhlIGV4cGxpY2l0IGtleS5cbiAgICAgICAgYXRFeHBsaWNpdEtleSA9IGZhbHNlO1xuICAgICAgICBhbGxvd0NvbXBhY3QgPSB0cnVlO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnaW5jb21wbGV0ZSBleHBsaWNpdCBtYXBwaW5nIHBhaXI7IGEga2V5IG5vZGUgaXMgbWlzc2VkOyBvciBmb2xsb3dlZCBieSBhIG5vbi10YWJ1bGF0ZWQgZW1wdHkgbGluZScpO1xuICAgICAgfVxuXG4gICAgICBzdGF0ZS5wb3NpdGlvbiArPSAxO1xuICAgICAgY2ggPSBmb2xsb3dpbmc7XG5cbiAgICAvL1xuICAgIC8vIEltcGxpY2l0IG5vdGF0aW9uIGNhc2UuIEZsb3ctc3R5bGUgbm9kZSBhcyB0aGUga2V5IGZpcnN0LCB0aGVuIFwiOlwiLCBhbmQgdGhlIHZhbHVlLlxuICAgIC8vXG4gICAgfSBlbHNlIGlmIChjb21wb3NlTm9kZShzdGF0ZSwgZmxvd0luZGVudCwgQ09OVEVYVF9GTE9XX09VVCwgZmFsc2UsIHRydWUpKSB7XG5cbiAgICAgIGlmIChzdGF0ZS5saW5lID09PSBfbGluZSkge1xuICAgICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gICAgICAgIHdoaWxlIChpc19XSElURV9TUEFDRShjaCkpIHtcbiAgICAgICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2ggPT09IDB4M0EvKiA6ICovKSB7XG4gICAgICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuXG4gICAgICAgICAgaWYgKCFpc19XU19PUl9FT0woY2gpKSB7XG4gICAgICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnYSB3aGl0ZXNwYWNlIGNoYXJhY3RlciBpcyBleHBlY3RlZCBhZnRlciB0aGUga2V5LXZhbHVlIHNlcGFyYXRvciB3aXRoaW4gYSBibG9jayBtYXBwaW5nJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGF0RXhwbGljaXRLZXkpIHtcbiAgICAgICAgICAgIHN0b3JlTWFwcGluZ1BhaXIoc3RhdGUsIF9yZXN1bHQsIG92ZXJyaWRhYmxlS2V5cywga2V5VGFnLCBrZXlOb2RlLCBudWxsKTtcbiAgICAgICAgICAgIGtleVRhZyA9IGtleU5vZGUgPSB2YWx1ZU5vZGUgPSBudWxsO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGRldGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICBhdEV4cGxpY2l0S2V5ID0gZmFsc2U7XG4gICAgICAgICAgYWxsb3dDb21wYWN0ID0gZmFsc2U7XG4gICAgICAgICAga2V5VGFnID0gc3RhdGUudGFnO1xuICAgICAgICAgIGtleU5vZGUgPSBzdGF0ZS5yZXN1bHQ7XG5cbiAgICAgICAgfSBlbHNlIGlmIChkZXRlY3RlZCkge1xuICAgICAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdjYW4gbm90IHJlYWQgYW4gaW1wbGljaXQgbWFwcGluZyBwYWlyOyBhIGNvbG9uIGlzIG1pc3NlZCcpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RhdGUudGFnID0gX3RhZztcbiAgICAgICAgICBzdGF0ZS5hbmNob3IgPSBfYW5jaG9yO1xuICAgICAgICAgIHJldHVybiB0cnVlOyAvLyBLZWVwIHRoZSByZXN1bHQgb2YgYGNvbXBvc2VOb2RlYC5cbiAgICAgICAgfVxuXG4gICAgICB9IGVsc2UgaWYgKGRldGVjdGVkKSB7XG4gICAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdjYW4gbm90IHJlYWQgYSBibG9jayBtYXBwaW5nIGVudHJ5OyBhIG11bHRpbGluZSBrZXkgbWF5IG5vdCBiZSBhbiBpbXBsaWNpdCBrZXknKTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhdGUudGFnID0gX3RhZztcbiAgICAgICAgc3RhdGUuYW5jaG9yID0gX2FuY2hvcjtcbiAgICAgICAgcmV0dXJuIHRydWU7IC8vIEtlZXAgdGhlIHJlc3VsdCBvZiBgY29tcG9zZU5vZGVgLlxuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIGJyZWFrOyAvLyBSZWFkaW5nIGlzIGRvbmUuIEdvIHRvIHRoZSBlcGlsb2d1ZS5cbiAgICB9XG5cbiAgICAvL1xuICAgIC8vIENvbW1vbiByZWFkaW5nIGNvZGUgZm9yIGJvdGggZXhwbGljaXQgYW5kIGltcGxpY2l0IG5vdGF0aW9ucy5cbiAgICAvL1xuICAgIGlmIChzdGF0ZS5saW5lID09PSBfbGluZSB8fCBzdGF0ZS5saW5lSW5kZW50ID4gbm9kZUluZGVudCkge1xuICAgICAgaWYgKGNvbXBvc2VOb2RlKHN0YXRlLCBub2RlSW5kZW50LCBDT05URVhUX0JMT0NLX09VVCwgdHJ1ZSwgYWxsb3dDb21wYWN0KSkge1xuICAgICAgICBpZiAoYXRFeHBsaWNpdEtleSkge1xuICAgICAgICAgIGtleU5vZGUgPSBzdGF0ZS5yZXN1bHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFsdWVOb2RlID0gc3RhdGUucmVzdWx0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghYXRFeHBsaWNpdEtleSkge1xuICAgICAgICBzdG9yZU1hcHBpbmdQYWlyKHN0YXRlLCBfcmVzdWx0LCBvdmVycmlkYWJsZUtleXMsIGtleVRhZywga2V5Tm9kZSwgdmFsdWVOb2RlLCBfbGluZSwgX3Bvcyk7XG4gICAgICAgIGtleVRhZyA9IGtleU5vZGUgPSB2YWx1ZU5vZGUgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCAtMSk7XG4gICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuICAgIH1cblxuICAgIGlmIChzdGF0ZS5saW5lSW5kZW50ID4gbm9kZUluZGVudCAmJiAoY2ggIT09IDApKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnYmFkIGluZGVudGF0aW9uIG9mIGEgbWFwcGluZyBlbnRyeScpO1xuICAgIH0gZWxzZSBpZiAoc3RhdGUubGluZUluZGVudCA8IG5vZGVJbmRlbnQpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8vXG4gIC8vIEVwaWxvZ3VlLlxuICAvL1xuXG4gIC8vIFNwZWNpYWwgY2FzZTogbGFzdCBtYXBwaW5nJ3Mgbm9kZSBjb250YWlucyBvbmx5IHRoZSBrZXkgaW4gZXhwbGljaXQgbm90YXRpb24uXG4gIGlmIChhdEV4cGxpY2l0S2V5KSB7XG4gICAgc3RvcmVNYXBwaW5nUGFpcihzdGF0ZSwgX3Jlc3VsdCwgb3ZlcnJpZGFibGVLZXlzLCBrZXlUYWcsIGtleU5vZGUsIG51bGwpO1xuICB9XG5cbiAgLy8gRXhwb3NlIHRoZSByZXN1bHRpbmcgbWFwcGluZy5cbiAgaWYgKGRldGVjdGVkKSB7XG4gICAgc3RhdGUudGFnID0gX3RhZztcbiAgICBzdGF0ZS5hbmNob3IgPSBfYW5jaG9yO1xuICAgIHN0YXRlLmtpbmQgPSAnbWFwcGluZyc7XG4gICAgc3RhdGUucmVzdWx0ID0gX3Jlc3VsdDtcbiAgfVxuXG4gIHJldHVybiBkZXRlY3RlZDtcbn1cblxuZnVuY3Rpb24gcmVhZFRhZ1Byb3BlcnR5KHN0YXRlKSB7XG4gIHZhciBfcG9zaXRpb24sXG4gICAgICBpc1ZlcmJhdGltID0gZmFsc2UsXG4gICAgICBpc05hbWVkICAgID0gZmFsc2UsXG4gICAgICB0YWdIYW5kbGUsXG4gICAgICB0YWdOYW1lLFxuICAgICAgY2g7XG5cbiAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICBpZiAoY2ggIT09IDB4MjEvKiAhICovKSByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHN0YXRlLnRhZyAhPT0gbnVsbCkge1xuICAgIHRocm93RXJyb3Ioc3RhdGUsICdkdXBsaWNhdGlvbiBvZiBhIHRhZyBwcm9wZXJ0eScpO1xuICB9XG5cbiAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuXG4gIGlmIChjaCA9PT0gMHgzQy8qIDwgKi8pIHtcbiAgICBpc1ZlcmJhdGltID0gdHJ1ZTtcbiAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG5cbiAgfSBlbHNlIGlmIChjaCA9PT0gMHgyMS8qICEgKi8pIHtcbiAgICBpc05hbWVkID0gdHJ1ZTtcbiAgICB0YWdIYW5kbGUgPSAnISEnO1xuICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcblxuICB9IGVsc2Uge1xuICAgIHRhZ0hhbmRsZSA9ICchJztcbiAgfVxuXG4gIF9wb3NpdGlvbiA9IHN0YXRlLnBvc2l0aW9uO1xuXG4gIGlmIChpc1ZlcmJhdGltKSB7XG4gICAgZG8geyBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7IH1cbiAgICB3aGlsZSAoY2ggIT09IDAgJiYgY2ggIT09IDB4M0UvKiA+ICovKTtcblxuICAgIGlmIChzdGF0ZS5wb3NpdGlvbiA8IHN0YXRlLmxlbmd0aCkge1xuICAgICAgdGFnTmFtZSA9IHN0YXRlLmlucHV0LnNsaWNlKF9wb3NpdGlvbiwgc3RhdGUucG9zaXRpb24pO1xuICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAndW5leHBlY3RlZCBlbmQgb2YgdGhlIHN0cmVhbSB3aXRoaW4gYSB2ZXJiYXRpbSB0YWcnKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKGNoICE9PSAwICYmICFpc19XU19PUl9FT0woY2gpKSB7XG5cbiAgICAgIGlmIChjaCA9PT0gMHgyMS8qICEgKi8pIHtcbiAgICAgICAgaWYgKCFpc05hbWVkKSB7XG4gICAgICAgICAgdGFnSGFuZGxlID0gc3RhdGUuaW5wdXQuc2xpY2UoX3Bvc2l0aW9uIC0gMSwgc3RhdGUucG9zaXRpb24gKyAxKTtcblxuICAgICAgICAgIGlmICghUEFUVEVSTl9UQUdfSEFORExFLnRlc3QodGFnSGFuZGxlKSkge1xuICAgICAgICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ25hbWVkIHRhZyBoYW5kbGUgY2Fubm90IGNvbnRhaW4gc3VjaCBjaGFyYWN0ZXJzJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaXNOYW1lZCA9IHRydWU7XG4gICAgICAgICAgX3Bvc2l0aW9uID0gc3RhdGUucG9zaXRpb24gKyAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93RXJyb3Ioc3RhdGUsICd0YWcgc3VmZml4IGNhbm5vdCBjb250YWluIGV4Y2xhbWF0aW9uIG1hcmtzJyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgIH1cblxuICAgIHRhZ05hbWUgPSBzdGF0ZS5pbnB1dC5zbGljZShfcG9zaXRpb24sIHN0YXRlLnBvc2l0aW9uKTtcblxuICAgIGlmIChQQVRURVJOX0ZMT1dfSU5ESUNBVE9SUy50ZXN0KHRhZ05hbWUpKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAndGFnIHN1ZmZpeCBjYW5ub3QgY29udGFpbiBmbG93IGluZGljYXRvciBjaGFyYWN0ZXJzJyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHRhZ05hbWUgJiYgIVBBVFRFUk5fVEFHX1VSSS50ZXN0KHRhZ05hbWUpKSB7XG4gICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3RhZyBuYW1lIGNhbm5vdCBjb250YWluIHN1Y2ggY2hhcmFjdGVyczogJyArIHRhZ05hbWUpO1xuICB9XG5cbiAgaWYgKGlzVmVyYmF0aW0pIHtcbiAgICBzdGF0ZS50YWcgPSB0YWdOYW1lO1xuXG4gIH0gZWxzZSBpZiAoX2hhc093blByb3BlcnR5LmNhbGwoc3RhdGUudGFnTWFwLCB0YWdIYW5kbGUpKSB7XG4gICAgc3RhdGUudGFnID0gc3RhdGUudGFnTWFwW3RhZ0hhbmRsZV0gKyB0YWdOYW1lO1xuXG4gIH0gZWxzZSBpZiAodGFnSGFuZGxlID09PSAnIScpIHtcbiAgICBzdGF0ZS50YWcgPSAnIScgKyB0YWdOYW1lO1xuXG4gIH0gZWxzZSBpZiAodGFnSGFuZGxlID09PSAnISEnKSB7XG4gICAgc3RhdGUudGFnID0gJ3RhZzp5YW1sLm9yZywyMDAyOicgKyB0YWdOYW1lO1xuXG4gIH0gZWxzZSB7XG4gICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3VuZGVjbGFyZWQgdGFnIGhhbmRsZSBcIicgKyB0YWdIYW5kbGUgKyAnXCInKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiByZWFkQW5jaG9yUHJvcGVydHkoc3RhdGUpIHtcbiAgdmFyIF9wb3NpdGlvbixcbiAgICAgIGNoO1xuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG5cbiAgaWYgKGNoICE9PSAweDI2LyogJiAqLykgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChzdGF0ZS5hbmNob3IgIT09IG51bGwpIHtcbiAgICB0aHJvd0Vycm9yKHN0YXRlLCAnZHVwbGljYXRpb24gb2YgYW4gYW5jaG9yIHByb3BlcnR5Jyk7XG4gIH1cblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gIF9wb3NpdGlvbiA9IHN0YXRlLnBvc2l0aW9uO1xuXG4gIHdoaWxlIChjaCAhPT0gMCAmJiAhaXNfV1NfT1JfRU9MKGNoKSAmJiAhaXNfRkxPV19JTkRJQ0FUT1IoY2gpKSB7XG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICB9XG5cbiAgaWYgKHN0YXRlLnBvc2l0aW9uID09PSBfcG9zaXRpb24pIHtcbiAgICB0aHJvd0Vycm9yKHN0YXRlLCAnbmFtZSBvZiBhbiBhbmNob3Igbm9kZSBtdXN0IGNvbnRhaW4gYXQgbGVhc3Qgb25lIGNoYXJhY3RlcicpO1xuICB9XG5cbiAgc3RhdGUuYW5jaG9yID0gc3RhdGUuaW5wdXQuc2xpY2UoX3Bvc2l0aW9uLCBzdGF0ZS5wb3NpdGlvbik7XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiByZWFkQWxpYXMoc3RhdGUpIHtcbiAgdmFyIF9wb3NpdGlvbiwgYWxpYXMsXG4gICAgICBjaDtcblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gIGlmIChjaCAhPT0gMHgyQS8qICogKi8pIHJldHVybiBmYWxzZTtcblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gIF9wb3NpdGlvbiA9IHN0YXRlLnBvc2l0aW9uO1xuXG4gIHdoaWxlIChjaCAhPT0gMCAmJiAhaXNfV1NfT1JfRU9MKGNoKSAmJiAhaXNfRkxPV19JTkRJQ0FUT1IoY2gpKSB7XG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICB9XG5cbiAgaWYgKHN0YXRlLnBvc2l0aW9uID09PSBfcG9zaXRpb24pIHtcbiAgICB0aHJvd0Vycm9yKHN0YXRlLCAnbmFtZSBvZiBhbiBhbGlhcyBub2RlIG11c3QgY29udGFpbiBhdCBsZWFzdCBvbmUgY2hhcmFjdGVyJyk7XG4gIH1cblxuICBhbGlhcyA9IHN0YXRlLmlucHV0LnNsaWNlKF9wb3NpdGlvbiwgc3RhdGUucG9zaXRpb24pO1xuXG4gIGlmICghX2hhc093blByb3BlcnR5LmNhbGwoc3RhdGUuYW5jaG9yTWFwLCBhbGlhcykpIHtcbiAgICB0aHJvd0Vycm9yKHN0YXRlLCAndW5pZGVudGlmaWVkIGFsaWFzIFwiJyArIGFsaWFzICsgJ1wiJyk7XG4gIH1cblxuICBzdGF0ZS5yZXN1bHQgPSBzdGF0ZS5hbmNob3JNYXBbYWxpYXNdO1xuICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCAtMSk7XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBjb21wb3NlTm9kZShzdGF0ZSwgcGFyZW50SW5kZW50LCBub2RlQ29udGV4dCwgYWxsb3dUb1NlZWssIGFsbG93Q29tcGFjdCkge1xuICB2YXIgYWxsb3dCbG9ja1N0eWxlcyxcbiAgICAgIGFsbG93QmxvY2tTY2FsYXJzLFxuICAgICAgYWxsb3dCbG9ja0NvbGxlY3Rpb25zLFxuICAgICAgaW5kZW50U3RhdHVzID0gMSwgLy8gMTogdGhpcz5wYXJlbnQsIDA6IHRoaXM9cGFyZW50LCAtMTogdGhpczxwYXJlbnRcbiAgICAgIGF0TmV3TGluZSAgPSBmYWxzZSxcbiAgICAgIGhhc0NvbnRlbnQgPSBmYWxzZSxcbiAgICAgIHR5cGVJbmRleCxcbiAgICAgIHR5cGVRdWFudGl0eSxcbiAgICAgIHR5cGUsXG4gICAgICBmbG93SW5kZW50LFxuICAgICAgYmxvY2tJbmRlbnQ7XG5cbiAgaWYgKHN0YXRlLmxpc3RlbmVyICE9PSBudWxsKSB7XG4gICAgc3RhdGUubGlzdGVuZXIoJ29wZW4nLCBzdGF0ZSk7XG4gIH1cblxuICBzdGF0ZS50YWcgICAgPSBudWxsO1xuICBzdGF0ZS5hbmNob3IgPSBudWxsO1xuICBzdGF0ZS5raW5kICAgPSBudWxsO1xuICBzdGF0ZS5yZXN1bHQgPSBudWxsO1xuXG4gIGFsbG93QmxvY2tTdHlsZXMgPSBhbGxvd0Jsb2NrU2NhbGFycyA9IGFsbG93QmxvY2tDb2xsZWN0aW9ucyA9XG4gICAgQ09OVEVYVF9CTE9DS19PVVQgPT09IG5vZGVDb250ZXh0IHx8XG4gICAgQ09OVEVYVF9CTE9DS19JTiAgPT09IG5vZGVDb250ZXh0O1xuXG4gIGlmIChhbGxvd1RvU2Vlaykge1xuICAgIGlmIChza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCAtMSkpIHtcbiAgICAgIGF0TmV3TGluZSA9IHRydWU7XG5cbiAgICAgIGlmIChzdGF0ZS5saW5lSW5kZW50ID4gcGFyZW50SW5kZW50KSB7XG4gICAgICAgIGluZGVudFN0YXR1cyA9IDE7XG4gICAgICB9IGVsc2UgaWYgKHN0YXRlLmxpbmVJbmRlbnQgPT09IHBhcmVudEluZGVudCkge1xuICAgICAgICBpbmRlbnRTdGF0dXMgPSAwO1xuICAgICAgfSBlbHNlIGlmIChzdGF0ZS5saW5lSW5kZW50IDwgcGFyZW50SW5kZW50KSB7XG4gICAgICAgIGluZGVudFN0YXR1cyA9IC0xO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChpbmRlbnRTdGF0dXMgPT09IDEpIHtcbiAgICB3aGlsZSAocmVhZFRhZ1Byb3BlcnR5KHN0YXRlKSB8fCByZWFkQW5jaG9yUHJvcGVydHkoc3RhdGUpKSB7XG4gICAgICBpZiAoc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgLTEpKSB7XG4gICAgICAgIGF0TmV3TGluZSA9IHRydWU7XG4gICAgICAgIGFsbG93QmxvY2tDb2xsZWN0aW9ucyA9IGFsbG93QmxvY2tTdHlsZXM7XG5cbiAgICAgICAgaWYgKHN0YXRlLmxpbmVJbmRlbnQgPiBwYXJlbnRJbmRlbnQpIHtcbiAgICAgICAgICBpbmRlbnRTdGF0dXMgPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlLmxpbmVJbmRlbnQgPT09IHBhcmVudEluZGVudCkge1xuICAgICAgICAgIGluZGVudFN0YXR1cyA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUubGluZUluZGVudCA8IHBhcmVudEluZGVudCkge1xuICAgICAgICAgIGluZGVudFN0YXR1cyA9IC0xO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbGxvd0Jsb2NrQ29sbGVjdGlvbnMgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoYWxsb3dCbG9ja0NvbGxlY3Rpb25zKSB7XG4gICAgYWxsb3dCbG9ja0NvbGxlY3Rpb25zID0gYXROZXdMaW5lIHx8IGFsbG93Q29tcGFjdDtcbiAgfVxuXG4gIGlmIChpbmRlbnRTdGF0dXMgPT09IDEgfHwgQ09OVEVYVF9CTE9DS19PVVQgPT09IG5vZGVDb250ZXh0KSB7XG4gICAgaWYgKENPTlRFWFRfRkxPV19JTiA9PT0gbm9kZUNvbnRleHQgfHwgQ09OVEVYVF9GTE9XX09VVCA9PT0gbm9kZUNvbnRleHQpIHtcbiAgICAgIGZsb3dJbmRlbnQgPSBwYXJlbnRJbmRlbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZsb3dJbmRlbnQgPSBwYXJlbnRJbmRlbnQgKyAxO1xuICAgIH1cblxuICAgIGJsb2NrSW5kZW50ID0gc3RhdGUucG9zaXRpb24gLSBzdGF0ZS5saW5lU3RhcnQ7XG5cbiAgICBpZiAoaW5kZW50U3RhdHVzID09PSAxKSB7XG4gICAgICBpZiAoYWxsb3dCbG9ja0NvbGxlY3Rpb25zICYmXG4gICAgICAgICAgKHJlYWRCbG9ja1NlcXVlbmNlKHN0YXRlLCBibG9ja0luZGVudCkgfHxcbiAgICAgICAgICAgcmVhZEJsb2NrTWFwcGluZyhzdGF0ZSwgYmxvY2tJbmRlbnQsIGZsb3dJbmRlbnQpKSB8fFxuICAgICAgICAgIHJlYWRGbG93Q29sbGVjdGlvbihzdGF0ZSwgZmxvd0luZGVudCkpIHtcbiAgICAgICAgaGFzQ29udGVudCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoKGFsbG93QmxvY2tTY2FsYXJzICYmIHJlYWRCbG9ja1NjYWxhcihzdGF0ZSwgZmxvd0luZGVudCkpIHx8XG4gICAgICAgICAgICByZWFkU2luZ2xlUXVvdGVkU2NhbGFyKHN0YXRlLCBmbG93SW5kZW50KSB8fFxuICAgICAgICAgICAgcmVhZERvdWJsZVF1b3RlZFNjYWxhcihzdGF0ZSwgZmxvd0luZGVudCkpIHtcbiAgICAgICAgICBoYXNDb250ZW50ID0gdHJ1ZTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlYWRBbGlhcyhzdGF0ZSkpIHtcbiAgICAgICAgICBoYXNDb250ZW50ID0gdHJ1ZTtcblxuICAgICAgICAgIGlmIChzdGF0ZS50YWcgIT09IG51bGwgfHwgc3RhdGUuYW5jaG9yICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnYWxpYXMgbm9kZSBzaG91bGQgbm90IGhhdmUgYW55IHByb3BlcnRpZXMnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZWFkUGxhaW5TY2FsYXIoc3RhdGUsIGZsb3dJbmRlbnQsIENPTlRFWFRfRkxPV19JTiA9PT0gbm9kZUNvbnRleHQpKSB7XG4gICAgICAgICAgaGFzQ29udGVudCA9IHRydWU7XG5cbiAgICAgICAgICBpZiAoc3RhdGUudGFnID09PSBudWxsKSB7XG4gICAgICAgICAgICBzdGF0ZS50YWcgPSAnPyc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0YXRlLmFuY2hvciAhPT0gbnVsbCkge1xuICAgICAgICAgIHN0YXRlLmFuY2hvck1hcFtzdGF0ZS5hbmNob3JdID0gc3RhdGUucmVzdWx0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpbmRlbnRTdGF0dXMgPT09IDApIHtcbiAgICAgIC8vIFNwZWNpYWwgY2FzZTogYmxvY2sgc2VxdWVuY2VzIGFyZSBhbGxvd2VkIHRvIGhhdmUgc2FtZSBpbmRlbnRhdGlvbiBsZXZlbCBhcyB0aGUgcGFyZW50LlxuICAgICAgLy8gaHR0cDovL3d3dy55YW1sLm9yZy9zcGVjLzEuMi9zcGVjLmh0bWwjaWQyNzk5Nzg0XG4gICAgICBoYXNDb250ZW50ID0gYWxsb3dCbG9ja0NvbGxlY3Rpb25zICYmIHJlYWRCbG9ja1NlcXVlbmNlKHN0YXRlLCBibG9ja0luZGVudCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHN0YXRlLnRhZyAhPT0gbnVsbCAmJiBzdGF0ZS50YWcgIT09ICchJykge1xuICAgIGlmIChzdGF0ZS50YWcgPT09ICc/Jykge1xuICAgICAgLy8gSW1wbGljaXQgcmVzb2x2aW5nIGlzIG5vdCBhbGxvd2VkIGZvciBub24tc2NhbGFyIHR5cGVzLCBhbmQgJz8nXG4gICAgICAvLyBub24tc3BlY2lmaWMgdGFnIGlzIG9ubHkgYXV0b21hdGljYWxseSBhc3NpZ25lZCB0byBwbGFpbiBzY2FsYXJzLlxuICAgICAgLy9cbiAgICAgIC8vIFdlIG9ubHkgbmVlZCB0byBjaGVjayBraW5kIGNvbmZvcm1pdHkgaW4gY2FzZSB1c2VyIGV4cGxpY2l0bHkgYXNzaWducyAnPydcbiAgICAgIC8vIHRhZywgZm9yIGV4YW1wbGUgbGlrZSB0aGlzOiBcIiE8Pz4gWzBdXCJcbiAgICAgIC8vXG4gICAgICBpZiAoc3RhdGUucmVzdWx0ICE9PSBudWxsICYmIHN0YXRlLmtpbmQgIT09ICdzY2FsYXInKSB7XG4gICAgICAgIHRocm93RXJyb3Ioc3RhdGUsICd1bmFjY2VwdGFibGUgbm9kZSBraW5kIGZvciAhPD8+IHRhZzsgaXQgc2hvdWxkIGJlIFwic2NhbGFyXCIsIG5vdCBcIicgKyBzdGF0ZS5raW5kICsgJ1wiJyk7XG4gICAgICB9XG5cbiAgICAgIGZvciAodHlwZUluZGV4ID0gMCwgdHlwZVF1YW50aXR5ID0gc3RhdGUuaW1wbGljaXRUeXBlcy5sZW5ndGg7IHR5cGVJbmRleCA8IHR5cGVRdWFudGl0eTsgdHlwZUluZGV4ICs9IDEpIHtcbiAgICAgICAgdHlwZSA9IHN0YXRlLmltcGxpY2l0VHlwZXNbdHlwZUluZGV4XTtcblxuICAgICAgICBpZiAodHlwZS5yZXNvbHZlKHN0YXRlLnJlc3VsdCkpIHsgLy8gYHN0YXRlLnJlc3VsdGAgdXBkYXRlZCBpbiByZXNvbHZlciBpZiBtYXRjaGVkXG4gICAgICAgICAgc3RhdGUucmVzdWx0ID0gdHlwZS5jb25zdHJ1Y3Qoc3RhdGUucmVzdWx0KTtcbiAgICAgICAgICBzdGF0ZS50YWcgPSB0eXBlLnRhZztcbiAgICAgICAgICBpZiAoc3RhdGUuYW5jaG9yICE9PSBudWxsKSB7XG4gICAgICAgICAgICBzdGF0ZS5hbmNob3JNYXBbc3RhdGUuYW5jaG9yXSA9IHN0YXRlLnJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKF9oYXNPd25Qcm9wZXJ0eS5jYWxsKHN0YXRlLnR5cGVNYXBbc3RhdGUua2luZCB8fCAnZmFsbGJhY2snXSwgc3RhdGUudGFnKSkge1xuICAgICAgdHlwZSA9IHN0YXRlLnR5cGVNYXBbc3RhdGUua2luZCB8fCAnZmFsbGJhY2snXVtzdGF0ZS50YWddO1xuXG4gICAgICBpZiAoc3RhdGUucmVzdWx0ICE9PSBudWxsICYmIHR5cGUua2luZCAhPT0gc3RhdGUua2luZCkge1xuICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAndW5hY2NlcHRhYmxlIG5vZGUga2luZCBmb3IgITwnICsgc3RhdGUudGFnICsgJz4gdGFnOyBpdCBzaG91bGQgYmUgXCInICsgdHlwZS5raW5kICsgJ1wiLCBub3QgXCInICsgc3RhdGUua2luZCArICdcIicpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXR5cGUucmVzb2x2ZShzdGF0ZS5yZXN1bHQpKSB7IC8vIGBzdGF0ZS5yZXN1bHRgIHVwZGF0ZWQgaW4gcmVzb2x2ZXIgaWYgbWF0Y2hlZFxuICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnY2Fubm90IHJlc29sdmUgYSBub2RlIHdpdGggITwnICsgc3RhdGUudGFnICsgJz4gZXhwbGljaXQgdGFnJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGF0ZS5yZXN1bHQgPSB0eXBlLmNvbnN0cnVjdChzdGF0ZS5yZXN1bHQpO1xuICAgICAgICBpZiAoc3RhdGUuYW5jaG9yICE9PSBudWxsKSB7XG4gICAgICAgICAgc3RhdGUuYW5jaG9yTWFwW3N0YXRlLmFuY2hvcl0gPSBzdGF0ZS5yZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3Vua25vd24gdGFnICE8JyArIHN0YXRlLnRhZyArICc+Jyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHN0YXRlLmxpc3RlbmVyICE9PSBudWxsKSB7XG4gICAgc3RhdGUubGlzdGVuZXIoJ2Nsb3NlJywgc3RhdGUpO1xuICB9XG4gIHJldHVybiBzdGF0ZS50YWcgIT09IG51bGwgfHwgIHN0YXRlLmFuY2hvciAhPT0gbnVsbCB8fCBoYXNDb250ZW50O1xufVxuXG5mdW5jdGlvbiByZWFkRG9jdW1lbnQoc3RhdGUpIHtcbiAgdmFyIGRvY3VtZW50U3RhcnQgPSBzdGF0ZS5wb3NpdGlvbixcbiAgICAgIF9wb3NpdGlvbixcbiAgICAgIGRpcmVjdGl2ZU5hbWUsXG4gICAgICBkaXJlY3RpdmVBcmdzLFxuICAgICAgaGFzRGlyZWN0aXZlcyA9IGZhbHNlLFxuICAgICAgY2g7XG5cbiAgc3RhdGUudmVyc2lvbiA9IG51bGw7XG4gIHN0YXRlLmNoZWNrTGluZUJyZWFrcyA9IHN0YXRlLmxlZ2FjeTtcbiAgc3RhdGUudGFnTWFwID0ge307XG4gIHN0YXRlLmFuY2hvck1hcCA9IHt9O1xuXG4gIHdoaWxlICgoY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKSkgIT09IDApIHtcbiAgICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCAtMSk7XG5cbiAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gICAgaWYgKHN0YXRlLmxpbmVJbmRlbnQgPiAwIHx8IGNoICE9PSAweDI1LyogJSAqLykge1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaGFzRGlyZWN0aXZlcyA9IHRydWU7XG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgIF9wb3NpdGlvbiA9IHN0YXRlLnBvc2l0aW9uO1xuXG4gICAgd2hpbGUgKGNoICE9PSAwICYmICFpc19XU19PUl9FT0woY2gpKSB7XG4gICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gICAgfVxuXG4gICAgZGlyZWN0aXZlTmFtZSA9IHN0YXRlLmlucHV0LnNsaWNlKF9wb3NpdGlvbiwgc3RhdGUucG9zaXRpb24pO1xuICAgIGRpcmVjdGl2ZUFyZ3MgPSBbXTtcblxuICAgIGlmIChkaXJlY3RpdmVOYW1lLmxlbmd0aCA8IDEpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdkaXJlY3RpdmUgbmFtZSBtdXN0IG5vdCBiZSBsZXNzIHRoYW4gb25lIGNoYXJhY3RlciBpbiBsZW5ndGgnKTtcbiAgICB9XG5cbiAgICB3aGlsZSAoY2ggIT09IDApIHtcbiAgICAgIHdoaWxlIChpc19XSElURV9TUEFDRShjaCkpIHtcbiAgICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2ggPT09IDB4MjMvKiAjICovKSB7XG4gICAgICAgIGRvIHsgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pOyB9XG4gICAgICAgIHdoaWxlIChjaCAhPT0gMCAmJiAhaXNfRU9MKGNoKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNfRU9MKGNoKSkgYnJlYWs7XG5cbiAgICAgIF9wb3NpdGlvbiA9IHN0YXRlLnBvc2l0aW9uO1xuXG4gICAgICB3aGlsZSAoY2ggIT09IDAgJiYgIWlzX1dTX09SX0VPTChjaCkpIHtcbiAgICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgICAgfVxuXG4gICAgICBkaXJlY3RpdmVBcmdzLnB1c2goc3RhdGUuaW5wdXQuc2xpY2UoX3Bvc2l0aW9uLCBzdGF0ZS5wb3NpdGlvbikpO1xuICAgIH1cblxuICAgIGlmIChjaCAhPT0gMCkgcmVhZExpbmVCcmVhayhzdGF0ZSk7XG5cbiAgICBpZiAoX2hhc093blByb3BlcnR5LmNhbGwoZGlyZWN0aXZlSGFuZGxlcnMsIGRpcmVjdGl2ZU5hbWUpKSB7XG4gICAgICBkaXJlY3RpdmVIYW5kbGVyc1tkaXJlY3RpdmVOYW1lXShzdGF0ZSwgZGlyZWN0aXZlTmFtZSwgZGlyZWN0aXZlQXJncyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93V2FybmluZyhzdGF0ZSwgJ3Vua25vd24gZG9jdW1lbnQgZGlyZWN0aXZlIFwiJyArIGRpcmVjdGl2ZU5hbWUgKyAnXCInKTtcbiAgICB9XG4gIH1cblxuICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCAtMSk7XG5cbiAgaWYgKHN0YXRlLmxpbmVJbmRlbnQgPT09IDAgJiZcbiAgICAgIHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pICAgICA9PT0gMHgyRC8qIC0gKi8gJiZcbiAgICAgIHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24gKyAxKSA9PT0gMHgyRC8qIC0gKi8gJiZcbiAgICAgIHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24gKyAyKSA9PT0gMHgyRC8qIC0gKi8pIHtcbiAgICBzdGF0ZS5wb3NpdGlvbiArPSAzO1xuICAgIHNraXBTZXBhcmF0aW9uU3BhY2Uoc3RhdGUsIHRydWUsIC0xKTtcblxuICB9IGVsc2UgaWYgKGhhc0RpcmVjdGl2ZXMpIHtcbiAgICB0aHJvd0Vycm9yKHN0YXRlLCAnZGlyZWN0aXZlcyBlbmQgbWFyayBpcyBleHBlY3RlZCcpO1xuICB9XG5cbiAgY29tcG9zZU5vZGUoc3RhdGUsIHN0YXRlLmxpbmVJbmRlbnQgLSAxLCBDT05URVhUX0JMT0NLX09VVCwgZmFsc2UsIHRydWUpO1xuICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCAtMSk7XG5cbiAgaWYgKHN0YXRlLmNoZWNrTGluZUJyZWFrcyAmJlxuICAgICAgUEFUVEVSTl9OT05fQVNDSUlfTElORV9CUkVBS1MudGVzdChzdGF0ZS5pbnB1dC5zbGljZShkb2N1bWVudFN0YXJ0LCBzdGF0ZS5wb3NpdGlvbikpKSB7XG4gICAgdGhyb3dXYXJuaW5nKHN0YXRlLCAnbm9uLUFTQ0lJIGxpbmUgYnJlYWtzIGFyZSBpbnRlcnByZXRlZCBhcyBjb250ZW50Jyk7XG4gIH1cblxuICBzdGF0ZS5kb2N1bWVudHMucHVzaChzdGF0ZS5yZXN1bHQpO1xuXG4gIGlmIChzdGF0ZS5wb3NpdGlvbiA9PT0gc3RhdGUubGluZVN0YXJ0ICYmIHRlc3REb2N1bWVudFNlcGFyYXRvcihzdGF0ZSkpIHtcblxuICAgIGlmIChzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKSA9PT0gMHgyRS8qIC4gKi8pIHtcbiAgICAgIHN0YXRlLnBvc2l0aW9uICs9IDM7XG4gICAgICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCAtMSk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChzdGF0ZS5wb3NpdGlvbiA8IChzdGF0ZS5sZW5ndGggLSAxKSkge1xuICAgIHRocm93RXJyb3Ioc3RhdGUsICdlbmQgb2YgdGhlIHN0cmVhbSBvciBhIGRvY3VtZW50IHNlcGFyYXRvciBpcyBleHBlY3RlZCcpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybjtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGxvYWREb2N1bWVudHMoaW5wdXQsIG9wdGlvbnMpIHtcbiAgaW5wdXQgPSBTdHJpbmcoaW5wdXQpO1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICBpZiAoaW5wdXQubGVuZ3RoICE9PSAwKSB7XG5cbiAgICAvLyBBZGQgdGFpbGluZyBgXFxuYCBpZiBub3QgZXhpc3RzXG4gICAgaWYgKGlucHV0LmNoYXJDb2RlQXQoaW5wdXQubGVuZ3RoIC0gMSkgIT09IDB4MEEvKiBMRiAqLyAmJlxuICAgICAgICBpbnB1dC5jaGFyQ29kZUF0KGlucHV0Lmxlbmd0aCAtIDEpICE9PSAweDBELyogQ1IgKi8pIHtcbiAgICAgIGlucHV0ICs9ICdcXG4nO1xuICAgIH1cblxuICAgIC8vIFN0cmlwIEJPTVxuICAgIGlmIChpbnB1dC5jaGFyQ29kZUF0KDApID09PSAweEZFRkYpIHtcbiAgICAgIGlucHV0ID0gaW5wdXQuc2xpY2UoMSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIHN0YXRlID0gbmV3IFN0YXRlKGlucHV0LCBvcHRpb25zKTtcblxuICB2YXIgbnVsbHBvcyA9IGlucHV0LmluZGV4T2YoJ1xcMCcpO1xuXG4gIGlmIChudWxscG9zICE9PSAtMSkge1xuICAgIHN0YXRlLnBvc2l0aW9uID0gbnVsbHBvcztcbiAgICB0aHJvd0Vycm9yKHN0YXRlLCAnbnVsbCBieXRlIGlzIG5vdCBhbGxvd2VkIGluIGlucHV0Jyk7XG4gIH1cblxuICAvLyBVc2UgMCBhcyBzdHJpbmcgdGVybWluYXRvci4gVGhhdCBzaWduaWZpY2FudGx5IHNpbXBsaWZpZXMgYm91bmRzIGNoZWNrLlxuICBzdGF0ZS5pbnB1dCArPSAnXFwwJztcblxuICB3aGlsZSAoc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbikgPT09IDB4MjAvKiBTcGFjZSAqLykge1xuICAgIHN0YXRlLmxpbmVJbmRlbnQgKz0gMTtcbiAgICBzdGF0ZS5wb3NpdGlvbiArPSAxO1xuICB9XG5cbiAgd2hpbGUgKHN0YXRlLnBvc2l0aW9uIDwgKHN0YXRlLmxlbmd0aCAtIDEpKSB7XG4gICAgcmVhZERvY3VtZW50KHN0YXRlKTtcbiAgfVxuXG4gIHJldHVybiBzdGF0ZS5kb2N1bWVudHM7XG59XG5cblxuZnVuY3Rpb24gbG9hZEFsbChpbnB1dCwgaXRlcmF0b3IsIG9wdGlvbnMpIHtcbiAgaWYgKGl0ZXJhdG9yICE9PSBudWxsICYmIHR5cGVvZiBpdGVyYXRvciA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG9wdGlvbnMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgb3B0aW9ucyA9IGl0ZXJhdG9yO1xuICAgIGl0ZXJhdG9yID0gbnVsbDtcbiAgfVxuXG4gIHZhciBkb2N1bWVudHMgPSBsb2FkRG9jdW1lbnRzKGlucHV0LCBvcHRpb25zKTtcblxuICBpZiAodHlwZW9mIGl0ZXJhdG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50cztcbiAgfVxuXG4gIGZvciAodmFyIGluZGV4ID0gMCwgbGVuZ3RoID0gZG9jdW1lbnRzLmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICBpdGVyYXRvcihkb2N1bWVudHNbaW5kZXhdKTtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGxvYWQoaW5wdXQsIG9wdGlvbnMpIHtcbiAgdmFyIGRvY3VtZW50cyA9IGxvYWREb2N1bWVudHMoaW5wdXQsIG9wdGlvbnMpO1xuXG4gIGlmIChkb2N1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgLyplc2xpbnQtZGlzYWJsZSBuby11bmRlZmluZWQqL1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH0gZWxzZSBpZiAoZG9jdW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBkb2N1bWVudHNbMF07XG4gIH1cbiAgdGhyb3cgbmV3IFlBTUxFeGNlcHRpb24oJ2V4cGVjdGVkIGEgc2luZ2xlIGRvY3VtZW50IGluIHRoZSBzdHJlYW0sIGJ1dCBmb3VuZCBtb3JlJyk7XG59XG5cblxuZnVuY3Rpb24gc2FmZUxvYWRBbGwoaW5wdXQsIGl0ZXJhdG9yLCBvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgaXRlcmF0b3IgPT09ICdvYmplY3QnICYmIGl0ZXJhdG9yICE9PSBudWxsICYmIHR5cGVvZiBvcHRpb25zID09PSAndW5kZWZpbmVkJykge1xuICAgIG9wdGlvbnMgPSBpdGVyYXRvcjtcbiAgICBpdGVyYXRvciA9IG51bGw7XG4gIH1cblxuICByZXR1cm4gbG9hZEFsbChpbnB1dCwgaXRlcmF0b3IsIGNvbW1vbi5leHRlbmQoeyBzY2hlbWE6IERFRkFVTFRfU0FGRV9TQ0hFTUEgfSwgb3B0aW9ucykpO1xufVxuXG5cbmZ1bmN0aW9uIHNhZmVMb2FkKGlucHV0LCBvcHRpb25zKSB7XG4gIHJldHVybiBsb2FkKGlucHV0LCBjb21tb24uZXh0ZW5kKHsgc2NoZW1hOiBERUZBVUxUX1NBRkVfU0NIRU1BIH0sIG9wdGlvbnMpKTtcbn1cblxuXG5tb2R1bGUuZXhwb3J0cy5sb2FkQWxsICAgICA9IGxvYWRBbGw7XG5tb2R1bGUuZXhwb3J0cy5sb2FkICAgICAgICA9IGxvYWQ7XG5tb2R1bGUuZXhwb3J0cy5zYWZlTG9hZEFsbCA9IHNhZmVMb2FkQWxsO1xubW9kdWxlLmV4cG9ydHMuc2FmZUxvYWQgICAgPSBzYWZlTG9hZDtcbiIsICIndXNlIHN0cmljdCc7XG5cbi8qZXNsaW50LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUqL1xuXG52YXIgY29tbW9uICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG52YXIgWUFNTEV4Y2VwdGlvbiAgICAgICA9IHJlcXVpcmUoJy4vZXhjZXB0aW9uJyk7XG52YXIgREVGQVVMVF9GVUxMX1NDSEVNQSA9IHJlcXVpcmUoJy4vc2NoZW1hL2RlZmF1bHRfZnVsbCcpO1xudmFyIERFRkFVTFRfU0FGRV9TQ0hFTUEgPSByZXF1aXJlKCcuL3NjaGVtYS9kZWZhdWx0X3NhZmUnKTtcblxudmFyIF90b1N0cmluZyAgICAgICA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgX2hhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxudmFyIENIQVJfVEFCICAgICAgICAgICAgICAgICAgPSAweDA5OyAvKiBUYWIgKi9cbnZhciBDSEFSX0xJTkVfRkVFRCAgICAgICAgICAgID0gMHgwQTsgLyogTEYgKi9cbnZhciBDSEFSX0NBUlJJQUdFX1JFVFVSTiAgICAgID0gMHgwRDsgLyogQ1IgKi9cbnZhciBDSEFSX1NQQUNFICAgICAgICAgICAgICAgID0gMHgyMDsgLyogU3BhY2UgKi9cbnZhciBDSEFSX0VYQ0xBTUFUSU9OICAgICAgICAgID0gMHgyMTsgLyogISAqL1xudmFyIENIQVJfRE9VQkxFX1FVT1RFICAgICAgICAgPSAweDIyOyAvKiBcIiAqL1xudmFyIENIQVJfU0hBUlAgICAgICAgICAgICAgICAgPSAweDIzOyAvKiAjICovXG52YXIgQ0hBUl9QRVJDRU5UICAgICAgICAgICAgICA9IDB4MjU7IC8qICUgKi9cbnZhciBDSEFSX0FNUEVSU0FORCAgICAgICAgICAgID0gMHgyNjsgLyogJiAqL1xudmFyIENIQVJfU0lOR0xFX1FVT1RFICAgICAgICAgPSAweDI3OyAvKiAnICovXG52YXIgQ0hBUl9BU1RFUklTSyAgICAgICAgICAgICA9IDB4MkE7IC8qICogKi9cbnZhciBDSEFSX0NPTU1BICAgICAgICAgICAgICAgID0gMHgyQzsgLyogLCAqL1xudmFyIENIQVJfTUlOVVMgICAgICAgICAgICAgICAgPSAweDJEOyAvKiAtICovXG52YXIgQ0hBUl9DT0xPTiAgICAgICAgICAgICAgICA9IDB4M0E7IC8qIDogKi9cbnZhciBDSEFSX0VRVUFMUyAgICAgICAgICAgICAgID0gMHgzRDsgLyogPSAqL1xudmFyIENIQVJfR1JFQVRFUl9USEFOICAgICAgICAgPSAweDNFOyAvKiA+ICovXG52YXIgQ0hBUl9RVUVTVElPTiAgICAgICAgICAgICA9IDB4M0Y7IC8qID8gKi9cbnZhciBDSEFSX0NPTU1FUkNJQUxfQVQgICAgICAgID0gMHg0MDsgLyogQCAqL1xudmFyIENIQVJfTEVGVF9TUVVBUkVfQlJBQ0tFVCAgPSAweDVCOyAvKiBbICovXG52YXIgQ0hBUl9SSUdIVF9TUVVBUkVfQlJBQ0tFVCA9IDB4NUQ7IC8qIF0gKi9cbnZhciBDSEFSX0dSQVZFX0FDQ0VOVCAgICAgICAgID0gMHg2MDsgLyogYCAqL1xudmFyIENIQVJfTEVGVF9DVVJMWV9CUkFDS0VUICAgPSAweDdCOyAvKiB7ICovXG52YXIgQ0hBUl9WRVJUSUNBTF9MSU5FICAgICAgICA9IDB4N0M7IC8qIHwgKi9cbnZhciBDSEFSX1JJR0hUX0NVUkxZX0JSQUNLRVQgID0gMHg3RDsgLyogfSAqL1xuXG52YXIgRVNDQVBFX1NFUVVFTkNFUyA9IHt9O1xuXG5FU0NBUEVfU0VRVUVOQ0VTWzB4MDBdICAgPSAnXFxcXDAnO1xuRVNDQVBFX1NFUVVFTkNFU1sweDA3XSAgID0gJ1xcXFxhJztcbkVTQ0FQRV9TRVFVRU5DRVNbMHgwOF0gICA9ICdcXFxcYic7XG5FU0NBUEVfU0VRVUVOQ0VTWzB4MDldICAgPSAnXFxcXHQnO1xuRVNDQVBFX1NFUVVFTkNFU1sweDBBXSAgID0gJ1xcXFxuJztcbkVTQ0FQRV9TRVFVRU5DRVNbMHgwQl0gICA9ICdcXFxcdic7XG5FU0NBUEVfU0VRVUVOQ0VTWzB4MENdICAgPSAnXFxcXGYnO1xuRVNDQVBFX1NFUVVFTkNFU1sweDBEXSAgID0gJ1xcXFxyJztcbkVTQ0FQRV9TRVFVRU5DRVNbMHgxQl0gICA9ICdcXFxcZSc7XG5FU0NBUEVfU0VRVUVOQ0VTWzB4MjJdICAgPSAnXFxcXFwiJztcbkVTQ0FQRV9TRVFVRU5DRVNbMHg1Q10gICA9ICdcXFxcXFxcXCc7XG5FU0NBUEVfU0VRVUVOQ0VTWzB4ODVdICAgPSAnXFxcXE4nO1xuRVNDQVBFX1NFUVVFTkNFU1sweEEwXSAgID0gJ1xcXFxfJztcbkVTQ0FQRV9TRVFVRU5DRVNbMHgyMDI4XSA9ICdcXFxcTCc7XG5FU0NBUEVfU0VRVUVOQ0VTWzB4MjAyOV0gPSAnXFxcXFAnO1xuXG52YXIgREVQUkVDQVRFRF9CT09MRUFOU19TWU5UQVggPSBbXG4gICd5JywgJ1knLCAneWVzJywgJ1llcycsICdZRVMnLCAnb24nLCAnT24nLCAnT04nLFxuICAnbicsICdOJywgJ25vJywgJ05vJywgJ05PJywgJ29mZicsICdPZmYnLCAnT0ZGJ1xuXTtcblxuZnVuY3Rpb24gY29tcGlsZVN0eWxlTWFwKHNjaGVtYSwgbWFwKSB7XG4gIHZhciByZXN1bHQsIGtleXMsIGluZGV4LCBsZW5ndGgsIHRhZywgc3R5bGUsIHR5cGU7XG5cbiAgaWYgKG1hcCA9PT0gbnVsbCkgcmV0dXJuIHt9O1xuXG4gIHJlc3VsdCA9IHt9O1xuICBrZXlzID0gT2JqZWN0LmtleXMobWFwKTtcblxuICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgdGFnID0ga2V5c1tpbmRleF07XG4gICAgc3R5bGUgPSBTdHJpbmcobWFwW3RhZ10pO1xuXG4gICAgaWYgKHRhZy5zbGljZSgwLCAyKSA9PT0gJyEhJykge1xuICAgICAgdGFnID0gJ3RhZzp5YW1sLm9yZywyMDAyOicgKyB0YWcuc2xpY2UoMik7XG4gICAgfVxuICAgIHR5cGUgPSBzY2hlbWEuY29tcGlsZWRUeXBlTWFwWydmYWxsYmFjayddW3RhZ107XG5cbiAgICBpZiAodHlwZSAmJiBfaGFzT3duUHJvcGVydHkuY2FsbCh0eXBlLnN0eWxlQWxpYXNlcywgc3R5bGUpKSB7XG4gICAgICBzdHlsZSA9IHR5cGUuc3R5bGVBbGlhc2VzW3N0eWxlXTtcbiAgICB9XG5cbiAgICByZXN1bHRbdGFnXSA9IHN0eWxlO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gZW5jb2RlSGV4KGNoYXJhY3Rlcikge1xuICB2YXIgc3RyaW5nLCBoYW5kbGUsIGxlbmd0aDtcblxuICBzdHJpbmcgPSBjaGFyYWN0ZXIudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XG5cbiAgaWYgKGNoYXJhY3RlciA8PSAweEZGKSB7XG4gICAgaGFuZGxlID0gJ3gnO1xuICAgIGxlbmd0aCA9IDI7XG4gIH0gZWxzZSBpZiAoY2hhcmFjdGVyIDw9IDB4RkZGRikge1xuICAgIGhhbmRsZSA9ICd1JztcbiAgICBsZW5ndGggPSA0O1xuICB9IGVsc2UgaWYgKGNoYXJhY3RlciA8PSAweEZGRkZGRkZGKSB7XG4gICAgaGFuZGxlID0gJ1UnO1xuICAgIGxlbmd0aCA9IDg7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFlBTUxFeGNlcHRpb24oJ2NvZGUgcG9pbnQgd2l0aGluIGEgc3RyaW5nIG1heSBub3QgYmUgZ3JlYXRlciB0aGFuIDB4RkZGRkZGRkYnKTtcbiAgfVxuXG4gIHJldHVybiAnXFxcXCcgKyBoYW5kbGUgKyBjb21tb24ucmVwZWF0KCcwJywgbGVuZ3RoIC0gc3RyaW5nLmxlbmd0aCkgKyBzdHJpbmc7XG59XG5cbmZ1bmN0aW9uIFN0YXRlKG9wdGlvbnMpIHtcbiAgdGhpcy5zY2hlbWEgICAgICAgID0gb3B0aW9uc1snc2NoZW1hJ10gfHwgREVGQVVMVF9GVUxMX1NDSEVNQTtcbiAgdGhpcy5pbmRlbnQgICAgICAgID0gTWF0aC5tYXgoMSwgKG9wdGlvbnNbJ2luZGVudCddIHx8IDIpKTtcbiAgdGhpcy5ub0FycmF5SW5kZW50ID0gb3B0aW9uc1snbm9BcnJheUluZGVudCddIHx8IGZhbHNlO1xuICB0aGlzLnNraXBJbnZhbGlkICAgPSBvcHRpb25zWydza2lwSW52YWxpZCddIHx8IGZhbHNlO1xuICB0aGlzLmZsb3dMZXZlbCAgICAgPSAoY29tbW9uLmlzTm90aGluZyhvcHRpb25zWydmbG93TGV2ZWwnXSkgPyAtMSA6IG9wdGlvbnNbJ2Zsb3dMZXZlbCddKTtcbiAgdGhpcy5zdHlsZU1hcCAgICAgID0gY29tcGlsZVN0eWxlTWFwKHRoaXMuc2NoZW1hLCBvcHRpb25zWydzdHlsZXMnXSB8fCBudWxsKTtcbiAgdGhpcy5zb3J0S2V5cyAgICAgID0gb3B0aW9uc1snc29ydEtleXMnXSB8fCBmYWxzZTtcbiAgdGhpcy5saW5lV2lkdGggICAgID0gb3B0aW9uc1snbGluZVdpZHRoJ10gfHwgODA7XG4gIHRoaXMubm9SZWZzICAgICAgICA9IG9wdGlvbnNbJ25vUmVmcyddIHx8IGZhbHNlO1xuICB0aGlzLm5vQ29tcGF0TW9kZSAgPSBvcHRpb25zWydub0NvbXBhdE1vZGUnXSB8fCBmYWxzZTtcbiAgdGhpcy5jb25kZW5zZUZsb3cgID0gb3B0aW9uc1snY29uZGVuc2VGbG93J10gfHwgZmFsc2U7XG5cbiAgdGhpcy5pbXBsaWNpdFR5cGVzID0gdGhpcy5zY2hlbWEuY29tcGlsZWRJbXBsaWNpdDtcbiAgdGhpcy5leHBsaWNpdFR5cGVzID0gdGhpcy5zY2hlbWEuY29tcGlsZWRFeHBsaWNpdDtcblxuICB0aGlzLnRhZyA9IG51bGw7XG4gIHRoaXMucmVzdWx0ID0gJyc7XG5cbiAgdGhpcy5kdXBsaWNhdGVzID0gW107XG4gIHRoaXMudXNlZER1cGxpY2F0ZXMgPSBudWxsO1xufVxuXG4vLyBJbmRlbnRzIGV2ZXJ5IGxpbmUgaW4gYSBzdHJpbmcuIEVtcHR5IGxpbmVzIChcXG4gb25seSkgYXJlIG5vdCBpbmRlbnRlZC5cbmZ1bmN0aW9uIGluZGVudFN0cmluZyhzdHJpbmcsIHNwYWNlcykge1xuICB2YXIgaW5kID0gY29tbW9uLnJlcGVhdCgnICcsIHNwYWNlcyksXG4gICAgICBwb3NpdGlvbiA9IDAsXG4gICAgICBuZXh0ID0gLTEsXG4gICAgICByZXN1bHQgPSAnJyxcbiAgICAgIGxpbmUsXG4gICAgICBsZW5ndGggPSBzdHJpbmcubGVuZ3RoO1xuXG4gIHdoaWxlIChwb3NpdGlvbiA8IGxlbmd0aCkge1xuICAgIG5leHQgPSBzdHJpbmcuaW5kZXhPZignXFxuJywgcG9zaXRpb24pO1xuICAgIGlmIChuZXh0ID09PSAtMSkge1xuICAgICAgbGluZSA9IHN0cmluZy5zbGljZShwb3NpdGlvbik7XG4gICAgICBwb3NpdGlvbiA9IGxlbmd0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgbGluZSA9IHN0cmluZy5zbGljZShwb3NpdGlvbiwgbmV4dCArIDEpO1xuICAgICAgcG9zaXRpb24gPSBuZXh0ICsgMTtcbiAgICB9XG5cbiAgICBpZiAobGluZS5sZW5ndGggJiYgbGluZSAhPT0gJ1xcbicpIHJlc3VsdCArPSBpbmQ7XG5cbiAgICByZXN1bHQgKz0gbGluZTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmV4dExpbmUoc3RhdGUsIGxldmVsKSB7XG4gIHJldHVybiAnXFxuJyArIGNvbW1vbi5yZXBlYXQoJyAnLCBzdGF0ZS5pbmRlbnQgKiBsZXZlbCk7XG59XG5cbmZ1bmN0aW9uIHRlc3RJbXBsaWNpdFJlc29sdmluZyhzdGF0ZSwgc3RyKSB7XG4gIHZhciBpbmRleCwgbGVuZ3RoLCB0eXBlO1xuXG4gIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSBzdGF0ZS5pbXBsaWNpdFR5cGVzLmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICB0eXBlID0gc3RhdGUuaW1wbGljaXRUeXBlc1tpbmRleF07XG5cbiAgICBpZiAodHlwZS5yZXNvbHZlKHN0cikpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuLy8gWzMzXSBzLXdoaXRlIDo6PSBzLXNwYWNlIHwgcy10YWJcbmZ1bmN0aW9uIGlzV2hpdGVzcGFjZShjKSB7XG4gIHJldHVybiBjID09PSBDSEFSX1NQQUNFIHx8IGMgPT09IENIQVJfVEFCO1xufVxuXG4vLyBSZXR1cm5zIHRydWUgaWYgdGhlIGNoYXJhY3RlciBjYW4gYmUgcHJpbnRlZCB3aXRob3V0IGVzY2FwaW5nLlxuLy8gRnJvbSBZQU1MIDEuMjogXCJhbnkgYWxsb3dlZCBjaGFyYWN0ZXJzIGtub3duIHRvIGJlIG5vbi1wcmludGFibGVcbi8vIHNob3VsZCBhbHNvIGJlIGVzY2FwZWQuIFtIb3dldmVyLF0gVGhpcyBpc25cdTIwMTl0IG1hbmRhdG9yeVwiXG4vLyBEZXJpdmVkIGZyb20gbmItY2hhciAtIFxcdCAtICN4ODUgLSAjeEEwIC0gI3gyMDI4IC0gI3gyMDI5LlxuZnVuY3Rpb24gaXNQcmludGFibGUoYykge1xuICByZXR1cm4gICgweDAwMDIwIDw9IGMgJiYgYyA8PSAweDAwMDA3RSlcbiAgICAgIHx8ICgoMHgwMDBBMSA8PSBjICYmIGMgPD0gMHgwMEQ3RkYpICYmIGMgIT09IDB4MjAyOCAmJiBjICE9PSAweDIwMjkpXG4gICAgICB8fCAoKDB4MEUwMDAgPD0gYyAmJiBjIDw9IDB4MDBGRkZEKSAmJiBjICE9PSAweEZFRkYgLyogQk9NICovKVxuICAgICAgfHwgICgweDEwMDAwIDw9IGMgJiYgYyA8PSAweDEwRkZGRik7XG59XG5cbi8vIFszNF0gbnMtY2hhciA6Oj0gbmItY2hhciAtIHMtd2hpdGVcbi8vIFsyN10gbmItY2hhciA6Oj0gYy1wcmludGFibGUgLSBiLWNoYXIgLSBjLWJ5dGUtb3JkZXItbWFya1xuLy8gWzI2XSBiLWNoYXIgIDo6PSBiLWxpbmUtZmVlZCB8IGItY2FycmlhZ2UtcmV0dXJuXG4vLyBbMjRdIGItbGluZS1mZWVkICAgICAgIDo6PSAgICAgI3hBICAgIC8qIExGICovXG4vLyBbMjVdIGItY2FycmlhZ2UtcmV0dXJuIDo6PSAgICAgI3hEICAgIC8qIENSICovXG4vLyBbM10gIGMtYnl0ZS1vcmRlci1tYXJrIDo6PSAgICAgI3hGRUZGXG5mdW5jdGlvbiBpc05zQ2hhcihjKSB7XG4gIHJldHVybiBpc1ByaW50YWJsZShjKSAmJiAhaXNXaGl0ZXNwYWNlKGMpXG4gICAgLy8gYnl0ZS1vcmRlci1tYXJrXG4gICAgJiYgYyAhPT0gMHhGRUZGXG4gICAgLy8gYi1jaGFyXG4gICAgJiYgYyAhPT0gQ0hBUl9DQVJSSUFHRV9SRVRVUk5cbiAgICAmJiBjICE9PSBDSEFSX0xJTkVfRkVFRDtcbn1cblxuLy8gU2ltcGxpZmllZCB0ZXN0IGZvciB2YWx1ZXMgYWxsb3dlZCBhZnRlciB0aGUgZmlyc3QgY2hhcmFjdGVyIGluIHBsYWluIHN0eWxlLlxuZnVuY3Rpb24gaXNQbGFpblNhZmUoYywgcHJldikge1xuICAvLyBVc2VzIGEgc3Vic2V0IG9mIG5iLWNoYXIgLSBjLWZsb3ctaW5kaWNhdG9yIC0gXCI6XCIgLSBcIiNcIlxuICAvLyB3aGVyZSBuYi1jaGFyIDo6PSBjLXByaW50YWJsZSAtIGItY2hhciAtIGMtYnl0ZS1vcmRlci1tYXJrLlxuICByZXR1cm4gaXNQcmludGFibGUoYykgJiYgYyAhPT0gMHhGRUZGXG4gICAgLy8gLSBjLWZsb3ctaW5kaWNhdG9yXG4gICAgJiYgYyAhPT0gQ0hBUl9DT01NQVxuICAgICYmIGMgIT09IENIQVJfTEVGVF9TUVVBUkVfQlJBQ0tFVFxuICAgICYmIGMgIT09IENIQVJfUklHSFRfU1FVQVJFX0JSQUNLRVRcbiAgICAmJiBjICE9PSBDSEFSX0xFRlRfQ1VSTFlfQlJBQ0tFVFxuICAgICYmIGMgIT09IENIQVJfUklHSFRfQ1VSTFlfQlJBQ0tFVFxuICAgIC8vIC0gXCI6XCIgLSBcIiNcIlxuICAgIC8vIC8qIEFuIG5zLWNoYXIgcHJlY2VkaW5nICovIFwiI1wiXG4gICAgJiYgYyAhPT0gQ0hBUl9DT0xPTlxuICAgICYmICgoYyAhPT0gQ0hBUl9TSEFSUCkgfHwgKHByZXYgJiYgaXNOc0NoYXIocHJldikpKTtcbn1cblxuLy8gU2ltcGxpZmllZCB0ZXN0IGZvciB2YWx1ZXMgYWxsb3dlZCBhcyB0aGUgZmlyc3QgY2hhcmFjdGVyIGluIHBsYWluIHN0eWxlLlxuZnVuY3Rpb24gaXNQbGFpblNhZmVGaXJzdChjKSB7XG4gIC8vIFVzZXMgYSBzdWJzZXQgb2YgbnMtY2hhciAtIGMtaW5kaWNhdG9yXG4gIC8vIHdoZXJlIG5zLWNoYXIgPSBuYi1jaGFyIC0gcy13aGl0ZS5cbiAgcmV0dXJuIGlzUHJpbnRhYmxlKGMpICYmIGMgIT09IDB4RkVGRlxuICAgICYmICFpc1doaXRlc3BhY2UoYykgLy8gLSBzLXdoaXRlXG4gICAgLy8gLSAoYy1pbmRpY2F0b3IgOjo9XG4gICAgLy8gXHUyMDFDLVx1MjAxRCB8IFx1MjAxQz9cdTIwMUQgfCBcdTIwMUM6XHUyMDFEIHwgXHUyMDFDLFx1MjAxRCB8IFx1MjAxQ1tcdTIwMUQgfCBcdTIwMUNdXHUyMDFEIHwgXHUyMDFDe1x1MjAxRCB8IFx1MjAxQ31cdTIwMURcbiAgICAmJiBjICE9PSBDSEFSX01JTlVTXG4gICAgJiYgYyAhPT0gQ0hBUl9RVUVTVElPTlxuICAgICYmIGMgIT09IENIQVJfQ09MT05cbiAgICAmJiBjICE9PSBDSEFSX0NPTU1BXG4gICAgJiYgYyAhPT0gQ0hBUl9MRUZUX1NRVUFSRV9CUkFDS0VUXG4gICAgJiYgYyAhPT0gQ0hBUl9SSUdIVF9TUVVBUkVfQlJBQ0tFVFxuICAgICYmIGMgIT09IENIQVJfTEVGVF9DVVJMWV9CUkFDS0VUXG4gICAgJiYgYyAhPT0gQ0hBUl9SSUdIVF9DVVJMWV9CUkFDS0VUXG4gICAgLy8gfCBcdTIwMUMjXHUyMDFEIHwgXHUyMDFDJlx1MjAxRCB8IFx1MjAxQypcdTIwMUQgfCBcdTIwMUMhXHUyMDFEIHwgXHUyMDFDfFx1MjAxRCB8IFx1MjAxQz1cdTIwMUQgfCBcdTIwMUM+XHUyMDFEIHwgXHUyMDFDJ1x1MjAxRCB8IFx1MjAxQ1wiXHUyMDFEXG4gICAgJiYgYyAhPT0gQ0hBUl9TSEFSUFxuICAgICYmIGMgIT09IENIQVJfQU1QRVJTQU5EXG4gICAgJiYgYyAhPT0gQ0hBUl9BU1RFUklTS1xuICAgICYmIGMgIT09IENIQVJfRVhDTEFNQVRJT05cbiAgICAmJiBjICE9PSBDSEFSX1ZFUlRJQ0FMX0xJTkVcbiAgICAmJiBjICE9PSBDSEFSX0VRVUFMU1xuICAgICYmIGMgIT09IENIQVJfR1JFQVRFUl9USEFOXG4gICAgJiYgYyAhPT0gQ0hBUl9TSU5HTEVfUVVPVEVcbiAgICAmJiBjICE9PSBDSEFSX0RPVUJMRV9RVU9URVxuICAgIC8vIHwgXHUyMDFDJVx1MjAxRCB8IFx1MjAxQ0BcdTIwMUQgfCBcdTIwMUNgXHUyMDFEKVxuICAgICYmIGMgIT09IENIQVJfUEVSQ0VOVFxuICAgICYmIGMgIT09IENIQVJfQ09NTUVSQ0lBTF9BVFxuICAgICYmIGMgIT09IENIQVJfR1JBVkVfQUNDRU5UO1xufVxuXG4vLyBEZXRlcm1pbmVzIHdoZXRoZXIgYmxvY2sgaW5kZW50YXRpb24gaW5kaWNhdG9yIGlzIHJlcXVpcmVkLlxuZnVuY3Rpb24gbmVlZEluZGVudEluZGljYXRvcihzdHJpbmcpIHtcbiAgdmFyIGxlYWRpbmdTcGFjZVJlID0gL15cXG4qIC87XG4gIHJldHVybiBsZWFkaW5nU3BhY2VSZS50ZXN0KHN0cmluZyk7XG59XG5cbnZhciBTVFlMRV9QTEFJTiAgID0gMSxcbiAgICBTVFlMRV9TSU5HTEUgID0gMixcbiAgICBTVFlMRV9MSVRFUkFMID0gMyxcbiAgICBTVFlMRV9GT0xERUQgID0gNCxcbiAgICBTVFlMRV9ET1VCTEUgID0gNTtcblxuLy8gRGV0ZXJtaW5lcyB3aGljaCBzY2FsYXIgc3R5bGVzIGFyZSBwb3NzaWJsZSBhbmQgcmV0dXJucyB0aGUgcHJlZmVycmVkIHN0eWxlLlxuLy8gbGluZVdpZHRoID0gLTEgPT4gbm8gbGltaXQuXG4vLyBQcmUtY29uZGl0aW9uczogc3RyLmxlbmd0aCA+IDAuXG4vLyBQb3N0LWNvbmRpdGlvbnM6XG4vLyAgICBTVFlMRV9QTEFJTiBvciBTVFlMRV9TSU5HTEUgPT4gbm8gXFxuIGFyZSBpbiB0aGUgc3RyaW5nLlxuLy8gICAgU1RZTEVfTElURVJBTCA9PiBubyBsaW5lcyBhcmUgc3VpdGFibGUgZm9yIGZvbGRpbmcgKG9yIGxpbmVXaWR0aCBpcyAtMSkuXG4vLyAgICBTVFlMRV9GT0xERUQgPT4gYSBsaW5lID4gbGluZVdpZHRoIGFuZCBjYW4gYmUgZm9sZGVkIChhbmQgbGluZVdpZHRoICE9IC0xKS5cbmZ1bmN0aW9uIGNob29zZVNjYWxhclN0eWxlKHN0cmluZywgc2luZ2xlTGluZU9ubHksIGluZGVudFBlckxldmVsLCBsaW5lV2lkdGgsIHRlc3RBbWJpZ3VvdXNUeXBlKSB7XG4gIHZhciBpO1xuICB2YXIgY2hhciwgcHJldl9jaGFyO1xuICB2YXIgaGFzTGluZUJyZWFrID0gZmFsc2U7XG4gIHZhciBoYXNGb2xkYWJsZUxpbmUgPSBmYWxzZTsgLy8gb25seSBjaGVja2VkIGlmIHNob3VsZFRyYWNrV2lkdGhcbiAgdmFyIHNob3VsZFRyYWNrV2lkdGggPSBsaW5lV2lkdGggIT09IC0xO1xuICB2YXIgcHJldmlvdXNMaW5lQnJlYWsgPSAtMTsgLy8gY291bnQgdGhlIGZpcnN0IGxpbmUgY29ycmVjdGx5XG4gIHZhciBwbGFpbiA9IGlzUGxhaW5TYWZlRmlyc3Qoc3RyaW5nLmNoYXJDb2RlQXQoMCkpXG4gICAgICAgICAgJiYgIWlzV2hpdGVzcGFjZShzdHJpbmcuY2hhckNvZGVBdChzdHJpbmcubGVuZ3RoIC0gMSkpO1xuXG4gIGlmIChzaW5nbGVMaW5lT25seSkge1xuICAgIC8vIENhc2U6IG5vIGJsb2NrIHN0eWxlcy5cbiAgICAvLyBDaGVjayBmb3IgZGlzYWxsb3dlZCBjaGFyYWN0ZXJzIHRvIHJ1bGUgb3V0IHBsYWluIGFuZCBzaW5nbGUuXG4gICAgZm9yIChpID0gMDsgaSA8IHN0cmluZy5sZW5ndGg7IGkrKykge1xuICAgICAgY2hhciA9IHN0cmluZy5jaGFyQ29kZUF0KGkpO1xuICAgICAgaWYgKCFpc1ByaW50YWJsZShjaGFyKSkge1xuICAgICAgICByZXR1cm4gU1RZTEVfRE9VQkxFO1xuICAgICAgfVxuICAgICAgcHJldl9jaGFyID0gaSA+IDAgPyBzdHJpbmcuY2hhckNvZGVBdChpIC0gMSkgOiBudWxsO1xuICAgICAgcGxhaW4gPSBwbGFpbiAmJiBpc1BsYWluU2FmZShjaGFyLCBwcmV2X2NoYXIpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBDYXNlOiBibG9jayBzdHlsZXMgcGVybWl0dGVkLlxuICAgIGZvciAoaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoYXIgPSBzdHJpbmcuY2hhckNvZGVBdChpKTtcbiAgICAgIGlmIChjaGFyID09PSBDSEFSX0xJTkVfRkVFRCkge1xuICAgICAgICBoYXNMaW5lQnJlYWsgPSB0cnVlO1xuICAgICAgICAvLyBDaGVjayBpZiBhbnkgbGluZSBjYW4gYmUgZm9sZGVkLlxuICAgICAgICBpZiAoc2hvdWxkVHJhY2tXaWR0aCkge1xuICAgICAgICAgIGhhc0ZvbGRhYmxlTGluZSA9IGhhc0ZvbGRhYmxlTGluZSB8fFxuICAgICAgICAgICAgLy8gRm9sZGFibGUgbGluZSA9IHRvbyBsb25nLCBhbmQgbm90IG1vcmUtaW5kZW50ZWQuXG4gICAgICAgICAgICAoaSAtIHByZXZpb3VzTGluZUJyZWFrIC0gMSA+IGxpbmVXaWR0aCAmJlxuICAgICAgICAgICAgIHN0cmluZ1twcmV2aW91c0xpbmVCcmVhayArIDFdICE9PSAnICcpO1xuICAgICAgICAgIHByZXZpb3VzTGluZUJyZWFrID0gaTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICghaXNQcmludGFibGUoY2hhcikpIHtcbiAgICAgICAgcmV0dXJuIFNUWUxFX0RPVUJMRTtcbiAgICAgIH1cbiAgICAgIHByZXZfY2hhciA9IGkgPiAwID8gc3RyaW5nLmNoYXJDb2RlQXQoaSAtIDEpIDogbnVsbDtcbiAgICAgIHBsYWluID0gcGxhaW4gJiYgaXNQbGFpblNhZmUoY2hhciwgcHJldl9jaGFyKTtcbiAgICB9XG4gICAgLy8gaW4gY2FzZSB0aGUgZW5kIGlzIG1pc3NpbmcgYSBcXG5cbiAgICBoYXNGb2xkYWJsZUxpbmUgPSBoYXNGb2xkYWJsZUxpbmUgfHwgKHNob3VsZFRyYWNrV2lkdGggJiZcbiAgICAgIChpIC0gcHJldmlvdXNMaW5lQnJlYWsgLSAxID4gbGluZVdpZHRoICYmXG4gICAgICAgc3RyaW5nW3ByZXZpb3VzTGluZUJyZWFrICsgMV0gIT09ICcgJykpO1xuICB9XG4gIC8vIEFsdGhvdWdoIGV2ZXJ5IHN0eWxlIGNhbiByZXByZXNlbnQgXFxuIHdpdGhvdXQgZXNjYXBpbmcsIHByZWZlciBibG9jayBzdHlsZXNcbiAgLy8gZm9yIG11bHRpbGluZSwgc2luY2UgdGhleSdyZSBtb3JlIHJlYWRhYmxlIGFuZCB0aGV5IGRvbid0IGFkZCBlbXB0eSBsaW5lcy5cbiAgLy8gQWxzbyBwcmVmZXIgZm9sZGluZyBhIHN1cGVyLWxvbmcgbGluZS5cbiAgaWYgKCFoYXNMaW5lQnJlYWsgJiYgIWhhc0ZvbGRhYmxlTGluZSkge1xuICAgIC8vIFN0cmluZ3MgaW50ZXJwcmV0YWJsZSBhcyBhbm90aGVyIHR5cGUgaGF2ZSB0byBiZSBxdW90ZWQ7XG4gICAgLy8gZS5nLiB0aGUgc3RyaW5nICd0cnVlJyB2cy4gdGhlIGJvb2xlYW4gdHJ1ZS5cbiAgICByZXR1cm4gcGxhaW4gJiYgIXRlc3RBbWJpZ3VvdXNUeXBlKHN0cmluZylcbiAgICAgID8gU1RZTEVfUExBSU4gOiBTVFlMRV9TSU5HTEU7XG4gIH1cbiAgLy8gRWRnZSBjYXNlOiBibG9jayBpbmRlbnRhdGlvbiBpbmRpY2F0b3IgY2FuIG9ubHkgaGF2ZSBvbmUgZGlnaXQuXG4gIGlmIChpbmRlbnRQZXJMZXZlbCA+IDkgJiYgbmVlZEluZGVudEluZGljYXRvcihzdHJpbmcpKSB7XG4gICAgcmV0dXJuIFNUWUxFX0RPVUJMRTtcbiAgfVxuICAvLyBBdCB0aGlzIHBvaW50IHdlIGtub3cgYmxvY2sgc3R5bGVzIGFyZSB2YWxpZC5cbiAgLy8gUHJlZmVyIGxpdGVyYWwgc3R5bGUgdW5sZXNzIHdlIHdhbnQgdG8gZm9sZC5cbiAgcmV0dXJuIGhhc0ZvbGRhYmxlTGluZSA/IFNUWUxFX0ZPTERFRCA6IFNUWUxFX0xJVEVSQUw7XG59XG5cbi8vIE5vdGU6IGxpbmUgYnJlYWtpbmcvZm9sZGluZyBpcyBpbXBsZW1lbnRlZCBmb3Igb25seSB0aGUgZm9sZGVkIHN0eWxlLlxuLy8gTkIuIFdlIGRyb3AgdGhlIGxhc3QgdHJhaWxpbmcgbmV3bGluZSAoaWYgYW55KSBvZiBhIHJldHVybmVkIGJsb2NrIHNjYWxhclxuLy8gIHNpbmNlIHRoZSBkdW1wZXIgYWRkcyBpdHMgb3duIG5ld2xpbmUuIFRoaXMgYWx3YXlzIHdvcmtzOlxuLy8gICAgXHUyMDIyIE5vIGVuZGluZyBuZXdsaW5lID0+IHVuYWZmZWN0ZWQ7IGFscmVhZHkgdXNpbmcgc3RyaXAgXCItXCIgY2hvbXBpbmcuXG4vLyAgICBcdTIwMjIgRW5kaW5nIG5ld2xpbmUgICAgPT4gcmVtb3ZlZCB0aGVuIHJlc3RvcmVkLlxuLy8gIEltcG9ydGFudGx5LCB0aGlzIGtlZXBzIHRoZSBcIitcIiBjaG9tcCBpbmRpY2F0b3IgZnJvbSBnYWluaW5nIGFuIGV4dHJhIGxpbmUuXG5mdW5jdGlvbiB3cml0ZVNjYWxhcihzdGF0ZSwgc3RyaW5nLCBsZXZlbCwgaXNrZXkpIHtcbiAgc3RhdGUuZHVtcCA9IChmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHN0cmluZy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBcIicnXCI7XG4gICAgfVxuICAgIGlmICghc3RhdGUubm9Db21wYXRNb2RlICYmXG4gICAgICAgIERFUFJFQ0FURURfQk9PTEVBTlNfU1lOVEFYLmluZGV4T2Yoc3RyaW5nKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiBcIidcIiArIHN0cmluZyArIFwiJ1wiO1xuICAgIH1cblxuICAgIHZhciBpbmRlbnQgPSBzdGF0ZS5pbmRlbnQgKiBNYXRoLm1heCgxLCBsZXZlbCk7IC8vIG5vIDAtaW5kZW50IHNjYWxhcnNcbiAgICAvLyBBcyBpbmRlbnRhdGlvbiBnZXRzIGRlZXBlciwgbGV0IHRoZSB3aWR0aCBkZWNyZWFzZSBtb25vdG9uaWNhbGx5XG4gICAgLy8gdG8gdGhlIGxvd2VyIGJvdW5kIG1pbihzdGF0ZS5saW5lV2lkdGgsIDQwKS5cbiAgICAvLyBOb3RlIHRoYXQgdGhpcyBpbXBsaWVzXG4gICAgLy8gIHN0YXRlLmxpbmVXaWR0aCBcdTIyNjQgNDAgKyBzdGF0ZS5pbmRlbnQ6IHdpZHRoIGlzIGZpeGVkIGF0IHRoZSBsb3dlciBib3VuZC5cbiAgICAvLyAgc3RhdGUubGluZVdpZHRoID4gNDAgKyBzdGF0ZS5pbmRlbnQ6IHdpZHRoIGRlY3JlYXNlcyB1bnRpbCB0aGUgbG93ZXIgYm91bmQuXG4gICAgLy8gVGhpcyBiZWhhdmVzIGJldHRlciB0aGFuIGEgY29uc3RhbnQgbWluaW11bSB3aWR0aCB3aGljaCBkaXNhbGxvd3MgbmFycm93ZXIgb3B0aW9ucyxcbiAgICAvLyBvciBhbiBpbmRlbnQgdGhyZXNob2xkIHdoaWNoIGNhdXNlcyB0aGUgd2lkdGggdG8gc3VkZGVubHkgaW5jcmVhc2UuXG4gICAgdmFyIGxpbmVXaWR0aCA9IHN0YXRlLmxpbmVXaWR0aCA9PT0gLTFcbiAgICAgID8gLTEgOiBNYXRoLm1heChNYXRoLm1pbihzdGF0ZS5saW5lV2lkdGgsIDQwKSwgc3RhdGUubGluZVdpZHRoIC0gaW5kZW50KTtcblxuICAgIC8vIFdpdGhvdXQga25vd2luZyBpZiBrZXlzIGFyZSBpbXBsaWNpdC9leHBsaWNpdCwgYXNzdW1lIGltcGxpY2l0IGZvciBzYWZldHkuXG4gICAgdmFyIHNpbmdsZUxpbmVPbmx5ID0gaXNrZXlcbiAgICAgIC8vIE5vIGJsb2NrIHN0eWxlcyBpbiBmbG93IG1vZGUuXG4gICAgICB8fCAoc3RhdGUuZmxvd0xldmVsID4gLTEgJiYgbGV2ZWwgPj0gc3RhdGUuZmxvd0xldmVsKTtcbiAgICBmdW5jdGlvbiB0ZXN0QW1iaWd1aXR5KHN0cmluZykge1xuICAgICAgcmV0dXJuIHRlc3RJbXBsaWNpdFJlc29sdmluZyhzdGF0ZSwgc3RyaW5nKTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGNob29zZVNjYWxhclN0eWxlKHN0cmluZywgc2luZ2xlTGluZU9ubHksIHN0YXRlLmluZGVudCwgbGluZVdpZHRoLCB0ZXN0QW1iaWd1aXR5KSkge1xuICAgICAgY2FzZSBTVFlMRV9QTEFJTjpcbiAgICAgICAgcmV0dXJuIHN0cmluZztcbiAgICAgIGNhc2UgU1RZTEVfU0lOR0xFOlxuICAgICAgICByZXR1cm4gXCInXCIgKyBzdHJpbmcucmVwbGFjZSgvJy9nLCBcIicnXCIpICsgXCInXCI7XG4gICAgICBjYXNlIFNUWUxFX0xJVEVSQUw6XG4gICAgICAgIHJldHVybiAnfCcgKyBibG9ja0hlYWRlcihzdHJpbmcsIHN0YXRlLmluZGVudClcbiAgICAgICAgICArIGRyb3BFbmRpbmdOZXdsaW5lKGluZGVudFN0cmluZyhzdHJpbmcsIGluZGVudCkpO1xuICAgICAgY2FzZSBTVFlMRV9GT0xERUQ6XG4gICAgICAgIHJldHVybiAnPicgKyBibG9ja0hlYWRlcihzdHJpbmcsIHN0YXRlLmluZGVudClcbiAgICAgICAgICArIGRyb3BFbmRpbmdOZXdsaW5lKGluZGVudFN0cmluZyhmb2xkU3RyaW5nKHN0cmluZywgbGluZVdpZHRoKSwgaW5kZW50KSk7XG4gICAgICBjYXNlIFNUWUxFX0RPVUJMRTpcbiAgICAgICAgcmV0dXJuICdcIicgKyBlc2NhcGVTdHJpbmcoc3RyaW5nLCBsaW5lV2lkdGgpICsgJ1wiJztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBZQU1MRXhjZXB0aW9uKCdpbXBvc3NpYmxlIGVycm9yOiBpbnZhbGlkIHNjYWxhciBzdHlsZScpO1xuICAgIH1cbiAgfSgpKTtcbn1cblxuLy8gUHJlLWNvbmRpdGlvbnM6IHN0cmluZyBpcyB2YWxpZCBmb3IgYSBibG9jayBzY2FsYXIsIDEgPD0gaW5kZW50UGVyTGV2ZWwgPD0gOS5cbmZ1bmN0aW9uIGJsb2NrSGVhZGVyKHN0cmluZywgaW5kZW50UGVyTGV2ZWwpIHtcbiAgdmFyIGluZGVudEluZGljYXRvciA9IG5lZWRJbmRlbnRJbmRpY2F0b3Ioc3RyaW5nKSA/IFN0cmluZyhpbmRlbnRQZXJMZXZlbCkgOiAnJztcblxuICAvLyBub3RlIHRoZSBzcGVjaWFsIGNhc2U6IHRoZSBzdHJpbmcgJ1xcbicgY291bnRzIGFzIGEgXCJ0cmFpbGluZ1wiIGVtcHR5IGxpbmUuXG4gIHZhciBjbGlwID0gICAgICAgICAgc3RyaW5nW3N0cmluZy5sZW5ndGggLSAxXSA9PT0gJ1xcbic7XG4gIHZhciBrZWVwID0gY2xpcCAmJiAoc3RyaW5nW3N0cmluZy5sZW5ndGggLSAyXSA9PT0gJ1xcbicgfHwgc3RyaW5nID09PSAnXFxuJyk7XG4gIHZhciBjaG9tcCA9IGtlZXAgPyAnKycgOiAoY2xpcCA/ICcnIDogJy0nKTtcblxuICByZXR1cm4gaW5kZW50SW5kaWNhdG9yICsgY2hvbXAgKyAnXFxuJztcbn1cblxuLy8gKFNlZSB0aGUgbm90ZSBmb3Igd3JpdGVTY2FsYXIuKVxuZnVuY3Rpb24gZHJvcEVuZGluZ05ld2xpbmUoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmdbc3RyaW5nLmxlbmd0aCAtIDFdID09PSAnXFxuJyA/IHN0cmluZy5zbGljZSgwLCAtMSkgOiBzdHJpbmc7XG59XG5cbi8vIE5vdGU6IGEgbG9uZyBsaW5lIHdpdGhvdXQgYSBzdWl0YWJsZSBicmVhayBwb2ludCB3aWxsIGV4Y2VlZCB0aGUgd2lkdGggbGltaXQuXG4vLyBQcmUtY29uZGl0aW9uczogZXZlcnkgY2hhciBpbiBzdHIgaXNQcmludGFibGUsIHN0ci5sZW5ndGggPiAwLCB3aWR0aCA+IDAuXG5mdW5jdGlvbiBmb2xkU3RyaW5nKHN0cmluZywgd2lkdGgpIHtcbiAgLy8gSW4gZm9sZGVkIHN0eWxlLCAkayQgY29uc2VjdXRpdmUgbmV3bGluZXMgb3V0cHV0IGFzICRrKzEkIG5ld2xpbmVzXHUyMDE0XG4gIC8vIHVubGVzcyB0aGV5J3JlIGJlZm9yZSBvciBhZnRlciBhIG1vcmUtaW5kZW50ZWQgbGluZSwgb3IgYXQgdGhlIHZlcnlcbiAgLy8gYmVnaW5uaW5nIG9yIGVuZCwgaW4gd2hpY2ggY2FzZSAkayQgbWFwcyB0byAkayQuXG4gIC8vIFRoZXJlZm9yZSwgcGFyc2UgZWFjaCBjaHVuayBhcyBuZXdsaW5lKHMpIGZvbGxvd2VkIGJ5IGEgY29udGVudCBsaW5lLlxuICB2YXIgbGluZVJlID0gLyhcXG4rKShbXlxcbl0qKS9nO1xuXG4gIC8vIGZpcnN0IGxpbmUgKHBvc3NpYmx5IGFuIGVtcHR5IGxpbmUpXG4gIHZhciByZXN1bHQgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBuZXh0TEYgPSBzdHJpbmcuaW5kZXhPZignXFxuJyk7XG4gICAgbmV4dExGID0gbmV4dExGICE9PSAtMSA/IG5leHRMRiA6IHN0cmluZy5sZW5ndGg7XG4gICAgbGluZVJlLmxhc3RJbmRleCA9IG5leHRMRjtcbiAgICByZXR1cm4gZm9sZExpbmUoc3RyaW5nLnNsaWNlKDAsIG5leHRMRiksIHdpZHRoKTtcbiAgfSgpKTtcbiAgLy8gSWYgd2UgaGF2ZW4ndCByZWFjaGVkIHRoZSBmaXJzdCBjb250ZW50IGxpbmUgeWV0LCBkb24ndCBhZGQgYW4gZXh0cmEgXFxuLlxuICB2YXIgcHJldk1vcmVJbmRlbnRlZCA9IHN0cmluZ1swXSA9PT0gJ1xcbicgfHwgc3RyaW5nWzBdID09PSAnICc7XG4gIHZhciBtb3JlSW5kZW50ZWQ7XG5cbiAgLy8gcmVzdCBvZiB0aGUgbGluZXNcbiAgdmFyIG1hdGNoO1xuICB3aGlsZSAoKG1hdGNoID0gbGluZVJlLmV4ZWMoc3RyaW5nKSkpIHtcbiAgICB2YXIgcHJlZml4ID0gbWF0Y2hbMV0sIGxpbmUgPSBtYXRjaFsyXTtcbiAgICBtb3JlSW5kZW50ZWQgPSAobGluZVswXSA9PT0gJyAnKTtcbiAgICByZXN1bHQgKz0gcHJlZml4XG4gICAgICArICghcHJldk1vcmVJbmRlbnRlZCAmJiAhbW9yZUluZGVudGVkICYmIGxpbmUgIT09ICcnXG4gICAgICAgID8gJ1xcbicgOiAnJylcbiAgICAgICsgZm9sZExpbmUobGluZSwgd2lkdGgpO1xuICAgIHByZXZNb3JlSW5kZW50ZWQgPSBtb3JlSW5kZW50ZWQ7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vLyBHcmVlZHkgbGluZSBicmVha2luZy5cbi8vIFBpY2tzIHRoZSBsb25nZXN0IGxpbmUgdW5kZXIgdGhlIGxpbWl0IGVhY2ggdGltZSxcbi8vIG90aGVyd2lzZSBzZXR0bGVzIGZvciB0aGUgc2hvcnRlc3QgbGluZSBvdmVyIHRoZSBsaW1pdC5cbi8vIE5CLiBNb3JlLWluZGVudGVkIGxpbmVzICpjYW5ub3QqIGJlIGZvbGRlZCwgYXMgdGhhdCB3b3VsZCBhZGQgYW4gZXh0cmEgXFxuLlxuZnVuY3Rpb24gZm9sZExpbmUobGluZSwgd2lkdGgpIHtcbiAgaWYgKGxpbmUgPT09ICcnIHx8IGxpbmVbMF0gPT09ICcgJykgcmV0dXJuIGxpbmU7XG5cbiAgLy8gU2luY2UgYSBtb3JlLWluZGVudGVkIGxpbmUgYWRkcyBhIFxcbiwgYnJlYWtzIGNhbid0IGJlIGZvbGxvd2VkIGJ5IGEgc3BhY2UuXG4gIHZhciBicmVha1JlID0gLyBbXiBdL2c7IC8vIG5vdGU6IHRoZSBtYXRjaCBpbmRleCB3aWxsIGFsd2F5cyBiZSA8PSBsZW5ndGgtMi5cbiAgdmFyIG1hdGNoO1xuICAvLyBzdGFydCBpcyBhbiBpbmNsdXNpdmUgaW5kZXguIGVuZCwgY3VyciwgYW5kIG5leHQgYXJlIGV4Y2x1c2l2ZS5cbiAgdmFyIHN0YXJ0ID0gMCwgZW5kLCBjdXJyID0gMCwgbmV4dCA9IDA7XG4gIHZhciByZXN1bHQgPSAnJztcblxuICAvLyBJbnZhcmlhbnRzOiAwIDw9IHN0YXJ0IDw9IGxlbmd0aC0xLlxuICAvLyAgIDAgPD0gY3VyciA8PSBuZXh0IDw9IG1heCgwLCBsZW5ndGgtMikuIGN1cnIgLSBzdGFydCA8PSB3aWR0aC5cbiAgLy8gSW5zaWRlIHRoZSBsb29wOlxuICAvLyAgIEEgbWF0Y2ggaW1wbGllcyBsZW5ndGggPj0gMiwgc28gY3VyciBhbmQgbmV4dCBhcmUgPD0gbGVuZ3RoLTIuXG4gIHdoaWxlICgobWF0Y2ggPSBicmVha1JlLmV4ZWMobGluZSkpKSB7XG4gICAgbmV4dCA9IG1hdGNoLmluZGV4O1xuICAgIC8vIG1haW50YWluIGludmFyaWFudDogY3VyciAtIHN0YXJ0IDw9IHdpZHRoXG4gICAgaWYgKG5leHQgLSBzdGFydCA+IHdpZHRoKSB7XG4gICAgICBlbmQgPSAoY3VyciA+IHN0YXJ0KSA/IGN1cnIgOiBuZXh0OyAvLyBkZXJpdmUgZW5kIDw9IGxlbmd0aC0yXG4gICAgICByZXN1bHQgKz0gJ1xcbicgKyBsaW5lLnNsaWNlKHN0YXJ0LCBlbmQpO1xuICAgICAgLy8gc2tpcCB0aGUgc3BhY2UgdGhhdCB3YXMgb3V0cHV0IGFzIFxcblxuICAgICAgc3RhcnQgPSBlbmQgKyAxOyAgICAgICAgICAgICAgICAgICAgLy8gZGVyaXZlIHN0YXJ0IDw9IGxlbmd0aC0xXG4gICAgfVxuICAgIGN1cnIgPSBuZXh0O1xuICB9XG5cbiAgLy8gQnkgdGhlIGludmFyaWFudHMsIHN0YXJ0IDw9IGxlbmd0aC0xLCBzbyB0aGVyZSBpcyBzb21ldGhpbmcgbGVmdCBvdmVyLlxuICAvLyBJdCBpcyBlaXRoZXIgdGhlIHdob2xlIHN0cmluZyBvciBhIHBhcnQgc3RhcnRpbmcgZnJvbSBub24td2hpdGVzcGFjZS5cbiAgcmVzdWx0ICs9ICdcXG4nO1xuICAvLyBJbnNlcnQgYSBicmVhayBpZiB0aGUgcmVtYWluZGVyIGlzIHRvbyBsb25nIGFuZCB0aGVyZSBpcyBhIGJyZWFrIGF2YWlsYWJsZS5cbiAgaWYgKGxpbmUubGVuZ3RoIC0gc3RhcnQgPiB3aWR0aCAmJiBjdXJyID4gc3RhcnQpIHtcbiAgICByZXN1bHQgKz0gbGluZS5zbGljZShzdGFydCwgY3VycikgKyAnXFxuJyArIGxpbmUuc2xpY2UoY3VyciArIDEpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCArPSBsaW5lLnNsaWNlKHN0YXJ0KTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQuc2xpY2UoMSk7IC8vIGRyb3AgZXh0cmEgXFxuIGpvaW5lclxufVxuXG4vLyBFc2NhcGVzIGEgZG91YmxlLXF1b3RlZCBzdHJpbmcuXG5mdW5jdGlvbiBlc2NhcGVTdHJpbmcoc3RyaW5nKSB7XG4gIHZhciByZXN1bHQgPSAnJztcbiAgdmFyIGNoYXIsIG5leHRDaGFyO1xuICB2YXIgZXNjYXBlU2VxO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyaW5nLmxlbmd0aDsgaSsrKSB7XG4gICAgY2hhciA9IHN0cmluZy5jaGFyQ29kZUF0KGkpO1xuICAgIC8vIENoZWNrIGZvciBzdXJyb2dhdGUgcGFpcnMgKHJlZmVyZW5jZSBVbmljb2RlIDMuMCBzZWN0aW9uIFwiMy43IFN1cnJvZ2F0ZXNcIikuXG4gICAgaWYgKGNoYXIgPj0gMHhEODAwICYmIGNoYXIgPD0gMHhEQkZGLyogaGlnaCBzdXJyb2dhdGUgKi8pIHtcbiAgICAgIG5leHRDaGFyID0gc3RyaW5nLmNoYXJDb2RlQXQoaSArIDEpO1xuICAgICAgaWYgKG5leHRDaGFyID49IDB4REMwMCAmJiBuZXh0Q2hhciA8PSAweERGRkYvKiBsb3cgc3Vycm9nYXRlICovKSB7XG4gICAgICAgIC8vIENvbWJpbmUgdGhlIHN1cnJvZ2F0ZSBwYWlyIGFuZCBzdG9yZSBpdCBlc2NhcGVkLlxuICAgICAgICByZXN1bHQgKz0gZW5jb2RlSGV4KChjaGFyIC0gMHhEODAwKSAqIDB4NDAwICsgbmV4dENoYXIgLSAweERDMDAgKyAweDEwMDAwKTtcbiAgICAgICAgLy8gQWR2YW5jZSBpbmRleCBvbmUgZXh0cmEgc2luY2Ugd2UgYWxyZWFkeSB1c2VkIHRoYXQgY2hhciBoZXJlLlxuICAgICAgICBpKys7IGNvbnRpbnVlO1xuICAgICAgfVxuICAgIH1cbiAgICBlc2NhcGVTZXEgPSBFU0NBUEVfU0VRVUVOQ0VTW2NoYXJdO1xuICAgIHJlc3VsdCArPSAhZXNjYXBlU2VxICYmIGlzUHJpbnRhYmxlKGNoYXIpXG4gICAgICA/IHN0cmluZ1tpXVxuICAgICAgOiBlc2NhcGVTZXEgfHwgZW5jb2RlSGV4KGNoYXIpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gd3JpdGVGbG93U2VxdWVuY2Uoc3RhdGUsIGxldmVsLCBvYmplY3QpIHtcbiAgdmFyIF9yZXN1bHQgPSAnJyxcbiAgICAgIF90YWcgICAgPSBzdGF0ZS50YWcsXG4gICAgICBpbmRleCxcbiAgICAgIGxlbmd0aDtcblxuICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gb2JqZWN0Lmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICAvLyBXcml0ZSBvbmx5IHZhbGlkIGVsZW1lbnRzLlxuICAgIGlmICh3cml0ZU5vZGUoc3RhdGUsIGxldmVsLCBvYmplY3RbaW5kZXhdLCBmYWxzZSwgZmFsc2UpKSB7XG4gICAgICBpZiAoaW5kZXggIT09IDApIF9yZXN1bHQgKz0gJywnICsgKCFzdGF0ZS5jb25kZW5zZUZsb3cgPyAnICcgOiAnJyk7XG4gICAgICBfcmVzdWx0ICs9IHN0YXRlLmR1bXA7XG4gICAgfVxuICB9XG5cbiAgc3RhdGUudGFnID0gX3RhZztcbiAgc3RhdGUuZHVtcCA9ICdbJyArIF9yZXN1bHQgKyAnXSc7XG59XG5cbmZ1bmN0aW9uIHdyaXRlQmxvY2tTZXF1ZW5jZShzdGF0ZSwgbGV2ZWwsIG9iamVjdCwgY29tcGFjdCkge1xuICB2YXIgX3Jlc3VsdCA9ICcnLFxuICAgICAgX3RhZyAgICA9IHN0YXRlLnRhZyxcbiAgICAgIGluZGV4LFxuICAgICAgbGVuZ3RoO1xuXG4gIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSBvYmplY3QubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgIC8vIFdyaXRlIG9ubHkgdmFsaWQgZWxlbWVudHMuXG4gICAgaWYgKHdyaXRlTm9kZShzdGF0ZSwgbGV2ZWwgKyAxLCBvYmplY3RbaW5kZXhdLCB0cnVlLCB0cnVlKSkge1xuICAgICAgaWYgKCFjb21wYWN0IHx8IGluZGV4ICE9PSAwKSB7XG4gICAgICAgIF9yZXN1bHQgKz0gZ2VuZXJhdGVOZXh0TGluZShzdGF0ZSwgbGV2ZWwpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUuZHVtcCAmJiBDSEFSX0xJTkVfRkVFRCA9PT0gc3RhdGUuZHVtcC5jaGFyQ29kZUF0KDApKSB7XG4gICAgICAgIF9yZXN1bHQgKz0gJy0nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX3Jlc3VsdCArPSAnLSAnO1xuICAgICAgfVxuXG4gICAgICBfcmVzdWx0ICs9IHN0YXRlLmR1bXA7XG4gICAgfVxuICB9XG5cbiAgc3RhdGUudGFnID0gX3RhZztcbiAgc3RhdGUuZHVtcCA9IF9yZXN1bHQgfHwgJ1tdJzsgLy8gRW1wdHkgc2VxdWVuY2UgaWYgbm8gdmFsaWQgdmFsdWVzLlxufVxuXG5mdW5jdGlvbiB3cml0ZUZsb3dNYXBwaW5nKHN0YXRlLCBsZXZlbCwgb2JqZWN0KSB7XG4gIHZhciBfcmVzdWx0ICAgICAgID0gJycsXG4gICAgICBfdGFnICAgICAgICAgID0gc3RhdGUudGFnLFxuICAgICAgb2JqZWN0S2V5TGlzdCA9IE9iamVjdC5rZXlzKG9iamVjdCksXG4gICAgICBpbmRleCxcbiAgICAgIGxlbmd0aCxcbiAgICAgIG9iamVjdEtleSxcbiAgICAgIG9iamVjdFZhbHVlLFxuICAgICAgcGFpckJ1ZmZlcjtcblxuICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gb2JqZWN0S2V5TGlzdC5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSAxKSB7XG5cbiAgICBwYWlyQnVmZmVyID0gJyc7XG4gICAgaWYgKGluZGV4ICE9PSAwKSBwYWlyQnVmZmVyICs9ICcsICc7XG5cbiAgICBpZiAoc3RhdGUuY29uZGVuc2VGbG93KSBwYWlyQnVmZmVyICs9ICdcIic7XG5cbiAgICBvYmplY3RLZXkgPSBvYmplY3RLZXlMaXN0W2luZGV4XTtcbiAgICBvYmplY3RWYWx1ZSA9IG9iamVjdFtvYmplY3RLZXldO1xuXG4gICAgaWYgKCF3cml0ZU5vZGUoc3RhdGUsIGxldmVsLCBvYmplY3RLZXksIGZhbHNlLCBmYWxzZSkpIHtcbiAgICAgIGNvbnRpbnVlOyAvLyBTa2lwIHRoaXMgcGFpciBiZWNhdXNlIG9mIGludmFsaWQga2V5O1xuICAgIH1cblxuICAgIGlmIChzdGF0ZS5kdW1wLmxlbmd0aCA+IDEwMjQpIHBhaXJCdWZmZXIgKz0gJz8gJztcblxuICAgIHBhaXJCdWZmZXIgKz0gc3RhdGUuZHVtcCArIChzdGF0ZS5jb25kZW5zZUZsb3cgPyAnXCInIDogJycpICsgJzonICsgKHN0YXRlLmNvbmRlbnNlRmxvdyA/ICcnIDogJyAnKTtcblxuICAgIGlmICghd3JpdGVOb2RlKHN0YXRlLCBsZXZlbCwgb2JqZWN0VmFsdWUsIGZhbHNlLCBmYWxzZSkpIHtcbiAgICAgIGNvbnRpbnVlOyAvLyBTa2lwIHRoaXMgcGFpciBiZWNhdXNlIG9mIGludmFsaWQgdmFsdWUuXG4gICAgfVxuXG4gICAgcGFpckJ1ZmZlciArPSBzdGF0ZS5kdW1wO1xuXG4gICAgLy8gQm90aCBrZXkgYW5kIHZhbHVlIGFyZSB2YWxpZC5cbiAgICBfcmVzdWx0ICs9IHBhaXJCdWZmZXI7XG4gIH1cblxuICBzdGF0ZS50YWcgPSBfdGFnO1xuICBzdGF0ZS5kdW1wID0gJ3snICsgX3Jlc3VsdCArICd9Jztcbn1cblxuZnVuY3Rpb24gd3JpdGVCbG9ja01hcHBpbmcoc3RhdGUsIGxldmVsLCBvYmplY3QsIGNvbXBhY3QpIHtcbiAgdmFyIF9yZXN1bHQgICAgICAgPSAnJyxcbiAgICAgIF90YWcgICAgICAgICAgPSBzdGF0ZS50YWcsXG4gICAgICBvYmplY3RLZXlMaXN0ID0gT2JqZWN0LmtleXMob2JqZWN0KSxcbiAgICAgIGluZGV4LFxuICAgICAgbGVuZ3RoLFxuICAgICAgb2JqZWN0S2V5LFxuICAgICAgb2JqZWN0VmFsdWUsXG4gICAgICBleHBsaWNpdFBhaXIsXG4gICAgICBwYWlyQnVmZmVyO1xuXG4gIC8vIEFsbG93IHNvcnRpbmcga2V5cyBzbyB0aGF0IHRoZSBvdXRwdXQgZmlsZSBpcyBkZXRlcm1pbmlzdGljXG4gIGlmIChzdGF0ZS5zb3J0S2V5cyA9PT0gdHJ1ZSkge1xuICAgIC8vIERlZmF1bHQgc29ydGluZ1xuICAgIG9iamVjdEtleUxpc3Quc29ydCgpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBzdGF0ZS5zb3J0S2V5cyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIEN1c3RvbSBzb3J0IGZ1bmN0aW9uXG4gICAgb2JqZWN0S2V5TGlzdC5zb3J0KHN0YXRlLnNvcnRLZXlzKTtcbiAgfSBlbHNlIGlmIChzdGF0ZS5zb3J0S2V5cykge1xuICAgIC8vIFNvbWV0aGluZyBpcyB3cm9uZ1xuICAgIHRocm93IG5ldyBZQU1MRXhjZXB0aW9uKCdzb3J0S2V5cyBtdXN0IGJlIGEgYm9vbGVhbiBvciBhIGZ1bmN0aW9uJyk7XG4gIH1cblxuICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gb2JqZWN0S2V5TGlzdC5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgcGFpckJ1ZmZlciA9ICcnO1xuXG4gICAgaWYgKCFjb21wYWN0IHx8IGluZGV4ICE9PSAwKSB7XG4gICAgICBwYWlyQnVmZmVyICs9IGdlbmVyYXRlTmV4dExpbmUoc3RhdGUsIGxldmVsKTtcbiAgICB9XG5cbiAgICBvYmplY3RLZXkgPSBvYmplY3RLZXlMaXN0W2luZGV4XTtcbiAgICBvYmplY3RWYWx1ZSA9IG9iamVjdFtvYmplY3RLZXldO1xuXG4gICAgaWYgKCF3cml0ZU5vZGUoc3RhdGUsIGxldmVsICsgMSwgb2JqZWN0S2V5LCB0cnVlLCB0cnVlLCB0cnVlKSkge1xuICAgICAgY29udGludWU7IC8vIFNraXAgdGhpcyBwYWlyIGJlY2F1c2Ugb2YgaW52YWxpZCBrZXkuXG4gICAgfVxuXG4gICAgZXhwbGljaXRQYWlyID0gKHN0YXRlLnRhZyAhPT0gbnVsbCAmJiBzdGF0ZS50YWcgIT09ICc/JykgfHxcbiAgICAgICAgICAgICAgICAgICAoc3RhdGUuZHVtcCAmJiBzdGF0ZS5kdW1wLmxlbmd0aCA+IDEwMjQpO1xuXG4gICAgaWYgKGV4cGxpY2l0UGFpcikge1xuICAgICAgaWYgKHN0YXRlLmR1bXAgJiYgQ0hBUl9MSU5FX0ZFRUQgPT09IHN0YXRlLmR1bXAuY2hhckNvZGVBdCgwKSkge1xuICAgICAgICBwYWlyQnVmZmVyICs9ICc/JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhaXJCdWZmZXIgKz0gJz8gJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwYWlyQnVmZmVyICs9IHN0YXRlLmR1bXA7XG5cbiAgICBpZiAoZXhwbGljaXRQYWlyKSB7XG4gICAgICBwYWlyQnVmZmVyICs9IGdlbmVyYXRlTmV4dExpbmUoc3RhdGUsIGxldmVsKTtcbiAgICB9XG5cbiAgICBpZiAoIXdyaXRlTm9kZShzdGF0ZSwgbGV2ZWwgKyAxLCBvYmplY3RWYWx1ZSwgdHJ1ZSwgZXhwbGljaXRQYWlyKSkge1xuICAgICAgY29udGludWU7IC8vIFNraXAgdGhpcyBwYWlyIGJlY2F1c2Ugb2YgaW52YWxpZCB2YWx1ZS5cbiAgICB9XG5cbiAgICBpZiAoc3RhdGUuZHVtcCAmJiBDSEFSX0xJTkVfRkVFRCA9PT0gc3RhdGUuZHVtcC5jaGFyQ29kZUF0KDApKSB7XG4gICAgICBwYWlyQnVmZmVyICs9ICc6JztcbiAgICB9IGVsc2Uge1xuICAgICAgcGFpckJ1ZmZlciArPSAnOiAnO1xuICAgIH1cblxuICAgIHBhaXJCdWZmZXIgKz0gc3RhdGUuZHVtcDtcblxuICAgIC8vIEJvdGgga2V5IGFuZCB2YWx1ZSBhcmUgdmFsaWQuXG4gICAgX3Jlc3VsdCArPSBwYWlyQnVmZmVyO1xuICB9XG5cbiAgc3RhdGUudGFnID0gX3RhZztcbiAgc3RhdGUuZHVtcCA9IF9yZXN1bHQgfHwgJ3t9JzsgLy8gRW1wdHkgbWFwcGluZyBpZiBubyB2YWxpZCBwYWlycy5cbn1cblxuZnVuY3Rpb24gZGV0ZWN0VHlwZShzdGF0ZSwgb2JqZWN0LCBleHBsaWNpdCkge1xuICB2YXIgX3Jlc3VsdCwgdHlwZUxpc3QsIGluZGV4LCBsZW5ndGgsIHR5cGUsIHN0eWxlO1xuXG4gIHR5cGVMaXN0ID0gZXhwbGljaXQgPyBzdGF0ZS5leHBsaWNpdFR5cGVzIDogc3RhdGUuaW1wbGljaXRUeXBlcztcblxuICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gdHlwZUxpc3QubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgIHR5cGUgPSB0eXBlTGlzdFtpbmRleF07XG5cbiAgICBpZiAoKHR5cGUuaW5zdGFuY2VPZiAgfHwgdHlwZS5wcmVkaWNhdGUpICYmXG4gICAgICAgICghdHlwZS5pbnN0YW5jZU9mIHx8ICgodHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcpICYmIChvYmplY3QgaW5zdGFuY2VvZiB0eXBlLmluc3RhbmNlT2YpKSkgJiZcbiAgICAgICAgKCF0eXBlLnByZWRpY2F0ZSAgfHwgdHlwZS5wcmVkaWNhdGUob2JqZWN0KSkpIHtcblxuICAgICAgc3RhdGUudGFnID0gZXhwbGljaXQgPyB0eXBlLnRhZyA6ICc/JztcblxuICAgICAgaWYgKHR5cGUucmVwcmVzZW50KSB7XG4gICAgICAgIHN0eWxlID0gc3RhdGUuc3R5bGVNYXBbdHlwZS50YWddIHx8IHR5cGUuZGVmYXVsdFN0eWxlO1xuXG4gICAgICAgIGlmIChfdG9TdHJpbmcuY2FsbCh0eXBlLnJlcHJlc2VudCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXScpIHtcbiAgICAgICAgICBfcmVzdWx0ID0gdHlwZS5yZXByZXNlbnQob2JqZWN0LCBzdHlsZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoX2hhc093blByb3BlcnR5LmNhbGwodHlwZS5yZXByZXNlbnQsIHN0eWxlKSkge1xuICAgICAgICAgIF9yZXN1bHQgPSB0eXBlLnJlcHJlc2VudFtzdHlsZV0ob2JqZWN0LCBzdHlsZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFlBTUxFeGNlcHRpb24oJyE8JyArIHR5cGUudGFnICsgJz4gdGFnIHJlc29sdmVyIGFjY2VwdHMgbm90IFwiJyArIHN0eWxlICsgJ1wiIHN0eWxlJyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZS5kdW1wID0gX3Jlc3VsdDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBTZXJpYWxpemVzIGBvYmplY3RgIGFuZCB3cml0ZXMgaXQgdG8gZ2xvYmFsIGByZXN1bHRgLlxuLy8gUmV0dXJucyB0cnVlIG9uIHN1Y2Nlc3MsIG9yIGZhbHNlIG9uIGludmFsaWQgb2JqZWN0LlxuLy9cbmZ1bmN0aW9uIHdyaXRlTm9kZShzdGF0ZSwgbGV2ZWwsIG9iamVjdCwgYmxvY2ssIGNvbXBhY3QsIGlza2V5KSB7XG4gIHN0YXRlLnRhZyA9IG51bGw7XG4gIHN0YXRlLmR1bXAgPSBvYmplY3Q7XG5cbiAgaWYgKCFkZXRlY3RUeXBlKHN0YXRlLCBvYmplY3QsIGZhbHNlKSkge1xuICAgIGRldGVjdFR5cGUoc3RhdGUsIG9iamVjdCwgdHJ1ZSk7XG4gIH1cblxuICB2YXIgdHlwZSA9IF90b1N0cmluZy5jYWxsKHN0YXRlLmR1bXApO1xuXG4gIGlmIChibG9jaykge1xuICAgIGJsb2NrID0gKHN0YXRlLmZsb3dMZXZlbCA8IDAgfHwgc3RhdGUuZmxvd0xldmVsID4gbGV2ZWwpO1xuICB9XG5cbiAgdmFyIG9iamVjdE9yQXJyYXkgPSB0eXBlID09PSAnW29iamVjdCBPYmplY3RdJyB8fCB0eXBlID09PSAnW29iamVjdCBBcnJheV0nLFxuICAgICAgZHVwbGljYXRlSW5kZXgsXG4gICAgICBkdXBsaWNhdGU7XG5cbiAgaWYgKG9iamVjdE9yQXJyYXkpIHtcbiAgICBkdXBsaWNhdGVJbmRleCA9IHN0YXRlLmR1cGxpY2F0ZXMuaW5kZXhPZihvYmplY3QpO1xuICAgIGR1cGxpY2F0ZSA9IGR1cGxpY2F0ZUluZGV4ICE9PSAtMTtcbiAgfVxuXG4gIGlmICgoc3RhdGUudGFnICE9PSBudWxsICYmIHN0YXRlLnRhZyAhPT0gJz8nKSB8fCBkdXBsaWNhdGUgfHwgKHN0YXRlLmluZGVudCAhPT0gMiAmJiBsZXZlbCA+IDApKSB7XG4gICAgY29tcGFjdCA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKGR1cGxpY2F0ZSAmJiBzdGF0ZS51c2VkRHVwbGljYXRlc1tkdXBsaWNhdGVJbmRleF0pIHtcbiAgICBzdGF0ZS5kdW1wID0gJypyZWZfJyArIGR1cGxpY2F0ZUluZGV4O1xuICB9IGVsc2Uge1xuICAgIGlmIChvYmplY3RPckFycmF5ICYmIGR1cGxpY2F0ZSAmJiAhc3RhdGUudXNlZER1cGxpY2F0ZXNbZHVwbGljYXRlSW5kZXhdKSB7XG4gICAgICBzdGF0ZS51c2VkRHVwbGljYXRlc1tkdXBsaWNhdGVJbmRleF0gPSB0cnVlO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgIGlmIChibG9jayAmJiAoT2JqZWN0LmtleXMoc3RhdGUuZHVtcCkubGVuZ3RoICE9PSAwKSkge1xuICAgICAgICB3cml0ZUJsb2NrTWFwcGluZyhzdGF0ZSwgbGV2ZWwsIHN0YXRlLmR1bXAsIGNvbXBhY3QpO1xuICAgICAgICBpZiAoZHVwbGljYXRlKSB7XG4gICAgICAgICAgc3RhdGUuZHVtcCA9ICcmcmVmXycgKyBkdXBsaWNhdGVJbmRleCArIHN0YXRlLmR1bXA7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdyaXRlRmxvd01hcHBpbmcoc3RhdGUsIGxldmVsLCBzdGF0ZS5kdW1wKTtcbiAgICAgICAgaWYgKGR1cGxpY2F0ZSkge1xuICAgICAgICAgIHN0YXRlLmR1bXAgPSAnJnJlZl8nICsgZHVwbGljYXRlSW5kZXggKyAnICcgKyBzdGF0ZS5kdW1wO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICB2YXIgYXJyYXlMZXZlbCA9IChzdGF0ZS5ub0FycmF5SW5kZW50ICYmIChsZXZlbCA+IDApKSA/IGxldmVsIC0gMSA6IGxldmVsO1xuICAgICAgaWYgKGJsb2NrICYmIChzdGF0ZS5kdW1wLmxlbmd0aCAhPT0gMCkpIHtcbiAgICAgICAgd3JpdGVCbG9ja1NlcXVlbmNlKHN0YXRlLCBhcnJheUxldmVsLCBzdGF0ZS5kdW1wLCBjb21wYWN0KTtcbiAgICAgICAgaWYgKGR1cGxpY2F0ZSkge1xuICAgICAgICAgIHN0YXRlLmR1bXAgPSAnJnJlZl8nICsgZHVwbGljYXRlSW5kZXggKyBzdGF0ZS5kdW1wO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3cml0ZUZsb3dTZXF1ZW5jZShzdGF0ZSwgYXJyYXlMZXZlbCwgc3RhdGUuZHVtcCk7XG4gICAgICAgIGlmIChkdXBsaWNhdGUpIHtcbiAgICAgICAgICBzdGF0ZS5kdW1wID0gJyZyZWZfJyArIGR1cGxpY2F0ZUluZGV4ICsgJyAnICsgc3RhdGUuZHVtcDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ1tvYmplY3QgU3RyaW5nXScpIHtcbiAgICAgIGlmIChzdGF0ZS50YWcgIT09ICc/Jykge1xuICAgICAgICB3cml0ZVNjYWxhcihzdGF0ZSwgc3RhdGUuZHVtcCwgbGV2ZWwsIGlza2V5KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHN0YXRlLnNraXBJbnZhbGlkKSByZXR1cm4gZmFsc2U7XG4gICAgICB0aHJvdyBuZXcgWUFNTEV4Y2VwdGlvbigndW5hY2NlcHRhYmxlIGtpbmQgb2YgYW4gb2JqZWN0IHRvIGR1bXAgJyArIHR5cGUpO1xuICAgIH1cblxuICAgIGlmIChzdGF0ZS50YWcgIT09IG51bGwgJiYgc3RhdGUudGFnICE9PSAnPycpIHtcbiAgICAgIHN0YXRlLmR1bXAgPSAnITwnICsgc3RhdGUudGFnICsgJz4gJyArIHN0YXRlLmR1bXA7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGdldER1cGxpY2F0ZVJlZmVyZW5jZXMob2JqZWN0LCBzdGF0ZSkge1xuICB2YXIgb2JqZWN0cyA9IFtdLFxuICAgICAgZHVwbGljYXRlc0luZGV4ZXMgPSBbXSxcbiAgICAgIGluZGV4LFxuICAgICAgbGVuZ3RoO1xuXG4gIGluc3BlY3ROb2RlKG9iamVjdCwgb2JqZWN0cywgZHVwbGljYXRlc0luZGV4ZXMpO1xuXG4gIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSBkdXBsaWNhdGVzSW5kZXhlcy5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgc3RhdGUuZHVwbGljYXRlcy5wdXNoKG9iamVjdHNbZHVwbGljYXRlc0luZGV4ZXNbaW5kZXhdXSk7XG4gIH1cbiAgc3RhdGUudXNlZER1cGxpY2F0ZXMgPSBuZXcgQXJyYXkobGVuZ3RoKTtcbn1cblxuZnVuY3Rpb24gaW5zcGVjdE5vZGUob2JqZWN0LCBvYmplY3RzLCBkdXBsaWNhdGVzSW5kZXhlcykge1xuICB2YXIgb2JqZWN0S2V5TGlzdCxcbiAgICAgIGluZGV4LFxuICAgICAgbGVuZ3RoO1xuXG4gIGlmIChvYmplY3QgIT09IG51bGwgJiYgdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcpIHtcbiAgICBpbmRleCA9IG9iamVjdHMuaW5kZXhPZihvYmplY3QpO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIGlmIChkdXBsaWNhdGVzSW5kZXhlcy5pbmRleE9mKGluZGV4KSA9PT0gLTEpIHtcbiAgICAgICAgZHVwbGljYXRlc0luZGV4ZXMucHVzaChpbmRleCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG9iamVjdHMucHVzaChvYmplY3QpO1xuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmplY3QpKSB7XG4gICAgICAgIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSBvYmplY3QubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgICAgICAgIGluc3BlY3ROb2RlKG9iamVjdFtpbmRleF0sIG9iamVjdHMsIGR1cGxpY2F0ZXNJbmRleGVzKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb2JqZWN0S2V5TGlzdCA9IE9iamVjdC5rZXlzKG9iamVjdCk7XG5cbiAgICAgICAgZm9yIChpbmRleCA9IDAsIGxlbmd0aCA9IG9iamVjdEtleUxpc3QubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgICAgICAgIGluc3BlY3ROb2RlKG9iamVjdFtvYmplY3RLZXlMaXN0W2luZGV4XV0sIG9iamVjdHMsIGR1cGxpY2F0ZXNJbmRleGVzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBkdW1wKGlucHV0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHZhciBzdGF0ZSA9IG5ldyBTdGF0ZShvcHRpb25zKTtcblxuICBpZiAoIXN0YXRlLm5vUmVmcykgZ2V0RHVwbGljYXRlUmVmZXJlbmNlcyhpbnB1dCwgc3RhdGUpO1xuXG4gIGlmICh3cml0ZU5vZGUoc3RhdGUsIDAsIGlucHV0LCB0cnVlLCB0cnVlKSkgcmV0dXJuIHN0YXRlLmR1bXAgKyAnXFxuJztcblxuICByZXR1cm4gJyc7XG59XG5cbmZ1bmN0aW9uIHNhZmVEdW1wKGlucHV0LCBvcHRpb25zKSB7XG4gIHJldHVybiBkdW1wKGlucHV0LCBjb21tb24uZXh0ZW5kKHsgc2NoZW1hOiBERUZBVUxUX1NBRkVfU0NIRU1BIH0sIG9wdGlvbnMpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMuZHVtcCAgICAgPSBkdW1wO1xubW9kdWxlLmV4cG9ydHMuc2FmZUR1bXAgPSBzYWZlRHVtcDtcbiIsICIndXNlIHN0cmljdCc7XG5cblxudmFyIGxvYWRlciA9IHJlcXVpcmUoJy4vanMteWFtbC9sb2FkZXInKTtcbnZhciBkdW1wZXIgPSByZXF1aXJlKCcuL2pzLXlhbWwvZHVtcGVyJyk7XG5cblxuZnVuY3Rpb24gZGVwcmVjYXRlZChuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdGdW5jdGlvbiAnICsgbmFtZSArICcgaXMgZGVwcmVjYXRlZCBhbmQgY2Fubm90IGJlIHVzZWQuJyk7XG4gIH07XG59XG5cblxubW9kdWxlLmV4cG9ydHMuVHlwZSAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vanMteWFtbC90eXBlJyk7XG5tb2R1bGUuZXhwb3J0cy5TY2hlbWEgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9qcy15YW1sL3NjaGVtYScpO1xubW9kdWxlLmV4cG9ydHMuRkFJTFNBRkVfU0NIRU1BICAgICA9IHJlcXVpcmUoJy4vanMteWFtbC9zY2hlbWEvZmFpbHNhZmUnKTtcbm1vZHVsZS5leHBvcnRzLkpTT05fU0NIRU1BICAgICAgICAgPSByZXF1aXJlKCcuL2pzLXlhbWwvc2NoZW1hL2pzb24nKTtcbm1vZHVsZS5leHBvcnRzLkNPUkVfU0NIRU1BICAgICAgICAgPSByZXF1aXJlKCcuL2pzLXlhbWwvc2NoZW1hL2NvcmUnKTtcbm1vZHVsZS5leHBvcnRzLkRFRkFVTFRfU0FGRV9TQ0hFTUEgPSByZXF1aXJlKCcuL2pzLXlhbWwvc2NoZW1hL2RlZmF1bHRfc2FmZScpO1xubW9kdWxlLmV4cG9ydHMuREVGQVVMVF9GVUxMX1NDSEVNQSA9IHJlcXVpcmUoJy4vanMteWFtbC9zY2hlbWEvZGVmYXVsdF9mdWxsJyk7XG5tb2R1bGUuZXhwb3J0cy5sb2FkICAgICAgICAgICAgICAgID0gbG9hZGVyLmxvYWQ7XG5tb2R1bGUuZXhwb3J0cy5sb2FkQWxsICAgICAgICAgICAgID0gbG9hZGVyLmxvYWRBbGw7XG5tb2R1bGUuZXhwb3J0cy5zYWZlTG9hZCAgICAgICAgICAgID0gbG9hZGVyLnNhZmVMb2FkO1xubW9kdWxlLmV4cG9ydHMuc2FmZUxvYWRBbGwgICAgICAgICA9IGxvYWRlci5zYWZlTG9hZEFsbDtcbm1vZHVsZS5leHBvcnRzLmR1bXAgICAgICAgICAgICAgICAgPSBkdW1wZXIuZHVtcDtcbm1vZHVsZS5leHBvcnRzLnNhZmVEdW1wICAgICAgICAgICAgPSBkdW1wZXIuc2FmZUR1bXA7XG5tb2R1bGUuZXhwb3J0cy5ZQU1MRXhjZXB0aW9uICAgICAgID0gcmVxdWlyZSgnLi9qcy15YW1sL2V4Y2VwdGlvbicpO1xuXG4vLyBEZXByZWNhdGVkIHNjaGVtYSBuYW1lcyBmcm9tIEpTLVlBTUwgMi4wLnhcbm1vZHVsZS5leHBvcnRzLk1JTklNQUxfU0NIRU1BID0gcmVxdWlyZSgnLi9qcy15YW1sL3NjaGVtYS9mYWlsc2FmZScpO1xubW9kdWxlLmV4cG9ydHMuU0FGRV9TQ0hFTUEgICAgPSByZXF1aXJlKCcuL2pzLXlhbWwvc2NoZW1hL2RlZmF1bHRfc2FmZScpO1xubW9kdWxlLmV4cG9ydHMuREVGQVVMVF9TQ0hFTUEgPSByZXF1aXJlKCcuL2pzLXlhbWwvc2NoZW1hL2RlZmF1bHRfZnVsbCcpO1xuXG4vLyBEZXByZWNhdGVkIGZ1bmN0aW9ucyBmcm9tIEpTLVlBTUwgMS54Lnhcbm1vZHVsZS5leHBvcnRzLnNjYW4gICAgICAgICAgID0gZGVwcmVjYXRlZCgnc2NhbicpO1xubW9kdWxlLmV4cG9ydHMucGFyc2UgICAgICAgICAgPSBkZXByZWNhdGVkKCdwYXJzZScpO1xubW9kdWxlLmV4cG9ydHMuY29tcG9zZSAgICAgICAgPSBkZXByZWNhdGVkKCdjb21wb3NlJyk7XG5tb2R1bGUuZXhwb3J0cy5hZGRDb25zdHJ1Y3RvciA9IGRlcHJlY2F0ZWQoJ2FkZENvbnN0cnVjdG9yJyk7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5cbnZhciB5YW1sID0gcmVxdWlyZSgnLi9saWIvanMteWFtbC5qcycpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0geWFtbDtcbiIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHlhbWwgPSByZXF1aXJlKCdqcy15YW1sJyk7XG5cbi8qKlxuICogRGVmYXVsdCBlbmdpbmVzXG4gKi9cblxuY29uc3QgZW5naW5lcyA9IGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cztcblxuLyoqXG4gKiBZQU1MXG4gKi9cblxuZW5naW5lcy55YW1sID0ge1xuICBwYXJzZTogeWFtbC5zYWZlTG9hZC5iaW5kKHlhbWwpLFxuICBzdHJpbmdpZnk6IHlhbWwuc2FmZUR1bXAuYmluZCh5YW1sKVxufTtcblxuLyoqXG4gKiBKU09OXG4gKi9cblxuZW5naW5lcy5qc29uID0ge1xuICBwYXJzZTogSlNPTi5wYXJzZS5iaW5kKEpTT04pLFxuICBzdHJpbmdpZnk6IGZ1bmN0aW9uKG9iaiwgb3B0aW9ucykge1xuICAgIGNvbnN0IG9wdHMgPSBPYmplY3QuYXNzaWduKHtyZXBsYWNlcjogbnVsbCwgc3BhY2U6IDJ9LCBvcHRpb25zKTtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqLCBvcHRzLnJlcGxhY2VyLCBvcHRzLnNwYWNlKTtcbiAgfVxufTtcblxuLyoqXG4gKiBKYXZhU2NyaXB0XG4gKi9cblxuZW5naW5lcy5qYXZhc2NyaXB0ID0ge1xuICBwYXJzZTogZnVuY3Rpb24gcGFyc2Uoc3RyLCBvcHRpb25zLCB3cmFwKSB7XG4gICAgLyogZXNsaW50IG5vLWV2YWw6IDAgKi9cbiAgICB0cnkge1xuICAgICAgaWYgKHdyYXAgIT09IGZhbHNlKSB7XG4gICAgICAgIHN0ciA9ICcoZnVuY3Rpb24oKSB7XFxucmV0dXJuICcgKyBzdHIudHJpbSgpICsgJztcXG59KCkpOyc7XG4gICAgICB9XG4gICAgICByZXR1cm4gZXZhbChzdHIpIHx8IHt9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKHdyYXAgIT09IGZhbHNlICYmIC8odW5leHBlY3RlZHxpZGVudGlmaWVyKS9pLnRlc3QoZXJyLm1lc3NhZ2UpKSB7XG4gICAgICAgIHJldHVybiBwYXJzZShzdHIsIG9wdGlvbnMsIGZhbHNlKTtcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihlcnIpO1xuICAgIH1cbiAgfSxcbiAgc3RyaW5naWZ5OiBmdW5jdGlvbigpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3N0cmluZ2lmeWluZyBKYXZhU2NyaXB0IGlzIG5vdCBzdXBwb3J0ZWQnKTtcbiAgfVxufTtcbiIsICIvKiFcbiAqIHN0cmlwLWJvbS1zdHJpbmcgPGh0dHBzOi8vZ2l0aHViLmNvbS9qb25zY2hsaW5rZXJ0L3N0cmlwLWJvbS1zdHJpbmc+XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE1LCAyMDE3LCBKb24gU2NobGlua2VydC5cbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc3RyKSB7XG4gIGlmICh0eXBlb2Ygc3RyID09PSAnc3RyaW5nJyAmJiBzdHIuY2hhckF0KDApID09PSAnXFx1ZmVmZicpIHtcbiAgICByZXR1cm4gc3RyLnNsaWNlKDEpO1xuICB9XG4gIHJldHVybiBzdHI7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxuY29uc3Qgc3RyaXBCb20gPSByZXF1aXJlKCdzdHJpcC1ib20tc3RyaW5nJyk7XG5jb25zdCB0eXBlT2YgPSByZXF1aXJlKCdraW5kLW9mJyk7XG5cbmV4cG9ydHMuZGVmaW5lID0gZnVuY3Rpb24ob2JqLCBrZXksIHZhbCkge1xuICBSZWZsZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiB2YWxcbiAgfSk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBgdmFsYCBpcyBhIGJ1ZmZlclxuICovXG5cbmV4cG9ydHMuaXNCdWZmZXIgPSBmdW5jdGlvbih2YWwpIHtcbiAgcmV0dXJuIHR5cGVPZih2YWwpID09PSAnYnVmZmVyJztcbn07XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGB2YWxgIGlzIGFuIG9iamVjdFxuICovXG5cbmV4cG9ydHMuaXNPYmplY3QgPSBmdW5jdGlvbih2YWwpIHtcbiAgcmV0dXJuIHR5cGVPZih2YWwpID09PSAnb2JqZWN0Jztcbn07XG5cbi8qKlxuICogQ2FzdCBgaW5wdXRgIHRvIGEgYnVmZmVyXG4gKi9cblxuZXhwb3J0cy50b0J1ZmZlciA9IGZ1bmN0aW9uKGlucHV0KSB7XG4gIHJldHVybiB0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnID8gQnVmZmVyLmZyb20oaW5wdXQpIDogaW5wdXQ7XG59O1xuXG4vKipcbiAqIENhc3QgYHZhbGAgdG8gYSBzdHJpbmcuXG4gKi9cblxuZXhwb3J0cy50b1N0cmluZyA9IGZ1bmN0aW9uKGlucHV0KSB7XG4gIGlmIChleHBvcnRzLmlzQnVmZmVyKGlucHV0KSkgcmV0dXJuIHN0cmlwQm9tKFN0cmluZyhpbnB1dCkpO1xuICBpZiAodHlwZW9mIGlucHV0ICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4cGVjdGVkIGlucHV0IHRvIGJlIGEgc3RyaW5nIG9yIGJ1ZmZlcicpO1xuICB9XG4gIHJldHVybiBzdHJpcEJvbShpbnB1dCk7XG59O1xuXG4vKipcbiAqIENhc3QgYHZhbGAgdG8gYW4gYXJyYXkuXG4gKi9cblxuZXhwb3J0cy5hcnJheWlmeSA9IGZ1bmN0aW9uKHZhbCkge1xuICByZXR1cm4gdmFsID8gKEFycmF5LmlzQXJyYXkodmFsKSA/IHZhbCA6IFt2YWxdKSA6IFtdO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYHN0cmAgc3RhcnRzIHdpdGggYHN1YnN0cmAuXG4gKi9cblxuZXhwb3J0cy5zdGFydHNXaXRoID0gZnVuY3Rpb24oc3RyLCBzdWJzdHIsIGxlbikge1xuICBpZiAodHlwZW9mIGxlbiAhPT0gJ251bWJlcicpIGxlbiA9IHN1YnN0ci5sZW5ndGg7XG4gIHJldHVybiBzdHIuc2xpY2UoMCwgbGVuKSA9PT0gc3Vic3RyO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVuZ2luZXMgPSByZXF1aXJlKCcuL2VuZ2luZXMnKTtcbmNvbnN0IHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgY29uc3Qgb3B0cyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpO1xuXG4gIC8vIGVuc3VyZSB0aGF0IGRlbGltaXRlcnMgYXJlIGFuIGFycmF5XG4gIG9wdHMuZGVsaW1pdGVycyA9IHV0aWxzLmFycmF5aWZ5KG9wdHMuZGVsaW1zIHx8IG9wdHMuZGVsaW1pdGVycyB8fCAnLS0tJyk7XG4gIGlmIChvcHRzLmRlbGltaXRlcnMubGVuZ3RoID09PSAxKSB7XG4gICAgb3B0cy5kZWxpbWl0ZXJzLnB1c2gob3B0cy5kZWxpbWl0ZXJzWzBdKTtcbiAgfVxuXG4gIG9wdHMubGFuZ3VhZ2UgPSAob3B0cy5sYW5ndWFnZSB8fCBvcHRzLmxhbmcgfHwgJ3lhbWwnKS50b0xvd2VyQ2FzZSgpO1xuICBvcHRzLmVuZ2luZXMgPSBPYmplY3QuYXNzaWduKHt9LCBlbmdpbmVzLCBvcHRzLnBhcnNlcnMsIG9wdHMuZW5naW5lcyk7XG4gIHJldHVybiBvcHRzO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obmFtZSwgb3B0aW9ucykge1xuICBsZXQgZW5naW5lID0gb3B0aW9ucy5lbmdpbmVzW25hbWVdIHx8IG9wdGlvbnMuZW5naW5lc1thbGlhc2UobmFtZSldO1xuICBpZiAodHlwZW9mIGVuZ2luZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2dyYXktbWF0dGVyIGVuZ2luZSBcIicgKyBuYW1lICsgJ1wiIGlzIG5vdCByZWdpc3RlcmVkJyk7XG4gIH1cbiAgaWYgKHR5cGVvZiBlbmdpbmUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBlbmdpbmUgPSB7IHBhcnNlOiBlbmdpbmUgfTtcbiAgfVxuICByZXR1cm4gZW5naW5lO1xufTtcblxuZnVuY3Rpb24gYWxpYXNlKG5hbWUpIHtcbiAgc3dpdGNoIChuYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjYXNlICdqcyc6XG4gICAgY2FzZSAnamF2YXNjcmlwdCc6XG4gICAgICByZXR1cm4gJ2phdmFzY3JpcHQnO1xuICAgIGNhc2UgJ2NvZmZlZSc6XG4gICAgY2FzZSAnY29mZmVlc2NyaXB0JzpcbiAgICBjYXNlICdjc29uJzpcbiAgICAgIHJldHVybiAnY29mZmVlJztcbiAgICBjYXNlICd5YW1sJzpcbiAgICBjYXNlICd5bWwnOlxuICAgICAgcmV0dXJuICd5YW1sJztcbiAgICBkZWZhdWx0OiB7XG4gICAgICByZXR1cm4gbmFtZTtcbiAgICB9XG4gIH1cbn1cbiIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHR5cGVPZiA9IHJlcXVpcmUoJ2tpbmQtb2YnKTtcbmNvbnN0IGdldEVuZ2luZSA9IHJlcXVpcmUoJy4vZW5naW5lJyk7XG5jb25zdCBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmaWxlLCBkYXRhLCBvcHRpb25zKSB7XG4gIGlmIChkYXRhID09IG51bGwgJiYgb3B0aW9ucyA9PSBudWxsKSB7XG4gICAgc3dpdGNoICh0eXBlT2YoZmlsZSkpIHtcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIGRhdGEgPSBmaWxlLmRhdGE7XG4gICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICByZXR1cm4gZmlsZTtcbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhwZWN0ZWQgZmlsZSB0byBiZSBhIHN0cmluZyBvciBvYmplY3QnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCBzdHIgPSBmaWxlLmNvbnRlbnQ7XG4gIGNvbnN0IG9wdHMgPSBkZWZhdWx0cyhvcHRpb25zKTtcbiAgaWYgKGRhdGEgPT0gbnVsbCkge1xuICAgIGlmICghb3B0cy5kYXRhKSByZXR1cm4gZmlsZTtcbiAgICBkYXRhID0gb3B0cy5kYXRhO1xuICB9XG5cbiAgY29uc3QgbGFuZ3VhZ2UgPSBmaWxlLmxhbmd1YWdlIHx8IG9wdHMubGFuZ3VhZ2U7XG4gIGNvbnN0IGVuZ2luZSA9IGdldEVuZ2luZShsYW5ndWFnZSwgb3B0cyk7XG4gIGlmICh0eXBlb2YgZW5naW5lLnN0cmluZ2lmeSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4cGVjdGVkIFwiJyArIGxhbmd1YWdlICsgJy5zdHJpbmdpZnlcIiB0byBiZSBhIGZ1bmN0aW9uJyk7XG4gIH1cblxuICBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgZmlsZS5kYXRhLCBkYXRhKTtcbiAgY29uc3Qgb3BlbiA9IG9wdHMuZGVsaW1pdGVyc1swXTtcbiAgY29uc3QgY2xvc2UgPSBvcHRzLmRlbGltaXRlcnNbMV07XG4gIGNvbnN0IG1hdHRlciA9IGVuZ2luZS5zdHJpbmdpZnkoZGF0YSwgb3B0aW9ucykudHJpbSgpO1xuICBsZXQgYnVmID0gJyc7XG5cbiAgaWYgKG1hdHRlciAhPT0gJ3t9Jykge1xuICAgIGJ1ZiA9IG5ld2xpbmUob3BlbikgKyBuZXdsaW5lKG1hdHRlcikgKyBuZXdsaW5lKGNsb3NlKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgZmlsZS5leGNlcnB0ID09PSAnc3RyaW5nJyAmJiBmaWxlLmV4Y2VycHQgIT09ICcnKSB7XG4gICAgaWYgKHN0ci5pbmRleE9mKGZpbGUuZXhjZXJwdC50cmltKCkpID09PSAtMSkge1xuICAgICAgYnVmICs9IG5ld2xpbmUoZmlsZS5leGNlcnB0KSArIG5ld2xpbmUoY2xvc2UpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWYgKyBuZXdsaW5lKHN0cik7XG59O1xuXG5mdW5jdGlvbiBuZXdsaW5lKHN0cikge1xuICByZXR1cm4gc3RyLnNsaWNlKC0xKSAhPT0gJ1xcbicgPyBzdHIgKyAnXFxuJyA6IHN0cjtcbn1cbiIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGZpbGUsIG9wdGlvbnMpIHtcbiAgY29uc3Qgb3B0cyA9IGRlZmF1bHRzKG9wdGlvbnMpO1xuXG4gIGlmIChmaWxlLmRhdGEgPT0gbnVsbCkge1xuICAgIGZpbGUuZGF0YSA9IHt9O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBvcHRzLmV4Y2VycHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gb3B0cy5leGNlcnB0KGZpbGUsIG9wdHMpO1xuICB9XG5cbiAgY29uc3Qgc2VwID0gZmlsZS5kYXRhLmV4Y2VycHRfc2VwYXJhdG9yIHx8IG9wdHMuZXhjZXJwdF9zZXBhcmF0b3I7XG4gIGlmIChzZXAgPT0gbnVsbCAmJiAob3B0cy5leGNlcnB0ID09PSBmYWxzZSB8fCBvcHRzLmV4Y2VycHQgPT0gbnVsbCkpIHtcbiAgICByZXR1cm4gZmlsZTtcbiAgfVxuXG4gIGNvbnN0IGRlbGltaXRlciA9IHR5cGVvZiBvcHRzLmV4Y2VycHQgPT09ICdzdHJpbmcnXG4gICAgPyBvcHRzLmV4Y2VycHRcbiAgICA6IChzZXAgfHwgb3B0cy5kZWxpbWl0ZXJzWzBdKTtcblxuICAvLyBpZiBlbmFibGVkLCBnZXQgdGhlIGV4Y2VycHQgZGVmaW5lZCBhZnRlciBmcm9udC1tYXR0ZXJcbiAgY29uc3QgaWR4ID0gZmlsZS5jb250ZW50LmluZGV4T2YoZGVsaW1pdGVyKTtcbiAgaWYgKGlkeCAhPT0gLTEpIHtcbiAgICBmaWxlLmV4Y2VycHQgPSBmaWxlLmNvbnRlbnQuc2xpY2UoMCwgaWR4KTtcbiAgfVxuXG4gIHJldHVybiBmaWxlO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHR5cGVPZiA9IHJlcXVpcmUoJ2tpbmQtb2YnKTtcbmNvbnN0IHN0cmluZ2lmeSA9IHJlcXVpcmUoJy4vc3RyaW5naWZ5Jyk7XG5jb25zdCB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxuLyoqXG4gKiBOb3JtYWxpemUgdGhlIGdpdmVuIHZhbHVlIHRvIGVuc3VyZSBhbiBvYmplY3QgaXMgcmV0dXJuZWRcbiAqIHdpdGggdGhlIGV4cGVjdGVkIHByb3BlcnRpZXMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmaWxlKSB7XG4gIGlmICh0eXBlT2YoZmlsZSkgIT09ICdvYmplY3QnKSB7XG4gICAgZmlsZSA9IHsgY29udGVudDogZmlsZSB9O1xuICB9XG5cbiAgaWYgKHR5cGVPZihmaWxlLmRhdGEpICE9PSAnb2JqZWN0Jykge1xuICAgIGZpbGUuZGF0YSA9IHt9O1xuICB9XG5cbiAgLy8gaWYgZmlsZSB3YXMgcGFzc2VkIGFzIGFuIG9iamVjdCwgZW5zdXJlIHRoYXRcbiAgLy8gXCJmaWxlLmNvbnRlbnRcIiBpcyBzZXRcbiAgaWYgKGZpbGUuY29udGVudHMgJiYgZmlsZS5jb250ZW50ID09IG51bGwpIHtcbiAgICBmaWxlLmNvbnRlbnQgPSBmaWxlLmNvbnRlbnRzO1xuICB9XG5cbiAgLy8gc2V0IG5vbi1lbnVtZXJhYmxlIHByb3BlcnRpZXMgb24gdGhlIGZpbGUgb2JqZWN0XG4gIHV0aWxzLmRlZmluZShmaWxlLCAnb3JpZycsIHV0aWxzLnRvQnVmZmVyKGZpbGUuY29udGVudCkpO1xuICB1dGlscy5kZWZpbmUoZmlsZSwgJ2xhbmd1YWdlJywgZmlsZS5sYW5ndWFnZSB8fCAnJyk7XG4gIHV0aWxzLmRlZmluZShmaWxlLCAnbWF0dGVyJywgZmlsZS5tYXR0ZXIgfHwgJycpO1xuICB1dGlscy5kZWZpbmUoZmlsZSwgJ3N0cmluZ2lmeScsIGZ1bmN0aW9uKGRhdGEsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmxhbmd1YWdlKSB7XG4gICAgICBmaWxlLmxhbmd1YWdlID0gb3B0aW9ucy5sYW5ndWFnZTtcbiAgICB9XG4gICAgcmV0dXJuIHN0cmluZ2lmeShmaWxlLCBkYXRhLCBvcHRpb25zKTtcbiAgfSk7XG5cbiAgLy8gc3RyaXAgQk9NIGFuZCBlbnN1cmUgdGhhdCBcImZpbGUuY29udGVudFwiIGlzIGEgc3RyaW5nXG4gIGZpbGUuY29udGVudCA9IHV0aWxzLnRvU3RyaW5nKGZpbGUuY29udGVudCk7XG4gIGZpbGUuaXNFbXB0eSA9IGZhbHNlO1xuICBmaWxlLmV4Y2VycHQgPSAnJztcbiAgcmV0dXJuIGZpbGU7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZ2V0RW5naW5lID0gcmVxdWlyZSgnLi9lbmdpbmUnKTtcbmNvbnN0IGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxhbmd1YWdlLCBzdHIsIG9wdGlvbnMpIHtcbiAgY29uc3Qgb3B0cyA9IGRlZmF1bHRzKG9wdGlvbnMpO1xuICBjb25zdCBlbmdpbmUgPSBnZXRFbmdpbmUobGFuZ3VhZ2UsIG9wdHMpO1xuICBpZiAodHlwZW9mIGVuZ2luZS5wYXJzZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4cGVjdGVkIFwiJyArIGxhbmd1YWdlICsgJy5wYXJzZVwiIHRvIGJlIGEgZnVuY3Rpb24nKTtcbiAgfVxuICByZXR1cm4gZW5naW5lLnBhcnNlKHN0ciwgb3B0cyk7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuY29uc3Qgc2VjdGlvbnMgPSByZXF1aXJlKCdzZWN0aW9uLW1hdHRlcicpO1xuY29uc3QgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2xpYi9kZWZhdWx0cycpO1xuY29uc3Qgc3RyaW5naWZ5ID0gcmVxdWlyZSgnLi9saWIvc3RyaW5naWZ5Jyk7XG5jb25zdCBleGNlcnB0ID0gcmVxdWlyZSgnLi9saWIvZXhjZXJwdCcpO1xuY29uc3QgZW5naW5lcyA9IHJlcXVpcmUoJy4vbGliL2VuZ2luZXMnKTtcbmNvbnN0IHRvRmlsZSA9IHJlcXVpcmUoJy4vbGliL3RvLWZpbGUnKTtcbmNvbnN0IHBhcnNlID0gcmVxdWlyZSgnLi9saWIvcGFyc2UnKTtcbmNvbnN0IHV0aWxzID0gcmVxdWlyZSgnLi9saWIvdXRpbHMnKTtcblxuLyoqXG4gKiBUYWtlcyBhIHN0cmluZyBvciBvYmplY3Qgd2l0aCBgY29udGVudGAgcHJvcGVydHksIGV4dHJhY3RzXG4gKiBhbmQgcGFyc2VzIGZyb250LW1hdHRlciBmcm9tIHRoZSBzdHJpbmcsIHRoZW4gcmV0dXJucyBhbiBvYmplY3RcbiAqIHdpdGggYGRhdGFgLCBgY29udGVudGAgYW5kIG90aGVyIFt1c2VmdWwgcHJvcGVydGllc10oI3JldHVybmVkLW9iamVjdCkuXG4gKlxuICogYGBganNcbiAqIGNvbnN0IG1hdHRlciA9IHJlcXVpcmUoJ2dyYXktbWF0dGVyJyk7XG4gKiBjb25zb2xlLmxvZyhtYXR0ZXIoJy0tLVxcbnRpdGxlOiBIb21lXFxuLS0tXFxuT3RoZXIgc3R1ZmYnKSk7XG4gKiAvLz0+IHsgZGF0YTogeyB0aXRsZTogJ0hvbWUnfSwgY29udGVudDogJ090aGVyIHN0dWZmJyB9XG4gKiBgYGBcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gYGlucHV0YCBTdHJpbmcsIG9yIG9iamVjdCB3aXRoIGBjb250ZW50YCBzdHJpbmdcbiAqIEBwYXJhbSB7T2JqZWN0fSBgb3B0aW9uc2BcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gbWF0dGVyKGlucHV0LCBvcHRpb25zKSB7XG4gIGlmIChpbnB1dCA9PT0gJycpIHtcbiAgICByZXR1cm4geyBkYXRhOiB7fSwgY29udGVudDogaW5wdXQsIGV4Y2VycHQ6ICcnLCBvcmlnOiBpbnB1dCB9O1xuICB9XG5cbiAgbGV0IGZpbGUgPSB0b0ZpbGUoaW5wdXQpO1xuICBjb25zdCBjYWNoZWQgPSBtYXR0ZXIuY2FjaGVbZmlsZS5jb250ZW50XTtcblxuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBpZiAoY2FjaGVkKSB7XG4gICAgICBmaWxlID0gT2JqZWN0LmFzc2lnbih7fSwgY2FjaGVkKTtcbiAgICAgIGZpbGUub3JpZyA9IGNhY2hlZC5vcmlnO1xuICAgICAgcmV0dXJuIGZpbGU7XG4gICAgfVxuXG4gICAgLy8gb25seSBjYWNoZSBpZiB0aGVyZSBhcmUgbm8gb3B0aW9ucyBwYXNzZWQuIGlmIHdlIGNhY2hlIHdoZW4gb3B0aW9uc1xuICAgIC8vIGFyZSBwYXNzZWQsIHdlIHdvdWxkIG5lZWQgdG8gYWxzbyBjYWNoZSBvcHRpb25zIHZhbHVlcywgd2hpY2ggd291bGRcbiAgICAvLyBuZWdhdGUgYW55IHBlcmZvcm1hbmNlIGJlbmVmaXRzIG9mIGNhY2hpbmdcbiAgICBtYXR0ZXIuY2FjaGVbZmlsZS5jb250ZW50XSA9IGZpbGU7XG4gIH1cblxuICByZXR1cm4gcGFyc2VNYXR0ZXIoZmlsZSwgb3B0aW9ucyk7XG59XG5cbi8qKlxuICogUGFyc2UgZnJvbnQgbWF0dGVyXG4gKi9cblxuZnVuY3Rpb24gcGFyc2VNYXR0ZXIoZmlsZSwgb3B0aW9ucykge1xuICBjb25zdCBvcHRzID0gZGVmYXVsdHMob3B0aW9ucyk7XG4gIGNvbnN0IG9wZW4gPSBvcHRzLmRlbGltaXRlcnNbMF07XG4gIGNvbnN0IGNsb3NlID0gJ1xcbicgKyBvcHRzLmRlbGltaXRlcnNbMV07XG4gIGxldCBzdHIgPSBmaWxlLmNvbnRlbnQ7XG5cbiAgaWYgKG9wdHMubGFuZ3VhZ2UpIHtcbiAgICBmaWxlLmxhbmd1YWdlID0gb3B0cy5sYW5ndWFnZTtcbiAgfVxuXG4gIC8vIGdldCB0aGUgbGVuZ3RoIG9mIHRoZSBvcGVuaW5nIGRlbGltaXRlclxuICBjb25zdCBvcGVuTGVuID0gb3Blbi5sZW5ndGg7XG4gIGlmICghdXRpbHMuc3RhcnRzV2l0aChzdHIsIG9wZW4sIG9wZW5MZW4pKSB7XG4gICAgZXhjZXJwdChmaWxlLCBvcHRzKTtcbiAgICByZXR1cm4gZmlsZTtcbiAgfVxuXG4gIC8vIGlmIHRoZSBuZXh0IGNoYXJhY3RlciBhZnRlciB0aGUgb3BlbmluZyBkZWxpbWl0ZXIgaXNcbiAgLy8gYSBjaGFyYWN0ZXIgZnJvbSB0aGUgZGVsaW1pdGVyLCB0aGVuIGl0J3Mgbm90IGEgZnJvbnQtXG4gIC8vIG1hdHRlciBkZWxpbWl0ZXJcbiAgaWYgKHN0ci5jaGFyQXQob3BlbkxlbikgPT09IG9wZW4uc2xpY2UoLTEpKSB7XG4gICAgcmV0dXJuIGZpbGU7XG4gIH1cblxuICAvLyBzdHJpcCB0aGUgb3BlbmluZyBkZWxpbWl0ZXJcbiAgc3RyID0gc3RyLnNsaWNlKG9wZW5MZW4pO1xuICBjb25zdCBsZW4gPSBzdHIubGVuZ3RoO1xuXG4gIC8vIHVzZSB0aGUgbGFuZ3VhZ2UgZGVmaW5lZCBhZnRlciBmaXJzdCBkZWxpbWl0ZXIsIGlmIGl0IGV4aXN0c1xuICBjb25zdCBsYW5ndWFnZSA9IG1hdHRlci5sYW5ndWFnZShzdHIsIG9wdHMpO1xuICBpZiAobGFuZ3VhZ2UubmFtZSkge1xuICAgIGZpbGUubGFuZ3VhZ2UgPSBsYW5ndWFnZS5uYW1lO1xuICAgIHN0ciA9IHN0ci5zbGljZShsYW5ndWFnZS5yYXcubGVuZ3RoKTtcbiAgfVxuXG4gIC8vIGdldCB0aGUgaW5kZXggb2YgdGhlIGNsb3NpbmcgZGVsaW1pdGVyXG4gIGxldCBjbG9zZUluZGV4ID0gc3RyLmluZGV4T2YoY2xvc2UpO1xuICBpZiAoY2xvc2VJbmRleCA9PT0gLTEpIHtcbiAgICBjbG9zZUluZGV4ID0gbGVuO1xuICB9XG5cbiAgLy8gZ2V0IHRoZSByYXcgZnJvbnQtbWF0dGVyIGJsb2NrXG4gIGZpbGUubWF0dGVyID0gc3RyLnNsaWNlKDAsIGNsb3NlSW5kZXgpO1xuXG4gIGNvbnN0IGJsb2NrID0gZmlsZS5tYXR0ZXIucmVwbGFjZSgvXlxccyojW15cXG5dKy9nbSwgJycpLnRyaW0oKTtcbiAgaWYgKGJsb2NrID09PSAnJykge1xuICAgIGZpbGUuaXNFbXB0eSA9IHRydWU7XG4gICAgZmlsZS5lbXB0eSA9IGZpbGUuY29udGVudDtcbiAgICBmaWxlLmRhdGEgPSB7fTtcbiAgfSBlbHNlIHtcblxuICAgIC8vIGNyZWF0ZSBmaWxlLmRhdGEgYnkgcGFyc2luZyB0aGUgcmF3IGZpbGUubWF0dGVyIGJsb2NrXG4gICAgZmlsZS5kYXRhID0gcGFyc2UoZmlsZS5sYW5ndWFnZSwgZmlsZS5tYXR0ZXIsIG9wdHMpO1xuICB9XG5cbiAgLy8gdXBkYXRlIGZpbGUuY29udGVudFxuICBpZiAoY2xvc2VJbmRleCA9PT0gbGVuKSB7XG4gICAgZmlsZS5jb250ZW50ID0gJyc7XG4gIH0gZWxzZSB7XG4gICAgZmlsZS5jb250ZW50ID0gc3RyLnNsaWNlKGNsb3NlSW5kZXggKyBjbG9zZS5sZW5ndGgpO1xuICAgIGlmIChmaWxlLmNvbnRlbnRbMF0gPT09ICdcXHInKSB7XG4gICAgICBmaWxlLmNvbnRlbnQgPSBmaWxlLmNvbnRlbnQuc2xpY2UoMSk7XG4gICAgfVxuICAgIGlmIChmaWxlLmNvbnRlbnRbMF0gPT09ICdcXG4nKSB7XG4gICAgICBmaWxlLmNvbnRlbnQgPSBmaWxlLmNvbnRlbnQuc2xpY2UoMSk7XG4gICAgfVxuICB9XG5cbiAgZXhjZXJwdChmaWxlLCBvcHRzKTtcblxuICBpZiAob3B0cy5zZWN0aW9ucyA9PT0gdHJ1ZSB8fCB0eXBlb2Ygb3B0cy5zZWN0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgc2VjdGlvbnMoZmlsZSwgb3B0cy5zZWN0aW9uKTtcbiAgfVxuICByZXR1cm4gZmlsZTtcbn1cblxuLyoqXG4gKiBFeHBvc2UgZW5naW5lc1xuICovXG5cbm1hdHRlci5lbmdpbmVzID0gZW5naW5lcztcblxuLyoqXG4gKiBTdHJpbmdpZnkgYW4gb2JqZWN0IHRvIFlBTUwgb3IgdGhlIHNwZWNpZmllZCBsYW5ndWFnZSwgYW5kXG4gKiBhcHBlbmQgaXQgdG8gdGhlIGdpdmVuIHN0cmluZy4gQnkgZGVmYXVsdCwgb25seSBZQU1MIGFuZCBKU09OXG4gKiBjYW4gYmUgc3RyaW5naWZpZWQuIFNlZSB0aGUgW2VuZ2luZXNdKCNlbmdpbmVzKSBzZWN0aW9uIHRvIGxlYXJuXG4gKiBob3cgdG8gc3RyaW5naWZ5IG90aGVyIGxhbmd1YWdlcy5cbiAqXG4gKiBgYGBqc1xuICogY29uc29sZS5sb2cobWF0dGVyLnN0cmluZ2lmeSgnZm9vIGJhciBiYXonLCB7dGl0bGU6ICdIb21lJ30pKTtcbiAqIC8vIHJlc3VsdHMgaW46XG4gKiAvLyAtLS1cbiAqIC8vIHRpdGxlOiBIb21lXG4gKiAvLyAtLS1cbiAqIC8vIGZvbyBiYXIgYmF6XG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gYGZpbGVgIFRoZSBjb250ZW50IHN0cmluZyB0byBhcHBlbmQgdG8gc3RyaW5naWZpZWQgZnJvbnQtbWF0dGVyLCBvciBhIGZpbGUgb2JqZWN0IHdpdGggYGZpbGUuY29udGVudGAgc3RyaW5nLlxuICogQHBhcmFtIHtPYmplY3R9IGBkYXRhYCBGcm9udCBtYXR0ZXIgdG8gc3RyaW5naWZ5LlxuICogQHBhcmFtIHtPYmplY3R9IGBvcHRpb25zYCBbT3B0aW9uc10oI29wdGlvbnMpIHRvIHBhc3MgdG8gZ3JheS1tYXR0ZXIgYW5kIFtqcy15YW1sXS5cbiAqIEByZXR1cm4ge1N0cmluZ30gUmV0dXJucyBhIHN0cmluZyBjcmVhdGVkIGJ5IHdyYXBwaW5nIHN0cmluZ2lmaWVkIHlhbWwgd2l0aCBkZWxpbWl0ZXJzLCBhbmQgYXBwZW5kaW5nIHRoYXQgdG8gdGhlIGdpdmVuIHN0cmluZy5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubWF0dGVyLnN0cmluZ2lmeSA9IGZ1bmN0aW9uKGZpbGUsIGRhdGEsIG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBmaWxlID09PSAnc3RyaW5nJykgZmlsZSA9IG1hdHRlcihmaWxlLCBvcHRpb25zKTtcbiAgcmV0dXJuIHN0cmluZ2lmeShmaWxlLCBkYXRhLCBvcHRpb25zKTtcbn07XG5cbi8qKlxuICogU3luY2hyb25vdXNseSByZWFkIGEgZmlsZSBmcm9tIHRoZSBmaWxlIHN5c3RlbSBhbmQgcGFyc2VcbiAqIGZyb250IG1hdHRlci4gUmV0dXJucyB0aGUgc2FtZSBvYmplY3QgYXMgdGhlIFttYWluIGZ1bmN0aW9uXSgjbWF0dGVyKS5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgZmlsZSA9IG1hdHRlci5yZWFkKCcuL2NvbnRlbnQvYmxvZy1wb3N0Lm1kJyk7XG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBgZmlsZXBhdGhgIGZpbGUgcGF0aCBvZiB0aGUgZmlsZSB0byByZWFkLlxuICogQHBhcmFtIHtPYmplY3R9IGBvcHRpb25zYCBbT3B0aW9uc10oI29wdGlvbnMpIHRvIHBhc3MgdG8gZ3JheS1tYXR0ZXIuXG4gKiBAcmV0dXJuIHtPYmplY3R9IFJldHVybnMgW2FuIG9iamVjdF0oI3JldHVybmVkLW9iamVjdCkgd2l0aCBgZGF0YWAgYW5kIGBjb250ZW50YFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tYXR0ZXIucmVhZCA9IGZ1bmN0aW9uKGZpbGVwYXRoLCBvcHRpb25zKSB7XG4gIGNvbnN0IHN0ciA9IGZzLnJlYWRGaWxlU3luYyhmaWxlcGF0aCwgJ3V0ZjgnKTtcbiAgY29uc3QgZmlsZSA9IG1hdHRlcihzdHIsIG9wdGlvbnMpO1xuICBmaWxlLnBhdGggPSBmaWxlcGF0aDtcbiAgcmV0dXJuIGZpbGU7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gYHN0cmluZ2AgaGFzIGZyb250IG1hdHRlci5cbiAqIEBwYXJhbSAge1N0cmluZ30gYHN0cmluZ2BcbiAqIEBwYXJhbSAge09iamVjdH0gYG9wdGlvbnNgXG4gKiBAcmV0dXJuIHtCb29sZWFufSBUcnVlIGlmIGZyb250IG1hdHRlciBleGlzdHMuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1hdHRlci50ZXN0ID0gZnVuY3Rpb24oc3RyLCBvcHRpb25zKSB7XG4gIHJldHVybiB1dGlscy5zdGFydHNXaXRoKHN0ciwgZGVmYXVsdHMob3B0aW9ucykuZGVsaW1pdGVyc1swXSk7XG59O1xuXG4vKipcbiAqIERldGVjdCB0aGUgbGFuZ3VhZ2UgdG8gdXNlLCBpZiBvbmUgaXMgZGVmaW5lZCBhZnRlciB0aGVcbiAqIGZpcnN0IGZyb250LW1hdHRlciBkZWxpbWl0ZXIuXG4gKiBAcGFyYW0gIHtTdHJpbmd9IGBzdHJpbmdgXG4gKiBAcGFyYW0gIHtPYmplY3R9IGBvcHRpb25zYFxuICogQHJldHVybiB7T2JqZWN0fSBPYmplY3Qgd2l0aCBgcmF3YCAoYWN0dWFsIGxhbmd1YWdlIHN0cmluZyksIGFuZCBgbmFtZWAsIHRoZSBsYW5ndWFnZSB3aXRoIHdoaXRlc3BhY2UgdHJpbW1lZFxuICovXG5cbm1hdHRlci5sYW5ndWFnZSA9IGZ1bmN0aW9uKHN0ciwgb3B0aW9ucykge1xuICBjb25zdCBvcHRzID0gZGVmYXVsdHMob3B0aW9ucyk7XG4gIGNvbnN0IG9wZW4gPSBvcHRzLmRlbGltaXRlcnNbMF07XG5cbiAgaWYgKG1hdHRlci50ZXN0KHN0cikpIHtcbiAgICBzdHIgPSBzdHIuc2xpY2Uob3Blbi5sZW5ndGgpO1xuICB9XG5cbiAgY29uc3QgbGFuZ3VhZ2UgPSBzdHIuc2xpY2UoMCwgc3RyLnNlYXJjaCgvXFxyP1xcbi8pKTtcbiAgcmV0dXJuIHtcbiAgICByYXc6IGxhbmd1YWdlLFxuICAgIG5hbWU6IGxhbmd1YWdlID8gbGFuZ3VhZ2UudHJpbSgpIDogJydcbiAgfTtcbn07XG5cbi8qKlxuICogRXhwb3NlIGBtYXR0ZXJgXG4gKi9cblxubWF0dGVyLmNhY2hlID0ge307XG5tYXR0ZXIuY2xlYXJDYWNoZSA9IGZ1bmN0aW9uKCkge1xuICBtYXR0ZXIuY2FjaGUgPSB7fTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IG1hdHRlcjtcbiIsICJpbXBvcnQgeyBOb3RpY2UsIFBsdWdpbiwgbm9ybWFsaXplUGF0aCwgVEZpbGUgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHVybiB9IGZyb20gXCIuL2NvbnZlcnNhdGlvblwiO1xuaW1wb3J0IHsgc2F2ZUNvbnZlcnNhdGlvbkZyb21UdXJucyB9IGZyb20gXCIuL2NvbnZlcnNhdGlvblN0b3JlXCI7XG5pbXBvcnQgeyBPdmxBcGlDbGllbnQgfSBmcm9tIFwiLi9hcGlcIjtcbmltcG9ydCB7IGFwcGVuZEVycm9yTG9nIH0gZnJvbSBcIi4vbG9nZ2luZ1wiO1xuaW1wb3J0IHsgU2F2ZUNvbnZlcnNhdGlvbk1vZGFsLCBTYXZlQ29udmVyc2F0aW9uRm9ybSB9IGZyb20gXCIuL21vZGFscy9zYXZlQ29udmVyc2F0aW9uTW9kYWxcIjtcbmltcG9ydCB7IHBhcnNlVHVybnMgfSBmcm9tIFwiLi9wYXJzZVR1cm5zXCI7XG5pbXBvcnQgeyBPdmxTZXR0aW5nVGFiIH0gZnJvbSBcIi4vc2V0dGluZ3NcIjtcbmltcG9ydCB7IERFRkFVTFRfU0VUVElOR1MsIE92bFNldHRpbmdzLCBFTUJFRERJTkdfUFJFU0VUUyB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyBDaGF0VmlldywgVklFV19UWVBFX09WTF9DSEFUIH0gZnJvbSBcIi4vdmlld3MvY2hhdFZpZXdcIjtcbmltcG9ydCB7IEluZGV4ZXIgfSBmcm9tIFwiLi9pbmRleGluZy9pbmRleGVyXCI7XG5pbXBvcnQgeyBWYXVsdFdhdGNoZXIgfSBmcm9tIFwiLi92YXVsdFdhdGNoZXJcIjtcbmltcG9ydCB7IGpvaW4gfSBmcm9tIFwicGF0aFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPdmxQbHVnaW4gZXh0ZW5kcyBQbHVnaW4ge1xuICBwdWJsaWMgc2V0dGluZ3M6IE92bFNldHRpbmdzID0geyAuLi5ERUZBVUxUX1NFVFRJTkdTIH07XG4gIHByaXZhdGUgYXBpQ2xpZW50OiBPdmxBcGlDbGllbnQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBpbmRleGVyOiBJbmRleGVyIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgdmF1bHRXYXRjaGVyOiBWYXVsdFdhdGNoZXIgfCBudWxsID0gbnVsbDtcblxuICBhc3luYyBvbmxvYWQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5sb2FkU2V0dGluZ3MoKTtcblxuICAgIC8vIEFQSSBcdUQ2MzhcdUNEOUMgXHVCODVDXHVDOUMxXHVDNzQ0IFx1QkQ4NFx1QjlBQ1x1RDU3NCBcdUMwQzFcdUQwRENcdUI5N0MgXHVDNzIwXHVDOUMwXHVENTY5XHVCMkM4XHVCMkU0LlxuICAgIHRoaXMuYXBpQ2xpZW50ID0gbmV3IE92bEFwaUNsaWVudChcbiAgICAgICgpID0+IHRoaXMuc2V0dGluZ3MsXG4gICAgICAoY29udGV4dDogc3RyaW5nLCBkZXRhaWw6IHVua25vd24pID0+XG4gICAgICAgIGFwcGVuZEVycm9yTG9nKHRoaXMuYXBwLCB0aGlzLm1hbmlmZXN0LCBjb250ZXh0LCBkZXRhaWwpXG4gICAgKTtcblxuICAgIC8vIFx1Qzc3OFx1QjM3MVx1QzJGMSBcdUNEMDhcdUFFMzBcdUQ2NTRcbiAgICBpZiAodGhpcy5zZXR0aW5ncy5pbmRleGluZ0VuYWJsZWQpIHtcbiAgICAgIGF3YWl0IHRoaXMuaW5pdGlhbGl6ZUluZGV4aW5nKCk7XG4gICAgfVxuXG4gICAgLy8gXHVDMEFDXHVDNzc0XHVCNERDXHVCQzE0IFx1Q0M0NFx1RDMwNSBcdUJERjAgXHVCNEYxXHVCODVEXG4gICAgdGhpcy5yZWdpc3RlclZpZXcoVklFV19UWVBFX09WTF9DSEFULCAobGVhZikgPT4gbmV3IENoYXRWaWV3KGxlYWYsIHRoaXMpKTtcblxuICAgIHRoaXMuYWRkUmliYm9uSWNvbihcIm1lc3NhZ2UtY2lyY2xlXCIsIFwiT1ZMIFx1QjMwMFx1RDY1NCBcdUM1RjRcdUFFMzBcIiwgKCkgPT4ge1xuICAgICAgdm9pZCB0aGlzLm9wZW5DaGF0VmlldygpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5hZGRDb21tYW5kKHtcbiAgICAgIGlkOiBcIm92bC1vcGVuLWNoYXRcIixcbiAgICAgIG5hbWU6IFwiT1ZMIFx1QjMwMFx1RDY1NCBcdUNDM0QgXHVDNUY0XHVBRTMwXCIsXG4gICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICB2b2lkIHRoaXMub3BlbkNoYXRWaWV3KCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZENvbW1hbmQoe1xuICAgICAgaWQ6IFwib3ZsLXNhdmUtY29udmVyc2F0aW9uXCIsXG4gICAgICBuYW1lOiBcIlx1QjMwMFx1RDY1NCBKU09OXHVDNUQwXHVDMTFDIFx1QjlDOFx1RDA2Q1x1QjJFNFx1QzZCNCBcdUM4MDBcdUM3QTVcIixcbiAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgIG5ldyBTYXZlQ29udmVyc2F0aW9uTW9kYWwodGhpcywgKGZvcm0pID0+IHtcbiAgICAgICAgICB2b2lkIHRoaXMuaGFuZGxlU2F2ZUNvbnZlcnNhdGlvbihmb3JtKTtcbiAgICAgICAgfSkub3BlbigpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5hZGRDb21tYW5kKHtcbiAgICAgIGlkOiBcIm92bC1pbmRleC12YXVsdFwiLFxuICAgICAgbmFtZTogXCJcdUJDRkNcdUQyQjggXHVDNzc4XHVCMzcxXHVDMkYxIFx1QzJEQ1x1Qzc5MVwiLFxuICAgICAgY2FsbGJhY2s6ICgpID0+IHtcbiAgICAgICAgdm9pZCB0aGlzLnN0YXJ0SW5kZXhpbmcoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuYWRkU2V0dGluZ1RhYihuZXcgT3ZsU2V0dGluZ1RhYih0aGlzKSk7XG4gIH1cblxuICBvbnVubG9hZCgpOiB2b2lkIHtcbiAgICB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0TGVhdmVzT2ZUeXBlKFZJRVdfVFlQRV9PVkxfQ0hBVCkuZm9yRWFjaCgobGVhZikgPT4ge1xuICAgICAgbGVhZi5kZXRhY2goKTtcbiAgICB9KTtcblxuICAgIC8vIFx1Qzc3OFx1QjM3MVx1QzExQyBcdUM4MTVcdUI5QUNcbiAgICBpZiAodGhpcy5pbmRleGVyKSB7XG4gICAgICB0aGlzLmluZGV4ZXIuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogXHVDNzc4XHVCMzcxXHVDMkYxIFx1QzJEQ1x1QzJBNFx1RDE1QyBcdUNEMDhcdUFFMzBcdUQ2NTRcbiAgICovXG4gIHByaXZhdGUgYXN5bmMgaW5pdGlhbGl6ZUluZGV4aW5nKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICAvLyBcdUIzNzBcdUM3NzRcdUQxMzAgXHVCNTE0XHVCODA5XHVEMUEwXHVCOUFDIFx1QUNCRFx1Qjg1Q1xuICAgICAgY29uc3QgZGF0YURpciA9IGpvaW4oXG4gICAgICAgIC8vIEB0cy1pZ25vcmUgLSBPYnNpZGlhbiBBUElcdUM3NTggXHVCMEI0XHVCRDgwIFx1QzE4RFx1QzEzMSBcdUMwQUNcdUM2QTlcbiAgICAgICAgdGhpcy5hcHAudmF1bHQuYWRhcHRlci5iYXNlUGF0aCxcbiAgICAgICAgXCIub2JzaWRpYW5cIixcbiAgICAgICAgXCJwbHVnaW5zXCIsXG4gICAgICAgIHRoaXMubWFuaWZlc3QuaWRcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IG1ldGFEYlBhdGggPSBqb2luKGRhdGFEaXIsIFwibWV0YS5kYlwiKTtcbiAgICAgIGNvbnN0IHZlY3RvckRiUGF0aCA9IGpvaW4oZGF0YURpciwgXCJ2ZWN0b3JzLmRiXCIpO1xuXG4gICAgICAvLyBcdUM3NzhcdUIzNzFcdUMxMUMgXHVDMEREXHVDMTMxXG4gICAgICB0aGlzLmluZGV4ZXIgPSBuZXcgSW5kZXhlcih7XG4gICAgICAgIGNodW5rU2l6ZTogdGhpcy5zZXR0aW5ncy5jaHVua1NpemUsXG4gICAgICAgIGNodW5rT3ZlcmxhcDogdGhpcy5zZXR0aW5ncy5jaHVua092ZXJsYXAsXG4gICAgICAgIHRvcEs6IHRoaXMuc2V0dGluZ3MudG9wSyxcbiAgICAgICAgZW1iZWRkaW5nUHJvdmlkZXI6IHRoaXMuc2V0dGluZ3MuZW1iZWRkaW5nUHJvdmlkZXIsXG4gICAgICAgIGVtYmVkZGluZ01vZGVsOiB0aGlzLnNldHRpbmdzLmVtYmVkZGluZ01vZGVsLFxuICAgICAgICBlbWJlZGRpbmdBcGlLZXk6IHRoaXMuc2V0dGluZ3MuZW1iZWRkaW5nQXBpS2V5IHx8IHRoaXMuc2V0dGluZ3MuYXBpS2V5LFxuICAgICAgICBlbWJlZGRpbmdBcGlVcmw6IHRoaXMuZ2V0RW1iZWRkaW5nQXBpVXJsKCksXG4gICAgICAgIG1ldGFEYlBhdGgsXG4gICAgICAgIHZlY3RvckRiUGF0aCxcbiAgICAgIH0pO1xuXG4gICAgICBhd2FpdCB0aGlzLmluZGV4ZXIuaW5pdGlhbGl6ZSgpO1xuXG4gICAgICAvLyBcdUJDRkNcdUQyQjggXHVDNkNDXHVDQzk4IFx1QzEyNFx1QzgxNVxuICAgICAgdGhpcy52YXVsdFdhdGNoZXIgPSBuZXcgVmF1bHRXYXRjaGVyKHRoaXMuYXBwLnZhdWx0KTtcbiAgICAgIHRoaXMudmF1bHRXYXRjaGVyLnNldEluZGV4ZXIodGhpcy5pbmRleGVyKTtcblxuICAgICAgLy8gXHVEMzBDXHVDNzdDIFx1Qzc3NFx1QkNBNFx1RDJCOCBcdUI5QUNcdUMyQTRcdUIxMDggXHVCNEYxXHVCODVEXG4gICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXG4gICAgICAgIHRoaXMuYXBwLnZhdWx0Lm9uKFwiY3JlYXRlXCIsIChmaWxlKSA9PiB7XG4gICAgICAgICAgaWYgKGZpbGUgaW5zdGFuY2VvZiBURmlsZSkge1xuICAgICAgICAgICAgdm9pZCB0aGlzLnZhdWx0V2F0Y2hlcj8ub25GaWxlQ3JlYXRlKGZpbGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChcbiAgICAgICAgdGhpcy5hcHAudmF1bHQub24oXCJtb2RpZnlcIiwgKGZpbGUpID0+IHtcbiAgICAgICAgICBpZiAoZmlsZSBpbnN0YW5jZW9mIFRGaWxlKSB7XG4gICAgICAgICAgICB2b2lkIHRoaXMudmF1bHRXYXRjaGVyPy5vbkZpbGVNb2RpZnkoZmlsZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFxuICAgICAgICB0aGlzLmFwcC52YXVsdC5vbihcImRlbGV0ZVwiLCAoZmlsZSkgPT4ge1xuICAgICAgICAgIGlmIChmaWxlIGluc3RhbmNlb2YgVEZpbGUpIHtcbiAgICAgICAgICAgIHRoaXMudmF1bHRXYXRjaGVyPy5vbkZpbGVEZWxldGUoZmlsZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFxuICAgICAgICB0aGlzLmFwcC52YXVsdC5vbihcInJlbmFtZVwiLCAoZmlsZSwgb2xkUGF0aCkgPT4ge1xuICAgICAgICAgIGlmIChmaWxlIGluc3RhbmNlb2YgVEZpbGUpIHtcbiAgICAgICAgICAgIHZvaWQgdGhpcy52YXVsdFdhdGNoZXI/Lm9uRmlsZVJlbmFtZShmaWxlLCBvbGRQYXRoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgICBjb25zb2xlLmxvZyhcIlx1Qzc3OFx1QjM3MVx1QzJGMSBcdUMyRENcdUMyQTRcdUQxNUMgXHVDRDA4XHVBRTMwXHVENjU0IFx1QzY0NFx1QjhDQ1wiKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIlx1Qzc3OFx1QjM3MVx1QzJGMSBcdUMyRENcdUMyQTRcdUQxNUMgXHVDRDA4XHVBRTMwXHVENjU0IFx1QzJFNFx1RDMyODpcIiwgZXJyb3IpO1xuICAgICAgbmV3IE5vdGljZShcIlx1Qzc3OFx1QjM3MVx1QzJGMSBcdUMyRENcdUMyQTRcdUQxNUMgXHVDRDA4XHVBRTMwXHVENjU0XHVDNUQwIFx1QzJFNFx1RDMyOFx1RDU4OFx1QzJCNVx1QjJDOFx1QjJFNFwiKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogXHVCQ0ZDXHVEMkI4IFx1Qzc3OFx1QjM3MVx1QzJGMSBcdUMyRENcdUM3OTFcbiAgICovXG4gIHByaXZhdGUgYXN5bmMgc3RhcnRJbmRleGluZygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIXRoaXMuc2V0dGluZ3MuaW5kZXhpbmdFbmFibGVkKSB7XG4gICAgICBuZXcgTm90aWNlKFwiXHVCQTNDXHVDODAwIFx1QzEyNFx1QzgxNVx1QzVEMFx1QzExQyBcdUM3NzhcdUIzNzFcdUMyRjFcdUM3NDQgXHVENjVDXHVDMTMxXHVENjU0XHVENTc0IFx1QzhGQ1x1QzEzOFx1QzY5NFwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuaW5kZXhlcikge1xuICAgICAgYXdhaXQgdGhpcy5pbml0aWFsaXplSW5kZXhpbmcoKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMudmF1bHRXYXRjaGVyKSB7XG4gICAgICBuZXcgTm90aWNlKFwiXHVDNzc4XHVCMzcxXHVDMkYxIFx1QzJEQ1x1QzJBNFx1RDE1Q1x1Qzc3NCBcdUNEMDhcdUFFMzBcdUQ2NTRcdUI0MThcdUM5QzAgXHVDNTRBXHVDNTU4XHVDMkI1XHVCMkM4XHVCMkU0XCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBhd2FpdCB0aGlzLnZhdWx0V2F0Y2hlci5pbmRleFZhdWx0KCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJcdUJDRkNcdUQyQjggXHVDNzc4XHVCMzcxXHVDMkYxIFx1QzJFNFx1RDMyODpcIiwgZXJyb3IpO1xuICAgICAgbmV3IE5vdGljZShcIlx1QkNGQ1x1RDJCOCBcdUM3NzhcdUIzNzFcdUMyRjFcdUM1RDAgXHVDMkU0XHVEMzI4XHVENTg4XHVDMkI1XHVCMkM4XHVCMkU0XCIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBcdUJDQTFcdUQxMzAgXHVBQzgwXHVDMEM5IFx1QzIxOFx1RDU4OVxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNlYXJjaChxdWVyeTogc3RyaW5nKTogUHJvbWlzZTxBcnJheTx7IGNodW5rOiBhbnk7IG5vdGU6IGFueTsgc2NvcmU6IG51bWJlciB9Pj4ge1xuICAgIGlmICghdGhpcy5pbmRleGVyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJcdUM3NzhcdUIzNzFcdUMyRjFcdUM3NzQgXHVENjVDXHVDMTMxXHVENjU0XHVCNDE4XHVDOUMwIFx1QzU0QVx1QzU1OFx1QzJCNVx1QjJDOFx1QjJFNFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBzZWFyY2hSZXN1bHRzID0gYXdhaXQgdGhpcy5pbmRleGVyLnNlYXJjaChxdWVyeSk7XG4gICAgcmV0dXJuIHRoaXMuaW5kZXhlci5nZXRTZWFyY2hSZXN1bHRzV2l0aE1ldGFkYXRhKHNlYXJjaFJlc3VsdHMpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBvcGVuQ2hhdFZpZXcoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgZXhpc3RpbmdMZWFmID0gdGhpcy5hcHAud29ya3NwYWNlLmdldExlYXZlc09mVHlwZShWSUVXX1RZUEVfT1ZMX0NIQVQpWzBdO1xuICAgIGNvbnN0IGxlYWYgPSBleGlzdGluZ0xlYWYgPz8gdGhpcy5hcHAud29ya3NwYWNlLmdldFJpZ2h0TGVhZihmYWxzZSk7XG4gICAgaWYgKCFsZWFmKSB7XG4gICAgICBuZXcgTm90aWNlKFwiXHVCMzAwXHVENjU0IFx1Q0MzRFx1Qzc0NCBcdUM1RjQgXHVDMjE4IFx1QzVDNlx1QzJCNVx1QjJDOFx1QjJFNC5cIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYXdhaXQgbGVhZi5zZXRWaWV3U3RhdGUoeyB0eXBlOiBWSUVXX1RZUEVfT1ZMX0NIQVQsIGFjdGl2ZTogdHJ1ZSB9KTtcbiAgICB0aGlzLmFwcC53b3Jrc3BhY2UucmV2ZWFsTGVhZihsZWFmKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyByZXF1ZXN0QXNzaXN0YW50UmVwbHkodHVybnM6IENvbnZlcnNhdGlvblR1cm5bXSk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgaWYgKCF0aGlzLmFwaUNsaWVudCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQVBJIFx1RDA3NFx1Qjc3Q1x1Qzc3NFx1QzVCOFx1RDJCOFx1Qjk3QyBcdUNEMDhcdUFFMzBcdUQ2NTRcdUQ1NjAgXHVDMjE4IFx1QzVDNlx1QzJCNVx1QjJDOFx1QjJFNC5cIik7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmFwaUNsaWVudC5yZXF1ZXN0QXNzaXN0YW50UmVwbHkodHVybnMpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHNhdmVDb252ZXJzYXRpb25Gcm9tVHVybnMoXG4gICAgc2Vzc2lvbklkOiBzdHJpbmcsXG4gICAgdHVybnM6IENvbnZlcnNhdGlvblR1cm5bXSxcbiAgICBvdXRwdXRGb2xkZXI6IHN0cmluZ1xuICApOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiBzYXZlQ29udmVyc2F0aW9uRnJvbVR1cm5zKHRoaXMuYXBwLnZhdWx0LCBzZXNzaW9uSWQsIHR1cm5zLCBvdXRwdXRGb2xkZXIpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBsb2FkU2V0dGluZ3MoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5zZXR0aW5ncyA9IHsgLi4uREVGQVVMVF9TRVRUSU5HUywgLi4uKGF3YWl0IHRoaXMubG9hZERhdGEoKSkgfTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzYXZlU2V0dGluZ3MoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgaGFuZGxlU2F2ZUNvbnZlcnNhdGlvbihmb3JtOiBTYXZlQ29udmVyc2F0aW9uRm9ybSk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIWZvcm0uaW5wdXRQYXRoKSB7XG4gICAgICAgIG5ldyBOb3RpY2UoXCJKU09OIFx1RDMwQ1x1Qzc3QyBcdUFDQkRcdUI4NUNcdUI5N0MgXHVDNzg1XHVCODI1XHVENTc0IFx1QzhGQ1x1QzEzOFx1QzY5NC5cIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICghZm9ybS5zZXNzaW9uSWQpIHtcbiAgICAgICAgbmV3IE5vdGljZShcIlx1QzEzOFx1QzE1OCBJRFx1Qjk3QyBcdUM3ODVcdUI4MjVcdUQ1NzQgXHVDOEZDXHVDMTM4XHVDNjk0LlwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBqc29uUGF0aCA9IG5vcm1hbGl6ZVBhdGgoZm9ybS5pbnB1dFBhdGgpLnJlcGxhY2UoL15cXC8rLywgXCJcIik7XG4gICAgICBjb25zdCBqc29uRXhpc3RzID0gYXdhaXQgdGhpcy5hcHAudmF1bHQuYWRhcHRlci5leGlzdHMoanNvblBhdGgpO1xuICAgICAgaWYgKCFqc29uRXhpc3RzKSB7XG4gICAgICAgIG5ldyBOb3RpY2UoXCJKU09OIFx1RDMwQ1x1Qzc3Q1x1Qzc0NCBcdUNDM0VcdUM3NDQgXHVDMjE4IFx1QzVDNlx1QzJCNVx1QjJDOFx1QjJFNC5cIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGpzb25Db250ZW50ID0gYXdhaXQgdGhpcy5hcHAudmF1bHQuYWRhcHRlci5yZWFkKGpzb25QYXRoKTtcbiAgICAgIGNvbnN0IHR1cm5zID0gcGFyc2VUdXJucyhqc29uQ29udGVudCk7XG5cbiAgICAgIGNvbnN0IG91dHB1dEZvbGRlciA9IGZvcm0ub3V0cHV0Rm9sZGVyXG4gICAgICAgID8gbm9ybWFsaXplUGF0aChmb3JtLm91dHB1dEZvbGRlcikucmVwbGFjZSgvXlxcLysvLCBcIlwiKVxuICAgICAgICA6IFwiXCI7XG4gICAgICBjb25zdCB0YXJnZXRQYXRoID0gYXdhaXQgc2F2ZUNvbnZlcnNhdGlvbkZyb21UdXJucyhcbiAgICAgICAgdGhpcy5hcHAudmF1bHQsXG4gICAgICAgIGZvcm0uc2Vzc2lvbklkLFxuICAgICAgICB0dXJucyxcbiAgICAgICAgb3V0cHV0Rm9sZGVyXG4gICAgICApO1xuICAgICAgbmV3IE5vdGljZShgXHVCMzAwXHVENjU0IFx1QzgwMFx1QzdBNSBcdUM2NDRcdUI4Q0M6ICR7dGFyZ2V0UGF0aH1gKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKTtcbiAgICAgIG5ldyBOb3RpY2UoYFx1QzgwMFx1QzdBNSBcdUMyRTRcdUQzMjg6ICR7bWVzc2FnZX1gKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogXHVDNzg0XHVCQ0EwXHVCNTI5IEFQSSBVUkwgXHVBQzAwXHVDODM4XHVDNjI0XHVBRTMwXG4gICAqL1xuICBwcml2YXRlIGdldEVtYmVkZGluZ0FwaVVybCgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHByZXNldCA9IEVNQkVERElOR19QUkVTRVRTW3RoaXMuc2V0dGluZ3MuZW1iZWRkaW5nUHJvdmlkZXJdO1xuICAgIHJldHVybiBwcmVzZXQ/LmFwaVVybDtcbiAgfVxufVxuIiwgImltcG9ydCB0eXBlIHsgVmF1bHQgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB7IG5vcm1hbGl6ZVBhdGggfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uLCBDb252ZXJzYXRpb25UdXJuIH0gZnJvbSBcIi4vY29udmVyc2F0aW9uXCI7XG5pbXBvcnQgeyBjb252ZXJ0VG9NYXJrZG93biB9IGZyb20gXCIuL2NvbnZlcnNhdGlvblwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZUNvbnZlcnNhdGlvbkZyb21UdXJucyhcbiAgdmF1bHQ6IFZhdWx0LFxuICBzZXNzaW9uSWQ6IHN0cmluZyxcbiAgdHVybnM6IENvbnZlcnNhdGlvblR1cm5bXSxcbiAgb3V0cHV0Rm9sZGVyOiBzdHJpbmdcbik6IFByb21pc2U8c3RyaW5nPiB7XG4gIGNvbnN0IGNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uID0ge1xuICAgIHNlc3Npb25JZCxcbiAgICB0dXJucyxcbiAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKClcbiAgfTtcblxuICBjb25zdCBtYXJrZG93biA9IGNvbnZlcnRUb01hcmtkb3duKGNvbnZlcnNhdGlvbik7XG4gIGNvbnN0IGZpbGVuYW1lID0gYnVpbGRGaWxlTmFtZShjb252ZXJzYXRpb24pO1xuICBjb25zdCBjbGVhbmVkRm9sZGVyID0gb3V0cHV0Rm9sZGVyID8gbm9ybWFsaXplUGF0aChvdXRwdXRGb2xkZXIpLnJlcGxhY2UoL15cXC8rLywgXCJcIikgOiBcIlwiO1xuICBjb25zdCB0YXJnZXRQYXRoID0gYXdhaXQgZW5zdXJlVW5pcXVlUGF0aChcbiAgICB2YXVsdCxcbiAgICBub3JtYWxpemVQYXRoKGNsZWFuZWRGb2xkZXIgPyBgJHtjbGVhbmVkRm9sZGVyfS8ke2ZpbGVuYW1lfWAgOiBmaWxlbmFtZSlcbiAgKTtcblxuICBpZiAoY2xlYW5lZEZvbGRlcikge1xuICAgIGF3YWl0IGVuc3VyZUZvbGRlckV4aXN0cyh2YXVsdCwgY2xlYW5lZEZvbGRlcik7XG4gIH1cblxuICBhd2FpdCB2YXVsdC5jcmVhdGUodGFyZ2V0UGF0aCwgbWFya2Rvd24pO1xuICByZXR1cm4gdGFyZ2V0UGF0aDtcbn1cblxuZnVuY3Rpb24gYnVpbGRGaWxlTmFtZShjb252ZXJzYXRpb246IENvbnZlcnNhdGlvbik6IHN0cmluZyB7XG4gIGNvbnN0IGRhdGUgPSBjb252ZXJzYXRpb24uY3JlYXRlZEF0LnRvSVNPU3RyaW5nKCkuc3BsaXQoXCJUXCIpWzBdO1xuICByZXR1cm4gYCR7ZGF0ZX0tJHtjb252ZXJzYXRpb24uc2Vzc2lvbklkfS5tZGA7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGVuc3VyZUZvbGRlckV4aXN0cyh2YXVsdDogVmF1bHQsIGZvbGRlcjogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGV4aXN0cyA9IGF3YWl0IHZhdWx0LmFkYXB0ZXIuZXhpc3RzKGZvbGRlcik7XG4gIGlmICghZXhpc3RzKSB7XG4gICAgYXdhaXQgdmF1bHQuY3JlYXRlRm9sZGVyKGZvbGRlcik7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZW5zdXJlVW5pcXVlUGF0aCh2YXVsdDogVmF1bHQsIHBhdGg6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVQYXRoKHBhdGgpO1xuICBjb25zdCBleHRlbnNpb25JbmRleCA9IG5vcm1hbGl6ZWQubGFzdEluZGV4T2YoXCIubWRcIik7XG4gIGNvbnN0IGJhc2UgPSBleHRlbnNpb25JbmRleCA9PT0gLTEgPyBub3JtYWxpemVkIDogbm9ybWFsaXplZC5zbGljZSgwLCBleHRlbnNpb25JbmRleCk7XG4gIGNvbnN0IGV4dGVuc2lvbiA9IGV4dGVuc2lvbkluZGV4ID09PSAtMSA/IFwiXCIgOiBcIi5tZFwiO1xuXG4gIGxldCBjYW5kaWRhdGUgPSBub3JtYWxpemVkO1xuICBsZXQgY291bnQgPSAxO1xuXG4gIHdoaWxlIChhd2FpdCB2YXVsdC5hZGFwdGVyLmV4aXN0cyhjYW5kaWRhdGUpKSB7XG4gICAgY2FuZGlkYXRlID0gYCR7YmFzZX0tJHtjb3VudH0ke2V4dGVuc2lvbn1gO1xuICAgIGNvdW50ICs9IDE7XG4gIH1cblxuICByZXR1cm4gY2FuZGlkYXRlO1xufVxuIiwgImltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG4vLyBcdUIzMDBcdUQ2NTRcdUM3NTggXHVBQzAxIFx1RDEzNFx1Qzc0NCBcdUIwOThcdUQwQzBcdUIwQjRcdUIyOTQgXHVEMEMwXHVDNzg1XG5leHBvcnQgdHlwZSBDb252ZXJzYXRpb25UdXJuID0ge1xuICByb2xlOiBcInVzZXJcIiB8IFwiYXNzaXN0YW50XCIgfCBcInN5c3RlbVwiO1xuICBjb250ZW50OiBzdHJpbmc7XG4gIHRpbWVzdGFtcD86IERhdGUgfCBzdHJpbmc7XG59O1xuXG4vLyBcdUIzMDBcdUQ2NTQgXHVDODA0XHVDQ0I0XHVCOTdDIFx1QjA5OFx1RDBDMFx1QjBCNFx1QjI5NCBcdUQwQzBcdUM3ODVcbmV4cG9ydCB0eXBlIENvbnZlcnNhdGlvbiA9IHtcbiAgc2Vzc2lvbklkOiBzdHJpbmc7XG4gIHR1cm5zOiBDb252ZXJzYXRpb25UdXJuW107XG4gIGNyZWF0ZWRBdDogRGF0ZTtcbn07XG5cbi8vIFx1QjMwMFx1RDY1NFx1Qjk3QyBcdUI5QzhcdUQwNkNcdUIyRTRcdUM2QjQgXHVENjE1XHVDMkREXHVDNzNDXHVCODVDIFx1QkNDMFx1RDY1OFxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRUb01hcmtkb3duKGNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uKTogc3RyaW5nIHtcbiAgY29uc3QgbGluZXM6IHN0cmluZ1tdID0gW107XG4gIFxuICAvLyBcdUQ1RTRcdUIzNTQ6IFx1QzgxQ1x1QkFBOVx1QUNGQyBcdUJBNTRcdUQwQzBcdUIzNzBcdUM3NzRcdUQxMzBcbiAgbGluZXMucHVzaChgIyBcdUIzMDBcdUQ2NTQgXHVBRTMwXHVCODVEIC0gJHtjb252ZXJzYXRpb24uc2Vzc2lvbklkfWApO1xuICBsaW5lcy5wdXNoKFwiXCIpO1xuICBsaW5lcy5wdXNoKGBcdUMwRERcdUMxMzFcdUM3N0M6ICR7Y29udmVyc2F0aW9uLmNyZWF0ZWRBdC50b0lTT1N0cmluZygpfWApO1xuICBsaW5lcy5wdXNoKFwiXCIpO1xuICBsaW5lcy5wdXNoKFwiLS0tXCIpO1xuICBsaW5lcy5wdXNoKFwiXCIpO1xuICBcbiAgLy8gXHVBQzAxIFx1RDEzNFx1Qzc0NCBcdUI5QzhcdUQwNkNcdUIyRTRcdUM2QjRcdUM3M0NcdUI4NUMgXHVCQ0MwXHVENjU4XG4gIGZvciAoY29uc3QgdHVybiBvZiBjb252ZXJzYXRpb24udHVybnMpIHtcbiAgICBjb25zdCByb2xlTGFiZWwgPSB0dXJuLnJvbGUgPT09IFwidXNlclwiID8gXCJcdUQ4M0RcdURDNjQgXHVDMEFDXHVDNkE5XHVDNzkwXCIgOiBcbiAgICAgICAgICAgICAgICAgICAgIHR1cm4ucm9sZSA9PT0gXCJhc3Npc3RhbnRcIiA/IFwiXHVEODNFXHVERDE2IFx1QzVCNFx1QzJEQ1x1QzJBNFx1RDEzNFx1RDJCOFwiIDogXG4gICAgICAgICAgICAgICAgICAgICBcIlx1MjY5OVx1RkUwRiBcdUMyRENcdUMyQTRcdUQxNUNcIjtcbiAgICBcbiAgICBsaW5lcy5wdXNoKGAjIyAke3JvbGVMYWJlbH1gKTtcbiAgICBcbiAgICBpZiAodHVybi50aW1lc3RhbXApIHtcbiAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IHR5cGVvZiB0dXJuLnRpbWVzdGFtcCA9PT0gXCJzdHJpbmdcIiBcbiAgICAgICAgPyB0dXJuLnRpbWVzdGFtcCBcbiAgICAgICAgOiB0dXJuLnRpbWVzdGFtcC50b0lTT1N0cmluZygpO1xuICAgICAgbGluZXMucHVzaChgKiR7dGltZXN0YW1wfSpgKTtcbiAgICAgIGxpbmVzLnB1c2goXCJcIik7XG4gICAgfVxuICAgIFxuICAgIGxpbmVzLnB1c2godHVybi5jb250ZW50KTtcbiAgICBsaW5lcy5wdXNoKFwiXCIpO1xuICB9XG4gIFxuICByZXR1cm4gbGluZXMuam9pbihcIlxcblwiKTtcbn1cblxuLy8gXHVCMzAwXHVENjU0XHVCOTdDIFx1RDMwQ1x1Qzc3Q1x1Qjg1QyBcdUM4MDBcdUM3QTVcbmV4cG9ydCBmdW5jdGlvbiBzYXZlQ29udmVyc2F0aW9uKFxuICBjb252ZXJzYXRpb246IENvbnZlcnNhdGlvbixcbiAgdGFyZ2V0RGlyOiBzdHJpbmdcbik6IHN0cmluZyB7XG4gIGlmICghZnMuZXhpc3RzU3luYyh0YXJnZXREaXIpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBcdUIzMDBcdUMwQzEgXHVCNTE0XHVCODA5XHVEMUEwXHVCOUFDXHVBQzAwIFx1Qzg3NFx1QzdBQ1x1RDU1OFx1QzlDMCBcdUM1NEFcdUMyQjVcdUIyQzhcdUIyRTQ6ICR7dGFyZ2V0RGlyfWApO1xuICB9XG4gIFxuICBjb25zdCBtYXJrZG93biA9IGNvbnZlcnRUb01hcmtkb3duKGNvbnZlcnNhdGlvbik7XG4gIFxuICAvLyBcdUQzMENcdUM3N0NcdUJBODUgXHVDMEREXHVDMTMxOiBZWVlZLU1NLURELXNlc3Npb25JZC5tZFxuICBjb25zdCBkYXRlID0gY29udmVyc2F0aW9uLmNyZWF0ZWRBdC50b0lTT1N0cmluZygpLnNwbGl0KFwiVFwiKVswXTtcbiAgY29uc3QgZmlsZW5hbWUgPSBgJHtkYXRlfS0ke2NvbnZlcnNhdGlvbi5zZXNzaW9uSWR9Lm1kYDtcbiAgY29uc3QgZmlsZXBhdGggPSBwYXRoLmpvaW4odGFyZ2V0RGlyLCBmaWxlbmFtZSk7XG4gIFxuICBmcy53cml0ZUZpbGVTeW5jKGZpbGVwYXRoLCBtYXJrZG93biwgXCJ1dGYtOFwiKTtcbiAgXG4gIHJldHVybiBmaWxlcGF0aDtcbn1cbiIsICJpbXBvcnQgeyByZXF1ZXN0VXJsIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvblR1cm4gfSBmcm9tIFwiLi9jb252ZXJzYXRpb25cIjtcbmltcG9ydCB0eXBlIHsgT3ZsU2V0dGluZ3MgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgUFJPVklERVJfUFJFU0VUUyB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbnR5cGUgTG9nV3JpdGVyID0gKGNvbnRleHQ6IHN0cmluZywgZGV0YWlsOiB1bmtub3duKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG50eXBlIFNldHRpbmdzR2V0dGVyID0gKCkgPT4gT3ZsU2V0dGluZ3M7XG5cbmV4cG9ydCBjbGFzcyBPdmxBcGlDbGllbnQge1xuICBwcml2YXRlIHJlYWRvbmx5IGdldFNldHRpbmdzOiBTZXR0aW5nc0dldHRlcjtcbiAgcHJpdmF0ZSByZWFkb25seSBsb2dXcml0ZXI6IExvZ1dyaXRlcjtcblxuICBjb25zdHJ1Y3RvcihnZXRTZXR0aW5nczogU2V0dGluZ3NHZXR0ZXIsIGxvZ1dyaXRlcj86IExvZ1dyaXRlcikge1xuICAgIHRoaXMuZ2V0U2V0dGluZ3MgPSBnZXRTZXR0aW5ncztcbiAgICAvLyBcdUI4NUNcdUFERjggXHVBRTMwXHVCODVEXHVBRTMwXHVCOTdDIFx1QzhGQ1x1Qzc4NVx1QkMxQlx1QzlDMCBcdUJBQkJcdUQ1NUMgXHVBQ0JEXHVDNkIwXHVDNUQwXHVCM0M0IFx1QzU0OFx1QzgwNFx1RDU1OFx1QUM4QyBcdUIzRDlcdUM3OTFcdUQ1NThcdUIzQzRcdUI4NUQgXHVDQzk4XHVCOUFDXHVENTY5XHVCMkM4XHVCMkU0LlxuICAgIHRoaXMubG9nV3JpdGVyID0gbG9nV3JpdGVyID8/IChhc3luYyAoKSA9PiB7fSk7XG4gIH1cblxuICBhc3luYyByZXF1ZXN0QXNzaXN0YW50UmVwbHkodHVybnM6IENvbnZlcnNhdGlvblR1cm5bXSk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3Qgc2V0dGluZ3MgPSB0aGlzLmdldFNldHRpbmdzKCk7XG5cbiAgICBpZiAoc2V0dGluZ3MucHJvdmlkZXIgPT09IFwiZ2VtaW5pXCIpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RHZW1pbmlSZXBseShzZXR0aW5ncywgdHVybnMpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnJlcXVlc3RPcGVuQWlDb21wYXRpYmxlUmVwbHkoc2V0dGluZ3MsIHR1cm5zKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgcmVxdWVzdE9wZW5BaUNvbXBhdGlibGVSZXBseShcbiAgICBzZXR0aW5nczogT3ZsU2V0dGluZ3MsXG4gICAgdHVybnM6IENvbnZlcnNhdGlvblR1cm5bXVxuICApOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IGFwaVVybCA9IHNldHRpbmdzLmFwaVVybC50cmltKCk7XG4gICAgaWYgKCFhcGlVcmwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkFQSSBVUkxcdUM3NDQgXHVDMTI0XHVDODE1XHVENTc0IFx1QzhGQ1x1QzEzOFx1QzY5NC5cIik7XG4gICAgfVxuXG4gICAgY29uc3QgbW9kZWxOYW1lID0gc2V0dGluZ3MubW9kZWwudHJpbSgpIHx8IFBST1ZJREVSX1BSRVNFVFMub3BlbmFpLm1vZGVsO1xuICAgIGlmICghbW9kZWxOYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJcdUJBQThcdUIzNzggXHVDNzc0XHVCOTg0XHVDNzQ0IFx1Qzc4NVx1QjgyNVx1RDU3NCBcdUM4RkNcdUMxMzhcdUM2OTQuXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc3NhZ2VzID0gdGhpcy5idWlsZE9wZW5BaU1lc3NhZ2VzKHNldHRpbmdzLCB0dXJucyk7XG4gICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgIG1vZGVsOiBtb2RlbE5hbWUsXG4gICAgICBtZXNzYWdlc1xuICAgIH07XG4gICAgY29uc3QgYm9keSA9IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpO1xuXG4gICAgY29uc3QgaGVhZGVyczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgfTtcbiAgICBpZiAoc2V0dGluZ3MuYXBpS2V5LnRyaW0oKSkge1xuICAgICAgaGVhZGVycy5BdXRob3JpemF0aW9uID0gYEJlYXJlciAke3NldHRpbmdzLmFwaUtleS50cmltKCl9YDtcbiAgICB9XG5cbiAgICBsZXQgcmVzcG9uc2U6IHsgdGV4dDogc3RyaW5nOyBqc29uPzogdW5rbm93bjsgc3RhdHVzPzogbnVtYmVyIH07XG4gICAgdHJ5IHtcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgcmVxdWVzdFVybCh7XG4gICAgICAgIHVybDogYXBpVXJsLFxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBoZWFkZXJzLFxuICAgICAgICBib2R5XG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKTtcbiAgICAgIGF3YWl0IHRoaXMubG9nKFwib3BlbmFpLWNvbXBhdGlibGUgcmVxdWVzdCBmYWlsZWRcIiwge1xuICAgICAgICB1cmw6IGFwaVVybCxcbiAgICAgICAgYm9keTogcGF5bG9hZCxcbiAgICAgICAgZXJyb3I6IG1lc3NhZ2VcbiAgICAgIH0pO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBBUEkgXHVDNjk0XHVDQ0FEIFx1QzJFNFx1RDMyODogJHttZXNzYWdlfWApO1xuICAgIH1cblxuICAgIGNvbnN0IHN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICBpZiAoc3RhdHVzICYmIHN0YXR1cyA+PSA0MDApIHtcbiAgICAgIGF3YWl0IHRoaXMubG9nKFwib3BlbmFpLWNvbXBhdGlibGUgcmVzcG9uc2UgZXJyb3JcIiwge1xuICAgICAgICB1cmw6IGFwaVVybCxcbiAgICAgICAgYm9keTogcGF5bG9hZCxcbiAgICAgICAgc3RhdHVzLFxuICAgICAgICByZXNwb25zZTogcmVzcG9uc2UudGV4dFxuICAgICAgfSk7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEFQSSBcdUM2MjRcdUI5NTg6ICR7c3RhdHVzfWApO1xuICAgIH1cblxuICAgIGNvbnN0IGRhdGEgPSB0aGlzLnBhcnNlSnNvblJlc3BvbnNlKHJlc3BvbnNlLnRleHQsIHJlc3BvbnNlLmpzb24pO1xuICAgIGNvbnN0IGNvbnRlbnQgPVxuICAgICAgKGRhdGEgYXMgeyBjaG9pY2VzPzogQXJyYXk8eyBtZXNzYWdlPzogeyBjb250ZW50Pzogc3RyaW5nIH0gfT4gfSk/LmNob2ljZXM/LlswXT8ubWVzc2FnZVxuICAgICAgICA/LmNvbnRlbnQgPz9cbiAgICAgIChkYXRhIGFzIHsgcmVwbHk/OiBzdHJpbmcgfSk/LnJlcGx5ID8/XG4gICAgICAoZGF0YSBhcyB7IGNvbnRlbnQ/OiBzdHJpbmcgfSk/LmNvbnRlbnQgPz9cbiAgICAgIChkYXRhIGFzIHsgbWVzc2FnZT86IHN0cmluZyB9KT8ubWVzc2FnZTtcblxuICAgIGlmICghY29udGVudCB8fCB0eXBlb2YgY29udGVudCAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgYXdhaXQgdGhpcy5sb2coXCJvcGVuYWktY29tcGF0aWJsZSByZXNwb25zZSBpbnZhbGlkXCIsIHsgdXJsOiBhcGlVcmwsIHJlc3BvbnNlOiBkYXRhIH0pO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXHVDNzUxXHVCMkY1IFx1RDYxNVx1QzJERFx1Qzc3NCBcdUM2MkNcdUJDMTRcdUI5NzRcdUM5QzAgXHVDNTRBXHVDMkI1XHVCMkM4XHVCMkU0LlwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29udGVudC50cmltKCk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHJlcXVlc3RHZW1pbmlSZXBseShcbiAgICBzZXR0aW5nczogT3ZsU2V0dGluZ3MsXG4gICAgdHVybnM6IENvbnZlcnNhdGlvblR1cm5bXVxuICApOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IGFwaUtleSA9IHNldHRpbmdzLmFwaUtleS50cmltKCk7XG4gICAgaWYgKCFhcGlLZXkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbWluaSBBUEkgXHVEMEE0XHVCOTdDIFx1Qzc4NVx1QjgyNVx1RDU3NCBcdUM4RkNcdUMxMzhcdUM2OTQuXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IG1vZGVsTmFtZSA9IHNldHRpbmdzLm1vZGVsLnRyaW0oKSB8fCBQUk9WSURFUl9QUkVTRVRTLmdlbWluaS5tb2RlbDtcbiAgICBpZiAoIW1vZGVsTmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VtaW5pIFx1QkFBOFx1QjM3OCBcdUM3NzRcdUI5ODRcdUM3NDQgXHVDNzg1XHVCODI1XHVENTc0IFx1QzhGQ1x1QzEzOFx1QzY5NC5cIik7XG4gICAgfVxuXG4gICAgY29uc3Qgc3lzdGVtUHJvbXB0ID0gc2V0dGluZ3Muc3lzdGVtUHJvbXB0LnRyaW0oKTtcbiAgICBjb25zdCBjb250ZW50cyA9IHR1cm5zLm1hcCgodHVybikgPT4ge1xuICAgICAgY29uc3Qgcm9sZSA9IHR1cm4ucm9sZSA9PT0gXCJhc3Npc3RhbnRcIiA/IFwibW9kZWxcIiA6IFwidXNlclwiO1xuICAgICAgY29uc3QgdGV4dCA9IHR1cm4ucm9sZSA9PT0gXCJzeXN0ZW1cIiA/IGBbXHVDMkRDXHVDMkE0XHVEMTVDXSAke3R1cm4uY29udGVudH1gIDogdHVybi5jb250ZW50O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcm9sZSxcbiAgICAgICAgcGFydHM6IFt7IHRleHQgfV1cbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICBjb25zdCBwYXlsb2FkOiB7XG4gICAgICBzeXN0ZW1JbnN0cnVjdGlvbj86IHsgcGFydHM6IEFycmF5PHsgdGV4dDogc3RyaW5nIH0+IH07XG4gICAgICBjb250ZW50czogQXJyYXk8eyByb2xlOiBzdHJpbmc7IHBhcnRzOiBBcnJheTx7IHRleHQ6IHN0cmluZyB9PiB9PjtcbiAgICAgIGdlbmVyYXRpb25Db25maWc6IHsgcmVzcG9uc2VNaW1lVHlwZTogc3RyaW5nIH07XG4gICAgfSA9IHtcbiAgICAgIGNvbnRlbnRzLFxuICAgICAgZ2VuZXJhdGlvbkNvbmZpZzoge1xuICAgICAgICByZXNwb25zZU1pbWVUeXBlOiBcInRleHQvcGxhaW5cIlxuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoc3lzdGVtUHJvbXB0KSB7XG4gICAgICBwYXlsb2FkLnN5c3RlbUluc3RydWN0aW9uID0geyBwYXJ0czogW3sgdGV4dDogc3lzdGVtUHJvbXB0IH1dIH07XG4gICAgfVxuXG4gICAgLy8gR2VtaW5pIEFQSSBVUkwgXHVBRDZDXHVDMTMxIChBUEkgXHVEMEE0XHVCOTdDIFx1Q0ZGQ1x1QjlBQyBcdUQzMENcdUI3N0NcdUJCRjhcdUQxMzBcdUI4NUMgXHVDODA0XHVCMkVDKVxuICAgIGNvbnN0IGFwaVVybCA9IGBodHRwczovL2dlbmVyYXRpdmVsYW5ndWFnZS5nb29nbGVhcGlzLmNvbS92MWJldGEvbW9kZWxzLyR7bW9kZWxOYW1lfTpnZW5lcmF0ZUNvbnRlbnQ/a2V5PSR7YXBpS2V5fWA7XG5cbiAgICBjb25zdCBoZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICB9O1xuXG4gICAgbGV0IHJlc3BvbnNlOiB7IHRleHQ6IHN0cmluZzsganNvbj86IHVua25vd247IHN0YXR1cz86IG51bWJlciB9O1xuICAgIHRyeSB7XG4gICAgICByZXNwb25zZSA9IGF3YWl0IHJlcXVlc3RVcmwoe1xuICAgICAgICB1cmw6IGFwaVVybCxcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgaGVhZGVycyxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZClcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpO1xuICAgICAgYXdhaXQgdGhpcy5sb2coXCJnZW1pbmkgcmVxdWVzdCBmYWlsZWRcIiwge1xuICAgICAgICBtb2RlbDogbW9kZWxOYW1lLFxuICAgICAgICBib2R5OiBwYXlsb2FkLFxuICAgICAgICBlcnJvcjogbWVzc2FnZVxuICAgICAgfSk7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEdlbWluaSBcdUM2OTRcdUNDQUQgXHVDMkU0XHVEMzI4OiAke21lc3NhZ2V9YCk7XG4gICAgfVxuXG4gICAgY29uc3Qgc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgIGlmIChzdGF0dXMgJiYgc3RhdHVzID49IDQwMCkge1xuICAgICAgYXdhaXQgdGhpcy5sb2coXCJnZW1pbmkgcmVzcG9uc2UgZXJyb3JcIiwge1xuICAgICAgICBtb2RlbDogbW9kZWxOYW1lLFxuICAgICAgICBib2R5OiBwYXlsb2FkLFxuICAgICAgICBzdGF0dXMsXG4gICAgICAgIHJlc3BvbnNlOiByZXNwb25zZS50ZXh0XG4gICAgICB9KTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgR2VtaW5pIEFQSSBcdUM2MjRcdUI5NTg6ICR7c3RhdHVzfWApO1xuICAgIH1cblxuICAgIGNvbnN0IGRhdGEgPSB0aGlzLnBhcnNlSnNvblJlc3BvbnNlKHJlc3BvbnNlLnRleHQsIHJlc3BvbnNlLmpzb24pO1xuICAgIGNvbnN0IHRleHQgPVxuICAgICAgKGRhdGEgYXMgeyB0ZXh0Pzogc3RyaW5nIH0pPy50ZXh0ID8/XG4gICAgICAoZGF0YSBhcyB7IGNhbmRpZGF0ZXM/OiBBcnJheTx7IGNvbnRlbnQ/OiB7IHBhcnRzPzogQXJyYXk8eyB0ZXh0Pzogc3RyaW5nIH0+IH0gfT4gfSlcbiAgICAgICAgPy5jYW5kaWRhdGVzPy5bMF0/LmNvbnRlbnQ/LnBhcnRzXG4gICAgICAgID8ubWFwKChwYXJ0KSA9PiBwYXJ0LnRleHQgPz8gXCJcIilcbiAgICAgICAgLmpvaW4oXCJcIilcbiAgICAgICAgLnRyaW0oKSA/P1xuICAgICAgXCJcIjtcblxuICAgIGlmICghdGV4dCkge1xuICAgICAgYXdhaXQgdGhpcy5sb2coXCJnZW1pbmkgcmVzcG9uc2UgaW52YWxpZFwiLCB7IG1vZGVsOiBtb2RlbE5hbWUsIHJlc3BvbnNlOiBkYXRhIH0pO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXHVDNzUxXHVCMkY1IFx1RDYxNVx1QzJERFx1Qzc3NCBcdUM2MkNcdUJDMTRcdUI5NzRcdUM5QzAgXHVDNTRBXHVDMkI1XHVCMkM4XHVCMkU0LlwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGV4dDtcbiAgfVxuXG4gIHByaXZhdGUgYnVpbGRPcGVuQWlNZXNzYWdlcyhcbiAgICBzZXR0aW5nczogT3ZsU2V0dGluZ3MsXG4gICAgdHVybnM6IENvbnZlcnNhdGlvblR1cm5bXVxuICApOiBBcnJheTx7IHJvbGU6IHN0cmluZzsgY29udGVudDogc3RyaW5nIH0+IHtcbiAgICBjb25zdCBtZXNzYWdlcyA9IFtdIGFzIEFycmF5PHsgcm9sZTogc3RyaW5nOyBjb250ZW50OiBzdHJpbmcgfT47XG4gICAgY29uc3Qgc3lzdGVtUHJvbXB0ID0gc2V0dGluZ3Muc3lzdGVtUHJvbXB0LnRyaW0oKTtcbiAgICBpZiAoc3lzdGVtUHJvbXB0KSB7XG4gICAgICBtZXNzYWdlcy5wdXNoKHsgcm9sZTogXCJzeXN0ZW1cIiwgY29udGVudDogc3lzdGVtUHJvbXB0IH0pO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IHR1cm4gb2YgdHVybnMpIHtcbiAgICAgIG1lc3NhZ2VzLnB1c2goeyByb2xlOiB0dXJuLnJvbGUsIGNvbnRlbnQ6IHR1cm4uY29udGVudCB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG1lc3NhZ2VzO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZUpzb25SZXNwb25zZSh0ZXh0OiBzdHJpbmcsIGpzb24/OiB1bmtub3duKTogdW5rbm93biB7XG4gICAgaWYgKGpzb24pIHtcbiAgICAgIHJldHVybiBqc29uO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIEpTT04ucGFyc2UodGV4dCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBUEkgXHVDNzUxXHVCMkY1XHVDNzQ0IFx1RDU3NFx1QzExRFx1RDU2MCBcdUMyMTggXHVDNUM2XHVDMkI1XHVCMkM4XHVCMkU0LlwiKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGxvZyhjb250ZXh0OiBzdHJpbmcsIGRldGFpbDogdW5rbm93bik6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMubG9nV3JpdGVyKGNvbnRleHQsIGRldGFpbCk7XG4gIH1cbn1cbiIsICJleHBvcnQgdHlwZSBBcGlQcm92aWRlciA9IFwiZ2VtaW5pXCIgfCBcIm9wZW5haVwiIHwgXCJvbGxhbWFcIiB8IFwiY3VzdG9tXCI7XG5leHBvcnQgdHlwZSBFbWJlZGRpbmdQcm92aWRlciA9IFwiZ2VtaW5pXCIgfCBcIm9wZW5haVwiIHwgXCJsb2NhbFwiIHwgXCJjdXN0b21cIjtcblxuZXhwb3J0IHR5cGUgT3ZsU2V0dGluZ3MgPSB7XG4gIHByb3ZpZGVyOiBBcGlQcm92aWRlcjtcbiAgYXBpVXJsOiBzdHJpbmc7XG4gIGFwaUtleTogc3RyaW5nO1xuICBtb2RlbDogc3RyaW5nO1xuICBzeXN0ZW1Qcm9tcHQ6IHN0cmluZztcbiAgZGVmYXVsdE91dHB1dEZvbGRlcjogc3RyaW5nO1xuICAvLyBcdUM3NzhcdUIzNzFcdUMyRjEgXHVDMTI0XHVDODE1XG4gIGluZGV4aW5nRW5hYmxlZDogYm9vbGVhbjtcbiAgY2h1bmtTaXplOiBudW1iZXI7XG4gIGNodW5rT3ZlcmxhcDogbnVtYmVyO1xuICB0b3BLOiBudW1iZXI7XG4gIC8vIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUMxMjRcdUM4MTVcbiAgZW1iZWRkaW5nUHJvdmlkZXI6IEVtYmVkZGluZ1Byb3ZpZGVyO1xuICBlbWJlZGRpbmdBcGlLZXk6IHN0cmluZztcbiAgZW1iZWRkaW5nTW9kZWw6IHN0cmluZztcbn07XG5cbmV4cG9ydCBjb25zdCBQUk9WSURFUl9QUkVTRVRTOiBSZWNvcmQ8QXBpUHJvdmlkZXIsIHsgYXBpVXJsOiBzdHJpbmc7IG1vZGVsOiBzdHJpbmcgfT4gPSB7XG4gIGdlbWluaToge1xuICAgIGFwaVVybDogXCJodHRwczovL2dlbmVyYXRpdmVsYW5ndWFnZS5nb29nbGVhcGlzLmNvbS92MWJldGEvbW9kZWxzL2dlbWluaS0yLjAtZmxhc2gtZXhwOmdlbmVyYXRlQ29udGVudFwiLFxuICAgIG1vZGVsOiBcImdlbWluaS0yLjAtZmxhc2gtZXhwXCJcbiAgfSxcbiAgb3BlbmFpOiB7XG4gICAgYXBpVXJsOiBcImh0dHBzOi8vYXBpLm9wZW5haS5jb20vdjEvY2hhdC9jb21wbGV0aW9uc1wiLFxuICAgIG1vZGVsOiBcImdwdC00by1taW5pXCJcbiAgfSxcbiAgb2xsYW1hOiB7XG4gICAgYXBpVXJsOiBcImh0dHA6Ly9sb2NhbGhvc3Q6MTE0MzQvdjEvY2hhdC9jb21wbGV0aW9uc1wiLFxuICAgIG1vZGVsOiBcImxsYW1hMy4xXCJcbiAgfSxcbiAgY3VzdG9tOiB7XG4gICAgYXBpVXJsOiBcIlwiLFxuICAgIG1vZGVsOiBcIlwiXG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBFTUJFRERJTkdfUFJFU0VUUzogUmVjb3JkPEVtYmVkZGluZ1Byb3ZpZGVyLCB7IG1vZGVsOiBzdHJpbmc7IGFwaVVybD86IHN0cmluZyB9PiA9IHtcbiAgZ2VtaW5pOiB7XG4gICAgbW9kZWw6IFwidGV4dC1lbWJlZGRpbmctMDA0XCIsXG4gICAgYXBpVXJsOiBcImh0dHBzOi8vZ2VuZXJhdGl2ZWxhbmd1YWdlLmdvb2dsZWFwaXMuY29tL3YxYmV0YS9tb2RlbHNcIlxuICB9LFxuICBvcGVuYWk6IHtcbiAgICBtb2RlbDogXCJ0ZXh0LWVtYmVkZGluZy0zLXNtYWxsXCIsXG4gICAgYXBpVXJsOiBcImh0dHBzOi8vYXBpLm9wZW5haS5jb20vdjEvZW1iZWRkaW5nc1wiXG4gIH0sXG4gIGxvY2FsOiB7XG4gICAgbW9kZWw6IFwiWGVub3ZhL2FsbC1NaW5pTE0tTDYtdjJcIlxuICB9LFxuICBjdXN0b206IHtcbiAgICBtb2RlbDogXCJcIlxuICB9XG59O1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9TRVRUSU5HUzogT3ZsU2V0dGluZ3MgPSB7XG4gIHByb3ZpZGVyOiBcImdlbWluaVwiLFxuICBhcGlVcmw6IFBST1ZJREVSX1BSRVNFVFMuZ2VtaW5pLmFwaVVybCxcbiAgYXBpS2V5OiBcIlwiLFxuICBtb2RlbDogUFJPVklERVJfUFJFU0VUUy5nZW1pbmkubW9kZWwsXG4gIHN5c3RlbVByb21wdDogXCJcIixcbiAgZGVmYXVsdE91dHB1dEZvbGRlcjogXCJcIixcbiAgLy8gXHVDNzc4XHVCMzcxXHVDMkYxIFx1QUUzMFx1QkNGOCBcdUMxMjRcdUM4MTVcbiAgaW5kZXhpbmdFbmFibGVkOiBmYWxzZSxcbiAgY2h1bmtTaXplOiA0MDAsXG4gIGNodW5rT3ZlcmxhcDogNTAsXG4gIHRvcEs6IDgsXG4gIC8vIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUFFMzBcdUJDRjggXHVDMTI0XHVDODE1IChHZW1pbmkpXG4gIGVtYmVkZGluZ1Byb3ZpZGVyOiBcImdlbWluaVwiLFxuICBlbWJlZGRpbmdBcGlLZXk6IFwiXCIsXG4gIGVtYmVkZGluZ01vZGVsOiBFTUJFRERJTkdfUFJFU0VUUy5nZW1pbmkubW9kZWwsXG59O1xuIiwgImltcG9ydCB0eXBlIHsgQXBwLCBQbHVnaW5NYW5pZmVzdCB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHsgbm9ybWFsaXplUGF0aCB9IGZyb20gXCJvYnNpZGlhblwiO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGx1Z2luTG9nUGF0aChhcHA6IEFwcCwgbWFuaWZlc3Q/OiBQbHVnaW5NYW5pZmVzdCk6IHN0cmluZyB7XG4gIGNvbnN0IHBsdWdpbklkID0gbWFuaWZlc3Q/LmlkID8/IFwib2JzaWRpYW4tdmF1bHQtbGxtXCI7XG4gIHJldHVybiBub3JtYWxpemVQYXRoKGAke2FwcC52YXVsdC5jb25maWdEaXJ9L3BsdWdpbnMvJHtwbHVnaW5JZH0vbG9nLnR4dGApO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYXBwZW5kRXJyb3JMb2coXG4gIGFwcDogQXBwLFxuICBtYW5pZmVzdDogUGx1Z2luTWFuaWZlc3QgfCB1bmRlZmluZWQsXG4gIGNvbnRleHQ6IHN0cmluZyxcbiAgZGV0YWlsOiB1bmtub3duXG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgbG9nUGF0aCA9IGdldFBsdWdpbkxvZ1BhdGgoYXBwLCBtYW5pZmVzdCk7XG4gIGNvbnN0IHRpbWVzdGFtcCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcbiAgY29uc3QgZGV0YWlsVGV4dCA9IHRvU2FmZVN0cmluZyhkZXRhaWwpO1xuICBjb25zdCBlbnRyeSA9IGBcXG5bJHt0aW1lc3RhbXB9XSAke2NvbnRleHR9XFxuJHtkZXRhaWxUZXh0fVxcbmA7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBleGlzdHMgPSBhd2FpdCBhcHAudmF1bHQuYWRhcHRlci5leGlzdHMobG9nUGF0aCk7XG4gICAgaWYgKGV4aXN0cykge1xuICAgICAgY29uc3QgY3VycmVudCA9IGF3YWl0IGFwcC52YXVsdC5hZGFwdGVyLnJlYWQobG9nUGF0aCk7XG4gICAgICBhd2FpdCBhcHAudmF1bHQuYWRhcHRlci53cml0ZShsb2dQYXRoLCBgJHtjdXJyZW50fSR7ZW50cnl9YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF3YWl0IGFwcC52YXVsdC5hZGFwdGVyLndyaXRlKGxvZ1BhdGgsIGVudHJ5LnRyaW1TdGFydCgpKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byB3cml0ZSBwbHVnaW4gbG9nXCIsIGVycm9yKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB0b1NhZmVTdHJpbmcoZGV0YWlsOiB1bmtub3duKTogc3RyaW5nIHtcbiAgaWYgKGRldGFpbCA9PT0gbnVsbCB8fCBkZXRhaWwgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBTdHJpbmcoZGV0YWlsKTtcbiAgfVxuICBpZiAodHlwZW9mIGRldGFpbCA9PT0gXCJzdHJpbmdcIikge1xuICAgIHJldHVybiBkZXRhaWw7XG4gIH1cbiAgaWYgKGRldGFpbCBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgcmV0dXJuIGRldGFpbC5zdGFjayA/PyBkZXRhaWwubWVzc2FnZTtcbiAgfVxuICB0cnkge1xuICAgIGNvbnN0IHNlZW4gPSBuZXcgV2Vha1NldDxvYmplY3Q+KCk7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KFxuICAgICAgZGV0YWlsLFxuICAgICAgKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgIGlmIChzZWVuLmhhcyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBcIltcdUMyMUNcdUQ2NTggXHVDQzM4XHVDODcwXVwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzZWVuLmFkZCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfSxcbiAgICAgIDJcbiAgICApO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcik7XG4gICAgcmV0dXJuIGBcdUM5QzFcdUI4MkNcdUQ2NTQgXHVDMkU0XHVEMzI4OiAke21lc3NhZ2V9YDtcbiAgfVxufVxuIiwgImltcG9ydCB7IE1vZGFsIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgdHlwZSB7IFBsdWdpbiB9IGZyb20gXCJvYnNpZGlhblwiO1xuXG5leHBvcnQgdHlwZSBTYXZlQ29udmVyc2F0aW9uRm9ybSA9IHtcbiAgaW5wdXRQYXRoOiBzdHJpbmc7XG4gIHNlc3Npb25JZDogc3RyaW5nO1xuICBvdXRwdXRGb2xkZXI6IHN0cmluZztcbn07XG5cbmV4cG9ydCBjbGFzcyBTYXZlQ29udmVyc2F0aW9uTW9kYWwgZXh0ZW5kcyBNb2RhbCB7XG4gIHByaXZhdGUgcmVhZG9ubHkgb25TdWJtaXQ6ICh2YWx1ZTogU2F2ZUNvbnZlcnNhdGlvbkZvcm0pID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IocGx1Z2luOiBQbHVnaW4sIG9uU3VibWl0OiAodmFsdWU6IFNhdmVDb252ZXJzYXRpb25Gb3JtKSA9PiB2b2lkKSB7XG4gICAgc3VwZXIocGx1Z2luLmFwcCk7XG4gICAgdGhpcy5vblN1Ym1pdCA9IG9uU3VibWl0O1xuICB9XG5cbiAgb25PcGVuKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgY29udGVudEVsIH0gPSB0aGlzO1xuICAgIGNvbnRlbnRFbC5lbXB0eSgpO1xuXG4gICAgY29udGVudEVsLmNyZWF0ZUVsKFwiaDJcIiwgeyB0ZXh0OiBcIlx1QjMwMFx1RDY1NCBKU09OIFx1QzgwMFx1QzdBNVwiIH0pO1xuXG4gICAgY29uc3QgaW5wdXRQYXRoRWwgPSBjb250ZW50RWwuY3JlYXRlRWwoXCJpbnB1dFwiLCB7IHR5cGU6IFwidGV4dFwiIH0pO1xuICAgIGlucHV0UGF0aEVsLnBsYWNlaG9sZGVyID0gXCJKU09OIFx1RDMwQ1x1Qzc3QyBcdUFDQkRcdUI4NUMgKFx1QkNGQ1x1RDJCOCBcdUFFMzBcdUM5MDApXCI7XG5cbiAgICBjb25zdCBzZXNzaW9uSWRFbCA9IGNvbnRlbnRFbC5jcmVhdGVFbChcImlucHV0XCIsIHsgdHlwZTogXCJ0ZXh0XCIgfSk7XG4gICAgc2Vzc2lvbklkRWwucGxhY2Vob2xkZXIgPSBcIlx1QzEzOFx1QzE1OCBJRFwiO1xuXG4gICAgY29uc3Qgb3V0cHV0Rm9sZGVyRWwgPSBjb250ZW50RWwuY3JlYXRlRWwoXCJpbnB1dFwiLCB7IHR5cGU6IFwidGV4dFwiIH0pO1xuICAgIG91dHB1dEZvbGRlckVsLnBsYWNlaG9sZGVyID0gXCJcdUM4MDBcdUM3QTUgXHVEM0Y0XHVCMzU0IChcdUMxMjBcdUQwREQsIFx1QkNGQ1x1RDJCOCBcdUFFMzBcdUM5MDApXCI7XG5cbiAgICBjb25zdCBzdWJtaXRCdXR0b24gPSBjb250ZW50RWwuY3JlYXRlRWwoXCJidXR0b25cIiwgeyB0ZXh0OiBcIlx1QzgwMFx1QzdBNVwiIH0pO1xuICAgIHN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5vblN1Ym1pdCh7XG4gICAgICAgIGlucHV0UGF0aDogaW5wdXRQYXRoRWwudmFsdWUudHJpbSgpLFxuICAgICAgICBzZXNzaW9uSWQ6IHNlc3Npb25JZEVsLnZhbHVlLnRyaW0oKSxcbiAgICAgICAgb3V0cHV0Rm9sZGVyOiBvdXRwdXRGb2xkZXJFbC52YWx1ZS50cmltKClcbiAgICAgIH0pO1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH0pO1xuICB9XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25UdXJuIH0gZnJvbSBcIi4vY29udmVyc2F0aW9uXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVR1cm5zKGNvbnRlbnQ6IHN0cmluZyk6IENvbnZlcnNhdGlvblR1cm5bXSB7XG4gIGxldCBkYXRhOiB1bmtub3duO1xuICB0cnkge1xuICAgIGRhdGEgPSBKU09OLnBhcnNlKGNvbnRlbnQpO1xuICB9IGNhdGNoIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJKU09OIFx1RDYxNVx1QzJERFx1Qzc3NCBcdUM2MkNcdUJDMTRcdUI5NzRcdUM5QzAgXHVDNTRBXHVDMkI1XHVCMkM4XHVCMkU0LlwiKTtcbiAgfVxuXG4gIGlmICghQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkpTT05cdUM3NDAgXHVCQzMwXHVDNUY0XHVDNzc0XHVDNUI0XHVDNTdDIFx1RDU2OVx1QjJDOFx1QjJFNC5cIik7XG4gIH1cblxuICByZXR1cm4gZGF0YS5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgaWYgKCFpdGVtIHx8IHR5cGVvZiBpdGVtICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFx1Qzc5OFx1QkFCQlx1QjQxQyBcdUQ1NkRcdUJBQTk6ICR7aW5kZXggKyAxfVx1QkM4OFx1QzlGOGApO1xuICAgIH1cblxuICAgIGNvbnN0IHJvbGUgPSAoaXRlbSBhcyB7IHJvbGU/OiBzdHJpbmcgfSkucm9sZTtcbiAgICBjb25zdCBjb250ZW50VmFsdWUgPSAoaXRlbSBhcyB7IGNvbnRlbnQ/OiBzdHJpbmcgfSkuY29udGVudDtcbiAgICBjb25zdCB0aW1lc3RhbXBWYWx1ZSA9IChpdGVtIGFzIHsgdGltZXN0YW1wPzogc3RyaW5nIH0pLnRpbWVzdGFtcDtcblxuICAgIGlmIChyb2xlICE9PSBcInVzZXJcIiAmJiByb2xlICE9PSBcImFzc2lzdGFudFwiICYmIHJvbGUgIT09IFwic3lzdGVtXCIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgcm9sZVx1Qzc3NCBcdUM2MkNcdUJDMTRcdUI5NzRcdUM5QzAgXHVDNTRBXHVDMkI1XHVCMkM4XHVCMkU0OiAke2luZGV4ICsgMX1cdUJDODhcdUM5RjhgKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBjb250ZW50VmFsdWUgIT09IFwic3RyaW5nXCIgfHwgIWNvbnRlbnRWYWx1ZS50cmltKCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgY29udGVudFx1QUMwMCBcdUM2MkNcdUJDMTRcdUI5NzRcdUM5QzAgXHVDNTRBXHVDMkI1XHVCMkM4XHVCMkU0OiAke2luZGV4ICsgMX1cdUJDODhcdUM5RjhgKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgcm9sZSxcbiAgICAgIGNvbnRlbnQ6IGNvbnRlbnRWYWx1ZSxcbiAgICAgIHRpbWVzdGFtcDogdGltZXN0YW1wVmFsdWVcbiAgICB9O1xuICB9KTtcbn1cbiIsICJpbXBvcnQgeyBOb3RpY2UsIFBsdWdpbiwgUGx1Z2luU2V0dGluZ1RhYiwgU2V0dGluZywgcmVxdWVzdFVybCB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHR5cGUgeyBBcGlQcm92aWRlciwgT3ZsU2V0dGluZ3MsIEVtYmVkZGluZ1Byb3ZpZGVyIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IFBST1ZJREVSX1BSRVNFVFMsIEVNQkVERElOR19QUkVTRVRTIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuZXhwb3J0IHR5cGUgU2V0dGluZ3NIb3N0ID0gUGx1Z2luICYge1xuICBzZXR0aW5nczogT3ZsU2V0dGluZ3M7XG4gIHNhdmVTZXR0aW5nczogKCkgPT4gUHJvbWlzZTx2b2lkPjtcbn07XG5cbmV4cG9ydCBjbGFzcyBPdmxTZXR0aW5nVGFiIGV4dGVuZHMgUGx1Z2luU2V0dGluZ1RhYiB7XG4gIHByaXZhdGUgcmVhZG9ubHkgcGx1Z2luOiBTZXR0aW5nc0hvc3Q7XG4gIHByaXZhdGUgZ2VtaW5pTW9kZWxzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHBsdWdpbjogU2V0dGluZ3NIb3N0KSB7XG4gICAgc3VwZXIocGx1Z2luLmFwcCwgcGx1Z2luKTtcbiAgICB0aGlzLnBsdWdpbiA9IHBsdWdpbjtcbiAgfVxuXG4gIGRpc3BsYXkoKTogdm9pZCB7XG4gICAgY29uc3QgeyBjb250YWluZXJFbCB9ID0gdGhpcztcbiAgICBjb250YWluZXJFbC5lbXB0eSgpO1xuXG4gICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJoMlwiLCB7IHRleHQ6IFwiT1ZMIFx1QzEyNFx1QzgxNVwiIH0pO1xuXG4gICAgbGV0IGFwaVVybElucHV0OiB7IHNldFZhbHVlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZCB9IHwgbnVsbCA9IG51bGw7XG4gICAgbGV0IG1vZGVsSW5wdXQ6IHsgc2V0VmFsdWU6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkIH0gfCBudWxsID0gbnVsbDtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJBUEkgXHVDODFDXHVBQ0Y1XHVDMEFDXCIpXG4gICAgICAuc2V0RGVzYyhcIlx1QzBBQ1x1QzZBOVx1RDU2MCBBUEkgXHVDODFDXHVBQ0Y1XHVDMEFDXHVCOTdDIFx1QzEyMFx1RDBERFx1RDU1OFx1QzEzOFx1QzY5NC4gKE9sbGFtYSBcdUQzRUNcdUQ1NjgpXCIpXG4gICAgICAuYWRkRHJvcGRvd24oKGRyb3Bkb3duKSA9PiB7XG4gICAgICAgIGRyb3Bkb3duXG4gICAgICAgICAgLmFkZE9wdGlvbnMoe1xuICAgICAgICAgICAgZ2VtaW5pOiBcIkdvb2dsZSBHZW1pbmlcIixcbiAgICAgICAgICAgIG9wZW5haTogXCJPcGVuQUkgXHVENjM4XHVENjU4XCIsXG4gICAgICAgICAgICBvbGxhbWE6IFwiT2xsYW1hIChcdUI4NUNcdUNFRUMpXCIsXG4gICAgICAgICAgICBjdXN0b206IFwiXHVDMEFDXHVDNkE5XHVDNzkwIFx1QzlDMFx1QzgxNVwiXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MucHJvdmlkZXIpXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSB2YWx1ZSBhcyBBcGlQcm92aWRlcjtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnByb3ZpZGVyID0gcHJvdmlkZXI7XG4gICAgICAgICAgICBjb25zdCBwcmVzZXQgPSBQUk9WSURFUl9QUkVTRVRTW3Byb3ZpZGVyXTtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmFwaVVybCA9IHByZXNldC5hcGlVcmw7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5tb2RlbCA9IHByZXNldC5tb2RlbDtcbiAgICAgICAgICAgIGFwaVVybElucHV0Py5zZXRWYWx1ZShwcmVzZXQuYXBpVXJsKTtcbiAgICAgICAgICAgIG1vZGVsSW5wdXQ/LnNldFZhbHVlKHByZXNldC5tb2RlbCk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiQVBJIFVSTFwiKVxuICAgICAgLnNldERlc2MoXCJcdUM4MUNcdUFDRjVcdUMwQUNcdUJDQzQgXHVDQzQ0XHVEMzA1IFx1QzVENFx1QjREQ1x1RDNFQ1x1Qzc3OFx1RDJCOCBVUkxcIilcbiAgICAgIC5hZGRUZXh0KCh0ZXh0KSA9PiB7XG4gICAgICAgIGFwaVVybElucHV0ID0gdGV4dDtcbiAgICAgICAgdGV4dFxuICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcImh0dHA6Ly9sb2NhbGhvc3Q6MTE0MzQvdjEvY2hhdC9jb21wbGV0aW9uc1wiKVxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5hcGlVcmwpXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuYXBpVXJsID0gdmFsdWUudHJpbSgpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJBUEkgXHVEMEE0XCIpXG4gICAgICAuc2V0RGVzYyhcIlx1RDU0NFx1QzY5NFx1RDU1QyBcdUFDQkRcdUM2QjAgQmVhcmVyIFx1RDFBMFx1RDA3MCBcdUI2MTBcdUIyOTQgXHVDODFDXHVBQ0Y1XHVDMEFDIFx1RDBBNFx1Qjk3QyBcdUM3ODVcdUI4MjVcdUQ1NThcdUMxMzhcdUM2OTQuXCIpXG4gICAgICAuYWRkVGV4dCgodGV4dCkgPT5cbiAgICAgICAgdGV4dFxuICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcIlx1QzEyMFx1RDBERFwiKVxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5hcGlLZXkpXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuYXBpS2V5ID0gdmFsdWU7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICB9KVxuICAgICAgKTtcblxuICAgIGlmICh0aGlzLnBsdWdpbi5zZXR0aW5ncy5wcm92aWRlciA9PT0gXCJnZW1pbmlcIikge1xuICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgIC5zZXROYW1lKFwiR2VtaW5pIFx1QkFBOFx1QjM3OCBcdUJBQTlcdUI4NURcIilcbiAgICAgICAgLnNldERlc2MoXCJHb29nbGVcdUM1RDBcdUMxMUMgXHVDODFDXHVBQ0Y1XHVENTU4XHVCMjk0IFx1QkFBOFx1QjM3OFx1Qzc0NCBcdUJEODhcdUI3RUNcdUM2NDAgXHVDMTIwXHVEMEREXHVENTYwIFx1QzIxOCBcdUM3ODhcdUMyQjVcdUIyQzhcdUIyRTQuXCIpXG4gICAgICAgIC5hZGRCdXR0b24oKGJ1dHRvbikgPT4ge1xuICAgICAgICAgIGJ1dHRvbi5zZXRCdXR0b25UZXh0KFwiXHVCQUE5XHVCODVEIFx1QkQ4OFx1QjdFQ1x1QzYyNFx1QUUzMFwiKS5vbkNsaWNrKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubG9hZEdlbWluaU1vZGVscygpO1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5KCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICBpZiAodGhpcy5nZW1pbmlNb2RlbHMubGVuZ3RoID4gMCkge1xuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAuc2V0TmFtZShcIkdlbWluaSBcdUJBQThcdUIzNzggXHVDMTIwXHVEMEREXCIpXG4gICAgICAgICAgLnNldERlc2MoXCJcdUJBQTlcdUI4NURcdUM1RDAgXHVDNUM2XHVCMjk0IFx1QkFBOFx1QjM3OFx1Qzc0MCBcdUM1NDRcdUI3OThcdUM1RDBcdUMxMUMgXHVDOUMxXHVDODExIFx1Qzc4NVx1QjgyNVx1RDU1OFx1QzEzOFx1QzY5NC5cIilcbiAgICAgICAgICAuYWRkRHJvcGRvd24oKGRyb3Bkb3duKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5nZW1pbmlNb2RlbHMucmVkdWNlPFJlY29yZDxzdHJpbmcsIHN0cmluZz4+KFxuICAgICAgICAgICAgICAoYWNjLCBuYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgYWNjW25hbWVdID0gbmFtZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7fVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGRyb3Bkb3duXG4gICAgICAgICAgICAgIC5hZGRPcHRpb25zKG9wdGlvbnMpXG4gICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5tb2RlbClcbiAgICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLm1vZGVsID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgbW9kZWxJbnB1dD8uc2V0VmFsdWUodmFsdWUpO1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiXHVCQUE4XHVCMzc4XCIpXG4gICAgICAuc2V0RGVzYyhcIlx1QzgxQ1x1QUNGNVx1QzBBQ1x1QkNDNCBcdUJBQThcdUIzNzggXHVDNzc0XHVCOTg0IChcdUM5QzFcdUM4MTEgXHVDNzg1XHVCODI1IFx1QUMwMFx1QjJBNSlcIilcbiAgICAgIC5hZGRUZXh0KCh0ZXh0KSA9PiB7XG4gICAgICAgIG1vZGVsSW5wdXQgPSB0ZXh0O1xuICAgICAgICB0ZXh0XG4gICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiZ3B0LTRvLW1pbmlcIilcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MubW9kZWwpXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MubW9kZWwgPSB2YWx1ZS50cmltKCk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIlx1QzJEQ1x1QzJBNFx1RDE1QyBcdUQ1MDRcdUI4NkNcdUQ1MDRcdUQyQjhcIilcbiAgICAgIC5zZXREZXNjKFwiXHVCQUE4XHVCNEUwIFx1QzY5NFx1Q0NBRFx1QzVEMCBcdUQzRUNcdUQ1NjhcdUI0MjAgXHVDMkRDXHVDMkE0XHVEMTVDIFx1QkE1NFx1QzJEQ1x1QzlDMFwiKVxuICAgICAgLmFkZFRleHRBcmVhKCh0ZXh0KSA9PlxuICAgICAgICB0ZXh0XG4gICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiXHVDNjA4OiBcdUIxMDhcdUIyOTQgT2JzaWRpYW4gXHVCOUFDXHVDMTFDXHVDRTU4IFx1QzVCNFx1QzJEQ1x1QzJBNFx1RDEzNFx1RDJCOFx1QjJFNC5cIilcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Muc3lzdGVtUHJvbXB0KVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnN5c3RlbVByb21wdCA9IHZhbHVlO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiXHVBRTMwXHVCQ0Y4IFx1QzgwMFx1QzdBNSBcdUQzRjRcdUIzNTRcIilcbiAgICAgIC5zZXREZXNjKFwiXHVCMzAwXHVENjU0XHVCOTdDIFx1QzgwMFx1QzdBNVx1RDU2MCBcdUFFMzBcdUJDRjggXHVEM0Y0XHVCMzU0IChcdUJDRkNcdUQyQjggXHVBRTMwXHVDOTAwKVwiKVxuICAgICAgLmFkZFRleHQoKHRleHQpID0+XG4gICAgICAgIHRleHRcbiAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCJcdUM2MDg6IENvbnZlcnNhdGlvbnNcIilcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZGVmYXVsdE91dHB1dEZvbGRlcilcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5kZWZhdWx0T3V0cHV0Rm9sZGVyID0gdmFsdWUudHJpbSgpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICBjb250YWluZXJFbC5jcmVhdGVFbChcImgzXCIsIHsgdGV4dDogXCJcdUM3NzhcdUIzNzFcdUMyRjEgXHVCQzBGIFx1QUM4MFx1QzBDOSBcdUMxMjRcdUM4MTVcIiB9KTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJcdUM3NzhcdUIzNzFcdUMyRjEgXHVENjVDXHVDMTMxXHVENjU0XCIpXG4gICAgICAuc2V0RGVzYyhcIlx1QkNGQ1x1RDJCOCBcdUQzMENcdUM3N0NcdUM3NDQgXHVDNzc4XHVCMzcxXHVDMkYxXHVENTU4XHVDNUVDIFx1QkNBMVx1RDEzMCBcdUFDODBcdUMwQzlcdUM3NDQgXHVENjVDXHVDMTMxXHVENjU0XHVENTY5XHVCMkM4XHVCMkU0LlwiKVxuICAgICAgLmFkZFRvZ2dsZSgodG9nZ2xlKSA9PlxuICAgICAgICB0b2dnbGVcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuaW5kZXhpbmdFbmFibGVkKVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmluZGV4aW5nRW5hYmxlZCA9IHZhbHVlO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiXHVDQ0FEXHVEMDZDIFx1RDA2Q1x1QUUzMFwiKVxuICAgICAgLnNldERlc2MoXCJcdUQxNERcdUMyQTRcdUQyQjhcdUI5N0MgXHVCRDg0XHVENTYwXHVENTYwIFx1QjU0QyBcdUFDMDEgXHVDQ0FEXHVEMDZDXHVDNzU4IFx1Q0Q1Q1x1QjMwMCBcdUQxQTBcdUQwNzAgXHVDMjE4IChcdUFFMzBcdUJDRjg6IDQwMClcIilcbiAgICAgIC5hZGRUZXh0KCh0ZXh0KSA9PlxuICAgICAgICB0ZXh0XG4gICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiNDAwXCIpXG4gICAgICAgICAgLnNldFZhbHVlKFN0cmluZyh0aGlzLnBsdWdpbi5zZXR0aW5ncy5jaHVua1NpemUpKVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG51bSA9IHBhcnNlSW50KHZhbHVlKTtcbiAgICAgICAgICAgIGlmICghaXNOYU4obnVtKSAmJiBudW0gPiAwKSB7XG4gICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmNodW5rU2l6ZSA9IG51bTtcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiXHVDQ0FEXHVEMDZDIFx1QzYyNFx1QkM4NFx1QjdBOVwiKVxuICAgICAgLnNldERlc2MoXCJcdUM3NzhcdUM4MTFcdUQ1NUMgXHVDQ0FEXHVEMDZDIFx1QUMwNCBcdUM5MTFcdUJDRjVcdUI0MThcdUIyOTQgXHVEMUEwXHVEMDcwIFx1QzIxOCAoXHVBRTMwXHVCQ0Y4OiA1MClcIilcbiAgICAgIC5hZGRUZXh0KCh0ZXh0KSA9PlxuICAgICAgICB0ZXh0XG4gICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiNTBcIilcbiAgICAgICAgICAuc2V0VmFsdWUoU3RyaW5nKHRoaXMucGx1Z2luLnNldHRpbmdzLmNodW5rT3ZlcmxhcCkpXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbnVtID0gcGFyc2VJbnQodmFsdWUpO1xuICAgICAgICAgICAgaWYgKCFpc05hTihudW0pICYmIG51bSA+PSAwKSB7XG4gICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmNodW5rT3ZlcmxhcCA9IG51bTtcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiXHVBQzgwXHVDMEM5IFx1QUNCMFx1QUNGQyBcdUMyMTggKFRvcC1LKVwiKVxuICAgICAgLnNldERlc2MoXCJcdUFDODBcdUMwQzkgXHVDMkRDIFx1QkMxOFx1RDY1OFx1RDU2MCBcdUNENUNcdUIzMDAgXHVBQ0IwXHVBQ0ZDIFx1QzIxOCAoXHVBRTMwXHVCQ0Y4OiA4KVwiKVxuICAgICAgLmFkZFRleHQoKHRleHQpID0+XG4gICAgICAgIHRleHRcbiAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCI4XCIpXG4gICAgICAgICAgLnNldFZhbHVlKFN0cmluZyh0aGlzLnBsdWdpbi5zZXR0aW5ncy50b3BLKSlcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBudW0gPSBwYXJzZUludCh2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoIWlzTmFOKG51bSkgJiYgbnVtID4gMCkge1xuICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy50b3BLID0gbnVtO1xuICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgKTtcblxuICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDNcIiwgeyB0ZXh0OiBcIlx1Qzc4NFx1QkNBMFx1QjUyOSBcdUMxMjRcdUM4MTVcIiB9KTtcblxuICAgIGxldCBlbWJlZGRpbmdNb2RlbElucHV0OiB7IHNldFZhbHVlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZCB9IHwgbnVsbCA9IG51bGw7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzgxQ1x1QUNGNVx1Qzc5MFwiKVxuICAgICAgLnNldERlc2MoXCJcdUM3ODRcdUJDQTBcdUI1MjkgXHVDMEREXHVDMTMxXHVDNUQwIFx1QzBBQ1x1QzZBOVx1RDU2MCBcdUM4MUNcdUFDRjVcdUM3OTBcdUI5N0MgXHVDMTIwXHVEMEREXHVENTU4XHVDMTM4XHVDNjk0XCIpXG4gICAgICAuYWRkRHJvcGRvd24oKGRyb3Bkb3duKSA9PiB7XG4gICAgICAgIGRyb3Bkb3duXG4gICAgICAgICAgLmFkZE9wdGlvbnMoe1xuICAgICAgICAgICAgZ2VtaW5pOiBcIkdvb2dsZSBHZW1pbmkgKEFQSSlcIixcbiAgICAgICAgICAgIG9wZW5haTogXCJPcGVuQUkgKEFQSSlcIixcbiAgICAgICAgICAgIGxvY2FsOiBcIlx1Qjg1Q1x1Q0VFQyBcdUJBQThcdUIzNzggKEh1Z2dpbmdGYWNlKVwiLFxuICAgICAgICAgICAgY3VzdG9tOiBcIlx1Q0VFNFx1QzJBNFx1RDE0MCBBUElcIlxuICAgICAgICAgIH0pXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmVtYmVkZGluZ1Byb3ZpZGVyKVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gdmFsdWUgYXMgRW1iZWRkaW5nUHJvdmlkZXI7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbWJlZGRpbmdQcm92aWRlciA9IHByb3ZpZGVyO1xuICAgICAgICAgICAgY29uc3QgcHJlc2V0ID0gRU1CRURESU5HX1BSRVNFVFNbcHJvdmlkZXJdO1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZW1iZWRkaW5nTW9kZWwgPSBwcmVzZXQubW9kZWw7XG4gICAgICAgICAgICBlbWJlZGRpbmdNb2RlbElucHV0Py5zZXRWYWx1ZShwcmVzZXQubW9kZWwpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkoKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgaWYgKHRoaXMucGx1Z2luLnNldHRpbmdzLmVtYmVkZGluZ1Byb3ZpZGVyICE9PSBcImxvY2FsXCIpIHtcbiAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAuc2V0TmFtZShcIlx1Qzc4NFx1QkNBMFx1QjUyOSBBUEkgXHVEMEE0XCIpXG4gICAgICAgIC5zZXREZXNjKFwiXHVDNzg0XHVCQ0EwXHVCNTI5IEFQSSBcdUQwQTQgKFx1QkU0NFx1QzVCNFx1Qzc4OFx1QzczQ1x1QkE3NCBMTE0gQVBJIFx1RDBBNCBcdUMwQUNcdUM2QTkpXCIpXG4gICAgICAgIC5hZGRUZXh0KCh0ZXh0KSA9PlxuICAgICAgICAgIHRleHRcbiAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcIlx1QzEyMFx1RDBERFwiKVxuICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmVtYmVkZGluZ0FwaUtleSlcbiAgICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZW1iZWRkaW5nQXBpS2V5ID0gdmFsdWU7XG4gICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QkFBOFx1QjM3OFwiKVxuICAgICAgLnNldERlc2MoXCJcdUMwQUNcdUM2QTlcdUQ1NjAgXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QkFBOFx1QjM3OFwiKVxuICAgICAgLmFkZFRleHQoKHRleHQpID0+IHtcbiAgICAgICAgZW1iZWRkaW5nTW9kZWxJbnB1dCA9IHRleHQ7XG4gICAgICAgIHRleHRcbiAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCJcdUJBQThcdUIzNzhcdUJBODVcIilcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZW1iZWRkaW5nTW9kZWwpXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZW1iZWRkaW5nTW9kZWwgPSB2YWx1ZS50cmltKCk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBsb2FkR2VtaW5pTW9kZWxzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGFwaUtleSA9IHRoaXMucGx1Z2luLnNldHRpbmdzLmFwaUtleS50cmltKCk7XG4gICAgaWYgKCFhcGlLZXkpIHtcbiAgICAgIG5ldyBOb3RpY2UoXCJHZW1pbmkgQVBJIFx1RDBBNFx1Qjk3QyBcdUJBM0NcdUM4MDAgXHVDNzg1XHVCODI1XHVENTc0IFx1QzhGQ1x1QzEzOFx1QzY5NC5cIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcmVxdWVzdFVybCh7XG4gICAgICAgIHVybDogYGh0dHBzOi8vZ2VuZXJhdGl2ZWxhbmd1YWdlLmdvb2dsZWFwaXMuY29tL3YxYmV0YS9tb2RlbHM/a2V5PSR7YXBpS2V5fWBcbiAgICAgIH0pO1xuICAgICAgY29uc3QgZGF0YSA9IHJlc3BvbnNlLmpzb24gYXNcbiAgICAgICAgfCB7IG1vZGVscz86IEFycmF5PHsgbmFtZT86IHN0cmluZzsgc3VwcG9ydGVkR2VuZXJhdGlvbk1ldGhvZHM/OiBzdHJpbmdbXSB9PiB9XG4gICAgICAgIHwgdW5kZWZpbmVkO1xuICAgICAgY29uc3QgbW9kZWxzID0gZGF0YT8ubW9kZWxzID8/IFtdO1xuICAgICAgdGhpcy5nZW1pbmlNb2RlbHMgPSBtb2RlbHNcbiAgICAgICAgLmZpbHRlcigobW9kZWwpID0+IG1vZGVsLnN1cHBvcnRlZEdlbmVyYXRpb25NZXRob2RzPy5pbmNsdWRlcyhcImdlbmVyYXRlQ29udGVudFwiKSlcbiAgICAgICAgLm1hcCgobW9kZWwpID0+IG1vZGVsLm5hbWUpXG4gICAgICAgIC5maWx0ZXIoKG5hbWUpOiBuYW1lIGlzIHN0cmluZyA9PiBCb29sZWFuKG5hbWUpKTtcblxuICAgICAgaWYgKHRoaXMuZ2VtaW5pTW9kZWxzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBuZXcgTm90aWNlKFwiXHVDMEFDXHVDNkE5IFx1QUMwMFx1QjJBNVx1RDU1QyBHZW1pbmkgXHVCQUE4XHVCMzc4XHVDNzQ0IFx1Q0MzRVx1QzlDMCBcdUJBQkJcdUQ1ODhcdUMyQjVcdUIyQzhcdUIyRTQuXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3IE5vdGljZShcIkdlbWluaSBcdUJBQThcdUIzNzggXHVCQUE5XHVCODVEXHVDNzQ0IFx1QkQ4OFx1QjdFQ1x1QzY1NFx1QzJCNVx1QjJDOFx1QjJFNC5cIik7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcik7XG4gICAgICBuZXcgTm90aWNlKGBHZW1pbmkgXHVCQUE4XHVCMzc4IFx1QkFBOVx1Qjg1RCBcdUMyRTRcdUQzMjg6ICR7bWVzc2FnZX1gKTtcbiAgICB9XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBJdGVtVmlldywgTm90aWNlLCBXb3Jrc3BhY2VMZWFmIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvblR1cm4gfSBmcm9tIFwiLi4vY29udmVyc2F0aW9uXCI7XG5pbXBvcnQgdHlwZSB7IFBsdWdpbkNoYXRBcGkgfSBmcm9tIFwiLi4vcGx1Z2luQXBpXCI7XG5cbmV4cG9ydCBjb25zdCBWSUVXX1RZUEVfT1ZMX0NIQVQgPSBcIm92bC1jaGF0LXZpZXdcIjtcblxuZXhwb3J0IGNsYXNzIENoYXRWaWV3IGV4dGVuZHMgSXRlbVZpZXcge1xuICBwcml2YXRlIHJlYWRvbmx5IHBsdWdpbjogUGx1Z2luQ2hhdEFwaTtcbiAgcHJpdmF0ZSBtZXNzYWdlczogQ29udmVyc2F0aW9uVHVybltdID0gW107XG4gIHByaXZhdGUgbWVzc2FnZXNFbDogSFRNTERpdkVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBpbnB1dEVsOiBIVE1MVGV4dEFyZWFFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgc2VuZEJ1dHRvbkVsOiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIHNhdmVCdXR0b25FbDogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBzZXNzaW9uSWRFbDogSFRNTElucHV0RWxlbWVudCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIHVzZVJhZ0NoZWNrYm94OiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgc2hvd1NvdXJjZXNDaGVja2JveDogSFRNTElucHV0RWxlbWVudCB8IG51bGwgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKGxlYWY6IFdvcmtzcGFjZUxlYWYsIHBsdWdpbjogUGx1Z2luQ2hhdEFwaSkge1xuICAgIHN1cGVyKGxlYWYpO1xuICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xuICB9XG5cbiAgZ2V0Vmlld1R5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gVklFV19UWVBFX09WTF9DSEFUO1xuICB9XG5cbiAgZ2V0RGlzcGxheVRleHQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gXCJPVkwgXHVCMzAwXHVENjU0XCI7XG4gIH1cblxuICBnZXRJY29uKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFwibWVzc2FnZS1jaXJjbGVcIjtcbiAgfVxuXG4gIGFzeW5jIG9uT3BlbigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB7IGNvbnRlbnRFbCB9ID0gdGhpcztcbiAgICBjb250ZW50RWwuZW1wdHkoKTtcbiAgICBjb250ZW50RWwuYWRkQ2xhc3MoXCJvdmwtY2hhdC12aWV3XCIpO1xuXG4gICAgY29uc3QgaGVhZGVyRWwgPSBjb250ZW50RWwuY3JlYXRlRWwoXCJkaXZcIiwgeyBjbHM6IFwib3ZsLWNoYXQtaGVhZGVyXCIgfSk7XG4gICAgaGVhZGVyRWwuY3JlYXRlRWwoXCJkaXZcIiwgeyBjbHM6IFwib3ZsLWNoYXQtdGl0bGVcIiwgdGV4dDogXCJPVkwgXHVCMzAwXHVENjU0XCIgfSk7XG5cbiAgICBjb25zdCBzZXNzaW9uV3JhcEVsID0gaGVhZGVyRWwuY3JlYXRlRWwoXCJkaXZcIiwgeyBjbHM6IFwib3ZsLWNoYXQtc2Vzc2lvblwiIH0pO1xuICAgIHNlc3Npb25XcmFwRWwuY3JlYXRlRWwoXCJzcGFuXCIsIHsgdGV4dDogXCJcdUMxMzhcdUMxNThcIiB9KTtcbiAgICBjb25zdCBzZXNzaW9uSW5wdXRFbCA9IHNlc3Npb25XcmFwRWwuY3JlYXRlRWwoXCJpbnB1dFwiLCB7IHR5cGU6IFwidGV4dFwiIH0pO1xuICAgIHNlc3Npb25JbnB1dEVsLnZhbHVlID0gdGhpcy5idWlsZFNlc3Npb25JZCgpO1xuICAgIHRoaXMuc2Vzc2lvbklkRWwgPSBzZXNzaW9uSW5wdXRFbDtcblxuICAgIGNvbnN0IGNvbnRyb2xzRWwgPSBoZWFkZXJFbC5jcmVhdGVFbChcImRpdlwiLCB7IGNsczogXCJvdmwtY2hhdC1jb250cm9sc1wiIH0pO1xuICAgIFxuICAgIC8vIFJBRyBcdUM2MzVcdUMxNThcbiAgICBjb25zdCByYWdXcmFwRWwgPSBjb250cm9sc0VsLmNyZWF0ZUVsKFwiZGl2XCIsIHsgY2xzOiBcIm92bC1yYWctb3B0aW9uc1wiIH0pO1xuICAgIGNvbnN0IHVzZVJhZ0xhYmVsID0gcmFnV3JhcEVsLmNyZWF0ZUVsKFwibGFiZWxcIik7XG4gICAgY29uc3QgdXNlUmFnQ2hlY2tib3ggPSB1c2VSYWdMYWJlbC5jcmVhdGVFbChcImlucHV0XCIsIHsgdHlwZTogXCJjaGVja2JveFwiIH0pO1xuICAgIHVzZVJhZ0NoZWNrYm94LmNoZWNrZWQgPSB0cnVlO1xuICAgIHVzZVJhZ0xhYmVsLmFwcGVuZFRleHQoXCIgUkFHIFx1QzBBQ1x1QzZBOVwiKTtcbiAgICB0aGlzLnVzZVJhZ0NoZWNrYm94ID0gdXNlUmFnQ2hlY2tib3g7XG5cbiAgICBjb25zdCBzaG93U291cmNlc0xhYmVsID0gcmFnV3JhcEVsLmNyZWF0ZUVsKFwibGFiZWxcIik7XG4gICAgY29uc3Qgc2hvd1NvdXJjZXNDaGVja2JveCA9IHNob3dTb3VyY2VzTGFiZWwuY3JlYXRlRWwoXCJpbnB1dFwiLCB7IHR5cGU6IFwiY2hlY2tib3hcIiB9KTtcbiAgICBzaG93U291cmNlc0NoZWNrYm94LmNoZWNrZWQgPSBmYWxzZTtcbiAgICBzaG93U291cmNlc0xhYmVsLmFwcGVuZFRleHQoXCIgXHVDMThDXHVDMkE0XHVCOUNDIFx1QkNGNFx1QUUzMFwiKTtcbiAgICB0aGlzLnNob3dTb3VyY2VzQ2hlY2tib3ggPSBzaG93U291cmNlc0NoZWNrYm94O1xuXG4gICAgY29uc3Qgc2F2ZUJ1dHRvbkVsID0gY29udHJvbHNFbC5jcmVhdGVFbChcImJ1dHRvblwiLCB7IHRleHQ6IFwiXHVDODAwXHVDN0E1XCIgfSk7XG4gICAgc2F2ZUJ1dHRvbkVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB2b2lkIHRoaXMuaGFuZGxlU2F2ZSgpO1xuICAgIH0pO1xuICAgIHRoaXMuc2F2ZUJ1dHRvbkVsID0gc2F2ZUJ1dHRvbkVsO1xuXG4gICAgY29uc3QgbWVzc2FnZXNFbCA9IGNvbnRlbnRFbC5jcmVhdGVFbChcImRpdlwiLCB7IGNsczogXCJvdmwtY2hhdC1tZXNzYWdlc1wiIH0pO1xuICAgIHRoaXMubWVzc2FnZXNFbCA9IG1lc3NhZ2VzRWw7XG5cbiAgICBjb25zdCBpbnB1dFdyYXBFbCA9IGNvbnRlbnRFbC5jcmVhdGVFbChcImRpdlwiLCB7IGNsczogXCJvdmwtY2hhdC1pbnB1dFwiIH0pO1xuICAgIGNvbnN0IHRleHRhcmVhRWwgPSBpbnB1dFdyYXBFbC5jcmVhdGVFbChcInRleHRhcmVhXCIpO1xuICAgIHRleHRhcmVhRWwucGxhY2Vob2xkZXIgPSBcIlx1QkE1NFx1QzJEQ1x1QzlDMFx1Qjk3QyBcdUM3ODVcdUI4MjVcdUQ1NThcdUMxMzhcdUM2OTQuIChDdHJsK0VudGVyIFx1QzgwNFx1QzFBMSlcIjtcbiAgICB0aGlzLmlucHV0RWwgPSB0ZXh0YXJlYUVsO1xuXG4gICAgY29uc3Qgc2VuZEJ1dHRvbkVsID0gaW5wdXRXcmFwRWwuY3JlYXRlRWwoXCJidXR0b25cIiwgeyB0ZXh0OiBcIlx1QzgwNFx1QzFBMVwiIH0pO1xuICAgIHNlbmRCdXR0b25FbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdm9pZCB0aGlzLmhhbmRsZVNlbmQoKTtcbiAgICB9KTtcbiAgICB0aGlzLnNlbmRCdXR0b25FbCA9IHNlbmRCdXR0b25FbDtcblxuICAgIHRleHRhcmVhRWwuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVudGVyXCIgJiYgKGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQubWV0YUtleSkpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdm9pZCB0aGlzLmhhbmRsZVNlbmQoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYnVpbGRTZXNzaW9uSWQoKTogc3RyaW5nIHtcbiAgICBjb25zdCBzdGFtcCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5yZXBsYWNlKC9bOi5dL2csIFwiLVwiKTtcbiAgICByZXR1cm4gYHNlc3Npb24tJHtzdGFtcH1gO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRCdXN5KGlzQnVzeTogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICh0aGlzLnNlbmRCdXR0b25FbCkge1xuICAgICAgdGhpcy5zZW5kQnV0dG9uRWwuZGlzYWJsZWQgPSBpc0J1c3k7XG4gICAgfVxuICAgIGlmICh0aGlzLnNhdmVCdXR0b25FbCkge1xuICAgICAgdGhpcy5zYXZlQnV0dG9uRWwuZGlzYWJsZWQgPSBpc0J1c3k7XG4gICAgfVxuICAgIGlmICh0aGlzLmlucHV0RWwpIHtcbiAgICAgIHRoaXMuaW5wdXRFbC5kaXNhYmxlZCA9IGlzQnVzeTtcbiAgICB9XG4gICAgaWYgKGlzQnVzeSkge1xuICAgICAgdGhpcy5jb250ZW50RWwuYWRkQ2xhc3MoXCJvdmwtY2hhdC1idXN5XCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbnRlbnRFbC5yZW1vdmVDbGFzcyhcIm92bC1jaGF0LWJ1c3lcIik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhcHBlbmRNZXNzYWdlKHR1cm46IENvbnZlcnNhdGlvblR1cm4pOiB2b2lkIHtcbiAgICB0aGlzLm1lc3NhZ2VzLnB1c2godHVybik7XG4gICAgaWYgKCF0aGlzLm1lc3NhZ2VzRWwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNzYWdlRWwgPSB0aGlzLm1lc3NhZ2VzRWwuY3JlYXRlRWwoXCJkaXZcIiwge1xuICAgICAgY2xzOiBgb3ZsLWNoYXQtbWVzc2FnZSBvdmwtY2hhdC0ke3R1cm4ucm9sZX1gXG4gICAgfSk7XG4gICAgbWVzc2FnZUVsLmNyZWF0ZUVsKFwiZGl2XCIsIHtcbiAgICAgIGNsczogXCJvdmwtY2hhdC1yb2xlXCIsXG4gICAgICB0ZXh0OiB0aGlzLmdldFJvbGVMYWJlbCh0dXJuLnJvbGUpXG4gICAgfSk7XG4gICAgbWVzc2FnZUVsLmNyZWF0ZUVsKFwiZGl2XCIsIHtcbiAgICAgIGNsczogXCJvdmwtY2hhdC1jb250ZW50XCIsXG4gICAgICB0ZXh0OiB0dXJuLmNvbnRlbnRcbiAgICB9KTtcbiAgICBpZiAodHVybi50aW1lc3RhbXApIHtcbiAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IHR5cGVvZiB0dXJuLnRpbWVzdGFtcCA9PT0gXCJzdHJpbmdcIlxuICAgICAgICA/IHR1cm4udGltZXN0YW1wXG4gICAgICAgIDogdHVybi50aW1lc3RhbXAudG9JU09TdHJpbmcoKTtcbiAgICAgIG1lc3NhZ2VFbC5jcmVhdGVFbChcImRpdlwiLCB7XG4gICAgICAgIGNsczogXCJvdmwtY2hhdC10aW1lc3RhbXBcIixcbiAgICAgICAgdGV4dDogdGltZXN0YW1wXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLm1lc3NhZ2VzRWwuc2Nyb2xsVG9wID0gdGhpcy5tZXNzYWdlc0VsLnNjcm9sbEhlaWdodDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Um9sZUxhYmVsKHJvbGU6IENvbnZlcnNhdGlvblR1cm5bXCJyb2xlXCJdKTogc3RyaW5nIHtcbiAgICBpZiAocm9sZSA9PT0gXCJ1c2VyXCIpIHtcbiAgICAgIHJldHVybiBcIlx1QzBBQ1x1QzZBOVx1Qzc5MFwiO1xuICAgIH1cbiAgICBpZiAocm9sZSA9PT0gXCJhc3Npc3RhbnRcIikge1xuICAgICAgcmV0dXJuIFwiXHVDNUI0XHVDMkRDXHVDMkE0XHVEMTM0XHVEMkI4XCI7XG4gICAgfVxuICAgIHJldHVybiBcIlx1QzJEQ1x1QzJBNFx1RDE1Q1wiO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVTZW5kKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGlucHV0ID0gdGhpcy5pbnB1dEVsPy52YWx1ZS50cmltKCkgPz8gXCJcIjtcbiAgICBpZiAoIWlucHV0KSB7XG4gICAgICBuZXcgTm90aWNlKFwiXHVCQTU0XHVDMkRDXHVDOUMwXHVCOTdDIFx1Qzc4NVx1QjgyNVx1RDU3NCBcdUM4RkNcdUMxMzhcdUM2OTQuXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuYXBwZW5kTWVzc2FnZSh7XG4gICAgICByb2xlOiBcInVzZXJcIixcbiAgICAgIGNvbnRlbnQ6IGlucHV0LFxuICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKClcbiAgICB9KTtcbiAgICBpZiAodGhpcy5pbnB1dEVsKSB7XG4gICAgICB0aGlzLmlucHV0RWwudmFsdWUgPSBcIlwiO1xuICAgIH1cblxuICAgIHRoaXMuc2V0QnVzeSh0cnVlKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdXNlUmFnID0gdGhpcy51c2VSYWdDaGVja2JveD8uY2hlY2tlZCA/PyBmYWxzZTtcbiAgICAgIGNvbnN0IHNob3dTb3VyY2VzT25seSA9IHRoaXMuc2hvd1NvdXJjZXNDaGVja2JveD8uY2hlY2tlZCA/PyBmYWxzZTtcblxuICAgICAgbGV0IHJlcGx5OiBzdHJpbmc7XG5cbiAgICAgIGlmICh1c2VSYWcgJiYgdGhpcy5wbHVnaW4uc2V0dGluZ3MuaW5kZXhpbmdFbmFibGVkKSB7XG4gICAgICAgIC8vIFJBRyBcdUMwQUNcdUM2QTk6IFx1QUM4MFx1QzBDOSBcdUQ2QzQgXHVDRUU4XHVEMTREXHVDMkE0XHVEMkI4IFx1Q0Q5NFx1QUMwMFxuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHNlYXJjaFJlc3VsdHMgPSBhd2FpdCB0aGlzLnBsdWdpbi5zZWFyY2goaW5wdXQpO1xuICAgICAgICAgIFxuICAgICAgICAgIGlmIChzaG93U291cmNlc09ubHkpIHtcbiAgICAgICAgICAgIC8vIFx1QzE4Q1x1QzJBNFx1QjlDQyBcdUQ0NUNcdUMyRENcbiAgICAgICAgICAgIHJlcGx5ID0gdGhpcy5mb3JtYXRTZWFyY2hSZXN1bHRzKHNlYXJjaFJlc3VsdHMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBcdUFDODBcdUMwQzkgXHVBQ0IwXHVBQ0ZDXHVCOTdDIFx1Q0VFOFx1RDE0RFx1QzJBNFx1RDJCOFx1Qjg1QyBMTE1cdUM1RDAgXHVDODA0XHVCMkVDXG4gICAgICAgICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5idWlsZENvbnRleHQoc2VhcmNoUmVzdWx0cyk7XG4gICAgICAgICAgICBjb25zdCBlbmhhbmNlZE1lc3NhZ2VzID0gdGhpcy5idWlsZEVuaGFuY2VkTWVzc2FnZXMoaW5wdXQsIGNvbnRleHQpO1xuICAgICAgICAgICAgcmVwbHkgPSBhd2FpdCB0aGlzLnBsdWdpbi5yZXF1ZXN0QXNzaXN0YW50UmVwbHkoZW5oYW5jZWRNZXNzYWdlcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJSQUcgXHVBQzgwXHVDMEM5IFx1QzJFNFx1RDMyODpcIiwgZXJyb3IpO1xuICAgICAgICAgIG5ldyBOb3RpY2UoXCJcdUFDODBcdUMwQzlcdUM1RDAgXHVDMkU0XHVEMzI4XHVENTU4XHVDNUVDIFx1Qzc3Q1x1QkMxOCBcdUJBQThcdUI0RENcdUI4NUMgXHVDODA0XHVENjU4XHVENTY5XHVCMkM4XHVCMkU0XCIpO1xuICAgICAgICAgIHJlcGx5ID0gYXdhaXQgdGhpcy5wbHVnaW4ucmVxdWVzdEFzc2lzdGFudFJlcGx5KHRoaXMubWVzc2FnZXMpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBcdUM3N0NcdUJDMTggXHVCQUE4XHVCNERDXG4gICAgICAgIHJlcGx5ID0gYXdhaXQgdGhpcy5wbHVnaW4ucmVxdWVzdEFzc2lzdGFudFJlcGx5KHRoaXMubWVzc2FnZXMpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmFwcGVuZE1lc3NhZ2Uoe1xuICAgICAgICByb2xlOiBcImFzc2lzdGFudFwiLFxuICAgICAgICBjb250ZW50OiByZXBseSxcbiAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKClcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpO1xuICAgICAgbmV3IE5vdGljZShgXHVCMzAwXHVENjU0IFx1QzJFNFx1RDMyODogJHttZXNzYWdlfWApO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLnNldEJ1c3koZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYnVpbGRDb250ZXh0KHNlYXJjaFJlc3VsdHM6IGFueVtdKTogc3RyaW5nIHtcbiAgICBpZiAoc2VhcmNoUmVzdWx0cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBcIlx1QUQwMFx1QjgyOCBcdUJCMzhcdUMxMUNcdUI5N0MgXHVDQzNFXHVDNzQ0IFx1QzIxOCBcdUM1QzZcdUMyQjVcdUIyQzhcdUIyRTQuXCI7XG4gICAgfVxuXG4gICAgbGV0IGNvbnRleHQgPSBcIlx1QjJFNFx1Qzc0Q1x1Qzc0MCBcdUFDODBcdUMwQzlcdUI0MUMgXHVBRDAwXHVCODI4IFx1QkIzOFx1QzExQ1x1QjRFNFx1Qzc4NVx1QjJDOFx1QjJFNDpcXG5cXG5cIjtcbiAgICBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlYXJjaFJlc3VsdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHNlYXJjaFJlc3VsdHNbaV07XG4gICAgICBjb25zdCB7IGNodW5rLCBub3RlLCBzY29yZSB9ID0gcmVzdWx0O1xuICAgICAgXG4gICAgICBjb250ZXh0ICs9IGAjIyBcdUJCMzhcdUMxMUMgJHtpICsgMX06ICR7bm90ZS50aXRsZX1cXG5gO1xuICAgICAgY29udGV4dCArPSBgLSBcdUQzMENcdUM3N0M6ICR7bm90ZS5wYXRofVxcbmA7XG4gICAgICBjb250ZXh0ICs9IGAtIFx1QzEzOVx1QzE1ODogJHtjaHVuay5zZWN0aW9uIHx8IFwiXHVCQ0Y4XHVCQjM4XCJ9XFxuYDtcbiAgICAgIGNvbnRleHQgKz0gYC0gXHVDNzIwXHVDMEFDXHVCM0M0OiAkeyhzY29yZSAqIDEwMCkudG9GaXhlZCgxKX0lXFxuXFxuYDtcbiAgICAgIGNvbnRleHQgKz0gYCR7Y2h1bmsudGV4dH1cXG5cXG5gO1xuICAgICAgY29udGV4dCArPSBcIi0tLVxcblxcblwiO1xuICAgIH1cblxuICAgIHJldHVybiBjb250ZXh0O1xuICB9XG5cbiAgcHJpdmF0ZSBmb3JtYXRTZWFyY2hSZXN1bHRzKHNlYXJjaFJlc3VsdHM6IGFueVtdKTogc3RyaW5nIHtcbiAgICBpZiAoc2VhcmNoUmVzdWx0cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBcIlx1QUM4MFx1QzBDOSBcdUFDQjBcdUFDRkNcdUFDMDAgXHVDNUM2XHVDMkI1XHVCMkM4XHVCMkU0LlwiO1xuICAgIH1cblxuICAgIGxldCBvdXRwdXQgPSBcIiMgXHVBQzgwXHVDMEM5IFx1QUNCMFx1QUNGQ1xcblxcblwiO1xuICAgIFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VhcmNoUmVzdWx0cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgcmVzdWx0ID0gc2VhcmNoUmVzdWx0c1tpXTtcbiAgICAgIGNvbnN0IHsgY2h1bmssIG5vdGUsIHNjb3JlIH0gPSByZXN1bHQ7XG4gICAgICBcbiAgICAgIG91dHB1dCArPSBgIyMgJHtpICsgMX0uICR7bm90ZS50aXRsZX1cXG5cXG5gO1xuICAgICAgb3V0cHV0ICs9IGAqKlx1RDMwQ1x1Qzc3QyoqOiBbWyR7bm90ZS5wYXRofV1dXFxuYDtcbiAgICAgIG91dHB1dCArPSBgKipcdUMxMzlcdUMxNTgqKjogJHtjaHVuay5zZWN0aW9uIHx8IFwiXHVCQ0Y4XHVCQjM4XCJ9XFxuYDtcbiAgICAgIG91dHB1dCArPSBgKipcdUM3MjBcdUMwQUNcdUIzQzQqKjogJHsoc2NvcmUgKiAxMDApLnRvRml4ZWQoMSl9JVxcblxcbmA7XG4gICAgICBvdXRwdXQgKz0gYD4gJHtjaHVuay50ZXh0LnN1YnN0cmluZygwLCAyMDApfSR7Y2h1bmsudGV4dC5sZW5ndGggPiAyMDAgPyBcIi4uLlwiIDogXCJcIn1cXG5cXG5gO1xuICAgIH1cblxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkRW5oYW5jZWRNZXNzYWdlcyhxdWVyeTogc3RyaW5nLCBjb250ZXh0OiBzdHJpbmcpOiBDb252ZXJzYXRpb25UdXJuW10ge1xuICAgIC8vIFx1QzJEQ1x1QzJBNFx1RDE1QyBcdUQ1MDRcdUI4NkNcdUQ1MDRcdUQyQjhcdUM1RDAgXHVDRUU4XHVEMTREXHVDMkE0XHVEMkI4IFx1Q0Q5NFx1QUMwMFxuICAgIGNvbnN0IHN5c3RlbVByb21wdCA9IGBcdUIxMDhcdUIyOTQgT2JzaWRpYW4gXHVCQ0ZDXHVEMkI4XHVDNzU4IFx1QzgwNFx1QkIzOCBcdUI5QUNcdUMxMUNcdUNFNTggXHVDNUI0XHVDMkRDXHVDMkE0XHVEMTM0XHVEMkI4XHVCMkU0LiBcblx1QzgxQ1x1QUNGNVx1QjQxQyBcdUJCMzhcdUMxMUNcdUI0RTRcdUM3NDQgXHVDQzM4XHVBQ0UwXHVENTU4XHVDNUVDIFx1QzBBQ1x1QzZBOVx1Qzc5MFx1Qzc1OCBcdUM5QzhcdUJCMzhcdUM1RDAgXHVCMkY1XHVCQ0MwXHVENTU4XHVCNDE4LCBcdUQ1NkRcdUMwQzEgXHVDRDlDXHVDQzk4XHVCOTdDIFx1QkE4NVx1QzJEQ1x1RDU1OFx1Qjc3Qy5cblx1QkFBOFx1Qjk3NFx1QjI5NCBcdUIwQjRcdUM2QTlcdUM3NDAgXHVDRDk0XHVDRTIxXHVENTU4XHVDOUMwIFx1QjlEMFx1QUNFMCBcdUMxOTRcdUM5QzFcdUQ1NThcdUFDOEMgXHVCQUE4XHVCOTc4XHVCMkU0XHVBQ0UwIFx1QjJGNVx1QkNDMFx1RDU1OFx1Qjc3Qy5cblxuJHtjb250ZXh0fWA7XG5cbiAgICAvLyBcdUFFMzBcdUM4NzQgXHVCQTU0XHVDMkRDXHVDOUMwXHVDNUQwIFx1QzJEQ1x1QzJBNFx1RDE1QyBcdUQ1MDRcdUI4NkNcdUQ1MDRcdUQyQjggXHVDRDk0XHVBQzAwXG4gICAgcmV0dXJuIFtcbiAgICAgIHsgcm9sZTogXCJzeXN0ZW1cIiwgY29udGVudDogc3lzdGVtUHJvbXB0LCB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSB9LFxuICAgICAgLi4udGhpcy5tZXNzYWdlc1xuICAgIF07XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGhhbmRsZVNhdmUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKHRoaXMubWVzc2FnZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICBuZXcgTm90aWNlKFwiXHVDODAwXHVDN0E1XHVENTYwIFx1QjMwMFx1RDY1NFx1QUMwMCBcdUM1QzZcdUMyQjVcdUIyQzhcdUIyRTQuXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNlc3Npb25JZCA9IHRoaXMuc2Vzc2lvbklkRWw/LnZhbHVlLnRyaW0oKSA/PyBcIlwiO1xuICAgIGlmICghc2Vzc2lvbklkKSB7XG4gICAgICBuZXcgTm90aWNlKFwiXHVDMTM4XHVDMTU4IElEXHVCOTdDIFx1Qzc4NVx1QjgyNVx1RDU3NCBcdUM4RkNcdUMxMzhcdUM2OTQuXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCB0YXJnZXRQYXRoID0gYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZUNvbnZlcnNhdGlvbkZyb21UdXJucyhcbiAgICAgICAgc2Vzc2lvbklkLFxuICAgICAgICB0aGlzLm1lc3NhZ2VzLFxuICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5kZWZhdWx0T3V0cHV0Rm9sZGVyXG4gICAgICApO1xuICAgICAgbmV3IE5vdGljZShgXHVCMzAwXHVENjU0IFx1QzgwMFx1QzdBNSBcdUM2NDRcdUI4Q0M6ICR7dGFyZ2V0UGF0aH1gKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKTtcbiAgICAgIG5ldyBOb3RpY2UoYFx1QzgwMFx1QzdBNSBcdUMyRTRcdUQzMjg6ICR7bWVzc2FnZX1gKTtcbiAgICB9XG4gIH1cbn1cbiIsICIvLyBTUUxpdGUgXHVCQTU0XHVEMEMwXHVCMzcwXHVDNzc0XHVEMTMwIFx1QzgwMFx1QzdBNVx1QzE4Q1xuXG5pbXBvcnQgRGF0YWJhc2UgZnJvbSBcImJldHRlci1zcWxpdGUzXCI7XG5pbXBvcnQgeyBOb3RlTWV0YWRhdGEsIENodW5rIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuZXhwb3J0IGNsYXNzIE1ldGFkYXRhU3RvcmUge1xuICBwcml2YXRlIGRiOiBEYXRhYmFzZS5EYXRhYmFzZTtcblxuICBjb25zdHJ1Y3RvcihkYlBhdGg6IHN0cmluZykge1xuICAgIHRoaXMuZGIgPSBuZXcgRGF0YWJhc2UoZGJQYXRoKTtcbiAgICB0aGlzLmluaXRpYWxpemVTY2hlbWEoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUIzNzBcdUM3NzRcdUQxMzBcdUJDQTBcdUM3NzRcdUMyQTQgXHVDMkE0XHVEMEE0XHVCOUM4IFx1Q0QwOFx1QUUzMFx1RDY1NFxuICAgKi9cbiAgcHJpdmF0ZSBpbml0aWFsaXplU2NoZW1hKCk6IHZvaWQge1xuICAgIHRoaXMuZGIuZXhlYyhgXG4gICAgICBDUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUUyBub3RlcyAoXG4gICAgICAgIGlkIFRFWFQgUFJJTUFSWSBLRVksXG4gICAgICAgIHBhdGggVEVYVCBVTklRVUUgTk9UIE5VTEwsXG4gICAgICAgIHRpdGxlIFRFWFQgTk9UIE5VTEwsXG4gICAgICAgIHRhZ3MgVEVYVCwgLS0gSlNPTiBhcnJheVxuICAgICAgICBsaW5rcyBURVhULCAtLSBKU09OIGFycmF5XG4gICAgICAgIGZyb250bWF0dGVyIFRFWFQsIC0tIEpTT04gb2JqZWN0XG4gICAgICAgIHVwZGF0ZWRfYXQgSU5URUdFUiBOT1QgTlVMTCxcbiAgICAgICAgaGFzaCBURVhUIE5PVCBOVUxMXG4gICAgICApO1xuXG4gICAgICBDUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUUyBjaHVua3MgKFxuICAgICAgICBpZCBURVhUIFBSSU1BUlkgS0VZLFxuICAgICAgICBub3RlX2lkIFRFWFQgTk9UIE5VTEwsXG4gICAgICAgIHRleHQgVEVYVCBOT1QgTlVMTCxcbiAgICAgICAgcG9zaXRpb24gSU5URUdFUiBOT1QgTlVMTCxcbiAgICAgICAgdG9rZW5fY291bnQgSU5URUdFUiBOT1QgTlVMTCxcbiAgICAgICAgc2VjdGlvbiBURVhULFxuICAgICAgICBGT1JFSUdOIEtFWSAobm90ZV9pZCkgUkVGRVJFTkNFUyBub3RlcyhpZCkgT04gREVMRVRFIENBU0NBREVcbiAgICAgICk7XG5cbiAgICAgIENSRUFURSBJTkRFWCBJRiBOT1QgRVhJU1RTIGlkeF9ub3Rlc19wYXRoIE9OIG5vdGVzKHBhdGgpO1xuICAgICAgQ1JFQVRFIElOREVYIElGIE5PVCBFWElTVFMgaWR4X25vdGVzX3VwZGF0ZWRfYXQgT04gbm90ZXModXBkYXRlZF9hdCk7XG4gICAgICBDUkVBVEUgSU5ERVggSUYgTk9UIEVYSVNUUyBpZHhfY2h1bmtzX25vdGVfaWQgT04gY2h1bmtzKG5vdGVfaWQpO1xuICAgIGApO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1QjE3OFx1RDJCOCBcdUM4MDBcdUM3QTUgXHVCNjEwXHVCMjk0IFx1QzVDNVx1QjM3MFx1Qzc3NFx1RDJCOFxuICAgKi9cbiAgdXBzZXJ0Tm90ZShub3RlOiBOb3RlTWV0YWRhdGEpOiB2b2lkIHtcbiAgICBjb25zdCBzdG10ID0gdGhpcy5kYi5wcmVwYXJlKGBcbiAgICAgIElOU0VSVCBJTlRPIG5vdGVzIChpZCwgcGF0aCwgdGl0bGUsIHRhZ3MsIGxpbmtzLCBmcm9udG1hdHRlciwgdXBkYXRlZF9hdCwgaGFzaClcbiAgICAgIFZBTFVFUyAoPywgPywgPywgPywgPywgPywgPywgPylcbiAgICAgIE9OIENPTkZMSUNUKGlkKSBETyBVUERBVEUgU0VUXG4gICAgICAgIHBhdGggPSBleGNsdWRlZC5wYXRoLFxuICAgICAgICB0aXRsZSA9IGV4Y2x1ZGVkLnRpdGxlLFxuICAgICAgICB0YWdzID0gZXhjbHVkZWQudGFncyxcbiAgICAgICAgbGlua3MgPSBleGNsdWRlZC5saW5rcyxcbiAgICAgICAgZnJvbnRtYXR0ZXIgPSBleGNsdWRlZC5mcm9udG1hdHRlcixcbiAgICAgICAgdXBkYXRlZF9hdCA9IGV4Y2x1ZGVkLnVwZGF0ZWRfYXQsXG4gICAgICAgIGhhc2ggPSBleGNsdWRlZC5oYXNoXG4gICAgYCk7XG5cbiAgICBzdG10LnJ1bihcbiAgICAgIG5vdGUuaWQsXG4gICAgICBub3RlLnBhdGgsXG4gICAgICBub3RlLnRpdGxlLFxuICAgICAgSlNPTi5zdHJpbmdpZnkobm90ZS50YWdzKSxcbiAgICAgIEpTT04uc3RyaW5naWZ5KG5vdGUubGlua3MpLFxuICAgICAgSlNPTi5zdHJpbmdpZnkobm90ZS5mcm9udG1hdHRlciksXG4gICAgICBub3RlLnVwZGF0ZWRBdCxcbiAgICAgIG5vdGUuaGFzaFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogXHVBQ0JEXHVCODVDXHVCODVDIFx1QjE3OFx1RDJCOCBcdUM4NzBcdUQ2OENcbiAgICovXG4gIGdldE5vdGVCeVBhdGgocGF0aDogc3RyaW5nKTogTm90ZU1ldGFkYXRhIHwgbnVsbCB7XG4gICAgY29uc3Qgc3RtdCA9IHRoaXMuZGIucHJlcGFyZShcIlNFTEVDVCAqIEZST00gbm90ZXMgV0hFUkUgcGF0aCA9ID9cIik7XG4gICAgY29uc3Qgcm93ID0gc3RtdC5nZXQocGF0aCkgYXMgYW55O1xuICAgIHJldHVybiByb3cgPyB0aGlzLnJvd1RvTm90ZShyb3cpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJRFx1Qjg1QyBcdUIxNzhcdUQyQjggXHVDODcwXHVENjhDXG4gICAqL1xuICBnZXROb3RlQnlJZChpZDogc3RyaW5nKTogTm90ZU1ldGFkYXRhIHwgbnVsbCB7XG4gICAgY29uc3Qgc3RtdCA9IHRoaXMuZGIucHJlcGFyZShcIlNFTEVDVCAqIEZST00gbm90ZXMgV0hFUkUgaWQgPSA/XCIpO1xuICAgIGNvbnN0IHJvdyA9IHN0bXQuZ2V0KGlkKSBhcyBhbnk7XG4gICAgcmV0dXJuIHJvdyA/IHRoaXMucm93VG9Ob3RlKHJvdykgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1QkFBOFx1QjRFMCBcdUIxNzhcdUQyQjggXHVDODcwXHVENjhDXG4gICAqL1xuICBnZXRBbGxOb3RlcygpOiBOb3RlTWV0YWRhdGFbXSB7XG4gICAgY29uc3Qgc3RtdCA9IHRoaXMuZGIucHJlcGFyZShcIlNFTEVDVCAqIEZST00gbm90ZXMgT1JERVIgQlkgdXBkYXRlZF9hdCBERVNDXCIpO1xuICAgIGNvbnN0IHJvd3MgPSBzdG10LmFsbCgpIGFzIGFueVtdO1xuICAgIHJldHVybiByb3dzLm1hcCgocm93KSA9PiB0aGlzLnJvd1RvTm90ZShyb3cpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUIxNzhcdUQyQjggXHVDMEFEXHVDODFDXG4gICAqL1xuICBkZWxldGVOb3RlKGlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBzdG10ID0gdGhpcy5kYi5wcmVwYXJlKFwiREVMRVRFIEZST00gbm90ZXMgV0hFUkUgaWQgPSA/XCIpO1xuICAgIHN0bXQucnVuKGlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUNDQURcdUQwNkMgXHVDODAwXHVDN0E1XG4gICAqL1xuICBpbnNlcnRDaHVua3MoY2h1bmtzOiBDaHVua1tdKTogdm9pZCB7XG4gICAgY29uc3Qgc3RtdCA9IHRoaXMuZGIucHJlcGFyZShgXG4gICAgICBJTlNFUlQgSU5UTyBjaHVua3MgKGlkLCBub3RlX2lkLCB0ZXh0LCBwb3NpdGlvbiwgdG9rZW5fY291bnQsIHNlY3Rpb24pXG4gICAgICBWQUxVRVMgKD8sID8sID8sID8sID8sID8pXG4gICAgYCk7XG5cbiAgICBjb25zdCB0cmFuc2FjdGlvbiA9IHRoaXMuZGIudHJhbnNhY3Rpb24oKGNodW5rczogQ2h1bmtbXSkgPT4ge1xuICAgICAgZm9yIChjb25zdCBjaHVuayBvZiBjaHVua3MpIHtcbiAgICAgICAgc3RtdC5ydW4oXG4gICAgICAgICAgY2h1bmsuaWQsXG4gICAgICAgICAgY2h1bmsubm90ZUlkLFxuICAgICAgICAgIGNodW5rLnRleHQsXG4gICAgICAgICAgY2h1bmsucG9zaXRpb24sXG4gICAgICAgICAgY2h1bmsudG9rZW5Db3VudCxcbiAgICAgICAgICBjaHVuay5zZWN0aW9uXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0cmFuc2FjdGlvbihjaHVua3MpO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1QjE3OFx1RDJCOFx1Qzc1OCBcdUNDQURcdUQwNkMgXHVDMEFEXHVDODFDXG4gICAqL1xuICBkZWxldGVDaHVua3NCeU5vdGVJZChub3RlSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHN0bXQgPSB0aGlzLmRiLnByZXBhcmUoXCJERUxFVEUgRlJPTSBjaHVua3MgV0hFUkUgbm90ZV9pZCA9ID9cIik7XG4gICAgc3RtdC5ydW4obm90ZUlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUIxNzhcdUQyQjhcdUM3NTggXHVDQ0FEXHVEMDZDIFx1Qzg3MFx1RDY4Q1xuICAgKi9cbiAgZ2V0Q2h1bmtzQnlOb3RlSWQobm90ZUlkOiBzdHJpbmcpOiBDaHVua1tdIHtcbiAgICBjb25zdCBzdG10ID0gdGhpcy5kYi5wcmVwYXJlKFwiU0VMRUNUICogRlJPTSBjaHVua3MgV0hFUkUgbm90ZV9pZCA9ID8gT1JERVIgQlkgcG9zaXRpb25cIik7XG4gICAgY29uc3Qgcm93cyA9IHN0bXQuYWxsKG5vdGVJZCkgYXMgYW55W107XG4gICAgcmV0dXJuIHJvd3MubWFwKChyb3cpID0+IHRoaXMucm93VG9DaHVuayhyb3cpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJRFx1Qjg1QyBcdUNDQURcdUQwNkMgXHVDODcwXHVENjhDXG4gICAqL1xuICBnZXRDaHVua0J5SWQoaWQ6IHN0cmluZyk6IENodW5rIHwgbnVsbCB7XG4gICAgY29uc3Qgc3RtdCA9IHRoaXMuZGIucHJlcGFyZShcIlNFTEVDVCAqIEZST00gY2h1bmtzIFdIRVJFIGlkID0gP1wiKTtcbiAgICBjb25zdCByb3cgPSBzdG10LmdldChpZCkgYXMgYW55O1xuICAgIHJldHVybiByb3cgPyB0aGlzLnJvd1RvQ2h1bmsocm93KSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogXHVCQUE4XHVCNEUwIFx1Q0NBRFx1RDA2QyBcdUM4NzBcdUQ2OENcbiAgICovXG4gIGdldEFsbENodW5rcygpOiBDaHVua1tdIHtcbiAgICBjb25zdCBzdG10ID0gdGhpcy5kYi5wcmVwYXJlKFwiU0VMRUNUICogRlJPTSBjaHVua3NcIik7XG4gICAgY29uc3Qgcm93cyA9IHN0bXQuYWxsKCkgYXMgYW55W107XG4gICAgcmV0dXJuIHJvd3MubWFwKChyb3cpID0+IHRoaXMucm93VG9DaHVuayhyb3cpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUIzNzBcdUM3NzRcdUQxMzBcdUJDQTBcdUM3NzRcdUMyQTQgXHVCMkVCXHVBRTMwXG4gICAqL1xuICBjbG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLmRiLmNsb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogREIgXHVENTg5XHVDNzQ0IE5vdGVNZXRhZGF0YVx1Qjg1QyBcdUJDQzBcdUQ2NThcbiAgICovXG4gIHByaXZhdGUgcm93VG9Ob3RlKHJvdzogYW55KTogTm90ZU1ldGFkYXRhIHtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IHJvdy5pZCxcbiAgICAgIHBhdGg6IHJvdy5wYXRoLFxuICAgICAgdGl0bGU6IHJvdy50aXRsZSxcbiAgICAgIHRhZ3M6IEpTT04ucGFyc2Uocm93LnRhZ3MgfHwgXCJbXVwiKSxcbiAgICAgIGxpbmtzOiBKU09OLnBhcnNlKHJvdy5saW5rcyB8fCBcIltdXCIpLFxuICAgICAgZnJvbnRtYXR0ZXI6IEpTT04ucGFyc2Uocm93LmZyb250bWF0dGVyIHx8IFwie31cIiksXG4gICAgICB1cGRhdGVkQXQ6IHJvdy51cGRhdGVkX2F0LFxuICAgICAgaGFzaDogcm93Lmhhc2gsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEQiBcdUQ1ODlcdUM3NDQgQ2h1bmtcdUI4NUMgXHVCQ0MwXHVENjU4XG4gICAqL1xuICBwcml2YXRlIHJvd1RvQ2h1bmsocm93OiBhbnkpOiBDaHVuayB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiByb3cuaWQsXG4gICAgICBub3RlSWQ6IHJvdy5ub3RlX2lkLFxuICAgICAgdGV4dDogcm93LnRleHQsXG4gICAgICBwb3NpdGlvbjogcm93LnBvc2l0aW9uLFxuICAgICAgdG9rZW5Db3VudDogcm93LnRva2VuX2NvdW50LFxuICAgICAgc2VjdGlvbjogcm93LnNlY3Rpb24sXG4gICAgfTtcbiAgfVxufVxuIiwgIi8vIFx1QkNBMVx1RDEzMCBcdUMyQTRcdUQxQTBcdUM1QjQgLSBcdUM3ODRcdUJDQTBcdUI1MjkgXHVDODAwXHVDN0E1IFx1QkMwRiBcdUM3MjBcdUMwQUNcdUIzQzQgXHVBQzgwXHVDMEM5XG5cbmltcG9ydCBEYXRhYmFzZSBmcm9tIFwiYmV0dGVyLXNxbGl0ZTNcIjtcbmltcG9ydCB7IENodW5rLCBTZWFyY2hSZXN1bHQsIFNlYXJjaEZpbHRlciB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBWZWN0b3JTdG9yZSB7XG4gIHByaXZhdGUgZGI6IERhdGFiYXNlLkRhdGFiYXNlO1xuXG4gIGNvbnN0cnVjdG9yKGRiUGF0aDogc3RyaW5nKSB7XG4gICAgdGhpcy5kYiA9IG5ldyBEYXRhYmFzZShkYlBhdGgpO1xuICAgIHRoaXMuaW5pdGlhbGl6ZVNjaGVtYSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1QjM3MFx1Qzc3NFx1RDEzMFx1QkNBMFx1Qzc3NFx1QzJBNCBcdUMyQTRcdUQwQTRcdUI5QzggXHVDRDA4XHVBRTMwXHVENjU0XG4gICAqL1xuICBwcml2YXRlIGluaXRpYWxpemVTY2hlbWEoKTogdm9pZCB7XG4gICAgdGhpcy5kYi5leGVjKGBcbiAgICAgIENSRUFURSBUQUJMRSBJRiBOT1QgRVhJU1RTIGVtYmVkZGluZ3MgKFxuICAgICAgICBjaHVua19pZCBURVhUIFBSSU1BUlkgS0VZLFxuICAgICAgICBlbWJlZGRpbmcgVEVYVCBOT1QgTlVMTCAtLSBKU09OIGFycmF5IG9mIG51bWJlcnNcbiAgICAgICk7XG5cbiAgICAgIENSRUFURSBJTkRFWCBJRiBOT1QgRVhJU1RTIGlkeF9lbWJlZGRpbmdzX2NodW5rX2lkIE9OIGVtYmVkZGluZ3MoY2h1bmtfaWQpO1xuICAgIGApO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUM4MDBcdUM3QTVcbiAgICovXG4gIHN0b3JlRW1iZWRkaW5nKGNodW5rSWQ6IHN0cmluZywgZW1iZWRkaW5nOiBudW1iZXJbXSk6IHZvaWQge1xuICAgIGNvbnN0IHN0bXQgPSB0aGlzLmRiLnByZXBhcmUoYFxuICAgICAgSU5TRVJUIE9SIFJFUExBQ0UgSU5UTyBlbWJlZGRpbmdzIChjaHVua19pZCwgZW1iZWRkaW5nKVxuICAgICAgVkFMVUVTICg/LCA/KVxuICAgIGApO1xuICAgIHN0bXQucnVuKGNodW5rSWQsIEpTT04uc3RyaW5naWZ5KGVtYmVkZGluZykpO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1QzVFQ1x1QjdFQyBcdUM3ODRcdUJDQTBcdUI1MjkgXHVDNzdDXHVBRDA0IFx1QzgwMFx1QzdBNVxuICAgKi9cbiAgc3RvcmVFbWJlZGRpbmdzKGVtYmVkZGluZ3M6IE1hcDxzdHJpbmcsIG51bWJlcltdPik6IHZvaWQge1xuICAgIGNvbnN0IHN0bXQgPSB0aGlzLmRiLnByZXBhcmUoYFxuICAgICAgSU5TRVJUIE9SIFJFUExBQ0UgSU5UTyBlbWJlZGRpbmdzIChjaHVua19pZCwgZW1iZWRkaW5nKVxuICAgICAgVkFMVUVTICg/LCA/KVxuICAgIGApO1xuXG4gICAgY29uc3QgdHJhbnNhY3Rpb24gPSB0aGlzLmRiLnRyYW5zYWN0aW9uKChlbWJlZGRpbmdzOiBNYXA8c3RyaW5nLCBudW1iZXJbXT4pID0+IHtcbiAgICAgIGZvciAoY29uc3QgW2NodW5rSWQsIGVtYmVkZGluZ10gb2YgZW1iZWRkaW5ncy5lbnRyaWVzKCkpIHtcbiAgICAgICAgc3RtdC5ydW4oY2h1bmtJZCwgSlNPTi5zdHJpbmdpZnkoZW1iZWRkaW5nKSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0cmFuc2FjdGlvbihlbWJlZGRpbmdzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUM3ODRcdUJDQTBcdUI1MjkgXHVDODcwXHVENjhDXG4gICAqL1xuICBnZXRFbWJlZGRpbmcoY2h1bmtJZDogc3RyaW5nKTogbnVtYmVyW10gfCBudWxsIHtcbiAgICBjb25zdCBzdG10ID0gdGhpcy5kYi5wcmVwYXJlKFwiU0VMRUNUIGVtYmVkZGluZyBGUk9NIGVtYmVkZGluZ3MgV0hFUkUgY2h1bmtfaWQgPSA/XCIpO1xuICAgIGNvbnN0IHJvdyA9IHN0bXQuZ2V0KGNodW5rSWQpIGFzIGFueTtcbiAgICByZXR1cm4gcm93ID8gSlNPTi5wYXJzZShyb3cuZW1iZWRkaW5nKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogXHVCQUE4XHVCNEUwIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUM4NzBcdUQ2OENcbiAgICovXG4gIGdldEFsbEVtYmVkZGluZ3MoKTogTWFwPHN0cmluZywgbnVtYmVyW10+IHtcbiAgICBjb25zdCBzdG10ID0gdGhpcy5kYi5wcmVwYXJlKFwiU0VMRUNUIGNodW5rX2lkLCBlbWJlZGRpbmcgRlJPTSBlbWJlZGRpbmdzXCIpO1xuICAgIGNvbnN0IHJvd3MgPSBzdG10LmFsbCgpIGFzIGFueVtdO1xuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBNYXA8c3RyaW5nLCBudW1iZXJbXT4oKTtcblxuICAgIGZvciAoY29uc3Qgcm93IG9mIHJvd3MpIHtcbiAgICAgIHJlc3VsdC5zZXQocm93LmNodW5rX2lkLCBKU09OLnBhcnNlKHJvdy5lbWJlZGRpbmcpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFx1Q0NBRFx1RDA2Q1x1Qzc1OCBcdUM3ODRcdUJDQTBcdUI1MjkgXHVDMEFEXHVDODFDXG4gICAqL1xuICBkZWxldGVFbWJlZGRpbmcoY2h1bmtJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3Qgc3RtdCA9IHRoaXMuZGIucHJlcGFyZShcIkRFTEVURSBGUk9NIGVtYmVkZGluZ3MgV0hFUkUgY2h1bmtfaWQgPSA/XCIpO1xuICAgIHN0bXQucnVuKGNodW5rSWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1QzVFQ1x1QjdFQyBcdUNDQURcdUQwNkNcdUM3NTggXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzBBRFx1QzgxQ1xuICAgKi9cbiAgZGVsZXRlRW1iZWRkaW5ncyhjaHVua0lkczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBjb25zdCBwbGFjZWhvbGRlcnMgPSBjaHVua0lkcy5tYXAoKCkgPT4gXCI/XCIpLmpvaW4oXCIsXCIpO1xuICAgIGNvbnN0IHN0bXQgPSB0aGlzLmRiLnByZXBhcmUoYERFTEVURSBGUk9NIGVtYmVkZGluZ3MgV0hFUkUgY2h1bmtfaWQgSU4gKCR7cGxhY2Vob2xkZXJzfSlgKTtcbiAgICBzdG10LnJ1biguLi5jaHVua0lkcyk7XG4gIH1cblxuICAvKipcbiAgICogXHVDRjU0XHVDMEFDXHVDNzc4IFx1QzcyMFx1QzBBQ1x1QjNDNCBcdUFDQzRcdUMwQjBcbiAgICovXG4gIHByaXZhdGUgY29zaW5lU2ltaWxhcml0eShhOiBudW1iZXJbXSwgYjogbnVtYmVyW10pOiBudW1iZXIge1xuICAgIGlmIChhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlx1QkNBMVx1RDEzMCBcdUFFMzhcdUM3NzRcdUFDMDAgXHVDNzdDXHVDRTU4XHVENTU4XHVDOUMwIFx1QzU0QVx1QzJCNVx1QjJDOFx1QjJFNFwiKTtcbiAgICB9XG5cbiAgICBsZXQgZG90UHJvZHVjdCA9IDA7XG4gICAgbGV0IG5vcm1BID0gMDtcbiAgICBsZXQgbm9ybUIgPSAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBkb3RQcm9kdWN0ICs9IGFbaV0gKiBiW2ldO1xuICAgICAgbm9ybUEgKz0gYVtpXSAqIGFbaV07XG4gICAgICBub3JtQiArPSBiW2ldICogYltpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gZG90UHJvZHVjdCAvIChNYXRoLnNxcnQobm9ybUEpICogTWF0aC5zcXJ0KG5vcm1CKSk7XG4gIH1cblxuICAvKipcbiAgICogXHVCQ0ExXHVEMTMwIFx1QUM4MFx1QzBDOSAtIFRvcC1LIFx1QzcyMFx1QzBBQyBcdUNDQURcdUQwNkMgXHVDQzNFXHVBRTMwXG4gICAqIFxuICAgKiBcdUNDMzhcdUFDRTA6IFx1RDYwNFx1QzdBQyBcdUFENkNcdUQ2MDRcdUM3NDAgXHVCQUE4XHVCNEUwIFx1Qzc4NFx1QkNBMFx1QjUyOVx1Qzc0NCBcdUJBNTRcdUJBQThcdUI5QUNcdUM1RDAgXHVCODVDXHVCNERDXHVENTU4XHVDNUVDIFx1QzEyMFx1RDYxNSBcdUFDODBcdUMwQzlcdUM3NDQgXHVDMjE4XHVENTg5XHVENTY5XHVCMkM4XHVCMkU0LlxuICAgKiBcdUIzMDBcdUFERENcdUJBQTggXHVCQ0ZDXHVEMkI4XHVDNzU4IFx1QUNCRFx1QzZCMCBcdUMxMzFcdUIyQTVcdUM3NzQgXHVDODAwXHVENTU4XHVCNDIwIFx1QzIxOCBcdUM3ODhcdUM3M0NcdUJBNzAsIFx1QjJFNFx1Qzc0Q1x1QUNGQyBcdUFDMTlcdUM3NDAgXHVBQzFDXHVDMTIwXHVDNzc0IFx1QUQ4Q1x1QzdBNVx1QjQyOVx1QjJDOFx1QjJFNDpcbiAgICogLSBBTk4oQXBwcm94aW1hdGUgTmVhcmVzdCBOZWlnaGJvcikgXHVDNTRDXHVBQ0UwXHVCOUFDXHVDOTk4IFx1QzBBQ1x1QzZBOSAoRkFJU1MsIEhOU1cgXHVCNEYxKVxuICAgKiAtIFx1QzgwNFx1QzZBOSBcdUJDQTFcdUQxMzAgXHVCMzcwXHVDNzc0XHVEMTMwXHVCQ0EwXHVDNzc0XHVDMkE0IFx1QzBBQ1x1QzZBOSAoQ2hyb21hLCBRZHJhbnQgXHVCNEYxKVxuICAgKiAtIFx1Qzk5RFx1QkQ4NCBcdUFDODBcdUMwQzkgXHVCNjEwXHVCMjk0IFx1Qzc3OFx1QjM3MVx1QzJBNCBcdUNFOTBcdUMyRjFcbiAgICovXG4gIHNlYXJjaChxdWVyeUVtYmVkZGluZzogbnVtYmVyW10sIGs6IG51bWJlciA9IDgpOiBBcnJheTx7IGNodW5rSWQ6IHN0cmluZzsgc2NvcmU6IG51bWJlciB9PiB7XG4gICAgY29uc3QgYWxsRW1iZWRkaW5ncyA9IHRoaXMuZ2V0QWxsRW1iZWRkaW5ncygpO1xuICAgIGNvbnN0IHNjb3JlczogQXJyYXk8eyBjaHVua0lkOiBzdHJpbmc7IHNjb3JlOiBudW1iZXIgfT4gPSBbXTtcblxuICAgIGZvciAoY29uc3QgW2NodW5rSWQsIGVtYmVkZGluZ10gb2YgYWxsRW1iZWRkaW5ncy5lbnRyaWVzKCkpIHtcbiAgICAgIGNvbnN0IHNjb3JlID0gdGhpcy5jb3NpbmVTaW1pbGFyaXR5KHF1ZXJ5RW1iZWRkaW5nLCBlbWJlZGRpbmcpO1xuICAgICAgc2NvcmVzLnB1c2goeyBjaHVua0lkLCBzY29yZSB9KTtcbiAgICB9XG5cbiAgICAvLyBcdUM4MTBcdUMyMTggXHVBRTMwXHVDOTAwIFx1QjBCNFx1QjlCQ1x1Q0MyOFx1QzIxQyBcdUM4MTVcdUI4MkMgXHVENkM0IFx1QzBDMVx1QzcwNCBLXHVBQzFDIFx1QkMxOFx1RDY1OFxuICAgIHNjb3Jlcy5zb3J0KChhLCBiKSA9PiBiLnNjb3JlIC0gYS5zY29yZSk7XG4gICAgcmV0dXJuIHNjb3Jlcy5zbGljZSgwLCBrKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUIzNzBcdUM3NzRcdUQxMzBcdUJDQTBcdUM3NzRcdUMyQTQgXHVCMkVCXHVBRTMwXG4gICAqL1xuICBjbG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLmRiLmNsb3NlKCk7XG4gIH1cbn1cbiIsICIvLyBcdUM3ODRcdUJDQTBcdUI1MjkgXHVDMEREXHVDMTMxXHVBRTMwIC0gQVBJIFx1QUUzMFx1QkMxOCBcdUJDMEYgXHVCODVDXHVDRUVDIFx1QkFBOFx1QjM3OCBcdUM5QzBcdUM2RDBcblxuaW1wb3J0IHsgcGlwZWxpbmUgfSBmcm9tIFwiQHhlbm92YS90cmFuc2Zvcm1lcnNcIjtcbmltcG9ydCB7IHJlcXVlc3RVcmwgfSBmcm9tIFwib2JzaWRpYW5cIjtcblxuZXhwb3J0IHR5cGUgRW1iZWRkaW5nQ29uZmlnID0ge1xuICBwcm92aWRlcjogXCJnZW1pbmlcIiB8IFwib3BlbmFpXCIgfCBcImxvY2FsXCIgfCBcImN1c3RvbVwiO1xuICBhcGlLZXk/OiBzdHJpbmc7XG4gIG1vZGVsOiBzdHJpbmc7XG4gIGFwaVVybD86IHN0cmluZztcbn07XG5cbmV4cG9ydCBjbGFzcyBFbWJlZGRpbmdHZW5lcmF0b3Ige1xuICBwcml2YXRlIHBpcGVsaW5lOiBhbnkgPSBudWxsO1xuICBwcml2YXRlIGNvbmZpZzogRW1iZWRkaW5nQ29uZmlnO1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogRW1iZWRkaW5nQ29uZmlnKSB7XG4gICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gIH1cblxuICAvKipcbiAgICogXHVDNzg0XHVCQ0EwXHVCNTI5IFx1Q0QwOFx1QUUzMFx1RDY1NFxuICAgKi9cbiAgYXN5bmMgaW5pdGlhbGl6ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAodGhpcy5jb25maWcucHJvdmlkZXIgPT09IFwibG9jYWxcIikge1xuICAgICAgaWYgKHRoaXMucGlwZWxpbmUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zb2xlLmxvZyhgXHVCODVDXHVDRUVDIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUJBQThcdUIzNzggXHVCODVDXHVCNTI5IFx1QzkxMTogJHt0aGlzLmNvbmZpZy5tb2RlbH1gKTtcbiAgICAgIGNvbnNvbGUubG9nKGBcdUJBQThcdUIzNzhcdUM3NDAgSHVnZ2luZ0ZhY2VcdUM1RDBcdUMxMUMgXHVCMkU0XHVDNkI0XHVCODVDXHVCNERDXHVCNDE4XHVDNUI0IFx1Qjg1Q1x1Q0VFQ1x1QzVEMCBcdUNFOTBcdUMyRENcdUI0MjlcdUIyQzhcdUIyRTQuYCk7XG4gICAgICB0aGlzLnBpcGVsaW5lID0gYXdhaXQgcGlwZWxpbmUoXCJmZWF0dXJlLWV4dHJhY3Rpb25cIiwgdGhpcy5jb25maWcubW9kZWwpO1xuICAgICAgY29uc29sZS5sb2coXCJcdUM3ODRcdUJDQTBcdUI1MjkgXHVCQUE4XHVCMzc4IFx1Qjg1Q1x1QjUyOSBcdUM2NDRcdUI4Q0NcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEFQSSBcdUFFMzBcdUJDMThcdUM3NDAgXHVDRDA4XHVBRTMwXHVENjU0IFx1QkQ4OFx1RDU0NFx1QzY5NFxuICAgICAgY29uc29sZS5sb2coYEFQSSBcdUFFMzBcdUJDMTggXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzBBQ1x1QzZBOTogJHt0aGlzLmNvbmZpZy5wcm92aWRlcn1gKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogXHVEMTREXHVDMkE0XHVEMkI4XHVCOTdDIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUJDQTFcdUQxMzBcdUI4NUMgXHVCQ0MwXHVENjU4XG4gICAqL1xuICBhc3luYyBlbWJlZCh0ZXh0OiBzdHJpbmcpOiBQcm9taXNlPG51bWJlcltdPiB7XG4gICAgaWYgKHRoaXMuY29uZmlnLnByb3ZpZGVyID09PSBcImxvY2FsXCIpIHtcbiAgICAgIHJldHVybiB0aGlzLmVtYmVkTG9jYWwodGV4dCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbmZpZy5wcm92aWRlciA9PT0gXCJnZW1pbmlcIikge1xuICAgICAgcmV0dXJuIHRoaXMuZW1iZWRHZW1pbmkodGV4dCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbmZpZy5wcm92aWRlciA9PT0gXCJvcGVuYWlcIikge1xuICAgICAgcmV0dXJuIHRoaXMuZW1iZWRPcGVuQUkodGV4dCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbmZpZy5wcm92aWRlciA9PT0gXCJjdXN0b21cIikge1xuICAgICAgcmV0dXJuIHRoaXMuZW1iZWRDdXN0b20odGV4dCk7XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IEVycm9yKGBcdUM5QzBcdUM2RDBcdUQ1NThcdUM5QzAgXHVDNTRBXHVCMjk0IFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUM4MUNcdUFDRjVcdUM3OTA6ICR7dGhpcy5jb25maWcucHJvdmlkZXJ9YCk7XG4gIH1cblxuICAvKipcbiAgICogXHVCODVDXHVDRUVDIFx1QkFBOFx1QjM3OFx1Qjg1QyBcdUM3ODRcdUJDQTBcdUI1MjkgXHVDMEREXHVDMTMxXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIGVtYmVkTG9jYWwodGV4dDogc3RyaW5nKTogUHJvbWlzZTxudW1iZXJbXT4ge1xuICAgIGlmICghdGhpcy5waXBlbGluZSkge1xuICAgICAgYXdhaXQgdGhpcy5pbml0aWFsaXplKCk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnBpcGVsaW5lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJcdUM3ODRcdUJDQTBcdUI1MjkgXHVEMzBDXHVDNzc0XHVENTA0XHVCNzdDXHVDNzc4IFx1Q0QwOFx1QUUzMFx1RDY1NCBcdUMyRTRcdUQzMjhcIik7XG4gICAgfVxuXG4gICAgY29uc3Qgb3V0cHV0ID0gYXdhaXQgdGhpcy5waXBlbGluZSh0ZXh0LCB7XG4gICAgICBwb29saW5nOiBcIm1lYW5cIixcbiAgICAgIG5vcm1hbGl6ZTogdHJ1ZSxcbiAgICB9KTtcblxuICAgIHJldHVybiBBcnJheS5mcm9tKG91dHB1dC5kYXRhIGFzIEZsb2F0MzJBcnJheSk7XG4gIH1cblxuICAvKipcbiAgICogR2VtaW5pIEFQSVx1Qjg1QyBcdUM3ODRcdUJDQTBcdUI1MjkgXHVDMEREXHVDMTMxXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIGVtYmVkR2VtaW5pKHRleHQ6IHN0cmluZyk6IFByb21pc2U8bnVtYmVyW10+IHtcbiAgICBpZiAoIXRoaXMuY29uZmlnLmFwaUtleSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VtaW5pIEFQSSBcdUQwQTRcdUFDMDAgXHVDMTI0XHVDODE1XHVCNDE4XHVDOUMwIFx1QzU0QVx1QzU1OFx1QzJCNVx1QjJDOFx1QjJFNFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmNvbmZpZy5hcGlVcmx9LyR7dGhpcy5jb25maWcubW9kZWx9OmVtYmVkQ29udGVudD9rZXk9JHt0aGlzLmNvbmZpZy5hcGlLZXl9YDtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHJlcXVlc3RVcmwoe1xuICAgICAgICB1cmwsXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgICAgIHBhcnRzOiBbeyB0ZXh0IH1dLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGRhdGEgPSByZXNwb25zZS5qc29uIGFzIGFueTtcbiAgICAgIGlmIChkYXRhLmVtYmVkZGluZyAmJiBkYXRhLmVtYmVkZGluZy52YWx1ZXMpIHtcbiAgICAgICAgcmV0dXJuIGRhdGEuZW1iZWRkaW5nLnZhbHVlcztcbiAgICAgIH1cblxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VtaW5pIEFQSSBcdUM3NTFcdUIyRjUgXHVENjE1XHVDMkREXHVDNzc0IFx1QzYyQ1x1QkMxNFx1Qjk3NFx1QzlDMCBcdUM1NEFcdUMyQjVcdUIyQzhcdUIyRTRcIik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJHZW1pbmkgXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzBERFx1QzEzMSBcdUMyRTRcdUQzMjg6XCIsIGVycm9yKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVuQUkgQVBJXHVCODVDIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUMwRERcdUMxMzFcbiAgICovXG4gIHByaXZhdGUgYXN5bmMgZW1iZWRPcGVuQUkodGV4dDogc3RyaW5nKTogUHJvbWlzZTxudW1iZXJbXT4ge1xuICAgIGlmICghdGhpcy5jb25maWcuYXBpS2V5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJPcGVuQUkgQVBJIFx1RDBBNFx1QUMwMCBcdUMxMjRcdUM4MTVcdUI0MThcdUM5QzAgXHVDNTRBXHVDNTU4XHVDMkI1XHVCMkM4XHVCMkU0XCIpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHJlcXVlc3RVcmwoe1xuICAgICAgICB1cmw6IHRoaXMuY29uZmlnLmFwaVVybCB8fCBcImh0dHBzOi8vYXBpLm9wZW5haS5jb20vdjEvZW1iZWRkaW5nc1wiLFxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IGBCZWFyZXIgJHt0aGlzLmNvbmZpZy5hcGlLZXl9YCxcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIG1vZGVsOiB0aGlzLmNvbmZpZy5tb2RlbCxcbiAgICAgICAgICBpbnB1dDogdGV4dCxcbiAgICAgICAgfSksXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgZGF0YSA9IHJlc3BvbnNlLmpzb24gYXMgYW55O1xuICAgICAgaWYgKGRhdGEuZGF0YSAmJiBkYXRhLmRhdGFbMF0gJiYgZGF0YS5kYXRhWzBdLmVtYmVkZGluZykge1xuICAgICAgICByZXR1cm4gZGF0YS5kYXRhWzBdLmVtYmVkZGluZztcbiAgICAgIH1cblxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiT3BlbkFJIEFQSSBcdUM3NTFcdUIyRjUgXHVENjE1XHVDMkREXHVDNzc0IFx1QzYyQ1x1QkMxNFx1Qjk3NFx1QzlDMCBcdUM1NEFcdUMyQjVcdUIyQzhcdUIyRTRcIik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJPcGVuQUkgXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzBERFx1QzEzMSBcdUMyRTRcdUQzMjg6XCIsIGVycm9yKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBcdUNFRTRcdUMyQTRcdUQxNDAgQVBJXHVCODVDIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUMwRERcdUMxMzFcbiAgICovXG4gIHByaXZhdGUgYXN5bmMgZW1iZWRDdXN0b20odGV4dDogc3RyaW5nKTogUHJvbWlzZTxudW1iZXJbXT4ge1xuICAgIGlmICghdGhpcy5jb25maWcuYXBpVXJsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJcdUNFRTRcdUMyQTRcdUQxNDAgQVBJIFVSTFx1Qzc3NCBcdUMxMjRcdUM4MTVcdUI0MThcdUM5QzAgXHVDNTRBXHVDNTU4XHVDMkI1XHVCMkM4XHVCMkU0XCIpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBoZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLmNvbmZpZy5hcGlLZXkpIHtcbiAgICAgICAgaGVhZGVyc1tcIkF1dGhvcml6YXRpb25cIl0gPSBgQmVhcmVyICR7dGhpcy5jb25maWcuYXBpS2V5fWA7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcmVxdWVzdFVybCh7XG4gICAgICAgIHVybDogdGhpcy5jb25maWcuYXBpVXJsLFxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBoZWFkZXJzLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgbW9kZWw6IHRoaXMuY29uZmlnLm1vZGVsLFxuICAgICAgICAgIGlucHV0OiB0ZXh0LFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBkYXRhID0gcmVzcG9uc2UuanNvbiBhcyBhbnk7XG4gICAgICBcbiAgICAgIC8vIE9wZW5BSSBcdUQ2MzhcdUQ2NTggXHVENjE1XHVDMkREXG4gICAgICBpZiAoZGF0YS5kYXRhICYmIGRhdGEuZGF0YVswXSAmJiBkYXRhLmRhdGFbMF0uZW1iZWRkaW5nKSB7XG4gICAgICAgIHJldHVybiBkYXRhLmRhdGFbMF0uZW1iZWRkaW5nO1xuICAgICAgfVxuICAgICAgXG4gICAgICAvLyBcdUM5QzFcdUM4MTEgXHVCQzMwXHVDNUY0IFx1QkMxOFx1RDY1OFxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9XG5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlx1Q0VFNFx1QzJBNFx1RDE0MCBBUEkgXHVDNzUxXHVCMkY1IFx1RDYxNVx1QzJERFx1Qzc0NCBcdUQzMENcdUMyRjFcdUQ1NjAgXHVDMjE4IFx1QzVDNlx1QzJCNVx1QjJDOFx1QjJFNFwiKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIlx1Q0VFNFx1QzJBNFx1RDE0MCBcdUM3ODRcdUJDQTBcdUI1MjkgXHVDMEREXHVDMTMxIFx1QzJFNFx1RDMyODpcIiwgZXJyb3IpO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFx1QzVFQ1x1QjdFQyBcdUQxNERcdUMyQTRcdUQyQjhcdUI5N0MgXHVCQzMwXHVDRTU4XHVCODVDIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUMwRERcdUMxMzFcbiAgICovXG4gIGFzeW5jIGVtYmVkQmF0Y2godGV4dHM6IHN0cmluZ1tdKTogUHJvbWlzZTxudW1iZXJbXVtdPiB7XG4gICAgY29uc3QgZW1iZWRkaW5nczogbnVtYmVyW11bXSA9IFtdO1xuXG4gICAgZm9yIChjb25zdCB0ZXh0IG9mIHRleHRzKSB7XG4gICAgICBjb25zdCBlbWJlZGRpbmcgPSBhd2FpdCB0aGlzLmVtYmVkKHRleHQpO1xuICAgICAgZW1iZWRkaW5ncy5wdXNoKGVtYmVkZGluZyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVtYmVkZGluZ3M7XG4gIH1cbn1cbiIsICIvLyBcdUI5QzhcdUQwNkNcdUIyRTRcdUM2QjQgXHVEMzBDXHVDMTFDIC0gZnJvbnRtYXR0ZXIsIFx1RDBEQ1x1QURGOCwgXHVCOUMxXHVEMDZDIFx1Q0Q5NFx1Q0Q5Q1xuXG5pbXBvcnQgbWF0dGVyIGZyb20gXCJncmF5LW1hdHRlclwiO1xuaW1wb3J0IHsgY3JlYXRlSGFzaCB9IGZyb20gXCJjcnlwdG9cIjtcblxuZXhwb3J0IGludGVyZmFjZSBQYXJzZWROb3RlIHtcbiAgY29udGVudDogc3RyaW5nO1xuICBmcm9udG1hdHRlcjogUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG4gIHRhZ3M6IHN0cmluZ1tdO1xuICBsaW5rczogc3RyaW5nW107XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHNlY3Rpb25zOiBTZWN0aW9uW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VjdGlvbiB7XG4gIGhlYWRpbmc6IHN0cmluZztcbiAgY29udGVudDogc3RyaW5nO1xuICBsZXZlbDogbnVtYmVyO1xuICBwb3NpdGlvbjogbnVtYmVyO1xufVxuXG4vKipcbiAqIFx1QjlDOFx1RDA2Q1x1QjJFNFx1QzZCNCBcdUQzMENcdUM3N0NcdUM3NDQgXHVEMzBDXHVDMkYxXHVENTU4XHVDNUVDIFx1QkE1NFx1RDBDMFx1QjM3MFx1Qzc3NFx1RDEzMFx1Qjk3QyBcdUNEOTRcdUNEOUNcdUQ1NjlcdUIyQzhcdUIyRTQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZU1hcmtkb3duKGZpbGVQYXRoOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZyk6IFBhcnNlZE5vdGUge1xuICAvLyBGcm9udG1hdHRlciBcdUQzMENcdUMyRjFcbiAgY29uc3QgcGFyc2VkID0gbWF0dGVyKGNvbnRlbnQpO1xuICBjb25zdCBmcm9udG1hdHRlciA9IHBhcnNlZC5kYXRhIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuICBjb25zdCBib2R5Q29udGVudCA9IHBhcnNlZC5jb250ZW50O1xuXG4gIC8vIFx1QzgxQ1x1QkFBOSBcdUNEOTRcdUNEOUMgKGZyb250bWF0dGVyXHVDNzU4IHRpdGxlIFx1QjYxMFx1QjI5NCBcdUQzMENcdUM3N0NcdUJBODUpXG4gIGNvbnN0IHRpdGxlID0gKGZyb250bWF0dGVyLnRpdGxlIGFzIHN0cmluZykgfHwgZXh0cmFjdFRpdGxlRnJvbVBhdGgoZmlsZVBhdGgpO1xuXG4gIC8vIFx1RDBEQ1x1QURGOCBcdUNEOTRcdUNEOUMgKCNcdUQwRENcdUFERjggXHVENjE1XHVDMkREKVxuICBjb25zdCB0YWdzID0gZXh0cmFjdFRhZ3MoYm9keUNvbnRlbnQsIGZyb250bWF0dGVyKTtcblxuICAvLyBcdUI5QzFcdUQwNkMgXHVDRDk0XHVDRDlDIChbW1x1QjlDMVx1RDA2Q11dIFx1RDYxNVx1QzJERClcbiAgY29uc3QgbGlua3MgPSBleHRyYWN0TGlua3MoYm9keUNvbnRlbnQpO1xuXG4gIC8vIFx1QzEzOVx1QzE1OCBcdUJEODRcdUI5QUNcbiAgY29uc3Qgc2VjdGlvbnMgPSBleHRyYWN0U2VjdGlvbnMoYm9keUNvbnRlbnQpO1xuXG4gIHJldHVybiB7XG4gICAgY29udGVudDogYm9keUNvbnRlbnQsXG4gICAgZnJvbnRtYXR0ZXIsXG4gICAgdGFncyxcbiAgICBsaW5rcyxcbiAgICB0aXRsZSxcbiAgICBzZWN0aW9ucyxcbiAgfTtcbn1cblxuLyoqXG4gKiBcdUQzMENcdUM3N0MgXHVBQ0JEXHVCODVDXHVDNUQwXHVDMTFDIFx1QzgxQ1x1QkFBOSBcdUNEOTRcdUNEOUNcbiAqL1xuZnVuY3Rpb24gZXh0cmFjdFRpdGxlRnJvbVBhdGgoZmlsZVBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IGZpbGVOYW1lID0gZmlsZVBhdGguc3BsaXQoXCIvXCIpLnBvcCgpIHx8IFwiXCI7XG4gIHJldHVybiBmaWxlTmFtZS5yZXBsYWNlKC9cXC5tZCQvLCBcIlwiKTtcbn1cblxuLyoqXG4gKiBcdUJDRjhcdUJCMzhcdUFDRkMgZnJvbnRtYXR0ZXJcdUM1RDBcdUMxMUMgXHVEMERDXHVBREY4IFx1Q0Q5NFx1Q0Q5Q1xuICovXG5mdW5jdGlvbiBleHRyYWN0VGFncyhjb250ZW50OiBzdHJpbmcsIGZyb250bWF0dGVyOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IHN0cmluZ1tdIHtcbiAgY29uc3QgdGFncyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuXG4gIC8vIEZyb250bWF0dGVyXHVDNzU4IHRhZ3MgXHVENTQ0XHVCNERDXG4gIGlmIChBcnJheS5pc0FycmF5KGZyb250bWF0dGVyLnRhZ3MpKSB7XG4gICAgZnJvbnRtYXR0ZXIudGFncy5mb3JFYWNoKCh0YWcpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgdGFnID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHRhZ3MuYWRkKHRhZy5yZXBsYWNlKC9eIy8sIFwiXCIpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIFx1QkNGOFx1QkIzOFx1QzVEMFx1QzExQyAjXHVEMERDXHVBREY4IFx1Q0Q5NFx1Q0Q5Q1xuICBjb25zdCBoYXNodGFnUmVnZXggPSAvIyhbYS16QS1aMC05XHVBQzAwLVx1RDdBM18tXSspL2c7XG4gIGxldCBtYXRjaDtcbiAgd2hpbGUgKChtYXRjaCA9IGhhc2h0YWdSZWdleC5leGVjKGNvbnRlbnQpKSAhPT0gbnVsbCkge1xuICAgIHRhZ3MuYWRkKG1hdGNoWzFdKTtcbiAgfVxuXG4gIHJldHVybiBBcnJheS5mcm9tKHRhZ3MpO1xufVxuXG4vKipcbiAqIE9ic2lkaWFuIFx1QjlDMVx1RDA2QyBcdUNEOTRcdUNEOUMgKFtbXHVCOUMxXHVEMDZDXV0gXHVENjE1XHVDMkREKVxuICovXG5mdW5jdGlvbiBleHRyYWN0TGlua3MoY29udGVudDogc3RyaW5nKTogc3RyaW5nW10ge1xuICBjb25zdCBsaW5rcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICBjb25zdCBsaW5rUmVnZXggPSAvXFxbXFxbKFteXFxdXSspXFxdXFxdL2c7XG4gIGxldCBtYXRjaDtcbiAgd2hpbGUgKChtYXRjaCA9IGxpbmtSZWdleC5leGVjKGNvbnRlbnQpKSAhPT0gbnVsbCkge1xuICAgIC8vIFx1QkNDNFx1Q0U2RCBcdUNDOThcdUI5QUMgW1tcdUI5QzFcdUQwNkN8XHVCQ0M0XHVDRTZEXV1cbiAgICBjb25zdCBsaW5rID0gbWF0Y2hbMV0uc3BsaXQoXCJ8XCIpWzBdLnRyaW0oKTtcbiAgICBsaW5rcy5hZGQobGluayk7XG4gIH1cbiAgcmV0dXJuIEFycmF5LmZyb20obGlua3MpO1xufVxuXG4vKipcbiAqIFx1RDVFNFx1QjM1NCBcdUFFMzBcdUM5MDBcdUM3M0NcdUI4NUMgXHVDMTM5XHVDMTU4IFx1QkQ4NFx1QjlBQ1xuICovXG5mdW5jdGlvbiBleHRyYWN0U2VjdGlvbnMoY29udGVudDogc3RyaW5nKTogU2VjdGlvbltdIHtcbiAgY29uc3Qgc2VjdGlvbnM6IFNlY3Rpb25bXSA9IFtdO1xuICBjb25zdCBsaW5lcyA9IGNvbnRlbnQuc3BsaXQoXCJcXG5cIik7XG5cbiAgbGV0IGN1cnJlbnRTZWN0aW9uOiBTZWN0aW9uIHwgbnVsbCA9IG51bGw7XG4gIGxldCBjdXJyZW50Q29udGVudDogc3RyaW5nW10gPSBbXTtcbiAgbGV0IHBvc2l0aW9uID0gMDtcblxuICBmb3IgKGNvbnN0IGxpbmUgb2YgbGluZXMpIHtcbiAgICBjb25zdCBoZWFkZXJNYXRjaCA9IGxpbmUubWF0Y2goL14oI3sxLDZ9KVxccysoLispJC8pO1xuXG4gICAgaWYgKGhlYWRlck1hdGNoKSB7XG4gICAgICAvLyBcdUM3NzRcdUM4MDQgXHVDMTM5XHVDMTU4IFx1QzgwMFx1QzdBNVxuICAgICAgaWYgKGN1cnJlbnRTZWN0aW9uKSB7XG4gICAgICAgIGN1cnJlbnRTZWN0aW9uLmNvbnRlbnQgPSBjdXJyZW50Q29udGVudC5qb2luKFwiXFxuXCIpLnRyaW0oKTtcbiAgICAgICAgc2VjdGlvbnMucHVzaChjdXJyZW50U2VjdGlvbik7XG4gICAgICB9XG5cbiAgICAgIC8vIFx1QzBDOCBcdUMxMzlcdUMxNTggXHVDMkRDXHVDNzkxXG4gICAgICBjdXJyZW50U2VjdGlvbiA9IHtcbiAgICAgICAgaGVhZGluZzogaGVhZGVyTWF0Y2hbMl0udHJpbSgpLFxuICAgICAgICBjb250ZW50OiBcIlwiLFxuICAgICAgICBsZXZlbDogaGVhZGVyTWF0Y2hbMV0ubGVuZ3RoLFxuICAgICAgICBwb3NpdGlvbixcbiAgICAgIH07XG4gICAgICBjdXJyZW50Q29udGVudCA9IFtdO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudFNlY3Rpb24pIHtcbiAgICAgIGN1cnJlbnRDb250ZW50LnB1c2gobGluZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFx1RDVFNFx1QjM1NCBcdUM1QzZcdUIyOTQgXHVDQ0FCIFx1QkQ4MFx1QkQ4NFxuICAgICAgaWYgKHNlY3Rpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjdXJyZW50U2VjdGlvbiA9IHtcbiAgICAgICAgICBoZWFkaW5nOiBcIlwiLFxuICAgICAgICAgIGNvbnRlbnQ6IFwiXCIsXG4gICAgICAgICAgbGV2ZWw6IDAsXG4gICAgICAgICAgcG9zaXRpb24sXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBjdXJyZW50Q29udGVudC5wdXNoKGxpbmUpO1xuICAgIH1cblxuICAgIHBvc2l0aW9uICs9IGxpbmUubGVuZ3RoICsgMTsgLy8gKzEgZm9yIG5ld2xpbmVcbiAgfVxuXG4gIC8vIFx1QjlDOFx1QzlDMFx1QjlDOSBcdUMxMzlcdUMxNTggXHVDODAwXHVDN0E1XG4gIGlmIChjdXJyZW50U2VjdGlvbikge1xuICAgIGN1cnJlbnRTZWN0aW9uLmNvbnRlbnQgPSBjdXJyZW50Q29udGVudC5qb2luKFwiXFxuXCIpLnRyaW0oKTtcbiAgICBzZWN0aW9ucy5wdXNoKGN1cnJlbnRTZWN0aW9uKTtcbiAgfVxuXG4gIHJldHVybiBzZWN0aW9ucztcbn1cblxuLyoqXG4gKiBcdUQzMENcdUM3N0MgXHVCMEI0XHVDNkE5XHVDNzU4IFx1RDU3NFx1QzJEQyBcdUMwRERcdUMxMzFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXB1dGVIYXNoKGNvbnRlbnQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBjcmVhdGVIYXNoKFwic2hhMjU2XCIpLnVwZGF0ZShjb250ZW50KS5kaWdlc3QoXCJoZXhcIik7XG59XG4iLCAiLy8gXHVCQjM4XHVDMTFDIFx1Q0NBRFx1RDBCOSBcdUI4NUNcdUM5QzEgLSBcdUQxNERcdUMyQTRcdUQyQjhcdUI5N0MgXHVDODAxXHVDODA4XHVENTVDIFx1RDA2Q1x1QUUzMFx1Qjg1QyBcdUJEODRcdUQ1NjBcblxuaW1wb3J0IHsgQ2h1bmsgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgU2VjdGlvbiB9IGZyb20gXCIuL3BhcnNlclwiO1xuXG4vKipcbiAqIFx1QUMwNFx1QjJFOFx1RDU1QyBcdUQxQTBcdUQwNzAgXHVDRTc0XHVDNkI0XHVEMTMwIChcdUFDRjVcdUJDMzEgXHVBRTMwXHVDOTAwIFx1QURGQ1x1QzBBQ1x1Q0U1OClcbiAqIFx1Q0MzOFx1QUNFMDogXHVENTVDXHVBRTAwXHVBQ0ZDIFx1QzYwMVx1QzVCNFx1Qjk3QyBcdUJEODRcdUI5QUNcdUQ1NThcdUM1RUMgXHVDRTc0XHVDNkI0XHVEMkI4XHVENTU4XHVDNUVDIFx1Qzc3NFx1QzkxMSBcdUNFNzRcdUM2QjRcdUQyQjggXHVCQzI5XHVDOUMwXG4gKi9cbmZ1bmN0aW9uIGVzdGltYXRlVG9rZW5Db3VudCh0ZXh0OiBzdHJpbmcpOiBudW1iZXIge1xuICAvLyBcdUQ1NUNcdUFFMDAgXHVCQjM4XHVDNzkwIFx1QzgxQ1x1QUM3MCBcdUQ2QzQgXHVDNjAxXHVDNUI0L1x1QzIyQlx1Qzc5MCBcdUIyRThcdUM1QjQgXHVDRTc0XHVDNkI0XHVEMkI4XG4gIGNvbnN0IG5vbktvcmVhblRleHQgPSB0ZXh0LnJlcGxhY2UoL1tcdUFDMDAtXHVEN0EzXS9nLCBcIiBcIik7XG4gIGNvbnN0IHdvcmRzID0gbm9uS29yZWFuVGV4dC5zcGxpdCgvXFxzKy8pLmZpbHRlcigodykgPT4gdy5sZW5ndGggPiAwKS5sZW5ndGg7XG4gIFxuICAvLyBcdUQ1NUNcdUFFMDAgXHVCQjM4XHVDNzkwXHVCOUNDIFx1Q0U3NFx1QzZCNFx1RDJCOFxuICBjb25zdCBrb3JlYW5DaGFycyA9ICh0ZXh0Lm1hdGNoKC9bXHVBQzAwLVx1RDdBM10vZykgfHwgW10pLmxlbmd0aDtcbiAgXG4gIC8vIFx1QzYwMVx1QzVCNFx1QjI5NCAxXHVCMkU4XHVDNUI0IFx1MjI0OCAxLjMgXHVEMUEwXHVEMDcwLCBcdUQ1NUNcdUFFMDBcdUM3NDAgMVx1Qzc0Q1x1QzgwOCBcdTIyNDggMSBcdUQxQTBcdUQwNzAgXHVBREZDXHVDMEFDXG4gIHJldHVybiBNYXRoLmNlaWwod29yZHMgKiAxLjMgKyBrb3JlYW5DaGFycyk7XG59XG5cbi8qKlxuICogXHVEMTREXHVDMkE0XHVEMkI4XHVCOTdDIFx1Q0NBRFx1RDA2Q1x1Qjg1QyBcdUJEODRcdUQ1NjBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNodW5rVGV4dChcbiAgbm90ZUlkOiBzdHJpbmcsXG4gIHNlY3Rpb25zOiBTZWN0aW9uW10sXG4gIG9wdGlvbnM6IHtcbiAgICBjaHVua1NpemU/OiBudW1iZXI7XG4gICAgY2h1bmtPdmVybGFwPzogbnVtYmVyO1xuICB9ID0ge31cbik6IENodW5rW10ge1xuICBjb25zdCBjaHVua1NpemUgPSBvcHRpb25zLmNodW5rU2l6ZSB8fCA0MDA7XG4gIGNvbnN0IGNodW5rT3ZlcmxhcCA9IG9wdGlvbnMuY2h1bmtPdmVybGFwIHx8IDUwO1xuICBjb25zdCBjaHVua3M6IENodW5rW10gPSBbXTtcblxuICBmb3IgKGNvbnN0IHNlY3Rpb24gb2Ygc2VjdGlvbnMpIHtcbiAgICBjb25zdCBzZWN0aW9uVGV4dCA9IHNlY3Rpb24uaGVhZGluZ1xuICAgICAgPyBgIyAke3NlY3Rpb24uaGVhZGluZ31cXG5cXG4ke3NlY3Rpb24uY29udGVudH1gXG4gICAgICA6IHNlY3Rpb24uY29udGVudDtcblxuICAgIGlmICghc2VjdGlvblRleHQudHJpbSgpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBjb25zdCB0b2tlbkNvdW50ID0gZXN0aW1hdGVUb2tlbkNvdW50KHNlY3Rpb25UZXh0KTtcblxuICAgIC8vIFx1QzEzOVx1QzE1OFx1Qzc3NCBcdUNDQURcdUQwNkMgXHVEMDZDXHVBRTMwXHVCQ0Y0XHVCMkU0IFx1Qzc5MVx1QzczQ1x1QkE3NCBcdUFERjhcdUIzMDBcdUI4NUMgXHVDMEFDXHVDNkE5XG4gICAgaWYgKHRva2VuQ291bnQgPD0gY2h1bmtTaXplKSB7XG4gICAgICBjaHVua3MucHVzaCh7XG4gICAgICAgIGlkOiBgJHtub3RlSWR9LWNodW5rLSR7Y2h1bmtzLmxlbmd0aH1gLFxuICAgICAgICBub3RlSWQsXG4gICAgICAgIHRleHQ6IHNlY3Rpb25UZXh0LFxuICAgICAgICBwb3NpdGlvbjogc2VjdGlvbi5wb3NpdGlvbixcbiAgICAgICAgdG9rZW5Db3VudCxcbiAgICAgICAgc2VjdGlvbjogc2VjdGlvbi5oZWFkaW5nLFxuICAgICAgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBcdUMxMzlcdUMxNThcdUM3NzQgXHVEMDZDXHVCQTc0IFx1QkIzOFx1QzdBNSBcdUIyRThcdUM3MDRcdUI4NUMgXHVCRDg0XHVENTYwXG4gICAgY29uc3Qgc2VudGVuY2VzID0gc3BsaXRJbnRvU2VudGVuY2VzKHNlY3Rpb25UZXh0KTtcbiAgICBsZXQgY3VycmVudENodW5rOiBzdHJpbmdbXSA9IFtdO1xuICAgIGxldCBjdXJyZW50VG9rZW5zID0gMDtcblxuICAgIGZvciAoY29uc3Qgc2VudGVuY2Ugb2Ygc2VudGVuY2VzKSB7XG4gICAgICBjb25zdCBzZW50ZW5jZVRva2VucyA9IGVzdGltYXRlVG9rZW5Db3VudChzZW50ZW5jZSk7XG5cbiAgICAgIC8vIFx1RDYwNFx1QzdBQyBcdUNDQURcdUQwNkNcdUM1RDAgXHVDRDk0XHVBQzAwIFx1QUMwMFx1QjJBNVx1RDU1Q1x1QzlDMCBcdUQ2NTVcdUM3NzhcbiAgICAgIGlmIChjdXJyZW50VG9rZW5zICsgc2VudGVuY2VUb2tlbnMgPD0gY2h1bmtTaXplKSB7XG4gICAgICAgIGN1cnJlbnRDaHVuay5wdXNoKHNlbnRlbmNlKTtcbiAgICAgICAgY3VycmVudFRva2VucyArPSBzZW50ZW5jZVRva2VucztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFx1RDYwNFx1QzdBQyBcdUNDQURcdUQwNkMgXHVDODAwXHVDN0E1XG4gICAgICAgIGlmIChjdXJyZW50Q2h1bmsubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGNvbnN0IGNodW5rVGV4dCA9IGN1cnJlbnRDaHVuay5qb2luKFwiIFwiKTtcbiAgICAgICAgICBjaHVua3MucHVzaCh7XG4gICAgICAgICAgICBpZDogYCR7bm90ZUlkfS1jaHVuay0ke2NodW5rcy5sZW5ndGh9YCxcbiAgICAgICAgICAgIG5vdGVJZCxcbiAgICAgICAgICAgIHRleHQ6IGNodW5rVGV4dCxcbiAgICAgICAgICAgIHBvc2l0aW9uOiBzZWN0aW9uLnBvc2l0aW9uLFxuICAgICAgICAgICAgdG9rZW5Db3VudDogY3VycmVudFRva2VucyxcbiAgICAgICAgICAgIHNlY3Rpb246IHNlY3Rpb24uaGVhZGluZyxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIFx1QzYyNFx1QkM4NFx1QjdBOVx1Qzc0NCBcdUM3MDRcdUQ1NzQgXHVCOUM4XHVDOUMwXHVCOUM5IFx1QkE4NyBcdUJCMzhcdUM3QTUgXHVDNzIwXHVDOUMwXG4gICAgICAgICAgY29uc3Qgb3ZlcmxhcFNlbnRlbmNlcyA9IGdldE92ZXJsYXBTZW50ZW5jZXMoY3VycmVudENodW5rLCBjaHVua092ZXJsYXApO1xuICAgICAgICAgIGN1cnJlbnRDaHVuayA9IG92ZXJsYXBTZW50ZW5jZXM7XG4gICAgICAgICAgY3VycmVudFRva2VucyA9IGVzdGltYXRlVG9rZW5Db3VudChjdXJyZW50Q2h1bmsuam9pbihcIiBcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gXHVDMEM4IFx1Q0NBRFx1RDA2QyBcdUMyRENcdUM3OTFcbiAgICAgICAgY3VycmVudENodW5rLnB1c2goc2VudGVuY2UpO1xuICAgICAgICBjdXJyZW50VG9rZW5zICs9IHNlbnRlbmNlVG9rZW5zO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFx1QjlDOFx1QzlDMFx1QjlDOSBcdUNDQURcdUQwNkMgXHVDODAwXHVDN0E1XG4gICAgaWYgKGN1cnJlbnRDaHVuay5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBjaHVua1RleHQgPSBjdXJyZW50Q2h1bmsuam9pbihcIiBcIik7XG4gICAgICBjaHVua3MucHVzaCh7XG4gICAgICAgIGlkOiBgJHtub3RlSWR9LWNodW5rLSR7Y2h1bmtzLmxlbmd0aH1gLFxuICAgICAgICBub3RlSWQsXG4gICAgICAgIHRleHQ6IGNodW5rVGV4dCxcbiAgICAgICAgcG9zaXRpb246IHNlY3Rpb24ucG9zaXRpb24sXG4gICAgICAgIHRva2VuQ291bnQ6IGN1cnJlbnRUb2tlbnMsXG4gICAgICAgIHNlY3Rpb246IHNlY3Rpb24uaGVhZGluZyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjaHVua3M7XG59XG5cbi8qKlxuICogXHVEMTREXHVDMkE0XHVEMkI4XHVCOTdDIFx1QkIzOFx1QzdBNVx1QzczQ1x1Qjg1QyBcdUJEODRcdUQ1NjAgKFx1QUMwNFx1QjJFOFx1RDU1QyBcdUJDODRcdUM4MDQpXG4gKiBcdUNDMzhcdUFDRTA6IFx1QzU3RFx1QzVCNChEci4sIE1yLiBcdUI0RjEpXHVCMDk4IFx1QzE4Q1x1QzIxOFx1QzgxMFx1QzVEMFx1QzExQyBcdUJEODRcdUQ1NjBcdUI0MjAgXHVDMjE4IFx1Qzc4OFx1Qzc0Q1xuICovXG5mdW5jdGlvbiBzcGxpdEludG9TZW50ZW5jZXModGV4dDogc3RyaW5nKTogc3RyaW5nW10ge1xuICAvLyBcdUI5QzhcdUNFNjhcdUQ0NUMsIFx1QjI5MFx1QjA4Q1x1RDQ1QywgXHVCQjNDXHVDNzRDXHVENDVDIFx1QjRBNCBcdUFDRjVcdUJDMzFcdUM3M0NcdUI4NUMgXHVCRDg0XHVENTYwXG4gIC8vIFx1QzgxQ1x1RDU1Q1x1QzBBQ1x1RDU2RDogXHVDNTdEXHVDNUI0XHVCMDk4IFx1QzE4Q1x1QzIxOFx1QzgxMFx1QzVEMFx1QzExQyBcdUM3OThcdUJBQkIgXHVCRDg0XHVENTYwXHVCNDIwIFx1QzIxOCBcdUM3ODhcdUM3NENcbiAgY29uc3Qgc2VudGVuY2VzID0gdGV4dC5zcGxpdCgvKFsuIT9dXFxzKykvKS5maWx0ZXIoKHMpID0+IHMudHJpbSgpKTtcbiAgY29uc3QgcmVzdWx0OiBzdHJpbmdbXSA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2VudGVuY2VzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgY29uc3Qgc2VudGVuY2UgPSBzZW50ZW5jZXNbaV07XG4gICAgY29uc3QgcHVuY3R1YXRpb24gPSBzZW50ZW5jZXNbaSArIDFdIHx8IFwiXCI7XG4gICAgcmVzdWx0LnB1c2goc2VudGVuY2UgKyBwdW5jdHVhdGlvbik7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0LmZpbHRlcigocykgPT4gcy50cmltKCkpO1xufVxuXG4vKipcbiAqIFx1QzYyNFx1QkM4NFx1QjdBOVx1Qzc0NCBcdUM3MDRcdUQ1NUMgXHVCOUM4XHVDOUMwXHVCOUM5IFx1QkIzOFx1QzdBNVx1QjRFNCBcdUFDMDBcdUM4MzhcdUM2MjRcdUFFMzBcbiAqL1xuZnVuY3Rpb24gZ2V0T3ZlcmxhcFNlbnRlbmNlcyhzZW50ZW5jZXM6IHN0cmluZ1tdLCB0YXJnZXRUb2tlbnM6IG51bWJlcik6IHN0cmluZ1tdIHtcbiAgY29uc3Qgb3ZlcmxhcDogc3RyaW5nW10gPSBbXTtcbiAgbGV0IHRva2VucyA9IDA7XG5cbiAgZm9yIChsZXQgaSA9IHNlbnRlbmNlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGNvbnN0IHNlbnRlbmNlID0gc2VudGVuY2VzW2ldO1xuICAgIGNvbnN0IHNlbnRlbmNlVG9rZW5zID0gZXN0aW1hdGVUb2tlbkNvdW50KHNlbnRlbmNlKTtcblxuICAgIGlmICh0b2tlbnMgKyBzZW50ZW5jZVRva2VucyA+IHRhcmdldFRva2Vucykge1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgb3ZlcmxhcC51bnNoaWZ0KHNlbnRlbmNlKTtcbiAgICB0b2tlbnMgKz0gc2VudGVuY2VUb2tlbnM7XG4gIH1cblxuICByZXR1cm4gb3ZlcmxhcDtcbn1cbiIsICIvLyBcdUM3NzhcdUIzNzFcdUMxMUMgLSBcdUQzMENcdUM3N0MgXHVDMkE0XHVDRTk0LCBcdUQzMENcdUMyRjEsIFx1Q0NBRFx1RDBCOSwgXHVDNzg0XHVCQ0EwXHVCNTI5LCBcdUM4MDBcdUM3QTVcdUM3NDQgXHVEMUI1XHVENTY5XG5cbmltcG9ydCB7IE1ldGFkYXRhU3RvcmUgfSBmcm9tIFwiLi9tZXRhZGF0YVN0b3JlXCI7XG5pbXBvcnQgeyBWZWN0b3JTdG9yZSB9IGZyb20gXCIuL3ZlY3RvclN0b3JlXCI7XG5pbXBvcnQgeyBFbWJlZGRpbmdHZW5lcmF0b3IsIEVtYmVkZGluZ0NvbmZpZyB9IGZyb20gXCIuL2VtYmVkZGluZ3NcIjtcbmltcG9ydCB7IHBhcnNlTWFya2Rvd24sIGNvbXB1dGVIYXNoIH0gZnJvbSBcIi4vcGFyc2VyXCI7XG5pbXBvcnQgeyBjaHVua1RleHQgfSBmcm9tIFwiLi9jaHVua2VyXCI7XG5pbXBvcnQgeyBJbmRleGluZ0NvbmZpZywgTm90ZU1ldGFkYXRhLCBDaHVuayB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyBjcmVhdGVIYXNoIH0gZnJvbSBcImNyeXB0b1wiO1xuXG5leHBvcnQgY2xhc3MgSW5kZXhlciB7XG4gIHByaXZhdGUgbWV0YWRhdGFTdG9yZTogTWV0YWRhdGFTdG9yZTtcbiAgcHJpdmF0ZSB2ZWN0b3JTdG9yZTogVmVjdG9yU3RvcmU7XG4gIHByaXZhdGUgZW1iZWRkaW5nR2VuZXJhdG9yOiBFbWJlZGRpbmdHZW5lcmF0b3I7XG4gIHByaXZhdGUgY29uZmlnOiBJbmRleGluZ0NvbmZpZztcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IEluZGV4aW5nQ29uZmlnKSB7XG4gICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgdGhpcy5tZXRhZGF0YVN0b3JlID0gbmV3IE1ldGFkYXRhU3RvcmUoY29uZmlnLm1ldGFEYlBhdGgpO1xuICAgIHRoaXMudmVjdG9yU3RvcmUgPSBuZXcgVmVjdG9yU3RvcmUoY29uZmlnLnZlY3RvckRiUGF0aCk7XG4gICAgXG4gICAgY29uc3QgZW1iZWRkaW5nQ29uZmlnOiBFbWJlZGRpbmdDb25maWcgPSB7XG4gICAgICBwcm92aWRlcjogY29uZmlnLmVtYmVkZGluZ1Byb3ZpZGVyLFxuICAgICAgbW9kZWw6IGNvbmZpZy5lbWJlZGRpbmdNb2RlbCxcbiAgICAgIGFwaUtleTogY29uZmlnLmVtYmVkZGluZ0FwaUtleSxcbiAgICAgIGFwaVVybDogY29uZmlnLmVtYmVkZGluZ0FwaVVybCxcbiAgICB9O1xuICAgIFxuICAgIHRoaXMuZW1iZWRkaW5nR2VuZXJhdG9yID0gbmV3IEVtYmVkZGluZ0dlbmVyYXRvcihlbWJlZGRpbmdDb25maWcpO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1Q0QwOFx1QUUzMFx1RDY1NCAtIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUJBQThcdUIzNzggXHVCODVDXHVCNERDXG4gICAqL1xuICBhc3luYyBpbml0aWFsaXplKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMuZW1iZWRkaW5nR2VuZXJhdG9yLmluaXRpYWxpemUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUIyRThcdUM3N0MgXHVEMzBDXHVDNzdDIFx1Qzc3OFx1QjM3MVx1QzJGMVxuICAgKi9cbiAgYXN5bmMgaW5kZXhGaWxlKGZpbGVQYXRoOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICAvLyBcdUQzMENcdUM3N0MgXHVENTc0XHVDMkRDIFx1QUNDNFx1QzBCMFxuICAgICAgY29uc3QgaGFzaCA9IGNvbXB1dGVIYXNoKGNvbnRlbnQpO1xuXG4gICAgICAvLyBcdUFFMzBcdUM4NzQgXHVCMTc4XHVEMkI4IFx1RDY1NVx1Qzc3OFxuICAgICAgY29uc3QgZXhpc3RpbmdOb3RlID0gdGhpcy5tZXRhZGF0YVN0b3JlLmdldE5vdGVCeVBhdGgoZmlsZVBhdGgpO1xuICAgICAgaWYgKGV4aXN0aW5nTm90ZSAmJiBleGlzdGluZ05vdGUuaGFzaCA9PT0gaGFzaCkge1xuICAgICAgICBjb25zb2xlLmxvZyhgXHVEMzBDXHVDNzdDIFx1QkNDMFx1QUNCRCBcdUM1QzZcdUM3NEMsIFx1QzJBNFx1RDBCNTogJHtmaWxlUGF0aH1gKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBcdUI5QzhcdUQwNkNcdUIyRTRcdUM2QjQgXHVEMzBDXHVDMkYxXG4gICAgICBjb25zdCBwYXJzZWQgPSBwYXJzZU1hcmtkb3duKGZpbGVQYXRoLCBjb250ZW50KTtcblxuICAgICAgLy8gXHVCMTc4XHVEMkI4IElEIFx1QzBERFx1QzEzMVxuICAgICAgY29uc3Qgbm90ZUlkID0gdGhpcy5nZW5lcmF0ZU5vdGVJZChmaWxlUGF0aCk7XG5cbiAgICAgIC8vIFx1QkE1NFx1RDBDMFx1QjM3MFx1Qzc3NFx1RDEzMCBcdUM4MDBcdUM3QTVcbiAgICAgIGNvbnN0IG5vdGVNZXRhZGF0YTogTm90ZU1ldGFkYXRhID0ge1xuICAgICAgICBpZDogbm90ZUlkLFxuICAgICAgICBwYXRoOiBmaWxlUGF0aCxcbiAgICAgICAgdGl0bGU6IHBhcnNlZC50aXRsZSxcbiAgICAgICAgdGFnczogcGFyc2VkLnRhZ3MsXG4gICAgICAgIGxpbmtzOiBwYXJzZWQubGlua3MsXG4gICAgICAgIGZyb250bWF0dGVyOiBwYXJzZWQuZnJvbnRtYXR0ZXIsXG4gICAgICAgIHVwZGF0ZWRBdDogRGF0ZS5ub3coKSxcbiAgICAgICAgaGFzaCxcbiAgICAgIH07XG5cbiAgICAgIHRoaXMubWV0YWRhdGFTdG9yZS51cHNlcnROb3RlKG5vdGVNZXRhZGF0YSk7XG5cbiAgICAgIC8vIFx1QUUzMFx1Qzg3NCBcdUNDQURcdUQwNkMgXHVDMEFEXHVDODFDXG4gICAgICBpZiAoZXhpc3RpbmdOb3RlKSB7XG4gICAgICAgIGNvbnN0IG9sZENodW5rcyA9IHRoaXMubWV0YWRhdGFTdG9yZS5nZXRDaHVua3NCeU5vdGVJZChub3RlSWQpO1xuICAgICAgICB0aGlzLnZlY3RvclN0b3JlLmRlbGV0ZUVtYmVkZGluZ3Mob2xkQ2h1bmtzLm1hcCgoYykgPT4gYy5pZCkpO1xuICAgICAgICB0aGlzLm1ldGFkYXRhU3RvcmUuZGVsZXRlQ2h1bmtzQnlOb3RlSWQobm90ZUlkKTtcbiAgICAgIH1cblxuICAgICAgLy8gXHVDQ0FEXHVEMEI5XG4gICAgICBjb25zdCBjaHVua3MgPSBjaHVua1RleHQobm90ZUlkLCBwYXJzZWQuc2VjdGlvbnMsIHtcbiAgICAgICAgY2h1bmtTaXplOiB0aGlzLmNvbmZpZy5jaHVua1NpemUsXG4gICAgICAgIGNodW5rT3ZlcmxhcDogdGhpcy5jb25maWcuY2h1bmtPdmVybGFwLFxuICAgICAgfSk7XG5cbiAgICAgIGlmIChjaHVua3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBcdUNDQURcdUQwNkMgXHVDNUM2XHVDNzRDOiAke2ZpbGVQYXRofWApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFx1Q0NBRFx1RDA2QyBcdUM4MDBcdUM3QTVcbiAgICAgIHRoaXMubWV0YWRhdGFTdG9yZS5pbnNlcnRDaHVua3MoY2h1bmtzKTtcblxuICAgICAgLy8gXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzBERFx1QzEzMSBcdUJDMEYgXHVDODAwXHVDN0E1XG4gICAgICBjb25zb2xlLmxvZyhgXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzBERFx1QzEzMSBcdUM5MTE6ICR7ZmlsZVBhdGh9ICgke2NodW5rcy5sZW5ndGh9XHVBQzFDIFx1Q0NBRFx1RDA2QylgKTtcbiAgICAgIGZvciAoY29uc3QgY2h1bmsgb2YgY2h1bmtzKSB7XG4gICAgICAgIGNvbnN0IGVtYmVkZGluZyA9IGF3YWl0IHRoaXMuZW1iZWRkaW5nR2VuZXJhdG9yLmVtYmVkKGNodW5rLnRleHQpO1xuICAgICAgICB0aGlzLnZlY3RvclN0b3JlLnN0b3JlRW1iZWRkaW5nKGNodW5rLmlkLCBlbWJlZGRpbmcpO1xuICAgICAgfVxuXG4gICAgICBjb25zb2xlLmxvZyhgXHVDNzc4XHVCMzcxXHVDMkYxIFx1QzY0NFx1QjhDQzogJHtmaWxlUGF0aH1gKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihgXHVDNzc4XHVCMzcxXHVDMkYxIFx1QzJFNFx1RDMyODogJHtmaWxlUGF0aH1gLCBlcnJvcik7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogXHVEMzBDXHVDNzdDIFx1QzBBRFx1QzgxQyBcdUNDOThcdUI5QUNcbiAgICovXG4gIGRlbGV0ZUZpbGUoZmlsZVBhdGg6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IG5vdGUgPSB0aGlzLm1ldGFkYXRhU3RvcmUuZ2V0Tm90ZUJ5UGF0aChmaWxlUGF0aCk7XG4gICAgaWYgKCFub3RlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY2h1bmtzID0gdGhpcy5tZXRhZGF0YVN0b3JlLmdldENodW5rc0J5Tm90ZUlkKG5vdGUuaWQpO1xuICAgIHRoaXMudmVjdG9yU3RvcmUuZGVsZXRlRW1iZWRkaW5ncyhjaHVua3MubWFwKChjKSA9PiBjLmlkKSk7XG4gICAgdGhpcy5tZXRhZGF0YVN0b3JlLmRlbGV0ZUNodW5rc0J5Tm90ZUlkKG5vdGUuaWQpO1xuICAgIHRoaXMubWV0YWRhdGFTdG9yZS5kZWxldGVOb3RlKG5vdGUuaWQpO1xuXG4gICAgY29uc29sZS5sb2coYFx1RDMwQ1x1Qzc3QyBcdUMwQURcdUM4MUMgXHVDNjQ0XHVCOENDOiAke2ZpbGVQYXRofWApO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1QUM4MFx1QzBDOVxuICAgKi9cbiAgYXN5bmMgc2VhcmNoKHF1ZXJ5OiBzdHJpbmcsIGs/OiBudW1iZXIpOiBQcm9taXNlPEFycmF5PHsgY2h1bms6IENodW5rOyBzY29yZTogbnVtYmVyIH0+PiB7XG4gICAgY29uc3QgdG9wSyA9IGsgfHwgdGhpcy5jb25maWcudG9wSztcblxuICAgIC8vIFx1Q0ZGQ1x1QjlBQyBcdUM3ODRcdUJDQTBcdUI1MjkgXHVDMEREXHVDMTMxXG4gICAgY29uc3QgcXVlcnlFbWJlZGRpbmcgPSBhd2FpdCB0aGlzLmVtYmVkZGluZ0dlbmVyYXRvci5lbWJlZChxdWVyeSk7XG5cbiAgICAvLyBcdUJDQTFcdUQxMzAgXHVBQzgwXHVDMEM5XG4gICAgY29uc3QgcmVzdWx0cyA9IHRoaXMudmVjdG9yU3RvcmUuc2VhcmNoKHF1ZXJ5RW1iZWRkaW5nLCB0b3BLKTtcblxuICAgIC8vIFx1Q0NBRFx1RDA2QyBcdUM4MTVcdUJDRjQgXHVDRDk0XHVBQzAwXG4gICAgY29uc3Qgc2VhcmNoUmVzdWx0cyA9IHJlc3VsdHNcbiAgICAgIC5tYXAoKHJlc3VsdCkgPT4ge1xuICAgICAgICBjb25zdCBjaHVuayA9IHRoaXMubWV0YWRhdGFTdG9yZS5nZXRDaHVua0J5SWQocmVzdWx0LmNodW5rSWQpO1xuICAgICAgICBpZiAoIWNodW5rKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBjaHVuayxcbiAgICAgICAgICBzY29yZTogcmVzdWx0LnNjb3JlLFxuICAgICAgICB9O1xuICAgICAgfSlcbiAgICAgIC5maWx0ZXIoKHIpID0+IHIgIT09IG51bGwpIGFzIEFycmF5PHsgY2h1bms6IENodW5rOyBzY29yZTogbnVtYmVyIH0+O1xuXG4gICAgcmV0dXJuIHNlYXJjaFJlc3VsdHM7XG4gIH1cblxuICAvKipcbiAgICogXHVBQzgwXHVDMEM5IFx1QUNCMFx1QUNGQ1x1QzVEMCBcdUIxNzhcdUQyQjggXHVCQTU0XHVEMEMwXHVCMzcwXHVDNzc0XHVEMTMwIFx1Q0Q5NFx1QUMwMFxuICAgKi9cbiAgZ2V0U2VhcmNoUmVzdWx0c1dpdGhNZXRhZGF0YShcbiAgICBzZWFyY2hSZXN1bHRzOiBBcnJheTx7IGNodW5rOiBDaHVuazsgc2NvcmU6IG51bWJlciB9PlxuICApOiBBcnJheTx7XG4gICAgY2h1bms6IENodW5rO1xuICAgIG5vdGU6IE5vdGVNZXRhZGF0YTtcbiAgICBzY29yZTogbnVtYmVyO1xuICB9PiB7XG4gICAgcmV0dXJuIHNlYXJjaFJlc3VsdHNcbiAgICAgIC5tYXAoKHJlc3VsdCkgPT4ge1xuICAgICAgICBjb25zdCBub3RlID0gdGhpcy5tZXRhZGF0YVN0b3JlLmdldE5vdGVCeUlkKHJlc3VsdC5jaHVuay5ub3RlSWQpO1xuICAgICAgICBpZiAoIW5vdGUpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGNodW5rOiByZXN1bHQuY2h1bmssXG4gICAgICAgICAgbm90ZSxcbiAgICAgICAgICBzY29yZTogcmVzdWx0LnNjb3JlLFxuICAgICAgICB9O1xuICAgICAgfSlcbiAgICAgIC5maWx0ZXIoKHIpID0+IHIgIT09IG51bGwpIGFzIEFycmF5PHtcbiAgICAgIGNodW5rOiBDaHVuaztcbiAgICAgIG5vdGU6IE5vdGVNZXRhZGF0YTtcbiAgICAgIHNjb3JlOiBudW1iZXI7XG4gICAgfT47XG4gIH1cblxuICAvKipcbiAgICogXHVCMTc4XHVEMkI4IElEIFx1QzBERFx1QzEzMVxuICAgKi9cbiAgcHJpdmF0ZSBnZW5lcmF0ZU5vdGVJZChmaWxlUGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gY3JlYXRlSGFzaChcInNoYTI1NlwiKS51cGRhdGUoZmlsZVBhdGgpLmRpZ2VzdChcImhleFwiKS5zdWJzdHJpbmcoMCwgMTYpO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1QjlBQ1x1QzE4Q1x1QzJBNCBcdUQ1NzRcdUM4MUNcbiAgICovXG4gIGNsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMubWV0YWRhdGFTdG9yZS5jbG9zZSgpO1xuICAgIHRoaXMudmVjdG9yU3RvcmUuY2xvc2UoKTtcbiAgfVxufVxuIiwgIi8vIE9ic2lkaWFuIFx1QkNGQ1x1RDJCOCBcdUQzMENcdUM3N0MgXHVCQ0MwXHVBQ0JEIFx1QUMxMFx1QzlDMCBcdUJDMEYgXHVDNzkwXHVCM0Q5IFx1Qzc3OFx1QjM3MVx1QzJGMVxuXG5pbXBvcnQgeyBURmlsZSwgVmF1bHQsIE5vdGljZSB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHsgSW5kZXhlciB9IGZyb20gXCIuL2luZGV4aW5nL2luZGV4ZXJcIjtcblxuZXhwb3J0IGNsYXNzIFZhdWx0V2F0Y2hlciB7XG4gIHByaXZhdGUgdmF1bHQ6IFZhdWx0O1xuICBwcml2YXRlIGluZGV4ZXI6IEluZGV4ZXIgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBpc0luZGV4aW5nOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgaW5kZXhRdWV1ZTogU2V0PHN0cmluZz4gPSBuZXcgU2V0KCk7XG4gIHByaXZhdGUgaW5kZXhpbmdJblByb2dyZXNzOiBTZXQ8c3RyaW5nPiA9IG5ldyBTZXQoKTsgLy8gXHVDOUM0XHVENTg5IFx1QzkxMVx1Qzc3OCBcdUM3NzhcdUIzNzFcdUMyRjEgXHVDRDk0XHVDODAxXG5cbiAgY29uc3RydWN0b3IodmF1bHQ6IFZhdWx0KSB7XG4gICAgdGhpcy52YXVsdCA9IHZhdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFx1Qzc3OFx1QjM3MVx1QzExQyBcdUMxMjRcdUM4MTVcbiAgICovXG4gIHNldEluZGV4ZXIoaW5kZXhlcjogSW5kZXhlciB8IG51bGwpOiB2b2lkIHtcbiAgICB0aGlzLmluZGV4ZXIgPSBpbmRleGVyO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1Q0QwOFx1QUUzMCBcdUM3NzhcdUIzNzFcdUMyRjEgXHVDMkU0XHVENTg5XG4gICAqL1xuICBhc3luYyBpbmRleFZhdWx0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICghdGhpcy5pbmRleGVyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJcdUM3NzhcdUIzNzFcdUMxMUNcdUFDMDAgXHVDRDA4XHVBRTMwXHVENjU0XHVCNDE4XHVDOUMwIFx1QzU0QVx1QzU1OFx1QzJCNVx1QjJDOFx1QjJFNFwiKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0luZGV4aW5nKSB7XG4gICAgICBuZXcgTm90aWNlKFwiXHVDNzc0XHVCQkY4IFx1Qzc3OFx1QjM3MVx1QzJGMVx1Qzc3NCBcdUM5QzRcdUQ1ODkgXHVDOTExXHVDNzg1XHVCMkM4XHVCMkU0XCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuaXNJbmRleGluZyA9IHRydWU7XG4gICAgbmV3IE5vdGljZShcIlx1QkNGQ1x1RDJCOCBcdUM3NzhcdUIzNzFcdUMyRjFcdUM3NDQgXHVDMkRDXHVDNzkxXHVENTY5XHVCMkM4XHVCMkU0Li4uXCIpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG1kRmlsZXMgPSB0aGlzLnZhdWx0LmdldE1hcmtkb3duRmlsZXMoKTtcbiAgICAgIGNvbnNvbGUubG9nKGBcdUM3NzhcdUIzNzFcdUMyRjFcdUQ1NjAgXHVEMzBDXHVDNzdDIFx1QzIxODogJHttZEZpbGVzLmxlbmd0aH1gKTtcblxuICAgICAgbGV0IGluZGV4ZWQgPSAwO1xuICAgICAgbGV0IGZhaWxlZCA9IDA7XG5cbiAgICAgIGZvciAoY29uc3QgZmlsZSBvZiBtZEZpbGVzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IHRoaXMudmF1bHQucmVhZChmaWxlKTtcbiAgICAgICAgICBhd2FpdCB0aGlzLmluZGV4ZXIuaW5kZXhGaWxlKGZpbGUucGF0aCwgY29udGVudCk7XG4gICAgICAgICAgaW5kZXhlZCsrO1xuXG4gICAgICAgICAgLy8gXHVDOUM0XHVENTg5IFx1QzBDMVx1RDY2OSBcdUQ0NUNcdUMyREMgKDEwXHVBQzFDXHVCOUM4XHVCMkU0KVxuICAgICAgICAgIGlmIChpbmRleGVkICUgMTAgPT09IDApIHtcbiAgICAgICAgICAgIG5ldyBOb3RpY2UoYFx1Qzc3OFx1QjM3MVx1QzJGMSBcdUM5QzRcdUQ1ODkgXHVDOTExOiAke2luZGV4ZWR9LyR7bWRGaWxlcy5sZW5ndGh9YCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFx1RDMwQ1x1Qzc3QyBcdUM3NzhcdUIzNzFcdUMyRjEgXHVDMkU0XHVEMzI4OiAke2ZpbGUucGF0aH1gLCBlcnJvcik7XG4gICAgICAgICAgZmFpbGVkKys7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbmV3IE5vdGljZShgXHVDNzc4XHVCMzcxXHVDMkYxIFx1QzY0NFx1QjhDQzogJHtpbmRleGVkfVx1QUMxQyBcdUMxMzFcdUFDRjUsICR7ZmFpbGVkfVx1QUMxQyBcdUMyRTRcdUQzMjhgKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIlx1QkNGQ1x1RDJCOCBcdUM3NzhcdUIzNzFcdUMyRjEgXHVDOTExIFx1QzYyNFx1Qjk1ODpcIiwgZXJyb3IpO1xuICAgICAgbmV3IE5vdGljZShcIlx1Qzc3OFx1QjM3MVx1QzJGMSBcdUM5MTEgXHVDNjI0XHVCOTU4XHVBQzAwIFx1QkMxQ1x1QzBERFx1RDU4OFx1QzJCNVx1QjJDOFx1QjJFNFwiKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdGhpcy5pc0luZGV4aW5nID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFx1RDMwQ1x1Qzc3QyBcdUMwRERcdUMxMzEgXHVDNzc0XHVCQ0E0XHVEMkI4IFx1Q0M5OFx1QjlBQ1xuICAgKi9cbiAgYXN5bmMgb25GaWxlQ3JlYXRlKGZpbGU6IFRGaWxlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCF0aGlzLmluZGV4ZXIgfHwgZmlsZS5leHRlbnNpb24gIT09IFwibWRcIikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgdGhpcy52YXVsdC5yZWFkKGZpbGUpO1xuICAgICAgYXdhaXQgdGhpcy5pbmRleGVyLmluZGV4RmlsZShmaWxlLnBhdGgsIGNvbnRlbnQpO1xuICAgICAgY29uc29sZS5sb2coYFx1RDMwQ1x1Qzc3QyBcdUMwRERcdUMxMzEgXHVDNzc4XHVCMzcxXHVDMkYxOiAke2ZpbGUucGF0aH1gKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihgXHVEMzBDXHVDNzdDIFx1QzBERFx1QzEzMSBcdUM3NzhcdUIzNzFcdUMyRjEgXHVDMkU0XHVEMzI4OiAke2ZpbGUucGF0aH1gLCBlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFx1RDMwQ1x1Qzc3QyBcdUMyMThcdUM4MTUgXHVDNzc0XHVCQ0E0XHVEMkI4IFx1Q0M5OFx1QjlBQ1xuICAgKi9cbiAgYXN5bmMgb25GaWxlTW9kaWZ5KGZpbGU6IFRGaWxlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCF0aGlzLmluZGV4ZXIgfHwgZmlsZS5leHRlbnNpb24gIT09IFwibWRcIikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFx1QzkxMVx1QkNGNSBcdUM3NzhcdUIzNzFcdUMyRjEgXHVCQzI5XHVDOUMwXHVCOTdDIFx1QzcwNFx1RDU3NCBcdUQwNTBcdUM1RDAgXHVDRDk0XHVBQzAwXG4gICAgdGhpcy5pbmRleFF1ZXVlLmFkZChmaWxlLnBhdGgpO1xuXG4gICAgLy8gMTAwbXMgXHVENkM0XHVDNUQwIFx1Qzc3OFx1QjM3MVx1QzJGMSAoXHVDNUYwXHVDMThEIFx1QzIxOFx1QzgxNSBcdUJDMjlcdUM5QzApXG4gICAgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5pbmRleFF1ZXVlLmhhcyhmaWxlLnBhdGgpICYmICF0aGlzLmluZGV4aW5nSW5Qcm9ncmVzcy5oYXMoZmlsZS5wYXRoKSkge1xuICAgICAgICB0aGlzLmluZGV4UXVldWUuZGVsZXRlKGZpbGUucGF0aCk7XG4gICAgICAgIHRoaXMuaW5kZXhpbmdJblByb2dyZXNzLmFkZChmaWxlLnBhdGgpO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IHRoaXMudmF1bHQucmVhZChmaWxlKTtcbiAgICAgICAgICBpZiAodGhpcy5pbmRleGVyKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmluZGV4ZXIuaW5kZXhGaWxlKGZpbGUucGF0aCwgY29udGVudCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnNvbGUubG9nKGBcdUQzMENcdUM3N0MgXHVDMjE4XHVDODE1IFx1Qzc3OFx1QjM3MVx1QzJGMTogJHtmaWxlLnBhdGh9YCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihgXHVEMzBDXHVDNzdDIFx1QzIxOFx1QzgxNSBcdUM3NzhcdUIzNzFcdUMyRjEgXHVDMkU0XHVEMzI4OiAke2ZpbGUucGF0aH1gLCBlcnJvcik7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgdGhpcy5pbmRleGluZ0luUHJvZ3Jlc3MuZGVsZXRlKGZpbGUucGF0aCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCAxMDApO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1RDMwQ1x1Qzc3QyBcdUMwQURcdUM4MUMgXHVDNzc0XHVCQ0E0XHVEMkI4IFx1Q0M5OFx1QjlBQ1xuICAgKi9cbiAgb25GaWxlRGVsZXRlKGZpbGU6IFRGaWxlKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmluZGV4ZXIgfHwgZmlsZS5leHRlbnNpb24gIT09IFwibWRcIikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICB0aGlzLmluZGV4ZXIuZGVsZXRlRmlsZShmaWxlLnBhdGgpO1xuICAgICAgY29uc29sZS5sb2coYFx1RDMwQ1x1Qzc3QyBcdUMwQURcdUM4MUMgXHVDQzk4XHVCOUFDOiAke2ZpbGUucGF0aH1gKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihgXHVEMzBDXHVDNzdDIFx1QzBBRFx1QzgxQyBcdUNDOThcdUI5QUMgXHVDMkU0XHVEMzI4OiAke2ZpbGUucGF0aH1gLCBlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFx1RDMwQ1x1Qzc3QyBcdUM3NzRcdUI5ODQgXHVCQ0MwXHVBQ0JEIFx1Qzc3NFx1QkNBNFx1RDJCOCBcdUNDOThcdUI5QUNcbiAgICovXG4gIGFzeW5jIG9uRmlsZVJlbmFtZShmaWxlOiBURmlsZSwgb2xkUGF0aDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCF0aGlzLmluZGV4ZXIgfHwgZmlsZS5leHRlbnNpb24gIT09IFwibWRcIikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAvLyBcdUM3NzRcdUM4MDQgXHVEMzBDXHVDNzdDIFx1QzBBRFx1QzgxQ1xuICAgICAgdGhpcy5pbmRleGVyLmRlbGV0ZUZpbGUob2xkUGF0aCk7XG5cbiAgICAgIC8vIFx1QzBDOCBcdUQzMENcdUM3N0MgXHVDNzc4XHVCMzcxXHVDMkYxXG4gICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgdGhpcy52YXVsdC5yZWFkKGZpbGUpO1xuICAgICAgaWYgKHRoaXMuaW5kZXhlcikge1xuICAgICAgICBhd2FpdCB0aGlzLmluZGV4ZXIuaW5kZXhGaWxlKGZpbGUucGF0aCwgY29udGVudCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnNvbGUubG9nKGBcdUQzMENcdUM3N0MgXHVDNzc0XHVCOTg0IFx1QkNDMFx1QUNCRCBcdUNDOThcdUI5QUM6ICR7b2xkUGF0aH0gLT4gJHtmaWxlLnBhdGh9YCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYFx1RDMwQ1x1Qzc3QyBcdUM3NzRcdUI5ODQgXHVCQ0MwXHVBQ0JEIFx1Q0M5OFx1QjlBQyBcdUMyRTRcdUQzMjg6ICR7b2xkUGF0aH0gLT4gJHtmaWxlLnBhdGh9YCwgZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQSw0Q0FBQUEsVUFBQTtBQUFBO0FBRUEsSUFBQUEsU0FBUSxtQkFBbUIsQ0FBQ0MsVUFBUyxRQUFRO0FBQzVDLFVBQUksUUFBUTtBQUNaLFVBQUksT0FBT0EsWUFBVyxRQUFRLFFBQVFBLFNBQVEsR0FBRyxPQUFPLFdBQVc7QUFDbEUsY0FBTSxJQUFJLFVBQVUsaUJBQWlCLEdBQUcsMEJBQTBCO0FBQUEsTUFDbkU7QUFDQSxhQUFPO0FBQUEsSUFDUjtBQUVBLElBQUFELFNBQVEsUUFBUSxPQUFPO0FBQ3ZCLElBQUFBLFNBQVEsVUFBVSxPQUFPLElBQUksNEJBQTRCO0FBQUE7QUFBQTs7O0FDWHpEO0FBQUEsb0RBQUFFLFVBQUFDLFNBQUE7QUFBQTtBQUNBLFFBQU0sYUFBYSxFQUFFLE9BQU8sZUFBZSxVQUFVLE1BQU0sWUFBWSxPQUFPLGNBQWMsS0FBSztBQUVqRyxhQUFTLFlBQVksU0FBUyxNQUFNO0FBQ25DLFVBQUksZUFBZSxhQUFhO0FBQy9CLGVBQU8sSUFBSSxZQUFZLFNBQVMsSUFBSTtBQUFBLE1BQ3JDO0FBQ0EsVUFBSSxPQUFPLFNBQVMsVUFBVTtBQUM3QixjQUFNLElBQUksVUFB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VztBQUVwQyxZQUFNLGVBQWUsS0FBSyxtQkFDdEIsZ0NBQWMsS0FBSyxZQUFZLEVBQUUsUUFBUSxRQUFRLEVBQUUsSUFDbkQ7QUFDSixZQUFNLGFBQWEsTUFBTTtBQUFBLFFBQ3ZCLEtBQUssSUFBSTtBQUFBLFFBQ1QsS0FBSztBQUFBLFFBQ0w7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUNBLFVBQUksd0JBQU8sMkNBQWEsVUFBVSxFQUFFO0FBQUEsSUFDdEMsU0FBUyxPQUFPO0FBQ2QsWUFBTSxVQUFVLGlCQUFpQixRQUFRLE1BQU0sVUFBVSxPQUFPLEtBQUs7QUFDckUsVUFBSSx3QkFBTyw4QkFBVSxPQUFPLEVBQUU7QUFBQSxJQUNoQztBQUFBLEVBQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUtRLHFCQUF5QztBQUMvQyxVQUFNLFNBQVMsa0JBQWtCLEtBQUssU0FBUyxpQkFBaUI7QUFDaEUsV0FBTyxpQ0FBUTtBQUFBLEVBQ2pCO0FBQ0Y7IiwKICAibmFtZXMiOiBbImV4cG9ydHMiLCAib3B0aW9ucyIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJqb2luIiwgInBhdGgiLCAiaSIsICJleHBvcnRzIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgIm9wdGlvbnMiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAib3B0aW9ucyIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJvcHRpb25zIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgIm9wdGlvbnMiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAib3B0aW9ucyIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJzdHIiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiRGF0YWJhc2UiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiRGF0YWJhc2UiLCAib3B0aW9ucyIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJvcHRpb25zIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgIm9wdGlvbnMiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAicmVxdWlyZV9mdW5jdGlvbiIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJvcHRpb25zIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgIm9wdGlvbnMiLCAic3RyIiwgInN0cmluZyIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJyZXF1aXJlX2pzX3lhbWwiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAieWFtbCIsICJvcHRpb25zIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgInN0ciIsICJleHBvcnRzIiwgInN0ciIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJlbmdpbmVzIiwgIm9wdGlvbnMiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAib3B0aW9ucyIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJvcHRpb25zIiwgInN0ciIsICJtYXR0ZXIiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAib3B0aW9ucyIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJvcHRpb25zIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgInN0ciIsICJvcHRpb25zIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImVuZ2luZXMiLCAicGFyc2UiLCAibWF0dGVyIiwgIm9wdGlvbnMiLCAic3RyIiwgImltcG9ydF9vYnNpZGlhbiIsICJpbXBvcnRfb2JzaWRpYW4iLCAidGV4dCIsICJfYSIsICJpbXBvcnRfb2JzaWRpYW4iLCAiaW1wb3J0X29ic2lkaWFuIiwgImltcG9ydF9vYnNpZGlhbiIsICJvcHRpb25zIiwgIl9hIiwgImltcG9ydF9vYnNpZGlhbiIsICJEYXRhYmFzZSIsICJjaHVua3MiLCAiaW1wb3J0X2JldHRlcl9zcWxpdGUzIiwgIkRhdGFiYXNlIiwgImVtYmVkZGluZ3MiLCAiaW1wb3J0X29ic2lkaWFuIiwgIm1hdHRlciIsICJvcHRpb25zIiwgImNodW5rVGV4dCIsICJpbXBvcnRfY3J5cHRvIiwgImltcG9ydF9vYnNpZGlhbiJdCn0K
