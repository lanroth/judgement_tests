import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

// for react testing library use
// import { render, fireEvent, waitForElement } from "@testing-library/react";

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

//
// Best button A
//
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
  // check selected option is not disabled
  expect(bestOptA).not.toHaveAttribute("disabled");
  // check all other buttons labelled Best are disabled
  const bestOptB: any = document.querySelector(
    '[aria-label="Option B is best"]'
  );
  expect(bestOptB).toHaveAttribute("disabled");
  const bestOptC: any = document.querySelector(
    '[aria-label="Option C is best"]'
  );
  expect(bestOptC).toHaveAttribute("disabled");
  const bestOptD: any = document.querySelector(
    '[aria-label="Option D is best"]'
  );
  expect(bestOptD).toHaveAttribute("disabled");
  // corresponding worst button is disabled
  const worstOptA: any = document.querySelector(
    '[aria-label="Option A is worst"]'
  );
  expect(worstOptA).toHaveAttribute("disabled");
  // re-selecting the same option a 2nd time resets other best buttons
  act(() => {
    bestOptA.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(bestOptA).not.toHaveAttribute("disabled");
  expect(bestOptB).not.toHaveAttribute("disabled");
  expect(bestOptC).not.toHaveAttribute("disabled");
  expect(bestOptD).not.toHaveAttribute("disabled");
});

