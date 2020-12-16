import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableHighlight, Platform, TouchableWithoutFeedback, Keyboard} from 'react-native';
import Cita from './components/Cita';
import Formulario from './components/Formulario';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [mostrarForm, guardarMostrarForm] = useState(false);
  const [citas, setCitas] = useState([]);
  console.log(citas);

  useEffect(() => {
    const obtenerCitasStorage =  async () => {
      try {
        const citasStorage =  await AsyncStorage.getItem('citas');
        console.log(citasStorage)

        if(citasStorage) {
          setCitas(JSON.parse(citasStorage))
        }
      } catch (error) {
        console.log(error)
      }
    }
    obtenerCitasStorage()
  }, [])
  //elimina los pacientes del state

  const eliminarPaciente = (id) => {

    const citasFiltradas = citas.filter((cita) => cita.id !== id)
    setCitas(citasFiltradas);
    guardarCitasStorage(JSON.stringify(citasFiltradas))
  /*  setCitas((citasActuales) => {
      return citasActuales.filter((cita) => cita.id !== id);
    });
    */
  };

  //Muestra u oculta formulario 

  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarForm);
  }
  const cerrarTeclado = () => {
    Keyboard.dismiss()
  }

  //Almacenar las citas en storage

  const guardarCitasStorage = async (citasJSON) => {
    try {
      AsyncStorage.setItem('citas', citasJSON)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <TouchableWithoutFeedback onPress={() =>cerrarTeclado()}>
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Administrador de citas</Text>
      <TouchableHighlight
        style={styles.btnMostrarForm}
        onPress={() => mostrarFormulario()}>
        <Text style={styles.textoMostrarForm}>{mostrarForm ? 'cancelar crear cita' : 'Crear'}</Text>
      </TouchableHighlight>

      <View style={styles.contenido}>
        {mostrarForm ? (
          <>
             <Text style={styles.titulo}>
            Crear nueva cita
            </Text>
          <Formulario citas={citas} setCitas={setCitas} guardarMostrarForm={guardarMostrarForm} guardarCitasStorage={guardarCitasStorage} />
          </>
        ) : (
          <>
            <Text style={styles.titulo}>
              {citas.length > 0 ? 'Administra tus citas' : 'No hay citas'}
            </Text>
            <FlatList
              style={styles.listado}
              data={citas}
              renderItem={({item}) => (
                <Cita item={item} eliminarPaciente={eliminarPaciente} />
              )}
              keyExtractor={(cita) => cita.id}
            />
          </>
        )}
      </View>
      {/*  renderItem={({item}) si no se destructura   seria  renderItem={(cita) => <Cita item={cita.item} /> */}
      {/*citas.map((cita) => (
        <View>
          <Text>{cita.paciente}</Text>
        </View>
      ))*/}
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#AA076B',
    flex: 1,
  },
  titulo: {
    color: '#fff',
    marginTop: Platform.OS === 'ios' ? 40 : 20 , //codigo especifico para una plataforma u otra
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%',
  },
  listado: {
    flex: 1,
  },
  btnMostrarForm: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10,
  },
  textoMostrarForm: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

//Pendientes el teclado tapa el campo de citas


export default App;
