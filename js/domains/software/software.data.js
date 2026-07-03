// Barrel file: combines per-brand software datasets into a single SOFTWARE array.
// Add a new brand by creating data/<mk>.data.js and importing/spreading it below.
import { LA_SOFTWARE } from "./data/la.data.js";
import { DB_SOFTWARE } from "./data/db.data.js";
import { MY_SOFTWARE } from "./data/my.data.js";

export const SOFTWARE = [
  ...LA_SOFTWARE,
  ...DB_SOFTWARE,
  ...MY_SOFTWARE,
];
