export enum StudentType {
  SCHOOL = 'School Student',
  COLLEGE = 'College Student'
}

export interface UserProfile {
  name: string;
  type: StudentType | null;
  gradeOrYear: string;
  interests: string;
  goal: string;
}

export interface ResourceLink {
  title: string;
  url: string;
}

export interface RoadmapStep {
  stepName: string;
  description: string;
  resources: ResourceLink[];
}

export interface ScheduleItem {
  day: string;
  focus: string;
  activities: string[];
}

export interface AIResponseData {
  motivationalQuote: string;
  roadmap: RoadmapStep[];
  weeklySchedule: ScheduleItem[];
  careerSummary: string;
}

export interface AIResponse {
  data: AIResponseData | null;
  loading: boolean;
  error: string | null;
}