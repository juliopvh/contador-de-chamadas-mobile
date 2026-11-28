import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

import { styles } from "../../styles";
import { THEME_CONFIG } from "../constants/themes";
import { clampProgress } from "../utils/counter";

export default function ResumoScreen() {
  const { nome, contador, meta, temaAtual } = useLocalSearchParams<{
    nome?: string;
    contador?: string;
    meta?: string;
    temaAtual?: string;
  }>();

  const nomeFinal = (nome ?? "Estudante").trim() || "Estudante";
  const contadorFinal = Number(contador ?? 0);
  const metaFinal = Number(meta ?? 10);
  const temaKey = (temaAtual as keyof typeof THEME_CONFIG) ?? "light";
  const tema = THEME_CONFIG[temaKey]?.palette ?? THEME_CONFIG.light.palette;
  const progresso = clampProgress(contadorFinal, metaFinal);
  const pct = Math.round(progresso * 100);

  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const telaPequena = width < 360;

  return (
    <LinearGradient colors={[tema.background, tema.surface, tema.background]} style={styles.container}>
      <Stack.Screen options={{ title: "Resumo da Meta", headerShown: true, headerTintColor: tema.title }} />
      <ScrollView
        contentContainerStyle={[
          styles.conteudo,
          {
            paddingTop: Math.max(24, insets.top + 8),
            paddingBottom: Math.max(20, insets.bottom + 20),
          },
        ]}
      >
        <BlurView
          intensity={50}
          tint={temaKey === "light" ? "light" : "dark"}
          style={[
            styles.cartao,
            {
              padding: telaPequena ? 16 : 24,
              backgroundColor: tema.surface + "CC",
              borderWidth: temaKey === "purple" ? 1 : 0,
              borderColor: tema.border + "99",
              overflow: "hidden",
            },
          ]}
        >
          <Text style={[styles.titulo, { color: tema.title, fontSize: telaPequena ? 20 : 24 }]}>
            Resumo da Meta
          </Text>
          <Text style={[styles.subtitulo, { color: tema.subtitle }]}>Programação Mobile I</Text>

          <Text style={[styles.boasVindas, { color: tema.text }]}>Olá, {nomeFinal}!</Text>

          <View style={{ width: "100%", gap: 12, marginTop: 8 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={{ color: tema.subtitle, fontSize: 15 }}>Contagem atual</Text>
              <Text style={{ color: tema.text, fontSize: 22, fontWeight: "700" }}>{contadorFinal}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={{ color: tema.subtitle, fontSize: 15 }}>Meta diária</Text>
              <Text style={{ color: tema.text, fontSize: 22, fontWeight: "700" }}>{metaFinal}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={{ color: tema.subtitle, fontSize: 15 }}>Progresso</Text>
              <Text style={{ color: tema.title, fontSize: 22, fontWeight: "800" }}>{pct}%</Text>
            </View>
          </View>

          <View style={{ width: "100%", marginTop: 20 }}>
            <View style={[styles.barraFundo, { backgroundColor: tema.progressTrack, height: 8, borderRadius: 4 }]}>
              <View
                style={[
                  styles.barraProgresso,
                  { width: `${pct}%`, height: 8, borderRadius: 4, backgroundColor: "#34C759" },
                ]}
              />
            </View>
          </View>
        </BlurView>
      </ScrollView>
    </LinearGradient>
  );
}
