import React, { useEffect } from 'react';


interface IRegressiveCountdownProp {
  initialTime: number;
  active: boolean;  
}

export const RegressiveCountdown = ({ initialTime, active }:IRegressiveCountdownProp) => {
        if (active) {
        regressiveCountdownFunction(initialTime);
        }
    };

    const regressiveCountdownFunction = (time: number) => {
        let countdown = time;
        const countdownInterval = setInterval(() => {
        countdown--;
        if (countdown === 0) {
            clearInterval(countdownInterval);
        }
        }, 1000);

    return (
        <span id="regressiveCountdown">{initialTime}</span>
      );  
};
