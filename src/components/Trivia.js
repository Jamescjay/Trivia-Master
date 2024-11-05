import React, { useState, useEffect } from "react";
import "../App.css";
import music from "../music.mp3";
import correctSound from "../correct.mp3";
import incorrectSound from "../incorrect.mp3";
import { useNavigate } from "react-router-dom";



const triviaData = [
  {
    id: 1,
    level: 1,
    question: "What do omnivorous animals eat?",
    answers: {
      A: "only plants",
      B: "only animals",
      C: "Both plants and animals",
      D: "only drink water",
    },
    correctAnswer: "C",
  },
  {
    id: 2,
    level: 2,
    question: "Which planet is known as the Red Planet?",
    answers: { A: "Earth", B: "Mars", C: "Jupiter", D: "Venus" },
    correctAnswer: "B",
  },
  {
    id: 3,
    level: 3,
    question: "Who developed the theory of relativity?",
    answers: {
      A: "Albert Einstein",
      B: "Isaac Newton",
      C: "Nikola Tesla",
      D: "Galileo Galilei",
    },
    correctAnswer: "A",
  },
  {
    id: 4,
    level: 4,
    question: "Which continent is the largest by area?",
    answers: { A: "Asia", B: "Africa", C: "Europe", D: "Antarctica" },
    correctAnswer: "A",
  },
  {
    id: 5,
    level: 5,
    question: "How many planets are in the Solar System?",
    answers: { A: "8 planets", B: "9 planets", C: "7 planets", D: "6 planets" },
    correctAnswer: "A",
  },
  {
    id: 6,
    level: 6,
    question: "What gas do plants primarily release during photosynthesis?",
    answers: { A: "Oxygen", B: "Hydrogen", C: "Nitrogen", D: "Carbon Dioxide" },
    correctAnswer: "A",
  },
  {
    id: 7,
    level: 7,
    question: "What type of organism is yeast?",
    answers: { A: "Bacteria", B: "Fungi", C: "Algae", D: "Viruses" },
    correctAnswer: "B",
  },
  {
    id: 8,
    level: 8,
    question: "Who painted the Mona Lisa?",
    answers: {
      A: "Leonardo da Vinci",
      B: "Michelangelo",
      C: "Vincent van Gogh",
      D: "Pablo Picasso",
    },
    correctAnswer: "A",
  },
  {
    id: 9,
    level: 9,
    question: "What is the largest ocean on Earth?",
    answers: {
      A: "Pacific Ocean",
      B: "Atlantic Ocean",
      C: "Indian Ocean",
      D: "Arctic Ocean",
    },
    correctAnswer: "A",
  },
  {
    id: 10,
    level: 10,
    question: "Which animal is known for its trunk?",
    answers: { A: "Elephants", B: "Tigers", C: "Dolphins", D: "Lions" },
    correctAnswer: "A",
  },
  {
    id: 11,
    level: 11,
    question: "Which metal is known for being liquid at room temperature?",
    answers: { A: "Mercury", B: "Gold", C: "Silver", D: "Iron" },
    correctAnswer: "A",
  },
  {
    id: 12,
    level: 12,
    question: "What is the powerhouse of the cell?",
    answers: { A: "Nucleus", B: "Ribosome", C: "Mitochondria", D: "Cytoplasm" },
    correctAnswer: "C",
  },
  {
    id: 13,
    level: 13,
    question: "Which planet has the most moons?",
    answers: { A: "Earth", B: "Saturn", C: "Mars", D: "Venus" },
    correctAnswer: "B",
  },
  {
    id: 14,
    level: 14,
    question: "What vitamin is produced when a person is exposed to sunlight?",
    answers: { A: "Vitamin A", B: "Vitamin B", C: "Vitamin C", D: "Vitamin D" },
    correctAnswer: "D",
  },
  {
    id: 15,
    level: 15,
    question: "What is the chemical symbol for water?",
    answers: { A: "H2O", B: "CO2", C: "NaCl", D: "O2" },
    correctAnswer: "A",
  },
  {
    id: 16,
    level: 16,
    question: "What part of the plant conducts photosynthesis?",
    answers: { A: "Roots", B: "Stem", C: "Leaves", D: "Flower" },
    correctAnswer: "C",
  },
  {
    id: 17,
    level: 17,
    question: "What is the main gas found in the air we breathe?",
    answers: { A: "Oxygen", B: "Nitrogen", C: "Carbon Dioxide", D: "Hydrogen" },
    correctAnswer: "B",
  },
  {
    id: 18,
    level: 18,
    question: "How many colors are in a rainbow?",
    answers: { A: "5", B: "6", C: "7", D: "8" },
    correctAnswer: "C",
  },
  {
    id: 19,
    level: 19,
    question: "Which planet is known for its rings?",
    answers: { A: "Mars", B: "Saturn", C: "Earth", D: "Jupiter" },
    correctAnswer: "B",
  },
  {
    id: 20,
    level: 20,
    question: "What is the smallest unit of life?",
    answers: { A: "Organ", B: "Cell", C: "Tissue", D: "Molecule" },
    correctAnswer: "B",
  },
];

