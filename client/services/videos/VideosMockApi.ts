declare var require: any

import { VideosGetResponse } from '../../models/VideosGetResponse';
import { VideosGetRequest } from '../../models/VideosGetRequest';
import { VideosApiSpec } from './VideosApiSpec';
import { VideoInfo } from '../../models/VideoInfo';

const mockResponse = require('../../resources/mockVideosApiResponse.json') as VideosGetResponse;

class Videos implements VideosApiSpec {

    public getVideos(params: VideosGetRequest, filterPopularUsers: boolean): Promise<VideosGetResponse>{
        const paginatedResponse = this.buildPaginatedResponse(
            this.filterResponseData(mockResponse.data, params, filterPopularUsers),
            params.page || 1, params.per_page || 50);

        return new Promise((resolve, reject) => {
            resolve(paginatedResponse)
        });
    }

    private filterResponseData(data: VideoInfo[], params: VideosGetRequest, filterPopularUsers: boolean){
        const searchTerm = params.query != null ? params.query.toLocaleLowerCase() : params.query; 
        
        if(searchTerm || filterPopularUsers){
            return data.filter((video) => {

                const matchesName = searchTerm ?
                    video.description && video.description.toLocaleLowerCase().includes(searchTerm)
                    :
                    true;
                
                const matchesMinimumLikes = !!filterPopularUsers ?
                    video.user.metadata.connections.likes.total > 0
                    :
                    true;
                
                return matchesName && matchesMinimumLikes;
            })
        }
        return data;
    }

    private buildPaginatedResponse(data: VideoInfo[], page: number, perPage: number): VideosGetResponse {
        const start = (page - 1) * perPage;
        const end = page * perPage;
        const paginatedData = data.slice(start, end);
        
        return {
            total: data.length,
            page: page,
            paging: {
                next: data.length > end ? 'http://fakenexturl' : null,
                previous: data.length < start ? 'http://fakenexturl' : null
            },
            data: paginatedData
        }
    }
}

export const VideosMockApi = new Videos();