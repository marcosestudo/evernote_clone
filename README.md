# Evernote clone em React

> App clone do Evernote criado para praticar react, mongoDB, nodeJS, html, css e javascript

Para instalar as dependências e rodar o projeto, deve ter instalado o [Node](https://nodejs.org/en/) e o [MongoDB](https://www.mongodb.com/)

## Usando o terminal, siga os passos...
## 1. Clonando o projeto 

```
git clone https://github.com/marcosestudo/evernote_clone.git
```

## 2. Instalando as dependências

Vá para a pasta do app

```
cd evernote_clone\javascript_note
```

Instale as dependências

```
npm install --legacy-peer-deps 
```

Vá para a pasta da API

```
cd ..\javascript_note_api\
```

Instale as dependências

```
npm install
```

## 3. Iniciando a API

No Linux, antes de iniciar a API, será necessário iniciar o Mongo com o seguinte comando, no Windows não será necessário

```
sudo service mongod start
```

Inicie a API

```
npm start
```

## 4. Iniciando o app em um segundo terminal

Deixe o terminal aberto rodando a API e abra um segundo terminal para rodar o app

Navegue até a pasta `javascript_note` e inicie o app

```
npm start
```

## 5. Visualize o app rodando no navegador em [localhost:3000](http://localhost:3000/)

### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [JSX](https://pt-br.reactjs.org/docs/introducing-jsx.html)
- [React](https://pt-br.reactjs.org/)
- [JWT](https://jwt.io/)
- [ReactRouterDom](https://reactrouter.com/en/main)
- [ReactBurgerMenu](https://negomi.github.io/react-burger-menu/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/pt-br/)
- [Mongoose](https://mongoosejs.com/)
- [Node](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
