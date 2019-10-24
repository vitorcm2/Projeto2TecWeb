import React, { useState, useEffect } from 'react';
import lol from "riot-lol";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Collapse from 'react-bootstrap/Collapse'
import Alert from 'react-bootstrap/Alert'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import './Champion.css';


function Champion({ match }) {
    const [champion, setChampion] = useState();
    const [openAlly, setOpenAlly] = useState(false);
    const [openEnemy, setOpenEnemy] = useState(false);
    const champion_url_loading = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/"
    const champion_url_loading_end = "_0.jpg"
    const passive_url = "http://ddragon.leagueoflegends.com/cdn/9.21.1/img/passive/"
    const spell_url = "http://ddragon.leagueoflegends.com/cdn/9.21.1/img/spell/"

    useEffect(() => {
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

        const championSpells = champion.spells.filter(item => {
            return item;
        });
        const championAllytips = champion.allytips.filter(item => {
            return item;
        });
        const championEnemytips = champion.enemytips.filter(item => {
            return item;
        });

        return (
            <div className="App">
                <Jumbotron>
                    <h1>{champion.name}'s page</h1>
                    <p>
                        <Link to={"/"}>
                            <Button variant="primary">◄ Home</Button>
                        </Link>
                    </p>
                </Jumbotron>
                <div className="container">
                    <h3>{champion.name}</h3>
                    <h4><i>{champion.title}</i></h4>
                    <img src={champion_url_loading + champion.name + champion_url_loading_end} alt={`img ${champion.name}`} />
                    <h4><sub>Champion Description</sub></h4>
                    <p>{champion.lore}</p>
                    <h4><sub>Champion Passive</sub></h4>
                    <OverlayTrigger
                        trigger="hover"
                        placement={"bottom"}
                        overlay={
                            <Popover id={`popover-positioned-${"bottom"}`}>
                                <Popover.Title as="h3">{champion.passive.name}</Popover.Title>
                                <Popover.Content>
                                    {champion.passive.description}
                                </Popover.Content>
                            </Popover>
                        }
                    >
                        <div>
                            <div>{champion.passive.name}</div>
                            <img src={passive_url + champion.passive.image.full} alt={`img ${champion.name}`} height="50" width="50" />
                        </div>
                    </OverlayTrigger>

                    <h4><sub>Champion Habilities</sub></h4>

                    {championSpells.map((spell, index) => {
                        return (
                            <OverlayTrigger
                                trigger="hover"
                                key={spell.id}
                                placement={"bottom"}
                                overlay={
                                    <Popover id={`popover-positioned-${"bottom"}`}>
                                        <Popover.Title as="h3">{spell.name}</Popover.Title>
                                        <Popover.Content>
                                            {spell.description}
                                        </Popover.Content>
                                    </Popover>
                                }
                            >
                                <div >
                                    <div>{spell.name}</div>
                                    <img className="Habilities" src={spell_url + spell.image.full} alt={`img ${champion.name}`} height="60" width="60" />
                                </div>
                            </OverlayTrigger>
                        )
                    })
                    }
                    <h4><sub>Champion Tips</sub></h4>
                    <Button
                        variant="success"
                        onClick={() => setOpenAlly(!openAlly)}
                        aria-controls="example-collapse-text"
                        aria-expanded={openAlly}
                    >
                        Ally Tips
                    </Button>
                    <Collapse in={openAlly}>
                        <div id="example-collapse-text">
                            <Alert variant="success">
                                <Alert.Heading>Ally Tips during the game</Alert.Heading>
                                {championAllytips.map((allytips, index) => {
                                    return (
                                        <div>
                                            <hr />
                                            <p className="mb-0">{allytips}</p>

                                        </div>
                                    )
                                })
                                }
                            </Alert>
                        </div>
                    </Collapse>
                    <Button
                        variant="danger"
                        onClick={() => setOpenEnemy(!openEnemy)}
                        aria-controls="example-collapse-text"
                        aria-expanded={openEnemy}
                    >
                        Enemy Tips
                    </Button>
                    <Collapse in={openEnemy}>
                        <div id="example-collapse-text">
                            <Alert variant="danger">
                                <Alert.Heading>Enemy Tips during the game</Alert.Heading>
                                {championEnemytips.map((enemytips, index) => {
                                    return (
                                        <div>
                                            <hr />
                                            <p className="mb-0">{enemytips}</p>
                                        </div>
                                    )
                                })
                                }
                            </Alert>
                        </div>
                    </Collapse>
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