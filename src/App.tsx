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
    setBest(2);
    writeToLocalStorage("q1Best", "B");
  };

  const bestOptC = () => {
    setBest(3);
    writeToLocalStorage("q1Best", "C");
  };

  const bestOptD = () => {
    setBest(4);
    writeToLocalStorage("q1Best", "D");
  };

  const worstOptA = () => {
    setWorst(1);
    localStorage.q1Worst = "A";
  };

  const worstOptB = () => {
    setWorst(2);
    localStorage.q1Worst = "B";
  };

  const worstOptC = () => {
    setWorst(3);
    localStorage.q1Worst = "C";
  };

  const worstOptD = () => {
    setWorst(4);
    localStorage.q1Worst = "D";
  };

  // unify writing to localStorage when multiple questions are added.
  const writeToLocalStorage = (x: string, y: string) => {
    localStorage[x] = y;
  };

  const submitHandling = () => {
    alert(
      "You selected option " +
        best +
        " as best, and option " +
        worst +
        " as worst."
    );
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
      <p>After selecting your answers, press the "submit" button.</p>

      {/* <p>  TO REMOVE  </p> */}
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
