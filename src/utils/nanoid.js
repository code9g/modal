const nanoid = (length) =>
  Math.random()
    .toString(36)
    .slice(2, length + 2);

export default nanoid;
