import {Project} from "../models/project";
import {
    projectAll,
    projectDelete,
    projectFindById,
    ProjectMigration,
    projectNew,
    projectUpdate
} from "../database/project.data";
//Views
import {html} from "../views/Layout";
import {ProjectIndex} from "../views/project";
import {ProjectCreate} from "../views/project/create";
import {ProjectDetails} from "../views/project/details";
import {ProjectEdit} from "../views/project/edit";


const express = require('express');
export const Router = express.Router();
let project: Project | null;
let id: number = 0;
let title: string;
let projects: Project[]|null = null;
let message: { type: string, content: string } | null

//  Example router
// Router.route('/')
//     .all((req: any, res: { statusCode: number; setHeader: (arg0: string, arg1: string) => void; }, next: () => void) => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'text/plain');
//         next();
//     })
//     .get((req: any, res: { end: (arg0: string) => void; }, next: any) => {
//         res.end('When a GET request is made, then this '
//             + 'is the response sent to the client!');
//     })
//     .post((req: any, res: { end: (arg0: string) => void; }, next: any) => {
//         res.end('When a POST request is made, then this '
//             + 'is the response sent to the client!');
//     })
//     .put((req: any, res: { end: (arg0: string) => void; }, next: any) => {
//         res.end('When a PUT request is made, then this '
//             + 'is the response sent to the client!');
//     })
//     .delete((req: any, res: { end: (arg0: string) => void; }, next: any) => {
//         res.end('When a DELETE request is made, then this '
//             + 'is the response sent to the client!');
//     });


// /project/
Router.route('/')
    .all(async (req: any, res: { statusCode: number; setHeader: (arg0: string, arg1: string) => void; }, next: () => void) => {
        await routeAll(res);
        title = 'My projects';
        await routeAll(res);
        console.log('All - url : ', req.url, ' method : ', req.method);
        //console.log('Router : ', Router)
        next();
    })
    .get((req: any, res: { end: (arg0: string) => void; }) => {

        res.end(html(
            title,
            ProjectIndex(projects),
            message)
        );

    })
    .post(async (req: any, res: { end: (arg0: string) => void;
        redirect(s: string): Promise<any>;
    }) => {

        if(req.body._token.includes('migration')){
            await ProjectMigration(req.body._token.includes('faker'));
        }

        return res.redirect('/project');

    })


// /project/new
Router.route('/new')
    .all(async (req: any, res: { statusCode: number; setHeader: (arg0: string, arg1: string) => void; }, next: () => void) => {
        await routeAll(res);
        title = 'New project';
        console.log('New -  url : ', req.url, ' method : ', req.method);

        next();

    })
    .get((req: any, res: { end: (arg0: string) => void; }) => {
        res.end(html(title, ProjectCreate()));
    })
    .post(async (req: any, res: {
        statusCode: number;
        end: (arg0: string) => void; }) => {
        // console.log(req.params.id, 'post ', req.body)
        let newProject = ProjectResponse(req.body);
        if (newProject) {
            await projectNew(newProject).then(async sqlResponse => {
                message = sqlResponse
                    ? {type: 'success', content: 'The project has been added successfully'}
                    : {type: 'Error', content: 'The project not has been added successfully'};

                return (await projectNew);
            }).catch(error => { // reject()
                res.statusCode = 400;
                message = {type: 'error', content: error}
                console.error(error);
            })

            res.end(html(
                title,
                ProjectDetails(newProject),
                message
                )
            );
        }
        res.end(html(
            title,
            ProjectCreate(),
            {type: 'Error', content: 'The project not has been added successfully'}
        ));
    })

// /project/id
Router.route('/:id')
    .all(async (req: any, res: { statusCode: number; setHeader: (arg0: string, arg1: string) => void; }, next: () => void) => {
        id = req.params.id;
        await routeAll(res, id);
        // project = projects.find((p) => (p.id == id)) || null;

        title = 'My project ' + (project?.name || '');
        // console.log('project', project)
        console.log(req.params.id, ' - url : ', req.url, ' method : ', req.method);//, ' , Router : ', Router.stack)

        next();
    })
    .get((req: any, res: { end: (arg0: string) => void; }) => {

        if (project) {
            res.end(html(title, ProjectDetails(project)));
        }
        res.end(html('My projects', ProjectIndex(projects), {
            type: 'Error',
            content: 'Project not find <br />Any project with id = ' + id
        }));

    })
    .delete(async (req: any, res: { statusCode: number;
        setHeader: (arg0: string, arg1: string) => void ;
        end: (arg0: string) => void;
        redirect(s: string): Promise<any>;
    }) => {
        if (project && req.body._token.includes(project.name)) {
            console.info('delete project', project);
            await projectDelete(id).then(async sqlResponse => {
                const msg = req.body._name && req.body._token
                    ? 'the ' + req.body._name + 'project does not exist'
                    : 'You are not authorized to perform this operation'
                ;
                message = sqlResponse
                    ? {type: 'success', content: `Project ${project?.name} has been successfully deleted`}
                    : {type: 'error', content: msg};
                return (await projectDelete);
            }).catch(error => { // reject()
                res.statusCode = 400;
                message = {type: 'error', content: "Error in retrieving data.\nError :"+ error.message}
                console.error(error);
            })

            return res.redirect('/project');
        }
    })
