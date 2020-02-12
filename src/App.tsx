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
  // extract candidate and exam id numbers from SampleData
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

  const selectBest = (x: number) => {
    if (best === x) {
      setBest(0);
    } else {
      setBest(x);
    }
  };

  const selectWorst = (x: number) => {
    if (worst === x) {
      setWorst(0);
    } else {
      setWorst(x);
    }
  };

  // sending data to the server
  const sendAttempt = () => {
    const url = `https://lanroth.com/sjt-backend/candidates/answers/${examId}/${questionNumber -
      1}/`;
    const candidateAnswer = { best, worst };
    fetch(url, {
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
            selectBest={selectBest}
            selectWorst={selectWorst}
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
