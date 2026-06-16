import { useState, useEffect, useRef } from 'react';
import { SECTION_ORDER, SECTION_IDS } from '../utils/helpers';

type SectionId = typeof SECTION_IDS[keyof typeof SECTION_IDS];

export function useCurrentSection(threshold = 0.4) {
  const [currentSection, setCurrentSection] = useState<SectionId>(SECTION_ORDER[0] as SectionId);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sections = SECTION_ORDER.map(id => document.getElementById(id)).filter(Boolean);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
            setCurrentSection(entry.target.id as SectionId);
          }
        });
      },
      {
        threshold: [threshold],
        rootMargin: '-100px 0px -100px 0px',
      }
    );

    sections.forEach((section) => {
      if (section) observerRef.current?.observe(section);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [threshold]);

  return currentSection;
}
