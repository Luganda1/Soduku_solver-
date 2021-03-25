class SudokuSolver {


  validate(puzzleString, row, col, value) {
        const rows = {'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E':5, 'F':6, 'G':7, 'H':8, 'I':9};
     let rowNumber = rows[row.toUpperCase()]
    //  let rowNumber = rows
console.log("rowNumber = :" + rowNumber)
      let validCol = this.checkColPlacement(puzzleString, rowNumber, col, value)
      let validRow = this.checkRowPlacement(puzzleString, rowNumber, col, value)
      let validRegion = this.checkRegionPlacement(puzzleString, rowNumber, col, value)
      let conflicts = [];
      if(validCol &&  validRow && validRegion){
        return {valid: true} 
      }else{
        if(!validCol){
          conflicts.push("column")
        }
        if(!validRow){
          conflicts.push("row")
        }
        if(!validRegion){
          conflicts.push("region")
        }
        return {valid: false,
                conflict: conflicts
        }
      }   
  }

       
  checkRowPlacement(puzzleString, row, column, value) {
    let grid = this.transform(puzzleString)
      if (grid[row - 1][column - 1] !== 0) {
        return false;
      }
      for (let i = 0; i < 9; i++) {
        if (grid[row - 1][i] == value) {
          return false;
        }
      }
      return true;

  }


  checkColPlacement(puzzleString, row, column, value) {
     let grid = this.transform(puzzleString)
      if (grid[row - 1][column - 1] !== 0) {
        return false;
      }
      for (let i = 0; i < 9; i++) {
        if (grid[i][column - 1] == value) {
          return false;
        }
      }
      return true;
  }

  checkRegionPlacement(puzzleString, row, col, value) {
      let grid = this.transform(puzzleString);
    // row = this.letterToNumber(row);
    if (grid[row - 1][col - 1] !== 0) {
      return false;
    }
    let startRow = row - (row % 3),
      startCol = col - (col % 3);
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        if (grid[i + startRow][j + startCol] == value) return false;
    return true;

  }
solveSuduko( grid,  row, col)
    {
        let N = 9;
        /*if we have reached the 8th
           row and 9th column (0
           indexed matrix) ,
           we are returning true to avoid further
           backtracking       */
        if (row == N - 1 && col == N)
            return grid;
 
        // Check if column value  becomes 9 ,
        // we move to next row
        // and column start from 0
        if (col == N) {
            row++;
            col = 0;
        }
 
        // Check if the current position
        // of the grid already
        // contains value >0, we iterate
        // for next column
        if (grid[row][col] != 0)
            return this.solveSuduko(grid, row, col + 1);
 
        for (let num = 1; num < 10; num++) {
 
            // Check if it is safe to place
            // the num (1-9)  in the
            // given row ,col ->we move to next column
            if (this.isSafe(grid, row, col, num)) {
 
                /*  assigning the num in the current
                (row,col)  position of the grid and
                assuming our assined num in the position
                is correct */
                grid[row][col] = num;
 
                // Checking for next
                // possibility with next column
                if (this.solveSuduko(grid, row, col + 1))
                    return grid;
            }
            /* removing the assigned num , since our
               assumption was wrong , and we go for next
               assumption with diff num value   */
            grid[row][col] = 0;
        }
        return false;
    }
 
isSafe( grid,  row,  col, num)
    {
 
        // Check if we find the same num
        // in the similar row , we
        // return false
        for (let x = 0; x <= 8; x++)
            if (grid[row][x] == num)
                return false;
 
        // Check if we find the same num
        // in the similar column ,
        // we return false
        for (let x = 0; x <= 8; x++)
            if (grid[x][col] == num)
                return false;
 
        // Check if we find the same num
        // in the particular 3*3
        // matrix, we return false
        let startRow = row - row % 3 
        let startCol = col - col % 3;
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                if (grid[i + startRow][j + startCol] == num)
                    return false;
 
        return true;
    }

  transform(puzzleString) {
    // take ..53..23.23. => [[0,0,5,3,0,0,2,3,0],
    // [2,3,0]
    let grid = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    let row = -1;
    let col = 0;
    for (let i = 0; i < puzzleString.length; i++) {
      if (i % 9 == 0) {
        row++;
      }
      if (col % 9 == 0) {
        col = 0;
      }

      grid[row][col] = puzzleString[i] === "." ? 0 : +puzzleString[i];
      col++;
    }
    return grid;
  }

  solve(puzzleString) {
    if (puzzleString.length != 81) {
            return "Expected puzzle to be 81 characters long" 
          }
          if (/[^0-9.]/g.test(puzzleString)) {
            
            return "Invalid characters in puzzle" 
          }
    let grid =  this.transform(puzzleString);
    let solved = this.solveSuduko(grid, 0, 0)
    // console.log(solved)
    if(!solved){
      return false
    }
    return solved.flat().join('')
  }
}

