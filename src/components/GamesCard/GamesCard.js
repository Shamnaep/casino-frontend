import React from "react";
import styles from './GamesCard.module.css'
import { Link } from "react-router-dom";
function GamesCard(props){
    const game= props.game
    const thumbUrl = game.thumb ? game.thumb.url : '';
   
    return(
        <Link  to={'/Games/'+game._id} className={styles.Link}>
        <li className={styles.game} key={game._id}>
            <img src={thumbUrl} alt={game.title} />
             <h2>{game.title}</h2>
        </li>
       </Link>
    )
}
export default GamesCard