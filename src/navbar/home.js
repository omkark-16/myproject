import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { useDarkMode } from "../components/DarkModeContext";
import styles from "./home.module.css";

const Home = () => {
  const { darkMode } = useDarkMode();

  // 🔗 Handle Button Clicks for Navigation
  const handleNavigation = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
<div className={`${styles.container} ${darkMode ? styles.darkMode : ""}`}>
<header className={styles.header}>
        <h1 className={styles.title}>Welcome to the React.js World!</h1>
        <p className={styles.intro}>
          Learn the power of React, one of the most popular JavaScript
          libraries for building interactive user interfaces.
        </p>
      </header>

      {/* 📌 Button Group */}
      <div className={styles.buttongroup}>
        <button
          className={styles.documentButton}
          onClick={() =>
            handleNavigation(
              "https://drive.google.com/file/d/1GLhIjZYYywDdIwKazQH63NSzwekoh0-s/view"
            )
          }
        >
          Documentation
        </button>

        <button
          className={styles.documentButton}
          onClick={() => handleNavigation("https://react.dev/reference/react")}
        >
          Official Documentation
        </button>
      </div>

      {/* 📌 About Section */}
      <section className={styles.aboutSection}>
        <h2 className={styles.subTitle}>Why React.js?</h2>
        <ul className={styles.pointsList}>
          {[
            {
              title: "Component-Based",
              description:
                "React allows you to build encapsulated components that manage their own state and compose them to make complex UIs.",
            },
            {
              title: "Declarative",
              description:
                "React uses a declarative paradigm to describe how the UI should look, making the code easier to read and maintain.",
            },
            {
              title: "Virtual DOM",
              description:
                "React uses a virtual DOM to efficiently update and render components, improving performance by reducing unnecessary updates.",
            },
            {
              title: "One-Way Data Binding",
              description:
                "React's one-way data flow makes it easier to debug and track data changes in your application.",
            },
            {
              title: "Strong Community & Ecosystem",
              description:
                "React has a vast ecosystem with a strong community, making it easy to find resources, tutorials, and third-party libraries.",
            },
          ].map((item, index) => (
            <li key={index} className={styles.point}>
              <strong>{item.title}:</strong> {item.description}
            </li>
          ))}
        </ul>
      </section>

      {/* 📌 Footer */}
      <footer className={styles.footer}>
        <p>Start building with React today!</p>
      </footer>
    </div>
  );
};

export default Home;
