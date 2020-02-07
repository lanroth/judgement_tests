import React, { useState } from "react";
import "./App.css";
import Question from "./Question";
import SampleData from "./SampleData";
import Outro from "./Outro";
import Instruct from "./Instruct";
import Progress from "./Progress";

const App: React.FC = () => {
  const [questionNumber, setQuestionNumber] = useState(1);

  const examLength = SampleData.examPaper.length;
  const [showQuestion, setShowQuestion] = useState(true);

  // mock data
  // NB ONLY EXPORT QUESTIONS not ANSWERS
  const scenario = SampleData.examPaper[questionNumber - 1];

  const [best, setBest] = useState(0);
  const [worst, setWorst] = useState(0);

  // selecting option A as best sets the value of best to 1
  const bestOptA = () => {
    setBest(1);
    writeToLocalStorage("Best", "A");
    if (best === 1) {
      setBest(0);
    }
  };

  // selecting option B as best sets the value of best to 2
  const bestOptB = () => {
    setBest(2);
    writeToLocalStorage("Best", "B");
    if (best === 2) {
      setBest(0);
    }
  };

  // selecting option C as best sets the value of best to 3
  const bestOptC = () => {
    setBest(3);
    writeToLocalStorage("Best", "C");
    if (best === 3) {
      setBest(0);
    }
  };

  // selecting option D as best sets the value of best to 4
  const bestOptD = () => {
    setBest(4);
    writeToLocalStorage("Best", "D");
    if (best === 4) {
      setBest(0);
    }
  };

  // selecting option A as worst sets the value of worst to 1
  const worstOptA = () => {
    setWorst(1);
    writeToLocalStorage("Worst", "A");
    if (worst === 1) {
      setWorst(0);
    }
  };

  // selecting option B as worst sets the value of worst to 2
  const worstOptB = () => {
    setWorst(2);
    writeToLocalStorage("Worst", "B");
    if (worst === 2) {
      setWorst(0);
    }
  };

  // selecting option C as worst sets the value of worst to 3
  const worstOptC = () => {
    setWorst(3);
    writeToLocalStorage("Worst", "C");
    if (worst === 3) {
      setWorst(0);
    }
  };

  // selecting option D as worst sets the value of worst to 4
  const worstOptD = () => {
    setWorst(4);
    writeToLocalStorage("Worst", "D");
    if (worst === 4) {
      setWorst(0);
    }
  };

  const writeToLocalStorage = (x: string, y: string) => {
    localStorage["q" + questionNumber + x] = y;
  };

  const submitHandling = () => {
    if (best === 0 || worst === 0) {
      alert("You MUST select one Best option AND one Worst option");
    } else {
      if (questionNumber < examLength) {
        setQuestionNumber(questionNumber + 1);
        setBest(0);
        setWorst(0);
      } else {
        setShowQuestion(false);
      }
    }
  };

  return (
    <div className="App">
      {showQuestion ? (
        <article>
          <Instruct />
          <Progress examLength={examLength} questionNumber={questionNumber} />
          <Question
            questionNumber={questionNumber}
            scenarioText={scenario.scenarioText}
            optTextA={scenario.optTextA}
            optTextB={scenario.optTextB}
            optTextC={scenario.optTextC}
            optTextD={scenario.optTextD}
            submitHandling={submitHandling}
            bestOptA={bestOptA}
            bestOptB={bestOptB}
            bestOptC={bestOptC}
            bestOptD={bestOptD}
            worstOptA={worstOptA}
            worstOptB={worstOptB}
            worstOptC={worstOptC}
            worstOptD={worstOptD}
            best={best}
            worst={worst}
          />
        </article>
      ) : (
        <Outro />
      )}
    </div>
  );
};

export default App;
