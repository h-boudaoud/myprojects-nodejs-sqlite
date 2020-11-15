import {Project} from "../../models/project";

export function ProjectDelete(project: Project, buttonLabel?:string): string {
    return '\n' +
        '\n     <form method="post" action="/project/'+project.id+'?_method=DELETE" style="display: inline-block">'+
        '\n         <input type="hidden" name="_method" value="DELETE">\n' +
        '\n         <input type="hidden" name="_token" value="DELETE_'+project.name+'">\n' +
        '\n         <input type="hidden" name="_name" value="'+project.name+'">\n' +
        '\n         <button type="submit" class="delete">'+(buttonLabel||'Delete')+'</button>'+
        '\n     </form>' +
        '\n';
}
