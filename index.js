const log = require("debug")("embedding.js:index");

const openai = require("./openai");
const EMBEDDING_MODEL = process.env.EMBEDDING_MODEL || "text-embedding-ada-002";

async function getEmbeddings(input, model = EMBEDDING_MODEL) {
    try {
        const response = await openai.createEmbedding({ model, input });
        if (!response) throw new Error('No response from OpenAI API');
        if (!response.data) throw new Error('No data in response from OpenAI API');
        if (!response.data.data) throw new Error('No internal data in response from OpenAI API');
        if (response.data.data.length !== 1) throw new Error('Expected 1 embedding, got ' + response.data.data.length);

        const embedding = response.data.data[0].embedding;

        return {
            input,
            embedding,
            model,
        };
    } catch (error) {
        console.error('Error generating embeddings:', error);
        throw error;
    }
}

async function embed() {
    const cat = await getEmbeddings("this one is a cat, meow");
    console.log(cat);
    const dog = await getEmbeddings("this one is a dog, bark");
    console.log(dog);
    const cow = await getEmbeddings("this one is a cow, moo");
    console.log(cow);
}

async function query() {

}

module.exports = {
    embed,
    query,
};