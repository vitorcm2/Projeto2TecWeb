import React, { useState, useEffect } from 'react';
import './App.css';
import Form from 'react-bootstrap/Form'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

import lol from "riot-lol";

function App() {
  const leagueAPI = require('node-league-api');

  const RIOT_API_KEY = 'RGAPI-1c7b8473-c7ee-4010-acdd-df71ff57e518';
  const [champions, setChampion] = useState();
  const [items, setItem] = useState();
  const [summoners, setSummoner] = useState();
  const [showChampions, setShowChampions] = useState(false);
  const [showItens, setShowItens] = useState(false);
  const [showSummoners, setShowSummoners] = useState(false);
  const [search, setSearch] = useState("");
  const item_url = "http://ddragon.leagueoflegends.com/cdn/9.20.1/img/item/"
  const summoner_url = "http://ddragon.leagueoflegends.com/cdn/9.20.1/img/spell/"

  const REGION = leagueAPI.CONSTANTS.REGION;

  leagueAPI.init(RIOT_API_KEY, {
    defaultRegion: REGION.BRAZIL
  });

  useEffect(() => {
    lol
      .getChampions()
      .then(champion => {
        console.log(champion);
        setChampion(champion);
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
      .getSummoners()
      .then(summoner => {
        console.log(summoner)
        const clean = []
        const not_exist_img = [2, 3, 11, 15, 16]
        for (var i = 0; i < summoner.length; i++) {
          if (!not_exist_img.includes(i)) {
            clean.push(summoner[i])
          }
        }

        setSummoner(clean);
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

  if (champions && items && summoners) {

    const filteredChampions = champions.filter(item => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });

    const filteredItens = items.filter(item => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });

    const filteredSummoners = summoners.filter(item => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
    return (
      <div className="App">
        <Jumbotron>
          <h1>Welcome to LeagueInfo!</h1>
          <p>
            This is a simple hero unit, a simple jumbotron-style component for calling
            extra attention to featured content or information.
          </p>
          <p>
            <a href="https://developer.riotgames.com/"><Button variant="primary">Powered by <strong>Riot API</strong></Button></a>
          </p>
        </Jumbotron>
        <Form>
          {['checkbox'].map(type => (
            <div key={`inline-${type}`} className="mb-3">
              <Form.Check inline label="Champions" type={type} id={`inline-${type}-1`} onClick={() => setShowChampions(!showChampions)} />
              <Form.Check inline label="Itens" type={type} id={`inline-${type}-2`} onClick={() => setShowItens(!showItens)} />
              <Form.Check inline label="Summoners" type={type} id={`inline-${type}-3`} onClick={() => setShowSummoners(!showSummoners)} />
            </div>
          ))}
        </Form>
        <input
          type="text"
          onChange={e => setSearch(e.target.value)}
          value={search}
          placeholder="Search..."
        />
        <br></br><br></br>



        <header className="Img">
          {showChampions && filteredChampions.map((obj, index) => {
            return (
              <OverlayTrigger
                key={obj.key}
                placement={"top"}
                overlay={
                  <Tooltip id={`tooltip-${"top"}`}>
                    {obj.description}
                  </Tooltip>
                }>
                <div>
                  <div>{obj.name}</div>
                  <Link to={`/Champion/${obj.name}`}>
                    <img src={obj.imageUrl} alt={`img ${obj.name}`} height="60" width="60" />
                  </Link>
                </div>
              </OverlayTrigger>
            )
          })
          }

          {showItens && filteredItens.map((obj, index) => {
            return (
              <OverlayTrigger
                key={obj.id}
                placement={"top"}
                overlay={
                  <Tooltip id={`tooltip-${"top"}`}>
                    {obj.plaintext}
                  </Tooltip>
                }>
                <div>
                  <div>{obj.name}</div>
                  <Link to={`/Itens/${obj.name}`}>
                    <img src={item_url + obj.image.full} alt={`img ${obj.name}`} height="60" width="60" />
                  </Link>
                </div>
              </OverlayTrigger>
            )
          })
          }
          {showSummoners && filteredSummoners.map((obj, index) => {
            return (
              <OverlayTrigger
                key={obj.id}
                placement={"top"}
                overlay={
                  <Tooltip id={`tooltip-${"top"}`}>
                    {obj.description}
                  </Tooltip>
                }>
                <div>
                  <div>{obj.name}</div>
                  <Link to={`/Summoners/${obj.name}`}>
                    <img src={summoner_url + obj.image.full} alt={`img ${obj.name}`} height="60" width="60" />
                  </Link>
                </div>
              </OverlayTrigger>
            )
          })
          }

          {/* <img src={champions[1].imageUrl} className="App-logo" alt="logo" />
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
          </a> */}


        </header>
      </div >
    );
  }

  return (
    <div>Hello world</div>
  )

}

export default App;
