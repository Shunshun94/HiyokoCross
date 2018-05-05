# キャラクターシート入力のコツ

## 共通事項として

### 数字を入力するところにメモを入れない

ダイス欄に `10+侵蝕率ボーナス` 等と書きたくなるが、
侵蝕率ボーナスやそのほかの修正値は D. Crescent が管理できるため、記入しなくてよい。
また、そのような数字以外の記入があるとうまく動作しない。

なお、侵蝕率は `10+4d` 等というように記載しても動作するようになっている。

## キャラクターシート倉庫を使う場合

http://character-sheets.appspot.com/

### ロイスの種類欄も記入する

ロイスの種類欄に「Dロイス」と書いてあると、D. Crescent はそれを D ロイスとして最初から扱うため、入力の手間が省ける。
特に理由がなければそのように記載することをお勧めする。

## キャラクター保管所を使う場合

https://charasheet.vampire-blood.net/

### 武器・コンボ欄のその他欄にクリティカル値・侵蝕率上昇を記載する

キャラクター保管所にはクリティカル値や侵蝕率の記入欄がない。
そのため、その他欄にこれを記入する必要がある。

`クリ値7　侵食率9` のように記載すれば機能するようになっている。

なお、判定や表記ブレの対応は [このよう](https://github.com/Shunshun94/shared/blob/b396a87eac6ca191b4f2a20bf54aa3bb735bbdfb/jquery/com/hiyoko/vampireblood/dx3.js#L141) になっている。
