import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    if (!data.name || !data.email || !data.phone || !data.message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log('Contact form submission:', {
      name: data.name,
      email: data.email,
      phone: data.phone,
      preferredLanguage: data.preferredLanguage,
      interestedProject: data.interestedProject,
      message: data.message,
      submittedAt: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({ success: true, message: 'Thank you for your enquiry. We will be in touch soon.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
