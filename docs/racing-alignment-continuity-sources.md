# 「一台が止まっても、世界を続けるために」資料と編集記録

2026年9月11日。掲載原稿の別添。

[掲載用原稿](racing-alignment-continuity.ja.md)／[編集元の研究原稿](research/ai-racing-risk/alignment-design-comparison-revised.ja.md)

## 編集の方針

対話でMonkuAi主宰の [@Kenoidart](https://x.com/Kenoidart) が提示した仮説、Codexが整理した観測資料、Codexの評価、総括の境界を保った。本文は相互補完、失敗の局所化、停止後の継続を軸に整理し、暫定予想の数値は第一部に一度記載した。新しい実測結果は追加していない。F1の数値と事例は編集元の調査を引き継いでいる。今回の編集では外部出典の再調査は行っていない。

## 集計の定義

「走行完了」は、公式の順位認定と区別して、レース終了まで走ったかで集計した。DNSは出走分母から除外した。2024年オーストリアのノリスは順位表が「+7 laps」でもリタイアとして数えた。ベルギーのラッセルは走行後の失格なので完了、ブラジルのヒュルケンベルグは競技中の黒旗による失格なので未完了とした。[FIA・オーストリア報告](https://www.fia.com/news/f1-george-russell-takes-surprise-austria-win-verstappen-and-norris-collide)、[F1・ラッセル失格](https://www.formula1.com/en/latest/article/breaking-russell-disqualified-from-belgian-grand-prix-for-underweight-car-as.2NIuo4cHgOl1LgplIkGG5D)、[F1・ヒュルケンベルグ黒旗](https://www.formula1.com/en/latest/article/hulkenberg-rues-small-mistake-with-huge-consequence-after-being-black.2gn7X4tpeSKZ2JaxQRlTmD)

以前の資料の「リタイア50／476」と、本稿の「走行未完了51／476」の差は、競技中の失格を含めるかによる。最終ポイント上位10人という選択には、完了することが得点につながるという関係がある。約8％を、無作為な運転者やAI企業の率として扱わない。


## 元データと再現方法

資料は `docs/research/ai-racing-risk/` に保存されている。

- [公式結果の保存データ](research/ai-racing-risk/official-2024.json)
- [集計スクリプト](research/ai-racing-risk/analyze-continuity.py)
- [全結果の判定](research/ai-racing-risk/continuity-audit-2024.csv)
- [各決勝の集計](research/ai-racing-risk/continuity-races-2024.csv)
- [上位10人の集計](research/ai-racing-risk/continuity-drivers-top10-2024.csv)
- [集計要約](research/ai-racing-risk/continuity-summary-2024.json)

資料ディレクトリで `python3 analyze-continuity.py` を実行すると再集計できる。今回の編集では元データと集計ファイルを変更していない。上位10人の未完了率を各人同じ重みで平均した値は、元原稿では約8.03％。本文には出走数で重みづけした19／238（約7.98％）を採用した。

## 中断・中止の事例について

本文は、再開の例として2020年バーレーンGPと2024年モナコGP、その日の再開見送りの例として2021年ベルギーGP、開催前中止の例として2023年エミリア・ロマーニャGPを残した。2021年ベルギーGPは公式結果が存在するが、通常の競争走行が成立した決勝と同じ意味で完遂とは数えない。

元原稿では、2014年日本GPがジュール・ビアンキの事故に伴う最終的な赤旗で早期終了した例も扱っている。[F1公式・2014年日本決勝報告](https://www.formula1.com/en/latest/article/race-hamilton-wins-rain-affected-race-in-japan.FOQ9DKAeOj9aMaFMy2Ado)

これらは全年度の中断・中止を網羅する頻度調査ではない。中断・打ち切り・開催前中止の割合や、永久に競技を再開できなくなる確率は算出していない。

## 次の研究への引き継ぎ

Alignment Asymmetry Studyへつなぐ問題設定は、「一社のアライメント破綻が全体の修正能力の喪失へ進む経路を、中央への最終権限の集中に頼らず抑える運営プロトコル」である。

想定する成果物は、主体・共有資源・権限・接続のモデル、異常検知から権限縮小・退出・代替・再接続までの手順、比較実験の設計。調整機能が乏しい場合、中央で調整する場合、分散型プロトコルで調整する場合を、可能な限り同じ資源・危険条件で比較する。

検証では、共有基盤の障害、協調しない主体、攻撃側によるプロトコル利用、停止による必要な供給の喪失、最終判断権限の集中を含める。相互補完は人間のみ・AIのみ・協働の条件で比較する案を、掲載版で具体化した。本文の実験提案は未実施であり、別プロジェクトへの作成依頼や実装も今回行っていない。

確率評価へ進む際は、過渡期の期間、権限、危険への曝露、反復と学習、主体間の共通依存を定義する。各社の失敗率を独立と仮定して機械的に掛け合わせず、一社が失敗した条件下でほかの主体が活動できるかを測る。文明規模の権限とその影響を同一条件の二重計上にしない。暫定予想は検証対象であり、実験が到達すべき結論として固定しない。
