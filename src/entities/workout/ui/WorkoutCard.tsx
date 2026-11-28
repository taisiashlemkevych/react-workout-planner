import type { Exercise, ExerciseTranslation } from '../model/types';
import './WorkoutCard.scss';

const FALLBACK_WORKOUT_IMAGE =
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80';

function getExerciseTranslation(
  exercise: Exercise,
): ExerciseTranslation | undefined {
  return (
    exercise.translations.find(
      (translation) => translation.language === 2,
    ) ?? exercise.translations[0]
  );
}

function getExerciseName(exercise: Exercise): string {
  const translation = getExerciseTranslation(exercise);

  return translation?.name || `Exercise #${exercise.id}`;
}

function cleanDescription(description?: string): string {
  if (!description) {
    return 'No description available for this exercise.';
  }

  return description.replace(/<[^>]*>/g, '').trim();
}

interface WorkoutCardProps {
  exercise: Exercise;
}

function WorkoutCard({ exercise }: WorkoutCardProps) {
  const translation = getExerciseTranslation(exercise);

  const image =
    exercise.images[0]?.thumbnails?.medium ||
    exercise.images[0]?.image ||
    FALLBACK_WORKOUT_IMAGE;

  const name = getExerciseName(exercise);
  const description = cleanDescription(translation?.description);

  return (
    <article className="workout-card">
      <div className="workout-card__image-wrapper">
        <img
          className="workout-card__image"
          src={image}
          alt={name}
          loading="lazy"
        />
      </div>

      <div className="workout-card__content">
        <h3 className="workout-card__title">{name}</h3>

        <p className="workout-card__description">
          {description}
        </p>

        <div className="workout-card__details">
          <div className="workout-card__detail">
            <span className="workout-card__label">Muscles</span>
            <span className="workout-card__value">
              {exercise.muscles.length > 0
                ? exercise.muscles.map((muscle) => muscle.name).join(', ')
                : 'Not specified'}
            </span>
          </div>

          <div className="workout-card__detail">
            <span className="workout-card__label">Equipment</span>
            <span className="workout-card__value">
              {exercise.equipment.length > 0
                ? exercise.equipment.map((item) => item.name).join(', ')
                : 'No equipment'}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default WorkoutCard;