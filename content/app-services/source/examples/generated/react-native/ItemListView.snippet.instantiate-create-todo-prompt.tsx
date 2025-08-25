<CreateToDoPrompt
  onSubmit={({summary, priority}) => {
    setShowNewItemOverlay(false);
    createItem({summary, priority});
  }}
/>
