<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const expresion = ref('');

const botones = [
  { valor: 'C', texto: 'C', clase: 'operador' },
  { valor: '←', texto: '←', clase: 'operador' },
  { valor: '%', texto: '%', clase: 'operador' },
  { valor: '/', texto: '÷', clase: 'operador' },
  { valor: '7', texto: '7' },
  { valor: '8', texto: '8' },
  { valor: '9', texto: '9' },
  { valor: '*', texto: '×', clase: 'operador' },
  { valor: '4', texto: '4' },
  { valor: '5', texto: '5' },
  { valor: '6', texto: '6' },
  { valor: '-', texto: '−', clase: 'operador' },
  { valor: '1', texto: '1' },
  { valor: '2', texto: '2' },
  { valor: '3', texto: '3' },
  { valor: '+', texto: '+', clase: 'operador' },
  { valor: '0', texto: '0', clase: 'cero' },
  { valor: '.', texto: '.' },
  { valor: '=', texto: '=', clase: 'igual' },
];

function manejarEntrada(valor) {
  if (valor === 'C') {
    expresion.value = '';
  } else if (valor === '←') {
    expresion.value = expresion.value.slice(0, -1);
  } else if (valor === '=') {
    calcular();
  } else {
    expresion.value += valor;
  }
}

function calcular() {
  // Solo se permiten dígitos, operadores básicos, punto y paréntesis
  if (!/^[0-9+\-*/.%\s]*$/.test(expresion.value)) {
    expresion.value = 'Error';
    expresion.value = '';
    return;
  }
  try {
    const resultado = evaluarExpresion(expresion.value);
    expresion.value = String(resultado);
  } catch {
    expresion.value = '';
  }
}

// Evaluador seguro de expresiones aritméticas (sin eval ni new Function)
function evaluarExpresion(exp) {
  const tokens = exp.match(/(\d+\.?\d*|\.\d+|[+\-*/%])/g);
  if (!tokens) throw new Error('Expresión inválida');

  // Primero resolvemos * / %
  const paso1 = [];
  let i = 0;
  while (i < tokens.length) {
    const token = tokens[i];
    if (token === '*' || token === '/' || token === '%') {
      const prev = paso1.pop();
      const next = parseFloat(tokens[++i]);
      let resultado;
      if (token === '*') resultado = prev * next;
      else if (token === '/') resultado = prev / next;
      else resultado = prev % next;
      paso1.push(resultado);
    } else {
      paso1.push(parseFloat(token) || token);
    }
    i++;
  }

  // Luego resolvemos + -
  let total = paso1[0];
  for (let j = 1; j < paso1.length; j += 2) {
    const operador = paso1[j];
    const siguiente = paso1[j + 1];
    if (operador === '+') total += siguiente;
    else if (operador === '-') total -= siguiente;
  }

  return Math.round(total * 1e10) / 1e10;
}

function manejarTeclado(e) {
  if (/[0-9+\-*/.%]/.test(e.key)) {
    manejarEntrada(e.key);
  } else if (e.key === 'Enter') {
    calcular();
  } else if (e.key === 'Backspace') {
    manejarEntrada('←');
  } else if (e.key === 'Escape') {
    manejarEntrada('C');
  }
}

onMounted(() => document.addEventListener('keydown', manejarTeclado));
onUnmounted(() => document.removeEventListener('keydown', manejarTeclado));
</script>

<template>
  <div class="calculadora">
    <input type="text" id="pantalla" :value="expresion" disabled aria-label="Pantalla de resultados">
    <div class="botones">
      <button
        v-for="boton in botones"
        :key="boton.valor"
        :class="['btn', boton.clase]"
        :aria-label="boton.texto"
        @click="manejarEntrada(boton.valor)"
      >
        {{ boton.texto }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.calculadora {
  background: #1e1e2f;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  width: 320px;
}

#pantalla {
  width: 100%;
  height: 70px;
  margin-bottom: 15px;
  padding: 10px 15px;
  font-size: 2rem;
  text-align: right;
  border: none;
  border-radius: 12px;
  background: #11111c;
  color: #fff;
}

.botones {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.btn {
  padding: 18px;
  font-size: 1.3rem;
  border: none;
  border-radius: 12px;
  background: #33334d;
  color: #fff;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
}

.btn:hover {
  background: #44446b;
}

.btn:active {
  transform: scale(0.95);
}

.operador {
  background: #ff9f43;
  color: #fff;
}

.operador:hover {
  background: #ffb066;
}

.igual {
  grid-column: span 2;
  background: #28c76f;
}

.igual:hover {
  background: #34e085;
}

.cero {
  grid-column: span 1;
}
</style>
