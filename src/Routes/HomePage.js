import React from "react";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import styles from './HomePage.module.css'
import GamesCard from "../components/GamesCard/GamesCard";
import SerchTerm from "../components/SerchTerm/SearchTerm";

export async function loader(){
 const res = await axios.get('https://casino-backend.onrender.com/games')
 const games= res.data
 return{games};

}

function HomePage(){
    const {games} = useLoaderData()
    
    return(
        <>
        <main id={styles.main}>
          <section id={styles.section1}>
            <div className={styles.recserch}>
            <h2>Recommended Games</h2>
               <SerchTerm game={games}/>
                
            </div>
            
            <ul className={styles.ul} >{
                 games.map((game,index)=>
                 <GamesCard key={game._id} game={game} ></GamesCard>
                 )
      }

      </ul>
    </section>


  </main>
  </>
    )
}
export default HomePage