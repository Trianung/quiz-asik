import { useEffect, useRef, useState } from "react";
import QuestionCard from "../components/QuestionCard";
import Timer from "../components/Timer";
import { getToken } from "../utils/token";

function Quiz({  user, setResult}) {
  if (typeof setResult !== "function") {
    throw new Error(
      "setResult is not a function. Pastikan dikirim dari App.js"
    );
  }

  const questionsRef = useRef([]);
  const totalRef = useRef(0);

  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [finished, setFinished] = useState(false);

  const [score, setScore] = useState({
    correct: 0,
    wrong: 0,
    answered: 0,
  });

  const TOTAL_TIME = 600;

  useEffect(() => {
    let mounted = true;

    const fetchQuestions = async () => {
      let token = localStorage.getItem("opentdb_token");
      if (!token) {
        token = await getToken();
        localStorage.setItem("opentdb_token", token);
      }

      const res = await fetch(
        `https://opentdb.com/api.php?amount=10&category=15&difficulty=medium&type=multiple&token=${token}`
      );
      const data = await res.json();

      if (!mounted) return;

      if (data.response_code === 3 || data.response_code === 4) {
        localStorage.removeItem("opentdb_token");
        return fetchQuestions();
      }

      questionsRef.current = data.results || [];
      totalRef.current = questionsRef.current.length;

      setReady(true);
    };

    fetchQuestions();
    return () => (mounted = false);
  }, []);

  if (!ready) return <p>Loading soal...</p>;

  const finishQuiz = (finalScore = score) => {
    if (finished) return;

    setFinished(true);

    const savedScores = JSON.parse(localStorage.getItem("quiz_scores")) || {};

    savedScores[user.username] = {
      ...finalScore,
      total: totalRef.current,
    };

    localStorage.setItem("quiz_scores", JSON.stringify(savedScores));

    setResult(savedScores[user.username]);
  };

  const answerHandler = (answer) => {
    if (finished) return;

    const q = questionsRef.current[index];
    if (!q) return;

    const correct = q.correct_answer === answer;

    const newScore = {
      correct: score.correct + (correct ? 1 : 0),
      wrong: score.wrong + (!correct ? 1 : 0),
      answered: score.answered + 1,
    };

    setScore(newScore);

    if (index + 1 < totalRef.current) {
      setIndex(index + 1);
    } else {
      finishQuiz(newScore);
    }
  };

  return (
    <div className="container">
      {!finished && (
        <div className="timer">Sisa waktu: <Timer duration={TOTAL_TIME} onTimeUp={finishQuiz} />
        </div>
      )}
      <div className="question-info">
        Soal {index + 1} / {totalRef.current}
      </div>
      {!finished && (
        <QuestionCard
          question={questionsRef.current[index]}
          onAnswer={answerHandler}
        />
      )}
    </div>
  );
}

export default Quiz;
