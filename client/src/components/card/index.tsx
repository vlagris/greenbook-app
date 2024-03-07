import React from "react";
import {Book} from "@/types";
import {addItemToCart} from "@/store/cart/cart.slice";
import {useAppDispatch} from "@/hooks/useTypedReduxHooks.ts";
import classes from "./styles.module.scss";
// @ts-ignore
import StarIcon from '@assets/icons/star.svg?react';
// import BagIcon from '@assets/bag.svg?react';
// @ts-ignore
import HeartIcon from '@assets/icons/heart.svg?react';
import {currency} from "@/constants.ts";


function Card({book}: {book: Book}) {
  const dispatch = useAppDispatch();

  function handleAddToCart() {
    dispatch(addItemToCart(book))
  }

  return (
    <div>
    <div className={classes.card}>
      <div className={classes.wrap}>
        <div className={classes.top}>
          <div className={classes.img_wrap}>
            <img
              className={classes.img}
              src={book.image}
              alt=""
            />
          </div>
        </div>

        <button className={classes.btn_wish}>
          <HeartIcon className={classes.btn_wish_icon}/>
        </button>

        <div className={classes.info}>
          <div className={classes.price}>
            {book.price + " " + currency.RUB.symbol}
          </div>
          <div className={classes.title}>
            {book.title}
          </div>

          <div className={classes.rating}>
            <StarIcon className={classes.rating_icon}/>
            <span className={classes.rating_text}>
              {book.rating.rate}
            </span>
          </div>

          <button className={classes.btn_cart} onClick={handleAddToCart}>
            В корзину
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Card;