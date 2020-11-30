// @ts-ignore
import {html} from "./views/Layout";

console.log('Hello world')

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
let port = 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use('/asset', express.static('public'));
app.use('/favicon.ico', express.static('public/img/favicon.ico'));
//asset

app.listen(port, (err: any) => {
    if (err) console.log(err);
    console.log("Server listening on PORT", port);
    console.log("Host : http://localhost:"+port);
});


app.get("/", function(req: any, res: { send: (arg0: string) => void; }) {
    res.send(html('Home', 'Hello world'));
});

app.post("/", function(req: any, res: { send: (arg0: string) => void; }) {
    res.send("This is a post request!!\n");
});

// define page path with parameters
app.get('/pathname/:param1/:param2', function(req: any, res: { send: (arg0: string) => void; }) {
    const body = 'pathname param1: '+req.params.param1+', param2 : '+req.params.param2
    res.send(html('Home', body));
});

// Add markdown file to view
import {markdownFileToHTML} from "./tools/showdown";
app.get('/about', function (req: any, res: { send: (arg0: string) => void; }) {
    const body = `
                <head><link rel="stylesheet" href="/asset/css/markdown.css"/></head>
                <div class="markdown">${markdownFileToHTML('src/views/about/about.md')}</div>`;
    res.send(html('About', body));
})

// Using the Router : define project views
import {Router as ProjectRouter} from "./routers/project.router";
app.use('/project', ProjectRouter);



