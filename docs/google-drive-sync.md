# Google Drive sync

Set `NEXT_PUBLIC_GOOGLE_CLIENT_ID` to a Google OAuth client ID whose project has the Google Drive API enabled.

Sync uses the Drive API scope `https://www.googleapis.com/auth/drive.appdata` and stores `mentor-codex-backup.json` in the user's Google Drive app data folder.

Current sync rules:

- The first sync in a browser must be started with the Drive button because Google auth requires a user gesture.
- The Drive button performs a two-way sync: download the backup, merge local records, then upload the merged result.
- After Drive auth succeeds, record creation, edit, delete, and CSV import trigger a background sync while the page remains open.
- Record edits are resolved by per-record `updatedAt` metadata. The newer edit wins for the same `tale.key`.
- Deletions are propagated with `deletedTales` tombstones so other browsers remove the same `tale.key` instead of restoring it.
- If two browsers edit the same record offline before syncing, the browser with the latest `updatedAt` wins.
