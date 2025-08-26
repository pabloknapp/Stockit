<div>
<img src="https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=for-the-badge" />
<img src="https://img.shields.io/badge/Tailwind_CSS-grey?style=for-the-badge&logo=tailwind-css&logoColor=38B2AC" />
</div>

# Stockit - Projeto Integrador - Sistema de gestão de estoque.


- [ **BIBLIOTECAS INSTALADAS**: react-hook-form, react-router-dom, sweetalert2, json-server, jspdf e Tailwindcss]

## Como rodar o projeto

Instalar dependências
```bash
npm i
```

Iniciar o projeto
```bash
npm run dev
```

Iniciar API fake (Em outro terminal)
```bash
cd .\Stockit-API\

npx json-server db.json
```

---

## 🧠 Git – Guia rápido

## 1. Clonar o repositório

```bash
git clone https://github.com/pabloknapp/Stockit

cd Stockit
```


## 2. Criar e Alternar Branch

Criar uma nova branch e alternar para ela:

```bash
git checkout -b nome-da-branch
```

Mudar para uma branch já existente:

```bash
git checkout nome-da-branch
```


## 3. Adicionar Arquivos

Adicionar um arquivo específico:

```bash
git add arquivo.txt
```

Adicionar todos os arquivos modificados:

```bash
git add .
```

## 4. Verificar o Status

```bash
git status
```

## 5. Commitar Alterações

```bash
git commit -m "Breve descrição do que foi feito"
```

## 6. Enviar Alterações

Enviar sua branch com as alterações para o repositório remoto:

```bash
git push origin nome-da-branch
```

## 7. Atualizar com a Branch Principal

Atualizar sua branch com a branch `main` (ou `master`):

```bash
git checkout main
git pull origin main
git checkout nome-da-branch
git merge main
```

## 8. Resolver Conflitos

1. Edite os arquivos marcados com conflitos (`<<<<<<<`, `=======`, `>>>>>>>`).
2. Após resolver:

```bash
git add arquivo-com-conflito
git commit -m "Resolve conflito"
```

## 9. Mesclar sua Branch na `main`

Via terminal:

```bash
git checkout main
git pull origin main
git merge nome-da-branch
git push origin main
```

Ou crie um **Pull Request (PR)** na interface do GitHub/GitLab para revisão.

## 10. Descartar Alterações (CUIDADO ⚠)

Desfazer mudanças em um arquivo específico:

```bash
git checkout -- arquivo.txt
```

Resetar tudo para o último commit (perde as alterações locais!):

```bash
git reset --hard
```

---

### ✅ Dicas Finais

- Sempre escreva mensagens de commit descritivas e objetivas.
- Evite fazer commits diretamente na `main`.
- Atualize sua branch com frequência para evitar conflitos grandes.

---

🛠️ *Mantenha essa colinha por perto enquanto trabalha com Git. Ela pode salvar seu dia!*


# Contribuidores

<a href="https://github.com/wagnerloch"><img src="https://github.com/wagnerloch.png" width="45" height="45"></a> &nbsp;