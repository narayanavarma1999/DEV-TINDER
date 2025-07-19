import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { editProfile, fetchUser, uploadImage } from '../../utils/services/api.service';
import { useSelector } from 'react-redux';
import ShimmerLoading from '../../utils/spinner/ShimmerLoadings';
import { FiUpload, FiX, FiPlus, FiEdit2, FiSave, FiTrash2 } from 'react-icons/fi';
import Location from './Locations';

const Profile = () => {

  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const fileInputRef = useRef(null);
  const profilePhotoInputRef = useRef(null);
  const navigate = useNavigate();

  const userData = useSelector((store) => store.user);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const response = await fetchUser();
        setUser(response.data);
        setEditedUser(response.data);
      } catch (error) {
        toast.error('Failed to fetch profile');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!userData) {
      fetchProfile();
    } else {
      setUser(userData);
      setEditedUser(userData);
    }
  }, []);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayEdit = (field, value, index) => {
    const newArray = [...(editedUser[field] || [])];
    newArray[index] = value;
    setEditedUser(prev => ({
      ...prev,
      [field]: newArray
    }));
  };

  const addArrayItem = (field) => {
    setEditedUser(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), '']
    }));
  };

  const removeArrayItem = (field, index) => {
    const newArray = [...(editedUser[field] || [])];
    newArray.splice(index, 1);
    setEditedUser(prev => ({
      ...prev,
      [field]: newArray
    }));
  };

  const handleSave = async () => {
    try {
      const response = await editProfile(editedUser);
      setUser(response.data);
      setIsEditing(false);
      toast.success(response.data.message || 'Profile updated successfully!');
      navigate('/profile');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
      console.error(error);
    }
  };

  const handleImageUpload = async (e, index = null) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await uploadImage(formData);
      const imageUrl = response.data.url;

      if (index !== null) {
        handleArrayEdit('images', imageUrl, index);
      } else {
        addArrayItem('images');
        const newIndex = editedUser.images ? editedUser.images.length : 0;
        handleArrayEdit('images', imageUrl, newIndex);
      }

      toast.success('Image uploaded successfully!');
    } catch (error) {
      toast.error('Failed to upload image');
      console.error(error);
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const triggerFileInput = (index = null) => {
    setActiveImageIndex(index);
    fileInputRef.current.click();
  };

  const triggerProfilePhotoInput = () => {
    profilePhotoInputRef.current.click();
  };

  const handleProfilePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await uploadImage(formData);
      const imageUrl = response.data.url;

      setEditedUser(prev => ({
        ...prev,
        photoUrl: imageUrl
      }));

      toast.success('Profile photo updated successfully!');
    } catch (error) {
      toast.error('Failed to upload profile photo');
      console.error(error);
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleLocationSelect = (location) => {
    if (typeof location === 'string') {
      setEditedUser(prev => ({
        ...prev,
        location: location
      }));
    } else {
      console.error('Invalid location data:', location);
    }
  };

  if (isLoading) {
    return <ShimmerLoading />;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-base-100 rounded-3xl shadow-2xl overflow-hidden">
          <div className="relative h-48 bg-gradient-to-r from-primary to-secondary">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-center p-6">
                <h1 className="text-3xl font-bold mb-2">Profile Not Found</h1>
                <p className="opacity-90">We couldn't load your profile data</p>
              </div>
            </div>
          </div>
          <div className="p-8 text-center">
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          if (activeImageIndex !== null) {
            handleImageUpload(e, activeImageIndex);
          } else {
            handleImageUpload(e);
          }
        }}
        accept="image/*"
        className="hidden"
      />

      <input
        type="file"
        ref={profilePhotoInputRef}
        onChange={handleProfilePhotoUpload}
        accept="image/*"
        className="hidden"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Profile Header */}
        <div className="bg-base-100/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden mb-8 relative border border-white/10">
          {/* Gradient header */}
          <div className="relative h-48 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
            {/* Profile photo */}
            <div className="absolute -bottom-16 left-8 group">
              <div className="avatar">
                <div className="w-32 h-32 rounded-full ring-4 ring-base-100 relative">
                  <img
                    src={editedUser.photoUrl || '/default-avatar.png'}
                    alt={`${user.fullName}'s profile`}
                    className="object-cover w-full h-full"
                  />
                  {isEditing && (
                    <>
                      <button
                        onClick={triggerProfilePhotoInput}
                        className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <FiUpload className="text-white text-2xl" />
                      </button>
                      {isUploading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                          <span className="loading loading-spinner text-primary"></span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Edit/Save buttons */}
            <div className="absolute bottom-4 right-8">
              {isEditing ? (
                <div className="flex space-x-4">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="btn btn-outline btn-error text-gray-600 bg-white hover:bg-white/90"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="btn btn-primary"
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      <>
                        <FiSave className="mr-1" />
                        Save
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-primary hover:bg-primary/90"
                >
                  <FiEdit2 className="mr-1" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Profile info */}
          <div className="pt-20 px-8 pb-8">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-primary font-semibold">Full Name</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={editedUser.fullName || ''}
                        onChange={handleEditChange}
                        className="input input-bordered w-full"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-primary font-semibold">First Name</span>
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={editedUser.firstName || ''}
                          onChange={handleEditChange}
                          className="input input-bordered"
                          placeholder="First name"
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-primary font-semibold">Last Name</span>
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={editedUser.lastName || ''}
                          onChange={handleEditChange}
                          className="input input-bordered"
                          placeholder="Last name"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h1 className="text-4xl font-bold text-base-content">{user.fullName}</h1>
                    <p className="text-xl text-base-content/70 mt-2">
                      {user.firstName} {user.lastName}
                    </p>
                    {user.location && (
                      <div className="mt-2 flex items-center text-base-content/70">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span>{user.location}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Location Component */}
             { isEditing && <div className="w-full lg:w-auto">
                <Location
                  onLocationSelect={handleLocationSelect}
                  placeholder="Enter your city, address, or ZIP code"
                  initialValue={editedUser.location || ''}
                />
              </div>}

              {/* Stats */}
              <div className="flex justify-between stats shadow bg-base-200/50">
                <div className="stat">
                  <div className="stat-title text-primary font-semibold">Age</div>
                  {isEditing ? (
                    <input
                      type="number"
                      name="age"
                      value={editedUser.age || ''}
                      onChange={handleEditChange}
                      className="stat-value input input-sm input-bordered w-20 text-sm"
                      min="18"
                      max="100"
                    />
                  ) : (
                    <div className="stat-value text-sm">{user.age || 'N/A'}</div>
                  )}
                </div>
                <div className="stat">
                  <div className="stat-title text-primary font-semibold">Gender</div>
                  {isEditing ? (
                    <select
                      name="gender"
                      value={editedUser.gender || ''}
                      onChange={handleEditChange}
                      className="h-10 stat-value select select-sm select-bordered text-sm"
                    >
                      <option value="">select</option>
                      <option value="male">male</option>
                      <option value="female">female</option>
                      <option value="other">other</option>
                    </select>
                  ) : (
                    <div className="stat-value capitalize text-sm">{user.gender || 'N/A'}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="card bg-base-100/90 backdrop-blur-sm shadow-xl border border-white/10">
              <div className="card-body">
                <h2 className="card-title">About</h2>
                {isEditing ? (
                  <textarea
                    name="about"
                    value={editedUser.about || ''}
                    onChange={handleEditChange}
                    className="textarea textarea-bordered h-32"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="text-base-content/80">
                    {user.about || 'No about information provided yet.'}
                  </p>
                )}
              </div>
            </div>

            {/* Skills Section */}
            <div className="card bg-base-100/90 backdrop-blur-sm shadow-xl border border-white/10">
              <div className="card-body">
                <div className="flex justify-between items-center">
                  <h2 className="card-title">Skills</h2>
                  {isEditing && (
                    <button
                      onClick={() => addArrayItem('skills')}
                      className="btn btn-sm btn-circle btn-primary"
                    >
                      <FiPlus />
                    </button>
                  )}
                </div>
                {isEditing ? (
                  <div className="space-y-2">
                    {editedUser.skills?.map((skill, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={skill}
                          onChange={(e) => handleArrayEdit('skills', e.target.value, index)}
                          className="input input-bordered flex-1"
                          placeholder="Skill name"
                        />
                        <button
                          onClick={() => removeArrayItem('skills', index)}
                          className="btn btn-sm btn-circle btn-error"
                        >
                          <FiX />
                        </button>
                      </div>
                    ))}
                    {(!editedUser.skills || editedUser.skills.length === 0) && (
                      <div className="flex items-center justify-between">
                        <p className="text-base-content/50">No skills added yet.</p>
                        <button
                          onClick={() => addArrayItem('skills')}
                          className="btn btn-sm btn-primary"
                        >
                          <FiPlus className="mr-1" /> Add Skill
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {user.skills?.length > 0 ? (
                      user.skills.map((skill, index) => (
                        <span key={index} className="badge badge-primary badge-lg">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <div className="w-full text-center py-4">
                        <p className="text-base-content/50 mb-2">No skills added yet</p>
                        <button
                          onClick={() => setIsEditing(true)}
                          className="btn btn-sm btn-primary"
                        >
                          <FiPlus className="mr-1" /> Add Skills
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Interests Section */}
            <div className="card bg-base-100/90 backdrop-blur-sm shadow-xl border border-white/10">
              <div className="card-body">
                <div className="flex justify-between items-center">
                  <h2 className="card-title">Interests</h2>
                  {isEditing && (
                    <button
                      onClick={() => addArrayItem('interests')}
                      className="btn btn-sm btn-circle btn-primary"
                    >
                      <FiPlus />
                    </button>
                  )}
                </div>
                {isEditing ? (
                  <div className="space-y-2">
                    {editedUser.interests?.map((interest, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={interest}
                          onChange={(e) => handleArrayEdit('interests', e.target.value, index)}
                          className="input input-bordered flex-1"
                          placeholder="Interest"
                        />
                        <button
                          onClick={() => removeArrayItem('interests', index)}
                          className="btn btn-sm btn-circle btn-error"
                        >
                          <FiX />
                        </button>
                      </div>
                    ))}
                    {(!editedUser.interests || editedUser.interests.length === 0) && (
                      <div className="flex items-center justify-between">
                        <p className="text-base-content/50">No interests added yet.</p>
                        <button
                          onClick={() => addArrayItem('interests')}
                          className="btn btn-sm btn-primary"
                        >
                          <FiPlus className="mr-1" /> Add Interest
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {user.interests?.length > 0 ? (
                      user.interests.map((interest, index) => (
                        <span key={index} className="badge badge-secondary badge-lg">
                          {interest}
                        </span>
                      ))
                    ) : (
                      <div className="w-full text-center py-4">
                        <p className="text-base-content/50 mb-2">No interests added yet</p>
                        <button
                          onClick={() => setIsEditing(true)}
                          className="btn btn-sm btn-secondary"
                        >
                          <FiPlus className="mr-1" /> Add Interests
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Gallery Section */}
            <div className="card bg-base-100/90 backdrop-blur-sm shadow-xl border border-white/10">
              <div className="card-body">
                <div className="flex justify-between items-center">
                  <h2 className="card-title">Gallery</h2>
                  {isEditing && (
                    <button
                      onClick={() => triggerFileInput()}
                      className="btn btn-sm btn-circle btn-primary"
                      disabled={isUploading}
                    >
                      {isUploading ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        <FiPlus />
                      )}
                    </button>
                  )}
                </div>
                {isEditing ? (
                  <div className="space-y-4">
                    {editedUser.images?.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square overflow-hidden rounded-lg bg-base-200">
                          {image ? (
                            <img
                              src={image}
                              alt={`Gallery item ${index + 1}`}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-base-content/50">No image</span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <button
                              onClick={() => triggerFileInput(index)}
                              className="btn btn-sm btn-accent mr-2"
                            >
                              <FiUpload className="mr-1" /> Replace
                            </button>
                            <button
                              onClick={() => removeArrayItem('images', index)}
                              className="btn btn-sm btn-error"
                            >
                              <FiTrash2 className="mr-1" /> Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {(!editedUser.images || editedUser.images.length === 0) && (
                      <div
                        className="aspect-square rounded-lg border-2 border-dashed border-base-300 flex flex-col items-center justify-center cursor-pointer hover:bg-base-200 transition-colors"
                        onClick={() => triggerFileInput()}
                      >
                        <FiUpload className="text-3xl text-base-content/50 mb-2" />
                        <p className="text-base-content/50">Click to upload images</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {user.images?.length > 0 ? (
                      user.images.map((image, index) => (
                        <div key={index} className="aspect-square overflow-hidden rounded-lg relative group">
                          <img
                            src={image}
                            alt={`Gallery item ${index + 1}`}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 aspect-video rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 flex flex-col items-center justify-center">
                        <FiPlus className="text-4xl text-base-content/30 mb-2" />
                        <p className="text-base-content/50">No images added yet</p>
                        <button
                          onClick={() => setIsEditing(true)}
                          className="btn btn-sm btn-primary mt-4"
                        >
                          <FiPlus className="mr-1" /> Add Images
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Contact Info Section */}
            <div className="card bg-base-100/90 backdrop-blur-sm shadow-xl border border-white/10">
              <div className="card-body">
                <h2 className="card-title">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-base-content/50">Email</div>
                    {isEditing ? (
                      <input
                        type="email"
                        name="emailId"
                        value={editedUser.emailId || ''}
                        onChange={handleEditChange}
                        className="input input-bordered w-full"
                      />
                    ) : (
                      <div className="text-base-content">{user.emailId}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile