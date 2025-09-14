# onDragStart 
- Stores information about what's being dragged
- Sets up the drag operation (copy, move, link)
- Often used to provide visual feedback (like making item semi-transparent)
- Can store data to transfer between drag source and drop target

# onDragEnd
- Cleanup operations
- Reset visual states
- Clear temporary drag-related data
- Always fires, regardless of whether drop was successful

# onDragOver
- Must call e.preventDefault() to allow dropping
- Updates visual indicators for valid drop zones
- Sets the cursor/visual feedback for the drag operation
- Fires repeatedly while hovering (like mouseover)

# onDragLeave
- Remove hover effects/highlights
- Clean up temporary visual states
- Opposite of dragOver - fired when leaving the drop zone