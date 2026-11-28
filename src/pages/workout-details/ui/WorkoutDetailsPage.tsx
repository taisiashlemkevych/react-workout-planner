import { Link, useParams } from 'react-router-dom';
import { useWorkoutById } from '../../../entities/workout/model/queries';
import './WorkoutDetailsPage.scss';

const FALLBACK_WORKOUT_IMAGE =
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80';

function WorkoutDetailsPage() {
  const { id } = useParams();
  const workoutId = Number(id);
  const isValidId = Number.isInteger(workoutId) && workoutId > 0;

  const {
    data: workout,
    isLoading,
    isError,
    error,
    refetch,
  } = useWorkoutById(workoutId);

  if (!isValidId) {
    return (
      <section className="workout-details">
        <h1>Invalid workout ID</h1>
        <Link to="/workouts">Back to workouts</Link>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="workout-details">
        <p>Loading workout...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="workout-details">
        <h1>Something went wrong</h1>
        <p>{error.message}</p>
        <button onClick={() => refetch()}>Try again</button>
      </section>
    );
  }

  if (!workout) {
    return (
      <section className="workout-details">
        <h1>Workout not found</h1>
        <Link to="/workouts">Back to workouts</Link>
      </section>
    );
  }

  const translation =
    workout.translations.find((item) => item.language === 2) ??
    workout.translations[0];

  const exerciseImage = workout.images?.find(
    (item) => item.thumbnails?.medium || item.image,
  );

  const image =
    exerciseImage?.thumbnails?.medium ||
    exerciseImage?.image ||
    FALLBACK_WORKOUT_IMAGE;

  return (
    <section className="workout-details">
      <Link to="/workouts" className="workout-details__back">
        Back to workouts
      </Link>

      <div className="workout-details__content">
        <img
          className="workout-details__image"
          src={image}
          alt={translation?.name || 'Workout'}
        />

        <div className="workout-details__info">
          <h1>{translation?.name || `Exercise #${workout.id}`}</h1>

          <div
            className="workout-details__description"
            dangerouslySetInnerHTML={{
              __html: translation?.description || 'No description available.',
            }}
          />

          <h2>Primary muscles</h2>
          <p>
            {workout.muscles.map((muscle) => muscle.name).join(', ') ||
              'Not specified'}
          </p>

          <h2>Secondary muscles</h2>
          <p>
            {workout.muscles_secondary
              .map((muscle) => muscle.name)
              .join(', ') || 'Not specified'}
          </p>

          <h2>Equipment</h2>
          <p>
            {workout.equipment.map((item) => item.name).join(', ') ||
              'No equipment required'}
          </p>

          <h2>Category</h2>
          <p>{workout.category?.name || 'Not specified'}</p>
        </div>
      </div>
    </section>
  );
}

export default WorkoutDetailsPage;
