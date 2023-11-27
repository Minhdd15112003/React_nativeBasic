import { StyleSheet } from "react-native"

const stylesDialogEdit = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin: 10,
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },

       labelContainer: {
    alignSelf: 'flex-start',
    marginLeft: 16
},
  labelText: {
      fontSize: 16,
      fontWeight: 'bold',
      padding: 5,
      color: 'blue',
  },
  inputContainer: {
    
      backgroundColor: '#FFFFFF',
      borderRadius: 30,
      width: 350,
      height: 50,
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: "#808080",
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      
  },
  inputs: {
      height: 45,
      marginLeft: 16,
      borderBottomColor: '#FFFFFF',
      flex: 1,
      paddingRight: 15,
     
  },
})
export default stylesDialogEdit