function TitleHeader({ title, sub }) {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="hero-badge">
        <p>{sub}</p>
      </div>
      <h2 className="section-heading text-center">
        {title}
      </h2>
    </div>
  );
}

export default TitleHeader;
