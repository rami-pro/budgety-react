import React, { Component } from "react";
import BudgetContext from "../contexts/BudgetContext";

export class ExpenseList extends Component {
  renderAdmin(exp) {
    return (
      <BudgetContext.Consumer>
        {({ removeExpense }) => {
          return (
            <button
              className="item__delete--btn"
              onClick={() => removeExpense(exp.id)}
            >
              <i className="ion-ios-close-outline"></i>
            </button>
          );
        }}
      </BudgetContext.Consumer>
    );
  }
  renderExpList = (expList) => {
    return expList.map((exp) => {
      return (
        <div className="item clearfix" key={exp.id}>
          <div className="item__description">{exp.description}</div>
          <div className="right clearfix">
            <div className="item__value">- {exp.value}</div>
            <div className="item__percentage">{exp.perc}%</div>
            <div className="item__delete">{this.renderAdmin(exp)}</div>
          </div>
        </div>
      );
    });
  };
  render() {
    return (
      <div className="expenses">
        <h2 className="expenses__title">Expenses</h2>
        <div className="expenses__list">
          <BudgetContext.Consumer>
            {({ exp }) => this.renderExpList(Object.values(exp))}
          </BudgetContext.Consumer>
        </div>
      </div>
    );
  }
}

export default ExpenseList;
