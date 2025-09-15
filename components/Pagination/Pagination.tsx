import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";
interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}
export default function Pagination({
  totalPages,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={4}
      marginPagesDisplayed={2}
      onPageChange={(data) => setCurrentPage(data.selected + 1)}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}
