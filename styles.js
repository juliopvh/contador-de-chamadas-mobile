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
    maxWidth: 430,
    borderRadius: 22,
    padding: 22,
    elevation: 4,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
  },
  titulo: {
    fontWeight: "700",
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 18,
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
    marginVertical: 15,
  },
  visor: {
    borderRadius: 18,
    padding: 20,
    alignItems: "center",
    marginBottom: 12,
  },
  rotulo: {
    fontSize: 12,
    fontWeight: "700",
  },
  numero: {
    fontSize: 52,
    fontWeight: "800",
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
    paddingVertical: 14,
    borderRadius: 12,
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
