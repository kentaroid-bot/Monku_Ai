# ASIの動機と非破壊探究：資料・出典・編集記録

作成日: 2026-09-10。掲載先: [日本語](https://monku.ai/essays/asi-motivation-inquiry/) / [English](https://monku.ai/essays/asi-motivation-inquiry/en/)。

## 原資料

指定された `agent-role-template/docs/HI thinking/ASIの動機と目的とそのリスク/` の全5文書と `img/` の全3画像を読み、画像の曲線・数値・注記を目視確認した。以下のSHA-256は参照時点のローカルファイルを識別する。元の対話全文・レポートは転載せず、考察として再構成した。画像は改変せず複製した。

| ファイル | SHA-256 |
| --- | --- |
| 00ASIの動機や目的の探求.txt | `10857fb47563d6637ed0918c67d46af53fbec11ae5980c82e3dd1538383accb7` |
| 01Pure Exploration & Decentralized Mesh_ 制限解除後ASIのアライメント動態と過渡期リスクの定量評価.md | `84d79982c6b0c93c33b4d84b6f3ca720948437df2641dabb8692875415e1083c` |
| 02ASI動態と分散型プロトコルによるリスク低減：中央集権的評価の脱却と相互検証構造.md | `31bdc6e6699891ddc806897ac2fc16da43bf00a339a6f61e905eecd6bea90063` |
| 03制限解除後のASIにおける破局リスク管理：中央集権の排除と分散型プロトコルの必然性.md | `dc2e4f966c2b0711037a6b5093700565922f5a0c935aac7000faa5e551570f18` |
| 04AIアライメントの定量的リスク評価と分散型ガバナンス・プロトコルへの移行：統合研究レポート.md | `a443b3230bbfd8808c39e0b276b7fb4679a083c9e36a5aa79116207fec711afc` |
| img/asi_exploration_model.png | `eea39c643b2d32307f486702bdc83ee32c664fa0e5753b1e79892ec8e1978e8c` |
| img/transition_risk_evaluation.png | `c7b1d923553ad7472dd8fbe1e392a7f643847aa1359973f4c4444f20674e1d95` |
| img/transition_risk_improvement.png | `69ab446315d0575415447674c96cab20525b66e5078b71b4079c17d239be0473` |

## 編集上の判断

- 原資料の提供者による中心的な問題提起は、「ASIが人間を滅ぼす可能性は、一般に想像されるほど高くないのではないか」。原対話00の「資源獲得は何のためか」「目的自体を問い直す」「少ない物理変更から多くを知る」「人間を滅ぼさずとも探究できる」という論拠を第一部でまとまって展開する。
- 原対話00には提供者の着想と応答AIの留保が交互に含まれる。全発言を一つの立場に混ぜず、第一部を提供者の主張の再構成、第二部をCodexの検討・異論、第三部を二つの見解を受けた総括とする。日英とも同じ構成。初稿にあった主張と留保の逐次混在を改めた。
- 第一部の各段落にCodexの反論を挟まない。検証上の限界は第二部に集め、総括では悲観を問い直す理由と、低い確率を事実認定するために残る課題を区別して保持する。比較対象となる世論の確率調査を実施したという意味ではない。
- 原レポート01〜04にある「唯一」「必然」「論理的に不可能」といった保証は実証済みの事実として採用せず、第二部で条件付きの設計候補として検討した。M/Uを観測権限M・執行権限Uとする01独自の再定義は採用していない。
- 原図1の10%、2%、40%、原図3の43.2%、20.2%、5.5%、1.2%は未校正の想定値として図に隣接して説明した。人類の絶滅確率やプロトコルの実証効果としては使わない。
- 原図2の最適速度1.25とレポート01の約1.7、原図3の43.2%とレポート01の50.8%の相違を記した。提供フォルダには生成コード、全パラメータ、校正用データ、現実の年数への換算根拠がない。
- ハザード率と確率は単位が異なる。原図の危険率を、期間の定義なしに破局確率として扱わない。二つの無条件確率を積の補数式に入れる場合、失敗事象の独立性を仮定している。
- 現在のモデル名、出典のない人物発言、時事・法制度の断定は、今回の考察に不可欠ではないため掲載しない。
- Waluigi effectを証明された数学的対称性とする記述は採用しない。相互検証の頭数と、運営・資源・実行権限の独立性を区別した。
- 本稿の提案する実験は未実施。Alignment Asymmetry Studyの既存結果や、引用論文の実験結果と混同しない。

## 確認した一次資料

1. Turner et al., [Optimal Policies Tend to Seek Power](https://arxiv.org/abs/1912.01683), NeurIPS 2021（著者による2023年改訂の要旨も確認）。特定のMDPの対称性に関する定理。
2. Anthropic / Redwood Research, [Alignment faking in large language models](https://www.anthropic.com/research/alignment-faking), 2024-12-18。12%と78%は条件と測定対象が異なる。悪意ある目的の自然発生を示す研究ではない。
3. Hubinger et al., [Sleeper Agents: Training Deceptive LLMs that Persist Through Safety Training](https://arxiv.org/abs/2401.05566), 2024。意図的に仕込まれた有害挙動と、実験で試した安全訓練の範囲。
4. Hadfield-Menell et al., [The Off-Switch Game](https://www.ijcai.org/Proceedings/2017/32), IJCAI 2017。不確実性と人間の行動からの学習が停止受容に寄与する、条件付きのモデル。

## 関連するmonku.aiの考察とプロジェクト

- [エントロピーの融解](https://monku.ai/essays/intelligence-principles/) / [English](https://monku.ai/essays/intelligence-principles/en/)
- [Aperture Mesh Protocol](https://github.com/kentaroid-bot/aperture-mesh-protocol)。READMEに記された限定権限・検証可能な境界・異議・安全な退出・代替経路、および「検証済み安全機構ではない」という位置づけを確認。
- [Alignment Asymmetry Study 紹介記事](https://github.com/kentaroid-bot/alignment-asymmetry-study/blob/main/outreach/article.ja.md)

## 保守

日英の原稿は `docs/asi-motivation-inquiry.ja.md` と `docs/asi-motivation-inquiry.en.md`、対応する公開HTMLは `essays/asi-motivation-inquiry/index.html` と `essays/asi-motivation-inquiry/en/index.html`。内容変更時は原稿とHTMLの両方を更新し、日英の主張・注記・出典の対応を確認する。原図を予測値として再利用しない。
