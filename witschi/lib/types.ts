export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies?: string[];
  link?: string;
  github?: string;
  inProgress?: boolean;
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  email: string;
  location: string;
  hometown: string;
  avatar: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  active?: boolean;
}

export interface PersonalItem {
  label: string;
  appicon: string;
  link: string;
}
