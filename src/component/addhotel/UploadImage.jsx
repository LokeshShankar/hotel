import React, { useState } from "react";
import MultiImageInput from "react-multiple-image-input";
import Button from "../utility/Button";
import { HOTEL_SERVICE_BASE_URL } from "../utility/Constant";
import axios from "axios";

class UploadImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      crop: {
        unit: "%",
        aspect: 4 / 3,
        width: "100",
      },

      images: props.hotelImages,
    };
  }

  generateRandomString = function (length = 10) {
    return Math.random().toString(36).substr(2, length);
  };

  uploadImagesToS3 = async (files) => {
    let urls = [];
    await Promise.all(
      files.map((file) => {
        let getPresignedPutURL =
          HOTEL_SERVICE_BASE_URL + "/putimage/hotel-images/" + file.name;
        axios
          .get(getPresignedPutURL)
          .then((response) => {
            axios
              .put(response.data, file)
              .then((response) => {
                //                console.log(response);
                urls.push(
                  "https://bookhotel.s3.amazonaws.com/hotel-images/" + file.name
                );
              })
              .catch((error) => {
                //                console.log(error);
              });
          })
          .catch((error) => {
            //            console.log(error);
          });
      })
    );
    return urls;
  };

  upload = async (event) => {
    event.preventDefault();
    let files = [];
    let urls = [];

    if (this.state.images) {
      for (const i in this.state.images) {
        if (this.state.images[i][0] == "d") {
          let fileName = this.generateRandomString() + ".jpg";
          //          console.log(this.state.images[i]);
          let file = this.dataURLtoFile(this.state.images[i], fileName);
          files.push(file);
        }
      }
      urls = await this.uploadImagesToS3(files);
      // console.log(urls);
      // console.log(this.state.images);
    }
    this.props.hotelImagesCallback(urls);
  };

  dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  setImages = (image) => {
    this.setState({ images: image });
    // console.log(this.state.images);
  };
  render = () => {
    return (
      <div>
        <label>Add Images</label>
        <MultiImageInput
          theme="light"
          images={this.state.images}
          setImages={this.setImages}
          allowCrop={false}
          max={20}
        />
        <Button
          cssClassName="btn--publicis-secondary-outline"
          label="Upload"
          handleClick={this.upload}
        ></Button>
      </div>
    );
  };
}

export default UploadImage;
