import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CheckboxItem from "../Components/CheckboxItem";
import CheckboxList from "../Components/CheckboxList";
import CustomCheckboxItem from "../Components/CustomCheckboxItem";

let values = [
  { key: 1, label: "item 1", value: true },
  { key: 2, label: "item 2", value: false },
  { key: 3, label: "item 3", value: true },
  { key: 4, label: "item 4", value: false },
];

test("Should render Checkbox list", () => {
  render(
    <CheckboxList>
      {values.map((value) => (
        <CheckboxItem key={value.key} value={value} />
      ))}
    </CheckboxList>
  );

  const regexItem1 = new RegExp(values[0].label, "i");
  const regexItem2 = new RegExp(values[1].label, "i");

  const inputNode1 = screen.getByLabelText(regexItem1);
  const inputNode2 = screen.getByLabelText(regexItem2);

  expect(inputNode1).toBeChecked();
  expect(inputNode2).not.toBeChecked();
});

test("Checkbox item should change from unchecked to checked state", () => {
  render(
    <CheckboxList>
      {values.map((value) => (
        <CheckboxItem key={value.key} value={value} />
      ))}
    </CheckboxList>
  );

  const inputNode2 = screen.getByLabelText(/item 2/i);
  fireEvent.click(inputNode2);
  expect(inputNode2.checked).toBe(true);
});

test("Checkbox item should change from checked to unchecked state", () => {
  render(
    <CheckboxList>
      {values.map((value) => (
        <CheckboxItem key={value.key} value={value} />
      ))}
    </CheckboxList>
  );

  const inputNode1 = screen.getByLabelText(/item 1/i);
  fireEvent.click(inputNode1);
  expect(inputNode1.checked).toBe(false);
});

test("All checkbox items checked when Select All is checked", () => {
  render(
    <CheckboxList>
      <CustomCheckboxItem />
      {values.map((value) => (
        <CheckboxItem key={value.key} value={value} />
      ))}
    </CheckboxList>
  );

  const selectAllNode = screen.getByLabelText(/Select All/i);
  expect(selectAllNode.checked).toBe(false);
  fireEvent.click(selectAllNode);
  expect(selectAllNode.checked).toBe(true);

  values.forEach((value) => {
    const regexItem = new RegExp(value.label, "i");
    const inputNode = screen.getByLabelText(regexItem);
    expect(inputNode.checked).toBe(true);
  });
});

test("All checkbox items unchecked when Select All is unchecked", () => {
  values = values.map((v) => ({ ...v, value: true }));

  render(
    <CheckboxList>
      <CustomCheckboxItem />
      {values.map((value) => (
        <CheckboxItem key={value.key} value={value} />
      ))}
    </CheckboxList>
  );

  const selectAllNode = screen.getByLabelText(/Unselect All/i);
  expect(selectAllNode.checked).toBe(true);
  fireEvent.click(selectAllNode);
  expect(selectAllNode.checked).toBe(false);

  values.forEach((value) => {
    const regexItem = new RegExp(value.label, "i");
    const inputNode = screen.getByLabelText(regexItem);
    expect(inputNode.checked).toBe(false);
  });
});

test("Select All shows minus sign when only some items are checked", () => {
  values = values.map((v, index) => ({ ...v, value: Boolean(index % 2) }));
  render(
    <CheckboxList>
      <CustomCheckboxItem />
      {values.map((value) => (
        <CheckboxItem key={value.key} value={value} />
      ))}
    </CheckboxList>
  );

  const selectAllNode = screen.getByLabelText(/Select All/i);

  expect(selectAllNode.indeterminate).toBe(true);
  expect(values.some((v) => v.value)).toBe(true);
});
