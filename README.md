# embedding.js

A simple in-memory embedding database that works with OpenAI's `text-embedding-ada-002` text embeddings, built on top of [hnswlib-node](https://github.com/yoshoku/hnswlib-node). Useful for finding relevant documents to include in `gpt-3.5-turbo` and `gpt-4` context windows.



## Features

- Fast approximate nearest neighbor search using hierarchical navigable small world graphs.
- Utilizes OpenAI's `text-embedding-ada-002` model for text embeddings.
- Easy-to-use API for adding and searching data in the database.



## Installation

```bash
npm install --save @themaximalist/embedding.js
```



## Configuration

To use this module, you will need an API key from OpenAI. Set the `OPENAI_API_KEY` environment variable with your API key:

```bash
export OPENAI_API_KEY=<your-openai-api-key>
```



## Usage

```javascript
const embedding = require("@themaximalist/embedding.js");

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

```



## About

https://themaximalist.com

https://twitter.com/themaximal1st



## License

MIT
