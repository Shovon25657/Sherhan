import '../src/styles.css';

export const metadata = {
  title: {
    default: 'Sherhan Hossain — Architect & Designer',
    template: '%s | Sherhan Hossain',
  },
  description: 'Architecture and design portfolio of Sherhan Hossain.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
