import React, { Component } from "react";
import { nanoid } from "nanoid";
import _ from "lodash";

const Context = React.createContext();

export class BudgetStore extends Component {
  static objectMap = (obj, fn) =>
    Object.fromEntries(
      Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)])
    );

  state = {
    inc: {},
    exp: {},
    total: { inc: 0, exp: 0 },
    expPercentage: 0,
    budget: 0,
  };

  componentDidUpdate() {
    this.calcPercentage();
  }

  calcPercentage = () => {
    const expPercentage = Math.round(
      (this.state.total.exp / this.state.total.inc) * 100
    );
    if (expPercentage === this.state.expPercentage) return;

    const expListUpdated = BudgetStore.objectMap(this.state.exp, (exp) => {
      exp.perc = Math.round((exp.value / this.state.total.inc) * 100);
      return exp;
    });
    this.setState({ exp: expListUpdated, expPercentage });
  };

  newIncome = (inc) => {
    if (!inc.description || !inc.value) return;

    const newInc = { ...inc, id: nanoid(), value: parseInt(inc.value) };
    const totalInc = this.state.total.inc + newInc.value;
    const budget = totalInc - this.state.total.exp;

    this.setState({
      inc: { ...this.state.inc, [newInc.id]: newInc },
      total: { inc: totalInc, exp: this.state.total.exp },
      budget,
    });
  };

  newExpense = (exp) => {
    if (!exp.description || !exp.value) return;

    const newExp = { ...exp, id: nanoid(), value: parseInt(exp.value) };
    const totalExp = this.state.total.exp + newExp.value;
    const budget = this.state.total.inc - totalExp;

    this.setState({
      exp: { ...this.state.exp, [newExp.id]: newExp },
      total: { exp: totalExp, inc: this.state.total.inc },
      budget,
    });
  };

  removeIncome = (id) => {
    const totalInc = this.state.total.inc - this.state.inc[id].value;
    const incList = _.omit(this.state.inc, id);
    const budget = totalInc - this.state.total.exp;

    this.setState({
      inc: incList,
      total: { inc: totalInc, exp: this.state.total.exp },
      budget,
    });
  };

  removeExpense = (id) => {
    const totalExp = this.state.total.exp - this.state.exp[id].value;
    const expList = _.omit(this.state.exp, id);
    const budget = this.state.total.inc - totalExp;

    this.setState({
      exp: expList,
      total: { exp: totalExp, inc: this.state.total.inc },
      budget,
    });
  };
  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          removeExpense: this.removeExpense,
          removeIncome: this.removeIncome,
          newExpense: this.newExpense,
          newIncome: this.newIncome,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;
