import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Tools from '../pages/Tools';
import AIDesign from '../pages/AIDesign';
import Claw from '../pages/Claw';
import Calendar from '../pages/Calendar';
import Profile from '../pages/Profile';
import TaskList from '../pages/TaskList';
import Train from '../pages/Train';
import SpeechTrain from '../pages/SpeechTrain';
import Exam from '../pages/Exam';
import HouseNotify from '../pages/HouseNotify';
import TaskDistribute from '../pages/TaskDistribute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/tools" replace />,
  },
  {
    path: '/tools',
    element: (
      <Layout>
        <Tools />
      </Layout>
    ),
  },
  {
    path: '/ai-design',
    element: (
      <Layout>
        <AIDesign />
      </Layout>
    ),
  },
  {
    path: '/claw',
    element: (
      <Layout>
        <Claw />
      </Layout>
    ),
  },
  {
    path: '/calendar',
    element: (
      <Layout>
        <Calendar />
      </Layout>
    ),
  },
  {
    path: '/profile',
    element: (
      <Layout>
        <Profile />
      </Layout>
    ),
  },
  {
    path: '/task-list',
    element: <TaskList />,
  },
  {
    path: '/train',
    element: <Train />,
  },
  {
    path: '/speech-train',
    element: <SpeechTrain />,
  },
  {
    path: '/exam',
    element: <Exam />,
  },
  {
    path: '/house-notify',
    element: <HouseNotify />,
  },
  {
    path: '/task-distribute',
    element: <TaskDistribute />,
  },
]);

export default router;
