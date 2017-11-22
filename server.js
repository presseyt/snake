
const PORT = process.env.PORT || 8080;

const express = require('express');
const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');


let highscore = 1;
app.get('/', (req,res)=>{
  res.render('index', {highscore: highscore});
});

app.get('/highscore/:score', (req,res) => {
  highscore = req.params.score;
});

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});