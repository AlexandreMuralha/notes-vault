React - Variáveis de Ambiente

Estas variáveis guardam dados que não podem serem vazadas para o mundo externo, por exemplo, **chaves e senhas de APIs ou banco de dados**, como também configurações mais especificas deles também.
-   É recomendado que TODA variável de ambiente declarada comece com ```REACT_APP_.```

A tipagem de todas as variáveis declaradas são strings. Caso você declare uma variável que tenha o valor false (boolean) quando a sua aplicação precisar dela o valor passado será "false" (string).

Exemplo Completo ficheiro: ```.env.local```:
```ts
REACT_APP_API_KEY="AIzaSyALc132dasdasfd12qZ-eNgWKNnCAF3YoqafOyu0"
REACT_APP_AUTH_DOMAIN="minhaapp.firebaseapp.com"
REACT_APP_DATABASE_URL="https://exemploapp=efault-rtdb.firebaseio.com"
REACT_APP_PROJECT_ID="minhaapp"
REACT_APP_STORAGE_BUCKET="minhaapp.appspot.com"
REACT_APP_MESSAGING_SENDER_ID="31221368"
REACT_APP_APP_ID="1:851807010668:web:1123saddawsd12321dqasbd3d49"
```
E o ficheiro onde ficariam as variáveis originalmente:
```ts
import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
 apiKey: process.env.REACT_APP_API_KEY,
 authDomain: process.env.REACT_APP_AUTH_DOMAIN,
 databaseURL: process.env.REACT_APP_DATABASE_URL,
 projectId: process.env.REACT_APP_PROJECT_ID,
 storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
 messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
 appId: process.env.REACT_APP_APP_ID,
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database();
```

---
**ID**:  2111231939
**tags**: #
**references**:
https://create-react-app.dev/docs/adding-custom-environment-variables/
https://dev.to/guiselair/utilizando-variaveis-de-ambiente-com-create-react-app-5ckc