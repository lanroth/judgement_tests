import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
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
  const button: any = document.querySelector('[aria-label="Option A is best"]');
  expect(button.textContent).toBe("Best");
  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(window.localStorage.getItem("q1Best")).toBe("A");
});

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
