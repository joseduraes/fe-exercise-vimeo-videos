import { VimeoAuthorization, AccessTokenResponse } from './authorization';
import { Videos } from './videos';

interface RequestParams {
    requiresAuth: boolean
    method: string
}

class ApiClientService {

    private authToken: AccessTokenResponse;

    public makeRequest(url, params: RequestParams){

        const headers = params.requiresAuth && this.isAuthenticated() ?
            {'Authorization': `${this.authToken.token_type} ${this.authToken.access_token}`}
            :
            {}

        if (params.requiresAuth && !this.isAuthenticated()){
            return this.authenticateWithPublicToken().then(
                () => { return this.makeRequest(url, params) })
        }

        return window.fetch(url, {
            method: params.method, headers: headers
        }).then((response) => {
            return response.json();
        });
    }

    private authenticateWithPublicToken(){
        return VimeoAuthorization.getUnauthenticatedAccessToken().then((response) => {
            this.authToken = response;
        }).catch(() => {
            throw('authentication failed')
        });
    }
  
    private isAuthenticated(){
        return this.authToken != null;
    }
    
}

export const ApiClient = new ApiClientService();