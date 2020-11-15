import {Project} from "../models/project";
import {projects} from "../database/project.data";
import {ProjectIndex} from "../views/project";
import {ProjectCreate} from "../views/project/create";
import {ProjectDetails} from "../views/project/details";
import {ProjectEdit} from "../views/project/edit";
import {html} from "../views/Layout";


const express = require('express');
export const Router = express.Router();
let project: Project | null;
let id: number = 0;
let title: string;


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
    .all((req: any, res: { statusCode: number; setHeader: (arg0: string, arg1: string) => void; }, next: () => void) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        title = 'My projects';
        //console.log('Router : ', Router)
        next();
    })
    .get((req: any, res: { end: (arg0: string) => void; }, next: any) => {
        const message = {type:'info',content:'no records found'}
        res.end(html(title, ProjectIndex(),projects.length==0?{type:'info',content:'no records found'}:null )
        );
    })


// /project/new
Router.route('/new')
    .all((req: any, res: { statusCode: number; setHeader: (arg0: string, arg1: string) => void; }, next: () => void) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        title = 'New project';
        // console.log(req.params.id ,' url : ',req.url, ' method : ',req.method, ' , Router : ', Router.stack)

        next();
    })
    .get((req: any, res: { end: (arg0: string) => void; }, next: any) => {
        res.end(html(title, ProjectCreate()));
    })
    .post((req: any, res: { end: (arg0: string) => void; }, next: any) => {
        // console.log(req.params.id, 'post ', req.body)
        let newProject = ProjectResponse(req.body);
        if (newProject) {
            projects.push(newProject);
            res.end(html(
                title,
                ProjectDetails(newProject),
                {type: 'success', content: 'The project has been added successfully'}
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
    .all((req: any, res: { statusCode: number; setHeader: (arg0: string, arg1: string) => void; }, next: () => void) => {
        id = req.params.id;
        project = projects.find((p) => (p.id == id));
        title = 'My project ' + (project ? project.name : '');
        // console.log('project', project)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        console.log(req.params.id, ' url : ', req.url, ' method : ', req.method);//, ' , Router : ', Router.stack)

        next();
    })
    .get((req: any, res: { end: (arg0: string) => void; }, next: any) => {

        if (project) {
            res.end(html(title, ProjectDetails(project)));
        }
        res.end(html('My projects', ProjectIndex(), {
            type: 'Error',
            content: 'Project not find <br />Any project with id = ' + id
        }));

    })
    .delete((req: any, res: { end: (arg0: string) => void; }, next: any) => {
        if (project && req.body._token.includes(project.name)) {
            projects.splice(projects.indexOf(project), 1);
            console.log(req.params.id, 'delete :', req.body);
            res.end(html(
                'My projects',
                ProjectIndex(),
                {type: 'success', content: 'Project ' + project.name + 'has been successfully deleted'}
            ));
        }
        const message = req.body._name && req.body._token
            ? 'the ' + req.body._name + 'project does not exist'
            : 'You are not authorized to perform this operation'
        ;
        res.end(html(
            'My projects',
            ProjectIndex(),
            {type: 'error', content: message}
        ))
    })
;


// /project/id/edit
Router.route('/:id/edit')
    .all((req: any, res: { statusCode: number; setHeader: (arg0: string, arg1: string) => void; }, next: () => void) => {
        id = req.params.id;
        project = projects.find((p) => (p.id == id));
        title = 'My project ' + (project ? project.name : '') + ': Edit';
        // console.log('project', project)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        console.log(req.params.id, ' url : ', req.url, ' method : ', req.method);

        next();
    })
    .get((req: any, res: { end: (arg0: string) => void; }, next: any) => {

        if (project) {
            res.end(html(title, ProjectEdit(project)));
        }
        res.end(html(
            'My projects',
            ProjectIndex(),
            {type: 'Error', content: 'Project not find <br />Any project with id = ' + id}
        ));

    })
    .post((req: any, res: { end: (arg0: string) => void; }, next: any) => {
        // console.log(req.params.id, 'post ', req.body)
        let _Project = ProjectResponse(req.body, id);
        if (_Project) {
            const index = projects.indexOf(project)
            projects[index] = _Project
            // @ts-ignore
            res.end(html(
                title,
                ProjectDetails(projects[index]),
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
            ProjectIndex(),
            {type: 'Error', content: 'Project not find <br />Any project with id = ' + id}
        ));

    })
// .put((req: any, res: { end: (arg0: string) => void; }, next: any) => {
//     res.end('When a PUT request is made, then this '
//         + 'is the response sent to the client!');
// })


function ProjectResponse(json: any, id?: number): Project {
    // @ts-ignore
    json.languages = json.languages.split(',')
    // console.log('json', json);

    return new Project(
        json.name,
        json.gitRepository,
        json.buildUrl,
        json.languages,
        json.description,
        id ? id : projects.length + 1
    );
}

