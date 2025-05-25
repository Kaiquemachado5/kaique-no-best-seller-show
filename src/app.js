// Transform this:
const getData = () => {
  const result = await fetch('/api/data');
  return result;
};

// Into this:
const getData = async () => {
  const result = await fetch('/api/data');
  return result;
};
