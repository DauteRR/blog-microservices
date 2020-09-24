import bodyParser from 'body-parser';
import { randomBytes } from 'crypto';
import express, { Request, Response } from 'express';
import { Post, PostsRepository } from './typings';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts: PostsRepository = {};

app.get('/posts', (req, res: Response<PostsRepository>) => {
  res.send(posts);
});

app.post(
  '/posts/create',
  async (req: Request<{}, {}, Post>, res: Response<Post>) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
      id,
      title
    };

    await axios.post('http://event-bus-srv:4005/events', {
      type: 'PostCreated',
      data: posts[id]
    });

    res.status(201).send(posts[id]);
  }
);

app.post('/events', (req, res) => {
  console.log('Received Event:', req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log('Listening on 4000');
});
