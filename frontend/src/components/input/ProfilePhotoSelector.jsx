import React, { useRef, useState } from "react";
import { LuUser } from "react-icons/lu";
import { LiaCloudUploadAltSolid } from "react-icons/lia";
import { FiTrash } from "react-icons/fi";
const ProfilePhotoSelector = ({ profilePic, setProfilePic }) => {
  const inputRef = useRef(null);
  const [previewImage, setpreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
    }

    const preview = URL.createObjectURL(file);
    setpreviewImage(preview);
  };

  const handleRemoveImage = () => {
    setProfilePic(null)
    setpreviewImage(null)
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };
  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!profilePic ? <div className="flex justify-center gap-2.5 w-20 h-20 bg-blue-300 items-center rounded-full relative z-10">
        <LuUser className="text-3xl text-white z-10" />
        <button
          className="h-7 w-8 text-white absolute bottom-0 z-0 right-0 bg-blue-400 flex justify-center items-center text-xl rounded-full cursor-pointer"
          type="button"
          onClick={onChooseFile}
        >
          <LiaCloudUploadAltSolid />
        </button>
      </div> : 

      <div className="relative">
        <img
          src={previewImage}
          className="w-20 h-20 rounded-full object-cover"
          alt="profile photo"
        />
        <button
          className="h-7 w-8 text-white absolute bottom-0 z-0 right-0 bg-red-500 flex justify-center items-center text-xl rounded-full cursor-pointer"
          type="button"
          onClick={handleRemoveImage}
        >
          <FiTrash />
        </button>
      </div> }
    </div>
  );
};

export default ProfilePhotoSelector;
