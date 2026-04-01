/**
 * 文件下载
 * @param url
 * @param name
 * @param type
 */
export function fileDownloadRequest(url: string, name: string, type: string) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'blob';
  xhr.onload = function () {
    if (xhr.status === 200) {
      var blob = new Blob([xhr.response], { type: 'application/octet-stream' });
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);

      link.download = `${name}.${type}`;
      link.click();
    }
  };
  xhr.send();
}

/**
 * 下载文件
 * @param blob 
 */
export function fileDownloadBlob(blob: Blob, faileName: string) {
  const url = window.URL.createObjectURL(new Blob([blob])); // 创建Blob URL

  const link = document.createElement('a'); // 创建一个 <a> 元素
  link.href = url;
  link.setAttribute('download', faileName || 'downfile.xlsx'); // 设置下载文件名
  document.body.appendChild(link);

  link.click(); // 模拟点击下载链接

  window.URL.revokeObjectURL(url); // 释放 Blob URL
}
