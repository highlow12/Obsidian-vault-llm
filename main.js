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
var import_obsidian7 = require("obsidian");
var EmbeddingGenerator = class {
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
    let changed = false;
    if (this.settings.embeddingProvider === "local") {
      this.settings.embeddingProvider = "gemini";
      this.settings.embeddingModel = EMBEDDING_PRESETS.gemini.model;
      changed = true;
    }
    if (changed) {
      await this.saveSettings();
    }
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzL2JldHRlci1zcWxpdGUzL2xpYi91dGlsLmpzIiwgIm5vZGVfbW9kdWxlcy9iZXR0ZXItc3FsaXRlMy9saWIvc3FsaXRlLWVycm9yLmpzIiwgIm5vZGVfbW9kdWxlcy9maWxlLXVyaS10by1wYXRoL2luZGV4LmpzIiwgIm5vZGVfbW9kdWxlcy9iaW5kaW5ncy9iaW5kaW5ncy5qcyIsICJub2RlX21vZHVsZXMvYmV0dGVyLXNxbGl0ZTMvbGliL21ldGhvZHMvd3JhcHBlcnMuanMiLCAibm9kZV9tb2R1bGVzL2JldHRlci1zcWxpdGUzL2xpYi9tZXRob2RzL3RyYW5zYWN0aW9uLmpzIiwgIm5vZGVfbW9kdWxlcy9iZXR0ZXItc3FsaXRlMy9saWIvbWV0aG9kcy9wcmFnbWEuanMiLCAibm9kZV9tb2R1bGVzL2JldHRlci1zcWxpdGUzL2xpYi9tZXRob2RzL2JhY2t1cC5qcyIsICJub2RlX21vZHVsZXMvYmV0dGVyLXNxbGl0ZTMvbGliL21ldGhvZHMvc2VyaWFsaXplLmpzIiwgIm5vZGVfbW9kdWxlcy9iZXR0ZXItc3FsaXRlMy9saWIvbWV0aG9kcy9mdW5jdGlvbi5qcyIsICJub2RlX21vZHVsZXMvYmV0dGVyLXNxbGl0ZTMvbGliL21ldGhvZHMvYWdncmVnYXRlLmpzIiwgIm5vZGVfbW9kdWxlcy9iZXR0ZXItc3FsaXRlMy9saWIvbWV0aG9kcy90YWJsZS5qcyIsICJub2RlX21vZHVsZXMvYmV0dGVyLXNxbGl0ZTMvbGliL21ldGhvZHMvaW5zcGVjdC5qcyIsICJub2RlX21vZHVsZXMvYmV0dGVyLXNxbGl0ZTMvbGliL2RhdGFiYXNlLmpzIiwgIm5vZGVfbW9kdWxlcy9iZXR0ZXItc3FsaXRlMy9saWIvaW5kZXguanMiLCAibm9kZV9tb2R1bGVzL2tpbmQtb2YvaW5kZXguanMiLCAibm9kZV9tb2R1bGVzL2lzLWV4dGVuZGFibGUvaW5kZXguanMiLCAibm9kZV9tb2R1bGVzL2V4dGVuZC1zaGFsbG93L2luZGV4LmpzIiwgIm5vZGVfbW9kdWxlcy9zZWN0aW9uLW1hdHRlci9pbmRleC5qcyIsICJub2RlX21vZHVsZXMvanMteWFtbC9saWIvanMteWFtbC9jb21tb24uanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvZXhjZXB0aW9uLmpzIiwgIm5vZGVfbW9kdWxlcy9qcy15YW1sL2xpYi9qcy15YW1sL21hcmsuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvdHlwZS5qcyIsICJub2RlX21vZHVsZXMvanMteWFtbC9saWIvanMteWFtbC9zY2hlbWEuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvdHlwZS9zdHIuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvdHlwZS9zZXEuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvdHlwZS9tYXAuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvc2NoZW1hL2ZhaWxzYWZlLmpzIiwgIm5vZGVfbW9kdWxlcy9qcy15YW1sL2xpYi9qcy15YW1sL3R5cGUvbnVsbC5qcyIsICJub2RlX21vZHVsZXMvanMteWFtbC9saWIvanMteWFtbC90eXBlL2Jvb2wuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvdHlwZS9pbnQuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvdHlwZS9mbG9hdC5qcyIsICJub2RlX21vZHVsZXMvanMteWFtbC9saWIvanMteWFtbC9zY2hlbWEvanNvbi5qcyIsICJub2RlX21vZHVsZXMvanMteWFtbC9saWIvanMteWFtbC9zY2hlbWEvY29yZS5qcyIsICJub2RlX21vZHVsZXMvanMteWFtbC9saWIvanMteWFtbC90eXBlL3RpbWVzdGFtcC5qcyIsICJub2RlX21vZHVsZXMvanMteWFtbC9saWIvanMteWFtbC90eXBlL21lcmdlLmpzIiwgIm5vZGVfbW9kdWxlcy9qcy15YW1sL2xpYi9qcy15YW1sL3R5cGUvYmluYXJ5LmpzIiwgIm5vZGVfbW9kdWxlcy9qcy15YW1sL2xpYi9qcy15YW1sL3R5cGUvb21hcC5qcyIsICJub2RlX21vZHVsZXMvanMteWFtbC9saWIvanMteWFtbC90eXBlL3BhaXJzLmpzIiwgIm5vZGVfbW9kdWxlcy9qcy15YW1sL2xpYi9qcy15YW1sL3R5cGUvc2V0LmpzIiwgIm5vZGVfbW9kdWxlcy9qcy15YW1sL2xpYi9qcy15YW1sL3NjaGVtYS9kZWZhdWx0X3NhZmUuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvdHlwZS9qcy91bmRlZmluZWQuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvdHlwZS9qcy9yZWdleHAuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwvdHlwZS9qcy9mdW5jdGlvbi5qcyIsICJub2RlX21vZHVsZXMvanMteWFtbC9saWIvanMteWFtbC9zY2hlbWEvZGVmYXVsdF9mdWxsLmpzIiwgIm5vZGVfbW9kdWxlcy9qcy15YW1sL2xpYi9qcy15YW1sL2xvYWRlci5qcyIsICJub2RlX21vZHVsZXMvanMteWFtbC9saWIvanMteWFtbC9kdW1wZXIuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvbGliL2pzLXlhbWwuanMiLCAibm9kZV9tb2R1bGVzL2pzLXlhbWwvaW5kZXguanMiLCAibm9kZV9tb2R1bGVzL2dyYXktbWF0dGVyL2xpYi9lbmdpbmVzLmpzIiwgIm5vZGVfbW9kdWxlcy9zdHJpcC1ib20tc3RyaW5nL2luZGV4LmpzIiwgIm5vZGVfbW9kdWxlcy9ncmF5LW1hdHRlci9saWIvdXRpbHMuanMiLCAibm9kZV9tb2R1bGVzL2dyYXktbWF0dGVyL2xpYi9kZWZhdWx0cy5qcyIsICJub2RlX21vZHVsZXMvZ3JheS1tYXR0ZXIvbGliL2VuZ2luZS5qcyIsICJub2RlX21vZHVsZXMvZ3JheS1tYXR0ZXIvbGliL3N0cmluZ2lmeS5qcyIsICJub2RlX21vZHVsZXMvZ3JheS1tYXR0ZXIvbGliL2V4Y2VycHQuanMiLCAibm9kZV9tb2R1bGVzL2dyYXktbWF0dGVyL2xpYi90by1maWxlLmpzIiwgIm5vZGVfbW9kdWxlcy9ncmF5LW1hdHRlci9saWIvcGFyc2UuanMiLCAibm9kZV9tb2R1bGVzL2dyYXktbWF0dGVyL2luZGV4LmpzIiwgInNyYy9tYWluLnRzIiwgInNyYy9jb252ZXJzYXRpb25TdG9yZS50cyIsICJzcmMvY29udmVyc2F0aW9uLnRzIiwgInNyYy9hcGkudHMiLCAic3JjL3R5cGVzLnRzIiwgInNyYy9sb2dnaW5nLnRzIiwgInNyYy9tb2RhbHMvc2F2ZUNvbnZlcnNhdGlvbk1vZGFsLnRzIiwgInNyYy9wYXJzZVR1cm5zLnRzIiwgInNyYy9zZXR0aW5ncy50cyIsICJzcmMvdmlld3MvY2hhdFZpZXcudHMiLCAic3JjL2luZGV4aW5nL21ldGFkYXRhU3RvcmUudHMiLCAic3JjL2luZGV4aW5nL3ZlY3RvclN0b3JlLnRzIiwgInNyYy9pbmRleGluZy9lbWJlZGRpbmdzLnRzIiwgInNyYy9pbmRleGluZy9wYXJzZXIudHMiLCAic3JjL2luZGV4aW5nL2NodW5rZXIudHMiLCAic3JjL2luZGV4aW5nL2luZGV4ZXIudHMiLCAic3JjL3ZhdWx0V2F0Y2hlci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLmdldEJvb2xlYW5PcHRpb24gPSAob3B0aW9ucywga2V5KSA9PiB7XG5cdGxldCB2YWx1ZSA9IGZhbHNlO1xuXHRpZiAoa2V5IGluIG9wdGlvbnMgJiYgdHlwZW9mICh2YWx1ZSA9IG9wdGlvbnNba2V5XSkgIT09ICdib29sZWFuJykge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYEV4cGVjdGVkIHRoZSBcIiR7a2V5fVwiIG9wdGlvbiB0byBiZSBhIGJvb2xlYW5gKTtcblx0fVxuXHRyZXR1cm4gdmFsdWU7XG59O1xuXG5leHBvcnRzLmNwcGRiID0gU3ltYm9sKCk7XG5leHBvcnRzLmluc3BlY3QgPSBTeW1ib2wuZm9yKCdub2RlanMudXRpbC5pbnNwZWN0LmN1c3RvbScpO1xuIiwgIid1c2Ugc3RyaWN0JztcbmNvbnN0IGRlc2NyaXB0b3IgPSB7IHZhbHVlOiAnU3FsaXRlRXJyb3InLCB3cml0YWJsZTogdHJ1ZSwgZW51bWVyYWJsZTogZmFsc2UsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9O1xuXG5mdW5jdGlvbiBTcWxpdGVFcnJvcihtZXNzYWdlLCBjb2RlKSB7XG5cdGlmIChuZXcudGFyZ2V0ICE9PSBTcWxpdGVFcnJvcikge1xuXHRcdHJldHVybiBuZXcgU3FsaXRlRXJyb3IobWVzc2FnZSwgY29kZSk7XG5cdH1cblx0aWYgKHR5cGVvZiBjb2RlICE9PSAnc3RyaW5nJykge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIHNlY29uZCBhcmd1bWVudCB0byBiZSBhIHN0cmluZycpO1xuXHR9XG5cdEVycm9yLmNhbGwodGhpcywgbWVzc2FnZSk7XG5cdGRlc2NyaXB0b3IudmFsdWUgPSAnJyArIG1lc3NhZ2U7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnbWVzc2FnZScsIGRlc2NyaXB0b3IpO1xuXHRFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCBTcWxpdGVFcnJvcik7XG5cdHRoaXMuY29kZSA9IGNvZGU7XG59XG5PYmplY3Quc2V0UHJvdG90eXBlT2YoU3FsaXRlRXJyb3IsIEVycm9yKTtcbk9iamVjdC5zZXRQcm90b3R5cGVPZihTcWxpdGVFcnJvci5wcm90b3R5cGUsIEVycm9yLnByb3RvdHlwZSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoU3FsaXRlRXJyb3IucHJvdG90eXBlLCAnbmFtZScsIGRlc2NyaXB0b3IpO1xubW9kdWxlLmV4cG9ydHMgPSBTcWxpdGVFcnJvcjtcbiIsICJcbi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgc2VwID0gcmVxdWlyZSgncGF0aCcpLnNlcCB8fCAnLyc7XG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmaWxlVXJpVG9QYXRoO1xuXG4vKipcbiAqIEZpbGUgVVJJIHRvIFBhdGggZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVyaVxuICogQHJldHVybiB7U3RyaW5nfSBwYXRoXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGZpbGVVcmlUb1BhdGggKHVyaSkge1xuICBpZiAoJ3N0cmluZycgIT0gdHlwZW9mIHVyaSB8fFxuICAgICAgdXJpLmxlbmd0aCA8PSA3IHx8XG4gICAgICAnZmlsZTovLycgIT0gdXJpLnN1YnN0cmluZygwLCA3KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ211c3QgcGFzcyBpbiBhIGZpbGU6Ly8gVVJJIHRvIGNvbnZlcnQgdG8gYSBmaWxlIHBhdGgnKTtcbiAgfVxuXG4gIHZhciByZXN0ID0gZGVjb2RlVVJJKHVyaS5zdWJzdHJpbmcoNykpO1xuICB2YXIgZmlyc3RTbGFzaCA9IHJlc3QuaW5kZXhPZignLycpO1xuICB2YXIgaG9zdCA9IHJlc3Quc3Vic3RyaW5nKDAsIGZpcnN0U2xhc2gpO1xuICB2YXIgcGF0aCA9IHJlc3Quc3Vic3RyaW5nKGZpcnN0U2xhc2ggKyAxKTtcblxuICAvLyAyLiAgU2NoZW1lIERlZmluaXRpb25cbiAgLy8gQXMgYSBzcGVjaWFsIGNhc2UsIDxob3N0PiBjYW4gYmUgdGhlIHN0cmluZyBcImxvY2FsaG9zdFwiIG9yIHRoZSBlbXB0eVxuICAvLyBzdHJpbmc7IHRoaXMgaXMgaW50ZXJwcmV0ZWQgYXMgXCJ0aGUgbWFjaGluZSBmcm9tIHdoaWNoIHRoZSBVUkwgaXNcbiAgLy8gYmVpbmcgaW50ZXJwcmV0ZWRcIi5cbiAgaWYgKCdsb2NhbGhvc3QnID09IGhvc3QpIGhvc3QgPSAnJztcblxuICBpZiAoaG9zdCkge1xuICAgIGhvc3QgPSBzZXAgKyBzZXAgKyBob3N0O1xuICB9XG5cbiAgLy8gMy4yICBEcml2ZXMsIGRyaXZlIGxldHRlcnMsIG1vdW50IHBvaW50cywgZmlsZSBzeXN0ZW0gcm9vdFxuICAvLyBEcml2ZSBsZXR0ZXJzIGFyZSBtYXBwZWQgaW50byB0aGUgdG9wIG9mIGEgZmlsZSBVUkkgaW4gdmFyaW91cyB3YXlzLFxuICAvLyBkZXBlbmRpbmcgb24gdGhlIGltcGxlbWVudGF0aW9uOyBzb21lIGFwcGxpY2F0aW9ucyBzdWJzdGl0dXRlXG4gIC8vIHZlcnRpY2FsIGJhciAoXCJ8XCIpIGZvciB0aGUgY29sb24gYWZ0ZXIgdGhlIGRyaXZlIGxldHRlciwgeWllbGRpbmdcbiAgLy8gXCJmaWxlOi8vL2N8L3RtcC90ZXN0LnR4dFwiLiAgSW4gc29tZSBjYXNlcywgdGhlIGNvbG9uIGlzIGxlZnRcbiAgLy8gdW5jaGFuZ2VkLCBhcyBpbiBcImZpbGU6Ly8vYzovdG1wL3Rlc3QudHh0XCIuICBJbiBvdGhlciBjYXNlcywgdGhlXG4gIC8vIGNvbG9uIGlzIHNpbXBseSBvbWl0dGVkLCBhcyBpbiBcImZpbGU6Ly8vYy90bXAvdGVzdC50eHRcIi5cbiAgcGF0aCA9IHBhdGgucmVwbGFjZSgvXiguKylcXHwvLCAnJDE6Jyk7XG5cbiAgLy8gZm9yIFdpbmRvd3MsIHdlIG5lZWQgdG8gaW52ZXJ0IHRoZSBwYXRoIHNlcGFyYXRvcnMgZnJvbSB3aGF0IGEgVVJJIHVzZXNcbiAgaWYgKHNlcCA9PSAnXFxcXCcpIHtcbiAgICBwYXRoID0gcGF0aC5yZXBsYWNlKC9cXC8vZywgJ1xcXFwnKTtcbiAgfVxuXG4gIGlmICgvXi4rXFw6Ly50ZXN0KHBhdGgpKSB7XG4gICAgLy8gaGFzIFdpbmRvd3MgZHJpdmUgYXQgYmVnaW5uaW5nIG9mIHBhdGhcbiAgfSBlbHNlIHtcbiAgICAvLyB1bml4IHBhdGhcdTIwMjZcbiAgICBwYXRoID0gc2VwICsgcGF0aDtcbiAgfVxuXG4gIHJldHVybiBob3N0ICsgcGF0aDtcbn1cbiIsICIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIGZzID0gcmVxdWlyZSgnZnMnKSxcbiAgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKSxcbiAgZmlsZVVSTFRvUGF0aCA9IHJlcXVpcmUoJ2ZpbGUtdXJpLXRvLXBhdGgnKSxcbiAgam9pbiA9IHBhdGguam9pbixcbiAgZGlybmFtZSA9IHBhdGguZGlybmFtZSxcbiAgZXhpc3RzID1cbiAgICAoZnMuYWNjZXNzU3luYyAmJlxuICAgICAgZnVuY3Rpb24ocGF0aCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGZzLmFjY2Vzc1N5bmMocGF0aCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9KSB8fFxuICAgIGZzLmV4aXN0c1N5bmMgfHxcbiAgICBwYXRoLmV4aXN0c1N5bmMsXG4gIGRlZmF1bHRzID0ge1xuICAgIGFycm93OiBwcm9jZXNzLmVudi5OT0RFX0JJTkRJTkdTX0FSUk9XIHx8ICcgXHUyMTkyICcsXG4gICAgY29tcGlsZWQ6IHByb2Nlc3MuZW52Lk5PREVfQklORElOR1NfQ09NUElMRURfRElSIHx8ICdjb21waWxlZCcsXG4gICAgcGxhdGZvcm06IHByb2Nlc3MucGxhdGZvcm0sXG4gICAgYXJjaDogcHJvY2Vzcy5hcmNoLFxuICAgIG5vZGVQcmVHeXA6XG4gICAgICAnbm9kZS12JyArXG4gICAgICBwcm9jZXNzLnZlcnNpb25zLm1vZHVsZXMgK1xuICAgICAgJy0nICtcbiAgICAgIHByb2Nlc3MucGxhdGZvcm0gK1xuICAgICAgJy0nICtcbiAgICAgIHByb2Nlc3MuYXJjaCxcbiAgICB2ZXJzaW9uOiBwcm9jZXNzLnZlcnNpb25zLm5vZGUsXG4gICAgYmluZGluZ3M6ICdiaW5kaW5ncy5ub2RlJyxcbiAgICB0cnk6IFtcbiAgICAgIC8vIG5vZGUtZ3lwJ3MgbGlua2VkIHZlcnNpb24gaW4gdGhlIFwiYnVpbGRcIiBkaXJcbiAgICAgIFsnbW9kdWxlX3Jvb3QnLCAnYnVpbGQnLCAnYmluZGluZ3MnXSxcbiAgICAgIC8vIG5vZGUtd2FmIGFuZCBneXBfYWRkb24gKGEuay5hIG5vZGUtZ3lwKVxuICAgICAgWydtb2R1bGVfcm9vdCcsICdidWlsZCcsICdEZWJ1ZycsICdiaW5kaW5ncyddLFxuICAgICAgWydtb2R1bGVfcm9vdCcsICdidWlsZCcsICdSZWxlYXNlJywgJ2JpbmRpbmdzJ10sXG4gICAgICAvLyBEZWJ1ZyBmaWxlcywgZm9yIGRldmVsb3BtZW50IChsZWdhY3kgYmVoYXZpb3IsIHJlbW92ZSBmb3Igbm9kZSB2MC45KVxuICAgICAgWydtb2R1bGVfcm9vdCcsICdvdXQnLCAnRGVidWcnLCAnYmluZGluZ3MnXSxcbiAgICAgIFsnbW9kdWxlX3Jvb3QnLCAnRGVidWcnLCAnYmluZGluZ3MnXSxcbiAgICAgIC8vIFJlbGVhc2UgZmlsZXMsIGJ1dCBtYW51YWxseSBjb21waWxlZCAobGVnYWN5IGJlaGF2aW9yLCByZW1vdmUgZm9yIG5vZGUgdjAuOSlcbiAgICAgIFsnbW9kdWxlX3Jvb3QnLCAnb3V0JywgJ1JlbGVhc2UnLCAnYmluZGluZ3MnXSxcbiAgICAgIFsnbW9kdWxlX3Jvb3QnLCAnUmVsZWFzZScsICdiaW5kaW5ncyddLFxuICAgICAgLy8gTGVnYWN5IGZyb20gbm9kZS13YWYsIG5vZGUgPD0gMC40LnhcbiAgICAgIFsnbW9kdWxlX3Jvb3QnLCAnYnVpbGQnLCAnZGVmYXVsdCcsICdiaW5kaW5ncyddLFxuICAgICAgLy8gUHJvZHVjdGlvbiBcIlJlbGVhc2VcIiBidWlsZHR5cGUgYmluYXJ5IChtZWguLi4pXG4gICAgICBbJ21vZHVsZV9yb290JywgJ2NvbXBpbGVkJywgJ3ZlcnNpb24nLCAncGxhdGZvcm0nLCAnYXJjaCcsICdiaW5kaW5ncyddLFxuICAgICAgLy8gbm9kZS1xYnMgYnVpbGRzXG4gICAgICBbJ21vZHVsZV9yb290JywgJ2FkZG9uLWJ1aWxkJywgJ3JlbGVhc2UnLCAnaW5zdGFsbC1yb290JywgJ2JpbmRpbmdzJ10sXG4gICAgICBbJ21vZHVsZV9yb290JywgJ2FkZG9uLWJ1aWxkJywgJ2RlYnVnJywgJ2luc3RhbGwtcm9vdCcsICdiaW5kaW5ncyddLFxuICAgICAgWydtb2R1bGVfcm9vdCcsICdhZGRvbi1idWlsZCcsICdkZWZhdWx0JywgJ2luc3RhbGwtcm9vdCcsICdiaW5kaW5ncyddLFxuICAgICAgLy8gbm9kZS1wcmUtZ3lwIHBhdGggLi9saWIvYmluZGluZy97bm9kZV9hYml9LXtwbGF0Zm9ybX0te2FyY2h9XG4gICAgICBbJ21vZHVsZV9yb290JywgJ2xpYicsICdiaW5kaW5nJywgJ25vZGVQcmVHeXAnLCAnYmluZGluZ3MnXVxuICAgIF1cbiAgfTtcblxuLyoqXG4gKiBUaGUgbWFpbiBgYmluZGluZ3MoKWAgZnVuY3Rpb24gbG9hZHMgdGhlIGNvbXBpbGVkIGJpbmRpbmdzIGZvciBhIGdpdmVuIG1vZHVsZS5cbiAqIEl0IHVzZXMgVjgncyBFcnJvciBBUEkgdG8gZGV0ZXJtaW5lIHRoZSBwYXJlbnQgZmlsZW5hbWUgdGhhdCB0aGlzIGZ1bmN0aW9uIGlzXG4gKiBiZWluZyBpbnZva2VkIGZyb20sIHdoaWNoIGlzIHRoZW4gdXNlZCB0byBmaW5kIHRoZSByb290IGRpcmVjdG9yeS5cbiAqL1xuXG5mdW5jdGlvbiBiaW5kaW5ncyhvcHRzKSB7XG4gIC8vIEFyZ3VtZW50IHN1cmdlcnlcbiAgaWYgKHR5cGVvZiBvcHRzID09ICdzdHJpbmcnKSB7XG4gICAgb3B0cyA9IHsgYmluZGluZ3M6IG9wdHMgfTtcbiAgfSBlbHNlIGlmICghb3B0cykge1xuICAgIG9wdHMgPSB7fTtcbiAgfVxuXG4gIC8vIG1hcHMgYGRlZmF1bHRzYCBvbnRvIGBvcHRzYCBvYmplY3RcbiAgT2JqZWN0LmtleXMoZGVmYXVsdHMpLm1hcChmdW5jdGlvbihpKSB7XG4gICAgaWYgKCEoaSBpbiBvcHRzKSkgb3B0c1tpXSA9IGRlZmF1bHRzW2ldO1xuICB9KTtcblxuICAvLyBHZXQgdGhlIG1vZHVsZSByb290XG4gIGlmICghb3B0cy5tb2R1bGVfcm9vdCkge1xuICAgIG9wdHMubW9kdWxlX3Jvb3QgPSBleHBvcnRzLmdldFJvb3QoZXhwb3J0cy5nZXRGaWxlTmFtZSgpKTtcbiAgfVxuXG4gIC8vIEVuc3VyZSB0aGUgZ2l2ZW4gYmluZGluZ3MgbmFtZSBlbmRzIHdpdGggLm5vZGVcbiAgaWYgKHBhdGguZXh0bmFtZShvcHRzLmJpbmRpbmdzKSAhPSAnLm5vZGUnKSB7XG4gICAgb3B0cy5iaW5kaW5ncyArPSAnLm5vZGUnO1xuICB9XG5cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2svd2VicGFjay9pc3N1ZXMvNDE3NSNpc3N1ZWNvbW1lbnQtMzQyOTMxMDM1XG4gIHZhciByZXF1aXJlRnVuYyA9XG4gICAgdHlwZW9mIF9fd2VicGFja19yZXF1aXJlX18gPT09ICdmdW5jdGlvbidcbiAgICAgID8gX19ub25fd2VicGFja19yZXF1aXJlX19cbiAgICAgIDogcmVxdWlyZTtcblxuICB2YXIgdHJpZXMgPSBbXSxcbiAgICBpID0gMCxcbiAgICBsID0gb3B0cy50cnkubGVuZ3RoLFxuICAgIG4sXG4gICAgYixcbiAgICBlcnI7XG5cbiAgZm9yICg7IGkgPCBsOyBpKyspIHtcbiAgICBuID0gam9pbi5hcHBseShcbiAgICAgIG51bGwsXG4gICAgICBvcHRzLnRyeVtpXS5tYXAoZnVuY3Rpb24ocCkge1xuICAgICAgICByZXR1cm4gb3B0c1twXSB8fCBwO1xuICAgICAgfSlcbiAgICApO1xuICAgIHRyaWVzLnB1c2gobik7XG4gICAgdHJ5IHtcbiAgICAgIGIgPSBvcHRzLnBhdGggPyByZXF1aXJlRnVuYy5yZXNvbHZlKG4pIDogcmVxdWlyZUZ1bmMobik7XG4gICAgICBpZiAoIW9wdHMucGF0aCkge1xuICAgICAgICBiLnBhdGggPSBuO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGI7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUuY29kZSAhPT0gJ01PRFVMRV9OT1RfRk9VTkQnICYmXG4gICAgICAgICAgZS5jb2RlICE9PSAnUVVBTElGSUVEX1BBVEhfUkVTT0xVVElPTl9GQUlMRUQnICYmXG4gICAgICAgICAgIS9ub3QgZmluZC9pLnRlc3QoZS5tZXNzYWdlKSkge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGVyciA9IG5ldyBFcnJvcihcbiAgICAnQ291bGQgbm90IGxvY2F0ZSB0aGUgYmluZGluZ3MgZmlsZS4gVHJpZWQ6XFxuJyArXG4gICAgICB0cmllc1xuICAgICAgICAubWFwKGZ1bmN0aW9uKGEpIHtcbiAgICAgICAgICByZXR1cm4gb3B0cy5hcnJvdyArIGE7XG4gICAgICAgIH0pXG4gICAgICAgIC5qb2luKCdcXG4nKVxuICApO1xuICBlcnIudHJpZXMgPSB0cmllcztcbiAgdGhyb3cgZXJyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gYmluZGluZ3M7XG5cbi8qKlxuICogR2V0cyB0aGUgZmlsZW5hbWUgb2YgdGhlIEphdmFTY3JpcHQgZmlsZSB0aGF0IGludm9rZXMgdGhpcyBmdW5jdGlvbi5cbiAqIFVzZWQgdG8gaGVscCBmaW5kIHRoZSByb290IGRpcmVjdG9yeSBvZiBhIG1vZHVsZS5cbiAqIE9wdGlvbmFsbHkgYWNjZXB0cyBhbiBmaWxlbmFtZSBhcmd1bWVudCB0byBza2lwIHdoZW4gc2VhcmNoaW5nIGZvciB0aGUgaW52b2tpbmcgZmlsZW5hbWVcbiAqL1xuXG5leHBvcnRzLmdldEZpbGVOYW1lID0gZnVuY3Rpb24gZ2V0RmlsZU5hbWUoY2FsbGluZ19maWxlKSB7XG4gIHZhciBvcmlnUFNUID0gRXJyb3IucHJlcGFyZVN0YWNrVHJhY2UsXG4gICAgb3JpZ1NUTCA9IEVycm9yLnN0YWNrVHJhY2VMaW1pdCxcbiAgICBkdW1teSA9IHt9LFxuICAgIGZpbGVOYW1lO1xuXG4gIEVycm9yLnN0YWNrVHJhY2VMaW1pdCA9IDEwO1xuXG4gIEVycm9yLnByZXBhcmVTdGFja1RyYWNlID0gZnVuY3Rpb24oZSwgc3QpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IHN0Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZmlsZU5hbWUgPSBzdFtpXS5nZXRGaWxlTmFtZSgpO1xuICAgICAgaWYgKGZpbGVOYW1lICE9PSBfX2ZpbGVuYW1lKSB7XG4gICAgICAgIGlmIChjYWxsaW5nX2ZpbGUpIHtcbiAgICAgICAgICBpZiAoZmlsZU5hbWUgIT09IGNhbGxpbmdfZmlsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLy8gcnVuIHRoZSAncHJlcGFyZVN0YWNrVHJhY2UnIGZ1bmN0aW9uIGFib3ZlXG4gIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKGR1bW15KTtcbiAgZHVtbXkuc3RhY2s7XG5cbiAgLy8gY2xlYW51cFxuICBFcnJvci5wcmVwYXJlU3RhY2tUcmFjZSA9IG9yaWdQU1Q7XG4gIEVycm9yLnN0YWNrVHJhY2VMaW1pdCA9IG9yaWdTVEw7XG5cbiAgLy8gaGFuZGxlIGZpbGVuYW1lIHRoYXQgc3RhcnRzIHdpdGggXCJmaWxlOi8vXCJcbiAgdmFyIGZpbGVTY2hlbWEgPSAnZmlsZTovLyc7XG4gIGlmIChmaWxlTmFtZS5pbmRleE9mKGZpbGVTY2hlbWEpID09PSAwKSB7XG4gICAgZmlsZU5hbWUgPSBmaWxlVVJMVG9QYXRoKGZpbGVOYW1lKTtcbiAgfVxuXG4gIHJldHVybiBmaWxlTmFtZTtcbn07XG5cbi8qKlxuICogR2V0cyB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgYSBtb2R1bGUsIGdpdmVuIGFuIGFyYml0cmFyeSBmaWxlbmFtZVxuICogc29tZXdoZXJlIGluIHRoZSBtb2R1bGUgdHJlZS4gVGhlIFwicm9vdCBkaXJlY3RvcnlcIiBpcyB0aGUgZGlyZWN0b3J5XG4gKiBjb250YWluaW5nIHRoZSBgcGFja2FnZS5qc29uYCBmaWxlLlxuICpcbiAqICAgSW46ICAvaG9tZS9uYXRlL25vZGUtbmF0aXZlLW1vZHVsZS9saWIvaW5kZXguanNcbiAqICAgT3V0OiAvaG9tZS9uYXRlL25vZGUtbmF0aXZlLW1vZHVsZVxuICovXG5cbmV4cG9ydHMuZ2V0Um9vdCA9IGZ1bmN0aW9uIGdldFJvb3QoZmlsZSkge1xuICB2YXIgZGlyID0gZGlybmFtZShmaWxlKSxcbiAgICBwcmV2O1xuICB3aGlsZSAodHJ1ZSkge1xuICAgIGlmIChkaXIgPT09ICcuJykge1xuICAgICAgLy8gQXZvaWRzIGFuIGluZmluaXRlIGxvb3AgaW4gcmFyZSBjYXNlcywgbGlrZSB0aGUgUkVQTFxuICAgICAgZGlyID0gcHJvY2Vzcy5jd2QoKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgZXhpc3RzKGpvaW4oZGlyLCAncGFja2FnZS5qc29uJykpIHx8XG4gICAgICBleGlzdHMoam9pbihkaXIsICdub2RlX21vZHVsZXMnKSlcbiAgICApIHtcbiAgICAgIC8vIEZvdW5kIHRoZSAncGFja2FnZS5qc29uJyBmaWxlIG9yICdub2RlX21vZHVsZXMnIGRpcjsgd2UncmUgZG9uZVxuICAgICAgcmV0dXJuIGRpcjtcbiAgICB9XG4gICAgaWYgKHByZXYgPT09IGRpcikge1xuICAgICAgLy8gR290IHRvIHRoZSB0b3BcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0NvdWxkIG5vdCBmaW5kIG1vZHVsZSByb290IGdpdmVuIGZpbGU6IFwiJyArXG4gICAgICAgICAgZmlsZSArXG4gICAgICAgICAgJ1wiLiBEbyB5b3UgaGF2ZSBhIGBwYWNrYWdlLmpzb25gIGZpbGU/ICdcbiAgICAgICk7XG4gICAgfVxuICAgIC8vIFRyeSB0aGUgcGFyZW50IGRpciBuZXh0XG4gICAgcHJldiA9IGRpcjtcbiAgICBkaXIgPSBqb2luKGRpciwgJy4uJyk7XG4gIH1cbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuY29uc3QgeyBjcHBkYiB9ID0gcmVxdWlyZSgnLi4vdXRpbCcpO1xuXG5leHBvcnRzLnByZXBhcmUgPSBmdW5jdGlvbiBwcmVwYXJlKHNxbCkge1xuXHRyZXR1cm4gdGhpc1tjcHBkYl0ucHJlcGFyZShzcWwsIHRoaXMsIGZhbHNlKTtcbn07XG5cbmV4cG9ydHMuZXhlYyA9IGZ1bmN0aW9uIGV4ZWMoc3FsKSB7XG5cdHRoaXNbY3BwZGJdLmV4ZWMoc3FsKTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG5leHBvcnRzLmNsb3NlID0gZnVuY3Rpb24gY2xvc2UoKSB7XG5cdHRoaXNbY3BwZGJdLmNsb3NlKCk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuZXhwb3J0cy5sb2FkRXh0ZW5zaW9uID0gZnVuY3Rpb24gbG9hZEV4dGVuc2lvbiguLi5hcmdzKSB7XG5cdHRoaXNbY3BwZGJdLmxvYWRFeHRlbnNpb24oLi4uYXJncyk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuZXhwb3J0cy5kZWZhdWx0U2FmZUludGVnZXJzID0gZnVuY3Rpb24gZGVmYXVsdFNhZmVJbnRlZ2VycyguLi5hcmdzKSB7XG5cdHRoaXNbY3BwZGJdLmRlZmF1bHRTYWZlSW50ZWdlcnMoLi4uYXJncyk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuZXhwb3J0cy51bnNhZmVNb2RlID0gZnVuY3Rpb24gdW5zYWZlTW9kZSguLi5hcmdzKSB7XG5cdHRoaXNbY3BwZGJdLnVuc2FmZU1vZGUoLi4uYXJncyk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuZXhwb3J0cy5nZXR0ZXJzID0ge1xuXHRuYW1lOiB7XG5cdFx0Z2V0OiBmdW5jdGlvbiBuYW1lKCkgeyByZXR1cm4gdGhpc1tjcHBkYl0ubmFtZTsgfSxcblx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHR9LFxuXHRvcGVuOiB7XG5cdFx0Z2V0OiBmdW5jdGlvbiBvcGVuKCkgeyByZXR1cm4gdGhpc1tjcHBkYl0ub3BlbjsgfSxcblx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHR9LFxuXHRpblRyYW5zYWN0aW9uOiB7XG5cdFx0Z2V0OiBmdW5jdGlvbiBpblRyYW5zYWN0aW9uKCkgeyByZXR1cm4gdGhpc1tjcHBkYl0uaW5UcmFuc2FjdGlvbjsgfSxcblx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHR9LFxuXHRyZWFkb25seToge1xuXHRcdGdldDogZnVuY3Rpb24gcmVhZG9ubHkoKSB7IHJldHVybiB0aGlzW2NwcGRiXS5yZWFkb25seTsgfSxcblx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHR9LFxuXHRtZW1vcnk6IHtcblx0XHRnZXQ6IGZ1bmN0aW9uIG1lbW9yeSgpIHsgcmV0dXJuIHRoaXNbY3BwZGJdLm1lbW9yeTsgfSxcblx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHR9LFxufTtcbiIsICIndXNlIHN0cmljdCc7XG5jb25zdCB7IGNwcGRiIH0gPSByZXF1aXJlKCcuLi91dGlsJyk7XG5jb25zdCBjb250cm9sbGVycyA9IG5ldyBXZWFrTWFwKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdHJhbnNhY3Rpb24oZm4pIHtcblx0aWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgZmlyc3QgYXJndW1lbnQgdG8gYmUgYSBmdW5jdGlvbicpO1xuXG5cdGNvbnN0IGRiID0gdGhpc1tjcHBkYl07XG5cdGNvbnN0IGNvbnRyb2xsZXIgPSBnZXRDb250cm9sbGVyKGRiLCB0aGlzKTtcblx0Y29uc3QgeyBhcHBseSB9ID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuXG5cdC8vIEVhY2ggdmVyc2lvbiBvZiB0aGUgdHJhbnNhY3Rpb24gZnVuY3Rpb24gaGFzIHRoZXNlIHNhbWUgcHJvcGVydGllc1xuXHRjb25zdCBwcm9wZXJ0aWVzID0ge1xuXHRcdGRlZmF1bHQ6IHsgdmFsdWU6IHdyYXBUcmFuc2FjdGlvbihhcHBseSwgZm4sIGRiLCBjb250cm9sbGVyLmRlZmF1bHQpIH0sXG5cdFx0ZGVmZXJyZWQ6IHsgdmFsdWU6IHdyYXBUcmFuc2FjdGlvbihhcHBseSwgZm4sIGRiLCBjb250cm9sbGVyLmRlZmVycmVkKSB9LFxuXHRcdGltbWVkaWF0ZTogeyB2YWx1ZTogd3JhcFRyYW5zYWN0aW9uKGFwcGx5LCBmbiwgZGIsIGNvbnRyb2xsZXIuaW1tZWRpYXRlKSB9LFxuXHRcdGV4Y2x1c2l2ZTogeyB2YWx1ZTogd3JhcFRyYW5zYWN0aW9uKGFwcGx5LCBmbiwgZGIsIGNvbnRyb2xsZXIuZXhjbHVzaXZlKSB9LFxuXHRcdGRhdGFiYXNlOiB7IHZhbHVlOiB0aGlzLCBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdH07XG5cblx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXMocHJvcGVydGllcy5kZWZhdWx0LnZhbHVlLCBwcm9wZXJ0aWVzKTtcblx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXMocHJvcGVydGllcy5kZWZlcnJlZC52YWx1ZSwgcHJvcGVydGllcyk7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHByb3BlcnRpZXMuaW1tZWRpYXRlLnZhbHVlLCBwcm9wZXJ0aWVzKTtcblx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXMocHJvcGVydGllcy5leGNsdXNpdmUudmFsdWUsIHByb3BlcnRpZXMpO1xuXG5cdC8vIFJldHVybiB0aGUgZGVmYXVsdCB2ZXJzaW9uIG9mIHRoZSB0cmFuc2FjdGlvbiBmdW5jdGlvblxuXHRyZXR1cm4gcHJvcGVydGllcy5kZWZhdWx0LnZhbHVlO1xufTtcblxuLy8gUmV0dXJuIHRoZSBkYXRhYmFzZSdzIGNhY2hlZCB0cmFuc2FjdGlvbiBjb250cm9sbGVyLCBvciBjcmVhdGUgYSBuZXcgb25lXG5jb25zdCBnZXRDb250cm9sbGVyID0gKGRiLCBzZWxmKSA9PiB7XG5cdGxldCBjb250cm9sbGVyID0gY29udHJvbGxlcnMuZ2V0KGRiKTtcblx0aWYgKCFjb250cm9sbGVyKSB7XG5cdFx0Y29uc3Qgc2hhcmVkID0ge1xuXHRcdFx0Y29tbWl0OiBkYi5wcmVwYXJlKCdDT01NSVQnLCBzZWxmLCBmYWxzZSksXG5cdFx0XHRyb2xsYmFjazogZGIucHJlcGFyZSgnUk9MTEJBQ0snLCBzZWxmLCBmYWxzZSksXG5cdFx0XHRzYXZlcG9pbnQ6IGRiLnByZXBhcmUoJ1NBVkVQT0lOVCBgXFx0X2JzMy5cXHRgJywgc2VsZiwgZmFsc2UpLFxuXHRcdFx0cmVsZWFzZTogZGIucHJlcGFyZSgnUkVMRUFTRSBgXFx0X2JzMy5cXHRgJywgc2VsZiwgZmFsc2UpLFxuXHRcdFx0cm9sbGJhY2tUbzogZGIucHJlcGFyZSgnUk9MTEJBQ0sgVE8gYFxcdF9iczMuXFx0YCcsIHNlbGYsIGZhbHNlKSxcblx0XHR9O1xuXHRcdGNvbnRyb2xsZXJzLnNldChkYiwgY29udHJvbGxlciA9IHtcblx0XHRcdGRlZmF1bHQ6IE9iamVjdC5hc3NpZ24oeyBiZWdpbjogZGIucHJlcGFyZSgnQkVHSU4nLCBzZWxmLCBmYWxzZSkgfSwgc2hhcmVkKSxcblx0XHRcdGRlZmVycmVkOiBPYmplY3QuYXNzaWduKHsgYmVnaW46IGRiLnByZXBhcmUoJ0JFR0lOIERFRkVSUkVEJywgc2VsZiwgZmFsc2UpIH0sIHNoYXJlZCksXG5cdFx0XHRpbW1lZGlhdGU6IE9iamVjdC5hc3NpZ24oeyBiZWdpbjogZGIucHJlcGFyZSgnQkVHSU4gSU1NRURJQVRFJywgc2VsZiwgZmFsc2UpIH0sIHNoYXJlZCksXG5cdFx0XHRleGNsdXNpdmU6IE9iamVjdC5hc3NpZ24oeyBiZWdpbjogZGIucHJlcGFyZSgnQkVHSU4gRVhDTFVTSVZFJywgc2VsZiwgZmFsc2UpIH0sIHNoYXJlZCksXG5cdFx0fSk7XG5cdH1cblx0cmV0dXJuIGNvbnRyb2xsZXI7XG59O1xuXG4vLyBSZXR1cm4gYSBuZXcgdHJhbnNhY3Rpb24gZnVuY3Rpb24gYnkgd3JhcHBpbmcgdGhlIGdpdmVuIGZ1bmN0aW9uXG5jb25zdCB3cmFwVHJhbnNhY3Rpb24gPSAoYXBwbHksIGZuLCBkYiwgeyBiZWdpbiwgY29tbWl0LCByb2xsYmFjaywgc2F2ZXBvaW50LCByZWxlYXNlLCByb2xsYmFja1RvIH0pID0+IGZ1bmN0aW9uIHNxbGl0ZVRyYW5zYWN0aW9uKCkge1xuXHRsZXQgYmVmb3JlLCBhZnRlciwgdW5kbztcblx0aWYgKGRiLmluVHJhbnNhY3Rpb24pIHtcblx0XHRiZWZvcmUgPSBzYXZlcG9pbnQ7XG5cdFx0YWZ0ZXIgPSByZWxlYXNlO1xuXHRcdHVuZG8gPSByb2xsYmFja1RvO1xuXHR9IGVsc2Uge1xuXHRcdGJlZm9yZSA9IGJlZ2luO1xuXHRcdGFmdGVyID0gY29tbWl0O1xuXHRcdHVuZG8gPSByb2xsYmFjaztcblx0fVxuXHRiZWZvcmUucnVuKCk7XG5cdHRyeSB7XG5cdFx0Y29uc3QgcmVzdWx0ID0gYXBwbHkuY2FsbChmbiwgdGhpcywgYXJndW1lbnRzKTtcblx0XHRpZiAocmVzdWx0ICYmIHR5cGVvZiByZXN1bHQudGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignVHJhbnNhY3Rpb24gZnVuY3Rpb24gY2Fubm90IHJldHVybiBhIHByb21pc2UnKTtcblx0XHR9XG5cdFx0YWZ0ZXIucnVuKCk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSBjYXRjaCAoZXgpIHtcblx0XHRpZiAoZGIuaW5UcmFuc2FjdGlvbikge1xuXHRcdFx0dW5kby5ydW4oKTtcblx0XHRcdGlmICh1bmRvICE9PSByb2xsYmFjaykgYWZ0ZXIucnVuKCk7XG5cdFx0fVxuXHRcdHRocm93IGV4O1xuXHR9XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcbmNvbnN0IHsgZ2V0Qm9vbGVhbk9wdGlvbiwgY3BwZGIgfSA9IHJlcXVpcmUoJy4uL3V0aWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwcmFnbWEoc291cmNlLCBvcHRpb25zKSB7XG5cdGlmIChvcHRpb25zID09IG51bGwpIG9wdGlvbnMgPSB7fTtcblx0aWYgKHR5cGVvZiBzb3VyY2UgIT09ICdzdHJpbmcnKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBmaXJzdCBhcmd1bWVudCB0byBiZSBhIHN0cmluZycpO1xuXHRpZiAodHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBzZWNvbmQgYXJndW1lbnQgdG8gYmUgYW4gb3B0aW9ucyBvYmplY3QnKTtcblx0Y29uc3Qgc2ltcGxlID0gZ2V0Qm9vbGVhbk9wdGlvbihvcHRpb25zLCAnc2ltcGxlJyk7XG5cblx0Y29uc3Qgc3RtdCA9IHRoaXNbY3BwZGJdLnByZXBhcmUoYFBSQUdNQSAke3NvdXJjZX1gLCB0aGlzLCB0cnVlKTtcblx0cmV0dXJuIHNpbXBsZSA/IHN0bXQucGx1Y2soKS5nZXQoKSA6IHN0bXQuYWxsKCk7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCB7IHByb21pc2lmeSB9ID0gcmVxdWlyZSgndXRpbCcpO1xuY29uc3QgeyBjcHBkYiB9ID0gcmVxdWlyZSgnLi4vdXRpbCcpO1xuY29uc3QgZnNBY2Nlc3MgPSBwcm9taXNpZnkoZnMuYWNjZXNzKTtcblxubW9kdWxlLmV4cG9ydHMgPSBhc3luYyBmdW5jdGlvbiBiYWNrdXAoZmlsZW5hbWUsIG9wdGlvbnMpIHtcblx0aWYgKG9wdGlvbnMgPT0gbnVsbCkgb3B0aW9ucyA9IHt9O1xuXG5cdC8vIFZhbGlkYXRlIGFyZ3VtZW50c1xuXHRpZiAodHlwZW9mIGZpbGVuYW1lICE9PSAnc3RyaW5nJykgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgZmlyc3QgYXJndW1lbnQgdG8gYmUgYSBzdHJpbmcnKTtcblx0aWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0JykgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgc2Vjb25kIGFyZ3VtZW50IHRvIGJlIGFuIG9wdGlvbnMgb2JqZWN0Jyk7XG5cblx0Ly8gSW50ZXJwcmV0IG9wdGlvbnNcblx0ZmlsZW5hbWUgPSBmaWxlbmFtZS50cmltKCk7XG5cdGNvbnN0IGF0dGFjaGVkTmFtZSA9ICdhdHRhY2hlZCcgaW4gb3B0aW9ucyA/IG9wdGlvbnMuYXR0YWNoZWQgOiAnbWFpbic7XG5cdGNvbnN0IGhhbmRsZXIgPSAncHJvZ3Jlc3MnIGluIG9wdGlvbnMgPyBvcHRpb25zLnByb2dyZXNzIDogbnVsbDtcblxuXHQvLyBWYWxpZGF0ZSBpbnRlcnByZXRlZCBvcHRpb25zXG5cdGlmICghZmlsZW5hbWUpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0JhY2t1cCBmaWxlbmFtZSBjYW5ub3QgYmUgYW4gZW1wdHkgc3RyaW5nJyk7XG5cdGlmIChmaWxlbmFtZSA9PT0gJzptZW1vcnk6JykgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBiYWNrdXAgZmlsZW5hbWUgXCI6bWVtb3J5OlwiJyk7XG5cdGlmICh0eXBlb2YgYXR0YWNoZWROYW1lICE9PSAnc3RyaW5nJykgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgdGhlIFwiYXR0YWNoZWRcIiBvcHRpb24gdG8gYmUgYSBzdHJpbmcnKTtcblx0aWYgKCFhdHRhY2hlZE5hbWUpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImF0dGFjaGVkXCIgb3B0aW9uIGNhbm5vdCBiZSBhbiBlbXB0eSBzdHJpbmcnKTtcblx0aWYgKGhhbmRsZXIgIT0gbnVsbCAmJiB0eXBlb2YgaGFuZGxlciAhPT0gJ2Z1bmN0aW9uJykgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgdGhlIFwicHJvZ3Jlc3NcIiBvcHRpb24gdG8gYmUgYSBmdW5jdGlvbicpO1xuXG5cdC8vIE1ha2Ugc3VyZSB0aGUgc3BlY2lmaWVkIGRpcmVjdG9yeSBleGlzdHNcblx0YXdhaXQgZnNBY2Nlc3MocGF0aC5kaXJuYW1lKGZpbGVuYW1lKSkuY2F0Y2goKCkgPT4ge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBzYXZlIGJhY2t1cCBiZWNhdXNlIHRoZSBkaXJlY3RvcnkgZG9lcyBub3QgZXhpc3QnKTtcblx0fSk7XG5cblx0Y29uc3QgaXNOZXdGaWxlID0gYXdhaXQgZnNBY2Nlc3MoZmlsZW5hbWUpLnRoZW4oKCkgPT4gZmFsc2UsICgpID0+IHRydWUpO1xuXHRyZXR1cm4gcnVuQmFja3VwKHRoaXNbY3BwZGJdLmJhY2t1cCh0aGlzLCBhdHRhY2hlZE5hbWUsIGZpbGVuYW1lLCBpc05ld0ZpbGUpLCBoYW5kbGVyIHx8IG51bGwpO1xufTtcblxuY29uc3QgcnVuQmFja3VwID0gKGJhY2t1cCwgaGFuZGxlcikgPT4ge1xuXHRsZXQgcmF0ZSA9IDA7XG5cdGxldCB1c2VEZWZhdWx0ID0gdHJ1ZTtcblxuXHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdHNldEltbWVkaWF0ZShmdW5jdGlvbiBzdGVwKCkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Y29uc3QgcHJvZ3Jlc3MgPSBiYWNrdXAudHJhbnNmZXIocmF0ZSk7XG5cdFx0XHRcdGlmICghcHJvZ3Jlc3MucmVtYWluaW5nUGFnZXMpIHtcblx0XHRcdFx0XHRiYWNrdXAuY2xvc2UoKTtcblx0XHRcdFx0XHRyZXNvbHZlKHByb2dyZXNzKTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHVzZURlZmF1bHQpIHtcblx0XHRcdFx0XHR1c2VEZWZhdWx0ID0gZmFsc2U7XG5cdFx0XHRcdFx0cmF0ZSA9IDEwMDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoaGFuZGxlcikge1xuXHRcdFx0XHRcdGNvbnN0IHJldCA9IGhhbmRsZXIocHJvZ3Jlc3MpO1xuXHRcdFx0XHRcdGlmIChyZXQgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0aWYgKHR5cGVvZiByZXQgPT09ICdudW1iZXInICYmIHJldCA9PT0gcmV0KSByYXRlID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMHg3ZmZmZmZmZiwgTWF0aC5yb3VuZChyZXQpKSk7XG5cdFx0XHRcdFx0XHRlbHNlIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIHByb2dyZXNzIGNhbGxiYWNrIHRvIHJldHVybiBhIG51bWJlciBvciB1bmRlZmluZWQnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0c2V0SW1tZWRpYXRlKHN0ZXApO1xuXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdGJhY2t1cC5jbG9zZSgpO1xuXHRcdFx0XHRyZWplY3QoZXJyKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcbmNvbnN0IHsgY3BwZGIgfSA9IHJlcXVpcmUoJy4uL3V0aWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZXJpYWxpemUob3B0aW9ucykge1xuXHRpZiAob3B0aW9ucyA9PSBudWxsKSBvcHRpb25zID0ge307XG5cblx0Ly8gVmFsaWRhdGUgYXJndW1lbnRzXG5cdGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGZpcnN0IGFyZ3VtZW50IHRvIGJlIGFuIG9wdGlvbnMgb2JqZWN0Jyk7XG5cblx0Ly8gSW50ZXJwcmV0IGFuZCB2YWxpZGF0ZSBvcHRpb25zXG5cdGNvbnN0IGF0dGFjaGVkTmFtZSA9ICdhdHRhY2hlZCcgaW4gb3B0aW9ucyA/IG9wdGlvbnMuYXR0YWNoZWQgOiAnbWFpbic7XG5cdGlmICh0eXBlb2YgYXR0YWNoZWROYW1lICE9PSAnc3RyaW5nJykgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgdGhlIFwiYXR0YWNoZWRcIiBvcHRpb24gdG8gYmUgYSBzdHJpbmcnKTtcblx0aWYgKCFhdHRhY2hlZE5hbWUpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImF0dGFjaGVkXCIgb3B0aW9uIGNhbm5vdCBiZSBhbiBlbXB0eSBzdHJpbmcnKTtcblxuXHRyZXR1cm4gdGhpc1tjcHBkYl0uc2VyaWFsaXplKGF0dGFjaGVkTmFtZSk7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcbmNvbnN0IHsgZ2V0Qm9vbGVhbk9wdGlvbiwgY3BwZGIgfSA9IHJlcXVpcmUoJy4uL3V0aWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVGdW5jdGlvbihuYW1lLCBvcHRpb25zLCBmbikge1xuXHQvLyBBcHBseSBkZWZhdWx0c1xuXHRpZiAob3B0aW9ucyA9PSBudWxsKSBvcHRpb25zID0ge307XG5cdGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykgeyBmbiA9IG9wdGlvbnM7IG9wdGlvbnMgPSB7fTsgfVxuXG5cdC8vIFZhbGlkYXRlIGFyZ3VtZW50c1xuXHRpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBmaXJzdCBhcmd1bWVudCB0byBiZSBhIHN0cmluZycpO1xuXHRpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBsYXN0IGFyZ3VtZW50IHRvIGJlIGEgZnVuY3Rpb24nKTtcblx0aWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0JykgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgc2Vjb25kIGFyZ3VtZW50IHRvIGJlIGFuIG9wdGlvbnMgb2JqZWN0Jyk7XG5cdGlmICghbmFtZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVXNlci1kZWZpbmVkIGZ1bmN0aW9uIG5hbWUgY2Fubm90IGJlIGFuIGVtcHR5IHN0cmluZycpO1xuXG5cdC8vIEludGVycHJldCBvcHRpb25zXG5cdGNvbnN0IHNhZmVJbnRlZ2VycyA9ICdzYWZlSW50ZWdlcnMnIGluIG9wdGlvbnMgPyArZ2V0Qm9vbGVhbk9wdGlvbihvcHRpb25zLCAnc2FmZUludGVnZXJzJykgOiAyO1xuXHRjb25zdCBkZXRlcm1pbmlzdGljID0gZ2V0Qm9vbGVhbk9wdGlvbihvcHRpb25zLCAnZGV0ZXJtaW5pc3RpYycpO1xuXHRjb25zdCBkaXJlY3RPbmx5ID0gZ2V0Qm9vbGVhbk9wdGlvbihvcHRpb25zLCAnZGlyZWN0T25seScpO1xuXHRjb25zdCB2YXJhcmdzID0gZ2V0Qm9vbGVhbk9wdGlvbihvcHRpb25zLCAndmFyYXJncycpO1xuXHRsZXQgYXJnQ291bnQgPSAtMTtcblxuXHQvLyBEZXRlcm1pbmUgYXJndW1lbnQgY291bnRcblx0aWYgKCF2YXJhcmdzKSB7XG5cdFx0YXJnQ291bnQgPSBmbi5sZW5ndGg7XG5cdFx0aWYgKCFOdW1iZXIuaXNJbnRlZ2VyKGFyZ0NvdW50KSB8fCBhcmdDb3VudCA8IDApIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGZ1bmN0aW9uLmxlbmd0aCB0byBiZSBhIHBvc2l0aXZlIGludGVnZXInKTtcblx0XHRpZiAoYXJnQ291bnQgPiAxMDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdVc2VyLWRlZmluZWQgZnVuY3Rpb25zIGNhbm5vdCBoYXZlIG1vcmUgdGhhbiAxMDAgYXJndW1lbnRzJyk7XG5cdH1cblxuXHR0aGlzW2NwcGRiXS5mdW5jdGlvbihmbiwgbmFtZSwgYXJnQ291bnQsIHNhZmVJbnRlZ2VycywgZGV0ZXJtaW5pc3RpYywgZGlyZWN0T25seSk7XG5cdHJldHVybiB0aGlzO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5jb25zdCB7IGdldEJvb2xlYW5PcHRpb24sIGNwcGRiIH0gPSByZXF1aXJlKCcuLi91dGlsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lQWdncmVnYXRlKG5hbWUsIG9wdGlvbnMpIHtcblx0Ly8gVmFsaWRhdGUgYXJndW1lbnRzXG5cdGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGZpcnN0IGFyZ3VtZW50IHRvIGJlIGEgc3RyaW5nJyk7XG5cdGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcgfHwgb3B0aW9ucyA9PT0gbnVsbCkgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgc2Vjb25kIGFyZ3VtZW50IHRvIGJlIGFuIG9wdGlvbnMgb2JqZWN0Jyk7XG5cdGlmICghbmFtZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVXNlci1kZWZpbmVkIGZ1bmN0aW9uIG5hbWUgY2Fubm90IGJlIGFuIGVtcHR5IHN0cmluZycpO1xuXG5cdC8vIEludGVycHJldCBvcHRpb25zXG5cdGNvbnN0IHN0YXJ0ID0gJ3N0YXJ0JyBpbiBvcHRpb25zID8gb3B0aW9ucy5zdGFydCA6IG51bGw7XG5cdGNvbnN0IHN0ZXAgPSBnZXRGdW5jdGlvbk9wdGlvbihvcHRpb25zLCAnc3RlcCcsIHRydWUpO1xuXHRjb25zdCBpbnZlcnNlID0gZ2V0RnVuY3Rpb25PcHRpb24ob3B0aW9ucywgJ2ludmVyc2UnLCBmYWxzZSk7XG5cdGNvbnN0IHJlc3VsdCA9IGdldEZ1bmN0aW9uT3B0aW9uKG9wdGlvbnMsICdyZXN1bHQnLCBmYWxzZSk7XG5cdGNvbnN0IHNhZmVJbnRlZ2VycyA9ICdzYWZlSW50ZWdlcnMnIGluIG9wdGlvbnMgPyArZ2V0Qm9vbGVhbk9wdGlvbihvcHRpb25zLCAnc2FmZUludGVnZXJzJykgOiAyO1xuXHRjb25zdCBkZXRlcm1pbmlzdGljID0gZ2V0Qm9vbGVhbk9wdGlvbihvcHRpb25zLCAnZGV0ZXJtaW5pc3RpYycpO1xuXHRjb25zdCBkaXJlY3RPbmx5ID0gZ2V0Qm9vbGVhbk9wdGlvbihvcHRpb25zLCAnZGlyZWN0T25seScpO1xuXHRjb25zdCB2YXJhcmdzID0gZ2V0Qm9vbGVhbk9wdGlvbihvcHRpb25zLCAndmFyYXJncycpO1xuXHRsZXQgYXJnQ291bnQgPSAtMTtcblxuXHQvLyBEZXRlcm1pbmUgYXJndW1lbnQgY291bnRcblx0aWYgKCF2YXJhcmdzKSB7XG5cdFx0YXJnQ291bnQgPSBNYXRoLm1heChnZXRMZW5ndGgoc3RlcCksIGludmVyc2UgPyBnZXRMZW5ndGgoaW52ZXJzZSkgOiAwKTtcblx0XHRpZiAoYXJnQ291bnQgPiAwKSBhcmdDb3VudCAtPSAxO1xuXHRcdGlmIChhcmdDb3VudCA+IDEwMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1VzZXItZGVmaW5lZCBmdW5jdGlvbnMgY2Fubm90IGhhdmUgbW9yZSB0aGFuIDEwMCBhcmd1bWVudHMnKTtcblx0fVxuXG5cdHRoaXNbY3BwZGJdLmFnZ3JlZ2F0ZShzdGFydCwgc3RlcCwgaW52ZXJzZSwgcmVzdWx0LCBuYW1lLCBhcmdDb3VudCwgc2FmZUludGVnZXJzLCBkZXRlcm1pbmlzdGljLCBkaXJlY3RPbmx5KTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG5jb25zdCBnZXRGdW5jdGlvbk9wdGlvbiA9IChvcHRpb25zLCBrZXksIHJlcXVpcmVkKSA9PiB7XG5cdGNvbnN0IHZhbHVlID0ga2V5IGluIG9wdGlvbnMgPyBvcHRpb25zW2tleV0gOiBudWxsO1xuXHRpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSByZXR1cm4gdmFsdWU7XG5cdGlmICh2YWx1ZSAhPSBudWxsKSB0aHJvdyBuZXcgVHlwZUVycm9yKGBFeHBlY3RlZCB0aGUgXCIke2tleX1cIiBvcHRpb24gdG8gYmUgYSBmdW5jdGlvbmApO1xuXHRpZiAocmVxdWlyZWQpIHRocm93IG5ldyBUeXBlRXJyb3IoYE1pc3NpbmcgcmVxdWlyZWQgb3B0aW9uIFwiJHtrZXl9XCJgKTtcblx0cmV0dXJuIG51bGw7XG59O1xuXG5jb25zdCBnZXRMZW5ndGggPSAoeyBsZW5ndGggfSkgPT4ge1xuXHRpZiAoTnVtYmVyLmlzSW50ZWdlcihsZW5ndGgpICYmIGxlbmd0aCA+PSAwKSByZXR1cm4gbGVuZ3RoO1xuXHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBmdW5jdGlvbi5sZW5ndGggdG8gYmUgYSBwb3NpdGl2ZSBpbnRlZ2VyJyk7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcbmNvbnN0IHsgY3BwZGIgfSA9IHJlcXVpcmUoJy4uL3V0aWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVUYWJsZShuYW1lLCBmYWN0b3J5KSB7XG5cdC8vIFZhbGlkYXRlIGFyZ3VtZW50c1xuXHRpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBmaXJzdCBhcmd1bWVudCB0byBiZSBhIHN0cmluZycpO1xuXHRpZiAoIW5hbWUpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1ZpcnR1YWwgdGFibGUgbW9kdWxlIG5hbWUgY2Fubm90IGJlIGFuIGVtcHR5IHN0cmluZycpO1xuXG5cdC8vIERldGVybWluZSB3aGV0aGVyIHRoZSBtb2R1bGUgaXMgZXBvbnltb3VzLW9ubHkgb3Igbm90XG5cdGxldCBlcG9ueW1vdXMgPSBmYWxzZTtcblx0aWYgKHR5cGVvZiBmYWN0b3J5ID09PSAnb2JqZWN0JyAmJiBmYWN0b3J5ICE9PSBudWxsKSB7XG5cdFx0ZXBvbnltb3VzID0gdHJ1ZTtcblx0XHRmYWN0b3J5ID0gZGVmZXIocGFyc2VUYWJsZURlZmluaXRpb24oZmFjdG9yeSwgJ3VzZWQnLCBuYW1lKSk7XG5cdH0gZWxzZSB7XG5cdFx0aWYgKHR5cGVvZiBmYWN0b3J5ICE9PSAnZnVuY3Rpb24nKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBzZWNvbmQgYXJndW1lbnQgdG8gYmUgYSBmdW5jdGlvbiBvciBhIHRhYmxlIGRlZmluaXRpb24gb2JqZWN0Jyk7XG5cdFx0ZmFjdG9yeSA9IHdyYXBGYWN0b3J5KGZhY3RvcnkpO1xuXHR9XG5cblx0dGhpc1tjcHBkYl0udGFibGUoZmFjdG9yeSwgbmFtZSwgZXBvbnltb3VzKTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiB3cmFwRmFjdG9yeShmYWN0b3J5KSB7XG5cdHJldHVybiBmdW5jdGlvbiB2aXJ0dWFsVGFibGVGYWN0b3J5KG1vZHVsZU5hbWUsIGRhdGFiYXNlTmFtZSwgdGFibGVOYW1lLCAuLi5hcmdzKSB7XG5cdFx0Y29uc3QgdGhpc09iamVjdCA9IHtcblx0XHRcdG1vZHVsZTogbW9kdWxlTmFtZSxcblx0XHRcdGRhdGFiYXNlOiBkYXRhYmFzZU5hbWUsXG5cdFx0XHR0YWJsZTogdGFibGVOYW1lLFxuXHRcdH07XG5cblx0XHQvLyBHZW5lcmF0ZSBhIG5ldyB0YWJsZSBkZWZpbml0aW9uIGJ5IGludm9raW5nIHRoZSBmYWN0b3J5XG5cdFx0Y29uc3QgZGVmID0gYXBwbHkuY2FsbChmYWN0b3J5LCB0aGlzT2JqZWN0LCBhcmdzKTtcblx0XHRpZiAodHlwZW9mIGRlZiAhPT0gJ29iamVjdCcgfHwgZGVmID09PSBudWxsKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBWaXJ0dWFsIHRhYmxlIG1vZHVsZSBcIiR7bW9kdWxlTmFtZX1cIiBkaWQgbm90IHJldHVybiBhIHRhYmxlIGRlZmluaXRpb24gb2JqZWN0YCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHBhcnNlVGFibGVEZWZpbml0aW9uKGRlZiwgJ3JldHVybmVkJywgbW9kdWxlTmFtZSk7XG5cdH07XG59XG5cbmZ1bmN0aW9uIHBhcnNlVGFibGVEZWZpbml0aW9uKGRlZiwgdmVyYiwgbW9kdWxlTmFtZSkge1xuXHQvLyBWYWxpZGF0ZSByZXF1aXJlZCBwcm9wZXJ0aWVzXG5cdGlmICghaGFzT3duUHJvcGVydHkuY2FsbChkZWYsICdyb3dzJykpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBWaXJ0dWFsIHRhYmxlIG1vZHVsZSBcIiR7bW9kdWxlTmFtZX1cIiAke3ZlcmJ9IGEgdGFibGUgZGVmaW5pdGlvbiB3aXRob3V0IGEgXCJyb3dzXCIgcHJvcGVydHlgKTtcblx0fVxuXHRpZiAoIWhhc093blByb3BlcnR5LmNhbGwoZGVmLCAnY29sdW1ucycpKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgVmlydHVhbCB0YWJsZSBtb2R1bGUgXCIke21vZHVsZU5hbWV9XCIgJHt2ZXJifSBhIHRhYmxlIGRlZmluaXRpb24gd2l0aG91dCBhIFwiY29sdW1uc1wiIHByb3BlcnR5YCk7XG5cdH1cblxuXHQvLyBWYWxpZGF0ZSBcInJvd3NcIiBwcm9wZXJ0eVxuXHRjb25zdCByb3dzID0gZGVmLnJvd3M7XG5cdGlmICh0eXBlb2Ygcm93cyAhPT0gJ2Z1bmN0aW9uJyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yocm93cykgIT09IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgVmlydHVhbCB0YWJsZSBtb2R1bGUgXCIke21vZHVsZU5hbWV9XCIgJHt2ZXJifSBhIHRhYmxlIGRlZmluaXRpb24gd2l0aCBhbiBpbnZhbGlkIFwicm93c1wiIHByb3BlcnR5IChzaG91bGQgYmUgYSBnZW5lcmF0b3IgZnVuY3Rpb24pYCk7XG5cdH1cblxuXHQvLyBWYWxpZGF0ZSBcImNvbHVtbnNcIiBwcm9wZXJ0eVxuXHRsZXQgY29sdW1ucyA9IGRlZi5jb2x1bW5zO1xuXHRpZiAoIUFycmF5LmlzQXJyYXkoY29sdW1ucykgfHwgIShjb2x1bW5zID0gWy4uLmNvbHVtbnNdKS5ldmVyeSh4ID0+IHR5cGVvZiB4ID09PSAnc3RyaW5nJykpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBWaXJ0dWFsIHRhYmxlIG1vZHVsZSBcIiR7bW9kdWxlTmFtZX1cIiAke3ZlcmJ9IGEgdGFibGUgZGVmaW5pdGlvbiB3aXRoIGFuIGludmFsaWQgXCJjb2x1bW5zXCIgcHJvcGVydHkgKHNob3VsZCBiZSBhbiBhcnJheSBvZiBzdHJpbmdzKWApO1xuXHR9XG5cdGlmIChjb2x1bW5zLmxlbmd0aCAhPT0gbmV3IFNldChjb2x1bW5zKS5zaXplKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgVmlydHVhbCB0YWJsZSBtb2R1bGUgXCIke21vZHVsZU5hbWV9XCIgJHt2ZXJifSBhIHRhYmxlIGRlZmluaXRpb24gd2l0aCBkdXBsaWNhdGUgY29sdW1uIG5hbWVzYCk7XG5cdH1cblx0aWYgKCFjb2x1bW5zLmxlbmd0aCkge1xuXHRcdHRocm93IG5ldyBSYW5nZUVycm9yKGBWaXJ0dWFsIHRhYmxlIG1vZHVsZSBcIiR7bW9kdWxlTmFtZX1cIiAke3ZlcmJ9IGEgdGFibGUgZGVmaW5pdGlvbiB3aXRoIHplcm8gY29sdW1uc2ApO1xuXHR9XG5cblx0Ly8gVmFsaWRhdGUgXCJwYXJhbWV0ZXJzXCIgcHJvcGVydHlcblx0bGV0IHBhcmFtZXRlcnM7XG5cdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGRlZiwgJ3BhcmFtZXRlcnMnKSkge1xuXHRcdHBhcmFtZXRlcnMgPSBkZWYucGFyYW1ldGVycztcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkocGFyYW1ldGVycykgfHwgIShwYXJhbWV0ZXJzID0gWy4uLnBhcmFtZXRlcnNdKS5ldmVyeSh4ID0+IHR5cGVvZiB4ID09PSAnc3RyaW5nJykpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYFZpcnR1YWwgdGFibGUgbW9kdWxlIFwiJHttb2R1bGVOYW1lfVwiICR7dmVyYn0gYSB0YWJsZSBkZWZpbml0aW9uIHdpdGggYW4gaW52YWxpZCBcInBhcmFtZXRlcnNcIiBwcm9wZXJ0eSAoc2hvdWxkIGJlIGFuIGFycmF5IG9mIHN0cmluZ3MpYCk7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHBhcmFtZXRlcnMgPSBpbmZlclBhcmFtZXRlcnMocm93cyk7XG5cdH1cblx0aWYgKHBhcmFtZXRlcnMubGVuZ3RoICE9PSBuZXcgU2V0KHBhcmFtZXRlcnMpLnNpemUpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBWaXJ0dWFsIHRhYmxlIG1vZHVsZSBcIiR7bW9kdWxlTmFtZX1cIiAke3ZlcmJ9IGEgdGFibGUgZGVmaW5pdGlvbiB3aXRoIGR1cGxpY2F0ZSBwYXJhbWV0ZXIgbmFtZXNgKTtcblx0fVxuXHRpZiAocGFyYW1ldGVycy5sZW5ndGggPiAzMikge1xuXHRcdHRocm93IG5ldyBSYW5nZUVycm9yKGBWaXJ0dWFsIHRhYmxlIG1vZHVsZSBcIiR7bW9kdWxlTmFtZX1cIiAke3ZlcmJ9IGEgdGFibGUgZGVmaW5pdGlvbiB3aXRoIG1vcmUgdGhhbiB0aGUgbWF4aW11bSBudW1iZXIgb2YgMzIgcGFyYW1ldGVyc2ApO1xuXHR9XG5cdGZvciAoY29uc3QgcGFyYW1ldGVyIG9mIHBhcmFtZXRlcnMpIHtcblx0XHRpZiAoY29sdW1ucy5pbmNsdWRlcyhwYXJhbWV0ZXIpKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBWaXJ0dWFsIHRhYmxlIG1vZHVsZSBcIiR7bW9kdWxlTmFtZX1cIiAke3ZlcmJ9IGEgdGFibGUgZGVmaW5pdGlvbiB3aXRoIGNvbHVtbiBcIiR7cGFyYW1ldGVyfVwiIHdoaWNoIHdhcyBhbWJpZ3VvdXNseSBkZWZpbmVkIGFzIGJvdGggYSBjb2x1bW4gYW5kIHBhcmFtZXRlcmApO1xuXHRcdH1cblx0fVxuXG5cdC8vIFZhbGlkYXRlIFwic2FmZUludGVnZXJzXCIgb3B0aW9uXG5cdGxldCBzYWZlSW50ZWdlcnMgPSAyO1xuXHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChkZWYsICdzYWZlSW50ZWdlcnMnKSkge1xuXHRcdGNvbnN0IGJvb2wgPSBkZWYuc2FmZUludGVnZXJzO1xuXHRcdGlmICh0eXBlb2YgYm9vbCAhPT0gJ2Jvb2xlYW4nKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBWaXJ0dWFsIHRhYmxlIG1vZHVsZSBcIiR7bW9kdWxlTmFtZX1cIiAke3ZlcmJ9IGEgdGFibGUgZGVmaW5pdGlvbiB3aXRoIGFuIGludmFsaWQgXCJzYWZlSW50ZWdlcnNcIiBwcm9wZXJ0eSAoc2hvdWxkIGJlIGEgYm9vbGVhbilgKTtcblx0XHR9XG5cdFx0c2FmZUludGVnZXJzID0gK2Jvb2w7XG5cdH1cblxuXHQvLyBWYWxpZGF0ZSBcImRpcmVjdE9ubHlcIiBvcHRpb25cblx0bGV0IGRpcmVjdE9ubHkgPSBmYWxzZTtcblx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZGVmLCAnZGlyZWN0T25seScpKSB7XG5cdFx0ZGlyZWN0T25seSA9IGRlZi5kaXJlY3RPbmx5O1xuXHRcdGlmICh0eXBlb2YgZGlyZWN0T25seSAhPT0gJ2Jvb2xlYW4nKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBWaXJ0dWFsIHRhYmxlIG1vZHVsZSBcIiR7bW9kdWxlTmFtZX1cIiAke3ZlcmJ9IGEgdGFibGUgZGVmaW5pdGlvbiB3aXRoIGFuIGludmFsaWQgXCJkaXJlY3RPbmx5XCIgcHJvcGVydHkgKHNob3VsZCBiZSBhIGJvb2xlYW4pYCk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gR2VuZXJhdGUgU1FMIGZvciB0aGUgdmlydHVhbCB0YWJsZSBkZWZpbml0aW9uXG5cdGNvbnN0IGNvbHVtbkRlZmluaXRpb25zID0gW1xuXHRcdC4uLnBhcmFtZXRlcnMubWFwKGlkZW50aWZpZXIpLm1hcChzdHIgPT4gYCR7c3RyfSBISURERU5gKSxcblx0XHQuLi5jb2x1bW5zLm1hcChpZGVudGlmaWVyKSxcblx0XTtcblx0cmV0dXJuIFtcblx0XHRgQ1JFQVRFIFRBQkxFIHgoJHtjb2x1bW5EZWZpbml0aW9ucy5qb2luKCcsICcpfSk7YCxcblx0XHR3cmFwR2VuZXJhdG9yKHJvd3MsIG5ldyBNYXAoY29sdW1ucy5tYXAoKHgsIGkpID0+IFt4LCBwYXJhbWV0ZXJzLmxlbmd0aCArIGldKSksIG1vZHVsZU5hbWUpLFxuXHRcdHBhcmFtZXRlcnMsXG5cdFx0c2FmZUludGVnZXJzLFxuXHRcdGRpcmVjdE9ubHksXG5cdF07XG59XG5cbmZ1bmN0aW9uIHdyYXBHZW5lcmF0b3IoZ2VuZXJhdG9yLCBjb2x1bW5NYXAsIG1vZHVsZU5hbWUpIHtcblx0cmV0dXJuIGZ1bmN0aW9uKiB2aXJ0dWFsVGFibGUoLi4uYXJncykge1xuXHRcdC8qXG5cdFx0XHRXZSBtdXN0IGRlZmVuc2l2ZWx5IGNsb25lIGFueSBidWZmZXJzIGluIHRoZSBhcmd1bWVudHMsIGJlY2F1c2Vcblx0XHRcdG90aGVyd2lzZSB0aGUgZ2VuZXJhdG9yIGNvdWxkIG11dGF0ZSBvbmUgb2YgdGhlbSwgd2hpY2ggd291bGQgY2F1c2Vcblx0XHRcdHVzIHRvIHJldHVybiBpbmNvcnJlY3QgdmFsdWVzIGZvciBoaWRkZW4gY29sdW1ucywgcG90ZW50aWFsbHlcblx0XHRcdGNvcnJ1cHRpbmcgdGhlIGRhdGFiYXNlLlxuXHRcdCAqL1xuXHRcdGNvbnN0IG91dHB1dCA9IGFyZ3MubWFwKHggPT4gQnVmZmVyLmlzQnVmZmVyKHgpID8gQnVmZmVyLmZyb20oeCkgOiB4KTtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGNvbHVtbk1hcC5zaXplOyArK2kpIHtcblx0XHRcdG91dHB1dC5wdXNoKG51bGwpOyAvLyBGaWxsIHdpdGggbnVsbHMgdG8gcHJldmVudCBnYXBzIGluIGFycmF5ICh2OCBvcHRpbWl6YXRpb24pXG5cdFx0fVxuXHRcdGZvciAoY29uc3Qgcm93IG9mIGdlbmVyYXRvciguLi5hcmdzKSkge1xuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkocm93KSkge1xuXHRcdFx0XHRleHRyYWN0Um93QXJyYXkocm93LCBvdXRwdXQsIGNvbHVtbk1hcC5zaXplLCBtb2R1bGVOYW1lKTtcblx0XHRcdFx0eWllbGQgb3V0cHV0O1xuXHRcdFx0fSBlbHNlIGlmICh0eXBlb2Ygcm93ID09PSAnb2JqZWN0JyAmJiByb3cgIT09IG51bGwpIHtcblx0XHRcdFx0ZXh0cmFjdFJvd09iamVjdChyb3csIG91dHB1dCwgY29sdW1uTWFwLCBtb2R1bGVOYW1lKTtcblx0XHRcdFx0eWllbGQgb3V0cHV0O1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgVmlydHVhbCB0YWJsZSBtb2R1bGUgXCIke21vZHVsZU5hbWV9XCIgeWllbGRlZCBzb21ldGhpbmcgdGhhdCBpc24ndCBhIHZhbGlkIHJvdyBvYmplY3RgKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59XG5cbmZ1bmN0aW9uIGV4dHJhY3RSb3dBcnJheShyb3csIG91dHB1dCwgY29sdW1uQ291bnQsIG1vZHVsZU5hbWUpIHtcblx0aWYgKHJvdy5sZW5ndGggIT09IGNvbHVtbkNvdW50KSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgVmlydHVhbCB0YWJsZSBtb2R1bGUgXCIke21vZHVsZU5hbWV9XCIgeWllbGRlZCBhIHJvdyB3aXRoIGFuIGluY29ycmVjdCBudW1iZXIgb2YgY29sdW1uc2ApO1xuXHR9XG5cdGNvbnN0IG9mZnNldCA9IG91dHB1dC5sZW5ndGggLSBjb2x1bW5Db3VudDtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjb2x1bW5Db3VudDsgKytpKSB7XG5cdFx0b3V0cHV0W2kgKyBvZmZzZXRdID0gcm93W2ldO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGV4dHJhY3RSb3dPYmplY3Qocm93LCBvdXRwdXQsIGNvbHVtbk1hcCwgbW9kdWxlTmFtZSkge1xuXHRsZXQgY291bnQgPSAwO1xuXHRmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhyb3cpKSB7XG5cdFx0Y29uc3QgaW5kZXggPSBjb2x1bW5NYXAuZ2V0KGtleSk7XG5cdFx0aWYgKGluZGV4ID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYFZpcnR1YWwgdGFibGUgbW9kdWxlIFwiJHttb2R1bGVOYW1lfVwiIHlpZWxkZWQgYSByb3cgd2l0aCBhbiB1bmRlY2xhcmVkIGNvbHVtbiBcIiR7a2V5fVwiYCk7XG5cdFx0fVxuXHRcdG91dHB1dFtpbmRleF0gPSByb3dba2V5XTtcblx0XHRjb3VudCArPSAxO1xuXHR9XG5cdGlmIChjb3VudCAhPT0gY29sdW1uTWFwLnNpemUpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBWaXJ0dWFsIHRhYmxlIG1vZHVsZSBcIiR7bW9kdWxlTmFtZX1cIiB5aWVsZGVkIGEgcm93IHdpdGggbWlzc2luZyBjb2x1bW5zYCk7XG5cdH1cbn1cblxuZnVuY3Rpb24gaW5mZXJQYXJhbWV0ZXJzKHsgbGVuZ3RoIH0pIHtcblx0aWYgKCFOdW1iZXIuaXNJbnRlZ2VyKGxlbmd0aCkgfHwgbGVuZ3RoIDwgMCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGZ1bmN0aW9uLmxlbmd0aCB0byBiZSBhIHBvc2l0aXZlIGludGVnZXInKTtcblx0fVxuXHRjb25zdCBwYXJhbXMgPSBbXTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuXHRcdHBhcmFtcy5wdXNoKGAkJHtpICsgMX1gKTtcblx0fVxuXHRyZXR1cm4gcGFyYW1zO1xufVxuXG5jb25zdCB7IGhhc093blByb3BlcnR5IH0gPSBPYmplY3QucHJvdG90eXBlO1xuY29uc3QgeyBhcHBseSB9ID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuY29uc3QgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoZnVuY3Rpb24qKCl7fSk7XG5jb25zdCBpZGVudGlmaWVyID0gc3RyID0+IGBcIiR7c3RyLnJlcGxhY2UoL1wiL2csICdcIlwiJyl9XCJgO1xuY29uc3QgZGVmZXIgPSB4ID0+ICgpID0+IHg7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuY29uc3QgRGF0YWJhc2VJbnNwZWN0aW9uID0gZnVuY3Rpb24gRGF0YWJhc2UoKSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbnNwZWN0KGRlcHRoLCBvcHRzKSB7XG5cdHJldHVybiBPYmplY3QuYXNzaWduKG5ldyBEYXRhYmFzZUluc3BlY3Rpb24oKSwgdGhpcyk7XG59O1xuXG4iLCAiJ3VzZSBzdHJpY3QnO1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcbmNvbnN0IFNxbGl0ZUVycm9yID0gcmVxdWlyZSgnLi9zcWxpdGUtZXJyb3InKTtcblxubGV0IERFRkFVTFRfQURET047XG5cbmZ1bmN0aW9uIERhdGFiYXNlKGZpbGVuYW1lR2l2ZW4sIG9wdGlvbnMpIHtcblx0aWYgKG5ldy50YXJnZXQgPT0gbnVsbCkge1xuXHRcdHJldHVybiBuZXcgRGF0YWJhc2UoZmlsZW5hbWVHaXZlbiwgb3B0aW9ucyk7XG5cdH1cblxuXHQvLyBBcHBseSBkZWZhdWx0c1xuXHRsZXQgYnVmZmVyO1xuXHRpZiAoQnVmZmVyLmlzQnVmZmVyKGZpbGVuYW1lR2l2ZW4pKSB7XG5cdFx0YnVmZmVyID0gZmlsZW5hbWVHaXZlbjtcblx0XHRmaWxlbmFtZUdpdmVuID0gJzptZW1vcnk6Jztcblx0fVxuXHRpZiAoZmlsZW5hbWVHaXZlbiA9PSBudWxsKSBmaWxlbmFtZUdpdmVuID0gJyc7XG5cdGlmIChvcHRpb25zID09IG51bGwpIG9wdGlvbnMgPSB7fTtcblxuXHQvLyBWYWxpZGF0ZSBhcmd1bWVudHNcblx0aWYgKHR5cGVvZiBmaWxlbmFtZUdpdmVuICE9PSAnc3RyaW5nJykgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgZmlyc3QgYXJndW1lbnQgdG8gYmUgYSBzdHJpbmcnKTtcblx0aWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0JykgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgc2Vjb25kIGFyZ3VtZW50IHRvIGJlIGFuIG9wdGlvbnMgb2JqZWN0Jyk7XG5cdGlmICgncmVhZE9ubHknIGluIG9wdGlvbnMpIHRocm93IG5ldyBUeXBlRXJyb3IoJ01pc3NwZWxsZWQgb3B0aW9uIFwicmVhZE9ubHlcIiBzaG91bGQgYmUgXCJyZWFkb25seVwiJyk7XG5cdGlmICgnbWVtb3J5JyBpbiBvcHRpb25zKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdPcHRpb24gXCJtZW1vcnlcIiB3YXMgcmVtb3ZlZCBpbiB2Ny4wLjAgKHVzZSBcIjptZW1vcnk6XCIgZmlsZW5hbWUgaW5zdGVhZCknKTtcblxuXHQvLyBJbnRlcnByZXQgb3B0aW9uc1xuXHRjb25zdCBmaWxlbmFtZSA9IGZpbGVuYW1lR2l2ZW4udHJpbSgpO1xuXHRjb25zdCBhbm9ueW1vdXMgPSBmaWxlbmFtZSA9PT0gJycgfHwgZmlsZW5hbWUgPT09ICc6bWVtb3J5Oic7XG5cdGNvbnN0IHJlYWRvbmx5ID0gdXRpbC5nZXRCb29sZWFuT3B0aW9uKG9wdGlvbnMsICdyZWFkb25seScpO1xuXHRjb25zdCBmaWxlTXVzdEV4aXN0ID0gdXRpbC5nZXRCb29sZWFuT3B0aW9uKG9wdGlvbnMsICdmaWxlTXVzdEV4aXN0Jyk7XG5cdGNvbnN0IHRpbWVvdXQgPSAndGltZW91dCcgaW4gb3B0aW9ucyA/IG9wdGlvbnMudGltZW91dCA6IDUwMDA7XG5cdGNvbnN0IHZlcmJvc2UgPSAndmVyYm9zZScgaW4gb3B0aW9ucyA/IG9wdGlvbnMudmVyYm9zZSA6IG51bGw7XG5cdGNvbnN0IG5hdGl2ZUJpbmRpbmcgPSAnbmF0aXZlQmluZGluZycgaW4gb3B0aW9ucyA/IG9wdGlvbnMubmF0aXZlQmluZGluZyA6IG51bGw7XG5cblx0Ly8gVmFsaWRhdGUgaW50ZXJwcmV0ZWQgb3B0aW9uc1xuXHRpZiAocmVhZG9ubHkgJiYgYW5vbnltb3VzICYmICFidWZmZXIpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0luLW1lbW9yeS90ZW1wb3JhcnkgZGF0YWJhc2VzIGNhbm5vdCBiZSByZWFkb25seScpO1xuXHRpZiAoIU51bWJlci5pc0ludGVnZXIodGltZW91dCkgfHwgdGltZW91dCA8IDApIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIHRoZSBcInRpbWVvdXRcIiBvcHRpb24gdG8gYmUgYSBwb3NpdGl2ZSBpbnRlZ2VyJyk7XG5cdGlmICh0aW1lb3V0ID4gMHg3ZmZmZmZmZikgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ09wdGlvbiBcInRpbWVvdXRcIiBjYW5ub3QgYmUgZ3JlYXRlciB0aGFuIDIxNDc0ODM2NDcnKTtcblx0aWYgKHZlcmJvc2UgIT0gbnVsbCAmJiB0eXBlb2YgdmVyYm9zZSAhPT0gJ2Z1bmN0aW9uJykgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgdGhlIFwidmVyYm9zZVwiIG9wdGlvbiB0byBiZSBhIGZ1bmN0aW9uJyk7XG5cdGlmIChuYXRpdmVCaW5kaW5nICE9IG51bGwgJiYgdHlwZW9mIG5hdGl2ZUJpbmRpbmcgIT09ICdzdHJpbmcnICYmIHR5cGVvZiBuYXRpdmVCaW5kaW5nICE9PSAnb2JqZWN0JykgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgdGhlIFwibmF0aXZlQmluZGluZ1wiIG9wdGlvbiB0byBiZSBhIHN0cmluZyBvciBhZGRvbiBvYmplY3QnKTtcblxuXHQvLyBMb2FkIHRoZSBuYXRpdmUgYWRkb25cblx0bGV0IGFkZG9uO1xuXHRpZiAobmF0aXZlQmluZGluZyA9PSBudWxsKSB7XG5cdFx0YWRkb24gPSBERUZBVUxUX0FERE9OIHx8IChERUZBVUxUX0FERE9OID0gcmVxdWlyZSgnYmluZGluZ3MnKSgnYmV0dGVyX3NxbGl0ZTMubm9kZScpKTtcblx0fSBlbHNlIGlmICh0eXBlb2YgbmF0aXZlQmluZGluZyA9PT0gJ3N0cmluZycpIHtcblx0XHQvLyBTZWUgPGh0dHBzOi8vd2VicGFjay5qcy5vcmcvYXBpL21vZHVsZS12YXJpYWJsZXMvI19fbm9uX3dlYnBhY2tfcmVxdWlyZV9fLXdlYnBhY2stc3BlY2lmaWM+XG5cdFx0Y29uc3QgcmVxdWlyZUZ1bmMgPSB0eXBlb2YgX19ub25fd2VicGFja19yZXF1aXJlX18gPT09ICdmdW5jdGlvbicgPyBfX25vbl93ZWJwYWNrX3JlcXVpcmVfXyA6IHJlcXVpcmU7XG5cdFx0YWRkb24gPSByZXF1aXJlRnVuYyhwYXRoLnJlc29sdmUobmF0aXZlQmluZGluZykucmVwbGFjZSgvKFxcLm5vZGUpPyQvLCAnLm5vZGUnKSk7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gU2VlIDxodHRwczovL2dpdGh1Yi5jb20vV2lzZUxpYnMvYmV0dGVyLXNxbGl0ZTMvaXNzdWVzLzk3Mj5cblx0XHRhZGRvbiA9IG5hdGl2ZUJpbmRpbmc7XG5cdH1cblxuXHRpZiAoIWFkZG9uLmlzSW5pdGlhbGl6ZWQpIHtcblx0XHRhZGRvbi5zZXRFcnJvckNvbnN0cnVjdG9yKFNxbGl0ZUVycm9yKTtcblx0XHRhZGRvbi5pc0luaXRpYWxpemVkID0gdHJ1ZTtcblx0fVxuXG5cdC8vIE1ha2Ugc3VyZSB0aGUgc3BlY2lmaWVkIGRpcmVjdG9yeSBleGlzdHNcblx0aWYgKCFhbm9ueW1vdXMgJiYgIWZpbGVuYW1lLnN0YXJ0c1dpdGgoJ2ZpbGU6JykgJiYgIWZzLmV4aXN0c1N5bmMocGF0aC5kaXJuYW1lKGZpbGVuYW1lKSkpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3Qgb3BlbiBkYXRhYmFzZSBiZWNhdXNlIHRoZSBkaXJlY3RvcnkgZG9lcyBub3QgZXhpc3QnKTtcblx0fVxuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcblx0XHRbdXRpbC5jcHBkYl06IHsgdmFsdWU6IG5ldyBhZGRvbi5EYXRhYmFzZShmaWxlbmFtZSwgZmlsZW5hbWVHaXZlbiwgYW5vbnltb3VzLCByZWFkb25seSwgZmlsZU11c3RFeGlzdCwgdGltZW91dCwgdmVyYm9zZSB8fCBudWxsLCBidWZmZXIgfHwgbnVsbCkgfSxcblx0XHQuLi53cmFwcGVycy5nZXR0ZXJzLFxuXHR9KTtcbn1cblxuY29uc3Qgd3JhcHBlcnMgPSByZXF1aXJlKCcuL21ldGhvZHMvd3JhcHBlcnMnKTtcbkRhdGFiYXNlLnByb3RvdHlwZS5wcmVwYXJlID0gd3JhcHBlcnMucHJlcGFyZTtcbkRhdGFiYXNlLnByb3RvdHlwZS50cmFuc2FjdGlvbiA9IHJlcXVpcmUoJy4vbWV0aG9kcy90cmFuc2FjdGlvbicpO1xuRGF0YWJhc2UucHJvdG90eXBlLnByYWdtYSA9IHJlcXVpcmUoJy4vbWV0aG9kcy9wcmFnbWEnKTtcbkRhdGFiYXNlLnByb3RvdHlwZS5iYWNrdXAgPSByZXF1aXJlKCcuL21ldGhvZHMvYmFja3VwJyk7XG5EYXRhYmFzZS5wcm90b3R5cGUuc2VyaWFsaXplID0gcmVxdWlyZSgnLi9tZXRob2RzL3NlcmlhbGl6ZScpO1xuRGF0YWJhc2UucHJvdG90eXBlLmZ1bmN0aW9uID0gcmVxdWlyZSgnLi9tZXRob2RzL2Z1bmN0aW9uJyk7XG5EYXRhYmFzZS5wcm90b3R5cGUuYWdncmVnYXRlID0gcmVxdWlyZSgnLi9tZXRob2RzL2FnZ3JlZ2F0ZScpO1xuRGF0YWJhc2UucHJvdG90eXBlLnRhYmxlID0gcmVxdWlyZSgnLi9tZXRob2RzL3RhYmxlJyk7XG5EYXRhYmFzZS5wcm90b3R5cGUubG9hZEV4dGVuc2lvbiA9IHdyYXBwZXJzLmxvYWRFeHRlbnNpb247XG5EYXRhYmFzZS5wcm90b3R5cGUuZXhlYyA9IHdyYXBwZXJzLmV4ZWM7XG5EYXRhYmFzZS5wcm90b3R5cGUuY2xvc2UgPSB3cmFwcGVycy5jbG9zZTtcbkRhdGFiYXNlLnByb3RvdHlwZS5kZWZhdWx0U2FmZUludGVnZXJzID0gd3JhcHBlcnMuZGVmYXVsdFNhZmVJbnRlZ2VycztcbkRhdGFiYXNlLnByb3RvdHlwZS51bnNhZmVNb2RlID0gd3JhcHBlcnMudW5zYWZlTW9kZTtcbkRhdGFiYXNlLnByb3RvdHlwZVt1dGlsLmluc3BlY3RdID0gcmVxdWlyZSgnLi9tZXRob2RzL2luc3BlY3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBEYXRhYmFzZTtcbiIsICIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGF0YWJhc2UnKTtcbm1vZHVsZS5leHBvcnRzLlNxbGl0ZUVycm9yID0gcmVxdWlyZSgnLi9zcWxpdGUtZXJyb3InKTtcbiIsICJ2YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGtpbmRPZih2YWwpIHtcbiAgaWYgKHZhbCA9PT0gdm9pZCAwKSByZXR1cm4gJ3VuZGVmaW5lZCc7XG4gIGlmICh2YWwgPT09IG51bGwpIHJldHVybiAnbnVsbCc7XG5cbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsO1xuICBpZiAodHlwZSA9PT0gJ2Jvb2xlYW4nKSByZXR1cm4gJ2Jvb2xlYW4nO1xuICBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHJldHVybiAnc3RyaW5nJztcbiAgaWYgKHR5cGUgPT09ICdudW1iZXInKSByZXR1cm4gJ251bWJlcic7XG4gIGlmICh0eXBlID09PSAnc3ltYm9sJykgcmV0dXJuICdzeW1ib2wnO1xuICBpZiAodHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBpc0dlbmVyYXRvckZuKHZhbCkgPyAnZ2VuZXJhdG9yZnVuY3Rpb24nIDogJ2Z1bmN0aW9uJztcbiAgfVxuXG4gIGlmIChpc0FycmF5KHZhbCkpIHJldHVybiAnYXJyYXknO1xuICBpZiAoaXNCdWZmZXIodmFsKSkgcmV0dXJuICdidWZmZXInO1xuICBpZiAoaXNBcmd1bWVudHModmFsKSkgcmV0dXJuICdhcmd1bWVudHMnO1xuICBpZiAoaXNEYXRlKHZhbCkpIHJldHVybiAnZGF0ZSc7XG4gIGlmIChpc0Vycm9yKHZhbCkpIHJldHVybiAnZXJyb3InO1xuICBpZiAoaXNSZWdleHAodmFsKSkgcmV0dXJuICdyZWdleHAnO1xuXG4gIHN3aXRjaCAoY3Rvck5hbWUodmFsKSkge1xuICAgIGNhc2UgJ1N5bWJvbCc6IHJldHVybiAnc3ltYm9sJztcbiAgICBjYXNlICdQcm9taXNlJzogcmV0dXJuICdwcm9taXNlJztcblxuICAgIC8vIFNldCwgTWFwLCBXZWFrU2V0LCBXZWFrTWFwXG4gICAgY2FzZSAnV2Vha01hcCc6IHJldHVybiAnd2Vha21hcCc7XG4gICAgY2FzZSAnV2Vha1NldCc6IHJldHVybiAnd2Vha3NldCc7XG4gICAgY2FzZSAnTWFwJzogcmV0dXJuICdtYXAnO1xuICAgIGNhc2UgJ1NldCc6IHJldHVybiAnc2V0JztcblxuICAgIC8vIDgtYml0IHR5cGVkIGFycmF5c1xuICAgIGNhc2UgJ0ludDhBcnJheSc6IHJldHVybiAnaW50OGFycmF5JztcbiAgICBjYXNlICdVaW50OEFycmF5JzogcmV0dXJuICd1aW50OGFycmF5JztcbiAgICBjYXNlICdVaW50OENsYW1wZWRBcnJheSc6IHJldHVybiAndWludDhjbGFtcGVkYXJyYXknO1xuXG4gICAgLy8gMTYtYml0IHR5cGVkIGFycmF5c1xuICAgIGNhc2UgJ0ludDE2QXJyYXknOiByZXR1cm4gJ2ludDE2YXJyYXknO1xuICAgIGNhc2UgJ1VpbnQxNkFycmF5JzogcmV0dXJuICd1aW50MTZhcnJheSc7XG5cbiAgICAvLyAzMi1iaXQgdHlwZWQgYXJyYXlzXG4gICAgY2FzZSAnSW50MzJBcnJheSc6IHJldHVybiAnaW50MzJhcnJheSc7XG4gICAgY2FzZSAnVWludDMyQXJyYXknOiByZXR1cm4gJ3VpbnQzMmFycmF5JztcbiAgICBjYXNlICdGbG9hdDMyQXJyYXknOiByZXR1cm4gJ2Zsb2F0MzJhcnJheSc7XG4gICAgY2FzZSAnRmxvYXQ2NEFycmF5JzogcmV0dXJuICdmbG9hdDY0YXJyYXknO1xuICB9XG5cbiAgaWYgKGlzR2VuZXJhdG9yT2JqKHZhbCkpIHtcbiAgICByZXR1cm4gJ2dlbmVyYXRvcic7XG4gIH1cblxuICAvLyBOb24tcGxhaW4gb2JqZWN0c1xuICB0eXBlID0gdG9TdHJpbmcuY2FsbCh2YWwpO1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICdbb2JqZWN0IE9iamVjdF0nOiByZXR1cm4gJ29iamVjdCc7XG4gICAgLy8gaXRlcmF0b3JzXG4gICAgY2FzZSAnW29iamVjdCBNYXAgSXRlcmF0b3JdJzogcmV0dXJuICdtYXBpdGVyYXRvcic7XG4gICAgY2FzZSAnW29iamVjdCBTZXQgSXRlcmF0b3JdJzogcmV0dXJuICdzZXRpdGVyYXRvcic7XG4gICAgY2FzZSAnW29iamVjdCBTdHJpbmcgSXRlcmF0b3JdJzogcmV0dXJuICdzdHJpbmdpdGVyYXRvcic7XG4gICAgY2FzZSAnW29iamVjdCBBcnJheSBJdGVyYXRvcl0nOiByZXR1cm4gJ2FycmF5aXRlcmF0b3InO1xuICB9XG5cbiAgLy8gb3RoZXJcbiAgcmV0dXJuIHR5cGUuc2xpY2UoOCwgLTEpLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzL2csICcnKTtcbn07XG5cbmZ1bmN0aW9uIGN0b3JOYW1lKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbC5jb25zdHJ1Y3RvciA9PT0gJ2Z1bmN0aW9uJyA/IHZhbC5jb25zdHJ1Y3Rvci5uYW1lIDogbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNBcnJheSh2YWwpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkpIHJldHVybiBBcnJheS5pc0FycmF5KHZhbCk7XG4gIHJldHVybiB2YWwgaW5zdGFuY2VvZiBBcnJheTtcbn1cblxuZnVuY3Rpb24gaXNFcnJvcih2YWwpIHtcbiAgcmV0dXJuIHZhbCBpbnN0YW5jZW9mIEVycm9yIHx8ICh0eXBlb2YgdmFsLm1lc3NhZ2UgPT09ICdzdHJpbmcnICYmIHZhbC5jb25zdHJ1Y3RvciAmJiB0eXBlb2YgdmFsLmNvbnN0cnVjdG9yLnN0YWNrVHJhY2VMaW1pdCA9PT0gJ251bWJlcicpO1xufVxuXG5mdW5jdGlvbiBpc0RhdGUodmFsKSB7XG4gIGlmICh2YWwgaW5zdGFuY2VvZiBEYXRlKSByZXR1cm4gdHJ1ZTtcbiAgcmV0dXJuIHR5cGVvZiB2YWwudG9EYXRlU3RyaW5nID09PSAnZnVuY3Rpb24nXG4gICAgJiYgdHlwZW9mIHZhbC5nZXREYXRlID09PSAnZnVuY3Rpb24nXG4gICAgJiYgdHlwZW9mIHZhbC5zZXREYXRlID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBpc1JlZ2V4cCh2YWwpIHtcbiAgaWYgKHZhbCBpbnN0YW5jZW9mIFJlZ0V4cCkgcmV0dXJuIHRydWU7XG4gIHJldHVybiB0eXBlb2YgdmFsLmZsYWdzID09PSAnc3RyaW5nJ1xuICAgICYmIHR5cGVvZiB2YWwuaWdub3JlQ2FzZSA9PT0gJ2Jvb2xlYW4nXG4gICAgJiYgdHlwZW9mIHZhbC5tdWx0aWxpbmUgPT09ICdib29sZWFuJ1xuICAgICYmIHR5cGVvZiB2YWwuZ2xvYmFsID09PSAnYm9vbGVhbic7XG59XG5cbmZ1bmN0aW9uIGlzR2VuZXJhdG9yRm4obmFtZSwgdmFsKSB7XG4gIHJldHVybiBjdG9yTmFtZShuYW1lKSA9PT0gJ0dlbmVyYXRvckZ1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaXNHZW5lcmF0b3JPYmoodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsLnRocm93ID09PSAnZnVuY3Rpb24nXG4gICAgJiYgdHlwZW9mIHZhbC5yZXR1cm4gPT09ICdmdW5jdGlvbidcbiAgICAmJiB0eXBlb2YgdmFsLm5leHQgPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzQXJndW1lbnRzKHZhbCkge1xuICB0cnkge1xuICAgIGlmICh0eXBlb2YgdmFsLmxlbmd0aCA9PT0gJ251bWJlcicgJiYgdHlwZW9mIHZhbC5jYWxsZWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgaWYgKGVyci5tZXNzYWdlLmluZGV4T2YoJ2NhbGxlZScpICE9PSAtMSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBJZiB5b3UgbmVlZCB0byBzdXBwb3J0IFNhZmFyaSA1LTcgKDgtMTAgeXItb2xkIGJyb3dzZXIpLFxuICogdGFrZSBhIGxvb2sgYXQgaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9pcy1idWZmZXJcbiAqL1xuXG5mdW5jdGlvbiBpc0J1ZmZlcih2YWwpIHtcbiAgaWYgKHZhbC5jb25zdHJ1Y3RvciAmJiB0eXBlb2YgdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcih2YWwpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbiIsICIvKiFcbiAqIGlzLWV4dGVuZGFibGUgPGh0dHBzOi8vZ2l0aHViLmNvbS9qb25zY2hsaW5rZXJ0L2lzLWV4dGVuZGFibGU+XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE1LCBKb24gU2NobGlua2VydC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNFeHRlbmRhYmxlKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsICE9PSBudWxsXG4gICAgJiYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnIHx8IHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJ2lzLWV4dGVuZGFibGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBleHRlbmQoby8qLCBvYmplY3RzKi8pIHtcbiAgaWYgKCFpc09iamVjdChvKSkgeyBvID0ge307IH1cblxuICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBsZW47IGkrKykge1xuICAgIHZhciBvYmogPSBhcmd1bWVudHNbaV07XG5cbiAgICBpZiAoaXNPYmplY3Qob2JqKSkge1xuICAgICAgYXNzaWduKG8sIG9iaik7XG4gICAgfVxuICB9XG4gIHJldHVybiBvO1xufTtcblxuZnVuY3Rpb24gYXNzaWduKGEsIGIpIHtcbiAgZm9yICh2YXIga2V5IGluIGIpIHtcbiAgICBpZiAoaGFzT3duKGIsIGtleSkpIHtcbiAgICAgIGFba2V5XSA9IGJba2V5XTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIGBrZXlgIGlzIGFuIG93biBwcm9wZXJ0eSBvZiBgb2JqYC5cbiAqL1xuXG5mdW5jdGlvbiBoYXNPd24ob2JqLCBrZXkpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSk7XG59XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdHlwZU9mID0gcmVxdWlyZSgna2luZC1vZicpO1xudmFyIGV4dGVuZCA9IHJlcXVpcmUoJ2V4dGVuZC1zaGFsbG93Jyk7XG5cbi8qKlxuICogUGFyc2Ugc2VjdGlvbnMgaW4gYGlucHV0YCB3aXRoIHRoZSBnaXZlbiBgb3B0aW9uc2AuXG4gKlxuICogYGBganNcbiAqIHZhciBzZWN0aW9ucyA9IHJlcXVpcmUoJ3slPSBuYW1lICV9Jyk7XG4gKiB2YXIgcmVzdWx0ID0gc2VjdGlvbnMoaW5wdXQsIG9wdGlvbnMpO1xuICogLy8geyBjb250ZW50OiAnQ29udGVudCBiZWZvcmUgc2VjdGlvbnMnLCBzZWN0aW9uczogW10gfVxuICogYGBgXG4gKiBAcGFyYW0ge1N0cmluZ3xCdWZmZXJ8T2JqZWN0fSBgaW5wdXRgIElmIGlucHV0IGlzIGFuIG9iamVjdCwgaXQncyBgY29udGVudGAgcHJvcGVydHkgbXVzdCBiZSBhIHN0cmluZyBvciBidWZmZXIuXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHJldHVybiB7T2JqZWN0fSBSZXR1cm5zIGFuIG9iamVjdCB3aXRoIGEgYGNvbnRlbnRgIHN0cmluZyBhbmQgYW4gYXJyYXkgb2YgYHNlY3Rpb25zYCBvYmplY3RzLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGlucHV0LCBvcHRpb25zKSB7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIG9wdGlvbnMgPSB7IHBhcnNlOiBvcHRpb25zIH07XG4gIH1cblxuICB2YXIgZmlsZSA9IHRvT2JqZWN0KGlucHV0KTtcbiAgdmFyIGRlZmF1bHRzID0ge3NlY3Rpb25fZGVsaW1pdGVyOiAnLS0tJywgcGFyc2U6IGlkZW50aXR5fTtcbiAgdmFyIG9wdHMgPSBleHRlbmQoe30sIGRlZmF1bHRzLCBvcHRpb25zKTtcbiAgdmFyIGRlbGltID0gb3B0cy5zZWN0aW9uX2RlbGltaXRlcjtcbiAgdmFyIGxpbmVzID0gZmlsZS5jb250ZW50LnNwbGl0KC9cXHI/XFxuLyk7XG4gIHZhciBzZWN0aW9ucyA9IG51bGw7XG4gIHZhciBzZWN0aW9uID0gY3JlYXRlU2VjdGlvbigpO1xuICB2YXIgY29udGVudCA9IFtdO1xuICB2YXIgc3RhY2sgPSBbXTtcblxuICBmdW5jdGlvbiBpbml0U2VjdGlvbnModmFsKSB7XG4gICAgZmlsZS5jb250ZW50ID0gdmFsO1xuICAgIHNlY3Rpb25zID0gW107XG4gICAgY29udGVudCA9IFtdO1xuICB9XG5cbiAgZnVuY3Rpb24gY2xvc2VTZWN0aW9uKHZhbCkge1xuICAgIGlmIChzdGFjay5sZW5ndGgpIHtcbiAgICAgIHNlY3Rpb24ua2V5ID0gZ2V0S2V5KHN0YWNrWzBdLCBkZWxpbSk7XG4gICAgICBzZWN0aW9uLmNvbnRlbnQgPSB2YWw7XG4gICAgICBvcHRzLnBhcnNlKHNlY3Rpb24sIHNlY3Rpb25zKTtcbiAgICAgIHNlY3Rpb25zLnB1c2goc2VjdGlvbik7XG4gICAgICBzZWN0aW9uID0gY3JlYXRlU2VjdGlvbigpO1xuICAgICAgY29udGVudCA9IFtdO1xuICAgICAgc3RhY2sgPSBbXTtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGxpbmUgPSBsaW5lc1tpXTtcbiAgICB2YXIgbGVuID0gc3RhY2subGVuZ3RoO1xuICAgIHZhciBsbiA9IGxpbmUudHJpbSgpO1xuXG4gICAgaWYgKGlzRGVsaW1pdGVyKGxuLCBkZWxpbSkpIHtcbiAgICAgIGlmIChsbi5sZW5ndGggPT09IDMgJiYgaSAhPT0gMCkge1xuICAgICAgICBpZiAobGVuID09PSAwIHx8IGxlbiA9PT0gMikge1xuICAgICAgICAgIGNvbnRlbnQucHVzaChsaW5lKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBzdGFjay5wdXNoKGxuKTtcbiAgICAgICAgc2VjdGlvbi5kYXRhID0gY29udGVudC5qb2luKCdcXG4nKTtcbiAgICAgICAgY29udGVudCA9IFtdO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNlY3Rpb25zID09PSBudWxsKSB7XG4gICAgICAgIGluaXRTZWN0aW9ucyhjb250ZW50LmpvaW4oJ1xcbicpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGxlbiA9PT0gMikge1xuICAgICAgICBjbG9zZVNlY3Rpb24oY29udGVudC5qb2luKCdcXG4nKSk7XG4gICAgICB9XG5cbiAgICAgIHN0YWNrLnB1c2gobG4pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgY29udGVudC5wdXNoKGxpbmUpO1xuICB9XG5cbiAgaWYgKHNlY3Rpb25zID09PSBudWxsKSB7XG4gICAgaW5pdFNlY3Rpb25zKGNvbnRlbnQuam9pbignXFxuJykpO1xuICB9IGVsc2Uge1xuICAgIGNsb3NlU2VjdGlvbihjb250ZW50LmpvaW4oJ1xcbicpKTtcbiAgfVxuXG4gIGZpbGUuc2VjdGlvbnMgPSBzZWN0aW9ucztcbiAgcmV0dXJuIGZpbGU7XG59O1xuXG5mdW5jdGlvbiBpc0RlbGltaXRlcihsaW5lLCBkZWxpbSkge1xuICBpZiAobGluZS5zbGljZSgwLCBkZWxpbS5sZW5ndGgpICE9PSBkZWxpbSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAobGluZS5jaGFyQXQoZGVsaW0ubGVuZ3RoICsgMSkgPT09IGRlbGltLnNsaWNlKC0xKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gdG9PYmplY3QoaW5wdXQpIHtcbiAgaWYgKHR5cGVPZihpbnB1dCkgIT09ICdvYmplY3QnKSB7XG4gICAgaW5wdXQgPSB7IGNvbnRlbnQ6IGlucHV0IH07XG4gIH1cblxuICBpZiAodHlwZW9mIGlucHV0LmNvbnRlbnQgIT09ICdzdHJpbmcnICYmICFpc0J1ZmZlcihpbnB1dC5jb250ZW50KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4cGVjdGVkIGEgYnVmZmVyIG9yIHN0cmluZycpO1xuICB9XG5cbiAgaW5wdXQuY29udGVudCA9IGlucHV0LmNvbnRlbnQudG9TdHJpbmcoKTtcbiAgaW5wdXQuc2VjdGlvbnMgPSBbXTtcbiAgcmV0dXJuIGlucHV0O1xufVxuXG5mdW5jdGlvbiBnZXRLZXkodmFsLCBkZWxpbSkge1xuICByZXR1cm4gdmFsID8gdmFsLnNsaWNlKGRlbGltLmxlbmd0aCkudHJpbSgpIDogJyc7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNlY3Rpb24oKSB7XG4gIHJldHVybiB7IGtleTogJycsIGRhdGE6ICcnLCBjb250ZW50OiAnJyB9O1xufVxuXG5mdW5jdGlvbiBpZGVudGl0eSh2YWwpIHtcbiAgcmV0dXJuIHZhbDtcbn1cblxuZnVuY3Rpb24gaXNCdWZmZXIodmFsKSB7XG4gIGlmICh2YWwgJiYgdmFsLmNvbnN0cnVjdG9yICYmIHR5cGVvZiB2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyKHZhbCk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuIiwgIid1c2Ugc3RyaWN0JztcblxuXG5mdW5jdGlvbiBpc05vdGhpbmcoc3ViamVjdCkge1xuICByZXR1cm4gKHR5cGVvZiBzdWJqZWN0ID09PSAndW5kZWZpbmVkJykgfHwgKHN1YmplY3QgPT09IG51bGwpO1xufVxuXG5cbmZ1bmN0aW9uIGlzT2JqZWN0KHN1YmplY3QpIHtcbiAgcmV0dXJuICh0eXBlb2Ygc3ViamVjdCA9PT0gJ29iamVjdCcpICYmIChzdWJqZWN0ICE9PSBudWxsKTtcbn1cblxuXG5mdW5jdGlvbiB0b0FycmF5KHNlcXVlbmNlKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHNlcXVlbmNlKSkgcmV0dXJuIHNlcXVlbmNlO1xuICBlbHNlIGlmIChpc05vdGhpbmcoc2VxdWVuY2UpKSByZXR1cm4gW107XG5cbiAgcmV0dXJuIFsgc2VxdWVuY2UgXTtcbn1cblxuXG5mdW5jdGlvbiBleHRlbmQodGFyZ2V0LCBzb3VyY2UpIHtcbiAgdmFyIGluZGV4LCBsZW5ndGgsIGtleSwgc291cmNlS2V5cztcblxuICBpZiAoc291cmNlKSB7XG4gICAgc291cmNlS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG5cbiAgICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gc291cmNlS2V5cy5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgICBrZXkgPSBzb3VyY2VLZXlzW2luZGV4XTtcbiAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuXG5mdW5jdGlvbiByZXBlYXQoc3RyaW5nLCBjb3VudCkge1xuICB2YXIgcmVzdWx0ID0gJycsIGN5Y2xlO1xuXG4gIGZvciAoY3ljbGUgPSAwOyBjeWNsZSA8IGNvdW50OyBjeWNsZSArPSAxKSB7XG4gICAgcmVzdWx0ICs9IHN0cmluZztcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cblxuZnVuY3Rpb24gaXNOZWdhdGl2ZVplcm8obnVtYmVyKSB7XG4gIHJldHVybiAobnVtYmVyID09PSAwKSAmJiAoTnVtYmVyLk5FR0FUSVZFX0lORklOSVRZID09PSAxIC8gbnVtYmVyKTtcbn1cblxuXG5tb2R1bGUuZXhwb3J0cy5pc05vdGhpbmcgICAgICA9IGlzTm90aGluZztcbm1vZHVsZS5leHBvcnRzLmlzT2JqZWN0ICAgICAgID0gaXNPYmplY3Q7XG5tb2R1bGUuZXhwb3J0cy50b0FycmF5ICAgICAgICA9IHRvQXJyYXk7XG5tb2R1bGUuZXhwb3J0cy5yZXBlYXQgICAgICAgICA9IHJlcGVhdDtcbm1vZHVsZS5leHBvcnRzLmlzTmVnYXRpdmVaZXJvID0gaXNOZWdhdGl2ZVplcm87XG5tb2R1bGUuZXhwb3J0cy5leHRlbmQgICAgICAgICA9IGV4dGVuZDtcbiIsICIvLyBZQU1MIGVycm9yIGNsYXNzLiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzg0NTg5ODRcbi8vXG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIFlBTUxFeGNlcHRpb24ocmVhc29uLCBtYXJrKSB7XG4gIC8vIFN1cGVyIGNvbnN0cnVjdG9yXG4gIEVycm9yLmNhbGwodGhpcyk7XG5cbiAgdGhpcy5uYW1lID0gJ1lBTUxFeGNlcHRpb24nO1xuICB0aGlzLnJlYXNvbiA9IHJlYXNvbjtcbiAgdGhpcy5tYXJrID0gbWFyaztcbiAgdGhpcy5tZXNzYWdlID0gKHRoaXMucmVhc29uIHx8ICcodW5rbm93biByZWFzb24pJykgKyAodGhpcy5tYXJrID8gJyAnICsgdGhpcy5tYXJrLnRvU3RyaW5nKCkgOiAnJyk7XG5cbiAgLy8gSW5jbHVkZSBzdGFjayB0cmFjZSBpbiBlcnJvciBvYmplY3RcbiAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgLy8gQ2hyb21lIGFuZCBOb2RlSlNcbiAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBGRiwgSUUgMTArIGFuZCBTYWZhcmkgNisuIEZhbGxiYWNrIGZvciBvdGhlcnNcbiAgICB0aGlzLnN0YWNrID0gKG5ldyBFcnJvcigpKS5zdGFjayB8fCAnJztcbiAgfVxufVxuXG5cbi8vIEluaGVyaXQgZnJvbSBFcnJvclxuWUFNTEV4Y2VwdGlvbi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSk7XG5ZQU1MRXhjZXB0aW9uLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFlBTUxFeGNlcHRpb247XG5cblxuWUFNTEV4Y2VwdGlvbi5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyhjb21wYWN0KSB7XG4gIHZhciByZXN1bHQgPSB0aGlzLm5hbWUgKyAnOiAnO1xuXG4gIHJlc3VsdCArPSB0aGlzLnJlYXNvbiB8fCAnKHVua25vd24gcmVhc29uKSc7XG5cbiAgaWYgKCFjb21wYWN0ICYmIHRoaXMubWFyaykge1xuICAgIHJlc3VsdCArPSAnICcgKyB0aGlzLm1hcmsudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0gWUFNTEV4Y2VwdGlvbjtcbiIsICIndXNlIHN0cmljdCc7XG5cblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG5cblxuZnVuY3Rpb24gTWFyayhuYW1lLCBidWZmZXIsIHBvc2l0aW9uLCBsaW5lLCBjb2x1bW4pIHtcbiAgdGhpcy5uYW1lICAgICA9IG5hbWU7XG4gIHRoaXMuYnVmZmVyICAgPSBidWZmZXI7XG4gIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgdGhpcy5saW5lICAgICA9IGxpbmU7XG4gIHRoaXMuY29sdW1uICAgPSBjb2x1bW47XG59XG5cblxuTWFyay5wcm90b3R5cGUuZ2V0U25pcHBldCA9IGZ1bmN0aW9uIGdldFNuaXBwZXQoaW5kZW50LCBtYXhMZW5ndGgpIHtcbiAgdmFyIGhlYWQsIHN0YXJ0LCB0YWlsLCBlbmQsIHNuaXBwZXQ7XG5cbiAgaWYgKCF0aGlzLmJ1ZmZlcikgcmV0dXJuIG51bGw7XG5cbiAgaW5kZW50ID0gaW5kZW50IHx8IDQ7XG4gIG1heExlbmd0aCA9IG1heExlbmd0aCB8fCA3NTtcblxuICBoZWFkID0gJyc7XG4gIHN0YXJ0ID0gdGhpcy5wb3NpdGlvbjtcblxuICB3aGlsZSAoc3RhcnQgPiAwICYmICdcXHgwMFxcclxcblxceDg1XFx1MjAyOFxcdTIwMjknLmluZGV4T2YodGhpcy5idWZmZXIuY2hhckF0KHN0YXJ0IC0gMSkpID09PSAtMSkge1xuICAgIHN0YXJ0IC09IDE7XG4gICAgaWYgKHRoaXMucG9zaXRpb24gLSBzdGFydCA+IChtYXhMZW5ndGggLyAyIC0gMSkpIHtcbiAgICAgIGhlYWQgPSAnIC4uLiAnO1xuICAgICAgc3RhcnQgKz0gNTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHRhaWwgPSAnJztcbiAgZW5kID0gdGhpcy5wb3NpdGlvbjtcblxuICB3aGlsZSAoZW5kIDwgdGhpcy5idWZmZXIubGVuZ3RoICYmICdcXHgwMFxcclxcblxceDg1XFx1MjAyOFxcdTIwMjknLmluZGV4T2YodGhpcy5idWZmZXIuY2hhckF0KGVuZCkpID09PSAtMSkge1xuICAgIGVuZCArPSAxO1xuICAgIGlmIChlbmQgLSB0aGlzLnBvc2l0aW9uID4gKG1heExlbmd0aCAvIDIgLSAxKSkge1xuICAgICAgdGFpbCA9ICcgLi4uICc7XG4gICAgICBlbmQgLT0gNTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHNuaXBwZXQgPSB0aGlzLmJ1ZmZlci5zbGljZShzdGFydCwgZW5kKTtcblxuICByZXR1cm4gY29tbW9uLnJlcGVhdCgnICcsIGluZGVudCkgKyBoZWFkICsgc25pcHBldCArIHRhaWwgKyAnXFxuJyArXG4gICAgICAgICBjb21tb24ucmVwZWF0KCcgJywgaW5kZW50ICsgdGhpcy5wb3NpdGlvbiAtIHN0YXJ0ICsgaGVhZC5sZW5ndGgpICsgJ14nO1xufTtcblxuXG5NYXJrLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKGNvbXBhY3QpIHtcbiAgdmFyIHNuaXBwZXQsIHdoZXJlID0gJyc7XG5cbiAgaWYgKHRoaXMubmFtZSkge1xuICAgIHdoZXJlICs9ICdpbiBcIicgKyB0aGlzLm5hbWUgKyAnXCIgJztcbiAgfVxuXG4gIHdoZXJlICs9ICdhdCBsaW5lICcgKyAodGhpcy5saW5lICsgMSkgKyAnLCBjb2x1bW4gJyArICh0aGlzLmNvbHVtbiArIDEpO1xuXG4gIGlmICghY29tcGFjdCkge1xuICAgIHNuaXBwZXQgPSB0aGlzLmdldFNuaXBwZXQoKTtcblxuICAgIGlmIChzbmlwcGV0KSB7XG4gICAgICB3aGVyZSArPSAnOlxcbicgKyBzbmlwcGV0O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB3aGVyZTtcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBNYXJrO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIFlBTUxFeGNlcHRpb24gPSByZXF1aXJlKCcuL2V4Y2VwdGlvbicpO1xuXG52YXIgVFlQRV9DT05TVFJVQ1RPUl9PUFRJT05TID0gW1xuICAna2luZCcsXG4gICdyZXNvbHZlJyxcbiAgJ2NvbnN0cnVjdCcsXG4gICdpbnN0YW5jZU9mJyxcbiAgJ3ByZWRpY2F0ZScsXG4gICdyZXByZXNlbnQnLFxuICAnZGVmYXVsdFN0eWxlJyxcbiAgJ3N0eWxlQWxpYXNlcydcbl07XG5cbnZhciBZQU1MX05PREVfS0lORFMgPSBbXG4gICdzY2FsYXInLFxuICAnc2VxdWVuY2UnLFxuICAnbWFwcGluZydcbl07XG5cbmZ1bmN0aW9uIGNvbXBpbGVTdHlsZUFsaWFzZXMobWFwKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcblxuICBpZiAobWFwICE9PSBudWxsKSB7XG4gICAgT2JqZWN0LmtleXMobWFwKS5mb3JFYWNoKGZ1bmN0aW9uIChzdHlsZSkge1xuICAgICAgbWFwW3N0eWxlXS5mb3JFYWNoKGZ1bmN0aW9uIChhbGlhcykge1xuICAgICAgICByZXN1bHRbU3RyaW5nKGFsaWFzKV0gPSBzdHlsZTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gVHlwZSh0YWcsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgT2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgIGlmIChUWVBFX0NPTlNUUlVDVE9SX09QVElPTlMuaW5kZXhPZihuYW1lKSA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBZQU1MRXhjZXB0aW9uKCdVbmtub3duIG9wdGlvbiBcIicgKyBuYW1lICsgJ1wiIGlzIG1ldCBpbiBkZWZpbml0aW9uIG9mIFwiJyArIHRhZyArICdcIiBZQU1MIHR5cGUuJyk7XG4gICAgfVxuICB9KTtcblxuICAvLyBUT0RPOiBBZGQgdGFnIGZvcm1hdCBjaGVjay5cbiAgdGhpcy50YWcgICAgICAgICAgPSB0YWc7XG4gIHRoaXMua2luZCAgICAgICAgID0gb3B0aW9uc1sna2luZCddICAgICAgICAgfHwgbnVsbDtcbiAgdGhpcy5yZXNvbHZlICAgICAgPSBvcHRpb25zWydyZXNvbHZlJ10gICAgICB8fCBmdW5jdGlvbiAoKSB7IHJldHVybiB0cnVlOyB9O1xuICB0aGlzLmNvbnN0cnVjdCAgICA9IG9wdGlvbnNbJ2NvbnN0cnVjdCddICAgIHx8IGZ1bmN0aW9uIChkYXRhKSB7IHJldHVybiBkYXRhOyB9O1xuICB0aGlzLmluc3RhbmNlT2YgICA9IG9wdGlvbnNbJ2luc3RhbmNlT2YnXSAgIHx8IG51bGw7XG4gIHRoaXMucHJlZGljYXRlICAgID0gb3B0aW9uc1sncHJlZGljYXRlJ10gICAgfHwgbnVsbDtcbiAgdGhpcy5yZXByZXNlbnQgICAgPSBvcHRpb25zWydyZXByZXNlbnQnXSAgICB8fCBudWxsO1xuICB0aGlzLmRlZmF1bHRTdHlsZSA9IG9wdGlvbnNbJ2RlZmF1bHRTdHlsZSddIHx8IG51bGw7XG4gIHRoaXMuc3R5bGVBbGlhc2VzID0gY29tcGlsZVN0eWxlQWxpYXNlcyhvcHRpb25zWydzdHlsZUFsaWFzZXMnXSB8fCBudWxsKTtcblxuICBpZiAoWUFNTF9OT0RFX0tJTkRTLmluZGV4T2YodGhpcy5raW5kKSA9PT0gLTEpIHtcbiAgICB0aHJvdyBuZXcgWUFNTEV4Y2VwdGlvbignVW5rbm93biBraW5kIFwiJyArIHRoaXMua2luZCArICdcIiBpcyBzcGVjaWZpZWQgZm9yIFwiJyArIHRhZyArICdcIiBZQU1MIHR5cGUuJyk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUeXBlO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuLyplc2xpbnQtZGlzYWJsZSBtYXgtbGVuKi9cblxudmFyIGNvbW1vbiAgICAgICAgPSByZXF1aXJlKCcuL2NvbW1vbicpO1xudmFyIFlBTUxFeGNlcHRpb24gPSByZXF1aXJlKCcuL2V4Y2VwdGlvbicpO1xudmFyIFR5cGUgICAgICAgICAgPSByZXF1aXJlKCcuL3R5cGUnKTtcblxuXG5mdW5jdGlvbiBjb21waWxlTGlzdChzY2hlbWEsIG5hbWUsIHJlc3VsdCkge1xuICB2YXIgZXhjbHVkZSA9IFtdO1xuXG4gIHNjaGVtYS5pbmNsdWRlLmZvckVhY2goZnVuY3Rpb24gKGluY2x1ZGVkU2NoZW1hKSB7XG4gICAgcmVzdWx0ID0gY29tcGlsZUxpc3QoaW5jbHVkZWRTY2hlbWEsIG5hbWUsIHJlc3VsdCk7XG4gIH0pO1xuXG4gIHNjaGVtYVtuYW1lXS5mb3JFYWNoKGZ1bmN0aW9uIChjdXJyZW50VHlwZSkge1xuICAgIHJlc3VsdC5mb3JFYWNoKGZ1bmN0aW9uIChwcmV2aW91c1R5cGUsIHByZXZpb3VzSW5kZXgpIHtcbiAgICAgIGlmIChwcmV2aW91c1R5cGUudGFnID09PSBjdXJyZW50VHlwZS50YWcgJiYgcHJldmlvdXNUeXBlLmtpbmQgPT09IGN1cnJlbnRUeXBlLmtpbmQpIHtcbiAgICAgICAgZXhjbHVkZS5wdXNoKHByZXZpb3VzSW5kZXgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmVzdWx0LnB1c2goY3VycmVudFR5cGUpO1xuICB9KTtcblxuICByZXR1cm4gcmVzdWx0LmZpbHRlcihmdW5jdGlvbiAodHlwZSwgaW5kZXgpIHtcbiAgICByZXR1cm4gZXhjbHVkZS5pbmRleE9mKGluZGV4KSA9PT0gLTE7XG4gIH0pO1xufVxuXG5cbmZ1bmN0aW9uIGNvbXBpbGVNYXAoLyogbGlzdHMuLi4gKi8pIHtcbiAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgc2NhbGFyOiB7fSxcbiAgICAgICAgc2VxdWVuY2U6IHt9LFxuICAgICAgICBtYXBwaW5nOiB7fSxcbiAgICAgICAgZmFsbGJhY2s6IHt9XG4gICAgICB9LCBpbmRleCwgbGVuZ3RoO1xuXG4gIGZ1bmN0aW9uIGNvbGxlY3RUeXBlKHR5cGUpIHtcbiAgICByZXN1bHRbdHlwZS5raW5kXVt0eXBlLnRhZ10gPSByZXN1bHRbJ2ZhbGxiYWNrJ11bdHlwZS50YWddID0gdHlwZTtcbiAgfVxuXG4gIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgIGFyZ3VtZW50c1tpbmRleF0uZm9yRWFjaChjb2xsZWN0VHlwZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5mdW5jdGlvbiBTY2hlbWEoZGVmaW5pdGlvbikge1xuICB0aGlzLmluY2x1ZGUgID0gZGVmaW5pdGlvbi5pbmNsdWRlICB8fCBbXTtcbiAgdGhpcy5pbXBsaWNpdCA9IGRlZmluaXRpb24uaW1wbGljaXQgfHwgW107XG4gIHRoaXMuZXhwbGljaXQgPSBkZWZpbml0aW9uLmV4cGxpY2l0IHx8IFtdO1xuXG4gIHRoaXMuaW1wbGljaXQuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xuICAgIGlmICh0eXBlLmxvYWRLaW5kICYmIHR5cGUubG9hZEtpbmQgIT09ICdzY2FsYXInKSB7XG4gICAgICB0aHJvdyBuZXcgWUFNTEV4Y2VwdGlvbignVGhlcmUgaXMgYSBub24tc2NhbGFyIHR5cGUgaW4gdGhlIGltcGxpY2l0IGxpc3Qgb2YgYSBzY2hlbWEuIEltcGxpY2l0IHJlc29sdmluZyBvZiBzdWNoIHR5cGVzIGlzIG5vdCBzdXBwb3J0ZWQuJyk7XG4gICAgfVxuICB9KTtcblxuICB0aGlzLmNvbXBpbGVkSW1wbGljaXQgPSBjb21waWxlTGlzdCh0aGlzLCAnaW1wbGljaXQnLCBbXSk7XG4gIHRoaXMuY29tcGlsZWRFeHBsaWNpdCA9IGNvbXBpbGVMaXN0KHRoaXMsICdleHBsaWNpdCcsIFtdKTtcbiAgdGhpcy5jb21waWxlZFR5cGVNYXAgID0gY29tcGlsZU1hcCh0aGlzLmNvbXBpbGVkSW1wbGljaXQsIHRoaXMuY29tcGlsZWRFeHBsaWNpdCk7XG59XG5cblxuU2NoZW1hLkRFRkFVTFQgPSBudWxsO1xuXG5cblNjaGVtYS5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGVTY2hlbWEoKSB7XG4gIHZhciBzY2hlbWFzLCB0eXBlcztcblxuICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICBjYXNlIDE6XG4gICAgICBzY2hlbWFzID0gU2NoZW1hLkRFRkFVTFQ7XG4gICAgICB0eXBlcyA9IGFyZ3VtZW50c1swXTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAyOlxuICAgICAgc2NoZW1hcyA9IGFyZ3VtZW50c1swXTtcbiAgICAgIHR5cGVzID0gYXJndW1lbnRzWzFdO1xuICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IFlBTUxFeGNlcHRpb24oJ1dyb25nIG51bWJlciBvZiBhcmd1bWVudHMgZm9yIFNjaGVtYS5jcmVhdGUgZnVuY3Rpb24nKTtcbiAgfVxuXG4gIHNjaGVtYXMgPSBjb21tb24udG9BcnJheShzY2hlbWFzKTtcbiAgdHlwZXMgPSBjb21tb24udG9BcnJheSh0eXBlcyk7XG5cbiAgaWYgKCFzY2hlbWFzLmV2ZXJ5KGZ1bmN0aW9uIChzY2hlbWEpIHsgcmV0dXJuIHNjaGVtYSBpbnN0YW5jZW9mIFNjaGVtYTsgfSkpIHtcbiAgICB0aHJvdyBuZXcgWUFNTEV4Y2VwdGlvbignU3BlY2lmaWVkIGxpc3Qgb2Ygc3VwZXIgc2NoZW1hcyAob3IgYSBzaW5nbGUgU2NoZW1hIG9iamVjdCkgY29udGFpbnMgYSBub24tU2NoZW1hIG9iamVjdC4nKTtcbiAgfVxuXG4gIGlmICghdHlwZXMuZXZlcnkoZnVuY3Rpb24gKHR5cGUpIHsgcmV0dXJuIHR5cGUgaW5zdGFuY2VvZiBUeXBlOyB9KSkge1xuICAgIHRocm93IG5ldyBZQU1MRXhjZXB0aW9uKCdTcGVjaWZpZWQgbGlzdCBvZiBZQU1MIHR5cGVzIChvciBhIHNpbmdsZSBUeXBlIG9iamVjdCkgY29udGFpbnMgYSBub24tVHlwZSBvYmplY3QuJyk7XG4gIH1cblxuICByZXR1cm4gbmV3IFNjaGVtYSh7XG4gICAgaW5jbHVkZTogc2NoZW1hcyxcbiAgICBleHBsaWNpdDogdHlwZXNcbiAgfSk7XG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0gU2NoZW1hO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIFR5cGUgPSByZXF1aXJlKCcuLi90eXBlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFR5cGUoJ3RhZzp5YW1sLm9yZywyMDAyOnN0cicsIHtcbiAga2luZDogJ3NjYWxhcicsXG4gIGNvbnN0cnVjdDogZnVuY3Rpb24gKGRhdGEpIHsgcmV0dXJuIGRhdGEgIT09IG51bGwgPyBkYXRhIDogJyc7IH1cbn0pO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIFR5cGUgPSByZXF1aXJlKCcuLi90eXBlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFR5cGUoJ3RhZzp5YW1sLm9yZywyMDAyOnNlcScsIHtcbiAga2luZDogJ3NlcXVlbmNlJyxcbiAgY29uc3RydWN0OiBmdW5jdGlvbiAoZGF0YSkgeyByZXR1cm4gZGF0YSAhPT0gbnVsbCA/IGRhdGEgOiBbXTsgfVxufSk7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgVHlwZSA9IHJlcXVpcmUoJy4uL3R5cGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgVHlwZSgndGFnOnlhbWwub3JnLDIwMDI6bWFwJywge1xuICBraW5kOiAnbWFwcGluZycsXG4gIGNvbnN0cnVjdDogZnVuY3Rpb24gKGRhdGEpIHsgcmV0dXJuIGRhdGEgIT09IG51bGwgPyBkYXRhIDoge307IH1cbn0pO1xuIiwgIi8vIFN0YW5kYXJkIFlBTUwncyBGYWlsc2FmZSBzY2hlbWEuXG4vLyBodHRwOi8vd3d3LnlhbWwub3JnL3NwZWMvMS4yL3NwZWMuaHRtbCNpZDI4MDIzNDZcblxuXG4ndXNlIHN0cmljdCc7XG5cblxudmFyIFNjaGVtYSA9IHJlcXVpcmUoJy4uL3NjaGVtYScpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFNjaGVtYSh7XG4gIGV4cGxpY2l0OiBbXG4gICAgcmVxdWlyZSgnLi4vdHlwZS9zdHInKSxcbiAgICByZXF1aXJlKCcuLi90eXBlL3NlcScpLFxuICAgIHJlcXVpcmUoJy4uL3R5cGUvbWFwJylcbiAgXVxufSk7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgVHlwZSA9IHJlcXVpcmUoJy4uL3R5cGUnKTtcblxuZnVuY3Rpb24gcmVzb2x2ZVlhbWxOdWxsKGRhdGEpIHtcbiAgaWYgKGRhdGEgPT09IG51bGwpIHJldHVybiB0cnVlO1xuXG4gIHZhciBtYXggPSBkYXRhLmxlbmd0aDtcblxuICByZXR1cm4gKG1heCA9PT0gMSAmJiBkYXRhID09PSAnficpIHx8XG4gICAgICAgICAobWF4ID09PSA0ICYmIChkYXRhID09PSAnbnVsbCcgfHwgZGF0YSA9PT0gJ051bGwnIHx8IGRhdGEgPT09ICdOVUxMJykpO1xufVxuXG5mdW5jdGlvbiBjb25zdHJ1Y3RZYW1sTnVsbCgpIHtcbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzTnVsbChvYmplY3QpIHtcbiAgcmV0dXJuIG9iamVjdCA9PT0gbnVsbDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgVHlwZSgndGFnOnlhbWwub3JnLDIwMDI6bnVsbCcsIHtcbiAga2luZDogJ3NjYWxhcicsXG4gIHJlc29sdmU6IHJlc29sdmVZYW1sTnVsbCxcbiAgY29uc3RydWN0OiBjb25zdHJ1Y3RZYW1sTnVsbCxcbiAgcHJlZGljYXRlOiBpc051bGwsXG4gIHJlcHJlc2VudDoge1xuICAgIGNhbm9uaWNhbDogZnVuY3Rpb24gKCkgeyByZXR1cm4gJ34nOyAgICB9LFxuICAgIGxvd2VyY2FzZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gJ251bGwnOyB9LFxuICAgIHVwcGVyY2FzZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gJ05VTEwnOyB9LFxuICAgIGNhbWVsY2FzZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gJ051bGwnOyB9XG4gIH0sXG4gIGRlZmF1bHRTdHlsZTogJ2xvd2VyY2FzZSdcbn0pO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIFR5cGUgPSByZXF1aXJlKCcuLi90eXBlJyk7XG5cbmZ1bmN0aW9uIHJlc29sdmVZYW1sQm9vbGVhbihkYXRhKSB7XG4gIGlmIChkYXRhID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgdmFyIG1heCA9IGRhdGEubGVuZ3RoO1xuXG4gIHJldHVybiAobWF4ID09PSA0ICYmIChkYXRhID09PSAndHJ1ZScgfHwgZGF0YSA9PT0gJ1RydWUnIHx8IGRhdGEgPT09ICdUUlVFJykpIHx8XG4gICAgICAgICAobWF4ID09PSA1ICYmIChkYXRhID09PSAnZmFsc2UnIHx8IGRhdGEgPT09ICdGYWxzZScgfHwgZGF0YSA9PT0gJ0ZBTFNFJykpO1xufVxuXG5mdW5jdGlvbiBjb25zdHJ1Y3RZYW1sQm9vbGVhbihkYXRhKSB7XG4gIHJldHVybiBkYXRhID09PSAndHJ1ZScgfHxcbiAgICAgICAgIGRhdGEgPT09ICdUcnVlJyB8fFxuICAgICAgICAgZGF0YSA9PT0gJ1RSVUUnO1xufVxuXG5mdW5jdGlvbiBpc0Jvb2xlYW4ob2JqZWN0KSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqZWN0KSA9PT0gJ1tvYmplY3QgQm9vbGVhbl0nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBUeXBlKCd0YWc6eWFtbC5vcmcsMjAwMjpib29sJywge1xuICBraW5kOiAnc2NhbGFyJyxcbiAgcmVzb2x2ZTogcmVzb2x2ZVlhbWxCb29sZWFuLFxuICBjb25zdHJ1Y3Q6IGNvbnN0cnVjdFlhbWxCb29sZWFuLFxuICBwcmVkaWNhdGU6IGlzQm9vbGVhbixcbiAgcmVwcmVzZW50OiB7XG4gICAgbG93ZXJjYXNlOiBmdW5jdGlvbiAob2JqZWN0KSB7IHJldHVybiBvYmplY3QgPyAndHJ1ZScgOiAnZmFsc2UnOyB9LFxuICAgIHVwcGVyY2FzZTogZnVuY3Rpb24gKG9iamVjdCkgeyByZXR1cm4gb2JqZWN0ID8gJ1RSVUUnIDogJ0ZBTFNFJzsgfSxcbiAgICBjYW1lbGNhc2U6IGZ1bmN0aW9uIChvYmplY3QpIHsgcmV0dXJuIG9iamVjdCA/ICdUcnVlJyA6ICdGYWxzZSc7IH1cbiAgfSxcbiAgZGVmYXVsdFN0eWxlOiAnbG93ZXJjYXNlJ1xufSk7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi4vY29tbW9uJyk7XG52YXIgVHlwZSAgID0gcmVxdWlyZSgnLi4vdHlwZScpO1xuXG5mdW5jdGlvbiBpc0hleENvZGUoYykge1xuICByZXR1cm4gKCgweDMwLyogMCAqLyA8PSBjKSAmJiAoYyA8PSAweDM5LyogOSAqLykpIHx8XG4gICAgICAgICAoKDB4NDEvKiBBICovIDw9IGMpICYmIChjIDw9IDB4NDYvKiBGICovKSkgfHxcbiAgICAgICAgICgoMHg2MS8qIGEgKi8gPD0gYykgJiYgKGMgPD0gMHg2Ni8qIGYgKi8pKTtcbn1cblxuZnVuY3Rpb24gaXNPY3RDb2RlKGMpIHtcbiAgcmV0dXJuICgoMHgzMC8qIDAgKi8gPD0gYykgJiYgKGMgPD0gMHgzNy8qIDcgKi8pKTtcbn1cblxuZnVuY3Rpb24gaXNEZWNDb2RlKGMpIHtcbiAgcmV0dXJuICgoMHgzMC8qIDAgKi8gPD0gYykgJiYgKGMgPD0gMHgzOS8qIDkgKi8pKTtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZVlhbWxJbnRlZ2VyKGRhdGEpIHtcbiAgaWYgKGRhdGEgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICB2YXIgbWF4ID0gZGF0YS5sZW5ndGgsXG4gICAgICBpbmRleCA9IDAsXG4gICAgICBoYXNEaWdpdHMgPSBmYWxzZSxcbiAgICAgIGNoO1xuXG4gIGlmICghbWF4KSByZXR1cm4gZmFsc2U7XG5cbiAgY2ggPSBkYXRhW2luZGV4XTtcblxuICAvLyBzaWduXG4gIGlmIChjaCA9PT0gJy0nIHx8IGNoID09PSAnKycpIHtcbiAgICBjaCA9IGRhdGFbKytpbmRleF07XG4gIH1cblxuICBpZiAoY2ggPT09ICcwJykge1xuICAgIC8vIDBcbiAgICBpZiAoaW5kZXggKyAxID09PSBtYXgpIHJldHVybiB0cnVlO1xuICAgIGNoID0gZGF0YVsrK2luZGV4XTtcblxuICAgIC8vIGJhc2UgMiwgYmFzZSA4LCBiYXNlIDE2XG5cbiAgICBpZiAoY2ggPT09ICdiJykge1xuICAgICAgLy8gYmFzZSAyXG4gICAgICBpbmRleCsrO1xuXG4gICAgICBmb3IgKDsgaW5kZXggPCBtYXg7IGluZGV4KyspIHtcbiAgICAgICAgY2ggPSBkYXRhW2luZGV4XTtcbiAgICAgICAgaWYgKGNoID09PSAnXycpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoY2ggIT09ICcwJyAmJiBjaCAhPT0gJzEnKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGhhc0RpZ2l0cyA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gaGFzRGlnaXRzICYmIGNoICE9PSAnXyc7XG4gICAgfVxuXG5cbiAgICBpZiAoY2ggPT09ICd4Jykge1xuICAgICAgLy8gYmFzZSAxNlxuICAgICAgaW5kZXgrKztcblxuICAgICAgZm9yICg7IGluZGV4IDwgbWF4OyBpbmRleCsrKSB7XG4gICAgICAgIGNoID0gZGF0YVtpbmRleF07XG4gICAgICAgIGlmIChjaCA9PT0gJ18nKSBjb250aW51ZTtcbiAgICAgICAgaWYgKCFpc0hleENvZGUoZGF0YS5jaGFyQ29kZUF0KGluZGV4KSkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgaGFzRGlnaXRzID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBoYXNEaWdpdHMgJiYgY2ggIT09ICdfJztcbiAgICB9XG5cbiAgICAvLyBiYXNlIDhcbiAgICBmb3IgKDsgaW5kZXggPCBtYXg7IGluZGV4KyspIHtcbiAgICAgIGNoID0gZGF0YVtpbmRleF07XG4gICAgICBpZiAoY2ggPT09ICdfJykgY29udGludWU7XG4gICAgICBpZiAoIWlzT2N0Q29kZShkYXRhLmNoYXJDb2RlQXQoaW5kZXgpKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgaGFzRGlnaXRzID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGhhc0RpZ2l0cyAmJiBjaCAhPT0gJ18nO1xuICB9XG5cbiAgLy8gYmFzZSAxMCAoZXhjZXB0IDApIG9yIGJhc2UgNjBcblxuICAvLyB2YWx1ZSBzaG91bGQgbm90IHN0YXJ0IHdpdGggYF9gO1xuICBpZiAoY2ggPT09ICdfJykgcmV0dXJuIGZhbHNlO1xuXG4gIGZvciAoOyBpbmRleCA8IG1heDsgaW5kZXgrKykge1xuICAgIGNoID0gZGF0YVtpbmRleF07XG4gICAgaWYgKGNoID09PSAnXycpIGNvbnRpbnVlO1xuICAgIGlmIChjaCA9PT0gJzonKSBicmVhaztcbiAgICBpZiAoIWlzRGVjQ29kZShkYXRhLmNoYXJDb2RlQXQoaW5kZXgpKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBoYXNEaWdpdHMgPSB0cnVlO1xuICB9XG5cbiAgLy8gU2hvdWxkIGhhdmUgZGlnaXRzIGFuZCBzaG91bGQgbm90IGVuZCB3aXRoIGBfYFxuICBpZiAoIWhhc0RpZ2l0cyB8fCBjaCA9PT0gJ18nKSByZXR1cm4gZmFsc2U7XG5cbiAgLy8gaWYgIWJhc2U2MCAtIGRvbmU7XG4gIGlmIChjaCAhPT0gJzonKSByZXR1cm4gdHJ1ZTtcblxuICAvLyBiYXNlNjAgYWxtb3N0IG5vdCB1c2VkLCBubyBuZWVkcyB0byBvcHRpbWl6ZVxuICByZXR1cm4gL14oOlswLTVdP1swLTldKSskLy50ZXN0KGRhdGEuc2xpY2UoaW5kZXgpKTtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0WWFtbEludGVnZXIoZGF0YSkge1xuICB2YXIgdmFsdWUgPSBkYXRhLCBzaWduID0gMSwgY2gsIGJhc2UsIGRpZ2l0cyA9IFtdO1xuXG4gIGlmICh2YWx1ZS5pbmRleE9mKCdfJykgIT09IC0xKSB7XG4gICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9fL2csICcnKTtcbiAgfVxuXG4gIGNoID0gdmFsdWVbMF07XG5cbiAgaWYgKGNoID09PSAnLScgfHwgY2ggPT09ICcrJykge1xuICAgIGlmIChjaCA9PT0gJy0nKSBzaWduID0gLTE7XG4gICAgdmFsdWUgPSB2YWx1ZS5zbGljZSgxKTtcbiAgICBjaCA9IHZhbHVlWzBdO1xuICB9XG5cbiAgaWYgKHZhbHVlID09PSAnMCcpIHJldHVybiAwO1xuXG4gIGlmIChjaCA9PT0gJzAnKSB7XG4gICAgaWYgKHZhbHVlWzFdID09PSAnYicpIHJldHVybiBzaWduICogcGFyc2VJbnQodmFsdWUuc2xpY2UoMiksIDIpO1xuICAgIGlmICh2YWx1ZVsxXSA9PT0gJ3gnKSByZXR1cm4gc2lnbiAqIHBhcnNlSW50KHZhbHVlLCAxNik7XG4gICAgcmV0dXJuIHNpZ24gKiBwYXJzZUludCh2YWx1ZSwgOCk7XG4gIH1cblxuICBpZiAodmFsdWUuaW5kZXhPZignOicpICE9PSAtMSkge1xuICAgIHZhbHVlLnNwbGl0KCc6JykuZm9yRWFjaChmdW5jdGlvbiAodikge1xuICAgICAgZGlnaXRzLnVuc2hpZnQocGFyc2VJbnQodiwgMTApKTtcbiAgICB9KTtcblxuICAgIHZhbHVlID0gMDtcbiAgICBiYXNlID0gMTtcblxuICAgIGRpZ2l0cy5mb3JFYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgICB2YWx1ZSArPSAoZCAqIGJhc2UpO1xuICAgICAgYmFzZSAqPSA2MDtcbiAgICB9KTtcblxuICAgIHJldHVybiBzaWduICogdmFsdWU7XG5cbiAgfVxuXG4gIHJldHVybiBzaWduICogcGFyc2VJbnQodmFsdWUsIDEwKTtcbn1cblxuZnVuY3Rpb24gaXNJbnRlZ2VyKG9iamVjdCkge1xuICByZXR1cm4gKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmplY3QpKSA9PT0gJ1tvYmplY3QgTnVtYmVyXScgJiZcbiAgICAgICAgIChvYmplY3QgJSAxID09PSAwICYmICFjb21tb24uaXNOZWdhdGl2ZVplcm8ob2JqZWN0KSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFR5cGUoJ3RhZzp5YW1sLm9yZywyMDAyOmludCcsIHtcbiAga2luZDogJ3NjYWxhcicsXG4gIHJlc29sdmU6IHJlc29sdmVZYW1sSW50ZWdlcixcbiAgY29uc3RydWN0OiBjb25zdHJ1Y3RZYW1sSW50ZWdlcixcbiAgcHJlZGljYXRlOiBpc0ludGVnZXIsXG4gIHJlcHJlc2VudDoge1xuICAgIGJpbmFyeTogICAgICBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogPj0gMCA/ICcwYicgKyBvYmoudG9TdHJpbmcoMikgOiAnLTBiJyArIG9iai50b1N0cmluZygyKS5zbGljZSgxKTsgfSxcbiAgICBvY3RhbDogICAgICAgZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqID49IDAgPyAnMCcgICsgb2JqLnRvU3RyaW5nKDgpIDogJy0wJyAgKyBvYmoudG9TdHJpbmcoOCkuc2xpY2UoMSk7IH0sXG4gICAgZGVjaW1hbDogICAgIGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iai50b1N0cmluZygxMCk7IH0sXG4gICAgLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuICAgIGhleGFkZWNpbWFsOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogPj0gMCA/ICcweCcgKyBvYmoudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCkgOiAgJy0weCcgKyBvYmoudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCkuc2xpY2UoMSk7IH1cbiAgfSxcbiAgZGVmYXVsdFN0eWxlOiAnZGVjaW1hbCcsXG4gIHN0eWxlQWxpYXNlczoge1xuICAgIGJpbmFyeTogICAgICBbIDIsICAnYmluJyBdLFxuICAgIG9jdGFsOiAgICAgICBbIDgsICAnb2N0JyBdLFxuICAgIGRlY2ltYWw6ICAgICBbIDEwLCAnZGVjJyBdLFxuICAgIGhleGFkZWNpbWFsOiBbIDE2LCAnaGV4JyBdXG4gIH1cbn0pO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4uL2NvbW1vbicpO1xudmFyIFR5cGUgICA9IHJlcXVpcmUoJy4uL3R5cGUnKTtcblxudmFyIFlBTUxfRkxPQVRfUEFUVEVSTiA9IG5ldyBSZWdFeHAoXG4gIC8vIDIuNWU0LCAyLjUgYW5kIGludGVnZXJzXG4gICdeKD86Wy0rXT8oPzowfFsxLTldWzAtOV9dKikoPzpcXFxcLlswLTlfXSopPyg/OltlRV1bLStdP1swLTldKyk/JyArXG4gIC8vIC4yZTQsIC4yXG4gIC8vIHNwZWNpYWwgY2FzZSwgc2VlbXMgbm90IGZyb20gc3BlY1xuICAnfFxcXFwuWzAtOV9dKyg/OltlRV1bLStdP1swLTldKyk/JyArXG4gIC8vIDIwOjU5XG4gICd8Wy0rXT9bMC05XVswLTlfXSooPzo6WzAtNV0/WzAtOV0pK1xcXFwuWzAtOV9dKicgK1xuICAvLyAuaW5mXG4gICd8Wy0rXT9cXFxcLig/OmluZnxJbmZ8SU5GKScgK1xuICAvLyAubmFuXG4gICd8XFxcXC4oPzpuYW58TmFOfE5BTikpJCcpO1xuXG5mdW5jdGlvbiByZXNvbHZlWWFtbEZsb2F0KGRhdGEpIHtcbiAgaWYgKGRhdGEgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICBpZiAoIVlBTUxfRkxPQVRfUEFUVEVSTi50ZXN0KGRhdGEpIHx8XG4gICAgICAvLyBRdWljayBoYWNrIHRvIG5vdCBhbGxvdyBpbnRlZ2VycyBlbmQgd2l0aCBgX2BcbiAgICAgIC8vIFByb2JhYmx5IHNob3VsZCB1cGRhdGUgcmVnZXhwICYgY2hlY2sgc3BlZWRcbiAgICAgIGRhdGFbZGF0YS5sZW5ndGggLSAxXSA9PT0gJ18nKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGNvbnN0cnVjdFlhbWxGbG9hdChkYXRhKSB7XG4gIHZhciB2YWx1ZSwgc2lnbiwgYmFzZSwgZGlnaXRzO1xuXG4gIHZhbHVlICA9IGRhdGEucmVwbGFjZSgvXy9nLCAnJykudG9Mb3dlckNhc2UoKTtcbiAgc2lnbiAgID0gdmFsdWVbMF0gPT09ICctJyA/IC0xIDogMTtcbiAgZGlnaXRzID0gW107XG5cbiAgaWYgKCcrLScuaW5kZXhPZih2YWx1ZVswXSkgPj0gMCkge1xuICAgIHZhbHVlID0gdmFsdWUuc2xpY2UoMSk7XG4gIH1cblxuICBpZiAodmFsdWUgPT09ICcuaW5mJykge1xuICAgIHJldHVybiAoc2lnbiA9PT0gMSkgPyBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFkgOiBOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFk7XG5cbiAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gJy5uYW4nKSB7XG4gICAgcmV0dXJuIE5hTjtcblxuICB9IGVsc2UgaWYgKHZhbHVlLmluZGV4T2YoJzonKSA+PSAwKSB7XG4gICAgdmFsdWUuc3BsaXQoJzonKS5mb3JFYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICBkaWdpdHMudW5zaGlmdChwYXJzZUZsb2F0KHYsIDEwKSk7XG4gICAgfSk7XG5cbiAgICB2YWx1ZSA9IDAuMDtcbiAgICBiYXNlID0gMTtcblxuICAgIGRpZ2l0cy5mb3JFYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgICB2YWx1ZSArPSBkICogYmFzZTtcbiAgICAgIGJhc2UgKj0gNjA7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc2lnbiAqIHZhbHVlO1xuXG4gIH1cbiAgcmV0dXJuIHNpZ24gKiBwYXJzZUZsb2F0KHZhbHVlLCAxMCk7XG59XG5cblxudmFyIFNDSUVOVElGSUNfV0lUSE9VVF9ET1QgPSAvXlstK10/WzAtOV0rZS87XG5cbmZ1bmN0aW9uIHJlcHJlc2VudFlhbWxGbG9hdChvYmplY3QsIHN0eWxlKSB7XG4gIHZhciByZXM7XG5cbiAgaWYgKGlzTmFOKG9iamVjdCkpIHtcbiAgICBzd2l0Y2ggKHN0eWxlKSB7XG4gICAgICBjYXNlICdsb3dlcmNhc2UnOiByZXR1cm4gJy5uYW4nO1xuICAgICAgY2FzZSAndXBwZXJjYXNlJzogcmV0dXJuICcuTkFOJztcbiAgICAgIGNhc2UgJ2NhbWVsY2FzZSc6IHJldHVybiAnLk5hTic7XG4gICAgfVxuICB9IGVsc2UgaWYgKE51bWJlci5QT1NJVElWRV9JTkZJTklUWSA9PT0gb2JqZWN0KSB7XG4gICAgc3dpdGNoIChzdHlsZSkge1xuICAgICAgY2FzZSAnbG93ZXJjYXNlJzogcmV0dXJuICcuaW5mJztcbiAgICAgIGNhc2UgJ3VwcGVyY2FzZSc6IHJldHVybiAnLklORic7XG4gICAgICBjYXNlICdjYW1lbGNhc2UnOiByZXR1cm4gJy5JbmYnO1xuICAgIH1cbiAgfSBlbHNlIGlmIChOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFkgPT09IG9iamVjdCkge1xuICAgIHN3aXRjaCAoc3R5bGUpIHtcbiAgICAgIGNhc2UgJ2xvd2VyY2FzZSc6IHJldHVybiAnLS5pbmYnO1xuICAgICAgY2FzZSAndXBwZXJjYXNlJzogcmV0dXJuICctLklORic7XG4gICAgICBjYXNlICdjYW1lbGNhc2UnOiByZXR1cm4gJy0uSW5mJztcbiAgICB9XG4gIH0gZWxzZSBpZiAoY29tbW9uLmlzTmVnYXRpdmVaZXJvKG9iamVjdCkpIHtcbiAgICByZXR1cm4gJy0wLjAnO1xuICB9XG5cbiAgcmVzID0gb2JqZWN0LnRvU3RyaW5nKDEwKTtcblxuICAvLyBKUyBzdHJpbmdpZmllciBjYW4gYnVpbGQgc2NpZW50aWZpYyBmb3JtYXQgd2l0aG91dCBkb3RzOiA1ZS0xMDAsXG4gIC8vIHdoaWxlIFlBTUwgcmVxdXJlcyBkb3Q6IDUuZS0xMDAuIEZpeCBpdCB3aXRoIHNpbXBsZSBoYWNrXG5cbiAgcmV0dXJuIFNDSUVOVElGSUNfV0lUSE9VVF9ET1QudGVzdChyZXMpID8gcmVzLnJlcGxhY2UoJ2UnLCAnLmUnKSA6IHJlcztcbn1cblxuZnVuY3Rpb24gaXNGbG9hdChvYmplY3QpIHtcbiAgcmV0dXJuIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqZWN0KSA9PT0gJ1tvYmplY3QgTnVtYmVyXScpICYmXG4gICAgICAgICAob2JqZWN0ICUgMSAhPT0gMCB8fCBjb21tb24uaXNOZWdhdGl2ZVplcm8ob2JqZWN0KSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFR5cGUoJ3RhZzp5YW1sLm9yZywyMDAyOmZsb2F0Jywge1xuICBraW5kOiAnc2NhbGFyJyxcbiAgcmVzb2x2ZTogcmVzb2x2ZVlhbWxGbG9hdCxcbiAgY29uc3RydWN0OiBjb25zdHJ1Y3RZYW1sRmxvYXQsXG4gIHByZWRpY2F0ZTogaXNGbG9hdCxcbiAgcmVwcmVzZW50OiByZXByZXNlbnRZYW1sRmxvYXQsXG4gIGRlZmF1bHRTdHlsZTogJ2xvd2VyY2FzZSdcbn0pO1xuIiwgIi8vIFN0YW5kYXJkIFlBTUwncyBKU09OIHNjaGVtYS5cbi8vIGh0dHA6Ly93d3cueWFtbC5vcmcvc3BlYy8xLjIvc3BlYy5odG1sI2lkMjgwMzIzMVxuLy9cbi8vIE5PVEU6IEpTLVlBTUwgZG9lcyBub3Qgc3VwcG9ydCBzY2hlbWEtc3BlY2lmaWMgdGFnIHJlc29sdXRpb24gcmVzdHJpY3Rpb25zLlxuLy8gU28sIHRoaXMgc2NoZW1hIGlzIG5vdCBzdWNoIHN0cmljdCBhcyBkZWZpbmVkIGluIHRoZSBZQU1MIHNwZWNpZmljYXRpb24uXG4vLyBJdCBhbGxvd3MgbnVtYmVycyBpbiBiaW5hcnkgbm90YWlvbiwgdXNlIGBOdWxsYCBhbmQgYE5VTExgIGFzIGBudWxsYCwgZXRjLlxuXG5cbid1c2Ugc3RyaWN0JztcblxuXG52YXIgU2NoZW1hID0gcmVxdWlyZSgnLi4vc2NoZW1hJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgU2NoZW1hKHtcbiAgaW5jbHVkZTogW1xuICAgIHJlcXVpcmUoJy4vZmFpbHNhZmUnKVxuICBdLFxuICBpbXBsaWNpdDogW1xuICAgIHJlcXVpcmUoJy4uL3R5cGUvbnVsbCcpLFxuICAgIHJlcXVpcmUoJy4uL3R5cGUvYm9vbCcpLFxuICAgIHJlcXVpcmUoJy4uL3R5cGUvaW50JyksXG4gICAgcmVxdWlyZSgnLi4vdHlwZS9mbG9hdCcpXG4gIF1cbn0pO1xuIiwgIi8vIFN0YW5kYXJkIFlBTUwncyBDb3JlIHNjaGVtYS5cbi8vIGh0dHA6Ly93d3cueWFtbC5vcmcvc3BlYy8xLjIvc3BlYy5odG1sI2lkMjgwNDkyM1xuLy9cbi8vIE5PVEU6IEpTLVlBTUwgZG9lcyBub3Qgc3VwcG9ydCBzY2hlbWEtc3BlY2lmaWMgdGFnIHJlc29sdXRpb24gcmVzdHJpY3Rpb25zLlxuLy8gU28sIENvcmUgc2NoZW1hIGhhcyBubyBkaXN0aW5jdGlvbnMgZnJvbSBKU09OIHNjaGVtYSBpcyBKUy1ZQU1MLlxuXG5cbid1c2Ugc3RyaWN0JztcblxuXG52YXIgU2NoZW1hID0gcmVxdWlyZSgnLi4vc2NoZW1hJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgU2NoZW1hKHtcbiAgaW5jbHVkZTogW1xuICAgIHJlcXVpcmUoJy4vanNvbicpXG4gIF1cbn0pO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIFR5cGUgPSByZXF1aXJlKCcuLi90eXBlJyk7XG5cbnZhciBZQU1MX0RBVEVfUkVHRVhQID0gbmV3IFJlZ0V4cChcbiAgJ14oWzAtOV1bMC05XVswLTldWzAtOV0pJyAgICAgICAgICArIC8vIFsxXSB5ZWFyXG4gICctKFswLTldWzAtOV0pJyAgICAgICAgICAgICAgICAgICAgKyAvLyBbMl0gbW9udGhcbiAgJy0oWzAtOV1bMC05XSkkJyk7ICAgICAgICAgICAgICAgICAgIC8vIFszXSBkYXlcblxudmFyIFlBTUxfVElNRVNUQU1QX1JFR0VYUCA9IG5ldyBSZWdFeHAoXG4gICdeKFswLTldWzAtOV1bMC05XVswLTldKScgICAgICAgICAgKyAvLyBbMV0geWVhclxuICAnLShbMC05XVswLTldPyknICAgICAgICAgICAgICAgICAgICsgLy8gWzJdIG1vbnRoXG4gICctKFswLTldWzAtOV0/KScgICAgICAgICAgICAgICAgICAgKyAvLyBbM10gZGF5XG4gICcoPzpbVHRdfFsgXFxcXHRdKyknICAgICAgICAgICAgICAgICArIC8vIC4uLlxuICAnKFswLTldWzAtOV0/KScgICAgICAgICAgICAgICAgICAgICsgLy8gWzRdIGhvdXJcbiAgJzooWzAtOV1bMC05XSknICAgICAgICAgICAgICAgICAgICArIC8vIFs1XSBtaW51dGVcbiAgJzooWzAtOV1bMC05XSknICAgICAgICAgICAgICAgICAgICArIC8vIFs2XSBzZWNvbmRcbiAgJyg/OlxcXFwuKFswLTldKikpPycgICAgICAgICAgICAgICAgICsgLy8gWzddIGZyYWN0aW9uXG4gICcoPzpbIFxcXFx0XSooWnwoWy0rXSkoWzAtOV1bMC05XT8pJyArIC8vIFs4XSB0eiBbOV0gdHpfc2lnbiBbMTBdIHR6X2hvdXJcbiAgJyg/OjooWzAtOV1bMC05XSkpPykpPyQnKTsgICAgICAgICAgIC8vIFsxMV0gdHpfbWludXRlXG5cbmZ1bmN0aW9uIHJlc29sdmVZYW1sVGltZXN0YW1wKGRhdGEpIHtcbiAgaWYgKGRhdGEgPT09IG51bGwpIHJldHVybiBmYWxzZTtcbiAgaWYgKFlBTUxfREFURV9SRUdFWFAuZXhlYyhkYXRhKSAhPT0gbnVsbCkgcmV0dXJuIHRydWU7XG4gIGlmIChZQU1MX1RJTUVTVEFNUF9SRUdFWFAuZXhlYyhkYXRhKSAhPT0gbnVsbCkgcmV0dXJuIHRydWU7XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0WWFtbFRpbWVzdGFtcChkYXRhKSB7XG4gIHZhciBtYXRjaCwgeWVhciwgbW9udGgsIGRheSwgaG91ciwgbWludXRlLCBzZWNvbmQsIGZyYWN0aW9uID0gMCxcbiAgICAgIGRlbHRhID0gbnVsbCwgdHpfaG91ciwgdHpfbWludXRlLCBkYXRlO1xuXG4gIG1hdGNoID0gWUFNTF9EQVRFX1JFR0VYUC5leGVjKGRhdGEpO1xuICBpZiAobWF0Y2ggPT09IG51bGwpIG1hdGNoID0gWUFNTF9USU1FU1RBTVBfUkVHRVhQLmV4ZWMoZGF0YSk7XG5cbiAgaWYgKG1hdGNoID09PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoJ0RhdGUgcmVzb2x2ZSBlcnJvcicpO1xuXG4gIC8vIG1hdGNoOiBbMV0geWVhciBbMl0gbW9udGggWzNdIGRheVxuXG4gIHllYXIgPSArKG1hdGNoWzFdKTtcbiAgbW9udGggPSArKG1hdGNoWzJdKSAtIDE7IC8vIEpTIG1vbnRoIHN0YXJ0cyB3aXRoIDBcbiAgZGF5ID0gKyhtYXRjaFszXSk7XG5cbiAgaWYgKCFtYXRjaFs0XSkgeyAvLyBubyBob3VyXG4gICAgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKHllYXIsIG1vbnRoLCBkYXkpKTtcbiAgfVxuXG4gIC8vIG1hdGNoOiBbNF0gaG91ciBbNV0gbWludXRlIFs2XSBzZWNvbmQgWzddIGZyYWN0aW9uXG5cbiAgaG91ciA9ICsobWF0Y2hbNF0pO1xuICBtaW51dGUgPSArKG1hdGNoWzVdKTtcbiAgc2Vjb25kID0gKyhtYXRjaFs2XSk7XG5cbiAgaWYgKG1hdGNoWzddKSB7XG4gICAgZnJhY3Rpb24gPSBtYXRjaFs3XS5zbGljZSgwLCAzKTtcbiAgICB3aGlsZSAoZnJhY3Rpb24ubGVuZ3RoIDwgMykgeyAvLyBtaWxsaS1zZWNvbmRzXG4gICAgICBmcmFjdGlvbiArPSAnMCc7XG4gICAgfVxuICAgIGZyYWN0aW9uID0gK2ZyYWN0aW9uO1xuICB9XG5cbiAgLy8gbWF0Y2g6IFs4XSB0eiBbOV0gdHpfc2lnbiBbMTBdIHR6X2hvdXIgWzExXSB0el9taW51dGVcblxuICBpZiAobWF0Y2hbOV0pIHtcbiAgICB0el9ob3VyID0gKyhtYXRjaFsxMF0pO1xuICAgIHR6X21pbnV0ZSA9ICsobWF0Y2hbMTFdIHx8IDApO1xuICAgIGRlbHRhID0gKHR6X2hvdXIgKiA2MCArIHR6X21pbnV0ZSkgKiA2MDAwMDsgLy8gZGVsdGEgaW4gbWlsaS1zZWNvbmRzXG4gICAgaWYgKG1hdGNoWzldID09PSAnLScpIGRlbHRhID0gLWRlbHRhO1xuICB9XG5cbiAgZGF0ZSA9IG5ldyBEYXRlKERhdGUuVVRDKHllYXIsIG1vbnRoLCBkYXksIGhvdXIsIG1pbnV0ZSwgc2Vjb25kLCBmcmFjdGlvbikpO1xuXG4gIGlmIChkZWx0YSkgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpIC0gZGVsdGEpO1xuXG4gIHJldHVybiBkYXRlO1xufVxuXG5mdW5jdGlvbiByZXByZXNlbnRZYW1sVGltZXN0YW1wKG9iamVjdCAvKiwgc3R5bGUqLykge1xuICByZXR1cm4gb2JqZWN0LnRvSVNPU3RyaW5nKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFR5cGUoJ3RhZzp5YW1sLm9yZywyMDAyOnRpbWVzdGFtcCcsIHtcbiAga2luZDogJ3NjYWxhcicsXG4gIHJlc29sdmU6IHJlc29sdmVZYW1sVGltZXN0YW1wLFxuICBjb25zdHJ1Y3Q6IGNvbnN0cnVjdFlhbWxUaW1lc3RhbXAsXG4gIGluc3RhbmNlT2Y6IERhdGUsXG4gIHJlcHJlc2VudDogcmVwcmVzZW50WWFtbFRpbWVzdGFtcFxufSk7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgVHlwZSA9IHJlcXVpcmUoJy4uL3R5cGUnKTtcblxuZnVuY3Rpb24gcmVzb2x2ZVlhbWxNZXJnZShkYXRhKSB7XG4gIHJldHVybiBkYXRhID09PSAnPDwnIHx8IGRhdGEgPT09IG51bGw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFR5cGUoJ3RhZzp5YW1sLm9yZywyMDAyOm1lcmdlJywge1xuICBraW5kOiAnc2NhbGFyJyxcbiAgcmVzb2x2ZTogcmVzb2x2ZVlhbWxNZXJnZVxufSk7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG4vKmVzbGludC1kaXNhYmxlIG5vLWJpdHdpc2UqL1xuXG52YXIgTm9kZUJ1ZmZlcjtcblxudHJ5IHtcbiAgLy8gQSB0cmljayBmb3IgYnJvd3NlcmlmaWVkIHZlcnNpb24sIHRvIG5vdCBpbmNsdWRlIGBCdWZmZXJgIHNoaW1cbiAgdmFyIF9yZXF1aXJlID0gcmVxdWlyZTtcbiAgTm9kZUJ1ZmZlciA9IF9yZXF1aXJlKCdidWZmZXInKS5CdWZmZXI7XG59IGNhdGNoIChfXykge31cblxudmFyIFR5cGUgICAgICAgPSByZXF1aXJlKCcuLi90eXBlJyk7XG5cblxuLy8gWyA2NCwgNjUsIDY2IF0gLT4gWyBwYWRkaW5nLCBDUiwgTEYgXVxudmFyIEJBU0U2NF9NQVAgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz1cXG5cXHInO1xuXG5cbmZ1bmN0aW9uIHJlc29sdmVZYW1sQmluYXJ5KGRhdGEpIHtcbiAgaWYgKGRhdGEgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICB2YXIgY29kZSwgaWR4LCBiaXRsZW4gPSAwLCBtYXggPSBkYXRhLmxlbmd0aCwgbWFwID0gQkFTRTY0X01BUDtcblxuICAvLyBDb252ZXJ0IG9uZSBieSBvbmUuXG4gIGZvciAoaWR4ID0gMDsgaWR4IDwgbWF4OyBpZHgrKykge1xuICAgIGNvZGUgPSBtYXAuaW5kZXhPZihkYXRhLmNoYXJBdChpZHgpKTtcblxuICAgIC8vIFNraXAgQ1IvTEZcbiAgICBpZiAoY29kZSA+IDY0KSBjb250aW51ZTtcblxuICAgIC8vIEZhaWwgb24gaWxsZWdhbCBjaGFyYWN0ZXJzXG4gICAgaWYgKGNvZGUgPCAwKSByZXR1cm4gZmFsc2U7XG5cbiAgICBiaXRsZW4gKz0gNjtcbiAgfVxuXG4gIC8vIElmIHRoZXJlIGFyZSBhbnkgYml0cyBsZWZ0LCBzb3VyY2Ugd2FzIGNvcnJ1cHRlZFxuICByZXR1cm4gKGJpdGxlbiAlIDgpID09PSAwO1xufVxuXG5mdW5jdGlvbiBjb25zdHJ1Y3RZYW1sQmluYXJ5KGRhdGEpIHtcbiAgdmFyIGlkeCwgdGFpbGJpdHMsXG4gICAgICBpbnB1dCA9IGRhdGEucmVwbGFjZSgvW1xcclxcbj1dL2csICcnKSwgLy8gcmVtb3ZlIENSL0xGICYgcGFkZGluZyB0byBzaW1wbGlmeSBzY2FuXG4gICAgICBtYXggPSBpbnB1dC5sZW5ndGgsXG4gICAgICBtYXAgPSBCQVNFNjRfTUFQLFxuICAgICAgYml0cyA9IDAsXG4gICAgICByZXN1bHQgPSBbXTtcblxuICAvLyBDb2xsZWN0IGJ5IDYqNCBiaXRzICgzIGJ5dGVzKVxuXG4gIGZvciAoaWR4ID0gMDsgaWR4IDwgbWF4OyBpZHgrKykge1xuICAgIGlmICgoaWR4ICUgNCA9PT0gMCkgJiYgaWR4KSB7XG4gICAgICByZXN1bHQucHVzaCgoYml0cyA+PiAxNikgJiAweEZGKTtcbiAgICAgIHJlc3VsdC5wdXNoKChiaXRzID4+IDgpICYgMHhGRik7XG4gICAgICByZXN1bHQucHVzaChiaXRzICYgMHhGRik7XG4gICAgfVxuXG4gICAgYml0cyA9IChiaXRzIDw8IDYpIHwgbWFwLmluZGV4T2YoaW5wdXQuY2hhckF0KGlkeCkpO1xuICB9XG5cbiAgLy8gRHVtcCB0YWlsXG5cbiAgdGFpbGJpdHMgPSAobWF4ICUgNCkgKiA2O1xuXG4gIGlmICh0YWlsYml0cyA9PT0gMCkge1xuICAgIHJlc3VsdC5wdXNoKChiaXRzID4+IDE2KSAmIDB4RkYpO1xuICAgIHJlc3VsdC5wdXNoKChiaXRzID4+IDgpICYgMHhGRik7XG4gICAgcmVzdWx0LnB1c2goYml0cyAmIDB4RkYpO1xuICB9IGVsc2UgaWYgKHRhaWxiaXRzID09PSAxOCkge1xuICAgIHJlc3VsdC5wdXNoKChiaXRzID4+IDEwKSAmIDB4RkYpO1xuICAgIHJlc3VsdC5wdXNoKChiaXRzID4+IDIpICYgMHhGRik7XG4gIH0gZWxzZSBpZiAodGFpbGJpdHMgPT09IDEyKSB7XG4gICAgcmVzdWx0LnB1c2goKGJpdHMgPj4gNCkgJiAweEZGKTtcbiAgfVxuXG4gIC8vIFdyYXAgaW50byBCdWZmZXIgZm9yIE5vZGVKUyBhbmQgbGVhdmUgQXJyYXkgZm9yIGJyb3dzZXJcbiAgaWYgKE5vZGVCdWZmZXIpIHtcbiAgICAvLyBTdXBwb3J0IG5vZGUgNi4rIEJ1ZmZlciBBUEkgd2hlbiBhdmFpbGFibGVcbiAgICByZXR1cm4gTm9kZUJ1ZmZlci5mcm9tID8gTm9kZUJ1ZmZlci5mcm9tKHJlc3VsdCkgOiBuZXcgTm9kZUJ1ZmZlcihyZXN1bHQpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gcmVwcmVzZW50WWFtbEJpbmFyeShvYmplY3QgLyosIHN0eWxlKi8pIHtcbiAgdmFyIHJlc3VsdCA9ICcnLCBiaXRzID0gMCwgaWR4LCB0YWlsLFxuICAgICAgbWF4ID0gb2JqZWN0Lmxlbmd0aCxcbiAgICAgIG1hcCA9IEJBU0U2NF9NQVA7XG5cbiAgLy8gQ29udmVydCBldmVyeSB0aHJlZSBieXRlcyB0byA0IEFTQ0lJIGNoYXJhY3RlcnMuXG5cbiAgZm9yIChpZHggPSAwOyBpZHggPCBtYXg7IGlkeCsrKSB7XG4gICAgaWYgKChpZHggJSAzID09PSAwKSAmJiBpZHgpIHtcbiAgICAgIHJlc3VsdCArPSBtYXBbKGJpdHMgPj4gMTgpICYgMHgzRl07XG4gICAgICByZXN1bHQgKz0gbWFwWyhiaXRzID4+IDEyKSAmIDB4M0ZdO1xuICAgICAgcmVzdWx0ICs9IG1hcFsoYml0cyA+PiA2KSAmIDB4M0ZdO1xuICAgICAgcmVzdWx0ICs9IG1hcFtiaXRzICYgMHgzRl07XG4gICAgfVxuXG4gICAgYml0cyA9IChiaXRzIDw8IDgpICsgb2JqZWN0W2lkeF07XG4gIH1cblxuICAvLyBEdW1wIHRhaWxcblxuICB0YWlsID0gbWF4ICUgMztcblxuICBpZiAodGFpbCA9PT0gMCkge1xuICAgIHJlc3VsdCArPSBtYXBbKGJpdHMgPj4gMTgpICYgMHgzRl07XG4gICAgcmVzdWx0ICs9IG1hcFsoYml0cyA+PiAxMikgJiAweDNGXTtcbiAgICByZXN1bHQgKz0gbWFwWyhiaXRzID4+IDYpICYgMHgzRl07XG4gICAgcmVzdWx0ICs9IG1hcFtiaXRzICYgMHgzRl07XG4gIH0gZWxzZSBpZiAodGFpbCA9PT0gMikge1xuICAgIHJlc3VsdCArPSBtYXBbKGJpdHMgPj4gMTApICYgMHgzRl07XG4gICAgcmVzdWx0ICs9IG1hcFsoYml0cyA+PiA0KSAmIDB4M0ZdO1xuICAgIHJlc3VsdCArPSBtYXBbKGJpdHMgPDwgMikgJiAweDNGXTtcbiAgICByZXN1bHQgKz0gbWFwWzY0XTtcbiAgfSBlbHNlIGlmICh0YWlsID09PSAxKSB7XG4gICAgcmVzdWx0ICs9IG1hcFsoYml0cyA+PiAyKSAmIDB4M0ZdO1xuICAgIHJlc3VsdCArPSBtYXBbKGJpdHMgPDwgNCkgJiAweDNGXTtcbiAgICByZXN1bHQgKz0gbWFwWzY0XTtcbiAgICByZXN1bHQgKz0gbWFwWzY0XTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGlzQmluYXJ5KG9iamVjdCkge1xuICByZXR1cm4gTm9kZUJ1ZmZlciAmJiBOb2RlQnVmZmVyLmlzQnVmZmVyKG9iamVjdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFR5cGUoJ3RhZzp5YW1sLm9yZywyMDAyOmJpbmFyeScsIHtcbiAga2luZDogJ3NjYWxhcicsXG4gIHJlc29sdmU6IHJlc29sdmVZYW1sQmluYXJ5LFxuICBjb25zdHJ1Y3Q6IGNvbnN0cnVjdFlhbWxCaW5hcnksXG4gIHByZWRpY2F0ZTogaXNCaW5hcnksXG4gIHJlcHJlc2VudDogcmVwcmVzZW50WWFtbEJpbmFyeVxufSk7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgVHlwZSA9IHJlcXVpcmUoJy4uL3R5cGUnKTtcblxudmFyIF9oYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgX3RvU3RyaW5nICAgICAgID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuZnVuY3Rpb24gcmVzb2x2ZVlhbWxPbWFwKGRhdGEpIHtcbiAgaWYgKGRhdGEgPT09IG51bGwpIHJldHVybiB0cnVlO1xuXG4gIHZhciBvYmplY3RLZXlzID0gW10sIGluZGV4LCBsZW5ndGgsIHBhaXIsIHBhaXJLZXksIHBhaXJIYXNLZXksXG4gICAgICBvYmplY3QgPSBkYXRhO1xuXG4gIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSBvYmplY3QubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgIHBhaXIgPSBvYmplY3RbaW5kZXhdO1xuICAgIHBhaXJIYXNLZXkgPSBmYWxzZTtcblxuICAgIGlmIChfdG9TdHJpbmcuY2FsbChwYWlyKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHJldHVybiBmYWxzZTtcblxuICAgIGZvciAocGFpcktleSBpbiBwYWlyKSB7XG4gICAgICBpZiAoX2hhc093blByb3BlcnR5LmNhbGwocGFpciwgcGFpcktleSkpIHtcbiAgICAgICAgaWYgKCFwYWlySGFzS2V5KSBwYWlySGFzS2V5ID0gdHJ1ZTtcbiAgICAgICAgZWxzZSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFwYWlySGFzS2V5KSByZXR1cm4gZmFsc2U7XG5cbiAgICBpZiAob2JqZWN0S2V5cy5pbmRleE9mKHBhaXJLZXkpID09PSAtMSkgb2JqZWN0S2V5cy5wdXNoKHBhaXJLZXkpO1xuICAgIGVsc2UgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGNvbnN0cnVjdFlhbWxPbWFwKGRhdGEpIHtcbiAgcmV0dXJuIGRhdGEgIT09IG51bGwgPyBkYXRhIDogW107XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFR5cGUoJ3RhZzp5YW1sLm9yZywyMDAyOm9tYXAnLCB7XG4gIGtpbmQ6ICdzZXF1ZW5jZScsXG4gIHJlc29sdmU6IHJlc29sdmVZYW1sT21hcCxcbiAgY29uc3RydWN0OiBjb25zdHJ1Y3RZYW1sT21hcFxufSk7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgVHlwZSA9IHJlcXVpcmUoJy4uL3R5cGUnKTtcblxudmFyIF90b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbmZ1bmN0aW9uIHJlc29sdmVZYW1sUGFpcnMoZGF0YSkge1xuICBpZiAoZGF0YSA9PT0gbnVsbCkgcmV0dXJuIHRydWU7XG5cbiAgdmFyIGluZGV4LCBsZW5ndGgsIHBhaXIsIGtleXMsIHJlc3VsdCxcbiAgICAgIG9iamVjdCA9IGRhdGE7XG5cbiAgcmVzdWx0ID0gbmV3IEFycmF5KG9iamVjdC5sZW5ndGgpO1xuXG4gIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSBvYmplY3QubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgIHBhaXIgPSBvYmplY3RbaW5kZXhdO1xuXG4gICAgaWYgKF90b1N0cmluZy5jYWxsKHBhaXIpICE9PSAnW29iamVjdCBPYmplY3RdJykgcmV0dXJuIGZhbHNlO1xuXG4gICAga2V5cyA9IE9iamVjdC5rZXlzKHBhaXIpO1xuXG4gICAgaWYgKGtleXMubGVuZ3RoICE9PSAxKSByZXR1cm4gZmFsc2U7XG5cbiAgICByZXN1bHRbaW5kZXhdID0gWyBrZXlzWzBdLCBwYWlyW2tleXNbMF1dIF07XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0WWFtbFBhaXJzKGRhdGEpIHtcbiAgaWYgKGRhdGEgPT09IG51bGwpIHJldHVybiBbXTtcblxuICB2YXIgaW5kZXgsIGxlbmd0aCwgcGFpciwga2V5cywgcmVzdWx0LFxuICAgICAgb2JqZWN0ID0gZGF0YTtcblxuICByZXN1bHQgPSBuZXcgQXJyYXkob2JqZWN0Lmxlbmd0aCk7XG5cbiAgZm9yIChpbmRleCA9IDAsIGxlbmd0aCA9IG9iamVjdC5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgcGFpciA9IG9iamVjdFtpbmRleF07XG5cbiAgICBrZXlzID0gT2JqZWN0LmtleXMocGFpcik7XG5cbiAgICByZXN1bHRbaW5kZXhdID0gWyBrZXlzWzBdLCBwYWlyW2tleXNbMF1dIF07XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBUeXBlKCd0YWc6eWFtbC5vcmcsMjAwMjpwYWlycycsIHtcbiAga2luZDogJ3NlcXVlbmNlJyxcbiAgcmVzb2x2ZTogcmVzb2x2ZVlhbWxQYWlycyxcbiAgY29uc3RydWN0OiBjb25zdHJ1Y3RZYW1sUGFpcnNcbn0pO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIFR5cGUgPSByZXF1aXJlKCcuLi90eXBlJyk7XG5cbnZhciBfaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG5mdW5jdGlvbiByZXNvbHZlWWFtbFNldChkYXRhKSB7XG4gIGlmIChkYXRhID09PSBudWxsKSByZXR1cm4gdHJ1ZTtcblxuICB2YXIga2V5LCBvYmplY3QgPSBkYXRhO1xuXG4gIGZvciAoa2V5IGluIG9iamVjdCkge1xuICAgIGlmIChfaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkpIHtcbiAgICAgIGlmIChvYmplY3Rba2V5XSAhPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBjb25zdHJ1Y3RZYW1sU2V0KGRhdGEpIHtcbiAgcmV0dXJuIGRhdGEgIT09IG51bGwgPyBkYXRhIDoge307XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFR5cGUoJ3RhZzp5YW1sLm9yZywyMDAyOnNldCcsIHtcbiAga2luZDogJ21hcHBpbmcnLFxuICByZXNvbHZlOiByZXNvbHZlWWFtbFNldCxcbiAgY29uc3RydWN0OiBjb25zdHJ1Y3RZYW1sU2V0XG59KTtcbiIsICIvLyBKUy1ZQU1MJ3MgZGVmYXVsdCBzY2hlbWEgZm9yIGBzYWZlTG9hZGAgZnVuY3Rpb24uXG4vLyBJdCBpcyBub3QgZGVzY3JpYmVkIGluIHRoZSBZQU1MIHNwZWNpZmljYXRpb24uXG4vL1xuLy8gVGhpcyBzY2hlbWEgaXMgYmFzZWQgb24gc3RhbmRhcmQgWUFNTCdzIENvcmUgc2NoZW1hIGFuZCBpbmNsdWRlcyBtb3N0IG9mXG4vLyBleHRyYSB0eXBlcyBkZXNjcmliZWQgYXQgWUFNTCB0YWcgcmVwb3NpdG9yeS4gKGh0dHA6Ly95YW1sLm9yZy90eXBlLylcblxuXG4ndXNlIHN0cmljdCc7XG5cblxudmFyIFNjaGVtYSA9IHJlcXVpcmUoJy4uL3NjaGVtYScpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFNjaGVtYSh7XG4gIGluY2x1ZGU6IFtcbiAgICByZXF1aXJlKCcuL2NvcmUnKVxuICBdLFxuICBpbXBsaWNpdDogW1xuICAgIHJlcXVpcmUoJy4uL3R5cGUvdGltZXN0YW1wJyksXG4gICAgcmVxdWlyZSgnLi4vdHlwZS9tZXJnZScpXG4gIF0sXG4gIGV4cGxpY2l0OiBbXG4gICAgcmVxdWlyZSgnLi4vdHlwZS9iaW5hcnknKSxcbiAgICByZXF1aXJlKCcuLi90eXBlL29tYXAnKSxcbiAgICByZXF1aXJlKCcuLi90eXBlL3BhaXJzJyksXG4gICAgcmVxdWlyZSgnLi4vdHlwZS9zZXQnKVxuICBdXG59KTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBUeXBlID0gcmVxdWlyZSgnLi4vLi4vdHlwZScpO1xuXG5mdW5jdGlvbiByZXNvbHZlSmF2YXNjcmlwdFVuZGVmaW5lZCgpIHtcbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGNvbnN0cnVjdEphdmFzY3JpcHRVbmRlZmluZWQoKSB7XG4gIC8qZXNsaW50LWRpc2FibGUgbm8tdW5kZWZpbmVkKi9cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gcmVwcmVzZW50SmF2YXNjcmlwdFVuZGVmaW5lZCgpIHtcbiAgcmV0dXJuICcnO1xufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmplY3QgPT09ICd1bmRlZmluZWQnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBUeXBlKCd0YWc6eWFtbC5vcmcsMjAwMjpqcy91bmRlZmluZWQnLCB7XG4gIGtpbmQ6ICdzY2FsYXInLFxuICByZXNvbHZlOiByZXNvbHZlSmF2YXNjcmlwdFVuZGVmaW5lZCxcbiAgY29uc3RydWN0OiBjb25zdHJ1Y3RKYXZhc2NyaXB0VW5kZWZpbmVkLFxuICBwcmVkaWNhdGU6IGlzVW5kZWZpbmVkLFxuICByZXByZXNlbnQ6IHJlcHJlc2VudEphdmFzY3JpcHRVbmRlZmluZWRcbn0pO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIFR5cGUgPSByZXF1aXJlKCcuLi8uLi90eXBlJyk7XG5cbmZ1bmN0aW9uIHJlc29sdmVKYXZhc2NyaXB0UmVnRXhwKGRhdGEpIHtcbiAgaWYgKGRhdGEgPT09IG51bGwpIHJldHVybiBmYWxzZTtcbiAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2U7XG5cbiAgdmFyIHJlZ2V4cCA9IGRhdGEsXG4gICAgICB0YWlsICAgPSAvXFwvKFtnaW1dKikkLy5leGVjKGRhdGEpLFxuICAgICAgbW9kaWZpZXJzID0gJyc7XG5cbiAgLy8gaWYgcmVnZXhwIHN0YXJ0cyB3aXRoICcvJyBpdCBjYW4gaGF2ZSBtb2RpZmllcnMgYW5kIG11c3QgYmUgcHJvcGVybHkgY2xvc2VkXG4gIC8vIGAvZm9vL2dpbWAgLSBtb2RpZmllcnMgdGFpbCBjYW4gYmUgbWF4aW11bSAzIGNoYXJzXG4gIGlmIChyZWdleHBbMF0gPT09ICcvJykge1xuICAgIGlmICh0YWlsKSBtb2RpZmllcnMgPSB0YWlsWzFdO1xuXG4gICAgaWYgKG1vZGlmaWVycy5sZW5ndGggPiAzKSByZXR1cm4gZmFsc2U7XG4gICAgLy8gaWYgZXhwcmVzc2lvbiBzdGFydHMgd2l0aCAvLCBpcyBzaG91bGQgYmUgcHJvcGVybHkgdGVybWluYXRlZFxuICAgIGlmIChyZWdleHBbcmVnZXhwLmxlbmd0aCAtIG1vZGlmaWVycy5sZW5ndGggLSAxXSAhPT0gJy8nKSByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0SmF2YXNjcmlwdFJlZ0V4cChkYXRhKSB7XG4gIHZhciByZWdleHAgPSBkYXRhLFxuICAgICAgdGFpbCAgID0gL1xcLyhbZ2ltXSopJC8uZXhlYyhkYXRhKSxcbiAgICAgIG1vZGlmaWVycyA9ICcnO1xuXG4gIC8vIGAvZm9vL2dpbWAgLSB0YWlsIGNhbiBiZSBtYXhpbXVtIDQgY2hhcnNcbiAgaWYgKHJlZ2V4cFswXSA9PT0gJy8nKSB7XG4gICAgaWYgKHRhaWwpIG1vZGlmaWVycyA9IHRhaWxbMV07XG4gICAgcmVnZXhwID0gcmVnZXhwLnNsaWNlKDEsIHJlZ2V4cC5sZW5ndGggLSBtb2RpZmllcnMubGVuZ3RoIC0gMSk7XG4gIH1cblxuICByZXR1cm4gbmV3IFJlZ0V4cChyZWdleHAsIG1vZGlmaWVycyk7XG59XG5cbmZ1bmN0aW9uIHJlcHJlc2VudEphdmFzY3JpcHRSZWdFeHAob2JqZWN0IC8qLCBzdHlsZSovKSB7XG4gIHZhciByZXN1bHQgPSAnLycgKyBvYmplY3Quc291cmNlICsgJy8nO1xuXG4gIGlmIChvYmplY3QuZ2xvYmFsKSByZXN1bHQgKz0gJ2cnO1xuICBpZiAob2JqZWN0Lm11bHRpbGluZSkgcmVzdWx0ICs9ICdtJztcbiAgaWYgKG9iamVjdC5pZ25vcmVDYXNlKSByZXN1bHQgKz0gJ2knO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGlzUmVnRXhwKG9iamVjdCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCkgPT09ICdbb2JqZWN0IFJlZ0V4cF0nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBUeXBlKCd0YWc6eWFtbC5vcmcsMjAwMjpqcy9yZWdleHAnLCB7XG4gIGtpbmQ6ICdzY2FsYXInLFxuICByZXNvbHZlOiByZXNvbHZlSmF2YXNjcmlwdFJlZ0V4cCxcbiAgY29uc3RydWN0OiBjb25zdHJ1Y3RKYXZhc2NyaXB0UmVnRXhwLFxuICBwcmVkaWNhdGU6IGlzUmVnRXhwLFxuICByZXByZXNlbnQ6IHJlcHJlc2VudEphdmFzY3JpcHRSZWdFeHBcbn0pO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIGVzcHJpbWE7XG5cbi8vIEJyb3dzZXJpZmllZCB2ZXJzaW9uIGRvZXMgbm90IGhhdmUgZXNwcmltYVxuLy9cbi8vIDEuIEZvciBub2RlLmpzIGp1c3QgcmVxdWlyZSBtb2R1bGUgYXMgZGVwc1xuLy8gMi4gRm9yIGJyb3dzZXIgdHJ5IHRvIHJlcXVpcmUgbXVkdWxlIHZpYSBleHRlcm5hbCBBTUQgc3lzdGVtLlxuLy8gICAgSWYgbm90IGZvdW5kIC0gdHJ5IHRvIGZhbGxiYWNrIHRvIHdpbmRvdy5lc3ByaW1hLiBJZiBub3Rcbi8vICAgIGZvdW5kIHRvbyAtIHRoZW4gZmFpbCB0byBwYXJzZS5cbi8vXG50cnkge1xuICAvLyB3b3JrYXJvdW5kIHRvIGV4Y2x1ZGUgcGFja2FnZSBmcm9tIGJyb3dzZXJpZnkgbGlzdC5cbiAgdmFyIF9yZXF1aXJlID0gcmVxdWlyZTtcbiAgZXNwcmltYSA9IF9yZXF1aXJlKCdlc3ByaW1hJyk7XG59IGNhdGNoIChfKSB7XG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXJlZGVjbGFyZSAqL1xuICAvKiBnbG9iYWwgd2luZG93ICovXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgZXNwcmltYSA9IHdpbmRvdy5lc3ByaW1hO1xufVxuXG52YXIgVHlwZSA9IHJlcXVpcmUoJy4uLy4uL3R5cGUnKTtcblxuZnVuY3Rpb24gcmVzb2x2ZUphdmFzY3JpcHRGdW5jdGlvbihkYXRhKSB7XG4gIGlmIChkYXRhID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgdHJ5IHtcbiAgICB2YXIgc291cmNlID0gJygnICsgZGF0YSArICcpJyxcbiAgICAgICAgYXN0ICAgID0gZXNwcmltYS5wYXJzZShzb3VyY2UsIHsgcmFuZ2U6IHRydWUgfSk7XG5cbiAgICBpZiAoYXN0LnR5cGUgICAgICAgICAgICAgICAgICAgICE9PSAnUHJvZ3JhbScgICAgICAgICAgICAgfHxcbiAgICAgICAgYXN0LmJvZHkubGVuZ3RoICAgICAgICAgICAgICE9PSAxICAgICAgICAgICAgICAgICAgICAgfHxcbiAgICAgICAgYXN0LmJvZHlbMF0udHlwZSAgICAgICAgICAgICE9PSAnRXhwcmVzc2lvblN0YXRlbWVudCcgfHxcbiAgICAgICAgKGFzdC5ib2R5WzBdLmV4cHJlc3Npb24udHlwZSAhPT0gJ0Fycm93RnVuY3Rpb25FeHByZXNzaW9uJyAmJlxuICAgICAgICAgIGFzdC5ib2R5WzBdLmV4cHJlc3Npb24udHlwZSAhPT0gJ0Z1bmN0aW9uRXhwcmVzc2lvbicpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjb25zdHJ1Y3RKYXZhc2NyaXB0RnVuY3Rpb24oZGF0YSkge1xuICAvKmpzbGludCBldmlsOnRydWUqL1xuXG4gIHZhciBzb3VyY2UgPSAnKCcgKyBkYXRhICsgJyknLFxuICAgICAgYXN0ICAgID0gZXNwcmltYS5wYXJzZShzb3VyY2UsIHsgcmFuZ2U6IHRydWUgfSksXG4gICAgICBwYXJhbXMgPSBbXSxcbiAgICAgIGJvZHk7XG5cbiAgaWYgKGFzdC50eXBlICAgICAgICAgICAgICAgICAgICAhPT0gJ1Byb2dyYW0nICAgICAgICAgICAgIHx8XG4gICAgICBhc3QuYm9keS5sZW5ndGggICAgICAgICAgICAgIT09IDEgICAgICAgICAgICAgICAgICAgICB8fFxuICAgICAgYXN0LmJvZHlbMF0udHlwZSAgICAgICAgICAgICE9PSAnRXhwcmVzc2lvblN0YXRlbWVudCcgfHxcbiAgICAgIChhc3QuYm9keVswXS5leHByZXNzaW9uLnR5cGUgIT09ICdBcnJvd0Z1bmN0aW9uRXhwcmVzc2lvbicgJiZcbiAgICAgICAgYXN0LmJvZHlbMF0uZXhwcmVzc2lvbi50eXBlICE9PSAnRnVuY3Rpb25FeHByZXNzaW9uJykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byByZXNvbHZlIGZ1bmN0aW9uJyk7XG4gIH1cblxuICBhc3QuYm9keVswXS5leHByZXNzaW9uLnBhcmFtcy5mb3JFYWNoKGZ1bmN0aW9uIChwYXJhbSkge1xuICAgIHBhcmFtcy5wdXNoKHBhcmFtLm5hbWUpO1xuICB9KTtcblxuICBib2R5ID0gYXN0LmJvZHlbMF0uZXhwcmVzc2lvbi5ib2R5LnJhbmdlO1xuXG4gIC8vIEVzcHJpbWEncyByYW5nZXMgaW5jbHVkZSB0aGUgZmlyc3QgJ3snIGFuZCB0aGUgbGFzdCAnfScgY2hhcmFjdGVycyBvblxuICAvLyBmdW5jdGlvbiBleHByZXNzaW9ucy4gU28gY3V0IHRoZW0gb3V0LlxuICBpZiAoYXN0LmJvZHlbMF0uZXhwcmVzc2lvbi5ib2R5LnR5cGUgPT09ICdCbG9ja1N0YXRlbWVudCcpIHtcbiAgICAvKmVzbGludC1kaXNhYmxlIG5vLW5ldy1mdW5jKi9cbiAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKHBhcmFtcywgc291cmNlLnNsaWNlKGJvZHlbMF0gKyAxLCBib2R5WzFdIC0gMSkpO1xuICB9XG4gIC8vIEVTNiBhcnJvdyBmdW5jdGlvbnMgY2FuIG9taXQgdGhlIEJsb2NrU3RhdGVtZW50LiBJbiB0aGF0IGNhc2UsIGp1c3QgcmV0dXJuXG4gIC8vIHRoZSBib2R5LlxuICAvKmVzbGludC1kaXNhYmxlIG5vLW5ldy1mdW5jKi9cbiAgcmV0dXJuIG5ldyBGdW5jdGlvbihwYXJhbXMsICdyZXR1cm4gJyArIHNvdXJjZS5zbGljZShib2R5WzBdLCBib2R5WzFdKSk7XG59XG5cbmZ1bmN0aW9uIHJlcHJlc2VudEphdmFzY3JpcHRGdW5jdGlvbihvYmplY3QgLyosIHN0eWxlKi8pIHtcbiAgcmV0dXJuIG9iamVjdC50b1N0cmluZygpO1xufVxuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKG9iamVjdCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFR5cGUoJ3RhZzp5YW1sLm9yZywyMDAyOmpzL2Z1bmN0aW9uJywge1xuICBraW5kOiAnc2NhbGFyJyxcbiAgcmVzb2x2ZTogcmVzb2x2ZUphdmFzY3JpcHRGdW5jdGlvbixcbiAgY29uc3RydWN0OiBjb25zdHJ1Y3RKYXZhc2NyaXB0RnVuY3Rpb24sXG4gIHByZWRpY2F0ZTogaXNGdW5jdGlvbixcbiAgcmVwcmVzZW50OiByZXByZXNlbnRKYXZhc2NyaXB0RnVuY3Rpb25cbn0pO1xuIiwgIi8vIEpTLVlBTUwncyBkZWZhdWx0IHNjaGVtYSBmb3IgYGxvYWRgIGZ1bmN0aW9uLlxuLy8gSXQgaXMgbm90IGRlc2NyaWJlZCBpbiB0aGUgWUFNTCBzcGVjaWZpY2F0aW9uLlxuLy9cbi8vIFRoaXMgc2NoZW1hIGlzIGJhc2VkIG9uIEpTLVlBTUwncyBkZWZhdWx0IHNhZmUgc2NoZW1hIGFuZCBpbmNsdWRlc1xuLy8gSmF2YVNjcmlwdC1zcGVjaWZpYyB0eXBlczogISFqcy91bmRlZmluZWQsICEhanMvcmVnZXhwIGFuZCAhIWpzL2Z1bmN0aW9uLlxuLy9cbi8vIEFsc28gdGhpcyBzY2hlbWEgaXMgdXNlZCBhcyBkZWZhdWx0IGJhc2Ugc2NoZW1hIGF0IGBTY2hlbWEuY3JlYXRlYCBmdW5jdGlvbi5cblxuXG4ndXNlIHN0cmljdCc7XG5cblxudmFyIFNjaGVtYSA9IHJlcXVpcmUoJy4uL3NjaGVtYScpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gU2NoZW1hLkRFRkFVTFQgPSBuZXcgU2NoZW1hKHtcbiAgaW5jbHVkZTogW1xuICAgIHJlcXVpcmUoJy4vZGVmYXVsdF9zYWZlJylcbiAgXSxcbiAgZXhwbGljaXQ6IFtcbiAgICByZXF1aXJlKCcuLi90eXBlL2pzL3VuZGVmaW5lZCcpLFxuICAgIHJlcXVpcmUoJy4uL3R5cGUvanMvcmVnZXhwJyksXG4gICAgcmVxdWlyZSgnLi4vdHlwZS9qcy9mdW5jdGlvbicpXG4gIF1cbn0pO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuLyplc2xpbnQtZGlzYWJsZSBtYXgtbGVuLG5vLXVzZS1iZWZvcmUtZGVmaW5lKi9cblxudmFyIGNvbW1vbiAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL2NvbW1vbicpO1xudmFyIFlBTUxFeGNlcHRpb24gICAgICAgPSByZXF1aXJlKCcuL2V4Y2VwdGlvbicpO1xudmFyIE1hcmsgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL21hcmsnKTtcbnZhciBERUZBVUxUX1NBRkVfU0NIRU1BID0gcmVxdWlyZSgnLi9zY2hlbWEvZGVmYXVsdF9zYWZlJyk7XG52YXIgREVGQVVMVF9GVUxMX1NDSEVNQSA9IHJlcXVpcmUoJy4vc2NoZW1hL2RlZmF1bHRfZnVsbCcpO1xuXG5cbnZhciBfaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG5cbnZhciBDT05URVhUX0ZMT1dfSU4gICA9IDE7XG52YXIgQ09OVEVYVF9GTE9XX09VVCAgPSAyO1xudmFyIENPTlRFWFRfQkxPQ0tfSU4gID0gMztcbnZhciBDT05URVhUX0JMT0NLX09VVCA9IDQ7XG5cblxudmFyIENIT01QSU5HX0NMSVAgID0gMTtcbnZhciBDSE9NUElOR19TVFJJUCA9IDI7XG52YXIgQ0hPTVBJTkdfS0VFUCAgPSAzO1xuXG5cbnZhciBQQVRURVJOX05PTl9QUklOVEFCTEUgICAgICAgICA9IC9bXFx4MDAtXFx4MDhcXHgwQlxceDBDXFx4MEUtXFx4MUZcXHg3Ri1cXHg4NFxceDg2LVxceDlGXFx1RkZGRVxcdUZGRkZdfFtcXHVEODAwLVxcdURCRkZdKD8hW1xcdURDMDAtXFx1REZGRl0pfCg/OlteXFx1RDgwMC1cXHVEQkZGXXxeKVtcXHVEQzAwLVxcdURGRkZdLztcbnZhciBQQVRURVJOX05PTl9BU0NJSV9MSU5FX0JSRUFLUyA9IC9bXFx4ODVcXHUyMDI4XFx1MjAyOV0vO1xudmFyIFBBVFRFUk5fRkxPV19JTkRJQ0FUT1JTICAgICAgID0gL1ssXFxbXFxdXFx7XFx9XS87XG52YXIgUEFUVEVSTl9UQUdfSEFORExFICAgICAgICAgICAgPSAvXig/OiF8ISF8IVthLXpcXC1dKyEpJC9pO1xudmFyIFBBVFRFUk5fVEFHX1VSSSAgICAgICAgICAgICAgID0gL14oPzohfFteLFxcW1xcXVxce1xcfV0pKD86JVswLTlhLWZdezJ9fFswLTlhLXpcXC0jO1xcL1xcPzpAJj1cXCtcXCQsX1xcLiF+XFwqJ1xcKFxcKVxcW1xcXV0pKiQvaTtcblxuXG5mdW5jdGlvbiBfY2xhc3Mob2JqKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKTsgfVxuXG5mdW5jdGlvbiBpc19FT0woYykge1xuICByZXR1cm4gKGMgPT09IDB4MEEvKiBMRiAqLykgfHwgKGMgPT09IDB4MEQvKiBDUiAqLyk7XG59XG5cbmZ1bmN0aW9uIGlzX1dISVRFX1NQQUNFKGMpIHtcbiAgcmV0dXJuIChjID09PSAweDA5LyogVGFiICovKSB8fCAoYyA9PT0gMHgyMC8qIFNwYWNlICovKTtcbn1cblxuZnVuY3Rpb24gaXNfV1NfT1JfRU9MKGMpIHtcbiAgcmV0dXJuIChjID09PSAweDA5LyogVGFiICovKSB8fFxuICAgICAgICAgKGMgPT09IDB4MjAvKiBTcGFjZSAqLykgfHxcbiAgICAgICAgIChjID09PSAweDBBLyogTEYgKi8pIHx8XG4gICAgICAgICAoYyA9PT0gMHgwRC8qIENSICovKTtcbn1cblxuZnVuY3Rpb24gaXNfRkxPV19JTkRJQ0FUT1IoYykge1xuICByZXR1cm4gYyA9PT0gMHgyQy8qICwgKi8gfHxcbiAgICAgICAgIGMgPT09IDB4NUIvKiBbICovIHx8XG4gICAgICAgICBjID09PSAweDVELyogXSAqLyB8fFxuICAgICAgICAgYyA9PT0gMHg3Qi8qIHsgKi8gfHxcbiAgICAgICAgIGMgPT09IDB4N0QvKiB9ICovO1xufVxuXG5mdW5jdGlvbiBmcm9tSGV4Q29kZShjKSB7XG4gIHZhciBsYztcblxuICBpZiAoKDB4MzAvKiAwICovIDw9IGMpICYmIChjIDw9IDB4MzkvKiA5ICovKSkge1xuICAgIHJldHVybiBjIC0gMHgzMDtcbiAgfVxuXG4gIC8qZXNsaW50LWRpc2FibGUgbm8tYml0d2lzZSovXG4gIGxjID0gYyB8IDB4MjA7XG5cbiAgaWYgKCgweDYxLyogYSAqLyA8PSBsYykgJiYgKGxjIDw9IDB4NjYvKiBmICovKSkge1xuICAgIHJldHVybiBsYyAtIDB4NjEgKyAxMDtcbiAgfVxuXG4gIHJldHVybiAtMTtcbn1cblxuZnVuY3Rpb24gZXNjYXBlZEhleExlbihjKSB7XG4gIGlmIChjID09PSAweDc4LyogeCAqLykgeyByZXR1cm4gMjsgfVxuICBpZiAoYyA9PT0gMHg3NS8qIHUgKi8pIHsgcmV0dXJuIDQ7IH1cbiAgaWYgKGMgPT09IDB4NTUvKiBVICovKSB7IHJldHVybiA4OyB9XG4gIHJldHVybiAwO1xufVxuXG5mdW5jdGlvbiBmcm9tRGVjaW1hbENvZGUoYykge1xuICBpZiAoKDB4MzAvKiAwICovIDw9IGMpICYmIChjIDw9IDB4MzkvKiA5ICovKSkge1xuICAgIHJldHVybiBjIC0gMHgzMDtcbiAgfVxuXG4gIHJldHVybiAtMTtcbn1cblxuZnVuY3Rpb24gc2ltcGxlRXNjYXBlU2VxdWVuY2UoYykge1xuICAvKiBlc2xpbnQtZGlzYWJsZSBpbmRlbnQgKi9cbiAgcmV0dXJuIChjID09PSAweDMwLyogMCAqLykgPyAnXFx4MDAnIDpcbiAgICAgICAgKGMgPT09IDB4NjEvKiBhICovKSA/ICdcXHgwNycgOlxuICAgICAgICAoYyA9PT0gMHg2Mi8qIGIgKi8pID8gJ1xceDA4JyA6XG4gICAgICAgIChjID09PSAweDc0LyogdCAqLykgPyAnXFx4MDknIDpcbiAgICAgICAgKGMgPT09IDB4MDkvKiBUYWIgKi8pID8gJ1xceDA5JyA6XG4gICAgICAgIChjID09PSAweDZFLyogbiAqLykgPyAnXFx4MEEnIDpcbiAgICAgICAgKGMgPT09IDB4NzYvKiB2ICovKSA/ICdcXHgwQicgOlxuICAgICAgICAoYyA9PT0gMHg2Ni8qIGYgKi8pID8gJ1xceDBDJyA6XG4gICAgICAgIChjID09PSAweDcyLyogciAqLykgPyAnXFx4MEQnIDpcbiAgICAgICAgKGMgPT09IDB4NjUvKiBlICovKSA/ICdcXHgxQicgOlxuICAgICAgICAoYyA9PT0gMHgyMC8qIFNwYWNlICovKSA/ICcgJyA6XG4gICAgICAgIChjID09PSAweDIyLyogXCIgKi8pID8gJ1xceDIyJyA6XG4gICAgICAgIChjID09PSAweDJGLyogLyAqLykgPyAnLycgOlxuICAgICAgICAoYyA9PT0gMHg1Qy8qIFxcICovKSA/ICdcXHg1QycgOlxuICAgICAgICAoYyA9PT0gMHg0RS8qIE4gKi8pID8gJ1xceDg1JyA6XG4gICAgICAgIChjID09PSAweDVGLyogXyAqLykgPyAnXFx4QTAnIDpcbiAgICAgICAgKGMgPT09IDB4NEMvKiBMICovKSA/ICdcXHUyMDI4JyA6XG4gICAgICAgIChjID09PSAweDUwLyogUCAqLykgPyAnXFx1MjAyOScgOiAnJztcbn1cblxuZnVuY3Rpb24gY2hhckZyb21Db2RlcG9pbnQoYykge1xuICBpZiAoYyA8PSAweEZGRkYpIHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShjKTtcbiAgfVxuICAvLyBFbmNvZGUgVVRGLTE2IHN1cnJvZ2F0ZSBwYWlyXG4gIC8vIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1VURi0xNiNDb2RlX3BvaW50c19VLjJCMDEwMDAwX3RvX1UuMkIxMEZGRkZcbiAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoXG4gICAgKChjIC0gMHgwMTAwMDApID4+IDEwKSArIDB4RDgwMCxcbiAgICAoKGMgLSAweDAxMDAwMCkgJiAweDAzRkYpICsgMHhEQzAwXG4gICk7XG59XG5cbi8vIHNldCBhIHByb3BlcnR5IG9mIGEgbGl0ZXJhbCBvYmplY3QsIHdoaWxlIHByb3RlY3RpbmcgYWdhaW5zdCBwcm90b3R5cGUgcG9sbHV0aW9uLFxuLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlY2EvanMteWFtbC9pc3N1ZXMvMTY0IGZvciBtb3JlIGRldGFpbHNcbmZ1bmN0aW9uIHNldFByb3BlcnR5KG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICAvLyB1c2VkIGZvciB0aGlzIHNwZWNpZmljIGtleSBvbmx5IGJlY2F1c2UgT2JqZWN0LmRlZmluZVByb3BlcnR5IGlzIHNsb3dcbiAgaWYgKGtleSA9PT0gJ19fcHJvdG9fXycpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBrZXksIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIHZhbHVlOiB2YWx1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIH1cbn1cblxudmFyIHNpbXBsZUVzY2FwZUNoZWNrID0gbmV3IEFycmF5KDI1Nik7IC8vIGludGVnZXIsIGZvciBmYXN0IGFjY2Vzc1xudmFyIHNpbXBsZUVzY2FwZU1hcCA9IG5ldyBBcnJheSgyNTYpO1xuZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7IGkrKykge1xuICBzaW1wbGVFc2NhcGVDaGVja1tpXSA9IHNpbXBsZUVzY2FwZVNlcXVlbmNlKGkpID8gMSA6IDA7XG4gIHNpbXBsZUVzY2FwZU1hcFtpXSA9IHNpbXBsZUVzY2FwZVNlcXVlbmNlKGkpO1xufVxuXG5cbmZ1bmN0aW9uIFN0YXRlKGlucHV0LCBvcHRpb25zKSB7XG4gIHRoaXMuaW5wdXQgPSBpbnB1dDtcblxuICB0aGlzLmZpbGVuYW1lICA9IG9wdGlvbnNbJ2ZpbGVuYW1lJ10gIHx8IG51bGw7XG4gIHRoaXMuc2NoZW1hICAgID0gb3B0aW9uc1snc2NoZW1hJ10gICAgfHwgREVGQVVMVF9GVUxMX1NDSEVNQTtcbiAgdGhpcy5vbldhcm5pbmcgPSBvcHRpb25zWydvbldhcm5pbmcnXSB8fCBudWxsO1xuICB0aGlzLmxlZ2FjeSAgICA9IG9wdGlvbnNbJ2xlZ2FjeSddICAgIHx8IGZhbHNlO1xuICB0aGlzLmpzb24gICAgICA9IG9wdGlvbnNbJ2pzb24nXSAgICAgIHx8IGZhbHNlO1xuICB0aGlzLmxpc3RlbmVyICA9IG9wdGlvbnNbJ2xpc3RlbmVyJ10gIHx8IG51bGw7XG5cbiAgdGhpcy5pbXBsaWNpdFR5cGVzID0gdGhpcy5zY2hlbWEuY29tcGlsZWRJbXBsaWNpdDtcbiAgdGhpcy50eXBlTWFwICAgICAgID0gdGhpcy5zY2hlbWEuY29tcGlsZWRUeXBlTWFwO1xuXG4gIHRoaXMubGVuZ3RoICAgICA9IGlucHV0Lmxlbmd0aDtcbiAgdGhpcy5wb3NpdGlvbiAgID0gMDtcbiAgdGhpcy5saW5lICAgICAgID0gMDtcbiAgdGhpcy5saW5lU3RhcnQgID0gMDtcbiAgdGhpcy5saW5lSW5kZW50ID0gMDtcblxuICB0aGlzLmRvY3VtZW50cyA9IFtdO1xuXG4gIC8qXG4gIHRoaXMudmVyc2lvbjtcbiAgdGhpcy5jaGVja0xpbmVCcmVha3M7XG4gIHRoaXMudGFnTWFwO1xuICB0aGlzLmFuY2hvck1hcDtcbiAgdGhpcy50YWc7XG4gIHRoaXMuYW5jaG9yO1xuICB0aGlzLmtpbmQ7XG4gIHRoaXMucmVzdWx0OyovXG5cbn1cblxuXG5mdW5jdGlvbiBnZW5lcmF0ZUVycm9yKHN0YXRlLCBtZXNzYWdlKSB7XG4gIHJldHVybiBuZXcgWUFNTEV4Y2VwdGlvbihcbiAgICBtZXNzYWdlLFxuICAgIG5ldyBNYXJrKHN0YXRlLmZpbGVuYW1lLCBzdGF0ZS5pbnB1dCwgc3RhdGUucG9zaXRpb24sIHN0YXRlLmxpbmUsIChzdGF0ZS5wb3NpdGlvbiAtIHN0YXRlLmxpbmVTdGFydCkpKTtcbn1cblxuZnVuY3Rpb24gdGhyb3dFcnJvcihzdGF0ZSwgbWVzc2FnZSkge1xuICB0aHJvdyBnZW5lcmF0ZUVycm9yKHN0YXRlLCBtZXNzYWdlKTtcbn1cblxuZnVuY3Rpb24gdGhyb3dXYXJuaW5nKHN0YXRlLCBtZXNzYWdlKSB7XG4gIGlmIChzdGF0ZS5vbldhcm5pbmcpIHtcbiAgICBzdGF0ZS5vbldhcm5pbmcuY2FsbChudWxsLCBnZW5lcmF0ZUVycm9yKHN0YXRlLCBtZXNzYWdlKSk7XG4gIH1cbn1cblxuXG52YXIgZGlyZWN0aXZlSGFuZGxlcnMgPSB7XG5cbiAgWUFNTDogZnVuY3Rpb24gaGFuZGxlWWFtbERpcmVjdGl2ZShzdGF0ZSwgbmFtZSwgYXJncykge1xuXG4gICAgdmFyIG1hdGNoLCBtYWpvciwgbWlub3I7XG5cbiAgICBpZiAoc3RhdGUudmVyc2lvbiAhPT0gbnVsbCkge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2R1cGxpY2F0aW9uIG9mICVZQU1MIGRpcmVjdGl2ZScpO1xuICAgIH1cblxuICAgIGlmIChhcmdzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ1lBTUwgZGlyZWN0aXZlIGFjY2VwdHMgZXhhY3RseSBvbmUgYXJndW1lbnQnKTtcbiAgICB9XG5cbiAgICBtYXRjaCA9IC9eKFswLTldKylcXC4oWzAtOV0rKSQvLmV4ZWMoYXJnc1swXSk7XG5cbiAgICBpZiAobWF0Y2ggPT09IG51bGwpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdpbGwtZm9ybWVkIGFyZ3VtZW50IG9mIHRoZSBZQU1MIGRpcmVjdGl2ZScpO1xuICAgIH1cblxuICAgIG1ham9yID0gcGFyc2VJbnQobWF0Y2hbMV0sIDEwKTtcbiAgICBtaW5vciA9IHBhcnNlSW50KG1hdGNoWzJdLCAxMCk7XG5cbiAgICBpZiAobWFqb3IgIT09IDEpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICd1bmFjY2VwdGFibGUgWUFNTCB2ZXJzaW9uIG9mIHRoZSBkb2N1bWVudCcpO1xuICAgIH1cblxuICAgIHN0YXRlLnZlcnNpb24gPSBhcmdzWzBdO1xuICAgIHN0YXRlLmNoZWNrTGluZUJyZWFrcyA9IChtaW5vciA8IDIpO1xuXG4gICAgaWYgKG1pbm9yICE9PSAxICYmIG1pbm9yICE9PSAyKSB7XG4gICAgICB0aHJvd1dhcm5pbmcoc3RhdGUsICd1bnN1cHBvcnRlZCBZQU1MIHZlcnNpb24gb2YgdGhlIGRvY3VtZW50Jyk7XG4gICAgfVxuICB9LFxuXG4gIFRBRzogZnVuY3Rpb24gaGFuZGxlVGFnRGlyZWN0aXZlKHN0YXRlLCBuYW1lLCBhcmdzKSB7XG5cbiAgICB2YXIgaGFuZGxlLCBwcmVmaXg7XG5cbiAgICBpZiAoYXJncy5sZW5ndGggIT09IDIpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdUQUcgZGlyZWN0aXZlIGFjY2VwdHMgZXhhY3RseSB0d28gYXJndW1lbnRzJyk7XG4gICAgfVxuXG4gICAgaGFuZGxlID0gYXJnc1swXTtcbiAgICBwcmVmaXggPSBhcmdzWzFdO1xuXG4gICAgaWYgKCFQQVRURVJOX1RBR19IQU5ETEUudGVzdChoYW5kbGUpKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnaWxsLWZvcm1lZCB0YWcgaGFuZGxlIChmaXJzdCBhcmd1bWVudCkgb2YgdGhlIFRBRyBkaXJlY3RpdmUnKTtcbiAgICB9XG5cbiAgICBpZiAoX2hhc093blByb3BlcnR5LmNhbGwoc3RhdGUudGFnTWFwLCBoYW5kbGUpKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAndGhlcmUgaXMgYSBwcmV2aW91c2x5IGRlY2xhcmVkIHN1ZmZpeCBmb3IgXCInICsgaGFuZGxlICsgJ1wiIHRhZyBoYW5kbGUnKTtcbiAgICB9XG5cbiAgICBpZiAoIVBBVFRFUk5fVEFHX1VSSS50ZXN0KHByZWZpeCkpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdpbGwtZm9ybWVkIHRhZyBwcmVmaXggKHNlY29uZCBhcmd1bWVudCkgb2YgdGhlIFRBRyBkaXJlY3RpdmUnKTtcbiAgICB9XG5cbiAgICBzdGF0ZS50YWdNYXBbaGFuZGxlXSA9IHByZWZpeDtcbiAgfVxufTtcblxuXG5mdW5jdGlvbiBjYXB0dXJlU2VnbWVudChzdGF0ZSwgc3RhcnQsIGVuZCwgY2hlY2tKc29uKSB7XG4gIHZhciBfcG9zaXRpb24sIF9sZW5ndGgsIF9jaGFyYWN0ZXIsIF9yZXN1bHQ7XG5cbiAgaWYgKHN0YXJ0IDwgZW5kKSB7XG4gICAgX3Jlc3VsdCA9IHN0YXRlLmlucHV0LnNsaWNlKHN0YXJ0LCBlbmQpO1xuXG4gICAgaWYgKGNoZWNrSnNvbikge1xuICAgICAgZm9yIChfcG9zaXRpb24gPSAwLCBfbGVuZ3RoID0gX3Jlc3VsdC5sZW5ndGg7IF9wb3NpdGlvbiA8IF9sZW5ndGg7IF9wb3NpdGlvbiArPSAxKSB7XG4gICAgICAgIF9jaGFyYWN0ZXIgPSBfcmVzdWx0LmNoYXJDb2RlQXQoX3Bvc2l0aW9uKTtcbiAgICAgICAgaWYgKCEoX2NoYXJhY3RlciA9PT0gMHgwOSB8fFxuICAgICAgICAgICAgICAoMHgyMCA8PSBfY2hhcmFjdGVyICYmIF9jaGFyYWN0ZXIgPD0gMHgxMEZGRkYpKSkge1xuICAgICAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdleHBlY3RlZCB2YWxpZCBKU09OIGNoYXJhY3RlcicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChQQVRURVJOX05PTl9QUklOVEFCTEUudGVzdChfcmVzdWx0KSkge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3RoZSBzdHJlYW0gY29udGFpbnMgbm9uLXByaW50YWJsZSBjaGFyYWN0ZXJzJyk7XG4gICAgfVxuXG4gICAgc3RhdGUucmVzdWx0ICs9IF9yZXN1bHQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWVyZ2VNYXBwaW5ncyhzdGF0ZSwgZGVzdGluYXRpb24sIHNvdXJjZSwgb3ZlcnJpZGFibGVLZXlzKSB7XG4gIHZhciBzb3VyY2VLZXlzLCBrZXksIGluZGV4LCBxdWFudGl0eTtcblxuICBpZiAoIWNvbW1vbi5pc09iamVjdChzb3VyY2UpKSB7XG4gICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2Nhbm5vdCBtZXJnZSBtYXBwaW5nczsgdGhlIHByb3ZpZGVkIHNvdXJjZSBvYmplY3QgaXMgdW5hY2NlcHRhYmxlJyk7XG4gIH1cblxuICBzb3VyY2VLZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcblxuICBmb3IgKGluZGV4ID0gMCwgcXVhbnRpdHkgPSBzb3VyY2VLZXlzLmxlbmd0aDsgaW5kZXggPCBxdWFudGl0eTsgaW5kZXggKz0gMSkge1xuICAgIGtleSA9IHNvdXJjZUtleXNbaW5kZXhdO1xuXG4gICAgaWYgKCFfaGFzT3duUHJvcGVydHkuY2FsbChkZXN0aW5hdGlvbiwga2V5KSkge1xuICAgICAgc2V0UHJvcGVydHkoZGVzdGluYXRpb24sIGtleSwgc291cmNlW2tleV0pO1xuICAgICAgb3ZlcnJpZGFibGVLZXlzW2tleV0gPSB0cnVlO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBzdG9yZU1hcHBpbmdQYWlyKHN0YXRlLCBfcmVzdWx0LCBvdmVycmlkYWJsZUtleXMsIGtleVRhZywga2V5Tm9kZSwgdmFsdWVOb2RlLCBzdGFydExpbmUsIHN0YXJ0UG9zKSB7XG4gIHZhciBpbmRleCwgcXVhbnRpdHk7XG5cbiAgLy8gVGhlIG91dHB1dCBpcyBhIHBsYWluIG9iamVjdCBoZXJlLCBzbyBrZXlzIGNhbiBvbmx5IGJlIHN0cmluZ3MuXG4gIC8vIFdlIG5lZWQgdG8gY29udmVydCBrZXlOb2RlIHRvIGEgc3RyaW5nLCBidXQgZG9pbmcgc28gY2FuIGhhbmcgdGhlIHByb2Nlc3NcbiAgLy8gKGRlZXBseSBuZXN0ZWQgYXJyYXlzIHRoYXQgZXhwbG9kZSBleHBvbmVudGlhbGx5IHVzaW5nIGFsaWFzZXMpLlxuICBpZiAoQXJyYXkuaXNBcnJheShrZXlOb2RlKSkge1xuICAgIGtleU5vZGUgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChrZXlOb2RlKTtcblxuICAgIGZvciAoaW5kZXggPSAwLCBxdWFudGl0eSA9IGtleU5vZGUubGVuZ3RoOyBpbmRleCA8IHF1YW50aXR5OyBpbmRleCArPSAxKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShrZXlOb2RlW2luZGV4XSkpIHtcbiAgICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ25lc3RlZCBhcnJheXMgYXJlIG5vdCBzdXBwb3J0ZWQgaW5zaWRlIGtleXMnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBrZXlOb2RlID09PSAnb2JqZWN0JyAmJiBfY2xhc3Moa2V5Tm9kZVtpbmRleF0pID09PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgICAgICBrZXlOb2RlW2luZGV4XSA9ICdbb2JqZWN0IE9iamVjdF0nO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIEF2b2lkIGNvZGUgZXhlY3V0aW9uIGluIGxvYWQoKSB2aWEgdG9TdHJpbmcgcHJvcGVydHlcbiAgLy8gKHN0aWxsIHVzZSBpdHMgb3duIHRvU3RyaW5nIGZvciBhcnJheXMsIHRpbWVzdGFtcHMsXG4gIC8vIGFuZCB3aGF0ZXZlciB1c2VyIHNjaGVtYSBleHRlbnNpb25zIGhhcHBlbiB0byBoYXZlIEBAdG9TdHJpbmdUYWcpXG4gIGlmICh0eXBlb2Yga2V5Tm9kZSA9PT0gJ29iamVjdCcgJiYgX2NsYXNzKGtleU5vZGUpID09PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgIGtleU5vZGUgPSAnW29iamVjdCBPYmplY3RdJztcbiAgfVxuXG5cbiAga2V5Tm9kZSA9IFN0cmluZyhrZXlOb2RlKTtcblxuICBpZiAoX3Jlc3VsdCA9PT0gbnVsbCkge1xuICAgIF9yZXN1bHQgPSB7fTtcbiAgfVxuXG4gIGlmIChrZXlUYWcgPT09ICd0YWc6eWFtbC5vcmcsMjAwMjptZXJnZScpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZU5vZGUpKSB7XG4gICAgICBmb3IgKGluZGV4ID0gMCwgcXVhbnRpdHkgPSB2YWx1ZU5vZGUubGVuZ3RoOyBpbmRleCA8IHF1YW50aXR5OyBpbmRleCArPSAxKSB7XG4gICAgICAgIG1lcmdlTWFwcGluZ3Moc3RhdGUsIF9yZXN1bHQsIHZhbHVlTm9kZVtpbmRleF0sIG92ZXJyaWRhYmxlS2V5cyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG1lcmdlTWFwcGluZ3Moc3RhdGUsIF9yZXN1bHQsIHZhbHVlTm9kZSwgb3ZlcnJpZGFibGVLZXlzKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKCFzdGF0ZS5qc29uICYmXG4gICAgICAgICFfaGFzT3duUHJvcGVydHkuY2FsbChvdmVycmlkYWJsZUtleXMsIGtleU5vZGUpICYmXG4gICAgICAgIF9oYXNPd25Qcm9wZXJ0eS5jYWxsKF9yZXN1bHQsIGtleU5vZGUpKSB7XG4gICAgICBzdGF0ZS5saW5lID0gc3RhcnRMaW5lIHx8IHN0YXRlLmxpbmU7XG4gICAgICBzdGF0ZS5wb3NpdGlvbiA9IHN0YXJ0UG9zIHx8IHN0YXRlLnBvc2l0aW9uO1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2R1cGxpY2F0ZWQgbWFwcGluZyBrZXknKTtcbiAgICB9XG4gICAgc2V0UHJvcGVydHkoX3Jlc3VsdCwga2V5Tm9kZSwgdmFsdWVOb2RlKTtcbiAgICBkZWxldGUgb3ZlcnJpZGFibGVLZXlzW2tleU5vZGVdO1xuICB9XG5cbiAgcmV0dXJuIF9yZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIHJlYWRMaW5lQnJlYWsoc3RhdGUpIHtcbiAgdmFyIGNoO1xuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG5cbiAgaWYgKGNoID09PSAweDBBLyogTEYgKi8pIHtcbiAgICBzdGF0ZS5wb3NpdGlvbisrO1xuICB9IGVsc2UgaWYgKGNoID09PSAweDBELyogQ1IgKi8pIHtcbiAgICBzdGF0ZS5wb3NpdGlvbisrO1xuICAgIGlmIChzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKSA9PT0gMHgwQS8qIExGICovKSB7XG4gICAgICBzdGF0ZS5wb3NpdGlvbisrO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvd0Vycm9yKHN0YXRlLCAnYSBsaW5lIGJyZWFrIGlzIGV4cGVjdGVkJyk7XG4gIH1cblxuICBzdGF0ZS5saW5lICs9IDE7XG4gIHN0YXRlLmxpbmVTdGFydCA9IHN0YXRlLnBvc2l0aW9uO1xufVxuXG5mdW5jdGlvbiBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCBhbGxvd0NvbW1lbnRzLCBjaGVja0luZGVudCkge1xuICB2YXIgbGluZUJyZWFrcyA9IDAsXG4gICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gIHdoaWxlIChjaCAhPT0gMCkge1xuICAgIHdoaWxlIChpc19XSElURV9TUEFDRShjaCkpIHtcbiAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICBpZiAoYWxsb3dDb21tZW50cyAmJiBjaCA9PT0gMHgyMy8qICMgKi8pIHtcbiAgICAgIGRvIHtcbiAgICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgICAgfSB3aGlsZSAoY2ggIT09IDB4MEEvKiBMRiAqLyAmJiBjaCAhPT0gMHgwRC8qIENSICovICYmIGNoICE9PSAwKTtcbiAgICB9XG5cbiAgICBpZiAoaXNfRU9MKGNoKSkge1xuICAgICAgcmVhZExpbmVCcmVhayhzdGF0ZSk7XG5cbiAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG4gICAgICBsaW5lQnJlYWtzKys7XG4gICAgICBzdGF0ZS5saW5lSW5kZW50ID0gMDtcblxuICAgICAgd2hpbGUgKGNoID09PSAweDIwLyogU3BhY2UgKi8pIHtcbiAgICAgICAgc3RhdGUubGluZUluZGVudCsrO1xuICAgICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGlmIChjaGVja0luZGVudCAhPT0gLTEgJiYgbGluZUJyZWFrcyAhPT0gMCAmJiBzdGF0ZS5saW5lSW5kZW50IDwgY2hlY2tJbmRlbnQpIHtcbiAgICB0aHJvd1dhcm5pbmcoc3RhdGUsICdkZWZpY2llbnQgaW5kZW50YXRpb24nKTtcbiAgfVxuXG4gIHJldHVybiBsaW5lQnJlYWtzO1xufVxuXG5mdW5jdGlvbiB0ZXN0RG9jdW1lbnRTZXBhcmF0b3Ioc3RhdGUpIHtcbiAgdmFyIF9wb3NpdGlvbiA9IHN0YXRlLnBvc2l0aW9uLFxuICAgICAgY2g7XG5cbiAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KF9wb3NpdGlvbik7XG5cbiAgLy8gQ29uZGl0aW9uIHN0YXRlLnBvc2l0aW9uID09PSBzdGF0ZS5saW5lU3RhcnQgaXMgdGVzdGVkXG4gIC8vIGluIHBhcmVudCBvbiBlYWNoIGNhbGwsIGZvciBlZmZpY2llbmN5LiBObyBuZWVkcyB0byB0ZXN0IGhlcmUgYWdhaW4uXG4gIGlmICgoY2ggPT09IDB4MkQvKiAtICovIHx8IGNoID09PSAweDJFLyogLiAqLykgJiZcbiAgICAgIGNoID09PSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KF9wb3NpdGlvbiArIDEpICYmXG4gICAgICBjaCA9PT0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChfcG9zaXRpb24gKyAyKSkge1xuXG4gICAgX3Bvc2l0aW9uICs9IDM7XG5cbiAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoX3Bvc2l0aW9uKTtcblxuICAgIGlmIChjaCA9PT0gMCB8fCBpc19XU19PUl9FT0woY2gpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHdyaXRlRm9sZGVkTGluZXMoc3RhdGUsIGNvdW50KSB7XG4gIGlmIChjb3VudCA9PT0gMSkge1xuICAgIHN0YXRlLnJlc3VsdCArPSAnICc7XG4gIH0gZWxzZSBpZiAoY291bnQgPiAxKSB7XG4gICAgc3RhdGUucmVzdWx0ICs9IGNvbW1vbi5yZXBlYXQoJ1xcbicsIGNvdW50IC0gMSk7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiByZWFkUGxhaW5TY2FsYXIoc3RhdGUsIG5vZGVJbmRlbnQsIHdpdGhpbkZsb3dDb2xsZWN0aW9uKSB7XG4gIHZhciBwcmVjZWRpbmcsXG4gICAgICBmb2xsb3dpbmcsXG4gICAgICBjYXB0dXJlU3RhcnQsXG4gICAgICBjYXB0dXJlRW5kLFxuICAgICAgaGFzUGVuZGluZ0NvbnRlbnQsXG4gICAgICBfbGluZSxcbiAgICAgIF9saW5lU3RhcnQsXG4gICAgICBfbGluZUluZGVudCxcbiAgICAgIF9raW5kID0gc3RhdGUua2luZCxcbiAgICAgIF9yZXN1bHQgPSBzdGF0ZS5yZXN1bHQsXG4gICAgICBjaDtcblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gIGlmIChpc19XU19PUl9FT0woY2gpICAgICAgfHxcbiAgICAgIGlzX0ZMT1dfSU5ESUNBVE9SKGNoKSB8fFxuICAgICAgY2ggPT09IDB4MjMvKiAjICovICAgIHx8XG4gICAgICBjaCA9PT0gMHgyNi8qICYgKi8gICAgfHxcbiAgICAgIGNoID09PSAweDJBLyogKiAqLyAgICB8fFxuICAgICAgY2ggPT09IDB4MjEvKiAhICovICAgIHx8XG4gICAgICBjaCA9PT0gMHg3Qy8qIHwgKi8gICAgfHxcbiAgICAgIGNoID09PSAweDNFLyogPiAqLyAgICB8fFxuICAgICAgY2ggPT09IDB4MjcvKiAnICovICAgIHx8XG4gICAgICBjaCA9PT0gMHgyMi8qIFwiICovICAgIHx8XG4gICAgICBjaCA9PT0gMHgyNS8qICUgKi8gICAgfHxcbiAgICAgIGNoID09PSAweDQwLyogQCAqLyAgICB8fFxuICAgICAgY2ggPT09IDB4NjAvKiBgICovKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKGNoID09PSAweDNGLyogPyAqLyB8fCBjaCA9PT0gMHgyRC8qIC0gKi8pIHtcbiAgICBmb2xsb3dpbmcgPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uICsgMSk7XG5cbiAgICBpZiAoaXNfV1NfT1JfRU9MKGZvbGxvd2luZykgfHxcbiAgICAgICAgd2l0aGluRmxvd0NvbGxlY3Rpb24gJiYgaXNfRkxPV19JTkRJQ0FUT1IoZm9sbG93aW5nKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRlLmtpbmQgPSAnc2NhbGFyJztcbiAgc3RhdGUucmVzdWx0ID0gJyc7XG4gIGNhcHR1cmVTdGFydCA9IGNhcHR1cmVFbmQgPSBzdGF0ZS5wb3NpdGlvbjtcbiAgaGFzUGVuZGluZ0NvbnRlbnQgPSBmYWxzZTtcblxuICB3aGlsZSAoY2ggIT09IDApIHtcbiAgICBpZiAoY2ggPT09IDB4M0EvKiA6ICovKSB7XG4gICAgICBmb2xsb3dpbmcgPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uICsgMSk7XG5cbiAgICAgIGlmIChpc19XU19PUl9FT0woZm9sbG93aW5nKSB8fFxuICAgICAgICAgIHdpdGhpbkZsb3dDb2xsZWN0aW9uICYmIGlzX0ZMT1dfSU5ESUNBVE9SKGZvbGxvd2luZykpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICB9IGVsc2UgaWYgKGNoID09PSAweDIzLyogIyAqLykge1xuICAgICAgcHJlY2VkaW5nID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbiAtIDEpO1xuXG4gICAgICBpZiAoaXNfV1NfT1JfRU9MKHByZWNlZGluZykpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICB9IGVsc2UgaWYgKChzdGF0ZS5wb3NpdGlvbiA9PT0gc3RhdGUubGluZVN0YXJ0ICYmIHRlc3REb2N1bWVudFNlcGFyYXRvcihzdGF0ZSkpIHx8XG4gICAgICAgICAgICAgICB3aXRoaW5GbG93Q29sbGVjdGlvbiAmJiBpc19GTE9XX0lORElDQVRPUihjaCkpIHtcbiAgICAgIGJyZWFrO1xuXG4gICAgfSBlbHNlIGlmIChpc19FT0woY2gpKSB7XG4gICAgICBfbGluZSA9IHN0YXRlLmxpbmU7XG4gICAgICBfbGluZVN0YXJ0ID0gc3RhdGUubGluZVN0YXJ0O1xuICAgICAgX2xpbmVJbmRlbnQgPSBzdGF0ZS5saW5lSW5kZW50O1xuICAgICAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgZmFsc2UsIC0xKTtcblxuICAgICAgaWYgKHN0YXRlLmxpbmVJbmRlbnQgPj0gbm9kZUluZGVudCkge1xuICAgICAgICBoYXNQZW5kaW5nQ29udGVudCA9IHRydWU7XG4gICAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhdGUucG9zaXRpb24gPSBjYXB0dXJlRW5kO1xuICAgICAgICBzdGF0ZS5saW5lID0gX2xpbmU7XG4gICAgICAgIHN0YXRlLmxpbmVTdGFydCA9IF9saW5lU3RhcnQ7XG4gICAgICAgIHN0YXRlLmxpbmVJbmRlbnQgPSBfbGluZUluZGVudDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGhhc1BlbmRpbmdDb250ZW50KSB7XG4gICAgICBjYXB0dXJlU2VnbWVudChzdGF0ZSwgY2FwdHVyZVN0YXJ0LCBjYXB0dXJlRW5kLCBmYWxzZSk7XG4gICAgICB3cml0ZUZvbGRlZExpbmVzKHN0YXRlLCBzdGF0ZS5saW5lIC0gX2xpbmUpO1xuICAgICAgY2FwdHVyZVN0YXJ0ID0gY2FwdHVyZUVuZCA9IHN0YXRlLnBvc2l0aW9uO1xuICAgICAgaGFzUGVuZGluZ0NvbnRlbnQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoIWlzX1dISVRFX1NQQUNFKGNoKSkge1xuICAgICAgY2FwdHVyZUVuZCA9IHN0YXRlLnBvc2l0aW9uICsgMTtcbiAgICB9XG5cbiAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gIH1cblxuICBjYXB0dXJlU2VnbWVudChzdGF0ZSwgY2FwdHVyZVN0YXJ0LCBjYXB0dXJlRW5kLCBmYWxzZSk7XG5cbiAgaWYgKHN0YXRlLnJlc3VsdCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgc3RhdGUua2luZCA9IF9raW5kO1xuICBzdGF0ZS5yZXN1bHQgPSBfcmVzdWx0O1xuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHJlYWRTaW5nbGVRdW90ZWRTY2FsYXIoc3RhdGUsIG5vZGVJbmRlbnQpIHtcbiAgdmFyIGNoLFxuICAgICAgY2FwdHVyZVN0YXJ0LCBjYXB0dXJlRW5kO1xuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG5cbiAgaWYgKGNoICE9PSAweDI3LyogJyAqLykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0YXRlLmtpbmQgPSAnc2NhbGFyJztcbiAgc3RhdGUucmVzdWx0ID0gJyc7XG4gIHN0YXRlLnBvc2l0aW9uKys7XG4gIGNhcHR1cmVTdGFydCA9IGNhcHR1cmVFbmQgPSBzdGF0ZS5wb3NpdGlvbjtcblxuICB3aGlsZSAoKGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbikpICE9PSAwKSB7XG4gICAgaWYgKGNoID09PSAweDI3LyogJyAqLykge1xuICAgICAgY2FwdHVyZVNlZ21lbnQoc3RhdGUsIGNhcHR1cmVTdGFydCwgc3RhdGUucG9zaXRpb24sIHRydWUpO1xuICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuXG4gICAgICBpZiAoY2ggPT09IDB4MjcvKiAnICovKSB7XG4gICAgICAgIGNhcHR1cmVTdGFydCA9IHN0YXRlLnBvc2l0aW9uO1xuICAgICAgICBzdGF0ZS5wb3NpdGlvbisrO1xuICAgICAgICBjYXB0dXJlRW5kID0gc3RhdGUucG9zaXRpb247XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSBpZiAoaXNfRU9MKGNoKSkge1xuICAgICAgY2FwdHVyZVNlZ21lbnQoc3RhdGUsIGNhcHR1cmVTdGFydCwgY2FwdHVyZUVuZCwgdHJ1ZSk7XG4gICAgICB3cml0ZUZvbGRlZExpbmVzKHN0YXRlLCBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCBmYWxzZSwgbm9kZUluZGVudCkpO1xuICAgICAgY2FwdHVyZVN0YXJ0ID0gY2FwdHVyZUVuZCA9IHN0YXRlLnBvc2l0aW9uO1xuXG4gICAgfSBlbHNlIGlmIChzdGF0ZS5wb3NpdGlvbiA9PT0gc3RhdGUubGluZVN0YXJ0ICYmIHRlc3REb2N1bWVudFNlcGFyYXRvcihzdGF0ZSkpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICd1bmV4cGVjdGVkIGVuZCBvZiB0aGUgZG9jdW1lbnQgd2l0aGluIGEgc2luZ2xlIHF1b3RlZCBzY2FsYXInKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ZS5wb3NpdGlvbisrO1xuICAgICAgY2FwdHVyZUVuZCA9IHN0YXRlLnBvc2l0aW9uO1xuICAgIH1cbiAgfVxuXG4gIHRocm93RXJyb3Ioc3RhdGUsICd1bmV4cGVjdGVkIGVuZCBvZiB0aGUgc3RyZWFtIHdpdGhpbiBhIHNpbmdsZSBxdW90ZWQgc2NhbGFyJyk7XG59XG5cbmZ1bmN0aW9uIHJlYWREb3VibGVRdW90ZWRTY2FsYXIoc3RhdGUsIG5vZGVJbmRlbnQpIHtcbiAgdmFyIGNhcHR1cmVTdGFydCxcbiAgICAgIGNhcHR1cmVFbmQsXG4gICAgICBoZXhMZW5ndGgsXG4gICAgICBoZXhSZXN1bHQsXG4gICAgICB0bXAsXG4gICAgICBjaDtcblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gIGlmIChjaCAhPT0gMHgyMi8qIFwiICovKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3RhdGUua2luZCA9ICdzY2FsYXInO1xuICBzdGF0ZS5yZXN1bHQgPSAnJztcbiAgc3RhdGUucG9zaXRpb24rKztcbiAgY2FwdHVyZVN0YXJ0ID0gY2FwdHVyZUVuZCA9IHN0YXRlLnBvc2l0aW9uO1xuXG4gIHdoaWxlICgoY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKSkgIT09IDApIHtcbiAgICBpZiAoY2ggPT09IDB4MjIvKiBcIiAqLykge1xuICAgICAgY2FwdHVyZVNlZ21lbnQoc3RhdGUsIGNhcHR1cmVTdGFydCwgc3RhdGUucG9zaXRpb24sIHRydWUpO1xuICAgICAgc3RhdGUucG9zaXRpb24rKztcbiAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgfSBlbHNlIGlmIChjaCA9PT0gMHg1Qy8qIFxcICovKSB7XG4gICAgICBjYXB0dXJlU2VnbWVudChzdGF0ZSwgY2FwdHVyZVN0YXJ0LCBzdGF0ZS5wb3NpdGlvbiwgdHJ1ZSk7XG4gICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG5cbiAgICAgIGlmIChpc19FT0woY2gpKSB7XG4gICAgICAgIHNraXBTZXBhcmF0aW9uU3BhY2Uoc3RhdGUsIGZhbHNlLCBub2RlSW5kZW50KTtcblxuICAgICAgICAvLyBUT0RPOiByZXdvcmsgdG8gaW5saW5lIGZuIHdpdGggbm8gdHlwZSBjYXN0P1xuICAgICAgfSBlbHNlIGlmIChjaCA8IDI1NiAmJiBzaW1wbGVFc2NhcGVDaGVja1tjaF0pIHtcbiAgICAgICAgc3RhdGUucmVzdWx0ICs9IHNpbXBsZUVzY2FwZU1hcFtjaF07XG4gICAgICAgIHN0YXRlLnBvc2l0aW9uKys7XG5cbiAgICAgIH0gZWxzZSBpZiAoKHRtcCA9IGVzY2FwZWRIZXhMZW4oY2gpKSA+IDApIHtcbiAgICAgICAgaGV4TGVuZ3RoID0gdG1wO1xuICAgICAgICBoZXhSZXN1bHQgPSAwO1xuXG4gICAgICAgIGZvciAoOyBoZXhMZW5ndGggPiAwOyBoZXhMZW5ndGgtLSkge1xuICAgICAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcblxuICAgICAgICAgIGlmICgodG1wID0gZnJvbUhleENvZGUoY2gpKSA+PSAwKSB7XG4gICAgICAgICAgICBoZXhSZXN1bHQgPSAoaGV4UmVzdWx0IDw8IDQpICsgdG1wO1xuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdleHBlY3RlZCBoZXhhZGVjaW1hbCBjaGFyYWN0ZXInKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZS5yZXN1bHQgKz0gY2hhckZyb21Db2RlcG9pbnQoaGV4UmVzdWx0KTtcblxuICAgICAgICBzdGF0ZS5wb3NpdGlvbisrO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAndW5rbm93biBlc2NhcGUgc2VxdWVuY2UnKTtcbiAgICAgIH1cblxuICAgICAgY2FwdHVyZVN0YXJ0ID0gY2FwdHVyZUVuZCA9IHN0YXRlLnBvc2l0aW9uO1xuXG4gICAgfSBlbHNlIGlmIChpc19FT0woY2gpKSB7XG4gICAgICBjYXB0dXJlU2VnbWVudChzdGF0ZSwgY2FwdHVyZVN0YXJ0LCBjYXB0dXJlRW5kLCB0cnVlKTtcbiAgICAgIHdyaXRlRm9sZGVkTGluZXMoc3RhdGUsIHNraXBTZXBhcmF0aW9uU3BhY2Uoc3RhdGUsIGZhbHNlLCBub2RlSW5kZW50KSk7XG4gICAgICBjYXB0dXJlU3RhcnQgPSBjYXB0dXJlRW5kID0gc3RhdGUucG9zaXRpb247XG5cbiAgICB9IGVsc2UgaWYgKHN0YXRlLnBvc2l0aW9uID09PSBzdGF0ZS5saW5lU3RhcnQgJiYgdGVzdERvY3VtZW50U2VwYXJhdG9yKHN0YXRlKSkge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3VuZXhwZWN0ZWQgZW5kIG9mIHRoZSBkb2N1bWVudCB3aXRoaW4gYSBkb3VibGUgcXVvdGVkIHNjYWxhcicpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXRlLnBvc2l0aW9uKys7XG4gICAgICBjYXB0dXJlRW5kID0gc3RhdGUucG9zaXRpb247XG4gICAgfVxuICB9XG5cbiAgdGhyb3dFcnJvcihzdGF0ZSwgJ3VuZXhwZWN0ZWQgZW5kIG9mIHRoZSBzdHJlYW0gd2l0aGluIGEgZG91YmxlIHF1b3RlZCBzY2FsYXInKTtcbn1cblxuZnVuY3Rpb24gcmVhZEZsb3dDb2xsZWN0aW9uKHN0YXRlLCBub2RlSW5kZW50KSB7XG4gIHZhciByZWFkTmV4dCA9IHRydWUsXG4gICAgICBfbGluZSxcbiAgICAgIF90YWcgICAgID0gc3RhdGUudGFnLFxuICAgICAgX3Jlc3VsdCxcbiAgICAgIF9hbmNob3IgID0gc3RhdGUuYW5jaG9yLFxuICAgICAgZm9sbG93aW5nLFxuICAgICAgdGVybWluYXRvcixcbiAgICAgIGlzUGFpcixcbiAgICAgIGlzRXhwbGljaXRQYWlyLFxuICAgICAgaXNNYXBwaW5nLFxuICAgICAgb3ZlcnJpZGFibGVLZXlzID0ge30sXG4gICAgICBrZXlOb2RlLFxuICAgICAga2V5VGFnLFxuICAgICAgdmFsdWVOb2RlLFxuICAgICAgY2g7XG5cbiAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICBpZiAoY2ggPT09IDB4NUIvKiBbICovKSB7XG4gICAgdGVybWluYXRvciA9IDB4NUQ7LyogXSAqL1xuICAgIGlzTWFwcGluZyA9IGZhbHNlO1xuICAgIF9yZXN1bHQgPSBbXTtcbiAgfSBlbHNlIGlmIChjaCA9PT0gMHg3Qi8qIHsgKi8pIHtcbiAgICB0ZXJtaW5hdG9yID0gMHg3RDsvKiB9ICovXG4gICAgaXNNYXBwaW5nID0gdHJ1ZTtcbiAgICBfcmVzdWx0ID0ge307XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKHN0YXRlLmFuY2hvciAhPT0gbnVsbCkge1xuICAgIHN0YXRlLmFuY2hvck1hcFtzdGF0ZS5hbmNob3JdID0gX3Jlc3VsdDtcbiAgfVxuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcblxuICB3aGlsZSAoY2ggIT09IDApIHtcbiAgICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCBub2RlSW5kZW50KTtcblxuICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG5cbiAgICBpZiAoY2ggPT09IHRlcm1pbmF0b3IpIHtcbiAgICAgIHN0YXRlLnBvc2l0aW9uKys7XG4gICAgICBzdGF0ZS50YWcgPSBfdGFnO1xuICAgICAgc3RhdGUuYW5jaG9yID0gX2FuY2hvcjtcbiAgICAgIHN0YXRlLmtpbmQgPSBpc01hcHBpbmcgPyAnbWFwcGluZycgOiAnc2VxdWVuY2UnO1xuICAgICAgc3RhdGUucmVzdWx0ID0gX3Jlc3VsdDtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSBpZiAoIXJlYWROZXh0KSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnbWlzc2VkIGNvbW1hIGJldHdlZW4gZmxvdyBjb2xsZWN0aW9uIGVudHJpZXMnKTtcbiAgICB9XG5cbiAgICBrZXlUYWcgPSBrZXlOb2RlID0gdmFsdWVOb2RlID0gbnVsbDtcbiAgICBpc1BhaXIgPSBpc0V4cGxpY2l0UGFpciA9IGZhbHNlO1xuXG4gICAgaWYgKGNoID09PSAweDNGLyogPyAqLykge1xuICAgICAgZm9sbG93aW5nID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbiArIDEpO1xuXG4gICAgICBpZiAoaXNfV1NfT1JfRU9MKGZvbGxvd2luZykpIHtcbiAgICAgICAgaXNQYWlyID0gaXNFeHBsaWNpdFBhaXIgPSB0cnVlO1xuICAgICAgICBzdGF0ZS5wb3NpdGlvbisrO1xuICAgICAgICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCBub2RlSW5kZW50KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBfbGluZSA9IHN0YXRlLmxpbmU7XG4gICAgY29tcG9zZU5vZGUoc3RhdGUsIG5vZGVJbmRlbnQsIENPTlRFWFRfRkxPV19JTiwgZmFsc2UsIHRydWUpO1xuICAgIGtleVRhZyA9IHN0YXRlLnRhZztcbiAgICBrZXlOb2RlID0gc3RhdGUucmVzdWx0O1xuICAgIHNraXBTZXBhcmF0aW9uU3BhY2Uoc3RhdGUsIHRydWUsIG5vZGVJbmRlbnQpO1xuXG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICAgIGlmICgoaXNFeHBsaWNpdFBhaXIgfHwgc3RhdGUubGluZSA9PT0gX2xpbmUpICYmIGNoID09PSAweDNBLyogOiAqLykge1xuICAgICAgaXNQYWlyID0gdHJ1ZTtcbiAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgICAgIHNraXBTZXBhcmF0aW9uU3BhY2Uoc3RhdGUsIHRydWUsIG5vZGVJbmRlbnQpO1xuICAgICAgY29tcG9zZU5vZGUoc3RhdGUsIG5vZGVJbmRlbnQsIENPTlRFWFRfRkxPV19JTiwgZmFsc2UsIHRydWUpO1xuICAgICAgdmFsdWVOb2RlID0gc3RhdGUucmVzdWx0O1xuICAgIH1cblxuICAgIGlmIChpc01hcHBpbmcpIHtcbiAgICAgIHN0b3JlTWFwcGluZ1BhaXIoc3RhdGUsIF9yZXN1bHQsIG92ZXJyaWRhYmxlS2V5cywga2V5VGFnLCBrZXlOb2RlLCB2YWx1ZU5vZGUpO1xuICAgIH0gZWxzZSBpZiAoaXNQYWlyKSB7XG4gICAgICBfcmVzdWx0LnB1c2goc3RvcmVNYXBwaW5nUGFpcihzdGF0ZSwgbnVsbCwgb3ZlcnJpZGFibGVLZXlzLCBrZXlUYWcsIGtleU5vZGUsIHZhbHVlTm9kZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBfcmVzdWx0LnB1c2goa2V5Tm9kZSk7XG4gICAgfVxuXG4gICAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgbm9kZUluZGVudCk7XG5cbiAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gICAgaWYgKGNoID09PSAweDJDLyogLCAqLykge1xuICAgICAgcmVhZE5leHQgPSB0cnVlO1xuICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZWFkTmV4dCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHRocm93RXJyb3Ioc3RhdGUsICd1bmV4cGVjdGVkIGVuZCBvZiB0aGUgc3RyZWFtIHdpdGhpbiBhIGZsb3cgY29sbGVjdGlvbicpO1xufVxuXG5mdW5jdGlvbiByZWFkQmxvY2tTY2FsYXIoc3RhdGUsIG5vZGVJbmRlbnQpIHtcbiAgdmFyIGNhcHR1cmVTdGFydCxcbiAgICAgIGZvbGRpbmcsXG4gICAgICBjaG9tcGluZyAgICAgICA9IENIT01QSU5HX0NMSVAsXG4gICAgICBkaWRSZWFkQ29udGVudCA9IGZhbHNlLFxuICAgICAgZGV0ZWN0ZWRJbmRlbnQgPSBmYWxzZSxcbiAgICAgIHRleHRJbmRlbnQgICAgID0gbm9kZUluZGVudCxcbiAgICAgIGVtcHR5TGluZXMgICAgID0gMCxcbiAgICAgIGF0TW9yZUluZGVudGVkID0gZmFsc2UsXG4gICAgICB0bXAsXG4gICAgICBjaDtcblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gIGlmIChjaCA9PT0gMHg3Qy8qIHwgKi8pIHtcbiAgICBmb2xkaW5nID0gZmFsc2U7XG4gIH0gZWxzZSBpZiAoY2ggPT09IDB4M0UvKiA+ICovKSB7XG4gICAgZm9sZGluZyA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3RhdGUua2luZCA9ICdzY2FsYXInO1xuICBzdGF0ZS5yZXN1bHQgPSAnJztcblxuICB3aGlsZSAoY2ggIT09IDApIHtcbiAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG5cbiAgICBpZiAoY2ggPT09IDB4MkIvKiArICovIHx8IGNoID09PSAweDJELyogLSAqLykge1xuICAgICAgaWYgKENIT01QSU5HX0NMSVAgPT09IGNob21waW5nKSB7XG4gICAgICAgIGNob21waW5nID0gKGNoID09PSAweDJCLyogKyAqLykgPyBDSE9NUElOR19LRUVQIDogQ0hPTVBJTkdfU1RSSVA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAncmVwZWF0IG9mIGEgY2hvbXBpbmcgbW9kZSBpZGVudGlmaWVyJyk7XG4gICAgICB9XG5cbiAgICB9IGVsc2UgaWYgKCh0bXAgPSBmcm9tRGVjaW1hbENvZGUoY2gpKSA+PSAwKSB7XG4gICAgICBpZiAodG1wID09PSAwKSB7XG4gICAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdiYWQgZXhwbGljaXQgaW5kZW50YXRpb24gd2lkdGggb2YgYSBibG9jayBzY2FsYXI7IGl0IGNhbm5vdCBiZSBsZXNzIHRoYW4gb25lJyk7XG4gICAgICB9IGVsc2UgaWYgKCFkZXRlY3RlZEluZGVudCkge1xuICAgICAgICB0ZXh0SW5kZW50ID0gbm9kZUluZGVudCArIHRtcCAtIDE7XG4gICAgICAgIGRldGVjdGVkSW5kZW50ID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdyZXBlYXQgb2YgYW4gaW5kZW50YXRpb24gd2lkdGggaWRlbnRpZmllcicpO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGlmIChpc19XSElURV9TUEFDRShjaCkpIHtcbiAgICBkbyB7IGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTsgfVxuICAgIHdoaWxlIChpc19XSElURV9TUEFDRShjaCkpO1xuXG4gICAgaWYgKGNoID09PSAweDIzLyogIyAqLykge1xuICAgICAgZG8geyBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7IH1cbiAgICAgIHdoaWxlICghaXNfRU9MKGNoKSAmJiAoY2ggIT09IDApKTtcbiAgICB9XG4gIH1cblxuICB3aGlsZSAoY2ggIT09IDApIHtcbiAgICByZWFkTGluZUJyZWFrKHN0YXRlKTtcbiAgICBzdGF0ZS5saW5lSW5kZW50ID0gMDtcblxuICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG5cbiAgICB3aGlsZSAoKCFkZXRlY3RlZEluZGVudCB8fCBzdGF0ZS5saW5lSW5kZW50IDwgdGV4dEluZGVudCkgJiZcbiAgICAgICAgICAgKGNoID09PSAweDIwLyogU3BhY2UgKi8pKSB7XG4gICAgICBzdGF0ZS5saW5lSW5kZW50Kys7XG4gICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gICAgfVxuXG4gICAgaWYgKCFkZXRlY3RlZEluZGVudCAmJiBzdGF0ZS5saW5lSW5kZW50ID4gdGV4dEluZGVudCkge1xuICAgICAgdGV4dEluZGVudCA9IHN0YXRlLmxpbmVJbmRlbnQ7XG4gICAgfVxuXG4gICAgaWYgKGlzX0VPTChjaCkpIHtcbiAgICAgIGVtcHR5TGluZXMrKztcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIEVuZCBvZiB0aGUgc2NhbGFyLlxuICAgIGlmIChzdGF0ZS5saW5lSW5kZW50IDwgdGV4dEluZGVudCkge1xuXG4gICAgICAvLyBQZXJmb3JtIHRoZSBjaG9tcGluZy5cbiAgICAgIGlmIChjaG9tcGluZyA9PT0gQ0hPTVBJTkdfS0VFUCkge1xuICAgICAgICBzdGF0ZS5yZXN1bHQgKz0gY29tbW9uLnJlcGVhdCgnXFxuJywgZGlkUmVhZENvbnRlbnQgPyAxICsgZW1wdHlMaW5lcyA6IGVtcHR5TGluZXMpO1xuICAgICAgfSBlbHNlIGlmIChjaG9tcGluZyA9PT0gQ0hPTVBJTkdfQ0xJUCkge1xuICAgICAgICBpZiAoZGlkUmVhZENvbnRlbnQpIHsgLy8gaS5lLiBvbmx5IGlmIHRoZSBzY2FsYXIgaXMgbm90IGVtcHR5LlxuICAgICAgICAgIHN0YXRlLnJlc3VsdCArPSAnXFxuJztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBCcmVhayB0aGlzIGB3aGlsZWAgY3ljbGUgYW5kIGdvIHRvIHRoZSBmdW5jaXRvbidzIGVwaWxvZ3VlLlxuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgLy8gRm9sZGVkIHN0eWxlOiB1c2UgZmFuY3kgcnVsZXMgdG8gaGFuZGxlIGxpbmUgYnJlYWtzLlxuICAgIGlmIChmb2xkaW5nKSB7XG5cbiAgICAgIC8vIExpbmVzIHN0YXJ0aW5nIHdpdGggd2hpdGUgc3BhY2UgY2hhcmFjdGVycyAobW9yZS1pbmRlbnRlZCBsaW5lcykgYXJlIG5vdCBmb2xkZWQuXG4gICAgICBpZiAoaXNfV0hJVEVfU1BBQ0UoY2gpKSB7XG4gICAgICAgIGF0TW9yZUluZGVudGVkID0gdHJ1ZTtcbiAgICAgICAgLy8gZXhjZXB0IGZvciB0aGUgZmlyc3QgY29udGVudCBsaW5lIChjZi4gRXhhbXBsZSA4LjEpXG4gICAgICAgIHN0YXRlLnJlc3VsdCArPSBjb21tb24ucmVwZWF0KCdcXG4nLCBkaWRSZWFkQ29udGVudCA/IDEgKyBlbXB0eUxpbmVzIDogZW1wdHlMaW5lcyk7XG5cbiAgICAgIC8vIEVuZCBvZiBtb3JlLWluZGVudGVkIGJsb2NrLlxuICAgICAgfSBlbHNlIGlmIChhdE1vcmVJbmRlbnRlZCkge1xuICAgICAgICBhdE1vcmVJbmRlbnRlZCA9IGZhbHNlO1xuICAgICAgICBzdGF0ZS5yZXN1bHQgKz0gY29tbW9uLnJlcGVhdCgnXFxuJywgZW1wdHlMaW5lcyArIDEpO1xuXG4gICAgICAvLyBKdXN0IG9uZSBsaW5lIGJyZWFrIC0gcGVyY2VpdmUgYXMgdGhlIHNhbWUgbGluZS5cbiAgICAgIH0gZWxzZSBpZiAoZW1wdHlMaW5lcyA9PT0gMCkge1xuICAgICAgICBpZiAoZGlkUmVhZENvbnRlbnQpIHsgLy8gaS5lLiBvbmx5IGlmIHdlIGhhdmUgYWxyZWFkeSByZWFkIHNvbWUgc2NhbGFyIGNvbnRlbnQuXG4gICAgICAgICAgc3RhdGUucmVzdWx0ICs9ICcgJztcbiAgICAgICAgfVxuXG4gICAgICAvLyBTZXZlcmFsIGxpbmUgYnJlYWtzIC0gcGVyY2VpdmUgYXMgZGlmZmVyZW50IGxpbmVzLlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhdGUucmVzdWx0ICs9IGNvbW1vbi5yZXBlYXQoJ1xcbicsIGVtcHR5TGluZXMpO1xuICAgICAgfVxuXG4gICAgLy8gTGl0ZXJhbCBzdHlsZToganVzdCBhZGQgZXhhY3QgbnVtYmVyIG9mIGxpbmUgYnJlYWtzIGJldHdlZW4gY29udGVudCBsaW5lcy5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gS2VlcCBhbGwgbGluZSBicmVha3MgZXhjZXB0IHRoZSBoZWFkZXIgbGluZSBicmVhay5cbiAgICAgIHN0YXRlLnJlc3VsdCArPSBjb21tb24ucmVwZWF0KCdcXG4nLCBkaWRSZWFkQ29udGVudCA/IDEgKyBlbXB0eUxpbmVzIDogZW1wdHlMaW5lcyk7XG4gICAgfVxuXG4gICAgZGlkUmVhZENvbnRlbnQgPSB0cnVlO1xuICAgIGRldGVjdGVkSW5kZW50ID0gdHJ1ZTtcbiAgICBlbXB0eUxpbmVzID0gMDtcbiAgICBjYXB0dXJlU3RhcnQgPSBzdGF0ZS5wb3NpdGlvbjtcblxuICAgIHdoaWxlICghaXNfRU9MKGNoKSAmJiAoY2ggIT09IDApKSB7XG4gICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gICAgfVxuXG4gICAgY2FwdHVyZVNlZ21lbnQoc3RhdGUsIGNhcHR1cmVTdGFydCwgc3RhdGUucG9zaXRpb24sIGZhbHNlKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiByZWFkQmxvY2tTZXF1ZW5jZShzdGF0ZSwgbm9kZUluZGVudCkge1xuICB2YXIgX2xpbmUsXG4gICAgICBfdGFnICAgICAgPSBzdGF0ZS50YWcsXG4gICAgICBfYW5jaG9yICAgPSBzdGF0ZS5hbmNob3IsXG4gICAgICBfcmVzdWx0ICAgPSBbXSxcbiAgICAgIGZvbGxvd2luZyxcbiAgICAgIGRldGVjdGVkICA9IGZhbHNlLFxuICAgICAgY2g7XG5cbiAgaWYgKHN0YXRlLmFuY2hvciAhPT0gbnVsbCkge1xuICAgIHN0YXRlLmFuY2hvck1hcFtzdGF0ZS5hbmNob3JdID0gX3Jlc3VsdDtcbiAgfVxuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG5cbiAgd2hpbGUgKGNoICE9PSAwKSB7XG5cbiAgICBpZiAoY2ggIT09IDB4MkQvKiAtICovKSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBmb2xsb3dpbmcgPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uICsgMSk7XG5cbiAgICBpZiAoIWlzX1dTX09SX0VPTChmb2xsb3dpbmcpKSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBkZXRlY3RlZCA9IHRydWU7XG4gICAgc3RhdGUucG9zaXRpb24rKztcblxuICAgIGlmIChza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCAtMSkpIHtcbiAgICAgIGlmIChzdGF0ZS5saW5lSW5kZW50IDw9IG5vZGVJbmRlbnQpIHtcbiAgICAgICAgX3Jlc3VsdC5wdXNoKG51bGwpO1xuICAgICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBfbGluZSA9IHN0YXRlLmxpbmU7XG4gICAgY29tcG9zZU5vZGUoc3RhdGUsIG5vZGVJbmRlbnQsIENPTlRFWFRfQkxPQ0tfSU4sIGZhbHNlLCB0cnVlKTtcbiAgICBfcmVzdWx0LnB1c2goc3RhdGUucmVzdWx0KTtcbiAgICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCAtMSk7XG5cbiAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gICAgaWYgKChzdGF0ZS5saW5lID09PSBfbGluZSB8fCBzdGF0ZS5saW5lSW5kZW50ID4gbm9kZUluZGVudCkgJiYgKGNoICE9PSAwKSkge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2JhZCBpbmRlbnRhdGlvbiBvZiBhIHNlcXVlbmNlIGVudHJ5Jyk7XG4gICAgfSBlbHNlIGlmIChzdGF0ZS5saW5lSW5kZW50IDwgbm9kZUluZGVudCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKGRldGVjdGVkKSB7XG4gICAgc3RhdGUudGFnID0gX3RhZztcbiAgICBzdGF0ZS5hbmNob3IgPSBfYW5jaG9yO1xuICAgIHN0YXRlLmtpbmQgPSAnc2VxdWVuY2UnO1xuICAgIHN0YXRlLnJlc3VsdCA9IF9yZXN1bHQ7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiByZWFkQmxvY2tNYXBwaW5nKHN0YXRlLCBub2RlSW5kZW50LCBmbG93SW5kZW50KSB7XG4gIHZhciBmb2xsb3dpbmcsXG4gICAgICBhbGxvd0NvbXBhY3QsXG4gICAgICBfbGluZSxcbiAgICAgIF9wb3MsXG4gICAgICBfdGFnICAgICAgICAgID0gc3RhdGUudGFnLFxuICAgICAgX2FuY2hvciAgICAgICA9IHN0YXRlLmFuY2hvcixcbiAgICAgIF9yZXN1bHQgICAgICAgPSB7fSxcbiAgICAgIG92ZXJyaWRhYmxlS2V5cyA9IHt9LFxuICAgICAga2V5VGFnICAgICAgICA9IG51bGwsXG4gICAgICBrZXlOb2RlICAgICAgID0gbnVsbCxcbiAgICAgIHZhbHVlTm9kZSAgICAgPSBudWxsLFxuICAgICAgYXRFeHBsaWNpdEtleSA9IGZhbHNlLFxuICAgICAgZGV0ZWN0ZWQgICAgICA9IGZhbHNlLFxuICAgICAgY2g7XG5cbiAgaWYgKHN0YXRlLmFuY2hvciAhPT0gbnVsbCkge1xuICAgIHN0YXRlLmFuY2hvck1hcFtzdGF0ZS5hbmNob3JdID0gX3Jlc3VsdDtcbiAgfVxuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG5cbiAgd2hpbGUgKGNoICE9PSAwKSB7XG4gICAgZm9sbG93aW5nID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbiArIDEpO1xuICAgIF9saW5lID0gc3RhdGUubGluZTsgLy8gU2F2ZSB0aGUgY3VycmVudCBsaW5lLlxuICAgIF9wb3MgPSBzdGF0ZS5wb3NpdGlvbjtcblxuICAgIC8vXG4gICAgLy8gRXhwbGljaXQgbm90YXRpb24gY2FzZS4gVGhlcmUgYXJlIHR3byBzZXBhcmF0ZSBibG9ja3M6XG4gICAgLy8gZmlyc3QgZm9yIHRoZSBrZXkgKGRlbm90ZWQgYnkgXCI/XCIpIGFuZCBzZWNvbmQgZm9yIHRoZSB2YWx1ZSAoZGVub3RlZCBieSBcIjpcIilcbiAgICAvL1xuICAgIGlmICgoY2ggPT09IDB4M0YvKiA/ICovIHx8IGNoID09PSAweDNBLyogOiAqLykgJiYgaXNfV1NfT1JfRU9MKGZvbGxvd2luZykpIHtcblxuICAgICAgaWYgKGNoID09PSAweDNGLyogPyAqLykge1xuICAgICAgICBpZiAoYXRFeHBsaWNpdEtleSkge1xuICAgICAgICAgIHN0b3JlTWFwcGluZ1BhaXIoc3RhdGUsIF9yZXN1bHQsIG92ZXJyaWRhYmxlS2V5cywga2V5VGFnLCBrZXlOb2RlLCBudWxsKTtcbiAgICAgICAgICBrZXlUYWcgPSBrZXlOb2RlID0gdmFsdWVOb2RlID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGRldGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgYXRFeHBsaWNpdEtleSA9IHRydWU7XG4gICAgICAgIGFsbG93Q29tcGFjdCA9IHRydWU7XG5cbiAgICAgIH0gZWxzZSBpZiAoYXRFeHBsaWNpdEtleSkge1xuICAgICAgICAvLyBpLmUuIDB4M0EvKiA6ICovID09PSBjaGFyYWN0ZXIgYWZ0ZXIgdGhlIGV4cGxpY2l0IGtleS5cbiAgICAgICAgYXRFeHBsaWNpdEtleSA9IGZhbHNlO1xuICAgICAgICBhbGxvd0NvbXBhY3QgPSB0cnVlO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnaW5jb21wbGV0ZSBleHBsaWNpdCBtYXBwaW5nIHBhaXI7IGEga2V5IG5vZGUgaXMgbWlzc2VkOyBvciBmb2xsb3dlZCBieSBhIG5vbi10YWJ1bGF0ZWQgZW1wdHkgbGluZScpO1xuICAgICAgfVxuXG4gICAgICBzdGF0ZS5wb3NpdGlvbiArPSAxO1xuICAgICAgY2ggPSBmb2xsb3dpbmc7XG5cbiAgICAvL1xuICAgIC8vIEltcGxpY2l0IG5vdGF0aW9uIGNhc2UuIEZsb3ctc3R5bGUgbm9kZSBhcyB0aGUga2V5IGZpcnN0LCB0aGVuIFwiOlwiLCBhbmQgdGhlIHZhbHVlLlxuICAgIC8vXG4gICAgfSBlbHNlIGlmIChjb21wb3NlTm9kZShzdGF0ZSwgZmxvd0luZGVudCwgQ09OVEVYVF9GTE9XX09VVCwgZmFsc2UsIHRydWUpKSB7XG5cbiAgICAgIGlmIChzdGF0ZS5saW5lID09PSBfbGluZSkge1xuICAgICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gICAgICAgIHdoaWxlIChpc19XSElURV9TUEFDRShjaCkpIHtcbiAgICAgICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2ggPT09IDB4M0EvKiA6ICovKSB7XG4gICAgICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuXG4gICAgICAgICAgaWYgKCFpc19XU19PUl9FT0woY2gpKSB7XG4gICAgICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnYSB3aGl0ZXNwYWNlIGNoYXJhY3RlciBpcyBleHBlY3RlZCBhZnRlciB0aGUga2V5LXZhbHVlIHNlcGFyYXRvciB3aXRoaW4gYSBibG9jayBtYXBwaW5nJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGF0RXhwbGljaXRLZXkpIHtcbiAgICAgICAgICAgIHN0b3JlTWFwcGluZ1BhaXIoc3RhdGUsIF9yZXN1bHQsIG92ZXJyaWRhYmxlS2V5cywga2V5VGFnLCBrZXlOb2RlLCBudWxsKTtcbiAgICAgICAgICAgIGtleVRhZyA9IGtleU5vZGUgPSB2YWx1ZU5vZGUgPSBudWxsO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGRldGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICBhdEV4cGxpY2l0S2V5ID0gZmFsc2U7XG4gICAgICAgICAgYWxsb3dDb21wYWN0ID0gZmFsc2U7XG4gICAgICAgICAga2V5VGFnID0gc3RhdGUudGFnO1xuICAgICAgICAgIGtleU5vZGUgPSBzdGF0ZS5yZXN1bHQ7XG5cbiAgICAgICAgfSBlbHNlIGlmIChkZXRlY3RlZCkge1xuICAgICAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdjYW4gbm90IHJlYWQgYW4gaW1wbGljaXQgbWFwcGluZyBwYWlyOyBhIGNvbG9uIGlzIG1pc3NlZCcpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RhdGUudGFnID0gX3RhZztcbiAgICAgICAgICBzdGF0ZS5hbmNob3IgPSBfYW5jaG9yO1xuICAgICAgICAgIHJldHVybiB0cnVlOyAvLyBLZWVwIHRoZSByZXN1bHQgb2YgYGNvbXBvc2VOb2RlYC5cbiAgICAgICAgfVxuXG4gICAgICB9IGVsc2UgaWYgKGRldGVjdGVkKSB7XG4gICAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdjYW4gbm90IHJlYWQgYSBibG9jayBtYXBwaW5nIGVudHJ5OyBhIG11bHRpbGluZSBrZXkgbWF5IG5vdCBiZSBhbiBpbXBsaWNpdCBrZXknKTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhdGUudGFnID0gX3RhZztcbiAgICAgICAgc3RhdGUuYW5jaG9yID0gX2FuY2hvcjtcbiAgICAgICAgcmV0dXJuIHRydWU7IC8vIEtlZXAgdGhlIHJlc3VsdCBvZiBgY29tcG9zZU5vZGVgLlxuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIGJyZWFrOyAvLyBSZWFkaW5nIGlzIGRvbmUuIEdvIHRvIHRoZSBlcGlsb2d1ZS5cbiAgICB9XG5cbiAgICAvL1xuICAgIC8vIENvbW1vbiByZWFkaW5nIGNvZGUgZm9yIGJvdGggZXhwbGljaXQgYW5kIGltcGxpY2l0IG5vdGF0aW9ucy5cbiAgICAvL1xuICAgIGlmIChzdGF0ZS5saW5lID09PSBfbGluZSB8fCBzdGF0ZS5saW5lSW5kZW50ID4gbm9kZUluZGVudCkge1xuICAgICAgaWYgKGNvbXBvc2VOb2RlKHN0YXRlLCBub2RlSW5kZW50LCBDT05URVhUX0JMT0NLX09VVCwgdHJ1ZSwgYWxsb3dDb21wYWN0KSkge1xuICAgICAgICBpZiAoYXRFeHBsaWNpdEtleSkge1xuICAgICAgICAgIGtleU5vZGUgPSBzdGF0ZS5yZXN1bHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFsdWVOb2RlID0gc3RhdGUucmVzdWx0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghYXRFeHBsaWNpdEtleSkge1xuICAgICAgICBzdG9yZU1hcHBpbmdQYWlyKHN0YXRlLCBfcmVzdWx0LCBvdmVycmlkYWJsZUtleXMsIGtleVRhZywga2V5Tm9kZSwgdmFsdWVOb2RlLCBfbGluZSwgX3Bvcyk7XG4gICAgICAgIGtleVRhZyA9IGtleU5vZGUgPSB2YWx1ZU5vZGUgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCAtMSk7XG4gICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuICAgIH1cblxuICAgIGlmIChzdGF0ZS5saW5lSW5kZW50ID4gbm9kZUluZGVudCAmJiAoY2ggIT09IDApKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnYmFkIGluZGVudGF0aW9uIG9mIGEgbWFwcGluZyBlbnRyeScpO1xuICAgIH0gZWxzZSBpZiAoc3RhdGUubGluZUluZGVudCA8IG5vZGVJbmRlbnQpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8vXG4gIC8vIEVwaWxvZ3VlLlxuICAvL1xuXG4gIC8vIFNwZWNpYWwgY2FzZTogbGFzdCBtYXBwaW5nJ3Mgbm9kZSBjb250YWlucyBvbmx5IHRoZSBrZXkgaW4gZXhwbGljaXQgbm90YXRpb24uXG4gIGlmIChhdEV4cGxpY2l0S2V5KSB7XG4gICAgc3RvcmVNYXBwaW5nUGFpcihzdGF0ZSwgX3Jlc3VsdCwgb3ZlcnJpZGFibGVLZXlzLCBrZXlUYWcsIGtleU5vZGUsIG51bGwpO1xuICB9XG5cbiAgLy8gRXhwb3NlIHRoZSByZXN1bHRpbmcgbWFwcGluZy5cbiAgaWYgKGRldGVjdGVkKSB7XG4gICAgc3RhdGUudGFnID0gX3RhZztcbiAgICBzdGF0ZS5hbmNob3IgPSBfYW5jaG9yO1xuICAgIHN0YXRlLmtpbmQgPSAnbWFwcGluZyc7XG4gICAgc3RhdGUucmVzdWx0ID0gX3Jlc3VsdDtcbiAgfVxuXG4gIHJldHVybiBkZXRlY3RlZDtcbn1cblxuZnVuY3Rpb24gcmVhZFRhZ1Byb3BlcnR5KHN0YXRlKSB7XG4gIHZhciBfcG9zaXRpb24sXG4gICAgICBpc1ZlcmJhdGltID0gZmFsc2UsXG4gICAgICBpc05hbWVkICAgID0gZmFsc2UsXG4gICAgICB0YWdIYW5kbGUsXG4gICAgICB0YWdOYW1lLFxuICAgICAgY2g7XG5cbiAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICBpZiAoY2ggIT09IDB4MjEvKiAhICovKSByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHN0YXRlLnRhZyAhPT0gbnVsbCkge1xuICAgIHRocm93RXJyb3Ioc3RhdGUsICdkdXBsaWNhdGlvbiBvZiBhIHRhZyBwcm9wZXJ0eScpO1xuICB9XG5cbiAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuXG4gIGlmIChjaCA9PT0gMHgzQy8qIDwgKi8pIHtcbiAgICBpc1ZlcmJhdGltID0gdHJ1ZTtcbiAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG5cbiAgfSBlbHNlIGlmIChjaCA9PT0gMHgyMS8qICEgKi8pIHtcbiAgICBpc05hbWVkID0gdHJ1ZTtcbiAgICB0YWdIYW5kbGUgPSAnISEnO1xuICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcblxuICB9IGVsc2Uge1xuICAgIHRhZ0hhbmRsZSA9ICchJztcbiAgfVxuXG4gIF9wb3NpdGlvbiA9IHN0YXRlLnBvc2l0aW9uO1xuXG4gIGlmIChpc1ZlcmJhdGltKSB7XG4gICAgZG8geyBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7IH1cbiAgICB3aGlsZSAoY2ggIT09IDAgJiYgY2ggIT09IDB4M0UvKiA+ICovKTtcblxuICAgIGlmIChzdGF0ZS5wb3NpdGlvbiA8IHN0YXRlLmxlbmd0aCkge1xuICAgICAgdGFnTmFtZSA9IHN0YXRlLmlucHV0LnNsaWNlKF9wb3NpdGlvbiwgc3RhdGUucG9zaXRpb24pO1xuICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAndW5leHBlY3RlZCBlbmQgb2YgdGhlIHN0cmVhbSB3aXRoaW4gYSB2ZXJiYXRpbSB0YWcnKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKGNoICE9PSAwICYmICFpc19XU19PUl9FT0woY2gpKSB7XG5cbiAgICAgIGlmIChjaCA9PT0gMHgyMS8qICEgKi8pIHtcbiAgICAgICAgaWYgKCFpc05hbWVkKSB7XG4gICAgICAgICAgdGFnSGFuZGxlID0gc3RhdGUuaW5wdXQuc2xpY2UoX3Bvc2l0aW9uIC0gMSwgc3RhdGUucG9zaXRpb24gKyAxKTtcblxuICAgICAgICAgIGlmICghUEFUVEVSTl9UQUdfSEFORExFLnRlc3QodGFnSGFuZGxlKSkge1xuICAgICAgICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ25hbWVkIHRhZyBoYW5kbGUgY2Fubm90IGNvbnRhaW4gc3VjaCBjaGFyYWN0ZXJzJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaXNOYW1lZCA9IHRydWU7XG4gICAgICAgICAgX3Bvc2l0aW9uID0gc3RhdGUucG9zaXRpb24gKyAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93RXJyb3Ioc3RhdGUsICd0YWcgc3VmZml4IGNhbm5vdCBjb250YWluIGV4Y2xhbWF0aW9uIG1hcmtzJyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgIH1cblxuICAgIHRhZ05hbWUgPSBzdGF0ZS5pbnB1dC5zbGljZShfcG9zaXRpb24sIHN0YXRlLnBvc2l0aW9uKTtcblxuICAgIGlmIChQQVRURVJOX0ZMT1dfSU5ESUNBVE9SUy50ZXN0KHRhZ05hbWUpKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAndGFnIHN1ZmZpeCBjYW5ub3QgY29udGFpbiBmbG93IGluZGljYXRvciBjaGFyYWN0ZXJzJyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHRhZ05hbWUgJiYgIVBBVFRFUk5fVEFHX1VSSS50ZXN0KHRhZ05hbWUpKSB7XG4gICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3RhZyBuYW1lIGNhbm5vdCBjb250YWluIHN1Y2ggY2hhcmFjdGVyczogJyArIHRhZ05hbWUpO1xuICB9XG5cbiAgaWYgKGlzVmVyYmF0aW0pIHtcbiAgICBzdGF0ZS50YWcgPSB0YWdOYW1lO1xuXG4gIH0gZWxzZSBpZiAoX2hhc093blByb3BlcnR5LmNhbGwoc3RhdGUudGFnTWFwLCB0YWdIYW5kbGUpKSB7XG4gICAgc3RhdGUudGFnID0gc3RhdGUudGFnTWFwW3RhZ0hhbmRsZV0gKyB0YWdOYW1lO1xuXG4gIH0gZWxzZSBpZiAodGFnSGFuZGxlID09PSAnIScpIHtcbiAgICBzdGF0ZS50YWcgPSAnIScgKyB0YWdOYW1lO1xuXG4gIH0gZWxzZSBpZiAodGFnSGFuZGxlID09PSAnISEnKSB7XG4gICAgc3RhdGUudGFnID0gJ3RhZzp5YW1sLm9yZywyMDAyOicgKyB0YWdOYW1lO1xuXG4gIH0gZWxzZSB7XG4gICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3VuZGVjbGFyZWQgdGFnIGhhbmRsZSBcIicgKyB0YWdIYW5kbGUgKyAnXCInKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiByZWFkQW5jaG9yUHJvcGVydHkoc3RhdGUpIHtcbiAgdmFyIF9wb3NpdGlvbixcbiAgICAgIGNoO1xuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG5cbiAgaWYgKGNoICE9PSAweDI2LyogJiAqLykgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChzdGF0ZS5hbmNob3IgIT09IG51bGwpIHtcbiAgICB0aHJvd0Vycm9yKHN0YXRlLCAnZHVwbGljYXRpb24gb2YgYW4gYW5jaG9yIHByb3BlcnR5Jyk7XG4gIH1cblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gIF9wb3NpdGlvbiA9IHN0YXRlLnBvc2l0aW9uO1xuXG4gIHdoaWxlIChjaCAhPT0gMCAmJiAhaXNfV1NfT1JfRU9MKGNoKSAmJiAhaXNfRkxPV19JTkRJQ0FUT1IoY2gpKSB7XG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICB9XG5cbiAgaWYgKHN0YXRlLnBvc2l0aW9uID09PSBfcG9zaXRpb24pIHtcbiAgICB0aHJvd0Vycm9yKHN0YXRlLCAnbmFtZSBvZiBhbiBhbmNob3Igbm9kZSBtdXN0IGNvbnRhaW4gYXQgbGVhc3Qgb25lIGNoYXJhY3RlcicpO1xuICB9XG5cbiAgc3RhdGUuYW5jaG9yID0gc3RhdGUuaW5wdXQuc2xpY2UoX3Bvc2l0aW9uLCBzdGF0ZS5wb3NpdGlvbik7XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiByZWFkQWxpYXMoc3RhdGUpIHtcbiAgdmFyIF9wb3NpdGlvbiwgYWxpYXMsXG4gICAgICBjaDtcblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gIGlmIChjaCAhPT0gMHgyQS8qICogKi8pIHJldHVybiBmYWxzZTtcblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gIF9wb3NpdGlvbiA9IHN0YXRlLnBvc2l0aW9uO1xuXG4gIHdoaWxlIChjaCAhPT0gMCAmJiAhaXNfV1NfT1JfRU9MKGNoKSAmJiAhaXNfRkxPV19JTkRJQ0FUT1IoY2gpKSB7XG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICB9XG5cbiAgaWYgKHN0YXRlLnBvc2l0aW9uID09PSBfcG9zaXRpb24pIHtcbiAgICB0aHJvd0Vycm9yKHN0YXRlLCAnbmFtZSBvZiBhbiBhbGlhcyBub2RlIG11c3QgY29udGFpbiBhdCBsZWFzdCBvbmUgY2hhcmFjdGVyJyk7XG4gIH1cblxuICBhbGlhcyA9IHN0YXRlLmlucHV0LnNsaWNlKF9wb3NpdGlvbiwgc3RhdGUucG9zaXRpb24pO1xuXG4gIGlmICghX2hhc093blByb3BlcnR5LmNhbGwoc3RhdGUuYW5jaG9yTWFwLCBhbGlhcykpIHtcbiAgICB0aHJvd0Vycm9yKHN0YXRlLCAndW5pZGVudGlmaWVkIGFsaWFzIFwiJyArIGFsaWFzICsgJ1wiJyk7XG4gIH1cblxuICBzdGF0ZS5yZXN1bHQgPSBzdGF0ZS5hbmNob3JNYXBbYWxpYXNdO1xuICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCAtMSk7XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBjb21wb3NlTm9kZShzdGF0ZSwgcGFyZW50SW5kZW50LCBub2RlQ29udGV4dCwgYWxsb3dUb1NlZWssIGFsbG93Q29tcGFjdCkge1xuICB2YXIgYWxsb3dCbG9ja1N0eWxlcyxcbiAgICAgIGFsbG93QmxvY2tTY2FsYXJzLFxuICAgICAgYWxsb3dCbG9ja0NvbGxlY3Rpb25zLFxuICAgICAgaW5kZW50U3RhdHVzID0gMSwgLy8gMTogdGhpcz5wYXJlbnQsIDA6IHRoaXM9cGFyZW50LCAtMTogdGhpczxwYXJlbnRcbiAgICAgIGF0TmV3TGluZSAgPSBmYWxzZSxcbiAgICAgIGhhc0NvbnRlbnQgPSBmYWxzZSxcbiAgICAgIHR5cGVJbmRleCxcbiAgICAgIHR5cGVRdWFudGl0eSxcbiAgICAgIHR5cGUsXG4gICAgICBmbG93SW5kZW50LFxuICAgICAgYmxvY2tJbmRlbnQ7XG5cbiAgaWYgKHN0YXRlLmxpc3RlbmVyICE9PSBudWxsKSB7XG4gICAgc3RhdGUubGlzdGVuZXIoJ29wZW4nLCBzdGF0ZSk7XG4gIH1cblxuICBzdGF0ZS50YWcgICAgPSBudWxsO1xuICBzdGF0ZS5hbmNob3IgPSBudWxsO1xuICBzdGF0ZS5raW5kICAgPSBudWxsO1xuICBzdGF0ZS5yZXN1bHQgPSBudWxsO1xuXG4gIGFsbG93QmxvY2tTdHlsZXMgPSBhbGxvd0Jsb2NrU2NhbGFycyA9IGFsbG93QmxvY2tDb2xsZWN0aW9ucyA9XG4gICAgQ09OVEVYVF9CTE9DS19PVVQgPT09IG5vZGVDb250ZXh0IHx8XG4gICAgQ09OVEVYVF9CTE9DS19JTiAgPT09IG5vZGVDb250ZXh0O1xuXG4gIGlmIChhbGxvd1RvU2Vlaykge1xuICAgIGlmIChza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCAtMSkpIHtcbiAgICAgIGF0TmV3TGluZSA9IHRydWU7XG5cbiAgICAgIGlmIChzdGF0ZS5saW5lSW5kZW50ID4gcGFyZW50SW5kZW50KSB7XG4gICAgICAgIGluZGVudFN0YXR1cyA9IDE7XG4gICAgICB9IGVsc2UgaWYgKHN0YXRlLmxpbmVJbmRlbnQgPT09IHBhcmVudEluZGVudCkge1xuICAgICAgICBpbmRlbnRTdGF0dXMgPSAwO1xuICAgICAgfSBlbHNlIGlmIChzdGF0ZS5saW5lSW5kZW50IDwgcGFyZW50SW5kZW50KSB7XG4gICAgICAgIGluZGVudFN0YXR1cyA9IC0xO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChpbmRlbnRTdGF0dXMgPT09IDEpIHtcbiAgICB3aGlsZSAocmVhZFRhZ1Byb3BlcnR5KHN0YXRlKSB8fCByZWFkQW5jaG9yUHJvcGVydHkoc3RhdGUpKSB7XG4gICAgICBpZiAoc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgLTEpKSB7XG4gICAgICAgIGF0TmV3TGluZSA9IHRydWU7XG4gICAgICAgIGFsbG93QmxvY2tDb2xsZWN0aW9ucyA9IGFsbG93QmxvY2tTdHlsZXM7XG5cbiAgICAgICAgaWYgKHN0YXRlLmxpbmVJbmRlbnQgPiBwYXJlbnRJbmRlbnQpIHtcbiAgICAgICAgICBpbmRlbnRTdGF0dXMgPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlLmxpbmVJbmRlbnQgPT09IHBhcmVudEluZGVudCkge1xuICAgICAgICAgIGluZGVudFN0YXR1cyA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUubGluZUluZGVudCA8IHBhcmVudEluZGVudCkge1xuICAgICAgICAgIGluZGVudFN0YXR1cyA9IC0xO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbGxvd0Jsb2NrQ29sbGVjdGlvbnMgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoYWxsb3dCbG9ja0NvbGxlY3Rpb25zKSB7XG4gICAgYWxsb3dCbG9ja0NvbGxlY3Rpb25zID0gYXROZXdMaW5lIHx8IGFsbG93Q29tcGFjdDtcbiAgfVxuXG4gIGlmIChpbmRlbnRTdGF0dXMgPT09IDEgfHwgQ09OVEVYVF9CTE9DS19PVVQgPT09IG5vZGVDb250ZXh0KSB7XG4gICAgaWYgKENPTlRFWFRfRkxPV19JTiA9PT0gbm9kZUNvbnRleHQgfHwgQ09OVEVYVF9GTE9XX09VVCA9PT0gbm9kZUNvbnRleHQpIHtcbiAgICAgIGZsb3dJbmRlbnQgPSBwYXJlbnRJbmRlbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZsb3dJbmRlbnQgPSBwYXJlbnRJbmRlbnQgKyAxO1xuICAgIH1cblxuICAgIGJsb2NrSW5kZW50ID0gc3RhdGUucG9zaXRpb24gLSBzdGF0ZS5saW5lU3RhcnQ7XG5cbiAgICBpZiAoaW5kZW50U3RhdHVzID09PSAxKSB7XG4gICAgICBpZiAoYWxsb3dCbG9ja0NvbGxlY3Rpb25zICYmXG4gICAgICAgICAgKHJlYWRCbG9ja1NlcXVlbmNlKHN0YXRlLCBibG9ja0luZGVudCkgfHxcbiAgICAgICAgICAgcmVhZEJsb2NrTWFwcGluZyhzdGF0ZSwgYmxvY2tJbmRlbnQsIGZsb3dJbmRlbnQpKSB8fFxuICAgICAgICAgIHJlYWRGbG93Q29sbGVjdGlvbihzdGF0ZSwgZmxvd0luZGVudCkpIHtcbiAgICAgICAgaGFzQ29udGVudCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoKGFsbG93QmxvY2tTY2FsYXJzICYmIHJlYWRCbG9ja1NjYWxhcihzdGF0ZSwgZmxvd0luZGVudCkpIHx8XG4gICAgICAgICAgICByZWFkU2luZ2xlUXVvdGVkU2NhbGFyKHN0YXRlLCBmbG93SW5kZW50KSB8fFxuICAgICAgICAgICAgcmVhZERvdWJsZVF1b3RlZFNjYWxhcihzdGF0ZSwgZmxvd0luZGVudCkpIHtcbiAgICAgICAgICBoYXNDb250ZW50ID0gdHJ1ZTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlYWRBbGlhcyhzdGF0ZSkpIHtcbiAgICAgICAgICBoYXNDb250ZW50ID0gdHJ1ZTtcblxuICAgICAgICAgIGlmIChzdGF0ZS50YWcgIT09IG51bGwgfHwgc3RhdGUuYW5jaG9yICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnYWxpYXMgbm9kZSBzaG91bGQgbm90IGhhdmUgYW55IHByb3BlcnRpZXMnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZWFkUGxhaW5TY2FsYXIoc3RhdGUsIGZsb3dJbmRlbnQsIENPTlRFWFRfRkxPV19JTiA9PT0gbm9kZUNvbnRleHQpKSB7XG4gICAgICAgICAgaGFzQ29udGVudCA9IHRydWU7XG5cbiAgICAgICAgICBpZiAoc3RhdGUudGFnID09PSBudWxsKSB7XG4gICAgICAgICAgICBzdGF0ZS50YWcgPSAnPyc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0YXRlLmFuY2hvciAhPT0gbnVsbCkge1xuICAgICAgICAgIHN0YXRlLmFuY2hvck1hcFtzdGF0ZS5hbmNob3JdID0gc3RhdGUucmVzdWx0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpbmRlbnRTdGF0dXMgPT09IDApIHtcbiAgICAgIC8vIFNwZWNpYWwgY2FzZTogYmxvY2sgc2VxdWVuY2VzIGFyZSBhbGxvd2VkIHRvIGhhdmUgc2FtZSBpbmRlbnRhdGlvbiBsZXZlbCBhcyB0aGUgcGFyZW50LlxuICAgICAgLy8gaHR0cDovL3d3dy55YW1sLm9yZy9zcGVjLzEuMi9zcGVjLmh0bWwjaWQyNzk5Nzg0XG4gICAgICBoYXNDb250ZW50ID0gYWxsb3dCbG9ja0NvbGxlY3Rpb25zICYmIHJlYWRCbG9ja1NlcXVlbmNlKHN0YXRlLCBibG9ja0luZGVudCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHN0YXRlLnRhZyAhPT0gbnVsbCAmJiBzdGF0ZS50YWcgIT09ICchJykge1xuICAgIGlmIChzdGF0ZS50YWcgPT09ICc/Jykge1xuICAgICAgLy8gSW1wbGljaXQgcmVzb2x2aW5nIGlzIG5vdCBhbGxvd2VkIGZvciBub24tc2NhbGFyIHR5cGVzLCBhbmQgJz8nXG4gICAgICAvLyBub24tc3BlY2lmaWMgdGFnIGlzIG9ubHkgYXV0b21hdGljYWxseSBhc3NpZ25lZCB0byBwbGFpbiBzY2FsYXJzLlxuICAgICAgLy9cbiAgICAgIC8vIFdlIG9ubHkgbmVlZCB0byBjaGVjayBraW5kIGNvbmZvcm1pdHkgaW4gY2FzZSB1c2VyIGV4cGxpY2l0bHkgYXNzaWducyAnPydcbiAgICAgIC8vIHRhZywgZm9yIGV4YW1wbGUgbGlrZSB0aGlzOiBcIiE8Pz4gWzBdXCJcbiAgICAgIC8vXG4gICAgICBpZiAoc3RhdGUucmVzdWx0ICE9PSBudWxsICYmIHN0YXRlLmtpbmQgIT09ICdzY2FsYXInKSB7XG4gICAgICAgIHRocm93RXJyb3Ioc3RhdGUsICd1bmFjY2VwdGFibGUgbm9kZSBraW5kIGZvciAhPD8+IHRhZzsgaXQgc2hvdWxkIGJlIFwic2NhbGFyXCIsIG5vdCBcIicgKyBzdGF0ZS5raW5kICsgJ1wiJyk7XG4gICAgICB9XG5cbiAgICAgIGZvciAodHlwZUluZGV4ID0gMCwgdHlwZVF1YW50aXR5ID0gc3RhdGUuaW1wbGljaXRUeXBlcy5sZW5ndGg7IHR5cGVJbmRleCA8IHR5cGVRdWFudGl0eTsgdHlwZUluZGV4ICs9IDEpIHtcbiAgICAgICAgdHlwZSA9IHN0YXRlLmltcGxpY2l0VHlwZXNbdHlwZUluZGV4XTtcblxuICAgICAgICBpZiAodHlwZS5yZXNvbHZlKHN0YXRlLnJlc3VsdCkpIHsgLy8gYHN0YXRlLnJlc3VsdGAgdXBkYXRlZCBpbiByZXNvbHZlciBpZiBtYXRjaGVkXG4gICAgICAgICAgc3RhdGUucmVzdWx0ID0gdHlwZS5jb25zdHJ1Y3Qoc3RhdGUucmVzdWx0KTtcbiAgICAgICAgICBzdGF0ZS50YWcgPSB0eXBlLnRhZztcbiAgICAgICAgICBpZiAoc3RhdGUuYW5jaG9yICE9PSBudWxsKSB7XG4gICAgICAgICAgICBzdGF0ZS5hbmNob3JNYXBbc3RhdGUuYW5jaG9yXSA9IHN0YXRlLnJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKF9oYXNPd25Qcm9wZXJ0eS5jYWxsKHN0YXRlLnR5cGVNYXBbc3RhdGUua2luZCB8fCAnZmFsbGJhY2snXSwgc3RhdGUudGFnKSkge1xuICAgICAgdHlwZSA9IHN0YXRlLnR5cGVNYXBbc3RhdGUua2luZCB8fCAnZmFsbGJhY2snXVtzdGF0ZS50YWddO1xuXG4gICAgICBpZiAoc3RhdGUucmVzdWx0ICE9PSBudWxsICYmIHR5cGUua2luZCAhPT0gc3RhdGUua2luZCkge1xuICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAndW5hY2NlcHRhYmxlIG5vZGUga2luZCBmb3IgITwnICsgc3RhdGUudGFnICsgJz4gdGFnOyBpdCBzaG91bGQgYmUgXCInICsgdHlwZS5raW5kICsgJ1wiLCBub3QgXCInICsgc3RhdGUua2luZCArICdcIicpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXR5cGUucmVzb2x2ZShzdGF0ZS5yZXN1bHQpKSB7IC8vIGBzdGF0ZS5yZXN1bHRgIHVwZGF0ZWQgaW4gcmVzb2x2ZXIgaWYgbWF0Y2hlZFxuICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnY2Fubm90IHJlc29sdmUgYSBub2RlIHdpdGggITwnICsgc3RhdGUudGFnICsgJz4gZXhwbGljaXQgdGFnJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGF0ZS5yZXN1bHQgPSB0eXBlLmNvbnN0cnVjdChzdGF0ZS5yZXN1bHQpO1xuICAgICAgICBpZiAoc3RhdGUuYW5jaG9yICE9PSBudWxsKSB7XG4gICAgICAgICAgc3RhdGUuYW5jaG9yTWFwW3N0YXRlLmFuY2hvcl0gPSBzdGF0ZS5yZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3Vua25vd24gdGFnICE8JyArIHN0YXRlLnRhZyArICc+Jyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHN0YXRlLmxpc3RlbmVyICE9PSBudWxsKSB7XG4gICAgc3RhdGUubGlzdGVuZXIoJ2Nsb3NlJywgc3RhdGUpO1xuICB9XG4gIHJldHVybiBzdGF0ZS50YWcgIT09IG51bGwgfHwgIHN0YXRlLmFuY2hvciAhPT0gbnVsbCB8fCBoYXNDb250ZW50O1xufVxuXG5mdW5jdGlvbiByZWFkRG9jdW1lbnQoc3RhdGUpIHtcbiAgdmFyIGRvY3VtZW50U3RhcnQgPSBzdGF0ZS5wb3NpdGlvbixcbiAgICAgIF9wb3NpdGlvbixcbiAgICAgIGRpcmVjdGl2ZU5hbWUsXG4gICAgICBkaXJlY3RpdmVBcmdzLFxuICAgICAgaGFzRGlyZWN0aXZlcyA9IGZhbHNlLFxuICAgICAgY2g7XG5cbiAgc3RhdGUudmVyc2lvbiA9IG51bGw7XG4gIHN0YXRlLmNoZWNrTGluZUJyZWFrcyA9IHN0YXRlLmxlZ2FjeTtcbiAgc3RhdGUudGFnTWFwID0ge307XG4gIHN0YXRlLmFuY2hvck1hcCA9IHt9O1xuXG4gIHdoaWxlICgoY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKSkgIT09IDApIHtcbiAgICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCAtMSk7XG5cbiAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gICAgaWYgKHN0YXRlLmxpbmVJbmRlbnQgPiAwIHx8IGNoICE9PSAweDI1LyogJSAqLykge1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaGFzRGlyZWN0aXZlcyA9IHRydWU7XG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgIF9wb3NpdGlvbiA9IHN0YXRlLnBvc2l0aW9uO1xuXG4gICAgd2hpbGUgKGNoICE9PSAwICYmICFpc19XU19PUl9FT0woY2gpKSB7XG4gICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gICAgfVxuXG4gICAgZGlyZWN0aXZlTmFtZSA9IHN0YXRlLmlucHV0LnNsaWNlKF9wb3NpdGlvbiwgc3RhdGUucG9zaXRpb24pO1xuICAgIGRpcmVjdGl2ZUFyZ3MgPSBbXTtcblxuICAgIGlmIChkaXJlY3RpdmVOYW1lLmxlbmd0aCA8IDEpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdkaXJlY3RpdmUgbmFtZSBtdXN0IG5vdCBiZSBsZXNzIHRoYW4gb25lIGNoYXJhY3RlciBpbiBsZW5ndGgnKTtcbiAgICB9XG5cbiAgICB3aGlsZSAoY2ggIT09IDApIHtcbiAgICAgIHdoaWxlIChpc19XSElURV9TUEFDRShjaCkpIHtcbiAgICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2ggPT09IDB4MjMvKiAjICovKSB7XG4gICAgICAgIGRvIHsgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pOyB9XG4gICAgICAgIHdoaWxlIChjaCAhPT0gMCAmJiAhaXNfRU9MKGNoKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNfRU9MKGNoKSkgYnJlYWs7XG5cbiAgICAgIF9wb3NpdGlvbiA9IHN0YXRlLnBvc2l0aW9uO1xuXG4gICAgICB3aGlsZSAoY2ggIT09IDAgJiYgIWlzX1dTX09SX0VPTChjaCkpIHtcbiAgICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgICAgfVxuXG4gICAgICBkaXJlY3RpdmVBcmdzLnB1c2goc3RhdGUuaW5wdXQuc2xpY2UoX3Bvc2l0aW9uLCBzdGF0ZS5wb3NpdGlvbikpO1xuICAgIH1cblxuICAgIGlmIChjaCAhPT0gMCkgcmVhZExpbmVCcmVhayhzdGF0ZSk7XG5cbiAgICBpZiAoX2hhc093blByb3BlcnR5LmNhbGwoZGlyZWN0aXZlSGFuZGxlcnMsIGRpcmVjdGl2ZU5hbWUpKSB7XG4gICAgICBkaXJlY3RpdmVIYW5kbGVyc1tkaXJlY3RpdmVOYW1lXShzdGF0ZSwgZGlyZWN0aXZlTmFtZSwgZGlyZWN0aXZlQXJncyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93V2FybmluZyhzdGF0ZSwgJ3Vua25vd24gZG9jdW1lbnQgZGlyZWN0aXZlIFwiJyArIGRpcmVjdGl2ZU5hbWUgKyAnXCInKTtcbiAgICB9XG4gIH1cblxuICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCAtMSk7XG5cbiAgaWYgKHN0YXRlLmxpbmVJbmRlbnQgPT09IDAgJiZcbiAgICAgIHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pICAgICA9PT0gMHgyRC8qIC0gKi8gJiZcbiAgICAgIHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24gKyAxKSA9PT0gMHgyRC8qIC0gKi8gJiZcbiAgICAgIHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24gKyAyKSA9PT0gMHgyRC8qIC0gKi8pIHtcbiAgICBzdGF0ZS5wb3NpdGlvbiArPSAzO1xuICAgIHNraXBTZXBhcmF0aW9uU3BhY2Uoc3RhdGUsIHRydWUsIC0xKTtcblxuICB9IGVsc2UgaWYgKGhhc0RpcmVjdGl2ZXMpIHtcbiAgICB0aHJvd0Vycm9yKHN0YXRlLCAnZGlyZWN0aXZlcyBlbmQgbWFyayBpcyBleHBlY3RlZCcpO1xuICB9XG5cbiAgY29tcG9zZU5vZGUoc3RhdGUsIHN0YXRlLmxpbmVJbmRlbnQgLSAxLCBDT05URVhUX0JMT0NLX09VVCwgZmFsc2UsIHRydWUpO1xuICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCAtMSk7XG5cbiAgaWYgKHN0YXRlLmNoZWNrTGluZUJyZWFrcyAmJlxuICAgICAgUEFUVEVSTl9OT05fQVNDSUlfTElORV9CUkVBS1MudGVzdChzdGF0ZS5pbnB1dC5zbGljZShkb2N1bWVudFN0YXJ0LCBzdGF0ZS5wb3NpdGlvbikpKSB7XG4gICAgdGhyb3dXYXJuaW5nKHN0YXRlLCAnbm9uLUFTQ0lJIGxpbmUgYnJlYWtzIGFyZSBpbnRlcnByZXRlZCBhcyBjb250ZW50Jyk7XG4gIH1cblxuICBzdGF0ZS5kb2N1bWVudHMucHVzaChzdGF0ZS5yZXN1bHQpO1xuXG4gIGlmIChzdGF0ZS5wb3NpdGlvbiA9PT0gc3RhdGUubGluZVN0YXJ0ICYmIHRlc3REb2N1bWVudFNlcGFyYXRvcihzdGF0ZSkpIHtcblxuICAgIGlmIChzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKSA9PT0gMHgyRS8qIC4gKi8pIHtcbiAgICAgIHN0YXRlLnBvc2l0aW9uICs9IDM7XG4gICAgICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCAtMSk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChzdGF0ZS5wb3NpdGlvbiA8IChzdGF0ZS5sZW5ndGggLSAxKSkge1xuICAgIHRocm93RXJyb3Ioc3RhdGUsICdlbmQgb2YgdGhlIHN0cmVhbSBvciBhIGRvY3VtZW50IHNlcGFyYXRvciBpcyBleHBlY3RlZCcpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybjtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGxvYWREb2N1bWVudHMoaW5wdXQsIG9wdGlvbnMpIHtcbiAgaW5wdXQgPSBTdHJpbmcoaW5wdXQpO1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICBpZiAoaW5wdXQubGVuZ3RoICE9PSAwKSB7XG5cbiAgICAvLyBBZGQgdGFpbGluZyBgXFxuYCBpZiBub3QgZXhpc3RzXG4gICAgaWYgKGlucHV0LmNoYXJDb2RlQXQoaW5wdXQubGVuZ3RoIC0gMSkgIT09IDB4MEEvKiBMRiAqLyAmJlxuICAgICAgICBpbnB1dC5jaGFyQ29kZUF0KGlucHV0Lmxlbmd0aCAtIDEpICE9PSAweDBELyogQ1IgKi8pIHtcbiAgICAgIGlucHV0ICs9ICdcXG4nO1xuICAgIH1cblxuICAgIC8vIFN0cmlwIEJPTVxuICAgIGlmIChpbnB1dC5jaGFyQ29kZUF0KDApID09PSAweEZFRkYpIHtcbiAgICAgIGlucHV0ID0gaW5wdXQuc2xpY2UoMSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIHN0YXRlID0gbmV3IFN0YXRlKGlucHV0LCBvcHRpb25zKTtcblxuICB2YXIgbnVsbHBvcyA9IGlucHV0LmluZGV4T2YoJ1xcMCcpO1xuXG4gIGlmIChudWxscG9zICE9PSAtMSkge1xuICAgIHN0YXRlLnBvc2l0aW9uID0gbnVsbHBvcztcbiAgICB0aHJvd0Vycm9yKHN0YXRlLCAnbnVsbCBieXRlIGlzIG5vdCBhbGxvd2VkIGluIGlucHV0Jyk7XG4gIH1cblxuICAvLyBVc2UgMCBhcyBzdHJpbmcgdGVybWluYXRvci4gVGhhdCBzaWduaWZpY2FudGx5IHNpbXBsaWZpZXMgYm91bmRzIGNoZWNrLlxuICBzdGF0ZS5pbnB1dCArPSAnXFwwJztcblxuICB3aGlsZSAoc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbikgPT09IDB4MjAvKiBTcGFjZSAqLykge1xuICAgIHN0YXRlLmxpbmVJbmRlbnQgKz0gMTtcbiAgICBzdGF0ZS5wb3NpdGlvbiArPSAxO1xuICB9XG5cbiAgd2hpbGUgKHN0YXRlLnBvc2l0aW9uIDwgKHN0YXRlLmxlbmd0aCAtIDEpKSB7XG4gICAgcmVhZERvY3VtZW50KHN0YXRlKTtcbiAgfVxuXG4gIHJldHVybiBzdGF0ZS5kb2N1bWVudHM7XG59XG5cblxuZnVuY3Rpb24gbG9hZEFsbChpbnB1dCwgaXRlcmF0b3IsIG9wdGlvbnMpIHtcbiAgaWYgKGl0ZXJhdG9yICE9PSBudWxsICYmIHR5cGVvZiBpdGVyYXRvciA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG9wdGlvbnMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgb3B0aW9ucyA9IGl0ZXJhdG9yO1xuICAgIGl0ZXJhdG9yID0gbnVsbDtcbiAgfVxuXG4gIHZhciBkb2N1bWVudHMgPSBsb2FkRG9jdW1lbnRzKGlucHV0LCBvcHRpb25zKTtcblxuICBpZiAodHlwZW9mIGl0ZXJhdG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50cztcbiAgfVxuXG4gIGZvciAodmFyIGluZGV4ID0gMCwgbGVuZ3RoID0gZG9jdW1lbnRzLmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICBpdGVyYXRvcihkb2N1bWVudHNbaW5kZXhdKTtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGxvYWQoaW5wdXQsIG9wdGlvbnMpIHtcbiAgdmFyIGRvY3VtZW50cyA9IGxvYWREb2N1bWVudHMoaW5wdXQsIG9wdGlvbnMpO1xuXG4gIGlmIChkb2N1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgLyplc2xpbnQtZGlzYWJsZSBuby11bmRlZmluZWQqL1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH0gZWxzZSBpZiAoZG9jdW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBkb2N1bWVudHNbMF07XG4gIH1cbiAgdGhyb3cgbmV3IFlBTUxFeGNlcHRpb24oJ2V4cGVjdGVkIGEgc2luZ2xlIGRvY3VtZW50IGluIHRoZSBzdHJlYW0sIGJ1dCBmb3VuZCBtb3JlJyk7XG59XG5cblxuZnVuY3Rpb24gc2FmZUxvYWRBbGwoaW5wdXQsIGl0ZXJhdG9yLCBvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgaXRlcmF0b3IgPT09ICdvYmplY3QnICYmIGl0ZXJhdG9yICE9PSBudWxsICYmIHR5cGVvZiBvcHRpb25zID09PSAndW5kZWZpbmVkJykge1xuICAgIG9wdGlvbnMgPSBpdGVyYXRvcjtcbiAgICBpdGVyYXRvciA9IG51bGw7XG4gIH1cblxuICByZXR1cm4gbG9hZEFsbChpbnB1dCwgaXRlcmF0b3IsIGNvbW1vbi5leHRlbmQoeyBzY2hlbWE6IERFRkFVTFRfU0FGRV9TQ0hFTUEgfSwgb3B0aW9ucykpO1xufVxuXG5cbmZ1bmN0aW9uIHNhZmVMb2FkKGlucHV0LCBvcHRpb25zKSB7XG4gIHJldHVybiBsb2FkKGlucHV0LCBjb21tb24uZXh0ZW5kKHsgc2NoZW1hOiBERUZBVUxUX1NBRkVfU0NIRU1BIH0sIG9wdGlvbnMpKTtcbn1cblxuXG5tb2R1bGUuZXhwb3J0cy5sb2FkQWxsICAgICA9IGxvYWRBbGw7XG5tb2R1bGUuZXhwb3J0cy5sb2FkICAgICAgICA9IGxvYWQ7XG5tb2R1bGUuZXhwb3J0cy5zYWZlTG9hZEFsbCA9IHNhZmVMb2FkQWxsO1xubW9kdWxlLmV4cG9ydHMuc2FmZUxvYWQgICAgPSBzYWZlTG9hZDtcbiIsICIndXNlIHN0cmljdCc7XG5cbi8qZXNsaW50LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUqL1xuXG52YXIgY29tbW9uICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG52YXIgWUFNTEV4Y2VwdGlvbiAgICAgICA9IHJlcXVpcmUoJy4vZXhjZXB0aW9uJyk7XG52YXIgREVGQVVMVF9GVUxMX1NDSEVNQSA9IHJlcXVpcmUoJy4vc2NoZW1hL2RlZmF1bHRfZnVsbCcpO1xudmFyIERFRkFVTFRfU0FGRV9TQ0hFTUEgPSByZXF1aXJlKCcuL3NjaGVtYS9kZWZhdWx0X3NhZmUnKTtcblxudmFyIF90b1N0cmluZyAgICAgICA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgX2hhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxudmFyIENIQVJfVEFCICAgICAgICAgICAgICAgICAgPSAweDA5OyAvKiBUYWIgKi9cbnZhciBDSEFSX0xJTkVfRkVFRCAgICAgICAgICAgID0gMHgwQTsgLyogTEYgKi9cbnZhciBDSEFSX0NBUlJJQUdFX1JFVFVSTiAgICAgID0gMHgwRDsgLyogQ1IgKi9cbnZhciBDSEFSX1NQQUNFICAgICAgICAgICAgICAgID0gMHgyMDsgLyogU3BhY2UgKi9cbnZhciBDSEFSX0VYQ0xBTUFUSU9OICAgICAgICAgID0gMHgyMTsgLyogISAqL1xudmFyIENIQVJfRE9VQkxFX1FVT1RFICAgICAgICAgPSAweDIyOyAvKiBcIiAqL1xudmFyIENIQVJfU0hBUlAgICAgICAgICAgICAgICAgPSAweDIzOyAvKiAjICovXG52YXIgQ0hBUl9QRVJDRU5UICAgICAgICAgICAgICA9IDB4MjU7IC8qICUgKi9cbnZhciBDSEFSX0FNUEVSU0FORCAgICAgICAgICAgID0gMHgyNjsgLyogJiAqL1xudmFyIENIQVJfU0lOR0xFX1FVT1RFICAgICAgICAgPSAweDI3OyAvKiAnICovXG52YXIgQ0hBUl9BU1RFUklTSyAgICAgICAgICAgICA9IDB4MkE7IC8qICogKi9cbnZhciBDSEFSX0NPTU1BICAgICAgICAgICAgICAgID0gMHgyQzsgLyogLCAqL1xudmFyIENIQVJfTUlOVVMgICAgICAgICAgICAgICAgPSAweDJEOyAvKiAtICovXG52YXIgQ0hBUl9DT0xPTiAgICAgICAgICAgICAgICA9IDB4M0E7IC8qIDogKi9cbnZhciBDSEFSX0VRVUFMUyAgICAgICAgICAgICAgID0gMHgzRDsgLyogPSAqL1xudmFyIENIQVJfR1JFQVRFUl9USEFOICAgICAgICAgPSAweDNFOyAvKiA+ICovXG52YXIgQ0hBUl9RVUVTVElPTiAgICAgICAgICAgICA9IDB4M0Y7IC8qID8gKi9cbnZhciBDSEFSX0NPTU1FUkNJQUxfQVQgICAgICAgID0gMHg0MDsgLyogQCAqL1xudmFyIENIQVJfTEVGVF9TUVVBUkVfQlJBQ0tFVCAgPSAweDVCOyAvKiBbICovXG52YXIgQ0hBUl9SSUdIVF9TUVVBUkVfQlJBQ0tFVCA9IDB4NUQ7IC8qIF0gKi9cbnZhciBDSEFSX0dSQVZFX0FDQ0VOVCAgICAgICAgID0gMHg2MDsgLyogYCAqL1xudmFyIENIQVJfTEVGVF9DVVJMWV9CUkFDS0VUICAgPSAweDdCOyAvKiB7ICovXG52YXIgQ0hBUl9WRVJUSUNBTF9MSU5FICAgICAgICA9IDB4N0M7IC8qIHwgKi9cbnZhciBDSEFSX1JJR0hUX0NVUkxZX0JSQUNLRVQgID0gMHg3RDsgLyogfSAqL1xuXG52YXIgRVNDQVBFX1NFUVVFTkNFUyA9IHt9O1xuXG5FU0NBUEVfU0VRVUVOQ0VTWzB4MDBdICAgPSAnXFxcXDAnO1xuRVNDQVBFX1NFUVVFTkNFU1sweDA3XSAgID0gJ1xcXFxhJztcbkVTQ0FQRV9TRVFVRU5DRVNbMHgwOF0gICA9ICdcXFxcYic7XG5FU0NBUEVfU0VRVUVOQ0VTWzB4MDldICAgPSAnXFxcXHQnO1xuRVNDQVBFX1NFUVVFTkNFU1sweDBBXSAgID0gJ1xcXFxuJztcbkVTQ0FQRV9TRVFVRU5DRVNbMHgwQl0gICA9ICdcXFxcdic7XG5FU0NBUEVfU0VRVUVOQ0VTWzB4MENdICAgPSAnXFxcXGYnO1xuRVNDQVBFX1NFUVVFTkNFU1sweDBEXSAgID0gJ1xcXFxyJztcbkVTQ0FQRV9TRVFVRU5DRVNbMHgxQl0gICA9ICdcXFxcZSc7XG5FU0NBUEVfU0VRVUVOQ0VTWzB4MjJdICAgPSAnXFxcXFwiJztcbkVTQ0FQRV9TRVFVRU5DRVNbMHg1Q10gICA9ICdcXFxcXFxcXCc7XG5FU0NBUEVfU0VRVUVOQ0VTWzB4ODVdICAgPSAnXFxcXE4nO1xuRVNDQVBFX1NFUVVFTkNFU1sweEEwXSAgID0gJ1xcXFxfJztcbkVTQ0FQRV9TRVFVRU5DRVNbMHgyMDI4XSA9ICdcXFxcTCc7XG5FU0NBUEVfU0VRVUVOQ0VTWzB4MjAyOV0gPSAnXFxcXFAnO1xuXG52YXIgREVQUkVDQVRFRF9CT09MRUFOU19TWU5UQVggPSBbXG4gICd5JywgJ1knLCAneWVzJywgJ1llcycsICdZRVMnLCAnb24nLCAnT24nLCAnT04nLFxuICAnbicsICdOJywgJ25vJywgJ05vJywgJ05PJywgJ29mZicsICdPZmYnLCAnT0ZGJ1xuXTtcblxuZnVuY3Rpb24gY29tcGlsZVN0eWxlTWFwKHNjaGVtYSwgbWFwKSB7XG4gIHZhciByZXN1bHQsIGtleXMsIGluZGV4LCBsZW5ndGgsIHRhZywgc3R5bGUsIHR5cGU7XG5cbiAgaWYgKG1hcCA9PT0gbnVsbCkgcmV0dXJuIHt9O1xuXG4gIHJlc3VsdCA9IHt9O1xuICBrZXlzID0gT2JqZWN0LmtleXMobWFwKTtcblxuICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgdGFnID0ga2V5c1tpbmRleF07XG4gICAgc3R5bGUgPSBTdHJpbmcobWFwW3RhZ10pO1xuXG4gICAgaWYgKHRhZy5zbGljZSgwLCAyKSA9PT0gJyEhJykge1xuICAgICAgdGFnID0gJ3RhZzp5YW1sLm9yZywyMDAyOicgKyB0YWcuc2xpY2UoMik7XG4gICAgfVxuICAgIHR5cGUgPSBzY2hlbWEuY29tcGlsZWRUeXBlTWFwWydmYWxsYmFjayddW3RhZ107XG5cbiAgICBpZiAodHlwZSAmJiBfaGFzT3duUHJvcGVydHkuY2FsbCh0eXBlLnN0eWxlQWxpYXNlcywgc3R5bGUpKSB7XG4gICAgICBzdHlsZSA9IHR5cGUuc3R5bGVBbGlhc2VzW3N0eWxlXTtcbiAgICB9XG5cbiAgICByZXN1bHRbdGFnXSA9IHN0eWxlO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gZW5jb2RlSGV4KGNoYXJhY3Rlcikge1xuICB2YXIgc3RyaW5nLCBoYW5kbGUsIGxlbmd0aDtcblxuICBzdHJpbmcgPSBjaGFyYWN0ZXIudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XG5cbiAgaWYgKGNoYXJhY3RlciA8PSAweEZGKSB7XG4gICAgaGFuZGxlID0gJ3gnO1xuICAgIGxlbmd0aCA9IDI7XG4gIH0gZWxzZSBpZiAoY2hhcmFjdGVyIDw9IDB4RkZGRikge1xuICAgIGhhbmRsZSA9ICd1JztcbiAgICBsZW5ndGggPSA0O1xuICB9IGVsc2UgaWYgKGNoYXJhY3RlciA8PSAweEZGRkZGRkZGKSB7XG4gICAgaGFuZGxlID0gJ1UnO1xuICAgIGxlbmd0aCA9IDg7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFlBTUxFeGNlcHRpb24oJ2NvZGUgcG9pbnQgd2l0aGluIGEgc3RyaW5nIG1heSBub3QgYmUgZ3JlYXRlciB0aGFuIDB4RkZGRkZGRkYnKTtcbiAgfVxuXG4gIHJldHVybiAnXFxcXCcgKyBoYW5kbGUgKyBjb21tb24ucmVwZWF0KCcwJywgbGVuZ3RoIC0gc3RyaW5nLmxlbmd0aCkgKyBzdHJpbmc7XG59XG5cbmZ1bmN0aW9uIFN0YXRlKG9wdGlvbnMpIHtcbiAgdGhpcy5zY2hlbWEgICAgICAgID0gb3B0aW9uc1snc2NoZW1hJ10gfHwgREVGQVVMVF9GVUxMX1NDSEVNQTtcbiAgdGhpcy5pbmRlbnQgICAgICAgID0gTWF0aC5tYXgoMSwgKG9wdGlvbnNbJ2luZGVudCddIHx8IDIpKTtcbiAgdGhpcy5ub0FycmF5SW5kZW50ID0gb3B0aW9uc1snbm9BcnJheUluZGVudCddIHx8IGZhbHNlO1xuICB0aGlzLnNraXBJbnZhbGlkICAgPSBvcHRpb25zWydza2lwSW52YWxpZCddIHx8IGZhbHNlO1xuICB0aGlzLmZsb3dMZXZlbCAgICAgPSAoY29tbW9uLmlzTm90aGluZyhvcHRpb25zWydmbG93TGV2ZWwnXSkgPyAtMSA6IG9wdGlvbnNbJ2Zsb3dMZXZlbCddKTtcbiAgdGhpcy5zdHlsZU1hcCAgICAgID0gY29tcGlsZVN0eWxlTWFwKHRoaXMuc2NoZW1hLCBvcHRpb25zWydzdHlsZXMnXSB8fCBudWxsKTtcbiAgdGhpcy5zb3J0S2V5cyAgICAgID0gb3B0aW9uc1snc29ydEtleXMnXSB8fCBmYWxzZTtcbiAgdGhpcy5saW5lV2lkdGggICAgID0gb3B0aW9uc1snbGluZVdpZHRoJ10gfHwgODA7XG4gIHRoaXMubm9SZWZzICAgICAgICA9IG9wdGlvbnNbJ25vUmVmcyddIHx8IGZhbHNlO1xuICB0aGlzLm5vQ29tcGF0TW9kZSAgPSBvcHRpb25zWydub0NvbXBhdE1vZGUnXSB8fCBmYWxzZTtcbiAgdGhpcy5jb25kZW5zZUZsb3cgID0gb3B0aW9uc1snY29uZGVuc2VGbG93J10gfHwgZmFsc2U7XG5cbiAgdGhpcy5pbXBsaWNpdFR5cGVzID0gdGhpcy5zY2hlbWEuY29tcGlsZWRJbXBsaWNpdDtcbiAgdGhpcy5leHBsaWNpdFR5cGVzID0gdGhpcy5zY2hlbWEuY29tcGlsZWRFeHBsaWNpdDtcblxuICB0aGlzLnRhZyA9IG51bGw7XG4gIHRoaXMucmVzdWx0ID0gJyc7XG5cbiAgdGhpcy5kdXBsaWNhdGVzID0gW107XG4gIHRoaXMudXNlZER1cGxpY2F0ZXMgPSBudWxsO1xufVxuXG4vLyBJbmRlbnRzIGV2ZXJ5IGxpbmUgaW4gYSBzdHJpbmcuIEVtcHR5IGxpbmVzIChcXG4gb25seSkgYXJlIG5vdCBpbmRlbnRlZC5cbmZ1bmN0aW9uIGluZGVudFN0cmluZyhzdHJpbmcsIHNwYWNlcykge1xuICB2YXIgaW5kID0gY29tbW9uLnJlcGVhdCgnICcsIHNwYWNlcyksXG4gICAgICBwb3NpdGlvbiA9IDAsXG4gICAgICBuZXh0ID0gLTEsXG4gICAgICByZXN1bHQgPSAnJyxcbiAgICAgIGxpbmUsXG4gICAgICBsZW5ndGggPSBzdHJpbmcubGVuZ3RoO1xuXG4gIHdoaWxlIChwb3NpdGlvbiA8IGxlbmd0aCkge1xuICAgIG5leHQgPSBzdHJpbmcuaW5kZXhPZignXFxuJywgcG9zaXRpb24pO1xuICAgIGlmIChuZXh0ID09PSAtMSkge1xuICAgICAgbGluZSA9IHN0cmluZy5zbGljZShwb3NpdGlvbik7XG4gICAgICBwb3NpdGlvbiA9IGxlbmd0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgbGluZSA9IHN0cmluZy5zbGljZShwb3NpdGlvbiwgbmV4dCArIDEpO1xuICAgICAgcG9zaXRpb24gPSBuZXh0ICsgMTtcbiAgICB9XG5cbiAgICBpZiAobGluZS5sZW5ndGggJiYgbGluZSAhPT0gJ1xcbicpIHJlc3VsdCArPSBpbmQ7XG5cbiAgICByZXN1bHQgKz0gbGluZTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmV4dExpbmUoc3RhdGUsIGxldmVsKSB7XG4gIHJldHVybiAnXFxuJyArIGNvbW1vbi5yZXBlYXQoJyAnLCBzdGF0ZS5pbmRlbnQgKiBsZXZlbCk7XG59XG5cbmZ1bmN0aW9uIHRlc3RJbXBsaWNpdFJlc29sdmluZyhzdGF0ZSwgc3RyKSB7XG4gIHZhciBpbmRleCwgbGVuZ3RoLCB0eXBlO1xuXG4gIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSBzdGF0ZS5pbXBsaWNpdFR5cGVzLmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICB0eXBlID0gc3RhdGUuaW1wbGljaXRUeXBlc1tpbmRleF07XG5cbiAgICBpZiAodHlwZS5yZXNvbHZlKHN0cikpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuLy8gWzMzXSBzLXdoaXRlIDo6PSBzLXNwYWNlIHwgcy10YWJcbmZ1bmN0aW9uIGlzV2hpdGVzcGFjZShjKSB7XG4gIHJldHVybiBjID09PSBDSEFSX1NQQUNFIHx8IGMgPT09IENIQVJfVEFCO1xufVxuXG4vLyBSZXR1cm5zIHRydWUgaWYgdGhlIGNoYXJhY3RlciBjYW4gYmUgcHJpbnRlZCB3aXRob3V0IGVzY2FwaW5nLlxuLy8gRnJvbSBZQU1MIDEuMjogXCJhbnkgYWxsb3dlZCBjaGFyYWN0ZXJzIGtub3duIHRvIGJlIG5vbi1wcmludGFibGVcbi8vIHNob3VsZCBhbHNvIGJlIGVzY2FwZWQuIFtIb3dldmVyLF0gVGhpcyBpc25cdTIwMTl0IG1hbmRhdG9yeVwiXG4vLyBEZXJpdmVkIGZyb20gbmItY2hhciAtIFxcdCAtICN4ODUgLSAjeEEwIC0gI3gyMDI4IC0gI3gyMDI5LlxuZnVuY3Rpb24gaXNQcmludGFibGUoYykge1xuICByZXR1cm4gICgweDAwMDIwIDw9IGMgJiYgYyA8PSAweDAwMDA3RSlcbiAgICAgIHx8ICgoMHgwMDBBMSA8PSBjICYmIGMgPD0gMHgwMEQ3RkYpICYmIGMgIT09IDB4MjAyOCAmJiBjICE9PSAweDIwMjkpXG4gICAgICB8fCAoKDB4MEUwMDAgPD0gYyAmJiBjIDw9IDB4MDBGRkZEKSAmJiBjICE9PSAweEZFRkYgLyogQk9NICovKVxuICAgICAgfHwgICgweDEwMDAwIDw9IGMgJiYgYyA8PSAweDEwRkZGRik7XG59XG5cbi8vIFszNF0gbnMtY2hhciA6Oj0gbmItY2hhciAtIHMtd2hpdGVcbi8vIFsyN10gbmItY2hhciA6Oj0gYy1wcmludGFibGUgLSBiLWNoYXIgLSBjLWJ5dGUtb3JkZXItbWFya1xuLy8gWzI2XSBiLWNoYXIgIDo6PSBiLWxpbmUtZmVlZCB8IGItY2FycmlhZ2UtcmV0dXJuXG4vLyBbMjRdIGItbGluZS1mZWVkICAgICAgIDo6PSAgICAgI3hBICAgIC8qIExGICovXG4vLyBbMjVdIGItY2FycmlhZ2UtcmV0dXJuIDo6PSAgICAgI3hEICAgIC8qIENSICovXG4vLyBbM10gIGMtYnl0ZS1vcmRlci1tYXJrIDo6PSAgICAgI3hGRUZGXG5mdW5jdGlvbiBpc05zQ2hhcihjKSB7XG4gIHJldHVybiBpc1ByaW50YWJsZShjKSAmJiAhaXNXaGl0ZXNwYWNlKGMpXG4gICAgLy8gYnl0ZS1vcmRlci1tYXJrXG4gICAgJiYgYyAhPT0gMHhGRUZGXG4gICAgLy8gYi1jaGFyXG4gICAgJiYgYyAhPT0gQ0hBUl9DQVJSSUFHRV9SRVRVUk5cbiAgICAmJiBjICE9PSBDSEFSX0xJTkVfRkVFRDtcbn1cblxuLy8gU2ltcGxpZmllZCB0ZXN0IGZvciB2YWx1ZXMgYWxsb3dlZCBhZnRlciB0aGUgZmlyc3QgY2hhcmFjdGVyIGluIHBsYWluIHN0eWxlLlxuZnVuY3Rpb24gaXNQbGFpblNhZmUoYywgcHJldikge1xuICAvLyBVc2VzIGEgc3Vic2V0IG9mIG5iLWNoYXIgLSBjLWZsb3ctaW5kaWNhdG9yIC0gXCI6XCIgLSBcIiNcIlxuICAvLyB3aGVyZSBuYi1jaGFyIDo6PSBjLXByaW50YWJsZSAtIGItY2hhciAtIGMtYnl0ZS1vcmRlci1tYXJrLlxuICByZXR1cm4gaXNQcmludGFibGUoYykgJiYgYyAhPT0gMHhGRUZGXG4gICAgLy8gLSBjLWZsb3ctaW5kaWNhdG9yXG4gICAgJiYgYyAhPT0gQ0hBUl9DT01NQVxuICAgICYmIGMgIT09IENIQVJfTEVGVF9TUVVBUkVfQlJBQ0tFVFxuICAgICYmIGMgIT09IENIQVJfUklHSFRfU1FVQVJFX0JSQUNLRVRcbiAgICAmJiBjICE9PSBDSEFSX0xFRlRfQ1VSTFlfQlJBQ0tFVFxuICAgICYmIGMgIT09IENIQVJfUklHSFRfQ1VSTFlfQlJBQ0tFVFxuICAgIC8vIC0gXCI6XCIgLSBcIiNcIlxuICAgIC8vIC8qIEFuIG5zLWNoYXIgcHJlY2VkaW5nICovIFwiI1wiXG4gICAgJiYgYyAhPT0gQ0hBUl9DT0xPTlxuICAgICYmICgoYyAhPT0gQ0hBUl9TSEFSUCkgfHwgKHByZXYgJiYgaXNOc0NoYXIocHJldikpKTtcbn1cblxuLy8gU2ltcGxpZmllZCB0ZXN0IGZvciB2YWx1ZXMgYWxsb3dlZCBhcyB0aGUgZmlyc3QgY2hhcmFjdGVyIGluIHBsYWluIHN0eWxlLlxuZnVuY3Rpb24gaXNQbGFpblNhZmVGaXJzdChjKSB7XG4gIC8vIFVzZXMgYSBzdWJzZXQgb2YgbnMtY2hhciAtIGMtaW5kaWNhdG9yXG4gIC8vIHdoZXJlIG5zLWNoYXIgPSBuYi1jaGFyIC0gcy13aGl0ZS5cbiAgcmV0dXJuIGlzUHJpbnRhYmxlKGMpICYmIGMgIT09IDB4RkVGRlxuICAgICYmICFpc1doaXRlc3BhY2UoYykgLy8gLSBzLXdoaXRlXG4gICAgLy8gLSAoYy1pbmRpY2F0b3IgOjo9XG4gICAgLy8gXHUyMDFDLVx1MjAxRCB8IFx1MjAxQz9cdTIwMUQgfCBcdTIwMUM6XHUyMDFEIHwgXHUyMDFDLFx1MjAxRCB8IFx1MjAxQ1tcdTIwMUQgfCBcdTIwMUNdXHUyMDFEIHwgXHUyMDFDe1x1MjAxRCB8IFx1MjAxQ31cdTIwMURcbiAgICAmJiBjICE9PSBDSEFSX01JTlVTXG4gICAgJiYgYyAhPT0gQ0hBUl9RVUVTVElPTlxuICAgICYmIGMgIT09IENIQVJfQ09MT05cbiAgICAmJiBjICE9PSBDSEFSX0NPTU1BXG4gICAgJiYgYyAhPT0gQ0hBUl9MRUZUX1NRVUFSRV9CUkFDS0VUXG4gICAgJiYgYyAhPT0gQ0hBUl9SSUdIVF9TUVVBUkVfQlJBQ0tFVFxuICAgICYmIGMgIT09IENIQVJfTEVGVF9DVVJMWV9CUkFDS0VUXG4gICAgJiYgYyAhPT0gQ0hBUl9SSUdIVF9DVVJMWV9CUkFDS0VUXG4gICAgLy8gfCBcdTIwMUMjXHUyMDFEIHwgXHUyMDFDJlx1MjAxRCB8IFx1MjAxQypcdTIwMUQgfCBcdTIwMUMhXHUyMDFEIHwgXHUyMDFDfFx1MjAxRCB8IFx1MjAxQz1cdTIwMUQgfCBcdTIwMUM+XHUyMDFEIHwgXHUyMDFDJ1x1MjAxRCB8IFx1MjAxQ1wiXHUyMDFEXG4gICAgJiYgYyAhPT0gQ0hBUl9TSEFSUFxuICAgICYmIGMgIT09IENIQVJfQU1QRVJTQU5EXG4gICAgJiYgYyAhPT0gQ0hBUl9BU1RFUklTS1xuICAgICYmIGMgIT09IENIQVJfRVhDTEFNQVRJT05cbiAgICAmJiBjICE9PSBDSEFSX1ZFUlRJQ0FMX0xJTkVcbiAgICAmJiBjICE9PSBDSEFSX0VRVUFMU1xuICAgICYmIGMgIT09IENIQVJfR1JFQVRFUl9USEFOXG4gICAgJiYgYyAhPT0gQ0hBUl9TSU5HTEVfUVVPVEVcbiAgICAmJiBjICE9PSBDSEFSX0RPVUJMRV9RVU9URVxuICAgIC8vIHwgXHUyMDFDJVx1MjAxRCB8IFx1MjAxQ0BcdTIwMUQgfCBcdTIwMUNgXHUyMDFEKVxuICAgICYmIGMgIT09IENIQVJfUEVSQ0VOVFxuICAgICYmIGMgIT09IENIQVJfQ09NTUVSQ0lBTF9BVFxuICAgICYmIGMgIT09IENIQVJfR1JBVkVfQUNDRU5UO1xufVxuXG4vLyBEZXRlcm1pbmVzIHdoZXRoZXIgYmxvY2sgaW5kZW50YXRpb24gaW5kaWNhdG9yIGlzIHJlcXVpcmVkLlxuZnVuY3Rpb24gbmVlZEluZGVudEluZGljYXRvcihzdHJpbmcpIHtcbiAgdmFyIGxlYWRpbmdTcGFjZVJlID0gL15cXG4qIC87XG4gIHJldHVybiBsZWFkaW5nU3BhY2VSZS50ZXN0KHN0cmluZyk7XG59XG5cbnZhciBTVFlMRV9QTEFJTiAgID0gMSxcbiAgICBTVFlMRV9TSU5HTEUgID0gMixcbiAgICBTVFlMRV9MSVRFUkFMID0gMyxcbiAgICBTVFlMRV9GT0xERUQgID0gNCxcbiAgICBTVFlMRV9ET1VCTEUgID0gNTtcblxuLy8gRGV0ZXJtaW5lcyB3aGljaCBzY2FsYXIgc3R5bGVzIGFyZSBwb3NzaWJsZSBhbmQgcmV0dXJucyB0aGUgcHJlZmVycmVkIHN0eWxlLlxuLy8gbGluZVdpZHRoID0gLTEgPT4gbm8gbGltaXQuXG4vLyBQcmUtY29uZGl0aW9uczogc3RyLmxlbmd0aCA+IDAuXG4vLyBQb3N0LWNvbmRpdGlvbnM6XG4vLyAgICBTVFlMRV9QTEFJTiBvciBTVFlMRV9TSU5HTEUgPT4gbm8gXFxuIGFyZSBpbiB0aGUgc3RyaW5nLlxuLy8gICAgU1RZTEVfTElURVJBTCA9PiBubyBsaW5lcyBhcmUgc3VpdGFibGUgZm9yIGZvbGRpbmcgKG9yIGxpbmVXaWR0aCBpcyAtMSkuXG4vLyAgICBTVFlMRV9GT0xERUQgPT4gYSBsaW5lID4gbGluZVdpZHRoIGFuZCBjYW4gYmUgZm9sZGVkIChhbmQgbGluZVdpZHRoICE9IC0xKS5cbmZ1bmN0aW9uIGNob29zZVNjYWxhclN0eWxlKHN0cmluZywgc2luZ2xlTGluZU9ubHksIGluZGVudFBlckxldmVsLCBsaW5lV2lkdGgsIHRlc3RBbWJpZ3VvdXNUeXBlKSB7XG4gIHZhciBpO1xuICB2YXIgY2hhciwgcHJldl9jaGFyO1xuICB2YXIgaGFzTGluZUJyZWFrID0gZmFsc2U7XG4gIHZhciBoYXNGb2xkYWJsZUxpbmUgPSBmYWxzZTsgLy8gb25seSBjaGVja2VkIGlmIHNob3VsZFRyYWNrV2lkdGhcbiAgdmFyIHNob3VsZFRyYWNrV2lkdGggPSBsaW5lV2lkdGggIT09IC0xO1xuICB2YXIgcHJldmlvdXNMaW5lQnJlYWsgPSAtMTsgLy8gY291bnQgdGhlIGZpcnN0IGxpbmUgY29ycmVjdGx5XG4gIHZhciBwbGFpbiA9IGlzUGxhaW5TYWZlRmlyc3Qoc3RyaW5nLmNoYXJDb2RlQXQoMCkpXG4gICAgICAgICAgJiYgIWlzV2hpdGVzcGFjZShzdHJpbmcuY2hhckNvZGVBdChzdHJpbmcubGVuZ3RoIC0gMSkpO1xuXG4gIGlmIChzaW5nbGVMaW5lT25seSkge1xuICAgIC8vIENhc2U6IG5vIGJsb2NrIHN0eWxlcy5cbiAgICAvLyBDaGVjayBmb3IgZGlzYWxsb3dlZCBjaGFyYWN0ZXJzIHRvIHJ1bGUgb3V0IHBsYWluIGFuZCBzaW5nbGUuXG4gICAgZm9yIChpID0gMDsgaSA8IHN0cmluZy5sZW5ndGg7IGkrKykge1xuICAgICAgY2hhciA9IHN0cmluZy5jaGFyQ29kZUF0KGkpO1xuICAgICAgaWYgKCFpc1ByaW50YWJsZShjaGFyKSkge1xuICAgICAgICByZXR1cm4gU1RZTEVfRE9VQkxFO1xuICAgICAgfVxuICAgICAgcHJldl9jaGFyID0gaSA+IDAgPyBzdHJpbmcuY2hhckNvZGVBdChpIC0gMSkgOiBudWxsO1xuICAgICAgcGxhaW4gPSBwbGFpbiAmJiBpc1BsYWluU2FmZShjaGFyLCBwcmV2X2NoYXIpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBDYXNlOiBibG9jayBzdHlsZXMgcGVybWl0dGVkLlxuICAgIGZvciAoaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoYXIgPSBzdHJpbmcuY2hhckNvZGVBdChpKTtcbiAgICAgIGlmIChjaGFyID09PSBDSEFSX0xJTkVfRkVFRCkge1xuICAgICAgICBoYXNMaW5lQnJlYWsgPSB0cnVlO1xuICAgICAgICAvLyBDaGVjayBpZiBhbnkgbGluZSBjYW4gYmUgZm9sZGVkLlxuICAgICAgICBpZiAoc2hvdWxkVHJhY2tXaWR0aCkge1xuICAgICAgICAgIGhhc0ZvbGRhYmxlTGluZSA9IGhhc0ZvbGRhYmxlTGluZSB8fFxuICAgICAgICAgICAgLy8gRm9sZGFibGUgbGluZSA9IHRvbyBsb25nLCBhbmQgbm90IG1vcmUtaW5kZW50ZWQuXG4gICAgICAgICAgICAoaSAtIHByZXZpb3VzTGluZUJyZWFrIC0gMSA+IGxpbmVXaWR0aCAmJlxuICAgICAgICAgICAgIHN0cmluZ1twcmV2aW91c0xpbmVCcmVhayArIDFdICE9PSAnICcpO1xuICAgICAgICAgIHByZXZpb3VzTGluZUJyZWFrID0gaTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICghaXNQcmludGFibGUoY2hhcikpIHtcbiAgICAgICAgcmV0dXJuIFNUWUxFX0RPVUJMRTtcbiAgICAgIH1cbiAgICAgIHByZXZfY2hhciA9IGkgPiAwID8gc3RyaW5nLmNoYXJDb2RlQXQoaSAtIDEpIDogbnVsbDtcbiAgICAgIHBsYWluID0gcGxhaW4gJiYgaXNQbGFpblNhZmUoY2hhciwgcHJldl9jaGFyKTtcbiAgICB9XG4gICAgLy8gaW4gY2FzZSB0aGUgZW5kIGlzIG1pc3NpbmcgYSBcXG5cbiAgICBoYXNGb2xkYWJsZUxpbmUgPSBoYXNGb2xkYWJsZUxpbmUgfHwgKHNob3VsZFRyYWNrV2lkdGggJiZcbiAgICAgIChpIC0gcHJldmlvdXNMaW5lQnJlYWsgLSAxID4gbGluZVdpZHRoICYmXG4gICAgICAgc3RyaW5nW3ByZXZpb3VzTGluZUJyZWFrICsgMV0gIT09ICcgJykpO1xuICB9XG4gIC8vIEFsdGhvdWdoIGV2ZXJ5IHN0eWxlIGNhbiByZXByZXNlbnQgXFxuIHdpdGhvdXQgZXNjYXBpbmcsIHByZWZlciBibG9jayBzdHlsZXNcbiAgLy8gZm9yIG11bHRpbGluZSwgc2luY2UgdGhleSdyZSBtb3JlIHJlYWRhYmxlIGFuZCB0aGV5IGRvbid0IGFkZCBlbXB0eSBsaW5lcy5cbiAgLy8gQWxzbyBwcmVmZXIgZm9sZGluZyBhIHN1cGVyLWxvbmcgbGluZS5cbiAgaWYgKCFoYXNMaW5lQnJlYWsgJiYgIWhhc0ZvbGRhYmxlTGluZSkge1xuICAgIC8vIFN0cmluZ3MgaW50ZXJwcmV0YWJsZSBhcyBhbm90aGVyIHR5cGUgaGF2ZSB0byBiZSBxdW90ZWQ7XG4gICAgLy8gZS5nLiB0aGUgc3RyaW5nICd0cnVlJyB2cy4gdGhlIGJvb2xlYW4gdHJ1ZS5cbiAgICByZXR1cm4gcGxhaW4gJiYgIXRlc3RBbWJpZ3VvdXNUeXBlKHN0cmluZylcbiAgICAgID8gU1RZTEVfUExBSU4gOiBTVFlMRV9TSU5HTEU7XG4gIH1cbiAgLy8gRWRnZSBjYXNlOiBibG9jayBpbmRlbnRhdGlvbiBpbmRpY2F0b3IgY2FuIG9ubHkgaGF2ZSBvbmUgZGlnaXQuXG4gIGlmIChpbmRlbnRQZXJMZXZlbCA+IDkgJiYgbmVlZEluZGVudEluZGljYXRvcihzdHJpbmcpKSB7XG4gICAgcmV0dXJuIFNUWUxFX0RPVUJMRTtcbiAgfVxuICAvLyBBdCB0aGlzIHBvaW50IHdlIGtub3cgYmxvY2sgc3R5bGVzIGFyZSB2YWxpZC5cbiAgLy8gUHJlZmVyIGxpdGVyYWwgc3R5bGUgdW5sZXNzIHdlIHdhbnQgdG8gZm9sZC5cbiAgcmV0dXJuIGhhc0ZvbGRhYmxlTGluZSA/IFNUWUxFX0ZPTERFRCA6IFNUWUxFX0xJVEVSQUw7XG59XG5cbi8vIE5vdGU6IGxpbmUgYnJlYWtpbmcvZm9sZGluZyBpcyBpbXBsZW1lbnRlZCBmb3Igb25seSB0aGUgZm9sZGVkIHN0eWxlLlxuLy8gTkIuIFdlIGRyb3AgdGhlIGxhc3QgdHJhaWxpbmcgbmV3bGluZSAoaWYgYW55KSBvZiBhIHJldHVybmVkIGJsb2NrIHNjYWxhclxuLy8gIHNpbmNlIHRoZSBkdW1wZXIgYWRkcyBpdHMgb3duIG5ld2xpbmUuIFRoaXMgYWx3YXlzIHdvcmtzOlxuLy8gICAgXHUyMDIyIE5vIGVuZGluZyBuZXdsaW5lID0+IHVuYWZmZWN0ZWQ7IGFscmVhZHkgdXNpbmcgc3RyaXAgXCItXCIgY2hvbXBpbmcuXG4vLyAgICBcdTIwMjIgRW5kaW5nIG5ld2xpbmUgICAgPT4gcmVtb3ZlZCB0aGVuIHJlc3RvcmVkLlxuLy8gIEltcG9ydGFudGx5LCB0aGlzIGtlZXBzIHRoZSBcIitcIiBjaG9tcCBpbmRpY2F0b3IgZnJvbSBnYWluaW5nIGFuIGV4dHJhIGxpbmUuXG5mdW5jdGlvbiB3cml0ZVNjYWxhcihzdGF0ZSwgc3RyaW5nLCBsZXZlbCwgaXNrZXkpIHtcbiAgc3RhdGUuZHVtcCA9IChmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHN0cmluZy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBcIicnXCI7XG4gICAgfVxuICAgIGlmICghc3RhdGUubm9Db21wYXRNb2RlICYmXG4gICAgICAgIERFUFJFQ0FURURfQk9PTEVBTlNfU1lOVEFYLmluZGV4T2Yoc3RyaW5nKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiBcIidcIiArIHN0cmluZyArIFwiJ1wiO1xuICAgIH1cblxuICAgIHZhciBpbmRlbnQgPSBzdGF0ZS5pbmRlbnQgKiBNYXRoLm1heCgxLCBsZXZlbCk7IC8vIG5vIDAtaW5kZW50IHNjYWxhcnNcbiAgICAvLyBBcyBpbmRlbnRhdGlvbiBnZXRzIGRlZXBlciwgbGV0IHRoZSB3aWR0aCBkZWNyZWFzZSBtb25vdG9uaWNhbGx5XG4gICAgLy8gdG8gdGhlIGxvd2VyIGJvdW5kIG1pbihzdGF0ZS5saW5lV2lkdGgsIDQwKS5cbiAgICAvLyBOb3RlIHRoYXQgdGhpcyBpbXBsaWVzXG4gICAgLy8gIHN0YXRlLmxpbmVXaWR0aCBcdTIyNjQgNDAgKyBzdGF0ZS5pbmRlbnQ6IHdpZHRoIGlzIGZpeGVkIGF0IHRoZSBsb3dlciBib3VuZC5cbiAgICAvLyAgc3RhdGUubGluZVdpZHRoID4gNDAgKyBzdGF0ZS5pbmRlbnQ6IHdpZHRoIGRlY3JlYXNlcyB1bnRpbCB0aGUgbG93ZXIgYm91bmQuXG4gICAgLy8gVGhpcyBiZWhhdmVzIGJldHRlciB0aGFuIGEgY29uc3RhbnQgbWluaW11bSB3aWR0aCB3aGljaCBkaXNhbGxvd3MgbmFycm93ZXIgb3B0aW9ucyxcbiAgICAvLyBvciBhbiBpbmRlbnQgdGhyZXNob2xkIHdoaWNoIGNhdXNlcyB0aGUgd2lkdGggdG8gc3VkZGVubHkgaW5jcmVhc2UuXG4gICAgdmFyIGxpbmVXaWR0aCA9IHN0YXRlLmxpbmVXaWR0aCA9PT0gLTFcbiAgICAgID8gLTEgOiBNYXRoLm1heChNYXRoLm1pbihzdGF0ZS5saW5lV2lkdGgsIDQwKSwgc3RhdGUubGluZVdpZHRoIC0gaW5kZW50KTtcblxuICAgIC8vIFdpdGhvdXQga25vd2luZyBpZiBrZXlzIGFyZSBpbXBsaWNpdC9leHBsaWNpdCwgYXNzdW1lIGltcGxpY2l0IGZvciBzYWZldHkuXG4gICAgdmFyIHNpbmdsZUxpbmVPbmx5ID0gaXNrZXlcbiAgICAgIC8vIE5vIGJsb2NrIHN0eWxlcyBpbiBmbG93IG1vZGUuXG4gICAgICB8fCAoc3RhdGUuZmxvd0xldmVsID4gLTEgJiYgbGV2ZWwgPj0gc3RhdGUuZmxvd0xldmVsKTtcbiAgICBmdW5jdGlvbiB0ZXN0QW1iaWd1aXR5KHN0cmluZykge1xuICAgICAgcmV0dXJuIHRlc3RJbXBsaWNpdFJlc29sdmluZyhzdGF0ZSwgc3RyaW5nKTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGNob29zZVNjYWxhclN0eWxlKHN0cmluZywgc2luZ2xlTGluZU9ubHksIHN0YXRlLmluZGVudCwgbGluZVdpZHRoLCB0ZXN0QW1iaWd1aXR5KSkge1xuICAgICAgY2FzZSBTVFlMRV9QTEFJTjpcbiAgICAgICAgcmV0dXJuIHN0cmluZztcbiAgICAgIGNhc2UgU1RZTEVfU0lOR0xFOlxuICAgICAgICByZXR1cm4gXCInXCIgKyBzdHJpbmcucmVwbGFjZSgvJy9nLCBcIicnXCIpICsgXCInXCI7XG4gICAgICBjYXNlIFNUWUxFX0xJVEVSQUw6XG4gICAgICAgIHJldHVybiAnfCcgKyBibG9ja0hlYWRlcihzdHJpbmcsIHN0YXRlLmluZGVudClcbiAgICAgICAgICArIGRyb3BFbmRpbmdOZXdsaW5lKGluZGVudFN0cmluZyhzdHJpbmcsIGluZGVudCkpO1xuICAgICAgY2FzZSBTVFlMRV9GT0xERUQ6XG4gICAgICAgIHJldHVybiAnPicgKyBibG9ja0hlYWRlcihzdHJpbmcsIHN0YXRlLmluZGVudClcbiAgICAgICAgICArIGRyb3BFbmRpbmdOZXdsaW5lKGluZGVudFN0cmluZyhmb2xkU3RyaW5nKHN0cmluZywgbGluZVdpZHRoKSwgaW5kZW50KSk7XG4gICAgICBjYXNlIFNUWUxFX0RPVUJMRTpcbiAgICAgICAgcmV0dXJuICdcIicgKyBlc2NhcGVTdHJpbmcoc3RyaW5nLCBsaW5lV2lkdGgpICsgJ1wiJztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBZQU1MRXhjZXB0aW9uKCdpbXBvc3NpYmxlIGVycm9yOiBpbnZhbGlkIHNjYWxhciBzdHlsZScpO1xuICAgIH1cbiAgfSgpKTtcbn1cblxuLy8gUHJlLWNvbmRpdGlvbnM6IHN0cmluZyBpcyB2YWxpZCBmb3IgYSBibG9jayBzY2FsYXIsIDEgPD0gaW5kZW50UGVyTGV2ZWwgPD0gOS5cbmZ1bmN0aW9uIGJsb2NrSGVhZGVyKHN0cmluZywgaW5kZW50UGVyTGV2ZWwpIHtcbiAgdmFyIGluZGVudEluZGljYXRvciA9IG5lZWRJbmRlbnRJbmRpY2F0b3Ioc3RyaW5nKSA/IFN0cmluZyhpbmRlbnRQZXJMZXZlbCkgOiAnJztcblxuICAvLyBub3RlIHRoZSBzcGVjaWFsIGNhc2U6IHRoZSBzdHJpbmcgJ1xcbicgY291bnRzIGFzIGEgXCJ0cmFpbGluZ1wiIGVtcHR5IGxpbmUuXG4gIHZhciBjbGlwID0gICAgICAgICAgc3RyaW5nW3N0cmluZy5sZW5ndGggLSAxXSA9PT0gJ1xcbic7XG4gIHZhciBrZWVwID0gY2xpcCAmJiAoc3RyaW5nW3N0cmluZy5sZW5ndGggLSAyXSA9PT0gJ1xcbicgfHwgc3RyaW5nID09PSAnXFxuJyk7XG4gIHZhciBjaG9tcCA9IGtlZXAgPyAnKycgOiAoY2xpcCA/ICcnIDogJy0nKTtcblxuICByZXR1cm4gaW5kZW50SW5kaWNhdG9yICsgY2hvbXAgKyAnXFxuJztcbn1cblxuLy8gKFNlZSB0aGUgbm90ZSBmb3Igd3JpdGVTY2FsYXIuKVxuZnVuY3Rpb24gZHJvcEVuZGluZ05ld2xpbmUoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmdbc3RyaW5nLmxlbmd0aCAtIDFdID09PSAnXFxuJyA/IHN0cmluZy5zbGljZSgwLCAtMSkgOiBzdHJpbmc7XG59XG5cbi8vIE5vdGU6IGEgbG9uZyBsaW5lIHdpdGhvdXQgYSBzdWl0YWJsZSBicmVhayBwb2ludCB3aWxsIGV4Y2VlZCB0aGUgd2lkdGggbGltaXQuXG4vLyBQcmUtY29uZGl0aW9uczogZXZlcnkgY2hhciBpbiBzdHIgaXNQcmludGFibGUsIHN0ci5sZW5ndGggPiAwLCB3aWR0aCA+IDAuXG5mdW5jdGlvbiBmb2xkU3RyaW5nKHN0cmluZywgd2lkdGgpIHtcbiAgLy8gSW4gZm9sZGVkIHN0eWxlLCAkayQgY29uc2VjdXRpdmUgbmV3bGluZXMgb3V0cHV0IGFzICRrKzEkIG5ld2xpbmVzXHUyMDE0XG4gIC8vIHVubGVzcyB0aGV5J3JlIGJlZm9yZSBvciBhZnRlciBhIG1vcmUtaW5kZW50ZWQgbGluZSwgb3IgYXQgdGhlIHZlcnlcbiAgLy8gYmVnaW5uaW5nIG9yIGVuZCwgaW4gd2hpY2ggY2FzZSAkayQgbWFwcyB0byAkayQuXG4gIC8vIFRoZXJlZm9yZSwgcGFyc2UgZWFjaCBjaHVuayBhcyBuZXdsaW5lKHMpIGZvbGxvd2VkIGJ5IGEgY29udGVudCBsaW5lLlxuICB2YXIgbGluZVJlID0gLyhcXG4rKShbXlxcbl0qKS9nO1xuXG4gIC8vIGZpcnN0IGxpbmUgKHBvc3NpYmx5IGFuIGVtcHR5IGxpbmUpXG4gIHZhciByZXN1bHQgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBuZXh0TEYgPSBzdHJpbmcuaW5kZXhPZignXFxuJyk7XG4gICAgbmV4dExGID0gbmV4dExGICE9PSAtMSA/IG5leHRMRiA6IHN0cmluZy5sZW5ndGg7XG4gICAgbGluZVJlLmxhc3RJbmRleCA9IG5leHRMRjtcbiAgICByZXR1cm4gZm9sZExpbmUoc3RyaW5nLnNsaWNlKDAsIG5leHRMRiksIHdpZHRoKTtcbiAgfSgpKTtcbiAgLy8gSWYgd2UgaGF2ZW4ndCByZWFjaGVkIHRoZSBmaXJzdCBjb250ZW50IGxpbmUgeWV0LCBkb24ndCBhZGQgYW4gZXh0cmEgXFxuLlxuICB2YXIgcHJldk1vcmVJbmRlbnRlZCA9IHN0cmluZ1swXSA9PT0gJ1xcbicgfHwgc3RyaW5nWzBdID09PSAnICc7XG4gIHZhciBtb3JlSW5kZW50ZWQ7XG5cbiAgLy8gcmVzdCBvZiB0aGUgbGluZXNcbiAgdmFyIG1hdGNoO1xuICB3aGlsZSAoKG1hdGNoID0gbGluZVJlLmV4ZWMoc3RyaW5nKSkpIHtcbiAgICB2YXIgcHJlZml4ID0gbWF0Y2hbMV0sIGxpbmUgPSBtYXRjaFsyXTtcbiAgICBtb3JlSW5kZW50ZWQgPSAobGluZVswXSA9PT0gJyAnKTtcbiAgICByZXN1bHQgKz0gcHJlZml4XG4gICAgICArICghcHJldk1vcmVJbmRlbnRlZCAmJiAhbW9yZUluZGVudGVkICYmIGxpbmUgIT09ICcnXG4gICAgICAgID8gJ1xcbicgOiAnJylcbiAgICAgICsgZm9sZExpbmUobGluZSwgd2lkdGgpO1xuICAgIHByZXZNb3JlSW5kZW50ZWQgPSBtb3JlSW5kZW50ZWQ7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vLyBHcmVlZHkgbGluZSBicmVha2luZy5cbi8vIFBpY2tzIHRoZSBsb25nZXN0IGxpbmUgdW5kZXIgdGhlIGxpbWl0IGVhY2ggdGltZSxcbi8vIG90aGVyd2lzZSBzZXR0bGVzIGZvciB0aGUgc2hvcnRlc3QgbGluZSBvdmVyIHRoZSBsaW1pdC5cbi8vIE5CLiBNb3JlLWluZGVudGVkIGxpbmVzICpjYW5ub3QqIGJlIGZvbGRlZCwgYXMgdGhhdCB3b3VsZCBhZGQgYW4gZXh0cmEgXFxuLlxuZnVuY3Rpb24gZm9sZExpbmUobGluZSwgd2lkdGgpIHtcbiAgaWYgKGxpbmUgPT09ICcnIHx8IGxpbmVbMF0gPT09ICcgJykgcmV0dXJuIGxpbmU7XG5cbiAgLy8gU2luY2UgYSBtb3JlLWluZGVudGVkIGxpbmUgYWRkcyBhIFxcbiwgYnJlYWtzIGNhbid0IGJlIGZvbGxvd2VkIGJ5IGEgc3BhY2UuXG4gIHZhciBicmVha1JlID0gLyBbXiBdL2c7IC8vIG5vdGU6IHRoZSBtYXRjaCBpbmRleCB3aWxsIGFsd2F5cyBiZSA8PSBsZW5ndGgtMi5cbiAgdmFyIG1hdGNoO1xuICAvLyBzdGFydCBpcyBhbiBpbmNsdXNpdmUgaW5kZXguIGVuZCwgY3VyciwgYW5kIG5leHQgYXJlIGV4Y2x1c2l2ZS5cbiAgdmFyIHN0YXJ0ID0gMCwgZW5kLCBjdXJyID0gMCwgbmV4dCA9IDA7XG4gIHZhciByZXN1bHQgPSAnJztcblxuICAvLyBJbnZhcmlhbnRzOiAwIDw9IHN0YXJ0IDw9IGxlbmd0aC0xLlxuICAvLyAgIDAgPD0gY3VyciA8PSBuZXh0IDw9IG1heCgwLCBsZW5ndGgtMikuIGN1cnIgLSBzdGFydCA8PSB3aWR0aC5cbiAgLy8gSW5zaWRlIHRoZSBsb29wOlxuICAvLyAgIEEgbWF0Y2ggaW1wbGllcyBsZW5ndGggPj0gMiwgc28gY3VyciBhbmQgbmV4dCBhcmUgPD0gbGVuZ3RoLTIuXG4gIHdoaWxlICgobWF0Y2ggPSBicmVha1JlLmV4ZWMobGluZSkpKSB7XG4gICAgbmV4dCA9IG1hdGNoLmluZGV4O1xuICAgIC8vIG1haW50YWluIGludmFyaWFudDogY3VyciAtIHN0YXJ0IDw9IHdpZHRoXG4gICAgaWYgKG5leHQgLSBzdGFydCA+IHdpZHRoKSB7XG4gICAgICBlbmQgPSAoY3VyciA+IHN0YXJ0KSA/IGN1cnIgOiBuZXh0OyAvLyBkZXJpdmUgZW5kIDw9IGxlbmd0aC0yXG4gICAgICByZXN1bHQgKz0gJ1xcbicgKyBsaW5lLnNsaWNlKHN0YXJ0LCBlbmQpO1xuICAgICAgLy8gc2tpcCB0aGUgc3BhY2UgdGhhdCB3YXMgb3V0cHV0IGFzIFxcblxuICAgICAgc3RhcnQgPSBlbmQgKyAxOyAgICAgICAgICAgICAgICAgICAgLy8gZGVyaXZlIHN0YXJ0IDw9IGxlbmd0aC0xXG4gICAgfVxuICAgIGN1cnIgPSBuZXh0O1xuICB9XG5cbiAgLy8gQnkgdGhlIGludmFyaWFudHMsIHN0YXJ0IDw9IGxlbmd0aC0xLCBzbyB0aGVyZSBpcyBzb21ldGhpbmcgbGVmdCBvdmVyLlxuICAvLyBJdCBpcyBlaXRoZXIgdGhlIHdob2xlIHN0cmluZyBvciBhIHBhcnQgc3RhcnRpbmcgZnJvbSBub24td2hpdGVzcGFjZS5cbiAgcmVzdWx0ICs9ICdcXG4nO1xuICAvLyBJbnNlcnQgYSBicmVhayBpZiB0aGUgcmVtYWluZGVyIGlzIHRvbyBsb25nIGFuZCB0aGVyZSBpcyBhIGJyZWFrIGF2YWlsYWJsZS5cbiAgaWYgKGxpbmUubGVuZ3RoIC0gc3RhcnQgPiB3aWR0aCAmJiBjdXJyID4gc3RhcnQpIHtcbiAgICByZXN1bHQgKz0gbGluZS5zbGljZShzdGFydCwgY3VycikgKyAnXFxuJyArIGxpbmUuc2xpY2UoY3VyciArIDEpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCArPSBsaW5lLnNsaWNlKHN0YXJ0KTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQuc2xpY2UoMSk7IC8vIGRyb3AgZXh0cmEgXFxuIGpvaW5lclxufVxuXG4vLyBFc2NhcGVzIGEgZG91YmxlLXF1b3RlZCBzdHJpbmcuXG5mdW5jdGlvbiBlc2NhcGVTdHJpbmcoc3RyaW5nKSB7XG4gIHZhciByZXN1bHQgPSAnJztcbiAgdmFyIGNoYXIsIG5leHRDaGFyO1xuICB2YXIgZXNjYXBlU2VxO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyaW5nLmxlbmd0aDsgaSsrKSB7XG4gICAgY2hhciA9IHN0cmluZy5jaGFyQ29kZUF0KGkpO1xuICAgIC8vIENoZWNrIGZvciBzdXJyb2dhdGUgcGFpcnMgKHJlZmVyZW5jZSBVbmljb2RlIDMuMCBzZWN0aW9uIFwiMy43IFN1cnJvZ2F0ZXNcIikuXG4gICAgaWYgKGNoYXIgPj0gMHhEODAwICYmIGNoYXIgPD0gMHhEQkZGLyogaGlnaCBzdXJyb2dhdGUgKi8pIHtcbiAgICAgIG5leHRDaGFyID0gc3RyaW5nLmNoYXJDb2RlQXQoaSArIDEpO1xuICAgICAgaWYgKG5leHRDaGFyID49IDB4REMwMCAmJiBuZXh0Q2hhciA8PSAweERGRkYvKiBsb3cgc3Vycm9nYXRlICovKSB7XG4gICAgICAgIC8vIENvbWJpbmUgdGhlIHN1cnJvZ2F0ZSBwYWlyIGFuZCBzdG9yZSBpdCBlc2NhcGVkLlxuICAgICAgICByZXN1bHQgKz0gZW5jb2RlSGV4KChjaGFyIC0gMHhEODAwKSAqIDB4NDAwICsgbmV4dENoYXIgLSAweERDMDAgKyAweDEwMDAwKTtcbiAgICAgICAgLy8gQWR2YW5jZSBpbmRleCBvbmUgZXh0cmEgc2luY2Ugd2UgYWxyZWFkeSB1c2VkIHRoYXQgY2hhciBoZXJlLlxuICAgICAgICBpKys7IGNvbnRpbnVlO1xuICAgICAgfVxuICAgIH1cbiAgICBlc2NhcGVTZXEgPSBFU0NBUEVfU0VRVUVOQ0VTW2NoYXJdO1xuICAgIHJlc3VsdCArPSAhZXNjYXBlU2VxICYmIGlzUHJpbnRhYmxlKGNoYXIpXG4gICAgICA/IHN0cmluZ1tpXVxuICAgICAgOiBlc2NhcGVTZXEgfHwgZW5jb2RlSGV4KGNoYXIpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gd3JpdGVGbG93U2VxdWVuY2Uoc3RhdGUsIGxldmVsLCBvYmplY3QpIHtcbiAgdmFyIF9yZXN1bHQgPSAnJyxcbiAgICAgIF90YWcgICAgPSBzdGF0ZS50YWcsXG4gICAgICBpbmRleCxcbiAgICAgIGxlbmd0aDtcblxuICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gb2JqZWN0Lmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICAvLyBXcml0ZSBvbmx5IHZhbGlkIGVsZW1lbnRzLlxuICAgIGlmICh3cml0ZU5vZGUoc3RhdGUsIGxldmVsLCBvYmplY3RbaW5kZXhdLCBmYWxzZSwgZmFsc2UpKSB7XG4gICAgICBpZiAoaW5kZXggIT09IDApIF9yZXN1bHQgKz0gJywnICsgKCFzdGF0ZS5jb25kZW5zZUZsb3cgPyAnICcgOiAnJyk7XG4gICAgICBfcmVzdWx0ICs9IHN0YXRlLmR1bXA7XG4gICAgfVxuICB9XG5cbiAgc3RhdGUudGFnID0gX3RhZztcbiAgc3RhdGUuZHVtcCA9ICdbJyArIF9yZXN1bHQgKyAnXSc7XG59XG5cbmZ1bmN0aW9uIHdyaXRlQmxvY2tTZXF1ZW5jZShzdGF0ZSwgbGV2ZWwsIG9iamVjdCwgY29tcGFjdCkge1xuICB2YXIgX3Jlc3VsdCA9ICcnLFxuICAgICAgX3RhZyAgICA9IHN0YXRlLnRhZyxcbiAgICAgIGluZGV4LFxuICAgICAgbGVuZ3RoO1xuXG4gIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSBvYmplY3QubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgIC8vIFdyaXRlIG9ubHkgdmFsaWQgZWxlbWVudHMuXG4gICAgaWYgKHdyaXRlTm9kZShzdGF0ZSwgbGV2ZWwgKyAxLCBvYmplY3RbaW5kZXhdLCB0cnVlLCB0cnVlKSkge1xuICAgICAgaWYgKCFjb21wYWN0IHx8IGluZGV4ICE9PSAwKSB7XG4gICAgICAgIF9yZXN1bHQgKz0gZ2VuZXJhdGVOZXh0TGluZShzdGF0ZSwgbGV2ZWwpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUuZHVtcCAmJiBDSEFSX0xJTkVfRkVFRCA9PT0gc3RhdGUuZHVtcC5jaGFyQ29kZUF0KDApKSB7XG4gICAgICAgIF9yZXN1bHQgKz0gJy0nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX3Jlc3VsdCArPSAnLSAnO1xuICAgICAgfVxuXG4gICAgICBfcmVzdWx0ICs9IHN0YXRlLmR1bXA7XG4gICAgfVxuICB9XG5cbiAgc3RhdGUudGFnID0gX3RhZztcbiAgc3RhdGUuZHVtcCA9IF9yZXN1bHQgfHwgJ1tdJzsgLy8gRW1wdHkgc2VxdWVuY2UgaWYgbm8gdmFsaWQgdmFsdWVzLlxufVxuXG5mdW5jdGlvbiB3cml0ZUZsb3dNYXBwaW5nKHN0YXRlLCBsZXZlbCwgb2JqZWN0KSB7XG4gIHZhciBfcmVzdWx0ICAgICAgID0gJycsXG4gICAgICBfdGFnICAgICAgICAgID0gc3RhdGUudGFnLFxuICAgICAgb2JqZWN0S2V5TGlzdCA9IE9iamVjdC5rZXlzKG9iamVjdCksXG4gICAgICBpbmRleCxcbiAgICAgIGxlbmd0aCxcbiAgICAgIG9iamVjdEtleSxcbiAgICAgIG9iamVjdFZhbHVlLFxuICAgICAgcGFpckJ1ZmZlcjtcblxuICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gb2JqZWN0S2V5TGlzdC5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSAxKSB7XG5cbiAgICBwYWlyQnVmZmVyID0gJyc7XG4gICAgaWYgKGluZGV4ICE9PSAwKSBwYWlyQnVmZmVyICs9ICcsICc7XG5cbiAgICBpZiAoc3RhdGUuY29uZGVuc2VGbG93KSBwYWlyQnVmZmVyICs9ICdcIic7XG5cbiAgICBvYmplY3RLZXkgPSBvYmplY3RLZXlMaXN0W2luZGV4XTtcbiAgICBvYmplY3RWYWx1ZSA9IG9iamVjdFtvYmplY3RLZXldO1xuXG4gICAgaWYgKCF3cml0ZU5vZGUoc3RhdGUsIGxldmVsLCBvYmplY3RLZXksIGZhbHNlLCBmYWxzZSkpIHtcbiAgICAgIGNvbnRpbnVlOyAvLyBTa2lwIHRoaXMgcGFpciBiZWNhdXNlIG9mIGludmFsaWQga2V5O1xuICAgIH1cblxuICAgIGlmIChzdGF0ZS5kdW1wLmxlbmd0aCA+IDEwMjQpIHBhaXJCdWZmZXIgKz0gJz8gJztcblxuICAgIHBhaXJCdWZmZXIgKz0gc3RhdGUuZHVtcCArIChzdGF0ZS5jb25kZW5zZUZsb3cgPyAnXCInIDogJycpICsgJzonICsgKHN0YXRlLmNvbmRlbnNlRmxvdyA/ICcnIDogJyAnKTtcblxuICAgIGlmICghd3JpdGVOb2RlKHN0YXRlLCBsZXZlbCwgb2JqZWN0VmFsdWUsIGZhbHNlLCBmYWxzZSkpIHtcbiAgICAgIGNvbnRpbnVlOyAvLyBTa2lwIHRoaXMgcGFpciBiZWNhdXNlIG9mIGludmFsaWQgdmFsdWUuXG4gICAgfVxuXG4gICAgcGFpckJ1ZmZlciArPSBzdGF0ZS5kdW1wO1xuXG4gICAgLy8gQm90aCBrZXkgYW5kIHZhbHVlIGFyZSB2YWxpZC5cbiAgICBfcmVzdWx0ICs9IHBhaXJCdWZmZXI7XG4gIH1cblxuICBzdGF0ZS50YWcgPSBfdGFnO1xuICBzdGF0ZS5kdW1wID0gJ3snICsgX3Jlc3VsdCArICd9Jztcbn1cblxuZnVuY3Rpb24gd3JpdGVCbG9ja01hcHBpbmcoc3RhdGUsIGxldmVsLCBvYmplY3QsIGNvbXBhY3QpIHtcbiAgdmFyIF9yZXN1bHQgICAgICAgPSAnJyxcbiAgICAgIF90YWcgICAgICAgICAgPSBzdGF0ZS50YWcsXG4gICAgICBvYmplY3RLZXlMaXN0ID0gT2JqZWN0LmtleXMob2JqZWN0KSxcbiAgICAgIGluZGV4LFxuICAgICAgbGVuZ3RoLFxuICAgICAgb2JqZWN0S2V5LFxuICAgICAgb2JqZWN0VmFsdWUsXG4gICAgICBleHBsaWNpdFBhaXIsXG4gICAgICBwYWlyQnVmZmVyO1xuXG4gIC8vIEFsbG93IHNvcnRpbmcga2V5cyBzbyB0aGF0IHRoZSBvdXRwdXQgZmlsZSBpcyBkZXRlcm1pbmlzdGljXG4gIGlmIChzdGF0ZS5zb3J0S2V5cyA9PT0gdHJ1ZSkge1xuICAgIC8vIERlZmF1bHQgc29ydGluZ1xuICAgIG9iamVjdEtleUxpc3Quc29ydCgpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBzdGF0ZS5zb3J0S2V5cyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIEN1c3RvbSBzb3J0IGZ1bmN0aW9uXG4gICAgb2JqZWN0S2V5TGlzdC5zb3J0KHN0YXRlLnNvcnRLZXlzKTtcbiAgfSBlbHNlIGlmIChzdGF0ZS5zb3J0S2V5cykge1xuICAgIC8vIFNvbWV0aGluZyBpcyB3cm9uZ1xuICAgIHRocm93IG5ldyBZQU1MRXhjZXB0aW9uKCdzb3J0S2V5cyBtdXN0IGJlIGEgYm9vbGVhbiBvciBhIGZ1bmN0aW9uJyk7XG4gIH1cblxuICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gb2JqZWN0S2V5TGlzdC5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgcGFpckJ1ZmZlciA9ICcnO1xuXG4gICAgaWYgKCFjb21wYWN0IHx8IGluZGV4ICE9PSAwKSB7XG4gICAgICBwYWlyQnVmZmVyICs9IGdlbmVyYXRlTmV4dExpbmUoc3RhdGUsIGxldmVsKTtcbiAgICB9XG5cbiAgICBvYmplY3RLZXkgPSBvYmplY3RLZXlMaXN0W2luZGV4XTtcbiAgICBvYmplY3RWYWx1ZSA9IG9iamVjdFtvYmplY3RLZXldO1xuXG4gICAgaWYgKCF3cml0ZU5vZGUoc3RhdGUsIGxldmVsICsgMSwgb2JqZWN0S2V5LCB0cnVlLCB0cnVlLCB0cnVlKSkge1xuICAgICAgY29udGludWU7IC8vIFNraXAgdGhpcyBwYWlyIGJlY2F1c2Ugb2YgaW52YWxpZCBrZXkuXG4gICAgfVxuXG4gICAgZXhwbGljaXRQYWlyID0gKHN0YXRlLnRhZyAhPT0gbnVsbCAmJiBzdGF0ZS50YWcgIT09ICc/JykgfHxcbiAgICAgICAgICAgICAgICAgICAoc3RhdGUuZHVtcCAmJiBzdGF0ZS5kdW1wLmxlbmd0aCA+IDEwMjQpO1xuXG4gICAgaWYgKGV4cGxpY2l0UGFpcikge1xuICAgICAgaWYgKHN0YXRlLmR1bXAgJiYgQ0hBUl9MSU5FX0ZFRUQgPT09IHN0YXRlLmR1bXAuY2hhckNvZGVBdCgwKSkge1xuICAgICAgICBwYWlyQnVmZmVyICs9ICc/JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhaXJCdWZmZXIgKz0gJz8gJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwYWlyQnVmZmVyICs9IHN0YXRlLmR1bXA7XG5cbiAgICBpZiAoZXhwbGljaXRQYWlyKSB7XG4gICAgICBwYWlyQnVmZmVyICs9IGdlbmVyYXRlTmV4dExpbmUoc3RhdGUsIGxldmVsKTtcbiAgICB9XG5cbiAgICBpZiAoIXdyaXRlTm9kZShzdGF0ZSwgbGV2ZWwgKyAxLCBvYmplY3RWYWx1ZSwgdHJ1ZSwgZXhwbGljaXRQYWlyKSkge1xuICAgICAgY29udGludWU7IC8vIFNraXAgdGhpcyBwYWlyIGJlY2F1c2Ugb2YgaW52YWxpZCB2YWx1ZS5cbiAgICB9XG5cbiAgICBpZiAoc3RhdGUuZHVtcCAmJiBDSEFSX0xJTkVfRkVFRCA9PT0gc3RhdGUuZHVtcC5jaGFyQ29kZUF0KDApKSB7XG4gICAgICBwYWlyQnVmZmVyICs9ICc6JztcbiAgICB9IGVsc2Uge1xuICAgICAgcGFpckJ1ZmZlciArPSAnOiAnO1xuICAgIH1cblxuICAgIHBhaXJCdWZmZXIgKz0gc3RhdGUuZHVtcDtcblxuICAgIC8vIEJvdGgga2V5IGFuZCB2YWx1ZSBhcmUgdmFsaWQuXG4gICAgX3Jlc3VsdCArPSBwYWlyQnVmZmVyO1xuICB9XG5cbiAgc3RhdGUudGFnID0gX3RhZztcbiAgc3RhdGUuZHVtcCA9IF9yZXN1bHQgfHwgJ3t9JzsgLy8gRW1wdHkgbWFwcGluZyBpZiBubyB2YWxpZCBwYWlycy5cbn1cblxuZnVuY3Rpb24gZGV0ZWN0VHlwZShzdGF0ZSwgb2JqZWN0LCBleHBsaWNpdCkge1xuICB2YXIgX3Jlc3VsdCwgdHlwZUxpc3QsIGluZGV4LCBsZW5ndGgsIHR5cGUsIHN0eWxlO1xuXG4gIHR5cGVMaXN0ID0gZXhwbGljaXQgPyBzdGF0ZS5leHBsaWNpdFR5cGVzIDogc3RhdGUuaW1wbGljaXRUeXBlcztcblxuICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gdHlwZUxpc3QubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgIHR5cGUgPSB0eXBlTGlzdFtpbmRleF07XG5cbiAgICBpZiAoKHR5cGUuaW5zdGFuY2VPZiAgfHwgdHlwZS5wcmVkaWNhdGUpICYmXG4gICAgICAgICghdHlwZS5pbnN0YW5jZU9mIHx8ICgodHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcpICYmIChvYmplY3QgaW5zdGFuY2VvZiB0eXBlLmluc3RhbmNlT2YpKSkgJiZcbiAgICAgICAgKCF0eXBlLnByZWRpY2F0ZSAgfHwgdHlwZS5wcmVkaWNhdGUob2JqZWN0KSkpIHtcblxuICAgICAgc3RhdGUudGFnID0gZXhwbGljaXQgPyB0eXBlLnRhZyA6ICc/JztcblxuICAgICAgaWYgKHR5cGUucmVwcmVzZW50KSB7XG4gICAgICAgIHN0eWxlID0gc3RhdGUuc3R5bGVNYXBbdHlwZS50YWddIHx8IHR5cGUuZGVmYXVsdFN0eWxlO1xuXG4gICAgICAgIGlmIChfdG9TdHJpbmcuY2FsbCh0eXBlLnJlcHJlc2VudCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXScpIHtcbiAgICAgICAgICBfcmVzdWx0ID0gdHlwZS5yZXByZXNlbnQob2JqZWN0LCBzdHlsZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoX2hhc093blByb3BlcnR5LmNhbGwodHlwZS5yZXByZXNlbnQsIHN0eWxlKSkge1xuICAgICAgICAgIF9yZXN1bHQgPSB0eXBlLnJlcHJlc2VudFtzdHlsZV0ob2JqZWN0LCBzdHlsZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFlBTUxFeGNlcHRpb24oJyE8JyArIHR5cGUudGFnICsgJz4gdGFnIHJlc29sdmVyIGFjY2VwdHMgbm90IFwiJyArIHN0eWxlICsgJ1wiIHN0eWxlJyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZS5kdW1wID0gX3Jlc3VsdDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBTZXJpYWxpemVzIGBvYmplY3RgIGFuZCB3cml0ZXMgaXQgdG8gZ2xvYmFsIGByZXN1bHRgLlxuLy8gUmV0dXJucyB0cnVlIG9uIHN1Y2Nlc3MsIG9yIGZhbHNlIG9uIGludmFsaWQgb2JqZWN0LlxuLy9cbmZ1bmN0aW9uIHdyaXRlTm9kZShzdGF0ZSwgbGV2ZWwsIG9iamVjdCwgYmxvY2ssIGNvbXBhY3QsIGlza2V5KSB7XG4gIHN0YXRlLnRhZyA9IG51bGw7XG4gIHN0YXRlLmR1bXAgPSBvYmplY3Q7XG5cbiAgaWYgKCFkZXRlY3RUeXBlKHN0YXRlLCBvYmplY3QsIGZhbHNlKSkge1xuICAgIGRldGVjdFR5cGUoc3RhdGUsIG9iamVjdCwgdHJ1ZSk7XG4gIH1cblxuICB2YXIgdHlwZSA9IF90b1N0cmluZy5jYWxsKHN0YXRlLmR1bXApO1xuXG4gIGlmIChibG9jaykge1xuICAgIGJsb2NrID0gKHN0YXRlLmZsb3dMZXZlbCA8IDAgfHwgc3RhdGUuZmxvd0xldmVsID4gbGV2ZWwpO1xuICB9XG5cbiAgdmFyIG9iamVjdE9yQXJyYXkgPSB0eXBlID09PSAnW29iamVjdCBPYmplY3RdJyB8fCB0eXBlID09PSAnW29iamVjdCBBcnJheV0nLFxuICAgICAgZHVwbGljYXRlSW5kZXgsXG4gICAgICBkdXBsaWNhdGU7XG5cbiAgaWYgKG9iamVjdE9yQXJyYXkpIHtcbiAgICBkdXBsaWNhdGVJbmRleCA9IHN0YXRlLmR1cGxpY2F0ZXMuaW5kZXhPZihvYmplY3QpO1xuICAgIGR1cGxpY2F0ZSA9IGR1cGxpY2F0ZUluZGV4ICE9PSAtMTtcbiAgfVxuXG4gIGlmICgoc3RhdGUudGFnICE9PSBudWxsICYmIHN0YXRlLnRhZyAhPT0gJz8nKSB8fCBkdXBsaWNhdGUgfHwgKHN0YXRlLmluZGVudCAhPT0gMiAmJiBsZXZlbCA+IDApKSB7XG4gICAgY29tcGFjdCA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKGR1cGxpY2F0ZSAmJiBzdGF0ZS51c2VkRHVwbGljYXRlc1tkdXBsaWNhdGVJbmRleF0pIHtcbiAgICBzdGF0ZS5kdW1wID0gJypyZWZfJyArIGR1cGxpY2F0ZUluZGV4O1xuICB9IGVsc2Uge1xuICAgIGlmIChvYmplY3RPckFycmF5ICYmIGR1cGxpY2F0ZSAmJiAhc3RhdGUudXNlZER1cGxpY2F0ZXNbZHVwbGljYXRlSW5kZXhdKSB7XG4gICAgICBzdGF0ZS51c2VkRHVwbGljYXRlc1tkdXBsaWNhdGVJbmRleF0gPSB0cnVlO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgIGlmIChibG9jayAmJiAoT2JqZWN0LmtleXMoc3RhdGUuZHVtcCkubGVuZ3RoICE9PSAwKSkge1xuICAgICAgICB3cml0ZUJsb2NrTWFwcGluZyhzdGF0ZSwgbGV2ZWwsIHN0YXRlLmR1bXAsIGNvbXBhY3QpO1xuICAgICAgICBpZiAoZHVwbGljYXRlKSB7XG4gICAgICAgICAgc3RhdGUuZHVtcCA9ICcmcmVmXycgKyBkdXBsaWNhdGVJbmRleCArIHN0YXRlLmR1bXA7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdyaXRlRmxvd01hcHBpbmcoc3RhdGUsIGxldmVsLCBzdGF0ZS5kdW1wKTtcbiAgICAgICAgaWYgKGR1cGxpY2F0ZSkge1xuICAgICAgICAgIHN0YXRlLmR1bXAgPSAnJnJlZl8nICsgZHVwbGljYXRlSW5kZXggKyAnICcgKyBzdGF0ZS5kdW1wO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICB2YXIgYXJyYXlMZXZlbCA9IChzdGF0ZS5ub0FycmF5SW5kZW50ICYmIChsZXZlbCA+IDApKSA/IGxldmVsIC0gMSA6IGxldmVsO1xuICAgICAgaWYgKGJsb2NrICYmIChzdGF0ZS5kdW1wLmxlbmd0aCAhPT0gMCkpIHtcbiAgICAgICAgd3JpdGVCbG9ja1NlcXVlbmNlKHN0YXRlLCBhcnJheUxldmVsLCBzdGF0ZS5kdW1wLCBjb21wYWN0KTtcbiAgICAgICAgaWYgKGR1cGxpY2F0ZSkge1xuICAgICAgICAgIHN0YXRlLmR1bXAgPSAnJnJlZl8nICsgZHVwbGljYXRlSW5kZXggKyBzdGF0ZS5kdW1wO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3cml0ZUZsb3dTZXF1ZW5jZShzdGF0ZSwgYXJyYXlMZXZlbCwgc3RhdGUuZHVtcCk7XG4gICAgICAgIGlmIChkdXBsaWNhdGUpIHtcbiAgICAgICAgICBzdGF0ZS5kdW1wID0gJyZyZWZfJyArIGR1cGxpY2F0ZUluZGV4ICsgJyAnICsgc3RhdGUuZHVtcDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ1tvYmplY3QgU3RyaW5nXScpIHtcbiAgICAgIGlmIChzdGF0ZS50YWcgIT09ICc/Jykge1xuICAgICAgICB3cml0ZVNjYWxhcihzdGF0ZSwgc3RhdGUuZHVtcCwgbGV2ZWwsIGlza2V5KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHN0YXRlLnNraXBJbnZhbGlkKSByZXR1cm4gZmFsc2U7XG4gICAgICB0aHJvdyBuZXcgWUFNTEV4Y2VwdGlvbigndW5hY2NlcHRhYmxlIGtpbmQgb2YgYW4gb2JqZWN0IHRvIGR1bXAgJyArIHR5cGUpO1xuICAgIH1cblxuICAgIGlmIChzdGF0ZS50YWcgIT09IG51bGwgJiYgc3RhdGUudGFnICE9PSAnPycpIHtcbiAgICAgIHN0YXRlLmR1bXAgPSAnITwnICsgc3RhdGUudGFnICsgJz4gJyArIHN0YXRlLmR1bXA7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGdldER1cGxpY2F0ZVJlZmVyZW5jZXMob2JqZWN0LCBzdGF0ZSkge1xuICB2YXIgb2JqZWN0cyA9IFtdLFxuICAgICAgZHVwbGljYXRlc0luZGV4ZXMgPSBbXSxcbiAgICAgIGluZGV4LFxuICAgICAgbGVuZ3RoO1xuXG4gIGluc3BlY3ROb2RlKG9iamVjdCwgb2JqZWN0cywgZHVwbGljYXRlc0luZGV4ZXMpO1xuXG4gIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSBkdXBsaWNhdGVzSW5kZXhlcy5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgc3RhdGUuZHVwbGljYXRlcy5wdXNoKG9iamVjdHNbZHVwbGljYXRlc0luZGV4ZXNbaW5kZXhdXSk7XG4gIH1cbiAgc3RhdGUudXNlZER1cGxpY2F0ZXMgPSBuZXcgQXJyYXkobGVuZ3RoKTtcbn1cblxuZnVuY3Rpb24gaW5zcGVjdE5vZGUob2JqZWN0LCBvYmplY3RzLCBkdXBsaWNhdGVzSW5kZXhlcykge1xuICB2YXIgb2JqZWN0S2V5TGlzdCxcbiAgICAgIGluZGV4LFxuICAgICAgbGVuZ3RoO1xuXG4gIGlmIChvYmplY3QgIT09IG51bGwgJiYgdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcpIHtcbiAgICBpbmRleCA9IG9iamVjdHMuaW5kZXhPZihvYmplY3QpO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIGlmIChkdXBsaWNhdGVzSW5kZXhlcy5pbmRleE9mKGluZGV4KSA9PT0gLTEpIHtcbiAgICAgICAgZHVwbGljYXRlc0luZGV4ZXMucHVzaChpbmRleCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG9iamVjdHMucHVzaChvYmplY3QpO1xuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmplY3QpKSB7XG4gICAgICAgIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSBvYmplY3QubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgICAgICAgIGluc3BlY3ROb2RlKG9iamVjdFtpbmRleF0sIG9iamVjdHMsIGR1cGxpY2F0ZXNJbmRleGVzKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb2JqZWN0S2V5TGlzdCA9IE9iamVjdC5rZXlzKG9iamVjdCk7XG5cbiAgICAgICAgZm9yIChpbmRleCA9IDAsIGxlbmd0aCA9IG9iamVjdEtleUxpc3QubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgICAgICAgIGluc3BlY3ROb2RlKG9iamVjdFtvYmplY3RLZXlMaXN0W2luZGV4XV0sIG9iamVjdHMsIGR1cGxpY2F0ZXNJbmRleGVzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBkdW1wKGlucHV0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHZhciBzdGF0ZSA9IG5ldyBTdGF0ZShvcHRpb25zKTtcblxuICBpZiAoIXN0YXRlLm5vUmVmcykgZ2V0RHVwbGljYXRlUmVmZXJlbmNlcyhpbnB1dCwgc3RhdGUpO1xuXG4gIGlmICh3cml0ZU5vZGUoc3RhdGUsIDAsIGlucHV0LCB0cnVlLCB0cnVlKSkgcmV0dXJuIHN0YXRlLmR1bXAgKyAnXFxuJztcblxuICByZXR1cm4gJyc7XG59XG5cbmZ1bmN0aW9uIHNhZmVEdW1wKGlucHV0LCBvcHRpb25zKSB7XG4gIHJldHVybiBkdW1wKGlucHV0LCBjb21tb24uZXh0ZW5kKHsgc2NoZW1hOiBERUZBVUxUX1NBRkVfU0NIRU1BIH0sIG9wdGlvbnMpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMuZHVtcCAgICAgPSBkdW1wO1xubW9kdWxlLmV4cG9ydHMuc2FmZUR1bXAgPSBzYWZlRHVtcDtcbiIsICIndXNlIHN0cmljdCc7XG5cblxudmFyIGxvYWRlciA9IHJlcXVpcmUoJy4vanMteWFtbC9sb2FkZXInKTtcbnZhciBkdW1wZXIgPSByZXF1aXJlKCcuL2pzLXlhbWwvZHVtcGVyJyk7XG5cblxuZnVuY3Rpb24gZGVwcmVjYXRlZChuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdGdW5jdGlvbiAnICsgbmFtZSArICcgaXMgZGVwcmVjYXRlZCBhbmQgY2Fubm90IGJlIHVzZWQuJyk7XG4gIH07XG59XG5cblxubW9kdWxlLmV4cG9ydHMuVHlwZSAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vanMteWFtbC90eXBlJyk7XG5tb2R1bGUuZXhwb3J0cy5TY2hlbWEgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9qcy15YW1sL3NjaGVtYScpO1xubW9kdWxlLmV4cG9ydHMuRkFJTFNBRkVfU0NIRU1BICAgICA9IHJlcXVpcmUoJy4vanMteWFtbC9zY2hlbWEvZmFpbHNhZmUnKTtcbm1vZHVsZS5leHBvcnRzLkpTT05fU0NIRU1BICAgICAgICAgPSByZXF1aXJlKCcuL2pzLXlhbWwvc2NoZW1hL2pzb24nKTtcbm1vZHVsZS5leHBvcnRzLkNPUkVfU0NIRU1BICAgICAgICAgPSByZXF1aXJlKCcuL2pzLXlhbWwvc2NoZW1hL2NvcmUnKTtcbm1vZHVsZS5leHBvcnRzLkRFRkFVTFRfU0FGRV9TQ0hFTUEgPSByZXF1aXJlKCcuL2pzLXlhbWwvc2NoZW1hL2RlZmF1bHRfc2FmZScpO1xubW9kdWxlLmV4cG9ydHMuREVGQVVMVF9GVUxMX1NDSEVNQSA9IHJlcXVpcmUoJy4vanMteWFtbC9zY2hlbWEvZGVmYXVsdF9mdWxsJyk7XG5tb2R1bGUuZXhwb3J0cy5sb2FkICAgICAgICAgICAgICAgID0gbG9hZGVyLmxvYWQ7XG5tb2R1bGUuZXhwb3J0cy5sb2FkQWxsICAgICAgICAgICAgID0gbG9hZGVyLmxvYWRBbGw7XG5tb2R1bGUuZXhwb3J0cy5zYWZlTG9hZCAgICAgICAgICAgID0gbG9hZGVyLnNhZmVMb2FkO1xubW9kdWxlLmV4cG9ydHMuc2FmZUxvYWRBbGwgICAgICAgICA9IGxvYWRlci5zYWZlTG9hZEFsbDtcbm1vZHVsZS5leHBvcnRzLmR1bXAgICAgICAgICAgICAgICAgPSBkdW1wZXIuZHVtcDtcbm1vZHVsZS5leHBvcnRzLnNhZmVEdW1wICAgICAgICAgICAgPSBkdW1wZXIuc2FmZUR1bXA7XG5tb2R1bGUuZXhwb3J0cy5ZQU1MRXhjZXB0aW9uICAgICAgID0gcmVxdWlyZSgnLi9qcy15YW1sL2V4Y2VwdGlvbicpO1xuXG4vLyBEZXByZWNhdGVkIHNjaGVtYSBuYW1lcyBmcm9tIEpTLVlBTUwgMi4wLnhcbm1vZHVsZS5leHBvcnRzLk1JTklNQUxfU0NIRU1BID0gcmVxdWlyZSgnLi9qcy15YW1sL3NjaGVtYS9mYWlsc2FmZScpO1xubW9kdWxlLmV4cG9ydHMuU0FGRV9TQ0hFTUEgICAgPSByZXF1aXJlKCcuL2pzLXlhbWwvc2NoZW1hL2RlZmF1bHRfc2FmZScpO1xubW9kdWxlLmV4cG9ydHMuREVGQVVMVF9TQ0hFTUEgPSByZXF1aXJlKCcuL2pzLXlhbWwvc2NoZW1hL2RlZmF1bHRfZnVsbCcpO1xuXG4vLyBEZXByZWNhdGVkIGZ1bmN0aW9ucyBmcm9tIEpTLVlBTUwgMS54Lnhcbm1vZHVsZS5leHBvcnRzLnNjYW4gICAgICAgICAgID0gZGVwcmVjYXRlZCgnc2NhbicpO1xubW9kdWxlLmV4cG9ydHMucGFyc2UgICAgICAgICAgPSBkZXByZWNhdGVkKCdwYXJzZScpO1xubW9kdWxlLmV4cG9ydHMuY29tcG9zZSAgICAgICAgPSBkZXByZWNhdGVkKCdjb21wb3NlJyk7XG5tb2R1bGUuZXhwb3J0cy5hZGRDb25zdHJ1Y3RvciA9IGRlcHJlY2F0ZWQoJ2FkZENvbnN0cnVjdG9yJyk7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5cbnZhciB5YW1sID0gcmVxdWlyZSgnLi9saWIvanMteWFtbC5qcycpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0geWFtbDtcbiIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHlhbWwgPSByZXF1aXJlKCdqcy15YW1sJyk7XG5cbi8qKlxuICogRGVmYXVsdCBlbmdpbmVzXG4gKi9cblxuY29uc3QgZW5naW5lcyA9IGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cztcblxuLyoqXG4gKiBZQU1MXG4gKi9cblxuZW5naW5lcy55YW1sID0ge1xuICBwYXJzZTogeWFtbC5zYWZlTG9hZC5iaW5kKHlhbWwpLFxuICBzdHJpbmdpZnk6IHlhbWwuc2FmZUR1bXAuYmluZCh5YW1sKVxufTtcblxuLyoqXG4gKiBKU09OXG4gKi9cblxuZW5naW5lcy5qc29uID0ge1xuICBwYXJzZTogSlNPTi5wYXJzZS5iaW5kKEpTT04pLFxuICBzdHJpbmdpZnk6IGZ1bmN0aW9uKG9iaiwgb3B0aW9ucykge1xuICAgIGNvbnN0IG9wdHMgPSBPYmplY3QuYXNzaWduKHtyZXBsYWNlcjogbnVsbCwgc3BhY2U6IDJ9LCBvcHRpb25zKTtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqLCBvcHRzLnJlcGxhY2VyLCBvcHRzLnNwYWNlKTtcbiAgfVxufTtcblxuLyoqXG4gKiBKYXZhU2NyaXB0XG4gKi9cblxuZW5naW5lcy5qYXZhc2NyaXB0ID0ge1xuICBwYXJzZTogZnVuY3Rpb24gcGFyc2Uoc3RyLCBvcHRpb25zLCB3cmFwKSB7XG4gICAgLyogZXNsaW50IG5vLWV2YWw6IDAgKi9cbiAgICB0cnkge1xuICAgICAgaWYgKHdyYXAgIT09IGZhbHNlKSB7XG4gICAgICAgIHN0ciA9ICcoZnVuY3Rpb24oKSB7XFxucmV0dXJuICcgKyBzdHIudHJpbSgpICsgJztcXG59KCkpOyc7XG4gICAgICB9XG4gICAgICByZXR1cm4gZXZhbChzdHIpIHx8IHt9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKHdyYXAgIT09IGZhbHNlICYmIC8odW5leHBlY3RlZHxpZGVudGlmaWVyKS9pLnRlc3QoZXJyLm1lc3NhZ2UpKSB7XG4gICAgICAgIHJldHVybiBwYXJzZShzdHIsIG9wdGlvbnMsIGZhbHNlKTtcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihlcnIpO1xuICAgIH1cbiAgfSxcbiAgc3RyaW5naWZ5OiBmdW5jdGlvbigpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3N0cmluZ2lmeWluZyBKYXZhU2NyaXB0IGlzIG5vdCBzdXBwb3J0ZWQnKTtcbiAgfVxufTtcbiIsICIvKiFcbiAqIHN0cmlwLWJvbS1zdHJpbmcgPGh0dHBzOi8vZ2l0aHViLmNvbS9qb25zY2hsaW5rZXJ0L3N0cmlwLWJvbS1zdHJpbmc+XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE1LCAyMDE3LCBKb24gU2NobGlua2VydC5cbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc3RyKSB7XG4gIGlmICh0eXBlb2Ygc3RyID09PSAnc3RyaW5nJyAmJiBzdHIuY2hhckF0KDApID09PSAnXFx1ZmVmZicpIHtcbiAgICByZXR1cm4gc3RyLnNsaWNlKDEpO1xuICB9XG4gIHJldHVybiBzdHI7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxuY29uc3Qgc3RyaXBCb20gPSByZXF1aXJlKCdzdHJpcC1ib20tc3RyaW5nJyk7XG5jb25zdCB0eXBlT2YgPSByZXF1aXJlKCdraW5kLW9mJyk7XG5cbmV4cG9ydHMuZGVmaW5lID0gZnVuY3Rpb24ob2JqLCBrZXksIHZhbCkge1xuICBSZWZsZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiB2YWxcbiAgfSk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBgdmFsYCBpcyBhIGJ1ZmZlclxuICovXG5cbmV4cG9ydHMuaXNCdWZmZXIgPSBmdW5jdGlvbih2YWwpIHtcbiAgcmV0dXJuIHR5cGVPZih2YWwpID09PSAnYnVmZmVyJztcbn07XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGB2YWxgIGlzIGFuIG9iamVjdFxuICovXG5cbmV4cG9ydHMuaXNPYmplY3QgPSBmdW5jdGlvbih2YWwpIHtcbiAgcmV0dXJuIHR5cGVPZih2YWwpID09PSAnb2JqZWN0Jztcbn07XG5cbi8qKlxuICogQ2FzdCBgaW5wdXRgIHRvIGEgYnVmZmVyXG4gKi9cblxuZXhwb3J0cy50b0J1ZmZlciA9IGZ1bmN0aW9uKGlucHV0KSB7XG4gIHJldHVybiB0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnID8gQnVmZmVyLmZyb20oaW5wdXQpIDogaW5wdXQ7XG59O1xuXG4vKipcbiAqIENhc3QgYHZhbGAgdG8gYSBzdHJpbmcuXG4gKi9cblxuZXhwb3J0cy50b1N0cmluZyA9IGZ1bmN0aW9uKGlucHV0KSB7XG4gIGlmIChleHBvcnRzLmlzQnVmZmVyKGlucHV0KSkgcmV0dXJuIHN0cmlwQm9tKFN0cmluZyhpbnB1dCkpO1xuICBpZiAodHlwZW9mIGlucHV0ICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4cGVjdGVkIGlucHV0IHRvIGJlIGEgc3RyaW5nIG9yIGJ1ZmZlcicpO1xuICB9XG4gIHJldHVybiBzdHJpcEJvbShpbnB1dCk7XG59O1xuXG4vKipcbiAqIENhc3QgYHZhbGAgdG8gYW4gYXJyYXkuXG4gKi9cblxuZXhwb3J0cy5hcnJheWlmeSA9IGZ1bmN0aW9uKHZhbCkge1xuICByZXR1cm4gdmFsID8gKEFycmF5LmlzQXJyYXkodmFsKSA/IHZhbCA6IFt2YWxdKSA6IFtdO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYHN0cmAgc3RhcnRzIHdpdGggYHN1YnN0cmAuXG4gKi9cblxuZXhwb3J0cy5zdGFydHNXaXRoID0gZnVuY3Rpb24oc3RyLCBzdWJzdHIsIGxlbikge1xuICBpZiAodHlwZW9mIGxlbiAhPT0gJ251bWJlcicpIGxlbiA9IHN1YnN0ci5sZW5ndGg7XG4gIHJldHVybiBzdHIuc2xpY2UoMCwgbGVuKSA9PT0gc3Vic3RyO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVuZ2luZXMgPSByZXF1aXJlKCcuL2VuZ2luZXMnKTtcbmNvbnN0IHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgY29uc3Qgb3B0cyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpO1xuXG4gIC8vIGVuc3VyZSB0aGF0IGRlbGltaXRlcnMgYXJlIGFuIGFycmF5XG4gIG9wdHMuZGVsaW1pdGVycyA9IHV0aWxzLmFycmF5aWZ5KG9wdHMuZGVsaW1zIHx8IG9wdHMuZGVsaW1pdGVycyB8fCAnLS0tJyk7XG4gIGlmIChvcHRzLmRlbGltaXRlcnMubGVuZ3RoID09PSAxKSB7XG4gICAgb3B0cy5kZWxpbWl0ZXJzLnB1c2gob3B0cy5kZWxpbWl0ZXJzWzBdKTtcbiAgfVxuXG4gIG9wdHMubGFuZ3VhZ2UgPSAob3B0cy5sYW5ndWFnZSB8fCBvcHRzLmxhbmcgfHwgJ3lhbWwnKS50b0xvd2VyQ2FzZSgpO1xuICBvcHRzLmVuZ2luZXMgPSBPYmplY3QuYXNzaWduKHt9LCBlbmdpbmVzLCBvcHRzLnBhcnNlcnMsIG9wdHMuZW5naW5lcyk7XG4gIHJldHVybiBvcHRzO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obmFtZSwgb3B0aW9ucykge1xuICBsZXQgZW5naW5lID0gb3B0aW9ucy5lbmdpbmVzW25hbWVdIHx8IG9wdGlvbnMuZW5naW5lc1thbGlhc2UobmFtZSldO1xuICBpZiAodHlwZW9mIGVuZ2luZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2dyYXktbWF0dGVyIGVuZ2luZSBcIicgKyBuYW1lICsgJ1wiIGlzIG5vdCByZWdpc3RlcmVkJyk7XG4gIH1cbiAgaWYgKHR5cGVvZiBlbmdpbmUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBlbmdpbmUgPSB7IHBhcnNlOiBlbmdpbmUgfTtcbiAgfVxuICByZXR1cm4gZW5naW5lO1xufTtcblxuZnVuY3Rpb24gYWxpYXNlKG5hbWUpIHtcbiAgc3dpdGNoIChuYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjYXNlICdqcyc6XG4gICAgY2FzZSAnamF2YXNjcmlwdCc6XG4gICAgICByZXR1cm4gJ2phdmFzY3JpcHQnO1xuICAgIGNhc2UgJ2NvZmZlZSc6XG4gICAgY2FzZSAnY29mZmVlc2NyaXB0JzpcbiAgICBjYXNlICdjc29uJzpcbiAgICAgIHJldHVybiAnY29mZmVlJztcbiAgICBjYXNlICd5YW1sJzpcbiAgICBjYXNlICd5bWwnOlxuICAgICAgcmV0dXJuICd5YW1sJztcbiAgICBkZWZhdWx0OiB7XG4gICAgICByZXR1cm4gbmFtZTtcbiAgICB9XG4gIH1cbn1cbiIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHR5cGVPZiA9IHJlcXVpcmUoJ2tpbmQtb2YnKTtcbmNvbnN0IGdldEVuZ2luZSA9IHJlcXVpcmUoJy4vZW5naW5lJyk7XG5jb25zdCBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmaWxlLCBkYXRhLCBvcHRpb25zKSB7XG4gIGlmIChkYXRhID09IG51bGwgJiYgb3B0aW9ucyA9PSBudWxsKSB7XG4gICAgc3dpdGNoICh0eXBlT2YoZmlsZSkpIHtcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIGRhdGEgPSBmaWxlLmRhdGE7XG4gICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICByZXR1cm4gZmlsZTtcbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhwZWN0ZWQgZmlsZSB0byBiZSBhIHN0cmluZyBvciBvYmplY3QnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCBzdHIgPSBmaWxlLmNvbnRlbnQ7XG4gIGNvbnN0IG9wdHMgPSBkZWZhdWx0cyhvcHRpb25zKTtcbiAgaWYgKGRhdGEgPT0gbnVsbCkge1xuICAgIGlmICghb3B0cy5kYXRhKSByZXR1cm4gZmlsZTtcbiAgICBkYXRhID0gb3B0cy5kYXRhO1xuICB9XG5cbiAgY29uc3QgbGFuZ3VhZ2UgPSBmaWxlLmxhbmd1YWdlIHx8IG9wdHMubGFuZ3VhZ2U7XG4gIGNvbnN0IGVuZ2luZSA9IGdldEVuZ2luZShsYW5ndWFnZSwgb3B0cyk7XG4gIGlmICh0eXBlb2YgZW5naW5lLnN0cmluZ2lmeSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4cGVjdGVkIFwiJyArIGxhbmd1YWdlICsgJy5zdHJpbmdpZnlcIiB0byBiZSBhIGZ1bmN0aW9uJyk7XG4gIH1cblxuICBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgZmlsZS5kYXRhLCBkYXRhKTtcbiAgY29uc3Qgb3BlbiA9IG9wdHMuZGVsaW1pdGVyc1swXTtcbiAgY29uc3QgY2xvc2UgPSBvcHRzLmRlbGltaXRlcnNbMV07XG4gIGNvbnN0IG1hdHRlciA9IGVuZ2luZS5zdHJpbmdpZnkoZGF0YSwgb3B0aW9ucykudHJpbSgpO1xuICBsZXQgYnVmID0gJyc7XG5cbiAgaWYgKG1hdHRlciAhPT0gJ3t9Jykge1xuICAgIGJ1ZiA9IG5ld2xpbmUob3BlbikgKyBuZXdsaW5lKG1hdHRlcikgKyBuZXdsaW5lKGNsb3NlKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgZmlsZS5leGNlcnB0ID09PSAnc3RyaW5nJyAmJiBmaWxlLmV4Y2VycHQgIT09ICcnKSB7XG4gICAgaWYgKHN0ci5pbmRleE9mKGZpbGUuZXhjZXJwdC50cmltKCkpID09PSAtMSkge1xuICAgICAgYnVmICs9IG5ld2xpbmUoZmlsZS5leGNlcnB0KSArIG5ld2xpbmUoY2xvc2UpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWYgKyBuZXdsaW5lKHN0cik7XG59O1xuXG5mdW5jdGlvbiBuZXdsaW5lKHN0cikge1xuICByZXR1cm4gc3RyLnNsaWNlKC0xKSAhPT0gJ1xcbicgPyBzdHIgKyAnXFxuJyA6IHN0cjtcbn1cbiIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGZpbGUsIG9wdGlvbnMpIHtcbiAgY29uc3Qgb3B0cyA9IGRlZmF1bHRzKG9wdGlvbnMpO1xuXG4gIGlmIChmaWxlLmRhdGEgPT0gbnVsbCkge1xuICAgIGZpbGUuZGF0YSA9IHt9O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBvcHRzLmV4Y2VycHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gb3B0cy5leGNlcnB0KGZpbGUsIG9wdHMpO1xuICB9XG5cbiAgY29uc3Qgc2VwID0gZmlsZS5kYXRhLmV4Y2VycHRfc2VwYXJhdG9yIHx8IG9wdHMuZXhjZXJwdF9zZXBhcmF0b3I7XG4gIGlmIChzZXAgPT0gbnVsbCAmJiAob3B0cy5leGNlcnB0ID09PSBmYWxzZSB8fCBvcHRzLmV4Y2VycHQgPT0gbnVsbCkpIHtcbiAgICByZXR1cm4gZmlsZTtcbiAgfVxuXG4gIGNvbnN0IGRlbGltaXRlciA9IHR5cGVvZiBvcHRzLmV4Y2VycHQgPT09ICdzdHJpbmcnXG4gICAgPyBvcHRzLmV4Y2VycHRcbiAgICA6IChzZXAgfHwgb3B0cy5kZWxpbWl0ZXJzWzBdKTtcblxuICAvLyBpZiBlbmFibGVkLCBnZXQgdGhlIGV4Y2VycHQgZGVmaW5lZCBhZnRlciBmcm9udC1tYXR0ZXJcbiAgY29uc3QgaWR4ID0gZmlsZS5jb250ZW50LmluZGV4T2YoZGVsaW1pdGVyKTtcbiAgaWYgKGlkeCAhPT0gLTEpIHtcbiAgICBmaWxlLmV4Y2VycHQgPSBmaWxlLmNvbnRlbnQuc2xpY2UoMCwgaWR4KTtcbiAgfVxuXG4gIHJldHVybiBmaWxlO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHR5cGVPZiA9IHJlcXVpcmUoJ2tpbmQtb2YnKTtcbmNvbnN0IHN0cmluZ2lmeSA9IHJlcXVpcmUoJy4vc3RyaW5naWZ5Jyk7XG5jb25zdCB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxuLyoqXG4gKiBOb3JtYWxpemUgdGhlIGdpdmVuIHZhbHVlIHRvIGVuc3VyZSBhbiBvYmplY3QgaXMgcmV0dXJuZWRcbiAqIHdpdGggdGhlIGV4cGVjdGVkIHByb3BlcnRpZXMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmaWxlKSB7XG4gIGlmICh0eXBlT2YoZmlsZSkgIT09ICdvYmplY3QnKSB7XG4gICAgZmlsZSA9IHsgY29udGVudDogZmlsZSB9O1xuICB9XG5cbiAgaWYgKHR5cGVPZihmaWxlLmRhdGEpICE9PSAnb2JqZWN0Jykge1xuICAgIGZpbGUuZGF0YSA9IHt9O1xuICB9XG5cbiAgLy8gaWYgZmlsZSB3YXMgcGFzc2VkIGFzIGFuIG9iamVjdCwgZW5zdXJlIHRoYXRcbiAgLy8gXCJmaWxlLmNvbnRlbnRcIiBpcyBzZXRcbiAgaWYgKGZpbGUuY29udGVudHMgJiYgZmlsZS5jb250ZW50ID09IG51bGwpIHtcbiAgICBmaWxlLmNvbnRlbnQgPSBmaWxlLmNvbnRlbnRzO1xuICB9XG5cbiAgLy8gc2V0IG5vbi1lbnVtZXJhYmxlIHByb3BlcnRpZXMgb24gdGhlIGZpbGUgb2JqZWN0XG4gIHV0aWxzLmRlZmluZShmaWxlLCAnb3JpZycsIHV0aWxzLnRvQnVmZmVyKGZpbGUuY29udGVudCkpO1xuICB1dGlscy5kZWZpbmUoZmlsZSwgJ2xhbmd1YWdlJywgZmlsZS5sYW5ndWFnZSB8fCAnJyk7XG4gIHV0aWxzLmRlZmluZShmaWxlLCAnbWF0dGVyJywgZmlsZS5tYXR0ZXIgfHwgJycpO1xuICB1dGlscy5kZWZpbmUoZmlsZSwgJ3N0cmluZ2lmeScsIGZ1bmN0aW9uKGRhdGEsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmxhbmd1YWdlKSB7XG4gICAgICBmaWxlLmxhbmd1YWdlID0gb3B0aW9ucy5sYW5ndWFnZTtcbiAgICB9XG4gICAgcmV0dXJuIHN0cmluZ2lmeShmaWxlLCBkYXRhLCBvcHRpb25zKTtcbiAgfSk7XG5cbiAgLy8gc3RyaXAgQk9NIGFuZCBlbnN1cmUgdGhhdCBcImZpbGUuY29udGVudFwiIGlzIGEgc3RyaW5nXG4gIGZpbGUuY29udGVudCA9IHV0aWxzLnRvU3RyaW5nKGZpbGUuY29udGVudCk7XG4gIGZpbGUuaXNFbXB0eSA9IGZhbHNlO1xuICBmaWxlLmV4Y2VycHQgPSAnJztcbiAgcmV0dXJuIGZpbGU7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZ2V0RW5naW5lID0gcmVxdWlyZSgnLi9lbmdpbmUnKTtcbmNvbnN0IGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxhbmd1YWdlLCBzdHIsIG9wdGlvbnMpIHtcbiAgY29uc3Qgb3B0cyA9IGRlZmF1bHRzKG9wdGlvbnMpO1xuICBjb25zdCBlbmdpbmUgPSBnZXRFbmdpbmUobGFuZ3VhZ2UsIG9wdHMpO1xuICBpZiAodHlwZW9mIGVuZ2luZS5wYXJzZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4cGVjdGVkIFwiJyArIGxhbmd1YWdlICsgJy5wYXJzZVwiIHRvIGJlIGEgZnVuY3Rpb24nKTtcbiAgfVxuICByZXR1cm4gZW5naW5lLnBhcnNlKHN0ciwgb3B0cyk7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuY29uc3Qgc2VjdGlvbnMgPSByZXF1aXJlKCdzZWN0aW9uLW1hdHRlcicpO1xuY29uc3QgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2xpYi9kZWZhdWx0cycpO1xuY29uc3Qgc3RyaW5naWZ5ID0gcmVxdWlyZSgnLi9saWIvc3RyaW5naWZ5Jyk7XG5jb25zdCBleGNlcnB0ID0gcmVxdWlyZSgnLi9saWIvZXhjZXJwdCcpO1xuY29uc3QgZW5naW5lcyA9IHJlcXVpcmUoJy4vbGliL2VuZ2luZXMnKTtcbmNvbnN0IHRvRmlsZSA9IHJlcXVpcmUoJy4vbGliL3RvLWZpbGUnKTtcbmNvbnN0IHBhcnNlID0gcmVxdWlyZSgnLi9saWIvcGFyc2UnKTtcbmNvbnN0IHV0aWxzID0gcmVxdWlyZSgnLi9saWIvdXRpbHMnKTtcblxuLyoqXG4gKiBUYWtlcyBhIHN0cmluZyBvciBvYmplY3Qgd2l0aCBgY29udGVudGAgcHJvcGVydHksIGV4dHJhY3RzXG4gKiBhbmQgcGFyc2VzIGZyb250LW1hdHRlciBmcm9tIHRoZSBzdHJpbmcsIHRoZW4gcmV0dXJucyBhbiBvYmplY3RcbiAqIHdpdGggYGRhdGFgLCBgY29udGVudGAgYW5kIG90aGVyIFt1c2VmdWwgcHJvcGVydGllc10oI3JldHVybmVkLW9iamVjdCkuXG4gKlxuICogYGBganNcbiAqIGNvbnN0IG1hdHRlciA9IHJlcXVpcmUoJ2dyYXktbWF0dGVyJyk7XG4gKiBjb25zb2xlLmxvZyhtYXR0ZXIoJy0tLVxcbnRpdGxlOiBIb21lXFxuLS0tXFxuT3RoZXIgc3R1ZmYnKSk7XG4gKiAvLz0+IHsgZGF0YTogeyB0aXRsZTogJ0hvbWUnfSwgY29udGVudDogJ090aGVyIHN0dWZmJyB9XG4gKiBgYGBcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gYGlucHV0YCBTdHJpbmcsIG9yIG9iamVjdCB3aXRoIGBjb250ZW50YCBzdHJpbmdcbiAqIEBwYXJhbSB7T2JqZWN0fSBgb3B0aW9uc2BcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gbWF0dGVyKGlucHV0LCBvcHRpb25zKSB7XG4gIGlmIChpbnB1dCA9PT0gJycpIHtcbiAgICByZXR1cm4geyBkYXRhOiB7fSwgY29udGVudDogaW5wdXQsIGV4Y2VycHQ6ICcnLCBvcmlnOiBpbnB1dCB9O1xuICB9XG5cbiAgbGV0IGZpbGUgPSB0b0ZpbGUoaW5wdXQpO1xuICBjb25zdCBjYWNoZWQgPSBtYXR0ZXIuY2FjaGVbZmlsZS5jb250ZW50XTtcblxuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBpZiAoY2FjaGVkKSB7XG4gICAgICBmaWxlID0gT2JqZWN0LmFzc2lnbih7fSwgY2FjaGVkKTtcbiAgICAgIGZpbGUub3JpZyA9IGNhY2hlZC5vcmlnO1xuICAgICAgcmV0dXJuIGZpbGU7XG4gICAgfVxuXG4gICAgLy8gb25seSBjYWNoZSBpZiB0aGVyZSBhcmUgbm8gb3B0aW9ucyBwYXNzZWQuIGlmIHdlIGNhY2hlIHdoZW4gb3B0aW9uc1xuICAgIC8vIGFyZSBwYXNzZWQsIHdlIHdvdWxkIG5lZWQgdG8gYWxzbyBjYWNoZSBvcHRpb25zIHZhbHVlcywgd2hpY2ggd291bGRcbiAgICAvLyBuZWdhdGUgYW55IHBlcmZvcm1hbmNlIGJlbmVmaXRzIG9mIGNhY2hpbmdcbiAgICBtYXR0ZXIuY2FjaGVbZmlsZS5jb250ZW50XSA9IGZpbGU7XG4gIH1cblxuICByZXR1cm4gcGFyc2VNYXR0ZXIoZmlsZSwgb3B0aW9ucyk7XG59XG5cbi8qKlxuICogUGFyc2UgZnJvbnQgbWF0dGVyXG4gKi9cblxuZnVuY3Rpb24gcGFyc2VNYXR0ZXIoZmlsZSwgb3B0aW9ucykge1xuICBjb25zdCBvcHRzID0gZGVmYXVsdHMob3B0aW9ucyk7XG4gIGNvbnN0IG9wZW4gPSBvcHRzLmRlbGltaXRlcnNbMF07XG4gIGNvbnN0IGNsb3NlID0gJ1xcbicgKyBvcHRzLmRlbGltaXRlcnNbMV07XG4gIGxldCBzdHIgPSBmaWxlLmNvbnRlbnQ7XG5cbiAgaWYgKG9wdHMubGFuZ3VhZ2UpIHtcbiAgICBmaWxlLmxhbmd1YWdlID0gb3B0cy5sYW5ndWFnZTtcbiAgfVxuXG4gIC8vIGdldCB0aGUgbGVuZ3RoIG9mIHRoZSBvcGVuaW5nIGRlbGltaXRlclxuICBjb25zdCBvcGVuTGVuID0gb3Blbi5sZW5ndGg7XG4gIGlmICghdXRpbHMuc3RhcnRzV2l0aChzdHIsIG9wZW4sIG9wZW5MZW4pKSB7XG4gICAgZXhjZXJwdChmaWxlLCBvcHRzKTtcbiAgICByZXR1cm4gZmlsZTtcbiAgfVxuXG4gIC8vIGlmIHRoZSBuZXh0IGNoYXJhY3RlciBhZnRlciB0aGUgb3BlbmluZyBkZWxpbWl0ZXIgaXNcbiAgLy8gYSBjaGFyYWN0ZXIgZnJvbSB0aGUgZGVsaW1pdGVyLCB0aGVuIGl0J3Mgbm90IGEgZnJvbnQtXG4gIC8vIG1hdHRlciBkZWxpbWl0ZXJcbiAgaWYgKHN0ci5jaGFyQXQob3BlbkxlbikgPT09IG9wZW4uc2xpY2UoLTEpKSB7XG4gICAgcmV0dXJuIGZpbGU7XG4gIH1cblxuICAvLyBzdHJpcCB0aGUgb3BlbmluZyBkZWxpbWl0ZXJcbiAgc3RyID0gc3RyLnNsaWNlKG9wZW5MZW4pO1xuICBjb25zdCBsZW4gPSBzdHIubGVuZ3RoO1xuXG4gIC8vIHVzZSB0aGUgbGFuZ3VhZ2UgZGVmaW5lZCBhZnRlciBmaXJzdCBkZWxpbWl0ZXIsIGlmIGl0IGV4aXN0c1xuICBjb25zdCBsYW5ndWFnZSA9IG1hdHRlci5sYW5ndWFnZShzdHIsIG9wdHMpO1xuICBpZiAobGFuZ3VhZ2UubmFtZSkge1xuICAgIGZpbGUubGFuZ3VhZ2UgPSBsYW5ndWFnZS5uYW1lO1xuICAgIHN0ciA9IHN0ci5zbGljZShsYW5ndWFnZS5yYXcubGVuZ3RoKTtcbiAgfVxuXG4gIC8vIGdldCB0aGUgaW5kZXggb2YgdGhlIGNsb3NpbmcgZGVsaW1pdGVyXG4gIGxldCBjbG9zZUluZGV4ID0gc3RyLmluZGV4T2YoY2xvc2UpO1xuICBpZiAoY2xvc2VJbmRleCA9PT0gLTEpIHtcbiAgICBjbG9zZUluZGV4ID0gbGVuO1xuICB9XG5cbiAgLy8gZ2V0IHRoZSByYXcgZnJvbnQtbWF0dGVyIGJsb2NrXG4gIGZpbGUubWF0dGVyID0gc3RyLnNsaWNlKDAsIGNsb3NlSW5kZXgpO1xuXG4gIGNvbnN0IGJsb2NrID0gZmlsZS5tYXR0ZXIucmVwbGFjZSgvXlxccyojW15cXG5dKy9nbSwgJycpLnRyaW0oKTtcbiAgaWYgKGJsb2NrID09PSAnJykge1xuICAgIGZpbGUuaXNFbXB0eSA9IHRydWU7XG4gICAgZmlsZS5lbXB0eSA9IGZpbGUuY29udGVudDtcbiAgICBmaWxlLmRhdGEgPSB7fTtcbiAgfSBlbHNlIHtcblxuICAgIC8vIGNyZWF0ZSBmaWxlLmRhdGEgYnkgcGFyc2luZyB0aGUgcmF3IGZpbGUubWF0dGVyIGJsb2NrXG4gICAgZmlsZS5kYXRhID0gcGFyc2UoZmlsZS5sYW5ndWFnZSwgZmlsZS5tYXR0ZXIsIG9wdHMpO1xuICB9XG5cbiAgLy8gdXBkYXRlIGZpbGUuY29udGVudFxuICBpZiAoY2xvc2VJbmRleCA9PT0gbGVuKSB7XG4gICAgZmlsZS5jb250ZW50ID0gJyc7XG4gIH0gZWxzZSB7XG4gICAgZmlsZS5jb250ZW50ID0gc3RyLnNsaWNlKGNsb3NlSW5kZXggKyBjbG9zZS5sZW5ndGgpO1xuICAgIGlmIChmaWxlLmNvbnRlbnRbMF0gPT09ICdcXHInKSB7XG4gICAgICBmaWxlLmNvbnRlbnQgPSBmaWxlLmNvbnRlbnQuc2xpY2UoMSk7XG4gICAgfVxuICAgIGlmIChmaWxlLmNvbnRlbnRbMF0gPT09ICdcXG4nKSB7XG4gICAgICBmaWxlLmNvbnRlbnQgPSBmaWxlLmNvbnRlbnQuc2xpY2UoMSk7XG4gICAgfVxuICB9XG5cbiAgZXhjZXJwdChmaWxlLCBvcHRzKTtcblxuICBpZiAob3B0cy5zZWN0aW9ucyA9PT0gdHJ1ZSB8fCB0eXBlb2Ygb3B0cy5zZWN0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgc2VjdGlvbnMoZmlsZSwgb3B0cy5zZWN0aW9uKTtcbiAgfVxuICByZXR1cm4gZmlsZTtcbn1cblxuLyoqXG4gKiBFeHBvc2UgZW5naW5lc1xuICovXG5cbm1hdHRlci5lbmdpbmVzID0gZW5naW5lcztcblxuLyoqXG4gKiBTdHJpbmdpZnkgYW4gb2JqZWN0IHRvIFlBTUwgb3IgdGhlIHNwZWNpZmllZCBsYW5ndWFnZSwgYW5kXG4gKiBhcHBlbmQgaXQgdG8gdGhlIGdpdmVuIHN0cmluZy4gQnkgZGVmYXVsdCwgb25seSBZQU1MIGFuZCBKU09OXG4gKiBjYW4gYmUgc3RyaW5naWZpZWQuIFNlZSB0aGUgW2VuZ2luZXNdKCNlbmdpbmVzKSBzZWN0aW9uIHRvIGxlYXJuXG4gKiBob3cgdG8gc3RyaW5naWZ5IG90aGVyIGxhbmd1YWdlcy5cbiAqXG4gKiBgYGBqc1xuICogY29uc29sZS5sb2cobWF0dGVyLnN0cmluZ2lmeSgnZm9vIGJhciBiYXonLCB7dGl0bGU6ICdIb21lJ30pKTtcbiAqIC8vIHJlc3VsdHMgaW46XG4gKiAvLyAtLS1cbiAqIC8vIHRpdGxlOiBIb21lXG4gKiAvLyAtLS1cbiAqIC8vIGZvbyBiYXIgYmF6XG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gYGZpbGVgIFRoZSBjb250ZW50IHN0cmluZyB0byBhcHBlbmQgdG8gc3RyaW5naWZpZWQgZnJvbnQtbWF0dGVyLCBvciBhIGZpbGUgb2JqZWN0IHdpdGggYGZpbGUuY29udGVudGAgc3RyaW5nLlxuICogQHBhcmFtIHtPYmplY3R9IGBkYXRhYCBGcm9udCBtYXR0ZXIgdG8gc3RyaW5naWZ5LlxuICogQHBhcmFtIHtPYmplY3R9IGBvcHRpb25zYCBbT3B0aW9uc10oI29wdGlvbnMpIHRvIHBhc3MgdG8gZ3JheS1tYXR0ZXIgYW5kIFtqcy15YW1sXS5cbiAqIEByZXR1cm4ge1N0cmluZ30gUmV0dXJucyBhIHN0cmluZyBjcmVhdGVkIGJ5IHdyYXBwaW5nIHN0cmluZ2lmaWVkIHlhbWwgd2l0aCBkZWxpbWl0ZXJzLCBhbmQgYXBwZW5kaW5nIHRoYXQgdG8gdGhlIGdpdmVuIHN0cmluZy5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubWF0dGVyLnN0cmluZ2lmeSA9IGZ1bmN0aW9uKGZpbGUsIGRhdGEsIG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBmaWxlID09PSAnc3RyaW5nJykgZmlsZSA9IG1hdHRlcihmaWxlLCBvcHRpb25zKTtcbiAgcmV0dXJuIHN0cmluZ2lmeShmaWxlLCBkYXRhLCBvcHRpb25zKTtcbn07XG5cbi8qKlxuICogU3luY2hyb25vdXNseSByZWFkIGEgZmlsZSBmcm9tIHRoZSBmaWxlIHN5c3RlbSBhbmQgcGFyc2VcbiAqIGZyb250IG1hdHRlci4gUmV0dXJucyB0aGUgc2FtZSBvYmplY3QgYXMgdGhlIFttYWluIGZ1bmN0aW9uXSgjbWF0dGVyKS5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgZmlsZSA9IG1hdHRlci5yZWFkKCcuL2NvbnRlbnQvYmxvZy1wb3N0Lm1kJyk7XG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBgZmlsZXBhdGhgIGZpbGUgcGF0aCBvZiB0aGUgZmlsZSB0byByZWFkLlxuICogQHBhcmFtIHtPYmplY3R9IGBvcHRpb25zYCBbT3B0aW9uc10oI29wdGlvbnMpIHRvIHBhc3MgdG8gZ3JheS1tYXR0ZXIuXG4gKiBAcmV0dXJuIHtPYmplY3R9IFJldHVybnMgW2FuIG9iamVjdF0oI3JldHVybmVkLW9iamVjdCkgd2l0aCBgZGF0YWAgYW5kIGBjb250ZW50YFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tYXR0ZXIucmVhZCA9IGZ1bmN0aW9uKGZpbGVwYXRoLCBvcHRpb25zKSB7XG4gIGNvbnN0IHN0ciA9IGZzLnJlYWRGaWxlU3luYyhmaWxlcGF0aCwgJ3V0ZjgnKTtcbiAgY29uc3QgZmlsZSA9IG1hdHRlcihzdHIsIG9wdGlvbnMpO1xuICBmaWxlLnBhdGggPSBmaWxlcGF0aDtcbiAgcmV0dXJuIGZpbGU7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gYHN0cmluZ2AgaGFzIGZyb250IG1hdHRlci5cbiAqIEBwYXJhbSAge1N0cmluZ30gYHN0cmluZ2BcbiAqIEBwYXJhbSAge09iamVjdH0gYG9wdGlvbnNgXG4gKiBAcmV0dXJuIHtCb29sZWFufSBUcnVlIGlmIGZyb250IG1hdHRlciBleGlzdHMuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1hdHRlci50ZXN0ID0gZnVuY3Rpb24oc3RyLCBvcHRpb25zKSB7XG4gIHJldHVybiB1dGlscy5zdGFydHNXaXRoKHN0ciwgZGVmYXVsdHMob3B0aW9ucykuZGVsaW1pdGVyc1swXSk7XG59O1xuXG4vKipcbiAqIERldGVjdCB0aGUgbGFuZ3VhZ2UgdG8gdXNlLCBpZiBvbmUgaXMgZGVmaW5lZCBhZnRlciB0aGVcbiAqIGZpcnN0IGZyb250LW1hdHRlciBkZWxpbWl0ZXIuXG4gKiBAcGFyYW0gIHtTdHJpbmd9IGBzdHJpbmdgXG4gKiBAcGFyYW0gIHtPYmplY3R9IGBvcHRpb25zYFxuICogQHJldHVybiB7T2JqZWN0fSBPYmplY3Qgd2l0aCBgcmF3YCAoYWN0dWFsIGxhbmd1YWdlIHN0cmluZyksIGFuZCBgbmFtZWAsIHRoZSBsYW5ndWFnZSB3aXRoIHdoaXRlc3BhY2UgdHJpbW1lZFxuICovXG5cbm1hdHRlci5sYW5ndWFnZSA9IGZ1bmN0aW9uKHN0ciwgb3B0aW9ucykge1xuICBjb25zdCBvcHRzID0gZGVmYXVsdHMob3B0aW9ucyk7XG4gIGNvbnN0IG9wZW4gPSBvcHRzLmRlbGltaXRlcnNbMF07XG5cbiAgaWYgKG1hdHRlci50ZXN0KHN0cikpIHtcbiAgICBzdHIgPSBzdHIuc2xpY2Uob3Blbi5sZW5ndGgpO1xuICB9XG5cbiAgY29uc3QgbGFuZ3VhZ2UgPSBzdHIuc2xpY2UoMCwgc3RyLnNlYXJjaCgvXFxyP1xcbi8pKTtcbiAgcmV0dXJuIHtcbiAgICByYXc6IGxhbmd1YWdlLFxuICAgIG5hbWU6IGxhbmd1YWdlID8gbGFuZ3VhZ2UudHJpbSgpIDogJydcbiAgfTtcbn07XG5cbi8qKlxuICogRXhwb3NlIGBtYXR0ZXJgXG4gKi9cblxubWF0dGVyLmNhY2hlID0ge307XG5tYXR0ZXIuY2xlYXJDYWNoZSA9IGZ1bmN0aW9uKCkge1xuICBtYXR0ZXIuY2FjaGUgPSB7fTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IG1hdHRlcjtcbiIsICJpbXBvcnQgeyBOb3RpY2UsIFBsdWdpbiwgbm9ybWFsaXplUGF0aCwgVEZpbGUgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHVybiB9IGZyb20gXCIuL2NvbnZlcnNhdGlvblwiO1xuaW1wb3J0IHsgc2F2ZUNvbnZlcnNhdGlvbkZyb21UdXJucyB9IGZyb20gXCIuL2NvbnZlcnNhdGlvblN0b3JlXCI7XG5pbXBvcnQgeyBPdmxBcGlDbGllbnQgfSBmcm9tIFwiLi9hcGlcIjtcbmltcG9ydCB7IGFwcGVuZEVycm9yTG9nIH0gZnJvbSBcIi4vbG9nZ2luZ1wiO1xuaW1wb3J0IHsgU2F2ZUNvbnZlcnNhdGlvbk1vZGFsLCBTYXZlQ29udmVyc2F0aW9uRm9ybSB9IGZyb20gXCIuL21vZGFscy9zYXZlQ29udmVyc2F0aW9uTW9kYWxcIjtcbmltcG9ydCB7IHBhcnNlVHVybnMgfSBmcm9tIFwiLi9wYXJzZVR1cm5zXCI7XG5pbXBvcnQgeyBPdmxTZXR0aW5nVGFiIH0gZnJvbSBcIi4vc2V0dGluZ3NcIjtcbmltcG9ydCB7IERFRkFVTFRfU0VUVElOR1MsIE92bFNldHRpbmdzLCBFTUJFRERJTkdfUFJFU0VUUyB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyBDaGF0VmlldywgVklFV19UWVBFX09WTF9DSEFUIH0gZnJvbSBcIi4vdmlld3MvY2hhdFZpZXdcIjtcbmltcG9ydCB7IEluZGV4ZXIgfSBmcm9tIFwiLi9pbmRleGluZy9pbmRleGVyXCI7XG5pbXBvcnQgeyBWYXVsdFdhdGNoZXIgfSBmcm9tIFwiLi92YXVsdFdhdGNoZXJcIjtcbmltcG9ydCB7IGpvaW4gfSBmcm9tIFwicGF0aFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPdmxQbHVnaW4gZXh0ZW5kcyBQbHVnaW4ge1xuICBwdWJsaWMgc2V0dGluZ3M6IE92bFNldHRpbmdzID0geyAuLi5ERUZBVUxUX1NFVFRJTkdTIH07XG4gIHByaXZhdGUgYXBpQ2xpZW50OiBPdmxBcGlDbGllbnQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBpbmRleGVyOiBJbmRleGVyIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgdmF1bHRXYXRjaGVyOiBWYXVsdFdhdGNoZXIgfCBudWxsID0gbnVsbDtcblxuICBhc3luYyBvbmxvYWQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5sb2FkU2V0dGluZ3MoKTtcblxuICAgIC8vIEFQSSBcdUQ2MzhcdUNEOUMgXHVCODVDXHVDOUMxXHVDNzQ0IFx1QkQ4NFx1QjlBQ1x1RDU3NCBcdUMwQzFcdUQwRENcdUI5N0MgXHVDNzIwXHVDOUMwXHVENTY5XHVCMkM4XHVCMkU0LlxuICAgIHRoaXMuYXBpQ2xpZW50ID0gbmV3IE92bEFwaUNsaWVudChcbiAgICAgICgpID0+IHRoaXMuc2V0dGluZ3MsXG4gICAgICAoY29udGV4dDogc3RyaW5nLCBkZXRhaWw6IHVua25vd24pID0+XG4gICAgICAgIGFwcGVuZEVycm9yTG9nKHRoaXMuYXBwLCB0aGlzLm1hbmlmZXN0LCBjb250ZXh0LCBkZXRhaWwpXG4gICAgKTtcblxuICAgIC8vIFx1Qzc3OFx1QjM3MVx1QzJGMSBcdUNEMDhcdUFFMzBcdUQ2NTRcbiAgICBpZiAodGhpcy5zZXR0aW5ncy5pbmRleGluZ0VuYWJsZWQpIHtcbiAgICAgIGF3YWl0IHRoaXMuaW5pdGlhbGl6ZUluZGV4aW5nKCk7XG4gICAgfVxuXG4gICAgLy8gXHVDMEFDXHVDNzc0XHVCNERDXHVCQzE0IFx1Q0M0NFx1RDMwNSBcdUJERjAgXHVCNEYxXHVCODVEXG4gICAgdGhpcy5yZWdpc3RlclZpZXcoVklFV19UWVBFX09WTF9DSEFULCAobGVhZikgPT4gbmV3IENoYXRWaWV3KGxlYWYsIHRoaXMpKTtcblxuICAgIHRoaXMuYWRkUmliYm9uSWNvbihcIm1lc3NhZ2UtY2lyY2xlXCIsIFwiT1ZMIFx1QjMwMFx1RDY1NCBcdUM1RjRcdUFFMzBcIiwgKCkgPT4ge1xuICAgICAgdm9pZCB0aGlzLm9wZW5DaGF0VmlldygpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5hZGRDb21tYW5kKHtcbiAgICAgIGlkOiBcIm92bC1vcGVuLWNoYXRcIixcbiAgICAgIG5hbWU6IFwiT1ZMIFx1QjMwMFx1RDY1NCBcdUNDM0QgXHVDNUY0XHVBRTMwXCIsXG4gICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICB2b2lkIHRoaXMub3BlbkNoYXRWaWV3KCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZENvbW1hbmQoe1xuICAgICAgaWQ6IFwib3ZsLXNhdmUtY29udmVyc2F0aW9uXCIsXG4gICAgICBuYW1lOiBcIlx1QjMwMFx1RDY1NCBKU09OXHVDNUQwXHVDMTFDIFx1QjlDOFx1RDA2Q1x1QjJFNFx1QzZCNCBcdUM4MDBcdUM3QTVcIixcbiAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgIG5ldyBTYXZlQ29udmVyc2F0aW9uTW9kYWwodGhpcywgKGZvcm0pID0+IHtcbiAgICAgICAgICB2b2lkIHRoaXMuaGFuZGxlU2F2ZUNvbnZlcnNhdGlvbihmb3JtKTtcbiAgICAgICAgfSkub3BlbigpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5hZGRDb21tYW5kKHtcbiAgICAgIGlkOiBcIm92bC1pbmRleC12YXVsdFwiLFxuICAgICAgbmFtZTogXCJcdUJDRkNcdUQyQjggXHVDNzc4XHVCMzcxXHVDMkYxIFx1QzJEQ1x1Qzc5MVwiLFxuICAgICAgY2FsbGJhY2s6ICgpID0+IHtcbiAgICAgICAgdm9pZCB0aGlzLnN0YXJ0SW5kZXhpbmcoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuYWRkU2V0dGluZ1RhYihuZXcgT3ZsU2V0dGluZ1RhYih0aGlzKSk7XG4gIH1cblxuICBvbnVubG9hZCgpOiB2b2lkIHtcbiAgICB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0TGVhdmVzT2ZUeXBlKFZJRVdfVFlQRV9PVkxfQ0hBVCkuZm9yRWFjaCgobGVhZikgPT4ge1xuICAgICAgbGVhZi5kZXRhY2goKTtcbiAgICB9KTtcblxuICAgIC8vIFx1Qzc3OFx1QjM3MVx1QzExQyBcdUM4MTVcdUI5QUNcbiAgICBpZiAodGhpcy5pbmRleGVyKSB7XG4gICAgICB0aGlzLmluZGV4ZXIuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogXHVDNzc4XHVCMzcxXHVDMkYxIFx1QzJEQ1x1QzJBNFx1RDE1QyBcdUNEMDhcdUFFMzBcdUQ2NTRcbiAgICovXG4gIHByaXZhdGUgYXN5bmMgaW5pdGlhbGl6ZUluZGV4aW5nKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICAvLyBcdUIzNzBcdUM3NzRcdUQxMzAgXHVCNTE0XHVCODA5XHVEMUEwXHVCOUFDIFx1QUNCRFx1Qjg1Q1xuICAgICAgY29uc3QgZGF0YURpciA9IGpvaW4oXG4gICAgICAgIC8vIEB0cy1pZ25vcmUgLSBPYnNpZGlhbiBBUElcdUM3NTggXHVCMEI0XHVCRDgwIFx1QzE4RFx1QzEzMSBcdUMwQUNcdUM2QTlcbiAgICAgICAgdGhpcy5hcHAudmF1bHQuYWRhcHRlci5iYXNlUGF0aCxcbiAgICAgICAgXCIub2JzaWRpYW5cIixcbiAgICAgICAgXCJwbHVnaW5zXCIsXG4gICAgICAgIHRoaXMubWFuaWZlc3QuaWRcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IG1ldGFEYlBhdGggPSBqb2luKGRhdGFEaXIsIFwibWV0YS5kYlwiKTtcbiAgICAgIGNvbnN0IHZlY3RvckRiUGF0aCA9IGpvaW4oZGF0YURpciwgXCJ2ZWN0b3JzLmRiXCIpO1xuXG4gICAgICAvLyBcdUM3NzhcdUIzNzFcdUMxMUMgXHVDMEREXHVDMTMxXG4gICAgICB0aGlzLmluZGV4ZXIgPSBuZXcgSW5kZXhlcih7XG4gICAgICAgIGNodW5rU2l6ZTogdGhpcy5zZXR0aW5ncy5jaHVua1NpemUsXG4gICAgICAgIGNodW5rT3ZlcmxhcDogdGhpcy5zZXR0aW5ncy5jaHVua092ZXJsYXAsXG4gICAgICAgIHRvcEs6IHRoaXMuc2V0dGluZ3MudG9wSyxcbiAgICAgICAgZW1iZWRkaW5nUHJvdmlkZXI6IHRoaXMuc2V0dGluZ3MuZW1iZWRkaW5nUHJvdmlkZXIsXG4gICAgICAgIGVtYmVkZGluZ01vZGVsOiB0aGlzLnNldHRpbmdzLmVtYmVkZGluZ01vZGVsLFxuICAgICAgICBlbWJlZGRpbmdBcGlLZXk6IHRoaXMuc2V0dGluZ3MuZW1iZWRkaW5nQXBpS2V5IHx8IHRoaXMuc2V0dGluZ3MuYXBpS2V5LFxuICAgICAgICBlbWJlZGRpbmdBcGlVcmw6IHRoaXMuZ2V0RW1iZWRkaW5nQXBpVXJsKCksXG4gICAgICAgIG1ldGFEYlBhdGgsXG4gICAgICAgIHZlY3RvckRiUGF0aCxcbiAgICAgIH0pO1xuXG4gICAgICBhd2FpdCB0aGlzLmluZGV4ZXIuaW5pdGlhbGl6ZSgpO1xuXG4gICAgICAvLyBcdUJDRkNcdUQyQjggXHVDNkNDXHVDQzk4IFx1QzEyNFx1QzgxNVxuICAgICAgdGhpcy52YXVsdFdhdGNoZXIgPSBuZXcgVmF1bHRXYXRjaGVyKHRoaXMuYXBwLnZhdWx0KTtcbiAgICAgIHRoaXMudmF1bHRXYXRjaGVyLnNldEluZGV4ZXIodGhpcy5pbmRleGVyKTtcblxuICAgICAgLy8gXHVEMzBDXHVDNzdDIFx1Qzc3NFx1QkNBNFx1RDJCOCBcdUI5QUNcdUMyQTRcdUIxMDggXHVCNEYxXHVCODVEXG4gICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXG4gICAgICAgIHRoaXMuYXBwLnZhdWx0Lm9uKFwiY3JlYXRlXCIsIChmaWxlKSA9PiB7XG4gICAgICAgICAgaWYgKGZpbGUgaW5zdGFuY2VvZiBURmlsZSkge1xuICAgICAgICAgICAgdm9pZCB0aGlzLnZhdWx0V2F0Y2hlcj8ub25GaWxlQ3JlYXRlKGZpbGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChcbiAgICAgICAgdGhpcy5hcHAudmF1bHQub24oXCJtb2RpZnlcIiwgKGZpbGUpID0+IHtcbiAgICAgICAgICBpZiAoZmlsZSBpbnN0YW5jZW9mIFRGaWxlKSB7XG4gICAgICAgICAgICB2b2lkIHRoaXMudmF1bHRXYXRjaGVyPy5vbkZpbGVNb2RpZnkoZmlsZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFxuICAgICAgICB0aGlzLmFwcC52YXVsdC5vbihcImRlbGV0ZVwiLCAoZmlsZSkgPT4ge1xuICAgICAgICAgIGlmIChmaWxlIGluc3RhbmNlb2YgVEZpbGUpIHtcbiAgICAgICAgICAgIHRoaXMudmF1bHRXYXRjaGVyPy5vbkZpbGVEZWxldGUoZmlsZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFxuICAgICAgICB0aGlzLmFwcC52YXVsdC5vbihcInJlbmFtZVwiLCAoZmlsZSwgb2xkUGF0aCkgPT4ge1xuICAgICAgICAgIGlmIChmaWxlIGluc3RhbmNlb2YgVEZpbGUpIHtcbiAgICAgICAgICAgIHZvaWQgdGhpcy52YXVsdFdhdGNoZXI/Lm9uRmlsZVJlbmFtZShmaWxlLCBvbGRQYXRoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgICBjb25zb2xlLmxvZyhcIlx1Qzc3OFx1QjM3MVx1QzJGMSBcdUMyRENcdUMyQTRcdUQxNUMgXHVDRDA4XHVBRTMwXHVENjU0IFx1QzY0NFx1QjhDQ1wiKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIlx1Qzc3OFx1QjM3MVx1QzJGMSBcdUMyRENcdUMyQTRcdUQxNUMgXHVDRDA4XHVBRTMwXHVENjU0IFx1QzJFNFx1RDMyODpcIiwgZXJyb3IpO1xuICAgICAgbmV3IE5vdGljZShcIlx1Qzc3OFx1QjM3MVx1QzJGMSBcdUMyRENcdUMyQTRcdUQxNUMgXHVDRDA4XHVBRTMwXHVENjU0XHVDNUQwIFx1QzJFNFx1RDMyOFx1RDU4OFx1QzJCNVx1QjJDOFx1QjJFNFwiKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogXHVCQ0ZDXHVEMkI4IFx1Qzc3OFx1QjM3MVx1QzJGMSBcdUMyRENcdUM3OTFcbiAgICovXG4gIHByaXZhdGUgYXN5bmMgc3RhcnRJbmRleGluZygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIXRoaXMuc2V0dGluZ3MuaW5kZXhpbmdFbmFibGVkKSB7XG4gICAgICBuZXcgTm90aWNlKFwiXHVCQTNDXHVDODAwIFx1QzEyNFx1QzgxNVx1QzVEMFx1QzExQyBcdUM3NzhcdUIzNzFcdUMyRjFcdUM3NDQgXHVENjVDXHVDMTMxXHVENjU0XHVENTc0IFx1QzhGQ1x1QzEzOFx1QzY5NFwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuaW5kZXhlcikge1xuICAgICAgYXdhaXQgdGhpcy5pbml0aWFsaXplSW5kZXhpbmcoKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMudmF1bHRXYXRjaGVyKSB7XG4gICAgICBuZXcgTm90aWNlKFwiXHVDNzc4XHVCMzcxXHVDMkYxIFx1QzJEQ1x1QzJBNFx1RDE1Q1x1Qzc3NCBcdUNEMDhcdUFFMzBcdUQ2NTRcdUI0MThcdUM5QzAgXHVDNTRBXHVDNTU4XHVDMkI1XHVCMkM4XHVCMkU0XCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBhd2FpdCB0aGlzLnZhdWx0V2F0Y2hlci5pbmRleFZhdWx0KCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJcdUJDRkNcdUQyQjggXHVDNzc4XHVCMzcxXHVDMkYxIFx1QzJFNFx1RDMyODpcIiwgZXJyb3IpO1xuICAgICAgbmV3IE5vdGljZShcIlx1QkNGQ1x1RDJCOCBcdUM3NzhcdUIzNzFcdUMyRjFcdUM1RDAgXHVDMkU0XHVEMzI4XHVENTg4XHVDMkI1XHVCMkM4XHVCMkU0XCIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBcdUJDQTFcdUQxMzAgXHVBQzgwXHVDMEM5IFx1QzIxOFx1RDU4OVxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNlYXJjaChxdWVyeTogc3RyaW5nKTogUHJvbWlzZTxBcnJheTx7IGNodW5rOiBhbnk7IG5vdGU6IGFueTsgc2NvcmU6IG51bWJlciB9Pj4ge1xuICAgIGlmICghdGhpcy5pbmRleGVyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJcdUM3NzhcdUIzNzFcdUMyRjFcdUM3NzQgXHVENjVDXHVDMTMxXHVENjU0XHVCNDE4XHVDOUMwIFx1QzU0QVx1QzU1OFx1QzJCNVx1QjJDOFx1QjJFNFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBzZWFyY2hSZXN1bHRzID0gYXdhaXQgdGhpcy5pbmRleGVyLnNlYXJjaChxdWVyeSk7XG4gICAgcmV0dXJuIHRoaXMuaW5kZXhlci5nZXRTZWFyY2hSZXN1bHRzV2l0aE1ldGFkYXRhKHNlYXJjaFJlc3VsdHMpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBvcGVuQ2hhdFZpZXcoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgZXhpc3RpbmdMZWFmID0gdGhpcy5hcHAud29ya3NwYWNlLmdldExlYXZlc09mVHlwZShWSUVXX1RZUEVfT1ZMX0NIQVQpWzBdO1xuICAgIGNvbnN0IGxlYWYgPSBleGlzdGluZ0xlYWYgPz8gdGhpcy5hcHAud29ya3NwYWNlLmdldFJpZ2h0TGVhZihmYWxzZSk7XG4gICAgaWYgKCFsZWFmKSB7XG4gICAgICBuZXcgTm90aWNlKFwiXHVCMzAwXHVENjU0IFx1Q0MzRFx1Qzc0NCBcdUM1RjQgXHVDMjE4IFx1QzVDNlx1QzJCNVx1QjJDOFx1QjJFNC5cIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYXdhaXQgbGVhZi5zZXRWaWV3U3RhdGUoeyB0eXBlOiBWSUVXX1RZUEVfT1ZMX0NIQVQsIGFjdGl2ZTogdHJ1ZSB9KTtcbiAgICB0aGlzLmFwcC53b3Jrc3BhY2UucmV2ZWFsTGVhZihsZWFmKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyByZXF1ZXN0QXNzaXN0YW50UmVwbHkodHVybnM6IENvbnZlcnNhdGlvblR1cm5bXSk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgaWYgKCF0aGlzLmFwaUNsaWVudCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQVBJIFx1RDA3NFx1Qjc3Q1x1Qzc3NFx1QzVCOFx1RDJCOFx1Qjk3QyBcdUNEMDhcdUFFMzBcdUQ2NTRcdUQ1NjAgXHVDMjE4IFx1QzVDNlx1QzJCNVx1QjJDOFx1QjJFNC5cIik7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmFwaUNsaWVudC5yZXF1ZXN0QXNzaXN0YW50UmVwbHkodHVybnMpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHNhdmVDb252ZXJzYXRpb25Gcm9tVHVybnMoXG4gICAgc2Vzc2lvbklkOiBzdHJpbmcsXG4gICAgdHVybnM6IENvbnZlcnNhdGlvblR1cm5bXSxcbiAgICBvdXRwdXRGb2xkZXI6IHN0cmluZ1xuICApOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiBzYXZlQ29udmVyc2F0aW9uRnJvbVR1cm5zKHRoaXMuYXBwLnZhdWx0LCBzZXNzaW9uSWQsIHR1cm5zLCBvdXRwdXRGb2xkZXIpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBsb2FkU2V0dGluZ3MoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5zZXR0aW5ncyA9IHsgLi4uREVGQVVMVF9TRVRUSU5HUywgLi4uKGF3YWl0IHRoaXMubG9hZERhdGEoKSkgfTtcblxuICAgIGxldCBjaGFuZ2VkID0gZmFsc2U7XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuZW1iZWRkaW5nUHJvdmlkZXIgPT09IFwibG9jYWxcIikge1xuICAgICAgdGhpcy5zZXR0aW5ncy5lbWJlZGRpbmdQcm92aWRlciA9IFwiZ2VtaW5pXCI7XG4gICAgICB0aGlzLnNldHRpbmdzLmVtYmVkZGluZ01vZGVsID0gRU1CRURESU5HX1BSRVNFVFMuZ2VtaW5pLm1vZGVsO1xuICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZWQpIHtcbiAgICAgIGF3YWl0IHRoaXMuc2F2ZVNldHRpbmdzKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHNhdmVTZXR0aW5ncygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVTYXZlQ29udmVyc2F0aW9uKGZvcm06IFNhdmVDb252ZXJzYXRpb25Gb3JtKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghZm9ybS5pbnB1dFBhdGgpIHtcbiAgICAgICAgbmV3IE5vdGljZShcIkpTT04gXHVEMzBDXHVDNzdDIFx1QUNCRFx1Qjg1Q1x1Qjk3QyBcdUM3ODVcdUI4MjVcdUQ1NzQgXHVDOEZDXHVDMTM4XHVDNjk0LlwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKCFmb3JtLnNlc3Npb25JZCkge1xuICAgICAgICBuZXcgTm90aWNlKFwiXHVDMTM4XHVDMTU4IElEXHVCOTdDIFx1Qzc4NVx1QjgyNVx1RDU3NCBcdUM4RkNcdUMxMzhcdUM2OTQuXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGpzb25QYXRoID0gbm9ybWFsaXplUGF0aChmb3JtLmlucHV0UGF0aCkucmVwbGFjZSgvXlxcLysvLCBcIlwiKTtcbiAgICAgIGNvbnN0IGpzb25FeGlzdHMgPSBhd2FpdCB0aGlzLmFwcC52YXVsdC5hZGFwdGVyLmV4aXN0cyhqc29uUGF0aCk7XG4gICAgICBpZiAoIWpzb25FeGlzdHMpIHtcbiAgICAgICAgbmV3IE5vdGljZShcIkpTT04gXHVEMzBDXHVDNzdDXHVDNzQ0IFx1Q0MzRVx1Qzc0NCBcdUMyMTggXHVDNUM2XHVDMkI1XHVCMkM4XHVCMkU0LlwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QganNvbkNvbnRlbnQgPSBhd2FpdCB0aGlzLmFwcC52YXVsdC5hZGFwdGVyLnJlYWQoanNvblBhdGgpO1xuICAgICAgY29uc3QgdHVybnMgPSBwYXJzZVR1cm5zKGpzb25Db250ZW50KTtcblxuICAgICAgY29uc3Qgb3V0cHV0Rm9sZGVyID0gZm9ybS5vdXRwdXRGb2xkZXJcbiAgICAgICAgPyBub3JtYWxpemVQYXRoKGZvcm0ub3V0cHV0Rm9sZGVyKS5yZXBsYWNlKC9eXFwvKy8sIFwiXCIpXG4gICAgICAgIDogXCJcIjtcbiAgICAgIGNvbnN0IHRhcmdldFBhdGggPSBhd2FpdCBzYXZlQ29udmVyc2F0aW9uRnJvbVR1cm5zKFxuICAgICAgICB0aGlzLmFwcC52YXVsdCxcbiAgICAgICAgZm9ybS5zZXNzaW9uSWQsXG4gICAgICAgIHR1cm5zLFxuICAgICAgICBvdXRwdXRGb2xkZXJcbiAgICAgICk7XG4gICAgICBuZXcgTm90aWNlKGBcdUIzMDBcdUQ2NTQgXHVDODAwXHVDN0E1IFx1QzY0NFx1QjhDQzogJHt0YXJnZXRQYXRofWApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpO1xuICAgICAgbmV3IE5vdGljZShgXHVDODAwXHVDN0E1IFx1QzJFNFx1RDMyODogJHttZXNzYWdlfWApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBcdUM3ODRcdUJDQTBcdUI1MjkgQVBJIFVSTCBcdUFDMDBcdUM4MzhcdUM2MjRcdUFFMzBcbiAgICovXG4gIHByaXZhdGUgZ2V0RW1iZWRkaW5nQXBpVXJsKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgcHJlc2V0ID0gRU1CRURESU5HX1BSRVNFVFNbdGhpcy5zZXR0aW5ncy5lbWJlZGRpbmdQcm92aWRlcl07XG4gICAgcmV0dXJuIHByZXNldD8uYXBpVXJsO1xuICB9XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBWYXVsdCB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHsgbm9ybWFsaXplUGF0aCB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb24sIENvbnZlcnNhdGlvblR1cm4gfSBmcm9tIFwiLi9jb252ZXJzYXRpb25cIjtcbmltcG9ydCB7IGNvbnZlcnRUb01hcmtkb3duIH0gZnJvbSBcIi4vY29udmVyc2F0aW9uXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzYXZlQ29udmVyc2F0aW9uRnJvbVR1cm5zKFxuICB2YXVsdDogVmF1bHQsXG4gIHNlc3Npb25JZDogc3RyaW5nLFxuICB0dXJuczogQ29udmVyc2F0aW9uVHVybltdLFxuICBvdXRwdXRGb2xkZXI6IHN0cmluZ1xuKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgY29uc3QgY29udmVyc2F0aW9uOiBDb252ZXJzYXRpb24gPSB7XG4gICAgc2Vzc2lvbklkLFxuICAgIHR1cm5zLFxuICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKVxuICB9O1xuXG4gIGNvbnN0IG1hcmtkb3duID0gY29udmVydFRvTWFya2Rvd24oY29udmVyc2F0aW9uKTtcbiAgY29uc3QgZmlsZW5hbWUgPSBidWlsZEZpbGVOYW1lKGNvbnZlcnNhdGlvbik7XG4gIGNvbnN0IGNsZWFuZWRGb2xkZXIgPSBvdXRwdXRGb2xkZXIgPyBub3JtYWxpemVQYXRoKG91dHB1dEZvbGRlcikucmVwbGFjZSgvXlxcLysvLCBcIlwiKSA6IFwiXCI7XG4gIGNvbnN0IHRhcmdldFBhdGggPSBhd2FpdCBlbnN1cmVVbmlxdWVQYXRoKFxuICAgIHZhdWx0LFxuICAgIG5vcm1hbGl6ZVBhdGgoY2xlYW5lZEZvbGRlciA/IGAke2NsZWFuZWRGb2xkZXJ9LyR7ZmlsZW5hbWV9YCA6IGZpbGVuYW1lKVxuICApO1xuXG4gIGlmIChjbGVhbmVkRm9sZGVyKSB7XG4gICAgYXdhaXQgZW5zdXJlRm9sZGVyRXhpc3RzKHZhdWx0LCBjbGVhbmVkRm9sZGVyKTtcbiAgfVxuXG4gIGF3YWl0IHZhdWx0LmNyZWF0ZSh0YXJnZXRQYXRoLCBtYXJrZG93bik7XG4gIHJldHVybiB0YXJnZXRQYXRoO1xufVxuXG5mdW5jdGlvbiBidWlsZEZpbGVOYW1lKGNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uKTogc3RyaW5nIHtcbiAgY29uc3QgZGF0ZSA9IGNvbnZlcnNhdGlvbi5jcmVhdGVkQXQudG9JU09TdHJpbmcoKS5zcGxpdChcIlRcIilbMF07XG4gIHJldHVybiBgJHtkYXRlfS0ke2NvbnZlcnNhdGlvbi5zZXNzaW9uSWR9Lm1kYDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZW5zdXJlRm9sZGVyRXhpc3RzKHZhdWx0OiBWYXVsdCwgZm9sZGVyOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgZXhpc3RzID0gYXdhaXQgdmF1bHQuYWRhcHRlci5leGlzdHMoZm9sZGVyKTtcbiAgaWYgKCFleGlzdHMpIHtcbiAgICBhd2FpdCB2YXVsdC5jcmVhdGVGb2xkZXIoZm9sZGVyKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBlbnN1cmVVbmlxdWVQYXRoKHZhdWx0OiBWYXVsdCwgcGF0aDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZVBhdGgocGF0aCk7XG4gIGNvbnN0IGV4dGVuc2lvbkluZGV4ID0gbm9ybWFsaXplZC5sYXN0SW5kZXhPZihcIi5tZFwiKTtcbiAgY29uc3QgYmFzZSA9IGV4dGVuc2lvbkluZGV4ID09PSAtMSA/IG5vcm1hbGl6ZWQgOiBub3JtYWxpemVkLnNsaWNlKDAsIGV4dGVuc2lvbkluZGV4KTtcbiAgY29uc3QgZXh0ZW5zaW9uID0gZXh0ZW5zaW9uSW5kZXggPT09IC0xID8gXCJcIiA6IFwiLm1kXCI7XG5cbiAgbGV0IGNhbmRpZGF0ZSA9IG5vcm1hbGl6ZWQ7XG4gIGxldCBjb3VudCA9IDE7XG5cbiAgd2hpbGUgKGF3YWl0IHZhdWx0LmFkYXB0ZXIuZXhpc3RzKGNhbmRpZGF0ZSkpIHtcbiAgICBjYW5kaWRhdGUgPSBgJHtiYXNlfS0ke2NvdW50fSR7ZXh0ZW5zaW9ufWA7XG4gICAgY291bnQgKz0gMTtcbiAgfVxuXG4gIHJldHVybiBjYW5kaWRhdGU7XG59XG4iLCAiaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbi8vIFx1QjMwMFx1RDY1NFx1Qzc1OCBcdUFDMDEgXHVEMTM0XHVDNzQ0IFx1QjA5OFx1RDBDMFx1QjBCNFx1QjI5NCBcdUQwQzBcdUM3ODVcbmV4cG9ydCB0eXBlIENvbnZlcnNhdGlvblR1cm4gPSB7XG4gIHJvbGU6IFwidXNlclwiIHwgXCJhc3Npc3RhbnRcIiB8IFwic3lzdGVtXCI7XG4gIGNvbnRlbnQ6IHN0cmluZztcbiAgdGltZXN0YW1wPzogRGF0ZSB8IHN0cmluZztcbn07XG5cbi8vIFx1QjMwMFx1RDY1NCBcdUM4MDRcdUNDQjRcdUI5N0MgXHVCMDk4XHVEMEMwXHVCMEI0XHVCMjk0IFx1RDBDMFx1Qzc4NVxuZXhwb3J0IHR5cGUgQ29udmVyc2F0aW9uID0ge1xuICBzZXNzaW9uSWQ6IHN0cmluZztcbiAgdHVybnM6IENvbnZlcnNhdGlvblR1cm5bXTtcbiAgY3JlYXRlZEF0OiBEYXRlO1xufTtcblxuLy8gXHVCMzAwXHVENjU0XHVCOTdDIFx1QjlDOFx1RDA2Q1x1QjJFNFx1QzZCNCBcdUQ2MTVcdUMyRERcdUM3M0NcdUI4NUMgXHVCQ0MwXHVENjU4XG5leHBvcnQgZnVuY3Rpb24gY29udmVydFRvTWFya2Rvd24oY29udmVyc2F0aW9uOiBDb252ZXJzYXRpb24pOiBzdHJpbmcge1xuICBjb25zdCBsaW5lczogc3RyaW5nW10gPSBbXTtcbiAgXG4gIC8vIFx1RDVFNFx1QjM1NDogXHVDODFDXHVCQUE5XHVBQ0ZDIFx1QkE1NFx1RDBDMFx1QjM3MFx1Qzc3NFx1RDEzMFxuICBsaW5lcy5wdXNoKGAjIFx1QjMwMFx1RDY1NCBcdUFFMzBcdUI4NUQgLSAke2NvbnZlcnNhdGlvbi5zZXNzaW9uSWR9YCk7XG4gIGxpbmVzLnB1c2goXCJcIik7XG4gIGxpbmVzLnB1c2goYFx1QzBERFx1QzEzMVx1Qzc3QzogJHtjb252ZXJzYXRpb24uY3JlYXRlZEF0LnRvSVNPU3RyaW5nKCl9YCk7XG4gIGxpbmVzLnB1c2goXCJcIik7XG4gIGxpbmVzLnB1c2goXCItLS1cIik7XG4gIGxpbmVzLnB1c2goXCJcIik7XG4gIFxuICAvLyBcdUFDMDEgXHVEMTM0XHVDNzQ0IFx1QjlDOFx1RDA2Q1x1QjJFNFx1QzZCNFx1QzczQ1x1Qjg1QyBcdUJDQzBcdUQ2NThcbiAgZm9yIChjb25zdCB0dXJuIG9mIGNvbnZlcnNhdGlvbi50dXJucykge1xuICAgIGNvbnN0IHJvbGVMYWJlbCA9IHR1cm4ucm9sZSA9PT0gXCJ1c2VyXCIgPyBcIlx1RDgzRFx1REM2NCBcdUMwQUNcdUM2QTlcdUM3OTBcIiA6IFxuICAgICAgICAgICAgICAgICAgICAgdHVybi5yb2xlID09PSBcImFzc2lzdGFudFwiID8gXCJcdUQ4M0VcdUREMTYgXHVDNUI0XHVDMkRDXHVDMkE0XHVEMTM0XHVEMkI4XCIgOiBcbiAgICAgICAgICAgICAgICAgICAgIFwiXHUyNjk5XHVGRTBGIFx1QzJEQ1x1QzJBNFx1RDE1Q1wiO1xuICAgIFxuICAgIGxpbmVzLnB1c2goYCMjICR7cm9sZUxhYmVsfWApO1xuICAgIFxuICAgIGlmICh0dXJuLnRpbWVzdGFtcCkge1xuICAgICAgY29uc3QgdGltZXN0YW1wID0gdHlwZW9mIHR1cm4udGltZXN0YW1wID09PSBcInN0cmluZ1wiIFxuICAgICAgICA/IHR1cm4udGltZXN0YW1wIFxuICAgICAgICA6IHR1cm4udGltZXN0YW1wLnRvSVNPU3RyaW5nKCk7XG4gICAgICBsaW5lcy5wdXNoKGAqJHt0aW1lc3RhbXB9KmApO1xuICAgICAgbGluZXMucHVzaChcIlwiKTtcbiAgICB9XG4gICAgXG4gICAgbGluZXMucHVzaCh0dXJuLmNvbnRlbnQpO1xuICAgIGxpbmVzLnB1c2goXCJcIik7XG4gIH1cbiAgXG4gIHJldHVybiBsaW5lcy5qb2luKFwiXFxuXCIpO1xufVxuXG4vLyBcdUIzMDBcdUQ2NTRcdUI5N0MgXHVEMzBDXHVDNzdDXHVCODVDIFx1QzgwMFx1QzdBNVxuZXhwb3J0IGZ1bmN0aW9uIHNhdmVDb252ZXJzYXRpb24oXG4gIGNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uLFxuICB0YXJnZXREaXI6IHN0cmluZ1xuKTogc3RyaW5nIHtcbiAgaWYgKCFmcy5leGlzdHNTeW5jKHRhcmdldERpcikpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFx1QjMwMFx1QzBDMSBcdUI1MTRcdUI4MDlcdUQxQTBcdUI5QUNcdUFDMDAgXHVDODc0XHVDN0FDXHVENTU4XHVDOUMwIFx1QzU0QVx1QzJCNVx1QjJDOFx1QjJFNDogJHt0YXJnZXREaXJ9YCk7XG4gIH1cbiAgXG4gIGNvbnN0IG1hcmtkb3duID0gY29udmVydFRvTWFya2Rvd24oY29udmVyc2F0aW9uKTtcbiAgXG4gIC8vIFx1RDMwQ1x1Qzc3Q1x1QkE4NSBcdUMwRERcdUMxMzE6IFlZWVktTU0tREQtc2Vzc2lvbklkLm1kXG4gIGNvbnN0IGRhdGUgPSBjb252ZXJzYXRpb24uY3JlYXRlZEF0LnRvSVNPU3RyaW5nKCkuc3BsaXQoXCJUXCIpWzBdO1xuICBjb25zdCBmaWxlbmFtZSA9IGAke2RhdGV9LSR7Y29udmVyc2F0aW9uLnNlc3Npb25JZH0ubWRgO1xuICBjb25zdCBmaWxlcGF0aCA9IHBhdGguam9pbih0YXJnZXREaXIsIGZpbGVuYW1lKTtcbiAgXG4gIGZzLndyaXRlRmlsZVN5bmMoZmlsZXBhdGgsIG1hcmtkb3duLCBcInV0Zi04XCIpO1xuICBcbiAgcmV0dXJuIGZpbGVwYXRoO1xufVxuIiwgImltcG9ydCB7IHJlcXVlc3RVcmwgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHVybiB9IGZyb20gXCIuL2NvbnZlcnNhdGlvblwiO1xuaW1wb3J0IHR5cGUgeyBPdmxTZXR0aW5ncyB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyBQUk9WSURFUl9QUkVTRVRTIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxudHlwZSBMb2dXcml0ZXIgPSAoY29udGV4dDogc3RyaW5nLCBkZXRhaWw6IHVua25vd24pID0+IFByb21pc2U8dm9pZD47XG5cbnR5cGUgU2V0dGluZ3NHZXR0ZXIgPSAoKSA9PiBPdmxTZXR0aW5ncztcblxuZXhwb3J0IGNsYXNzIE92bEFwaUNsaWVudCB7XG4gIHByaXZhdGUgcmVhZG9ubHkgZ2V0U2V0dGluZ3M6IFNldHRpbmdzR2V0dGVyO1xuICBwcml2YXRlIHJlYWRvbmx5IGxvZ1dyaXRlcjogTG9nV3JpdGVyO1xuXG4gIGNvbnN0cnVjdG9yKGdldFNldHRpbmdzOiBTZXR0aW5nc0dldHRlciwgbG9nV3JpdGVyPzogTG9nV3JpdGVyKSB7XG4gICAgdGhpcy5nZXRTZXR0aW5ncyA9IGdldFNldHRpbmdzO1xuICAgIC8vIFx1Qjg1Q1x1QURGOCBcdUFFMzBcdUI4NURcdUFFMzBcdUI5N0MgXHVDOEZDXHVDNzg1XHVCQzFCXHVDOUMwIFx1QkFCQlx1RDU1QyBcdUFDQkRcdUM2QjBcdUM1RDBcdUIzQzQgXHVDNTQ4XHVDODA0XHVENTU4XHVBQzhDIFx1QjNEOVx1Qzc5MVx1RDU1OFx1QjNDNFx1Qjg1RCBcdUNDOThcdUI5QUNcdUQ1NjlcdUIyQzhcdUIyRTQuXG4gICAgdGhpcy5sb2dXcml0ZXIgPSBsb2dXcml0ZXIgPz8gKGFzeW5jICgpID0+IHt9KTtcbiAgfVxuXG4gIGFzeW5jIHJlcXVlc3RBc3Npc3RhbnRSZXBseSh0dXJuczogQ29udmVyc2F0aW9uVHVybltdKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBzZXR0aW5ncyA9IHRoaXMuZ2V0U2V0dGluZ3MoKTtcblxuICAgIGlmIChzZXR0aW5ncy5wcm92aWRlciA9PT0gXCJnZW1pbmlcIikge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEdlbWluaVJlcGx5KHNldHRpbmdzLCB0dXJucyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdE9wZW5BaUNvbXBhdGlibGVSZXBseShzZXR0aW5ncywgdHVybnMpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyByZXF1ZXN0T3BlbkFpQ29tcGF0aWJsZVJlcGx5KFxuICAgIHNldHRpbmdzOiBPdmxTZXR0aW5ncyxcbiAgICB0dXJuczogQ29udmVyc2F0aW9uVHVybltdXG4gICk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgYXBpVXJsID0gc2V0dGluZ3MuYXBpVXJsLnRyaW0oKTtcbiAgICBpZiAoIWFwaVVybCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQVBJIFVSTFx1Qzc0NCBcdUMxMjRcdUM4MTVcdUQ1NzQgXHVDOEZDXHVDMTM4XHVDNjk0LlwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBtb2RlbE5hbWUgPSBzZXR0aW5ncy5tb2RlbC50cmltKCkgfHwgUFJPVklERVJfUFJFU0VUUy5vcGVuYWkubW9kZWw7XG4gICAgaWYgKCFtb2RlbE5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlx1QkFBOFx1QjM3OCBcdUM3NzRcdUI5ODRcdUM3NDQgXHVDNzg1XHVCODI1XHVENTc0IFx1QzhGQ1x1QzEzOFx1QzY5NC5cIik7XG4gICAgfVxuXG4gICAgY29uc3QgbWVzc2FnZXMgPSB0aGlzLmJ1aWxkT3BlbkFpTWVzc2FnZXMoc2V0dGluZ3MsIHR1cm5zKTtcbiAgICBjb25zdCBwYXlsb2FkID0ge1xuICAgICAgbW9kZWw6IG1vZGVsTmFtZSxcbiAgICAgIG1lc3NhZ2VzXG4gICAgfTtcbiAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkocGF5bG9hZCk7XG5cbiAgICBjb25zdCBoZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICB9O1xuICAgIGlmIChzZXR0aW5ncy5hcGlLZXkudHJpbSgpKSB7XG4gICAgICBoZWFkZXJzLkF1dGhvcml6YXRpb24gPSBgQmVhcmVyICR7c2V0dGluZ3MuYXBpS2V5LnRyaW0oKX1gO1xuICAgIH1cblxuICAgIGxldCByZXNwb25zZTogeyB0ZXh0OiBzdHJpbmc7IGpzb24/OiB1bmtub3duOyBzdGF0dXM/OiBudW1iZXIgfTtcbiAgICB0cnkge1xuICAgICAgcmVzcG9uc2UgPSBhd2FpdCByZXF1ZXN0VXJsKHtcbiAgICAgICAgdXJsOiBhcGlVcmwsXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGhlYWRlcnMsXG4gICAgICAgIGJvZHlcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpO1xuICAgICAgYXdhaXQgdGhpcy5sb2coXCJvcGVuYWktY29tcGF0aWJsZSByZXF1ZXN0IGZhaWxlZFwiLCB7XG4gICAgICAgIHVybDogYXBpVXJsLFxuICAgICAgICBib2R5OiBwYXlsb2FkLFxuICAgICAgICBlcnJvcjogbWVzc2FnZVxuICAgICAgfSk7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEFQSSBcdUM2OTRcdUNDQUQgXHVDMkU0XHVEMzI4OiAke21lc3NhZ2V9YCk7XG4gICAgfVxuXG4gICAgY29uc3Qgc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgIGlmIChzdGF0dXMgJiYgc3RhdHVzID49IDQwMCkge1xuICAgICAgYXdhaXQgdGhpcy5sb2coXCJvcGVuYWktY29tcGF0aWJsZSByZXNwb25zZSBlcnJvclwiLCB7XG4gICAgICAgIHVybDogYXBpVXJsLFxuICAgICAgICBib2R5OiBwYXlsb2FkLFxuICAgICAgICBzdGF0dXMsXG4gICAgICAgIHJlc3BvbnNlOiByZXNwb25zZS50ZXh0XG4gICAgICB9KTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQVBJIFx1QzYyNFx1Qjk1ODogJHtzdGF0dXN9YCk7XG4gICAgfVxuXG4gICAgY29uc3QgZGF0YSA9IHRoaXMucGFyc2VKc29uUmVzcG9uc2UocmVzcG9uc2UudGV4dCwgcmVzcG9uc2UuanNvbik7XG4gICAgY29uc3QgY29udGVudCA9XG4gICAgICAoZGF0YSBhcyB7IGNob2ljZXM/OiBBcnJheTx7IG1lc3NhZ2U/OiB7IGNvbnRlbnQ/OiBzdHJpbmcgfSB9PiB9KT8uY2hvaWNlcz8uWzBdPy5tZXNzYWdlXG4gICAgICAgID8uY29udGVudCA/P1xuICAgICAgKGRhdGEgYXMgeyByZXBseT86IHN0cmluZyB9KT8ucmVwbHkgPz9cbiAgICAgIChkYXRhIGFzIHsgY29udGVudD86IHN0cmluZyB9KT8uY29udGVudCA/P1xuICAgICAgKGRhdGEgYXMgeyBtZXNzYWdlPzogc3RyaW5nIH0pPy5tZXNzYWdlO1xuXG4gICAgaWYgKCFjb250ZW50IHx8IHR5cGVvZiBjb250ZW50ICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICBhd2FpdCB0aGlzLmxvZyhcIm9wZW5haS1jb21wYXRpYmxlIHJlc3BvbnNlIGludmFsaWRcIiwgeyB1cmw6IGFwaVVybCwgcmVzcG9uc2U6IGRhdGEgfSk7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJcdUM3NTFcdUIyRjUgXHVENjE1XHVDMkREXHVDNzc0IFx1QzYyQ1x1QkMxNFx1Qjk3NFx1QzlDMCBcdUM1NEFcdUMyQjVcdUIyQzhcdUIyRTQuXCIpO1xuICAgIH1cblxuICAgIHJldHVybiBjb250ZW50LnRyaW0oKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgcmVxdWVzdEdlbWluaVJlcGx5KFxuICAgIHNldHRpbmdzOiBPdmxTZXR0aW5ncyxcbiAgICB0dXJuczogQ29udmVyc2F0aW9uVHVybltdXG4gICk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgYXBpS2V5ID0gc2V0dGluZ3MuYXBpS2V5LnRyaW0oKTtcbiAgICBpZiAoIWFwaUtleSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VtaW5pIEFQSSBcdUQwQTRcdUI5N0MgXHVDNzg1XHVCODI1XHVENTc0IFx1QzhGQ1x1QzEzOFx1QzY5NC5cIik7XG4gICAgfVxuXG4gICAgY29uc3QgbW9kZWxOYW1lID0gc2V0dGluZ3MubW9kZWwudHJpbSgpIHx8IFBST1ZJREVSX1BSRVNFVFMuZ2VtaW5pLm1vZGVsO1xuICAgIGlmICghbW9kZWxOYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW1pbmkgXHVCQUE4XHVCMzc4IFx1Qzc3NFx1Qjk4NFx1Qzc0NCBcdUM3ODVcdUI4MjVcdUQ1NzQgXHVDOEZDXHVDMTM4XHVDNjk0LlwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBzeXN0ZW1Qcm9tcHQgPSBzZXR0aW5ncy5zeXN0ZW1Qcm9tcHQudHJpbSgpO1xuICAgIGNvbnN0IGNvbnRlbnRzID0gdHVybnMubWFwKCh0dXJuKSA9PiB7XG4gICAgICBjb25zdCByb2xlID0gdHVybi5yb2xlID09PSBcImFzc2lzdGFudFwiID8gXCJtb2RlbFwiIDogXCJ1c2VyXCI7XG4gICAgICBjb25zdCB0ZXh0ID0gdHVybi5yb2xlID09PSBcInN5c3RlbVwiID8gYFtcdUMyRENcdUMyQTRcdUQxNUNdICR7dHVybi5jb250ZW50fWAgOiB0dXJuLmNvbnRlbnQ7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByb2xlLFxuICAgICAgICBwYXJ0czogW3sgdGV4dCB9XVxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHBheWxvYWQ6IHtcbiAgICAgIHN5c3RlbUluc3RydWN0aW9uPzogeyBwYXJ0czogQXJyYXk8eyB0ZXh0OiBzdHJpbmcgfT4gfTtcbiAgICAgIGNvbnRlbnRzOiBBcnJheTx7IHJvbGU6IHN0cmluZzsgcGFydHM6IEFycmF5PHsgdGV4dDogc3RyaW5nIH0+IH0+O1xuICAgICAgZ2VuZXJhdGlvbkNvbmZpZzogeyByZXNwb25zZU1pbWVUeXBlOiBzdHJpbmcgfTtcbiAgICB9ID0ge1xuICAgICAgY29udGVudHMsXG4gICAgICBnZW5lcmF0aW9uQ29uZmlnOiB7XG4gICAgICAgIHJlc3BvbnNlTWltZVR5cGU6IFwidGV4dC9wbGFpblwiXG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChzeXN0ZW1Qcm9tcHQpIHtcbiAgICAgIHBheWxvYWQuc3lzdGVtSW5zdHJ1Y3Rpb24gPSB7IHBhcnRzOiBbeyB0ZXh0OiBzeXN0ZW1Qcm9tcHQgfV0gfTtcbiAgICB9XG5cbiAgICAvLyBHZW1pbmkgQVBJIFVSTCBcdUFENkNcdUMxMzEgKEFQSSBcdUQwQTRcdUI5N0MgXHVDRkZDXHVCOUFDIFx1RDMwQ1x1Qjc3Q1x1QkJGOFx1RDEzMFx1Qjg1QyBcdUM4MDRcdUIyRUMpXG4gICAgY29uc3QgYXBpVXJsID0gYGh0dHBzOi8vZ2VuZXJhdGl2ZWxhbmd1YWdlLmdvb2dsZWFwaXMuY29tL3YxYmV0YS9tb2RlbHMvJHttb2RlbE5hbWV9OmdlbmVyYXRlQ29udGVudD9rZXk9JHthcGlLZXl9YDtcblxuICAgIGNvbnN0IGhlYWRlcnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgIH07XG5cbiAgICBsZXQgcmVzcG9uc2U6IHsgdGV4dDogc3RyaW5nOyBqc29uPzogdW5rbm93bjsgc3RhdHVzPzogbnVtYmVyIH07XG4gICAgdHJ5IHtcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgcmVxdWVzdFVybCh7XG4gICAgICAgIHVybDogYXBpVXJsLFxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBoZWFkZXJzLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKVxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcik7XG4gICAgICBhd2FpdCB0aGlzLmxvZyhcImdlbWluaSByZXF1ZXN0IGZhaWxlZFwiLCB7XG4gICAgICAgIG1vZGVsOiBtb2RlbE5hbWUsXG4gICAgICAgIGJvZHk6IHBheWxvYWQsXG4gICAgICAgIGVycm9yOiBtZXNzYWdlXG4gICAgICB9KTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgR2VtaW5pIFx1QzY5NFx1Q0NBRCBcdUMyRTRcdUQzMjg6ICR7bWVzc2FnZX1gKTtcbiAgICB9XG5cbiAgICBjb25zdCBzdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgaWYgKHN0YXR1cyAmJiBzdGF0dXMgPj0gNDAwKSB7XG4gICAgICBhd2FpdCB0aGlzLmxvZyhcImdlbWluaSByZXNwb25zZSBlcnJvclwiLCB7XG4gICAgICAgIG1vZGVsOiBtb2RlbE5hbWUsXG4gICAgICAgIGJvZHk6IHBheWxvYWQsXG4gICAgICAgIHN0YXR1cyxcbiAgICAgICAgcmVzcG9uc2U6IHJlc3BvbnNlLnRleHRcbiAgICAgIH0pO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBHZW1pbmkgQVBJIFx1QzYyNFx1Qjk1ODogJHtzdGF0dXN9YCk7XG4gICAgfVxuXG4gICAgY29uc3QgZGF0YSA9IHRoaXMucGFyc2VKc29uUmVzcG9uc2UocmVzcG9uc2UudGV4dCwgcmVzcG9uc2UuanNvbik7XG4gICAgY29uc3QgdGV4dCA9XG4gICAgICAoZGF0YSBhcyB7IHRleHQ/OiBzdHJpbmcgfSk/LnRleHQgPz9cbiAgICAgIChkYXRhIGFzIHsgY2FuZGlkYXRlcz86IEFycmF5PHsgY29udGVudD86IHsgcGFydHM/OiBBcnJheTx7IHRleHQ/OiBzdHJpbmcgfT4gfSB9PiB9KVxuICAgICAgICA/LmNhbmRpZGF0ZXM/LlswXT8uY29udGVudD8ucGFydHNcbiAgICAgICAgPy5tYXAoKHBhcnQpID0+IHBhcnQudGV4dCA/PyBcIlwiKVxuICAgICAgICAuam9pbihcIlwiKVxuICAgICAgICAudHJpbSgpID8/XG4gICAgICBcIlwiO1xuXG4gICAgaWYgKCF0ZXh0KSB7XG4gICAgICBhd2FpdCB0aGlzLmxvZyhcImdlbWluaSByZXNwb25zZSBpbnZhbGlkXCIsIHsgbW9kZWw6IG1vZGVsTmFtZSwgcmVzcG9uc2U6IGRhdGEgfSk7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJcdUM3NTFcdUIyRjUgXHVENjE1XHVDMkREXHVDNzc0IFx1QzYyQ1x1QkMxNFx1Qjk3NFx1QzlDMCBcdUM1NEFcdUMyQjVcdUIyQzhcdUIyRTQuXCIpO1xuICAgIH1cblxuICAgIHJldHVybiB0ZXh0O1xuICB9XG5cbiAgcHJpdmF0ZSBidWlsZE9wZW5BaU1lc3NhZ2VzKFxuICAgIHNldHRpbmdzOiBPdmxTZXR0aW5ncyxcbiAgICB0dXJuczogQ29udmVyc2F0aW9uVHVybltdXG4gICk6IEFycmF5PHsgcm9sZTogc3RyaW5nOyBjb250ZW50OiBzdHJpbmcgfT4ge1xuICAgIGNvbnN0IG1lc3NhZ2VzID0gW10gYXMgQXJyYXk8eyByb2xlOiBzdHJpbmc7IGNvbnRlbnQ6IHN0cmluZyB9PjtcbiAgICBjb25zdCBzeXN0ZW1Qcm9tcHQgPSBzZXR0aW5ncy5zeXN0ZW1Qcm9tcHQudHJpbSgpO1xuICAgIGlmIChzeXN0ZW1Qcm9tcHQpIHtcbiAgICAgIG1lc3NhZ2VzLnB1c2goeyByb2xlOiBcInN5c3RlbVwiLCBjb250ZW50OiBzeXN0ZW1Qcm9tcHQgfSk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgdHVybiBvZiB0dXJucykge1xuICAgICAgbWVzc2FnZXMucHVzaCh7IHJvbGU6IHR1cm4ucm9sZSwgY29udGVudDogdHVybi5jb250ZW50IH0pO1xuICAgIH1cbiAgICByZXR1cm4gbWVzc2FnZXM7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlSnNvblJlc3BvbnNlKHRleHQ6IHN0cmluZywganNvbj86IHVua25vd24pOiB1bmtub3duIHtcbiAgICBpZiAoanNvbikge1xuICAgICAgcmV0dXJuIGpzb247XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gSlNPTi5wYXJzZSh0ZXh0KTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkFQSSBcdUM3NTFcdUIyRjVcdUM3NDQgXHVENTc0XHVDMTFEXHVENTYwIFx1QzIxOCBcdUM1QzZcdUMyQjVcdUIyQzhcdUIyRTQuXCIpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgbG9nKGNvbnRleHQ6IHN0cmluZywgZGV0YWlsOiB1bmtub3duKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5sb2dXcml0ZXIoY29udGV4dCwgZGV0YWlsKTtcbiAgfVxufVxuIiwgImV4cG9ydCB0eXBlIEFwaVByb3ZpZGVyID0gXCJnZW1pbmlcIiB8IFwib3BlbmFpXCIgfCBcIm9sbGFtYVwiIHwgXCJjdXN0b21cIjtcbmV4cG9ydCB0eXBlIEVtYmVkZGluZ1Byb3ZpZGVyID0gXCJnZW1pbmlcIiB8IFwib3BlbmFpXCIgfCBcImxvY2FsXCIgfCBcImN1c3RvbVwiO1xuXG5leHBvcnQgdHlwZSBPdmxTZXR0aW5ncyA9IHtcbiAgcHJvdmlkZXI6IEFwaVByb3ZpZGVyO1xuICBhcGlVcmw6IHN0cmluZztcbiAgYXBpS2V5OiBzdHJpbmc7XG4gIG1vZGVsOiBzdHJpbmc7XG4gIHN5c3RlbVByb21wdDogc3RyaW5nO1xuICBkZWZhdWx0T3V0cHV0Rm9sZGVyOiBzdHJpbmc7XG4gIC8vIFx1Qzc3OFx1QjM3MVx1QzJGMSBcdUMxMjRcdUM4MTVcbiAgaW5kZXhpbmdFbmFibGVkOiBib29sZWFuO1xuICBjaHVua1NpemU6IG51bWJlcjtcbiAgY2h1bmtPdmVybGFwOiBudW1iZXI7XG4gIHRvcEs6IG51bWJlcjtcbiAgLy8gXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzEyNFx1QzgxNVxuICBlbWJlZGRpbmdQcm92aWRlcjogRW1iZWRkaW5nUHJvdmlkZXI7XG4gIGVtYmVkZGluZ0FwaUtleTogc3RyaW5nO1xuICBlbWJlZGRpbmdNb2RlbDogc3RyaW5nO1xufTtcblxuZXhwb3J0IGNvbnN0IFBST1ZJREVSX1BSRVNFVFM6IFJlY29yZDxBcGlQcm92aWRlciwgeyBhcGlVcmw6IHN0cmluZzsgbW9kZWw6IHN0cmluZyB9PiA9IHtcbiAgZ2VtaW5pOiB7XG4gICAgYXBpVXJsOiBcImh0dHBzOi8vZ2VuZXJhdGl2ZWxhbmd1YWdlLmdvb2dsZWFwaXMuY29tL3YxYmV0YS9tb2RlbHMvZ2VtaW5pLTIuMC1mbGFzaC1leHA6Z2VuZXJhdGVDb250ZW50XCIsXG4gICAgbW9kZWw6IFwiZ2VtaW5pLTIuMC1mbGFzaC1leHBcIlxuICB9LFxuICBvcGVuYWk6IHtcbiAgICBhcGlVcmw6IFwiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS92MS9jaGF0L2NvbXBsZXRpb25zXCIsXG4gICAgbW9kZWw6IFwiZ3B0LTRvLW1pbmlcIlxuICB9LFxuICBvbGxhbWE6IHtcbiAgICBhcGlVcmw6IFwiaHR0cDovL2xvY2FsaG9zdDoxMTQzNC92MS9jaGF0L2NvbXBsZXRpb25zXCIsXG4gICAgbW9kZWw6IFwibGxhbWEzLjFcIlxuICB9LFxuICBjdXN0b206IHtcbiAgICBhcGlVcmw6IFwiXCIsXG4gICAgbW9kZWw6IFwiXCJcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IEVNQkVERElOR19QUkVTRVRTOiBSZWNvcmQ8RW1iZWRkaW5nUHJvdmlkZXIsIHsgbW9kZWw6IHN0cmluZzsgYXBpVXJsPzogc3RyaW5nIH0+ID0ge1xuICBnZW1pbmk6IHtcbiAgICBtb2RlbDogXCJ0ZXh0LWVtYmVkZGluZy0wMDRcIixcbiAgICBhcGlVcmw6IFwiaHR0cHM6Ly9nZW5lcmF0aXZlbGFuZ3VhZ2UuZ29vZ2xlYXBpcy5jb20vdjFiZXRhL21vZGVsc1wiXG4gIH0sXG4gIG9wZW5haToge1xuICAgIG1vZGVsOiBcInRleHQtZW1iZWRkaW5nLTMtc21hbGxcIixcbiAgICBhcGlVcmw6IFwiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS92MS9lbWJlZGRpbmdzXCJcbiAgfSxcbiAgbG9jYWw6IHtcbiAgICBtb2RlbDogXCJYZW5vdmEvYWxsLU1pbmlMTS1MNi12MlwiXG4gIH0sXG4gIGN1c3RvbToge1xuICAgIG1vZGVsOiBcIlwiXG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX1NFVFRJTkdTOiBPdmxTZXR0aW5ncyA9IHtcbiAgcHJvdmlkZXI6IFwiZ2VtaW5pXCIsXG4gIGFwaVVybDogUFJPVklERVJfUFJFU0VUUy5nZW1pbmkuYXBpVXJsLFxuICBhcGlLZXk6IFwiXCIsXG4gIG1vZGVsOiBQUk9WSURFUl9QUkVTRVRTLmdlbWluaS5tb2RlbCxcbiAgc3lzdGVtUHJvbXB0OiBcIlwiLFxuICBkZWZhdWx0T3V0cHV0Rm9sZGVyOiBcIlwiLFxuICAvLyBcdUM3NzhcdUIzNzFcdUMyRjEgXHVBRTMwXHVCQ0Y4IFx1QzEyNFx1QzgxNVxuICBpbmRleGluZ0VuYWJsZWQ6IGZhbHNlLFxuICBjaHVua1NpemU6IDQwMCxcbiAgY2h1bmtPdmVybGFwOiA1MCxcbiAgdG9wSzogOCxcbiAgLy8gXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QUUzMFx1QkNGOCBcdUMxMjRcdUM4MTUgKEdlbWluaSlcbiAgZW1iZWRkaW5nUHJvdmlkZXI6IFwiZ2VtaW5pXCIsXG4gIGVtYmVkZGluZ0FwaUtleTogXCJcIixcbiAgZW1iZWRkaW5nTW9kZWw6IEVNQkVERElOR19QUkVTRVRTLmdlbWluaS5tb2RlbCxcbn07XG4iLCAiaW1wb3J0IHR5cGUgeyBBcHAsIFBsdWdpbk1hbmlmZXN0IH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyBub3JtYWxpemVQYXRoIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQbHVnaW5Mb2dQYXRoKGFwcDogQXBwLCBtYW5pZmVzdD86IFBsdWdpbk1hbmlmZXN0KTogc3RyaW5nIHtcbiAgY29uc3QgcGx1Z2luSWQgPSBtYW5pZmVzdD8uaWQgPz8gXCJvYnNpZGlhbi12YXVsdC1sbG1cIjtcbiAgcmV0dXJuIG5vcm1hbGl6ZVBhdGgoYCR7YXBwLnZhdWx0LmNvbmZpZ0Rpcn0vcGx1Z2lucy8ke3BsdWdpbklkfS9sb2cudHh0YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhcHBlbmRFcnJvckxvZyhcbiAgYXBwOiBBcHAsXG4gIG1hbmlmZXN0OiBQbHVnaW5NYW5pZmVzdCB8IHVuZGVmaW5lZCxcbiAgY29udGV4dDogc3RyaW5nLFxuICBkZXRhaWw6IHVua25vd25cbik6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBsb2dQYXRoID0gZ2V0UGx1Z2luTG9nUGF0aChhcHAsIG1hbmlmZXN0KTtcbiAgY29uc3QgdGltZXN0YW1wID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuICBjb25zdCBkZXRhaWxUZXh0ID0gdG9TYWZlU3RyaW5nKGRldGFpbCk7XG4gIGNvbnN0IGVudHJ5ID0gYFxcblske3RpbWVzdGFtcH1dICR7Y29udGV4dH1cXG4ke2RldGFpbFRleHR9XFxuYDtcblxuICB0cnkge1xuICAgIGNvbnN0IGV4aXN0cyA9IGF3YWl0IGFwcC52YXVsdC5hZGFwdGVyLmV4aXN0cyhsb2dQYXRoKTtcbiAgICBpZiAoZXhpc3RzKSB7XG4gICAgICBjb25zdCBjdXJyZW50ID0gYXdhaXQgYXBwLnZhdWx0LmFkYXB0ZXIucmVhZChsb2dQYXRoKTtcbiAgICAgIGF3YWl0IGFwcC52YXVsdC5hZGFwdGVyLndyaXRlKGxvZ1BhdGgsIGAke2N1cnJlbnR9JHtlbnRyeX1gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXdhaXQgYXBwLnZhdWx0LmFkYXB0ZXIud3JpdGUobG9nUGF0aCwgZW50cnkudHJpbVN0YXJ0KCkpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIHdyaXRlIHBsdWdpbiBsb2dcIiwgZXJyb3IpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHRvU2FmZVN0cmluZyhkZXRhaWw6IHVua25vd24pOiBzdHJpbmcge1xuICBpZiAoZGV0YWlsID09PSBudWxsIHx8IGRldGFpbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIFN0cmluZyhkZXRhaWwpO1xuICB9XG4gIGlmICh0eXBlb2YgZGV0YWlsID09PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIGRldGFpbDtcbiAgfVxuICBpZiAoZGV0YWlsIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICByZXR1cm4gZGV0YWlsLnN0YWNrID8/IGRldGFpbC5tZXNzYWdlO1xuICB9XG4gIHRyeSB7XG4gICAgY29uc3Qgc2VlbiA9IG5ldyBXZWFrU2V0PG9iamVjdD4oKTtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoXG4gICAgICBkZXRhaWwsXG4gICAgICAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgaWYgKHNlZW4uaGFzKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIFwiW1x1QzIxQ1x1RDY1OCBcdUNDMzhcdUM4NzBdXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNlZW4uYWRkKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9LFxuICAgICAgMlxuICAgICk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc3QgbWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKTtcbiAgICByZXR1cm4gYFx1QzlDMVx1QjgyQ1x1RDY1NCBcdUMyRTRcdUQzMjg6ICR7bWVzc2FnZX1gO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgTW9kYWwgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB0eXBlIHsgUGx1Z2luIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5cbmV4cG9ydCB0eXBlIFNhdmVDb252ZXJzYXRpb25Gb3JtID0ge1xuICBpbnB1dFBhdGg6IHN0cmluZztcbiAgc2Vzc2lvbklkOiBzdHJpbmc7XG4gIG91dHB1dEZvbGRlcjogc3RyaW5nO1xufTtcblxuZXhwb3J0IGNsYXNzIFNhdmVDb252ZXJzYXRpb25Nb2RhbCBleHRlbmRzIE1vZGFsIHtcbiAgcHJpdmF0ZSByZWFkb25seSBvblN1Ym1pdDogKHZhbHVlOiBTYXZlQ29udmVyc2F0aW9uRm9ybSkgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3RvcihwbHVnaW46IFBsdWdpbiwgb25TdWJtaXQ6ICh2YWx1ZTogU2F2ZUNvbnZlcnNhdGlvbkZvcm0pID0+IHZvaWQpIHtcbiAgICBzdXBlcihwbHVnaW4uYXBwKTtcbiAgICB0aGlzLm9uU3VibWl0ID0gb25TdWJtaXQ7XG4gIH1cblxuICBvbk9wZW4oKTogdm9pZCB7XG4gICAgY29uc3QgeyBjb250ZW50RWwgfSA9IHRoaXM7XG4gICAgY29udGVudEVsLmVtcHR5KCk7XG5cbiAgICBjb250ZW50RWwuY3JlYXRlRWwoXCJoMlwiLCB7IHRleHQ6IFwiXHVCMzAwXHVENjU0IEpTT04gXHVDODAwXHVDN0E1XCIgfSk7XG5cbiAgICBjb25zdCBpbnB1dFBhdGhFbCA9IGNvbnRlbnRFbC5jcmVhdGVFbChcImlucHV0XCIsIHsgdHlwZTogXCJ0ZXh0XCIgfSk7XG4gICAgaW5wdXRQYXRoRWwucGxhY2Vob2xkZXIgPSBcIkpTT04gXHVEMzBDXHVDNzdDIFx1QUNCRFx1Qjg1QyAoXHVCQ0ZDXHVEMkI4IFx1QUUzMFx1QzkwMClcIjtcblxuICAgIGNvbnN0IHNlc3Npb25JZEVsID0gY29udGVudEVsLmNyZWF0ZUVsKFwiaW5wdXRcIiwgeyB0eXBlOiBcInRleHRcIiB9KTtcbiAgICBzZXNzaW9uSWRFbC5wbGFjZWhvbGRlciA9IFwiXHVDMTM4XHVDMTU4IElEXCI7XG5cbiAgICBjb25zdCBvdXRwdXRGb2xkZXJFbCA9IGNvbnRlbnRFbC5jcmVhdGVFbChcImlucHV0XCIsIHsgdHlwZTogXCJ0ZXh0XCIgfSk7XG4gICAgb3V0cHV0Rm9sZGVyRWwucGxhY2Vob2xkZXIgPSBcIlx1QzgwMFx1QzdBNSBcdUQzRjRcdUIzNTQgKFx1QzEyMFx1RDBERCwgXHVCQ0ZDXHVEMkI4IFx1QUUzMFx1QzkwMClcIjtcblxuICAgIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGNvbnRlbnRFbC5jcmVhdGVFbChcImJ1dHRvblwiLCB7IHRleHQ6IFwiXHVDODAwXHVDN0E1XCIgfSk7XG4gICAgc3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLm9uU3VibWl0KHtcbiAgICAgICAgaW5wdXRQYXRoOiBpbnB1dFBhdGhFbC52YWx1ZS50cmltKCksXG4gICAgICAgIHNlc3Npb25JZDogc2Vzc2lvbklkRWwudmFsdWUudHJpbSgpLFxuICAgICAgICBvdXRwdXRGb2xkZXI6IG91dHB1dEZvbGRlckVsLnZhbHVlLnRyaW0oKVxuICAgICAgfSk7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfSk7XG4gIH1cbn1cbiIsICJpbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvblR1cm4gfSBmcm9tIFwiLi9jb252ZXJzYXRpb25cIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVHVybnMoY29udGVudDogc3RyaW5nKTogQ29udmVyc2F0aW9uVHVybltdIHtcbiAgbGV0IGRhdGE6IHVua25vd247XG4gIHRyeSB7XG4gICAgZGF0YSA9IEpTT04ucGFyc2UoY29udGVudCk7XG4gIH0gY2F0Y2gge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkpTT04gXHVENjE1XHVDMkREXHVDNzc0IFx1QzYyQ1x1QkMxNFx1Qjk3NFx1QzlDMCBcdUM1NEFcdUMyQjVcdUIyQzhcdUIyRTQuXCIpO1xuICB9XG5cbiAgaWYgKCFBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSlNPTlx1Qzc0MCBcdUJDMzBcdUM1RjRcdUM3NzRcdUM1QjRcdUM1N0MgXHVENTY5XHVCMkM4XHVCMkU0LlwiKTtcbiAgfVxuXG4gIHJldHVybiBkYXRhLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICBpZiAoIWl0ZW0gfHwgdHlwZW9mIGl0ZW0gIT09IFwib2JqZWN0XCIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgXHVDNzk4XHVCQUJCXHVCNDFDIFx1RDU2RFx1QkFBOTogJHtpbmRleCArIDF9XHVCQzg4XHVDOUY4YCk7XG4gICAgfVxuXG4gICAgY29uc3Qgcm9sZSA9IChpdGVtIGFzIHsgcm9sZT86IHN0cmluZyB9KS5yb2xlO1xuICAgIGNvbnN0IGNvbnRlbnRWYWx1ZSA9IChpdGVtIGFzIHsgY29udGVudD86IHN0cmluZyB9KS5jb250ZW50O1xuICAgIGNvbnN0IHRpbWVzdGFtcFZhbHVlID0gKGl0ZW0gYXMgeyB0aW1lc3RhbXA/OiBzdHJpbmcgfSkudGltZXN0YW1wO1xuXG4gICAgaWYgKHJvbGUgIT09IFwidXNlclwiICYmIHJvbGUgIT09IFwiYXNzaXN0YW50XCIgJiYgcm9sZSAhPT0gXCJzeXN0ZW1cIikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGByb2xlXHVDNzc0IFx1QzYyQ1x1QkMxNFx1Qjk3NFx1QzlDMCBcdUM1NEFcdUMyQjVcdUIyQzhcdUIyRTQ6ICR7aW5kZXggKyAxfVx1QkM4OFx1QzlGOGApO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGNvbnRlbnRWYWx1ZSAhPT0gXCJzdHJpbmdcIiB8fCAhY29udGVudFZhbHVlLnRyaW0oKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBjb250ZW50XHVBQzAwIFx1QzYyQ1x1QkMxNFx1Qjk3NFx1QzlDMCBcdUM1NEFcdUMyQjVcdUIyQzhcdUIyRTQ6ICR7aW5kZXggKyAxfVx1QkM4OFx1QzlGOGApO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICByb2xlLFxuICAgICAgY29udGVudDogY29udGVudFZhbHVlLFxuICAgICAgdGltZXN0YW1wOiB0aW1lc3RhbXBWYWx1ZVxuICAgIH07XG4gIH0pO1xufVxuIiwgImltcG9ydCB7IE5vdGljZSwgUGx1Z2luLCBQbHVnaW5TZXR0aW5nVGFiLCBTZXR0aW5nLCByZXF1ZXN0VXJsIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgdHlwZSB7IEFwaVByb3ZpZGVyLCBPdmxTZXR0aW5ncywgRW1iZWRkaW5nUHJvdmlkZXIgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgUFJPVklERVJfUFJFU0VUUywgRU1CRURESU5HX1BSRVNFVFMgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQgdHlwZSBTZXR0aW5nc0hvc3QgPSBQbHVnaW4gJiB7XG4gIHNldHRpbmdzOiBPdmxTZXR0aW5ncztcbiAgc2F2ZVNldHRpbmdzOiAoKSA9PiBQcm9taXNlPHZvaWQ+O1xufTtcblxuZXhwb3J0IGNsYXNzIE92bFNldHRpbmdUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcbiAgcHJpdmF0ZSByZWFkb25seSBwbHVnaW46IFNldHRpbmdzSG9zdDtcbiAgcHJpdmF0ZSBnZW1pbmlNb2RlbHM6IHN0cmluZ1tdID0gW107XG5cbiAgY29uc3RydWN0b3IocGx1Z2luOiBTZXR0aW5nc0hvc3QpIHtcbiAgICBzdXBlcihwbHVnaW4uYXBwLCBwbHVnaW4pO1xuICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xuICB9XG5cbiAgZGlzcGxheSgpOiB2b2lkIHtcbiAgICBjb25zdCB7IGNvbnRhaW5lckVsIH0gPSB0aGlzO1xuICAgIGNvbnRhaW5lckVsLmVtcHR5KCk7XG5cbiAgICBjb250YWluZXJFbC5jcmVhdGVFbChcImgyXCIsIHsgdGV4dDogXCJPVkwgXHVDMTI0XHVDODE1XCIgfSk7XG5cbiAgICBsZXQgYXBpVXJsSW5wdXQ6IHsgc2V0VmFsdWU6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkIH0gfCBudWxsID0gbnVsbDtcbiAgICBsZXQgbW9kZWxJbnB1dDogeyBzZXRWYWx1ZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQgfSB8IG51bGwgPSBudWxsO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIkFQSSBcdUM4MUNcdUFDRjVcdUMwQUNcIilcbiAgICAgIC5zZXREZXNjKFwiXHVDMEFDXHVDNkE5XHVENTYwIEFQSSBcdUM4MUNcdUFDRjVcdUMwQUNcdUI5N0MgXHVDMTIwXHVEMEREXHVENTU4XHVDMTM4XHVDNjk0LiAoT2xsYW1hIFx1RDNFQ1x1RDU2OClcIilcbiAgICAgIC5hZGREcm9wZG93bigoZHJvcGRvd24pID0+IHtcbiAgICAgICAgZHJvcGRvd25cbiAgICAgICAgICAuYWRkT3B0aW9ucyh7XG4gICAgICAgICAgICBnZW1pbmk6IFwiR29vZ2xlIEdlbWluaVwiLFxuICAgICAgICAgICAgb3BlbmFpOiBcIk9wZW5BSSBcdUQ2MzhcdUQ2NThcIixcbiAgICAgICAgICAgIG9sbGFtYTogXCJPbGxhbWEgKFx1Qjg1Q1x1Q0VFQylcIixcbiAgICAgICAgICAgIGN1c3RvbTogXCJcdUMwQUNcdUM2QTlcdUM3OTAgXHVDOUMwXHVDODE1XCJcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5wcm92aWRlcilcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHZhbHVlIGFzIEFwaVByb3ZpZGVyO1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MucHJvdmlkZXIgPSBwcm92aWRlcjtcbiAgICAgICAgICAgIGNvbnN0IHByZXNldCA9IFBST1ZJREVSX1BSRVNFVFNbcHJvdmlkZXJdO1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuYXBpVXJsID0gcHJlc2V0LmFwaVVybDtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLm1vZGVsID0gcHJlc2V0Lm1vZGVsO1xuICAgICAgICAgICAgYXBpVXJsSW5wdXQ/LnNldFZhbHVlKHByZXNldC5hcGlVcmwpO1xuICAgICAgICAgICAgbW9kZWxJbnB1dD8uc2V0VmFsdWUocHJlc2V0Lm1vZGVsKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5KCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJBUEkgVVJMXCIpXG4gICAgICAuc2V0RGVzYyhcIlx1QzgxQ1x1QUNGNVx1QzBBQ1x1QkNDNCBcdUNDNDRcdUQzMDUgXHVDNUQ0XHVCNERDXHVEM0VDXHVDNzc4XHVEMkI4IFVSTFwiKVxuICAgICAgLmFkZFRleHQoKHRleHQpID0+IHtcbiAgICAgICAgYXBpVXJsSW5wdXQgPSB0ZXh0O1xuICAgICAgICB0ZXh0XG4gICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiaHR0cDovL2xvY2FsaG9zdDoxMTQzNC92MS9jaGF0L2NvbXBsZXRpb25zXCIpXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmFwaVVybClcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5hcGlVcmwgPSB2YWx1ZS50cmltKCk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIkFQSSBcdUQwQTRcIilcbiAgICAgIC5zZXREZXNjKFwiXHVENTQ0XHVDNjk0XHVENTVDIFx1QUNCRFx1QzZCMCBCZWFyZXIgXHVEMUEwXHVEMDcwIFx1QjYxMFx1QjI5NCBcdUM4MUNcdUFDRjVcdUMwQUMgXHVEMEE0XHVCOTdDIFx1Qzc4NVx1QjgyNVx1RDU1OFx1QzEzOFx1QzY5NC5cIilcbiAgICAgIC5hZGRUZXh0KCh0ZXh0KSA9PlxuICAgICAgICB0ZXh0XG4gICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiXHVDMTIwXHVEMEREXCIpXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmFwaUtleSlcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5hcGlLZXkgPSB2YWx1ZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgaWYgKHRoaXMucGx1Z2luLnNldHRpbmdzLnByb3ZpZGVyID09PSBcImdlbWluaVwiKSB7XG4gICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgLnNldE5hbWUoXCJHZW1pbmkgXHVCQUE4XHVCMzc4IFx1QkFBOVx1Qjg1RFwiKVxuICAgICAgICAuc2V0RGVzYyhcIkdvb2dsZVx1QzVEMFx1QzExQyBcdUM4MUNcdUFDRjVcdUQ1NThcdUIyOTQgXHVCQUE4XHVCMzc4XHVDNzQ0IFx1QkQ4OFx1QjdFQ1x1QzY0MCBcdUMxMjBcdUQwRERcdUQ1NjAgXHVDMjE4IFx1Qzc4OFx1QzJCNVx1QjJDOFx1QjJFNC5cIilcbiAgICAgICAgLmFkZEJ1dHRvbigoYnV0dG9uKSA9PiB7XG4gICAgICAgICAgYnV0dG9uLnNldEJ1dHRvblRleHQoXCJcdUJBQTlcdUI4NUQgXHVCRDg4XHVCN0VDXHVDNjI0XHVBRTMwXCIpLm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5sb2FkR2VtaW5pTW9kZWxzKCk7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgIGlmICh0aGlzLmdlbWluaU1vZGVscy5sZW5ndGggPiAwKSB7XG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgIC5zZXROYW1lKFwiR2VtaW5pIFx1QkFBOFx1QjM3OCBcdUMxMjBcdUQwRERcIilcbiAgICAgICAgICAuc2V0RGVzYyhcIlx1QkFBOVx1Qjg1RFx1QzVEMCBcdUM1QzZcdUIyOTQgXHVCQUE4XHVCMzc4XHVDNzQwIFx1QzU0NFx1Qjc5OFx1QzVEMFx1QzExQyBcdUM5QzFcdUM4MTEgXHVDNzg1XHVCODI1XHVENTU4XHVDMTM4XHVDNjk0LlwiKVxuICAgICAgICAgIC5hZGREcm9wZG93bigoZHJvcGRvd24pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmdlbWluaU1vZGVscy5yZWR1Y2U8UmVjb3JkPHN0cmluZywgc3RyaW5nPj4oXG4gICAgICAgICAgICAgIChhY2MsIG5hbWUpID0+IHtcbiAgICAgICAgICAgICAgICBhY2NbbmFtZV0gPSBuYW1lO1xuICAgICAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgZHJvcGRvd25cbiAgICAgICAgICAgICAgLmFkZE9wdGlvbnMob3B0aW9ucylcbiAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLm1vZGVsKVxuICAgICAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MubW9kZWwgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBtb2RlbElucHV0Py5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJcdUJBQThcdUIzNzhcIilcbiAgICAgIC5zZXREZXNjKFwiXHVDODFDXHVBQ0Y1XHVDMEFDXHVCQ0M0IFx1QkFBOFx1QjM3OCBcdUM3NzRcdUI5ODQgKFx1QzlDMVx1QzgxMSBcdUM3ODVcdUI4MjUgXHVBQzAwXHVCMkE1KVwiKVxuICAgICAgLmFkZFRleHQoKHRleHQpID0+IHtcbiAgICAgICAgbW9kZWxJbnB1dCA9IHRleHQ7XG4gICAgICAgIHRleHRcbiAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCJncHQtNG8tbWluaVwiKVxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5tb2RlbClcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5tb2RlbCA9IHZhbHVlLnRyaW0oKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiXHVDMkRDXHVDMkE0XHVEMTVDIFx1RDUwNFx1Qjg2Q1x1RDUwNFx1RDJCOFwiKVxuICAgICAgLnNldERlc2MoXCJcdUJBQThcdUI0RTAgXHVDNjk0XHVDQ0FEXHVDNUQwIFx1RDNFQ1x1RDU2OFx1QjQyMCBcdUMyRENcdUMyQTRcdUQxNUMgXHVCQTU0XHVDMkRDXHVDOUMwXCIpXG4gICAgICAuYWRkVGV4dEFyZWEoKHRleHQpID0+XG4gICAgICAgIHRleHRcbiAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCJcdUM2MDg6IFx1QjEwOFx1QjI5NCBPYnNpZGlhbiBcdUI5QUNcdUMxMUNcdUNFNTggXHVDNUI0XHVDMkRDXHVDMkE0XHVEMTM0XHVEMkI4XHVCMkU0LlwiKVxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5zeXN0ZW1Qcm9tcHQpXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3Muc3lzdGVtUHJvbXB0ID0gdmFsdWU7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICB9KVxuICAgICAgKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJcdUFFMzBcdUJDRjggXHVDODAwXHVDN0E1IFx1RDNGNFx1QjM1NFwiKVxuICAgICAgLnNldERlc2MoXCJcdUIzMDBcdUQ2NTRcdUI5N0MgXHVDODAwXHVDN0E1XHVENTYwIFx1QUUzMFx1QkNGOCBcdUQzRjRcdUIzNTQgKFx1QkNGQ1x1RDJCOCBcdUFFMzBcdUM5MDApXCIpXG4gICAgICAuYWRkVGV4dCgodGV4dCkgPT5cbiAgICAgICAgdGV4dFxuICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcIlx1QzYwODogQ29udmVyc2F0aW9uc1wiKVxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5kZWZhdWx0T3V0cHV0Rm9sZGVyKVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmRlZmF1bHRPdXRwdXRGb2xkZXIgPSB2YWx1ZS50cmltKCk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICB9KVxuICAgICAgKTtcblxuICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDNcIiwgeyB0ZXh0OiBcIlx1Qzc3OFx1QjM3MVx1QzJGMSBcdUJDMEYgXHVBQzgwXHVDMEM5IFx1QzEyNFx1QzgxNVwiIH0pO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIlx1Qzc3OFx1QjM3MVx1QzJGMSBcdUQ2NUNcdUMxMzFcdUQ2NTRcIilcbiAgICAgIC5zZXREZXNjKFwiXHVCQ0ZDXHVEMkI4IFx1RDMwQ1x1Qzc3Q1x1Qzc0NCBcdUM3NzhcdUIzNzFcdUMyRjFcdUQ1NThcdUM1RUMgXHVCQ0ExXHVEMTMwIFx1QUM4MFx1QzBDOVx1Qzc0NCBcdUQ2NUNcdUMxMzFcdUQ2NTRcdUQ1NjlcdUIyQzhcdUIyRTQuXCIpXG4gICAgICAuYWRkVG9nZ2xlKCh0b2dnbGUpID0+XG4gICAgICAgIHRvZ2dsZVxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5pbmRleGluZ0VuYWJsZWQpXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuaW5kZXhpbmdFbmFibGVkID0gdmFsdWU7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICB9KVxuICAgICAgKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJcdUNDQURcdUQwNkMgXHVEMDZDXHVBRTMwXCIpXG4gICAgICAuc2V0RGVzYyhcIlx1RDE0RFx1QzJBNFx1RDJCOFx1Qjk3QyBcdUJEODRcdUQ1NjBcdUQ1NjAgXHVCNTRDIFx1QUMwMSBcdUNDQURcdUQwNkNcdUM3NTggXHVDRDVDXHVCMzAwIFx1RDFBMFx1RDA3MCBcdUMyMTggKFx1QUUzMFx1QkNGODogNDAwKVwiKVxuICAgICAgLmFkZFRleHQoKHRleHQpID0+XG4gICAgICAgIHRleHRcbiAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCI0MDBcIilcbiAgICAgICAgICAuc2V0VmFsdWUoU3RyaW5nKHRoaXMucGx1Z2luLnNldHRpbmdzLmNodW5rU2l6ZSkpXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbnVtID0gcGFyc2VJbnQodmFsdWUpO1xuICAgICAgICAgICAgaWYgKCFpc05hTihudW0pICYmIG51bSA+IDApIHtcbiAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuY2h1bmtTaXplID0gbnVtO1xuICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJcdUNDQURcdUQwNkMgXHVDNjI0XHVCQzg0XHVCN0E5XCIpXG4gICAgICAuc2V0RGVzYyhcIlx1Qzc3OFx1QzgxMVx1RDU1QyBcdUNDQURcdUQwNkMgXHVBQzA0IFx1QzkxMVx1QkNGNVx1QjQxOFx1QjI5NCBcdUQxQTBcdUQwNzAgXHVDMjE4IChcdUFFMzBcdUJDRjg6IDUwKVwiKVxuICAgICAgLmFkZFRleHQoKHRleHQpID0+XG4gICAgICAgIHRleHRcbiAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCI1MFwiKVxuICAgICAgICAgIC5zZXRWYWx1ZShTdHJpbmcodGhpcy5wbHVnaW4uc2V0dGluZ3MuY2h1bmtPdmVybGFwKSlcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBudW0gPSBwYXJzZUludCh2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoIWlzTmFOKG51bSkgJiYgbnVtID49IDApIHtcbiAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuY2h1bmtPdmVybGFwID0gbnVtO1xuICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJcdUFDODBcdUMwQzkgXHVBQ0IwXHVBQ0ZDIFx1QzIxOCAoVG9wLUspXCIpXG4gICAgICAuc2V0RGVzYyhcIlx1QUM4MFx1QzBDOSBcdUMyREMgXHVCQzE4XHVENjU4XHVENTYwIFx1Q0Q1Q1x1QjMwMCBcdUFDQjBcdUFDRkMgXHVDMjE4IChcdUFFMzBcdUJDRjg6IDgpXCIpXG4gICAgICAuYWRkVGV4dCgodGV4dCkgPT5cbiAgICAgICAgdGV4dFxuICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcIjhcIilcbiAgICAgICAgICAuc2V0VmFsdWUoU3RyaW5nKHRoaXMucGx1Z2luLnNldHRpbmdzLnRvcEspKVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG51bSA9IHBhcnNlSW50KHZhbHVlKTtcbiAgICAgICAgICAgIGlmICghaXNOYU4obnVtKSAmJiBudW0gPiAwKSB7XG4gICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnRvcEsgPSBudW07XG4gICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJoM1wiLCB7IHRleHQ6IFwiXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzEyNFx1QzgxNVwiIH0pO1xuXG4gICAgbGV0IGVtYmVkZGluZ01vZGVsSW5wdXQ6IHsgc2V0VmFsdWU6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkIH0gfCBudWxsID0gbnVsbDtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJcdUM3ODRcdUJDQTBcdUI1MjkgXHVDODFDXHVBQ0Y1XHVDNzkwXCIpXG4gICAgICAuc2V0RGVzYyhcIlx1Qzc4NFx1QkNBMFx1QjUyOSBcdUMwRERcdUMxMzFcdUM1RDAgXHVDMEFDXHVDNkE5XHVENTYwIFx1QzgxQ1x1QUNGNVx1Qzc5MFx1Qjk3QyBcdUMxMjBcdUQwRERcdUQ1NThcdUMxMzhcdUM2OTRcIilcbiAgICAgIC5hZGREcm9wZG93bigoZHJvcGRvd24pID0+IHtcbiAgICAgICAgZHJvcGRvd25cbiAgICAgICAgICAuYWRkT3B0aW9ucyh7XG4gICAgICAgICAgICBnZW1pbmk6IFwiR29vZ2xlIEdlbWluaSAoQVBJKVwiLFxuICAgICAgICAgICAgb3BlbmFpOiBcIk9wZW5BSSAoQVBJKVwiLFxuICAgICAgICAgICAgbG9jYWw6IFwiXHVCODVDXHVDRUVDIFx1QkFBOFx1QjM3OCAoSHVnZ2luZ0ZhY2UpXCIsXG4gICAgICAgICAgICBjdXN0b206IFwiXHVDRUU0XHVDMkE0XHVEMTQwIEFQSVwiXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZW1iZWRkaW5nUHJvdmlkZXIpXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSB2YWx1ZSBhcyBFbWJlZGRpbmdQcm92aWRlcjtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmVtYmVkZGluZ1Byb3ZpZGVyID0gcHJvdmlkZXI7XG4gICAgICAgICAgICBjb25zdCBwcmVzZXQgPSBFTUJFRERJTkdfUFJFU0VUU1twcm92aWRlcl07XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbWJlZGRpbmdNb2RlbCA9IHByZXNldC5tb2RlbDtcbiAgICAgICAgICAgIGVtYmVkZGluZ01vZGVsSW5wdXQ/LnNldFZhbHVlKHByZXNldC5tb2RlbCk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICBpZiAodGhpcy5wbHVnaW4uc2V0dGluZ3MuZW1iZWRkaW5nUHJvdmlkZXIgIT09IFwibG9jYWxcIikge1xuICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgIC5zZXROYW1lKFwiXHVDNzg0XHVCQ0EwXHVCNTI5IEFQSSBcdUQwQTRcIilcbiAgICAgICAgLnNldERlc2MoXCJcdUM3ODRcdUJDQTBcdUI1MjkgQVBJIFx1RDBBNCAoXHVCRTQ0XHVDNUI0XHVDNzg4XHVDNzNDXHVCQTc0IExMTSBBUEkgXHVEMEE0IFx1QzBBQ1x1QzZBOSlcIilcbiAgICAgICAgLmFkZFRleHQoKHRleHQpID0+XG4gICAgICAgICAgdGV4dFxuICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiXHVDMTIwXHVEMEREXCIpXG4gICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZW1iZWRkaW5nQXBpS2V5KVxuICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbWJlZGRpbmdBcGlLZXkgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJcdUM3ODRcdUJDQTBcdUI1MjkgXHVCQUE4XHVCMzc4XCIpXG4gICAgICAuc2V0RGVzYyhcIlx1QzBBQ1x1QzZBOVx1RDU2MCBcdUM3ODRcdUJDQTBcdUI1MjkgXHVCQUE4XHVCMzc4XCIpXG4gICAgICAuYWRkVGV4dCgodGV4dCkgPT4ge1xuICAgICAgICBlbWJlZGRpbmdNb2RlbElucHV0ID0gdGV4dDtcbiAgICAgICAgdGV4dFxuICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcIlx1QkFBOFx1QjM3OFx1QkE4NVwiKVxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbWJlZGRpbmdNb2RlbClcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbWJlZGRpbmdNb2RlbCA9IHZhbHVlLnRyaW0oKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGxvYWRHZW1pbmlNb2RlbHMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgYXBpS2V5ID0gdGhpcy5wbHVnaW4uc2V0dGluZ3MuYXBpS2V5LnRyaW0oKTtcbiAgICBpZiAoIWFwaUtleSkge1xuICAgICAgbmV3IE5vdGljZShcIkdlbWluaSBBUEkgXHVEMEE0XHVCOTdDIFx1QkEzQ1x1QzgwMCBcdUM3ODVcdUI4MjVcdUQ1NzQgXHVDOEZDXHVDMTM4XHVDNjk0LlwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCByZXF1ZXN0VXJsKHtcbiAgICAgICAgdXJsOiBgaHR0cHM6Ly9nZW5lcmF0aXZlbGFuZ3VhZ2UuZ29vZ2xlYXBpcy5jb20vdjFiZXRhL21vZGVscz9rZXk9JHthcGlLZXl9YFxuICAgICAgfSk7XG4gICAgICBjb25zdCBkYXRhID0gcmVzcG9uc2UuanNvbiBhc1xuICAgICAgICB8IHsgbW9kZWxzPzogQXJyYXk8eyBuYW1lPzogc3RyaW5nOyBzdXBwb3J0ZWRHZW5lcmF0aW9uTWV0aG9kcz86IHN0cmluZ1tdIH0+IH1cbiAgICAgICAgfCB1bmRlZmluZWQ7XG4gICAgICBjb25zdCBtb2RlbHMgPSBkYXRhPy5tb2RlbHMgPz8gW107XG4gICAgICB0aGlzLmdlbWluaU1vZGVscyA9IG1vZGVsc1xuICAgICAgICAuZmlsdGVyKChtb2RlbCkgPT4gbW9kZWwuc3VwcG9ydGVkR2VuZXJhdGlvbk1ldGhvZHM/LmluY2x1ZGVzKFwiZ2VuZXJhdGVDb250ZW50XCIpKVxuICAgICAgICAubWFwKChtb2RlbCkgPT4gbW9kZWwubmFtZSlcbiAgICAgICAgLmZpbHRlcigobmFtZSk6IG5hbWUgaXMgc3RyaW5nID0+IEJvb2xlYW4obmFtZSkpO1xuXG4gICAgICBpZiAodGhpcy5nZW1pbmlNb2RlbHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIG5ldyBOb3RpY2UoXCJcdUMwQUNcdUM2QTkgXHVBQzAwXHVCMkE1XHVENTVDIEdlbWluaSBcdUJBQThcdUIzNzhcdUM3NDQgXHVDQzNFXHVDOUMwIFx1QkFCQlx1RDU4OFx1QzJCNVx1QjJDOFx1QjJFNC5cIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXcgTm90aWNlKFwiR2VtaW5pIFx1QkFBOFx1QjM3OCBcdUJBQTlcdUI4NURcdUM3NDQgXHVCRDg4XHVCN0VDXHVDNjU0XHVDMkI1XHVCMkM4XHVCMkU0LlwiKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKTtcbiAgICAgIG5ldyBOb3RpY2UoYEdlbWluaSBcdUJBQThcdUIzNzggXHVCQUE5XHVCODVEIFx1QzJFNFx1RDMyODogJHttZXNzYWdlfWApO1xuICAgIH1cbiAgfVxufVxuIiwgImltcG9ydCB7IEl0ZW1WaWV3LCBOb3RpY2UsIFdvcmtzcGFjZUxlYWYgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHVybiB9IGZyb20gXCIuLi9jb252ZXJzYXRpb25cIjtcbmltcG9ydCB0eXBlIHsgUGx1Z2luQ2hhdEFwaSB9IGZyb20gXCIuLi9wbHVnaW5BcGlcIjtcblxuZXhwb3J0IGNvbnN0IFZJRVdfVFlQRV9PVkxfQ0hBVCA9IFwib3ZsLWNoYXQtdmlld1wiO1xuXG5leHBvcnQgY2xhc3MgQ2hhdFZpZXcgZXh0ZW5kcyBJdGVtVmlldyB7XG4gIHByaXZhdGUgcmVhZG9ubHkgcGx1Z2luOiBQbHVnaW5DaGF0QXBpO1xuICBwcml2YXRlIG1lc3NhZ2VzOiBDb252ZXJzYXRpb25UdXJuW10gPSBbXTtcbiAgcHJpdmF0ZSBtZXNzYWdlc0VsOiBIVE1MRGl2RWxlbWVudCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGlucHV0RWw6IEhUTUxUZXh0QXJlYUVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBzZW5kQnV0dG9uRWw6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgc2F2ZUJ1dHRvbkVsOiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIHNlc3Npb25JZEVsOiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgdXNlUmFnQ2hlY2tib3g6IEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBzaG93U291cmNlc0NoZWNrYm94OiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IobGVhZjogV29ya3NwYWNlTGVhZiwgcGx1Z2luOiBQbHVnaW5DaGF0QXBpKSB7XG4gICAgc3VwZXIobGVhZik7XG4gICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XG4gIH1cblxuICBnZXRWaWV3VHlwZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBWSUVXX1RZUEVfT1ZMX0NIQVQ7XG4gIH1cblxuICBnZXREaXNwbGF5VGV4dCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBcIk9WTCBcdUIzMDBcdUQ2NTRcIjtcbiAgfVxuXG4gIGdldEljb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gXCJtZXNzYWdlLWNpcmNsZVwiO1xuICB9XG5cbiAgYXN5bmMgb25PcGVuKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHsgY29udGVudEVsIH0gPSB0aGlzO1xuICAgIGNvbnRlbnRFbC5lbXB0eSgpO1xuICAgIGNvbnRlbnRFbC5hZGRDbGFzcyhcIm92bC1jaGF0LXZpZXdcIik7XG5cbiAgICBjb25zdCBoZWFkZXJFbCA9IGNvbnRlbnRFbC5jcmVhdGVFbChcImRpdlwiLCB7IGNsczogXCJvdmwtY2hhdC1oZWFkZXJcIiB9KTtcbiAgICBoZWFkZXJFbC5jcmVhdGVFbChcImRpdlwiLCB7IGNsczogXCJvdmwtY2hhdC10aXRsZVwiLCB0ZXh0OiBcIk9WTCBcdUIzMDBcdUQ2NTRcIiB9KTtcblxuICAgIGNvbnN0IHNlc3Npb25XcmFwRWwgPSBoZWFkZXJFbC5jcmVhdGVFbChcImRpdlwiLCB7IGNsczogXCJvdmwtY2hhdC1zZXNzaW9uXCIgfSk7XG4gICAgc2Vzc2lvbldyYXBFbC5jcmVhdGVFbChcInNwYW5cIiwgeyB0ZXh0OiBcIlx1QzEzOFx1QzE1OFwiIH0pO1xuICAgIGNvbnN0IHNlc3Npb25JbnB1dEVsID0gc2Vzc2lvbldyYXBFbC5jcmVhdGVFbChcImlucHV0XCIsIHsgdHlwZTogXCJ0ZXh0XCIgfSk7XG4gICAgc2Vzc2lvbklucHV0RWwudmFsdWUgPSB0aGlzLmJ1aWxkU2Vzc2lvbklkKCk7XG4gICAgdGhpcy5zZXNzaW9uSWRFbCA9IHNlc3Npb25JbnB1dEVsO1xuXG4gICAgY29uc3QgY29udHJvbHNFbCA9IGhlYWRlckVsLmNyZWF0ZUVsKFwiZGl2XCIsIHsgY2xzOiBcIm92bC1jaGF0LWNvbnRyb2xzXCIgfSk7XG4gICAgXG4gICAgLy8gUkFHIFx1QzYzNVx1QzE1OFxuICAgIGNvbnN0IHJhZ1dyYXBFbCA9IGNvbnRyb2xzRWwuY3JlYXRlRWwoXCJkaXZcIiwgeyBjbHM6IFwib3ZsLXJhZy1vcHRpb25zXCIgfSk7XG4gICAgY29uc3QgdXNlUmFnTGFiZWwgPSByYWdXcmFwRWwuY3JlYXRlRWwoXCJsYWJlbFwiKTtcbiAgICBjb25zdCB1c2VSYWdDaGVja2JveCA9IHVzZVJhZ0xhYmVsLmNyZWF0ZUVsKFwiaW5wdXRcIiwgeyB0eXBlOiBcImNoZWNrYm94XCIgfSk7XG4gICAgdXNlUmFnQ2hlY2tib3guY2hlY2tlZCA9IHRydWU7XG4gICAgdXNlUmFnTGFiZWwuYXBwZW5kVGV4dChcIiBSQUcgXHVDMEFDXHVDNkE5XCIpO1xuICAgIHRoaXMudXNlUmFnQ2hlY2tib3ggPSB1c2VSYWdDaGVja2JveDtcblxuICAgIGNvbnN0IHNob3dTb3VyY2VzTGFiZWwgPSByYWdXcmFwRWwuY3JlYXRlRWwoXCJsYWJlbFwiKTtcbiAgICBjb25zdCBzaG93U291cmNlc0NoZWNrYm94ID0gc2hvd1NvdXJjZXNMYWJlbC5jcmVhdGVFbChcImlucHV0XCIsIHsgdHlwZTogXCJjaGVja2JveFwiIH0pO1xuICAgIHNob3dTb3VyY2VzQ2hlY2tib3guY2hlY2tlZCA9IGZhbHNlO1xuICAgIHNob3dTb3VyY2VzTGFiZWwuYXBwZW5kVGV4dChcIiBcdUMxOENcdUMyQTRcdUI5Q0MgXHVCQ0Y0XHVBRTMwXCIpO1xuICAgIHRoaXMuc2hvd1NvdXJjZXNDaGVja2JveCA9IHNob3dTb3VyY2VzQ2hlY2tib3g7XG5cbiAgICBjb25zdCBzYXZlQnV0dG9uRWwgPSBjb250cm9sc0VsLmNyZWF0ZUVsKFwiYnV0dG9uXCIsIHsgdGV4dDogXCJcdUM4MDBcdUM3QTVcIiB9KTtcbiAgICBzYXZlQnV0dG9uRWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIHZvaWQgdGhpcy5oYW5kbGVTYXZlKCk7XG4gICAgfSk7XG4gICAgdGhpcy5zYXZlQnV0dG9uRWwgPSBzYXZlQnV0dG9uRWw7XG5cbiAgICBjb25zdCBtZXNzYWdlc0VsID0gY29udGVudEVsLmNyZWF0ZUVsKFwiZGl2XCIsIHsgY2xzOiBcIm92bC1jaGF0LW1lc3NhZ2VzXCIgfSk7XG4gICAgdGhpcy5tZXNzYWdlc0VsID0gbWVzc2FnZXNFbDtcblxuICAgIGNvbnN0IGlucHV0V3JhcEVsID0gY29udGVudEVsLmNyZWF0ZUVsKFwiZGl2XCIsIHsgY2xzOiBcIm92bC1jaGF0LWlucHV0XCIgfSk7XG4gICAgY29uc3QgdGV4dGFyZWFFbCA9IGlucHV0V3JhcEVsLmNyZWF0ZUVsKFwidGV4dGFyZWFcIik7XG4gICAgdGV4dGFyZWFFbC5wbGFjZWhvbGRlciA9IFwiXHVCQTU0XHVDMkRDXHVDOUMwXHVCOTdDIFx1Qzc4NVx1QjgyNVx1RDU1OFx1QzEzOFx1QzY5NC4gKEN0cmwrRW50ZXIgXHVDODA0XHVDMUExKVwiO1xuICAgIHRoaXMuaW5wdXRFbCA9IHRleHRhcmVhRWw7XG5cbiAgICBjb25zdCBzZW5kQnV0dG9uRWwgPSBpbnB1dFdyYXBFbC5jcmVhdGVFbChcImJ1dHRvblwiLCB7IHRleHQ6IFwiXHVDODA0XHVDMUExXCIgfSk7XG4gICAgc2VuZEJ1dHRvbkVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB2b2lkIHRoaXMuaGFuZGxlU2VuZCgpO1xuICAgIH0pO1xuICAgIHRoaXMuc2VuZEJ1dHRvbkVsID0gc2VuZEJ1dHRvbkVsO1xuXG4gICAgdGV4dGFyZWFFbC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC5rZXkgPT09IFwiRW50ZXJcIiAmJiAoZXZlbnQuY3RybEtleSB8fCBldmVudC5tZXRhS2V5KSkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB2b2lkIHRoaXMuaGFuZGxlU2VuZCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBidWlsZFNlc3Npb25JZCgpOiBzdHJpbmcge1xuICAgIGNvbnN0IHN0YW1wID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnJlcGxhY2UoL1s6Ll0vZywgXCItXCIpO1xuICAgIHJldHVybiBgc2Vzc2lvbi0ke3N0YW1wfWA7XG4gIH1cblxuICBwcml2YXRlIHNldEJ1c3koaXNCdXN5OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc2VuZEJ1dHRvbkVsKSB7XG4gICAgICB0aGlzLnNlbmRCdXR0b25FbC5kaXNhYmxlZCA9IGlzQnVzeTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2F2ZUJ1dHRvbkVsKSB7XG4gICAgICB0aGlzLnNhdmVCdXR0b25FbC5kaXNhYmxlZCA9IGlzQnVzeTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaW5wdXRFbCkge1xuICAgICAgdGhpcy5pbnB1dEVsLmRpc2FibGVkID0gaXNCdXN5O1xuICAgIH1cbiAgICBpZiAoaXNCdXN5KSB7XG4gICAgICB0aGlzLmNvbnRlbnRFbC5hZGRDbGFzcyhcIm92bC1jaGF0LWJ1c3lcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29udGVudEVsLnJlbW92ZUNsYXNzKFwib3ZsLWNoYXQtYnVzeVwiKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFwcGVuZE1lc3NhZ2UodHVybjogQ29udmVyc2F0aW9uVHVybik6IHZvaWQge1xuICAgIHRoaXMubWVzc2FnZXMucHVzaCh0dXJuKTtcbiAgICBpZiAoIXRoaXMubWVzc2FnZXNFbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc3NhZ2VFbCA9IHRoaXMubWVzc2FnZXNFbC5jcmVhdGVFbChcImRpdlwiLCB7XG4gICAgICBjbHM6IGBvdmwtY2hhdC1tZXNzYWdlIG92bC1jaGF0LSR7dHVybi5yb2xlfWBcbiAgICB9KTtcbiAgICBtZXNzYWdlRWwuY3JlYXRlRWwoXCJkaXZcIiwge1xuICAgICAgY2xzOiBcIm92bC1jaGF0LXJvbGVcIixcbiAgICAgIHRleHQ6IHRoaXMuZ2V0Um9sZUxhYmVsKHR1cm4ucm9sZSlcbiAgICB9KTtcbiAgICBtZXNzYWdlRWwuY3JlYXRlRWwoXCJkaXZcIiwge1xuICAgICAgY2xzOiBcIm92bC1jaGF0LWNvbnRlbnRcIixcbiAgICAgIHRleHQ6IHR1cm4uY29udGVudFxuICAgIH0pO1xuICAgIGlmICh0dXJuLnRpbWVzdGFtcCkge1xuICAgICAgY29uc3QgdGltZXN0YW1wID0gdHlwZW9mIHR1cm4udGltZXN0YW1wID09PSBcInN0cmluZ1wiXG4gICAgICAgID8gdHVybi50aW1lc3RhbXBcbiAgICAgICAgOiB0dXJuLnRpbWVzdGFtcC50b0lTT1N0cmluZygpO1xuICAgICAgbWVzc2FnZUVsLmNyZWF0ZUVsKFwiZGl2XCIsIHtcbiAgICAgICAgY2xzOiBcIm92bC1jaGF0LXRpbWVzdGFtcFwiLFxuICAgICAgICB0ZXh0OiB0aW1lc3RhbXBcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMubWVzc2FnZXNFbC5zY3JvbGxUb3AgPSB0aGlzLm1lc3NhZ2VzRWwuc2Nyb2xsSGVpZ2h0O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRSb2xlTGFiZWwocm9sZTogQ29udmVyc2F0aW9uVHVybltcInJvbGVcIl0pOiBzdHJpbmcge1xuICAgIGlmIChyb2xlID09PSBcInVzZXJcIikge1xuICAgICAgcmV0dXJuIFwiXHVDMEFDXHVDNkE5XHVDNzkwXCI7XG4gICAgfVxuICAgIGlmIChyb2xlID09PSBcImFzc2lzdGFudFwiKSB7XG4gICAgICByZXR1cm4gXCJcdUM1QjRcdUMyRENcdUMyQTRcdUQxMzRcdUQyQjhcIjtcbiAgICB9XG4gICAgcmV0dXJuIFwiXHVDMkRDXHVDMkE0XHVEMTVDXCI7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGhhbmRsZVNlbmQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgaW5wdXQgPSB0aGlzLmlucHV0RWw/LnZhbHVlLnRyaW0oKSA/PyBcIlwiO1xuICAgIGlmICghaW5wdXQpIHtcbiAgICAgIG5ldyBOb3RpY2UoXCJcdUJBNTRcdUMyRENcdUM5QzBcdUI5N0MgXHVDNzg1XHVCODI1XHVENTc0IFx1QzhGQ1x1QzEzOFx1QzY5NC5cIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5hcHBlbmRNZXNzYWdlKHtcbiAgICAgIHJvbGU6IFwidXNlclwiLFxuICAgICAgY29udGVudDogaW5wdXQsXG4gICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKVxuICAgIH0pO1xuICAgIGlmICh0aGlzLmlucHV0RWwpIHtcbiAgICAgIHRoaXMuaW5wdXRFbC52YWx1ZSA9IFwiXCI7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRCdXN5KHRydWUpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB1c2VSYWcgPSB0aGlzLnVzZVJhZ0NoZWNrYm94Py5jaGVja2VkID8/IGZhbHNlO1xuICAgICAgY29uc3Qgc2hvd1NvdXJjZXNPbmx5ID0gdGhpcy5zaG93U291cmNlc0NoZWNrYm94Py5jaGVja2VkID8/IGZhbHNlO1xuXG4gICAgICBsZXQgcmVwbHk6IHN0cmluZztcblxuICAgICAgaWYgKHVzZVJhZyAmJiB0aGlzLnBsdWdpbi5zZXR0aW5ncy5pbmRleGluZ0VuYWJsZWQpIHtcbiAgICAgICAgLy8gUkFHIFx1QzBBQ1x1QzZBOTogXHVBQzgwXHVDMEM5IFx1RDZDNCBcdUNFRThcdUQxNERcdUMyQTRcdUQyQjggXHVDRDk0XHVBQzAwXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3Qgc2VhcmNoUmVzdWx0cyA9IGF3YWl0IHRoaXMucGx1Z2luLnNlYXJjaChpbnB1dCk7XG4gICAgICAgICAgXG4gICAgICAgICAgaWYgKHNob3dTb3VyY2VzT25seSkge1xuICAgICAgICAgICAgLy8gXHVDMThDXHVDMkE0XHVCOUNDIFx1RDQ1Q1x1QzJEQ1xuICAgICAgICAgICAgcmVwbHkgPSB0aGlzLmZvcm1hdFNlYXJjaFJlc3VsdHMoc2VhcmNoUmVzdWx0cyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFx1QUM4MFx1QzBDOSBcdUFDQjBcdUFDRkNcdUI5N0MgXHVDRUU4XHVEMTREXHVDMkE0XHVEMkI4XHVCODVDIExMTVx1QzVEMCBcdUM4MDRcdUIyRUNcbiAgICAgICAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmJ1aWxkQ29udGV4dChzZWFyY2hSZXN1bHRzKTtcbiAgICAgICAgICAgIGNvbnN0IGVuaGFuY2VkTWVzc2FnZXMgPSB0aGlzLmJ1aWxkRW5oYW5jZWRNZXNzYWdlcyhpbnB1dCwgY29udGV4dCk7XG4gICAgICAgICAgICByZXBseSA9IGF3YWl0IHRoaXMucGx1Z2luLnJlcXVlc3RBc3Npc3RhbnRSZXBseShlbmhhbmNlZE1lc3NhZ2VzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIlJBRyBcdUFDODBcdUMwQzkgXHVDMkU0XHVEMzI4OlwiLCBlcnJvcik7XG4gICAgICAgICAgbmV3IE5vdGljZShcIlx1QUM4MFx1QzBDOVx1QzVEMCBcdUMyRTRcdUQzMjhcdUQ1NThcdUM1RUMgXHVDNzdDXHVCQzE4IFx1QkFBOFx1QjREQ1x1Qjg1QyBcdUM4MDRcdUQ2NThcdUQ1NjlcdUIyQzhcdUIyRTRcIik7XG4gICAgICAgICAgcmVwbHkgPSBhd2FpdCB0aGlzLnBsdWdpbi5yZXF1ZXN0QXNzaXN0YW50UmVwbHkodGhpcy5tZXNzYWdlcyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFx1Qzc3Q1x1QkMxOCBcdUJBQThcdUI0RENcbiAgICAgICAgcmVwbHkgPSBhd2FpdCB0aGlzLnBsdWdpbi5yZXF1ZXN0QXNzaXN0YW50UmVwbHkodGhpcy5tZXNzYWdlcyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYXBwZW5kTWVzc2FnZSh7XG4gICAgICAgIHJvbGU6IFwiYXNzaXN0YW50XCIsXG4gICAgICAgIGNvbnRlbnQ6IHJlcGx5LFxuICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKVxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcik7XG4gICAgICBuZXcgTm90aWNlKGBcdUIzMDBcdUQ2NTQgXHVDMkU0XHVEMzI4OiAke21lc3NhZ2V9YCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRoaXMuc2V0QnVzeShmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBidWlsZENvbnRleHQoc2VhcmNoUmVzdWx0czogYW55W10pOiBzdHJpbmcge1xuICAgIGlmIChzZWFyY2hSZXN1bHRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIFwiXHVBRDAwXHVCODI4IFx1QkIzOFx1QzExQ1x1Qjk3QyBcdUNDM0VcdUM3NDQgXHVDMjE4IFx1QzVDNlx1QzJCNVx1QjJDOFx1QjJFNC5cIjtcbiAgICB9XG5cbiAgICBsZXQgY29udGV4dCA9IFwiXHVCMkU0XHVDNzRDXHVDNzQwIFx1QUM4MFx1QzBDOVx1QjQxQyBcdUFEMDBcdUI4MjggXHVCQjM4XHVDMTFDXHVCNEU0XHVDNzg1XHVCMkM4XHVCMkU0OlxcblxcblwiO1xuICAgIFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VhcmNoUmVzdWx0cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgcmVzdWx0ID0gc2VhcmNoUmVzdWx0c1tpXTtcbiAgICAgIGNvbnN0IHsgY2h1bmssIG5vdGUsIHNjb3JlIH0gPSByZXN1bHQ7XG4gICAgICBcbiAgICAgIGNvbnRleHQgKz0gYCMjIFx1QkIzOFx1QzExQyAke2kgKyAxfTogJHtub3RlLnRpdGxlfVxcbmA7XG4gICAgICBjb250ZXh0ICs9IGAtIFx1RDMwQ1x1Qzc3QzogJHtub3RlLnBhdGh9XFxuYDtcbiAgICAgIGNvbnRleHQgKz0gYC0gXHVDMTM5XHVDMTU4OiAke2NodW5rLnNlY3Rpb24gfHwgXCJcdUJDRjhcdUJCMzhcIn1cXG5gO1xuICAgICAgY29udGV4dCArPSBgLSBcdUM3MjBcdUMwQUNcdUIzQzQ6ICR7KHNjb3JlICogMTAwKS50b0ZpeGVkKDEpfSVcXG5cXG5gO1xuICAgICAgY29udGV4dCArPSBgJHtjaHVuay50ZXh0fVxcblxcbmA7XG4gICAgICBjb250ZXh0ICs9IFwiLS0tXFxuXFxuXCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnRleHQ7XG4gIH1cblxuICBwcml2YXRlIGZvcm1hdFNlYXJjaFJlc3VsdHMoc2VhcmNoUmVzdWx0czogYW55W10pOiBzdHJpbmcge1xuICAgIGlmIChzZWFyY2hSZXN1bHRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIFwiXHVBQzgwXHVDMEM5IFx1QUNCMFx1QUNGQ1x1QUMwMCBcdUM1QzZcdUMyQjVcdUIyQzhcdUIyRTQuXCI7XG4gICAgfVxuXG4gICAgbGV0IG91dHB1dCA9IFwiIyBcdUFDODBcdUMwQzkgXHVBQ0IwXHVBQ0ZDXFxuXFxuXCI7XG4gICAgXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWFyY2hSZXN1bHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBzZWFyY2hSZXN1bHRzW2ldO1xuICAgICAgY29uc3QgeyBjaHVuaywgbm90ZSwgc2NvcmUgfSA9IHJlc3VsdDtcbiAgICAgIFxuICAgICAgb3V0cHV0ICs9IGAjIyAke2kgKyAxfS4gJHtub3RlLnRpdGxlfVxcblxcbmA7XG4gICAgICBvdXRwdXQgKz0gYCoqXHVEMzBDXHVDNzdDKio6IFtbJHtub3RlLnBhdGh9XV1cXG5gO1xuICAgICAgb3V0cHV0ICs9IGAqKlx1QzEzOVx1QzE1OCoqOiAke2NodW5rLnNlY3Rpb24gfHwgXCJcdUJDRjhcdUJCMzhcIn1cXG5gO1xuICAgICAgb3V0cHV0ICs9IGAqKlx1QzcyMFx1QzBBQ1x1QjNDNCoqOiAkeyhzY29yZSAqIDEwMCkudG9GaXhlZCgxKX0lXFxuXFxuYDtcbiAgICAgIG91dHB1dCArPSBgPiAke2NodW5rLnRleHQuc3Vic3RyaW5nKDAsIDIwMCl9JHtjaHVuay50ZXh0Lmxlbmd0aCA+IDIwMCA/IFwiLi4uXCIgOiBcIlwifVxcblxcbmA7XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfVxuXG4gIHByaXZhdGUgYnVpbGRFbmhhbmNlZE1lc3NhZ2VzKHF1ZXJ5OiBzdHJpbmcsIGNvbnRleHQ6IHN0cmluZyk6IENvbnZlcnNhdGlvblR1cm5bXSB7XG4gICAgLy8gXHVDMkRDXHVDMkE0XHVEMTVDIFx1RDUwNFx1Qjg2Q1x1RDUwNFx1RDJCOFx1QzVEMCBcdUNFRThcdUQxNERcdUMyQTRcdUQyQjggXHVDRDk0XHVBQzAwXG4gICAgY29uc3Qgc3lzdGVtUHJvbXB0ID0gYFx1QjEwOFx1QjI5NCBPYnNpZGlhbiBcdUJDRkNcdUQyQjhcdUM3NTggXHVDODA0XHVCQjM4IFx1QjlBQ1x1QzExQ1x1Q0U1OCBcdUM1QjRcdUMyRENcdUMyQTRcdUQxMzRcdUQyQjhcdUIyRTQuIFxuXHVDODFDXHVBQ0Y1XHVCNDFDIFx1QkIzOFx1QzExQ1x1QjRFNFx1Qzc0NCBcdUNDMzhcdUFDRTBcdUQ1NThcdUM1RUMgXHVDMEFDXHVDNkE5XHVDNzkwXHVDNzU4IFx1QzlDOFx1QkIzOFx1QzVEMCBcdUIyRjVcdUJDQzBcdUQ1NThcdUI0MTgsIFx1RDU2RFx1QzBDMSBcdUNEOUNcdUNDOThcdUI5N0MgXHVCQTg1XHVDMkRDXHVENTU4XHVCNzdDLlxuXHVCQUE4XHVCOTc0XHVCMjk0IFx1QjBCNFx1QzZBOVx1Qzc0MCBcdUNEOTRcdUNFMjFcdUQ1NThcdUM5QzAgXHVCOUQwXHVBQ0UwIFx1QzE5NFx1QzlDMVx1RDU1OFx1QUM4QyBcdUJBQThcdUI5NzhcdUIyRTRcdUFDRTAgXHVCMkY1XHVCQ0MwXHVENTU4XHVCNzdDLlxuXG4ke2NvbnRleHR9YDtcblxuICAgIC8vIFx1QUUzMFx1Qzg3NCBcdUJBNTRcdUMyRENcdUM5QzBcdUM1RDAgXHVDMkRDXHVDMkE0XHVEMTVDIFx1RDUwNFx1Qjg2Q1x1RDUwNFx1RDJCOCBcdUNEOTRcdUFDMDBcbiAgICByZXR1cm4gW1xuICAgICAgeyByb2xlOiBcInN5c3RlbVwiLCBjb250ZW50OiBzeXN0ZW1Qcm9tcHQsIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpIH0sXG4gICAgICAuLi50aGlzLm1lc3NhZ2VzXG4gICAgXTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgaGFuZGxlU2F2ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAodGhpcy5tZXNzYWdlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIG5ldyBOb3RpY2UoXCJcdUM4MDBcdUM3QTVcdUQ1NjAgXHVCMzAwXHVENjU0XHVBQzAwIFx1QzVDNlx1QzJCNVx1QjJDOFx1QjJFNC5cIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc2Vzc2lvbklkID0gdGhpcy5zZXNzaW9uSWRFbD8udmFsdWUudHJpbSgpID8/IFwiXCI7XG4gICAgaWYgKCFzZXNzaW9uSWQpIHtcbiAgICAgIG5ldyBOb3RpY2UoXCJcdUMxMzhcdUMxNTggSURcdUI5N0MgXHVDNzg1XHVCODI1XHVENTc0IFx1QzhGQ1x1QzEzOFx1QzY5NC5cIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHRhcmdldFBhdGggPSBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlQ29udmVyc2F0aW9uRnJvbVR1cm5zKFxuICAgICAgICBzZXNzaW9uSWQsXG4gICAgICAgIHRoaXMubWVzc2FnZXMsXG4gICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmRlZmF1bHRPdXRwdXRGb2xkZXJcbiAgICAgICk7XG4gICAgICBuZXcgTm90aWNlKGBcdUIzMDBcdUQ2NTQgXHVDODAwXHVDN0E1IFx1QzY0NFx1QjhDQzogJHt0YXJnZXRQYXRofWApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpO1xuICAgICAgbmV3IE5vdGljZShgXHVDODAwXHVDN0E1IFx1QzJFNFx1RDMyODogJHttZXNzYWdlfWApO1xuICAgIH1cbiAgfVxufVxuIiwgIi8vIFNRTGl0ZSBcdUJBNTRcdUQwQzBcdUIzNzBcdUM3NzRcdUQxMzAgXHVDODAwXHVDN0E1XHVDMThDXG5cbmltcG9ydCBEYXRhYmFzZSBmcm9tIFwiYmV0dGVyLXNxbGl0ZTNcIjtcbmltcG9ydCB7IE5vdGVNZXRhZGF0YSwgQ2h1bmsgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQgY2xhc3MgTWV0YWRhdGFTdG9yZSB7XG4gIHByaXZhdGUgZGI6IERhdGFiYXNlLkRhdGFiYXNlO1xuXG4gIGNvbnN0cnVjdG9yKGRiUGF0aDogc3RyaW5nKSB7XG4gICAgdGhpcy5kYiA9IG5ldyBEYXRhYmFzZShkYlBhdGgpO1xuICAgIHRoaXMuaW5pdGlhbGl6ZVNjaGVtYSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1QjM3MFx1Qzc3NFx1RDEzMFx1QkNBMFx1Qzc3NFx1QzJBNCBcdUMyQTRcdUQwQTRcdUI5QzggXHVDRDA4XHVBRTMwXHVENjU0XG4gICAqL1xuICBwcml2YXRlIGluaXRpYWxpemVTY2hlbWEoKTogdm9pZCB7XG4gICAgdGhpcy5kYi5leGVjKGBcbiAgICAgIENSRUFURSBUQUJMRSBJRiBOT1QgRVhJU1RTIG5vdGVzIChcbiAgICAgICAgaWQgVEVYVCBQUklNQVJZIEtFWSxcbiAgICAgICAgcGF0aCBURVhUIFVOSVFVRSBOT1QgTlVMTCxcbiAgICAgICAgdGl0bGUgVEVYVCBOT1QgTlVMTCxcbiAgICAgICAgdGFncyBURVhULCAtLSBKU09OIGFycmF5XG4gICAgICAgIGxpbmtzIFRFWFQsIC0tIEpTT04gYXJyYXlcbiAgICAgICAgZnJvbnRtYXR0ZXIgVEVYVCwgLS0gSlNPTiBvYmplY3RcbiAgICAgICAgdXBkYXRlZF9hdCBJTlRFR0VSIE5PVCBOVUxMLFxuICAgICAgICBoYXNoIFRFWFQgTk9UIE5VTExcbiAgICAgICk7XG5cbiAgICAgIENSRUFURSBUQUJMRSBJRiBOT1QgRVhJU1RTIGNodW5rcyAoXG4gICAgICAgIGlkIFRFWFQgUFJJTUFSWSBLRVksXG4gICAgICAgIG5vdGVfaWQgVEVYVCBOT1QgTlVMTCxcbiAgICAgICAgdGV4dCBURVhUIE5PVCBOVUxMLFxuICAgICAgICBwb3NpdGlvbiBJTlRFR0VSIE5PVCBOVUxMLFxuICAgICAgICB0b2tlbl9jb3VudCBJTlRFR0VSIE5PVCBOVUxMLFxuICAgICAgICBzZWN0aW9uIFRFWFQsXG4gICAgICAgIEZPUkVJR04gS0VZIChub3RlX2lkKSBSRUZFUkVOQ0VTIG5vdGVzKGlkKSBPTiBERUxFVEUgQ0FTQ0FERVxuICAgICAgKTtcblxuICAgICAgQ1JFQVRFIElOREVYIElGIE5PVCBFWElTVFMgaWR4X25vdGVzX3BhdGggT04gbm90ZXMocGF0aCk7XG4gICAgICBDUkVBVEUgSU5ERVggSUYgTk9UIEVYSVNUUyBpZHhfbm90ZXNfdXBkYXRlZF9hdCBPTiBub3Rlcyh1cGRhdGVkX2F0KTtcbiAgICAgIENSRUFURSBJTkRFWCBJRiBOT1QgRVhJU1RTIGlkeF9jaHVua3Nfbm90ZV9pZCBPTiBjaHVua3Mobm90ZV9pZCk7XG4gICAgYCk7XG4gIH1cblxuICAvKipcbiAgICogXHVCMTc4XHVEMkI4IFx1QzgwMFx1QzdBNSBcdUI2MTBcdUIyOTQgXHVDNUM1XHVCMzcwXHVDNzc0XHVEMkI4XG4gICAqL1xuICB1cHNlcnROb3RlKG5vdGU6IE5vdGVNZXRhZGF0YSk6IHZvaWQge1xuICAgIGNvbnN0IHN0bXQgPSB0aGlzLmRiLnByZXBhcmUoYFxuICAgICAgSU5TRVJUIElOVE8gbm90ZXMgKGlkLCBwYXRoLCB0aXRsZSwgdGFncywgbGlua3MsIGZyb250bWF0dGVyLCB1cGRhdGVkX2F0LCBoYXNoKVxuICAgICAgVkFMVUVTICg/LCA/LCA/LCA/LCA/LCA/LCA/LCA/KVxuICAgICAgT04gQ09ORkxJQ1QoaWQpIERPIFVQREFURSBTRVRcbiAgICAgICAgcGF0aCA9IGV4Y2x1ZGVkLnBhdGgsXG4gICAgICAgIHRpdGxlID0gZXhjbHVkZWQudGl0bGUsXG4gICAgICAgIHRhZ3MgPSBleGNsdWRlZC50YWdzLFxuICAgICAgICBsaW5rcyA9IGV4Y2x1ZGVkLmxpbmtzLFxuICAgICAgICBmcm9udG1hdHRlciA9IGV4Y2x1ZGVkLmZyb250bWF0dGVyLFxuICAgICAgICB1cGRhdGVkX2F0ID0gZXhjbHVkZWQudXBkYXRlZF9hdCxcbiAgICAgICAgaGFzaCA9IGV4Y2x1ZGVkLmhhc2hcbiAgICBgKTtcblxuICAgIHN0bXQucnVuKFxuICAgICAgbm90ZS5pZCxcbiAgICAgIG5vdGUucGF0aCxcbiAgICAgIG5vdGUudGl0bGUsXG4gICAgICBKU09OLnN0cmluZ2lmeShub3RlLnRhZ3MpLFxuICAgICAgSlNPTi5zdHJpbmdpZnkobm90ZS5saW5rcyksXG4gICAgICBKU09OLnN0cmluZ2lmeShub3RlLmZyb250bWF0dGVyKSxcbiAgICAgIG5vdGUudXBkYXRlZEF0LFxuICAgICAgbm90ZS5oYXNoXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUFDQkRcdUI4NUNcdUI4NUMgXHVCMTc4XHVEMkI4IFx1Qzg3MFx1RDY4Q1xuICAgKi9cbiAgZ2V0Tm90ZUJ5UGF0aChwYXRoOiBzdHJpbmcpOiBOb3RlTWV0YWRhdGEgfCBudWxsIHtcbiAgICBjb25zdCBzdG10ID0gdGhpcy5kYi5wcmVwYXJlKFwiU0VMRUNUICogRlJPTSBub3RlcyBXSEVSRSBwYXRoID0gP1wiKTtcbiAgICBjb25zdCByb3cgPSBzdG10LmdldChwYXRoKSBhcyBhbnk7XG4gICAgcmV0dXJuIHJvdyA/IHRoaXMucm93VG9Ob3RlKHJvdykgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIElEXHVCODVDIFx1QjE3OFx1RDJCOCBcdUM4NzBcdUQ2OENcbiAgICovXG4gIGdldE5vdGVCeUlkKGlkOiBzdHJpbmcpOiBOb3RlTWV0YWRhdGEgfCBudWxsIHtcbiAgICBjb25zdCBzdG10ID0gdGhpcy5kYi5wcmVwYXJlKFwiU0VMRUNUICogRlJPTSBub3RlcyBXSEVSRSBpZCA9ID9cIik7XG4gICAgY29uc3Qgcm93ID0gc3RtdC5nZXQoaWQpIGFzIGFueTtcbiAgICByZXR1cm4gcm93ID8gdGhpcy5yb3dUb05vdGUocm93KSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogXHVCQUE4XHVCNEUwIFx1QjE3OFx1RDJCOCBcdUM4NzBcdUQ2OENcbiAgICovXG4gIGdldEFsbE5vdGVzKCk6IE5vdGVNZXRhZGF0YVtdIHtcbiAgICBjb25zdCBzdG10ID0gdGhpcy5kYi5wcmVwYXJlKFwiU0VMRUNUICogRlJPTSBub3RlcyBPUkRFUiBCWSB1cGRhdGVkX2F0IERFU0NcIik7XG4gICAgY29uc3Qgcm93cyA9IHN0bXQuYWxsKCkgYXMgYW55W107XG4gICAgcmV0dXJuIHJvd3MubWFwKChyb3cpID0+IHRoaXMucm93VG9Ob3RlKHJvdykpO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1QjE3OFx1RDJCOCBcdUMwQURcdUM4MUNcbiAgICovXG4gIGRlbGV0ZU5vdGUoaWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHN0bXQgPSB0aGlzLmRiLnByZXBhcmUoXCJERUxFVEUgRlJPTSBub3RlcyBXSEVSRSBpZCA9ID9cIik7XG4gICAgc3RtdC5ydW4oaWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1Q0NBRFx1RDA2QyBcdUM4MDBcdUM3QTVcbiAgICovXG4gIGluc2VydENodW5rcyhjaHVua3M6IENodW5rW10pOiB2b2lkIHtcbiAgICBjb25zdCBzdG10ID0gdGhpcy5kYi5wcmVwYXJlKGBcbiAgICAgIElOU0VSVCBJTlRPIGNodW5rcyAoaWQsIG5vdGVfaWQsIHRleHQsIHBvc2l0aW9uLCB0b2tlbl9jb3VudCwgc2VjdGlvbilcbiAgICAgIFZBTFVFUyAoPywgPywgPywgPywgPywgPylcbiAgICBgKTtcblxuICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gdGhpcy5kYi50cmFuc2FjdGlvbigoY2h1bmtzOiBDaHVua1tdKSA9PiB7XG4gICAgICBmb3IgKGNvbnN0IGNodW5rIG9mIGNodW5rcykge1xuICAgICAgICBzdG10LnJ1bihcbiAgICAgICAgICBjaHVuay5pZCxcbiAgICAgICAgICBjaHVuay5ub3RlSWQsXG4gICAgICAgICAgY2h1bmsudGV4dCxcbiAgICAgICAgICBjaHVuay5wb3NpdGlvbixcbiAgICAgICAgICBjaHVuay50b2tlbkNvdW50LFxuICAgICAgICAgIGNodW5rLnNlY3Rpb25cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRyYW5zYWN0aW9uKGNodW5rcyk7XG4gIH1cblxuICAvKipcbiAgICogXHVCMTc4XHVEMkI4XHVDNzU4IFx1Q0NBRFx1RDA2QyBcdUMwQURcdUM4MUNcbiAgICovXG4gIGRlbGV0ZUNodW5rc0J5Tm90ZUlkKG5vdGVJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3Qgc3RtdCA9IHRoaXMuZGIucHJlcGFyZShcIkRFTEVURSBGUk9NIGNodW5rcyBXSEVSRSBub3RlX2lkID0gP1wiKTtcbiAgICBzdG10LnJ1bihub3RlSWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1QjE3OFx1RDJCOFx1Qzc1OCBcdUNDQURcdUQwNkMgXHVDODcwXHVENjhDXG4gICAqL1xuICBnZXRDaHVua3NCeU5vdGVJZChub3RlSWQ6IHN0cmluZyk6IENodW5rW10ge1xuICAgIGNvbnN0IHN0bXQgPSB0aGlzLmRiLnByZXBhcmUoXCJTRUxFQ1QgKiBGUk9NIGNodW5rcyBXSEVSRSBub3RlX2lkID0gPyBPUkRFUiBCWSBwb3NpdGlvblwiKTtcbiAgICBjb25zdCByb3dzID0gc3RtdC5hbGwobm90ZUlkKSBhcyBhbnlbXTtcbiAgICByZXR1cm4gcm93cy5tYXAoKHJvdykgPT4gdGhpcy5yb3dUb0NodW5rKHJvdykpO1xuICB9XG5cbiAgLyoqXG4gICAqIElEXHVCODVDIFx1Q0NBRFx1RDA2QyBcdUM4NzBcdUQ2OENcbiAgICovXG4gIGdldENodW5rQnlJZChpZDogc3RyaW5nKTogQ2h1bmsgfCBudWxsIHtcbiAgICBjb25zdCBzdG10ID0gdGhpcy5kYi5wcmVwYXJlKFwiU0VMRUNUICogRlJPTSBjaHVua3MgV0hFUkUgaWQgPSA/XCIpO1xuICAgIGNvbnN0IHJvdyA9IHN0bXQuZ2V0KGlkKSBhcyBhbnk7XG4gICAgcmV0dXJuIHJvdyA/IHRoaXMucm93VG9DaHVuayhyb3cpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUJBQThcdUI0RTAgXHVDQ0FEXHVEMDZDIFx1Qzg3MFx1RDY4Q1xuICAgKi9cbiAgZ2V0QWxsQ2h1bmtzKCk6IENodW5rW10ge1xuICAgIGNvbnN0IHN0bXQgPSB0aGlzLmRiLnByZXBhcmUoXCJTRUxFQ1QgKiBGUk9NIGNodW5rc1wiKTtcbiAgICBjb25zdCByb3dzID0gc3RtdC5hbGwoKSBhcyBhbnlbXTtcbiAgICByZXR1cm4gcm93cy5tYXAoKHJvdykgPT4gdGhpcy5yb3dUb0NodW5rKHJvdykpO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1QjM3MFx1Qzc3NFx1RDEzMFx1QkNBMFx1Qzc3NFx1QzJBNCBcdUIyRUJcdUFFMzBcbiAgICovXG4gIGNsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuZGIuY2xvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEQiBcdUQ1ODlcdUM3NDQgTm90ZU1ldGFkYXRhXHVCODVDIFx1QkNDMFx1RDY1OFxuICAgKi9cbiAgcHJpdmF0ZSByb3dUb05vdGUocm93OiBhbnkpOiBOb3RlTWV0YWRhdGEge1xuICAgIHJldHVybiB7XG4gICAgICBpZDogcm93LmlkLFxuICAgICAgcGF0aDogcm93LnBhdGgsXG4gICAgICB0aXRsZTogcm93LnRpdGxlLFxuICAgICAgdGFnczogSlNPTi5wYXJzZShyb3cudGFncyB8fCBcIltdXCIpLFxuICAgICAgbGlua3M6IEpTT04ucGFyc2Uocm93LmxpbmtzIHx8IFwiW11cIiksXG4gICAgICBmcm9udG1hdHRlcjogSlNPTi5wYXJzZShyb3cuZnJvbnRtYXR0ZXIgfHwgXCJ7fVwiKSxcbiAgICAgIHVwZGF0ZWRBdDogcm93LnVwZGF0ZWRfYXQsXG4gICAgICBoYXNoOiByb3cuaGFzaCxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIERCIFx1RDU4OVx1Qzc0NCBDaHVua1x1Qjg1QyBcdUJDQzBcdUQ2NThcbiAgICovXG4gIHByaXZhdGUgcm93VG9DaHVuayhyb3c6IGFueSk6IENodW5rIHtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IHJvdy5pZCxcbiAgICAgIG5vdGVJZDogcm93Lm5vdGVfaWQsXG4gICAgICB0ZXh0OiByb3cudGV4dCxcbiAgICAgIHBvc2l0aW9uOiByb3cucG9zaXRpb24sXG4gICAgICB0b2tlbkNvdW50OiByb3cudG9rZW5fY291bnQsXG4gICAgICBzZWN0aW9uOiByb3cuc2VjdGlvbixcbiAgICB9O1xuICB9XG59XG4iLCAiLy8gXHVCQ0ExXHVEMTMwIFx1QzJBNFx1RDFBMFx1QzVCNCAtIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUM4MDBcdUM3QTUgXHVCQzBGIFx1QzcyMFx1QzBBQ1x1QjNDNCBcdUFDODBcdUMwQzlcblxuaW1wb3J0IERhdGFiYXNlIGZyb20gXCJiZXR0ZXItc3FsaXRlM1wiO1xuaW1wb3J0IHsgQ2h1bmssIFNlYXJjaFJlc3VsdCwgU2VhcmNoRmlsdGVyIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuZXhwb3J0IGNsYXNzIFZlY3RvclN0b3JlIHtcbiAgcHJpdmF0ZSBkYjogRGF0YWJhc2UuRGF0YWJhc2U7XG5cbiAgY29uc3RydWN0b3IoZGJQYXRoOiBzdHJpbmcpIHtcbiAgICB0aGlzLmRiID0gbmV3IERhdGFiYXNlKGRiUGF0aCk7XG4gICAgdGhpcy5pbml0aWFsaXplU2NoZW1hKCk7XG4gIH1cblxuICAvKipcbiAgICogXHVCMzcwXHVDNzc0XHVEMTMwXHVCQ0EwXHVDNzc0XHVDMkE0IFx1QzJBNFx1RDBBNFx1QjlDOCBcdUNEMDhcdUFFMzBcdUQ2NTRcbiAgICovXG4gIHByaXZhdGUgaW5pdGlhbGl6ZVNjaGVtYSgpOiB2b2lkIHtcbiAgICB0aGlzLmRiLmV4ZWMoYFxuICAgICAgQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgZW1iZWRkaW5ncyAoXG4gICAgICAgIGNodW5rX2lkIFRFWFQgUFJJTUFSWSBLRVksXG4gICAgICAgIGVtYmVkZGluZyBURVhUIE5PVCBOVUxMIC0tIEpTT04gYXJyYXkgb2YgbnVtYmVyc1xuICAgICAgKTtcblxuICAgICAgQ1JFQVRFIElOREVYIElGIE5PVCBFWElTVFMgaWR4X2VtYmVkZGluZ3NfY2h1bmtfaWQgT04gZW1iZWRkaW5ncyhjaHVua19pZCk7XG4gICAgYCk7XG4gIH1cblxuICAvKipcbiAgICogXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzgwMFx1QzdBNVxuICAgKi9cbiAgc3RvcmVFbWJlZGRpbmcoY2h1bmtJZDogc3RyaW5nLCBlbWJlZGRpbmc6IG51bWJlcltdKTogdm9pZCB7XG4gICAgY29uc3Qgc3RtdCA9IHRoaXMuZGIucHJlcGFyZShgXG4gICAgICBJTlNFUlQgT1IgUkVQTEFDRSBJTlRPIGVtYmVkZGluZ3MgKGNodW5rX2lkLCBlbWJlZGRpbmcpXG4gICAgICBWQUxVRVMgKD8sID8pXG4gICAgYCk7XG4gICAgc3RtdC5ydW4oY2h1bmtJZCwgSlNPTi5zdHJpbmdpZnkoZW1iZWRkaW5nKSk7XG4gIH1cblxuICAvKipcbiAgICogXHVDNUVDXHVCN0VDIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUM3N0NcdUFEMDQgXHVDODAwXHVDN0E1XG4gICAqL1xuICBzdG9yZUVtYmVkZGluZ3MoZW1iZWRkaW5nczogTWFwPHN0cmluZywgbnVtYmVyW10+KTogdm9pZCB7XG4gICAgY29uc3Qgc3RtdCA9IHRoaXMuZGIucHJlcGFyZShgXG4gICAgICBJTlNFUlQgT1IgUkVQTEFDRSBJTlRPIGVtYmVkZGluZ3MgKGNodW5rX2lkLCBlbWJlZGRpbmcpXG4gICAgICBWQUxVRVMgKD8sID8pXG4gICAgYCk7XG5cbiAgICBjb25zdCB0cmFuc2FjdGlvbiA9IHRoaXMuZGIudHJhbnNhY3Rpb24oKGVtYmVkZGluZ3M6IE1hcDxzdHJpbmcsIG51bWJlcltdPikgPT4ge1xuICAgICAgZm9yIChjb25zdCBbY2h1bmtJZCwgZW1iZWRkaW5nXSBvZiBlbWJlZGRpbmdzLmVudHJpZXMoKSkge1xuICAgICAgICBzdG10LnJ1bihjaHVua0lkLCBKU09OLnN0cmluZ2lmeShlbWJlZGRpbmcpKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRyYW5zYWN0aW9uKGVtYmVkZGluZ3MpO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUM4NzBcdUQ2OENcbiAgICovXG4gIGdldEVtYmVkZGluZyhjaHVua0lkOiBzdHJpbmcpOiBudW1iZXJbXSB8IG51bGwge1xuICAgIGNvbnN0IHN0bXQgPSB0aGlzLmRiLnByZXBhcmUoXCJTRUxFQ1QgZW1iZWRkaW5nIEZST00gZW1iZWRkaW5ncyBXSEVSRSBjaHVua19pZCA9ID9cIik7XG4gICAgY29uc3Qgcm93ID0gc3RtdC5nZXQoY2h1bmtJZCkgYXMgYW55O1xuICAgIHJldHVybiByb3cgPyBKU09OLnBhcnNlKHJvdy5lbWJlZGRpbmcpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUJBQThcdUI0RTAgXHVDNzg0XHVCQ0EwXHVCNTI5IFx1Qzg3MFx1RDY4Q1xuICAgKi9cbiAgZ2V0QWxsRW1iZWRkaW5ncygpOiBNYXA8c3RyaW5nLCBudW1iZXJbXT4ge1xuICAgIGNvbnN0IHN0bXQgPSB0aGlzLmRiLnByZXBhcmUoXCJTRUxFQ1QgY2h1bmtfaWQsIGVtYmVkZGluZyBGUk9NIGVtYmVkZGluZ3NcIik7XG4gICAgY29uc3Qgcm93cyA9IHN0bXQuYWxsKCkgYXMgYW55W107XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IE1hcDxzdHJpbmcsIG51bWJlcltdPigpO1xuXG4gICAgZm9yIChjb25zdCByb3cgb2Ygcm93cykge1xuICAgICAgcmVzdWx0LnNldChyb3cuY2h1bmtfaWQsIEpTT04ucGFyc2Uocm93LmVtYmVkZGluZykpO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogXHVDQ0FEXHVEMDZDXHVDNzU4IFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUMwQURcdUM4MUNcbiAgICovXG4gIGRlbGV0ZUVtYmVkZGluZyhjaHVua0lkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBzdG10ID0gdGhpcy5kYi5wcmVwYXJlKFwiREVMRVRFIEZST00gZW1iZWRkaW5ncyBXSEVSRSBjaHVua19pZCA9ID9cIik7XG4gICAgc3RtdC5ydW4oY2h1bmtJZCk7XG4gIH1cblxuICAvKipcbiAgICogXHVDNUVDXHVCN0VDIFx1Q0NBRFx1RDA2Q1x1Qzc1OCBcdUM3ODRcdUJDQTBcdUI1MjkgXHVDMEFEXHVDODFDXG4gICAqL1xuICBkZWxldGVFbWJlZGRpbmdzKGNodW5rSWRzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGNvbnN0IHBsYWNlaG9sZGVycyA9IGNodW5rSWRzLm1hcCgoKSA9PiBcIj9cIikuam9pbihcIixcIik7XG4gICAgY29uc3Qgc3RtdCA9IHRoaXMuZGIucHJlcGFyZShgREVMRVRFIEZST00gZW1iZWRkaW5ncyBXSEVSRSBjaHVua19pZCBJTiAoJHtwbGFjZWhvbGRlcnN9KWApO1xuICAgIHN0bXQucnVuKC4uLmNodW5rSWRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUNGNTRcdUMwQUNcdUM3NzggXHVDNzIwXHVDMEFDXHVCM0M0IFx1QUNDNFx1QzBCMFxuICAgKi9cbiAgcHJpdmF0ZSBjb3NpbmVTaW1pbGFyaXR5KGE6IG51bWJlcltdLCBiOiBudW1iZXJbXSk6IG51bWJlciB7XG4gICAgaWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXHVCQ0ExXHVEMTMwIFx1QUUzOFx1Qzc3NFx1QUMwMCBcdUM3N0NcdUNFNThcdUQ1NThcdUM5QzAgXHVDNTRBXHVDMkI1XHVCMkM4XHVCMkU0XCIpO1xuICAgIH1cblxuICAgIGxldCBkb3RQcm9kdWN0ID0gMDtcbiAgICBsZXQgbm9ybUEgPSAwO1xuICAgIGxldCBub3JtQiA9IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGRvdFByb2R1Y3QgKz0gYVtpXSAqIGJbaV07XG4gICAgICBub3JtQSArPSBhW2ldICogYVtpXTtcbiAgICAgIG5vcm1CICs9IGJbaV0gKiBiW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBkb3RQcm9kdWN0IC8gKE1hdGguc3FydChub3JtQSkgKiBNYXRoLnNxcnQobm9ybUIpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUJDQTFcdUQxMzAgXHVBQzgwXHVDMEM5IC0gVG9wLUsgXHVDNzIwXHVDMEFDIFx1Q0NBRFx1RDA2QyBcdUNDM0VcdUFFMzBcbiAgICogXG4gICAqIFx1Q0MzOFx1QUNFMDogXHVENjA0XHVDN0FDIFx1QUQ2Q1x1RDYwNFx1Qzc0MCBcdUJBQThcdUI0RTAgXHVDNzg0XHVCQ0EwXHVCNTI5XHVDNzQ0IFx1QkE1NFx1QkFBOFx1QjlBQ1x1QzVEMCBcdUI4NUNcdUI0RENcdUQ1NThcdUM1RUMgXHVDMTIwXHVENjE1IFx1QUM4MFx1QzBDOVx1Qzc0NCBcdUMyMThcdUQ1ODlcdUQ1NjlcdUIyQzhcdUIyRTQuXG4gICAqIFx1QjMwMFx1QUREQ1x1QkFBOCBcdUJDRkNcdUQyQjhcdUM3NTggXHVBQ0JEXHVDNkIwIFx1QzEzMVx1QjJBNVx1Qzc3NCBcdUM4MDBcdUQ1NThcdUI0MjAgXHVDMjE4IFx1Qzc4OFx1QzczQ1x1QkE3MCwgXHVCMkU0XHVDNzRDXHVBQ0ZDIFx1QUMxOVx1Qzc0MCBcdUFDMUNcdUMxMjBcdUM3NzQgXHVBRDhDXHVDN0E1XHVCNDI5XHVCMkM4XHVCMkU0OlxuICAgKiAtIEFOTihBcHByb3hpbWF0ZSBOZWFyZXN0IE5laWdoYm9yKSBcdUM1NENcdUFDRTBcdUI5QUNcdUM5OTggXHVDMEFDXHVDNkE5IChGQUlTUywgSE5TVyBcdUI0RjEpXG4gICAqIC0gXHVDODA0XHVDNkE5IFx1QkNBMVx1RDEzMCBcdUIzNzBcdUM3NzRcdUQxMzBcdUJDQTBcdUM3NzRcdUMyQTQgXHVDMEFDXHVDNkE5IChDaHJvbWEsIFFkcmFudCBcdUI0RjEpXG4gICAqIC0gXHVDOTlEXHVCRDg0IFx1QUM4MFx1QzBDOSBcdUI2MTBcdUIyOTQgXHVDNzc4XHVCMzcxXHVDMkE0IFx1Q0U5MFx1QzJGMVxuICAgKi9cbiAgc2VhcmNoKHF1ZXJ5RW1iZWRkaW5nOiBudW1iZXJbXSwgazogbnVtYmVyID0gOCk6IEFycmF5PHsgY2h1bmtJZDogc3RyaW5nOyBzY29yZTogbnVtYmVyIH0+IHtcbiAgICBjb25zdCBhbGxFbWJlZGRpbmdzID0gdGhpcy5nZXRBbGxFbWJlZGRpbmdzKCk7XG4gICAgY29uc3Qgc2NvcmVzOiBBcnJheTx7IGNodW5rSWQ6IHN0cmluZzsgc2NvcmU6IG51bWJlciB9PiA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBbY2h1bmtJZCwgZW1iZWRkaW5nXSBvZiBhbGxFbWJlZGRpbmdzLmVudHJpZXMoKSkge1xuICAgICAgY29uc3Qgc2NvcmUgPSB0aGlzLmNvc2luZVNpbWlsYXJpdHkocXVlcnlFbWJlZGRpbmcsIGVtYmVkZGluZyk7XG4gICAgICBzY29yZXMucHVzaCh7IGNodW5rSWQsIHNjb3JlIH0pO1xuICAgIH1cblxuICAgIC8vIFx1QzgxMFx1QzIxOCBcdUFFMzBcdUM5MDAgXHVCMEI0XHVCOUJDXHVDQzI4XHVDMjFDIFx1QzgxNVx1QjgyQyBcdUQ2QzQgXHVDMEMxXHVDNzA0IEtcdUFDMUMgXHVCQzE4XHVENjU4XG4gICAgc2NvcmVzLnNvcnQoKGEsIGIpID0+IGIuc2NvcmUgLSBhLnNjb3JlKTtcbiAgICByZXR1cm4gc2NvcmVzLnNsaWNlKDAsIGspO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1QjM3MFx1Qzc3NFx1RDEzMFx1QkNBMFx1Qzc3NFx1QzJBNCBcdUIyRUJcdUFFMzBcbiAgICovXG4gIGNsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuZGIuY2xvc2UoKTtcbiAgfVxufVxuIiwgIi8vIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUMwRERcdUMxMzFcdUFFMzAgLSBBUEkgXHVBRTMwXHVCQzE4IFx1QkMwRiBcdUI4NUNcdUNFRUMgXHVCQUE4XHVCMzc4IFx1QzlDMFx1QzZEMFxuXG5pbXBvcnQgeyByZXF1ZXN0VXJsIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5cbmV4cG9ydCB0eXBlIEVtYmVkZGluZ0NvbmZpZyA9IHtcbiAgcHJvdmlkZXI6IFwiZ2VtaW5pXCIgfCBcIm9wZW5haVwiIHwgXCJsb2NhbFwiIHwgXCJjdXN0b21cIjtcbiAgYXBpS2V5Pzogc3RyaW5nO1xuICBtb2RlbDogc3RyaW5nO1xuICBhcGlVcmw/OiBzdHJpbmc7XG59O1xuXG5pbnRlcmZhY2UgR2VtaW5pRW1iZWRkaW5nUmVzcG9uc2Uge1xuICBlbWJlZGRpbmc/OiB7XG4gICAgdmFsdWVzPzogbnVtYmVyW107XG4gIH07XG59XG5cbmludGVyZmFjZSBPcGVuQUlFbWJlZGRpbmdSZXNwb25zZSB7XG4gIGRhdGE/OiBBcnJheTx7XG4gICAgZW1iZWRkaW5nPzogbnVtYmVyW107XG4gIH0+O1xufVxuXG5pbnRlcmZhY2UgQ3VzdG9tRW1iZWRkaW5nUmVzcG9uc2Uge1xuICBkYXRhPzogQXJyYXk8e1xuICAgIGVtYmVkZGluZz86IG51bWJlcltdO1xuICB9Pjtcbn1cblxuZXhwb3J0IGNsYXNzIEVtYmVkZGluZ0dlbmVyYXRvciB7XG4gIHByaXZhdGUgcGlwZWxpbmU6IGFueSA9IG51bGw7XG4gIHByaXZhdGUgcGlwZWxpbmVGYWN0b3J5OiAoKHRhc2s6IHN0cmluZywgbW9kZWw6IHN0cmluZykgPT4gUHJvbWlzZTxhbnk+KSB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGNvbmZpZzogRW1iZWRkaW5nQ29uZmlnO1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogRW1iZWRkaW5nQ29uZmlnKSB7XG4gICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gIH1cblxuICAvKipcbiAgICogXHVDNzg0XHVCQ0EwXHVCNTI5IFx1Q0QwOFx1QUUzMFx1RDY1NFxuICAgKi9cbiAgYXN5bmMgaW5pdGlhbGl6ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAodGhpcy5jb25maWcucHJvdmlkZXIgPT09IFwibG9jYWxcIikge1xuICAgICAgaWYgKHRoaXMucGlwZWxpbmUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zb2xlLmxvZyhgXHVCODVDXHVDRUVDIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUJBQThcdUIzNzggXHVCODVDXHVCNTI5IFx1QzkxMTogJHt0aGlzLmNvbmZpZy5tb2RlbH1gKTtcbiAgICAgIGNvbnNvbGUubG9nKGBcdUJBQThcdUIzNzhcdUM3NDAgSHVnZ2luZ0ZhY2VcdUM1RDBcdUMxMUMgXHVCMkU0XHVDNkI0XHVCODVDXHVCNERDXHVCNDE4XHVDNUI0IFx1Qjg1Q1x1Q0VFQ1x1QzVEMCBcdUNFOTBcdUMyRENcdUI0MjlcdUIyQzhcdUIyRTQuYCk7XG4gICAgICBjb25zdCBwaXBlbGluZUZhY3RvcnkgPSBhd2FpdCB0aGlzLmxvYWRQaXBlbGluZUZhY3RvcnkoKTtcbiAgICAgIHRoaXMucGlwZWxpbmUgPSBhd2FpdCBwaXBlbGluZUZhY3RvcnkoXCJmZWF0dXJlLWV4dHJhY3Rpb25cIiwgdGhpcy5jb25maWcubW9kZWwpO1xuICAgICAgY29uc29sZS5sb2coXCJcdUM3ODRcdUJDQTBcdUI1MjkgXHVCQUE4XHVCMzc4IFx1Qjg1Q1x1QjUyOSBcdUM2NDRcdUI4Q0NcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEFQSSBcdUFFMzBcdUJDMThcdUM3NDAgXHVDRDA4XHVBRTMwXHVENjU0IFx1QkQ4OFx1RDU0NFx1QzY5NFxuICAgICAgY29uc29sZS5sb2coYEFQSSBcdUFFMzBcdUJDMTggXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzBBQ1x1QzZBOTogJHt0aGlzLmNvbmZpZy5wcm92aWRlcn1gKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogXHVEMTREXHVDMkE0XHVEMkI4XHVCOTdDIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUJDQTFcdUQxMzBcdUI4NUMgXHVCQ0MwXHVENjU4XG4gICAqL1xuICBhc3luYyBlbWJlZCh0ZXh0OiBzdHJpbmcpOiBQcm9taXNlPG51bWJlcltdPiB7XG4gICAgaWYgKHRoaXMuY29uZmlnLnByb3ZpZGVyID09PSBcImxvY2FsXCIpIHtcbiAgICAgIHJldHVybiB0aGlzLmVtYmVkTG9jYWwodGV4dCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbmZpZy5wcm92aWRlciA9PT0gXCJnZW1pbmlcIikge1xuICAgICAgcmV0dXJuIHRoaXMuZW1iZWRHZW1pbmkodGV4dCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbmZpZy5wcm92aWRlciA9PT0gXCJvcGVuYWlcIikge1xuICAgICAgcmV0dXJuIHRoaXMuZW1iZWRPcGVuQUkodGV4dCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbmZpZy5wcm92aWRlciA9PT0gXCJjdXN0b21cIikge1xuICAgICAgcmV0dXJuIHRoaXMuZW1iZWRDdXN0b20odGV4dCk7XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IEVycm9yKGBcdUM5QzBcdUM2RDBcdUQ1NThcdUM5QzAgXHVDNTRBXHVCMjk0IFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUM4MUNcdUFDRjVcdUM3OTA6ICR7dGhpcy5jb25maWcucHJvdmlkZXJ9YCk7XG4gIH1cblxuICAvKipcbiAgICogXHVCODVDXHVDRUVDIFx1QkFBOFx1QjM3OFx1Qjg1QyBcdUM3ODRcdUJDQTBcdUI1MjkgXHVDMEREXHVDMTMxXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIGVtYmVkTG9jYWwodGV4dDogc3RyaW5nKTogUHJvbWlzZTxudW1iZXJbXT4ge1xuICAgIGlmICghdGhpcy5waXBlbGluZSkge1xuICAgICAgYXdhaXQgdGhpcy5pbml0aWFsaXplKCk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnBpcGVsaW5lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJcdUM3ODRcdUJDQTBcdUI1MjkgXHVEMzBDXHVDNzc0XHVENTA0XHVCNzdDXHVDNzc4IFx1Q0QwOFx1QUUzMFx1RDY1NCBcdUMyRTRcdUQzMjhcIik7XG4gICAgfVxuXG4gICAgY29uc3Qgb3V0cHV0ID0gYXdhaXQgdGhpcy5waXBlbGluZSh0ZXh0LCB7XG4gICAgICBwb29saW5nOiBcIm1lYW5cIixcbiAgICAgIG5vcm1hbGl6ZTogdHJ1ZSxcbiAgICB9KTtcblxuICAgIHJldHVybiBBcnJheS5mcm9tKG91dHB1dC5kYXRhIGFzIEZsb2F0MzJBcnJheSk7XG4gIH1cblxuICAvKipcbiAgICogXHVCODVDXHVDRUVDIFx1Qzc4NFx1QkNBMFx1QjUyOVx1QzZBOSBcdUQzMENcdUM3NzRcdUQ1MDRcdUI3N0NcdUM3NzggXHVCODVDXHVCMzU0IChcdUQ1NDRcdUM2OTRcdUQ1NjAgXHVCNTRDXHVCOUNDIFx1Qjg1Q1x1QjREQylcbiAgICovXG4gIHByaXZhdGUgYXN5bmMgbG9hZFBpcGVsaW5lRmFjdG9yeSgpOiBQcm9taXNlPCh0YXNrOiBzdHJpbmcsIG1vZGVsOiBzdHJpbmcpID0+IFByb21pc2U8YW55Pj4ge1xuICAgIGlmICh0aGlzLnBpcGVsaW5lRmFjdG9yeSkge1xuICAgICAgcmV0dXJuIHRoaXMucGlwZWxpbmVGYWN0b3J5O1xuICAgIH1cblxuICAgIGNvbnN0IG1vZHVsZSA9IGF3YWl0IGltcG9ydChcIkB4ZW5vdmEvdHJhbnNmb3JtZXJzXCIpO1xuICAgIHRoaXMucGlwZWxpbmVGYWN0b3J5ID0gbW9kdWxlLnBpcGVsaW5lIGFzICh0YXNrOiBzdHJpbmcsIG1vZGVsOiBzdHJpbmcpID0+IFByb21pc2U8YW55PjtcbiAgICByZXR1cm4gdGhpcy5waXBlbGluZUZhY3Rvcnk7XG4gIH1cblxuICAvKipcbiAgICogR2VtaW5pIEFQSVx1Qjg1QyBcdUM3ODRcdUJDQTBcdUI1MjkgXHVDMEREXHVDMTMxXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIGVtYmVkR2VtaW5pKHRleHQ6IHN0cmluZyk6IFByb21pc2U8bnVtYmVyW10+IHtcbiAgICBpZiAoIXRoaXMuY29uZmlnLmFwaUtleSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VtaW5pIEFQSSBcdUQwQTRcdUFDMDAgXHVDMTI0XHVDODE1XHVCNDE4XHVDOUMwIFx1QzU0QVx1QzU1OFx1QzJCNVx1QjJDOFx1QjJFNFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmNvbmZpZy5hcGlVcmx9LyR7dGhpcy5jb25maWcubW9kZWx9OmVtYmVkQ29udGVudD9rZXk9JHt0aGlzLmNvbmZpZy5hcGlLZXl9YDtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHJlcXVlc3RVcmwoe1xuICAgICAgICB1cmwsXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgICAgIHBhcnRzOiBbeyB0ZXh0IH1dLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGRhdGEgPSByZXNwb25zZS5qc29uIGFzIEdlbWluaUVtYmVkZGluZ1Jlc3BvbnNlO1xuICAgICAgaWYgKGRhdGEuZW1iZWRkaW5nPy52YWx1ZXMpIHtcbiAgICAgICAgcmV0dXJuIGRhdGEuZW1iZWRkaW5nLnZhbHVlcztcbiAgICAgIH1cblxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VtaW5pIEFQSSBcdUM3NTFcdUIyRjUgXHVENjE1XHVDMkREXHVDNzc0IFx1QzYyQ1x1QkMxNFx1Qjk3NFx1QzlDMCBcdUM1NEFcdUMyQjVcdUIyQzhcdUIyRTRcIik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJHZW1pbmkgXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzBERFx1QzEzMSBcdUMyRTRcdUQzMjg6XCIsIGVycm9yKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVuQUkgQVBJXHVCODVDIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUMwRERcdUMxMzFcbiAgICovXG4gIHByaXZhdGUgYXN5bmMgZW1iZWRPcGVuQUkodGV4dDogc3RyaW5nKTogUHJvbWlzZTxudW1iZXJbXT4ge1xuICAgIGlmICghdGhpcy5jb25maWcuYXBpS2V5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJPcGVuQUkgQVBJIFx1RDBBNFx1QUMwMCBcdUMxMjRcdUM4MTVcdUI0MThcdUM5QzAgXHVDNTRBXHVDNTU4XHVDMkI1XHVCMkM4XHVCMkU0XCIpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHJlcXVlc3RVcmwoe1xuICAgICAgICB1cmw6IHRoaXMuY29uZmlnLmFwaVVybCB8fCBcImh0dHBzOi8vYXBpLm9wZW5haS5jb20vdjEvZW1iZWRkaW5nc1wiLFxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IGBCZWFyZXIgJHt0aGlzLmNvbmZpZy5hcGlLZXl9YCxcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIG1vZGVsOiB0aGlzLmNvbmZpZy5tb2RlbCxcbiAgICAgICAgICBpbnB1dDogdGV4dCxcbiAgICAgICAgfSksXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgZGF0YSA9IHJlc3BvbnNlLmpzb24gYXMgT3BlbkFJRW1iZWRkaW5nUmVzcG9uc2U7XG4gICAgICBpZiAoZGF0YS5kYXRhPy5bMF0/LmVtYmVkZGluZykge1xuICAgICAgICByZXR1cm4gZGF0YS5kYXRhWzBdLmVtYmVkZGluZztcbiAgICAgIH1cblxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiT3BlbkFJIEFQSSBcdUM3NTFcdUIyRjUgXHVENjE1XHVDMkREXHVDNzc0IFx1QzYyQ1x1QkMxNFx1Qjk3NFx1QzlDMCBcdUM1NEFcdUMyQjVcdUIyQzhcdUIyRTRcIik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJPcGVuQUkgXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzBERFx1QzEzMSBcdUMyRTRcdUQzMjg6XCIsIGVycm9yKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBcdUNFRTRcdUMyQTRcdUQxNDAgQVBJXHVCODVDIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUMwRERcdUMxMzFcbiAgICovXG4gIHByaXZhdGUgYXN5bmMgZW1iZWRDdXN0b20odGV4dDogc3RyaW5nKTogUHJvbWlzZTxudW1iZXJbXT4ge1xuICAgIGlmICghdGhpcy5jb25maWcuYXBpVXJsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJcdUNFRTRcdUMyQTRcdUQxNDAgQVBJIFVSTFx1Qzc3NCBcdUMxMjRcdUM4MTVcdUI0MThcdUM5QzAgXHVDNTRBXHVDNTU4XHVDMkI1XHVCMkM4XHVCMkU0XCIpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBoZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLmNvbmZpZy5hcGlLZXkpIHtcbiAgICAgICAgaGVhZGVyc1tcIkF1dGhvcml6YXRpb25cIl0gPSBgQmVhcmVyICR7dGhpcy5jb25maWcuYXBpS2V5fWA7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcmVxdWVzdFVybCh7XG4gICAgICAgIHVybDogdGhpcy5jb25maWcuYXBpVXJsLFxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBoZWFkZXJzLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgbW9kZWw6IHRoaXMuY29uZmlnLm1vZGVsLFxuICAgICAgICAgIGlucHV0OiB0ZXh0LFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBkYXRhID0gcmVzcG9uc2UuanNvbiBhcyBDdXN0b21FbWJlZGRpbmdSZXNwb25zZSB8IG51bWJlcltdO1xuICAgICAgXG4gICAgICAvLyBPcGVuQUkgXHVENjM4XHVENjU4IFx1RDYxNVx1QzJERFxuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGRhdGEpICYmIGRhdGEuZGF0YT8uWzBdPy5lbWJlZGRpbmcpIHtcbiAgICAgICAgcmV0dXJuIGRhdGEuZGF0YVswXS5lbWJlZGRpbmc7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC8vIFx1QzlDMVx1QzgxMSBcdUJDMzBcdUM1RjQgXHVCQzE4XHVENjU4XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH1cblxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXHVDRUU0XHVDMkE0XHVEMTQwIEFQSSBcdUM3NTFcdUIyRjUgXHVENjE1XHVDMkREXHVDNzQ0IFx1RDMwQ1x1QzJGMVx1RDU2MCBcdUMyMTggXHVDNUM2XHVDMkI1XHVCMkM4XHVCMkU0XCIpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiXHVDRUU0XHVDMkE0XHVEMTQwIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUMwRERcdUMxMzEgXHVDMkU0XHVEMzI4OlwiLCBlcnJvcik7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogXHVDNUVDXHVCN0VDIFx1RDE0RFx1QzJBNFx1RDJCOFx1Qjk3QyBcdUJDMzBcdUNFNThcdUI4NUMgXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QzBERFx1QzEzMVxuICAgKi9cbiAgYXN5bmMgZW1iZWRCYXRjaCh0ZXh0czogc3RyaW5nW10pOiBQcm9taXNlPG51bWJlcltdW10+IHtcbiAgICBjb25zdCBlbWJlZGRpbmdzOiBudW1iZXJbXVtdID0gW107XG5cbiAgICBmb3IgKGNvbnN0IHRleHQgb2YgdGV4dHMpIHtcbiAgICAgIGNvbnN0IGVtYmVkZGluZyA9IGF3YWl0IHRoaXMuZW1iZWQodGV4dCk7XG4gICAgICBlbWJlZGRpbmdzLnB1c2goZW1iZWRkaW5nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZW1iZWRkaW5ncztcbiAgfVxufVxuIiwgIi8vIFx1QjlDOFx1RDA2Q1x1QjJFNFx1QzZCNCBcdUQzMENcdUMxMUMgLSBmcm9udG1hdHRlciwgXHVEMERDXHVBREY4LCBcdUI5QzFcdUQwNkMgXHVDRDk0XHVDRDlDXG5cbmltcG9ydCBtYXR0ZXIgZnJvbSBcImdyYXktbWF0dGVyXCI7XG5pbXBvcnQgeyBjcmVhdGVIYXNoIH0gZnJvbSBcImNyeXB0b1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBhcnNlZE5vdGUge1xuICBjb250ZW50OiBzdHJpbmc7XG4gIGZyb250bWF0dGVyOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbiAgdGFnczogc3RyaW5nW107XG4gIGxpbmtzOiBzdHJpbmdbXTtcbiAgdGl0bGU6IHN0cmluZztcbiAgc2VjdGlvbnM6IFNlY3Rpb25bXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTZWN0aW9uIHtcbiAgaGVhZGluZzogc3RyaW5nO1xuICBjb250ZW50OiBzdHJpbmc7XG4gIGxldmVsOiBudW1iZXI7XG4gIHBvc2l0aW9uOiBudW1iZXI7XG59XG5cbi8qKlxuICogXHVCOUM4XHVEMDZDXHVCMkU0XHVDNkI0IFx1RDMwQ1x1Qzc3Q1x1Qzc0NCBcdUQzMENcdUMyRjFcdUQ1NThcdUM1RUMgXHVCQTU0XHVEMEMwXHVCMzcwXHVDNzc0XHVEMTMwXHVCOTdDIFx1Q0Q5NFx1Q0Q5Q1x1RDU2OVx1QjJDOFx1QjJFNC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTWFya2Rvd24oZmlsZVBhdGg6IHN0cmluZywgY29udGVudDogc3RyaW5nKTogUGFyc2VkTm90ZSB7XG4gIC8vIEZyb250bWF0dGVyIFx1RDMwQ1x1QzJGMVxuICBjb25zdCBwYXJzZWQgPSBtYXR0ZXIoY29udGVudCk7XG4gIGNvbnN0IGZyb250bWF0dGVyID0gcGFyc2VkLmRhdGEgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG4gIGNvbnN0IGJvZHlDb250ZW50ID0gcGFyc2VkLmNvbnRlbnQ7XG5cbiAgLy8gXHVDODFDXHVCQUE5IFx1Q0Q5NFx1Q0Q5QyAoZnJvbnRtYXR0ZXJcdUM3NTggdGl0bGUgXHVCNjEwXHVCMjk0IFx1RDMwQ1x1Qzc3Q1x1QkE4NSlcbiAgY29uc3QgdGl0bGUgPSAoZnJvbnRtYXR0ZXIudGl0bGUgYXMgc3RyaW5nKSB8fCBleHRyYWN0VGl0bGVGcm9tUGF0aChmaWxlUGF0aCk7XG5cbiAgLy8gXHVEMERDXHVBREY4IFx1Q0Q5NFx1Q0Q5QyAoI1x1RDBEQ1x1QURGOCBcdUQ2MTVcdUMyREQpXG4gIGNvbnN0IHRhZ3MgPSBleHRyYWN0VGFncyhib2R5Q29udGVudCwgZnJvbnRtYXR0ZXIpO1xuXG4gIC8vIFx1QjlDMVx1RDA2QyBcdUNEOTRcdUNEOUMgKFtbXHVCOUMxXHVEMDZDXV0gXHVENjE1XHVDMkREKVxuICBjb25zdCBsaW5rcyA9IGV4dHJhY3RMaW5rcyhib2R5Q29udGVudCk7XG5cbiAgLy8gXHVDMTM5XHVDMTU4IFx1QkQ4NFx1QjlBQ1xuICBjb25zdCBzZWN0aW9ucyA9IGV4dHJhY3RTZWN0aW9ucyhib2R5Q29udGVudCk7XG5cbiAgcmV0dXJuIHtcbiAgICBjb250ZW50OiBib2R5Q29udGVudCxcbiAgICBmcm9udG1hdHRlcixcbiAgICB0YWdzLFxuICAgIGxpbmtzLFxuICAgIHRpdGxlLFxuICAgIHNlY3Rpb25zLFxuICB9O1xufVxuXG4vKipcbiAqIFx1RDMwQ1x1Qzc3QyBcdUFDQkRcdUI4NUNcdUM1RDBcdUMxMUMgXHVDODFDXHVCQUE5IFx1Q0Q5NFx1Q0Q5Q1xuICovXG5mdW5jdGlvbiBleHRyYWN0VGl0bGVGcm9tUGF0aChmaWxlUGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgZmlsZU5hbWUgPSBmaWxlUGF0aC5zcGxpdChcIi9cIikucG9wKCkgfHwgXCJcIjtcbiAgcmV0dXJuIGZpbGVOYW1lLnJlcGxhY2UoL1xcLm1kJC8sIFwiXCIpO1xufVxuXG4vKipcbiAqIFx1QkNGOFx1QkIzOFx1QUNGQyBmcm9udG1hdHRlclx1QzVEMFx1QzExQyBcdUQwRENcdUFERjggXHVDRDk0XHVDRDlDXG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3RUYWdzKGNvbnRlbnQ6IHN0cmluZywgZnJvbnRtYXR0ZXI6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogc3RyaW5nW10ge1xuICBjb25zdCB0YWdzID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cbiAgLy8gRnJvbnRtYXR0ZXJcdUM3NTggdGFncyBcdUQ1NDRcdUI0RENcbiAgaWYgKEFycmF5LmlzQXJyYXkoZnJvbnRtYXR0ZXIudGFncykpIHtcbiAgICBmcm9udG1hdHRlci50YWdzLmZvckVhY2goKHRhZykgPT4ge1xuICAgICAgaWYgKHR5cGVvZiB0YWcgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdGFncy5hZGQodGFnLnJlcGxhY2UoL14jLywgXCJcIikpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gXHVCQ0Y4XHVCQjM4XHVDNUQwXHVDMTFDICNcdUQwRENcdUFERjggXHVDRDk0XHVDRDlDXG4gIGNvbnN0IGhhc2h0YWdSZWdleCA9IC8jKFthLXpBLVowLTlcdUFDMDAtXHVEN0EzXy1dKykvZztcbiAgbGV0IG1hdGNoO1xuICB3aGlsZSAoKG1hdGNoID0gaGFzaHRhZ1JlZ2V4LmV4ZWMoY29udGVudCkpICE9PSBudWxsKSB7XG4gICAgdGFncy5hZGQobWF0Y2hbMV0pO1xuICB9XG5cbiAgcmV0dXJuIEFycmF5LmZyb20odGFncyk7XG59XG5cbi8qKlxuICogT2JzaWRpYW4gXHVCOUMxXHVEMDZDIFx1Q0Q5NFx1Q0Q5QyAoW1tcdUI5QzFcdUQwNkNdXSBcdUQ2MTVcdUMyREQpXG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3RMaW5rcyhjb250ZW50OiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gIGNvbnN0IGxpbmtzID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gIGNvbnN0IGxpbmtSZWdleCA9IC9cXFtcXFsoW15cXF1dKylcXF1cXF0vZztcbiAgbGV0IG1hdGNoO1xuICB3aGlsZSAoKG1hdGNoID0gbGlua1JlZ2V4LmV4ZWMoY29udGVudCkpICE9PSBudWxsKSB7XG4gICAgLy8gXHVCQ0M0XHVDRTZEIFx1Q0M5OFx1QjlBQyBbW1x1QjlDMVx1RDA2Q3xcdUJDQzRcdUNFNkRdXVxuICAgIGNvbnN0IGxpbmsgPSBtYXRjaFsxXS5zcGxpdChcInxcIilbMF0udHJpbSgpO1xuICAgIGxpbmtzLmFkZChsaW5rKTtcbiAgfVxuICByZXR1cm4gQXJyYXkuZnJvbShsaW5rcyk7XG59XG5cbi8qKlxuICogXHVENUU0XHVCMzU0IFx1QUUzMFx1QzkwMFx1QzczQ1x1Qjg1QyBcdUMxMzlcdUMxNTggXHVCRDg0XHVCOUFDXG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3RTZWN0aW9ucyhjb250ZW50OiBzdHJpbmcpOiBTZWN0aW9uW10ge1xuICBjb25zdCBzZWN0aW9uczogU2VjdGlvbltdID0gW107XG4gIGNvbnN0IGxpbmVzID0gY29udGVudC5zcGxpdChcIlxcblwiKTtcblxuICBsZXQgY3VycmVudFNlY3Rpb246IFNlY3Rpb24gfCBudWxsID0gbnVsbDtcbiAgbGV0IGN1cnJlbnRDb250ZW50OiBzdHJpbmdbXSA9IFtdO1xuICBsZXQgcG9zaXRpb24gPSAwO1xuXG4gIGZvciAoY29uc3QgbGluZSBvZiBsaW5lcykge1xuICAgIGNvbnN0IGhlYWRlck1hdGNoID0gbGluZS5tYXRjaCgvXigjezEsNn0pXFxzKyguKykkLyk7XG5cbiAgICBpZiAoaGVhZGVyTWF0Y2gpIHtcbiAgICAgIC8vIFx1Qzc3NFx1QzgwNCBcdUMxMzlcdUMxNTggXHVDODAwXHVDN0E1XG4gICAgICBpZiAoY3VycmVudFNlY3Rpb24pIHtcbiAgICAgICAgY3VycmVudFNlY3Rpb24uY29udGVudCA9IGN1cnJlbnRDb250ZW50LmpvaW4oXCJcXG5cIikudHJpbSgpO1xuICAgICAgICBzZWN0aW9ucy5wdXNoKGN1cnJlbnRTZWN0aW9uKTtcbiAgICAgIH1cblxuICAgICAgLy8gXHVDMEM4IFx1QzEzOVx1QzE1OCBcdUMyRENcdUM3OTFcbiAgICAgIGN1cnJlbnRTZWN0aW9uID0ge1xuICAgICAgICBoZWFkaW5nOiBoZWFkZXJNYXRjaFsyXS50cmltKCksXG4gICAgICAgIGNvbnRlbnQ6IFwiXCIsXG4gICAgICAgIGxldmVsOiBoZWFkZXJNYXRjaFsxXS5sZW5ndGgsXG4gICAgICAgIHBvc2l0aW9uLFxuICAgICAgfTtcbiAgICAgIGN1cnJlbnRDb250ZW50ID0gW107XG4gICAgfSBlbHNlIGlmIChjdXJyZW50U2VjdGlvbikge1xuICAgICAgY3VycmVudENvbnRlbnQucHVzaChsaW5lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gXHVENUU0XHVCMzU0IFx1QzVDNlx1QjI5NCBcdUNDQUIgXHVCRDgwXHVCRDg0XG4gICAgICBpZiAoc2VjdGlvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGN1cnJlbnRTZWN0aW9uID0ge1xuICAgICAgICAgIGhlYWRpbmc6IFwiXCIsXG4gICAgICAgICAgY29udGVudDogXCJcIixcbiAgICAgICAgICBsZXZlbDogMCxcbiAgICAgICAgICBwb3NpdGlvbixcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGN1cnJlbnRDb250ZW50LnB1c2gobGluZSk7XG4gICAgfVxuXG4gICAgcG9zaXRpb24gKz0gbGluZS5sZW5ndGggKyAxOyAvLyArMSBmb3IgbmV3bGluZVxuICB9XG5cbiAgLy8gXHVCOUM4XHVDOUMwXHVCOUM5IFx1QzEzOVx1QzE1OCBcdUM4MDBcdUM3QTVcbiAgaWYgKGN1cnJlbnRTZWN0aW9uKSB7XG4gICAgY3VycmVudFNlY3Rpb24uY29udGVudCA9IGN1cnJlbnRDb250ZW50LmpvaW4oXCJcXG5cIikudHJpbSgpO1xuICAgIHNlY3Rpb25zLnB1c2goY3VycmVudFNlY3Rpb24pO1xuICB9XG5cbiAgcmV0dXJuIHNlY3Rpb25zO1xufVxuXG4vKipcbiAqIFx1RDMwQ1x1Qzc3QyBcdUIwQjRcdUM2QTlcdUM3NTggXHVENTc0XHVDMkRDIFx1QzBERFx1QzEzMVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tcHV0ZUhhc2goY29udGVudDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGNyZWF0ZUhhc2goXCJzaGEyNTZcIikudXBkYXRlKGNvbnRlbnQpLmRpZ2VzdChcImhleFwiKTtcbn1cbiIsICIvLyBcdUJCMzhcdUMxMUMgXHVDQ0FEXHVEMEI5IFx1Qjg1Q1x1QzlDMSAtIFx1RDE0RFx1QzJBNFx1RDJCOFx1Qjk3QyBcdUM4MDFcdUM4MDhcdUQ1NUMgXHVEMDZDXHVBRTMwXHVCODVDIFx1QkQ4NFx1RDU2MFxuXG5pbXBvcnQgeyBDaHVuayB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyBTZWN0aW9uIH0gZnJvbSBcIi4vcGFyc2VyXCI7XG5cbi8qKlxuICogXHVBQzA0XHVCMkU4XHVENTVDIFx1RDFBMFx1RDA3MCBcdUNFNzRcdUM2QjRcdUQxMzAgKFx1QUNGNVx1QkMzMSBcdUFFMzBcdUM5MDAgXHVBREZDXHVDMEFDXHVDRTU4KVxuICogXHVDQzM4XHVBQ0UwOiBcdUQ1NUNcdUFFMDBcdUFDRkMgXHVDNjAxXHVDNUI0XHVCOTdDIFx1QkQ4NFx1QjlBQ1x1RDU1OFx1QzVFQyBcdUNFNzRcdUM2QjRcdUQyQjhcdUQ1NThcdUM1RUMgXHVDNzc0XHVDOTExIFx1Q0U3NFx1QzZCNFx1RDJCOCBcdUJDMjlcdUM5QzBcbiAqL1xuZnVuY3Rpb24gZXN0aW1hdGVUb2tlbkNvdW50KHRleHQ6IHN0cmluZyk6IG51bWJlciB7XG4gIC8vIFx1RDU1Q1x1QUUwMCBcdUJCMzhcdUM3OTAgXHVDODFDXHVBQzcwIFx1RDZDNCBcdUM2MDFcdUM1QjQvXHVDMjJCXHVDNzkwIFx1QjJFOFx1QzVCNCBcdUNFNzRcdUM2QjRcdUQyQjhcbiAgY29uc3Qgbm9uS29yZWFuVGV4dCA9IHRleHQucmVwbGFjZSgvW1x1QUMwMC1cdUQ3QTNdL2csIFwiIFwiKTtcbiAgY29uc3Qgd29yZHMgPSBub25Lb3JlYW5UZXh0LnNwbGl0KC9cXHMrLykuZmlsdGVyKCh3KSA9PiB3Lmxlbmd0aCA+IDApLmxlbmd0aDtcbiAgXG4gIC8vIFx1RDU1Q1x1QUUwMCBcdUJCMzhcdUM3OTBcdUI5Q0MgXHVDRTc0XHVDNkI0XHVEMkI4XG4gIGNvbnN0IGtvcmVhbkNoYXJzID0gKHRleHQubWF0Y2goL1tcdUFDMDAtXHVEN0EzXS9nKSB8fCBbXSkubGVuZ3RoO1xuICBcbiAgLy8gXHVDNjAxXHVDNUI0XHVCMjk0IDFcdUIyRThcdUM1QjQgXHUyMjQ4IDEuMyBcdUQxQTBcdUQwNzAsIFx1RDU1Q1x1QUUwMFx1Qzc0MCAxXHVDNzRDXHVDODA4IFx1MjI0OCAxIFx1RDFBMFx1RDA3MCBcdUFERkNcdUMwQUNcbiAgcmV0dXJuIE1hdGguY2VpbCh3b3JkcyAqIDEuMyArIGtvcmVhbkNoYXJzKTtcbn1cblxuLyoqXG4gKiBcdUQxNERcdUMyQTRcdUQyQjhcdUI5N0MgXHVDQ0FEXHVEMDZDXHVCODVDIFx1QkQ4NFx1RDU2MFxuICovXG5leHBvcnQgZnVuY3Rpb24gY2h1bmtUZXh0KFxuICBub3RlSWQ6IHN0cmluZyxcbiAgc2VjdGlvbnM6IFNlY3Rpb25bXSxcbiAgb3B0aW9uczoge1xuICAgIGNodW5rU2l6ZT86IG51bWJlcjtcbiAgICBjaHVua092ZXJsYXA/OiBudW1iZXI7XG4gIH0gPSB7fVxuKTogQ2h1bmtbXSB7XG4gIGNvbnN0IGNodW5rU2l6ZSA9IG9wdGlvbnMuY2h1bmtTaXplIHx8IDQwMDtcbiAgY29uc3QgY2h1bmtPdmVybGFwID0gb3B0aW9ucy5jaHVua092ZXJsYXAgfHwgNTA7XG4gIGNvbnN0IGNodW5rczogQ2h1bmtbXSA9IFtdO1xuXG4gIGZvciAoY29uc3Qgc2VjdGlvbiBvZiBzZWN0aW9ucykge1xuICAgIGNvbnN0IHNlY3Rpb25UZXh0ID0gc2VjdGlvbi5oZWFkaW5nXG4gICAgICA/IGAjICR7c2VjdGlvbi5oZWFkaW5nfVxcblxcbiR7c2VjdGlvbi5jb250ZW50fWBcbiAgICAgIDogc2VjdGlvbi5jb250ZW50O1xuXG4gICAgaWYgKCFzZWN0aW9uVGV4dC50cmltKCkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGNvbnN0IHRva2VuQ291bnQgPSBlc3RpbWF0ZVRva2VuQ291bnQoc2VjdGlvblRleHQpO1xuXG4gICAgLy8gXHVDMTM5XHVDMTU4XHVDNzc0IFx1Q0NBRFx1RDA2QyBcdUQwNkNcdUFFMzBcdUJDRjRcdUIyRTQgXHVDNzkxXHVDNzNDXHVCQTc0IFx1QURGOFx1QjMwMFx1Qjg1QyBcdUMwQUNcdUM2QTlcbiAgICBpZiAodG9rZW5Db3VudCA8PSBjaHVua1NpemUpIHtcbiAgICAgIGNodW5rcy5wdXNoKHtcbiAgICAgICAgaWQ6IGAke25vdGVJZH0tY2h1bmstJHtjaHVua3MubGVuZ3RofWAsXG4gICAgICAgIG5vdGVJZCxcbiAgICAgICAgdGV4dDogc2VjdGlvblRleHQsXG4gICAgICAgIHBvc2l0aW9uOiBzZWN0aW9uLnBvc2l0aW9uLFxuICAgICAgICB0b2tlbkNvdW50LFxuICAgICAgICBzZWN0aW9uOiBzZWN0aW9uLmhlYWRpbmcsXG4gICAgICB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIFx1QzEzOVx1QzE1OFx1Qzc3NCBcdUQwNkNcdUJBNzQgXHVCQjM4XHVDN0E1IFx1QjJFOFx1QzcwNFx1Qjg1QyBcdUJEODRcdUQ1NjBcbiAgICBjb25zdCBzZW50ZW5jZXMgPSBzcGxpdEludG9TZW50ZW5jZXMoc2VjdGlvblRleHQpO1xuICAgIGxldCBjdXJyZW50Q2h1bms6IHN0cmluZ1tdID0gW107XG4gICAgbGV0IGN1cnJlbnRUb2tlbnMgPSAwO1xuXG4gICAgZm9yIChjb25zdCBzZW50ZW5jZSBvZiBzZW50ZW5jZXMpIHtcbiAgICAgIGNvbnN0IHNlbnRlbmNlVG9rZW5zID0gZXN0aW1hdGVUb2tlbkNvdW50KHNlbnRlbmNlKTtcblxuICAgICAgLy8gXHVENjA0XHVDN0FDIFx1Q0NBRFx1RDA2Q1x1QzVEMCBcdUNEOTRcdUFDMDAgXHVBQzAwXHVCMkE1XHVENTVDXHVDOUMwIFx1RDY1NVx1Qzc3OFxuICAgICAgaWYgKGN1cnJlbnRUb2tlbnMgKyBzZW50ZW5jZVRva2VucyA8PSBjaHVua1NpemUpIHtcbiAgICAgICAgY3VycmVudENodW5rLnB1c2goc2VudGVuY2UpO1xuICAgICAgICBjdXJyZW50VG9rZW5zICs9IHNlbnRlbmNlVG9rZW5zO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gXHVENjA0XHVDN0FDIFx1Q0NBRFx1RDA2QyBcdUM4MDBcdUM3QTVcbiAgICAgICAgaWYgKGN1cnJlbnRDaHVuay5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgY29uc3QgY2h1bmtUZXh0ID0gY3VycmVudENodW5rLmpvaW4oXCIgXCIpO1xuICAgICAgICAgIGNodW5rcy5wdXNoKHtcbiAgICAgICAgICAgIGlkOiBgJHtub3RlSWR9LWNodW5rLSR7Y2h1bmtzLmxlbmd0aH1gLFxuICAgICAgICAgICAgbm90ZUlkLFxuICAgICAgICAgICAgdGV4dDogY2h1bmtUZXh0LFxuICAgICAgICAgICAgcG9zaXRpb246IHNlY3Rpb24ucG9zaXRpb24sXG4gICAgICAgICAgICB0b2tlbkNvdW50OiBjdXJyZW50VG9rZW5zLFxuICAgICAgICAgICAgc2VjdGlvbjogc2VjdGlvbi5oZWFkaW5nLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gXHVDNjI0XHVCQzg0XHVCN0E5XHVDNzQ0IFx1QzcwNFx1RDU3NCBcdUI5QzhcdUM5QzBcdUI5QzkgXHVCQTg3IFx1QkIzOFx1QzdBNSBcdUM3MjBcdUM5QzBcbiAgICAgICAgICBjb25zdCBvdmVybGFwU2VudGVuY2VzID0gZ2V0T3ZlcmxhcFNlbnRlbmNlcyhjdXJyZW50Q2h1bmssIGNodW5rT3ZlcmxhcCk7XG4gICAgICAgICAgY3VycmVudENodW5rID0gb3ZlcmxhcFNlbnRlbmNlcztcbiAgICAgICAgICBjdXJyZW50VG9rZW5zID0gZXN0aW1hdGVUb2tlbkNvdW50KGN1cnJlbnRDaHVuay5qb2luKFwiIFwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBcdUMwQzggXHVDQ0FEXHVEMDZDIFx1QzJEQ1x1Qzc5MVxuICAgICAgICBjdXJyZW50Q2h1bmsucHVzaChzZW50ZW5jZSk7XG4gICAgICAgIGN1cnJlbnRUb2tlbnMgKz0gc2VudGVuY2VUb2tlbnM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gXHVCOUM4XHVDOUMwXHVCOUM5IFx1Q0NBRFx1RDA2QyBcdUM4MDBcdUM3QTVcbiAgICBpZiAoY3VycmVudENodW5rLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGNodW5rVGV4dCA9IGN1cnJlbnRDaHVuay5qb2luKFwiIFwiKTtcbiAgICAgIGNodW5rcy5wdXNoKHtcbiAgICAgICAgaWQ6IGAke25vdGVJZH0tY2h1bmstJHtjaHVua3MubGVuZ3RofWAsXG4gICAgICAgIG5vdGVJZCxcbiAgICAgICAgdGV4dDogY2h1bmtUZXh0LFxuICAgICAgICBwb3NpdGlvbjogc2VjdGlvbi5wb3NpdGlvbixcbiAgICAgICAgdG9rZW5Db3VudDogY3VycmVudFRva2VucyxcbiAgICAgICAgc2VjdGlvbjogc2VjdGlvbi5oZWFkaW5nLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNodW5rcztcbn1cblxuLyoqXG4gKiBcdUQxNERcdUMyQTRcdUQyQjhcdUI5N0MgXHVCQjM4XHVDN0E1XHVDNzNDXHVCODVDIFx1QkQ4NFx1RDU2MCAoXHVBQzA0XHVCMkU4XHVENTVDIFx1QkM4NFx1QzgwNClcbiAqIFx1Q0MzOFx1QUNFMDogXHVDNTdEXHVDNUI0KERyLiwgTXIuIFx1QjRGMSlcdUIwOTggXHVDMThDXHVDMjE4XHVDODEwXHVDNUQwXHVDMTFDIFx1QkQ4NFx1RDU2MFx1QjQyMCBcdUMyMTggXHVDNzg4XHVDNzRDXG4gKi9cbmZ1bmN0aW9uIHNwbGl0SW50b1NlbnRlbmNlcyh0ZXh0OiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gIC8vIFx1QjlDOFx1Q0U2OFx1RDQ1QywgXHVCMjkwXHVCMDhDXHVENDVDLCBcdUJCM0NcdUM3NENcdUQ0NUMgXHVCNEE0IFx1QUNGNVx1QkMzMVx1QzczQ1x1Qjg1QyBcdUJEODRcdUQ1NjBcbiAgLy8gXHVDODFDXHVENTVDXHVDMEFDXHVENTZEOiBcdUM1N0RcdUM1QjRcdUIwOTggXHVDMThDXHVDMjE4XHVDODEwXHVDNUQwXHVDMTFDIFx1Qzc5OFx1QkFCQiBcdUJEODRcdUQ1NjBcdUI0MjAgXHVDMjE4IFx1Qzc4OFx1Qzc0Q1xuICBjb25zdCBzZW50ZW5jZXMgPSB0ZXh0LnNwbGl0KC8oWy4hP11cXHMrKS8pLmZpbHRlcigocykgPT4gcy50cmltKCkpO1xuICBjb25zdCByZXN1bHQ6IHN0cmluZ1tdID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZW50ZW5jZXMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICBjb25zdCBzZW50ZW5jZSA9IHNlbnRlbmNlc1tpXTtcbiAgICBjb25zdCBwdW5jdHVhdGlvbiA9IHNlbnRlbmNlc1tpICsgMV0gfHwgXCJcIjtcbiAgICByZXN1bHQucHVzaChzZW50ZW5jZSArIHB1bmN0dWF0aW9uKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQuZmlsdGVyKChzKSA9PiBzLnRyaW0oKSk7XG59XG5cbi8qKlxuICogXHVDNjI0XHVCQzg0XHVCN0E5XHVDNzQ0IFx1QzcwNFx1RDU1QyBcdUI5QzhcdUM5QzBcdUI5QzkgXHVCQjM4XHVDN0E1XHVCNEU0IFx1QUMwMFx1QzgzOFx1QzYyNFx1QUUzMFxuICovXG5mdW5jdGlvbiBnZXRPdmVybGFwU2VudGVuY2VzKHNlbnRlbmNlczogc3RyaW5nW10sIHRhcmdldFRva2VuczogbnVtYmVyKTogc3RyaW5nW10ge1xuICBjb25zdCBvdmVybGFwOiBzdHJpbmdbXSA9IFtdO1xuICBsZXQgdG9rZW5zID0gMDtcblxuICBmb3IgKGxldCBpID0gc2VudGVuY2VzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgY29uc3Qgc2VudGVuY2UgPSBzZW50ZW5jZXNbaV07XG4gICAgY29uc3Qgc2VudGVuY2VUb2tlbnMgPSBlc3RpbWF0ZVRva2VuQ291bnQoc2VudGVuY2UpO1xuXG4gICAgaWYgKHRva2VucyArIHNlbnRlbmNlVG9rZW5zID4gdGFyZ2V0VG9rZW5zKSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBvdmVybGFwLnVuc2hpZnQoc2VudGVuY2UpO1xuICAgIHRva2VucyArPSBzZW50ZW5jZVRva2VucztcbiAgfVxuXG4gIHJldHVybiBvdmVybGFwO1xufVxuIiwgIi8vIFx1Qzc3OFx1QjM3MVx1QzExQyAtIFx1RDMwQ1x1Qzc3QyBcdUMyQTRcdUNFOTQsIFx1RDMwQ1x1QzJGMSwgXHVDQ0FEXHVEMEI5LCBcdUM3ODRcdUJDQTBcdUI1MjksIFx1QzgwMFx1QzdBNVx1Qzc0NCBcdUQxQjVcdUQ1NjlcblxuaW1wb3J0IHsgTWV0YWRhdGFTdG9yZSB9IGZyb20gXCIuL21ldGFkYXRhU3RvcmVcIjtcbmltcG9ydCB7IFZlY3RvclN0b3JlIH0gZnJvbSBcIi4vdmVjdG9yU3RvcmVcIjtcbmltcG9ydCB7IEVtYmVkZGluZ0dlbmVyYXRvciwgRW1iZWRkaW5nQ29uZmlnIH0gZnJvbSBcIi4vZW1iZWRkaW5nc1wiO1xuaW1wb3J0IHsgcGFyc2VNYXJrZG93biwgY29tcHV0ZUhhc2ggfSBmcm9tIFwiLi9wYXJzZXJcIjtcbmltcG9ydCB7IGNodW5rVGV4dCB9IGZyb20gXCIuL2NodW5rZXJcIjtcbmltcG9ydCB7IEluZGV4aW5nQ29uZmlnLCBOb3RlTWV0YWRhdGEsIENodW5rIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IGNyZWF0ZUhhc2ggfSBmcm9tIFwiY3J5cHRvXCI7XG5cbmV4cG9ydCBjbGFzcyBJbmRleGVyIHtcbiAgcHJpdmF0ZSBtZXRhZGF0YVN0b3JlOiBNZXRhZGF0YVN0b3JlO1xuICBwcml2YXRlIHZlY3RvclN0b3JlOiBWZWN0b3JTdG9yZTtcbiAgcHJpdmF0ZSBlbWJlZGRpbmdHZW5lcmF0b3I6IEVtYmVkZGluZ0dlbmVyYXRvcjtcbiAgcHJpdmF0ZSBjb25maWc6IEluZGV4aW5nQ29uZmlnO1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogSW5kZXhpbmdDb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICB0aGlzLm1ldGFkYXRhU3RvcmUgPSBuZXcgTWV0YWRhdGFTdG9yZShjb25maWcubWV0YURiUGF0aCk7XG4gICAgdGhpcy52ZWN0b3JTdG9yZSA9IG5ldyBWZWN0b3JTdG9yZShjb25maWcudmVjdG9yRGJQYXRoKTtcbiAgICBcbiAgICBjb25zdCBlbWJlZGRpbmdDb25maWc6IEVtYmVkZGluZ0NvbmZpZyA9IHtcbiAgICAgIHByb3ZpZGVyOiBjb25maWcuZW1iZWRkaW5nUHJvdmlkZXIsXG4gICAgICBtb2RlbDogY29uZmlnLmVtYmVkZGluZ01vZGVsLFxuICAgICAgYXBpS2V5OiBjb25maWcuZW1iZWRkaW5nQXBpS2V5LFxuICAgICAgYXBpVXJsOiBjb25maWcuZW1iZWRkaW5nQXBpVXJsLFxuICAgIH07XG4gICAgXG4gICAgdGhpcy5lbWJlZGRpbmdHZW5lcmF0b3IgPSBuZXcgRW1iZWRkaW5nR2VuZXJhdG9yKGVtYmVkZGluZ0NvbmZpZyk7XG4gIH1cblxuICAvKipcbiAgICogXHVDRDA4XHVBRTMwXHVENjU0IC0gXHVDNzg0XHVCQ0EwXHVCNTI5IFx1QkFBOFx1QjM3OCBcdUI4NUNcdUI0RENcbiAgICovXG4gIGFzeW5jIGluaXRpYWxpemUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5lbWJlZGRpbmdHZW5lcmF0b3IuaW5pdGlhbGl6ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFx1QjJFOFx1Qzc3QyBcdUQzMENcdUM3N0MgXHVDNzc4XHVCMzcxXHVDMkYxXG4gICAqL1xuICBhc3luYyBpbmRleEZpbGUoZmlsZVBhdGg6IHN0cmluZywgY29udGVudDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIFx1RDMwQ1x1Qzc3QyBcdUQ1NzRcdUMyREMgXHVBQ0M0XHVDMEIwXG4gICAgICBjb25zdCBoYXNoID0gY29tcHV0ZUhhc2goY29udGVudCk7XG5cbiAgICAgIC8vIFx1QUUzMFx1Qzg3NCBcdUIxNzhcdUQyQjggXHVENjU1XHVDNzc4XG4gICAgICBjb25zdCBleGlzdGluZ05vdGUgPSB0aGlzLm1ldGFkYXRhU3RvcmUuZ2V0Tm90ZUJ5UGF0aChmaWxlUGF0aCk7XG4gICAgICBpZiAoZXhpc3RpbmdOb3RlICYmIGV4aXN0aW5nTm90ZS5oYXNoID09PSBoYXNoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBcdUQzMENcdUM3N0MgXHVCQ0MwXHVBQ0JEIFx1QzVDNlx1Qzc0QywgXHVDMkE0XHVEMEI1OiAke2ZpbGVQYXRofWApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFx1QjlDOFx1RDA2Q1x1QjJFNFx1QzZCNCBcdUQzMENcdUMyRjFcbiAgICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlTWFya2Rvd24oZmlsZVBhdGgsIGNvbnRlbnQpO1xuXG4gICAgICAvLyBcdUIxNzhcdUQyQjggSUQgXHVDMEREXHVDMTMxXG4gICAgICBjb25zdCBub3RlSWQgPSB0aGlzLmdlbmVyYXRlTm90ZUlkKGZpbGVQYXRoKTtcblxuICAgICAgLy8gXHVCQTU0XHVEMEMwXHVCMzcwXHVDNzc0XHVEMTMwIFx1QzgwMFx1QzdBNVxuICAgICAgY29uc3Qgbm90ZU1ldGFkYXRhOiBOb3RlTWV0YWRhdGEgPSB7XG4gICAgICAgIGlkOiBub3RlSWQsXG4gICAgICAgIHBhdGg6IGZpbGVQYXRoLFxuICAgICAgICB0aXRsZTogcGFyc2VkLnRpdGxlLFxuICAgICAgICB0YWdzOiBwYXJzZWQudGFncyxcbiAgICAgICAgbGlua3M6IHBhcnNlZC5saW5rcyxcbiAgICAgICAgZnJvbnRtYXR0ZXI6IHBhcnNlZC5mcm9udG1hdHRlcixcbiAgICAgICAgdXBkYXRlZEF0OiBEYXRlLm5vdygpLFxuICAgICAgICBoYXNoLFxuICAgICAgfTtcblxuICAgICAgdGhpcy5tZXRhZGF0YVN0b3JlLnVwc2VydE5vdGUobm90ZU1ldGFkYXRhKTtcblxuICAgICAgLy8gXHVBRTMwXHVDODc0IFx1Q0NBRFx1RDA2QyBcdUMwQURcdUM4MUNcbiAgICAgIGlmIChleGlzdGluZ05vdGUpIHtcbiAgICAgICAgY29uc3Qgb2xkQ2h1bmtzID0gdGhpcy5tZXRhZGF0YVN0b3JlLmdldENodW5rc0J5Tm90ZUlkKG5vdGVJZCk7XG4gICAgICAgIHRoaXMudmVjdG9yU3RvcmUuZGVsZXRlRW1iZWRkaW5ncyhvbGRDaHVua3MubWFwKChjKSA9PiBjLmlkKSk7XG4gICAgICAgIHRoaXMubWV0YWRhdGFTdG9yZS5kZWxldGVDaHVua3NCeU5vdGVJZChub3RlSWQpO1xuICAgICAgfVxuXG4gICAgICAvLyBcdUNDQURcdUQwQjlcbiAgICAgIGNvbnN0IGNodW5rcyA9IGNodW5rVGV4dChub3RlSWQsIHBhcnNlZC5zZWN0aW9ucywge1xuICAgICAgICBjaHVua1NpemU6IHRoaXMuY29uZmlnLmNodW5rU2l6ZSxcbiAgICAgICAgY2h1bmtPdmVybGFwOiB0aGlzLmNvbmZpZy5jaHVua092ZXJsYXAsXG4gICAgICB9KTtcblxuICAgICAgaWYgKGNodW5rcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY29uc29sZS5sb2coYFx1Q0NBRFx1RDA2QyBcdUM1QzZcdUM3NEM6ICR7ZmlsZVBhdGh9YCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gXHVDQ0FEXHVEMDZDIFx1QzgwMFx1QzdBNVxuICAgICAgdGhpcy5tZXRhZGF0YVN0b3JlLmluc2VydENodW5rcyhjaHVua3MpO1xuXG4gICAgICAvLyBcdUM3ODRcdUJDQTBcdUI1MjkgXHVDMEREXHVDMTMxIFx1QkMwRiBcdUM4MDBcdUM3QTVcbiAgICAgIGNvbnNvbGUubG9nKGBcdUM3ODRcdUJDQTBcdUI1MjkgXHVDMEREXHVDMTMxIFx1QzkxMTogJHtmaWxlUGF0aH0gKCR7Y2h1bmtzLmxlbmd0aH1cdUFDMUMgXHVDQ0FEXHVEMDZDKWApO1xuICAgICAgZm9yIChjb25zdCBjaHVuayBvZiBjaHVua3MpIHtcbiAgICAgICAgY29uc3QgZW1iZWRkaW5nID0gYXdhaXQgdGhpcy5lbWJlZGRpbmdHZW5lcmF0b3IuZW1iZWQoY2h1bmsudGV4dCk7XG4gICAgICAgIHRoaXMudmVjdG9yU3RvcmUuc3RvcmVFbWJlZGRpbmcoY2h1bmsuaWQsIGVtYmVkZGluZyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnNvbGUubG9nKGBcdUM3NzhcdUIzNzFcdUMyRjEgXHVDNjQ0XHVCOENDOiAke2ZpbGVQYXRofWApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBcdUM3NzhcdUIzNzFcdUMyRjEgXHVDMkU0XHVEMzI4OiAke2ZpbGVQYXRofWAsIGVycm9yKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBcdUQzMENcdUM3N0MgXHVDMEFEXHVDODFDIFx1Q0M5OFx1QjlBQ1xuICAgKi9cbiAgZGVsZXRlRmlsZShmaWxlUGF0aDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3Qgbm90ZSA9IHRoaXMubWV0YWRhdGFTdG9yZS5nZXROb3RlQnlQYXRoKGZpbGVQYXRoKTtcbiAgICBpZiAoIW5vdGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjaHVua3MgPSB0aGlzLm1ldGFkYXRhU3RvcmUuZ2V0Q2h1bmtzQnlOb3RlSWQobm90ZS5pZCk7XG4gICAgdGhpcy52ZWN0b3JTdG9yZS5kZWxldGVFbWJlZGRpbmdzKGNodW5rcy5tYXAoKGMpID0+IGMuaWQpKTtcbiAgICB0aGlzLm1ldGFkYXRhU3RvcmUuZGVsZXRlQ2h1bmtzQnlOb3RlSWQobm90ZS5pZCk7XG4gICAgdGhpcy5tZXRhZGF0YVN0b3JlLmRlbGV0ZU5vdGUobm90ZS5pZCk7XG5cbiAgICBjb25zb2xlLmxvZyhgXHVEMzBDXHVDNzdDIFx1QzBBRFx1QzgxQyBcdUM2NDRcdUI4Q0M6ICR7ZmlsZVBhdGh9YCk7XG4gIH1cblxuICAvKipcbiAgICogXHVBQzgwXHVDMEM5XG4gICAqL1xuICBhc3luYyBzZWFyY2gocXVlcnk6IHN0cmluZywgaz86IG51bWJlcik6IFByb21pc2U8QXJyYXk8eyBjaHVuazogQ2h1bms7IHNjb3JlOiBudW1iZXIgfT4+IHtcbiAgICBjb25zdCB0b3BLID0gayB8fCB0aGlzLmNvbmZpZy50b3BLO1xuXG4gICAgLy8gXHVDRkZDXHVCOUFDIFx1Qzc4NFx1QkNBMFx1QjUyOSBcdUMwRERcdUMxMzFcbiAgICBjb25zdCBxdWVyeUVtYmVkZGluZyA9IGF3YWl0IHRoaXMuZW1iZWRkaW5nR2VuZXJhdG9yLmVtYmVkKHF1ZXJ5KTtcblxuICAgIC8vIFx1QkNBMVx1RDEzMCBcdUFDODBcdUMwQzlcbiAgICBjb25zdCByZXN1bHRzID0gdGhpcy52ZWN0b3JTdG9yZS5zZWFyY2gocXVlcnlFbWJlZGRpbmcsIHRvcEspO1xuXG4gICAgLy8gXHVDQ0FEXHVEMDZDIFx1QzgxNVx1QkNGNCBcdUNEOTRcdUFDMDBcbiAgICBjb25zdCBzZWFyY2hSZXN1bHRzID0gcmVzdWx0c1xuICAgICAgLm1hcCgocmVzdWx0KSA9PiB7XG4gICAgICAgIGNvbnN0IGNodW5rID0gdGhpcy5tZXRhZGF0YVN0b3JlLmdldENodW5rQnlJZChyZXN1bHQuY2h1bmtJZCk7XG4gICAgICAgIGlmICghY2h1bmspIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGNodW5rLFxuICAgICAgICAgIHNjb3JlOiByZXN1bHQuc2NvcmUsXG4gICAgICAgIH07XG4gICAgICB9KVxuICAgICAgLmZpbHRlcigocikgPT4gciAhPT0gbnVsbCkgYXMgQXJyYXk8eyBjaHVuazogQ2h1bms7IHNjb3JlOiBudW1iZXIgfT47XG5cbiAgICByZXR1cm4gc2VhcmNoUmVzdWx0cztcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUFDODBcdUMwQzkgXHVBQ0IwXHVBQ0ZDXHVDNUQwIFx1QjE3OFx1RDJCOCBcdUJBNTRcdUQwQzBcdUIzNzBcdUM3NzRcdUQxMzAgXHVDRDk0XHVBQzAwXG4gICAqL1xuICBnZXRTZWFyY2hSZXN1bHRzV2l0aE1ldGFkYXRhKFxuICAgIHNlYXJjaFJlc3VsdHM6IEFycmF5PHsgY2h1bms6IENodW5rOyBzY29yZTogbnVtYmVyIH0+XG4gICk6IEFycmF5PHtcbiAgICBjaHVuazogQ2h1bms7XG4gICAgbm90ZTogTm90ZU1ldGFkYXRhO1xuICAgIHNjb3JlOiBudW1iZXI7XG4gIH0+IHtcbiAgICByZXR1cm4gc2VhcmNoUmVzdWx0c1xuICAgICAgLm1hcCgocmVzdWx0KSA9PiB7XG4gICAgICAgIGNvbnN0IG5vdGUgPSB0aGlzLm1ldGFkYXRhU3RvcmUuZ2V0Tm90ZUJ5SWQocmVzdWx0LmNodW5rLm5vdGVJZCk7XG4gICAgICAgIGlmICghbm90ZSkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgY2h1bms6IHJlc3VsdC5jaHVuayxcbiAgICAgICAgICBub3RlLFxuICAgICAgICAgIHNjb3JlOiByZXN1bHQuc2NvcmUsXG4gICAgICAgIH07XG4gICAgICB9KVxuICAgICAgLmZpbHRlcigocikgPT4gciAhPT0gbnVsbCkgYXMgQXJyYXk8e1xuICAgICAgY2h1bms6IENodW5rO1xuICAgICAgbm90ZTogTm90ZU1ldGFkYXRhO1xuICAgICAgc2NvcmU6IG51bWJlcjtcbiAgICB9PjtcbiAgfVxuXG4gIC8qKlxuICAgKiBcdUIxNzhcdUQyQjggSUQgXHVDMEREXHVDMTMxXG4gICAqL1xuICBwcml2YXRlIGdlbmVyYXRlTm90ZUlkKGZpbGVQYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBjcmVhdGVIYXNoKFwic2hhMjU2XCIpLnVwZGF0ZShmaWxlUGF0aCkuZGlnZXN0KFwiaGV4XCIpLnN1YnN0cmluZygwLCAxNik7XG4gIH1cblxuICAvKipcbiAgICogXHVCOUFDXHVDMThDXHVDMkE0IFx1RDU3NFx1QzgxQ1xuICAgKi9cbiAgY2xvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5tZXRhZGF0YVN0b3JlLmNsb3NlKCk7XG4gICAgdGhpcy52ZWN0b3JTdG9yZS5jbG9zZSgpO1xuICB9XG59XG4iLCAiLy8gT2JzaWRpYW4gXHVCQ0ZDXHVEMkI4IFx1RDMwQ1x1Qzc3QyBcdUJDQzBcdUFDQkQgXHVBQzEwXHVDOUMwIFx1QkMwRiBcdUM3OTBcdUIzRDkgXHVDNzc4XHVCMzcxXHVDMkYxXG5cbmltcG9ydCB7IFRGaWxlLCBWYXVsdCwgTm90aWNlIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyBJbmRleGVyIH0gZnJvbSBcIi4vaW5kZXhpbmcvaW5kZXhlclwiO1xuXG5leHBvcnQgY2xhc3MgVmF1bHRXYXRjaGVyIHtcbiAgcHJpdmF0ZSB2YXVsdDogVmF1bHQ7XG4gIHByaXZhdGUgaW5kZXhlcjogSW5kZXhlciB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGlzSW5kZXhpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBpbmRleFF1ZXVlOiBTZXQ8c3RyaW5nPiA9IG5ldyBTZXQoKTtcbiAgcHJpdmF0ZSBpbmRleGluZ0luUHJvZ3Jlc3M6IFNldDxzdHJpbmc+ID0gbmV3IFNldCgpOyAvLyBcdUM5QzRcdUQ1ODkgXHVDOTExXHVDNzc4IFx1Qzc3OFx1QjM3MVx1QzJGMSBcdUNEOTRcdUM4MDFcblxuICBjb25zdHJ1Y3Rvcih2YXVsdDogVmF1bHQpIHtcbiAgICB0aGlzLnZhdWx0ID0gdmF1bHQ7XG4gIH1cblxuICAvKipcbiAgICogXHVDNzc4XHVCMzcxXHVDMTFDIFx1QzEyNFx1QzgxNVxuICAgKi9cbiAgc2V0SW5kZXhlcihpbmRleGVyOiBJbmRleGVyIHwgbnVsbCk6IHZvaWQge1xuICAgIHRoaXMuaW5kZXhlciA9IGluZGV4ZXI7XG4gIH1cblxuICAvKipcbiAgICogXHVDRDA4XHVBRTMwIFx1Qzc3OFx1QjM3MVx1QzJGMSBcdUMyRTRcdUQ1ODlcbiAgICovXG4gIGFzeW5jIGluZGV4VmF1bHQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCF0aGlzLmluZGV4ZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlx1Qzc3OFx1QjM3MVx1QzExQ1x1QUMwMCBcdUNEMDhcdUFFMzBcdUQ2NTRcdUI0MThcdUM5QzAgXHVDNTRBXHVDNTU4XHVDMkI1XHVCMkM4XHVCMkU0XCIpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzSW5kZXhpbmcpIHtcbiAgICAgIG5ldyBOb3RpY2UoXCJcdUM3NzRcdUJCRjggXHVDNzc4XHVCMzcxXHVDMkYxXHVDNzc0IFx1QzlDNFx1RDU4OSBcdUM5MTFcdUM3ODVcdUIyQzhcdUIyRTRcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5pc0luZGV4aW5nID0gdHJ1ZTtcbiAgICBuZXcgTm90aWNlKFwiXHVCQ0ZDXHVEMkI4IFx1Qzc3OFx1QjM3MVx1QzJGMVx1Qzc0NCBcdUMyRENcdUM3OTFcdUQ1NjlcdUIyQzhcdUIyRTQuLi5cIik7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgbWRGaWxlcyA9IHRoaXMudmF1bHQuZ2V0TWFya2Rvd25GaWxlcygpO1xuICAgICAgY29uc29sZS5sb2coYFx1Qzc3OFx1QjM3MVx1QzJGMVx1RDU2MCBcdUQzMENcdUM3N0MgXHVDMjE4OiAke21kRmlsZXMubGVuZ3RofWApO1xuXG4gICAgICBsZXQgaW5kZXhlZCA9IDA7XG4gICAgICBsZXQgZmFpbGVkID0gMDtcblxuICAgICAgZm9yIChjb25zdCBmaWxlIG9mIG1kRmlsZXMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgdGhpcy52YXVsdC5yZWFkKGZpbGUpO1xuICAgICAgICAgIGF3YWl0IHRoaXMuaW5kZXhlci5pbmRleEZpbGUoZmlsZS5wYXRoLCBjb250ZW50KTtcbiAgICAgICAgICBpbmRleGVkKys7XG5cbiAgICAgICAgICAvLyBcdUM5QzRcdUQ1ODkgXHVDMEMxXHVENjY5IFx1RDQ1Q1x1QzJEQyAoMTBcdUFDMUNcdUI5QzhcdUIyRTQpXG4gICAgICAgICAgaWYgKGluZGV4ZWQgJSAxMCA9PT0gMCkge1xuICAgICAgICAgICAgbmV3IE5vdGljZShgXHVDNzc4XHVCMzcxXHVDMkYxIFx1QzlDNFx1RDU4OSBcdUM5MTE6ICR7aW5kZXhlZH0vJHttZEZpbGVzLmxlbmd0aH1gKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihgXHVEMzBDXHVDNzdDIFx1Qzc3OFx1QjM3MVx1QzJGMSBcdUMyRTRcdUQzMjg6ICR7ZmlsZS5wYXRofWAsIGVycm9yKTtcbiAgICAgICAgICBmYWlsZWQrKztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBuZXcgTm90aWNlKGBcdUM3NzhcdUIzNzFcdUMyRjEgXHVDNjQ0XHVCOENDOiAke2luZGV4ZWR9XHVBQzFDIFx1QzEzMVx1QUNGNSwgJHtmYWlsZWR9XHVBQzFDIFx1QzJFNFx1RDMyOGApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiXHVCQ0ZDXHVEMkI4IFx1Qzc3OFx1QjM3MVx1QzJGMSBcdUM5MTEgXHVDNjI0XHVCOTU4OlwiLCBlcnJvcik7XG4gICAgICBuZXcgTm90aWNlKFwiXHVDNzc4XHVCMzcxXHVDMkYxIFx1QzkxMSBcdUM2MjRcdUI5NThcdUFDMDAgXHVCQzFDXHVDMEREXHVENTg4XHVDMkI1XHVCMkM4XHVCMkU0XCIpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLmlzSW5kZXhpbmcgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogXHVEMzBDXHVDNzdDIFx1QzBERFx1QzEzMSBcdUM3NzRcdUJDQTRcdUQyQjggXHVDQzk4XHVCOUFDXG4gICAqL1xuICBhc3luYyBvbkZpbGVDcmVhdGUoZmlsZTogVEZpbGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIXRoaXMuaW5kZXhlciB8fCBmaWxlLmV4dGVuc2lvbiAhPT0gXCJtZFwiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCB0aGlzLnZhdWx0LnJlYWQoZmlsZSk7XG4gICAgICBhd2FpdCB0aGlzLmluZGV4ZXIuaW5kZXhGaWxlKGZpbGUucGF0aCwgY29udGVudCk7XG4gICAgICBjb25zb2xlLmxvZyhgXHVEMzBDXHVDNzdDIFx1QzBERFx1QzEzMSBcdUM3NzhcdUIzNzFcdUMyRjE6ICR7ZmlsZS5wYXRofWApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBcdUQzMENcdUM3N0MgXHVDMEREXHVDMTMxIFx1Qzc3OFx1QjM3MVx1QzJGMSBcdUMyRTRcdUQzMjg6ICR7ZmlsZS5wYXRofWAsIGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogXHVEMzBDXHVDNzdDIFx1QzIxOFx1QzgxNSBcdUM3NzRcdUJDQTRcdUQyQjggXHVDQzk4XHVCOUFDXG4gICAqL1xuICBhc3luYyBvbkZpbGVNb2RpZnkoZmlsZTogVEZpbGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIXRoaXMuaW5kZXhlciB8fCBmaWxlLmV4dGVuc2lvbiAhPT0gXCJtZFwiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gXHVDOTExXHVCQ0Y1IFx1Qzc3OFx1QjM3MVx1QzJGMSBcdUJDMjlcdUM5QzBcdUI5N0MgXHVDNzA0XHVENTc0IFx1RDA1MFx1QzVEMCBcdUNEOTRcdUFDMDBcbiAgICB0aGlzLmluZGV4UXVldWUuYWRkKGZpbGUucGF0aCk7XG5cbiAgICAvLyAxMDBtcyBcdUQ2QzRcdUM1RDAgXHVDNzc4XHVCMzcxXHVDMkYxIChcdUM1RjBcdUMxOEQgXHVDMjE4XHVDODE1IFx1QkMyOVx1QzlDMClcbiAgICBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgIGlmICh0aGlzLmluZGV4UXVldWUuaGFzKGZpbGUucGF0aCkgJiYgIXRoaXMuaW5kZXhpbmdJblByb2dyZXNzLmhhcyhmaWxlLnBhdGgpKSB7XG4gICAgICAgIHRoaXMuaW5kZXhRdWV1ZS5kZWxldGUoZmlsZS5wYXRoKTtcbiAgICAgICAgdGhpcy5pbmRleGluZ0luUHJvZ3Jlc3MuYWRkKGZpbGUucGF0aCk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgdGhpcy52YXVsdC5yZWFkKGZpbGUpO1xuICAgICAgICAgIGlmICh0aGlzLmluZGV4ZXIpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuaW5kZXhlci5pbmRleEZpbGUoZmlsZS5wYXRoLCBjb250ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc29sZS5sb2coYFx1RDMwQ1x1Qzc3QyBcdUMyMThcdUM4MTUgXHVDNzc4XHVCMzcxXHVDMkYxOiAke2ZpbGUucGF0aH1gKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGBcdUQzMENcdUM3N0MgXHVDMjE4XHVDODE1IFx1Qzc3OFx1QjM3MVx1QzJGMSBcdUMyRTRcdUQzMjg6ICR7ZmlsZS5wYXRofWAsIGVycm9yKTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICB0aGlzLmluZGV4aW5nSW5Qcm9ncmVzcy5kZWxldGUoZmlsZS5wYXRoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIDEwMCk7XG4gIH1cblxuICAvKipcbiAgICogXHVEMzBDXHVDNzdDIFx1QzBBRFx1QzgxQyBcdUM3NzRcdUJDQTRcdUQyQjggXHVDQzk4XHVCOUFDXG4gICAqL1xuICBvbkZpbGVEZWxldGUoZmlsZTogVEZpbGUpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaW5kZXhlciB8fCBmaWxlLmV4dGVuc2lvbiAhPT0gXCJtZFwiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuaW5kZXhlci5kZWxldGVGaWxlKGZpbGUucGF0aCk7XG4gICAgICBjb25zb2xlLmxvZyhgXHVEMzBDXHVDNzdDIFx1QzBBRFx1QzgxQyBcdUNDOThcdUI5QUM6ICR7ZmlsZS5wYXRofWApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBcdUQzMENcdUM3N0MgXHVDMEFEXHVDODFDIFx1Q0M5OFx1QjlBQyBcdUMyRTRcdUQzMjg6ICR7ZmlsZS5wYXRofWAsIGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogXHVEMzBDXHVDNzdDIFx1Qzc3NFx1Qjk4NCBcdUJDQzBcdUFDQkQgXHVDNzc0XHVCQ0E0XHVEMkI4IFx1Q0M5OFx1QjlBQ1xuICAgKi9cbiAgYXN5bmMgb25GaWxlUmVuYW1lKGZpbGU6IFRGaWxlLCBvbGRQYXRoOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIXRoaXMuaW5kZXhlciB8fCBmaWxlLmV4dGVuc2lvbiAhPT0gXCJtZFwiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIC8vIFx1Qzc3NFx1QzgwNCBcdUQzMENcdUM3N0MgXHVDMEFEXHVDODFDXG4gICAgICB0aGlzLmluZGV4ZXIuZGVsZXRlRmlsZShvbGRQYXRoKTtcblxuICAgICAgLy8gXHVDMEM4IFx1RDMwQ1x1Qzc3QyBcdUM3NzhcdUIzNzFcdUMyRjFcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCB0aGlzLnZhdWx0LnJlYWQoZmlsZSk7XG4gICAgICBpZiAodGhpcy5pbmRleGVyKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuaW5kZXhlci5pbmRleEZpbGUoZmlsZS5wYXRoLCBjb250ZW50KTtcbiAgICAgIH1cblxuICAgICAgY29uc29sZS5sb2coYFx1RDMwQ1x1Qzc3QyBcdUM3NzRcdUI5ODQgXHVCQ0MwXHVBQ0JEIFx1Q0M5OFx1QjlBQzogJHtvbGRQYXRofSAtPiAke2ZpbGUucGF0aH1gKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihgXHVEMzBDXHVDNzdDIFx1Qzc3NFx1Qjk4NCBcdUJDQzBcdUFDQkQgXHVDQzk4XHVCOUFDIFx1QzJFNFx1RDMyODogJHtvbGRQYXRofSAtPiAke2ZpbGUucGF0aH1gLCBlcnJvcik7XG4gICAgfVxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBLDRDQUFBQSxVQUFBO0FBQUE7QUFFQSxJQUFBQSxTQUFRLG1CQUFtQixDQUFDQyxVQUFTLFFBQVE7QUFDNUMsVUFBSSxRQUFRO0FBQ1osVUFBSSxPQUFPQSxZQUFXLFFBQVEsUUFBUUEsU0FBUSxHQUFHLE9BQU8sV0FBVztBQUNsRSxjQUFNLElBQUksVUFBVSxpQkFBaUIsR0FBRywwQkFBMEI7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VUFBVSxFQUFFO0FBQUEsSUFDdEMsU0FBUyxPQUFPO0FBQ2QsWUFBTSxVQUFVLGlCQUFpQixRQUFRLE1BQU0sVUFBVSxPQUFPLEtBQUs7QUFDckUsVUFBSSx3QkFBTyw4QkFBVSxPQUFPLEVBQUU7QUFBQSxJQUNoQztBQUFBLEVBQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUtRLHFCQUF5QztBQUMvQyxVQUFNLFNBQVMsa0JBQWtCLEtBQUssU0FBUyxpQkFBaUI7QUFDaEUsV0FBTyxpQ0FBUTtBQUFBLEVBQ2pCO0FBQ0Y7IiwKICAibmFtZXMiOiBbImV4cG9ydHMiLCAib3B0aW9ucyIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJqb2luIiwgInBhdGgiLCAiaSIsICJleHBvcnRzIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgIm9wdGlvbnMiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAib3B0aW9ucyIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJvcHRpb25zIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgIm9wdGlvbnMiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAib3B0aW9ucyIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJzdHIiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiRGF0YWJhc2UiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiRGF0YWJhc2UiLCAib3B0aW9ucyIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJvcHRpb25zIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgIm9wdGlvbnMiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAicmVxdWlyZV9mdW5jdGlvbiIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJvcHRpb25zIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgIm9wdGlvbnMiLCAic3RyIiwgInN0cmluZyIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJyZXF1aXJlX2pzX3lhbWwiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAieWFtbCIsICJvcHRpb25zIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgInN0ciIsICJleHBvcnRzIiwgInN0ciIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJlbmdpbmVzIiwgIm9wdGlvbnMiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAib3B0aW9ucyIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJvcHRpb25zIiwgInN0ciIsICJtYXR0ZXIiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAib3B0aW9ucyIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJvcHRpb25zIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgInN0ciIsICJvcHRpb25zIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImVuZ2luZXMiLCAicGFyc2UiLCAibWF0dGVyIiwgIm9wdGlvbnMiLCAic3RyIiwgImltcG9ydF9vYnNpZGlhbiIsICJpbXBvcnRfb2JzaWRpYW4iLCAidGV4dCIsICJfYSIsICJpbXBvcnRfb2JzaWRpYW4iLCAiaW1wb3J0X29ic2lkaWFuIiwgImltcG9ydF9vYnNpZGlhbiIsICJvcHRpb25zIiwgIl9hIiwgImltcG9ydF9vYnNpZGlhbiIsICJEYXRhYmFzZSIsICJjaHVua3MiLCAiaW1wb3J0X2JldHRlcl9zcWxpdGUzIiwgIkRhdGFiYXNlIiwgImVtYmVkZGluZ3MiLCAiaW1wb3J0X29ic2lkaWFuIiwgIm1vZHVsZSIsICJtYXR0ZXIiLCAib3B0aW9ucyIsICJjaHVua1RleHQiLCAiaW1wb3J0X2NyeXB0byIsICJpbXBvcnRfb2JzaWRpYW4iXQp9Cg==
