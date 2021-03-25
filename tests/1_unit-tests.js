/*const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
const PuzzleString = require('../controllers/puzzle-string.js');
let solver = new Solver();
let puzzleString = new PuzzleString();
suite('UnitTests', () => {
    suite('Function validSudokuInput(input)', () => {

     test(' puzzle string with invalid characters (not 1-9 or .)', (done) => {
      const input = ['!', 'a', '/', '+', '-', '0', '10', 0, '.'];
      input.forEach((el) => {
        assert.equal(solver.validate(el), false);
      });
      done();
    });
  })

  suite('Function puzzle String(input)', () => {
    // Valid complete puzzles pass
    test('valid puzzle string of 81 characters', done => {
      const input = '769235418851496372432178956174569283395842761628713549283657194516924837947381625'
      input.map( input => {
      assert.equal(solver.validate(input), true);
      })
      done();
    });

    // Invalid complete puzzles fail
    test(' puzzle string that is not 81 characters in length', done => {
    const input = '9235418851496372432178956174569283395842761628713549283657194516924837947381625'
      input.map( input => {
      assert.equal(solver.validate(input), false);
      })
      done();
    });
  });


    suite('Function for Valid row placement', () => {
      // valid row placement
      test('valid row placement', (done) => {
        let input = {A1: "4",A2: "6",A3: "9",A4: "5",A5: "7",A6: "2",A7: "8",A8: "1",A9: "3",};
          input.map(input => {
            assert.equal(solver.checkRowPlacement(input), true)
          })
        done();
      });
      // Invalid row placement
      test('Invalid row placement', (done) => {
        let input = {A2: "6",A3: "9",A4: "5",A5: "7",A6: "2",A7: "8",A8: "1",A9: "3",};
          input.map(input => {
            assert.equal(solver.checkRowPlacement(input), false)
          })
        done();
      });
    });


    suite('Function for Valid col placement', () => {
      // valid col placement
      test('valid col placement', (done) => {
        let input ={
            A1: ".",
            B1: "8",
            C1: "4",
            D1: "1",
            E1: ".",
            F1: "6",
            G1: ".",
            H1: "5",
            I1: ".",} 
            input.map(input => {
            assert.equal(solver.checkColPlacement(input), true)
          })
        done();
      });
      // Invalid col placement
      test('Invalid col placement', (done) => {
             let input ={
            A1: ".",
            
            C1: "4",
            D1: "1",
            E1: ".",
            F1: "6",
            G1: ".",
            H1: "5",
            I1: ".",} 
          input.map(input => {
            assert.equal(solver.checkColPlacement(input), false)
          })
        done();
      });
    });
  





      suite('Function solve(input)', () => {
    // Returns the expected solution for a valid, incomplete puzzle
    test('Returns the expected solution for an incomplete puzzle', done => {
      const input =[
        '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
        '135762984946381257728459613694517832812936745357824196473298561581673429269145378'
      ]
      
      
      assert.equal(solver.puzzleString(input), solution);
      done();
    });




      suite('Function solve(input)', () => {
    // Returns the expected solution for a valid, incomplete puzzle
    test('Returns the expected solution for an incomplete puzzle', done => {
      const input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const solution = {
        A1: "7",A2: "6",A3: "9",A4: "2",A5: "3",A6: "5",A7: "4",A8: "1",A9: "8",
        B1: "8",B2: "5",B3: "1",B4: "4",B5: "9",B6: "6",B7: "3",B8: "7",B9: "2",
        C1: "4",C2: "3",C3: "2",C4: "1",C5: "7",C6: "8",C7: "9",C8: "5",C9: "6",
        D1: "1",D2: "7",D3: "4",D4: "5",D5: "6",D6: "9",D7: "2",D8: "8",D9: "3",
        E1: "3",E2: "9",E3: "5",E4: "8",E5: "4",E6: "2",E7: "7",E8: "6",E9: "1",
        F1: "6",F2: "2",F3: "8",F4: "7",F5: "1",F6: "3",F7: "5",F8: "4",F9: "9",
        G1: "2",G2: "8",G3: "3",G4: "6",G5: "5",G6: "7",G7: "1",G8: "9",G9: "4",
        H1: "5",H2: "1",H3: "6",H4: "9",H5: "2",H6: "4",H7: "8",H8: "3",H9: "7",
        I1: "9",I2: "4",I3: "7",I4: "3",I5: "8",I6: "1",I7: "6",I8: "2",I9: "5"
      };
      
      assert.equal(solver.solve(input), solution);
      done();
    });

});
/*
 *
 *
 *       FILL IN EACH UNIT TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 *







const chai = require('chai');
const assert = chai.assert;

const { JSDOM } = require('jsdom');
let Solver;

suite('UnitTests', () => {
  suiteSetup(() => {
    // Mock the DOM for testing and load Solver
    return JSDOM.fromFile('./views/index.html')
      .then((dom) => {
        global.window = dom.window;
        global.document = dom.window.document;

        Solver = require('../public/sudoku-solver.js');
      });
  });

  // Only the digits 1-9 are accepted
  // as valid input for the puzzle grid
  suite('Function validSudokuInput(input)', () => {
    test('Valid "1-9" characters', (done) => {
      const input = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
      input.forEach((el, i) => {
        assert.strictEqual(Solver.validSudokuInput(el), input[i]);
      });
      done();
    });

    // Invalid characters or numbers are not accepted 
    // as valid input for the puzzle grid
    test('Invalid characters (anything other than "1-9") are not accepted', (done) => {
      const input = ['!', 'a', '/', '+', '-', '0', '10', 0, '.'];
      input.forEach((el, i) => {
        assert.strictEqual(Solver.validSudokuInput(el), false);
      });
      done();
    });
  });
  
  suite('Function parsePuzzle(input)', () => {
    test('Parses a valid puzzle string into an object', done => {
      const input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const output = {
        A1: ".",A2: ".",A3: "9",A4: ".",A5: ".",A6: "5",A7: ".",A8: "1",A9: ".",
        B1: "8",B2: "5",B3: ".",B4: "4",B5: ".",B6: ".",B7: ".",B8: ".",B9: "2",
        C1: "4",C2: "3",C3: "2",C4: ".",C5: ".",C6: ".",C7: ".",C8: ".",C9: ".",
        D1: "1",D2: ".",D3: ".",D4: ".",D5: "6",D6: "9",D7: ".",D8: "8",D9: "3",
        E1: ".",E2: "9",E3: ".",E4: ".",E5: ".",E6: ".",E7: ".",E8: "6",E9: ".",
        F1: "6",F2: "2",F3: ".",F4: "7",F5: "1",F6: ".",F7: ".",F8: ".",F9: "9",
        G1: ".",G2: ".",G3: ".",G4: ".",G5: ".",G6: ".",G7: "1",G8: "9",G9: "4",
        H1: "5",H2: ".",H3: ".",H4: ".",H5: ".",H6: "4",H7: ".",H8: "3",H9: "7",
        I1: ".",I2: "4",I3: ".",I4: "3",I5: ".",I6: ".",I7: "6",I8: ".",I9: "."
      };
      
      assert.deepStrictEqual(Solver.parsePuzzle(input), output);
      done();
    });
    
    // Puzzles that are not 81 numbers/periods long show the message 
    // "Error: Expected puzzle to be 81 characters long." in the
    // `div` with the id "error-msg"
    test('Shows an error for puzzles that are not 81 numbers long', done => {
      const shortStr = '83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const longStr = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6...';
      const errorMsg = 'Error: Expected puzzle to be 81 characters long.';
      const errorDiv = document.getElementById('error-msg');
      
      Solver.parsePuzzle(shortStr);
      assert.strictEqual(errorDiv.innerText, errorMsg);

      Solver.parsePuzzle(longStr);
      assert.strictEqual(errorDiv.innerText, errorMsg);
      done();
    });
  });

  suite('Function validatePuzzle(input)', () => {
    // Valid complete puzzles pass
    test('Valid puzzles pass', done => {
      const input = Solver.parsePuzzle('769235418851496372432178956174569283395842761628713549283657194516924837947381625');

      assert.equal(Solver.validatePuzzle(input), true);
      done();
    });

    // Invalid complete puzzles fail
    test('Invalid puzzles fail', done => {
      const input = Solver.parsePuzzle('779235418851496372432178956174569283395842761628713549283657194516924837947381625');

      assert.equal(Solver.validatePuzzle(input), false);
      done();
    });
  });
  
  
  suite('Function solve(input)', () => {
    // Returns the expected solution for a valid, incomplete puzzle
    test('Returns the expected solution for an incomplete puzzle', done => {
      const input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const solution = {
        A1: "7",A2: "6",A3: "9",A4: "2",A5: "3",A6: "5",A7: "4",A8: "1",A9: "8",
        B1: "8",B2: "5",B3: "1",B4: "4",B5: "9",B6: "6",B7: "3",B8: "7",B9: "2",
        C1: "4",C2: "3",C3: "2",C4: "1",C5: "7",C6: "8",C7: "9",C8: "5",C9: "6",
        D1: "1",D2: "7",D3: "4",D4: "5",D5: "6",D6: "9",D7: "2",D8: "8",D9: "3",
        E1: "3",E2: "9",E3: "5",E4: "8",E5: "4",E6: "2",E7: "7",E8: "6",E9: "1",
        F1: "6",F2: "2",F3: "8",F4: "7",F5: "1",F6: "3",F7: "5",F8: "4",F9: "9",
        G1: "2",G2: "8",G3: "3",G4: "6",G5: "5",G6: "7",G7: "1",G8: "9",G9: "4",
        H1: "5",H2: "1",H3: "6",H4: "9",H5: "2",H6: "4",H7: "8",H8: "3",H9: "7",
        I1: "9",I2: "4",I3: "7",I4: "3",I5: "8",I6: "1",I7: "6",I8: "2",I9: "5"
      };
      
      assert.deepStrictEqual(Solver.solve(input), solution);
      done();
    });
  });
});





 *
 *
 *       FILL IN EACH UNIT TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
//const PuzzleString = require('../controllers/puzzle-string.js');
let solver = new Solver();

suite('UnitTests', () => {
      test("Logic handles a valid puzzle string of 81 characters", done => {
         const input = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
         const output ='135762984946381257728459613694517832812936745357824196473298561581673429269145378';
      // assert.deepEqual(solver.validate(input, 'A', 1, 5 ), {valid:false, conflict: ['row', 'column', 'region']});
      assert.equal(solver.solve(input, 0, 0), output)
        done();
      })

      test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", done => {
          const input = 'T.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      // assert.isNotTrue(solver.validate(input, 'A', 1, 5 ));
      assert.equal(solver.solve(input, 0, 0),  'Invalid characters in puzzle')
        done();
      })

      test("Logic handles a puzzle string that is not 81 characters in length", done => {
         const input = '1.5..2.84..63.12T.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914';
      // assert.isNotTrue(solver.validate(input));
      assert.equal(solver.solve(input, 0, 0), 'Expected puzzle to be 81 characters long')
        done();
      })

    test('Logic handles a valid row placement', done => {
          const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
          const board = solver.transform(puzzle);
          const row = 4;
          const col = 3;
          const value = 5;
          // assert.isTrue(solver.validate(puzzle))
          assert.deepEqual(solver.checkRowPlacement(board, row, col, value), true)
          done()
    })

    test('Logic handles an invalid row placement', done => {
          const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
          const board = solver.transform(puzzle);
          const row = 1;
          const col = 2;
          const value = 5;
          // assert.isTrue(solver.validate(puzzle))
          assert.deepEqual(solver.checkRowPlacement(board, row, col, value), false)
          done()
    })


    test('Logic handles a valid column placement', done => {
          const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
          const board = solver.transform(puzzle);
          const row = 4;
          const col = 3;
          const value = 5;
          // assert.isTrue(solver.validate(puzzle, 'A', 1, ))
          assert.deepEqual(solver.checkColPlacement(board, row, col, value), true)
          done()
    })

    test('Logic handles an invalid column placement', done => {
          const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
          const board = solver.transform(puzzle);
          const row = 1;
          const col = 3;
          const value = 9;
          // assert.isTrue(solver.validate(puzzle))
          assert.deepEqual(solver.checkColPlacement(board, row, col, value), false)
          done()
    })


    test('Logic handles a valid region (3x3 grid) placement', done => {
          const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
          const board = solver.transform(puzzle);
          const row = 4;
          const col = 3;
          const value = 5;
          // assert.isTrue(solver.validate(puzzle))
          assert.deepEqual(solver.checkRegionPlacement(board, row, col, value),  true)
          done()
    })

    test('Logic handles a invalid region (3x3 grid) placement', done => {
          const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
          const board = solver.transform(puzzle);
          const row = 1;
          const col = 3;
          const value = 9;
          // assert.isTrue(solver.validate(puzzle))
          assert.deepEqual(solver.checkRegionPlacement(board, row, col, value), false)
          done()
    })


     test("Valid puzzle strings pass the solver", done => {
         const input = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
         const solution ='135762984946381257728459613694517832812936745357824196473298561581673429269145378';
      // assert.isTrue(solver.validate(input));
      assert.equal(solver.solve(input, 0, 0), solution)
        done();
      })


     test("Invalid puzzle strings fail the solver", done => {
         const input = '1.5..2.84..63.12.7.2..5.8...9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
  
      // assert.isTrue(solver.validate(input));
      assert.equal(solver.solve(input, 0, 0), false)
        done();
      })

      test("Solver returns the the expected solution for an incomplete puzzzle", done => {
          const input = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
          const solution ='135762984946381257728459613694517832812936745357824196473298561581673429269145378';
        // assert.isTrue(solver.validate(input));
        assert.equal(solver.solve(input, 0, 0),  solution)
        done();
      })
});
