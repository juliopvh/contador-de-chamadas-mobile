import { Text, View } from "react-native";

interface CounterVisorProps {
  contador: number;
  visorColor: string;
  subtitleColor: string;
  numberColor: string;
}

export function CounterVisor({ contador, visorColor, subtitleColor, numberColor }: CounterVisorProps) {
  return (
    <View
      style={{ backgroundColor: visorColor, borderRadius: 16, padding: 20, alignItems: "center", marginBottom: 12 }}
      accessibilityRole="summary"
      accessibilityLabel={`Contagem atual: ${contador}`}
    >
      <Text style={{ fontSize: 12, fontWeight: "700", color: subtitleColor, marginBottom: 4 }}>CONTAGEM</Text>
      <Text style={{ fontSize: 52, fontWeight: "800", color: numberColor }}>{contador}</Text>
    </View>
  );
}
