import * as Haptics from "expo-haptics";
import { Pressable, Text, View } from "react-native";

interface ActionButtonsProps {
  isZero: boolean;
  nextThemeLabel: string;
  onDecrement: () => void;
  onIncrement: () => void;
  onReset: () => void;
  onToggleTheme: () => void;
}

function Button({
  label,
  onPress,
  disabled,
  backgroundColor,
  style,
  accessibilityLabel,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  backgroundColor: string;
  style?: object;
  accessibilityLabel: string;
}) {
  return (
    <Pressable
      onPress={() => {
        Haptics.selectionAsync().catch(() => {});
        onPress();
      }}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: !!disabled }}
      style={({ pressed }) => [
        {
          flex: 1,
          paddingVertical: 14,
          borderRadius: 14,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor,
          opacity: disabled ? 0.45 : pressed ? 0.85 : 1,
          outlineWidth: 0,
        },
        style,
      ]}
    >
      <Text style={{ color: "#FFFFFF", fontSize: 15, fontWeight: "700" }}>{label}</Text>
    </Pressable>
  );
}

export function ActionButtons({
  isZero,
  nextThemeLabel,
  onDecrement,
  onIncrement,
  onReset,
  onToggleTheme,
}: ActionButtonsProps) {
  return (
    <View style={{ width: "100%" }}>
      <View style={{ width: "100%", flexDirection: "row", gap: 8, marginBottom: 10 }}>
        <Button
          label="−"
          onPress={onDecrement}
          disabled={isZero}
          backgroundColor="#007AFF"
          accessibilityLabel="Decrementar contador"
        />
        <Button
          label="+"
          onPress={onIncrement}
          backgroundColor="#34C759"
          accessibilityLabel="Incrementar contador"
        />
      </View>
      <View style={{ width: "100%", flexDirection: "row", gap: 8 }}>
        <Button
          label="Zerar"
          onPress={onReset}
          disabled={isZero}
          backgroundColor="#FF9500"
          accessibilityLabel="Zerar contador"
        />
        <Button
          label={nextThemeLabel}
          onPress={onToggleTheme}
          backgroundColor="#AF52DE"
          accessibilityLabel="Alternar tema"
        />
      </View>
    </View>
  );
}
