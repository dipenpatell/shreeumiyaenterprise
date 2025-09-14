import { useEffect, useState, useRef } from "react";

import {
  Filter,
  GridList,
  LinearList,
  SortUpwardArrow,
} from "../../../assets/icons/svgs";

import SortOptionSelector from "./SortOptionSelector";
import ListFilters from "./ListFilters";


const ListHeader = () => {
  const sortOptionRef = useRef(null);
  const sortBtnRef = useRef(null);
  const filterMenuRef = useRef(null);
  const filterBtnRef = useRef(null);

  const [isOpenFilterMenu, setIsOpenFilterMenu] = useState(false);
  const [isOpenSortOption, setIsOpenSortOption] = useState(false);

  // List Sorting
  const [sortBy, setSortBy] = useState("Name");
  const [sortOrder, setSortOrder] = useState("Ascending");

  const sortByOptions = ["Name", "Date Modified", "Date Created"];
  const sortOrderOptions = ["Ascending", "Descending"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterBtnRef.current &&
        !filterBtnRef.current.contains(event.target) &&
        filterMenuRef.current &&
        !filterMenuRef.current.contains(event.target)
      ) {
        setIsOpenFilterMenu(false);
      }

      if (
        sortOptionRef.current &&
        !sortOptionRef.current.contains(event.target) &&
        sortBtnRef.current &&
        !sortBtnRef.current.contains(event.target)
      ) {
        setIsOpenSortOption(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between text-[var(--text-color-basic)] relative">
      <div className="flex gap-[0.4375em]">
        <span>{sortBy}</span>
        <SortUpwardArrow
          ref={sortBtnRef}
          onClick={() => setIsOpenSortOption(!isOpenSortOption)}
          height="24"
          className={sortOrder === "Descending" ? "transform rotate-180" : ""}
        />
      </div>
      <div className="flex items-center gap-[0.8125em]">
        {/* Filter icon */}
        <Filter
          ref={filterBtnRef}
          onClick={() => setIsOpenFilterMenu(!isOpenFilterMenu)}
          height="28"
        />

        {/* Grid List */}
        <GridList ref={null} onClick={() => null} height="26" />

        {/* List icon */}
        <LinearList ref={null} onClick={() => null} height="26" />
      </div>
      <div
        ref={filterMenuRef}
        className="w-full absolute top-full right-0 mt-5 px-5 max-w-[31.25em]"
      >
        {isOpenFilterMenu === true && (
          <ListFilters setIsOpen={setIsOpenFilterMenu} />
        )}
      </div>

      <div
        ref={sortOptionRef}
        className="w-full absolute top-full left-0 mt-5 px-5 max-w-[18.75em]"
      >
        {isOpenSortOption === true && (
          <SortOptionSelector
            sortByOptions={sortByOptions}
            sortOrderOptions={sortOrderOptions}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
        )}
      </div>
    </div>
  );
};

export default ListHeader;