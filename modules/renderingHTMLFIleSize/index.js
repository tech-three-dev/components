
export class RenderingHTMLFIleSize {
  constructor(extensions, className, dataName, convertName) {
    this.extensions = extensions;
    this.className = className;
    this.dataName = dataName;
    this.convertName = convertName;
  }

  // NOTE: ファイルサイズを単位付きでHTMLに描画する
  init() {

    const elements = document.getElementsByClassName(this.className);

    for (let i = 0, len = elements.length; i < len; i++) {
      for (let x = 0, len2 = this.extensions.length; x < len2; x++) {
        const href = elements[i].dataset[this.dataName];
        const reg = new RegExp( this.extensions[x] + '$', 'i' );
        if ( href && href.match(reg) ) {
          const size = this.referenceFile(href);
          if (size) {
            elements[i].innerText = this.convUnit(size);
          }
          break;
        }
      }
    }
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

  convUnit(num) {
    if (this.convertName === 'gb') {
      num = num / (1024*1024*1024);
      return Number(num.toFixed()).toLocaleString() + 'GB';
    } else if (this.convertName === 'mb') {
      num = num / (1024*1024);
      return Number(num.toFixed()).toLocaleString() + 'MB';
    } else if (this.convertName === 'kb') {
      num = num / 1000;
      return Number(num.toFixed()).toLocaleString() + 'KB';
    } else if (this.convertName === 'b') {
      return Number(num.toFixed()).toLocaleString() + 'B';
    }
  }

  roundDecimal(num) {
    if ( this.config.round ) {
      num = num * 10;
      num = Math.round(num);
      num = String(num / 10);
      if ( !num.match(/\./) ) {
        num = num + '.0';
      }
    } else {
      num = Math.ceil(num);
    }
    return num;
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