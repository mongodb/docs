import { createLogger, Logger, transports, format, LogEntry } from "winston";
import envConfig, { type Environments } from "./env-config";

// Acts as global logger object as long as it's created by `initiaLogger` funciton
let logger: Logger | null = null;

const getEnvLevel = (env: Environments) => {
  switch (env) {
    case "production":
      return "warn";
    case "dotcomstg":
      return "warn";
    case "dotcomprd":
      return "warn";
    default:
      return "debug";
  }
};

/**
 * Returns a reusable global logger instance. If no logger exists yet, then
 * a new logger is created
 *
 * @returns logger
 */
const initiateLogger = () => {
  // Reuse global logger
  if (logger) {
    return logger;
  }

  logger = createLogger({
    transports: [
      new transports.Console({
        format: format.json(),
      }),
    ],
    level: getEnvLevel(envConfig.DB_ENV),
  });

  logger.info("Logger created");

  return logger;
};

const getLevel = (level?: string) => level || "info";

type logParams = {
  message: string;
  level?: string;
  [key: string]: unknown;
};

export const log = ({ message, level, ...rest }: logParams) => {
  const _logger = initiateLogger();
  const logEntry: LogEntry = {
    level: getLevel(level),
    message: message,
    ...rest
  };
  _logger.log(logEntry);
};
