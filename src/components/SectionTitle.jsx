function SectionTitle({ eyebrow, title, description, className = "" }) {
  return (
    <div className={`max-w-3xl ${className}`}>
      {eyebrow ? (
        <p className="section-eyebrow">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="section-heading mt-4">
        {title}
      </h2>
      {description ? (
        <p className="section-description mt-4">{description}</p>
      ) : null}
    </div>
  );
}

export default SectionTitle;
