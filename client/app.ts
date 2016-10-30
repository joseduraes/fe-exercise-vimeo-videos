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

        this.debouncedFetchResults = lodash.debounce(this.fetchResults, 100);
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

    private search = (page?: number, noScroll?: boolean) => {

        if (this.app.$data['resultsBackend'] == 'mock'){
            return this.fetchResults(VideosMockApi, page, noScroll);
        }
        return this.debouncedFetchResults(VideosApi, page, noScroll);
    }

    private fetchResults(videoSrv: VideosApiSpec, page: number, noScroll: boolean){
        this.app.$data['isLoading'] = true; 
        this.app.$data['errorMessage'] = ''; 
        
        return videoSrv.getVideos({
            per_page: this.app.$data['resultsPerPage'],
            query: this.app.$data['filterSearchTerm'] || null,
            page: page || null,
            direction: 'desc',
            },
            this.app.$data['filterPopularUsers']
        ).then((response) => {
            this.app.$data['results'] = response;
            this.handleResultsFinishedLoading(noScroll);
        }).catch((err) => {
            this.app.$data['results'] = [];
            this.app.$data['errorMessage'] = err;
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