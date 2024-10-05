// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('USD');
  const [changed, setChanged] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function(){
    async function changed(){
      setIsLoading(true);
      const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
      const data = await res.json();
      setChanged(data.rates[toCurrency]);
      setIsLoading(false);
    }

    if(fromCurrency === toCurrency) return setChanged(amount);

    changed();
  }, [amount, fromCurrency, toCurrency])
  return (
    <div>
      <input type="text" value={amount} onChange={(e) =>setAmount(Number(e.target.value))} disabled={isLoading}/>
      <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} disabled={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} disabled={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>From {amount} {fromCurrency} To {changed} {toCurrency}</p>
    </div>
  );
}
