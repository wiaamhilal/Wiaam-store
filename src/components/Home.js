import HomeImg from "../img/home.jpg";
import Products from "../Products.json";
import "./Home.css";
import Product from "./Product";

const Home = ({serch}) => {
  return (
    <div className="Home">
      <img className="Home-img" src={HomeImg} alt="background" />
      <div className="row">
        {Products.filter((item) =>
          serch === "" ? item : item.title.toLowerCase().includes(serch)
        ).map((item) => (
          <div className="col-md-6 col-lg-3 col-md-4">
            <Product {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
