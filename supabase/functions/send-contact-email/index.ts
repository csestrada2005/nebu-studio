import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/resend';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message } = await req.json();

    if (!name || typeof name !== "string" || name.trim().length === 0 || name.length > 100) {
      return new Response(JSON.stringify({ error: "Nombre inválido" }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) {
      return new Response(JSON.stringify({ error: "Email inválido" }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }
    if (!message || typeof message !== "string" || message.trim().length === 0 || message.length > 2000) {
      return new Response(JSON.stringify({ error: "Mensaje inválido" }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const contactEmail = Deno.env.get("CONTACT_EMAIL") || "j.cuatrecasas@nebustudio.com";

    if (!LOVABLE_API_KEY || !RESEND_API_KEY) {
      throw new Error("Missing API keys");
    }

    const safeName = name.trim().replace(/[<>&"']/g, "");
    const safeEmail = email.trim();
    const safeMessage = message.trim().replace(/[<>&"']/g, (c: string) => {
      const map: Record<string, string> = { "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&#39;" };
      return map[c] || c;
    });

    const response = await fetch(`${GATEWAY_URL}/emails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: "NEBU Studio <onboarding@resend.dev>",
        to: [contactEmail],
        reply_to: safeEmail,
        subject: `📬 Nuevo diagnóstico solicitado — ${safeName}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head><meta charset="utf-8"></head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: #333333; color: #E2E1DD; padding: 30px; border-radius: 12px 12px 0 0;">
              <h1 style="margin: 0; font-size: 22px;">📬 Nueva solicitud de diagnóstico</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.8; font-size: 14px;">Alguien quiere agendar una consulta</p>
            </div>
            <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px;">
              <div style="margin-bottom: 20px;">
                <div style="font-weight: 600; color: #666; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px;">Nombre</div>
                <div style="font-size: 16px; margin-top: 5px;">${safeName}</div>
              </div>
              <div style="margin-bottom: 20px;">
                <div style="font-weight: 600; color: #666; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px;">Email</div>
                <div style="font-size: 16px; margin-top: 5px;"><a href="mailto:${safeEmail}">${safeEmail}</a></div>
              </div>
              <div style="margin-bottom: 20px;">
                <div style="font-weight: 600; color: #666; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px;">Mensaje</div>
                <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #C22A29; margin-top: 8px; font-size: 14px; white-space: pre-wrap;">${safeMessage}</div>
              </div>
            </div>
            <p style="text-align: center; margin-top: 16px; color: #999; font-size: 11px;">Enviado desde nebustudio.com</p>
          </body>
          </html>
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Resend error:", data);
      throw new Error(data?.message || "Email send failed");
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
