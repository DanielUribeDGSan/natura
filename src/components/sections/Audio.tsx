import { useEffect } from "react";
import usePaymentStorage from "../../hooks/useFields";
import { Logo } from "../images/Logo";

import "./Audio.scss";

interface Props {
  setSections: React.Dispatch<React.SetStateAction<number>>;
  sections: number;
}
export const Audio = ({ setSections, sections }: Props) => {
  const { paymentData, updateCurrentSection } = usePaymentStorage(1);

  useEffect(() => {
    updateCurrentSection(sections);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    setSections(sections + 1);
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-end container-logo">
        <Logo />
      </div>
      <section className="main-audio container-principal">
        <h2 className="title text-center">
          {paymentData?.sections[0].fields[0].value}
        </h2>

        <div className="img-content d-flex align-items-center justify-content-center">
          <img
            className="img-fluid"
            src="/assets/images/svg/audio.svg"
            alt="audio"
          />
        </div>
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
