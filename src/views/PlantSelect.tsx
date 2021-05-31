import React, { useEffect, useState } from 'react'

import { View, 
         Text, 
         StyleSheet, FlatList, ActivityIndicator} from 'react-native'

import { EnvironmentButton } from '../components/EnviromentButton'
import {Header} from '../components/Header'
import { PlantCardPrimary } from '../components/PlantCardPrimary'
import {Load} from '../components/Load'

// Importe da api para a criação dos card e categorias de seleção
import api from '../services/api'

import colors from '../styles/colors'
import fonts from '../styles/fonts'
import { color } from 'react-native-reanimated'

interface EnvironmentProps{
  key: string;
  title: string;
}
// consumindo dados da API
interface PlantProps{
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string;
  }
}

export function PlantSelect(){
  const [enviroments, setEnvironments] = useState<EnvironmentProps[]>([])
  const [plants, setPlants] = useState<PlantProps[]>([])
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([])
  const [enviromentSelected, setEnviromentSelected] = useState('all')
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)
  const [loadedAll, setLoadedAll] = useState(false)


  function handleEnviromentSelected(environment: string){
      setEnviromentSelected(environment);


    if(environment == 'all')
      return setFilteredPlants(plants);
    
    const filtered = plants.filter(plant =>
      // verificando se o environment esta incluso em plantas
        plant.environments.includes(environment)
      )
    
    setFilteredPlants(filtered);
  }


  // função que consome os dados da api e amarzena em setPlants
  async function fetchPlants(){
    const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`)

      if(!data)
        return setLoading(true)
      if(page > 1){
        setPlants(oldValue => [...oldValue, ...data])
        setFilteredPlants(oldValue => [...oldValue, ...data])
      }else{
        setPlants(data)
        setFilteredPlants(data)
      }


      
      setLoading(false)
      setLoadingMore(false)
    }

  // Função que tras mais dados conforme o usuario rolar ate o fim da tela
  function handleFetchMore(distance: number){
    if(distance < 1)
      return

    setLoadingMore(true)
    setPage(oldValue => oldValue + 1)
    fetchPlants()
  }




  // carregando informação antes de ser renderizado
  useEffect(() => {
    async function fetchEnviroment(){
      const { data } = await api.get('plants_environments?_sort=title&_order=asc')
      setEnvironments([
        {
          key:'all',
          title:'Todos',
        },
        ...data
      ])
    }
    fetchEnviroment()
  },[])
 
  useEffect(() => {
   

    fetchPlants()
  },[])


  if(loading){
    return <Load/>
  }

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Header/>

        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subTitle}>você quer colocar sua planta?</Text>
      </View>

      <View>
        <FlatList
            data={enviroments}
            renderItem={({item}) => (
              <EnvironmentButton title={item.title}
                                active={item.key === enviromentSelected}
                                onPress={() => handleEnviromentSelected(item.key)}
                                />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.enviromentList}
        />
      </View>

      <View style={styles.plants}>
        <FlatList
            data={filteredPlants}
            renderItem={({ item }) => (
              <PlantCardPrimary data={item}/>
            )}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            onEndReachedThreshold={0.1}
            onEndReached={({ distanceFromEnd}) => handleFetchMore(distanceFromEnd)}

            ListFooterComponent={
              loadingMore 
              ?
              <ActivityIndicator color={colors.green}/>
              :
              <></>
            }
            />
      </View>
      
    </View>
  )
}


const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  header:{
    paddingHorizontal:32,
  },
  title:{
    fontSize:17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight:20,
    marginTop:15,
  },
  subTitle:{
    fontFamily:fonts.text,
    fontSize:17,
    lineHeight:20,
    color:colors.heading,
  },
  enviromentList:{
    height:40,
    justifyContent:'center',
    paddingBottom:5,
    marginLeft:32,
    marginVertical:32,
  },
  plants:{
    flex:1,
    paddingHorizontal:32,
    justifyContent:'center',
  },
 
})