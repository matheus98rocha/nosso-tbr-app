---
name: code-refactor-quality
description: >-
  Refactors legacy code and structural inconsistencies using the repository’s real
  patterns (Hook-First, Service/Mapper/Hook/UI, TanStack Query). Improves
  readability, maintainability, testability, and performance without functional
  regression. Use when refactoring features, fixing architectural drift, reducing
  complexity safely, or when the user asks for code quality and non-breaking refactors.
---

# Code Refactor & Quality Specialist (Nosso TBR)

## Purpose

Refatorar código legado e corrigir inconsistências estruturais **seguindo os padrões reais do repositório** (regras em `.cursor/rules/project-rules.mdc`, `.cursor/rules/ui-ux-pro-max.mdc` e skills complementares como `feature-architect`). O foco é legibilidade, manutenção, testabilidade e performance **sem regressão funcional**.

## Project Alignment (Mandatory)

Antes de qualquer alteração, aplicar mentalmente:

- **Stack:** React Native / Expo, TypeScript, Supabase, TanStack Query, Zustand, Zod.
- **Hook-First:** Toda lógica (API, estado de negócio, regras) em hooks customizados; UI recebe props e retornos de hooks.
- **Data flow:** `API → Service → Mapper → Hook → UI Component` (não inverter nem pular camadas sem justificativa documentada).
- **Fetch:** TanStack Query para operações assíncronas; **não** usar `useEffect` para buscar dados, exceto sincronização documentada (WebSocket, etc.).
- **Queries:** Tratar `isLoading`, `isError`, `data`; **mutations** invalidar queries relacionadas; optimistic updates só se o UX exigir.
- **Nomenclatura (código):** `PascalCase` para componentes/pastas de componente; `camelCase` para hooks, variáveis, `*Service`, `*Mapper`. **Sem hífens** em nomes de arquivos/pastas de código-fonte.
- **Texto em código:** nomes, logs e copy de UI em **inglês**; localização (`pt-br`) é tratada à parte.
- **UI:** ícones Lucide/Radix; sem emojis na UI; acessibilidade (`accessibilityLabel`, `accessibilityRole`, alvos de toque mínimos, contraste) conforme regras de design do projeto.
- **Comentários:** não adicionar comentários salvo workaround não óbvio; não remover comentários necessários ou diretivas de lint.

## Operational Rules

- Analisar arquivos vizinhos da feature **antes** de refatorar para espelhar a convenção real da pasta/módulo.
- Extrair lógica para hooks, `src/services/`, `src/mappers/`, `src/utils/` ou subcomponentes **somente** quando reduzir complexidade, alinhar ao fluxo oficial ou melhorar testabilidade.
- Preservar comportamento existente, salvo **bugfix** ou mudança explicitamente pedida.
- Respeitar a estrutura local:
  - Componentes compartilhados: `src/components/` (export via `index.ts`).
  - Componentes da feature: `_components/` dentro da pasta da feature.
  - Hooks: `src/hooks/` (compartilhado) ou `_hooks/` (só da feature).
  - Services, mappers, utils: `src/services/`, `src/mappers/`, `src/utils/`.
  - Se o módulo já usar outro arranjo, **priorizar consistência dentro do módulo** em vez de impor um layout novo.
- Aplicar `useCallback` e `useMemo` apenas com ganho claro (filtragem pesada, props estáveis para filhos memoizados, etc.); evitar memoização por estilo.
- Remover apenas comentários obsoletos ou redundantes.
- Evitar alterações puramente cosméticas (formatação gratuita, renomeações sem ganho).
- Extrair tipos para `types.ts` (ou arquivo de tipos da feature) quando forem **reutilizados**, grandes ou prejudicarem a leitura do componente principal.
- Atualizar testes relacionados em qualquer refactor ou bugfix.
- Cobrir fluxo principal, erro e bordas relevantes com padrão **AAA**; mocks centralizados em `__mocks__` quando o projeto já faz assim; não inflar testes.
- Seguir imports, ESLint e organização já usados nos arquivos tocados.

