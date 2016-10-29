import 'whatwg-fetch';
import { App } from './app';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/app.css';

const app = new App({
    root: '#app',
    templates: {
        videoSearch: '#video-search-template'
    }
});