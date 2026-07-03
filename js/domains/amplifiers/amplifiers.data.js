// Barrel file: combines per-brand amplifiers datasets into a single AMPLIFIERS array.
// Add a new brand by creating data/<mk>.data.js and importing/spreading it below.
import { LA_AMPLIFIERS } from "./data/la.data.js";
import { DB_AMPLIFIERS } from "./data/db.data.js";

export const AMPLIFIERS = [
  ...LA_AMPLIFIERS,
  ...DB_AMPLIFIERS,
];
