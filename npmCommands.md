## npm Commands
To create this project, I used the following commands

### Initialize project
```
# shell script
npm init
``` 
##### Add the file `/ìndex.js` at the project, 
optional: at scripts in package.json, add 

```
# shell script
"start": "node ."   // Or "start": "node index.js"
``` 
Run project with 
```
# shell script
node . 
# Or, whith modifying the package.json file
npm start
```
### The project with TypeScript
delete `/ìndex.js`
#### TypeScript package
```
# shell script
npm install --save-dev typescript
# Or 
npm i -D typescript
```
- `i` flag is the shorthand for `install`
- `-D` flag is the shorthand for `--save-dev`

#### @types/node package
This package contains type definitions for Node.js
```
# shell script
npm i --save-dev @types/node
```
note: it is possible to install both packages with the command
```
# shell script
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

```
# shell script
npm start
```

### Monitor and simultaneous commands
#### nodemon package
This package is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
```
# shell script
npm install --save-dev nodemon

```
#### concurrently package
To run multiple commands concurrently
```
# shell script
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
```
# shell script
 npm run dev
```
### Unit tests `Jest`
#### Install
Jest is a JavaScript testing framework that works with projects using: Babel, TypeScript, Node, React, Angular, Vue and more!
```
# shell script
npm i --save-dev jest @types/jest ts-jest
```
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
```
# shell script
npm run test
# Or Monitor test with
npm run test-watch
```
### Web application
####  express package
Express is a minimalist, flexible and fast web infrastructure for Node.js
```
# shell script
npm i -S express
```
#### Without using Router
In `/src/index.ts`, add : 
```
# ts
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
```
# ts
// define projectViews page
import {Router} from "./routers/projectViews.router";
app.use('/project', ProjectRouter);

```
in `/src/routers/project.router.ts`, add :
```
#ts
const express = require('express');
export const Router = express.Router();

Router.route('/')
    .all((
        req: any, 
        res: { statusCode: number; setHeader: (arg0: string, arg1: string) => void; }, 
        next: () => void
        ) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            next();
        }
    )
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
```
# shell script
npm i -S method-override
```
and  in `/src/index.ts`, add :
```
# ts
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
```
more information on : http://expressjs.com/en/resources/middleware/method-override.html

#### Use static files 
create an folder `/public`, and in `/src/index.ts` add : 
```
# ts
app.use('/asset', express.static('public'));
```
To acces at static files `/public/floder/file` use `/asset/folder/file` in the html code. 

#### Add markdown syntax or markdown file to view
##### showdown package
Showdown is a Javascript Markdown to HTML converter, 
that can be used client side (in the browser),  
also on the server side (with NodeJs).

```
# shell script
npm i -S showdown
```

in `/src/index.ts` add : 

```
# ts
// Convert markdown syntax to html syntax
function markdownSyntaxToHTML(text: string ): string  {
        const showdown = require('showdown'),
            converter = new showdown.Converter(),
            html = converter.makeHtml(text);
        // console.log('markdownToHTML', html)
        return `<div id="markdown">${html}</div>`;
}

import * as fs from "fs";
import * as path from "path";
app.get('/markdown', function(req: any, res: { send: (arg0: string) => void; }) {
    //check that filename matches the path of markdown file
    const file =path.join(__dirname,'../', filename_in_project);
    // Convert markdown file to html syntax
    const html = markdownSyntaxToHTML(fs.readFileSync(file, "utf8"))
    res.send(html);
});

```
Note: For maintenance and visibility the project, write your code in multiple files and export the variable.


### Database : Sqlite

I chose Sqlite not for its simplistic use 
(no password, no installation, no client/server system unlike 
other database managers like  "MySQL, SQL Server, Oracle...)
, but rather for the amount of data stored
, and the number of requests made in this project

#### sqlite3 package
```
# shell script
npm i -S sqlite3 sqlite @types/sqlite3
```
#### Use sqlite3 package
Create a folder `./src/data/` and in `/src/index.ts`, add :

![Warning](https://raw.githubusercontent.com/h-boudaoud/Board-Game-Symfony-5.0.8/master/!.png#icon "Warning")
: the folder which must contain the sqlite data file must 
exist before the running of the project

```
// ts
import * as sqlite from 'sqlite3';

const sqlite3 = sqlite.verbose();
const dbPath = "./src/data/myDatabase.sqlite3.db";
let db = new sqlite3.Database(dbPath, (err) => {
    let response = "Successful connection to database 'myDatabase.Sqlite3.db'";
    if (err) {
        response = 'Sqlite error : ' + err.message;
        // throw err;
    }
    console.log(response);
});

```

End

