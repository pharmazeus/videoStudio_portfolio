function Field({
  as = "input",
  name,
  label,
  value,
  onChange,
  error,
  required = false,
  autoComplete,
  type = "text",
  rows,
  hidden = false,
  className = "md:col-span-2",
  children,
}) {
  const fieldId = name;
  const errorId = `${name}-error`;
  const ariaDescribedBy = error ? errorId : undefined;
  const ariaInvalid = Boolean(error) || undefined;

  const sharedProps = {
    id: fieldId,
    name,
    required,
    value,
    onChange,
    "aria-invalid": ariaInvalid,
    "aria-describedby": ariaDescribedBy,
  };

  if (hidden) {
    return (
      <div className="hidden" aria-hidden="true">
        <label htmlFor={fieldId}>{label}</label>
        <input
          {...sharedProps}
          type={type}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <label htmlFor={fieldId}>{label}</label>
      {as === "select" ? (
        <select
          {...sharedProps}
          className="w-full rounded-md bg-blue-100 px-4 py-4 text-sm text-white placeholder:text-blue-50 md:text-base"
        >
          {children}
        </select>
      ) : as === "textarea" ? (
        <textarea {...sharedProps} rows={rows} />
      ) : (
        <input {...sharedProps} type={type} autoComplete={autoComplete} />
      )}
      {error ? (
        <p id={errorId} className="form-field-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default Field;
