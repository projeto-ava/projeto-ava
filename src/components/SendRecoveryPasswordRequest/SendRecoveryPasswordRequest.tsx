import React, { useEffect, useState, useRef } from "react";
import { Button } from "../Button/Button";

export const SendRecoveryPasswordRequest = () => {
  const initialTime = 30;
  const [secondsLeft, setSecondsLeft] = useState(initialTime);
  const [countControl, setCountControl] = useState(0);
  const timerId: { current: NodeJS.Timeout | undefined } = useRef();

  function startCount() {
    timerId.current = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
  }

  function restartCount() {
    setSecondsLeft(initialTime);
    setCountControl((prev) => prev + 1);
    clearCount();
  }

  function clearCount() {
    clearInterval(timerId.current);
  }

  useEffect(() => {
    startCount();
  }, [countControl]);

  useEffect(() => {
    return () => clearCount();
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) {
      clearCount();
    }
  }, [secondsLeft]);

  return (
    <>
      {secondsLeft == 0 ? (
        ""
      ) : (
        <div className="flex items-center justify-center gap-1">
          <p className="mt-2 mb-8 text-xs text-gray-500 font-normal">
            Aguarde{" "}
          </p>
          <span className="mt-2 mb-8 text-xs text-primary-500 font-bold">
            {secondsLeft}
          </span>{" "}
          <p className="mt-2 mb-8 text-xs text-gray-500 font-normal">
            segundos para tentar novamente
          </p>
        </div>
      )}
      <Button onClick={restartCount} disabled={secondsLeft > 0}>
        Entrar
      </Button>
    </>
  );
};
