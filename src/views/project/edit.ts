import {ProjectForm} from "./form";
import {Project} from "../../models/project";

export function ProjectEdit(project:Project):string{
    const buttonLabel='Edit';
    return '\n      <h2>Edit '+project.name+'</h2>' +
                ProjectForm(project)+
        '\n       <script>' +
        '\n           console.log("projects :",' + JSON.stringify(project.toJSON()) + ')' +
        '\n       </script>'
    ;
}
