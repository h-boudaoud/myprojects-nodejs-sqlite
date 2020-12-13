import {Project} from "../models/project";

export const  languages = ['JavaScript','C#','PHP','TypeScript', 'Python','Java', 'C++', 'C']
const exampleProject = {
    name: 'project ',
    git: 'git repos ',
    url: 'buid url ',
}
let list: any[] = [];
for (let i = 1; i<10 ;i++)
{
    let nb = Math.floor(Math.random() * Math.floor(languages.length))
    let lang: string[] = [];
    do{
        let language = languages[Math.floor(Math.random() * Math.floor(languages.length))]
        if(!lang.includes(language))
            lang.push(language)
    }while (lang.length < nb)
    const project = new Project(
        exampleProject.name + i,
        exampleProject.git + i,
        exampleProject.url + i,
        lang,
        'My '+i+(i>3?'th':i===3?'rd':i===2?'nd':'st')+' project',
        i
    );
    list.push(project)
}

export let projects:Project[]|null = null;
// export function AddProjects(project: any){
//     const newProject = new Project(
//         project.name,
//         project.gitRepository,
//         project.buildUrl,
//         project.languages,
//         project.description,
//         projects.length +1
//     )
//
//     projects.push(newProject)
// };

