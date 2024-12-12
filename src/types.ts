export type File = {
    name: string;
    id: string;
    lastUpdatedTime: string;
    publicUrl: string;
}

export type SearchResponse = {
    files: File[]
}