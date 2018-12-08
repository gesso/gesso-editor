import * as React from "react"
import { Icon } from "react-icons-kit"
import { check, code, gitBranch, listUnordered } from "react-icons-kit/oct/"
import { iconCodeStyle } from "./Ico.style"

type IcoProps = IIconCode

interface IIconCode {
  name: "code"
  onSelectOption?: (option: string) => void
}

export const Ico = (input: IcoProps) => {
  if (input.name === "code") {
    return <IconCode onSelectOption={input.onSelectOption} />
  } else {
    return <div /> // Default icon (random option)
  }
}

export const IconCheck = (props = {}) => {
  return (
    <div>
      <Icon style={{ color: "#F4A261" }} icon={check} />
    </div>
  )
}

const IconListUnordered = (props = {}) => {
  const handleOnClick = event => {
    alert("expand this codeblock inline with control icons on top & divider")
  }
  return (
    <div style={{ marginLeft: "auto" }} onClick={handleOnClick}>
      <Icon style={{ color: "#F4A261" }} icon={listUnordered} />
    </div>
  )
}

const IconCode = props => {
  const handleOnClick = event => {
    props.onSelectOption("code")
  }
  return (
    <div onClick={handleOnClick} style={iconCodeStyle}>
      <Icon style={{ color: "#F4A261" }} size={18} icon={code} />
    </div>
  )
}

const IconBranch = () => {
  const handleOnClick = event => {
    alert("complete this codeblock")
  }
  return (
    <span onClick={handleOnClick}>
      <Icon style={{ color: "#F4A261" }} icon={gitBranch} />
    </span>
  )
}

export default Ico
