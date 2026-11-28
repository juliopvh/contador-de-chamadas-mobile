import { StyleSheet } from "react-native";
import { colors } from "./src/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  conteudo: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: 40,
  },
  cartao: {
    width: "100%",
    maxWidth: 420,
    borderRadius: 24,
    padding: 20,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
  },
  titulo: {
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: -0.4,
  },
  subtitulo: {
    fontSize: 15,
    fontWeight: "400",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 13,
  },
  boasVindas: {
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 12,
    letterSpacing: -0.2,
  },
  visor: {
    borderRadius: 18,
    padding: 20,
    alignItems: "center",
    marginBottom: 12,
  },
  rotulo: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  numero: {
    fontSize: 56,
    fontWeight: "800",
    letterSpacing: -1,
  },
  mensagem: {
    color: colors.success,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 14,
  },
  dica: {
    textAlign: "center",
    marginBottom: 14,
  },
  linhaBotoes: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 10,
  },
  botao: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  botaoMenos: {
    backgroundColor: colors.primary,
    marginRight: 6,
  },
  botaoMais: {
    backgroundColor: colors.success,
    marginLeft: 6,
  },
  botaoZerar: {
    backgroundColor: colors.warning,
    marginRight: 6,
  },
  botaoTema: {
    backgroundColor: colors.purple,
    marginLeft: 6,
  },
  botaoDesabilitado: {
    opacity: 0.45,
  },
  textoBotao: {
    color: colors.buttonText,
    fontSize: 15,
    fontWeight: "700",
  },

  botaoResumo: {
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  textoBotaoResumo: {
    color: colors.buttonText,
    fontSize: 15,
    fontWeight: "700",
  },
  rodape: {
    marginTop: 18,
    fontSize: 12,
    textAlign: "center",
  },
  linhaMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  barraFundo: {
    height: 10,
    borderRadius: 20,
    overflow: "hidden",
  },
  barraProgresso: {
    height: 10,
    backgroundColor: colors.progress,
    borderRadius: 20,
  },
  textoProgresso: {
    textAlign: "center",
    marginTop: 8,
    marginBottom: 15,
  },
});
