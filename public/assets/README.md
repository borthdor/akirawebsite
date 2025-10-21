# Assets Ordner

Hier werden alle statischen Assets der Website gespeichert.

## Ordnerstruktur

```
assets/
├── images/        # Bilder und Fotos
├── logos/         # Logos (SVG, PNG)
├── icons/         # Icons und UI-Grafiken
└── graphics/      # Illustrationen und Grafiken
```

## Verwendung in React

### Bilder importieren (empfohlen für optimierte Builds):

```jsx
import logo from '/assets/logos/logo.svg'

function Header() {
  return <img src={logo} alt="Logo" />
}
```

### Direkter Pfad (für public assets):

```jsx
function Header() {
  return <img src="/assets/logos/logo.svg" alt="Logo" />
}
```

## Tipps

- **SVG-Dateien**: Für Logos und Icons (skalierbar, klein)
- **PNG/WebP**: Für Fotos und komplexe Grafiken
- **Dateibenennung**: Verwende aussagekräftige Namen (z.B. `logo-white.svg`, `hero-image.jpg`)
- **Optimierung**: Komprimiere Bilder vor dem Upload (z.B. mit TinyPNG, ImageOptim)

## Empfohlene Auflösungen

- **Logos**: Mindestens 512x512px (SVG bevorzugt)
- **Hero Images**: 1920x1080px
- **Blog Images**: 1200x630px
- **Icons**: 64x64px oder 128x128px (SVG bevorzugt)













