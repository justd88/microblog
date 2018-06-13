import React from "react";

import Button from "@material-ui/core/Button";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

const UserList = props =>
  props.users.map(user => (
    <List>
      <ListItem>
        <ListItemText primary={user.name} />
        <ListItemSecondaryAction>
          <Button onClick={() => props.onAction(user.id)}>Unfollow</Button>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  ));

export default UserList;
