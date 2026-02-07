export const getToken = async () => {
  const res = await fetch("https://opentdb.com/api_token.php?command=request");
  const data = await res.json();
  return data.token;
};
