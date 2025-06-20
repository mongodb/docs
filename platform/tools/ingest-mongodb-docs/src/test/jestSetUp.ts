import { logger } from "../logger";
// silence logger for tests
logger.transports.forEach((t) => (t.silent = true));
