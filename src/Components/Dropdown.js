function Dropdown({
  value,
  title,
  setFunction,
  stateVar,
  optionName,
  optionValue,
}) {
  function handleOnChange(e) {
    setFunction(e.target.value);
  }

  return (
    <label htmlFor={value}>
      {title}
      <select
        onChange={(event) => handleOnChange(event)}
        value={stateVar}
        id={value}
      >
        {optionValue.map((el, i) => {
          return <option value={el} key={el}>{`${optionName[i]}`}</option>;
        })}
      </select>
    </label>
  );
}

export default Dropdown;
