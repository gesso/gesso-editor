import * as React from "react"

export const styles = {
  overlay: {
    border: "1px black solid",
    color: "#a8a8a8",
    padding: "10px",
    // width: "800px",
    // height: "600px",

    // display: "none" /* Hidden by default */,
    position: "fixed" /* Stay in place */,
    zIndex: 1 /* Sit on top */,
    left: 0,
    top: 0,
    width: "100%" /* Full width */,
    height: "100%" /* Full height */,
    overflow: "auto" /* Enable scroll if needed */,
    // backgroundColor: "rgb(0,0,0)" /* Fallback color */,
    backgroundColor: "rgba(0,0,0,0.4)" /* Black w/ opacity */
  } as React.CSSProperties,

  content: {
    borderRadius: "5px",
    backgroundColor: "#fefefe",
    margin: "15% auto" /* 15% from the top and centered */,
    padding: "20px",
    border: "1px solid #888",
    width: "80%" /* Could be more or less, depending on screen size */
  } as React.CSSProperties
}
