type Props = {
    alphabet: string;
  };
  
  const Alphabets = ({ alphabet }: Props) => {
    return (
      <div className="w-14 h-14 bg-gradient-to-br from-orange-200 via-yellow-300 to-pink-200 border-4 border-white rounded-lg shadow-lg flex items-center justify-center transform transition-transform hover:scale-110">
        <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg w-full h-full flex items-center justify-center border border-white border-opacity-30">
          <p className="text-2xl text-white font-extrabold drop-shadow-md">{alphabet}</p>
        </div>
      </div>
    );
  };
  
  export default Alphabets;
  