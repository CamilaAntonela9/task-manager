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

