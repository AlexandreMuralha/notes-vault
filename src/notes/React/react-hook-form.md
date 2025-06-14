---
dg-publish: true
---
Performant, flexible and extensible forms with easy-to-use validation.

https://react-hook-form.com/


## use in nested structures / different component
	
In order to put the content of the `<form>` inside a different component we must use [FormProvider, useFormContext](https://react-hook-form.com/api/useformcontext/)

This custom hook allows you to access the form context. `useFormContext` is intended to be used in deeply nested structures, where it would become inconvenient to pass the context as a prop.

### Example 
Console logs the inputs using a FormComponent nested into a login page:
login page:
```typescript
import React from 'react';
import Form from './components/form';
import { useForm, FormProvider } from "react-hook-form";

const Login = () => {
 const onSubmit = (data: any) => console.log(data);
 const methods = useForm();

 return (
 	<>
	 <FormProvider {...methods} >
		 <form onSubmit={methods.handleSubmit(onSubmit)}>
			<FormComponent /> //this is the form component bellow
		 </form>
	 </FormProvider>
 	</>
 )
}

export default Login;
```

FormComponent:
```typescript
import React from 'react';
import { useFormContext } from "react-hook-form";

const FormComponent = () => {
 const { register } = useFormContext();

 return (
	 <>
	 <div>
		 <div>Email</div>
		 <input type="email" placeholder="Enter your email" {...register("Email", { required: true, maxLength: 80 })} />
		 <div>Password</div>
		 <input type="password" placeholder="Enter you Password" {...register("Password", { required: true })} />
		 <input type="submit" value="Submit" />
	 </div>
	 </>
 )
}

export default FormComponent;
```



### Display message and reset fields after submiting
use  a `useState` to show the message and `reset` API from hookForm to reset the form :

```javascript
import React from "react";
import { useForm } from "react-hook-form";

const Form = ({ title }) => {
  const [message, setMessage] = useState('');
  const { register, handleSubmit, errors, reset } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(data);
    setMessage(`thank you ${data.name} for your message`);
    reset();
  };

  return (
    <div className="formContainer">
      <Title title="Lets stay in touch" />
      <div className="form">
          {message}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form__row">
              <input
                className={`inputForm ${errors.name ? "inputFormError" : ""}`}
                name="name"
                type="text"
                placeholder="name"
                ref={register({ required: true })}
              />

              <input
                className={`inputForm ${
                  errors.surname ? "inputFormError" : ""
                }`}
                name="surname"
                type="text"
                placeholder="surname"
                ref={register({ required: true })}
              />
            </div>
            <div>
              <textarea
                className={`inputForm areaForm ${
                  errors.message ? "inputFormError" : ""
                }`}
                name="message"
                placeholder="Your message"
                ref={register({ required: true })}
              ></textarea>
            </div>
            <div>
              <button className="form__formButton" type="submit">
                Send
              </button>
            </div>
          </form>
      </div>
    </div>
  );
```