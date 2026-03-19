
export type themeMode = "light" | "dark";

export interface Theme {
  theme: themeMode;
}

export type Action = { type: "ToggleTheme" };

export interface ThemeContextType {
  theme: Theme;
  dispatch: React.Dispatch<Action>;
  ToggleTheme: () => void;
}

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  position: string;
  salary: string;
  schedule: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  apply_url: string;
}

export interface Application {
  id: string;
  jobId: number;
  jobTitle: string;
  company: string;
  name: string;
  email: string;
  resume: string;
  appliedAt: string;
}
