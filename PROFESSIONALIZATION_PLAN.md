# Plano de Profissionalização — Meu Contador de Metas (Expo / React Native)

> Documento de planejamento. Nenhum código de aplicação foi alterado nesta etapa além da instalação/atualização de dependências e da criação deste arquivo.

## 0. Diagnóstico do estado atual

### 0.1 O que existe

- App de tela única: contador de "metas diárias" com nome do usuário, 4 temas (claro, escuro, roxo, "Júlio hacker"), progresso em relação a uma meta e botões de incremento/decremento/zerar/trocar tema.
- Configuração Expo SDK **58** (`expo ~58.1.0`), React 19.3, React Native 0.88, TypeScript 6, ESLint 9 (flat config), Jest 30 + jest-expo.
- `App.js` (raiz) é o ponto de entrada e importa de `./src/...`, mas a pasta `src/` **não existe** no repositório.
- A pasta `assets/` referenciada em `app.json` (ícone, splash, adaptive icon) **não existe**.
- `README.md` contém apenas `# contadormobile`.
- Não há repositório Git inicializado, `eas.json`, testes, CI/CD, nem documentação de produto.

### 0.2 Resultado das verificações executadas

| Verificação | Resultado |
|---|---|
| `npm install` | OK — 1283 pacotes, 22 vulnerabilidades moderadas (tooling do Jest) |
| `npx expo-doctor` | 1 falha: assets ausentes em `app.json` |
| `npx tsc --noEmit` | 6 erros: módulos `./src/...` não encontrados |
| `npx expo lint` | 6 erros: `import/no-unresolved` para os mesmos módulos |
| `npm test` | "No tests found" (exit 0, mas sem cobertura real) |

### 0.3 Causa-raiz do não-build

O `App.js` referencia módulos que nunca foram versionados/criados:

- `src/constants/themes` → `THEME_CONFIG`
- `src/hooks/useGoalCounter`
- `src/utils/counter` → `DAILY_GOAL, MAX_NAME_LENGTH, SMALL_SCREEN_WIDTH, formatGreeting`
- `src/components/CounterVisor`
- `src/components/GoalProgress`
- `src/components/ActionButtons`

Enquanto esses módulos não existirem (ou forem recriados), o app não compila nem roda. Isso é o **bloqueador #1**.

### 0.4 Riscos e débitos identificados

1. **Build quebrado** (src e assets ausentes).
2. **Arquitetura fora do padrão Expo Router**: o `AGENTS.md` do projeto exige rotas em `src/app/` e código não-rotas fora de `src/app/`. Hoje tudo está na raiz e o entrypoint é `App.js` registrado manualmente.
3. **Sem persistência verificável**: `useGoalCounter` (ausente) provavelmente usaria AsyncStorage; não há evidência de hidratação/erro handling.
4. **Sem testes** (unitários, de componente, e2e).
5. **Sem CI/CD**, sem `eas.json`, sem perfis de build, sem versionamento semântico automatizado.
6. **Sem documentação** (README vazio, sem CONTRIBUTING, CHANGELOG).
7. **Sem estratégia de acessibilidade auditada** (alguns `accessibilityLabel`/`accessibilityRole` existem, mas sem testes).
8. **Sem i18n**: strings em português hardcoded.
9. **Sem observabilidade** (crash reporting, analytics).
10. **Segurança**: 22 vulnerabilidades moderadas (majoritariamente cadeia de ferramentas do Jest). Sem `npm audit` em CI.
11. **Sem padronização de commits** (sem commitlint/husky).
12. **Assets de marca ausentes** (ícone, splash, adaptive icon).
13. **Sem validação de entrada** além de `maxLength` (nome pode ser só espaços, etc.).
14. **Sem tratamento de erros** em operações assíncronas (SplashScreen, AsyncStorage).
15. **Sem suporte a orientação/landscape** (orientation: portrait fixo — decisão de produto, mas deve ser documentada).
16. **Sem deep linking / scheme** configurado.

---

## 1. Objetivo

Tornar o projeto um app Expo/React Native **pronto para produção**, com:

- Build verde (lint + typecheck + testes) em CI.
- Arquitetura alinhada ao padrão Expo Router + pasta `src/`.
- Cobertura de testes ≥ 80% nas unidades críticas.
- Pipeline de release (dev/preview/production) via Expo Build/Update com versionamento automatizado.
- Documentação completa e onboarding de contribuidores em < 10 minutos.
- Observabilidade mínima (crashes + analytics opt-in).
- Acessibilidade (WCAG 2.1 AA) e i18n (pt-BR + en-US).

---

## 2. Princípios (não negociáveis)

