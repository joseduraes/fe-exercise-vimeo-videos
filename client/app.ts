import * as Vue from 'vue';
import { VideosMockApi as Videos } from './services/videos/VideosMockApi';
import { VideosGetResponse } from './models/VideosGetResponse';
import { VideoInfo } from './models/VideoInfo';

type selector = string;

interface Templates {
    videoSearch: selector
}

interface AppModel {
    resultsPerPage: number
    filterSearchTerm: string
    filterPopularUsers: boolean
    isLoading: boolean
    results: VideosGetResponse
}

export class App {

    private app: Vue;
    private root: selector;
    private templates: Templates;

    constructor(params:{root: selector, templates: Templates}){
        this.root = params.root; 
        this.templates = params.templates;
        this.init();
    }

    private init(){
        this.app = new Vue({
            el: this.root,
            template: this.templates.videoSearch,
            data: {
                resultsPerPage: 10,
                filterSearchTerm: '',
                filterPopularUsers: false,
                isLoading: false,
                results: {
                    total: 0
                }
            } as AppModel,
            methods: {
                search: () => {
                    return this.search();
                },
                goToNextPage: () => {   
                    return this.goToNextPage();
                },
                goToPreviousPage: () => {
                    return this.goToPreviousPage();
                },
                hasPreviousPage: () => {
                    return this.hasPreviousPage();
                },
                hasNextPage: () => {
                    return this.hasNextPage();
                }
            },
            watch: {
                filterPopularUsers: (val, oldVal) => {
                    return this.search();
                },
                resultsPerPage: (val, oldVal) => {
                    return this.search(null, true);
                }
            }
        });
    }

    private search = (page?: number, noScroll?: boolean) => {
        this.app.$data['isLoading'] = true; 

        Videos.getVideos({
            per_page: this.app.$data['resultsPerPage'],
            query: this.app.$data['filterSearchTerm'] || null,
            page: page || null,
            direction: 'desc',
            },
            this.app.$data['filterPopularUsers']
        ).then((response) => {
            this.app.$data['results'] = response;
            this.handleResultsFinishedLoading(noScroll);
        }).catch(() => {
            this.handleResultsFinishedLoading();
        });
    }

    private handleResultsFinishedLoading = (noScroll?: boolean) => {
        this.app.$data['isLoading'] = false; 
        if (!noScroll){
            window.scrollTo(0, 0);
        }
    }

    private goToPreviousPage = () => {
        const results: VideosGetResponse = this.app.$data['results'];
        const page = results.page;
        if (page && this.hasPreviousPage()){
            this.search(page-1);
        }
    }

    private goToNextPage = () => {
        const results: VideosGetResponse = this.app.$data['results'];
        const page = results.page;
        if (page && this.hasNextPage()){
            this.search(page+1);
        }
    }

    private hasPreviousPage = () => {
        const results = this.app.$data['results'] as VideosGetResponse;
        return results && results.paging && results.paging.previous;
    }

    private hasNextPage = () => {
        const results = this.app.$data['results'] as VideosGetResponse;
        return results && results.paging && results.paging.next;
    }
}