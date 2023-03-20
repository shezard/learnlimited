import React, { useState, useEffect } from 'react';

import parse from './lib/data';
import Engine from './lib/engine';
import Result from './Result';

import './App.css';

function App() {

    const [engine, setEngine] = useState(null);
    const [results, setResults] = useState({
        results: [],
        next: 0,
        total: 0,
    });

    const [search, setSearch] = useState('');


    useEffect(() => {
        async function fetchData() {
            const result = await fetch(
                '/learnlimited/data.csv',
            );

            const text = await result.text();
            console.log(text);
            const rows = parse(text);
            const engine = new Engine(rows)

            setEngine(engine);
        }

        fetchData();
    }, []);

    return (
        <div className="main">
            <h1>
                <img src="/learnlimited/logo512.png" alt="LL" /> Learn Limited
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
                <button onClick={() => {
                    setResults(engine.search(search));
                }}>
                    <i className="fa fa-search"></i> Search
                </button>
            </div>

            <div id="results">
                {results.results.map((row) => {
                    const key = `${row.video_id}${row.timestamp_draft}`;
                    return <Result key={key} result={row} />
                })}

                {
                    (results.next < results.total) && <button onClick={() => {
                        const newResults = engine.search(search, results.next);
                        setResults({
                            results: results.results.concat(newResults.results),
                            next: newResults.next,
                            total: newResults.total,
                        });
                    }}>
                        <i className="fa fa-arrow-circle-down"></i> Load more videos...
                    </button>
                }
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
