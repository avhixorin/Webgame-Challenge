type Props = {
  alphabet: string;
};

const Alphabets = ({ alphabet }: Props) => {
  return (
    <div className="w-16 h-16 bg-gradient-to-br from-red-400 via-orange-500 to-yellow-500 border-4 border-gray-100 rounded-xl shadow-lg flex items-center justify-center transform transition-transform hover:scale-110">
      <div className="bg-transparent rounded-md w-11/12 h-11/12 flex items-center justify-center ">
        <p className="text-3xl text-white font-extrabold drop-shadow-lg">{alphabet}</p>
      </div>
    </div>
  );
};

export default Alphabets;
