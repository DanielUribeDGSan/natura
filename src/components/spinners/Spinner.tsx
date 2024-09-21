import "./Spinner.scss";
export const Spinner = () => {
  return (
    <div className="spinner-border" role="status" id="spinner">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};
