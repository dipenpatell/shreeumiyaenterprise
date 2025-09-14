import {
  GoogleForm,
} from "../../../assets/icons/svgs";


const ListSection = () => {
  return (
    <div className="flex flex-col gap-[0.625em] overflow-auto my-[0.9375em]">
      {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((e, i) => (
        <div
          key={i}
          className="flex items-center gap-[0.5em] px-[1.25em] py-[0.9375em] rounded-[0.625em] bg-[var(--background-color-200)] 
        [box-shadow:_0px_4px_4px_0px_#0000001C_inset]"
        >
          <GoogleForm height={"1.625em"} />
          <div className="text-[0.875em]">
            <div className="">Flo Title {i}</div>
            <div className="text-[var(--text-color-light)]">Description</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListSection;
