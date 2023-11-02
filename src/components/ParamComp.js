import React, {useState} from "react";
import Products from "../Products.json";
import {useNavigate, useParams} from "react-router-dom";
import styled from "styled-components";
import {useShopingCard} from "./GlobalState";
import star from "../img/star.png";
import {useSelector} from "react-redux";
import normalLike from "../img/like-svgrepo-com (2).svg";
import boldLike from "../img/like-svgrepo-com (3).svg";
import boldDislike from "../img/dislike-svgrepo-com.svg";
import normalDislike from "../img/dislike-svgrepo-com (1).svg";

const ParamComp = () => {
  const navicate = useNavigate();
  const {userRedux} = useSelector((state) => state.UserSlice);
  const [like, setlike] = useState([]);
  const [dislike, setdislike] = useState([]);
  const [comment, setcomment] = useState("");
  const [commentList, setcommentList] = useState([]);
  const handleComment = () => {
    setcommentList([...commentList, comment]);
    setcomment("");
  };
  const handleLike = (id) => {
    if (!userRedux) {
      alert("you have to sign in first");
      navicate("/login");
    } else if (like.includes(id)) {
      const newlike = like.filter((item) => item === id);
      setlike([newlike]);
    } else {
      setlike([...like, id]);
    }
  };
  const handleDislike = (id) => {
    if (!userRedux) {
      alert("you have to sign in first");
      navicate("/login");
    } else if (dislike.includes(id)) {
      const newdislike = dislike.filter((item) => item === id);
      setdislike([newdislike]);
    } else {
      setdislike([...dislike, id]);
    }
  };
  const {dispatch} = useShopingCard();
  const AddToBasket = (id, title, imgSrc, rate, price) => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        imgSrc: imgSrc,
        rate: rate,
        price: price,
      },
    });
  };
  const params = useParams();
  return (
    <div className="container">
      {Products.map((item) =>
        item.id == params.id ? (
          <Main>
            <h2>Product deltals</h2>
            <Contain>
              <p>{item.title}</p>
              <img src={item.imgSrc} alt="" />
            </Contain>
            <div className="d-flex justify-content-center mt-md-5 justify-content-md-end  ">
              <button
                onClick={() =>
                  AddToBasket(
                    item.id,
                    item.title,
                    item.imgSrc,
                    item.rate,
                    item.price
                  )
                }
                className="btn btn-warning w-50 rounded-pill add-botton"
              >
                Add to the basket
              </button>
            </div>
            <Price className="fs-5-md">The price: {item.price}</Price>
            <Rate>
              {" "}
              <div className="">
                {" "}
                <span>The rate:</span>
                {Array(item.rate)
                  .fill()
                  .map((_, i) => (
                    <img src={star} alt="star" className="star-img" />
                  ))}
              </div>
            </Rate>
            <Like>
              <div>
                <div>{like.length}</div>
                <span onClick={() => handleLike(userRedux?.uid)}>
                  {like.includes(userRedux?.uid) ? (
                    <img src={boldLike} alt="" />
                  ) : (
                    <img src={normalLike} alt="" />
                  )}
                </span>
              </div>
              <div>
                <div>{dislike.length}</div>
                <span onClick={() => handleDislike(userRedux?.uid)}>
                  {dislike.includes(userRedux?.uid) ? (
                    <img src={boldDislike} alt="" />
                  ) : (
                    <img src={normalDislike} alt="" />
                  )}
                </span>
              </div>
            </Like>
            <ProductComm>
              <input
                value={comment}
                type="text"
                placeholder="Leave a comment"
                onChange={(e) => setcomment(e.target.value)}
              />
              <button className="btn btn-warning" onClick={handleComment}>
                post
              </button>
            </ProductComm>
            {commentList?.map((com) => (
              <div>{com}</div>
            ))}
          </Main>
        ) : (
          ""
        )
      )}
    </div>
  );
};
const Main = styled.div`
  & h2 {
    width: fit-content;
    margin: 20px auto;
    overflow: hidden;
  }
  & .add-botton {
    @media (min-width: 767px) {
      max-width: 500px;
    }
  }
`;
const Contain = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 767px) {
    flex-direction: column-reverse;
    align-items: center;
    gap: 20px;
    text-align: center;
    padding: 10px;
    font-weight: bold;
    color: darkslategray;
  }
  & img {
    max-width: 500px;
    @media (max-width: 767px) {
      max-width: 200px;
    }
  }
`;
const Price = styled.div`
  margin-top: 40px;
  font-weight: bold;
  color: darkslategray;
`;
const Rate = styled.div`
margin-top: 10px;
& span {
  font-weight: bold;
  color: darkslategray;
  margin-right:10px;
}
@media (max-width: 768px){
.star-img {
    width: 14px;
    margin-right: 12px;
}`;
const Like = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 35px;
  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  & img {
    width: 40px;
    margin-top: 10px;
  }
`;
const ProductComm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  & input {
    padding: 6px;
    outline: none;
    border: 1px solid #ccc;
    border-radius: 10px 0 0 10px;
    border-right: none;
    width: 75%;
  }
`;
export default ParamComp;
