// src/types.ts
export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  cover: string;
  publicationDate: string;
  isLocal?: boolean; // New field to identify locally added books
}
