import "./BannerFull.scss";

interface Props {
  setSections: React.Dispatch<React.SetStateAction<number>>;
}
export const BannerFull = ({ setSections }: Props) => {
  const handleClick = () => {
    setSections(2);
  };
  return (
    <>
      <img
        className="bg-image"
        src="/assets/images/backgrounds/fondo1.jpg"
        alt="banner"
      />
      <section className="banner-full">
        <div className="w-100 h-100 d-flex align-items-end justify-content-center">
          <img
            className="img-fluid animate__animated animate__fadeInUp animate__delay-1s"
            src="/assets/images/banners/banner2.webp"
            alt="banner"
          />
        </div>
        <div className="buttons">
          <button
            className="btn-circle bg-theme1 text-white animate__animated animate__backInDown animate__delay-2s"
            type="button"
            onClick={handleClick}
          >
            Iniciar la experiencia
          </button>
        </div>
      </section>
    </>
  );
};
