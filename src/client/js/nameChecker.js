function checkForName(inputText) {
  const regex = /^[A-Za-z]+$/;
  if (inputText.match(regex)) {
    return true;
  }
  return false;
}

export { checkForName };
