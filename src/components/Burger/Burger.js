import React from 'react';
import classes from './Burger.css'
import BurgerIngredients from './BurgerIngredients/BurgerIngredients'

const burger = (props) => {

    let currentIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredients key= {igKey + i} type= {igKey} />
            })
        })
        .reduce((arr, el) => {
            return arr.concat(el)
      
        },[]);
    
    if( currentIngredients.length === 0){
        currentIngredients = <p>Please add INGREDIENTS!</p>;
    };
    

    return (
        <div className={classes.Burger}>
            <BurgerIngredients type='bread-top' />
            {currentIngredients}
            <BurgerIngredients type='bread-bottom' />
        </div>
    );
}

export default burger;
