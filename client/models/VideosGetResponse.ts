import { Paging } from './Paging';
import { VideoInfo } from './VideoInfo';

export class VideosGetResponse {

    total: number
    page: number
    paging: Paging
    data: VideoInfo[]
    
    public hasNextPage(): boolean {
        return !!this.paging.next
    }

    public hasPreviousPage(): boolean {
        return !!this.paging.previous
    }
}