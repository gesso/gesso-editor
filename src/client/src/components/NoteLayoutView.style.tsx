import * as React from "react"

export const styles = {
  container: {
    alignItems: "center",
    // backgroundColor: "red",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    margin: 0,
    transition: "all .5s linear",
    overflowX: "auto",
    whiteSpace: "nowrap",
    overflowY: "auto"
  } as React.CSSProperties,
  layoutContainer2: {
    alignItems: "center",
    flexDirection: "column",
    display: "flex",
    margin: 0
  } as React.CSSProperties,
  layout: {
    border: "1px solid #e0e0e",
    borderRadius: "5px",
    marginLeft: "20px",
    marginRight: "20px",
    minHeight: "50px",
    width: "200px"
  } as React.CSSProperties
}
