---
dg-publish: true
---

O Psycopg2 é um adaptador de banco de dados [[PostgreSQL]] para Python.

> [[psycopg2 - Exemplo]]

---

### Install

```
pip install psycopg2
```

---

### Métodos
Para poder interagir com o banco de dados PostgreSQL com o uso da biblioteca psycopg2, primeiro é necessário criar um objeto Connection que representa o banco de dados e, em seguida, pode-se criar um objeto cursor que será bastante útil para executar todas as instruções SQL. 

Antes disso, porém, vamos apresentar as principais APIs (rotinas de interface de programação) da psycopg2:

```sql
psycopg2.connect (database = "NomeDoBancoDeDados", user = "LoginDoUsuário", senha = "SenhaDoBancoDeDados",
host = "EndereçoDaAplicação", porta = "NúmeroDaPorta")
```

A conexão com o banco de dados PostgreSQL é feita com essa API. O banco de dados retorna um objeto de conexão, se o banco de dados for aberto com sucesso. Para aplicações que vão rodar localmente, utiliza-se o endereço de localhost dado por **127.0.0.1**". A porta de comunicação padrão do PostgreSQL é a "5432", mas esse valor pode ser mudado.

---

#### connection.cursor ()
Esta API cria um cursor que será usado ao longo da programação para interagir com o banco de dados com Python.

---

#### cursor.execute (sql [, parâmetros opcionais])
Esta rotina é aplicada para executar uma instrução SQL. A instrução SQL pode ser parametrizada. Por exemplo, seja o trecho de código abaixo:

```sql
nomeDaTabela = 'tabelaExemplo'
cursor.execute(
	"insert into %s values (%%s, %%s)" % nomeDaTabela,
	[10, 20])
```

O comando vai executar a instrução “insert” para inserir os valores 10 e 20 na tabela ‘tabelaExemplo’.

---

#### cursor.executemany (sql, sequência_de_parâmetros)
Esta rotina executa um comando SQL em todas as sequências de parâmetros. Por exemplo, seja o trecho de código:

```sql
carros = (
	(1, 'Celta', 35000),
	(2, 'Fusca', 30000),
	(3, 'Fiat Uno', 32000)
	)

	con = psycopg2.connect(database='BancoExemplo', user='postgres',
	password='postgres')

	cursor = con.cursor()

	query = "INSERT INTO cars (id, nome, preco) VALUES (%s, %s, %s)"
	cursor.executemany(query, carros)
```

O trecho de código começa com uma lista de três carros, na qual cada carro possui um código de identificação, nome e um preço.

Em seguida, é feita uma conexão com o banco de dados “BancoExemplo”.

Logo depois, é criado o cursor que vai ser usado para realizar as operações sobre o banco de dados.

Por fim, é executada a rotina “executemany”, sendo que ela recebe uma query e uma lista de carros que serão inseridos no banco de dados.

#### cursor.callproc ('NomeDaFunção_Ou_NomeDoProcedimentoArmazenado', [parâmetros IN e OUT,])
Esta rotina faz chamada para uma função, ou procedimento armazenado do banco de dados. Os parâmetros IN e OUT correspondem, respectivamente, aos parâmetros de entrada e saída da função, ou procedimento armazenado e devem ser separados por vírgulas.

&emsp;

#### cursor.rowcount
Este atributo retorna o número total de linhas do banco de dados que foram modificadas, inseridas ou excluídas pela última instrução de “execute“.

&emsp;

#### connection.commit()
Este método confirma a transação atual. É necessário que ele seja chamado ao final de uma sequência de operações sql, pois, caso contrário, tudo o que foi feito desde a última chamada até o “commit” não será visível em outras conexões de banco de dados.



#### connection.rollback()
Este método reverte quaisquer mudanças no banco de dados desde a última chamada até o “commit”.

#### connection.close()
Este método fecha a conexão com o banco de dados. Ele não chama o “commit” automaticamente. Se a conexão com o banco de dados for fechada sem chamar o “commit” primeiro, as alterações serão perdidas.

#### cursor.fetchone()
Este método busca a próxima linha de um conjunto de resultados de consulta, retornando uma única sequência, ou nenhuma, quando não há mais dados disponíveis.


#### cursor.fetchmany([size = cursor.arraysize])
Esta rotina busca o próximo conjunto de linhas de um resultado de consulta, retornando uma lista. Uma lista vazia é retornada quando não há mais linhas disponíveis. O método tenta buscar quantas linhas forem indicadas pelo parâmetro “size”.


#### cursor.fetchall()
Esta rotina busca todas as linhas (restantes) de um resultado de consulta, retornando uma lista. Uma lista vazia é retornada quando nenhuma linha está disponível.





---
**ID**:  2108271717
**tags**: #python #python/libs #bancos-da-dados #postgreSQL #sql 
**links**:
https://pypi.org/project/psycopg2/
