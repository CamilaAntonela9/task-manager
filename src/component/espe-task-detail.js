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
