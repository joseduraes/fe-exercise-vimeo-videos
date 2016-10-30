import { Paging } from './Paging';
import { VideoInfo } from './VideoInfo';

export interface VideosGetResponse {
    total: number
    page: number
    paging: Paging
    data: VideoInfo[]
}