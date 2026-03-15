type FormInputProps = {
  name: string,
  type?: string,
  value: string,
  placeholder?: string,
  error?: string,
  touched?: boolean,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
}

const FormInput = ({
  name,
  type = "text",
  value,
  placeholder,
  error,
  touched,
  onChange,
  onBlur
}: FormInputProps) => {

  return (
    <div className="flex flex-col justify-center w-full max-w-80">
      <input type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        className="form-inputs" />
      {touched && error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  )
}

export default FormInput;