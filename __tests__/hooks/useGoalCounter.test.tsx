import { renderHook, act, waitFor } from "@testing-library/react-native/pure";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useGoalCounter } from "../../src/hooks/useGoalCounter";

jest.mock("@react-native-async-storage/async-storage", () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  },
}));

const mockedStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

describe("useGoalCounter", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedStorage.getItem.mockResolvedValue(null);
    mockedStorage.setItem.mockResolvedValue(undefined);
  });

  it("starts empty and ready after hydration", async () => {
    const { result } = await renderHook(() => useGoalCounter(10));
    await waitFor(() => expect(result.current).not.toBeNull());
    await waitFor(() => expect(result.current!.isReady).toBe(true));
    expect(result.current.contador).toBe(0);
    expect(result.current.nome).toBe("");
  });

  it("increments and decrements with floor at 0", async () => {
    const { result } = await renderHook(() => useGoalCounter(10));
    await waitFor(() => expect(result.current).not.toBeNull());
    await waitFor(() => expect(result.current!.isReady).toBe(true));
    await act(async () => {
      result.current!.increment();
    });
    await act(async () => {
      result.current!.increment();
    });
    expect(result.current.contador).toBe(2);
    await act(async () => {
      result.current!.decrement();
    });
    expect(result.current.contador).toBe(1);
    await act(async () => {
      result.current!.decrement();
    });
    await act(async () => {
      result.current!.decrement();
    });
    expect(result.current.contador).toBe(0);
  });

  it("resets and toggles theme", async () => {
    const { result } = await renderHook(() => useGoalCounter(10));
    await waitFor(() => expect(result.current).not.toBeNull());
    await waitFor(() => expect(result.current!.isReady).toBe(true));
    await act(async () => {
      result.current!.increment();
    });
    await act(async () => {
      result.current!.reset();
    });
    expect(result.current.contador).toBe(0);
    const first = result.current.temaAtual;
    await act(async () => {
      result.current!.toggleTheme();
    });
    expect(result.current.temaAtual).not.toBe(first);
  });

  it("clamps name to MAX length", async () => {
    const { result } = await renderHook(() => useGoalCounter(10));
    await waitFor(() => expect(result.current).not.toBeNull());
    await waitFor(() => expect(result.current!.isReady).toBe(true));
    await act(async () => {
      result.current!.setNome("a".repeat(100));
    });
    expect(result.current.nome.length).toBe(30);
  });

  it("hydrates from storage", async () => {
    mockedStorage.getItem.mockResolvedValue(
      JSON.stringify({ nome: "Maria", contador: 4, temaAtual: "dark" }),
    );
    const { result } = await renderHook(() => useGoalCounter(10));
    await waitFor(() => expect(result.current).not.toBeNull());
    await waitFor(() => expect(result.current!.isReady).toBe(true));
    expect(result.current.nome).toBe("Maria");
    expect(result.current.contador).toBe(4);
    expect(result.current.temaAtual).toBe("dark");
  });
});
