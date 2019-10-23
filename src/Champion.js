import React,{ useState, useEffect} from 'react';
import lol from "riot-lol";



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
            <div>
                <h1>Champion Page</h1>
                <p>{champion.name}</p>
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