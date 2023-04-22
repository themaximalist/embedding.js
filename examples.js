const embedding = require("./index.js");

(async function () {
    const sentence = "this one is a cat, meow";
    const embeddingResult = await embedding.embed(sentence);
    console.log(embeddingResult);
})();
