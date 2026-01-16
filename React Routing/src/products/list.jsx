//import { useEffect } from "react";
import { useEffect, useState } from "react";
import Card from "./card";
import { useNavigate } from "react-router";

export default function List() {
  const navigate = useNavigate();
  const [searchItem, setSearchItem] = useState("");
  const [data, setData] = useState([]);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [debouncedMin, setDebouncedMin] = useState("");
  const [debouncedMax, setDebouncedMax] = useState("");

  const savedData = sessionStorage.getItem("productsData");

  const handleEdit = (index) => {
    sessionStorage.setItem("activeEditIndex", index);
    navigate("/create");
  };

  const handleDelete = (index) => {
    const updated = data.filter((_, i) => i !== index);
    sessionStorage.setItem("productsData", JSON.stringify(updated));
    setData(updated);
  };

  useEffect(() => {
    //  debouncedSearch = searchItem
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchItem);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchItem]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedMin(minPrice);
      setDebouncedMax(maxPrice);
    }, 500);

    return () => clearTimeout(timeout);
  }, [minPrice, maxPrice]);

  const filteredData = data.filter((item) => {
    const nameMatch = item.pname
      ?.toLowerCase()
      .includes(debouncedSearch.toLowerCase());

    const price = Number(item.price);

    const minMatch = debouncedMin === "" || price >= Number(debouncedMin);

    const maxMatch = debouncedMax === "" || price <= Number(debouncedMax);

    return nameMatch && minMatch && maxMatch;
  });

  useEffect(() => {
    if (savedData) {
      const updatedData = JSON.parse(savedData);
      setData(updatedData);
    }
  }, [savedData]);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        <input
          type="text"
          placeholder="Search Product"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          className="border px-3 py-2 w-60"
        />

        <input
          type="number"
          placeholder="Min price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border px-3 py-2 w-40"
        />

        <input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border px-3 py-2 w-40"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
        {filteredData.map((item, index) => (
          <Card
            key={index}
            item={item}
            handleEdit={() => handleEdit(index)}
            handleDelete={() => handleDelete(index)}
          />
        ))}
      </div>
    </>
  );
}
