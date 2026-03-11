const RegisterForm = () => {
  return (
    <div>
      <form>
        <input type="text"
        placeholder="Name" />

        <input type="text"
        placeholder="Lastname" />

        <input type="email"
        placeholder="Email" />

        <input type="password"
        placeholder="*****" />

        <input type="text"
        placeholder="Location" />

        <input type="text"
        placeholder="Phone Number" />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterForm;