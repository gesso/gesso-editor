import {
  generateBlocks,
  generateBlockViewLayout,
  generateTasks,
  generateTaskViewLayout,
  generateNotes,
  generateNoteViewLayout
} from "../../model"
import {
  IBlock,
  IBlockLayoutView,
  ITask,
  ITaskLayoutView,
  INote,
  INoteLayoutView
} from "../../types"

export const fetchBlocks = (count: number): IBlock[] => {
  return generateBlocks(count)
}

export const fetchTasks = (count: number): ITask[] => {
  return generateTasks(count)
}

export const fetchNotes = (count: number): INote[] => {
  return generateNotes(count)
}

export const fetchBlockViewLayout = (
  maxColumnCount: number,
  blocks: IBlock[]
): IBlockLayoutView => {
  return generateBlockViewLayout({
    minColumnCount: 1,
    maxColumnCount,
    tasks: blocks
  })
}

export const fetchTaskViewLayout = (
  minColumnCount: number = 0,
  maxColumnCount: number,
  tasks: ITask[]
): ITaskLayoutView => {
  return generateTaskViewLayout({
    minColumnCount,
    maxColumnCount,
    tasks
  })
}

export const fetchNoteViewLayout = (
  minColumnCount: number = 0,
  maxColumnCount: number,
  notes: INote[]
): INoteLayoutView => {
  console.log("fetchNoteViewLayout")
  const layout = generateNoteViewLayout({
    minColumnCount,
    maxColumnCount,
    notes
  })
  console.log(layout)
  return layout
}
