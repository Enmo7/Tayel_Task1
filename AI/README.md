# 🚀 AI Vision-Translator API

An intelligent, high-performance API powered by **FastAPI** that bridges the gap between Computer Vision and Natural Language Processing. This API takes an image as input, generates a descriptive caption in English using a state-of-the-art visual-language model, and instantly translates that caption into Arabic.

---

## 🌟 Key Features

*   **Intelligent Image Captioning:** Utilizes the robust `Salesforce/blip-image-captioning-base` model to accurately understand and describe visual content.
*   **Accurate Translation:** Employs the `Helsinki-NLP/opus-mt-en-ar` model for high-quality, contextual translation from English to Arabic.
*   **Fast & Asynchronous:** Built on **FastAPI**, ensuring rapid response times and efficient handling of concurrent requests.
*   **Containerized:** Fully Dockerized for seamless, "plug-and-play" deployment across any environment.
*   **Interactive Documentation:** Auto-generated Swagger UI (`/docs`) makes testing and integration a breeze.

---

## 🛠️ Architecture & Workflow

The application follows a clean, modular architecture to ensure maintainability and scalability.

### Project Structure

```text
📦 AI-Vision-Translator
 ┣ 📜 main.py             # FastAPI application entry point & routing
 ┣ 📜 ml_services.py      # AI model loading & inference logic
 ┣ 📜 schemas.py          # Pydantic models for data validation
 ┣ 📜 requirements.txt    # Python dependencies
 ┣ 📜 Dockerfile          # Instructions to build the Docker image
 ┣ 📜 docker-compose.yml  # Orchestration for easy deployment
 ┗ 📜 .dockerignore       # Excluded files during Docker build
```

### Process Flow

1.  **Client Request:** A user submits an image via an HTTP `POST` request to the `/process-image/` endpoint.
2.  **Validation:** FastAPI intercepts the request, ensuring the uploaded file is a valid image format.
3.  **Vision Analysis:** The `ml_services.py` module takes the image bytes, passes them through the BLIP model, and generates a descriptive English string.
4.  **Language Translation:** The generated English string is immediately passed to the MarianMT model, which translates it into Arabic.
5.  **Response:** The API constructs a structured JSON response containing both the English and Arabic captions and returns it to the client.

---

## ⚙️ Technologies Used

*   **FastAPI:** Modern, fast web framework for building APIs with Python.
*   **Hugging Face Transformers:** Provides the pre-trained NLP and Vision models.
*   **PyTorch:** The underlying deep learning framework executing the models.
*   **Pillow (PIL):** Used for robust image handling and processing.
*   **Docker & Docker Compose:** Containerization for consistent development and deployment.

---

## 🚦 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

You only need one thing installed to run this project seamlessly:
*   [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Installation & Execution

1.  **Clone the repository** (or ensure all provided files are in a single directory):
    ```bash
    git clone https://github.com/your-username/AI-Vision-Translator.git
    cd AI-Vision-Translator
    ```

2.  **Spin up the container:**
    Use Docker Compose to build the image and start the server. The `--build` flag ensures a fresh image is created.
    ```bash
    docker-compose up --build
    ```
    *Note: The first time you run this or send a request, the Hugging Face models will be downloaded. This might take a few minutes depending on your internet connection.*

3.  **Access the Application:**
    Once the server is running (you'll see Uvicorn logs in your terminal), open your browser and navigate to the interactive Swagger UI:
    👉 **http://localhost:8000/docs**

---

## 🧪 How to Test

1.  Open the Swagger UI at `http://localhost:8000/docs`.
2.  Locate the `POST /process-image/` endpoint and click it to expand.
3.  Click the **"Try it out"** button.
4.  Use the file chooser to select an image from your computer.
5.  Click **"Execute"**.
6.  Scroll down to view the **Server Response**. You will receive a JSON object similar to this:

```json
{
  "english_caption": "a small child riding a bike on a sidewalk",
  "arabic_caption": "طفل صغير يقود دراجه على الرصيف"
}
```

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
