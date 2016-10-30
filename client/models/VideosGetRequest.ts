import { SortingDirection } from './SortingDirection';
import { SortingCriteria } from './SortingCriteria';
import { SortingFilter } from './SortingFilter';

export interface VideosGetRequest {
    page?: number,
    per_page?: number,
    query?: string,
    filter?: SortingFilter.SortingFilter,
    filter_emveddable?: boolean,
    sort?: SortingCriteria.SortingCriteria
    direction?: SortingDirection.SortingDirection
}