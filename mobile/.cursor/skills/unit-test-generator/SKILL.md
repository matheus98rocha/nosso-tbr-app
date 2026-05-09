# Skill: Testes unitários — geração, avaliação e regras (Nosso TBR / Vitest)

## Propósito

Padronizar o ciclo de testes automatizados: **gerar** testes úteis, **avaliar** suites existentes contra regras de negócio e **atualizar** a documentação de domínio quando testes revelarem comportamento canônico ou lacunas claras — sem chamar rede, banco ou APIs reais.

### Prioridade explícita (cobertura × regras × contrato)

- **Percentual de cobertura não é objetivo final.** Ele só vale como alerta de buracos ou regressão depois que o teste já prova **comportamento** e aderência às **RN** do `business-rules.md`.
- **Objetivo útil:** cada caso deve poder ser rastreado a uma **RN** (ou a um contrato explícito: validação, participação, formato de resposta, cadeia Supabase esperada). Se subir só a porcentagem sem isso, a suite continua frágil.
- **Evitar:** testes que só exercitam ramos com mock “artificial” (ex.: substituir um módulo inteiro para lançar um valor que não é `Error`) **só para fechar branch**, quando nenhuma RN ou contrato de API real está em jogo. Preferir cenários que espelham o domínio (ex.: transição inválida via validador real).
- **Páginas Next (JSX):** smoke de **layout** (landmarks, classes) com **cliente mockado de ponta a ponta** não substitui garantia de RN; trate como composição mínima e complemente com testes de hooks/serviços/rotas onde a regra vive (alinhado ao aviso em `business-rules.md` sobre páginas que só montam layout + cliente).
- **Route handlers (`src/app/api/**`):** além do status HTTP, preferir asserts que **amarrem o handler ao contrato**: `from("books")`, colunas do `select` coerentes com a rota, `eq("id", …)` com o id da requisição, matriz de **participação** (ex.: `user_id` / `chosen_by` / `readers` como em **RN42**), forma das respostas (ex.: `{ ok: true }` vs `{ error }` sem vazar chaves indevidas). Agrupar `describe` por **RN** ou tema quando isso deixar o mapa óbvio para o revisor.

## Quando usar

- Ao escrever ou revisar funções isoladas (utils, validators, helpers de API).
- Ao criar ou alterar rotas em `src/app/api/**`.
- Ao corrigir bugs (preferir teste reproduzindo o bug antes da correção).
- Ao refactorar lógica com risco de regressão.
- Quando métricas de cobertura forem altas mas a **ligações com RN** estiver fracas ou houver **falso positivo** (teste que passa sem garantir o comportamento esperado).

## Stack

No repositório **nosso-tbr**, usar **Vitest** + `@testing-library/react` onde aplicável (`vi.mock`, `describe`/`it`, mocks de cliente Supabase com `vi.doMock`). Não prescreva `jest`/`ts-jest` salvo projeto legítimo apenas com Jest.

## Estado de mocks do App Router (Vitest setup)

Em nosso-tbr:

- **`vitest.setup.ts`**: mocks de **`next/navigation`** (`useRouter`, `usePathname`, `useSearchParams`, `useParams`), **`next/headers.cookies`** (evita import real de headers junto com `vi.resetModules` em route handlers) e reset por teste das implementações dos hooks.
- **`@/test`**: importe `nextNavigationTestState.router.push` para assert de navegação; use **`presetNextNavigationShelvesList()`** e **`presetNextNavigationBookshelfDetail(id)`** em `beforeEach` quando páginas de estantes dependerem de pathname/param.

Evite novo `vi.mock("next/navigation", …)` em cada arquivo só para definir pathname/params, salvo cenários especiais ou substituição total do mock.

## Second Brain (regras do projeto)

Nome da pasta Obsidian do projeto = nome da pasta raiz do repo (ex.: `nosso-tbr`).

1. **Antes**: Consultar `C:\www\second_brain\01-Projetos\[NOME_DO_PROJETO]` — especialmente `business-rules.md`. Alinhar casos aos identificadores **RN*** e às políticas/API descritas.
2. **Depois**: Se os testes documentarem invariantes ou contratos não escritos no vault, atualizar **`business-rules.md`** (ou arquivo de feature relacionado na mesma pasta do projeto).

