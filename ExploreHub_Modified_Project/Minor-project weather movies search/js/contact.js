const form = document.querySelector("#contact-form");
const status = document.querySelector("#contact-status");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const { name } = Object.fromEntries(formData.entries());
  status.textContent = `Thanks, ${name}! This is a demo form, so your message has not been sent to a server.`;
  status.classList.remove("error");
  form.reset();
});
