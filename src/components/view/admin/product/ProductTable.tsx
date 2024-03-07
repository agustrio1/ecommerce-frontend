import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import { getProduct, deleteProduct } from "../../../../utils/api";
import { currentRupiah } from "../../../../utils/currentRupiah";
import Button from "../../../ui/Button";
import styles from "./ProductTable.module.css";
import UpdateProduct from "./UpdateProduct";
import UploadProduct from "./UploadProduct";
import Pagination from "../../../ui/Pagination";
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageURL: string;
  category: string;
  stock: number | null;
}

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editProductId, setEditProductId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  useEffect(() => {
    getProduct()
      .then((data: { data: Product[] }) => {
        setProducts(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const tableHeaders = [
    "No",
    "Name",
    "Price",
    "Description",
    "Image",
    "Category",
    "Stock",
    "Action",
  ];

  const closeModal = () => {
    setModal(false);
  };

  const handleEdit = (productId: string) => {
    setEditProductId(productId);
    setEditModal(true);
  };

  const handleDelete = (id: string) => {
    deleteProduct(id)
      .then(() => {
        setProducts(products.filter((product) => product.id !== id));
        alert("Product deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        alert("Failed to delete product");
      });
  };

  return (
    <div className={styles.productTable}>
      <h2 className={styles.title}>Product Table</h2>
      <Button onClick={() => setModal(true)} text="Add Product" color="blue" />
      {modal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <UploadProduct />
          </div>
          <div className={styles.closeButton}>
            <Button
              onClick={closeModal}
              icon={<MdOutlineClose />}
              color="transparent"
            />
          </div>
        </div>
      )}
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {tableHeaders.map((header, index) => (
              <th key={index} className={styles.th}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {currentProducts.map((product, index) => (
            <tr key={product.id}>
              <td className={styles.td}>{indexOfFirstProduct + index + 1}</td>
              <td className={styles.td}>{product.name}</td>
              <td className={styles.td}>{currentRupiah(product.price)}</td>
              <td className={`${styles.td} description`}>
                {product.description}
              </td>
              <td className={styles.td}>
                <img
                  src={product.imageURL}
                  alt={product.name}
                  className={styles.image__table}
                />
              </td>
              <td className={styles.td}>{product.category}</td>
              <td className={styles.td}>
                {product.stock !== null ? product.stock : "Out of stock"}
              </td>
              <td className={styles.td}>
                <Button
                  icon={<FiEdit />}
                  color="blue"
                  ariaLabel="Edit Product"
                  onClick={() => handleEdit(product.id)}
                />
                &nbsp;
                <Button
                  icon={<FiTrash />}
                  color="red"
                  ariaLabel="Delete Product"
                  onClick={() => handleDelete(product.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={products.length}
        paginate={paginate}
      />
      {editModal && editProductId && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <UpdateProduct productId={editProductId} />
          </div>
          <div className={styles.closeButton}>
            <Button
              onClick={() => setEditModal(false)}
              icon={<MdOutlineClose />}
              color="transparent"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
