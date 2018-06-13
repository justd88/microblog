import React from "react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Snackbar from "@material-ui/core/Snackbar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";

import Post from "../../components/post";
import PostEditor from "../../components/post-editor";
import {
  postPublishAction,
  loadTimeline,
  postDeleteAction
} from "../../modules/timeline";
class Home extends React.Component {
  componentDidMount = () => {
    this.props.loadTimeline();
  };
  createPostList = () => {
    return this.props.timeline.posts
      .slice(0)
      .reverse()
      .map(post => (
        <Grid xs={12} className="timline-posts">
          <Post
            postId={post.id}
            username={post.author_name}
            content={post.content}
            date={post.created_at}
            canDelete={post.author_id === "1"}
            onDelete={this.props.postDeleteAction}
          />
        </Grid>
      ));
  };
  render = () => {
    return (
      <Grid container="container">
        <Grid xs={12}>
          <PostEditor onPublish={this.props.postPublishAction} />
        </Grid>

        {this.createPostList()}
        <Snackbar
          open={this.props.timeline.delete}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <SnackbarContent
            className="publish-error"
            message="Post Has been deleted"
          />
        </Snackbar>
        <Snackbar
          open={this.props.timeline.submit}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <SnackbarContent
            className="publish-success"
            message="Post Has been created"
          />
        </Snackbar>
      </Grid>
    );
  };
}
const mapStateToProps = state => ({ timeline: state.timeline });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      postPublishAction,
      postDeleteAction,
      loadTimeline
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
