import {Project} from "../../models/project";

export function ProjectDelete(project: Project, buttonLabel?:string): string {
    const  onsubmit = "return confirm(\'nAre you sure you want to delete the '+project.name +' ?\');"
    return '\n' +
        '\n     <form method="post" action="/project/'+project.id+'?_method=DELETE">'+
        '\n         <input type="hidden" name="_method" value="DELETE">\n' +
        '\n         <input type="hidden" name="_token" value="DELETE_'+project.name+'">\n' +
        '\n         <input type="hidden" name="_name" value="'+project.name+'">\n' +
        '\n         <button type="submit">'+(buttonLabel||'Delete')+'</button>'+
        '\n     </form>' +
        '\n';
    // return '' +
    //     '\n     <form method = "DELETE" action = "/project/' + project.id +'"' +
    //     'onsubmit = "'+onsubmit+'">'+
    //     '\n         <div>' +
    //     '\n             <button type="submit">'+(buttonLabel||'Delete')+'</button>'+
    //     '\n         </div>' +
    //     '\n     </form>' +
    //     '\n'
    //     ;
}
