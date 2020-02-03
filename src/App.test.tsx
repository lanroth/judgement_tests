import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

let container: any = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  // attach container to document so events work properly
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test("app renders without crashing", () => {
  act(() => {
    render(<App />, container);
  });
});

test("candidate can select option A as best", () => {
  act(() => {
    render(<App />, container);
  });
  const bestOptA: any = document.querySelector(
    '[aria-label="Option A is best"]'
  );
  expect(bestOptA.textContent).toBe("Best");
  act(() => {
    bestOptA.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  // correct response recorded to localStorage
  expect(window.localStorage.getItem("q1Best")).toBe("A");
  // check selected option is not disabled
  expect(bestOptA).not.toHaveAttribute("disabled");
  // check all other buttons labelled Best are disabled
  const bestOptB: any = document.querySelector(
    '[aria-label="Option B is best"]'
  );
  expect(bestOptB).toHaveAttribute("disabled");
});

// COALFACE ABOVE

test("candidate can select option B as best", () => {
  act(() => {
    render(<App />, container);
  });
  const button: any = document.querySelector('[aria-label="Option B is best"]');
  expect(button.textContent).toBe("Best");
  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(window.localStorage.getItem("q1Best")).toBe("B");
});

test("candidate can select option C as best", () => {
  act(() => {
    render(<App />, container);
  });
  const button: any = document.querySelector('[aria-label="Option C is best"]');
  expect(button.textContent).toBe("Best");
  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(window.localStorage.getItem("q1Best")).toBe("C");
});

test("candidate can select option D as best", () => {
  act(() => {
    render(<App />, container);
  });
  const button: any = document.querySelector('[aria-label="Option D is best"]');
  expect(button.textContent).toBe("Best");
  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(window.localStorage.getItem("q1Best")).toBe("D");
});

test("candidates can select option A as worst", () => {
  act(() => {
    render(<App />, container);
  });
  const button: any = document.querySelector(
    '[aria-label="Option A is worst"]'
  );
  expect(button.textContent).toBe("Worst");
  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(window.localStorage.getItem("q1Worst")).toBe("A");
});

test("candidates can select option B as worst", () => {
  act(() => {
    render(<App />, container);
  });
  const button: any = document.querySelector(
    '[aria-label="Option B is worst"]'
  );
  expect(button.textContent).toBe("Worst");
  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(window.localStorage.getItem("q1Worst")).toBe("B");
});

test("candidates can select option C as worst", () => {
  act(() => {
    render(<App />, container);
  });
  const button: any = document.querySelector(
    '[aria-label="Option C is worst"]'
  );
  expect(button.textContent).toBe("Worst");
  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(window.localStorage.getItem("q1Worst")).toBe("C");
});

test("candidates can select option D as worst", () => {
  act(() => {
    render(<App />, container);
  });
  const button: any = document.querySelector(
    '[aria-label="Option D is worst"]'
  );
  expect(button.textContent).toBe("Worst");
  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(window.localStorage.getItem("q1Worst")).toBe("D");
});

// testing reset fuinction for pressing the same button twice
test("candidate can reset from option A as best", () => {
  act(() => {
    render(<App />, container);
  });

  //Press button twice.

  // const button: any = document.querySelector('[aria-label="Option A is best"]');
  // act(() => {
  //   button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  // });
  // expect(window.localStorage.getItem("q1Best")).toBe("A");
});
