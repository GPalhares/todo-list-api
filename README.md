# Todo List - Backend 🚀

Este repositório contém o **backend** da aplicação de To-Do List, desenvolvido para a vaga de desenvolvedor Fullstack na empresa DeMaria. A aplicação foi construída utilizando **NestJS** e outras tecnologias modernas para garantir segurança, performance e escalabilidade.

## Como Rodar o Projeto 💻

1. **Clone o Repositório** 🖥️:

   Para começar, clone o repositório do GitHub com o seguinte comando:

   ```bash
   git clone git@github.com:GPalhares/todo-list-api.git
   ```

2. **Acesse a Pasta do Projeto** 📂:

   Após clonar o repositório, entre na pasta do projeto com o comando:

   ```bash
   cd todo-list-api
   ```

3. **Suba o Docker em Segundo Plano** 🐳:

   Agora, utilize o Docker para rodar a aplicação em segundo plano. Para isso, execute o seguinte comando:

   ```bash
   docker compose up -d
   ```

4. **Acesse a API** 🌐:

   Após iniciar o servidor, você pode acessar a API no seguinte endpoint:

   ```
   http://localhost:3000/
   ```

## Funcionalidades 🔑

1. **Autenticação JWT**
2. **Gestão de Usuários e Tarefas**
3. **Sistema de Admin**
4. **Soft Delete**
5. **Dockerização do Projeto**

### ⚠️ Atenção:

- O arquivo **.env** foi incluído para facilitar a execução do projeto, pois tanto o banco de dados quanto a API estão dockerizados e serão iniciados automaticamente. **Não é recomendado deixar o .env público em produção.**
- A API gera automaticamente um usuário administrador (**userType 2**) quando o Docker é iniciado. **Essa prática não é recomendada em produção; o ideal seria utilizar uma migration para criação de usuários.**
  - **E-mail:** admin@demaria.com
  - **Senha:** demaria

## Ferramentas e Bibliotecas Utilizadas ⚙️

1. **NestJS** 🌐:

   - Framework TypeScript para desenvolvimento backend modular e escalável.

2. **TypeORM** 📝:

   - ORM para manipulação do banco de dados PostgreSQL de maneira intuitiva.

3. **PostgreSQL** 📂:

   - Banco de dados relacional robusto e eficiente.

4. **JWT (JSON Web Token)** 🔒:

   - Utilizado para autenticação segura dos usuários.

5. **BCrypt** 🛡️:

   - Biblioteca para criptografar senhas de usuários antes de armazená-las no banco de dados.

6. **Docker** 🐳:
   - Utilizado para garantir um ambiente padronizado para desenvolvimento e produção.

## Decisões Técnicas 💡

1. **Arquitetura Modular** 🏰:

   - Separação organizada entre **módulos**, **serviços** e **controladores**, facilitando manutenção e escalabilidade.

2. **Autenticação Segura com JWT** 🔐:

   - Todas as rotas protegidas exigem um **token JWT válido**, garantindo segurança no acesso aos recursos.

3. **BCrypt para Criptografia de Senhas** 🔑:

   - Todas as senhas são criptografadas antes de serem armazenadas, evitando exposição de dados sensíveis.

4. **Uso de DTOs (Data Transfer Objects)** 📦:

   - Validação de dados antes do processamento, garantindo integridade e segurança nas requisições.

5. **Sistema de Admin para Gerenciamento de Usuários** 💼:

   - O administrador pode visualizar e gerenciar todos os usuários do sistema.

6. **Soft Delete de Usuários** 🛠️:

   - Os usuários não são excluídos permanentemente, permitindo recuperação futura caso necessário.

7. **Auth Guards para Requests Restritos** 🗓️:

   - Implementação de **guards** para garantir que apenas usuários autorizados acessem determinadas rotas.

8. **Validação de Dados com Class Validator** ✅:

   - Validação rigorosa de entradas antes do processamento, prevenindo dados inválidos ou maliciosos.

9. **Padrão Repository com TypeORM** 📚:

   - Melhor organização e controle sobre operações no banco de dados.

10. **Uso de UUIDs ao invés de IDs Numéricos** 🔖:

- O uso de **UUIDs** evita previsibilidade nos identificadores e melhora a segurança, especialmente em ambientes distribuídos.

## Endpoints Auth 🚀

| Método | Rota           | Descrição                                    |
| ------ | -------------- | -------------------------------------------- |
| POST   | /auth/register | Cria um novo usuário no sistema.             |
| POST   | /auth/login    | Autentica um usuário e retorna um token JWT. |

## Endpoints Tasks 🚀

| Método | Rota        | Descrição                                      |
| ------ | ----------- | ---------------------------------------------- |
| GET    | /tasks/user | Lista todas as tarefas do usuário logado.      |
| POST   | /tasks      | Cria uma nova tarefa para o usuário logado.    |
| PATCH  | /tasks/:id  | Atualiza os detalhes de uma tarefa específica. |
| DELETE | /tasks/:id  | Remove uma tarefa do usuário logado.           |

## Endpoints Users 🚀

| Método | Rota                  | Descrição                                              |
| ------ | --------------------- | ------------------------------------------------------ |
| POST   | /users                | Registra um novo usuário (usado pelo auth).            |
| GET    | /users                | Lista todos os usuários (apenas admin).                |
| GET    | /users/me             | Retorna os dados do usuário logado.                    |
| PATCH  | /users/me             | Atualiza os dados do usuário logado.                   |
| PATCH  | /users/softdelete/:id | Desativa um usuário sem removê-lo do banco (admin).    |
| PATCH  | /users/restore/:id    | Restaura um usuário que foi desativado (apenas admin). |

---

Se você leu até aqui, muito obrigado! 🙏 Agradeço também à DeMaria pela oportunidade de desenvolver este projeto como parte do processo seletivo. Foi uma experiência incrível e enriquecedora! 🚀
