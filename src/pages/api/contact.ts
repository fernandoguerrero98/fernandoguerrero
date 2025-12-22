// src/pages/api/contact.ts
import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {

  console.log("Content-Type:", request.headers.get("content-type"));

  const data = await request.formData();


  // Evitar nulls
  const name = String(data.get("name") ?? "");
  const email = String(data.get("email") ?? "");
  const company = String(data.get("company") ?? "");
  const message = String(data.get("message") ?? "");


  // Honeypot básico
  if (company) {
    return new Response("error", { status: 400 })
  };
  

  // Sanitización y normalizacion de campos
  const cleanName = name.trim().replace(/\s+/g, " ").replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]/g, "");
  const cleanEmail = email.trim().toLowerCase();
  const cleanMessage = message.replace(/[\u0000-\u001F\u007F]/g, "").trim();


  // Envío con campos incompletos
  if (!cleanName || !cleanEmail || !cleanMessage) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      }),
      { status: 400 }
    );
  }


  // Evitar saltos de línea en el mail
  if (cleanEmail.includes("\n") || cleanEmail.includes("\r")) {
    return new Response("error", { status: 400 });
  }


  // Para hacer test al email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  
  // Test para ver si el email tiene cosas raras
  if (!emailRegex.test(cleanEmail)) {
    return new Response("error", { status: 400 })
  }


  // Test para evitar que se cuelen inputs muy largos
  if(cleanName.length > 100 || cleanMessage.length > 5000) {
    return new Response("error", { status: 400 });
  }

  console.log(cleanName, cleanEmail, cleanMessage);

  return new Response("ok", { status: 200 });

  // Cooldown
};
