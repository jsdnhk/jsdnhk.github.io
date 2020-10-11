import { think, SQUIRREL } from "../vendors/cowsay/cowsay.es.js";

console.log(
  think({
    text: "grazing in the browser",
    cow: SQUIRREL,
    eyes: "pp",
    tongue: ";;",
  })
);
