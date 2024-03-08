import React from "react";
import { uploadProduct } from "../../../../utils/api";
import useAuthStore from "../../../../store/authStore";
import useProductStore from "../../../../store/productStore";
import InputField from "../../../ui/InputField";
import InputFile from "../../../ui/InputFile";
import styles from './UploadProduct.module.css'

const UploadProduct: React.FC = () => {
  const { token } = useAuthStore();
  const { formData, setFormData } = useProductStore();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      if (!token) {
        throw new Error("User not authenticated");
      }

      await uploadProduct(data);
      alert("Product uploaded successfully");
    } catch (error) {
      console.error("Error uploading product:", error);
      alert("Failed to upload product");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Upload Product</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formRow}>
          <div className={styles.formColumn}>
            <InputField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <InputField
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
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
            <InputFile
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
              required
            />
            <InputField
              label="Stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit" className={styles.button}>
          Upload Product
        </button>
      </form>
    </div>
  );
};

export default UploadProduct;
