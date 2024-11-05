
const CTAbutton = ({ width = "w-20", height = "h-5", title = "Confirm" }) => {
  return (
    <div className={`relative ${width} ${height} text-[#F6F4E1] text-2xl font-bold`}>
      <img src="./images/button.png" className="absolute w-full h-full" alt="" />
      <div className="absolute inset-0 flex items-center justify-center z-10">
        {title}
      </div>
    </div>
  );
};

export default CTAbutton;
