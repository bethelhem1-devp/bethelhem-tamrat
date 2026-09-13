//public key from emailjs dashboard
emailjs.init({
  publicKey: "GjZt_nLebn8oEpZnq"
});


//service and template id from emailjs dashboard
const form = document.getElementById("contact-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm(
    "service_c6vq7po",
    "template_54q1bd2",
    this
  )
  .then(() => {
    alert("Message sent!");
    form.reset();
  })
  .catch((error) => {
    alert("Failed to send.");
    console.log(error);
  });
});