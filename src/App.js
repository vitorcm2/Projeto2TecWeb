import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import lol from "riot-lol";

function App() {
  const leagueAPI = require('node-league-api');

  const RIOT_API_KEY = 'RGAPI-1c7b8473-c7ee-4010-acdd-df71ff57e518';
  const [champions, setChampions] = useState();

  const REGION = leagueAPI.CONSTANTS.REGION;

  leagueAPI.init(RIOT_API_KEY, {
    defaultRegion: REGION.BRAZIL
  });

  useEffect(() => {
    lol
    .getChampions()
    .then(champion => {
      console.log(champion);
      setChampions(champion);
    })
    .catch(err => {
      console.log(err);
    });
  }, [])
  
  if (champions) {
    return (
      <div className="App">
        <header className="App-header">
          {champions.map((obj, index) => {
            return (
              <div key={obj.key}>
              <div>{obj.name}</div>
              <img src={obj.imageUrl} alt={`img ${obj.name}`} height="60" width="60"/>
              </div>
            )
          })
          }
          <img src={champions[1].imageUrl} className="App-logo" alt="logo" />
          <code>{champions[1].name}</code>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }

  return (
    <div>Hello world</div>
  )

}

export default App;
