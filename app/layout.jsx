import "../styles.css";

export const metadata = {
  title: "Centro Docente",
  description: "Copiloto docente para planificacion, recursos y reutilizacion pedagogica"
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
