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

3. **Gerando chave da aplicação**
   ```bash
   cp .env.example .env
   ```
   ```bash
   php artisan key:generate
   ```

3. **Iniciando o Laravel Sail**
   ```bash
   ./vendor/bin/sail up -d
   ```
   
5. **Crie um arquivo .env**
    Você também deve criar um arquivo .env no diretório frontend e adicionar a variável de ambiente NEXT_PUBLIC_BACKEND_URL:

    ```bash
    echo "NEXT_PUBLIC_BACKEND_URL=http://localhost:80" >> ../frontend/.env.local
    ```
   
## Ajustando o arquivo .env

1. **Configure o arquivo .env**

   Abra o arquivo .env e configure as variáveis de ambiente:

    ```bash
    FRONTEND_URL=http://localhost:3000

    DB_CONNECTION=mysql
    DB_HOST=mysql
    DB_PORT=3306
    DB_DATABASE=itarget_test
    DB_USERNAME=sail
    DB_PASSWORD=password
    ```
   
3. **Crie o banco de dados**

   O próprio laravel sail vai criar para você o banco `itarget_test`.

4. **Execute as migrações**

   Execute as migrações para criar as tabelas no banco de dados:

   ```bash
   ./vendor/bin/sail artisan optimize
   ```
   ```bash
   ./vendor/bin/sail artisan migrate
   ```

   **OBS:** Caso ocorra um erro falando que não
   tem permissão para criar o diretório `backend/storage/logs`, basta você mesmo criar usando o comando:

   ```bash
   mkdir -p storage/logs
   ```

   Depois, é só tentar rodar novamente:

   ```bash
   ./vendor/bin/sail artisan optimize
   ```
   ```bash
   ./vendor/bin/sail artisan migrate
   ```
   
5. **Execute o seeder**

   Execute o seeder para popular a tabela de usuários:

   ```bash
   ./vendor/bin/sail artisan db:seed
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
./vendor/bin/sail artisan test
```


## Conclusão
Pronto! Agora você pode acessar o projeto e testar as funcionalidades.

Se quiser parar o container, basta usar o seguinte comando:

   ```bash
   ./vendor/bin/sail down
   ````
