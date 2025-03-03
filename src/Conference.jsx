import { selectPeers, useHMSStore } from '@100mslive/react-sdk';
import React from 'react';
import Peer from './Peer';

function Conference() {
  const peers = useHMSStore(selectPeers);
  return (
    <div className="conference-section">
      <h2>Mission Team Mobile Workshop</h2>

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
