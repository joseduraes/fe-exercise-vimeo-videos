import { VideosGetResponse } from '../models/VideosGetResponse';
import { VideosGetRequest } from '../models/VideosGetRequest';
import { Authorization, VimeoAuthorization } from './authorization';

class VideosService {

    private baseUrl;
    private authorization: Authorization;

    constructor(params: {baseUrl :string, authorization: Authorization}){
        this.baseUrl = params.baseUrl;
        this.authorization = params.authorization;
    }

    public get(params?: VideosGetRequest): Promise<VideosGetResponse>{

        return this.authorization.getUnauthenticatedAccessToken().then((response) => {
            
            return window.fetch(this.getBaseUrl(), {
                method: 'get', headers: {'Authorization': `${response.token_type} ${response.access_token}`}
            }).then(
                (result: Response) => {
                    return result.json();
                }
            )            
        });
    }

    private getBaseUrl(){
        return this.baseUrl;
    }
}

export const Videos = new VideosService({
    baseUrl: 'https://api.vimeo.com/channels/top/videos',
    authorization: VimeoAuthorization
});