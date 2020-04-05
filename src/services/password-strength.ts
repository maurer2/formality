import passwordStrengthCalculator from 'zxcvbn';

export default {
  getPasswordStrength(password: string) {
    const calculatedStrength = passwordStrengthCalculator(password);

    return calculatedStrength;
  },
};
