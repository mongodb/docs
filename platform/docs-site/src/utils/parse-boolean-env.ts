export const parseBooleanEnv = (envValue: string | undefined) => {
  if (!envValue) {
    return false;
  }

  const lowerCaseVal = envValue.toLowerCase();
  return lowerCaseVal === 'true';
};
