import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet, Modal, Button, Alert, PanResponder } from 'react-native';
import { Card, Icon, Rating, Input, AirbnbRating } from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import { postFavorite, postComment} from '../redux/ActionCreators'
import moment from 'moment';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})

class RenderDish extends Component{
    constructor(props){
        super(props);
    }
    handleViewRef = (ref) => this.view = ref;
    render(){

        
        const dish = this.props.dish;
 


        const recognizeDrag = ({moveX, moveY, dx, dy}) => {
            if(dx < -200) //swipe left
                return true;
            else
                return false;
        };

        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gestureState) => {
                return true;
            },
            onPanResponderGrant: () => {
                this.view.rubberBand(1000)
                .then(endState => console.log(endState.finished?'Finished':'Cancelled'));
            },
            onPanResponderEnd: (e, gestureState) =>{
                if(recognizeDrag(gestureState))
                    Alert.alert(
                        'Add to favorites?',
                        'Are you sure you want to add '+ dish.name + ' to your favorites?',
                        [
                            {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel pressed'),
                                style: 'cancel'
                            },
                            {
                                text: 'Yes',
                                onPress: ()=> this.props.favorite?console.log('Already fav'):this.props.onPress(),
                            }
                        ],
                        {cancelable: false}
                    )
                return true;
            }

        });

        if(dish!=null){
            return(
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
                ref={this.handleViewRef}
                {...panResponder.panHandlers}>
                    <Card featuredTitle={dish.name} image={{uri: baseUrl+dish.image}}>
                        <Text style={{margin:10}}>{dish.description}</Text>
                        <View style={{flex:1, alignItems: 'center', justifyContent: 'center',flexDirection: 'row'}}>
                            <Icon raised reverse name={this.props.favorite? 'heart':'heart-o'} type='font-awesome' color='#f50' onPress={()=> this.props.favorite?console.log('Already fav'):props.onPress()}/>
                            <Icon raised reverse name={'pencil'} type='font-awesome' color='#512da8' onPress={()=> this.props.onCommentPress()}/>
                        </View>
                    </Card>
                </Animatable.View>
            );
        }
        else{
            return(<View></View>);
        }
    }
}

function RenderComments(props){
    const comments = props.comments;
    const renderCommentItem = ({item,index})=>{
        return(
            <View key={index} style={{margin:10}}>
                <Text style={{fontSize:14}}>{item.comment}</Text>
                <Rating ratingCount={5} startingValue={item.rating} imageSize={12} style={{margin:4,alignSelf: 'flex-start'}} readonly />
                <Text style={{fontSize:12}}>{'-- '+item.author+', '+moment(item.date).format("dddd, MMM DD at HH:mm a")}</Text>
            </View>
        );
    }
    return(
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title="Comments">
                <FlatList data={comments} renderItem={renderCommentItem} keyExtractor={item => item.id.toString()}/>
            </Card>
        </Animatable.View>
    );
}

class Dishdetail extends Component{
    constructor(props){
        super(props);
        this.state ={
            rating:3,
            author: '',
            comment:'',
            showModal: false
        }
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(){
        this.setState({ showModal: !this.state.showModal});
    }
    resetForm() {
        this.setState({
            rating:3,
            author: '',
            comment:''
        });

    }

    handleComment(dishId){
        this.props.postComment(dishId,this.state.rating,this.state.author,this.state.comment);
    }

    markFavorite(dishId){
        this.props.postFavorite(dishId);
    }
    static navigationOptions = {
        title: 'Dish Details'
    };

    render(){
        const dishId = this.props.navigation.getParam('dishId', '');
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]} favorite={this.props.favorites.some(el => el===dishId)} onPress={() =>this.markFavorite(dishId)}
                onCommentPress={this.toggleModal}/>
                <RenderComments comments={this.props.comments.comments.filter((comment)=>comment.dishId === dishId)}/>
                <Modal animationType={'slide'} transparent={false} visible={this.state.showModal} 
                onDismiss={() => {
                    this.toggleModal(); 
                    this.resetForm();
                    }}
                    onRequestClose={() => {
                        this.toggleModal(); 
                        this.resetForm();
                        }}>
                    <View style={styles.modal}>
                        <Rating showRating minValue={1} onFinishRating={(num) => this.setState({rating:num})}/>
                        <Input style={styles.formRow} placeholder='Author' leftIcon={{ type: 'font-awesome', name: 'user', color:'#b9b9b9', margin:2 }} onChangeText={value => this.setState({ author: value })}></Input>
                        <Input style={styles.formRow} placeholder='Comment' leftIcon={{ type: 'font-awesome', name: 'comment', color:'#b9b9b9', margin:2 }} onChangeText={value => this.setState({ comment: value })}></Input>
                        <View style={{marginBottom:10}}>
                        <Button color='#512da8' title='Submit' style={{margin:10}} onPress={() => {
                        this.handleComment(dishId);
                        this.toggleModal(); 
                        this.resetForm();
                        }}/>
                        </View>
                        <Button color='grey' title='Cancel' onPress={() => {
                        this.toggleModal(); 
                        this.resetForm();
                        }}/>
                    </View>
                </Modal>

            </ScrollView>
        );

    }
}
const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize:18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin:20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512da8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText:{
        fontSize: 18,
        margin: 10
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);