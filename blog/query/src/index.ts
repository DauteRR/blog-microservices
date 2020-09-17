import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const contentByStatus = (status: string, content: string) => {
  if (status === 'pending') {
    return 'This comment is under a moderation process';
  } else if (status === 'approved') {
    return content;
  } else if (status === 'rejected') {
    return 'This comment have been rejected';
  }
};

const posts: { [key: string]: any } = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = {
      id,
      title,
      comments: []
    };
  }

  if (type === 'CommentCreated') {
    const { id, postID, content, status } = data;

    const post = posts[postID];
    post.comments.push({
      id,
      content: contentByStatus(status, content),
      status
    });
  }

  res.send({});
});

const port = 4002;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
