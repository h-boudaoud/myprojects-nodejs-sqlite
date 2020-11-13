import {Project} from "../../models/project";

export function ProjectForm(project?: Project, buttonLabel?:string): string {
    return '' +
        '<form action="#" method="post">' +
        // '   <div>' +
        // '       <label for="id">Id :</label>' +
        // '       <input type="text" id="id" name="id" value="'+(project?project.id:'')+'">' +
        // '   </div>' +
        '   <div>' +
        '       <label for="name">Name:</label>' +
        '       <input type="text" id="name" name="name" value="'+(project?project.name:'')+'">' +
        '   </div>' +
        '   <div>' +
        '       <label for="languages">Language :</label>' +
        '       <input type="text" id="languages" class="languages" name="languages" value="'+(project?project.languages.join(', '):'')+'">' +
        '   </div>' +
        '   <div>' +
        '       <label for="gitRepository">Repository :</label>' +
        '       <input type="text" id="gitRepository" name="gitRepository" value="'+(project?project.gitRepository:'')+'">' +
        '   </div>' +
        '   <div>' +
        '       <label for="buildUrl">Url :</label>' +
        '       <input type="text" id="buildUrl" name="buildUrl" value="'+(project?project.buildUrl:'')+'">' +
        '   </div>' +
        '   <div>' +
        '       <label for="description">description :</label>' +
        '       <textarea id="description" name="description">'+(project?project.description:'')+'</textarea>' +
        '   </div>' +
        '   <button type="submit">'+(buttonLabel||'Save')+'</button>'+
        '</form>' +
        ''
    ;

}

