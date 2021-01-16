import React, { Component } from "react";
import BudgetContext from "../contexts/BudgetContext";

export class IncomeList extends Component {
  renderAdmin(inc) {
    return (
      <BudgetContext.Consumer>
        {({ removeIncome }) => {
          return (
            <button
              className="item__delete--btn"
              onClick={() => removeIncome(inc.id)}
            >
              <i className="ion-ios-close-outline"></i>
            </button>
          );
        }}
      </BudgetContext.Consumer>
    );
  }
  renderIncList = (incList) => {
    return incList.map((inc) => {
      return (
        <div className="item clearfix" key={inc.id}>
          <div className="item__description">{inc.description}</div>
          <div className="right clearfix">
            <div className="item__value">+ {inc.value}</div>
            <div className="item__delete">{this.renderAdmin(inc)}</div>
          </div>
        </div>
      );
    });
  };
  render() {
    return (
      <div className="income">
        <h2 className="income__title">Income</h2>
        <div className="income__list">
          <BudgetContext.Consumer>
            {({ inc }) => this.renderIncList(Object.values(inc))}
          </BudgetContext.Consumer>
        </div>
      </div>
    );
  }
}

export default IncomeList;
