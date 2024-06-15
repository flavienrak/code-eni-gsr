export const InputText = ({
  id,
  onChange,
  placeholder,
  label,
  type,
  value,
}) => {
  return (
    <div className={"flex flex-col gap-1"}>
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`bg-[var(--color-light)] rounded-md py-3 px-4 w-full placeholder:text-[var(--color-gray)] placeholder:font-light focus:outline-1 focus:outline-[var(--primary-color)] focus:outline-offset-0`}
      />
    </div>
  );
};

export const TextareaText = ({
  id,
  value,
  onChange,
  placeholder,
  label,
  type,
  rows,
}) => {
  return (
    <div className={"flex flex-col gap-1"}>
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>
      <textarea
        rows={rows}
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`bg-[var(--color-light)] rounded-md py-3 px-4 w-full placeholder:text-[var(--color-gray)] placeholder:font-light focus:outline-1 focus:outline-[var(--primary-color)] focus:outline-offset-0`}
      />
    </div>
  );
};
