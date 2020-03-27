import React, { useState, useEffect } from "react";
import "./App.css";
import Question from "./Question";
import Outro from "./Outro";
import Instruct from "./Instruct";
import Progress from "./Progress";
import Safeguard from "./Safeguard";
import { backend } from "./ConfigSjt";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);
  const [examId, setExamId] = useState(0);
  const [errorExamId, setErrorExamId] = useState(false);
  const [candidateId, setCandidateId] = useState("");
  const [errorCandidateId, setErrorCandidateId] = useState(false);
  const [examPaper, setExamPaper] = useState([]);
  const [errorExamPaper, setErrorExamPaper] = useState(false);
  const [examLength, setExamLength] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [errorQuestionNumber, setErrorQuestionNumber] = useState(false);
  const [candidateName, setCandidateName] = useState("");
  const [errorCandidateName, setErrorCandidateName] = useState(false);
  const [submissionsError, setSubmissionsError] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showOutro, setShowOutro] = useState(false);
  const [best, setBest] = useState(-1);
  const [worst, setWorst] = useState(-1);

  const selectBest = (x: number) => {
    if (best === x) {
      setBest(-1);
    } else {
      setBest(x);
    }
  };

  const selectWorst = (x: number) => {
    if (worst === x) {
      setWorst(-1);
    } else {
      setWorst(x);
    }
  };

  useEffect(() => {
    // ​Identify current exam number from URL path name eg /101
    const currentExamNbr: number = parseInt(
      window.location.pathname.replace(/\//gi, "")
    );
    if (currentExamNbr > 0) {
      setExamId(currentExamNbr);
    } else {
      setErrorExamId(true);
      setLoadingError(true);
      setIsLoading(false);
    }

    // ​Identify current user's idToken from URL search parameters eg ?idToken=123
    let userIdToken: string = "";
    const searchParams = new URLSearchParams(window.location.search);
    const idTokenSearchParam = searchParams.get("idToken");
    if (idTokenSearchParam) {
      userIdToken = idTokenSearchParam;
      setCandidateId(userIdToken);
    } else {
      setErrorCandidateId(true);
      setLoadingError(true);
      setIsLoading(false);
    }

    const getBackend = (endpoint: string) => {
      const url = `${backend}${endpoint}`;
      return fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          idToken: userIdToken
        }
      });
    };

    const getExamPaper = () => {
      return getBackend(`exams/${currentExamNbr}`)
        .then(response => {
          // Test for "ok" reponse from server
          if (!response.ok) {
            setErrorExamPaper(true);
            setLoadingError(true);
            setIsLoading(false);
            setShowQuestion(false);
          } else return response.json();
        })
        .then(data => {
          if (data) {
            setExamPaper(data.scenarios);
            setExamLength(data.scenarios.length);
            return data.scenarios.length;
          }
        })
        .catch(error => {
          setErrorExamPaper(true);
          setLoadingError(true);
          setIsLoading(false);
          setShowQuestion(false);
          console.error("Error:", error);
        });
    };

    const getQuestionNumber = () => {
      return getBackend(`candidates/current-scenario/${currentExamNbr}`)
        .then(response => {
          // Test for "ok" reponse from server
          if (!response.ok) {
            setErrorQuestionNumber(true);
            setLoadingError(true);
            setIsLoading(false);
            setShowQuestion(false);
          } else return response.json();
        })
        .then(data => {
          if (data) {
            setQuestionNumber(parseInt(data.scenarioNumber) + 1);
            return data.scenarioNumber;
          }
        })
        .catch(error => {
          setErrorQuestionNumber(true);
          setLoadingError(true);
          setIsLoading(false);
          setShowQuestion(false);
          console.error("Error:", error);
        });
    };

    const getCandidateName = () => {
      return getBackend(`candidates/${userIdToken}`)
        .then(response => {
          // Test for "ok" reponse from server
          if (!response.ok) {
            setErrorCandidateName(true);
            setLoadingError(true);
            setIsLoading(false);
            setShowQuestion(false);
          } else return response.json();
        })
        .then(data => {
          if (data) {
            setCandidateName(data.name);
            return data.name;
          }
        })
        .catch(error => {
          setErrorCandidateName(true);
          setLoadingError(true);
          setIsLoading(false);
          setShowQuestion(false);
          console.error("Error:", error);
        });
    };

    // Fetch Exam in progress
    if (currentExamNbr > 0 && userIdToken.length > 0) {
      Promise.all([getExamPaper(), getQuestionNumber(), getCandidateName()])
        .then(fetchedData => {
          // Test if candidate has already completed this exam.
          // Server indicates exam complete by returning
          // current-scenario === scenarios.length
          // which is outside range given server-array indexes from zero not one.
          // Also exam-length = fetchedData[0]
          // and current-scenario-number = fetchedData[1]
          // and candidate name = fetchedData[1]

          // if question-number > exam-length
          if (fetchedData[1] + 1 > fetchedData[0]) {
            setIsLoading(false);
            setShowQuestion(false);
            setShowOutro(true);
          } else if (
            // if exam-length > 0
            // and question-number > 0
            // and candidate has a name
            fetchedData[0] > 0 &&
            fetchedData[1] + 1 > 0 &&
            fetchedData[2].length > 0
          ) {
            setIsLoading(false);
            setShowQuestion(true);
          }
        })
        .catch(error => {
          setLoadingError(true);
          setIsLoading(false);
          setShowQuestion(false);
          console.log(
            "There has been an error in getting this exam in progress: " +
              error.message
          );
        });
    }
  }, []);

  // sending data to server
  const sendAttempt = () => {
    // NB question numbers on server-array index from zero not one, hence ${questionNumber -1}
    const url = `${backend}candidates/submissions/${examId}/${questionNumber -
      1}`;
    const candidateAnswer = { best, worst };
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        idToken: candidateId
      },
      body: JSON.stringify(candidateAnswer)
    })
      .then(response => {
        // Test for "ok" reponse from server
        if (!response.ok) {
          setSubmissionsError(true);
          setShowQuestion(false);
        } else {
          setSubmissionsError(false);
        }
      })
      .catch(error => {
        setSubmissionsError(true);
        console.error("Submissions error: ", error);
      });
  };

  const submitHandling = () => {
    if (best === -1 || worst === -1) {
      alert("You MUST select one Best option AND one Worst option");
    } else {
      if (questionNumber < examLength) {
        setSubmissionsError(false);
        sendAttempt();
        setQuestionNumber(questionNumber + 1);
        setBest(-1);
        setWorst(-1);
      } else {
        setSubmissionsError(false);
        sendAttempt();
        setShowQuestion(false);
        setShowOutro(true);
      }
    }
  };

  return (
    <div className="App">
      {candidateId === "" && <Safeguard />}
      {isLoading && <p>Loading...</p>}
      {loadingError && (
        <p className="error-warning">
          Sadly we experienced a loading error. Please carefully check your
          intended web address and refresh this page, or try again later.
        </p>
      )}
      {errorExamId && <p className="error-warning">Couldn't find exam-id.</p>}
      {errorCandidateId && (
        <p className="error-warning">Couldn't find candidate-id.</p>
      )}
      {errorExamPaper && (
        <p className="error-warning">Couldn't find exam paper.</p>
      )}
      {errorQuestionNumber && (
        <p className="error-warning">Couldn't find question-number.</p>
      )}
      {errorCandidateName && (
        <p className="error-warning">Couldn't find candidate name.</p>
      )}
      {submissionsError && (
        <p className="error-warning">
          Sadly we experienced a submissions error. Please refresh this page, or
          try again later.
        </p>
      )}

      {showQuestion && (
        <article>
          <Instruct candidateName={candidateName} />
          <Progress examLength={examLength} questionNumber={questionNumber} />
          <Question
            questionNumber={questionNumber}
            scenarioText={examPaper[questionNumber - 1]["situation"]}
            optTextA={examPaper[questionNumber - 1]["judgements"][0]}
            optTextB={examPaper[questionNumber - 1]["judgements"][1]}
            optTextC={examPaper[questionNumber - 1]["judgements"][2]}
            optTextD={examPaper[questionNumber - 1]["judgements"][3]}
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
