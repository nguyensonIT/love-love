import "./App.css";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function App() {
  return (
    <div className="container">
      <HeartRain />
      <FloatingHearts />
      <BackgroundMusic />
      <motion.div
        className="heart"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [-45, -45, -45],
          boxShadow: ["0 0 5px pink", "0 0 20px red", "0 0 5px pink"],
        }}
        transition={{ repeat: Infinity, duration: 0.8 }}
      >
        <span className="text">S ❤️ H</span>
      </motion.div>
    </div>
  );
}

function HeartRain() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [...prev, Math.random() * 100]);
      setTimeout(() => {
        setHearts((prev) => prev.slice(1));
      }, 4000);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rain">
      {hearts.map((left, index) => (
        <motion.div
          key={index}
          className="falling-heart"
          initial={{ top: "-10%", opacity: 1 }}
          animate={{ top: "110%", opacity: 0 }}
          transition={{ duration: 4, ease: "linear", repeat: Infinity }}
          style={{ left: `${left}%` }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}

function FloatingHearts() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [...prev, Math.random() * 100]);
      setTimeout(() => {
        setHearts((prev) => prev.slice(1));
      }, 4000);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="floating-hearts">
      {hearts.map((left, index) => (
        <motion.div
          key={index}
          className="small-heart"
          initial={{ bottom: 0, opacity: 1 }}
          animate={{ bottom: "100%", opacity: 0 }}
          transition={{ duration: 4, ease: "linear", repeat: Infinity }}
          style={{ left: `${left}%` }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}

function BackgroundMusic() {
  const audioRef = useRef(null);

  useEffect(() => {
    const playMusic = () => {
      if (audioRef.current) {
        audioRef.current.play().catch((error) => {
          console.log("Tự động phát bị chặn", error);
        });
      }
    };

    document.addEventListener("click", playMusic);
    return () => document.removeEventListener("click", playMusic);
  }, []);

  return (
    <audio ref={audioRef} loop>
      <source src="/mp3/bai1.mp3" type="audio/mpeg" />
    </audio>
  );
}
