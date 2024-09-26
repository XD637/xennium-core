'use client';

import React, { forwardRef } from 'react';
import { useSession } from 'next-auth/react';

const SaveUser = forwardRef(({ account }, ref) => {
  const { data: session } = useSession();

  const handleSave = async () => {
    if (!session || !session.user || !account) {
      console.error('Missing session user or account');
      return;
    }

    try {
      const response = await fetch('/api/saveUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: session.user.username, address: account }),
      });

      if (!response.ok) {
        throw new Error('Failed to save user');
      }

      console.log('User saved successfully');
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  return (
    <button ref={ref} onClick={handleSave} style={{ display: 'none' }}>
      Save User
    </button>
  );
});

export default SaveUser;
