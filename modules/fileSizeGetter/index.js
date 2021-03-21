
export class FileSizeGetter {
  constructor(filePath) {
    this.filePath = filePath;
  }

  // NOTE: ファイルサイズを取得する
  init() {
    return this.referenceFile(this.filePath);
  }

  referenceFile(href) {
    // HTTP通信用オブジェクト生成
    let httpObj = this.createXMLHttpRequest();
    if ( !httpObj ) {
      return false;
    }
    // NOTE: 同期通信
    httpObj.open('HEAD', href, false);
    try {
      httpObj.send(null);
    } catch(e) {
      // NOTE: 404 Not Found
      return false;
    }
    // NOTE: 結果を取得
    if ( !httpObj.getResponseHeader('Content-Length') ) {
      // NOTE: No Content-Length
      return false;
    } else {
      // NOTE: Return Content-Length
      if ( httpObj.readyState == 4 && httpObj.status == 200 ) {
        return httpObj.getResponseHeader('Content-Length');
      } else {
        return false;
      }
    }
  }

  createXMLHttpRequest() {
    let XMLhttpObject = null;
    try {
      XMLhttpObject = new XMLHttpRequest();
    } catch(e) {
      const progids = new Array('MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP');
      for (const i = 0, len = progids.length; i < len; i++) {
        try {
          XMLhttpObject = new ActiveXObject(progids[i]);
        } catch (e) {
          XMLhttpObject = null;
        }
      }
    }
    return XMLhttpObject;
  }
}