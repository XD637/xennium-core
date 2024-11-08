const FutureCard = ({ title, description, iconClass, explanation }) => {
    return (
      <div className="card-container group mb-8 w-full flex justify-center"> {/* Ensure full width and center alignment */}
        <div className="card relative w-full max-w-xs"> {/* Set max-width for each card */}
          {/* Front Side */}
          <div className="card-front flex items-center justify-center bg-white text-center p-6 shadow-lg rounded-lg">
            <i className={`${iconClass} text-4xl text-black mb-4`}></i>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
          {/* Back Side */}
          <div className="card-back flex items-center justify-center bg-black text-white text-left p-6 shadow-lg rounded-lg">
            <p className="text-sm font-semibold">{explanation}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default FutureCard;
  