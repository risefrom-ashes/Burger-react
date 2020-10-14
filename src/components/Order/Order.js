import React , {Component} from 'react';
import classes from './Order.css'
import Button from '../../components/UI/Button/Button'
import axios from '../../axios-orders'
import dateformat from 'dateformat'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'

import Spinner from '../UI/Spinner/Spinner'


class Order extends Component {

  state = {
    deleting: false
  }

  render () {
    // console.log(this.props);
    const ingredients = [];
      for (let ingredientName in this.props.ingredients) {
        ingredients.push({
          name : ingredientName,
          amount : this.props.ingredients[ingredientName]
      });
    }

    const ingredientOutput = ingredients.map(ig => {
      return  <span 
                key={ig.name}
                style={{
                  textTransform: 'capitalize',
                  display: 'inline-block',
                  margin: '10px 8px',
                  border: '1px solid #ccc',
                  padding: '5px',
                  width: '80px'
                }}
              >
                {ig.name} : {ig.amount}
              </span>
    })

    let output = (
      <div className={classes.Order}>
        <div style = {{float: 'right', display: 'inline'}}>
          
          <Button 
            style={{paddingTop:'35px'}}
            btnType='Danger' 
            clicked={() => {
              this.setState({deleting: true});
              // console.log(this.props.id);
              const id = this.props.id
                axios.delete('/orders/'+id+'.json?auth='+this.props.token)
                  .then(res => {
                      // console.log('res',res);
                      // console.log(this.props.orders)
                      this.props.onDeleteOrder(id);
                    }
                  )
              }
            }
          >
            Delete Order
          </Button>
        </div>
        <p>Ingredients : {ingredientOutput}</p>
        <p>Price : <strong> {this.props.price}$</strong> </p>  
        <p>
        Time : <strong style={{paddingRight:'10px'}}>
            {dateformat(this.props.time,"h:MM TT dddd dS mmmm")}
          </strong>
        </p>
      </div>
    )
    if (this.state.deleting) {
      output = <Spinner />
    }
    return output;
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    orders: state.order.orders
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteOrder: (id) => dispatch(actions.deleteOrder(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Order);