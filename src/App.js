import React, { useState, useEffect } from 'react';
import { Search } from 'js-search';

import init from './lib/data';
import tokenize from './lib/search';
import Result from './Result';

import './App.css';

function App() {

    const [engine, setEngine] = useState(null);
    const [results, setResults] = useState([]);

    const [search, setSearch] = useState('');


    useEffect(() => {
        async function fetchData() {
            const result = await fetch(
                '/learnlimited/data.csv',
            );

            const text = await result.text();

            const rows = init(text);

            let engine = new Search('id');
            engine.tokenizer = {
                tokenize
            }

            engine.addIndex('player');
            engine.addIndex('set');
            engine.addIndex('colors');
            engine.addIndex('soft');
            engine.addIndex('format');

            engine.addDocuments(rows);


            setEngine(engine);
        }

        fetchData();
    }, []);

    return (
        <div className="main">
            <h1>
                <img src="/learnlimited/logo138-transparent.png" alt="LL" /> Learn Limited
            </h1>
            <div className="search">
                <input
                    type="text"
                    placeholder="Try: IKO nummot"
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.charCode === 13) {
                            setResults(engine.search(search));
                        }
                    }}
                />
                <button id="validate" onClick={() => {
                    setResults(engine.search(search));
                }}>
                    <i className="fa fa-search"></i> Search
                </button>
            </div>

            <div id="results">
                {results.map((row) => {
                    const key = `${row.video_id}${row.timestamp_draft}`;
                    return <Result key={key} result={row} />
                })}
            </div>

            <div className="disclaimer">
                Portions of Learn Limited are unofficial Fan Content permitted under the Wizards of the Coast Fan Content Policy.
                The literal and graphical information presented on this site about Magic: The Gathering, including card images, the mana symbols, and Oracle text, is copyright Wizards of the Coast, LLC, a subsidiary of Hasbro, Inc.
                Learn Limited is not produced by, endorsed by, supported by, or affiliated with Wizards of the Coast.
                <br />
                All mana images and card symbols © Wizards of the Coast.
            </div>
        </div>
    );
}

export default App;
