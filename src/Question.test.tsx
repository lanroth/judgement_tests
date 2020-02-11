import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
// import ReactDOM from "react-dom";

import Question from "./Question";
import SampleQuestionText from "./SampleQuestionText";

it("renders without crashing", () => {
  const { getByText, container } = render(
    <Question
      submissionError={false}
      questionNumber={1}
      scenarioText={SampleQuestionText.scenarioText}
      optTextA={SampleQuestionText.optTextA}
      optTextB={SampleQuestionText.optTextB}
      optTextC={SampleQuestionText.optTextC}
      optTextD={SampleQuestionText.optTextD}
      submitHandling={jest.fn()}
      bestOptA={jest.fn()}
      bestOptB={jest.fn()}
      bestOptC={jest.fn()}
      bestOptD={jest.fn()}
      worstOptA={jest.fn()}
      worstOptB={jest.fn()}
      worstOptC={jest.fn()}
      worstOptD={jest.fn()}
      best={0}
      worst={0}
    />
  );
  expect(container.querySelector("#scenarioText")).toHaveTextContent(
    SampleQuestionText.scenarioText
  );
  expect(container.querySelector("#optTextA")).toHaveTextContent(
    SampleQuestionText.optTextA
  );
  expect(container.querySelector("#optTextB")).toHaveTextContent(
    SampleQuestionText.optTextB
  );
  expect(container.querySelector("#optTextC")).toHaveTextContent(
    SampleQuestionText.optTextC
  );
  expect(container.querySelector("#optTextD")).toHaveTextContent(
    SampleQuestionText.optTextD
  );
});
