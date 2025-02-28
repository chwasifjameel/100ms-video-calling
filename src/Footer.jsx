import { useCallback } from 'react';
import {
  selectHasPeerHandRaised,
  selectLocalPeer,
  useAVToggle,
  useHMSActions,
  useHMSStore,
} from '@100mslive/react-sdk';
import {
  BsMicFill,
  BsMicMuteFill,
  BsCameraVideoFill,
  BsCameraVideoOffFill,
  BsDoorOpenFill,
} from 'react-icons/bs';
import { FaHandPaper } from 'react-icons/fa';

function Footer() {
  const { isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo } =
    useAVToggle();
  const localPeer = useHMSStore(selectLocalPeer);
  const hmsActions = useHMSActions();
  const isHandRaised = useHMSStore(selectHasPeerHandRaised(localPeer?.id));

  const leaveCall = () => {
    hmsActions.leave();
  };

  const toggleRaiseHand = useCallback(async () => {
    if (isHandRaised) {
      await hmsActions.lowerLocalPeerHand();
    } else {
      await hmsActions.raiseLocalPeerHand();
    }
  }, [hmsActions, isHandRaised]);

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
      <button className="btn-control" onClick={toggleRaiseHand}>
        <FaHandPaper /> {isHandRaised ? 'Lower Hand' : 'Raise Hand'}
      </button>
      <button className="btn-danger" onClick={leaveCall}>
        <BsDoorOpenFill /> Leave Call
      </button>
    </div>
  );
}

export default Footer;
