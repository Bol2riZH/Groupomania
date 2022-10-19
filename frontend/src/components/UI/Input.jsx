import classes from './Input.module.scss';

const Input = (props) => {
  return (
    <div
      className={`${classes.input} ${
        props.isValid === false ? classes.invalid : ''
      } ${props.className}`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        name={props.name}
        placeholder={props.placeHolder}
        type={props.type || 'text'}
        onChange={props.onChange}
        autoFocus={props.autoFocus}
        onClick={props.onClick}
        onBlur={props.onBlur}
      />
    </div>
  );
};

export default Input;
