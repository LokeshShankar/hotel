import React from 'react'
import '../../css/reviewDetails/Pagination.css'

function Pagination(props) {

    const pageNumbers = [];

    // const boxClick = () => {
        
    // }

    for(let i=1;i<=Math.ceil(props.totalReviews / props.reviewsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="center">
            <div className ="pagination">
                {pageNumbers.map(number => (
                    <a key={number} onClick={() => props.paginate(number)} href="">{number}</a>
                ))}
            </div>
        </div>
        )
}

export default Pagination