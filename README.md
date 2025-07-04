DEPARTAMENTO:
CIENCIAS DE LA COMPUTACIÓN
CARRERA:
INGENIERÍA EN TECNOLOGÍAS DE LA INFORMACIÓN
ASIGNATURA:
Programación Integrativa
NIVEL:
6
FECHA:
03/07/25
DOCENTE:
Ing. Paulo Galarzar , Mgs.
PRÁCTICA N°:
1
CALIFICACIÓN:




TÍTULO

Obando Buitron Camila Antonela



RESUMEN

En el presente laboratorio se desarrolló una aplicación web de gestión de tareas utilizando LitElement, un estándar moderno para la creación de Web Components. El propósito fue migrar una aplicación previa escrita con JavaScript tradicional y TailwindCSS hacia una arquitectura basada en componentes reutilizables, encapsulados y mantenibles. Se implementaron componentes personalizados como <espe-layout>, <espe-task-app>, <espe-task-list>, <espe-task-item>, <espe-task-modal> y <espe-task-detail>, cada uno con una responsabilidad específica. Durante el proceso se utilizó un bundler (Webpack) para compilar los módulos y se configuró un entorno local con dependencias modernas. Como resultado, se obtuvo una interfaz modular, eficiente y visualmente atractiva, alineada a buenas prácticas de desarrollo web integrativo.

Palabras Claves: Web Components, LitElement, Aplicación de Tareas


INTRODUCCIÓN: 
El presente laboratorio corresponde a la práctica número uno del módulo de Programación Integrativa de Componentes, en el cual se abordó el desarrollo de una aplicación web basada en componentes. El objetivo principal fue migrar una implementación tradicional de una lista de tareas (To-Do List), que utilizaba HTML y JavaScript clásicos, hacia una estructura moderna compuesta por Web Components usando LitElement. Esta migración no solo implicó una reorganización del código, sino también la adopción de conceptos como encapsulamiento de estilos, propiedades reactivas y comunicación entre componentes mediante eventos personalizados. La práctica fomentó el manejo disciplinado de estructuras modulares y el uso de herramientas actuales como NPM, Webpack y TailwindCSS.

OBJETIVO(S):
OBJETIVO GENERAL 
Desarrollar una aplicación web modular de tareas utilizando LitElement y Web Components, integrando diseño, lógica y estructura en componentes reutilizables.
OBJETIVOS ESPECÍFICOS
Migrar la lógica de la aplicación previa de tareas hacia un enfoque modular basado en componentes.
Implementar componentes funcionales y estilizados que interactúen entre sí (layout, listas, items, modales).
Configurar un entorno de desarrollo con Webpack y NPM para compilar y servir la aplicación.



MARCO TEÓRICO:
Web Components
Es una tecnología que permite crear elementos personalizados reutilizables y encapsulados, utilizando estándares como Custom Elements, Shadow DOM y HTML Templates. Con ellos se puede construir interfaces complejas que mantengan un alto nivel de organización y cohesión.
El desarrollo web moderno ha evolucionado hacia arquitecturas basadas en componentes, permitiendo mayor reutilización, encapsulamiento y mantenibilidad del código. Este enfoque se fundamenta en la creación de interfaces modulares donde cada parte de la interfaz se construye como un bloque reutilizable. La especificación Web Components, respaldada por el W3C, proporciona tecnologías nativas como Custom Elements, Shadow DOM y HTML Templates para lograr este objetivo (W3C, 2021).

Lit Element
LitElement es una librería basada en Web Components que simplifica su implementación utilizando clases de JavaScript modernas y una sintaxis declarativa para manejar propiedades reactivas, eventos y estilos encapsulados. Esta herramienta permite crear componentes altamente eficientes y compatibles con todos los navegadores modernos sin necesidad de frameworks pesados (Google, 2023).

En el contexto del diseño visual y la experiencia de usuario, se utilizó TailwindCSS, una librería CSS utilitaria que permite componer estilos directamente en el HTML, eliminando la necesidad de escribir hojas de estilo personalizadas para cada componente. Esta metodología ayuda a mantener consistencia visual y acelera el desarrollo responsivo (Tailwind Labs, 2023).

WebPack
Webpack es un empaquetador de módulos que permite compilar los archivos ES Modules, gestionando sus dependencias para ser ejecutados correctamente en el navegador.
TailwindCSS facilita el desarrollo de interfaces mediante clases utilitarias, permitiendo estilos altamente personalizables sin necesidad de escribir CSS desde cero.

