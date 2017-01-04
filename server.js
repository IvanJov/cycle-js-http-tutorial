import express from 'express';
import cors from 'cors';

let app = express();
app.use(cors());
app.options('*', cors());

app.get('/', (req, res, next) => {
  return res.json({number: getRandomInt(1, 1000)});
});

app.listen(3000, () => console.log('Server listening on port 3000'));

const getRandomInt = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};