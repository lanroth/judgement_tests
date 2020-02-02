import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
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

test("candidates see question text", () => {
  act(() => {
    render(
      <Question
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
