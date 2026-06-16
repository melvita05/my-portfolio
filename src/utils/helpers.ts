export const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export const SECTION_IDS = {
  HERO: 'hero',
  SKILLS: 'skills',
  EXPERIENCE: 'experience',
  PROJECTS: 'projects',
  CONTACT: 'contact',
} as const;

export const SECTION_ORDER = [
  SECTION_IDS.HERO,
  SECTION_IDS.SKILLS,
  SECTION_IDS.EXPERIENCE,
  SECTION_IDS.PROJECTS,
  SECTION_IDS.CONTACT,
];
