import { useDispatch } from 'react-redux';
import { logOut } from '../reducers/userReducer';

const Button = ({ text }) => {
  const dispatch = useDispatch();

  const handleLogOut = (event) => {
    event.preventDefault();
    dispatch(logOut());
  };

  return <button onClick={handleLogOut}>{text}</button>;
};

export default Button;
