import AsyncStorage from "@react-native-async-storage/async-storage";
import { z } from "zod";

const StateSchema = z.object({
  nome: z.string().max(30),
  contador: z.number().int().min(0),
  temaAtual: z.enum(["light", "dark", "purple", "julio"]),
});

export type PersistedState = z.infer<typeof StateSchema>;

const KEY = "@meu_contador_de_metas:state:v1";

export const storage = {
  async load(): Promise<PersistedState | null> {
    try {
      const raw = await AsyncStorage.getItem(KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      const result = StateSchema.safeParse(parsed);
      if (!result.success) return null;
      return result.data;
    } catch {
      return null;
    }
  },
  async save(state: PersistedState): Promise<void> {
    try {
      await AsyncStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      // Ignore persistence errors; app keeps working in-memory.
    }
  },
};
