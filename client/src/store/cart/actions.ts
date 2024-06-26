import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { AsyncThunkConfig, Book, Cart, UpdateCartItem } from "@/types.ts";
import { cartSelectors } from "@/store/cart";
import { authSelectors } from "@/store/auth";
import * as api from "@/services/api";


export const addCart = createAction<Cart>("cart/addCart");
export const addCartFromStorage = createAction<undefined>("cart/addCartFromStorage");
export const removeCart = createAction<undefined>("cart/removeCart");
export const addCartItem = createAction<Book>("cart/addCartItem");
export const removeCartItem = createAction<string>("cart/removeCartItem");
export const updateCartItemQuantity = createAction<UpdateCartItem>("cart/updateCartItemQuantity");



const createAppAsyncThunk = createAsyncThunk.withTypes<AsyncThunkConfig<string>>()

export const fetchCart = createAppAsyncThunk(
  `cart/fetchCart`,
  async (_,  {getState, dispatch}) => {
    if (!authSelectors.userId(getState())) {
      dispatch(addCartFromStorage());
      return;
    }

    try {
      const responseData = await api.getCart();
      dispatch(addCart(responseData));
    } catch (err) {
      dispatch(addCartFromStorage());
    }
  });


export const createCart = createAppAsyncThunk(
  `cart/createCart`,
  async (_,  {getState, dispatch}) => {
    const cart = cartSelectors.cart(getState());

    await api.createCart(cart.items).then(responseData => {
      dispatch(addCart(responseData));
    });
  });


export const addItemToCart = createAppAsyncThunk(
  `cart/addItemToCart`,
  async (book: Book, {getState, dispatch}) => {
    const cartItem = getState().cart.items.entities[book.id];

    if (cartItem) {
      dispatch(updateItemInCart({
        id: cartItem.id,
        quantity: cartItem.quantity + 1,
      }));
    } else {
      dispatch(addCartItem(book))

      if (authSelectors.userId(getState())) {
        await api.addCartItem(book.id);
      }
    }
  });


export const removeItemFromCart = createAppAsyncThunk(
  `cart/removeItemFromCart`,
  async (cartItemId: string,  {getState, dispatch}) => {
    dispatch(removeCartItem(cartItemId));
    if (authSelectors.userId(getState())) {
      await api.removeCartItem(cartItemId);
    }
  });


export const updateItemInCart = createAppAsyncThunk(
  `cart/updateCartItem`,
  async (data: UpdateCartItem,  {getState, dispatch}) => {
    dispatch(updateCartItemQuantity(data));
    if (authSelectors.userId(getState())) {
      await api.updateCartItem(data);
    }
  });