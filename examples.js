const embedding = require("./index.js");

(async function () {
    const embeddings = new embedding.EmbeddingDatabase();
    await embeddings.add({
        name: "Cat",
        attributes: "It's a cat",
        sound: "meow",
    });

    await embeddings.add({
        name: "Dog",
        attributes: "It's a dog",
        sound: "woof",
    });

    await embeddings.add({
        name: "Cow",
        attributes: "It's a cow",
        sound: "moo",
    });

    let result;

    result = await embeddings.search("moo");
    console.log(result[0]); // cow

    result = await embeddings.search("woof");
    console.log(result[0]); // dog

    result = await embeddings.search("bark");
    console.log(result[0]); // dog

    result = await embeddings.search("roar");
    console.log(result[0]); // cat
})();
