export default class Alert {
  constructor(message, backgroundColor) {
    this.message = message;
    this.backgroundColor = backgroundColor;
  }

  render() {
    // Create a new div element for the alert
    const alertElement = document.createElement("div");
    alertElement.textContent = this.message;
    alertElement.style.backgroundColor = this.backgroundColor;
    alertElement.style.padding = "10px";
    alertElement.style.color = "#fff"; // Text color
    alertElement.style.marginBottom = "10px";
    alertElement.style.borderRadius = "5px";
    alertElement.style.fontFamily = "Arial, sans-serif";

    // Append the alert to the body or specific container
    document.body.appendChild(alertElement);
    // time to run out
    setTimeout(() => {
      alertElement.remove();
    }, 10000);
  }

  static createAlertsFromJson(jsonData) {
    jsonData.forEach((item) => {
      const alert = new Alert(item.message, item.backgroundColor);
      alert.render();
    });
  }
}
