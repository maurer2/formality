import passwordStrengthCalculator from 'zxcvbn';

export function getPasswordStrength(password: string, userInputs: string[] = []) {
  const strength: CalculationResult = passwordStrengthCalculator(password, userInputs);

  return strength;
}

export type Score = 0 | 1 | 2 | 3 | 4;

export interface Feedback {
  warning: string;
  suggestions: string[];
}

export interface CalculationResult {
  score: Score;
  feedback: Feedback;
}
