import {Project} from "../models/project";
import {SqliteDatabase} from "../dataAccess/sqlite";


const languages = ['JavaScript', 'C#', 'PHP', 'TypeScript', 'Python', 'Java', 'C++', 'C']

export async function ProjectMigration(faker: boolean) {
    let sql: string;
    console.log('ProjectMigration faker ', faker);
// Sqlite3
// const sqliteDatabase = new SqliteDatabase("./src/data/myDatabase_2.sqlite3.db");
    const sqliteDB = new SqliteDatabase();
    sqliteDB.RenameTable('project',`old_project` );

    sql = `create table IF NOT EXISTS project
           (
               id            INTEGER primary key autoincrement,
               name          VARCHAR(100) UNIQUE not null,
               gitRepository VARCHAR(100)        not null,
               buildUrl      VARCHAR(100),
               languages     JSON,
               description   TEXT
           );`
    ;
    // await sqliteDB.DestroyTable('project');
    await sqliteDB.CreateTable(sql);
    if (faker) {
        await FakerProject(sqliteDB);
    }
    sqliteDB.close();
}

function FakerProject(sqliteDatabase: SqliteDatabase) {


// Sqlite3
    const exampleProject = {
        name: 'project ',
        git: 'git repos ',
        url: 'build url ',
    }
    let list: any[] = [];
    for (let i = 1; i < 10; i++) {
        let nb = Math.floor(Math.random() * Math.floor(languages.length))
        let lang: string[] = [];
        do {
            let language = languages[Math.floor(Math.random() * Math.floor(languages.length))]
            if (!lang.includes(language))
                lang.push(language)
        } while (lang.length < nb)
        const project = new Project(
            exampleProject.name + i,
            exampleProject.git + i,
            exampleProject.url + i,
            lang,
            `My ${i} ${
                i > 3 ? 'th' : i === 3 ? 'rd' : i === 2 ? 'nd' : 'st'
            } project`,
            i
        );
        list.push(project)
    }

    const sqlInsert = `INSERT INTO project
    (name, gitRepository, buildUrl, languages, description)
    VALUES ${'\n\t ' +
    list.map(
        p => `('${
            p.name
        }','${
            p.gitRepository
        }',${
            p.buildUrl ? "'" + p.buildUrl + "'" : null
        },${
            p.languages.length ? "'" + JSON.stringify(p.languages) + "'" : null
        },${
            p.description ? "'" + p.description + "'" : null
        })`
    )
        .join(',\n\t ')
    }
    ;`;
    sqliteDatabase.database.serialize(async () => {
        await sqliteDatabase.database.run(sqlInsert, (err) => {
                let response = "Sqlite Insert success : Successful Insert values to database "
                if (err) {
                    response = "Sqlite Insert error : " + err.message;
                }
                console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n' +
                    'FakerProject : ', response);
            }
        );
    })

}

export const projectAll = async () => {
    return new Promise<Project[]>((resolve, reject) => {
        let data: Project[] = [];
        const sqliteDB = new SqliteDatabase();
        sqliteDB.database.all("SELECT * FROM project", function (err, rows) {
            if (err) {
                // @ts-ignore
                console.error("Error in retrieving data.\nError :", err);
                // @ts-ignore
                reject(err);
            }
            // console.log('projectAll rows ', rows);
            if (rows) {
                rows.forEach(function (row) {
                    data.push(
                        new Project(
                            row.name,
                            row.gitRepository,
                            row.buildUrl,
                            JSON.parse(row.languages || '[]'),
                            row.description,
                            row.id)
                    );
                });
                // console.log('export const projectAll', data)
            }
            resolve(data);
        });
        sqliteDB.close();
    });
}

export const projectFindById = async (id: number) => {
    return new Promise<Project>((resolve, reject) => {
            const sqliteDB = new SqliteDatabase();
            sqliteDB.database.get(`SELECT * FROM project WHERE id=${id}`,
                function (err, row) {
                    if (err) {
                        // @ts-ignore
                        reject("Error in retrieving data.\nError :", err.message);
                    }
                    console.log(row);
                    if (row) {
                        resolve(
                            new Project(
                                row.name,
                                row.gitRepository,
                                row.buildUrl,
                                JSON.parse(row.languages || '[]'),
                                row.description,
                                row.id
                            )
                        )
                    } else {
                        // @ts-ignore
                        reject("Error in retrieving data.\nError : project not fond");
                    }
                });
            sqliteDB.close();
        }
    )
        ;
}

export const projectNew = async (project: Project) => {
    return new Promise<boolean>((resolve, reject) => {
        let sqlResponse = true;
        const sqliteDB = new SqliteDatabase();
        const sqlInsert = `INSERT INTO project
                (name, gitRepository, buildUrl, languages, description)
            VALUES ${'\n\t ' +
            `('${
                project.name
            }','${
                project.gitRepository
            }',${
                project.buildUrl ? "'" + project.buildUrl + "'" : null
            },${
                project.languages.length ? "'" + JSON.stringify(project.languages) + "'" : null
            },${
                project.description ? "'" + project.description + "'" : null
            })`
            }
            ;`
        ;

        sqliteDB.database.run(sqlInsert, (err) => {
                if (err) {
                    sqlResponse = false;
                    // @ts-ignore
                    reject(err);
                }
                resolve(sqlResponse);
                sqliteDB.close();
            }
        )
        ;
    });
}

export const projectUpdate = async (id: number, project: Project) => {
    return new Promise<boolean>((resolve, reject) => {
        let sqlResponse = true;
        const sqliteDB = new SqliteDatabase();
        const sql = `
            UPDATE project
            SET name = ${project.name ? "'" + project.name + "'" : null},
                gitRepository = ${project.gitRepository ? "'" + project.gitRepository + "'" : null},
                buildUrl = ${project.buildUrl ? "'" + project.buildUrl + "'" : null},
                languages = ${project.languages.length ? "'" + JSON.stringify(project.languages) + "'" : null},
                description = ${project.description ? "'" + project.description + "'" : null}
            WHERE
                id = ${id}            
            ;`
        ;

        console.log('export const projectUpdate', sql)

        sqliteDB.database.run(sql, (err) => {
                if (err) {
                    sqlResponse = false;
                    // @ts-ignore
                    reject(err);
                }
                resolve(sqlResponse);
                sqliteDB.close();
            }
        )
        ;
    });
}
export const projectDelete = async (id: number) => {
    return new Promise<boolean>((resolve, reject) => {
        let sqlResponse = true;
        const sqliteDB = new SqliteDatabase();
        const sql = `DELETE FROM project WHERE id=${id};`;

        sqliteDB.database.run(sql, (err) => {
                if (err) {
                    sqlResponse = false;
                    // @ts-ignore
                    reject(err);
                }
                resolve(sqlResponse);
                sqliteDB.close();
            }
        )
        ;
    });
}

export const projects: Project[] = [];
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

