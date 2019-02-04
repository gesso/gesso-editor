import * as React from "react";
import { connect, DispatchProp } from "react-redux";
import BlockLayoutView from "./BlockLayoutView";
import TaskLayoutView from "./TaskLayoutView";
import Menu from "./Menu";
import Modal from "./Modal";
import { ModeType } from "../types";
import { IState } from "../types";
import Editor from "./Editor";
import CodeViewLayout from "./CodeViewLayout";
// import * as flexLayoutDesigner from "./static/flex-layout-designer.jpg"

const initialState = {};

type State = Readonly<typeof initialState>;

// Component props.
export interface IComponentProps {}

// Props from Redux store.
interface IStateProps {
  mode: string;
  menu: {
    isVisible: boolean;
  };
  modal: {
    isVisible: boolean;
  };
}

interface IDispatchProps {}

type Props = IStateProps & IDispatchProps & IComponentProps & DispatchProp<any>;

// class App extends React.Component<Props, State> {
class LayoutContainer extends React.Component<Props, State> {
  public readonly state: State = initialState;

  constructor(props) {
    super(props);
    this.showModal = this.showModal.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChangeMode = this.handleChangeMode.bind(this);
    this.renderLayoutView = this.renderLayoutView.bind(this);
  }

  public render() {
    return (
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          margin: 0
        }}
        onClick={this.handleClickWhitespace}
        onDrag={this.handleDragWhitespace}>
        {this.props.menu.isVisible ? (
          <Menu onChangeMode={this.handleChangeMode} />
        ) : null}
        {this.props.modal.isVisible ? (
          <Modal
            title="Code editor"
            onClose={this.handleClose}
            // content={Editor}
          />
        ) : null}
        {this.renderLayoutView()}
      </div>
    );
  }

  private renderLayoutView = () => {
    if (this.props.mode === "block") {
      return <BlockLayoutView />;
    } else if (this.props.mode === "task") {
      return <TaskLayoutView />;
    } else if (
      this.props.mode ===
      "show code editor and make _all_ blocks searchable and browsable (with tabs?)"
    ) {
      return <CodeViewLayout />;
    } else if (
      this.props.mode ===
      "map tasks onto interactive graphical interfaces (based on React)"
    ) {
      return (
        <div>
          {/* <img src={flexLayoutDesigner} /> */}
          {/* https://github.com/Microsoft/TypeScript-React-Starter/issues/12 */}
          <strong>TODO:</strong> Include image of flex layout designer...
        </div>
      );
    } else {
      return <div>{this.props.mode}</div>;
    }
  };

  private handleChangeMode(mode: ModeType) {
    console.log(`Setting workflow mode: ${mode}`);
    this.props.dispatch({
      type: "SET_MODE",
      mode
    });
  }

  private handleClose() {
    this.props.dispatch({
      type: "CLOSE_MODAL"
      // targetBlock: blockView
    });
    this.props.dispatch({
      type: "OPEN_MENU"
      // targetBlock: blockView
    });
  }

  // TODO: Turn this into a Redux action and allow the different modals' states
  // to be saved, and their initial state to be reset.
  private showModal = event => {
    this.props.dispatch({
      type: "OPEN_MODAL"
    });
    this.props.dispatch({
      type: "CLOSE_MENU"
    });
  };

  private handleClickWhitespace = event => {
    event.stopPropagation();
    console.log("Clicked whitespace.");
    this.props.dispatch({
      type: "RESET_POINTER_REFERENCE_BLOCK_VIEW",
    });
  };

  private handleDragWhitespace = event => {
    event.stopPropagation();
    console.log("Dragged whitespace.");
  };
}

// Map Redux state to component props.
const mapStateToProps = (
  state: IState,
  componentProps: IComponentProps
): IStateProps => ({
  mode: state.mode,
  menu: state.menu,
  modal: state.modal
});

export default connect<IStateProps, IDispatchProps, IComponentProps>(
  mapStateToProps
)(LayoutContainer);
