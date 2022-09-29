import classes from './Input.module.scss';

const Input = (props) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input}>{props.label}</label>
      <input {...props.input} onChange={props.onChange} />
    </div>
  );
};

export default Input;
