import React, { useLayoutEffect, useRef } from "react";
import "./style.css";

const CustomCheckboxItem = (props) => {
  const { checkedValues, setListCheckedValues } = props;
  const inputRef = useRef(null);

  const allValuesChecked = Object.keys(checkedValues).every(
    (key) => checkedValues[key] === true
  );

  const someValuesChecked = allValuesChecked
    ? false
    : Object.keys(checkedValues).some((key) => checkedValues[key] === true) ===
      true;

  const isCheckboxChecked = allValuesChecked
    ? true
    : someValuesChecked
    ? null
    : false;

  useLayoutEffect(() => {
    if (inputRef.current && someValuesChecked) {
      inputRef.current.indeterminate = true;
    }
  }, [someValuesChecked]);

  const label = allValuesChecked ? "Unselect All" : "Select All";
console.log({label})
  const handleCheckAllChange = () => {
    const newCheckedValues = Object.keys(checkedValues).reduce(
      (res, key) => ({ ...res, [key]: !isCheckboxChecked }),
      {}
    );
    setListCheckedValues({ ...newCheckedValues });
  };

  return (
    <li>
      <input
        ref={inputRef}
        type="checkbox"
        id="check-uncheck-all"
        name={label}
        checked={isCheckboxChecked}
        onChange={handleCheckAllChange}
      />
      <label htmlFor="check-uncheck-all">{label}</label>
    </li>
  );
};

export default CustomCheckboxItem;
