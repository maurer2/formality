import passwordStrengthCalculator from 'zxcvbn';

export default {
  getPasswordStrength(password: string, userInputs: string[] = []) {
    const calculatedStrength = passwordStrengthCalculator(password, userInputs);

    return calculatedStrength;
  },
};
