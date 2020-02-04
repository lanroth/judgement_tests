import React, { useState } from "react";
import "./App.css";
import Question from "./Question";
import SampleQuestionText from "./SampleQuestionText";

const App: React.FC = () => {
  const [best, setBest] = useState(0);
  const [worst, setWorst] = useState(0);

  const bestOptA = () => {
    // selecting option A as best sets the value of best to 1
    setBest(1);
    // record candidates response in localStorage
    if (window.localStorage.getItem("q1Best") !== "A") {
      writeToLocalStorage("q1Best", "A");
    }
    // re-selecting this option a second time resets all options
    if (best === 1) {
      setBest(0);
    }
  };

  const bestOptB = () => {
    // selecting option B as best sets the value of best to 2
    setBest(2);
    // record candidates response in localStorage
    if (window.localStorage.getItem("q1Best") !== "B") {
      writeToLocalStorage("q1Best", "B");
    }
    // re-selecting this option a second time resets all options
    if (best === 2) {
      setBest(0);
    }
  };

  const bestOptC = () => {
    // selecting option C as best sets the value of best to 3
    setBest(3);
    // record candidates response in localStorage
    if (window.localStorage.getItem("q1Best") !== "C") {
      writeToLocalStorage("q1Best", "C");
    }
    // re-selecting this option a second time resets all options
    if (best === 3) {
      setBest(0);
    }
  };

  const bestOptD = () => {
    // selecting option D as best sets the value of best to 4
    setBest(4);
    // record candidates response in localStorage
    if (window.localStorage.getItem("q1Best") !== "D") {
      writeToLocalStorage("q1Best", "D");
    }
    // re-selecting this option a second time resets all options
    if (best === 4) {
      setBest(0);
    }
  };

  const worstOptA = () => {
    // selecting option A as best sets the value of worst to 1
    setWorst(1);
    // record candidates response in localStorage
    if (window.localStorage.getItem("q1Worst") !== "A") {
      writeToLocalStorage("q1Worst", "A");
    }
    // re-selecting this option a second time resets all options
    if (worst === 1) {
      setWorst(0);
    }
  };

  const worstOptB = () => {
    // selecting option B as worst sets the value of best to 2
    setWorst(2);
    // record candidates response in localStorage
    if (window.localStorage.getItem("q1Worst") !== "B") {
      writeToLocalStorage("q1Worst", "B");
    }
    // re-selecting this option a second time resets all options
    if (worst === 2) {
      setWorst(0);
    }
  };

  const worstOptC = () => {
    // selecting option C as worst sets the value of best to 3
    setWorst(3);
    // record candidates response in localStorage
    if (window.localStorage.getItem("q1Worst") !== "C") {
      writeToLocalStorage("q1Worst", "C");
    }
    // re-selecting this option a second time resets all options
    if (worst === 3) {
      setWorst(0);
    }
  };

  const worstOptD = () => {
    // selecting option A as worst sets the value of best to 4
    setWorst(4);
    // record candidates response in localStorage
    if (window.localStorage.getItem("q1Worst") !== "D") {
      writeToLocalStorage("q1Worst", "D");
    }
    // re-selecting this option a second time resets all options
    if (worst === 4) {
      setWorst(0);
    }
  };

  const writeToLocalStorage = (x: string, y: string) => {
    localStorage[x] = y;
  };

  const submitHandling = () => {
    if (best === 0 || worst === 0) {
      alert("You MUST select one Best option AND one Worst option");
    } else {
      alert(
        "You selected option " +
          best +
          " as best, and option " +
          worst +
          " as worst."
      );
    }
  };

  return (
    <div className="App">
      <header>Link home in header</header>
      <h1>Instructions</h1>
      <p>
        Please select one of the buttons on the left to pick your "best" (most
        effective) response, AND select one of the buttons on the right to pick
        your "worst" (least effective) response.
      </p>
      <p>
        Pressing the same Best or Worst button a second time deselects your
        answer and resets your choices.
      </p>
      <p>
        After selecting your answers, press the "submit" button to submit your
        final answer.
      </p>

      {/*   TO REMOVE   */}
      <hr />
      <p>
        The option you selected as Best is:{" "}
        <span id="lookingAtStateBest">{best}</span>
      </p>
      <p>
        The option you selected as Worst is:{" "}
        <span id="lookingAtStateWorst">{worst}</span>
      </p>

      <Question
        scenarioText={SampleQuestionText.scenarioText}
        optTextA={SampleQuestionText.optTextA}
        optTextB={SampleQuestionText.optTextB}
        optTextC={SampleQuestionText.optTextC}
        optTextD={SampleQuestionText.optTextD}
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

      <nav>Link home nav</nav>
    </div>
  );
};

export default App;
