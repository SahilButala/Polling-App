// export const BASE_URL = "https://polling-backend-app.vercel.app";
export const BASE_URL = "https://polling-backend-app.onrender.com";
// export const BASE_URL = "http://localhost:3000";

// utils api paths
export const API_PATHS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    GET_USER: "/auth/getUser",
    UPDATE_PROFILE: "/auth/update",
    LOGOUT: "/auth/logout",
  },
  IMAGE: {
    UPLOAD_IMAGE: "/auth/upload-image",
  },
  POLLS: {
    CREATE: "/user/poll/create",
    GET_ALL_POLLS: "/user/poll/getAllPolls",
    GET_VOTED_POLLS: "/user/poll/votedPolls",
    GET_POLL_BYID: (pollid) => `/user/poll/${pollid}`,
    VOTE_ONPOLL: (pollId) => `/user/poll/${pollId}/vote`,
    CLOSE_POLL: (pollId) => `/user/poll/${pollId}/close`,
    BOOKMARKED_POLL: (pollId) => `/user/poll/${pollId}/bookmarked`,
    GET_USER_BOOKMARKED_POLL: `/user/poll/getuser/bookmarked`,
    DELETE_POLL: (pollid) => `/user/poll/${pollid}/delete`,
  },
};
