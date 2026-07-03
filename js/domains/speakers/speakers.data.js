// Barrel file: combines per-brand speaker datasets into a single SPEAKERS array.
// Add a new brand by creating data/<mk>.data.js and importing/spreading it below.
import { LA_SPEAKERS } from "./data/la.data.js";
import { DB_SPEAKERS } from "./data/db.data.js";

export const SPEAKERS = [
  ...LA_SPEAKERS,
  ...DB_SPEAKERS,
];
