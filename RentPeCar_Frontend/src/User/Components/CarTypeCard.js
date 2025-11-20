import "./CarCard.css";
import { url } from "../../Commons/constants";

const CarTypeCard = ({ carsType = [], onItemSelect }) => {
  return (
    <div>
      {carsType.map((carType) => (
        <div className="car-type-container" key={carType.id}>
          <div
            onClick={() => {
              onItemSelect(carType);
            }}
          >
          <img
            src={url + "/Images/" + carType.carImage} // add /images/
            className="image"
            alt={carType.typeName}
          />
          <div className="type-title">{carType.typeName}</div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CarTypeCard;
