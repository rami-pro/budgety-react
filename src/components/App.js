import React, { Component } from "react";

import { BudgetStore } from "../contexts/BudgetContext";
import Top from "./top";
import Bottom from "./bottom";
import Budget from "./Budget";
import ListsContainer from "./ListsContainer";
import InputBar from "./InputBar";

export class App extends Component {
  render() {
    return (
      <div>
        <BudgetStore>
          <Top>
            <Budget />
          </Top>
          <Bottom>
            <InputBar />
            <ListsContainer />
          </Bottom>
        </BudgetStore>
      </div>
    );
  }
}

export default App;
