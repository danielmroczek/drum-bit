## Drum-Bit: 16-Bit Sequence Programming

A simple web-based drum machine for creating beat patterns with classic drum samples. Application allows you to create and share drum patterns using **16-bit numbers** (0-65535). Each drum track can be programmed by entering a number where each bit represents one of the 16 steps in the sequence. This makes it incredibly easy to:

- **Share patterns** - Just share a number like `52428` and others can recreate your exact beat
- **Generate random patterns** - Use any number to create interesting rhythmic variations
- **Understand binary rhythm** - Each bit position corresponds to a step in the 16-step sequence
- **Quick pattern entry** - Instead of clicking 16 steps, just type a number

Example: The number `4369` creates a classic four-on-the-floor kick pattern!

## Libraries Used

- **Alpine.js** - Lightweight reactive framework for UI interactions
- **Lucide** - Icon library for UI elements
- **Web Audio API** - Native browser API for audio playbook
- **Google Fonts (Space Grotesk)** - Typography
- **[gregharvey/drum-samples](https://github.com/gregharvey/drum-samples)** - drum samples