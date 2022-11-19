import React, { useState } from "react";
import "./style.css";

const getBooleanObject = (children) => {
  const newCheckedValues = {};
  React.Children.forEach(children, (child) => {
    if (child.type.name === "CheckboxItem") {
      const { key, value } = child.props.value;
      newCheckedValues[key] = value;
    }
  });
  return newCheckedValues;
};

const CheckboxList = ({ children }) => {
  const [checkedValues, setCheckedValues] = useState(() =>
    getBooleanObject(children)
  );

  const handleCheckedValue = (key) => {
    const res = { ...checkedValues, [key]: !checkedValues[key] };
    setCheckedValues(res);
  };

  const setListCheckedValues = (newList) => {
    setCheckedValues(newList);
  };

  return React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      ...child.props,
      handleCheckedValue,
      setListCheckedValues,
      checkedValues,
    });
  });
};

export default CheckboxList;
