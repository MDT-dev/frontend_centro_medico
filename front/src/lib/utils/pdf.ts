import { jsPDF } from "jspdf";
import { User, UserRole } from "@/lib/schemas/user";

const roleLabels: Record<UserRole, string> = {
  [UserRole.ADMIN]: "Administrador",
  [UserRole.GERENTE]: "Gerente",
  [UserRole.MEDICO]: "Médico",
  [UserRole.RECEPCIONISTA]: "Recepcionista",
  [UserRole.PACIENTE]: "Paciente",
};

export function generateUserPDF(user: User) {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;

  // Header
  pdf.setFontSize(18);
  pdf.setTextColor(33, 33, 33);
  pdf.text("Centro Médico", margin, margin + 10);

  pdf.setFontSize(14);
  pdf.setTextColor(100, 100, 100);
  pdf.text("Informações do Usuário", margin, margin + 20);

  // Divider line
  pdf.setDrawColor(200, 200, 200);
  pdf.line(margin, margin + 25, pageWidth - margin, margin + 25);

  let yPosition = margin + 35;
  const lineHeight = 8;

  // User data
  pdf.setFontSize(11);
  pdf.setTextColor(33, 33, 33);

  const userData = [
    { label: "Primeiro Nome:", value: user.firstName },
    { label: "Último Nome:", value: user.lastName },
    { label: "Email:", value: user.email },
    { label: "Telefone:", value: user.phone || "Não informado" },
    { label: "Função:", value: roleLabels[user.role] },
    {
      label: "Data de Criação:",
      value: new Date(user.createdAt).toLocaleDateString("pt-BR"),
    },
    {
      label: "Data de Atualização:",
      value: new Date(user.updatedAt).toLocaleDateString("pt-BR"),
    },
  ];

  userData.forEach(({ label, value }) => {
    pdf.setFont(undefined, "bold");
    pdf.text(label, margin, yPosition);
    pdf.setFont(undefined, "normal");
    const maxWidth = pageWidth - margin - 65;
    const lines = pdf.splitTextToSize(value, maxWidth);
    pdf.text(lines, margin + 55, yPosition);
    yPosition += lineHeight * (lines.length || 1);
  });

  // Footer
  pdf.setFontSize(9);
  pdf.setTextColor(150, 150, 150);
  const footerText = `Documento gerado em ${new Date().toLocaleDateString("pt-BR")} às ${new Date().toLocaleTimeString("pt-BR")}`;
  pdf.text(footerText, margin, pageHeight - 10);

  // Document info
  pdf.setProperties({
    title: `Usuario_${user.firstName}_${user.lastName}`,
    subject: "Informações do Usuário",
    author: "Centro Médico",
  });

  return pdf;
}

export function downloadUserPDF(user: User) {
  const pdf = generateUserPDF(user);
  pdf.save(`usuario_${user.firstName}_${user.lastName}.pdf`);
}

export function generateUserListPDF(users: User[]) {
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 10;

  // Header
  pdf.setFontSize(16);
  pdf.setTextColor(33, 33, 33);
  pdf.text("Centro Médico - Listagem de Usuários", margin, margin + 8);

  // Divider line
  pdf.setDrawColor(200, 200, 200);
  pdf.line(margin, margin + 12, pageWidth - margin, margin + 12);

  // Table headers
  let yPosition = margin + 20;
  const columnWidth = (pageWidth - margin * 2) / 4;

  pdf.setFontSize(10);
  pdf.setFont(undefined, "bold");
  pdf.setFillColor(240, 240, 240);

  const headers = ["Nome", "Email", "Função", "Telefone"];
  headers.forEach((header, i) => {
    pdf.text(header, margin + i * columnWidth, yPosition);
  });

  // Table data
  yPosition += 8;
  pdf.setFont(undefined, "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(50, 50, 50);

  users.forEach((user) => {
    const data = [
      user.firstName + " " + user.lastName,
      user.email,
      roleLabels[user.role],
      user.phone || "—",
    ];

    data.forEach((value, i) => {
      const x = margin + i * columnWidth;
      const maxWidth = columnWidth - 2;
      const lines = pdf.splitTextToSize(value, maxWidth);
      pdf.text(lines, x, yPosition);
    });

    yPosition += 7;

    // Check if we need a new page
    if (yPosition > pageHeight - 15) {
      pdf.addPage();
      yPosition = margin + 10;
    }
  });

  // Footer
  pdf.setFontSize(8);
  pdf.setTextColor(150, 150, 150);
  const footerText = `Total de usuários: ${users.length} | Gerado em ${new Date().toLocaleDateString("pt-BR")}`;
  pdf.text(footerText, margin, pageHeight - 5);

  return pdf;
}

export function downloadUserListPDF(users: User[]) {
  const pdf = generateUserListPDF(users);
  pdf.save(`usuarios_${new Date().toISOString().split("T")[0]}.pdf`);
}
