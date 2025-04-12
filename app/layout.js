import { ThemeProvider } from '@mui/material';
import './globals.css'
import theme from '../lib/theme';
import ThemeRegistry from '@/components/ThemeRegistry';
import { Outfit } from 'next/font/google';
const outfit = Outfit({
    subsets: ['latin'],
    display: 'swap', // Font yüklenirken fallback göster, sonra değiştir
    variable: '--font-outfit', // CSS değişkeni oluştur (opsiyonel ama kullanışlı)
  });
export const metadata = {
  title: 'Vasif Garayev AI',
  description: 'Next js ve MUI ile arayuz , Gemini Api ile de api isteklerini kariılayan bir chatbot',
}
export default function RootLayout({ children }) {
  return (
    <html lang="en" >

      <body>
        <ThemeRegistry>
        {children}
        </ThemeRegistry>
        </body>
    </html>
  )
}
