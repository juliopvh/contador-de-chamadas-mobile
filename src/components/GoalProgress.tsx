import { Text, View } from "react-native";

interface GoalProgressProps {
  contador: number;
  meta: number;
  progresso: number;
  textColor: string;
  subtitleColor: string;
  progressTrackColor: string;
}

export function GoalProgress({
  contador,
  meta,
  progresso,
  textColor,
  subtitleColor,
  progressTrackColor,
}: GoalProgressProps) {
  const pct = Math.round(progresso * 100);
  const concluida = contador >= meta && meta > 0;

  return (
    <View style={{ width: "100%", marginBottom: 12 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
        <Text style={{ color: textColor, fontWeight: "600" }}>Meta diária</Text>
        <Text style={{ color: subtitleColor }}>Meta: {meta}</Text>
      </View>
      <View
        style={{
          height: 6,
          borderRadius: 3,
          overflow: "hidden",
          backgroundColor: progressTrackColor,
        }}
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: 100, now: pct }}
        accessibilityLabel={`Progresso da meta: ${pct}%`}
      >
        <View
          style={{
            height: 6,
            width: `${pct}%`,
            backgroundColor: "#34C759",
            borderRadius: 3,
          }}
        />
      </View>
      <Text style={{ textAlign: "center", marginTop: 8, color: concluida ? "#16A34A" : subtitleColor, fontWeight: concluida ? "700" : "400" }}>
        {concluida ? "Meta atingida!" : `${pct}% da meta`}
      </Text>
    </View>
  );
}
