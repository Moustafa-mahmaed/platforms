import React, {Component} from 'react';
   import Pusher from 'pusher-js/react-native';
import { connect } from 'react-redux'
import { GiftedChat ,Send } from 'react-native-gifted-chat'
import Echo from "laravel-echo";
import ChatView from './ChatView';
import { Colors } from '../../../../../Theme'

 import pusherConfig from './pusher.json';
  
import { StyleSheet, Text,View, KeyboardAvoidingView ,ActivityIndicator } from 'react-native';

window.Pusher = Pusher
let token ;
 let options = {
  // encrypted: false,
  // key: '48d96bfcc4290ca045f2',
  // wsHost: 'https://forums.trendleez.com',
  // wsPort: '6001',
  
   disableStats: true,
   authEndpoint:  'https://forums.trendleez.com' +'/broadcasting/auth',
   logToConsole: true,
  "appId":"896434",
    "key":"48d96bfcc4290ca045f2",
    "secret":"17232f5c569e46daa5d7",
    wsHost: "https://forums.trendleez.com", wsPort: 80,
    "cluster":"eu",
    "encrypted":true,
    "restServer":"https://forums.trendleez.com"
};
class ChatClient extends Component {

    constructor(props) {
        super(props);
       
       
        this.state = {
      messages: [],
      senderId:"",
      senderName:"",
       ReciverId:""  ,
       ReciverName:"",
       conversation_id:""
     

    
    };

   // init  
    
  //let PusherClient = new Pusher(options.key,options);
 
  

    }  
    
 makeRemoteRequest = () => {
    //  edit
   const uri_api=`https://forums.influancy.com/api/conversations/${this.props.navigation.state.params.conversation_id}`;

   var object = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    }
   
};

fetch(uri_api, object)
.then((response) =>
response.json())
.then((responseJson) => {
  //  console.log( responseJson.messages.data.length);
   
        let messages = [];
        for (var i = 0; i < responseJson.messages.data.length; i++) {
          messages.push({
            _id: responseJson.messages.data[i].id,
            text: responseJson.messages.data[i].body,
            createdAt: responseJson.messages.data[i].created_at,
            user: {
              _id: responseJson.messages.data[i].user.id,
              name: responseJson.messages.data[i].user.name,
              avatar: responseJson.messages.data[i].user.avatar
            }
          });
        }
        let conversation_id = responseJson.conversation.id ;
        let  ReciverId = responseJson.conversation.users[0].id;
        let ReciverName  = responseJson.conversation.users[0].name;
           let senderId  = responseJson.conversation.users[1].id;
        let   senderName = responseJson.conversation.users[1].name;
        this.setState({
          messages: messages.reverse() ,
          senderId: senderId,
      senderName:senderName,
       ReciverId:ReciverId  ,
       ReciverName:ReciverName,
       conversation_id:conversation_id

         
       



        });

      
  
})
.catch(function(err) {
  
        alert("حدث خطأ ! الرجاء التواصل مع الدغم الفني.");
});


   
  };
  

 makeRemoteRequest = () => {
    //  edit
   const uri_api=`https://forums.influancy.com/api/conversations/${this.props.navigation.state.params.conversation_id}`;

   var object = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    }
   
};

fetch(uri_api, object)
.then((response) =>
response.json())
.then((responseJson) => {
  //  console.log( responseJson.messages.data.length);
   
        let messages = [];
        for (var i = 0; i < responseJson.messages.data.length; i++) {
          messages.push({
            _id: responseJson.messages.data[i].id,
            text: responseJson.messages.data[i].body,
            createdAt: responseJson.messages.data[i].created_at,
            user: {
              _id: responseJson.messages.data[i].user.id,
              name: responseJson.messages.data[i].user.name,
              avatar: responseJson.messages.data[i].user.avatar
            }
          });
        }
        let conversation_id = responseJson.conversation.id ;
        let  ReciverId = responseJson.conversation.users[0].id;
        let ReciverName  = responseJson.conversation.users[0].name;
           let senderId  = responseJson.conversation.users[1].id;
        let   senderName = responseJson.conversation.users[1].name;
        this.setState({
          messages: messages.reverse() ,
          senderId: senderId,
      senderName:senderName,
       ReciverId:ReciverId  ,
       ReciverName:ReciverName,
       conversation_id:conversation_id

         
       



        });
        
    //  console.log("______messages________");
    //  console.log(this.state.messages);
    //  console.log(senderId +" " + senderName+" " +ReciverId+" " +ReciverName+" " );
    //  console.log("______________");
    
      
  
})
.catch(function(err) {
  
        alert("حدث خطأ ! الرجاء التواصل مع الدغم الفني.");
});


   
  };

  componentDidMount() {
    var PusherClient= new Pusher(options.key,options);
     this.makeRemoteRequest();
       
   let echo = new Echo({
  broadcaster: 'pusher',
  host: 'https://forums.trendleez.com:6001',  
  client:PusherClient,
      auth: {
        headers: {
          Authorization: "Bearer " + token
        }
      }
});
// console.log(PusherClient);
echo.channel('DemoChannel').listen('WebSocketDemoEvent', (e) => {
this.onReceive(e);
});

  }

