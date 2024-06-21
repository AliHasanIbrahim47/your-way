import { RotatingLines } from "react-loader-spinner";

const Spinner = () => {
  return (
    <RotatingLines
      visible={true}
      height="100"
      width="100"
      color="grey"
      strokeWidth="5"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
    />
  );
};

export default Spinner;
