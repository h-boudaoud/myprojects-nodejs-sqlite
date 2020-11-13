# npm Commands
To create this project, I used the following commands

### Initialize project
```
npm init
``` 
##### Add the file `/ìndex.js` at the project, 
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
delete `/ìndex.js`
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
#### Typescript configuration file : `/tsconfig.json`
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
- the file `/src/index.ts` 

#### Run project
At scripts in `/package.json`, change
```
"start": "node ."   // Or "start": "node index.js"
``` 
with 
```
    "start": "tsc && node build/index.js"
```
Build and run project with 

```shell script
npm start
```

### Monitor and simultaneous commands
#### nodemon package
This package is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
```shell script
npm install --save-dev nodemon

```
#### concurrently package
To run multiple commands concurrently
```shell script
npm install --save-dev concurrently

```
#### Configuration
At scripts in `/package.json`, add
```
    "dev": "concurrently \"tsc --watch\" \"nodemon build/index.js\""
```
To improve the presentation of the terminal by adding flags and colors 
```
    "dev": "concurrently -k -n \"Typescript,Node\" -p \"[{name}]\" -c \"blue,green\" \"tsc --watch\" \"nodemon build/index.js\""
```
#### Run dev mode
```shell script
 npm run dev
```
### Unit tests `Jest`
#### Install
Jest is a JavaScript testing framework that works with projects using: Babel, TypeScript, Node, React, Angular, Vue and more!
````shell script
npm i --save-dev jest @types/jest ts-jest
````
#### Config
Create 
- the file `/jest.config.json` with the following content
    ```
    module.exports = {
        transform: {
            '^.+\\.ts$': 'ts-jest'
        },
        moduleFileExtensions: [
            'js',
            'ts'
        ],
        testMatch: [
            '**/test/**/*.test.(ts|js)'
        ],
        testEnvironment: 'node'
    }
    
    ```
- the file `/src/sum.ts`  
    -  example the following content
        ```
        function sum(a:number, b:number):number {
            return a + b;
        }
        module.exports = sum;
        
        
        ```
- the file test `/test/sum.test.ts` :
    -  example the following content
        ```
        const sum = require('../src/sum')
        
        describe('sum', ()=>{
            it('should sum', function () {
                expect(sum(7,3)).toBe(10);
            });
        })
        
        ```
#### Run 
````shell script
npm run test
# Or Monitor test with
npm run test-watch
````
### Web application
####  express package
Express is a minimalist, flexible and fast web infrastructure for Node.js
```shell script
npm i -D express
```
#### Without using Router
In `/src/index.ts`, add : 
```ts
let app = require('express')();
let port = 3001
app.listen(port, (err: any) => {
    if (err) console.log(err);
    console.log("Server listening on PORT", port);
    console.log("Host : http://localhost:"+port);
});


app.get("/", function(req: any, res: { send: (arg0: string) => void; }) {
    res.send("Hello word");
});
app.post("/", function(req: any, res: { send: (arg0: string) => void; }) {
    res.send("This is a post request!!\n");
});

// define page path with parameters
app.get('/pathname/:param1/:param2', function(req: any, res: { send: (arg0: string) => void; }) {
    //
    res.send('pathname param1: '+req.params.param1+', param2 : '+req.params.param2);
});
```

#### Using the Router
In addition to the code above add to `/src/index.ts`
```ts
// define project page
import {Router} from "./routers/project.router";
app.use('/project', ProjectRouter);

```
in `/src/routers/project.router.ts`, add :
```ts
const express = require('express');
export const Router = express.Router();

Router.route('/')
    .all((req: any, res: { statusCode: number; setHeader: (arg0: string, arg1: string) => void; }, next: () => void) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req: any, res: { end: (arg0: string) => void; }, next: any) => {
        res.end('When a GET request is made, then this '
            + 'is the response sent to the client!');
    })
    .post((req: any, res: { end: (arg0: string) => void; }, next: any) => {
        res.end('When a POST request is made, then this '
            + 'is the response sent to the client!');
    })
    .put((req: any, res: { end: (arg0: string) => void; }, next: any) => {
        res.end('When a PUT request is made, then this '
            + 'is the response sent to the client!');
    })
    .delete((req: any, res: { end: (arg0: string) => void; }, next: any) => {
        res.end('When a DELETE request is made, then this '
            + 'is the response sent to the client!');
    });
```

More information on: https://www.geeksforgeeks.org/routing-path-for-expressjs/?ref=rp

#### "put" and "delete" methods
Method-override package lets use HTTP verbs such as PUT or DELETE in places where the client doesn’t support it.
```shell script
npm i -D method-override
```
and  in `/src/index.ts`, add :
```ts
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
```
more information on : http://expressjs.com/en/resources/middleware/method-override.html
