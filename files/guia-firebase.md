# Guia — Configurando o Firebase Authentication (do zero)

> Projeto: telas de **login**, **cadastro** e **painel** (área protegida), com autenticação por e‑mail e senha.

---

## O que é e por que usar

O **Firebase Authentication** é um serviço gratuito do Google que cuida de **cadastro e login** de usuários. Em vez de construirmos um banco de dados de senhas (algo perigoso e trabalhoso de fazer com segurança), nós **delegamos essa parte ao Google**. Nosso código só "pede" para o Firebase: *cadastre este usuário* ou *valide este login* — e o Firebase responde se deu certo ou não.

É exatamente o tipo de decisão de projeto que a disciplina discute: **não reinventar o que já existe pronto e confiável**.

---

## Passo 1 — Acessar o Console do Firebase

1. Entre em **https://console.firebase.google.com**
2. Faça login com uma conta **Google** (a mesma do Gmail serve).

---

## Passo 2 — Criar o projeto

1. Clique em **"Criar um projeto"** (*Create a project*).
2. Dê um nome (ex.: `acesso-seguro-turma`).
3. Na etapa do **Google Analytics**, pode **desativar** — não precisamos dele agora (deixa mais simples).
4. Clique em **Criar projeto** e aguarde.

---

## Passo 3 — Ativar o login por E‑mail/Senha

1. No menu lateral, vá em **Criar (Build) → Authentication**.
2. Clique em **Vamos começar** (*Get started*).
3. Abra a aba **Método de login** (*Sign‑in method*).
4. Clique em **E‑mail/senha**, **ative** a primeira chave e clique em **Salvar**.

> ⚠️ Se você pular este passo, o cadastro vai falhar com o erro `auth/configuration-not-found` (ou `operation-not-allowed`). Este é literalmente o método que o nosso código usa.

---

## Passo 4 — Registrar o app web e pegar a configuração

1. Volte à **Visão geral do projeto** (ícone de casa, no topo do menu).
2. Clique no ícone **`</>`** (Web) para adicionar um app web.
3. Dê um apelido (ex.: `site-acesso`) e clique em **Registrar app**.
   - Não precisa marcar "Firebase Hosting" agora.
4. O Firebase mostrará um bloco de código com um objeto chamado **`firebaseConfig`**, parecido com:

   ```js
   const firebaseConfig = {
     apiKey: "AIza............",
     authDomain: "acesso-seguro-turma.firebaseapp.com",
     projectId: "acesso-seguro-turma",
     storageBucket: "acesso-seguro-turma.appspot.com",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:abc123def456"
   };
   ```

5. **Copie esse objeto** e cole dentro do arquivo **`firebase-config.js`**, substituindo o `firebaseConfig` de exemplo que já está lá.

> 💡 **A `apiKey` não é uma senha secreta.** Ela pode ficar visível no código do navegador — é assim mesmo. A proteção de verdade vem dos **domínios autorizados** e das **regras de segurança** do Firebase, não de esconder a chave.

---

## Passo 5 — Rodar o projeto (ATENÇÃO a este passo!)

O nosso código usa **módulos JavaScript** (`<script type="module">`). Por causa disso:

❌ **NÃO** abra os arquivos dando **duplo clique** (isso abre como `file://` e o navegador **bloqueia** os módulos — as telas ficam em branco ou os botões não funcionam).

✅ **Use um servidor local.** Duas formas fáceis:

- **Live Server (VS Code):** instale a extensão *Live Server*, clique com o botão direito em `index.html` → **Open with Live Server**. Vai abrir em algo como `http://127.0.0.1:5500`.
- **Python:** abra o terminal na pasta do projeto e rode:
  ```
  python -m http.server
  ```
  Depois acesse `http://localhost:8000` no navegador.

> O endereço `localhost` **já vem autorizado** no Firebase por padrão, então funciona de primeira. Esse detalhe — "por que não posso só abrir o arquivo?" — é uma ótima **barreira real de implantação** para discutir em sala.

---

## Passo 6 — Testar o fluxo completo

1. Abra **`index.html`** pelo servidor local (tela de **login**).
2. Clique em **Cadastre‑se** → crie uma conta (e‑mail válido + senha de **6+ caracteres**).
3. Você será levado de volta ao **login**. Entre com o mesmo e‑mail e senha.
4. Vai aparecer o **painel**, mostrando o e‑mail logado.
5. **Recarregue a página** do painel: você continua logado (o Firebase guarda a sessão).
6. Clique em **Sair** → volta ao login. Tente abrir `painel.html` direto: ele te manda de volta ao login. ✔️
7. No **Console do Firebase → Authentication → Users**, veja o usuário que você criou aparecer na lista.

---

## Erros e barreiras comuns (conecta com a ementa)

| Sintoma | Causa provável | Solução |
|---|---|---|
| Telas em branco / botão não faz nada / erro de **CORS** no console | Você abriu como `file://` (duplo clique) | Use **Live Server** ou `python -m http.server` (Passo 5) |
| `auth/configuration-not-found` ou `operation-not-allowed` | Esqueceu de ativar **E‑mail/senha** | Refaça o **Passo 3** |
| `auth/invalid-api-key` | A config foi colada errada/incompleta | Reveja o **Passo 4** (`firebase-config.js`) |
| `auth/weak-password` | Senha com menos de 6 caracteres | Use 6 ou mais caracteres |
| `auth/email-already-in-use` | E‑mail já cadastrado | Faça login em vez de cadastrar |
| Funciona local mas falha ao publicar | Domínio não autorizado | Authentication → **Settings → Authorized domains** → adicionar seu domínio |

---

## Mapa dos arquivos do projeto

| Arquivo | Função |
|---|---|
| `firebase-config.js` | Configuração central (cole aqui a sua config) |
| `mensagens.js` | Traduz os erros do Firebase para português |
| `style.css` | Aparência das telas |
| `index.html` | Tela de **login** (página inicial) |
| `cadastro.html` | Tela de **cadastro** (cria o usuário) |
| `painel.html` | Área **protegida** (só para quem está logado) |

---

*SDK utilizado: Firebase Web v12.15.0 (API modular, via CDN).*
