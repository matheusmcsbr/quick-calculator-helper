import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [operation, setOperation] = useState<string | null>(null);
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [copied, setCopied] = useState(false);
  const displayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (displayRef.current) {
      displayRef.current.scrollLeft = displayRef.current.scrollWidth;
    }
  }, [display]);

  const clearAll = () => {
    setDisplay('0');
    setOperation(null);
    setPrevValue(null);
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    setDisplay('0');
  };

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const toggleSign = () => {
    const value = parseFloat(display);
    setDisplay(value === 0 ? '0' : String(-value));
  };

  const inputPercent = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operation) {
      const currentValue = prevValue || 0;
      let newValue: number;

      switch (operation) {
        case '+':
          newValue = currentValue + inputValue;
          break;
        case '-':
          newValue = currentValue - inputValue;
          break;
        case '×':
          newValue = currentValue * inputValue;
          break;
        case '÷':
          newValue = currentValue / inputValue;
          break;
        default:
          newValue = inputValue;
      }

      const formattedValue = parseFloat(newValue.toFixed(10)).toString();
      setDisplay(formattedValue);
      setPrevValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(display).then(() => {
      setCopied(true);
      toast('Result copied to clipboard', {
        position: 'bottom-center',
        duration: 2000,
      });
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      toast('Failed to copy result', {
        position: 'bottom-center',
        duration: 2000,
      });
    });
  };

  return (
    <div className="calculator-container w-80 p-0 select-none">
      <div className="relative">
        <div ref={displayRef} className="calculator-display text-4xl pr-12 py-6">
          {display}
        </div>
        <button 
          className="copy-button" 
          onClick={copyToClipboard}
          aria-label="Copy to clipboard"
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
        </button>
      </div>
      
      <div className="grid grid-cols-4 gap-3 p-4">
        <button onClick={clearAll} className="function-button">
          AC
        </button>
        <button onClick={toggleSign} className="function-button">
          +/-
        </button>
        <button onClick={inputPercent} className="function-button">
          %
        </button>
        <button onClick={() => performOperation('÷')} className="operator-button">
          ÷
        </button>
        
        <button onClick={() => inputDigit('7')} className="number-button">
          7
        </button>
        <button onClick={() => inputDigit('8')} className="number-button">
          8
        </button>
        <button onClick={() => inputDigit('9')} className="number-button">
          9
        </button>
        <button onClick={() => performOperation('×')} className="operator-button">
          ×
        </button>

        <button onClick={() => inputDigit('4')} className="number-button">
          4
        </button>
        <button onClick={() => inputDigit('5')} className="number-button">
          5
        </button>
        <button onClick={() => inputDigit('6')} className="number-button">
          6
        </button>
        <button onClick={() => performOperation('-')} className="operator-button">
          -
        </button>

        <button onClick={() => inputDigit('1')} className="number-button">
          1
        </button>
        <button onClick={() => inputDigit('2')} className="number-button">
          2
        </button>
        <button onClick={() => inputDigit('3')} className="number-button">
          3
        </button>
        <button onClick={() => performOperation('+')} className="operator-button">
          +
        </button>

        <button onClick={() => inputDigit('0')} className="number-button col-span-2">
          0
        </button>
        <button onClick={inputDot} className="number-button">
          .
        </button>
        <button onClick={() => performOperation('=')} className="equals-button">
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator;
