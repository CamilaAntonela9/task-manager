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
    header {
      border-bottom: 1px solid #214a3c;
      padding: 1rem 1rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 3rem;
    }
    .title {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .nav-links {
      display: flex;
      gap: 1rem;
      margin-left: auto;
    }
    .nav-links a {
      text-decoration: none;
      color: white;
      font-size: 0.875rem;
      font-weight: 500;
    }
    .add-btn {
      background-color: #019863;
      color: white;
      border-radius: 0.5rem;
      padding: 1rem 2rem;
      font-weight: bold;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      border: none;
      cursor: pointer;
    }
    .content {
      max-width: 960px;
      margin: auto;
      padding: 1rem;
    }
  `;
  render() {
    return html`
      <div>
        <header>
          <div class="title">
            <svg viewBox="6 2 40 40" fill="none" width="15">
              <circle cx="10" cy="20" r="20" fill="currentColor" />
            </svg>
            <h2>ESPE Tasks</h2>
          </div>

          <div class="nav-links">
            <a href="#">Inicio</a>
            <a href="#">Tareas</a>
            <a href="#">Calendario</a>
            <a href="#">Notas</a>
          </div>

          <button class="add-btn" @click="${this._addTask}">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 256 256">
              <path
                d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"
                fill="currentColor"
              />
            </svg>
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
