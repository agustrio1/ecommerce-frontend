const uploadProduct = async (formData: FormData): Promise<void> => {
  const response = await fetch("http://localhost:3000/products", {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to upload product");
  }
};

const getProduct = async (): Promise<any> => {
  const response = await fetch("http://localhost:3000/products", {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to get product");
  }

  return response.json();
};

const getProductById = async (productId: string): Promise<any> => {
  const response = await fetch(`http://localhost:3000/products/${productId}`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to get product");
  }

  return response.json();
};

const updateProduct = async (
  productId: string,
  formData: FormData
): Promise<void> => {
  const response = await fetch(`http://localhost:3000/products/${productId}`, {
    method: "PUT",
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to update product");
  }
};

const deleteProduct = async (productId: string): Promise<void> => {
  const response = await fetch(`http://localhost:3000/products/${productId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to delete product");
  }
};

export {
  uploadProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
