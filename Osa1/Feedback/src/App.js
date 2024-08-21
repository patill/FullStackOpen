import { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const Button = (props) => {
  return <button onClick={props.handler}>{props.text}</button>;
};

const StatisticsLine = (props) => {
  return (
    <p>
      {props.text} {props.value}
    </p>
  );
};

const Statistics = ({ stats }) => {
  console.log(stats);
  if (stats.good === 0 && stats.neutral === 0 && stats.bad === 0) {
    return <p>No feedback given</p>;
  } else {
    return (
      <div>
        <StatisticsLine text="good" value={stats.good} />
        <StatisticsLine text="neutral" value={stats.neutral} />
        <StatisticsLine text="bad" value={stats.bad} />
        <StatisticsLine text="all" value={stats.total} />
        <StatisticsLine text="average" value={stats.average} />
        <StatisticsLine text="positive" value={stats.positivePercent + " %"} />
      </div>
    );
  }
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const registerEvent = (counter, handler) => {
    handler(counter + 1);
  };

  const total = neutral + good + bad;

  const stats = {
    good: good,
    neutral: neutral,
    bad: bad,
    total,
    average: (good - bad) / total,
    positivePercent: (good / total) * 100,
  };

  return (
    <div>
      <Header text="Give feedback" />
      <Button handler={() => registerEvent(good, setGood)} text="Good" />
      <Button
        handler={() => registerEvent(neutral, setNeutral)}
        text="Neutral"
      />
      <Button handler={() => registerEvent(bad, setBad)} text="Bad" />
      <Header text="statistics" />
      <Statistics stats={stats} />
    </div>
  );
};

export default App;
