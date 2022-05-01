const formatValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return (typeof value === 'object' && value !== null) ? '[complex value]' : value;
};

const plain = (node, path = []) => {
  const entries = Object
    .entries(node)
    .filter(([, obj]) => !(obj.change === 'none' && typeof obj.value !== 'object'))
    .map(([property, obj]) => {
      const currentPath = [...path, property];
      const currentProperty = currentPath.join('.');
      const { change, value } = obj;
      switch (change) {
        case 'add':
          return `Property '${currentProperty}' was added with value: ${formatValue(value)}`;
        case 'remove':
          return `Property '${currentProperty}' was removed`;
        case 'update': {
          const [oldValue, newValue] = value;
          return `Property '${currentProperty}' was updated. From ${formatValue(oldValue)} to ${formatValue(newValue)}`;
        }
        case 'none':
          return plain(value, currentPath);
        default:
          throw new Error(`Unknown property of object: '${change}'!`);
      }
    });

  return entries.join('\n');
};

export default plain;
