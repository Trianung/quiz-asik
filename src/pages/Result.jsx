function Result({ user, result, onRestart }) {
  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="container result">
      <h2>Hasil Quiz</h2>

      <p><strong>User:</strong> {user.username}</p>
      <p><strong>Total Soal:</strong> {result.total}</p>
      <p><strong>Dijawab:</strong> {result.answered}</p>
      <p><strong>Benar:</strong> {result.correct}</p>
      <p><strong>Salah:</strong> {result.wrong}</p>

      <button className="btn-warning" onClick={onRestart}>
        Restart Quiz
      </button>

      <br /><br />
      <button className="btn-primary" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Result;
