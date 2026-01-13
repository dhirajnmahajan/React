import React from "react";

function Card({ item, handleDelete, handleEdit }) {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow overflow-hidden m-2">
      <img src={item.image} alt="card" className="w-full h-50 object-cover" />

      <div className="p-4">
        <h2 className="text-lg font-semibold">Product: {item.pname}</h2>
        <p className="text-gray-600">Price : {item.price}</p>
      </div>

      <div className="flex gap-4 justify-center ">
        <button
          type="button"
          className="border-1 border-gray-200 rounded-md color-black-600 bg-cyan-200 p-1 w-20 m-2 cursor-pointer hover:bg-cyan-300"
          onClick={() => handleEdit()}
        >
          Edit
        </button>

        <button
          type="button"
          className="border-1 border-gray-200 rounded-md color-black-600 bg-red-200 p-1 w-20 m-2 cursor-pointer hover:bg-red-300"
          onClick={() => handleDelete()}
        >
          {" "}
          Delete
        </button>
      </div>
    </div>
  );
}

export default Card;
