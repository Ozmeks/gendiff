const stringify = (obj, replacer = ' ', spacesCount = 4) => {
  const makeStr = (currentValue, depth = 1) => {
    if (typeof currentValue !== 'object') {
      return currentValue.toString();
    }

    const currentSpaceCnt = spacesCount * depth;
    const changeIndent = replacer.repeat(currentSpaceCnt - 2);
    const notChangedIndent = replacer.repeat(currentSpaceCnt);
    const closeBracketIndent = replacer.repeat(currentSpaceCnt - spacesCount);

    const entries = Object
      .entries(currentValue)
      .map(([key, value]) => ((key.slice(0, 1) === '+' || key.slice(0, 1) === '-')
        ? `${changeIndent}${key}: ${makeStr(value, depth + 1)}`
        : `${notChangedIndent}${key}: ${makeStr(value, depth + 1)}`));

    return ['{', ...entries, `${closeBracketIndent}}`]
      .join('\n');
  };

  return makeStr(obj);
};

export default stringify;
