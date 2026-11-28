import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from '../../widgets/app-layout/ui/AppLayout';
import DashboardPage from '../../pages/dashboard/ui/DashboardPage';
import WorkoutsPage from '../../pages/workouts/ui/WorkoutsPage';
import MyPlanPage from '../../pages/my-plan/ui/MyPlanPage';
import HistoryPage from '../../pages/history/ui/HistoryPage';
import WorkoutDetailsPage from '../../pages/workout-details/ui/WorkoutDetailsPage';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/workouts" element={<WorkoutsPage />} />
          <Route path="/my-plan" element={<MyPlanPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/workouts/:id" element={<WorkoutDetailsPage />} />
        </Route>

        <Route
          path="*"
          element={
            <main className="not-found">
              <h1>404</h1>
              <p>Page not found</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
