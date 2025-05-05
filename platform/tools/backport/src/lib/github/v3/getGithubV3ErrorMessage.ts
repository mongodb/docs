// Docs: https://developer.github.com/v3/#client-errors
type GithubV3Error = {
  name: string;
  status: number;
  documentation_url: string;
  message?: string;
  errors?: Array<{
    resource: string;
    code: string;
    field: string;
    message?: string;
  }>;
};

export function getGithubV3ErrorMessage(e: GithubV3Error) {
  if (!e.errors) {
    return e.message;
  }

  const errorMessages = e.errors.map((error) => {
    if (error.message) {
      return error.message;
    }

    return JSON.stringify(error);
  });
  return `${errorMessages.join(', ')} (Github v3)`;
}
