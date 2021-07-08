const { app, Menu } = require("electron");

const template = [
  {
    label: "Edit",
    submenu: [
      {
        label: "Reload",
        accelerator: "Cmd+R",
        role: "reload"
      }
    ]
  },
  {
    role: "window",
    submenu: [{ role: "minimize" }, { role: "close" }]
  }
];

if (process.platform === "darwin") {
  template.unshift({
    label: app.getName(),
    submenu: [{ role: "about" }, { type: "separator" }, { role: "quit" }]
  });

  // Window menu
  template[2].submenu = [{ role: "minimize" }, { role: "zoom" }];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
