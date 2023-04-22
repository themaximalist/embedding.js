const embedding = require("./index.js");

(async function () {
    const cat = await embedding.embed("this one is a cat, meow");
    const dog = await embedding.embed("this one is a dog, woof");
    const cow = await embedding.embed("this one is a cow, moo");
    console.log(cat);
    console.log(dog);
    console.log(cow);
})();
