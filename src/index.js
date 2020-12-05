const express = require("express");
const app = express();
const port = 8080;
const { newsArticleModel } = require("./connector");
const { newsArticleSchema } = require("./schema");
const onePageArticleCount = 10;

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/newFeeds", (req, res) => {
  let limit = 10;
  let offset = 0;
  newsArticleModel.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      let newRes = [];
      for (let i = 0; i < limit; i++) {
        newRes.push(result[i]);
      }
      for (let i = 0; i < offset; i++) {
        newRes.pop();
      }
      console.log(newRes.length);
      res.status(200).send(newRes);
    }
  });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
