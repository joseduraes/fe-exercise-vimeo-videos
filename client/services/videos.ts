import { VideosGetResponse } from '../models/VideosGetResponse';
import { VideosGetRequest } from '../models/VideosGetRequest';
import { ApiClient } from './apiClient';

class VideosService {

    private baseUrl;

    constructor(params: {baseUrl :string}){
        this.baseUrl = params.baseUrl;
    }

    public get(params?: VideosGetRequest): Promise<VideosGetResponse>{
        return ApiClient.makeRequest(this.baseUrl, {method: 'get', requiresAuth: true});
    }
}

export const Videos = new VideosService({
    baseUrl: 'https://api.vimeo.com/channels/top/videos'
});