Estos conceptos se aplicaron para dividir una aplicación en componentes tales como <espe-layout>, encargado del encabezado y diseño; <espe-task-list> y <espe-task-item>, responsables de mostrar las tareas; <espe-task-modal> y <espe-task-detail> para gestionar interacciones. Se manejaron eventos personalizados para permitir comunicación entre ellos y mantener la lógica centralizada en <espe-task-app>.


DESCRIPCIÓN DEL PROCEDIMIENTO: 


Instalar Lit Element


2. Crear Archivo del Componente:  


3. Se han creado los diferentes componentes para cada parte de la página ESPE Task:

Componente espe-layout.js

Código
import { LitElement, html, css } from 'lit';


export class EspeLayout extends LitElement {
  static styles = css`
    :host {
      display: block;
      background-color: #10231c;
      color: white;
      font-family: 'Manrope', 'Noto Sans', sans-serif;
      min-height: 100vh;
    }
    header { border-bottom: 1px solid #214a3c; padding: 1rem 2.5rem; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; }
    .title { display: flex; align-items: center; gap: 1rem; }
    .content { max-width: 960px; margin: auto; padding: 1rem; }
    .add-btn { background-color: #019863; color: white; border-radius: 0.5rem; padding: 1rem 2rem; font-weight: bold; display: flex; align-items: center; gap: 0.5rem; border: none; cursor: pointer; }
  `;
  render() {
    return html`
      <div>
        <header>
          <div class="title">
            <svg viewBox="6 2 40 40" fill="none" width="15"><circle cx="10" cy="20" r="20" fill="currentColor" /></svg>
            <h2>ESPE Tasks</h2>
          </div>
          <button class="add-btn" @click="${this._addTask}">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" fill="currentColor"/></svg>
            Agregar tarea
          </button>
        </header>
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
  _addTask() {
    this.dispatchEvent(new CustomEvent('add-task', { bubbles: true, composed: true }));
  }
}
customElements.define('espe-layout', EspeLayout);


Componente espe-task-app.js

Código
import { LitElement, html } from 'lit';
import './espe-layout.js';
import './espe-task-list.js';
import './espe-task-modal.js';
import './espe-task-detail.js';


export class EspeTaskApp extends LitElement {
  static properties = {
    tasks: { type: Array },
    showModal: { type: Boolean },
    showDetail: { type: Boolean },
    editingTask: { type: Object },
    selectedTask: { type: Object }
  };
  constructor() {
    super();
    this.tasks = [];
    this.showModal = false;
    this.showDetail = false;
    this.editingTask = null;
    this.selectedTask = null;
  }
  render() {
    return html`
      <espe-layout @add-task="${() => this.showModal = true}">
        <espe-task-list
          .tasks=${this.tasks}
          @task-selected=${e => this._openDetail(e.detail)}
          @task-edit=${e => this._editTask(e.detail)}
          @task-delete=${e => this._deleteTask(e.detail)}>
        </espe-task-list>
      </espe-layout>
      ${this.showModal ? html`<espe-task-modal .task=${this.editingTask} @save-task=${this._saveTask} @close-modal=${this._closeModals}></espe-task-modal>` : ''}
      ${this.showDetail ? html`<espe-task-detail .task=${this.selectedTask} @complete-task=${this._completeTask} @close-modal=${this._closeModals}></espe-task-detail>` : ''}
    `;
  }
  _openDetail(task) { this.selectedTask = task; this.showDetail = true; }
  _editTask(task) { this.editingTask = task; this.showModal = true; }
  _saveTask(e) {
    const task = e.detail;
    if (task.id) {
      this.tasks = this.tasks.map(t => t.id === task.id ? task : t);
    } else {
      task.id = Date.now();
      task.date = 'hoy';
      this.tasks = [...this.tasks, task];
    }
    this._closeModals();
  }
  _deleteTask(task) { this.tasks = this.tasks.filter(t => t.id !== task.id); }
  _completeTask(e) { this.tasks = this.tasks.filter(t => t.id !== e.detail.id); this._closeModals(); }
  _closeModals() { this.showModal = false; this.showDetail = false; this.editingTask = null; this.selectedTask = null; }
}
customElements.define('espe-task-app', EspeTaskApp);


Componente espe-task-list.js

Código
import { LitElement, html, css } from 'lit';
import './espe-task-item.js';


export class EspeTaskList extends LitElement {
  static styles = css`:host { display: block; }`;
  static properties = { tasks: { type: Array } };


  render() {
    const grouped = this.tasks.reduce((acc, task) => {
      (acc[task.date] ||= []).push(task);
      return acc;
    }, {});
    return html`
      ${Object.entries(grouped).map(([date, tasks]) => html`
        <h3 class="text-xl font-bold mt-6 mb-2">${date.charAt(0).toUpperCase() + date.slice(1)}</h3>
        ${tasks.map(t => html`<espe-task-item .task=${t} @select=${this._onSelect} @edit=${this._onEdit} @delete=${this._onDelete}></espe-task-item>`)}
      `)}
    `;
  }
  _onSelect(e) { this.dispatchEvent(new CustomEvent('task-selected', { detail: e.detail, bubbles: true, composed: true })); }
  _onEdit(e) { this.dispatchEvent(new CustomEvent('task-edit', { detail: e.detail, bubbles: true, composed: true })); }
  _onDelete(e) { this.dispatchEvent(new CustomEvent('task-delete', { detail: e.detail, bubbles: true, composed: true })); }
}
customElements.define('espe-task-list', EspeTaskList);


Componente espe-task-item.js

Código
import { LitElement, html, css } from 'lit';


export class EspeTaskItem extends LitElement {
  static styles = css`
    .task-item { background-color: #17352b; padding: 1rem; margin-bottom: 0.5rem; border-radius: 0.5rem; display: flex; justify-content: space-between; align-items: center; cursor: pointer; }
    .actions { display: flex; gap: 0.5rem; }
    .actions button { background: none; border: none; color: #8ecdb7; cursor: pointer; font-size: 1rem; }
    .task-name { font-weight: bold; color: white; }
    .task-time { color: #8ecdb7; font-size: 0.875rem; }
  `;
  static properties = { task: { type: Object } };
  render() {
    return html`
      <div class="task-item" @click=${this._select}>
        <div>
          <p class="task-name">${this.task.name}</p>
          <p class="task-time">${this.task.time}</p>
        </div>
        <div class="actions" @click=${e => e.stopPropagation()}>
          <button @click=${() => this._emit('edit')}>Editar</button>
          <button @click=${() => this._emit('delete')}>Quitar</button>
        </div>
      </div>
    `;
  }
  _emit(type) { this.dispatchEvent(new CustomEvent(type, { detail: this.task, bubbles: true, composed: true })); }
  _select() { this._emit('select'); }
}
customElements.define('espe-task-item', EspeTaskItem);


Componente espe-task-modal.js

Código
import { LitElement, html, css } from 'lit';


export class EspeTaskModal extends LitElement {
  static styles = css`
    .modal { background: #214a3c; padding: 2rem; border-radius: 0.5rem; position: fixed; top: 20%; left: 50%; transform: translate(-50%, -20%); z-index: 1000; color: white; width: 90%; max-width: 500px; }
    .field { margin-bottom: 1rem; }
    input, textarea, select { width: 100%; padding: 0.5rem; border-radius: 0.25rem; border: none; }
  `;
  static properties = { task: { type: Object } };
  constructor() { super(); this.task = null; }
  render() {
    return html`
      <div class="modal">
        <h2>${this.task ? 'Editar tarea' : 'Nueva tarea'}</h2>
        <div class="field"><input id="name" .value=${this.task?.name || ''} placeholder="Nombre" /></div>
        <div class="field"><textarea id="notes">${this.task?.notes || ''}</textarea></div>
        <div class="field"><input type="time" id="time" .value=${this.task?.time || '10:00'} /></div>
        <div class="field">
          <select id="priority">
            <option value="alta" ?selected=${this.task?.priority === 'alta'}>Alta</option>
            <option value="media" ?selected=${this.task?.priority === 'media'}>Media</option>
            <option value="baja" ?selected=${this.task?.priority === 'baja'}>Baja</option>
          </select>
        </div>
        <button @click=${this._save}>Guardar</button>
        <button @click=${() => this.dispatchEvent(new CustomEvent('close-modal'))}>Cancelar</button>
      </div>
    `;
  }
  _save() {
    const tarea = {
      id: this.task?.id || null,
      name: this.renderRoot.getElementById('name').value,
      notes: this.renderRoot.getElementById('notes').value,
      time: this.renderRoot.getElementById('time').value,
      priority: this.renderRoot.getElementById('priority').value,
      date: this.task?.date || 'hoy'
    };
    this.dispatchEvent(new CustomEvent('save-task', { detail: tarea, bubbles: true, composed: true }));
  }
}
customElements.define('espe-task-modal', EspeTaskModal);


Componente espe-task-detail.js

Código
import { LitElement, html, css } from 'lit';


export class EspeTaskDetail extends LitElement {
  static styles = css`
    .modal { background: #17352b; color: white; padding: 2rem; border-radius: 0.5rem; position: fixed; top: 20%; left: 50%; transform: translate(-50%, -20%); z-index: 1000; width: 90%; max-width: 500px; }
  `;
  static properties = { task: { type: Object } };
  render() {
    if (!this.task) return '';
    return html`
      <div class="modal">
        <h2>${this.task.name}</h2>
        <p><strong>Notas:</strong> ${this.task.notes}</p>
        <p><strong>Hora:</strong> ${this.task.time}</p>
        <p><strong>Prioridad:</strong> ${this.task.priority}</p>
        <button @click=${() => this.dispatchEvent(new CustomEvent('complete-task', { detail: { id: this.task.id }, bubbles: true, composed: true }))}>Completar</button>
        <button @click=${() => this.dispatchEvent(new CustomEvent('close-modal'))}>Cerrar</button>
      </div>
    `;
  }
}
customElements.define('espe-task-detail', EspeTaskDetail);


Index Principal

En este index llamamos al componente principal o al contender de fondo de toda la página <espe-task-app></espe-task-app> 

Código
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>ESPE Tasks</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Tailwind CDN solo para desarrollo -->
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
  </head>
  <body class="bg-[#10231c] text-white">
    <espe-task-app></espe-task-app>
  </body>
</html>














Configuración del archivo Webpack.config.js

Código
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  devServer: {
    static: './dist',
    port: 8000,
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      }
    ]
  }
};







ANÁLISIS DE RESULTADOS: 
Durante el desarrollo de la práctica, se logró implementar exitosamente una aplicación web modular utilizando Web Components con LitElement. Se obtuvo una vista dinámica de tareas, permitiendo su creación, edición, visualización detallada y eliminación. Se emplearon propiedades reactivas para sincronizar el estado de la aplicación y eventos personalizados para comunicar componentes de forma encapsulada. La lógica separada en componentes facilitó el mantenimiento del código. Además, mediante Webpack se logró compilar los módulos y generar un bundle óptimo para navegador, lo que permitió que toda la aplicación funcione correctamente como una SPA (Single Page Application).

DISCUSIÓN: 
La implementación de LitElement para construir una aplicación basada en componentes permitió contrastar en la práctica las ventajas de la programación modular y la encapsulación de lógica. En comparación con la programación clásica basada en manipulación directa del DOM, el uso de propiedades reactivas, eventos personalizados y Shadow DOM permitió una mayor eficiencia y claridad en la estructura del código. Asimismo, el diseño visual apoyado en Tailwind CSS ayudó a mantener una interfaz moderna, responsiva y coherente con principios de diseño institucional. El uso de Webpack como empaquetador fue clave para resolver los errores de importación de módulos y permitir la ejecución correcta del proyecto.

CONCLUSIONES: 
1. La implementación de LitElement como base para construir la aplicación de tareas demostró la capacidad de los Web Components para estructurar interfaces complejas mediante componentes reutilizables, encapsulados y fácilmente mantenibles.

2. El uso de eventos personalizados y propiedades reactivas permitió una comunicación fluida entre componentes, evidenciando cómo el enfoque declarativo mejora la legibilidad y evita acoplamientos innecesarios en la lógica de la aplicación.

3. La integración con herramientas como Tailwind CSS para estilos y Webpack para el empaquetado del proyecto fue esencial para completar los objetivos técnicos planteados, permitiendo desplegar una aplicación moderna, funcional y adaptada al flujo de desarrollo actual.

BIBLIOGRAFÍA: 
Google. (2023). Lit documentation. Lit. https://lit.dev 
Mozilla Developer Network. (2023). Using custom elements. MDN Web Docs. https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements 
Tailwind Labs. (2023). Tailwind CSS documentation. Tailwind CSS. https://tailwindcss.com 
W3C. (2021). Web Components. World Wide Web Consortium (W3C). https://www.w3.org/wiki/WebComponents 

