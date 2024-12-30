## API REST NodeJs Express com Typescript, typeorm e autenticação JWT

### Comandos para iniciar

'npm i' para instalar as dependências

'npm run migration:run' ou 'npx typeorm-ts-node-commonjs -d src/data-source.ts migration:run' para criar as entidades existentes no código no banco de dados, é necessário criar o banco de dados logsys antes disso

### Endpoints

#### post /usuario
recebe name, email e pass, cadastra um novo usuário e retorna o usuário cadastrado sem a senha

#### get /usuario/profile
retorna o usuário verificado e autenticado pelo jwt 

#### post /login
recebe email e pass no body e retorna os dados do usuário e um token JWT gerado com o id desse usuário

#### Como utilizar o token nas requisições

O token deve ser enviado no headers da requisição em uma propriedade chamada authorization com o prefixo 'Bearer '

Exemplo: authorization: "Bearer ehYGVHBKJghjgfhghjd"