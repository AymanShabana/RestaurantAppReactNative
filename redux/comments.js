import * as ActionTypes from './ActionTypes';

export const comments = (state ={
        errMess: null,
        comments: []
    }, action) =>{
        switch(action.type){
            case ActionTypes.ADD_COMMENTS:
                return {...state, errMess:null, comments: action.payload}
            case ActionTypes.COMMENTS_LOADING:
                return {...state, errMess:null, comments: []}
            case ActionTypes.COMMENTS_FAILED:
                return {...state, errMess:action.payload, comments:[] }
            case ActionTypes.ADD_COMMENT:
                const comm = action.payload;
                comm.id = state.comments.length;
                return {...state, comments: state.comments.concat(comm)};
            default:
                return state;
        }
    }
