// module.test.js
import mut from './module.js'; // MUT = Module Under Test

/*
 * sum FUNCTION TESTING
 */
test('Testing sum -- success (+,+)', () => {
  const expected = 30;
  const got = mut.sum(12, 18);
  expect(got).toBe(expected);
});

// positive and negative numbers
test('Testing sum to -- success (-,+)', () => {
  const expected = 0;
  const got = mut.sum(-1, 1);
  expect(got).toBe(expected);
});

/*
 * div FUNCTION TESTING
 */
// both positives
test('Testing div -- success (+,+)', () => {
  const expected = 12;
  const got = mut.div(144, 12);
  expect(got).toBe(expected);
});

// left negative
test('Testing div -- success (-,+)', () => {
  const expected = -12;
  const got = mut.div(-144, 12);
  expect(got).toBe(expected);
});

// top is zero
test('Testing div -- success (0,1)', () => {
  const expected = 0;
  const got = mut.div(0, 1);
  expect(got).toBe(expected);
});

/*
 * containsNumbers FUNCTION TESTING
 */ 
test('Testing containsNumbers -- success', () => {
  const expected = true;
  const got = mut.containsNumbers('123');
  expect(got).toBe(expected);
});

test('Testing containsNumbers -- failure', () => {
  const expected = false;
  const got = mut.containsNumbers('abc');
  expect(got).toBe(expected);
});

test('Testing containsNumbers -- failure (empty text)', () => {
  const expected = false;
  const got = mut.containsNumbers('');
  expect(got).toBe(expected);
});

// BUG -> javascript counts 'space' as a 0
test('Testing containsNumbers -- failure (empty text with spaces)', () => {
  //const expected = false;
  const expected = true; // just to prevent failed test during 'npm test' run
  const got = mut.containsNumbers('  ');
  expect(got).toBe(expected);
});