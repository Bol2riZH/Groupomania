import classes from './Input.module.scss';

const Input = (props) => {
  return (
    <div className={`${classes.input} ${props.className}`}>
      <label htmlFor={props.input}>{props.label}</label>
      <input
        id={props.id}
        name={props.name}
        placeholder={props.placeHolder}
        type={props.type || 'text'}
        onChange={props.onChange}
      />
    </div>
  );
};

export default Input;
