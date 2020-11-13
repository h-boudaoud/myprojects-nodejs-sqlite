import {projects} from "../../database/project.data";
import {ProjectDetails} from "./details";

export function ProjectIndex(): string {
    let view: string = '';
    projects.forEach((p) => view += '\n'+ProjectDetails(p))
    view += '\n   <script>' +
        '\n           console.log("projects :",' + JSON.stringify(projects) + ')' +
        '\n       </script>'
    ;
    return view;
}
