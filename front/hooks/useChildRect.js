import { useState, useCallback } from 'react';

const useChildRect = ({ loadTodoDone, addTodoDone, delTodoDone }) => {
  const [rect, setRect] = useState(null);
  const ref = useCallback(
    (node) => {
      if (node !== null) {
        setRect(node.childElementCount / 2);
      }
    },
    [loadTodoDone, addTodoDone, delTodoDone]
  );
  return [rect, ref];
};

export default useChildRect;
