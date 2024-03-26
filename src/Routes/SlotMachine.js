
import React, { useState } from 'react';
import axios from 'axios';
import styles from './SlotMachine.module.css';

const SlotMachine = () => {
    const [debugText, setDebugText] = useState('Rolling....');

     const reel1 = ["cherry", "lemon", "apple", "lemon", "banana", "banana", "lemon", "lemon"];
     const reel2 = ["lemon", "apple", "lemon", "lemon", "cherry", "apple", "banana", "lemon"];
     const reel3 = ["lemon", "apple", "lemon", "apple", "cherry", "lemon", "banana", "lemon"];

    const reels = [reel1, reel2, reel3];
    const num_icons = 8;
    const time_per_icon = 100;
    const [index, setIndex] = useState([0, 0, 0]);
    const [status,setStatus] =useState();
    const [balance,setBalance]=useState(20);
    const [win, setWin] = useState('Start and Win Coins');
    const roll = async (reel1, offset = 0) => {


        



        const delta = (offset + 2) * num_icons + Math.round(Math.random() * num_icons);
        // console.log(delta % num_icons)
    
        const style = getComputedStyle(reel1);
        const backgroundPositionY = parseFloat(style["background-position-y"]);
        const targetBackgroundPositionY = backgroundPositionY + delta * 90;
        const normTargetBackgroundPositionY = targetBackgroundPositionY % (num_icons * 90);

        const result = await new Promise((resolve) => {
            setTimeout(() => {
                reel1.style.transition = `background-position-y ${(8 + 1 * delta) * time_per_icon}ms cubic-bezier(.41,-0.01,.63,1.09)`;
                reel1.style.backgroundPositionY = `${backgroundPositionY + delta * 90}px`;
            }, offset * 150);

            setTimeout(() => {
                reel1.style.transition = `none`;
                reel1.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
                resolve(delta % num_icons);


            }, (8 + 1 * delta) * time_per_icon + offset * 150);
        });

        return result;
    };

    const spinSlotMachine = async () => {
        setBalance(prevBalance => prevBalance-1);
        const debugResults =[];
        // setDebugText('rolling...');
        setStatus();
        const reelsList = document.querySelectorAll(`.${styles.slots} > div`);
        const deltas = await Promise.all([...reelsList].map((reel, i) => roll(reel, i)));

        
        const newIndex = index.map((i, idx) => (i + deltas[idx]) % num_icons);
        // console.log('New Indexes:', newIndex);
        setIndex(newIndex);
        
        const debugText = newIndex.map((i, idx) => {
            // console.log(`idx: ${idx}, new idx value: ${i}`);
             
            const results= reels[idx][i];
            debugResults.push(results);
            return reels[idx][i]; 
        }).join('-');
        // console.log(debugResults)
       
            if (debugResults[0] === debugResults[1] ) {
                setStatus('win1');
            } else {
                if (debugResults[1] === debugResults[2]) {
                    setStatus('win2');
                }
            }
        
        
        setDebugText(debugText);
        console.log(debugResults)


        axios.post('https://casino-backend.onrender.com/calculate-coins', debugResults
        )
        
        .then(response => {
            const coinsWon = response.data.coinsWon;
            setWin(`Coins Won: ${coinsWon}`);
            setBalance(prevBalance => prevBalance+ coinsWon)
        })
        .catch(error => {
            console.error('Error occurred while calculating coins:', error);
        });
    };
    return (
        <div className={styles.slotmachine}>
            <h1>Slot Machine</h1>

           
            <div className={(status==='win1')?styles.slots+" "+styles.win1:(status==='win2')?styles.slots+" "+styles.win2:styles.slots}>
                <div id="reel1" className={styles.reel1}></div>
                <div id="reel2" className={styles.reel2}></div>
                <div id="reel3" className={styles.reel3}></div>
            </div>
            <div id="debug" className={styles.debug}>{debugText}</div>
            <button onClick={spinSlotMachine} className={styles.spinbutton}>Spin</button>
            <h2>{win}</h2>
            <h3>balance: {balance}</h3>
        </div>
    );
};

export default SlotMachine;
