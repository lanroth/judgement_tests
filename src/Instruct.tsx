import React from "react";

const Instruct: React.FC = () => {
  return (
    <section>
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
        After selecting your answers, press the "submit" button to submit your{" "}
        <em>final</em> answer.
      </p>
    </section>
  );
};

export default Instruct;
