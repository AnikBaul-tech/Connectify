import React from 'react';
import { useState,forwardRef, useImperativeHandle } from 'react';

const InfiniteRoller = forwardRef(({ options }, ref) => {
  const [index, setIndex] = useState(0);

  const handleScroll = (e) => {
    const dir = e.deltaY > 0 ? 1 : -1;

    setIndex((prev) => {
      const newIndex = (prev + dir + options.length) % options.length;
      return newIndex;
    });
  };

  useImperativeHandle(ref, () => ({
    getValue: () => options[index],   // parent can call ref.current.getValue()
  }));

  return (
    <div className="roller" onWheel={handleScroll}>
      {options[index]}
    </div>
  );
});

export default InfiniteRoller