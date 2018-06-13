import update from "immutability-helper";
import axios from "axios";
export const TIMELINE_POST_PUBLISH = "timeline/POST_PUBLISH";
export const TIMELINE_LOAD = "timeline/TIMELINE_LOAD";
export const TIMELINE_POST_DELETE = "timeline/POST_DELETE";
const initialState = {
  posts: [],
  loadingPosts: false,
  publisingPost: false,
  delete: false,
  submit: false
};

export default (state = initialState, action) => {
  /*TODO FIX BAD DESIGN CODE*/
  state = { ...state, delete: false, submit: false };
  switch (action.type) {
    case TIMELINE_LOAD:
      return update(state, {
        posts: {
          $set: action.payload.timeline.posts
        }
      });
    case TIMELINE_POST_DELETE:
      return update(state, {
        delete: {
          $set: true
        },
        posts: {
          $apply: posts => {
            return posts.filter(post => post.id !== action.payload.id);
          }
        }
      });
    case TIMELINE_POST_PUBLISH:
      return update(state, {
        submit: {
          $set: true
        },
        posts: {
          $push: [action.payload.post]
        }
      });

    default:
      return state;
  }
};
export const loadTimeline = () => {
  return dispatch => {
    axios
      .get("http://localhost:9090/api/users/timeline")
      .then(function(response) {
        dispatch({
          type: TIMELINE_LOAD,
          payload: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};
export const postDeleteAction = id => {
  return dispatch => {
    axios
      .delete("http://localhost:9090/api/posts/index/id/" + id)
      .then(function(response) {
        dispatch({
          type: TIMELINE_POST_DELETE,
          payload: { id }
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};
export const postPublishAction = content => {
  return dispatch => {
    axios
      .post("http://localhost:9090/api/posts", {
        content: content.replace(/(?:\r\n|\r|\n)/g, "\\n")
      })
      .then(function(response) {
        dispatch({
          type: TIMELINE_POST_PUBLISH,
          payload: { post: response.data.post }
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};
