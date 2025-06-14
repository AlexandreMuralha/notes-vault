---
dg-publish: true
---

**useContext** is primarily used when some data needs to be accessible by _many_ components at different nesting levels. Apply it sparingly because it makes component reuse more difficult.

### `React.createContext`

[Context](https://reactjs.org/docs/context.html) permite transmitir dados entre enumeros componentes independentemente da sua posição
allows you to pass data across any number of React components, regardless of nesting.

```jsx
const MyContext = React.createContext(defaultValue);
```

Creates a Context object. When React renders a component that subscribes to this Context object it will read the current context value from the closest matching `Provider` above it in the tree.

O argumento `defaultValue` (valor padrão) é usado _apenas_ quando o componente não corresponder com um `Provider` acima dele na árvore. Este valor padrão pode ser útil para testar componentes isoladamente, sem envolvê-los. Observação: passando `undefined` como um valor de Provider não faz com que os componentes consumidores do Provider usem `defaultValue`.

### `Context.Provider`
.....


### quando usar Redux e quando usar Context?
.....
