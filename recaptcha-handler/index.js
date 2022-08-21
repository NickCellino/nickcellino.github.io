#! /usr/bin/env node

let comments = [
  {
    name: 'Nick',
    message: 'Hi there, hope you are well',
    datetime: new Date('2:40 PM, August 8, 2022')
  },
  {
    message: 'This was really thoughtful and insightful.',
    datetime: new Date('1:30 PM, August 7, 2022')
  },
  {
    name: 'Jeffrey Bezos',
    message: 'Nice work. I enjoyed the part where you said some of those things.',
    datetime: new Date('8:40 PM, August 3, 2022')
  }

]

const escapeHtml = (unsafe) => {
    return unsafe.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
}

const formatDate = (date) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'];

  const month = months[date.getMonth()];
  const year = 1900 + date.getYear();

  return `${date.getHours()}:${date.getMinutes()}, ${month} ${date.getDate()}, ${year}`
}

const commentToHtml = (comment) => {
  const authorHtml = 
    `<p class="name"><strong>${comment.name ? escapeHtml(comment.name) : 'Anonymous'}</strong> said...</p>`;

  return `\
<div class="comment">
  ${authorHtml}
  <p class="message">${escapeHtml(comment.message)}</p>
  <p class="datetime">${formatDate(comment.datetime)}</p>
</div>`
}

const addComment = (comment) => {
  comments = [comment].concat(comments);
}

const newCommentForm = `\
    <form id="comment-form" hx-post="/comments" hx-swap="afterbegin" hx-target="#comments" hx-swap-oob="true">
      <label for="name">Name (optional)</label>
      <input type="text" name="name">
      <label for="message">Message</label>
      <textarea name="message" required rows=5></textarea>
      <button type="submit">submit</button>
    </form>`

const express = require('express')

const app = express()

app.use(express.urlencoded({
    extended: true
}))

app.get('/comments-form', (req, res) => {
  res.send(newCommentForm);
})

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
    message: req.body.message,
    datetime: new Date()
  };
  addComment(comment)
  const commentHtml = commentToHtml(comment);
  const responseHtml = `\
${newCommentForm}
${commentHtml}`
  res.send(responseHtml);
})

app.use('/', express.static('../'));

app.listen(3000, () => {
  console.log('express app listening on port 3000...');
})


