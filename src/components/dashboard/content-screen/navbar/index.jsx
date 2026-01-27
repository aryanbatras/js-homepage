import styles from "./index.module.sass";
import {FaBookOpen, FaComments, FaCode} from "react-icons/fa";
import {MdFullscreen, MdOutlineKeyboardArrowLeft} from "react-icons/md";
import {PiNotepadLight} from "react-icons/pi";
import {TiTickOutline} from "react-icons/ti";
import { useState } from "react";
export default function Navbar({ setNavbarOption, currentOption }) {
  return (
      <div className={styles.navbar}>
        <div className={styles.navbar__items}>
          <button 
            className={`${styles.navbar__item} ${currentOption === "description" ? styles.active : ""}`} 
            onClick={() => setNavbarOption("description")}
          >
            <div className={styles.icon}>
              <PiNotepadLight />
            </div>
            <span>Description</span>
          </button>
          {/* <button 
            className={`${styles.navbar__item} ${currentOption === "editorial" ? styles.active : ""}`} 
            onClick={() => setNavbarOption("editorial")}
          >
            <div className={styles.icon}>
              <FaBookOpen />
            </div>
            <span>Editorial</span>
          </button> */}
          <button 
            className={`${styles.navbar__item} ${currentOption === "solution" ? styles.active : ""}`} 
            onClick={() => setNavbarOption("solution")}
          >
            <div className={styles.icon}>
              <TiTickOutline />
            </div>
            <span>Solution</span>
          </button>
          <button 
            className={`${styles.navbar__item} ${currentOption === "submissions" ? styles.active : ""}`} 
            onClick={() => setNavbarOption("submissions")}
          >
            <div className={styles.icon}>
              <FaCode />
            </div>
            <span>Submissions</span>
          </button>
          <button 
            className={`${styles.navbar__item} ${currentOption === "discussion" ? styles.active : ""}`} 
            onClick={() => setNavbarOption("discussion")}
          >
            <div className={styles.icon}>
              <FaComments />
            </div>
            <span>Discussion</span>
          </button>
        </div>
        {/* <div className={styles.navbar__overlay}>
          <div className={styles.navbar__overlay__item}>
            <MdFullscreen />
            <span>Fullscreen</span>
          </div>
          <div className={styles.navbar__overlay__item}>
            <MdOutlineKeyboardArrowLeft />
            <span>Fold</span>
          </div>
        </div> */}
      </div>
  );
}
