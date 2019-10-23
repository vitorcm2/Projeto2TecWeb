import React,{ useState, useEffect} from 'react';
import lol from "riot-lol";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';



function Champion ({match}) {
    const [champion, setChampion] = useState();

    useEffect(() =>{
        console.log(match.params.id);
        lol
      .getChampion(match.params.id)
      .then(champion => {
        console.log(champion);
        setChampion(champion);
      })
      .catch(err => {
        console.log(err);
      });


    }, []);
    
    if (champion) {
        return (
            <div className="App">
            <Jumbotron>
            <h1>{champion.name}'s page</h1>
            <p>
                <Link to={"/"}>
                <Button variant="primary">Home</Button>
                </Link>
            </p>
            </Jumbotron>
            <div>
                <p>{champion.name}</p>
            </div>
            </div>
        );
    }
    return (
        <div>
            <h1>Champion Page</h1>
        </div>
    );
}

export default Champion;