import React,{ useState, useEffect} from 'react';
import lol from "riot-lol";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';



function Summoners ({match}) {
    const [summoner, setSummoner] = useState();
    const summoner_url = "http://ddragon.leagueoflegends.com/cdn/9.20.1/img/spell/"

    useEffect(() =>{
        console.log(match.params.id);
        lol
      .getSummoner(match.params.id)
      .then(summoner => {
        console.log(summoner);
        setSummoner(summoner);
      })
      .catch(err => {
        console.log(err);
      });


    }, []);
    if (summoner) {
        return (
            <div className="App">
                <Jumbotron>
                    <h1>{summoner.name}'s page</h1>
                    <p>
                        <Link to={"/"}>
                        <Button variant="primary">Home</Button>
                        </Link>
                    </p>
                </Jumbotron> 
                <img src={summoner_url + summoner.image.full} alt={`img ${summoner.name}`} height="200" width="200" />
                <h3>{summoner.tooltip}</h3>
                <br></br>
                <h3>Cooldown : {summoner.cooldown} segundos</h3>
            </div>
        );
    }
    return (
        <div>
            <h1>Champion Page</h1>
        </div>
    );
}
export default Summoners;