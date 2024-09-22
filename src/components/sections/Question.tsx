import React, { useEffect, useState } from "react";
import { Logo } from "../images/Logo";
import usePaymentStorage from "../../hooks/useFields";
import { Spinner } from "../spinners/Spinner";
import { settings } from "../../settings";

import "./Question.scss";

interface Props {
  setSections: React.Dispatch<React.SetStateAction<number>>;
  sections: number;
  type?: "uno" | "dos" | "tres";
}

interface Pregunta {
  id: number;
  clave: string;
  pregunta: string;
  orden: string;
  respuestas: Respuesta[];
}

interface Respuesta {
  id: number;
  respuesta: string;
  respuesta_text: string;
  respuesta_video: string;
  correcta: number;
  pregunta_id: number;
  activo: number;
  created_at: Date;
  updated_at: Date;
}

export const Question = ({ setSections, sections, type = "uno" }: Props) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [selectedAnswerCorrect, setSelectedAnswerCorrect] = useState<number>(0);
  const [questions, setQuestions] = useState<Pregunta[]>([]);
  const [loading, setLoading] = useState(false);

  const { updateSection, updateCurrentSection, paymentData } =
    usePaymentStorage(1);

  useEffect(() => {
    updateCurrentSection(sections);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${settings.apiUrl}/preguntas-${type}`);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (type !== "uno") return;
    if (paymentData) {
      const questionAudio = paymentData.sections[0].fields.filter((field) =>
        field.nameField.includes("audio-order")
      );
      if (questionAudio.length === 0) return;
      const filterQuestion = questions.filter(
        (q) => q.orden === questionAudio[0]?.value
      );

      setQuestions(filterQuestion || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentData, loading]);

  const handleAnswer = () => {
    if (selectedAnswer) {
      if (type === "dos") {
        const responses = questions[0].respuestas;
        const filter = responses.filter((q) => q.respuesta === selectedAnswer);
        updateSection(
          1,
          [
            {
              nameField: `question-${type}-${currentQuestionIndex + 1}`,
              value: selectedAnswer,
            },
            {
              nameField: `question-${type}-${currentQuestionIndex + 2}`,
              value: filter[0]?.respuesta_text,
            },
          ],
          1
        );
      } else if (type === "tres") {
        const responses = questions[0].respuestas;
        const filter = responses.filter((q) => q.respuesta === selectedAnswer);
        updateSection(
          1,
          [
            {
              nameField: `question-${type}-${currentQuestionIndex + 1}`,
              value: selectedAnswer,
            },
            {
              nameField: `question-${type}-${currentQuestionIndex + 2}`,
              value: filter[0]?.respuesta_video,
            },
          ],
          1
        );
      } else {
        updateSection(
          1,
          [
            {
              nameField: `question-${type}-${currentQuestionIndex + 1}`,
              value: selectedAnswer,
            },
            {
              nameField: `question-correct-${type}`,
              value: selectedAnswerCorrect.toString(),
            },
          ],
          1
        );
      }

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedAnswer("");
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    correct: number
  ) => {
    setSelectedAnswer(e.target.value);
    setSelectedAnswerCorrect(correct);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <div className="d-flex align-items-center justify-content-end container-logo">
        <Logo />
      </div>
      <section className="main-questions main-evenly">
        <h2 className="title text-center">{currentQuestion?.pregunta}</h2>
        <div className="center-content radio-buttons">
          {questions.length > 0 && !loading && (
            <>
              {currentQuestion.respuestas.map((respuesta) => (
                <div key={respuesta.id} className="radio-buttons__title">
                  <input
                    id={String(respuesta.id)}
                    type="radio"
                    value={respuesta.respuesta}
                    name="answer"
                    onChange={(e) => handleChange(e, respuesta.correcta)}
                    checked={selectedAnswer === respuesta.respuesta}
                  />
                  <label htmlFor={String(respuesta.id)}>
                    {respuesta.respuesta}
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
            disabled={!selectedAnswer}
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
