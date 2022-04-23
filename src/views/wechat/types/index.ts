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
