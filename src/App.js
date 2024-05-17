import React, { useState } from 'react';
import './App.css';

function CalcButton({label, buttonClassName = "CalcButton", onClick}) {
  return (
    <button className={buttonClassName} onClick={onClick}>
      {label}
    </button>
  );
}

function CalcDisplay({display}) {
  return (
    <div className="CalcDisplay">
      {display}
    </div>    
  );
}

export default function App() {
  const [disp, setDisp] = useState("0");
  const [num1, setNum1] = useState(null);
  const [num2, setNum2] = useState(null);
  const [op, setOp] = useState(null);

  const clrClickHandler = () => {
    setDisp("0");
    setNum1(null);
    setNum2(null);
    setOp(null);
  }

  const equalClickHandler = () => {
    let result = null;
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    
    switch (op) {
      case "ADD":
        result = n1 + n2;
        break;
      case "SUB":
        result = n1 - n2;
        break;
      case "MUL":
        result = n1 * n2;
        break;
      case "DIV":
        result = n1 / n2;
        break;
      case "EXP":
        result = Math.pow(n1, n2);
        break;
      case "MOD":
        result = n1 % n2;
        break;
      default:
        result = 'Invalid Operation';
    }

    setDisp(result.toString());
    setNum1(result.toString());
    setNum2(null);
    setOp(null);
  }

  const numberClickHandler = (e) => {
    const value = e.target.innerHTML;

    if (disp === "0" && value === "0") {
      return; // don't do anything
    }

    if (op === null) {
      if (num1 === null) {
        setNum1(value);
        setDisp(value);
      } else {
        setNum1(num1 + value);
        setDisp(num1 + value);
      }
    } else {
      if (num2 === null) {
        setNum2(value);
        setDisp(value);
      } else {
        setNum2(num2 + value);
        setDisp(num2 + value);
      }
    }
  }

  const opClickHandler = (e) => {
    const value = e.target.innerHTML;
    setOp(value);
    setDisp(value);
  }

  const decimalClickHandler = () => {
    if (disp.indexOf(".") === -1) {
      setDisp(disp + ".");
      if (op === null) {
        setNum1(num1 === null ? "0." : num1 + ".");
      } else {
        setNum2(num2 === null ? "0." : num2 + ".");
      }
    }
  }

  return (
    <div className="App">
      <header className="Header">
        <h1>Jeremy Paul Tibuc Pangan</h1>
        <h2>BSCPE-2A</h2>
      </header>
      <div className="CalcContainer">
        <CalcDisplay display={disp} />
        <div className="ButtonContainer">
          <CalcButton label={"CLR"} onClick={clrClickHandler}/>
          <CalcButton label={7} onClick={numberClickHandler}/>
          <CalcButton label={8} onClick={numberClickHandler}/>
          <CalcButton label={9} onClick={numberClickHandler}/>
          <CalcButton label={"DIV"} onClick={opClickHandler}/>
          <CalcButton label={4} onClick={numberClickHandler}/>
          <CalcButton label={5} onClick={numberClickHandler}/>
          <CalcButton label={6} onClick={numberClickHandler}/>
          <CalcButton label={"MUL"} onClick={opClickHandler}/>
          <CalcButton label={1} onClick={numberClickHandler}/>
          <CalcButton label={2} onClick={numberClickHandler}/>
          <CalcButton label={3} onClick={numberClickHandler}/>
          <CalcButton label={"SUB"} onClick={opClickHandler}/>
          <CalcButton label={"EXP"} onClick={opClickHandler}/>
          <CalcButton label={0} onClick={numberClickHandler}/>
          <CalcButton label={"."} onClick={decimalClickHandler}/>
          <CalcButton label={"EQ"} onClick={equalClickHandler}/>
          <CalcButton label={"ADD"} onClick={opClickHandler}/>
          <CalcButton label={"NEG"} onClick={decimalClickHandler}/> {/* Toggle Negation */}
          <CalcButton label={"MOD"} onClick={opClickHandler}/>
        </div>
      </div>
    </div>
  );
}