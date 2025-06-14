---
dg-publish: true
---
JavaScript date utility library

https://date-fns.org/
https://date-fns.org/docs/Getting-Started
---
#### Installation
The library is available as an [npm package](https://www.npmjs.com/package/date-fns).
To install the package, run:

```bash
npm install date-fns --save
# or
yarn add date-fns
```

Start using:

```ts
import { formatDistance, subDays } from 'date-fns'

formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true })
//=> "3 days ago"
```
---
#### Utility function that receives a dob and returns the age of the person:

```ts
import { differenceInYears } from "date-fns";

export function calculateAge(dateOfBirth: Date) {  
  const dob = new Date(dateOfBirth);  
  return differenceInYears(new Date(), dob)  
}
```
---



