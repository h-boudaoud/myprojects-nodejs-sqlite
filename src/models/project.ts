// Class project

export class Project {
    private readonly _id ?: number;
    private _name: string;
    private _gitRepository: string;
    private _buildUrl: string;
    private _languages: string[];
    private _description ?: string | null;

    constructor(
        name: string,
        gitRepository: string,
        buildUrl: string,
        languages: string[],
        description?:  string,
        id?: number,
    ) {
        if(id){
            this._id = id;
        }
        this._languages = languages;
        this._name = name;
        this._gitRepository = gitRepository;
        this._buildUrl = buildUrl;
        if(description){
            this._description = description;
        }
    }

    get id(): number | null {
        return this._id || null;
    }

    get languages(): string[] {
        return this._languages;
    }

    set languages(value: string[]) {
        this._languages = value;
    }

    get description(): string | null  {
        return this._description || null;
    }

    set description(value:  string | null  ) {
        this._description = value || null;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get gitRepository(): string {
        return this._gitRepository;
    }

    set gitRepository(value: string) {
        this._gitRepository = value;
    }

    get buildUrl(): string {
        return this._buildUrl;
    }

    set buildUrl(value: string) {
        this._buildUrl = value;
    }

    addLanguage(value: string | string[]) {

        if ( typeof value ==='string' && value.length > 0 && !this._languages.includes(value)) {
            this._languages.push(value);
        }else if(value && Array.isArray(value) && value.length > 0){
            value.forEach((item)=>{
                if (item.length > 0 && !this._languages.includes(item)) {
                    this._languages.push(item);
                }
            })
        }
        return this;
    }

    removeLanguage(value: string) {
        if (this._languages.includes(value)) {
            let index = this._languages.indexOf(value);
            this._languages.splice(index, 1);
        }
        return this;

    }



    toJSON() {
        return {
            id: this._id || null,
            name: this._name,
            gitRepository: this._gitRepository,
            buildUrl: this._buildUrl,
            languages: this._languages,
            description: this._description || null,
        };
    }
}
