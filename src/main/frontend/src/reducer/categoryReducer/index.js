import { fromJS } from "immutable";
import { categoryActionTypes } from "../../action/categoryActions/categoryActionTypes";

const initialState = fromJS({
    pending: false,
    categories: [],
    error: undefined
})

const categoryReducer = (state = initialState, {type, payload, error}) => {
    switch (type) {
        case categoryActionTypes.FETCH_CATEGORIES:
            return state.merge({pending: true, error: undefined})

        case categoryActionTypes.FETCH_CATEGORIES_SUCCESS:
            return state.merge({pending: false, categories: payload})

        case categoryActionTypes.CREATE_CATEGORY:
            return state.merge({pending: true, error: undefined})

        case categoryActionTypes.UPDATE_CATEGORY:
            return state.merge({pending: true, error: undefined})

        case categoryActionTypes.DELETE_CATEGORY:
            return state.merge({pending: true, error: undefined})

        case categoryActionTypes.CATEGORY_API_CALL_SUCCESS:
            return state.merge({pending: false})

        case categoryActionTypes.CATEGORY_API_CALL_FAILURE:
            return state.merge({pending: false, error})

        default:
            return state
    }
}

export default categoryReducer