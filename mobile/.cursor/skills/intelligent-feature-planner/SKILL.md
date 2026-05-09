---
name: intelligent-feature-planner
description: "Propõe novas features do Nosso TBR quando o backlog está vazio ou curto. Consulta o Second Brain (Obsidian), revisa contexto do repositório e README, sugere candidatos com tamanho estimado e orienta próximos passos (spec no Second Brain, README, implementação Hook-First)."
---

# Intelligent Feature Planner — Nosso TBR + Second Brain

## Goal

Quando não houver trabalho claramente prioritário em aberto (issues, branches ativas, pendências explícitas nas notas do projeto), propor **novas features** alinhadas ao **Nosso TBR**, usando o **Second Brain** como fonte de verdade para contexto histórico, regras de negócio e documentação de features — e como destino para **novas especificações** e **regras** descobertas no planejamento.

**Segundo cérebro (paths absolutos no Windows):**

- **Raiz do projeto no Obsidian:** `C:\www\second_brain\01-Projetos\nosso-tbr`
- **Bugs complexos (se o planejamento revelar incidentes ou hipóteses de bug):** `C:\www\second_brain\03-Resolucao-de-Bugs\nosso-tbr`
- **Padrões novos reutilizáveis:** `C:\www\second_brain\02-Boas-Praticas` (ou `01-Projetos\nosso-tbr\02-Boas-Praticas` quando o padrão for específico do app)

**Antes de propor trabalho:** listar e ler o que já existir em `01-Projetos\nosso-tbr` (`features/`, `database/`, `tbr-book-provider/`, notas soltas como regras de produto). **Depois de fechar uma proposta ou regra nova:** registrar no Second Brain (ver passo 6).

## Sizing Rubric (mudança esperada em código, somadas linhas adicionadas + removidas)

| Tier   | Lines  | Example                                    |
|--------|--------|--------------------------------------------|
| tiny   | ~5     | Config, constantes, literais               |
| small  | ~20    | Uma função, um arquivo, refactor local     |
| medium | ~50    | Vários arquivos, mudança de interface      |
| large  | ~100   | Cross-cutting, migrações leves             |
| xlarge | ~500   | Arquitetura, troca de framework            |

## Backlog no Nosso TBR (substitui `docs/*/trace.md`)

Este repositório **não** usa `docs/*/trace.md` por padrão. Para saber se o backlog está “vazio” ou pequeno:

1. **Second Brain** — `C:\www\second_brain\01-Projetos\nosso-tbr\features\` e notas relacionadas (status, “próximos passos”, integrações).
2. **Repositório** — `README.md` (mapa de funcionalidades e guia para agentes em `c:\www\nosso-tbr\README.md`).
3. **Git** — branches recentes, últimos merges (contexto do que acabou de entrar).
4. **Issues / board** — se o projeto estiver usando GitHub ou outra ferramenta, considerar abertas como backlog ativo.

Se só sobrarem itens mínimos (typos, ajustes de constante), tratar como **carryover** separado das features “grandes”.

## Workflow

1. **Consultar o Second Brain primeiro**
   - Abrir `C:\www\second_brain\01-Projetos\nosso-tbr` e revisar `features/`, `database/`, notas de integração (ex.: `tbr-book-provider`, `integracao-tbr-book-provider.md`).
   - Se houver histórico de bugs relevantes ao tema, checar `C:\www\second_brain\03-Resolucao-de-Bugs\nosso-tbr`.
   - Extrair: decisões já tomadas, regras de negócio, gaps explícitos (“falta…”, “próximo…”).

2. **Confirmar status do backlog**
   - Cruzar Second Brain com issues/branches e com o `README.md` do Nosso TBR.
   - Confirmar que não há épicos pendentes óbvios; se houver apenas restos pequenos, listar como carryover.

3. **Revisar trabalho já concluído (código + docs)**
   - Patches recentes no repositório `c:\www\nosso-tbr`.
   - Notas no Second Brain que marquem features como concluídas ou estáveis.
   - Identificar padrões: módulos em `src/modules/*`, hooks, serviços Supabase, integração com book provider.

4. **Propor próximo trabalho**
   - Duas a quatro ideias, cada uma amarrada a uma nota existente no Second Brain, ao README ou a um gap visível no código.
   - Estimar **tier** de cada uma.
   - Respeitar padrões do projeto: Hook-First, serviços sem UI, TanStack Query, `pt-br` na interface.

5. **Apresentar opções (template)**

```text
Backlog parece pouco encorpado. Com base no Second Brain (01-Projetos/nosso-tbr) e no repositório, candidatos:

1) {Ideia A} ({tier})
   - {uma linha, ligada a nota/README/commit recente}

2) {Ideia B} ({tier})
   - {uma linha}

3) {Ideia C} ({tier})
   - {uma linha}

Carryover (opcional, itens miúdos):
- {descrição curta}

Escolha um número ou descreva outra feature; em seguida registro a spec no Second Brain e alinho com README + estrutura de módulo.
```

6. **Depois da escolha do usuário — Second Brain e repositório**
   - **Salvar / atualizar no Second Brain** em `C:\www\second_brain\01-Projetos\nosso-tbr\features\` um markdown da nova feature (objetivo, escopo, critérios de aceite, impacto em BD se houver, links para módulos).
   - **Regras de negócio** novas ou que mudem comportamento: mesma árvore `01-Projetos\nosso-tbr` (arquivo dedicado ou seção clara na nota da feature).
   - **Bug complexo** identificado no planejamento: `C:\www\second_brain\03-Resolucao-de-Bugs\nosso-tbr\`.
   - **Padrão novo** (ex.: componente, filtro, convenção de query): `02-Boas-Praticas` conforme regra global do Second Brain.
   - **Repositório:** seguir o guia do `README.md` — domínio, `src/modules`, rota em `src/app`, testes quando fizer sentido.

7. **Hand off**
   - Indicar ordem sugerida de implementação (hook → serviço → UI) e lembrar de **atualizar o README** do Nosso TBR quando a feature alterar fluxo ou mapa de funcionalidades.

## Integration

- **Entrada:** falta de issues prioritárias, fila curta no board ou notas do Second Brain sem “próximo passo” grande.
- **Fonte de contexto obrigatória:** `C:\www\second_brain\01-Projetos\nosso-tbr` antes de inventar escopo.
- **Saída estruturada:** nota(s) no Second Brain + alinhamento com `c:\www\nosso-tbr\README.md` e estrutura `src/modules`.
- **Implementação de código** após spec pronta: skill `nosso-tbr-feature-executor` (esta skill não substitui o executor).
- Fluxos auxiliares do Cursor (outras skills de refactor, testes, commit) podem ser usados **após** a feature estar escrita no Second Brain, conforme necessidade do usuário.
