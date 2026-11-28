import { DAILY_GOAL, MAX_NAME_LENGTH, SMALL_SCREEN_WIDTH, clampProgress, formatGreeting } from "../../src/utils/counter";

describe("counter utils", () => {
  it("has sane constants", () => {
    expect(DAILY_GOAL).toBeGreaterThan(0);
    expect(MAX_NAME_LENGTH).toBeGreaterThan(0);
    expect(SMALL_SCREEN_WIDTH).toBeGreaterThan(0);
  });

  it("formats greeting for empty name", () => {
    expect(formatGreeting("")).toBe("Olá! Digite seu nome para começar.");
    expect(formatGreeting("   ")).toBe("Olá! Digite seu nome para começar.");
  });

  it("formats greeting with capitalized name", () => {
    expect(formatGreeting("joão silva")).toBe("Olá, João Silva! Vamos contar suas metas.");
  });

  it("clamps progress", () => {
    expect(clampProgress(5, 10)).toBe(0.5);
    expect(clampProgress(-1, 10)).toBe(0);
    expect(clampProgress(20, 10)).toBe(1);
    expect(clampProgress(5, 0)).toBe(0);
    expect(clampProgress(NaN, 10)).toBe(0);
  });
});
