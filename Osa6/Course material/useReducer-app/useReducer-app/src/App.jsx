import { useContext } from "react";
import CounterContext from "./CounterContext";
import { useCounterDispatch } from "./CounterContext";

import "./App.css";

//Here the components:
const Display = () => {
  const [counter] = useContext(CounterContext);
  return <div>{counter}</div>;
};

const Button = ({ type, label }) => {
  const dispatch = useCounterDispatch();
  return <button onClick={() => dispatch({ type })}>{label}</button>;
};

function App() {
  return (
    <>
      <Display />
      <div>
        <Button type={"INC"} label="+" />
        <Button type={"DEC"} label="-" />
        <Button type={"ZERO"} label="0" />
      </div>
    </>
  );
}

export default App;
