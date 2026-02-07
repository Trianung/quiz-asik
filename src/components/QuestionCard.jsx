function QuestionCard({ question, onAnswer }) {
  if (!question) return null;

  const options = [
    ...question.incorrect_answers,
    question.correct_answer,
  ].sort();

  return (
    <div>
      <div className="question" dangerouslySetInnerHTML={{ __html: question.question }} />

      {options.map((opt, i) => (
        <button
          key={i}
          className="answer-btn"
          onClick={() => onAnswer(opt)}
          dangerouslySetInnerHTML={{ __html: opt }}
        />
      ))}
    </div>
  );
}

export default QuestionCard;
