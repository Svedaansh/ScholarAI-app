// User progress data management

export interface UserProgress {
  streak: number;
  points: number;
  questionsAttempted: number;
  accuracy: number;
  studyHours: number;
  testsCompleted: number;
  averageScore: number;
  totalStudyTime: string;
  badges: string[];
  lastActiveDate: string;
  createdAt: string;
}

const DEFAULT_PROGRESS: UserProgress = {
  streak: 0,
  points: 0,
  questionsAttempted: 0,
  accuracy: 0,
  studyHours: 0,
  testsCompleted: 0,
  averageScore: 0,
  totalStudyTime: "0h",
  badges: [],
  lastActiveDate: new Date().toISOString().split('T')[0],
  createdAt: new Date().toISOString().split('T')[0],
};

export const initializeUserProgress = (): UserProgress => {
  const existing = localStorage.getItem("userProgress");
  if (existing) {
    return JSON.parse(existing);
  }
  
  const newProgress = { ...DEFAULT_PROGRESS };
  localStorage.setItem("userProgress", JSON.stringify(newProgress));
  return newProgress;
};

export const getUserProgress = (): UserProgress => {
  const progress = localStorage.getItem("userProgress");
  if (!progress) {
    return initializeUserProgress();
  }
  return JSON.parse(progress);
};

export const updateUserProgress = (updates: Partial<UserProgress>): UserProgress => {
  const current = getUserProgress();
  const updated = { ...current, ...updates };
  localStorage.setItem("userProgress", JSON.stringify(updated));
  return updated;
};

export const updateStreak = (): UserProgress => {
  const progress = getUserProgress();
  const today = new Date().toISOString().split('T')[0];
  
  if (progress.lastActiveDate === today) {
    return progress; // Already updated today
  }
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  
  let newStreak = progress.streak;
  if (progress.lastActiveDate === yesterdayStr) {
    // Continuing streak
    newStreak = progress.streak + 1;
  } else {
    // Streak broken, restart
    newStreak = 1;
  }
  
  return updateUserProgress({
    streak: newStreak,
    lastActiveDate: today,
  });
};

export const addPoints = (points: number): UserProgress => {
  const progress = getUserProgress();
  return updateUserProgress({
    points: progress.points + points,
  });
};

export const addBadge = (badgeName: string): UserProgress => {
  const progress = getUserProgress();
  if (!progress.badges.includes(badgeName)) {
    return updateUserProgress({
      badges: [...progress.badges, badgeName],
    });
  }
  return progress;
};
