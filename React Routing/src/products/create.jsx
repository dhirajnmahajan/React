import React, { useEffect, useState } from "react";
import List from "./list";
import Card from "./card";
import { useNavigate } from "react-router";
import convertImage from './convertImage'
// import {useDebounce} from 'use-debounce'

function Form() {
  const initialObj = {
    pname: "",
    price: "",
    image: "",
  };
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialObj);

  const savedData = localStorage.getItem("productsData");
  const activeEditIndex = localStorage.getItem("activeEditIndex");



  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (activeEditIndex !== null) {
      const productsData = JSON.parse(savedData) || [];

      const updatedData = productsData.map((item, index) => {
        if (Number(activeEditIndex) === index) {
          return formData;
        } else {
          return item;
        }
      });

      const stringifyData = JSON.stringify(updatedData);
      localStorage.setItem("productsData", stringifyData);
      localStorage.removeItem("activeEditIndex");

      navigate("/", { replace: true });
    } else {
      const productsData =
        JSON.parse(localStorage.getItem("productsData")) || [];
      const updatedData = [...productsData, formData];
      const stringifyData = JSON.stringify(updatedData);
      localStorage.setItem("productsData", stringifyData);
    }
    setFormData(initialObj);
  };

  useEffect(() => {
    if (activeEditIndex && savedData) {
      const newData = JSON.parse(savedData) || [];
      console.log("newData", newData, activeEditIndex);
      const updateDataObj = newData.find(
        (item, index) => index === Number(activeEditIndex)
      );
      console.log({ updateDataObj });
      if (updateDataObj) {
        setFormData(updateDataObj);
      }
    }
  }, [activeEditIndex, savedData]);

  return (
    <>
      <div className="flex justify-center mt-6 ">
        <form
          onSubmit={handleSubmit}
          className="w-96 bg-white p-6 rounded shadow space-y-3"
        >
          <input
            type="text"
            name="pname"
            placeholder="Product name"
            value={formData.pname}
            onChange={handleChange}
            className="w-full border px-2 py-1"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border px-2 py-1"
          />

          <label>
            <span className=" font-sm border border-gray-300 rounded-md p-1 mb-4  hover:bg-gray-100 cursor-pointer">
              Select Image
            </span>

            <input
              type="file"
              name="image"
              className="mt-2"
              onChange={async (e) => {
                const fileUrl = await convertImage(e.target.files[0]);
                setFormData({ ...formData, image: fileUrl });
              }}
            />
          </label>

          <button className="w-full bg-gray-800 text-white py-1 rounded-md cursor-pointer hover:bg-gray-600">
            {activeEditIndex !== null ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Form;
