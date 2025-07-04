#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
from PIL import Image

def resize_photo(input_path, output_path, size=(120, 160)):
    """调整图片尺寸"""
    try:
        with Image.open(input_path) as img:
            # 保持宽高比进行缩放
            img.thumbnail(size, Image.Resampling.LANCZOS)
            
            # 创建白色背景
            background = Image.new('RGB', size, (255, 255, 255))
            
            # 计算居中位置
            x = (size[0] - img.size[0]) // 2
            y = (size[1] - img.size[1]) // 2
            
            # 将图片粘贴到背景上
            background.paste(img, (x, y))
            
            # 保存图片
            background.save(output_path, 'JPEG', quality=85)
            print(f"✅ {input_path} -> {output_path} (尺寸: {size})")
            
    except Exception as e:
        print(f"❌ 处理 {input_path} 时出错: {e}")

def main():
    """主函数"""
    # 检查是否有原始图片文件
    original_files = []
    for ext in ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG']:
        for file in os.listdir('.'):
            if file.endswith(ext) and not file.startswith('photo'):
                original_files.append(file)
    
    if not original_files:
        print("📁 请将您的图片文件放到当前目录中")
        print("💡 支持的格式：jpg, jpeg, png")
        print("📝 如果您已经放入图片，请重新运行此脚本")
        return
    
    print("📸 找到以下图片文件：")
    for i, file in enumerate(original_files, 1):
        print(f"   {i}. {file}")
    
    # 自动处理前两张图片
    if len(original_files) >= 2:
        resize_photo(original_files[0], 'photo1.jpg', (120, 160))
        resize_photo(original_files[1], 'photo2.jpg', (120, 160))
        print("\n🎉 图片处理完成！现在您可以刷新网页查看效果。")
    elif len(original_files) == 1:
        # 如果只有一张图片，复制为两张
        resize_photo(original_files[0], 'photo1.jpg', (120, 160))
        resize_photo(original_files[0], 'photo2.jpg', (120, 160))
        print("\n📝 只找到一张图片，已同时用作录取照片和学历照片")
        print("🎉 图片处理完成！现在您可以刷新网页查看效果。")

if __name__ == "__main__":
    main() 