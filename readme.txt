https://qiita.com/saki-engineering/items/203892838e15b3dbd300
electron-builderを使ってビルド・リリースするまで

node_modules/.bin/electron-builder --win --x64
electron-builder --win --x64
# Windows用のインストーラー(.exe)が作成される



6. Debugging
  npm run ins
  "ins": "electron --inspect=5858 .",
  electron --inspect=5858 .

chrome://inspect
  click [configure]
      localhost:5858
        C:_WINDOWS_system32_cmd.exe [17024] file:///
        [inspect] ボタン
                  ===> デバッグウィンドウ・黒のDevTools
                    [Source]タブ main.js -> close
                    file:///C:/Users/Owner/Desktop/Nodejs/electron/Ray_electron/1.Overview_Setup2/master-electron-master/lessons/8. Project/ProjectBulma/main.js
        main.js
          debugger
  npm run ins (restart)
        [inspect] ボタン: relaunch inspector

        main.js
          debugger
  npm run brk (restart)
  "brk": "electron --inspect-brk=5858 .",
        [inspect] ボタン: relaunch inspector


https://runebook.dev/ja/docs/electron/tutorial/debugging-main-process
--inspect=[port]
Electronは指定された port でV8インスペクタープロトコルメッセージをリッスンします。外部デバッガーがこのポートに接続する必要があります。デフォルトの port は 5858 です。

electron --inspect=5858 your/app
--inspect-brk=[port]
同様 --inspect しかし、JavaScriptの最初の行に実行を一時停止します。

外部デバッガ
V8 インスペクタプロトコルをサポートするデバッガを使用する必要があります。

chrome://inspect にアクセスし、そこにある起動されたElectronアプリを検査することを選択して、Chromeを接続します。
VSCodeでのデバッグ



npx electron --inspect=8585 .
chrome://inspect
    [DevTools]
    Devices
    Pages
    Extensions
    Apps
    Shared workers
    Service workers
    Other
    [Devices]
    Discover USB devices Port 
    Discover network targets 
    Open dedicated DevTools for Node
    ・Remote Target
    ・#LOCALHOST
  forwarding...
  Configure...  localhost:8585
    ・Target (v12.14.1)　trace
    ・C:_WINDOWS_system32_cmd.exe [48188]　file:///
    [inspect]ボタン

npx electron --inspect-brk=8585 .


colors

npm list -g electron-rebuild
npm list -g electron-rebuild --depth=0

* callback({ title, screenshot, url })
{
  title: "Electron | Build cross-platform desktop apps with JavaScript, HTML, and CSS.", 
  screenshot: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEA…E64srJ8s+jk51ALjV/D9WwbN1d2rydQAAAABJRU5ErkJggg==", 
  url: "https://electronjs.org"
}

// title: "Electron | Build cross-platform desktop apps with JavaScript, HTML, and CSS."
// screenshot: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEA"
// url: "https://electronjs.org"




* callback({ screenshot })

