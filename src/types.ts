
  export interface Memo {
    id: number;
    text: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
    category?: string; // Add this line
    tags?: string[];// I added this line just in case
  }