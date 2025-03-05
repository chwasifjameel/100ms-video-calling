import {
  selectPeers,
  useHMSStore,
  selectIsSomeoneScreenSharing,
  selectPeerScreenSharing,
  selectPeersScreenSharing,
  selectIsLocalScreenShared,
  selectScreenShareByPeerID,
  useVideo,
} from '@100mslive/react-sdk';
import React from 'react';
import Peer from './Peer';

function Conference() {
  const peers = useHMSStore(selectPeers);
  const isScreenSharing = useHMSStore(selectIsSomeoneScreenSharing);
  // to get the HMSPeer object of the peer screensharing, will select  first if multiple screenshares
  const presenter = useHMSStore(selectPeerScreenSharing);
  console.log('presenter', presenter);

  // to get the HMSPeer object of all the peers screensharing
  const presenters = useHMSStore(selectPeersScreenSharing);

  // a boolean to know if the local peer is the one who is screensharing
  const amIScreenSharing = useHMSStore(selectIsLocalScreenShared);

  // to get the screenshare video track, this can be used to call attachVideo for rendering
  const screenshareVideoTrack = useHMSStore(
    selectScreenShareByPeerID(presenter?.id)
  );

  const { videoRef } = useVideo({
    trackId: screenshareVideoTrack?.id,
  });

  return (
    <div className="conference-section">
      <h2>Mission Team Mobile Workshop</h2>
      {isScreenSharing && (
        <div className="screen-share-container">
          <video ref={videoRef} autoPlay muted />
        </div>
      )}

      <div className="peers-container">
        {peers
          .sort((a, b) => a.roleName.localeCompare(b.roleName))
          .map((peer) => (
            <Peer key={peer.id} peer={peer} />
          ))}
      </div>
    </div>
  );
}

export default Conference;
