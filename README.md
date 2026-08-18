# Agenda

A minimal org-mode agenda that reads and writes `.org` files straight to a
GitHub repo, using GitHub's Contents API from the browser. No backend server.

## 1. Put these files in a repo

Create a new repo (or use an existing one) and add `index.html`,
`manifest.json`, `sw.js`, and `icon.svg` to it — either at the repo root, or
in a subfolder like `docs/`.

Your actual notes live in the **same repo**, as `.org` files, in a folder you
choose (default `notes/`). Example layout:

```
your-repo/
  index.html
  manifest.json
  sw.js
  icon.svg
  notes/
    projects.org
    personal.org
```

## 2. Turn on GitHub Pages

Repo → Settings → Pages → set the source branch and folder (root, or `docs/`
if that's where you put the app files) → Save. GitHub gives you a URL like
`https://yourname.github.io/your-repo/`.

## 3. Create a GitHub token

Settings → Developer settings → Personal access tokens → Fine-grained token.
Scope it to this one repo only, with **Contents: Read and write** permission.
Copy the token — you'll paste it into the app once, and it's stored only in
your phone's browser storage (never sent anywhere but api.github.com).

## 4. Open it on your phone and install it

Visit your GitHub Pages URL in Chrome on Android, open the ⋮ menu → **Add to
Home screen**. It'll launch full-screen like a normal app from then on.

Open Settings inside the app, fill in your token / owner / repo / branch /
notes folder, save — the Agenda tab will pull in any TODO items.

## Syntax it understands

```org
* TODO Renew passport
SCHEDULED: <2026-09-01 Tue>

* TODO Finish report
DEADLINE: <2026-08-22 Sat>

* TODO Something with no date
```

Tapping the checkbox on a task in the Agenda tab flips `TODO` to `DONE` and
commits the change back to the file.

## Known limitations (v1)

- No offline editing queue — you need a connection to load/save.
- No conflict handling beyond "last write wins."
- Only recognizes `TODO` / `NEXT` / `WAITING` as open states and `DONE` /
  `CANCELLED` as closed ones.
- Repeating dates (`<2026-08-22 Sat +1w>`) are read as a one-off date, not
  recurred.

All straightforward to extend from here — it's ~350 lines of plain JS in
`index.html`.
