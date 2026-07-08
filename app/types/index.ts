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

export type ChatSummary = {
  id: string
  title: string | null
  createdAt: Date
  updatedAt: Date
}

export type ChatMessageRecord = {
  id: string
  role: string
  content: string
  createdAt: Date
}

export type ChatDetail = ChatSummary & {
  messages: ChatMessageRecord[]
}