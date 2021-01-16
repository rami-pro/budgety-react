import React, { Component } from "react";
import IncomeList from "./IncomeList";
import ExpenseList from "./ExpenseList";

export class ListsContainer extends Component {
  render() {
    return (
      <div className="container clearfix">
        <IncomeList />
        <ExpenseList />
      </div>
    );
  }
}

export default ListsContainer;
