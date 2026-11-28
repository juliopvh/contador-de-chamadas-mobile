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
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor,
          opacity: disabled ? 0.45 : pressed ? 0.85 : 1,
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
      <View style={{ width: "100%", flexDirection: "row", marginBottom: 10 }}>
        <Button
          label="-"
          onPress={onDecrement}
          disabled={isZero}
          backgroundColor="#2563EB"
          style={{ marginRight: 6 }}
          accessibilityLabel="Decrementar contador"
        />
        <Button
          label="+"
          onPress={onIncrement}
          backgroundColor="#16A34A"
          style={{ marginLeft: 6 }}
          accessibilityLabel="Incrementar contador"
        />
      </View>
      <View style={{ width: "100%", flexDirection: "row" }}>
        <Button
          label="Zerar"
          onPress={onReset}
          disabled={isZero}
          backgroundColor="#F59E0B"
          style={{ marginRight: 6 }}
          accessibilityLabel="Zerar contador"
        />
        <Button
          label={nextThemeLabel}
          onPress={onToggleTheme}
          backgroundColor="#7C3AED"
          style={{ marginLeft: 6 }}
          accessibilityLabel="Alternar tema"
        />
      </View>
    </View>
  );
}
