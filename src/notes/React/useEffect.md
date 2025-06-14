---
dg-publish: true
---

**useEffect** allows you to do a **Side effect**. A **Side effect** is any work done outside the component.
Exemples: change doc title, listening to events, fetch data, etc.

> by default useEffect runs AFTER every re-render



### Basic Sintax

```ts
import { useEffect } from 'react';

useEffect( () => {
    //whatever is here inside the callback will run after every re-render
})
```
We pass it two arguments: a function and an array
- The function passed to useEffect is a callback function. This will be called after the component renders.
- The array, called the dependencies array. This array should include all of the values that our side effect relies upon.

Examples:
```ts
useEffect( () => {
    document.title = 'new title' //this updates the document title in every re-render
})
```



### Second Parameter

The second argument is an array, called the dependencies array. This array should include all of the values that our side effect relies upon.
```js
useEffect(() => { 
    console.log("Counter value: ", counter); 
}, [counter]); 
```
If the array contains a state variable, the useEffect callback function gets triggered on 2 occasions. First, when the **page renders** and whenever the **state variable is updated**.


```ts
useEffect( () => {
    document.title = 'new title' //this updates the document title in every re-render
}, []) //empty array in second parameter indicates the callback function is only called once the page renders.
```
The empty array indicates that the useEffect doesn’t have any dependencies on any state variables. Therefore, the callback function is only called once the page renders. 





Links:
https://overreacted.io/a-complete-guide-to-useeffect/
https://www.bam.tech/article/how-to-avoid-bugs-in-useeffect
