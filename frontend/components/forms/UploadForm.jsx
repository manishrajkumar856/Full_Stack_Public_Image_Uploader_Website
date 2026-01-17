import axios from "axios";
import React, { useContext, useState } from "react";
import { DataContaxtProvider } from "../../contaxtApi/DataContaxt";

const UploadForm = () => {
  const [uploadFormData, setUploadFormData] = useState({
    imgTitle: "",
    imgCategory: "",
    imgTags: "",
    imgDesc: "",
    imgFile: "",
  });

  const { proInfo } = useContext(DataContaxtProvider);

  const [token, setToken] = useState(localStorage.getItem("accessToken"));

  const handleUploadForm = async (event) => {
    event.preventDefault();


    try {
      //  For sending File We have to use FormData
      const fd = new FormData();
      fd.append("imgTitle", uploadFormData.imgTitle);
      fd.append("imgCategory", uploadFormData.imgCategory);
      fd.append("imgTags", uploadFormData.imgTags);
      fd.append("imgDesc", uploadFormData.imgDesc);
      fd.append("imgFile", uploadFormData.imgFile);
      fd.append("userId", proInfo._id);

      const res = await axios.post(
        "http://localhost:8000/api/uploads/image",
        fd,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    

      setUploadFormData({
        imgTitle: "",
        imgCategory: "",
        imgTags: "",
        imgDesc: "",
        imgFile: "",
      });
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const handleChange = (event) => {
    setUploadFormData({
      ...uploadFormData,
      [event.target.name]: event.target.value,
    });
  };
  const handleImgChange = (event) => {
    setUploadFormData({
      ...uploadFormData,
      [event.target.name]: event.target.files[0],
    });
  };
  return (
    <form
      onSubmit={handleUploadForm}
      className="px-10 py-5 bg-[#f08b8ba5] rounded-2xl w-[40vw] text-white flex flex-col gap-3 items-center justify-center border border-[#c04747bd]"
    >
      <h3 className="text-3xl font-semibold mt-5 mb-5">Upload Your Image</h3>

      <input
        onChange={handleChange}
        value={uploadFormData.imgTitle}
        name="imgTitle"
        type="text"
        className="px-5 py-3 bg-[#905555dc] outline-none rounded-2xl w-full"
        placeholder="Tile of image"
      />
      <input
        onChange={handleChange}
        value={uploadFormData.imgCategory}
        name="imgCategory"
        type="text"
        className="px-5 py-3 bg-[#905555dc] outline-none rounded-2xl w-full"
        placeholder="Category"
      />
      <input
        onChange={handleChange}
        value={uploadFormData.imgTags}
        name="imgTags"
        type="text"
        className="px-5 py-3 bg-[#905555dc] outline-none rounded-2xl w-full"
        placeholder="Tags seperated with ,"
      />
      <textarea
        onChange={handleChange}
        value={uploadFormData.imgDesc}
        name="imgDesc"
        rows="3"
        className="px-5 py-3 bg-[#905555dc] outline-none rounded-2xl w-full"
        placeholder="Description of Image"
      ></textarea>
      <div className="w-full flex items-start gap-10 ">
        <input
          onChange={handleImgChange}
          accept="image/*"
          name="imgFile"
          type="file"
          className="px-5 py-3 bg-[#905555dc] outline-none rounded-2xl "
        />

        <div className="w-30 h-35 bg-red-200 overflow-hidden rounded-2xl">
          {uploadFormData.imgFile && (
            <img
              className="w-full h-full object-cover object-center"
              src={URL.createObjectURL(uploadFormData.imgFile)}
              alt=""
            />
          )}
        </div>
      </div>

      <button className="px-15 rounded-2xl mt-5 py-3 bg-[#e76868]">
        Upload
      </button>
    </form>
  );
};

export default UploadForm;