module.exports = SudokuSolver;







// const textArea = document.getElementById('#text-input');
// const solveBtn = document.getElementById('#solve-button');
// const clearBtn = document.getElementById('#clear-button');
// const sudokuInputs = document.getElementsByClassName('.sudoku-input');
// // import { puzzlesAndSolutions } from './puzzle-strings.js';

// const setGrid = str => {
//   const cells = document.querySelectorAll('.sudoku-input');
//   const numbers = str.split('');
  
//   return cells.forEach((cell, i) => {
//     const currNum = numbers[i];

//     validSudokuInput(currNum) && currNum !== '.' ? cell.value = currNum : cell.value = '';
//   });
// }

// const setTextArea = () => {
//   const cells = Array.from(document.querySelectorAll('.sudoku-input'));
//   textArea.value = cells.reduce((str, {value}) => {value !== '' && validSudokuInput(value) ? str += value : str += '.'; return str}, '');
// }

// const validSudokuInput = str => {
//   const possibleNum = parseInt(str);
//   return (possibleNum >= 1 && possibleNum <= 9) && str;
// }

// const reference = () => {
//   const combine = (a, b) => {
//     const combos = [];
//     for (let i in a) {
//       for (let j in b) {
//         combos.push(a[i] + b[j]);
//       }
//     }
    
//     return combos;
//   };

  // const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  // const cols = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  // const rowSquare = [['A', 'B', 'C'], ['D', 'E', 'F'], ['G', 'H', 'I']];
  // const colSquare = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']];
  
  // const cordinates = combine(rows, cols);
  // const rowUnits = rows.map(row => combine(row, cols));
  // const colUnits = cols.map(col => combine(rows, col));
  // const boxUnits = rowSquare.reduce((acc, curr) => {
  //   colSquare.forEach((col, j) => {
  //     acc.push(combine(curr, colSquare[j]))
  //   });
    
  //   return acc;
  // }, []);
  
  // const allUnits = rowUnits.concat(colUnits, boxUnits);
  // const groups = {};
//   /* 
//     Generate an array of the three units (row, col, and box) that contain a single
//     cell/coordinate. Each unit has a length of 9.
//   */
//   groups.units = cordinates.reduce((acc, currCell) => {
//     acc[currCell] = allUnits.reduce((acc, currArr) => {
//       if (currArr.includes(currCell)) {
//         acc.push(currArr);
//       }
      
//       return acc;
//     }, []);
    
//     return acc;
//   }, {});
//   /* 
//     Generate a list of peers for each cell/coordinate, which
//     is a list of all cells in the three units *except* the cell
//     itself. For ex., the peers of C2 are all the cells in its 
//     three units except for C2. Each peer list has a length of 20.
//   */
//   groups.peers = cordinates.reduce((acc, currCell) => {
//     const flattenedArr = groups.units[currCell].reduce((acc, currArr) => {
//       currArr.forEach(el => acc.push(el));
//       return acc;
//     }, []);
    
//     acc[currCell] = Array.from(new Set(flattenedArr)).filter(el => el !== currCell);
    
//     return acc;
//   }, {});
  
  
//   return {
//     cordinates,
//     groups,
//     allUnits
//   }
// }

// // Make these available globally
// const { cordinates, groups, allUnits } = reference();

// const parsePuzzle = str => {
//   /* 
//     Create a map of the incomplete sudoku puzzle at
//     the beginning of the game with each cell and 
//     either the current value or '.'
//   */
//   const valueMap = cordinates.reduce((acc, coord, i) => {
//     acc[coord] = str[i];

//     return acc;
//   }, {});
  
//   const errorDiv = document.getElementById('error-msg');
  
//   if (str.length === 81) {
//     errorDiv.innerText = '';
//     return valueMap;
//   } else {
//     errorDiv.innerText = "Error: Expected puzzle to be 81 characters long.";
//     // explicitly returning null so we can handle that case when it's called
//     return null;
//   }
// }

// const solve = (puzzle = textArea.value) => {
//   /*
//     User clicks solve button
//   */
//   const digits = '123456789';
//   let inputGrid = parsePuzzle(puzzle);
//   // Bail out if the puzzle is not valid
//   if (!inputGrid) return null;
//   // Filter out cells with no value
//   inputGrid = Object.keys(inputGrid).reduce((acc, key) => {
//     const currVal = inputGrid[key];
//     if (currVal !== '.') {
//       acc[key] = currVal;
//     }

//     return acc;
//   }, {});
//   // 1-9 for each coordinate
//   let outputGrid = cordinates.reduce((acc, coord) => {
//     acc[coord] = digits;

//     return acc;
//   }, {});

