import { Paging } from './Paging';

export class VideosGetResponse {

    total: number
    page: number
    paging: Paging
    
    public hasNextPage(): boolean {
        return !!this.paging.next
    }

    public hasPreviousPage(): boolean {
        return !!this.paging.previous
    }
}