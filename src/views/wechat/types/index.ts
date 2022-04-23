export interface MediaProps {
  baseUrl: string;
  title?: string;
  content?: number;
  imageUrl?: string;
  fileSize?: number;
  width?: number;
  height?: number;
  durationTime?: number;
  [propName: string]: any;
}

export interface EmojiItem {
  id: number;
  cn: string;
  hk: string;
  us: string;
  code: string;
  web_code: string;
  style: string;
}

export interface EmojiIndexItem {
  idx: number;
  code: string;
  type: number;
  value?: string;
}
export interface ContentItem {
  type: number;
  content: string;
  imageClass?: string;
}
