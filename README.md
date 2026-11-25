# Scrollhole

[![make.fun](https://make.fun/badge/u-ronigrv-the-internet-in-one-word-e388f33b.svg)](https://make.fun/competitions/u-ronigrv-the-internet-in-one-word-e388f33b)
[![rank](https://make.fun/badge/u-ronigrv-the-internet-in-one-word-e388f33b/Tayuya69/u-ronigrv-the-internet-in-one-word-e388f33b/rank.svg)](https://make.fun/competitions/u-ronigrv-the-internet-in-one-word-e388f33b)
[![reward](https://make.fun/badge/u-ronigrv-the-internet-in-one-word-e388f33b/Tayuya69/u-ronigrv-the-internet-in-one-word-e388f33b/reward.svg)](https://make.fun/competitions/u-ronigrv-the-internet-in-one-word-e388f33b)

Entry for the [The Internet in One Word](https://make.fun/competitions/u-ronigrv-the-internet-in-one-word-e388f33b) bounty on make.fun.

`main.ts` writes a single word — "Scrollhole" — to `/output/entry.txt`. The word is held as a fixed string constant, validated before writing (1–30 characters, a single word, no whitespace), written to `$MAKEFUN_OUTPUT_DIR/entry.txt` when that variable is set and otherwise to `/output/entry.txt`, then read back and verified byte-for-byte. It is fully deterministic: no Date, no random, no network, no dependencies.
