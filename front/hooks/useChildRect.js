import { useState, useCallback } from 'react';

const useChildRect = ({ loadTodoDone, addTodoDone, delTodoDone, uptSeqTodoDone }) => {
  const [rect, setRect] = useState(null);
  const ref = useCallback(
    (node) => {
      if (node !== null) {
        setRect(node.childElementCount / 2);
      }
    },
    [loadTodoDone, addTodoDone, delTodoDone, uptSeqTodoDone]
  );
  return [rect, ref];
};

export default useChildRect;
