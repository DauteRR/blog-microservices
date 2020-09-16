import bodyParser from 'body-parser';
import { randomBytes } from 'crypto';
import express, { Request, Response } from 'express';
import { CommentRepository, Comment, URLParams } from './typings';
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

    comments.push({ id, content, postID: req.params.id });
    commentsByPostId[req.params.id] = comments;

    await axios.post('http://localhost:4005/events', {
      type: 'CommentCreated',
      data: comments.slice(-1)[0]
    });

    res.status(201).send(comments);
  }
);

app.post('/events', (req, res) => {
  console.log('Received Event:', req.body.type);

  res.send({});
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});
