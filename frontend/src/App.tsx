import { lazy, Suspense, FunctionComponent } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import '@mantine/core/styles.css';
import { useAtom } from 'jotai';

import { userAtom } from '@atoms/userAtoms';
import { Loader } from '@components/loader/PageLoading';

const Login = lazy(() => import('@pages/Login'));
const Signup = lazy(() => import('@pages/Signup'));
const Chat = lazy(() => import('@pages/Chat'));

const App: FunctionComponent = () => {
  // const [user] = useAtom(userAtom);
  // const token = user.token;

  // const Protected = ({path, element}) => {
  //   if(token){
  //     return element;
  // }else{
  // return <Login />
  //   }
  // }

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path='chat' element={<Chat />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App;
