import * as Vue from 'vue';
import { Videos } from './services/videos';
import { VideosGetResponse } from './models/VideosGetResponse';

type selector = string;

interface Templates {
    videoSearch: selector
}

interface AppModel {
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
                isLoading: false,
                results: {
                    total: 0
                }
            } as AppModel,
            methods: {
                
                search: () => {
                    Videos.get().then((response) => {
                        this.app.$data['results'] = response;
                    });
                }
            }
        });
    }
}