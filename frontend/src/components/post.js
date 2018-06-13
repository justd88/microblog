import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TimeAgo from "react-timeago";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
const styles = theme => ({
  card: {
    minWidth: 275,
    marginBottom: 10
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

const Post = props => (
  <Card className={props.classes.card}>
    <CardContent>
      <Typography className={props.classes.title} color="textSecondary">
        {props.username}
      </Typography>
      {props.content.split("\\n").map(text => (
        <Typography variant="headline" component="p" noWrap>
          {text}
        </Typography>
      ))}

      <Typography className={props.classes.pos} color="textSecondary">
        <TimeAgo date={props.date} />
      </Typography>
    </CardContent>
    {props.canDelete && (
      <CardActions>
        <Button
          size="small"
          onClick={() => props.onDelete(props.postId)}
          className="btn-delete"
        >
          Delete
        </Button>
      </CardActions>
    )}
  </Card>
);
export default withStyles(styles)(Post);
