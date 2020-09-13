import bodyParser from 'body-parser';
import { randomBytes } from 'crypto';
import express, { Request, Response } from 'express';
import { Post, PostsRepository } from './typings';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts: PostsRepository = {};

app.get('/posts', (req, res: Response<PostsRepository>) => {
  res.send(posts);
});

app.post('/posts', (req: Request<{}, {}, Post>, res: Response<Post>) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = {
    id,
    title
  };

  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log('Listening on 4000');
});
