/**
 * Joins class names. Deliberately tiny — the design system leans on tokens
 * rather than conditional utility soup, so full merge semantics never pay
 * for themselves here.
 */
export function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}
