export interface VideoProps {
  baseUrl?: string;
  imageUrl?: string;
  width?: number;
  height?: number;
  maxWidth?: number;
  maxHeight?: number;
  fixedWidth?: number; // 固定宽度
  fixedHeigh?: number; // 固定高度
  mimetype?: string; // 文件类型，用于本地视频显示
  durationTime?: number; // 视频时长
  [propName: string]: any;
}
