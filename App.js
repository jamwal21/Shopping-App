import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { combineReducers, createStore,applyMiddleware } from 'redux';
import productsReducer from './store/reducers/products';
import { Provider } from 'react-redux';
import ShopNavigator from './navigation/ShopNavigator';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/order';
import ReduxThunk from 'redux-thunk'


const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer
})

const store = createStore(rootReducer,applyMiddleware(ReduxThunk))

export default function App() {

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
