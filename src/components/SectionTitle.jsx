function SectionTitle({ eyebrow, title, description, className = "" }) {
  return (
    <div className={`max-w-3xl ${className}`}>
      {eyebrow ? (
        <p className="inline-flex rounded-full border border-black-50 bg-black-100 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white-50">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base text-white-50 md:text-lg">{description}</p>
      ) : null}
    </div>
  );
}

export default SectionTitle;
