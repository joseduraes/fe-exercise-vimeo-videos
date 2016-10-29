import * as Vue from 'vue';
import { Videos } from './services/videos';

type selector = string;

interface Templates {
    videoSearch: selector
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
            },
            methods: {
                
                search: () => {
                    console.log('search');
                    Videos.get().then((response) => {
                        console.log(response);
                    });
                }
            }
        });
    }
}