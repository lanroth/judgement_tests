import React, { useState, useEffect } from "react";
import "./App.css";
import Question from "./Question";
// import SampleData from "./SampleData";
import Outro from "./Outro";
import Instruct from "./Instruct";
import Progress from "./Progress";

const App: React.FC = () => {
  const [examPaper, setExamPaper] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showOutro, setShowOutro] = useState(false);

  // NB TO CHANGE DEFAULT BACK TO ZERO when we start extracting candidateId from url!!!
  const [candidateId, setCandidateId] = useState(222);
  // NB TO CHANGE DEFAULT BACK TO ZERO when we start extracting examId from url!!!
  const [examId, setExamId] = useState(1);

  const [questionNumber, setQuestionNumber] = useState(1);
  const [examLength, setExamLength] = useState(0);

  const [best, setBest] = useState(0);
  const [worst, setWorst] = useState(0);

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

  useEffect(() => {
    // Fetch exam data
    const getExam = () => {
      const url = `https://lanroth.com/sjt-backend/exams/${examId}/`;
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "candidate-token": candidateId.toString()
        }
      })
        .then(response => {
          if (!response.ok) {
            setLoadingError(true);
            setIsLoading(false);
            setShowQuestion(false);
          }
          return response.json();
        })
        .then(responseObj => {
          setExamPaper(responseObj.questions);
          setExamLength(responseObj.questions.length);
          setIsLoading(false);
          setShowQuestion(true);
        })
        .catch(error => {
          setLoadingError(true);
          setIsLoading(false);
          setShowQuestion(false);
          console.error("Error:", error);
        });
    };
    getExam();
  }, [examId, candidateId]);
  // NB Remove dependencies array when we start extracting candidateId + examId from url!!!
  //
  //
  // mock setting candiata and exam numbers
  useEffect(() => {
    const setupMockExamination = () => {
      // NB delete when we start extracting candidateId and examId from url!!!
      setCandidateId(222);
      setExamId(1);
    };
    setupMockExamination();
    // console.log(window.location.pathname);
    // console.log(window.location.href);
  }, []);
  //
  //

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
        if (!response.ok) {
          setSubmissionError(true);
        } else {
          setSubmissionError(false);
        }
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
      {loadingError && (
        <p className="error-warning">
          Sadly we experienced a loading error. Please refresh this page, or try
          again later.
        </p>
      )}
      {showQuestion && (
        <article>
          <Instruct />
          <Progress examLength={examLength} questionNumber={questionNumber} />
          <Question
            submissionError={submissionError}
            questionNumber={questionNumber}
            scenarioText={examPaper[questionNumber - 1]["question"]}
            optTextA={examPaper[questionNumber - 1]["answers"][0]}
            optTextB={examPaper[questionNumber - 1]["answers"][1]}
            optTextC={examPaper[questionNumber - 1]["answers"][2]}
            optTextD={examPaper[questionNumber - 1]["answers"][3]}
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
