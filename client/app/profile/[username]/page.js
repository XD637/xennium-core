// /app/profile/[username]/page.js

"use client";

import React from 'react';
import ProfilePage from '../../components/ProfilePage';
import { useParams } from 'next/navigation';

const Profile = () => {
  const { username } = useParams(); // Use `useParams` to get the dynamic route parameter

  return (
    <div>
      {/* Render the ProfilePage component with the current username */}
      <ProfilePage username={username} />
    </div>
  );
};

export default Profile;
