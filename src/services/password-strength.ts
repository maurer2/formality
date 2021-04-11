import { zxcvbn } from '@zxcvbn-ts/core'


export function getPasswordStrength(password: string, userInputs: string[] = []): number {
  if (!password.length) {
    return 0
  }

  const {score} = zxcvbn(password);

  return score;
}

export type Score = 0 | 1 | 2 | 3 | 4;

export interface Feedback {
  warning: string;
  suggestions: string[];
}
