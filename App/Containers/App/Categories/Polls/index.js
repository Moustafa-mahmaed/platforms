import React, { Component } from 'react'
import { View, Text, ActivityIndicator, Platform ,TouchableWithoutFeedback} from 'react-native'
import { object, bool, func, array } from 'prop-types'
import { connect } from 'react-redux'

import Icon from "react-native-vector-icons/Ionicons";

import LinearGradient from 'react-native-linear-gradient'

import CardsList from '../../../../Components/CardsList'
import Button from '../../../../Components/Controls/Button'

import CategoriesActions from '../../../../Redux/Actions/Categories'

import I18n from '../../../../I18n/I18n'
import { Colors } from '../../../../Theme'
import styles from './styles'

const IS_IOS = Platform.OS === 'ios'
let iconType = IS_IOS ? 'ios' : 'md'
class PollsScreen extends Component {
  constructor (props) {
    super(props)
    this.props.getCategory('polls', 1)
  }

  state = {
    loading: true,
    loadingMore: false,
    pageIndex: 1,
    list: []
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
          this.props.getCategory('polls', this.state.pageIndex)
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
        buttonColor={Colors.brick}
        containerStyle={styles.backButton}
      />
    )
  }

  renderGradient = () => (
    <LinearGradient
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={[Colors.brick, '#ef6a23']}
      style={styles.gradientHeader}
    />
  )

  renderTitle = () => (
    <View style={styles.titleContainer}>
      {this.renderBackButton()}
      <Text style={styles.title}>{I18n.t('pollsTitle')}</Text>
    </View>
  )
  onCardPress = (route, item) => {
      
    this.props.navigation.navigate("OpinionBeforeVoting", {  item  })

  }
  renderList = () => {
    const { loading, loadingMore, list } = this.state

    return (
      <View style={styles.body}>
        {loading && (
          <ActivityIndicator
            size='small'
            color={Colors.brick}
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

  onItemPress = index => {
    this.setState({
      selectedIndex: index,
      list: [],
      pageIndex: 1,
      loading: true
    })
    this.props.getCategory('polls', 1)
  }

  render () {
    return (
      <View style={styles.root}>
        {this.renderGradient()}
        {this.renderTitle()}
        {this.renderList()}
        <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate("OpinionAdd")}>

        <View style={styles.AddForm} >
          
          <Icon   name="ios-add" size={35} color="white" />
        {/* استطلاع الراى  */}
        
          
        </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

PollsScreen.propTypes = {
  getCategory: func,
  data: object,
  list: array,
  fetching: bool,
  errors: bool
}

PollsScreen.defaultProps = {
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
    errors: state.category.errors
  }
}

const mapDispatchToProps = dispatch => ({
  getCategory: (category, page) =>
    dispatch(CategoriesActions.categoryRequest(category, page))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PollsScreen)
