/**
 * 保留小数位数
 * @param {*} num
 * @param {*} decimals
 * @param {*} isZero 是否去去除小数点后的0
 * @returns
 */
export function toFixed(num, decimals, isZero) {
  const str = num.toFixed(decimals);
  const regexp = /(?:\.0*|(\.\d+?)0+)$/;
  return isZero ? str.replace(regexp, '$1') : str;
}
/**
 * 获取屏幕可视区域
 * @returns
 */
export function getWinClient() {
  return {
    width: document.body.clientWidth || document.documentElement.clientWidth || window.innerWidth,
    height:
      document.body.clientHeight || document.documentElement.clientHeight || window.innerHeight,
  };
}

export function dealFileSize(fileSize) {
  const size = fileSize || 0;
  const left = size / 1024 / 1024;
  return left > 1
    ? ''.concat(toFixed(left, 2, true), 'M')
    : ''.concat(toFixed(size / 1024, 2, true), 'K');
}

export function isImage(type) {
  return /(jpeg|jpg|png|gif)/i.test(type);
}

export function isVideo(type) {
  return ['mp4', 'webm', 'ogg'].includes(type);
}

export function isAudio(type) {
  return ['wave', 'acc', 'wav', 'ogg', 'mp3'].includes(type);
}

export function getFileType(fileName) {
  return fileName.substring(fileName.lastIndexOf('.') + 1);
}

/**
 * 获取文件icon
 * @param {*} fileType
 * @returns
 */
export function fileTypeIcon(fileType) {
  if (!fileType) return 'unknown';
  fileType = fileType.trim().toLowerCase();
  const map = [
    'doc',
    'docx',
    'dotx',
    'dot',
    'docm',
    'dotm',
    'xps',
    'mht',
    'mhtml',
    'rtf',
    'xml',
    'odt',
    'pdf',
    'ppt',
    'pptx',
    'xls',
    'xlsx',
    'xlsb',
    'xlsm',
    'xlst',
    'jpg',
    'jpeg',
    'png',
    'gif',
    'bmp',
    'jpeg2000',
    'mp4',
    'avi',
    'rm',
    'rmvb',
    'wmv',
    'f4v',
    'flv',
    'mid',
    'mpeg',
    'mpg',
    'dat',
  ];
  return map.indexOf(fileType) === -1 ? 'unknown' : fileType;
}

/**
 * 判断是否为空对象
 * @param {*} obj
 * @returns
 */
export function isEmptyObj(obj) {
  return JSON.stringify(obj) === '{}';
}
