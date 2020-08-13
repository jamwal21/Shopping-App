import React from 'react'
import { View, Text, Button,StyleSheet,FlatList } from 'react-native'
import Colors from '../../constants/Colors'
import { useSelector,useDispatch } from 'react-redux'
import CartItem from '../../components/shop/CartItem'
import * as cartActions from '../../store/actions/cart'
import * as orderActions from '../../store/actions/order'


const CartScreen = (props) => {

    const cartTotalAmount = useSelector(state=> state.cart.totalAmount);
    const cartItems = useSelector( state =>{
        const transformedCartItems = []; //objects collection to array of objects
        for (const key in state.cart.items){
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            });
        }
        return transformedCartItems.sort((a,b)=> a.productId>b.productId ? 1 : -1);
    } )

    console.log(cartItems)

    const dispatch = useDispatch()
    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2)*100)/100}</Text>
                </Text>
                <Button title='Order Now' 
                color={Colors.accent}
                disabled={cartItems.length === 0}
                onPress={()=>{
                    dispatch(orderActions.addOrder(cartItems,cartTotalAmount))
                }} />
            </View>
            <FlatList 
            data={cartItems}
            key={item=> item.productId}
            renderItem={ (itemData) => (
                    <CartItem title={itemData.item.productTitle} 
                    quantity={itemData.item.quantity}
                    amount={itemData.item.sum}
                    deletable
                    onRemove={()=>{
                        dispatch(cartActions.removeFromCart(itemData.item.productId))
                    }} />
            )} />
        </View>
    )
}

CartScreen.navigationOptions = {
    headerTitle: 'Your Cart'
}

const styles=StyleSheet.create({
    screen:{
        margin:20,
    },
    summary:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:20,
        padding:10,
        elevation:5,
        borderRadius:10,
        backgroundColor:'white'
    },
    summaryText:{
        fontSize:18
    },
    amount:{
        color: Colors.primary
    }
})

export default CartScreen
