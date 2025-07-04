#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re

def update_to_placeholder_images():
    """将HTML中的图片引用替换为在线占位图片"""
    
    # 读取HTML文件
    html_file = 'index.html'
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 替换录取照片
    content = re.sub(
        r'src="photo1\.jpg"',
        'src="https://via.placeholder.com/120x160/4a90e2/ffffff?text=录取照片"',
        content
    )
    
    # 替换学历照片
    content = re.sub(
        r'src="photo2\.jpg"',
        'src="https://via.placeholder.com/120x160/2196f3/ffffff?text=学历照片"',
        content
    )
    
    # 保存修改后的文件
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ 已更新为在线占位图片")
    print("🌐 现在可以刷新网页查看效果了")
    print("💡 如果要使用您自己的图片，请将图片文件重命名为:")
    print("   - photo1.jpg (录取照片)")
    print("   - photo2.jpg (学历照片)")
    print("   然后运行: python3 update_photos_simple.py")

if __name__ == "__main__":
    update_to_placeholder_images() 