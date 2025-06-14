---
dg-publish: true
---
### Strings

Insere um caractere em uma determinada posição em todas linha de um arquivo.
```python
#Abre o arquivo original e lê linha por linha
with open('test.csv') as arquivo:
	lines = arquivo.read().splitlines()

#Escreve no arquivo novo as linhas lidas, linha por linha, acrescentando ";" na posição 6 de cada linha.
with open('test1.csv', "w") as arquivo:
	for line in lines:
	print(line[:6] + ';' + line[6:], file=arquivo)
```
---
**ID**:  2108231611
**tags**: #python 
**links**:
