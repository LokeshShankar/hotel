import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "../../css/reviewDetails/Slideshow.css";

// const slideImages = [
//   "https://www.gannett-cdn.com/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg?width=660&height=373&fit=crop&format=pjpg&auto=webp",
//   "https://www.gannett-cdn.com/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg?width=660&height=373&fit=crop&format=pjpg&auto=webp",
//   "https://www.gannett-cdn.com/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg?width=660&height=373&fit=crop&format=pjpg&auto=webp",
// ];

function Slideshow(props) {
  const defaultImg="https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png";
  return (
    <div className="slide-container">
      <Slide>
        {props.images.length === 0 && 
          <div className="each-slide">
            <img src= {defaultImg} className="slide-img"></img>
          </div>
        }
        {props.images.map((image) => (
          <div className="each-slide" key={image}>
            <img src={image || defaultImg} className="slide-img"></img>
          </div>
        ))}
      </Slide>
    </div>
  );
}

export default Slideshow;
