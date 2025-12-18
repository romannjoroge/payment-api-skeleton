import pino from "pino";
import "dotenv/config";

const NODE_ENV = process.env.NODE_ENV ?? "local";
const LOG_LEVEL = process.env.LOG_LEVEL ?? "info";

interface LogContext {
  [key: string]: unknown;
}

interface Logger {
  fatal(message: string, context?: LogContext): void;
  error(message: string, context?: LogContext): void;
  warn(message: string, context?: LogContext): void;
  info(message: string, context?: LogContext): void;
  debug(message: string, context?: LogContext): void;
  trace(message: string, context?: LogContext): void;
  child(bindings: Record<string, unknown>): Logger;
}

const redactPaths = [
  "password",
  "*.password",
  "*.token",
  "*.accessToken",
  "*.refreshToken",
  "*.authorization",
  "*.secret",
  "*.apiKey",
  "*.privateKey",
  "*.creditCard",
  "*.ssn",
  "*.socialSecurityNumber",
];

const pinoLogger = pino({
  level: LOG_LEVEL,
  redact: {
    paths: redactPaths,
    censor: "**REDACTED**",
  },
  formatters: {
    level: (label) => ({ level: label }),
    bindings: (bindings) => {
      return {
        pid: bindings.pid,
        hostname: bindings.hostname,
        node_version: process.version,
      };
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  serializers: {
    err: pino.stdSerializers.err,
    error: pino.stdSerializers.err,
  },
  transport:
    NODE_ENV === "local" || NODE_ENV === "staging"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:yyyy-mm-dd HH:MM:ss",
            ignore: "pid,hostname",
          },
        }
      : undefined,
});

// Application logger wrapper
const logger: Logger = {
  fatal(message: string, context?: LogContext) {
    pinoLogger.fatal(context, message);
  },
  error(message: string, context?: LogContext) {
    pinoLogger.error(context, message);
  },
  warn(message: string, context?: LogContext) {
    pinoLogger.warn(context, message);
  },
  info(message: string, context?: LogContext) {
    pinoLogger.info(context, message);
  },
  debug(message: string, context?: LogContext) {
    pinoLogger.debug(context, message);
  },
  trace(message: string, context?: LogContext) {
    pinoLogger.trace(context, message);
  },
  child(bindings: Record<string, unknown>) {
    return pinoLogger.child(bindings);
  },
};

export default logger;