#! /usr/bin/env node

const comments = [
  {
    name: 'Nick',
    message: 'Hi there, hope you are well',
    datetime: '2:40 PM, August 8, 2022'
  },
  {
    message: 'This was really thoughtful and insightful.',
    datetime: '1:30 PM, August 7, 2022'
  },
  {
    name: 'Jeffry Bezos',
    message: 'Nice work. I enjoyed the part where you said some of those things.',
    datetime: '8:40 PM, August 3, 2022'
  }

]

const commentToHtml = (comment) => {
  const authorHtml = 
    `<p class="name"><strong>${comment.name ? comment.name : 'Anonymous'}</strong> said...</p>`;

  return `\
<div class="comment">
  ${authorHtml}
  <p class="message">${comment.message}</p>
  <p class="datetime">${comment.datetime}</p>
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

app.get('/comments', (req, res) => {
  const response = comments.map(commentToHtml).join('\n');
  console.log('comments response', response);
  res.send(response);
})

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

app.use('/', express.static('../'));

app.use(express.urlencoded({
    extended: true
}))

app.listen(3000, () => {
  console.log('express app listening on port 3000...');
})


