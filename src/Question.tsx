import React from "react";

interface Props {
  scenarioText: string;
  optTextA: string;
  optTextB: string;
  optTextC: string;
  optTextD: string;
  submitHandling: () => void;
  bestOptA: () => void;
  bestOptB: () => void;
  bestOptC: () => void;
  bestOptD: () => void;
  worstOptA: () => void;
  worstOptB: () => void;
  worstOptC: () => void;
  worstOptD: () => void;
  best: number;
  worst: number;
}

const Question: React.FC<Props> = props => {
  const isBestButtonDisabled = (optionNumber: number) => {
    // disable if this option is already selected as worst option
    if (optionNumber === props.worst) {
      return true;
    }
    // enable if no best option is selected
    else if (props.best === 0) {
      return false;
    }
    // enable if this option is selected thus allowing resetting on 2nd press
    else if (optionNumber === props.best) {
      return false;
    } else {
      return true;
    }
  };

  const isWorstButtonDisabled = (optionNumber: number) => {
    // disable if this option is already selected as worst option
    if (optionNumber === props.best) {
      return true;
    }
    // enable if no best option is selected
    else if (props.worst === 0) {
      return false;
    }
    // enable if this option is selected thus allowing resetting on 2nd press
    else if (optionNumber === props.worst) {
      return false;
    } else {
      return true;
    }
  };

  const selectedBestStyle = (optionNumber: number) => {
    // inline style overrides selected button class style
    if (optionNumber === props.best) {
      return { backgroundColor: "white" };
    }
  };

  const selectedWorstStyle = (optionNumber: number) => {
    // inline style overrides selected button class style
    if (optionNumber === props.worst) {
      return { backgroundColor: "white" };
    }
  };

  return (
    <section>
      <hr />

      <h1>Question one</h1>
      <p id="scenarioText">{props.scenarioText}</p>

      <hr />

      <div id="answerOptionA" className="answer-option">
        <button
          type="button"
          id="bestOptA"
          className={
            isBestButtonDisabled(1)
              ? "answer-button button-disabled"
              : "answer-button best-button"
          }
          style={selectedBestStyle(1)}
          aria-label="Option A is best"
          onClick={props.bestOptA}
          disabled={isBestButtonDisabled(1)}
        >
          Best
        </button>
        <span id="optTextA" className="option-text" aria-label="Option A">
          {props.optTextA}
        </span>
        <button
          type="button"
          id="worstOptA"
          className={
            isWorstButtonDisabled(1)
              ? "answer-button button-disabled"
              : "answer-button worst-button"
          }
          style={selectedWorstStyle(1)}
          aria-label="Option A is worst"
          onClick={props.worstOptA}
          disabled={isWorstButtonDisabled(1)}
        >
          Worst
        </button>
      </div>

      <hr />

      <div id="answerOptionB" className="answer-option">
        <button
          type="button"
          id="bestOptB"
          className={
            isBestButtonDisabled(2)
              ? "answer-button button-disabled"
              : "answer-button best-button"
          }
          style={selectedBestStyle(2)}
          aria-label="Option B is best"
          onClick={props.bestOptB}
          disabled={isBestButtonDisabled(2)}
        >
          Best
        </button>
        <span id="optTextB" className="option-text" aria-label="Option B">
          {props.optTextB}
        </span>
        <button
          type="button"
          id="worstOptB"
          className={
            isWorstButtonDisabled(2)
              ? "answer-button button-disabled"
              : "answer-button worst-button"
          }
          style={selectedWorstStyle(2)}
          aria-label="Option B is worst"
          onClick={props.worstOptB}
          disabled={isWorstButtonDisabled(2)}
        >
          Worst
        </button>
      </div>

      <hr />

      <div id="answerOptionC" className="answer-option">
        <button
          type="button"
          id="bestOptC"
          className={
            isBestButtonDisabled(3)
              ? "answer-button button-disabled"
              : "answer-button best-button"
          }
          style={selectedBestStyle(3)}
          aria-label="Option C is best"
          onClick={props.bestOptC}
          disabled={isBestButtonDisabled(3)}
        >
          Best
        </button>
        <span id="optTextC" className="option-text" aria-label="Option C">
          {props.optTextC}
        </span>
        <button
          type="button"
          id="worstOptC"
          className={
            isWorstButtonDisabled(3)
              ? "answer-button button-disabled"
              : "answer-button worst-button"
          }
          style={selectedWorstStyle(3)}
          aria-label="Option C is worst"
          onClick={props.worstOptC}
          disabled={isWorstButtonDisabled(3)}
        >
          Worst
        </button>
      </div>

      <hr />

      <div id="answerOptionD" className="answer-option">
        <button
          type="button"
          id="bestOptD"
          className={
            isBestButtonDisabled(4)
              ? "answer-button button-disabled"
              : "answer-button best-button"
          }
          style={selectedBestStyle(4)}
          aria-label="Option D is best"
          onClick={props.bestOptD}
          disabled={isBestButtonDisabled(4)}
        >
          Best
        </button>
        <span id="optTextD" className="option-text" aria-label="Option D">
          {props.optTextD}
        </span>
        <button
          type="button"
          id="worstOptd"
          className={
            isWorstButtonDisabled(4)
              ? "answer-button button-disabled"
              : "answer-button worst-button"
          }
          style={selectedWorstStyle(4)}
          aria-label="Option D is worst"
          onClick={props.worstOptD}
          disabled={isWorstButtonDisabled(4)}
        >
          Worst
        </button>
      </div>
      <hr />

      <button type="submit" onClick={props.submitHandling}>
        Submit
      </button>
    </section>
  );
};

export default Question;
