import CheckboxList from "./Components/CheckboxList";
import CustomCheckboxItem from "./Components/CustomCheckboxItem";
import CheckboxItem from "./Components/CheckboxItem";

const values = [
  { key: 1, label: "item 1", value: false },
  { key: 2, label: "item 2", value: false },
  { key: 3, label: "item 3", value: false },
  { key: 4, label: "item 4", value: false },
];

function App() {
  return (
    <div className="App">
      <CheckboxList>
        <CustomCheckboxItem />
        {values.map((value) => (
          <CheckboxItem key={value.key} value={value} />
        ))}
      </CheckboxList>
    </div>
  );
}

export default App;
