  import React, { Component } from 'react'
  import { View, Text, ActivityIndicator,Image, Platform,TouchableWithoutFeedback,ScrollView ,TouchableOpacity } from 'react-native'
  import TextInput from '../../../../Components/Controls/TextInput'
  import { object, bool, func, array } from 'prop-types'
  import { connect } from 'react-redux'

  import ProductCard from '../../../../Components/ProductCard'

  import Button from '../../../../Components/Controls/Button'
  import DropdownModal from '../../../../Components/DropdownModal'

  import CategoriesActions from '../../../../Redux/Actions/Categories'
  import TagsActions from '../../../../Redux/Actions/Tags'

  import Icon from "react-native-vector-icons/Ionicons";

  import I18n from '../../../../I18n/I18n'
  import { Colors } from '../../../../Theme'
  import styles from './styles'

  const IS_IOS = Platform.OS === 'ios'
  let iconType = IS_IOS ? 'ios' : 'md'
  class MarketScreen extends Component {
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
      selectedIndex: 0,
      searchText: ''

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
            iconTintColor: Colors.gray,
            iconStyle: styles.backButtonIcon
          }}
          type='transparent'
          buttonColor={Colors.purble}
          containerStyle={styles.backButton}
        />
      )
    }
  
  

    

  renderHeader = () => {
    const { fetching } = this.props

    return (
      <View style={styles.titleContainer}>
        <View>

            {this.renderBackButton()}
        </View>

  <View style={styles.search}>

  <TextInput
            style={styles.searchBox}
            onChangeText={searchText => {
              this.setState({ searchText })
            }}
            value={this.state.searchText}
            placeholder={I18n.t('search')}
            editable={!fetching}
            /> 
            </View>
      </View>
    )
  }  
  
  
 

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
        buttonColor={Colors.purble}
        title={this.state.tag}
      />
    )


    renderList = () => {
      const { loading, loadingMore, list } = this.state
  
      return (

<ScrollView>

        <View style={styles.body}>
          {loading && (
            <ActivityIndicator
              size='small'
              color={Colors.cerulean}
              style={styles.fetching}
            />
          )}
        {!loading && (

          <View style={styles.SellingProductsContainer}>
          <View>
        <TouchableOpacity style={styles.textwithicon} >
          <Icon  name="ios-arrow-back" size={18} color={Colors.brownGrey} />
        <Text style={styles.moreSellingProducts} >{I18n.t('moreSellingProducts')}</Text>
        </TouchableOpacity>

        </View>      
          <Text style={styles.SellingProducts} >{I18n.t('SellingProducts')}</Text>
          </View> 
          )} 
         
          <ScrollView>

          <ProductCard
            data={list}
            onItemPress={this.onCardPress}
            handleLoadMore={this.handleLoadMore}
            loadingMore={loadingMore}
          /> 
           </ScrollView>
           {!loading && (

                  <View style={styles.SellingProductsContainer}>
                  <View>
                  <TouchableOpacity style={styles.textwithicon} >
                  <Icon  name="ios-arrow-back" size={18} color={Colors.brownGrey} />
                  <Text style={styles.moreSellingProducts} >{I18n.t('moreSellingProducts')}</Text>
                  </TouchableOpacity>

                  </View>      
                  <Text style={styles.SellingProducts} >{I18n.t('ProductsForRent')}</Text>
                  </View> 
                  )} 

           <ScrollView>

            <ProductCard
              data={list}
              onItemPress={this.onCardPress}
              handleLoadMore={this.handleLoadMore}
              loadingMore={loadingMore}
            /> 
            </ScrollView>
        </View>
</ScrollView>
      



      /* Rent Product */



      
      )
    }





    // renderList = () => {
    //   const { loading, loadingMore, list } = this.state

    //   return (
    //     <ScrollView >
    //     <View style={styles.body}>
    //       {/* {loading && (
    //         <ActivityIndicator
    //           size='small'
    //           color={Colors.cerulean}
    //           style={styles.fetching}
    //         />
    //         )} */}
          
             
    //       <View  > 
             
    //     <View style={styles.SellingProductsContainer}>
    //       <View>
    //     <TouchableOpacity style={styles.textwithicon} >
    //       <Icon  name="ios-arrow-back" size={18} color={Colors.brownGrey} />
    //     <Text style={styles.moreSellingProducts} >{I18n.t('moreSellingProducts')}</Text>
    //     </TouchableOpacity>

    //     </View>      
    //       <Text style={styles.SellingProducts} >{I18n.t('SellingProducts')}</Text>
    //       </View> 
            
    //         </View> 


    //   <ScrollView 
    //   horizontal={true}
    //   >
    //     <View
    //           style={styles.sellingProductsContainer}>              
    //           <Image
    //         style={styles.sellingProductsImage}
    //         source={{uri:"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphoneX-spacegray_FMT_WHH?wid=400&hei=400&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1546626271267"}}
    //         />
    //         <Text style={styles.sellingProductsName}> iPhone X</Text>
    //         <Text style={styles.sellingProductsPrice}> 12.000 LE</Text>
    //         <View style={styles.sellingProductsIcon2} >
    //         <Text style={styles.sellingProductsPlace} >مدينة الشيخ الزايد  </Text>
    //         <Icon  name="md-pin" size={18} color={Colors.brownGrey} />   
    //       </View>
    //           </View> 




    //          <View
    //          style={styles.sellingProductsContainer}>              
    //          <Image
    //       style={styles.sellingProductsImage}
    //       source={{uri:"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphoneX-spacegray_FMT_WHH?wid=400&hei=400&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1546626271267"}}
    //       />
    //       <Text style={styles.sellingProductsName}> iPhone X</Text>
    //       <Text style={styles.sellingProductsPrice}> 12.000 LE</Text>
    //       <View style={styles.sellingProductsIcon2} >
    //       <Text style={styles.sellingProductsPlace} >مدينة الشيخ الزايد  </Text>
    //       <Icon  name="md-pin" size={18} color={Colors.brownGrey} />   
    //     </View>
    //          </View> 




    //          <View
    //          style={styles.sellingProductsContainer}>              
    //          <Image
    //       style={styles.sellingProductsImage}
    //       source={{uri:"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphoneX-spacegray_FMT_WHH?wid=400&hei=400&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1546626271267"}}
    //       />
    //       <Text style={styles.sellingProductsName}> iPhone X</Text>
    //       <Text style={styles.sellingProductsPrice}> 12.000 LE</Text>
    //       <View style={styles.sellingProductsIcon2} >
    //       <Text style={styles.sellingProductsPlace} >مدينة الشيخ الزايد  </Text>
    //       <Icon  name="md-pin" size={18} color={Colors.brownGrey} />   
    //     </View>
    //          </View> 
    //          </ScrollView>
 

    //       {/* <CardsList
    //         data={list}
    //         onItemPress={this.onCardPress}
    //         handleLoadMore={this.handleLoadMore}
    //         loadingMore={loadingMore}
    //       /> */}



    //         {/* rent Products */}
    //         <View  > 
             
    //     <View style={styles.SellingProductsContainer}>
    //       <View>

    //     <TouchableOpacity style={styles.textwithicon} >
    //       <Icon  name="ios-arrow-back" size={18} color={Colors.brownGrey} />
    //     <Text style={styles.moreSellingProducts} >{I18n.t('moreProductsForRent')}</Text>
    //     </TouchableOpacity>

    //     </View>      
    //       <Text style={styles.SellingProducts} >{I18n.t('ProductsForRent')}</Text>
    //       </View> 
            
    //         </View> 


    //   <ScrollView 
    //   horizontal={true}
    //   >
    //     <View
    //           style={styles.sellingProductsContainer}>              
    //           <Image
    //         style={styles.sellingProductsImage}
    //         source={{uri:"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphoneX-spacegray_FMT_WHH?wid=400&hei=400&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1546626271267"}}
    //         />
    //         <Text style={styles.sellingProductsName}> iPhone X</Text>
    //         <Text style={styles.sellingProductsPrice}> 12.000 LE</Text>
    //         <View style={styles.sellingProductsIcon2} >
    //         <Text style={styles.sellingProductsPlace} >مدينة الشيخ الزايد  </Text>
    //         <Icon  name="md-pin" size={18} color={Colors.brownGrey} />   
    //       </View>
    //           </View> 




    //          <View
    //          style={styles.sellingProductsContainer}>              
    //          <Image
    //       style={styles.sellingProductsImage}
    //       source={{uri:"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphoneX-spacegray_FMT_WHH?wid=400&hei=400&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1546626271267"}}
    //       />
    //       <Text style={styles.sellingProductsName}> iPhone X</Text>
    //       <Text style={styles.sellingProductsPrice}> 12.000 LE</Text>
    //       <View style={styles.sellingProductsIcon2} >
    //       <Text style={styles.sellingProductsPlace} >مدينة الشيخ الزايد  </Text>
    //       <Icon  name="md-pin" size={18} color={Colors.brownGrey} />   
    //     </View>
    //          </View> 




    //          <View
    //          style={styles.sellingProductsContainer}>              
    //          <Image
    //       style={styles.sellingProductsImage}
    //       source={{uri:"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphoneX-spacegray_FMT_WHH?wid=400&hei=400&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1546626271267"}}
    //       />
    //       <Text style={styles.sellingProductsName}> iPhone X</Text>
    //       <Text style={styles.sellingProductsPrice}> 12.000 LE</Text>
    //       <View style={styles.sellingProductsIcon2} >
    //       <Text style={styles.sellingProductsPlace} >مدينة الشيخ الزايد  </Text>
    //       <Icon  name="md-pin" size={18} color={Colors.brownGrey} />   
    //     </View>
    //          </View> 
    //          </ScrollView>


    //     </View>
    //     </ScrollView>
    //   )
    // }

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
          {this.renderHeader()}
          {this.renderButton()}
          {this.renderList()}
          {this.renderModal()}

        <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate("AddProduct")}>
          <View style={styles.AddForm} >
            <Icon   name="ios-add" size={35} color="white" />
          </View>
          </TouchableWithoutFeedback>
          
        </View>
      )
    }
  }

  MarketScreen.propTypes = {
    getCategory: func,
    data: object,
    list: array,
    fetching: bool,
    errors: bool
  }

  MarketScreen.defaultProps = {
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
  )(MarketScreen)
