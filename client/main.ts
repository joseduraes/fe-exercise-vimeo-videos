import { App } from './app';
import * as promise from 'es6-promise';
promise.polyfill();
import 'whatwg-fetch';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/app.css';

const app = new App({
    root: '#app',
    templates: {
        videoSearch: '#video-search-template'
    }
});