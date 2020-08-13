import React from 'react'
import { FlatList,Button,Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import {Ionicons} from '@expo/vector-icons'
import Colors from '../../constants/Colors'
import * as productsActions from '../../store/actions/products'

const UserProductScreen = (props) => {

    const userProducts = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch()

    const editProductHandler = (id) =>{
        props.navigation.navigate('EditProduct',{
            productId: id
        })
    }

    const deletHandler = (id)=>{
        Alert.alert('Are you sure?','Do you really want to delete this item?',[
            {text:'No',style:'default'},
            {text:'Yes',style:'destructive',
            onPress: ()=>{
                dispatch(productsActions.deleteProduct(id))
            }}
        ])
    }


    return (
        <FlatList data={userProducts}
        keyExtractor={item=> item.id}
        renderItem={ itemData => <ProductItem image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={()=>{
                editProductHandler(itemData.item.id)
            }}
            >
                <Button
                    color={Colors.primary} 
                    title="Edit"
                    onPress={()=>{
                        editProductHandler(itemData.item.id)
                    }}
                    />
                    <Button
                    color={Colors.primary}
                    title="Delete"
                    onPress={deletHandler.bind(this,itemData.item.id)}
                    />
            </ProductItem>
        } />
    )
}

UserProductScreen.navigationOptions = (navData)=> {
    return{
        headerTitle: 'Your Products',
        headerLeft:()=>(
            <Ionicons name='md-menu'
            size={27} color='white'
            style={{marginLeft:10}}
            onPress={()=>{
                navData.navigation.toggleDrawer();
            }} />
        ),
        headerRight:()=>(
            <Ionicons name='md-create'
            size={27} color='white'
            style={{marginRight:10}}
            onPress={()=>{
                navData.navigation.navigate('EditProduct');
            }} />
        )
    }
}

export default UserProductScreen
