import React from "react";

const submitHandling = () => {
  alert("you just pressed the submit button");
};

const Q1: React.FC = () => {
  return (
    <section>
      <hr></hr>

      <h1>Question one</h1>
      <p>
        You have recently taken a call from a customer praising the helpful
        service offered by a colleague in your team. Do you:
      </p>

      <hr />

      <div id="answerOption1" className="answer-option">
        <button
          type="button"
          id="bestOpt1"
          className="answer-button best-button"
          aria-label="Option 1 is best"
        >
          Best
        </button>
        <span id="optText1" className="option-text" aria-label="Option 1">
          Tell your colleague about the feedback on a one-to-one basis
        </span>
        <button
          type="button"
          id="worstOpt1"
          className="answer-button worst-button"
          aria-label="Option 1 is worst"
        >
          Worst
        </button>
      </div>

      <hr />

      <div id="answerOption2" className="answer-option">
        <button
          type="button"
          id="bestOpt2"
          className="answer-button best-button"
          aria-label="Option 2 is best"
        >
          Best
        </button>
        <span id="optText2" className="option-text" aria-label="Option 2">
          Inform your team leader and let them give the praise personally
        </span>
        <button
          type="button"
          id="worstOpt2"
          className="answer-button worst-button"
          aria-label="Option 2 is worst"
        >
          Worst
        </button>
      </div>

      <hr />

      <div id="answerOption3" className="answer-option">
        <button
          type="button"
          id="bestOpt3"
          className="answer-button best-button"
          aria-label="Option 3 is best"
        >
          Best
        </button>
        <span id="optText3" className="option-text" aria-label="Option 3">
          Wait until the team meeting tomorrow and announce the feedback to
          everyone
        </span>
        <button
          type="button"
          id="worstOpt3"
          className="answer-button worst-button"
          aria-label="Option 3 is worst"
        >
          Worst
        </button>
      </div>

      <hr />

      <div id="answerOption4" className="answer-option">
        <button
          type="button"
          id="bestOpt4"
          className="answer-button best-button"
          aria-label="Option 4 is best"
        >
          Best
        </button>
        <span id="optText4" className="option-text" aria-label="Option 4">
          Email the whole company so that everyone hears about the great
          feedback
        </span>
        <button
          type="button"
          id="worstOpt4"
          className="answer-button worst-button"
          aria-label="Option 4 is worst"
        >
          Worst
        </button>
      </div>
      <hr />

      <button type="submit" onClick={submitHandling}>
        Submit
      </button>
    </section>
  );
};

export default Q1;
