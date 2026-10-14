# notes-storage

Small notes app. Add notes with a title and message, stored in the browser's `localStorage` and listed in a table. No backend, no build step.

## Features

- Add a note (title + message)
- Notes persist across page reloads
- Reset button clears all notes
- Notes are rendered as plain text (no HTML injection)
- Handles corrupt or unavailable storage without breaking the UI

## Usage

Open [index.html](index.html) in a browser. No install or server required.

## Limitations

- Data lives only in the current browser profile and origin.
- No edit or delete of single notes, only reset of the whole list.
- No live sync across open tabs; a tab picks up other tabs' notes on its next add or reload.
