import { Base64 } from 'js-base64';

/**
 * @param filePath
 * @returns
 */
export function fileExtension(filePath: string) {
  // 获取最后一个.的位置
  const index = filePath.lastIndexOf('.');
  // 获取后缀
  const type = filePath.substr(index + 1);
  // 返回类型
  return type.toLowerCase();
}

/**
 * @param fileName
 */
export function handlePicture(fileName: string) {
  let iconType = '';
  const type = fileExtension(fileName);
  switch (type) {
    case 'doc':
    case 'docx':
      iconType = 'iflorens-word';
      break;
    case 'xlsx':
    case 'xls':
      iconType = 'iflorens-excel';
      break;
    case 'png':
    case 'jpg':
    case 'svg':
      iconType = 'iflorens-image';
      break;
    case 'pdf':
      iconType = 'iflorens-pdf';
      break;
    case 'rar':
    case 'zip':
    case 'arj':
    case 'z':
    case 'jar':
    case 'lzh':
      iconType = 'iflorens-zip';
      break;
    case 'ppt':
    case 'pptx':
      iconType = 'iflorens-ppt';
      break;
    case 'txt':
      iconType = 'iflorens-otherfile';
      break;
    case 'eml':
      iconType = 'iflorens-email';
      break;
    case 'msg':
      iconType = 'iflorens-email';
      break;
    default:
      iconType = 'iflorens-unknownfile';
      break;
  }
  return iconType;
}

