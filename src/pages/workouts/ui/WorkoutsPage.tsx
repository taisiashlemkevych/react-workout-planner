import { useMemo, useState } from 'react';
import WorkoutCard from '../../../entities/workout/ui/WorkoutCard';
import {
  useExercises,
  useWorkoutCategories,
  useWorkoutEquipment,
  useWorkoutMuscles,
} from '../../../entities/workout/model/queries';
import './WorkoutsPage.scss';

const PAGE_SIZE = 12;

type SortOption = 'name-asc' | 'name-desc';

function WorkoutsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [muscle, setMuscle] = useState('');
  const [equipment, setEquipment] = useState('');
  const [sort, setSort] = useState<SortOption>('name-asc');

  const [page, setPage] = useState(1);

  const queryParams = {
    limit: PAGE_SIZE,
    offset: (page - 1) * PAGE_SIZE,
    search: search.trim() || undefined,
    category: category ? Number(category) : undefined,
    muscle: muscle ? Number(muscle) : undefined,
    equipment: equipment ? Number(equipment) : undefined,
  };

  const {
    data,
    isPending,
    isError,
    error,
    refetch,
    isFetching,
  } = useExercises(queryParams);

  const { data: categories = [] } = useWorkoutCategories();
  const { data: muscles = [] } = useWorkoutMuscles();
  const { data: equipmentOptions = [] } = useWorkoutEquipment();

  const sortedExercises = useMemo(() => {
    const exercises = [...(data?.results ?? [])];

    return exercises.sort((a, b) => {
      const nameA = a.translations[0]?.name ?? '';
      const nameB = b.translations[0]?.name ?? '';

      return sort === 'name-asc'
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
  }, [data?.results, sort]);

  const totalPages = data
    ? Math.ceil(data.count / PAGE_SIZE)
    : 0;

  function resetPage() {
    setPage(1);
  }

  function clearFilters() {
    setSearch('');
    setCategory('');
    setMuscle('');
    setEquipment('');
    setSort('name-asc');
    setPage(1);
  }

  return (
    <section className="workouts-page">
      <div className="workouts-page__heading">
        <div>
          <span className="workouts-page__eyebrow">TRAIN SMARTER</span>
          <h1 className="workouts-page__title">Explore Workouts</h1>
          <p className="workouts-page__subtitle">
            Discover exercises, explore muscle groups and find
            the right movements for your training goals.
          </p>
        </div>

        {data && (
          <span className="workouts-page__total">
            {data.count} exercises
          </span>
        )}
      </div>

      <div className="workouts-page__filters">
        <div className="workouts-page__search">
          <label htmlFor="workout-search">Search exercises</label>
          <input
            id="workout-search"
            type="search"
            placeholder="Search by exercise name..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              resetPage();
            }}
          />
        </div>

        <div className="workouts-page__filter">
          <label htmlFor="category-filter">Category</label>
          <select
            id="category-filter"
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
              resetPage();
            }}
          >
            <option value="">All categories</option>
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="workouts-page__filter">
          <label htmlFor="muscle-filter">Muscle group</label>
          <select
            id="muscle-filter"
            value={muscle}
            onChange={(event) => {
              setMuscle(event.target.value);
              resetPage();
            }}
          >
            <option value="">All muscles</option>
            {muscles.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name_en || item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="workouts-page__filter">
          <label htmlFor="equipment-filter">Equipment</label>
          <select
            id="equipment-filter"
            value={equipment}
            onChange={(event) => {
              setEquipment(event.target.value);
              resetPage();
            }}
          >
            <option value="">All equipment</option>
            {equipmentOptions.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="workouts-page__filter">
          <label htmlFor="sort-filter">Sort by</label>
          <select
            id="sort-filter"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortOption)}
          >
            <option value="name-asc">Name: A–Z</option>
            <option value="name-desc">Name: Z–A</option>
          </select>
        </div>

        <button
          className="workouts-page__clear"
          type="button"
          onClick={clearFilters}
        >
          Clear filters
        </button>
      </div>

      {isPending && (
        <div className="workouts-page__status">
          <span className="workouts-page__loader" />
          <p>Loading exercises...</p>
        </div>
      )}

      {isError && (
        <div className="workouts-page__status workouts-page__status--error">
          <h2>Unable to load exercises</h2>
          <p>
            {error instanceof Error
              ? error.message
              : 'Something went wrong. Please try again.'}
          </p>
          <button type="button" onClick={() => refetch()}>
            Try again
          </button>
        </div>
      )}

      {!isPending && !isError && sortedExercises.length === 0 && (
        <div className="workouts-page__status">
          <h2>No exercises found</h2>
          <p>Try changing your search or filter settings.</p>
          <button type="button" onClick={clearFilters}>
            Reset filters
          </button>
        </div>
      )}

      {!isPending && !isError && sortedExercises.length > 0 && (
        <>
          <div className="workouts-page__results">
            <div className="workouts-page__results-info">
              <h2>Exercise library</h2>
              <span>
                Page {page} of {totalPages}
              </span>
            </div>

            {isFetching && (
              <span className="workouts-page__updating">
                Updating...
              </span>
            )}
          </div>

          <div className="workouts-page__grid">
            {sortedExercises.map((exercise) => (
              <WorkoutCard key={exercise.id} exercise={exercise} />
            ))}
          </div>

          <div className="workouts-page__pagination">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage((current) => current - 1)}
            >
              Previous
            </button>

            <span>
              {page} / {totalPages}
            </span>

            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((current) => current + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default WorkoutsPage;
