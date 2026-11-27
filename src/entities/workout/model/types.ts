export interface ExerciseCategory {
  id: number;
  name: string;
}

export interface Muscle {
  id: number;
  name: string;
  name_en?: string;
  is_front?: boolean;
  image_url_main: string | null;
  image_url_secondary: string | null;
}

export interface Equipment {
  id: number;
  name: string;
}

export interface ExerciseThumbnails {
  small: string;
  medium: string;
}

export interface ExerciseImage {
  id: number;
  image: string;
  thumbnails: ExerciseThumbnails;
}

export interface ExerciseTranslation {
  id: number;
  name: string;
  description?: string;
  language: number;
}

export interface Exercise {
  id: number;
  uuid: string;
  category: ExerciseCategory;
  muscles: Muscle[];
  muscles_secondary: Muscle[];
  equipment: Equipment[];
  images: ExerciseImage[];
  translations: ExerciseTranslation[];
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export type ExercisesResponse = PaginatedResponse<Exercise>;
