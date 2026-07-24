// Framework-agnostic version of the helper fn to get default tabs for
// fallback (when no local storage found). Shared by the client tabs
// context (render path) and the markdown export route.
// For drivers tabs,
// 1. return default tab if available
// 2. return 'nodejs' if found
// Otherwise, return first choice.
export type TabChoice = { value: string };
export type ChoicesPerSelector = Record<string, TabChoice[]>;
export type DefaultTabs = Record<string, string>;

export const getDefaultTabs = (
  choicesPerSelector: ChoicesPerSelector,
  defaultTabs: DefaultTabs,
): Record<string, string> =>
  Object.keys(choicesPerSelector || {}).reduce<Record<string, string>>((res, selectorKey) => {
    const defaultTabId = defaultTabs[selectorKey] ?? 'nodejs';
    const defaultOptionIdx = choicesPerSelector[selectorKey].findIndex((tab) => tab.value === defaultTabId);
    // NOTE: default tabs should be specified here
    if (selectorKey === 'drivers' && defaultOptionIdx > -1) {
      res[selectorKey] = defaultTabId;
    } else {
      res[selectorKey] = choicesPerSelector[selectorKey][0].value;
    }
    return res;
  }, {});
