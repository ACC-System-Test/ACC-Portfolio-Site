
import React from 'react';

export enum Page {
  HOME = 'home',
  ABOUT = 'about',
  SOLUTIONS = 'solutions',
  BLOG = 'blog',
  CONTACT = 'contact'
}

export interface NavItem {
  label: string;
  value: Page;
}

export interface CardProps {
  // Fix: Added React import to satisfy React.ReactNode usage
  icon?: React.ReactNode;
  title: string;
  description: string;
  image?: string;
  category?: string;
  author?: string;
}
