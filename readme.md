## API REST NodeJs Express com Typescript, typeorm e autenticação JWT

### Comandos para iniciar

'npm i' para instalar as dependências

'npm run migration:run' ou 'npx typeorm-ts-node-commonjs -d src/data-source.ts migration:run' para criar as entidades existentes no código no banco de dados, é necessário criar o banco de dados logsys antes disso e criar um arquivo .env conforme o .env.example

'npm run dev' para iniciar a aplicação em modo desenvolvimento

### Endpoints

#### post /usuario
recebe name, email e pass, cadastra um novo usuário e retorna o usuário cadastrado sem a senha

#### get /usuario/profile
retorna o usuário verificado e autenticado pelo jwt 

#### put /usuario?token&id
Primariamente para alteração de senha, recebe o token de alteração de senha como parâmetro de Query.
A nova senha é passada pelo body e é criptografada antes de ser registrada no banco de dados.

#### post /login
recebe email e pass no body e retorna os dados do usuário e um token JWT gerado com o id desse usuário

#### Como utilizar o token nas requisições

O token deve ser enviado no headers da requisição em uma propriedade chamada authorization com o prefixo 'Bearer '

Exemplo: authorization: "Bearer ehYGVHBKJghjgfhghjd"

#### post /login/changepass
recebe o email pelo corpo e envia um email de recuperação para a conta

Requer a criação de uma conta no mailtrap e a devida configuração de suas credenciais no .env, infelizmente esse método só manda emails para a conta de email usada no mailtrap

<img src="./mailExample.gif" width="640"/>