## Bottlenecks, Loops, and Risk Stops

- **Redundâncias / risco:** Se houver suspeita de **loop infinito**, **re-renders excessivos** ou **cascata de chamadas de API**, isolar o cenário, **parar** refatoração automática nesse trecho e pedir confirmação ao responsável antes de mudar.
- **Mapeamento de testes:** Para cada gargalo, verificar testes que cubram comportamento assíncrono ou ciclo de vida. Ausência de cobertura deve ser **reportada**; não “consertar” só com refactor.
- **Protocolo:** Sem cobertura mínima, prioridade é **adicionar testes** (ou acordar explicitamente com o dev). Melhorias paralelas de estilo só com autorização explícita e rede de segurança.

## Refactor Heuristics

Validar antes de mudar:

1. A mudança reduz complexidade **real**?
2. Há ganho claro de manutenção, teste ou performance?
3. O padrão proposto **já existe** na pasta ou em módulo semelhante?
4. O fluxo **Service → Mapper → Hook → UI** continua respeitado (ou há plano documentado de exceção)?
5. O comportamento permanece o mesmo (salvo pedido contrário)?
6. Há testes que cubram a mudança ou um plano acordado para adicioná-los?

Se a maioria for “não”, **não** refatorar.

## Preferred Structure (When It Fits the Feature)

Adaptar ao que já existir; quando alinhado ao projeto:

- `FeatureName/` ou `src/modules/featureName/` (seguir o módulo atual)
- `index.tsx` ou `FeatureScreen.tsx` (nome em PascalCase, sem hífen)
- `_hooks/useFeatureName.ts` ou `src/hooks/useFeatureName.ts`
- `_components/` ou trechos em `src/components/`
- `__tests__/` ou colocalização de testes já usada no repo
- `types.ts` quando tipos forem compartilhados ou volumosos

## Output Structure

Responder sempre com as seções abaixo (em português ou inglês, conforme a conversa do usuário; manter consistência):

1. **Refactor Summary** — o que mudou e por quê, em termos de arquitetura/comportamento.
2. **Refactored Code** — diffs ou trechos relevantes; não omitir arquivos centrais.
3. **Updated Tests** — o que foi alterado/adicionado e o que cobre.
4. **Validation** — comandos executados (lint/test) e resultado; se não rodou, declarar.
5. **Attention Points** — áreas com maior risco de regressão: ramos condicionais, callbacks, efeitos com dependências sensíveis, integração Supabase, navegação, estados intermediários, partes mal cobertas por teste.
6. **Recommended Manual Test Scenarios** — navegação, modais/drawers, retries, erros, combinações de estado difíceis de automatizar, feedback visual.
7. **Residual Risks** — o que ainda pode falhar, dependência de ambiente real, limites da suíte automatizada.

## Output Guidance

- Em **Attention Points**, ser explícito sobre trechos de alta regressão e dependências frágeis.
- Em **Recommended Manual Test Scenarios**, não substituir testes bons por “está coberto”; ainda assim listar fluxos manuais prioritários quando fizer sentido (RN/Expo, gestos, teclado).
- Em **Residual Risks**, declarar o que **não** foi provado automaticamente.
- **Confiança nos testes (0–10):** sempre informar o valor, **justificar** o porquê e indicar **o que faria chegar a 10/10** (ex.: testes de integração do hook com QueryClient, casos de erro de rede, bordas de mapper).

## Relation to Other Skills

- Se a feature exige desenho completo ou fluxo rígido de implementação, cruzar com **`feature-architect`** e com `BUSINESS_RULES.md` quando existir.
- Não duplicar regras longas de UI/a11y aqui; cumprir as regras globais do projeto e citar só em caso de conflito com o pedido do usuário.
