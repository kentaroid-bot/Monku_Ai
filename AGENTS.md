# 次回作業への申し送り

## HPの更新・公開

- 対象リポジトリ: `kentaroid-bot/Monku_Ai`
- 本番URL: https://monku.ai/
- Cloudflare Worker: `monku-ai`
- 2026-09-09にCloudflare Workers BuildsのGitHub連携を設定し、`main`へのpushによる自動公開を確認済み。
- 本番ブランチは`main`、ルートディレクトリは`/`、ビルドコマンドは空欄、デプロイコマンドは`npx wrangler deploy`。
- 通常のHP公開は、依頼対象の変更をcommitして`main`へpushする。手動WranglerデプロイやGitHub連携の再設定は不要。レビューのみ・ローカル変更のみなど、その時のユーザー指定を優先する。
- push後は、そのコミットのGitHubチェック`Workers Builds: monku-ai`が`completed`かつ`success`になったことを確認する。起動だけで公開完了と報告しない。
- 続いて本番URLを取得し、変更した内容が反映されていることを確認する。失敗時はCloudflareのビルドログを確認する。

確認コマンドの例（`<commit-sha>`はpushしたコミットのSHAに置き換える）:

```sh
gh api repos/kentaroid-bot/Monku_Ai/commits/<commit-sha>/check-runs --jq '.check_runs[] | {name,status,conclusion,details_url}'
```

## 編集時の注意

- トップページは`index.html`、共通スタイルは`styles.css`。トップページの文言を追加・変更する場合は、日本語・英語・やさしい日本語の辞書と既存のフォールバックを確認する。
- 公開対象は`.assetsignore`で制限されている。新しいページやアセットを追加するときは、Gitで追跡されていることとアップロード対象に含まれることを確認する。
- 作業ディレクトリには今回の依頼と無関係な未追跡ファイルや別プロジェクトが多数ある。`git add .`を使わず、対象ファイルを明示してcommitする。
- 認証情報やAPIトークンをリポジトリ・ログ・申し送りに保存しない。
- READMEにあるCloudflare Pagesの設定は別の公開方式の参考情報。本番は上記のWorkers Builds。

## 直近の変更

- 2026-09-10: Essay #6を「原資料の見解 → Codexの検討・異論 → 総括」の三部構成へ改訂。中心的な問題提起は「ASIが人間を滅ぼす可能性は、一般に想像されるほど高くないのではないか」。第一部にCodexの留保を逐次差し込まない。
- 2026-09-10: 「鏡のなかの超知能」にEssay #6「池を壊さず、世界を知る」を追加。日英ページは `/essays/asi-motivation-inquiry/` と `/essays/asi-motivation-inquiry/en/`。
- 同記事の原稿・資料記録は `docs/asi-motivation-inquiry*`、原図は `assets/asi-motivation-inquiry/`。原図の確率や最適速度は未校正の想定値であり、実証済みの効果・予測として扱わない。
- Applied Projectsの先頭にAlignment Asymmetry Studyの記事紹介を追加した。
- 記事: https://github.com/kentaroid-bot/alignment-asymmetry-study/blob/main/outreach/article.ja.md
- 紹介追加コミット: `f7b1744`。自動公開を初めて確認したコミット: `84c0fb2`。

## 見解を紹介・比較する文章の原則

- 原資料やユーザーの中心的な主張とその論拠を、まず一つのまとまった見解として忠実に展開する。対話資料では発言者を区別し、異なる声を平均化しない。
- Codexの反論・留保・証拠上の限界は、次の独立した部分にまとめる。元の主張の各文に「確証はない」「必ずしもそうではない」を挟んで、主張の輪郭を薄めない。
- 最後に、双方の一致点・相違点と判断を明示した総括を置く。無理な折衷や、留保だけで主張を上書きする結論を避ける。
- 見出し・段落と帰属表示で、誰の見解かを読者が追える形にする。原資料の立場を十分に述べることと、未検証の主張を実証済みとすることは区別する。日英とも同じ構成と断定の強さを保つ。
