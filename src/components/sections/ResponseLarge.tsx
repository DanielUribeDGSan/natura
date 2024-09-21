import { useEffect } from "react";
import usePaymentStorage from "../../hooks/useFields";
import { Logo } from "../images/Logo";

import "./ResponseLarge.scss";
interface Props {
  setSections: React.Dispatch<React.SetStateAction<number>>;
  sections: number;
}
export const ResponseLarge = ({ setSections, sections }: Props) => {
  const { updateCurrentSection, paymentData } = usePaymentStorage(1);

  useEffect(() => {
    updateCurrentSection(7);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    setSections(sections + 1);
  };

  const titleFilter = paymentData?.sections[0]?.fields?.filter((field) =>
    field.nameField.includes("question-dos-1")
  );
  const descriptionFilter = paymentData?.sections[0]?.fields?.filter((field) =>
    field.nameField.includes("question-dos-2")
  );

  return (
    <>
      <div className="d-flex align-items-center justify-content-end container-logo">
        <Logo />
      </div>
      <section className="main-response-large">
        <div className="center-content">
          <h2 className="text-center">
            {titleFilter && titleFilter[0]?.value}
          </h2>
          <p>{descriptionFilter && descriptionFilter[0]?.value}</p>
          {/* {subTitle && <h3 className="text-center">{subTitle}</h3>} */}
        </div>

        <div className="buttons-content">
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
