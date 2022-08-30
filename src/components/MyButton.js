const MyButton = ({ text, type, onClick }) => {
  //positive, negative외에 이상한 타입 값이 들어가는 것을 방지하기 위해서
  const btnType = ["positive", "negative"].includes(type) ? type : "default";

  return (
    <button
      className={["MyButton", `MyButton_${type}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

MyButton.defaultProps = {
  type: "default",
};

export default MyButton;
