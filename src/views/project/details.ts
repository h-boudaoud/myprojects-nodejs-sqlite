import {ProjectDelete} from "./delete";

export function ProjectDetails (project:any,view?:string):string{
    return '\n       <div class="project">' +
        '\n          <h3>'+project.name+'</h3>' +
        '\n          <div>' +
        '\n             <div>GIT : '+(project.gitRepository && project.gitRepository || '')+'</div>' +
        '\n             <div>URL :'+(project.buildUrl || '')+'</div>' +
        '\n             <div>' +
        '\n                  languages :  <p class="inline-block">'+(project.languages?.join(', '))+'</p>'+
        '\n             </div>' +
        '\n                    '+(
            view && view=='list'?'':''+
                '\n             <div>' +
                '\n                Description : ' +
                '                   <p class="inline-block">'+
                                    (project.description?project.description.replace('\r\n','\n<br />'):'')+
                                    '</p>'+
                '\n             </div>') +
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

