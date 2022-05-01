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
            acc.push(`${changeIndent}+ ${property}: ${iter(value, depth + 1)}`);
            break;
          case 'remove':
            acc.push(`${changeIndent}- ${property}: ${iter(value, depth + 1)}`);
            break;
          case 'update': {
            const [oldValue, newValue] = value;
            acc.push(`${changeIndent}- ${property}: ${iter(oldValue, depth + 1)}`);
            acc.push(`${changeIndent}+ ${property}: ${iter(newValue, depth + 1)}`);
            break;
          }
          case 'none':
            acc.push(`${notChangedIndent}${property}: ${iter(value, depth + 1)}`);
            break;
          default:
            acc.push(`${notChangedIndent}${property}: ${iter(objValue, depth + 1)}`);
        }
        return acc;
      }, []);

    return ['{', ...entries, `${closeBracketIndent}}`]
      .join('\n');
  };

  return iter(obj);
};

export default stylish;
