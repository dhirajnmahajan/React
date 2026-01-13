// import React, { useEffect, useState } from "react";
// import Card from "./Card";
// // import {useDebounce} from 'use-debounce'

// function Form() {
//   const initialObj = {
//     pname: "",
//     price: "",
//     image: "",
//   };

//   const [data, setData] = useState([]);
//   const [formData, setFormData] = useState(initialObj);
//   const [editIndex, setEditIndex] = useState(null);
  

//   const [searchItem, setSearchItem] = useState("");
//   const [debouncedSearch, setDebouncedSearch] = useState("");
//   // const debouncedSearch = useDebounce (searchItem,500)

//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");
//   const [debouncedMin, setDebouncedMin] = useState("");
//   const [debouncedMax, setDebouncedMax] = useState("");

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     setFormData({
//       ...formData,
//       [name]: files ? files[0] : value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (editIndex !== null) {
//       const updated = [...data];
//       updated[editIndex] = formData;
//       setData(updated);
//       setEditIndex(null);
//     } else {
//       setData([...data, formData]);
//     }

//     setFormData(initialObj);
//   };

//   const handleEdit = (index) => {
//     setFormData(data[index]);
//     setEditIndex(index);
//   };

//   const handleDelete = (index) => {
//     const updated = data.filter((_, i) => i !== index);
//     setData(updated);
//   };

  
//   useEffect(() => {

//     //  debouncedSearch = searchItem
//     const timeout = setTimeout(() => {
//       setDebouncedSearch(searchItem);
//     }, 500);

//     return () => clearTimeout(timeout);
//   }, [searchItem]);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setDebouncedMin(minPrice);
//       setDebouncedMax(maxPrice);
//     }, 500);

//     return () => clearTimeout(timeout);
//   }, [minPrice, maxPrice]);

//   const filteredData = data.filter((item) => {
//     const nameMatch = item.pname
//       ?.toLowerCase()
//       .includes(debouncedSearch.toLowerCase());

//     const price = Number(item.price);

//     const minMatch = debouncedMin === "" || price >= Number(debouncedMin);

//     const maxMatch = debouncedMax === "" || price <= Number(debouncedMax);

//     return nameMatch && minMatch && maxMatch; 
//   });

//   return (
//     <>
//       <div className="flex justify-center mt-6 ">
//         <form
//           onSubmit={handleSubmit}
//           className="w-96 bg-white p-6 rounded shadow space-y-3"
//         >
//           <input
//             type="text"
//             name="pname"
//             placeholder="Product name"
//             value={formData.pname}
//             onChange={handleChange}
//             className="w-full border px-2 py-1"
//           />

//           <input
//             type="number"
//             name="price"
//             placeholder="Price"
//             value={formData.price}
//             onChange={handleChange}
//             className="w-full border px-2 py-1"
//           />

//           <label>
//             <span className=" font-sm border border-gray-300 rounded-md p-1 mb-4  hover:bg-gray-100 cursor-pointer">
//               Select Image
//             </span>

//             <input
//               type="file"
//               name="image"
//               onChange={handleChange}
//               className="mt-2 "
//             />
//           </label>

//           <button className="w-full bg-gray-800 text-white py-1 rounded-md cursor-pointer hover:bg-gray-600">
//             {editIndex !== null ? "Update" : "Add"}
//           </button>
//         </form>
//       </div>

//       <div className="flex flex-wrap justify-center gap-3 mt-4">
//         <input
//           type="text"
//           placeholder="Search Product"
//           value={searchItem}
//           onChange={(e) => setSearchItem(e.target.value)}
//           className="border px-3 py-2 w-60"
//         />

//         <input
//           type="number"
//           placeholder="Min price"
//           value={minPrice}
//           onChange={(e) => setMinPrice(e.target.value)}
//           className="border px-3 py-2 w-40"
//         />

//         <input
//           type="number"
//           placeholder="Max price"
//           value={maxPrice}
//           onChange={(e) => setMaxPrice(e.target.value)}
//           className="border px-3 py-2 w-40"
//         />
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
//         {filteredData.map((item, index) => (
//           <Card
//             key={index}
//             item={item}
//             handleEdit={() => handleEdit(index)}
//             handleDelete={() => handleDelete(index)}
//           />
//         ))}
//       </div>
//     </>
//   );
// }

// export default Form;