const audio = new Audio(music);
audio.loop = true;

function Trivia() {
  const [level, setLevel] = useState(1);
  const [coins, setCoins] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(
    triviaData.find((q) => q.level === level)
  );
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [bgColor, setBgColor] = useState("");
  const [musicPlaying, setMusicPlaying] = useState(
    localStorage.getItem("musicPlaying") === "true"
  );
  const [showCongratsModal, setShowCongratsModal] = useState(false);
  const [questionVisible, setQuestionVisible] = useState(false);
  const [buttonVisibleIndex, setButtonVisibleIndex] = useState(0);

  const toggleMusic = () => {
    if (musicPlaying) {
      audio.pause();
      setMusicPlaying(false);
      localStorage.setItem("musicPlaying", "false");
    } else {
      audio
        .play()
        .catch((error) => console.log("Audio playback failed:", error));
      setMusicPlaying(true);
      localStorage.setItem("musicPlaying", "true");
    }
  };

  useEffect(() => {
    if (musicPlaying)
      audio
        .play()
        .catch((error) => console.log("Audio playback failed:", error));
    else audio.pause();
  }, [musicPlaying]);

  useEffect(() => {
    setQuestionVisible(false);
    setTimeout(() => setQuestionVisible(true), 100);
  }, [currentQuestion]);

  useEffect(() => {
    setButtonVisibleIndex(0);
    const buttonInterval = setInterval(() => {
      setButtonVisibleIndex((prevIndex) => {
        if (prevIndex < Object.keys(currentQuestion.answers).length - 1)
          return prevIndex + 1;
        clearInterval(buttonInterval);
        return prevIndex;
      });
    }, 500);
    return () => clearInterval(buttonInterval);
  }, [currentQuestion]);

  useEffect(() => {
    const closeTimer = setTimeout(() => setShowModal(false), 3000);
    return () => clearTimeout(closeTimer);
  }, [showModal]);

  const navigate = useNavigate();

  const handleAnswer = (answerKey) => {
    setSelectedAnswer(answerKey);
    if (answerKey === currentQuestion.correctAnswer) {
      setCoins(coins + 10);
      setModalMessage("Correct!✅😊😊 Moving to the next level.");
      setBgColor("correct");
      new Audio(correctSound).play();

      setTimeout(() => {
        if (level === 20) {
          setShowCongratsModal(true);
          setTimeout(() => navigate("/home"), 2000);
        } else {
          setLevel(level + 1);
          setCurrentQuestion(triviaData.find((q) => q.level === level + 1));
          setShowModal(true);
        }
        setSelectedAnswer(null);
        setBgColor("");
      }, 2000);
    } else {
      setModalMessage("Oops Incorrect!❌😢😢 Game Over.");
      setBgColor("incorrect");
      new Audio(incorrectSound).play();

      setShowModal(true);
      setTimeout(() => {
        navigate("/home");
      }, 2000);

      setSelectedAnswer(null);
      setBgColor("");
    }
  };



  return (
    <div className="App">
      <div className="head">
        <button className="music" onClick={toggleMusic}>
          {musicPlaying ? "🎵 on" : "🎵 off"}
        </button>
        <button onClick={() => navigate("/home")} className="close">
          Back
        </button>
      </div>
      <div className="header">
        <div className="level">Level: {level}</div>
        <div className="coins">Coins: 💰{coins}</div>
      </div>

      <div className={`question-box ${questionVisible ? "fade-in" : ""}`}>
        <h2>{currentQuestion.question}</h2>
      </div>

      <div className="answers">
        {Object.keys(currentQuestion.answers).map((key, index) => (
          <button
            key={key}
            onClick={() => handleAnswer(key)}
            className={
              selectedAnswer === key && bgColor === "correct"
                ? "button-correct"
                : selectedAnswer === key && bgColor === "incorrect"
                ? "button-incorrect"
                : ""
            }
            style={{
              visibility: index <= buttonVisibleIndex ? "visible" : "hidden",
              transition: "opacity 0.5s",
              opacity: index <= buttonVisibleIndex ? 1 : 0,
            }}
          >
            {key}: {currentQuestion.answers[key]}
          </button>
        ))}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>{modalMessage}</p>
          </div>
        </div>
      )}

      {showCongratsModal && (
        <div className="modal">
          <div className="modal-content">
            <p>🎉🏆 Congratulations! 🎉 You have completed all levels! 🏆</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Trivia;
