import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useTranslation } from "react-i18next";
import { Platform, ScrollView, Text, TextInput, View, useWindowDimensions } from "react-native";
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
    <View style={[styles.container, { backgroundColor: tema.background }]}>
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
        <View
          style={[
            styles.cartao,
            {
              padding: telaPequena ? 15 : 22,
              backgroundColor: tema.surface,
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
        </View>

        <Text style={[styles.rodape, { color: tema.subtitle }]}>{t("footer")}</Text>
      </ScrollView>
    </View>
  );
}
