import bodyParser from 'body-parser';
import { randomBytes } from 'crypto';
import express, { Request, Response } from 'express';
import { CommentRepository, Comment, URLParams } from './typings';
import cors from 'cors';

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
  (req: Request<URLParams, {}, Comment>, res: Response<Comment[]>) => {
    const id = randomBytes(4).toString('hex');
    const { content } = req.body;
    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id, content });
    commentsByPostId[req.params.id] = comments;

    res.status(201).send(comments);
  }
);

app.listen(4001, () => {
  console.log('Listening on 4001');
});
