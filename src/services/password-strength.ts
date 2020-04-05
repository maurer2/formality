import passwordStrengthCalculator, { ZXCVBNResult } from 'zxcvbn';

export default {
  getPasswordStrength(password: string, userInputs: string[] = []) {
    const calculatedStrength = passwordStrengthCalculator(password, userInputs);

    return calculatedStrength;
  },
};

export type passwordCalculationsResult = Pick<ZXCVBNResult, 'score' | 'feedback'>;
