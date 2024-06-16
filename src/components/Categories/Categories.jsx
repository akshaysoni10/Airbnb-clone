import React from "react";
import { categories } from "./data";
import CategoryTypes from "./CategoryTypes";

const Categories = () => {
  return (
    <div className="pt-4 mx-auto xl:px-20 md:px-10 sm:px-2 px-4 flex flex-row items-center justify-between overflow-x-auto">
      {categories.map((item) => (
        <CategoryTypes
          key={item.label}
          label={item.label}
          description={item.description}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

export default Categories;
