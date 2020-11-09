# npm Commands
To create this project, I used the following commands

### Initialize project
```
npm init
``` 
##### Add the file ` ìndex.ts` at the project, 
optional: at scripts in package.json, add 

```
"start": "node ."   // Or "start": "node index.js"
``` 
Run project with 
```
node . 
# Or, whith modifying the package.json file
npm start
```
### The project with TypeScript

#### TypeScript package
```
npm install --save-dev typescript
# Or 
npm i -D typescript
```
- `i` flag is the shorthand for `install`
- `-D` flag is the shorthand for `--save-dev`

#### @types/node package
This package contains type definitions for Node.js
```yaml
npm i --save-dev @types/node
```
note: it is possible to install both packages with the command
```
npm install --save-dev typescript @types/node

```
#### Typescript configuration file : `tsconfig.json`
##### run with "tsc"
At scripts in package.json, add `"tsc": "tsc" ` And execute : `npm run tsc -- --init`
##### Configure manually
Create 
- the file `tsconfig.json` with the following content
```
{
  "compilerOptions": {
    "module": "commonjs",
    "esModuleInterop": true,
    "outDir": "build",
    "target": "es6",
    "strict": true
  },
  "include": [
    "src/**/*"
  ]
}
```
- the file `src/index.ts` 

#### Run project
At scripts in package.json, change
```
"start": "node ."   // Or "start": "node index.js"
``` 
with 
```
    "start": "tsc && node build/index.js"
```
Build and run project with 

```
npm start
```
