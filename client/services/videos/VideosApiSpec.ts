import { VideosGetRequest } from '../../models/VideosGetRequest';
import { VideosGetResponse } from '../../models/VideosGetResponse';

export interface VideosApiSpec {
    getVideos(params: VideosGetRequest, filterPopularUsers: boolean): Promise<VideosGetResponse>
}