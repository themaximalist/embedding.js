const openai = require("./openai");

const embeddingCache = {};
const EMBEDDING_MODEL = process.env.EMBEDDING_MODEL || "text-embedding-ada-002";

async function embed(data, model = EMBEDDING_MODEL) {
    try {
        let input = data;
        if (typeof input !== 'string') input = JSON.stringify(input);
        if (embeddingCache[input]) return embeddingCache[input];
        const response = await openai.createEmbedding({ model, input });
        if (!response) throw new Error('No response from OpenAI API');
        if (!response.data) throw new Error('No data in response from OpenAI API');
        if (!response.data.data) throw new Error('No internal data in response from OpenAI API');
        if (response.data.data.length !== 1) throw new Error('Expected 1 embedding, got ' + response.data.data.length);
        if (!response.data.data[0].embedding) throw new Error('No embedding in response from OpenAI API');

        const embedding = response.data.data[0].embedding;

        const output = {
            model,
            input,
            data,
            embedding,
        };

        embeddingCache[input] = output;

        return output;
    } catch (error) {
        console.error('Error generating embeddings:', error);
        throw error;
    }
}

module.exports = {
    embed,
}