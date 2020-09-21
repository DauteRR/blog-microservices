import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
app.use(bodyParser.json());

const events: object[] = [];

app.post('/events', (req: Request, res: Response) => {
  const event = req.body;

  events.push(event);

  axios.post('http://localhost:4000/events', event);
  axios.post('http://localhost:4001/events', event);
  axios.post('http://localhost:4002/events', event);
  axios.post('http://localhost:4003/events', event);

  res.send({ status: 'ok' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

const port = 4005;
app.listen(port, () => console.log(`Listening on ${port}`));
