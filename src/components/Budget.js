import React, { Component } from "react";
import BudgetContext from "../contexts/BudgetContext";

export class Budget extends Component {
  render() {
    return (
      <div className="budget">
        <div className="budget__title">
          Available Budget in
          <span className="budget__title--month">%MONTH%</span>:
        </div>

        <div className="budget__value">
          <BudgetContext.Consumer>
            {({ budget }) => budget}
          </BudgetContext.Consumer>
        </div>

        <div className="budget__income clearfix">
          <div className="budget__income--text">Income</div>
          <div className="right">
            <div className="budget__income--value">
              <BudgetContext.Consumer>
                {({ total }) => `+ ${total.inc}`}
              </BudgetContext.Consumer>
            </div>
            <div className="budget__income--percentage">&nbsp;</div>
          </div>
        </div>

        <div className="budget__expenses clearfix">
          <div className="budget__expenses--text">Expenses</div>
          <div className="right clearfix">
            <div className="budget__expenses--value">
              <BudgetContext.Consumer>
                {({ total }) => `- ${total.exp}`}
              </BudgetContext.Consumer>
            </div>
            <div className="budget__expenses--percentage">
              <BudgetContext.Consumer>
                {({ expPercentage }) => `${expPercentage} %`}
              </BudgetContext.Consumer>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Budget;
