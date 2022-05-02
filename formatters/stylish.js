const stylish = (obj) => {
  const replacer = ' ';
  const spacesCount = 4;

  const iter = (node, depth = 1) => {
    if (typeof node !== 'object' || node === null) {
      return String(node);
    }

    const currentSpaceCnt = spacesCount * depth;
    const changeIndent = replacer.repeat(currentSpaceCnt - 2);
    const notChangedIndent = replacer.repeat(currentSpaceCnt);
    const closeBracketIndent = replacer.repeat(currentSpaceCnt - spacesCount);

    const entries = Object
      .entries(node)
      .reduce((acc, [property, objValue]) => {
        const { change, value } = objValue;
        switch (change) {
          case 'add':
            return [...acc, `${changeIndent}+ ${property}: ${iter(value, depth + 1)}`];
          case 'remove':
            return [...acc, `${changeIndent}- ${property}: ${iter(value, depth + 1)}`];
          case 'update': {
            const [oldValue, newValue] = value;
            return [...acc,
              `${changeIndent}- ${property}: ${iter(oldValue, depth + 1)}`,
              `${changeIndent}+ ${property}: ${iter(newValue, depth + 1)}`];
          }
          case 'none':
            return [...acc, `${notChangedIndent}${property}: ${iter(value, depth + 1)}`];
          default:
            return [...acc, `${notChangedIndent}${property}: ${iter(objValue, depth + 1)}`];
        }
      }, []);

    return ['{', ...entries, `${closeBracketIndent}}`]
      .join('\n');
  };

  return iter(obj);
};

export default stylish;
