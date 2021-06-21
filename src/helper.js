// This function calculates winner
export const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10, 15],
    [3, 6, 9, 12]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d]) {
      return squares[a];
    }
  }
  return null;
}

// This function calculates if the user is clicking on the right bubble or not.
export const validityFunction = (squares, point) => {
  const coloumn = point % 4
  for (let i = 12 + coloumn; i >= 0; i -= 4) {
    if (squares[i] === null && point < i) return false
    else if (squares[i] === null && point === i) return true
  }
  return true
}

// This function is used to place computer's move in the bottom of the row.
export const computerMove = (squares, point) => {
  for (let i = 12 + point; i >= 0; i -=4) {
    if (squares[i] ===  null) return i
  }
  return null
}