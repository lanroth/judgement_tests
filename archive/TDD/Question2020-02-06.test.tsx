import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
// import { render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom/extend-expect";
// import renderer from "react-test-renderer";
import Question from "./Question";
import SampleQuestionText from "./SampleQuestionText";

let container: any = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("displays when best=0, worst=0", () => {
  act(() => {
    render(
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
      />,
      container
    );
  });
  expect(container.querySelector("#scenarioText").textContent).toBe(
    SampleQuestionText.scenarioText
  );
  expect(container.querySelector("#optTextA").textContent).toBe(
    SampleQuestionText.optTextA
  );
  expect(container.querySelector("#optTextB").textContent).toBe(
    SampleQuestionText.optTextB
  );
  expect(container.querySelector("#optTextC").textContent).toBe(
    SampleQuestionText.optTextC
  );
  expect(container.querySelector("#optTextD").textContent).toBe(
    SampleQuestionText.optTextD
  );
});
