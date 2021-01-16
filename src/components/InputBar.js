import React, { Component } from "react";
import BudgetContext from "../contexts/BudgetContext";

export class InputBar extends Component {
  static contextType = BudgetContext;
  state = { type: "inc", description: "", value: "" };
  constructor(props) {
    super(props);
    this.selectRef = React.createRef();
    this.descriptionRef = React.createRef();
    this.valueRef = React.createRef();
  }
  onFormSubmit = () => {
    const { newIncome, newExpense } = this.context;
    if (this.state.type === "inc") {
      return newIncome(this.state);
    }
    newExpense(this.state);
  };

  render() {
    return (
      <div className="add">
        <div className="add__container">
          <select
            className="add__type"
            ref={this.selectRef}
            defaultValue={this.state.type}
            onChange={() =>
              this.setState({ type: this.selectRef.current.value })
            }
          >
            <option value="inc">+</option>
            <option value="exp">-</option>
          </select>
          <input
            type="text"
            className="add__description"
            placeholder="Add description"
            value={this.state.description}
            ref={this.descriptionRef}
            onChange={(e) => {
              this.setState({ description: this.descriptionRef.current.value });
            }}
          />
          <input
            type="number"
            className="add__value"
            placeholder="Value"
            value={this.state.value}
            ref={this.valueRef}
            onChange={() => {
              this.setState({ value: this.valueRef.current.value });
            }}
          />
          <button className="add__btn" onClick={this.onFormSubmit}>
            <i className="ion-ios-checkmark-outline"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default InputBar;
