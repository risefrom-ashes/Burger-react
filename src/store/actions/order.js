import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  }
}

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}

export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    setTimeout(() => {
      axios.post('/orders.json?auth='+token,orderData)
        .then(
          response => {
            dispatch(purchaseBurgerSuccess(response.data.name, orderData))
          }
        )
        .catch(error => {
          dispatch(purchaseBurgerFail(error))
        });
      }, 100 );
  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};


export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  }
}

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  }
}

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}

export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    // eslint-disable-next-line
    const queryparams = '?auth=' + token + '&' + 'orderBy="userId"' + '&' + 'equalTo="' + userId + '"';
    axios.get('/orders.json' + queryparams)
      .then(res => {
        const orders = [];
        for (let key in res.data) {
          orders.push({
            ...res.data[key],
            id:key
          })
        }
        dispatch(fetchOrdersSuccess(orders));
      })
      .catch(err => {
        dispatch(fetchOrdersFail(err));
      })
  }
}

export const deleteOrder = (orderId) => {
  // console.log('deleting');
  return {
    type: actionTypes.DELETE_ORDER,
    orderId: orderId
  }
}