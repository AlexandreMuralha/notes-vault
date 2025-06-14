---
dg-publish: true
---

## psycopg2 - Exemplo Prático
O exemplo aborda:
-   Criação de uma tabela
-   Inserção de dados
-   Seleção de dados
-   Atualização de dados
-   Exclusão de dados

> Este exemplo pressupõe a criação prévia de uma DB no postgreSQL.

### Criação de uma tabela

```sql
import psycopg2
conexao = psycopg2.connect(database = "AgendaDB", user = "postgres", 
password = "8484", host = "127.0.0.1", port = "5432")
print("Conexão com o Banco de Dados aberta com sucesso!")
cur = conexao.cursor()
cur.execute('''CREATE TABLE Agenda
(ID INT PRIMARY KEY NOT NULL,
Nome TEXT NOT NULL,
Telefone CHAR(12));''')
print("Tabela criada com sucesso!")

conexao.commit()
conexao.close()
```

Depois de o programa ser executado, se tudo funcionar corretamente, aparecerão as mensagens na tela:

```
Conexão com o Banco de Dados feita com Sucesso!
Tabela criada com sucesso!
```

Análise do código:
- L1 → É feita a importação da biblioteca psycopg2.
- L2 → É feita a conexão com o banco de dados. Observe os parâmetros da função “connect”, pois é necessário que você crie um banco no PostgreSQL com usuário e senha, conforme escrito na função.
- L4 → É criado o cursor que vai permitir realizar operações no banco de dados.
- L5 → Executa o comando SQL para criar a tabela “Agenda” com os campos “ID”, “Nome” e “Telefone”.
- L10 → É executada a função “commit” para confirmar a execução das operações SQL.
- L11 → Por fim, é fechada a conexão com o banco de dados.

&emsp;

### Inserção de dados na tabela

O exemplo desse código mostra como inserir um registro em uma tabela a partir do Python usando a biblioteca psycopg2.

```sql
import psycopg2
conexao = psycopg2.connect(database = "AgendaDB", user = "postgres", 
password = "8484", host = "127.0.0.1", port = "5432")
print("Conexão com o Banco de Dados aberta com sucesso!")
cur = conexao.cursor()
cur.execute("""INSERT INTO public."agenda" ("id", "nome", "telefone") 
VALUES (1, 'Pessoa 1', '02199999999')""")
conexao.commit()
print("Inserção realizada com sucesso!")
conexao.close()
```

- L1 a L4 → São realizadas as mesmas operações do exemplo anterior: Importação da biblioteca “psycopg2”, abrir a conexão com o banco de dados “postgres” e impressão da mensagem “Conexão aberta com sucesso!”.
- L5 → É executado o comando SQL para inserir dados na tabela AGENDA.
No caso, o registro é formado pelos seguintes dados: O campo “id” recebe o valor 1, o campo “nome” recebe o valor ‘Pessoa 1’ e, por fim, o campo “telefone” recebe o valor ‘02199999999’.

> **Essa linha tem mais algumas questões que merecem destaque: O uso de aspas simples e duplas.** No caso do banco de dados PostgreSQL, o nome da tabela e dos campos deve estar entre aspas duplas, por causa disso é que o comando insert possui três aspas duplas logo no início e no final. **Sendo assim, muita atenção com isso, pois existem algumas variações conforme o sistema gerenciador de banco de dados escolhido.**

- L6 a L8 → Do mesmo modo como foi realizado no exemplo de criação da tabela “Agenda”, são realizadas as seguintes operações: “commit” das operações do banco de dados, fechamento da conexão com o banco de dados, impressão na linha de comando da mensagem “Inserção realizada com sucesso!”.

&emsp;

### Seleção de dados na tabela

Antes de descrever o exemplo de seleção de dados, já podemos perceber algo em comum em todas as operações dos códigos para trabalhar com banco de dados no início do código:
- Importação da biblioteca “psycopg2”.
- Abertura da conexão com o banco de dados “**postgres**”.

E no final do código:
- “Commit” das operações realizadas no banco de dados para confirmar a execução delas. Esse comando é **obrigatório**.
- Fechamento da conexão com o banco de dados.

