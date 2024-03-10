import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash} from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import { getUser, deleteUser } from "../../../../utils/userApi";
import Pagination from "../../../ui/Pagination";
import styles from "./UserTable.module.css";
import Button from "../../../ui/Button";
import UpdateAdminUser from "./UpdateAdminUser";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
}

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editModal, setEditModal] = useState(false);
  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  useEffect(() => {
    getUser()
      .then((data: { data: User[] }) => {
        setUsers(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const tableHeaders = [
    "No",
    "Name",
    "Email",
    "Phone",
    "Address",
    "Role",
    "Action",
  ];

  const handleEdit = (userId: string) => {
    setEditUserId(userId);
    setEditModal(true);
  };

  const closeEditModal = () => {
    setEditModal(false);
  };

  const handleDelete = (id: string) => {
    deleteUser(id)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
        alert("User deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        alert("Failed to delete user");
      });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>User</h2>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            {tableHeaders.map((header, index) => (
              <th key={index} className={styles.th}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {currentUsers.map((user, index) => (
            <tr key={index}>
              <td className={styles.td}>{index + 1}</td>
              <td className={styles.td}>{user.name}</td>
              <td className={styles.td}>{user.email}</td>
              <td className={styles.td}>{user.phone}</td>
              <td className={styles.td}>{user.address}</td>
              <td className={styles.td}>{user.role}</td>
              <td className={styles.td}>
                <Button
                  onClick={() => handleEdit(user.id)}
                  icon={<FiEdit />}
                  color="blue"
                />
                &nbsp;
                <Button
                  onClick={() => handleDelete(user.id)}
                  icon={<FiTrash />}
                  color="red"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
          <UpdateAdminUser userId={editUserId} />
          </div>
          <div className={styles.closeButton}>
            <Button
              onClick={closeEditModal}
              icon={<MdOutlineClose />}
              color="transparent"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
