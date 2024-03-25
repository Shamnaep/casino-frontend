import React, { useState } from "react";
import GamesCard from "../GamesCard/GamesCard";
import styles from "./serchTerm.module.css"

function SerchTerm({ game }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [searching, setSearching] = useState(false);

    const filteredGames = game.filter((game) =>
     game.title?.toLowerCase().includes(searchTerm.toLowerCase())
);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        setSearching(e.target.value.trim() !== "");
    };

    return (
        <div>
            
            <input 
                type="text"
                placeholder="Search games..."
                value={searchTerm}
                onChange={handleInputChange}
                className={styles.input} 
            />
            {/* Display search results */}
            {searching && (
                <ul className={styles.gamecardcontainer}> 
                    {filteredGames.map((game) => (
                        <li key={game._id} className={styles.gamecard}> 
                            <GamesCard game={game} />
        
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SerchTerm;
