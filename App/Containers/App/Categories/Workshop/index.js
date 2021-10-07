import React, { Component, Fragment } from 'react'
import { View, Text, ActivityIndicator, Platform,TouchableWithoutFeedback } from 'react-native'
import { object, bool, func, array } from 'prop-types'
import { connect } from 'react-redux'

import Icon from "react-native-vector-icons/Ionicons";

import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment'

// import CardsList from '../../../../Components/CardsList'
import CardsListForEvent from '../../../../Components/CardsListForEvent'
import Button from '../../../../Components/Controls/Button'
import CountDown from '../../../../Components/CountDown'

import CategoriesActions from '../../../../Redux/Actions/Categories'
import FeaturedItemsActions from '../../../../Redux/Actions/CategoriesFeaturedItems'

import { Colors } from '../../../../Theme'
import styles from './styles'

const IS_IOS = Platform.OS === 'ios'
let iconType = IS_IOS ? 'ios' : 'md'

class WorkshopScreen extends Component {
  constructor (props) {
    super(props)
    this.props.getCategory('workshops', 1)
    this.props.getFeaturedItems('workshops')
  }

  state = {
    loading: true,
    loadingMore: false,
    pageIndex: 1,
    list: []
  }

  componentDidUpdate (prevProps) {
    const { list, featuredList } = this.props
    if (list && list !== prevProps.list) {
      this.setState({
        list: [...this.state.list, ...list],
        loading: false,
        loadingMore: false
      })
    }

    if (featuredList && featuredList !== prevProps.featuredList) {
      this.setState({ featuredList })
    }
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
          this.props.getCategory('workshops', this.state.pageIndex)
        }
      )
    }
  }

  onCardPress = (route, item) => {

 
    this.props.navigation.navigate(route, { category: 'workshops', item ,Edit:"EditWorkShop"})

  }
  renderBackButton = () => {
    return (
      <Button
        onPress={() => {
          this.props.navigation.goBack(null)
          

        }}
        iconSettings={{
          iconName: `${iconType}-arrow-back`,
          iconSize: 25,
          iconTintColor: Colors.basic.white,
          iconStyle: styles.backButtonIcon
        }}
        type='transparent'
        buttonColor={Colors.vividPurple}
        containerStyle={styles.backButton}
      />
    )
  }

  renderGradient = () => (
    <Fragment>
      <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={[Colors.vividPurple, '#b355a3']}
        style={styles.gradientHeader}
      />
      {this.renderBackButton()}
    </Fragment>
  )

  TextAbstract(text, length) {
    if (text == null) {
        return "";
    }
    if (text.length <= length) {
        return text;
    }
    text = text.substring(0, length);
    last = text.lastIndexOf(" ");
    text = text.substring(0, last);
    return text + "...";
}
  renderHeader = () => {
    const { fetching } = this.props
    const { featuredList } = this.state
    return (
      <View style={styles.titleContainer}>
        {fetching && (
          <ActivityIndicator
            size='small'
            color={Colors.vividPurple}
            style={styles.fetchingBox}
          />
        )}

        {featuredList && featuredList.length >= 1 && !fetching && (
          <View>
            {/* date */}
            <Text style={styles.subTitle}>
              {moment(featuredList[0].start_date).format('Do MMMM YYYY, h a')}
            </Text>

            {/* Title */}
            <Text style={styles.title}>{this.TextAbstract(featuredList[0].title ,20)}</Text>

            {/* Location */}
            <Text style={styles.subTitle}>
              {`${featuredList[0].country.name} - ${featuredList[0].city.name}`}
            </Text>

            {/* CountDown */}
            {this.renderCountDown()}
          </View>
        )}
      </View>
    )
  }

  renderCountDown = () => {
    const { featuredList } = this.state
    const { fetching } = this.props

    if (featuredList && featuredList.length >= 1 && !fetching) {
      return <CountDown eventTime={Date.parse(featuredList[0].start_date)} />
    }
  }

  renderList = () => {
    const { loading, loadingMore, list } = this.state

    return (
      <View style={styles.body}>
        {loading && (
          <ActivityIndicator
            size='small'
            color={Colors.vividPurple}
            style={styles.fetching}
          />
        )}
          
          
          
          {!loading &&
          <View style={styles.titlecontainer}>
            <Text style={styles.titletext}>الورش التالية</Text>  
         </View>
        }
        { !loading && list.length ==0 ?
            <Text style={styles.titletext1}>لا توجد ورش</Text>  

:
        <CardsListForEvent
         colorlogo={Colors.vividPurple}
          data={list}
          onItemPress={this.onCardPress}
          handleLoadMore={this.handleLoadMore}
          loadingMore={loadingMore}
        />
        }
      </View>
    )
  }

  onItemPress = () => {
    this.setState({
      list: [],
      pageIndex: 1,
      loading: true
    })
  }

  render () {
    return (
      <View style={styles.root}>
        {this.renderGradient()}
        {this.renderHeader()}
        {this.renderList()}
        <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate("AddWorkShop")} >

        <View style={styles.AddForm} >
          <Icon  name="ios-add" size={35} color="white" />
          {/* الورشه */}
          
          
        </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

WorkshopScreen.propTypes = {
  getCategory: func,
  getFeaturedItems: func,
  data: object,
  list: array,
  fetching: bool,
  errors: bool
}

WorkshopScreen.defaultProps = {
  getCategory: () => {},
  getFeaturedItems: () => {},
  data: {},
  list: [],
  featuredList: [],
  fetching: false,
  errors: false
}

const mapStateToProps = state => {
  return {
    data: state.category.data,
    list: state.category.list,
    featuredList: state.categoriesFeaturedItems.featuredList,
    fetching: state.category.fetching,
    errors: state.category.errors
  }
}

const mapDispatchToProps = dispatch => ({
  getCategory: (category, page) =>
    dispatch(CategoriesActions.categoryRequest(category, page)),
  getFeaturedItems: category =>
    dispatch(FeaturedItemsActions.featuredRequest(category))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkshopScreen)
