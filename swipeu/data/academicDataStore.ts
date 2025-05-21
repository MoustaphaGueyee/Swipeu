export interface AcademicAchievement {
  id: string;
  value: string;
}

export interface LeadershipRole {
  id: string;
  value: string;
}

export interface ActivityItem {
  id: string;
  value: string;
}

export interface AcademicData {
  gpa: string;
  satScore: string;
  actScore: string;
  academicAchievements: AcademicAchievement[];
  leadershipRoles: LeadershipRole[];
  clubs: ActivityItem[];
  athletics: ActivityItem[];
  interests: ActivityItem[];
}

let currentAcademicData: AcademicData = {
  gpa: '3.85',
  satScore: '1480',
  actScore: '',
  academicAchievements: [
    { id: '1', value: "Dean's List" },
    { id: '2', value: 'National Merit Scholar' },
  ],
  leadershipRoles: [
    { id: '1', value: 'Student Body President' },
    { id: '2', value: 'Debate Team Captain' },
  ],
  clubs: [
    { id: 'c1', value: 'Computer Science Club' },
    { id: 'c2', value: 'Entrepreneurship Club' },
    { id: 'c3', value: 'Math Club' },
  ],
  athletics: [
    { id: 'a1', value: 'Soccer team' },
    { id: 'a2', value: 'Tennis team' },
  ],
  interests: [
    { id: 'i1', value: 'CS' },
    { id: 'i2', value: 'Business' },
  ],
};

export const getAcademicData = (): AcademicData => {
  return { ...currentAcademicData }; // Return a copy to prevent direct mutation outside store
};

export const updateAcademicData = (newData: Partial<AcademicData>) => {
  currentAcademicData = { ...currentAcademicData, ...newData };
  console.log('Data store updated:', currentAcademicData);
}; 