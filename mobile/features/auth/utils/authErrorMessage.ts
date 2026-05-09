export default function authErrorMessage(message: string): string {
  const normalized = message.toLowerCase();
  if (normalized.includes('invalid login') || normalized.includes('invalid credentials')) {
    return 'E-mail ou senha incorretos.';
  }
  if (normalized.includes('email not confirmed')) {
    return 'Confirme seu e-mail antes de entrar.';
  }
  if (normalized.includes('network')) {
    return 'Verifique sua conexão e tente novamente.';
  }
  return message;
}
