import React, { useState, useEffect } from "react";
import "./App.css";
import Question from "./Question";
import SampleData from "./SampleData";
import Outro from "./Outro";
import Instruct from "./Instruct";
import Progress from "./Progress";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [submissionError, setSubmissionError] = useState(false);

  const [candidateId, setCandidateId] = useState(0);
  const [examId, setExamId] = useState(0);

  const [questionNumber, setQuestionNumber] = useState(1);
  const [examLength, setExamLength] = useState(0);

  const [showQuestion, setShowQuestion] = useState(false);
  const [showOutro, setShowOutro] = useState(false);

  const [best, setBest] = useState(0);
  const [worst, setWorst] = useState(0);

  // mock data
  // extract candidate and exam Id number from SampleData
  const scenario = SampleData.examPaper[questionNumber - 1];
  useEffect(() => {
    const setupExamination = () => {
      setCandidateId(SampleData.candidateId);
      setExamId(SampleData.examId);
      setExamLength(SampleData.examPaper.length);
      setShowQuestion(true);
      setIsLoading(false);
    };
    setupExamination();
    // console.log(window.location.pathname);
    // console.log(window.location.href);
  }, []);
  //
  //

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

  // sending data to the server
  const sendAttempt = () => {
    const url = `https://lanroth.com/sjt-backend/candidates/answers/${examId}/${questionNumber -
      1}/`;
    const candidateAnswer = { best, worst };
    //
    console.log(url, candidateAnswer);
    //
    fetch(url, {
      // mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "candidate-token": candidateId.toString()
      },
      body: JSON.stringify(candidateAnswer)
    })
      .then(response => {
        response.json();
        if (!response.ok) {
          setSubmissionError(true);
        }
      })
      .then(data => {
        console.log("Success:", data);
      })
      .catch(error => {
        setSubmissionError(true);
        console.error("Error:", error);
      });
  };

  const submitHandling = () => {
    if (best === 0 || worst === 0) {
      alert("You MUST select one Best option AND one Worst option");
    } else {
      if (questionNumber < examLength) {
        setSubmissionError(false);
        sendAttempt();
        setQuestionNumber(questionNumber + 1);
        setBest(0);
        setWorst(0);
      } else {
        setSubmissionError(false);
        sendAttempt();
        setShowQuestion(false);
        setShowOutro(true);
      }
    }
  };

  return (
    <div className="App">
      {isLoading && <p>Loading...</p>}
      {showQuestion && (
        <article>
          <Instruct />
          <Progress examLength={examLength} questionNumber={questionNumber} />
          <Question
            submissionError={submissionError}
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
      )}
      {showOutro && <Outro />}
    </div>
  );
};

export default App;
