import './App.css';
import JoinForm from './JoinForm';
// import Header from './Header';
import Footer from './Footer';
import Conference from './Conference';
import { useEffect } from 'react';
import Sidebar from './sidebar';
import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
} from '@100mslive/react-sdk';

export default function App() {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();

  useEffect(() => {
    window.onunload = () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };
  }, [hmsActions, isConnected]);

  return (
    <div className="App">
      {/* <Header /> */}
      {isConnected ? (
        <>
          <Conference />
          <Footer />
          <Sidebar />
        </>
      ) : (
        <JoinForm />
      )}
    </div>
  );
}
