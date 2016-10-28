import * as Vue from 'vue';

export class App {

    private app: Vue;
    private root: HTMLElement;

    constructor(root: HTMLElement){
        this.root = root; 
        this.init();
    }

    private init(){
        this.app = new Vue({
            el: this.root,
            data: {
            } 
        });
    }
}