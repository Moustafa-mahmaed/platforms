  import React, { Component } from 'react'
  import { View, Text,ActivityIndicator,ImageBackground, Platform,TouchableWithoutFeedback ,ScrollView} from 'react-native'
  import { object, bool, func, array } from 'prop-types'
  import { connect } from 'react-redux'

  import LinearGradient from 'react-native-linear-gradient'

  import CardsList from '../../../../Components/CardsList'
  import Button from '../../../../Components/Controls/Button'
  import DropdownModal from '../../../../Components/DropdownModal'

  import CategoriesActions from '../../../../Redux/Actions/Categories'
  import TagsActions from '../../../../Redux/Actions/Tags'

  import Icon from "react-native-vector-icons/Ionicons";

  import I18n from '../../../../I18n/I18n'
  import { Colors } from '../../../../Theme'
  import styles from './styles'



  const HEADER_MIN_HEIGHT = 50;
  const HEADER_MAX_HEIGHT = 150;


  const IS_IOS = Platform.OS === 'ios'
  let iconType = IS_IOS ? 'ios' : 'md'
  class MainHallScreen extends Component {
    constructor (props) {
      super(props)
      this.props.getCategory('discussions', 1)
      this.props.getTags('discussion')
      
      
    }

    state = {
      loading: true,
      loadingMore: false,
      pageIndex: 1,
      list: [],
      tags: [],
      modalVisible: false,
      tag: I18n.t('allDiscussions'),
      selectedIndex: 0
    }


    componentDidUpdate (prevProps) {
      if (
        this.state.list &&
        this.props.list &&
        this.props.list !== prevProps.list
      ) {
        this.setState({
          list: [...this.state.list, ...this.props.list],
          loading: false,
          loadingMore: false
        })
      }

      if (this.props.tags && this.props.tags !== prevProps.tags) {
        this.setState({ tags: [this.state.tag, ...this.props.tags] })
      }
    }

    onCardPress = (route, item) => {
      
      this.props.navigation.navigate(route, { category: 'discussions', item ,Edit:"EditNewDiscussion" })

    }

    setModalVisible = visible => {
      this.setState({ modalVisible: visible })
    }

    handleLoadMore = () => {
      const { fetching } = this.props
      const { total } = this.props.data
      const { pageIndex, loadingMore, list } = this.state

      if (list.length < total && !fetching && !loadingMore) {
        this.setState(
          {
            pageIndex: pageIndex + 1,
            loadingMore: true
          },
          () => {
            this.props.getCategory('discussions', this.state.pageIndex)
          }
        )
      }
    }

    renderBackButton = () => {
      return (
        <Button
          onPress={() => {
            this.props.navigation.goBack()
          }}
          iconSettings={{
            iconName: `${iconType}-arrow-back`,
            iconSize: 25,
            iconTintColor: Colors.basic.white,
            iconStyle: styles.backButtonIcon
          }}
          type='transparent'
          buttonColor={Colors.cerulean}
          containerStyle={styles.backButton}
        />
      )
    }

    renderGradient = () => (
      
      <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={[Colors.cerulean, '#48c7f4']}
        style={[styles.gradientHeader,{height:150}]}
        >
        {/* <ImageBackground
        // source={{uri:"http://www.freepngclipart.com/download/black_and_white/57175-and-abstraction-triangle-geometry-pattern-cover-black.png"}}
        
        // source={require('../../../../Images/Group147.png')}
        source={require('../../../../Images/,m-01.png')}
        style={{width:"100%" ,height:"100%",opacity:.4}}>
    </ImageBackground> */}
        </LinearGradient> 
    )

    renderTitle = () => (
      <View style={styles.titleContainer}>
        {this.renderBackButton()}
      <View style={{flexDirection:"row" ,justifyContent:"center" }}>

        <Text style={[styles.title ,{paddingHorizontal:10}]}>{I18n.t('mainHallTitle')}</Text>
        {/* <Icon name="ios-calendar" size={32} color="white" /> */}
      </View>
      </View>
    )

    renderButton = () => (
      <Button
        onPress={() => {
          this.setModalVisible(true)
        }}
        containerStyle={styles.filterButton}
        icons
        iconSettings={{
          iconName: 'ios-funnel',
          iconSize: 25,
          iconTintColor: Colors.basic.white
        }}
        type='secondary'
        buttonColor={Colors.cerulean}
        title={this.state.tag}
      />
    )

    renderList = () => {
      const { loading, loadingMore, list } = this.state

      return (
        <View style={styles.body}>
          {loading && (
            <ActivityIndicator
              size='small'
              color={Colors.cerulean}
              style={styles.fetching}
            />
          )}

          <CardsList
            data={list}
            onItemPress={this.onCardPress}
            handleLoadMore={this.handleLoadMore}
            loadingMore={loadingMore}
          />
        </View>
      )
    }

    renderModal = () => {
      return (
        <DropdownModal
          options={this.state.tags}
          modalVisible={this.state.modalVisible}
          setModalVisible={this.setModalVisible}
          selectedIndex={this.state.selectedIndex}
          onItemPress={this.onItemPress}
          selectedColor={Colors.cerulean}
        />
      )
    }

    onItemPress = (index, tag) => {
      this.setState({
        tag,
        selectedIndex: index,
        modalVisible: false,
        list: [],
        pageIndex: 1,
        loading: true
      })
      this.props.getCategory(
        'discussions',
        1,
        tag === I18n.t('allDiscussions') ? '' : tag
      )
    }

    render () {
      
      return (
        <View style={styles.root}>
         {this.renderGradient()}
          {this.renderTitle()}
          {this.renderButton()}
          {this.renderList()}
          {this.renderModal()} 
        
         <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate("AddNewDiscussion")}>

          <View style={styles.AddForm} >
            <Icon   name="ios-add" size={35} color="white" />
            
          {/* القائمه الرئيسيه */}
          </View>
         </TouchableWithoutFeedback>
        
          
        </View>
      //   <View style = {{flex: 1,
      //     paddingTop: (Platform.OS == 'ios') ? 20 : 0}}>
      //     <ScrollView 
      //         contentContainerStyle = {{ paddingTop: HEADER_MAX_HEIGHT +50 }}
      //         scrollEventThrottle = { 16 }
      //         onScroll = { Animated.event(
      //           [{ nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue }}}]
      //     )}>
      //       {this.renderList()}
      //     {this.renderModal()} 
        
      //     </ScrollView>
  
      //     <Animated.View style = {[ styles.animation,{  backgroundColor: headerBackgroundColor , height: headerHeight ,ZIndex:headerZindex,alignItems:"center"} ]}>
          
      //     {this.renderGradient()}
      //   {this.renderTitle()}
      //     {this.renderButton()}
      //       <Animated.View style={{position:"absolute",bottom:-100 ,elevation:6 ,headerTitleBottom}}>
            

      //         <Text style={{fontSize:26, color:"white",paddingVertical:25,marginHorizontal:20}}>
      //           الغرفة الرئيسية
      //         </Text>
            

      //       </Animated.View>
      //     </Animated.View>
          
      //     <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate("AddNewDiscussion")}>

      //   <View style={styles.AddForm} >
      //       <Icon   name="ios-add" size={35} color="white" />
            
      //     {/* القائمه الرئيسيه */}
      //     </View>
      //     </TouchableWithoutFeedback>
      // </View>
      )
    }
  }

  MainHallScreen.propTypes = {
    getCategory: func,
    data: object,
    list: array,
    fetching: bool,
    errors: bool
  }

  MainHallScreen.defaultProps = {
    getCategory: () => {},
    data: {},
    list: [],
    fetching: false,
    errors: false
  }

  const mapStateToProps = (state, ownProps) => {
    return {
      data: state.category.data,
      list: state.category.list,
      fetching: state.category.fetching,
      errors: state.category.errors,
      tags: state.tags.tags
    }
  }

  const mapDispatchToProps = dispatch => ({
    getCategory: (category, page, tag) =>
      dispatch(CategoriesActions.categoryRequest(category, page, tag)),
    getTags: category => dispatch(TagsActions.tagsRequest(category))
  })

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(MainHallScreen)
