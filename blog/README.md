# Writing Blog Posts

Blog posts now use a very small shared structure:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Post Title</title>
    <link rel="stylesheet" href="/stylesheets/style.css">
  </head>
  <body>
    <header>
      <ul class="site-menu">
        <li class="nav-link"><a href="/">Nick Cellino</a></li>
      </ul>
    </header>

    <main class="post-layout">
      <article class="post-content">
        <header class="post-header">
          <h1>Your Post Title</h1>
          <p class="post-subtitle">Optional subtitle or short description.</p>
        </header>

        <p>Write normal paragraphs.</p>

        <h2>A Section</h2>
        <p>Use plain HTML elements inside the article.</p>

        <ol>
          <li>Numbered lists get the right mobile spacing automatically.</li>
          <li>You do not need any extra wrapper around them.</li>
        </ol>

        <ul>
          <li>Bullet lists work the same way.</li>
        </ul>

        <pre><code>const example = true;</code></pre>
      </article>
    </main>
  </body>
</html>
```

## Rules

- Use `main.post-layout > article.post-content` for every blog post.
- Put the title inside `header.post-header`.
- `p.post-subtitle` is optional.
- Write the body with plain `p`, `h2`, `h3`, `ol`, `ul`, `pre`, `img`, `table`, `iframe`, and forms.
- Do not wrap lists, headings, `div`s, `pre`s, or other block elements inside a `p`.
- Do not use the homepage grid classes like `grid-container`, `span-7`, or `span-8` in blog posts.

## Comments Section

If you want comments on a post, append this near the end:

```html
<h2>Leave a comment</h2>
<form
  id="comment-form"
  hx-get="https://q79hj072qf.execute-api.us-east-1.amazonaws.com/comments-form?post-id=your-post-id"
  hx-trigger="load"></form>

<h2>Comments</h2>
<div
  id="comments-list"
  hx-get="https://q79hj072qf.execute-api.us-east-1.amazonaws.com/comments?post-id=your-post-id"
  hx-swap="innerHTML"
  hx-trigger="load"></div>
```

Replace `your-post-id` with the post identifier you want to use for comments.
