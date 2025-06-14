---
dg-publish: true
---
O **useState** é um hook do React que permite manipular o estado (state) de um componente de forma simples.
### Sintaxe
```jsx
const [state, setState] = useState(initialState);
```
em que:
- state -> o nome do state e onde é armazenado o seu valor (estado) atual. 
- setState -> função que altera o estado atual.
- initialState -> é o argumento passado para o Hook `useState()` é o state inicial.


### Exemplo
```jsx
import React, {useState} from 'react';

const Counter() => {
	const [count, setCount] = useState(5);

	const decrement = () => {setCount(count - 1);};
	const increment = () => {setCount(count + 1);};

	return (
		<>
			<button onClick={decrement}>-</button>
			<h1>{count}</h1>
			<button onClick={increment}>+</button>
		</>
	);
}

export default Counter;
```
- Dentro do componente Counter é declarado o Hook state que retorna um par de valores. 
- O nome do state declarado é count, ele mantém o número de clicks (o state atual).
- O segundo item é setCount, a função que quando chamada permite alterar o state do count, atualizado o contador.
- O argumento passado para o useState representa o estado inicial, no caso, o contador inicializará em 5.
- Quando o usário clica nos botões o react re-renderiza o componente Counter, passando o novo valor de state para ele.
