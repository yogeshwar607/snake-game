import React, {useEffect, useRef} from "react";

const randomPosition = (width, height) => {
  const position = {
    x: Math.floor(Math.random() * width),
    y: Math.floor(Math.random() * height)
  };
  return position;
};

const getRowsColumns = (height, width) => {
  let initRows = [];
  for (let i = 0; i < height; i += 1) {
    initRows.push([]);
    for (let k = 0; k < width; k += 1) {
      initRows[i].push('blankColumn');
    }
  }
  return initRows;
};

const displayGrid = (rowsColumns) => {
  return rowsColumns.map((row, rowIndex) =>
    <div key={rowIndex}>
      {row.map((column, i) => {
        switch (column) {
          case 'blankColumn':
            return <span key={i}>&nbsp;</span>;
          case 'snake':
            return <span className={'snake'} key={i}>&nbsp;</span>;
          case 'food':
            return <span className={'food'} key={i}>&nbsp;</span>
        }
      })
      }
    </div>
  );
};

const displayScore = (score) => {
  return <div className={'scoreBox'}>Score: {score}</div>
};

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(
    () => {
      savedCallback.current = callback;
    },
    [callback]
  );

  // Set up the interval.
  useEffect(
    () => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    },
    [delay]
  );
}

export {
  randomPosition,
  getRowsColumns,
  displayGrid,
  useInterval,
  displayScore
}
