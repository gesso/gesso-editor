import * as React from "react"

export const styles = {
  overlay: {
    // border: "1px black solid",
    // color: "#a8a8a8",
    // padding: "10px",
    // width: "800px",
    // height: "600px",
    border: "none",

    // display: "none" /* Hidden by default */,
    position: "fixed" /* Stay in place */,
    zIndex: 1 /* Sit on top */,
    left: 0,
    top: 0,
    width: "100%" /* Full width */,
    height: "100%" /* Full height */,
    overflow: "auto" /* Enable scroll if needed */,
    backgroundColor: "rgba(0, 0, 0, 0.3)" /* Black w/ opacity */,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  } as React.CSSProperties,

  container: {
    borderRadius: "5px",
    backgroundColor: "#ffffff",
    // margin: "15% auto",
    // "0 auto", // 0% from the top and centered horizontally.
    // "15% auto" // 15% from the top and centered horizontally.,
    padding: 0,
    border: "none",
    width: "80%" /* Could be more or less, depending on screen size */
  } as React.CSSProperties,

  content: {
    backgroundColor: "none",
    margin: "20px",
    border: "none"
    // width: "100
  } as React.CSSProperties,

  section: {
    // padding: "20px"
    padding: "20px 0px 20px 0px"
  } as React.CSSProperties
}
