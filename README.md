# Como rodar o projeto

Este projeto é construído usando PHP, JavaScript (React e TypeScript), e gerenciadores de pacotes Composer e Yarn.

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado:

- PHP
- Composer
- Node.js
- Yarn ou npm

## Passos para rodar o projeto

1. **Clone o repositório**

   Primeiro, você precisa clonar o repositório para sua máquina local. Você pode fazer isso usando o seguinte comando:

   ```bash
    git clone https://github.com/gilmarodp/itarget-test.git
   
2. **Instale as dependências do PHP**

   Navegue até o diretório do projeto e instale as dependências do PHP usando o Composer:

   ```bash
   cd backend
   ```
   ```bash
   composer install
   ```
   
3. **Instale as dependências do JavaScript**

   Navegue até o diretório do projeto e instale as dependências do JavaScript usando o Yarn:

   ```bash
   cd frontend
   ```
   ```bash
   yarn install
   ```
   
4. **Inicie o servidor PHP**

   Navegue até o diretório do projeto e inicie o servidor PHP:

   ```bash
   cd backend
   ```
   ```bash
   cp .env.example .env
   ```
   ```bash
   php artisan key:generate
   ```
   ```bash
   php artisan serve
   ```
   
5. **Inicie o servidor React**

   Navegue até o diretório do projeto e inicie o servidor React:

   ```bash
   cd frontend
   ```
   ```bash
   yarn dev
   ```
   
## Ajustando o arquivo .env

1. **Crie um arquivo .env**
    Você também deve criar um arquivo .env no diretório frontend e adicionar a variável de ambiente NEXT_PUBLIC_BACKEND_URL:

    ```bash
    cd frontend
    ```
    ```bash
    echo "NEXT_PUBLIC_BACKEND_URL=http://localhost:8000" >> .env.local
    ```

   
2. **Configure o arquivo .env**

   Abra o arquivo .env e configure as variáveis de ambiente:

    ```bash
    FRONTEND_URL=http://localhost:3000

    DB_CONNECTION=mysql
    DB_HOST=localhost
    DB_PORT=3306
    DB_DATABASE=itarget_test
    DB_USERNAME=root
    DB_PASSWORD=root
    ```
   
3. **Crie o banco de dados**

   Crie um banco de dados chamado `itarget_test` no MySQL.

4. **Execute as migrações**

   Execute as migrações para criar as tabelas no banco de dados:

   ```bash
   php artisan optimize
   ```
   ```bash
   php artisan migrate
   ```
   
5. **Execute o seeder**

   Execute o seeder para popular a tabela de usuários:

   ```bash
   php artisan db:seed
   ```
   
6. **Acesse o projeto**

    Acesse o projeto no navegador:
    
    [http://localhost:3000](http://localhost:3000)

    Dados de acesso:

    **E-mail:** test@example.com

    **Senha:** password


## Testes

Para rodar os testes, execute o seguinte comando:

```bash
cd backend
```
```bash
php artisan test
```


## Conclusão
Pronto! Agora você pode acessar o projeto e testar as funcionalidades.