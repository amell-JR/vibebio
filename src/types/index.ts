export interface Vibe {
  id: string;
  name: string;
  emoji: string;
  description: string;
}

export interface GeneratedBio {
  id: string;
  text: string;
  vibe: string;
}

export interface ApiResponse {
  success: boolean;
  bios?: string[];
  error?: string;
}