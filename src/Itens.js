import React, { useState, useEffect } from 'react';
import lol from "riot-lol";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


function Itens({ match }) {
    const [item, setItem] = useState();
    const item_url = "http://ddragon.leagueoflegends.com/cdn/9.20.1/img/item/"

    useEffect(() => {
        console.log(match.params.id);
        lol
            .getItem(match.params.id)
            .then(item => {
                console.log(item);
                setItem(item);
            })
            .catch(err => {
                console.log(err);
            });


    }, []);
    if (item) {
        return (
            <div className="App">
                <Jumbotron>
                    <h1>{item.name}'s page</h1>
                    <p>
                        <Link to={"/"}>
                            <Button variant="primary">◄ Home</Button>
                        </Link>
                    </p>
                </Jumbotron>
                <img src={item_url + item.image.full} alt={`img ${item.name}`} height="200" width="200" />
                <h2>{item.plaintext}</h2>
                <br></br>
                <h3>Preço de compra : {item.gold.base}</h3>
                <h3>Preço de venda : {item.gold.sell}</h3>
                <br></br>
                <h3>{item.description}</h3>
            </div>
        );
    }
    return (
        <div>
            <h1>Itens Page</h1>

        </div>
    );
}

export default Itens;