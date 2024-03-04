import { useState } from "react";

type Props = {
  className: string;
};

function Button(props: Props) {
  const { className } = props;
  return <button>Click me {className}</button>;
}

function App() {
  return (
    <>
      this is an app <Button className="d;" />
    </>
  );
}

export default App;
