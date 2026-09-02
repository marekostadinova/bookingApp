import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "Booking App",
  description: "Апликација за онлајн закажување термини",
};

export default function RootLayout({ children }) {
  return (
    <html lang="mk">
      <body>
        <Header />

        <main>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}