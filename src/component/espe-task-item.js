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
          <button @click=${() => this._emit('edit')}>✏️</button>
          <button @click=${() => this._emit('delete')}>🗑️</button>
        </div>
      </div>
    `;
  }
  _emit(type) { this.dispatchEvent(new CustomEvent(type, { detail: this.task, bubbles: true, composed: true })); }
  _select() { this._emit('select'); }
}
customElements.define('espe-task-item', EspeTaskItem);
