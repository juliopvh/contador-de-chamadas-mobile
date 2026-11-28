import { useCallback, useEffect, useState } from "react";
import { MAX_NAME_LENGTH, clampProgress } from "../utils/counter";
import { DEFAULT_THEME, nextTheme, type ThemeName } from "../constants/themes";
import { storage, type PersistedState } from "../services/storage";

export interface GoalCounterState {
  nome: string;
  setNome: (value: string) => void;
  contador: number;
  temaAtual: ThemeName;
  progresso: number;
  isReady: boolean;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  toggleTheme: () => void;
}

export function useGoalCounter(meta: number): GoalCounterState {
  const [nome, setNomeState] = useState<string>("");
  const [contador, setContador] = useState<number>(0);
  const [temaAtual, setTemaAtual] = useState<ThemeName>(DEFAULT_THEME);
  const [isReady, setIsReady] = useState<boolean>(false);

  // Hidratação inicial (offline-first).
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const parsed = await storage.load();
        if (parsed && !cancelled) {
          setNomeState(parsed.nome.slice(0, MAX_NAME_LENGTH));
          setContador(Math.max(0, Math.floor(parsed.contador)));
          setTemaAtual(parsed.temaAtual);
        }
      } catch {
        // Estado corrompido: mantém defaults.
      } finally {
        if (!cancelled) setIsReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Persistência debounced.
  useEffect(() => {
    if (!isReady) return;
    const handle = setTimeout(() => {
      const payload: PersistedState = { nome, contador, temaAtual };
      storage.save(payload).catch(() => {});
    }, 300);
    return () => clearTimeout(handle);
  }, [nome, contador, temaAtual, isReady]);

  const setNome = useCallback((value: string) => {
    setNomeState(value.slice(0, MAX_NAME_LENGTH));
  }, []);

  const increment = useCallback(() => setContador((c) => c + 1), []);
  const decrement = useCallback(() => setContador((c) => (c > 0 ? c - 1 : 0)), []);
  const reset = useCallback(() => setContador(0), []);
  const toggleTheme = useCallback(() => setTemaAtual((t) => nextTheme(t)), []);

  const progresso = clampProgress(contador, meta);

  return {
    nome,
    setNome,
    contador,
    temaAtual,
    progresso,
    isReady,
    increment,
    decrement,
    reset,
    toggleTheme,
  };
}
