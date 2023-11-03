import React, { useMemo, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import ContextMenu, { Position } from 'devextreme-react/context-menu';
import List from 'devextreme-react/list';
import { useAuth } from '../../contexts/auth';
import './UserPanel.scss';


export default function UserPanel({ menuMode }) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const navigateToProfile = useCallback(() => {
    navigate("/profile");
  }, [navigate]);
  const menuItems = useMemo(() => ([
    {
      text: 'Profile',
      icon: 'user',
      onClick: navigateToProfile
    },
    {
      text: 'Logout',
      icon: 'runner',
      onClick: signOut
    }
  ]), [navigateToProfile, signOut]);
  return (
    <div>
    </div>
  );
}
