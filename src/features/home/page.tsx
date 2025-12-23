import { useState } from "react";
import { Child } from "./components";

export const Home = () => {
  const [state, setState] = useState(false);
  const [prop, setProp] = useState<string | null>(null);

  console.log("parent");

  return (
    <div>
      <h1>home: {JSON.stringify(state)}</h1>
      <Child prop={prop} />
      <button onClick={() => setState((prev) => !prev)}>toggle</button>
      <button onClick={() => setProp(JSON.stringify(Math.random()))}>
        toggle child
      </button>
    </div>
  );
};
