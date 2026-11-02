const allowedPrograms = new Set([
  "Computer Science",
  "Business Administration",
  "Engineering",
  "Information Technology",
  "Accounting & Finance",
  "English & Humanities",
]);

function isText(value: unknown, maxLength: number): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.length <= maxLength;
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).origin !== new URL(request.url).origin) {
        return Response.json({ error: "Invalid request origin." }, { status: 403 });
      }
    } catch {
      return Response.json({ error: "Invalid request origin." }, { status: 403 });
    }
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid application details." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ error: "Invalid application details." }, { status: 400 });
  }

  const { firstName, lastName, email, phone, program, previousEducation } = body as Record<string, unknown>;
  if (
    !isText(firstName, 80) ||
    !isText(lastName, 80) ||
    !isText(email, 254) ||
    !/^\S+@\S+\.\S+$/.test(email) ||
    !isText(program, 80) ||
    !allowedPrograms.has(program) ||
    (phone !== undefined && (typeof phone !== "string" || phone.length > 30)) ||
    (previousEducation !== undefined && (typeof previousEducation !== "string" || previousEducation.length > 1000))
  ) {
    return Response.json({ error: "Please check the application details and try again." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const testMode = process.env.RESEND_TEST_MODE === "true" && process.env.NODE_ENV !== "production";
  const from = testMode ? "EduPortal <onboarding@resend.dev>" : process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) {
    return Response.json({ error: "Email is not configured yet. Please contact the site administrator." }, { status: 503 });
  }

  const fullName = `${firstName.trim()} ${lastName.trim()}`;
  const emailText = testMode
    ? "This is a Resend test-mode message. No applicant details were included."
    : [
        `Hello ${firstName.trim()},`,
        "",
        "Thank you for applying to EduPortal. We have received your application details:",
        `Name: ${fullName}`,
        `Program: ${program}`,
        `Email: ${email.trim()}`,
        ...(typeof phone === "string" && phone.trim() ? [`Phone: ${phone.trim()}`] : []),
        ...(typeof previousEducation === "string" && previousEducation.trim() ? ["", "Previous education:", previousEducation.trim()] : []),
        "",
        "The admissions team will follow up with information about next steps.",
      ].join("\n");

  try {
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [testMode ? "delivered@resend.dev" : email.trim()],
        subject: "We received your EduPortal application",
        text: emailText,
      }),
    });

    if (!emailResponse.ok) {
      console.error("Application confirmation email failed", emailResponse.status);
      return Response.json({ error: "We could not send the confirmation email. Please try again later." }, { status: 502 });
    }

    return Response.json({ sent: true, testMode }, { status: 200 });
  } catch {
    return Response.json({ error: "Email service is temporarily unavailable. Please try again later." }, { status: 502 });
  }
}
