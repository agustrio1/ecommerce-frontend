import React, { useState } from "react";
import useAuthStore from "../../../store/authStore";
import { updateUser } from "../../../utils/userApi";
import EditUser from "./EditUser";
import User from "../../../types/User";

const UserProfile: React.FC = () => {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (updatedUserData: User) => {
    try {
      const formData = new FormData();
      formData.append("name", updatedUserData.name);
      formData.append("email", updatedUserData.email);
      formData.append("phone", updatedUserData.phone);
      formData.append("address", updatedUserData.address);
      formData.append("password", updatedUserData.password);

      await updateUser(user?.id || "", formData);
      setIsEditing(false);
      alert("User updated successfully");
    } catch (error) {
      console.error("Failed to update user:", error);
      alert("Failed to update user. Please try again later.");
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      {isEditing ? (
        <EditUser user={user} onSave={handleSave} />
      ) : (
        <div>
          {user && (
            <>
              <p>Nama: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>No Telp: {user.phone}</p>
              <p>Alamat: {user.address}</p>
              <button onClick={handleEdit}>Edit</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