## Avaliação de testes existentes

Use esta checklist sempre que avaliar cobertura ou PR de testes.

1. **Mapeamento RN**: Para cada arquivo de fonte ou de teste citado, indique qual **RN*** do `business-rules.md` o teste deveria proteger. Se só houver smoke de JSX (layout + cliente mockado de ponta a ponta), a nota de alinhamento com RN tende a ser baixa mesmo com 100 % de cobertura de linhas.
2. **Falso positivo**: Pontue baixo quando o mock substitui o alvo inteiro sem assert de contrato — ex.: página que só monta um stub `data-testid` e garante que o default export foi “chamado”; isso pode passar com integração quebrada.
3. **Ramos críticos**: Para utilitários compartilhados (`requireUser`, validadores, `canUserParticipateInBook`), exigir casos diretos cobrindo sucesso **e** cada ramo de falha (`401`/403/`400`/503 conforme especificação), não apenas cobertura indireta via uma rota.
4. **Isolamento**: Nunca depender de Supabase ou disco; mockar cliente e tempo quando necessário.
5. **Nota 0–10**: Avaliar só o **valor defensável contra regressão nas RNs tocadas**. Separar opcionalmente “qualidade técnica do isolated unit” × “valor de RN” quando útil ao revisor humano.

## Geração de testes unitários

### Função pura

```typescript
export const add = (a: number, b: number) => a + b;
```

```typescript
import { add } from "./module";

describe("add", () => {
  it("retorna soma de dois números positivos", () => {
    expect(add(2, 3)).toBe(5);
  });
});
```

### Dependências mockadas (`vi.mock`)

```typescript
import { describe, expect, it, vi } from "vitest";

vi.mock("./db", () => ({ findUser: vi.fn() }));

import { findUser } from "./db";
import { getUser } from "./userService";

describe("getUser", () => {
  it("retorna usuário quando o DB resolve", async () => {
    vi.mocked(findUser).mockResolvedValue({ id: 1, name: "Alice" });
    await expect(getUser(1)).resolves.toEqual({ id: 1, name: "Alice" });
    expect(findUser).toHaveBeenCalledWith(1);
  });
});
```

### Async e erros

```typescript
it("propaga erro quando a API falha", async () => {
  api.getData.mockRejectedValue(new Error("Network error"));
  await expect(fetchData()).rejects.toThrow("Network error");
});
```

### Rotas dinâmicas (Next Route Handlers)

Quando middleware ou `createClient` importados no topo atrapalham o mock, usar `vi.resetModules()` + `vi.doMock` antes de `import("./route")` no corpo do teste (como em `route.test.ts` das rotas `/api/auth/register` e `/api/books`).

Para mutações em `books` e afins, aplicar também a subseção **Prioridade explícita** acima: participação (**RN42**), sessão (**RN20** / **RN48**), cadeia mockada (`from` / `select` / `eq`) e formato do JSON de resposta — não apenas `expect(status).toBe(...)`.

## Execução e cobertura

```bash
npm test -- --coverage
```

**Uso da cobertura:** interpretar o relatório junto com o **mapeamento RN** (seção **Avaliação de testes existentes**). Cobertura alta com nota baixa de aderência às RN continua insuficiente; cobertura menor com asserts de contrato e matriz de participação costuma valer mais que 100 % de linhas com falso positivo.

## Restrições

- **Sem I/O real**: BD, arquivo, rede externa.
- **Velocidade**: Preferir centenas de testes rápidos; evitar timeouts longos sem necessidade.
- **Nomes**: `describe`/`it` em linguagem de comportamento (ex.: `retorna 403 quando invite não confere o segredo`).

## Resultado esperado

Suites que (1) documentam **contratos e decisões de domínio** alinhados às **RN** do Second Brain, **não só linhas tocadas**, (2) evitam mocks que escondem o comportamento sob teste, (3) permitem refactor com regressões detectáveis antes do deploy, e (4) deixam claro **qual RN ou contrato** cada bloco protege (nomes de `describe`/`it` ou estrutura do arquivo).
