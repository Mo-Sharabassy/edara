import React from "react";

/**
 * Edara Input — labelled text field for the contact form. Uppercase mono
 * label, warm surface fill, hairline border, focus ring + inset shadow.
 * Pass `multiline` for a textarea.
 */
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  multiline?: boolean;
  error?: string;
};

export function Input({ label, multiline = false, error, id, className = "", ...rest }: InputProps) {
  const fid = id || (label ? `f-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  return (
    <div className={`edara-field${error ? " edara-field--error" : ""} ${className}`.trim()}>
      {label && (
        <label className="edara-field__label" htmlFor={fid}>
          {label}
        </label>
      )}
      {multiline ? (
        <textarea
          id={fid}
          className="edara-field__control"
          {...(rest as unknown as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input id={fid} className="edara-field__control" {...rest} />
      )}
      {error && <span className="edara-field__error" role="alert" aria-atomic="true">{error}</span>}
    </div>
  );
}

export default Input;
