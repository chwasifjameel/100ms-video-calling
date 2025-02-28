import { useAVToggle, useHMSActions } from '@100mslive/react-sdk';
import {
  BsMicFill,
  BsMicMuteFill,
  BsCameraVideoFill,
  BsCameraVideoOffFill,
  BsDoorOpenFill,
} from 'react-icons/bs';

function Footer() {
  const { isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo } =
    useAVToggle();
  const hmsActions = useHMSActions();

  const leaveCall = () => {
    hmsActions.leave();
  };

  return (
    <div className="control-bar">
      <button className="btn-control" onClick={toggleAudio}>
        {isLocalAudioEnabled ? <BsMicFill /> : <BsMicMuteFill />}
        {isLocalAudioEnabled ? ' Mute' : ' Unmute'}
      </button>
      <button className="btn-control" onClick={toggleVideo}>
        {isLocalVideoEnabled ? <BsCameraVideoFill /> : <BsCameraVideoOffFill />}
        {isLocalVideoEnabled ? ' Hide' : ' Unhide'}
      </button>
      <button className="btn-danger" onClick={leaveCall}>
        <BsDoorOpenFill /> Leave Call
      </button>
    </div>
  );
}

export default Footer;
