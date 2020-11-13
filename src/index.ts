// @ts-ignore
console.log('Hello word')

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

// Using the Router : define project views
import {Router as ProjectRouter} from "./routers/project.router";
app.use('/project', ProjectRouter);



