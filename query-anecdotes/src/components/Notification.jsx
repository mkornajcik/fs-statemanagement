import useNotify from "../hooks/useNotify";

const Notification = () => {
  const { notification } = useNotify();

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div data-testid="notification" style={{ ...style, display: notification ? "block" : "none" }}>
      {notification}
    </div>
  );
};

export default Notification;
