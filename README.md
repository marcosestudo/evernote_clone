Para rodar o projeto e instalar as dependências deve ter instalado o Node, o NPM e o MongoDB

Instalando dependencias da API:
  Como tem dependências descontinuadas que podem gerar erros na instalação no Windows
  No Windows, na pasta javascript_note_api use o comando no terminal:
  ```
  npm install --legacy-peer-deps
  ```  
  No Linux use o comando:  
  ``` 
  npm install
  ```

Intalando dpendências do app:
  Na pasta javascript_note use o comando no terminal:   
  ```
  npm install
  ```



Iniciando API:
  Em um terminal, na pasta javascript_note_api use o comando:  
  ```
  npm start
  ```
  No linux, pode ser necessário iniciar o MongoDB antes de startar a API, para isso, use o comando:
  ```
  sudo service mongod start
  ```

Iniciando a aplicação:
  Em outro terminal, na pasta javascript_note use o comando:
  ```
  npm start
  ```


  
Visualize o app rodando no navegador em localost:3000



### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [React](https://pt-br.reactjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/pt-br/)
- [Mongoose](https://mongoosejs.com/)
- [Nodejs](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)