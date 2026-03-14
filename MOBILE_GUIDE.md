# Mobile App (Task 2) - Quick Guide

## Problem: Expo QR Code Not Working?

The mobile app works, but there are a few ways to run it. Here's the complete guide:

## ✅ Option 1: Run in Web Browser (Easiest)

```bash
cd mobile
npm start
```

**Then press:** `w` (for web)

This opens the app in your browser at http://localhost:8081

**No phone needed!** Perfect for demo.

## ✅ Option 2: Use Expo Go App (QR Code)

### Prerequisites:
1. Install **Expo Go** app on your phone:
   - iOS: https://apps.apple.com/app/expo-go/id982107779
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent

### Steps:
```bash
cd mobile
npm start
```

Wait for QR code to appear in terminal, then:
- **Android**: Open Expo Go app → Scan QR code
- **iOS**: Open Camera app → Scan QR code → Tap notification

### If QR code doesn't appear:
The terminal might not show it. Instead:
1. Look for the URL in terminal output (like `exp://192.168.x.x:8081`)
2. Open Expo Go app manually
3. Type the URL in "Enter URL manually"

## ✅ Option 3: Use Emulator

### Android Emulator:
```bash
cd mobile
npm start
# Then press: a
```

**Requirements**: Android Studio installed

### iOS Simulator (Mac only):
```bash
cd mobile
npm start
# Then press: i
```

**Requirements**: Xcode installed

## 🔧 Common Issues & Fixes

### Issue: "Waiting on http://localhost:8081" forever

**Fix 1**: Port 8081 might be in use
```bash
# Kill process on port 8081
npx kill-port 8081

# Then restart
npm start
```

**Fix 2**: Clear Metro cache
```bash
npm start -- --clear
```

### Issue: QR code not showing in terminal

**Solution**: Just press `w` to open in web browser instead

### Issue: Phone can't connect to dev server

**Fix**: Use tunnel mode
```bash
npx expo start --tunnel
```

This creates a public URL that works over any network.

### Issue: "Unable to resolve module"

**Fix**: Clear cache and reinstall
```bash
rm -rf node_modules
npm install
npm start -- --clear
```

## 📱 What the App Does (Task 2)

Once running (web/phone/emulator), you'll see:

1. **5 messages** with AI-generated summaries
2. **Approve button** → moves message to "Handled" section
3. **Reject button** → removes message completely
4. **Two sections**: "Pending Messages" and "Handled Messages"

## 🎬 For Your Demo Video

**Recommended**: Use web browser option (`w`)
- Fastest
- No dependencies
- Shows the same UI
- Perfect for screen recording

**Alternative**: If you want to show mobile, use Expo Go app with tunnel mode:
```bash
npx expo start --tunnel
```

Then scan QR and record your phone screen.

## Commands Reference

```bash
npm start           # Start Expo dev server
npm start -- --clear # Start with cache cleared
npx expo start --tunnel # Start with tunnel (public URL)
```

**Interactive menu** (after `npm start`):
- `w` - Open in web browser
- `a` - Open Android emulator
- `i` - Open iOS simulator
- `r` - Reload app
- `m` - Toggle menu
- `c` - Clear Metro cache

## Quick Test

```bash
cd mobile
npm start
# Press 'w' when prompted
# App opens in browser at http://localhost:8081
# Test approve/reject buttons
```

That's it! ✅
