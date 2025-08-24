import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(({ notification }) => notification);

  if (!notification.text) {
    return null;
  }

  const style = {
    color: notification.isError ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return (
    <div className='notification' style={style}>
      {notification.text}
    </div>
  );
};

export default Notification;
