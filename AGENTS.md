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

- Applied Projectsの先頭にAlignment Asymmetry Studyの記事紹介を追加した。
- 記事: https://github.com/kentaroid-bot/alignment-asymmetry-study/blob/main/outreach/article.ja.md
- 紹介追加コミット: `f7b1744`。自動公開を初めて確認したコミット: `84c0fb2`。
