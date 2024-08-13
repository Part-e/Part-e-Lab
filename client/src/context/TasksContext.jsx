import { createContext, useContext, useState } from "react";
import { createTasksRequest, getTasksRequest, deleteTasksRequest, getTaskRequest, updateTasksRequest } from "../api/tasks";

const TasksContext = createContext();

export const useTask = () => {
    const context = useContext(TasksContext);

    if (!context) {
        throw new Error('useTask must be used within a TaskProvider');
    }

    return context;
}

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [errors, setErrors] = useState([]);

    const getTasks = async () => {
        try {
            const res = await getTasksRequest();
            setTasks(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const createTask = async (task) => {
        try {
            const res = await createTasksRequest(task);
            console.log(res);
        } catch (error) {
            setErrors([error.response.data.message]);
            throw error;
        }        
    }

    const deleteTask = async (id) => {
        try {
            const res = await deleteTasksRequest(id);
            
            if(res.status === 204) setTasks(tasks.filter(task => task._id !== id));

        } catch (error) {
            console.log(error);
        }
    }

    const getTask = async (id) => {
        try {
            const res = await getTaskRequest(id);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }

    const updateTask = async (id, task) => {
        try {
            const res = await updateTasksRequest(id, task);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <TasksContext.Provider value={{tasks, createTask, getTasks, deleteTask, getTask, updateTask, errors}}>
            {children}
        </TasksContext.Provider>
    )
}