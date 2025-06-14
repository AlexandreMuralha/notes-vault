---
id: 2401140909
title: React basics
date-created: 2024-01-14T09:09
dg-publish: true
---
## Components

- When using react, think of your UI as a bunch of separate components.
- Conceitualmente, componentes são como funções JavaScript. Eles aceitam entradas (chamadas “props”) e retornam elementos React que descrevem o que deve aparecer na tela.
- Components can be created as **Functions** or **Classes** .
- These days (2021) the more common way of create components is using **Functions with hooks**
- Um componente recebe parâmetros, chamados `props` (abreviação de propriedades), e retorna uma hierarquia de elementos para exibir através do método `render`


```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

Essa função é um componente React válido porque aceita um único argumento de objeto “props” (que significa propriedades) com dados e retorna um elemento React. Nós chamamos esses componentes de “componentes de função” porque são literalmente funções JavaScript.


Você também pode usar uma classe ES6 para definir um componente:
```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
Os dois componentes acima são equivalentes do ponto de vista do React.


> Sempre inicie os nomes dos componentes com uma letra maiúscula.
O React trata componentes começando com letras minúsculas como tags do DOM. Por exemplo, `<div />` representa uma tag div do HTML, mas `<Welcome />` representa um componente e requer que `Welcome` esteja no escopo.

<br>

## Props (propriedades)

São informações que podemos passar para um componente para alterar o comportamento deste, assim como temos atributos no HTML.


Por exemplo, o código seguinte renderiza “Hello, Sara” na página:
```jsx
function Welcome(props) {  
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

#### Compondo Componentes
Componentes podem se referir a outros componentes em sua saída. Isso nos permite usar a mesma abstração de componente para qualquer nível de detalhe. Um botão, um formulário, uma caixa de diálogo, uma tela: em aplicativos React, todos esses são normalmente expressos como componentes.

Por exemplo, nós podemos criar um componente `App` que renderiza `Welcome` muitas vezes:
```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />      
	  <Welcome name="Cahal" />      
	  <Welcome name="Edite" />    
	</div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

> Tipicamente, novos aplicativos React tem um único componente `App` no topo.


#### Props são somente de Leitura
Em react um componente não deve nunca alterar os seus próprios props. Deve ser sempre portanto uma função Pura.

Uma função é considerada impura quando altera a sua própria entrada, por exemplo:
```jsx
function withdraw(account, amount) {
  account.total -= amount;
}
```
Já as funções puras não alteram as suas entradas e sempre retornam o mesmo resultado para as mesmas entradas, por exemplo:
```jsx
function sum(a, b) {
  return a + b;
}
```
**Todos os componentes React tem que agir como funções puras em relação ao seus props.**

### Método render
O método `render` retorna uma _descrição_ do que você deseja ver na tela. React recebe a descrição e exibe o resultado. Em particular, `render` retorna um **elemento React**, que é uma descrição simplificada do que renderizar. A maioria dos desenvolvedores do React usa uma sintaxe especial chamada “JSX”, que facilita a escrita desses elementos
Por exemplo, sintaxe `<div />` é transformada em tempo de compilação para :
```js
React.createElement ('div')
```


## JSX

JSX ->  **JavaScript XML**  é uma extensão de sintaxe para JavaScript.

Por princípio o React opta por separar conceitos (em componentes) ao invés de separar tecnologias (js, css, html em ficheiros separados não são usado) seguindo o [[Responsabilidade Única]]. O JSX constituí-se como a sintaxe ideal para este tipo de abordagem.

O uso do JSX não é obrigatório, é porém, altamente recomendado, a maioria das pessoas acha prático como uma ajuda visual quando se está trabalhando com uma UI dentro do código em JavaScript. Ele permite ao React mostrar mensagens mais úteis de erro e aviso.

> O React Dom usa o `camelCase` como convenção para nomes de propriedades ao invés dos atributos do HTML, por exemplo, `class` se transforma em `className` em JSX e `tabindex` se transforma em `tabIndex`.

<br/>

### Exemplos
No exemplo abaixo, declaramos uma variável chamada `name` e então a usamos dentro do JSX ao envolvê-la com chaves:
```jsx
const name = 'Maria Pereira';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

Podemos usar qualquer expressão Javascript válida dentro das chaves
em JSX. Por exemplo, `2 + 2`, `user.firstName`, ou `formatName(user)` são todas expressões JavaScript válidas.

No exemplo abaixo, incorporamos o resultado da chamada de uma função JavaScript, `formatName(user)`, dentro de um elemento `<h1>`.

```jsx
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Maria',
  lastName: 'Pereira'
};

const element = (
  <h1>
    Hello, {formatName(user)}!  
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

<br/>

### Especificando Atributos com JSX

Para especificar strings literais como atributos usamos aspas:

```jsx
const element = <div tabIndex="0"></div>;
```

Para incorporar uma expressão JavaScript em um atributo usamos chaves:

```jsx
const element = <img src={user.avatarUrl}></img>;
```

Não envolva chaves com aspas quando estiver incorporando uma expressão JavaScript em um atributo. Você deveria ou usar aspas (para valores em string) ou chaves (para expressões), mas não ambos no mesmo atributo.

Tags JSX podem conter elementos filhos:

```jsx
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```



---
**ID**:  2401140909
**tags**: #react 
**references**:
https://pt-br.reactjs.org/docs/introducing-jsx.html