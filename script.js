const pantalla = document.getElementById('pantalla');
const botones = document.querySelectorAll('.btn');

let expresion = '';

botones.forEach(boton => {
  boton.addEventListener('click', () => {
    const valor = boton.dataset.value;
    manejarEntrada(valor);
  });
});

function manejarEntrada(valor) {
  if (valor === 'C') {
    expresion = '';
  } else if (valor === '←') {
    expresion = expresion.slice(0, -1);
  } else if (valor === '=') {
    calcular();
    return;
  } else {
    expresion += valor;
  }
  pantalla.value = expresion;
}

function calcular() {
  // Solo se permiten dígitos, operadores básicos, punto y paréntesis
  if (!/^[0-9+\-*/.%\s]*$/.test(expresion)) {
    pantalla.value = 'Error';
    expresion = '';
    return;
  }
  try {
    const resultado = evaluarExpresion(expresion);
    pantalla.value = resultado;
    expresion = String(resultado);
  } catch {
    pantalla.value = 'Error';
    expresion = '';
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

document.addEventListener('keydown', (e) => {
  if (/[0-9+\-*/.%]/.test(e.key)) {
    manejarEntrada(e.key);
  } else if (e.key === 'Enter') {
    calcular();
  } else if (e.key === 'Backspace') {
    manejarEntrada('←');
  } else if (e.key === 'Escape') {
    manejarEntrada('C');
  }
});
