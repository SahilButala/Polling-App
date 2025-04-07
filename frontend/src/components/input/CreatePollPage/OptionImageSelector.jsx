import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { FcAddImage } from "react-icons/fc";
import { FaImage } from "react-icons/fa6";

const OptionImageSelector = ({ setImageList, imageList }) => {
  const handleToAddImage = (e) => {
    const file = e.target.files[0];
    if (file && imageList.length < 4) {
      const reader = new FileReader();
      reader.onload = () => {
        // add objejct with base64 and file to the array
        setImageList([...imageList, { base64: reader.result, file }]);
      };
      reader.readAsDataURL(file);
      e.target.value = null;
    }
  };

 

  const handleToDeleteImage = (index) => {
    const updatedArray = imageList.filter((_, id) => id !== index);
    setImageList(updatedArray);
  };
  return (
    <div>
      {imageList.length < 1 ? (
        <p className="text-xs text-gray-400 font-medium my-2.5 text-center">
          Please Select the images To Create Poll..
        </p>
      ) : (
        ""
      )}
      {imageList?.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mb-4">
          {imageList.map((item, i) => (
            <div
              key={i}
              className="bg-gray-600/10 rounded relative mt-3 border flex  "
            >
              <img
                src={item.base64}
                className="w-full h-36 object-contain  rounded-md "
                alt=""
              />
              <button onClick={() => handleToDeleteImage(i)} className="">
                <FaRegTrashCan className="text-lg text-red-500 absolute top-2.5 right-2.5 cursor-pointer" />
              </button>
            </div>
          ))}
        </div>
      )}
      {imageList.length < 4 && (
        <div className="flex items-center gap-5 mt-2">
          <input
            type="file"
            accept="image/jpg,image/jpeg,image/png"
            className="hidden"
            onChange={handleToAddImage}
            id="input_image"
          />
          <label
            htmlFor="input_image"
            className="flex items-center text-sm gap-2 bg-blue-300 py-1 px-3 text-white cursor-pointer hover:bg-blue-400 transition-all "
          >
            <FaImage className="text-lg  font-bold " />
            Select Image
          </label>
        </div>
      )}
    </div>
  );
};

export default OptionImageSelector;
