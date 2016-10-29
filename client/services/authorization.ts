export interface AccessTokenResponse {
    access_token: string
    token_type: string
}

class VimeoAuthorizationService {

    private clientId: string;
    private clientSecret: string;

    constructor(params: {clientId: string, clientSecret: string}){
        this.clientId = params.clientId;
        this.clientSecret = params.clientSecret;
    }
    
    public getUnauthenticatedAccessToken(): Promise<AccessTokenResponse>{

        const encodedCredentials = btoa(`${this.clientId}:${this.clientSecret}`)

        return window.fetch("https://api.vimeo.com/oauth/authorize/client", {
            method: "post",
            headers: {
                "Authorization": `basic ${encodedCredentials}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'grant_type=client_credentials'
        }).then((response) => {
            return response.json();
        })
    }
}

export const VimeoAuthorization = new VimeoAuthorizationService({
    clientId: 'b2ac03321d9c32f847b3a623294595ba577eccf7',
    clientSecret: 'Y0PmnOy0TPcKAZ7y1kD60H0Rf7IXOGwNz34lRtTq8/7xtDLghg1jBxPFzRjj96C2f9ZT4cMP0dYCphM344Ehefii6F7gYJc/9ZMWul14fDvPyrNCXjWpK3/X1uLx7Oma'  
});