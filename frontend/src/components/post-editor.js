import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: `calc(100% - ${theme.spacing.unit * 2}px)`
  },
  card: {
    marginBottom: 10
  }
});

class PostEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", error: "" };
  }
  onChangeValue = value => {
    this.setState({ value });
  };
  validateInput() {
    const value = this.state.value;
    if (value.length === 0) {
      this.setState({
        error: "Your mind is empthy? Please write something for publish!"
      });
      return false;
    }
    if (value.length > 150) {
      this.setState({
        error: "The message is too long (MAX 150 characters allowed)"
      });
      return false;
    }
    return true;
  }
  onPublishContent = () => {
    if (this.validateInput()) {
      this.props.onPublish(this.state.value);
      this.setState({ value: "", error: "" });
    }
  };

  render = () => {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <Grid container="container">
          <Grid xs={8}>
            <FormControl
              error={this.state.error.length > 0}
              aria-describedby="content-error-text"
            >
              <TextField
                id="post-editor"
                label="What is in your mind?"
                placeholder="Express yourself"
                className={classes.textField}
                margin="normal"
                multiline
                value={this.state.value}
                onChange={evt => this.onChangeValue(evt.target.value)}
              />
              <FormHelperText id="content-error-text">
                {this.state.error}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid xs={4}>
            <Button
              id="submitPost"
              variant="contained"
              color="primary"
              onClick={() => this.onPublishContent()}
              fullWidth="fullWidth"
            >
              Publish
            </Button>
          </Grid>
        </Grid>
      </Card>
    );
  };
}
export default withStyles(styles)(PostEditor);
