import React, { Fragment } from "react";
import MoreButton from "../components/MoreButton";
import Sushi from "../components/Sushi";

const SushiContainer = props => {
  return (
    <Fragment>
      <div className="belt">
        {props.allSushis.map(sushi => (
          <Sushi
            sushi={sushi}
            key={sushi.id}
            sushiEaten={props.sushiEaten}
            sushiTransaction={props.sushiTransaction}
          />
        ))}
        <MoreButton getNewSushiSet={props.getNewSushiSet} />
      </div>
    </Fragment>
  );
};

export default SushiContainer;
