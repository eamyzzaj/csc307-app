// module.test.js
import mut from './module.js'; // MUT = Module Under Test

// sum FUNCTION TESTING
test('Testing sum -- success', () => {
  const expected = 30;
  const got = mut.sum(12, 18);
  expect(got).toBe(expected);
});

// div FUNCTION TESTING

// containsNumbers TESTING 
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
  const expected = false;
  const got = mut.containsNumbers('  ');
  expect(got).toBe(expected);
});