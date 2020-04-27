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
  },
  layoutContainer: {
    border: "1px solid #e0e0e",
    borderRadius: "5px",
    marginLeft: "20px",
    marginRight: "20px",
    minHeight: "50px",
    width: "400px"
  } as React.CSSProperties,

  columnLayout: {
    backgroundColor: "none",
    border: "none",
    borderRadius: "20px",
    color: "rgb(55, 53, 47)",
    fontWeight: 600,
    padding: "10px",
    textAlign: "center",
    marginTop: "125px",
    marginBottom: "16px"
  } as React.CSSProperties
}
