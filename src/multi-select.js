import { LitElement, css, html } from 'lit'
import viteLogo from '/vite.svg'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class MultiSelect extends LitElement {
  static get properties() {
    return {
      inputValue: { type: String },
      selectValues: { type: Array },
      placeholderText: { type: String },
      helperText: { type: String },
      open: { type: Boolean },
      showPlaceholder: { type: Boolean },
      hasError: { type: Boolean }, // Just for the test
      hasSuccess: { type: Boolean },
      isLocked: { type: Boolean }
    }
  }

  constructor() {
    super()
    this.selectValues = ["Orange", "Green", "Red", "Yellow", "Blue", "Purple", "Pink"];
    this.selectedValues = ["Orange", "Green", "Red"];
    this.placeholderText = "Placeholder";
    this.placeholderLabel = "Select values"
    this.helperText = "Help or instruction text goes here";
    this.inputValue = "";
    this.showPlaceholder = false;
    this.open = false;
  }

  createInputAndPlaceholder() {
    if(this.inputValue.length >= 1) {
      return html `<p class="input--value">${this.inputValue}</p>`
    } else if(this.showPlaceholder) {
      return html `<span class="input--placeholder">${this.placeholderText}</span>`
    } else if(!this.open) {
      return html `<span class="select--placeholder">${this.selectedValues.length} values selected</span>`; // Return an empty template
    }
  }

  toggleSelectInput() {
    this.open = !this.open;
  }

  toggleSelectValueToSelectedValues(val) {
    // find the index for removing from array
    const index = this.selectedValues.indexOf(val);

    index == -1 ? this.selectedValues.push(val) : this.selectedValues.splice(index, 1);

    // error when no value is selected (just for demo purpose)
    this.selectedValues.length == 0 ? this.hasError = true : this.hasError = false;

    this.requestUpdate();
  }

  render() {
    return html`
      <div class="select select--wrapper">
        <label class="select select--label">
          ${this.placeholderLabel}
          <span class="select select--mandatory">*</span>
        </label>

        <div class="select select--input ${this.isLocked ? 'locked' : ''}">
          <div class="input ${this.inputValue.length >= 0 && !this.open ? 'text' : ''} ${this.hasError ? 'error' : ''} ${this.hasSuccess ? 'success' : ''}">

            <div class="">${this.createInputAndPlaceholder()}</div>

            <div class="select--values ${this.open ? 'show' : ''}">
                <ul class="select--values-list">${this.selectValues.map(i => html`
                  <li @click=${() => this.toggleSelectValueToSelectedValues(i)} class="select--values-item ${this.selectedValues.includes(i) ? 'selected' : 'not-selected' }">
                    ${i}

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="select--values-icon ${this.selectedValues.includes(i) ? 'delete' : 'add'}">
                      <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                    </svg>

                  </li>`)}
                </ul>
              </div>
          </div>
          
          <!-- Chevron Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="select--close">
            <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" clip-rule="evenodd" />
          </svg>


          <svg @click=${this.toggleSelectInput} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="select--chevron ${this.open ? 'open' : ''}">
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>

        </div>

        <p class="helper--text ${this.hasError ? 'error' : ''} ${this.hasSuccess ? 'success' : ''}">${this.helperText}</p>
      </div>
    `
  }

  static get styles() {
    return css`
      :host {
        width: 100%;
        display: flex;
        items-center: flex;
        justify-content: center;
      }

      .select--wrapper {
        display: flex;
        flex-direction: column;
      }

      .select--label {
        color: #1F2937;
        font-size: 12px;
        font-style: normal;
        font-weight: 600;
        line-height: 130%;
        letter-spacing: 0.12px;
        margin-bottom: 4px;

        .select--mandatory {
          color: #DC2626;
          margin-left: -2px;
        }
      }

      .select--input {
        position: relative;
        transition: 0.4s ease-in-out all;

        .input {
          border-radius: 5px;
          border: 1px solid #D1D5DB;
          display: flex;
          padding: 8px 10px;
          width: 200px;
          transition: 0.4s ease-in-out all;
          box-shadow: 0px 1px 3px 0px rgba(55, 65, 81, 0.16);
          height: 100px;

          .select--placeholder {
            background-color: rgb(229, 231, 235) !important;
            padding: 2px 4px;
            position: absolute; 
            top: 7px;
            border-radius: 3px;
            z-index: 5;
            left: 8px;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 140%;
            color: rgb(156, 163, 175);
          }

          &.error {
            border-color: #DC2626;
          }

          &.success {

          }
          
          &.text {
            height: 16px;
          }

          .input--value {
            position: absolute; 
            top: -6px;
            z-index: 5;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 140%;
          }

          &:hover {
            border: 1px solid #6B7280;
            cursor: pointer;
          }
        }

        &.locked {
          background-color: #F3F4F6;    
          
          .input {
            box-shadow: none;   
          }

          .select--values {
            background-color: #F3F4F6;

            .select--values-list {
              background-color: #F3F4F6;

              .select--values-item {
                background-color: #E5E7EB;
              }
            }
          }
        }

        .select--values {
          opacity: 0;
          transition: 0.4s ease-in-out all;
          overflow: hidden;
          transform: translateY(40px);

          &.show {
            transform: translateY(0px);
            opacity: 1;
          }
          
          .select--values-list {
            padding-right: 40px;
            list-style-type: none;
            padding-left: 0px;
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 0px;
            background-color: white;
            margin-bottom: 0px;
          }

          .select--values-item {
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            border-radius: 3px;
            padding: 2px 4px;
            line-height: 130%; /* 15.6px */
            letter-spacing: 0.12px;
            color: #374151;
            transition: 0.3s ease-in-out all;
            display: flex;
            justify-content: center;
            align-items: center;

            &.not-selected {
              background-color: #E5E7EB !important;
            }

            .select--values-icon {
              width: 16px;
              height: 16px;
              transition: 0.3s ease-in-out all;
              margin-left: 2px;

              &.add {
                width: 14px;
                height: 14px;
                transform: rotate(-45deg);
                color: rgb(55, 65, 81);
              }
            }

            &:hover {
              transform: translateY(-1px);
              box-shadow: 0px 1px 3px 0px rgba(55, 65, 81, 0.16);
            }

            &:nth-child(1) {
              background-color: #FFEDD5;
            }

            &:nth-child(2) {
              background-color: #DCFCE7;
            }

            &:nth-child(3) {
              background-color: #FEE2E2;
            }

            &:nth-child(4) {
              background-color: #FEF9C3;
            }

            &:nth-child(5) {
              background-color: #DBEAFE;
            }

            &:nth-child(6) {
              background-color: #F3E8FF;
            }

            &:nth-child(7) {
              background-color: #FCE7F3;
            }

            &:nth-child(8) {
              background-color: #E5E7EB;
            }
          }
        }

        .input--placeholder {
          position: absolute;
          left: 10px;
          top: 8px;
          font-size: 14px;
          font-weight: 400;
          line-height: 140%;
          color: #9CA3AF;
        }

        &:hover {
          .select--chevron {
            transform: translateY(2px);
            color: #6B7280;
            cursor: pointer;

            &.open {
              //transform: translateX(-10px);
            }
          }
        }

        .select--close {
          right: 30px !important;

          &:hover {
            color: #6B7280;
            cursor: pointer;
          }
        }

        .select--chevron, .select--close {
          transition: 0.3s ease-in-out all;
          width: 18px;
          height: 18px;
          position: absolute;
          right: 8px;
          top: 8px;
          color: #9CA3AF;

          &.open {
            transform: rotate(180deg);
          }
        }
      }

      .helper--text {
        margin-top: 4px;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 130%; /* 15.6px */
        letter-spacing: 0.12px;
        color: #6B7280;

        &.success {
          color: #16A34A;
        }

        &.error {
          color: #B91C1C;
        }
      }

      @media (prefers-color-scheme: light) {
        a:hover {
          color: #747bff;
        }
        button {
          background-color: #f9f9f9;
        }
      }
    `
  }
}

window.customElements.define('multi-select', MultiSelect)
