import Task from '../models/task.model.js';

export const getTasks = async (req, res) => {
    const tasks = await Task.find({user: req.user.id}).populate('user')
    res.json(tasks);
}

export const createTask = async (req, res) => {
    try {
        const { nameEvent, host, info, startEvent, endEvent, location, menu, importantInfo, pin, check } = req.body;
        
        const pinFound = await Task.findOne({pin});
        if(pinFound) return res.status(400).json({message: 'El pin ya está en uso'});

        const newTask = new Task({ nameEvent, host, info, startEvent, endEvent, location, menu, importantInfo, user: req.user.id, pin, check});

        const taskSaved = await newTask.save();
        res.json(taskSaved);
    } catch (error) {
        return res.status(404).json({message: 'Error al crear la invitación (createTask)'});    
    }
}

export const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('user');

        if (!task) return res.status(404).json({message: 'Invitación no encontrada'});

        res.json(task);
    } catch (error) {
        return res.status(404).json({message: 'Error, invitación no encontrada (getTask)'});
    }
}

export const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true //Para que devuelva el objeto actualizado
        });
    
        if (!task) return res.status(404).json({message: 'Invitación no encontrada'});
    
        res.json(task);
    } catch (error) {
        return res.status(404).json({message: 'Error, invitación no encontrada (updateTask)'});
    }
}

export const deleteTask = async (req, res) => {
    try {
        console.log(req.params.id);
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) return res.status(404).json({message: 'Invitación no encontrada'});

        return res.sendStatus(204); //Todo se hizo bien, no se devuelve nada
    } catch (error) {
        return res.status(404).json({message: 'Error, invitación no encontrada (deleteTask)'});
    }
}