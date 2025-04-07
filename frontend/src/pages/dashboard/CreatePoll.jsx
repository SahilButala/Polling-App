import React, { useContext, useState } from "react";
import DashBoardLayout from "../../components/layouts/DashBoard";
import useUserAuth from "../../hooks/useUserAuth";
import { UserContext } from "../../context/UserContext";
import { POLL_TYPE } from "../../config/data";
import OptionInput from "../../components/input/CreatePollPage/OptionInput";
import OptionImageSelector from "../../components/input/CreatePollPage/OptionImageSelector";
import { uploadImage } from "../../utils/UploadImage";
import axiosInstance from "../../api/axiousInstance";
import { API_PATHS } from "../../api/apiPaths";
import { toast } from "react-toastify";

const CreatePoll = () => {
  useUserAuth();
  const { user,onPollCreateOrDelete } = useContext(UserContext);

  const [pollData, setPollData] = useState({
    question: "",
    type: "",
    options: [],
    imageOption: [],
    error: "",
  });

  const clearData = () => {
    setPollData({
      question: "",
      type: "",
      options: [],
      imageOption: [],
      error: "",
    });
  };

  const upadteImageAndGetLink = async (imageOptions) => {
    const optionPromises = imageOptions.map(async (imageoption) => {
      try {
        const imgUploadRes = await uploadImage(imageoption.file);
        return imgUploadRes.imageUrl || "";
      } catch (error) {
        console.log(`Error uploading image : ${imageoption.file.name}`);
      }
    });

    const optionArr = await Promise.all(optionPromises);
    return optionArr;
  };

  const getOptions = async () => {
    switch (pollData.type) {
      case "single-choice":
        return pollData.options;

      case "image-based":
        const option = await upadteImageAndGetLink(pollData.imageOption);
        return option;

      default:
        return [];
    }
  };

  const handleToCreatePoll = async () => {
    const { question, type, options, imageOption, error } = pollData;

    if (!question || !type) {
      console.log("CREATE", { question, type, options, imageOption, error });
      handleValueChange("error", "Question and Type Requried");
      return;
    }

    if (type === "single-choice" && options?.length < 2) {
      handleValueChange("error", "enter at Two Options");
      return;
    }
    if (type === "image-based" && imageOption.length < 2) {
      handleValueChange("error", "select at least two images");
      return;
    }
    handleValueChange("error","")
    const optionData = await getOptions();
    try {
      const res = await axiosInstance.post(API_PATHS.POLLS.CREATE, {
        question,
        type,
        options: optionData,
        creatorId: user?._id,
      });

      if (res) {
        toast.success("Poll Created Successfully");
        clearData()
        onPollCreateOrDelete()
      }
    } catch (error) {
       if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
        handleValueChange("error",error.response.data.message)
      } 
    }
  };

  const handleValueChange = (key, value) => {
    setPollData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };


  return (
    <DashBoardLayout activeMenue={"Create Poll"}>
      <div className="bg-gray-100/50 my-5 p-5 rounded-lg mx-auto">
        <h2 className="text-lg text-black font-medium ">Create Poll</h2>
        <div>
          <label className="text-xs font-medium text-slate-600">Question</label>

          <textarea
            className="w-full text-[13px] outline-none bg-slate-100 p-2 mt-2"
            placeholder="What's in your mind"
            rows={4}
            value={pollData.question}
            onChange={({ target }) =>
              handleValueChange("question", target.value)
            }
          ></textarea>
        </div>
        <div className="mt-2">
          <label className="text-sm font-medium text-slate-600">
            POLL TYPE
          </label>
          <div className="flex flex-wrap mt-3 gap-4">
            {POLL_TYPE.map((type, i) => (
              <div
                key={i}
                className={`option-poll ${
                  pollData.type === type.value
                    ? "text-white bg-blue-300"
                    : "border-sky-100"
                }`}
                onClick={() => handleValueChange("type", type.value)}
              >
                {type.label}
              </div>
            ))}
          </div>
        </div>
        {pollData.type === "single-choice" && (
          <div className="mt-4">
            <label className="text-sm font-medium text-slate-400">
              Options
            </label>

            <div>
              <OptionInput
                optionList={pollData.options}
                setOptionList={(value) => {
                  handleValueChange("options", value);
                }}
              />
            </div>
          </div>
        )}
        {pollData.type === "image-based" && (
          <div className="mt-4">
            <label className="text-sm font-medium text-slate-400">
              Image Options
            </label>

            <div>
              <OptionImageSelector
                imageList={pollData.imageOption}
                setImageList={(value) => {
                  handleValueChange("imageOption", value);
                }}
              />
            </div>
          </div>
        )}

        {pollData.error && (
          <p className="text-xs font-medium text-red-500 mt-5">
            {pollData.error}
          </p>
        )}

        <button
          onClick={handleToCreatePoll}
          className="btn-primary mt-6 font-normal uppercase"
        >
          Create Poll
        </button>
      </div>
    </DashBoardLayout>
  );
};

export default CreatePoll;