Agora, vamos analisar o código que mostra como selecionar um registro em uma tabela a partir da biblioteca psycopg2 do Python.

```sql
import psycopg2
conexao = psycopg2.connect(database = "AgendaDB", user = "postgres", 
password = "8484", host = "127.0.0.1", port = "5432")
print("Conexão com o Banco de Dados aberta com sucesso!")
cur = conexao.cursor()
cur.execute("""SELECT * from public."agenda" where "id" = 1""")
registro = cur.fetchone()
print(registro)
conexao.commit()
print("Seleção realizada com sucesso!")
conexao.close()
```

Depois de colocar o programa para executar, se tudo funcionar corretamente, aparecerão as mensagens na tela:

```
**Conexão com o Banco de Dados feita com Sucesso!
(1, 'Pessoa 1', '02199999999 ')**
Seleção realizada com sucesso!
```

Vamos analisar os trechos mais importantes do código.

- L5 → É feita a consulta na tabela “Agenda” pelo registro com “id” igual a 1, através do comando Select do SQL.
- L6 → É executado o método “fetchone” que recupera exatamente um registro do “cursor” e atribui para a variável “registro”.
- L7 → É impresso na linha de comando o resultado da consulta armazenado na variável “registro”.

&emsp;

### Atualização de dados na tabela

Este exemplo mostra como atualizar os registros de uma tabela a partir do Python.

```sql
import psycopg2
conexao = psycopg2.connect(database = "AgendaDB", user = "postgres", 
password = "8484", host = "127.0.0.1", port = "5432")
print("Conexão com o Banco de Dados aberta com sucesso!")
cur = conexao.cursor()
print("Consulta antes da atualização")
cur.execute("""SELECT * from public."agenda" where "id" = 1""")
registro = cur.fetchone()
print(registro)
cur.execute("""Update public."agenda" set "telefone" = '02188888888' 
where "id" = 1""")
conexao.commit()
print("Registro Atualizado com sucesso! ")
cur = conexao.cursor()
print("Consulta depois da atualização")
cur.execute("""select * from public."agenda" where "id" = 1""")
registro = cur.fetchone()
print(registro)
conexao.commit()
print("Seleção realizada com sucesso!")
conexao.close()
```

Este código possui três partes distintas, que são:
- Uma consulta antes da atualização: Que mostra os dados do registro antes de serem modificados.
- A atualização do registro que vai modificar os dados.
- Uma consulta depois da atualização do registro: Que mostra como ficaram os dados do registro depois de serem atualizados.

> Atenção
> A linha 10 é a mais importante deste código. É nela que é executado o comando “update” do sql, que vai atualizar o dado do campo “telefone” do registro, cujo campo “id” contenha o valor “1”.

Perceba, ainda, que é associado o comando “commit” para o comando “update” do sql na linha 11.

&emsp;

### Exclusão de dados na tabela

Por fim, vamos ver o exemplo para excluir um registro de uma tabela.

```python
import psycopg2
conexao = psycopg2.connect(database = "AgendaDB", user = "postgres", 
password = "8484", host = "127.0.0.1", port = "5432")
print("Conexão com o Banco de Dados aberta com sucesso!")
cur = conn.cursor()
cur.execute("""Delete from public."agenda" where "id" = 1""")
conexao.commit()
cont = cur.rowcount
print(cont, "Registro excluido com sucesso!")
print( "Exclusao realizada com sucesso!")
conexao.close()
```

Depois de colocar o programa para executar, se tudo funcionar corretamente, aparecerão as mensagens na tela:

```python
Conexão com o Banco de Dados aberta com Sucesso!
1 Registro excluído com sucesso!
Exclusão realizada com sucesso!
```

Vamos analisar as partes mais importantes do código.

- L5 → É executado o comando “delete” do sql que vai excluir o registro cujo campo “id” seja igual a “1”.
- L7 → A propriedade “rowcount” do “cursor” retorna a quantidade de registros que foram excluídos da tabela “Agenda”.
- L8 → É impresso na linha de comando o total de registros que foram excluídos.







---
**ID**:  2108301835
**tags**: # #python/libs #psycopg2 #bancos-da-dados #postgreSQL #sql 
**links**: