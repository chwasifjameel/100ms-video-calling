import {
  useVideo,
  useHMSStore,
  selectVideoTrackByPeerID,
} from '@100mslive/react-sdk';
import { FaUser } from 'react-icons/fa';

function Peer({ peer }) {
  // Get the video track directly from the store
  const videoTrack = useHMSStore(selectVideoTrackByPeerID(peer.id)) || {};

  console.log('videoTrack', videoTrack);

  const { videoRef } = useVideo({
    trackId: videoTrack?.id,
  });

  return (
    <div className="peer-container">
      {videoTrack.displayEnabled ? (
        <video
          ref={videoRef}
          className={`peer-video ${peer.isLocal ? 'local' : ''}`}
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
        {peer.name} {peer.isLocal ? '(You)' : ''}
      </div>
    </div>
  );
}

export default Peer;
