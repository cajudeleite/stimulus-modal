import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="modal"
export default class extends Controller {
  static targets = ["modal"];

  async createModal(event) {
    event.preventDefault();
    
    const { title, content, callbackText, callbackPath, color } =
      event.target.dataset;

    const response = await fetch("/modal", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        callbackText,
        callbackPath,
        color,
      }),
    });
    const data = await response.json();

    document.body.insertAdjacentHTML("afterbegin", data.modal);
  }

  removeModal() {
    document.body.removeChild(this.modalTarget);
  }
}
