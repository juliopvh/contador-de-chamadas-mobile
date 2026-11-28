import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import { Platform, Pressable, ScrollView, Text, TextInput, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { styles } from "../../styles";
import { THEME_CONFIG } from "../constants/themes";
import { useGoalCounter } from "../hooks/useGoalCounter";
import { DAILY_GOAL, MAX_NAME_LENGTH, SMALL_SCREEN_WIDTH, formatGreeting } from "../utils/counter";
import { CounterVisor } from "../components/CounterVisor";
import { GoalProgress } from "../components/GoalProgress";
import { ActionButtons } from "../components/ActionButtons";

if (Platform.OS !== "web") {
  SplashScreen.preventAutoHideAsync().catch(() => {});
}

export default function GoalCounterScreen() {
  const { nome, setNome, contador, temaAtual, progresso, isReady, increment, decrement, reset, toggleTheme } =
    useGoalCounter(DAILY_GOAL);
  const { t } = useTranslation();

  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const telaPequena = width < SMALL_SCREEN_WIDTH;

  const { palette: tema, statusBarStyle, nextLabel } = THEME_CONFIG[temaAtual];

  useEffect(() => {
    if (isReady && Platform.OS !== "web") {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <LinearGradient
      colors={[tema.background, tema.surface, tema.background]}
      style={styles.container}
    >
      <StatusBar style={statusBarStyle} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.conteudo,
          {
            paddingTop: Math.max(40, insets.top + 12),
            paddingBottom: Math.max(20, insets.bottom + 20),
          },
        ]}
      >
        <BlurView
          intensity={50}
          tint={temaAtual === "light" ? "light" : "dark"}
          style={[
            styles.cartao,
            {
              padding: telaPequena ? 15 : 20,
              backgroundColor: tema.surface + "CC",
              borderWidth: temaAtual === "purple" ? 1 : 0,
              borderColor: tema.border + "99",
              overflow: "hidden",
            },
          ]}
        >
          <Text accessibilityRole="header" style={[styles.titulo, { fontSize: telaPequena ? 20 : 24, color: tema.title }]}>
            {t("title")}
          </Text>

          <Text style={[styles.subtitulo, { color: tema.subtitle }]}>{t("subtitle")}</Text>

          <TextInput
            style={[styles.input, { backgroundColor: tema.inputBackground, borderColor: tema.border, color: tema.text }]}
            placeholder={t("namePlaceholder")}
            placeholderTextColor={tema.subtitle}
            value={nome}
            onChangeText={setNome}
            autoCapitalize="words"
            autoCorrect={false}
            returnKeyType="done"
            maxLength={MAX_NAME_LENGTH}
            accessibilityLabel="Campo para digitar seu nome"
          />

          <Text style={[styles.boasVindas, { color: tema.text }]}>{formatGreeting(nome)}</Text>

          <CounterVisor contador={contador} visorColor={tema.visor} subtitleColor={tema.subtitle} numberColor={tema.number} />

          <GoalProgress
            contador={contador}
            meta={DAILY_GOAL}
            progresso={progresso}
            textColor={tema.text}
            subtitleColor={tema.subtitle}
            progressTrackColor={tema.progressTrack}
          />

          <ActionButtons
            isZero={contador === 0}
            nextThemeLabel={nextLabel}
            onDecrement={decrement}
            onIncrement={increment}
            onReset={reset}
            onToggleTheme={toggleTheme}
          />

          <Pressable
            style={[
              styles.botaoResumo,
              {
                backgroundColor: tema.title,
                marginTop: 12,
              },
            ]}
            onPress={() =>
              router.push({
                pathname: "/resumo",
                params: {
                  nome: nome.trim() || "Estudante",
                  contador: String(contador),
                  meta: String(DAILY_GOAL),
                  temaAtual,
                },
              })
            }
            accessibilityRole="button"
            accessibilityLabel="Ver resumo da meta"
          >
            <Text style={styles.textoBotaoResumo}>Ver resumo da meta</Text>
          </Pressable>
        </BlurView>

        <Text style={[styles.rodape, { color: tema.subtitle }]}>{t("footer")}</Text>
      </ScrollView>
    </LinearGradient>
  );
}
