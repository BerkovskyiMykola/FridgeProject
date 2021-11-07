import { CREATE_FRIDGE_SUCCESS, DELETE_FRIDGE_SUCCESS, EDIT_FRIDGE_SUCCESS, GET_OWN_FRIDGES, GET_SHARED_FRIDGES } from "../constants/fridge";


const initialState = {
    ownFridges: [],
    sharedFridges: []
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_OWN_FRIDGES:
            return {
                ...state,
                ownFridges: payload.ownFridges
            }
        case GET_SHARED_FRIDGES:
            return {
                ...state,
                sharedFridges: payload.sharedFridges
            }
        case CREATE_FRIDGE_SUCCESS:
            return {
                ...state,
                ownFridges: [...state.ownFridges, payload.fridge]
            }
        case DELETE_FRIDGE_SUCCESS:
            return {
                ...state,
                ownFridges: state.ownFridges.filter(x => x.fridgeId !== payload.fridgeId)
            }
        case EDIT_FRIDGE_SUCCESS:
            const item = state.ownFridges.find(x => x.fridgeId === payload.fridgeId)

            return {
                ...state,
                ownFridges: state.ownFridges.map(fridge => {
                    if (fridge.fridgeId === payload.fridgeId)
                        return { ...fridge, fridgeName: payload.fridgeName }
                    return fridge;
                })
            }
        default:
            return state;
    }
}
