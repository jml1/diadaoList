export default function(state = {}, action) {
    switch (action.type) {
      case 'TASKS':
        return {
          ...state,
          all: action.payload
        };

      default:
        return state;
    }
  }
  