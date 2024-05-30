import { lazy, Suspense, FunctionComponent } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css'
import '@mantine/core/styles.css';
import { Loader } from '@sharedComponents/loader/PageLoading';
import { AuthRoute } from '@utilities/AuthRoute';
import { GuestRoute } from '@utilities/GuestRoute';

const Login = lazy(() => import('@pages/Login'));
const Signup = lazy(() => import('@pages/Signup'));
const Chat = lazy(() => import('@pages/Chat'));

const App: FunctionComponent = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<GuestRoute element={<Login />} />} />
          <Route path='signup' element={<GuestRoute element={<Signup />} />} />
          <Route path='chat' element={<AuthRoute element={<Chat />} />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App;
