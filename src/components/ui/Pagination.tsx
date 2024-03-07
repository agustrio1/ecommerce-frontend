import React, { useState } from "react";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";
import Button from "./Button";
import styles from "./Pagination.module.css";

interface PaginationProps {
  productsPerPage: number;
  totalProducts: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  productsPerPage,
  totalProducts,
  paginate,
}) => {
  const totalPages: number = Math.ceil(totalProducts / productsPerPage);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    paginate(pageNumber);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      paginate(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      paginate(currentPage + 1);
    }
  };

  const renderPaginationButtons = (): JSX.Element[] => {
    const paginationButtons: JSX.Element[] = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationButtons.push(
        <Button
          key={String(i)}
          onClick={() => handleClick(i)}
          text={`${i}`}
          color={currentPage === i ? "blue" : "gray"}
        />
      );
    }
    return paginationButtons;
  };

  return (
    <div className={styles.pagination}>
      <Button onClick={handlePrevious} icon={<GrFormPreviousLink />} color="blue" />
      &nbsp;
      {renderPaginationButtons()}
      &nbsp;
      <Button onClick={handleNext} icon={<GrFormNextLink />} color="blue" />
    </div>
  );
};

export default Pagination;
