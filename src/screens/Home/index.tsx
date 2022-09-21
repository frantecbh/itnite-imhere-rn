import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, ScrollView, FlatList, Alert } from "react-native";
import { Participant } from "../../components/Participant";
import { styles } from "./styles";



export function Home(){

  const [participantes, setParticipantes] = useState<string[]>([])

  const [name, setName] = useState('')

  function handlePaticipantAdd(name: string){
      if(!name){
        Alert.alert("Atenção", "Informe o nome do participante")
        return
      }

      if(participantes.includes(name)){
        Alert.alert("Participante", "Este participante já existe")
        return
      }
      setParticipantes(state => [...state, name])

      setName("")

  }

  function handleParticipantRemove(name: string){


      Alert.alert("Remover",`Tem certeza que deseja remover o participante${name}?`,[
        {
          text: 'Sim',
          onPress: () => setParticipantes(participantes.filter((participante) => participante !== name))

        },
        {
          text: 'Não',
          style: 'cancel'
        }
      ])


  }

  return(
   <View
    style={styles.container}
   >
     <Text style={styles.eventName}
      >Nome Evento</Text>
     <Text style={styles.eventDate}>
      Quinta, 01 de Setembro de 2022
     </Text>

     <View style={styles.form}>

     <TextInput
     style={styles.input}
     placeholder="Nome do participante"
     placeholderTextColor="#6b6b6b"
     value={name}
     onChangeText={setName}

      />
     <TouchableOpacity
     style={styles.button}
     onPress={() => handlePaticipantAdd(name)}
     >
      <Text style={styles.buttonText}>
       +
      </Text>
     </TouchableOpacity>
     </View>

<FlatList
  data={participantes}
  keyExtractor={item => item}
  showsVerticalScrollIndicator={false}
  renderItem={({item}) => (
    <Participant key={item} name={item} onRemove={() => handleParticipantRemove(item)} />
  )}
  ListEmptyComponent={() => (
    <Text style={styles.listEmptyText}>Ninguém chegou no eveto ainda? Adicione participantes</Text>
  )}
/>


{/* <ScrollView showsVerticalScrollIndicator={false}>


    {
      participantes.map((participante) => (
<Participant key={participante} name={participante} onRemove={() => handleParticipantRemove('Frantec!')} />

      ))
    }
</ScrollView> */}



     </View>

  )
}

