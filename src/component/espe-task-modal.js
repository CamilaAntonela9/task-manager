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