1. **Não alterar comportamento de usuário sem teste** que o cubra.
2. **Toda mudança passa por lint + typecheck + testes** antes de merge.
3. **CNG (Continuous Native Generation)**: nunca editar `ios/`/`android/` à mão; usar config plugins e `app.json`.
4. **Dependências apenas via `npx expo install`** (resolve versões compatíveis com o SDK).
5. **Conventional Commits** + PRs pequenos.
6. **Feature flags** para funcionalidades experimentais.
7. **Offline-first**: estado local persistido e recuperável.
8. **Acessibilidade first**: todo elemento interativo com label/role.

---

## 3. Estrutura de pastas alvo

```
.
├── app.json
├── eas.json                         # NOVO
├── .env.example                     # NOVO
├── .github/workflows/               # NOVO (CI)
├── assets/                          # NOVO (ícones, splash, fontes)
├── src/
│   ├── app/                         # Expo Router (rotas)
│   │   ├── _layout.tsx
│   │   └── index.tsx
│   ├── components/                  # UI reutilizável
│   │   ├── ActionButtons/
│   │   ├── CounterVisor/
│   │   └── GoalProgress/
│   ├── constants/
│   │   └── themes.ts
│   ├── hooks/
│   │   └── useGoalCounter.ts
│   ├── utils/
│   │   └── counter.ts
│   ├── services/                    # AsyncStorage, analytics, crash
│   ├── i18n/                        # NOVO
│   └── theme/                       # tokens de design
├── __tests__/                       # ou co-located *.test.tsx
├── docs/                            # ADRs, guias
├── PLAN... (este arquivo)
└── README.md
```

---

## 4. Fases de execução

### Fase 0 — Higiene de repositório (1–2 dias)

- [ ] Inicializar Git (`git init`), criar `.gitignore` (já existe, validar).
- [ ] Criar repositório remoto e branch `main` protegida.
- [ ] Adotar Conventional Commits + template de PR.
- [ ] Configurar `husky` + `lint-staged` (lint + typecheck nos arquivos alterados).
- [ ] Configurar `commitlint`.
- [ ] Atualizar `README.md` com: descrição, pré-requisitos, como rodar, scripts, estrutura, contribuição.
- [ ] Adicionar `LICENSE` próprio (hoje é a licença do Expo; trocar para MIT do autor ou manter corretamente).
- [ ] Criar `.env.example` (ex.: `EXPO_PUBLIC_APP_ENV=development`).
- [ ] Gerar assets de marca (ícone 1024×1024, splash, adaptive icon, favicon) — usar `npx expo install` de `expo-image` se necessário; ferramenta `npx create-expo-app` template ou Figma. Colocar em `assets/` e validar com `expo-doctor`.
- [ ] Atualizar `app.json`: `scheme`, `plugins`, `experiments.typedRoutes`, `newArchEnabled` (SDK 58 default), `ios.buildNumber`, `android.versionCode`.

**Critério de aceite:** `npx expo-doctor` 20/20; repositório versionado.

### Fase 1 — Restaurar o build (bloqueador) (2–4 dias)

Recriar os módulos ausentes a partir do contrato esperado por `App.js`. Antes de codar, definir interfaces (TypeScript) para cada módulo.

- [ ] `src/utils/counter.ts`
  - `DAILY_GOAL` (constante configurável, ex.: 10)
  - `MAX_NAME_LENGTH` (ex.: 30)
  - `SMALL_SCREEN_WIDTH` (ex.: 360)
  - `formatGreeting(nome: string): string` (tratar vazio/espaços)
  - testes unitários (jest) para bordas.
- [ ] `src/constants/themes.ts` (`THEME_CONFIG`)
  - Mapear `light | dark | purple | julio` → `{ palette, statusBarStyle, nextLabel }`.
  - Reusar `colors.js` (migrar para TS) ou manter e tipar.
  - Garantir contraste (WCAG) — auditar cores (ex.: `julioTheme` verde sobre preto pode falhar contraste para texto pequeno).
- [ ] `src/hooks/useGoalCounter.ts`
  - Estado: `nome`, `contador`, `temaAtual`, `isReady`.
  - Hidratação assíncrona de AsyncStorage com try/catch e fallback.
  - Persistência debounced (evitar write a cada keystroke).
  - `progresso` clampado [0,1].
  - `toggleTheme` ciclando entre temas.
  - Cleanup de timers/listeners.
  - Testes com `@testing-library/react-native` + mock de AsyncStorage.
- [ ] Componentes `CounterVisor`, `GoalProgress`, `ActionButtons`
  - Props tipadas.
  - `accessibilityRole`, `accessibilityLabel`, `accessibilityState`.
  - Estados disabled com `accessibilityState={{ disabled }}`.
  - Memoização (`React.memo`) onde fizer sentido.
