const log = require("debug")("embedding.js:index");

const openai = require("./openai");
const EMBEDDING_MODEL = process.env.EMBEDDING_MODEL || "text-embedding-ada-002";

const embeddingCache = {};
async function embed(input, model = EMBEDDING_MODEL) {
    try {
        if (embeddingCache[input]) return embeddingCache[input];

        const response = await openai.createEmbedding({ model, input });
        if (!response) throw new Error('No response from OpenAI API');
        if (!response.data) throw new Error('No data in response from OpenAI API');
        if (!response.data.data) throw new Error('No internal data in response from OpenAI API');
        if (response.data.data.length !== 1) throw new Error('Expected 1 embedding, got ' + response.data.data.length);
        if (!response.data.data[0].embedding) throw new Error('No embedding in response from OpenAI API');

        const embedding = response.data.data[0].embedding;
        const buffer = float32Buffer(embedding);

        const output = {
            model,
            input,
            embedding,
            buffer
        };

        embeddingCache[input] = output;
        return output;
    } catch (error) {
        console.error('Error generating embeddings:', error);
        throw error;
    }
}

async function query() {

}

function float32Buffer(arr) {
    return Buffer.from(new Float32Array(arr).buffer);
}

module.exports = {
    embed,
    query,
};