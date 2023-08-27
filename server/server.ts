import express from 'express';
import path from 'path'
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.static(path.join(__dirname, '../src/assets')));


app.post('/', (req, res) => {
const movie = req.body.movie;
let videoUrl;
console.log(typeof movie)
switch (movie) {
  case 0:
    videoUrl = '/videoplayback.mp4';
    break;
  case 1:
    videoUrl = '/poke.mp4';
    break;
  case 2:
    videoUrl = '/stranger.mp4';
    break;
  
}
  const response = {
    videoUrl: videoUrl,
  };
  res.json(response);
});


app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});