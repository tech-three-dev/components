# fileSizeGetter

## 概要

ファイルサイズを取得する


### 引数

- filePath

パス名を設定する


### ファイルサイズを取得したいとき

```
import { FileSizeGetter } from './modules/fileSizeGetter.js';

const filePath = 'pdfのパスを指定する';

const fileSizeGetter = new FileSizeGetter();

console.log(fileSizeGetter.size(filePath));
```
