import bodyParser from 'body-parser';
import { randomBytes } from 'crypto';
import express, { Request, Response } from 'express';
import { CommentRepository, Comment, URLParams } from './types';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId: CommentRepository = {};

app.get(
  '/posts/:id/comments',
  (req: Request<URLParams, {}, {}>, res: Response<Comment[]>) => {
    res.status(200).send(commentsByPostId[req.params.id] || []);
  }
);

app.post(
  '/posts/:id/comments',
  async (req: Request<URLParams, {}, Comment>, res: Response<Comment[]>) => {
    const id = randomBytes(4).toString('hex');
    const { content } = req.body;
    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id, content, postID: req.params.id, status: 'pending' });
    commentsByPostId[req.params.id] = comments;

    await axios.post('http://events-bus-srv:4005/events', {
      type: 'CommentCreated',
      data: comments.slice(-1)[0]
    });

    res.status(201).send(comments);
  }
);

app.post('/events', async (req, res) => {
  console.log('Received Event:', req.body.type);
  const { type, data } = req.body;

  if (type === 'CommentModerated') {
    const { id, status, postID } = data;

    const comment = commentsByPostId[postID].find(comment => comment.id === id);

    if (comment) {
      comment.status = status;
    }

    await axios.post('http://events-bus-srv:4005/events', {
      type: 'CommentUpdated',
      data: comment
    });
  }

  res.send({});
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});
