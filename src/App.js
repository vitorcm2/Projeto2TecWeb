import React, { useState, useEffect } from 'react';
import './App.css';
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import InputGroup from 'react-bootstrap/InputGroup'
import 'bootstrap/dist/css/bootstrap.min.css';

import lol from "riot-lol";

function App() {
  const leagueAPI = require('node-league-api');

  const RIOT_API_KEY = 'RGAPI-1c7b8473-c7ee-4010-acdd-df71ff57e518';
  const [champions, setChampions] = useState();
  const [items, setItem] = useState();
  const [runes, setRune] = useState();
  const [showChampions, setShowChampions] = useState(false);
  const [showItens, setShowItens] = useState(false);
  const [showRunes, setShowRunes] = useState(false);
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

  // useEffect(() => {
  //   lol
  //     .getChampion("Aatrox")
  //     .then(champion => {
  //       console.log(champion);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }, [])

  if (champions && items && runes) {
    return (
      <div className="App">
        <Jumbotron>
          <h1>Welcome to LeagueStats!</h1>
          <p>
            This is a simple hero unit, a simple jumbotron-style component for calling
            extra attention to featured content or information.
  </p>
          <p>
            <a href="https://developer.riotgames.com/"><Button variant="primary">Riot API</Button></a>
          </p>
        </Jumbotron>
        <Form>
          {['checkbox'].map(type => (
            <div key={`inline-${type}`} className="mb-3">
              <Form.Check inline label="Champions" type={type} id={`inline-${type}-1`} onClick={() => setShowChampions(!showChampions)} />
              <Form.Check inline label="Itens" type={type} id={`inline-${type}-2`} onClick={() => setShowItens(!showItens)} />
              <Form.Check inline label="Runas" type={type} id={`inline-${type}-3`} onClick={() => setShowRunes(!showRunes)} />
            </div>
          ))}
        </Form>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search Champion / Item / Rune"
            aria-label="Search Champion / Item / Rune"
            aria-describedby="basic-addon2"
          />
          <InputGroup.Append>
            <Button variant="outline-secondary">Search</Button>
          </InputGroup.Append>
        </InputGroup>
        <header className="App-header">
          {showChampions && champions.map((obj, index) => {
            return (
              <div key={obj.key}>
                <div>{obj.name}</div>
                <img src={obj.imageUrl} alt={`img ${obj.name}`} height="60" width="60" />
              </div>
            )
          })
          }
          {showItens && items.map((obj, index) => {
            return (
              <div key={obj.id}>
                <div>{obj.name}</div>
                <img src={item_url + obj.image.full} alt={`img ${obj.name}`} height="60" width="60" />
              </div>
            )
          })
          }
          {showRunes && runes.map((obj, index) => {
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
      </div >
    );
  }

  return (
    <div>Hello world</div>
  )

}

export default App;
