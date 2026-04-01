export const getRandomPositiveInteger = (a = 0, b = 1) => {

  const min = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const max = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getRandomPositiveFloat = (a = 0, b = 1, precision = 1) => {
  const min = Math.min(Math.abs(a), Math.abs(b));
  const max = Math.max(Math.abs(a), Math.abs(b));

  return (Math.random() * (max - min) + min).toFixed(precision);
};

export const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

export const addLeadZero = (value) => value < 10 ? `0${value}` : String(value);

export const shuffleArray = (array) => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const random = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[random]] = [shuffled[random], shuffled[i]];
  }

  return shuffled;
};

export const getPlural = (count, words) => {
  const [one, few, many] = words;

  if (count % 100 >= 11 && count % 100 <= 14) {
    return many;
  }

  switch (count % 10) {
    case 1:
      return one;
    case 2:
    case 3:
    case 4:
      return few;
    default:
      return many;
  }
};
