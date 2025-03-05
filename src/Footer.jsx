import { useCallback } from 'react';
import {
  selectHasPeerHandRaised,
  selectLocalPeer,
  useAVToggle,
  useHMSActions,
  useHMSStore,
  selectPeerScreenSharing,
} from '@100mslive/react-sdk';
import {
  BsMicFill,
  BsMicMuteFill,
  BsCameraVideoFill,
  BsCameraVideoOffFill,
  BsDoorOpenFill,
} from 'react-icons/bs';
import { LuScreenShare, LuScreenShareOff } from 'react-icons/lu';

import { FaHandPaper } from 'react-icons/fa';

function Footer() {
  const { isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo } =
    useAVToggle();
  const localPeer = useHMSStore(selectLocalPeer);
  const hmsActions = useHMSActions();
  const isHandRaised = useHMSStore(selectHasPeerHandRaised(localPeer?.id));
  const isScreenSharing = useHMSStore(selectPeerScreenSharing);

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

  const toggleScreenShare = useCallback(async () => {
    if (isScreenSharing) await hmsActions.stopScreenShare();
    else await hmsActions.startScreenShare();
  }, [hmsActions, isScreenSharing]);

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
      <button className="btn-control" onClick={toggleScreenShare}>
        {isScreenSharing ? <LuScreenShareOff /> : <LuScreenShare />}{' '}
        {isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
      </button>
      <button className="btn-danger" onClick={leaveCall}>
        <BsDoorOpenFill /> Leave Call
      </button>
    </div>
  );
}

export default Footer;
