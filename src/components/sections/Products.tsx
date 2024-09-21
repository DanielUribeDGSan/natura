import "./Products.scss";
import { Logo } from "../images/Logo";
import { Grid } from "@mui/material";

interface Props {
  setSections: React.Dispatch<React.SetStateAction<number>>;
}
export const Products = ({ setSections }: Props) => {
  const handleClick = () => {
    setSections(7);
  };
  return (
    <>
      <div className="d-flex align-items-center justify-content-end container-logo">
        <Logo />
      </div>
      <section className="main-products main-between container-principal h-100">
        <h2 className="title text-center mt-0">Eres el consultor</h2>
        <div className="center-content w-100 content-rectangle">
          <Grid container spacing={5}>
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={3}
              display={"flex"}
              justifyContent="center"
              alignItems={"center"}
            >
              <button
                type="button"
                className="rectangle border-0"
                onClick={handleClick}
              ></button>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={3}
              display={"flex"}
              justifyContent="center"
              alignItems={"center"}
            >
              <button
                type="button"
                className="rectangle border-0"
                onClick={handleClick}
              ></button>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={3}
              display={"flex"}
              justifyContent="center"
              alignItems={"center"}
            >
              <button
                type="button"
                className="rectangle border-0"
                onClick={handleClick}
              ></button>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={3}
              display={"flex"}
              justifyContent="center"
              alignItems={"center"}
            >
              <button
                type="button"
                className="rectangle border-0"
                onClick={handleClick}
              ></button>
            </Grid>
          </Grid>
        </div>
        <h2 className="title text-center mt-0 title-product">El innovador</h2>
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
