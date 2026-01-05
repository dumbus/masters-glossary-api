import * as fs from 'fs';
import * as path from 'path';

export interface Term {
  id: number;
  term: string;
  description: string;
}

const loadInitialTerms = (): Term[] => {
  try {
    const dataPath = path.join(__dirname, '../data/terms.json');
    const data = fs.readFileSync(dataPath, 'utf-8');

    return JSON.parse(data) as Term[];
  } catch (error) {
    console.error('Error loading initial terms:', error);

    return [];
  }
};

export const terms: Term[] = loadInitialTerms();
