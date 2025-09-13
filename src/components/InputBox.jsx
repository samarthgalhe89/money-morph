import React, { useId } from "react";

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectedCurrency = "usd",
  amountDisabled = false,
  currencyDisabled = false,
  className = "",
}) {
  const id = useId();
  return (
    <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
      <div className="w-1/2">
        <label htmlFor={id} className="text-black/40 mb-2 inline-block">
          {label}
        </label>
        <input
          type="number"
          value={amount === 0 ? "" : amount}   // 0 dikhane ke bajay empty show karega
          onChange={(e) => {
            const val = e.target.value
            if (val === "") {
              onAmountChange(0)
            } else {
              onAmountChange(Number(val))
            }
          }}
          disabled={amountDisabled}
          className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 
                    bg-white/70 dark:bg-gray-900/50 text-gray-900 dark:text-gray-100 shadow-sm"
        />
      </div>
      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <p className="text-black/40 mb-2 w-full">Currency Type</p>
        <select
          className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
          value={selectedCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          disabled={currencyDisabled}
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InputBox;
