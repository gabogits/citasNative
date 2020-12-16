import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableHighlight,
  Alert,
  ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shortid from 'shortid';

const Formulario = ({citas, setCitas, guardarMostrarForm, guardarCitasStorage}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const [paciente, guardarPaciente] = useState('');
  const [propietario, guardarPropietario] = useState('');
  const [telefono, guardarTelefono] = useState('');
  const [sintomas, guardarSintomas] = useState('');
  const [fecha, guardarFecha] = useState('');
  const [hora, guardarHora] = useState('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const confirmarFecha = (date) => {
    const opciones = {year: 'numeric', month: 'long', day: '2-digit'};
    guardarFecha(date.toLocaleDateString('es-ES', opciones));
    hideDatePicker();
    // console.warn('A date has been picked: ', date);
  };

  //Muestra u oculta el tine picker

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const confirmarHora = (hora) => {
    const opciones = {hour: 'numeric', minute: '2-digit', hour12: false};
    hideTimePicker();
    guardarHora(hora.toLocaleString('en-US', opciones));
    //console.warn('A date has been picked: ', hora);
  };

  //crear nueva cita
  const crearNuevaCita = () => {
    if (
      paciente.trim() === '' ||
      propietario.trim() === '' ||
      telefono.trim() === '' ||
      fecha.trim() === '' ||
      hora.trim() === '' ||
      sintomas.trim() === ''
    ) {
      mostrarAlerta();
      return;
    }

    const cita = {paciente, propietario, telefono, fecha, hora, sintomas};
    cita.id = shortid.generate();
    console.log(cita);
    //agregar al state
    const citasNuevo = [...citas, cita];

    setCitas(citasNuevo);

    //Pasar las nuevas citas 
    guardarCitasStorage(JSON.stringify(citasNuevo))
    //ocultar el formulario
    guardarMostrarForm(false);
    //resetar el formulario

    guardarPaciente('');
    guardarPropietario('');
    guardarTelefono('');
    guardarSintomas('');
    guardarFecha('');
    guardarHora('');
  };

  const mostrarAlerta = () => {
    Alert.alert(
      'Error', //titulo
      'Todos los campos son obligatorios', //mensaje
      [
        {
          text: 'OK', //Arreglo de botones
        },
      ],
    );
  };
  return (
    <ScrollView style={styles.formulario}>
      {/*Todo lo que ponga en scrollview se va cargar automaticamente, a diferencia de flatilist que unicamente va renderizar lo que este visible en el telefono */}
      <View>
        <Text style={styles.label}>Paciente:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(texto) => guardarPaciente(texto)}
        />
      </View>
      <View>
        <Text style={styles.label}>Dueño:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(texto) => guardarPropietario(texto)}
        />
      </View>
      <View>
        <Text style={styles.label}>Telefono contacto:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(texto) => guardarTelefono(texto)}
          keyboardType="numeric"
        />
      </View>
      <View>
        <Text style={styles.label}>Fecha:</Text>
        <Button title="Seleccionar Fecha" onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={confirmarFecha}
          onCancel={hideDatePicker}
          locale={'es_ES'}
          headerTextIOS="Elige la fecha"
          cancelTextIOS="Cancelar"
          confirmTextIOS="Confirmar"
        />
        <Text> {fecha}</Text>
      </View>
      <View>
        <Text style={styles.label}>Hora:</Text>
        <Button title="Seleccionar hora" onPress={showTimePicker} />
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={confirmarHora}
          onCancel={hideTimePicker}
          locale={'es_ES'}
          headerTextIOS="Elige una Hora"
          cancelTextIOS="Cancelar"
          confirmTextIOS="Confirmar"
        />
        <Text> {hora}</Text>
      </View>
      <View>
        <Text style={styles.label}>Sintomas:</Text>
        <TextInput
          multiline
          style={styles.input}
          onChangeText={(texto) => guardarSintomas(texto)}
        />
      </View>
      <TouchableHighlight
        style={styles.btnSubmit}
        onPress={() => crearNuevaCita()}>
        <Text style={styles.textoSubmit}>Crear</Text>
      </TouchableHighlight>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  formulario: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: '#e1e1e1',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  btnSubmit: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10,
  },
  textoSubmit: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Formulario;
