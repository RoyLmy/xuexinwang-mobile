#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
学信网照片更新工具（标准版本）
用法：python3 update_photos.py
"""
import sys
import os

# 录取照片 - 简化版（戴眼镜、灰色背景）
ADMISSION_PHOTO_BASE64 = """data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCABQAEADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD6+ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//2Q=="""

# 学历照片 - 简化版（蓝色背景）
EDUCATION_PHOTO_BASE64 = """data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCABQAEADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD6+ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//2Q=="""

def update_photos_in_html():
    """更新HTML文件中的所有照片"""
    html_file = "index.html"
    
    # 读取当前HTML文件
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 需要替换的占位符（包括之前的jpeg版本）
    old_placeholders = [
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
        "data:image/jpeg;base64,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",
        "data:image/jpeg;base64,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"
    ]
    
    # 找到所有的照片位置并替换
    lines = content.split('\n')
    updated_lines = []
    admission_count = 0
    education_count = 0
    
    for line in lines:
        original_line = line
        
        # 检查是否包含录取照片
        if 'alt="录取照片"' in line:
            for old_placeholder in old_placeholders:
                if old_placeholder in line:
                    line = line.replace(old_placeholder, ADMISSION_PHOTO_BASE64)
                    admission_count += 1
                    print(f"✅ 已更新第{admission_count}个录取照片")
                    break
        
        # 检查是否包含学历照片
        elif 'alt="学历照片"' in line:
            for old_placeholder in old_placeholders:
                if old_placeholder in line:
                    line = line.replace(old_placeholder, EDUCATION_PHOTO_BASE64)
                    education_count += 1
                    print(f"✅ 已更新第{education_count}个学历照片")
                    break
        
        updated_lines.append(line)
    
    # 写回文件
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(updated_lines))
    
    print(f"\n🎉 照片更新完成！")
    print(f"共更新了 {admission_count} 个录取照片")
    print(f"共更新了 {education_count} 个学历照片")
    return admission_count + education_count

def main():
    print("🔄 学信网照片更新工具 - 标准版")
    print("=" * 40)
    
    try:
        total_updated = update_photos_in_html()
        print(f"\n✨ 共更新了 {total_updated} 张照片！")
        print("📱 照片已优化为适合移动端显示的标准尺寸")
        print("🚀 请刷新浏览器 (localhost:8000) 查看更新效果")
        print("💡 如照片显示异常，请强制刷新 (Ctrl+F5 或 Cmd+Shift+R)")
    except Exception as e:
        print(f"❌ 更新照片时出错：{e}")
        print("请检查文件权限和路径是否正确")

if __name__ == "__main__":
    main() 