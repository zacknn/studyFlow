export interface LinkEntry{
    id : string ,
    url : string,
    label : string ,
}

export interface FileEntry {
  id: string,
  url: string,        
  name: string,
  sizeFormatted: string,
  sizeBytes: number,       
  mimeType: string,
}