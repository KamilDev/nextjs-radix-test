import React from "react";

const someComponent = () => {
  return (
    <>
      <div>someComponent</div>

      <ComponentTest />
    </>
  );
};

export default someComponent;

function ComponentTest() {
  return <h1>Other thing here</h1>;
}
