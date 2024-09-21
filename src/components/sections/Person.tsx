import { Logo } from "../images/Logo";

import "./Person.scss";
interface Props {
  setSections: React.Dispatch<React.SetStateAction<number>>;
}
export const Person = ({ setSections }: Props) => {
  const handleClick = () => {
    setSections(6);
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-end container-logo">
        <Logo />
      </div>
      <section className="main-person main-between">
        <h2 className="title text-center">Eres el consultor</h2>
        <div className="center-content">
          <div className="circle-lg" />
        </div>
        <h2 className="title text-center mt-0">El innovador</h2>
        <div className="audio-content d-flex align-items-center justify-content-center">
          <button
            className="btn-circle bg-theme1 text-white "
            type="button"
            onClick={handleClick}
          >
            Siguiente
          </button>
        </div>
      </section>
    </>
  );
};
