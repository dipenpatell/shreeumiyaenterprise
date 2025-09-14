import {
  TickMark,
} from "../../../assets/icons/svgs";

const SortOptionSelector = ({
  sortByOptions,
  sortOrderOptions,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}) => {
  return (
    <div className="w-full bg-[var(--background-color-200)] [box-shadow:var(--outset-shadow-200)] text-[var(--text-color-basic)] rounded-[0.625em] shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-[var(--light-dark-color)]">
          Sort by
        </h3>
      </div>

      {/* Sort By Options */}
      <div>
        {sortByOptions.map((option) => (
          <button
            key={option}
            onClick={() => setSortBy(option)}
            className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-150 flex items-center ${
              sortBy === option ? "bg-[var(--background-color-50)]" : ""
            }`}
          >
            {sortBy === option ? (
              <TickMark
                height={"100%"}
                className="w-[1.25em] h-[1.25em] mr-[0.625em]"
              />
            ) : (
              <div className="w-[1.25em] h-[1.25em] mr-[0.625em]"></div>
            )}
            <span className="flex-1 text-sm text-[var(--text-color-basic)]">
              {option}
            </span>
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200"></div>

      {/* Sort Order Options */}
      <div className="">
        {sortOrderOptions.map((option) => (
          <button
            key={option}
            onClick={() => setSortOrder(option)}
            className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-150 flex items-center ${
              sortOrder === option ? "bg-[var(--background-color-50)]" : ""
            }`}
          >
            {sortOrder === option ? (
              <TickMark
                height={"100%"}
                className="w-[1.25em] h-[1.25em] mr-[0.625em]"
              />
            ) : (
              <div className="w-[1.25em] h-[1.25em] mr-[0.625em]"></div>
            )}
            <span className="flex-1 text-sm text-[var(--text-color-basic)]">
              {option}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortOptionSelector;