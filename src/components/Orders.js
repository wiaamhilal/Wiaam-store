import React, {useEffect, useState} from "react";
import {useShopingCard} from "./GlobalState";
import {collection, onSnapshot, orderBy, query} from "firebase/firestore";
import {db} from "../firebase";
import Order from "./order";

const Orders = () => {
  const {user} = useShopingCard();
  const [orders, setorders] = useState();
  useEffect(() => {
    if (user) {
      const collRef = collection(db, "users", user?.uid, "orders");
      const orderRef = query(collRef, orderBy("created", "desc"));
      onSnapshot(orderRef, (querySnapshot) => {
        setorders(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    } else {
      setorders([]);
    }
  }, [user]);
  return (
    <div>
      <h2 className="m-3">your orders</h2>
      {orders?.map((order) => (
        <Order order={order} />
      ))}
    </div>
  );
};

export default Orders;