;


// /project/id/edit
Router.route('/:id/edit')
    .all(async (req: any, res: { statusCode: number; setHeader: (arg0: string, arg1: string) => void; }, next: () => void) => {
        id = req.params.id;
        await routeAll(res, id);
        //project = projects.find((p) => (p.id == id)) || null;
        title = 'My project ' + (project ? project.name : '') + ': Edit';
        console.log(req.params.id, ' - url : ', req.url, ' method : ', req.method);

        next();
    })
    .get((req: any, res: { end: (arg0: string) => void; }) => {

        if (project) {
            res.end(html(title, ProjectEdit(project)));
        }
        res.end(html(
            'My projects',
            ProjectIndex(projects),
            {type: 'Error', content: 'Project not find <br />Any project with id = ' + id}
        ));

    })
    .post(async (req: any, res: {
        statusCode: number;
        end: (arg0: string) => void; }) => {
        // console.log(req.params.id, 'post ', req.body)
        let _Project = ProjectResponse(req.body, id);
        console.info('edit _Project : ', _Project,'\nproject : ', project);
        if (_Project && project != null) {
            console.info('edit if project ', project);
            await projectUpdate(id, _Project).then(async sqlResponse => {
                const msg = req.body._name && req.body._token
                    ? 'the ' + req.body._name + 'project does not exist'
                    : 'You are not authorized to perform this operation'
                ;
                message = sqlResponse
                    ? {type: 'success', content: `Project ${project?.name} has been successfully updated`}
                    : {type: 'error', content: msg};

                return (await projectNew);
            }).catch(error => { // reject()
                res.statusCode = 400;
                message = {type: 'error', content: "Error in retrieving data.<br />Error :"+ error.message}
                console.error(error);
            })
            // console.log('Edit project message :',message);
            res.end(html(
                title,
                ProjectDetails(_Project),
                {type: 'success', content: 'The project has been updated successfully'}
                )
            );
        } else if (project) {
            res.end(html(
                title,
                ProjectEdit(project),
                {type: 'Error', content: 'The project has not been updated'}
            ));
        }
        res.end(html(
            'My projects',
            ProjectIndex(projects),
            {type: 'Error', content: 'Project not find <br />Any project with id = ' + id}
        ));

    })
// .put((req: any, res: { end: (arg0: string) => void; }, next: any) => {
//     res.end('When a PUT request is made, then this '
//         + 'is the response sent to the client!');
// })


function ProjectResponse(json: any, id?: number): Project {
    // @ts-ignore
    const languages = json.languages.split(',')
    // console.log('json', json);

    return new Project(
        json.name,
        json.gitRepository,
        json.buildUrl,
        languages,
        json.description,
        id
    );
}

async function routeAll(res: { statusCode: number; setHeader: (arg0: string, arg1: string) => void },
                        id?: number
) {
    res.setHeader('Content-Type', 'text/html');
    if (id) {
        await projectFindById(id).then(
            async (data: Project | null) => {
                project = data;
                // console.log("project.router route(/id):", data);
                res.statusCode = 200;
                return (await projectAll);
            }
        ).catch((error: any) => { // reject()
            res.statusCode = 400;
            message = {type: 'error', content: error}
            console.error(error);
        })
    }
    await projectAll().then(
        async data => {
            projects = data;
            //console.log("project.router route(/):", data);
            res.statusCode = 200;
            message = projects?.length ? null:{type: 'info', content: 'no records found'} ;
            return (await projectAll);
        }
    ).catch(error => { // reject()
        projects = null;
        res.statusCode = 400;
        message = {type: 'error', content: "Error in retrieving data.<br />Error :" + error.message}
        console.error(error);
    })
    // console.log(req.params.id ,' url : ',req.url, ' method : ',req.method, ' , Router : ', Router.stack)

}