//
// Best button B
//
test("candidate can select option B as best", () => {
  act(() => {
    render(<App />, container);
  });
  const bestOptB: any = document.querySelector(
    '[aria-label="Option B is best"]'
  );
  expect(bestOptB.textContent).toBe("Best");
  act(() => {
    bestOptB.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  // check selected option is not disabled
  expect(bestOptB).not.toHaveAttribute("disabled");
  // check all other buttons labelled Best are disabled
  const bestOptA: any = document.querySelector(
    '[aria-label="Option A is best"]'
  );
  expect(bestOptA).toHaveAttribute("disabled");
  const bestOptC: any = document.querySelector(
    '[aria-label="Option C is best"]'
  );
  expect(bestOptC).toHaveAttribute("disabled");
  const bestOptD: any = document.querySelector(
    '[aria-label="Option D is best"]'
  );
  expect(bestOptD).toHaveAttribute("disabled");
  // corresponding worst button is disabled
  const worstOptB: any = document.querySelector(
    '[aria-label="Option B is worst"]'
  );
  expect(worstOptB).toHaveAttribute("disabled");
  // re-selecting the same option a 2nd time resets other best buttons
  act(() => {
    bestOptB.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(bestOptA).not.toHaveAttribute("disabled");
  expect(bestOptB).not.toHaveAttribute("disabled");
  expect(bestOptC).not.toHaveAttribute("disabled");
  expect(bestOptD).not.toHaveAttribute("disabled");
});

//
// Best button C
//
test("candidate can select option C as best", () => {
  act(() => {
    render(<App />, container);
  });
  const bestOptC: any = document.querySelector(
    '[aria-label="Option C is best"]'
  );
  expect(bestOptC.textContent).toBe("Best");
  act(() => {
    bestOptC.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  // check selected option is not disabled
  expect(bestOptC).not.toHaveAttribute("disabled");
  // check all other buttons labelled Best are disabled
  const bestOptA: any = document.querySelector(
    '[aria-label="Option A is best"]'
  );
  expect(bestOptA).toHaveAttribute("disabled");
  const bestOptB: any = document.querySelector(
    '[aria-label="Option B is best"]'
  );
  expect(bestOptB).toHaveAttribute("disabled");
  const bestOptD: any = document.querySelector(
    '[aria-label="Option D is best"]'
  );
  expect(bestOptD).toHaveAttribute("disabled");
  // corresponding worst button is disabled
  const worstOptC: any = document.querySelector(
    '[aria-label="Option C is worst"]'
  );
  expect(worstOptC).toHaveAttribute("disabled");
  // re-selecting the same option a 2nd time resets other best buttons
  act(() => {
    bestOptC.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(bestOptA).not.toHaveAttribute("disabled");
  expect(bestOptB).not.toHaveAttribute("disabled");
  expect(bestOptC).not.toHaveAttribute("disabled");
  expect(bestOptD).not.toHaveAttribute("disabled");
});

//
// Best button D
//
test("candidate can select option D as best", () => {
  act(() => {
    render(<App />, container);
  });
  const bestOptD: any = document.querySelector(
    '[aria-label="Option D is best"]'
  );
  expect(bestOptD.textContent).toBe("Best");
  act(() => {
    bestOptD.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  // check selected option is not disabled
  expect(bestOptD).not.toHaveAttribute("disabled");
  // check all other buttons labelled Best are disabled
  const bestOptA: any = document.querySelector(
    '[aria-label="Option A is best"]'
  );
  expect(bestOptA).toHaveAttribute("disabled");
  const bestOptB: any = document.querySelector(
    '[aria-label="Option B is best"]'
  );
  expect(bestOptB).toHaveAttribute("disabled");
  const bestOptC: any = document.querySelector(
    '[aria-label="Option C is best"]'
  );
  expect(bestOptC).toHaveAttribute("disabled");
  // corresponding worst button is disabled
  const worstOptD: any = document.querySelector(
    '[aria-label="Option D is worst"]'
  );
  expect(worstOptD).toHaveAttribute("disabled");
  // re-selecting the same option a 2nd time resets other best buttons
  act(() => {
    bestOptD.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(bestOptA).not.toHaveAttribute("disabled");
  expect(bestOptB).not.toHaveAttribute("disabled");
  expect(bestOptC).not.toHaveAttribute("disabled");
  expect(bestOptD).not.toHaveAttribute("disabled");
});

//
// Worst button A
//
test("candidates can select option A as worst", () => {
  act(() => {
    render(<App />, container);
  });
  const worstOptA: any = document.querySelector(
    '[aria-label="Option A is worst"]'
  );
  expect(worstOptA.textContent).toBe("Worst");
  act(() => {
    worstOptA.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  // check selected option is not disabled
  expect(worstOptA).not.toHaveAttribute("disabled");
  // check all other buttons labelled Best are disabled
  const worstOptB: any = document.querySelector(
    '[aria-label="Option B is worst"]'
  );
  expect(worstOptB).toHaveAttribute("disabled");
  const worstOptC: any = document.querySelector(
    '[aria-label="Option C is worst"]'
  );
  expect(worstOptC).toHaveAttribute("disabled");
  const worstOptD: any = document.querySelector(
    '[aria-label="Option D is worst"]'
  );
  expect(worstOptD).toHaveAttribute("disabled");
  // corresponding best button is disabled
  const bestOptA: any = document.querySelector(
    '[aria-label="Option A is best"]'
  );
  expect(bestOptA).toHaveAttribute("disabled");
  // re-selecting the same option a 2nd time resets other best buttons
  act(() => {
    worstOptA.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(worstOptA).not.toHaveAttribute("disabled");
  expect(worstOptB).not.toHaveAttribute("disabled");
  expect(worstOptC).not.toHaveAttribute("disabled");
  expect(worstOptD).not.toHaveAttribute("disabled");
});

//
// Worst button B
//
test("candidates can select option B as worst", () => {
  act(() => {
    render(<App />, container);
  });
  const worstOptB: any = document.querySelector(
    '[aria-label="Option B is worst"]'
  );
  expect(worstOptB.textContent).toBe("Worst");
  act(() => {
    worstOptB.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  // check selected option is not disabled
  expect(worstOptB).not.toHaveAttribute("disabled");
  // check all other buttons labelled Best are disabled
  const worstOptA: any = document.querySelector(
    '[aria-label="Option A is worst"]'
  );
  expect(worstOptA).toHaveAttribute("disabled");
  const worstOptC: any = document.querySelector(
    '[aria-label="Option C is worst"]'
  );
  expect(worstOptC).toHaveAttribute("disabled");
  const worstOptD: any = document.querySelector(
    '[aria-label="Option D is worst"]'
  );
  expect(worstOptD).toHaveAttribute("disabled");
  // corresponding best button is disabled
  const bestOptB: any = document.querySelector(
    '[aria-label="Option B is best"]'
  );
  expect(bestOptB).toHaveAttribute("disabled");
  // re-selecting the same option a 2nd time resets other best buttons
  act(() => {
    worstOptB.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(worstOptA).not.toHaveAttribute("disabled");
  expect(worstOptB).not.toHaveAttribute("disabled");
  expect(worstOptC).not.toHaveAttribute("disabled");
  expect(worstOptD).not.toHaveAttribute("disabled");
});

//
// Worst button C
//
test("candidates can select option C as worst", () => {
  act(() => {
    render(<App />, container);
  });
  const worstOptC: any = document.querySelector(
    '[aria-label="Option C is worst"]'
  );
  expect(worstOptC.textContent).toBe("Worst");
  act(() => {
    worstOptC.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  // check selected option is not disabled
  expect(worstOptC).not.toHaveAttribute("disabled");
  // check all other buttons labelled Best are disabled
  const worstOptA: any = document.querySelector(
    '[aria-label="Option A is worst"]'
  );
  expect(worstOptA).toHaveAttribute("disabled");
  const worstOptB: any = document.querySelector(
    '[aria-label="Option B is worst"]'
  );
  expect(worstOptB).toHaveAttribute("disabled");
  const worstOptD: any = document.querySelector(
    '[aria-label="Option D is worst"]'
  );
  expect(worstOptD).toHaveAttribute("disabled");
  // corresponding best button is disabled
  const bestOptC: any = document.querySelector(
    '[aria-label="Option C is best"]'
  );
  expect(bestOptC).toHaveAttribute("disabled");
  // re-selecting the same option a 2nd time resets other best buttons
  act(() => {
    worstOptC.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(worstOptA).not.toHaveAttribute("disabled");
  expect(worstOptB).not.toHaveAttribute("disabled");
  expect(worstOptC).not.toHaveAttribute("disabled");
  expect(worstOptD).not.toHaveAttribute("disabled");
});

//
// Worst button D
//
test("candidates can select option D as worst", () => {
  act(() => {
    render(<App />, container);
  });
  const worstOptD: any = document.querySelector(
    '[aria-label="Option D is worst"]'
  );
  expect(worstOptD.textContent).toBe("Worst");
  act(() => {
    worstOptD.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  // check selected option is not disabled
  expect(worstOptD).not.toHaveAttribute("disabled");
  // check all other buttons labelled Best are disabled
  const worstOptA: any = document.querySelector(
    '[aria-label="Option A is worst"]'
  );
  expect(worstOptA).toHaveAttribute("disabled");
  const worstOptB: any = document.querySelector(
    '[aria-label="Option B is worst"]'
  );
  expect(worstOptB).toHaveAttribute("disabled");
  const worstOptC: any = document.querySelector(
    '[aria-label="Option C is worst"]'
  );
  expect(worstOptC).toHaveAttribute("disabled");
  // corresponding best button is disabled
  const bestOptD: any = document.querySelector(
    '[aria-label="Option D is best"]'
  );
  expect(bestOptD).toHaveAttribute("disabled");
  // re-selecting the same option a 2nd time resets other best buttons
  act(() => {
    worstOptD.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(worstOptA).not.toHaveAttribute("disabled");
  expect(worstOptB).not.toHaveAttribute("disabled");
  expect(worstOptC).not.toHaveAttribute("disabled");
  expect(worstOptD).not.toHaveAttribute("disabled");
});
