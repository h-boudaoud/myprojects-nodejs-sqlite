import {ProjectDelete} from "./delete";

export function ProjectDetails (project:any):string{
    return '\n       <div>' +
        '\n          <h3>'+project.name+'</h3>' +
        '\n          <P>GIT : '+project.gitRepository+
        '\n              <br />URL :'+project.buildUrl+
        '\n          </p>' +
        '\n          <p>' +
        '\n              languages : <br />'+(project.languages.join(', '))+'<span class="      "></span>'+
        '\n          </p>' +
        '\n          <p>' +
        '\n              Description : <br />'+project.description.replace('\r\n','\n<br />')+'<span class="     "></span>'+
        '\n          </p>' +
        '\n          <p>' +
        '\n                 ' + ProjectDelete(project)+
        '\n          </p>' +
        '\n       </div>' +
        '\n'
    ;

}

