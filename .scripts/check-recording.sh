#!/usr/bin/env bash
# Проверяет, что запись демо пригодна: есть видео, есть аудиодорожка и она не тишина.
# Запускать сразу после десятисекундного пробного дубля, до основного прогона.
#
#   .scripts/check-recording.sh запись.mp4
set -euo pipefail
f="${1:?укажите файл записи}"

v=$(ffprobe -v error -select_streams v:0 -show_entries stream=codec_name,width,height -of csv=p=0 "$f" || true)
a=$(ffprobe -v error -select_streams a:0 -show_entries stream=codec_name,channels,sample_rate -of csv=p=0 "$f" || true)

[ -n "$v" ] && echo "видео : $v" || { echo "видео : НЕТ"; exit 1; }

if [ -z "$a" ]; then
  echo "аудио : НЕТ ДОРОЖКИ — запись бесполезна, звук не восстановить"
  echo
  echo "На macOS звук в экранную запись не попадает сам:"
  echo "  · QuickTime / Cmd+Shift+5 — выбрать микрофон в «Параметры», по умолчанию «Нет»"
  echo "  · системный звук нужен отдельный маршрутизатор (BlackHole, Loopback)"
  exit 1
fi
echo "аудио : $a"

# средний уровень: тишина выдаст -91 dB
lvl=$(ffmpeg -v error -i "$f" -t 30 -af volumedetect -f null - 2>&1 | grep mean_volume | sed 's/.*mean_volume: //')
echo "уровень: ${lvl:-не измерен} (тишина ≈ -91 dB)"
case "$lvl" in
  -9[0-9]*|-inf*) echo "ДОРОЖКА ЕСТЬ, НО В НЕЙ ТИШИНА — проверьте выбранный вход"; exit 1;;
esac
echo "OK — можно писать основной дубль"
