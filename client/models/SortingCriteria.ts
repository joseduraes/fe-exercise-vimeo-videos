export namespace SortingCriteria {
    
    export type Default = 'default'; 
    export type Date = 'date';
    export type Alphabetical = 'alphabetical';
    export type Plays = 'plays';
    export type Likes = 'likes';
    export type Comments = 'comments';
    export type Duration = 'duration';
    export type Added = 'modified_time';
    export type Manual = 'manual';

    export type SortingCriteria = Default | Date | Alphabetical | Plays | Likes | Comments | Duration | Added | Manual; 
}