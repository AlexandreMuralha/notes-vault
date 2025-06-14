---
dg-publish: true
---

### this solves the error importing svg in typescript files:

if you use webpack, you can do this by creating a custom types file.

Create a file named **custom.d.ts** with the following content:

```javascript
declare module "*.svg" {
  const content: any;
  export default content;
}
```

Add the `custom.d.ts` to `tsconfig.json` as below

```javascript
"include": ["src/components", "src/custom.d.ts"]
```