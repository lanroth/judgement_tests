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
          className="answer-button best-button"
          aria-label="Option A is best"
          onClick={props.bestOptA}
        >
          Best
        </button>
        <span id="optTextA" className="option-text" aria-label="Option A">
          {props.optTextA}
        </span>
        <button
          type="button"
          id="worstOptA"
          className="answer-button worst-button"
          aria-label="Option A is worst"
          onClick={props.worstOptA}
        >
          Worst
        </button>
      </div>

      <hr />

      <div id="answerOptionB" className="answer-option">
        <button
          type="button"
          id="bestOptB"
          className="answer-button best-button"
          aria-label="Option B is best"
          onClick={props.bestOptB}
        >
          Best
        </button>
        <span id="optTextB" className="option-text" aria-label="Option B">
          {props.optTextB}
        </span>
        <button
          type="button"
          id="worstOptB"
          className="answer-button worst-button"
          aria-label="Option B is worst"
          onClick={props.worstOptB}
        >
          Worst
        </button>
      </div>

      <hr />

      <div id="answerOptionC" className="answer-option">
        <button
          type="button"
          id="bestOptC"
          className="answer-button best-button"
          aria-label="Option C is best"
          onClick={props.bestOptC}
        >
          Best
        </button>
        <span id="optTextC" className="option-text" aria-label="Option C">
          {props.optTextC}
        </span>
        <button
          type="button"
          id="worstOptC"
          className="answer-button worst-button"
          aria-label="Option C is worst"
          onClick={props.worstOptC}
        >
          Worst
        </button>
      </div>

      <hr />

      <div id="answerOptionD" className="answer-option">
        <button
          type="button"
          id="bestOptD"
          className="answer-button best-button"
          aria-label="Option D is best"
          onClick={props.bestOptD}
        >
          Best
        </button>
        <span id="optTextD" className="option-text" aria-label="Option D">
          {props.optTextD}
        </span>
        <button
          type="button"
          id="worstOptd"
          className="answer-button worst-button"
          aria-label="Option D is worst"
          onClick={props.worstOptD}
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
