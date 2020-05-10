import React, { useState, useEffect } from 'react';

import './App.css';
import {Search} from 'js-search';

import Result from './Result';

function init(data) {
  let rows = data.split('\r\n').slice(1);

  rows = rows.filter((row) => {
    return row.length
  });

  rows = rows.map(function(row, idx) {
      const cols = row.split(',');
      return {
          id: idx,
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
      <h1>Learn Limited</h1>
      <input
        id="search"
        type="text"
        placeholder="Try: IKO nummot"
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={(e) => {
          if(e.charCode === 13) {
            setResults(engine.search(search));
          }
        }}
      />
      <button id="validate" onClick={() => {
        setResults(engine.search(search));
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

function tokenize(text) {

  const REGEX = /[^a-zа-яё0-9\-']+/i;

  const colorMap = {
    'u': 'blue',
    'r': 'red',
    'w': 'white',
    'g': 'green',
    'b': 'black',
  };

  // Do not put uppercase here !
  const setMap = {
    'tsp': 'time spiral',
    'isd': 'innistrad',
    'iko': 'ikoria',
    'inv': 'invasion',
    'thb': 'theros beyond death',
  };

  const isShortColor = !!text.match(/^[rgbwu]+$/i);

  const isSet = !!setMap[text];

  if(isShortColor) {
    return [
      text,
      ...text.split(''),
      ...text.split('').map(function(color) {
        return colorMap[color];
      })
    ];
  }

  if(isSet) {
    return [
      text,
      ...setMap[text].split(REGEX),
    ];
  }

  return text
    .split(REGEX)
    .filter(
      (text) => text // Filter empty tokens
    );
}

export default App;
