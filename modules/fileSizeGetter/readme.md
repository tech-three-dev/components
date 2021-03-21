# fileSizeGetter

## 概要

ファイルサイズを取得する


### 引数

- filePath

拡張子を配列で設定する


### HTMLにファイルサイズを描画したいとき

```
import { FileSizeGetter } from './modules/fileSizeGetter/index.js';

const filePath = 'ファイルのパス';

const fileSizeGetter = new FileSizeGetter(filePath);

fileSizeGetter.init();
```

### ファイルサイズを取得したいとき

```
import { FileSizeGetter } from './modules/fileSizeGetter.js';

const filePath = 'pdfのパスを指定する';

const fileSizeGetter = new FileSizeGetter();

console.log(fileSizeGetter.size(filePath));
```
