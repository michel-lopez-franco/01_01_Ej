# Calculadora

Calculadora web construida con **Vue 3** (Composition API + `<script setup>`) y **Vite**.

## Características

- Operaciones básicas: suma, resta, multiplicación, división y porcentaje.
- Botones de limpiar (`C`) y retroceso (`←`).
- Soporte de teclado (números, operadores, `Enter`, `Backspace`, `Escape`).
- Evaluación de expresiones propia (sin `eval`/`Function`), validando la entrada para evitar inyección de código.

## Estructura del proyecto

```
├── index.html        # Punto de entrada de Vite
├── vite.config.js     # Configuración de Vite + plugin de Vue
├── package.json
└── src/
    ├── main.js        # Monta la app de Vue
    ├── style.css      # Estilos globales (fondo, layout de la página)
    └── App.vue        # Componente de la calculadora (lógica + plantilla + estilos)
```

## Uso

Instala las dependencias y arranca el servidor de desarrollo:

```bash
npm install
npm run dev
```

Para generar la versión de producción:

```bash
npm run build
npm run preview
```

## Controles de teclado

| Tecla               | Acción          |
| ------------------- | --------------- |
| `0-9`, `.`, `+ - * / %` | Insertar valor/operador |
| `Enter`              | Calcular (`=`)  |
| `Backspace`          | Borrar último carácter |
| `Escape`             | Limpiar (`C`)   |
