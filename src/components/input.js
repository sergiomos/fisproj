const Input = ({ label, type, value, onChange }) => (
  <label className='flex flex-col gap-2'>
    {label}
    <input type={type} value={value} className='rounded h-10 px-4 shadow' onChange={({ target }) => onChange(target.value)} required></input>
  </label>
)

export default Input;
