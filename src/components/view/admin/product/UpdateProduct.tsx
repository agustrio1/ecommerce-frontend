import React, { useEffect, useState } from "react";
import { updateProduct } from "../../../../utils/api";
import InputField from "../../../ui/InputField";
import styles from  './UpdateProduct.module.css';
const UpdateProduct: React.FC<{ productId: string }> = ({ productId }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: undefined as File | undefined,
    category: "",
    stock: "",
  });
  const [isFormFilled, setIsFormFilled] = useState(false);

  useEffect(() => {}, [productId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    checkFormFilled();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const checkFormFilled = () => {
    const isFilled = Object.values(formData).some((value) => !!value);
    setIsFormFilled(isFilled);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isFormFilled) {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("description", formData.description);
      if (formData.image) {
        data.append("image", formData.image);
      }
      data.append("category", formData.category);
      data.append("stock", formData.stock);

      try {
        await updateProduct(productId, data);
        alert("Product updated successfully");
      } catch (error) {
        console.error("Error updating product:", error);
        alert("Failed to update product");
      }
    } else {
      alert("Please fill in at least one field.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Update Product</h2>
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
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
            />
            <InputField
              label="Description"
              name="description"
              type="textarea"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formColumn}>
            <InputField
              label="Image"
              name="image"
              type="file"
              onChange={handleImageChange}
              required={false}
            />
            <InputField
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
            <InputField
              label="Stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
            />
            <button type="submit" className={styles.button}>
              Update Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
