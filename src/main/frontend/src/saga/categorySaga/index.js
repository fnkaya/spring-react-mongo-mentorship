import {categoryApiPaths} from "./categoryApiPaths";
import {
    categoryApiCallFailure,
    categoryApiCallSuccess, fetchCategories,
    fetchCategoriesSuccess,
} from "../../action/categoryActions";
import {call, put, takeLatest} from "redux-saga/effects";
import {categoryActionTypes} from "../../action/categoryActions/categoryActionTypes";

export function* fetchCategoriesHandler() {
    const httpOptions = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        }
    }

    try {
        const response = yield call(fetch, categoryApiPaths.FETCH_CATEGORIES_PATH, httpOptions)
        let responseJSON = yield call((res) => res.json(), response)
        if (response.ok) {
            yield put(fetchCategoriesSuccess(responseJSON))
        }
        else {
            yield put(categoryApiCallFailure(responseJSON))
        }

    }
    catch (error) {
        yield put(categoryApiCallFailure(error))
    }
}

export function* createCategoryHandler(action) {
    const httpOptions = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(action.payload)
    }

    try {
        const response = yield call(fetch, categoryApiPaths.CREATE_CATEGORY_PATH, httpOptions)
        if (response.ok) {
            yield put(categoryApiCallSuccess())
            yield put(fetchCategories())
        }
        else {
            let responseJSON = yield call((res) => res.json(), response)
            yield put(categoryApiCallFailure(responseJSON))
        }
    }
    catch (error) {
        yield put(categoryApiCallFailure(error))
    }
}

export function* updateCategoryHandler(action) {
    const httpOptions = {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(action.payload)
    }

    try {
        const response = yield call(fetch, categoryApiPaths.UPDATE_CATEGORY_PATH, httpOptions)
        if (response.ok) {
            yield put(categoryApiCallSuccess())
            yield put(fetchCategories())
        }
        else {
            let responseJSON = yield call((res) => res.json(), response)
            yield put(categoryApiCallFailure(responseJSON))
        }
    }
    catch (error) {
        yield put(categoryApiCallFailure(error))
    }
}

export function* deleteCategoryHandler(action) {
    let apiUrl = `${categoryApiPaths.UPDATE_CATEGORY_PATH}/${action.payload}`;
    const httpOptions = {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
        }
    }

    try {
        const response = yield call(fetch, apiUrl, httpOptions)
        if (response.ok) {
            yield put(categoryApiCallSuccess())
            yield put(fetchCategories())
        }
        else {
            let responseJSON = yield call((res) => res.json(), response)
            yield put(categoryApiCallFailure(responseJSON))
        }
    }
    catch (error) {
        yield put(categoryApiCallFailure(error))
    }
}

export function* categorySaga() {
    yield takeLatest(categoryActionTypes.FETCH_CATEGORIES, fetchCategoriesHandler)
    yield takeLatest(categoryActionTypes.CREATE_CATEGORY, createCategoryHandler)
    yield takeLatest(categoryActionTypes.UPDATE_CATEGORY, updateCategoryHandler)
    yield takeLatest(categoryActionTypes.DELETE_CATEGORY, deleteCategoryHandler)
}