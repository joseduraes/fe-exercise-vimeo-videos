import { VideosGetRequest } from '../../models/VideosGetRequest';
import { VideosGetResponse } from '../../models/VideosGetResponse';
import { ApiClient } from '../apiClient';
import { VideosApiSpec } from './VideosApiSpec';

class Videos implements VideosApiSpec {

    private baseUrl;

    constructor(params: {baseUrl :string}){
        this.baseUrl = params.baseUrl;
    }

    public getVideos(params: VideosGetRequest, filterPopularUsers: boolean): Promise<VideosGetResponse>{
        
        return ApiClient.makeRequest(
            this.baseUrl, {
                query: Object.assign({}, params),
                method: 'get',
                requiresAuth: true
            }
        );
    }
}

export const VideosApi = new Videos({
    baseUrl: 'https://api.vimeo.com/channels/top/videos'
});