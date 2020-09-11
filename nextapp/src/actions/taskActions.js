import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";
import Router from 'next/router';
//register


//get Tasks 
export const getTasks = () => dispatch => {
    axios.get("/api/task/getall", {
        headers: {
          'Authorization': `${localStorage.getItem("jwtToken")}`
        }})
        .then(res => {
            dispatch({
                type: 'TASKS',
                payload: res.data
            });
        }
        )
        .catch(err => {
            toast.error(
                err.message,
                {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 7000
                }
            )
        });
};

export const getTask = async (taskId) => {
    return axios.get("/api/task/get?taskId="+taskId, {
        headers: {
          'Authorization': `${localStorage.getItem("jwtToken")}`
        }});
};

// Register Task
export const registerTask = (taskData) => dispatch => {
    axios
        .post("/api/task/add", taskData)
        .then(res => {
            toast.success(
                "enregistrement de la tâche réussie",
                {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 7000
                }
            )

            Router.push('/');
        }
        )
        .catch(err => {
            toast.error(
                err.message,
                {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 7000
                }
            )
        });
};

// Edit Task
export const editTask = (taskData) => dispatch => {
    debugger;
    axios
        .put("/api/task/edit", taskData)
        .then(res => {
            getTasks()(dispatch);
            toast.success(
                "modification de la tâche (" + taskData.title + ") réussie",
                {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 7000
                }
            )

            Router.push('/');
        }
        )
        .catch(err => {
            toast.error(
                err.message,
                {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 7000
                }
            )
        });
};

// Delete Task
export const deleteTask = (taskId) => dispatch => {
    axios
        .delete("/api/task/delete?taskId="+taskId)
        .then(res => {
            getTasks()(dispatch);
            toast.success(
                "suppression effectuée",
                {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 7000
                }
            )
        }
        )
        .catch(err => {
            toast.error(
                err.message,
                {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 7000
                }
            )
        });
};
