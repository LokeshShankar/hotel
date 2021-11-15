import React from 'react'
import StarRatings from 'react-star-ratings';

function GetStar(props) {
    return (
        <StarRatings
        rating={props.rating}
        starDimension="20px"
        starSpacing="5px"
        starRatedColor="rgb(253, 186, 0)"
      />
    )
}

export default GetStar
