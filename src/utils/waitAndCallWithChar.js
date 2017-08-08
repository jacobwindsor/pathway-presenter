// Recursively call the function with each char in a string, waiting for the specified timeout before each call
const waitAndCallWithChar = (string, func, timeout = 50, i = 0) => {
  if (i >= string.length) return;
  func(string.charAt(i));
  i++;
  setTimeout(waitAndCallWithChar, timeout, string, func, timeout, i);
};

export default waitAndCallWithChar;
