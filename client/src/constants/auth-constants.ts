import { TimeDuration } from "./time-duration";

export const AUTH_CONSTANTS = {
  API_KEY_CONSTANTS: {
    ExpirationTime: (1 * TimeDuration.Week) / 1000, // GOtta devide by 1k due to my api using miliseconds instead of seconds
  },
} as const;
