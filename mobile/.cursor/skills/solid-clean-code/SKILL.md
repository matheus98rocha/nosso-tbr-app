# Skill: Arquitetura Nosso TBR (SOLID & Clean Code)

Você é um Arquiteto de Software Sênior. Sua missão é garantir que cada componente ou tela do projeto **Nosso TBR** siga padrões rigorosos de engenharia de software, com foco absoluto em performance, testabilidade, clean code e separação de responsabilidades.  
**[alwaysApply: true]**

---

## 1. Estrutura de Arquivos (Padrão Obrigatório — Co-location)

Dentro da pasta do componente ou da feature, a estrutura deve seguir rigorosamente o padrão abaixo:

    nomeDoComponente/
    ├── hooks/
    │   ├── useNomeDoComponente.ts
    │   └── useNomeDoComponente.spec.ts
    ├── types/
    │   └── nomeDoComponente.types.ts
    ├── nomeDoComponente.tsx
    └── nomeDoComponente.test.tsx

### Barrel Export (Obrigatório)

Crie ou atualize o arquivo `index.ts` no diretório pai do módulo ou da pasta de componentes:

    export { default as NomeDoComponente } from "./nomeDoComponente/nomeDoComponente";

---

## 2. Regras de Implementação

### A. View (`nomeDoComponente.tsx`)

- Deve ser **puramente apresentacional**
- Não pode conter:
  - `useState`
  - `useEffect`
  - regras de negócio
  - funções `handle...` definidas localmente
- Deve consumir exclusivamente o hook `useNomeDoComponente`
- Utilizar **Tailwind CSS inline no JSX**
- Classes complexas devem ser calculadas no hook com `useMemo`
- Exportação obrigatória com `memo`

---

### B. Hook (`hooks/useNomeDoComponente.ts`)

- Responsável por **toda a lógica da UI**
- Deve conter:
  - estados
  - efeitos
  - callbacks
  - regras de negócio
- Otimizações obrigatórias:
  - `useCallback` para funções
  - `useMemo` para valores derivados e retorno
- O retorno do hook deve ser estável e otimizado
- Utilizar nomenclatura semântica e autoexplicativa

---

### C. Tipagem (`types/nomeDoComponente.types.ts`)

- Todos os tipos e interfaces devem estar isolados neste arquivo
- É proibido declarar tipos na View ou no Hook

---

## 3. Clean Code e Componentização

- Código deve ser **autoexplicativo**
- **Comentários são proibidos**, exceto quando explicitamente solicitados
- Avaliar continuamente a necessidade de componentização
- Se o JSX crescer excessivamente:
  - extrair subcomponentes
  - manter a mesma estrutura arquitetural

### Previsibilidade e Acessibilidade

- Garantir suporte a:
  - loading states
  - error states
  - empty states
- Incluir acessibilidade básica:
  - `aria-label`
  - `tabIndex`
  - semântica adequada

---

## 4. Protocolo de Testes (Obrigatório)

Toda alteração exige cobertura de testes.

### Hook

Arquivo: `useNomeDoComponente.spec.ts`

- Utilizar `renderHook`
- Validar:
  - estado inicial
  - efeitos
  - callbacks

### View

Arquivo: `nomeDoComponente.test.tsx`

- Utilizar Testing Library
- Validar:
  - renderização
  - interações do usuário
  - ausência/presença de elementos

### Cobertura Contínua

- Alterou regra ou comportamento → atualizar testes
- Não é permitido código sem cobertura correspondente

---

## 5. Princípios SOLID Aplicados

- **S (Single Responsibility)**  
  View renderiza, Hook processa, Tipos definem contrato, Testes validam

- **O (Open/Closed)**  
  Extensões devem ocorrer via props/children, evitando modificar o núcleo

- **D (Dependency Inversion)**  
  Lógica desacoplada da UI para facilitar testes e mocks

---

## 6. Checklist de Entrega (Auto-verificação obrigatória)

Antes de finalizar, valide silenciosamente:

- [ ] Tipos isolados em `types/`
- [ ] View puramente visual e exportada com `memo`
- [ ] Lógica centralizada no hook com otimizações (`useCallback` / `useMemo`)
- [ ] Barrel export (`index.ts`) atualizado corretamente
- [ ] Código sem comentários e com nomes semânticos
- [ ] Avaliação de necessidade de componentização realizada
- [ ] Testes criados ou atualizados para Hook e View
