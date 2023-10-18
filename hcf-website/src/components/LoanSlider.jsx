import React, {useState} from "react";


const LoanSlider = () => {
    const [sliderValue, setSliderValue] = useState(1250);
    const minAmount = 100;
    const maxAmount = 8000;
    const loanPercentage = 0.2868;

    const [periodValue, setPeriodValue] = useState(1);
  
    const handleSliderChange = (event) => {
      setSliderValue(event.target.value);
    };

    const handlePeriodChange = (event) => {
        setPeriodValue(event.target.value);
    };

    const handleDecrease = () => {
        setPeriodValue((prevValue) => Math.max(parseInt(prevValue, 10) - 1, 1));
    };
    
    const handleIncrease = () => {
        setPeriodValue((prevValue) => Math.min(parseInt(prevValue, 10) + 1, 6));
    };

    const calculateMI = () => {
        const r = loanPercentage;
        const numerator = sliderValue * r * Math.pow(1 + r, periodValue);
        const denominator = Math.pow(1 + r, periodValue) - 1;
        const mi = numerator / denominator;
        return mi.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    };
  
    return (
      <div className="main-content">
        <div className="slider-title">
            <span className="slider-title-label">Loan Amount</span>
            <span className="slider-title-amount">R{sliderValue}</span>
        </div>
        <input
          type="range"
          min={minAmount}
          max={maxAmount}
          step="50"
          value={sliderValue}
          onChange={handleSliderChange}
          className="loan-slider-input"
        />
        <div className="slider-labels">
            <span className="min-amount">R{minAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            <span className="max-amount">R{maxAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
        </div>

        <div className="loan-repayment">
            <div className="period-counter">
                <div className="part-label">Running Time</div>
                <div className="period-increment">
                    <span className="period-value">{periodValue} Month(s)</span>
                    <button className="shadow-sm decrease-btn" onClick={handleDecrease}>-</button>
                    <button className="shadow-sm increase-btn" onClick={handleIncrease}>+</button>
                </div>
            </div>
            <div className="installments-counter">
                <div className="part-label">Installments</div>
                <div className="monthly-installment">R{calculateMI()}</div>
            </div>
        </div>

        <div className="apply-now">
            <button className="main-btn">Start Application</button>
        </div>

        <div className="loan-disclaimer"> 
            <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio sapiente incidunt dolorum dicta libero reiciendis qui nulla eaque animi enim.
            </p>
        </div>
      </div>
    );
  };
  
  export default LoanSlider;