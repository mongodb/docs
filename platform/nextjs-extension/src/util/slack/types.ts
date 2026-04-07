export interface SlackHookBody {
  env: 'dotcomprd' | 'dotcomstg';
  userID: string;
  username: string;
}

export function isSlackHookBody(obj: unknown): obj is SlackHookBody {
  if (!obj) return false;
  const { env, userID, username } = obj as SlackHookBody;

  return (
    typeof userID === 'string' &&
    typeof username === 'string' &&
    (env === 'dotcomprd' || env === 'dotcomstg')
  );
}
