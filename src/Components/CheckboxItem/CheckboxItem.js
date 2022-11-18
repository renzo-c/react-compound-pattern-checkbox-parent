import React from "react";

const CheckboxItem = (props) => {
  const {
    value: { key, label },
    handleCheckedValue,
    checkedValues,
  } = props;

  const handleChange = () => {
    handleCheckedValue(key);
  };

  return (
    <li>
      <input
        type="checkbox"
        id={key}
        name={label}
        checked={checkedValues[key]}
        onChange={handleChange}
      />
      <span/>
      <label htmlFor={key}>{label}</label>
    </li>
  );
};

export default CheckboxItem;
