import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  selectPeers,
  useHMSStore,
  useHMSActions,
  selectLocalPeer,
} from '@100mslive/react-sdk';

const Sidebar = () => {
  const peers = useHMSStore(selectPeers);
  const currentUser = useHMSStore(selectLocalPeer);
  const hmsActions = useHMSActions();
  const [roles, setRoles] = useState([]);
  const handleRoleChange = async (peerId, newRole) => {
    try {
      // Using 100ms SDK to change role
      await hmsActions.changeRoleOfPeer(peerId, newRole, true);
    } catch (err) {
      console.error('Error changing role:', err);
    }
  };
  useEffect(() => {
    getAllRoles();
  }, []);

  const getAllRoles = () => {
    axios
      .get(
        'http://localhost:5123/v1/calling/templates/67bff6a98102660b706af214'
      )
      .then((res) => {
        console.log(res.data);
        const roles = Object.keys(res.data.roles).map((role) => ({
          label: role,
          value: res.data.roles[role].role_id,
        }));
        console.log(roles);
        setRoles(roles);
      });
  };

  return (
    <div className="sidebar">
      <h2>Participants</h2>
      <ul className="peer-list">
        {peers.map((peer) => (
          <li key={peer.id} className="peer-item">
            <div className="peer-info">
              <span className="peer-name">{peer.name}</span>
              <span className="peer-role">Current role: {peer.roleName}</span>
            </div>
            <div className="role-selector">
              <select
                disabled={currentUser.roleName !== 'moderator'}
                value={peer.roleName}
                onChange={(e) => handleRoleChange(peer.id, e.target.value)}>
                {roles.map((role) => (
                  <option value={role.label}>{role.label}</option>
                ))}
              </select>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
