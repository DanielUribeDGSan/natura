import "./Circles.scss";
import { Logo } from "../images/Logo";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import usePaymentStorage from "../../hooks/useFields";
import { Spinner } from "../spinners/Spinner";
import { settings } from "../../settings";

interface Props {
  setSections: React.Dispatch<React.SetStateAction<number>>;
  sections: number;
}

interface Audio {
  id: number;
  nombre: string;
  audio: string;
  orden: string;
}

export const Circles = ({ setSections, sections }: Props) => {
  const [audios, setAudios] = useState<Audio[]>([]);
  const { updateSection, updateCurrentSection } = usePaymentStorage(1);
  const [loading, setLoading] = useState(false);

  const handleClick = (idAudio: string, orden: string) => {
    updateSection(
      1,
      [
        { nameField: "audio", value: idAudio },
        {
          nameField: "audio-order",
          value: orden,
        },
      ],
      1
    );
    setLoading(true);
    setTimeout(() => {
      setSections(sections + 1);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    updateCurrentSection(sections);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      fetch(`${settings.apiUrl}/audios`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setAudios(data?.audios);
        })
        .catch((error) => {
          console.error("Hubo un problema con la petición fetch:", error);
        });
    };
    if (active) fetchData();
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <div className="d-flex align-items-center justify-content-end container-logo">
        <Logo />
      </div>
      <section className="circles-main container-principal  pt-4 pb-4">
        <h2 className="title text-center">Elige una llamada</h2>

        <div className="circles-content">
          {!loading && (
            <Grid container spacing={2}>
              {audios.length &&
                audios?.map(({ id, nombre, orden }) => (
                  <Grid
                    key={id}
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={3}
                    display={"flex"}
                    justifyContent="center"
                    alignItems={"center"}
                  >
                    <button
                      type="button"
                      className="circle border-0"
                      onClick={() => handleClick(nombre, orden)}
                    >
                      {id}
                    </button>
                  </Grid>
                ))}
            </Grid>
          )}
        </div>
        {loading && <Spinner />}
      </section>
    </>
  );
};
