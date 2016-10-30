import { VimeoAuthorization, AccessTokenResponse } from './authorization';
import { VideosApi } from './videos/VideosApi';

interface RequestParams {
    requiresAuth: boolean
    method: string
    body?: string 
    query?: {[key: string]: string}
}

class ApiClientService {

    private authToken: AccessTokenResponse;
    private authenticationInProgress?: Promise<void>;

    public makeRequest(url, params: RequestParams){

        const headers = params.requiresAuth && this.isAuthenticated() ?
            {'Authorization': `${this.authToken.token_type} ${this.authToken.access_token}`}
            :
            {}

        if (params.requiresAuth && !this.isAuthenticated()){
            return this.authenticateWithPublicToken().then(
                () => { return this.makeRequest(url, params)
            }).catch((err) => {
                throw err;
            });
        }

        if (params.query){
            const queryString = this.buildQueryString(params.query);
            url = queryString.length > 0 ? `${url}?${queryString}` : url;
        }

        return window.fetch(url, {
            method: params.method, headers: headers
        }).then((response) => {
            return response.json();
        });
    }
 
    private authenticateWithPublicToken(): Promise<any>{

        if(this.authenticationInProgress != null){
            return this.authenticationInProgress;
        }

        this.authenticationInProgress = VimeoAuthorization.getUnauthenticatedAccessToken().then((response) => {
            this.authenticationInProgress = null;
            this.authToken = response;
        }).catch((err) => {
            this.authenticationInProgress = null;
            throw(err)
        });
        
        return this.authenticationInProgress;
    }
  
    private isAuthenticated(){
        return this.authToken != null;
    }
    
    private buildQueryString(query: {[key: string]: string}){
        return Object.keys(query)
        .filter((_key) => { return query[_key] != null })
        .map((key) => {
            return `${key}=${query[key]}`
        }).join("&");
    }
}

export const ApiClient = new ApiClientService();