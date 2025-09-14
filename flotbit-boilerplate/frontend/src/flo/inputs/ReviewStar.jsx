import { useEffect, useState } from "react";

const ReviewStar = ({
  defaultValue = 3,
  total = 5,
  onChange = null,
  style = {},
  className = "",
}) => {
  const [rating, setRating] = useState(defaultValue);

  useEffect(() => {
    setRating(defaultValue);
  }, [defaultValue]);

  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = useCallback((starIndex) => {
    const newRating = starIndex + 1;
    setRating(newRating);
    onChange?.(newRating);
  }, [onChange]);

  const handleStarHover = useCallback((starIndex) => {
    setHoverRating(starIndex + 1);
  }, []);

  const handleStarLeave = useCallback(() => {
    setHoverRating(0);
  }, []);


  return (
    <div
      style={{
        ...style,
      }}
      className={"form-component flex gap-[1.5625em] " + className}
    >
      {[...Array(total)].map((_, index) => {
        const isActive = index < (hoverRating || rating);
        return (
          <button
            key={index}
            onClick={() => handleStarClick(index)}
            onMouseEnter={() => handleStarHover(index)}
            onMouseLeave={handleStarLeave}
            className={`shrink-0 w-[2.388em] h-[2.388em] rounded-full 
              flex items-center justify-center mb-[0.31875em]
              transition-all duration-200 ease-in-out
              [background-color:var(--form-button-bg)] 
              [box-shadow:var(--form-button-shadow)]
              hover:[background-color:var(--form-button-bg-color-hover)] 
            `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
            >
              <path
                d="M12.8067 18.5949L17.2123 21.2595C18.0191 21.7478 19.0064 21.0259 18.7941 20.113L17.6263 15.1023L21.5224 11.7264C22.2336 11.1107 21.8515 9.94291 20.9172 9.86859L15.7898 9.43334L13.7833 4.69863C13.4224 3.83874 12.1909 3.83874 11.83 4.69863L9.82359 9.42272L4.69609 9.85798C3.76189 9.93229 3.37972 11.1 4.09098 11.7158L7.98703 15.0916L6.81928 20.1024C6.60696 21.0153 7.59424 21.7372 8.40106 21.2489L12.8067 18.5949Z"
                className={
                  isActive
                    ? "[fill:var(--form-primary-color)]"
                    : "[fill:var(--button-star-bg)]"
                }
              />
            </svg>
          </button>
        );
      })}
    </div>
  );
};

export default ReviewStar;
