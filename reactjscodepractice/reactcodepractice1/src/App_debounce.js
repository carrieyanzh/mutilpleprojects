import axios from "axios";
import React, {useState} from "react";
import _ from 'lodash';
import { useDebounce } from "use-debounce";

export default function App() {
  const [pinCode, setPinCode] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");
  const [debouncedValue] = useDebounce(inputValue, 500);
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
  };

  React.useEffect(() => {    
    const getData = setTimeout(() => {
      console.log("1test="+ pinCode);
    }, 2000)

    return () => clearTimeout(getData)
  }, [pinCode])

  const setInput = (value) => {
    console.log("test="+ value);   
  };

  const debouncedSearch = _.debounce((term) => {    
    console.log(`Searching for: ${term}`);
  }, 2000); // Adjust the delay according to your needs (here, it's 500 milliseconds)

  /* const handleInputChange = (event) => {
    const { value } = event.target;
    setPinCode(value);
    debouncedSearch(value);
  }; */
  return (
    <div className="app">
      <input
        value={inputValue}
        onChange={handleInputChange}
      />
       <textarea value={pinCode} />
    </div>
  );
}