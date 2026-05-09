---
name: nosso-tbr-feature-executor
description: "Implementa features do Nosso TBR de ponta a ponta a partir de spec (Second Brain, issue ou pedido do usuário). Segue Hook-First, serviços, TanStack Query, README e atualização do Second Brain após entrega."
---

# Executor de Features — Nosso TBR + Second Brain

## Goal

Transformar uma **spec aceita** (nota no Obsidian, issue, ou descrição objetiva do usuário) em **mudanças reais** no repositório `c:\www\nosso-tbr`, preservando arquitetura e documentação. O **planejamento amplo de backlog** fica na skill `intelligent-feature-planner`; **esta** skill cobre **descoberta no código + implementação + verificação + atualização de artefatos**.

## Quando usar

- Existe escopo claro (idealmente arquivo em `C:\www\second_brain\01-Projetos\nosso-tbr\features\` ou equivalente).
- O usuário pediu para “fazer a feature”, “implementar”, “fechar o épico”, “executar a spec”.
- Não usar esta skill só para listar ideias sem código; nesse caso use o planejador.

## Second Brain (consulta e persistência)

**Ler antes de codar:**

- `C:\www\second_brain\01-Projetos\nosso-tbr\features\` — spec, critérios de aceite, decisões.
- `C:\www\second_brain\01-Projetos\nosso-tbr\database\` — se a feature tocar schema, RLS ou políticas.
- `C:\www\second_brain\03-Resolucao-de-Bugs\nosso-tbr\` — se o trabalho corrigir ou esclarecer bug documentado.

**Gravar depois que a entrega ficar consistente:**

- Atualizar a nota da feature (status, data, o que foi feito, limitações).
- Novas **regras de negócio** ou mudanças de comportamento: mesma árvore `01-Projetos\nosso-tbr` (nota dedicada ou seção na feature).
- **Bug complexo** descoberto ou resolvido no caminho: `03-Resolucao-de-Bugs\nosso-tbr\`.
- **Padrão novo** reutilizável: `C:\www\second_brain\02-Boas-Praticas` ou `01-Projetos\nosso-tbr\02-Boas-Praticas` conforme o escopo.

## Padrões obrigatórios do repositório (resumo)

- **Hook-First:** lógica e regras em hooks; componentes majoritariamente de apresentação e composição.
- **Otimização em hooks:** `useCallback` e `useMemo` onde houver funções passadas a filhos ou cálculos derivados custosos.
- **Tipos:** em `*.types.ts` (ou equivalente do módulo); **não** declarar `interface`/`type` no arquivo do componente.
- **Exports:** preferir `export default`; pastas públicas com `index.ts` quando já for o padrão do módulo.
- **Imports:** externos → alias `@/` → relativos; blocos separados por linha em branco; ordem alfabética dentro do bloco quando couber sem conflito com o restante do arquivo.
- **Naming:** não usar `_` no início de nomes de componentes.
- **UI:** textos e comportamento de componentes de terceiros alinhados a **pt-br**.
- **Testes:** par implementação + teste na mesma pasta dedicada, conforme `README.md` do Nosso TBR.
- **Escopo do diff:** só o necessário para a feature; sem refactors ou arquivos paralelos não pedidos.

## Workflow de execução

1. **Anclar o escopo**
   - Identificar nota no Second Brain ou extrair critérios do pedido/issue.
   - Listar incógnitas; se blocker (ex.: decisão de produto), parar e perguntar ao usuário.

2. **Mapear o código**
   - Localizar módulos em `src/modules/*`, rotas em `src/app`, serviços em `src/services`.
   - Replicar padrões existentes (hooks, Query keys, mappers, `ErrorHandler` quando aplicável).

3. **Implementar na ordem sugerida**
   - Tipos e contratos → serviços (sem UI) → hooks (Query/mutations, estado derivado) → componentes → rota ou integração na tela existente.
   - Supabase/migrações: seguir documentação no Second Brain e convenções do projeto; não inventar RLS.

4. **Validar**
   - Rodar testes afetados (`yarn test` ou escopo estreito com o comando já usado no repo).
   - Corrigir lints nos arquivos tocados.

5. **Documentar no repositório**
   - Atualizar `c:\www\nosso-tbr\README.md` quando a feature mudar fluxo, módulo relevante ou mapa de funcionalidades (conforme o próprio README exige).

6. **Fechar o ciclo no Second Brain**
   - Sincronizar nota da feature e demais notas listadas na seção “Second Brain (consulta e persistência)”.

## Hand off

- Resumo objetivo do que foi implementado, arquivos-chave e o que ficou explícito como follow-up (se houver).
- Se a entrega for grande, sugerir PR em branch `feat/...` contra `develop`, alinhado às regras de contribuição do README.

## Integração com outras skills

- **Planejamento / ideias / backlog vazio:** `intelligent-feature-planner`.
- **Refatoração ampla sem mudar comportamento:** `code-refactor-quality`.
- **Commits:** convenção do repositório (`git-commit-convention-conventional-ommits`).
