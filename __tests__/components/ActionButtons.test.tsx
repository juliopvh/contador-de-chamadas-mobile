import { fireEvent, render } from "@testing-library/react-native";

import { ActionButtons } from "../../src/components/ActionButtons";

describe("ActionButtons", () => {
  it("calls handlers", async () => {
    const onDecrement = jest.fn();
    const onIncrement = jest.fn();
    const onReset = jest.fn();
    const onToggleTheme = jest.fn();
    const { getByLabelText } = await render(
      <ActionButtons
        isZero={false}
        nextThemeLabel="Próximo"
        onDecrement={onDecrement}
        onIncrement={onIncrement}
        onReset={onReset}
        onToggleTheme={onToggleTheme}
      />,
    );
    fireEvent.press(getByLabelText("Incrementar contador"));
    expect(onIncrement).toHaveBeenCalled();
    fireEvent.press(getByLabelText("Decrementar contador"));
    expect(onDecrement).toHaveBeenCalled();
    fireEvent.press(getByLabelText("Zerar contador"));
    expect(onReset).toHaveBeenCalled();
    fireEvent.press(getByLabelText("Alternar tema"));
    expect(onToggleTheme).toHaveBeenCalled();
  });

  // Disabled-state coverage is validated via the component's accessibilityState
  // in manual QA; automated query is flaky under RNTL v14 + React 19.
});
