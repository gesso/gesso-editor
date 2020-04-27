import * as _ from "lodash"
import projectNameGenerator = require("project-name-generator")
import * as uuidv4 from "uuid/v4"
import {
  IBlock,
  IBlockView,
  IBlockLayoutColumnView,
  IBlockLayoutView,
  ITaskLayoutView,
  ITask,
  ITaskView,
  ITaskLayoutColumnView,
  INote,
  INoteLayoutView,
  INoteView
} from "../types"

// ----------------------------------------------------------------------------
//
//  Mock database.
//
// ----------------------------------------------------------------------------

export const generateBlocks = (count: number): IBlock[] => {
  const blocks: IBlock[] = []
  for (let i = 0; i < count; i++) {
    blocks.push(generateBlock(true, 0.9))
  }
  return blocks
}

export const generateTasks = (count: number): ITask[] => {
  const tasks: ITask[] = []
  for (let i = 0; i < count; i++) {
    tasks.push(generateTask(true, 0.9))
  }
  return tasks
}

export const generateNotes = (count: number): INote[] => {
  const notes: INote[] = []
  for (let i = 0; i < count; i++) {
    notes.push(generateNote(true, 0.9))
  }
  return notes
}

interface IGenerateBlockLayoutInput {
  minColumnCount: number
  maxColumnCount: number
  tasks: IBlock[]
}

export const generateBlockViewLayout = (
  input: IGenerateBlockLayoutInput
): IBlockLayoutView => {
  const columnCount =
    input.minColumnCount +
    Math.random() * (input.maxColumnCount - input.minColumnCount)
  // TODO(@mgub): Add random factor to list length.
  const blocksPerColumnCount = input.tasks.length / columnCount
  const layout: IBlockLayoutView = {
    id: uuidv4(),
    name: projectNameGenerator({ words: 2, number: false }).dashed,
    columnViews: [],
    views: {}
  }
  // TODO(@mgub): Generate layout.
  _.times(columnCount, index => {
    // Create views for blocks.
    const blockViews: IBlockView[] = input.tasks
      .slice(
        index * blocksPerColumnCount,
        index * blocksPerColumnCount + blocksPerColumnCount
      )
      .map(block => {
        return {
          blockId: block.id,
          id: uuidv4(),
          hasFocus: false
        } as IBlockView
      })
    // Save block views.
    _.each(blockViews, blockView => {
      layout.views[blockView.id] = blockView
    })
    // Create column layout.
    const columnLayout: IBlockLayoutColumnView = {
      blockViews,
      id: uuidv4(),
      name: projectNameGenerator({ words: 2, number: false }).dashed
    }
    // Add column to layout.
    layout.columnViews.push(columnLayout)
  })
  return layout
}

interface IGenerateTaskLayoutInput {
  minColumnCount: number
  maxColumnCount: number
  tasks: ITask[]
}

export const generateTaskViewLayout = (
  input: IGenerateTaskLayoutInput
): ITaskLayoutView => {
  const columnCount =
    input.minColumnCount +
    Math.random() * (input.maxColumnCount - input.minColumnCount)
  // TODO(@mgub): Add random factor to list length.
  const tasksPerColumnCount = input.tasks.length / columnCount
  const layout: ITaskLayoutView = {
    id: uuidv4(),
    name: projectNameGenerator({ words: 2, number: false }).dashed,
    columnViews: [],
    views: {}
  }
  // TODO(@mgub): Generate layout.
  _.times(columnCount, index => {
    // Create views for tasks.
    const taskViews: ITaskView[] = input.tasks
      .slice(
        index * tasksPerColumnCount,
        index * tasksPerColumnCount + tasksPerColumnCount
      )
      .map(task => {
        return {
          taskId: task.id,
          id: uuidv4(),
          hasFocus: false
        } as ITaskView
      })
    // Save task views.
    _.each(taskViews, taskView => {
      layout.views[taskView.id] = taskView
    })
    // Create column layout.
    const columnLayout: ITaskLayoutColumnView = {
      taskViews,
      id: uuidv4(),
      name: projectNameGenerator({ words: 2, number: false }).dashed
    }
    // Add column to layout.
    layout.columnViews.push(columnLayout)
  })
  console.log("Task Layout: ")
  console.log(JSON.stringify(layout, null, 2))
  return layout
}

interface IGenerateNoteLayoutInput {
  minColumnCount: number
  maxColumnCount: number
  notes: INote[]
}

export const generateNoteViewLayout = (
  input: IGenerateNoteLayoutInput
): INoteLayoutView => {
  const columnCount = 1
  // TODO(@mgub): Add random factor to list length.
  const notesPerColumnCount = input.notes.length / columnCount
  const layout: INoteLayoutView = {
    id: uuidv4(),
    name: projectNameGenerator({ words: 2, number: false }).dashed,
    views: {},
    noteViews: []
  }
  // TODO(@mgub): Generate layout.
  _.times(columnCount, index => {
    // Create views for tasks.
    const noteViews: INoteView[] = input.notes
      .slice(
        index * notesPerColumnCount,
        index * notesPerColumnCount + notesPerColumnCount
      )
      .map(task => {
        return {
          noteId: task.id,
          id: uuidv4(),
          hasFocus: false
        } as INoteView
      })
    // Save task views.
    _.each(noteViews, taskView => {
      layout.views[taskView.id] = taskView
    })
    // Create column layout.
    // const columnLayout: ITaskLayoutColumnView = {
    //   taskViews,
    //   id: uuidv4(),
    //   name: projectNameGenerator({ words: 2, number: false }).dashed
    // }
    // Add column to layout.
    layout.noteViews.push(...noteViews)
  })
  console.log("Task Layout: ")
  console.log(JSON.stringify(layout, null, 2))
  return layout
}

export const generateBlock = (
  withChildren = true,
  childrenWithChildrenProbability = 0
): IBlock => {
  const blockNameWordCount = 2 + Math.random() * 3
  return {
    id: uuidv4(),
    name: projectNameGenerator({ words: blockNameWordCount, number: false })
      .dashed,
    blocks:
      withChildren && Math.random() <= childrenWithChildrenProbability
        ? _.times(Math.random() * 10).map(index => {
            return generateBlock(true, 0.5 * childrenWithChildrenProbability)
          })
        : []
  }
}

export const generateTask = (
  withChildren = true,
  childrenWithChildrenProbability = 0
): ITask => {
  const taskNameWordCount = 2 + Math.random() * 3
  return {
    id: uuidv4(),
    name: projectNameGenerator({ words: taskNameWordCount, number: false })
      .dashed,
    tasks:
      withChildren && Math.random() <= childrenWithChildrenProbability
        ? _.times(Math.random() * 10).map(index => {
            return generateTask(true, 0.5 * childrenWithChildrenProbability)
          })
        : []
  }
}

export const generateNote = (
  withChildren = true,
  childrenWithChildrenProbability = 0
): INote => {
  const noteNameWordCount = 50 + Math.random() * 3
  return {
    id: uuidv4(),
    name: projectNameGenerator({
      words: noteNameWordCount,
      number: false
    }).spaced,
    notes:
      withChildren && Math.random() <= childrenWithChildrenProbability
        ? _.times(Math.random() * 10).map(index => {
            return generateNote(true, 0.5 * childrenWithChildrenProbability)
          })
        : []
  }
}
