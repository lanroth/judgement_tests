import React, { useState, useEffect } from "react";
import "./App.css";
import Question from "./Question";
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
  const [candidateId, setCandidateId] = useState(0);
  const [examId, setExamId] = useState(0);
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
    // ​Identify current exam from URL
    const examInProgress = parseInt(
      window.location.pathname.replace(/\//gi, "")
    );
    setCandidateId(examInProgress);

    // ​Identify this user's idToken from URL
    let userIdToken;
    const searchParams = new URLSearchParams(window.location.search);
    const idTokenString = searchParams.get("idToken");
    if (idTokenString) {
      userIdToken = parseInt(idTokenString);
      setExamId(userIdToken);
    }

    // First extract candidateId + examId from url
    // then
    // const getCurrentQuestionNumber = () => {};
    // https://lanroth.com/sjt-backend/candidates/current-question/${examId}/
    // responseObj.questionNum ??????
    // async function getExamInProgress(urls) {try,
    // const ExamInProgress = await Promise.all urls.map, fetch(url), catch, throw}
    // see
    //https://www.shawntabrizi.com/code/programmatically-fetch-multiple-apis-parallel-using-async-await-javascript/

    // Fetch exam data
    const getExam = () => {
      const url = `https://lanroth.com/sjt-backend/exams/${examInProgress}/`;
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
    // If candidateID > 0 && examID > 0 and examlenght >0 etc then setShowQuestion(true) etc.
  }, [examId, candidateId]);

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
