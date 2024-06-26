import { useState, useEffect, useRef } from "react";

export default function App(props) {
  const [count, setCount] = useState(0);

  const handleButton = () => {
    setCount(count + 1);
    alert("test button");
  };

  useEffect(() => {
    console.log("test");
  }, [count])

  const handleInputChange = (event) => {
    console.log(event.target.value);
  };

  const myLink = (e) => {
    console.log("test linnk");
  }

  const numbers = [1, 2, 3, 4, 5];
  const listNums = numbers.map((num) => <li key={num.toString()}> {num} </li>);


  return (
    <>
      <p>test:{count}</p>
      <p><input onChange={handleInputChange} /></p>
      <p>
        <button onClick={handleButton} />     Click me      </p>
      <p>link: <a href="#" onClick={myLink}> click link</a></p>
      <p>{numbers.map((number) => number * 2)}</p>
      <p><ul>
        {listNums}</ul></p>
      <p><h3>welcome {props.name}</h3></p>
    </>
  )



}