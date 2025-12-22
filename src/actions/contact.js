import { sendContactEmail } from "../lib/sendEmail.js";

export const submitContact = async (formData) => {

  console.log(submitContact)

  // Validar
  // Sanitizar
  // Honeypot
  // Cooldown

  await sendContactEmail(validatedData);

};

