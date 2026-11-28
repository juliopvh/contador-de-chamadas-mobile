/**
 * Utilitários puros do contador de metas.
 *
 * Mantidos livres de dependências de React/React Native para serem
 * testáveis em ambiente Node (Jest) sem mocks de plataforma.
 */

export const DAILY_GOAL = 10;
export const MAX_NAME_LENGTH = 30;
export const SMALL_SCREEN_WIDTH = 360;

/**
 * Formata a saudação exibida no cartão.
 * Trata entrada vazia/whitespace para evitar "Olá,  !".
 */
export function formatGreeting(nome: string): string {
  const trimmed = (nome ?? "").trim();
  if (trimmed.length === 0) {
    return "Olá! Digite seu nome para começar.";
  }
  // Capitaliza a primeira letra de cada palavra de forma estável.
  const display = trimmed
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
  return `Olá, ${display}! Vamos contar suas metas.`;
}

/**
 * Calcula o progresso (0..1) de forma segura contra divisão por zero
 * e valores fora do intervalo.
 */
export function clampProgress(contador: number, meta: number): number {
  if (!Number.isFinite(contador) || !Number.isFinite(meta) || meta <= 0) {
    return 0;
  }
  const ratio = contador / meta;
  if (ratio < 0) return 0;
  if (ratio > 1) return 1;
  return ratio;
}
