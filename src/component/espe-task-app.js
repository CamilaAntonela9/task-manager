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
