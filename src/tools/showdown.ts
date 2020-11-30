// Use showdown package
import * as fs from "fs";
import * as path from "path";

export function markdownFileToHTML(filename: string ): string  {
    const file =path.join(__dirname,'../../', filename);
    console.log(file);
    try {
        return markdownSyntaxToHTML(fs.readFileSync(file, "utf8"))
        // const showdown = require('showdown'),
        //     converter = new showdown.Converter(),
        //     text = fs.readFileSync(file, "utf8"),
        //     html = converter.makeHtml(text);
        // console.log('markdownToHTML', html)
        // return `<div id="markdown">${html}</div>`;
    } catch (e) {
        console.log('Error fs : ' + e.message)
        return 'Error fs : ' + e.message.replace('F:\\MesProjets\\Codes\\JS\\NodeJs\\myProjects_nodeJs_Sqlite\\myProjects_nodeJs_Sqlite\\src\\', '...\\');

    }
}

export function markdownSyntaxToHTML(text: string ): string  {
        const showdown = require('showdown'),
            converter = new showdown.Converter(),
            html = converter.makeHtml(text);
        // console.log('markdownToHTML', html)
        return `<div id="markdown">${html}</div>`;
}
