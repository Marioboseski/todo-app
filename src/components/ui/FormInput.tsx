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
    <div>
      <div>
        <input type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur} />
      </div>
        { touched && error && (
        <p>{error}</p>
      )}
    </div>
  )
}

export default FormInput;