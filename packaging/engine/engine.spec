# PyInstaller spec for Hush headless engine service (windowed, no console).
import os
import sys
from PyInstaller.utils.hooks import collect_all

SPEC_DIR = os.path.dirname(os.path.abspath(SPEC))
REPO_ROOT = os.path.abspath(os.path.join(SPEC_DIR, "..", ".."))

datas, binaries, hiddenimports = [], [], []
for pkg in ("openvino", "openvino_genai", "openvino_tokenizers", "sounddevice", "_sounddevice_data", "websockets", "huggingface_hub"):
    try:
        d, b, h = collect_all(pkg)
        datas += d
        binaries += b
        hiddenimports += h
    except Exception as e:
        print(f"Warning collecting {pkg}: {e}")

a = Analysis(
    [os.path.join(SPEC_DIR, "engine_launcher.py")],
    pathex=[REPO_ROOT],
    binaries=binaries,
    datas=datas,
    hiddenimports=hiddenimports + ["huggingface_hub", "hf_xet", "websockets"],
    hookspath=[],
    runtime_hooks=[],
    excludes=[
        "evdev", "openvino_telemetry", "tkinter", "test", "unittest",
        "PySide6", "PySide6.QtCore", "PySide6.QtGui", "PySide6.QtWidgets",
        "PySide6.QtNetwork", "shiboken6",
    ],
    noarchive=False,
)
pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    [],
    exclude_binaries=True,
    name="hush-engine",
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=False,
    console=False,
    icon=os.path.join(REPO_ROOT, "build_assets", "hush.ico"),
)

coll = COLLECT(
    exe,
    a.binaries,
    a.datas,
    strip=False,
    upx=False,
    name="hush-engine",
)
