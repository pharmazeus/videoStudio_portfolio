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
      <label htmlFor={fieldId} className="mb-2 block text-sm font-medium text-white-50 uppercase tracking-[0.08em]">
        {label}
      </label>
      {as === "select" ? (
        <select
          {...sharedProps}
          className="w-full appearance-none rounded-xl border border-white/10 bg-[#121214]/80 backdrop-blur-md px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-[#d4865d]/50 focus:bg-white/[0.03] focus:shadow-[0_0_15px_rgba(212,134,93,0.15)] md:text-base"
        >
          {children}
        </select>
      ) : as === "textarea" ? (
        <textarea
          {...sharedProps}
          rows={rows}
          className="w-full rounded-xl border border-white/10 bg-[#121214]/80 backdrop-blur-md px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-[#d4865d]/50 focus:bg-white/[0.03] focus:shadow-[0_0_15px_rgba(212,134,93,0.15)] md:text-base resize-y"
        />
      ) : (
        <input
          {...sharedProps}
          type={type}
          autoComplete={autoComplete}
          className="w-full rounded-xl border border-white/10 bg-[#121214]/80 backdrop-blur-md px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-[#d4865d]/50 focus:bg-white/[0.03] focus:shadow-[0_0_15px_rgba(212,134,93,0.15)] md:text-base"
        />
      )}
      {error ? (
        <p id={errorId} className="mt-2 text-sm text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default Field;
