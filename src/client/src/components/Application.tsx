import * as React from "react"
import LayoutContainer from "./LayoutContainer"

const initialState = {}

type State = Readonly<typeof initialState>

// Component props.
export interface IComponentProps {}

// Props from Redux store.
interface IStateProps {}

interface IDispatchProps {}

type Props = IStateProps & IDispatchProps & IComponentProps // & DispatchProp<any>

class Application extends React.Component<Props, State> {
  public readonly state: State = initialState

  constructor(props) {
    super(props)
  }

  public render() {
    return <LayoutContainer />
  }
}

export default Application
