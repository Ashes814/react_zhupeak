import { useState, useRef, createContext, useContext } from "react";

const useToggle = () => {
  const [value, setValue] = useState(true);
  const toggle = () => setValue(!value);

  return { value, toggle };
};

function App() {
  const { value, toggle } = useToggle();
  return (
    <div>
      {value && <div>This is A div</div>}

      <button onClick={toggle}>toggle</button>
    </div>
  );
}

export default App;
