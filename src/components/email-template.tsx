// src/components/module/components/email-template.tsx
import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  email: string;
  password?: string;
  role: string;
  clinicName: string;
  loginUrl: string;
  year?: number;
}

export function EmailTemplate({
  firstName,
  email,
  password,
  role,
  clinicName,
  loginUrl,
  year = new Date().getFullYear(),
}: EmailTemplateProps) {
  const getRoleLabel = (role: string) => {
    const roles: Record<string, string> = {
      admin: 'Administrador do Sistema',
      doctor: 'Médico',
      nurse: 'Enfermeiro',
      pharmacist: 'Farmacêutico',
      receptionist: 'Recepcionista',
      patient: 'Paciente',
      laboratory: 'Técnico de Laboratório',
      finance: 'Financeiro',
    };
    return roles[role] || role;
  };

  // Versão simplificada sem JSX complexo
  return React.createElement(
    'div',
    {
      style: {
        fontFamily: 'Arial, sans-serif',
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#f4f7fb',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      },
    },
    // Header
    React.createElement(
      'div',
      {
        style: {
          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
          padding: '30px 20px',
          textAlign: 'center',
        },
      },
      React.createElement(
        'div',
        {
          style: {
            width: '60px',
            height: '60px',
            backgroundColor: 'white',
            borderRadius: '30px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '15px',
          },
        },
        React.createElement('span', { style: { fontSize: '32px' } }, '🏥')
      ),
      React.createElement(
        'h1',
        {
          style: {
            color: 'white',
            margin: '0',
            fontSize: '24px',
            fontWeight: 'bold',
          },
        },
        clinicName
      ),
      React.createElement(
        'p',
        {
          style: {
            color: 'rgba(255,255,255,0.9)',
            margin: '5px 0 0',
            fontSize: '14px',
          },
        },
        'Sistema de Gestão de Saúde Mwanganza'
      )
    ),
    // Conteúdo
    React.createElement(
      'div',
      { style: { padding: '30px', backgroundColor: 'white' } },
      React.createElement(
        'div',
        { style: { marginBottom: '25px' } },
        React.createElement(
          'h2',
          {
            style: {
              color: '#1e293b',
              fontSize: '22px',
              margin: '0 0 10px',
            },
          },
          `Olá, ${firstName}! 👋`
        ),
        React.createElement(
          'p',
          {
            style: {
              color: '#475569',
              lineHeight: '1.6',
              margin: '0',
            },
          },
          `Bem-vindo(a) ao `,
          React.createElement('strong', {}, clinicName),
          `! Sua conta foi criada com sucesso no nosso sistema de gestão de saúde.`
        )
      ),
      // Card de Informações
      React.createElement(
        'div',
        {
          style: {
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '25px',
            border: '1px solid #e2e8f0',
          },
        },
        React.createElement(
          'h3',
          {
            style: {
              color: '#1e293b',
              fontSize: '16px',
              margin: '0 0 15px',
              borderBottom: '2px solid #4f46e5',
              paddingBottom: '8px',
              display: 'inline-block',
            },
          },
          '📋 Dados da Conta'
        ),
        React.createElement(
          'div',
          { style: { marginTop: '15px' } },
          React.createElement(
            'div',
            { style: { marginBottom: '12px' } },
            React.createElement(
              'span',
              {
                style: {
                  display: 'inline-block',
                  width: '100px',
                  color: '#64748b',
                  fontSize: '14px',
                },
              },
              'Função:'
            ),
            React.createElement(
              'span',
              {
                style: {
                  display: 'inline-block',
                  backgroundColor: '#e0e7ff',
                  color: '#4f46e5',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: '500',
                },
              },
              getRoleLabel(role)
            )
          ),
          React.createElement(
            'div',
            { style: { marginBottom: '12px' } },
            React.createElement(
              'span',
              {
                style: {
                  display: 'inline-block',
                  width: '100px',
                  color: '#64748b',
                  fontSize: '14px',
                },
              },
              'Email:'
            ),
            React.createElement(
              'span',
              { style: { color: '#1e293b', fontSize: '14px' } },
              email
            )
          ),
          password &&
            React.createElement(
              'div',
              { style: { marginBottom: '12px' } },
              React.createElement(
                'span',
                {
                  style: {
                    display: 'inline-block',
                    width: '100px',
                    color: '#64748b',
                    fontSize: '14px',
                  },
                },
                'Password:'
              ),
              React.createElement(
                'code',
                {
                  style: {
                    backgroundColor: '#f1f5f9',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#4f46e5',
                    letterSpacing: '1px',
                  },
                },
                password
              )
            )
        )
      ),
      // Card de Acesso
      React.createElement(
        'div',
        {
          style: {
            backgroundColor: '#eff6ff',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '25px',
            textAlign: 'center',
            border: '1px solid #bfdbfe',
          },
        },
        React.createElement(
          'p',
          {
            style: {
              color: '#1e40af',
              margin: '0 0 15px',
              fontSize: '14px',
            },
          },
          '🔐 Acesse o sistema através do link abaixo:'
        ),
        React.createElement(
          'a',
          {
            href: loginUrl,
            style: {
              display: 'inline-block',
              backgroundColor: '#4f46e5',
              color: 'white',
              padding: '12px 30px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '14px',
            },
          },
          'Acessar o Sistema'
        ),
        React.createElement(
          'p',
          {
            style: {
              color: '#64748b',
              fontSize: '12px',
              marginTop: '15px',
            },
          },
          'Por razões de segurança, recomendamos alterar sua password após o primeiro acesso.'
        )
      ),
      // Dicas de Segurança
      React.createElement(
        'div',
        {
          style: {
            backgroundColor: '#fefce8',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '20px',
            border: '1px solid #fef08a',
          },
        },
        React.createElement(
          'p',
          {
            style: {
              color: '#854d0e',
              fontSize: '13px',
              margin: '0 0 8px',
              fontWeight: 'bold',
            },
          },
          '🔒 Dicas de Segurança:'
        ),
        React.createElement(
          'ul',
          {
            style: {
              color: '#854d0e',
              fontSize: '12px',
              margin: '0',
              paddingLeft: '20px',
            },
          },
          React.createElement('li', {}, 'Nunca compartilhe sua password com ninguém'),
          React.createElement('li', {}, 'Altere sua password regularmente'),
          React.createElement(
            'li',
            {},
            'Em caso de atividade suspeita, contacte o administrador'
          )
        )
      )
    ),
    // Footer
    React.createElement(
      'div',
      {
        style: {
          backgroundColor: '#1e293b',
          color: '#94a3b8',
          padding: '20px',
          textAlign: 'center',
          fontSize: '12px',
        },
      },
      React.createElement(
        'p',
        { style: { margin: '0 0 8px' } },
        `© ${year} ${clinicName}. Todos os direitos reservados.`
      ),
      React.createElement(
        'p',
        { style: { margin: '0' } },
        'Este é um email automático, por favor não responda.'
      )
    )
  );
}