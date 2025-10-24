export interface GeneratedTest {
  id: string;
  title: string;
  subject: string;
  className: string;
  chapter: string;
  topics: string;
  maxMarks: number;
  sections: TestSection[];
  generatedAt: string;
  metadata?: any;
}

export interface TestSection {
  name: string;
  questions: TestQuestion[];
}

export interface TestQuestion {
  number: number;
  question: string;
  options?: string[];
  correctAnswer?: string;
  marks: number;
  diagram?: string;
}

const TESTS_STORAGE_KEY = 'generated_mock_tests';

export const saveGeneratedTest = (test: GeneratedTest): void => {
  const tests = getGeneratedTests();
  tests.push(test);
  localStorage.setItem(TESTS_STORAGE_KEY, JSON.stringify(tests));
};

export const getGeneratedTests = (): GeneratedTest[] => {
  const stored = localStorage.getItem(TESTS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const deleteGeneratedTest = (id: string): void => {
  const tests = getGeneratedTests().filter(test => test.id !== id);
  localStorage.setItem(TESTS_STORAGE_KEY, JSON.stringify(tests));
};
