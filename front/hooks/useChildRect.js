import { useState, useCallback } from 'react';

export default ({ initialValue = null, loadTodoDone, addTodoDone }) => {
  const [rect, setRect] = useState(initialValue);
  const ref = useCallback(
    (node) => {
      if (node !== null) {
        setRect(node.childElementCount);
      }
    },
    [loadTodoDone, addTodoDone]
  );
  return [rect, ref];
};
