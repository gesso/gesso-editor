# Codeboard

[![DeepScan grade](https://deepscan.io/api/teams/2456/projects/3534/branches/31401/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=2456&pid=3534&bid=31401) 

- Introduces system/application designer role on software development teams and emphasizes code re-use. The designer thinks about the operation and design of the system/application. This role assembles systems (or applications) from blocks delivered by programmers. The role can request revisions on blocks (with instructions in a comment), 

- This type of IDE can help non-development teams leverage the automation potential of programming without needing to learn programming language syntax. Instead, systems and applications can be planned in terms of block-level functionality at a natural level of abstraction. The blocks are then added to a backlock of work organized into a kanban style board that programmers can assign and deliver. The system composer sees if there's an update available and can then update the block where it's used in the system or application. In other words, DSLs can be defined and used to specify systems by system designers while they're implemented in parallel by software developers. This tool is designed to facilitate more direct, operational communications between teams working at different levels of abstraction that have the common interest of automation.

- Documentation and comments can be added inline (and later compiled for higher level consumption) or added as annotations so they don't clutter the code.

## Roles

1. Programmer (software engineer)
2. Designer (system designer)
3. Users (of deployed apps)

There's a back and forth between programmers, designers, and users in the form of requests:

- for better documentation or explanation
- to request a new block level feature

### Programmer

- Edit source code in blocks
- Possibly manage state of blocks on the board (e.g., move from "doing" to "ready for testing")
- Further decompose a block at the specified level of abstraction into sub-blocks that can be added to the backlog (this meanas programmers also use the block level editor to some extent)
- Search code blocks while coding (might be libraries)

### Concepts Explored

- Speed
- Memory. The editor will "forget" (remove from display) elements that are not engaged with enough.
- Focus
- Learning
- Search

# References

This is based on a re-thinking of Looper to include code management and development process organization tools.
