import { isEmpty } from "@/lib/functions";
import { MdArrowDropDown } from "react-icons/md";

export function Input({
  id,
  icon,
  label,
  onChange,
  placeholder,
  type,
  value,
  error,
  required,
  bg,
}) {
  return (
    <div className="relative flex items-center">
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required ? required : true}
        className={`h-12 pl-10 pr-2 peer border bg-transparent rounded-sm focus:outline outline-1 text-[var(--dark)] w-full placeholder:text-[var(--dark)] ${
          error
            ? "border-[var(--red)] outline-[var(--red)]"
            : "border-[var(--dark)] outline-[var(--dark)]"
        }`}
      />
      <label
        htmlFor={id}
        className={`absolute left-10 -translate-y-6 -translate-x-1 text-sm peer-placeholder-shown:translate-y-0 peer-placeholder-shown:translate-x-0 peer-placeholder-shown:text-base peer-focus:-translate-y-6 peer-focus:-translate-x-1 peer-focus:text-sm px-1 rounded-sm transition-all duration-150 cursor-text ${
          error ? "text-[var(--red)]" : "text-[var(--dark)]"
        } ${bg ? `${bg}` : "bg-[var(--primary-color)]"}`}
      >
        {label}
      </label>
      <i
        className={`absolute left-3 ${
          error ? "text-[var(--red)]" : "text-[var(--dark)]"
        }`}
      >
        {icon}
      </i>
    </div>
  );
}

export function InputSelect({
  id,
  icon,
  label,
  onChange,
  placeholder,
  type,
  value,
  error,
  required,
  collapse,
  array,
  onFocus,
  onBlur,
  setCollapse,
  setValue,
}) {
  return (
    <div className="relative flex items-center max-h-96">
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        required={required ? required : true}
        className={`h-12 px-10 peer border bg-transparent rounded-sm focus:outline outline-1 text-[var(--dark)] w-full placeholder:text-[var(--dark)] ${
          error
            ? "border-[var(--red)] outline-[var(--red)]"
            : "border-[var(--dark)] outline-[var(--dark)]"
        } ${collapse ? "outline" : ""}`}
      />
      <label
        htmlFor={id}
        className={`absolute left-10 select-none -translate-y-6 -translate-x-1 text-sm peer-placeholder-shown:translate-y-0 peer-placeholder-shown:translate-x-0 peer-placeholder-shown:text-base peer-focus:-translate-y-6 peer-focus:-translate-x-1 peer-focus:text-sm bg-[var(--primary-color)] px-1 rounded-sm transition-all duration-150 cursor-text ${
          error ? "text-[var(--red)]" : "text-[var(--dark)]"
        }`}
      >
        {label}
      </label>
      <i
        className={`absolute left-3 ${
          error ? "text-[var(--red)]" : "text-[var(--dark)]"
        }`}
      >
        {icon}
      </i>
      <i
        onClick={() => setCollapse((prev) => !prev)}
        className={"absolute right-2 cursor-pointer"}
      >
        <MdArrowDropDown size={"1.5rem"} />
      </i>
      {!isEmpty(array) && collapse && (
        <div
          className={`absolute bg-[var(--white)] w-full top-full p-4 rounded-md shadow-sm z-10`}
        >
          <div className="p-2 h-full max-h-80 overflow-y-scroll overflow-x-hidden scr">
            <div className="h-max flex flex-col">
              {array.map((item, index) => {
                return (
                  <label
                    key={item.id}
                    onClick={() => {
                      setValue((prev) => ({
                        ...prev,
                        value: item.label,
                        valid: true,
                      }));
                      setCollapse(false);
                    }}
                    className={`hover:bg-slate-200 cursor-pointer py-2 px-2 overflow-hidden ${
                      item.label === value
                        ? "bg-slate- text-[var(--primary-color)] underline"
                        : ""
                    }`}
                  >
                    <span
                      className={
                        "font-light whitespace-nowrap overflow-hidden select-none"
                      }
                    >
                      {item.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function Button({ icon, label, loading, type, valid }) {
  return (
    <button
      type={type}
      disabled={typeof valid === "boolean" ? !valid : false}
      className={`bg-[var(--dark)] text-[var(--primary-color)] border border-[var(--dark)] h-12 rounded-sm flex justify-center items-center gap-2 ${
        loading || !valid ? `opacity-80` : ""
      }`}
    >
      <span>{loading ? `${label}...` : `${label}`}</span>
      <i className="text-[var(--primary-color)]">{icon}</i>
    </button>
  );
}