- [ ] Migrar `colors.js` e `styles.js` para `src/theme/` (tokens) + `StyleSheet.create`.

**Critério de aceite:** `npm run typecheck`, `npm run lint`, `npm test` verdes; app roda em Expo Go (web + android/ios simulator).

### Fase 2 — Migração para Expo Router (3–5 dias)

Seguir `AGENTS.md` e docs Expo Router.

- [ ] Instalar: `npx expo install expo-router expo-linking expo-constants expo-status-bar` (status-bar já). Configurar `main: "expo-router/entry"` em `package.json`.
- [ ] Criar `src/app/_layout.tsx` (Stack/Tabs) com `SafeAreaProvider`, tema, splash.
- [ ] Mover tela principal para `src/app/index.tsx`.
- [ ] Configurar `experiments.typedRoutes: true` para rotas tipadas.
- [ ] Adicionar telas: `settings`, `about`, `history` (histórico de contagens) — opcional, mas profissional.
- [ ] Deep linking: `scheme` + universal links (documentar).
- [ ] Remover `App.js`/`index.js` legados após migração (ou manter shim).

**Critério de aceite:** navegação funcional, deep link abre tela correta, typed routes sem erro.

### Fase 3 — Qualidade de código (contínua, foco nas 2 primeiras semanas)

- [ ] Cobertura de testes:
  - Unitários: `counter.ts`, `themes.ts`, `useGoalCounter`.
  - Componentes: snapshot + interação (increment/decrement/reset/toggle).
  - E2E: Maestro ou Detox (Expo recomenda Maestro) — fluxo feliz + temas.
- [ ] Adicionar `jest-coverage` threshold (80%) no `package.json`.
- [ ] Adicionar Prettier + config compartilhada; integrar ao ESLint.
- [ ] Adicionar `tsc --noEmit` ao CI.
- [ ] Adicionar Storybook (opcional) para componentes visuais.
- [ ] Mutation testing (Stryker) — opcional, fase avançada.

### Fase 4 — UX/UI profissional

- [ ] Design tokens (cores, espaçamento, tipografia, raio, sombra) em `src/theme/tokens.ts`.
- [ ] Suporte a tema do sistema (`useColorScheme`) + override manual persistido.
- [ ] Animações com `react-native-reanimated` (instalar via `npx expo install`) para contador e progresso.
- [ ] Haptics (`expo-haptics`) nos botões.
- [ ] Feedback visual de meta atingida (confetti / animação).
- [ ] Estados de loading/erro/empty.
- [ ] Teclado: `KeyboardAvoidingView` (já usa ScrollView com persistTaps).
- [ ] Tipografia: fontes custom (ex.: Inter) via `expo-font` com splash aguardando.
- [ ] Ícones: `@expo/vector-icons` (já disponível) em vez de emojis/texto.
- [ ] Responsividade para tablet/web (largura máxima já existe; revisar).

### Fase 5 — Dados e persistência

- [ ] Abstrair storage em `src/services/storage.ts` (interface + implementação AsyncStorage) para testabilidade.
- [ ] Versionar schema de dados (migrações) para evitar perda ao atualizar.
- [ ] Validar entrada (zod) no boundary (nome, contador).
- [ ] Backup/export (JSON) e restore — opcional, valor alto para "profissional".
- [ ] Considerar `expo-sqlite` se histórico crescer.

### Fase 6 — Internacionalização e acessibilidade

- [ ] i18n com `i18next` + `react-i18next` (ou `expo-localization` + dicionários leves). Idiomas: pt-BR (default) e en-US.
- [ ] Extrair todas as strings (UI, erros, a11y labels).
- [ ] Auditoria de acessibilidade: VoiceOver/TalkBack, contraste, tamanho de toque ≥ 44pt, foco.
- [ ] Suporte a fontes grandes (Dynamic Type) — testar `maxFontSizeMultiplier`.
- [ ] Reduzir movimento (`AccessibilityInfo` + `reduceMotion`).

### Fase 7 — Observabilidade e monitoramento

- [ ] Sentry (`@sentry/react-native`) via config plugin; capturar crashes + performance.
- [ ] Analytics (PostHog ou Firebase) com consentimento (LGPD/GDPR).
- [ ] Logs estruturados (dev only) e source maps no build.
- [ ] Expo Observe (performance) — avaliar.

### Fase 8 — Segurança e conformidade

