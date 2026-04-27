// src/app/api/send/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { EmailTemplate } from '@/components/email-template';

// Inicializar Resend com a API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, firstName, email, password, role, clinicName, loginUrl } = body;

    // Validar dados necessários
    if (!to || !firstName || !email || !role) {
      return NextResponse.json(
        { error: 'Dados incompletos para envio do email' },
        { status: 400 }
      );
    }

    // Validar API Key
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY não configurada');
      return NextResponse.json(
        { error: 'Serviço de email não configurado' },
        { status: 500 }
      );
    }

    console.log('Enviando email para:', to);
    console.log('Template recebido:', { firstName, email, role });

    // Enviar email
    const { data, error } = await resend.emails.send({
      from: `${clinicName || 'Centro Médico'} <edupath@edupath.ao>`,
      to: [to],
      subject: `Bem-vindo(a) ao ${clinicName || 'Sistema de Saúde'} - Sua conta foi criada`,
      react: EmailTemplate({
        firstName,
        email,
        password,
        role,
        clinicName: clinicName || 'Centro Médico Mwanganza',
        loginUrl: loginUrl || `${process.env.NEXT_PUBLIC_APP || 'https://mwanganza.vercel.app'}/login`,
      }),
    });

    if (error) {
      console.error('Erro detalhado do Resend:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('Email enviado com sucesso:', data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Erro na requisição:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro interno ao processar requisição' },
      { status: 500 }
    );
  }
}