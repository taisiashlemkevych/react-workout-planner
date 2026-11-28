import { useQuery } from '@tanstack/react-query';
import {
  workoutRepository,
  type WorkoutQueryParams,
} from '../api/workoutRepository';

export function useExercises(params: WorkoutQueryParams) {
  return useQuery({
    queryKey: ['workouts', params],
    queryFn: () => workoutRepository.getExercises(params),
  });
}

export function useWorkoutCategories() {
  return useQuery({
    queryKey: ['workout-categories'],
    queryFn: () => workoutRepository.getCategories(),
    staleTime: 10 * 60 * 1000,
  });
}

export function useWorkoutMuscles() {
  return useQuery({
    queryKey: ['workout-muscles'],
    queryFn: () => workoutRepository.getMuscles(),
    staleTime: 10 * 60 * 1000,
  });
}

export function useWorkoutEquipment() {
  return useQuery({
    queryKey: ['workout-equipment'],
    queryFn: () => workoutRepository.getEquipment(),
    staleTime: 10 * 60 * 1000,
  });
}

export function useWorkoutById(id: number) {
  return useQuery({
    queryKey: ['workout', id],
    queryFn: () => workoutRepository.getExerciseById(id),
    enabled: Number.isInteger(id) && id > 0,
  });
}
