import { Paging } from './Paging';

export class VideosGetResponse {

    total: number
    page: number
    paging: Paging
    
    public hasNextPage(): boolean {
        return this.page < this.total
    }

    public hasPreviousPage(): boolean {
        return this.page > 1
    }
}