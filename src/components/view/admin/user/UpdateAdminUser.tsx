import React, { useEffect, useState } from "react";
import { getUserById, updateUser } from "../../../../utils/userApi";
import InputField from "../../../ui/InputField";
import styles from "./UpdateUser.module.css";
import Button from "../../../ui/Button";

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
}

interface UpdateAdminUserProps {
  userId: string | null;
}

const UpdateAdminUser: React.FC<UpdateAdminUserProps> = ({ userId }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    role: "",
  });

  const [isFormFilled, setIsFormFilled] = useState(false);

  useEffect(() => {
    if (userId) {
      getUserById(userId);
    }
  }, [userId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    checkFormFilled();
  };

  const checkFormFilled = () => {
    const isFilled = Object.values(formData).some((value) => !!value);
    setIsFormFilled(isFilled);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isFormFilled && userId) {
      const dataToSend = new FormData();
      dataToSend.append("name", formData.name);
      dataToSend.append("email", formData.email);
      dataToSend.append("phone", formData.phone);
      dataToSend.append("address", formData.address);
      dataToSend.append("role", formData.role);

      try {
        await updateUser(userId, dataToSend);
        alert("User updated successfully");
      } catch (error) {
        console.error("Error updating user:", error);
        alert("Failed to update user");
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Update User</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formRow}>
          <div className={styles.formColumn}>
            <InputField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <InputField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <InputField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formColumn}>
            <InputField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <InputField
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            />
          </div>
        </div>
        <Button
          type="submit"
          text="Update"
          color="blue"
          disabled={!isFormFilled}
        />
      </form>
    </div>
  );
};

export default UpdateAdminUser;
