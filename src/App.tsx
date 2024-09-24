import { useEffect, useState } from "react";
import { BannerFull } from "./components/banners/BannerFull";
import { Circles } from "./components/sections/Circles";
import { Audio } from "./components/sections/Audio";
import { Question } from "./components/sections/Question";

import "animate.css";
import "./App.scss";
// import { Products } from "./components/sections/Products";
import { Response } from "./components/sections/Response";
import { ResponseLarge } from "./components/sections/ResponseLarge";
import { ResponseVideo } from "./components/sections/ResponseVideo";
import usePaymentStorage from "./hooks/useFields";
import { QuestionMultiple } from "./components/sections/QuestionMultiple";

const arrayFullSections = [6];

function App() {
  const [sections, setSections] = useState<number>(1);

  const { paymentData } = usePaymentStorage(1);

  useEffect(() => {
    if (paymentData) {
      setSections(paymentData?.currentSection ?? 1);
    }
  }, [paymentData]);

  return (
    <main>
      <div
        className="container-questions"
        style={{
          height: arrayFullSections.includes(sections) ? "100%" : "100vh",
          maxHeight: arrayFullSections.includes(sections) ? "100%" : "100vh",
        }}
      >
        {sections === 1 && <BannerFull setSections={setSections} />}
        {sections === 2 && (
          <Response
            sections={sections}
            setSections={setSections}
            title="¡Orgullosos de rendir homenaje a nuestrxs consultorxs en su día!"
            subTitle="Colócate los audífonos y gira hacia la izquierda."
            buttonText="Siguiente"
          />
        )}
        {sections === 3 && (
          <Circles setSections={setSections} sections={sections} />
        )}
        {sections === 4 && (
          <Audio setSections={setSections} sections={sections} />
        )}
        {sections === 5 && (
          <Question setSections={setSections} sections={sections} />
        )}
        {sections === 6 && (
          <Response
            sections={sections}
            setSections={setSections}
            title=""
            correctResponse
          />
        )}
        {sections === 7 && (
          <Response
            sections={sections}
            setSections={setSections}
            title="En Natura, nuestrxs Consultores se dividen en 4 arquetipos..."
            subTitle="Presiona el botón y mira hacia tu izquierda."
            buttonText="¡Conócelos!"
          />
        )}
        {sections === 8 && (
          <Question setSections={setSections} sections={sections} type="dos" />
        )}
        {sections === 9 && (
          <ResponseLarge setSections={setSections} sections={sections} />
        )}
        {sections === 10 && (
          <Question setSections={setSections} sections={sections} type="tres" />
        )}
        {sections === 11 && (
          <ResponseVideo setSections={setSections} sections={sections} />
        )}
        {sections === 12 && (
          <Response
            sections={sections}
            setSections={setSections}
            title="Nuestrxs Consultorxs comparten belleza y bienestar a través de los productos Natura. ¿Y tú, cómo lo harías?"
            subTitle="Gira a la derecha, toma un producto y experiméntalo."
            buttonText="Siguiente"
          />
        )}
        {sections === 13 && (
          <QuestionMultiple setSections={setSections} sections={sections} />
        )}
        {sections === 14 && (
          <Response
            sections={sections}
            setSections={setSections}
            title="¡Felicidades! Has terminado con éxito El Challenge."
            subTitle="Ahora que conoces más a fondo la labor de nuestrxs Consultorxs, te invitamos a continuar con la experiencia fuera de la cabina."
            buttonText="Terminar la experiencia"
            isFinished
          />
        )}
        {/* {sections === 10 && <Products setSections={setSections} />} */}
      </div>
    </main>
  );
}

export default App;
