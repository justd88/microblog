import React from "react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import { unFollowUser, loadFollowers } from "../../modules/user";
import UserList from "../../components/user-list";
class Followers extends React.Component {
  componentDidMount = () => {
    this.props.loadFollowers();
  };

  render = () => {
    const { followers } = this.props;
    return (
      <Grid container="container">
        <Grid xs="12">
          <UserList users={followers} onAction={this.props.unFollowUser} />
        </Grid>
      </Grid>
    );
  };
}
const mapStateToProps = state => ({ followers: state.user.followers });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadFollowers,
      unFollowUser
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Followers);
