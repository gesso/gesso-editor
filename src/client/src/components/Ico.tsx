import * as React from "react";
import { Icon } from "react-icons-kit";
import {
  check,
  code,
  gitBranch,
  listUnordered,
  plus,
  tasklist,
  fold,
  unfold
} from "react-icons-kit/oct/";
import { iconCodeStyle } from "./Ico.style";

type IcoProps =
  | IIconCode
  | IIconCompositeCode
  | IIconCreate
  | IIconTask
  | IIconCompositeTask;

interface IIconCode {
  name: "code";
  onSelectOption?: (option: string) => void;
}

interface IIconCompositeCode {
  name: "compositeCode";
  onSelectOption?: (option: string) => void;
}

interface IIconCreate {
  name: "create";
  onSelectOption?: (option: string) => void;
}

interface IIconTask {
  name: "task";
  onSelectOption?: (option: string) => void;
}

interface IIconCompositeTask {
  name: "compositeTask";
  onSelectOption?: (option: string) => void;
}

export const Ico = (input: IcoProps) => {
  if (input.name === "code") {
    return <IconCode onSelectOption={input.onSelectOption} />;
  } else if (input.name === "compositeCode") {
    return <IconCompositeCode onSelectOption={input.onSelectOption} />;
  } else if (input.name === "create") {
    return <IconCreate onSelectOption={input.onSelectOption} />;
  } else if (input.name === "task") {
    return <IconTask onSelectOption={input.onSelectOption} />;
  } else if (input.name === "compositeTask") {
    return <IconCompositeTask onSelectOption={input.onSelectOption} />;
  } else {
    return <div />; // Default icon (random option)
  }
};

export const IconCheck = (props = {}) => {
  return (
    <div>
      <Icon style={{ color: "#F4A261" }} icon={check} />
    </div>
  );
};

const IconListUnordered = (props = {}) => {
  const handleOnClick = event => {
    alert("expand this codeblock inline with control icons on top & divider");
  };
  return (
    <div style={{ marginLeft: "auto" }} onClick={handleOnClick}>
      <Icon style={{ color: "#F4A261" }} icon={listUnordered} />
    </div>
  );
};

const IconCode = props => {
  const handleOnClick = event => {
    event.stopPropagation();
    props.onSelectOption("code");
  };
  return (
    <div onClick={handleOnClick} style={iconCodeStyle}>
      <Icon style={{ color: "#F4A261" }} size={18} icon={code} />
    </div>
  );
};

const IconCompositeCode = props => {
  const handleOnClick = event => {
    event.stopPropagation();
    props.onSelectOption("composite code");
  };
  return (
    <div onClick={handleOnClick} style={iconCodeStyle}>
      <Icon style={{ color: "#F4A261" }} size={18} icon={unfold} />
    </div>
  );
};

const IconCreate = props => {
  const handleOnClick = event => {
    event.stopPropagation();
    props.onSelectOption("create");
  };
  return (
    <div onClick={handleOnClick} style={iconCodeStyle}>
      <Icon style={{ color: "#F4A261" }} size={18} icon={plus} />
    </div>
  );
};

const IconTask = props => {
  const handleOnClick = event => {
    event.stopPropagation();
    props.onSelectOption("task");
  };
  return (
    <div onClick={handleOnClick} style={iconCodeStyle}>
      <Icon style={{ color: "#F4A261" }} size={18} icon={check} />
    </div>
  );
};

const IconCompositeTask = props => {
  const handleOnClick = event => {
    event.stopPropagation();
    props.onSelectOption("create");
  };
  return (
    <div onClick={handleOnClick} style={iconCodeStyle}>
      <Icon style={{ color: "#F4A261" }} size={18} icon={tasklist} />
    </div>
  );
};

const IconBranch = () => {
  const handleOnClick = event => {
    alert("complete this codeblock");
  };
  return (
    <span onClick={handleOnClick}>
      <Icon style={{ color: "#F4A261" }} icon={gitBranch} />
    </span>
  );
};

export default Ico;
