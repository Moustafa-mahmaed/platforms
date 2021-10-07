import React, { Component } from 'react'
import { View, Text, ActivityIndicator, Platform, TouchableWithoutFeedback } from 'react-native'
import { object, bool, func, array } from 'prop-types'
import { connect } from 'react-redux'

import LinearGradient from 'react-native-linear-gradient'

import Icon from "react-native-vector-icons/Ionicons";
 
import CardsList from '../../../../Components/CardsList'
import Button from '../../../../Components/Controls/Button'
import DropdownModal from '../../../../Components/DropdownModal'

import CategoriesActions from '../../../../Redux/Actions/Categories'
import TagsActions from '../../../../Redux/Actions/Tags'

import I18n from '../../../../I18n/I18n'
import { Colors } from '../../../../Theme'
import styles from './styles'

const IS_IOS = Platform.OS === 'ios'
let iconType = IS_IOS ? 'ios' : 'md'
class CooperationsScreen extends Component {
  constructor (props) {
    super(props)
    this.props.getCategory('cooperations', 1)
    this.props.getTags('cooperation')
  }

  state = {
    loading: true,
    loadingMore: false,
    pageIndex: 1,
    list: [],
    tags: [],
    modalVisible: false,
    tag: I18n.t('all'),
    selectedIndex: 0
  }

  setModalVisible = visible => {
    this.setState({ modalVisible: visible })
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
          this.props.getCategory('cooperations', this.state.pageIndex)
        }
      )
    }
  }
    
  onCardPress = (route, item) => {

    this.props.navigation.navigate(route, { category: 'cooperations', item ,Edit:"EditNewProject" } )
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
        buttonColor={Colors.cerise}
        containerStyle={styles.backButton}
      />
    )
  }

  renderGradient = () => (
    <LinearGradient
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={['#d51189', Colors.cerise]}
      style={styles.gradientHeader}
    />
  )

  renderTitle = () => (
    <View style={styles.titleContainer}>
      {this.renderBackButton()}
      <Text style={styles.title}>{I18n.t('cooperationsTitle')}</Text>
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
      buttonColor={Colors.cerise}
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
            color={Colors.cerise}
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
        selectedColor={Colors.cerise}
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
      'cooperations',
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
        
        <TouchableWithoutFeedback  onPress={()=>this.props.navigation.navigate("AddNewProject")}>

        <View style={styles.AddForm} >
          
          <Icon   name="ios-add" size={35} color="white" />
         
          {/* تعاون */}
          
          
        </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

CooperationsScreen.propTypes = {
  getCategory: func,
  data: object,
  list: array,
  fetching: bool,
  errors: bool
}

CooperationsScreen.defaultProps = {
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
)(CooperationsScreen)
