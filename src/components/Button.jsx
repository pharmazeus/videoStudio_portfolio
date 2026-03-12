const Button = ({ className, text, id }) => {
  return (
    <a
      href={id ? `#${id}` : undefined}
      onClick={(e) => {
        // Prevent default anchor jump; we do a smooth scroll with an offset.
        e.preventDefault();

        if (!id) return;

        const target = document.getElementById(id);
        if (!target) return;

        const offset = window.innerHeight * 0.15;
        const top =
          target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({ top, behavior: "smooth" });
      }}
      className={`${className ?? ""} cta-wrapper`}
      aria-label={text}
    >
      <div className="cta-button group">
        <div className="bg-circle"></div>
        <p className="text">{text}</p>
        <div className="arrow-wrapper">
          <img src="/images/arrow-down.svg" alt="arrow" />
        </div>
      </div>
    </a>
  );
};

export default Button;
