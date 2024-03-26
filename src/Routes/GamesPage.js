import React from "react";
import {useLoaderData} from "react-router-dom";
import axios from "axios";
import styles from './GamesPage.module.css'
import SlotMachine from "./SlotMachine";


export async function loader({params}) {
    const gameId=params.gameId
    const res = await axios.get('https://casino-backend.onrender.com/games/'+gameId)
    const game =res.data
    console.log(game)
   
    return{game}
    
    
}
  
function GamesPage() {
    const {game} = useLoaderData();
    const thumbUrl = game.thumb ? game.thumb.url : '';
    const handlePlayGame = () => {
        // Open the start URL in a new window
        window.open(game.startUrl, '_blank');
      };
    

    return(
        <main id={styles.main}>
            <h2>{game.title}</h2>
              <div className={styles.parts}>
              
             <img src={thumbUrl} alt={game.title} />
             {game.startUrl && (
             <button className={styles.button} onClick={handlePlayGame}>Play {game.title}</button>)}
              <SlotMachine/>
              </div>
            <div className={styles.conditions}>
            <h4> check the win conditions</h4>
             <p>●	3 cherries in a row: 50 coins, 2 cherries in a row: 40 coins</p>
             <p>●	3 Apples in a row: 20 coins, 2 Apples in a row: 10 coins</p>
             <p>●	3 Bananas in a row: 15 coins, 2 Bananas in a row: 5 coins</p> 
              <p>● 3 lemons in a row: 3 coins</p>
            </div>
             <h4>Provider:{game.providerName}</h4>
        </main>
    )
    
}
export default GamesPage