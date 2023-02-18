Criação da API JAVASCRIPT_NOTE_API:
  Express generator:
  https://www.npmjs.com/package/express-generator
  >>> npm install express-generator
  Nossa api não terá views
  >>> express --view=no-view javascript_note_api // javascript_note_api == nome do projeto
  Indo pra pasta do projeto criada pelo comando acima
  >>> cd javascript_note_api
  Instalando dependências do projeto 
  >>> npm install
  Para iniciar o server pra testar antes de instalar o nodemon
  >>> npm start
  Em routes/index "res.render('index', { title: 'Express' });" foi trocado por "res.json({"message": "Hello"});" pro teste
  A primeira opção dava erro dizendo que não foi especificada engine, não especificamos porque não teremos views na api

  Limpando o projeto:
  Não teremos views na api, podemos apagar a pasta views
  Em app.js podemos apagar o cookieParser e o indexRouter
  Na pasta routes podemos apagar index.js
  Foi criada a pasta app e routes foi movida pra dentro dela e em app.js 

  Instalando o nodemon na pasta da api
  >>> npm i nodemon --save

  Instalando o mongoose
  >>> npm i mongoose --save
  criamos a pasta config o o arquivo database.js pra configurar o banco de dados

  Criamos os models na pasta app

  Instalando bcript
  >>> npm i bcrypt --save
  Converte a senha em hash pra guardar no banco de dados
  Quando o usuário faz login, sua senha é convertida e comparada com o hash no banco de dados
  O bcrypt foi importado no userModel 
  O mongoose nos permite executar scrpts antes ou depois de fazer operações no banco de dados
  Criamos uma função no model pra converter a senha no userSchema.pre()

  Autenticação do usuário
  Criamos uma função pra converter e verificar se o password passado no login bate com o hash que está no banco de dados no model do user 
  Instalamos o jwt
  >>> npm i jsonwebtoken --save
  O jwt cria um token a partir do email, senha e uma chave que temos na nossa aplicação
  A nossa chave será uma variável de ambiente através do arquivo .env que criaremos e não devemos subir por github

  Intalamos o pacote dotenv para usarmos a variável de ambiente como chave
  >>> npm i dotenv --save
  Criamos o arquivo .env
  No arquivo usamos uma string aleatória no JWT_TOKEN para que o jwt gere nosso token
  A string aleatória foi criada num gerador de senhas
  Poderemos pegar as informaçõe do arquivo .env atravé da chamada processenv.jwttoken

  Criaremos um middleware pra verificar o token do usuário
  Criamos a pasta middleares na pasta app e o arquivo auth.js para o middleware de autenticação

  Criamos o arquivo notes em routes

  Passos para a criação do usuário e das notas:
    a rota de login retorna o token
    o middleware withAuth() checa se o token que é passado no header na rota de criação da nota bate com o secret
    se bater, o middleware usa o email criptografado do token pra atribuir um user ao body da requisição de criação da nota que será usado para atribuir um autor à ela no new Note()

  Liberando o cors:
  Um script que faz uma chamada em uma url externa só pode acessar recursos do próprio domínio, "um site só pode chamar recursos que estejam naquele mesmo site"
  ex: um js do facebook só pode acessar o próprio facebook
  Isso é uma política de segurança dos browsers
  o cors (cross-origin resource sharing) permite que de uma página acessemos recursos de outra se no seu header tiver uma resposta permitindo o acesso
  vamos liberar essas chamadas na nossa api, pois teremos 2 sites, o client feito com react e a api feita com node
  instalando o pacote / a biblioteca cors
  >>> npm i cors --save 
  cors foi importado e usado como um middleware em app.js
  o nosso midleware está aceitando chamadas de qualquer site, buscar configuralções para maior segurança

Criação do REACT APP JAVASCRIPT NOTE:
  Geramos o projeto com o create react app
  >>> npx create-react-app javascript_note

  Instalamos o react router dom
  >>> npm i react-router-dom --save

  Instalamos o axios
  Biblioteca usada pra fazer chamadas web, o professor disse que com o axios fica mais organizado do que com o fetch (biblioteca nativa)
  >>> npm i axios --save

  Instalamos o node sass
  >>> np install node-sass --save
  O browser não reconhece nativamente o scss, essa lib converte pra css 

  Instalamos o bulma
  >>> npm i bulma --save

  Instalamos o framework rbx para usarmos os componentes do bulma no react sem usar as classes do bulma // buscar opções do bootstrap e tailwind
  >>> npm i rbx --save
  tivemos um conflito na instalação do rbx, tivemos que forçar a instalação
  >>> npm i rbx --save --force

  Instalamos o moment para formatar datas
  >>> npm i moment --save
  O rbx deu conflito com o moment, tivemos que forçar de novo 
  Obs: Evite usa o rbx que está meio ultrapassado, foi usado aqui só pra seguir as aulas, use o Bulma sem o rbx ou o Bootstrap ou o Tailwind
  >>> npm i moment --save --force

  Instalamos o font awesome, também teve conflito com o rbx
  >>> npm i @fortawesome/fontawesome-svg-core --save
  >>> npm i @fortawesome/free-solid-svg-icons --save
  >>> npm i @fortawesome/react-fontawesome --save

  Estrutra do projeto
  Criamos as pastas src/assets, src/assets/images, src/components, src/screens (alguns prferem chamar essa pasta de pages), src/styles,
  Criamos os arquivos src/styles/_custom_colors.scss
  Renomeamos o arquivo src/app.css para src/app.scss
  Reescrevemos os arquivos src/app.scss e src/index.css
  A partir daqui fomos criando as pastas pros components e screens, arquivo de rotas...

  Conectando à api
  O professor disse prferir cirar uma pasta src/services com os js com as chamadas da api ao invéz de usar hooks diretamente
  Buscar como fazer com hooks useEvent ou algum mais adequado

  Configuramos o Axios em src/services/api.js
  Axios é uma alternativa pro fetch (biblioteca nativa js)
  A baseURL da api foi configurada para a porta 3001 porque o app etsará rodando na port 3000
  Podemos iniciar a api na porta 3001 como nodemon usando >>> PORT=3001 nodemon start ou mudar a configuração do server da api no listen ou, como foi feito
  setar a porta na variável de ambiente .env 
  Também podemos mudar a porta do reactapp com o arquivo .env
  

  Side bar
  Fizemos a sidebar usando a biblioteca react-burger-menu
  >>> npm i react-burger-menu --save

  React quill
  Biblioteca para edição de texto ritch text
  >>> npm i react-quill --save