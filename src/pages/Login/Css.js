import { StyleSheet} from 'react-native';
const css = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#FFF',
      alignItems: 'center',
      marginTop:40
    },
    blocoLogin:{
      backgroundColor: '#006494',
      flex:1,

    },
    header:{
      marginTop:'14%',
      marginBottom:'8%',
      paddingStart:'10%'
    },
    bemVindo:{
      fontSize:28,
      fontWeight:'bold',
      color:'#FFF'
    },
    formLogin:{
      backgroundColor:'#FFF',
      flex:1,
      borderTopLeftRadius:25,
      borderTopRightRadius:25,
      paddingStart:'10%',
      paddingEnd:'5%'
    },
    title:{
      fontSize:20,
      marginTop:28
    },
    input:{
      borderBottomWidth:1,
      height:40,
      marginBottom:12,
      fontSize:16
    },
    btnContainer: {
      flex:1,
      alignItems: 'center',
      marginTop:40
    },
    btnLogin:{
      backgroundColor:'#1B98E0',
      width:'50%',
      borderRadius:4,
      paddingVertical:8,
      marginTop:14,
      justifyContent:'center',
      alignItems:'center'
    },
    btnTextLogin:{
      color:'#FFF',
      fontSize:25,
      fontWeight:'bold'
    },
    btnRegister:{
      marginTop:15,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#FFF',
      borderRadius:4,
      paddingVertical:8,
      padding:14
    },
    btnTextRegister:{
      fontSize:15,
      fontWeight:'bold',
      color:'#1B98E0'
    },
    btnRegisterPress: {
      marginTop:15,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:4,
      paddingVertical:8,
      padding:14
    }
});
  
export {css};