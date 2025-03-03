import {
  useVideo,
  useHMSStore,
  selectVideoTrackByPeerID,
  selectAudioTrackByPeerID,
} from '@100mslive/react-sdk';
import {
  FaUser,
  FaMicrophone,
  FaMicrophoneSlash,
  FaHandPaper,
} from 'react-icons/fa';

function Peer({ peer }) {
  // Get the video track directly from the store
  const videoTrack = useHMSStore(selectVideoTrackByPeerID(peer.id)) || {};

  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });

  // Get the audio track and check if it's muted
  const audioTrack = useHMSStore(selectAudioTrackByPeerID(peer.id));

  return (
    <div className="peer-container">
      {videoTrack.displayEnabled ? (
        <video
          ref={videoRef}
          className={`peer-video ${peer.isLocal ? 'local' : ''} ${
            peer.roleName.includes('room') ? 'sub-room-icon' : ''
          }`}
          autoPlay
          muted
          playsInline
        />
      ) : (
        <div
          className={`peer-video ${
            peer.isLocal ? 'local' : ''
          } placeholder-image`}
          style={{}}>
          <FaUser size={40} />
        </div>
      )}
      <div className="peer-name">
        {peer.name} {peer.isLocal ? '(You)' : ''} {peer.roleName}
        {/* Microphone status icon next to name */}
        {!audioTrack?.displayEnabled ? (
          <FaMicrophoneSlash
            className="status-icon muted"
            title="Muted"
            style={{ marginLeft: '5px' }}
          />
        ) : (
          <FaMicrophone
            className="status-icon"
            title="Unmuted"
            style={{ marginLeft: '5px' }}
          />
        )}
        {/* Hand raised indicator */}
        {peer.isHandRaised && (
          <FaHandPaper
            className="status-icon hand-raised"
            title="Hand Raised"
            style={{ marginLeft: '5px' }}
          />
        )}
      </div>
    </div>
  );
}

export default Peer;