componentDidUpdate(){
  // console.log(this.state.messages);
  
   var PusherClient= new Pusher(options.key,options);
  
       
   let echo = new Echo({
  broadcaster: 'pusher',
  host: 'https://forums.trendleez.com:6001',  
  client:PusherClient,
      auth: {
        headers: {
          Authorization: "Bearer " + token
        }
      }
});
// console.log(PusherClient);
echo.channel('DemoChannel').listen('WebSocketDemoEvent', (e) => {
// this.onReceive(e);
// console.log(e);

});
}

  onSend(messages = []) {
   
    

    for (var i = 0; i < messages.length; i++) {
      // console.log(messages[i]);

    
       const update_msg_uri_api="https://forums.influancy.com/api/messages";

   var object = {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    },
      body:JSON.stringify( {
        "user_name":this.state.ReciverName, // me 
	"conversation_id":this.state.conversation_id, // number of conversation
	"body":messages[i].text
                     
                     })
   
};

fetch(update_msg_uri_api, object)
 .then((response) =>{
          console.log(":::::::::::::::::::")
          console.log(response)
          console.log(":::::::::::::::::::")

       
         
          if(response.ok){

          // console.log("ok")
           
          }
          response.text()
        
        }
        )
        .then((responseData) => {})
        .catch(function(err) {
          alert("حدث خطأ ! الرجاء التواصل مع الدغم الفني.");
        });
   

  }
  this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));

}

  onReceive(message) {
    this.setState(previousState => {
      return {
        messages: GiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 1000000),
          text: message.message,
          createdAt: new Date(),
          user: {
            _id: message.from.id,
            name: message.from.name
            // avatar: 'https://facebook.github.io/react/img/logo_og.png',
          }
        })
      };
    });
  }

  renderSend(props) {
    return (
      <Send {...props}>
        <View style={{ marginRight: 10, marginBottom: 5 }}>
          <Text
            style={{
              color: "#0084ff",
              fontWeight: "600",
              fontSize: 17,
              backgroundColor: "transparent",
              marginBottom: 12,
              marginLeft: 10,
              marginRight: 10
            }}>
            إرسال
          </Text>
        </View>
      </Send>
    );
  }

  render() {
    // const navigation = this.props.navigation;
    // const fromUser = this.props.navigation.getParam("fromUser");
     const isLoading = this.state.isLoading;
   const senderId = this.state.senderId;
   const senderName = this.state.senderName;
   const ReciverId = this.state.ReciverId;
   const ReciverName = this.state.ReciverName;
  //  console.log("__________this.props_________");
  //  console.log(this.props.navigation.state.params.conversation_id);
  //  console.log("___________________");
 
   
    return (
  
 <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
       user={{
                _id: Number(ReciverId)  ,
                name: ReciverName
              }}
       
              placeholder={"اكتب رسالتك هنا..."}
              isAnimated={true}
              renderSend={this.renderSend}
              inverted={true}
            //  showUserAvatar={true}
             // renderAvatar={null}
              textInputStyle={{ textAlign: "right" }}
      />
    
    )
    }
}
        
const mapDispatchToProps = dispatch => ({})

const mapStateToProps = (state, ownProps) => {
  token=state.login.token
 
    return {
  
    }
  }
export default connect(
  mapStateToProps,
    mapDispatchToProps
)(ChatClient)
