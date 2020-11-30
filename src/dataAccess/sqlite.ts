import * as sqlite from 'sqlite3';

const sqlite3 = sqlite.verbose();

const filenameDB = "./src/data/myDatabase.sqlite3.db";
// let db = new sqlite3.Database(filenameDB, (err) => {
//     let response = "Sqlite success : Successful connection to database 'myDatabase.Sqlite3.db'";
//     if (err) {
//         response = 'Sqlite error : ', err.message;
//         //throw err;
//     }
//     console.log(response);
// });

export class SqliteDatabase {
    private readonly _filename: string;
    private  readonly _database:sqlite.Database;

    constructor(filename?: string) {
        this._filename = filename||filenameDB ;
        this._database = new sqlite.Database(this._filename,(err)=>{
            let response = "Sqlite success : Successful connection to database " +
                this._filename
                    .replace('\\','/')
                    .split('/')
                    .find((i)=>i.includes('.db'));
            if (err) {
                response = 'Sqlite error : ' + err.message;
                //throw err;
            }
            console.log(response);
        })
    }

    get database() {
        return this._database;
    }
    CreateTable(sql_create_table: string): string | null {
        let response: string | null = null;
        this._database.serialize(async ()=>{
            await this._database.run(sql_create_table, (err: { message: any; }) => {
                if (err) {
                    response = `Failed to create table\nError :  ${err.message}`;
                }
                response = 'success';
                console.log('CreateTable :', response);
            });
        });
        return response;

    }

    DestroyTable(table: string):  string | null {
        const sql_drop = `DROP TABLE IF EXISTS ${table}`;
        let response: string | null = null;
        this._database.serialize(async ()=> {
            await this._database.run(sql_drop, (err: { message: any; }) => {
                response = 'success';
                if (err) {
                    response = `Failed to destroy ${table} table\nError :  ${err.message}`
                    throw err;
                }
                console.log('DestroyTable :', response);
            });
        });

        return response;
    }

    close(){
        this._database.serialize(()=>this._database.close());

    }


}

