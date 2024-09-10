import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
} from 'react-native';

export default function App() {
  const [tempo, setTempo] = useState('');
  const [materiais, setMateriais] = useState('');
  const [lucro, setLucro] = useState('');
  const [resultado, setResultado] = useState(null);

  const validarInputs = () => {
    if (
      isNaN(tempo) ||
      isNaN(materiais) ||
      isNaN(lucro) ||
      tempo.trim() === '' ||
      materiais.trim() === '' ||
      lucro.trim() === '' ||
      parseFloat(tempo) < 0 ||
      parseFloat(materiais) < 0 ||
      parseFloat(lucro) < 0
    ) {
      return false;
    }
    return true;
  };

  const calcularTotal = () => {
    if (!validarInputs()) {
      Alert.alert(
        'Erro',
        'Por favor, insira valores válidos e não negativos em todos os campos.',
      );
      return;
    }

    const tempoEstimado = parseFloat(tempo.replace(',', '.') || '0');
    const custoMateriais = parseFloat(materiais.replace(',', '.') || '0');
    const percentualLucro = parseFloat(lucro.replace(',', '.') || '0');

    const taxaTempo = (tempoEstimado / 60) * 15.00;
    const subtotal = custoMateriais + taxaTempo;
    const lucroCalculado = (percentualLucro / 100) * subtotal;
    const totalComLucro = subtotal + lucroCalculado;

    setResultado({
      tempoEstimado,
      custoMateriais,
      taxaTempo,
      subtotal,
      percentualLucro,
      lucroCalculado,
      totalComLucro,
    });

    Keyboard.dismiss();
  };

  const limparDados = () => {
    setTempo('');
    setMateriais('');
    setLucro('');
    setResultado(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de Custos</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tempo estimado (minutos)"
          keyboardType="numeric"
          value={tempo}
          onChangeText={setTempo}
        />
        <TextInput
          style={styles.input}
          placeholder="Custo dos Materiais (R$)"
          keyboardType="numeric"
          value={materiais}
          onChangeText={setMateriais}
        />
        <TextInput
          style={styles.input}
          placeholder="Porcentagem de Lucro (%)"
          keyboardType="numeric"
          value={lucro}
          onChangeText={setLucro}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={calcularTotal}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.clearButton} onPress={limparDados}>
        <Text style={styles.clearButtonText}>Limpar</Text>
      </TouchableOpacity>

      {resultado && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            Tempo Estimado: {resultado.tempoEstimado.toFixed(2)} minutos
          </Text>
          <Text style={styles.resultText}>
            Custo dos Materiais: R$ {resultado.custoMateriais.toFixed(2)}
          </Text>
          <Text style={styles.resultText}>
            Taxa por Tempo: R$ {resultado.taxaTempo.toFixed(2)}
          </Text>
          <Text style={styles.resultText}>
            Subtotal: R$ {resultado.subtotal.toFixed(2)}
          </Text>
          <Text style={styles.resultText}>
            Porcentagem de Lucro: {resultado.percentualLucro.toFixed(2)}%
          </Text>
          <Text style={styles.resultText}>
            Lucro: R$ {resultado.lucroCalculado.toFixed(2)}
          </Text>
          <Text style={styles.totalText}>
            Total com Lucro: R$ {resultado.totalComLucro.toFixed(2)}
          </Text>
        </View>
      )}

      <View style={styles.developerContainer}>
        <Text style={styles.developerText}>Desenvolvedor: Lucas Dos Santos</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8bbd0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E53935',
    marginTop: 20,
  },
  developerContainer: {
    marginTop: 20,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    width: '100%',
    alignItems: 'center',
  },
  developerText: {
    fontSize: 14,
    color: '#777',
  },
});