//   /* 
//     Loop through the known positions on the input grid 
//     and begin eliminating other possibilities for cells 
//     without a value -- first pass of constraint propagation
//   */
//   Object.entries(inputGrid).forEach(([position, value]) => {
//     outputGrid = confirmValue(outputGrid, position, value);
//   });

//   // If puzzle is complete after first pass, return it
//   if (validatePuzzle(outputGrid)) {
//     return outputGrid;
//   }

//   // Guess digits for incomplete puzzle
//   return guessDigit(outputGrid);
// }

// const confirmValue = (grid, pos, val) => {

//   const remainingValues = grid[pos].replace(val, '');
  
//   remainingValues.split('').forEach(val => {
//     grid = eliminate(grid, pos, val);
//   });

//   return grid;
// }

// const eliminate = (grid, pos, val) => {
//   if (!grid) return false;

//   if (!grid[pos].includes(val)) return grid; // Exit if we've already eliminated the value from the grid/cell

//   grid[pos] = grid[pos].replace(val, ''); // Set cell value if known, otherwise remove possibility

//   if (grid[pos].length === 0) { // If there are no possibilities we made a wrong guess somewhere
//     return false; 
//   } else if (grid[pos].length === 1) { // Remove known cell values from all peers recursively
//     groups.peers[pos].forEach(peer => {
//       grid = eliminate(grid, peer, grid[pos]);

//       if (!grid) return false;
//     });
//   }

//   const possibilities = groups.units[pos].reduce((acc, unit) => {
//     return unit.map(coord => {
//       if (grid[coord] && grid[coord].indexOf(val) > -1) return coord;
//     }).filter(Boolean);
//   }, []);

//   if (possibilities.length === 0) { // We made a mistake somewhere if there are no possible values for a coordinate
//     return false;
//   } else if (possibilities.length === 1 && grid[possibilities[0]].length > 1) { // There is only one possible position, but the grid still lists multiple possibilities, confirm the value before removing it
//     if (!confirmValue(grid, possibilities[0], val)) {
//       return false;
//     } 
//   }
  
//   return grid;
// }

// const guessDigit = grid => {
//   /* 
//     Guess a digit with the fewest number 
//     of possibilities
//   */
//   if (!grid) return false;

//   // End if there's a possible valid solution
//   if (validatePuzzle(grid)) return grid;

//   // Sort by cells with the least number of possibilities
//   const possibilities = grid.filter(x => x.length > 1)
//     .sort((a, b) => {
//     return a[Object.keys(a)[0]].length - b[Object.keys(b)[0]].length;
//   });

//   const pos = Object.keys(possibilities[0])[0];

//   for (let i in grid[pos]) {
//     const val = grid[pos][i];
//     const possibleSolution = guessDigit(confirmValue(Object.assign({}, grid), pos, val));

//     if (possibleSolution) return possibleSolution;
//   }
// }

// const validatePuzzle = puzzle => {
//   if (!puzzle) return false;

//   const validUnit = '123456789'.split('');
//   /* 
//     Create a 2D array of puzzle units with 
//     sorted values for each cell 
//   */
//   const puzzleUnits = allUnits.map(unit => {
//     return unit.map(cell => {
//       return puzzle[cell];
//     }).sort();
//   });

//   /* 
//     Check that every puzzle unit matches a
//     valid unit of the digits 1-9 
//   */

//   return puzzleUnits.every(arr => {
//     return validUnit.every(e => arr.includes(e));
//   });
// }

// const showSolution = obj => {
//   // Only handle cases where the puzzle is valid
//   if (obj) {
//     const solutionStr = Object.values(obj).join().replace(/\,/g, '');
//     setGrid(solutionStr), setTextArea();
//   }
// }

// const clearInput = () => {
//   /*
//     User clicks clear button
//   */
//   const textArea = document.getElementById('text-input');
  
//   return textArea.value = '', setGrid('');
// }

// // LEAVE THIS IN BOILERPLATE! (Except for the `setGrid` line)
// document.addEventListener('DOMContentLoaded', () => {
//   // Set text area with a simple puzzle
//   textArea.value = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
  
//   setGrid(textArea.value);

//   Array.from(sudokuInputs).forEach(input => input.addEventListener('input', setTextArea));
//   solveBtn.addEventListener('click', () => { showSolution(solve()) }, false);
//   clearBtn.addEventListener('click', clearInput, false);
// });

// /* 
//   Export your functions for testing in Node.
//   Note: The `try` block is to prevent errors on
//   the client side
// */
// try {
//   module.exports = {
//     validSudokuInput,
//     validatePuzzle,
//     parsePuzzle,
//     solve,
//     setTextArea,
//     setGrid,
//     clearInput,
//     showSolution
//   }
// } catch (e) {}
