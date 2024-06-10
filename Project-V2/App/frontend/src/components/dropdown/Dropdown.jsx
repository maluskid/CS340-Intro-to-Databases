// Authors: Denyse Tolentino and Dominic Maluski
// Contents: Film Fiends NBA Database

// General Dropdown component used in forms
// Can be customized by passing down options, optionID, and optionName (which are acquired by fetching from database)

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