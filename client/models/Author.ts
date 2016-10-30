export interface Author {

    uri: string
    link: string
    pictures: {
        sizes: {
            width: number
            height: number
            link: string
        }[]
    }
    metadata: {
        connections: {
            likes: {
                total: number
            }
        }
    }
}