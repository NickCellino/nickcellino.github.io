# Nick Cellino's Website

Personal website hosted on GitHub Pages.

## Local Development

To run the website locally with auto-refresh:

```bash
live-server --port=8000
```

This will automatically open your browser and refresh when files change.

## Updating The RSS Feed

The RSS feed is generated manually with a Babashka task defined in `_scripts/bb.edn`.

Prerequisites:

- `bb` (Babashka) installed
- A local Java runtime installed so Babashka can resolve the `clj-rss` dependency

Workflow:

1. Add your new post to `_scripts/bb/generate_rss.clj` as another item in the `rss/channel-xml` call.
2. Run the generator from the repo root:

```bash
bb -f _scripts/bb.edn rss
```

3. Commit the updated `atom.xml` file along with your post.

The task writes the generated feed to `atom.xml` in the project root.
