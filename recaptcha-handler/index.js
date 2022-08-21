#! /usr/bin/env node

const comments = [
  {
    name: 'Nick',
    message: 'Hi there, hope you are well'
  },
  {
    message: 'I am anonymous'
  }
]

const commentToHtml = (comment) => {
  const authorHtml = comment.name ? `<p class="name">${comment.name}</p>` : '';

  return `\
<div class="comment">
  ${authorHtml}
  <p class="message">${comment.message}</p>
</div>`
}

const addComment = (comment) => {
  comments.push(comment);
}

const newCommentForm = `\
    <form id="demo-form" hx-post="/comments" hx-swap="afterbegin" hx-target="#comments" hx-swap-oob="true">
      <label for="name">Name</label>
      <input type="text" name="name">
      <label for="message">Message</label>
      <input type="text" name="message">
      <button type="submit">submit</button>
    </form>
`

const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.redirect('http://localhost:3000/static/test-page.html');
})

app.use('/static', express.static('../'));

app.use(express.urlencoded({
    extended: true
}))

app.post('/comments', (req, res) => {
  //const token = req.body['g-recaptcha-response'];
  //console.log(token);
  const comment = {
    name: req.body.name,
    message: req.body.message
  };
  addComment(comment)
  const commentHtml = commentToHtml(comment);
  const responseHtml = `\
${newCommentForm}
${commentHtml}`
  res.send(responseHtml);
})

app.listen(3000, () => {
  console.log('express app listening on port 3000...');
})


