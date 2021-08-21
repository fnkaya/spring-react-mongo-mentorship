import { categoryActionTypes } from "./categoryActionTypes";

export const fetchCategories = () => ({
    type: categoryActionTypes.FETCH_CATEGORIES
})

export const fetchCategoriesSuccess = (categories) => ({
    type: categoryActionTypes.FETCH_CATEGORIES_SUCCESS,
    payload: categories
})

export const createCategory = (category) => ({
    type: categoryActionTypes.CREATE_CATEGORY,
    payload: category
})

export const updateCategory = (category) => ({
    type: categoryActionTypes.UPDATE_CATEGORY,
    payload: category
})

export const deleteCategory = (id) => ({
    type: categoryActionTypes.DELETE_CATEGORY,
    payload: id
})

export const categoryApiCallSuccess = () => ({
    type: categoryActionTypes.CATEGORY_API_CALL_SUCCESS,
})

export const categoryApiCallFailure = (error) => ({
    type: categoryActionTypes.CATEGORY_API_CALL_FAILURE,
    error
})