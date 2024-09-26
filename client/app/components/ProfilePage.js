'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import axios from 'axios';

const ProfilePage = ({ username }) => {
  const { data: session } = useSession();
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [dob, setDob] = useState('');
  const [links, setLinks] = useState(['']);
  const [errors, setErrors] = useState({
    name: '',
    bio: '',
    dob: '',
    links: []
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/api/profile?username=${username}`);
        setName(response.data.name);
        setBio(response.data.bio);
        setDob(response.data.dob);
        setLinks(response.data.links || ['']);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, [username]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const validateProfile = () => {
    let valid = true;
    let newErrors = {
      name: '',
      bio: '',
      dob: '',
      links: []
    };

    if (name.length > 30) {
      newErrors.name = 'Name must be 30 characters or less';
      valid = false;
    }
    
    if (bio.length > 150) {
      newErrors.bio = 'Bio must be 150 characters or less';
      valid = false;
    }

    if (!dob || new Date(dob) > new Date(new Date().setFullYear(new Date().getFullYear() - 18))) {
      newErrors.dob = 'You must be at least 18 years old';
      valid = false;
    }

    // Validate only non-empty links
    const linkErrors = links.map((link) => {
      if (link.trim() === '') return ''; // Skip empty links
      try {
        new URL(link);
        return '';
      } catch {
        return 'Invalid URL';
      }
    });
    if (linkErrors.some((error) => error !== '')) {
      newErrors.links = linkErrors;
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSave = async () => {
    if (validateProfile()) {
      try {
        await axios.post('/api/profile', {
          username,
          name,
          bio,
          dob,
          links,
        });
        alert('Profile updated successfully');
      } catch (error) {
        console.error('Failed to update profile:', error);
        alert('Failed to update profile');
      }
    }
  };

  const handleLinkChange = (index, value) => {
    const newLinks = [...links];
    newLinks[index] = value;
    setLinks(newLinks);
  };

  const handleAddLink = () => {
    setLinks([...links, '']);
  };

  const handleRemoveLink = (index) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  if (!session) {
    return <p>You need to be logged in to view this page.</p>;
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <div className="text-center">
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
          />
          <Image
            src={image || '/default-avatar.jpg'}
            alt="Profile Image"
            width={150}
            height={150}
            className="rounded-full mx-auto"
          />
        </div>
        <h1 className="text-3xl font-bold mt-4">@{username}</h1>
      </div>

      <div className="mt-6 space-y-4 flex flex-col items-center">
        <div className="w-full max-w-lg">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 text-center bg-white shadow-lg"
            disabled={session.user.username !== username}
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>
        <div className="w-full max-w-lg">
          <label className="block text-gray-700">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 text-center bg-white shadow-lg"
            disabled={session.user.username !== username}
          />
          {errors.bio && <p className="text-red-500 text-xs">{errors.bio}</p>}
        </div>
        <div className="w-full max-w-lg">
          <label className="block text-gray-700">Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 text-center bg-white shadow-lg"
            disabled={session.user.username !== username}
          />
          {errors.dob && <p className="text-red-500 text-xs">{errors.dob}</p>}
        </div>
        <div className="w-full max-w-lg">
          <label className="block text-gray-700">Links</label>
          {links.map((link, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="url"
                value={link}
                onChange={(e) => handleLinkChange(index, e.target.value)}
                className="w-full border border-gray-300 rounded p-2 text-center bg-white shadow-lg mr-2"
                disabled={session.user.username !== username}
              />
              {errors.links[index] && <p className="text-red-500 text-xs">{errors.links[index]}</p>}
              {session.user.username === username && (
                <button
                  onClick={() => handleRemoveLink(index)}
                  className="bg-red-500 text-white p-2 rounded text-xs shadow-lg"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          {session.user.username === username && (
            <button
              onClick={handleAddLink}
              className="bg-black text-white py-2 px-4 rounded text-xs shadow-lg"
            >
              Add Link
            </button>
          )}
        </div>

        {session.user.username === username && (
          <button
            onClick={handleSave}
            className="bg-black text-white py-3 px-6 rounded text-lg shadow-lg"
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
