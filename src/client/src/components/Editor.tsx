import * as React from "react"
import { Value } from "slate"
import { Editor as SlateEditor } from "slate-react"
import EditCode from "slate-edit-code"
import { styles } from "./Editor.styles"

// Component props.
export interface IComponentProps {}

// Props from Redux store.
interface IStateProps {}

interface IDispatchProps {}

type Props = IStateProps & IDispatchProps & IComponentProps // & DispatchProp<any>

// <SLATE>
// Initial editor state value.
export const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: "block",
        type: "code",
        data: {
          language: "js"
        },
        nodes: [
          {
            object: "block",
            type: "code_line",
            nodes: [
              {
                object: "text",
                leaves: [
                  {
                    text: "// A simple FizzBuzz implementation."
                  }
                ]
              }
            ]
          },
          {
            object: "block",
            type: "code_line",
            nodes: [
              {
                object: "text",
                leaves: [
                  {
                    text: "for (var i = 1; i <= 100; i++) {"
                  }
                ]
              }
            ]
          },
          {
            object: "block",
            type: "code_line",
            nodes: [
              {
                object: "text",
                leaves: [
                  {
                    text: "  if (i % 15 == 0) {"
                  }
                ]
              }
            ]
          },
          {
            object: "block",
            type: "code_line",
            nodes: [
              {
                object: "text",
                leaves: [
                  {
                    text: "    console.log('Fizz Buzz');"
                  }
                ]
              }
            ]
          },
          {
            object: "block",
            type: "code_line",
            nodes: [
              {
                object: "text",
                leaves: [
                  {
                    text: "  } else if (i % 5 == 0) {"
                  }
                ]
              }
            ]
          },
          {
            object: "block",
            type: "code_line",
            nodes: [
              {
                object: "text",
                leaves: [
                  {
                    text: "    console.log('Buzz');"
                  }
                ]
              }
            ]
          },
          {
            object: "block",
            type: "code_line",
            nodes: [
              {
                object: "text",
                leaves: [
                  {
                    text: "  } else if (i % 3 == 0) {"
                  }
                ]
              }
            ]
          },
          {
            object: "block",
            type: "code_line",
            nodes: [
              {
                object: "text",
                leaves: [
                  {
                    text: "    console.log('Fizz');"
                  }
                ]
              }
            ]
          },
          {
            object: "block",
            type: "code_line",
            nodes: [
              {
                object: "text",
                leaves: [
                  {
                    text: "  } else {"
                  }
                ]
              }
            ]
          },
          {
            object: "block",
            type: "code_line",
            nodes: [
              {
                object: "text",
                leaves: [
                  {
                    text: "    console.log(i);"
                  }
                ]
              }
            ]
          },
          {
            object: "block",
            type: "code_line",
            nodes: [
              {
                object: "text",
                leaves: [
                  {
                    text: "  }"
                  }
                ]
              }
            ]
          },
          {
            object: "block",
            type: "code_line",
            nodes: [
              {
                object: "text",
                leaves: [
                  {
                    text: "}"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
})

// ----------------------------------------------------------------------------
//
//  Slate Plugins.
//
// ----------------------------------------------------------------------------

// - Edit code.
const editCodeOptions = {
  containerType: "code",
  lineType: "code_line",
  exitBlockType: null
}
const plugins = [EditCode(editCodeOptions)]
// </SLATE>

class Editor extends React.Component<Props, {}> {
  public state = {
    // Slate.
    value: initialValue
  }

  public render() {
    return (
      // <CloseOnEscape
      //   onEscape={() => {
      //     this.props.onKeyEscape()
      //   }}>
      <div style={styles.container} onClick={this.handleClick}>
        <SlateEditor
          value={this.state.value}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          plugins={plugins}
        />
      </div>
      // </CloseOnEscape>
    )
  }

  // <SLATE>
  // On change, update the app's React state with the new editor value.
  public handleChange = ({ value }) => {
    this.setState({ value })
  }

  private handleKeyDown(event) {
    event.stopPropagation()
  }
  // </SLATE>

  private handleClick(event) {
    event.stopPropagation()
  }
}

export default Editor
