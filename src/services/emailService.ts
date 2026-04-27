// src/services/emailService.ts

interface SendEmailParams {
  to: string;
  firstName: string;
  email: string;
  password?: string;
  role: string;
  clinicName?: string;
  loginUrl?: string;
}

export async function sendWelcomeEmail(params: SendEmailParams): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: params.to,
        firstName: params.firstName,
        email: params.email,
        password: params.password,
        role: params.role,
        clinicName: params.clinicName || 'Centro Médico Mwanganza',
        loginUrl: params.loginUrl || `${window.location.origin}/login`,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erro ao enviar email');
    }

    return { success: true };
  } catch (error) {
    console.error('Erro no serviço de email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' };
  }
}