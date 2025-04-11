import { createTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles'; // Renk tonlarını ayarlamak veya kontrast metin için yardımcı olabilir

// 1. Renklerinizi tanımlayın
const white = "#FFFFFF";
const lightGray = "#bfbfbf";
const mediumGray = "#313234"; // 'myGrey' yerine daha açıklayıcı bir isim
const black = "#18191b";      // 'myBlack' yerine daha açıklayıcı bir isim

// Temanızı oluşturun
const theme = createTheme({
  palette: {
    // 2. Standart palet rollerini bu renklerle doldurun
    primary: {
      main: black, // Ana eylemler için siyah renk
      contrastText: white, // Siyah arka plan üzerinde beyaz metin
    },
    secondary: {
      main: mediumGray, // İkincil eylemler için orta gri
      contrastText: black, // Orta gri arka plan üzerinde siyah metin (duruma göre beyaz da olabilir)
    },
    background: {
      default: white, // Varsayılan sayfa arka planı
      paper: black,   // Kart, Menü gibi bileşenlerin arka planı
    },
    text: {
      primary: white,      // Ana metin rengi
      secondary: lightGray, // İkincil, daha soluk metin rengi
      disabled: lightGray,  // Devre dışı bırakılmış metin rengi
    },
    divider: lightGray, // Ayırıcı çizgilerin rengi

    // 3. (İsteğe bağlı) Özel renklerinize doğrudan erişim için:
    custom: {
      white: white,
      lightGray: lightGray,
      mediumGray: mediumGray,
      black: black,
    },

    // MUI'nin varsayılan diğer renklerini (error, warning, info, success)
    // isterseniz bu 4 renkten biriyle veya grinin tonlarıyla ayarlayabilirsiniz.
    // Veya varsayılan MUI renklerinde bırakabilirsiniz.
    // error: { main: '#d32f2f' }, // Örnek: Kırmızı hata rengi (varsayılan)
  },
  typography: {
    // next/font'un CSS değişkenini veya doğrudan stilini kullanın
    fontFamily: 'var(--font-outfit), Roboto, "Helvetica Neue", Arial, sans-serif',
    // VEYA eğer değişken tanımlamadıysanız (inter.style.fontFamily dinamik olarak font adını içerir):
    // fontFamily: [inter.style.fontFamily, 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),

    // İsteğe bağlı: Başlıklar veya diğer elementler için farklı ayarlar
    // h1: { fontWeight: 700 },
    // button: { textTransform: 'none' } // Örnek: Butonlarda büyük harf dönüşümünü kapatma
  },
  components: {
    // Mevcut MuiOutlinedInput özelleştirmeniz
    MuiInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          '& .MuiOutlinedInput-notchedOutline': {
            border:"none",
            borderColor: theme.palette.lightGray,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.lightGray,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.lightGray,
          },
          '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.lightGray,
          },
        }),
      },
    },
  
    // Label rengini özelleştirmek için MuiInputLabel ekleyin
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          // Varsayılan label rengi (odak dışı durum)
          color: theme.palette.text.white, // İsteğe bağlı: Varsayılan rengi belirtebilirsiniz
          // Odaklanıldığında label rengi
          '&.Mui-focused': {
            color: "transparent", // Odaklandığında lightGray
          },
         
        }),
      },
    },
  
    // Mevcut MuiButton özelleştirmeniz
    MuiButton: {
      styleOverrides: {
        containedPrimary: ({ theme }) => ({
          color: theme.palette.primary.contrastText,
        }),
        containedSecondary: ({ theme }) => ({
          color: theme.palette.secondary.contrastText,
        }),
      },
    },
  },
});

export default theme;