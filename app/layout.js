import './globals.css';

export const metadata = {
  title: 'Pawbnb — Alojamiento y cuidado inteligente para perros y gatos',
  description:
    'Reserva estancias con cuidadores certificados y sigue el bienestar de tu mascota en tiempo real, con IA.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="font-body">{children}</body>
    </html>
  );
}
