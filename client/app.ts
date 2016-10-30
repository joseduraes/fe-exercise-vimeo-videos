import * as Vue from 'vue';
import { VideosMockApi } from './services/videos/VideosMockApi';
import { VideosGetResponse } from './models/VideosGetResponse';
import { VideoInfo } from './models/VideoInfo';
import * as lodash from 'lodash';
import { VideosApiSpec } from './services/videos/VideosApiSpec';
import { VideosApi } from './services/videos/VideosApi';

type selector = string;

interface Templates {
    videoSearch: selector
}

interface AppModel {
    errorMessage: string
    resultsPerPage: number
    filterSearchTerm: string
    filterPopularUsers: boolean
    isLoading: boolean
    results: VideosGetResponse
    resultsBackend: "mock" | "vimeo"
}

export class App {

    private app: Vue;
    private root: selector;
    private templates: Templates;
    private debouncedFetchResults;

    constructor(params:{root: selector, templates: Templates}){
        this.root = params.root; 
        this.templates = params.templates;
        this.debouncedFetchResults = lodash.debounce(this.fetchResults, 250);
        this.init();
        this.search();
    }

    private init(){
        this.app = new Vue({
            el: this.root,
            template: this.templates.videoSearch,
            data: {
                errorMessage: '',
                resultsPerPage: 10,
                resultsBackend: "mock", 
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
                filterSearchTerm: (val, oldVal) => {
                    return this.search();
                },
                filterPopularUsers: (val, oldVal) => {
                    return this.search();
                },
                resultsPerPage: (val, oldVal) => {
                    return this.search(null, true);
                },
                resultsBackend: (val, oldVal) => {
                    return this.search();
                }
            }
        });
    }

    get appModel(){
        return this.app.$data as AppModel;
    }

    private search = (page?: number, noScroll?: boolean) => {

        if (this.appModel.resultsBackend == 'mock'){
            return this.fetchResults(VideosMockApi, page, noScroll);
        }
        return this.debouncedFetchResults(VideosApi, page, noScroll);
    }

    private fetchResults(videoSrv: VideosApiSpec, page: number, noScroll: boolean){
        this.appModel.isLoading = true; 
        this.appModel.errorMessage = ''; 
        
        return videoSrv.getVideos({
            per_page: this.appModel.resultsPerPage,
            query: this.appModel.filterSearchTerm || null,
            page: page || null,
            direction: 'desc',
            sort: 'likes'
            },
            this.appModel.filterPopularUsers
        ).then((response) => {
            this.handleResultsFinishedLoading(response, noScroll);
        }).catch((err) => {
            this.appModel.errorMessage = err;
            this.handleResultsFinishedLoading(null);
        });
    }

    private handleResultsFinishedLoading = (response: VideosGetResponse, noScroll?: boolean) => {
        this.appModel.results = response;
        this.appModel.isLoading = false; 

        if (!noScroll){
            window.scrollTo(0, 0);
        }
    }

    private goToPreviousPage = () => {
        const page = this.appModel.results.page;
        if (page && this.hasPreviousPage()){
            this.search(page-1);
        }
    }

    private goToNextPage = () => {
        const page = this.appModel.results.page;
        if (page && this.hasNextPage()){
            this.search(page+1);
        }
    }

    private hasPreviousPage = () => {
        const results = this.appModel.results;
        return results && results.paging && results.paging.previous;
    }

    private hasNextPage = () => {
        const results = this.appModel.results;
        return results && results.paging && results.paging.next;
    }
}