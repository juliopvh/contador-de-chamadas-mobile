# Meu Contador de Metas

App mobile (Expo / React Native) para contagem de metas diárias, com temas, progresso e persistência local.

## Requisitos

- Node.js 20 LTS (ou superior compatível com Expo SDK 58)
- npm
- Expo CLI (`npx expo`)

## Como rodar

```bash
npm install
npx expo start
```

Atalhos:

```bash
npm run android
npm run ios
npm run web
```

## Qualidade

```bash
npm run typecheck
npm run lint
npm test
npm run test:coverage
```

## Estrutura

```
src/
  app/          # Expo Router (rotas)
  components/   # UI reutilizável
  constants/    # temas e cores
  hooks/        # estado
  i18n/         # internacionalização
  services/     # storage, monitoring
  utils/        # funções puras
```

## Build / Release

Perfis EAS em `eas.json` (`development`, `preview`, `production`). Veja o plano em `PROFESSIONALIZATION_PLAN.md`.

## Licença

MIT
```