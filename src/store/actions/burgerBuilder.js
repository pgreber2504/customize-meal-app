import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios';

export const addIngredient = (type) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: {
            ingredientType: type,
        }
    }
}

export const removeIngredient = (type) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: {
            ingredientType: type,
        }
    }
}

export const saveIngredients = (ingredients) => {
    return {
        type: actionTypes.SAVE_INGREDIENTS,
        payload: {
            ingredients: ingredients
        }
    }
}

export const getError = (error) => {
    return{
        type: actionTypes.SAVE_ERROR,
        payload: {
            error: error,
        }
    }
}


export const fetchIngredientsFromServer = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then(res => {
                const ingredients = {
                    salad: res.data.salad,
                    bacon: res.data.bacon,
                    cheese: res.data.cheese,
                    meat: res.data.meat
                }
                return dispatch(saveIngredients(ingredients));
            })
        .catch(err => {
            return dispatch(getError(true));
        })

    }
}


