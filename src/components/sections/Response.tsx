import { useEffect } from "react";
import usePaymentStorage from "../../hooks/useFields";
import { Logo } from "../images/Logo";

import "./Response.scss";
interface Props {
  setSections: React.Dispatch<React.SetStateAction<number>>;
  title: string;
  subTitle?: string;
  buttonText?: string;
  isFinished?: boolean;
}
export const Response = ({
  setSections,
  title,
  subTitle,
  buttonText = "Siguiente",
  isFinished = false,
}: Props) => {
  const { updateCurrentSection } = usePaymentStorage(1);

  useEffect(() => {
    updateCurrentSection(5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    if (isFinished) {
      setSections(1);
    } else {
      setSections((prevSections) => prevSections + 1);
    }
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-end container-logo">
        <Logo />
      </div>
      <section className="main-response ">
        <div className="center-content">
          <h2 className="text-center">{title}</h2>
          {subTitle && <h3 className="text-center">{subTitle}</h3>}
        </div>

        <div className="buttons-content">
          <button
            className="btn-circle bg-theme1 text-white "
            type="button"
            onClick={handleClick}
          >
            {buttonText}
          </button>
        </div>
      </section>
    </>
  );
};
