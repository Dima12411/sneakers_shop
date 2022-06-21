import React, {useState} from 'react';
import {PizzasObject} from "../../App";
import {useDispatch, useSelector} from "react-redux";
import {addItem} from "../../redux/slices/cartSlice";
import {RootStateType} from "../../redux/store";

type PropsType = {
    pizza: PizzasObject
}

const typeNames = ['тонкое', 'традиционное']

const PizzaBlock = ({pizza, ...props}: PropsType) => {
    const dispatch = useDispatch()
    const cartItem = useSelector<RootStateType, any>(state => state.cart.items.find(obj => obj.id === pizza.id))
    const [sizeIndex, setSizeIndex] = useState<number>(0)
    const [typePizza, setTypePizza] = useState<number>(0)

    const addedCount = cartItem ? cartItem.count : 0

    const onClickAdd = () => {
        const item = {
            id: pizza.id,
            title: pizza.title,
            price: pizza.price,
            imageUrl: pizza.imageUrl,
            type: typeNames[typePizza],
            size: pizza.sizes[sizeIndex],
            count: 0
        }
        dispatch(addItem(item))
    }

    return (
        <div className="pizza-block-wrapper">
            <div className="pizza-block">
                <img
                    className="pizza-block__image"
                    src={pizza.imageUrl}
                    alt="Pizza"
                />
                <h4 className="pizza-block__title">{pizza.title}</h4>
                <div className="pizza-block__selector">
                    <ul>
                        {
                            pizza.types.map((el, i) => {
                                return (
                                    <li key={i} className={typePizza === i ? 'active' : ''}
                                        onClick={() => setTypePizza(i)}>
                                        {typeNames[el]}
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <ul>
                        {
                            pizza.sizes.map((el, i) => {
                                return (
                                    <li key={i} className={i === sizeIndex ? 'active' : ''}
                                        onClick={() => setSizeIndex(i)}>
                                        {el} см.
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">от {pizza.price} ₽</div>
                    <button className="button button--outline button--add"
                            onClick={onClickAdd}>
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                fill="white"
                            />
                        </svg>
                        <span>Добавить</span>
                        {addedCount > 0 && <i>{addedCount}</i>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PizzaBlock;