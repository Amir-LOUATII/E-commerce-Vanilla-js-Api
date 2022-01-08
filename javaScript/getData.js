async function getData(url) {
  const response = await fetch(url);
  if (response) {
    return response.json();
  }
  throw new Error((err) => console.log(err));
}

export { getData };
