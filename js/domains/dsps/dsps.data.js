// Barrel file: combines per-brand dsps datasets into a single DSPS array.
// Add a new brand by creating data/<mk>.data.js and importing/spreading it below.
import { LA_DSPS } from "./data/la.data.js";
import { DB_DSPS } from "./data/db.data.js";
import { MY_DSPS } from "./data/my.data.js";

export const DSPS = [
  ...LA_DSPS,
  ...DB_DSPS,
  ...MY_DSPS,
];
