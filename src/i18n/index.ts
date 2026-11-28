import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

const resources = {
  "pt-BR": {
    translation: {
      title: "Meu Contador de Metas",
      subtitle: "Programação Mobile I",
      namePlaceholder: "Digite seu nome",
      greetingEmpty: "Olá! Digite seu nome para começar.",
      countLabel: "CONTAGEM",
      dailyGoal: "Meta diária",
      goalReached: "Meta atingida! 🎉",
      percentOfGoal: "{{pct}}% da meta",
      decrement: "Decrementar contador",
      increment: "Incrementar contador",
      reset: "Zerar contador",
      toggleTheme: "Alternar tema",
      footer: "Desenvolvido por Júlio César",
    },
  },
  en: {
    translation: {
      title: "My Goal Counter",
      subtitle: "Mobile Programming I",
      namePlaceholder: "Enter your name",
      greetingEmpty: "Hello! Enter your name to start.",
      countLabel: "COUNT",
      dailyGoal: "Daily goal",
      goalReached: "Goal reached! 🎉",
      percentOfGoal: "{{pct}}% of goal",
      decrement: "Decrement counter",
      increment: "Increment counter",
      reset: "Reset counter",
      toggleTheme: "Toggle theme",
      footer: "Developed by Júlio César",
    },
  },
};

const deviceLanguage = Localization.getLocales()[0]?.languageTag ?? "pt-BR";

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources,
  lng: deviceLanguage.startsWith("pt") ? "pt-BR" : "en",
  fallbackLng: "pt-BR",
  interpolation: { escapeValue: false },
});

export default i18n;
