<ListItem
  key={`${item._id}`}
  bottomDivider
  topDivider
  hasTVPreferredFocus={undefined}
  tvParallaxProperties={undefined}>
  <Text>{item.priority}</Text>
  <ListItem.Title style={styles.itemTitle}>
    {item.summary}
  </ListItem.Title>
  <ListItem.Subtitle style={styles.itemSubtitle}>
    {item.owner_id === user?.id ? '(mine)' : ''}
  </ListItem.Subtitle>
  <ListItem.CheckBox
    checked={item.isComplete}
    checkedColor={COLORS.primary}
    iconType="material"
    checkedIcon="check-box"
    uncheckedIcon="check-box-outline-blank"
    onPress={() => toggleItemIsComplete(item._id)}
  />
  <Button
    type="clear"
    onPress={() => deleteItem(item._id)}
    icon={
      <Icon
        type="material"
        name="clear"
        size={12}
        color="#979797"
        tvParallaxProperties={undefined}
      />
    }
  />
</ListItem>
