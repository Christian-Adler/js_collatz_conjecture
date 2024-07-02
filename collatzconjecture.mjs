const collatz = (n) => {
  if (n % 2 === 0)
    return n / 2;
  else
    return (n * 3 + 1);
};

export {collatz};