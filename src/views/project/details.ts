import {ProjectDelete} from "./delete";

export function ProjectDetails (project:any,view?:string):string{
    return '\n       <div class="project">' +
        '\n          <h3>'+project.name+'</h3>' +
        '\n          <div>' +
        '\n             <P>GIT : '+project.gitRepository+
        '\n                 <br />URL :'+project.buildUrl+
        '\n             </p>' +
        '\n             <p>' +
        '\n                  languages : <br />'+(project.languages.join(', '))+'<span class="      "></span>'+
        '\n             </p>' +
        '\n                    '+(
            view && view=='list'?'':''+
        '\n             <p>' +
        '\n                Description : <br />'+project.description.replace('\r\n','\n<br />')+'<span class="     "></span>'+
        '\n             </p>') +
        '\n             <footer>' +
        '\n                    '+(
            view && view=='list'
                ?'<a href="/project/'+project.id+'" class="btn">View</a>'
                :'<a href="/project/" class="btn">Projects</a>'
        )+
        '\n                    <a href="/project/'+project.id+'/edit" class="edit">Edit</a>' + ProjectDelete(project)+
        '\n             </footer>' +
        '\n          </div>' +
        '\n       </div>' +
        '\n'
    ;

}

