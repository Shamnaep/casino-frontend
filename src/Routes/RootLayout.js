import React from "react";
import styles from './RootLayout.module.css'
import { Link, Outlet } from "react-router-dom";

function RootLayout(props){
    return(
      <>
        
        <header className={styles.header1}>
         <div className={styles.container}>
           <span className={styles.casino}>Casino</span>
           <nav>
           <ul className={styles.ul}>
            <li ><Link className={styles.li} to="/">Home</Link> </li>
            <li ><Link className={styles.li} to="about">About</Link> </li>
            <li ><Link className={styles.li} to="/contact">Contact us</Link></li>
            <a className={styles.explore} href="explore">explore</a>
           </ul>
           </nav>
          </div>
        </header>
        <Outlet/>
        <footer>
          <div  className={styles.footer}>
            <p>Thank you for visiting my web page please login and come back again...
              <p>Warm Regards, </p>
              <p>Shamna Elambulavil
              </p>
            </p>
          </div>
          
          </footer> 
        </>
    );
}

export default RootLayout