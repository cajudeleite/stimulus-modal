import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="modal"
export default class extends Controller {
  static targets = ["modal", "skeleton", "content"];

  async createDefaultModal(event) {
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
    const { modal } = data;

    this.renderModal(modal);
  }

  renderModal(content) {
    const skeleton = this.skeletonTarget.content.cloneNode(true);
    document.body.appendChild(skeleton);

    this.contentTarget.innerHTML = content;
  }

  closeModal() {
    const modal = this.modalTarget;

    document.body.removeChild(modal);
  }

  createCustomModal(event) {
    event.preventDefault();

    const { contentId } = event.target.dataset;
    const content = document.getElementById(contentId).content.cloneNode(true)
      .firstElementChild.outerHTML;

    this.renderModal(content);
  }
}
