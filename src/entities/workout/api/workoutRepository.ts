import { httpClient } from '../../../shared/api/httpClient';
import type {
  Equipment,
  Exercise,
  ExerciseCategory,
  ExercisesResponse,
  Muscle,
  PaginatedResponse,
} from '../model/types';

export interface WorkoutQueryParams {
  limit: number;
  offset: number;
  search?: string;
  category?: number;
  muscle?: number;
  equipment?: number;
}

export const workoutRepository = {
  async getExercises(params: WorkoutQueryParams): Promise<ExercisesResponse> {
    const response = await httpClient.get<ExercisesResponse>('exerciseinfo/', {
      params: {
        limit: params.limit,
        offset: params.offset,
        language__code: 'en',
        ...(params.search ? { name__search: params.search } : {}),
        ...(params.category ? { category: params.category } : {}),
        ...(params.muscle ? { muscles: params.muscle } : {}),
        ...(params.equipment ? { equipment: params.equipment } : {}),
      },
    });

    return response.data;
  },

  async getExerciseById(id: number): Promise<Exercise> {
    const response = await httpClient.get<Exercise>(`exerciseinfo/${id}/`);

    return response.data;
  },

  async getCategories(): Promise<ExerciseCategory[]> {
    const response = await httpClient.get<PaginatedResponse<ExerciseCategory>>(
      'exercisecategory/',
      { params: { limit: 100 } },
    );

    return response.data.results;
  },

  async getMuscles(): Promise<Muscle[]> {
    const response = await httpClient.get<PaginatedResponse<Muscle>>(
      'muscle/',
      { params: { limit: 100 } },
    );

    return response.data.results;
  },

  async getEquipment(): Promise<Equipment[]> {
    const response = await httpClient.get<PaginatedResponse<Equipment>>(
      'equipment/',
      { params: { limit: 100 } },
    );

    return response.data.results;
  },
};
