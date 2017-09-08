// const css = require('../sass/style.scss');
import css from '../sass/style.scss';
import React from 'react';
import ReactDOM from 'react-dom';

export class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      buyItems: ['pineapple', 'watermelon', 'banana'],
      message: ''
    }
  }
  addItem(e){
    e.preventDefault();
    const {buyItems} = this.state;
    const newItem = this.newItem.value;

    const isOnTheList = buyItems.includes(newItem);

    if(isOnTheList){
      this.setState({
        message: 'This item is already on the list.',
      })
    }else{
      newItem !== '' && this.setState({
        buyItems: [...this.state.buyItems, newItem],
        message: '',
        count: buyItems.length
      })
    }

    this.addForm.reset();
  }

  removeItem(item){
    const newBuyItems = this.state.buyItems.filter(buyItem=>{
      return buyItem != item;
    });

    this.setState({
      buyItems:[...newBuyItems]
    })
    if(newBuyItems.length === 0){
      this.setState({
        message: 'No items on your list, add some.'
      })
    }
  }
  clearList(e){
    this.setState({
      buyItems: [],
      message: 'No items on your list, add some.'
    })
  }
  render(){
    const {buyItems, message}=this.state;
    return(
      <div className="container">
        <h1>
          <i className="fa fa-shopping-basket" aria-hidden="true"></i>
          Shopping List
          </h1>
        <form className="add-item__form" ref={(input) => {this.addForm = input}} onSubmit={(e) => {this.addItem(e)}}>
          <input ref={(input) => {this.newItem = input}} type="text" className="add-item__input"/>
          <button type="submit" className="btn btn--primary">Add</button>
        </form>
        { (message != ''|| buyItems.lenght === 0) && <p className="warning-message"> {message}</p> }
        {
          buyItems.length > 0 &&
        <div>
          <ul className="shopping-list">
          {
            buyItems.map(item=>{
              return (
                <li key={item}>
                  {item}
                  <button className="trash" onClick={(e)=> {this.removeItem(item)}}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
                </li>
              )
            })
          }
          </ul>
        <button className="btn btn--danger btn--block" onClick={(e)=>{this.clearList()}}>Clear List</button>
        </div>
        }
      </div>
    )
  }
}

ReactDOM.render(
  <App />, document.getElementById('root')
);
