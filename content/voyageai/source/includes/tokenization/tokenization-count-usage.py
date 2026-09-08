import voyageai
import PIL

# Initialize client (uses VOYAGE_API_KEY environment variable)
vo = voyageai.Client()

# Create input with text and image
inputs = [
    ["This is a banana.", PIL.Image.open('banana.jpg')]
]

# Count tokens and pixels
usage = vo.count_usage(inputs, model="voyage-multimodal-3.5")
print(usage)