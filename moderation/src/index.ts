import bodyParser from 'body-parser';
import express from 'express';
import axios from 'axios';

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
  console.log('Received Event:', req.body.type);
  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    const { id, content, postID } = data;
    const status = content.includes('orange') ? 'rejected' : 'approved';

    await axios.post('http://events-bus-srv:4005/events', {
      type: 'CommentModerated',
      data: {
        id,
        content,
        postID,
        status
      }
    });
  }

  res.send({});
});

const port = 4003;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
