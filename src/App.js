import React, { useState, useEffect } from 'react';
import './App.css';

import Result from './Result';

function init(data) {
  let rows = data.split('\r\n').slice(1);

  rows = rows.map(function(row) {
      const cols = row.split(',');
      return {
          video_id: cols[0],
          set: cols[1],
          colors: cols[2],
          timestamp_draft: cols[3],
          timestamp_match: cols[4],
          player: cols[5],
          format: cols[6],
          soft: cols[7],
      };
  });

  return rows;
}

function App() {

  const [rows, setRows] = useState([]);
  const [results, setResults] = useState([]);

  const [search, setSearch] = useState('');


  useEffect(() => {
    async function fetchData() {
      const result = await fetch(
        './data.csv',
      );

      const text = await result.text();

      setRows(init(text));
    }
    fetchData();
  }, []);

  return (
    <div className="main">
      <h1>Learn Limited</h1>
      <input
        id="search"
        type="text"
        placeholder="Try: IKO nummot"
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={(e) => {
          if(e.charCode === 13) {
            setResults(getResult(rows, search));
          }
        }}
      />
      <button id="validate" onClick={() => {
        setResults(getResult(rows, search));
      }}>
          <i className="fa fa-search"></i> Search
      </button>

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
          <br/>
          All mana images and card symbols © Wizards of the Coast.
      </div>
    </div>
  );
}

function getResult(rows, search) {

  search = search.split(' ');

  return rows.filter(function(row) {
    return search.reduce(function(acc, term) {
        term = term.toLowerCase();
        return acc && (term === row.player.toLowerCase() || term === row.set.toLowerCase());
    }, true);
  });
}

export default App;
