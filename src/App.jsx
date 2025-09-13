import { useState } from 'react'
import './App.css'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import { InputBox } from './components'
import yourImage from './assets/bg.jpg'
import { Sun, Moon } from 'lucide-react'

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState('usd')
  const [to, setTo] = useState('inr')
  const [convertedAmount, setConvertedAmount] = useState(0)
  const [darkMode, setDarkMode] = useState(false)

  const currencyInfo = useCurrencyInfo(from)
  const options = Object.keys(currencyInfo || {})

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(0)
    setAmount(convertedAmount)
  }

  return (
    <div
      className={`${darkMode ? 'dark' : ''}`}
    >
      <div
        className='w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat transition-colors duration-500 dark:bg-gray-900'
        style={{ backgroundImage: `url(${yourImage})` }}
      >
        {/* Dark/Light toggle */}
        <div className="absolute top-5 right-5">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-white/40 dark:bg-gray-800 shadow-lg backdrop-blur-md hover:scale-110 transition"
          >
            {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-blue-600" />}
          </button>
        </div>

        <div className='w-full'>
          <div className='w-full max-w-md mx-auto border border-gray-200 rounded-2xl shadow-xl p-6 backdrop-blur-lg bg-white/30 dark:bg-gray-800/40 dark:border-gray-700'>
            {/* Heading */}
            <h1 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Currency Converter
            </h1>

            {/* Live Exchange Info */}
            {currencyInfo[to] && (
              <p className="text-center mb-3 text-sm text-gray-700 dark:text-gray-300">
                1 {from.toUpperCase()} = {currencyInfo[to]} {to.toUpperCase()}
              </p>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault()
                convert()
              }}
            >
              <div className='w-full mb-3'>
                <InputBox
                  label="From"
                  amount={amount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => setFrom(currency)}
                  onAmountChange={(amount) => setAmount(amount)}
                  selectedCurrency={from}
                />
              </div>

              {/* Swap button */}
              <div className='relative w-full h-0.5 my-4'>
                <button
                  onClick={swap}
                  type="button"
                  className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1 shadow-lg transition-transform duration-300 hover:scale-110 active:rotate-180'
                >
                  Swap
                </button>
              </div>

              <div className='w-full mb-3'>
                <InputBox
                  label="To"
                  currencyOptions={options}
                  amount={convertedAmount}
                  onCurrencyChange={(currency) => setTo(currency)}
                  selectedCurrency={to}
                  amountDisabled
                />
              </div>

              <button
                type='submit'
                className='w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-3 rounded-xl shadow-md hover:scale-[1.02] transition'
              >
                Convert {from.toUpperCase()} → {to.toUpperCase()}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
