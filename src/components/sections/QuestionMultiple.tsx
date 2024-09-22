import React, { useEffect, useState } from "react";
import { Logo } from "../images/Logo";
import usePaymentStorage from "../../hooks/useFields";
import { Spinner } from "../spinners/Spinner";
import { settings } from "../../settings";

import "./QuestionMultiple.scss";

interface Props {
  setSections: React.Dispatch<React.SetStateAction<number>>;
  sections: number;
}

interface Pregunta {
  id: number;
  clave: string;
  pregunta: string;
  orden: string;
  respuesta_palabras: string[];
}

export const QuestionMultiple = ({ setSections, sections }: Props) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [questions, setQuestions] = useState<Pregunta[]>([]);
  const [loading, setLoading] = useState(false);

  const { updateSection, updateCurrentSection } = usePaymentStorage(1);

  useEffect(() => {
    updateCurrentSection(sections);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${settings.apiUrl}/preguntas-cuatro`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (active) {
          setQuestions(data?.preguntas || []);
          setLoading(false);
        }
      } catch (error) {
        console.error("Hubo un problema con la petición fetch:", error);
        setLoading(false);
      }
    };
    fetchData();
    return () => {
      active = false;
    };
  }, []);

  const handleAnswer = () => {
    if (selectedAnswers.length === 3) {
      updateSection(
        1,
        [
          {
            nameField: `question-multiple-${currentQuestionIndex + 1}`,
            value: selectedAnswers.join(", "),
          },
        ],
        1
      );

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedAnswers([]);
      } else {
        // Todas las preguntas han sido respondidas
        setLoading(true);
        setTimeout(() => {
          setSections(sections + 1);
          setLoading(false);
        }, 1000);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const answer = e.target.value;
    setSelectedAnswers((prev) => {
      if (prev.includes(answer)) {
        return prev.filter((a) => a !== answer);
      } else if (prev.length < 3) {
        return [...prev, answer];
      }
      return prev;
    });
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <div className="d-flex align-items-center justify-content-end container-logo">
        <Logo />
      </div>
      <section className="main-questions-multiple main-evenly">
        <h2 className="title text-center">{currentQuestion?.pregunta}</h2>
        <div className="center-content radio-buttons">
          {questions.length > 0 && !loading && (
            <>
              {currentQuestion.respuesta_palabras.map((respuesta, index) => (
                <div key={index} className="radio-buttons__title">
                  <input
                    id={String(index)}
                    type="checkbox"
                    value={respuesta}
                    name={String(index)}
                    onChange={handleChange}
                    checked={selectedAnswers.includes(respuesta)}
                    disabled={
                      selectedAnswers.length === 3 &&
                      !selectedAnswers.includes(respuesta)
                    }
                  />
                  <label className="text-center" htmlFor={String(index)}>
                    {respuesta}
                  </label>
                </div>
              ))}
            </>
          )}
          {loading && <Spinner />}
        </div>
        <div className="audio-content d-flex align-items-center justify-content-center">
          <button
            className="btn-circle bg-theme1 text-white"
            type="button"
            onClick={handleAnswer}
            disabled={selectedAnswers.length !== 3}
          >
            {currentQuestionIndex < questions.length - 1
              ? "Siguiente"
              : "Siguiente"}
          </button>
        </div>
      </section>
    </>
  );
};
