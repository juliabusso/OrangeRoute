import { Button,View,Text,StyleSheet } from "react-native";

export default function HomeScreen({navigation}){
    
    return(
        <View style={styles.container}>
            <Text>Sou a Tela Inicial</Text>
            <Button 
                title="Ir para login" 
                onPress={()=>navigation.navigate('login')}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'cyan',
        alignItems:'center',
        justifyContent:'center'
    }
})