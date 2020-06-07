# REST API do Ecoleta

Esta aplicação tem como objetivo armazenar os dados de pontos e itens de coleta de resíduos, e servir estas informações aos clientes que desejem consumí-la. É uma API livre, sem a necessidade de autenticação para acessá-la.

## Endpoints

A API disponibiliza certas rotas para criação e obtenção de dados:

### Items

#### GET

**'/items':** Retorna todos os itens cadastrados na aplicação.

- **Parâmetros:** Nenhum
- **Retorno:** Um vetor de objetos. Cada objeto tem o seguinte formato:
```
  {
    id: INT - Identificador do item
    title: STRING - O nome do item
    image: STRING - O nome da imagem
    image_url: STRING - URL de acesso a imagem no servidor
  }
```

### Points

#### GET

**'/points':** Retorna todos os pontos cadastrados na aplicação. Requer três filtros.

- **Parâmetros:** Cidade, estado e itens que o ponto coleta, no seguinte formato:
```
  {
    city: STRING - A cidade onde o ponto se localiza
    uf: STRING - Sua Unidade Federativa/Estado
    items: STRING - Uma string contendo os IDs dos itens que o ponto coleta, separados por vírgula. Ex: "1,2,4"
  }
```
- **Retorno:** Um vetor de objetos. Cada objeto tem o seguinte formato:
```
  {
    id: INT - Identificador do ponto
    name: STRING - O nome do ponto de coleta
    image: STRING - O nome da imagem
    image_url: STRING - URL de acesso a imagem no servidor
    email: STRING - E-mail cadastrado do ponto de coleta
    whatsapp: STRING - Número do whatsapp do ponto de coleta
    city: STRING - A cidade onde o ponto se localiza
    uf: STRING - Sua Unidade Federativa/Estado
    latitude: LONG FLOAT - A latitude do ponto em coordenadas geográficas
    longitude: LONG FLOAT - A longitude do ponto em coordenadas geográficas
  }
```

**'/points/:id':** Retorna todos os dados de um único ponto cadastrado com o id ID.

- **Parâmetros:** O ID do ponto de coleta.
- **Retorno:** Um objeto no seguinte formato:
```
  {
    id: INT - Identificador do ponto
    name: STRING - O nome do ponto de coleta
    image: STRING - O nome da imagem
    image_url: STRING - URL de acesso a imagem no servidor
    email: STRING - E-mail cadastrado do ponto de coleta
    whatsapp: STRING - Número do whatsapp do ponto de coleta
    city: STRING - A cidade onde o ponto se localiza
    uf: STRING - Sua Unidade Federativa/Estado
    latitude: LONG FLOAT - A latitude do ponto em coordenadas geográficas
    longitude: LONG FLOAT - A longitude do ponto em coordenadas geográficas
    items: STRING[] - Um vetor de STRINGS, contendo os ids de cada item que o ponto coleta
  }
```

#### POST

**'/points':** Cria um novo ponto de coleta.

- **Parâmetros:** As informações do ponto a ser criado:
```
  {
    name: STRING - O nome do ponto de coleta
    image: FILE - A imagem que será salva no servidor
    email: STRING - E-mail cadastrado do ponto de coleta
    whatsapp: STRING - Número do whatsapp do ponto de coleta
    city: STRING - A cidade onde o ponto se localiza.
    uf: STRING - Sua Unidade Federativa/Estado
    latitude: LONG FLOAT - A latitude do ponto em coordenadas geográficas
    longitude: LONG FLOAT - A longitude do ponto em coordenadas geográficas
    items: STRING - Uma string contendo os IDs dos itens que o ponto coleta, separados por vírgula. Ex: "1,2,4"
  }
```
- **Retorno:** O objeto que acabou de ser cadastrado, no seguinte formato:
```
  {
    id: INT - Identificador do ponto
    name: STRING - O nome do ponto de coleta
    image: STRING - O nome da imagem
    image_url: STRING - URL de acesso a imagem no servidor
    email: STRING - E-mail cadastrado do ponto de coleta
    whatsapp: STRING - Número do whatsapp do ponto de coleta
    city: STRING - A cidade onde o ponto se localiza
    uf: STRING - Sua Unidade Federativa/Estado
    latitude: LONG FLOAT - A latitude do ponto em coordenadas geográficas
    longitude: LONG FLOAT - A longitude do ponto em coordenadas geográficas
  }
```


## Variáveis de Ambiente

A aplicação utiliza algumas variáeveis de ambiente para funcionar. Por isso, considere criar um arquivo *.env* com as seguintes informações:

- PORT: A variável que define qual porta o servidor ficará ouvindo. Só deve ser preenchida em ambientes locais, pois em produção o servidor irá configurar esta variável automaticamente na maioria dos casos.
- ADDRESS: O endereço da nossa aplicação na rede. Este é usado na construção das URLs na hora de servir as imagens estáticas salvas no banco de dados. O formato deve ser *'http://localhost:3333'* para teste local ou *'https://meuapp.herokuapp.com'* para ambientes de produção, por exemplo.

## Bibliotecas Utilizadas:

As seguintes bibliotecas foram utilizadas na aplicação:

- **[Express.js](https://expressjs.com/pt-br/):** Express é o *framework* utilizado para construir a aplicação, desde infraestrutura básica como gerenciamento de rotas, até cabeçalhos e *middlewares*.
- **[Cors.js](https://expressjs.com/en/resources/middleware/cors.html):** Este é um *middleware* para express que abstrai as configurações de Cross-Origin Resource Sharing, fazendo com que em vez de mexer diretamente nos cabeçalos das requisições, você possa passar os endereços dos clientes autorizados e deixar o *middleware* fazer seu trabalho.
- **[Knex](http://knexjs.org/):** Um construtor de *queries* SQL para Node.js, o Knex é utilizado para criar e gerenciar o nosso banco de dados relacional.
- **[SQLite](https://www.sqlite.org/index.html):** Uma forma simples e fácil de criar uma base de dados na aplicação, o SQLite permite criar um banco SQL dentro de um pequeno arquivo binário, e gerenciá-lo localmente. Perfeito para aplicações pequenas e/ou de teste, como esta.
- **[Multer](https://www.npmjs.com/package/multer):** Um *middleware* que gerencia envio de arquivos na aplicação. Ele é feito para gerenciar formulários do tipo *multipart/form-data*, mas em geral usamos só para envios de arquivos mesmo.
- **[Celebrate](https://www.npmjs.com/package/celebrate):** Outro *middleware* para Express, o celebrate envelopa a validação do Joi para ser usada diretamente nas requisições da aplicação, garantindo que recebemos os dados que desejamos.
- **[Dotenv](https://www.npmjs.com/package/dotenv):** Biblioteca que permite carregar variáveis de ambiente na nossa aplicação.
