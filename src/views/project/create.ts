import {ProjectForm} from "./form";

export function ProjectCreate():string{
    return '\n<h2>New project</h2>' + ProjectForm()+'\n';
}
