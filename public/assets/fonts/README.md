# Nohemi Font Installation

## Download Nohemi Font

1. **Option 1: Offizieller Download**
   - Besuche: https://www.fontshare.com/fonts/nohemi
   - Lade die Nohemi Font herunter (kostenlos)
   - Extrahiere die ZIP-Datei

2. **Option 2: Alternative Quellen**
   - Google nach "Nohemi font free download"
   - Stelle sicher, dass es die offizielle Version ist

## Installation

Kopiere die folgenden Font-Dateien in diesen Ordner (`public/assets/fonts/`):

### Benötigte Dateien:

**WOFF2 Format (empfohlen - kleinste Dateigröße):**
- `Nohemi-Light.woff2` (300)
- `Nohemi-Regular.woff2` (400)
- `Nohemi-Medium.woff2` (500)
- `Nohemi-SemiBold.woff2` (600)
- `Nohemi-Bold.woff2` (700)

**WOFF Format (Fallback):**
- `Nohemi-Light.woff` (300)
- `Nohemi-Regular.woff` (400)
- `Nohemi-Medium.woff` (500)
- `Nohemi-SemiBold.woff` (600)
- `Nohemi-Bold.woff` (700)

## Datei-Struktur

Nach der Installation sollte es so aussehen:

```
public/
  assets/
    fonts/
      Nohemi-Light.woff2
      Nohemi-Light.woff
      Nohemi-Regular.woff2
      Nohemi-Regular.woff
      Nohemi-Medium.woff2
      Nohemi-Medium.woff
      Nohemi-SemiBold.woff2
      Nohemi-SemiBold.woff
      Nohemi-Bold.woff2
      Nohemi-Bold.woff
      README.md
```

## Font Konvertierung (falls du TTF/OTF Dateien hast)

Wenn du nur TTF oder OTF Dateien hast, konvertiere sie zu WOFF2:

**Online Tools:**
- https://cloudconvert.com/ttf-to-woff2
- https://everythingfonts.com/ttf-to-woff2
- https://transfonter.org/

## Nach der Installation

1. Überprüfe, dass alle Dateien im `public/assets/fonts/` Ordner sind
2. Starte den Dev-Server neu: `npm run dev`
3. Die Fonts werden automatisch geladen
4. Überprüfe im Browser DevTools → Network → Fonts

## Lizenz

Nohemi ist eine kostenlose Font von Fontshare:
- ✅ Kostenlos für kommerzielle & persönliche Projekte
- ✅ Keine Attribution erforderlich
- ℹ️ Lies die Lizenz auf Fontshare für Details

## Troubleshooting

**Fonts laden nicht?**
- Überprüfe die Dateinamen (Groß-/Kleinschreibung!)
- Stelle sicher, die Dateien sind in `public/assets/fonts/`
- Browser Cache leeren (Strg + Shift + R)
- DevTools Network Tab checken

**Fonts sehen anders aus?**
- Stelle sicher, du hast die offizielle Nohemi Font
- Überprüfe die Font-Weight Werte in der CSS








