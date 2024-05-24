const Dropdown = ({ name, options, optionID, optionName, value, onChange}) => {

  return (
    <select name={name} value={value} onChange={onChange}>
      <option value="" disabled>Select an option</option>
      {options.map(option => (
        <option key={option[optionID]} value={option[optionID]}>
          {option[optionName]}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;