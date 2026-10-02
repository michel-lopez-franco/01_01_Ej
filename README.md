# Calculadora

Calculadora web simple construida con HTML, CSS y JavaScript puro (sin dependencias).

## Características

- Operaciones básicas: suma, resta, multiplicación, división y porcentaje.
- Botones de limpiar (`C`) y retroceso (`←`).
- Soporte de teclado (números, operadores, `Enter`, `Backspace`, `Escape`).
- Evaluación de expresiones propia (sin `eval`/`Function`), validando la entrada para evitar inyección de código.

## Estructura del proyecto

```
├── index.html   # Estructura y botones de la calculadora
├── style.css    # Estilos y diseño
└── script.js    # Lógica de la calculadora
```

## Uso

Abre [index.html](index.html) directamente en tu navegador, no requiere instalación ni servidor.

## Controles de teclado

| Tecla               | Acción          |
| ------------------- | --------------- |
| `0-9`, `.`, `+ - * / %` | Insertar valor/operador |
| `Enter`              | Calcular (`=`)  |
| `Backspace`          | Borrar último carácter |
| `Escape`             | Limpiar (`C`)   |
