from PIL import Image

img_path = 'C:/Users/selnl/.gemini/antigravity/brain/tempmediaStorage/media_1786795536935.jpg'
img = Image.open(img_path)
width, height = img.size
print(f"Original size: {width}x{height}")

# If the image has 3 logos arranged horizontally or in a grid, let's split or save
# Let's save the full image as well
img.save('C:/Users/selnl/.gemini/antigravity/scratch/digital_card/assets/rcql-official-full.jpg')

# If it's a grid/horizontal composite:
if width > height:
    # 3 square logos side by side
    w3 = width // 3
    logo_dark = img.crop((0, 0, w3, height))
    logo_light1 = img.crop((w3, 0, w3 * 2, height))
    logo_light2 = img.crop((w3 * 2, 0, width, height))

    logo_dark.save('C:/Users/selnl/.gemini/antigravity/scratch/digital_card/assets/rcql-logo-dark.png')
    logo_light1.save('C:/Users/selnl/.gemini/antigravity/scratch/digital_card/assets/rcql-logo-light.png')
    logo_light2.save('C:/Users/selnl/.gemini/antigravity/scratch/digital_card/assets/rcql-logo-light-v2.png')
    print("Successfully cropped into 3 logo variants!")
else:
    # Single logo or vertical
    img.save('C:/Users/selnl/.gemini/antigravity/scratch/digital_card/assets/rcql-logo-light.png')
    print("Saved logo image!")
