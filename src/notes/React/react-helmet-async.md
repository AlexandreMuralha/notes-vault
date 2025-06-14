---
dg-publish: true
---

This is used for manage changes to the document head.

[react-helmet-async](https://github.com/staylor/react-helmet-async) is a fork of [React Helmet](https://github.com/nfl/react-helmet). `<Helmet>` usage is synonymous, but server and client now requires `<HelmetProvider>` to encapsulate state per request.

`react-helmet` relies on `react-side-effect`, which is not thread-safe. If you are doing anything asynchronous on the server, you need Helmet to encapsulate data on a per-request basis, this package does just that.



### Exemplo:
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

Const App = () => {  
  return <>
   <HelmetProvider>  
	 <Helmet> 
		<title>Page title</title>  
		<meta name="description" content="This is a meta description of the page" />  
		<link rel="canonical" href={Urls.HOME} />  
	 </Helmet>
	 <h1>Hello World</h1>
   </HelmetProvider>
  </>
}

export default App;
 
 ```
 
 The main way that this package differs from `react-helmet` is that it requires using a Provider to encapsulate Helmet state for your React tree. If you use libraries like Redux or Apollo, you are already familiar with this paradigm