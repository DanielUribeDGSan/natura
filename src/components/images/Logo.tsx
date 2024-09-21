import "./Logo.scss";
type Colors = "white" | "orange";
interface Props {
  color?: Colors;
}
export const Logo = ({ color = "orange" }: Props) => {
  return (
    <div className="logo">
      <img
        className="img-fluid"
        src={
          color === "orange"
            ? "/assets/images/logos/logo-orange.svg"
            : "/assets/images/logos/logo-white.svg"
        }
        alt="logo-orange"
      />
    </div>
  );
};
