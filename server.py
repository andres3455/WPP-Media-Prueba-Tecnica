from flask import Flask, jsonify
from flask_cors import CORS
from services.chat_service import ChatService
import random
import threading
import time

app = Flask(__name__)
CORS(app)

chat = ChatService()

# -------------------------------
# Función para generar un banner
# -------------------------------
def generar_banner():
    title_prompt = "Genera un título creativo para un banner de la marca Adidas"
    description_prompt = "Escribe una descripción atractiva para ese banner de Adidas"

    title = chat.send_message(title_prompt)
    description = chat.send_message(description_prompt)

    cta_options = ["Ver más", "Descubrir", "Comprar ahora", "Ir al sitio"]
    cta = random.choice(cta_options)

    imageUrl = f"https://via.placeholder.com/600x200.png?text={title.replace(' ', '+')}"

    return {
        "title": title,
        "description": description,
        "cta": cta,
        "imageUrl": imageUrl
    }

# -------------------------------
# Cache del banner
# -------------------------------
banner_cache = generar_banner()  # Banner inicial

def actualizar_banner(intervalo=10):
    global banner_cache
    while True:
        print(" :O Generando nuevo banner...")
        banner_cache = generar_banner()
        print(" :) Banner actualizado")
        time.sleep(intervalo)

# Hilo de background que actualiza el banner cada 10 segundos
threading.Thread(target=actualizar_banner, daemon=True).start()

# -------------------------------
# Endpoint GET para frontend
# -------------------------------
@app.route("/api/banner", methods=["GET"])
def banner_endpoint():
    return jsonify(banner_cache), 200

# -------------------------------
# Ruta de prueba
# -------------------------------
@app.route("/", methods=["GET"])
def index():
    return jsonify({"message": "Servidor activo en Flask"}), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
