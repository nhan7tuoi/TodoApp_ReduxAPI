export const setUser = (user) => ({ type: 'SET_USER', user });
export const addJob = (job) =>({ type: 'ADD_JOB', job });
export const deleteJob = (id) => ({type: 'DELETE_JOB',id});
export const updateJob = (id, job) => ({
    type: 'UPDATE_JOB',id,job});