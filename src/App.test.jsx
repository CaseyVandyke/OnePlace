import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, test, vi } from "vitest";
import App from "./App.jsx";

async function beginSetup(user) {
  render(<App />);
  await user.click(screen.getByRole("button", { name: "Build my OnePlace" }));
  await user.click(screen.getByRole("button", { name: "Skip introduction" }));
}

afterEach(() => {
  vi.useRealTimers();
});

describe("OnePlace", () => {
  test("opens the journey introduction from the welcome screen", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Build my OnePlace" }));

    expect(screen.getByRole("heading", { name: "One small step at a time." })).toBeVisible();
  });

  test("starts setup without a character-selection screen", async () => {
    const user = userEvent.setup();
    await beginSetup(user);

    expect(screen.getByRole("heading", { name: "Who are you preparing this for?" })).toBeVisible();
    expect(screen.queryByText(/pick your character/i)).not.toBeInTheDocument();
  });

  test("offers an optional dog guide choice and remembers it", async () => {
    const user = userEvent.setup();
    const view = render(<App />);

    await user.click(screen.getByRole("button", { name: "Build my OnePlace" }));
    await user.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByRole("heading", { name: "Your Golden Retriever guide lights the way." })).toBeVisible();

    await user.click(screen.getByRole("button", { name: /Choose another dog/i }));
    expect(screen.getByRole("dialog", { name: "Choose the dog who guides you." })).toBeVisible();
    expect(screen.getAllByRole("radio")).toHaveLength(4);
    await user.click(screen.getByRole("radio", { name: /Beagle.*Curious & Cheerful/i }));
    await user.click(screen.getByRole("button", { name: "Travel with Beagle" }));

    expect(screen.getByRole("heading", { name: "Your Beagle guide lights the way." })).toBeVisible();

    view.unmount();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "Build my OnePlace" }));
    await user.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByRole("heading", { name: "Your Beagle guide lights the way." })).toBeVisible();
  });

  test("lets a user change their dog guide from the main app", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Preview the app" }));
    await user.click(screen.getByRole("button", { name: "Change guide. Current guide: Golden Retriever" }));
    await user.click(screen.getByRole("radio", { name: /Labrador.*Friendly & Steady/i }));
    await user.click(screen.getByRole("button", { name: "Travel with Labrador" }));

    expect(screen.getByRole("button", { name: "Change guide. Current guide: Labrador" })).toBeVisible();
  });

  test("closes the guide picker with Escape and restores focus", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "Preview the app" }));
    const guideButton = screen.getByRole("button", { name: "Change guide. Current guide: Golden Retriever" });

    await user.click(guideButton);
    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog", { name: "Choose the dog who guides you." })).not.toBeInTheDocument();
    expect(guideButton).toHaveFocus();
  });

  test("requires an answer before continuing the first setup question", async () => {
    const user = userEvent.setup();
    await beginSetup(user);
    const continueButton = screen.getByRole("button", { name: "Save & continue" });

    expect(continueButton).toBeDisabled();
    await user.click(screen.getByRole("button", { name: "My children" }));
    expect(continueButton).toBeEnabled();
  });

  test("advances the journey after saving an answer", async () => {
    const user = userEvent.setup();
    await beginSetup(user);

    await user.click(screen.getByRole("button", { name: "My children" }));
    await user.click(screen.getByRole("button", { name: "Save & continue" }));

    expect(await screen.findByRole("heading", {
      name: "What should your family call this place?",
    }, { timeout: 1500 })).toBeVisible();
    expect(screen.getByText("Question 2 of 10")).toBeVisible();
  });

  test("settles contextual puppy reactions into simple barks", () => {
    vi.useFakeTimers();
    render(<App />);

    expect(screen.getByText("Woof! Let’s go!")).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(9000));
    expect(screen.getByText("Woof!")).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(9000));
    expect(screen.getByText("Arf!")).toBeInTheDocument();
  });

  test("closes the quick-step popup from its backdrop and close button", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "Preview the app" }));

    await user.click(screen.getByRole("button", { name: "Take today’s 3-minute step" }));
    expect(screen.getByRole("dialog", { name: "Where is your retirement account held?" })).toBeVisible();
    await user.click(screen.getAllByRole("button", { name: "Close quick step" })[0]);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Take today’s 3-minute step" }));
    await user.click(screen.getAllByRole("button", { name: "Close quick step" })[1]);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
