// import * as React from "react"
// import { Provider } from "react-redux"

// const styles = {
//   modalOverlayDiv: {
//     position: "fixed",
//     top: 0,
//     right: 0,
//     bottom: 0,
//     left: 0,
//     height: "100%",
//     width: "100%",
//     zIndex: 1000,
//     backgroundColor: "rgba(0, 0, 0, .65)"
//   },
//   modalContentDiv: {
//     position: "fixed",
//     top: 0,
//     right: 0,
//     bottom: 0,
//     left: 0,
//     zIndex: 10000,
//     overflow: "auto",
//     textAlign: "center",
//     padding: "4px",
//     cursor: "pointer"
//   },
//   // modalContentDiv:after {
//   //     vertical-align: middle;
//   //     display: inline-block;
//   //     height: 100%;
//   //     margin-left: -.05em;
//   //     content: '';
//   // },
//   modalDialogDiv: {
//     position: "relative",
//     outline: 0,
//     width: "auto",
//     display: "inline-block",
//     verticalAlign: "middle",
//     boxSizing: "border-box",
//     maxWidth: "auto",
//     cursor: "default",
//     borderRadius: "4px"
//   }
// }

// type BlockType = "block"

// type TaskType = "task"

// type ModeType = BlockType | TaskType

// interface IState {
//   mode: ModeType
// }

// class App extends React.Component<{}, IState> {
//   constructor(props) {
//     super(props)

//     this.state = {
//       mode: "block"
//     }
//   }

//   // Reference: https://medium.com/@danparkk/react-modals-scalable-customizable-neat-components-f2088d60f3d3
//   // public render() {
//   //   const overlayStyle = this.props.overlayStyle ? this.props.overlayStyle : {}
//   //   const contentStyle = this.props.contentStyle ? this.props.contentStyle : {}
//   //   const dialogStyle = this.props.dialogStyle ? this.props.dialogStyle : {}
//   //   return (
//   //     <div>
//   //       <div className="modal-overlay-div" style={overlayStyle} />
//   //       <div
//   //         className="modal-content-div"
//   //         style={contentStyle}
//   //         onClick={this.onOverlayClick.bind(this)}>
//   //         <div
//   //           className="modal-dialog-div"
//   //           style={dialogStyle}
//   //           onClick={this.onDialogClick}>
//   //           {this.props.children}
//   //         </div>
//   //       </div>
//   //     </div>
//   //   )
//   // }

//   private handleClickModeOption = mode => {
//     return event => {
//       this.setMode(mode)
//     }
//   }

//   private handleClickWhitespace = event => {
//     console.log("Clicked whitespace.")
//   }

//   private handleDragWhitespace = event => {
//     console.log("Dragged whitespace.")
//   }

//   private setMode = (mode: ModeType) => {
//     this.setState({
//       mode
//     })
//   }
// }

// export default App
