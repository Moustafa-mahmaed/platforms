import React, { Component } from 'react';
import { View, StyleSheet, Keyboard
, TouchableWithoutFeedback, Text, Dimensions
, KeyboardAvoidingView, Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker'
// import { Permissions, ImagePicker } from 'expo';
// import { MaterialCommunityIcons } from '@expo/vector-icons';

import MaterialIcons from "react-native-vector-icons/MaterialIcons";   
import Icon from "react-native-vector-icons/Ionicons";   
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";   
 
import  CNRichTextEditor , { CNToolbar , getDefaultStyles, convertToObject,convertToHtmlString } from "react-native-cn-richtext-editor";

import {
    Menu,
    MenuOptions, 
    MenuOption,
    MenuTrigger,
    MenuContext,
    MenuProvider,
    renderers
  } from 'react-native-popup-menu';

const { SlideInMenu } = renderers;

const IS_IOS = Platform.OS === 'ios';
const { width, height } = Dimensions.get('window');
const defaultStyles = getDefaultStyles();

const options = {
    title: 'تغيير الصورة الشخصية',
    // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

class App extends Component {
 
    constructor(props) {
        super(props);
        this.customStyles = {...defaultStyles, body: {fontSize: 12}, heading : {fontSize: 16}
        , title : {fontSize: 20}, ol : {fontSize: 12 }, ul: {fontSize: 12}, bold: {fontSize: 12, fontWeight: 'bold', color: 'black'}
        };  
        this.state = {
            avatarSource1:"",
            avatarSource2:"",
            selectedTag : 'body',
            selectedColor : 'default',
            selectedHighlight: 'default',
            colors : ['red', 'green', 'blue'],
            highlights:['yellow_hl','pink_hl', 'orange_hl', 'green_hl','purple_hl','blue_hl'],
            selectedStyles : [],
            // value: [getInitialObject()] get empty editor
            value:  convertToObject('<div><p>اضف موضوع هنا </p></div>'
            , this.customStyles)
        };
        this.uploadimg = this.uploadimg.bind(this);

        this.editor = null;

    }
    ads (r) {
          
                this.editor.insertImage(r, 100,100);
         }
    
         componentDidMount(){
             try{
                    
                 if( this.props.values  && this.props.values !=="" )
                 {
                     
                     this.setState({
                         value: convertToObject(this.props.value
                            , this.customStyles)
                        },function(){
                            // //console.log(this.state.value)
                            
                        }) 
                    } 
                    
                }catch{
                    
                }
        }
async uploadimg()  {

  
    ImagePicker.showImagePicker(options, (response) => {
    //   //console.log('Response = ', response);
            // this.editor.insertImage(result.uri);
      
        // this.setState({
        //   avatarSource1:response
        // },function(){
        //   //console.log(this.state.avatarSource1);
        // })
        
        
        if (response.didCancel) {
        //   alert('User cancelled image picker');
        } else if (response.error) {
        //   //console.log('ImagePicker Error: ', response.error);
        } else {
           
              
           
                      let result =    {
                              uri: response.uri,
                              type: 'image/jpeg',
                             name: response.fileName,
                            }
            //  this.editor.insertImage(result.uri);
            this.setState({
          avatarSource1:result.uri
        },function(){
        //   //console.log(this.state.avatarSource1);
        })
               this.ads(this.state.avatarSource1)

     
        }
      })
    }
    onStyleKeyPress = (toolType) => {
        
        if (toolType == 'image') {
            return;
        }
        else {
            this.editor.applyToolbar(toolType);
        }

    }

    onSelectedTagChanged = (tag) => {

        this.setState({
            selectedTag: tag
        })
    }

    onSelectedStyleChanged = (styles) => { 
        const colors = this.state.colors;  
        const highlights = this.state.highlights;  
        let sel = styles.filter(x=> colors.indexOf(x) >= 0);

        let hl = styles.filter(x=> highlights.indexOf(x) >= 0);
        this.setState({
            selectedStyles: styles,
            selectedColor : (sel.length > 0) ? sel[sel.length - 1] : 'default',
            selectedHighlight : (hl.length > 0) ? hl[hl.length - 1] : 'default',
        })
       
    }

    onValueChanged = (value) => {
        this.setState({
            value: value
        });
        //  alert(convertToHtmlString(value))
    //  //console.log(value)
      
    }

  

    


    // onImageSelectorClicked = (value) => {
    //     if(value == 1) {
    //         this.uploadimg();    
    //     }
   
        
    // }

    onColorSelectorClicked = (value) => {
        
        if(value === 'default') {
            this.editor.applyToolbar(this.state.selectedColor);
        }
        else {
            this.editor.applyToolbar(value);
           
        }

        this.setState({
            selectedColor: value
        });
    }

    onHighlightSelectorClicked = (value) => {
        if(value === 'default') {
            this.editor.applyToolbar(this.state.selectedHighlight);
        }
        else {
            this.editor.applyToolbar(value);
           
        }

        this.setState({
            selectedHighlight: value
        });
    }

    onRemoveImage = ({url, id}) => {        
        // do what you have to do after removing an image
        // //console.log(`image removed (url : ${url})`);
        
    }

    renderImageSelector() {
        return (
            <Menu renderer={SlideInMenu} onSelect={this.uploadimg}>
            <MenuTrigger>
            {/* ================= wait to edit image=================  */}
          {/* <MaterialCommunityIcons  name="image" size={28} color="#737373" /> */}
         {/* 31/10/2019 finish  */}
              
          </MenuTrigger>
       
            <MenuOptions>
                <MenuOption value={1}>
                    <Text style={styles.menuOptionText}>
                       browse photo 
                    </Text>
                </MenuOption>
                
                <View style={styles.divider}/>
                
            
               
            </MenuOptions> 
            </Menu>
        );
    
    }

    renderColorMenuOptions = () => {

        let lst = [];

        if(defaultStyles[this.state.selectedColor]) {
             lst = this.state.colors.filter(x => x !== this.state.selectedColor);
             lst.push('default');
            lst.push(this.state.selectedColor);
        }
        else {
            lst = this.state.colors.filter(x=> true);
            lst.push('default');
        }

        return (
            
            lst.map( (item) => {
                let color = defaultStyles[item] ? defaultStyles[item].color : 'black';
                return (
                    <MenuOption value={item} key={item}>
                       
          <MaterialCommunityIcons  name="format-color-text" size={28} color={color} />

                    </MenuOption>
                );
            })
            
        );
    }

    renderHighlightMenuOptions = () => {
        let lst = [];

        if(defaultStyles[this.state.selectedHighlight]) {
             lst = this.state.highlights.filter(x => x !== this.state.selectedHighlight);
             lst.push('default');
            lst.push(this.state.selectedHighlight);
        }
        else {
            lst = this.state.highlights.filter(x=> true);
            lst.push('default');
        }
        
        

        return (
            
            lst.map( (item) => {
                let bgColor = defaultStyles[item] ? defaultStyles[item].backgroundColor : 'black';
                return (
                    <MenuOption value={item} key={item}>
                     
          <MaterialCommunityIcons  name="marker" size={26} color={bgColor} />

                    </MenuOption>
                );
            })
            
        );
    }

    renderColorSelector() {
       
        let selectedColor = '#737373';
        if(defaultStyles[this.state.selectedColor])
        {
            selectedColor = defaultStyles[this.state.selectedColor].color;
        }
        

        return (
            <Menu renderer={SlideInMenu} onSelect={this.onColorSelectorClicked}>
            <MenuTrigger>
                {/* <MaterialCommunityIcons name="format-color-text" color={selectedColor}
                        size={28} style={{
                            top:2
                        }} />              */}
          <MaterialCommunityIcons  name="format-color-text" size={20} color={selectedColor} />

            </MenuTrigger>
            <MenuOptions customStyles={optionsStyles}>
                {this.renderColorMenuOptions()}
            </MenuOptions>
            </Menu>
        );
    }

    renderHighlight() {
        let selectedColor = '#737373';
        if(defaultStyles[this.state.selectedHighlight])
        { 
            selectedColor = defaultStyles[this.state.selectedHighlight].backgroundColor;
        }
        return (
            <Menu renderer={SlideInMenu} onSelect={this.onHighlightSelectorClicked}>
            <MenuTrigger>
             
          <MaterialCommunityIcons  name="marker" size={20} color={selectedColor} />

            </MenuTrigger>
            <MenuOptions customStyles={highlightOptionsStyles}>
                {this.renderHighlightMenuOptions()}
            </MenuOptions>
            </Menu>
        );
    }

    render() {
    
   
        
        return (
            <KeyboardAvoidingView 
            behavior="position" 
            enabled
         
            keyboardVerticalOffset={IS_IOS ? 0 : 0}
            style={styles.root}
            >
            <MenuProvider style={{flex: 1}}>
            <View>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} >             
                    <View style={styles.main}>
                        <CNRichTextEditor    

                            ref={input => this.editor = input}
                            onSelectedTagChanged={this.onSelectedTagChanged}
                            onSelectedStyleChanged={this.onSelectedStyleChanged}
                            //value={this.props.value !=="" ? this.props.value : this.state.value}
                            value={this.state.value}
                            {...this.props}
                            style={styles.editor}
                            styleList={this.customStyles}

                            foreColor='dimgray' // optional (will override default fore-color)
                            // onValueChanged={this.onValueChanged}
                            onRemoveImage={this.onRemoveImage}

 
                        />      
        {/* <Image style={styles.image} source={{ uri: avatar }} /> */}

                    </View>
                </TouchableWithoutFeedback>

                <View style={styles.toolbarContainer}>

                    <CNToolbar
 
                    
                        style={{
                            height: 35,
                            marginLeft: 10,
                            marginRight: 10,
                        }}
                        iconSetContainerStyle={{
                            flexGrow: 1,
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                        }}
                        size={28} 
                        iconSet={[
                            {
                                type: 'tool',
                                iconArray: [{
                                    toolTypeText: 'bold',
                                    buttonTypes: 'style',
                                    iconComponent: 
          <MaterialCommunityIcons name="format-bold" size={20} color="white" />

                                
                                }, 
                                {
                                    toolTypeText: 'italic',
                                    buttonTypes: 'style',
                                    iconComponent:
                                   
          <MaterialCommunityIcons  name="format-italic" size={20} color="white" />

                                },
                                {
                                    toolTypeText: 'underline',
                                    buttonTypes: 'style',
                                    iconComponent:
          <MaterialCommunityIcons  name="format-underline" size={20} color="white" />

      
                                },
                                {
                                    toolTypeText: 'lineThrough',
                                    buttonTypes: 'style',

                                    iconComponent: 
          <MaterialCommunityIcons  name="format-strikethrough-variant" size={20} color="white" />

                                   
                                }
                            ]
                            },
                            {
                                type: 'seperator'
                            },
                            {
                                type: 'tool',
                                iconArray: [
                                    {
                                        toolTypeText: 'body',
                                        buttonTypes: 'tag',
                                        iconComponent:
                                        
          <MaterialCommunityIcons  name="format-text" size={20} color="white" />

                                    },
                                    {
                                        toolTypeText: 'title',
                                        buttonTypes: 'tag',
                                        iconComponent:
                                 
          <MaterialCommunityIcons  name="format-header-1" size={20} color="white" />

                                    },
                                    {
                                        toolTypeText: 'heading',
                                        buttonTypes: 'tag',
                                        iconComponent:
                                       
          <MaterialCommunityIcons  name="format-header-3" size={20} color="white" />

                                    },
                                    {
                                        toolTypeText: 'ul',
                                        buttonTypes: 'tag',
                                        iconComponent:
                                      
          <MaterialCommunityIcons  name="format-list-bulleted" size={20} color="white" />

                                    },
                                    {
                                        toolTypeText: 'ol',
                                        buttonTypes: 'tag',
                                        iconComponent:
                                      
          <MaterialIcons  name="format-list-numbered" size={20} color="white" />

                                    }
                                ]
                            },
                            {
                                type: 'seperator'
                            },
                            {
                                type: 'tool',
                                iconArray: [
                                {
                                    toolTypeText: 'image',
                                    iconComponent: this.renderImageSelector()
                                },
                                {
                                    toolTypeText: 'color',
                                    iconComponent: this.renderColorSelector()
                                },
                                {
                                    toolTypeText: 'highlight',
                                    iconComponent: this.renderHighlight()
                                }]
                            },
                            
                        ]}
                        selectedTag={this.state.selectedTag}
                        selectedStyles={this.state.selectedStyles}
                        onStyleKeyPress={this.onStyleKeyPress} 
                        backgroundColor="aliceblue" // optional (will override default backgroundColor)
                        color="gray" // optional (will override default color)
                        selectedColor='white' // optional (will override default selectedColor)
                        selectedBackgroundColor='deepskyblue' // optional (will override default selectedBackgroundColor)
                        /> 
                </View>
        </View>
            </MenuProvider>
        </KeyboardAvoidingView>

        );
    }

}

var styles = StyleSheet.create({
    root: {
         flex: 1,
        paddingTop: 5,
        // backgroundColor:'#eee',
        flexDirection: 'column', 
        justifyContent: 'flex-end', 
 
       
       
    },
    main: {
        
        
        flex: 1,
        // marginTop: 10,
        height:300,
       
        marginLeft: 10,
        marginRight: 10,
        paddingBottom: 1,
        alignItems: 'stretch',
    },
    editor: { 
        backgroundColor : '#fff',
        height:200,
        borderRadius:15,
        fontFamily:"frutiger-lt-arabic-65-bold",
        color:"gray",
        

    },
    toolbarContainer: {
        minHeight: 35
    },
    menuOptionText: {
        textAlign: 'center',
        paddingTop: 5,
        paddingBottom: 5,

        
    },
    divider: {
        marginVertical: 0,
        marginHorizontal: 0,
        borderBottomWidth: 1,
        borderColor: '#eee'
    }
});

const optionsStyles = {
    optionsContainer: {
      backgroundColor: 'yellow',
      padding: 0,   
      width: 40,
      marginLeft: width - 40 - 30,
      alignItems: 'flex-end',
    },
    optionsWrapper: {
      //width: 40,
      backgroundColor: 'white',
    },
    optionWrapper: {
       //backgroundColor: 'yellow',
      margin: 2,
    },
    optionTouchable: {
      underlayColor: 'gold',
      activeOpacity: 70,
    },
    // optionText: {
    //   color: 'brown',
    // },
  };

const highlightOptionsStyles = {
optionsContainer: {
    backgroundColor: 'transparent',
    padding: 0,   
    width: 40,
    marginLeft: width - 40,

    alignItems: 'flex-end',
},
optionsWrapper: {
    //width: 40,
    backgroundColor: 'white',
},
optionWrapper: {
    //backgroundColor: 'yellow',
    margin: 2,
},
optionTouchable: {
    underlayColor: 'gold',
    activeOpacity: 70,
},
// optionText: {
//   color: 'brown',
// },
};

export default App;
