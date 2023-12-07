const init = {
    id:'',
    username:'',
    pass:'',
    job:[]
};
const reducer = (state = init, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                id:action.user.id,
                username:action.user.username,
                pass:action.user.pass,
                job:action.user.job
            };
        case 'ADD_JOB':
            console.log(action.job);
            const maxId = Math.max(...state.job.map(item => item.id), 0);
            const newId = maxId + 1;
            return {
                ...state,
                job:[...state.job,{id:newId,name:action.job}]
            };
        case 'DELETE_JOB':
            const updatedJob = state.job.filter(item => item.id !== action.id);
            return {
                ...state,
                job:updatedJob
            };
        case 'UPDATE_JOB':
            return {
                ...state,
                job:state.job.map(item => {
                    if(item.id === action.id){
                        return {...item,name:action.job};
                    }
                    return item;
                })
            };
}
}
export default reducer;