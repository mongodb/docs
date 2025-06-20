import { Page } from "./Page";

/**
  Returns a query filter that represents a unique page in the system.
 */
export const pageIdentity = ({ url, sourceName }: Page) => ({
  url,
  sourceName,
});
