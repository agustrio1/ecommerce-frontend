const getUser = async (): Promise<any> => {
  const response = await fetch("http://localhost:3000/user", {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to get user");
  }
  return response.json();
};

const getUserById = async (userId: string): Promise<any> => {
  const response = await fetch(`http://localhost:3000/user/${userId}`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to get user");
  }
  return response.json();
};

const updateUser = async (userId: string, formData: FormData): Promise<void> => {
  const response = await fetch(`http://localhost:3000/user/${userId}`, {
    method: "PUT",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }
};

const deleteUser = async (userId: string): Promise<void> => {
  const response = await fetch(`http://localhost:3000/user/${userId}`, {
    method: "DELETE",
    credentials: "include",
  })
  if (!response.ok) {
    throw new Error("Failed to delete user");
    
  }
}

export { getUser, getUserById, updateUser, deleteUser };
