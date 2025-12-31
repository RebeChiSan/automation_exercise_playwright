# 🧪 Framework de Automatización con Playwright.

## 📖 Descripción.

Este proyecto implementa un framework de automatización de pruebas para la aplicación web de e-commerce [Automation Exercise](https://automationexercise.com/). El objetivo es validar funcionalidades, flujos de usuario y la experiencia general de la plataforma mediante pruebas automatizadas.

## 🚀 Alcance de la Automatización.

Se han automatizado 23 **casos de prueba** que validan flujos de trabajo críticos y funcionalidades clave. La cobertura incluye:

* **Validación de la interfaz de usuario (UI)**: Verificación de la presencia y el estado de elementos clave.
* **Validación de flujos de trabajo complejos**: Simulación de interacciones de usuario en escenarios como el inicio de sesión, el registro de usuarios y el llenado de formularios.
* **Cross-browser testing**: Las pruebas se diseñaron para verificar el funcionamientos en diferentes navegadores, en este proyecto se probo en Chrome y firefox.

## 🧠 Habilidades y Conocimientos Adquiridos.

La implementación de este proyecto me ha proporcionado una valiosa experiencia en las siguientes áreas:

* **Diseño de frameworks de automatización**: Comprensión de la arquitectura y del patron de diseño **Page Object Model (POM)**, para crear un código de prueba modular y reutilizable.
* **Estrategias de selección de selectores**: Dominio de la selección de elementos del DOM utilizando selectores CSS, XPath, en particular, los locators de Playwright.
* **Manejo de aserciones**: Verificación de los resultados esperados utilizando el API de aserciones de Playwright.
* **Depuración de pruebas E2E**: Habilidad para identificar y resolver fallos en las pruebas utilizando herramientas como el **Playwright Inspector** y los informes de ejecución.
* **Gestión de asincronía**: Comprensión de los principios de la programación asíncrona en JavaScript/TypeScript para manejar de manera efectiva las esperas y los tiempos de carga del DOM.
* **Integración y ejecución continua**: Preparación del framework para ser integrado en un pipeline de CI/CD, lo que permite la ejecución automática de pruebas en cada cambio de código.
* **Generación de reportes con Allure:** Integración de Allure Report para obtener reportes visuales y detallados de la ejecución de las pruebas, incluyendo estados de los tests, pasos, tiempos de ejecución y evidencias.
* **Integración continua con GitHub Actions**: Ejecución automática de la suite de pruebas mediante pipelines de CI en GitHub Actions, permitiendo validar la calidad del código manualmente desde Github, así como la generación y publicación de reportes de resultados.

## 🗂️Estructura del Proyecto.

```
automation_exercise/
│
├── .env                      # Variables de entorno
├── .github/workflows         # Workflows y documentación para CI/CD
├── allure-results/           # Resultados de pruebas para Allure
├── node_modules/             # Dependencias de Node.js
├── package.json              # Configuración y scripts de npm
├── pages/                    # Page Objects (POM)
│   ├── AccountCreatedPage.ts
│   ├── BasePage.ts
│   ├── CheckoutPage.ts
│   ...
├── playwright-report/        # Reportes HTML de Playwright
├── playwright.config.ts      # Configuración de Playwright
├── README.md                 # Documentación principal
├── test-results/             # Resultados de pruebas
├── tests/                    # Casos de prueba (specs)
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│   ...
├── utils/                    # Utilidades y datos de prueba
│   ├── constants.ts
│   └── test-data/
└── ...
```
## ⚙️Instalar el Proyecto.

1. **Clona el repositorio:**
    ```bash
    git clone https://github.com/RebeChiSan/restful_booker_API_tests.git
    ```
2. **Instala las dependencias:**
    ```bash
    npm install
    ```
3. **Instala los navegadores necesarios:**
    ```bash
    npx playwright install
    ```

## 🧠Ejecutar el proyecto. 
### 💻 Desde la terminal.
Antes de ejecutar las pruebas desde la terminal de tu preferencia, primero instala el proyecto, despues de la instalación ejecuta los siguientes comandos desde el directorio raíz del proyecto:

1. **Ejecutar todas las pruebas:**
   ```bash
   npm test
   ```

2. **Generar reporte de Playwright:**
   ```bash
   npm run report
   ```
3. **Generar y abrir reporte Allure:**
   ```bash
   npm run generate-allure
   npm run open-allure
   ```

   #### Nota: Si requieres ejecutar una prueba especifica usa el comando:
   ```bash
    npx playwright test tests/cart.spec.ts
   ```

### 🤖 Desde  GitHub Actions - CI/CD Pipeline
El proyecto incluye un workflow de GitHub Actions que permite ejecutar las pruebas de forma manual desde Github, no es necesario instalar el proyecto para ejecutar las pruebas si se elige esta opción. 

1. **Ir a GitHub Actions**: Abre la pestaña "Actions" en tu repositorio

2. **Selecciona "Playwright Tests"**

3. **Haz clic en "Run workflow"**

4. **Selecciona una opción**:
   - **Browser**: chromium, firefox, webkit, o all

5. **Haz clic en "Run workflow"**

6. **Descargar Reportes:**

   Una vez completada la ejecución, encontrarás en la sección "Artifacts" los reportes a descargar:
   - `playwright-report-[browser]`
   - `allure-report-[browser]`

## 🧰Tecnologías Utilizadas
* **Playwright**: Utilizado como framework de automatización para interactuar con el DOM, gestionar aserciones y simular el comportamiento del usuario. La capacidad de Playwright para ejecutar pruebas en paralelo y su compatibilidad con múltiples navegadores (Chromium, Firefox, WebKit) garantizan una cobertura de prueba amplia y eficiente.
* **TypeScript**: Adoptado para desarrollar los scripts de prueba, lo que permite aprovechar el tipado estático, la programación orientada a objetos (POO) y patrones de diseño como el **Page Object Model (POM)**. Esto mejora la legibilidad y el mantenimiento del código y también reduce la probabilidad de errores en tiempo de ejecución.
* **Allure**: Generación de reportes avanzados de pruebas.
* **GitHub Actions**: Integración y entrega continua (CI/CD).
* **Node.js**: Entorno de ejecución sobre el que se construyen y ejecutan las pruebas.
* **npm**: Utilizado como gestor de paquetes para gestionar las dependencias del proyecto.

---
📌 Autor: Rebeca C. Santiago

💬 Proyecto con fines de práctica en automatización de pruebas en aplicaciones web.