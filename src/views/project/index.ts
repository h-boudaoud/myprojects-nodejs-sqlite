import {ProjectDetails} from "./details";
import {Project} from "../../models/project";
import {ProjectFakerForm, ProjectMigrationForm} from "./migrationAndFaker";

export function ProjectIndex(projects: Project[] | null): string {
    let view: string = !projects
        ? `<div>${ProjectMigrationForm()} or ${ProjectFakerForm()}</div>`
        : projects?.length
            ? `<div>${projects.length} project${projects.length > 1 ? 's' : ''}</div>`
            : '<a href="/project/new" class="btn" style="margin: 1rem 0 0 0">Add New project</a>'
    ;
    // let view: string = projects?.length
    //         ? `<div>${projects.length} project${projects.length > 1 ? 's' : ''}</div>`
    //         : '<a href="/project/new" class="btn" style="margin: 1rem 0 0 0">Add New project</a>'
    // ;
    view +='<section id="projects">'
    projects?.forEach((p) => view += '\n' + ProjectDetails(p, 'list'))
    view += '</section>' +
        '\n   <script>' +
        '\n        console.log("projects :",' + JSON.stringify(projects) + ')' +
        '\n  </script>'
    ;
    return view;
}
