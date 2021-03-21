# RenderingHTMLFIleSize

## 概要

取得したファイルサイズをHTMLに描画する


### 引数

- extensions

拡張子を配列で設定する

- className

クラス名を指定する

- dataName

カスタムデータ属性を設定する

- convertName

単位を設定する


### HTMLにファイルサイズを描画したいとき

#### HTML側

```
<span class="pdf-size" data-pdf="{ ファイルパス }"></span>
```

#### JS側

```
import { RenderingHTMLFIleSize } from './modules/renderingHTMLFIleSize/index.js';

const extensions = ['.pdf'];
const className = 'pdf-size';
const dataName = 'pdf';
const convertName = 'kb';

const renderingHTMLFIleSize = new RenderingHTMLFIleSize(extensions, className, dataName, convertName);

renderingHTMLFIleSize.init();
```
