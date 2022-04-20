const stylish = (obj, depth = 1) => {
  if (typeof obj !== 'object') {
    return obj.toString();
  }

  const replacer = ' ';
  const spacesCount = 4;
  const currentSpaceCnt = spacesCount * depth;
  const changeIndent = replacer.repeat(currentSpaceCnt - 2);
  const notChangedIndent = replacer.repeat(currentSpaceCnt);
  const closeBracketIndent = replacer.repeat(currentSpaceCnt - spacesCount);

  const entries = Object
    .entries(obj)
    .map(([key, value]) => ((key.slice(0, 1) === '+' || key.slice(0, 1) === '-')
      ? `${changeIndent}${key}: ${stylish(value, depth + 1)}`
      : `${notChangedIndent}${key}: ${stylish(value, depth + 1)}`));

  return ['{', ...entries, `${closeBracketIndent}}`]
    .join('\n');
};

export default stylish;
