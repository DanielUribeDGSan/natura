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
        {sections === 2 && <Circles setSections={setSections} />}
        {sections === 3 && <Audio setSections={setSections} />}
        {sections === 4 && (
          <Question setSections={setSections} sections={sections} />
        )}
        {sections === 5 && (
          <Response
            setSections={setSections}
            title="En Natura, nuestrxs Consultores se dividen en 4 arquetipos..."
            subTitle="Presiona el botón y mira hacia tu izquierda."
            buttonText="¡Conócelos!"
          />
        )}
        {sections === 6 && (
          <Question setSections={setSections} sections={sections} type="dos" />
        )}
        {sections === 7 && (
          <ResponseLarge setSections={setSections} sections={sections} />
        )}
        {sections === 8 && (
          <Question setSections={setSections} sections={sections} type="tres" />
        )}
        {sections === 9 && (
          <ResponseVideo setSections={setSections} sections={sections} />
        )}
        {sections === 10 && (
          <Response
            setSections={setSections}
            title="¡Felicidades! Has terminado con éxito la prueba."
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
