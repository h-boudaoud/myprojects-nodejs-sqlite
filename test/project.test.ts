// const Project = require('../src/models/project')

import {Project} from "../src/models/project";

describe('Project Class ', () => {
    let project = {
            //id: 2,
            name: 'name',
            gitRepository: 'gitRepository',
            buildUrl: 'buildUrl',
            languages: ['languages'],
            description: null //'description',
        }
    ;
    let newProject: Project;
    // @ts-ignore
    beforeEach(() => newProject = new Project(
        project.name,
        project.gitRepository,
        project.buildUrl,
        project.languages,
        //project.description,
        //project.id
        )
    )
    it('should constructor and JSON format ', function () {
        // let newProject = new Project(
        //     project.name,
        //     project.gitRepository,
        //     project.buildUrl,
        //     project.languages,
        //     project.description,
        //     project.id
        // )
        const jsonProject = newProject.toJSON();
        expect(jsonProject).toMatchObject(project);

    });

    it('should set description ', function () {

        const description = 'My description of this project';
        // @ts-ignore
        project.description = description;
        expect(project.description).toBe(description);

    });

    it('should addLanguage "Add languages = [``]" ', function () {
        let languages = ['']
        let lengthLanguages = newProject.languages.length;
        newProject.addLanguage(languages);
        expect(newProject.languages.length).toBe(lengthLanguages);

    });

    it('should addLanguage "Add language =``" ', function () {
        let languages =''
        let lengthLanguages = newProject.languages.length + languages.length;
        newProject.addLanguage(languages);
        expect(newProject.languages.length).toBe(lengthLanguages);

    });

    it('should addLanguage "Add Array languages" ', function () {
        let languages = [
            'lang-1',
            'lang-2',
            'lang-3',
            'lang-4',
            'lang-5',
            'lang-6'
        ]
        let lengthLanguages = newProject.languages.length + languages.length;
        newProject.addLanguage(languages);
        expect(newProject.languages.length).toBe(lengthLanguages);

    });

    it('should addLanguage "Add a new language" ', function () {
        newProject.addLanguage('lang-7');
        expect(newProject.languages.includes('lang-7')).toBe(true);

    });


    it('should addLanguage "Add an language in project.language " ', function () {

        let lengthLanguages = newProject.languages.length;
        newProject.addLanguage('lang-7');
        expect([
            newProject.languages.includes('lang-7'),
            newProject.languages.length
        ]).toMatchObject([true,lengthLanguages]);

    });

    it('should removeLanguage "remove an language in project.language" ', function () {

        let lengthLanguages = newProject.languages.length -1;
        newProject.removeLanguage('lang-7');
        expect([
            newProject.languages.includes('lang-7'),
            newProject.languages.length
        ]).toMatchObject([false,lengthLanguages]);

    });

    it('should removeLanguage "remove an language not in project.language" ', function () {

        let lengthLanguages = newProject.languages.length;
        newProject.removeLanguage('lang-70');
        expect([
            newProject.languages.includes('lang-70'),
            newProject.languages.length
        ]).toMatchObject([false,lengthLanguages]);

    });

})
