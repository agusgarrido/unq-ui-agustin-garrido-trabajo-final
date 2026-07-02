# Palabras Encadenadas

Juego de palabras desarrollado con React + TypeScript para la materia Construcción de Interfaces de Usuario.

## Objetivo del juego

Formá la cadena más larga posible de palabras válidas antes de que se acabe el tiempo. Cada nueva palabra debe empezar con la última letra de la anterior.

## Mecánicas

- Cada palabra válida reinicia el contador de 15 segundos.
- El timer **arranca con la primera palabra** — tomate tu tiempo para pensar antes de empezar.
- Cada 10 palabras encadenadas, el tiempo disponible por turno **se acelera** — cuanto más larga la cadena, más difícil.
- Cada letra de una palabra válida vale 1 punto. Las palabras más largas suman más.

## Características adicionales

- Interfaz responsive.
- Leaderboard local con las mejores 10 partidas guardadas en el navegador.
- Posibilidad de jugar múltiples partidas consecutivas.

## Requisitos previos

El proyecto fue desarrollado y testeado utilizando:
- **Node.js:** v20.19.0 o superior (recomendado: v22)
- **Gestor de paquetes:** npm

## Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/agusgarrido/unq-ui-agustin-garrido-trabajo-final.git

# 2. Entrar a la carpeta
cd unq-ui-agustin-garrido-trabajo-final

# 3. Instalar dependencias
npm install
```

## Cómo ejecutarlo localmente

```bash
npm run dev
```

Abrí el navegador en [http://localhost:5173](http://localhost:5173).