// Pythagorean numerology calculations

const letterValues: { [key: string]: number } = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
};

const vowels = ['A', 'E', 'I', 'O', 'U'];

// Remove diacritics and convert to uppercase
const normalize = (text: string): string => {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/[^A-Z]/g, '');
};

// Reduce number to single digit, preserving master numbers 11, 22, 33
const reduceNumber = (num: number): string => {
  if (num === 11 || num === 22 || num === 33) return num.toString();
  
  while (num > 9) {
    num = num.toString().split('').reduce((acc, d) => acc + parseInt(d), 0);
    if (num === 11 || num === 22 || num === 33) return num.toString();
  }
  
  return num.toString();
};

// Calculate Life Path from date of birth
export const calculateLifePath = (dob: Date): string => {
  const day = dob.getDate();
  const month = dob.getMonth() + 1;
  const year = dob.getFullYear();
  
  let sum = 0;
  
  // Sum day digits
  let daySum = day;
  while (daySum > 9 && daySum !== 11 && daySum !== 22 && daySum !== 33) {
    daySum = daySum.toString().split('').reduce((acc, d) => acc + parseInt(d), 0);
  }
  sum += daySum;
  
  // Sum month digits
  let monthSum = month;
  while (monthSum > 9 && monthSum !== 11 && monthSum !== 22 && monthSum !== 33) {
    monthSum = monthSum.toString().split('').reduce((acc, d) => acc + parseInt(d), 0);
  }
  sum += monthSum;
  
  // Sum year digits
  let yearSum = year;
  while (yearSum > 9 && yearSum !== 11 && yearSum !== 22 && yearSum !== 33) {
    yearSum = yearSum.toString().split('').reduce((acc, d) => acc + parseInt(d), 0);
  }
  sum += yearSum;
  
  return reduceNumber(sum);
};

// Calculate Expression/Destiny from full name
export const calculateExpression = (fullName: string): string => {
  const normalized = normalize(fullName);
  const sum = normalized.split('').reduce((acc, letter) => {
    return acc + (letterValues[letter] || 0);
  }, 0);
  
  return reduceNumber(sum);
};

// Calculate Soul Urge from vowels in name
export const calculateSoulUrge = (fullName: string): string => {
  const normalized = normalize(fullName);
  const sum = normalized.split('').reduce((acc, letter) => {
    if (vowels.includes(letter)) {
      return acc + (letterValues[letter] || 0);
    }
    return acc;
  }, 0);
  
  return reduceNumber(sum);
};

// Calculate Personality from consonants in name
export const calculatePersonality = (fullName: string): string => {
  const normalized = normalize(fullName);
  const sum = normalized.split('').reduce((acc, letter) => {
    if (!vowels.includes(letter)) {
      return acc + (letterValues[letter] || 0);
    }
    return acc;
  }, 0);
  
  return reduceNumber(sum);
};

// Calculate Personal Year
export const calculatePersonalYear = (dob: Date): string => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const day = dob.getDate();
  const month = dob.getMonth() + 1;
  
  const sum = day + month + currentYear;
  return reduceNumber(sum);
};

export interface NumerologyResult {
  lifePath: string;
  expression: string;
  soulUrge: string;
  personality: string;
  personalYear: string;
  rawCalc: {
    lifePath: number[];
    expression: number[];
    soulUrge: number[];
    personality: number[];
    personalYear: number[];
  };
}

export const calculateNumerology = (fullName: string, dob: Date): NumerologyResult => {
  return {
    lifePath: calculateLifePath(dob),
    expression: calculateExpression(fullName),
    soulUrge: calculateSoulUrge(fullName),
    personality: calculatePersonality(fullName),
    personalYear: calculatePersonalYear(dob),
    rawCalc: {
      lifePath: [],
      expression: [],
      soulUrge: [],
      personality: [],
      personalYear: []
    }
  };
};
