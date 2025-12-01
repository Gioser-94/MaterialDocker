from flask import Flask
import redis
import os

app = Flask(__name__)

# Variables de entorno con valores por defecto
redis_host = os.getenv("REDIS_HOST", "redis")
redis_port = int(os.getenv("REDIS_PORT", 6379))

r = redis.Redis(host=redis_host, port=redis_port, decode_responses=True)

@app.route("/")
def index():
    try:
        count = r.incr("visits")
    except redis.exceptions.ConnectionError:
        count = "sin conexión a Redis 😢"
    return f"""
        <h1>Bienvenido a la práctica Flask + Redis 🚀</h1>
        <p>Has visitado esta página <strong>{count}</strong> veces.</p>
    """

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)