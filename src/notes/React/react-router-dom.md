---
dg-publish: true
---

**React Router** is a standard library for routing in React. It enables the navigation among views of various components in a React Application, allows changing the browser URL, and keeps the UI in sync with the URL.
https://reactrouter.com/docs/en/v6/getting-started/overview

### Add
```shell
yarn add react-router-dom
```


###  typescript
```shell
yarn add @types/react-router-dom -D
```

### useHistory

React Router ships with a few [hooks](https://reactjs.org/docs/hooks-intro.html) that let you access the state of the router and perform navigation from inside your components.
The `useHistory` hook gives you access to the [`history`](https://v5.reactrouter.com/web/api/history) instance that you may use to navigate.

```jsx
import { useHistory } from "react-router-dom";

function HomeButton() {
  let history = useHistory();

  function handleClick() {
    history.push("/home");
  }

  return (
    <button type="button" onClick={handleClick}>
        Go home
    </button>
  );
}
```

### navigate instead of useHistory
in react-router-dom V6 useHistory() is replaced by useNavigate()

```javascript
import {useNavigate} from 'react-router-dom';
const navigate = useNavigate();
navigate('/home')
```


### useLocation
This hook returns the current [`location`](https://reactrouter.com/docs/en/v6/utils/location) object. This can be useful if you'd like to perform some side effect whenever the current location changes.
Exemplo: verifica o path atual e retorna uma class "active-tab" ou "inative-tab" no elemento para .....
```jsx
import React, { useState } from 'react';  
import { useNavigate, useLocation } from 'react-router-dom';  
  
const TopBar = () => {  
  const currentRoute = useLocation();  
 
  return <>  
		 <div className='container'>  
		 	<div className={currentRoute.pathname.includes("home") ? "inactive-tab" : "active-tab"}  
					 onClick={handleOnClick}> Home </div>  
 		 	<div className={currentRoute.pathname.includes("about") ? "active-tab" : "inactive-tab"}  
             		 onClick={handleOnClick}> About </div>  
		 </div>  
		 </>
 }  
  
export default TopBar;

```


### exemplo de sintaxe na versão 6:
```tsx
import {Home} from "./pages/Home";
import {NewRoom} from "./pages/NewRoom";

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/rooms/new" element={<NewRoom />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
```


### exact in v6
react router v6 doesn't support `exact` anymore.

// old - v5 `<Route exact path="/" component={Home} />`

// new - v6 `<Route path="/" element={<Home />} />`

As stated in their documentation:

> You don't need to use an exact prop on `<Route path="/">` anymore. This is because all paths match exactly by default. If you want to match more of the URL because you have child routes (see the `<Routes>` defined in the Users component above), use a trailing * as in `<Route path="users/*">`.


<<  [[React]]

---
**ID**:  2111251632
**tags**: #react #javascript #typescript
**references**:
https://reactrouter.com/docs/en/v6/getting-started/overview
https://v5.reactrouter.com/web/guides/quick-start
https://www.geeksforgeeks.org/reactjs-router/
