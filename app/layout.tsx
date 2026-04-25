import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "eu+fitness | Moda Fitness & Academia",
  description:
    "Descubra a coleção eu+fitness: roupas fitness de alta performance para academia, yoga, corrida e muito mais. Estilo, conforto e qualidade para sua rotina fitness.",
  keywords: "roupas fitness, academia, yoga, moda esportiva, leggings, top fitness",
  openGraph: {
    title: "eu+fitness | Moda Fitness & Academia",
    description:
      "Roupas fitness de alta performance para você arrasar na academia e na vida.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
