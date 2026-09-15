; Hush — Inno Setup Script
; Generates enterprise-ready Hush-InnoSetup-1.4.0.exe installer for Windows 10/11 x64

#define MyAppName "Hush"
#define MyAppVersion "1.4.0"
#define MyAppPublisher "Hush Community"
#define MyAppURL "https://github.com/yashavsarmal30/hush"
#define MyAppExeName "Hush.exe"

[Setup]
AppId={{D724D85C-1D8A-422E-8E09-881EFE3407B1}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}
AppUpdatesURL={#MyAppURL}
DefaultDirName={localappdata}\Programs\{#MyAppName}
DefaultGroupName={#MyAppName}
DisableProgramGroupPage=yes
PrivilegesRequired=lowest
OutputDir=..\..\dist-package
OutputBaseFilename=Hush-InnoSetup-{#MyAppVersion}
SetupIconFile=..\..\build_assets\hush.ico
Compression=lzma2/ultra64
SolidCompression=yes
WizardStyle=modern
ArchitecturesAllowed=x64compatible
ArchitecturesInstallIn64BitMode=x64compatible
CloseApplications=yes
RestartApplications=no

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"
Name: "autostart"; Description: "Start Hush automatically when signing in to Windows"; GroupDescription: "Startup:"

[Files]
Source: "..\..\dist-package\win-unpacked\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
Name: "{group}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; WorkingDir: "{app}"
Name: "{group}\{#MyAppName} (Administrator)"; Filename: "{app}\{#MyAppExeName}"; WorkingDir: "{app}"; Parameters: ""; Tasks: ; Flags: runascurrentuser
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; WorkingDir: "{app}"; Tasks: desktopicon

[Registry]
Root: HKCU; Subkey: "Software\Microsoft\Windows\CurrentVersion\Run"; ValueType: string; ValueName: "Hush"; ValueData: """{app}\{#MyAppExeName}"" --minimized"; Flags: uninsdeletevalue; Tasks: autostart

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(MyAppName, '&', '&&')}}"; Flags: nowait postinstall skipifsilent
