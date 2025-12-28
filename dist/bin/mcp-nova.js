#!/usr/bin/env node
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
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
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// node_modules/commander/lib/error.js
var require_error = __commonJS({
  "node_modules/commander/lib/error.js"(exports2) {
    var _CommanderError = class _CommanderError extends Error {
      /**
       * Constructs the CommanderError class
       * @param {number} exitCode suggested exit code which could be used with process.exit
       * @param {string} code an id string representing the error
       * @param {string} message human-readable description of the error
       * @constructor
       */
      constructor(exitCode, code, message) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.code = code;
        this.exitCode = exitCode;
        this.nestedError = void 0;
      }
    };
    __name(_CommanderError, "CommanderError");
    var CommanderError2 = _CommanderError;
    var _InvalidArgumentError = class _InvalidArgumentError extends CommanderError2 {
      /**
       * Constructs the InvalidArgumentError class
       * @param {string} [message] explanation of why argument is invalid
       * @constructor
       */
      constructor(message) {
        super(1, "commander.invalidArgument", message);
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
      }
    };
    __name(_InvalidArgumentError, "InvalidArgumentError");
    var InvalidArgumentError2 = _InvalidArgumentError;
    exports2.CommanderError = CommanderError2;
    exports2.InvalidArgumentError = InvalidArgumentError2;
  }
});

// node_modules/commander/lib/argument.js
var require_argument = __commonJS({
  "node_modules/commander/lib/argument.js"(exports2) {
    var { InvalidArgumentError: InvalidArgumentError2 } = require_error();
    var _Argument = class _Argument {
      /**
       * Initialize a new command argument with the given name and description.
       * The default is that the argument is required, and you can explicitly
       * indicate this with <> around the name. Put [] around the name for an optional argument.
       *
       * @param {string} name
       * @param {string} [description]
       */
      constructor(name, description) {
        this.description = description || "";
        this.variadic = false;
        this.parseArg = void 0;
        this.defaultValue = void 0;
        this.defaultValueDescription = void 0;
        this.argChoices = void 0;
        switch (name[0]) {
          case "<":
            this.required = true;
            this._name = name.slice(1, -1);
            break;
          case "[":
            this.required = false;
            this._name = name.slice(1, -1);
            break;
          default:
            this.required = true;
            this._name = name;
            break;
        }
        if (this._name.length > 3 && this._name.slice(-3) === "...") {
          this.variadic = true;
          this._name = this._name.slice(0, -3);
        }
      }
      /**
       * Return argument name.
       *
       * @return {string}
       */
      name() {
        return this._name;
      }
      /**
       * @api private
       */
      _concatValue(value, previous) {
        if (previous === this.defaultValue || !Array.isArray(previous)) {
          return [value];
        }
        return previous.concat(value);
      }
      /**
       * Set the default value, and optionally supply the description to be displayed in the help.
       *
       * @param {*} value
       * @param {string} [description]
       * @return {Argument}
       */
      default(value, description) {
        this.defaultValue = value;
        this.defaultValueDescription = description;
        return this;
      }
      /**
       * Set the custom handler for processing CLI command arguments into argument values.
       *
       * @param {Function} [fn]
       * @return {Argument}
       */
      argParser(fn) {
        this.parseArg = fn;
        return this;
      }
      /**
       * Only allow argument value to be one of choices.
       *
       * @param {string[]} values
       * @return {Argument}
       */
      choices(values) {
        this.argChoices = values.slice();
        this.parseArg = (arg, previous) => {
          if (!this.argChoices.includes(arg)) {
            throw new InvalidArgumentError2(`Allowed choices are ${this.argChoices.join(", ")}.`);
          }
          if (this.variadic) {
            return this._concatValue(arg, previous);
          }
          return arg;
        };
        return this;
      }
      /**
       * Make argument required.
       */
      argRequired() {
        this.required = true;
        return this;
      }
      /**
       * Make argument optional.
       */
      argOptional() {
        this.required = false;
        return this;
      }
    };
    __name(_Argument, "Argument");
    var Argument2 = _Argument;
    function humanReadableArgName(arg) {
      const nameOutput = arg.name() + (arg.variadic === true ? "..." : "");
      return arg.required ? "<" + nameOutput + ">" : "[" + nameOutput + "]";
    }
    __name(humanReadableArgName, "humanReadableArgName");
    exports2.Argument = Argument2;
    exports2.humanReadableArgName = humanReadableArgName;
  }
});

// node_modules/commander/lib/help.js
var require_help = __commonJS({
  "node_modules/commander/lib/help.js"(exports2) {
    var { humanReadableArgName } = require_argument();
    var _Help = class _Help {
      constructor() {
        this.helpWidth = void 0;
        this.sortSubcommands = false;
        this.sortOptions = false;
        this.showGlobalOptions = false;
      }
      /**
       * Get an array of the visible subcommands. Includes a placeholder for the implicit help command, if there is one.
       *
       * @param {Command} cmd
       * @returns {Command[]}
       */
      visibleCommands(cmd) {
        const visibleCommands = cmd.commands.filter((cmd2) => !cmd2._hidden);
        if (cmd._hasImplicitHelpCommand()) {
          const [, helpName, helpArgs] = cmd._helpCommandnameAndArgs.match(/([^ ]+) *(.*)/);
          const helpCommand = cmd.createCommand(helpName).helpOption(false);
          helpCommand.description(cmd._helpCommandDescription);
          if (helpArgs) helpCommand.arguments(helpArgs);
          visibleCommands.push(helpCommand);
        }
        if (this.sortSubcommands) {
          visibleCommands.sort((a, b) => {
            return a.name().localeCompare(b.name());
          });
        }
        return visibleCommands;
      }
      /**
       * Compare options for sort.
       *
       * @param {Option} a
       * @param {Option} b
       * @returns number
       */
      compareOptions(a, b) {
        const getSortKey = /* @__PURE__ */ __name((option) => {
          return option.short ? option.short.replace(/^-/, "") : option.long.replace(/^--/, "");
        }, "getSortKey");
        return getSortKey(a).localeCompare(getSortKey(b));
      }
      /**
       * Get an array of the visible options. Includes a placeholder for the implicit help option, if there is one.
       *
       * @param {Command} cmd
       * @returns {Option[]}
       */
      visibleOptions(cmd) {
        const visibleOptions = cmd.options.filter((option) => !option.hidden);
        const showShortHelpFlag = cmd._hasHelpOption && cmd._helpShortFlag && !cmd._findOption(cmd._helpShortFlag);
        const showLongHelpFlag = cmd._hasHelpOption && !cmd._findOption(cmd._helpLongFlag);
        if (showShortHelpFlag || showLongHelpFlag) {
          let helpOption;
          if (!showShortHelpFlag) {
            helpOption = cmd.createOption(cmd._helpLongFlag, cmd._helpDescription);
          } else if (!showLongHelpFlag) {
            helpOption = cmd.createOption(cmd._helpShortFlag, cmd._helpDescription);
          } else {
            helpOption = cmd.createOption(cmd._helpFlags, cmd._helpDescription);
          }
          visibleOptions.push(helpOption);
        }
        if (this.sortOptions) {
          visibleOptions.sort(this.compareOptions);
        }
        return visibleOptions;
      }
      /**
       * Get an array of the visible global options. (Not including help.)
       *
       * @param {Command} cmd
       * @returns {Option[]}
       */
      visibleGlobalOptions(cmd) {
        if (!this.showGlobalOptions) return [];
        const globalOptions = [];
        for (let ancestorCmd = cmd.parent; ancestorCmd; ancestorCmd = ancestorCmd.parent) {
          const visibleOptions = ancestorCmd.options.filter((option) => !option.hidden);
          globalOptions.push(...visibleOptions);
        }
        if (this.sortOptions) {
          globalOptions.sort(this.compareOptions);
        }
        return globalOptions;
      }
      /**
       * Get an array of the arguments if any have a description.
       *
       * @param {Command} cmd
       * @returns {Argument[]}
       */
      visibleArguments(cmd) {
        if (cmd._argsDescription) {
          cmd.registeredArguments.forEach((argument) => {
            argument.description = argument.description || cmd._argsDescription[argument.name()] || "";
          });
        }
        if (cmd.registeredArguments.find((argument) => argument.description)) {
          return cmd.registeredArguments;
        }
        return [];
      }
      /**
       * Get the command term to show in the list of subcommands.
       *
       * @param {Command} cmd
       * @returns {string}
       */
      subcommandTerm(cmd) {
        const args = cmd.registeredArguments.map((arg) => humanReadableArgName(arg)).join(" ");
        return cmd._name + (cmd._aliases[0] ? "|" + cmd._aliases[0] : "") + (cmd.options.length ? " [options]" : "") + // simplistic check for non-help option
        (args ? " " + args : "");
      }
      /**
       * Get the option term to show in the list of options.
       *
       * @param {Option} option
       * @returns {string}
       */
      optionTerm(option) {
        return option.flags;
      }
      /**
       * Get the argument term to show in the list of arguments.
       *
       * @param {Argument} argument
       * @returns {string}
       */
      argumentTerm(argument) {
        return argument.name();
      }
      /**
       * Get the longest command term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      longestSubcommandTermLength(cmd, helper) {
        return helper.visibleCommands(cmd).reduce((max, command) => {
          return Math.max(max, helper.subcommandTerm(command).length);
        }, 0);
      }
      /**
       * Get the longest option term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      longestOptionTermLength(cmd, helper) {
        return helper.visibleOptions(cmd).reduce((max, option) => {
          return Math.max(max, helper.optionTerm(option).length);
        }, 0);
      }
      /**
       * Get the longest global option term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      longestGlobalOptionTermLength(cmd, helper) {
        return helper.visibleGlobalOptions(cmd).reduce((max, option) => {
          return Math.max(max, helper.optionTerm(option).length);
        }, 0);
      }
      /**
       * Get the longest argument term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      longestArgumentTermLength(cmd, helper) {
        return helper.visibleArguments(cmd).reduce((max, argument) => {
          return Math.max(max, helper.argumentTerm(argument).length);
        }, 0);
      }
      /**
       * Get the command usage to be displayed at the top of the built-in help.
       *
       * @param {Command} cmd
       * @returns {string}
       */
      commandUsage(cmd) {
        let cmdName = cmd._name;
        if (cmd._aliases[0]) {
          cmdName = cmdName + "|" + cmd._aliases[0];
        }
        let ancestorCmdNames = "";
        for (let ancestorCmd = cmd.parent; ancestorCmd; ancestorCmd = ancestorCmd.parent) {
          ancestorCmdNames = ancestorCmd.name() + " " + ancestorCmdNames;
        }
        return ancestorCmdNames + cmdName + " " + cmd.usage();
      }
      /**
       * Get the description for the command.
       *
       * @param {Command} cmd
       * @returns {string}
       */
      commandDescription(cmd) {
        return cmd.description();
      }
      /**
       * Get the subcommand summary to show in the list of subcommands.
       * (Fallback to description for backwards compatibility.)
       *
       * @param {Command} cmd
       * @returns {string}
       */
      subcommandDescription(cmd) {
        return cmd.summary() || cmd.description();
      }
      /**
       * Get the option description to show in the list of options.
       *
       * @param {Option} option
       * @return {string}
       */
      optionDescription(option) {
        const extraInfo = [];
        if (option.argChoices) {
          extraInfo.push(
            // use stringify to match the display of the default value
            `choices: ${option.argChoices.map((choice) => JSON.stringify(choice)).join(", ")}`
          );
        }
        if (option.defaultValue !== void 0) {
          const showDefault = option.required || option.optional || option.isBoolean() && typeof option.defaultValue === "boolean";
          if (showDefault) {
            extraInfo.push(`default: ${option.defaultValueDescription || JSON.stringify(option.defaultValue)}`);
          }
        }
        if (option.presetArg !== void 0 && option.optional) {
          extraInfo.push(`preset: ${JSON.stringify(option.presetArg)}`);
        }
        if (option.envVar !== void 0) {
          extraInfo.push(`env: ${option.envVar}`);
        }
        if (extraInfo.length > 0) {
          return `${option.description} (${extraInfo.join(", ")})`;
        }
        return option.description;
      }
      /**
       * Get the argument description to show in the list of arguments.
       *
       * @param {Argument} argument
       * @return {string}
       */
      argumentDescription(argument) {
        const extraInfo = [];
        if (argument.argChoices) {
          extraInfo.push(
            // use stringify to match the display of the default value
            `choices: ${argument.argChoices.map((choice) => JSON.stringify(choice)).join(", ")}`
          );
        }
        if (argument.defaultValue !== void 0) {
          extraInfo.push(`default: ${argument.defaultValueDescription || JSON.stringify(argument.defaultValue)}`);
        }
        if (extraInfo.length > 0) {
          const extraDescripton = `(${extraInfo.join(", ")})`;
          if (argument.description) {
            return `${argument.description} ${extraDescripton}`;
          }
          return extraDescripton;
        }
        return argument.description;
      }
      /**
       * Generate the built-in help text.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {string}
       */
      formatHelp(cmd, helper) {
        const termWidth = helper.padWidth(cmd, helper);
        const helpWidth = helper.helpWidth || 80;
        const itemIndentWidth = 2;
        const itemSeparatorWidth = 2;
        function formatItem(term, description) {
          if (description) {
            const fullText = `${term.padEnd(termWidth + itemSeparatorWidth)}${description}`;
            return helper.wrap(fullText, helpWidth - itemIndentWidth, termWidth + itemSeparatorWidth);
          }
          return term;
        }
        __name(formatItem, "formatItem");
        function formatList(textArray) {
          return textArray.join("\n").replace(/^/gm, " ".repeat(itemIndentWidth));
        }
        __name(formatList, "formatList");
        let output = [`Usage: ${helper.commandUsage(cmd)}`, ""];
        const commandDescription = helper.commandDescription(cmd);
        if (commandDescription.length > 0) {
          output = output.concat([helper.wrap(commandDescription, helpWidth, 0), ""]);
        }
        const argumentList = helper.visibleArguments(cmd).map((argument) => {
          return formatItem(helper.argumentTerm(argument), helper.argumentDescription(argument));
        });
        if (argumentList.length > 0) {
          output = output.concat(["Arguments:", formatList(argumentList), ""]);
        }
        const optionList = helper.visibleOptions(cmd).map((option) => {
          return formatItem(helper.optionTerm(option), helper.optionDescription(option));
        });
        if (optionList.length > 0) {
          output = output.concat(["Options:", formatList(optionList), ""]);
        }
        if (this.showGlobalOptions) {
          const globalOptionList = helper.visibleGlobalOptions(cmd).map((option) => {
            return formatItem(helper.optionTerm(option), helper.optionDescription(option));
          });
          if (globalOptionList.length > 0) {
            output = output.concat(["Global Options:", formatList(globalOptionList), ""]);
          }
        }
        const commandList = helper.visibleCommands(cmd).map((cmd2) => {
          return formatItem(helper.subcommandTerm(cmd2), helper.subcommandDescription(cmd2));
        });
        if (commandList.length > 0) {
          output = output.concat(["Commands:", formatList(commandList), ""]);
        }
        return output.join("\n");
      }
      /**
       * Calculate the pad width from the maximum term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      padWidth(cmd, helper) {
        return Math.max(
          helper.longestOptionTermLength(cmd, helper),
          helper.longestGlobalOptionTermLength(cmd, helper),
          helper.longestSubcommandTermLength(cmd, helper),
          helper.longestArgumentTermLength(cmd, helper)
        );
      }
      /**
       * Wrap the given string to width characters per line, with lines after the first indented.
       * Do not wrap if insufficient room for wrapping (minColumnWidth), or string is manually formatted.
       *
       * @param {string} str
       * @param {number} width
       * @param {number} indent
       * @param {number} [minColumnWidth=40]
       * @return {string}
       *
       */
      wrap(str, width, indent, minColumnWidth = 40) {
        const indents = " \\f\\t\\v\xA0\u1680\u2000-\u200A\u202F\u205F\u3000\uFEFF";
        const manualIndent = new RegExp(`[\\n][${indents}]+`);
        if (str.match(manualIndent)) return str;
        const columnWidth = width - indent;
        if (columnWidth < minColumnWidth) return str;
        const leadingStr = str.slice(0, indent);
        const columnText = str.slice(indent).replace("\r\n", "\n");
        const indentString = " ".repeat(indent);
        const zeroWidthSpace = "\u200B";
        const breaks = `\\s${zeroWidthSpace}`;
        const regex = new RegExp(`
|.{1,${columnWidth - 1}}([${breaks}]|$)|[^${breaks}]+?([${breaks}]|$)`, "g");
        const lines = columnText.match(regex) || [];
        return leadingStr + lines.map((line, i) => {
          if (line === "\n") return "";
          return (i > 0 ? indentString : "") + line.trimEnd();
        }).join("\n");
      }
    };
    __name(_Help, "Help");
    var Help2 = _Help;
    exports2.Help = Help2;
  }
});

// node_modules/commander/lib/option.js
var require_option = __commonJS({
  "node_modules/commander/lib/option.js"(exports2) {
    var { InvalidArgumentError: InvalidArgumentError2 } = require_error();
    var _Option = class _Option {
      /**
       * Initialize a new `Option` with the given `flags` and `description`.
       *
       * @param {string} flags
       * @param {string} [description]
       */
      constructor(flags, description) {
        this.flags = flags;
        this.description = description || "";
        this.required = flags.includes("<");
        this.optional = flags.includes("[");
        this.variadic = /\w\.\.\.[>\]]$/.test(flags);
        this.mandatory = false;
        const optionFlags = splitOptionFlags(flags);
        this.short = optionFlags.shortFlag;
        this.long = optionFlags.longFlag;
        this.negate = false;
        if (this.long) {
          this.negate = this.long.startsWith("--no-");
        }
        this.defaultValue = void 0;
        this.defaultValueDescription = void 0;
        this.presetArg = void 0;
        this.envVar = void 0;
        this.parseArg = void 0;
        this.hidden = false;
        this.argChoices = void 0;
        this.conflictsWith = [];
        this.implied = void 0;
      }
      /**
       * Set the default value, and optionally supply the description to be displayed in the help.
       *
       * @param {*} value
       * @param {string} [description]
       * @return {Option}
       */
      default(value, description) {
        this.defaultValue = value;
        this.defaultValueDescription = description;
        return this;
      }
      /**
       * Preset to use when option used without option-argument, especially optional but also boolean and negated.
       * The custom processing (parseArg) is called.
       *
       * @example
       * new Option('--color').default('GREYSCALE').preset('RGB');
       * new Option('--donate [amount]').preset('20').argParser(parseFloat);
       *
       * @param {*} arg
       * @return {Option}
       */
      preset(arg) {
        this.presetArg = arg;
        return this;
      }
      /**
       * Add option name(s) that conflict with this option.
       * An error will be displayed if conflicting options are found during parsing.
       *
       * @example
       * new Option('--rgb').conflicts('cmyk');
       * new Option('--js').conflicts(['ts', 'jsx']);
       *
       * @param {string | string[]} names
       * @return {Option}
       */
      conflicts(names) {
        this.conflictsWith = this.conflictsWith.concat(names);
        return this;
      }
      /**
       * Specify implied option values for when this option is set and the implied options are not.
       *
       * The custom processing (parseArg) is not called on the implied values.
       *
       * @example
       * program
       *   .addOption(new Option('--log', 'write logging information to file'))
       *   .addOption(new Option('--trace', 'log extra details').implies({ log: 'trace.txt' }));
       *
       * @param {Object} impliedOptionValues
       * @return {Option}
       */
      implies(impliedOptionValues) {
        let newImplied = impliedOptionValues;
        if (typeof impliedOptionValues === "string") {
          newImplied = { [impliedOptionValues]: true };
        }
        this.implied = Object.assign(this.implied || {}, newImplied);
        return this;
      }
      /**
       * Set environment variable to check for option value.
       *
       * An environment variable is only used if when processed the current option value is
       * undefined, or the source of the current value is 'default' or 'config' or 'env'.
       *
       * @param {string} name
       * @return {Option}
       */
      env(name) {
        this.envVar = name;
        return this;
      }
      /**
       * Set the custom handler for processing CLI option arguments into option values.
       *
       * @param {Function} [fn]
       * @return {Option}
       */
      argParser(fn) {
        this.parseArg = fn;
        return this;
      }
      /**
       * Whether the option is mandatory and must have a value after parsing.
       *
       * @param {boolean} [mandatory=true]
       * @return {Option}
       */
      makeOptionMandatory(mandatory = true) {
        this.mandatory = !!mandatory;
        return this;
      }
      /**
       * Hide option in help.
       *
       * @param {boolean} [hide=true]
       * @return {Option}
       */
      hideHelp(hide = true) {
        this.hidden = !!hide;
        return this;
      }
      /**
       * @api private
       */
      _concatValue(value, previous) {
        if (previous === this.defaultValue || !Array.isArray(previous)) {
          return [value];
        }
        return previous.concat(value);
      }
      /**
       * Only allow option value to be one of choices.
       *
       * @param {string[]} values
       * @return {Option}
       */
      choices(values) {
        this.argChoices = values.slice();
        this.parseArg = (arg, previous) => {
          if (!this.argChoices.includes(arg)) {
            throw new InvalidArgumentError2(`Allowed choices are ${this.argChoices.join(", ")}.`);
          }
          if (this.variadic) {
            return this._concatValue(arg, previous);
          }
          return arg;
        };
        return this;
      }
      /**
       * Return option name.
       *
       * @return {string}
       */
      name() {
        if (this.long) {
          return this.long.replace(/^--/, "");
        }
        return this.short.replace(/^-/, "");
      }
      /**
       * Return option name, in a camelcase format that can be used
       * as a object attribute key.
       *
       * @return {string}
       * @api private
       */
      attributeName() {
        return camelcase(this.name().replace(/^no-/, ""));
      }
      /**
       * Check if `arg` matches the short or long flag.
       *
       * @param {string} arg
       * @return {boolean}
       * @api private
       */
      is(arg) {
        return this.short === arg || this.long === arg;
      }
      /**
       * Return whether a boolean option.
       *
       * Options are one of boolean, negated, required argument, or optional argument.
       *
       * @return {boolean}
       * @api private
       */
      isBoolean() {
        return !this.required && !this.optional && !this.negate;
      }
    };
    __name(_Option, "Option");
    var Option2 = _Option;
    var _DualOptions = class _DualOptions {
      /**
       * @param {Option[]} options
       */
      constructor(options) {
        this.positiveOptions = /* @__PURE__ */ new Map();
        this.negativeOptions = /* @__PURE__ */ new Map();
        this.dualOptions = /* @__PURE__ */ new Set();
        options.forEach((option) => {
          if (option.negate) {
            this.negativeOptions.set(option.attributeName(), option);
          } else {
            this.positiveOptions.set(option.attributeName(), option);
          }
        });
        this.negativeOptions.forEach((value, key) => {
          if (this.positiveOptions.has(key)) {
            this.dualOptions.add(key);
          }
        });
      }
      /**
       * Did the value come from the option, and not from possible matching dual option?
       *
       * @param {*} value
       * @param {Option} option
       * @returns {boolean}
       */
      valueFromOption(value, option) {
        const optionKey = option.attributeName();
        if (!this.dualOptions.has(optionKey)) return true;
        const preset = this.negativeOptions.get(optionKey).presetArg;
        const negativeValue = preset !== void 0 ? preset : false;
        return option.negate === (negativeValue === value);
      }
    };
    __name(_DualOptions, "DualOptions");
    var DualOptions = _DualOptions;
    function camelcase(str) {
      return str.split("-").reduce((str2, word) => {
        return str2 + word[0].toUpperCase() + word.slice(1);
      });
    }
    __name(camelcase, "camelcase");
    function splitOptionFlags(flags) {
      let shortFlag;
      let longFlag;
      const flagParts = flags.split(/[ |,]+/);
      if (flagParts.length > 1 && !/^[[<]/.test(flagParts[1])) shortFlag = flagParts.shift();
      longFlag = flagParts.shift();
      if (!shortFlag && /^-[^-]$/.test(longFlag)) {
        shortFlag = longFlag;
        longFlag = void 0;
      }
      return { shortFlag, longFlag };
    }
    __name(splitOptionFlags, "splitOptionFlags");
    exports2.Option = Option2;
    exports2.splitOptionFlags = splitOptionFlags;
    exports2.DualOptions = DualOptions;
  }
});

// node_modules/commander/lib/suggestSimilar.js
var require_suggestSimilar = __commonJS({
  "node_modules/commander/lib/suggestSimilar.js"(exports2) {
    var maxDistance = 3;
    function editDistance(a, b) {
      if (Math.abs(a.length - b.length) > maxDistance) return Math.max(a.length, b.length);
      const d = [];
      for (let i = 0; i <= a.length; i++) {
        d[i] = [i];
      }
      for (let j = 0; j <= b.length; j++) {
        d[0][j] = j;
      }
      for (let j = 1; j <= b.length; j++) {
        for (let i = 1; i <= a.length; i++) {
          let cost = 1;
          if (a[i - 1] === b[j - 1]) {
            cost = 0;
          } else {
            cost = 1;
          }
          d[i][j] = Math.min(
            d[i - 1][j] + 1,
            // deletion
            d[i][j - 1] + 1,
            // insertion
            d[i - 1][j - 1] + cost
            // substitution
          );
          if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
            d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
          }
        }
      }
      return d[a.length][b.length];
    }
    __name(editDistance, "editDistance");
    function suggestSimilar(word, candidates) {
      if (!candidates || candidates.length === 0) return "";
      candidates = Array.from(new Set(candidates));
      const searchingOptions = word.startsWith("--");
      if (searchingOptions) {
        word = word.slice(2);
        candidates = candidates.map((candidate) => candidate.slice(2));
      }
      let similar = [];
      let bestDistance = maxDistance;
      const minSimilarity = 0.4;
      candidates.forEach((candidate) => {
        if (candidate.length <= 1) return;
        const distance = editDistance(word, candidate);
        const length = Math.max(word.length, candidate.length);
        const similarity = (length - distance) / length;
        if (similarity > minSimilarity) {
          if (distance < bestDistance) {
            bestDistance = distance;
            similar = [candidate];
          } else if (distance === bestDistance) {
            similar.push(candidate);
          }
        }
      });
      similar.sort((a, b) => a.localeCompare(b));
      if (searchingOptions) {
        similar = similar.map((candidate) => `--${candidate}`);
      }
      if (similar.length > 1) {
        return `
(Did you mean one of ${similar.join(", ")}?)`;
      }
      if (similar.length === 1) {
        return `
(Did you mean ${similar[0]}?)`;
      }
      return "";
    }
    __name(suggestSimilar, "suggestSimilar");
    exports2.suggestSimilar = suggestSimilar;
  }
});

// node_modules/commander/lib/command.js
var require_command = __commonJS({
  "node_modules/commander/lib/command.js"(exports2) {
    var EventEmitter3 = require("events").EventEmitter;
    var childProcess = require("child_process");
    var path7 = require("path");
    var fs6 = require("fs");
    var process2 = require("process");
    var { Argument: Argument2, humanReadableArgName } = require_argument();
    var { CommanderError: CommanderError2 } = require_error();
    var { Help: Help2 } = require_help();
    var { Option: Option2, splitOptionFlags, DualOptions } = require_option();
    var { suggestSimilar } = require_suggestSimilar();
    var _Command = class _Command extends EventEmitter3 {
      /**
       * Initialize a new `Command`.
       *
       * @param {string} [name]
       */
      constructor(name) {
        super();
        this.commands = [];
        this.options = [];
        this.parent = null;
        this._allowUnknownOption = false;
        this._allowExcessArguments = true;
        this.registeredArguments = [];
        this._args = this.registeredArguments;
        this.args = [];
        this.rawArgs = [];
        this.processedArgs = [];
        this._scriptPath = null;
        this._name = name || "";
        this._optionValues = {};
        this._optionValueSources = {};
        this._storeOptionsAsProperties = false;
        this._actionHandler = null;
        this._executableHandler = false;
        this._executableFile = null;
        this._executableDir = null;
        this._defaultCommandName = null;
        this._exitCallback = null;
        this._aliases = [];
        this._combineFlagAndOptionalValue = true;
        this._description = "";
        this._summary = "";
        this._argsDescription = void 0;
        this._enablePositionalOptions = false;
        this._passThroughOptions = false;
        this._lifeCycleHooks = {};
        this._showHelpAfterError = false;
        this._showSuggestionAfterError = true;
        this._outputConfiguration = {
          writeOut: /* @__PURE__ */ __name((str) => process2.stdout.write(str), "writeOut"),
          writeErr: /* @__PURE__ */ __name((str) => process2.stderr.write(str), "writeErr"),
          getOutHelpWidth: /* @__PURE__ */ __name(() => process2.stdout.isTTY ? process2.stdout.columns : void 0, "getOutHelpWidth"),
          getErrHelpWidth: /* @__PURE__ */ __name(() => process2.stderr.isTTY ? process2.stderr.columns : void 0, "getErrHelpWidth"),
          outputError: /* @__PURE__ */ __name((str, write) => write(str), "outputError")
        };
        this._hidden = false;
        this._hasHelpOption = true;
        this._helpFlags = "-h, --help";
        this._helpDescription = "display help for command";
        this._helpShortFlag = "-h";
        this._helpLongFlag = "--help";
        this._addImplicitHelpCommand = void 0;
        this._helpCommandName = "help";
        this._helpCommandnameAndArgs = "help [command]";
        this._helpCommandDescription = "display help for command";
        this._helpConfiguration = {};
      }
      /**
       * Copy settings that are useful to have in common across root command and subcommands.
       *
       * (Used internally when adding a command using `.command()` so subcommands inherit parent settings.)
       *
       * @param {Command} sourceCommand
       * @return {Command} `this` command for chaining
       */
      copyInheritedSettings(sourceCommand) {
        this._outputConfiguration = sourceCommand._outputConfiguration;
        this._hasHelpOption = sourceCommand._hasHelpOption;
        this._helpFlags = sourceCommand._helpFlags;
        this._helpDescription = sourceCommand._helpDescription;
        this._helpShortFlag = sourceCommand._helpShortFlag;
        this._helpLongFlag = sourceCommand._helpLongFlag;
        this._helpCommandName = sourceCommand._helpCommandName;
        this._helpCommandnameAndArgs = sourceCommand._helpCommandnameAndArgs;
        this._helpCommandDescription = sourceCommand._helpCommandDescription;
        this._helpConfiguration = sourceCommand._helpConfiguration;
        this._exitCallback = sourceCommand._exitCallback;
        this._storeOptionsAsProperties = sourceCommand._storeOptionsAsProperties;
        this._combineFlagAndOptionalValue = sourceCommand._combineFlagAndOptionalValue;
        this._allowExcessArguments = sourceCommand._allowExcessArguments;
        this._enablePositionalOptions = sourceCommand._enablePositionalOptions;
        this._showHelpAfterError = sourceCommand._showHelpAfterError;
        this._showSuggestionAfterError = sourceCommand._showSuggestionAfterError;
        return this;
      }
      /**
       * @returns {Command[]}
       * @api private
       */
      _getCommandAndAncestors() {
        const result = [];
        for (let command = this; command; command = command.parent) {
          result.push(command);
        }
        return result;
      }
      /**
       * Define a command.
       *
       * There are two styles of command: pay attention to where to put the description.
       *
       * @example
       * // Command implemented using action handler (description is supplied separately to `.command`)
       * program
       *   .command('clone <source> [destination]')
       *   .description('clone a repository into a newly created directory')
       *   .action((source, destination) => {
       *     console.log('clone command called');
       *   });
       *
       * // Command implemented using separate executable file (description is second parameter to `.command`)
       * program
       *   .command('start <service>', 'start named service')
       *   .command('stop [service]', 'stop named service, or all if no name supplied');
       *
       * @param {string} nameAndArgs - command name and arguments, args are `<required>` or `[optional]` and last may also be `variadic...`
       * @param {Object|string} [actionOptsOrExecDesc] - configuration options (for action), or description (for executable)
       * @param {Object} [execOpts] - configuration options (for executable)
       * @return {Command} returns new command for action handler, or `this` for executable command
       */
      command(nameAndArgs, actionOptsOrExecDesc, execOpts) {
        let desc = actionOptsOrExecDesc;
        let opts = execOpts;
        if (typeof desc === "object" && desc !== null) {
          opts = desc;
          desc = null;
        }
        opts = opts || {};
        const [, name, args] = nameAndArgs.match(/([^ ]+) *(.*)/);
        const cmd = this.createCommand(name);
        if (desc) {
          cmd.description(desc);
          cmd._executableHandler = true;
        }
        if (opts.isDefault) this._defaultCommandName = cmd._name;
        cmd._hidden = !!(opts.noHelp || opts.hidden);
        cmd._executableFile = opts.executableFile || null;
        if (args) cmd.arguments(args);
        this.commands.push(cmd);
        cmd.parent = this;
        cmd.copyInheritedSettings(this);
        if (desc) return this;
        return cmd;
      }
      /**
       * Factory routine to create a new unattached command.
       *
       * See .command() for creating an attached subcommand, which uses this routine to
       * create the command. You can override createCommand to customise subcommands.
       *
       * @param {string} [name]
       * @return {Command} new command
       */
      createCommand(name) {
        return new _Command(name);
      }
      /**
       * You can customise the help with a subclass of Help by overriding createHelp,
       * or by overriding Help properties using configureHelp().
       *
       * @return {Help}
       */
      createHelp() {
        return Object.assign(new Help2(), this.configureHelp());
      }
      /**
       * You can customise the help by overriding Help properties using configureHelp(),
       * or with a subclass of Help by overriding createHelp().
       *
       * @param {Object} [configuration] - configuration options
       * @return {Command|Object} `this` command for chaining, or stored configuration
       */
      configureHelp(configuration) {
        if (configuration === void 0) return this._helpConfiguration;
        this._helpConfiguration = configuration;
        return this;
      }
      /**
       * The default output goes to stdout and stderr. You can customise this for special
       * applications. You can also customise the display of errors by overriding outputError.
       *
       * The configuration properties are all functions:
       *
       *     // functions to change where being written, stdout and stderr
       *     writeOut(str)
       *     writeErr(str)
       *     // matching functions to specify width for wrapping help
       *     getOutHelpWidth()
       *     getErrHelpWidth()
       *     // functions based on what is being written out
       *     outputError(str, write) // used for displaying errors, and not used for displaying help
       *
       * @param {Object} [configuration] - configuration options
       * @return {Command|Object} `this` command for chaining, or stored configuration
       */
      configureOutput(configuration) {
        if (configuration === void 0) return this._outputConfiguration;
        Object.assign(this._outputConfiguration, configuration);
        return this;
      }
      /**
       * Display the help or a custom message after an error occurs.
       *
       * @param {boolean|string} [displayHelp]
       * @return {Command} `this` command for chaining
       */
      showHelpAfterError(displayHelp = true) {
        if (typeof displayHelp !== "string") displayHelp = !!displayHelp;
        this._showHelpAfterError = displayHelp;
        return this;
      }
      /**
       * Display suggestion of similar commands for unknown commands, or options for unknown options.
       *
       * @param {boolean} [displaySuggestion]
       * @return {Command} `this` command for chaining
       */
      showSuggestionAfterError(displaySuggestion = true) {
        this._showSuggestionAfterError = !!displaySuggestion;
        return this;
      }
      /**
       * Add a prepared subcommand.
       *
       * See .command() for creating an attached subcommand which inherits settings from its parent.
       *
       * @param {Command} cmd - new subcommand
       * @param {Object} [opts] - configuration options
       * @return {Command} `this` command for chaining
       */
      addCommand(cmd, opts) {
        if (!cmd._name) {
          throw new Error(`Command passed to .addCommand() must have a name
- specify the name in Command constructor or using .name()`);
        }
        opts = opts || {};
        if (opts.isDefault) this._defaultCommandName = cmd._name;
        if (opts.noHelp || opts.hidden) cmd._hidden = true;
        this.commands.push(cmd);
        cmd.parent = this;
        return this;
      }
      /**
       * Factory routine to create a new unattached argument.
       *
       * See .argument() for creating an attached argument, which uses this routine to
       * create the argument. You can override createArgument to return a custom argument.
       *
       * @param {string} name
       * @param {string} [description]
       * @return {Argument} new argument
       */
      createArgument(name, description) {
        return new Argument2(name, description);
      }
      /**
       * Define argument syntax for command.
       *
       * The default is that the argument is required, and you can explicitly
       * indicate this with <> around the name. Put [] around the name for an optional argument.
       *
       * @example
       * program.argument('<input-file>');
       * program.argument('[output-file]');
       *
       * @param {string} name
       * @param {string} [description]
       * @param {Function|*} [fn] - custom argument processing function
       * @param {*} [defaultValue]
       * @return {Command} `this` command for chaining
       */
      argument(name, description, fn, defaultValue) {
        const argument = this.createArgument(name, description);
        if (typeof fn === "function") {
          argument.default(defaultValue).argParser(fn);
        } else {
          argument.default(fn);
        }
        this.addArgument(argument);
        return this;
      }
      /**
       * Define argument syntax for command, adding multiple at once (without descriptions).
       *
       * See also .argument().
       *
       * @example
       * program.arguments('<cmd> [env]');
       *
       * @param {string} names
       * @return {Command} `this` command for chaining
       */
      arguments(names) {
        names.trim().split(/ +/).forEach((detail) => {
          this.argument(detail);
        });
        return this;
      }
      /**
       * Define argument syntax for command, adding a prepared argument.
       *
       * @param {Argument} argument
       * @return {Command} `this` command for chaining
       */
      addArgument(argument) {
        const previousArgument = this.registeredArguments.slice(-1)[0];
        if (previousArgument && previousArgument.variadic) {
          throw new Error(`only the last argument can be variadic '${previousArgument.name()}'`);
        }
        if (argument.required && argument.defaultValue !== void 0 && argument.parseArg === void 0) {
          throw new Error(`a default value for a required argument is never used: '${argument.name()}'`);
        }
        this.registeredArguments.push(argument);
        return this;
      }
      /**
       * Override default decision whether to add implicit help command.
       *
       *    addHelpCommand() // force on
       *    addHelpCommand(false); // force off
       *    addHelpCommand('help [cmd]', 'display help for [cmd]'); // force on with custom details
       *
       * @return {Command} `this` command for chaining
       */
      addHelpCommand(enableOrNameAndArgs, description) {
        if (enableOrNameAndArgs === false) {
          this._addImplicitHelpCommand = false;
        } else {
          this._addImplicitHelpCommand = true;
          if (typeof enableOrNameAndArgs === "string") {
            this._helpCommandName = enableOrNameAndArgs.split(" ")[0];
            this._helpCommandnameAndArgs = enableOrNameAndArgs;
          }
          this._helpCommandDescription = description || this._helpCommandDescription;
        }
        return this;
      }
      /**
       * @return {boolean}
       * @api private
       */
      _hasImplicitHelpCommand() {
        if (this._addImplicitHelpCommand === void 0) {
          return this.commands.length && !this._actionHandler && !this._findCommand("help");
        }
        return this._addImplicitHelpCommand;
      }
      /**
       * Add hook for life cycle event.
       *
       * @param {string} event
       * @param {Function} listener
       * @return {Command} `this` command for chaining
       */
      hook(event, listener) {
        const allowedValues = ["preSubcommand", "preAction", "postAction"];
        if (!allowedValues.includes(event)) {
          throw new Error(`Unexpected value for event passed to hook : '${event}'.
Expecting one of '${allowedValues.join("', '")}'`);
        }
        if (this._lifeCycleHooks[event]) {
          this._lifeCycleHooks[event].push(listener);
        } else {
          this._lifeCycleHooks[event] = [listener];
        }
        return this;
      }
      /**
       * Register callback to use as replacement for calling process.exit.
       *
       * @param {Function} [fn] optional callback which will be passed a CommanderError, defaults to throwing
       * @return {Command} `this` command for chaining
       */
      exitOverride(fn) {
        if (fn) {
          this._exitCallback = fn;
        } else {
          this._exitCallback = (err) => {
            if (err.code !== "commander.executeSubCommandAsync") {
              throw err;
            } else {
            }
          };
        }
        return this;
      }
      /**
       * Call process.exit, and _exitCallback if defined.
       *
       * @param {number} exitCode exit code for using with process.exit
       * @param {string} code an id string representing the error
       * @param {string} message human-readable description of the error
       * @return never
       * @api private
       */
      _exit(exitCode, code, message) {
        if (this._exitCallback) {
          this._exitCallback(new CommanderError2(exitCode, code, message));
        }
        process2.exit(exitCode);
      }
      /**
       * Register callback `fn` for the command.
       *
       * @example
       * program
       *   .command('serve')
       *   .description('start service')
       *   .action(function() {
       *      // do work here
       *   });
       *
       * @param {Function} fn
       * @return {Command} `this` command for chaining
       */
      action(fn) {
        const listener = /* @__PURE__ */ __name((args) => {
          const expectedArgsCount = this.registeredArguments.length;
          const actionArgs = args.slice(0, expectedArgsCount);
          if (this._storeOptionsAsProperties) {
            actionArgs[expectedArgsCount] = this;
          } else {
            actionArgs[expectedArgsCount] = this.opts();
          }
          actionArgs.push(this);
          return fn.apply(this, actionArgs);
        }, "listener");
        this._actionHandler = listener;
        return this;
      }
      /**
       * Factory routine to create a new unattached option.
       *
       * See .option() for creating an attached option, which uses this routine to
       * create the option. You can override createOption to return a custom option.
       *
       * @param {string} flags
       * @param {string} [description]
       * @return {Option} new option
       */
      createOption(flags, description) {
        return new Option2(flags, description);
      }
      /**
       * Wrap parseArgs to catch 'commander.invalidArgument'.
       *
       * @param {Option | Argument} target
       * @param {string} value
       * @param {*} previous
       * @param {string} invalidArgumentMessage
       * @api private
       */
      _callParseArg(target, value, previous, invalidArgumentMessage) {
        try {
          return target.parseArg(value, previous);
        } catch (err) {
          if (err.code === "commander.invalidArgument") {
            const message = `${invalidArgumentMessage} ${err.message}`;
            this.error(message, { exitCode: err.exitCode, code: err.code });
          }
          throw err;
        }
      }
      /**
       * Add an option.
       *
       * @param {Option} option
       * @return {Command} `this` command for chaining
       */
      addOption(option) {
        const oname = option.name();
        const name = option.attributeName();
        if (option.negate) {
          const positiveLongFlag = option.long.replace(/^--no-/, "--");
          if (!this._findOption(positiveLongFlag)) {
            this.setOptionValueWithSource(name, option.defaultValue === void 0 ? true : option.defaultValue, "default");
          }
        } else if (option.defaultValue !== void 0) {
          this.setOptionValueWithSource(name, option.defaultValue, "default");
        }
        this.options.push(option);
        const handleOptionValue = /* @__PURE__ */ __name((val, invalidValueMessage, valueSource) => {
          if (val == null && option.presetArg !== void 0) {
            val = option.presetArg;
          }
          const oldValue = this.getOptionValue(name);
          if (val !== null && option.parseArg) {
            val = this._callParseArg(option, val, oldValue, invalidValueMessage);
          } else if (val !== null && option.variadic) {
            val = option._concatValue(val, oldValue);
          }
          if (val == null) {
            if (option.negate) {
              val = false;
            } else if (option.isBoolean() || option.optional) {
              val = true;
            } else {
              val = "";
            }
          }
          this.setOptionValueWithSource(name, val, valueSource);
        }, "handleOptionValue");
        this.on("option:" + oname, (val) => {
          const invalidValueMessage = `error: option '${option.flags}' argument '${val}' is invalid.`;
          handleOptionValue(val, invalidValueMessage, "cli");
        });
        if (option.envVar) {
          this.on("optionEnv:" + oname, (val) => {
            const invalidValueMessage = `error: option '${option.flags}' value '${val}' from env '${option.envVar}' is invalid.`;
            handleOptionValue(val, invalidValueMessage, "env");
          });
        }
        return this;
      }
      /**
       * Internal implementation shared by .option() and .requiredOption()
       *
       * @api private
       */
      _optionEx(config, flags, description, fn, defaultValue) {
        if (typeof flags === "object" && flags instanceof Option2) {
          throw new Error("To add an Option object use addOption() instead of option() or requiredOption()");
        }
        const option = this.createOption(flags, description);
        option.makeOptionMandatory(!!config.mandatory);
        if (typeof fn === "function") {
          option.default(defaultValue).argParser(fn);
        } else if (fn instanceof RegExp) {
          const regex = fn;
          fn = /* @__PURE__ */ __name((val, def) => {
            const m = regex.exec(val);
            return m ? m[0] : def;
          }, "fn");
          option.default(defaultValue).argParser(fn);
        } else {
          option.default(fn);
        }
        return this.addOption(option);
      }
      /**
       * Define option with `flags`, `description`, and optional argument parsing function or `defaultValue` or both.
       *
       * The `flags` string contains the short and/or long flags, separated by comma, a pipe or space. A required
       * option-argument is indicated by `<>` and an optional option-argument by `[]`.
       *
       * See the README for more details, and see also addOption() and requiredOption().
       *
       * @example
       * program
       *     .option('-p, --pepper', 'add pepper')
       *     .option('-p, --pizza-type <TYPE>', 'type of pizza') // required option-argument
       *     .option('-c, --cheese [CHEESE]', 'add extra cheese', 'mozzarella') // optional option-argument with default
       *     .option('-t, --tip <VALUE>', 'add tip to purchase cost', parseFloat) // custom parse function
       *
       * @param {string} flags
       * @param {string} [description]
       * @param {Function|*} [parseArg] - custom option processing function or default value
       * @param {*} [defaultValue]
       * @return {Command} `this` command for chaining
       */
      option(flags, description, parseArg, defaultValue) {
        return this._optionEx({}, flags, description, parseArg, defaultValue);
      }
      /**
      * Add a required option which must have a value after parsing. This usually means
      * the option must be specified on the command line. (Otherwise the same as .option().)
      *
      * The `flags` string contains the short and/or long flags, separated by comma, a pipe or space.
      *
      * @param {string} flags
      * @param {string} [description]
      * @param {Function|*} [parseArg] - custom option processing function or default value
      * @param {*} [defaultValue]
      * @return {Command} `this` command for chaining
      */
      requiredOption(flags, description, parseArg, defaultValue) {
        return this._optionEx({ mandatory: true }, flags, description, parseArg, defaultValue);
      }
      /**
       * Alter parsing of short flags with optional values.
       *
       * @example
       * // for `.option('-f,--flag [value]'):
       * program.combineFlagAndOptionalValue(true);  // `-f80` is treated like `--flag=80`, this is the default behaviour
       * program.combineFlagAndOptionalValue(false) // `-fb` is treated like `-f -b`
       *
       * @param {Boolean} [combine=true] - if `true` or omitted, an optional value can be specified directly after the flag.
       */
      combineFlagAndOptionalValue(combine = true) {
        this._combineFlagAndOptionalValue = !!combine;
        return this;
      }
      /**
       * Allow unknown options on the command line.
       *
       * @param {Boolean} [allowUnknown=true] - if `true` or omitted, no error will be thrown
       * for unknown options.
       */
      allowUnknownOption(allowUnknown = true) {
        this._allowUnknownOption = !!allowUnknown;
        return this;
      }
      /**
       * Allow excess command-arguments on the command line. Pass false to make excess arguments an error.
       *
       * @param {Boolean} [allowExcess=true] - if `true` or omitted, no error will be thrown
       * for excess arguments.
       */
      allowExcessArguments(allowExcess = true) {
        this._allowExcessArguments = !!allowExcess;
        return this;
      }
      /**
       * Enable positional options. Positional means global options are specified before subcommands which lets
       * subcommands reuse the same option names, and also enables subcommands to turn on passThroughOptions.
       * The default behaviour is non-positional and global options may appear anywhere on the command line.
       *
       * @param {Boolean} [positional=true]
       */
      enablePositionalOptions(positional = true) {
        this._enablePositionalOptions = !!positional;
        return this;
      }
      /**
       * Pass through options that come after command-arguments rather than treat them as command-options,
       * so actual command-options come before command-arguments. Turning this on for a subcommand requires
       * positional options to have been enabled on the program (parent commands).
       * The default behaviour is non-positional and options may appear before or after command-arguments.
       *
       * @param {Boolean} [passThrough=true]
       * for unknown options.
       */
      passThroughOptions(passThrough = true) {
        this._passThroughOptions = !!passThrough;
        if (!!this.parent && passThrough && !this.parent._enablePositionalOptions) {
          throw new Error("passThroughOptions can not be used without turning on enablePositionalOptions for parent command(s)");
        }
        return this;
      }
      /**
        * Whether to store option values as properties on command object,
        * or store separately (specify false). In both cases the option values can be accessed using .opts().
        *
        * @param {boolean} [storeAsProperties=true]
        * @return {Command} `this` command for chaining
        */
      storeOptionsAsProperties(storeAsProperties = true) {
        if (this.options.length) {
          throw new Error("call .storeOptionsAsProperties() before adding options");
        }
        this._storeOptionsAsProperties = !!storeAsProperties;
        return this;
      }
      /**
       * Retrieve option value.
       *
       * @param {string} key
       * @return {Object} value
       */
      getOptionValue(key) {
        if (this._storeOptionsAsProperties) {
          return this[key];
        }
        return this._optionValues[key];
      }
      /**
       * Store option value.
       *
       * @param {string} key
       * @param {Object} value
       * @return {Command} `this` command for chaining
       */
      setOptionValue(key, value) {
        return this.setOptionValueWithSource(key, value, void 0);
      }
      /**
        * Store option value and where the value came from.
        *
        * @param {string} key
        * @param {Object} value
        * @param {string} source - expected values are default/config/env/cli/implied
        * @return {Command} `this` command for chaining
        */
      setOptionValueWithSource(key, value, source) {
        if (this._storeOptionsAsProperties) {
          this[key] = value;
        } else {
          this._optionValues[key] = value;
        }
        this._optionValueSources[key] = source;
        return this;
      }
      /**
        * Get source of option value.
        * Expected values are default | config | env | cli | implied
        *
        * @param {string} key
        * @return {string}
        */
      getOptionValueSource(key) {
        return this._optionValueSources[key];
      }
      /**
        * Get source of option value. See also .optsWithGlobals().
        * Expected values are default | config | env | cli | implied
        *
        * @param {string} key
        * @return {string}
        */
      getOptionValueSourceWithGlobals(key) {
        let source;
        this._getCommandAndAncestors().forEach((cmd) => {
          if (cmd.getOptionValueSource(key) !== void 0) {
            source = cmd.getOptionValueSource(key);
          }
        });
        return source;
      }
      /**
       * Get user arguments from implied or explicit arguments.
       * Side-effects: set _scriptPath if args included script. Used for default program name, and subcommand searches.
       *
       * @api private
       */
      _prepareUserArgs(argv, parseOptions) {
        if (argv !== void 0 && !Array.isArray(argv)) {
          throw new Error("first parameter to parse must be array or undefined");
        }
        parseOptions = parseOptions || {};
        if (argv === void 0) {
          argv = process2.argv;
          if (process2.versions && process2.versions.electron) {
            parseOptions.from = "electron";
          }
        }
        this.rawArgs = argv.slice();
        let userArgs;
        switch (parseOptions.from) {
          case void 0:
          case "node":
            this._scriptPath = argv[1];
            userArgs = argv.slice(2);
            break;
          case "electron":
            if (process2.defaultApp) {
              this._scriptPath = argv[1];
              userArgs = argv.slice(2);
            } else {
              userArgs = argv.slice(1);
            }
            break;
          case "user":
            userArgs = argv.slice(0);
            break;
          default:
            throw new Error(`unexpected parse option { from: '${parseOptions.from}' }`);
        }
        if (!this._name && this._scriptPath) this.nameFromFilename(this._scriptPath);
        this._name = this._name || "program";
        return userArgs;
      }
      /**
       * Parse `argv`, setting options and invoking commands when defined.
       *
       * The default expectation is that the arguments are from node and have the application as argv[0]
       * and the script being run in argv[1], with user parameters after that.
       *
       * @example
       * program.parse(process.argv);
       * program.parse(); // implicitly use process.argv and auto-detect node vs electron conventions
       * program.parse(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
       *
       * @param {string[]} [argv] - optional, defaults to process.argv
       * @param {Object} [parseOptions] - optionally specify style of options with from: node/user/electron
       * @param {string} [parseOptions.from] - where the args are from: 'node', 'user', 'electron'
       * @return {Command} `this` command for chaining
       */
      parse(argv, parseOptions) {
        const userArgs = this._prepareUserArgs(argv, parseOptions);
        this._parseCommand([], userArgs);
        return this;
      }
      /**
       * Parse `argv`, setting options and invoking commands when defined.
       *
       * Use parseAsync instead of parse if any of your action handlers are async. Returns a Promise.
       *
       * The default expectation is that the arguments are from node and have the application as argv[0]
       * and the script being run in argv[1], with user parameters after that.
       *
       * @example
       * await program.parseAsync(process.argv);
       * await program.parseAsync(); // implicitly use process.argv and auto-detect node vs electron conventions
       * await program.parseAsync(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
       *
       * @param {string[]} [argv]
       * @param {Object} [parseOptions]
       * @param {string} parseOptions.from - where the args are from: 'node', 'user', 'electron'
       * @return {Promise}
       */
      async parseAsync(argv, parseOptions) {
        const userArgs = this._prepareUserArgs(argv, parseOptions);
        await this._parseCommand([], userArgs);
        return this;
      }
      /**
       * Execute a sub-command executable.
       *
       * @api private
       */
      _executeSubCommand(subcommand, args) {
        args = args.slice();
        let launchWithNode = false;
        const sourceExt = [".js", ".ts", ".tsx", ".mjs", ".cjs"];
        function findFile(baseDir, baseName) {
          const localBin = path7.resolve(baseDir, baseName);
          if (fs6.existsSync(localBin)) return localBin;
          if (sourceExt.includes(path7.extname(baseName))) return void 0;
          const foundExt = sourceExt.find((ext) => fs6.existsSync(`${localBin}${ext}`));
          if (foundExt) return `${localBin}${foundExt}`;
          return void 0;
        }
        __name(findFile, "findFile");
        this._checkForMissingMandatoryOptions();
        this._checkForConflictingOptions();
        let executableFile = subcommand._executableFile || `${this._name}-${subcommand._name}`;
        let executableDir = this._executableDir || "";
        if (this._scriptPath) {
          let resolvedScriptPath;
          try {
            resolvedScriptPath = fs6.realpathSync(this._scriptPath);
          } catch (err) {
            resolvedScriptPath = this._scriptPath;
          }
          executableDir = path7.resolve(path7.dirname(resolvedScriptPath), executableDir);
        }
        if (executableDir) {
          let localFile = findFile(executableDir, executableFile);
          if (!localFile && !subcommand._executableFile && this._scriptPath) {
            const legacyName = path7.basename(this._scriptPath, path7.extname(this._scriptPath));
            if (legacyName !== this._name) {
              localFile = findFile(executableDir, `${legacyName}-${subcommand._name}`);
            }
          }
          executableFile = localFile || executableFile;
        }
        launchWithNode = sourceExt.includes(path7.extname(executableFile));
        let proc;
        if (process2.platform !== "win32") {
          if (launchWithNode) {
            args.unshift(executableFile);
            args = incrementNodeInspectorPort(process2.execArgv).concat(args);
            proc = childProcess.spawn(process2.argv[0], args, { stdio: "inherit" });
          } else {
            proc = childProcess.spawn(executableFile, args, { stdio: "inherit" });
          }
        } else {
          args.unshift(executableFile);
          args = incrementNodeInspectorPort(process2.execArgv).concat(args);
          proc = childProcess.spawn(process2.execPath, args, { stdio: "inherit" });
        }
        if (!proc.killed) {
          const signals = ["SIGUSR1", "SIGUSR2", "SIGTERM", "SIGINT", "SIGHUP"];
          signals.forEach((signal) => {
            process2.on(signal, () => {
              if (proc.killed === false && proc.exitCode === null) {
                proc.kill(signal);
              }
            });
          });
        }
        const exitCallback = this._exitCallback;
        if (!exitCallback) {
          proc.on("close", process2.exit.bind(process2));
        } else {
          proc.on("close", () => {
            exitCallback(new CommanderError2(process2.exitCode || 0, "commander.executeSubCommandAsync", "(close)"));
          });
        }
        proc.on("error", (err) => {
          if (err.code === "ENOENT") {
            const executableDirMessage = executableDir ? `searched for local subcommand relative to directory '${executableDir}'` : "no directory for search for local subcommand, use .executableDir() to supply a custom directory";
            const executableMissing = `'${executableFile}' does not exist
 - if '${subcommand._name}' is not meant to be an executable command, remove description parameter from '.command()' and use '.description()' instead
 - if the default executable name is not suitable, use the executableFile option to supply a custom name or path
 - ${executableDirMessage}`;
            throw new Error(executableMissing);
          } else if (err.code === "EACCES") {
            throw new Error(`'${executableFile}' not executable`);
          }
          if (!exitCallback) {
            process2.exit(1);
          } else {
            const wrappedError = new CommanderError2(1, "commander.executeSubCommandAsync", "(error)");
            wrappedError.nestedError = err;
            exitCallback(wrappedError);
          }
        });
        this.runningCommand = proc;
      }
      /**
       * @api private
       */
      _dispatchSubcommand(commandName, operands, unknown) {
        const subCommand = this._findCommand(commandName);
        if (!subCommand) this.help({ error: true });
        let promiseChain;
        promiseChain = this._chainOrCallSubCommandHook(promiseChain, subCommand, "preSubcommand");
        promiseChain = this._chainOrCall(promiseChain, () => {
          if (subCommand._executableHandler) {
            this._executeSubCommand(subCommand, operands.concat(unknown));
          } else {
            return subCommand._parseCommand(operands, unknown);
          }
        });
        return promiseChain;
      }
      /**
       * Invoke help directly if possible, or dispatch if necessary.
       * e.g. help foo
       *
       * @api private
       */
      _dispatchHelpCommand(subcommandName) {
        if (!subcommandName) {
          this.help();
        }
        const subCommand = this._findCommand(subcommandName);
        if (subCommand && !subCommand._executableHandler) {
          subCommand.help();
        }
        return this._dispatchSubcommand(subcommandName, [], [
          this._helpLongFlag || this._helpShortFlag
        ]);
      }
      /**
       * Check this.args against expected this.registeredArguments.
       *
       * @api private
       */
      _checkNumberOfArguments() {
        this.registeredArguments.forEach((arg, i) => {
          if (arg.required && this.args[i] == null) {
            this.missingArgument(arg.name());
          }
        });
        if (this.registeredArguments.length > 0 && this.registeredArguments[this.registeredArguments.length - 1].variadic) {
          return;
        }
        if (this.args.length > this.registeredArguments.length) {
          this._excessArguments(this.args);
        }
      }
      /**
       * Process this.args using this.registeredArguments and save as this.processedArgs!
       *
       * @api private
       */
      _processArguments() {
        const myParseArg = /* @__PURE__ */ __name((argument, value, previous) => {
          let parsedValue = value;
          if (value !== null && argument.parseArg) {
            const invalidValueMessage = `error: command-argument value '${value}' is invalid for argument '${argument.name()}'.`;
            parsedValue = this._callParseArg(argument, value, previous, invalidValueMessage);
          }
          return parsedValue;
        }, "myParseArg");
        this._checkNumberOfArguments();
        const processedArgs = [];
        this.registeredArguments.forEach((declaredArg, index) => {
          let value = declaredArg.defaultValue;
          if (declaredArg.variadic) {
            if (index < this.args.length) {
              value = this.args.slice(index);
              if (declaredArg.parseArg) {
                value = value.reduce((processed, v) => {
                  return myParseArg(declaredArg, v, processed);
                }, declaredArg.defaultValue);
              }
            } else if (value === void 0) {
              value = [];
            }
          } else if (index < this.args.length) {
            value = this.args[index];
            if (declaredArg.parseArg) {
              value = myParseArg(declaredArg, value, declaredArg.defaultValue);
            }
          }
          processedArgs[index] = value;
        });
        this.processedArgs = processedArgs;
      }
      /**
       * Once we have a promise we chain, but call synchronously until then.
       *
       * @param {Promise|undefined} promise
       * @param {Function} fn
       * @return {Promise|undefined}
       * @api private
       */
      _chainOrCall(promise, fn) {
        if (promise && promise.then && typeof promise.then === "function") {
          return promise.then(() => fn());
        }
        return fn();
      }
      /**
       *
       * @param {Promise|undefined} promise
       * @param {string} event
       * @return {Promise|undefined}
       * @api private
       */
      _chainOrCallHooks(promise, event) {
        let result = promise;
        const hooks = [];
        this._getCommandAndAncestors().reverse().filter((cmd) => cmd._lifeCycleHooks[event] !== void 0).forEach((hookedCommand) => {
          hookedCommand._lifeCycleHooks[event].forEach((callback) => {
            hooks.push({ hookedCommand, callback });
          });
        });
        if (event === "postAction") {
          hooks.reverse();
        }
        hooks.forEach((hookDetail) => {
          result = this._chainOrCall(result, () => {
            return hookDetail.callback(hookDetail.hookedCommand, this);
          });
        });
        return result;
      }
      /**
       *
       * @param {Promise|undefined} promise
       * @param {Command} subCommand
       * @param {string} event
       * @return {Promise|undefined}
       * @api private
       */
      _chainOrCallSubCommandHook(promise, subCommand, event) {
        let result = promise;
        if (this._lifeCycleHooks[event] !== void 0) {
          this._lifeCycleHooks[event].forEach((hook) => {
            result = this._chainOrCall(result, () => {
              return hook(this, subCommand);
            });
          });
        }
        return result;
      }
      /**
       * Process arguments in context of this command.
       * Returns action result, in case it is a promise.
       *
       * @api private
       */
      _parseCommand(operands, unknown) {
        const parsed = this.parseOptions(unknown);
        this._parseOptionsEnv();
        this._parseOptionsImplied();
        operands = operands.concat(parsed.operands);
        unknown = parsed.unknown;
        this.args = operands.concat(unknown);
        if (operands && this._findCommand(operands[0])) {
          return this._dispatchSubcommand(operands[0], operands.slice(1), unknown);
        }
        if (this._hasImplicitHelpCommand() && operands[0] === this._helpCommandName) {
          return this._dispatchHelpCommand(operands[1]);
        }
        if (this._defaultCommandName) {
          outputHelpIfRequested(this, unknown);
          return this._dispatchSubcommand(this._defaultCommandName, operands, unknown);
        }
        if (this.commands.length && this.args.length === 0 && !this._actionHandler && !this._defaultCommandName) {
          this.help({ error: true });
        }
        outputHelpIfRequested(this, parsed.unknown);
        this._checkForMissingMandatoryOptions();
        this._checkForConflictingOptions();
        const checkForUnknownOptions = /* @__PURE__ */ __name(() => {
          if (parsed.unknown.length > 0) {
            this.unknownOption(parsed.unknown[0]);
          }
        }, "checkForUnknownOptions");
        const commandEvent = `command:${this.name()}`;
        if (this._actionHandler) {
          checkForUnknownOptions();
          this._processArguments();
          let promiseChain;
          promiseChain = this._chainOrCallHooks(promiseChain, "preAction");
          promiseChain = this._chainOrCall(promiseChain, () => this._actionHandler(this.processedArgs));
          if (this.parent) {
            promiseChain = this._chainOrCall(promiseChain, () => {
              this.parent.emit(commandEvent, operands, unknown);
            });
          }
          promiseChain = this._chainOrCallHooks(promiseChain, "postAction");
          return promiseChain;
        }
        if (this.parent && this.parent.listenerCount(commandEvent)) {
          checkForUnknownOptions();
          this._processArguments();
          this.parent.emit(commandEvent, operands, unknown);
        } else if (operands.length) {
          if (this._findCommand("*")) {
            return this._dispatchSubcommand("*", operands, unknown);
          }
          if (this.listenerCount("command:*")) {
            this.emit("command:*", operands, unknown);
          } else if (this.commands.length) {
            this.unknownCommand();
          } else {
            checkForUnknownOptions();
            this._processArguments();
          }
        } else if (this.commands.length) {
          checkForUnknownOptions();
          this.help({ error: true });
        } else {
          checkForUnknownOptions();
          this._processArguments();
        }
      }
      /**
       * Find matching command.
       *
       * @api private
       */
      _findCommand(name) {
        if (!name) return void 0;
        return this.commands.find((cmd) => cmd._name === name || cmd._aliases.includes(name));
      }
      /**
       * Return an option matching `arg` if any.
       *
       * @param {string} arg
       * @return {Option}
       * @api private
       */
      _findOption(arg) {
        return this.options.find((option) => option.is(arg));
      }
      /**
       * Display an error message if a mandatory option does not have a value.
       * Called after checking for help flags in leaf subcommand.
       *
       * @api private
       */
      _checkForMissingMandatoryOptions() {
        this._getCommandAndAncestors().forEach((cmd) => {
          cmd.options.forEach((anOption) => {
            if (anOption.mandatory && cmd.getOptionValue(anOption.attributeName()) === void 0) {
              cmd.missingMandatoryOptionValue(anOption);
            }
          });
        });
      }
      /**
       * Display an error message if conflicting options are used together in this.
       *
       * @api private
       */
      _checkForConflictingLocalOptions() {
        const definedNonDefaultOptions = this.options.filter(
          (option) => {
            const optionKey = option.attributeName();
            if (this.getOptionValue(optionKey) === void 0) {
              return false;
            }
            return this.getOptionValueSource(optionKey) !== "default";
          }
        );
        const optionsWithConflicting = definedNonDefaultOptions.filter(
          (option) => option.conflictsWith.length > 0
        );
        optionsWithConflicting.forEach((option) => {
          const conflictingAndDefined = definedNonDefaultOptions.find(
            (defined) => option.conflictsWith.includes(defined.attributeName())
          );
          if (conflictingAndDefined) {
            this._conflictingOption(option, conflictingAndDefined);
          }
        });
      }
      /**
       * Display an error message if conflicting options are used together.
       * Called after checking for help flags in leaf subcommand.
       *
       * @api private
       */
      _checkForConflictingOptions() {
        this._getCommandAndAncestors().forEach((cmd) => {
          cmd._checkForConflictingLocalOptions();
        });
      }
      /**
       * Parse options from `argv` removing known options,
       * and return argv split into operands and unknown arguments.
       *
       * Examples:
       *
       *     argv => operands, unknown
       *     --known kkk op => [op], []
       *     op --known kkk => [op], []
       *     sub --unknown uuu op => [sub], [--unknown uuu op]
       *     sub -- --unknown uuu op => [sub --unknown uuu op], []
       *
       * @param {String[]} argv
       * @return {{operands: String[], unknown: String[]}}
       */
      parseOptions(argv) {
        const operands = [];
        const unknown = [];
        let dest = operands;
        const args = argv.slice();
        function maybeOption(arg) {
          return arg.length > 1 && arg[0] === "-";
        }
        __name(maybeOption, "maybeOption");
        let activeVariadicOption = null;
        while (args.length) {
          const arg = args.shift();
          if (arg === "--") {
            if (dest === unknown) dest.push(arg);
            dest.push(...args);
            break;
          }
          if (activeVariadicOption && !maybeOption(arg)) {
            this.emit(`option:${activeVariadicOption.name()}`, arg);
            continue;
          }
          activeVariadicOption = null;
          if (maybeOption(arg)) {
            const option = this._findOption(arg);
            if (option) {
              if (option.required) {
                const value = args.shift();
                if (value === void 0) this.optionMissingArgument(option);
                this.emit(`option:${option.name()}`, value);
              } else if (option.optional) {
                let value = null;
                if (args.length > 0 && !maybeOption(args[0])) {
                  value = args.shift();
                }
                this.emit(`option:${option.name()}`, value);
              } else {
                this.emit(`option:${option.name()}`);
              }
              activeVariadicOption = option.variadic ? option : null;
              continue;
            }
          }
          if (arg.length > 2 && arg[0] === "-" && arg[1] !== "-") {
            const option = this._findOption(`-${arg[1]}`);
            if (option) {
              if (option.required || option.optional && this._combineFlagAndOptionalValue) {
                this.emit(`option:${option.name()}`, arg.slice(2));
              } else {
                this.emit(`option:${option.name()}`);
                args.unshift(`-${arg.slice(2)}`);
              }
              continue;
            }
          }
          if (/^--[^=]+=/.test(arg)) {
            const index = arg.indexOf("=");
            const option = this._findOption(arg.slice(0, index));
            if (option && (option.required || option.optional)) {
              this.emit(`option:${option.name()}`, arg.slice(index + 1));
              continue;
            }
          }
          if (maybeOption(arg)) {
            dest = unknown;
          }
          if ((this._enablePositionalOptions || this._passThroughOptions) && operands.length === 0 && unknown.length === 0) {
            if (this._findCommand(arg)) {
              operands.push(arg);
              if (args.length > 0) unknown.push(...args);
              break;
            } else if (arg === this._helpCommandName && this._hasImplicitHelpCommand()) {
              operands.push(arg);
              if (args.length > 0) operands.push(...args);
              break;
            } else if (this._defaultCommandName) {
              unknown.push(arg);
              if (args.length > 0) unknown.push(...args);
              break;
            }
          }
          if (this._passThroughOptions) {
            dest.push(arg);
            if (args.length > 0) dest.push(...args);
            break;
          }
          dest.push(arg);
        }
        return { operands, unknown };
      }
      /**
       * Return an object containing local option values as key-value pairs.
       *
       * @return {Object}
       */
      opts() {
        if (this._storeOptionsAsProperties) {
          const result = {};
          const len = this.options.length;
          for (let i = 0; i < len; i++) {
            const key = this.options[i].attributeName();
            result[key] = key === this._versionOptionName ? this._version : this[key];
          }
          return result;
        }
        return this._optionValues;
      }
      /**
       * Return an object containing merged local and global option values as key-value pairs.
       *
       * @return {Object}
       */
      optsWithGlobals() {
        return this._getCommandAndAncestors().reduce(
          (combinedOptions, cmd) => Object.assign(combinedOptions, cmd.opts()),
          {}
        );
      }
      /**
       * Display error message and exit (or call exitOverride).
       *
       * @param {string} message
       * @param {Object} [errorOptions]
       * @param {string} [errorOptions.code] - an id string representing the error
       * @param {number} [errorOptions.exitCode] - used with process.exit
       */
      error(message, errorOptions) {
        this._outputConfiguration.outputError(`${message}
`, this._outputConfiguration.writeErr);
        if (typeof this._showHelpAfterError === "string") {
          this._outputConfiguration.writeErr(`${this._showHelpAfterError}
`);
        } else if (this._showHelpAfterError) {
          this._outputConfiguration.writeErr("\n");
          this.outputHelp({ error: true });
        }
        const config = errorOptions || {};
        const exitCode = config.exitCode || 1;
        const code = config.code || "commander.error";
        this._exit(exitCode, code, message);
      }
      /**
       * Apply any option related environment variables, if option does
       * not have a value from cli or client code.
       *
       * @api private
       */
      _parseOptionsEnv() {
        this.options.forEach((option) => {
          if (option.envVar && option.envVar in process2.env) {
            const optionKey = option.attributeName();
            if (this.getOptionValue(optionKey) === void 0 || ["default", "config", "env"].includes(this.getOptionValueSource(optionKey))) {
              if (option.required || option.optional) {
                this.emit(`optionEnv:${option.name()}`, process2.env[option.envVar]);
              } else {
                this.emit(`optionEnv:${option.name()}`);
              }
            }
          }
        });
      }
      /**
       * Apply any implied option values, if option is undefined or default value.
       *
       * @api private
       */
      _parseOptionsImplied() {
        const dualHelper = new DualOptions(this.options);
        const hasCustomOptionValue = /* @__PURE__ */ __name((optionKey) => {
          return this.getOptionValue(optionKey) !== void 0 && !["default", "implied"].includes(this.getOptionValueSource(optionKey));
        }, "hasCustomOptionValue");
        this.options.filter((option) => option.implied !== void 0 && hasCustomOptionValue(option.attributeName()) && dualHelper.valueFromOption(this.getOptionValue(option.attributeName()), option)).forEach((option) => {
          Object.keys(option.implied).filter((impliedKey) => !hasCustomOptionValue(impliedKey)).forEach((impliedKey) => {
            this.setOptionValueWithSource(impliedKey, option.implied[impliedKey], "implied");
          });
        });
      }
      /**
       * Argument `name` is missing.
       *
       * @param {string} name
       * @api private
       */
      missingArgument(name) {
        const message = `error: missing required argument '${name}'`;
        this.error(message, { code: "commander.missingArgument" });
      }
      /**
       * `Option` is missing an argument.
       *
       * @param {Option} option
       * @api private
       */
      optionMissingArgument(option) {
        const message = `error: option '${option.flags}' argument missing`;
        this.error(message, { code: "commander.optionMissingArgument" });
      }
      /**
       * `Option` does not have a value, and is a mandatory option.
       *
       * @param {Option} option
       * @api private
       */
      missingMandatoryOptionValue(option) {
        const message = `error: required option '${option.flags}' not specified`;
        this.error(message, { code: "commander.missingMandatoryOptionValue" });
      }
      /**
       * `Option` conflicts with another option.
       *
       * @param {Option} option
       * @param {Option} conflictingOption
       * @api private
       */
      _conflictingOption(option, conflictingOption) {
        const findBestOptionFromValue = /* @__PURE__ */ __name((option2) => {
          const optionKey = option2.attributeName();
          const optionValue = this.getOptionValue(optionKey);
          const negativeOption = this.options.find((target) => target.negate && optionKey === target.attributeName());
          const positiveOption = this.options.find((target) => !target.negate && optionKey === target.attributeName());
          if (negativeOption && (negativeOption.presetArg === void 0 && optionValue === false || negativeOption.presetArg !== void 0 && optionValue === negativeOption.presetArg)) {
            return negativeOption;
          }
          return positiveOption || option2;
        }, "findBestOptionFromValue");
        const getErrorMessage = /* @__PURE__ */ __name((option2) => {
          const bestOption = findBestOptionFromValue(option2);
          const optionKey = bestOption.attributeName();
          const source = this.getOptionValueSource(optionKey);
          if (source === "env") {
            return `environment variable '${bestOption.envVar}'`;
          }
          return `option '${bestOption.flags}'`;
        }, "getErrorMessage");
        const message = `error: ${getErrorMessage(option)} cannot be used with ${getErrorMessage(conflictingOption)}`;
        this.error(message, { code: "commander.conflictingOption" });
      }
      /**
       * Unknown option `flag`.
       *
       * @param {string} flag
       * @api private
       */
      unknownOption(flag) {
        if (this._allowUnknownOption) return;
        let suggestion = "";
        if (flag.startsWith("--") && this._showSuggestionAfterError) {
          let candidateFlags = [];
          let command = this;
          do {
            const moreFlags = command.createHelp().visibleOptions(command).filter((option) => option.long).map((option) => option.long);
            candidateFlags = candidateFlags.concat(moreFlags);
            command = command.parent;
          } while (command && !command._enablePositionalOptions);
          suggestion = suggestSimilar(flag, candidateFlags);
        }
        const message = `error: unknown option '${flag}'${suggestion}`;
        this.error(message, { code: "commander.unknownOption" });
      }
      /**
       * Excess arguments, more than expected.
       *
       * @param {string[]} receivedArgs
       * @api private
       */
      _excessArguments(receivedArgs) {
        if (this._allowExcessArguments) return;
        const expected = this.registeredArguments.length;
        const s = expected === 1 ? "" : "s";
        const forSubcommand = this.parent ? ` for '${this.name()}'` : "";
        const message = `error: too many arguments${forSubcommand}. Expected ${expected} argument${s} but got ${receivedArgs.length}.`;
        this.error(message, { code: "commander.excessArguments" });
      }
      /**
       * Unknown command.
       *
       * @api private
       */
      unknownCommand() {
        const unknownName = this.args[0];
        let suggestion = "";
        if (this._showSuggestionAfterError) {
          const candidateNames = [];
          this.createHelp().visibleCommands(this).forEach((command) => {
            candidateNames.push(command.name());
            if (command.alias()) candidateNames.push(command.alias());
          });
          suggestion = suggestSimilar(unknownName, candidateNames);
        }
        const message = `error: unknown command '${unknownName}'${suggestion}`;
        this.error(message, { code: "commander.unknownCommand" });
      }
      /**
       * Get or set the program version.
       *
       * This method auto-registers the "-V, --version" option which will print the version number.
       *
       * You can optionally supply the flags and description to override the defaults.
       *
       * @param {string} [str]
       * @param {string} [flags]
       * @param {string} [description]
       * @return {this | string | undefined} `this` command for chaining, or version string if no arguments
       */
      version(str, flags, description) {
        if (str === void 0) return this._version;
        this._version = str;
        flags = flags || "-V, --version";
        description = description || "output the version number";
        const versionOption = this.createOption(flags, description);
        this._versionOptionName = versionOption.attributeName();
        this.options.push(versionOption);
        this.on("option:" + versionOption.name(), () => {
          this._outputConfiguration.writeOut(`${str}
`);
          this._exit(0, "commander.version", str);
        });
        return this;
      }
      /**
       * Set the description.
       *
       * @param {string} [str]
       * @param {Object} [argsDescription]
       * @return {string|Command}
       */
      description(str, argsDescription) {
        if (str === void 0 && argsDescription === void 0) return this._description;
        this._description = str;
        if (argsDescription) {
          this._argsDescription = argsDescription;
        }
        return this;
      }
      /**
       * Set the summary. Used when listed as subcommand of parent.
       *
       * @param {string} [str]
       * @return {string|Command}
       */
      summary(str) {
        if (str === void 0) return this._summary;
        this._summary = str;
        return this;
      }
      /**
       * Set an alias for the command.
       *
       * You may call more than once to add multiple aliases. Only the first alias is shown in the auto-generated help.
       *
       * @param {string} [alias]
       * @return {string|Command}
       */
      alias(alias) {
        if (alias === void 0) return this._aliases[0];
        let command = this;
        if (this.commands.length !== 0 && this.commands[this.commands.length - 1]._executableHandler) {
          command = this.commands[this.commands.length - 1];
        }
        if (alias === command._name) throw new Error("Command alias can't be the same as its name");
        command._aliases.push(alias);
        return this;
      }
      /**
       * Set aliases for the command.
       *
       * Only the first alias is shown in the auto-generated help.
       *
       * @param {string[]} [aliases]
       * @return {string[]|Command}
       */
      aliases(aliases) {
        if (aliases === void 0) return this._aliases;
        aliases.forEach((alias) => this.alias(alias));
        return this;
      }
      /**
       * Set / get the command usage `str`.
       *
       * @param {string} [str]
       * @return {String|Command}
       */
      usage(str) {
        if (str === void 0) {
          if (this._usage) return this._usage;
          const args = this.registeredArguments.map((arg) => {
            return humanReadableArgName(arg);
          });
          return [].concat(
            this.options.length || this._hasHelpOption ? "[options]" : [],
            this.commands.length ? "[command]" : [],
            this.registeredArguments.length ? args : []
          ).join(" ");
        }
        this._usage = str;
        return this;
      }
      /**
       * Get or set the name of the command.
       *
       * @param {string} [str]
       * @return {string|Command}
       */
      name(str) {
        if (str === void 0) return this._name;
        this._name = str;
        return this;
      }
      /**
       * Set the name of the command from script filename, such as process.argv[1],
       * or require.main.filename, or __filename.
       *
       * (Used internally and public although not documented in README.)
       *
       * @example
       * program.nameFromFilename(require.main.filename);
       *
       * @param {string} filename
       * @return {Command}
       */
      nameFromFilename(filename) {
        this._name = path7.basename(filename, path7.extname(filename));
        return this;
      }
      /**
       * Get or set the directory for searching for executable subcommands of this command.
       *
       * @example
       * program.executableDir(__dirname);
       * // or
       * program.executableDir('subcommands');
       *
       * @param {string} [path]
       * @return {string|null|Command}
       */
      executableDir(path8) {
        if (path8 === void 0) return this._executableDir;
        this._executableDir = path8;
        return this;
      }
      /**
       * Return program help documentation.
       *
       * @param {{ error: boolean }} [contextOptions] - pass {error:true} to wrap for stderr instead of stdout
       * @return {string}
       */
      helpInformation(contextOptions) {
        const helper = this.createHelp();
        if (helper.helpWidth === void 0) {
          helper.helpWidth = contextOptions && contextOptions.error ? this._outputConfiguration.getErrHelpWidth() : this._outputConfiguration.getOutHelpWidth();
        }
        return helper.formatHelp(this, helper);
      }
      /**
       * @api private
       */
      _getHelpContext(contextOptions) {
        contextOptions = contextOptions || {};
        const context = { error: !!contextOptions.error };
        let write;
        if (context.error) {
          write = /* @__PURE__ */ __name((arg) => this._outputConfiguration.writeErr(arg), "write");
        } else {
          write = /* @__PURE__ */ __name((arg) => this._outputConfiguration.writeOut(arg), "write");
        }
        context.write = contextOptions.write || write;
        context.command = this;
        return context;
      }
      /**
       * Output help information for this command.
       *
       * Outputs built-in help, and custom text added using `.addHelpText()`.
       *
       * @param {{ error: boolean } | Function} [contextOptions] - pass {error:true} to write to stderr instead of stdout
       */
      outputHelp(contextOptions) {
        let deprecatedCallback;
        if (typeof contextOptions === "function") {
          deprecatedCallback = contextOptions;
          contextOptions = void 0;
        }
        const context = this._getHelpContext(contextOptions);
        this._getCommandAndAncestors().reverse().forEach((command) => command.emit("beforeAllHelp", context));
        this.emit("beforeHelp", context);
        let helpInformation = this.helpInformation(context);
        if (deprecatedCallback) {
          helpInformation = deprecatedCallback(helpInformation);
          if (typeof helpInformation !== "string" && !Buffer.isBuffer(helpInformation)) {
            throw new Error("outputHelp callback must return a string or a Buffer");
          }
        }
        context.write(helpInformation);
        if (this._helpLongFlag) {
          this.emit(this._helpLongFlag);
        }
        this.emit("afterHelp", context);
        this._getCommandAndAncestors().forEach((command) => command.emit("afterAllHelp", context));
      }
      /**
       * You can pass in flags and a description to override the help
       * flags and help description for your command. Pass in false to
       * disable the built-in help option.
       *
       * @param {string | boolean} [flags]
       * @param {string} [description]
       * @return {Command} `this` command for chaining
       */
      helpOption(flags, description) {
        if (typeof flags === "boolean") {
          this._hasHelpOption = flags;
          return this;
        }
        this._helpFlags = flags || this._helpFlags;
        this._helpDescription = description || this._helpDescription;
        const helpFlags = splitOptionFlags(this._helpFlags);
        this._helpShortFlag = helpFlags.shortFlag;
        this._helpLongFlag = helpFlags.longFlag;
        return this;
      }
      /**
       * Output help information and exit.
       *
       * Outputs built-in help, and custom text added using `.addHelpText()`.
       *
       * @param {{ error: boolean }} [contextOptions] - pass {error:true} to write to stderr instead of stdout
       */
      help(contextOptions) {
        this.outputHelp(contextOptions);
        let exitCode = process2.exitCode || 0;
        if (exitCode === 0 && contextOptions && typeof contextOptions !== "function" && contextOptions.error) {
          exitCode = 1;
        }
        this._exit(exitCode, "commander.help", "(outputHelp)");
      }
      /**
       * Add additional text to be displayed with the built-in help.
       *
       * Position is 'before' or 'after' to affect just this command,
       * and 'beforeAll' or 'afterAll' to affect this command and all its subcommands.
       *
       * @param {string} position - before or after built-in help
       * @param {string | Function} text - string to add, or a function returning a string
       * @return {Command} `this` command for chaining
       */
      addHelpText(position, text) {
        const allowedValues = ["beforeAll", "before", "after", "afterAll"];
        if (!allowedValues.includes(position)) {
          throw new Error(`Unexpected value for position to addHelpText.
Expecting one of '${allowedValues.join("', '")}'`);
        }
        const helpEvent = `${position}Help`;
        this.on(helpEvent, (context) => {
          let helpStr;
          if (typeof text === "function") {
            helpStr = text({ error: context.error, command: context.command });
          } else {
            helpStr = text;
          }
          if (helpStr) {
            context.write(`${helpStr}
`);
          }
        });
        return this;
      }
    };
    __name(_Command, "Command");
    var Command2 = _Command;
    function outputHelpIfRequested(cmd, args) {
      const helpOption = cmd._hasHelpOption && args.find((arg) => arg === cmd._helpLongFlag || arg === cmd._helpShortFlag);
      if (helpOption) {
        cmd.outputHelp();
        cmd._exit(0, "commander.helpDisplayed", "(outputHelp)");
      }
    }
    __name(outputHelpIfRequested, "outputHelpIfRequested");
    function incrementNodeInspectorPort(args) {
      return args.map((arg) => {
        if (!arg.startsWith("--inspect")) {
          return arg;
        }
        let debugOption;
        let debugHost = "127.0.0.1";
        let debugPort = "9229";
        let match;
        if ((match = arg.match(/^(--inspect(-brk)?)$/)) !== null) {
          debugOption = match[1];
        } else if ((match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+)$/)) !== null) {
          debugOption = match[1];
          if (/^\d+$/.test(match[3])) {
            debugPort = match[3];
          } else {
            debugHost = match[3];
          }
        } else if ((match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+):(\d+)$/)) !== null) {
          debugOption = match[1];
          debugHost = match[3];
          debugPort = match[4];
        }
        if (debugOption && debugPort !== "0") {
          return `${debugOption}=${debugHost}:${parseInt(debugPort) + 1}`;
        }
        return arg;
      });
    }
    __name(incrementNodeInspectorPort, "incrementNodeInspectorPort");
    exports2.Command = Command2;
  }
});

// node_modules/commander/index.js
var require_commander = __commonJS({
  "node_modules/commander/index.js"(exports2, module2) {
    var { Argument: Argument2 } = require_argument();
    var { Command: Command2 } = require_command();
    var { CommanderError: CommanderError2, InvalidArgumentError: InvalidArgumentError2 } = require_error();
    var { Help: Help2 } = require_help();
    var { Option: Option2 } = require_option();
    exports2 = module2.exports = new Command2();
    exports2.program = exports2;
    exports2.Command = Command2;
    exports2.Option = Option2;
    exports2.Argument = Argument2;
    exports2.Help = Help2;
    exports2.CommanderError = CommanderError2;
    exports2.InvalidArgumentError = InvalidArgumentError2;
    exports2.InvalidOptionArgumentError = InvalidArgumentError2;
  }
});

// node_modules/color-name/index.js
var require_color_name = __commonJS({
  "node_modules/color-name/index.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      "aliceblue": [240, 248, 255],
      "antiquewhite": [250, 235, 215],
      "aqua": [0, 255, 255],
      "aquamarine": [127, 255, 212],
      "azure": [240, 255, 255],
      "beige": [245, 245, 220],
      "bisque": [255, 228, 196],
      "black": [0, 0, 0],
      "blanchedalmond": [255, 235, 205],
      "blue": [0, 0, 255],
      "blueviolet": [138, 43, 226],
      "brown": [165, 42, 42],
      "burlywood": [222, 184, 135],
      "cadetblue": [95, 158, 160],
      "chartreuse": [127, 255, 0],
      "chocolate": [210, 105, 30],
      "coral": [255, 127, 80],
      "cornflowerblue": [100, 149, 237],
      "cornsilk": [255, 248, 220],
      "crimson": [220, 20, 60],
      "cyan": [0, 255, 255],
      "darkblue": [0, 0, 139],
      "darkcyan": [0, 139, 139],
      "darkgoldenrod": [184, 134, 11],
      "darkgray": [169, 169, 169],
      "darkgreen": [0, 100, 0],
      "darkgrey": [169, 169, 169],
      "darkkhaki": [189, 183, 107],
      "darkmagenta": [139, 0, 139],
      "darkolivegreen": [85, 107, 47],
      "darkorange": [255, 140, 0],
      "darkorchid": [153, 50, 204],
      "darkred": [139, 0, 0],
      "darksalmon": [233, 150, 122],
      "darkseagreen": [143, 188, 143],
      "darkslateblue": [72, 61, 139],
      "darkslategray": [47, 79, 79],
      "darkslategrey": [47, 79, 79],
      "darkturquoise": [0, 206, 209],
      "darkviolet": [148, 0, 211],
      "deeppink": [255, 20, 147],
      "deepskyblue": [0, 191, 255],
      "dimgray": [105, 105, 105],
      "dimgrey": [105, 105, 105],
      "dodgerblue": [30, 144, 255],
      "firebrick": [178, 34, 34],
      "floralwhite": [255, 250, 240],
      "forestgreen": [34, 139, 34],
      "fuchsia": [255, 0, 255],
      "gainsboro": [220, 220, 220],
      "ghostwhite": [248, 248, 255],
      "gold": [255, 215, 0],
      "goldenrod": [218, 165, 32],
      "gray": [128, 128, 128],
      "green": [0, 128, 0],
      "greenyellow": [173, 255, 47],
      "grey": [128, 128, 128],
      "honeydew": [240, 255, 240],
      "hotpink": [255, 105, 180],
      "indianred": [205, 92, 92],
      "indigo": [75, 0, 130],
      "ivory": [255, 255, 240],
      "khaki": [240, 230, 140],
      "lavender": [230, 230, 250],
      "lavenderblush": [255, 240, 245],
      "lawngreen": [124, 252, 0],
      "lemonchiffon": [255, 250, 205],
      "lightblue": [173, 216, 230],
      "lightcoral": [240, 128, 128],
      "lightcyan": [224, 255, 255],
      "lightgoldenrodyellow": [250, 250, 210],
      "lightgray": [211, 211, 211],
      "lightgreen": [144, 238, 144],
      "lightgrey": [211, 211, 211],
      "lightpink": [255, 182, 193],
      "lightsalmon": [255, 160, 122],
      "lightseagreen": [32, 178, 170],
      "lightskyblue": [135, 206, 250],
      "lightslategray": [119, 136, 153],
      "lightslategrey": [119, 136, 153],
      "lightsteelblue": [176, 196, 222],
      "lightyellow": [255, 255, 224],
      "lime": [0, 255, 0],
      "limegreen": [50, 205, 50],
      "linen": [250, 240, 230],
      "magenta": [255, 0, 255],
      "maroon": [128, 0, 0],
      "mediumaquamarine": [102, 205, 170],
      "mediumblue": [0, 0, 205],
      "mediumorchid": [186, 85, 211],
      "mediumpurple": [147, 112, 219],
      "mediumseagreen": [60, 179, 113],
      "mediumslateblue": [123, 104, 238],
      "mediumspringgreen": [0, 250, 154],
      "mediumturquoise": [72, 209, 204],
      "mediumvioletred": [199, 21, 133],
      "midnightblue": [25, 25, 112],
      "mintcream": [245, 255, 250],
      "mistyrose": [255, 228, 225],
      "moccasin": [255, 228, 181],
      "navajowhite": [255, 222, 173],
      "navy": [0, 0, 128],
      "oldlace": [253, 245, 230],
      "olive": [128, 128, 0],
      "olivedrab": [107, 142, 35],
      "orange": [255, 165, 0],
      "orangered": [255, 69, 0],
      "orchid": [218, 112, 214],
      "palegoldenrod": [238, 232, 170],
      "palegreen": [152, 251, 152],
      "paleturquoise": [175, 238, 238],
      "palevioletred": [219, 112, 147],
      "papayawhip": [255, 239, 213],
      "peachpuff": [255, 218, 185],
      "peru": [205, 133, 63],
      "pink": [255, 192, 203],
      "plum": [221, 160, 221],
      "powderblue": [176, 224, 230],
      "purple": [128, 0, 128],
      "rebeccapurple": [102, 51, 153],
      "red": [255, 0, 0],
      "rosybrown": [188, 143, 143],
      "royalblue": [65, 105, 225],
      "saddlebrown": [139, 69, 19],
      "salmon": [250, 128, 114],
      "sandybrown": [244, 164, 96],
      "seagreen": [46, 139, 87],
      "seashell": [255, 245, 238],
      "sienna": [160, 82, 45],
      "silver": [192, 192, 192],
      "skyblue": [135, 206, 235],
      "slateblue": [106, 90, 205],
      "slategray": [112, 128, 144],
      "slategrey": [112, 128, 144],
      "snow": [255, 250, 250],
      "springgreen": [0, 255, 127],
      "steelblue": [70, 130, 180],
      "tan": [210, 180, 140],
      "teal": [0, 128, 128],
      "thistle": [216, 191, 216],
      "tomato": [255, 99, 71],
      "turquoise": [64, 224, 208],
      "violet": [238, 130, 238],
      "wheat": [245, 222, 179],
      "white": [255, 255, 255],
      "whitesmoke": [245, 245, 245],
      "yellow": [255, 255, 0],
      "yellowgreen": [154, 205, 50]
    };
  }
});

// node_modules/color-convert/conversions.js
var require_conversions = __commonJS({
  "node_modules/color-convert/conversions.js"(exports2, module2) {
    var cssKeywords = require_color_name();
    var reverseKeywords = {};
    for (const key of Object.keys(cssKeywords)) {
      reverseKeywords[cssKeywords[key]] = key;
    }
    var convert = {
      rgb: { channels: 3, labels: "rgb" },
      hsl: { channels: 3, labels: "hsl" },
      hsv: { channels: 3, labels: "hsv" },
      hwb: { channels: 3, labels: "hwb" },
      cmyk: { channels: 4, labels: "cmyk" },
      xyz: { channels: 3, labels: "xyz" },
      lab: { channels: 3, labels: "lab" },
      lch: { channels: 3, labels: "lch" },
      hex: { channels: 1, labels: ["hex"] },
      keyword: { channels: 1, labels: ["keyword"] },
      ansi16: { channels: 1, labels: ["ansi16"] },
      ansi256: { channels: 1, labels: ["ansi256"] },
      hcg: { channels: 3, labels: ["h", "c", "g"] },
      apple: { channels: 3, labels: ["r16", "g16", "b16"] },
      gray: { channels: 1, labels: ["gray"] }
    };
    module2.exports = convert;
    for (const model of Object.keys(convert)) {
      if (!("channels" in convert[model])) {
        throw new Error("missing channels property: " + model);
      }
      if (!("labels" in convert[model])) {
        throw new Error("missing channel labels property: " + model);
      }
      if (convert[model].labels.length !== convert[model].channels) {
        throw new Error("channel and label counts mismatch: " + model);
      }
      const { channels, labels } = convert[model];
      delete convert[model].channels;
      delete convert[model].labels;
      Object.defineProperty(convert[model], "channels", { value: channels });
      Object.defineProperty(convert[model], "labels", { value: labels });
    }
    convert.rgb.hsl = function(rgb) {
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const min = Math.min(r, g, b);
      const max = Math.max(r, g, b);
      const delta = max - min;
      let h;
      let s;
      if (max === min) {
        h = 0;
      } else if (r === max) {
        h = (g - b) / delta;
      } else if (g === max) {
        h = 2 + (b - r) / delta;
      } else if (b === max) {
        h = 4 + (r - g) / delta;
      }
      h = Math.min(h * 60, 360);
      if (h < 0) {
        h += 360;
      }
      const l = (min + max) / 2;
      if (max === min) {
        s = 0;
      } else if (l <= 0.5) {
        s = delta / (max + min);
      } else {
        s = delta / (2 - max - min);
      }
      return [h, s * 100, l * 100];
    };
    convert.rgb.hsv = function(rgb) {
      let rdif;
      let gdif;
      let bdif;
      let h;
      let s;
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const v = Math.max(r, g, b);
      const diff = v - Math.min(r, g, b);
      const diffc = /* @__PURE__ */ __name(function(c) {
        return (v - c) / 6 / diff + 1 / 2;
      }, "diffc");
      if (diff === 0) {
        h = 0;
        s = 0;
      } else {
        s = diff / v;
        rdif = diffc(r);
        gdif = diffc(g);
        bdif = diffc(b);
        if (r === v) {
          h = bdif - gdif;
        } else if (g === v) {
          h = 1 / 3 + rdif - bdif;
        } else if (b === v) {
          h = 2 / 3 + gdif - rdif;
        }
        if (h < 0) {
          h += 1;
        } else if (h > 1) {
          h -= 1;
        }
      }
      return [
        h * 360,
        s * 100,
        v * 100
      ];
    };
    convert.rgb.hwb = function(rgb) {
      const r = rgb[0];
      const g = rgb[1];
      let b = rgb[2];
      const h = convert.rgb.hsl(rgb)[0];
      const w = 1 / 255 * Math.min(r, Math.min(g, b));
      b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
      return [h, w * 100, b * 100];
    };
    convert.rgb.cmyk = function(rgb) {
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const k = Math.min(1 - r, 1 - g, 1 - b);
      const c = (1 - r - k) / (1 - k) || 0;
      const m = (1 - g - k) / (1 - k) || 0;
      const y = (1 - b - k) / (1 - k) || 0;
      return [c * 100, m * 100, y * 100, k * 100];
    };
    function comparativeDistance(x, y) {
      return (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2;
    }
    __name(comparativeDistance, "comparativeDistance");
    convert.rgb.keyword = function(rgb) {
      const reversed = reverseKeywords[rgb];
      if (reversed) {
        return reversed;
      }
      let currentClosestDistance = Infinity;
      let currentClosestKeyword;
      for (const keyword of Object.keys(cssKeywords)) {
        const value = cssKeywords[keyword];
        const distance = comparativeDistance(rgb, value);
        if (distance < currentClosestDistance) {
          currentClosestDistance = distance;
          currentClosestKeyword = keyword;
        }
      }
      return currentClosestKeyword;
    };
    convert.keyword.rgb = function(keyword) {
      return cssKeywords[keyword];
    };
    convert.rgb.xyz = function(rgb) {
      let r = rgb[0] / 255;
      let g = rgb[1] / 255;
      let b = rgb[2] / 255;
      r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
      g = g > 0.04045 ? ((g + 0.055) / 1.055) ** 2.4 : g / 12.92;
      b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92;
      const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
      const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
      const z = r * 0.0193 + g * 0.1192 + b * 0.9505;
      return [x * 100, y * 100, z * 100];
    };
    convert.rgb.lab = function(rgb) {
      const xyz = convert.rgb.xyz(rgb);
      let x = xyz[0];
      let y = xyz[1];
      let z = xyz[2];
      x /= 95.047;
      y /= 100;
      z /= 108.883;
      x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
      y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
      z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
      const l = 116 * y - 16;
      const a = 500 * (x - y);
      const b = 200 * (y - z);
      return [l, a, b];
    };
    convert.hsl.rgb = function(hsl) {
      const h = hsl[0] / 360;
      const s = hsl[1] / 100;
      const l = hsl[2] / 100;
      let t2;
      let t3;
      let val;
      if (s === 0) {
        val = l * 255;
        return [val, val, val];
      }
      if (l < 0.5) {
        t2 = l * (1 + s);
      } else {
        t2 = l + s - l * s;
      }
      const t1 = 2 * l - t2;
      const rgb = [0, 0, 0];
      for (let i = 0; i < 3; i++) {
        t3 = h + 1 / 3 * -(i - 1);
        if (t3 < 0) {
          t3++;
        }
        if (t3 > 1) {
          t3--;
        }
        if (6 * t3 < 1) {
          val = t1 + (t2 - t1) * 6 * t3;
        } else if (2 * t3 < 1) {
          val = t2;
        } else if (3 * t3 < 2) {
          val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
        } else {
          val = t1;
        }
        rgb[i] = val * 255;
      }
      return rgb;
    };
    convert.hsl.hsv = function(hsl) {
      const h = hsl[0];
      let s = hsl[1] / 100;
      let l = hsl[2] / 100;
      let smin = s;
      const lmin = Math.max(l, 0.01);
      l *= 2;
      s *= l <= 1 ? l : 2 - l;
      smin *= lmin <= 1 ? lmin : 2 - lmin;
      const v = (l + s) / 2;
      const sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
      return [h, sv * 100, v * 100];
    };
    convert.hsv.rgb = function(hsv) {
      const h = hsv[0] / 60;
      const s = hsv[1] / 100;
      let v = hsv[2] / 100;
      const hi = Math.floor(h) % 6;
      const f = h - Math.floor(h);
      const p = 255 * v * (1 - s);
      const q = 255 * v * (1 - s * f);
      const t = 255 * v * (1 - s * (1 - f));
      v *= 255;
      switch (hi) {
        case 0:
          return [v, t, p];
        case 1:
          return [q, v, p];
        case 2:
          return [p, v, t];
        case 3:
          return [p, q, v];
        case 4:
          return [t, p, v];
        case 5:
          return [v, p, q];
      }
    };
    convert.hsv.hsl = function(hsv) {
      const h = hsv[0];
      const s = hsv[1] / 100;
      const v = hsv[2] / 100;
      const vmin = Math.max(v, 0.01);
      let sl;
      let l;
      l = (2 - s) * v;
      const lmin = (2 - s) * vmin;
      sl = s * vmin;
      sl /= lmin <= 1 ? lmin : 2 - lmin;
      sl = sl || 0;
      l /= 2;
      return [h, sl * 100, l * 100];
    };
    convert.hwb.rgb = function(hwb) {
      const h = hwb[0] / 360;
      let wh = hwb[1] / 100;
      let bl = hwb[2] / 100;
      const ratio = wh + bl;
      let f;
      if (ratio > 1) {
        wh /= ratio;
        bl /= ratio;
      }
      const i = Math.floor(6 * h);
      const v = 1 - bl;
      f = 6 * h - i;
      if ((i & 1) !== 0) {
        f = 1 - f;
      }
      const n = wh + f * (v - wh);
      let r;
      let g;
      let b;
      switch (i) {
        default:
        case 6:
        case 0:
          r = v;
          g = n;
          b = wh;
          break;
        case 1:
          r = n;
          g = v;
          b = wh;
          break;
        case 2:
          r = wh;
          g = v;
          b = n;
          break;
        case 3:
          r = wh;
          g = n;
          b = v;
          break;
        case 4:
          r = n;
          g = wh;
          b = v;
          break;
        case 5:
          r = v;
          g = wh;
          b = n;
          break;
      }
      return [r * 255, g * 255, b * 255];
    };
    convert.cmyk.rgb = function(cmyk) {
      const c = cmyk[0] / 100;
      const m = cmyk[1] / 100;
      const y = cmyk[2] / 100;
      const k = cmyk[3] / 100;
      const r = 1 - Math.min(1, c * (1 - k) + k);
      const g = 1 - Math.min(1, m * (1 - k) + k);
      const b = 1 - Math.min(1, y * (1 - k) + k);
      return [r * 255, g * 255, b * 255];
    };
    convert.xyz.rgb = function(xyz) {
      const x = xyz[0] / 100;
      const y = xyz[1] / 100;
      const z = xyz[2] / 100;
      let r;
      let g;
      let b;
      r = x * 3.2406 + y * -1.5372 + z * -0.4986;
      g = x * -0.9689 + y * 1.8758 + z * 0.0415;
      b = x * 0.0557 + y * -0.204 + z * 1.057;
      r = r > 31308e-7 ? 1.055 * r ** (1 / 2.4) - 0.055 : r * 12.92;
      g = g > 31308e-7 ? 1.055 * g ** (1 / 2.4) - 0.055 : g * 12.92;
      b = b > 31308e-7 ? 1.055 * b ** (1 / 2.4) - 0.055 : b * 12.92;
      r = Math.min(Math.max(0, r), 1);
      g = Math.min(Math.max(0, g), 1);
      b = Math.min(Math.max(0, b), 1);
      return [r * 255, g * 255, b * 255];
    };
    convert.xyz.lab = function(xyz) {
      let x = xyz[0];
      let y = xyz[1];
      let z = xyz[2];
      x /= 95.047;
      y /= 100;
      z /= 108.883;
      x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
      y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
      z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
      const l = 116 * y - 16;
      const a = 500 * (x - y);
      const b = 200 * (y - z);
      return [l, a, b];
    };
    convert.lab.xyz = function(lab) {
      const l = lab[0];
      const a = lab[1];
      const b = lab[2];
      let x;
      let y;
      let z;
      y = (l + 16) / 116;
      x = a / 500 + y;
      z = y - b / 200;
      const y2 = y ** 3;
      const x2 = x ** 3;
      const z2 = z ** 3;
      y = y2 > 8856e-6 ? y2 : (y - 16 / 116) / 7.787;
      x = x2 > 8856e-6 ? x2 : (x - 16 / 116) / 7.787;
      z = z2 > 8856e-6 ? z2 : (z - 16 / 116) / 7.787;
      x *= 95.047;
      y *= 100;
      z *= 108.883;
      return [x, y, z];
    };
    convert.lab.lch = function(lab) {
      const l = lab[0];
      const a = lab[1];
      const b = lab[2];
      let h;
      const hr = Math.atan2(b, a);
      h = hr * 360 / 2 / Math.PI;
      if (h < 0) {
        h += 360;
      }
      const c = Math.sqrt(a * a + b * b);
      return [l, c, h];
    };
    convert.lch.lab = function(lch) {
      const l = lch[0];
      const c = lch[1];
      const h = lch[2];
      const hr = h / 360 * 2 * Math.PI;
      const a = c * Math.cos(hr);
      const b = c * Math.sin(hr);
      return [l, a, b];
    };
    convert.rgb.ansi16 = function(args, saturation = null) {
      const [r, g, b] = args;
      let value = saturation === null ? convert.rgb.hsv(args)[2] : saturation;
      value = Math.round(value / 50);
      if (value === 0) {
        return 30;
      }
      let ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));
      if (value === 2) {
        ansi += 60;
      }
      return ansi;
    };
    convert.hsv.ansi16 = function(args) {
      return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
    };
    convert.rgb.ansi256 = function(args) {
      const r = args[0];
      const g = args[1];
      const b = args[2];
      if (r === g && g === b) {
        if (r < 8) {
          return 16;
        }
        if (r > 248) {
          return 231;
        }
        return Math.round((r - 8) / 247 * 24) + 232;
      }
      const ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
      return ansi;
    };
    convert.ansi16.rgb = function(args) {
      let color = args % 10;
      if (color === 0 || color === 7) {
        if (args > 50) {
          color += 3.5;
        }
        color = color / 10.5 * 255;
        return [color, color, color];
      }
      const mult = (~~(args > 50) + 1) * 0.5;
      const r = (color & 1) * mult * 255;
      const g = (color >> 1 & 1) * mult * 255;
      const b = (color >> 2 & 1) * mult * 255;
      return [r, g, b];
    };
    convert.ansi256.rgb = function(args) {
      if (args >= 232) {
        const c = (args - 232) * 10 + 8;
        return [c, c, c];
      }
      args -= 16;
      let rem;
      const r = Math.floor(args / 36) / 5 * 255;
      const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
      const b = rem % 6 / 5 * 255;
      return [r, g, b];
    };
    convert.rgb.hex = function(args) {
      const integer = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
      const string = integer.toString(16).toUpperCase();
      return "000000".substring(string.length) + string;
    };
    convert.hex.rgb = function(args) {
      const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
      if (!match) {
        return [0, 0, 0];
      }
      let colorString = match[0];
      if (match[0].length === 3) {
        colorString = colorString.split("").map((char) => {
          return char + char;
        }).join("");
      }
      const integer = parseInt(colorString, 16);
      const r = integer >> 16 & 255;
      const g = integer >> 8 & 255;
      const b = integer & 255;
      return [r, g, b];
    };
    convert.rgb.hcg = function(rgb) {
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const max = Math.max(Math.max(r, g), b);
      const min = Math.min(Math.min(r, g), b);
      const chroma = max - min;
      let grayscale;
      let hue;
      if (chroma < 1) {
        grayscale = min / (1 - chroma);
      } else {
        grayscale = 0;
      }
      if (chroma <= 0) {
        hue = 0;
      } else if (max === r) {
        hue = (g - b) / chroma % 6;
      } else if (max === g) {
        hue = 2 + (b - r) / chroma;
      } else {
        hue = 4 + (r - g) / chroma;
      }
      hue /= 6;
      hue %= 1;
      return [hue * 360, chroma * 100, grayscale * 100];
    };
    convert.hsl.hcg = function(hsl) {
      const s = hsl[1] / 100;
      const l = hsl[2] / 100;
      const c = l < 0.5 ? 2 * s * l : 2 * s * (1 - l);
      let f = 0;
      if (c < 1) {
        f = (l - 0.5 * c) / (1 - c);
      }
      return [hsl[0], c * 100, f * 100];
    };
    convert.hsv.hcg = function(hsv) {
      const s = hsv[1] / 100;
      const v = hsv[2] / 100;
      const c = s * v;
      let f = 0;
      if (c < 1) {
        f = (v - c) / (1 - c);
      }
      return [hsv[0], c * 100, f * 100];
    };
    convert.hcg.rgb = function(hcg) {
      const h = hcg[0] / 360;
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      if (c === 0) {
        return [g * 255, g * 255, g * 255];
      }
      const pure = [0, 0, 0];
      const hi = h % 1 * 6;
      const v = hi % 1;
      const w = 1 - v;
      let mg = 0;
      switch (Math.floor(hi)) {
        case 0:
          pure[0] = 1;
          pure[1] = v;
          pure[2] = 0;
          break;
        case 1:
          pure[0] = w;
          pure[1] = 1;
          pure[2] = 0;
          break;
        case 2:
          pure[0] = 0;
          pure[1] = 1;
          pure[2] = v;
          break;
        case 3:
          pure[0] = 0;
          pure[1] = w;
          pure[2] = 1;
          break;
        case 4:
          pure[0] = v;
          pure[1] = 0;
          pure[2] = 1;
          break;
        default:
          pure[0] = 1;
          pure[1] = 0;
          pure[2] = w;
      }
      mg = (1 - c) * g;
      return [
        (c * pure[0] + mg) * 255,
        (c * pure[1] + mg) * 255,
        (c * pure[2] + mg) * 255
      ];
    };
    convert.hcg.hsv = function(hcg) {
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      const v = c + g * (1 - c);
      let f = 0;
      if (v > 0) {
        f = c / v;
      }
      return [hcg[0], f * 100, v * 100];
    };
    convert.hcg.hsl = function(hcg) {
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      const l = g * (1 - c) + 0.5 * c;
      let s = 0;
      if (l > 0 && l < 0.5) {
        s = c / (2 * l);
      } else if (l >= 0.5 && l < 1) {
        s = c / (2 * (1 - l));
      }
      return [hcg[0], s * 100, l * 100];
    };
    convert.hcg.hwb = function(hcg) {
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      const v = c + g * (1 - c);
      return [hcg[0], (v - c) * 100, (1 - v) * 100];
    };
    convert.hwb.hcg = function(hwb) {
      const w = hwb[1] / 100;
      const b = hwb[2] / 100;
      const v = 1 - b;
      const c = v - w;
      let g = 0;
      if (c < 1) {
        g = (v - c) / (1 - c);
      }
      return [hwb[0], c * 100, g * 100];
    };
    convert.apple.rgb = function(apple) {
      return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
    };
    convert.rgb.apple = function(rgb) {
      return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
    };
    convert.gray.rgb = function(args) {
      return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
    };
    convert.gray.hsl = function(args) {
      return [0, 0, args[0]];
    };
    convert.gray.hsv = convert.gray.hsl;
    convert.gray.hwb = function(gray) {
      return [0, 100, gray[0]];
    };
    convert.gray.cmyk = function(gray) {
      return [0, 0, 0, gray[0]];
    };
    convert.gray.lab = function(gray) {
      return [gray[0], 0, 0];
    };
    convert.gray.hex = function(gray) {
      const val = Math.round(gray[0] / 100 * 255) & 255;
      const integer = (val << 16) + (val << 8) + val;
      const string = integer.toString(16).toUpperCase();
      return "000000".substring(string.length) + string;
    };
    convert.rgb.gray = function(rgb) {
      const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
      return [val / 255 * 100];
    };
  }
});

// node_modules/color-convert/route.js
var require_route = __commonJS({
  "node_modules/color-convert/route.js"(exports2, module2) {
    var conversions = require_conversions();
    function buildGraph() {
      const graph = {};
      const models = Object.keys(conversions);
      for (let len = models.length, i = 0; i < len; i++) {
        graph[models[i]] = {
          // http://jsperf.com/1-vs-infinity
          // micro-opt, but this is simple.
          distance: -1,
          parent: null
        };
      }
      return graph;
    }
    __name(buildGraph, "buildGraph");
    function deriveBFS(fromModel) {
      const graph = buildGraph();
      const queue = [fromModel];
      graph[fromModel].distance = 0;
      while (queue.length) {
        const current = queue.pop();
        const adjacents = Object.keys(conversions[current]);
        for (let len = adjacents.length, i = 0; i < len; i++) {
          const adjacent = adjacents[i];
          const node = graph[adjacent];
          if (node.distance === -1) {
            node.distance = graph[current].distance + 1;
            node.parent = current;
            queue.unshift(adjacent);
          }
        }
      }
      return graph;
    }
    __name(deriveBFS, "deriveBFS");
    function link(from, to) {
      return function(args) {
        return to(from(args));
      };
    }
    __name(link, "link");
    function wrapConversion(toModel, graph) {
      const path7 = [graph[toModel].parent, toModel];
      let fn = conversions[graph[toModel].parent][toModel];
      let cur = graph[toModel].parent;
      while (graph[cur].parent) {
        path7.unshift(graph[cur].parent);
        fn = link(conversions[graph[cur].parent][cur], fn);
        cur = graph[cur].parent;
      }
      fn.conversion = path7;
      return fn;
    }
    __name(wrapConversion, "wrapConversion");
    module2.exports = function(fromModel) {
      const graph = deriveBFS(fromModel);
      const conversion = {};
      const models = Object.keys(graph);
      for (let len = models.length, i = 0; i < len; i++) {
        const toModel = models[i];
        const node = graph[toModel];
        if (node.parent === null) {
          continue;
        }
        conversion[toModel] = wrapConversion(toModel, graph);
      }
      return conversion;
    };
  }
});

// node_modules/color-convert/index.js
var require_color_convert = __commonJS({
  "node_modules/color-convert/index.js"(exports2, module2) {
    var conversions = require_conversions();
    var route = require_route();
    var convert = {};
    var models = Object.keys(conversions);
    function wrapRaw(fn) {
      const wrappedFn = /* @__PURE__ */ __name(function(...args) {
        const arg0 = args[0];
        if (arg0 === void 0 || arg0 === null) {
          return arg0;
        }
        if (arg0.length > 1) {
          args = arg0;
        }
        return fn(args);
      }, "wrappedFn");
      if ("conversion" in fn) {
        wrappedFn.conversion = fn.conversion;
      }
      return wrappedFn;
    }
    __name(wrapRaw, "wrapRaw");
    function wrapRounded(fn) {
      const wrappedFn = /* @__PURE__ */ __name(function(...args) {
        const arg0 = args[0];
        if (arg0 === void 0 || arg0 === null) {
          return arg0;
        }
        if (arg0.length > 1) {
          args = arg0;
        }
        const result = fn(args);
        if (typeof result === "object") {
          for (let len = result.length, i = 0; i < len; i++) {
            result[i] = Math.round(result[i]);
          }
        }
        return result;
      }, "wrappedFn");
      if ("conversion" in fn) {
        wrappedFn.conversion = fn.conversion;
      }
      return wrappedFn;
    }
    __name(wrapRounded, "wrapRounded");
    models.forEach((fromModel) => {
      convert[fromModel] = {};
      Object.defineProperty(convert[fromModel], "channels", { value: conversions[fromModel].channels });
      Object.defineProperty(convert[fromModel], "labels", { value: conversions[fromModel].labels });
      const routes = route(fromModel);
      const routeModels = Object.keys(routes);
      routeModels.forEach((toModel) => {
        const fn = routes[toModel];
        convert[fromModel][toModel] = wrapRounded(fn);
        convert[fromModel][toModel].raw = wrapRaw(fn);
      });
    });
    module2.exports = convert;
  }
});

// node_modules/ansi-styles/index.js
var require_ansi_styles = __commonJS({
  "node_modules/ansi-styles/index.js"(exports2, module2) {
    "use strict";
    var wrapAnsi16 = /* @__PURE__ */ __name((fn, offset) => (...args) => {
      const code = fn(...args);
      return `\x1B[${code + offset}m`;
    }, "wrapAnsi16");
    var wrapAnsi256 = /* @__PURE__ */ __name((fn, offset) => (...args) => {
      const code = fn(...args);
      return `\x1B[${38 + offset};5;${code}m`;
    }, "wrapAnsi256");
    var wrapAnsi16m = /* @__PURE__ */ __name((fn, offset) => (...args) => {
      const rgb = fn(...args);
      return `\x1B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
    }, "wrapAnsi16m");
    var ansi2ansi = /* @__PURE__ */ __name((n) => n, "ansi2ansi");
    var rgb2rgb = /* @__PURE__ */ __name((r, g, b) => [r, g, b], "rgb2rgb");
    var setLazyProperty = /* @__PURE__ */ __name((object, property, get) => {
      Object.defineProperty(object, property, {
        get: /* @__PURE__ */ __name(() => {
          const value = get();
          Object.defineProperty(object, property, {
            value,
            enumerable: true,
            configurable: true
          });
          return value;
        }, "get"),
        enumerable: true,
        configurable: true
      });
    }, "setLazyProperty");
    var colorConvert;
    var makeDynamicStyles = /* @__PURE__ */ __name((wrap, targetSpace, identity, isBackground) => {
      if (colorConvert === void 0) {
        colorConvert = require_color_convert();
      }
      const offset = isBackground ? 10 : 0;
      const styles = {};
      for (const [sourceSpace, suite] of Object.entries(colorConvert)) {
        const name = sourceSpace === "ansi16" ? "ansi" : sourceSpace;
        if (sourceSpace === targetSpace) {
          styles[name] = wrap(identity, offset);
        } else if (typeof suite === "object") {
          styles[name] = wrap(suite[targetSpace], offset);
        }
      }
      return styles;
    }, "makeDynamicStyles");
    function assembleStyles() {
      const codes = /* @__PURE__ */ new Map();
      const styles = {
        modifier: {
          reset: [0, 0],
          // 21 isn't widely supported and 22 does the same thing
          bold: [1, 22],
          dim: [2, 22],
          italic: [3, 23],
          underline: [4, 24],
          inverse: [7, 27],
          hidden: [8, 28],
          strikethrough: [9, 29]
        },
        color: {
          black: [30, 39],
          red: [31, 39],
          green: [32, 39],
          yellow: [33, 39],
          blue: [34, 39],
          magenta: [35, 39],
          cyan: [36, 39],
          white: [37, 39],
          // Bright color
          blackBright: [90, 39],
          redBright: [91, 39],
          greenBright: [92, 39],
          yellowBright: [93, 39],
          blueBright: [94, 39],
          magentaBright: [95, 39],
          cyanBright: [96, 39],
          whiteBright: [97, 39]
        },
        bgColor: {
          bgBlack: [40, 49],
          bgRed: [41, 49],
          bgGreen: [42, 49],
          bgYellow: [43, 49],
          bgBlue: [44, 49],
          bgMagenta: [45, 49],
          bgCyan: [46, 49],
          bgWhite: [47, 49],
          // Bright color
          bgBlackBright: [100, 49],
          bgRedBright: [101, 49],
          bgGreenBright: [102, 49],
          bgYellowBright: [103, 49],
          bgBlueBright: [104, 49],
          bgMagentaBright: [105, 49],
          bgCyanBright: [106, 49],
          bgWhiteBright: [107, 49]
        }
      };
      styles.color.gray = styles.color.blackBright;
      styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
      styles.color.grey = styles.color.blackBright;
      styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;
      for (const [groupName, group] of Object.entries(styles)) {
        for (const [styleName, style] of Object.entries(group)) {
          styles[styleName] = {
            open: `\x1B[${style[0]}m`,
            close: `\x1B[${style[1]}m`
          };
          group[styleName] = styles[styleName];
          codes.set(style[0], style[1]);
        }
        Object.defineProperty(styles, groupName, {
          value: group,
          enumerable: false
        });
      }
      Object.defineProperty(styles, "codes", {
        value: codes,
        enumerable: false
      });
      styles.color.close = "\x1B[39m";
      styles.bgColor.close = "\x1B[49m";
      setLazyProperty(styles.color, "ansi", () => makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, false));
      setLazyProperty(styles.color, "ansi256", () => makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, false));
      setLazyProperty(styles.color, "ansi16m", () => makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, false));
      setLazyProperty(styles.bgColor, "ansi", () => makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, true));
      setLazyProperty(styles.bgColor, "ansi256", () => makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, true));
      setLazyProperty(styles.bgColor, "ansi16m", () => makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, true));
      return styles;
    }
    __name(assembleStyles, "assembleStyles");
    Object.defineProperty(module2, "exports", {
      enumerable: true,
      get: assembleStyles
    });
  }
});

// node_modules/has-flag/index.js
var require_has_flag = __commonJS({
  "node_modules/has-flag/index.js"(exports2, module2) {
    "use strict";
    module2.exports = (flag, argv = process.argv) => {
      const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
      const position = argv.indexOf(prefix + flag);
      const terminatorPosition = argv.indexOf("--");
      return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
    };
  }
});

// node_modules/supports-color/index.js
var require_supports_color = __commonJS({
  "node_modules/supports-color/index.js"(exports2, module2) {
    "use strict";
    var os4 = require("os");
    var tty = require("tty");
    var hasFlag = require_has_flag();
    var { env } = process;
    var forceColor;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
      forceColor = 0;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      forceColor = 1;
    }
    if ("FORCE_COLOR" in env) {
      if (env.FORCE_COLOR === "true") {
        forceColor = 1;
      } else if (env.FORCE_COLOR === "false") {
        forceColor = 0;
      } else {
        forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
      }
    }
    function translateLevel(level) {
      if (level === 0) {
        return false;
      }
      return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    __name(translateLevel, "translateLevel");
    function supportsColor(haveStream, streamIsTTY) {
      if (forceColor === 0) {
        return 0;
      }
      if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
        return 3;
      }
      if (hasFlag("color=256")) {
        return 2;
      }
      if (haveStream && !streamIsTTY && forceColor === void 0) {
        return 0;
      }
      const min = forceColor || 0;
      if (env.TERM === "dumb") {
        return min;
      }
      if (process.platform === "win32") {
        const osRelease = os4.release().split(".");
        if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
          return 1;
        }
        return min;
      }
      if ("TEAMCITY_VERSION" in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
      }
      if (env.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in env) {
        const version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
          case "iTerm.app":
            return version >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env) {
        return 1;
      }
      return min;
    }
    __name(supportsColor, "supportsColor");
    function getSupportLevel(stream) {
      const level = supportsColor(stream, stream && stream.isTTY);
      return translateLevel(level);
    }
    __name(getSupportLevel, "getSupportLevel");
    module2.exports = {
      supportsColor: getSupportLevel,
      stdout: translateLevel(supportsColor(true, tty.isatty(1))),
      stderr: translateLevel(supportsColor(true, tty.isatty(2)))
    };
  }
});

// node_modules/chalk/source/util.js
var require_util = __commonJS({
  "node_modules/chalk/source/util.js"(exports2, module2) {
    "use strict";
    var stringReplaceAll = /* @__PURE__ */ __name((string, substring, replacer) => {
      let index = string.indexOf(substring);
      if (index === -1) {
        return string;
      }
      const substringLength = substring.length;
      let endIndex = 0;
      let returnValue = "";
      do {
        returnValue += string.substr(endIndex, index - endIndex) + substring + replacer;
        endIndex = index + substringLength;
        index = string.indexOf(substring, endIndex);
      } while (index !== -1);
      returnValue += string.substr(endIndex);
      return returnValue;
    }, "stringReplaceAll");
    var stringEncaseCRLFWithFirstIndex = /* @__PURE__ */ __name((string, prefix, postfix, index) => {
      let endIndex = 0;
      let returnValue = "";
      do {
        const gotCR = string[index - 1] === "\r";
        returnValue += string.substr(endIndex, (gotCR ? index - 1 : index) - endIndex) + prefix + (gotCR ? "\r\n" : "\n") + postfix;
        endIndex = index + 1;
        index = string.indexOf("\n", endIndex);
      } while (index !== -1);
      returnValue += string.substr(endIndex);
      return returnValue;
    }, "stringEncaseCRLFWithFirstIndex");
    module2.exports = {
      stringReplaceAll,
      stringEncaseCRLFWithFirstIndex
    };
  }
});

// node_modules/chalk/source/templates.js
var require_templates = __commonJS({
  "node_modules/chalk/source/templates.js"(exports2, module2) {
    "use strict";
    var TEMPLATE_REGEX = /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
    var STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
    var STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
    var ESCAPE_REGEX = /\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi;
    var ESCAPES = /* @__PURE__ */ new Map([
      ["n", "\n"],
      ["r", "\r"],
      ["t", "	"],
      ["b", "\b"],
      ["f", "\f"],
      ["v", "\v"],
      ["0", "\0"],
      ["\\", "\\"],
      ["e", "\x1B"],
      ["a", "\x07"]
    ]);
    function unescape(c) {
      const u = c[0] === "u";
      const bracket = c[1] === "{";
      if (u && !bracket && c.length === 5 || c[0] === "x" && c.length === 3) {
        return String.fromCharCode(parseInt(c.slice(1), 16));
      }
      if (u && bracket) {
        return String.fromCodePoint(parseInt(c.slice(2, -1), 16));
      }
      return ESCAPES.get(c) || c;
    }
    __name(unescape, "unescape");
    function parseArguments(name, arguments_) {
      const results = [];
      const chunks = arguments_.trim().split(/\s*,\s*/g);
      let matches;
      for (const chunk of chunks) {
        const number = Number(chunk);
        if (!Number.isNaN(number)) {
          results.push(number);
        } else if (matches = chunk.match(STRING_REGEX)) {
          results.push(matches[2].replace(ESCAPE_REGEX, (m, escape, character) => escape ? unescape(escape) : character));
        } else {
          throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
        }
      }
      return results;
    }
    __name(parseArguments, "parseArguments");
    function parseStyle(style) {
      STYLE_REGEX.lastIndex = 0;
      const results = [];
      let matches;
      while ((matches = STYLE_REGEX.exec(style)) !== null) {
        const name = matches[1];
        if (matches[2]) {
          const args = parseArguments(name, matches[2]);
          results.push([name].concat(args));
        } else {
          results.push([name]);
        }
      }
      return results;
    }
    __name(parseStyle, "parseStyle");
    function buildStyle(chalk2, styles) {
      const enabled = {};
      for (const layer of styles) {
        for (const style of layer.styles) {
          enabled[style[0]] = layer.inverse ? null : style.slice(1);
        }
      }
      let current = chalk2;
      for (const [styleName, styles2] of Object.entries(enabled)) {
        if (!Array.isArray(styles2)) {
          continue;
        }
        if (!(styleName in current)) {
          throw new Error(`Unknown Chalk style: ${styleName}`);
        }
        current = styles2.length > 0 ? current[styleName](...styles2) : current[styleName];
      }
      return current;
    }
    __name(buildStyle, "buildStyle");
    module2.exports = (chalk2, temporary) => {
      const styles = [];
      const chunks = [];
      let chunk = [];
      temporary.replace(TEMPLATE_REGEX, (m, escapeCharacter, inverse, style, close, character) => {
        if (escapeCharacter) {
          chunk.push(unescape(escapeCharacter));
        } else if (style) {
          const string = chunk.join("");
          chunk = [];
          chunks.push(styles.length === 0 ? string : buildStyle(chalk2, styles)(string));
          styles.push({ inverse, styles: parseStyle(style) });
        } else if (close) {
          if (styles.length === 0) {
            throw new Error("Found extraneous } in Chalk template literal");
          }
          chunks.push(buildStyle(chalk2, styles)(chunk.join("")));
          chunk = [];
          styles.pop();
        } else {
          chunk.push(character);
        }
      });
      chunks.push(chunk.join(""));
      if (styles.length > 0) {
        const errMessage = `Chalk template literal is missing ${styles.length} closing bracket${styles.length === 1 ? "" : "s"} (\`}\`)`;
        throw new Error(errMessage);
      }
      return chunks.join("");
    };
  }
});

// node_modules/chalk/source/index.js
var require_source = __commonJS({
  "node_modules/chalk/source/index.js"(exports2, module2) {
    "use strict";
    var ansiStyles = require_ansi_styles();
    var { stdout: stdoutColor, stderr: stderrColor } = require_supports_color();
    var {
      stringReplaceAll,
      stringEncaseCRLFWithFirstIndex
    } = require_util();
    var { isArray } = Array;
    var levelMapping = [
      "ansi",
      "ansi",
      "ansi256",
      "ansi16m"
    ];
    var styles = /* @__PURE__ */ Object.create(null);
    var applyOptions = /* @__PURE__ */ __name((object, options = {}) => {
      if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
        throw new Error("The `level` option should be an integer from 0 to 3");
      }
      const colorLevel = stdoutColor ? stdoutColor.level : 0;
      object.level = options.level === void 0 ? colorLevel : options.level;
    }, "applyOptions");
    var _ChalkClass = class _ChalkClass {
      constructor(options) {
        return chalkFactory(options);
      }
    };
    __name(_ChalkClass, "ChalkClass");
    var ChalkClass = _ChalkClass;
    var chalkFactory = /* @__PURE__ */ __name((options) => {
      const chalk3 = {};
      applyOptions(chalk3, options);
      chalk3.template = (...arguments_) => chalkTag(chalk3.template, ...arguments_);
      Object.setPrototypeOf(chalk3, Chalk.prototype);
      Object.setPrototypeOf(chalk3.template, chalk3);
      chalk3.template.constructor = () => {
        throw new Error("`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.");
      };
      chalk3.template.Instance = ChalkClass;
      return chalk3.template;
    }, "chalkFactory");
    function Chalk(options) {
      return chalkFactory(options);
    }
    __name(Chalk, "Chalk");
    for (const [styleName, style] of Object.entries(ansiStyles)) {
      styles[styleName] = {
        get() {
          const builder = createBuilder(this, createStyler(style.open, style.close, this._styler), this._isEmpty);
          Object.defineProperty(this, styleName, { value: builder });
          return builder;
        }
      };
    }
    styles.visible = {
      get() {
        const builder = createBuilder(this, this._styler, true);
        Object.defineProperty(this, "visible", { value: builder });
        return builder;
      }
    };
    var usedModels = ["rgb", "hex", "keyword", "hsl", "hsv", "hwb", "ansi", "ansi256"];
    for (const model of usedModels) {
      styles[model] = {
        get() {
          const { level } = this;
          return function(...arguments_) {
            const styler = createStyler(ansiStyles.color[levelMapping[level]][model](...arguments_), ansiStyles.color.close, this._styler);
            return createBuilder(this, styler, this._isEmpty);
          };
        }
      };
    }
    for (const model of usedModels) {
      const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
      styles[bgModel] = {
        get() {
          const { level } = this;
          return function(...arguments_) {
            const styler = createStyler(ansiStyles.bgColor[levelMapping[level]][model](...arguments_), ansiStyles.bgColor.close, this._styler);
            return createBuilder(this, styler, this._isEmpty);
          };
        }
      };
    }
    var proto = Object.defineProperties(() => {
    }, {
      ...styles,
      level: {
        enumerable: true,
        get() {
          return this._generator.level;
        },
        set(level) {
          this._generator.level = level;
        }
      }
    });
    var createStyler = /* @__PURE__ */ __name((open, close, parent) => {
      let openAll;
      let closeAll;
      if (parent === void 0) {
        openAll = open;
        closeAll = close;
      } else {
        openAll = parent.openAll + open;
        closeAll = close + parent.closeAll;
      }
      return {
        open,
        close,
        openAll,
        closeAll,
        parent
      };
    }, "createStyler");
    var createBuilder = /* @__PURE__ */ __name((self, _styler, _isEmpty) => {
      const builder = /* @__PURE__ */ __name((...arguments_) => {
        if (isArray(arguments_[0]) && isArray(arguments_[0].raw)) {
          return applyStyle(builder, chalkTag(builder, ...arguments_));
        }
        return applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
      }, "builder");
      Object.setPrototypeOf(builder, proto);
      builder._generator = self;
      builder._styler = _styler;
      builder._isEmpty = _isEmpty;
      return builder;
    }, "createBuilder");
    var applyStyle = /* @__PURE__ */ __name((self, string) => {
      if (self.level <= 0 || !string) {
        return self._isEmpty ? "" : string;
      }
      let styler = self._styler;
      if (styler === void 0) {
        return string;
      }
      const { openAll, closeAll } = styler;
      if (string.indexOf("\x1B") !== -1) {
        while (styler !== void 0) {
          string = stringReplaceAll(string, styler.close, styler.open);
          styler = styler.parent;
        }
      }
      const lfIndex = string.indexOf("\n");
      if (lfIndex !== -1) {
        string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
      }
      return openAll + string + closeAll;
    }, "applyStyle");
    var template;
    var chalkTag = /* @__PURE__ */ __name((chalk3, ...strings) => {
      const [firstString] = strings;
      if (!isArray(firstString) || !isArray(firstString.raw)) {
        return strings.join(" ");
      }
      const arguments_ = strings.slice(1);
      const parts = [firstString.raw[0]];
      for (let i = 1; i < firstString.length; i++) {
        parts.push(
          String(arguments_[i - 1]).replace(/[{}\\]/g, "\\$&"),
          String(firstString.raw[i])
        );
      }
      if (template === void 0) {
        template = require_templates();
      }
      return template(chalk3, parts.join(""));
    }, "chalkTag");
    Object.defineProperties(Chalk.prototype, styles);
    var chalk2 = Chalk();
    chalk2.supportsColor = stdoutColor;
    chalk2.stderr = Chalk({ level: stderrColor ? stderrColor.level : 0 });
    chalk2.stderr.supportsColor = stderrColor;
    module2.exports = chalk2;
  }
});

// src/shared/utils/logger.ts
var fs, path, _Logger, Logger;
var init_logger = __esm({
  "src/shared/utils/logger.ts"() {
    fs = __toESM(require("fs"));
    path = __toESM(require("path"));
    _Logger = class _Logger {
      // Only log to stderr if MCP_DEBUG is set
      static setLevel(level) {
        this.level = level;
      }
      static enableAudit(enabled = true) {
        this.auditEnabled = enabled;
        if (!this.auditFile) {
          const logDir = path.join(process.cwd(), "logs");
          if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
          }
          this.auditFile = path.join(logDir, "mcp-debug.log");
          fs.appendFileSync(this.auditFile, `
=== MCP Server Started at ${(/* @__PURE__ */ new Date()).toISOString()} ===
`);
        }
      }
      static audit(entry) {
        const fullEntry = {
          ...entry,
          timestamp: entry.timestamp || (/* @__PURE__ */ new Date()).toISOString(),
          pid: process.pid
        };
        if (this.forceFileLogging || this.auditEnabled) {
          if (!this.auditFile) {
            this.enableAudit(true);
          }
          if (this.stderrEnabled) {
            process.stderr.write(`[AUDIT] ${JSON.stringify(fullEntry)}
`);
          }
          if (this.auditFile) {
            try {
              fs.appendFileSync(this.auditFile, JSON.stringify(fullEntry) + "\n");
            } catch (err) {
              const tempFile = path.join(process.cwd(), "mcp-debug-emergency.log");
              fs.appendFileSync(tempFile, JSON.stringify(fullEntry) + "\n");
            }
          }
        }
      }
      static debug(message, ...args) {
        if (this.stderrEnabled && this.level <= 0 /* DEBUG */) {
          process.stderr.write(`[DEBUG] ${message} ${args.length > 0 ? JSON.stringify(args) : ""}
`);
        }
      }
      static info(message, ...args) {
        if (this.stderrEnabled && this.level <= 1 /* INFO */) {
          process.stderr.write(`[INFO] ${message} ${args.length > 0 ? JSON.stringify(args) : ""}
`);
        }
      }
      static warn(message, ...args) {
        if (this.stderrEnabled && this.level <= 2 /* WARN */) {
          process.stderr.write(`[WARN] ${message} ${args.length > 0 ? JSON.stringify(args) : ""}
`);
        }
      }
      static error(message, ...args) {
        if (this.level <= 3 /* ERROR */) {
          process.stderr.write(`[ERROR] ${message} ${args.length > 0 ? JSON.stringify(args) : ""}
`);
        }
      }
    };
    __name(_Logger, "Logger");
    __publicField(_Logger, "level", 1 /* INFO */);
    __publicField(_Logger, "auditEnabled", false);
    __publicField(_Logger, "auditFile");
    __publicField(_Logger, "forceFileLogging", true);
    // ALWAYS log to file
    __publicField(_Logger, "stderrEnabled", process.env.MCP_DEBUG === "true");
    Logger = _Logger;
  }
});

// src/modules/memory/core/MemoryService.ts
var MemoryService_exports = {};
__export(MemoryService_exports, {
  MemoryService: () => MemoryService
});
var _MemoryService, MemoryService;
var init_MemoryService = __esm({
  "src/modules/memory/core/MemoryService.ts"() {
    _MemoryService = class _MemoryService {
      constructor(repository, validator, cache, config) {
        this.repository = repository;
        this.validator = validator;
        this.cache = cache;
        this.config = { ...this.DEFAULT_CONFIG, ...config };
      }
      DEFAULT_CONFIG = {
        enableCache: true,
        cacheTimeout: 300,
        // 5 minutes
        validateOnStore: true,
        deduplicationEnabled: true
      };
      config;
      /**
       * Store a new memory with validation and deduplication
       */
      async store(input) {
        if (this.config.validateOnStore) {
          const validation = await this.validator.validate(input);
          if (!validation.isValid) {
            throw new Error(`Validation failed: ${validation.errors.join(", ")}`);
          }
        }
        if (this.config.deduplicationEnabled) {
          const duplicate = await this.checkDuplicate(input);
          if (duplicate) {
            return duplicate;
          }
        }
        const memory = await this.repository.create(input);
        if (this.config.enableCache) {
          await this.cache.set(`memory:${memory.id}`, memory, this.config.cacheTimeout);
        }
        return memory;
      }
      /**
       * Retrieve a memory by ID
       */
      async get(id) {
        if (this.config.enableCache) {
          const cached = await this.cache.get(`memory:${id}`);
          if (cached) {
            return cached;
          }
        }
        const memory = await this.repository.findById(id);
        if (memory && this.config.enableCache) {
          await this.cache.set(`memory:${id}`, memory, this.config.cacheTimeout);
        }
        return memory;
      }
      /**
       * Search memories with options
       */
      async search(query, options) {
        const cacheKey = `search:${query}:${JSON.stringify(options || {})}`;
        if (this.config.enableCache) {
          const cached = await this.cache.get(cacheKey);
          if (cached) {
            return cached;
          }
        }
        const results = await this.repository.search(query, options);
        if (this.config.enableCache) {
          await this.cache.set(cacheKey, results, 60);
        }
        return results;
      }
      /**
       * Update an existing memory
       */
      async update(id, updates) {
        if (this.config.validateOnStore) {
          const validation = await this.validator.validatePartial(updates);
          if (!validation.isValid) {
            throw new Error(`Validation failed: ${validation.errors.join(", ")}`);
          }
        }
        const updated = await this.repository.update(id, updates);
        if (this.config.enableCache) {
          await this.cache.delete(`memory:${id}`);
          await this.cache.deletePattern("search:*");
        }
        return updated;
      }
      /**
       * Delete a memory
       */
      async delete(id) {
        const result = await this.repository.delete(id);
        if (this.config.enableCache) {
          await this.cache.delete(`memory:${id}`);
          await this.cache.deletePattern("search:*");
        }
        return result;
      }
      /**
       * Query memories with optional filters
       * Returns all matching memories (or all if no filters)
       */
      async query(filters) {
        var _a, _b;
        const allMemories = await ((_b = (_a = this.repository).findAll) == null ? void 0 : _b.call(_a)) || [];
        if (!filters || Object.keys(filters).length === 0) {
          return allMemories;
        }
        let filtered = allMemories;
        if (filters.memory_type) {
          filtered = filtered.filter((m) => m.memoryType === filters.memory_type);
        }
        if (filters.project) {
          filtered = filtered.filter((m) => {
            var _a2;
            return ((_a2 = m.metadata) == null ? void 0 : _a2.project) === filters.project;
          });
        }
        if (filters.tags && filters.tags.length > 0) {
          filtered = filtered.filter(
            (m) => filters.tags.some((tag) => {
              var _a2, _b2;
              return (_b2 = (_a2 = m.metadata) == null ? void 0 : _a2.tags) == null ? void 0 : _b2.includes(tag);
            })
          );
        }
        if (filters.limit) {
          filtered = filtered.slice(0, filters.limit);
        }
        return filtered;
      }
      /**
       * Get memory statistics
       */
      async getStats() {
        return this.repository.getStats();
      }
      /**
       * Check for duplicate memories
       * Disabled since semantic similarity search is not available
       */
      async checkDuplicate(input) {
        return null;
      }
    };
    __name(_MemoryService, "MemoryService");
    MemoryService = _MemoryService;
  }
});

// src/modules/memory/core/types.ts
var MemoryType, ImportanceLevel, RelationshipType;
var init_types = __esm({
  "src/modules/memory/core/types.ts"() {
    MemoryType = /* @__PURE__ */ ((MemoryType2) => {
      MemoryType2["KNOWLEDGE"] = "knowledge";
      MemoryType2["TASK"] = "task";
      MemoryType2["CONVERSATION"] = "conversation";
      MemoryType2["DOCUMENT"] = "document";
      MemoryType2["CODE"] = "code";
      MemoryType2["INSIGHT"] = "insight";
      MemoryType2["DECISION"] = "decision";
      MemoryType2["REFERENCE"] = "reference";
      MemoryType2["GENERAL"] = "general";
      MemoryType2["OBSERVATION"] = "observation";
      MemoryType2["ACTION"] = "action";
      MemoryType2["RESULT"] = "result";
      MemoryType2["ERROR"] = "error";
      MemoryType2["CONTEXT"] = "context";
      MemoryType2["REFLECTION"] = "reflection";
      MemoryType2["JOURNAL"] = "journal";
      MemoryType2["MEMORY"] = "memory";
      MemoryType2["CRITICAL"] = "critical";
      return MemoryType2;
    })(MemoryType || {});
    ImportanceLevel = /* @__PURE__ */ ((ImportanceLevel2) => {
      ImportanceLevel2["LOW"] = "low";
      ImportanceLevel2["MEDIUM"] = "medium";
      ImportanceLevel2["HIGH"] = "high";
      ImportanceLevel2["CRITICAL"] = "critical";
      return ImportanceLevel2;
    })(ImportanceLevel || {});
    RelationshipType = /* @__PURE__ */ ((RelationshipType2) => {
      RelationshipType2["REFERENCES"] = "references";
      RelationshipType2["DEPENDS_ON"] = "depends_on";
      RelationshipType2["CONTRADICTS"] = "contradicts";
      RelationshipType2["SUPPORTS"] = "supports";
      RelationshipType2["REPLACES"] = "replaces";
      RelationshipType2["RELATED_TO"] = "related_to";
      return RelationshipType2;
    })(RelationshipType || {});
  }
});

// src/modules/memory/core/MemoryValidator.ts
var MemoryValidator_exports = {};
__export(MemoryValidator_exports, {
  MemoryValidator: () => MemoryValidator
});
var _MemoryValidator, MemoryValidator;
var init_MemoryValidator = __esm({
  "src/modules/memory/core/MemoryValidator.ts"() {
    init_types();
    _MemoryValidator = class _MemoryValidator {
      MAX_CONTENT_LENGTH = 5e4;
      MIN_CONTENT_LENGTH = 1;
      MAX_TAGS = 20;
      MAX_TAG_LENGTH = 50;
      VALID_MEMORY_TYPES = Object.values(MemoryType);
      VALID_IMPORTANCE_LEVELS = Object.values(ImportanceLevel);
      async validate(input) {
        const errors = [];
        if (!input.content) {
          errors.push("Content is required");
        } else if (input.content.length < this.MIN_CONTENT_LENGTH) {
          errors.push(`Content must be at least ${this.MIN_CONTENT_LENGTH} character`);
        } else if (input.content.length > this.MAX_CONTENT_LENGTH) {
          errors.push(`Content exceeds maximum length of ${this.MAX_CONTENT_LENGTH} characters`);
        }
        if (input.memoryType && !this.VALID_MEMORY_TYPES.includes(input.memoryType)) {
          errors.push(`Invalid memory type: ${input.memoryType}`);
        }
        if (input.metadata) {
          if (input.metadata.tags) {
            if (!Array.isArray(input.metadata.tags)) {
              errors.push("Tags must be an array");
            } else if (input.metadata.tags.length > this.MAX_TAGS) {
              errors.push(`Maximum ${this.MAX_TAGS} tags allowed`);
            } else {
              input.metadata.tags.forEach((tag, index) => {
                if (typeof tag !== "string") {
                  errors.push(`Tag at index ${index} must be a string`);
                } else if (tag.length > this.MAX_TAG_LENGTH) {
                  errors.push(`Tag "${tag}" exceeds maximum length of ${this.MAX_TAG_LENGTH}`);
                }
              });
            }
          }
          if (input.metadata.importance && !this.VALID_IMPORTANCE_LEVELS.includes(input.metadata.importance)) {
            errors.push(`Invalid importance level: ${input.metadata.importance}`);
          }
          if (input.metadata.confidence !== void 0) {
            if (typeof input.metadata.confidence !== "number") {
              errors.push("Confidence must be a number");
            } else if (input.metadata.confidence < 0 || input.metadata.confidence > 1) {
              errors.push("Confidence must be between 0 and 1");
            }
          }
          if (input.metadata.expiresAt) {
            const expiryDate = new Date(input.metadata.expiresAt);
            if (isNaN(expiryDate.getTime())) {
              errors.push("Invalid expiry date");
            } else if (expiryDate <= /* @__PURE__ */ new Date()) {
              errors.push("Expiry date must be in the future");
            }
          }
        }
        if (input.relationships) {
          if (!Array.isArray(input.relationships)) {
            errors.push("Relationships must be an array");
          } else {
            input.relationships.forEach((rel, index) => {
              if (!rel.targetId) {
                errors.push(`Relationship at index ${index} must have a targetId`);
              }
              if (!rel.type) {
                errors.push(`Relationship at index ${index} must have a type`);
              }
            });
          }
        }
        return {
          isValid: errors.length === 0,
          errors
        };
      }
      async validatePartial(updates) {
        const errors = [];
        if (updates.content !== void 0) {
          if (updates.content.length < this.MIN_CONTENT_LENGTH) {
            errors.push(`Content must be at least ${this.MIN_CONTENT_LENGTH} character`);
          } else if (updates.content.length > this.MAX_CONTENT_LENGTH) {
            errors.push(`Content exceeds maximum length of ${this.MAX_CONTENT_LENGTH} characters`);
          }
        }
        if (updates.memoryType && !this.VALID_MEMORY_TYPES.includes(updates.memoryType)) {
          errors.push(`Invalid memory type: ${updates.memoryType}`);
        }
        if (updates.metadata) {
          const fullInput = {
            content: "dummy",
            metadata: updates.metadata
          };
          const metadataValidation = await this.validate(fullInput);
          errors.push(...metadataValidation.errors.filter((e) => !e.includes("Content")));
        }
        return {
          isValid: errors.length === 0,
          errors
        };
      }
      /**
       * Sanitize input to ensure it's safe to store
       */
      sanitize(input) {
        var _a, _b;
        const sanitized = { ...input };
        if (sanitized.content) {
          sanitized.content = sanitized.content.trim();
        }
        if ((_a = sanitized.metadata) == null ? void 0 : _a.tags) {
          sanitized.metadata.tags = sanitized.metadata.tags.map((tag) => tag.trim().toLowerCase()).filter((tag) => tag.length > 0).slice(0, this.MAX_TAGS);
        }
        if (((_b = sanitized.metadata) == null ? void 0 : _b.confidence) !== void 0) {
          sanitized.metadata.confidence = Math.max(0, Math.min(1, sanitized.metadata.confidence));
        }
        if (!sanitized.memoryType) {
          sanitized.memoryType = "knowledge" /* KNOWLEDGE */;
        }
        if (sanitized.metadata && !sanitized.metadata.importance) {
          sanitized.metadata.importance = "medium" /* MEDIUM */;
        }
        return sanitized;
      }
    };
    __name(_MemoryValidator, "MemoryValidator");
    MemoryValidator = _MemoryValidator;
  }
});

// src/modules/memory/repositories/InMemoryRepository.ts
var InMemoryRepository_exports = {};
__export(InMemoryRepository_exports, {
  InMemoryRepository: () => InMemoryRepository
});
var import_crypto, _InMemoryRepository, InMemoryRepository;
var init_InMemoryRepository = __esm({
  "src/modules/memory/repositories/InMemoryRepository.ts"() {
    init_types();
    import_crypto = require("crypto");
    _InMemoryRepository = class _InMemoryRepository {
      memories = /* @__PURE__ */ new Map();
      typeIndex = /* @__PURE__ */ new Map();
      contentIndex = /* @__PURE__ */ new Map();
      constructor() {
        this.initialize();
      }
      initialize() {
        Object.values(MemoryType).forEach((type) => {
          this.typeIndex.set(type, /* @__PURE__ */ new Set());
        });
      }
      async create(input) {
        var _a, _b, _c, _d, _e, _f, _g;
        const id = (0, import_crypto.randomUUID)();
        const now = /* @__PURE__ */ new Date();
        const memory = {
          id,
          content: input.content,
          memoryType: input.memoryType || "knowledge" /* KNOWLEDGE */,
          path: input.path,
          metadata: {
            tags: input.tags || ((_a = input.metadata) == null ? void 0 : _a.tags) || [],
            importance: ((_b = input.metadata) == null ? void 0 : _b.importance) || "medium" /* MEDIUM */,
            confidence: ((_c = input.metadata) == null ? void 0 : _c.confidence) || 0.8,
            context: ((_d = input.metadata) == null ? void 0 : _d.context) || {},
            project: (_e = input.metadata) == null ? void 0 : _e.project,
            source: (_f = input.metadata) == null ? void 0 : _f.source,
            expiresAt: (_g = input.metadata) == null ? void 0 : _g.expiresAt
          },
          relationships: input.relationships ? input.relationships.map((rel, index) => ({
            id: rel.id || (0, import_crypto.randomUUID)(),
            sourceId: id,
            targetId: rel.targetId || "",
            type: rel.type || "related_to" /* RELATED_TO */,
            strength: rel.strength || 0.5,
            metadata: rel.metadata || {}
          })) : [],
          createdAt: now,
          updatedAt: now,
          version: 1
        };
        this.memories.set(id, memory);
        this.updateIndexes(memory, "add");
        return this.toMemory(memory);
      }
      async findById(id) {
        const memory = this.memories.get(id);
        if (!memory) return null;
        return this.toMemory(memory);
      }
      async findAll() {
        return Array.from(this.memories.values()).map((m) => this.toMemory(m));
      }
      async update(id, updates) {
        const existing = this.memories.get(id);
        if (!existing) {
          throw new Error(`Memory with id ${id} not found`);
        }
        this.updateIndexes(existing, "remove");
        const updated = {
          ...existing,
          content: updates.content !== void 0 ? updates.content : existing.content,
          memoryType: updates.memoryType !== void 0 ? updates.memoryType : existing.memoryType,
          path: updates.path !== void 0 ? updates.path : existing.path,
          metadata: updates.metadata ? {
            ...existing.metadata,
            ...updates.metadata
          } : existing.metadata,
          relationships: updates.relationships ? updates.relationships.map((rel) => ({
            id: rel.id || (0, import_crypto.randomUUID)(),
            sourceId: id,
            targetId: rel.targetId || "",
            type: rel.type || "related_to" /* RELATED_TO */,
            strength: rel.strength || 0.5,
            metadata: rel.metadata || {}
          })) : existing.relationships,
          updatedAt: /* @__PURE__ */ new Date(),
          version: existing.version + 1
        };
        this.memories.set(id, updated);
        this.updateIndexes(updated, "add");
        return this.toMemory(updated);
      }
      async delete(id) {
        const memory = this.memories.get(id);
        if (!memory) return false;
        this.updateIndexes(memory, "remove");
        this.memories.delete(id);
        return true;
      }
      async search(query, options = {}) {
        const { limit = 10 } = options;
        let candidates = Array.from(this.memories.values());
        const queryTerms = query.toLowerCase().split(/\s+/);
        const scored = candidates.map((memory) => {
          const content = memory.content.toLowerCase();
          const path7 = (memory.path || "").toLowerCase();
          const memoryType = (memory.memoryType || "").toLowerCase();
          const metadata = JSON.stringify(memory.metadata).toLowerCase();
          const searchText = `${content} ${path7} ${memoryType} ${metadata}`;
          let score = 0;
          queryTerms.forEach((term) => {
            const contentMatches = (content.match(new RegExp(term, "g")) || []).length;
            const pathMatches = (path7.match(new RegExp(term, "g")) || []).length;
            const typeMatches = (memoryType.match(new RegExp(term, "g")) || []).length;
            const metadataMatches = (metadata.match(new RegExp(term, "g")) || []).length;
            score += pathMatches * 3 + contentMatches * 2 + typeMatches * 1.5 + metadataMatches;
          });
          const maxScore = queryTerms.length * 7.5;
          const normalizedScore = score / maxScore;
          return {
            memory,
            score: normalizedScore
          };
        });
        const filtered = scored.filter((item) => item.score > 0.1).sort((a, b) => b.score - a.score).slice(0, limit);
        return filtered.map((item) => this.toMemory(item.memory));
      }
      async findSimilar(content, threshold) {
        const results = await this.search(content, { limit: 50 });
        return results.filter(
          (_, index, array) => array.length > 1 ? index / array.length >= threshold : false
        );
      }
      async createBatch(inputs) {
        const results = [];
        for (const input of inputs) {
          results.push(await this.create(input));
        }
        return results;
      }
      async deleteBatch(ids) {
        let deletedCount = 0;
        for (const id of ids) {
          if (await this.delete(id)) {
            deletedCount++;
          }
        }
        return deletedCount;
      }
      async count() {
        return this.memories.size;
      }
      async getStats() {
        const totalMemories = this.memories.size;
        const memoryTypes = {};
        Object.values(MemoryType).forEach((type) => {
          var _a;
          memoryTypes[type] = ((_a = this.typeIndex.get(type)) == null ? void 0 : _a.size) || 0;
        });
        const totalLength = Array.from(this.memories.values()).reduce((sum, memory) => sum + memory.content.length, 0);
        const averageLength = totalMemories > 0 ? totalLength / totalMemories : 0;
        let oldestMemory = null;
        let newestMemory = null;
        this.memories.forEach((memory) => {
          if (!oldestMemory || memory.createdAt < oldestMemory) {
            oldestMemory = memory.createdAt;
          }
          if (!newestMemory || memory.createdAt > newestMemory) {
            newestMemory = memory.createdAt;
          }
        });
        return {
          totalMemories,
          memoryTypes,
          averageLength,
          oldestMemory,
          newestMemory
        };
      }
      async close() {
        return Promise.resolve();
      }
      toMemory(stored) {
        return {
          id: stored.id,
          content: stored.content,
          memoryType: stored.memoryType,
          path: stored.path,
          metadata: stored.metadata,
          relationships: stored.relationships,
          createdAt: stored.createdAt,
          updatedAt: stored.updatedAt,
          version: stored.version
        };
      }
      updateIndexes(memory, operation) {
        const { id, memoryType, content } = memory;
        const typeSet = this.typeIndex.get(memoryType);
        if (operation === "add") {
          typeSet.add(id);
        } else {
          typeSet.delete(id);
        }
        const words = content.toLowerCase().split(/\s+/);
        words.forEach((word) => {
          if (word.length > 2) {
            if (!this.contentIndex.has(word)) {
              this.contentIndex.set(word, /* @__PURE__ */ new Set());
            }
            const wordSet = this.contentIndex.get(word);
            if (operation === "add") {
              wordSet.add(id);
            } else {
              wordSet.delete(id);
              if (wordSet.size === 0) {
                this.contentIndex.delete(word);
              }
            }
          }
        });
      }
    };
    __name(_InMemoryRepository, "InMemoryRepository");
    InMemoryRepository = _InMemoryRepository;
  }
});

// src/modules/path-tracking/core/PathIdGenerator.ts
var crypto, path3, _PathIdGenerator, PathIdGenerator;
var init_PathIdGenerator = __esm({
  "src/modules/path-tracking/core/PathIdGenerator.ts"() {
    crypto = __toESM(require("crypto"));
    path3 = __toESM(require("path"));
    _PathIdGenerator = class _PathIdGenerator {
      config;
      cache;
      constructor(config = {}) {
        this.config = {
          hashLength: config.hashLength ?? 8,
          moduleDepth: config.moduleDepth ?? 1,
          cacheEnabled: config.cacheEnabled ?? true,
          maxCacheSize: config.maxCacheSize ?? 1e3
        };
        this.cache = this.config.cacheEnabled ? /* @__PURE__ */ new Map() : null;
      }
      /**
       * Generate deterministic path ID from relative path
       * Same path always generates same ID
       */
      generatePathId(relativePath) {
        var _a;
        if (!relativePath) {
          return {
            pathId: this.generateHash(""),
            moduleName: "root",
            relativePath: "",
            depth: 0
          };
        }
        if ((_a = this.cache) == null ? void 0 : _a.has(relativePath)) {
          return this.cache.get(relativePath);
        }
        const normalized = this.normalizePath(relativePath);
        const pathId = this.generateHash(normalized);
        const moduleName = this.extractModuleName(normalized);
        const depth = this.calculateDepth(normalized);
        const result = {
          pathId,
          moduleName,
          relativePath: normalized,
          depth
        };
        if (this.cache) {
          if (this.cache.size >= this.config.maxCacheSize) {
            const firstKey = this.cache.keys().next().value;
            if (firstKey) {
              this.cache.delete(firstKey);
            }
          }
          this.cache.set(relativePath, result);
        }
        return result;
      }
      /**
       * Generate multiple path IDs in batch for performance
       */
      generateBatch(paths) {
        const results = /* @__PURE__ */ new Map();
        for (const filePath of paths) {
          results.set(filePath, this.generatePathId(filePath));
        }
        return results;
      }
      /**
       * Normalize path for consistent hashing across platforms
       */
      normalizePath(inputPath) {
        return inputPath.replace(/\\/g, "/").toLowerCase().replace(/^[./\\]+/, "").replace(/\/+$/, "").replace(/\/+/g, "/");
      }
      /**
       * Generate deterministic MD5 hash
       */
      generateHash(normalized) {
        return crypto.createHash("md5").update(normalized).digest("hex").substring(0, this.config.hashLength);
      }
      /**
       * Extract module name from normalized path
       * Intelligently handles common project structures
       */
      extractModuleName(normalized) {
        if (!normalized) return "root";
        const parts = normalized.split("/");
        let startIdx = 0;
        const rootDirs = ["src", "lib", "app", "components", "features", "modules"];
        if (rootDirs.includes(parts[0])) {
          startIdx = 1;
        }
        if (parts[0] === "features" && parts.length > 1) {
          return parts[1];
        }
        if (parts.length > startIdx) {
          const moduleParts = parts.slice(startIdx, startIdx + this.config.moduleDepth);
          return moduleParts.filter(Boolean).join("/") || "root";
        }
        return "root";
      }
      /**
       * Calculate path depth for hierarchy analysis
       */
      calculateDepth(normalized) {
        if (!normalized) return 0;
        return normalized.split("/").filter(Boolean).length;
      }
      /**
       * Extract file extension
       */
      getExtension(filePath) {
        const ext = path3.extname(filePath);
        return ext ? ext.substring(1).toLowerCase() : "";
      }
      /**
       * Check if path matches a pattern
       */
      matchesPattern(relativePath, pattern) {
        const normalized = this.normalizePath(relativePath);
        const normalizedPattern = this.normalizePath(pattern);
        const regexPattern = normalizedPattern.replace(/\*/g, ".*").replace(/\?/g, ".");
        const regex = new RegExp(`^${regexPattern}$`);
        return regex.test(normalized);
      }
      /**
       * Get module hierarchy from path
       */
      getModuleHierarchy(relativePath) {
        const normalized = this.normalizePath(relativePath);
        if (!normalized) return [];
        const parts = normalized.split("/");
        const hierarchy = [];
        let startIdx = 0;
        if (["src", "lib", "app"].includes(parts[0])) {
          startIdx = 1;
        }
        for (let i = startIdx; i < parts.length - 1; i++) {
          if (parts[i]) {
            hierarchy.push(parts.slice(startIdx, i + 1).join("/"));
          }
        }
        return hierarchy;
      }
      /**
       * Clear cache (for testing or memory management)
       */
      clearCache() {
        var _a;
        (_a = this.cache) == null ? void 0 : _a.clear();
      }
      /**
       * Get cache statistics
       */
      getCacheStats() {
        if (!this.cache) {
          return { size: 0, maxSize: 0, enabled: false };
        }
        return {
          size: this.cache.size,
          maxSize: this.config.maxCacheSize,
          enabled: true
        };
      }
    };
    __name(_PathIdGenerator, "PathIdGenerator");
    PathIdGenerator = _PathIdGenerator;
  }
});

// src/modules/memory/repositories/SQLiteMemoryRepository.ts
var SQLiteMemoryRepository_exports = {};
__export(SQLiteMemoryRepository_exports, {
  SQLiteMemoryRepository: () => SQLiteMemoryRepository
});
var import_crypto2, sqlite3, _SQLiteMemoryRepository, SQLiteMemoryRepository;
var init_SQLiteMemoryRepository = __esm({
  "src/modules/memory/repositories/SQLiteMemoryRepository.ts"() {
    init_types();
    import_crypto2 = require("crypto");
    init_PathIdGenerator();
    try {
      sqlite3 = require("better-sqlite3");
    } catch (error) {
    }
    _SQLiteMemoryRepository = class _SQLiteMemoryRepository {
      constructor(dbPath) {
        this.dbPath = dbPath;
        if (!sqlite3) {
          throw new Error(
            'SQLiteMemoryRepository requires better-sqlite3 dependency. Either install it with "npm install better-sqlite3" or use InMemoryRepository instead.'
          );
        }
        this.db = new sqlite3(dbPath);
        this.pathGenerator = new PathIdGenerator();
        this.initialize();
        this.prepareStatements();
      }
      db;
      // sqlite3.Database when available
      statements = /* @__PURE__ */ new Map();
      pathGenerator;
      initialize() {
        this.db.pragma("journal_mode = WAL");
        this.db.exec(`
      CREATE TABLE IF NOT EXISTS memories (
        id TEXT PRIMARY KEY,
        content TEXT NOT NULL,
        memory_type TEXT NOT NULL,
        path TEXT,
        metadata TEXT,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL,
        version INTEGER DEFAULT 1,
        embedding BLOB,
        importance TEXT DEFAULT 'medium',
        project TEXT,
        deleted INTEGER DEFAULT 0
      );

      CREATE INDEX IF NOT EXISTS idx_memories_type ON memories(memory_type);
      CREATE INDEX IF NOT EXISTS idx_memories_created ON memories(created_at);
      CREATE INDEX IF NOT EXISTS idx_memories_project ON memories(project);
      CREATE INDEX IF NOT EXISTS idx_memories_deleted ON memories(deleted);
      CREATE INDEX IF NOT EXISTS idx_memories_path ON memories(path);
      -- Note: SQLite doesn't support functional indexes on JSON well, tags are searched via json_extract
      
      -- FTS5 for optional content search
      CREATE VIRTUAL TABLE IF NOT EXISTS memories_fts USING fts5(
        content,
        content_rowid='rowid',
        tokenize='porter unicode61'
      );
    `);
      }
      prepareStatements() {
        this.statements.set("insert", this.db.prepare(`
      INSERT INTO memories (id, content, memory_type, path, metadata, created_at, updated_at, importance, project)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `));
        this.statements.set("findById", this.db.prepare(`
      SELECT * FROM memories WHERE id = ? AND deleted = 0
    `));
        this.statements.set("update", this.db.prepare(`
      UPDATE memories 
      SET content = ?, memory_type = ?, metadata = ?, updated_at = ?, version = version + 1
      WHERE id = ? AND deleted = 0
    `));
        this.statements.set("delete", this.db.prepare(`
      UPDATE memories SET deleted = 1, updated_at = ? WHERE id = ?
    `));
        this.statements.set("searchByPath", this.db.prepare(`
      SELECT * FROM memories 
      WHERE path LIKE ? AND deleted = 0
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `));
        this.statements.set("searchByTags", this.db.prepare(`
      SELECT * FROM memories 
      WHERE deleted = 0 AND json_extract(metadata, '$.tags') IS NOT NULL
      ORDER BY created_at DESC
    `));
      }
      async create(input) {
        var _a, _b, _c, _d, _e;
        const id = (0, import_crypto2.randomUUID)();
        const now = Date.now();
        const metadata = JSON.stringify(input.metadata || {});
        let path7 = input.path;
        if (!path7 && ((_b = (_a = input.metadata) == null ? void 0 : _a.context) == null ? void 0 : _b.filePath)) {
          const pathData = this.pathGenerator.generatePathId(input.metadata.context.filePath);
          path7 = pathData.pathId;
        } else if (!path7 && ((_c = input.metadata) == null ? void 0 : _c.source)) {
          const pathData = this.pathGenerator.generatePathId(input.metadata.source);
          path7 = pathData.pathId;
        } else if (!path7) {
          path7 = `${input.memoryType || "knowledge" /* KNOWLEDGE */}/${id}`;
        }
        const stmt = this.statements.get("insert");
        stmt.run(
          id,
          input.content,
          input.memoryType || "knowledge" /* KNOWLEDGE */,
          path7,
          metadata,
          now,
          now,
          ((_d = input.metadata) == null ? void 0 : _d.importance) || "medium",
          ((_e = input.metadata) == null ? void 0 : _e.project) || null
        );
        try {
          this.db.prepare("INSERT INTO memories_fts (rowid, content) SELECT last_insert_rowid(), ?").run(input.content);
        } catch (e) {
        }
        return this.findById(id);
      }
      async findById(id) {
        const stmt = this.statements.get("findById");
        const row = stmt.get(id);
        if (!row) return null;
        return this.rowToMemory(row);
      }
      async update(id, updates) {
        const existing = await this.findById(id);
        if (!existing) {
          throw new Error(`Memory ${id} not found`);
        }
        const merged = { ...existing, ...updates };
        const metadata = JSON.stringify(merged.metadata || {});
        const stmt = this.statements.get("update");
        stmt.run(
          merged.content,
          merged.memoryType,
          metadata,
          Date.now(),
          id
        );
        return this.findById(id);
      }
      async delete(id) {
        const stmt = this.statements.get("delete");
        const result = stmt.run(Date.now(), id);
        return result.changes > 0;
      }
      /**
       * Search memories by path pattern, tags, or content
       * Supports structured search (path/tags) and optional content search
       */
      async search(query, options) {
        const limit = (options == null ? void 0 : options.limit) || 10;
        const offset = (options == null ? void 0 : options.offset) || 0;
        const searchType = (options == null ? void 0 : options.searchType) || "auto";
        if (searchType === "content" && query && query.trim()) {
          return this.searchByContent(query, options);
        }
        if (query && query.trim() && (query.includes("/") || query.includes("\\"))) {
          return this.searchByPath(query, options);
        }
        if ((options == null ? void 0 : options.tags) && options.tags.length > 0) {
          return this.searchByTags(options.tags, options);
        }
        if (options == null ? void 0 : options.path) {
          return this.searchByPath(options.path, options);
        }
        if (query && query.trim() && searchType === "auto") {
          return this.searchByContent(query, options);
        }
        throw new Error("Search requires a query, path pattern, or tags.");
      }
      /**
       * Search memories by file path pattern
       */
      async searchByPath(pathPattern, options) {
        this.validatePathPattern(pathPattern);
        const limit = (options == null ? void 0 : options.limit) || 10;
        const offset = (options == null ? void 0 : options.offset) || 0;
        const sqlPattern = pathPattern.replace(/\*/g, "%").replace(/\?/g, "_");
        let sql = `
      SELECT * FROM memories 
      WHERE path LIKE ? AND deleted = 0
    `;
        const params = [sqlPattern];
        if ((options == null ? void 0 : options.memoryTypes) && options.memoryTypes.length > 0) {
          const placeholders = options.memoryTypes.map(() => "?").join(",");
          sql += ` AND memory_type IN (${placeholders})`;
          params.push(...options.memoryTypes);
        }
        sql += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
        params.push(limit, offset);
        const rows = this.db.prepare(sql).all(...params);
        return rows.map((row) => this.rowToMemory(row));
      }
      /**
       * Search memories by tags
       */
      async searchByTags(tags, options) {
        this.validateTags(tags);
        const limit = (options == null ? void 0 : options.limit) || 10;
        const offset = (options == null ? void 0 : options.offset) || 0;
        const tagConditions = tags.map(
          () => `json_extract(metadata, '$.tags') LIKE ?`
        ).join(" AND ");
        let sql = `
      SELECT * FROM memories 
      WHERE deleted = 0 AND ${tagConditions}
    `;
        const params = tags.map((tag) => `%"${tag}"%`);
        if ((options == null ? void 0 : options.memoryTypes) && options.memoryTypes.length > 0) {
          const placeholders = options.memoryTypes.map(() => "?").join(",");
          sql += ` AND memory_type IN (${placeholders})`;
          params.push(...options.memoryTypes);
        }
        if (options == null ? void 0 : options.path) {
          sql += ` AND path LIKE ?`;
          params.push(options.path.replace(/\*/g, "%"));
        }
        sql += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
        params.push(limit, offset);
        const rows = this.db.prepare(sql).all(...params);
        return rows.map((row) => this.rowToMemory(row));
      }
      /**
       * Validate path pattern
       */
      validatePathPattern(pathPattern) {
        if (!pathPattern || typeof pathPattern !== "string") {
          throw new Error("Path pattern must be a non-empty string");
        }
        if (pathPattern.length > 500) {
          throw new Error("Path pattern exceeds maximum length of 500 characters");
        }
        const invalidChars = /[\0\x08\x09\x1a\n\r"']/;
        if (invalidChars.test(pathPattern)) {
          throw new Error("Path pattern contains invalid characters");
        }
      }
      /**
       * Validate tags array
       */
      validateTags(tags) {
        if (!Array.isArray(tags) || tags.length === 0) {
          throw new Error("Tags must be a non-empty array");
        }
        if (tags.length > 50) {
          throw new Error("Cannot search for more than 50 tags at once");
        }
        for (const tag of tags) {
          if (typeof tag !== "string" || tag.trim().length === 0) {
            throw new Error("Each tag must be a non-empty string");
          }
          if (tag.length > 100) {
            throw new Error(`Tag "${tag}" exceeds maximum length of 100 characters`);
          }
        }
      }
      async createBatch(inputs) {
        const insertMany = this.db.transaction((inputs2) => {
          const memories = [];
          for (const input of inputs2) {
            const memory = this.create(input);
            memories.push(memory);
          }
          return memories;
        });
        return Promise.all(insertMany(inputs));
      }
      async deleteBatch(ids) {
        const deleteMany = this.db.transaction((ids2) => {
          let count = 0;
          const stmt = this.statements.get("delete");
          const now = Date.now();
          for (const id of ids2) {
            const result = stmt.run(now, id);
            if (result.changes > 0) count++;
          }
          return count;
        });
        return Promise.resolve(deleteMany(ids));
      }
      /**
       * Search memories by content using FTS5
       */
      async searchByContent(query, options) {
        this.validateContentQuery(query);
        const limit = (options == null ? void 0 : options.limit) || 10;
        const offset = (options == null ? void 0 : options.offset) || 0;
        try {
          let sql = `
        SELECT m.* FROM memories m
        JOIN memories_fts f ON m.rowid = f.rowid
        WHERE memories_fts MATCH ? AND m.deleted = 0
      `;
          const params = [this.sanitizeFTSQuery(query)];
          if ((options == null ? void 0 : options.memoryTypes) && options.memoryTypes.length > 0) {
            const placeholders = options.memoryTypes.map(() => "?").join(",");
            sql += ` AND m.memory_type IN (${placeholders})`;
            params.push(...options.memoryTypes);
          }
          if (options == null ? void 0 : options.path) {
            sql += ` AND m.path LIKE ?`;
            params.push(options.path.replace(/\*/g, "%"));
          }
          sql += ` ORDER BY rank LIMIT ? OFFSET ?`;
          params.push(limit, offset);
          const rows = this.db.prepare(sql).all(...params);
          const results = rows.map((row) => this.rowToMemory(row));
          if (results.length === 0) {
            return this.fallbackContentSearch(query, options);
          }
          return results;
        } catch (error) {
          return this.fallbackContentSearch(query, options);
        }
      }
      /**
       * Fallback content search using LIKE when FTS5 is not available
       */
      async fallbackContentSearch(query, options) {
        const limit = (options == null ? void 0 : options.limit) || 10;
        const offset = (options == null ? void 0 : options.offset) || 0;
        let sql = `
      SELECT * FROM memories 
      WHERE content LIKE ? AND deleted = 0
    `;
        const params = [`%${query}%`];
        if ((options == null ? void 0 : options.memoryTypes) && options.memoryTypes.length > 0) {
          const placeholders = options.memoryTypes.map(() => "?").join(",");
          sql += ` AND memory_type IN (${placeholders})`;
          params.push(...options.memoryTypes);
        }
        sql += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
        params.push(limit, offset);
        const rows = this.db.prepare(sql).all(...params);
        return rows.map((row) => this.rowToMemory(row));
      }
      /**
       * Validate content query
       */
      validateContentQuery(query) {
        if (!query || query.trim().length < 2) {
          throw new Error("Content query must be at least 2 characters");
        }
        if (query.length > 1e3) {
          throw new Error("Content query exceeds maximum length of 1000 characters");
        }
      }
      /**
       * Sanitize query for FTS5
       */
      sanitizeFTSQuery(query) {
        let sanitized = query.replace(/["'*()]/g, "").replace(/\s+/g, " ").trim();
        if (!sanitized) return '""';
        if (sanitized.includes(" ")) {
          return `"${sanitized}"`;
        }
        return sanitized;
      }
      async findSimilar(content, threshold = 0.8) {
        if (!content || content.trim().length < 2) {
          return [];
        }
        try {
          const words = content.split(/\s+/).slice(0, 10).join(" ");
          return this.searchByContent(words, { limit: 5 });
        } catch (error) {
          return [];
        }
      }
      async count() {
        const result = this.db.prepare("SELECT COUNT(*) as count FROM memories WHERE deleted = 0").get();
        return result.count;
      }
      async getStats() {
        const stats = this.db.prepare(`
      SELECT
        COUNT(*) as total,
        MIN(created_at) as oldest,
        MAX(created_at) as newest,
        AVG(LENGTH(content)) as avg_length
      FROM memories
      WHERE deleted = 0
    `).get();
        const types = this.db.prepare(`
      SELECT memory_type, COUNT(*) as count
      FROM memories
      WHERE deleted = 0
      GROUP BY memory_type
    `).all();
        const memoryTypes = {};
        types.forEach((t) => memoryTypes[t.memory_type] = t.count);
        return {
          totalMemories: stats.total,
          memoryTypes,
          averageLength: Math.round(stats.avg_length),
          oldestMemory: stats.oldest ? new Date(stats.oldest) : null,
          newestMemory: stats.newest ? new Date(stats.newest) : null
        };
      }
      /**
       * Find all memories (for analysis and aggregation)
       * Used by AnalysisServiceWrapper for multi-project analysis
       */
      async findAll(options) {
        const limit = (options == null ? void 0 : options.limit) || 1e3;
        const rows = this.db.prepare(`
      SELECT * FROM memories
      WHERE deleted = 0
      ORDER BY created_at DESC
      LIMIT ?
    `).all(limit);
        return rows.map((row) => this.rowToMemory(row));
      }
      rowToMemory(row) {
        let metadata = {};
        if (row.metadata) {
          try {
            metadata = JSON.parse(row.metadata);
          } catch (e) {
            metadata = {};
          }
        }
        const safeMetadata = {
          tags: metadata.tags || [],
          project: metadata.project,
          source: metadata.source,
          importance: metadata.importance || "medium",
          confidence: metadata.confidence || 1,
          context: metadata.context,
          expiresAt: metadata.expiresAt ? new Date(metadata.expiresAt) : void 0
        };
        return {
          id: row.id,
          content: row.content,
          memoryType: row.memory_type,
          path: row.path || void 0,
          metadata: safeMetadata,
          relationships: [],
          // Load separately if needed
          createdAt: new Date(row.created_at),
          updatedAt: new Date(row.updated_at),
          version: row.version
        };
      }
      close() {
        this.statements.clear();
        this.db.close();
      }
    };
    __name(_SQLiteMemoryRepository, "SQLiteMemoryRepository");
    SQLiteMemoryRepository = _SQLiteMemoryRepository;
  }
});

// src/modules/memory/storage/CacheManager.ts
var CacheManager_exports = {};
__export(CacheManager_exports, {
  CacheManager: () => CacheManager
});
var _CacheManager, CacheManager;
var init_CacheManager = __esm({
  "src/modules/memory/storage/CacheManager.ts"() {
    _CacheManager = class _CacheManager {
      cache = /* @__PURE__ */ new Map();
      maxSize;
      defaultTTL;
      cleanupInterval = null;
      constructor(maxSize = 1e3, defaultTTL = 300) {
        this.maxSize = maxSize;
        this.defaultTTL = defaultTTL;
        this.startCleanup();
      }
      async get(key) {
        const entry = this.cache.get(key);
        if (!entry) {
          return null;
        }
        if (Date.now() > entry.expiry) {
          this.cache.delete(key);
          return null;
        }
        entry.lastAccessed = Date.now();
        this.cache.delete(key);
        this.cache.set(key, entry);
        return entry.value;
      }
      async set(key, value, ttl) {
        const expiry = Date.now() + (ttl || this.defaultTTL) * 1e3;
        const entry = {
          value,
          expiry,
          lastAccessed: Date.now()
        };
        if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
          this.evictLRU();
        }
        this.cache.set(key, entry);
      }
      async delete(key) {
        return this.cache.delete(key);
      }
      async deletePattern(pattern) {
        const regex = new RegExp(pattern.replace("*", ".*"));
        let count = 0;
        for (const key of this.cache.keys()) {
          if (regex.test(key)) {
            this.cache.delete(key);
            count++;
          }
        }
        return count;
      }
      async clear() {
        this.cache.clear();
      }
      async has(key) {
        const entry = this.cache.get(key);
        if (!entry) return false;
        if (Date.now() > entry.expiry) {
          this.cache.delete(key);
          return false;
        }
        return true;
      }
      async size() {
        return this.cache.size;
      }
      getStats() {
        let totalSize = 0;
        let expiredCount = 0;
        const now = Date.now();
        for (const entry of this.cache.values()) {
          totalSize += JSON.stringify(entry.value).length;
          if (now > entry.expiry) {
            expiredCount++;
          }
        }
        return {
          entries: this.cache.size,
          sizeInBytes: totalSize,
          hitRate: 0,
          // Would need to track hits/misses
          maxSize: this.maxSize,
          expiredEntries: expiredCount
        };
      }
      evictLRU() {
        let oldestKey = null;
        let oldestTime = Date.now();
        for (const [key, entry] of this.cache.entries()) {
          if (entry.lastAccessed < oldestTime) {
            oldestTime = entry.lastAccessed;
            oldestKey = key;
          }
        }
        if (oldestKey) {
          this.cache.delete(oldestKey);
        }
      }
      startCleanup() {
        this.cleanupInterval = setInterval(() => {
          const now = Date.now();
          for (const [key, entry] of this.cache.entries()) {
            if (now > entry.expiry) {
              this.cache.delete(key);
            }
          }
        }, 6e4);
      }
      destroy() {
        if (this.cleanupInterval) {
          clearInterval(this.cleanupInterval);
          this.cleanupInterval = null;
        }
        this.cache.clear();
      }
    };
    __name(_CacheManager, "CacheManager");
    CacheManager = _CacheManager;
  }
});

// src/modules/memory/search/interfaces/ISearchEngine.ts
var SearchAlgorithm;
var init_ISearchEngine = __esm({
  "src/modules/memory/search/interfaces/ISearchEngine.ts"() {
    SearchAlgorithm = /* @__PURE__ */ ((SearchAlgorithm2) => {
      SearchAlgorithm2["TFIDF"] = "tfidf";
      SearchAlgorithm2["BM25"] = "bm25";
      SearchAlgorithm2["FUZZY"] = "fuzzy";
      SearchAlgorithm2["HYBRID"] = "hybrid";
      return SearchAlgorithm2;
    })(SearchAlgorithm || {});
  }
});

// src/modules/memory/search/SearchEngine.ts
var SearchEngine_exports = {};
__export(SearchEngine_exports, {
  SearchEngine: () => SearchEngine
});
var _SearchEngine, SearchEngine, _TfIdfSearch, TfIdfSearch, _BM25Search, BM25Search, _FuzzySearch, FuzzySearch, _HybridSearch, HybridSearch;
var init_SearchEngine = __esm({
  "src/modules/memory/search/SearchEngine.ts"() {
    init_ISearchEngine();
    _SearchEngine = class _SearchEngine {
      constructor(repository, defaultAlgorithm = "hybrid" /* HYBRID */) {
        this.repository = repository;
        this.defaultAlgorithm = defaultAlgorithm;
        this.initializeAlgorithms();
      }
      algorithms = /* @__PURE__ */ new Map();
      initializeAlgorithms() {
        this.algorithms.set("tfidf" /* TFIDF */, new TfIdfSearch());
        this.algorithms.set("bm25" /* BM25 */, new BM25Search());
        this.algorithms.set("fuzzy" /* FUZZY */, new FuzzySearch());
        this.algorithms.set("hybrid" /* HYBRID */, new HybridSearch());
      }
      async search(query, options) {
        const algorithm = (options == null ? void 0 : options.algorithm) || this.defaultAlgorithm;
        const searcher = this.algorithms.get(algorithm);
        if (!searcher) {
          throw new Error(`Unknown search algorithm: ${algorithm}`);
        }
        const memories = await this.repository.search(query, options);
        const results = await searcher.search(query, memories, options);
        let filtered = this.applyFilters(results, options);
        filtered.sort((a, b) => b.score - a.score);
        if (options == null ? void 0 : options.limit) {
          filtered = filtered.slice(0, options.limit);
        }
        return filtered;
      }
      async searchAdvanced(queries, options) {
        const allResults = /* @__PURE__ */ new Map();
        for (const query of queries) {
          const results = await this.search(query, options);
          for (const result of results) {
            const existing = allResults.get(result.memory.id);
            if (existing) {
              existing.score = Math.max(existing.score, result.score);
              existing.highlights.push(...result.highlights);
            } else {
              allResults.set(result.memory.id, result);
            }
          }
        }
        return Array.from(allResults.values());
      }
      async searchSimilar(memoryId, limit = 10) {
        const memory = await this.repository.findById(memoryId);
        if (!memory) {
          throw new Error(`Memory ${memoryId} not found`);
        }
        const keyTerms = this.extractKeyTerms(memory.content);
        return this.search(keyTerms.join(" "), { limit });
      }
      applyFilters(results, options) {
        if (!options) return results;
        return results.filter((result) => {
          const memory = result.memory;
          if (options.memoryTypes && options.memoryTypes.length > 0) {
            if (!options.memoryTypes.includes(memory.memoryType)) {
              return false;
            }
          }
          if (options.tags && options.tags.length > 0) {
            const memoryTags = memory.metadata.tags || [];
            if (!options.tags.some((tag) => memoryTags.includes(tag))) {
              return false;
            }
          }
          if (options.project && memory.metadata.project !== options.project) {
            return false;
          }
          if (options.dateFrom && memory.createdAt < options.dateFrom) {
            return false;
          }
          if (options.dateTo && memory.createdAt > options.dateTo) {
            return false;
          }
          if (options.importance && options.importance.length > 0) {
            if (!options.importance.includes(memory.metadata.importance)) {
              return false;
            }
          }
          return true;
        });
      }
      extractKeyTerms(content) {
        const words = content.toLowerCase().split(/\s+/);
        const stopWords = /* @__PURE__ */ new Set(["the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for"]);
        return words.filter((word) => word.length > 3 && !stopWords.has(word)).slice(0, 10);
      }
    };
    __name(_SearchEngine, "SearchEngine");
    SearchEngine = _SearchEngine;
    _TfIdfSearch = class _TfIdfSearch {
      async search(query, memories) {
        const queryTerms = query.toLowerCase().split(/\s+/);
        return memories.map((memory) => {
          let score = 0;
          const highlights = [];
          for (const term of queryTerms) {
            if (memory.content.toLowerCase().includes(term)) {
              score += 1;
              highlights.push(term);
            }
          }
          return {
            memory,
            score: score / queryTerms.length,
            highlights,
            algorithm: "tfidf" /* TFIDF */
          };
        });
      }
    };
    __name(_TfIdfSearch, "TfIdfSearch");
    TfIdfSearch = _TfIdfSearch;
    _BM25Search = class _BM25Search {
      async search(query, memories) {
        return new TfIdfSearch().search(query, memories);
      }
    };
    __name(_BM25Search, "BM25Search");
    BM25Search = _BM25Search;
    _FuzzySearch = class _FuzzySearch {
      async search(query, memories) {
        return new TfIdfSearch().search(query, memories);
      }
    };
    __name(_FuzzySearch, "FuzzySearch");
    FuzzySearch = _FuzzySearch;
    _HybridSearch = class _HybridSearch {
      async search(query, memories) {
        const tfidf = await new TfIdfSearch().search(query, memories);
        return tfidf;
      }
    };
    __name(_HybridSearch, "HybridSearch");
    HybridSearch = _HybridSearch;
  }
});

// src/modules/memory/index.ts
var memory_exports = {};
__export(memory_exports, {
  CacheManager: () => CacheManager,
  ImportanceLevel: () => ImportanceLevel,
  InMemoryRepository: () => InMemoryRepository,
  MemoryService: () => MemoryService,
  MemoryType: () => MemoryType,
  MemoryValidator: () => MemoryValidator,
  RelationshipType: () => RelationshipType,
  SQLiteMemoryRepository: () => SQLiteMemoryRepository,
  SearchAlgorithm: () => SearchAlgorithm,
  SearchEngine: () => SearchEngine,
  createMemorySystem: () => createMemorySystem,
  createSQLiteMemorySystem: () => createSQLiteMemorySystem
});
function createMemorySystem(dbPath, config) {
  const { InMemoryRepository: InMemoryRepository2 } = (init_InMemoryRepository(), __toCommonJS(InMemoryRepository_exports));
  const { SQLiteMemoryRepository: SQLiteMemoryRepository2 } = (init_SQLiteMemoryRepository(), __toCommonJS(SQLiteMemoryRepository_exports));
  const { MemoryValidator: MemoryValidator2 } = (init_MemoryValidator(), __toCommonJS(MemoryValidator_exports));
  const { CacheManager: CacheManager2 } = (init_CacheManager(), __toCommonJS(CacheManager_exports));
  const { MemoryService: MemoryService2 } = (init_MemoryService(), __toCommonJS(MemoryService_exports));
  const { SearchEngine: SearchEngine2 } = (init_SearchEngine(), __toCommonJS(SearchEngine_exports));
  let repository;
  if (dbPath) {
    try {
      repository = new SQLiteMemoryRepository2(dbPath);
      process.stderr.write(`[Nova] Using SQLite storage: ${dbPath}
`);
    } catch (e) {
      process.stderr.write(`[Nova] SQLite failed, using InMemory: ${e.message}
`);
      repository = new InMemoryRepository2();
    }
  } else {
    repository = new InMemoryRepository2();
    process.stderr.write("[Nova] Using InMemory storage (no persistence)\n");
  }
  const validator = new MemoryValidator2();
  const cache = new CacheManager2(1e3, 300);
  const service = new MemoryService2(repository, validator, cache, config);
  const searchEngine = new SearchEngine2(repository);
  return {
    service,
    searchEngine,
    repository,
    cache,
    validator
  };
}
function createSQLiteMemorySystem(dbPath, config) {
  const { SQLiteMemoryRepository: SQLiteMemoryRepository2 } = (init_SQLiteMemoryRepository(), __toCommonJS(SQLiteMemoryRepository_exports));
  const { MemoryValidator: MemoryValidator2 } = (init_MemoryValidator(), __toCommonJS(MemoryValidator_exports));
  const { CacheManager: CacheManager2 } = (init_CacheManager(), __toCommonJS(CacheManager_exports));
  const { MemoryService: MemoryService2 } = (init_MemoryService(), __toCommonJS(MemoryService_exports));
  const { SearchEngine: SearchEngine2 } = (init_SearchEngine(), __toCommonJS(SearchEngine_exports));
  const repository = new SQLiteMemoryRepository2(dbPath);
  const validator = new MemoryValidator2();
  const cache = new CacheManager2(1e3, 300);
  const service = new MemoryService2(repository, validator, cache, config);
  const searchEngine = new SearchEngine2(repository);
  return {
    service,
    searchEngine,
    repository,
    cache,
    validator
  };
}
var init_memory = __esm({
  "src/modules/memory/index.ts"() {
    init_MemoryService();
    init_MemoryValidator();
    init_types();
    init_InMemoryRepository();
    init_SQLiteMemoryRepository();
    init_CacheManager();
    init_SearchEngine();
    init_ISearchEngine();
    __name(createMemorySystem, "createMemorySystem");
    __name(createSQLiteMemorySystem, "createSQLiteMemorySystem");
  }
});

// src/modules/mcp/types.ts
var ToolCategory, TransportType, ServerStatus, EventType;
var init_types2 = __esm({
  "src/modules/mcp/types.ts"() {
    ToolCategory = /* @__PURE__ */ ((ToolCategory2) => {
      ToolCategory2["MEMORY"] = "memory";
      ToolCategory2["SEARCH"] = "search";
      ToolCategory2["ANALYSIS"] = "analysis";
      ToolCategory2["WORKFLOW"] = "workflow";
      ToolCategory2["UTILITY"] = "utility";
      return ToolCategory2;
    })(ToolCategory || {});
    TransportType = /* @__PURE__ */ ((TransportType2) => {
      TransportType2["STDIO"] = "stdio";
      TransportType2["HTTP"] = "http";
      return TransportType2;
    })(TransportType || {});
    ServerStatus = /* @__PURE__ */ ((ServerStatus2) => {
      ServerStatus2["INITIALIZING"] = "initializing";
      ServerStatus2["READY"] = "ready";
      ServerStatus2["CONNECTED"] = "connected";
      ServerStatus2["ERROR"] = "error";
      ServerStatus2["SHUTDOWN"] = "shutdown";
      return ServerStatus2;
    })(ServerStatus || {});
    EventType = /* @__PURE__ */ ((EventType2) => {
      EventType2["CONNECTION"] = "connection";
      EventType2["DISCONNECTION"] = "disconnection";
      EventType2["TOOL_EXECUTED"] = "tool_executed";
      EventType2["ERROR"] = "error";
      EventType2["WARNING"] = "warning";
      return EventType2;
    })(EventType || {});
  }
});

// src/core/types/pagination.types.ts
var DEFAULT_PAGINATION_CONFIG;
var init_pagination_types = __esm({
  "src/core/types/pagination.types.ts"() {
    DEFAULT_PAGINATION_CONFIG = {
      maxTokensPerResponse: 12e3,
      // 80% of 15k
      defaultPageSize: 50,
      maxPageSize: 100,
      tokenEstimation: {
        charsPerToken: 4,
        memoryOverhead: 100,
        safetyMargin: 0.8
      }
    };
  }
});

// src/core/services/pagination/token-estimator.service.ts
var _TokenEstimatorService, TokenEstimatorService;
var init_token_estimator_service = __esm({
  "src/core/services/pagination/token-estimator.service.ts"() {
    init_pagination_types();
    _TokenEstimatorService = class _TokenEstimatorService {
      config;
      constructor(config) {
        this.config = {
          ...DEFAULT_PAGINATION_CONFIG.tokenEstimation,
          ...config
        };
      }
      /**
       * Estimate tokens for plain text
       */
      estimateTokens(text) {
        if (!text) return 0;
        const charCount = text.length;
        const baseTokens = Math.ceil(charCount / this.config.charsPerToken);
        const specialChars = (text.match(/[^\w\s]/g) || []).length;
        const overhead = Math.ceil(specialChars * 0.1);
        return baseTokens + overhead;
      }
      /**
       * Estimate tokens for a memory object
       */
      estimateMemoryTokens(memory) {
        let totalTokens = this.config.memoryOverhead;
        if (memory.content) {
          totalTokens += this.estimateTokens(memory.content);
        }
        if (memory.metadata) {
          const metadataStr = JSON.stringify(memory.metadata);
          totalTokens += this.estimateTokens(metadataStr);
        }
        if (memory.tags && Array.isArray(memory.tags)) {
          totalTokens += memory.tags.length * 5;
        }
        totalTokens += 20;
        return Math.ceil(totalTokens);
      }
      /**
       * Estimate tokens for multiple memories
       */
      estimateBatchTokens(memories) {
        if (!memories || memories.length === 0) return 0;
        return memories.reduce((total, memory) => {
          return total + this.estimateMemoryTokens(memory);
        }, 0);
      }
      /**
       * Calculate how many items fit within token limit
       */
      calculateOptimalBatchSize(items, maxTokens) {
        const safeLimit = Math.floor(maxTokens * this.config.safetyMargin);
        let currentTokens = 0;
        let batchSize = 0;
        for (const item of items) {
          const itemTokens = this.estimateMemoryTokens(item);
          if (currentTokens + itemTokens > safeLimit) {
            break;
          }
          currentTokens += itemTokens;
          batchSize++;
        }
        return {
          batchSize: batchSize || 1,
          // At least return 1 item
          estimatedTokens: currentTokens
        };
      }
      /**
       * Check if response would exceed token limit
       */
      wouldExceedLimit(items, maxTokens) {
        const estimatedTokens = this.estimateBatchTokens(items);
        const safeLimit = Math.floor(maxTokens * this.config.safetyMargin);
        return estimatedTokens > safeLimit;
      }
    };
    __name(_TokenEstimatorService, "TokenEstimatorService");
    TokenEstimatorService = _TokenEstimatorService;
  }
});

// src/core/services/pagination/continuation-token.service.ts
var import_crypto3, _ContinuationTokenService, ContinuationTokenService;
var init_continuation_token_service = __esm({
  "src/core/services/pagination/continuation-token.service.ts"() {
    import_crypto3 = require("crypto");
    _ContinuationTokenService = class _ContinuationTokenService {
      version = "1";
      /**
       * Encode pagination state into a continuation token
       */
      encode(data) {
        const checksum = this.generateChecksum(data);
        const tokenData = { ...data, checksum, v: this.version };
        const json = JSON.stringify(tokenData);
        return Buffer.from(json).toString("base64url");
      }
      /**
       * Decode continuation token back to pagination state
       */
      decode(token) {
        try {
          const json = Buffer.from(token, "base64url").toString("utf8");
          const data = JSON.parse(json);
          if (data.v !== this.version) {
            return null;
          }
          const { checksum, v, ...tokenData } = data;
          const expectedChecksum = this.generateChecksum(tokenData);
          if (checksum !== expectedChecksum) {
            return null;
          }
          const age = Date.now() - tokenData.timestamp;
          if (age > 36e5) {
            return null;
          }
          return tokenData;
        } catch (error) {
          return null;
        }
      }
      /**
       * Validate if a token is still valid
       */
      isValid(token) {
        return this.decode(token) !== null;
      }
      /**
       * Generate checksum for token integrity
       */
      generateChecksum(data) {
        const str = `${data.query}:${data.offset}:${data.limit}:${data.timestamp}`;
        return (0, import_crypto3.createHash)("sha256").update(str).digest("hex").substring(0, 8);
      }
    };
    __name(_ContinuationTokenService, "ContinuationTokenService");
    ContinuationTokenService = _ContinuationTokenService;
  }
});

// src/core/services/pagination/pagination.service.ts
var _PaginationService, PaginationService;
var init_pagination_service = __esm({
  "src/core/services/pagination/pagination.service.ts"() {
    init_token_estimator_service();
    init_continuation_token_service();
    init_pagination_types();
    _PaginationService = class _PaginationService {
      tokenEstimator;
      tokenService;
      config;
      constructor(config) {
        this.config = { ...DEFAULT_PAGINATION_CONFIG, ...config };
        this.tokenEstimator = new TokenEstimatorService(this.config.tokenEstimation);
        this.tokenService = new ContinuationTokenService();
      }
      /**
       * Paginate results based on token limits
       */
      async paginate(items, options = {}, query = "") {
        const totalItems = items.length;
        let offset = options.offset || 0;
        let limit = options.limit || this.config.defaultPageSize;
        if (options.continuationToken) {
          const decoded = this.tokenService.decode(options.continuationToken);
          if (decoded) {
            offset = decoded.offset;
            limit = decoded.limit;
          }
        }
        limit = Math.min(limit, this.config.maxPageSize);
        const maxTokens = options.maxTokens || this.config.maxTokensPerResponse;
        const itemsToCheck = items.slice(offset, offset + limit);
        const { batchSize, estimatedTokens } = this.tokenEstimator.calculateOptimalBatchSize(
          itemsToCheck,
          maxTokens
        );
        const pageData = items.slice(offset, offset + batchSize);
        const returned = pageData.length;
        const remaining = totalItems - (offset + returned);
        const hasMore = remaining > 0;
        let continuationToken;
        let nextCommand;
        let previousCommand;
        if (hasMore) {
          continuationToken = this.tokenService.encode({
            query,
            offset: offset + returned,
            limit,
            timestamp: Date.now()
          });
          nextCommand = this.generateCommand(query, {
            continuation: continuationToken
          });
        }
        if (offset > 0) {
          const prevToken = this.tokenService.encode({
            query,
            offset: Math.max(0, offset - limit),
            limit,
            timestamp: Date.now()
          });
          previousCommand = this.generateCommand(query, {
            continuation: prevToken
          });
        }
        const totalEstimatedTokens = this.tokenEstimator.estimateBatchTokens(items);
        const truncated = totalEstimatedTokens > maxTokens;
        return {
          data: pageData,
          pagination: {
            total: totalItems,
            returned,
            remaining,
            hasMore,
            continuationToken,
            nextCommand,
            previousCommand
          },
          metadata: {
            estimatedTokens,
            totalEstimatedTokens,
            truncated,
            reason: truncated ? `Total results (${totalItems}) exceed token limit` : void 0
          }
        };
      }
      /**
       * Format paginated response with helpful hints
       */
      formatResponse(response, formatItem) {
        const { data, pagination, metadata } = response;
        let output = "";
        if (pagination.total > pagination.returned) {
          const start = pagination.returned > 0 ? pagination.total - pagination.remaining - pagination.returned + 1 : 1;
          const end = start + pagination.returned - 1;
          output += ` Found ${pagination.total} results (showing ${start}-${end})

`;
        } else {
          output += ` Found ${pagination.total} results

`;
        }
        data.forEach((item) => {
          output += formatItem(item) + "\n";
        });
        if (metadata.truncated) {
          output += `
 Response truncated: ${metadata.reason}
`;
        }
        if (pagination.hasMore) {
          output += "\n To fetch more results:\n";
          if (pagination.nextCommand) {
            output += `\u2022 Next batch: ${pagination.nextCommand}
`;
          }
          output += `\u2022 Specific range: memory(action:"query", content:"...", offset:${pagination.returned}, limit:50)
`;
          output += "\u2022 Refine search: Add more specific terms to reduce results\n";
        }
        if (pagination.previousCommand) {
          output += `\u2022 Previous batch: ${pagination.previousCommand}
`;
        }
        output += `
 Token usage: ~${metadata.estimatedTokens} tokens in this response`;
        return output;
      }
      /**
       * Generate command string for pagination
       */
      generateCommand(query, options) {
        const params = Object.entries(options).map(([key, value]) => `${key}:"${value}"`).join(", ");
        return `memory(action:"query", content:"${query}", ${params})`;
      }
    };
    __name(_PaginationService, "PaginationService");
    PaginationService = _PaginationService;
  }
});

// src/modules/mcp/handlers/paginated-memory.handler.ts
var _PaginatedMemoryHandler, PaginatedMemoryHandler;
var init_paginated_memory_handler = __esm({
  "src/modules/mcp/handlers/paginated-memory.handler.ts"() {
    init_pagination_service();
    _PaginatedMemoryHandler = class _PaginatedMemoryHandler {
      constructor(memoryService, paginationConfig) {
        this.memoryService = memoryService;
        this.paginationService = new PaginationService(paginationConfig);
      }
      paginationService;
      /**
       * Handle paginated memory operations
       */
      async handle(params) {
        const { action, content, query, filters, ...paginationOptions } = params;
        try {
          let memories = [];
          let searchQuery = content || query || "";
          if (action === "query" || action === "search") {
            if (searchQuery) {
              memories = await this.memoryService.search(searchQuery, {
                ...filters,
                limit: 1e3
                // Get more results for pagination
              });
            } else if (filters) {
              memories = await this.memoryService.query({ ...filters, limit: 1e3 });
            } else {
              memories = await this.memoryService.query({ limit: 1e3 });
            }
          }
          const paginatedResponse = await this.paginationService.paginate(
            memories,
            paginationOptions,
            searchQuery
          );
          if (paginatedResponse.pagination.hasMore || paginatedResponse.metadata.truncated) {
            return {
              success: true,
              data: paginatedResponse.data,
              pagination: paginatedResponse.pagination,
              metadata: paginatedResponse.metadata,
              hint: this.generateHint(paginatedResponse)
            };
          }
          return {
            success: true,
            data: paginatedResponse.data,
            total: paginatedResponse.pagination.total
          };
        } catch (error) {
          process.stderr.write(`[PaginatedMemoryHandler] Query error: ${error instanceof Error ? error.stack : error}
`);
          return {
            success: false,
            error: error instanceof Error ? error.message : "Query failed",
            hint: "Try refining your search terms or using filters to reduce results"
          };
        }
      }
      /**
       * Generate helpful hints for pagination
       */
      generateHint(response) {
        const { pagination, metadata } = response;
        let hints = [];
        if (metadata.truncated) {
          hints.push(` Response truncated: ${metadata.reason}`);
        }
        if (pagination.hasMore) {
          hints.push(" To fetch more results:");
          if (pagination.nextCommand) {
            hints.push(`\u2022 Next batch: ${pagination.nextCommand}`);
          }
          hints.push(`\u2022 Specific range: memory(action:"query", content:"...", offset:${pagination.returned}, limit:50)`);
          hints.push("\u2022 Refine search: Add more specific terms");
        }
        hints.push(` Token usage: ~${metadata.estimatedTokens} tokens in this response`);
        return hints.join("\n");
      }
      /**
       * Format memories for display with pagination info
       */
      formatMemories(response) {
        const formatter = this.paginationService.formatResponse.bind(this.paginationService);
        return formatter(response, (memory) => {
          const timestamp = new Date(memory.createdAt).toISOString().split("T")[0];
          const type = memory.memoryType || "unknown";
          const preview = memory.content.substring(0, 100).replace(/\n/g, " ");
          return ` [${memory.id.substring(0, 8)}] (${type}) ${timestamp}
   ${preview}${memory.content.length > 100 ? "..." : ""}`;
        });
      }
    };
    __name(_PaginatedMemoryHandler, "PaginatedMemoryHandler");
    PaginatedMemoryHandler = _PaginatedMemoryHandler;
  }
});

// src/shared/types/smart-response.types.ts
var init_smart_response_types = __esm({
  "src/shared/types/smart-response.types.ts"() {
  }
});

// src/modules/mcp/services/SmartResponseHelper.ts
var _SmartResponseHelper, SmartResponseHelper;
var init_SmartResponseHelper = __esm({
  "src/modules/mcp/services/SmartResponseHelper.ts"() {
    init_smart_response_types();
    _SmartResponseHelper = class _SmartResponseHelper {
      /**
       * Enhance a store response with smart hints
       */
      static enhanceStoreResponse(params) {
        const hints = [];
        const content = params.content.toLowerCase();
        if (params.compactionPerformed && params.compactedCount) {
          hints.push({
            type: "tip" /* TIP */,
            priority: "critical" /* CRITICAL */,
            text: `Auto-compacted ${params.compactedCount} memories into 1 consolidated entry`
          });
        }
        if (params.existingPathMemories && params.existingPathMemories.length > 0) {
          hints.push({
            type: "tip" /* TIP */,
            priority: "high" /* HIGH */,
            text: `Found ${params.existingPathMemories.length} existing memories for this path`
          });
        }
        if (content.includes("error") || content.includes("bug") || content.includes("fix")) {
          hints.push({
            type: "recommendation" /* RECOMMENDATION */,
            priority: "high" /* HIGH */,
            text: 'Create a task to track this: task_management(action: "create")'
          });
          hints.push({
            type: "tip" /* TIP */,
            priority: "medium" /* MEDIUM */,
            text: 'Search for similar errors: memory_search(query: "error")'
          });
        }
        if (content.includes("todo") || content.includes("fixme")) {
          hints.push({
            type: "tip" /* TIP */,
            priority: "low" /* LOW */,
            text: 'Add "todo" tag for easy tracking'
          });
        }
        if (params.memoryType === "code" && !params.path) {
          hints.push({
            type: "suggestion" /* SUGGESTION */,
            priority: "medium" /* MEDIUM */,
            text: "Consider adding a file path for better organization"
          });
        }
        if (params.hasDuplicates) {
          hints.push({
            type: "warning" /* WARNING */,
            priority: "high" /* HIGH */,
            text: `${params.duplicateCount || "Similar"} duplicates detected. Review with memory_query`
          });
        }
        if (params.autoTags && params.autoTags.length > 0) {
          hints.push({
            type: "tip" /* TIP */,
            priority: "medium" /* MEDIUM */,
            text: `Auto-tagged: [${params.autoTags.join(", ")}]`
          });
        }
        if (params.tags && params.tags.length > 0) {
          hints.push({
            type: "suggestion" /* SUGGESTION */,
            priority: "low" /* LOW */,
            text: `Search related: memory_search(query: "...", tags: ["${params.tags[0]}"])`
          });
        }
        const data = { id: params.id };
        if (params.path) {
          data.path = params.path;
        }
        if (params.tags && params.tags.length > 0) {
          data.tags = params.tags;
        }
        if (params.existingPathMemories && params.existingPathMemories.length > 0) {
          data.pathContext = {
            existingCount: params.existingPathMemories.length,
            recent: params.existingPathMemories.slice(0, 3).map((m) => ({
              id: m.id,
              preview: m.content.substring(0, 80) + (m.content.length > 80 ? "..." : ""),
              createdAt: m.createdAt
            }))
          };
        }
        if (params.compactionPerformed) {
          data.compaction = {
            performed: true,
            mergedCount: params.compactedCount,
            message: `Consolidated ${params.compactedCount} memories into 1`
          };
        }
        return {
          success: true,
          data,
          hints: this.limitHints(hints),
          message: params.compactionPerformed ? `Memory stored (compacted ${params.compactedCount} old memories)` : "Memory stored successfully"
        };
      }
      /**
       * Enhance a search response with smart hints
       */
      static enhanceSearchResponse(params) {
        const hints = [];
        if (params.totalCount === 0) {
          hints.push({
            type: "tip" /* TIP */,
            priority: "medium" /* MEDIUM */,
            text: "Try broadening your search or using different keywords"
          });
          hints.push({
            type: "suggestion" /* SUGGESTION */,
            priority: "low" /* LOW */,
            text: "Use memory_query with filters for advanced search"
          });
        } else if (params.totalCount > 20) {
          hints.push({
            type: "suggestion" /* SUGGESTION */,
            priority: "low" /* LOW */,
            text: "Use filters to narrow results: memory_type, tags, or date range"
          });
        }
        const hasErrors = params.results.some(
          (r) => {
            var _a;
            return ((_a = r.content) == null ? void 0 : _a.toLowerCase().includes("error")) || r.memoryType === "error";
          }
        );
        if (hasErrors) {
          hints.push({
            type: "recommendation" /* RECOMMENDATION */,
            priority: "medium" /* MEDIUM */,
            text: "Found error-related memories. Use analysis_conflicts to check for issues"
          });
        }
        return {
          success: true,
          data: {
            results: params.results,
            totalCount: params.totalCount
          },
          hints: this.limitHints(hints),
          message: params.totalCount === 0 ? "No results found" : `Found ${params.totalCount} results`
        };
      }
      /**
       * Enhance a query response with smart hints
       */
      static enhanceQueryResponse(params) {
        const hints = [];
        const count = params.items.length;
        if (count === 0) {
          hints.push({
            type: "tip" /* TIP */,
            priority: "medium" /* MEDIUM */,
            text: "No matches. Try removing some filters"
          });
        }
        if (params.hasMore) {
          hints.push({
            type: "tip" /* TIP */,
            priority: "low" /* LOW */,
            text: "More results available. Use pagination to see all"
          });
        }
        const now = Date.now();
        const oldMemories = params.items.filter((item) => {
          const created = new Date(item.createdAt).getTime();
          return now - created > 30 * 24 * 60 * 60 * 1e3;
        });
        if (oldMemories.length > count * 0.5) {
          hints.push({
            type: "suggestion" /* SUGGESTION */,
            priority: "low" /* LOW */,
            text: "Many old memories found. Consider archiving or reviewing"
          });
        }
        return {
          success: true,
          data: {
            items: params.items,
            count
          },
          hints: this.limitHints(hints),
          message: `Found ${count} memories`
        };
      }
      /**
       * Enhance a delete response
       */
      static enhanceDeleteResponse(params) {
        const hints = [];
        if (params.deleted) {
          hints.push({
            type: "tip" /* TIP */,
            priority: "low" /* LOW */,
            text: "Deleted memories can be recovered from version history within 24h"
          });
        }
        return {
          success: params.deleted,
          data: { id: params.id, deleted: params.deleted },
          hints: this.limitHints(hints),
          message: params.deleted ? "Memory deleted" : "Memory not found"
        };
      }
      /**
       * Enhance stats response
       */
      static enhanceStatsResponse(stats) {
        const hints = [];
        if (stats.totalMemories > 1e3) {
          hints.push({
            type: "suggestion" /* SUGGESTION */,
            priority: "medium" /* MEDIUM */,
            text: "Large memory store. Consider running analysis_memory_map for overview"
          });
        }
        if (stats.duplicateCount > 10) {
          hints.push({
            type: "warning" /* WARNING */,
            priority: "medium" /* MEDIUM */,
            text: `${stats.duplicateCount} duplicates detected. Run deduplication`
          });
        }
        return {
          success: true,
          data: { stats },
          hints: this.limitHints(hints),
          message: `${stats.totalMemories} total memories`
        };
      }
      /**
       * Format response with hints for MCP output
       */
      static formatForMCP(response) {
        const output = {
          success: response.success,
          ...response.data
        };
        if (response.hints && response.hints.length > 0) {
          output.hints = response.hints.map((h) => ({
            type: h.type,
            text: h.text
          }));
        }
        if (response.message) {
          output.message = response.message;
        }
        return JSON.stringify(output);
      }
      /**
       * Limit hints to max count and sort by priority
       */
      static limitHints(hints, max = 3) {
        const priorityOrder = {
          ["critical" /* CRITICAL */]: 4,
          ["high" /* HIGH */]: 3,
          ["medium" /* MEDIUM */]: 2,
          ["low" /* LOW */]: 1
        };
        return hints.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]).slice(0, max);
      }
    };
    __name(_SmartResponseHelper, "SmartResponseHelper");
    SmartResponseHelper = _SmartResponseHelper;
  }
});

// node_modules/zod/v3/helpers/util.js
var util, objectUtil, ZodParsedType, getParsedType;
var init_util = __esm({
  "node_modules/zod/v3/helpers/util.js"() {
    (function(util2) {
      util2.assertEqual = (_) => {
      };
      function assertIs(_arg) {
      }
      __name(assertIs, "assertIs");
      util2.assertIs = assertIs;
      function assertNever(_x) {
        throw new Error();
      }
      __name(assertNever, "assertNever");
      util2.assertNever = assertNever;
      util2.arrayToEnum = (items) => {
        const obj = {};
        for (const item of items) {
          obj[item] = item;
        }
        return obj;
      };
      util2.getValidEnumValues = (obj) => {
        const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
        const filtered = {};
        for (const k of validKeys) {
          filtered[k] = obj[k];
        }
        return util2.objectValues(filtered);
      };
      util2.objectValues = (obj) => {
        return util2.objectKeys(obj).map(function(e) {
          return obj[e];
        });
      };
      util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
        const keys = [];
        for (const key in object) {
          if (Object.prototype.hasOwnProperty.call(object, key)) {
            keys.push(key);
          }
        }
        return keys;
      };
      util2.find = (arr, checker) => {
        for (const item of arr) {
          if (checker(item))
            return item;
        }
        return void 0;
      };
      util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
      function joinValues(array, separator = " | ") {
        return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
      }
      __name(joinValues, "joinValues");
      util2.joinValues = joinValues;
      util2.jsonStringifyReplacer = (_, value) => {
        if (typeof value === "bigint") {
          return value.toString();
        }
        return value;
      };
    })(util || (util = {}));
    (function(objectUtil2) {
      objectUtil2.mergeShapes = (first, second) => {
        return {
          ...first,
          ...second
          // second overwrites first
        };
      };
    })(objectUtil || (objectUtil = {}));
    ZodParsedType = util.arrayToEnum([
      "string",
      "nan",
      "number",
      "integer",
      "float",
      "boolean",
      "date",
      "bigint",
      "symbol",
      "function",
      "undefined",
      "null",
      "array",
      "object",
      "unknown",
      "promise",
      "void",
      "never",
      "map",
      "set"
    ]);
    getParsedType = /* @__PURE__ */ __name((data) => {
      const t = typeof data;
      switch (t) {
        case "undefined":
          return ZodParsedType.undefined;
        case "string":
          return ZodParsedType.string;
        case "number":
          return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
        case "boolean":
          return ZodParsedType.boolean;
        case "function":
          return ZodParsedType.function;
        case "bigint":
          return ZodParsedType.bigint;
        case "symbol":
          return ZodParsedType.symbol;
        case "object":
          if (Array.isArray(data)) {
            return ZodParsedType.array;
          }
          if (data === null) {
            return ZodParsedType.null;
          }
          if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
            return ZodParsedType.promise;
          }
          if (typeof Map !== "undefined" && data instanceof Map) {
            return ZodParsedType.map;
          }
          if (typeof Set !== "undefined" && data instanceof Set) {
            return ZodParsedType.set;
          }
          if (typeof Date !== "undefined" && data instanceof Date) {
            return ZodParsedType.date;
          }
          return ZodParsedType.object;
        default:
          return ZodParsedType.unknown;
      }
    }, "getParsedType");
  }
});

// node_modules/zod/v3/ZodError.js
var ZodIssueCode, quotelessJson, _ZodError, ZodError;
var init_ZodError = __esm({
  "node_modules/zod/v3/ZodError.js"() {
    init_util();
    ZodIssueCode = util.arrayToEnum([
      "invalid_type",
      "invalid_literal",
      "custom",
      "invalid_union",
      "invalid_union_discriminator",
      "invalid_enum_value",
      "unrecognized_keys",
      "invalid_arguments",
      "invalid_return_type",
      "invalid_date",
      "invalid_string",
      "too_small",
      "too_big",
      "invalid_intersection_types",
      "not_multiple_of",
      "not_finite"
    ]);
    quotelessJson = /* @__PURE__ */ __name((obj) => {
      const json = JSON.stringify(obj, null, 2);
      return json.replace(/"([^"]+)":/g, "$1:");
    }, "quotelessJson");
    _ZodError = class _ZodError extends Error {
      get errors() {
        return this.issues;
      }
      constructor(issues) {
        super();
        this.issues = [];
        this.addIssue = (sub) => {
          this.issues = [...this.issues, sub];
        };
        this.addIssues = (subs = []) => {
          this.issues = [...this.issues, ...subs];
        };
        const actualProto = new.target.prototype;
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(this, actualProto);
        } else {
          this.__proto__ = actualProto;
        }
        this.name = "ZodError";
        this.issues = issues;
      }
      format(_mapper) {
        const mapper = _mapper || function(issue) {
          return issue.message;
        };
        const fieldErrors = { _errors: [] };
        const processError = /* @__PURE__ */ __name((error) => {
          for (const issue of error.issues) {
            if (issue.code === "invalid_union") {
              issue.unionErrors.map(processError);
            } else if (issue.code === "invalid_return_type") {
              processError(issue.returnTypeError);
            } else if (issue.code === "invalid_arguments") {
              processError(issue.argumentsError);
            } else if (issue.path.length === 0) {
              fieldErrors._errors.push(mapper(issue));
            } else {
              let curr = fieldErrors;
              let i = 0;
              while (i < issue.path.length) {
                const el = issue.path[i];
                const terminal = i === issue.path.length - 1;
                if (!terminal) {
                  curr[el] = curr[el] || { _errors: [] };
                } else {
                  curr[el] = curr[el] || { _errors: [] };
                  curr[el]._errors.push(mapper(issue));
                }
                curr = curr[el];
                i++;
              }
            }
          }
        }, "processError");
        processError(this);
        return fieldErrors;
      }
      static assert(value) {
        if (!(value instanceof _ZodError)) {
          throw new Error(`Not a ZodError: ${value}`);
        }
      }
      toString() {
        return this.message;
      }
      get message() {
        return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
      }
      get isEmpty() {
        return this.issues.length === 0;
      }
      flatten(mapper = (issue) => issue.message) {
        const fieldErrors = {};
        const formErrors = [];
        for (const sub of this.issues) {
          if (sub.path.length > 0) {
            const firstEl = sub.path[0];
            fieldErrors[firstEl] = fieldErrors[firstEl] || [];
            fieldErrors[firstEl].push(mapper(sub));
          } else {
            formErrors.push(mapper(sub));
          }
        }
        return { formErrors, fieldErrors };
      }
      get formErrors() {
        return this.flatten();
      }
    };
    __name(_ZodError, "ZodError");
    ZodError = _ZodError;
    ZodError.create = (issues) => {
      const error = new ZodError(issues);
      return error;
    };
  }
});

// node_modules/zod/v3/locales/en.js
var errorMap, en_default;
var init_en = __esm({
  "node_modules/zod/v3/locales/en.js"() {
    init_ZodError();
    init_util();
    errorMap = /* @__PURE__ */ __name((issue, _ctx) => {
      let message;
      switch (issue.code) {
        case ZodIssueCode.invalid_type:
          if (issue.received === ZodParsedType.undefined) {
            message = "Required";
          } else {
            message = `Expected ${issue.expected}, received ${issue.received}`;
          }
          break;
        case ZodIssueCode.invalid_literal:
          message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
          break;
        case ZodIssueCode.unrecognized_keys:
          message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
          break;
        case ZodIssueCode.invalid_union:
          message = `Invalid input`;
          break;
        case ZodIssueCode.invalid_union_discriminator:
          message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
          break;
        case ZodIssueCode.invalid_enum_value:
          message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
          break;
        case ZodIssueCode.invalid_arguments:
          message = `Invalid function arguments`;
          break;
        case ZodIssueCode.invalid_return_type:
          message = `Invalid function return type`;
          break;
        case ZodIssueCode.invalid_date:
          message = `Invalid date`;
          break;
        case ZodIssueCode.invalid_string:
          if (typeof issue.validation === "object") {
            if ("includes" in issue.validation) {
              message = `Invalid input: must include "${issue.validation.includes}"`;
              if (typeof issue.validation.position === "number") {
                message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
              }
            } else if ("startsWith" in issue.validation) {
              message = `Invalid input: must start with "${issue.validation.startsWith}"`;
            } else if ("endsWith" in issue.validation) {
              message = `Invalid input: must end with "${issue.validation.endsWith}"`;
            } else {
              util.assertNever(issue.validation);
            }
          } else if (issue.validation !== "regex") {
            message = `Invalid ${issue.validation}`;
          } else {
            message = "Invalid";
          }
          break;
        case ZodIssueCode.too_small:
          if (issue.type === "array")
            message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
          else if (issue.type === "string")
            message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
          else if (issue.type === "number")
            message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
          else if (issue.type === "bigint")
            message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
          else if (issue.type === "date")
            message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
          else
            message = "Invalid input";
          break;
        case ZodIssueCode.too_big:
          if (issue.type === "array")
            message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
          else if (issue.type === "string")
            message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
          else if (issue.type === "number")
            message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
          else if (issue.type === "bigint")
            message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
          else if (issue.type === "date")
            message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
          else
            message = "Invalid input";
          break;
        case ZodIssueCode.custom:
          message = `Invalid input`;
          break;
        case ZodIssueCode.invalid_intersection_types:
          message = `Intersection results could not be merged`;
          break;
        case ZodIssueCode.not_multiple_of:
          message = `Number must be a multiple of ${issue.multipleOf}`;
          break;
        case ZodIssueCode.not_finite:
          message = "Number must be finite";
          break;
        default:
          message = _ctx.defaultError;
          util.assertNever(issue);
      }
      return { message };
    }, "errorMap");
    en_default = errorMap;
  }
});

// node_modules/zod/v3/errors.js
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}
var overrideErrorMap;
var init_errors = __esm({
  "node_modules/zod/v3/errors.js"() {
    init_en();
    overrideErrorMap = en_default;
    __name(setErrorMap, "setErrorMap");
    __name(getErrorMap, "getErrorMap");
  }
});

// node_modules/zod/v3/helpers/parseUtil.js
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      // contextual error map is first priority
      ctx.schemaErrorMap,
      // then schema-bound map if available
      overrideMap,
      // then global override map
      overrideMap === en_default ? void 0 : en_default
      // then global default map
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}
var makeIssue, EMPTY_PATH, _ParseStatus, ParseStatus, INVALID, DIRTY, OK, isAborted, isDirty, isValid, isAsync;
var init_parseUtil = __esm({
  "node_modules/zod/v3/helpers/parseUtil.js"() {
    init_errors();
    init_en();
    makeIssue = /* @__PURE__ */ __name((params) => {
      const { data, path: path7, errorMaps, issueData } = params;
      const fullPath = [...path7, ...issueData.path || []];
      const fullIssue = {
        ...issueData,
        path: fullPath
      };
      if (issueData.message !== void 0) {
        return {
          ...issueData,
          path: fullPath,
          message: issueData.message
        };
      }
      let errorMessage = "";
      const maps = errorMaps.filter((m) => !!m).slice().reverse();
      for (const map of maps) {
        errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
      }
      return {
        ...issueData,
        path: fullPath,
        message: errorMessage
      };
    }, "makeIssue");
    EMPTY_PATH = [];
    __name(addIssueToContext, "addIssueToContext");
    _ParseStatus = class _ParseStatus {
      constructor() {
        this.value = "valid";
      }
      dirty() {
        if (this.value === "valid")
          this.value = "dirty";
      }
      abort() {
        if (this.value !== "aborted")
          this.value = "aborted";
      }
      static mergeArray(status, results) {
        const arrayValue = [];
        for (const s of results) {
          if (s.status === "aborted")
            return INVALID;
          if (s.status === "dirty")
            status.dirty();
          arrayValue.push(s.value);
        }
        return { status: status.value, value: arrayValue };
      }
      static async mergeObjectAsync(status, pairs) {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value
          });
        }
        return _ParseStatus.mergeObjectSync(status, syncPairs);
      }
      static mergeObjectSync(status, pairs) {
        const finalObject = {};
        for (const pair of pairs) {
          const { key, value } = pair;
          if (key.status === "aborted")
            return INVALID;
          if (value.status === "aborted")
            return INVALID;
          if (key.status === "dirty")
            status.dirty();
          if (value.status === "dirty")
            status.dirty();
          if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
            finalObject[key.value] = value.value;
          }
        }
        return { status: status.value, value: finalObject };
      }
    };
    __name(_ParseStatus, "ParseStatus");
    ParseStatus = _ParseStatus;
    INVALID = Object.freeze({
      status: "aborted"
    });
    DIRTY = /* @__PURE__ */ __name((value) => ({ status: "dirty", value }), "DIRTY");
    OK = /* @__PURE__ */ __name((value) => ({ status: "valid", value }), "OK");
    isAborted = /* @__PURE__ */ __name((x) => x.status === "aborted", "isAborted");
    isDirty = /* @__PURE__ */ __name((x) => x.status === "dirty", "isDirty");
    isValid = /* @__PURE__ */ __name((x) => x.status === "valid", "isValid");
    isAsync = /* @__PURE__ */ __name((x) => typeof Promise !== "undefined" && x instanceof Promise, "isAsync");
  }
});

// node_modules/zod/v3/helpers/typeAliases.js
var init_typeAliases = __esm({
  "node_modules/zod/v3/helpers/typeAliases.js"() {
  }
});

// node_modules/zod/v3/helpers/errorUtil.js
var errorUtil;
var init_errorUtil = __esm({
  "node_modules/zod/v3/helpers/errorUtil.js"() {
    (function(errorUtil2) {
      errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
      errorUtil2.toString = (message) => typeof message === "string" ? message : message == null ? void 0 : message.message;
    })(errorUtil || (errorUtil = {}));
  }
});

// node_modules/zod/v3/types.js
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = /* @__PURE__ */ __name((iss, ctx) => {
    const { message } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message ?? ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: message ?? required_error ?? ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: message ?? invalid_type_error ?? ctx.defaultError };
  }, "customMap");
  return { errorMap: customMap, description };
}
function timeRegexSource(args) {
  let secondsRegexSource = `[0-5]\\d`;
  if (args.precision) {
    secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
  }
  const secondsQuantifier = args.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join("|")})`;
  return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version) {
  if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
function isValidJWT(jwt, alg) {
  if (!jwtRegex.test(jwt))
    return false;
  try {
    const [header] = jwt.split(".");
    if (!header)
      return false;
    const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
    const decoded = JSON.parse(atob(base64));
    if (typeof decoded !== "object" || decoded === null)
      return false;
    if ("typ" in decoded && (decoded == null ? void 0 : decoded.typ) !== "JWT")
      return false;
    if (!decoded.alg)
      return false;
    if (alg && decoded.alg !== alg)
      return false;
    return true;
  } catch {
    return false;
  }
}
function isValidCidr(ip, version) {
  if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) {
    return true;
  }
  return false;
}
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: /* @__PURE__ */ __name(() => newShape, "shape")
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
function cleanParams(params, data) {
  const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
  const p2 = typeof p === "string" ? { message: p } : p;
  return p2;
}
function custom(check, _params = {}, fatal) {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      const r = check(data);
      if (r instanceof Promise) {
        return r.then((r2) => {
          if (!r2) {
            const params = cleanParams(_params, data);
            const _fatal = params.fatal ?? fatal ?? true;
            ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
          }
        });
      }
      if (!r) {
        const params = cleanParams(_params, data);
        const _fatal = params.fatal ?? fatal ?? true;
        ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
      }
      return;
    });
  return ZodAny.create();
}
var _ParseInputLazyPath, ParseInputLazyPath, handleResult, _ZodType, ZodType, cuidRegex, cuid2Regex, ulidRegex, uuidRegex, nanoidRegex, jwtRegex, durationRegex, emailRegex, _emojiRegex, emojiRegex, ipv4Regex, ipv4CidrRegex, ipv6Regex, ipv6CidrRegex, base64Regex, base64urlRegex, dateRegexSource, dateRegex, _ZodString, ZodString, _ZodNumber, ZodNumber, _ZodBigInt, ZodBigInt, _ZodBoolean, ZodBoolean, _ZodDate, ZodDate, _ZodSymbol, ZodSymbol, _ZodUndefined, ZodUndefined, _ZodNull, ZodNull, _ZodAny, ZodAny, _ZodUnknown, ZodUnknown, _ZodNever, ZodNever, _ZodVoid, ZodVoid, _ZodArray, ZodArray, _ZodObject, ZodObject, _ZodUnion, ZodUnion, getDiscriminator, _ZodDiscriminatedUnion, ZodDiscriminatedUnion, _ZodIntersection, ZodIntersection, _ZodTuple, ZodTuple, _ZodRecord, ZodRecord, _ZodMap, ZodMap, _ZodSet, ZodSet, _ZodFunction, ZodFunction, _ZodLazy, ZodLazy, _ZodLiteral, ZodLiteral, _ZodEnum, ZodEnum, _ZodNativeEnum, ZodNativeEnum, _ZodPromise, ZodPromise, _ZodEffects, ZodEffects, _ZodOptional, ZodOptional, _ZodNullable, ZodNullable, _ZodDefault, ZodDefault, _ZodCatch, ZodCatch, _ZodNaN, ZodNaN, BRAND, _ZodBranded, ZodBranded, _ZodPipeline, ZodPipeline, _ZodReadonly, ZodReadonly, late, ZodFirstPartyTypeKind, instanceOfType, stringType, numberType, nanType, bigIntType, booleanType, dateType, symbolType, undefinedType, nullType, anyType, unknownType, neverType, voidType, arrayType, objectType, strictObjectType, unionType, discriminatedUnionType, intersectionType, tupleType, recordType, mapType, setType, functionType, lazyType, literalType, enumType, nativeEnumType, promiseType, effectsType, optionalType, nullableType, preprocessType, pipelineType, ostring, onumber, oboolean, coerce, NEVER;
var init_types3 = __esm({
  "node_modules/zod/v3/types.js"() {
    init_ZodError();
    init_errors();
    init_errorUtil();
    init_parseUtil();
    init_util();
    _ParseInputLazyPath = class _ParseInputLazyPath {
      constructor(parent, value, path7, key) {
        this._cachedPath = [];
        this.parent = parent;
        this.data = value;
        this._path = path7;
        this._key = key;
      }
      get path() {
        if (!this._cachedPath.length) {
          if (Array.isArray(this._key)) {
            this._cachedPath.push(...this._path, ...this._key);
          } else {
            this._cachedPath.push(...this._path, this._key);
          }
        }
        return this._cachedPath;
      }
    };
    __name(_ParseInputLazyPath, "ParseInputLazyPath");
    ParseInputLazyPath = _ParseInputLazyPath;
    handleResult = /* @__PURE__ */ __name((ctx, result) => {
      if (isValid(result)) {
        return { success: true, data: result.value };
      } else {
        if (!ctx.common.issues.length) {
          throw new Error("Validation failed but no issues detected.");
        }
        return {
          success: false,
          get error() {
            if (this._error)
              return this._error;
            const error = new ZodError(ctx.common.issues);
            this._error = error;
            return this._error;
          }
        };
      }
    }, "handleResult");
    __name(processCreateParams, "processCreateParams");
    _ZodType = class _ZodType {
      get description() {
        return this._def.description;
      }
      _getType(input) {
        return getParsedType(input.data);
      }
      _getOrReturnCtx(input, ctx) {
        return ctx || {
          common: input.parent.common,
          data: input.data,
          parsedType: getParsedType(input.data),
          schemaErrorMap: this._def.errorMap,
          path: input.path,
          parent: input.parent
        };
      }
      _processInputParams(input) {
        return {
          status: new ParseStatus(),
          ctx: {
            common: input.parent.common,
            data: input.data,
            parsedType: getParsedType(input.data),
            schemaErrorMap: this._def.errorMap,
            path: input.path,
            parent: input.parent
          }
        };
      }
      _parseSync(input) {
        const result = this._parse(input);
        if (isAsync(result)) {
          throw new Error("Synchronous parse encountered promise.");
        }
        return result;
      }
      _parseAsync(input) {
        const result = this._parse(input);
        return Promise.resolve(result);
      }
      parse(data, params) {
        const result = this.safeParse(data, params);
        if (result.success)
          return result.data;
        throw result.error;
      }
      safeParse(data, params) {
        const ctx = {
          common: {
            issues: [],
            async: (params == null ? void 0 : params.async) ?? false,
            contextualErrorMap: params == null ? void 0 : params.errorMap
          },
          path: (params == null ? void 0 : params.path) || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data,
          parsedType: getParsedType(data)
        };
        const result = this._parseSync({ data, path: ctx.path, parent: ctx });
        return handleResult(ctx, result);
      }
      "~validate"(data) {
        var _a, _b;
        const ctx = {
          common: {
            issues: [],
            async: !!this["~standard"].async
          },
          path: [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data,
          parsedType: getParsedType(data)
        };
        if (!this["~standard"].async) {
          try {
            const result = this._parseSync({ data, path: [], parent: ctx });
            return isValid(result) ? {
              value: result.value
            } : {
              issues: ctx.common.issues
            };
          } catch (err) {
            if ((_b = (_a = err == null ? void 0 : err.message) == null ? void 0 : _a.toLowerCase()) == null ? void 0 : _b.includes("encountered")) {
              this["~standard"].async = true;
            }
            ctx.common = {
              issues: [],
              async: true
            };
          }
        }
        return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        });
      }
      async parseAsync(data, params) {
        const result = await this.safeParseAsync(data, params);
        if (result.success)
          return result.data;
        throw result.error;
      }
      async safeParseAsync(data, params) {
        const ctx = {
          common: {
            issues: [],
            contextualErrorMap: params == null ? void 0 : params.errorMap,
            async: true
          },
          path: (params == null ? void 0 : params.path) || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data,
          parsedType: getParsedType(data)
        };
        const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
        const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
        return handleResult(ctx, result);
      }
      refine(check, message) {
        const getIssueProperties = /* @__PURE__ */ __name((val) => {
          if (typeof message === "string" || typeof message === "undefined") {
            return { message };
          } else if (typeof message === "function") {
            return message(val);
          } else {
            return message;
          }
        }, "getIssueProperties");
        return this._refinement((val, ctx) => {
          const result = check(val);
          const setError = /* @__PURE__ */ __name(() => ctx.addIssue({
            code: ZodIssueCode.custom,
            ...getIssueProperties(val)
          }), "setError");
          if (typeof Promise !== "undefined" && result instanceof Promise) {
            return result.then((data) => {
              if (!data) {
                setError();
                return false;
              } else {
                return true;
              }
            });
          }
          if (!result) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      refinement(check, refinementData) {
        return this._refinement((val, ctx) => {
          if (!check(val)) {
            ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
            return false;
          } else {
            return true;
          }
        });
      }
      _refinement(refinement) {
        return new ZodEffects({
          schema: this,
          typeName: ZodFirstPartyTypeKind.ZodEffects,
          effect: { type: "refinement", refinement }
        });
      }
      superRefine(refinement) {
        return this._refinement(refinement);
      }
      constructor(def) {
        this.spa = this.safeParseAsync;
        this._def = def;
        this.parse = this.parse.bind(this);
        this.safeParse = this.safeParse.bind(this);
        this.parseAsync = this.parseAsync.bind(this);
        this.safeParseAsync = this.safeParseAsync.bind(this);
        this.spa = this.spa.bind(this);
        this.refine = this.refine.bind(this);
        this.refinement = this.refinement.bind(this);
        this.superRefine = this.superRefine.bind(this);
        this.optional = this.optional.bind(this);
        this.nullable = this.nullable.bind(this);
        this.nullish = this.nullish.bind(this);
        this.array = this.array.bind(this);
        this.promise = this.promise.bind(this);
        this.or = this.or.bind(this);
        this.and = this.and.bind(this);
        this.transform = this.transform.bind(this);
        this.brand = this.brand.bind(this);
        this.default = this.default.bind(this);
        this.catch = this.catch.bind(this);
        this.describe = this.describe.bind(this);
        this.pipe = this.pipe.bind(this);
        this.readonly = this.readonly.bind(this);
        this.isNullable = this.isNullable.bind(this);
        this.isOptional = this.isOptional.bind(this);
        this["~standard"] = {
          version: 1,
          vendor: "zod",
          validate: /* @__PURE__ */ __name((data) => this["~validate"](data), "validate")
        };
      }
      optional() {
        return ZodOptional.create(this, this._def);
      }
      nullable() {
        return ZodNullable.create(this, this._def);
      }
      nullish() {
        return this.nullable().optional();
      }
      array() {
        return ZodArray.create(this);
      }
      promise() {
        return ZodPromise.create(this, this._def);
      }
      or(option) {
        return ZodUnion.create([this, option], this._def);
      }
      and(incoming) {
        return ZodIntersection.create(this, incoming, this._def);
      }
      transform(transform) {
        return new ZodEffects({
          ...processCreateParams(this._def),
          schema: this,
          typeName: ZodFirstPartyTypeKind.ZodEffects,
          effect: { type: "transform", transform }
        });
      }
      default(def) {
        const defaultValueFunc = typeof def === "function" ? def : () => def;
        return new ZodDefault({
          ...processCreateParams(this._def),
          innerType: this,
          defaultValue: defaultValueFunc,
          typeName: ZodFirstPartyTypeKind.ZodDefault
        });
      }
      brand() {
        return new ZodBranded({
          typeName: ZodFirstPartyTypeKind.ZodBranded,
          type: this,
          ...processCreateParams(this._def)
        });
      }
      catch(def) {
        const catchValueFunc = typeof def === "function" ? def : () => def;
        return new ZodCatch({
          ...processCreateParams(this._def),
          innerType: this,
          catchValue: catchValueFunc,
          typeName: ZodFirstPartyTypeKind.ZodCatch
        });
      }
      describe(description) {
        const This = this.constructor;
        return new This({
          ...this._def,
          description
        });
      }
      pipe(target) {
        return ZodPipeline.create(this, target);
      }
      readonly() {
        return ZodReadonly.create(this);
      }
      isOptional() {
        return this.safeParse(void 0).success;
      }
      isNullable() {
        return this.safeParse(null).success;
      }
    };
    __name(_ZodType, "ZodType");
    ZodType = _ZodType;
    cuidRegex = /^c[^\s-]{8,}$/i;
    cuid2Regex = /^[0-9a-z]+$/;
    ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
    uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
    nanoidRegex = /^[a-z0-9_-]{21}$/i;
    jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
    durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
    emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
    _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
    ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
    ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
    ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
    ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
    base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
    dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
    dateRegex = new RegExp(`^${dateRegexSource}$`);
    __name(timeRegexSource, "timeRegexSource");
    __name(timeRegex, "timeRegex");
    __name(datetimeRegex, "datetimeRegex");
    __name(isValidIP, "isValidIP");
    __name(isValidJWT, "isValidJWT");
    __name(isValidCidr, "isValidCidr");
    _ZodString = class _ZodString extends ZodType {
      _parse(input) {
        if (this._def.coerce) {
          input.data = String(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.string) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.string,
            received: ctx2.parsedType
          });
          return INVALID;
        }
        const status = new ParseStatus();
        let ctx = void 0;
        for (const check of this._def.checks) {
          if (check.kind === "min") {
            if (input.data.length < check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                minimum: check.value,
                type: "string",
                inclusive: true,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            if (input.data.length > check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                maximum: check.value,
                type: "string",
                inclusive: true,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "length") {
            const tooBig = input.data.length > check.value;
            const tooSmall = input.data.length < check.value;
            if (tooBig || tooSmall) {
              ctx = this._getOrReturnCtx(input, ctx);
              if (tooBig) {
                addIssueToContext(ctx, {
                  code: ZodIssueCode.too_big,
                  maximum: check.value,
                  type: "string",
                  inclusive: true,
                  exact: true,
                  message: check.message
                });
              } else if (tooSmall) {
                addIssueToContext(ctx, {
                  code: ZodIssueCode.too_small,
                  minimum: check.value,
                  type: "string",
                  inclusive: true,
                  exact: true,
                  message: check.message
                });
              }
              status.dirty();
            }
          } else if (check.kind === "email") {
            if (!emailRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "email",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "emoji") {
            if (!emojiRegex) {
              emojiRegex = new RegExp(_emojiRegex, "u");
            }
            if (!emojiRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "emoji",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "uuid") {
            if (!uuidRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "uuid",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "nanoid") {
            if (!nanoidRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "nanoid",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "cuid") {
            if (!cuidRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "cuid",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "cuid2") {
            if (!cuid2Regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "cuid2",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "ulid") {
            if (!ulidRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "ulid",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "url") {
            try {
              new URL(input.data);
            } catch {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "url",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "regex") {
            check.regex.lastIndex = 0;
            const testResult = check.regex.test(input.data);
            if (!testResult) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "regex",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "trim") {
            input.data = input.data.trim();
          } else if (check.kind === "includes") {
            if (!input.data.includes(check.value, check.position)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: { includes: check.value, position: check.position },
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "toLowerCase") {
            input.data = input.data.toLowerCase();
          } else if (check.kind === "toUpperCase") {
            input.data = input.data.toUpperCase();
          } else if (check.kind === "startsWith") {
            if (!input.data.startsWith(check.value)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: { startsWith: check.value },
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "endsWith") {
            if (!input.data.endsWith(check.value)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: { endsWith: check.value },
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "datetime") {
            const regex = datetimeRegex(check);
            if (!regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: "datetime",
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "date") {
            const regex = dateRegex;
            if (!regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: "date",
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "time") {
            const regex = timeRegex(check);
            if (!regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: "time",
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "duration") {
            if (!durationRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "duration",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "ip") {
            if (!isValidIP(input.data, check.version)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "ip",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "jwt") {
            if (!isValidJWT(input.data, check.alg)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "jwt",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "cidr") {
            if (!isValidCidr(input.data, check.version)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "cidr",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "base64") {
            if (!base64Regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "base64",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "base64url") {
            if (!base64urlRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "base64url",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else {
            util.assertNever(check);
          }
        }
        return { status: status.value, value: input.data };
      }
      _regex(regex, validation, message) {
        return this.refinement((data) => regex.test(data), {
          validation,
          code: ZodIssueCode.invalid_string,
          ...errorUtil.errToObj(message)
        });
      }
      _addCheck(check) {
        return new _ZodString({
          ...this._def,
          checks: [...this._def.checks, check]
        });
      }
      email(message) {
        return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
      }
      url(message) {
        return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
      }
      emoji(message) {
        return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
      }
      uuid(message) {
        return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
      }
      nanoid(message) {
        return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
      }
      cuid(message) {
        return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
      }
      cuid2(message) {
        return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
      }
      ulid(message) {
        return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
      }
      base64(message) {
        return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
      }
      base64url(message) {
        return this._addCheck({
          kind: "base64url",
          ...errorUtil.errToObj(message)
        });
      }
      jwt(options) {
        return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
      }
      ip(options) {
        return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
      }
      cidr(options) {
        return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
      }
      datetime(options) {
        if (typeof options === "string") {
          return this._addCheck({
            kind: "datetime",
            precision: null,
            offset: false,
            local: false,
            message: options
          });
        }
        return this._addCheck({
          kind: "datetime",
          precision: typeof (options == null ? void 0 : options.precision) === "undefined" ? null : options == null ? void 0 : options.precision,
          offset: (options == null ? void 0 : options.offset) ?? false,
          local: (options == null ? void 0 : options.local) ?? false,
          ...errorUtil.errToObj(options == null ? void 0 : options.message)
        });
      }
      date(message) {
        return this._addCheck({ kind: "date", message });
      }
      time(options) {
        if (typeof options === "string") {
          return this._addCheck({
            kind: "time",
            precision: null,
            message: options
          });
        }
        return this._addCheck({
          kind: "time",
          precision: typeof (options == null ? void 0 : options.precision) === "undefined" ? null : options == null ? void 0 : options.precision,
          ...errorUtil.errToObj(options == null ? void 0 : options.message)
        });
      }
      duration(message) {
        return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
      }
      regex(regex, message) {
        return this._addCheck({
          kind: "regex",
          regex,
          ...errorUtil.errToObj(message)
        });
      }
      includes(value, options) {
        return this._addCheck({
          kind: "includes",
          value,
          position: options == null ? void 0 : options.position,
          ...errorUtil.errToObj(options == null ? void 0 : options.message)
        });
      }
      startsWith(value, message) {
        return this._addCheck({
          kind: "startsWith",
          value,
          ...errorUtil.errToObj(message)
        });
      }
      endsWith(value, message) {
        return this._addCheck({
          kind: "endsWith",
          value,
          ...errorUtil.errToObj(message)
        });
      }
      min(minLength, message) {
        return this._addCheck({
          kind: "min",
          value: minLength,
          ...errorUtil.errToObj(message)
        });
      }
      max(maxLength, message) {
        return this._addCheck({
          kind: "max",
          value: maxLength,
          ...errorUtil.errToObj(message)
        });
      }
      length(len, message) {
        return this._addCheck({
          kind: "length",
          value: len,
          ...errorUtil.errToObj(message)
        });
      }
      /**
       * Equivalent to `.min(1)`
       */
      nonempty(message) {
        return this.min(1, errorUtil.errToObj(message));
      }
      trim() {
        return new _ZodString({
          ...this._def,
          checks: [...this._def.checks, { kind: "trim" }]
        });
      }
      toLowerCase() {
        return new _ZodString({
          ...this._def,
          checks: [...this._def.checks, { kind: "toLowerCase" }]
        });
      }
      toUpperCase() {
        return new _ZodString({
          ...this._def,
          checks: [...this._def.checks, { kind: "toUpperCase" }]
        });
      }
      get isDatetime() {
        return !!this._def.checks.find((ch) => ch.kind === "datetime");
      }
      get isDate() {
        return !!this._def.checks.find((ch) => ch.kind === "date");
      }
      get isTime() {
        return !!this._def.checks.find((ch) => ch.kind === "time");
      }
      get isDuration() {
        return !!this._def.checks.find((ch) => ch.kind === "duration");
      }
      get isEmail() {
        return !!this._def.checks.find((ch) => ch.kind === "email");
      }
      get isURL() {
        return !!this._def.checks.find((ch) => ch.kind === "url");
      }
      get isEmoji() {
        return !!this._def.checks.find((ch) => ch.kind === "emoji");
      }
      get isUUID() {
        return !!this._def.checks.find((ch) => ch.kind === "uuid");
      }
      get isNANOID() {
        return !!this._def.checks.find((ch) => ch.kind === "nanoid");
      }
      get isCUID() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid");
      }
      get isCUID2() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid2");
      }
      get isULID() {
        return !!this._def.checks.find((ch) => ch.kind === "ulid");
      }
      get isIP() {
        return !!this._def.checks.find((ch) => ch.kind === "ip");
      }
      get isCIDR() {
        return !!this._def.checks.find((ch) => ch.kind === "cidr");
      }
      get isBase64() {
        return !!this._def.checks.find((ch) => ch.kind === "base64");
      }
      get isBase64url() {
        return !!this._def.checks.find((ch) => ch.kind === "base64url");
      }
      get minLength() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min;
      }
      get maxLength() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max;
      }
    };
    __name(_ZodString, "ZodString");
    ZodString = _ZodString;
    ZodString.create = (params) => {
      return new ZodString({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodString,
        coerce: (params == null ? void 0 : params.coerce) ?? false,
        ...processCreateParams(params)
      });
    };
    __name(floatSafeRemainder, "floatSafeRemainder");
    _ZodNumber = class _ZodNumber extends ZodType {
      constructor() {
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
        this.step = this.multipleOf;
      }
      _parse(input) {
        if (this._def.coerce) {
          input.data = Number(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.number) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.number,
            received: ctx2.parsedType
          });
          return INVALID;
        }
        let ctx = void 0;
        const status = new ParseStatus();
        for (const check of this._def.checks) {
          if (check.kind === "int") {
            if (!util.isInteger(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: "integer",
                received: "float",
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "min") {
            const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
            if (tooSmall) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                minimum: check.value,
                type: "number",
                inclusive: check.inclusive,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
            if (tooBig) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                maximum: check.value,
                type: "number",
                inclusive: check.inclusive,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "multipleOf") {
            if (floatSafeRemainder(input.data, check.value) !== 0) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.not_multiple_of,
                multipleOf: check.value,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "finite") {
            if (!Number.isFinite(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.not_finite,
                message: check.message
              });
              status.dirty();
            }
          } else {
            util.assertNever(check);
          }
        }
        return { status: status.value, value: input.data };
      }
      gte(value, message) {
        return this.setLimit("min", value, true, errorUtil.toString(message));
      }
      gt(value, message) {
        return this.setLimit("min", value, false, errorUtil.toString(message));
      }
      lte(value, message) {
        return this.setLimit("max", value, true, errorUtil.toString(message));
      }
      lt(value, message) {
        return this.setLimit("max", value, false, errorUtil.toString(message));
      }
      setLimit(kind, value, inclusive, message) {
        return new _ZodNumber({
          ...this._def,
          checks: [
            ...this._def.checks,
            {
              kind,
              value,
              inclusive,
              message: errorUtil.toString(message)
            }
          ]
        });
      }
      _addCheck(check) {
        return new _ZodNumber({
          ...this._def,
          checks: [...this._def.checks, check]
        });
      }
      int(message) {
        return this._addCheck({
          kind: "int",
          message: errorUtil.toString(message)
        });
      }
      positive(message) {
        return this._addCheck({
          kind: "min",
          value: 0,
          inclusive: false,
          message: errorUtil.toString(message)
        });
      }
      negative(message) {
        return this._addCheck({
          kind: "max",
          value: 0,
          inclusive: false,
          message: errorUtil.toString(message)
        });
      }
      nonpositive(message) {
        return this._addCheck({
          kind: "max",
          value: 0,
          inclusive: true,
          message: errorUtil.toString(message)
        });
      }
      nonnegative(message) {
        return this._addCheck({
          kind: "min",
          value: 0,
          inclusive: true,
          message: errorUtil.toString(message)
        });
      }
      multipleOf(value, message) {
        return this._addCheck({
          kind: "multipleOf",
          value,
          message: errorUtil.toString(message)
        });
      }
      finite(message) {
        return this._addCheck({
          kind: "finite",
          message: errorUtil.toString(message)
        });
      }
      safe(message) {
        return this._addCheck({
          kind: "min",
          inclusive: true,
          value: Number.MIN_SAFE_INTEGER,
          message: errorUtil.toString(message)
        })._addCheck({
          kind: "max",
          inclusive: true,
          value: Number.MAX_SAFE_INTEGER,
          message: errorUtil.toString(message)
        });
      }
      get minValue() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min;
      }
      get maxValue() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max;
      }
      get isInt() {
        return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
      }
      get isFinite() {
        let max = null;
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
            return true;
          } else if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          } else if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return Number.isFinite(min) && Number.isFinite(max);
      }
    };
    __name(_ZodNumber, "ZodNumber");
    ZodNumber = _ZodNumber;
    ZodNumber.create = (params) => {
      return new ZodNumber({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodNumber,
        coerce: (params == null ? void 0 : params.coerce) || false,
        ...processCreateParams(params)
      });
    };
    _ZodBigInt = class _ZodBigInt extends ZodType {
      constructor() {
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
      }
      _parse(input) {
        if (this._def.coerce) {
          try {
            input.data = BigInt(input.data);
          } catch {
            return this._getInvalidInput(input);
          }
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.bigint) {
          return this._getInvalidInput(input);
        }
        let ctx = void 0;
        const status = new ParseStatus();
        for (const check of this._def.checks) {
          if (check.kind === "min") {
            const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
            if (tooSmall) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                type: "bigint",
                minimum: check.value,
                inclusive: check.inclusive,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
            if (tooBig) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                type: "bigint",
                maximum: check.value,
                inclusive: check.inclusive,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "multipleOf") {
            if (input.data % check.value !== BigInt(0)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.not_multiple_of,
                multipleOf: check.value,
                message: check.message
              });
              status.dirty();
            }
          } else {
            util.assertNever(check);
          }
        }
        return { status: status.value, value: input.data };
      }
      _getInvalidInput(input) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.bigint,
          received: ctx.parsedType
        });
        return INVALID;
      }
      gte(value, message) {
        return this.setLimit("min", value, true, errorUtil.toString(message));
      }
      gt(value, message) {
        return this.setLimit("min", value, false, errorUtil.toString(message));
      }
      lte(value, message) {
        return this.setLimit("max", value, true, errorUtil.toString(message));
      }
      lt(value, message) {
        return this.setLimit("max", value, false, errorUtil.toString(message));
      }
      setLimit(kind, value, inclusive, message) {
        return new _ZodBigInt({
          ...this._def,
          checks: [
            ...this._def.checks,
            {
              kind,
              value,
              inclusive,
              message: errorUtil.toString(message)
            }
          ]
        });
      }
      _addCheck(check) {
        return new _ZodBigInt({
          ...this._def,
          checks: [...this._def.checks, check]
        });
      }
      positive(message) {
        return this._addCheck({
          kind: "min",
          value: BigInt(0),
          inclusive: false,
          message: errorUtil.toString(message)
        });
      }
      negative(message) {
        return this._addCheck({
          kind: "max",
          value: BigInt(0),
          inclusive: false,
          message: errorUtil.toString(message)
        });
      }
      nonpositive(message) {
        return this._addCheck({
          kind: "max",
          value: BigInt(0),
          inclusive: true,
          message: errorUtil.toString(message)
        });
      }
      nonnegative(message) {
        return this._addCheck({
          kind: "min",
          value: BigInt(0),
          inclusive: true,
          message: errorUtil.toString(message)
        });
      }
      multipleOf(value, message) {
        return this._addCheck({
          kind: "multipleOf",
          value,
          message: errorUtil.toString(message)
        });
      }
      get minValue() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min;
      }
      get maxValue() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max;
      }
    };
    __name(_ZodBigInt, "ZodBigInt");
    ZodBigInt = _ZodBigInt;
    ZodBigInt.create = (params) => {
      return new ZodBigInt({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodBigInt,
        coerce: (params == null ? void 0 : params.coerce) ?? false,
        ...processCreateParams(params)
      });
    };
    _ZodBoolean = class _ZodBoolean extends ZodType {
      _parse(input) {
        if (this._def.coerce) {
          input.data = Boolean(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.boolean) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.boolean,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    __name(_ZodBoolean, "ZodBoolean");
    ZodBoolean = _ZodBoolean;
    ZodBoolean.create = (params) => {
      return new ZodBoolean({
        typeName: ZodFirstPartyTypeKind.ZodBoolean,
        coerce: (params == null ? void 0 : params.coerce) || false,
        ...processCreateParams(params)
      });
    };
    _ZodDate = class _ZodDate extends ZodType {
      _parse(input) {
        if (this._def.coerce) {
          input.data = new Date(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.date) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.date,
            received: ctx2.parsedType
          });
          return INVALID;
        }
        if (Number.isNaN(input.data.getTime())) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_date
          });
          return INVALID;
        }
        const status = new ParseStatus();
        let ctx = void 0;
        for (const check of this._def.checks) {
          if (check.kind === "min") {
            if (input.data.getTime() < check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                message: check.message,
                inclusive: true,
                exact: false,
                minimum: check.value,
                type: "date"
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            if (input.data.getTime() > check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                message: check.message,
                inclusive: true,
                exact: false,
                maximum: check.value,
                type: "date"
              });
              status.dirty();
            }
          } else {
            util.assertNever(check);
          }
        }
        return {
          status: status.value,
          value: new Date(input.data.getTime())
        };
      }
      _addCheck(check) {
        return new _ZodDate({
          ...this._def,
          checks: [...this._def.checks, check]
        });
      }
      min(minDate, message) {
        return this._addCheck({
          kind: "min",
          value: minDate.getTime(),
          message: errorUtil.toString(message)
        });
      }
      max(maxDate, message) {
        return this._addCheck({
          kind: "max",
          value: maxDate.getTime(),
          message: errorUtil.toString(message)
        });
      }
      get minDate() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min != null ? new Date(min) : null;
      }
      get maxDate() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max != null ? new Date(max) : null;
      }
    };
    __name(_ZodDate, "ZodDate");
    ZodDate = _ZodDate;
    ZodDate.create = (params) => {
      return new ZodDate({
        checks: [],
        coerce: (params == null ? void 0 : params.coerce) || false,
        typeName: ZodFirstPartyTypeKind.ZodDate,
        ...processCreateParams(params)
      });
    };
    _ZodSymbol = class _ZodSymbol extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.symbol) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.symbol,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    __name(_ZodSymbol, "ZodSymbol");
    ZodSymbol = _ZodSymbol;
    ZodSymbol.create = (params) => {
      return new ZodSymbol({
        typeName: ZodFirstPartyTypeKind.ZodSymbol,
        ...processCreateParams(params)
      });
    };
    _ZodUndefined = class _ZodUndefined extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.undefined) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.undefined,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    __name(_ZodUndefined, "ZodUndefined");
    ZodUndefined = _ZodUndefined;
    ZodUndefined.create = (params) => {
      return new ZodUndefined({
        typeName: ZodFirstPartyTypeKind.ZodUndefined,
        ...processCreateParams(params)
      });
    };
    _ZodNull = class _ZodNull extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.null) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.null,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    __name(_ZodNull, "ZodNull");
    ZodNull = _ZodNull;
    ZodNull.create = (params) => {
      return new ZodNull({
        typeName: ZodFirstPartyTypeKind.ZodNull,
        ...processCreateParams(params)
      });
    };
    _ZodAny = class _ZodAny extends ZodType {
      constructor() {
        super(...arguments);
        this._any = true;
      }
      _parse(input) {
        return OK(input.data);
      }
    };
    __name(_ZodAny, "ZodAny");
    ZodAny = _ZodAny;
    ZodAny.create = (params) => {
      return new ZodAny({
        typeName: ZodFirstPartyTypeKind.ZodAny,
        ...processCreateParams(params)
      });
    };
    _ZodUnknown = class _ZodUnknown extends ZodType {
      constructor() {
        super(...arguments);
        this._unknown = true;
      }
      _parse(input) {
        return OK(input.data);
      }
    };
    __name(_ZodUnknown, "ZodUnknown");
    ZodUnknown = _ZodUnknown;
    ZodUnknown.create = (params) => {
      return new ZodUnknown({
        typeName: ZodFirstPartyTypeKind.ZodUnknown,
        ...processCreateParams(params)
      });
    };
    _ZodNever = class _ZodNever extends ZodType {
      _parse(input) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.never,
          received: ctx.parsedType
        });
        return INVALID;
      }
    };
    __name(_ZodNever, "ZodNever");
    ZodNever = _ZodNever;
    ZodNever.create = (params) => {
      return new ZodNever({
        typeName: ZodFirstPartyTypeKind.ZodNever,
        ...processCreateParams(params)
      });
    };
    _ZodVoid = class _ZodVoid extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.undefined) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.void,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    __name(_ZodVoid, "ZodVoid");
    ZodVoid = _ZodVoid;
    ZodVoid.create = (params) => {
      return new ZodVoid({
        typeName: ZodFirstPartyTypeKind.ZodVoid,
        ...processCreateParams(params)
      });
    };
    _ZodArray = class _ZodArray extends ZodType {
      _parse(input) {
        const { ctx, status } = this._processInputParams(input);
        const def = this._def;
        if (ctx.parsedType !== ZodParsedType.array) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.array,
            received: ctx.parsedType
          });
          return INVALID;
        }
        if (def.exactLength !== null) {
          const tooBig = ctx.data.length > def.exactLength.value;
          const tooSmall = ctx.data.length < def.exactLength.value;
          if (tooBig || tooSmall) {
            addIssueToContext(ctx, {
              code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
              minimum: tooSmall ? def.exactLength.value : void 0,
              maximum: tooBig ? def.exactLength.value : void 0,
              type: "array",
              inclusive: true,
              exact: true,
              message: def.exactLength.message
            });
            status.dirty();
          }
        }
        if (def.minLength !== null) {
          if (ctx.data.length < def.minLength.value) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: def.minLength.value,
              type: "array",
              inclusive: true,
              exact: false,
              message: def.minLength.message
            });
            status.dirty();
          }
        }
        if (def.maxLength !== null) {
          if (ctx.data.length > def.maxLength.value) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: def.maxLength.value,
              type: "array",
              inclusive: true,
              exact: false,
              message: def.maxLength.message
            });
            status.dirty();
          }
        }
        if (ctx.common.async) {
          return Promise.all([...ctx.data].map((item, i) => {
            return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
          })).then((result2) => {
            return ParseStatus.mergeArray(status, result2);
          });
        }
        const result = [...ctx.data].map((item, i) => {
          return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
        });
        return ParseStatus.mergeArray(status, result);
      }
      get element() {
        return this._def.type;
      }
      min(minLength, message) {
        return new _ZodArray({
          ...this._def,
          minLength: { value: minLength, message: errorUtil.toString(message) }
        });
      }
      max(maxLength, message) {
        return new _ZodArray({
          ...this._def,
          maxLength: { value: maxLength, message: errorUtil.toString(message) }
        });
      }
      length(len, message) {
        return new _ZodArray({
          ...this._def,
          exactLength: { value: len, message: errorUtil.toString(message) }
        });
      }
      nonempty(message) {
        return this.min(1, message);
      }
    };
    __name(_ZodArray, "ZodArray");
    ZodArray = _ZodArray;
    ZodArray.create = (schema, params) => {
      return new ZodArray({
        type: schema,
        minLength: null,
        maxLength: null,
        exactLength: null,
        typeName: ZodFirstPartyTypeKind.ZodArray,
        ...processCreateParams(params)
      });
    };
    __name(deepPartialify, "deepPartialify");
    _ZodObject = class _ZodObject extends ZodType {
      constructor() {
        super(...arguments);
        this._cached = null;
        this.nonstrict = this.passthrough;
        this.augment = this.extend;
      }
      _getCached() {
        if (this._cached !== null)
          return this._cached;
        const shape = this._def.shape();
        const keys = util.objectKeys(shape);
        this._cached = { shape, keys };
        return this._cached;
      }
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.object) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.object,
            received: ctx2.parsedType
          });
          return INVALID;
        }
        const { status, ctx } = this._processInputParams(input);
        const { shape, keys: shapeKeys } = this._getCached();
        const extraKeys = [];
        if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
          for (const key in ctx.data) {
            if (!shapeKeys.includes(key)) {
              extraKeys.push(key);
            }
          }
        }
        const pairs = [];
        for (const key of shapeKeys) {
          const keyValidator = shape[key];
          const value = ctx.data[key];
          pairs.push({
            key: { status: "valid", value: key },
            value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
            alwaysSet: key in ctx.data
          });
        }
        if (this._def.catchall instanceof ZodNever) {
          const unknownKeys = this._def.unknownKeys;
          if (unknownKeys === "passthrough") {
            for (const key of extraKeys) {
              pairs.push({
                key: { status: "valid", value: key },
                value: { status: "valid", value: ctx.data[key] }
              });
            }
          } else if (unknownKeys === "strict") {
            if (extraKeys.length > 0) {
              addIssueToContext(ctx, {
                code: ZodIssueCode.unrecognized_keys,
                keys: extraKeys
              });
              status.dirty();
            }
          } else if (unknownKeys === "strip") {
          } else {
            throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
          }
        } else {
          const catchall = this._def.catchall;
          for (const key of extraKeys) {
            const value = ctx.data[key];
            pairs.push({
              key: { status: "valid", value: key },
              value: catchall._parse(
                new ParseInputLazyPath(ctx, value, ctx.path, key)
                //, ctx.child(key), value, getParsedType(value)
              ),
              alwaysSet: key in ctx.data
            });
          }
        }
        if (ctx.common.async) {
          return Promise.resolve().then(async () => {
            const syncPairs = [];
            for (const pair of pairs) {
              const key = await pair.key;
              const value = await pair.value;
              syncPairs.push({
                key,
                value,
                alwaysSet: pair.alwaysSet
              });
            }
            return syncPairs;
          }).then((syncPairs) => {
            return ParseStatus.mergeObjectSync(status, syncPairs);
          });
        } else {
          return ParseStatus.mergeObjectSync(status, pairs);
        }
      }
      get shape() {
        return this._def.shape();
      }
      strict(message) {
        errorUtil.errToObj;
        return new _ZodObject({
          ...this._def,
          unknownKeys: "strict",
          ...message !== void 0 ? {
            errorMap: /* @__PURE__ */ __name((issue, ctx) => {
              var _a, _b;
              const defaultError = ((_b = (_a = this._def).errorMap) == null ? void 0 : _b.call(_a, issue, ctx).message) ?? ctx.defaultError;
              if (issue.code === "unrecognized_keys")
                return {
                  message: errorUtil.errToObj(message).message ?? defaultError
                };
              return {
                message: defaultError
              };
            }, "errorMap")
          } : {}
        });
      }
      strip() {
        return new _ZodObject({
          ...this._def,
          unknownKeys: "strip"
        });
      }
      passthrough() {
        return new _ZodObject({
          ...this._def,
          unknownKeys: "passthrough"
        });
      }
      // const AugmentFactory =
      //   <Def extends ZodObjectDef>(def: Def) =>
      //   <Augmentation extends ZodRawShape>(
      //     augmentation: Augmentation
      //   ): ZodObject<
      //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
      //     Def["unknownKeys"],
      //     Def["catchall"]
      //   > => {
      //     return new ZodObject({
      //       ...def,
      //       shape: () => ({
      //         ...def.shape(),
      //         ...augmentation,
      //       }),
      //     }) as any;
      //   };
      extend(augmentation) {
        return new _ZodObject({
          ...this._def,
          shape: /* @__PURE__ */ __name(() => ({
            ...this._def.shape(),
            ...augmentation
          }), "shape")
        });
      }
      /**
       * Prior to zod@1.0.12 there was a bug in the
       * inferred type of merged objects. Please
       * upgrade if you are experiencing issues.
       */
      merge(merging) {
        const merged = new _ZodObject({
          unknownKeys: merging._def.unknownKeys,
          catchall: merging._def.catchall,
          shape: /* @__PURE__ */ __name(() => ({
            ...this._def.shape(),
            ...merging._def.shape()
          }), "shape"),
          typeName: ZodFirstPartyTypeKind.ZodObject
        });
        return merged;
      }
      // merge<
      //   Incoming extends AnyZodObject,
      //   Augmentation extends Incoming["shape"],
      //   NewOutput extends {
      //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
      //       ? Augmentation[k]["_output"]
      //       : k extends keyof Output
      //       ? Output[k]
      //       : never;
      //   },
      //   NewInput extends {
      //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
      //       ? Augmentation[k]["_input"]
      //       : k extends keyof Input
      //       ? Input[k]
      //       : never;
      //   }
      // >(
      //   merging: Incoming
      // ): ZodObject<
      //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
      //   Incoming["_def"]["unknownKeys"],
      //   Incoming["_def"]["catchall"],
      //   NewOutput,
      //   NewInput
      // > {
      //   const merged: any = new ZodObject({
      //     unknownKeys: merging._def.unknownKeys,
      //     catchall: merging._def.catchall,
      //     shape: () =>
      //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
      //     typeName: ZodFirstPartyTypeKind.ZodObject,
      //   }) as any;
      //   return merged;
      // }
      setKey(key, schema) {
        return this.augment({ [key]: schema });
      }
      // merge<Incoming extends AnyZodObject>(
      //   merging: Incoming
      // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
      // ZodObject<
      //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
      //   Incoming["_def"]["unknownKeys"],
      //   Incoming["_def"]["catchall"]
      // > {
      //   // const mergedShape = objectUtil.mergeShapes(
      //   //   this._def.shape(),
      //   //   merging._def.shape()
      //   // );
      //   const merged: any = new ZodObject({
      //     unknownKeys: merging._def.unknownKeys,
      //     catchall: merging._def.catchall,
      //     shape: () =>
      //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
      //     typeName: ZodFirstPartyTypeKind.ZodObject,
      //   }) as any;
      //   return merged;
      // }
      catchall(index) {
        return new _ZodObject({
          ...this._def,
          catchall: index
        });
      }
      pick(mask) {
        const shape = {};
        for (const key of util.objectKeys(mask)) {
          if (mask[key] && this.shape[key]) {
            shape[key] = this.shape[key];
          }
        }
        return new _ZodObject({
          ...this._def,
          shape: /* @__PURE__ */ __name(() => shape, "shape")
        });
      }
      omit(mask) {
        const shape = {};
        for (const key of util.objectKeys(this.shape)) {
          if (!mask[key]) {
            shape[key] = this.shape[key];
          }
        }
        return new _ZodObject({
          ...this._def,
          shape: /* @__PURE__ */ __name(() => shape, "shape")
        });
      }
      /**
       * @deprecated
       */
      deepPartial() {
        return deepPartialify(this);
      }
      partial(mask) {
        const newShape = {};
        for (const key of util.objectKeys(this.shape)) {
          const fieldSchema = this.shape[key];
          if (mask && !mask[key]) {
            newShape[key] = fieldSchema;
          } else {
            newShape[key] = fieldSchema.optional();
          }
        }
        return new _ZodObject({
          ...this._def,
          shape: /* @__PURE__ */ __name(() => newShape, "shape")
        });
      }
      required(mask) {
        const newShape = {};
        for (const key of util.objectKeys(this.shape)) {
          if (mask && !mask[key]) {
            newShape[key] = this.shape[key];
          } else {
            const fieldSchema = this.shape[key];
            let newField = fieldSchema;
            while (newField instanceof ZodOptional) {
              newField = newField._def.innerType;
            }
            newShape[key] = newField;
          }
        }
        return new _ZodObject({
          ...this._def,
          shape: /* @__PURE__ */ __name(() => newShape, "shape")
        });
      }
      keyof() {
        return createZodEnum(util.objectKeys(this.shape));
      }
    };
    __name(_ZodObject, "ZodObject");
    ZodObject = _ZodObject;
    ZodObject.create = (shape, params) => {
      return new ZodObject({
        shape: /* @__PURE__ */ __name(() => shape, "shape"),
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params)
      });
    };
    ZodObject.strictCreate = (shape, params) => {
      return new ZodObject({
        shape: /* @__PURE__ */ __name(() => shape, "shape"),
        unknownKeys: "strict",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params)
      });
    };
    ZodObject.lazycreate = (shape, params) => {
      return new ZodObject({
        shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params)
      });
    };
    _ZodUnion = class _ZodUnion extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const options = this._def.options;
        function handleResults(results) {
          for (const result of results) {
            if (result.result.status === "valid") {
              return result.result;
            }
          }
          for (const result of results) {
            if (result.result.status === "dirty") {
              ctx.common.issues.push(...result.ctx.common.issues);
              return result.result;
            }
          }
          const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_union,
            unionErrors
          });
          return INVALID;
        }
        __name(handleResults, "handleResults");
        if (ctx.common.async) {
          return Promise.all(options.map(async (option) => {
            const childCtx = {
              ...ctx,
              common: {
                ...ctx.common,
                issues: []
              },
              parent: null
            };
            return {
              result: await option._parseAsync({
                data: ctx.data,
                path: ctx.path,
                parent: childCtx
              }),
              ctx: childCtx
            };
          })).then(handleResults);
        } else {
          let dirty = void 0;
          const issues = [];
          for (const option of options) {
            const childCtx = {
              ...ctx,
              common: {
                ...ctx.common,
                issues: []
              },
              parent: null
            };
            const result = option._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: childCtx
            });
            if (result.status === "valid") {
              return result;
            } else if (result.status === "dirty" && !dirty) {
              dirty = { result, ctx: childCtx };
            }
            if (childCtx.common.issues.length) {
              issues.push(childCtx.common.issues);
            }
          }
          if (dirty) {
            ctx.common.issues.push(...dirty.ctx.common.issues);
            return dirty.result;
          }
          const unionErrors = issues.map((issues2) => new ZodError(issues2));
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_union,
            unionErrors
          });
          return INVALID;
        }
      }
      get options() {
        return this._def.options;
      }
    };
    __name(_ZodUnion, "ZodUnion");
    ZodUnion = _ZodUnion;
    ZodUnion.create = (types, params) => {
      return new ZodUnion({
        options: types,
        typeName: ZodFirstPartyTypeKind.ZodUnion,
        ...processCreateParams(params)
      });
    };
    getDiscriminator = /* @__PURE__ */ __name((type) => {
      if (type instanceof ZodLazy) {
        return getDiscriminator(type.schema);
      } else if (type instanceof ZodEffects) {
        return getDiscriminator(type.innerType());
      } else if (type instanceof ZodLiteral) {
        return [type.value];
      } else if (type instanceof ZodEnum) {
        return type.options;
      } else if (type instanceof ZodNativeEnum) {
        return util.objectValues(type.enum);
      } else if (type instanceof ZodDefault) {
        return getDiscriminator(type._def.innerType);
      } else if (type instanceof ZodUndefined) {
        return [void 0];
      } else if (type instanceof ZodNull) {
        return [null];
      } else if (type instanceof ZodOptional) {
        return [void 0, ...getDiscriminator(type.unwrap())];
      } else if (type instanceof ZodNullable) {
        return [null, ...getDiscriminator(type.unwrap())];
      } else if (type instanceof ZodBranded) {
        return getDiscriminator(type.unwrap());
      } else if (type instanceof ZodReadonly) {
        return getDiscriminator(type.unwrap());
      } else if (type instanceof ZodCatch) {
        return getDiscriminator(type._def.innerType);
      } else {
        return [];
      }
    }, "getDiscriminator");
    _ZodDiscriminatedUnion = class _ZodDiscriminatedUnion extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.object) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.object,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const discriminator = this.discriminator;
        const discriminatorValue = ctx.data[discriminator];
        const option = this.optionsMap.get(discriminatorValue);
        if (!option) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_union_discriminator,
            options: Array.from(this.optionsMap.keys()),
            path: [discriminator]
          });
          return INVALID;
        }
        if (ctx.common.async) {
          return option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
        } else {
          return option._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
        }
      }
      get discriminator() {
        return this._def.discriminator;
      }
      get options() {
        return this._def.options;
      }
      get optionsMap() {
        return this._def.optionsMap;
      }
      /**
       * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
       * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
       * have a different value for each object in the union.
       * @param discriminator the name of the discriminator property
       * @param types an array of object schemas
       * @param params
       */
      static create(discriminator, options, params) {
        const optionsMap = /* @__PURE__ */ new Map();
        for (const type of options) {
          const discriminatorValues = getDiscriminator(type.shape[discriminator]);
          if (!discriminatorValues.length) {
            throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
          }
          for (const value of discriminatorValues) {
            if (optionsMap.has(value)) {
              throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
            }
            optionsMap.set(value, type);
          }
        }
        return new _ZodDiscriminatedUnion({
          typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
          discriminator,
          options,
          optionsMap,
          ...processCreateParams(params)
        });
      }
    };
    __name(_ZodDiscriminatedUnion, "ZodDiscriminatedUnion");
    ZodDiscriminatedUnion = _ZodDiscriminatedUnion;
    __name(mergeValues, "mergeValues");
    _ZodIntersection = class _ZodIntersection extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const handleParsed = /* @__PURE__ */ __name((parsedLeft, parsedRight) => {
          if (isAborted(parsedLeft) || isAborted(parsedRight)) {
            return INVALID;
          }
          const merged = mergeValues(parsedLeft.value, parsedRight.value);
          if (!merged.valid) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_intersection_types
            });
            return INVALID;
          }
          if (isDirty(parsedLeft) || isDirty(parsedRight)) {
            status.dirty();
          }
          return { status: status.value, value: merged.data };
        }, "handleParsed");
        if (ctx.common.async) {
          return Promise.all([
            this._def.left._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            }),
            this._def.right._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            })
          ]).then(([left, right]) => handleParsed(left, right));
        } else {
          return handleParsed(this._def.left._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          }), this._def.right._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          }));
        }
      }
    };
    __name(_ZodIntersection, "ZodIntersection");
    ZodIntersection = _ZodIntersection;
    ZodIntersection.create = (left, right, params) => {
      return new ZodIntersection({
        left,
        right,
        typeName: ZodFirstPartyTypeKind.ZodIntersection,
        ...processCreateParams(params)
      });
    };
    _ZodTuple = class _ZodTuple extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.array) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.array,
            received: ctx.parsedType
          });
          return INVALID;
        }
        if (ctx.data.length < this._def.items.length) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: this._def.items.length,
            inclusive: true,
            exact: false,
            type: "array"
          });
          return INVALID;
        }
        const rest = this._def.rest;
        if (!rest && ctx.data.length > this._def.items.length) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: this._def.items.length,
            inclusive: true,
            exact: false,
            type: "array"
          });
          status.dirty();
        }
        const items = [...ctx.data].map((item, itemIndex) => {
          const schema = this._def.items[itemIndex] || this._def.rest;
          if (!schema)
            return null;
          return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
        }).filter((x) => !!x);
        if (ctx.common.async) {
          return Promise.all(items).then((results) => {
            return ParseStatus.mergeArray(status, results);
          });
        } else {
          return ParseStatus.mergeArray(status, items);
        }
      }
      get items() {
        return this._def.items;
      }
      rest(rest) {
        return new _ZodTuple({
          ...this._def,
          rest
        });
      }
    };
    __name(_ZodTuple, "ZodTuple");
    ZodTuple = _ZodTuple;
    ZodTuple.create = (schemas, params) => {
      if (!Array.isArray(schemas)) {
        throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
      }
      return new ZodTuple({
        items: schemas,
        typeName: ZodFirstPartyTypeKind.ZodTuple,
        rest: null,
        ...processCreateParams(params)
      });
    };
    _ZodRecord = class _ZodRecord extends ZodType {
      get keySchema() {
        return this._def.keyType;
      }
      get valueSchema() {
        return this._def.valueType;
      }
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.object) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.object,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const pairs = [];
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        for (const key in ctx.data) {
          pairs.push({
            key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
            value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
            alwaysSet: key in ctx.data
          });
        }
        if (ctx.common.async) {
          return ParseStatus.mergeObjectAsync(status, pairs);
        } else {
          return ParseStatus.mergeObjectSync(status, pairs);
        }
      }
      get element() {
        return this._def.valueType;
      }
      static create(first, second, third) {
        if (second instanceof ZodType) {
          return new _ZodRecord({
            keyType: first,
            valueType: second,
            typeName: ZodFirstPartyTypeKind.ZodRecord,
            ...processCreateParams(third)
          });
        }
        return new _ZodRecord({
          keyType: ZodString.create(),
          valueType: first,
          typeName: ZodFirstPartyTypeKind.ZodRecord,
          ...processCreateParams(second)
        });
      }
    };
    __name(_ZodRecord, "ZodRecord");
    ZodRecord = _ZodRecord;
    _ZodMap = class _ZodMap extends ZodType {
      get keySchema() {
        return this._def.keyType;
      }
      get valueSchema() {
        return this._def.valueType;
      }
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.map) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.map,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        const pairs = [...ctx.data.entries()].map(([key, value], index) => {
          return {
            key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
            value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
          };
        });
        if (ctx.common.async) {
          const finalMap = /* @__PURE__ */ new Map();
          return Promise.resolve().then(async () => {
            for (const pair of pairs) {
              const key = await pair.key;
              const value = await pair.value;
              if (key.status === "aborted" || value.status === "aborted") {
                return INVALID;
              }
              if (key.status === "dirty" || value.status === "dirty") {
                status.dirty();
              }
              finalMap.set(key.value, value.value);
            }
            return { status: status.value, value: finalMap };
          });
        } else {
          const finalMap = /* @__PURE__ */ new Map();
          for (const pair of pairs) {
            const key = pair.key;
            const value = pair.value;
            if (key.status === "aborted" || value.status === "aborted") {
              return INVALID;
            }
            if (key.status === "dirty" || value.status === "dirty") {
              status.dirty();
            }
            finalMap.set(key.value, value.value);
          }
          return { status: status.value, value: finalMap };
        }
      }
    };
    __name(_ZodMap, "ZodMap");
    ZodMap = _ZodMap;
    ZodMap.create = (keyType, valueType, params) => {
      return new ZodMap({
        valueType,
        keyType,
        typeName: ZodFirstPartyTypeKind.ZodMap,
        ...processCreateParams(params)
      });
    };
    _ZodSet = class _ZodSet extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.set) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.set,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const def = this._def;
        if (def.minSize !== null) {
          if (ctx.data.size < def.minSize.value) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: def.minSize.value,
              type: "set",
              inclusive: true,
              exact: false,
              message: def.minSize.message
            });
            status.dirty();
          }
        }
        if (def.maxSize !== null) {
          if (ctx.data.size > def.maxSize.value) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: def.maxSize.value,
              type: "set",
              inclusive: true,
              exact: false,
              message: def.maxSize.message
            });
            status.dirty();
          }
        }
        const valueType = this._def.valueType;
        function finalizeSet(elements2) {
          const parsedSet = /* @__PURE__ */ new Set();
          for (const element of elements2) {
            if (element.status === "aborted")
              return INVALID;
            if (element.status === "dirty")
              status.dirty();
            parsedSet.add(element.value);
          }
          return { status: status.value, value: parsedSet };
        }
        __name(finalizeSet, "finalizeSet");
        const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
        if (ctx.common.async) {
          return Promise.all(elements).then((elements2) => finalizeSet(elements2));
        } else {
          return finalizeSet(elements);
        }
      }
      min(minSize, message) {
        return new _ZodSet({
          ...this._def,
          minSize: { value: minSize, message: errorUtil.toString(message) }
        });
      }
      max(maxSize, message) {
        return new _ZodSet({
          ...this._def,
          maxSize: { value: maxSize, message: errorUtil.toString(message) }
        });
      }
      size(size, message) {
        return this.min(size, message).max(size, message);
      }
      nonempty(message) {
        return this.min(1, message);
      }
    };
    __name(_ZodSet, "ZodSet");
    ZodSet = _ZodSet;
    ZodSet.create = (valueType, params) => {
      return new ZodSet({
        valueType,
        minSize: null,
        maxSize: null,
        typeName: ZodFirstPartyTypeKind.ZodSet,
        ...processCreateParams(params)
      });
    };
    _ZodFunction = class _ZodFunction extends ZodType {
      constructor() {
        super(...arguments);
        this.validate = this.implement;
      }
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.function) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.function,
            received: ctx.parsedType
          });
          return INVALID;
        }
        function makeArgsIssue(args, error) {
          return makeIssue({
            data: args,
            path: ctx.path,
            errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
            issueData: {
              code: ZodIssueCode.invalid_arguments,
              argumentsError: error
            }
          });
        }
        __name(makeArgsIssue, "makeArgsIssue");
        function makeReturnsIssue(returns, error) {
          return makeIssue({
            data: returns,
            path: ctx.path,
            errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
            issueData: {
              code: ZodIssueCode.invalid_return_type,
              returnTypeError: error
            }
          });
        }
        __name(makeReturnsIssue, "makeReturnsIssue");
        const params = { errorMap: ctx.common.contextualErrorMap };
        const fn = ctx.data;
        if (this._def.returns instanceof ZodPromise) {
          const me = this;
          return OK(async function(...args) {
            const error = new ZodError([]);
            const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
              error.addIssue(makeArgsIssue(args, e));
              throw error;
            });
            const result = await Reflect.apply(fn, this, parsedArgs);
            const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
              error.addIssue(makeReturnsIssue(result, e));
              throw error;
            });
            return parsedReturns;
          });
        } else {
          const me = this;
          return OK(function(...args) {
            const parsedArgs = me._def.args.safeParse(args, params);
            if (!parsedArgs.success) {
              throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
            }
            const result = Reflect.apply(fn, this, parsedArgs.data);
            const parsedReturns = me._def.returns.safeParse(result, params);
            if (!parsedReturns.success) {
              throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
            }
            return parsedReturns.data;
          });
        }
      }
      parameters() {
        return this._def.args;
      }
      returnType() {
        return this._def.returns;
      }
      args(...items) {
        return new _ZodFunction({
          ...this._def,
          args: ZodTuple.create(items).rest(ZodUnknown.create())
        });
      }
      returns(returnType) {
        return new _ZodFunction({
          ...this._def,
          returns: returnType
        });
      }
      implement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
      }
      strictImplement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
      }
      static create(args, returns, params) {
        return new _ZodFunction({
          args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
          returns: returns || ZodUnknown.create(),
          typeName: ZodFirstPartyTypeKind.ZodFunction,
          ...processCreateParams(params)
        });
      }
    };
    __name(_ZodFunction, "ZodFunction");
    ZodFunction = _ZodFunction;
    _ZodLazy = class _ZodLazy extends ZodType {
      get schema() {
        return this._def.getter();
      }
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const lazySchema = this._def.getter();
        return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
      }
    };
    __name(_ZodLazy, "ZodLazy");
    ZodLazy = _ZodLazy;
    ZodLazy.create = (getter, params) => {
      return new ZodLazy({
        getter,
        typeName: ZodFirstPartyTypeKind.ZodLazy,
        ...processCreateParams(params)
      });
    };
    _ZodLiteral = class _ZodLiteral extends ZodType {
      _parse(input) {
        if (input.data !== this._def.value) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            received: ctx.data,
            code: ZodIssueCode.invalid_literal,
            expected: this._def.value
          });
          return INVALID;
        }
        return { status: "valid", value: input.data };
      }
      get value() {
        return this._def.value;
      }
    };
    __name(_ZodLiteral, "ZodLiteral");
    ZodLiteral = _ZodLiteral;
    ZodLiteral.create = (value, params) => {
      return new ZodLiteral({
        value,
        typeName: ZodFirstPartyTypeKind.ZodLiteral,
        ...processCreateParams(params)
      });
    };
    __name(createZodEnum, "createZodEnum");
    _ZodEnum = class _ZodEnum extends ZodType {
      _parse(input) {
        if (typeof input.data !== "string") {
          const ctx = this._getOrReturnCtx(input);
          const expectedValues = this._def.values;
          addIssueToContext(ctx, {
            expected: util.joinValues(expectedValues),
            received: ctx.parsedType,
            code: ZodIssueCode.invalid_type
          });
          return INVALID;
        }
        if (!this._cache) {
          this._cache = new Set(this._def.values);
        }
        if (!this._cache.has(input.data)) {
          const ctx = this._getOrReturnCtx(input);
          const expectedValues = this._def.values;
          addIssueToContext(ctx, {
            received: ctx.data,
            code: ZodIssueCode.invalid_enum_value,
            options: expectedValues
          });
          return INVALID;
        }
        return OK(input.data);
      }
      get options() {
        return this._def.values;
      }
      get enum() {
        const enumValues = {};
        for (const val of this._def.values) {
          enumValues[val] = val;
        }
        return enumValues;
      }
      get Values() {
        const enumValues = {};
        for (const val of this._def.values) {
          enumValues[val] = val;
        }
        return enumValues;
      }
      get Enum() {
        const enumValues = {};
        for (const val of this._def.values) {
          enumValues[val] = val;
        }
        return enumValues;
      }
      extract(values, newDef = this._def) {
        return _ZodEnum.create(values, {
          ...this._def,
          ...newDef
        });
      }
      exclude(values, newDef = this._def) {
        return _ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
          ...this._def,
          ...newDef
        });
      }
    };
    __name(_ZodEnum, "ZodEnum");
    ZodEnum = _ZodEnum;
    ZodEnum.create = createZodEnum;
    _ZodNativeEnum = class _ZodNativeEnum extends ZodType {
      _parse(input) {
        const nativeEnumValues = util.getValidEnumValues(this._def.values);
        const ctx = this._getOrReturnCtx(input);
        if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
          const expectedValues = util.objectValues(nativeEnumValues);
          addIssueToContext(ctx, {
            expected: util.joinValues(expectedValues),
            received: ctx.parsedType,
            code: ZodIssueCode.invalid_type
          });
          return INVALID;
        }
        if (!this._cache) {
          this._cache = new Set(util.getValidEnumValues(this._def.values));
        }
        if (!this._cache.has(input.data)) {
          const expectedValues = util.objectValues(nativeEnumValues);
          addIssueToContext(ctx, {
            received: ctx.data,
            code: ZodIssueCode.invalid_enum_value,
            options: expectedValues
          });
          return INVALID;
        }
        return OK(input.data);
      }
      get enum() {
        return this._def.values;
      }
    };
    __name(_ZodNativeEnum, "ZodNativeEnum");
    ZodNativeEnum = _ZodNativeEnum;
    ZodNativeEnum.create = (values, params) => {
      return new ZodNativeEnum({
        values,
        typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
        ...processCreateParams(params)
      });
    };
    _ZodPromise = class _ZodPromise extends ZodType {
      unwrap() {
        return this._def.type;
      }
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.promise,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
        return OK(promisified.then((data) => {
          return this._def.type.parseAsync(data, {
            path: ctx.path,
            errorMap: ctx.common.contextualErrorMap
          });
        }));
      }
    };
    __name(_ZodPromise, "ZodPromise");
    ZodPromise = _ZodPromise;
    ZodPromise.create = (schema, params) => {
      return new ZodPromise({
        type: schema,
        typeName: ZodFirstPartyTypeKind.ZodPromise,
        ...processCreateParams(params)
      });
    };
    _ZodEffects = class _ZodEffects extends ZodType {
      innerType() {
        return this._def.schema;
      }
      sourceType() {
        return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
      }
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const effect = this._def.effect || null;
        const checkCtx = {
          addIssue: /* @__PURE__ */ __name((arg) => {
            addIssueToContext(ctx, arg);
            if (arg.fatal) {
              status.abort();
            } else {
              status.dirty();
            }
          }, "addIssue"),
          get path() {
            return ctx.path;
          }
        };
        checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
        if (effect.type === "preprocess") {
          const processed = effect.transform(ctx.data, checkCtx);
          if (ctx.common.async) {
            return Promise.resolve(processed).then(async (processed2) => {
              if (status.value === "aborted")
                return INVALID;
              const result = await this._def.schema._parseAsync({
                data: processed2,
                path: ctx.path,
                parent: ctx
              });
              if (result.status === "aborted")
                return INVALID;
              if (result.status === "dirty")
                return DIRTY(result.value);
              if (status.value === "dirty")
                return DIRTY(result.value);
              return result;
            });
          } else {
            if (status.value === "aborted")
              return INVALID;
            const result = this._def.schema._parseSync({
              data: processed,
              path: ctx.path,
              parent: ctx
            });
            if (result.status === "aborted")
              return INVALID;
            if (result.status === "dirty")
              return DIRTY(result.value);
            if (status.value === "dirty")
              return DIRTY(result.value);
            return result;
          }
        }
        if (effect.type === "refinement") {
          const executeRefinement = /* @__PURE__ */ __name((acc) => {
            const result = effect.refinement(acc, checkCtx);
            if (ctx.common.async) {
              return Promise.resolve(result);
            }
            if (result instanceof Promise) {
              throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
            }
            return acc;
          }, "executeRefinement");
          if (ctx.common.async === false) {
            const inner = this._def.schema._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (inner.status === "aborted")
              return INVALID;
            if (inner.status === "dirty")
              status.dirty();
            executeRefinement(inner.value);
            return { status: status.value, value: inner.value };
          } else {
            return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
              if (inner.status === "aborted")
                return INVALID;
              if (inner.status === "dirty")
                status.dirty();
              return executeRefinement(inner.value).then(() => {
                return { status: status.value, value: inner.value };
              });
            });
          }
        }
        if (effect.type === "transform") {
          if (ctx.common.async === false) {
            const base = this._def.schema._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (!isValid(base))
              return INVALID;
            const result = effect.transform(base.value, checkCtx);
            if (result instanceof Promise) {
              throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
            }
            return { status: status.value, value: result };
          } else {
            return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
              if (!isValid(base))
                return INVALID;
              return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
                status: status.value,
                value: result
              }));
            });
          }
        }
        util.assertNever(effect);
      }
    };
    __name(_ZodEffects, "ZodEffects");
    ZodEffects = _ZodEffects;
    ZodEffects.create = (schema, effect, params) => {
      return new ZodEffects({
        schema,
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        effect,
        ...processCreateParams(params)
      });
    };
    ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
      return new ZodEffects({
        schema,
        effect: { type: "preprocess", transform: preprocess },
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        ...processCreateParams(params)
      });
    };
    _ZodOptional = class _ZodOptional extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === ZodParsedType.undefined) {
          return OK(void 0);
        }
        return this._def.innerType._parse(input);
      }
      unwrap() {
        return this._def.innerType;
      }
    };
    __name(_ZodOptional, "ZodOptional");
    ZodOptional = _ZodOptional;
    ZodOptional.create = (type, params) => {
      return new ZodOptional({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodOptional,
        ...processCreateParams(params)
      });
    };
    _ZodNullable = class _ZodNullable extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === ZodParsedType.null) {
          return OK(null);
        }
        return this._def.innerType._parse(input);
      }
      unwrap() {
        return this._def.innerType;
      }
    };
    __name(_ZodNullable, "ZodNullable");
    ZodNullable = _ZodNullable;
    ZodNullable.create = (type, params) => {
      return new ZodNullable({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodNullable,
        ...processCreateParams(params)
      });
    };
    _ZodDefault = class _ZodDefault extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        let data = ctx.data;
        if (ctx.parsedType === ZodParsedType.undefined) {
          data = this._def.defaultValue();
        }
        return this._def.innerType._parse({
          data,
          path: ctx.path,
          parent: ctx
        });
      }
      removeDefault() {
        return this._def.innerType;
      }
    };
    __name(_ZodDefault, "ZodDefault");
    ZodDefault = _ZodDefault;
    ZodDefault.create = (type, params) => {
      return new ZodDefault({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodDefault,
        defaultValue: typeof params.default === "function" ? params.default : () => params.default,
        ...processCreateParams(params)
      });
    };
    _ZodCatch = class _ZodCatch extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const newCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          }
        };
        const result = this._def.innerType._parse({
          data: newCtx.data,
          path: newCtx.path,
          parent: {
            ...newCtx
          }
        });
        if (isAsync(result)) {
          return result.then((result2) => {
            return {
              status: "valid",
              value: result2.status === "valid" ? result2.value : this._def.catchValue({
                get error() {
                  return new ZodError(newCtx.common.issues);
                },
                input: newCtx.data
              })
            };
          });
        } else {
          return {
            status: "valid",
            value: result.status === "valid" ? result.value : this._def.catchValue({
              get error() {
                return new ZodError(newCtx.common.issues);
              },
              input: newCtx.data
            })
          };
        }
      }
      removeCatch() {
        return this._def.innerType;
      }
    };
    __name(_ZodCatch, "ZodCatch");
    ZodCatch = _ZodCatch;
    ZodCatch.create = (type, params) => {
      return new ZodCatch({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodCatch,
        catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
        ...processCreateParams(params)
      });
    };
    _ZodNaN = class _ZodNaN extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.nan) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.nan,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return { status: "valid", value: input.data };
      }
    };
    __name(_ZodNaN, "ZodNaN");
    ZodNaN = _ZodNaN;
    ZodNaN.create = (params) => {
      return new ZodNaN({
        typeName: ZodFirstPartyTypeKind.ZodNaN,
        ...processCreateParams(params)
      });
    };
    BRAND = Symbol("zod_brand");
    _ZodBranded = class _ZodBranded extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const data = ctx.data;
        return this._def.type._parse({
          data,
          path: ctx.path,
          parent: ctx
        });
      }
      unwrap() {
        return this._def.type;
      }
    };
    __name(_ZodBranded, "ZodBranded");
    ZodBranded = _ZodBranded;
    _ZodPipeline = class _ZodPipeline extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.common.async) {
          const handleAsync = /* @__PURE__ */ __name(async () => {
            const inResult = await this._def.in._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (inResult.status === "aborted")
              return INVALID;
            if (inResult.status === "dirty") {
              status.dirty();
              return DIRTY(inResult.value);
            } else {
              return this._def.out._parseAsync({
                data: inResult.value,
                path: ctx.path,
                parent: ctx
              });
            }
          }, "handleAsync");
          return handleAsync();
        } else {
          const inResult = this._def.in._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
          if (inResult.status === "aborted")
            return INVALID;
          if (inResult.status === "dirty") {
            status.dirty();
            return {
              status: "dirty",
              value: inResult.value
            };
          } else {
            return this._def.out._parseSync({
              data: inResult.value,
              path: ctx.path,
              parent: ctx
            });
          }
        }
      }
      static create(a, b) {
        return new _ZodPipeline({
          in: a,
          out: b,
          typeName: ZodFirstPartyTypeKind.ZodPipeline
        });
      }
    };
    __name(_ZodPipeline, "ZodPipeline");
    ZodPipeline = _ZodPipeline;
    _ZodReadonly = class _ZodReadonly extends ZodType {
      _parse(input) {
        const result = this._def.innerType._parse(input);
        const freeze = /* @__PURE__ */ __name((data) => {
          if (isValid(data)) {
            data.value = Object.freeze(data.value);
          }
          return data;
        }, "freeze");
        return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
      }
      unwrap() {
        return this._def.innerType;
      }
    };
    __name(_ZodReadonly, "ZodReadonly");
    ZodReadonly = _ZodReadonly;
    ZodReadonly.create = (type, params) => {
      return new ZodReadonly({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodReadonly,
        ...processCreateParams(params)
      });
    };
    __name(cleanParams, "cleanParams");
    __name(custom, "custom");
    late = {
      object: ZodObject.lazycreate
    };
    (function(ZodFirstPartyTypeKind2) {
      ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
      ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
      ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
      ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
      ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
      ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
      ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
      ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
      ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
      ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
      ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
      ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
      ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
      ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
      ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
      ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
      ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
      ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
      ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
      ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
      ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
      ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
      ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
      ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
      ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
      ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
      ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
      ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
      ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
      ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
      ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
      ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
      ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
      ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
      ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
      ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
    })(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
    instanceOfType = /* @__PURE__ */ __name((cls, params = {
      message: `Input not instance of ${cls.name}`
    }) => custom((data) => data instanceof cls, params), "instanceOfType");
    stringType = ZodString.create;
    numberType = ZodNumber.create;
    nanType = ZodNaN.create;
    bigIntType = ZodBigInt.create;
    booleanType = ZodBoolean.create;
    dateType = ZodDate.create;
    symbolType = ZodSymbol.create;
    undefinedType = ZodUndefined.create;
    nullType = ZodNull.create;
    anyType = ZodAny.create;
    unknownType = ZodUnknown.create;
    neverType = ZodNever.create;
    voidType = ZodVoid.create;
    arrayType = ZodArray.create;
    objectType = ZodObject.create;
    strictObjectType = ZodObject.strictCreate;
    unionType = ZodUnion.create;
    discriminatedUnionType = ZodDiscriminatedUnion.create;
    intersectionType = ZodIntersection.create;
    tupleType = ZodTuple.create;
    recordType = ZodRecord.create;
    mapType = ZodMap.create;
    setType = ZodSet.create;
    functionType = ZodFunction.create;
    lazyType = ZodLazy.create;
    literalType = ZodLiteral.create;
    enumType = ZodEnum.create;
    nativeEnumType = ZodNativeEnum.create;
    promiseType = ZodPromise.create;
    effectsType = ZodEffects.create;
    optionalType = ZodOptional.create;
    nullableType = ZodNullable.create;
    preprocessType = ZodEffects.createWithPreprocess;
    pipelineType = ZodPipeline.create;
    ostring = /* @__PURE__ */ __name(() => stringType().optional(), "ostring");
    onumber = /* @__PURE__ */ __name(() => numberType().optional(), "onumber");
    oboolean = /* @__PURE__ */ __name(() => booleanType().optional(), "oboolean");
    coerce = {
      string: /* @__PURE__ */ __name((arg) => ZodString.create({ ...arg, coerce: true }), "string"),
      number: /* @__PURE__ */ __name((arg) => ZodNumber.create({ ...arg, coerce: true }), "number"),
      boolean: /* @__PURE__ */ __name((arg) => ZodBoolean.create({
        ...arg,
        coerce: true
      }), "boolean"),
      bigint: /* @__PURE__ */ __name((arg) => ZodBigInt.create({ ...arg, coerce: true }), "bigint"),
      date: /* @__PURE__ */ __name((arg) => ZodDate.create({ ...arg, coerce: true }), "date")
    };
    NEVER = INVALID;
  }
});

// node_modules/zod/v3/external.js
var external_exports = {};
__export(external_exports, {
  BRAND: () => BRAND,
  DIRTY: () => DIRTY,
  EMPTY_PATH: () => EMPTY_PATH,
  INVALID: () => INVALID,
  NEVER: () => NEVER,
  OK: () => OK,
  ParseStatus: () => ParseStatus,
  Schema: () => ZodType,
  ZodAny: () => ZodAny,
  ZodArray: () => ZodArray,
  ZodBigInt: () => ZodBigInt,
  ZodBoolean: () => ZodBoolean,
  ZodBranded: () => ZodBranded,
  ZodCatch: () => ZodCatch,
  ZodDate: () => ZodDate,
  ZodDefault: () => ZodDefault,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodEffects: () => ZodEffects,
  ZodEnum: () => ZodEnum,
  ZodError: () => ZodError,
  ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
  ZodFunction: () => ZodFunction,
  ZodIntersection: () => ZodIntersection,
  ZodIssueCode: () => ZodIssueCode,
  ZodLazy: () => ZodLazy,
  ZodLiteral: () => ZodLiteral,
  ZodMap: () => ZodMap,
  ZodNaN: () => ZodNaN,
  ZodNativeEnum: () => ZodNativeEnum,
  ZodNever: () => ZodNever,
  ZodNull: () => ZodNull,
  ZodNullable: () => ZodNullable,
  ZodNumber: () => ZodNumber,
  ZodObject: () => ZodObject,
  ZodOptional: () => ZodOptional,
  ZodParsedType: () => ZodParsedType,
  ZodPipeline: () => ZodPipeline,
  ZodPromise: () => ZodPromise,
  ZodReadonly: () => ZodReadonly,
  ZodRecord: () => ZodRecord,
  ZodSchema: () => ZodType,
  ZodSet: () => ZodSet,
  ZodString: () => ZodString,
  ZodSymbol: () => ZodSymbol,
  ZodTransformer: () => ZodEffects,
  ZodTuple: () => ZodTuple,
  ZodType: () => ZodType,
  ZodUndefined: () => ZodUndefined,
  ZodUnion: () => ZodUnion,
  ZodUnknown: () => ZodUnknown,
  ZodVoid: () => ZodVoid,
  addIssueToContext: () => addIssueToContext,
  any: () => anyType,
  array: () => arrayType,
  bigint: () => bigIntType,
  boolean: () => booleanType,
  coerce: () => coerce,
  custom: () => custom,
  date: () => dateType,
  datetimeRegex: () => datetimeRegex,
  defaultErrorMap: () => en_default,
  discriminatedUnion: () => discriminatedUnionType,
  effect: () => effectsType,
  enum: () => enumType,
  function: () => functionType,
  getErrorMap: () => getErrorMap,
  getParsedType: () => getParsedType,
  instanceof: () => instanceOfType,
  intersection: () => intersectionType,
  isAborted: () => isAborted,
  isAsync: () => isAsync,
  isDirty: () => isDirty,
  isValid: () => isValid,
  late: () => late,
  lazy: () => lazyType,
  literal: () => literalType,
  makeIssue: () => makeIssue,
  map: () => mapType,
  nan: () => nanType,
  nativeEnum: () => nativeEnumType,
  never: () => neverType,
  null: () => nullType,
  nullable: () => nullableType,
  number: () => numberType,
  object: () => objectType,
  objectUtil: () => objectUtil,
  oboolean: () => oboolean,
  onumber: () => onumber,
  optional: () => optionalType,
  ostring: () => ostring,
  pipeline: () => pipelineType,
  preprocess: () => preprocessType,
  promise: () => promiseType,
  quotelessJson: () => quotelessJson,
  record: () => recordType,
  set: () => setType,
  setErrorMap: () => setErrorMap,
  strictObject: () => strictObjectType,
  string: () => stringType,
  symbol: () => symbolType,
  transformer: () => effectsType,
  tuple: () => tupleType,
  undefined: () => undefinedType,
  union: () => unionType,
  unknown: () => unknownType,
  util: () => util,
  void: () => voidType
});
var init_external = __esm({
  "node_modules/zod/v3/external.js"() {
    init_errors();
    init_parseUtil();
    init_typeAliases();
    init_util();
    init_types3();
    init_ZodError();
  }
});

// node_modules/zod/index.js
var init_zod = __esm({
  "node_modules/zod/index.js"() {
    init_external();
    init_external();
  }
});

// src/modules/mcp/helpers/zod-tool.helper.ts
function zodToJsonSchema(zodSchema) {
  const properties = {};
  const required = [];
  for (const [key, zodType] of Object.entries(zodSchema)) {
    const { schema, isRequired } = convertZodType(zodType);
    properties[key] = schema;
    if (isRequired) {
      required.push(key);
    }
  }
  return {
    type: "object",
    properties,
    ...required.length > 0 ? { required } : {}
  };
}
function convertZodType(zodType) {
  let isRequired = true;
  let currentType = zodType;
  let defaultValue = void 0;
  while (true) {
    if (currentType instanceof ZodOptional) {
      isRequired = false;
      currentType = currentType.unwrap();
    } else if (currentType instanceof ZodDefault) {
      isRequired = false;
      defaultValue = currentType._def.defaultValue();
      currentType = currentType._def.innerType;
    } else if (currentType instanceof ZodNullable) {
      isRequired = false;
      currentType = currentType.unwrap();
    } else {
      break;
    }
  }
  const description = currentType.description;
  let schema;
  if (currentType instanceof ZodEnum) {
    schema = {
      type: "string",
      enum: currentType._def.values,
      ...description ? { description } : {}
    };
  } else if (currentType instanceof ZodArray) {
    const itemSchema = convertZodType(currentType._def.type);
    schema = {
      type: "array",
      items: itemSchema.schema,
      ...description ? { description } : {}
    };
  } else if (currentType instanceof ZodObject) {
    const nestedSchema = zodToJsonSchema(currentType.shape);
    schema = {
      type: "object",
      properties: nestedSchema.properties,
      ...nestedSchema.required ? { required: nestedSchema.required } : {},
      ...description ? { description } : {}
    };
  } else if (currentType instanceof ZodNumber) {
    schema = {
      type: "number",
      ...description ? { description } : {}
    };
    const checks = currentType._def.checks || [];
    for (const check of checks) {
      if (check.kind === "min") {
        schema.minimum = check.value;
      } else if (check.kind === "max") {
        schema.maximum = check.value;
      }
    }
  } else if (currentType instanceof ZodString) {
    schema = {
      type: "string",
      ...description ? { description } : {}
    };
  } else if (currentType instanceof ZodBoolean) {
    schema = {
      type: "boolean",
      ...description ? { description } : {}
    };
  } else {
    schema = {
      type: "string",
      ...description ? { description } : {}
    };
  }
  if (defaultValue !== void 0) {
    schema.default = defaultValue;
  }
  return { schema, isRequired };
}
var init_zod_tool_helper = __esm({
  "src/modules/mcp/helpers/zod-tool.helper.ts"() {
    init_zod();
    __name(zodToJsonSchema, "zodToJsonSchema");
    __name(convertZodType, "convertZodType");
  }
});

// src/modules/mcp/tools/memory-tools.schemas.ts
var VALID_MEMORY_TYPES, StoreMemoryInput, StoreMemoryOutput, MemorySearchInput, MemorySearchOutput, MemoryQueryInput, MemoryQueryOutput, MemoryStatsInput, MemoryStatsOutput, MemoryDeleteInput, MemoryDeleteOutput, MemoryTagsInput, MemoryTagsOutput, MemoryExportInput, MemoryExportOutput, MemoryImportInput, MemoryImportOutput;
var init_memory_tools_schemas = __esm({
  "src/modules/mcp/tools/memory-tools.schemas.ts"() {
    init_zod();
    VALID_MEMORY_TYPES = ["knowledge", "task", "conversation", "document", "code", "decision", "error", "context", "reflection"];
    StoreMemoryInput = {
      content: external_exports.string().describe("The content to store"),
      memory_type: external_exports.enum(VALID_MEMORY_TYPES).optional().describe("Type of memory"),
      path: external_exports.string().optional().describe("File path associated with this memory"),
      tags: external_exports.array(external_exports.string()).optional().describe("Tags for categorization"),
      metadata: external_exports.object({
        project: external_exports.string().optional(),
        importance: external_exports.enum(["low", "medium", "high", "critical"]).optional()
      }).optional().describe("Optional metadata")
    };
    StoreMemoryOutput = {
      success: external_exports.boolean(),
      id: external_exports.string().optional(),
      tags: external_exports.array(external_exports.string()).optional(),
      hint: external_exports.string().optional()
    };
    MemorySearchInput = {
      query: external_exports.string().describe("Search query"),
      limit: external_exports.number().min(1).max(100).optional().describe("Maximum results per page"),
      offset: external_exports.number().min(0).optional().describe("Number of results to skip"),
      continuationToken: external_exports.string().optional().describe("Token for fetching next page"),
      maxTokens: external_exports.number().min(1e3).max(15e3).optional().describe("Maximum tokens in response"),
      memory_type: external_exports.enum(VALID_MEMORY_TYPES).optional().describe("Filter by memory type"),
      tags: external_exports.array(external_exports.string()).optional().describe("Filter by tags"),
      project: external_exports.string().optional().describe("Filter by project name")
    };
    MemorySearchOutput = {
      success: external_exports.boolean(),
      data: external_exports.array(external_exports.any()).optional(),
      count: external_exports.number().optional(),
      pagination: external_exports.any().optional(),
      hint: external_exports.string().optional()
    };
    MemoryQueryInput = {
      filters: external_exports.object({
        memory_type: external_exports.enum(VALID_MEMORY_TYPES).optional().describe("Filter by memory type"),
        project: external_exports.string().optional(),
        tags: external_exports.array(external_exports.string()).optional()
      }).optional().describe("Query filters"),
      limit: external_exports.number().min(1).max(100).optional().describe("Maximum results per page"),
      offset: external_exports.number().min(0).optional().describe("Number of results to skip"),
      continuationToken: external_exports.string().optional().describe("Token for fetching next page"),
      maxTokens: external_exports.number().min(1e3).max(15e3).optional().describe("Maximum tokens in response")
    };
    MemoryQueryOutput = {
      success: external_exports.boolean(),
      data: external_exports.array(external_exports.any()).optional(),
      count: external_exports.number().optional(),
      pagination: external_exports.any().optional(),
      hint: external_exports.string().optional()
    };
    MemoryStatsInput = {};
    MemoryStatsOutput = {
      success: external_exports.boolean(),
      totalMemories: external_exports.number().optional(),
      byType: external_exports.record(external_exports.number()).optional(),
      hint: external_exports.string().optional()
    };
    MemoryDeleteInput = {
      id: external_exports.string().describe("Memory ID to delete")
    };
    MemoryDeleteOutput = {
      success: external_exports.boolean(),
      deleted: external_exports.boolean().optional(),
      hint: external_exports.string().optional()
    };
    MemoryTagsInput = {
      limit: external_exports.number().min(1).max(100).optional().describe("Max tags to return")
    };
    MemoryTagsOutput = {
      success: external_exports.boolean(),
      tags: external_exports.array(external_exports.object({
        tag: external_exports.string(),
        count: external_exports.number()
      })).optional(),
      total: external_exports.number().optional(),
      hint: external_exports.string().optional()
    };
    MemoryExportInput = {
      format: external_exports.enum(["json", "markdown"]).optional().describe("Export format"),
      filters: external_exports.object({
        memory_type: external_exports.string().optional(),
        tags: external_exports.array(external_exports.string()).optional(),
        path: external_exports.string().optional()
      }).optional().describe("Filter memories to export"),
      limit: external_exports.number().min(1).max(500).optional().describe("Max memories to export")
    };
    MemoryExportOutput = {
      success: external_exports.boolean(),
      format: external_exports.string().optional(),
      count: external_exports.number().optional(),
      data: external_exports.any().optional()
    };
    MemoryImportInput = {
      memories: external_exports.array(external_exports.object({
        content: external_exports.string().describe("Memory content (required)"),
        memory_type: external_exports.string().optional(),
        path: external_exports.string().optional(),
        tags: external_exports.array(external_exports.string()).optional()
      })).describe("Array of memories to import")
    };
    MemoryImportOutput = {
      success: external_exports.boolean(),
      imported: external_exports.number().optional(),
      failed: external_exports.number().optional(),
      errors: external_exports.array(external_exports.string()).optional(),
      hint: external_exports.string().optional()
    };
  }
});

// src/modules/mcp/tools/MemoryTools.ts
var MemoryTools_exports = {};
__export(MemoryTools_exports, {
  MemoryTools: () => MemoryTools
});
var _MemoryTools, MemoryTools;
var init_MemoryTools = __esm({
  "src/modules/mcp/tools/MemoryTools.ts"() {
    init_types2();
    init_paginated_memory_handler();
    init_SmartResponseHelper();
    init_zod_tool_helper();
    init_memory_tools_schemas();
    _MemoryTools = class _MemoryTools {
      memoryService;
      // Will be injected
      repository;
      // Repository for direct access to stats
      multiProjectService;
      // Optional multi-project service
      paginatedHandler;
      constructor(memoryService, repository, multiProjectService) {
        this.memoryService = memoryService;
        this.repository = repository;
        this.multiProjectService = multiProjectService;
        this.paginatedHandler = new PaginatedMemoryHandler(memoryService);
      }
      /**
       * Check if multi-project mode is active
       */
      isMultiProjectMode() {
        var _a, _b;
        return ((_b = (_a = this.multiProjectService) == null ? void 0 : _a.isMultiMode) == null ? void 0 : _b.call(_a)) ?? false;
      }
      /**
       * Get all memory tools
       */
      getTools() {
        return [
          this.createStoreTool(),
          this.createSearchTool(),
          this.createQueryTool(),
          this.createStatsTool(),
          this.createDeleteTool(),
          this.createGetTagsTool(),
          this.createExportTool(),
          this.createImportTool()
        ];
      }
      createStoreTool() {
        return {
          name: "store_memory",
          title: "Store Memory",
          description: "Store a memory entry with optional metadata",
          category: "memory" /* MEMORY */,
          inputSchema: zodToJsonSchema(StoreMemoryInput),
          outputSchema: StoreMemoryOutput,
          handler: /* @__PURE__ */ __name(async (params) => this.handleStore(params), "handler")
        };
      }
      createSearchTool() {
        return {
          name: "memory_search",
          title: "Search Memories",
          description: "Search memories using semantic search with automatic pagination for large results",
          category: "search" /* SEARCH */,
          inputSchema: zodToJsonSchema(MemorySearchInput),
          outputSchema: MemorySearchOutput,
          handler: /* @__PURE__ */ __name(async (params) => this.handleSearch(params), "handler")
        };
      }
      createQueryTool() {
        return {
          name: "memory_query",
          title: "Query Memories",
          description: "Query memories with filters and automatic pagination for large results",
          category: "memory" /* MEMORY */,
          inputSchema: zodToJsonSchema(MemoryQueryInput),
          outputSchema: MemoryQueryOutput,
          handler: /* @__PURE__ */ __name(async (params) => this.handleQuery(params), "handler")
        };
      }
      createStatsTool() {
        return {
          name: "memory_stats",
          title: "Memory Statistics",
          description: "Get memory statistics",
          category: "analysis" /* ANALYSIS */,
          inputSchema: zodToJsonSchema(MemoryStatsInput),
          outputSchema: MemoryStatsOutput,
          handler: /* @__PURE__ */ __name(async () => this.handleStats(), "handler")
        };
      }
      createDeleteTool() {
        return {
          name: "memory_delete",
          title: "Delete Memory",
          description: "Delete a memory by ID",
          category: "memory" /* MEMORY */,
          inputSchema: zodToJsonSchema(MemoryDeleteInput),
          outputSchema: MemoryDeleteOutput,
          handler: /* @__PURE__ */ __name(async (params) => this.handleDelete(params), "handler")
        };
      }
      createGetTagsTool() {
        return {
          name: "memory_tags",
          title: "Get Tags",
          description: "Get all tags with usage counts",
          category: "memory" /* MEMORY */,
          inputSchema: zodToJsonSchema(MemoryTagsInput),
          outputSchema: MemoryTagsOutput,
          handler: /* @__PURE__ */ __name(async (params) => this.handleGetTags(params), "handler")
        };
      }
      createExportTool() {
        return {
          name: "memory_export",
          title: "Export Memories",
          description: "Export memories as JSON or markdown",
          category: "memory" /* MEMORY */,
          inputSchema: zodToJsonSchema(MemoryExportInput),
          outputSchema: MemoryExportOutput,
          handler: /* @__PURE__ */ __name(async (params) => this.handleExport(params), "handler")
        };
      }
      createImportTool() {
        return {
          name: "memory_import",
          title: "Import Memories",
          description: "Bulk import memories from JSON array",
          category: "memory" /* MEMORY */,
          inputSchema: zodToJsonSchema(MemoryImportInput),
          outputSchema: MemoryImportOutput,
          handler: /* @__PURE__ */ __name(async (params) => this.handleImport(params), "handler")
        };
      }
      /**
       * Generate auto-tags based on path and content patterns
       */
      generateAutoTags(path7, content, memoryType) {
        const autoTags = /* @__PURE__ */ new Set();
        if (memoryType) {
          autoTags.add(memoryType);
        }
        if (path7) {
          const pathLower = path7.toLowerCase();
          if (pathLower.endsWith(".ts") || pathLower.endsWith(".tsx")) autoTags.add("typescript");
          if (pathLower.endsWith(".js") || pathLower.endsWith(".jsx")) autoTags.add("javascript");
          if (pathLower.endsWith(".py")) autoTags.add("python");
          if (pathLower.endsWith(".go")) autoTags.add("golang");
          if (pathLower.endsWith(".rs")) autoTags.add("rust");
          if (pathLower.endsWith(".css") || pathLower.endsWith(".scss")) autoTags.add("styles");
          if (pathLower.endsWith(".json") || pathLower.endsWith(".yaml") || pathLower.endsWith(".yml")) autoTags.add("config");
          if (pathLower.endsWith(".md")) autoTags.add("documentation");
          if (pathLower.endsWith(".test.ts") || pathLower.endsWith(".spec.ts") || pathLower.includes("__tests__")) autoTags.add("testing");
          if (pathLower.includes("/auth/") || pathLower.includes("/authentication/")) autoTags.add("auth");
          if (pathLower.includes("/api/") || pathLower.includes("/routes/")) autoTags.add("api");
          if (pathLower.includes("/components/") || pathLower.includes("/ui/")) autoTags.add("ui");
          if (pathLower.includes("/utils/") || pathLower.includes("/helpers/")) autoTags.add("utilities");
          if (pathLower.includes("/services/")) autoTags.add("services");
          if (pathLower.includes("/models/") || pathLower.includes("/entities/")) autoTags.add("data-models");
          if (pathLower.includes("/hooks/")) autoTags.add("hooks");
          if (pathLower.includes("/middleware/")) autoTags.add("middleware");
          if (pathLower.includes("/database/") || pathLower.includes("/db/")) autoTags.add("database");
        }
        const contentLower = content.toLowerCase();
        if (contentLower.includes("error") || contentLower.includes("bug") || contentLower.includes("fix")) autoTags.add("bug-fix");
        if (contentLower.includes("todo") || contentLower.includes("implement")) autoTags.add("todo");
        if (contentLower.includes("refactor")) autoTags.add("refactor");
        if (contentLower.includes("performance") || contentLower.includes("optimize")) autoTags.add("performance");
        if (contentLower.includes("security") || contentLower.includes("vulnerability")) autoTags.add("security");
        if (contentLower.includes("deprecated")) autoTags.add("deprecated");
        if (contentLower.includes("breaking change")) autoTags.add("breaking-change");
        return Array.from(autoTags);
      }
      // Handler implementations
      async handleStore(params) {
        var _a, _b, _c, _d;
        try {
          if (!params.content || typeof params.content === "string" && params.content.trim() === "") {
            return this.errorResponse("Content is required and cannot be empty");
          }
          const path7 = params.path || ((_a = params.metadata) == null ? void 0 : _a.path);
          const memoryType = params.memory_type || "knowledge";
          const autoTags = this.generateAutoTags(path7, params.content, memoryType);
          const userTags = params.tags || ((_b = params.metadata) == null ? void 0 : _b.tags) || [];
          const normalizeTag = /* @__PURE__ */ __name((tag) => tag.toLowerCase().trim(), "normalizeTag");
          const allTagsNormalized = /* @__PURE__ */ new Map();
          userTags.forEach((tag) => {
            if (typeof tag === "string" && tag.trim()) {
              allTagsNormalized.set(normalizeTag(tag), tag.trim());
            }
          });
          autoTags.forEach((tag) => {
            const normalized = normalizeTag(tag);
            if (!allTagsNormalized.has(normalized)) {
              allTagsNormalized.set(normalized, tag);
            }
          });
          const allTags = Array.from(allTagsNormalized.values());
          const { existingMemories, compactionPerformed, compactedCount } = await this.getPathContextAndCompact(
            path7,
            memoryType,
            params.metadata
          );
          let allPathMemories = [];
          if (path7 && this.memoryService.query) {
            try {
              const allMemories = await this.memoryService.query({});
              allPathMemories = allMemories.filter((m) => m.path === path7);
            } catch (e) {
              process.stderr.write(`[MemoryTools] Failed to query path memories: ${e}
`);
            }
          }
          const memoryInput = {
            content: params.content,
            memoryType,
            path: path7,
            tags: allTags,
            metadata: {
              ...params.metadata,
              tags: allTags,
              path: path7
            }
          };
          const result = await this.memoryService.store(memoryInput);
          const smartResponse = SmartResponseHelper.enhanceStoreResponse({
            id: result.id,
            content: params.content,
            memoryType,
            path: path7,
            tags: allTags,
            userTags,
            autoTags,
            hasDuplicates: ((_c = result.duplicates) == null ? void 0 : _c.length) > 0,
            duplicateCount: (_d = result.duplicates) == null ? void 0 : _d.length,
            existingPathMemories: allPathMemories.length > 0 ? allPathMemories : void 0,
            compactionPerformed,
            compactedCount
          });
          return {
            content: [{
              type: "text",
              text: SmartResponseHelper.formatForMCP(smartResponse)
            }]
          };
        } catch (error) {
          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : "Store failed"
              })
            }],
            isError: true
          };
        }
      }
      async handleSearch(params) {
        var _a, _b, _c, _d;
        try {
          if (!params.query || typeof params.query === "string" && params.query.trim() === "") {
            return this.errorResponse("Query is required and cannot be empty");
          }
          if (params.limit !== void 0) {
            if (params.limit < 1 || !Number.isInteger(params.limit)) {
              return this.errorResponse("Limit must be a positive integer");
            }
            if (params.limit > 100) {
              return this.errorResponse("Limit cannot exceed 100");
            }
          }
          if (params.offset !== void 0) {
            if (params.offset < 0 || !Number.isInteger(params.offset)) {
              return this.errorResponse("Offset must be a non-negative integer");
            }
            if (params.offset > 1e4) {
              return this.errorResponse("Offset cannot exceed 10000");
            }
          }
          const validMemoryTypes = ["knowledge", "task", "conversation", "document", "code", "decision", "error", "context", "reflection"];
          if (params.memory_type && !validMemoryTypes.includes(params.memory_type)) {
            return this.errorResponse(`Invalid memory_type: "${params.memory_type}". Valid types: ${validMemoryTypes.join(", ")}`);
          }
          const sanitizedQuery = params.query.trim();
          if (this.isMultiProjectMode()) {
            const multiResult = await this.multiProjectService.search(sanitizedQuery, {
              limit: params.limit || 10,
              memory_type: params.memory_type,
              tags: params.tags,
              project: params.project
            });
            let filteredResults = multiResult.results;
            let projectWarning = "";
            if (params.project) {
              const projectLower = params.project.toLowerCase();
              filteredResults = multiResult.results.filter(
                (r) => {
                  var _a2, _b2;
                  return ((_a2 = r.source) == null ? void 0 : _a2.toLowerCase()) === projectLower || ((_b2 = r.projectPath) == null ? void 0 : _b2.toLowerCase().includes(projectLower));
                }
              );
              const projectNames = ((_b = (_a = this.multiProjectService).getProjectNames) == null ? void 0 : _b.call(_a)) || multiResult.sources;
              const matchedProject = projectNames.find((p) => p.toLowerCase() === projectLower);
              if (!matchedProject) {
                projectWarning = ` Warning: Project "${params.project}" not found. Available: [${projectNames.join(", ")}].`;
              }
            }
            if (params.tags && params.tags.length > 0 && Array.isArray(filteredResults)) {
              filteredResults = filteredResults.filter((memory) => {
                var _a2;
                const memoryTags = memory.tags || ((_a2 = memory.metadata) == null ? void 0 : _a2.tags) || [];
                return params.tags.some((tag) => memoryTags.includes(tag));
              });
            }
            const tagHint2 = ((_c = params.tags) == null ? void 0 : _c.length) > 0 ? `Filtered by tags: [${params.tags.join(", ")}]` : 'Tip: Use tags filter to narrow results (e.g., tags: ["auth", "bug-fix"])';
            const projectHint = params.project ? `Filtered to project: ${params.project}${projectWarning}` : `Searched across ${multiResult.sources.length} projects: [${multiResult.sources.join(", ")}]`;
            return {
              content: [{
                type: "text",
                text: JSON.stringify({
                  success: true,
                  data: filteredResults,
                  count: filteredResults.length,
                  sources: multiResult.sources,
                  isMultiProject: true,
                  hint: `${projectHint}. ${tagHint2}`
                })
              }]
            };
          }
          const result = await this.paginatedHandler.handle({
            action: "search",
            query: sanitizedQuery,
            filters: {
              memory_type: params.memory_type,
              tags: params.tags
            },
            limit: params.limit || 10,
            offset: params.offset || 0,
            continuationToken: params.continuationToken,
            maxTokens: params.maxTokens
          });
          let filteredData = result.data || result;
          if (params.tags && params.tags.length > 0 && Array.isArray(filteredData)) {
            filteredData = filteredData.filter((memory) => {
              var _a2;
              const memoryTags = memory.tags || ((_a2 = memory.metadata) == null ? void 0 : _a2.tags) || [];
              return params.tags.some((tag) => memoryTags.includes(tag));
            });
          }
          const tagHint = ((_d = params.tags) == null ? void 0 : _d.length) > 0 ? `Filtered by tags: [${params.tags.join(", ")}]` : 'Tip: Use tags filter to narrow results (e.g., tags: ["auth", "bug-fix"])';
          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                success: true,
                data: filteredData,
                count: Array.isArray(filteredData) ? filteredData.length : 1,
                pagination: result.pagination,
                hint: tagHint
              })
            }]
          };
        } catch (error) {
          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : "Search failed"
              })
            }],
            isError: true
          };
        }
      }
      async handleQuery(params) {
        var _a, _b, _c, _d;
        try {
          if (params.limit !== void 0) {
            if (params.limit < 1 || !Number.isInteger(params.limit)) {
              return this.errorResponse("Limit must be a positive integer");
            }
            if (params.limit > 100) {
              return this.errorResponse("Limit cannot exceed 100");
            }
          }
          if (params.offset !== void 0) {
            if (params.offset < 0 || !Number.isInteger(params.offset)) {
              return this.errorResponse("Offset must be a non-negative integer");
            }
            if (params.offset > 1e4) {
              return this.errorResponse("Offset cannot exceed 10000");
            }
          }
          const validMemoryTypes = ["knowledge", "task", "conversation", "document", "code", "decision", "error", "context", "reflection"];
          if (((_a = params.filters) == null ? void 0 : _a.memory_type) && !validMemoryTypes.includes(params.filters.memory_type)) {
            return this.errorResponse(`Invalid memory_type: "${params.filters.memory_type}". Valid types: ${validMemoryTypes.join(", ")}`);
          }
          if (this.isMultiProjectMode()) {
            const multiResult = await this.multiProjectService.query({
              ...params.filters,
              limit: params.limit || 10,
              offset: params.offset || 0
            });
            let filteredResults = multiResult.results;
            if ((_b = params.filters) == null ? void 0 : _b.project) {
              const projectLower = params.filters.project.toLowerCase();
              filteredResults = multiResult.results.filter(
                (r) => {
                  var _a2, _b2;
                  return ((_a2 = r.source) == null ? void 0 : _a2.toLowerCase()) === projectLower || ((_b2 = r.projectPath) == null ? void 0 : _b2.toLowerCase().includes(projectLower));
                }
              );
            }
            if (((_c = params.filters) == null ? void 0 : _c.tags) && params.filters.tags.length > 0 && Array.isArray(filteredResults)) {
              filteredResults = filteredResults.filter((memory) => {
                var _a2;
                const memoryTags = memory.tags || ((_a2 = memory.metadata) == null ? void 0 : _a2.tags) || [];
                return params.filters.tags.some((tag) => memoryTags.includes(tag));
              });
            }
            const projectHint = ((_d = params.filters) == null ? void 0 : _d.project) ? `Filtered to project: ${params.filters.project}` : `Queried across ${multiResult.sources.length} projects: [${multiResult.sources.join(", ")}]`;
            return {
              content: [{
                type: "text",
                text: JSON.stringify({
                  success: true,
                  data: filteredResults,
                  count: filteredResults.length,
                  sources: multiResult.sources,
                  isMultiProject: true,
                  hint: projectHint
                })
              }]
            };
          }
          const result = await this.paginatedHandler.handle({
            action: "query",
            filters: params.filters,
            ...params
          });
          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                success: true,
                data: result.data || result,
                pagination: result.pagination,
                hint: result.hint
              })
            }]
          };
        } catch (error) {
          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : "Query failed"
              })
            }],
            isError: true
          };
        }
      }
      async handleStats() {
        try {
          if (this.isMultiProjectMode()) {
            const multiStats = await this.multiProjectService.getAggregatedStats();
            return {
              content: [{
                type: "text",
                text: JSON.stringify({
                  success: true,
                  isMultiProject: true,
                  totalMemories: multiStats.totalMemories,
                  projectCount: multiStats.projectCount,
                  byProject: multiStats.byProject,
                  projects: Object.keys(multiStats.byProject),
                  hint: `Aggregated stats from ${multiStats.projectCount} projects`
                })
              }]
            };
          }
          const statsSource = this.repository || this.memoryService;
          const stats = await statsSource.getStats();
          const smartResponse = SmartResponseHelper.enhanceStatsResponse(stats);
          return {
            content: [{
              type: "text",
              text: SmartResponseHelper.formatForMCP(smartResponse)
            }]
          };
        } catch (error) {
          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : "Stats failed"
              })
            }],
            isError: true
          };
        }
      }
      async handleDelete(params) {
        try {
          const result = await this.memoryService.delete(params.id);
          const smartResponse = SmartResponseHelper.enhanceDeleteResponse({
            id: params.id,
            deleted: !!result
          });
          return {
            content: [{
              type: "text",
              text: SmartResponseHelper.formatForMCP(smartResponse)
            }]
          };
        } catch (error) {
          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : "Delete failed"
              })
            }],
            isError: true
          };
        }
      }
      /**
       * Get existing memories for path and perform compaction if threshold exceeded
       * Single Responsibility: handles path context and compaction logic
       */
      async getPathContextAndCompact(path7, memoryType, metadata) {
        const COMPACTION_THRESHOLD = 10;
        let existingMemories = [];
        let compactionPerformed = false;
        let compactedCount = 0;
        if (!path7 || !this.memoryService.query) {
          return { existingMemories, compactionPerformed, compactedCount };
        }
        try {
          const allMemories = await this.memoryService.query({});
          existingMemories = allMemories.filter(
            (m) => m.path === path7 && m.memoryType === memoryType
          );
          if (existingMemories.length >= COMPACTION_THRESHOLD) {
            compactionPerformed = true;
            compactedCount = existingMemories.length;
            existingMemories.sort(
              (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
            const consolidatedContent = this.createConsolidatedMemory(existingMemories, path7, memoryType);
            await this.storeConsolidatedMemory(consolidatedContent, path7, memoryType, metadata, compactedCount);
            await this.deleteMemories(existingMemories);
            existingMemories = [];
          }
        } catch (e) {
        }
        return { existingMemories, compactionPerformed, compactedCount };
      }
      /**
       * Store a consolidated memory entry
       */
      async storeConsolidatedMemory(content, path7, memoryType, metadata, compactedCount) {
        await this.memoryService.store({
          content,
          memoryType,
          path: path7,
          metadata: {
            ...metadata,
            path: path7,
            compacted: true,
            compactedFrom: compactedCount,
            compactedAt: (/* @__PURE__ */ new Date()).toISOString()
          }
        });
      }
      /**
       * Delete multiple memories
       */
      async deleteMemories(memories) {
        for (const memory of memories) {
          try {
            await this.memoryService.delete(memory.id);
          } catch (e) {
          }
        }
      }
      // Helper method for error responses
      errorResponse(message) {
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              success: false,
              error: message
            })
          }],
          isError: true
        };
      }
      /**
       * Create consolidated memory from multiple memories
       * Merges content intelligently to preserve key information
       */
      createConsolidatedMemory(memories, path7, memoryType) {
        const dateRange = {
          oldest: new Date(memories[0].createdAt).toISOString().split("T")[0],
          newest: new Date(memories[memories.length - 1].createdAt).toISOString().split("T")[0]
        };
        const allContent = memories.map((m) => m.content);
        const lines = [
          `[CONSOLIDATED: ${memories.length} memories from ${dateRange.oldest} to ${dateRange.newest}]`,
          `Path: ${path7}`,
          `Type: ${memoryType}`,
          "",
          "--- Key Points ---"
        ];
        allContent.forEach((content, index) => {
          const truncated = content.length > 200 ? content.substring(0, 200) + "..." : content;
          lines.push(`${index + 1}. ${truncated}`);
        });
        const allTags = /* @__PURE__ */ new Set();
        memories.forEach((m) => {
          var _a;
          if ((_a = m.metadata) == null ? void 0 : _a.tags) {
            m.metadata.tags.forEach((tag) => allTags.add(tag));
          }
        });
        if (allTags.size > 0) {
          lines.push("");
          lines.push(`Tags: ${Array.from(allTags).join(", ")}`);
        }
        return lines.join("\n");
      }
      // === New Tool Handlers ===
      async handleGetTags(params) {
        try {
          if (params.limit !== void 0) {
            if (!Number.isInteger(params.limit) || params.limit < 1 || params.limit > 100) {
              return this.errorResponse("Limit must be an integer between 1 and 100");
            }
          }
          const limit = params.limit || 50;
          const allMemories = this.memoryService.query ? await this.memoryService.query({}) : [];
          const tagCounts = /* @__PURE__ */ new Map();
          allMemories.forEach((memory) => {
            var _a;
            const tags = ((_a = memory.metadata) == null ? void 0 : _a.tags) || memory.tags || [];
            tags.forEach((tag) => {
              tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
            });
          });
          const sortedTags = Array.from(tagCounts.entries()).sort((a, b) => b[1] - a[1]).slice(0, limit).map(([tag, count]) => ({ tag, count }));
          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                success: true,
                tags: sortedTags,
                total: tagCounts.size,
                hint: sortedTags.length > 0 ? `Use memory_search with tags filter: tags: ["${sortedTags[0].tag}"]` : "No tags found. Add tags when storing memories."
              })
            }]
          };
        } catch (error) {
          return this.errorResponse(error instanceof Error ? error.message : "Failed to get tags");
        }
      }
      async handleExport(params) {
        var _a;
        try {
          const validFormats = ["json", "markdown"];
          if (params.format && !validFormats.includes(params.format)) {
            return this.errorResponse(`Invalid format: "${params.format}". Valid formats: ${validFormats.join(", ")}`);
          }
          if (params.limit !== void 0) {
            if (!Number.isInteger(params.limit) || params.limit < 1 || params.limit > 500) {
              return this.errorResponse("Limit must be an integer between 1 and 500");
            }
          }
          const format = params.format || "json";
          const limit = Math.min(params.limit || 100, 500);
          const filters = params.filters || {};
          let memories = this.memoryService.query ? await this.memoryService.query({}) : [];
          if (filters.memory_type) {
            memories = memories.filter((m) => m.memoryType === filters.memory_type);
          }
          if (filters.path) {
            memories = memories.filter((m) => {
              var _a2;
              return (_a2 = m.path) == null ? void 0 : _a2.includes(filters.path);
            });
          }
          if (((_a = filters.tags) == null ? void 0 : _a.length) > 0) {
            memories = memories.filter((m) => {
              var _a2;
              const memTags = ((_a2 = m.metadata) == null ? void 0 : _a2.tags) || m.tags || [];
              return filters.tags.some((t) => memTags.includes(t));
            });
          }
          memories = memories.slice(0, limit);
          if (format === "markdown") {
            const lines = ["# Memory Export", "", `Exported: ${(/* @__PURE__ */ new Date()).toISOString()}`, `Count: ${memories.length}`, ""];
            memories.forEach((m, i) => {
              var _a2;
              lines.push(`## ${i + 1}. ${m.memoryType || "memory"}`);
              if (m.path) lines.push(`**Path:** ${m.path}`);
              const tags = ((_a2 = m.metadata) == null ? void 0 : _a2.tags) || m.tags || [];
              if (tags.length > 0) lines.push(`**Tags:** ${tags.join(", ")}`);
              lines.push("", m.content, "");
              lines.push("---", "");
            });
            return {
              content: [{
                type: "text",
                text: JSON.stringify({
                  success: true,
                  format: "markdown",
                  count: memories.length,
                  data: lines.join("\n")
                })
              }]
            };
          }
          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                success: true,
                format: "json",
                count: memories.length,
                data: memories.map((m) => {
                  var _a2;
                  return {
                    id: m.id,
                    content: m.content,
                    memoryType: m.memoryType,
                    path: m.path,
                    tags: ((_a2 = m.metadata) == null ? void 0 : _a2.tags) || m.tags || [],
                    createdAt: m.createdAt
                  };
                })
              })
            }]
          };
        } catch (error) {
          return this.errorResponse(error instanceof Error ? error.message : "Export failed");
        }
      }
      async handleImport(params) {
        try {
          const memories = params.memories || [];
          if (!Array.isArray(memories) || memories.length === 0) {
            return this.errorResponse("memories must be a non-empty array");
          }
          if (memories.length > 100) {
            return this.errorResponse("Cannot import more than 100 memories at once");
          }
          const results = { imported: 0, failed: 0, errors: [] };
          for (let i = 0; i < memories.length; i++) {
            const mem = memories[i];
            try {
              if (!mem.content || mem.content.trim() === "") {
                results.failed++;
                results.errors.push(`Item ${i}: Empty content skipped`);
                continue;
              }
              const autoTags = this.generateAutoTags(mem.path, mem.content, mem.memory_type || "knowledge");
              const userTags = Array.isArray(mem.tags) ? mem.tags : [];
              const allTags = [.../* @__PURE__ */ new Set([...userTags, ...autoTags])];
              await this.memoryService.store({
                content: mem.content,
                memoryType: mem.memory_type || "knowledge",
                path: mem.path,
                tags: allTags,
                metadata: {
                  tags: allTags,
                  importance: mem.importance || "medium",
                  imported: true,
                  importedAt: (/* @__PURE__ */ new Date()).toISOString()
                }
              });
              results.imported++;
            } catch (e) {
              results.failed++;
              results.errors.push(`Item ${i}: ${e instanceof Error ? e.message : "Unknown error"}`);
            }
          }
          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                success: results.imported > 0,
                imported: results.imported,
                failed: results.failed,
                errors: results.errors.slice(0, 5),
                // Show first 5 errors
                hint: results.imported > 0 ? `Imported ${results.imported} memories with auto-tagging` : "No memories were imported"
              })
            }]
          };
        } catch (error) {
          return this.errorResponse(error instanceof Error ? error.message : "Import failed");
        }
      }
    };
    __name(_MemoryTools, "MemoryTools");
    MemoryTools = _MemoryTools;
  }
});

// src/modules/mcp/tools/search-tools.schemas.ts
var SemanticSearchInput, SemanticSearchOutput, PatternSearchInput, PatternSearchOutput, TemporalSearchInput, TemporalSearchOutput, RelationshipSearchInput, RelationshipSearchOutput;
var init_search_tools_schemas = __esm({
  "src/modules/mcp/tools/search-tools.schemas.ts"() {
    init_zod();
    SemanticSearchInput = {
      query: external_exports.string().describe("Search query"),
      threshold: external_exports.number().min(0).max(1).optional().describe("Similarity threshold (0-1)"),
      limit: external_exports.number().min(1).max(100).optional().describe("Maximum results")
    };
    SemanticSearchOutput = {
      success: external_exports.boolean(),
      error: external_exports.string().optional(),
      alternative: external_exports.string().optional(),
      example: external_exports.string().optional(),
      roadmap: external_exports.string().optional()
    };
    PatternSearchInput = {
      pattern_type: external_exports.enum(["sequence", "frequency", "association", "temporal"]).describe("Type of pattern to search"),
      min_support: external_exports.number().min(0).max(1).optional().describe("Minimum support threshold"),
      time_range: external_exports.object({
        start: external_exports.string().optional(),
        end: external_exports.string().optional()
      }).optional().describe("Time range for pattern analysis")
    };
    PatternSearchOutput = {
      success: external_exports.boolean(),
      pattern_type: external_exports.string().optional(),
      patterns: external_exports.array(external_exports.any()).optional(),
      totalPatterns: external_exports.number().optional(),
      minSupport: external_exports.number().optional(),
      error: external_exports.string().optional()
    };
    TemporalSearchInput = {
      start_date: external_exports.string().describe("Start date (ISO format)"),
      end_date: external_exports.string().describe("End date (ISO format)"),
      granularity: external_exports.enum(["hour", "day", "week", "month"]).optional().describe("Time grouping granularity"),
      include_trends: external_exports.boolean().optional().describe("Include trend analysis")
    };
    TemporalSearchOutput = {
      success: external_exports.boolean(),
      results: external_exports.array(external_exports.any()).optional(),
      totalCount: external_exports.number().optional(),
      timeRange: external_exports.object({
        start: external_exports.string(),
        end: external_exports.string()
      }).optional(),
      granularity: external_exports.string().optional(),
      distribution: external_exports.record(external_exports.number()).optional(),
      trends: external_exports.any().optional(),
      error: external_exports.string().optional()
    };
    RelationshipSearchInput = {
      source_id: external_exports.string().describe("Source memory ID"),
      relationship_type: external_exports.enum(["related", "depends_on", "references", "contradicts"]).optional().describe("Filter by relationship type"),
      depth: external_exports.number().min(1).max(5).optional().describe("Search depth")
    };
    RelationshipSearchOutput = {
      success: external_exports.boolean(),
      source_id: external_exports.string().optional(),
      sourceContent: external_exports.string().optional(),
      relationship_type: external_exports.string().optional(),
      depth: external_exports.number().optional(),
      relationships: external_exports.array(external_exports.object({
        sourceId: external_exports.string(),
        targetId: external_exports.string(),
        type: external_exports.string(),
        strength: external_exports.number(),
        sharedTags: external_exports.array(external_exports.string()),
        targetContent: external_exports.string()
      })).optional(),
      totalFound: external_exports.number().optional(),
      error: external_exports.string().optional()
    };
  }
});

// src/modules/mcp/tools/SearchTools.ts
var SearchTools_exports = {};
__export(SearchTools_exports, {
  SearchTools: () => SearchTools
});
var _SearchTools, SearchTools;
var init_SearchTools = __esm({
  "src/modules/mcp/tools/SearchTools.ts"() {
    init_types2();
    init_zod_tool_helper();
    init_search_tools_schemas();
    _SearchTools = class _SearchTools {
      searchService;
      // Will be injected
      multiProjectService;
      // Optional multi-project service
      constructor(searchService, multiProjectService) {
        this.searchService = searchService;
        this.multiProjectService = multiProjectService;
      }
      /**
       * Check if multi-project mode is active
       */
      isMultiProjectMode() {
        var _a, _b;
        return ((_b = (_a = this.multiProjectService) == null ? void 0 : _a.isMultiMode) == null ? void 0 : _b.call(_a)) ?? false;
      }
      /**
       * Get all memories from the appropriate service
       */
      async getAllMemories() {
        var _a, _b, _c, _d;
        try {
          if (this.isMultiProjectMode()) {
            return await this.multiProjectService.getAllMemories();
          }
          return await (((_b = (_a = this.searchService).query) == null ? void 0 : _b.call(_a, {})) || ((_d = (_c = this.searchService).findAll) == null ? void 0 : _d.call(_c)) || []);
        } catch {
          return [];
        }
      }
      /**
       * Get all search tools
       */
      getTools() {
        return [
          this.createSemanticSearchTool(),
          this.createPatternSearchTool(),
          this.createTemporalSearchTool(),
          this.createRelationshipSearchTool()
        ];
      }
      createSemanticSearchTool() {
        return {
          name: "search_semantic",
          title: "Semantic Search",
          description: "Perform semantic search across memories",
          category: "search" /* SEARCH */,
          inputSchema: zodToJsonSchema(SemanticSearchInput),
          outputSchema: SemanticSearchOutput,
          handler: /* @__PURE__ */ __name(async (params) => this.handleSemanticSearch(params), "handler")
        };
      }
      createPatternSearchTool() {
        return {
          name: "search_patterns",
          title: "Pattern Search",
          description: "Find patterns in memory sequences",
          category: "search" /* SEARCH */,
          inputSchema: zodToJsonSchema(PatternSearchInput),
          outputSchema: PatternSearchOutput,
          handler: /* @__PURE__ */ __name(async (params) => this.handlePatternSearch(params), "handler")
        };
      }
      createTemporalSearchTool() {
        return {
          name: "search_temporal",
          title: "Temporal Search",
          description: "Search memories by time-based criteria",
          category: "search" /* SEARCH */,
          inputSchema: zodToJsonSchema(TemporalSearchInput),
          outputSchema: TemporalSearchOutput,
          handler: /* @__PURE__ */ __name(async (params) => this.handleTemporalSearch(params), "handler")
        };
      }
      createRelationshipSearchTool() {
        return {
          name: "search_relationships",
          title: "Relationship Search",
          description: "Find relationships between memories",
          category: "search" /* SEARCH */,
          inputSchema: zodToJsonSchema(RelationshipSearchInput),
          outputSchema: RelationshipSearchOutput,
          handler: /* @__PURE__ */ __name(async (params) => this.handleRelationshipSearch(params), "handler")
        };
      }
      // Handler implementations
      async handleSemanticSearch(params) {
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              success: false,
              error: "Semantic search not yet implemented",
              alternative: "Use memory_search for text-based search",
              example: `memory_search({ query: "${params.query || "your query"}", limit: 10 })`,
              roadmap: "Semantic search with embeddings coming in future release"
            })
          }],
          isError: true
        };
      }
      async handlePatternSearch(params) {
        try {
          if (typeof this.searchService.findPatterns === "function") {
            const results = await this.searchService.findPatterns(params);
            return {
              content: [{
                type: "text",
                text: JSON.stringify({
                  success: true,
                  results
                })
              }]
            };
          }
          const allMemories = await this.getAllMemories();
          let minSupport = params.min_support;
          if (minSupport !== void 0) {
            if (typeof minSupport !== "number" || minSupport < 0 || minSupport > 1) {
              return {
                content: [{
                  type: "text",
                  text: JSON.stringify({
                    success: false,
                    error: "min_support must be a number between 0 and 1"
                  })
                }],
                isError: true
              };
            }
          } else {
            minSupport = 0.1;
          }
          let patterns = [];
          switch (params.pattern_type) {
            case "frequency":
              patterns = this.analyzeFrequencyPatterns(allMemories, minSupport);
              break;
            case "temporal":
              patterns = this.analyzeTemporalPatterns(allMemories);
              break;
            case "association":
              patterns = this.analyzeAssociationPatterns(allMemories, minSupport);
              break;
            case "sequence":
              patterns = this.analyzeSequencePatterns(allMemories);
              break;
            default:
              patterns = this.analyzeFrequencyPatterns(allMemories, minSupport);
          }
          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                success: true,
                pattern_type: params.pattern_type,
                patterns: patterns.slice(0, 20),
                totalPatterns: patterns.length,
                minSupport
              })
            }]
          };
        } catch (error) {
          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : "Pattern search failed"
              })
            }],
            isError: true
          };
        }
      }
      analyzeFrequencyPatterns(memories, minSupport) {
        var _a;
        const tagCounts = {};
        const typeCounts = {};
        const total = memories.length;
        for (const m of memories) {
          const memoryType = m.memoryType || m.memory_type || "unknown";
          typeCounts[memoryType] = (typeCounts[memoryType] || 0) + 1;
          const tags = ((_a = m.metadata) == null ? void 0 : _a.tags) || [];
          for (const tag of tags) {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
          }
        }
        const patterns = [];
        for (const [type, count] of Object.entries(typeCounts)) {
          const support = count / total;
          if (support >= minSupport) {
            patterns.push({
              type: "memory_type",
              value: type,
              count,
              support: Math.round(support * 100) / 100
            });
          }
        }
        for (const [tag, count] of Object.entries(tagCounts)) {
          const support = count / total;
          if (support >= minSupport) {
            patterns.push({
              type: "tag",
              value: tag,
              count,
              support: Math.round(support * 100) / 100
            });
          }
        }
        return patterns.sort((a, b) => b.support - a.support);
      }
      analyzeTemporalPatterns(memories) {
        const hourCounts = Array(24).fill(0);
        const dayCounts = Array(7).fill(0);
        for (const m of memories) {
          const date = new Date(m.createdAt);
          if (!isNaN(date.getTime())) {
            hourCounts[date.getHours()]++;
            dayCounts[date.getDay()]++;
          }
        }
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return [
          {
            type: "peak_hours",
            hours: hourCounts.map((count, hour) => ({ hour, count })).sort((a, b) => b.count - a.count).slice(0, 3).map((h) => `${h.hour}:00 (${h.count} memories)`)
          },
          {
            type: "peak_days",
            days: dayCounts.map((count, day) => ({ day: dayNames[day], count })).sort((a, b) => b.count - a.count).slice(0, 3)
          }
        ];
      }
      analyzeAssociationPatterns(memories, minSupport) {
        var _a;
        const tagPairs = {};
        const total = memories.length;
        for (const m of memories) {
          const tags = ((_a = m.metadata) == null ? void 0 : _a.tags) || [];
          for (let i = 0; i < tags.length; i++) {
            for (let j = i + 1; j < tags.length; j++) {
              const pair = [tags[i], tags[j]].sort().join(" + ");
              tagPairs[pair] = (tagPairs[pair] || 0) + 1;
            }
          }
        }
        return Object.entries(tagPairs).map(([pair, count]) => ({
          type: "tag_association",
          tags: pair.split(" + "),
          count,
          support: Math.round(count / total * 100) / 100
        })).filter((p) => p.support >= minSupport).sort((a, b) => b.support - a.support);
      }
      analyzeSequencePatterns(memories) {
        const sorted = [...memories].sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        const sequences = [];
        for (let i = 0; i < sorted.length - 1; i++) {
          const curr = sorted[i].memoryType || sorted[i].memory_type;
          const next = sorted[i + 1].memoryType || sorted[i + 1].memory_type;
          if (curr && next) {
            const seq = `${curr} -> ${next}`;
            const existing = sequences.find((s) => s.sequence === seq);
            if (existing) {
              existing.count++;
            } else {
              sequences.push({ type: "sequence", sequence: seq, count: 1 });
            }
          }
        }
        return sequences.sort((a, b) => b.count - a.count).slice(0, 10);
      }
      async handleTemporalSearch(params) {
        try {
          if (typeof this.searchService.temporalSearch === "function") {
            const results = await this.searchService.temporalSearch(params);
            return {
              content: [{
                type: "text",
                text: JSON.stringify({
                  success: true,
                  results
                })
              }]
            };
          }
          const startDate = new Date(params.start_date);
          const endDate = new Date(params.end_date);
          if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return {
              content: [{
                type: "text",
                text: JSON.stringify({
                  success: false,
                  error: "Invalid date format. Use ISO format (YYYY-MM-DD)"
                })
              }],
              isError: true
            };
          }
          const allMemories = await this.getAllMemories();
          const filtered = allMemories.filter((m) => {
            const created = new Date(m.createdAt);
            return created >= startDate && created <= endDate;
          });
          const granularity = params.granularity || "day";
          const grouped = {};
          for (const memory of filtered) {
            const date = new Date(memory.createdAt);
            let key;
            switch (granularity) {
              case "hour":
                key = date.toISOString().slice(0, 13);
                break;
              case "week":
                const weekStart = new Date(date);
                weekStart.setDate(date.getDate() - date.getDay());
                key = weekStart.toISOString().slice(0, 10);
                break;
              case "month":
                key = date.toISOString().slice(0, 7);
                break;
              default:
                key = date.toISOString().slice(0, 10);
            }
            if (!grouped[key]) grouped[key] = [];
            grouped[key].push(memory);
          }
          const trends = params.include_trends ? this.calculateTrends(grouped) : void 0;
          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                success: true,
                results: filtered.slice(0, 50),
                totalCount: filtered.length,
                timeRange: { start: params.start_date, end: params.end_date },
                granularity,
                distribution: Object.fromEntries(
                  Object.entries(grouped).map(([k, v]) => [k, v.length])
                ),
                trends
              })
            }]
          };
        } catch (error) {
          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : "Temporal search failed"
              })
            }],
            isError: true
          };
        }
      }
      calculateTrends(grouped) {
        const keys = Object.keys(grouped).sort();
        if (keys.length < 2) return { direction: "stable", change: 0 };
        const counts = keys.map((k) => grouped[k].length);
        const firstHalf = counts.slice(0, Math.floor(counts.length / 2));
        const secondHalf = counts.slice(Math.floor(counts.length / 2));
        const avgFirst = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
        const avgSecond = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
        const change = avgFirst > 0 ? (avgSecond - avgFirst) / avgFirst * 100 : 0;
        return {
          direction: change > 10 ? "increasing" : change < -10 ? "decreasing" : "stable",
          changePercent: Math.round(change),
          averagePerPeriod: Math.round((avgFirst + avgSecond) / 2)
        };
      }
      async handleRelationshipSearch(params) {
        var _a, _b, _c, _d, _e;
        try {
          if (typeof this.searchService.findRelationships === "function") {
            const results = await this.searchService.findRelationships(
              params.source_id,
              params.relationship_type,
              params.depth ?? 2
            );
            return {
              content: [{
                type: "text",
                text: JSON.stringify({
                  success: true,
                  results
                })
              }]
            };
          }
          const allMemories = await this.getAllMemories();
          const sourceMemory = allMemories.find((m) => m.id === params.source_id);
          if (!sourceMemory) {
            return {
              content: [{
                type: "text",
                text: JSON.stringify({
                  success: false,
                  error: `Memory with ID "${params.source_id}" not found`
                })
              }],
              isError: true
            };
          }
          const sourceTags = ((_a = sourceMemory.metadata) == null ? void 0 : _a.tags) || [];
          const sourceType = sourceMemory.memoryType || sourceMemory.memory_type;
          const depth = params.depth || 2;
          const relationships = [];
          for (const memory of allMemories) {
            if (memory.id === params.source_id) continue;
            const memoryTags = ((_b = memory.metadata) == null ? void 0 : _b.tags) || [];
            const memoryType = memory.memoryType || memory.memory_type;
            const sharedTags = sourceTags.filter((t) => memoryTags.includes(t));
            const tagScore = sharedTags.length / Math.max(sourceTags.length, 1);
            const explicitRel = (_c = memory.relationships) == null ? void 0 : _c.find((r) => r.targetId === params.source_id);
            let relType = "related";
            if (explicitRel) {
              relType = explicitRel.type;
            } else if (memoryType === sourceType && tagScore > 0.5) {
              relType = "similar";
            } else if (sharedTags.length > 0) {
              relType = "related";
            }
            if (params.relationship_type && relType !== params.relationship_type) {
              continue;
            }
            if (sharedTags.length > 0 || explicitRel) {
              relationships.push({
                sourceId: params.source_id,
                targetId: memory.id,
                type: relType,
                strength: Math.round(tagScore * 100) / 100,
                sharedTags,
                targetContent: ((_d = memory.content) == null ? void 0 : _d.substring(0, 100)) + "..."
              });
            }
          }
          const sorted = relationships.sort((a, b) => b.strength - a.strength).slice(0, depth * 10);
          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                success: true,
                source_id: params.source_id,
                sourceContent: ((_e = sourceMemory.content) == null ? void 0 : _e.substring(0, 100)) + "...",
                relationship_type: params.relationship_type || "all",
                depth,
                relationships: sorted,
                totalFound: relationships.length
              })
            }]
          };
        } catch (error) {
          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : "Relationship search failed"
              })
            }],
            isError: true
          };
        }
      }
    };
    __name(_SearchTools, "SearchTools");
    SearchTools = _SearchTools;
  }
});

// src/modules/mcp/tools/analysis-tools.schemas.ts
var ConflictDetectionInput, ConflictDetectionOutput, MemoryMapInput, MemoryMapOutput, AnomalyDetectionInput, AnomalyDetectionOutput, ForecastInput, ForecastOutput;
var init_analysis_tools_schemas = __esm({
  "src/modules/mcp/tools/analysis-tools.schemas.ts"() {
    init_zod();
    ConflictDetectionInput = {
      scope: external_exports.enum(["all", "project", "category", "recent"]).describe("Analysis scope"),
      threshold: external_exports.number().min(0).max(1).optional().describe("Conflict threshold (0-1)"),
      include_suggestions: external_exports.boolean().optional().describe("Include resolution suggestions")
    };
    ConflictDetectionOutput = {
      success: external_exports.boolean(),
      conflicts: external_exports.array(external_exports.any()).optional(),
      error: external_exports.string().optional()
    };
    MemoryMapInput = {
      center_id: external_exports.string().optional().describe("Center memory ID (optional)"),
      depth: external_exports.number().min(1).max(5).optional().describe("Map depth"),
      format: external_exports.enum(["graph", "tree", "matrix", "json"]).describe("Output format")
    };
    MemoryMapOutput = {
      success: external_exports.boolean(),
      map: external_exports.any().optional(),
      error: external_exports.string().optional()
    };
    AnomalyDetectionInput = {
      time_range: external_exports.object({
        start: external_exports.string().optional(),
        end: external_exports.string().optional()
      }).describe("Time range for analysis"),
      sensitivity: external_exports.enum(["low", "medium", "high"]).optional().describe("Detection sensitivity"),
      metrics: external_exports.array(external_exports.string()).optional().describe("Metrics to analyze")
    };
    AnomalyDetectionOutput = {
      success: external_exports.boolean(),
      anomalies: external_exports.array(external_exports.any()).optional(),
      error: external_exports.string().optional()
    };
    ForecastInput = {
      metric: external_exports.string().describe("Metric to forecast"),
      horizon: external_exports.number().min(1).max(90).describe("Forecast horizon (days)"),
      model: external_exports.enum(["linear", "exponential", "arima", "auto"]).optional().describe("Forecasting model"),
      confidence: external_exports.number().min(0).max(1).optional().describe("Confidence interval (0-1)")
    };
    ForecastOutput = {
      success: external_exports.boolean(),
      forecast: external_exports.any().optional(),
      error: external_exports.string().optional()
    };
  }
});

// src/modules/mcp/tools/AnalysisTools.ts
var AnalysisTools_exports = {};
__export(AnalysisTools_exports, {
  AnalysisTools: () => AnalysisTools
});
var _AnalysisTools, AnalysisTools;
var init_AnalysisTools = __esm({
  "src/modules/mcp/tools/AnalysisTools.ts"() {
    init_types2();
    init_zod_tool_helper();
    init_analysis_tools_schemas();
    _AnalysisTools = class _AnalysisTools {
      analysisService;
      // Will be injected
      constructor(analysisService) {
        this.analysisService = analysisService;
      }
      /**
       * Get all analysis tools
       */
      getTools() {
        return [
          this.createConflictDetectionTool(),
          this.createMemoryMapTool(),
          this.createAnomalyDetectionTool(),
          this.createForecastingTool()
        ];
      }
      createConflictDetectionTool() {
        return {
          name: "analysis_conflicts",
          title: "Conflict Detection",
          description: "Detect conflicts between memories",
          category: "analysis" /* ANALYSIS */,
          inputSchema: zodToJsonSchema(ConflictDetectionInput),
          outputSchema: ConflictDetectionOutput,
          handler: /* @__PURE__ */ __name(async (params) => this.handleConflictDetection(params), "handler")
        };
      }
      createMemoryMapTool() {
        return {
          name: "analysis_memory_map",
          title: "Memory Map",
          description: "Generate visual map of memory relationships",
          category: "analysis" /* ANALYSIS */,
          inputSchema: zodToJsonSchema(MemoryMapInput),
          outputSchema: MemoryMapOutput,
          handler: /* @__PURE__ */ __name(async (params) => this.handleMemoryMap(params), "handler")
        };
      }
      createAnomalyDetectionTool() {
        return {
          name: "analysis_anomalies",
          title: "Anomaly Detection",
          description: "Detect anomalies in memory patterns",
          category: "analysis" /* ANALYSIS */,
          inputSchema: zodToJsonSchema(AnomalyDetectionInput),
          outputSchema: AnomalyDetectionOutput,
          handler: /* @__PURE__ */ __name(async (params) => this.handleAnomalyDetection(params), "handler")
        };
      }
      createForecastingTool() {
        return {
          name: "analysis_forecast",
          title: "Forecast",
          description: "Forecast memory trends and patterns",
          category: "analysis" /* ANALYSIS */,
          inputSchema: zodToJsonSchema(ForecastInput),
          outputSchema: ForecastOutput,
          handler: /* @__PURE__ */ __name(async (params) => this.handleForecasting(params), "handler")
        };
      }
      // Handler implementations
      async handleConflictDetection(params) {
        try {
          const conflicts = await this.analysisService.detectConflicts({
            scope: params.scope,
            threshold: params.threshold ?? 0.8,
            include_suggestions: params.include_suggestions ?? false
          });
          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                success: true,
                conflicts
              })
            }]
          };
        } catch (error) {
          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : "Conflict detection failed"
              })
            }],
            isError: true
          };
        }
      }
      async handleMemoryMap(params) {
        try {
          const map = await this.analysisService.generateMemoryMap({
            center_id: params.center_id,
            depth: params.depth ?? 2,
            format: params.format
          });
          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                success: true,
                map
              })
            }]
          };
        } catch (error) {
          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : "Memory map generation failed"
              })
            }],
            isError: true
          };
        }
      }
      async handleAnomalyDetection(params) {
        try {
          const validSensitivities = ["low", "medium", "high"];
          if (params.sensitivity !== void 0 && !validSensitivities.includes(params.sensitivity)) {
            return {
              content: [{ type: "text", text: JSON.stringify({ success: false, error: `Sensitivity must be one of: ${validSensitivities.join(", ")}` }) }],
              isError: true
            };
          }
          const anomalies = await this.analysisService.detectAnomalies({
            time_range: params.time_range,
            sensitivity: params.sensitivity ?? "medium",
            metrics: params.metrics
          });
          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                success: true,
                anomalies
              })
            }]
          };
        } catch (error) {
          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : "Anomaly detection failed"
              })
            }],
            isError: true
          };
        }
      }
      async handleForecasting(params) {
        try {
          if (!params.metric || typeof params.metric === "string" && params.metric.trim() === "") {
            return {
              content: [{ type: "text", text: JSON.stringify({ success: false, error: "Metric is required" }) }],
              isError: true
            };
          }
          if (!params.horizon || params.horizon < 1 || params.horizon > 90) {
            return {
              content: [{ type: "text", text: JSON.stringify({ success: false, error: "Horizon must be between 1 and 90 days" }) }],
              isError: true
            };
          }
          if (params.confidence !== void 0) {
            if (typeof params.confidence !== "number" || params.confidence < 0 || params.confidence > 1) {
              return {
                content: [{ type: "text", text: JSON.stringify({ success: false, error: "Confidence must be a number between 0 and 1" }) }],
                isError: true
              };
            }
          }
          const forecast = await this.analysisService.forecast({
            metric: params.metric,
            horizon: params.horizon,
            model: params.model ?? "auto",
            confidence: params.confidence
          });
          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                success: true,
                forecast
              })
            }]
          };
        } catch (error) {
          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : "Forecasting failed"
              })
            }],
            isError: true
          };
        }
      }
    };
    __name(_AnalysisTools, "AnalysisTools");
    AnalysisTools = _AnalysisTools;
  }
});

// src/modules/mcp/tools/ToolRegistry.ts
var _ToolRegistry, ToolRegistry;
var init_ToolRegistry = __esm({
  "src/modules/mcp/tools/ToolRegistry.ts"() {
    _ToolRegistry = class _ToolRegistry {
      tools = /* @__PURE__ */ new Map();
      categories = /* @__PURE__ */ new Map();
      validators = /* @__PURE__ */ new Map();
      /**
       * Register a new tool
       */
      register(registration) {
        const { tool, override = false } = registration;
        if (this.tools.has(tool.name) && !override) {
          throw new Error(`Tool '${tool.name}' already registered`);
        }
        this.validateTool(tool);
        this.tools.set(tool.name, tool);
        if (tool.category) {
          if (!this.categories.has(tool.category)) {
            this.categories.set(tool.category, /* @__PURE__ */ new Set());
          }
          this.categories.get(tool.category).add(tool.name);
        }
      }
      /**
       * Get a tool by name
       */
      getTool(name) {
        return this.tools.get(name);
      }
      /**
       * Get all tools
       */
      getAllTools() {
        return new Map(this.tools);
      }
      /**
       * Get tools by category
       */
      getToolsByCategory(category) {
        const toolNames = this.categories.get(category);
        if (!toolNames) return [];
        return Array.from(toolNames).map((name) => this.tools.get(name)).filter((tool) => tool !== void 0);
      }
      /**
       * Execute a tool
       */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async execute(toolName, params) {
        const tool = this.tools.get(toolName);
        if (!tool) {
          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                success: false,
                error: `Tool '${toolName}' not found`
              })
            }],
            isError: true
          };
        }
        try {
          if (!this.validateParams(tool, params)) {
            return {
              content: [{
                type: "text",
                text: JSON.stringify({
                  success: false,
                  error: `Invalid parameters for tool '${toolName}'`
                })
              }],
              isError: true
            };
          }
          const result = await tool.handler(params);
          return result;
        } catch (error) {
          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : "Tool execution failed"
              })
            }],
            isError: true
          };
        }
      }
      validateTool(tool) {
        if (!tool.name) {
          throw new Error("Tool must have a name");
        }
        if (!tool.description) {
          throw new Error("Tool must have a description");
        }
        if (!tool.inputSchema) {
          throw new Error("Tool must have an input schema");
        }
        if (typeof tool.handler !== "function") {
          throw new Error("Tool must have a handler function");
        }
      }
      validateParams(tool, params) {
        if (process.env.MCP_AUDIT === "true") {
          process.stderr.write(`[VALIDATE] Tool: ${tool.name}, Params: ${JSON.stringify(params)}
`);
        }
        const isJsonSchema = "type" in tool.inputSchema && tool.inputSchema.type === "object";
        if (!isJsonSchema) {
          return true;
        }
        const jsonSchema = tool.inputSchema;
        if (jsonSchema.required) {
          for (const required of jsonSchema.required) {
            if (!(required in params)) {
              process.stderr.write(`[VALIDATE_ERROR] Missing required param: ${required}
`);
              return false;
            }
          }
        }
        for (const [key, schema] of Object.entries(jsonSchema.properties)) {
          if (key in params) {
            const value = params[key];
            if (!this.validateType(value, schema.type)) {
              process.stderr.write(`[VALIDATE_ERROR] Param ${key} has wrong type. Expected: ${schema.type}, Got: ${typeof value}, Value: ${JSON.stringify(value)}
`);
              return false;
            }
          }
        }
        return true;
      }
      validateType(value, type) {
        switch (type) {
          case "string":
            return typeof value === "string";
          case "number":
            return typeof value === "number";
          case "boolean":
            return typeof value === "boolean";
          case "array":
            if (Array.isArray(value)) return true;
            if (typeof value === "string" && value.startsWith("[")) {
              try {
                const parsed = JSON.parse(value);
                return Array.isArray(parsed);
              } catch (e) {
                return false;
              }
            }
            return false;
          case "object":
            return typeof value === "object" && value !== null;
          default:
            return true;
        }
      }
      // Tool loaders
      async loadMemoryTools() {
        const { MemoryTools: MemoryTools2 } = await Promise.resolve().then(() => (init_MemoryTools(), MemoryTools_exports));
      }
      async loadSearchTools() {
        const { SearchTools: SearchTools2 } = await Promise.resolve().then(() => (init_SearchTools(), SearchTools_exports));
      }
      async loadAnalysisTools() {
        const { AnalysisTools: AnalysisTools2 } = await Promise.resolve().then(() => (init_AnalysisTools(), AnalysisTools_exports));
      }
    };
    __name(_ToolRegistry, "ToolRegistry");
    ToolRegistry = _ToolRegistry;
  }
});

// src/modules/mcp/handlers/RequestHandlerService.ts
var import_events, _RequestHandlerService, RequestHandlerService;
var init_RequestHandlerService = __esm({
  "src/modules/mcp/handlers/RequestHandlerService.ts"() {
    import_events = require("events");
    init_logger();
    _RequestHandlerService = class _RequestHandlerService extends import_events.EventEmitter {
      handlers = /* @__PURE__ */ new Map();
      toolRegistry;
      constructor(toolRegistry) {
        super();
        this.toolRegistry = toolRegistry;
        this.registerDefaultHandlers();
        Logger.enableAudit(true);
        Logger.setLevel(0);
        Logger.audit({
          event: "MCP_SERVER_STARTED",
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          message: "RequestHandlerService initialized"
        });
      }
      /**
       * Handle an incoming request
       */
      async handle(request) {
        const { id, method, params } = request;
        const startTime = Date.now();
        if ((method == null ? void 0 : method.startsWith("notifications/")) || id === void 0 || id === null) {
          Logger.audit({
            event: "NOTIFICATION_RECEIVED",
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            method
          });
          return null;
        }
        Logger.audit({
          event: "REQUEST_RECEIVED",
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          requestId: id,
          method,
          params: params ? JSON.stringify(params).substring(0, 200) : void 0
        });
        try {
          let response;
          if (this.handlers.has(method)) {
            const handler = this.handlers.get(method);
            const result = await handler(request);
            response = this.createResponse(id, result);
          } else if (method === "tools/call") {
            response = await this.handleToolCall(id, params);
          } else {
            switch (method) {
              case "initialize":
                response = await this.handleInitialize(id, params);
                break;
              case "initialized":
                response = this.createResponse(id, {});
                break;
              case "tools/list":
                response = await this.handleToolsList(id);
                break;
              case "resources/list":
                response = await this.handleResourcesList(id);
                break;
              case "prompts/list":
                response = await this.handlePromptsList(id);
                break;
              case "completion":
                response = await this.handleCompletion(id, params);
                break;
              default:
                throw this.createError(-32601, `Method '${method}' not found`);
            }
          }
          Logger.audit({
            event: "REQUEST_COMPLETED",
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            requestId: id,
            method,
            duration: Date.now() - startTime,
            hasResult: !!response.result
          });
          return response;
        } catch (error) {
          const mcpError = error instanceof Error && "code" in error ? error : this.createError(-32603, error instanceof Error ? error.message : "Internal error");
          Logger.audit({
            event: "REQUEST_ERROR",
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            requestId: id,
            method,
            duration: Date.now() - startTime,
            error: mcpError.message,
            code: mcpError.code
          });
          return this.createErrorResponse(id, mcpError);
        }
      }
      /**
       * Register a custom handler
       */
      registerHandler(method, handler) {
        this.handlers.set(method, handler);
      }
      registerDefaultHandlers() {
        this.registerHandler("ping", async (request) => ({
          result: { pong: true }
        }));
        this.registerHandler("echo", async (request) => ({
          result: request.params
        }));
      }
      async handleInitialize(id, params) {
        const capabilities = {
          tools: {
            supported: true
          },
          resources: {
            supported: true,
            subscriptions: false
          },
          prompts: {
            supported: true
          },
          completion: {
            supported: false
          }
        };
        return this.createResponse(id, {
          protocolVersion: "2025-06-18",
          capabilities,
          serverInfo: {
            name: "nova-memory-mcp",
            version: "0.3.7"
          }
        });
      }
      async handleToolCall(id, params) {
        if (!(params == null ? void 0 : params.name)) {
          throw this.createError(-32602, "Invalid params: missing tool name");
        }
        Logger.audit({
          event: "TOOL_EXECUTE_START",
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          requestId: id,
          toolName: params.name,
          hasArguments: !!params.arguments
        });
        const result = await this.toolRegistry.execute(params.name, params.arguments ?? {});
        Logger.audit({
          event: "TOOL_EXECUTE_END",
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          requestId: id,
          toolName: params.name,
          success: !result.isError,
          error: result.isError ? "Tool returned error" : void 0
        });
        return this.createResponse(id, result);
      }
      async handleToolsList(id) {
        const tools = Array.from(this.toolRegistry.getAllTools().values()).map((tool) => ({
          name: tool.name,
          description: tool.description,
          inputSchema: tool.inputSchema
        }));
        return this.createResponse(id, { tools });
      }
      async handleResourcesList(id) {
        return this.createResponse(id, { resources: [] });
      }
      async handlePromptsList(id) {
        return this.createResponse(id, { prompts: [] });
      }
      async handleCompletion(id, params) {
        throw this.createError(-32601, "Completion not supported");
      }
      createResponse(id, result) {
        return {
          id,
          result,
          jsonrpc: "2.0"
        };
      }
      createError(code, message, data) {
        return { code, message, data };
      }
      createErrorResponse(id, error) {
        return {
          id,
          error,
          jsonrpc: "2.0"
        };
      }
    };
    __name(_RequestHandlerService, "RequestHandlerService");
    RequestHandlerService = _RequestHandlerService;
  }
});

// src/modules/mcp/transport/StdioTransport.ts
var StdioTransport_exports = {};
__export(StdioTransport_exports, {
  StdioTransport: () => StdioTransport
});
var _StdioTransport, StdioTransport;
var init_StdioTransport = __esm({
  "src/modules/mcp/transport/StdioTransport.ts"() {
    _StdioTransport = class _StdioTransport {
      input;
      output;
      byteBuffer = Buffer.alloc(0);
      // Use Buffer for proper byte handling
      closed = false;
      constructor(input, output) {
        this.input = input ?? process.stdin;
        this.output = output ?? process.stdout;
      }
      /**
       * Send a response - supports both Content-Length and newline-delimited formats
       */
      async send(message) {
        if (this.closed) {
          throw new Error("Transport is closed");
        }
        const json = JSON.stringify(message);
        if (process.env.MCP_DEBUG) {
          const fs6 = require("fs");
          fs6.appendFileSync(
            "mcp-requests.log",
            `[${(/* @__PURE__ */ new Date()).toISOString()}] RESPONSE: ${json}
`
          );
        }
        const frame = `${json}
`;
        return new Promise((resolve, reject) => {
          this.output.write(frame, (error) => {
            if (error) reject(error);
            else resolve();
          });
        });
      }
      /**
       * Receive requests
       */
      async *receive() {
        for await (const chunk of this.input) {
          if (this.closed) break;
          const chunkBuffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
          this.byteBuffer = Buffer.concat([this.byteBuffer, chunkBuffer]);
          if (process.env.MCP_TRANSPORT_DEBUG) {
            process.stderr.write(`[TRANSPORT] Received ${chunkBuffer.length} bytes, buffer now ${this.byteBuffer.length} bytes
`);
          }
          while (true) {
            const message = this.extractMessage();
            if (!message) break;
            try {
              const request = JSON.parse(message);
              if (process.env.MCP_DEBUG || process.env.MCP_TRANSPORT_DEBUG) {
                process.stderr.write(`[TRANSPORT] Parsed request id=${request.id} method=${request.method}
`);
              }
              yield request;
            } catch (error) {
              if (process.env.MCP_DEBUG || process.env.MCP_TRANSPORT_DEBUG) {
                process.stderr.write(`[TRANSPORT] Invalid JSON: ${message.substring(0, 100)}...
`);
              }
            }
          }
        }
      }
      /**
       * Close the transport
       */
      async close() {
        this.closed = true;
        if (this.input !== process.stdin) {
          this.input.destroy();
        }
        if (this.output !== process.stdout) {
          this.output.destroy();
        }
      }
      /**
       * Extract a complete message from the buffer - supports both formats
       * Uses byte-based operations for proper Content-Length handling
       */
      extractMessage() {
        const bufferStr = this.byteBuffer.toString("utf8");
        const headerEnd = bufferStr.indexOf("\r\n\r\n");
        if (headerEnd !== -1) {
          const header = bufferStr.slice(0, headerEnd);
          const contentLengthMatch = header.match(/Content-Length:\s*(\d+)/);
          if (contentLengthMatch) {
            const contentLength = parseInt(contentLengthMatch[1], 10);
            const headerBytes = Buffer.byteLength(header + "\r\n\r\n", "utf8");
            const totalNeeded = headerBytes + contentLength;
            if (this.byteBuffer.length >= totalNeeded) {
              const messageBuffer = this.byteBuffer.slice(headerBytes, totalNeeded);
              const message = messageBuffer.toString("utf8");
              this.byteBuffer = this.byteBuffer.slice(totalNeeded);
              return message;
            }
            return null;
          }
        }
        const newlineIndex = bufferStr.indexOf("\n");
        if (newlineIndex === -1) return null;
        const line = bufferStr.slice(0, newlineIndex).trim();
        const bytesToRemove = Buffer.byteLength(bufferStr.slice(0, newlineIndex + 1), "utf8");
        this.byteBuffer = this.byteBuffer.slice(bytesToRemove);
        return line || this.extractMessage();
      }
    };
    __name(_StdioTransport, "StdioTransport");
    StdioTransport = _StdioTransport;
  }
});

// src/modules/mcp/server/MCPServer.ts
var MCPServer_exports = {};
__export(MCPServer_exports, {
  MCPServer: () => MCPServer
});
var import_events2, _MCPServer, MCPServer;
var init_MCPServer = __esm({
  "src/modules/mcp/server/MCPServer.ts"() {
    init_types2();
    init_ToolRegistry();
    init_RequestHandlerService();
    import_events2 = require("events");
    _MCPServer = class _MCPServer extends import_events2.EventEmitter {
      config;
      state;
      toolRegistry;
      requestHandler;
      transport;
      closed = false;
      constructor(config = {}) {
        super();
        this.config = {
          name: config.name ?? "mcp-server",
          version: config.version ?? "1.0.0",
          description: config.description ?? "MCP Server",
          transport: config.transport ?? "stdio" /* STDIO */,
          ...config
        };
        this.state = {
          status: "initializing" /* INITIALIZING */,
          tools: /* @__PURE__ */ new Map(),
          resources: /* @__PURE__ */ new Map(),
          prompts: /* @__PURE__ */ new Map(),
          connections: 0,
          startTime: /* @__PURE__ */ new Date()
        };
        this.toolRegistry = new ToolRegistry();
        this.requestHandler = new RequestHandlerService(this.toolRegistry);
      }
      /**
       * Get the tool registry for external tool registration
       */
      getToolRegistry() {
        return this.toolRegistry;
      }
      /**
       * Initialize the server
       */
      async initialize() {
        try {
          this.setState("initializing" /* INITIALIZING */);
          await this.initializeTransport();
          this.state.tools = this.toolRegistry.getAllTools();
          this.setupHandlers();
          this.setState("ready" /* READY */);
          this.emit("ready");
        } catch (error) {
          this.setState("error" /* ERROR */);
          this.emit("error", error);
          throw error;
        }
      }
      /**
       * Start the server
       */
      async start() {
        if (this.state.status !== "ready" /* READY */) {
          await this.initialize();
        }
        this.setState("connected" /* CONNECTED */);
        this.emit("start");
        this.startListening();
      }
      /**
       * Stop the server
       */
      async stop() {
        this.closed = true;
        this.setState("shutdown" /* SHUTDOWN */);
        if (this.transport) {
          await this.transport.close();
        }
        this.emit("stop");
      }
      /**
       * Handle incoming request
       */
      async handleRequest(request) {
        try {
          if (!request.method) {
            throw this.createError(-32600, "Invalid request: missing method");
          }
          const response = await this.requestHandler.handle(request);
          this.emit("request", { request, response });
          return response;
        } catch (error) {
          return this.createErrorResponse(
            request.id,
            error instanceof Error ? error.message : "Unknown error"
          );
        }
      }
      async initializeTransport() {
        switch (this.config.transport) {
          case "stdio" /* STDIO */:
            const { StdioTransport: StdioTransport2 } = await Promise.resolve().then(() => (init_StdioTransport(), StdioTransport_exports));
            this.transport = new StdioTransport2();
            break;
          default:
            throw new Error(`Unsupported transport: ${this.config.transport}. Only STDIO is supported.`);
        }
      }
      setupHandlers() {
        this.requestHandler.on("tools/list", async () => {
          return Array.from(this.state.tools.values());
        });
        this.requestHandler.on("server/info", async () => {
          return {
            name: this.config.name,
            version: this.config.version,
            description: this.config.description,
            status: this.state.status,
            uptime: Date.now() - this.state.startTime.getTime()
          };
        });
      }
      startListening() {
        if (!this.transport) {
          throw new Error("Transport not initialized");
        }
        this.listen().catch((error) => {
          this.emit("error", error);
        });
      }
      async listen() {
        if (!this.transport) {
          throw new Error("Transport not initialized");
        }
        try {
          for await (const request of this.transport.receive()) {
            const response = await this.handleRequest(request);
            if (response) {
              await this.transport.send(response);
            }
          }
        } catch (error) {
          if (!this.closed) {
            this.emit("error", error);
          }
        }
      }
      setState(status) {
        this.state.status = status;
        this.emit("stateChange", status);
      }
      createError(code, message) {
        return { code, message };
      }
      createErrorResponse(id, message) {
        return {
          id,
          error: this.createError(-32603, message),
          jsonrpc: "2.0"
        };
      }
    };
    __name(_MCPServer, "MCPServer");
    MCPServer = _MCPServer;
  }
});

// node_modules/uuid/dist/esm-node/rng.js
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    import_crypto4.default.randomFillSync(rnds8Pool);
    poolPtr = 0;
  }
  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}
var import_crypto4, rnds8Pool, poolPtr;
var init_rng = __esm({
  "node_modules/uuid/dist/esm-node/rng.js"() {
    import_crypto4 = __toESM(require("crypto"));
    rnds8Pool = new Uint8Array(256);
    poolPtr = rnds8Pool.length;
    __name(rng, "rng");
  }
});

// node_modules/uuid/dist/esm-node/stringify.js
function unsafeStringify(arr, offset = 0) {
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}
var byteToHex;
var init_stringify = __esm({
  "node_modules/uuid/dist/esm-node/stringify.js"() {
    byteToHex = [];
    for (let i = 0; i < 256; ++i) {
      byteToHex.push((i + 256).toString(16).slice(1));
    }
    __name(unsafeStringify, "unsafeStringify");
  }
});

// node_modules/uuid/dist/esm-node/native.js
var import_crypto5, native_default;
var init_native = __esm({
  "node_modules/uuid/dist/esm-node/native.js"() {
    import_crypto5 = __toESM(require("crypto"));
    native_default = {
      randomUUID: import_crypto5.default.randomUUID
    };
  }
});

// node_modules/uuid/dist/esm-node/v4.js
function v4(options, buf, offset) {
  if (native_default.randomUUID && !buf && !options) {
    return native_default.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
var v4_default;
var init_v4 = __esm({
  "node_modules/uuid/dist/esm-node/v4.js"() {
    init_native();
    init_rng();
    init_stringify();
    __name(v4, "v4");
    v4_default = v4;
  }
});

// node_modules/uuid/dist/esm-node/index.js
var init_esm_node = __esm({
  "node_modules/uuid/dist/esm-node/index.js"() {
    init_v4();
  }
});

// src/core/domain/knowledge-graph/entities/knowledge-node.entity.ts
var _KnowledgeNode, KnowledgeNode;
var init_knowledge_node_entity = __esm({
  "src/core/domain/knowledge-graph/entities/knowledge-node.entity.ts"() {
    init_esm_node();
    _KnowledgeNode = class _KnowledgeNode {
      id;
      label;
      type;
      _properties;
      _embedding;
      _outgoingConnections;
      // nodeId -> edgeType
      _incomingConnections;
      // nodeId -> edgeType
      constructor(input) {
        this.id = input.id || v4_default();
        this.label = input.label;
        this.type = input.type;
        this._properties = input.properties ? { ...input.properties } : {};
        this._embedding = input.embedding ? [...input.embedding] : void 0;
        this._outgoingConnections = /* @__PURE__ */ new Map();
        this._incomingConnections = /* @__PURE__ */ new Map();
      }
      // Properties accessors
      get properties() {
        return { ...this._properties };
      }
      get embedding() {
        return this._embedding ? [...this._embedding] : void 0;
      }
      get outgoingConnections() {
        return new Map(this._outgoingConnections);
      }
      get incomingConnections() {
        return new Map(this._incomingConnections);
      }
      get connectionCount() {
        return this._outgoingConnections.size + this._incomingConnections.size;
      }
      // Connection methods
      addConnection(targetId, edgeType) {
        this._outgoingConnections.set(targetId, edgeType);
      }
      addIncomingConnection(sourceId, edgeType) {
        this._incomingConnections.set(sourceId, edgeType);
      }
      removeConnection(targetId) {
        this._outgoingConnections.delete(targetId);
      }
      removeIncomingConnection(sourceId) {
        this._incomingConnections.delete(sourceId);
      }
      isConnectedTo(nodeId) {
        return this._outgoingConnections.has(nodeId) || this._incomingConnections.has(nodeId);
      }
      // Property methods
      getProperty(key) {
        return this._properties[key];
      }
      setProperty(key, value) {
        this._properties[key] = value;
      }
      removeProperty(key) {
        delete this._properties[key];
      }
      // Embedding methods
      setEmbedding(embedding) {
        this._embedding = [...embedding];
      }
      hasEmbedding() {
        return this._embedding !== void 0 && this._embedding.length > 0;
      }
      // Serialization
      toJSON() {
        const connections = Array.from(this._outgoingConnections.entries()).map(
          ([target, type]) => ({ target, type })
        );
        return {
          id: this.id,
          label: this.label,
          type: this.type,
          properties: { ...this._properties },
          embedding: this._embedding ? [...this._embedding] : void 0,
          connections
        };
      }
      static fromJSON(json) {
        const node = new _KnowledgeNode({
          id: json.id,
          label: json.label,
          type: json.type,
          properties: json.properties,
          embedding: json.embedding
        });
        if (json.connections) {
          for (const conn of json.connections) {
            node.addConnection(conn.target, conn.type);
          }
        }
        return node;
      }
      // Clone
      clone() {
        const cloned = new _KnowledgeNode({
          id: v4_default(),
          // New ID for clone
          label: this.label,
          type: this.type,
          properties: { ...this._properties },
          embedding: this._embedding ? [...this._embedding] : void 0
        });
        for (const [target, type] of this._outgoingConnections) {
          cloned.addConnection(target, type);
        }
        for (const [source, type] of this._incomingConnections) {
          cloned.addIncomingConnection(source, type);
        }
        return cloned;
      }
    };
    __name(_KnowledgeNode, "KnowledgeNode");
    KnowledgeNode = _KnowledgeNode;
  }
});

// src/core/domain/knowledge-graph/entities/knowledge-edge.entity.ts
var _KnowledgeEdge, KnowledgeEdge;
var init_knowledge_edge_entity = __esm({
  "src/core/domain/knowledge-graph/entities/knowledge-edge.entity.ts"() {
    _KnowledgeEdge = class _KnowledgeEdge {
      id;
      source;
      target;
      type;
      bidirectional;
      _weight;
      _metadata;
      constructor(input) {
        if (input.source === input.target) {
          throw new Error("Self-referencing edges not allowed");
        }
        if (input.weight !== void 0 && (input.weight < 0 || input.weight > 1)) {
          throw new Error("Weight must be between 0 and 1");
        }
        this.source = input.source;
        this.target = input.target;
        this.type = input.type;
        this._weight = input.weight ?? 1;
        this._metadata = input.metadata ? { ...input.metadata } : {};
        this.bidirectional = input.bidirectional ?? false;
        this.id = `${this.source}->${this.target}:${this.type}`;
      }
      // Weight accessors
      get weight() {
        return this._weight;
      }
      get metadata() {
        return { ...this._metadata };
      }
      // Weight operations
      setWeight(weight) {
        if (weight < 0 || weight > 1) {
          throw new Error("Weight must be between 0 and 1");
        }
        this._weight = weight;
      }
      strengthen(amount) {
        this._weight = Math.min(1, this._weight + amount);
      }
      weaken(amount) {
        this._weight = Math.max(0, this._weight - amount);
      }
      // Metadata operations
      getMetadata(key) {
        return this._metadata[key];
      }
      setMetadata(key, value) {
        this._metadata[key] = value;
      }
      // Comparison
      equals(other) {
        return this.source === other.source && this.target === other.target && this.type === other.type;
      }
      // Create reverse edge
      reverse() {
        return new _KnowledgeEdge({
          source: this.target,
          target: this.source,
          type: this.type,
          weight: this._weight,
          metadata: { ...this._metadata },
          bidirectional: this.bidirectional
        });
      }
      // Serialization
      toJSON() {
        return {
          id: this.id,
          source: this.source,
          target: this.target,
          type: this.type,
          weight: this._weight,
          metadata: { ...this._metadata },
          bidirectional: this.bidirectional
        };
      }
      static fromJSON(json) {
        return new _KnowledgeEdge({
          source: json.source,
          target: json.target,
          type: json.type,
          weight: json.weight,
          metadata: json.metadata,
          bidirectional: json.bidirectional
        });
      }
    };
    __name(_KnowledgeEdge, "KnowledgeEdge");
    KnowledgeEdge = _KnowledgeEdge;
  }
});

// src/core/domain/knowledge-graph/entities/knowledge-graph.aggregate.ts
var _KnowledgeGraph, KnowledgeGraph;
var init_knowledge_graph_aggregate = __esm({
  "src/core/domain/knowledge-graph/entities/knowledge-graph.aggregate.ts"() {
    init_knowledge_node_entity();
    init_knowledge_edge_entity();
    _KnowledgeGraph = class _KnowledgeGraph {
      name;
      metadata;
      _nodes;
      _edges;
      _adjacencyList;
      // outgoing
      _reverseAdjList;
      // incoming
      constructor(options = {}) {
        this.name = options.name || "Knowledge Graph";
        this.metadata = options.metadata ? { ...options.metadata } : {};
        this._nodes = /* @__PURE__ */ new Map();
        this._edges = /* @__PURE__ */ new Map();
        this._adjacencyList = /* @__PURE__ */ new Map();
        this._reverseAdjList = /* @__PURE__ */ new Map();
      }
      // Basic counts
      get nodeCount() {
        return this._nodes.size;
      }
      get edgeCount() {
        return this._edges.size;
      }
      // Node operations
      hasNode(id) {
        return this._nodes.has(id);
      }
      getNode(id) {
        return this._nodes.get(id);
      }
      addNode(node) {
        if (this._nodes.has(node.id)) {
          throw new Error(`Node with ID ${node.id} already exists`);
        }
        this._nodes.set(node.id, node);
        this._adjacencyList.set(node.id, /* @__PURE__ */ new Set());
        this._reverseAdjList.set(node.id, /* @__PURE__ */ new Set());
      }
      removeNode(id) {
        if (!this._nodes.has(id)) return;
        const outgoing = this._adjacencyList.get(id) || /* @__PURE__ */ new Set();
        const incoming = this._reverseAdjList.get(id) || /* @__PURE__ */ new Set();
        for (const targetId of outgoing) {
          this.removeEdge(id, targetId);
        }
        for (const sourceId of incoming) {
          this.removeEdge(sourceId, id);
        }
        this._nodes.delete(id);
        this._adjacencyList.delete(id);
        this._reverseAdjList.delete(id);
      }
      getAllNodes() {
        return Array.from(this._nodes.values());
      }
      getNodesByType(type) {
        return Array.from(this._nodes.values()).filter((n) => n.type === type);
      }
      filterNodes(predicate) {
        return Array.from(this._nodes.values()).filter(predicate);
      }
      // Edge operations
      getEdge(source, target) {
        for (const edge of this._edges.values()) {
          if (edge.source === source && edge.target === target) {
            return edge;
          }
        }
        return void 0;
      }
      addEdge(edge) {
        var _a, _b;
        if (!this._nodes.has(edge.source)) {
          throw new Error(`Source node ${edge.source} does not exist`);
        }
        if (!this._nodes.has(edge.target)) {
          throw new Error(`Target node ${edge.target} does not exist`);
        }
        this._edges.set(edge.id, edge);
        (_a = this._adjacencyList.get(edge.source)) == null ? void 0 : _a.add(edge.target);
        (_b = this._reverseAdjList.get(edge.target)) == null ? void 0 : _b.add(edge.source);
        const sourceNode = this._nodes.get(edge.source);
        const targetNode = this._nodes.get(edge.target);
        sourceNode == null ? void 0 : sourceNode.addConnection(edge.target, edge.type);
        targetNode == null ? void 0 : targetNode.addIncomingConnection(edge.source, edge.type);
      }
      removeEdge(source, target) {
        var _a, _b;
        const edge = this.getEdge(source, target);
        if (!edge) return;
        this._edges.delete(edge.id);
        (_a = this._adjacencyList.get(source)) == null ? void 0 : _a.delete(target);
        (_b = this._reverseAdjList.get(target)) == null ? void 0 : _b.delete(source);
        const sourceNode = this._nodes.get(source);
        const targetNode = this._nodes.get(target);
        sourceNode == null ? void 0 : sourceNode.removeConnection(target);
        targetNode == null ? void 0 : targetNode.removeIncomingConnection(source);
      }
      getAllEdges() {
        return Array.from(this._edges.values());
      }
      getEdgesByType(type) {
        return Array.from(this._edges.values()).filter((e) => e.type === type);
      }
      getOutgoingEdges(nodeId) {
        return Array.from(this._edges.values()).filter((e) => e.source === nodeId);
      }
      getIncomingEdges(nodeId) {
        return Array.from(this._edges.values()).filter((e) => e.target === nodeId);
      }
      // Traversal
      getNeighbors(nodeId, depth = 1, direction = "outgoing") {
        const visited = /* @__PURE__ */ new Set();
        const result = [];
        const queue = [{ id: nodeId, level: 0 }];
        visited.add(nodeId);
        while (queue.length > 0) {
          const current = queue.shift();
          if (current.level > 0 && current.level <= depth) {
            const node = this._nodes.get(current.id);
            if (node) result.push(node);
          }
          if (current.level < depth) {
            const neighbors = [];
            if (direction === "outgoing" || direction === "both") {
              const outgoing = this._adjacencyList.get(current.id) || /* @__PURE__ */ new Set();
              neighbors.push(...outgoing);
            }
            if (direction === "incoming" || direction === "both") {
              const incoming = this._reverseAdjList.get(current.id) || /* @__PURE__ */ new Set();
              neighbors.push(...incoming);
            }
            for (const neighborId of neighbors) {
              if (!visited.has(neighborId)) {
                visited.add(neighborId);
                queue.push({ id: neighborId, level: current.level + 1 });
              }
            }
          }
        }
        return result;
      }
      findPath(startId, endId) {
        if (!this._nodes.has(startId) || !this._nodes.has(endId)) {
          return null;
        }
        const visited = /* @__PURE__ */ new Set();
        const parent = /* @__PURE__ */ new Map();
        const queue = [startId];
        visited.add(startId);
        while (queue.length > 0) {
          const current = queue.shift();
          if (current === endId) {
            const path7 = [];
            let node = endId;
            while (node !== void 0) {
              path7.unshift(this._nodes.get(node));
              node = parent.get(node);
            }
            return path7;
          }
          const outgoing = this._adjacencyList.get(current) || /* @__PURE__ */ new Set();
          for (const neighborId of outgoing) {
            if (!visited.has(neighborId)) {
              visited.add(neighborId);
              parent.set(neighborId, current);
              queue.push(neighborId);
            }
          }
        }
        return null;
      }
      /**
       * Find shortest weighted path using Dijkstra's algorithm
       * Returns path and total weight, or null if no path exists
       */
      findWeightedPath(startId, endId) {
        if (!this._nodes.has(startId) || !this._nodes.has(endId)) {
          return null;
        }
        const distances = /* @__PURE__ */ new Map();
        const previous = /* @__PURE__ */ new Map();
        const unvisited = /* @__PURE__ */ new Set();
        for (const nodeId of this._nodes.keys()) {
          distances.set(nodeId, Infinity);
          unvisited.add(nodeId);
        }
        distances.set(startId, 0);
        while (unvisited.size > 0) {
          let current = null;
          let minDistance = Infinity;
          for (const nodeId of unvisited) {
            const dist = distances.get(nodeId);
            if (dist < minDistance) {
              minDistance = dist;
              current = nodeId;
            }
          }
          if (current === null || minDistance === Infinity) {
            break;
          }
          if (current === endId) {
            break;
          }
          unvisited.delete(current);
          const outgoing = this._adjacencyList.get(current) || /* @__PURE__ */ new Set();
          for (const neighborId of outgoing) {
            if (!unvisited.has(neighborId)) continue;
            const edge = this.getEdge(current, neighborId);
            const weight = (edge == null ? void 0 : edge.weight) ?? 1;
            const altDistance = distances.get(current) + weight;
            if (altDistance < distances.get(neighborId)) {
              distances.set(neighborId, altDistance);
              previous.set(neighborId, current);
            }
          }
        }
        if (distances.get(endId) === Infinity) {
          return null;
        }
        const path7 = [];
        let node = endId;
        while (node !== void 0) {
          path7.unshift(this._nodes.get(node));
          node = previous.get(node);
        }
        return {
          path: path7,
          totalWeight: distances.get(endId)
        };
      }
      traverseBFS(startId, callback) {
        if (!this._nodes.has(startId)) return;
        const visited = /* @__PURE__ */ new Set();
        const queue = [startId];
        visited.add(startId);
        while (queue.length > 0) {
          const current = queue.shift();
          const node = this._nodes.get(current);
          const shouldContinue = callback({
            id: node.id,
            label: node.label,
            type: node.type,
            properties: node.properties
          });
          if (shouldContinue === false) return;
          const outgoing = this._adjacencyList.get(current) || /* @__PURE__ */ new Set();
          for (const neighborId of outgoing) {
            if (!visited.has(neighborId)) {
              visited.add(neighborId);
              queue.push(neighborId);
            }
          }
        }
      }
      traverseDFS(startId, callback) {
        if (!this._nodes.has(startId)) return;
        const visited = /* @__PURE__ */ new Set();
        const dfs = /* @__PURE__ */ __name((nodeId) => {
          if (visited.has(nodeId)) return true;
          visited.add(nodeId);
          const node = this._nodes.get(nodeId);
          const shouldContinue = callback({
            id: node.id,
            label: node.label,
            type: node.type,
            properties: node.properties
          });
          if (shouldContinue === false) return false;
          const outgoing = this._adjacencyList.get(nodeId) || /* @__PURE__ */ new Set();
          for (const neighborId of outgoing) {
            if (!dfs(neighborId)) return false;
          }
          return true;
        }, "dfs");
        dfs(startId);
      }
      // Metrics
      getDegree(nodeId) {
        var _a, _b;
        const outgoing = ((_a = this._adjacencyList.get(nodeId)) == null ? void 0 : _a.size) || 0;
        const incoming = ((_b = this._reverseAdjList.get(nodeId)) == null ? void 0 : _b.size) || 0;
        return outgoing + incoming;
      }
      getTopNodes(count, metric = "degree") {
        const nodes = Array.from(this._nodes.values());
        if (metric === "degree") {
          return nodes.map((n) => ({ node: n, score: this.getDegree(n.id) })).sort((a, b) => b.score - a.score).slice(0, count).map((x) => x.node);
        }
        return nodes.slice(0, count);
      }
      getDensity() {
        const n = this._nodes.size;
        if (n <= 1) return 0;
        const maxEdges = n * (n - 1);
        return this._edges.size / maxEdges;
      }
      getStats() {
        const nodeTypes = {};
        const edgeTypes = {};
        for (const node of this._nodes.values()) {
          nodeTypes[node.type] = (nodeTypes[node.type] || 0) + 1;
        }
        for (const edge of this._edges.values()) {
          edgeTypes[edge.type] = (edgeTypes[edge.type] || 0) + 1;
        }
        let totalDegree = 0;
        let maxDegree = 0;
        for (const nodeId of this._nodes.keys()) {
          const degree = this.getDegree(nodeId);
          totalDegree += degree;
          maxDegree = Math.max(maxDegree, degree);
        }
        const components = this.getConnectedComponents();
        return {
          nodeCount: this._nodes.size,
          edgeCount: this._edges.size,
          density: this.getDensity(),
          nodeTypes,
          edgeTypes,
          avgDegree: this._nodes.size > 0 ? totalDegree / this._nodes.size : 0,
          maxDegree,
          connectedComponents: components.length
        };
      }
      getConnectedComponents() {
        const visited = /* @__PURE__ */ new Set();
        const components = [];
        for (const nodeId of this._nodes.keys()) {
          if (visited.has(nodeId)) continue;
          const component = [];
          const queue = [nodeId];
          while (queue.length > 0) {
            const current = queue.shift();
            if (visited.has(current)) continue;
            visited.add(current);
            component.push(current);
            const outgoing = this._adjacencyList.get(current) || /* @__PURE__ */ new Set();
            const incoming = this._reverseAdjList.get(current) || /* @__PURE__ */ new Set();
            for (const neighbor of [...outgoing, ...incoming]) {
              if (!visited.has(neighbor)) {
                queue.push(neighbor);
              }
            }
          }
          if (component.length > 0) {
            components.push(component);
          }
        }
        return components;
      }
      // Subgraph
      subgraph(nodeIds) {
        const sub = new _KnowledgeGraph({ name: `${this.name} (subgraph)` });
        const nodeIdSet = new Set(nodeIds);
        for (const id of nodeIds) {
          const node = this._nodes.get(id);
          if (node) {
            sub.addNode(new KnowledgeNode({
              id: node.id,
              label: node.label,
              type: node.type,
              properties: node.properties,
              embedding: node.embedding
            }));
          }
        }
        for (const edge of this._edges.values()) {
          if (nodeIdSet.has(edge.source) && nodeIdSet.has(edge.target)) {
            sub.addEdge(new KnowledgeEdge({
              source: edge.source,
              target: edge.target,
              type: edge.type,
              weight: edge.weight,
              metadata: edge.metadata
            }));
          }
        }
        return sub;
      }
      // Serialization
      toJSON() {
        return {
          name: this.name,
          metadata: { ...this.metadata },
          nodes: Array.from(this._nodes.values()).map((n) => n.toJSON()),
          edges: Array.from(this._edges.values()).map((e) => e.toJSON())
        };
      }
      static fromJSON(json) {
        const graph = new _KnowledgeGraph({
          name: json.name,
          metadata: json.metadata
        });
        for (const nodeJson of json.nodes) {
          graph.addNode(KnowledgeNode.fromJSON(nodeJson));
        }
        for (const edgeJson of json.edges) {
          graph.addEdge(KnowledgeEdge.fromJSON(edgeJson));
        }
        return graph;
      }
      // Merge
      static merge(graph1, graph2, options = {}) {
        const merged = new _KnowledgeGraph({
          name: `${graph1.name} + ${graph2.name}`,
          metadata: { ...graph1.metadata, ...graph2.metadata }
        });
        for (const node of graph1.getAllNodes()) {
          merged.addNode(new KnowledgeNode({
            id: node.id,
            label: node.label,
            type: node.type,
            properties: node.properties,
            embedding: node.embedding
          }));
        }
        for (const node of graph2.getAllNodes()) {
          if (merged.hasNode(node.id)) {
            if (options.preferSecond) {
              merged.removeNode(node.id);
              merged.addNode(new KnowledgeNode({
                id: node.id,
                label: node.label,
                type: node.type,
                properties: node.properties,
                embedding: node.embedding
              }));
            }
          } else {
            merged.addNode(new KnowledgeNode({
              id: node.id,
              label: node.label,
              type: node.type,
              properties: node.properties,
              embedding: node.embedding
            }));
          }
        }
        for (const edge of graph1.getAllEdges()) {
          try {
            merged.addEdge(new KnowledgeEdge({
              source: edge.source,
              target: edge.target,
              type: edge.type,
              weight: edge.weight,
              metadata: edge.metadata
            }));
          } catch (e) {
          }
        }
        for (const edge of graph2.getAllEdges()) {
          try {
            merged.addEdge(new KnowledgeEdge({
              source: edge.source,
              target: edge.target,
              type: edge.type,
              weight: edge.weight,
              metadata: edge.metadata
            }));
          } catch (e) {
          }
        }
        return merged;
      }
    };
    __name(_KnowledgeGraph, "KnowledgeGraph");
    KnowledgeGraph = _KnowledgeGraph;
  }
});

// src/core/domain/knowledge-graph/types/knowledge-graph.types.ts
var init_knowledge_graph_types = __esm({
  "src/core/domain/knowledge-graph/types/knowledge-graph.types.ts"() {
  }
});

// src/core/domain/knowledge-graph/index.ts
var init_knowledge_graph = __esm({
  "src/core/domain/knowledge-graph/index.ts"() {
    init_knowledge_node_entity();
    init_knowledge_edge_entity();
    init_knowledge_graph_aggregate();
    init_knowledge_graph_types();
  }
});

// src/core/algorithms/graph/semantic-edge-builder.ts
var _SemanticEdgeBuilder, SemanticEdgeBuilder;
var init_semantic_edge_builder = __esm({
  "src/core/algorithms/graph/semantic-edge-builder.ts"() {
    _SemanticEdgeBuilder = class _SemanticEdgeBuilder {
      defaultThreshold = 0.5;
      /**
       * Calculate cosine similarity between two texts using TF vectors
       */
      calculateSimilarity(content1, content2) {
        const tokens1 = this.tokenize(content1);
        const tokens2 = this.tokenize(content2);
        if (tokens1.length === 0 || tokens2.length === 0) {
          return 0;
        }
        const tf1 = this.createTermFrequencyVector(tokens1);
        const tf2 = this.createTermFrequencyVector(tokens2);
        const allTerms = /* @__PURE__ */ new Set([...tf1.keys(), ...tf2.keys()]);
        let dotProduct = 0;
        let magnitude1 = 0;
        let magnitude2 = 0;
        for (const term of allTerms) {
          const freq1 = tf1.get(term) || 0;
          const freq2 = tf2.get(term) || 0;
          dotProduct += freq1 * freq2;
          magnitude1 += freq1 * freq1;
          magnitude2 += freq2 * freq2;
        }
        const magnitude = Math.sqrt(magnitude1) * Math.sqrt(magnitude2);
        if (magnitude === 0) return 0;
        return dotProduct / magnitude;
      }
      /**
       * Build semantic edges for a set of memories
       */
      buildEdges(memories, options = {}) {
        const threshold = options.threshold ?? this.defaultThreshold;
        const edges = [];
        const edgeSet = /* @__PURE__ */ new Set();
        if (memories.length < 2) {
          return edges;
        }
        const tokenizedMemories = memories.map((m) => ({
          id: m.id,
          content: m.content,
          tokens: this.tokenize(m.content),
          tf: this.createTermFrequencyVector(this.tokenize(m.content))
        }));
        for (let i = 0; i < tokenizedMemories.length; i++) {
          for (let j = i + 1; j < tokenizedMemories.length; j++) {
            const mem1 = tokenizedMemories[i];
            const mem2 = tokenizedMemories[j];
            if (mem1.tokens.length === 0 || mem2.tokens.length === 0) {
              continue;
            }
            const similarity = this.calculateCosineSimilarity(mem1.tf, mem2.tf);
            if (similarity >= threshold) {
              const edgeKey = `${mem1.id}-${mem2.id}`;
              if (!edgeSet.has(edgeKey)) {
                edgeSet.add(edgeKey);
                const matchedTerms = this.findMatchedTerms(mem1.tokens, mem2.tokens);
                edges.push({
                  source: mem1.id,
                  target: mem2.id,
                  type: "semantic",
                  weight: Math.round(similarity * 1e3) / 1e3,
                  // Round to 3 decimal places
                  metadata: {
                    matchedTerms,
                    similarity
                  }
                });
              }
            }
          }
        }
        return edges;
      }
      /**
       * Calculate cosine similarity between two TF vectors
       */
      calculateCosineSimilarity(tf1, tf2) {
        const allTerms = /* @__PURE__ */ new Set([...tf1.keys(), ...tf2.keys()]);
        let dotProduct = 0;
        let magnitude1 = 0;
        let magnitude2 = 0;
        for (const term of allTerms) {
          const freq1 = tf1.get(term) || 0;
          const freq2 = tf2.get(term) || 0;
          dotProduct += freq1 * freq2;
          magnitude1 += freq1 * freq1;
          magnitude2 += freq2 * freq2;
        }
        const magnitude = Math.sqrt(magnitude1) * Math.sqrt(magnitude2);
        if (magnitude === 0) return 0;
        return dotProduct / magnitude;
      }
      /**
       * Find terms that appear in both token sets
       */
      findMatchedTerms(tokens1, tokens2) {
        const set1 = new Set(tokens1);
        const set2 = new Set(tokens2);
        const matched = [];
        for (const token of set1) {
          if (set2.has(token)) {
            matched.push(token);
          }
        }
        return matched;
      }
      /**
       * Tokenize content into lowercase words
       */
      tokenize(content) {
        if (!content || content.trim().length === 0) {
          return [];
        }
        return content.toLowerCase().replace(/[^\w\s]/g, " ").split(/\s+/).filter((token) => token.length > 2);
      }
      /**
       * Create term frequency vector from tokens
       */
      createTermFrequencyVector(tokens) {
        const tf = /* @__PURE__ */ new Map();
        const totalTokens = tokens.length;
        if (totalTokens === 0) {
          return tf;
        }
        for (const token of tokens) {
          tf.set(token, (tf.get(token) || 0) + 1);
        }
        for (const [token, count] of tf.entries()) {
          tf.set(token, count / totalTokens);
        }
        return tf;
      }
    };
    __name(_SemanticEdgeBuilder, "SemanticEdgeBuilder");
    SemanticEdgeBuilder = _SemanticEdgeBuilder;
  }
});

// src/shared/utils/entity-extraction/entity-extractor.util.ts
var _EntityExtractor, EntityExtractor;
var init_entity_extractor_util = __esm({
  "src/shared/utils/entity-extraction/entity-extractor.util.ts"() {
    _EntityExtractor = class _EntityExtractor {
      patterns = [
        {
          type: "email" /* EMAIL */,
          pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
          confidence: 0.95
        },
        {
          type: "url" /* URL */,
          pattern: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g,
          confidence: 0.95
        },
        {
          type: "phone" /* PHONE */,
          pattern: /(\+?[0-9]{1,3}[-.\s]?)?\(?[0-9]{1,4}\)?[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,4}/g,
          confidence: 0.8
        },
        {
          type: "date" /* DATE */,
          pattern: /\b(\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4}|\d{4}[-\/]\d{1,2}[-\/]\d{1,2}|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{1,2},? \d{2,4})\b/gi,
          confidence: 0.85
        },
        {
          type: "time" /* TIME */,
          pattern: /\b([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?(\s?(AM|PM|am|pm))?\b/g,
          confidence: 0.9
        },
        {
          type: "file_path" /* FILE_PATH */,
          pattern: /(?:\/[\w.-]+)+|(?:[a-zA-Z]:)?(?:\\[\w.-]+)+|(?:\.{1,2}\/[\w.-]+)+/g,
          confidence: 0.75
        },
        {
          type: "command" /* COMMAND */,
          pattern: /(?:^|\s)(npm|yarn|git|docker|kubectl|node|python|pip|bash|sh|cmd|powershell)\s+[\w.-]+(?:\s+[\w.-]+)*/gm,
          confidence: 0.85
        },
        {
          type: "api_endpoint" /* API_ENDPOINT */,
          pattern: /(?:GET|POST|PUT|DELETE|PATCH|OPTIONS|HEAD)\s+\/[\w\-\/{}:]+|\/api\/[\w\-\/{}:]+/gi,
          confidence: 0.8
        },
        {
          type: "error_message" /* ERROR_MESSAGE */,
          pattern: /(?:Error|Exception|Failed|Cannot|Unable to|Invalid|Unexpected)[\s:]+[^\n]+/gi,
          confidence: 0.7
        },
        {
          type: "code" /* CODE */,
          pattern: /```[\s\S]*?```|`[^`]+`/g,
          confidence: 0.95,
          transform: /* @__PURE__ */ __name((match) => match.replace(/^```[\w]*\n?|```$/g, "").replace(/^`|`$/g, ""), "transform")
        }
      ];
      technicalTerms = /* @__PURE__ */ new Set([
        "api",
        "rest",
        "graphql",
        "database",
        "sql",
        "nosql",
        "mongodb",
        "postgresql",
        "redis",
        "cache",
        "server",
        "client",
        "frontend",
        "backend",
        "fullstack",
        "microservice",
        "docker",
        "kubernetes",
        "aws",
        "azure",
        "gcp",
        "cloud",
        "authentication",
        "authorization",
        "jwt",
        "oauth",
        "cors",
        "webhook",
        "typescript",
        "javascript",
        "python",
        "java",
        "rust",
        "go",
        "c++",
        "react",
        "angular",
        "vue",
        "svelte",
        "nextjs",
        "express",
        "fastapi",
        "algorithm",
        "datastructure",
        "binary",
        "tree",
        "graph",
        "hash",
        "array",
        "encryption",
        "decryption",
        "ssl",
        "tls",
        "https",
        "tcp",
        "udp",
        "websocket"
      ]);
      /**
       * Extract all entities from text
       */
      extract(text) {
        const entities = [];
        for (const pattern of this.patterns) {
          const matches = this.findMatches(text, pattern);
          entities.push(...matches);
        }
        const technicalTermEntities = this.extractTechnicalTerms(text);
        entities.push(...technicalTermEntities);
        const nameEntities = this.extractNames(text);
        entities.push(...nameEntities);
        return this.deduplicateEntities(entities);
      }
      /**
       * Find matches for a pattern
       */
      findMatches(text, pattern) {
        const entities = [];
        let match;
        pattern.pattern.lastIndex = 0;
        while ((match = pattern.pattern.exec(text)) !== null) {
          const value = pattern.transform ? pattern.transform(match[0]) : match[0];
          entities.push({
            type: pattern.type,
            value,
            confidence: pattern.confidence ?? 0.5,
            position: {
              start: match.index,
              end: match.index + match[0].length
            }
          });
        }
        return entities;
      }
      /**
       * Extract technical terms
       */
      extractTechnicalTerms(text) {
        const entities = [];
        const words = text.toLowerCase().split(/\s+/);
        for (let i = 0; i < words.length; i++) {
          const word = words[i].replace(/[^a-z0-9]/g, "");
          if (this.technicalTerms.has(word)) {
            const position = text.toLowerCase().indexOf(word);
            if (position !== -1) {
              entities.push({
                type: "technical_term" /* TECHNICAL_TERM */,
                value: word,
                confidence: 0.8,
                position: {
                  start: position,
                  end: position + word.length
                }
              });
            }
          }
        }
        return entities;
      }
      /**
       * Extract potential names (simple heuristic)
       */
      extractNames(text) {
        const entities = [];
        const namePattern = /\b[A-Z][a-z]+ [A-Z][a-z]+\b/g;
        let match;
        while ((match = namePattern.exec(text)) !== null) {
          const value = match[0];
          const lowerValue = value.toLowerCase();
          if (!this.isCommonPhrase(lowerValue) && !this.isTechnicalTerm(lowerValue)) {
            entities.push({
              type: "person" /* PERSON */,
              value,
              confidence: 0.6,
              position: {
                start: match.index,
                end: match.index + value.length
              }
            });
          }
        }
        return entities;
      }
      /**
       * Check if phrase is common
       */
      isCommonPhrase(phrase) {
        const common = ["the", "new", "old", "first", "last", "next", "previous"];
        return common.some((word) => phrase.includes(word));
      }
      /**
       * Check if phrase is technical
       */
      isTechnicalTerm(phrase) {
        const words = phrase.split(" ");
        return words.some((word) => this.technicalTerms.has(word));
      }
      /**
       * Deduplicate entities
       */
      deduplicateEntities(entities) {
        const seen = /* @__PURE__ */ new Map();
        for (const entity of entities) {
          const key = `${entity.type}:${entity.value}:${entity.position.start}`;
          if (!seen.has(key)) {
            seen.set(key, entity);
          } else {
            const existing = seen.get(key);
            if (entity.confidence > existing.confidence) {
              seen.set(key, entity);
            }
          }
        }
        return Array.from(seen.values()).sort((a, b) => a.position.start - b.position.start);
      }
      /**
       * Add custom pattern
       */
      addPattern(pattern) {
        this.patterns.push(pattern);
      }
      /**
       * Add technical term
       */
      addTechnicalTerm(term) {
        this.technicalTerms.add(term.toLowerCase());
      }
      /**
       * Get entities by type
       */
      getByType(entities, type) {
        return entities.filter((e) => e.type === type);
      }
      /**
       * Get unique values
       */
      getUniqueValues(entities) {
        return Array.from(new Set(entities.map((e) => e.value)));
      }
    };
    __name(_EntityExtractor, "EntityExtractor");
    EntityExtractor = _EntityExtractor;
  }
});

// src/core/algorithms/graph/entity-node-extractor.ts
var _EntityNodeExtractor, EntityNodeExtractor;
var init_entity_node_extractor = __esm({
  "src/core/algorithms/graph/entity-node-extractor.ts"() {
    init_entity_extractor_util();
    _EntityNodeExtractor = class _EntityNodeExtractor {
      extractor;
      constructor() {
        this.extractor = new EntityExtractor();
      }
      /**
       * Extract entities from memories and create nodes/edges
       */
      extractEntities(memories) {
        const result = {
          nodes: [],
          edges: []
        };
        if (memories.length === 0) {
          return result;
        }
        const entityMap = /* @__PURE__ */ new Map();
        for (const memory of memories) {
          if (!memory.content || memory.content.trim().length === 0) {
            continue;
          }
          const extracted = this.extractor.extract(memory.content);
          for (const entity of extracted) {
            const normalizedValue = this.normalizeValue(entity.value, entity.type);
            const entityKey = `${entity.type}:${normalizedValue}`;
            if (entityMap.has(entityKey)) {
              const existingNode = entityMap.get(entityKey);
              if (!existingNode.sourceMemoryIds.includes(memory.id)) {
                existingNode.sourceMemoryIds.push(memory.id);
              }
            } else {
              const nodeId = this.generateNodeId(entity);
              const node = {
                id: nodeId,
                value: entity.value,
                type: "entity",
                entityType: entity.type,
                confidence: entity.confidence,
                sourceMemoryIds: [memory.id]
              };
              entityMap.set(entityKey, node);
            }
          }
        }
        result.nodes = Array.from(entityMap.values());
        for (const node of result.nodes) {
          for (const memoryId of node.sourceMemoryIds) {
            result.edges.push({
              sourceId: node.id,
              targetId: memoryId,
              type: "references"
            });
          }
        }
        return result;
      }
      /**
       * Normalize entity value for deduplication
       */
      normalizeValue(value, type) {
        let normalized = value.toLowerCase().trim();
        if (type === "url" /* URL */) {
          normalized = normalized.replace(/\/+$/, "");
        }
        if (type === "file_path" /* FILE_PATH */) {
          normalized = normalized.replace(/\\/g, "/");
        }
        return normalized;
      }
      /**
       * Generate unique node ID for entity
       */
      generateNodeId(entity) {
        const normalized = this.normalizeValue(entity.value, entity.type);
        const hash = this.simpleHash(`${entity.type}:${normalized}`);
        return `entity-${entity.type}-${hash}`;
      }
      /**
       * Simple hash function for generating IDs
       */
      simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
          const char = str.charCodeAt(i);
          hash = (hash << 5) - hash + char;
          hash = hash & hash;
        }
        return Math.abs(hash).toString(36);
      }
    };
    __name(_EntityNodeExtractor, "EntityNodeExtractor");
    EntityNodeExtractor = _EntityNodeExtractor;
  }
});

// src/core/algorithms/graph/graph-pagerank.ts
var _GraphPageRank, GraphPageRank;
var init_graph_pagerank = __esm({
  "src/core/algorithms/graph/graph-pagerank.ts"() {
    _GraphPageRank = class _GraphPageRank {
      /**
       * Calculate PageRank scores for all nodes in the graph
       */
      calculate(graph, options = {}) {
        const damping = options.damping ?? 0.85;
        const iterations = options.iterations ?? 100;
        const nodes = graph.getAllNodes();
        const n = nodes.length;
        if (n === 0) {
          return /* @__PURE__ */ new Map();
        }
        if (n === 1) {
          const result = /* @__PURE__ */ new Map();
          result.set(nodes[0].id, 1);
          return result;
        }
        const ranks = /* @__PURE__ */ new Map();
        for (const node of nodes) {
          ranks.set(node.id, 1 / n);
        }
        const incomingEdges = /* @__PURE__ */ new Map();
        const outgoingCount = /* @__PURE__ */ new Map();
        for (const node of nodes) {
          incomingEdges.set(node.id, []);
          outgoingCount.set(node.id, 0);
        }
        for (const edge of graph.getAllEdges()) {
          const incoming = incomingEdges.get(edge.target);
          if (incoming) {
            incoming.push(edge.source);
          }
          outgoingCount.set(edge.source, (outgoingCount.get(edge.source) || 0) + 1);
        }
        const danglingNodes = [];
        for (const node of nodes) {
          if ((outgoingCount.get(node.id) || 0) === 0) {
            danglingNodes.push(node.id);
          }
        }
        for (let i = 0; i < iterations; i++) {
          const newRanks = /* @__PURE__ */ new Map();
          let danglingSum = 0;
          for (const danglingId of danglingNodes) {
            danglingSum += ranks.get(danglingId) || 0;
          }
          const danglingContribution = damping * danglingSum / n;
          for (const node of nodes) {
            let rank = (1 - damping) / n + danglingContribution;
            const incoming = incomingEdges.get(node.id) || [];
            for (const sourceId of incoming) {
              const sourceOutCount = outgoingCount.get(sourceId) || 1;
              if (sourceOutCount > 0) {
                const sourceRank = ranks.get(sourceId) || 0;
                rank += damping * (sourceRank / sourceOutCount);
              }
            }
            newRanks.set(node.id, rank);
          }
          for (const [nodeId, rank] of newRanks) {
            ranks.set(nodeId, rank);
          }
        }
        return ranks;
      }
      /**
       * Get top N nodes by PageRank score
       */
      getTopNodes(graph, count, options = {}) {
        const scores = this.calculate(graph, options);
        const nodes = graph.getAllNodes();
        const rankedNodes = nodes.map((node) => ({
          id: node.id,
          label: node.label,
          type: node.type,
          pagerank: scores.get(node.id) || 0
        }));
        rankedNodes.sort((a, b) => b.pagerank - a.pagerank);
        return rankedNodes.slice(0, Math.min(count, rankedNodes.length));
      }
    };
    __name(_GraphPageRank, "GraphPageRank");
    GraphPageRank = _GraphPageRank;
  }
});

// src/core/services/knowledge-graph/graph-builder.service.ts
var MAX_LABEL_LENGTH, _GraphBuilderService, GraphBuilderService;
var init_graph_builder_service = __esm({
  "src/core/services/knowledge-graph/graph-builder.service.ts"() {
    init_knowledge_graph();
    init_semantic_edge_builder();
    init_entity_node_extractor();
    init_graph_pagerank();
    MAX_LABEL_LENGTH = 100;
    _GraphBuilderService = class _GraphBuilderService {
      /**
       * Build graph from memory entries
       */
      buildFromMemories(memories) {
        var _a, _b;
        const graph = new KnowledgeGraph({ name: "Memory Graph" });
        const tagIndex = /* @__PURE__ */ new Map();
        const projectIndex = /* @__PURE__ */ new Map();
        for (const memory of memories) {
          const node = this.createNodeFromMemory(memory);
          graph.addNode(node);
          const tags = (_a = memory.metadata) == null ? void 0 : _a.tags;
          const project = (_b = memory.metadata) == null ? void 0 : _b.project;
          if (tags) {
            for (const tag of tags) {
              if (!tagIndex.has(tag)) {
                tagIndex.set(tag, []);
              }
              tagIndex.get(tag).push(memory.id);
            }
          }
          if (project) {
            if (!projectIndex.has(project)) {
              projectIndex.set(project, []);
            }
            projectIndex.get(project).push(memory.id);
          }
        }
        this.createEdgesFromIndex(graph, tagIndex);
        this.createEdgesFromIndex(graph, projectIndex);
        return graph;
      }
      /**
       * Build graph with enhanced features
       * Includes semantic edges, entity extraction, and PageRank
       */
      buildWithFeatures(memories, options = {}) {
        const graph = this.buildFromMemories(memories);
        const result = { graph };
        if (options.includeSemanticEdges) {
          const semanticBuilder = new SemanticEdgeBuilder();
          const threshold = options.semanticThreshold ?? 0.5;
          const semanticEdges = semanticBuilder.buildEdges(
            memories.map((m) => ({ id: m.id, content: m.content })),
            { threshold }
          );
          let addedCount = 0;
          for (const edge of semanticEdges) {
            try {
              graph.addEdge(new KnowledgeEdge({
                source: edge.source,
                target: edge.target,
                type: "semantic" /* SEMANTIC */,
                weight: edge.weight,
                metadata: edge.metadata
              }));
              addedCount++;
            } catch (e) {
            }
          }
          result.semanticEdgeCount = addedCount;
        }
        if (options.extractEntities) {
          const entityExtractor = new EntityNodeExtractor();
          const extraction = entityExtractor.extractEntities(
            memories.map((m) => ({ id: m.id, content: m.content }))
          );
          for (const entityNode of extraction.nodes) {
            try {
              graph.addNode(new KnowledgeNode({
                id: entityNode.id,
                label: entityNode.value,
                type: "entity" /* ENTITY */,
                properties: {
                  entityType: entityNode.entityType,
                  confidence: entityNode.confidence,
                  sourceMemoryIds: entityNode.sourceMemoryIds
                }
              }));
            } catch (e) {
            }
          }
          for (const edge of extraction.edges) {
            try {
              graph.addEdge(new KnowledgeEdge({
                source: edge.sourceId,
                target: edge.targetId,
                type: "references" /* REFERENCES */
              }));
            } catch (e) {
            }
          }
          result.entityCount = extraction.nodes.length;
        }
        if (options.calculatePageRank) {
          const pagerank = new GraphPageRank();
          result.pageRankScores = pagerank.calculate(graph);
        }
        return result;
      }
      /**
       * Build graph from path entries
       */
      buildFromPaths(paths) {
        const graph = new KnowledgeGraph({ name: "Path Graph" });
        for (const pathInput of paths) {
          const node = new KnowledgeNode({
            id: pathInput.path,
            label: pathInput.path,
            type: "path" /* PATH */,
            properties: {
              memoryType: pathInput.memoryType,
              version: pathInput.version,
              changes: pathInput.changes
            }
          });
          graph.addNode(node);
        }
        const pathSet = new Set(paths.map((p) => p.path));
        for (const pathInput of paths) {
          const parent = this.getParentPath(pathInput.path);
          if (parent && pathSet.has(parent)) {
            try {
              graph.addEdge(new KnowledgeEdge({
                source: parent,
                target: pathInput.path,
                type: "contains" /* CONTAINS */
              }));
            } catch (e) {
            }
          }
        }
        return graph;
      }
      /**
       * Build graph from relationship data
       */
      buildFromRelationships(nodes, relationships) {
        const graph = new KnowledgeGraph({ name: "Relationship Graph" });
        for (const nodeInput of nodes) {
          graph.addNode(new KnowledgeNode({
            id: nodeInput.id,
            label: nodeInput.label,
            type: nodeInput.type || "memory" /* MEMORY */
          }));
        }
        for (const rel of relationships) {
          if (!graph.hasNode(rel.sourceId) || !graph.hasNode(rel.targetId)) {
            continue;
          }
          const edgeType = this.mapRelationshipType(rel.type);
          graph.addEdge(new KnowledgeEdge({
            source: rel.sourceId,
            target: rel.targetId,
            type: edgeType,
            weight: rel.weight,
            metadata: rel.metadata
          }));
        }
        return graph;
      }
      /**
       * Build from all sources combined
       */
      buildFromAll(input) {
        const graph = new KnowledgeGraph({ name: "Combined Knowledge Graph" });
        if (input.memories) {
          for (const memory of input.memories) {
            const node = this.createNodeFromMemory(memory);
            graph.addNode(node);
          }
        }
        if (input.paths) {
          for (const pathInput of input.paths) {
            if (!graph.hasNode(pathInput.path)) {
              graph.addNode(new KnowledgeNode({
                id: pathInput.path,
                label: pathInput.path,
                type: "path" /* PATH */,
                properties: {
                  version: pathInput.version
                }
              }));
            }
          }
        }
        if (input.relationships) {
          for (const rel of input.relationships) {
            if (!graph.hasNode(rel.sourceId) || !graph.hasNode(rel.targetId)) {
              continue;
            }
            const edgeType = this.mapRelationshipType(rel.type);
            try {
              graph.addEdge(new KnowledgeEdge({
                source: rel.sourceId,
                target: rel.targetId,
                type: edgeType,
                weight: rel.weight
              }));
            } catch (e) {
            }
          }
        }
        return graph;
      }
      /**
       * Add a single memory to an existing graph
       */
      addMemoryToGraph(graph, memory) {
        const node = this.createNodeFromMemory(memory);
        graph.addNode(node);
      }
      /**
       * Add a relationship to an existing graph
       */
      addRelationshipToGraph(graph, relationship) {
        if (!graph.hasNode(relationship.sourceId) || !graph.hasNode(relationship.targetId)) {
          throw new Error("Source or target node not found");
        }
        const edgeType = this.mapRelationshipType(relationship.type);
        graph.addEdge(new KnowledgeEdge({
          source: relationship.sourceId,
          target: relationship.targetId,
          type: edgeType,
          weight: relationship.weight
        }));
      }
      /**
       * Remove a node from an existing graph
       */
      removeNodeFromGraph(graph, nodeId) {
        graph.removeNode(nodeId);
      }
      // Private helpers
      createNodeFromMemory(memory) {
        const label = this.truncateLabel(memory.content);
        const nodeType = this.mapMemoryType(memory.memoryType);
        const properties = {
          createdAt: memory.createdAt
        };
        if (memory.metadata) {
          for (const [key, value] of Object.entries(memory.metadata)) {
            properties[key] = value;
          }
        }
        return new KnowledgeNode({
          id: memory.id,
          label,
          type: nodeType,
          properties
        });
      }
      truncateLabel(content) {
        if (content.length <= MAX_LABEL_LENGTH) {
          return content;
        }
        return content.substring(0, MAX_LABEL_LENGTH) + "...";
      }
      mapMemoryType(memoryType) {
        switch (memoryType.toLowerCase()) {
          case "task":
            return "task" /* TASK */;
          case "path":
            return "path" /* PATH */;
          case "concept":
            return "concept" /* CONCEPT */;
          case "entity":
            return "entity" /* ENTITY */;
          default:
            return "memory" /* MEMORY */;
        }
      }
      mapRelationshipType(type) {
        switch (type.toLowerCase()) {
          case "depends_on":
            return "depends_on" /* DEPENDS_ON */;
          case "references":
            return "references" /* REFERENCES */;
          case "contradicts":
            return "contradicts" /* CONTRADICTS */;
          case "semantic":
            return "semantic" /* SEMANTIC */;
          case "temporal":
            return "temporal" /* TEMPORAL */;
          case "contains":
            return "contains" /* CONTAINS */;
          case "tagged_with":
            return "tagged_with" /* TAGGED_WITH */;
          case "belongs_to":
            return "belongs_to" /* BELONGS_TO */;
          default:
            return "related" /* RELATED */;
        }
      }
      getParentPath(path7) {
        const lastSlash = path7.lastIndexOf("/");
        if (lastSlash <= 0) return null;
        return path7.substring(0, lastSlash);
      }
      createEdgesFromIndex(graph, index) {
        const edgeSet = /* @__PURE__ */ new Set();
        for (const ids of index.values()) {
          if (ids.length < 2) continue;
          for (let i = 0; i < ids.length - 1; i++) {
            for (let j = i + 1; j < ids.length; j++) {
              const edgeKey = `${ids[i]}-${ids[j]}`;
              const reverseKey = `${ids[j]}-${ids[i]}`;
              if (edgeSet.has(edgeKey) || edgeSet.has(reverseKey)) {
                continue;
              }
              try {
                graph.addEdge(new KnowledgeEdge({
                  source: ids[i],
                  target: ids[j],
                  type: "related" /* RELATED */
                }));
                edgeSet.add(edgeKey);
              } catch (e) {
              }
            }
          }
        }
      }
    };
    __name(_GraphBuilderService, "GraphBuilderService");
    GraphBuilderService = _GraphBuilderService;
  }
});

// src/core/services/knowledge-graph/index.ts
var init_knowledge_graph2 = __esm({
  "src/core/services/knowledge-graph/index.ts"() {
    init_graph_builder_service();
  }
});

// src/modules/mcp/tools/knowledge-graph.schemas.ts
var KnowledgeGraphInput, KnowledgeGraphOutput;
var init_knowledge_graph_schemas = __esm({
  "src/modules/mcp/tools/knowledge-graph.schemas.ts"() {
    init_zod();
    KnowledgeGraphInput = {
      action: external_exports.enum(["build", "query", "traverse", "stats"]).describe("Action to perform"),
      source: external_exports.enum(["memories", "paths", "relationships", "all"]).optional().describe("Data source for building graph"),
      filters: external_exports.object({
        memory_type: external_exports.string().optional(),
        project: external_exports.string().optional(),
        tags: external_exports.array(external_exports.string()).optional()
      }).optional().describe("Filters for querying memories"),
      format: external_exports.enum(["json", "dot", "mermaid"]).optional().describe("Output format"),
      node_type: external_exports.string().optional().describe("Filter nodes by type"),
      search: external_exports.string().optional().describe("Search nodes by label"),
      limit: external_exports.number().min(1).max(100).optional().describe("Limit number of results"),
      start_node: external_exports.string().optional().describe("Starting node ID for traversal"),
      end_node: external_exports.string().optional().describe("End node ID for path finding"),
      depth: external_exports.number().min(1).max(10).optional().describe("Traversal depth"),
      include_top_nodes: external_exports.boolean().optional().describe("Include top nodes by degree in stats"),
      top_count: external_exports.number().min(1).max(20).optional().describe("Number of top nodes to include"),
      // Enhanced build options
      // TODO: Disabled - TF-IDF similarity is too basic. Re-enable when vector embeddings are available.
      // include_semantic_edges: z.boolean().optional(),
      // similarity_threshold: z.number().min(0).max(1).optional(),
      extract_entities: external_exports.boolean().optional().describe("Extract and add entity nodes from memory content"),
      calculate_pagerank: external_exports.boolean().optional().describe("Calculate PageRank scores for all nodes")
    };
    KnowledgeGraphOutput = {
      success: external_exports.boolean(),
      message: external_exports.string().optional(),
      graph: external_exports.object({
        nodes: external_exports.array(external_exports.object({
          id: external_exports.string(),
          label: external_exports.string(),
          type: external_exports.string(),
          pagerank: external_exports.number().optional()
        })),
        edges: external_exports.array(external_exports.object({
          source: external_exports.string(),
          target: external_exports.string(),
          type: external_exports.string(),
          weight: external_exports.number()
        }))
      }).optional(),
      stats: external_exports.object({
        nodeCount: external_exports.number(),
        edgeCount: external_exports.number(),
        density: external_exports.number(),
        nodeTypes: external_exports.record(external_exports.number()).optional(),
        edgeTypes: external_exports.record(external_exports.number()).optional()
      }).optional(),
      enhancements: external_exports.object({
        semanticEdgeCount: external_exports.number().optional(),
        entityCount: external_exports.number().optional(),
        pagerankCalculated: external_exports.boolean().optional()
      }).optional(),
      hints: external_exports.array(external_exports.object({
        type: external_exports.string(),
        text: external_exports.string()
      })).optional(),
      // Query results
      nodes: external_exports.array(external_exports.any()).optional(),
      count: external_exports.number().optional(),
      // Traversal results
      path: external_exports.array(external_exports.any()).optional(),
      pathLength: external_exports.number().optional(),
      neighbors: external_exports.array(external_exports.any()).optional(),
      neighborCount: external_exports.number().optional(),
      startNode: external_exports.any().optional(),
      topNodes: external_exports.array(external_exports.any()).optional(),
      error: external_exports.string().optional()
    };
  }
});

// src/modules/mcp/tools/KnowledgeGraphTool.ts
var KnowledgeGraphTool_exports = {};
__export(KnowledgeGraphTool_exports, {
  KnowledgeGraphTool: () => KnowledgeGraphTool
});
var _KnowledgeGraphTool, KnowledgeGraphTool;
var init_KnowledgeGraphTool = __esm({
  "src/modules/mcp/tools/KnowledgeGraphTool.ts"() {
    init_types2();
    init_knowledge_graph2();
    init_knowledge_graph();
    init_zod_tool_helper();
    init_knowledge_graph_schemas();
    _KnowledgeGraphTool = class _KnowledgeGraphTool {
      memoryService;
      multiProjectService;
      graphBuilder;
      currentGraph = null;
      constructor(memoryService, multiProjectService) {
        this.memoryService = memoryService;
        this.multiProjectService = multiProjectService;
        this.graphBuilder = new GraphBuilderService();
      }
      getTool() {
        return {
          name: "knowledge_graph",
          title: "Knowledge Graph",
          description: "Build and query knowledge graphs from memories. Supports graph traversal, statistics, and multiple output formats (JSON, DOT, Mermaid).",
          category: "analysis" /* ANALYSIS */,
          inputSchema: zodToJsonSchema(KnowledgeGraphInput),
          outputSchema: KnowledgeGraphOutput,
          handler: /* @__PURE__ */ __name(async (params) => this.handle(params), "handler")
        };
      }
      /**
       * Get JSON Schema version for backwards compatibility
       * @deprecated Use getTool() which now uses zodToJsonSchema()
       */
      getToolWithJsonSchema() {
        return this.getTool();
      }
      async handle(params) {
        try {
          const validSources = ["memories", "paths", "relationships", "all"];
          if (params.source !== void 0 && !validSources.includes(params.source)) {
            return this.errorResponse(`Invalid source: "${params.source}". Valid sources: ${validSources.join(", ")}`);
          }
          const validFormats = ["json", "dot", "mermaid"];
          if (params.format !== void 0 && !validFormats.includes(params.format)) {
            return this.errorResponse(`Invalid format: "${params.format}". Valid formats: ${validFormats.join(", ")}`);
          }
          if (params.limit !== void 0) {
            if (!Number.isInteger(params.limit) || params.limit < 1 || params.limit > 100) {
              return this.errorResponse("Limit must be an integer between 1 and 100");
            }
          }
          if (params.depth !== void 0) {
            if (!Number.isInteger(params.depth) || params.depth < 1 || params.depth > 10) {
              return this.errorResponse("Depth must be an integer between 1 and 10");
            }
          }
          if (params.top_count !== void 0) {
            if (!Number.isInteger(params.top_count) || params.top_count < 1 || params.top_count > 20) {
              return this.errorResponse("top_count must be an integer between 1 and 20");
            }
          }
          switch (params.action) {
            case "build":
              return await this.handleBuild(params);
            case "query":
              return await this.handleQuery(params);
            case "traverse":
              return await this.handleTraverse(params);
            case "stats":
              return await this.handleStats(params);
            default:
              return this.errorResponse(`Unknown action: ${params.action}`);
          }
        } catch (error) {
          return this.errorResponse(
            error instanceof Error ? error.message : "Operation failed"
          );
        }
      }
      async handleBuild(params) {
        var _a;
        let memories;
        if (this.multiProjectService && ((_a = params.filters) == null ? void 0 : _a.project)) {
          const result = await this.multiProjectService.query(params.filters);
          memories = result.results || [];
        } else if (this.multiProjectService) {
          const result = await this.multiProjectService.query(params.filters || {});
          memories = result.results || [];
        } else {
          const singleProjectFilters = { ...params.filters };
          if (singleProjectFilters) {
            delete singleProjectFilters.project;
          }
          memories = await this.memoryService.query(singleProjectFilters || {});
        }
        const memoryInputs = memories.map((m) => ({
          id: m.id,
          content: m.content,
          memoryType: m.memoryType || m.memory_type || "knowledge",
          metadata: m.metadata,
          createdAt: m.createdAt || /* @__PURE__ */ new Date()
        }));
        const useEnhancedBuild = params.extract_entities || params.calculate_pagerank;
        let pageRankScores;
        let enhancements = {};
        if (useEnhancedBuild) {
          const buildOptions = {
            // TODO: Disabled - TF-IDF similarity is too basic. Re-enable when vector embeddings are available.
            // includeSemanticEdges: params.include_semantic_edges,
            // semanticThreshold: params.similarity_threshold ?? 0.5,
            includeSemanticEdges: false,
            extractEntities: params.extract_entities,
            calculatePageRank: params.calculate_pagerank
          };
          const result = this.graphBuilder.buildWithFeatures(memoryInputs, buildOptions);
          this.currentGraph = result.graph;
          pageRankScores = result.pageRankScores;
          if (result.semanticEdgeCount !== void 0) {
            enhancements.semanticEdgeCount = result.semanticEdgeCount;
          }
          if (result.entityCount !== void 0) {
            enhancements.entityCount = result.entityCount;
          }
          if (params.calculate_pagerank) {
            enhancements.pagerankCalculated = true;
          }
        } else {
          this.currentGraph = this.graphBuilder.buildFromMemories(memoryInputs);
        }
        const stats = this.currentGraph.getStats();
        const format = params.format || "json";
        const output = {
          success: true,
          message: `Built knowledge graph with ${stats.nodeCount} nodes and ${stats.edgeCount} edges`,
          stats: {
            nodeCount: stats.nodeCount,
            edgeCount: stats.edgeCount,
            density: stats.density,
            nodeTypes: stats.nodeTypes,
            edgeTypes: stats.edgeTypes
          },
          hints: this.getBuildHints(stats)
        };
        if (Object.keys(enhancements).length > 0) {
          output.enhancements = enhancements;
        }
        const includeFullGraph = stats.nodeCount <= 50;
        if (format === "json" && includeFullGraph) {
          output.graph = {
            nodes: this.currentGraph.getAllNodes().map((n) => {
              const node = {
                id: n.id,
                label: n.label,
                type: n.type
              };
              if (pageRankScores && pageRankScores.has(n.id)) {
                node.pagerank = Math.round(pageRankScores.get(n.id) * 1e4) / 1e4;
              }
              return node;
            }),
            edges: this.currentGraph.getAllEdges().map((e) => ({
              source: e.source,
              target: e.target,
              type: e.type,
              weight: e.weight
            }))
          };
          output.format = "json";
        } else if (format === "dot" && includeFullGraph) {
          output.dot = this.formatAsDot(this.currentGraph);
          output.format = "dot";
        } else if (format === "mermaid" && includeFullGraph) {
          output.mermaid = this.formatAsMermaid(this.currentGraph);
          output.format = "mermaid";
        } else {
          output.note = `Graph has ${stats.nodeCount} nodes. Use action: "query" with search/limit to explore specific nodes, or action: "stats" for detailed statistics.`;
        }
        return this.successResponse(output);
      }
      async handleQuery(params) {
        if (!this.currentGraph) {
          return this.errorResponse('No graph built. Use action: "build" first.');
        }
        let nodes = this.currentGraph.getAllNodes();
        if (params.node_type) {
          const nodeType = params.node_type.toLowerCase();
          nodes = nodes.filter((n) => n.type.toLowerCase() === nodeType);
        }
        if (params.search) {
          const searchLower = params.search.toLowerCase();
          nodes = nodes.filter((n) => n.label.toLowerCase().includes(searchLower));
        }
        if (params.limit) {
          nodes = nodes.slice(0, params.limit);
        }
        const format = params.format || "json";
        const output = {
          success: true,
          nodes: nodes.map((n) => ({
            id: n.id,
            label: n.label,
            type: n.type,
            properties: n.properties,
            connectionCount: n.connectionCount
          })),
          count: nodes.length,
          format
        };
        if (format === "dot") {
          const subgraph = this.currentGraph.subgraph(nodes.map((n) => n.id));
          output.dot = this.formatAsDot(subgraph);
        } else if (format === "mermaid") {
          const subgraph = this.currentGraph.subgraph(nodes.map((n) => n.id));
          output.mermaid = this.formatAsMermaid(subgraph);
        }
        return this.successResponse(output);
      }
      async handleTraverse(params) {
        if (!this.currentGraph) {
          return this.errorResponse('No graph built. Use action: "build" first.');
        }
        const startNode = params.start_node;
        if (!startNode) {
          return this.errorResponse("start_node is required for traversal");
        }
        if (!this.currentGraph.hasNode(startNode)) {
          return this.errorResponse(`Node "${startNode}" not found in graph`);
        }
        const depth = params.depth || 2;
        const output = { success: true };
        if (params.end_node) {
          const path7 = this.currentGraph.findPath(startNode, params.end_node);
          if (path7) {
            output.path = path7.map((n) => ({
              id: n.id,
              label: n.label,
              type: n.type
            }));
            output.pathLength = path7.length;
          } else {
            output.path = null;
            output.message = `No path found between "${startNode}" and "${params.end_node}"`;
          }
        } else {
          const neighbors = this.currentGraph.getNeighbors(startNode, depth);
          output.neighbors = neighbors.map((n) => ({
            id: n.id,
            label: n.label,
            type: n.type
          }));
          output.neighborCount = neighbors.length;
          output.depth = depth;
          const startNodeData = this.currentGraph.getNode(startNode);
          if (startNodeData) {
            output.startNode = {
              id: startNodeData.id,
              label: startNodeData.label,
              type: startNodeData.type
            };
          }
        }
        return this.successResponse(output);
      }
      async handleStats(params) {
        if (!this.currentGraph) {
          return this.errorResponse('No graph built. Use action: "build" first.');
        }
        const stats = this.currentGraph.getStats();
        const output = {
          success: true,
          stats: {
            nodeCount: stats.nodeCount,
            edgeCount: stats.edgeCount,
            density: Math.round(stats.density * 1e3) / 1e3,
            avgDegree: Math.round(stats.avgDegree * 100) / 100,
            maxDegree: stats.maxDegree,
            connectedComponents: stats.connectedComponents,
            nodeTypes: stats.nodeTypes,
            edgeTypes: stats.edgeTypes
          }
        };
        if (params.include_top_nodes) {
          const topCount = params.top_count || 5;
          const topNodes = this.currentGraph.getTopNodes(topCount, "degree");
          output.topNodes = topNodes.map((n) => ({
            id: n.id,
            label: n.label,
            type: n.type,
            degree: this.currentGraph.getDegree(n.id)
          }));
        }
        return this.successResponse(output);
      }
      // Formatting helpers
      formatAsDot(graph) {
        const lines = ["digraph KnowledgeGraph {"];
        lines.push("  rankdir=LR;");
        lines.push("  node [shape=box];");
        for (const node of graph.getAllNodes()) {
          const label = this.escapeLabel(node.label);
          const color = this.getNodeColor(node.type);
          lines.push(`  "${node.id}" [label="${label}" fillcolor="${color}" style=filled];`);
        }
        for (const edge of graph.getAllEdges()) {
          const label = edge.type;
          lines.push(`  "${edge.source}" -> "${edge.target}" [label="${label}"];`);
        }
        lines.push("}");
        return lines.join("\n");
      }
      formatAsMermaid(graph) {
        const lines = ["graph LR"];
        for (const edge of graph.getAllEdges()) {
          const sourceNode = graph.getNode(edge.source);
          const targetNode = graph.getNode(edge.target);
          const sourceLabel = this.escapeLabel((sourceNode == null ? void 0 : sourceNode.label) || edge.source);
          const targetLabel = this.escapeLabel((targetNode == null ? void 0 : targetNode.label) || edge.target);
          lines.push(`  ${edge.source}["${sourceLabel}"] -->|${edge.type}| ${edge.target}["${targetLabel}"]`);
        }
        for (const node of graph.getAllNodes()) {
          if (node.connectionCount === 0) {
            const label = this.escapeLabel(node.label);
            lines.push(`  ${node.id}["${label}"]`);
          }
        }
        return lines.join("\n");
      }
      escapeLabel(label) {
        return label.substring(0, 50).replace(/"/g, '\\"').replace(/\n/g, " ").replace(/[<>]/g, "");
      }
      getNodeColor(type) {
        const colors = {
          ["memory" /* MEMORY */]: "#ADD8E6",
          ["concept" /* CONCEPT */]: "#90EE90",
          ["entity" /* ENTITY */]: "#FFB6C1",
          ["path" /* PATH */]: "#DDA0DD",
          ["tag" /* TAG */]: "#F0E68C",
          ["project" /* PROJECT */]: "#87CEEB",
          ["task" /* TASK */]: "#FFA07A"
        };
        return colors[type] || "#FFFFFF";
      }
      getBuildHints(stats) {
        const hints = [];
        hints.push({
          type: "tip",
          text: 'Use action: "traverse" with start_node to explore connections'
        });
        if (stats.nodeCount > 100) {
          hints.push({
            type: "suggestion",
            text: "Large graph. Use query with filters or limit to focus results"
          });
        }
        if (stats.density < 0.1) {
          hints.push({
            type: "info",
            text: "Sparse graph. Consider adding more relationships"
          });
        }
        if (stats.connectedComponents > 1) {
          hints.push({
            type: "warning",
            text: `Graph has ${stats.connectedComponents} disconnected components`
          });
        }
        return hints;
      }
      successResponse(data) {
        return {
          content: [{
            type: "text",
            text: JSON.stringify(data)
          }],
          // SDK 1.22+: Return structured content for type-safe consumption
          structuredContent: data
        };
      }
      errorResponse(message) {
        const errorData = {
          success: false,
          error: message
        };
        return {
          content: [{
            type: "text",
            text: JSON.stringify(errorData)
          }],
          structuredContent: errorData,
          isError: true
        };
      }
    };
    __name(_KnowledgeGraphTool, "KnowledgeGraphTool");
    KnowledgeGraphTool = _KnowledgeGraphTool;
  }
});

// src/core/task-system/unified-task/unified-rules.interface.ts
function getRuleTemplate(type) {
  const template = RULE_TEMPLATES[type] || RULE_TEMPLATES.implementation;
  return {
    mustComplete: [...template.mustComplete],
    successCriteria: [...template.successCriteria],
    shouldAvoid: template.shouldAvoid ? [...template.shouldAvoid] : void 0,
    hints: template.hints ? [...template.hints] : void 0
  };
}
function createPhaseRules(name, description, template, customRules) {
  const baseRules = template ? getRuleTemplate(template) : RULE_TEMPLATES.implementation;
  return {
    mustComplete: (customRules == null ? void 0 : customRules.mustComplete) || baseRules.mustComplete,
    successCriteria: (customRules == null ? void 0 : customRules.successCriteria) || baseRules.successCriteria,
    shouldAvoid: (customRules == null ? void 0 : customRules.shouldAvoid) || baseRules.shouldAvoid,
    hints: baseRules.hints,
    memory: {
      shortDescription: description,
      goal: (customRules == null ? void 0 : customRules.goal) || baseRules.successCriteria[0],
      keyPoints: ((customRules == null ? void 0 : customRules.mustComplete) || baseRules.mustComplete).slice(0, 3)
    },
    progress: {
      format: "{completed} of {total} tasks completed",
      showPercentage: true,
      showProgressBar: true
    }
  };
}
var RULE_TEMPLATES;
var init_unified_rules_interface = __esm({
  "src/core/task-system/unified-task/unified-rules.interface.ts"() {
    RULE_TEMPLATES = {
      implementation: {
        mustComplete: [
          "Write tests first (TDD)",
          "Follow DRY principles",
          "Keep files under 200 lines",
          "Handle all error cases"
        ],
        successCriteria: [
          "All tests pass",
          "Code coverage > 80%",
          "No linting errors",
          "Clean, readable code"
        ],
        shouldAvoid: [
          "Code duplication",
          "Console.log statements",
          "Hardcoded values",
          "Complex nested logic"
        ],
        hints: [
          "Start with unit tests",
          "Check existing patterns",
          "Use TypeScript for type safety",
          "Consider edge cases"
        ]
      },
      testing: {
        mustComplete: [
          "Unit tests for all functions",
          "Integration tests for workflows",
          "Edge case testing",
          "Generate coverage report"
        ],
        successCriteria: [
          "Coverage > 80%",
          "All tests green",
          "No flaky tests",
          "Performance benchmarks met"
        ],
        shouldAvoid: [
          "Testing implementation details",
          "Brittle tests",
          "Excessive mocking",
          "Slow tests"
        ],
        hints: [
          "Test behavior, not implementation",
          "Use descriptive test names",
          "Mock external dependencies",
          "Group related tests"
        ]
      },
      deployment: {
        mustComplete: [
          "Build passes",
          "All tests green",
          "Documentation updated",
          "Version bumped",
          "Changelog updated"
        ],
        successCriteria: [
          "No build errors",
          "All checks pass",
          "Zero downtime deployment",
          "Rollback plan ready"
        ],
        shouldAvoid: [
          "Deploying on Friday",
          "Skipping tests",
          "Manual configuration",
          "Breaking changes without notice"
        ],
        hints: [
          "Run build locally first",
          "Check dependencies",
          "Test in staging",
          "Monitor after deployment"
        ]
      },
      documentation: {
        mustComplete: [
          "API documentation",
          "Usage examples",
          "Configuration guide",
          "Troubleshooting section"
        ],
        successCriteria: [
          "All endpoints documented",
          "Examples run successfully",
          "Clear and concise",
          "Up to date with code"
        ],
        shouldAvoid: [
          "Technical jargon",
          "Outdated information",
          "Missing examples",
          "Unclear instructions"
        ],
        hints: [
          "Write for your audience",
          "Include code examples",
          "Use diagrams where helpful",
          "Keep it maintainable"
        ]
      }
    };
    __name(getRuleTemplate, "getRuleTemplate");
    __name(createPhaseRules, "createPhaseRules");
  }
});

// src/core/task-system/unified-task/task-operations.ts
var _TaskOperations, TaskOperations;
var init_task_operations = __esm({
  "src/core/task-system/unified-task/task-operations.ts"() {
    init_unified_rules_interface();
    _TaskOperations = class _TaskOperations {
      constructor(memoryService) {
        this.memoryService = memoryService;
      }
      tasks = /* @__PURE__ */ new Map();
      phases = /* @__PURE__ */ new Map();
      currentPhase = null;
      // Getter methods for external access
      getTasks() {
        return this.tasks;
      }
      getPhases() {
        return this.phases;
      }
      getCurrentPhase() {
        return this.currentPhase;
      }
      setCurrentPhase(phaseName) {
        this.currentPhase = phaseName;
      }
      /**
       * Create a new task (CRUD - Create)
       */
      async createTask(title, options = {}) {
        const id = `task-${Date.now()}`;
        const task = {
          id,
          title,
          phase: options.phase || this.currentPhase || void 0,
          category: options.category || "pending",
          priority: options.priority || "medium",
          tags: options.tags || [],
          created: /* @__PURE__ */ new Date()
        };
        this.tasks.set(id, task);
        if (this.memoryService) {
          await this.memoryService.store({
            content: `Task created: ${title}`,
            type: "task",
            metadata: task
          });
        }
        return { task, taskId: id };
      }
      /**
       * Get task details (CRUD - Read)
       */
      getTask(taskId) {
        return this.tasks.get(taskId);
      }
      /**
       * Update task details (CRUD - Update)
       */
      async updateTask(taskId, updates) {
        const task = this.tasks.get(taskId);
        if (!task) {
          return null;
        }
        if (updates.title) task.title = updates.title;
        if (updates.priority) task.priority = updates.priority;
        if (updates.tags) task.tags = updates.tags;
        return task;
      }
      /**
       * Delete task (CRUD - Delete)
       */
      async deleteTask(taskId) {
        const task = this.tasks.get(taskId);
        if (!task) {
          return null;
        }
        const deletedTask = { ...task };
        this.tasks.delete(taskId);
        if (task.phase) {
          this.updatePhaseProgress(task.phase);
        }
        return deletedTask;
      }
      /**
       * Move task between categories
       */
      async moveTask(taskId, category) {
        const task = this.tasks.get(taskId);
        if (!task) {
          return null;
        }
        task.category = category;
        if (category === "completed") {
          task.completed = /* @__PURE__ */ new Date();
          if (task.phase) {
            this.updatePhaseProgress(task.phase);
          }
        }
        return task;
      }
      /**
       * Create a new phase with tasks
       */
      async createPhase(name, description, taskTitles = [], customRules) {
        let templateType = "implementation";
        const lowerName = name.toLowerCase();
        if (lowerName.includes("test")) {
          templateType = "testing";
        } else if (lowerName.includes("deploy") || lowerName.includes("release")) {
          templateType = "deployment";
        } else if (lowerName.includes("doc")) {
          templateType = "documentation";
        }
        const rules = createPhaseRules(name, description || `${name} phase`, templateType, customRules);
        const phase = {
          name,
          description,
          rules,
          tasks: [],
          progress: { completed: 0, total: taskTitles.length, percentage: 0, bar: "\u2591".repeat(20) }
        };
        for (const title of taskTitles) {
          const result = await this.createTask(`[${name}] ${title}`, {
            phase: name,
            tags: ["phase-task", name.toLowerCase()]
          });
          phase.tasks.push(result.taskId);
        }
        this.phases.set(name, phase);
        this.currentPhase = name;
        if (this.memoryService) {
          await this.memoryService.store({
            content: `PHASE: ${name} - ${description || "No description"}
Rules: ${rules.mustComplete.join(", ")}
Success: ${rules.successCriteria.join(", ")}`,
            type: "phase",
            metadata: {
              phaseName: name,
              description,
              rules,
              tasks: phase.tasks,
              progress: phase.progress,
              createdAt: /* @__PURE__ */ new Date()
            }
          });
        }
        return phase;
      }
      /**
       * Delete a phase
       */
      deletePhase(phaseName) {
        if (!this.phases.has(phaseName)) {
          return false;
        }
        this.phases.delete(phaseName);
        if (this.currentPhase === phaseName) {
          this.currentPhase = null;
        }
        return true;
      }
      /**
       * Get phase by name
       */
      getPhase(phaseName) {
        return this.phases.get(phaseName);
      }
      /**
       * Get task statistics
       */
      getTaskStats() {
        const tasks = Array.from(this.tasks.values());
        return {
          active: tasks.filter((t) => t.category === "active").length,
          pending: tasks.filter((t) => t.category === "pending").length,
          completed: tasks.filter((t) => t.category === "completed").length,
          total: tasks.length
        };
      }
      /**
       * Calculate progress for given tasks
       */
      calculateProgress(tasks) {
        const completed = tasks.filter((t) => t.category === "completed").length;
        const total = tasks.length;
        const percentage = total > 0 ? Math.round(completed / total * 100) : 0;
        return {
          completed,
          total,
          percentage,
          bar: "\u2588".repeat(Math.floor(percentage / 5)) + "\u2591".repeat(20 - Math.floor(percentage / 5))
        };
      }
      /**
       * Get current overall progress
       */
      getCurrentProgress() {
        const stats = this.getTaskStats();
        const percentage = stats.total > 0 ? Math.round(stats.completed / stats.total * 100) : 0;
        return {
          completed: stats.completed,
          total: stats.total,
          percentage,
          bar: "\u2588".repeat(Math.floor(percentage / 5)) + "\u2591".repeat(20 - Math.floor(percentage / 5))
        };
      }
      /**
       * Update phase progress based on its tasks
       */
      updatePhaseProgress(phaseName) {
        if (!phaseName) return;
        const phase = this.phases.get(phaseName);
        if (!phase) return;
        const phaseTasks = Array.from(this.tasks.values()).filter((t) => t.phase === phaseName);
        phase.progress = this.calculateProgress(phaseTasks);
      }
      /**
       * Get tasks by phase
       */
      getTasksByPhase(phaseName) {
        return Array.from(this.tasks.values()).filter((t) => t.phase === phaseName);
      }
      /**
       * Get tasks by category
       */
      getTasksByCategory(category) {
        return Array.from(this.tasks.values()).filter((t) => t.category === category);
      }
    };
    __name(_TaskOperations, "TaskOperations");
    TaskOperations = _TaskOperations;
  }
});

// src/core/task-system/unified-task/task-validators.ts
var _TaskValidators, TaskValidators;
var init_task_validators = __esm({
  "src/core/task-system/unified-task/task-validators.ts"() {
    _TaskValidators = class _TaskValidators {
      /**
       * Validate task creation input
       */
      validateTaskCreation(title, options = {}) {
        const errors = [];
        const warnings = [];
        if (!title || typeof title !== "string") {
          errors.push("Task title is required and must be a string");
        } else if (title.trim().length === 0) {
          errors.push("Task title cannot be empty");
        } else if (title.length > 200) {
          errors.push("Task title cannot exceed 200 characters");
        }
        if (options.priority && !this.isValidPriority(options.priority)) {
          errors.push('Priority must be "high", "medium", or "low"');
        }
        if (options.category && !this.isValidCategory(options.category)) {
          errors.push('Category must be "pending", "active", or "completed"');
        }
        if (options.tags) {
          const tagValidation = this.validateTags(options.tags);
          errors.push(...tagValidation.errors);
          warnings.push(...tagValidation.warnings);
        }
        if (options.phase && typeof options.phase !== "string") {
          errors.push("Phase must be a string");
        }
        return {
          isValid: errors.length === 0,
          errors,
          warnings
        };
      }
      /**
       * Validate task update input
       */
      validateTaskUpdate(taskId, updates) {
        const errors = [];
        const warnings = [];
        if (!taskId || typeof taskId !== "string") {
          errors.push("Task ID is required and must be a string");
        }
        if (updates.title !== void 0) {
          if (typeof updates.title !== "string") {
            errors.push("Task title must be a string");
          } else if (updates.title.trim().length === 0) {
            errors.push("Task title cannot be empty");
          } else if (updates.title.length > 200) {
            errors.push("Task title cannot exceed 200 characters");
          }
        }
        if (updates.priority !== void 0 && !this.isValidPriority(updates.priority)) {
          errors.push('Priority must be "high", "medium", or "low"');
        }
        if (updates.tags) {
          const tagValidation = this.validateTags(updates.tags);
          errors.push(...tagValidation.errors);
          warnings.push(...tagValidation.warnings);
        }
        return {
          isValid: errors.length === 0,
          errors,
          warnings
        };
      }
      /**
       * Validate phase creation input
       */
      validatePhaseCreation(name, description, taskTitles = [], customRules) {
        const errors = [];
        const warnings = [];
        if (!name || typeof name !== "string") {
          errors.push("Phase name is required and must be a string");
        } else if (name.trim().length === 0) {
          errors.push("Phase name cannot be empty");
        } else if (name.length > 100) {
          errors.push("Phase name cannot exceed 100 characters");
        }
        if (description !== void 0) {
          if (typeof description !== "string") {
            errors.push("Phase description must be a string");
          } else if (description.length > 500) {
            errors.push("Phase description cannot exceed 500 characters");
          }
        }
        if (!Array.isArray(taskTitles)) {
          errors.push("Task titles must be an array");
        } else {
          taskTitles.forEach((title, index) => {
            if (typeof title !== "string") {
              errors.push(`Task title at index ${index} must be a string`);
            } else if (title.trim().length === 0) {
              errors.push(`Task title at index ${index} cannot be empty`);
            } else if (title.length > 200) {
              errors.push(`Task title at index ${index} cannot exceed 200 characters`);
            }
          });
          if (taskTitles.length > 50) {
            warnings.push("Creating more than 50 tasks in a single phase may be difficult to manage");
          }
        }
        if (customRules) {
          if (customRules.mustComplete && !Array.isArray(customRules.mustComplete)) {
            errors.push("mustComplete rules must be an array");
          }
          if (customRules.successCriteria && !Array.isArray(customRules.successCriteria)) {
            errors.push("successCriteria must be an array");
          }
          if (customRules.shouldAvoid && !Array.isArray(customRules.shouldAvoid)) {
            errors.push("shouldAvoid rules must be an array");
          }
          if (customRules.goal && typeof customRules.goal !== "string") {
            errors.push("Goal must be a string");
          }
        }
        return {
          isValid: errors.length === 0,
          errors,
          warnings
        };
      }
      /**
       * Validate task movement between categories
       */
      validateTaskMovement(task, targetCategory) {
        const errors = [];
        const warnings = [];
        if (!task) {
          errors.push("Task not found");
          return { isValid: false, errors, warnings };
        }
        if (!this.isValidCategory(targetCategory)) {
          errors.push('Invalid category: must be "pending", "active", or "completed"');
          return { isValid: false, errors, warnings };
        }
        const category = targetCategory;
        if (task.category === category) {
          warnings.push(`Task is already in ${category} category`);
        }
        if (task.category === "completed" && category !== "completed") {
          warnings.push("Moving a completed task back to pending/active - consider if this is intended");
        }
        return {
          isValid: errors.length === 0,
          errors,
          warnings
        };
      }
      /**
       * Validate phase completion
       */
      validatePhaseCompletion(phase, tasks) {
        const errors = [];
        const warnings = [];
        if (!phase) {
          errors.push("Phase not found");
          return { isValid: false, errors, warnings };
        }
        const phaseTasks = tasks.filter((t) => t.phase === phase.name);
        const incompleteTasks = phaseTasks.filter((t) => t.category !== "completed");
        if (incompleteTasks.length > 0) {
          errors.push(`Cannot complete phase: ${incompleteTasks.length} tasks are still incomplete`);
        }
        if (phaseTasks.length === 0) {
          warnings.push("Phase has no tasks - consider if completion is meaningful");
        }
        return {
          isValid: errors.length === 0,
          errors,
          warnings
        };
      }
      /**
       * Private helper methods
       */
      isValidPriority(priority) {
        return ["high", "medium", "low"].includes(priority);
      }
      isValidCategory(category) {
        return ["pending", "active", "completed"].includes(category);
      }
      validateTags(tags) {
        const errors = [];
        const warnings = [];
        if (!Array.isArray(tags)) {
          errors.push("Tags must be an array");
          return { isValid: false, errors, warnings };
        }
        tags.forEach((tag, index) => {
          if (typeof tag !== "string") {
            errors.push(`Tag at index ${index} must be a string`);
          } else if (tag.trim().length === 0) {
            errors.push(`Tag at index ${index} cannot be empty`);
          } else if (tag.length > 50) {
            errors.push(`Tag at index ${index} cannot exceed 50 characters`);
          }
        });
        if (tags.length > 20) {
          warnings.push("Having more than 20 tags may make the task difficult to organize");
        }
        const uniqueTags = new Set(tags);
        if (uniqueTags.size !== tags.length) {
          warnings.push("Duplicate tags found");
        }
        return {
          isValid: errors.length === 0,
          errors,
          warnings
        };
      }
    };
    __name(_TaskValidators, "TaskValidators");
    TaskValidators = _TaskValidators;
  }
});

// src/core/task-system/unified-task/task-transformers.ts
var _TaskTransformers, TaskTransformers;
var init_task_transformers = __esm({
  "src/core/task-system/unified-task/task-transformers.ts"() {
    _TaskTransformers = class _TaskTransformers {
      /**
       * Generate contextual hints based on task state
       */
      getContextualHints(task, stats) {
        const hints = [];
        if (task.category === "pending" && stats.active === 0) {
          hints.push(' Start this task: moveTask(taskId, "active")');
        }
        if (task.priority === "high") {
          hints.push(" High priority - work on this first");
        }
        if (task.phase) {
          hints.push(` Part of ${task.phase} phase`);
        }
        return hints;
      }
      /**
       * Get progress-based hints for overall system state
       */
      getProgressBasedHints(stats) {
        const hints = [];
        if (stats.active === 0 && stats.pending > 0) {
          hints.push(" No active tasks - start working on pending tasks");
        } else if (stats.active > 3) {
          hints.push(" Too many active tasks - focus on completing some first");
        } else if (stats.completed === stats.total && stats.total > 0) {
          hints.push(" All tasks completed!");
        }
        const percentage = stats.total > 0 ? Math.round(stats.completed / stats.total * 100) : 0;
        if (percentage > 80) {
          hints.push(" Almost done - final push!");
        }
        return hints;
      }
      /**
       * Generate smart next actions based on current state
       */
      getSmartNextActions(tasks) {
        const actions = [];
        const pendingTasks = tasks.filter((t) => t.category === "pending");
        const activeTasks = tasks.filter((t) => t.category === "active");
        const stats = this.calculateTaskStats(tasks);
        if (activeTasks.length > 0) {
          actions.push(`Complete: "${activeTasks[0].title}"`);
        } else if (pendingTasks.length > 0) {
          actions.push(`Start: "${pendingTasks[0].title}"`);
        } else if (stats.completed === stats.total && stats.total > 0) {
          actions.push("Create new phase or tasks");
        }
        return actions;
      }
      /**
       * Generate memory recommendations based on progress
       */
      getMemoryRecommendation(progress) {
        if (progress.percentage < 30) {
          return " Document your approach and initial thoughts";
        } else if (progress.percentage < 70) {
          return " Capture learnings from completed tasks";
        } else {
          return " Write retrospective and key takeaways";
        }
      }
      /**
       * Generate proactive suggestions based on task state
       */
      generateProactiveSuggestions(stats) {
        const suggestions = [];
        if (stats.total === 0) {
          suggestions.push(" Get started: Create your first phase with tasks");
        } else if (stats.completed === stats.total) {
          suggestions.push(" All done! Consider creating the next phase");
        } else if (stats.active === 0) {
          suggestions.push(" I notice no active tasks - shall I suggest which to start?");
        } else if (stats.active > 5) {
          suggestions.push(" Focus tip: Consider completing active tasks before starting new ones");
        }
        return suggestions;
      }
      /**
       * Build formatted phase response message
       */
      buildPhaseResponse(phase, phaseId) {
        let response = ` PHASE CREATED: "${phase.name}"
`;
        response += `Phase ID: ${phaseId}
`;
        if (phase.description) response += ` ${phase.description}
`;
        response += `
 **Phase Memory & Context:**
`;
        response += `\u2022 Goal: ${phase.rules.memory.goal}
`;
        response += `\u2022 Short Memory: ${phase.rules.memory.shortDescription}
`;
        response += `\u2022 Progress: 0/${phase.tasks.length} tasks
`;
        if (phase.rules.memory.keyPoints && phase.rules.memory.keyPoints.length > 0) {
          response += `\u2022 Key Points: ${phase.rules.memory.keyPoints.join(", ")}
`;
        }
        response += `
 **Must Complete (Rules):**
`;
        phase.rules.mustComplete.forEach((rule) => {
          response += `\u2022 ${rule}
`;
        });
        response += `
 **Success Criteria:**
`;
        phase.rules.successCriteria.forEach((criteria) => {
          response += `\u2022 ${criteria}
`;
        });
        if (phase.rules.shouldAvoid && phase.rules.shouldAvoid.length > 0) {
          response += `
 **Should Avoid:**
`;
          phase.rules.shouldAvoid.forEach((avoid) => {
            response += `\u2022 ${avoid}
`;
          });
        }
        if (phase.tasks.length > 0) {
          response += `
 **Tasks Created (${phase.tasks.length}):**
`;
          response += `\u2022 ${phase.tasks.length} tasks added to pending
`;
        }
        response += `
 **Memory Stored:** Phase context, rules, and tasks saved to Nova Memory`;
        return response;
      }
      /**
       * Format task details for display
       */
      formatTaskDetails(task, taskId) {
        let message = ` **Task Details:**
`;
        message += `\u2022 Title: ${task.title}
`;
        message += `\u2022 ID: ${taskId}
`;
        message += `\u2022 Status: ${task.category}
`;
        message += `\u2022 Priority: ${task.priority}
`;
        if (task.phase) message += `\u2022 Phase: ${task.phase}
`;
        if (task.tags.length > 0) message += `\u2022 Tags: ${task.tags.join(", ")}
`;
        message += `\u2022 Created: ${task.created.toISOString()}
`;
        if (task.completed) message += `\u2022 Completed: ${task.completed.toISOString()}
`;
        return message;
      }
      /**
       * Format board status message
       */
      formatBoardStatus(stats, currentPhase, phases) {
        let message = ` **Task Board Status**

`;
        message += `\u2022 Active: ${stats.active} tasks
`;
        message += `\u2022 Pending: ${stats.pending} tasks
`;
        message += `\u2022 Completed: ${stats.completed} tasks
`;
        if (currentPhase) {
          const phase = phases.get(currentPhase);
          if (phase) {
            message += `
 Current Phase: ${currentPhase}
`;
            message += `Progress: ${phase.progress.bar} ${phase.progress.percentage}%
`;
          }
        }
        return message;
      }
      /**
       * Generate comprehensive smart response
       */
      generateSmartResponse(success, message, data, hints = [], nextActions = [], memoryTip, proactiveSuggestions) {
        return {
          success,
          message,
          data,
          hints,
          nextActions,
          memoryTip,
          proactiveSuggestions
        };
      }
      /**
       * Calculate task statistics from task array
       */
      calculateTaskStats(tasks) {
        return {
          active: tasks.filter((t) => t.category === "active").length,
          pending: tasks.filter((t) => t.category === "pending").length,
          completed: tasks.filter((t) => t.category === "completed").length,
          total: tasks.length
        };
      }
      /**
       * Format task movement message with contextual information
       */
      formatTaskMovementMessage(task, oldCategory, stats, overallProgress, phase, nextTask) {
        let message = ` Moved "${task.title}" from ${oldCategory} to ${task.category}
`;
        if (task.phase && phase) {
          message += `
 **Phase Reminder:** ${phase.rules.memory.shortDescription}
`;
          message += ` **Goal:** ${phase.rules.memory.goal}
`;
          if (task.category === "completed") {
            message += `
 **Progress:** ${phase.progress.completed}/${phase.progress.total} tasks (${phase.progress.percentage}%)
`;
            if (phase.rules.mustComplete.length > 0) {
              message += `
 **Remember to:**
`;
              phase.rules.mustComplete.slice(0, 2).forEach((rule) => {
                message += `\u2022 ${rule}
`;
              });
            }
          }
        }
        message += `
 **Current Progress:**
`;
        message += `\u2022 Total: ${stats.total} tasks (${stats.completed} done, ${stats.active} active, ${stats.pending} pending)
`;
        message += `\u2022 Overall: ${overallProgress.bar} ${overallProgress.percentage}%
`;
        if (nextTask) {
          message += `
 **Next Task:** "${nextTask.title}"
`;
          message += `\u2022 ID: ${nextTask.id}
`;
          message += `\u2022 Start it: tasks(action:"move", taskId:"${nextTask.id}", category:"active")
`;
        }
        return message;
      }
    };
    __name(_TaskTransformers, "TaskTransformers");
    TaskTransformers = _TaskTransformers;
  }
});

// src/core/task-system/unified-task/types.ts
var init_types4 = __esm({
  "src/core/task-system/unified-task/types.ts"() {
  }
});

// src/core/task-system/unified-task/index.ts
var _UnifiedTaskService, UnifiedTaskService;
var init_unified_task = __esm({
  "src/core/task-system/unified-task/index.ts"() {
    init_task_operations();
    init_task_validators();
    init_task_transformers();
    init_types4();
    init_task_operations();
    init_task_validators();
    init_task_transformers();
    _UnifiedTaskService = class _UnifiedTaskService {
      operations;
      validators;
      transformers;
      constructor(memoryService) {
        this.operations = new TaskOperations(memoryService);
        this.validators = new TaskValidators();
        this.transformers = new TaskTransformers();
      }
      async createTask(title, options = {}) {
        const validation = this.validators.validateTaskCreation(title, options);
        if (!validation.isValid) {
          return this.transformers.generateSmartResponse(false, `Validation failed: ${validation.errors.join(", ")}`);
        }
        const { task, taskId } = await this.operations.createTask(title, options);
        const stats = this.operations.getTaskStats();
        const progress = this.operations.getCurrentProgress();
        return this.transformers.generateSmartResponse(
          true,
          `Task created: "${title}"
Task ID: ${taskId}
Progress: ${stats.pending} pending, ${stats.active} active, ${stats.completed} completed`,
          { taskId, task, stats, progress },
          this.transformers.getContextualHints(task, stats),
          [`Complete this task: tasks(action:"complete", taskId:"${taskId}")`]
        );
      }
      async createPhase(name, description, taskTitles = [], customRules) {
        const validation = this.validators.validatePhaseCreation(name, description, taskTitles, customRules);
        if (!validation.isValid) {
          return this.transformers.generateSmartResponse(false, `Validation failed: ${validation.errors.join(", ")}`);
        }
        const phase = await this.operations.createPhase(name, description, taskTitles, customRules);
        const phaseId = `phase-${Date.now()}`;
        const response = this.transformers.buildPhaseResponse(phase, phaseId);
        const stats = this.operations.getTaskStats();
        return this.transformers.generateSmartResponse(
          true,
          response,
          { phaseId, phaseName: name, phase, taskIds: phase.tasks, stats },
          phase.rules.hints || [],
          [`Start phase: tasks(action:"start", phase:"${name}")`, `View progress: tasks(action:"insights", phase:"${name}")`, `Complete phase: tasks(action:"complete", phase:"${name}")`]
        );
      }
      async updateTask(taskId, updates) {
        const validation = this.validators.validateTaskUpdate(taskId, updates);
        if (!validation.isValid) {
          return this.transformers.generateSmartResponse(false, `Validation failed: ${validation.errors.join(", ")}`);
        }
        const task = await this.operations.updateTask(taskId, updates);
        if (!task) return this.transformers.generateSmartResponse(false, `Task not found: ${taskId}`);
        const stats = this.operations.getTaskStats();
        return this.transformers.generateSmartResponse(
          true,
          `Task updated: "${task.title}"
Task ID: ${taskId}
Progress: ${stats.pending} pending, ${stats.active} active, ${stats.completed} completed`,
          { taskId, task, stats },
          [],
          [`View task: tasks(action:"get", taskId:"${taskId}")`]
        );
      }
      async deleteTask(taskId) {
        const deletedTask = await this.operations.deleteTask(taskId);
        if (!deletedTask) return this.transformers.generateSmartResponse(false, `Task not found: ${taskId}`);
        const stats = this.operations.getTaskStats();
        const progress = this.operations.getCurrentProgress();
        return this.transformers.generateSmartResponse(
          true,
          `Task deleted: "${deletedTask.title}"
Remaining: ${stats.total} tasks
${progress.bar} ${progress.percentage}% complete`,
          { deletedTaskId: taskId, stats, progress },
          [],
          this.transformers.getSmartNextActions(Array.from(this.operations.getTasks().values()))
        );
      }
      async getTask(taskId) {
        const task = this.operations.getTask(taskId);
        if (!task) return this.transformers.generateSmartResponse(false, `Task not found: ${taskId}`);
        const message = this.transformers.formatTaskDetails(task, taskId);
        return this.transformers.generateSmartResponse(
          true,
          message,
          { taskId, task },
          [],
          [`Update: tasks(action:"update", taskId:"${taskId}", title:"New title")`, `Move: tasks(action:"move", taskId:"${taskId}", category:"active")`, `Delete: tasks(action:"delete", taskId:"${taskId}")`]
        );
      }
      async moveTask(taskId, category) {
        const task = this.operations.getTask(taskId);
        const validation = this.validators.validateTaskMovement(task, category);
        if (!validation.isValid) {
          return this.transformers.generateSmartResponse(false, `${validation.errors.join(", ")}`);
        }
        if (!task) return this.transformers.generateSmartResponse(false, "Task not found");
        const oldCategory = task.category;
        await this.operations.moveTask(taskId, category);
        const stats = this.operations.getTaskStats();
        const overallProgress = this.operations.getCurrentProgress();
        const phase = task.phase ? this.operations.getPhase(task.phase) : void 0;
        const nextTask = Array.from(this.operations.getTasks().values()).find((t) => t.category === "pending" && t.phase === task.phase);
        const message = this.transformers.formatTaskMovementMessage(task, oldCategory, stats, overallProgress, phase, nextTask);
        const hints = this.transformers.getProgressBasedHints(stats);
        const nextActions = this.transformers.getSmartNextActions(Array.from(this.operations.getTasks().values()));
        return this.transformers.generateSmartResponse(
          true,
          message,
          { task, taskId: task.id, stats, overallProgress, nextTaskId: nextTask == null ? void 0 : nextTask.id },
          hints,
          nextActions,
          this.transformers.getMemoryRecommendation(overallProgress)
        );
      }
      async getBoardStatus(view = "simple") {
        const stats = this.operations.getTaskStats();
        const progress = this.operations.getCurrentProgress();
        const currentPhase = this.operations.getCurrentPhase();
        const phases = this.operations.getPhases();
        const message = this.transformers.formatBoardStatus(stats, currentPhase, phases);
        const proactive = this.transformers.generateProactiveSuggestions(stats);
        return this.transformers.generateSmartResponse(
          true,
          message,
          { stats, progress },
          this.transformers.getProgressBasedHints(stats),
          this.transformers.getSmartNextActions(Array.from(this.operations.getTasks().values())),
          this.transformers.getMemoryRecommendation(progress),
          proactive
        );
      }
      async completePhase(phaseName) {
        const phase = this.operations.getPhase(phaseName);
        const tasks = Array.from(this.operations.getTasks().values());
        const validation = this.validators.validatePhaseCompletion(phase, tasks);
        if (!validation.isValid) {
          const phaseTasks = this.operations.getTasksByPhase(phaseName);
          const progress = this.operations.calculateProgress(phaseTasks);
          let message = `Cannot complete phase "${phaseName}"

`;
          message += `Progress: ${progress.completed}/${progress.total} tasks (${progress.percentage}%)
`;
          message += `${progress.total - progress.completed} tasks still pending

`;
          const incompleteTasks = phaseTasks.filter((t) => t.category !== "completed");
          message += `**Incomplete tasks:**
`;
          incompleteTasks.slice(0, 3).forEach((task) => {
            message += `\u2022 ${task.title} (${task.category})
`;
          });
          return this.transformers.generateSmartResponse(false, message, { phase, progress }, ["Complete all tasks before closing phase"], [`Move pending tasks to completed`]);
        }
        this.operations.deletePhase(phaseName);
        const codeKeywords = ["code", "implement", "feature", "develop", "build", "refactor", "fix", "api", "module"];
        const isCodePhase = codeKeywords.some((keyword) => phaseName.toLowerCase().includes(keyword));
        const hints = ["Consider creating next phase", "Review what was learned"];
        if (isCodePhase) {
          hints.unshift("Ensure test coverage is 90% or above before merging");
        }
        return this.transformers.generateSmartResponse(true, `Phase "${phaseName}" Completed!`, { phaseCompleted: phaseName }, hints, ["Create new phase with lessons learned", "Document key takeaways"]);
      }
      async getInsights(phaseName) {
        const targetPhase = phaseName || this.operations.getCurrentPhase();
        const phase = targetPhase ? this.operations.getPhase(targetPhase) : void 0;
        if (!phase) return this.transformers.generateSmartResponse(false, "No phase found");
        const phaseTasks = this.operations.getTasksByPhase(phase.name);
        const progress = this.operations.calculateProgress(phaseTasks);
        let message = `Phase Insights: ${phase.name}

${phase.rules.memory.shortDescription}
Goal: ${phase.rules.memory.goal}

Progress: ${progress.bar} ${progress.percentage}%
Tasks: ${progress.completed}/${progress.total}

Must Complete:
`;
        phase.rules.mustComplete.forEach((rule) => {
          message += `\u2022 ${rule}
`;
        });
        message += `
**Success Criteria:**
`;
        phase.rules.successCriteria.forEach((criteria) => {
          message += `\u2022 ${criteria}
`;
        });
        return this.transformers.generateSmartResponse(
          true,
          message,
          { phase, progress },
          phase.rules.hints || [],
          this.transformers.getSmartNextActions(Array.from(this.operations.getTasks().values())),
          this.transformers.getMemoryRecommendation(progress)
        );
      }
    };
    __name(_UnifiedTaskService, "UnifiedTaskService");
    UnifiedTaskService = _UnifiedTaskService;
  }
});

// src/core/task-system/unified-task.service.ts
var init_unified_task_service = __esm({
  "src/core/task-system/unified-task.service.ts"() {
    init_unified_task();
  }
});

// src/modules/mcp/tools/task-management.tool.ts
var _TaskManagementTool, TaskManagementTool;
var init_task_management_tool = __esm({
  "src/modules/mcp/tools/task-management.tool.ts"() {
    init_unified_task_service();
    _TaskManagementTool = class _TaskManagementTool {
      service;
      constructor(memoryService) {
        this.service = new UnifiedTaskService(memoryService);
      }
      async execute(params) {
        var _a, _b, _c, _d;
        try {
          let response;
          switch (params.action) {
            case "create_task":
              if (!params.title || params.title.trim() === "") {
                return " Title is required for create_task action";
              }
              response = await this.service.createTask(
                params.title,
                {
                  phase: params.phase,
                  priority: params.priority,
                  tags: params.tags,
                  category: params.category
                }
              );
              break;
            case "create_phase":
              if (!params.phase || params.phase.trim() === "") {
                return " Phase name is required for create_phase action";
              }
              response = await this.service.createPhase(
                params.phase,
                params.description,
                params.tasks || [],
                {
                  mustComplete: params.mustComplete,
                  successCriteria: params.successCriteria,
                  shouldAvoid: params.shouldAvoid,
                  goal: params.goal
                }
              );
              break;
            case "move":
              if (!params.taskId || !params.category) {
                return " Task ID and category required for move action";
              }
              response = await this.service.moveTask(params.taskId, params.category);
              break;
            case "status":
              const viewMode = params.view === "tasks" || params.view === "phases" ? "detailed" : params.view;
              response = await this.service.getBoardStatus(viewMode);
              break;
            case "insights":
              response = await this.service.getInsights(params.phase);
              break;
            case "start":
              if (params.taskId) {
                response = await this.service.moveTask(params.taskId, "active");
                if (response.message.includes("not found")) {
                  return ` Task not found: ${params.taskId}`;
                }
                response.message = ` Task started: moved to active`;
              } else if (params.phase) {
                response = await this.service.getBoardStatus();
                response.message = ` Phase "${params.phase}" started`;
              } else {
                return " Task ID or phase name required to start";
              }
              break;
            case "complete":
              if (params.taskId) {
                response = await this.service.moveTask(params.taskId, "completed");
              } else if (params.phase) {
                response = await this.service.completePhase(params.phase);
              } else {
                return " Phase name or task ID required";
              }
              break;
            case "get":
              if (!params.taskId) {
                return " Task ID required for get action";
              }
              response = await this.service.getTask(params.taskId);
              break;
            case "update":
              if (!params.taskId) {
                return " Task ID required for update action";
              }
              if (!params.title && !params.priority && !params.tags) {
                return " At least one field (title, priority, or tags) required for update";
              }
              response = await this.service.updateTask(params.taskId, {
                title: params.title,
                priority: params.priority,
                tags: params.tags
              });
              break;
            case "delete":
              if (!params.taskId) {
                return " Task ID required for delete action";
              }
              response = await this.service.deleteTask(params.taskId);
              break;
            case "list":
              if (params.view === "phases") {
                const phasesMap = ((_b = (_a = this.service.operations) == null ? void 0 : _a.getPhases) == null ? void 0 : _b.call(_a)) || /* @__PURE__ */ new Map();
                const phases = Array.from(phasesMap.keys());
                response = {
                  success: true,
                  message: ` **Phases (${phases.length}):**
${phases.map((p) => `\u2022 ${p}`).join("\n") || "(no phases yet)"}`,
                  data: { phases },
                  hints: [],
                  nextActions: phases.length > 0 ? [`View phase: tasks(action:"insights", phase:"${phases[0]}")`] : [`Create phase: tasks(action:"create_phase", phase:"New Phase")`]
                };
              } else {
                const tasksMap = ((_d = (_c = this.service.operations) == null ? void 0 : _c.getTasks) == null ? void 0 : _d.call(_c)) || /* @__PURE__ */ new Map();
                const tasks = Array.from(tasksMap.values());
                response = {
                  success: true,
                  message: ` **Tasks (${tasks.length}):**
${tasks.slice(0, 10).map((t) => `\u2022 ${t.title} (ID: ${t.id})`).join("\n") || "(no tasks yet)"}${tasks.length > 10 ? `
... and ${tasks.length - 10} more` : ""}`,
                  data: { taskIds: tasks.map((t) => t.id), tasks },
                  hints: [],
                  nextActions: tasks.length > 0 ? [`View task: tasks(action:"get", taskId:"${tasks[0].id}")`] : [`Create task: tasks(action:"create_task", title:"New Task")`]
                };
              }
              break;
            default:
              return ` Unknown action: ${params.action}`;
          }
          return this.formatResponse(response);
        } catch (error) {
          return ` Error: ${error.message}`;
        }
      }
      formatResponse(response) {
        let output = response.message;
        if (response.hints && response.hints.length > 0) {
          output += "\n\n **Hints:**\n";
          response.hints.forEach((hint) => {
            output += `${hint}
`;
          });
        }
        if (response.nextActions && response.nextActions.length > 0) {
          output += "\n **Next Actions:**\n";
          response.nextActions.forEach((action) => {
            output += `\u2022 ${action}
`;
          });
        }
        if (response.memoryTip) {
          output += `
${response.memoryTip}
`;
        }
        if (response.proactiveSuggestions && response.proactiveSuggestions.length > 0) {
          output += "\n **Proactive Suggestions:**\n";
          response.proactiveSuggestions.forEach((suggestion) => {
            output += `${suggestion}
`;
          });
        }
        return output;
      }
    };
    __name(_TaskManagementTool, "TaskManagementTool");
    TaskManagementTool = _TaskManagementTool;
  }
});

// src/modules/mcp/tools/task-tools.schemas.ts
var TaskManagementInput, TaskManagementOutput, TaskBoardInput, TaskBoardOutput, TaskInsightsInput, TaskInsightsOutput;
var init_task_tools_schemas = __esm({
  "src/modules/mcp/tools/task-tools.schemas.ts"() {
    init_zod();
    TaskManagementInput = {
      action: external_exports.enum([
        "create_task",
        "create_phase",
        "move",
        "status",
        "insights",
        "start",
        "complete",
        "get",
        "update",
        "delete",
        "list"
      ]).describe("Task management action to perform"),
      title: external_exports.string().optional().describe("Task title (required for create_task)"),
      taskId: external_exports.string().optional().describe("Task ID (required for get, update, delete, move actions)"),
      category: external_exports.enum(["pending", "active", "completed"]).optional().describe("Task category"),
      priority: external_exports.enum(["high", "medium", "low"]).optional().describe("Task priority level"),
      tags: external_exports.array(external_exports.string()).optional().describe("Task tags for organization"),
      phase: external_exports.string().optional().describe("Workflow phase name"),
      phaseId: external_exports.string().optional().describe("Phase ID for phase operations"),
      description: external_exports.string().optional().describe("Task or phase description"),
      tasks: external_exports.array(external_exports.string()).optional().describe("List of task IDs for phase creation"),
      mustComplete: external_exports.array(external_exports.string()).optional().describe("Tasks that must be completed before phase completion"),
      successCriteria: external_exports.array(external_exports.string()).optional().describe("Success criteria for phase completion"),
      shouldAvoid: external_exports.array(external_exports.string()).optional().describe("Things to avoid during phase execution"),
      goal: external_exports.string().optional().describe("Phase goal or objective"),
      view: external_exports.enum(["simple", "detailed", "tasks", "phases"]).optional().describe("View mode for status display")
    };
    TaskManagementOutput = {
      success: external_exports.boolean(),
      result: external_exports.any().optional(),
      error: external_exports.string().optional()
    };
    TaskBoardInput = {
      view: external_exports.enum(["simple", "detailed", "tasks", "phases"]).optional().describe("Board view format")
    };
    TaskBoardOutput = {
      success: external_exports.boolean(),
      result: external_exports.any().optional(),
      error: external_exports.string().optional()
    };
    TaskInsightsInput = {
      phase: external_exports.string().optional().describe("Specific phase to analyze (optional - analyzes all if not provided)")
    };
    TaskInsightsOutput = {
      success: external_exports.boolean(),
      result: external_exports.any().optional(),
      error: external_exports.string().optional()
    };
  }
});

// src/modules/mcp/tools/TaskTools.ts
var TaskTools_exports = {};
__export(TaskTools_exports, {
  TaskTools: () => TaskTools
});
var _TaskTools, TaskTools;
var init_TaskTools = __esm({
  "src/modules/mcp/tools/TaskTools.ts"() {
    init_types2();
    init_task_management_tool();
    init_zod_tool_helper();
    init_task_tools_schemas();
    _TaskTools = class _TaskTools {
      taskTool;
      constructor(memoryService) {
        this.taskTool = new TaskManagementTool(memoryService);
      }
      /**
       * Get all task management tools
       */
      getTools() {
        return [
          this.createTaskTool(),
          this.getTaskBoardTool(),
          this.getTaskInsightsTool()
        ];
      }
      /**
       * Main task management tool - handles all task operations
       */
      createTaskTool() {
        return {
          name: "task_management",
          title: "Task Management",
          description: "Comprehensive task and workflow management with phases, priorities, and smart insights",
          category: "workflow" /* WORKFLOW */,
          inputSchema: zodToJsonSchema(TaskManagementInput),
          outputSchema: TaskManagementOutput,
          handler: /* @__PURE__ */ __name(async (params) => {
            try {
              const result = await this.taskTool.execute(params);
              const isError = typeof result === "string" && (result.includes("Error:") || result.includes("not found") || result.includes("required for") || result.includes("Validation failed") || result.includes("Invalid") || result.includes("Unknown action"));
              return {
                content: [{
                  type: "text",
                  text: JSON.stringify(
                    isError ? { success: false, error: result.trim() } : { success: true, result }
                  )
                }],
                isError
              };
            } catch (error) {
              return {
                content: [{
                  type: "text",
                  text: JSON.stringify({
                    success: false,
                    error: `Task management error: ${error.message}`
                  })
                }],
                isError: true
              };
            }
          }, "handler")
        };
      }
      /**
       * Quick board status tool
       */
      getTaskBoardTool() {
        return {
          name: "task_board",
          title: "Task Board",
          description: "Get current task board status with visual overview",
          category: "workflow" /* WORKFLOW */,
          inputSchema: zodToJsonSchema(TaskBoardInput),
          outputSchema: TaskBoardOutput,
          handler: /* @__PURE__ */ __name(async (params) => {
            try {
              const validViews = ["simple", "detailed", "tasks", "phases"];
              if (params.view && !validViews.includes(params.view)) {
                return {
                  content: [{
                    type: "text",
                    text: JSON.stringify({
                      success: false,
                      error: `Invalid view: "${params.view}". Valid views: ${validViews.join(", ")}`
                    })
                  }],
                  isError: true
                };
              }
              const result = await this.taskTool.execute({
                action: "status",
                view: params.view || "detailed"
              });
              const isError = typeof result === "string" && (result.includes("Error:") || result.includes("not found"));
              return {
                content: [{
                  type: "text",
                  text: JSON.stringify(
                    isError ? { success: false, error: result.trim() } : { success: true, result }
                  )
                }],
                isError
              };
            } catch (error) {
              return {
                content: [{
                  type: "text",
                  text: JSON.stringify({
                    success: false,
                    error: `Board status error: ${error.message}`
                  })
                }],
                isError: true
              };
            }
          }, "handler")
        };
      }
      /**
       * Task insights and analytics tool
       */
      getTaskInsightsTool() {
        return {
          name: "task_insights",
          title: "Task Insights",
          description: "Get AI-powered insights and analytics for tasks and workflow phases",
          category: "analysis" /* ANALYSIS */,
          inputSchema: zodToJsonSchema(TaskInsightsInput),
          outputSchema: TaskInsightsOutput,
          handler: /* @__PURE__ */ __name(async (params) => {
            try {
              const result = await this.taskTool.execute({
                action: "insights",
                phase: params.phase
              });
              const isError = typeof result === "string" && (result.includes("Error:") || result.includes("not found"));
              return {
                content: [{
                  type: "text",
                  text: JSON.stringify(
                    isError ? { success: false, error: result.trim() } : { success: true, result }
                  )
                }],
                isError
              };
            } catch (error) {
              return {
                content: [{
                  type: "text",
                  text: JSON.stringify({
                    success: false,
                    error: `Insights error: ${error.message}`
                  })
                }],
                isError: true
              };
            }
          }, "handler")
        };
      }
    };
    __name(_TaskTools, "TaskTools");
    TaskTools = _TaskTools;
  }
});

// src/core/domain/profile/ProfileCategory.ts
var ProfileCategory, ALL_CATEGORIES;
var init_ProfileCategory = __esm({
  "src/core/domain/profile/ProfileCategory.ts"() {
    ProfileCategory = /* @__PURE__ */ ((ProfileCategory3) => {
      ProfileCategory3["ARCHITECTURE"] = "architecture";
      ProfileCategory3["FEATURES"] = "features";
      ProfileCategory3["DECISIONS"] = "decisions";
      ProfileCategory3["STACK"] = "stack";
      ProfileCategory3["CONVENTIONS"] = "conventions";
      return ProfileCategory3;
    })(ProfileCategory || {});
    ALL_CATEGORIES = Object.values(ProfileCategory);
  }
});

// src/core/domain/profile/ProjectProfile.ts
function createEmptyCategory() {
  return {
    content: "",
    lastUpdated: null,
    updatedBy: null
  };
}
function createEmptyProfile(projectName) {
  return {
    projectName,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    lastGitSync: null,
    version: "1.0.0",
    categories: {
      ["architecture" /* ARCHITECTURE */]: createEmptyCategory(),
      ["features" /* FEATURES */]: createEmptyCategory(),
      ["decisions" /* DECISIONS */]: createEmptyCategory(),
      ["stack" /* STACK */]: createEmptyCategory(),
      ["conventions" /* CONVENTIONS */]: createEmptyCategory()
    }
  };
}
var init_ProjectProfile = __esm({
  "src/core/domain/profile/ProjectProfile.ts"() {
    init_ProfileCategory();
    __name(createEmptyCategory, "createEmptyCategory");
    __name(createEmptyProfile, "createEmptyProfile");
  }
});

// src/core/domain/profile/index.ts
var init_profile = __esm({
  "src/core/domain/profile/index.ts"() {
    init_ProfileCategory();
    init_ProjectProfile();
  }
});

// src/modules/mcp/tools/profile-tools.schemas.ts
var ProjectProfileInput, ProjectProfileOutput;
var init_profile_tools_schemas = __esm({
  "src/modules/mcp/tools/profile-tools.schemas.ts"() {
    init_zod();
    ProjectProfileInput = {
      action: external_exports.enum(["init", "get", "update", "list"]).describe("Action to perform"),
      projectName: external_exports.string().optional().describe("Project name (for init action)"),
      category: external_exports.enum(["architecture", "features", "decisions", "stack", "conventions"]).optional().describe("Category to get/update"),
      content: external_exports.string().optional().describe("Content to set (for update action)"),
      updatedBy: external_exports.string().optional().describe('Who is updating (e.g., "claude", "user")'),
      merge: external_exports.boolean().optional().describe("Merge with existing content instead of replacing")
    };
    ProjectProfileOutput = {
      success: external_exports.boolean(),
      message: external_exports.string().optional(),
      profile: external_exports.any().optional(),
      category: external_exports.string().optional(),
      content: external_exports.string().optional(),
      categories: external_exports.array(external_exports.object({
        name: external_exports.string(),
        hasContent: external_exports.boolean(),
        lastUpdated: external_exports.string().optional(),
        updatedBy: external_exports.string().optional()
      })).optional()
    };
  }
});

// src/modules/mcp/tools/ProfileTools.ts
var ProfileTools_exports = {};
__export(ProfileTools_exports, {
  ProfileTools: () => ProfileTools
});
var _ProfileTools, ProfileTools;
var init_ProfileTools = __esm({
  "src/modules/mcp/tools/ProfileTools.ts"() {
    init_profile();
    init_zod_tool_helper();
    init_profile_tools_schemas();
    _ProfileTools = class _ProfileTools {
      repository;
      constructor(repository) {
        this.repository = repository;
      }
      /**
       * Execute profile tool action
       */
      async execute(input) {
        switch (input.action) {
          case "init":
            return this.handleInit(input);
          case "get":
            return this.handleGet(input);
          case "update":
            return this.handleUpdate(input);
          case "list":
            return this.handleList();
          default:
            return {
              success: false,
              message: `Unknown action: ${input.action}`
            };
        }
      }
      /**
       * Initialize a new project profile
       */
      async handleInit(input) {
        const exists = await this.repository.exists();
        if (exists) {
          return {
            success: false,
            message: 'Profile already exists. Use "get" to view or "update" to modify.'
          };
        }
        const projectName = input.projectName || "unnamed-project";
        const profile = createEmptyProfile(projectName);
        await this.repository.save(profile);
        return {
          success: true,
          message: `Project profile created for "${projectName}"`
        };
      }
      /**
       * Get profile or specific category
       */
      async handleGet(input) {
        const profile = await this.repository.load();
        if (!profile) {
          return {
            success: false,
            message: 'Profile not found. Use "init" to create one.'
          };
        }
        if (input.category) {
          const category = input.category;
          if (!ALL_CATEGORIES.includes(category)) {
            return {
              success: false,
              message: `Invalid category: ${input.category}. Valid: ${ALL_CATEGORIES.join(", ")}`
            };
          }
          return {
            success: true,
            category: input.category,
            content: profile.categories[category].content
          };
        }
        return {
          success: true,
          profile
        };
      }
      /**
       * Update a category
       */
      async handleUpdate(input) {
        if (!input.category) {
          return {
            success: false,
            message: "category is required for update action"
          };
        }
        const category = input.category;
        if (!ALL_CATEGORIES.includes(category)) {
          return {
            success: false,
            message: `Invalid category: ${input.category}. Valid: ${ALL_CATEGORIES.join(", ")}`
          };
        }
        const profile = await this.repository.load();
        if (!profile) {
          return {
            success: false,
            message: 'Profile not found. Use "init" to create one.'
          };
        }
        let newContent = input.content || "";
        if (input.merge) {
          const existingContent = profile.categories[category].content;
          if (existingContent) {
            newContent = `${existingContent}

${newContent}`;
          }
        }
        await this.repository.updateCategory(
          category,
          newContent,
          input.updatedBy || "unknown"
        );
        return {
          success: true,
          message: `Updated ${category}`,
          category: input.category,
          content: newContent
        };
      }
      /**
       * List all categories with status
       */
      async handleList() {
        const profile = await this.repository.load();
        if (!profile) {
          return {
            success: false,
            message: 'Profile not found. Use "init" to create one.'
          };
        }
        const categories = ALL_CATEGORIES.map((cat) => ({
          name: cat,
          hasContent: !!profile.categories[cat].content,
          lastUpdated: profile.categories[cat].lastUpdated,
          updatedBy: profile.categories[cat].updatedBy
        }));
        return {
          success: true,
          categories
        };
      }
      /**
       * Get MCP tool definitions
       */
      getTools() {
        return [
          {
            name: "project_profile",
            title: "Project Profile",
            description: "Manage project-level memory profile. Categories: architecture, features, decisions, stack, conventions.",
            inputSchema: zodToJsonSchema(ProjectProfileInput),
            outputSchema: ProjectProfileOutput,
            handler: /* @__PURE__ */ __name(async (args) => {
              const result = await this.execute(args);
              return {
                content: [{
                  type: "text",
                  text: JSON.stringify(result, null, 2)
                }],
                isError: !result.success
              };
            }, "handler")
          }
        ];
      }
    };
    __name(_ProfileTools, "ProfileTools");
    ProfileTools = _ProfileTools;
  }
});

// src/modules/mcp/tools/compaction-tools.schemas.ts
var MemoryCompactInput, MemoryCompactOutput;
var init_compaction_tools_schemas = __esm({
  "src/modules/mcp/tools/compaction-tools.schemas.ts"() {
    init_zod();
    MemoryCompactInput = {
      action: external_exports.enum(["status", "preview", "run"]).describe("Compaction action to perform"),
      memoryType: external_exports.string().optional().describe('Memory type to compact (e.g., knowledge, code, task). If not specified for "run", compacts all types above threshold.')
    };
    MemoryCompactOutput = {
      success: external_exports.boolean(),
      message: external_exports.string().optional(),
      status: external_exports.any().optional(),
      preview: external_exports.any().optional(),
      result: external_exports.any().optional(),
      results: external_exports.array(external_exports.any()).optional()
    };
  }
});

// src/modules/mcp/tools/CompactionTools.ts
var CompactionTools_exports = {};
__export(CompactionTools_exports, {
  CompactionTools: () => CompactionTools
});
var VALID_MEMORY_TYPES2, _CompactionTools, CompactionTools;
var init_CompactionTools = __esm({
  "src/modules/mcp/tools/CompactionTools.ts"() {
    init_zod_tool_helper();
    init_compaction_tools_schemas();
    VALID_MEMORY_TYPES2 = ["knowledge", "code", "task", "conversation", "document", "decision"];
    _CompactionTools = class _CompactionTools {
      compactionService;
      constructor(compactionService) {
        this.compactionService = compactionService;
      }
      /**
       * Execute compaction tool action
       */
      async execute(input) {
        if (input.memoryType && !VALID_MEMORY_TYPES2.includes(input.memoryType.toLowerCase())) {
          return {
            success: false,
            message: `Invalid memory type: "${input.memoryType}". Valid types: ${VALID_MEMORY_TYPES2.join(", ")}`
          };
        }
        switch (input.action) {
          case "status":
            return this.handleStatus();
          case "preview":
            return this.handlePreview(input);
          case "run":
            return this.handleRun(input);
          default:
            return {
              success: false,
              message: `Unknown action: ${input.action}`
            };
        }
      }
      /**
       * Get compaction status for all types
       */
      async handleStatus() {
        try {
          const status = await this.compactionService.getStatus();
          return {
            success: true,
            status
          };
        } catch (error) {
          return {
            success: false,
            message: `Failed to get status: ${error.message}`
          };
        }
      }
      /**
       * Preview what would be compacted
       */
      async handlePreview(input) {
        if (!input.memoryType) {
          return {
            success: false,
            message: "memoryType is required for preview action"
          };
        }
        try {
          const preview = await this.compactionService.preview(input.memoryType);
          return {
            success: true,
            preview
          };
        } catch (error) {
          return {
            success: false,
            message: `Failed to preview: ${error.message}`
          };
        }
      }
      /**
       * Run compaction
       */
      async handleRun(input) {
        try {
          if (input.memoryType) {
            const result = await this.compactionService.compact(input.memoryType);
            return {
              success: true,
              result
            };
          }
          const status = await this.compactionService.getStatus();
          const results = [];
          for (const [type, info] of Object.entries(status)) {
            if (info && typeof info === "object" && "needsCompaction" in info && info.needsCompaction) {
              const result = await this.compactionService.compact(type);
              results.push(result);
            }
          }
          return {
            success: true,
            message: `Compacted ${results.length} memory types`,
            results
          };
        } catch (error) {
          return {
            success: false,
            message: `Failed to run compaction: ${error.message}`
          };
        }
      }
      /**
       * Get MCP tool definitions
       */
      getTools() {
        return [
          {
            name: "memory_compact",
            title: "Memory Compact",
            description: "Compact memories to manage storage. Actions: status (check thresholds), preview (dry run), run (execute compaction)",
            inputSchema: zodToJsonSchema(MemoryCompactInput),
            outputSchema: MemoryCompactOutput,
            handler: /* @__PURE__ */ __name(async (args) => {
              const result = await this.execute(args);
              return {
                content: [{
                  type: "text",
                  text: JSON.stringify(result, null, 2)
                }],
                isError: !result.success
              };
            }, "handler")
          }
        ];
      }
    };
    __name(_CompactionTools, "CompactionTools");
    CompactionTools = _CompactionTools;
  }
});

// src/core/algorithms/analysis/contradiction-detector.ts
var ANTONYM_PAIRS, NEGATION_WORDS, STOP_WORDS, _ContradictionDetector, ContradictionDetector;
var init_contradiction_detector = __esm({
  "src/core/algorithms/analysis/contradiction-detector.ts"() {
    ANTONYM_PAIRS = [
      ["success", "failure"],
      ["working", "broken"],
      ["enabled", "disabled"],
      ["true", "false"],
      ["yes", "no"],
      ["good", "bad"],
      ["fast", "slow"],
      ["up", "down"],
      ["on", "off"],
      ["open", "closed"],
      ["active", "inactive"],
      ["valid", "invalid"],
      ["complete", "incomplete"],
      ["correct", "incorrect"],
      ["positive", "negative"],
      ["increase", "decrease"],
      ["start", "stop"],
      ["begin", "end"],
      ["allow", "deny"],
      ["accept", "reject"],
      ["pass", "fail"],
      ["connect", "disconnect"],
      ["online", "offline"]
    ];
    NEGATION_WORDS = ["not", "no", "never", "cannot", "can't", "none", "doesn't", "don't", "isn't", "aren't", "wasn't", "weren't", "won't", "wouldn't", "couldn't", "shouldn't"];
    STOP_WORDS = /* @__PURE__ */ new Set([
      "the",
      "a",
      "an",
      "is",
      "are",
      "was",
      "were",
      "be",
      "been",
      "being",
      "have",
      "has",
      "had",
      "do",
      "does",
      "did",
      "will",
      "would",
      "could",
      "should",
      "may",
      "might",
      "must",
      "shall",
      "can",
      "need",
      "dare",
      "ought",
      "used",
      "to",
      "of",
      "in",
      "for",
      "on",
      "with",
      "at",
      "by",
      "from",
      "as",
      "into",
      "through",
      "during",
      "before",
      "after",
      "above",
      "below",
      "between",
      "and",
      "but",
      "or",
      "nor",
      "so",
      "yet",
      "both",
      "either",
      "neither",
      "this",
      "that",
      "these",
      "those",
      "it",
      "its"
    ]);
    _ContradictionDetector = class _ContradictionDetector {
      /**
       * Calculate cosine similarity between two content strings
       * Uses TF-IDF inspired term frequency vectors
       */
      calculateSimilarity(content1, content2) {
        if (!content1 || !content2) return 0;
        const tokens1 = this.tokenize(content1);
        const tokens2 = this.tokenize(content2);
        if (tokens1.length === 0 || tokens2.length === 0) return 0;
        const tf1 = this.createTermFrequencyVector(tokens1);
        const tf2 = this.createTermFrequencyVector(tokens2);
        const allTerms = /* @__PURE__ */ new Set([...tf1.keys(), ...tf2.keys()]);
        let dotProduct = 0;
        let magnitude1 = 0;
        let magnitude2 = 0;
        for (const term of allTerms) {
          const freq1 = tf1.get(term) || 0;
          const freq2 = tf2.get(term) || 0;
          dotProduct += freq1 * freq2;
          magnitude1 += freq1 * freq1;
          magnitude2 += freq2 * freq2;
        }
        const magnitude = Math.sqrt(magnitude1) * Math.sqrt(magnitude2);
        if (magnitude === 0) return 0;
        return dotProduct / magnitude;
      }
      /**
       * Detect contradiction between two content strings
       */
      detectContradiction(content1, content2) {
        const similarity = this.calculateSimilarity(content1, content2);
        const tokens1 = this.tokenize(content1);
        const tokens2 = this.tokenize(content2);
        if (tokens1.length <= 2 && tokens2.length <= 2) {
          const shortAntonymResult = this.detectShortAntonyms(tokens1, tokens2);
          if (shortAntonymResult.isContradiction) {
            return { ...shortAntonymResult, similarity };
          }
        }
        if (similarity < 0.3) {
          return {
            isContradiction: false,
            confidence: 0,
            similarity
          };
        }
        const negationResult = this.detectNegation(content1, content2);
        if (negationResult.isContradiction) {
          return {
            ...negationResult,
            similarity
          };
        }
        const antonymResult = this.detectAntonymsWithTopicCheck(content1, content2, similarity);
        if (antonymResult.isContradiction) {
          return {
            ...antonymResult,
            similarity
          };
        }
        return {
          isContradiction: false,
          confidence: 0,
          similarity
        };
      }
      /**
       * Detect all contradictions in a set of memories
       */
      detectAll(memories, options) {
        if (memories.length < 2) return [];
        const results = [];
        let idCounter = 0;
        for (let i = 0; i < memories.length; i++) {
          for (let j = i + 1; j < memories.length; j++) {
            const mem1 = memories[i];
            const mem2 = memories[j];
            const result = this.detectContradiction(mem1.content, mem2.content);
            if (result.isContradiction && result.confidence >= options.threshold) {
              const batchResult = {
                id: `contradiction-${idCounter++}`,
                memoryIds: [mem1.id, mem2.id],
                type: result.type || "semantic",
                confidence: result.confidence,
                description: this.generateDescription(mem1.content, mem2.content, result.type)
              };
              if (options.includeSuggestions) {
                batchResult.suggestion = this.generateSuggestion(result.type);
              }
              results.push(batchResult);
            }
          }
        }
        return results;
      }
      /**
       * Detect negation patterns between two content strings
       */
      detectNegation(content1, content2) {
        const lower1 = content1.toLowerCase();
        const lower2 = content2.toLowerCase();
        const hasNegation1 = this.containsNegation(lower1);
        const hasNegation2 = this.containsNegation(lower2);
        if (hasNegation1 !== hasNegation2) {
          const base1 = this.removeNegationWords(lower1);
          const base2 = this.removeNegationWords(lower2);
          const baseSimilarity = this.calculateStemmedSimilarity(base1, base2);
          if (baseSimilarity > 0.5) {
            return {
              isContradiction: true,
              confidence: Math.min(0.95, baseSimilarity + 0.2),
              type: "negation",
              similarity: baseSimilarity
            };
          }
        }
        return {
          isContradiction: false,
          confidence: 0,
          similarity: 0
        };
      }
      /**
       * Calculate similarity using stemmed tokens
       */
      calculateStemmedSimilarity(content1, content2) {
        if (!content1 || !content2) return 0;
        const tokens1 = this.tokenize(content1).map((t) => this.stem(t));
        const tokens2 = this.tokenize(content2).map((t) => this.stem(t));
        if (tokens1.length === 0 || tokens2.length === 0) return 0;
        const tf1 = this.createTermFrequencyVector(tokens1);
        const tf2 = this.createTermFrequencyVector(tokens2);
        const allTerms = /* @__PURE__ */ new Set([...tf1.keys(), ...tf2.keys()]);
        let dotProduct = 0;
        let magnitude1 = 0;
        let magnitude2 = 0;
        for (const term of allTerms) {
          const freq1 = tf1.get(term) || 0;
          const freq2 = tf2.get(term) || 0;
          dotProduct += freq1 * freq2;
          magnitude1 += freq1 * freq1;
          magnitude2 += freq2 * freq2;
        }
        const magnitude = Math.sqrt(magnitude1) * Math.sqrt(magnitude2);
        return magnitude === 0 ? 0 : dotProduct / magnitude;
      }
      /**
       * Detect antonym patterns for very short content (1-2 words)
       */
      detectShortAntonyms(tokens1, tokens2) {
        const set1 = new Set(tokens1);
        const set2 = new Set(tokens2);
        for (const [word1, word2] of ANTONYM_PAIRS) {
          if (set1.has(word1) && set2.has(word2) || set1.has(word2) && set2.has(word1)) {
            return {
              isContradiction: true,
              confidence: 0.85,
              type: "antonym",
              similarity: 0
            };
          }
        }
        return {
          isContradiction: false,
          confidence: 0,
          similarity: 0
        };
      }
      /**
       * Detect antonym patterns with topic validation
       * Only detects contradiction if non-antonym words overlap significantly
       */
      detectAntonymsWithTopicCheck(content1, content2, topicSimilarity) {
        const tokens1 = this.tokenize(content1);
        const tokens2 = this.tokenize(content2);
        const set1 = new Set(tokens1);
        const set2 = new Set(tokens2);
        for (const [word1, word2] of ANTONYM_PAIRS) {
          const has1in1 = set1.has(word1);
          const has2in1 = set1.has(word2);
          const has1in2 = set2.has(word1);
          const has2in2 = set2.has(word2);
          if (has1in1 && has2in2 || has2in1 && has1in2) {
            const meaningfulTokens1 = tokens1.filter(
              (t) => t !== word1 && t !== word2 && !STOP_WORDS.has(t) && t.length > 2
            );
            const meaningfulTokens2 = tokens2.filter(
              (t) => t !== word1 && t !== word2 && !STOP_WORDS.has(t) && t.length > 2
            );
            if (meaningfulTokens1.length === 0 || meaningfulTokens2.length === 0) {
              if (topicSimilarity > 0.4) {
                return {
                  isContradiction: true,
                  confidence: Math.min(0.9, topicSimilarity + 0.2),
                  type: "antonym",
                  similarity: topicSimilarity
                };
              }
            } else {
              const stemmed1 = new Set(meaningfulTokens1.map((t) => this.stem(t)));
              const stemmed2 = new Set(meaningfulTokens2.map((t) => this.stem(t)));
              const intersection = [...stemmed1].filter((t) => stemmed2.has(t)).length;
              const union = (/* @__PURE__ */ new Set([...stemmed1, ...stemmed2])).size;
              const topicOverlap = union > 0 ? intersection / union : 0;
              if (topicOverlap > 0.3) {
                return {
                  isContradiction: true,
                  confidence: Math.min(0.9, topicOverlap + 0.3),
                  type: "antonym",
                  similarity: topicSimilarity
                };
              }
            }
          }
        }
        return {
          isContradiction: false,
          confidence: 0,
          similarity: topicSimilarity
        };
      }
      /**
       * Simple stemming - remove common suffixes
       */
      stem(word) {
        if (word.endsWith("ing")) return word.slice(0, -3);
        if (word.endsWith("ed")) return word.slice(0, -2);
        if (word.endsWith("es")) return word.slice(0, -2);
        if (word.endsWith("s") && word.length > 3) return word.slice(0, -1);
        if (word.endsWith("ly")) return word.slice(0, -2);
        if (word.endsWith("tion")) return word.slice(0, -4);
        return word;
      }
      /**
       * Tokenize content into lowercase words
       */
      tokenize(content) {
        return content.toLowerCase().replace(/[^\w\s]/g, " ").split(/\s+/).filter((token) => token.length > 0);
      }
      /**
       * Create term frequency vector from tokens
       */
      createTermFrequencyVector(tokens) {
        const tf = /* @__PURE__ */ new Map();
        const totalTokens = tokens.length;
        for (const token of tokens) {
          tf.set(token, (tf.get(token) || 0) + 1);
        }
        for (const [token, count] of tf.entries()) {
          tf.set(token, count / totalTokens);
        }
        return tf;
      }
      /**
       * Check if content contains negation words
       */
      containsNegation(content) {
        const words = content.split(/\s+/);
        return words.some((word) => NEGATION_WORDS.includes(word));
      }
      /**
       * Remove negation words from content
       */
      removeNegationWords(content) {
        let result = content;
        for (const negWord of NEGATION_WORDS) {
          result = result.replace(new RegExp(`\\b${negWord}\\b`, "gi"), "");
        }
        return result.replace(/\s+/g, " ").trim();
      }
      /**
       * Generate description for a contradiction
       */
      generateDescription(content1, content2, type) {
        const snippet1 = content1.substring(0, 50) + (content1.length > 50 ? "..." : "");
        const snippet2 = content2.substring(0, 50) + (content2.length > 50 ? "..." : "");
        switch (type) {
          case "negation":
            return `Negation contradiction detected: "${snippet1}" vs "${snippet2}"`;
          case "antonym":
            return `Antonym contradiction detected: "${snippet1}" vs "${snippet2}"`;
          default:
            return `Semantic contradiction detected: "${snippet1}" vs "${snippet2}"`;
        }
      }
      /**
       * Generate suggestion for resolving a contradiction
       */
      generateSuggestion(type) {
        switch (type) {
          case "negation":
            return "Review both memories and determine which statement is current. Consider deleting or updating the outdated one.";
          case "antonym":
            return "Review both memories to resolve the conflicting states. One may be outdated or context-specific.";
          default:
            return "Review both memories and resolve the semantic conflict by clarifying or updating the content.";
        }
      }
    };
    __name(_ContradictionDetector, "ContradictionDetector");
    ContradictionDetector = _ContradictionDetector;
  }
});

// src/core/algorithms/analysis/anomaly-detector.ts
var _AnomalyDetector, AnomalyDetector;
var init_anomaly_detector = __esm({
  "src/core/algorithms/analysis/anomaly-detector.ts"() {
    _AnomalyDetector = class _AnomalyDetector {
      /**
       * Calculate mean of values
       */
      calculateMean(values) {
        if (values.length === 0) return 0;
        return values.reduce((sum, v) => sum + v, 0) / values.length;
      }
      /**
       * Calculate standard deviation of values
       */
      calculateStdDev(values) {
        if (values.length === 0) return 0;
        const mean = this.calculateMean(values);
        const squaredDiffs = values.map((v) => Math.pow(v - mean, 2));
        const variance = squaredDiffs.reduce((sum, v) => sum + v, 0) / values.length;
        return Math.sqrt(variance);
      }
      /**
       * Calculate z-score for a value
       */
      calculateZScore(value, mean, stdDev) {
        if (stdDev === 0) return 0;
        return (value - mean) / stdDev;
      }
      /**
       * Get z-score threshold based on sensitivity
       */
      getSensitivityThreshold(sensitivity) {
        switch (sensitivity) {
          case "low":
            return 3;
          // 3 sigma - very few false positives
          case "medium":
            return 2;
          // 2 sigma - balanced
          case "high":
            return 1.5;
          // 1.5 sigma - more sensitive
          default:
            return 2;
        }
      }
      /**
       * Get severity based on z-score magnitude
       */
      getSeverityFromZScore(zScore) {
        const absZ = Math.abs(zScore);
        if (absZ >= 4) return "critical";
        if (absZ >= 3) return "high";
        if (absZ >= 2) return "medium";
        return "low";
      }
      /**
       * Detect anomalies in memory set
       */
      detect(memories, options) {
        if (memories.length < 5) return [];
        const sensitivity = options.sensitivity || "medium";
        const threshold = this.getSensitivityThreshold(sensitivity);
        const metrics = options.metrics || ["length", "frequency", "gap"];
        const anomalies = [];
        let idCounter = 0;
        if (metrics.includes("length")) {
          const lengthAnomalies = this.detectLengthAnomalies(memories, threshold, idCounter);
          anomalies.push(...lengthAnomalies);
          idCounter += lengthAnomalies.length;
        }
        if (metrics.includes("frequency")) {
          const frequencyAnomalies = this.detectFrequencyAnomalies(memories, threshold, idCounter);
          anomalies.push(...frequencyAnomalies);
          idCounter += frequencyAnomalies.length;
        }
        if (metrics.includes("gap")) {
          const gapAnomalies = this.detectGapAnomalies(memories, threshold, idCounter);
          anomalies.push(...gapAnomalies);
          idCounter += gapAnomalies.length;
        }
        return anomalies;
      }
      /**
       * Detect length outliers
       */
      detectLengthAnomalies(memories, threshold, startId) {
        const lengths = memories.map((m) => m.content.length);
        const mean = this.calculateMean(lengths);
        const stdDev = this.calculateStdDev(lengths);
        if (stdDev === 0) return [];
        const anomalies = [];
        memories.forEach((memory, index) => {
          const zScore = this.calculateZScore(lengths[index], mean, stdDev);
          if (Math.abs(zScore) > threshold) {
            const direction = zScore > 0 ? "longer" : "shorter";
            anomalies.push({
              id: `anomaly-${startId + anomalies.length}`,
              type: "length_outlier",
              memoryId: memory.id,
              description: `Memory content is unusually ${direction} (${lengths[index]} chars, mean: ${Math.round(mean)})`,
              severity: this.getSeverityFromZScore(zScore),
              zScore: Math.round(zScore * 100) / 100,
              detectedAt: (/* @__PURE__ */ new Date()).toISOString()
            });
          }
        });
        return anomalies;
      }
      /**
       * Detect frequency spikes (sudden increases in memory creation rate)
       */
      detectFrequencyAnomalies(memories, threshold, startId) {
        const withDates = memories.filter((m) => m.createdAt);
        if (withDates.length < 5) return [];
        const sorted = [...withDates].sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        const dailyCounts = {};
        sorted.forEach((memory) => {
          const date = new Date(memory.createdAt);
          const dayKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
          if (!dailyCounts[dayKey]) {
            dailyCounts[dayKey] = { count: 0, memories: [] };
          }
          dailyCounts[dayKey].count++;
          dailyCounts[dayKey].memories.push(memory);
        });
        const counts = Object.values(dailyCounts).map((d) => d.count);
        if (counts.length < 3) return [];
        const mean = this.calculateMean(counts);
        const stdDev = this.calculateStdDev(counts);
        if (stdDev === 0) return [];
        const anomalies = [];
        Object.entries(dailyCounts).forEach(([dayKey, data]) => {
          const zScore = this.calculateZScore(data.count, mean, stdDev);
          if (Math.abs(zScore) > threshold) {
            const direction = zScore > 0 ? "spike" : "drop";
            anomalies.push({
              id: `anomaly-${startId + anomalies.length}`,
              type: "frequency_spike",
              memoryId: data.memories[0].id,
              description: `Unusual ${direction} in memory creation: ${data.count} memories (mean: ${mean.toFixed(1)}/day)`,
              severity: this.getSeverityFromZScore(zScore),
              zScore: Math.round(zScore * 100) / 100,
              detectedAt: (/* @__PURE__ */ new Date()).toISOString()
            });
          }
        });
        return anomalies;
      }
      /**
       * Detect unusual gaps between memory creation
       */
      detectGapAnomalies(memories, threshold, startId) {
        const withDates = memories.filter((m) => m.createdAt);
        if (withDates.length < 5) return [];
        const sorted = [...withDates].sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        const gaps = [];
        for (let i = 1; i < sorted.length; i++) {
          const gap = new Date(sorted[i].createdAt).getTime() - new Date(sorted[i - 1].createdAt).getTime();
          gaps.push({ gap, afterMemory: sorted[i] });
        }
        if (gaps.length < 3) return [];
        const gapValues = gaps.map((g) => g.gap);
        const mean = this.calculateMean(gapValues);
        const stdDev = this.calculateStdDev(gapValues);
        if (stdDev === 0) return [];
        const anomalies = [];
        gaps.forEach(({ gap, afterMemory }) => {
          const zScore = this.calculateZScore(gap, mean, stdDev);
          if (Math.abs(zScore) > threshold) {
            const gapDays = Math.round(gap / (1e3 * 60 * 60 * 24) * 10) / 10;
            const meanDays = Math.round(mean / (1e3 * 60 * 60 * 24) * 10) / 10;
            const gapType = zScore > 0 ? "long" : "short";
            anomalies.push({
              id: `anomaly-${startId + anomalies.length}`,
              type: "gap_anomaly",
              memoryId: afterMemory.id,
              description: `Unusually ${gapType} gap before this memory: ${gapDays} days (mean: ${meanDays} days)`,
              severity: this.getSeverityFromZScore(zScore),
              zScore: Math.round(zScore * 100) / 100,
              detectedAt: (/* @__PURE__ */ new Date()).toISOString()
            });
          }
        });
        return anomalies;
      }
    };
    __name(_AnomalyDetector, "AnomalyDetector");
    AnomalyDetector = _AnomalyDetector;
  }
});

// src/core/algorithms/analysis/trend-forecaster.ts
var _TrendForecaster, TrendForecaster;
var init_trend_forecaster = __esm({
  "src/core/algorithms/analysis/trend-forecaster.ts"() {
    _TrendForecaster = class _TrendForecaster {
      /**
       * Calculate linear regression coefficients
       */
      linearRegression(data) {
        if (data.length < 2) {
          return { slope: 0, intercept: 0, rSquared: 0 };
        }
        const n = data.length;
        const x = data.map((_, i) => i);
        const y = data.map((d) => d.value);
        const meanX = x.reduce((sum, v) => sum + v, 0) / n;
        const meanY = y.reduce((sum, v) => sum + v, 0) / n;
        let numerator = 0;
        let denominator = 0;
        for (let i = 0; i < n; i++) {
          numerator += (x[i] - meanX) * (y[i] - meanY);
          denominator += Math.pow(x[i] - meanX, 2);
        }
        if (denominator === 0) {
          return { slope: 0, intercept: meanY, rSquared: 0 };
        }
        const slope = numerator / denominator;
        const intercept = meanY - slope * meanX;
        let ssRes = 0;
        let ssTot = 0;
        for (let i = 0; i < n; i++) {
          const predicted = slope * x[i] + intercept;
          ssRes += Math.pow(y[i] - predicted, 2);
          ssTot += Math.pow(y[i] - meanY, 2);
        }
        const rSquared = ssTot === 0 ? 1 : 1 - ssRes / ssTot;
        return { slope, intercept, rSquared: Math.max(0, rSquared) };
      }
      /**
       * Apply exponential smoothing to values
       */
      exponentialSmoothing(values, alpha = 0.3) {
        if (values.length === 0) return [];
        if (values.length === 1) return [...values];
        const smoothed = [values[0]];
        for (let i = 1; i < values.length; i++) {
          const smoothedValue = alpha * values[i] + (1 - alpha) * smoothed[i - 1];
          smoothed.push(smoothedValue);
        }
        return smoothed;
      }
      /**
       * Generate forecast from memory data
       */
      forecast(memories, options) {
        const result = {
          forecast: [],
          metric: options.metric,
          model: options.model || "auto",
          horizon: options.horizon,
          trendDirection: "stable",
          generatedAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        if (memories.length < 3) {
          result.error = "Not enough data for forecasting (minimum 3 required)";
          return result;
        }
        const dailyData = this.aggregateByDay(memories);
        if (dailyData.length < 3) {
          result.error = "Not enough daily data points for forecasting";
          return result;
        }
        let selectedModel = options.model || "auto";
        if (selectedModel === "auto") {
          selectedModel = this.selectBestModel(dailyData);
        }
        result.model = selectedModel;
        const confidence = options.confidence || 0.7;
        if (selectedModel === "linear") {
          const regression = this.linearRegression(dailyData);
          result.rSquared = regression.rSquared;
          result.trendDirection = this.getTrendDirection(regression.slope);
          result.forecast = this.generateLinearForecast(
            dailyData,
            regression,
            options.horizon,
            confidence
          );
        } else {
          const values = dailyData.map((d) => d.value);
          const smoothed = this.exponentialSmoothing(values);
          const lastSmoothed = smoothed[smoothed.length - 1];
          const regression = this.linearRegression(dailyData);
          result.rSquared = regression.rSquared;
          result.trendDirection = this.getTrendDirection(regression.slope);
          result.forecast = this.generateExponentialForecast(
            dailyData,
            smoothed,
            options.horizon,
            confidence
          );
        }
        return result;
      }
      /**
       * Aggregate memories by day
       */
      aggregateByDay(memories) {
        const dailyCounts = /* @__PURE__ */ new Map();
        memories.forEach((memory) => {
          if (!memory.createdAt) return;
          const date = new Date(memory.createdAt);
          const dayKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
          if (!dailyCounts.has(dayKey)) {
            dailyCounts.set(dayKey, {
              date: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
              count: 0
            });
          }
          dailyCounts.get(dayKey).count++;
        });
        const sorted = Array.from(dailyCounts.values()).sort((a, b) => a.date.getTime() - b.date.getTime()).map((d) => ({ date: d.date, value: d.count }));
        return sorted;
      }
      /**
       * Select best model based on data characteristics
       */
      selectBestModel(data) {
        const regression = this.linearRegression(data);
        if (regression.rSquared > 0.7) {
          return "linear";
        }
        return "exponential";
      }
      /**
       * Get trend direction from slope
       */
      getTrendDirection(slope) {
        if (slope > 0.1) return "increasing";
        if (slope < -0.1) return "decreasing";
        return "stable";
      }
      /**
       * Generate forecast using linear regression
       */
      generateLinearForecast(data, regression, horizon, confidence) {
        const forecast = [];
        const lastDate = data[data.length - 1].date;
        const n = data.length;
        const residuals = data.map((d, i) => {
          const predicted = regression.slope * i + regression.intercept;
          return d.value - predicted;
        });
        const residualStdDev = this.calculateStdDev(residuals);
        for (let i = 1; i <= horizon; i++) {
          const xValue = n - 1 + i;
          const predictedValue = Math.max(0, regression.slope * xValue + regression.intercept);
          const spreadFactor = (1 - confidence) * Math.sqrt(1 + i / n);
          const marginOfError = residualStdDev * 1.96 * spreadFactor;
          const forecastDate = new Date(lastDate.getTime() + i * 24 * 60 * 60 * 1e3);
          forecast.push({
            day: i,
            date: forecastDate.toISOString().split("T")[0],
            value: Math.round(predictedValue * 100) / 100,
            confidence,
            lowerBound: Math.max(0, Math.round((predictedValue - marginOfError) * 100) / 100),
            upperBound: Math.round((predictedValue + marginOfError) * 100) / 100
          });
        }
        return forecast;
      }
      /**
       * Generate forecast using exponential smoothing
       */
      generateExponentialForecast(data, smoothed, horizon, confidence) {
        const forecast = [];
        const lastDate = data[data.length - 1].date;
        const lastSmoothed = smoothed[smoothed.length - 1];
        const recentTrend = smoothed.length >= 2 ? smoothed[smoothed.length - 1] - smoothed[smoothed.length - 2] : 0;
        const errors = data.map((d, i) => d.value - smoothed[i]);
        const errorStdDev = this.calculateStdDev(errors);
        for (let i = 1; i <= horizon; i++) {
          const dampingFactor = Math.pow(0.9, i);
          const predictedValue = Math.max(0, lastSmoothed + recentTrend * i * dampingFactor);
          const spreadFactor = (1 - confidence) * Math.sqrt(i);
          const marginOfError = errorStdDev * 1.96 * spreadFactor;
          const forecastDate = new Date(lastDate.getTime() + i * 24 * 60 * 60 * 1e3);
          forecast.push({
            day: i,
            date: forecastDate.toISOString().split("T")[0],
            value: Math.round(predictedValue * 100) / 100,
            confidence,
            lowerBound: Math.max(0, Math.round((predictedValue - marginOfError) * 100) / 100),
            upperBound: Math.round((predictedValue + marginOfError) * 100) / 100
          });
        }
        return forecast;
      }
      /**
       * Calculate standard deviation
       */
      calculateStdDev(values) {
        if (values.length === 0) return 0;
        const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
        const squaredDiffs = values.map((v) => Math.pow(v - mean, 2));
        const variance = squaredDiffs.reduce((sum, v) => sum + v, 0) / values.length;
        return Math.sqrt(variance);
      }
    };
    __name(_TrendForecaster, "TrendForecaster");
    TrendForecaster = _TrendForecaster;
  }
});

// src/modules/mcp/services/AnalysisServiceWrapper.ts
var AnalysisServiceWrapper_exports = {};
__export(AnalysisServiceWrapper_exports, {
  AnalysisServiceWrapper: () => AnalysisServiceWrapper
});
var _AnalysisServiceWrapper, AnalysisServiceWrapper;
var init_AnalysisServiceWrapper = __esm({
  "src/modules/mcp/services/AnalysisServiceWrapper.ts"() {
    init_contradiction_detector();
    init_anomaly_detector();
    init_trend_forecaster();
    _AnalysisServiceWrapper = class _AnalysisServiceWrapper {
      memoryService;
      repository;
      multiProjectService;
      // Real algorithm implementations
      contradictionDetector;
      anomalyDetector;
      trendForecaster;
      constructor(memoryService, repository, multiProjectService) {
        this.memoryService = memoryService;
        this.repository = repository;
        this.multiProjectService = multiProjectService;
        this.contradictionDetector = new ContradictionDetector();
        this.anomalyDetector = new AnomalyDetector();
        this.trendForecaster = new TrendForecaster();
      }
      /**
       * Check if multi-project mode is active
       */
      isMultiProjectMode() {
        var _a, _b;
        return ((_b = (_a = this.multiProjectService) == null ? void 0 : _a.isMultiMode) == null ? void 0 : _b.call(_a)) ?? false;
      }
      /**
       * Detect conflicts between memories using real cosine similarity + negation detection
       */
      async detectConflicts(params) {
        try {
          if (params.threshold !== void 0) {
            if (params.threshold < 0 || params.threshold > 1) {
              throw new Error("Threshold must be between 0 and 1");
            }
          }
          const memories = await this.getAllMemories();
          if (memories.length < 2) {
            return {
              conflicts: [],
              summary: "Not enough memories to detect conflicts (minimum 2 required)",
              analysisDate: (/* @__PURE__ */ new Date()).toISOString()
            };
          }
          const threshold = params.threshold || 0.7;
          const conflicts = this.contradictionDetector.detectAll(
            memories.map((m) => ({ id: m.id, content: m.content })),
            {
              threshold,
              includeSuggestions: params.include_suggestions
            }
          );
          return {
            conflicts,
            summary: `Analyzed ${memories.length} memories, found ${conflicts.length} potential conflicts`,
            analysisDate: (/* @__PURE__ */ new Date()).toISOString(),
            scope: params.scope,
            threshold
          };
        } catch (error) {
          throw new Error(`Conflict detection failed: ${error.message}`);
        }
      }
      /**
       * Generate memory relationship map
       */
      async generateMemoryMap(params) {
        try {
          const validFormats = ["graph", "tree", "matrix", "json"];
          if (!validFormats.includes(params.format)) {
            throw new Error(`Invalid format: "${params.format}". Valid formats: ${validFormats.join(", ")}`);
          }
          if (params.depth !== void 0) {
            if (!Number.isInteger(params.depth) || params.depth < 1 || params.depth > 5) {
              throw new Error("Depth must be an integer between 1 and 5");
            }
          }
          const memories = await this.getAllMemories();
          if (memories.length === 0) {
            return {
              nodes: [],
              edges: [],
              format: params.format,
              message: "No memories found to map"
            };
          }
          const nodes = memories.map((memory) => {
            var _a;
            return {
              id: memory.id,
              label: memory.content.substring(0, 50) + (memory.content.length > 50 ? "..." : ""),
              type: memory.memoryType,
              createdAt: memory.createdAt,
              tags: ((_a = memory.metadata) == null ? void 0 : _a.tags) || []
            };
          });
          const edges = [];
          for (let i = 0; i < memories.length; i++) {
            for (let j = i + 1; j < memories.length; j++) {
              const mem1 = memories[i];
              const mem2 = memories[j];
              if (this.hasRelationship(mem1, mem2)) {
                edges.push({
                  source: mem1.id,
                  target: mem2.id,
                  type: "relationship",
                  strength: 0.8
                });
              }
            }
          }
          const result = {
            nodes,
            edges,
            format: params.format,
            generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
            summary: `Generated map with ${nodes.length} nodes and ${edges.length} connections`
          };
          if (params.format !== "json") {
            result.rendered = this.renderFormat(nodes, edges, params.format);
          }
          return result;
        } catch (error) {
          throw new Error(`Memory map generation failed: ${error.message}`);
        }
      }
      /**
       * Detect anomalies using real z-score statistical analysis
       */
      async detectAnomalies(params) {
        try {
          const startDate = new Date(params.time_range.start);
          const endDate = new Date(params.time_range.end);
          if (isNaN(startDate.getTime())) {
            throw new Error("Invalid start date");
          }
          if (isNaN(endDate.getTime())) {
            throw new Error("Invalid end date");
          }
          if (startDate > endDate) {
            throw new Error("Start date must be before end date");
          }
          const memories = await this.getMemoriesInTimeRange(params.time_range);
          if (memories.length < 5) {
            return {
              anomalies: [],
              summary: "Not enough memories for anomaly detection (minimum 5 required)",
              analysisDate: (/* @__PURE__ */ new Date()).toISOString()
            };
          }
          const validMetrics = ["length", "frequency", "gap"];
          const metricsToUse = params.metrics ? params.metrics.filter((m) => validMetrics.includes(m)) : void 0;
          const anomalies = this.anomalyDetector.detect(
            memories.map((m) => ({
              id: m.id,
              content: m.content,
              createdAt: m.createdAt ? new Date(m.createdAt) : void 0
            })),
            {
              sensitivity: params.sensitivity || "medium",
              metrics: metricsToUse
            }
          );
          return {
            anomalies,
            summary: `Analyzed ${memories.length} memories in time range, found ${anomalies.length} anomalies`,
            analysisDate: (/* @__PURE__ */ new Date()).toISOString(),
            timeRange: params.time_range,
            sensitivity: params.sensitivity || "medium"
          };
        } catch (error) {
          throw new Error(`Anomaly detection failed: ${error.message}`);
        }
      }
      /**
       * Forecast using real linear regression and exponential smoothing
       */
      async forecast(params) {
        try {
          const memories = await this.getAllMemories();
          if (memories.length < 3) {
            return {
              forecast: [],
              summary: "Not enough data for forecasting (minimum 3 memories required)",
              analysisDate: (/* @__PURE__ */ new Date()).toISOString()
            };
          }
          const model = params.model === "arima" ? "auto" : params.model || "auto";
          const result = this.trendForecaster.forecast(
            memories.map((m) => ({
              id: m.id,
              content: m.content,
              createdAt: m.createdAt ? new Date(m.createdAt) : void 0
            })),
            {
              metric: params.metric,
              horizon: params.horizon,
              model,
              confidence: params.confidence
            }
          );
          return {
            forecast: result.forecast.map((f) => ({
              day: f.day,
              date: f.date,
              predicted_value: f.value,
              confidence: f.confidence,
              lower_bound: f.lowerBound,
              upper_bound: f.upperBound
            })),
            summary: `Generated ${params.horizon}-day forecast for ${params.metric}`,
            metric: params.metric,
            model: result.model,
            horizon: params.horizon,
            generatedAt: result.generatedAt,
            trend_direction: result.trendDirection,
            r_squared: result.rSquared
          };
        } catch (error) {
          throw new Error(`Forecasting failed: ${error.message}`);
        }
      }
      // Helper methods
      async getAllMemories() {
        var _a, _b, _c, _d;
        try {
          if (this.isMultiProjectMode()) {
            return await this.multiProjectService.getAllMemories();
          }
          if ((_a = this.repository) == null ? void 0 : _a.findAll) {
            return await this.repository.findAll();
          } else if ((_b = this.memoryService) == null ? void 0 : _b.query) {
            return await this.memoryService.query();
          } else if ((_c = this.repository) == null ? void 0 : _c.getAll) {
            return await this.repository.getAll();
          } else if ((_d = this.memoryService) == null ? void 0 : _d.getAll) {
            return await this.memoryService.getAll();
          } else {
            return [];
          }
        } catch (error) {
          return [];
        }
      }
      async getMemoriesInTimeRange(timeRange) {
        const allMemories = await this.getAllMemories();
        const sorted = [...allMemories].sort((a, b) => {
          const dateA = new Date(a.createdAt || 0).getTime();
          const dateB = new Date(b.createdAt || 0).getTime();
          return dateA - dateB;
        });
        const startDate = new Date(timeRange.start);
        const endDate = new Date(timeRange.end);
        return sorted.filter((memory) => {
          if (!memory.createdAt) return false;
          const createdAt = new Date(memory.createdAt);
          return createdAt >= startDate && createdAt <= endDate;
        });
      }
      hasRelationship(mem1, mem2) {
        var _a, _b, _c, _d;
        const tags1 = ((_a = mem1.metadata) == null ? void 0 : _a.tags) || [];
        const tags2 = ((_b = mem2.metadata) == null ? void 0 : _b.tags) || [];
        return tags1.some((tag) => tags2.includes(tag)) || ((_c = mem1.relationships) == null ? void 0 : _c.some((rel) => rel.targetId === mem2.id)) || ((_d = mem2.relationships) == null ? void 0 : _d.some((rel) => rel.targetId === mem1.id));
      }
      renderFormat(nodes, edges, format) {
        switch (format) {
          case "dot":
            return this.renderAsDot(nodes, edges);
          case "mermaid":
            return this.renderAsMermaid(nodes, edges);
          case "tree":
            return this.renderAsTree(nodes, edges);
          case "matrix":
            return this.renderAsMatrix(nodes, edges);
          default:
            return JSON.stringify({ nodes, edges }, null, 2);
        }
      }
      renderAsDot(nodes, edges) {
        const lines = ["digraph MemoryMap {"];
        lines.push("  rankdir=LR;");
        lines.push("  node [shape=box];");
        nodes.forEach((n) => {
          const label = n.label.replace(/"/g, '\\"');
          lines.push(`  "${n.id}" [label="${label}"];`);
        });
        edges.forEach((e) => {
          lines.push(`  "${e.source}" -> "${e.target}" [label="${e.type}"];`);
        });
        lines.push("}");
        return lines.join("\n");
      }
      renderAsMermaid(nodes, edges) {
        const lines = ["graph LR"];
        edges.forEach((e) => {
          const sourceNode = nodes.find((n) => n.id === e.source);
          const targetNode = nodes.find((n) => n.id === e.target);
          const sourceLabel = (sourceNode == null ? void 0 : sourceNode.label) || e.source;
          const targetLabel = (targetNode == null ? void 0 : targetNode.label) || e.target;
          lines.push(`  ${e.source}["${sourceLabel}"] -->|${e.type}| ${e.target}["${targetLabel}"]`);
        });
        const connectedIds = new Set(edges.flatMap((e) => [e.source, e.target]));
        nodes.filter((n) => !connectedIds.has(n.id)).forEach((n) => {
          lines.push(`  ${n.id}["${n.label}"]`);
        });
        return lines.join("\n");
      }
      renderAsTree(nodes, edges) {
        const lines = [];
        const visited = /* @__PURE__ */ new Set();
        const printNode = /* @__PURE__ */ __name((nodeId, depth) => {
          if (visited.has(nodeId)) return;
          visited.add(nodeId);
          const node = nodes.find((n) => n.id === nodeId);
          if (!node) return;
          const indent = "  ".repeat(depth);
          lines.push(`${indent}- ${node.label}`);
          edges.filter((e) => e.source === nodeId).forEach((e) => printNode(e.target, depth + 1));
        }, "printNode");
        const targets = new Set(edges.map((e) => e.target));
        const roots = nodes.filter((n) => !targets.has(n.id));
        roots.forEach((n) => printNode(n.id, 0));
        nodes.filter((n) => !visited.has(n.id)).forEach((n) => {
          lines.push(`- ${n.label}`);
        });
        return lines.join("\n");
      }
      renderAsMatrix(nodes, edges) {
        const nodeIds = nodes.map((n) => n.id);
        const matrix = nodeIds.map(() => nodeIds.map(() => 0));
        edges.forEach((e) => {
          const sourceIdx = nodeIds.indexOf(e.source);
          const targetIdx = nodeIds.indexOf(e.target);
          if (sourceIdx >= 0 && targetIdx >= 0) {
            matrix[sourceIdx][targetIdx] = 1;
            matrix[targetIdx][sourceIdx] = 1;
          }
        });
        const lines = [];
        lines.push("Adjacency Matrix:");
        lines.push("  " + nodeIds.map((_, i) => i.toString().padStart(2)).join(" "));
        matrix.forEach((row, i) => {
          lines.push(`${i.toString().padStart(2)} ${row.map((v) => v.toString().padStart(2)).join(" ")}`);
        });
        return lines.join("\n");
      }
    };
    __name(_AnalysisServiceWrapper, "AnalysisServiceWrapper");
    AnalysisServiceWrapper = _AnalysisServiceWrapper;
  }
});

// src/core/services/compaction/strategies.ts
function getStrategy(name) {
  switch (name) {
    case "merge":
      return new MergeStrategy();
    case "summarize":
      return new SummarizeStrategy();
    case "archive":
      return new ArchiveStrategy();
    default:
      return new SummarizeStrategy();
  }
}
var _MergeStrategy, MergeStrategy, _SummarizeStrategy, SummarizeStrategy, _ArchiveStrategy, ArchiveStrategy;
var init_strategies = __esm({
  "src/core/services/compaction/strategies.ts"() {
    _MergeStrategy = class _MergeStrategy {
      async compact(memories) {
        if (memories.length === 0) {
          return { merged: [], archived: [] };
        }
        const combinedContent = memories.map((m) => m.content).join("\n\n");
        const timestamps = memories.filter((m) => m.createdAt).map((m) => new Date(m.createdAt).getTime());
        const latestTimestamp = timestamps.length > 0 ? new Date(Math.max(...timestamps)).toISOString() : (/* @__PURE__ */ new Date()).toISOString();
        const merged = {
          content: combinedContent,
          createdAt: latestTimestamp,
          metadata: {
            isMerged: true,
            mergedFrom: memories.map((m) => m.id),
            mergedCount: memories.length
          }
        };
        return {
          merged: [merged],
          archived: memories.map((m) => ({ id: m.id }))
        };
      }
    };
    __name(_MergeStrategy, "MergeStrategy");
    MergeStrategy = _MergeStrategy;
    _SummarizeStrategy = class _SummarizeStrategy {
      async compact(memories) {
        if (memories.length === 0) {
          return { merged: [], archived: [] };
        }
        const summary = this.createSummary(memories);
        const merged = {
          content: summary,
          createdAt: (/* @__PURE__ */ new Date()).toISOString(),
          metadata: {
            isSummary: true,
            originalIds: memories.map((m) => m.id),
            summarizedCount: memories.length
          }
        };
        return {
          merged: [merged],
          archived: memories.map((m) => ({ id: m.id }))
        };
      }
      createSummary(memories) {
        const points = memories.map((m) => {
          const firstLine = m.content.split("\n")[0];
          return firstLine.length > 100 ? firstLine.substring(0, 100) + "..." : firstLine;
        });
        return `Summary of ${memories.length} memories:

` + points.map((p, i) => `${i + 1}. ${p}`).join("\n");
      }
    };
    __name(_SummarizeStrategy, "SummarizeStrategy");
    SummarizeStrategy = _SummarizeStrategy;
    _ArchiveStrategy = class _ArchiveStrategy {
      async compact(memories) {
        if (memories.length === 0) {
          return { merged: [], archived: [] };
        }
        const reference = {
          content: `Archive reference: ${memories.length} memories archived`,
          createdAt: (/* @__PURE__ */ new Date()).toISOString(),
          metadata: {
            type: "archive_reference",
            archivedIds: memories.map((m) => m.id),
            archivedCount: memories.length,
            archivedAt: (/* @__PURE__ */ new Date()).toISOString()
          }
        };
        return {
          merged: [reference],
          archived: memories.map((m) => ({ id: m.id }))
        };
      }
    };
    __name(_ArchiveStrategy, "ArchiveStrategy");
    ArchiveStrategy = _ArchiveStrategy;
    __name(getStrategy, "getStrategy");
  }
});

// src/core/services/compaction/CompactionService.ts
var _CompactionService, CompactionService;
var init_CompactionService = __esm({
  "src/core/services/compaction/CompactionService.ts"() {
    init_strategies();
    _CompactionService = class _CompactionService {
      repository;
      config;
      constructor(repository, config) {
        this.repository = repository;
        this.config = config;
      }
      /**
       * Get memories of a specific type (adapter for different repository interfaces)
       */
      async getMemoriesByType(memoryType) {
        if (this.repository.findByType) {
          const result = await this.repository.findByType(memoryType);
          if (result && Array.isArray(result)) {
            return result;
          }
        }
        if (this.repository.findAll) {
          const all = await this.repository.findAll();
          if (all && Array.isArray(all)) {
            return all.filter((m) => m.memoryType === memoryType || m.memory_type === memoryType);
          }
        }
        return [];
      }
      /**
       * Get count of memories for a type (adapter for different repository interfaces)
       */
      async getCountByType(memoryType) {
        const memories = await this.getMemoriesByType(memoryType);
        if (memories.length > 0) {
          return memories.length;
        }
        if (this.repository.count) {
          try {
            return await this.repository.count(memoryType);
          } catch {
            return 0;
          }
        }
        return 0;
      }
      /**
       * Check if a memory type needs compaction
       */
      async shouldCompact(memoryType) {
        const count = await this.getCountByType(memoryType);
        const threshold = this.config.thresholds[memoryType] || 50;
        return count > threshold;
      }
      /**
       * Compact memories of a specific type
       */
      async compact(memoryType) {
        const memories = await this.getMemoriesByType(memoryType);
        const { toPreserve, toCompact } = this.categorizeMemories(memories);
        const result = {
          memoryType,
          strategy: this.config.strategy,
          preserved: toPreserve.map((m) => m.id),
          compacted: toCompact.map((m) => m.id),
          newMemoriesCreated: 0,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        };
        if (toCompact.length === 0) {
          return result;
        }
        const strategy = getStrategy(this.config.strategy);
        const strategyResult = await strategy.compact(toCompact);
        for (const merged of strategyResult.merged) {
          await this.repository.create({
            ...merged,
            memory_type: memoryType
          });
          result.newMemoriesCreated++;
        }
        for (const archived of strategyResult.archived) {
          await this.repository.update(archived.id, { archived: true });
        }
        return result;
      }
      /**
       * Preview what would be compacted without making changes
       */
      async preview(memoryType) {
        const memories = await this.getMemoriesByType(memoryType);
        const { toPreserve, toCompact } = this.categorizeMemories(memories);
        return {
          memoryType,
          wouldCompact: toCompact.map((m) => m.id),
          wouldPreserve: toPreserve.map((m) => m.id),
          strategy: this.config.strategy
        };
      }
      /**
       * Get compaction status for all configured types
       */
      async getStatus() {
        const status = {};
        for (const [type, threshold] of Object.entries(this.config.thresholds)) {
          const count = await this.getCountByType(type);
          status[type] = {
            count,
            threshold,
            needsCompaction: count > threshold
          };
        }
        return status;
      }
      /**
       * Categorize memories into those to preserve and those to compact
       */
      categorizeMemories(memories) {
        var _a;
        const now = /* @__PURE__ */ new Date();
        const preserveMs = this.config.preserveDays * 24 * 60 * 60 * 1e3;
        const toPreserve = [];
        const toCompact = [];
        for (const memory of memories) {
          if (memory.createdAt) {
            const createdAt = new Date(memory.createdAt);
            if (now.getTime() - createdAt.getTime() < preserveMs) {
              toPreserve.push(memory);
              continue;
            }
          }
          const importance = (_a = memory.metadata) == null ? void 0 : _a.importance;
          if (importance && this.config.preserveImportance.includes(importance)) {
            toPreserve.push(memory);
            continue;
          }
          toCompact.push(memory);
        }
        return { toPreserve, toCompact };
      }
    };
    __name(_CompactionService, "CompactionService");
    CompactionService = _CompactionService;
  }
});

// src/core/services/compaction/SimilarityCalculator.ts
var _SimilarityCalculator, SimilarityCalculator;
var init_SimilarityCalculator = __esm({
  "src/core/services/compaction/SimilarityCalculator.ts"() {
    _SimilarityCalculator = class _SimilarityCalculator {
      /**
       * Calculate Jaccard similarity between two strings
       * Returns value between 0 (no overlap) and 1 (identical)
       */
      calculateSimilarity(content1, content2) {
        const words1 = this.tokenize(content1);
        const words2 = this.tokenize(content2);
        if (words1.size === 0 && words2.size === 0) {
          return 1;
        }
        if (words1.size === 0 || words2.size === 0) {
          return 0;
        }
        const intersection = new Set([...words1].filter((w) => words2.has(w)));
        const union = /* @__PURE__ */ new Set([...words1, ...words2]);
        return intersection.size / union.size;
      }
      /**
       * Tokenize content into words
       */
      tokenize(content) {
        const words = content.toLowerCase().replace(/[^\w\s]/g, " ").split(/\s+/).filter((w) => w.length > 2);
        return new Set(words);
      }
      /**
       * Group similar memories together
       * Uses greedy clustering with similarity threshold
       */
      findSimilarGroups(memories, threshold) {
        if (memories.length === 0) {
          return [];
        }
        const groups = [];
        const assigned = /* @__PURE__ */ new Set();
        for (const memory of memories) {
          if (assigned.has(memory.id)) {
            continue;
          }
          const group = [memory];
          assigned.add(memory.id);
          for (const other of memories) {
            if (assigned.has(other.id)) {
              continue;
            }
            const similarity = this.calculateSimilarity(memory.content, other.content);
            if (similarity >= threshold) {
              group.push(other);
              assigned.add(other.id);
            }
          }
          groups.push(group);
        }
        return groups;
      }
    };
    __name(_SimilarityCalculator, "SimilarityCalculator");
    SimilarityCalculator = _SimilarityCalculator;
  }
});

// src/core/services/compaction/index.ts
var compaction_exports = {};
__export(compaction_exports, {
  ArchiveStrategy: () => ArchiveStrategy,
  CompactionService: () => CompactionService,
  MergeStrategy: () => MergeStrategy,
  SimilarityCalculator: () => SimilarityCalculator,
  SummarizeStrategy: () => SummarizeStrategy,
  getStrategy: () => getStrategy
});
var init_compaction = __esm({
  "src/core/services/compaction/index.ts"() {
    init_CompactionService();
    init_SimilarityCalculator();
    init_strategies();
  }
});

// src/infrastructure/persistence/JsonProjectProfileRepository.ts
var JsonProjectProfileRepository_exports = {};
__export(JsonProjectProfileRepository_exports, {
  JsonProjectProfileRepository: () => JsonProjectProfileRepository
});
var fs3, path4, _JsonProjectProfileRepository, JsonProjectProfileRepository;
var init_JsonProjectProfileRepository = __esm({
  "src/infrastructure/persistence/JsonProjectProfileRepository.ts"() {
    fs3 = __toESM(require("fs"));
    path4 = __toESM(require("path"));
    _JsonProjectProfileRepository = class _JsonProjectProfileRepository {
      filePath;
      constructor(filePath) {
        this.filePath = filePath;
      }
      /**
       * Ensure directory exists
       */
      ensureDirectory() {
        const dir = path4.dirname(this.filePath);
        if (!fs3.existsSync(dir)) {
          fs3.mkdirSync(dir, { recursive: true });
        }
      }
      /**
       * Save profile to JSON file
       */
      async save(profile) {
        this.ensureDirectory();
        const json = JSON.stringify(profile, null, 2);
        fs3.writeFileSync(this.filePath, json, "utf-8");
      }
      /**
       * Load profile from JSON file
       */
      async load() {
        if (!fs3.existsSync(this.filePath)) {
          return null;
        }
        try {
          const json = fs3.readFileSync(this.filePath, "utf-8");
          return JSON.parse(json);
        } catch (error) {
          return null;
        }
      }
      /**
       * Check if profile exists
       */
      async exists() {
        return fs3.existsSync(this.filePath);
      }
      /**
       * Update a specific category
       */
      async updateCategory(category, content, updatedBy) {
        let profile = await this.load();
        if (!profile) {
          throw new Error("Profile does not exist. Create it first with save().");
        }
        profile.categories[category] = {
          content,
          lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
          updatedBy
        };
        await this.save(profile);
      }
      /**
       * Update last git sync commit hash
       */
      async updateGitSync(commitHash) {
        let profile = await this.load();
        if (!profile) {
          throw new Error("Profile does not exist. Create it first with save().");
        }
        profile.lastGitSync = commitHash;
        await this.save(profile);
      }
      /**
       * Get a specific category content
       */
      async getCategory(category) {
        var _a;
        const profile = await this.load();
        if (!profile) {
          return null;
        }
        return ((_a = profile.categories[category]) == null ? void 0 : _a.content) || null;
      }
    };
    __name(_JsonProjectProfileRepository, "JsonProjectProfileRepository");
    JsonProjectProfileRepository = _JsonProjectProfileRepository;
  }
});

// src/modules/mcp/index.ts
var mcp_exports = {};
__export(mcp_exports, {
  AnalysisTools: () => AnalysisTools,
  EventType: () => EventType,
  KnowledgeGraphTool: () => KnowledgeGraphTool,
  MCPServer: () => MCPServer,
  MemoryTools: () => MemoryTools,
  RequestHandlerService: () => RequestHandlerService,
  SearchTools: () => SearchTools,
  ServerStatus: () => ServerStatus,
  StdioTransport: () => StdioTransport,
  ToolCategory: () => ToolCategory,
  ToolRegistry: () => ToolRegistry,
  TransportType: () => TransportType,
  createMCPServer: () => createMCPServer
});
async function createMCPServer(config) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const { MCPServer: MCPServer2 } = await Promise.resolve().then(() => (init_MCPServer(), MCPServer_exports));
  const { MemoryTools: MemoryTools2 } = await Promise.resolve().then(() => (init_MemoryTools(), MemoryTools_exports));
  const { SearchTools: SearchTools2 } = await Promise.resolve().then(() => (init_SearchTools(), SearchTools_exports));
  const { AnalysisTools: AnalysisTools2 } = await Promise.resolve().then(() => (init_AnalysisTools(), AnalysisTools_exports));
  const { TaskTools: TaskTools2 } = await Promise.resolve().then(() => (init_TaskTools(), TaskTools_exports));
  const { KnowledgeGraphTool: KnowledgeGraphTool2 } = await Promise.resolve().then(() => (init_KnowledgeGraphTool(), KnowledgeGraphTool_exports));
  const { ProfileTools: ProfileTools2 } = await Promise.resolve().then(() => (init_ProfileTools(), ProfileTools_exports));
  const { CompactionTools: CompactionTools2 } = await Promise.resolve().then(() => (init_CompactionTools(), CompactionTools_exports));
  const { AnalysisServiceWrapper: AnalysisServiceWrapper2 } = await Promise.resolve().then(() => (init_AnalysisServiceWrapper(), AnalysisServiceWrapper_exports));
  const { CompactionService: CompactionService2 } = await Promise.resolve().then(() => (init_compaction(), compaction_exports));
  const { JsonProjectProfileRepository: JsonProjectProfileRepository2 } = await Promise.resolve().then(() => (init_JsonProjectProfileRepository(), JsonProjectProfileRepository_exports));
  const server = new MCPServer2(config);
  const DEFAULT_TOOLS_CONFIG = {
    // === CORE TOOLS (enabled by default) ===
    // Memory - essential for storing and retrieving memories
    store_memory: true,
    memory_search: true,
    memory_query: true,
    memory_stats: true,
    memory_delete: true,
    memory_tags: true,
    memory_export: true,
    memory_import: true,
    // Knowledge Graph - for visualizing memory relationships
    knowledge_graph: true,
    // Task Management - for workflow tracking
    task_management: true,
    task_board: true,
    task_insights: true,
    // === OPTIONAL TOOLS (disabled by default) ===
    // Advanced Search - enable for pattern/temporal analysis
    search_patterns: false,
    // Use: Find recurring patterns in memories
    search_temporal: false,
    // Use: Time-based memory analysis
    search_relationships: false,
    // Use: Explore memory connections
    // Analysis - enable for deep memory insights
    analysis_conflicts: false,
    // Use: Detect contradicting memories
    analysis_memory_map: false,
    // Use: Generate visual memory maps
    analysis_anomalies: false,
    // Use: Detect unusual patterns
    analysis_forecast: false,
    // Use: Predict memory trends
    // Project Profile - enable for project-level metadata
    project_profile: false,
    // Use: Store architecture/stack decisions
    // Compaction - enable for storage management
    memory_compact: false
    // Use: Clean up old/redundant memories
  };
  const toolsConfig = { ...DEFAULT_TOOLS_CONFIG, ...config == null ? void 0 : config.toolsConfig };
  const isToolEnabled = /* @__PURE__ */ __name((name) => {
    return toolsConfig[name] === true;
  }, "isToolEnabled");
  const isMultiProject = (config == null ? void 0 : config.isMultiProject) && (config == null ? void 0 : config.multiProjectService);
  if (config == null ? void 0 : config.memoryService) {
    const analysisService = config.analysisService || new AnalysisServiceWrapper2(
      config.memoryService,
      config.repository,
      isMultiProject ? config.multiProjectService : void 0
    );
    const memoryTools = new MemoryTools2(
      config.memoryService,
      config.repository,
      isMultiProject ? config.multiProjectService : void 0
    );
    const searchTools = new SearchTools2(
      config.searchService || config.memoryService,
      isMultiProject ? config.multiProjectService : void 0
    );
    const analysisTools = new AnalysisTools2(analysisService);
    const taskTools = new TaskTools2(config.memoryService);
    const knowledgeGraphTool = new KnowledgeGraphTool2(
      config.memoryService,
      isMultiProject ? config.multiProjectService : void 0
    );
    const registry = server.getToolRegistry();
    for (const tool of memoryTools.getTools()) {
      if (isToolEnabled(tool.name)) {
        registry.register({ tool });
      }
    }
    for (const tool of searchTools.getTools()) {
      if (isToolEnabled(tool.name)) {
        registry.register({ tool });
      }
    }
    for (const tool of analysisTools.getTools()) {
      if (isToolEnabled(tool.name)) {
        registry.register({ tool });
      }
    }
    for (const tool of taskTools.getTools()) {
      if (isToolEnabled(tool.name)) {
        registry.register({ tool });
      }
    }
    if (isToolEnabled("knowledge_graph")) {
      registry.register({ tool: knowledgeGraphTool.getTool() });
    }
    if (isToolEnabled("project_profile")) {
      const path7 = await import("path");
      const profilePath = path7.join(config.dbPath ? path7.dirname(config.dbPath) : ".nova", "project.json");
      const profileRepository = new JsonProjectProfileRepository2(profilePath);
      const profileTools = new ProfileTools2(profileRepository);
      for (const tool of profileTools.getTools()) {
        registry.register({ tool });
      }
    }
    if (isToolEnabled("memory_compact")) {
      const compactionConfig = {
        thresholds: ((_b = (_a = config.userConfig) == null ? void 0 : _a.compaction) == null ? void 0 : _b.thresholds) || {
          knowledge: 20,
          code: 30,
          task: 50,
          decision: 10
        },
        strategy: ((_d = (_c = config.userConfig) == null ? void 0 : _c.compaction) == null ? void 0 : _d.strategy) || "summarize",
        preserveDays: ((_f = (_e = config.userConfig) == null ? void 0 : _e.compaction) == null ? void 0 : _f.preserveDays) || 7,
        preserveImportance: ((_h = (_g = config.userConfig) == null ? void 0 : _g.compaction) == null ? void 0 : _h.preserveImportance) || ["critical", "high"]
      };
      const compactionService = new CompactionService2(config.repository, compactionConfig);
      const compactionTools = new CompactionTools2(compactionService);
      for (const tool of compactionTools.getTools()) {
        registry.register({ tool });
      }
    }
  }
  return server;
}
var init_mcp = __esm({
  "src/modules/mcp/index.ts"() {
    init_MCPServer();
    init_ToolRegistry();
    init_RequestHandlerService();
    init_MemoryTools();
    init_SearchTools();
    init_AnalysisTools();
    init_KnowledgeGraphTool();
    init_StdioTransport();
    init_types2();
    __name(createMCPServer, "createMCPServer");
  }
});

// src/core/services/multi-project/multi-database.service.ts
var fs4, path5, os2, _MultiDatabaseService, MultiDatabaseService;
var init_multi_database_service = __esm({
  "src/core/services/multi-project/multi-database.service.ts"() {
    fs4 = __toESM(require("fs"));
    path5 = __toESM(require("path"));
    os2 = __toESM(require("os"));
    _MultiDatabaseService = class _MultiDatabaseService {
      databases = /* @__PURE__ */ new Map();
      config;
      currentProjectPath;
      initialized = false;
      constructor(config, currentProjectPath) {
        this.config = config;
        this.currentProjectPath = this.expandPath(currentProjectPath);
      }
      /**
       * Initialize the service and register all configured databases
       */
      async initialize() {
        if (this.initialized) return;
        await this.registerProject(this.currentProjectPath, false);
        for (const p of this.config.includePaths) {
          const expandedPath = this.expandPath(p);
          if (await this.isValidNovaProject(expandedPath)) {
            await this.registerProject(expandedPath, false);
          }
        }
        if (this.config.includeGlobal) {
          const globalPath = path5.join(os2.homedir(), ".nova-memory");
          await this.registerProject(globalPath, true);
        }
        if (this.config.autoDiscover) {
          await this.discoverProjects();
        }
        this.initialized = true;
      }
      /**
       * Register a project database
       */
      async registerProject(projectPath, isGlobal) {
        if (this.databases.has(projectPath)) return;
        const dbPath = isGlobal ? path5.join(projectPath, "memory.db") : path5.join(projectPath, ".nova", "memory.db");
        const database = {
          path: projectPath,
          name: isGlobal ? "Global" : path5.basename(projectPath),
          dbPath,
          isGlobal,
          isActive: await this.databaseExists(dbPath)
        };
        if (database.isActive) {
          database.lastModified = await this.getDbLastModified(dbPath);
        }
        this.databases.set(projectPath, database);
      }
      /**
       * Check if a path is a valid Nova project
       */
      async isValidNovaProject(projectPath) {
        const novaDir = path5.join(projectPath, ".nova");
        try {
          return fs4.existsSync(novaDir) && fs4.statSync(novaDir).isDirectory();
        } catch {
          return false;
        }
      }
      /**
       * Check if database file exists
       */
      async databaseExists(dbPath) {
        try {
          return fs4.existsSync(dbPath);
        } catch {
          return false;
        }
      }
      /**
       * Get database last modified time
       */
      async getDbLastModified(dbPath) {
        try {
          const stat = fs4.statSync(dbPath);
          return stat.mtime;
        } catch {
          return void 0;
        }
      }
      /**
       * Discover Nova projects in parent directories
       */
      async discoverProjects() {
        const maxDepth = this.config.maxDepth || 3;
        const basePath = path5.dirname(this.currentProjectPath);
        await this.scanDirectory(basePath, 0, maxDepth);
      }
      /**
       * Recursively scan for Nova projects
       */
      async scanDirectory(dirPath, depth, maxDepth) {
        if (depth > maxDepth) return;
        try {
          const entries = fs4.readdirSync(dirPath, { withFileTypes: true });
          for (const entry of entries) {
            if (!entry.isDirectory()) continue;
            if (entry.name.startsWith(".")) continue;
            if (entry.name === "node_modules") continue;
            const fullPath = path5.join(dirPath, entry.name);
            if (await this.isValidNovaProject(fullPath)) {
              await this.registerProject(fullPath, false);
            }
            await this.scanDirectory(fullPath, depth + 1, maxDepth);
          }
        } catch {
        }
      }
      /**
       * Expand ~ to home directory
       */
      expandPath(p) {
        if (p.startsWith("~/")) {
          return path5.join(os2.homedir(), p.slice(2));
        }
        if (p.startsWith("~\\")) {
          return path5.join(os2.homedir(), p.slice(2));
        }
        return p;
      }
      /**
       * Get all active databases
       */
      getActiveDatabases() {
        return Array.from(this.databases.values()).filter((db) => db.isActive);
      }
      /**
       * Get database count
       */
      getDatabaseCount() {
        return this.databases.size;
      }
      /**
       * Check if running in multi-database mode
       */
      isMultiMode() {
        return this.config.enabled && this.databases.size > 1;
      }
      /**
       * Get current project database
       */
      getCurrentProject() {
        return this.databases.get(this.currentProjectPath);
      }
      /**
       * Get database by path
       */
      getDatabase(projectPath) {
        return this.databases.get(this.expandPath(projectPath));
      }
      /**
       * Get all database paths for searching
       */
      getSearchableDatabasePaths() {
        return this.getActiveDatabases().map((db) => db.dbPath);
      }
      /**
       * Get write target paths based on writeMode
       */
      getWriteTargetPaths() {
        if (this.config.writeMode === "local") {
          const current = this.getCurrentProject();
          return current ? [current.dbPath] : [];
        }
        return this.getActiveDatabases().filter((db) => !db.isGlobal).map((db) => db.dbPath);
      }
      /**
       * Get aggregated stats across all databases
       */
      async getStats() {
        const byProject = {};
        let totalMemories = 0;
        let activeDatabases = 0;
        for (const [, db] of this.databases) {
          if (db.isActive) {
            activeDatabases++;
            const count = db.memoryCount || 0;
            byProject[db.name] = count;
            totalMemories += count;
          }
        }
        return {
          totalDatabases: this.databases.size,
          activeDatabases,
          totalMemories,
          byProject
        };
      }
      /**
       * Update memory count for a database
       */
      updateMemoryCount(projectPath, count) {
        const db = this.databases.get(projectPath);
        if (db) {
          db.memoryCount = count;
        }
      }
      /**
       * Check if service is initialized
       */
      isInitialized() {
        return this.initialized;
      }
    };
    __name(_MultiDatabaseService, "MultiDatabaseService");
    MultiDatabaseService = _MultiDatabaseService;
  }
});

// src/core/services/multi-project/project-discovery.service.ts
var fs5, path6, os3, _ProjectDiscoveryService, ProjectDiscoveryService;
var init_project_discovery_service = __esm({
  "src/core/services/multi-project/project-discovery.service.ts"() {
    fs5 = __toESM(require("fs"));
    path6 = __toESM(require("path"));
    os3 = __toESM(require("os"));
    _ProjectDiscoveryService = class _ProjectDiscoveryService {
      options;
      constructor(options) {
        this.options = {
          basePaths: (options == null ? void 0 : options.basePaths) || [process.cwd()],
          maxDepth: (options == null ? void 0 : options.maxDepth) || 3,
          includeHidden: (options == null ? void 0 : options.includeHidden) || false,
          markers: (options == null ? void 0 : options.markers) || [".nova", ".git", "package.json"]
        };
      }
      /**
       * Discover all Nova projects
       */
      async discover() {
        const projects = [];
        for (const basePath of this.options.basePaths) {
          const expandedPath = this.expandPath(basePath);
          const discovered = await this.scanDirectory(expandedPath, 0);
          projects.push(...discovered);
        }
        const uniqueProjects = this.deduplicateProjects(projects);
        return uniqueProjects.sort((a, b) => {
          if (!a.lastModified) return 1;
          if (!b.lastModified) return -1;
          return b.lastModified.getTime() - a.lastModified.getTime();
        });
      }
      /**
       * Scan a directory for Nova projects
       */
      async scanDirectory(dirPath, depth) {
        if (depth > this.options.maxDepth) {
          return [];
        }
        const projects = [];
        try {
          if (!fs5.existsSync(dirPath)) {
            return [];
          }
          const entries = fs5.readdirSync(dirPath, { withFileTypes: true });
          const hasNovaDir = entries.some((e) => e.name === ".nova" && e.isDirectory());
          const hasMarker = this.options.markers.some(
            (m) => entries.some((e) => e.name === m)
          );
          if (hasNovaDir) {
            const project = await this.createProjectInfo(dirPath, hasNovaDir);
            projects.push(project);
          }
          for (const entry of entries) {
            if (!entry.isDirectory()) continue;
            if (entry.name.startsWith(".") && !this.options.includeHidden) {
              continue;
            }
            if (this.shouldSkipDirectory(entry.name)) {
              continue;
            }
            const childPath = path6.join(dirPath, entry.name);
            const subProjects = await this.scanDirectory(childPath, depth + 1);
            projects.push(...subProjects);
          }
        } catch (error) {
        }
        return projects;
      }
      /**
       * Create project info object
       */
      async createProjectInfo(dirPath, hasNovaDir) {
        const novaPath = path6.join(dirPath, ".nova");
        const dbPath = path6.join(novaPath, "memory.db");
        let hasDatabase = false;
        let lastModified;
        try {
          hasDatabase = fs5.existsSync(dbPath);
          if (hasDatabase) {
            const stat = fs5.statSync(dbPath);
            lastModified = stat.mtime;
          }
        } catch {
        }
        return {
          path: dirPath,
          name: path6.basename(dirPath),
          hasNovaDir,
          hasDatabase,
          lastModified
        };
      }
      /**
       * Check if directory should be skipped
       */
      shouldSkipDirectory(name) {
        const skipDirs = [
          "node_modules",
          ".git",
          "dist",
          "build",
          "coverage",
          ".cache",
          "__pycache__",
          "venv",
          ".venv",
          "vendor"
        ];
        return skipDirs.includes(name);
      }
      /**
       * Remove duplicate projects (same path)
       */
      deduplicateProjects(projects) {
        const seen = /* @__PURE__ */ new Set();
        return projects.filter((p) => {
          if (seen.has(p.path)) return false;
          seen.add(p.path);
          return true;
        });
      }
      /**
       * Expand ~ to home directory
       */
      expandPath(p) {
        if (p.startsWith("~/")) {
          return path6.join(os3.homedir(), p.slice(2));
        }
        if (p.startsWith("~\\")) {
          return path6.join(os3.homedir(), p.slice(2));
        }
        return p;
      }
      /**
       * Validate that paths exist
       */
      async validatePaths(paths) {
        const valid = [];
        const invalid = [];
        for (const p of paths) {
          const expandedPath = this.expandPath(p);
          try {
            if (fs5.existsSync(expandedPath) && fs5.statSync(expandedPath).isDirectory()) {
              valid.push(expandedPath);
            } else {
              invalid.push(p);
            }
          } catch {
            invalid.push(p);
          }
        }
        return { valid, invalid };
      }
      /**
       * Get projects with active databases only
       */
      async discoverActive() {
        const all = await this.discover();
        return all.filter((p) => p.hasDatabase);
      }
    };
    __name(_ProjectDiscoveryService, "ProjectDiscoveryService");
    ProjectDiscoveryService = _ProjectDiscoveryService;
  }
});

// src/core/services/multi-project/multi-project-memory.service.ts
var _MultiProjectMemoryService, MultiProjectMemoryService;
var init_multi_project_memory_service = __esm({
  "src/core/services/multi-project/multi-project-memory.service.ts"() {
    init_multi_database_service();
    init_project_discovery_service();
    _MultiProjectMemoryService = class _MultiProjectMemoryService {
      memorySystems = /* @__PURE__ */ new Map();
      multiDbService;
      discoveryService;
      config;
      currentProjectPath;
      primarySystem = null;
      initialized = false;
      constructor(config, currentProjectPath, primarySystem) {
        this.config = config;
        this.currentProjectPath = currentProjectPath;
        if (primarySystem) {
          this.primarySystem = primarySystem;
          this.memorySystems.set(currentProjectPath, primarySystem);
        }
        this.multiDbService = new MultiDatabaseService(config, currentProjectPath);
        this.discoveryService = new ProjectDiscoveryService({
          basePaths: config.includePaths,
          maxDepth: config.maxDepth || 3,
          includeHidden: false,
          markers: [".nova"]
        });
      }
      /**
       * Initialize the service and register all configured databases
       */
      async initialize(createSystemFn) {
        if (this.initialized) return;
        await this.multiDbService.initialize();
        const activeDbs = this.multiDbService.getActiveDatabases();
        for (const db of activeDbs) {
          if (!this.memorySystems.has(db.path)) {
            try {
              const system = createSystemFn(db.dbPath);
              this.memorySystems.set(db.path, system);
            } catch (error) {
              process.stderr.write(`[Nova] Failed to load database ${db.name}: ${error}
`);
            }
          }
        }
        this.initialized = true;
      }
      /**
       * Check if multi-project mode is enabled and active
       */
      isMultiMode() {
        return this.config.enabled && this.memorySystems.size > 1;
      }
      /**
       * Get the number of registered projects
       */
      getProjectCount() {
        return this.memorySystems.size;
      }
      /**
       * Get the primary memory service (for single-project fallback)
       */
      getPrimaryService() {
        if (this.primarySystem) {
          return this.primarySystem.service;
        }
        const first = this.memorySystems.values().next().value;
        return first == null ? void 0 : first.service;
      }
      /**
       * Get the primary repository (for stats)
       */
      getPrimaryRepository() {
        if (this.primarySystem) {
          return this.primarySystem.repository;
        }
        const first = this.memorySystems.values().next().value;
        return first == null ? void 0 : first.repository;
      }
      /**
       * Search across all registered projects
       */
      async search(query, options) {
        var _a, _b, _c, _d, _e, _f;
        const results = [];
        const sources = /* @__PURE__ */ new Set();
        for (const [projectPath, system] of this.memorySystems) {
          const projectName = this.getProjectName(projectPath);
          sources.add(projectName);
          try {
            let memories = [];
            if ((_a = system.searchEngine) == null ? void 0 : _a.search) {
              memories = await system.searchEngine.search(query, {
                limit: (options == null ? void 0 : options.limit) || 50
              });
            } else if ((_b = system.service) == null ? void 0 : _b.search) {
              memories = await system.service.search(query);
            } else if ((_c = system.repository) == null ? void 0 : _c.search) {
              memories = await system.repository.search(query);
            }
            for (const result of memories) {
              let memory;
              let score;
              if (result.memory && typeof result.memory === "object") {
                memory = result.memory;
                score = result.score ?? 0;
              } else if (result.id && result.content) {
                memory = result;
                score = result.score ?? 0;
              } else {
                process.stderr.write(`[Nova] Skipping invalid search result: ${JSON.stringify(Object.keys(result))}
`);
                continue;
              }
              if (!memory.id || !memory.content) {
                process.stderr.write(`[Nova] Skipping incomplete memory: id=${memory.id}, hasContent=${!!memory.content}
`);
                continue;
              }
              if ((options == null ? void 0 : options.memory_type) && memory.memoryType !== options.memory_type) {
                continue;
              }
              if ((_d = options == null ? void 0 : options.tags) == null ? void 0 : _d.length) {
                const memTags = memory.tags || ((_e = memory.metadata) == null ? void 0 : _e.tags) || [];
                if (!options.tags.some((t) => memTags.includes(t))) {
                  continue;
                }
              }
              results.push({
                id: memory.id,
                content: memory.content,
                memoryType: memory.memoryType || memory.memory_type || "knowledge",
                path: memory.path,
                tags: memory.tags || ((_f = memory.metadata) == null ? void 0 : _f.tags),
                metadata: memory.metadata,
                source: projectName,
                projectPath,
                score,
                createdAt: memory.createdAt
              });
            }
          } catch (error) {
            process.stderr.write(`[Nova] Search failed for ${projectName}: ${error}
`);
          }
        }
        results.sort((a, b) => (b.score || 0) - (a.score || 0));
        const limitedResults = (options == null ? void 0 : options.limit) ? results.slice(0, options.limit) : results;
        return {
          results: limitedResults,
          totalCount: results.length,
          sources: Array.from(sources),
          isMultiProject: this.isMultiMode()
        };
      }
      /**
       * Query across all projects with filters
       */
      async query(filters) {
        var _a, _b, _c, _d;
        const results = [];
        const sources = /* @__PURE__ */ new Set();
        for (const [projectPath, system] of this.memorySystems) {
          const projectName = this.getProjectName(projectPath);
          if ((filters == null ? void 0 : filters.project) && projectName.toLowerCase() !== filters.project.toLowerCase()) {
            continue;
          }
          sources.add(projectName);
          try {
            let memories = [];
            if ((_a = system.service) == null ? void 0 : _a.query) {
              memories = await system.service.query(filters || {});
            } else if ((_b = system.repository) == null ? void 0 : _b.findAll) {
              memories = await system.repository.findAll();
            } else if ((_c = system.repository) == null ? void 0 : _c.query) {
              memories = await system.repository.query(filters || {});
            }
            for (const memory of memories) {
              if (!memory.id || !memory.content) {
                process.stderr.write(`[Nova] Skipping incomplete query result: id=${memory.id}, hasContent=${!!memory.content}
`);
                continue;
              }
              results.push({
                id: memory.id,
                content: memory.content,
                memoryType: memory.memoryType || memory.memory_type || "knowledge",
                path: memory.path,
                tags: memory.tags || ((_d = memory.metadata) == null ? void 0 : _d.tags),
                metadata: memory.metadata,
                source: projectName,
                projectPath,
                createdAt: memory.createdAt
              });
            }
          } catch (error) {
            process.stderr.write(`[Nova] Query failed for ${projectName}: ${error}
`);
          }
        }
        return {
          results,
          totalCount: results.length,
          sources: Array.from(sources),
          isMultiProject: this.isMultiMode()
        };
      }
      /**
       * Store memory based on writeMode
       */
      async store(input) {
        var _a, _b;
        const storedTo = [];
        let resultId = "";
        if (this.config.writeMode === "local") {
          const system = this.memorySystems.get(this.currentProjectPath);
          if ((_a = system == null ? void 0 : system.service) == null ? void 0 : _a.store) {
            const result = await system.service.store(input);
            if (result == null ? void 0 : result.id) {
              resultId = result.id;
              storedTo.push(this.getProjectName(this.currentProjectPath));
            }
          }
        } else {
          for (const [projectPath, system] of this.memorySystems) {
            try {
              if ((_b = system.service) == null ? void 0 : _b.store) {
                const result = await system.service.store(input);
                if (result == null ? void 0 : result.id) {
                  resultId = result.id;
                  storedTo.push(this.getProjectName(projectPath));
                }
              }
            } catch (error) {
              process.stderr.write(`[Nova] Store failed for ${projectPath}: ${error}
`);
            }
          }
        }
        return { id: resultId, storedTo };
      }
      /**
       * Delete memory from a specific project or current project
       */
      async delete(id, projectPath) {
        var _a;
        const targetPath = projectPath || this.currentProjectPath;
        const system = this.memorySystems.get(targetPath);
        if ((_a = system == null ? void 0 : system.service) == null ? void 0 : _a.delete) {
          return await system.service.delete(id);
        }
        return false;
      }
      /**
       * Get aggregated stats from all projects
       */
      async getAggregatedStats() {
        var _a, _b;
        const byProject = {};
        let totalMemories = 0;
        for (const [projectPath, system] of this.memorySystems) {
          const projectName = this.getProjectName(projectPath);
          try {
            let stats = { totalMemories: 0 };
            if ((_a = system.repository) == null ? void 0 : _a.getStats) {
              stats = await system.repository.getStats();
            } else if ((_b = system.service) == null ? void 0 : _b.getStats) {
              stats = await system.service.getStats();
            }
            byProject[projectName] = stats.totalMemories || 0;
            totalMemories += stats.totalMemories || 0;
          } catch (error) {
            byProject[projectName] = 0;
          }
        }
        return {
          totalMemories,
          byProject,
          projectCount: this.memorySystems.size,
          isMultiProject: this.isMultiMode()
        };
      }
      /**
       * Get project name from path
       */
      getProjectName(projectPath) {
        const parts = projectPath.replace(/\\/g, "/").split("/");
        return parts[parts.length - 1] || "Unknown";
      }
      /**
       * Get list of all project names
       */
      getProjectNames() {
        return Array.from(this.memorySystems.keys()).map((p) => this.getProjectName(p));
      }
      /**
       * Get all memories from all projects
       * Used by analysis tools for conflict detection, memory mapping, etc.
       */
      async getAllMemories() {
        var _a, _b, _c, _d;
        const allMemories = [];
        for (const [projectPath, system] of this.memorySystems) {
          const projectName = this.getProjectName(projectPath);
          try {
            let memories = [];
            if ((_a = system.repository) == null ? void 0 : _a.findAll) {
              memories = await system.repository.findAll();
            } else if ((_b = system.service) == null ? void 0 : _b.query) {
              memories = await system.service.query({});
            } else if ((_c = system.repository) == null ? void 0 : _c.getAll) {
              memories = await system.repository.getAll();
            }
            for (const memory of memories) {
              if (!memory.id || !memory.content) {
                continue;
              }
              allMemories.push({
                id: memory.id,
                content: memory.content,
                memoryType: memory.memoryType || memory.memory_type || "knowledge",
                path: memory.path,
                tags: memory.tags || ((_d = memory.metadata) == null ? void 0 : _d.tags),
                metadata: memory.metadata,
                source: projectName,
                projectPath,
                createdAt: memory.createdAt
              });
            }
          } catch (error) {
            process.stderr.write(`[Nova] getAllMemories failed for ${projectName}: ${error}
`);
          }
        }
        return allMemories;
      }
    };
    __name(_MultiProjectMemoryService, "MultiProjectMemoryService");
    MultiProjectMemoryService = _MultiProjectMemoryService;
  }
});

// src/core/services/multi-project/index.ts
var multi_project_exports = {};
__export(multi_project_exports, {
  MultiDatabaseService: () => MultiDatabaseService,
  MultiProjectMemoryService: () => MultiProjectMemoryService,
  ProjectDiscoveryService: () => ProjectDiscoveryService
});
var init_multi_project = __esm({
  "src/core/services/multi-project/index.ts"() {
    init_multi_database_service();
    init_project_discovery_service();
    init_multi_project_memory_service();
  }
});

// node_modules/commander/esm.mjs
var import_index = __toESM(require_commander(), 1);
var {
  program,
  createCommand,
  createArgument,
  createOption,
  CommanderError,
  InvalidArgumentError,
  InvalidOptionArgumentError,
  // deprecated old name
  Command,
  Argument,
  Option,
  Help
} = import_index.default;

// src/cli/mcp-nova.ts
var import_chalk = __toESM(require_source());
init_logger();

// src/shared/config/ConfigManager.ts
var fs2 = __toESM(require("fs"));
var path2 = __toESM(require("path"));
var os = __toESM(require("os"));

// src/shared/config/types.ts
var DEFAULT_CONFIG = {
  version: "1.0.0",
  storage: {
    mode: "project",
    dbName: "memory.db",
    walMode: true,
    backup: {
      enabled: true,
      interval: 24,
      maxBackups: 5
    },
    multiProject: {
      enabled: false,
      includePaths: [],
      includeGlobal: true,
      writeMode: "local",
      autoDiscover: false,
      maxDepth: 3
    }
  },
  features: {
    memoryStorage: true,
    pathTracking: true,
    memoryVersioning: true,
    deduplication: true,
    enhancedSearch: true,
    semanticSearch: false,
    // Not implemented yet
    conflictDetection: true,
    anomalyDetection: true,
    forecasting: true,
    taskManagement: true,
    phaseTracking: true,
    smartHints: true,
    knowledgeGraph: true,
    relationships: true,
    autoCompaction: true,
    autoGitIgnore: true
  },
  tools: {
    // === CORE TOOLS (enabled by default) ===
    // Memory - essential for storing and retrieving
    store_memory: true,
    memory_search: true,
    memory_query: true,
    memory_stats: true,
    memory_delete: true,
    memory_tags: true,
    memory_export: true,
    memory_import: true,
    // Task management
    task_management: true,
    task_board: true,
    task_insights: true,
    // Knowledge graph
    knowledge_graph: true,
    // === OPTIONAL TOOLS (disabled by default) ===
    // Advanced search
    search_semantic: false,
    // Not implemented yet
    search_patterns: false,
    // Enable: find recurring patterns
    search_temporal: false,
    // Enable: time-based analysis
    search_relationships: false,
    // Enable: explore connections
    // Analysis
    analysis_conflicts: false,
    // Enable: detect contradictions
    analysis_anomalies: false,
    // Enable: find unusual patterns
    analysis_forecast: false,
    // Enable: predict trends
    analysis_memory_map: false,
    // Enable: visual memory maps
    // Project
    project_profile: false,
    // Enable: store architecture/stack
    // Maintenance
    memory_compact: false
    // Enable: clean up old data
  },
  memoryTypes: {
    enabled: {
      knowledge: true,
      code: true,
      decision: true,
      task: true,
      conversation: true,
      document: true,
      error: true,
      context: true,
      reflection: true
    },
    defaultType: "knowledge",
    autoCategory: {
      enabled: true,
      rules: [
        { pattern: "*.ts", type: "code", priority: 10 },
        { pattern: "*.js", type: "code", priority: 10 },
        { pattern: "error|bug|fix", type: "error", priority: 8 },
        { pattern: "decide|decision|chose", type: "decision", priority: 7 },
        { pattern: "task|todo|implement", type: "task", priority: 6 }
      ]
    }
  },
  paths: {
    enabled: true,
    ignorePaths: [
      "node_modules/**",
      ".git/**",
      "dist/**",
      "build/**",
      "*.log",
      ".nova/**"
    ],
    includePaths: [
      "src/**",
      "lib/**",
      "test/**"
    ],
    compaction: {
      enabled: true,
      threshold: 10,
      strategy: "merge"
    }
  },
  tasks: {
    enabled: true,
    defaultRules: {
      mustComplete: [
        "Write tests first (TDD)",
        "Follow DRY principles",
        "Handle error cases"
      ],
      successCriteria: [
        "All tests pass",
        "Code coverage > 80%",
        "No linting errors"
      ],
      shouldAvoid: [
        "Code duplication",
        "Hardcoded values",
        "Console.log statements"
      ]
    },
    hints: {
      enabled: true,
      showTestCoverageReminder: true,
      testCoverageThreshold: 90
    }
  },
  search: {
    defaultAlgorithm: "bm25",
    minRelevance: 0.1,
    defaultLimit: 10,
    maxLimit: 100,
    searchPaths: true,
    searchMetadata: true
  }
};

// src/shared/config/ConfigManager.ts
var _ConfigManager = class _ConfigManager {
  config;
  configPath = null;
  projectRoot = null;
  constructor() {
    this.config = { ...DEFAULT_CONFIG };
  }
  static getInstance() {
    if (!_ConfigManager.instance) {
      _ConfigManager.instance = new _ConfigManager();
    }
    return _ConfigManager.instance;
  }
  /**
   * Initialize config manager and load configuration
   */
  async initialize(workingDir) {
    const cwd = workingDir || process.cwd();
    this.projectRoot = this.detectProjectRoot(cwd);
    this.configPath = this.findConfigFile(cwd);
    if (this.configPath && fs2.existsSync(this.configPath)) {
      await this.loadConfig(this.configPath);
    } else {
      this.config = { ...DEFAULT_CONFIG };
    }
    return this.config;
  }
  /**
   * Detect project root by looking for common project markers
   */
  detectProjectRoot(startDir) {
    const markers = [".git", "package.json", ".nova", "Cargo.toml", "go.mod", "pyproject.toml"];
    let currentDir = startDir;
    while (currentDir !== path2.dirname(currentDir)) {
      for (const marker of markers) {
        if (fs2.existsSync(path2.join(currentDir, marker))) {
          return currentDir;
        }
      }
      currentDir = path2.dirname(currentDir);
    }
    return null;
  }
  /**
   * Find config file in order of precedence
   */
  findConfigFile(startDir) {
    const configNames = ["nova.config.json", ".nova/config.json", "nova-memory.config.json"];
    if (this.projectRoot) {
      for (const name of configNames) {
        const configPath = path2.join(this.projectRoot, name);
        if (fs2.existsSync(configPath)) {
          return configPath;
        }
      }
    }
    for (const name of configNames) {
      const configPath = path2.join(startDir, name);
      if (fs2.existsSync(configPath)) {
        return configPath;
      }
    }
    const globalConfigPath = path2.join(this.getGlobalConfigDir(), "config.json");
    if (fs2.existsSync(globalConfigPath)) {
      return globalConfigPath;
    }
    return null;
  }
  /**
   * Get global config directory
   */
  getGlobalConfigDir() {
    const homeDir = os.homedir();
    return path2.join(homeDir, ".nova-memory");
  }
  /**
   * Load config from file and merge with defaults
   */
  async loadConfig(configPath) {
    try {
      const content = fs2.readFileSync(configPath, "utf-8");
      const userConfig = JSON.parse(content);
      this.config = this.deepMerge(DEFAULT_CONFIG, userConfig);
      this.configPath = configPath;
      process.stderr.write(`[Nova] Loaded config from: ${configPath}
`);
    } catch (error) {
      process.stderr.write(`[Nova] Failed to load config: ${error.message}
`);
      this.config = { ...DEFAULT_CONFIG };
    }
  }
  /**
   * Save current config to file
   */
  async saveConfig(configPath) {
    const savePath = configPath || this.configPath || this.getDefaultConfigPath();
    const dir = path2.dirname(savePath);
    if (!fs2.existsSync(dir)) {
      fs2.mkdirSync(dir, { recursive: true });
    }
    fs2.writeFileSync(savePath, JSON.stringify(this.config, null, 2), "utf-8");
    this.configPath = savePath;
    process.stderr.write(`[Nova] Saved config to: ${savePath}
`);
  }
  /**
   * Create default config file in project
   */
  async createProjectConfig() {
    const configDir = this.projectRoot ? path2.join(this.projectRoot, ".nova") : path2.join(process.cwd(), ".nova");
    if (!fs2.existsSync(configDir)) {
      fs2.mkdirSync(configDir, { recursive: true });
    }
    const configPath = path2.join(configDir, "config.json");
    await this.saveConfig(configPath);
    if (this.config.features.autoGitIgnore) {
      await this.updateGitIgnore();
    }
    return configPath;
  }
  /**
   * Update .gitignore to ignore .nova directory
   */
  async updateGitIgnore() {
    if (!this.projectRoot) return;
    const gitignorePath = path2.join(this.projectRoot, ".gitignore");
    const novaIgnore = "\n# Nova Memory\n.nova/\n";
    try {
      if (fs2.existsSync(gitignorePath)) {
        const content = fs2.readFileSync(gitignorePath, "utf-8");
        if (!content.includes(".nova/")) {
          fs2.appendFileSync(gitignorePath, novaIgnore);
          process.stderr.write("[Nova] Added .nova/ to .gitignore\n");
        }
      } else {
        fs2.writeFileSync(gitignorePath, novaIgnore.trim());
        process.stderr.write("[Nova] Created .gitignore with .nova/\n");
      }
    } catch (error) {
    }
  }
  /**
   * Get default config path based on storage mode
   */
  getDefaultConfigPath() {
    if (this.config.storage.mode === "project" && this.projectRoot) {
      return path2.join(this.projectRoot, ".nova", "config.json");
    }
    return path2.join(this.getGlobalConfigDir(), "config.json");
  }
  /**
   * Get database path based on config
   */
  getDbPath() {
    const { mode, customPath, dbName } = this.config.storage;
    switch (mode) {
      case "project":
        if (this.projectRoot) {
          return path2.join(this.projectRoot, ".nova", dbName);
        }
        return path2.join(this.getGlobalConfigDir(), dbName);
      case "global":
        return path2.join(this.getGlobalConfigDir(), dbName);
      case "custom":
        return customPath || path2.join(this.getGlobalConfigDir(), dbName);
      default:
        return path2.join(this.getGlobalConfigDir(), dbName);
    }
  }
  /**
   * Get current configuration
   */
  getConfig() {
    return this.config;
  }
  /**
   * Update configuration
   */
  updateConfig(updates) {
    this.config = this.deepMerge(this.config, updates);
  }
  /**
   * Check if a feature is enabled
   */
  isFeatureEnabled(feature) {
    return this.config.features[feature] ?? false;
  }
  /**
   * Check if a memory type is enabled
   */
  isMemoryTypeEnabled(type) {
    const typeKey = type;
    return this.config.memoryTypes.enabled[typeKey] ?? true;
  }
  /**
   * Get project root
   */
  getProjectRoot() {
    return this.projectRoot;
  }
  /**
   * Deep merge two objects
   */
  deepMerge(target, source) {
    const result = { ...target };
    for (const key of Object.keys(source)) {
      const sourceValue = source[key];
      const targetValue = target[key];
      if (sourceValue !== null && typeof sourceValue === "object" && !Array.isArray(sourceValue) && targetValue !== null && typeof targetValue === "object" && !Array.isArray(targetValue)) {
        result[key] = this.deepMerge(targetValue, sourceValue);
      } else if (sourceValue !== void 0) {
        result[key] = sourceValue;
      }
    }
    return result;
  }
};
__name(_ConfigManager, "ConfigManager");
__publicField(_ConfigManager, "instance");
var ConfigManager = _ConfigManager;
function getConfigManager() {
  return ConfigManager.getInstance();
}
__name(getConfigManager, "getConfigManager");

// package.json
var package_default = {
  name: "@nova-mcp/mcp-nova",
  version: "1.0.3",
  description: "Zero-config AI project memory with live file watching and MCP integration",
  bin: {
    "mcp-nova": "./bin/nova-memory-mcp.js"
  },
  files: [
    "bin/nova-memory-mcp.js",
    "dist/bin/mcp-nova.js",
    "mcp.json",
    "README.md",
    "LICENSE"
  ],
  scripts: {
    start: "node dist/bin/nova-memory.js start",
    build: "npm run build:ts && npm run build:cli && node scripts/build-mcp.js",
    "build:ts": "tsc --project tsconfig.build.json && tsc-alias -p tsconfig.build.json",
    "build:ts:watch": "tsc --project tsconfig.build.json --watch",
    "build:cli": "node build-cli.js",
    "build:cli:watch": "node build-cli.js --watch",
    "build:prod": "NODE_ENV=production npm run build:ts && NODE_ENV=production npm run build:cli",
    compile: "tsc --noEmit",
    "compile:watch": "tsc --noEmit --watch",
    "clean:ts": "rm -rf dist",
    "migrate:module": "node scripts/migrate-module.js",
    "migrate:status": "node scripts/migration-status.js",
    "test:parallel": "node scripts/test-parallel.js",
    lint: "eslint src/ tests/ --ext .ts",
    "lint:fix": "eslint src/ tests/ --ext .ts --fix",
    "lint:staged": "lint-staged",
    "test:integration": "node test-typescript-integration.js",
    format: 'prettier --write "src/**/*.ts" "tests/**/*.ts"',
    "format:check": 'prettier --check "src/**/*.ts" "tests/**/*.ts"',
    typecheck: "tsc --noEmit",
    test: "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:smart-response": "jest tests/features/smart-response.test.js --coverage",
    "test:services": "jest tests/services --coverage",
    "test:all-new": "jest tests/features tests/services --coverage",
    "test:performance": "jest tests/benchmarks tests/competitive tests/comprehensive tests/performance-issues-validation.test.js tests/critical-performance-issues.test.js --testTimeout=60000",
    "test:long": "jest --config jest.config.long.js",
    "test:stress": "jest --config jest.config.long.js tests/long-running/search-stress.test.js",
    "build:clean": "rimraf build dist",
    "build:validate": "node scripts/validate-build.js",
    "build:watch": "npm run build:cli:watch",
    dev: 'concurrently "npm run build:ts:watch" "npm run build:cli:watch"',
    precommit: "npm run lint && npm run format:check",
    prepublishOnly: "npm run test && npm run lint && npm run build && npm run clean:publish",
    "clean:publish": `node -e "const fs=require('fs');const path=require('path');function clean(dir){fs.readdirSync(dir).forEach(f=>{const p=path.join(dir,f);if(fs.statSync(p).isDirectory()){if(f==='test-utils'||f==='test')fs.rmSync(p,{recursive:true});else clean(p)}else if(f.endsWith('.map')||f.endsWith('.tsbuildinfo')||f.startsWith('test-utils')||f.startsWith('test-setup')||f==='nova-memory.js')fs.unlinkSync(p)})}clean('./dist')"`,
    release: "semantic-release",
    "release:dry": "semantic-release --dry-run",
    "security:audit": "npm audit --audit-level=moderate",
    "security:fix": "npm audit fix",
    "deps:check": "npm outdated",
    "deps:update": "npm update && npm audit fix",
    "ci:full": "npm run lint && npm run test:coverage && npm run build && npm run security:audit",
    postinstall: "node scripts/postinstall.js || true",
    "build:binary": "node scripts/build-binary.js",
    "build:binary:clean": "rimraf dist-binary",
    "build:executable": "node scripts/build-executable.js",
    "pkg:mcp": "pkg bin/nova-memory-mcp.mjs --out-path dist-binary",
    "pkg:cli": "pkg bin/nova-memory --out-path dist-binary",
    "mcp:start": "node scripts/auto-start-mcp.js",
    "mcp:stop": "node scripts/auto-start-mcp.js stop",
    "mcp:status": "node scripts/auto-start-mcp.js status",
    "mcp:restart": "node scripts/auto-start-mcp.js restart",
    "mcp:install-startup": "node scripts/install-windows-startup.js",
    "mcp:add-to-claude": "node add-to-claude.js",
    prepare: "husky"
  },
  keywords: [
    "ai",
    "memory",
    "mcp",
    "claude",
    "claude-desktop",
    "claude-code",
    "cursor",
    "cursor-ide",
    "project-memory",
    "file-watching",
    "developer-tools",
    "model-context-protocol",
    "ai-assistant",
    "ai-memory",
    "local-memory",
    "token-savings",
    "context-management",
    "knowledge-graph",
    "sqlite",
    "workflow-management",
    "task-management",
    "version-tracking",
    "mcp-server",
    "mcp-tools",
    "anthropic",
    "llm",
    "llm-tools",
    "ai-tools",
    "productivity",
    "development-tools",
    "free",
    "open-source",
    "mit-license"
  ],
  author: "Nova AI Team",
  license: "MIT",
  repository: {
    type: "git",
    url: "https://github.com/jagdeepsinghdev/nova-memory.git"
  },
  homepage: "https://github.com/jagdeepsinghdev/nova-memory#readme",
  bugs: {
    url: "https://github.com/jagdeepsinghdev/nova-memory/issues"
  },
  engines: {
    node: ">=16.0.0"
  },
  dependencies: {
    "@babel/runtime": "^7.28.3",
    "@modelcontextprotocol/sdk": "^1.25.1",
    "@modelcontextprotocol/server-memory": "^2025.4.25",
    "@xenova/transformers": "^2.17.2",
    "@zilliz/milvus2-sdk-node": "^2.6.0",
    blessed: "^0.1.81",
    chalk: "^4.1.2",
    chokidar: "^3.5.3",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.2",
    commander: "^11.1.0",
    "cos-similarity": "^2.0.0",
    "fs-extra": "^11.2.0",
    ink: "^6.0.1",
    "ink-box": "^2.0.0",
    "ink-progress-bar": "^3.0.0",
    "ink-select-input": "^6.2.0",
    "ink-spinner": "^5.0.0",
    "ink-table": "^3.1.0",
    "ink-text-input": "^6.0.0",
    inquirer: "^8.2.6",
    puppeteer: "^24.14.0",
    react: "^19.1.0",
    "reflect-metadata": "^0.2.2",
    sqlite3: "^5.1.7",
    uuid: "^9.0.1",
    yaml: "^2.3.4",
    zod: "^3.25.76"
  },
  devDependencies: {
    "@babel/core": "^7.23.7",
    "@babel/plugin-transform-runtime": "^7.23.7",
    "@babel/preset-env": "^7.23.7",
    "@jest/globals": "^29.7.0",
    "@semantic-release/changelog": "^6.0.3",
    "@semantic-release/git": "^10.0.1",
    "@types/jest": "^29.5.0",
    "@types/node": "^20.0.0",
    "@types/uuid": "^10.0.0",
    "@typescript-eslint/eslint-plugin": "^8.50.1",
    "@typescript-eslint/parser": "^8.50.1",
    axios: "^1.10.0",
    "better-sqlite3": "^12.2.0",
    concurrently: "^8.2.2",
    esbuild: "^0.25.8",
    eslint: "^8.57.1",
    husky: "^9.1.7",
    "javascript-obfuscator": "^0.14.0-beta.3",
    jest: "^29.7.0",
    "lint-staged": "^16.2.7",
    nexe: "^5.0.0-beta.4",
    pkg: "^4.3.0-beta.4",
    prettier: "^3.7.4",
    rimraf: "^5.0.5",
    "semantic-release": "^22.0.12",
    supertest: "^6.3.3",
    "ts-jest": "^29.1.0",
    "ts-node": "^10.9.0",
    "tsc-alias": "^1.8.16",
    typescript: "^5.3.3"
  }
};

// src/cli/mcp-nova.ts
Logger.enableAudit(true);
Logger.setLevel(0);
Logger.audit({
  event: "MCP_NOVA_STARTED",
  timestamp: (/* @__PURE__ */ new Date()).toISOString(),
  version: package_default.version,
  args: process.argv
});
async function startMCPServer(options = {}) {
  var _a;
  if (options.debug) {
    process.stderr.write("[Nova] Starting MCP server...\n");
  }
  try {
    const configManager = getConfigManager();
    await configManager.initialize(process.cwd());
    const userConfig = configManager.getConfig();
    const dbPath = options.dbPath || process.env.NOVA_DB_PATH || configManager.getDbPath();
    const isMultiProject = userConfig.storage.mode === "multi" && ((_a = userConfig.storage.multiProject) == null ? void 0 : _a.enabled);
    const config = {
      name: "nova-memory",
      version: package_default.version,
      description: "Zero-config AI project memory with live file watching and MCP integration",
      dbPath,
      features: {
        smartResponse: userConfig.features.smartHints,
        pathTracking: userConfig.features.pathTracking,
        memoryVersioning: userConfig.features.memoryVersioning,
        deduplication: userConfig.features.deduplication,
        enhancedSearch: userConfig.features.enhancedSearch
      },
      tools: {
        memory: userConfig.features.memoryStorage,
        search: userConfig.features.enhancedSearch,
        analysis: userConfig.features.conflictDetection,
        tasks: userConfig.features.taskManagement,
        projects: true,
        relationships: userConfig.features.relationships,
        versioning: userConfig.features.memoryVersioning,
        deduplication: userConfig.features.deduplication,
        pathOperations: userConfig.features.pathTracking
      },
      // Pass full user config for access by tools
      userConfig
    };
    if (options.debug) {
      process.stderr.write(`[Nova] Config loaded from: ${configManager.getProjectRoot() || "global"}
`);
      process.stderr.write(`[Nova] Database path: ${dbPath}
`);
      if (isMultiProject) {
        process.stderr.write(`[Nova] Multi-project mode enabled
`);
      }
    }
    Logger.audit({ event: "LOADING_MODULES", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
    const { createMemorySystem: createMemorySystem2 } = await Promise.resolve().then(() => (init_memory(), memory_exports));
    const { createMCPServer: createMCPServer2 } = await Promise.resolve().then(() => (init_mcp(), mcp_exports));
    if (options.debug) {
      process.stderr.write("[Nova] Modules loaded\n");
    }
    Logger.audit({ event: "MODULES_LOADED", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
    Logger.audit({ event: "CREATING_MEMORY_SYSTEM", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
    const memorySystem = createMemorySystem2(config.dbPath, {
      enableCache: true,
      cacheTimeout: 300,
      validateOnStore: true,
      deduplicationEnabled: true
    });
    if (options.debug) {
      process.stderr.write("[Nova] Memory system created\n");
    }
    Logger.audit({ event: "MEMORY_SYSTEM_CREATED", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
    let memoryService = memorySystem.service;
    let repository = memorySystem.repository;
    let multiProjectService = null;
    if (isMultiProject && userConfig.storage.multiProject) {
      try {
        const { MultiProjectMemoryService: MultiProjectMemoryService2 } = await Promise.resolve().then(() => (init_multi_project(), multi_project_exports));
        multiProjectService = new MultiProjectMemoryService2(
          userConfig.storage.multiProject,
          process.cwd(),
          memorySystem
        );
        await multiProjectService.initialize((dbPath2) => {
          return createMemorySystem2(dbPath2, {
            enableCache: true,
            cacheTimeout: 300,
            validateOnStore: true,
            deduplicationEnabled: true
          });
        });
        if (options.debug) {
          const projectCount = multiProjectService.getProjectCount();
          process.stderr.write(`[Nova] Multi-project: ${projectCount} databases connected
`);
        }
      } catch (error) {
        process.stderr.write(`[Nova] Warning: Multi-project init failed, using single mode: ${error.message}
`);
      }
    }
    Logger.audit({ event: "CREATING_MCP_SERVER", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
    const server = await createMCPServer2({
      ...config,
      memoryService,
      searchService: memorySystem.searchEngine,
      repository,
      multiProjectService,
      isMultiProject: isMultiProject && multiProjectService !== null,
      // Pass tools config to enable/disable individual tools
      toolsConfig: userConfig.tools || {}
    });
    if (options.debug) {
      process.stderr.write("[Nova] MCP server created\n");
    }
    Logger.audit({ event: "MCP_SERVER_CREATED", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
    Logger.audit({ event: "STARTING_MCP_SERVER", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
    await server.start();
    Logger.audit({ event: "MCP_SERVER_STARTED", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
    if (options.debug) {
      process.stderr.write("[Nova] MCP server started and ready\n");
    }
    const gracefulShutdown = /* @__PURE__ */ __name(async (signal) => {
      var _a2;
      if (options.debug) {
        process.stderr.write(`[Nova] Received ${signal}, shutting down...
`);
      }
      try {
        await ((_a2 = server.stop) == null ? void 0 : _a2.call(server));
        process.exit(0);
      } catch (error) {
        process.stderr.write(`[Nova] Error: Shutdown failed: ${error.message}
`);
        process.exit(1);
      }
    }, "gracefulShutdown");
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    const keepAlive = setInterval(() => {
    }, 3e4);
    process.on("exit", () => {
      clearInterval(keepAlive);
    });
  } catch (error) {
    process.stderr.write(`[Nova] Error: Failed to start MCP server: ${error.message}
`);
    if (options.verbose || options.debug) {
      process.stderr.write(`Stack trace: ${error.stack}
`);
    }
    process.exit(1);
  }
}
__name(startMCPServer, "startMCPServer");
function showServerInfo() {
  console.log(import_chalk.default.blue(`
\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557
\u2551       Nova Memory MCP Server v${package_default.version}          \u2551
\u2551            Server Information                 \u2551
\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D

${import_chalk.default.cyan("Memory Tools (8):")}
  ${import_chalk.default.green("store_memory")}     - Store memories with tags and metadata
  ${import_chalk.default.green("memory_search")}    - Search memories by content and tags
  ${import_chalk.default.green("memory_query")}     - Query memories with filters
  ${import_chalk.default.green("memory_stats")}     - Get memory statistics
  ${import_chalk.default.green("memory_delete")}    - Delete memories
  ${import_chalk.default.green("memory_tags")}      - Manage memory tags
  ${import_chalk.default.green("memory_export")}    - Export memories to file
  ${import_chalk.default.green("memory_import")}    - Import memories from file

${import_chalk.default.cyan("Search Tools (4):")}
  ${import_chalk.default.green("search_semantic")}      - Semantic similarity search
  ${import_chalk.default.green("search_patterns")}      - Pattern-based search (regex, fuzzy)
  ${import_chalk.default.green("search_temporal")}      - Time-based search
  ${import_chalk.default.green("search_relationships")} - Search by relationships

${import_chalk.default.cyan("Analysis Tools (4):")}
  ${import_chalk.default.green("analysis_conflicts")}   - Detect conflicting memories
  ${import_chalk.default.green("analysis_memory_map")}  - Generate memory visualization
  ${import_chalk.default.green("analysis_anomalies")}   - Find anomalies in memory
  ${import_chalk.default.green("analysis_forecast")}    - Predict memory patterns

${import_chalk.default.cyan("Task Tools (3):")}
  ${import_chalk.default.green("task_management")}  - Create/update/complete tasks
  ${import_chalk.default.green("task_board")}       - View task board status
  ${import_chalk.default.green("task_insights")}    - Task analytics and insights

${import_chalk.default.cyan("Advanced Tools (2):")}
  ${import_chalk.default.green("knowledge_graph")}  - Query and traverse knowledge graph
  ${import_chalk.default.green("project_profile")}  - Project context and settings

${import_chalk.default.cyan("Maintenance Tools (1):")}
  ${import_chalk.default.green("memory_compact")}   - Compact and optimize database

${import_chalk.default.yellow("Total: 22 tools")}

${import_chalk.default.cyan("Protocol:")} Model Context Protocol v1.0
${import_chalk.default.cyan("Repository:")} https://github.com/jagdeepsinghdev/nova-memory
${import_chalk.default.cyan("License:")} MIT

${import_chalk.default.yellow("Usage:")}
  Add this server to your Claude Desktop configuration:

  {
    "mcpServers": {
      "nova-memory": {
        "command": "mcp-nova",
        "args": ["--verbose"]
      }
    }
  }
  `));
}
__name(showServerInfo, "showServerInfo");
program.name("mcp-nova").description("Nova Memory MCP Server - Full MCP server with 22 tools").version(package_default.version);
program.option("--db-path <path>", "Database file path").option("-v, --verbose", "Verbose output").option("-d, --debug", "Debug mode with detailed logging").action(async (options) => {
  await startMCPServer(options);
});
program.command("info").description("Show server information and available tools").action(showServerInfo);
program.command("start").description("Start the MCP server").option("--db-path <path>", "Database file path").option("-v, --verbose", "Verbose output").option("-d, --debug", "Debug mode with detailed logging").action(startMCPServer);
program.command("init").description("Initialize Nova Memory config in current project").option("-g, --global", "Create global config instead of project config").action(async (options) => {
  try {
    const configManager = getConfigManager();
    await configManager.initialize(process.cwd());
    const configPath = await configManager.createProjectConfig();
    console.log(import_chalk.default.green(`
Nova Memory initialized!

Config created: ${configPath}

Configuration options:
   - Storage mode: ${configManager.getConfig().storage.mode}
   - Database: ${configManager.getDbPath()}
   - Features: ${Object.entries(configManager.getConfig().features).filter(([_, v]) => v).map(([k]) => k).slice(0, 5).join(", ")}...

Edit ${configPath} to customize settings.

Run 'mcp-nova start' to begin!
      `));
  } catch (error) {
    console.error(import_chalk.default.red(`Failed to initialize: ${error.message}`));
    process.exit(1);
  }
});
program.command("config").description("Show current configuration").action(async () => {
  try {
    const configManager = getConfigManager();
    await configManager.initialize(process.cwd());
    console.log(import_chalk.default.blue(`
\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557
\u2551           Nova Memory Configuration           \u2551
\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D
`));
    console.log(import_chalk.default.cyan("Project Root:"), configManager.getProjectRoot() || "None detected");
    console.log(import_chalk.default.cyan("Database Path:"), configManager.getDbPath());
    console.log(import_chalk.default.cyan("Storage Mode:"), configManager.getConfig().storage.mode);
    console.log();
    console.log(import_chalk.default.yellow("Features:"));
    Object.entries(configManager.getConfig().features).forEach(([key, value]) => {
      console.log(`  ${value ? import_chalk.default.green("") : import_chalk.default.red("")} ${key}`);
    });
  } catch (error) {
    console.error(import_chalk.default.red(`Failed to load config: ${error.message}`));
    process.exit(1);
  }
});
program.parse();
//# sourceMappingURL=mcp-nova.js.map
