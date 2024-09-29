export const HeroSection = () => {
  return (
    <section id="header" className="bg-black min-h-screen ">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="z-10 mx-auto w-full ">
          <div className="flex flex-col items-center text-center text-white cursor-pointer">
            <h1 className=" text-3xl sm:text-7xl font-bold p-5 ">
              Let Me Build It
              <strong className="font-extrabold-700 sm:block">
                {" "}
                So You Don't Have To.{" "}
              </strong>
            </h1>

            <p
              id="slogan"
              className=" mt-4 translate-y-2 sm:text-xl/relaxed text-[var(--paragraphs)] max-w-[50%] tracking-wide"
            >
              take your business to another level. let me help you to build
              great website without breaking your bank account.{" "}
            </p>
          </div>
        </div>
      </div>
      <div
        className="glow-top"
        style={{
          transform:
            "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
          opacity: 1,
          transformStyle: "preserve-3d",
        }}
      ></div>
    </section>
  )
}