- [ ] `npm audit` em CI (bloquear high/critical; moderates triaged).
- [ ] Dependabot/Renovate para updates.
- [ ] Secrets apenas via EAS env vars; nunca commitar.
- [ ] Privacy manifest (iOS) e data safety (Android) documentados.
- [ ] Política de privacidade publicada (URL) referenciada em `app.json`/stores.

### Fase 9 — CI/CD e release

- [ ] Criar `eas.json` com perfis: `development`, `preview`, `production`, e `submit`.
- [ ] GitHub Actions (ou Expo Workflows):
  - PR: lint + typecheck + testes + build de preview (opcional).
  - main: build production + submit (manual gate).
  - tags: release notes automatizadas.
- [ ] Versionamento: `expo-version` / `standard-version` ou release-please.
- [ ] OTA updates: canais `production`, `staging`; runtime version policy `fingerprint` (SDK 58).
- [ ] Smoke test em device farm (Maestro Cloud / EAS) antes de submit.

### Fase 10 — Performance e polimento final

- [ ] Bundle analysis (`expo-atlas`) — remover dead code.
- [ ] Hermes + New Architecture já default; validar.
- [ ] Imagens otimizadas (WebP, tamanhos adequados).
- [ ] Lazy loading de telas pesadas.
- [ ] Memorização e `useMemo`/`useCallback` revisados.
- [ ] Profiling de render (React DevTools) — sem re-renders desnecessários.
- [ ] Acessibilidade de performance: 60fps em animações.

---

## 5. Backlog de débito técnico (priorizado)

| # | Item | Prioridade | Esforço |
|---|------|-----------|---------|
| 1 | Recriar módulos `src/*` ausentes | P0 | M |
| 2 | Gerar assets de marca | P0 | S |
| 3 | Migrar para Expo Router | P1 | M |
| 4 | Testes unitários (counter, hook) | P1 | M |
| 5 | CI básico (lint/typecheck/test) | P1 | S |
| 6 | `eas.json` + perfis | P2 | S |
| 7 | i18n | P2 | M |
| 8 | Sentry + analytics | P2 | M |
| 9 | Animações/haptics | P3 | M |
| 10 | Histórico/export de dados | P3 | L |

---

## 6. Métricas de sucesso

- `expo-doctor`: 20/20.
- `tsc --noEmit`: 0 erros.
- `expo lint`: 0 erros/avisos.
- Cobertura de testes ≥ 80% (linhas) nos módulos de `src/utils`, `src/hooks`, `src/components`.
- Build de produção (Android AAB + iOS IPA) gerado com sucesso no EAS.
- Tempo de cold start < 2s em device mid-range.
- 0 crashes não tratados em 30 dias de beta.
- Lighthouse (web) ≥ 90 em Performance/Acessibilidade.

---

## 7. Riscos e mitigações

| Risco | Mitigação |
|---|---|
| Recriar `src/*` sem spec pode divergir do esperado | Escrever testes de contrato primeiro (TDD) a partir de `App.js`. |
| Expo SDK 58 exige Node recente | Documentar Node 20 LTS; CI com matrix. (Hoje: Node 24 — validar compatibilidade.) |
| Assets ausentes bloqueiam build nativo | Usar assets padrão do template Expo temporariamente; substituir antes de release. |
| Migração para Expo Router pode quebrar deep links | Manter `scheme` e testar com `npx uri-scheme`. |
| Vulnerabilidades moderadas no Jest | Manter em devDependencies; não afetam runtime; atualizar quando SDK permitir. |

---

## 8. Próximos passos imediatos (esta semana)

1. Gerar/obter assets de marca e colocar em `assets/` → `expo-doctor` verde.
2. Criar `src/utils/counter.ts` + testes (TDD).
3. Criar `src/constants/themes.ts` tipado reusando `colors.js`.
4. Criar `src/hooks/useGoalCounter.ts` + testes com mock de AsyncStorage.
5. Criar os 3 componentes com props tipadas e a11y.
6. Rodar `npm run typecheck && npm run lint && npm test` até verde.
7. Só então iniciar Fase 2 (Expo Router).

---

## 9. Fora de escopo (por ora)

- Backend / sincronização em nuvem (app é local-first).
- Monetização / IAP.
- Suporte a wearables.

---

## 10. Referências

- `AGENTS.md` (regras do projeto e Expo).
- Expo Docs (SDK 58): https://docs.expo.dev/versions/v58.0.0/
- Expo Router: https://docs.expo.dev/router/introduction.md
- EAS Build/Update/Submit: https://docs.expo.dev/eas/index.md
- React Native New Architecture: https://docs.expo.dev/guides/new-architecture.md

---

_Última atualização: gerado durante a análise inicial. Ajustar conforme decisões de produto._
