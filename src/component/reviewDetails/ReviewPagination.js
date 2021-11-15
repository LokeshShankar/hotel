import React from "react";
import ReactPaginate from "react-paginate";
import "../../css/reviewDetails/ReviewPagination.css";

function ReviewPagination(props) {
  const pageNumbers = [];

  for (
    let i = 1;
    i <= Math.ceil(props.totalReviews / props.reviewsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div className="center">
      <div className="reviewPagination">
        {pageNumbers.map((number) => (
          <a
            key={number}
            className="reviewPagination-link"
            onClick={() => props.paginate(number)}
          >
            {number}
          </a>
        ))}
      </div>
    </div>
  );
}

export default ReviewPagination;
