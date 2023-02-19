<h2> Evernote clone em React</h2>

Para instalar as dependências e rodar o projeto, deve ter instalado o [Node](https://nodejs.org/en/) e o [MongoDB](https://www.mongodb.com/)

<hr>

<h3>Instalando dependencias da API:</h3>
  <p>Na pasta javascript_note_api use o comando no terminal, independentemente do sistema:</p>

  ```
  npm install
  ```

<h3>Intalando dependências do app:</h3>
  <p>Como tem dependências descontinuadas que podem gerar erros na instalação no Windows,</p>
  <p>na pasta javascript_note use o comando no terminal:</p>

  ```
  npm install --legacy-peer-deps
  ```  

  <p>No Linux, como administrador, na pasta javascript_note use o comando:</p>

  ``` 
  npm install
  ```

<hr>

<h3>Iniciando a API:</h3>
  <p>Em um terminal, na pasta javascript_note_api, independentemente do sistema, use o comando:</p>

  ```
  npm start
  ```

  <p>Deve aparecer a mensagem: Conectado ao MongoDB </p>
  <p>No Linux, se não aparecer a mensagem, será necessário iniciar o MongoDB antes de startar a API</p>
  <p>para isso, encerre a api com o atalho ctrl+c e use o comando:</p>
  
  ```
  sudo service mongod start
  ```

  <p>Em seguida, inicie a api com o comando:</p>

  ```
  npm start
  ```

<h3>Iniciando a aplicação:</h3>
  <p>Em outro terminal, na pasta javascript_note, independentemente do sistema, use o comando:</p>

  ```
  npm start
  ```

<hr>
  
- Visualize o app rodando no navegador em [localhost:3000](http://localhost:3000/)

<hr>

### 🛠 Tecnologias

<p>As seguintes ferramentas foram usadas na construção do projeto:</p>

- [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [React](https://pt-br.reactjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/pt-br/)
- [Mongoose](https://mongoosejs.com/)
- [Node](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)