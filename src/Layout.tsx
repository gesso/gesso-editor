import * as React from "react";
import { connect, DispatchProp } from "react-redux";
import ColumnLayout from "./ColumnLayout";
import { IBlock, ILayout, IState } from "./types";

const styles = {
  layoutContainer: {
    alignItems: "center",
    display: "flex",
    height: "100%",
    justifyContent: "center",
    margin: 0
  },
  layout: {
    border: "1px solid #e0e0e",
    borderRadius: "5px",
    marginLeft: "20px",
    marginRight: "20px",
    minHeight: "50px",
    width: "200px"
  }
};

// Component props.
export interface IOwnProps {
  hack?: void;
}

// Props from Redux store.
interface IStateProps {
  layout?: ILayout;
}

interface IDispatchProps {
  // onSomeEvent: () => void;
  hack?: void;
}

type Props = IStateProps & IDispatchProps & IOwnProps & DispatchProp<any>;

interface IStateDELETE {
  targetBlock: IBlock | null;
}

class LayoutView extends React.Component<Props, IStateDELETE> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    console.log(JSON.stringify(this.props.layout, null, 2));
    return (
      <div style={styles.layoutContainer}>
        <div style={styles.layout}>Holder</div>
        {this.props.layout.columnLayouts.map(columnLayout => {
          return <ColumnLayout key={columnLayout.id} id={columnLayout.id} />;
        })}
        <div style={styles.layout}>Holder</div>
      </div>
    );
  }
}

// Map Redux state to component props.
const mapStateToProps = (state: IState, ownProps: IOwnProps): IStateProps => ({
  layout: state.layout
});

export default connect<IStateProps, IDispatchProps, IOwnProps>(mapStateToProps)(
  LayoutView
);
