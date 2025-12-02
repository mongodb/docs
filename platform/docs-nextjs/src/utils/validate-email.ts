export function validateEmail(input: string) {
  const isValidEmail = input === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
  return isValidEmail;
}

export default validateEmail;
