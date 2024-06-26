import React, { useState, useEffect } from "react";
import './CurrencyConvert.css'

function CurrencyConvert() {
  const [rates, setRates] = useState();
  const [ratesFetched, setRatesFetched] = useState(false);
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("SGD");
  const [output, setOutput] = useState();

  const getRates = async () => {    
    const response = await fetch(
      "https://v6.exchangerate-api.com/v6/2766f9ab6bfc21b55a9e5470/latest/USD"
    ).then((response) => response.json());

    // save the rates in the state
    if (response.result === "success") {
      setRates(response.conversion_rates);
      setRatesFetched(true);
    }
  };

  useEffect(() => {
    getRates();
  }, []);

  const calculateOutput = async () => {
    // fetch the selected from currency rates
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/2766f9ab6bfc21b55a9e5470/latest/${fromCurrency}`
    ).then((response) => response.json());
    const fetchedRates = response.conversion_rates;
    const CurrencyRate = fetchedRates[toCurrency];
    const output = amount * CurrencyRate;
    setOutput(output);
  };

  return (
    <div className="container">
      <div class="input-amount">
        <label>Amount:</label>
        <input type="number" id="amount"  onChange={(e) => setAmount(e.target.value)} 
            value={amount} />
      </div>
      <div class="input-from">
        <label>From:</label>
        <select id="from" value={fromCurrency} 
            onChange={(e) => setFromCurrency(e.target.value)} >
          {ratesFetched ? (
            Object.keys(rates).map((currency, index) => (
              <option key={index} value={currency}>
                {currency}
              </option>
            ))
          ) : (
            <option defaultValue>USD</option>
          )}
        </select>       
      </div>

      <div class="input-to">
        <label>To:</label>
        <select id="to" value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}>
          
          {ratesFetched ? (            
             Object.keys(rates).map((currency, index) =>  
                <option key={index} value={currency}>
             {currency}
           </option>       
            )
          ) : (
            <option defaultValue>CAD</option>
          )}
        </select>
      </div>
      <button className="btn" onClick={() => calculateOutput()}>Calculate</button>
      <div className="output">
        <label>Output:</label>
      </div>
    </div>
  );
}

export default CurrencyConvert;