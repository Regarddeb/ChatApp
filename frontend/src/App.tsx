import { lazy, Suspense, FunctionComponent } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import '@mantine/core/styles.css';

import { Loader } from '@components/loader/PageLoading';

const Login = lazy(() => import('@pages/Login'));
const Signup = lazy(() => import('@pages/Signup'));

const App: FunctionComponent = () => {
  return (
    <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path='signup' element={<Signup />} />
          </Routes>
        </Suspense>
    </Router>
  )
}

export default App;
