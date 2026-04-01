const fs = require('fs');
const path = require('path');

function copyFolderSync(src, dest) {
    // 检查源文件夹是否存在
    if (!fs.existsSync(src)) {
        console.error('源文件夹不存在:', src);
        return;
    }

    // 创建目标文件夹
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
    }

    // 读取源文件夹的内容
    const items = fs.readdirSync(src);

    items.forEach(item => {
        const srcItem = path.join(src, item);
        const destItem = path.join(dest, item);

        // 检查当前项是否是文件夹
        if (fs.statSync(srcItem).isDirectory()) {
            // 递归复制子文件夹
            copyFolderSync(srcItem, destItem);
        } else {
            // 复制文件
            fs.copyFileSync(srcItem, destItem);
        }
    });
}

// 示例使用
const sourceFolder = path.join(__dirname, '../src/packages'); // 替换为你的源文件夹路径
const destinationFolder = path.join(__dirname, '../libs/packages'); // 替换为你的目标文件夹路径

copyFolderSync(sourceFolder, destinationFolder);