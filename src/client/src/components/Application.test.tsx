import * as React from "react"
import * as ReactDOM from "react-dom"
import Application from "./Application"

it("renders without crashing", () => {
  const div = document.createElement("div")
  ReactDOM.render(<Application />, div)
  ReactDOM.unmountComponentAtNode(div)
})
