// import { emit, on } from "message"
// import { info, warning } from "display"
// import { window } from "ui"
// import { Window, Promopt } from "Ui"

// type Input = any

// type Output = any

// export const fn = () => {
//   // <type-code-here>
// }

// export const fn = (option: Input) => {
//   const output: Output = {}

//   // <type-code-here>

//   return output
// }

// // Exmaple 1
// const emptyExample = () => {
//   return null;
// }

// // Exmaple 2
// const logicExample = () => {
//   return null;
// }

// // exmaple 3
// const reactExample = () => {
//   return null;
//   return (
//     <window x={34} y={85}>
//       <div></div>
//       <div><strong></div>
//     </window>
//   )
// }

// // exmaple 7
// const exampleEmit = () => {
//   //> in init() function
//   emit("channel-name")
//   //< in init() function

//   on("channel-name", emit("channel-name", "lo")) // emit "lo" on channel
  
//   emit("channel-name", { distance: { in: 12, cm: 30 }, due: Date.parse("1970-01-01 00:00:00") }) // includes timestamp, source info, usage statistics
//   return null;
// }

// // Exmaple 8
// const exampleOn = () => {
//   //> in init() function
//   on("channel-name")
//   //< in init() function
  
//   on("channel-name", (incoming) => {
//     if (incoming.distance.in > 6) {
//       info("more than half")
//     }
//     if (incoming.due === Date.parse("1970-01-01 00:00:00") {
//       warning("It's a UNIX system!")
//     }
//   }) // includes timestamp, source info, usage statistics
//   return null;
// }

// // Exmaple 4
// const interactionExample = () => {
//   return null;
//   return (
//     <Prompt
//       x={"center"}
//       y={"center"}
//       modal={true}
//       prompt="Are you sure you want to quit?"
//       options={{ a: "Yes", b: "No" }}
//       />
//   )
// }

// // Exmaple 5
// const repoReactExample = () => {
//   return null;
//   return (
//     <RepoItem id={"<some-uuid-from-a-repo>"} x={34} y={85}>
//       <div></div>
//       <div><strong></div>
//     </RepoItem>
//   )
// }

// // Exmaple 6
// const repoInteractionExample = () => {
//   return null;
//   return (
//     <Window x={34} y={85}>
//       <div></div>
//       <div><strong></div>
//     </Window>
//   )
// }