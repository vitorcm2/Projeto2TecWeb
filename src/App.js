import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import lol from "riot-lol";

function App() {
  const leagueAPI = require('node-league-api');

  const RIOT_API_KEY = 'RGAPI-1c7b8473-c7ee-4010-acdd-df71ff57e518';
  const [champions, setChampions] = useState();
  const [items, setItem] = useState();
  const [runes, setRune] = useState();
  const item_url = "http://ddragon.leagueoflegends.com/cdn/9.20.1/img/item/"

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

  useEffect(() => {
    lol
    .getItems()
    .then(item => {
      console.log(item);
      setItem(item);
    })
    .catch(err => {
      console.log(err);
    });
  }, [])

  useEffect(() => {
    lol
    .getRunes()
    .then(rune => {
      console.log(rune);
      setRune(rune);
    })
    .catch(err => {
      console.log(err);
    });
  }, [])

  
  if (champions && items) {
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
          {items.map((obj, index) => {
            return (
              <div key={obj.id}>
              <div>{obj.name}</div>
              <img src={item_url + obj.image.full} alt={`img ${obj.name}`} height="60" width="60"/>
              </div>
            )
          })
          }
          {runes.map((obj, index) => {
            return (
              <div key={obj.id}>
              <div>{obj.name}</div>
              <div>{obj.description}</div>
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
