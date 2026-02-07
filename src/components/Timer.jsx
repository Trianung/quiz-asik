import { useEffect, useState } from "react";

function Timer({ duration, onTimeUp }) {
  const [time, setTime] = useState(duration);

  useEffect(() => {
    if (time === 0) {
      onTimeUp();
      return;
    }

    const timer = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(timer);
  }, [time]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return (
    <h4>
      Waktu: {minutes}:{seconds.toString().padStart(2, "0")}
    </h4>
  );
}

export default Timer;
