import { zxcvbn} from '@zxcvbn-ts/core'


export function getPasswordStrength(password: string, userInputs: string[] = []) {
  const strength = zxcvbn(password);

  return strength;
}

export type Score = 0 | 1 | 2 | 3 | 4;

export interface Feedback {
  warning: string;
  suggestions: string[];
}
