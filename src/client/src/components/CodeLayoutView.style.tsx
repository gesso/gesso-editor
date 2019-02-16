import * as React from "react"

export const styles = {
  container: {
    alignItems: "center",
    // backgroundColor: "red",
    display: "flex",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    margin: 0,
    transition: "all .5s linear",
    overflowX: "auto",
    whiteSpace: "nowrap",
    overflowY: "auto"
  } as React.CSSProperties,
  left: {
    float: "left",
    height: "100%",
    width: "60%",
    margin: 0,
    padding: 0,
    border: 0
  } as React.CSSProperties,
  right: {
    float: "left",
    height: "100%",
    width: "40%",
    margin: 0,
    padding: 0,
    border: 0
  } as React.CSSProperties
}
