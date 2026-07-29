import { readFileSync } from 'fs';

try {
  console.log("Testing slice with NaN");
  console.log([1, 2, 3].slice(0, NaN));
} catch (e) {
  console.log(e);
}
