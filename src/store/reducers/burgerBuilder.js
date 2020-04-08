import * as actionTypes from '../actions/actionTypes';
import { objectHelper } from '../../shared/utility';

const initialState = {
    ingredients: null,
    totalPrice: 5.2,
    error: false,
    signToOrder: false
}

// PRICES SET RANDOMLY
const INGREDIENT_PRICES = {
    'salad': 0.2,
    'cheese': 0.5,
    'bacon': 0.7,
    'meat': 1.2
};

const addIngredient = (state, payload) => {
    const newIngredient = { [payload.ingredientType]: state.ingredients[payload.ingredientType] + 1 };
    const newIngredients = objectHelper(state.ingredients, newIngredient);
    const newState = {
        ingredients: newIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[payload.ingredientType],
    }

    return objectHelper(state, newState);

}

const removeIngredient = (state, payload) => {
    const newIngredient = { [payload.ingredientType]: state.ingredients[payload.ingredientType] - 1 };
    const newIngredients = objectHelper(state.ingredients, newIngredient);
    const newState = {
        ingredients: newIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[payload.ingredientType],
    }

    return objectHelper(state, newState)
}

const saveIngredients = (state, payload) => {
    const newState = {
        ingredients: payload.ingredients,
        totalPrice: 5.2
    };
    return objectHelper(state, newState);
}

const saveError = (state, payload) => {
    const newState = {
        error: payload.error
    };
    return objectHelper(state, newState);
}



export default (state = initialState, { type, payload }) => {
    switch (type) {
        case (actionTypes.ADD_INGREDIENT) : return addIngredient(state, payload);
        case (actionTypes.REMOVE_INGREDIENT) : return removeIngredient(state, payload)
        case (actionTypes.SAVE_INGREDIENTS) : return saveIngredients(state, payload)
        case (actionTypes.SAVE_ERROR) : return saveError(state, payload)
        default : return state
    }

}
