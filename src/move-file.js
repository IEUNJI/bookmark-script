const { readdirSync, statSync, renameSync, rmdirSync } = require('fs');
const path = require('path');

function moveFile(dir) {
  const children =
    readdirSync(dir)
      .map(child => path.join(dir, child))
      .map(child => ({
        path: child,
        kind: statSync(child).isFile() ? 'file' : 'directory'
      }));

  if (children.length === 0) return;

  if (children.length === 1 && children[0].kind === 'file') {
    const child = children[0];
    const { path } = child;

    const ext = path.split('.')[1];

    const pathArr = path.split('/');
    const newDirPathArr = pathArr.slice();
    newDirPathArr.pop();
    const newDirPath = newDirPathArr.join('/');
    const newFilePath = `${newDirPath}.${ext}`;

    renameSync(path, newFilePath);
    rmdirSync(newDirPath);
    return;
  }

  if (children.length > 1 && children.every(child => child.kind === 'file')) {

  }

  children.forEach(child => {
    const { path, kind } = child;

    if (kind === 'directory') {
      moveFile(path);
    }
  });
}

moveFile(__dirname);
