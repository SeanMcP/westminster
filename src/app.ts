import express from "express";
const natural = require("natural");
import { parseMatch } from "./utils";

const PORT = 1646;

const app = express();
app.get("/", (req, res) => res.send("Hello from Westminster"));

app.get("/q/:question", (req, res) => {
  natural.BayesClassifier.load("./src/data/classifier.json", null, function(
    err: any,
    classifier: any
  ) {
    if (err) {
      console.log("Error:", err);
      res.send("Apologies; I am unable to answer your question.");
    }
    const match = classifier.classify(req.params.question);
    if (match) {
      const { doc, index } = parseMatch(match);
      console.log(`"${req.params.question}" matched to ${match}`);
      res.send(require(`./docs/${doc}.json`)[index].answer);
    }
  });
});

app.get("/train-q", (req, res) => {
  const classifier = new natural.BayesClassifier();
  const wsc = require("./docs/wsc.json");
  for (const q of wsc) {
    classifier.addDocument(q.question, `wsc-${q.number}`);
  }
  classifier.train();
  classifier.save("./src/data/classifier.json", function(err: any) {
    if (err) {
      console.log("Error when saving training data:", err);
      res.send("Unable to train at this time.");
    }
  });
  res.send("Successfully trained!");
});

const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

declare const module: any;

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}
