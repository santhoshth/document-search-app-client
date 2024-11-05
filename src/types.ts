export type File = {
    path: string;
    name: string;
    content: string;
    id: string;
    lastUpdatedTime: string;
    publicUrl: string;
    type: string;
}

export type SearchResponse = {
    files: File[]
}