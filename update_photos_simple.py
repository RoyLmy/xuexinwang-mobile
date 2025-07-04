#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import re

def update_photos_in_html():
    """将HTML中的base64图片引用替换为图片文件引用"""
    
    # 读取HTML文件
    html_file = 'index.html'
    if not os.path.exists(html_file):
        print(f"错误：找不到 {html_file} 文件")
        return
    
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 定义图片替换映射
    # 假设用户会提供两张图片：photo1.jpg (录取照片) 和 photo2.jpg (学历照片)
    replacements = [
        # 本科学籍页面 - 录取照片
        {
            'pattern': r'<!-- 本科学籍详细信息页面 -->.*?<img src="data:image/jpeg;base64,[^"]*"',
            'replacement': '<!-- 本科学籍详细信息页面 -->\n        <div class="detail-header">\n            <h2>学籍信息</h2>\n            <button class="back-btn" onclick="showMainPage(\'education-page\')">返回</button>\n        </div>\n        <div class="detail-content">\n            <div class="photo-section">\n                <h3>录取照片</h3>\n                <img src="photo1.jpg"',
            'flags': re.DOTALL
        },
        # 研究生学籍页面 - 录取照片
        {
            'pattern': r'<!-- 研究生学籍详细信息页面 -->.*?<img src="data:image/jpeg;base64,[^"]*"',
            'replacement': '<!-- 研究生学籍详细信息页面 -->\n        <div class="detail-header">\n            <h2>学籍信息</h2>\n            <button class="back-btn" onclick="showMainPage(\'education-page\')">返回</button>\n        </div>\n        <div class="detail-content">\n            <div class="photo-section">\n                <h3>录取照片</h3>\n                <img src="photo1.jpg"',
            'flags': re.DOTALL
        },
        # 本科学历页面 - 学历照片
        {
            'pattern': r'<!-- 本科学历详细信息页面 -->.*?<img src="data:image/jpeg;base64,[^"]*"',
            'replacement': '<!-- 本科学历详细信息页面 -->\n        <div class="detail-header">\n            <h2>学历信息</h2>\n            <button class="back-btn" onclick="showMainPage(\'education-page\')">返回</button>\n        </div>\n        <div class="detail-content">\n            <div class="photo-section">\n                <h3>学历照片</h3>\n                <img src="photo2.jpg"',
            'flags': re.DOTALL
        },
        # 研究生学历页面 - 学历照片
        {
            'pattern': r'<!-- 研究生学历详细信息页面 -->.*?<img src="data:image/jpeg;base64,[^"]*"',
            'replacement': '<!-- 研究生学历详细信息页面 -->\n        <div class="detail-header">\n            <h2>学历信息</h2>\n            <button class="back-btn" onclick="showMainPage(\'education-page\')">返回</button>\n        </div>\n        <div class="detail-content">\n            <div class="photo-section">\n                <h3>学历照片</h3>\n                <img src="photo2.jpg"',
            'flags': re.DOTALL
        }
    ]
    
    # 更简单的方法：直接替换所有base64图片引用
    # 第一张照片 (录取照片)
    content = re.sub(
        r'<img src="data:image/jpeg;base64,[^"]*" alt="录取照片"',
        '<img src="photo1.jpg" alt="录取照片"',
        content
    )
    
    # 第二张照片 (学历照片)  
    content = re.sub(
        r'<img src="data:image/jpeg;base64,[^"]*" alt="学历照片"',
        '<img src="photo2.jpg" alt="学历照片"',
        content
    )
    
    # 如果没有alt属性，尝试通过位置判断
    # 在学籍页面中的图片 (录取照片)
    content = re.sub(
        r'(<h3>录取照片</h3>\s*<img src=")data:image/jpeg;base64,[^"]*(")',
        r'\1photo1.jpg\2',
        content
    )
    
    # 在学历页面中的图片 (学历照片)
    content = re.sub(
        r'(<h3>学历照片</h3>\s*<img src=")data:image/jpeg;base64,[^"]*(")',
        r'\1photo2.jpg\2',
        content
    )
    
    # 保存修改后的文件
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ HTML文件已更新，图片引用已改为文件路径")
    print("📝 请确保以下图片文件存在于项目目录中：")
    print("   - photo1.jpg (录取照片)")
    print("   - photo2.jpg (学历照片)")
    print("💡 建议图片尺寸：宽度120-150px，高度160-200px")

if __name__ == "__main__":
    update_photos_in_html() 