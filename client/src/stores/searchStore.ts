import { observable, action, computed } from 'mobx';
import * as superagent from 'superagent';


export interface DicoEntry {
    id : string;
    term : string;
    nature : string;
    definitions: string[];
}


export class SearchStore {

    @observable dataLoaded: boolean = false;
    @observable loading: boolean = false;
    //Database 
    public allDicoEntriesMap: Map<string, DicoEntry> = new Map();
    //Info for display
    @observable searchResults: DicoEntry[];
    @observable lastKeyword: string = "";
    @observable public searchInput: string = "";
    

    constructor() {
    }

    onSearchKeywordChange(filter: string): void {
        this.searchInput = filter;
    }

    @action
    searchDico(): void {
        if (this.dataLoaded && this.lastKeyword ==  this.searchInput) {
            return;
        }
        this.lastKeyword =  this.searchInput;
        this.dataLoaded = false;
        this.loading = true;
        superagent.get("http://localhost:3000" + "/search")
            .query({ query:  this.searchInput })
            .end(action((err, res) => {
                const body = res.body;
                this.loading = false;
                if (body) {
                    this.makeInfos(body);
                    this.dataLoaded = true;
                }
            }))
    }

    

    @action
    makeInfos(body: any): void {
        this.allDicoEntriesMap = new Map();

        if (body.hits !== undefined) {
            this.searchResults = [];
            body.hits.forEach((hit: any) => {
                let entry : DicoEntry = {
                    id :hit._id,
                    term:hit._source.term,
                    nature:hit._source.nature,
                    definitions:hit._source.definitions
                };
                this.searchResults.push(entry);
                this.allDicoEntriesMap.set(entry.id, entry);
            });
        }
       
    }

    @action 
    changeSelectedDicoEntryId(id: string): void {
    }


    getDicoEntryTerm(id: string): string {
        return this.allDicoEntriesMap.get(id).term;
    }

    getDicoEntryNature(id: string): string {
        return this.allDicoEntriesMap.get(id).nature;
    }

    getDicoEntryDefinitions(id: string): string[] {
        return this.allDicoEntriesMap.get(id).definitions;
    }
}