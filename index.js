const log = require("debug")("embedding.js:index");

const { HierarchicalNSW } = require("hnswlib-node");

const { embed } = require("./services");

class EmbeddingDatabase {
    constructor(dimensions = 1536, limit = 1000) {
        this.db = [];
        this.dimensions = dimensions;
        this.limit = 1000;
        this.index = new HierarchicalNSW("l2", this.dimensions);
        this.index.initIndex(this.limit);
    }

    async search(query, limit = 1) {
        const embedding = await embed(query);
        const { distances, neighbors } = this.index.searchKnn(embedding.embedding, limit);
        return neighbors.map((neighbor, i) => {
            const data = this.db[neighbor].data;
            data._distance = distances[i];
            return data;
        });
    }

    async add(obj) {
        const embedding = await embed(obj);

        this.db.push(embedding);
        this.index.addPoint(embedding.embedding, this.db.length - 1);

        return embedding;
    }
}

module.exports = {
    EmbeddingDatabase,
};