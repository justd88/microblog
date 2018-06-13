import update from "immutability-helper";
import axios from "axios";

export const USER_CONNECTIONS_LOAD = "user/CONNECTIONS_LOAD";
export const USER_CONNECTIONS_LOAD_FOLLOWERS =
  "user/CONNECTIONS_LOAD_FOLLOWERS";
export const USER_CONNECTIONS_LOAD_FOLLOWING =
  "user/CONNECTIONS_LOAD_FOLLOWING";
export const USER_CONNECTIONS_FOLLOW = "user/CONNECTIONS_FOLLOW";
export const USER_CONNECTIONS_UNFOLLOW = "user/CONNECTIONS_UNFOLLOW";
const initialState = {
  followers: [],
  following: [],
  loadingConnections: false,
  username: "Test User 1",
  userId: 1
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_CONNECTIONS_LOAD_FOLLOWERS:
      return update(state, {
        followers: {
          $set: action.payload.followers
        }
      });
    case USER_CONNECTIONS_LOAD_FOLLOWING:
      return update(state, {
        followers: {
          $set: action.payload.followers
        }
      });
    default:
      return state;
  }
};

export const loadFollowers = () => {
  return dispatch => {
    axios
      .get("http://localhost:9090/api/users/followers")
      .then(function(response) {
        dispatch({
          type: USER_CONNECTIONS_LOAD_FOLLOWERS,
          payload: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};
export const loadFollowing = () => {
  return dispatch => {
    axios
      .get("/api/users/following")
      .then(function(response) {
        dispatch({
          type: USER_CONNECTIONS_LOAD_FOLLOWING,
          payload: response
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

export const followUser = id => {
  return dispatch => {
    axios
      .post("/api/users/follow", { id: id })
      .then(function(response) {
        dispatch({
          type: USER_CONNECTIONS_FOLLOW,
          payload: { id }
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};
export const unFollowUser = id => {
  return dispatch => {
    axios
      .delete("/api/users/follow", { id: id })
      .then(function(response) {
        dispatch({
          type: USER_CONNECTIONS_UNFOLLOW,
          payload: { id }
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};
