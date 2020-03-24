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
  const [questionNumber, setQuestionNumber] = useState(1);
  const [errorQuestionNumber, setErrorQuestionNumber] = useState(false);

  //
  //
  //
  const [submissionError, setSubmissionError] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showOutro, setShowOutro] = useState(false);

  const [candidateName, setCandidateName] = useState("");
  const [examLength, setExamLength] = useState(0);
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
          if (data.scenarioNumber) {
            setQuestionNumber(parseInt(data.scenarioNumber));
          }
        });
    };

    if (currentExamNbr > 0 && userIdToken.length > 0) {
      Promise.all([getExamPaper(), getQuestionNumber()])
        .then(() => {
          setIsLoading(false);
          setShowQuestion(true);
        })
        .catch(error => {
          setShowQuestion(false);
          console.log(
            "There has been an error in getting the exam in progress: " +
              error.message
          );
        });
    }

    // Fetch Exam in Progress
    // Array of URLs for getting candidate's exam and current question from server.
    // const urls: string[] = [
    //   `https://lanroth.com/sjt-backend/exams/${currentExamNbr}/`,
    //   `https://lanroth.com/sjt-backend/candidates/current-question/${currentExamNbr}/`,
    //   `https://lanroth.com/sjt-backend/candidates/${userIdToken}/`
    // ];
    // // Awaiting promises (one for each URL) before proceeding.
    // Promise.all(
    //   // Apply fetch to all URLs in our "urls" array.
    //   urls.map(url =>
    //     fetch(url, {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "candidate-token": userIdToken.toString()
    //       }
    //     })
    //       .then(response => {
    //         // Test for "ok" reponse from server
    //         if (!response.ok) {
    //           setLoadingError(true);
    //           setIsLoading(false);
    //         } else return response.json();
    //       })
    //       .catch(error => {
    //         setLoadingError(true);
    //         setIsLoading(false);
    //         console.error("Error:", error);
    //       })
    //   )
    // )
    //   // The Promise.all then fufills to an array
    //   // [fetched_exam, fetched_q_nbr, candidate_name]
    //   .then(fetchedData => {
    //     if (fetchedData[0]) {
    //       // setExamPaper(fetchedData[0].questions);
    //       // setExamLength(fetchedData[0].questions.length);
    //     }
    //     // NB question numbers on server-array index from zero not one
    //     if (fetchedData[1]) {
    //       setQuestionNumber(fetchedData[1].questionNum + 1);
    //     }
    //     if (fetchedData[2]) {
    //       // setCandidateName(fetchedData[2].name);
    //     }
    //     if (
    //       // Test if candidate has already completed this exam.
    //       // Server indicates exam complete by returning current question === exam length
    //       // which is outside range given server-array indexes from zero not one
    //       fetchedData[0] &&
    //       fetchedData[1] &&
    //       fetchedData[1].questionNum + 1 > fetchedData[0].questions.length
    //     ) {
    //       setIsLoading(false);
    //       setShowQuestion(false);
    //       setShowOutro(true);
    //     } else if (
    //       // Test exam nbr, user id, user name, and exam text have been updated.
    //       // currentExamNbr > 0 &&
    //       // userIdToken.length > 0 &&
    //       // fetchedData[2].name.length > 0 &&
    //       // fetchedData[0].questions.length > 0
    //     ) {
    //       setIsLoading(false);
    //       setShowQuestion(true);
    //     } else setLoadingError(true);
    //   })
    //   .catch(error => {
    //     setLoadingError(true);
    //     setIsLoading(false);
    //     console.error("Error:", error);
    //   });

    // Test exam nbr, user id, user name, and exam text have been updated.
    // if (
    //   currentExamNbr > 0 &&
    //   userIdToken.length > 0
    //   // &&
    //   // fetchedData[2].name.length > 0 &&
    //   // fetchedData[0].questions.length > 0
    // ) {
    //   setIsLoading(false);
    //   setShowQuestion(true);
    // } else setLoadingError(true);
  }, []);

  // sending data to server
  const sendAttempt = () => {
    // NB question numbers on server-array index from zero not one, hence ${questionNumber -1}
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
    if (best === -1 || worst === -1) {
      alert("You MUST select one Best option AND one Worst option");
    } else {
      if (questionNumber < examLength) {
        setSubmissionError(false);
        sendAttempt();
        setQuestionNumber(questionNumber + 1);
        setBest(-1);
        setWorst(-1);
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

      {showQuestion && (
        <article>
          <Instruct candidateName={candidateName} />
          <Progress examLength={examLength} questionNumber={questionNumber} />
          <Question
            submissionError={submissionError}
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
