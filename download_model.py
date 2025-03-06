import os
import kagglehub

# Set Kaggle credentials
os.environ['KAGGLE_USERNAME'] = 'mohak1802'
os.environ['KAGGLE_KEY'] = 'd0aa90cca5b415945bb8e74e185fbf1b'

try:
    # Download the model
    path = kagglehub.model_download("mohak1802/aivakil/tensorFlow2/default")
    print("Model downloaded successfully to:", path)
except Exception as e:
    print("Error downloading model:", str(e)) 