{screenshot: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEA…dGYhvLA2H3IWV6kREd5r/HyuvIpyOi09aAAAAAElFTkSuQmCC"}
screenshot: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAJxCAYAAAAtjeQ4AAAAAXNSR0IArs4c6QAAIABJREFUeJzs3VdwW1e6L/j/RgZBEJkEQYAAc5JIiqJytmxJtmy5o9VuB3X3OX3OnXDrVs3T1FTduud1al6mbs2te+bMqb7d7uR2J0vt7LaVAxVJScwRDCByIAAiY88DxC1BDCIlkiCk71elsom9sbGQ9v6w1re+xbS0HWJBCCGEEELWzIWzH6/6MXmrfkRCCCGEELLmKIgjhBBCCMlDFMQRQgghhOQhCuIIIYQQQvIQBXGEEEIIIXmIgjhCCCGEkDxEQRwhhBBCSB6iII4QQgghJA9REEcIIYQQskGcOXNm2ftSEEcIIYQQsgHMBXDLDeQoiCOEEEIIybHHA7flBHIUxBFCCCGE5NBiAduTAjkK4gghhBBCc
~~~~~~~~~~~~~~~~~~


https://qiita.com/pochman/items/64b34e9827866664d436
ElectronでcontextBridgeによる安全なIPC通信

contextIsolation: true
trueとすると、preload.jsから呼び出したwindowと、index.htmlで呼び出すwindowのインスタンスが別物になってしまいます。

contextBridgeを使えば、nodeIntegration: false,contextIsolation: trueでもIPC通信できる 
webPreferences: { ... contextIsolation: true, ...}

/* preload.js */
const { contextBridge, ipcRenderer} = require("electron");
contextBridge.exposeInMainWorld(
    "api", {
        send: (data) => {
            ipcRenderer.send("msg_render_to_main", data);
        }
    }
);

https://qiita.com/pochman/items/62de713a014dcacbad68
ElectronでcontextBridgeによる安全なIPC通信（受信編）

https://qiita.com/hibara/items/c59fb6924610fc22a9db
Electron（v.12.0.0 現在）の IPC 通信入門 - よりセキュアな方法への変遷


ipcMain から、ipcRendererへのIPC送信
当然ですが、ipcMain から、ipcRenderer へデータ送信することもできます。

webContents.send(channel, ...args)
https://www.electronjs.org/docs/api/web-contents#contentssendchannel-args

メインプロセス側のコード main.js
// メインプロセス
const { app, BrowserWindow } = require('electron')
let win = null

app.whenReady().then(() => {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.loadURL(`file://${__dirname}/index.html`)
  win.webContents.on('did-finish-load', () => {
    win.webContents.send('ping', 'whoooooooh!') // レンダラープロセスへsendしています
  })
})

受けるレンダラープロセス側
index.html
<html>
<body>
  <script>
    require('electron').ipcRenderer.on('ping', (event, message) => {
      console.log(message) // 'whoooooooh!' と出力される
    })
  </script>
</body>
</html>


ipcRenderer.invoke() メソッドを使った例です。

index.js
// レンダラープロセス
ipcRenderer.invoke('some-name', someArgument).then((result) => {
  // ...
})
main.js
// メインプロセス
ipcMain.handle('some-name', async (event, someArgument) => {
  const result = await doSomeWork(someArgument)
  return result
})
こうすることで、ipcRenderer.on() といった受け側を作る必要がなく、メインプロセスから Promise のデータで受け取れるようになるので便利です。受けるメインプロセスが、ipcMain.on() ではなく、ipcMain.handle() になっていることに注意してください。

なお、参考先の例にあるように、

index.js
// renderer から Main プロセスを呼び出す
const data = await ipcRenderer.invoke('invoke-test', 'ping')
console.log(data)
と、ワンライナーで書くこともできます。


最新の方法： セキュアなIPC通信 contextBridge を使う

、メインプロセスにある Electron API や、Node.js モジュールをレンダラープロセスで扱わせずに、メインプロセスの外部にAPIとして別途定義して、それを関数のように呼ぶという方法

さらにもう一歩！： contextBridge を使ったからといって必ずしも安全は担保できない
  汎用的な書き方をするとダメ
  １つの IPC 通信につき、１処理とした方が良い

レンダラープロセスからは preload.js に登録されている関数を呼び、preload.js の中で、IPC 通信を行うというのが安全


v12から、worldSafeExecuteJavaScript: ture になった
ちなみに Electron の v12から、BrowserWindow の options にある、webPreferences: { worldSafeExecuteJavaScript: true } がデフォルト値に!

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Error occurred in handler for 'ELECTRON_GUEST_WINDOW_MANAGER_WINDOW_METHOD': Error invalid guestId:2

			nativeWindowOpen: true,

Uncaught EvalError: Refused to evaluate a string as JavaScript because 'unsafe-eval' is not an allowed source of script in the following Content Security Policy directive: "script-src 'self' 'unsafe-inline'"

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
>electron-builder -w zip
>npm run eb

Cannot compute electron version from installed node modules - none of the possible electron modules are installed and version ("^9.0.0") is not fixed in project.


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
>npm i -D electron-packager
>npm i electron-window-state
>npm run package-win
    "package-win": "electron-packager . --overwrite --asar=true --platform=win32 --arch=ia32 --icon=assets/icons/win/icon.ico --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName=\"Shopping List\"",

WARNING: --asar does not take any arguments, it only has sub-properties (see --help)
WARNING: Could not find icon "assets/icons/win/icon.ico", not updating app icon
Wrote new app to release-builds\master-electron-win32-ia32

===> ProjectBulma\release-builds\master-electron-win32-ia32


基本的なアプリケーションを作成

my-electron-app/
├── package.json
├── main.js
├── preload.js
└── index.html
