import { Search } from 'js-search';
import tokenize from './search';

let engine = function(rows) {

    let search = new Search('id');
    search.tokenizer = {
        tokenize
    }

    search.addIndex('player');
    search.addIndex('set');
    search.addIndex('colors');
    search.addIndex('soft');
    search.addIndex('format');

    search.addDocuments(rows);

    this.engine = search;
}

engine.prototype.search = function(term, start = 0, offset = 5) {
    console.log(term, start, offset);
    const results = this.engine.search(term);
    return {
        results: results.slice(start, start + offset),
        next: Math.min(results.length, start + offset),
        total: results.length,
    }
}

export default engine;
